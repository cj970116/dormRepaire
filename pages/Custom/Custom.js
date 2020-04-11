// pages/Custom/Custom.js
const app = getApp()
let store = require('../../utils/store')
const util = require("./../../utils/util")
let Api = app.Api
Page({
  data: {
    isShow: true,
    picker: ['空调', '床', '照明', '卫生间', '门', '其他'],
    index: 0,
    imgList: [],
    CustomBar: app.globalData.CustomBar,
    basicsList: [{
      icon: 'usefullfill',
      name: '等待中'
    }, {
      icon: 'radioboxfill',
      name: '已受理'
    }, {
      icon: 'roundcheckfill',
      name: '已完成'
    }, ],
    basics: 0,
    resImgList: [],
    userName: '',
    repairList: [],
    accList:[],
    doneList:[]
  },

  onLoad: function () {
    wx.stopPullDownRefresh()
    let that = this
    let id = store.getItem('openId')
    that.setData({
      userId: id
    })
    app.get(Api.checkReport, {
      params: {
        userId: that.data.userId,
        status:0
      }
    }).then(res => {
      that.setData({
        repairList: res
      })
    }, err => {
      console.log(err);

    })


  },

  // 切换到申报页面
  toReport() {
    if (this.data.isShow == true) {
      this.setData({
        isShow: false
      })
    }

  },
  // 切换到查看进度页面
  toCheck() {
    if (this.data.isShow == false) {
      this.setData({
        isShow: true
      })
    }
  },
  // 选择故障类别
  PickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  // 选择图片
  ChooseImage() {
    let that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: 2,
      /* 最多同时上传几张 */
      success: (res) => {
        
        let images = that.data.imgList.concat(res.tempFilePaths)
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 最多上传3张图片
        if (images.length <= 3) {
          that.setData({
            imgList: images
          })
        } else {
          wx.showToast({
            title: '最多上传3张！',
            icon: 'none'
          })
        }

    




      },
    })
  },
 



  // 图片预览
  ViewImage(e) {
    const images = this.data.imgList
    const idx = e.target.dataset.idx
    wx.previewImage({
      urls: images,
      current: images[idx]
    })
  },
  // 图片删除
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 提交表单动画
  loadModal(e) {
    this.setData({
      loadModal: true
    })
    setTimeout(() => {
      this.setData({
        loadModal: false
      })
    }, 2000)


  },

  changeStep(e) {
    let that = this
    let idx = e.target.dataset.index
    this.setData({
      basics: idx
    })
    app.get(Api.checkReport, {
      params: {
        userId: that.data.userId,
        status: idx
      }
    }).then(res => {
      that.setData({
        repairList: res,
        accList:res,
        doneList:res
      })
    }, err => {
      console.log(err);

    })




  },

  //表单提交方法 
  formsubmit(e) {
    let that =this
    let formdata = e.detail.value
    formdata.userId = that.data.userId
    formdata.status = 0
    formdata.imgList = that.data.resImgList
    formdata.type = that.data.picker[that.data.index]
    formdata.date = util.formatTime(new Date())
    return new Promise((resolve,reject)=>{
      let flag =0
      that.data.imgList.forEach(item=>{
          wx.uploadFile({
            filePath: item,
            name: 'file',
            url: 'http://192.168.43.191:3000'+Api.upload,
            header: {'content-type':'multipart/form-data'},
            success:function(res){
              // console.log(JSON.parse(res.data).msg);
             that.data.resImgList.push(JSON.parse(res.data).msg)
             flag++
             if(flag==that.data.imgList.length){
               resolve()
             }
            }
          })
        })
    }).then((res)=>{
      app.post(Api.report, {
          data: formdata
        }).then(
          res => {
            console.log(res);
    
          }, err => {
            console.log(err);
    
          }
        )
    })


    // that.data.imgList.forEach(item=>{
    //   wx.uploadFile({
    //     filePath: item,
    //     name: 'file',
    //     url: 'http://192.168.43.191:3000'+Api.upload,
    //     header: {'content-type':'multipart/form-data'},
    //     success:function(res){
    //       // console.log(JSON.parse(res.data).msg);
    //      that.data.resImgList.push(JSON.parse(res.data).msg)
    //     }
    //   })
    // })

    // app.post(Api.report, {
    //   data: formdata
    // }).then(
    //   res => {
    //     console.log(res);

    //   }, err => {
    //     console.log(err);

    //   }
    // )

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //  下拉的时候再发一次请求刷新页面
    let that = this
    let id = store.getItem('openId')
    that.setData({
      userId: id
    })
    app.get(Api.checkReport, {
      params: {
        userId: that.data.userId
      }
    }).then(res => {
      that.setData({
        repairList: res
      })
    }, err => {
      console.log(err);

    })
    this.onLoad(); //重新加载onLoad()
  },
  // 查看详情的方法
  checkDetail(e){
    console.log(e.currentTarget);
    
    let id = e.currentTarget.dataset.id
    let status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: './repairInfo/repairInfo?id='+id+'&status='+status
    })
    
  },
  handDone(e){
    let that = this
    let id = e.currentTarget.dataset.id
    app.get(Api.updateStatus, {
      params: {
        status: 2,
        id: id
      }
    }).then(
      res => {
        wx.showToast({
          image: '../../images/true.png',
          complete:function(){
            setTimeout(function(){
              that.refresh()
            },1000)
          }
        })
      }, err => {
        console.log(err);

      }
    )

  },
  refresh(){
    let that =this
    app.get(Api.checkReport,{params:{userId:that.data.userId,status:1}}).then(
      res=>{
        that.setData({
          accList:res
        })
      },err=>{
        console.log(err);
        
      }
    )
  }



})
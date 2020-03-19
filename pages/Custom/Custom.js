// pages/Custom/Custom.js
const app = getApp()
Page({
  data: {
    isShow: true,
    picker: ['无法使用', '轻微损坏', '老化', '出现异常'],
    index: null,
    imgList: [],
    CustomBar: app.globalData.CustomBar,
    basicsList: [{
      icon: 'usefullfill',
      name: '已受理'
    }, {
      icon: 'radioboxfill',
      name: '等待中'
    }, {
      icon: 'roundcheckfill',
      name: '已完成'
    }, ],
    basics:0
  },

  onLoad: function () {

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
      complete: (res) => {
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
  loadModal() {
    this.setData({
      loadModal: true
    })
    setTimeout(() => {
      this.setData({
        loadModal: false
      })
    }, 2000)
  },
  changeStep(e){
    let idx = e.target.dataset.index
    this.setData({
      basics:idx
    })
  }

})
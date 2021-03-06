const app = getApp()
let Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    status:'',
    imageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传过来的参数，便于请求到正确的页面
    let that = this
    let id = options.id
    that.setData({status:options.status})
    if (options.status == 0) {
      app.get(Api.detail,{params:{id:id}}).then(
        res=>{
          let temImgList = JSON.parse(res[0].img)
          let img = []
          temImgList.forEach(item=>{
            let ele = item.replace(/localhost/,"192.168.43.191")
            img.push(ele)
          })
          
          that.setData({
            info: res[0],
            imageList:img
          })
          
          
        },err=>{
          console.log(err);
        }
      )
    } else {
      app.get(Api.checkAcc, {
        params: {
          id: id
        }
      }).then(
        res => {
          console.log(res);
          let temImgList = JSON.parse(res[0].img)
          let img = []
          temImgList.forEach(item=>{
            let ele = item.replace(/localhost/,"192.168.43.191")
            img.push(ele)
          })
          
          that.setData({
            info: res[0],
            imageList:img
          })
        },err=>{
          console.log(err);
        })
    }



  }

})
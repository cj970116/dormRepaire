const app = getApp()
let Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传过来的参数，便于请求到正确的页面
    let id = options.id
    let that = this
    app.get(Api.checkAcc, {
      params: {
        id: id
      }
    }).then(
      res => {
        console.log(res);
        that.setData({
          info: res[0]
        })

      })

  }

})
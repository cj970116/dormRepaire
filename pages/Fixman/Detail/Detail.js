const app = getApp()
let Api = app.Api
let store = require('../../../utils/store')
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
    app.get(Api.detail, {
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

  },
  // 受理维修，改变状态
  handAcc() {
    let that = this
    let fixId = store.getItem('fixId')
    app.get(Api.updateStatus, {
      params: {
        status: 1,
        id: that.data.info.id,
        fixId:fixId
      }
    }).then(
      res => {
        wx.showToast({
          title: res,
          image: '../../../images/true.png',
          complete: function () {
            setTimeout(function () {
              var pages = getCurrentPages(); //当前页面栈
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
                beforePage.changeData(); //触发父页面中的方法
              }
              wx.navigateBack()
            }, 1000)
          }
        })
      }, err => {
        console.log(err);

      }
    )
  }

})
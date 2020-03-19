const app = getApp()
let store = require('../../utils/store')
let Api = app.Api


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      userId: store.getItem('userId')
    })
    console.log(this.data.userId);

    if (!this.data.userId) {
      this.getSession()
    }else{
      wx.redirectTo({
        url: './../Custom/Custom',
      })
    }
  },
  // 登录，获取openID
  getSession() {
    wx.login({
      complete: (res) => {
        if (res.code) {
          app.get(Api.getSession, {
              code: res.code
            })
            .then((res) => {
              console.log(res);
              store.setItem('openId', res.openid)

            }).catch((err) => {
              console.log(err);

            })
        }
      }
    })
  },
  // 用户授权，返回userid
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      let userInfo = e.detail.userInfo
      let that = this
      userInfo.openid = store.getItem('openId')
      app.get(Api.login, {
        userInfo
      }).then((res) => {
        console.log(res);
        store.setItem('userId', res.userId)
        that.setData({
          userId: res.userId
        })
        wx.redirectTo({
          url: './../Custom/Custom',
        })
      })
    } else {
      wx.showToast({
        title: '您取消了授权',
        icon: 'none'
      })

    }



  },
 

})
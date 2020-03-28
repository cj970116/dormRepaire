// pages/welcome/welcome.js

const store = require('../../utils/store')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: ''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: store.getItem('userId')
    })
  },
  toClogin() {
    if (this.data.userId) {
      wx.navigateTo({
        url: '../Custom/Custom'
      })
    } else {
      wx.navigateTo({
        url: '../../pages/Clogin/Clogin'
      })
    }
  },

  toFlogin(){
    wx.navigateTo({
      url: './../FLogin/Flogin'
    })
  },
  toMlogin(){
    wx.navigateTo({
      url: './../Mlogin/Mlogin',
    })
  }



})
// pages/Manager/Info/info.js
const app= getApp()
let Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    fixId:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
   
    let that = this
    let userId = options.userId
    let fixId= options.fixid
   
    
    that.setData({
      userId:userId,
      fixId:fixId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.detail = this.selectComponent("#detail")
    this.detail.getInfo()
    
  }

 
})
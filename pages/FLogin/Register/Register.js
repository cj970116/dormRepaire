// pages/FLogin/Register/Register.js
const app = getApp()
const Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formsubmit(e){
    // console.log(e.detail.value);
    let regisInfo = e.detail.value
    if (regisInfo.pass==regisInfo.confirmPass) {
      app.post(Api.fixRegis,{data:regisInfo}).then(
        res=>{
          wx.showToast({
            title:res,
            image:'../../../images/warning.png',
            success:function(){
              wx.redirectTo({
                url: '../Flogin',
              })
            }
          })
        },err=>{
          console.log(err);
        }
      )
      
    }else{
      wx.showToast({
        title: '密码设置错误',
        image:'../../../images/warning.png'
      })
    }
    
  }

  
})
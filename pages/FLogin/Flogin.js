// pages/FLogin/Flogin.js

const app= getApp()
let Api = app.Api
let store = require('../../utils/store')
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
// 登录表单提交
  formsubmit(e){
    let formData= e.detail.value
    app.post(Api.fixManLogin,{data:formData}).then(
      res=>{
        console.log(res);
        store.setItem('realName',res.realName)
        if(formData.pass==res.pass){
          wx.showToast({
            title: '登录成功',
            image:'../../images/true.png',
            complete:function(){
              wx.redirectTo({
                url: '../Fixman/Fixman'
              })
            }
          })
         
        }else{
          wx.showToast({
            title: '账户或密码错误',
            image:'../../images/warning.png'
          })
        }
      },err=>{
        console.log(err);
      }
    )
  },
  handRegister(){
    wx.navigateTo({
      url: './Register/Register',
    })
  }
  
})
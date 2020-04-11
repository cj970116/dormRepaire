
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
    let user = store.getItem('manager')
    if (user) {
      wx.navigateTo({
        url: '../Manager/Manager',
      })
    }

  },
  onShow(){
 

  },

  formSubmit(e){
    console.log(e);
    let formdata = e.detail.value
    app.post(Api.mLogin,{data:formdata}).then(
      res=>{
        if(res.userName==formdata.Mid&&res.pass==formdata.pass){
          store.setItem('manager',res.userName)
          wx.showToast({
            title: '登录成功',
            image:'../../images/true.png',
            complete:function(){
              setTimeout(function(){
                wx.navigateTo({
                  url: '../Manager/Manager',
                })
              },1000)
            }
          })
          
        }else{
          wx.showToast({
            title: '失败',
            image:'../../images/warning.png'
          })
          
        }
      },err=>{
        console.log(err)       
      }
    )
    
  }
})
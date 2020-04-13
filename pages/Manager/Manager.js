const app= getApp()
let Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    user:[],
    fixMans:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.get(Api.checkUser).then(
      res=>{
        this.setData({
          users:res
        })
        
      },err=>{
        console.log(err);
        
      }
    )
  },
  tabSelect(e) {
    let id = e.currentTarget.dataset.id
    let that =this
    that.setData({
      TabCur: id,
      scrollLeft: (id-1)*60
    })
    app.get(Api.checkFixman).then(
      res=>{
        that.setData({
          fixMans:res
        })
        
      },err=>{
        console.log(err);
        
      }
    )
  },
  checkUinfo(e){
   
    
    let userId = e.currentTarget.dataset.userid
    wx.navigateTo({
      url: './Info/info?userId='+userId
    })
    
  },
  checkFinfo(e){
    let fixid = e.currentTarget.dataset.fixid
    wx.navigateTo({
      url: './Info/info?fixid='+fixid,
    })
  }

})
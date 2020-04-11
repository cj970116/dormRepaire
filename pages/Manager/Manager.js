const app= getApp()
let Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.get(Api.checkUser).then(
      res=>{
        console.log(res);
        
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
  },
  checkUinfo(){
    
    
  }

})
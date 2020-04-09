const app = getApp()
let Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    allItem:[],
    accItem:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that =this
    app.get(Api.getAll,{params:{status:0}}).then(
      res=>{
        that.setData({
          allItem:res.list
        })
        
        
      },err=>{
        console.log("no");
        
      }
    )
  },
  changeData(){
    this.onLoad()
  },
  //切换tab时触发方法
  tabSelect(e) {
    let id = e.currentTarget.dataset.id
    let that =this
    that.setData({
      TabCur: id,
      scrollLeft: (id-1)*60
    })
    // 发送请求刷新页面
   app.get(Api.getAll,{params:{status:id}}).then(
     res=>{
       that.setData({
         accItem:res.list,
         allItem:res.list
       })
       
     },err=>{
       console.log(err);
       
     }
   ) 
    
  },
  checkDetail(e){
    // 获取当前点击项目的id并传递给路由上
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './Detail/Detail?id='+id,
    })
  }
})
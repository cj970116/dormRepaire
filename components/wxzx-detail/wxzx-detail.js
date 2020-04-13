// components/wxzx-detail/wxzx-detail.js
const app= getApp()
let Api = app.Api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId:{
      type:"String",
      value:""
    },
    fixId:{
      type:"String",
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    uInfo:[],
    fInfo:[]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInfo(){

       // 接受上个页面的路由参数，将传过来userId和fixId作为请求参数传递给node服务器，请求每个用户和维修人员的报修信息
      let that = this
      let userId = that.data.userId
      let fixId = that.data.fixId
      if (userId) {
        app.get(Api.checkUser,{params:{
          id:userId
        }}).then(
          res=>{
            console.log(res);
            that.setData({
              uInfo:res
            })
            
          },err=>{
            console.log(err);
          }
        )
      }else if(fixId){
        app.get(Api.checkFixman,{params:{id:fixId}}).then(
          res=>{
            console.log(res);
            
            that.setData({
              fInfo:res
            })
          },err=>{
            console.log(err);
            
          }
        )
      }
    }


  }
})
/* 将env挂载到app对象上*/
let config = require("./env/index")
let Api = require('./http/api')
let env = 'Dev'
let request = require('./http/request')
App.config = config[env] /* 外部js文件调用 */

App({

  Api,
  get: request.getReq,
  post:request.postReq,
  config: config[env],
  /* 给page调用 */
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {

  }
})
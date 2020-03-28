/* 
请求管理
*/

let store = require('./../utils/store')
let system = store.getSystem()
const clientInfo = {
  'clientType': 'mp',
  'model': system.model,
  'os': system.system,
  'screen': system.screenWith + '*' + system.screenHeight
}

module.exports = {
  getReq(url, data = {}, option = {}) {

    let {
      loading = true,
        toast = true,
        method = 'get'
    } = option

    return new Promise((reslove, reject) => {
      let env = App.config.baseApi
      // 改善用户体验，增加了加载中的提示
      if (loading) {
        wx.showLoading({
          title: '请求中',
          mask: true
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
      wx.request({
        // 根据开发环境确定接口地址，用url拼接即可
        url: env + url,
        data,
        method,
        header: {
          'clientInfo': JSON.stringify(clientInfo)
        },

        success: (res) => {
          console.log(res);

          if (res.statusCode == 200) {
            if (loading) {
              wx.hideLoading()
            }
            reslove(res.data)
          }
        },

        fail: (e) => {
          wx.showToast({
            title: '失败了',
            icon: "none"
          })
          reject(e)
        }
      })
    })
  },


  postReq(url, data = {}, option = {}) {

    let {
      loading = true,
        toast = true,
        method = 'post'
    } = option

    return new Promise((reslove, reject) => {
      let env = App.config.baseApi
      // 改善用户体验，增加了加载中的提示
      if (loading) {
        wx.showLoading({
          title: '请求中',
          mask: true
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
      wx.request({
        // 根据开发环境确定接口地址，用url拼接即可
        url: env + url,
        data,
        method,
        header: {
          'clientInfo': JSON.stringify(clientInfo)
        },

        success: (res) => {
          console.log(res);

          if (res.statusCode == 200) {
            if (loading) {
              wx.hideLoading()
            }
            reslove(res.data)
          }
        },

        fail: (e) => {
          wx.showToast({
            title: '失败了',
            icon: "none"
          })
          reject(e)
        }
      })
    })
  }
}
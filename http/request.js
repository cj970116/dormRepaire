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
  fetch(url, data, option = {}) {

    let {
      loading = true, toast = true, method = 'get'
    } = option

    return new Promise((reslove, reject) => {
      let env = App.config.baseApi
      // 改善用户体验，增加了加载中的提示
      if (loading) {
        wx.showLoading({
          title: '请求中',
          mask: true
        })
      }
      wx.request({
        // 根据开发环境确定接口地址，用url拼接即可
        url: env + url,
        data,
        method,
        header: {
          'clientInfo': JSON.stringify(clientInfo)
        },

        success(result) {
          let res = result.data
          if (res.code==0) {
            if (loading) {
              wx.hideLoading()
            }
            reslove(res.data)
          } else {
            if (toast) {
              wx.showToast({
                title: res.message,
                mask: true
              })
            } else {
              wx.hideLoading()
            }
          }
        },

        fail(e = {
          code: -1,
          msg: errMsg
        }) {
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
/* 
storage存储数据
设置值：
key:value
moudle_name{
  key:value
}
*/

module.exports = {
  // 设置方法,存储
  setItem(key, value, module_name) {
    if (module_name) {
      let module_name_info = this.getItem(module_name)
      module_name_info[key] = value
      wx.setStorageSync(module_name, module_name_info)
    }else{
      wx.setStorageSync(key, value)
    }
  },

  // 读取方法
  getItem(key,module_name){
    if (module_name) {
      let val = wx.getItem(module_name)
      if (val)return val[key]
      return ""
    }else{
      return wx.getStorageSync(key)
    }
  },

  // 清除方法
  clear(key){
    key?wx.removeStorageSync(key):wx.clearStorageSync(key)
  },

  getSystem(){
    return wx.getStorageInfoSync()
  }

}
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */

  //程序启动时发生 读取本地userinfo数据
  onLaunch: function () {  
    var userinfo = wx.getStorageSync("userinfo");
    if (userinfo){
      this.globalData.userinfo = userinfo;
    }
    

  },
  // 初始化userinfo  当用户登录成功之后执行给userinfo变量赋值 保存在全局一份同时保存在本地(StorageSync))
  initUserInfo: function (res, localInfo){
    var phone = res.phone;
    var token = res.token;
    this.globalData.userinfo = {
      "phone": phone, "token": token, "nickName": localInfo.nickName, "avatarUrl": localInfo.avatarUrl};
    wx.setStorageSync("userinfo", { "phone": phone, "token": token, "nickName": localInfo.nickName, "avatarUrl": localInfo.avatarUrl})
  },
  logout:function(){
    
    this.globalData.userinfo = null;
    wx.removeStorageSync("userinfo");
  },
  //全局数据  所有页面都可以访问  利用getAPP()获取APP对象
  globalData:{
    userinfo:null
  }
})

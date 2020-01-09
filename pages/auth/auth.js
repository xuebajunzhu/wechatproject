// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"18864803317",
    code:""
  },
  bindPhoneInput: function (e) {
    this.setData({ phone: e.detail.value });
  },
  bindCodeInput: function (e) {
    this.setData({ code: e.detail.value });
  },
  /** 
   * 点击获取短信验证码
   */
  onClickCheckCode: function (e) {
    // 判断手机号格式是否正确
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
      return
    }
    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
    // 发送短信验证码，登录成功之后获取jwt和微信用户信息，保存到globalData和本地存储中。
    wx.request({
      url: "http://127.0.0.1:8000/api/mssagecode/",
      data: { phone: this.data.phone },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.status) {
          // 倒计时计数器
          wx.showToast({ title: res.data.msg, icon: 'none' });

        } else {
          // 短信发送失败
          wx.showToast({ title: res.data.msg, icon: 'none' });
        }
      }
    })

  },

  /** 
   * 点击登录
   */
  
  onClickLogin: function (e) {
   
    var app =getApp();
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
      return
    }
    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
  //登录
    wx.request({
      url: "http://127.0.0.1:8000/api/mssagecode/",
      data: { phone: this.data.phone, code:this.data.code},
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.data.status) {
          // 登陆成功
          var localInfo={
                "nickName": e.detail.userInfo.nickName,
                "avatarUrl": e.detail.userInfo.avatarUrl
              }
          app.initUserInfo(res.data.data, localInfo) //为全局变量赋值
          wx.showToast({ title: res.data.msg, icon: 'none' });
        // app.globalData.phone=res.data.data.phone;

        //   wx.setStorageSync("phone",res.data.data.phone)

        // var pages= getCurrentPages();
        // console.log(pages)
        wx.navigateBack({}) //回退到前一个页面
        } else {
          // 登陆失败
          wx.showToast({ title: res.data.msg, icon: 'none' });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/homeModel/home.js
var app=getApp()  //获取全局app对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:null
  },
  onClickLogout:function(e){
    app.logout();
    this.setData({userinfo:null})
  },
  /**
   * 生命周期函数--监听页面加载(第一次执行)
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
  // 每当页面加载时都会执行
  onShow: function () {
    this.setData({ userinfo: app.globalData.userinfo})
    // this.setData({ userinfo: wx.getStorageSync("userinfo") })  本地获取值
   
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
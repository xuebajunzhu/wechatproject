// pages/detail/detail.js
var app = getApp()
var sale = require("../../pages/url/url.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:"",
    SaleCategory:{}

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({userinfo:app.globalData.userinfo})
    // console.log(options.id);
    wx.request({
      url: sale.salecategory +"1/" ,
      data: '',
      header: {
        Authorization: app.globalData.userinfo? app.globalData.userinfo.token : null
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
        console.log(res.data)
        this.setData({ SaleCategory:res.data})
      },
  
    })
  },
  onclickgetdetaile:function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);

  },
  onclickpay:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/deposit/deposit?id='+id,
    })
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
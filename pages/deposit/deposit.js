// pages/deposit/deposit.js
var app = getApp()
var sale = require("../../pages/url/url.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cashdeposit:"",
    id: null,
    salecategory:null,
    value:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.detail.id)
    // var id = options.detail.id
    wx.request({
      url: sale.cashdeposit+"1/",
      header: {
        Authorization: app.globalData.userinfo.token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) =>{
        console.log(res.data)
        this.setData({ cashdeposit:res.data})
      },
     
    })
  },
  radioChange:function(e){
    console.log(e.detail.value)
    var value = e.detail.value
    if (value===2){
      this.setData({
        id: this.data.cashdeposit.id,
        salecategory: this.data.cashdeposit.salecategory,
        value:value
      })
    }else{
      this.setData({
        id: null,
        salecategory: this.data.cashdeposit.salecategory,
        value: value
      })
    }
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
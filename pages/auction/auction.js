// pages/auction/auction.js
var sale = require("../../pages/url/url.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auctionList:[],
    min_id:"",
    max_id:""
  },
  clickMe: function (e) {
    var id = e.currentTarget.dataset.nid;
    console.log(id);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  getauction: function (flag) {
    var that = this;
    var condition = {}
    
    var min_id = this.data.min_id;
    
    wx.request({
      url: sale.salecategory,
      data: { min_id: min_id },
      method: "GET",
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        var results =res.data.results;
        var listLength = res.data.results.length;
        that.setData({ auctionList: that.data.auctionList.concat(res.data.results) })

        if (listLength) {
          that.data.min_id = results[listLength - 1].id;
          that.data.max_id = that.data.auctionList[0].id;
          console.log(that.data.min_id)
          console.log(that.data.max_id)
          wx.showToast({
            title: '数据拉取成功',
            icon: "none"
          })
        } else {
          wx.showToast({
            title: '已经没有数据了',
            icon: "none"
          })
        }
      },
    })

  },
  getnewgetauction: function () {
    var that = this;
    var max_id = this.data.max_id;
    wx.request({
      url: sale.salecategory,
      data: { max_id: max_id },
      method: "GET",
      dataType: 'json',
      success: function (res) {
        console.log(res.data.results);
        var results = res.data.results.reverse();
        var listLength = res.data.results.length;
        that.setData({ auctionList: results.concat(that.data.auctionList) })

        if (listLength) {
          that.data.max_id = results[0].id;
          wx.showToast({
            title: '数据拉取成功',
            icon: "none"
          })
        } else {
          wx.showToast({
            title: '已经没有数据了',
            icon: "none"
          })
        }
      },
      complete: function (res) {
        wx.stopPullDownRefresh();
      },
    })
  },
  onLoad: function (options) {
    this.getauction();
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
    this.getnewgetauction()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getauction();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})
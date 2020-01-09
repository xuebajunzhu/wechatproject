// pages/auction/auction.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auctionList:[
      {  "id":1,
        "title":"第三场 贵和祥茶道专场",
        "state":"预览中",
        "viewCount":360,
        "bigimage":"/static/image/baozi.jpg",
        "smallimageList": ["/static/image/baozi.jpg", "/static/image/baozi.jpg", "/static/image/baozi.jpg","/static/image/baozi.jpg"],
        "Number":14
      }
    ]
  },
  clickMe: function (e) {
    var nid = e.currentTarget.dataset.nid;
    console.log(nid);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + nid,
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
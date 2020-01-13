// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/api/article/',
      data:{},
      method:"GET",
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        that.setData({articleList: res.data});
      },

    })
  },
  showdetaile: function(res){
    var id = res.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/articledetial/detial?id='+id,
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

  },

  /*
  *点击跳转
  */
  clickMe: function (e) {
    var nid = e.currentTarget.dataset.nid;
    console.log(nid);
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  }
})


// 点击绑定的事件


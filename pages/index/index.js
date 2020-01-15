// pages/index/index.js
var api = require("../../pages/url/url.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    max_id:"",
    min_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getarticle:function(flag){
    var that = this;
    var condition={}
    if(!flag){
      var min_id  = this.data.min_id;
    }
      wx.request({
        url: api.index,
        data: {min_id:min_id},
        method: "GET",
        dataType: 'json',
        success: function (res) {
          console.log(res.data);
          var listLength = res.data.length;
          that.setData({ articleList: that.data.articleList.concat(res.data) })
          
          if (listLength){
            that.data.min_id = res.data[listLength - 1].id;
            that.data.max_id = that.data.articleList[0].id;
            console.log(that.data.min_id)
            console.log(that.data.max_id)
            wx.showToast({
              title: '数据拉取成功',
              icon: "none"
            })
          }else{
            wx.showToast({
              title: '已经没有数据了',
              icon:"none"
            })
          }
        },
      })
    
  },
  getnewsarticle:function(){
    var that = this;
    var max_id = this.data.max_id;
    wx.request({
      url: 'http://127.0.0.1:8000/api/article/',
      data: { max_id: max_id },
      method: "GET",
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        var listLength = res.data.length;
        that.setData({ articleList: res.data.concat(that.data.articleList) })

        if (listLength) {
          that.data.max_id = res.data[0].id;
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
      complete: function(res)  {
        wx.stopPullDownRefresh();
      },
    })
  },
  onLoad: function (options) {
    var that = this;
    this.getarticle(false)
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
    this.getnewsarticle()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getarticle(false)
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


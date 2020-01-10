// pages/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList:[
      {id:1,title:"春节买不到票",count:200},
      { id: 2, title: "春节买不到票", count: 200 },
      { id: 3, title: "春节买不到票", count: 200 },
      { id: 4, title: "春节买不到票", count: 200 }
    ]
  },
  choseTopic:function(e){
    var topicInfo = e.currentTarget.dataset.item;
    console.log(topicInfo);
    var page = getCurrentPages();
    var prevpage = page[page.length-2];
    prevpage.setTopic(topicInfo);
    wx.navigateBack({
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
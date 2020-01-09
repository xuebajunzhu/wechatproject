// pages/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    massage:"hello",
    name:"",
    portrait:"/static/image/132.jpg"
  },

  clickon: function(){
    console.log(this.data.massage)
    this.setData({ massage:"4545"})
  },
  getusername: function(){
    var that = this
    wx.getUserInfo({
      success:function(res){
        //调用成功之后触发
        console.log(res)
        that.setData({ name: res.userInfo.nickName, portrait: res.userInfo.avatarUrl})
      },
      fail:function(res){
        //调用失败触发
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
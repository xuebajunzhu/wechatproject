// pages/telephone/telephone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"贱人",
    phone:"",
    code:""
  },
  bindphone:function(e){
    
    this.setData({ phone: e.detail.value})
  },
  bindcode: function (e) {
    
    this.setData({ code: e.detail.value })
  },
  login:function(){
    var phone=this.data.phone;
    var code=this.data.code;
    console.log(phone,code)
    wx.request({
      url: 'http://127.0.0.1:8000/api/login/',
      data:{"phone":phone,"code":code},
      method:"GET",
      success:function(res){
        console.log(res)
      }

    })
  },
  /**
   *发送短信验证码
   */
  messageCode:function(){
    console.log(13215)
    if (this.data.phone.length!=11){
      wx.showToast({
        title: '手机号长度错误',
        icon: "none"
      })
      return;
    }

    var reg=/^(1[3|4|5|6|7|8|9])\d{9}$/;
    if (!reg.test(this.data.phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon:"none"
      })
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:8000/api/mssagecode/',
      data: { "phone": this.data.phone },
      method: "GET",
      success: function (res) {
        console.log(res)
      }

    })
  },
  login:function(){
    var phone= this.data.phone;
    var code = this.data.code;
    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '手机号长度错误',
        icon: "none"
      })
      return;
    }

    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: "none"
      })
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:8000/api/mssagecode/',
      data: { "phone": phone ,"code":code},
      method: "POST",
      success: function (res) {
        console.log(res.data)
       
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
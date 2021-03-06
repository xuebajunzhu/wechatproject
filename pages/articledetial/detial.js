// pages/articledetial/detial.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:"",
    care:true,
    articledetaile:{},
    isShowCommentModal: false,
    reply: null // {news,reply,nickname,content,depth}
  },
  /**
   * 点击关注
   */
  onclickCare:function(e){
    if (!app.globalData.userinfo) {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        success: function (res) {
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        },
      })
      return;
    }
    var author_id = e.currentTarget.setData.author_id;
    wx.request({
      url: '',
      data: { author_id: author_id},
      method: '',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  /**
   * 点赞
   */
  onclickLike:function(e){
    if (!app.globalData.userinfo) {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        success: function (res) {
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        },
      })
      return;
    }


  },
   /**
   * 点击并弹出评论对话框
   */
  onClickShowCommentModal: function (e) {
    console.log(app.globalData.userinfo)
    if (!app.globalData.userinfo){
      wx.showToast({
        title: '未登录',
        icon: 'none',
        success: function(res) {
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        },
      })
      return ;
    }
    var replyInfo = e.currentTarget.dataset;
    console.log(replyInfo)
    this.setData({
      isShowCommentModal: true,
      reply: replyInfo,
    });
  },
  /**
   * 关闭评论对话框
   */
  onClickCancelCommentModal: function () {
    this.setData({
      isShowCommentModal: false,
      reply: null
    });
  },
  /**
   * 评论框中输入内容
   */
  inputComment: function (e) {
    this.setData({
      ["reply.content"]: e.detail.value,
    });
  },

  /**
   * 清除回复的指定评论，变为根评论
   */
  onClickClearReply: function () {
    this.setData({
      ["reply.reply"]: null,
      ["reply.nickname"]: null,
      ["reply.depth"]: 1,
    });
  },
  /**
   * 点击评论发布按钮
   */
  onClickPostComment: function () {
    if (!this.data.reply) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }
    if (!this.data.reply.content) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '发布中',
      mask: true
    })
    // 发布评论，将评论数据发送到后台接口
    wx.request({
      url: "http://127.0.0.1:8000/api/comment/",
      data: this.data.reply,
      header: { Authorization: app.globalData.userinfo.token},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.statusCode == 201) {
          // 发布成功
          this.setData({
            replay: null,
            isShowCommentModal: false,
          })
          wx.hideLoading();
          wx.showToast({
            title: '发布成功',
            icon: 'none'
          });
          // 找到位置，把最新的评论插入。
          /*
          1. 如果是根评论，直接放在最上方。
          */
          console.log(res.data);
          if (res.data.depth == 1) {
            var commentList = this.data.articledetaile.commentinfo.reply_comment;
            commentList.unshift(res.data);
            this.setData({
              ["articledetaile.commentinfo.reply_comment"]: commentList
            });
            return
          }
          /**
           * 2. 如果是非子评论，则显示在当前评论的下方。
           */

        }
      },
      fail: function (res) {
        wx.hideLoading()
      },
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    this.setData({userinfo:app.globalData.userinfo})
    console.log(options.id);
    wx.request({
      url: 'http://127.0.0.1:8000/api/article/'+options.id+"/",
      method: "GET",
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        that.setData({ articledetaile: res.data });
      },

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
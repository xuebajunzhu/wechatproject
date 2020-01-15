// pages/articledetial/detial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articledetaile:{},
    isShowCommentModal: false,
    reply: null // {news,reply,nickname,content,depth}
   
  },

 
   /**
   * 点击并弹出评论对话框
   */
  onClickShowCommentModal: function (e) {
    var replyInfo = e.currentTarget.dataset;
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
      ["reply.content"]: e.detail.value
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
            var commentList = this.data.news.comment.result;
            commentList.unshift(res.data);
            this.setData({
              ["news.comment.result"]: commentList
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

    console.log(options.id);
    wx.request({
      url: 'http://127.0.0.1:8000/api/articledetial/'+options.id+"/",
      data: {},
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
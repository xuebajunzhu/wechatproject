// pages/issue/issue.js
var app = getApp();
var COS = require('../../utils/cos-wx-sdk-v5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    onlineImageList:[],
    videoList:[],

    location:"",
    content:"",
    topic:{title:"参与话题",topic_id:0}
  },
  contentInput:function(e){
    
    this.setData({ content: e.detail.value})
   
    // console.log(e.detail.value);
  },
  getlocalpath:function(){
    var that = this
    wx.chooseLocation({
      success: function(res) {
        
        that.setData({location:res.address})
      },
    })
  },
  //选择图片并上传
  loadimage:function(){
    
    var that = this;
    // 去某个地方获取一个临时密钥
    var cos = new COS({
      getAuthorization: function (options, callback) {
        // 服务端 JS 和 PHP 示例：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
        wx.request({
          url: 'http://127.0.0.1:8000/api/credential/',
          data: {
            // 可从 options 取需要的参数
          },
          success: function (result) {
            var data = result.data;
            var credentials = data.credentials;
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              ExpiredTime: data.expiredTime,
            });
          }
        });
      }
    });
    
    wx.chooseImage({
      success: function(res) {
        that.setData({ imageList: that.data.imageList.concat(res.tempFilePaths)})
        var imageList = that.data.imageList;
         // 先选择文件，得到临时路径
        for (var index in imageList) {
          var filePath = imageList[index];
          cos.postObject({
            Bucket: 'examplebucket-1300594020',
            Region: 'ap-beijing',
            Key: filePath.split("//")[1],
            FilePath: filePath,
            onProgress: function (info) {
              console.log('进度条', JSON.stringify(info));

            }
          }, function (err, data) {
            that.data.onlineImageList.push("https://" + data.Location);
            console.log("https://" + data.Location)

          });
        }
      },
    })

   
  },
  /**
   * 点击图片删除
   */
  removeimage:function(index){
    var imageitem = this.data.imageList[index];
    
  },
/**
 * 点击删除视频
 */
  removevideo:function(index){

  },
  /**
   * 读取视频
   */
  loadvideo: function () {
    var that = this;
    wx.chooseVideo({
      success: function (res) {
       
        that.setData({ videoList: that.data.videoList.concat(res.tempFilePaths) })
      },
    })
  },

  /**
   * 点击发布
   */
  sub:function(e){
   
    var that = this;
    console.log("11111111",that.data)
   
    wx.request({
      url: 'http://127.0.0.1:8000/api/issue/',
      data: {
        image: that.data.onlineImageList,
        video: that.data.videoList, 
        location: that.data.location, 
        content: that.data.content, 
        topic: that.data.topic.topic_id,
        userinfo:app.globalData.userinfo
         },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res.data.msg)
      },
    })
    this.setData({
      imageList: [],
      onlineImageList: [],
      videoList: [],
      location: "",
      content: "",
      topic: { title: "参与话题", topic_id: 0 }
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 点击话题跳转页面
   */
  getTopic:function(e){
    wx.navigateTo({
      url: '/pages/topic/topic',
    })
  },
  /**
   * 设置话题
   */
  setTopic:function(e){
    this.setData({ topic: { title: e.title, topic_id:e.id }});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   if (app.globalData.userinfo){
     wx.navigateTo({
       url: '/pages/telephone/telephone',
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
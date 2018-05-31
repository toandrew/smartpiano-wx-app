// pages/newbie/newbie.js

const api = require("../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: {},

    logoUrl: null,

    noviceId: -1,
    scoreNum: 0,

    courseTitle: '',
    courseDesc: '',

    isCourse: false,

    hiddenVideo: true,
    courseVideoUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let noviceId = options.noviceId;
    console.log(noviceId);

    api.getNewbieDetail({
      params: {
        noviceId: noviceId
      },

      success: (res) => {
        console.log(res);

        this.setData({
          logoUrl: res.data.data.cover_image_url,
          courseTitle: res.data.data.name,
          courseDesc: res.data.data.description,
          courses: res.data.data
        })
      },

      fail: (err) => {
        console.log(err);
      }
    })

    this.videoContext = wx.createVideoContext('courseVideo');
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
    this.closeVideo();
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

  onVideoClicked: function (e) {
    console.log("onVideoClicked", e);
    let url = e.detail;
    if (url) {
      this.setData({
        hiddenVideo: false,
        courseVideoUrl: url
      });
    }
  },

  onScoreClicked: function (e) {
    console.log("onScoreClicked", e);

    wx.navigateTo({
      url: '/pages/score/score?scoreId=' + e.detail,
    });
  },

  onKaraClicked: function (e) {
    console.log("onKaraClicked", e);

    wx.navigateTo({
      url: '/pages/score/score?showHint=true',
    });
  },

  closeVideo: function (e) {
    this.setData({
      hiddenVideo: true,
      courseVideoUrl: ''
    });

    this.videoContext.stop();
  }
})
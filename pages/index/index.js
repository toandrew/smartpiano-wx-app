//index.js
const api = require('../../utils/api.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},

    banners: [],
    topNav: [
      { id: '1', name: '曲谱', image: '/images/score-item/ic_singles_score_enabled.png', redirectlink: '/pages/scorelib/scorelib?type=1', redirecttype: 'app', appid: '' },
      { id: '2', name: '游戏', image: '/images/score-item/ic_singles_kara_enabled.png', redirectlink: '/pages/kara/kara', redirecttype: 'page', appid: '' },
      { id: '3', name: '速成', image: '/images/score-item/ic_singles_rush_enabled.png', redirectlink: '/pages/rush/rush', redirecttype: 'page', appid: '' },
    ],

    recommends: [],
    keyword: '',

    hiddenVideo: true,
    courseVideoUrl: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var self = this;

    // get banner data
    let request = api.getBanner({
      params: {},
      success: function (res) {
        console.log('getBanner', res);

        self.setData({
          banners: res.data.data
        });
      },

      fail: function (err) {
        console.log(err);
      }
    });

    let rRequest = api.getRecommend({
      params: {},

      success: function (res) {
        console.log(res.data.data);
        self.setData({
          recommends: res.data.data
        });
      },

      fail: function (err) {
        console.log(err);
      }
    });
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onSearch: function (e) {
    console.log(e);

    wx.navigateTo({
      url: '/pages/search/search?keyword=' + (e.detail.value.keyword === undefined ? e.detail.value : e.detail.value.keyword),
    });

    this.setData({
      keyword: ''
    });
  },

  onMore: function (e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/scorelib/scorelib?type=' + e.currentTarget.dataset.rtype
    });
  },

  onAlbumClicked: function (e) {
    console.log(e);

    wx: wx.navigateTo({
      url: '/pages/album/album?albumId=' + e.currentTarget.dataset.albumId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onNavRedirect: function (e) {
    console.log(e);
    wx.navigateTo({
      url: e.currentTarget.dataset.redirectlink
    });
  },

  onVideoClicked: function (e) {
    console.log("onVideoClicked", e);
  },

  onScoreClicked: function (e) {
    console.log("onScoreClicked", e);
    wx.navigateTo({
      url: '/pages/score/score?scoreId=' + e.currentTarget.dataset.scoreId,
    });
  },

  onKaraClicked: function (e) {
    console.log("onKaraClicked", e);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})

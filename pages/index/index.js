//index.js
const api = require('../../utils/api.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    banners: [],
    topNav: [
      { id: '1', name: '曲谱', image: '/images/home/ic_singles_score_enabled.png', redirectlink: '/pages/shelf/shelf', redirecttype: 'app', appid: '' },
      { id: '2', name: '游戏', image: '/images/home/ic_singles_kara_enabled.png', redirectlink: '/pages/hot/hot', redirecttype: 'page', appid: '' },
      { id: '3', name: '速成', image: '/images/home/ic_singles_rush_enabled.png', redirectlink: '/pages/topic/topic', redirecttype: 'page', appid: '' },
    ],

    recommends: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var self = this;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // get banner data
    let request = api.getBanner({
      params: {},
      success: function(res) {
        console.log('getBanner', res);

        self.setData({
          banners: res.data.data
        });
      },

      fail: function(err) {
        console.log(err);
      }
    });

    let rRequest = api.getRecommend({
      params: {},

      success: function(res) {
        console.log(res.data.data);
        self.setData({
          recommends: res.data.data
        });
      },

      fail: function(err) {
        console.log(err);
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

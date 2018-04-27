// pages/scorelib/scorelib.js
const api = require('../../utils/api.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 2,

    firstTags: [],
    levelTags: [],

    scores: {},
    albums: {},

    tagShown: false,

    currentFirstTag: "推荐",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('loadTags!');
    this.loadTags();

    console.log('loadScores!');
    this.loadScores();

    console.log('loadAlbums!');
    this.loadAlbums();
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

  },

  loadTags: function() {
    api.getScoreLibTag({
      params: {},

      success: (res) => {
        console.log(res.data.data.first);

        this.setData({
          firstTags: res.data.data.first,
          levelTags: res.data.data.level
        });
      },

      fail: (err) => {
        console.log(err);
      }
    });
  },

  loadScores: function() {
    api.getScoresByTag({
      params: {},

      success: (res) => {
        console.log(res);

        this.setData({
          scores: res.data.data
        });
      },

      fail: (err) => {
        console.log(err);
      }
    })
  },

  loadAlbums: function() {
    api.getAlbumsByTag({
      params: {},

      success: (res) => {
        console.log(res);

        this.setData({
          albums: res.data.data
        });
      },

      fail: (err) => {
        console.log(err);
      }
    })
  }

})
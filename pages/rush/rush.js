// pages/rush/rush.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelTags: ['全部', '新手', '初级', '中级', '高级', '挑战'],

    rush: [],

    isRushNull: false,

    currentRushLevel: '全部',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadRush();
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
    this.resetPages();

    this.loadNext();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.currentPage += 1;

    this.loadNext();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadRush: function () {
    this.resetPages();

    this.loadNext();
  },

  loadNext: function () {
    let level = this.data.levelTags.indexOf(this.data.currentRushLevel);

    api.getRushList({
      params: {
        offset: (this.offset + api.PAGESIZE * (this.currentPage - 1)),
        limit: api.PAGESIZE,
        level: level == 0 ? -1 : level
      },

      success: (res) => {
        console.log(res);
        if (res.data.data.list.length > 0) {
          this.setData({
            rush: this.data.rush.concat(res.data.data.list),
            isRushNull: false
          });
        } else {
          if (this.data.rush.length == 0) {
            this.setData({
              isRushNull: true
            });
          }
        }
      },

      fail: (err) => {
        console.log(err);

        this.setData({
          isRushNull: true
        });
      }
    })
  },

  onLevelClicked: function (e) {
    console.log(e);

    this.setData({
      currentRushLevel: e.currentTarget.dataset.item
    });

    this.loadRush();
  },

  resetPages: function () {
    this.offset = 0;
    this.currentPage = 1;
    this.setData({
      rush: [],
    });
  }
})
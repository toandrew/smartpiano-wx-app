// pages/search/search.js

const app = getApp();

const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeyword:[],
    history: [],
    searchResults: {},
    showResult: false,
    hideDeleteIcon: true,

    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadHotSearch();
    this.loadSearchHistory();
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

  loadHotSearch: function() {
    api.hotSearch({
      param: {},
      success: (res) => {
        console.log(res);

        this.setData({
          hotKeyword: res.data.data
        });
      },
      fail: (err) => {

      }
    })
  },

  loadSearchHistory: function() {

  },

  toSearch: function(e) {
    console.log('search....' + e.detail.value.keyword);

    if (e.detail.value.keyword == 0) {
      wx.showToast({
        title: '请输入搜索内容',
      });

      return;
    }

    api.search({
      params: { keyword: e.detail.value.keyword},

      success: (res) => {
        console.log(res);
        this.setData({
          searchResults: res.data.data,
          showResult: true
        });
      },

      fail: (err) => {
        console.log(err);
      }
    });
  },

  onSearchKeyInput: function(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        hideDeleteIcon: false
      })
    };
  },

  deleteKeyword: function(e) {
    this.setData({
      keyword: '',
      showResult: false,
      hideDeleteIcon: true
    })
  },

  onInputblur: function(e) {
    console.log('onInputblur!!!');
  }
})
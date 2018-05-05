// pages/album/album.js

const api = require('../../utils/api.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: {},

    logoUrl: null,

    albumId: -1,
    scoreNum: '.',

    albumTitle: '',
    albumDesc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      albumId: options.albumId ? options.albumId: 26
    })

    this.loadAlbumDetail();
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

  loadAlbumDetail: function() {
    api.getAlbumDetail({
      params: {
        albumId: this.data.albumId
      },

      success: (res) => {
        console.log(res);

        this.setData({
          logoUrl: res.data.data.cover_image_url,
          albumTitle: res.data.data.name,
          albumDesc: res.data.data.description,
          scoreNum: res.data.data.list.length,
          scores: res.data.data
        })
      },

      fail: (err) => {
        console.log(err);
      }
    });
  },

  onScoreClicked: function(e) {
    console.log(e);
  }
})
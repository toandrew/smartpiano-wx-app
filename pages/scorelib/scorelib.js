// pages/scorelib/scorelib.js
const api = require('../../utils/api.js');

const TAG_OPEN_IMG_URL = '/images/score-lib/ic_category_open.png';
const TAG_PACKUP_IMG_URL = '/images/score-lib/ic_category_packup.png';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 1,
    currentFilter: 'hot',

    firstTags: [],
    levelTags: [],

    scores: {},
    albums: {},

    tagShown: false,

    currentLevel: -1,

    subTags: [-1],
    currentFirstTagId: -1,

    moreImg: TAG_OPEN_IMG_URL,

    isNull: false,
    nullTip: {
      tipText: 'sorry，没有找到您要的内容，换个条件试试吧!',
      actionText: '返回',
      routeUrl: '/pages/scorelib/scorelib'
    },

    pressedTag: '',

    hiddenVideo: true,
    courseVideoUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    if (type) {
      this.setData({
        currentType: type
      });
    }

    this.loadTags();

    this.doFilter();
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

  loadTags: function () {
    api.getScoreLibTag({
      params: {},

      success: (res) => {
        console.log(res);
        this.setData({
          firstTags: res.data.data.first,
          levelTags: res.data.data.level,
        });
      },

      fail: (err) => {
        console.log(err);
      }
    });
  },

  onMoreClicked: function (e) {
    let tagShown = !this.data.tagShown;
    this.setData({
      tagShown: tagShown,
      moreImg: !tagShown ? TAG_OPEN_IMG_URL : TAG_PACKUP_IMG_URL
    });
  },

  onFirstTagClicked: function (e) {
    this.setData({
      currentFirstTagId: e.currentTarget.dataset.item.id,

      subTags: [-1],
      currentLevel: -1,

      pressedTag: e.currentTarget.dataset.item.id,
    });

    this.doFilter();
  },

  onSubTagClicked: function (e) {
    this.setData({
      subTags: [e.currentTarget.dataset.item.id]
    });

    console.log(this.data.subTags);

    this.doFilter();
  },

  onLevelClicked: function (e) {
    this.setData({
      currentLevel: e.currentTarget.dataset.item.id
    });

    this.doFilter();
  },

  doFilter: function () {
    let rtype = this.data.currentType;
    let sortType = this.data.currentFilter;

    let ids = [this.data.currentFirstTagId];

    ids = ids.concat(this.data.subTags);

    ids.push(this.data.currentLevel);

    console.log(ids);

    api.scoreLibFilter({
      params: {
        type: rtype,
        ids: ids.join(','),
        sort_type: sortType,
        offset: 0,
        limit: 30
      },

      success: (res) => {
        console.log(res);
        if (res.data.data.list && res.data.data.list.length == 0) {
          this.setData({
            isNull: true
          });

          return;
        }

        if (rtype == 1) {
          this.setData({
            isNull: false,
            scores: res.data.data
          });
        } else {
          this.setData({
            isNull: false,
            albums: res.data.data
          });
        }
      },

      fail: (err) => {
        console.log(err);
      }
    });
  },

  onCategoryClicked: function (e) {
    this.setData({
      currentType: e.currentTarget.dataset.type
    });

    this.doFilter();
  },

  onFilterClicked: function (e) {
    this.setData({
      currentFilter: e.currentTarget.dataset.filter
    });

    this.doFilter();
  },

  onAlbumClicked: function (e) {
    console.log(e);

    wx: wx.navigateTo({
      url: '/pages/album/album?albumId=' + e.currentTarget.dataset.albumId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    });
  },

  onVideoClicked: function (e) {
    console.log("onVideoClicked", e);
  },

  onScoreClicked: function (e) {
    console.log("onScoreClicked", e);
  },

  onKaraClicked: function (e) {
    console.log("onKaraClicked", e);
  },

  onEmptyClicked: function(e) {
    if (this.data.tagShown) {
      this.setData({
        tagShown: false,
        moreImg: TAG_OPEN_IMG_URL
      });
    }
  }
})
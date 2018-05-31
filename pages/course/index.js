const api = require('../../utils/api.js');

var app = getApp()
Page({
  data: {
    systemInfo: {},
    _api: {},
    navbar: ['新手入门', '单曲讲解', '综合课堂'],
    currentNavbar: '0',

    noviceCourses: [],
    singleCourses: {},
    compositeCourses: {},
    latest_list: [],
    latest_last_id: 0,

    levelTags: ['全部', '新手', '初级', '中级', '高级', '挑战'],
    currentSingleLevel: '全部',
    currentCompositeLevel: '全部',

    isNebieNull: false,
    isSingleNull: false,
    isCompositeNull: false,

    nullTip: {
      tipText: 'sorry，没有找到您要的内容，换个条件试试吧!',
      actionText: '确定',
      routeUrl: ''
    },

    hiddenVideo: true,
    courseVideoUrl: '',
  },

  onLoad() {
    this.getAllCourses();

    this.videoContext = wx.createVideoContext('courseVideo');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.closeVideo();
  },

  /**
   * Get all courses
   */
  getAllCourses() {
    this.loadNovieCourse();

    this.loadSingleCourse();

    this.loadCompositeCourse();
  },

  /**
   * 点击新手详情页
   */
  onNewbieItemClick(e) {
    let noviceId = e.currentTarget.dataset.noviceId;

    wx.navigateTo({
      url: '/pages/newbie/newbie?noviceId=' + noviceId,
    });
  },

  /**
   * 切换 navbar
   */
  swichNav(e) {
    this.closeVideo();

    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });

    console.log(e.currentTarget.dataset.idx);
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  swiperTab(e) {
    console.log("swiperTab");

    this.closeVideo();

    this.setData({
      currentNavbar: e.detail.current,
    })
  },

  onAlbumClicked: function (e) {
    console.log(e);

    wx: wx.navigateTo({
      url: '/pages/album/album?albumId=' + e.currentTarget.dataset.albumId + '&&iscourse=true',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onLevelClicked: function (e) {
    console.log(e)
    switch (this.data.currentNavbar) {
      case 1:
        this.setData({
          currentSingleLevel: e.detail
        });

        this.loadSingleCourse();
        break;
      case 2:
        this.setData({
          currentCompositeLevel: e.detail
        });

        this.loadCompositeCourse();
        break;
      default:
        break;
    }
  },

  loadSingleCourse: function () {
    let offset = 0;
    let limit = 100;
    let level = this.data.levelTags.indexOf(this.data.currentSingleLevel);

    api.getSingleCourse({
      params: {
        offset: offset,
        limit: limit,
        level: level == 0 ? -1 : level
      },

      success: (res) => {
        console.log(res);
        this.setData({
          singleCourses: res.data.data,
          isSingleNull: res.data.data.list.length == 0 ? true : false
        });
      },

      fail: (err) => {
        console.log(err);
      }
    });
  },

  loadCompositeCourse: function () {
    let offset = 0;
    let limit = 30;
    let level = this.data.levelTags.indexOf(this.data.currentCompositeLevel);

    api.getCompositeCourse({
      params: {
        offset: offset,
        limit: limit,
        level: level == 0 ? -1 : level
      },

      success: (res) => {
        console.log(res);
        this.setData({
          compositeCourses: res.data.data,
          isCompositeNull: res.data.data.list.length == 0 ? true : false
        });
      },

      fail: (err) => {
        console.log(err);
      }
    });
  },

  loadNovieCourse: function () {
    api.getNoviceCourse({
      params: {
        offset: 0,
        limit: 30
      },
      success: (res) => {
        console.log(res);

        this.setData({
          noviceCourses: res.data.data.list,

          isNebieNull: res.data.data.list.length == 0 ? true : false
        });
      },

      fail: function (err) {
        console.log(err);
      }
    });
  },

  onVideoClicked: function (e) {
    console.log("onVideoClicked", e);
    let url = e.currentTarget.dataset.url;
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
      url: '/pages/score/score?scoreId=' + e.currentTarget.dataset.scoreId,
    });
  },

  onKaraClicked: function (e) {
    console.log("onKaraClicked", e);
  },

  closeVideo: function (e) {
    if (this.data.hiddenVideo) {
      return;
    }

    this.setData({
      hiddenVideo: true,
      courseVideoUrl: ''
    });

    this.videoContext.stop();
  }
})

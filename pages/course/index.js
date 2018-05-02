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
    latest_last_id: 0
  },

  onLoad() {
    this.getAllCourses()
    this.pullUpLoad()
  },

  /**
   * Get all courses
   */
  getAllCourses() {
    var self = this;

    api.getNoviceCourse({
      params: {
        offset: 0,
        limit: 20
      },
      success: function (res) {
        console.log(res);

        self.setData({
          noviceCourses: res.data.data.list
        });
      },

      fail: function (err) {
        console.log(err);
      }
    });

    api.getSingleCourse({
      params: {
        offset: 0,
        limit: 20,
        level: 1
      },
      success: function (res) {
        console.log(res);

        self.setData({
          singleCourses: res.data.data
        });

        console.log(self.singleCourses);
      },

      fail: function (err) {
        console.log(err);
      }
    });

    api.getCompositeCourse({
      params: {
        offset: 0,
        limit: 20,
        level: 1
      },
      success: function (res) {
        console.log(res);

        self.setData({
          compositeCourses: res.data.data
        });
      },

      fail: function (err) {
        console.log(err);
      }
    });
  },

  /**
   * 点击跳转详情页
   */
  onItemClick(e) {
    var targetUrl = api.PAGE_WORK
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl + '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * 切换 navbar
   */
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
    // if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
    //   this.pullUpLoadLatest()
    // }

    console.log(e.currentTarget.dataset.idx);
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    switch (this.data.currentNavbar) {
      case '0':
        this.setData({
          list: [],
          hot_last_id: 0
        })
        this.pullUpLoad()
        break
      case '1':
        this.setData({
          latest_list: [],
          latest_list_id: 0
        })
        this.pullUpLoadLatest()
        break
      case '2':
        wx.stopPullDownRefresh()
        break
    }
  },

  /**
   * [推荐]上拉刷新
   */
  pullUpLoad() {
    // wx.showNavigationBarLoading()
    // api.get(api.HOST_IOS + api.HOT + '?last_id=' + this.data.hot_last_id)
    //   .then(res => {
    //     this.setData({
    //       list: this.data.list.concat(res.data.list),
    //       hot_last_id: res.data.last_id
    //     })
    //     wx.hideNavigationBarLoading()
    //     wx.stopPullDownRefresh()
    //   })
  },

  /**
   * [最新]上拉刷新
   */
  pullUpLoadLatest() {
    // wx.showNavigationBarLoading()
    // api.get(api.HOST_IOS + api.LATEST + '?last_id=' + this.data.latest_last_id)
    //   .then(res => {
    //     this.setData({
    //       latest_list: this.data.latest_list.concat(res.data.list),
    //       latest_last_id: res.data.last_id
    //     })
    //     wx.hideNavigationBarLoading()
    //     wx.stopPullDownRefresh()
    //   })
  },

  swiperTab(e) {
    console.log("swiperTab");
    this.setData({
      currentNavbar: e.detail.current,
    })
  },

  onAlbumClicked: function (e) {
    console.log(e);

    wx: wx.navigateTo({
      url: '/pages/album/album',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})

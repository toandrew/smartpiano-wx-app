// components/album-grid/algum-grid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAlbumClicked: function(e) {
      console.log(e);

      wx: wx.navigateTo({
        url: '/pages/album/album?albumId=' + e.currentTarget.dataset.albumId,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      });
    }
  }
})

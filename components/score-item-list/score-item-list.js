// components/score-item-list/scor-item-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },

    hiddenVideo: {
      type: Boolean,
      value: true
    },

    courseVideoUrl: {
      type: String,
      value: ''
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
    onScoreClicked: function(e) {
      console.log(e);

      this.triggerEvent("onScoreClicked", e.currentTarget.dataset.scoreId);
    },

    onVideoClicked: function(e) {
      console.log(e);

      this.triggerEvent("onVideoClicked", e.currentTarget.dataset.url);
    },

    closeVideo: function(e) {
      this.triggerEvent("closeVideo", e.currentTarget.dataset.url);
    }
  }
})

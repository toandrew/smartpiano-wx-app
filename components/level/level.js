// components/level/level.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    levelTags: {
      type: Array,
      value: []
    },

    currentLevel: {
      type: String,
      value: "全部"
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
    onLevelClicked: function(e) {
      console.log(e);

      this.triggerEvent("onLevelClicked", e.currentTarget.dataset.item);
    }
  }
})

// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreUrl: '',//http://app-dev-img.xmpl.1tai.com/tune/2/5/415/1.jpg', // 'http://app-dev-img.xmpl.1tai.com/tune/2/5/415/1.jpg'
    scoreRange: [[1, 1, 1, 143], [1, 2, 144, 284], [1, 3, 285, 384], [1, 4, 385, 414], [2, 5, 415, 455], [2, 6, 456, 538], [2, 7, 539, 598], [2, 8, 599, 658], [2, 9, 659, 718], [2, 10, 719, 778],
    [2, 11, 779, 838], [2, 12, 839, 898], [2, 13, 899, 930], [3, 14, 931, 945], [3, 15, 946, 959], [3, 16, 960, 973], [3, 17, 974, 986], [3, 18, 987, 999], [3, 19, 1000, 1016], [3, 20, 1017, 1032], [3, 21, 1033, 1047],
    [3, 22, 1048, 1061], [3, 23, 1062, 1073], [4, 24, 1074, 1101], [4, 25, 1102, 1142], [4, 26, 1143, 1166], [4, 27, 1167, 1188], [5, 28, 1189, 1236], [5, 29, 1237, 1284], [5, 30, 1285, 1337], [5, 31, 1338, 1379]],

    showHint: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    if (options.showHint) {
      this.setData({
        showHint: true
      })
    } else {
      this.getRandomScoreUrl(options.scoreId);
    }
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

  getRandomScoreUrl: function (scoreId) {
    let id = scoreId % 1379;
    if (id == 0) {
      id = 1379;
    }

    for (var i = 0; i < this.data.scoreRange.length; i++) {
      if (id >= this.data.scoreRange[i][2] && id <= this.data.scoreRange[i][3]) {
        break;
      }
    }

    this.setData({
      scoreUrl: 'http://app-dev-img.xmpl.1tai.com/tune/' + this.data.scoreRange[i][0] + '/' + this.data.scoreRange[i][1] + '/' + id + '/1.jpg'
    });
  }
})
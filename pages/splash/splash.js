// pages/splash/splash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: '../../images/splash/bg_splash.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("splash onLoad");
    setTimeout(function() {
      // 如果已经登录过, 直接调转到首页
      var token = wx.getStorageSync('token', "");
      console.log("token:" + token);

      if (token.length != 0) {
        wx.switchTab({
          url: '/pages/index/index'
        });
      } else {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("splash onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("splash onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("splash onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("splash onUnload");
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
  
  }
})
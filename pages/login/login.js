//index.js
var app = getApp();
var utils = require("../../utils/util.js");

Page({
  data: {
    codeMsg: "获取验证码",
    visible: "none",
    mobile: ''
  },

  onLoad: function () {
    console.log("login page load");

    // 如果已经登录过, 直接调转到首页
    var token = wx.getStorageSync('token', "");
    console.log("token:" + token);

    if (token.length != 0) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    } else {
      this.setData({ visible: "yes" });
    }
  },

  onUnload: function () {
    if (this.codeTimer) {
      clearInterval(this.codeTimer);
      this.codeTimer = null;
    }
    console.log("login page unload");
  },

  onShow: function () {
    if (this.codeTimer) {
      clearInterval(this.codeTimer);
      this.codeTimer = null;
    }

    var that = this;
    utils.checkRemainTime(that, 'loginCodeRequestTime', function () {
      that.setCodeTimer();
    });
    console.log("login page  show");
  },

  setCodeTimer: function () {
    var that = this;
    utils.startRemainTimer(that, function () {
      try {
        wx.removeStorageSync('loginCodeRequestTime');
      } catch (e) {
        //nothing to do
      }
    })
  },

  onSubmit: function (e) {
    console.log("onSubmit");

    // 检查手机号和验证码
    if (!utils.validatePhone(this.mobile, true)
      || !utils.validateCode(this.vcode, true)) {
      return;
    }

    var postData = {
      mobile: this.mobile,
      code: this.vcode
    }

    console.log(JSON.stringify(postData));

    var that = this;
    app.api.login({
      params: postData,

      success: function (res) {
        console.log("onSubmit success");

        wx.setStorageSync('token', res.data.data.token);
        wx.setStorageSync('mobile', that.data.mobile);

        // 跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        });
      },

      fail: function (res) {
        console.log('failed: ' + res);
      }
    });

    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      mask: true,
      duration: 10000
    });

    this.setData({
      mobile: this.mobile
    });
  },

  onRequestCode: function () {
    console.log("onRequestCode");

    if (this.codeTimeRemain > 0) {
      console.log("waiting code time expire");
      return;
    }

    //检查手机号是否合法
    if (!utils.validatePhone(this.mobile, true)) {
      return;
    }

    var that = this;
    app.api.requestSmsToken({
      params: {},
      success: function (res) {
        console.log("requestSmsToken ok:" + res);
        var postData = {
          mobile: that.mobile,
          access_token: res.data.data.token
        };
        console.log(JSON.stringify(postData));

        app.api.requestSmsCode({
          params: postData,
          success: function (res) {
            console.log('requestSmsCode ok!' + res);
          },
          fail: function (err) {
            console.log('requestSmsCode failed!' + err);
            that.codeTimeRemain = -1;
          }
        })
      },
      fail: function (err) {
        console.log('requestSmsToken failed!' + err);
        that.codeTimeRemain = -1;
      }
    });

    this.codeTimeRemain = 60;
    this.setCodeTimer();
    wx.setStorageSync('loginCodeRequestTime', utils.getCurrentTimeStamp() / 1000);
  },

  onPhoneFinish: function (e) {
    this.mobile = e.detail.value.trim();
  },

  onCodeFinish: function (e) {
    this.vcode = e.detail.value.trim();
  }
})
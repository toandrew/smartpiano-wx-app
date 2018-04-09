//index.js
var app = getApp()
var utils = require("../../utils/util.js")

Page({
  data: {
    codeMsg: "获取验证码",
    visible: "none"
  },
  onLoad: function () {
    console.log("login page load")

    //如果已经登录过, 直接调转到课程页面
    var phone = wx.getStorageSync('phone', "")
    if (utils.validatePhone(phone)) {
      wx.redirectTo({
        url: '../../pages/course/course?phone=' + phone
      })
    } else {
      this.setData({ visible: "yes" })
    }
  },
  onUnload: function () {
    if (this.codeTimer) {
      clearInterval(this.codeTimer)
    }
    console.log("login page unload")
  },
  onShow: function () {
    if (this.codeTimer) {
      clearInterval(this.codeTimer)
      this.codeTimer = null
    }
    var that = this
    utils.checkRemainTime(that, 'loginCodeRequestTime', function () {
      that.setCodeTimer()
    })
    console.log("login page  show")
  },
  setCodeTimer: function () {
    var that = this
    utils.startRemainTimer(that, function () {
      try {
        wx.removeStorageSync('loginCodeRequestTime')
      } catch (e) {
        //nothing to do
      }
    })
  },
  onSubmit: function (e) {
    console.log("onSubmit")
    //检查手机号和验证码
    if (!utils.validatePhone(this.phone, true)
      || !utils.validateCode(this.vcode, true)) {
      return
    }


    var postData = {
      phone: this.phone,
      vcode: this.vcode
    }

    console.log(JSON.stringify(postData))

    app.statistic.trackUser(this.phone, { phone: this.phone })
    app.statistic.trackEvent("登录", { "phone": this.phone })

    var that = this
    app.webservice.checkLoginCode(postData,
      function (res) {
        app.webservice.checkResponse(res,
          function (res) {
            //TODO, 这些统计项是否应该直接放到webservice中做?
            app.statistic.trackEvent("登录", {
              phone: that.phone,
              ret: "success"
            })
            console.log("onSubmit success")
            wx.setStorageSync('phone', that.phone)
            //跳转到课程列表页面
            wx.redirectTo({
              url: '../../pages/course/course'
            })
          },
          function (res) {
            app.statistic.trackEvent("登录", {
              phone: that.phone,
              ret: "fail",
              msg: res.errMsg
            })
          }
        )
      },
      function (res) {
        app.statistic.trackEvent("登录", {
          phone: that.phone,
          ret: "fail",
          msg: res.errMsg
        })
      }
    )

    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      mask: true,
      duration: 10000
    })
  },
  onRequestCode: function () {
    console.log("onRequestCode")
    if (this.codeTimeRemain > 0) {
      console.log("waiting code time expire")
      return
    }

    //检查手机号是否合法
    if (!utils.validatePhone(this.phone, true)) {
      return
    }

    var postData = { phone: this.phone }

    app.statistic.trackUser(this.phone, { phone: this.phone })
    app.statistic.trackEvent("获取登录验证码", {
      phone: this.phone
    })

    console.log(JSON.stringify(postData))

    var that = this
    app.webservice.login(postData,
      function (res) {
        app.webservice.checkResponse(res,
          function (res) {
            app.statistic.trackEvent("获取登录验证码", {
              phone: that.phone,
              ret: "success"
            })
            console.log("onRequestCode success")
          },
          function (res) {
            //请求失败, 取消定时
            that.codeTimeRemain = -1
            app.statistic.trackEvent("获取登录验证码", {
              phone: that.phone,
              ret: "fail",
              msg: res.errMsg
            })
          }
        )
      },
      function (res) {
        //请求失败, 取消定时
        that.codeTimeRemain = -1
        app.statistic.trackEvent("获取登录验证码", {
          phone: that.phone,
          ret: "fail",
          msg: res.errMsg
        })
        console.log("onRequestCode failed")
      }
    )

    this.codeTimeRemain = 60
    this.setCodeTimer()
    wx.setStorageSync('loginCodeRequestTime', utils.getCurrentTimeStamp() / 1000)
  },
  onRegister: function (e) {
    app.statistic.trackEvent("点击注册", { phone: this.phone || "10000000000" })
    wx.navigateTo({
      url: '../../pages/auth/auth?id=0'
    })
  },
  onPhoneFinish: function (e) {
    this.phone = e.detail.value.trim()
    utils.validatePhone(this.phone, true)
  },
  onCodeFinish: function (e) {
    this.vcode = e.detail.value.trim()
    utils.validateCode(this.vcode, true)
  },
})
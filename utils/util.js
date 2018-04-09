function formatTime(seconds) {
  var min = ~~(seconds / 60) //取整
  var sec = parseInt(seconds - min * 60)
  return ('00' + min).substr(-2) + ':' + ('00' + sec).substr(-2)
}

function formatTime2(seconds) {
  return ('00' + seconds).substr(-2)
}

function getCurrentTimeStamp() {
  var timestamp = new Date().getTime()
  return timestamp
}

function startRemainTimer(page, cb) {
  page.setData({
    codeMsg: "还剩: " + formatTime2(~~page.codeTimeRemain) + " s"
  })
  page.codeTimer = setInterval(function () {
    //console.log("time remain:" + page.codeTimeRemain)
    page.codeTimeRemain = page.codeTimeRemain - 1

    if (page.codeTimeRemain < 0) {
      clearInterval(page.codeTimer)
      page.codeTimer = null
      page.setData({
        codeMsg: "获取验证码"
      })
      cb && cb()
    } else {
      page.setData({
        codeMsg: "还剩: " + formatTime2(~~page.codeTimeRemain) + " s"
      })
    }
  }, 1000)
}

function checkRemainTime(page, key, cb) {
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      var timeExpired = getCurrentTimeStamp() / 1000 - value
      page.codeTimeRemain = 60 - timeExpired
      if (page.codeTimeRemain > 0) {
        cb && cb()
      } else {
        page.setData({
          codeMsg: "获取验证码"
        })
      }
    }
  } catch (e) {
    page.codeTimeRemain = -1
  }
}

function validatePhone(phoneNum, showToast) {
  //以1开头的11位数字
  var reg = /^1[0-9]{10}$/
  var flag = reg.test(phoneNum)
  if (!flag && showToast) {
    wx.showToast({
      title: '手机号不合法',
      duration: 2000
    })
  }
  return flag
}

function validateCode(vcode, showToast) {
  //6位数字
  var reg = /^[0-9]{6}$/
  var flag = reg.test(vcode)
  if (!flag && showToast) {
    wx.showToast({
      title: '验证码不正确',
      duration: 2000
    })
  }
  return flag
}

function validateSchoolCode(schoolCode, showToast) {
  //只包含大写字母和数字
  var reg = /^[A-Z0-9]+$/
  var flag = reg.test(schoolCode)
  if (!flag && showToast) {
    wx.showToast({
      title: '机构代码不正确',
      duration: 2000
    })
  }
  return flag
}

function validateSchool(school, showToast) {
  var length = school.length
  var errMsg = ""
  if (length == 0) {
    errMsg = "学校不能为空"
  } else if (length > 64) {
    errMsg = "学校的名字也太长了"
  }

  if (errMsg.length > 0 && showToast) {
    wx.showToast({
      title: errMsg,
      duration: 2000
    })
  }

  return errMsg.length > 0 ? false : true
}

function validateName(name, showToast) {
  var length = name.length
  var errMsg = ""
  if (length == 0) {
    errMsg = "姓名不能为空"
  } else if (length > 64) {
    errMsg = "这个名字也太长了"
  }

  if (errMsg.length > 0 && showToast) {
    wx.showToast({
      title: errMsg,
      duration: 2000
    })
  }

  return errMsg.length > 0 ? false : true
}

function validateBirthday(birthday, showToast) {
  var reg = /^[1-2][0-9]{7}$/
  var flag = reg.test(birthday)

  if (!flag && showToast) {
    wx.showToast({
      title: "请按要求输入出生日期",
      duration: 2000
    })
  }
  return flag
}

function formatBirthday(birthday) {
  return birthday.substr(0, 4) + "-" + birthday.substr(4, 2) + "-" + birthday.substr(6, 2)
}

function log(msg) {
  console.log(msg)
}

module.exports = {
  log: log,
  formatTime: formatTime,
  formatTime2: formatTime2,
  getCurrentTimeStamp: getCurrentTimeStamp,
  startRemainTimer: startRemainTimer,
  checkRemainTime: checkRemainTime,
  validatePhone: validatePhone,
  validateCode: validateCode,
  validateSchoolCode: validateSchoolCode,
  validateSchool: validateSchool,
  validateName: validateName,
  validateBirthday: validateBirthday,
  formatBirthday: formatBirthday
}

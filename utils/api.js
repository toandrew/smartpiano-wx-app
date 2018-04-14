// sms login
const SMS_LOGIN_URL = '/smart-piano/v4/user/sms_login';
const SMS_TOKEN = '/smart-piano/v4/user/sms_token';
const SMS_CODE = '/smart-piano/v4/user/send_verification_code';

// banner
const BANNER_URL = '/smart-piano/v4/banner';

// recommend
const RECOMMEND_URL = '/smart-piano/v4/recommend'

const network = require('./network.js');

// banner
function getBanner(handler) {
  handler.url = BANNER_URL;
  return network.GET(handler);
}

// recommend
function getRecommend(handler) {
  handler.url = RECOMMEND_URL;
  return network.GET(handler);
}

// login by mobile
function login(handler) {
  handler.url = SMS_LOGIN_URL;

  return network.POST(handler);
}

// Get sms code
function requestSmsCode(handler) {
  handler.url = SMS_CODE;

  return network.POST(handler);
}

// Get sms token
function requestSmsToken(handler) {
  handler.url = SMS_TOKEN;

  return network.POST(handler);
}

function checkResponse(res, success, fail) {
  var errMsg = "";
  if (res.statusCode != 200) {
    errMsg = res.statusCode + ": 网络问题";
  } else {
    var code = res.data.meta.code;
    if (code != 200) {
      errMsg = code + ":" + res.data.meta.message;
    }
  }

  if (errMsg.length > 0) {
    wx.showToast({
      title: errMsg,
      icon: "success",
      duration: 2000
    })
    res.errMsg = errMsg
    fail && fail(res)
  } else {
    success && success(res)
  }
}

module.exports = {
  checkResponse: checkResponse,
  requestSmsToken: requestSmsToken,
  requestSmsCode: requestSmsCode,
  login: login,
  getBanner: getBanner,
  getRecommend: getRecommend
}
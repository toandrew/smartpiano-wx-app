const API_DEV_HOST = 'https://smart-v4-api-dev.1tai.com';
const API_PRE_HOST = 'https://smart-v4-api-pre.1tai.com';
const API_PRODUCT_HOST = 'https://smart-v4-api.1tai.com';

var API_HOST = API_PRODUCT_HOST;


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

var requestHandler = {
  url: '',
  params: {},
  success: function(res) {
  },

  fail: function (err) {
  }
}

function GET(requestHandler) {
  requestHandler.contentType = 'application/json';
  return request('GET', requestHandler);
}

function POST(requestHandler) {
  requestHandler.contentType = 'application/x-www-form-urlencoded';
  return request('POST', requestHandler);
}

function request(method, requestHandler) {
  var params = requestHandler.params;
  var url = requestHandler.url;
  var token = wx.getStorageSync('token');
  return wx.request({
    url: API_HOST + url,
    data:params,
    method: method,
    header: {
      'content-type': requestHandler.contentType,
      'X-VER': '4.0',
      'X-BUILD': '400',
      'X-UDID':'',
      'X-DEVICE': '',
      'X-PLATFORM': 'Android',
      'X-PAD': '0',
      'X-LANGUAGE': 'zh',
      'TOKEN': token
    },
    success: function(res) {
      checkResponse(res, requestHandler.success, requestHandler.fail);
    },

    fail: function (err) {
      requestHandler.fail(err);
    },

    complete: function() {
      wx.stopPullDownRefresh();
    }
  })
}

module.exports = {
  API_HOST: API_HOST,
  GET: GET,
  POST: POST
}


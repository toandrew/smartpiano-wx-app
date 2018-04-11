const API_DEV_HOST = 'https://smart-v4-api-dev.1tai.com';
const API_PRE_HOST = 'https://smart-v4-api-pre.1tai.com';
const API_PRODUCT_HOST = 'https://smart-v4-api.1tai.com';

var API_HOST = API_DEV_HOST;

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
      requestHandler.success(res);
    },

    fail: function (err) {
      requestHandler.fail(err);
    },

    complete: function() {
    }
  })
}

module.exports = {
  API_HOST: API_HOST,
  GET: GET,
  POST: POST
}


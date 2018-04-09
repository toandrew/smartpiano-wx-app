// sms login
const SMS_LOGIN_URL = '/smart-piano/v4/user/sms_login';
const SMS_TOKEN = '/smart-piano/v4/user/sms_token';
const SMS_CODE = '/smart-piano/v4/user/send_verification_code';

// banner
const BANNER_URL = '/smart-piano/v4/banner';

const network = require('./network.js');

let apiServer = {
  host: network.API_HOST,

  api: {
    login: SMS_LOGIN_URL,
    getSmsToken: SMS_TOKEN,
    sendSmsCode: SMS_CODE,

    getBanner: BANNER_URL,
  }
}


// banner
function getBanner(handler) {
  handler.url = BANNER_URL;
  return network.GET(handler);
}
module.exports = {
  getBanner: getBanner
}
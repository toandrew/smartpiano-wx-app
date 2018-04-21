const network = require('./network.js');

// sms login
const SMS_LOGIN_URL = '/smart-piano/v4/user/sms_login';
const SMS_TOKEN = '/smart-piano/v4/user/sms_token';
const SMS_CODE = '/smart-piano/v4/user/send_verification_code';

// banner
const BANNER_URL = '/smart-piano/v4/banner';

// recommend
const RECOMMEND_URL = '/smart-piano/v4/recommend'

// newbie
const NOVICE_COURSE_URL = '/smart-piano/v4/newbie/begin';
// 
const SINGLE_COURSE_URL = '/smart-piano/v4/tutorial/single';

const COMPOSITE_COURSE_URL = '/smart-piano/v4/tutorial/multiple';

// hot search
const HOT_SEARCH_URL = '/smart-piano/v4/hot-search';

// search by key
const SEARCY_BY_KEY_URL = '/smart-piano/v4/search/{keyword}?type=1&&offset=0&&limit=10';

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

// newbie courses
function getNoviceCourse(handler) {
  handler.url = NOVICE_COURSE_URL;
  return network.GET(handler);
}

// singles courses
function getSingleCourse(handler) {
  handler.url = SINGLE_COURSE_URL;
  return network.GET(handler);
}

// composite courses
function getCompositeCourse(handler) {
  handler.url = COMPOSITE_COURSE_URL;
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

// hot search
function hotSearch(handler) {
  handler.url = HOT_SEARCH_URL;

  return network.GET(handler);
}

// search by key
function search(handler) {
  let keyword = handler.params.keyword;
  handler.url = SEARCY_BY_KEY_URL.replace(/\{keyword\}/i, keyword);
  console.log('requestSearch:' + handler.url);
  return network.GET(handler);
}

module.exports = {
  // checkResponse: network.checkResponse,

  // login
  requestSmsToken: requestSmsToken,
  requestSmsCode: requestSmsCode,
  login: login,

  // home
  getBanner: getBanner,
  getRecommend: getRecommend,

  // courses
  getNoviceCourse: getNoviceCourse,
  getSingleCourse: getSingleCourse,
  getCompositeCourse: getCompositeCourse,

  // search
  hotSearch: hotSearch,
  search: search,
}
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
const SINGLE_COURSE_URL = '/smart-piano/v4/tutorial/single?offset={offset}&&limit={limit}&&level={level}';

const COMPOSITE_COURSE_URL = '/smart-piano/v4/tutorial/multiple?offset={offset}&&limit={limit}&&level={level}';

// hot search
const HOT_SEARCH_URL = '/smart-piano/v4/hot-search';

// search by key
const SEARCY_BY_KEY_URL = '/smart-piano/v4/search/{keyword}?type=1&&offset=0&&limit=10';

// score lib's tag
const SCORE_LIB_TAG_URL = '/smart-piano/v4/tag';

const SCORE_LIB_SCORES_URL = '/smart-piano/v4/classify?type=1&&ids=&&sort_type="hot"&&offset=0&&limit=10';

const SCORE_LIB_ALBUM_URL = '/smart-piano/v4/classify?type=2&&ids=&&sort_type="hot"&&offset=0&&limit=10';

const SCORE_LIB_FILTER_URL = '/smart-piano/v4/classify';

// album's detail
const ALBUM_DETAIL_URL = '/smart-piano/v4/album/{album_id}';

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

// get single for tutorial course
function getSingleCourse(handler) {
  let offset = handler.params.offset;;
  let limit = handler.params.limit;;
  let level = handler.params.level;

  handler.url = SINGLE_COURSE_URL.replace(/\{offset\}/i, offset).replace(/\{limit\}/i, limit).replace(/\{level\}/i, level);

  return network.GET(handler);
}

// get multiple for tutorial course
function getCompositeCourse(handler) {
  let offset = handler.params.offset;;
  let limit = handler.params.limit;;
  let level = handler.params.level;

  handler.url = COMPOSITE_COURSE_URL.replace(/\{offset\}/i, offset).replace(/\{limit\}/i, limit).replace(/\{level\}/i, level);

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

// get score lib's tag
function getScoreLibTag(handler) {
  handler.url = SCORE_LIB_TAG_URL;

  return network.GET(handler);
}

// get scores
function getScoresByTag(handler) {
  handler.url = SCORE_LIB_SCORES_URL;

  return network.GET(handler);
}

// get albums
function getAlbumsByTag(handler) {
  handler.url = SCORE_LIB_ALBUM_URL;

  return network.GET(handler);
}

// do filter in score lib
function scoreLibFilter(handler) {
  let rtype = handler.params.type;
  let ids = handler.params.ids;
  let sortType = handler.params.sort_type;
  let offset = handler.params.offset;
  let limit = handler.params.limit;

  handler.url = SCORE_LIB_FILTER_URL + '?type=' + rtype + "&&ids=" + ids + "&&sort_type=" + sortType + "&&offset=" + offset + "&&limit=" + limit;
  console.log(handler.url);

  return network.GET(handler);
}

// get album detail
function getAlbumDetail(handler) {
  let albumId = handler.params.albumId;

  handler.url = ALBUM_DETAIL_URL.replace(/\{album_id\}/i, albumId);
  return network.GET(handler);
}

module.exports = {
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

  // score lib's tag
  getScoreLibTag: getScoreLibTag,

  // scores
  getScoresByTag: getScoresByTag,

  // albums
  getAlbumsByTag: getAlbumsByTag,

  // score lib filter
  scoreLibFilter: scoreLibFilter,

  // get album's detail
  getAlbumDetail: getAlbumDetail,
}
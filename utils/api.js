const network = require('./network.js');

// sms login
const SMS_LOGIN_URL = '/smart-piano/v4/user/sms_login';
const SMS_TOKEN = '/smart-piano/v4/user/sms_token';
const SMS_CODE = '/smart-piano/v4/user/send_verification_code';

// banner
const BANNER_URL = '/smart-piano/v4/banner';

// recommend
const RECOMMEND_URL = '/smart-piano/v4/recommend'

// courses related
// newbie
const NOVICE_COURSE_URL = '/smart-piano/v4/newbie/begin';

// single
const SINGLE_COURSE_URL = '/smart-piano/v4/tutorial/single?offset={offset}&&limit={limit}&&level={level}';

// composite
const COMPOSITE_COURSE_URL = '/smart-piano/v4/tutorial/multiple?offset={offset}&&limit={limit}&&level={level}';

// composite course
const COMPOSITE_COURSE_DETAIL_URL = '/smart-piano/v4/tutorial/multiple/{id}'

// hot search
const HOT_SEARCH_URL = '/smart-piano/v4/hot-search';

// search by key
const SEARCY_BY_KEY_URL = '/smart-piano/v4/search/{keyword}?type=1&&offset=0&&limit=10';

// score lib's tag
const SCORE_LIB_TAG_URL = '/smart-piano/v4/tag';

const SCORE_LIB_FILTER_URL = '/smart-piano/v4/classify?type={type}&&ids={ids}&&sort_type={sort_type}&&offset={offset}&&limit={limit}';

// album's detail
const ALBUM_DETAIL_URL = '/smart-piano/v4/album/{album_id}';

// newbie's detail
const NEWBIE_DETAIL_URL = '/smart-piano/v4/newbie/begin/{novice_id}';

// kara list
const KARA_URL = '/smart-piano/v4/kara?offset={offset}&&limit={limit}&&level={level}';

// rush list
const RUSH_URL = '/smart-piano/v4/rush?offset={offset}&&limit={limit}&&level={level}';

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

// do filter in score lib
function scoreLibFilter(handler) {
  let rtype = handler.params.type;
  let ids = handler.params.ids;
  let sortType = handler.params.sort_type;
  let offset = handler.params.offset;
  let limit = handler.params.limit;

  handler.url = SCORE_LIB_FILTER_URL.replace(/\{type\}/i, rtype).replace(/\{ids\}/i, ids).replace(/\{sort_type\}/i, sortType).replace(/\{offset\}/i, offset).replace(/\{limit\}/i, limit);
  console.log(handler.url);

  return network.GET(handler);
}

// get album detail
function getAlbumDetail(handler) {
  let albumId = handler.params.albumId;

  handler.url = ALBUM_DETAIL_URL.replace(/\{album_id\}/i, albumId);
  return network.GET(handler);
}

// get composite course detail
function getCourseDetail(handler) {
  let albumId = handler.params.albumId;

  handler.url = COMPOSITE_COURSE_DETAIL_URL.replace(/\{id\}/i, albumId);
  return network.GET(handler);
}

// get newbie's detail
function getNewbieDetail(handler) {
  let noviceId = handler.params.noviceId;

  handler.url = NEWBIE_DETAIL_URL.replace(/\{novice_id\}/i, noviceId);

  return network.GET(handler);
}

// get kara list
function getKaraList(handler) {
  let offset = handler.params.offset;;
  let limit = handler.params.limit;;
  let level = handler.params.level;

  handler.url = KARA_URL.replace(/\{offset\}/i, offset).replace(/\{limit\}/i, limit).replace(/\{level\}/i, level);

  return network.GET(handler);
}

// get rush list
function getRushList(handler) {
  let offset = handler.params.offset;;
  let limit = handler.params.limit;;
  let level = handler.params.level;

  handler.url = RUSH_URL.replace(/\{offset\}/i, offset).replace(/\{limit\}/i, limit).replace(/\{level\}/i, level);

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

  // score lib filter
  scoreLibFilter: scoreLibFilter,

  // get album's detail
  getAlbumDetail: getAlbumDetail,

  // get course's detail
  getCourseDetail: getCourseDetail,

  // get newbie's detail
  getNewbieDetail: getNewbieDetail,

  // get kara list
  getKaraList: getKaraList,

  // get rush list
  getRushList: getRushList
}
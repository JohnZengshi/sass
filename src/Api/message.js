import apiCall from './commonality/ApiCall.js'

export const noticeRangeList = function (param) { // 9.1 公告列表
  let URL = "/v1/notice/getNoticeList"
  return apiCall(param, URL)
}

export const publishNotice = function (param) { // 9.3 公告创建
  let URL = "/v1/notice/publishNotice"
  return apiCall(param, URL)
}

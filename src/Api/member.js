import apiCall from './apiCall'

// 积分模板列表
export const getTemplateIntegralList = function(data) {
    let URL = "/v1/member/templateIntegralList"
    return apiCall(data, URL)
}
// 会员积分模板创建
export const templateCreate = function(data) {
    let URL = "/v1/member/templateCreate"
    return apiCall(data, URL)
}
// 会员积分模板内容
export const templateIntegralDetails = function(data) {
    let URL = "/v1/member/templateIntegralDetails"
    return apiCall(data, URL)
}
// 修改消费发放
export const consumeTemplateUpdate = function(data) {
    let URL = "/v1/member/consumeTemplateUpdate"
    return apiCall(data, URL)
}
// 会员积分日志
export const memberIntegralLog = function(data) {
    let URL = "/v1/member/memberIntegralLog"
    return apiCall(data, URL)
}
// 会员信息
export const getMemberInfoById = function(data){
    let URL = "/v1/member/memberIntegralDetails"
    return apiCall(data, URL)
}
// 会员跟进
export const getFollowRecord = function(data) {
    let URL = "/v1/member/getMemberFollowList"
    return apiCall(data, URL)
}
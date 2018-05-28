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
// 积分模板删除
export const templateIntegralUpdate = function(data) {
    let URL = "/v1/member/templateIntegralUpdate"
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
// 修改会员积分
export const memberIntegralUpdate = function(data) {
    let URL = "/v1/member/memberIntegralUpdate"
    return apiCall(data, URL)
}
// 关联模板的店铺列表
export const getShopReTemplateList = function(data) {
    let URL = "/v1/member/shopReTemplateList"
    return apiCall(data, URL)
}

// 积分加减法配置
export const addOrSubTemplateUpdate = function(data) {
    let URL = "/v1/member/addOrSubTemplateUpdate"
    return apiCall(data, URL)
}
// 积分消耗配置修改
export const consumeIntegralUpdate = function(data) {
    let URL = "/v1/member/consumeIntegralUpdate"
    return apiCall(data, URL)
}
// 其他发放配置
export const othenTemplateUpdate = function(data) {
    let URL = "/v1/member/othenTemplateUpdate"
    return apiCall(data, URL)
}
// 店铺关联模板
export const shopReTemplateById = function(data) {
    let URL = "/v1/member/shopReTemplateById"
    return apiCall(data, URL)
}

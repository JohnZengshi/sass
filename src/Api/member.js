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
// 积分抵现
export const getTotalDoIntegral = function(data) {
    let URL = "/v1/member/getTotalDoIntegral"
    return apiCall(data, URL)
}
// 使用积分
export const integralOffset = function(data) {
    let URL = "/v1/member/integralOffset"
    return apiCall(data, URL)
}
// 收银加减积分
export const memberBuyIntegral = function(data) {
    let URL = "/v1/member/memberBuyIntegral"
    return apiCall(data, URL)
}
// 1.推送模板管理=========================================
// 1.5模板类型列表
export const findSmsTemplateTypeList = function(data){
    let URL = "/v1/groupTemplate/findSmsTemplateTypeList"
    return apiCall(data, URL)
    
}
// 1.6插入字段列表
export const findFieldList = function (data) {
    let URL = "/v1/groupTemplate/findFieldList"
    // console.log(data)
    return apiCall(data, URL)
}
// 1.7添加模板
export const addTemplate = function (data){
    let URL = "/v1/groupTemplate/addTemplate"
    return apiCall(data, URL)

}

// 1.8模板列表
export const findTemplate = function (data) {
    let URL = "/v1/groupTemplate/findTemplate"
    return apiCall(data, URL)
}

// 1.9模板管理列表
export const findTemplateList = function (data){
    let URL = "/v1/groupTemplate/findTemplateList"
    return apiCall(data, URL)
}
// 删除模板
export const deleteSmsTemplate = function(data){
    let URL = "/v1/groupTemplate/deleteSmsTemplate"
    return apiCall(data, URL);
}

// 模板详情
export const findTemplateDetails = function(data){
    let URL = "/v1/groupTemplate/findTemplateDetails"
    return apiCall(data, URL);
}
// 1.10修改管理模板
export const updateSmsTemplate = function(data){
    let URL = "/v1/groupTemplate/updateSmsTemplate"
    return apiCall(data, URL);
}

// 2 标签管理========================================
// 2.1添加短信签名
export const addSmsSign = function(data){
    let URL = "/v1/groupTemplate/addSmsSign"
    return apiCall(data, URL)
}
// 2.2短信签名列表
export const findSmsSignList = function(data){
    let URL = "/v1/groupTemplate/findSmsSignList"
    return apiCall(data, URL)
}

// 2.3编辑或删除签名
export const updateSmsSign = function(data){
    let URL = "/v1/groupTemplate/updateSmsSign"
    return apiCall(data, URL)
}

// 3短信管理===============================

// 3.1 	发送人列表
export const findSmsMemberList = function(data){
    let URL = "/v1/groupTemplate/findSmsMemberList"
    return apiCall(data, URL)
}
// 3.2 触发事件列表
export const findSmsTriggerList = function(data){
    let URL = "/v1/groupTemplate/findSmsTriggerList"
    return apiCall(data, URL)
}

// 添加发送短信
export const addSms = function(data){
    let URL = "/v1/groupTemplate/addSms"
    return apiCall(data, URL)
}

// 3.4 触发周期列表
export const findSmsTriggerCycleList = function(data){
    let URL = "/v1/groupTemplate/findSmsTriggerCycleList"
    return apiCall(data, URL)
}

// 3.5 即时短信模板列表
export const findSmsTemoplateList = function(data){
    let URL = "/v1/groupTemplate/findSmsTemoplateList";
    return apiCall(data, URL)
}

// 3.6 触发发送列表
export const findSmsTriggerLists = function(data){
    let URL = "/v1/groupTemplate/findSmsTriggerLists";
    return apiCall(data, URL)
}

// 3.10短信日志
export const findSmsTemoplateLogList = function(data){
    let URL = "/v1/groupTemplate/findSmsTemoplateLogList";
    return apiCall(data, URL)
}

// 修改短信状态
export const updateTemplateStatus = function(data){
    let URL = "/v1/groupTemplate/updateTemplateStatus";
    return apiCall(data, URL);
}

// 3.11单条短信日志
export const findSmsTemoplateLog = function(data){
    let URL = "/v1/groupTemplate/findSmsTemoplateLog";
    return apiCall(data, URL);
}
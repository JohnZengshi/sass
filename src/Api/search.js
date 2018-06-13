import apiCall from './apiCall'

// 首页搜索
export const homepageSearch = function(data) {
    let URL = "/v1/public/homepageSearch"
    return apiCall(data, URL)
}
// 商品列表筛选
export const productStatusInfo = function(data) {
    let URL = "/v1/public/productStatusInfo"
    return apiCall(data, URL)
}
// 单据列表筛选
export const orderListBySearch = function(data) {
    let URL = "/v1/public/orderListBySearch"
    return apiCall(data, URL)
}
// 会员列表筛选
export const memberListBySearch = function(data) {
    let URL = "/v1/public/memberListBySearch"
    return apiCall(data, URL)
}
// 商品日志记录
export const productLogRecord = function(data) {
    let URL = "/v1/public/productLogRecord"
    return apiCall(data, URL)
}


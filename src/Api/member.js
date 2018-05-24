import apiCall from './apiCall'

export const getMemberInfoById = function(data){
    let URL = "/v1/member/memberIntegralDetails"
    return apiCall(data, URL)
}
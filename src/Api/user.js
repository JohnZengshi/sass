import baseApi from './Base/base'

// 获取用户信息
export const getSelfInfo = function (opt) {
    let URL = "/v1/public/userInfo"
    return baseApi.apiCall(opt, URL);
}
// 根据id获取用户信息
export const getUserById = function (opt) {
  console.log("根据id获取用户信息");
  return apiCall({
      url: "/v1/user/getOneUser",
      init: {
        id: '',
        tokenId: sessionStorage.getItem('tokenId')
      }
  }, opt)
}
// 通过手机或昵称搜索公司内成员
export const getInfoByPN = function (opt) {
  console.log("通过手机或昵称搜索公司内成员");
  return apiCall({
    url: '/v1/user/findUserByPhoneOrName',
    init: {
      tokenId: sessionStorage.getItem('tokenId'),
      companyId: sessionStorage.getItem('companyId'),
      PN: '电话或名字'
    }
  }, opt)
}
//查找用户 – 所有系统用户
export const getUserAll = function (opt) {
  console.log("查找用户 – 所有系统用户");
  return apiCall({
    url: '/v1/auth/lookupAllFriends',
    init: {
      PN: '电话或名字'
    }
  }, opt)
}

export const createCompany = function (opt) {
  let URL = "/v1/public/companyCreate"
  return baseApi.apiCall(opt, URL)
}

export const getCompanyInfo = function (opt) {
  let URL = "/v1/public/companyInfo"
  return baseApi.apiCall(opt, URL)
}

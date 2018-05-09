// import apiCall from './Base/base'
import apiCall from './apiCall'

export const userRegistry = function (opt) {
  let URL = "/v1/auth/createRegister";
  return apiCall(opt, URL);
}

export const getVcCode = function (opt) {
  let URL = "/v1/auth/obtainCode";
  return apiCall(opt, URL);
}

export const userLogin = function (opt) {
  let URL = "/v1/auth/userLogin";
  return apiCall(opt, URL);
}

export const userForget = function (opt) {
  let URL = "/v1/auth/resetPassword";
  return apiCall(opt, URL);
}

export const confirmCode = function (opt) {
  let URL = "/v1/auth/confirmCode";
  return apiCall(opt, URL);
}

export const qrcodeLogin = function (opt) {
  let URL = "/v1/web/login";
  return apiCall(opt, URL);
}

export const oldNewTrans = function (opt) {
  let URL = "/v1/public/revisePaw";
  return apiCall(opt, URL);
}

export const updateUserInfo = function (opt) {
  let URL = '/v1/public/updateUser';
  return apiCall(opt, URL);
}

// 第三方用户绑定
export const getUserBind = function (opt) {
  let URL = '/v1/public/userBinding';
  return apiCall(opt, URL);
}

export const getAddress = function (opt) {
  let URL = '/v1/public/getAddress';
  return apiCall(opt, URL);
}

//微信登录
export const getQRAuthCode = function (opt) {
  let URL = '/v1/auth/getQRAuthCode';
  return apiCall(opt, URL);
}

export const getWXlogin = function (opt) {
  let URL = '/v1/auth/qrLogin';
  return apiCall(opt, URL);
}


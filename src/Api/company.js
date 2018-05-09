import base from './Base/base'

export const updateCompInfo = function (opt) {
  let URL = '/v1/order/updateCompany';
  return base.apiCall(opt, URL);
}

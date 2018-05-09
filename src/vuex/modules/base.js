import * as types from '../mutation-types.js'
const store = {
  state: {
    userInfo: {},
    userPositionInfo: {},
    comInfo: null,
    seekCompanyInfo: null
  },
  mutations: {
    [types.SET_USER_INFO] (state, parm) {
      state.userInfo = parm
    },
    [types.SET_COM_INFO] (state, parm) {
      state.comInfo = parm
    },
    [types.SET_USER_COMPANY_INFO] (state, parm) {
      state.seekCompanyInfo = parm
    },
    [types.SET_USER_POSITION_INFO] (state, parm) {
      state.userPositionInfo = parm
    },
    [types.SET_USER_INFO_ITEM] (state, obj) {
      state.userInfo = obj;
    }
  }
}
export default store;

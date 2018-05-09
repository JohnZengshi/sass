import * as types from "./../mutation-types.js"
const state = {
  applyList: {}
}
// getters
const getters = {
  allProducts: state => state.all
}
const actions = {
  applyList ({ commit }, val) {
    state.applyList = val
  }
}
// mutations
const mutations = {
  [types.USER_APPLY_APPLYINFO] (state, { products }) {
    state.applyList = products
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
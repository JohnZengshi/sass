import * as types from './../mutation-types.js'

const store = {
  state: {
    changeId: '', // 职员列表和员工列表的选中
  },
  mutations: {
    [types.SET_ORGANIZATION_CHANGE] (state, parm) {
      state.changeId = parm
    }
  }
}
export default store
 // this.$store.dispatch('workPopupError', '请先选择打印商品')
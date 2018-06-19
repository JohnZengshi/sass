export default (Vue) => {
  // v-loadmore elmUI用来监听表格滚动事件
  Vue.directive('loadmore', {
    bind(el, binding) {
      const selectWrap = el.querySelector('.el-table__body-wrapper')
      selectWrap.addEventListener('scroll', function () {
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance == 0) {
          binding.value()
        }
      })
    }
  })

}

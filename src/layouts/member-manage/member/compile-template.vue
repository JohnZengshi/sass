<!-- 编辑模板 -->
<template>
<transition name="tp-ani">
  <div class="m-m-compile-template-main xj-right-box">
    <div class="Rp_title_container">
      <!--面包屑-->
      <div class="Rp_crumbs">
        <i class="iconfont icon-baobiao1"></i>
        <router-link tag="span" to="/memberManage" class="path_crumbs">会员设置</router-link>
      </div>
    </div>

    <div class="m-m-compile-template-body xj-right-box xj-box-shadow">
      <!-- 会员互通 -->
      <each-other></each-other>
      <!-- 独立店铺 -->
      <shop-list></shop-list>
      <!-- 积分模板 -->
      <integral></integral>
    </div>
  </div>
</transition>
</template>
<script>
import eachOther from './base/each-other'
import shopList from './base/shop-list'
import integral from './base/integral'
export default {
  components: {
    eachOther,
    shopList,
    integral
  }
}
</script>
<style lang="scss" scoped>
.m-m-compile-template-main{
  margin-top: 40px;
  .m-m-compile-template-body{
    background-color: #fff;
    padding-bottom: 15px;
    border-radius: 10px;
    height: 680px;
    overflow: scroll;
  }
}
</style>
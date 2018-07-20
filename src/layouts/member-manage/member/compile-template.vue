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
      <eachOther></eachOther>
    </div>
  </div>
</transition>
</template>
<script>
import eachOther from './base/each-other'
export default {
  components: {
    eachOther
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
    height: 760px;
  }
}
</style>
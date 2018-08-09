<!-- 新增模板 -->
<template>
<transition name="tp-ani">
  <div class="m-m-add-template-main xj-right-box">
  
    <div class="Rp_title_container">
      <!--面包屑-->
      <div class="Rp_crumbs">
        <i class="iconfont icon-baobiao1"></i>
        <router-link tag="span" to="/memberManage" class="path_crumbs">新增模板</router-link>
      </div>
      <div class="xj-btn-defult fr" @click="goBack">返回上一级</div>
    </div>

    <div class="m-m-add-template-body xj-right-box xj-box-shadow">
      <template-shop></template-shop>
    </div>

  </div>
</transition>
</template>
<script>
import templateShop from './base/template-shop'
export default {
  components: {
    templateShop
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.m-m-add-template-main{
  margin-top: 40px;
  .m-m-add-template-body{
    background-color: #fff;
    padding-bottom: 15px;
    border-radius: 10px;
    // height: 680px;
    // overflow: scroll;
  }
}
</style>
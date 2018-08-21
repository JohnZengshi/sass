<!-- 编辑模板 -->
<template>
<transition name="tp-ani">
  <div class="m-m-compile-template-main xj-right-box">
    <div class="Rp_title_container">
      <!--面包屑-->
      <div class="Rp_crumbs">
        <i class="iconfont icon-baobiao1"></i>
        <router-link tag="span" to="/membermanage" class="path_crumbs">会员主页</router-link> > <span class="txt">会员设置</span>
      </div>
      
      <router-link tag="div" class="xj-btn-defult fr" to="/membermanage">返回上一页</router-link>
    </div>

    <div class="m-m-compile-template-body xj-right-box xj-box-shadow">
      <!-- 会员互通 -->
      <each-other @update="update"></each-other>
      <!-- 独立店铺 -->
      <shop-list ref="shopListBox"></shop-list>
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
  },
  methods: {
    update () {
      this.$refs.shopListBox._seekFindTemplateShopAll()
    }
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
    height: 700px;
    overflow: scroll;
  }
}
</style>
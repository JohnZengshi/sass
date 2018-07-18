<!-- 首页 -->
<template>
  <div class="m-m-home-page-main xj-right-box xj-box-shadow">
    <header-nav></header-nav>
    <div class="body-scorll-wrap">
      <member></member>
    </div>
  </div>
</template>
<script>
  import headerNav from './home-page/header'
  import member from './home-page/member'
  export default {
    components: {
      headerNav,
      member
    }
  }
</script>
<style lang="scss" scoped>
.m-m-home-page-main{
  margin-top: 40px;
  background-color: #fff;
  padding-bottom: 15px;
  border-radius: 10px;
  >.body-scorll-wrap{
    height: 735px;
    background-color: #fff;
  }
}
</style>
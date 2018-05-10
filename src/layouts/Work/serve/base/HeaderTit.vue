<template>
  <header class="header-tit-main">
    <router-link to="/work/serve" class="link">返回上一级</router-link>
    <aside>
      <i class="iconfont icon-ruku"></i>
      <router-link to="/work/serve">售后</router-link> &gt; <span class="txt">单据详情</span>
    </aside>
  </header>
</template>
<script>
export default{
  methods: {
    goPreviousPage() { // 返回上一页
      this.$router.push("/work/serve")
    }
  }
}
</script>
<style scoped lang="scss">
  .header-tit-main {
    margin-top: 30px;
    height: 40px;
    line-height: 40px;
    color: #333;
    /* */
    >aside {
      width: 250px;
      >.txt {
        color: #2993f8;
        margin-left: 5px;
        font-weight: bold;
      }
      >i {
        color: #2993f8;
        font-size: 18px;
        margin-right: 5px;
      }
      >a {
        font-weight: bold;
        &:hover {
          color: #2993f8;
        }
      }
    }
    .link {
      float: right;
      width: 90px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      border-radius: 5px;
      transition: all .3s;
      margin-top: 5px;
      background-color: #2993f8;
      &:hover {
        background-color: #057aea;
      }
    }
  }
</style>
<template>
  <div class="item">
    <router-link v-for="(tab,index) in tabData" :key="index" :to="tab.path">{{tab.name}}</router-link>
  </div>
</template>

<script>
export default{
  data(){
    return{
       tabData : [
         {
             name : '款式设置',
             path : '/work/miniprogram'
         },
         {
             name : '店铺信息',
             path : '/work/miniprogram/shopdetail'
         },
         {
             name : '金价信息',
             path : '/work/miniprogram/kingpricedetail'
         },
         {
             name : '上架设置',
             path : '/work/miniprogram/uppershelfsetting'
         }
       ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    width: 160px;
    border-right: 1px solid #f1f2f3;
    border-top: 1px solid #f1f2f3;
    height: 660px;
    overflow: hidden;
    overflow-y: auto;
    >a {
      display: block;
      height: 53px;
      line-height: 53px;
      border-left: 3px solid transparent;
      text-align: center;
      transition: all .3s;
      border-bottom: 1px solid #f1f2f3;
      color: #999;
      &.router-link-exact-active {
        color: #2993f8;
        border-left-color: #2993f8;
      }
      &:hover {
        color: #2993f8;
        background-color: #f6f7f8;
      }
    }
  }
</style>
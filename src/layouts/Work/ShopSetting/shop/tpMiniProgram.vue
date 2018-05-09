<template>
    <transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>小程序设置
    </div>
    <div class="tpl-scroll" v-loading="loading"></div>
        
      
    
       

    </div>
</transition>
</template>

<script>
export default {
   data(){
       return{
          loading:false,
           menuitem:['款式管理','店铺信息','金价信息','上架管理']
       }
   },methods:{
        
   },created(){
       
   }


}
</script>

<style lang="scss" scoped>
   .data-view{
    width: 730px;
    >.title {
      height: 40px;
      color: #999;
      >i {
        margin-right: 5px;
      }
    }
   }
</style>

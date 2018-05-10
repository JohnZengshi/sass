<template>
<transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>金价设置
    </div>
    <div class="tpl-scroll">
        <div class="kingtitle"> <i>*</i><span>关闭后则今日金价信息将不显示在商城页面，请谨慎操作</span></div>
        <div class="kingswitchs">
            <span>今日金价</span>
            <Switchs v-if="isShow" class="switchcls"  :isDelRole="true" :sex="pricestype" @switchsChange="setCostFlag"></Switchs>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Switchs from './../cuswitch'
import {settingHandler,goldPriceEnableInfo} from 'Api/commonality/seek.js'
export default {
     props :['shopId'],
    data(){
       return{
        isShow: true,
        pricestyle:'N',
       }
    },
    computed:{
       pricestype:function(){
           return this.pricestyle;
       }
    },
    watch:{
    },
    components:{
        Switchs
    },
    
    created(){
      if (this.shopId) {
        this.getSettingHandle();
      }
    },
    mounted () {
      eventBus.$on('xcx-upload-data', (shopId) => {
        this.getSettingHandle(shopId)
      })
    },
         beforeDestroy () {
      eventBus.$off('xcx-upload-data')
     },
    methods:{
      //-----------------操作值   改变ui 部分
          setCostFlag(val){
             console.log(val);
             if(val === 'Y'){
              //开启    N关闭
                let options = {
                    shopId:this.shopId,
                    operateType:1,
                    dataId:this.shopId
                }
                this.setSettingHandler(options);
             }else{
                   let options = {
                    shopId:this.shopId,
                    operateType:2,
                    dataId:this.shopId
                }
                this.setSettingHandler(options);
             }

          },
      //----------------网络请求部分------
      setSettingHandler(options){
          // 1 金价开启 2金价关闭
          settingHandler(options).then((res)=>{
              if(res.data.state == 200){
                 this.$message({type:'success',message:'修改成功'});
              }
          },(err)=>{
              //错误
          })
      },
      getSettingHandle(parm){
          this.isShow = false
          // 获取金价开启关闭状态
          let _this = this;
          let options = {
            shopId: parm || this.shopId, //店铺ID
          }
           goldPriceEnableInfo(options).then((res)=>{
            this.isShow = true
               console.log('金价数据:',res);
                if(res.data.state == 200){
                    if(res.data.data.status == null || res.data.data.status == ''){
                        _this.pricestyle = 'N';
                    }else{
                         if(res.data.data.status=='1'){
                            _this.pricestyle="Y";
                         }else{
                            _this.pricestyle="N";
                         }
                        // = res.data.data.status;
                    }
                }
           },(err)=>{
               //错误
           })
      }
    }
}
</script>

<style lang="scss" scoped>
  .data-view {
    width: 1080px;
    >.title {
      height: 40px;
      color: #999;
      >i {
        margin-right: 5px;
      }
    }
    .tpl-scroll {
      position: relative;
      max-height: 610px;
      overflow: hidden;
      overflow-y: auto;
      padding-right: 40px;
        .kingtitle{
            position: relative;
            width: 100%;
            height: 30px;
            line-height: 30px;
            i{
                position: absolute;
                left: 50px;
                top: 3px;
                font-size: 20px;
                color: red;
            }
            span{
                position: absolute;
                left: 62px;
                top: 0px;
                display: inline-block;
                font-size: 13px;
                color: #999;
            }
        }
        .kingswitchs{
            position: relative;
            width: 100%;
            height: 30px;
            line-height: 30px;
            span{
                position: absolute;
                left: 62px;
                top: 0px;
                display: inline-block;
            }
            .switchcls{
                position: absolute;
                left: 340px;
                top: 3px;
                display: inline-block;
                font-size: 13px;
                color: #999;
            }
        }
    }
   
  }

</style>
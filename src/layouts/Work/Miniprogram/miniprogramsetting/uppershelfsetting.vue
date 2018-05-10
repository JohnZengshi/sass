<template>
<transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>上架设置
    </div>
    <div class="tpl-scroll">
        <div class="kingtitle"> <i>*</i><span>关闭后则柜组关联商品在小程序商城下架，请谨慎操作</span></div>
        <div class="kingswitchs" v-for="(item,index) in counterList" :key="index">
            <span>{{item.groupName}}</span>
            <Switchs class="switchcls"  :isDelRole="true" :groupName="item.groupName" :groupId="item.groupId" :sex="item.status" @switchsChange="setCostFlag"></Switchs>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Switchs from './../cuswitch'
import {seekShowCounterList,settingHandler,shelvesGroupInfo} from "Api/commonality/seek.js"
export default {
     props :['shopId'],
      watch:{
          shopId:function(){
              console.log("柜组店铺ID：",this.shopId);
          }
    },
    data(){
       return{
          counterList:[]
       }
    },
    components:{
        Switchs
    },
    
    created(){
      if (this.shopId) {
        this.getCounterList()
      }
    },
    mounted () {
      eventBus.$on('xcx-upload-data', (shopId) => {
        this.getCounterList(shopId)
      })
    },
         beforeDestroy () {
      eventBus.$off('xcx-upload-data')
     },
    methods:{
      //-----------------操作值   改变ui 部分
          setCostFlag(val){
              console.log(val);
              if(val.status === 'Y'){
              //开启    N关闭
                let options = {
                    shopId:sessionStorage.getItem('miniprogram'),
                    operateType:3,
                    dataId:val.groupId
                }
                this.setSaleSetting(options);
             }else{
                   let options = {
                    shopId:sessionStorage.getItem('miniprogram'),
                    operateType:4,
                    dataId:val.groupId
                }
                this.setSaleSetting(options);
             }
              
          },
      //----------------网络请求部分------
      setSaleSetting(options){
          settingHandler(options).then((res)=>{
                  if(res.data.state == 200){
                     this.$message({type:'success',message:'修改成功'});
                  }
              },(err)=>{
                  //错误
              })
      },
      getCounterList(parm){
        this.counterList = []
          let options = {
            shopId:  parm || this.shopId, //店铺ID
          }
          shelvesGroupInfo(options).then((res)=>{
              console.log(res);
              if(res.data.state == 200){
                  let salesSettinglist = res.data.data.dataList;
                  let datas = []
                  for(let i=0;i<salesSettinglist.length;i++){
                      let obj = {
                          groupName:salesSettinglist[i].groupName,
                          groupId:salesSettinglist[i].groupId,
                          status:''
                      }
                      if(salesSettinglist[i].status == '1'){
                          obj.status = 'Y'
                      }else{
                          obj.status = 'N'
                      }
                      datas.push(obj)
                      
                  }
                  this.counterList = datas
                 
              }
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
            margin: 7px 0 27px 0; 
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
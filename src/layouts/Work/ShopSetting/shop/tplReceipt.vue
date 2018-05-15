<template>
<transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>收款方式
    </div>
    <div class="tpl-scroll">
       <div class="item clearfix">
           <ul class="clearfix">
           	  <li><img src="../../../../assets/img/buyShop/zhifubao-icon.png"/>支付宝</li>
           	  <li><img src="../../../../assets/img/buyShop/weixin-icon.png"/>微&nbsp;&nbsp;&nbsp;信</li>
           	  <li><img src="../../../../assets/img/buyShop/swiping-card.png"/>刷&nbsp;&nbsp;&nbsp;卡</li>
           	  <li><img src="../../../../assets/img/buyShop/cash.png"/>现&nbsp;&nbsp;&nbsp;金</li>
           	  <li><img src="../../../../assets/img/buyShop/other.png"/>其&nbsp;&nbsp;&nbsp;他</li>
           </ul>
       </div> 
    </div>
    <div class="title">
      <i class="iconfont icon-liebiao"></i>售价尾数
    </div>
    <div class="tpl-scroll">
       <div class="item clearfix priceTail">
           <ul class="clearfix" v-if="storePrivilege">
              <li v-for="k,i in priceTailData" @click="fatchSetEndMoney(k,i)" :class="k.defaultFlag=='Y'?'active':''">
                  <i class="iconfont" :class="'icon-' + k.icon"></i>{{k.name}}
              </li> 
           </ul>
           <ul class="clearfix" v-else>
              <li v-for="k,i in priceTailData" class="isPrivate" :class="k.defaultFlag=='Y'?'active':''">
                  <i class="iconfont" :class="'icon-' + k.icon"></i>{{k.name}}
              </li> 
           </ul>
       </div> 
    </div>
  </div>
</transition>
</template>

<script>
import { 
    seekGetEndMoneySetting,
    seekSetEndMoney,
    seekGetSetting
} from 'Api/commonality/seek'
export default{
    data(){
       return{
          discountlist : [],
          index : 0,
          priceTailData : [
            // {
            //   text : '不处理',
            //   icon : 'shielding'
            // },
            // {
            //   text : '四舍五入',
            //   icon : 'stealth'
            // },
            // {
            //   text : '抹掉小数',
            //   icon : 'message'
            // }
          ]
       }
    },
    props : ['shopId','storePrivilege'],
    watch:{
       shopId(){
         console.log('watch',this.shopId)
         this.fatchEndMoney()
       }
    },
    created(){
       if( this.shopId){
         this.fatchEndMoney()
       }
       console.log('created',this.shopId)
    },
    
    methods:{
      tab(i){
        this.index = i
      },
      
      //获取尾数列表
      fatchEndMoney(){
        
        seekGetEndMoneySetting({
              type : '1',
              shopId : this.shopId
        }).then((res)=>{
            this.priceTailData = res.data.data.list
            console.log('res',res.data.data.list)
        })
      },
      
      //尾数设置
      fatchSetEndMoney( item,index ){
        this.priceTailData.forEach( (item,k) =>{
            Object.assign(item,{
               defaultFlag : index == k ? 'Y' : 'N'
            })
        })
        seekSetEndMoney({
              type : '1',
              id : item.id,
              defaultFlag : 'Y'
        }).then((res)=>{
            console.log('res',res)
            if( res.body.state == 200){
              this.$message({
                 type : 'success',
                 message : '设置成功'
              })
            }else{
                this.$message({
                 type : 'error',
                 message : res.body.msg
              })
            }
        })
      },
      
      //收款方式列表
      fatchGetSetting(){
        
        seekGetSetting({
              type : 1,
              shopId : this.shopId
        }).then((res)=>{
            console.log('res',res)
        })
      }
    }
}
</script>

<style lang="scss" scoped>
  .data-view {
    width: 730px;
    >.title {
      height: 40px;
      color: #999;
      >i {
        margin-right: 5px;
      }
    }
    .tpl-scroll {
      max-height: 610px;
      overflow: hidden;
      overflow-y: auto;
      padding-right: 40px;
      
      >.item{
        margin-bottom: 10px;
        li{
          float: left;
          width: 210px;
          height: 70px;
          line-height: 70px;
          padding-left: 46px;
          background-color: #f6f7f8;
          border-radius: 8px;
          margin-right: 20px;
          cursor: pointer;
          transition:all .3s;
          margin-bottom: 20px;
          color: #333;
          &:hover{
            background-color: #f1f1f1;
            color: #2993f8;
          }
          >img{
            display: inline-block;
            width: 34px;
            height: 34px;
            margin-right: 36px;
            vertical-align: middle;
          }
          
          &.isPrivate{
            cursor: default;
            &:hover{
              background-color: #f6f7f8;
              color: #333;
            }  
          }
        }
        &.priceTail{
          >ul{
           margin-top: 10px;   
           >li{
            height: 40px;
            line-height: 40px;
            padding: 0;
            width: 150px;
            text-align: center;
            &.active{
              background-color: #2993f8;
              color: #fff;
              >i{
                  color: #fff;
              }
            }
            >i{
              color: #999;
              margin-right: 5px;
            }
          }
        }
        }
      }
    }
    
  }


</style>
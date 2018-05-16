<template>
<div class="shop-container-tpl">
    
    <div class="sp-title">
        <div class="sp_crumbs">
            <i class="iconfont icon-dianpu"></i> 
            <span class="txt">店铺设置</span>
        </div>
        
        <el-dropdown class="selected_dropdown">
          <span class="el-dropdown-link" v-text="shopDefaultData.shopName"></span>
          <i class="iconfont icon-xiala" v-show="iconShow"></i>
          <el-dropdown-menu slot="dropdown" class="layout-drop-item" v-show="meauShow">
            <div class="max-selected-item">
                <el-dropdown-item 
                    v-for="(item,index) in shopLister" :key="index" 
                    @click.native="selectStorage(item)"
                     v-show="meauShow">
                    {{item.shopName}}
                </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div class="page-container">
        <div class="main-container">
            <div class="title">
                <i class="iconfont icon-liebiao"></i>销售设置
            </div>
            <div class="container">
                <!--左侧菜单-->
                <menu-tab></menu-tab>
                <!--数据内容区-->
                <router-view :shopId="shopDefaultData.shopId" :storePrivilege="storePrivilege"></router-view>
            </div>
        </div>
        <!--右侧柜组设-->
        <tpl-slider :shopId="shopDefaultData.shopId" :storePrivilege="storePrivilege"></tpl-slider>
        
    </div>
</div>
</template>
<script>
import menuTab from './shop/tab'
import tplSlider from './shop/tplSlider'
import { seekGetShopListByCo,seekGetUserInfo } from 'Api/commonality/seek'
export default{
    data(){
       return{
           iconShow:true,
           meauShow:true,
          shopLister : [],
          shopDefaultData :{
             shopName : '选择店铺',
             shopId:''
          },
          //店铺权限
          storePrivilege : false
       }
    },
    components : {
      menuTab,
      tplSlider
    },
    created(){
        //this.$store.state.shopSetting
        //
        //this.$store.dispatch('fatch')
        //this.$store.commit('WORK_POPUP_AUDIT')
        //console.log(this.$store.dispatch)
        this.fatchShopItem()
    },
    
    methods:{
       selectStorage( item ){
          this.shopDefaultData = item
       },
       
       fatchShopItem(){
          seekGetShopListByCo({
              page : '1',
              pageSize : '10'
          }).then((res)=>{
            debugger
            if (res.data.state == 200) {
              // console.log(res.body.data.shopList)
              this.shopLister = res.data.data.shopList
              this.shopDefaultData = this.shopLister[0]
              this.fatchUserPermission()
              console.log(123123123)
              console.log(this.shopLister)
              if(this.shopLister.length == 1){
                 this.iconShow = false
                 this.meauShow = false 
              }else{
                  this.iconShow = true
                 this.meauShow = true  
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }

          })
       },
       
       //用户权限分配
       fatchUserPermission (){
          this.loading = true
          seekGetUserInfo({
              userId: sessionStorage.getItem('id')
          }).then((res)=>{
             let tempData = res.data.data.roleList
             
             if( tempData.length > 0 ){
                this.storePrivilege = tempData.filter( f => f.role == 4 ).length > 0 
             }
          })
       },
    }
 }
</script>
<style lang="scss" scoped>
.shop-container-tpl{
  width: 1250px;
  margin: 0 auto 30px auto;
  
  >.sp-title{
    height: 90px;
    color: #333;
    padding-top: 40px;
    >.sp_crumbs{
      float: left;
      >.txt{
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }
      >i{color: #2993f8; font-size: 20px; margin-right: 3px;}
    }
    >.selected_dropdown{
      float: right;
      width: 160px;
      max-width: 200px;
      border-radius: 3px;
      background-color: #fff;
      border:1px solid #eee;
      >.el-dropdown-link{
        text-align: center;
        max-width: 200px;
        width: 100%;
      }
    }
  }
}

.page-container{
   height: 730px;
   
   .main-container{
     background-color: #fff;
     height: 100%;
     box-shadow: 0px 0 15px #ddd;
     border-radius: 10px;
     
     >.title{
        height: 50px;
        line-height: 50px;
        padding: 0 15px 0 25px;
        >i{
           margin-right: 5px;
           color: #2993f8;
        }
        >.add{
          color: #2993f8;
          float: right;
          &:hover{
             color: #036acc;
          }
        }
     }
   }
   
   .main-container{
     width: 930px;
     float: left;
     
     >.container{
       display: flex;
       justify-content: space-between;
       margin-top: 20px;
     }
   }
}


</style>
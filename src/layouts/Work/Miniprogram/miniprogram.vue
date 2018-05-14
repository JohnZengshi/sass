<template>
    <div class="shop-container-tpl">
        
        <div class="sp-title">
            <div class="sp_crumbs">
                <i class="iconfont icon-dianpu"></i> 
                <span class="txt">小程序设置</span>
            </div>
        
            <div class="sp_shopname selected">
                <span class="title-name" :class="false ? '' : 'select'">
                            {{shopname}}
                            <!-- <i class="iconfont icon-arrow-down" v-if="shopname !=''"></i> -->
                            <!-- <i class="el-icon-circle-close" title="清除" v-else></i> -->
                            </span>
                <ul class="firstul">
                    <!-- @mouseover="firstclick(item,index)" -->
                    <li  @click="firstclick4(item, index)" :key="index" :class="shopname==item ? 'active' :''" v-for="(item, index) in shopListByCo">
                    {{item.shopName}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-container">
            <div class="main-container">
                <!-- <div class="title">
                    <i class="iconfont icon-liebiao"></i>小程序设置
                </div> -->
                <div class="container">
                    <!--左侧菜单-->
                    <menu-tab></menu-tab>
                    <!--数据内容区-->
                    <router-view :shopId="shopId"></router-view>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import menuTab from "./tab"
import {seekGetShopListByCo,seekGetUserInfo} from 'Api/commonality/seek.js'
export default{
    data(){
        return{
           shopname: "",
           shopListByCo: [],
           shopId: ""
        }
    },created(){
       this.fixUserPromise();
       this.gtShopListByCo();
    },
    methods:{
        fixUserPromise(){
            //处理用户权限问题，到底有没有权限干啥
            seekGetUserInfo().then((res)=>{
                console.log('小程序中--获取用户权限:',res);
                if(res.data.state == 200){
                    for(let i=0;i<res.data.data.roleList.length;i++){
                        let codeNum = Number(res.data.data.roleList[i].role);
                        if(codeNum==1){//超管理员
                            sessionStorage.setItem('miniprogramrole','管理员');
                        }else if(codeNum==2){//管理员
                            sessionStorage.setItem('miniprogramrole','管理员');
                        }else if(codeNum==3){//职员
                            sessionStorage.setItem('miniprogramrole','职员');
                        }else if(codeNum==4){//店长
                            sessionStorage.setItem('miniprogramrole','店长');
                            break;//如果走到店长，就可以判断该用户拥有所有权限
                        }else if(codeNum==5){//店员
                            sessionStorage.setItem('miniprogramrole','店员');
                            break;//如果走到店员，可以判断该用户拥有店长下公司人员上的权限
                        }
                    }
                    console.log(sessionStorage.getItem('miniprogramrole'));
                }
            })
           
                 
           //  console.log('获取用户角色:',sessionStorage.getItem('miniprogramrole'));
        },
        firstclick4(item,index) {
          if (item.dredge == 'N') {
            eventBus.$emit('open-face-popup', '小程序')
            return
          }
          this.shopname = item.shopName;
          this.shopId = item.shopId
          eventBus.$emit('xcx-upload-data', item.shopId)
          sessionStorage.setItem('miniprogram',this.shopId);
        },
        gtShopListByCo () { // 获取店铺列表
            let options = {
                page: 1,
                pageSize: 999
            }
            seekGetShopListByCo(options).then((res) => {
                console.log(res.data.data.shopList)
                this.shopListByCo = res.data.data.shopList
                if (this.shopListByCo[0].shopId) {
                  this.shopId = this.shopListByCo[0].shopId;
                  this.shopname = this.shopListByCo[0].shopName;
                  // debugger;
                  eventBus.$emit('xcx-upload-data', this.shopListByCo[0].shopId)
                  console.log('this.shopListByCo[0].shopId', this.shopListByCo[0].shopId)
                  sessionStorage.setItem('miniprogram',this.shopId);
                }
            }, (res) => {

            })
        },
        

    },
    components:{
        menuTab
    }
 }
</script>
<style lang="scss" scoped>
.shop-container-tpl{
  width: 1250px;
  margin: 30px auto 30px auto;
  
  >.sp-title{
    width: 100%;
    height: 50px;
    color: #333;
   // padding-top: 40px;
    position: relative;
    z-index: 9999;
    >.sp_crumbs{
       float: left;
       width: 76%;
      >.txt{
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }
      >i{color: #2993f8; font-size: 20px; margin-right: 3px;}
    }  
    >.sp_shopname{
                 float: left;
                 width: 300px;
                //  text-align: right;
                  z-index: 999;
                    &.selected{
                      &:after{
                       content:'';
                       border: 6px solid transparent;
                       //border-bottom-color: #fff;
                       width: 0;
                       height: 0;
                       position: absolute;
                       top: 38px;
                       right:0px;
                       transition: all .3s;
                       margin-left: -3px;
                      }
                      
                      &:hover{ 
                        >.firstul{
                         opacity: 1;
                         visibility: visible;
                         top:30px;
                        }
                        &:after{
                           top: 18px;
                           border-bottom-color: #fff;
                        }
                      }
                    }
                    height: 100%;
                    position: relative;
                    float: left;    
                    span {
                        cursor: pointer;
                        font-size: 14px;
                        color:#666;
                        font-weight: bold;
                        line-height: 33px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding-right: 20px;
                        min-width: 80px;
                        //overflow: hidden;
                        position: relative;
                        i {
                            position: absolute;
                            right:0px;
                            top: 1px;
                            margin-left: 8px;
                            font-size: 14px;
                            transition: .3s all;
                            &.el-icon-circle-close{
                               transition: 0s all;
                               font-size: 14px;
                               color: #ccc;
                               top: -4px;
                               right: -4px;
                               &:hover{
                                 color: #2993f8; 
                               }
                            }
                        }
                    }
                    .title-name {
                        text-align: right;
                        display: block;
                        height: 30px;
                        line-height: 30px;
                        // overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        &.select{
                           color: #333;
                        }
                    }
                    .title-name.active {
                        color: #999; 
                        cursor: not-allowed;
                    }
                     
                    .firstul {
                        overflow: hidden;
                        transition: all .4s ease;
                        opacity: 0;
                        visibility: hidden;
                        transition: all .3s;
                        background:#fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                        border-radius: 4px;
                        position: absolute;
                        letter-spacing: 0;;
                        top: 50px;
                        right: -20px;
                        max-height: 300px;
                        overflow: hidden;
                        overflow-y: auto;
                        
                        li {
                            height: 42px;
                            line-height: 42px;
                            width: 130px;
                            font-size: 13px;
                            color:#333;
                            white-space: nowrap;
                            box-sizing: border-box;
                            padding-left: 10px;
                            border-bottom: 1px solid #f1f2f3;
                            border-left: 4px solid transparent;
                            cursor: pointer;
                            &.active{
                               color: #2993f8;
                               border-left-color: #2993f8;
                            }
                        }
                        li:hover {
                            background:#f6f7f8;
                        }
                    }
                    
                }
    
  } 
  
}

.page-container{
   height: 730px;
   
   .main-container{
     background-color: #fff;
     height: 100%;
     box-shadow: 0px 0 15px #e2e2e2;
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
     width: 1250px;
     float: left;
     
     >.container{
       display: flex;
       justify-content: space-between;
       margin-top: 20px;
     }
   }
}


</style>
<template>
<!--左侧菜单-->
<div class="system-nav" ref="system" :class="systemActive">
  <!--侧边栏固定按钮-->
  <button  @click="navFixed">
    <em class="navFixed iconfont " :class="fixedClass"></em>
  </button>
  
  <template v-for="(menu,i) in systemMenu">
      <div class="nav"  :class="sysShow == i ? 'active' : ''" v-for="(tl,p) in rootList" v-if="tl.mainName==menu.text">
          <!--一级菜单-->
          <template v-if="menu.children.length > 0 ">
            <router-link 
              tag="h3"  
              :to="menu.path" 
              :data-text="menu.text" 
              class="root" 
              :class="systemItemClass.rootIndex == i ? 
              (menu.path.length > 0 ? 'active path-href' : 'active') : (menu.path.length > 0 ? 'path-href' : '')" 
              @click.native="systemTab(i,menu.path.length > 0,menu)">
              <i class="iconfont" :class="'icon-'+menu.icon"></i>
              <!--<i v-if="menu.children.length > 0 " class="el-icon el-icon-arrow-down"></i>-->
            </router-link>
            <!--二级菜单-->
            <ul class="item secondary_item" 
                :class="menu.path.length > 0 ? 'path-href' : ''" 
                v-if="menu.children.length > 0 " 
                :data-text="menu.text" >
                
                <!--一级菜单有链接的情况下，二级菜单有多个菜单的处理-->
                <template v-if="menu.path.length > 0">
                    <router-link tag="li"
                        :to="menu.path" 
                        class="path-target"
                        @click.native="systemItem(i,-1, menu)">{{menu.text}}
                    </router-link>
                </template>
                
              <template v-for="(item,b) in menu.children" >
                <router-link tag="li":to="item.path" 
                  :class="systemItemClass.rootIndex == i && systemItemClass.childIndex == b ? 'active' : ''" 
                  v-for="api in applyLists"  
                  @click.native="systemItem(i, b, menu)" 
                  v-if="api.applyName.indexOf(menu.text) >= 0 && getPrivilegeList(api.applyName, item.text)">
                    <i class="iconfont" :class="'icon-'+item.icon" ></i>{{item.text}}
                </router-link>
              </template>
              
            </ul>
          </template>
          
          <template v-else-if="menu.children.length == 0 ">
            <router-link 
              tag="h3"
              :to="menu.path" 
              class="root not-item" 
              :class="systemItemClass.rootIndex == i ? 
              (menu.path.length > 0 ? 'active path-href' : 'active') : (menu.path.length > 0 ? 'path-href' : '')" 
              :data-text="menu.text"
              @click.native="systemTab(i,menu.path.length > 0,menu)">
              <i class="iconfont" :class="'icon-'+menu.icon"></i>
            </router-link>
            <ul class="item menu-item">
              <router-link 
                tag="li" 
                :to="menu.path" 
                @click.native="systemItem(i,0, menu)" >
                {{menu.text}}
              </router-link>
            </ul>
          </template> 
      </div>
  </template>
  <!-- <div class="nav">
    <template>
      <router-link 
        tag="h3" 
        class="root not-item"
        :class="systemItemClass.rootIndex == i ? 'active' : ''"
        to="/helpCenter"
        data-text="帮助中心"
        @click.native="systemTab(i,0)">
        <i class="iconfont icon-bangzhuzhongxin"></i>
      </router-link>
      <ul class="item menu-item">
        <router-link 
          tag="li"
          to="/helpCenter"
          @click.native="systemItem(i,0)" >
          帮助中心
        </router-link>
      </ul>
    </template> 
  </div> -->
</div>
</template>

<script>
import Vue from 'vue'
const systemMenu = require('../config/systemMenu')
import {mapGetters} from 'vuex'
import { seekMySelfWorkApplyList, seekGetFaceByShop, seekSmallProgramShopList} from 'Api/commonality/seek'
export default{
  data(){
    return {
        sysShow :'', //一级菜单当前状态
          systemItemClass : {
            rootIndex : '',
            childIndex :''
          }, //子菜单当前状态
        systemActive : 'hover-item', //大菜单
        isFixed : false, //是否固定菜单
        fixedClass : 'icon-zhankai1', 
        systemMenu : systemMenu,
        faceByShop: [], // 有人脸识别的店铺
        smallProgram: [], // 有小程序的店铺
        applyLists : [],
        myMenuTab:[]  //头部目录tab
    }
  },
  
  props : ['rootList'],
  
  created(){
    this.getIcon()
    this.initFixed()
    this._seekGetFaceByShop()
    this._seekSmallProgramShopList()
  },
  
  computed: {
    ...mapGetters([
      "shopListByCo" // 店铺列表
    ]),
    isFaceRecognition () {
      for (let i of this.faceByShop) {
        for (let k of this.shopListByCo) {
          if (i.id == k.shopId) {
            // 有开通
            if (i.count != 0) {
              return true
            }
          }
        }
      }
      // 没开通
      return false
    },
    isSmallProgram () {
      for (let i of this.smallProgram) {
        for (let k of this.shopListByCo) {
          if (i.shopId == k.shopId) {
              sessionStorage.setItem('isSmallProgram', 'Y');
              return true
          }
        }
      }
      sessionStorage.setItem('isSmallProgram', 'N');
      // 没开通
      return false
    }
  },
  methods:{
    // 获取个人信息
    getIcon () {
        seekMySelfWorkApplyList().then((response) => {
      console.log('获取菜单:::',response);
            if (response.data.state === 200) {
              this.applyLists = [];
              for (let i = 0; i < response.data.data.classifyList.length; i++) {
                this.applyLists.push(...response.data.data.classifyList[i].applyList)
              }
            } else {
              console.log('获取个人应用列表报错信息: ' + response.data.msg);
            }
        }, (response) => {
            console.log(response);
        })
    },
    
    //菜单切换
    systemTab ( loop ,type ,menu){
      if( type ){
        this.systemItemClass.rootIndex = loop
        this.systemItemClass.childIndex = -1
        sessionStorage.setItem('rootIndex', loop)
        sessionStorage.setItem('childIndex', -1)
      }
      this.sysShow = loop
      
      //去掉定义数组的undefined
      if (typeof(this.myMenuTab[0]) === "undefined" ){
      	this.myMenuTab = []
      }
      let pushStatus = true
      //如果没打开任何页签就把当前页签数据加入数组
      if(this.myMenuTab.length == 0){
      	this.myMenuTab.push(menu)
      }else{
      	for(let i=0;i<this.myMenuTab.length;i++){
	      	if(this.myMenuTab[i].text == menu.text){
	      		pushStatus = false
	      	}
	      }
      	if(pushStatus){
      		this.myMenuTab.push(menu)
      	}
      }
      
      console.log(this.myMenuTab)
      //将已经打开的页签数据绑定到Vue实例
      Object.assign( Vue.prototype, { menuTabData : this.menuTab})
    },
        
        //菜单显示
        systemShow(){
          
          this.$emit('setScopeSize', this.isFixed)
          //if( this.isFixed ) return; 
          let fixedBtn = document.getElementsByClassName('elem-btn')[0]
          let bodyHeader = document.getElementsByClassName('body-header')[0]
          let leftTittle = document.getElementsByClassName('left-tittle')[0]
          let totalTable = document.getElementsByClassName('total-table')[0]
          let bodyRow5 = document.getElementsByClassName('body-row5')[0]
          
          if( !this.isFixed ){
          this.systemActive = 'hover-item'
        setTimeout(function () {
          if( bodyHeader ) bodyHeader.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
          if( leftTittle ) leftTittle.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
          if( totalTable ) totalTable.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
          if( bodyRow5 ) bodyRow5.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
        }, 300)
          
        //console.log(document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px')
          }else{
          this.systemActive = 'active'
          //if( fixedBtn ) fixedBtn.style.marginLeft = '-530px'
        setTimeout(function () {
          if( bodyHeader ) bodyHeader.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
          if( leftTittle ) leftTittle.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
          if( totalTable ) totalTable.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
          if( bodyRow5 ) bodyRow5.style.left = document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px'
        }, 300)
        // console.log(document.getElementsByClassName('body-box')[0].getBoundingClientRect().left + 'px')
          }
        },
        
        //菜单权限控制
        getPrivilegeList (item,txt){
          let fb = item.split('-')
          if(fb.length > 0){
            if(fb[1]){
              return fb.includes(txt)
            }
          }
          return false
        },
        
        //固定菜单
        navFixed(){
           this.isFixed = !this.isFixed;
           this.systemActive = 'active'
           sessionStorage.setItem('_systemFixed', this.isFixed )
           this.systemShow()
        },
        
        initFixed(){
           let fixed = sessionStorage.getItem('_systemFixed')
           
           if( fixed == 'true'){
            this.isFixed = true;
            this.systemActive = 'active'
           } 
        },
        
        //子菜单点击事件
        systemItem (rootIndex, childIndex, menu ){
        	console.log(rootIndex)
        	console.log(childIndex)
        	console.log(menu)
        	/*
        	 * 这里要判断menu.children是否有数据，如无数据会报错导致只有一项子项的菜单获取不了焦点
        	 */
          if (menu && menu.children.length > 0) {
            if (!this.isFaceRecognition) {
              if (menu.text == '人脸' || menu.children[childIndex].text == '意向顾客') {
                eventBus.$emit('open-face-popup', '人脸识别')
              }
            }
            if (!this.isSmallProgram) {
              if (menu.children[childIndex].text == '小程序设置') {
                eventBus.$emit('open-face-popup', '小程序')
                return
              }
            }
            // if (menu.text == '人脸' && ) {
            //   eventBus.$emit('open-face-popup')
            // } else  if (menu.text == '人脸' && !this.isFaceRecognition) {
            //   // for (let i of menu.children) {
            //   //   if (i.text == '意向顾客' && !this.isFaceRecognition) {
            //   //     eventBus.$emit('open-face-popup')
            //   //     break
            //   //   }
            //   // }
            // }
          }
          this.systemItemClass.rootIndex = rootIndex
          this.systemItemClass.childIndex = childIndex
          sessionStorage.setItem('rootIndex', rootIndex)
          sessionStorage.setItem('childIndex', childIndex)
        },

        _seekGetFaceByShop () {
          seekGetFaceByShop()
            .then(res => {
              if (res.data.state == 200) {
                this.faceByShop = res.data.data.shopList
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
              }
            })
        },

        _seekSmallProgramShopList () {
          seekSmallProgramShopList()
            .then(res => {
              if (res.data.state == 200) {
                this.smallProgram = res.data.data.dataList
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
              }
            })
        }
  },
  mounted() {
    let self = this
    this.$nextTick(()=>{
      this.systemTab()
      this.systemItemClass.rootIndex = sessionStorage.getItem('rootIndex')
      this.systemItemClass.childIndex = sessionStorage.getItem('childIndex')
    })
      eventBus.$on("updateRoleList", function () {
      self.getIcon()
      self.initFixed()
    })
    }
}
</script>

<style scoped lang="scss">
/* 新菜单 样式 */
.system-nav{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1001;
  background-color: #fff;
  color: #666;
  padding-top: 64px;
  box-sizing: border-box;
  width: 70px;
  float: left;
  transition: all .2s;
  box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.12);
  overflow-y: auto;
  overflow-x: hidden;
  
  >button{
    height: 60px;
    width: 100%;
    text-align: center;
    border:0 none;
    background-color: #2993f8;
    border-bottom:1px solid #e0e0e0;
    cursor: pointer;  
  }
  
  
  .navFixed{
    display: inline-block;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    transition: .2s ease transform; 
  }

  >.nav{
    border-bottom:1px solid #e0e0e0;
    
    >.menu-item{display: none;}
    >.item{
       //padding:5px 0 ;
       overflow: hidden;
       display: none;
       width: 190px;
       
       li{
        height: 42px;
        line-height: 42px;
        padding-left: 55px;
        cursor: pointer;
        font-size: 14px;
        color: #333;
        border-left: 3px solid transparent;
        
        i{
          font-size: 16px;
          margin-right: 8px;
          color: #333;
        }
        &:hover,&.active{
          color: #2993f8;
          background-color: #f7f7f7;
          i{
            color: #2993f8;
          }
        }
        &.active{
          border-color: #2993f8;
        }
       }
       
      .path-target{
         display: none;
      }
    }
  }
  
  //鼠标滑过出现下拉框
  &.hover-item{
    overflow: visible;
    .nav{
      position: relative;
      //width: 70px;
      >.item{
        padding: 0;
        position: absolute;
        left: 70px;
        top:0;
        background-color: #fff;
        z-index: 9;
        display: block;
        border-radius: 0 3px 3px 0;
        box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.12);
        overflow: visible;
        visibility: hidden;
        opacity:0;
        
        >li{
          padding-left:22px; 
        }
        
        &.secondary_item:before{
          content: attr(data-text);
          display: block;
          height: 60px;
          width: 160px;
          position: relative; 
          top: 0;
          left: -5px;
          background-color: #fff;
          line-height: 60px;
          text-align: left;
          padding-left: 30px;
          color: #999;
          z-index: 1;
        }
        
        //item
        &.path-href{
           &:before{
               display: none;
           }
           >.path-target{
              display: block;
              height: 60px;
              color: #999;
              line-height: 60px;
              padding-left: 25px;
              font-size: 16px;
              &:hover{
                color: #2993f8;  
              }
           }
        }
        
        
        &.menu-item{
          &:before{
            content:'';
            display: block;
            height: 60px;
            width: 5px;
            position: absolute; 
            top: 0;
            left: -5px;
            background-color: #fff;
            z-index: 0;
          }
          >li{
            height: 60px;
            line-height: 60px;
            color: #333;
            &:hover{
                color: #2993f8;
            }
          }
        }
      }
      
      &:hover{
        >.item{
          visibility: visible;
          opacity: 1;
        }
      }
      
      
      >.root{
        padding-left: 22px;
        border-left: 3px solid transparent;
        &.active{
          border-left-color: #2993f8;
          i.iconfont{
            color: #2993f8;
          }
        }
        
        &:hover{
          i.iconfont{
            color: #2993f8;
          }
        }
      }
      
      &:hover{
        >.root{
          box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }
    
  }
  
  /* 标题 */
  .root{
    font-weight: normal;
    font-size: 16px;
    height: 60px;
    padding-left: 22px;
    width:100%;
    position: relative;
    
    &.path-href{
      cursor: pointer;
      &:hover{
        i.iconfont{
          color: #2993f8!important;
        }
        &:after{
          color: #2993f8;
        }
      }
    }
    
    &:after{
      content: attr(data-text);
      position: absolute;
      white-space: nowrap;
      left: 60px;
      top: 18px;
      display: none;
      color: #bdbdbd;
    }
    
    .el-icon{
      position: absolute;
      right:18px;
      top: 26px;
      font-size: 11px;
    }

    i.iconfont{
      display: inline-block;
      font-size: 20px;
      margin: 19px 0;
      color: #999;
    }
  }
  
  //展开状态
  &.active{
    width: 190px;
    & + .app-main{
      left: 190px;
    }
    
    >button{
      background-color: transparent;
      .navFixed{
        color: #666;
        transform: rotate(-180deg);
      }
    }
  
    .root{
      
      i.iconfont{
        color: #bdbdbd;
      }
      
      &:after{
        display:inline-block;
      }
      
      border-left:3px solid transparent;
      
      &.active{
        &.path-href{
          border-left-color: #2993f8;
          &:after{
            color: #2993f8;
          }
          i.iconfont{
            color: #2993f8!important;
          }
        }
      }
    }
    
    .nav{
      
      .item{
         display: block;
      }
      
      .menu-item{
        display: none;
      }
      /* 子菜单 */
      &.active{
        
        .root i{ color: #a0a0a0;}
        
        >.item{
          color: #333;
        }
      }
    }
    
  }
}
</style>
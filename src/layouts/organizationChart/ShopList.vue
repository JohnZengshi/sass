<template>
  <div class="shop-list-main">
    <h5 class="add-Administrator-wrap">
      <span class="little-title-left">店铺（{{shopDataList.length}}个）</span>
    </h5>
    
    <ul ref="shopListWrap" v-if="shopDataList" style="margin-bottom: 50px;">
      <template v-for="(item, index) in shopDataList">
        <li :key="index">
          <div class="shop-wrap" @click="shopInfo(item, index)">
            <img src="./../../assets/img/shop-icon.png" alt="">
            <div class="title-wrap title-wrap-shop">
              <p :title="item.shopName">{{item.shopName}}</p>
            </div>
            <p :title="item.shopCount + '人'">（{{item.shopCount}}人）</p>
          </div>
          <div class="manager-assistant">
            <div class="store-manager-wrap">
              <h6 class="little-title-wrap" @click="open('manage' + item.shopId, item, index, 'manage')">
                <i class="triangle-icon" :title="isOpen[index] ?'点击收起':'点击展开'" :class="{'close-triangle-icon': isOpen[index] && mark == 'manage', 'open-triangle-icon': !isOpen[index]}"></i>
                <span class="little-title-left">店长</span>
                <!-- <span v-if="isOperate" class="add-tit" style="margin-right: 10px;" @click="addAdministrator(item.shopId, 3)"><i>+</i>店长</span> -->
                <template v-if="item.storeManager">
                  <template v-if="item.storeManager.length">
                    <a @click="addAdministrator(item.shopId, 3)" v-if="isOperate" href="javascript: void(0)" class="add-btn">+更换</a>
                  </template>
                  <template v-else>
                    <a @click="addAdministrator(item.shopId, 3)" v-if="isOperate" href="javascript: void(0)" class="add-btn">+添加</a>
                  </template>
                </template>
              </h6>
              <ul :id="'manage' + item.shopId" style="height: 0;">
                <template v-for="(storeManagerData,index) in item.storeManager">
                  <li class="isHas" @click="lookDetail(storeManagerData, index)" :key="index" :class="{actions: storeManagerData.userId == organizatonChangeId && userIndex == storeManagerData.role && listIndex == index}">
                    <img src="./../../assets/img/manage-icon.png" alt="">
                    <div class="title-wrap">
                      <p>{{storeManagerData.username}}</p>
                      <!-- <p>{{storeManagerData.phone}}</p> -->
                    </div>
                  </li>
                </template>
              </ul>
            </div>
            
            <div class="shop-assistant">
                <h6 class="little-title-wrap" @click="open('person' + item.shopId, item, index, 'person')">
                  <i class="triangle-icon" :title="isOpen[index] ?'点击收起':'点击展开'" :class="{'close-triangle-icon': isOpen[index] && mark == 'person', 'open-triangle-icon': !isOpen[index]}"></i>
                  <span class="little-title-left">店员</span>
       <!--            <span v-if="isAddShopManager" class="add-tit" style="margin-right: 10px;" @click="addAdministrator(item.shopId, 4)"><i>+</i>店员</span> -->
                    <a @click="addAdministrator(item.shopId, 4)" v-if="isAddShopManager && item.shopManagerId == userId" href="javascript: void(0)" class="add-btn">+添加</a>
                </h6>
                <ul :id="'person' + item.shopId" style="height: 0;">
                  <template v-for="(storeManagerData,index) in item.shopAssistant">
                    <li class="isHas" @click="lookDetail(storeManagerData, index)" :key="index" :class="{actions: storeManagerData.userId == organizatonChangeId && userIndex == storeManagerData.role && listIndex == index}">
                      <img src="./../../assets/img/clear-icon.png" alt="">
                      <div class="title-wrap">
                        <p>{{storeManagerData.username}}</p>
                        <!-- <p>{{storeManagerData.phone}}</p> -->
                      </div>
                    </li>
                  </template>
                </ul>
            </div>       
          </div>
        </li>
      </template>
    </ul>
    <!--<a @click="addShop" href="javascript: void(0)" class="add-tit add-shop-icon">+添加店铺</a>
    <buyShop v-if="newPopup" :shopDataList="shopDataList" :newPopup="newPopup" @closeBuyShop="closeBuyShop"></buyShop>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  // import buyShop from './buyShop/index'
  import {seekShopInfo} from 'Api/commonality/seek'
  export default {
    props: ['shopDataList', 'isWarden', 'isCompile', 'isStoreManager', 'isShopManager', 'updatas', 'isShopMan', 'isCloseAccordion'],
    components: {
    },
    data () {
      return {
        userId: sessionStorage.id,
        isOpen: [],
        newPopup: false,
        userIndex: null,
        listIndex: null,
        actIndex: '',
        mark: ''
      }
    },
    computed: {
      ...mapGetters([
        'organizatonChangeId'
      ]),
      // shopNum () {
      //   let shopNum = 0
      //   for (let i of this.shopDataList) {
      //     shopNum += parseInt(i.shopCount)
      //   }
      //   return shopNum
      // },
      isOperate () {

        if (this.isShopMan) {
          if (this.isWarden) {
            return true
          } else {
            return false
          }  
        } else if (this.isWarden) {
          return true
        }
         return false
      },
      isAddClerk () {
        if (this.isCompile && this.isStoreManager) {
          return true
        } else if (this.isCompile && this.isWarden) {
          return true
        }
        return false
      },
      isAddShopManager () {
        if (this.isShopManager) {
          return true
        }
        return false
      }
    },
    watch: {
      'updatas' () {
        for (let i in this.isOpen) {
          if (this.isOpen[i]) {
            let Keys = Number(i)
            let _self = this
            setTimeout(function() {
             // _self.optens(_self.shopDataList[Keys].shopId, _self.shopDataList[Keys], Keys)
            }, 1000)
          }
        }
      },
      'isCloseAccordion' (val) {
        console.log(val)
        if (val == true) {
          let parmId = ''
          let parmId1 = ''
          let objData = ''
          let objData1 = ''
          for (let i = 0; i < this.shopDataList.length; i++) {
            parmId = 'manage' + this.shopDataList[i].shopId
            parmId1 = 'person' + this.shopDataList[i].shopId
            objData = document.getElementById(parmId)
            objData1 = document.getElementById(parmId1)
              objData.style.height = 0 + 'px';
              objData1.style.height = 0 + 'px';
          }
        }
      },
      'isCompile' () {
        let addNum = 0;
        // if (this.isCompile) {
          if (this.isOperate) {
            addNum += 40
          }
          if (this.isAddShopManager) {
            addNum += 40
          }
          for (let i in this.isOpen) {
            if (this.isOpen[i]) {
              let Keys = Number(i)
              let _self = this
              setTimeout(function() {
                _self.optionThree(_self.shopDataList[Keys].shopId, _self.shopDataList[Keys], Keys, addNum)
              }, 1000)
            }
          }
        // }
      }
    },
    methods: {
      optionThree (parm, item, Index, addNum) {
        let datas = document.getElementById(parm)
        Vue.set(this.isOpen, Index, true)
        let storeManager = item.storeManager.length
        let shopAssistant = item.shopAssistant.length
        let allNum = 0
        if ($('.isHas').hasClass('actions')) {
          allNum = (shopAssistant) * 36 + 14 + addNum
        } else {
          allNum = (shopAssistant) * 36 + 14 + addNum
        }
        datas.style.height = allNum + 'px'
      },
      optens (parm, item, Index) {
        let addNum = 0;
        if (this.isOperate) {
          addNum += 40
        }
        if (this.isAddShopManager) {
          addNum += 40
        }
        let datas = document.getElementById(parm)
        Vue.set(this.isOpen, Index, true)
        //let storeManager = item.storeManager.length
        let shopAssistant = item.shopAssistant.length
        let allNum = 0
        if ($('.isHas').hasClass('actions')) {
          allNum = (shopAssistant) * 46
        } else {
          allNum = ( shopAssistant) * 46
        }
        datas.style.height = allNum + 'px';
      },
      open (parm, item, Index, type) {
        // console.log(this.shopDataList)
        this.mark = type
        let parmId = ''
        let parmId1 = ''
        let objData = ''
        let objData1 = ''
        for (let i = 0; i < this.shopDataList.length; i++) {
          parmId = 'manage' + this.shopDataList[i].shopId
          parmId1 = 'person' + this.shopDataList[i].shopId
          objData = document.getElementById(parmId)
          objData1 = document.getElementById(parmId1)
          if (Index != i) {
            objData.style.height = 0 + 'px';
            objData1.style.height = 0 + 'px';
          }
        }
        let addNum = 0;
        let datas = document.getElementById(parm)
        if (datas.style.height === '0px') {
          
          Vue.set(this.isOpen, Index, true)
          let storeManager = item.storeManager.length
          let shopAssistant = item.shopAssistant.length
          let allNum = 0
          if (type == 'manage') {
            allNum = (storeManager) * 46
          } else {
            allNum = (shopAssistant) * 46
          }
          datas.style.height = allNum + 'px';
          this.$emit("closeAccordion", true)
        } else {
          this.mark = '关闭'
          Vue.set(this.isOpen, Index, false)
          datas.style.height = 0 + 'px';
        }
      },
      lookDetail (item, index) {
        // this.$store.dispatch('workOrganizationChange', item.userId)
        console.log(item)
        let isShopMap = true
        this.userIndex = item.role
        this.listIndex = index
        let options = {
          userId: item.userId
        }
        sessionStorage.setItem('shopMan',true)
        this.$emit('shopUserInfo', options)
        this.$emit('shopSettingUserRole', options)
        this.$emit('shopGetUserInfo', options)
        this.$emit('lookShopMan',isShopMap)
      },
      shopInfo (item, index) {
        this.actIndex = index
        let options = {
          shopId: item.shopId
        }
        this.$emit('shopInfo', options)
      },
      addAdministrator (parm, Num) {
        let options = {
          shopId: parm,
          Num: Num
        }
        this.$emit('addStaff', options)
      },
      addShop () {
        this.newPopup = true
      },
      closeBuyShop (parm) {
        this.newPopup = false
        if (parm) {
          this.$emit('_seekGetDepUserList')
        }
        // let _self = this
        // setTimeout(function() {
        //   for (let i in _self.isOpen) {
        //     if (_self.isOpen[i]) {

        //     }
        //     console.log(i)
        //   }
        // }, 1000)
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
.shop-list-main{
  background:#fbfbfb;
  margin-top: 7px;
  //box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
  .add-Administrator-wrap{
    //margin: 14px 0 14px 20px;
    height: 36px;
    
    //background:#e6e6e6;
    line-height: 36px;
    padding: 0 0 0 20px;
    .little-title-left{
      color: $main-color;
      font-size: 14px;
      font-weight: bold;
    }
    .add-tit{
      float: right;
      font-size: 12px;
      margin-right: 10px;
      color: $main-color;
      cursor: pointer;
      i{
        font-size: 12px;
        vertical-align: middle;
        font-style: normal;
        margin-bottom: 6px;
        display: inline-block;
      }
    }
    .add-tit-shop{
      margin-right: 18px;
    }
  }
  .manager-assistant{
    // overflow: hidden;
    transition: height .2s ease;
    height: auto;
    position: relative;
    padding-bottom:5px;
    margin-bottom: 5px;
    //padding-left:24px;
    .store-manager-wrap, .shop-assistant{
      height: auto;
      .little-title-wrap{
        padding: 0 0 0 44px;
        height: 46px;
        color: $font-color-neutral;
        overflow: hidden;
        cursor: pointer;
        .little-title-left{
          font-size: 13px;
          font-weight: normal;
          margin-top: 13px;
          display: block;
          float: left;
          color:#333;
        }
        .triangle-icon{
          display: inline-block;
          height: 20px;
          width: 20px;
          background: url('./../../assets/img/triangle-icon.png') no-repeat center center;
          background-size: 8px;
          float: left;
          margin-top: 13px;
          //line-height: 20px;
         // margin-right: 15px;
          cursor: pointer;
          opacity: .6;
          transition:all .2s;
          transform: rotate(270deg);
          &:hover{
            opacity: 1;
          }
        }

        .close-triangle-icon{
          transform:rotateZ(360deg);
        }
        .open-triangle-icon{
          transform: rotate(270deg);
        }
        .add-tit{
          float: right;
          font-size: 12px;
          margin-right: 10px;
          color: $main-color;
          cursor: pointer;
          i{
            font-size: 12px;
            vertical-align: middle;
            font-style: normal;
            margin-bottom: 6px;
            display: inline-block;
          }
        }
      }
      .little-title-wrap:hover {
        background:#e7eaef;
        .add-btn {
          color:#2993f8;
        }
      }
      ul{
        // margin-left: 54px;
        transition: height .2s ease;
        overflow: hidden;
        li{
          padding: 5px 0 5px 22px;
          padding-left: 54px;
          height: 46px;
          cursor: pointer;
          transition: all .2s;
          img{
            margin-top: 10px;
            height: 14px;
            width: 14px;
          }
          .title-wrap{
            vertical-align: top;
            display: inline-block;
            margin-left: 8px;
            margin-top: 4px;
            p:nth-child(1){
              font-size: 13px;
              line-height: 26px;
              color: #333;
            }
          }
          p {
            font-size: 14px;
          }
          // &:hover{
          //   background-color: #f0f0f0;
          // }
        }
        li:hover {
          background:#e7eaef;
        }
        .actions{
          background-color: #2993f8;
          color:#fff;
          position: relative;
          .title-wrap{
            //height: 50px;
            p:nth-child(1){
              color:#fff;
            }
            p:nth-child(2){
              //display: block;
            }
          }
        }
        .actions:hover {
          background:#198cfa;
        }
        // .actions:before {
        //   content: '';
        //   height: 50px;
        //   width: 4px;
        //   background:#2993f8;
        //   position: absolute;
        //   left: 0;
        //   top: 0;
        // }
      }
    }
  }
  .manager-assistant:after {
    background:#e6e6e6;
    content: '';
    //margin-left: 24px;
    position:absolute;
    left:0;
    bottom: 0;
    height: 1px;
    width: 100%;
  }
  .shop-wrap{
    padding: 5px 0;
    height: 50px;
    overflow: hidden;
    cursor: pointer;
    padding-left: 22px;
    img{
      height: 14px;
      width: 14px;
      //border-radius: 50%;
      float: left;
      margin-top: 10px;
    }
    .title-wrap{
      vertical-align: top;
      display: inline-block;
      height: 22px;
      max-width:145px;
      float: left;
      margin-left: 8px;
      position: relative;
      margin-top: 7px;
      p:nth-child(1){
        //margin-top: 2px;
        font-size: 13px;
        line-height: 26px;
        color: #333;
      }
    }
    &>p {
      color: #333;
      font-size: 14px;
      float: left;
      max-width: 60px;
      margin-top: 8px;
      margin-left: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .title-wrap-shop{
       p:nth-child(1){
        font-size: 14px;
        line-height: 22px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .triangle-icon{
      height: 20px;
      width: 20px;
      background: url('./../../assets/img/triangle-icon.png')  center center no-repeat;
      background-size: 8px;
      float: left;
      margin-top: 4px;
      cursor: pointer;
      opacity: .6;
      transition:all .2s;
      &:hover{
        opacity: 1;
      }
    }
    .close-triangle-icon{
     transform:rotateZ(360deg);
    }
    .open-triangle-icon{
      transform: rotate(270deg);
    }
  }
  .shop-wrap:hover {
    background:#e7eaef;
  }
  .shop-wrap.active {
    background:#2993f8;
    p {
      color:#fff;
    }
    .title-wrap {
      p {
        color:#fff;
      }
    }
  }
  .add-btn{
    display: block;
    width: 50px;
    height: 20px;
    font-size: 12px;
    float: right;
    color:#a6a6a6;
    font-weight: normal;
    //margin: 0 auto;
    //background-color: #ccc;
    //border-radius: 5px;
    margin-top: 13px;
  }
  .add-manager-icon{
    background: url('~assets/img/buyShop/add-manager-icon.png') no-repeat;
    background-size: 90px 24px;
  }
  .replace-manager-icon{
    background: url('~assets/img/buyShop/replace-manager-icon.png') no-repeat;
    background-size: 90px 24px;
  }
  .add-shop-assistant-icon{
    background: url('~assets/img/buyShop/add-shop-assistant-icon.png') no-repeat;
    background-size: 90px 24px;
  }
  
}
</style>

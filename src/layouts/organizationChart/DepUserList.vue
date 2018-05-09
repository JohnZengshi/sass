<template>
  <div class="member-list-main">
    <div class="body-wrap">
      <!--<h4 class="title-icon-wrap">
        <i></i>
        <span>成员</span>
      </h4>-->
      <div class="company-info-header" @click="seekCompanyData">
        <!--<i class="iconfont icon-liebiao" style="font-size: 14px;margin-right: 6px;"></i>公司信息-->
        <img :src="companyInfo.logo">
        <span>{{companyInfo.companyName}}</span>
      </div>
      <div class="header-wrap">
        <div class="headquarters-wrap">
          <div class="member-list">
            <h5>总部（{{headquarterTotal}}人）</h5>

            <h6 class="little-title-wrap" :class="{'open-class': isOpen[0]}"  @click="open('administratorWrap', administratorList.length, 0)">
              <i class="triangle-icon" :title="isOpen[0] ?'点击收起':'点击展开'" :class="{'close-triangle-icon': isOpen[0], 'open-triangle-icon': !isOpen[0]}"></i>
              <span class="little-title-left">管理员（{{administratorList.length}}人）</span>
              
              <!-- <span class="add-tit" @click="addAdministrator" v-if="isAddSuperTube"><i>+</i>管理员</span> -->
              <a @click="addAdministrator" v-if="isAddSuperTube" style="padding-left: 0" href="javascript: void(0)" class="add-btn">+添加</a>
            </h6>

            <ul ref="administratorWrap" style="height: 0">
              <template v-for="(item, index) in administratorList">
                <li class="isHas" :key="index" @click="lookDetail(item, 'administratorWrap', index)" :class="{actions: item.userId == organizatonChangeId && userIndex == index}">
                  <img src="./../../assets/img/superManage.png" alt="">
                  <div class="title-wrap">
                    <p>{{item.userName}}</p>
                    <p>{{item.phone}}</p>
                  </div>
                </li>
              </template>
            </ul>

            <!-- 监察者 -->
            

            <h6 class="little-title-wrap" :class="{'open-class': isOpen[1]}" @click="open('clerkListWrap', clerkList.length, 1)">
              <i class="triangle-icon" :title="isOpen[1] ?'点击收起':'点击展开'" :class="{'close-triangle-icon': isOpen[1], 'open-triangle-icon': !isOpen[1]}"></i>
              <span class="little-title-left">职员（{{clerkList.length}}人）</span>
              <!-- <span class="add-tit" @click="addClerk" v-if="isOperate"><i>+</i>职员</span> -->
              <a @click="addClerk" v-if="isOperate" href="javascript: void(0)" class="add-btn">+添加</a>
            </h6>
            
            <ul ref="clerkListWrap" style="height: 0">
              <template v-for="(item, index) in clerkList">
                <li class="isHas" :key="index" @click="lookDetail(item, 'clerkListWrap', index)" :class="{actions: item.userId == organizatonChangeId && userIndex == index}">
                  <img src="./../../assets/img/manage-icon.png" alt="">
                  <div class="title-wrap">
                    <p>{{item.userName}}</p>
                    <p>{{item.phone}}</p>
                  </div>
                </li>
              </template>
            </ul>
            
            <div class="shadow-line"></div>
            
          </div>

          <ShopList
            :updatas="updatas"
            :shopDataList="shopDataList"
            :isCompile="isCompile"
            :isWarden="isWarden"
            :isShopMan="isShopMan"
            :isShopManager="isShopManager"
            :isCloseAccordion="isCloseAccordion"
            @shopUserInfo="_seekUserInfo"
            @shopSettingUserRole="_seekSettingUserRole"
            @_seekGetDepUserList="_seekGetDepUserList"
            @shopGetUserInfo="_seekGetUserInfo"
            @shopInfo="_seekShopInfo"
            @addStaff="addStaff"
            @closeAccordion="closeAccordion"
          ></ShopList>
          <AddPopup
            v-if="isQueryOption"
            :isQueryOption="isQueryOption"
            :operateType="operateType"
            :shopId="shopId"
            @queryOptionFun="queryOptionFun"
          ></AddPopup>
        </div>
      </div>
    </div>
    <!-- <a href="javascript: void(0)" class="add-tit add-shop-icon">
      <span @click="addShop">+添加店铺</span>
    </a> -->
    <buyShop v-show="newPopup" :shopDataList="shopDataList" :newPopup="newPopup" @closeBuyShop="closeBuyShop"></buyShop>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import ShopList from './ShopList'
  import buyShop from './buyShop/index'
  import AddPopup from './AddPopup'
  import {seekUserInfo, seekSettingUserRole, seekGetUserInfo, seekShopInfo} from 'Api/commonality/seek'
  export default {
    props: ['administratorList', 'clerkList', 'shopDataList', 'positionData', 'headquarterTotal', 'isShopMan', 'isWarden', 'isCompile', 'isSuperTube', 'isShopManager', 'updatas'],
    components: {
      ShopList,
      AddPopup,
      buyShop
    },
    data () {
      return {
        operateType: '1',
        shopId: '',
        isOpen: [],
        isAdministrator: false,
        isClerk: false,
        isQueryOption: false,
        options: {}, // 上个组件传过来的参数
        offHeight: '',
        userIndex: null,
        newPopup: false,
        isCloseAccordion: false, // 关闭手风琴
      }
    },
    created () {
    },
    mounted () {
      let self = this
      //this.offHeight = this.$refs[parm].offsetHeight + 16
      // $(".member-list-main").mCustomScrollbar({
      //     theme: "minimal-dark",
      //     axis: 'y',
      //     mouseWheel: {
      //         scrollAmount: 200,
      //         preventDefault: false,
      //         normalizeDelta: false
      //     },
      // });
      eventBus.$on('queryOptionFun', function (val) {
        self._seekShopInfo(val);
      })
     // this.initOpen('administratorWrap', this.administratorList.length, 0)
    },
    watch: {
      'updatas' () {
        for (let i in this.isOpen) {
          if (this.isOpen[i]) {
            this.optens(i)
            // let Keys = Number(i)
            // let _self = this
            // setTimeout(function() {
            //   _self.optens(_self.shopDataList[Keys].shopId, _self.shopDataList[Keys], Keys)
            // }, 1000)
          }
        }
        // alert('更新啦')
      }
    },
    computed: {
      ...mapGetters([
        'organizatonChangeId',
        'userPositionInfo',
        'companyInfo'
      ]),
      isOperate () {
        if (this.isWarden) {
          return true
        }
        return false
      },
      isAddSuperTube () {
        if (this.isSuperTube) {
          return true
        }
        return false
      }
    },
    methods: {
      closeAccordion (val) { // 关闭多余列表
        if (val == true) {
          this.isCloseAccordion = false
          this.$refs.administratorWrap.style.height = 0 + 'px';
          this.$refs.clerkListWrap.style.height = 0 + 'px';
        }
      },
      addShop () {
        this.newPopup = true
      },
      closeBuyShop (parm) {
        this.newPopup = false
        if (parm) {
          this.$emit('_seekGetDepUserList')
        }
      },
      filterCompanyRole (parm) { // 提取公司角色
        // console.log('好的好的好的好的', parm)
        for (let i of parm) {
          switch (i.role) {
            case '1':
              return true;
            case '2':
              return true
            case '3':
              return true
          }
        }
        return false
      },
      seekCompanyData () { // 查看公司信息
        this.$store.dispatch('workOrganizationChange', '')
        this.$emit('seekCompanyData')
        //console.log(this.companyInfo)
      },
      optens (Index) {
        // console.log('选中的值', Index)
        if (Index == 1) {
          this.$refs.clerkListWrap.style.height = this.clerkList.length * 46 + 'px';
        } else {
          this.$refs.administratorWrap.style.height = this.administratorList.length * 46 + 'px';
          //console.log(2222222222)
        }
      },
      initOpen (parm, Num, Index) {
        Vue.set(this.isOpen, Index, true)
        this.$refs[parm].style.height = Num * 46 + 'px';
      },
      open (parm, Num, Index) {
        if (this.$refs[parm].style.height === '0px') {
          Vue.set(this.isOpen, Index, true)
          if ($('.isHas').hasClass('actions')) {
            this.$refs[parm].style.height = Num * 46 + 'px';
          } else {
            this.$refs[parm].style.height = Num * 46 + 'px';
          }
          this.isCloseAccordion = true
        } else {
          Vue.set(this.isOpen, Index, false)
          this.$refs[parm].style.height = 0 + 'px';
          this.isCloseAccordion = false
        }
        //this.offHeight = this.$refs[parm].offsetHeight
      },
      addStaff (parm) {
        this.shopId = parm.shopId
        this.operateType = parm.Num
        this.isQueryOption = true;
      },
      _seekGetDepUserList () {
        this.$emit('_seekGetDepUserList')
      },
      queryOptionFun (parm) {
        this.isQueryOption = false
        if (parm) {
          this.$emit('_seekGetDepUserList')
          this.$emit('updateuserpromise');
        }
      },
      addAdministrator () { // 添加管理员
        this.shopId = ''
        this.operateType = '1'
        this.isQueryOption = true
      },
      addClerk () { // 添加职员
        this.shopId = ''
        this.isQueryOption = true
        this.operateType = '2'
      },
      lookDetail (item, parm, index) {
        // this.$store.dispatch('workOrganizationChange', item.userId)
        //console.log(this.offHeight)
        console.log(item)
        this.userIndex = index
        // if (this.$refs[parm].offsetHeight != this.offHeight) {
        //   this.$refs[parm].style.height = this.offHeight + 'px'
        // }
        let options = {
          userId: item.userId 
        }                                                                                  
        this._seekUserInfo(options, true)
        this._seekSettingUserRole(options)
        this._seekGetUserInfo(options)
      },
      _seekUserInfo (options, isCompany) { // 用户信息
        this.$store.dispatch('workOrganizationChange', options.userId)
        seekUserInfo(options)
          .then(res => {
            if (res.data.state === 200) {
              let userInfo = res.data.data
              userInfo.userId = options.userId
              if (isCompany) {
                userInfo.isCompany = isCompany
              } else {
                userInfo.isCompany = false
              }
              // if (this.filterCompanyRole(this.userPositionInfo.roleList)) {
              //   userInfo.isCompany = true
              // }
              this.$emit('_seekUserInfo', userInfo)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekSettingUserRole (options) { // 用户数据加载权限
        seekSettingUserRole(options)
          .then(res => {
            console.log(res)
            if (res.data.state === 200) {
              this.$emit('_seekSettingUserRole', res.data.data)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekGetUserInfo (options) { // 用户职位信息
        seekGetUserInfo(options)
          .then(res => {
            if (res.data.state === 200) {
              this.$emit('_seekGetUserInfo', res.data.data)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekShopInfo (options) {
        this.options = options
        seekShopInfo(options)
          .then(res => {
            if (res.data.state === 200) {
              let datas = res.data.data
              datas.shopId = options.shopId
              this.$emit('_seekShopInfo', datas)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
.add-shop-icon{
    display: block;
    width: 100%;
    height: 44px;
    font-size: 12px;
    background:#fbfbfb;
    color:#fff;
    background-size: 90px 24px;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    left: 0;
    span {
      margin-top: 11px;
      margin-left: 71px;
      display: block;
      width: 90px;
      background-color: #2993f8;
      border-radius: 5px;
      line-height: 24px;
      text-align: center;
    }
  }
.member-list-main{
  position: relative;
  overflow: hidden;
  //overflow-y: auto;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
  .body-wrap {
    border-top-left-radius: 8px;
    
    overflow: hidden;
  }
  .title-icon-wrap{
    margin: 20px 0 0 20px;
    i{
      display: inline-block;
      height: 16px;
      margin: 0 10px 0 0;
      width: 16px;
      background: url('./../../assets/img/members-icon.png') no-repeat;
      background-size: 16px;
    }
    span{
      vertical-align: top;
      font-size: 16px;
      line-height: 16px;
      color: $font-color-deep;
    }
  }
  .company-info-header {
    //margin-bottom: 20px;
    border-top-left-radius: 8px;
    overflow: hidden;
    width: 100%;
    height: 50px;
    background:#2993f8;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    img {
      border-radius: 50%;
      width: 33px;
      height: 33px;
      //border:2px solid #fff;
      margin-top: 9px;
      margin-left: 15px;
      margin-right: 12px;
      float: left;
      
    }
    span {
      width: 150px;
      color:#fff;
      font-size: 16px;
      overflow: hidden; 
       white-space:nowrap;
       text-overflow: ellipsis; 
        -o-text-overflow: ellipsis;
        display: inline-block;
      line-height: 50px;
    }
  }
  .company-info-header:hover {
    background:#198cfa;
  }
  .header-wrap {
    overflow-y: auto;
    height: 696px;
    margin-top: 50px;
    background:#fbfbfb;
    //margin-bottom: 44px;
  }
  .headquarters-wrap{
    //margin-top: 20px;
    .member-list {
      background:#fbfbfb;
      position: relative;
      //box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      .shadow-line {
        height: 8px;
        width: 100%;
        background:url('./../../assets/img/line.png') no-repeat;
        background-size: contain;
        position: absolute;
        bottom: -8px;
        left: 0;
      }
    }
    h5{
      font-size: 14px;
      line-height: 12px;
      padding: 0 0 0 20px;
      color: $main-color;
      font-weight: bold;
      height: 36px;
      //background:#e6e6e6;
      line-height: 36px;
    }
    .little-title-wrap{
      padding: 7px 0 7px 22px;
      // height: 20px;
      line-height: 50px;
      height: 50px;
      color: $font-color-neutral;
      overflow: hidden;
      cursor: pointer;
      .little-title-left{
        font-size: 14px;
        line-height: 14px;
        font-weight: normal;
        color: #333;
      }
      .triangle-icon{
        display: inline-block;
        height: 20px;
        width: 20px;
        float: left;
        background: url('./../../assets/img/triangle-icon.png')  center center no-repeat;
        margin-top: 10px;
        opacity: .6;
        transition: all .2s;
        &:hover{
          opacity: 1;
        }
      }
      .close-triangle-icon{
        transform: rotateZ(360deg);
      }
      .open-triangle-icon{
        transform:rotate(270deg);
      }
      .add-tit{
        // margin-right: 10px;
        color: $main-color;
        cursor: pointer;
        margin-top: -2px;
        i{
          display: inline-block;
          font-size: 12px;
          vertical-align: top;
          font-style: normal;
          margin-top: -2px;
        }
      }
    }
    .little-title-wrap.open-class {
      //background:#e7eaef;
    }
    .little-title-wrap:hover {
      background:#e7eaef;
      .add-btn {
        color:#2993f8;
      }
    }
    ul{
      transition: height .2s ease;
      overflow: hidden;
      li{
        padding: 5px 0 5px 34px;
        transition:all .2s;
        height: 46px;
        cursor: pointer;
        img{
          margin-top: 13px;
          height: 14px;
          width: 14px;
          //float: left;
          //border-radius: 50%;
        }
        .title-wrap{
          vertical-align: top;
          display: inline-block;
          //height: 46px;
          margin-left: 12px;
          margin-top: 7px;
          p:nth-child(1){
            margin-top: 2px;
            font-size: 13px;
            line-height: 22px;
            color: #333;
          }
          p:nth-child(2){
            height: 12px;
            line-height: 12px;
            margin-top: 8px;
            font-size: 12px;
            width: 100%;
            color: #999;
            display: none
          }
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
        transition:all .2s;
        //height: 50px;
        //padding:7px 0 8px 34px;
        position: relative;
        // img {
        //   height: 36px;
        //   width: 36px;  
        // }
        .title-wrap{
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
    .add-btn{
      // display: block;
      // width: 90px;
      // height: 24px;
      // font-size: 14px;
      // margin: 10px auto;
      // background-color: #ccc;
      // border-radius: 5px;
      line-height: 20px;
      margin-top: 10px;
      display: block;
      width: 50px;
      height: 20px;
      font-size: 12px;
      float: right;
      color:#a6a6a6;
    }
    .add-admin-icon{
      background: url('~assets/img/buyShop/add-admin-icon.png') no-repeat;
      background-size: 90px 24px;
    }
    .add-clerk-icon{
      background: url('~assets/img/buyShop/add-clerk-icon.png') no-repeat;
      background-size: 90px 24px;
    }
  }
}
</style>
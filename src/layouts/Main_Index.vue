<template>
  <div class="main-index" ref="main_index">
    <div ref="switch_skin" class="switch-skin">
      <img ref="skin_switch" @mouseout="swingOutImg" @mouseover="swingImg" class="skin-switch" src="static/img/skinpeeler.png"
      />
      <ul>
        <li :class="{active: skinIndex == index}" v-for="(item, index) in skinConf" :key="index" @click="switchSkin(item, index)">
          <img :src="item.url" />
          <span>{{item.skinNmae}}</span>
        </li>
      </ul>
    </div>
    <data-title-template :dataType="dataType" :shopId="shopId">
    </data-title-template>

    <div class="row-2" ref="row_2" v-loading="Stayloading">
      <div class="peding">
        <h2>
          <span class="iconfont icon-gongzuo"></span>待处理
          <span>
            <i> {{untreatedNum}} </i>条</span>
        </h2>
        <ul class="scroll_bar">
          <div>
            <li v-for="(item, index) in untreated" :key="index" @click="goUnder(item)">
              <span class="list-icon" :class="{
                        color11: item.orderStatus == '待审核', 
                        color22: item.orderStatus == '已收货',
                        color77: item.orderStatus == '已收银',
                        color99: item.orderStatus == '待收货',
                        color10: item.orderStatus == '待发货',
                        color66: item.orderStatus == '待收银',
                        color33: item.orderStatus == '已审核',
                        color44: item.orderStatus == '未收货', 
                        color55: item.orderStatus == '审核中',
                        color88: item.orderStatus == '锁定',
                        color12: item.orderStatus == '待锁定'}"></span>
              <span class="list-num">{{item.orderNum}}</span>
              <span class="list-card1" :class="{ 
                        color1: item.orderStatus == '待审核', 
                        color2: item.orderStatus == '已收货',
                        color7: item.orderStatus == '已收银',
                        color6: item.orderStatus == '待收银',
                        color3: item.orderStatus == '已审核', 
                        color4: item.orderStatus == '未收货', 
                        color5: item.orderStatus == '审核中',
                        color8: item.orderStatus == '锁定',
                        color9: item.orderStatus == '待收货',
                        color0: item.orderStatus == '待发货',
                        color01: item.orderStatus == '待锁定'}">
                {{item.orderStatus =='待发货'?'未发货':item.orderStatus}}</span>
              <span class="list-card2">{{item.orderType}}</span>
              <span class="list-name">{{item.makeUserName}}</span>
              <span class="list-time">{{item.createTime}}</span>
            </li>
          </div>

        </ul>
      </div>
    </div>
    <div class="row-3">
      <sell-chart :dataType="dataType" :shopId="shopId">
      </sell-chart>
      <sales-chart :dataType="dataType" :shopId="shopId">
      </sales-chart>
      <div class="notice row3-block">
        <h3>公告列表
          <span @click="goNotict">更多</span>
        </h3>
        <ul class="notice-list">
          <div>
            <li v-for="(item, index) in noticeList" v-if="item.noticeType == 1" :key="index">
              <div class="notice-title" @click="goNotict">
                <span class="iconfont icon-gonggao"></span>{{item.title}}</div>
              <div class="notice-main">
                <div class="left">
                  <span>{{item.createUserName}}</span>
                  <span>{{item.content}}</span>
                </div>
                <span class="notice-time">{{item.createTime}}</span>
              </div>
            </li>
          </div>
        </ul>
        <div class="space" v-if="noticeList.length == 0">
          <img src="./../../static/img/space.png">
        </div>
      </div>
    </div>
    <div class="row-4" v-if="shopList.length > 1">
      <el-dropdown class="selected_dropdown">
        <span class="el-dropdown-link">
          {{currentShop.shopName}}
          <i class="iconfont icon-shuaxin" :class="isRefresh ?'refresh':''" @click="refresh(currentShop)"></i>
        </span>

        <el-dropdown-menu slot="dropdown" class="layout-drop-item shopManage">
          <el-dropdown-item v-for="item in shopList" v-if="item.shopName !=''" @click.native="switchShop(item)">
            {{item.shopName}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import {
    seekGetUserInfo,
    seekPendingOrder,
    seekNoticeList
  } from '../../src/Api/commonality/seek'
  import DataTitleTemplate from './main/reportDataTemplate'
  import SellChart from './main/charts/sellChart'
  import SalesChart from './main/charts/salesChart'
  let skinConfig = require('./skinConfig')
  export default {
    data() {
      return {
        dataNum1: 7, // 统计天数
        dataNum2: 7, // 走势天数
        userInfoData: [],
        skinIndex: '0',
        dataType: '', // 用户权限、数据 
        untreated: [], // 未处理单据
        untreatedNum: '', // 未处理单据总数
        Stayloading: true, //待处理订单loading
        noticeList: [], // 公告列表
        shopList: [],
        shopId: '',
        isRefresh: false,
        currentShop: {
          shopName: '',
          shopId: ''
        }, //当前的店铺
        roleTypeList: []
      }
    },
    components: {
      DataTitleTemplate,
      SellChart,
      SalesChart
    },
    created() {
      this.userRoleList()
      this.pendingOrder() // 待处理单据
      this.getNoticeList() // 公告列表
      this.skinConf = skinConfig.skinList
    },
    mounted() {
      let _self = this
      let body = document.getElementById('body')
      let aShield = document.getElementsByClassName('skin-shield')
      $(".scroll_bar").mCustomScrollbar({
        theme: "minimal-dark",
        axis: 'y',
        mouseWheel: {
          scrollAmount: 200,
          preventDefault: false,
          normalizeDelta: false
        },
      });
      $(".notice-list").mCustomScrollbar({
        theme: "minimal-dark",
        axis: 'y',
        mouseWheel: {
          scrollAmount: 200,
          preventDefault: false,
          normalizeDelta: false
        },
      });
      if (localStorage.getItem('bgUrl')) {
        let obj = JSON.parse(localStorage.getItem('bgUrl'))
        console.log(obj)
        body.style.background = obj.url
        this.skinIndex = obj.index
        if (obj.flag == 'custom') {
          $('#body').addClass('body-shield')
        } else if (obj.flag == 'static') {
          $('#body').removeClass('body-shield')
        }

      } else {
        this.skinConf.forEach((currentValue, index) => {
          if (currentValue.skinNmae == '默认') {
            this.switchSkin(currentValue, index)
          }
        })
      }
      // this.$refs.skin_switch.className= 'skin-switch animated swing' 
      // setTimeout(() => {
      //   this.$refs.skin_switch.className= 'skin-switch swing'
      // }, 500)
    },
    methods: {
      swingImg() {
        // console.log(111)
        this.$refs.skin_switch.className = 'skin-switch animated swing'
      },
      swingOutImg() {
        this.$refs.skin_switch.className = 'skin-switch'
      },
      switchSkin(item, index) {
        this.skinIndex = index
        body.style.background = item.bgUrl
        localStorage.setItem('bgUrl', JSON.stringify({
          url: item.bgUrl,
          flag: item.flag,
          index: index
        }))
        if (item.flag == 'custom') {
          $('#body').addClass('body-shield')
        } else if (item.flag == 'static') {
          $('#body').removeClass('body-shield')
        }
      },
      //刷新当前店铺
      refresh(item) {
        this.isRefresh = true;
        setTimeout(() => {
          this.isRefresh = false;
        }, 150)
        this.switchShop(item)
      },

      //店铺店长切换店铺数据
      switchShop(item) {
        this.Stayloading = true
        this.shopId = item.shopId
        this.pendingOrder()
        this.getNoticeList()
        this.currentShop = item
      },
      goNotict() {
        this.$router.push({
          path: "/notice"
        })
      },

      // 公告列表
      getNoticeList() {
        this.roleTypeList = []
        let options = {
          page: 1,
          pageSize: 10,
        }
        seekNoticeList(options).then((res) => {
          this.noticeList = res.data.data.dataList
          console.log(res)
          for (let i = 0; i < this.noticeList.length; i++) {
            if (this.noticeList[i].createTime) {
              let year = this.noticeList[i].createTime.toString().substring(0, 4)
              let month = this.noticeList[i].createTime.toString().substring(4, 6)
              let data = this.noticeList[i].createTime.toString().substring(6, 8)
              let hour = this.noticeList[i].createTime.toString().substring(8, 10)
              let time = this.noticeList[i].createTime.toString().substring(10, 12)
              this.noticeList[i].createTime = year + "-" + month + "-" + data + " " + hour + ":" + time
            }

          }
        }, (res) => {
          console.log(res)
        })
      },

      //待处理单据
      pendingOrder() {
        seekPendingOrder().then((res) => {
          console.log(res)
          setTimeout(() => {
            this.untreatedNum = res.data.data.totalNum
            this.untreated = res.data.data.dataList
            this.Stayloading = false
          }, 100)
        }, (res) => {
          console.log(res)
        })
      },
      goUnder(item) { // 去到单据详情页面
        switch (item.orderType) {
          case '入库':
            this.$router.push({
              path: '/work/storage/detail',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
          case '退库':
            this.$router.push({
              path: '/work/storageReturn/NewStorageReturn',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
          case '调库':
            this.$router.push({
              path: '/work/transferStorage/newTransferStorage',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
          case '调柜':
            this.$router.push({
              path: '/work/transferCabinet/newTransferCabinet',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
          case '修改':
            this.$router.push({
              path: '/work/amend/index',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
          case '发货':
            this.$router.push({
              path: '/work/sipping/newSipping',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
          case '退货':
            this.$router.push({
              path: '/work/salesReturn/newSalesReturn',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
          case '销售':
            this.$router.push({
              path: '/work/sell/sellReceiptsList',
              query: {
                orderNumber: item.orderNum
              }
            })
            break;
        }
      },

      // 用户角色列表
      userRoleList() {
        seekGetUserInfo({
          userId: sessionStorage.getItem('id')
        }).then((res) => {
          console.log(res)
          if (res.body.state) {
            if (res.data.data) {
              res.data.data.roleList.forEach((item, i) => {
                //console.log(item.role)
                this.roleTypeList.push(Number(item.role))
                if (item.role == 5 || item.role == 4) {
                  this.shopList.push(item)
                }
                // console.log(item)
                //   this.dataType = 2 //店长
                // if( this.shopId =='' ){
                //     this.shopId = item.shopId
                // }

              })
              //  console.log(this.shopList)
              //
              console.log(Math.min.apply(null, this.roleTypeList))
              if (Math.min.apply(null, this.roleTypeList) == 5) {
                this.dataType = 3 //店员
              } else if (Math.min.apply(null, this.roleTypeList) == 4) {
                this.dataType = 2 //店长
              } else {
                this.dataType = 1 //全公司
              }
              if (this.dataType != 1) {
                res.data.data.roleList.forEach((item, i) => {
                  if (this.shopId == '') {
                    this.shopId = item.shopId
                  }
                })
              }
              console.log(this.dataType)
              this.currentShop = this.shopList.length > 0 ? this.shopList[0] : this.currentShop
            } else {
              // this.$message({
              //   type: 'warning',
              //   message: res.body.msg
              // })
            }
          } else {
            this.$message({
              type: 'error',
              message: res.body.msg
            })
          }
        }, (res) => {
          console.log(res)
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .main-index {
    width: 1250px;
    height: 790px;
    margin: 0 auto; //margin-top: 70px;
    padding-top: 70px;
    .switch-skin {
      position: absolute;
      top: -3px;
      right: 150px;
      .skin-switch {

        cursor: pointer;
      }
      ul {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        width: 160px;
        height: 150px;
        background: #fff;
        transition: all .3s ease;
        left: -53px;
        top: 42px;
        z-index: 3;
        border-radius: 4px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        li {
          width: 100%;
          height: 50px;
          padding-top: 8px;
          padding-left: 8px;
          img {
            width: 60px;
            height: 34px;
            float: left;
            margin-right: 27px;
            border-radius: 4px;
          }
          span {
            float: left;
            display: block;
            font-size: 14px;
            color: #333;
            line-height: 34px;
          }
        }
        li:hover {
          background: #f6f7f8;
          span {
            color: #2993f8;
          }
        }
        li.active {
          span {
            color: #2993f8;
          }
          img {
            border: 2px solid #2993f8;
          }
        }
      }
    }
    .switch-skin:hover {
      ul {
        opacity: 1;
        visibility: visible;
      }
    }
    .row-2 {
      height: 270px;
      width: 100%;
      margin-bottom: 30px;
      .peding {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 100%;
        height: 270px;
        box-sizing: border-box;
        padding: 15px 0px 15px 22px;
        h2 {
          height: 30px;
          font-size: 16px;
          color: #333;
          font-weight: normal;
          line-height: 30px;
          margin-bottom: 15px;
          padding-right: 20px;
          span {
            color: #999;
            font-size: 14px;
            float: right;
            font-weight: normal;
            i {
              color: #333;
              font-style: normal;
            }
          }
          .iconfont {
            color: #73b7f8;
            float: left;
            font-size: 26px;
            margin-right: 16px;
          }
        }
        ul {
          width: 100%; //overflow-y:auto;
          height: 180px;
          li {
            height: 36px;
            line-height: 36px;
            padding-right: 30px;
            transition: all .3s;
            cursor: pointer;
            &:hover {
              background-color: rgba(0, 0, 0, 0.025)
            }
            span {
              display: block;
              float: left;
              height: 100%;
            }
            .color1 {
              background: #ffba42; // 待审核
              color: #fff;
            }
            .color2 {
              background: #ec625f; // 已收货
              color: #fff;
            }
            .color3 {
              background: #646ecb; // 已审核
              color: #fff;
            }
            .color4 {
              background: #b793e6; // 待收货
              color: #fff;
            }
            .color5 {
              background: #93b0e6; // 审核中
              color: #fff;
            }
            .color6 {
              background: #5594b8; // 待收银
              color: #fff;
            }
            .color7 {
              background: #646ecb; // 已收银
              color: #fff;
            }
            .color8 {
              background: #fd9b67; // 锁定
              color: #fff;
            }
            .color9 {
              background: #b793e6; // 锁定
              color: #fff;
            }
            .color0 {
              background: #ffba42; // 锁定
              color: #fff;
            }
            .color01 {
              background: #ffba42; // 锁定
              color: #fff;
            }

            .color11 {
              background: #ffba42; // 待审核
            }
            .color22 {
              background: #ec625f; // 已收货
            }
            .color33 {
              background: #646ecb; // 已审核
            }
            .color44 {
              background: #b793e6; // 待收货
            }
            .color55 {
              background: #93b0e6; // 审核中
            }

            .color66 {
              background: #5594b8; // 待收银
            }

            .color77 {
              background: #646ecb; // 已收银
            }
            .color88 {
              background: #fd9b67; // 锁定
              color: #fff;
            }
            .color99 {
              background: #b793e6; // 待收货
            }
            .color10 {
              background: #ffba42; // 待发货
            }
            .color12 {
              background: #ffba42; // 待发货
            }

            .list-icon {
              width: 8px;
              height: 8px;
              margin: 14px 0 0 12px;
              border-radius: 100%;
            }
            .list-num {
              color: #333;
              font-size: 14px;
              width: 179px;
              box-sizing: border-box;
              padding-left: 26px;
            }
            .list-card1 {
              width: 54px;
              height: 22px;
              margin-right: 36px;
              font-size: 12px;
              border-radius: 2px;
              text-align: center;
              line-height: 22px;
              margin-top: 7px;
            }
            .list-card2 {
              width: 54px;
              height: 22px;
              margin-right: 560px;
              background: #eee;
              color: #999;
              font-size: 12px;
              border-radius: 2px;
              text-align: center;
              line-height: 22px;
              margin-top: 7px;
            }
            .list-name {
              width: 140px;
              font-size: 14px;
              color: #333;
            }
            .list-time {
              font-size: 14px;
              color: #999;
              float: right;
              min-width: 120px;
              padding-right: 20px;
              text-align: right;
            }
          }
        }
      }
    }
    .row-3 {
      height: 280px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .row3-block {
        width: 400px;
        height: 280px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 16px 0 16px 0;
        h3 {
          font-size: 16px;
          color: #333;
          font-weight: normal;
          margin-bottom: 20px;
          padding: 0 20px;
          line-height: 20px;
          span {
            float: right;
            color: #999;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              color: #2993f8;
            }
            .iconfont {
              color: #56aaf9;
              margin-left: 5px;
              cursor: pointer;
            }
          }
        }
        #count-chart {
          width: 358px;
          height: 200px;
        }
        #trend-chart {
          width: 358px;
          height: 200px;
        }
      }
      .notice {
        position: relative;
        ul {
          width: 100%;
          height: 200px;
          overflow-y: auto;
          li {
            height: 70px; //border-bottom: 1px solid #f1f1f1;
            padding: 12px 25px 0 22px;
            position: relative;
            transition: all .3s;
            &:after {
              content: '';
              border-bottom: 1px solid #f1f1f1;
              position: absolute;
              bottom: 0;
              right: 30px;
              width: 340px;
            }
            &:hover {
              background-color: #f7f7f7;
            }
            .notice-title {
              font-size: 14px;
              color: #333;
              margin-bottom: 8px;
              cursor: pointer;
              &:hover {
                color: #2993f8;
              }
              .iconfont {
                color: #2993f8;
                font-size: 14px;
                margin-right: 9px;
              }
            }
            .notice-main {
              font-size: 12px;
              color: #999;
              .left {
                width: 250px;
                float: left;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              span {
                padding: 0 22px;
              }
              span:nth-child(1) {
                border-right: 1px solid #d6d6d6;
              }
              span:nth-child(2) {
                color: #333;
                padding-right: 0;
              }
              .notice-time {
                float: right;
                padding: 0;
                padding-right: 5px;
              }
            }
          }
        }
        .space {
          width: 100%;
          height: 200px;
          overflow: hidden;
          position: absolute;
          top: 60px;
          left: 0;
          img {
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
    .row-4 {
      padding-top: 25px;
      height: 85px;
      float: right;

      .selected_dropdown {
        width: 190px;
        height: 32px;
        background: #fff;
        max-width: none;
        border-radius: 40px;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        >.el-dropdown-link {
          display: block;
          height: 32px;
          line-height: 32px;
          width: 100%;
          position: relative;
          text-align: left;
          padding: 0 40px 0 20px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 190px;
          max-width: none;
          color: #666;
          &:hover {
            color: #2993f8;
          }
          >.iconfont {
            color: #999;
            position: absolute;
            right: 15px;
            top: 1px;
            font-size: 13px;
            display: block;

            &.refresh {
              transition: all .3s;
              transform: rotate(360deg);
            }
          }
        }

      }

    }
  }

</style>

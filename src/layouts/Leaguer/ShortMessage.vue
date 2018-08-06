<template>
	<div class="shortMessage-wrap">
    <div class="top-tit">
      <div class="tit-left">
        <i class="iconfont icon-huiyuan"></i>
        <!-- <span>会员管理</span>
        <span>></span> -->
        <span>短信</span>
      </div>
      <div class="tit-right">
        <span style="font-size: 14px; color:#666; font-weight: bold;" v-if="shopListByCo.length == 1">{{shopListByCo[0].shopName}}</span>
        <DropDownMenu
        v-else
        :titleName="shopName == '' ? (shopListByCo? shopListByCo[0].shopName : ''): '店铺列表'"
        dataType="店铺"
        :propList="shopListByCo"
        :isClear="false"
        @dropReturn="dropReturn"
        ></DropDownMenu>
        <DropDownMenu
        :titleName="shopManager == '' ? shopListByCo[0].shopManager : '发送人列表'"
        dataType="发送人"
        :propList="shopUserList"
        @clearInfo="clearInfo"
        @dropReturn="dropReturnlast"
        ></DropDownMenu>
        <div class="batch-time-wrap">
          <div class="date-w81">
              <el-date-picker
                  format
                  v-model="startTime"
                  type="date"
                  placeholder="选择日期"
                  @change="dateChange"
              >
              </el-date-picker>
          </div>
          <span>至</span>
          <div class="date-w81">
              <el-date-picker
                  v-model="endTime"
                  type="date"
                  placeholder="选择日期"
                  @change="dateChange1"
              >
              </el-date-picker>
          </div>
      </div>
        <!-- <DropDownMenu></DropDownMenu> -->
        <!-- <span class="tolast" @click.stop="goback">返回上一级</span> -->
      </div>
    </div>
    <div class="claerfix"></div>
    <div class="content">
      <div class="top">
        <i class="iconfont icon-liebiao"></i>
        <span>短信列表</span>
      </div>
      <ul class="scrolltem">
        <div class="scroll">
          <li v-for="(item, index) in dataList" :key="index">
            <!-- 发送中 -->
            <!-- <span class="imgbox" v-if="item.failReason == '0'"></span>
            <span class="imgbox" v-if="item.failReason == '0'"></span> -->
            <span class="imgbox" v-if="item.type == 2&&item.failReason == '0' || item.type == 2&&item.failReason == '1'"><img :src="item.operateLogo" alt=""></span>
            <span class="username" v-if="item.type == 2&&item.failReason == '0' || item.type == 2&&item.failReason == '1'">{{item.operateUserName}}</span>
            <span class="messageinfo" v-if="item.type == 2&&item.failReason == '0' || item.type == 2&&item.failReason == '1'">【短信内容】{{item.content}}</span>
            <span class="messagebr" v-if="item.type == 2&&item.failReason == '0' || item.type == 2&&item.failReason == '1'">--------</span>
            <span class="messageuser" v-if="item.type == 2&&item.failReason == '0' || item.type == 2&&item.failReason == '1'">接收人：{{item.receivedNum}}人</span>
            <span  class="messagetime" v-if="item.type == 2&&item.failReason == '0' || item.type == 2&&item.failReason == '1'">发送时间：{{_GetNYR(item.operateTime)}}</span>
            <span class="sent" v-if="item.type == 2&&item.failReason == '0' || item.type == 2&&item.failReason == '1'">发送成功</span>
            <!-- 成功 -->
            <span class="imgbox" v-if="item.type == 1"><img src="../../../static/img/message/6.png" alt=""></span>
            <span class="username" v-if="item.type == 1">充值信息</span>
            <span class="messagemoney" v-if="item.type == 1">充值金额：{{item.money}}<i>元</i></span>
            <span class="messagenum" v-if="item.type == 1">条数：{{item.payNum}}条</span>
            <span class="messagenum" v-if="item.type == 1">剩余条数：<i>{{item.surplusNum}}</i>条</span>
            <span class="messagepeo" v-if="item.type == 1">充值人：{{item.operateUserName}}</span>
            <span class="messagetime" v-if="item.type == 1">充值时间：{{_GetNYR(item.operateTime)}}</span>
            <span class="success" v-if="item.type == 1">成功</span>
            <!-- 发送失败 -->
            <span class="imgbox" v-if="item.type == 2&&item.failReason == '2' || item.type == 2&&item.failReason == '2'"><img src="../../../static/img/message/7.png" alt=""></span>
            <span class="username" v-if="item.type == 2&&item.failReason == '2' || item.type == 2&&item.failReason == '2'">发送失败</span>
            <span class="messageinfo" v-if="item.type == 2&&item.failReason == '2' || item.type == 2&&item.failReason == '2'">提示:{{item.content}}</span>
            <span class="messagepeo" v-if="item.type == 2&&item.failReason == '2' || item.type == 2&&item.failReason == '2'">返还条数：{{item.sendFails}}条</span>
            <span class="messagepeo" v-if="item.type == 2&&item.failReason == '2' || item.type == 2&&item.failReason == '2'">剩余条数：<i>{{item.surplusNum}}</i>条</span>
          </li>
        </div>
      </ul>
      <rightMast :shopId="shopId" :Data="Data" v-if="shopRole" :shopManageRole="shopManageRole"></rightMast>
    </div>
	</div>
</template>
<script>
import DropDownMenu from '../../components/template/DropDownMenu'
import {seekGetShopUserList, seekGetShopListByCo, seekGetSMSLog, seekGetSMSAccountInfo, seekGetUserInfo} from '../../Api/commonality/seek'
import {GetNYR} from 'assets/js/getTime'
import rightMast from './components/rightMast'
import {mapActions, mapGetters} from 'vuex'
import * as jurisdictions from 'Api/commonality/jurisdiction'
export default{
  components: {
    rightMast,
    DropDownMenu
  },
	data () {
		return {
      // show: false,
      dataList: [],
      pageSize: 12,
      shopName: '', // 店铺名称
      shopManager: '',//发送人
      userPositionInfo: '',
      shopUserList: [],
      shopListByCo: [],
      adminStartTime: '',
      adminEndTime: '',
      shopId: '',
      clerkId: '',
      startTime: '',
      endTime: '',
      Data: {
        messageNum: ''
      }
		}
	},
	created () {
    this.getUserInfo()
    // this.getSeekGetSMSAccountInfo()
    
    // console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', this.computedRole)
    
  },
  mounted () {
    eventBus.$on('operationgetSeekGetSMSLog', (parm) => {
      this.getSeekGetSMSLog()
      this.getSeekGetSMSAccountInfo()
      // alert(123)
    });
    // let _self = this
    // setTimeout(()=>{
    //   // console.log('你是不是傻', this.shopListByCo)
    //   this.shopId = this.shopListByCo[0].shopId
      
    // }, 500)
    $(".scrolltem").mCustomScrollbar({
        theme: "minimal-dark",
        axis: "y",
        callbacks:{
          onTotalScroll: function(){
            console.log(111)
            _self.pageSize += 12
            _self.getSeekGetSMSLog()
          }
        }
    });
    // if (this.shopRole == true) {
    //   this.show = true
    // }
  },
  computed: {
    ...mapGetters([
      "repositoryList", // 库位列表
      // "shopListByCo", // 店铺列表
      "productClass", // 产品类别
      "supplierListData", // 供应商
      // "userPositionInfo" // 职位信息
    ]),
    shopRole: function () { // 店员
      if (this.userPositionInfo) {
        return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
      }
    },
    computedRole: function () { // 公司
      if (this.userPositionInfo) {
        return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
      }
    },
    shopManRole: function () { // 店员
      if (this.userPositionInfo) {
        return jurisdictions.jurisdictionShopManRole(this.userPositionInfo.roleList)
      }
    },
    shopManageRole: function () { // 店长
      if (this.userPositionInfo) {
        return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
      }
    }
  },
	methods: {
    timeFormat (parm) {
        console.log(parm)
        let year = parm.substring(0, 4)
        let month = parm.substring(5, 7)
        let data = parm.substring(8, 10)
        return year + month + data + '000000'
    },
    getShopUserList () {
      let options = {
        shopId: this.shopId,
        page: 1,
        pageSize: 999
      }
      seekGetShopUserList(options).then((res) => {
        console.log(res)
        if (res.data.state == 200) {
          this.shopUserList = res.data.data.shopUserList
        } else {

        }
      }, (res) => {

      })
    },
    gtShopListByCo () { // 获取店铺列表
        let options = {
            page: 1,
            pageSize: 999
        }
        seekGetShopListByCo(options).then((res) => {
          console.log(res)
          this.shopListByCo = res.data.data.shopList
          this.shopId = res.data.data.shopList[0].shopId
          this.startTime = this.getDate(-((new Date()).getDate()-1),'start').format
          this.endTime = this.getDate(0,'end').format
          this.adminStartTime = this.timeFormat(this.startTime)
          this.adminEndTime = this.timeFormat(this.endTime)
          this.getShopUserList()
          this.getSeekGetSMSLog()
          this.getSeekGetSMSAccountInfo()
        }, (res) => {

        })
    },
    getUserInfo () {
        seekGetUserInfo({userId: sessionStorage.getItem('id')}).then((res) => {
            this.userPositionInfo = res.data.data
            this.gtShopListByCo()
        })
    },
    _GetNYR (parm) {
      return GetNYR(parm)
    },
    goback () {
      this.$router.go(-1)
      // window.history.go(-1)
    },
    clearInfo (val) {
      console.log(val)
    },
    dropReturn (val) {
      // console.log('大贱人', val)
      this.shopId = val.item.shopId
      // this.shopName = val.item.shopName
      this.getSeekGetSMSLog()
    },
    dropReturnlast (val) {
      // console.log('小贱人', val)
      this.clerkId = val.item.operateId
      // this.shopManager = val.item.shopManager
      this.getSeekGetSMSLog()
    },
    dateChange (val) {
        this.adminStartTime = this.timeFormat(val)
        this.getSeekGetSMSLog()
    },
    dateChange1 (val) {
        this.adminEndTime = this.timeFormat(val)
        this.getSeekGetSMSLog()
    },
    getDate( day, type  ){
        let _date = new Date()
        _date.setDate( _date.getDate() + day )
        //年
        let Year = _date.getFullYear()
        //月
        let month = this.formatDate(_date.getMonth()+1)
        //天
        let Day = this.formatDate(_date.getDate())
        //时
        let hours = this.formatDate(_date.getHours())
        //分
        let mins = this.formatDate(_date.getMinutes())
        //秒
        let seconds = this.formatDate(_date.getSeconds())

        let timestamp = Year + month +  Day

        let currentData = new Date()

        if( type == 'end' ){
            if( Year < currentData.getFullYear() ||
              month < currentData.getMonth()+1 ||
              Day < currentData.getDate()
            ){
              hours = '23'
              mins = seconds = '59'
            }
        }else if( type == 'start'){
          hours = mins = seconds = '00'
        }

        return {
            format : Year + '-' + month + '-' + Day  ,
            timestamp : timestamp,
            fullData : timestamp + hours + mins + seconds
        }
    },
    formatDate( d ){
        return d < 10 ? ('0' + d ) : d + ''
    },
    getSeekGetSMSLog () {
      let options = {
        shopId: this.shopId,
        clerkId: this.clerkId,
        page: 1,
        pageSize: this.pageSize
      }
      seekGetSMSLog(options).then(res => {
        console.log('1111111111111', res)
        this.dataList = res.data.data.dataList
      }, res => {
        this.$message('000000000000', res)
      })
    },
    getSeekGetSMSAccountInfo () {
      let option = {
        shopId: this.shopId
      }
      console.log(',,,,,,',this.shopId)
      seekGetSMSAccountInfo(option).then(res => {
        console.log('个人信息',res)
        this.Data.messageNum = res.data.data.smsCount
        console.log('个人信息1',this.Data.messageNum)
      }, res => {
        this.$message(res.data.msg)
      })
    }
	}
}
</script>
<style scoped lang="scss">
.shortMessage-wrap{
	width: 1270px;
	margin: 0 auto;
  padding-top: 30px;
  // padding-left: 220px;
  .top-tit{
    position: relative;
    .tit-left{
      position: absolute;
      left: 0;
      .icon-huiyuan{
        color: #2993f8;
        font-size: 20px;
        margin-right: 12px;
      }
      span{
        &:nth-of-type(1),&:nth-of-type(2){
          font-weight: bold;
          margin-right: 12px;
          // margin-left: 12px;
          color: #2993f8;
        }
      }
    }
    .tit-right{
      position: absolute;
      right: 0;
      .dropDown-wrap{
        margin-right: 30px;
      }
      .batch-time-wrap{
        display: inline-block;
        background-color: #fff;
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        margin-right: 16px;
        // width: 188px;
      }
      .tolast{
        font-weight: bold;
        display: inline-block;
        background-color: #2993f8;
        color: #fff;
        line-height: 30px;
        width: 90px;
        text-align: center;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
  .claerfix{
    height: 30px;
  }
  .content{
    box-shadow: 0px 0px 18px #e0dfdf;
    padding-left: 0;
    margin-top: 20px;
    height: 740px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .right-Mast{
      position: absolute;
      right: -66px;
      bottom: 0;
      border: 1px solid #eee;
    }
    .top{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding-left: 18px;
      color: #000;
      background-color: #fff;
      line-height: 50px;
      .icon-liebiao{
        margin-right: 14px;
        color: #2993f8;
        position: absolute;
        top: 19px;
      }
      >span{
        margin-left: 34px;
      }
    }
    >ul{
      // &.scroll{
      //   height: 550px;
      // }
      height: 640px;
      li:hover{
        &:nth-of-type(odd){
          background-color: rgba($color: #000, $alpha: 0.1);
        }
        background-color: rgba($color: #000, $alpha: 0.1);
      }
      li{
        // &:nth-of-type(even){
        //   &:hover{
        //     background-color: rgba($color: #000, $alpha: 0.3);
        //   }
        // }
        position: relative;
        height: 50px;
        line-height: 50px;
        padding-left: 50px;
        background-color: #fff;
        font-size: 16px;
        &:nth-of-type(odd){
          background-color: #f4f4f4;
        }
        .imgbox{
          position: absolute;
          top: 50%;
          margin-top: -15px;
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          >img{
            width: 30px;
            height: 30px;
          }
          // background-color: #ccc;
        }
        .messagemoney{
          >i{
            font-style: normal;
            color: #999;
          }
        }
        .messagenum{
          margin-right: 30px;
          margin-left: 30px;
          >i{
            font-style: normal;
            color: #2993f8;
          }
        }
        .username{
          display: inline-block;
          width: 108px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          // width: 423px;
          line-height: 50px;
          vertical-align: middle;
          margin: {
            left:47px ;
            // right:59px ;
          }
        }
        .messagebr{
          color: #ccc;
          margin: {
            left: 8px;
            right: 8px;
          }
        }
        .messageuser{
          margin-right: 30px;
          color: #ccc;
        }
        .messagetime{
          color: #ccc;
        }
        .sent, .success{
          font-weight: bold;
          position: absolute;
          right: 30px;
          display: inline-block;
          width: 60px;
          line-height: 24px;
          text-align: center;
          background-color: #96d7ff;
          border-radius: 5px;
          top: 50%;
          margin-top: -12px;
          color: #fff;
          font-size: 12px;
        }
        .success{
          background-color: #ffba42;
        }
        .messagepeo{
          color: #ccc;
          margin-left: 30px;
          margin-right: 30px;
          >i{
            font-style: normal;
            color: #2993f8;
          }
        }
        .messageinfo{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          width: 423px;
          line-height: 50px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

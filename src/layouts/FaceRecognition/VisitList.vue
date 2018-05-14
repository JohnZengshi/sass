<template>
  <div class="visit-list-main">
    <div class="top-tit">

      <div class="tit-left">
        <i class="iconfont icon-lianxiren"></i>
        <span>用户来访列表</span>
      </div>

      <div class="tit-right">

        <DownMenu
          :titleInfo="currentShop.shopName ? currentShop.shopName : '无店铺'"
          :showList="shopListByCo"
          :noClear="true"
          @changeData="changeShopData"
        ></DownMenu>

        <div class="batch-time-wrap">
          <div class="date-w81-14">
            <el-date-picker
              format
              v-model="beginTime"
              type="date"
              placeholder="选择日期"
              @change="dateChange"
            >
            </el-date-picker>
          </div>
        </div>

      </div>
    </div>
    <div class="claerfix"></div>
    <div class="content">

      <div class="top">
        <i class="iconfont icon-liebiao"></i>
        <span>用户来访列表</span><span class="num-tit">(总数：<span>{{totalNum}}</span>)</span>
        <a v-if="shopId" class="save-btn" href="javascript: void(0)" @click="saveAddIntention">保存</a>
      </div>

      <VisitTable
        ref="visitTableSign"
        :showData="visitData"
        :shopId="shopId"
        @seekDetail="seekDetail"
        @_seekList="_seekList"
      ></VisitTable>

    </div>

    <!-- 顾客详情弹窗 -->
    <ClientDetail
      @relevanceMember="relevanceMember"
      @openEditReturn="openEditReturn"
      ref="clientDetailWrap"
      :currentSeekData="currentSeekData"
      :shopId="currentShop.shopId"
    ></ClientDetail>

    <!-- 会员详情 - 编辑弹窗 -->
    <editLeaguerDia
      v-if="editLeaguer"
      :editLeaguer="editLeaguer"
      :shopId="currentShop.shopId"
      :shopManageRole="shopManageRole"
      :memberId="currentSeekData.memberId"
      @closeReturn="closeEditReturn"
    ></editLeaguerDia>

    <!-- 选择会员 -->
    <el-dialog :visible.sync="isChoseMember" top="12%" customClass="choseMemberDig" :close-on-click-modal="false">
      <ChoseMember
        :isAddIntention="true"
        :shopId="currentShop.shopId"
        :isChoseMember="isChoseMember"
        :isRadio="isRadio"
        :relevanceId="relevanceId"
        @closeChoMember="closeChoMember"
      ></ChoseMember>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {seekListVisitor} from 'Api/commonality/seek'
import DownMenu from 'base/menu/DownMenu'
import VisitTable from './base/VisitTable'
import * as jurisdictions from 'Api/commonality/jurisdiction'
// import editLeaguerDia from 'src/layouts/Leaguer/components/editLeaguerDia'
import editLeaguerDia from './../Leaguer/components/editLeaguerDig.vue'
import ClientDetail from './../Leaguer/ClientTemplate/ClientDetail'
import ChoseMember from './../Leaguer/components/choseMember'
var moment = require('moment');
export default{
  components: {
    DownMenu,
    VisitTable,
    editLeaguerDia,
    ClientDetail,
    ChoseMember
  },
  data () {
    return {
      isRadio: false,
      isChoseMember: false, // 通过会员添加意向弹窗
      relevanceId: '', // 当前顾客详情id
      editLeaguer: false,
      currentSeekData: {}, // 当前查看的数据
      shopId: this.$route.query.shopId,
      beginTime: new Date(),
      adminStartTime: '',
      currentShop: {}, // 当前店铺
      page: 1,
      totalNum: '', // 总条数
      visitData: []
    }
  },
  mounted () {
    if (this.shopListByCo[0]) {
      this.changeShopData(this.shopListByCo[0])
    }
    eventBus.$on('new-client-come-on', () => {
      this.newClient()
    })
  },
  watch: {
    '$route' (to, from) {
      this.shopId = ''
      this._seekList()
    },
    'shopListByCo' () {
      this.changeShopData(this.shopListByCo[0])
    }
  },
  computed: {
    ...mapGetters([
      "shopListByCo", // 店铺列表
      "userPositionInfo" // 职位信息
    ]),
    shopManageRole: function () { // 店长
      if (this.userPositionInfo) {
          return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.seekDetail({
        id: this.$route.query.id
      })
    }
  },
  methods: {
    closeChoMember () {
      this.isRadio = false
      this.isChoseMember = false
    },
    // establishWebSocket (parm) {
    //   let _self = this;
    //   let webSocket = new WebSocket(`ws://uat.yunzhubao.com:8080/yunzhubao/ws/facepass/{${parm}}`);
    //   webSocket.onopen = function(evt) {
    //     console.log(' websocket 打开');
    //   }
    //   webSocket.onmessage = function(evt) {
    //     let hintTit = '有新访客到店，请及时接待'
    //     let datas = JSON.parse(evt.data)
    //     if (datas.vipFlag == 1) {
    //       switch (datas.grade) {
    //         case '1':
    //           hintTit = '普通会员'
    //           break
    //         case '2':
    //           hintTit = '中级会员'
    //           break
    //         case '3':
    //           hintTit = '高级会员'
    //           break
    //       }
    //       hintTit = hintTit + datas.userName + '到店，请及时接待'
    //     }
    //     const h = _self.$createElement;
    //     _self.$notify({
    //       title: '新消息',
    //       message: hintTit,
    //       type: 'success'
    //     })
    //   }
    // },
    seekDetail (parm) {
      this.currentSeekData = parm
      this.$refs.clientDetailWrap.open()
    },
    saveAddIntention () {
      this.$refs.visitTableSign.save()
    },
    closeEditReturn () {
      this.editLeaguer = false
    },
    relevanceMember (parm) {
      this.isRadio = true
      this.isChoseMember = true
      this.relevanceId = parm
    },
    openEditReturn () {
      this.editLeaguer = true
    },
    changeShopData (item) {
      eventBus.$emit('cut-web-socket', item.shopId)
      this.restore()
      this.currentShop = item
      this._seekList()
     // this.establishWebSocket(item.shopId)
    },
    newClient () {
      let options = {
        beginTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD')),
        endTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD'), '235959'),
        shopId: this.currentShop.shopId,
        intentionFlag: this.$route.query.shopId ? '0' : '',
        page: 1,
        pageSize: 1
      }
      seekListVisitor(options)
        .then(res => {
          if (res.data.state == 200) {
            this.totalNum = res.data.data.totalNum
            this.visitData.unshift(...res.data.data.dataList)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    _seekList (parm) {
      if (this.visitData.length == this.totalNum && this.visitData.length > 0) {
        return
      }
      let options = {
        // beginTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD')),
        // endTime: this.timeFormat(moment(this.beginTime.setTime(this.beginTime.getTime() - 3600 * 1000 * 24)).format('YYYY-MM-DD')),
        beginTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD')),
        endTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD'), '235959'),
        shopId: this.currentShop.shopId,
        intentionFlag: this.$route.query.shopId ? '0' : '',
        page: this.page,
        pageSize: 60
      }
      this.page += 1
      seekListVisitor(options)
        .then(res => {
          if (res.data.state == 200) {
              this.totalNum = res.data.data.totalNum
              this.visitData.push(...res.data.data.dataList)
          } else {
              this.$message({
                  message: res.data.msg,
                  type: 'warning'
              });
          }
          // this.visitData = res.dataList
        })
    },
    timeFormat (parm, timeType = '000000') {
        let year = parm.substring(0, 4)
        let month = parm.substring(5, 7)
        let data = parm.substring(8, 10)
        return year + month + data + timeType
    },
    restore () {
      this.visitData = []
      this.totalNum = ''
      this.page = 1
    },
    dateChange (val) {
      this.restore()
      this.adminStartTime = this.timeFormat(val)
      this._seekList()
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
            format : Year + '-' + month + '-' + Day ,
            timestamp : timestamp,
            fullData : timestamp + hours + mins + seconds
        }
    },
    formatDate( d ){
       return d < 10 ? ('0' + d ) : d + ''
    }
  }
}
</script>
<style scoped lang="scss">
.visit-list-main{
  padding-top: 30px;
  // padding-left: 220px;
  .top-tit{
    position: relative;
    .tit-left{
      position: absolute;
      left: 0;
      i{
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
        margin-left: 16px;
        font-size: 14px;
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
    box-shadow: 0px 0px 18px #ddd;
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
      overflow: hidden;
      .icon-liebiao{
        margin-right: 14px;
        color: #2993f8;
      }
      .save-btn{
        cursor: pointer;
        width: 90px;
        height: 28px;
        float: right;
        margin-right: 10px;
        background:#2993f8;
        color:#fff;
        border-radius: 4px;
        text-align: center;
        line-height: 28px;
        font-size: 12px;
        font-weight: bold;
        margin-top: 10px;
        transition: all .3s;
        &:hover{
            background: #057aea;
        }
      }
      .num-tit{
        color: #999;
        margin-left: 6px;
        font-size: 14px;
        >span{
          color: red;
        }
      }
    }
  }
}
</style>

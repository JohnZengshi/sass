<template>
  <transition name="tp-ani">
    <div class="intention-client-main">
      <div class="top-tit">
        <div class="tit-left">
          <i class="iconfont icon-lianxiren"></i>
          <span>意向顾客列表</span>
          <i class="iconfont icon-unie633 attention-icon" @click="openAttention"></i>
        </div>
        <div class="tit-right">

          <DownMenu
            :titleInfo="currentShop.shopName ? currentShop.shopName : '全部'"
            :showList="shopListByCo"
            :noClear="true"
            @changeData="changeShopData"
            @clearInfo="clearShopData"
          ></DownMenu>

          <DownMenu
            :titleInfo="currentUser.name ? currentUser.name : '全部用户'"
            :showList="userList"
            :noClear="true"
            @changeData="changeUserData"
            @clearInfo="clearUserData"
          ></DownMenu>
          <span class="tolast" @click.stop="addClient">+ 意向顾客</span>
        </div>
      </div>
      <div class="claerfix"></div>
      <div class="content">
        <div class="top">
          <i class="iconfont icon-liebiao"></i>
          <span>意向顾客</span>
        </div>

        <!--表头-->
        <data-grid-header
          :detailDataGridColumn="detailDataGridColumn"
          @setFilter="setFilter"
        ></data-grid-header>

        <!--内容-->
        <data-grid-body
          :detailDataGridColumn="detailDataGridColumn"
          :showData="clientList"
          :tableLoading="tableLoading"
          @seekDetail="seekDetail"
          @openEditReturn="openEditReturn"
        ></data-grid-body>

      </div>
      <!-- 顾客详情弹窗 -->
      <ClientDetail
        @relevanceMember="relevanceMember"
        @openEditReturn="openEditReturn"
        @successOperationIntention="seekList"
        ref="clientDetailWrap"
        :relevanceId="relevanceId"
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
      <attention ref="attentionWrap"></attention>
      <!-- 选着添加意向列表弹窗 -->
      <changePopup ref="changePopupSign" :currentShop="currentShop" @openChoseMember="openChoseMember"></changePopup>
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
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {seekListIntention} from 'Api/commonality/seek'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DataGridHeader from './tableTemplate/dataGridHeader'
import DataGridBody from './tableTemplate/DataGridBody'
import {GetNYR} from 'assets/js/getTime'
import DownMenu from 'base/menu/DownMenu'
import ChoseMember from './components/choseMember'
import ClientDetail from './ClientTemplate/ClientDetail'
import attention from './ClientTemplate/Attention'
import changePopup from './ClientTemplate/ChangePopup'
import editLeaguerDia from './components/editLeaguerDig'
export default{
  components: {
    DownMenu,
    ClientDetail,
    DataGridBody,
    editLeaguerDia,
    DataGridHeader,
    attention,
    changePopup,
    ChoseMember
  },
  data () {
    return {
      // show: false,
      tableLoading: true,
      isRadio: false,
      isChoseMember: false, // 通过会员添加意向弹窗
      editLeaguer: false,
      pageSize: 12,
      adminStartTime: '',
      adminEndTime: '',
      startTime: '',
      endTime: '',
      userList: [
        {
          userType: 1,
          name: '全部用户'
        },
        {
          userType: 2,
          name: '会员用户'
        },
        {
          userType: 3,
          name: '普通用户'
        }
      ],
      currentUser: {
        userType: 1,
        name: '全部用户'
      },
      currentShop: {}, // 当前店铺
      detailDataGridColumn: [
        {
          text: '排序',
          width:'70' //单元格宽
        },
        // {
        //   text: '会员编号',
        //   width:'84' //单元格宽
        // },
        // {
        //   text: '人员ID',
        //   width:'92' //单元格宽
        // },
        {
          text: '图片',
          width:'96' //单元格宽
        },
        {
          text: '意向类型',
          width:'92' //单元格宽
        },
        {
          text: '姓名',
          width:'92' //单元格宽
        },
        {
          text: '手机号',
          width:'96' //单元格宽
        },
        {
          text: '性别',
          width:'82' //单元格宽
        },
        {
          text: '年龄',
          width:'82' //单元格宽
        },
        {
          text: '消费总额',
          sort: '',
          width:'92' //单元格宽
        },
        {
          text: '上次接待人',
          width:'92' //单元格宽
        },
        {
          text: '最近到店时间',
          sort: '',
          width:'120' //单元格宽
        },
        {
          text: '加入时间',
          sort: '',
          width:'120' //单元格宽
        },
        {
          text: '访店总数',
          sort: '',
          width:'96' //单元格宽
        },
        {
          text: '操作',
          width:'96' //单元格宽
        }
      ],
      clientList: [],
      orderBy: '',
      currentSeekData: {}, // 当前查看的数据
      relevanceId: '', // 当前顾客详情id
      currentFilter: '' // 手动升降顺序
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
  mounted () {
    if (this.shopListByCo[0]) {
      this.changeShopData(this.shopListByCo[0])
    }
  },
  watch: {
    'shopListByCo' () {
      this.changeShopData(this.shopListByCo[0])
    }
  },
  // created () {
  //   this.seekList()
  // },
  methods: {
    setFilter (parm) {
      this.tableLoading = true
      this.currentFilter = parm
      this.seekList()
    },
    closeChoMember () {
      this.isRadio = false
      this.isChoseMember = false
      this.seekList()
    },
    openChoseMember () {
      this.isChoseMember = true
    },
    openAttention () {
      this.$refs.attentionWrap.open()
    },
    closeEditReturn () {
      this.editLeaguer = false
    },
    relevanceMember (parm) {
      this.isRadio = true
      this.isChoseMember = true
      this.relevanceId = parm
    },
    openEditReturn (parm) {
      if (parm) {
        this.currentSeekData = parm
      }
      this.editLeaguer = true
    },
    seekDetail (parm) {
      this.currentSeekData = parm
      this.$refs.clientDetailWrap.open()
    },
    changeUserData (item) {
      this.currentUser = item
      this.seekList()
    },
    changeShopData (item) {
      this.currentShop = item
      this.seekList()
    },
    clearShopData () {
      this.currentShop = {}
      this.seekList()
    },
    clearUserData () {
      this.currentUser = {}
      this.seekList()
    },
    /* --查询数据源-- */
    seekList () {
      let options = {
        shopId: this.currentShop.shopId,
        type: this.currentUser.userType,
        orderBy: this.orderBy,
        page: 1,
        pageSize: 9999
      }
      if (this.currentFilter) {
        options.sort = [this.currentFilter]
      }
      seekListIntention(options)
        .then(res => {
            setTimeout(() => {
                this.tableLoading = false
            }, 500)
            if (res.data.state == 200) {
              this.clientList = res.data.data.dataList
            } else {
                this.$message({
                    message: res.data.msg,
                    type: 'warning'
                });
            }
        })
      // console.log('查询意向列表参数', options)
      // this.clientList.push({
      //     vipNO: '789456',
      //     vipUserId: '789456',
      //     logoSrc: 'http://jzm-1252389350.cosgz.myqcloud.com/iconCompany/6367223702973651081513667965898.jpg',
      //     intentionType: '789456',
      //     name: '789456',
      //     phone: '789456',
      //     sex: '789456',
      //     ageGroup: '789456',
      //     totalConsume: '789456',
      //     lastReceiver: '789456',
      //     lastVisitTime: '20180302170630',
      //     joinTime: '20180302170630',
      //     totalVisitNum: '789456',
      //   })
    },
    timeFormat (parm) {
        console.log(parm)
        let year = parm.substring(0, 4)
        let month = parm.substring(5, 7)
        let data = parm.substring(8, 10)
        return year + month + data + '000000'
    },
    _GetNYR (parm) {
      return GetNYR(parm)
    },
    addClient () {
      this.$refs.changePopupSign.open()
      console.log('添加意向顾客')
    },
    dateChange (val) {
        this.adminStartTime = this.timeFormat(val)
    },
    dateChange1 (val) {
        this.adminEndTime = this.timeFormat(val)
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
    }
  }
}
</script>
<style scoped lang="scss">
.intention-client-main{
  width: 1270px;
  margin: 0 auto;
  padding-top: 30px;
  // padding-left: 220px;
  .top-tit{
    position: relative;
    .tit-left{
      position: absolute;
      width: 200px;
      left: 0;
      i{
        color: #2993f8;
        font-size: 20px;
        margin-right: 12px;
      }
      span{
        &:nth-of-type(1),&:nth-of-type(2){
          font-weight: bold;
          // margin-right: 12px;
          // margin-left: 12px;
          color: #2993f8;
        }
      }
      .attention-icon{
        font-size: 14px;
        cursor: pointer;
        color: rgb(253, 198, 83);
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
        cursor: pointer;
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
      overflow: hidden;
      .icon-liebiao{
        margin-right: 14px;
        color: #2993f8;
      }
    }
  }
}
</style>

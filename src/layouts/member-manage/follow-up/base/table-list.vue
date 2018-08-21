<!-- 会员列表 -->
<template>
  <transition name="tp-ani">
    <div class="RP_report_wrapper ui-page-max-width report_table_fixed dc-label-print-main">
      <div class="new-table-header-layout-main">
        
        <!-- 跟进图表 -->
        <follow-up-echarts v-if="headline == '我的跟进'" :shopId="shopId" :filterCondition="filterCondition" ref="followUpEchartsBox" @update="filterData"></follow-up-echarts>

        <div class="rp_gridState">
          <p class="side-nav"><i class="iconfont icon-liebiao"></i>{{headline}}:<span style="color: #2993f8;">{{totalNum}}</span></p>
          <sort-table v-if="headline == '我的跟进'" :sortList="sortList" @cancelSort="cancelSort"></sort-table>

          <!-- 我的跟进 -->
          <follow-up-header
            v-if="headline == '我的跟进'"
            :headline="headline"
            :shopId="shopId"
            @update="filterData"
          ></follow-up-header>

          <!-- 跟进管理 -->
          <follow-up-header-manage
            v-if="headline == '跟进管理'"
            :headline="headline"
            :shopId="shopId"
            @update="filterData"
          ></follow-up-header-manage>

        </div>
      </div>

      <div v-if="false" style="border: 2px solid red; height: 200px;">
        高级搜索
      </div>

      <div v-loading="loading" element-loading-text="数据查询中">
        <report-detail
          ref="reportDetailWrap"
          :dataGridStorage="dataGridStorage"
          :configData="configData"
          :className="'xj-report-table-container-img-small'"
          @lazyloadSend="lazyloadSend"
          @sortListAct="sortListAct"
          @delData="delData"
          @compileData="compileData"
          @change="changeMember"
        >
        </report-detail>
      </div>
    </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import find from 'lodash/find'
let configData = require('./../../config/config.js')
import {seekMemberFollowList, seekFollowAdministration} from 'Api/commonality/seek.js'
import {groupName} from 'Api/commonality/filter'

import {getFollowUpStatus, getFollowType, getMemberTypeList, getVisitAimList} from 'assets/js/analysis'
import {operateDeleteMemberId, operateDeleteFollowByNew} from 'Api/commonality/operate'
import sortTable from 'base/sort/sort-table'
import ReportDetail from 'base/newDataGrid/reportDetailTab'
import followUpHeader from './follow-up-header'
import followUpHeaderManage from './follow-up-header-manage'
import followUpEcharts from './follow-up-echarts'
import {combination} from 'assets/js/combination'
import {GetNYR} from 'assets/js/getTime'

export default {
  props: ['shopId', 'currentLocation', 'headline'],
  components: {
    ReportDetail,
    followUpHeader,
    followUpHeaderManage,
    followUpEcharts,
    sortTable
  },
  data() {
    return {
      // 会员
      totalNum: '',
      memberId: '',
      configData: configData.followUpConfing,
      filterCondition: {
          type: '2' // 我的跟进，默认是我的跟进
        // shopName: '',
        // shopId: '',
      },       

      loading: false,

      dataGridStorage: [],

      sortList: [],
      paging: {
        page: 1,
        pageSize: '30'
      },
    }
  },
  computed: {
    ...mapGetters([
      "userPositionInfo", // 职位信息
    ])
  },
  created () {
    if (this.headline == '跟进管理') {
      this.configData = configData.followUpManageConfig
    }
    this.filterData({shopId: this.$route.query.shopId, followPurpose: this.$route.query.followPurpose, init: true})
  },
  methods: {
    // 选择摸个会员
    changeMember (parm) {
      this.memberId = parm.memberId
      this.$emit('changeMember', parm)
    },

    delData(parm) {
      let opations = {
        followId: parm.data.followId,
        type: ''
      }
      if (this.headline == '我的跟进') {
        opations.type = 1
      } else if (this.headline == '跟进管理') {
        opations.type = 2
      }
      operateDeleteFollowByNew(opations)
        .then(res => {
          if (res.data.state == 200) {
            this.dataGridStorage.splice(parm.index, 1)
            this.totalNum -= 1  
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },
    _operateDeleteMemberId () {
      operateDeleteMemberId({memberId: parm.data.memberId})
      .then(res => {
        if (res.data.state == 200) {
          this.dataGridStorage.splice(parm.index, 1)
          this.totalNum -= 1  
        } else {
          this.$message({type: 'error',message: res.data.msg})
        }
      })
    },
    // 删除跟进管理
    _operateDeleteFollowByNew (parm) {
      operateDeleteFollowByNew({memberId: parm.data.memberId})
        .then(res => {
          if (res.data.state == 200) {
            this.dataGridStorage.splice(parm.index, 1)
            this.totalNum -= 1  
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },

    filterData(parm) {
      if (parm) {
        this.dataGridStorage = []
        this.paging.page = 1
        this.filterCondition = Object.assign({}, this.filterCondition, parm)
        // 重绘图表
        if (this.$refs.followUpEchartsBox) {
          this.$refs.followUpEchartsBox._seekMemberFollowNum()
        }
      } else {
        if (this.paging.page > 1 && this.dataGridStorage.length == this.totalNum) {
          return
        }
      }

      this.loading = true
      if (this.headline == '我的跟进') {
        this._seekMemberFollowList()
      } else if (this.headline == '跟进管理') {
        this._seekFollowAdministration()
      }
      // this._seekMemberFollowList()
    },
    // 我的跟进
    _seekMemberFollowList () {
      seekMemberFollowList(Object.assign({}, this.filterCondition, combination.sort(this.sortList), this.paging, {shopId: this.shopId}))
        .then(res => {
          if (res.data.state == 200) {
            this.paging.page += 1
            this.totalNum = res.data.data.totalNum
            let datas = res.data.data.dataList

            for (let i of datas) {
              i.followTime = GetNYR(i.followTime)
              // 负责人
              i.principalName = groupName(i.principalList, 'principalName')
              // 跟进状态
              i.followStatus = getFollowUpStatus(i.followStatus)
              // 跟进类型
              i.followType = getFollowType(i.followType)
              // 会员类型
              i.memberType = getMemberTypeList(i.memberType)
            }
            this.dataGridStorage.push(...datas)
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
          this.loading = false
        })
    },
    // 跟进管理
    _seekFollowAdministration(){
      seekFollowAdministration(Object.assign({}, this.filterCondition, this.paging, {shopId: this.shopId}))
        .then(res => {
          this.loading = false
          if (res.data.state == 200) {
            let datas = res.data.data.dataList
            for (let i of datas) {
              // 跟进目的
              i.followStatus = getVisitAimList(i.followStatus)
              // 跟进状态
              i.followStatus = getFollowUpStatus(i.followStatus)
            }
            this.dataGridStorage.push(...datas)
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },

    cancelSort(parm) { // 取消排序
      this.sortList.splice(parm.index, 1)
      this.$refs.reportDetailWrap.cancelSort(parm.item)
      this.initData()
    },

    sortListAct(val) { // 列表排序
      for (let i of this.sortList) {
        if (i.name == val.name) {
          this.$set(i, 'value', val.value)
          this.initData()
          return
        }
      }
      this.sortList.push(val)
      this.initData()
    },

    initData () {
      this.dataGridStorage = []
      this.paging.page = 1
      this.filterData()
    },
    // 编辑
    compileData (parm) {
      this.$emit('compileData', parm)
    },
    //懒加载
    lazyloadSend() {
      if (this.dataGridStorage.length) {
        if (this.dataGridStorage.length != this.totalNum) {
          this.filterData()
        }
      }
    }
  }
}

</script>

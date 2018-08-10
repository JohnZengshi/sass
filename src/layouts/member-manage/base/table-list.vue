<!-- 会员列表 -->
<template>
  <transition name="tp-ani">
    <div class="RP_report_wrapper ui-page-max-width report_table_fixed dc-label-print-main">
      <div class="new-table-header-layout-main">

        <div class="rp_gridState">
          <p class="side-nav"><i class="iconfont icon-liebiao"></i>商品列表:<span style="color: #2993f8;">{{totalNum}}</span></p>
          <sort-table :sortList="sortList" @cancelSort="cancelSort"></sort-table>
          <!-- 跟进 -->
          <filter-header v-if="currentLocation == 'followUp'" :shopId="shopId" @filterData="filterData"></filter-header>

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
          @lazyloadSend="lazyloadSend"
          @sortListAct="sortListAct"
          @delData="delData"
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
let configData = require('./../config/config.js')
import {seekFindMemberList} from 'Api/commonality/seek.js'
import {operateDeleteMemberId} from 'Api/commonality/operate'
import sortTable from 'base/sort/sort-table'
import ReportDetail from 'base/newDataGrid/reportDetailTab'
import filterHeader from './filter-header'
import {combination} from 'assets/js/combination'

export default {
  props: ['shopId', 'currentLocation'],
  components: {
    ReportDetail,
    filterHeader,
    sortTable
  },
  data() {
    return {
      // 会员
      totalNum: '',
      memberId: '',
      configData: configData.detailConfing,
      filterCondition: {
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
  methods: {
    // 选择摸个会员
    changeMember (parm) {
      this.memberId = parm.memberId
      this.$emit('changeMember', parm)
      // setTimeout(() => {
      //   this.$refs.memberInfoBox.open()
      // }, 0)
    },

    delData(parm) {
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

    filterData(parm) {
      if (parm) {
        if (parm.init) {
          this.filterCondition = {}
        }
        this.dataGridStorage = []
        this.paging.page = 1
        this.filterCondition = Object.assign({}, this.filterCondition, parm)
      } else {
        if (this.paging.page > 1 && this.dataGridStorage.length == this.totalNum) {
          return
        }
      }

      this.loading = true
      seekFindMemberList(Object.assign({}, this.filterCondition, combination.sort(this.sortList), this.paging, {shopId: this.shopId}))
        .then(res => {
          if (res.data.state == 200) {
            this.paging.page += 1
            this.totalNum = res.data.data.totalNum
            this.dataGridStorage.push(...res.data.data.dataList)
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          this.loading = false
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

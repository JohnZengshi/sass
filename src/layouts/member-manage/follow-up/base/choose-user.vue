<!-- 会员编辑模板 -->
<template>
  <div class="m-m-add-member-main n-p-scroll-box choose-user-box">
    <div class="p-close-icon" @click="close">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </div>
    <div class="scroll-body">
      <h3>批量完成</h3>
      <div v-loading="loading" element-loading-text="数据查询中">
        <report-detail
          ref="reportDetailWrap"
          :dataGridStorage="dataGridStorage"
          :configData="configData"
          :className="'xj-report-table-container-img-small'"
          @checkedAll="checkedAll"
          @lazyloadSend="lazyloadSend"
          @sortListAct="sortListAct"
          @delData="delData"
          @change="changeMember"
        >
        </report-detail>
      </div>
    </div>
    <div class="xj-btn-list">
      <div v-if="false" class="btn cnacel-btn" @click="close">取消</div>
      <div class="btn" @click="confirm">下一步</div>
    </div>
  </div>
</template>
<script>
let configData = require('./../../config/config.js')
import {seekMemberFollowList} from 'Api/commonality/seek.js'
import reportDetail from 'base/newDataGrid/reportDetailTab'
import {GetNYR} from 'assets/js/getTime'
import {groupName} from 'Api/commonality/filter'
import {getFollowUpStatus, getFollowType, getMemberTypeList, getVisitAimList} from 'assets/js/analysis'
export default {
  props: ['isDialog', 'filterCondition', 'shopId'],
  components: {
    reportDetail
  },
  data () {
    return {
      checkedList: [], // 批量选中参数
      configData: configData.chooseUserConfig,

      loading: false,

      dataGridStorage: [],
      paging: {
        page: 1,
        pageSize: '30'
      }
    }
  },
  watch: {
    isDialog () {
      if (!this.isDialog) {
          this.checkedList = []
          this.dataGridStorage = []
      }
    }
  },
  created () {
    this._seekMemberFollowList('Y')
  },
  methods: {
    // 批量选择
    checkedAll (parm) {
      this.checkedList = parm
    },
    close () {
      this.$emit('close')
    },
    confirm () {
      // console.log('选中的数据', this.checkedList)
      if (!this.checkedList.length) {
        this.$message({message: '请选择跟进',type: 'warning'})
        return
      }
      this.$emit('confirm', this.checkedList)
    },
    lazyloadSend () {
      if (this.paging.page = 1) {
        return
      }
      this._seekMemberFollowList()
    },
    sortListAct () {

    },
    delData () {

    },
    changeMember () {

    },
    // 我的跟进
    _seekMemberFollowList (parm) {
      if (parm) {
        this.dataGridStorage = []
        this.paging.page = 1
      } else {
        if (this.paging.page > 1 && this.dataGridStorage.length == this.totalNum) {
          return
        }
      }
      this.loading = false
      seekMemberFollowList(Object.assign({}, this.filterCondition, this.paging, {shopId: this.shopId}))
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
              // 跟进目的
              i.followPurpose = getVisitAimList(i.followPurpose)
            }
            this.dataGridStorage.push(...datas)
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
          this.loading = false
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      $(".scroll-box").mCustomScrollbar({
        theme: "minimal-dark",
        scrollInertia: 100, //滚动条移动速度，数值越大滚动越慢
      })
    })
  }
}

</script>
<style lang="scss">
.choose-user-box{
  width: 100%;
}
</style>
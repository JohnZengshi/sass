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
import reportDetail from 'base/newDataGrid/reportDetailTab'
export default {
  props: ['isDialog'],
  components: {
    reportDetail
  },
  data () {
    return {
      checkedList: [], // 批量选中参数
      configData: configData.chooseUserConfig,

      loading: false,

      dataGridStorage: [
        {
          followId: '123',
          createTime: '20180811000000',
          avatarUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1758343206,1224786249&fm=58&bpow=1024&bpoh=1536'
        },
        {followId: '456'},
        {followId: '789'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
        {A: '123'},
      ],
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

    },
    sortListAct () {

    },
    delData () {

    },
    changeMember () {

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
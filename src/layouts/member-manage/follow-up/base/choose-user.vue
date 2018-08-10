<!-- 会员编辑模板 -->
<template>
  <div class="m-m-add-member-main n-p-scroll-box choose-user-box">
    <div class="p-close-icon" @click="close">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </div>
    <div class="add-member-body">
      <h3>批量完成</h3>
      <div class="scroll-box">
        <div>
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
    </div>
    <div class="xj-btn-list">
      <div v-if="false" class="btn cnacel-btn" @click="close">取消</div>
      <div class="btn" @click="confirm">确定</div>
    </div>
  </div>
</template>
<script>
let configData = require('./../../config/config.js')
export default {
  data () {
    return {
      configData: configData.followUpConfing,

      loading: false,

      dataGridStorage: [],
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
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
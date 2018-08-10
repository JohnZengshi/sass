<!-- 会员编辑模板 -->
<template>
  <div class="m-m-add-member-main n-p-scroll-box">
    <div class="p-close-icon" @click="close">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </div>
    <div class="add-member-body">
      <h3>完成跟进</h3>
      <div class="scroll-box">
        <div>
          
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
export default {
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    }
  },
  mounted() {
    this.$nextTick(() => {
      $(".scroll-box").mCustomScrollbar({
        theme: "minimal-dark",
        scrollInertia: 100, //滚动条移动速度，数值越大滚动越慢
      })
      if (this.memberId) {
        this._seekFindMemberDetails()
      }
    })
  }
}

</script>

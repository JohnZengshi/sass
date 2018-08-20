<template>
  <el-dialog :visible.sync="isShowDio" :class="[dialogClass]" element-loading-text="拼命加载中">
    <div class="p-close-icon" @click="close">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </div>
    <div class="small-popup-header">
      <img src="~static/img/piliang.png">
      <h3>{{headTit ? headTit : '删除确认'}}</h3>
    </div>

    <slot></slot>

  </el-dialog>
</template>
<script>
export default {
  props: ['headTit', 'dialogClass'],
  data () {
    return {
      isShowDio: false
    }
  },
  methods: {
    open () {
      this.isShowDio = true
    },
    close () {
      this.isShowDio = false
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.small-popup-header {
  text-align: center;
  padding-top: 20px;
  height: 125px;
  img {
    display: block;
    margin: 0 auto;
    width: 46px;
    height: 46px;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 12px;
    color: #333;
    text-align: center;
  }
}
</style>
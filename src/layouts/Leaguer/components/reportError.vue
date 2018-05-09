<template>
  <div class="reportErrorBar">
    <div class="reportErrorBarTop">
      <img src="../../../../static/img/message/5.png" alt="">
      <p>短信条数不足</p>
    </div>
    <p>您的短信发送失败，建议您选择充值继续发送</p>
    <div class="reportError-btn">
      <span @click.stop="torecharge">充值</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['shopId'],
  data () {
    return {

    }
  },
  methods: {
    torecharge () {
      eventBus.$emit('open-recharge-bus', '123');
      // this.$emit('toRecharge')
    }
  }
}
</script>
<style lang="scss">
.reportError-bar {
  width: 320px;
  height: 300px;
  background:#fff;
  border-radius: 10px;
  .el-dialog__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
  }
  .el-dialog__body {
      padding: 0 28px;
  }
}
.reportErrorBar{
  margin-top: 30px;
  text-align: center;
  .reportErrorBarTop{
    >img{
      width: 47px;
      height: 47px;
      display: inline-block;
      border-radius: 50%;
      background-color: #2993f8;
    }
    >p{
      margin-top: 10px;
    }
  }
  >p{
    margin-top: 40px;
    // width: ;
    padding-left: 18px;
    padding-right: 18px;
  }
  .reportError-btn{
    margin-top: 60px;
    >span{
      display: inline-block;
      background-color: #2993f8;
      width: 150px;
      line-height: 27px;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>



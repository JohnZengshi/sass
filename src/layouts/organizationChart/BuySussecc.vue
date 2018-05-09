<template>
  <el-dialog class="dialog-w440-h550-hn" title="" v-model="isShow">
    <div class="buy-sussecc-main">
      <a href="javascript: void(0)" @click="isShow = false"></a>
      <p><span>{{timer}}s</span>后自动进入店铺列表</p>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        isShow: true,
        timer: 3
      }
    },
    created () {
      let _self = this
      _self.intersubsub = setInterval(() => {
          --_self.timer
          if (_self.timer <= 0) {
            clearInterval(_self.intersubsub)
            _self.isShow = false
            _self.timer = 3
          }
      }, 1000)
    }
  }
</script>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
  .buy-sussecc-main{
    position: relative;
    height: 550px;
    width: 440px;
    background: url('./../../assets/img/buyShop/buy-shop-three-bg.png') no-repeat;
    background-size: 440px 550px;
    a{
      display: inline-block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 26px;
      margin: auto;
      line-height: 40px;
      color: #fff;
      width: 220px;
      height: 80px;
      margin-bottom: 46px;
      text-align: center;
      background: url('./../../assets/img/buyShop/to-shop-list.png') no-repeat;
      background-size: 220px 80px;
    }
    p{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 70px;
      width: 100%;
      text-align: center;
      color: $font-color-deep;
      font-size: 12px;
      span{
        font-size: 12px;
        color: $main-color;
      }
    }
  }
</style>
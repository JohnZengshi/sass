<template>
  <div
    class="weixin_zhifu-main"
    v-show="isWeixin"
  >
    <i class="close-preview" @click="setIsWeixin"></i>
    <div class="weixin_zhifu_left">
      <i class="weixin-tit"></i>
      <img class="weixin-qr-img" id="weixinZhifu">
      <div v-if="isShowCount" class="count-down">{{subsub < 10 ? '0'+subsub : subsub}}s</div>
    </div>
    <div class="weixin_zhifu_right">

    </div>
  </div>
</template>
<script>
  import {seekOrderPayStatus} from 'Api/commonality/seek'
  export default {
    props: ['isWeixin', 'orderNo', 'chargeId', 'loading'],
    watch: {
      'isWeixin' () {
        if (this.isWeixin === true) {
          if (this.orderNo) {
            this._seekOrderPayStatus()
            this.countDown()
          }
          // this._seekOrderPayStatus()
          // this.countDown()
        } else {
          //clearInterval(this.time)
        }
      }
    },
    data () {
      return {
        subsub: 180,
        isShowCount: true
      }
    },
    mounted () {
      //this.countDown()
      //this._seekOrderPayStatus()
    },
    methods: {
      intCallBack () {
        let _self = this
        this.resultCallBack = setInterval(() => {
          let options = {
            orderNo: this.orderNo,
            chargeId: this.chargeId
          }
          seekOrderPayStatus(options)
          .then(res => {
            console.log(res)
            if (res.data.state === 200) {
              if (res.data.data.payStatus === '2') {
                this.$store.dispatch('workPopupError', '购买成功');
                this.$emit('closeBuyShop')
                clearInterval(this.resultCallBack)
              } else {
              }
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
        }, 3000)
      },
      countDown () {
        this.intersubsub = setInterval(() => {
          --this.subsub;
          if (this.subsub <= 0) {
              clearInterval(this.intersubsub)
              clearInterval(this.resultCallBack)
              this.isShowCount = false
              this.subsub = 180;
          }
        }, 1000);
      },
      setIsWeixin () {
        //clearInterval(this.time)
        this.$emit('setIsWeixin')
      },
      _seekOrderPayStatus () {
        let options = {
          orderNo: this.orderNo,
          chargeId: this.chargeId
        }
        seekOrderPayStatus(options)
          .then(res => {
            console.log('----------------', res)
            if (res.data.state === 200) {
              if (res.data.data.payStatus === '2') {
                this.$store.dispatch('workPopupError', '购买成功');
                this.$emit('closeBuyShop')
                clearInterval(this.resultCallBack)
              } else {
                let _self = this
                setTimeout(function () {
                  _self.intCallBack()
                }, 10000)
              }
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      }
    }
  }
</script>
<style lang="scss">
.weixin_zhifu-main{
  position: relative;
  margin-top: 30px;
  width: 640px;
  height: 430px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 0;
  .close-preview{
    position: absolute;
    top: 20px;
    right: 20px;
    display: block;
    width: 24px;
    height: 24px;
    background: url('./../../../assets/img/close-preview.png') no-repeat;
    background-size: 24px;
    cursor: pointer;
  }
  .weixin_zhifu_left, .weixin_zhifu_right{
    vertical-align: top;
    display: inline-block;
  }
  .weixin_zhifu_left{
    width: 50%;
    height: 415px;
    margin-top: 15px;
    .count-down {
      width: 100px;
      height: 30px;
      font-size: 16px;
      color:#999;
      margin: 0 auto;
      text-align: center;
      line-height: 30px;
    }
    .weixin-tit{
      display: block;
      width: 260px;
      height: 86px;
      margin: 27px auto 0 auto;
      background: url(~assets/img/buyShop/weixin-tit.png) no-repeat;
      background-size: 260px 86px;
    }
    .weixin-qr-img{
      display: block;
      height: 260px;
      width: 260px;
      margin: auto;
    }
  }
  .weixin_zhifu_right{
    width: 50%;
    height: 400px;
    margin-top: 15px;
    background: url(~assets/img/buyShop/weixin-qrcode.jpg) no-repeat;
    background-size: 320px 400px;
  }
}
</style>

<template>
  <div class="pay-box">
    <div class="pay-contant">
      <div class="pay-title">支付方式</div>
      <div class="pay-main">
        <div class="pay-item"><img src="./../../../../../static/img/alipay.png"/><span>支付宝支付</span></div>
        <div class="pay-item"><img src="./../../../../../static/img/WeChat.png"/><span>微信支付</span></div>
        <div class="pay-item"><img src="./../../../../../static/img/swiping-card.png"/><span>银联支付</span></div>
        <div class="pay-item"><img src="./../../../../../static/img/cash.png"/><span>现金支付</span></div>
        <div class="pay-item"><img src="./../../../../../static/img/other.png"/><span>其他</span></div>
      </div>
    </div>


  </div>
</template>

<script>
  import {seekGoldPrice} from './../../../../Api/commonality/seek'
  export default {
    data () {
      return {

      }
    },
    methods: {
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      getGoldPrice () {
        seekGoldPrice().then((res) => {
          console.log(res);
        }, (res) => {
          console.log(res);
        })
      }
    },
    mounted () {
      this.getGoldPrice();
    }
  }
</script>
<style lang="scss" scoped>
  .pay-box{
    width: 800px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    margin: 20px auto;
  }
  .pay-title{
    height:50px; text-align: center; line-height: 50px;
    background:#e6e6e6;
    width:100%;
  }
  .pay-contant{
    width:100%;
  }
  .pay-main{padding-top:60px; padding-left:110px; overflow: hidden; clear: both;}
  .pay-item{
    border-radius: 4px;
    width:165px; height:45px; padding:10px 20px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    float:left; margin-bottom:40px; margin-right:40px;

  }
  .pay-item img{float:left; display: block; margin-right:15px;}
  .pay-item span{font-size:14px; color:#666;  float:left;}



</style>

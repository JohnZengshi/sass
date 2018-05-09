<template>
  <div class="affirm-buy-main" :class="{'affirm-buy-bg': !isWeixin}" v-loading="loading" 
    element-loading-text="loading...">
    <div v-show="!isWeixin">
      <i class="affirm-buy-close" @click="closeBuyShop"></i>
      <h3>确认订单</h3>
      <ul class="affirm-buy-header" v-if="orderDetail">
        <li>
          <span>购<i></i>买<i></i>人：</span>
          <span>{{orderDetail.dataList[0].buyUserName}}</span> 
        </li>
        <li>
          <span>购买公司：</span>
          <span>{{companyInfo.companyName}}</span>
        </li>
        <li>
          <span>购买日期：</span>
          <span>{{_GetSF(orderDetail.createTime)}}</span>
        </li>
      </ul>
      <ul class="clearing-wrap" v-if="orderDetail">
        <li>
          <p class="left-tit">原价</p>
          <div class="original-price-right">
            <p>
              <span class="metasymbol">￥</span>
              <span class="monny-num">{{orderDetail.dataList[0].num * 2988}}</span>
              <span class="decimal-point">.00</span>
            </p>
            <p>
              2988 * {{orderDetail.dataList[0].num}}
            </p>
          </div>
        </li>
        <li>
          <p class="left-tit">优惠价</p>
          <div class="original-price-right">
            <p>
              <i></i>
              <span class="metasymbol">￥</span>
              <span class="monny-num">-{{orderDetail.totalSale}}</span>
              <span class="decimal-point">.00</span>
            </p>
            <p>
              {{orderDetail.dataList[0].price}} * {{orderDetail.dataList[0].num}}
            </p>
          </div>
        </li>
        <li>
          <p class="clearing-footer">
            <span>共计：</span>
            <span>{{orderDetail.dataList[0].num}}</span>
            <span>套</span>
            <span>合计：</span>
            <span class="metasymbol">￥</span>
            <span class="monny-num">{{orderDetail.totalPrice}}</span>
            <span class="decimal-point">.00</span>
          </p>
        </li>
      </ul>
      <div class="payment-type-wrap" v-if="orderDetail">
        <h6>支付方式</h6>
        <ul>
          <li>
            <i class="wx-icon"></i>
            <span>微信支付</span>
            <a href="javascript: void(0)" @click="_weixinShopBuyPay('wx_pub_qr')">去支付</a>
          </li>
          <li style="margin-top: 20px;">
            <i class="zfb-icon"></i>
            <span>支付宝支付</span>
            <a href="javascript: void(0)" @click="_operateShopBuyPay('alipay_pc_direct')">去支付</a>
          </li>
        </ul>
      </div>
      <p class="affirm-buy-footer">点击支付，即表示您已经同意<a>《用户协议》</a></p>
    </div>
    <WeixinQr @closeBuyShop="closeBuyShop" @setIsWeixin="setIsWeixin" :chargeId="chargeId" :orderNo="orderNO" :loading="loading" :isWeixin="isWeixin" v-show="isWeixin"></WeixinQr>
<!--     <div class="weixin_zhifu-wrap" v-show="isWeixin">
      <i class="close-preview" @click="isWeixin = !isWeixin"></i>
      <div class="weixin_zhifu_left"> 
        <i class="weixin-tit"></i>
        <img class="weixin-qr-img" id="weixinZhifu">
      </div>
      <div class="weixin_zhifu_right">
        
      </div>
    </div> -->
  </div>
</template>
<script>
  var pingpp = require('pingpp-js')
  import {mapGetters} from 'vuex'
  import {seekOrderQueries} from 'Api/commonality/seek'
  import {operateShopBuyPay} from 'Api/commonality/operate'
  import {GetNYR} from 'assets/js/getTime'
  import WeixinQr from './WeixinQr'
  export default {
    components: {
      WeixinQr
    },
    props: ['orderNO'],
    computed: {
      ...mapGetters([
        'companyInfo'
      ])
    },
    data () {
      return {
        loading: false,
        chargeId: '',
        isWeixin: false,
        orderDetail: ''
      }
    },
    created () {
      this._seekOrderQueries()
    },
    methods: {
      _GetSF (parm) {
        return GetNYR(parm)
      },
      setIsWeixin () {
        this.isWeixin = !this.isWeixin
      },
      _seekOrderQueries () {
        console.log(this.orderNO)
        let options = {
          orderNo: this.orderNO
          // orderNO: '2017082914530962540'
        }
        seekOrderQueries (options)
          .then(res => {
            if (res.data.state === 200) {
              this.orderDetail = res.data.data
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _weixinShopBuyPay (parm) {
        if (this.chargeId) {
          this.isWeixin = !this.isWeixin
          return
        }
        console.log(this.orderNO)
        this.loading = true
        let options = {
          orderNo: this.orderNO,
          channel: parm,
          amount: this.orderDetail.totalPrice,
          payChannel: '03',
          type: ''
        }
        operateShopBuyPay(options)
          .then(res => {
            this.isWeixin = !this.isWeixin
            if (res.data.state === 200) {
              console.log(this.chargeId)
              this.chargeId = res.data.data.id
              new QRious({
                element: document.getElementById('weixinZhifu'),
                size: 250,
                value: res.data.data.qrUrl
              });
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
            this.loading = false
          })
      },
      _pingpp () {
        pingpp.createPayment(res.data.data, function(result, err){
          if (result == "success") {
            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
          } else if (result == "fail") {
            // charge 不正确或者微信公众账号支付失败时会在此处返回
          } else if (result == "cancel") {
            // 微信公众账号支付取消支付
          }
        })
      },
      _operateShopBuyPay (parm) {
        let options = {
          orderNo: this.orderNO,
          channel: parm,
          amount: this.orderDetail.totalPrice,
          payChannel: '02',
          type: ''
        }
        console.log(options)
        operateShopBuyPay(options)
          .then(res => {
            console.log(res.data)
            // console.log(res.data.data)
            let datas = res.data.data
            pingpp.createPayment(res.data.data, function(result, err){
              console.log('购买回调')
              console.log(result);
              console.log(err.msg);
              console.log(err.extra);
              if (result == "success") {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
              } else if (result == "fail") {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
              } else if (result == "cancel") {
                // 微信公众账号支付取消支付
              }
            })
          })
      },
      closeBuyShop () {
        this.$emit('closeBuyShop')
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '~assets/css/color.scss';
.affirm-buy-bg{
  background: url(~assets/img/buyShop/affirm-buy-bg.png) no-repeat;
}
.affirm-buy-main{
  position: relative;
  width: 640px;
  height: 640px;
  background-size: 640px 640px;
  overflow: hidden;
  .affirm-buy-close{
    position: absolute;
    top: 32px;
    right: 46px;
    display: block;
    width: 24px;
    height: 24px;
    background: url('./../../../assets/img/close-icon-fff.png') no-repeat;
    background-size: 24px;
    cursor: pointer;
  }
  h3{
    text-align: center;
    color: #fff;
    font-size: 20px;
    line-height: 20px;
    margin-top: 54px;
  }
  .affirm-buy-header{
    margin: 66px 0 0 95px;
    li{
      height: 14px;
      font-size: 0;
      display: flex;
      span{
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
      }
      span:first-child{
        color: #999;
        display: flex;
        flex-direction: row;
        width: 70px;
        i{
          flex: 1;
        }
      }
      span:last-child{
        color: #333;
      }
    }
    li:nth-child(2){
      margin: 20px 0;
    }
  }
  .clearing-wrap{
    padding: 16px 20px 0 20px;
    width: 450px;
    height: 170px;
    margin: 28px 0 0 95px;
    li{
      overflow: hidden;
    }
    background-color: #f4f9ff;
    .left-tit{
      display: inline-block;
    }
    .original-price-right{
      float: right;
      p:first-child{
        font-size: 0;
        // margin-bottom: 10px;
        span{
          color: #333;
        }
        .metasymbol{
          font-size: 12px;
          line-height: 12px;
        }
        .monny-num{
          font-size: 16px;
          line-height: 16px;
        }
        .decimal-point{
          font-size: 12px;
          line-height: 12px;
        }
      }
      p:nth-child(2){
        margin-top: 10px;
        text-align: right;
        font-size: 12px;
        line-height: 12px;
      }
    }
    li:nth-child(2){
      margin-top: 21px;
      .original-price-right{
        p{
          i{
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            width: 22px;
            height: 22px;
            background: url(~assets/img/buyShop/discounts-icon.png) no-repeat;
            background-size: 22px;
          }
          span{
            color: #ff3b30;
            vertical-align: middle;
          }
        }
        p:nth-child(2){
          margin-top: 7px;
          text-align: right;
          font-size: 12px;
          line-height: 12px;
        }
      }
    }
  }
  .clearing-footer{
    margin-top: 22px;
    font-size: 12px;
    text-align: right;
    font-size: 0;
    span:nth-child(1), span:nth-child(3){
      font-size: 14px;
      line-height: 14px;
      color: #999;
    }
    span:nth-child(2){
      font-size: 14px;
      line-height: 14px;
      color: #333;
    }
    span:nth-child(4){
      margin-left: 30px;
      font-size: 14px;
      line-height: 14px;
      color: #333;
    }
    span:nth-child(5){
      font-size: 14px;
      line-height: 14px;
      color: #ff3b30;
    }
    span:nth-child(6){
      font-size: 18px;
      line-height: 18px;
      font-weight: 600;
      color: #ff3b30;
    }
    span:nth-child(7){
      font-size: 14px;
      line-height: 14px;
      color: #ff3b30;
    }
  }
  .payment-type-wrap{
    width: 580px;
    margin: auto;
    margin-top: 26px;
    padding-left: 65px;
    padding-right: 65px;
    h6{
      font-size: 14px;
      line-height: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }
    ul{
      li{
        height: 28px;
        font-size: 0;
        // background-color: #f1f1f1;
        i{
          vertical-align: middle;
          display: inline-block;
          width: 26px;
          height: 26px;
          margin-top: 1px;
        }
        .zfb-icon{
          // margin-top: 22px;
          background: url(~assets/img/buyShop/zhifubao-icon.png) no-repeat;
          background-size: 26px;
        }
        .wx-icon{
          background: url(~assets/img/buyShop/weixin-icon.png) no-repeat;
          background-size: 26px;
        }
        span{
          vertical-align: middle;
          font-size: 14px;
          margin-left: 20px;
          // line-height: 28px;
          color: #333;
        }
        a{
          display: inline-block;
          width: 80px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 5px;
          font-size: 12px;
          color: #fff;
          background-color: $main-color;
          float: right;
          font-weight: 600;
        }
      }
      li:nth-child(1){
        // background: url(~assets/img/buyShop/weixin-icon.png) no-repeat;
        background-size: 26px;
      }
      // li:nth-child(2){
      //   margin-top: 22px;
      //   // background: url(~assets/img/buyShop/zhifubao-icon.png) no-repeat;
      //   background-size: 26px;
      // }
    }
  }
  .affirm-buy-footer{
    width: 580px;
    margin: auto;
    padding-left: 65px;
    font-size: 12px;
    line-height: 12px;
    color: #999;
    margin-top: 14px;
    a{
      color: #333;
      cursor: pointer;
    }
  }
}
.affirm-buy-main{
  // .weixin_zhifu-wrap{
  //   position: relative;
  //   margin-top: 30px;
  //   width: 640px;
  //   height: 430px;
  //   background-color: #fff;
  //   border-radius: 5px;
  //   font-size: 0;
  //   .close-preview{
  //     position: absolute;
  //     top: 20px;
  //     right: 20px;
  //     display: block;
  //     width: 24px;
  //     height: 24px;
  //     background: url('./../../../assets/img/close-preview.png') no-repeat;
  //     background-size: 24px;
  //     cursor: pointer;
  //   }
  //   .weixin_zhifu_left, .weixin_zhifu_right{
  //     vertical-align: top;
  //     display: inline-block;
  //   }
  //   .weixin_zhifu_left{
  //     width: 50%;
  //     height: 400px;
  //     margin-top: 15px;
  //     .weixin-tit{
  //       display: block;
  //       width: 260px;
  //       height: 86px;
  //       margin: 27px auto 0 auto;
  //       background: url(~assets/img/buyShop/weixin-tit.png) no-repeat;
  //       background-size: 260px 86px;
  //     }
  //     .weixin-qr-img{
  //       display: block;
  //       height: 260px;
  //       width: 260px;
  //       margin: auto;
  //     }
  //   }
  //   .weixin_zhifu_right{
  //     width: 50%;
  //     height: 400px;
  //     margin-top: 15px;
  //     background: url(~assets/img/buyShop/weixin-qrcode.jpg) no-repeat;
  //     background-size: 320px 400px;
  //   }
  // }
}
</style>
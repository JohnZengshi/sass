<template>
  <div class="rechargebar" v-loading="loading" element-loading-text="loading...">
    <div class="top">
      <img src="../../../../static/img/creat.png" alt="">
      <p>选择套餐</p>
    </div>
    <div class="rechargecontent">
      <div class="imgbox" @click.stop="rechargemoney(2, 21, 1)">
        <span>
          <img src="../../../../static/img/message/btn2.png" v-if="isCheck[1]" alt="666" ref="imgtwo">
          <img src="../../../../static/img/message/btn1.png" v-if="!isCheck[1]" alt="9999" ref="imgone">
        </span>
        <img src="../../../../static/img/message/1.png" alt="">
      </div>
      <div class="imgbox" @click.stop="rechargemoney(2, 22, 2)">
        <span>
          <img src="../../../../static/img/message/btn2.png" alt="" ref="imgtwo" v-if="isCheck[2]">
          <img src="../../../../static/img/message/btn1.png" alt="" ref="imgone" v-if="!isCheck[2]">
        </span>
        <img src="../../../../static/img/message/2.png" alt="">
      </div>
      <div class="imgbox" @click.stop="rechargemoney(2, 23, 3)">
        <span>
          <img src="../../../../static/img/message/btn2.png" alt="" ref="imgtwo" v-if="isCheck[3]">
          <img src="../../../../static/img/message/btn1.png" alt="" ref="imgone" v-if="!isCheck[3]">
        </span>
        <img src="../../../../static/img/message/3.png" alt="">
      </div>
      <div class="imgbox" @click.stop="rechargemoney(2, 24, 4)">
        <span>
          <img src="../../../../static/img/message/btn2.png" alt="" ref="imgtwo" v-if="isCheck[4]">
          <img src="../../../../static/img/message/btn1.png" alt="" ref="imgone" v-if="!isCheck[4]">
        </span>
        <img src="../../../../static/img/message/4.png" alt="">
      </div>
    </div>
    <div class="moneytype">
      <div class="left">支付方式</div>
      <div class="right">
        <div class="top">
          <span><i class="iconfont icon-weixin"></i><i>微信</i></span>
          <!-- <el-checkbox v-model="checked" @click.stop="paymoney('wx_pub_qr')"></el-checkbox> -->
          <el-radio v-model="radio" label="wx_pub_qr">&nbsp;</el-radio>
        </div>
        <div class="bottom">
          <span><i class="iconfont icon-icon-alipay"></i><i>支付宝</i></span>
          <!-- <el-checkbox v-model="Checked" @click.stop="paymoney('alipay_pc_direct')"></el-checkbox> -->
          <el-radio v-model="radio" label="alipay_pc_direct">&nbsp;</el-radio>
        </div>
      </div>
    </div>
    <div class="sure-btn">
      <span @click.stop="_oprationseekChargePay">确认</span>
    </div>
    <!-- 微信支付页面 -->
    <WeixinQr @closeBuyShop="closeBuyShop" @setIsWeixin="setIsWeixin" :chargeId="chargeId" :orderNo="orderNO" :loading="loading" :isWeixin="isWeixin" v-show="isWeixin"></WeixinQr>
  </div>
</template>
<script>
var pingpp = require('pingpp-js')
import Vue from 'vue'
import WeixinQr from '../../organizationChart/buyShop/WeixinQr'
import {seekGetMoneyList, seekChargePay} from 'Api/commonality/seek'
export default {
  props: ['shopId', 'rechargeclick'],
  components: {
    WeixinQr
  },
  data () {
    return {
      radio: '',
      moneyList: [],
      paymoneyLIst: {},
      isWeixin: false,
      loading: false,
      chargeId: '',
      orderNO: '',
      isCheck: [] // 选中
    }
  },
  created () {
    // this.rechargemoney()
    // this.aa()
  },
  watch: {
    rechargeclick (val) {
      if (val == false) {
        this.radio = ''
        this.isCheck = []
      }
    }
  },
  methods: {
    closeBuyShop () {
      this.$emit("closePay")
      this.isWeixin = false
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
      // aa () {
      //   let options = {
      //     type: 2
      //   }
      //   seekGetMoneyList(options).then(res => {
      //   console.log('套餐+++++++++++', res)
      //   }, res => {
      //     this.$message(res.data.msg)
      //   })
      // },
    rechargemoney (param, value, check) {
      if (this.isCheck[check]) {
        // Vue.set(this.isCheck, check, false)
      } else {
        this.isCheck = []
        Vue.set(this.isCheck, check, true)
      }
      //this.radio = ''
      this.isWeixin = false
      let options = {
        type: param,
        mType: value
      }
      seekGetMoneyList(options).then(res => {
        console.log('套餐', res)
        this.moneyList = res.data.data.dataList
      }, res => {
        this.$message(res.data.msg)
      })
    },
    setIsWeixin () {
      this.isWeixin = !this.isWeixin
      this.loading = false
    },
    _oprationseekChargePay () {
      // if (!this.check) {
      //   this.$message('请选择套餐')
      //   return
      // }
      if (this.radio == '') {
        this.$message('请选择支付方式')
        return
      }
      if (this.moneyList.length == 0) {
        this.$message('请选择短信套餐')
        return
      }
      // if (!this.moneyList) {
      //   this.loading = false
      //   return
      // }
      //支付宝支付
      if (this.radio == 'alipay_pc_direct') {
        let options = {
          shopId: this.shopId,
          typeId: this.moneyList[0].id,
          channel: this.radio,
          amount: this.moneyList[0].price
        }
        seekChargePay(options).then(res => {
          console.log(res)
          this.paymoneyLIst = res.data.data
          pingpp.createPayment(res.data.data, function(result, err){
            console.log(result)
            console.log(err.msg)
            console.log(err.extra)
            this.moneyList = []
            if (result == "success") {
              // 只有微信公众号 (wx_pub)、QQ 公众号 (qpay_pub)支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
            } else if (result == "fail") {
                // Charge 不正确或者微信公众号 / QQ公众号支付失败时会在此处返回
            } else if (result == "cancel") {
                // 微信公众号支付取消支付
            }
          })
        }, res => {
          this.$message(res.data.msg)
        })
      }
      //微信支付
      if (this.radio == 'wx_pub_qr') {
        // if (this.chargeId) {
        //   this.isWeixin = !this.isWeixin
        //   return
        // }
        // this.loading = true
        let options = {
          shopId: this.shopId,
          typeId: this.moneyList[0].id,
          channel: this.radio,
          amount: this.moneyList[0].price
        }
        seekChargePay(options).then(res => {
          this.chargeId = res.data.data.id
          this.orderNO = res.data.data.orderNo
          console.log('24.8	充值支付', this.orderNO)
          if (res.data.state == 200) {
            this.isWeixin = !this.isWeixin
            this.moneyList = []
            new QRious({
              element: document.getElementById('weixinZhifu'),
              size: 250,
              value: res.data.data.qrUrl
            })
          } else {
            this.$store.dispatch('workPopupError', res.data.msg)
          }
          this.loading = false
        },res => {
          this.$message(res.data.msg)
        })
      }
    }
  }
}
</script>
<style lang="scss">
.recharge-bar {
  width: 320px;
  height: 512px;
  background:#fff;
  border-radius: 10px;
  .el-dialog__header {
    position: absolute;
    top: -7px;
    left: 0;
    width: 100%;
  }
  .el-dialog__body {
    padding: 0 28px;
  }
  // .el-dialog__close{
  //   right: 0;
  // }
}
.rechargebar{
  >.top{
    margin-top: 40px;
    text-align: center;
    >p{
      margin-top: 5px;
      font-weight: 700;
    }
  }
  >.rechargecontent{
    margin-top: 23px;
    padding: {
      // left: 33px;
      // right: 33px;
    }
    >.imgbox{
      position: relative;
      >span{
        position: absolute;
        left: -20px;
        top: -15px;
        // >img{
        //   &:nth-of-type(2){
        //     display: none;
        //   }
        //   &:nth-of-type(1){
        //     display: block;
        //   }
        // }
      }
      display: inline-block;
      &:nth-of-type(1),&:nth-of-type(3){
        margin-right: 45px;
      }
      &:nth-of-type(3),&:nth-of-type(4){
        margin-top: 23px;
      }
    }
    .imgbox:hover{
      cursor: pointer;
    }
  }
  .moneytype{
    margin-top: 39px;
    >.left,.right{
      display: inline-block;
      vertical-align: top;
    }
    >.left{
      margin-right: 25px;
      padding-top: 5px;
    }
    .right{
      >.top{
        .el-radio{
          width: 20px;
          margin-left: 83px;
          .el-checkbox__inner{
            border-radius: 5px;
          }
        }
      }
      >.top,.bottom{
        // .el-checkbox__input{
        //   border-radius: 0px;
        //   display: inline-block;
        // }
        i{
          font-style: normal;
          &:nth-of-type(2){
            line-height: 32px;
            font-size: 12px;
          }
          display: inline-block;
          vertical-align: middle;
        }
        .iconfont{
          font-size: 30px;
          margin-right: 15px;
        }
        .icon-weixin{
          color: #6bbe60;
        }
        .icon-icon-alipay{
          color: #009fe8;
        }

      }
      >.bottom{
        margin-top: 5px;
        .el-radio{
          width: 20px;
          margin-left: 71px;
          .el-checkbox__inner{
            border-radius: 5px;
          }
        }
      }
    }
  }
  .sure-btn{
    margin-top: 20px;
    text-align: center;
    >span{
      width: 150px;
      line-height: 30px;
      display: inline-block;
      background-color: #2993f8;
      color: #fff;
      border-radius: 5px;
    }
  }
  .sure-btn:hover{
    cursor: pointer;
  }
  .weixin_zhifu-main{
    margin-top:-395px;
    right: -320px;
  }
}
</style>


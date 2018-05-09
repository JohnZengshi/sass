<template>
  <div class="dredge-shop-main">
    <i class="affirm-buy-close" @click="closeBuyShop"></i>
    <div class="dredge-shop-header">
      <div class="shop-header-wrap">
        <div class="shop-header-left">
          <p>购买数量</p>
          <p>
            <span>{{(Number(unitPrice)).toFixed(2)}}</span>
            <span>元/套</span>
          </p>
        </div>
        <div class="shop-header-right">
          <i class="subtract-btn" @click="subtractNum">-</i>
          <input type="text" v-model="buyNum">
          <i class="add-btn" @click="addNum">+</i>
        </div>
      </div>
    </div>
    <div class="shop-body-wrap">
      <h3>套餐购买</h3>
      <ul>
        <li @click="changeSetMealData((index+1)*10)" v-for="(item, index) in dataList">
          <i :class="{'change-shop-icon': ((index+1)*10) <= buyNum && buyNum < ((index+2)*10)}"></i>
          <p class="center-tit">
            <span>{{item.price}}</span>
            <span>元/套</span>
          </p>
          <p class="btn-tit">{{index == 0 ? '10-19套' : index == 1 ? '20-29套' : '30套以上'}}</p>
        </li>
        <!-- <li @click="changeSetMealData(20)">
          <i :class="{'change-shop-icon': 20 <= buyNum && buyNum < 30}"></i>
          <p class="center-tit">
            <span>2788</span>
            <span>元/套</span>
          </p>
          <p class="btn-tit">20-29套</p>
        </li>
        <li @click="changeSetMealData(30)">
          <i :class="{'change-shop-icon': 30 <= buyNum}"></i>
          <p class="center-tit">
            <span>2688</span>
            <span>元/套</span>
          </p>
          <p class="btn-tit">30套以上</p>
        </li> -->
      </ul>
      <p class="buy-introduced">
<!--         <i :class="one-meal-introduced"></i> -->
        <i :class="{
          'one-meal-introduced': 10 <= buyNum && buyNum < 20,
          'two-meal-introduced': 20 <= buyNum && buyNum < 30,
          'three-meal-introduced': 30 <= buyNum 
        }"></i>
        <span>
          凡一次性购买软件套数超过
          <span class="buy-introduced-piece-tit" v-if="10 <= buyNum && buyNum < 20">10</span>
          <span class="buy-introduced-piece-tit" v-if="20 <= buyNum && buyNum < 30">20</span>
          <span class="buy-introduced-piece-tit" v-if="30 <= buyNum">30</span>
          套（含10套），可获得指导价折后优惠即约为
          <span class="buy-introduced-monny-tit" v-if="10 <= buyNum && buyNum < 20">2888</span>
          <span class="buy-introduced-monny-tit" v-if="20 <= buyNum && buyNum < 30">2788</span>
          <span class="buy-introduced-monny-tit" v-if="30 <= buyNum">2688</span>
          元/套
        </span>
      </p>
      <div class="introduced-detail-wrap">
        <h4 class="introduced-top">购买说明</h4>
        <p>1、购买一套软件即开通一家店铺的使用权</p>
        <p>2、凡购买正版云珠宝SaaS软件，可获取厂家免费的技术支持指导，包括邮件咨询、电话咨询（400-889-0211）、QQ远程服务咨询、在线技术知识查阅：<a href="http://www.yunzhubao.com/service/">http://www.yunzhubao.com/service/</a>，此处提供丰富的软件使用方法，及问题的排解处理方法。</p>
      </div>
    </div>
    <footer class="dredge-shop-footer">
      <p>
        <span>￥</span>
        <span>{{price * buyNum}}</span>
        <span>.00</span>
        <span>元（{{buyNum}}套）</span>
        <!-- <a href="javascript: void(0)">优惠立减500</a> -->
      </p>
      <p>
        原价：{{(unitPrice * this.buyNum).toFixed(2)}}元
      </p>
      <a class="immediately-open-shop" href="javascript: void(0)" @click="_operateGenerateOrder"></a>
    </footer>
  </div>
</template>
<script>
  import {operateGenerateOrder} from 'Api/commonality/operate'
  import {seekGetMoneyList} from 'Api/commonality/seek'
  export default {
    data () {
      return {
        changeSetMeal: 0,
        buyNum: 0, // 购买数量
        dataList: [],
        unitPrice: 0
      }
    },
    props: [
      'newPopup'
    ],
    computed: {
      price () {
        if (10 <= this.buyNum && this.buyNum < 20) {
          return this.dataList[0].price
        } else if (20 <= this.buyNum && this.buyNum < 30){
          return this.dataList[1].price
        } else if (this.buyNum >= 30) {
          return this.dataList[2].price
        }
        return this.unitPrice
      }
    },
    watch: {
      'newPopup': function (val) {
        console.log(val)
        if (val == true) {
          this.getMoneyList()
        }
      }
    },
    mounted () {
      this.getMoneyList()
    },
    methods: {
      getMoneyList () { // 获取短信套餐
        let options = {
          type: '1'
        }
        seekGetMoneyList(options).then((res) => {
          console.log(res)
          if (res.data.state == 200) {
            this.dataList = res.data.data.dataList
            this.unitPrice = res.data.data.price
          }
        }, (res) => {

        })
      },
      subtractNum () {
        // this.changeSetMeal = ''
        if (this.buyNum === 0) {
          return
        }
        this.buyNum -= 1
        switch (this.buyNum) {
          case 10:
            console.log('101')
            break;
          default:
            this.changeSetMeal = 10
            break;
        }
      },
      addNum () {
        // this.changeSetMeal = ''
        this.buyNum = Number(this.buyNum) + 1
        switch (this.buyNum) {
          case 10:
            this.changeSetMeal = 10
            break;
        }
      },
      changeSetMealData (parm) {
        this.buyNum = parm
      },
      _operateGenerateOrder () {
        let options = {
          dataList: [
            {
              num: this.buyNum,
              price: this.price,
              sale: (2988 - this.price) * this.buyNum,
              type: '02',
              buyUserId: sessionStorage.id
            }
          ],
          totalPrice: this.buyNum * this.price,
          // totalPrice: 0.01,
          totalSale: (2988 - this.price) * this.buyNum,
          totalNum: this.buyNum,
          remark: ''
        }
        operateGenerateOrder(options)
          .then(res => {
            console.log(res)
            if (res.data.state === 200) {
              this.$emit('setOrderNO', res.data.data.orderNo)
              this.$emit('toPageFun')
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
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
.dredge-shop-main{
  position: relative;
  width: 640px;
  height: 640px;
  background: url(~assets/img/buyShop/buy-shop-two-bg.png) no-repeat;
  background-size: 640px 640px;
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
  .dredge-shop-header{
    height: 122px;
    width: 100%;
    // background-color: #ccc;
    overflow: hidden;
    .shop-header-wrap{
      width: 380px;
      height: 66px;
      border-radius: 5px;
      margin: 51px auto 0 auto;
      background-color: #fff;
      box-shadow: 0 0 10px #ccc;
      .shop-header-left{
        float: left;
        margin-top: 20px;
        margin-left: 26px;
        p:first-child{
          font-size: 16px;
          line-height: 16px;
          color: #333;
        }
        p:last-child{
          font-size: 0;
          margin-top: 6px;
          span:first-child{
            font-size: 12px;
            color: #ff3b30;
          }
          span:last-child{
            font-size: 12px;
            line-height: 12px;
            color: #999;
          }
        }
      }
      .shop-header-right{
        float: right;
        margin-top: 20px;
        margin-right: 26px;
        i{
          vertical-align: top;
          display: inline-block;
          width: 26px;
          height: 26px;
          background-color: #fff;
          // border: 1px solid BD1;
          // border: 1px solid red;
          font-size: 18px;
          line-height: 22px;
          text-align: center;
          font-style:normal;
          border-radius: 5px;
          cursor: pointer;
        }
        .subtract-btn{
          border: 1px solid $B1;
          color: $font-color-neutral;
        }
        .add-btn{
          color: #fff;
          background-color: $main-color;
        }
        input{
          vertical-align: top;
          margin: 0 3px;
          width: 40px;
          height: 26px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 5px;
          text-align: center;
          color: $main-color;
          background-color: #f1f2f3;
        }
      }
    }
  }
  .shop-body-wrap{
    width: 580px;
    // height: 100px;
    margin: 20px auto 0 auto;
    h3{
      font-size: 14px;
      line-height: 14px;
      color: #333;
      margin-left: 26px;
      margin-bottom: 14px;
    }
    ul{
      font-size: 0;
      margin-left: 66px;
      li{
        position: relative;
        height: 96px;
        width: 126px;
        // border: 2px solid blue;
        display: inline-block;
        i{
          display: block;
          position: absolute;
          width: 52px;
          height: 52px;
          left: -10px;
          top: -8px;
          cursor: pointer;
          background: url('~assets/img/buyShop/default-shop-icon.png') no-repeat;
          background-size: 52px;
        }
        .change-shop-icon{
          background: url('~assets/img/buyShop/change-shop-icon.png') no-repeat;
          background-size: 52px;
        }
        .center-tit{
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          margin-top: 33px;
          height: 20px;
          text-align: center;
          span{
            color: #fff;
          }
          span:nth-child(1){
            font-size: 20px;
            line-height: 20px;
          }
          span:nth-child(2){
            font-size: 12px;
            line-height: 12px;
          }
        }
        .btn-tit{
          position: absolute;
          font-size: 14px;
          line-height: 14px;
          bottom: -10px;
          width: 100%;
          text-align: center;
          color: #333;
        }
      }
      li:nth-child(1){
        background: url('~assets/img/buyShop/set-meal-one.png') no-repeat;
        background-size: 126px 96px;
      }
      li:nth-child(2){
        margin: 0 35px;
        background: url('~assets/img/buyShop/set-meal-two.png') no-repeat;
        background-size: 126px 96px;
      }
      li:nth-child(3){
        background: url('~assets/img/buyShop/set-meal-three.png') no-repeat;
        background-size: 126px 96px;
      }
    }
    .buy-introduced{
      margin-top: 30px;
      font-size: 0;
      margin-left: 26px;
      i, span{
        vertical-align: top;
      }
      i{
        display: inline-block;
        width: 4px;
        height: 14px;
        margin-right: 10px;
      }
      .one-meal-introduced{
        background: url(~assets/img/buyShop/one-meal-introduced.png) no-repeat;
        background-size: 4px 14px;
      }
      .two-meal-introduced{
        background: url(~assets/img/buyShop/two-meal-introduced.png) no-repeat;
        background-size: 4px 14px;
      }
      .three-meal-introduced{
        background: url(~assets/img/buyShop/three-meal-introduced.png) no-repeat;
        background-size: 4px 14px;
      }
      .buy-introduced-piece-tit{
        color: #333;
        font-weight: 600;
      }
      .buy-introduced-monny-tit{
        color: #ff3b30;
        font-weight: 600;
      }
      span{
        font-size: 13px;
        line-height: 13px;
        color: #666;
      }
    }
    .introduced-detail-wrap{
      margin-top: 40px;
      margin-left: 26px;
      margin-right: 46px;
      .introduced-top{
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 20px;
        color: #333;
        font-weight: 600;
      }
      p{
        font-size: 13px;
        color: #999;
        margin-left: 20px;
      }
      p:nth-child(3){
        margin-top: 10px;
        line-height: 20px;
      }
      a{
        color: $main-color;
      }
    }
  }
  .dredge-shop-footer{
    position: absolute;
    bottom: 35px;
    left: 0;
    right: 0;
    width: 580px;
    height: 90px;
    margin: auto;
    padding-top: 24px;
    p{
      font-size: 0;
      margin-left: 26px;
      span:first-child{
        font-size: 14px;
        color: #333;
      }
      span:nth-child(2){
        font-size: 24px;
        line-height: 24px;
        font-weight: 600;
        color: #ff3b30;
      }
      span:nth-child(3){
        font-size: 14px;
        color: #ff3b30;
      }
      span:nth-child(4){
        font-size: 14px;
        color: #333;
      }
      a{
        margin-left: 16px;
        display: inline-block;
        width: 80px;
        height: 24px;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        background-color: #ffba42;
        border-radius: 5px;
        font-weight: 600;
      }
    }
    p:nth-child(2){
      font-size: 12px;
      line-height: 12px;
      color: #999;
      margin-top: 10px;
    }
    .immediately-open-shop{
      position: absolute;
      right: 22px;
      top: 24px;
      display: block;
      width: 178px;
      height: 68px;
      background: url(~assets/img/buyShop/immediately-open-shop.png) no-repeat;
      background-size: 178px 68px;
      // margin-right: 22px;
    }
  }
}
</style>
<template>
  <el-dialog class="dialog-w640-h640-hn" title="" :visible="isShow">
    <div class="buy-shop-index-main">
      <div class="one-step" v-if="cutData.one">
        <div class="one-step-body">
          <a href="javascript: void(0)" @click="_operateFreeCreateShop('two', 'one')"></a>
        </div>
        <i class="one-step-close" @click="closeBuyShop"></i>
      </div>
      <DredgeShop class="two-step" :newPopup="newPopup" v-if="cutData.two" @closeBuyShop="closeBuyShop" @setOrderNO="setOrderNO" @toPageFun="toPageFun('three', 'two')"></DredgeShop>
      <AffirmBuy v-if="cutData.three" :orderNO="orderNO" @closeBuyShop="closeBuyShop"></AffirmBuy>
<!--       <div class="four-step" v-if="cutData.four">
        第四页
        <a href="javascript: void(0)" @click="toShopList">进入店铺列表</a>
      </div> -->
    </div>
    <!-- 开通店铺总入口 -->
  </el-dialog>
</template>
<script>
  import DredgeShop from './DredgeShop'
  import AffirmBuy from './AffirmBuy'
  import {operateFreeCreateShop} from 'Api/commonality/operate'
  export default{
    props: ['newPopup', 'shopDataList'],
    components: {
      DredgeShop,
      AffirmBuy
    },
    data () {
      return {
        "cutData": {
          "one": true,
          "two": false,
          "three": false,
          "four": false
        },
        "isShow": false,
        "orderNO": ''
      }
    },
    watch: {
      'newPopup': function () {
        this.cutData.one = true
        this.cutData.two = false
        this.cutData.three = false
        this.isShow = this.newPopup
        if (this.shopDataList.length) {
          this.cutData.two = true
          this.cutData.one = false
        }
      },
      'isShow': function () {
        if (this.isShow === false) {
          this.$emit('closeBuyShop')
        }
      }
    },
    created () {
      this.isShow = this.newPopup
      if (this.shopDataList.length) {
        this.cutData.two = true
        this.cutData.one = false
      }
    },
    mounted () {
      
    },
    methods: {
      _operateFreeCreateShop () {
        let options = {
          userId: sessionStorage.id,
          companyId: sessionStorage.companyId,
          tokenId: sessionStorage.tokenId
        }
        let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao' : ''
        this.$http.post(`${serverHost}/v1/pay/freeCreateShop`, options)
          .then(res => {
            if (res.data.state === 200) {
              this.$emit('closeBuyShop', true)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          }, res => {
            
          });
        // operateFreeCreateShop(options)
        //   .then(res => {
        //     // this.$emit('closeBuyShop')
        //   })
      },
      closeBuyShop () {
        this.cutData.one = true
        this.cutData.two = false
        this.cutData.three = false
        this.$emit('closeBuyShop')
      },
      toPageFun (to, from) { // 去到的， 目前的
        this.cutData[to] = true;
        this.cutData[from] = false;
      },
      toShopList () {
        alert('购买成功啦，去到店铺列表')
      },
      setOrderNO (parm) {
        console.log(parm)
        this.orderNO = parm
      }
    }
  }
</script>
<style lang="scss">
.buy-shop-index-main{
  height: 640px;
  width: 640px;
  .one-step{
    height: 598px;
    width: 430px;
    margin: auto;
    .one-step-body{
      position: relative;
      height: 580px;
      width: 430px;
      background: url('./../../../assets/img/buyShop/buy-shop-one-bg.png') no-repeat;
      background-size: 430px 580px;
      a{
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 26px;
        margin: auto;
        line-height: 40px;
        color: #fff;
        width: 172px;
        height: 70px;
        margin-bottom: 46px;
        text-align: center;
        background: url('./../../../assets/img/buyShop/dredge-shop-btn.png') no-repeat;
        background-size: 172px 70px;
      }
    }
    .one-step-close{
      display: block;
      width: 24px;
      height: 24px;
      margin: auto;
      background: url('./../../../assets/img/close-icon-fff.png') no-repeat;
      background-size: 24px;
      cursor: pointer;
    }
  }
  .two-step{
    height: 640px;
    width: 640px;
    margin: auto;
  }
  .three-step{
    height: 300px;
    width: 200px;
    margin: auto;
    background-color: #000;
  }
  .four-step{
    height: 200px;
    width: 200px;
    margin: auto;
    background-color: #ccc;
  }
  // border: 1px solid red;
}
</style>
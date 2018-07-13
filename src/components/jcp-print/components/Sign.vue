<template>
  <div class="signClass">
    <template v-if="title == '入库'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
      <div v-show="status != '1' && status != '2'">
        <span class="person">审核人：__________</span>
      </div>
    </template>
    <template v-else-if="title == '修改'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
      <div v-show="status != '1' && status != '2'">
        <span class="person">审核人：__________</span>
      </div>
    </template>
    <template v-else-if="title == '退库'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
      <div v-show="status != '1' && status != '2'">
        <span class="person">审核人：__________</span>
      </div>
    </template>
    <template v-else-if="title == '调库'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
      <div v-show="status == '5' || status == '6'">
        <span class="person">收货人：__________</span>
      </div>
    </template>
    <template v-else-if="title == '发货'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
      <div v-show="status != '1' && status != '2'">
        <span class="person">审核人：__________</span>
      </div>
      <div v-show="status == '5' || status == '6'">
        <span class="person">收货人：__________</span>
      </div>
    </template>
    <template v-else-if="title == '调柜'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
    </template>
    <template v-else-if="title == '退货'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
      <div v-show="status != '1' && status != '2'">
        <span class="person">审核人：__________</span>
      </div>
      <div v-show="status == '5' || status == '6'">
        <span class="person">收货人：__________</span>
      </div>
    </template>
    <template v-else-if="title == '销售'">
      <div>
        <span class="person">制单人：__________</span>
      </div>
      <div>
        <span class="person">销售员：__________</span>
      </div>
      <div v-show="status == '6' || status == '7'">
        <span class="person">收银员：__________</span>
      </div>
    </template>
  </div>
</template>
<script>
  import {
    seekReceiptStatusList
  } from 'Api/commonality/seek'
  export default {
    props: ["title"],
    data() {
      return {
        status:"1" //1:待审核，2:审核中，3:已审核，4:待收货，5:已收货，6:锁定，7:已收银，8:待收银
      }
    },
    created() {
      console.log(this.$route.query.orderNumber);
      seekReceiptStatusList({
        orderId: this.$route.query.orderNumber
      }).then((res) => {
        this.status = res.data.data.nowStatus;
      })
    }
  }

</script>
<style lang="less" scoped>
  .signClass {
    width: 100%;
    display: table;
    float: right;
    padding: 30px 0px 20px 0px;
    >div {
      margin: 0 10px;
      position: relative;
      display: inline;
      float: right;
      span {}
    }
  }

</style>

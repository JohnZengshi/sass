<template>
  <div class="serve-user-data-list-main">
    <!--表头 start-->
    <data-grid-header :detailDataGridColumn="detailDataGridColumn"></data-grid-header>

    <!--表格 start-->
    <data-grid-body ref="data_grid_body_wrap" :userData="userData" @updateData="updateCheckData"></data-grid-body>

    <div class="footer">
      <div class="btn" @click="_operateAddAfterProduct">保存</div>
    </div>
  </div>
</template>
<script>
let configData = require('../config/add.js')
import dataGridHeader from './dataGridHeader'
import dataGridBody from './data-grid-body'
import {operateAddAfterProduct} from 'Api/commonality/operate'

export default {
  components: {
    dataGridHeader,
    dataGridBody
  },
  props: ['userData'],
  data () {
    return {
      checkData: [],
      detailDataGridColumn: configData.detailConfing,
    }
  },
  methods: {
    initCheck (parm) {
      this.$refs.data_grid_body_wrap.initCheck(parm)
    },
    updateCheckData (parm) {
      this.checkData = parm
    },
    _operateAddAfterProduct () {
      let options = {
        productList: [],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId,
        memberId: this.userData.memberId
      }
      debugger
      // for (let i of this.checkData) {
      //   options.productList.push(this.userData.orderList[i])
      // }
      for (let i of this.userData.orderList) {
        for (let j of i.productList) {
          if (this.checkData.includes(j.productId)) {
            j.type = i.orderType
            options.productList.push(j)
          }
        }
      }
      console.log('options.productList', options)
      debugger
      for (let i of options.productList) {
        if (i.productId.indexOf('tProductId') != -1) {
          i.productId = ''
        }
      }
      operateAddAfterProduct(options)
        .then(res => {
          if (res.data.state == 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('close')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.serve-user-data-list-main{
  height: 530px;
  margin-top: 26px;
  .footer {
      margin-top: 20px;
      .btn {
          width: 150px;
          height: 28px;
          border-radius: 4px;
          background:#2993f8;
          color:#fff;
          font-size: 14px;
          text-align: center;
          font-weight: bold;
          line-height: 28px;
          margin: 0 auto;
      }
  }
}
</style>
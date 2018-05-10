<template>
   <!-- 备注弹窗 -->
    <el-dialog :visible.sync="remarkDialog" customClass="remarkDig">
        <div class="remark-body">
            <div class="title">
                <img src="~static/img/piliang.png">
                <div>备注</div>
            </div>
            <div class="body">
                <textarea placeholder="请输入文字..." v-model="remarkText" class="area"></textarea>
            </div>
            <div class="footer">
                <div class="btn" @click="_operateUpdateServiceByNum">确定</div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import { operateUpdateServiceByNum } from 'Api/commonality/operate'
export default {
    data () {
        return {
            currentData: {},
            remarkText: '',
            remarkDialog: false
        }
    },
    methods: {
        open (parm) {
            this.remarkDialog = true
            this.currentData = parm
            this.remarkText = parm.remark
        },
        _operateUpdateServiceByNum () {
          debugger
          let options = {
            dataList: [
              {
                operateType: '5',
                objectData: this.remarkText,
                productId: this.currentData.productId
              }
            ],
            orderNum: this.$route.query.orderNumber,
            shopId: this.$route.query.shopId
          }
          operateUpdateServiceByNum(options)
            .then(res => {
              if (res.data.state == 200) {
                this.$message({
                  message: '修改备注成功',
                  type: 'success'
                })
                this.$emit('_seekProductListByService')
                this.remarkDialog = false
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
              }
            })
        }
        // _operateUpdateSell (type, dataType, value) { // type = 操作类型 dataType = 数据类型 value = 值
        //   let options = {
        //     orderNum: this.$route.query.orderNumber,
        //     barcode: this.currentData.barcode,
        //     modifyList: [
        //       {
        //         modifyType: 18,
        //         dataType: 1,
        //         objectData: this.remarkText
        //       }
        //     ]
        //   }
        //   operateUpdateSell(options)
        //     .then((res) => {
        //       if (res.data.state == 200) {
        //         this.$message({
        //           message: '修改成功',
        //           type: 'success'
        //         });
        //         eventBus.$emit('update-data-sell-List')
        //         this.remarkDialog = false
        //         // this.$emit('messageBack', '成功')
        //       } else {
        //         this.$message({
        //           message: res.data.msg,
        //           type: 'warning'
        //         });
        //       }
        //     }, (res) => {
        //       this.$message({
        //         message: res.data.msg,
        //         type: 'warning'
        //       });
        //     })
        // }
    }
}
</script>
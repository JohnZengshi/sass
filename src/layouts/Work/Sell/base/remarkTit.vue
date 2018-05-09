<template>
  <div class="remark-tit-main" :style="boundingData" @mouseenter="seekRemark" @mouseleave="remarkLeave">
   <!--  <textarea v-if="status != 1" maxLength="50" v-model="showData.remarks" @blur="_operateUpdateSell"></textarea>
    <p v-else class="remark-inner-tit">{{showData.remarks ? showData.remarks : '无'}}</p>
    <i class="triangle-icon"></i> -->
    <p class="remark-inner-tit" :class="{'t-a-c': !showData.remarks}">{{showData.remarks ? showData.remarks : '无备注'}}</p>
    <i class="triangle-icon"></i>
  </div>
</template>
<script>
import { operateUpdateSell } from 'Api/commonality/operate'
export default {
  data () {
    return {
      status: 1,
      boundingData: {
        left: 0,
        top: 0,
        display: 'none'
      },
      showData: {
        remarks: ''
      },
      isMove: false // 是否在物体上移动
    }
  },
  methods: {
    open (parm) {
      this.boundingData = parm.boundingData
      this.showData = parm.showData
      this.status = parm.status
    },
    _operateUpdateSell (type, dataType, value) { // type = 操作类型 dataType = 数据类型 value = 值
      let options = {
        orderNum: this.$route.query.orderNumber,
        barcode: this.showData.barcode,
        modifyList: [
          {
            modifyType: 18,
            dataType: 1,
            objectData: this.showData.remarks
          }
        ]
      }
      operateUpdateSell(options)
        .then((res) => {
          if (res.data.state == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$emit('messageBack', '成功')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        }, (res) => {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          });
        })
    },
    seekRemark () {
      this.isMove = true
    },
    /* 鼠标移开后 */
    remarkOut () {
      if (!this.isMove) {
        this.initBounding()
      }
    },
    initBounding () {
      this.boundingData = {
        left: 0,
        top: 0,
        display: 'none'
      }
      this.isMove = false
    },
    remarkLeave () {
      this.initBounding()
    }
  }
}
</script>
<style lang="scss" scoped>
.remark-tit-main{
  position: fixed;
  padding: 6px 6px;
  border-radius: 5px;
  z-index: 1000;
  min-width: 50px;
  background-color: rgb(127, 127, 127);
  transition: display 1s;
  span{
    font-size: 14px;
    color: #fff;
    vertical-align:top;
  }
  textarea{
    border-radius: 5px;
    padding: 4px 4px;
    font-size: 12px;
    height: 55px;
    display: inline-block;
    color: #fff;
    background-color: rgb(98, 99, 98);
  }
  .triangle-icon{
    position: absolute;
    top: -15px;
    left: 20px;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom: 10px solid rgb(127, 127, 127);
  }
  .remark-inner-tit{
    border-radius: 5px;
    font-size: 12px;
    max-width: 160px;
    text-align: center;
    color: #fff;
  }
  .t-a-c{
    text-align: center!important;
  }
}
</style>
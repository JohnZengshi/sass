<!-- 输入范围值 -->
<template>
  <div class="input-scope-main">
    <div class="e-border-radio-5">
      <el-checkbox v-model="printNum.allChecked" @change="changeAllChecked">全部</el-checkbox>
    </div>

    <div title="打印行范围" class="l-p-range-box">
      <input type="text" @blur="amendNum" placeholder="打印行范围" v-model="printNum.beginNum">
      <span>至</span>
      <input type="text" @blur="amendNum" placeholder="打印行范围" v-model="printNum.endNum">
    </div>
  </div>
</template>
<script>
  export default {
    props: ['dataLength'], // 数据总长度
    data () {
      return {
        printNum: { // 打印行数
          allChecked: false, // 全部选中
          beginNum: '',
          endNum: '',
        },
      }
    },
    methods: {
      // 全选
      changeAllChecked (parm) {
        if (this.printNum.allChecked) {
          this.printNum.beginNum = 1
          this.printNum.endNum = this.dataLength
        } else {
          this.printNum.beginNum = ''
          this.printNum.endNum = ''
        }
        this.$emit('amendNum', this.printNum)
      },
      // 改变数据
      amendNum () {
        if (this.printNum.allChecked || this.printNum.beginNum && this.printNum.endNum) {
          this.$emit('amendNum', this.printNum)
        }
      },
    }
  }
</script>
<style lang="scss">
.input-scope-main{
  font-size: 0;
  .e-border-radio-5{
    height: 28px;
    padding-bottom: 20px;
    font-size: 14px;
    vertical-align: top;
  }
  .l-p-range-box {
    display: inline-block;
    position: relative;
    cursor: pointer;
    vertical-align: top;
    margin-left: 16px;
    width: 180px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    padding-left: 10px;
    background-color: #fff;
    input {
        width: 68px;
        height: 100%;
        font-size: 12px;
        float: left;
        text-align: center;
    }
    span {
        float: left;
        margin: 0 4px;
        color: #666;
        font-size: 14px;
        line-height: 26px;
    }
  }
}
</style>
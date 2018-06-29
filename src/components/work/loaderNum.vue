<template>
  <span class="loaderNum">
    <span>{{pageSize}}</span>
    <span v-if="Number(pageSize)">条</span>
    <el-radio-group class="floatBox" v-model="pageSize" @change="changeUpdataPageSize">
      <ul>
        <li>
          <el-radio label="30">30</el-radio>
        </li>
        <li>
          <el-radio label="50">50</el-radio>
        </li>
        <li>
          <el-radio label="100">100</el-radio>
        </li>
        <li>
          <el-radio label="所有">所有</el-radio>
        </li>
      </ul>
    </el-radio-group>
  </span>
</template>
<script>
  export default {
    data() {
      return {
        // 选择更新页数
        pageSize: "30",
      }
    },
    methods:{
        changeUpdataPageSize(val){
            this.pageSize = val
            this.$emit("changeUpdataPageSize",this.pageSize)
        }
    }
  }

</script>
<style lang="less" scoped>
  .loaderNum {
    height: 25px !important;
    position: absolute;
    right: -70px;
    width: 52px;
    background-color: #fff;
    border: 1px solid #ededed;
    border-radius: 5px;
    text-align: center;
    z-index: 9999;
    >span {
      &:first-of-type {
        color: #2993f8
      }
    }
    &:hover {
      &:after {
        opacity: 0 !important;
      }
      overflow: visible !important;
      >.floatBox {
        opacity: 1;
        top: -125px;
        display: block;
      }
    }
    .floatBox {
      width: 100px;
      background-color: #fff;
      border-radius: 10px;
      position: absolute;
      opacity: 0;
      top: -100px;
      left: -33px;
      transition: all 0.5s;
      display: none;
      ul {
        width: 100%;
        li {
          height: 20px;
          margin: 10px;
          text-align: center;
        }
      }
    }
  }

</style>

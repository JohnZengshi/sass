<template>
  <span class="loaderNum radio-21">
    <span>{{pageSize == '0'?"所有":pageSize}}</span>
    <span v-if="Number(pageSize)">条</span>
    <div class="Box">
      <el-radio-group class="floatBox" v-model="pageSize" @change="changeUpdataPageSize">
        <ul>
          <li :class="{active:(pageSize == '30')}">
            <el-radio label="30">30条</el-radio>
          </li>
          <li :class="{active:(pageSize == '50')}">
            <el-radio label="50">50条</el-radio>
          </li>
          <li :class="{active:(pageSize == '100')}">
            <el-radio label="100">100条</el-radio>
          </li>
          <li :class="{active:(pageSize == '0')}">
            <el-radio label="0">所有</el-radio>
          </li>
        </ul>
      </el-radio-group>
    </div>
  </span>
</template>
<script>
  export default {
    data() {
      return {
        // 选择更新页数
        pageSize: "50",
      }
    },
    methods: {
      changeUpdataPageSize(val) {
        this.pageSize = val
        this.$emit("changeUpdataPageSize", this.pageSize)
      }
    }
  }

</script>
<style lang="less" scoped>
  .loaderNum {
    cursor: pointer;
    height: 25px !important; // position: absolute;
    // right: -70px;
    // width: 52px;
    background-color: #fff; // border: 1px solid #ededed;
    // border-radius: 5px;
    text-align: center; // z-index: 9999;
    overflow: visible !important;
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
      >.Box {
        display: block;
        .floatBox {
          opacity: 1;
          display: block;
          z-index: 9999;
        }
      }
    }
    .Box {
      position: absolute;
      bottom: 0;
      left: 50px;
      width: 90px;
      display: none;
      .floatBox {
        width: 90px;
        background-color: #fff; // border-radius: 10px;
        // position: absolute;
        opacity: 0; // bottom: 0;
        // left: 8px;
        transform: translateX(5px);
        transition: all 0.5s; // display: none;
        box-shadow: 0 0 15px #ddd;
        ul {
          width: 100%;
          li {
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: relative;
            &:hover{
              background-color: #F6F7F8;
            }
            &.active {
              &::before {
                width: 3px;
                height: 100%;
                background-color: #2993f8;
                display: inline-block;
                // float: left;
                position: absolute;
                left: 0;
                content: "";
              }
            }
          }
        }
      }
    }
  }

</style>

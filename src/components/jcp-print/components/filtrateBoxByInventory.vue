<template>
<!-- 库存打印筛选条件 -->
  <div>
    <template>
      <div class="explain-box" v-if="
          (headerData.repositoryName != '') ||
          (headerData.shopName != '') ||
          (headerData.counterName != '') ||
          (headerData.productClass != '')">
        <div v-show="headerData.repositoryName">库位名称：{{headerData.repositoryName}}
        </div>
        <div v-show="headerData.shopName">店铺名称：{{headerData.shopName}}
        </div>
        <div v-show="headerData.counterName">柜组名称：{{headerData.counterName}}
        </div>
        <div v-show="headerData.productClass">商品属性：{{headerData.productClass == "1"?"成品":"旧料"}}
        </div>
      </div>
    </template>
  </div>

</template>
<script>
  export default {
    props: ["headerData","tabTitle","reportType"]
  }

</script>
<style lang="less" scoped>
  .explain-box {
    width: 100%;
    border: 1px solid;
    border-top: none;
    border-bottom: none;
    padding: 10px 5px;
    box-sizing: border-box;
    div {
      display: inline-block;
      width: 33%;
      margin-bottom: 10px;
      &:nth-last-of-type(3),
      &:nth-last-of-type(2),
      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }
  }

</style>


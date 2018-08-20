<template>
  <div class="sort-table-main">
    <label>排序:</label>
    <div v-for="(item, index) in sortList">
      {{item.name}}
      <img v-if="item.value == '2'" src="~static/img/sort/down1.png">
      <img v-if="item.value == '1'" src="~static/img/sort/up1.png">
      <i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['sortList'],
    methods: {
      cancelSort(item, index) {
        this.$emit('cancelSort', {
          item: item,
          index: index
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.sort-table-main {
    float: left;
    height: 50px;
    width: auto;
    margin-left: 20px;
    label {
        height: 50px;
        width: 30px;
        font-size: 12px;
        color:#2993f8;
        font-weight: bold;
        float: left;
        line-height: 50px;
        margin-right: 10px;
    }
    &>div {
        //float: left;
        margin-top: 11px;
        display: inline-block;
        padding: 6px;
        font-size: 12px;
        color:#585858;
        background:#f5f5f5;
        border-radius: 4px;
        margin-right: 10px;
        position: relative;
        &>i {
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 10px;
        width: 10px;
        height: 10px;
        cursor: pointer;
        display: none;
        color:#2993f8;
        }
    }
    &>div:hover {
        background:#e0ecf8;
        color:#2993f8;
        &>i {
        display: block;
        }
    }
}
</style>
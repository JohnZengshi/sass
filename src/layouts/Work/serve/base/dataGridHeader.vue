<template>
<!--表头-->
<div class="ui-table_column">
  <div class="ui-table_th" v-for="tab in detailDataGridColumn" :style="tableCell(tab.width)">
    {{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
  </div>
</div>
</template>

<script>

export default {
  props: ['detailDataGridColumn'],
  data () {
      return {
        isOld: '1',
        sortList: [{classTypeName: '1'}]
      }
  },
  methods: {
    tableCell( width ){
      let _size = {
        width: width + 'px'
      }
      return _size
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-table_column{
    height: 40px;
    background-color: #f5f5f5;
    //overflow: hidden;
    display: flex;
    position: relative;
    width: 100%;
    // margin-top: -40px;
    
    &:after {
        content: "";
        height:2px;
        width: 100%;
        background:#e7e7e7;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
    }
    // .ui-table_th:first-child{
    //   padding-left: 14px;
    // }
    // .ui-table_th:last-child{
    //   padding-left: 14px;
    // }
    .ui-table_th{
        display:inline-block;
        line-height: 40px;
        text-align: center;
        color: #686868;
        font-size:12px;
        float: left;
        font-weight: bold;
        transition: all .1s;
        white-space: nowrap;
        text-overflow: ellipsis;
        
        >i{
          font-style:normal;
          color: #999;
          font-weight: normal;
          font-size: 10px;
        }
        &>em {
            // line-height: 38px;
            // font-size: 14px;
            color:#2993f8;
        }
    }
}

</style>
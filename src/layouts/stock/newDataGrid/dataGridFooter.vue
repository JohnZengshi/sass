<template>
<!--表尾-->
<div class="xj-report-table-footer">
	<div class="th_footer" v-for="(tab,f) in detailDataGridColumn" 
		:style="_calculateClass(tab)" :key="f">
  		<p class="totalNum" v-html="v_html(tab)"></p>
      <p class="total-more" v-if="f == 0" style="font-weight: bold;">合计</p>
	</div>
</div>
</template>

<script>
import {calculateClass} from 'assets/js/getClass'
export default {
	props : ['detailDataGridColumn','dataGridStorage','tabCell', 'reportType'],
	
	methods:{
    _calculateClass (parm) {
      return calculateClass(parm)
    },
		v_html( tab ){
        if( tab.type =='' ) return ''
        // if( this.dataGridStorage[tab.type] == ''){
        //   return '<em style=\'color:#333\'>-</em>'
        // }
        //小数点截取 ，合计精确到3位
        if( tab.toFixed ){
          return this.toFixed( this.dataGridStorage[tab.type] , tab.countCut + 1)
        }else{
          return this.dataGridStorage[tab.type]
        }
    }
	}
}
</script>

<style lang="scss" scoped>
.ui-table_footer{
  background:#2993f8;
  height: 40px;
  .th_footer{
    height: 40px;
    position: relative;
    
    .total-more{
      position:absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      line-height: 40px;
      font-weight: bold;
      color: #fff; 
      font-size: 14px; 
      font-weight: bold;
    }
    
    .totalNum{
      padding-top: 0;
      line-height: 40px;
      height: auto;
      color:#fff;
      font-weight: bold;
    }
  }
}
</style>
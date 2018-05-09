<template>
<!--表尾-->
<div class="ui-table_footer">
	<div class="th_footer" v-for="(tab,f) in detailDataGridColumn" :key="f"
		:style="tableCell(tab.width)">
      <p class="total-more" v-if="f == 0 ">合计</p>
       <!-- <p class="total-more" v-if="f == 0 && reportType != 1">合计</p> -->
      <p class="totalNum" v-html="v_html(tab)"></p>
	</div>
</div>
</template>

<script>
export default {
	props : ['detailDataGridColumn','dataGridStorage','tabCell', 'reportType'],
	
	methods:{
		tableCell( width ){
			//console.log('合计数据变化：',this.detailDataGridColumn);
			let _size = ''
			
			this.$emit('tabCell',{
				width : width,
				res :( res ) =>{
					_size = res
				}
			})
			return _size
        },
		v_html( tab ){
        if( tab.type =='' ) return ''
        if( this.dataGridStorage[tab.type] == ''){
          return '<em style=\'color:#333\'>-</em>'
        }
        //小数点截取 ，合计精确到3位
        if( tab.toFixed ){
          console.log(this.toFixed( this.dataGridStorage[tab.type] , tab.countCut));
          return this.toFixed( this.dataGridStorage[tab.type] , tab.countCut)
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
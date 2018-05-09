<template>
<!--表尾-->
<div class="ui-table_footer footer_class">
	<div class="th_footer" v-for="(tab,f) in detailDataGridColumn" 
		:key="tab.id" 
		:style="tableCell(tab.width)">
		<p class="totalNum" v-html="v_html(tab)"></p>
        <p class="total-more" v-if="f == 2">合计</p>
	</div>
  <div v-if="reportType == 3" class="th_footer" style="width: 8%;"></div>
</div>
</template>

<script>
export default {
	props : ['detailDataGridColumn','dataGridStorage','tabCell', 'reportType'],
	
	methods:{
		tableCell( width ){
			
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
  .th_footer{
    position: relative;
    .total-more{
      position:absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      line-height: 55px;
      font-weight: bold;
      color: #ff3b30; 
      font-size: 14px; 
    }
    
    .totalNum{
      padding-top: 0;
      line-height: 55px;
      height: auto;
    }
  }
}
.footer_class {
  background-color: #2993f8;
  height: 40px;
  position: absolute;
  bottom: -20px;
  left: 0;
  display: flex;
  border-radius: 0 0 10px 10px;
  width: 100%;
  .th_footer{
    .total-more{
      line-height: 40px;
    }
    
    .totalNum{
      line-height: 40px;
    }
  }
}
</style>
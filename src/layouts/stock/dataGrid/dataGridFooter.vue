<template>
<!--表尾-->
<div class="ui-table_footer">
	<div class="th_footer" v-for="(tab,f) in detailDataGridColumn" 
		:key="tab.id" 
		:style="tableCell(tab.width)">
  		
  		<p class="totalNum" v-html="v_html(tab)"></p>
        <p class="total-more" v-if="f == 2">合计</p>
	</div>
</div>
</template>

<script>
export default{
	props : ['detailDataGridColumn','dataGridStorage','tabCell'],
	
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
</style>
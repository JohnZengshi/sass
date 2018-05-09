<template>
<!--表尾-->
<table class="table-print-wrap">
	<tr>
		<td class="table-print-footer-td" v-for="(tab,f) in detailDataGridColumn"
		 :style="f==0?tableCell(detailDataGridColumn[0].width+detailDataGridColumn[1].width+detailDataGridColumn[2].width+3):tableCell(tab.width)"
		 v-if="f<1||f>2"
		 :key="f"
		 >
		 <div :style="tableCell(tab.width)">
  			<p class="totalNum" v-html="v_html(tab)"></p>
  			<p class="total" v-if="f == 0">合计</p>
			</div>
		</td>
	</tr>
</table>
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
// .ui-table_footer{
//   background:#2993f8;
//   height: 40px;
//   .th_footer{
//     height: 40px;
//     position: relative;
    
//     .total-more{
//       position:absolute;
//       left: 0;
//       top: 0;
//       width: 100%;
//       height: 100%;
//       line-height: 40px;
//       font-weight: bold;
//       color: #fff; 
//       font-size: 14px; 
//       font-weight: bold;
//     }
    
//     .totalNum{
//       padding-top: 0;
//       line-height: 40px;
//       height: auto;
//       color:#fff;
//       font-weight: bold;
//     }
//   }
// }
</style>
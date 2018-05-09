<template>
<!--表尾-->
<table class="table-print-wrap 1">
	<tr>
		<td class="table-print-footer-td" 
		    :style="tableCell(tab.width)"
		    v-for="(tab,f) in detailDataGridColumn"
			:key="tab.id" >
			<div  :style="tableCell(tab.width)">
				<p class="totalNum">&nbsp;{{tab.type =='' ? '' : toFixed(dataGridStorage[tab.type],3) }} 
				    <!--<i v-if="tab.footerUnit !=''">{{ tab.footerUnit}}</i>--></p>
				<p class="total" v-if="tab.totalName !=''" v-text="tab.totalName"></p>
			</div>
		</td>
	</tr>
</table>
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
        }
	}
}
</script>

<style scoped lang="scss">

	td{
		i{
			font-style:normal;
			font-size: 6pt;
			color: #999;
		}
		
		.totalNum{
			white-space: nowrap;
		}
	}

</style>
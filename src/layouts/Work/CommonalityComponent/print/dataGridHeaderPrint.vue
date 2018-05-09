<template>
<!--表头-->
<table class="tab-header">
	<tr class="tr-header">
		<td v-for="tab in detailDataGridColumn" :key="tab.id">
			<div :style="tableCell(tab.width)">{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i></div>
		</td>
	</tr>
</table>
</template>

<script>
export default{
	props : ['detailDataGridColumn','tabCell'],
	
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
	.tr-header > td {
		border: 0.5mm solid #333;
		font-size: 8pt;
		text-align: center;
		height: 8mm;
		padding: 0;
		border-bottom-width: 0;
		
		i{
			font-style:normal;
			font-size: 6pt;
			color: #999;
		}
	}
	
	.tab-header{
		border-collapse: collapse;
		width: 100%;
	}

</style>
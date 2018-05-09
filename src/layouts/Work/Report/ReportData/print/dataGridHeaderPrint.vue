<template>
<!--表头-->
<table class="tab-header">
	<tr class="tr-header">
		<td v-for="tab in detailDataGridColumn"  :key="tab.id" :style="setSize(tab.width)">
			<div class="td-header-elem" :style="setSize(tab.width)">{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i></div>
		</td>
	</tr>
</table>
</template>

<script>
export default {
	props : ['detailDataGridColumn'],
	
	methods:{
		setSize( w ){
           return{
             width : typeof w === 'number' ? ( w + 'px') : w.includes('%') ? w : w + 'px'
           }
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
		
		.td-header-elem{
		  word-break: break-word;
		}
	}
	
	.tab-header{
		border-collapse: collapse;
		width: 100%;
	}

</style>
<template>
<!--表尾-->
<table class="table-print-wrap">
	<tr>
		<td class="table-print-footer-td" v-for="(tab,f) in detailDataGridColumn" 
			:key="tab.id" 
			:style="setSize(tab.width)">
			<p class="totalNum">
			    {{tab.type =='' ? '' : toFixed(dataGridStorage[tab.type],3)}} </p>
			<p class="total-more" v-if="f == 2">合计</p>
		</td>
	</tr>
</table>
</template>

<script>
export default{
	props : ['detailDataGridColumn','dataGridStorage'],
	
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

</style>
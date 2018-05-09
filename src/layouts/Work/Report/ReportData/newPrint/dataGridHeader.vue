<template>
<!--表头-->
<table class="tab-header">
	<tr class="tr-header">
		<td  v-for="(tab, f) in detailDataGridColumn" 
			:style="tableCell(tab.width)"
			:key="f"
		>
			<div :style="tableCell(tab.width)">
				{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
			</div>
		</td>
	</tr>
</table>
</template>

<script>
export default {
	props : ['detailDataGridColumn','tabCell'],
	data () {
        return {
            isOld: '1'
        }
    },
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
		// setSize( w ){
        //    return{
        //      width : typeof w === 'number' ? ( w + 'px') : w.includes('%') ? w : w + 'px'
        //    }
        // }
	}
}
</script>

<style lang="scss" scoped>
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
		div {
			// width: 100%;
			margin: 0 auto;
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
<template>
<!--表头-->
<table class="tab-header">
	<tr class="tr-header">
		<td  v-for="(tab, f) in detailDataGridColumn" 
			:style="tableCell(tab.width)"
			:key="f"
		>
			<div class="word-wrap-td" :style="tableCell(tab.width)">
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
		
		.td-header-elem{
		  word-break: break-word;
		}
	}
	
	.tab-header{
		border-collapse: collapse;
		width: 100%;
	}
// .ui-table_column{
//     height: 40px;
//     background-color: #f5f5f5;
//     //overflow: hidden;
//     display: flex;
//     position: relative;
//     width: 100%;
//     margin-top: -40px;
//     &:after {
//         content: "";
//         height:2px;
//         width: 100%;
//         background:#e7e7e7;
//         position: absolute;
//         bottom: 0;
//         left: 0;
//         z-index: 2;
//     }
//     .ui-table_th{
//         display:inline-block;
//         line-height: 40px;
//         text-align: center;
//         color: #686868;
//         font-size:12px;
//         float: left;
//         font-weight: bold;
//         transition: all .1s;
//         white-space: nowrap;
//         text-overflow: ellipsis;
        
//         >i{
//           font-style:normal;
//           color: #999;
//           font-weight: normal;
//           font-size: 10px;
//         }
//     }
// }

</style>
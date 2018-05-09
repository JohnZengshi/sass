<template>
<!--表格内容区-->
<!--明细-->
<table class="table-print-wrap" ref="tableContainer" v-if="reportType == 1">
	<div>
		<tr class="tb-tr" v-for="(tb,index) in tempArray">
			<td class="tb-td"
				v-for="tab in detailDataGridColumn" 
				:style="tableCell(tab.width)" 
			>
			 <div class="word-wrap-td" :style="tableCell(tab.width)" v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"></div>
			</td>
		</tr>
		<div v-if="isDate" class="no-data"></div>
	</div>
</table>
	
<table class="table-print-wrap" ref="tableContainer" v-else-if="reportType == 2 || reportType == 4">
	<div>
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)">
			<div v-for="(tb, index) in caty.productTypeList" >
				<tr class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()">
					<template v-for="tab in detailDataGridColumn">
						<td :rowspan="tb.detailList.length" class="tb-td category-td"
							:colspan="index1 >=1 ? '2' : '0' "
							v-if="tab.text == '产品类别' && index1 == 0"
							:style="tableCell(tab.width)" >
							<div class="word-wrap-td" :style="tableCell(tab.width)">
							 <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i>
							</div>
						</td>
						<td class="tb-td category-td"
							:rowspan="lengthArr[ind]"
							v-else-if="tab.text == '位置名称' && index == 0 && index1 == 0"
							:style="tableCell(tab.width)"
						>	
						  <div class="word-wrap-td" :style="tableCell(tab.width)">
							 <i style="background: #fff; width: 100%;">{{caty[tab.childType]}}</i>
							</div>
						</td>
						<td class="tb-td"
							v-if="tab.text != '产品类别'  && tab.text != '位置名称' "
							:class="{backLine:tab.childType != ''}"
							:style="tableCell(tab.width)" 
							>
							<div class="word-wrap-td" :style="tableCell(tab.width)" v-text = "tab.childType == ''? getIndex() : tb1[tab.childType]"></div>
						</td>
					</template>
				</tr>
				<tr class="tb-total" style="background:#e9f4fe;" v-if="!positionSwitch"><!-- 类型小计 -->
					<td class="tb-td"
						v-for="(tab,f) in detailDataGridColumn" 
						:style="tableCell(tab.width)"
						
					>
					 <div class="word-wrap-td" :style="tableCell(tab.width)" v-html = "f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(tb[tab.totalType], tab.countCut) : tb[tab.totalType]"></div>
					</td>
				</tr>
			</div>
			<tr class="tb-total" style="background:#e9f4fe;" v-if="positionSwitch"> <!-- 位置小计 -->
				<td class="tb-td"
					v-for="(tab,f) in detailDataGridColumn" 
					:style="tableCell(tab.width)" 
					v-html = "f == 1 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"
				>
				  <div class="word-wrap-td" :style="tableCell(tab.width)"
				</td>
			</tr>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</table>

<!--产品分类-->
<table class="table-print-wrap" ref="tableContainer" v-else-if="reportType == 3">
	<div>
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)">
			<tr class="tb-tr" v-for="(tb, index) in caty.productTypeList" :index="addIndex()">
				<template v-for="(tab, index1) in detailDataGridColumn">
					<td class="tb-td category-td"
						v-if="tab.text == '产品类别' && index == 0" 
						:style="tableCell(tab.width)"
						
						>
						<div class="word-wrap-td" :style="tableCell(tab.width)" v-text="tb[tab.childType]"></div>
						<!-- <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i> -->
					</td>
					<td class="tb-td category-td"
						:rowspan="positionSwitch ? caty.productTypeList.length : 0"
						v-else-if="tab.text == '位置名称' && index == 0"
						:style="tableCell(tab.width)"
					>	
					 <div class="word-wrap-td" :style="tableCell(tab.width)">
						<i :style="'height:'+ caty.productTypeList.length * 50 +'px;  color: #2993f8; background:#fff;'">{{caty[tab.childType]}}</i>
						</div>
					</td>
					<td class="tb-td"
						v-else-if="tab.text != '位置名称' "
						:style="tableCell(tab.width)" 
						>
						<div class="word-wrap-td" :style="tableCell(tab.width)" v-text = "tab.childType == ''? getIndex() : tb[tab.childType]"></div>
					</td>
				</template>
			</tr>
			
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</table>
</template>

<script>
let applyIndex = 0
export default {
	data(){
		return{
			isDate : false,
			tempArray : [],
			heightArr: [],
			lengthArr: [],
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType', 'positionSwitch'],
	
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.cheackData()
			this.storageFormatDate()
			//console.log(1111)
			this.tabCellHeight()
		},
	},
	mounted () {
    let _this = this
		this.$nextTick(()=>{
			
			if( this.dataGridStorage.detailList ){
				this.tempArray = []
				this.cheackData()
				this.storageFormatDate()
			}
			_this.$emit('lazyloadSend',123 )
		})
		this.tabCellHeight()
	},
	methods:{
		//重置index
	    resetIndex( index ){
         if( index == 0 ) applyIndex = 0
        },
        //
        addIndex(){
         applyIndex++
        },
        getIndex(){
		  this.$emit('getIndex',applyIndex)
		  //console.log(applyIndex)
          return applyIndex
        },
		tabCellHeight () {
			this.heightArr = []
			this.lengthArr = []
			//console.log(this.dataGridStorage)
			if (this.dataGridStorage.dataList) {
				for (let i = 0; i < this.dataGridStorage.dataList.length; i++) {
					let data = 0
					let length = 0
					for (let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
						data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 50
						length += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length
						if (i == 0) {
							//console.log(this.dataGridStorage.dataList[i].productTypeList[j].detailList.length)
						}
					}
					this.heightArr.push(data)
					this.lengthArr.push(length)
				}
				//console.log(this.lengthArr)
			}
		},
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
     	//格式化
     	storageFormatDate(){
     		if( this.reportType == 1  && this.dataGridStorage ){
				if(  this.dataGridStorage.detailList.length > 0 ){
				     this.tempArray = this.dataGridStorage.detailList
				}	
			}
     	},
     	
     	cheackData(){
     		if( this.dataGridStorage.productTypeList ){
				  this.isDate = this.dataGridStorage.productTypeList.length == 0
  			}else if( this.dataGridStorage.buyBackList ){
                this.isDate = this.dataGridStorage.buyBackList.length == 0
            }else if( this.dataGridStorage.detailList ){
                this.isDate = this.dataGridStorage.detailList.length == 0
            }else{
  				this.isDate = true;
  			}
     	}
     	
	},
	update(){
		console.log('updata')
	}
}
</script>
<style lang="scss">
// .tb-total {
// 	.tb-td {
// 		b {
// 			color:#333;
// 		}
// 	}
// }
</style>
<style scoped lang="scss">
// .ui-table-container{
//     min-height: 556px;
//     //overflow-y: auto;
//     &.produc-line {
// 		.tb-tr:nth-child(even){
// 			background-color: #f9f9f9;
// 		}
// 	}
//     &.default-line{
//       .tb-tr:nth-child(even){
//           background-color: #f9f9f9;
//       }
// 	}
// 	&.con-line {
// 		.tb-tr:nth-child(even) {
// 			.backLine{
// 				 background-color: #f9f9f9;
// 			}
// 		}
// 	}
	
    
//     .tb-tr{
// 		height: 50px;
// 		display: flex;
// 		page-break-inside: avoid;
//       .tb-td{
// 		border: 1px solid #333;
//         float: left;
//         display: inline-block;
//         height: 50px;
//         line-height: 50px;    
//         text-align: center;
//         font-size: 14px; 
//         font-weight: 500;
//         transition: all .1s;
//         white-space: nowrap;
//         color: #333;
//         -webkit-font-smoothing:subpixel-antialiased;
//         text-overflow: ellipsis;
        
        
//         &.category-td{
//             position: relative; 
//             >i{
//                 font-style: normal;
//                 font-weight: bold;
//                 color: #248efc;
//                 font-size: 15px;
//                 position: absolute;
//                 display: flex;
//                 align-items: center;
//                 width: 100%;
//                 left: 0;
//                 top: 0;
//                 text-align: center;
//                 justify-content:center
//             }
//         }
//       }
//     }
  
//   .tb-total{
//       background-color: #e9f4fe;
//       height: 50px;
//       display: flex;
      
//       .tb-td{
// 		border: 1px solid #333;
//         float: left;
//         display: inline-block;
//         height: 50px;
//         line-height: 50px;    
//         text-align: center;
//         font-size: 14px;
//         font-weight: bold;
//         color: #2993f8;
//         transition: all .3s;
//         overflow: hidden;
//         white-space: nowrap;
//         text-overflow: ellipsis;
//         b{
//             color: #333 !important;
//         }
//       }
//   }
// }

// .no-data{
// 	height: 100%;
// 	background: url(~static/img/space-page.png) center center no-repeat;
// }
</style>
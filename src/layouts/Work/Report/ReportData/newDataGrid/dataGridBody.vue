<template>
<!--表格内容区-->
<!--明细-->
<div @scroll="watchScroll($event)" class="xj-report-table-container default-line" ref="tableContainer" v-if="reportType == 1">
	<div class="tableBox">
	  	<template v-for="(tb, index) in tempArray">
  			<div class="tb-tr" :key="index">
  				<div class="tb-td"
  					v-for="(tab,num) in detailDataGridColumn" 
  					:style="_calculateClass(tab)" 
  					v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"
					:key="num"
  				></div>
  			</div>
		</template>
		<!-- 加载更多未读数据 -->
		<ReadMoreData
		class="demo"
		:allData="dataGridStorage" 
		:dgDataList="dataGridStorage.detailList" 
		ref="ReadMoreDataDmo" 
		@readMoreData="readMoreData(dataGridStorage.detailList)"
		></ReadMoreData>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>
	
<div class="xj-report-table-container con-line" ref="tableContainer" v-else-if="reportType == 2 || reportType == 4">
	<div class="tableBox">
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)" :key="ind">
			<div v-for="(tb, index) in caty.productTypeList" :key="index">
				
				<template v-for="(tb1, index1) in tb.detailList">
  				<div class="tb-tr" :index="addIndex()" :key="index1">
  					<template v-for="(tab,index2) in detailDataGridColumn">
  						<div class="branch-tb category-td"
						  	:key="index2"
  							v-if="tab.text == '产品类别' && index1 == 0" 
  							:style="_calculateClass(tab)" >
  							<i :style="'height:'+ tb.detailList.length * 40 +'px;  background: #f9f8e7; line-height: 20px;'">{{tb[tab.childType]}}</i>
  						</div>
  						<div class="branch-tb category-td"
						  	:key="index2"
  							v-else-if="tab.text == '位置名称' && index == 0 && index1 == 0"
  							:style="_calculateClass(tab)"
  						>	
  							<i :style="'height:'+ heightArr[ind] +'px;  background: #fff; width: 100%; line-height: 20px;'">{{caty[tab.childType]}}</i>
  						</div>
  						<div class="tb-td"
  							v-else
							:key="index2"
							style="overflow: hidden;"
  							:class="{backLine:tab.childType != ''}"
  							:style="_calculateClass(tab)" 
  							v-text = "tab.childType == ''? getIndex() : tb1[tab.childType]">
  						</div>
  					</template>
  				</div>
  				
  				
        </template>
        
				<div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
				<div class="tb-total" style="background:#e9f4fe;" v-if="!positionSwitch"><!-- 类型小计 -->
					<div class="tb-td"
						v-for="(tab,f) in detailDataGridColumn" 
						:key="f"
						:style="_calculateClass(tab)" 
						v-html = "f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(tb[tab.totalType], tab.countCut) : tb[tab.totalType]"
					></div>
				</div>
			</div>
			<div class="tb-total" style="background:#e9f4fe;" v-if="positionSwitch"> <!-- 位置小计 -->
				<div class="tb-td"
					v-for="(tab,f) in detailDataGridColumn" 
					:key="f"
					:style="_calculateClass(tab)" 
					v-html = "f == 1 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"
				></div>
			</div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>

<!--产品分类-->
<div class="xj-report-table-container produc-line" ref="tableContainer" v-else-if="reportType == 3">
	<div class="tableBox">
		<div class="tb-category" v-for="(caty,index) in dataGridStorage.dataList" :key="index">
		  <template v-for="(tb, index) in caty.productTypeList">
  			<div class="tb-tr" :key="index">
  				<template v-for="(tab,index4) in detailDataGridColumn">
  					<div class="branch-tb category-td"
					  	:key="index4"
  						v-if="tab.text == '产品类别' && index == 0" 
  						:style="_calculateClass(tab)"
  						v-text="tb[tab.childType]"
  						>
  						<!-- <i :style="'height:'+ tb.detailList.length * 40 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i> -->
  					</div>
  					<div class="branch-tb category-td"
					  	:key="index4"
  						v-else-if="tab.text == '位置名称' && index == 0"
  						:style="_calculateClass(tab)"
  					>	
  						<i :style="'height:'+ caty.productTypeList.length * 40 +'px;  color: #2993f8; background:#fff;'">{{caty[tab.childType]}}</i>
  					</div>
  					<div class="tb-td"
  						v-else
						:key="index4"
  						:style="_calculateClass(tab)" 
  						v-text = "tab.childType == ''? (index+1) : tb[tab.childType]">
  					</div>
  				</template>
  			</div>
			</template>
			
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>
</template>

<script>
let applyIndex = 0
import {calculateClass} from 'assets/js/getClass'
import ReadMoreData from 'components/work/readMoreData.vue'
export default {
	data(){
		return{
			isDate : false,
			tempArray : [],
			heightArr: [],
		}
	},
	components:{
		ReadMoreData,
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType', 'positionSwitch'],
	
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.cheackData()
			this.storageFormatDate()
			this.tabCellHeight()
		},
		// 'reportType': function (val) {
		// 	this.tabCellHeight()
		// },
		// 'positionSwitch': function (val) {
		// 	this.tabCellHeight()
		// }
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
		$(".xj-report-table-container").mCustomScrollbar({
      theme: "minimal-dark"
    })
		// $(".xj-report-table-container").mCustomScrollbar({
        //     theme: "minimal-dark",
        //     axis: 'y',
        //     scrollInertia:100, //滚动条移动速度，数值越大滚动越慢
        //     mouseWheel: {
        //         scrollAmount: 200,
        //         preventDefault: false,
        //         normalizeDelta: true,
        //         scrollInertia : 40
        //     },
        //     callbacks: {
        //         onTotalScroll: function () {
		// 			// console.log('滚轮到底了')
		// 			$('.loadControl').css({
		// 				opacity:1
		// 			})
        //         },
		// 		onUpdate(){
		// 			// console.log('滚动条更新')
		// 			$('.loadControl').css({
		// 				opacity:0
		// 			})
		// 		},
		// 		whileScrolling(){
		// 			// console.log('滚动条活动')
		// 			$('.loadControl').css({
		// 				opacity:0
		// 			})
		// 		}
        //     }
        // });
		this.tabCellHeight()
	},
	methods:{
    _calculateClass (parm) {
      return calculateClass(parm)
    },
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
          return applyIndex
        },
		tabCellHeight () {
			this.heightArr = []
			//console.log(this.dataGridStorage)
			// console.log(this.dataGridStorage.dataList)
			if (this.dataGridStorage.dataList) {
				for (let i = 0; i < this.dataGridStorage.dataList.length; i++) {
					let data = 0
					for (let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
						data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 40
						if (i == 0) {
							//console.log(this.dataGridStorage.dataList[i].productTypeList[j].detailList.length)
						}
					}
					this.heightArr.push(data)
				}
				console.log('这是什么鬼高度',this.heightArr)
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
					 this.tempArray=this.dataGridStorage.detailList;
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
		 },
		 
		//  监听表格滚动
		watchScroll(el) { // 下拉加载数据
		  let scrollHeight = el.target.scrollHeight; // 元素可以滚动的高度
		  let clientHeight = el.target.clientHeight; // 元素的高度
		  let scrollTop = el.target.scrollTop; // 滚动了的距离
		  // if(clientHeight + scrollTop >= scrollHeight) {
		  // 	this.pageNum += 1;
		  // 	this.fetchGoodList()
		  // }
		  if(this.$refs.ReadMoreDataDmo){
		  	this.$refs.ReadMoreDataDmo.isShowMoreDataTip(scrollHeight, clientHeight, scrollTop);
		  }
		},
		//加载更多数据
        readMoreData(currentDataList) {
			// console.log(this.$parent.$parent.dataGridOptions.pageSize)
			// this.$parent.$parent.send()
          let totalNum = this.dataGridStorage.totalNum;
          let length = currentDataList.length;
		  let upDataNum = this.$parent.$parent.$refs["LoaderNum"].pageSize;
		  this.pageNum = 1;
		  let pageSize = 30
          //   this.dgDataList = [];
          if (Number(upDataNum)) {
            upDataNum = Number(upDataNum);
            if (totalNum - length < upDataNum) {
              pageSize = 0
            } else {
              pageSize = length + upDataNum
            }
          } else {
            pageSize = 0
          }
		//   this.$parent.$parent
		// console.log(pageSize);
		this.$parent.$parent.dataGridOptions.pageSize = pageSize;
		this.$parent.$parent.send();
		// console.log(this.$parent.$parent.dataGridOptions.pageSize)
		},
     	
	},
	update(){
		console.log('updata')
	},
	created () {
		
	}
}
</script>
<style lang="scss">
.tb-total {
	.tb-td {
		b {
			color:#333;
		}
	}
}



</style>
<style scoped lang="scss">
// .xj-report-table-container{
//     height: 556px;
//     overflow-y: auto;
//     &.produc-line {
// 		.tb-tr:nth-child(even){
// 			background-color: #f9f9f9;
// 		}
// 	}
//     &.default-line{
//       .tb-tr:nth-child(even){
//         background-color: #f9f9f9;
//       }
// 	}
// 	&.con-line {
// 		.tb-tr:nth-child(even) {
// 			.backLine{
// 				background-color: #f9f9f9;
// 				overflow: hidden;
// 			}
// 		}
// 	}
//     .tb-tr{
//       height: 40px;
//       display: flex;

//       .tb-td{
//         float: left;
//         display: inline-block;
//         height: 40px;
//         line-height: 40px;    
//         text-align: center;
//         font-size: 14px; 
//         font-weight: 400;
//         transition: all .1s;
//         white-space: nowrap;
//         color: #333;
//         -webkit-font-smoothing:subpixel-antialiased;
//         text-overflow: ellipsis;
        
        
        
//         &.category-td{
//             position: relative;
// 			//overflow: hidden;
// 			text-overflow: ellipsis;
// 			white-space: pre-wrap;
//             >i{
//                 font-style: normal;
//                 // font-weight: bold;
//                 // color: #248efc;
// 				color:#333;
//                 font-size: 14px;
//                 // font-size: 15px;
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
//       height: 40px;
//       display: flex;
      
//       .tb-td{
//         float: left;
//         display: inline-block;
//         height: 40px;
//         line-height: 40px;    
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

.no-data{
	height: 100%;
	background: url(~static/img/space-page.png) center center no-repeat;
}

.tableBox{
	position: relative;
}
</style>
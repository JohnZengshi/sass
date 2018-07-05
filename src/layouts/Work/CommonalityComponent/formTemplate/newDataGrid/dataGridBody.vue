<template>
<!--表格内容区-->
<!--明细-->
<div @scroll="watchScroll($event)" class="ui-table-container default-line" ref="tableContainer" v-if="reportType == 1">
	<div>
		<dataisdelete 
			:isdeletedialogvisibly="deletedialogvisi"
			:isDeleteRole="isRole"
			:asrequestData="asData"
			@delmessageBack="delmessageBack"
			@setDeletedialogvisibly="setDeletedialogvisibly">
		</dataisdelete>
		<div class="tb-tr" v-for="(tb,index1) in tempArray" :key="index1">
			<div class="tb-td" v-for="(tab,index2) in detailDataGridColumn" :key="index2"
				:style="tableCell(tab.width)"
				
			>
			<!-- v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]" -->
			<span v-if="tab.type=='xvhao'">{{index1+1}}</span>
			<span v-else>{{tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]}}</span>
			</div>
			<div class="operate-btn">
				<i class="detail iconfont icon-xiangqing2" @click="gotoDetails(tb)" title="查看详情"></i>
       			<i class="del iconfont icon-lajitong" v-if="isRole == 'Y'"  title="删除" @click="showDeleteDialog(tb)"></i>
				   <!-- <i class="del iconfont icon-lajitong" v-if="isRole == 'Y'"  title="删除" @click="productDetail(tb)"></i> -->
			</div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
	
</div>

<div @scroll="watchScroll($event)" class="ui-table-container con-line" ref="tableContainer" v-else-if="reportType == 2 || reportType == 4">
	<div>
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)" :key="ind">
			<div v-for="(tb, index) in caty.productTypeList" :key="index">
				<div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()" :key="index1">
					<template v-for="(tab,index2) in detailDataGridColumn">
						<div class="tb-td category-td" :key="index2"
							v-if="tab.text == '产品类别' && index1 == 0"
							:style="tableCell(tab.width)" >
							<i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;z-index:2; line-height: 20px;'">{{tb[tab.childType]}}</i>
						</div>
						<div class="tb-td category-td" :key="index2"
							v-else-if="tab.text == '位置名称' && index == 0 && index1 == 0"
							:style="tableCell(tab.width)"
						>
							<i :style="'height:'+ heightArr[ind] +'px;  background: #fff; width: 100%; line-height: 20px;'">{{caty[tab.childType]}}</i>
						</div>
						<div class="tb-td"
              @click.stop="openLabel(tb1)"
							v-else  :key="index2"
							style="overflow: hidden;"
							:class="{backLine:tab.childType != ''}"
							:style="tableCell(tab.width)"
							v-text = "tab.childType == ''? getIndex() : (tab.text == '产品类别' || tab.text == '位置名称' ? '' : tb1[tab.childType])">
						</div>
					</template>
				</div>
				<div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
				<div class="tb-total" style="background:#e9f4fe;" v-if="!positionSwitch"><!-- 类型小计 -->
					<div class="tb-td"
						v-for="(tab,f) in detailDataGridColumn"
						:style="tableCell(tab.width)" :key="f"
						v-html = "f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(tb[tab.totalType], tab.countCut) : tb[tab.totalType]"
					></div>
				</div>
			</div>
			<div class="tb-total" style="background:#e9f4fe;" v-if="positionSwitch"> <!-- 位置小计 -->
				<div class="tb-td"
					v-for="(tab,f) in detailDataGridColumn"
					:style="tableCell(tab.width)" :key="f"
					v-html = "f == 1 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"
				></div>
			</div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>

<!--产品分类-->
<div @scroll="watchScroll($event)" class="ui-table-container produc-line" ref="tableContainer" v-else-if="reportType == 3">
	<div>
		<div class="tb-category" v-for="(caty,index) in dataGridStorage.dataList" :key="index">
			<div class="tb-tr" v-for="(tb, index) in caty.productTypeList" :key="index">
				<template v-for="(tab,index) in detailDataGridColumn">
					<div class="tb-td category-td"
						v-if="tab.text == '产品类别' && index == 0"
						:style="tableCell(tab.width)" :key="index"
						v-text="tb[tab.childType]"
						>
						<!-- <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i> -->
					</div>
					<div class="tb-td category-td"
						v-else-if="tab.text == '位置名称' && index == 0"
						:style="tableCell(tab.width)" :key="index"
					>
						<i :style="'height:'+ caty.productTypeList.length * 50 +'px;  color: #2993f8; background:#fff;'">{{caty[tab.childType]}}</i>
					</div>
					<div class="tb-td"
						v-else :key="index"
						:style="tableCell(tab.width)"
						v-text = "tab.childType == ''? (index+1) : tb[tab.childType]">
					</div>
				</template>
			</div>

		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
	



</div>
</template>

<script>
let applyIndex = 0
import {operateProductList} from 'Api/commonality/operate'
import dataisdelete from './dataisDelete'
export default {
	data(){
		return{
			deletedialogvisi:false,
			isDate : false,
			tempArray : [],
			heightArr: [],
			asData:{}
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType','isRole', 'positionSwitch'],
    components:{
       dataisdelete
	},
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

		// $(".ui-table-container").mCustomScrollbar({
        //     theme: "minimal-dark",
        //     axis: 'y',
        //     mouseWheel: {
        //         scrollAmount: 200,
        //         preventDefault: false,
        //         normalizeDelta: false,
        //         scrollInertia : 0
        //     },
        //     callbacks: {
        //         onTotalScroll: function () {
		// 			if (_this.reportType == 1) {
		// 				_this.$emit('lazyloadSend', {refresh: true})
		// 			} else {
		// 			}
        //         }
        //     }
        // });
		this.tabCellHeight()
	},
	methods:{
    openLabel (parm) {
      this.$store.dispatch('getLabelData', parm)
    },
		setDeletedialogvisibly(isShow){
           this.deletedialogvisi = isShow; 
		},
		showDeleteDialog(item){
			let options = {
							productList: [
								{barcode: item.barcode}
							],
							orderNum: this.$route.query.orderNumber,
							operate: '2'
						};
            this.asData = options;//把用于请求的数据传到子组件，
			this.setDeletedialogvisibly(true);
		},
		delmessageBack (val) {
            this.$emit('messageBack', val)
        },
		    // 查看详情
		gotoDetails (item) {
			console.log(item)
			//    this.$message({
			//      type:'info',
			//      message :'暂未开发'
			//    })
			this.$router.push({path: '/inventory', query: {text: '单据详情', barcode: item.barcode, productId: item.productId}})
		},
		// productDetail (item) {
		//    //console.log(1111)
		//    if (this.isRole == 'Y') {
		// 		this.$confirm('此操作将使该商品从单据中移除, 是否继续?', '提示', {
		// 		confirmButtonText: '确定',
		// 		cancelButtonText: '取消',
		// 		}).then(() => {
		// 			let options = {
		// 					productList: [
		// 						{barcode: item.barcode}
		// 					],
		// 					orderNum: this.$route.query.orderNumber,
		// 					operate: '2'
		// 				}
		// 			// console.log(options)
		// 			operateProductList(options).then((res) => {
		// 				// console.log(res)
		// 				if (res.data.state == 200) {
		// 					this.$message({
		// 						type: 'success',
		// 						message: '删除成功'
		// 					});
		// 					this.$emit('messageBack', 1)
		// 				} else {
		// 					this.$store.dispatch('workPopupError', res.data.msg);
		// 				}
		// 			}, (res) => {
		// 				// console.log(res)
		// 				this.$store.dispatch('workPopupError', res.data.msg);
		// 			})
		// 		}).catch(() => {
		// 			this.$message({
		// 				type: 'info',
		// 				message: '已取消删除'
		// 			});
		// 		});
		//    } else {
		// 		this.$store.dispatch('workPopupError', '无权限删除');
		//    }
	   	// },
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
			if (this.dataGridStorage.dataList) {
				for (let i = 0; i < this.dataGridStorage.dataList.length; i++) {
					let data = 0
					for (let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
						data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 50
						if (i == 0) {
							//console.log(this.dataGridStorage.dataList[i].productTypeList[j].detailList.length)
						}
					}
					this.heightArr.push(data)
				}
				//console.log(this.heightArr)
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
					 console.log('查看退货明细表数据结构:',this.tempArray);
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
		 
		 // 监听表格滚动
        watchScroll(el){
            console.log("在滚")
            let scrollHeight = el.target.scrollHeight; // 元素可以滚动的高度
            let clientHeight = el.target.clientHeight; // 元素的高度
			let scrollTop = el.target.scrollTop; // 滚动了的距离
			this.$emit("watchScroll",scrollHeight,clientHeight,scrollTop)
        }

	},
	update(){
		console.log('updata')
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
.ui-table-container{
    // height: 556px;
    overflow-y: auto;
    &.produc-line {
		.tb-tr:nth-child(even){
			background-color: #f9f9f9;
		}
	}
    &.default-line{
      .tb-tr:nth-child(even){
          background-color: #f9f9f9;
      }
	}
	&.con-line {
		.tb-tr:nth-child(even) {
			.backLine{
				 background-color: #f9f9f9;
				 overflow: hidden;
			}
		}
	}

    .tb-tr{
      height: 50px;
      display: flex;
	  position: relative;
		>.operate-btn{
			position: absolute;
			right: 0;
			width: 60px;
			top: 0;
			height: 50px;
			background-color: rgba(0,0,0,.5);
			font-weight: normal;
			transition: all .4s;
			visibility: hidden;
			opacity: 0;
			text-align: center;
			line-height: 50px;
			>i{
				display: inline-block;
				color: #fff;
				cursor: pointer;
				margin-left:10px;
				float: left;
				transition: all .2s;
				font-size: 15px;
				&.del{
					font-size: 15px;
					margin-top:-2px;
					float: left;
				}
				&:hover{
					color: #2993f8;
				}
			}
		}
      .tb-td{
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        transition: all .1s;
        white-space: nowrap;
        color: #333;
        -webkit-font-smoothing:subpixel-antialiased;
        text-overflow: ellipsis;


        &.category-td{
            position: relative;
			//overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre-wrap;
            >i{
                font-style: normal;
                // font-weight: bold;
                // color: #248efc;
				color:#333;
                font-size: 14px;
				// font-size: 15px;

                position: absolute;
                display: flex;
                align-items: center;
                width: 100%;
                left: 0;
                top: 0;
                text-align: center;
                justify-content:center
            }
        }
	  }
	}
	.tb-tr:hover {
		background-color:#e9e9e9;
		&:nth-child(even){
			background-color:#e9e9e9;
		}
		>.operate-btn{
			visibility: visible;
			text-align: center;
			opacity: 1;
		}
	}

  .tb-total{
      background-color: #e9f4fe;
      height: 50px;
      display: flex;

      .tb-td{
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #2993f8;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        b{
            color: #333 !important;
        }
      }
  }
}

.no-data{
	height: 100%;
	background: url(~static/img/space-page.png) center center no-repeat;
}
</style>

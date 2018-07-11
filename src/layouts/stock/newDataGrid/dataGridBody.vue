<template>
<!--表格内容区-->
<!--明细-->
<div @scroll="watchScroll($event)" class="xj-report-table-container default-line" ref="tableContainer" v-if="reportType == 1">
	<div>
		<div class="tb-tr" v-for="(tb,index) in tempArray" :key="index">
			<div class="tb-td"
				v-for="(tab,coindex) in detailDataGridColumn" 
				:style="_calculateClass(tab)" :key="coindex"
        :title="tb[tab.childType]"
				v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"
			></div>
		</div>
		<!-- 加载更多未读数据 -->
		<ReadMoreData 
		:allData="dataGridStorage" 
		:dgDataList="dataGridStorage.detailList" 
		ref="ReadMoreDataDmo" 
		@readMoreData="readMoreData"
		></ReadMoreData>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>
	
<div class="xj-report-table-container con-line" ref="tableContainer" v-else-if="reportType == 2 || reportType == 4">
	<div>
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)" :key="ind">
			<div v-for="(tb, index) in caty.productTypeList" :key="index">
				<div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()" :key="index1">
					<template v-for="(tab,tabindex) in detailDataGridColumn">
						<div class="branch-tb category-td"
							v-if="tab.text == '产品类别' && index1 == 0"  :key="tabindex"
							:style="_calculateClass(tab)" >
							<i @click.stop="openLabel({}, tb)" :style="'height:'+ tb.detailList.length * 40 +'px;  background: #f9f8e7; line-height: 20px;'">{{tb[tab.childType]}}</i>
						</div>
						<div class="branch-tb category-td"  :key="tabindex"
							v-else-if="tab.text == '位置名称' && index == 0 && index1 == 0"
							:style="_calculateClass(tab)"
						>	
							<i :style="'height:'+ heightArr[ind] +'px;  background: #fff; width: 100%; line-height: 20px;z-index: 100'">{{caty[tab.childType]}}</i>
						</div>
						<div class="tb-td" :key="tabindex"
							v-else
							style="overflow: hidden;"
              :title="tab.childType == ''? getIndex() : tb1[tab.childType]"
              @click.stop="openLabel(tb1, tb)"
							:class="{backLine:tab.childType != ''}"
							:style="_calculateClass(tab)" 
							v-text = "tab.childType == ''? getIndex() : tb1[tab.childType]">
						</div>
					</template>
				</div>
				<div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
				<div class="tb-total" style="background:#e9f4fe;"><!-- 类型小计 -->

          <template v-if="!positionSwitch">
            <div class="tb-td"
              v-for="(tab,f) in detailDataGridColumn" :key="f"
              :style="_calculateClass(tab)" 
              v-html = "f == 0 ? '<b>小计</b>' : tb[tab.totalType]"
            ></div>
          </template>
          
          <template v-else>
            <div class="tb-td"
              v-for="(tab,f) in detailDataGridColumn" :key="f"
              :style="_calculateClass(tab)" 
              v-html = "f == 1 ? '<b>小计</b>' : tb[tab.totalType]"
            ></div>
          </template>

				</div>
			</div>
      <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
			<div class="tb-total" style="background:#e9f4fe;" v-if="positionSwitch"> <!-- 位置小计 -->
				<div class="tb-td"
					v-for="(tab,f) in detailDataGridColumn"
          :key="f"
					:style="_calculateClass(tab)" 
					v-html = "f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"
				></div>
			</div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>

<!--产品分类-->
<div class="xj-report-table-container produc-line" ref="tableContainer" v-else-if="reportType == 3">
	<div>
		<div class="tb-category" v-for="(caty,catyindex) in dataGridStorage.dataList" :key="catyindex">
			<div class="tb-tr" v-for="(tb, index) in caty.productTypeList" :key="index">
				<template v-for="(tab,tabindex) in detailDataGridColumn">
					{{index}}
					<div class="branch-tb category-td" :key="tabindex"
						v-if="tab.text == '产品类别' && index == 0" 
						:style="_calculateClass(tab)"
						v-text="tb[tab.childType]"
            @click.stop="openLabel({}, tb)"
						>
						<!-- <i :style="'height:'+ tb.detailList.length * 40 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i> -->
					</div>
					<div class="branch-tb category-td"   :key="tabindex"
						v-else-if="tab.text == '位置名称' && index == 0"
						:style="_calculateClass(tab)"
					>	
						<i v-bind:class="catyindex%2 !=0 ? 'mytabstyle1':'mytabstyle2' " :style="'height:'+ caty.productTypeList.length * 40 +'px;  color: #2993f8;'">{{caty[tab.childType]}}</i>
					</div>
					<div class="tb-td"
						v-else  :key="tabindex"
						:style="_calculateClass(tab)"
            :title="tb[tab.childType]"
            @click.stop="openLabel({}, tb)"
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
let applyIndex = 0;
import ReadMoreData from 'components/work/readMoreData';
import threeLayersDownMenuVue from '../../../base/menu/three-layers-down-menu.vue';
import {calculateClass} from 'assets/js/getClass'
export default {
	data(){
		return{
			isDate : false,
			tempArray : [],
			heightArr: [],
			addNum: 0,
		}
	},
	components:{
		ReadMoreData
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType', 'positionSwitch',"changeRepository", "changeShop", "changeCounter", 'dataGridOptions'],
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.cheackData()
			this.storageFormatDate()
			this.tabCellHeight()
		}
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
    openLabel (parm, caty) {
      debugger
        let datas = {
          type: '2',
          data: {
            jeweId: parm.gemId ? [parm.gemId] : [],
            jewelryId: parm.jewelryId ? [parm.jewelryId] : [],
            colourId: parm.colorId ? [parm.colorId] : [],
            productTypeId: [caty.productTypeId],
            storageId: this.changeRepository.repositoryId ? [this.changeRepository.repositoryId] : [],
            shopId: this.changeShop.shopId ? [this.changeShop.shopId] : [],
            counterId: this.changeCounter.counterId, // 柜组
            productClass: this.dataGridOptions.productClass
          }
        }
        if (this.dataGridOptions.type == '4') {
            datas.data.wColorId = this.dataGridOptions.wColorId
            datas.data.wGemId = this.dataGridOptions.wGemId
            datas.data.wJewelryId = this.dataGridOptions.wJewelryId
            datas.data.nColorId = this.dataGridOptions.nColorId
            datas.data.nGemId = this.dataGridOptions.nGemId
            datas.data.nJewelryId = this.dataGridOptions.nJewelryId
        }
      this.$store.dispatch('getLabelData', datas)
    },
    _calculateClass (parm) {
      return calculateClass(parm)
    },
		addNumAct () {
			this.addNum++
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
			if (this.dataGridStorage.dataList) {
				for (let i = 0; i < this.dataGridStorage.dataList.length; i++) {
					let data = 0
					for (let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
            data += 42
						data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 40
						if (i == 0) {
							//console.log(this.dataGridStorage.dataList[i].productTypeList[j].detailList.length)
						}
					}
					this.heightArr.push(data)
				}
				console.log('查看高度数据:',this.heightArr)
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
				if(this.dataGridStorage.detailList && this.dataGridStorage.detailList.length > 0 ){
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
		 },
		// 监听下拉
		watchScroll (el) { 
			// console.log(el)
			let scrollHeight = el.target.scrollHeight; // 元素可以滚动的高度
			let clientHeight = el.target.clientHeight; // 元素的高度
			let scrollTop = el.target.scrollTop; // 滚动了的距离
			// this.$refs.ReadMoreDataDmo.isShowMoreDataTip(scrollHeight, clientHeight, scrollTop);
			let res = this.$refs.ReadMoreDataDmo.isShowMoreDataTip(scrollHeight, clientHeight, scrollTop);
			if(res){
				this.readMoreData();
			}
		},
		// 加载更多未读数据
		readMoreData() {
		  let totalNum = this.dataGridStorage.totalNum;
		  let length = this.dataGridStorage.detailList.length;
		  let upDataNum = this.$parent.$parent.$refs["LoaderNum"].pageSize;
		  let pageSize = 1;
		  if (Number(upDataNum) != 0) {
		    upDataNum = Number(upDataNum);
		    if (totalNum - length < upDataNum) {
				// 后台返回所有数据，要把表格的数据清空
		      this.$parent.$parent.dataGridStorage.detailList = [];
		      pageSize = 0
		    } else {
		      pageSize = upDataNum
		    }
		  } else {
			  // 后台返回所有数据，要把表格的数据清空
		    this.$parent.$parent.dataGridStorage.detailList = [];
		    pageSize = 0
		  }
		//   this.$parent.$parent.dataGridOptions.page += 1
		  this.$parent.$parent.dataGridOptions.pageSize = pageSize;
		//   console.log(this.$parent.$parent.dataGridOptions.pageSize)
		//   this.$parent.$parent.send();
		this.$parent.$parent.sendlayLoad();
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
.xj-report-table-container{
	position: relative;
    height: 570px;
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
      height: 40px;
      display: flex;
      .tb-td{
        float: left;
        display: inline-block;
        height: 40px;
        line-height: 40px;    
        text-align: center;
        font-size: 14px; 
        font-weight: 400;
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
			.mytabstyle1{
				background-color: #e9f4fe;
			}
			.mytabstyle2{
				background-color: #f9f8e7;
			}
        }
      }
    }
  
  .tb-total{
      background-color: #e9f4fe;
      height: 40px;
      display: flex;
      
      .tb-td{
        float: left;
        display: inline-block;
        height: 40px;
        line-height: 40px;    
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
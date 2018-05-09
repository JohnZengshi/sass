<template>
<!--表格内容区-->
<!--明细-->
<table class="table-print-wrap" ref="tableContainer" v-if="reportType == 1">
	<div>
	  <template v-for="(tb,index) in tempArray">
  		<tr class="tb-tr">
  			<td class="tb-td"
  				v-for="tab in detailDataGridColumn" 
  				:style="tableCell(tab.width)">
  			<div :style="tableCell(tab.width)">{{tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]}}</div>
  			</td>
  		</tr>
  		
  		<!--报表-修改页面专用 start -->
  		<tr class="tb-tr" v-if="isEditReport == 'edit'">
        <td class="tb-td"
          v-for="tab in detailDataGridColumn" 
          :style="tableCell(tab.width)">
        <div :style="tableCell(tab.width)" v-text = "tab.editOldType == ''? '' : tab.toFixed ? toFixed(tb[tab.editOldType],tab.countCut) : tb[tab.editOldType]"></div>
        </td>
      </tr>
      
		</template>
		<div v-if="isDate" class="no-data"></div>
	</div>
</table>
	
<table class="table-print-wrap" ref="tableContainer" v-else-if="reportType == 2 || reportType == 4">
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)">
			<div v-for="(tb, index) in caty.productTypeList" >
				<template v-for="(tb1, index1) in tb.detailList">
  				<tr class="tb-tr"  :index="addIndex()">
  					<template v-for="tab in detailDataGridColumn">
  						<td :rowspan="isEditReport == 'edit' ? (tb.detailList.length*2) : tb.detailList.length" class="tb-td category-td"
  							:colspan="index1 >=1 ? '2' : '0' "
  							v-if="tab.text == '产品类别' && index1 == 0"
  							:style="tableCell(tab.width)" >
  							<div :style="tableCell(tab.width)" >
                    <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i>
                </div>
  							
  						</td>
  						<td class="tb-td category-td"
  							:rowspan="lengthArr[ind]"
  							v-else-if="tab.text == '位置名称' && index == 0 && index1 == 0"
  							:style="tableCell(tab.width)">	
  						  <div :style="tableCell(tab.width)" ><i style="background: #fff; width: 100%;">{{caty[tab.childType]}}</i></div>
  							
  						</td>
  						<td class="tb-td"
  							v-if="tab.text != '产品类别'  && tab.text != '位置名称' "
  							:class="{backLine:tab.childType != ''}"
  							:style="tableCell(tab.width)" 
  							>
  							<div :style="tableCell(tab.width)">{{tab.childType == ''? getIndex() : tb1[tab.childType]}}</div>
  						</td>
  					</template>
  				</tr>
  				
  				<!--报表-修改页面专用 start -->
  				<tr class="tb-tr"  v-if="isEditReport == 'edit'">
            <template v-for="tab in detailDataGridColumn">
              <td v-if="tab.text != '产品类别'" class="tb-td" :style="tableCell(tab.width)" >
                <div :style="tableCell(tab.width)" v-text = "tab.editOldType == ''? '' : tb1[tab.editOldType]"></div>
              </td>
            </template>
          </tr>
          <!--报表-修改页面专用 end -->
				</template>
				
				
				<tr class="tb-total" v-if="!positionSwitch"><!-- 类型小计 -->
					<td class="tb-td"
						v-for="(tab,f) in detailDataGridColumn" :colspan="f==0?3:0"
						:style="tableCell(tab.width)" v-if="f<1 || f>2">
					 <div :style="tableCell(tab.width)" v-html="f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(tb[tab.totalType], tab.countCut) : tb[tab.totalType]"></div>
					</td>
				</tr>
			</div>
			<tr class="tb-total" v-if="positionSwitch"> <!-- 位置小计 -->
				<td class="tb-td"
					v-for="(tab,f) in detailDataGridColumn" 
					:style="tableCell(tab.width)" 
					
				>
				  <div :style="tableCell(tab.width)" v-html = "f == 1 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"></div>
				</td>
			</tr>
		</div>
		<div v-if="isDate" class="no-data"></div>
</table>

<!--产品分类-->
<table class="table-print-wrap" ref="tableContainer" v-else-if="reportType == 3">
	<div>
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)">
			
			<template v-for="(tb, index) in caty.productTypeList">
  			<tr class="tb-tr"  :index="addIndex()">
  				<template v-for="(tab, index1) in detailDataGridColumn">
  					<td class="tb-td category-td"
  						v-if="tab.text == '产品类别' && index == 0" 
  						:style="tableCell(tab.width)"
  						v-text="tb[tab.childType]"
  						>
  						<!-- <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i> -->
  					</td>
  					<td class="tb-td category-td"
  						:rowspan="positionSwitch ? caty.productTypeList.length : 0"
  						v-else-if="tab.text == '位置名称' && index == 0"
  						:style="tableCell(tab.width)"
  					>	
  					 <div :style="tableCell(tab.width)" ><i :style="'height:'+ caty.productTypeList.length * 50 +'px;  color: #2993f8; background:#fff;'">{{caty[tab.childType]}}</i></div>
  						
  					</td>
  					<td class="tb-td"
  						v-else-if="tab.text != '位置名称' "
  						:style="tableCell(tab.width)" 
  						>
  						<div :style="tableCell(tab.width)" v-text = "tab.childType == ''? getIndex() : tb[tab.childType]"></div>
  					</td>
  				</template>
  			</tr>
  			
  			<!--报表-修改页面专用 start -->
  			<tr class="tb-tr"  v-if="isEditReport == 'edit'">
          <template v-for="(tab, index1) in detailDataGridColumn">
            <td class="tb-td":style="tableCell(tab.width)">
              <div :style="tableCell(tab.width)" v-text = "tab.editOldType == ''? '' : tb[tab.editOldType]"></div>
            </td>
          </template>
        </tr>
        
			</template>
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
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType', 'positionSwitch','isEditReport'],
	
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.cheackData()
			this.storageFormatDate()
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
          return applyIndex
        },
		tabCellHeight () {
			this.heightArr = []
			this.lengthArr = []
			if (this.dataGridStorage.dataList) {
				for (let i = 0; i < this.dataGridStorage.dataList.length; i++) {
					let data = 0
					let length = 0
					for (let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
						data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 50
						length += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length
						if (i == 0) {
						}
					}
					this.heightArr.push(data)
					this.lengthArr.push(length)
				}
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
	}
}
</script>
<style lang="scss">
.table-print-wrap{
    /*page-break-before: always;*/
}
</style>
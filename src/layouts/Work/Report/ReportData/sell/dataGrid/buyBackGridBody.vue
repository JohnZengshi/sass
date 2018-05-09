<template>
<!--表格内容区-->
<!--明细-->
<div class="ui-table-container" ref="tableContainer" v-if="reportType == 3">
    <div>
	<template v-if="dataGridStorage.buyBackList.length > 0 " v-for="(caty,k) in dataGridStorage.buyBackList" >
		<div class="tb-tr" v-for="(tb,index) in caty.detailList" :resetindex="resetIndex(k)" :index="addIndex()">
			<template v-for="tab in detailDataGridColumn" >
				<div class="tb-td category-td"
                      v-if="tab.text == '回购类型' && index == 0" 
                      :style="tableCell(tab.width)" >
                   <i :style="'height:'+ caty.detailList.length * 50 +'px'">
                       {{caty.buyBackType == 1 ? '退货' : caty.buyBackType == 2 ? '换货' : '回收'}}</i>
                </div>
                <div class="tb-td category-td"
                    v-else-if="tab.text == '产品类别'" 
                    :style="tableCell(tab.width)" >
                    <!--<i :style="'height:'+ caty.detailList.length * 50 +'px'">{{tb[tab.childType]}}</i>-->
                    <i style="height: 100%;">{{tb[tab.childType]}}</i>
                </div>
				
				<div class="tb-td"
					v-else
					:style="tableCell(tab.width)" 
					v-text = "tab.childType == ''? getIndex() : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]">
				</div>
			</template>	
		</div>
		<!--小计-->
		<div class="tb-total">
			<div class="tb-td"
				v-for="(tab,f) in detailDataGridColumn" 
				:key="tab.id" 
				:style="tableCell(tab.width)" 
				v-html = "f ==2 ?'<b>小计</b>':tab.toFixed ? toFixed(caty[tab.totalType],tab.countCut) : caty[tab.totalType]">
			</div>
		</div>
		
	</template>
	<div v-else class="no-data"></div>
	</div>
</div>
	
<div class="ui-table-container" ref="tableContainer" v-else-if="reportType == 1 || reportType == 2">
    <div>
	<!--成色大类-->
	<template v-for="(caty,k) in dataGridStorage.buyBackList" >
		<div class="tb-category">
		    
			<div class="tb-tr" v-for="(tb,index) in caty.productTypeList" :resetindex="resetIndex(k)" :index="addIndex()">
				<template v-for="tab in detailDataGridColumn" >
    				<div class="tb-td category-td"
                          v-if="tab.text == '回购类型' && index == 0" 
                          :style="tableCell(tab.width)" >
                       <i :style="'height:'+ caty.productTypeList.length * 50 +'px'">
                           {{caty.buyBackType == 1 ? '退货' : caty.buyBackType == 2 ? '换货' : '回收'}}</i>
                    </div>
					<div class="tb-td category-td"
                        v-else-if="tab.text == '产品类别'" 
                        :style="tableCell(tab.width)" >
                        <i :style="'height:'+ tb.statisticsList.length * 50 +'px'">{{tb[tab.childType]}}</i>
                    </div>
					<div class="tb-td"
						v-else
						:index="index"
						:style="tableCell(tab.width)"  
						v-text = "tab.childType == ''? getIndex() : tab.toFixed ? toFixed(tb.statisticsList[0][tab.childType],tab.countCut) : tb.statisticsList[0][tab.childType]">
					</div>
				</template>
			</div>
			<!--小计-->
			<div class="tb-total">
				<div class="tb-td"
					v-for="(tab,f) in detailDataGridColumn" 
					:key="tab.id" 
					:style="tableCell(tab.width)"  
					v-html = "f ==2 ?'<b>小计</b>': tab.toFixed ? toFixed(caty[tab.totalType],tab.countCut) : caty[tab.totalType]">
				</div>
			</div>
			
		</div>
		
	</template>
	<div v-if="dataGridStorage.buyBackList.length == 0" class="no-data"></div>
	</div>
</div>
</template>

<script>

let applyIndex = 0

export default{
	data(){
		return{
			isDate : false,
			buyBackList : []
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType'],
	
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
       
	},

	beforeUpdate(){
		//console.log(this.dataGridStorage.productTypeList,this.dataGridStorage.buyBackList)
		if( this.dataGridStorage.productTypeList ){
			this.isDate = this.dataGridStorage.productTypeList.length == 0
		}else if( this.dataGridStorage.buyBackList ){
			this.isDate = this.dataGridStorage.buyBackList.length == 0
		}else{
			this.isDate = true;
		}
	},
	
	mounted(){
		// console.log(this.dataGridStorage.buyBackList.length)
		this.$nextTick(()=>{
			let table = this.$refs.tableContainer 
			
			$(".ui-table-container").mCustomScrollbar({
                theme: "minimal-dark",
                axis: 'y',
                mouseWheel: {
                    scrollAmount: 200,
                    preventDefault: false,
                    normalizeDelta: false
                },
            })
		})
	}
}
</script>

<style scoped lang="scss">
.ui-table-container{
    height: 515px;
}

.no-data{
	height: 100%;
	background: url(../../../../../../static/img/space-page.png) center center no-repeat;
	opacity: 0.3;
}
</style>
<template>
<!--表格内容区-->
<!--明细-->
<!--<div v-if="reportType == 3" class="table-print-wrap" v-html="tabAdd(dataGridStorage)"></div>-->
<table v-if="reportType == 1" class="table-print-wrap">
    <tr v-for="(tb,index) in dataGridStorage.detailList" >
        <template v-for="tab in detailDataGridColumn" >
            <!--<td class="print-product-type" :style="tableCell(tab.width)" :rowspan="dataGridStorage.detailList.length" 
                v-if="tab.text == '产品类别' && index == 0">
                <div :style="tableCell(tab.width)" >{{dataGridStorage[tab.childType]}}</div>
            </td>-->
            <td :style="tableCell(tab.width)">
                <div :style="tableCell(tab.width)" v-text = "tab.childType == ''? (index+1) : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"></div>
            </td>
        </template>
    </tr>
    <tab-footer
        :detailDataGridColumn="detailDataGridColumn" 
        :dataGridStorage="dataGridStorage" >
    </tab-footer> 
</table>
	
<table v-else class="table-print-wrap">
	<body  v-for="(caty,k) in printDataList" :resetindex="resetIndex(k)">
	  <template v-for="(tb, index) in caty.productTypeList" >
  		<tr v-for="(tb1,index1) in tb.detailList"  :index="addIndex()">
  		  <template v-for="tab in detailDataGridColumn">
          <td 
            class="print-product-type" 
            v-if="tab.text == '产品类别' && index1 == 0" 
            :style="tableCell(tab.width)">
              <div :style="tableCell(tab.width)" >
                {{tb[tab.childType]}}
              </div>
          </td>
          <td 
            class="print-product-type" 
            v-else-if="tab.text == '回购类型'" 
            :style="tableCell(tab.width)">
              <div :style="tableCell(tab.width)" >
                {{caty[tab.childType]}}
              </div>
          </td>
          <td 
            class="tb-td" 
            v-else 
            :style="tableCell(tab.width)" >
            <div :style="tableCell(tab.width)" >
              {{tab.childType == ''? getIndex() : tab.toFixed ? toFixed(tb1[tab.childType],tab.countCut) : tb1[tab.childType]}}
            </div>
          </td>
        </template>
            
  			<!--<template v-for="tab in detailDataGridColumn" >
  				<td class="print-product-type" :style="tableCell(tab.width)" :rowspan="tb.detailList.length" 
  					v-if="tab.text == '产品类别' && index == 0">
  					<div :style="tableCell(tab.width)" >{{caty[tab.childType]}}</div>
  				</td>
  				<td
  					v-else
  					:style="tableCell(tab.width)">
  					<div :style="tableCell(tab.width)" v-text = "tab.childType == ''? getIndex() : tab.toFixed ? toFixed(tb1[tab.childType],tab.countCut) : tb[tab.childType]"></div>
  				</td>
  			</template>-->
  		</tr>
  		<!--小计-->
    <tr>
      <td
        v-for="(tab,f) in detailDataGridColumn" 
        :key="tab.id" 
        :style="tableCell(tab.width)" 
        >
        <div :style="tableCell(tab.width)" v-html = "f ==0 ?'<b>小计</b>':tab.toFixed ? toFixed(caty[tab.totalType],tab.countCut) : caty[tab.totalType]"></div>
      </td>
    </tr>
		</template>
		
	</body>
	<tab-footer
        :detailDataGridColumn="detailDataGridColumn" 
        :dataGridStorage="dataGridStorage">
    </tab-footer> 
</table>
</template>

<script>
import tabFooter from './globalFooter'
let applyIndex = 0
export default{
	data(){
		return{
			printDataList : []
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','reportType'],
	watch:{
	  dataGridStorage : function(){
	    console.log('dataGridStorage:', this.dataGridStorage)
	    // 简化数据结构
	    this.updataData()
	  }
	},
	components:{
    tabFooter
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
    
    updataData(){
      if(this.dataGridStorage.productTypeList) {
        if(this.dataGridStorage.productTypeList[0].productSellTypeList) {
          this.printDataList = this.dataGridStorage.productTypeList[0].productSellTypeList
        }
      }
    }
    
	},
	
	mounted(){
		
		this.$nextTick(()=>{
			this.updataData()
			
		})
	}
}
</script>
<style lang="scss">

</style>

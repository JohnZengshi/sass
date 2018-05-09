<template>
<!--表格内容区-->
<!--明细-->
<div v-if="reportType == 3" class="table-print-wrap" v-html="tabAdd(dataGridStorage)"></div>

	
<table v-else-if="reportType == 1 || reportType == 2" class="table-print-wrap">
	<!--成色大类-->
	<template  v-for="caty in dataGridStorage.productTypeList" >
		<tr v-for="(tb,index) in caty.statisticsList">
			<template v-for="tab in detailDataGridColumn" >
				<td class="print-product-type" :rowspan="caty.statisticsList.length" 
					v-if="tab.text == '产品类别' && index == 0" 
					:style="tableCell(tab.width)" >
					{{caty[tab.childType]}}
				</td>
				<td
					v-else-if="tab.text != '产品类别'"
					:style="tableCell(tab.width)" 
					:class="tab.text == '售价' || tab.text == '成本' ? 'pad-right' : ''" 
					v-text = "tab.childType == ''? (index+1) : tb[tab.childType]">
				</td>
			</template>
		</tr>
		<!--小计-->
		<tr>
			<td
				v-for="(tab,f) in detailDataGridColumn" 
				:key="tab.id" 
				:style="tableCell(tab.width)" 
				:class="tab.text == '售价' || tab.text == '成本' ? 'pad-right' : ''" 
				v-html = "f ==0 ?'<b>小计</b>':caty[tab.totalType]"
			></td>
		</tr>
	</template>
	
</table>
<div v-else class="table-print-wrap" v-html="tabAdd1(dataGridStorage)"></div>
</template>

<script>
import Vue from 'vue'
export default{
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType'],
	data(){
		return{
			printPageRow : 31
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
       
       tableScroll(){
       	
       		this.$emit('scrollClass',false)
			if( this.timeOut){
				clearTimeout(  this.timeOut )
			}
			
			this.timeOut = setTimeout(()=>{
				this.$emit('scrollClass',true)
			},600)
      },
      
      tabDetailTable( data ){ 
      	 let table = ''
      	 table += '<table id="xiantiao" class="table-print-wrap">'
      	 
      	 data.forEach((item,i) => {
      	    let page = i / this.printPageRow 
      	    let firstPage = i / 31 
      	    //let total = Math.ceil(data.length/this.printPageRow)
      	    let _style = 'style="page-break-after:always;page-break-inside: avoid;"'
      	         
      	    table += '<tr>'+ this.tabDetailCell( item , (i+1) ) +'</tr>' 
      	    
      	   // if( this.getPositive( firstPage ) && firstPage == 1 ){
      	    	// table += '<tr><td colspan="'+ this.detailDataGridColumn.length +'" class="td-page">当前第'+ firstPage +'页&nbsp;&nbsp;&nbsp;&nbsp;共'+ total +'页</td></tr>'
	      	 	//table += '</table>';
	      	 	//table += '<table class="table-print-wrap" '+ _style +' >'
      	   // }else if( this.getPositive(page) && page > 1 ){ 
	      	 	
	      	 	// table += '<tr><td colspan="'+ this.detailDataGridColumn.length +'" class="td-page">当前第'+ page +'页&nbsp;&nbsp;&nbsp;&nbsp;共'+ total +'页</td></tr>'
	      	 	//table += '</table>';
	      	 	// table += '<table class="table-print-wrap" '+ ( ((total-1)- page == 0 ) ? '' : _style) +' >'
	      //	}
      	 })
      	 
           table += '</table>'
		   //console.log(table);
      	 return table;
      },
      
      //单元格
      tabDetailCell( tb , i){
      	 let td = '';
      	 if( this.detailDataGridColumn.length > 0 ){
      	 	
      	 	this.detailDataGridColumn.forEach(( item )=>{
      	 		let classStyle = 'class="' + (item.text == '售价' || item.text == '成本' ? 'pad-right print-product-type' : 'print-product-type') + '"'
      	 		let data
				if ( item.text == '销售类型' ) {
					data = tb[item.childType] == 1 ? '销售' : tb[item.childType] == 2 ? "退换" : "回收"
				} else {
					data = tb[item.childType] == null  || tb[item.childType] == 'null' || tb[item.childType] == '' ? '-' : tb[item.childType]
				}
				   //td +='<td ' + classStyle + ' style="'+ this.tableCell(item.width) +'">'+ (item.childType == '' ? i : data) +'</td>'
      	 			td += '<td>'+
      	 			'<div style="'+ this.tableCell(item.width) +'">' +
      	 			(item.childType == '' ? i : data ) +'</div></td>'
      	 	})
      	 }
      	 return td;
      },
      
      //获取正整数
      getPositive( ex ){
      	 return /^\d*$/.test( ex )
      },
      
      tabAdd( listData ){
      	let table = ''
      	let tableData = []
      	//console.log('tableData1',listData)
      	if( listData.detailList && listData.detailList.length > 0  ){
      		listData.detailList.forEach((item)=>{
      			tableData.push(item)
      		})
      	}

      	table += this.tabDetailTable(tableData)
      	return table
      },
	  tabAdd1( listData ){
      	let table = ''
      	let tableData = []
      	//console.log('tableData2',listData)
      	if( listData.productTypeList && listData.productTypeList.length > 0  ){
      		listData.productTypeList.forEach((item)=>{
      			tableData.push(item)
      		})
      	}

      	 table += this.tabDetailTable(tableData)
      	
      	return table
      }
	},
	
	mounted(){
		this.$nextTick(()=>{
			console.log(this.detailDataGridColumn)
			let table = this.$refs.tableContainer 
			
			if( table ){
				table.removeEventListener('scroll',this.tableScroll)
				table.addEventListener('scroll', this.tableScroll, false)
			}
			
		})
	}
}
</script>
<style lang="scss">

</style>

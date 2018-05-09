<template>
<!--表格内容区-->
<!--明细-->
<div v-if="reportType == 3" class="table-print-wrap" v-html="tabAdd(dataGridStorage)"></div>


<!--成色大类、小类-->
<table v-else-if="reportType == 1 || reportType == 2" class="table-print-wrap">
    <!--页头-->
    <thead class="tab-header">
        <tr class="tr-header">
            <td v-for="tab in detailDataGridColumn"  :key="tab.id" :style="setSize(tab.width)">
                <div class="td-header-elem" :style="setSize(tab.width)">{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i></div>
            </td>
        </tr>
    </thead>
	
	<tbody  v-for="caty,k in dataGridStorage.productTypeList" :index="resetIndex(k)">
		<tr v-for="(tb,index) in caty.statisticsList" :index="addIndex()">
			<template v-for="tab in detailDataGridColumn" >
				<td :rowspan="caty.statisticsList.length" 
                
					v-if="tab.text == '产品类别' && index == 0" 
					:style="setSize(tab.width)" >
					<div class="td-header_elem" :style="setSize(tab.width)" style="font-weight: bold;">{{caty[tab.childType]}}</div>
				</td>
				<td
					v-else-if="tab.text != '产品类别'"
					:style="setSize(tab.width)" 
					:class="tab.text == '售价' || tab.text == '成本' ? 'pad-right' : ''" 
					>
					<div 
					    class="td-header_elem" 
					    :style="setSize(tab.width)" 
					    v-text = "tab.childType == ''? getIndex() : tab.toFixed ? toFixed(tb[tab.childType] , tab.countCut) : tb[tab.childType]">
					</div>
				</td>
			</template>
		</tr>
		<!--小计-->
		<tr>
			<td
				v-for="(tab,f) in detailDataGridColumn" 
				:key="tab.id" 
				:style="setSize(tab.width)" 
				:class="tab.text == '售价' || tab.text == '成本' ? 'pad-right' : ''" 
			><div 
			    class="td-header_elem" 
			    :style="setSize(tab.width)" 
			    v-html = "f ==2 ?'<b>小计</b>': tab.toFixed ? toFixed(caty[tab.totalType] , tab.countCut) : caty[tab.totalType]"></div>
			</td>
		</tr>
	</tbody>
	
	<tr>
        <td class="table-print-footer-td" v-for="(tab,f) in detailDataGridColumn" 
            :key="tab.id" 
            :colspan="f ==2 ? 3 : 0"
            v-if="f >= 2"
            :class="tab.text == '售价' || tab.text == '成本' ? 'pad-right' : ''" 
            :style="setSize(tab.width)">
            
            <p class="totalNum td-header_elem"  :style="setSize(tab.width)" v-html="v_html(tab)"></p>
            <p style="font-weight: bold;" v-if="f == 2">合计</p>
        </td>
    </tr>
	
</table>
</template>

<script>
let applyIndex = 0
export default{
	data(){
		return{
			printPageRow : 33
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType'],
	methods:{
	    
		setSize( w ){
           return{
             width : typeof w === 'number' ? ( w + 'px') : w.includes('%') ? w : w + 'px'
           }
        },
        
        //页脚专用小数点截取
        v_html( tab ){
            
           if( tab.type =='' ) return ''
           
           if( this.dataGridStorage[tab.type] == ''){
             return '<em>-</em>'
           }
           
           //小数点截取 ，合计精确到3位
           if( tab.toFixed ){
             return this.toFixed( this.dataGridStorage[tab.type] , tab.countCut + 1)
           }else{
             return this.dataGridStorage[tab.type]
           }
        },
       
        resetIndex(k){
         if( k == 0 ) applyIndex = 0
        },
        
        addIndex(){
         applyIndex++
        },
        
        getIndex(){
          this.$emit('getIndex',applyIndex)
          return applyIndex
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
      
      //分页
       tabDetailTable( data ){ 
      	 let table = ''
      	 table += '<table class="table-print-wrap">'
      	 table += '<tr>' + this.addTableTR(2) + '</tr>'
      	 data.forEach((item,i) => {
      	    let page = i / this.printPageRow 
      	    let firstPage = i / 30 
      	    let total = Math.ceil(data.length/this.printPageRow)
      	    let _style = 'style="page-break-after:always;page-break-inside: avoid;"'
      	         
      	    table += '<tr>'+ this.tabDetailCell( item , (i+1) ) +'</tr>' 
      	    
      	    if( this.getPositive( firstPage ) && firstPage == 1 ){
      	    	table += '<tr><td colspan="'+ this.detailDataGridColumn.length +'" class="td-page">当前第'+ firstPage +'页&nbsp;&nbsp;&nbsp;&nbsp;共'+ total +'页</td></tr>'
	      	 	table += '</table>';
	      	 	table += '<table class="table-print-wrap" '+ _style +' >'
      	    }else if( this.getPositive(page) && page > 1 ){ 
	      	 	
	      	 	table += '<tr><td colspan="'+ this.detailDataGridColumn.length +'" class="td-page">当前第'+ page +'页&nbsp;&nbsp;&nbsp;&nbsp;共'+ total +'页</td></tr>'
	      	 	table += '</table>';
	      	 	table += '<table class="table-print-wrap" '+ ( ((total-1)- page == 0 ) ? '' : _style) +' >'
	      	}
      	 })
      	 table += '<tr>' + this.addTableTR(1) + '</tr>'
      	 table += '</table>'
      	 return table
      },
      
      //单元格
      tabDetailCell( tb , i){
      	 let td = '';
      	 if( this.detailDataGridColumn.length > 0 ){
      	 	
      	 	this.detailDataGridColumn.forEach(( item )=>{
      	 		let classStyle = 'class="' + (item.text == '售价' || item.text == '成本' ? 'pad-right' : '') + '"'
      	 		let data = tb[item.childType] == null  || tb[item.childType] == 'null' || tb[item.childType] == '' ? '-' : tb[item.childType]
      	 		td +='<td ' + classStyle + ' style="width:'+ this.setSize(item.width).width +'">'
      	 		td += '<div class="td-header_elem" style="width:'+ this.setSize(item.width).width +'">' 
      	 		//明细 body区域小数点截取
      	 		td += item.childType == '' ? i : item.toFixed ? this.toFixed(tb[item.childType] , item.countCut) : data
      	 		td += '</div></td>'
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
      	// console.log('tableData',listData.printDetailList)
      	if( listData.printDetailList && listData.printDetailList.length > 0  ){
      		listData.printDetailList.forEach(( item)=>{
      			tableData.push(item)
      		})
      	}

      	table += this.tabDetailTable(tableData)
      	
      	return table
      },
      
      //添加页头、页脚
      addTableTR(type){
          let td = ''
          this.detailDataGridColumn.forEach((item,i)=>{
             switch( type ){
                
               //页脚
               case 1 :
                 if( i <= 2 ){
                  if( i == 2 ){
                    td += '<td colspan="3" style="width:'+ item['width'] +'px"><b>合计</b></td>'
                  }
                 }else{
                    td += '<td style="width:'+ item['width'] +'px" class="'+ (item['text'] == '售价' || item['text'] == '成本' ? 'pad-right' : '') + '" >' 
                    td += '<div class="td-header_elem" style="width:'+ item['width'] +'px">' 
                    //页脚小数点
                    td +=  this.v_html(item)
                    td += '</div>'
                    td += '</td>'
                 }
               break;
               
               //页头
               case 2 :
                 td += '<td style="width:'+ item['width'] +'px">' 
                 td += item['text']
                 if( item['unit'] != ''){
                   td += '<i class="tab-header-unit">' + item['unit'] + '</i>'   
                 }
                 td += '</td>'
               break;
             }
            
          })
          return td
      }
	},
	
	mounted(){
		this.$nextTick(()=>{
		    
		})
	}
}
</script>
<style lang="scss">
.td-header_elem{
  word-break: break-word;
  margin: 0 auto;
}
.tab-header-unit{
  font-style:normal;
  font-size: 6pt;
  color: #999;
}
</style>

<style scoped lang="scss">
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
          margin: 0 auto;
        }
    }
    
    .tab-header{
        border-collapse: collapse;
        width: 100%;
    }

</style>

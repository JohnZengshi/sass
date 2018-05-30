<template>
<transition name="tp-ani">
<div class="table-template-print">
    <table class="table-print-wrap table-print-title">
		<tr class="tab-title-tr">
			<td :colspan="detailDataGridColumn.length" style="text-align:center;font-weight: bold; font-size: 16px;">
				库存-{{reportType==1 ? '明细' : (reportType==2 ? '智能分类' : reportType== 3? '产品分类' : '自定义')}}
			</td>
		</tr>
	</table>
	<!--表头 start-->
	<data-grid-header :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
	<!--表格内容区  -->
	<data-grid-body 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
		:reportType = "reportType"
        :positionSwitch="positionSwitch"
		@scrollClass = "scrollClass"
        @lazyloadSend = "lazyloadSend"
		@tabCell="tabCell">
	</data-grid-body>
	<!--表尾  -->
	<data-grid-footer :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType = "reportType" @tabCell="tabCell"></data-grid-footer>
</div>
</transition>
</template>

<script>
import {jcpPrint} from "@/tools/jcp-print";
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
//let configData = null
let configData = require('./config/dataGridConfig')
export default {
	data(){
		return{
			tempDatagrid : [],
			detailDataGridColumn : []
		}
	},
	components:{
		DataGridFooter,
		DataGridBody,
		DataGridHeader
	},
	watch :{
        reportType:function(){
			//this.configType()
			this.tableSwitch()
        },
        //开关 成本列
		tabSwitch: function(){
			this.tableSwitch()
        },
        positionSwitch : function(){
			this.posSwitch()
		},
	},
	props : ['dataGridStorage','reportType','tabSwitch','isOld', 'positionSwitch'],
	methods:{
        print () {
            let doc = {
              documents: document,
            };
            jcpPrint.printPreview(doc);
        },
        lazyloadSend (val) {
            this.$emit('lazyloadSend', val)
        },
        ObjectAssign(){
            this.tempDatagrid = [];
            this.detailDataGridColumn.forEach((item)=>{
                let tempItem = Object.assign({},item)
                this.tempDatagrid.push(tempItem)
            })
        },
        //单元格宽度
		tabCell( result ){
			if( result.width ){
				let w = 'width:' + result.width + 'px'
				result.res && result.res.call(this, w)
			}
       },
        tableSwitch(){
            let temp = [];
            //this.setConfig()
            this.configType()
            this.ObjectAssign()
            if (!this.tabSwitch) {
                //console.log(11111)
                if (!this.positionSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本' && _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 26
                            temp.push( _item )
                        }
                    })
                    //console.log(temp)
                } else {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                    //console.log(temp)
                }  
                
            } else {
                if (!this.positionSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                } else {
                    temp = this.tempDatagrid
                }
            }
            this.detailDataGridColumn = temp;
            console.log('temp',this.detailDataGridColumn)
        },
        posSwitch(){
            let temp = [];
            //this.setConfig()
            this.configType()
            this.ObjectAssign()
            if (!this.positionSwitch) {
                //console.log(11111)
                if (!this.tabSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本' && _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 30
                            temp.push( _item )
                        }
                    })
                } else {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                }  
                
            } else {
                if (!this.tabSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                } else {
                    temp = this.tempDatagrid
                }
            }
            this.detailDataGridColumn = temp;
            console.log('temp',this.detailDataGridColumn)
        },
        configType(){
            //console.log(this.reportType)
            switch( this.reportType ){
                case 1 :
                    this.setColumn(configData.detailConfing)
                break;
                case 2 :
                    this.setColumn(configData.intelligentConfing)
                break;
                case 3 :
                    this.setColumn(configData.produceConfing)
                break;
                case 4 :
                    this.setColumn(configData.customConfing)
                break;
            }
                
        },
        scrollClass( type ){
            this.$emit('scrollClass', type )
        },
        setColumn(data){
            if(data) this.detailDataGridColumn = data
        }
	},
	mounted(){
		this.$nextTick(()=>{
			this.tableSwitch()
		})
	}
}
</script>

<style lang="scss">
.table-template-print{
	min-height: 180mm;
	background: transparent;
	width: 210mm;
    margin: 0 auto;
    i {
        font-style: normal;
        background:transparent !important;
    }
	.table-print-wrap{
		border-collapse: collapse;
		width: 100%;
		font-size: 9pt;
		td{
			border: 0.5mm solid #333;
			font-size: 8pt;
			text-align: center;
			height: 8mm;
			padding: 0;
			white-space: nowrap;
		
			&.pad-right{
				text-align: right;
				padding-right: 9px;
			}
		}
		tr{
			page-break-inside: avoid;
		}
        .tb-total {
            td {
                border-top-width: 0;
            }
        }
		
		.table-print-footer-td{
			border-top-width: 0;
		}
		
	}
	
	.table-print-title{
		margin-top: 10mm;
	}
	
	tr.tab-title-tr{
		height: 20mm;
		>td{
			height: 20mm;
			border:0 none;
			font-size: 8pt;
			text-align: left;
			padding: 0;
			width: 600px;
			line-height: 20px;
			p{
				float: left;
				display: inline-block;
				padding-right: 12px;
			}
			
			>.td{
				display: inline-block;
				color: #999;
				white-space: nowrap;
				max-width: 100px;
				overflow: hidden;
				vertical-align: middle;
			}
		}
		
		.time{
			text-align: right;
		}
	}

}
@media print{

}
</style>
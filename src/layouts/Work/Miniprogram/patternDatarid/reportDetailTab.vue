<template>
<transition name="tp-ani">
<div class="tab_detail_table">
	<!--表头 start-->
	<data-grid-header :newList="newList" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
	<!--表格内容区  -->
	<data-grid-body 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="patternDataList" 
		:reportType="reportType"
        :positionSwitch="positionSwitch"
        :isRole = 'isRole'
        :shopId="shopId"
        :styleId="styleId"
		@scrollClass = "scrollClass"
        @lazyloadSend = "lazyloadSend"
        @deletePatternitem="deletePatternitem"
        @messageBack="messageBack"
		@tabCell="tabCell">
	</data-grid-body>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
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
			this.tableSwitch()
        },
        //开关 成本列
		tabSwitch : function(){
			this.tableSwitch()
        },
        positionSwitch : function(){
			this.posSwitch()
		},
	},
	props : ['patternDataList','reportType','tabSwitch','isOld', 'isRole', 'positionSwitch', 'newList','shopId','styleId'],
	methods:{
        deletePatternitem(val){
           this.$emit('deletePatternitem',val);
        },
        messageBack (val) {
            this.$emit('messageBack', val)
        },
        sortList (val) {
            this.$emit('sortList', val)
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
            //console.log('temp',this.detailDataGridColumn)
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
            //console.log('temp',this.detailDataGridColumn)
        },
        configType(){
             this.setColumn(configData.detailConfing)   
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

<style>
</style>
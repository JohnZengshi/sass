<template>
<transition name="tp-ani">
<div class="tab_detail_table">
	<!--表头 start-->
	<data-grid-header :newList="newList" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
	
	
	
	<template v-if="this.type == 'edit'">
	  <!--表格内容区  -->
    <data-edit-body 
        ref="DataEditBody"
        :isProductStyle="isProductStyle"
        :detailDataGridColumn="detailDataGridColumn" 
        :dataGridStorage="dataGridStorage" 
        :reportType="reportType"
        :isEditReport="type"
        :positionSwitch="positionSwitch"
        :dataGridOptions="dataGridOptions"
        :orderType="orderType"
        @scrollClass = "scrollClass"
        @lazyloadSend = "lazyloadSend"
        @tabCell="tabCell">
    </data-edit-body>

	  <!--表尾  -->
  	<data-edit-footer 
  	  :detailDataGridColumn="detailDataGridColumn" 
  	  :dataGridStorage="dataGridStorage" 
  	  :reportType = "reportType" 
  	  @tabCell="tabCell">
  	</data-edit-footer>
	</template>
    
	<template v-else>
    
	<!--表格内容区  -->
    <data-grid-body 
        ref="DataGridBody"
        :isProductStyle="isProductStyle"
        :detailDataGridColumn="detailDataGridColumn" 
        :dataGridStorage="dataGridStorage" 
        :reportType="reportType"
        :positionSwitch="positionSwitch"
        :dataGridOptions="dataGridOptions"
        :orderType="orderType"
        @scrollClass = "scrollClass"
        @lazyloadSend = "lazyloadSend"
        @tabCell="tabCell">
    </data-grid-body>

    <!--表尾  -->
    <data-grid-footer 
      :detailDataGridColumn="detailDataGridColumn" 
      :dataGridStorage="dataGridStorage" 
      :reportType = "reportType" 
      :configData="configData"
      @tabCell="tabCell">
    </data-grid-footer>
  </template>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataEditBody from './editBody'
import DataGridFooter from './dataGridFooter'
import DataEditFooter from './editFooter'
import ReadMoreData from 'components/work/readMoreData.vue'
//let configData = null
let configData = require('./config/dataGridConfig')
let editConfigData = require('./config/edit')
export default {
	data(){
		return{
			tempDatagrid : [],
			detailDataGridColumn : [],
			configData : configData
		}
	},
	components:{
		DataGridFooter,
		DataGridBody,
		DataEditBody,
		DataGridHeader,
        DataEditFooter,
        ReadMoreData,
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
		
		type : function(){
		  if(this.type == 'edit'){
		    this.$set(this,'configData', editConfigData)
		  }
		}
	},
	created(){
	    if (this.type == 'edit') {
            this.$set(this,'configData', editConfigData)
        }
	},
	props : ['dataGridStorage','reportType','tabSwitch','isOld', 'positionSwitch', 'newList','type', 'dataGridOptions', 'orderType', 'isProductStyle'],
	methods:{
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
            console.log('temp',this.detailDataGridColumn)
        },
        posSwitch(){
            let temp = [];
            //this.setConfig()
            this.configType()
            this.ObjectAssign()
            if (!this.positionSwitch) {
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
        },
        configType(){
            switch( this.reportType ){
                case 1 :
                    this.setColumn(this.configData.detailConfing)
                break;
                case 2 :
                    this.setColumn(this.configData.intelligentConfing)
                break;
                case 3 :
                    this.setColumn(this.configData.produceConfing)
                break;
                case 4 :
                    this.setColumn(this.configData.customConfing)
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

<style>
</style>
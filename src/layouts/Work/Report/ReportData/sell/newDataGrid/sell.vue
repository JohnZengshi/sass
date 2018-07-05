<template>
<transition name="tp-ani">
<div class="tab_detail_table">
	<!--表头 start-->
	<data-grid-header 
	  :newList="newList"  
	  @sortList="sortList" 
	  :reportType="reportType" 
	  :detailDataGridColumn="detailDataGridColumn" 
	  @tabCell="tabCell"></data-grid-header>
	<!--表格内容区  -->
	<data-grid-body 
        ref="DataGridBody"
        :detailDataGridColumn="detailDataGridColumn" 
        :dataGridStorage="dataGridStorage" 
        :reportType="reportType"
        :positionSwitch="positionSwitch"
        @scrollClass = "scrollClass"
        @lazyloadSend = "lazyloadSend"
        @tabCell="tabCell">
	</data-grid-body>
    <!-- <slot>
    </slot> -->
	<!--表尾  -->
	<data-grid-footer :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType = "reportType" @tabCell="tabCell"></data-grid-footer>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
//let configData = null
let configData = require('./config/sell')
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
    // 开关回购额
    isBuyBack () {
        this.tableSwitch()
    },
    positionSwitch : function(){
			this.posSwitch()
		},
	},
	props : ['dataGridStorage','reportType','tabSwitch', 'positionSwitch','newList', 'isBuyBack'],
	methods:{
    sortList (val) {
        // debugger
      //console.log(val)
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
            if (!this.isBuyBack) {
                this.tempDatagrid.forEach((item)=>{
                    let tempwidth, _item = Object.assign({},item)
                    if(  _item.width && _item.text !='成本' && _item.width && _item.text !='毛利' && _item.width && _item.text !='购买额' && _item.text !='退换' && _item.text !='回收' && _item.text !='实收'){
                        tempwidth = parseInt(_item.width)
                        _item.width = tempwidth + 13
                        temp.push( _item )
                    }
                })
            } else {
                this.tempDatagrid.forEach((item)=>{
                    let tempwidth, _item = Object.assign({},item)
                    if( _item.width && _item.text !='成本' && _item.width && _item.text !='毛利'){
                      temp.push( _item )
                    }
                }) 
            }
          } else if (!this.isBuyBack) {
            this.tempDatagrid.forEach((item)=>{
                let tempwidth, _item = Object.assign({},item)
                if( _item.width && _item.text !='购买额' && _item.text !='退换' && _item.text !='回收' && _item.text !='实收'){
                    tempwidth = parseInt(_item.width)
                    _item.width = tempwidth + 13
                    temp.push( _item )
                }
            })
          } else {
            temp = this.tempDatagrid
          }
          this.detailDataGridColumn = temp;
        },
        posSwitch(){
            // debugger
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
                    if (!this.isBuyBack) {
                        let tempwidth, _item = Object.assign({},item)
                            if( _item.width && _item.text !='成本' && _item.width && _item.text !='购买额'){
                                tempwidth = parseInt(_item.width)
                                _item.width = tempwidth + 13
                                temp.push( _item )
                            }
                    } else {
                        this.tempDatagrid.forEach((item)=>{
                            let tempwidth, _item = Object.assign({},item)
                            if( _item.width && _item.text !='成本'){
                                tempwidth = parseInt(_item.width)
                                _item.width = tempwidth + 13
                                temp.push( _item )
                            }
                        })
                    }
                } else {
                    temp = this.tempDatagrid
                }
            }
            this.detailDataGridColumn = temp;
            //console.log('temp',this.detailDataGridColumn)
        },
        configType(){
            //console.log(this.reportType)
            switch( this.reportType ){
                case 1 :
                    this.setColumn(configData.detailConfing)
                break;
                case 2 :
                    this.setColumn(configData.capacityClassify)
                break;
                case 3 :
                    this.setColumn(configData.productClassify)
                break;
                case 4 :
                    this.setColumn(configData.productCustom)
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
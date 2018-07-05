<template>
<transition name="tp-ani">
<div class="tab_detail_table">
	<!--表头 start-->
	<data-grid-header :newList="newList" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
        <!--表格内容区  -->
        <data-grid-body 
            :detailDataGridColumn="detailDataGridColumn" 
            :dataGridStorage="dataGridStorage" 
            :reportType="reportType"
            :positionSwitch="positionSwitch"
            :isRole = 'isRole'
            @scrollClass = "scrollClass"
            @lazyloadSend = "lazyloadSend"
            @messageBack="messageBack"
            @tabCell="tabCell"
            @watchScroll="watchScroll"
            >
        </data-grid-body>
    <!-- 加载更多未读数据 -->
        <ReadMoreData 
        :allData="dataGridStorage" 
        :dgDataList="dataGridStorage.detailList" 
        ref="ReadMoreDataDmo" 
        @readMoreData="readMoreData"
        ></ReadMoreData>
	<!--表尾  -->
	<data-grid-footer :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType = "reportType" @tabCell="tabCell"></data-grid-footer>
    <!-- 加载条数选择 -->
    <!-- <LoaderNum class="loaderNum" @changeUpdataPageSize="changeUpdataPageSize"></LoaderNum> -->

</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
import ReadMoreData from 'components/work/readMoreData.vue'
import LoaderNum from 'components/work/loaderNum.vue'
//let configData = null
let configData = require('./config/dataGridConfig')
export default {
	data(){
		return{
			tempDatagrid : [],
            detailDataGridColumn : [],
            upDataNum:30
		}
	},
	components:{
		DataGridFooter,
		DataGridBody,
        DataGridHeader,
        ReadMoreData,
        LoaderNum
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
	props : ['dataGridStorage','reportType','tabSwitch','isOld', 'isRole', 'positionSwitch', 'newList'],
	methods:{
        messageBack (val) {
            this.$emit('messageBack', val)
        },
        sortList (val) {
            //console.log(val)
            this.$emit('sortList', val)
        },
        lazyloadSend (val) {
            // console.log("到底部了")
            // this.$emit('lazyloadSend', val)
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
            // console.log(this.reportType)
            // console.log(configData)
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
        },
        // 监听表格滚动
        watchScroll(scrollHeight,clientHeight,scrollTop){
            let res = this.$refs.ReadMoreDataDmo.isShowMoreDataTip(scrollHeight, clientHeight, scrollTop);
            if(res){
                this.readMoreData();
            }
        },
        // 加载更多未读数据
        readMoreData(){
            let totalNum = this.dataGridStorage.totalNum;
    	    let length = this.dataGridStorage.detailList.length;
            let upDataNum = this.$parent.$refs["LoaderNum"].pageSize;
            var pageSize = 0
            //   this.dgDataList = [];
            // console.log(Number(upDataNum))
    	    if (Number(upDataNum)) {
    	      upDataNum = Number(upDataNum);
    	      if (totalNum - length < upDataNum) {
    	        pageSize = 0
    	      } else {
    	        pageSize = length + upDataNum
    	      }
    	    } else {
    	      pageSize = 0
            }
            this.$emit('lazyloadSend',pageSize);
        },
        //加载页数变化
        changeUpdataPageSize(val) {
        //   console.log(val)
          this.upDataNum = val
        }
	},
	mounted(){
		this.$nextTick(()=>{
			this.tableSwitch()
		})
	}
}
</script>

<style lang="less" scoped>
  .loaderNum {
    right: -68px;
    bottom: -25px;
  }
</style>

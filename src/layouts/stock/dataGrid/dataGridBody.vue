<template>
<!--表格内容区-->
<!--明细-->
<div class="ui-table-container default-line" ref="tableContainer" v-if="reportType == 3">
	<div>
		<div class="tb-tr" v-for="(tb,index) in tempArray" :key="index">
			<div class="tb-td"
				v-for="tab in detailDataGridColumn" 
				:key="tab.id" 
				:style="tableCell(tab.width)" 
				v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"
			></div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>
	
<div class="ui-table-container" ref="tableContainer" v-else-if="reportType == 1 || reportType == 2">
	<div>
		<!--成色大类-->
		<div class="tb-category" v-for="(caty,index) in dataGridStorage.productTypeList" :key="index">
			<div class="tb-tr" v-for="(tb,index) in caty.statisticsList" :key="index">
				<template v-for="(tab,index) in detailDataGridColumn" >
					<div class="tb-td category-td" :key="index"
						v-if="tab.text == '产品类别' && index == 0" 
						:style="tableCell(tab.width)" >
						<i :style="'height:'+caty.statisticsList.length * 50 +'px'">{{caty[tab.childType]}}</i>
					</div>
					<div class="tb-td"
						v-else :key="index"
						:style="tableCell(tab.width)" 
						v-text = "tab.childType == ''? (index+1) : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]">
					</div>
				</template>	
			</div>
			<!--小计-->
			<div class="tb-total">
				<div class="tb-td"
					v-for="(tab,f) in detailDataGridColumn" 
					:key="tab.id" 
					:style="tableCell(tab.width)" 
					v-html = "f ==2 ?'<b>小计</b>': tab.toFixed ? toFixed(caty[tab.totalType],tab.countCut) : caty[tab.totalType]"
				></div>
			</div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return{
			isDate : false,
			tempArray : []
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType'],
	
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.cheackData()
			this.storageFormatDate()
		}
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
		
		$(".ui-table-container").mCustomScrollbar({
            theme: "minimal-dark",
            axis: 'y',
            mouseWheel: {
                scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: false,
                scrollInertia : 0
            },
            callbacks: {
                onTotalScroll: function () {
					if (_this.reportType == 3) {
						_this.$emit('lazyloadSend', {refresh: true})
					} else {
						console.log('略略略')
					}
				  //{refresh: true}
                  console.log('执行')
                }
            }
        });
		
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
    
     	//格式化
     	storageFormatDate(){
     		if( this.reportType == 3  && this.dataGridStorage ){
				if(  this.dataGridStorage.detailList.length > 0 ){
				    console.log('dataGridStorage',this.dataGridStorage)
				     this.tempArray = this.dataGridStorage.detailList
					 /*this.dataGridStorage.productTypeList.forEach((item)=>{
					 	 if( item.detailList && item ){
					 	 	if( item.detailList.length > 0 ){
					 	 		item.detailList.forEach((res)=>{
					 	 			this.tempArray.push(res)
					 	 		})
					 	 	}
					 	 }
					 })*/
				}	
			}
     	},
     	
     	cheackData(){
     	   console.log('dataGridStorage',this.dataGridStorage)
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
		console.log('updata')
	}
}
</script>

<style scoped lang="scss">
.ui-table-container{
    //height: 556px;
    //overflow-y: auto;
    
    &.default-line{
      .tb-tr:nth-child(even){
          background-color: #fbfbfb;
      }
    }
    
    .tb-tr{
      height: 50px;
      display: flex;

      .tb-td{
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;    
        text-align: center;
        font-size: 14px; 
        font-weight: 500;
        transition: all .1s;
        white-space: nowrap;
        color: #333;
        -webkit-font-smoothing:subpixel-antialiased;
        text-overflow: ellipsis;
        
        
        &.category-td{
            position: relative;
            
            
            >i{
                font-style: normal;
                // font-weight: bold;
                // color: #248efc;
				// font-size: 15px;
				color:#333;
                font-size: 14px;
                position: absolute;
                display: flex;
                align-items: center;
                width: 100%;
                left: 0;
                top: 0;
                text-align: center;
                justify-content:center
            }
        }
      }
    }
  
  .tb-total{
      background-color: #fbfbfb;
      height: 50px;
      display: flex;
      
      .tb-td{
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;    
        text-align: center;
        font-size: 14px; 
        font-weight: 500;
        color: #ff3b30;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        >b{
            color: #333;
        }
      }
  }
}

.no-data{
	height: 100%;
	background: url(~static/img/space-page.png) center center no-repeat;
}
</style>
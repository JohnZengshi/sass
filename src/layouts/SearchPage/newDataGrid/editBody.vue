<template>
<!--表格内容区-->
<!--明细-->
<div class="ui-table-container default-line" ref="tableContainer" v-if="reportType == 1" :class="isEditReport == 'edit' ? 'edit' : ''">
	<div>
	  <template v-for="(tb, index) in tempArray">
  		<div class="tb-tr" :class="index % 2 == 0 ? 'tb-tr-gray' : ''" :key="index" @click="openDetails">
  			<div class="tb-td"
  				v-for="(tab,i) in detailDataGridColumn" 
  				:style="tableCell(tab.width)" 
  				v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"
					:key="i"
  			></div>
  		</div>
  		
  		<!--报表-修改页面专用 start -->
  		<div class="tb-tr edit-tb-tr" :class="index % 2 == 0 ? 'tb-tr-gray' : ''" v-if="isEditReport == 'edit'">
        <div class="tb-td"
          v-for="tab in detailDataGridColumn" 
          :style="tableCell(tab.width)" 
          v-html = "tab.editOldType == ''?  (tab.text == '条码号' ? '<em></em>':'')  : tab.toFixed ? toFixed(tb[tab.editOldType],tab.countCut) : tb[tab.editOldType]"
        ></div>
      </div>
      
		</template>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>
	
<div class="ui-table-container con-line" ref="tableContainer" v-else-if="reportType == 2 || reportType == 4" :class="isEditReport == 'edit' ? 'edit' : ''">
	<div>
		<div class="tb-category" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)">
			<div v-for="(tb, index) in caty.productTypeList" >
				
				<template v-for="(tb1, index1) in tb.detailList">
  				<div class="tb-tr" :class="index1 % 2 == 0 ? 'tb-tr-gray' : ''" :index="addIndex()">
  					<template v-for="tab in detailDataGridColumn">
  						<div class="tb-td category-td"
  							v-if="tab.text == '产品类别' && index1 == 0" 
  							:style="tableCell(tab.width)" >
  							<i v-if="isEditReport == 'edit'" :style="'height:'+ (tb.detailList.length * 50)*2 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i>
  						</div>
  						<div class="tb-td category-td"
  							v-else-if="tab.text == '位置名称' && index == 0 && index1 == 0"
  							:style="tableCell(tab.width)"
  						>	
  							<i :style="'height:'+ heightArr[ind] +'px;  background: #fff; width: 100%; line-height: 20px;'">{{caty[tab.childType]}}</i>
  						</div>
  						<div class="tb-td"
  							v-else
								style="overflow: hidden;"
  							:class="{backLine:tab.childType != ''}"
  							:style="tableCell(tab.width)" 
  							v-text = "tab.childType == ''? getIndex() : tb1[tab.childType]">
  						</div>
  					</template>
  				</div>
  				
  				<!--报表-修改页面专用 start -->
  				<template v-if="isEditReport == 'edit'">
    				<div class="tb-tr edit-tb-tr" :class="index % 2 == 0 ? 'tb-tr-gray' : ''">
              <template v-for="tab in detailDataGridColumn">
                <div class="tb-td"
                  :style="tableCell(tab.width)" 
                  v-html = "tab.editOldType == ''? (tab.text == '首饰名称' ? '<em></em>':'') : tb1[tab.editOldType]">
                </div>
              </template>
            </div>
          </template>
          <!--报表-修改页面专用 end -->
        
        </template>
        
				<div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
				<div class="tb-total" style="background:#e9f4fe;" v-if="!positionSwitch"><!-- 类型小计 -->
					<div class="tb-td"
						v-for="(tab,f) in detailDataGridColumn" 
						:style="tableCell(tab.width)" 
						v-html = "f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(tb[tab.totalType], tab.countCut) : tb[tab.totalType]"
					></div>
				</div>
			</div>
			<div class="tb-total" style="background:#e9f4fe;" v-if="positionSwitch"> <!-- 位置小计 -->
				<div class="tb-td"
					v-for="(tab,f) in detailDataGridColumn" 
					:style="tableCell(tab.width)" 
					v-html = "f == 1 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"
				></div>
			</div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>

<!--产品分类-->
<div class="ui-table-container produc-line" ref="tableContainer" v-else-if="reportType == 3" :class="isEditReport == 'edit' ? 'edit' : ''">
	<div>
		<div class="tb-category" v-for="caty in dataGridStorage.dataList" >
		  <template v-for="(tb, index) in caty.productTypeList">
  			<div class="tb-tr" :class="index % 2 == 0 ? 'tb-tr-gray' : ''">
  				<template v-for="tab in detailDataGridColumn">
  					<div class="tb-td category-td"
  						v-if="tab.text == '产品类别' && index == 0" 
  						:style="tableCell(tab.width)"
  						v-text="tb[tab.childType]"
  						>
  						<!-- <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i> -->
  					</div>
  					<div class="tb-td category-td"
  						v-else-if="tab.text == '位置名称' && index == 0"
  						:style="tableCell(tab.width)"
  					>	
  						<i :style="'height:'+ caty.productTypeList.length * 50 +'px;  color: #2993f8; background:#fff;'">{{caty[tab.childType]}}</i>
  					</div>
  					<div class="tb-td"
  						v-else
  						:style="tableCell(tab.width)" 
  						v-text = "tab.childType == ''? (index+1) : tb[tab.childType]">
  					</div>
  				</template>
  			</div>
  			
  			<!--报表-修改页面专用 start -->
  			<div class="tb-tr edit-tb-tr" :class="index % 2 == 0 ? 'tb-tr-gray' : ''" v-if="isEditReport == 'edit'">
          <template v-for="tab in detailDataGridColumn">
            <div class="tb-td"
              :style="tableCell(tab.width)" 
              v-html = "tab.editOldType == ''? (tab.text == '产品类别' ? '<em></em>':'') : tb[tab.editOldType]">
            </div>
          </template>
        </div>
        
			</template>
			
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
</div>
</template>

<script>
let applyIndex = 0
export default {
	data(){
		return{
			isDate : false,
			tempArray : [],
			heightArr: []
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType', 'positionSwitch','isEditReport'],
	
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.cheackData()
			this.storageFormatDate()
			//console.log(1111)
			this.tabCellHeight()
		},
		// 'reportType': function (val) {
		// 	//console.log(this.positionSwitch)
		// 	this.tabCellHeight()
		// },
		// 'positionSwitch': function (val) {
		// 	//console.log(val)
		// 	this.tabCellHeight()
		// }
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
                normalizeDelta: true,
                scrollInertia : 50
            },
            callbacks: {
                onTotalScroll: function () {
					console.log('滚轮到底了')
					$('.loadControl').css({
						opacity:1
					})
                },
				onUpdate(){
					console.log('滚动条更新')
					$('.loadControl').css({
						opacity:0
					})
				},
				whileScrolling(){
					console.log('滚动条活动')
					$('.loadControl').css({
						opacity:0
					})
				}
            }
        });
		this.tabCellHeight()
	},
	methods:{
		//重置index
	  resetIndex( index ){
         if( index == 0 ) applyIndex = 0
        },
        //
        addIndex(){
         ++applyIndex
    },
        
    getIndex(){
          this.$emit('getIndex',applyIndex)
          return applyIndex
    },
		tabCellHeight () {
			this.heightArr = []
			//console.log(this.dataGridStorage)
			if (this.dataGridStorage.dataList) {
				for (let i = 0; i < this.dataGridStorage.dataList.length; i++) {
					let data = 0
					for (let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
						data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 50
						if (i == 0) {
							//console.log(this.dataGridStorage.dataList[i].productTypeList[j].detailList.length)
						}
					}
					this.heightArr.push(data)
				}
				//console.log(this.heightArr)
			}
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
    
    //格式化
    storageFormatDate(){
     		if( this.reportType == 1  && this.dataGridStorage ){
				if(  this.dataGridStorage.detailList.length > 0 ){
				     this.tempArray = this.dataGridStorage.detailList
				}	
			}
    },
     	
    cheackData(){
     		if( this.dataGridStorage.productTypeList ){
				  this.isDate = this.dataGridStorage.productTypeList.length == 0
  			}else if( this.dataGridStorage.buyBackList ){
                this.isDate = this.dataGridStorage.buyBackList.length == 0
            }else if( this.dataGridStorage.detailList ){
                this.isDate = this.dataGridStorage.detailList.length == 0
            }else{
  				this.isDate = true;
  			}
		},
		
		// 点击事件
		openDetails() {
			console.log('打开详情')
		}
     	
	},
	update(){
		console.log('updata')
	},
	created () {
		console.log('当前显示的类型',this.reportType)
	}
}
</script>
<style lang="scss">
.tb-total {
	.tb-td {
		b {
			color:#333;
		}
	}
}

.ui-table-container{
  &.edit{
    .tb-tr{
      background-color: #fff!important;
      &.tb-tr-gray{
        background-color: #f9f9f9!important;
      }
      &.edit-tb-tr{
        >.tb-td{
          color: #2993f8;
        }
      }
    }
  }
  .tb-td{
    >em{ color: #999; font-style: normal;}
  }
}

</style>
<style scoped lang="scss">
.ui-table-container{
    height: 556px;
    overflow-y: auto;
    &.produc-line {
		.tb-tr:nth-child(even){
			background-color: #f9f9f9;
		}
	}
    &.default-line{
      .tb-tr:nth-child(even){
        background-color: #f9f9f9;
      }
	}
	&.con-line {
		.tb-tr:nth-child(even) {
			.backLine{
				background-color: #f9f9f9;
			}
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
			//overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre-wrap;
            >i{
                font-style: normal;
                // font-weight: bold;
                // color: #248efc;
				color:#333;
                font-size: 14px;
                // font-size: 15px;
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
      background-color: #e9f4fe;
      height: 50px;
      display: flex;
      
      .tb-td{
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;    
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #2993f8;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        b{
            color: #333 !important;
        }
      }
  }
}

.no-data{
	height: 100%;
	background: url(~static/img/space-page.png) center center no-repeat;
}
</style>
<template>
<!--表格内容区-->
<!--明细-->
<div class="ui-table-container default-line" ref="tableContainer" v-if="reportType == 3">
	<div>
		<div class="tb-tr" v-for="(tb,index) in dataGridStorage.detailList">
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
	<!--成色大类-->
	<div>
		<div class="tb-category" v-for="caty,k in dataGridStorage.productTypeList" :index="resetIndex(k)">
			<div class="tb-tr" v-for="(tb,index) in caty.statisticsList" :index="addIndex()">
				<template v-for="tab in detailDataGridColumn" >
					<div class="tb-td category-td"
						v-if="tab.text == '产品类别' && index == 0" 
						:style="tableCell(tab.width)" >
						<i :style="'height:'+caty.statisticsList.length * 50 +'px'">{{caty[tab.childType]}}</i>
					</div>
					<div class="tb-td"
						v-else
						:style="tableCell(tab.width)" 
						v-text = "tab.childType == ''? getIndex() : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]">
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
let applyIndex = 0
export default{
	data(){
		return{
			isDate : false
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType'],
	
	watch:{
		dataGridStorage:function(){
			this.cheackData()
		}
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
     	}
     	
	},
	update(){
	    
	},
	mounted(){
	    let _this = this
		$(".ui-table-container").mCustomScrollbar({
            theme: "minimal-dark",
            axis: 'y',
            scrollInertia:100, //滚动条移动速度，数值越大滚动越慢
            mouseWheel: {
                scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: false,
                scrollInertia : 0
            },
            callbacks:{
               whileScrolling : function(){
                 //console.log('whileScrolling')
               },
               onScroll : function(){
                  //console.log('onScroll')
               },
               onScrollStart : function(){
                 //console.log('onScrollStart')
               },
               onTotalScroll: function(){
                 if( _this.reportType == 3 ){
                    _this.$emit('lazyloadSend')
                 }
               }
            }
        });
		this.$nextTick(()=>{
		    
			if( this.dataGridStorage ){
				this.cheackData()
			}
		})
	}
}
</script>

<style scoped lang="scss">
.ui-table-container{
    height: 556px;
}

.no-data{
	height: 500px;
	background: url(../../../../../static/img/space-page.png) center center no-repeat;
	opacity: 0.3;
}
</style>
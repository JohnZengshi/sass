<template>
<!--表格内容区-->
<div class="xj-report-table-container default-line" ref="tableContainer">
	<div>
	  <template v-for="(tb, index) in dataGridStorage">
			<div class="tb-tr" :key="index" :class="{'print-on': filterChange(index)}">
				<div class="tb-td"
					v-for="(tab,num) in detailDataGridColumn" 
					:style="tableCell(tab.width)"
          :title="tb[tab.childType]"
					v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"
				:key="num"
				></div>
			</div>
		</template>
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
			heightArr: [],
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType', 'positionSwitch', 'printNum'],
	
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.cheackData()
			this.storageFormatDate()
			// this.tabCellHeight()
		}
	},
	mounted () {
    let _this = this
		this.$nextTick(()=>{
			
			if( this.dataGridStorage.length ){
				this.tempArray = []
				this.cheackData()
				this.storageFormatDate()
			}
			_this.$emit('lazyloadSend')
		})
		
		$(".xj-report-table-container").mCustomScrollbar({
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
                  _this.$emit('lazyloadSend')
                  console.log('滚到底部')
					$('.loadControl').css({
						opacity:1
					})
                },
				onUpdate(){
					$('.loadControl').css({
						opacity:0
					})
				},
				whileScrolling(){
					$('.loadControl').css({
						opacity:0
					})
				}
            }
        });
		// this.tabCellHeight()
	},
	methods:{
    filterChange (Index) {
      if (this.printNum) {
        if (this.printNum.allChecked) {
          return true
        } else if (this.printNum.beginNum <= Index + 1 && Index + 1 <= this.printNum.endNum) {
          return true
        }
      }
      return false
    },
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
		tabCellHeight () {
			// this.heightArr = []
			//console.log(this.dataGridStorage)
			// if (this.dataGridStorage.length) {
			// 	for (let i = 0; i < this.dataGridStorage.length; i++) {
			// 		let data = 0
			// 		for (let j = 0; j < this.dataGridStorage[i].productTypeList.length; j++) {
			// 			data += this.dataGridStorage[i].productTypeList[j].detailList.length * 50
			// 		}
			// 		this.heightArr.push(data)
			// 	}
			// }
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
				if(  this.dataGridStorage.length > 0 ){
					 this.tempArray=this.dataGridStorage;
				}	
			}
     	},
     	
     	cheackData(){
     		if( this.dataGridStorage ){
				  this.isDate = this.dataGridStorage.length == 0
  			}else if( this.dataGridStorage ){
                this.isDate = this.dataGridStorage.length == 0
            }else if( this.dataGridStorage ){
                this.isDate = this.dataGridStorage.length == 0
            }else{
  				this.isDate = true;
  			}
     	}
     	
	},
	update(){
		console.log('updata')
	},
	created () {
		
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
				overflow: hidden;
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
.print-on{
  background-color: #F1F8FE!important;
}
.no-data{
	height: 100%;
	background: url(~static/img/space-page.png) center center no-repeat;
}
</style>
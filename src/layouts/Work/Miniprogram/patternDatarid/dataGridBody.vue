<template>
<!--表格内容区-->
<!--明细-->
<div class="ui-table-container default-line" ref="tableContainer">
	<div>
		<dataisdelete 
			:isdeletedialogvisibly="deletedialogvisi"
			:isDeleteRole="isRole"
			:asrequestData="asData"
			:shopId="shopId"
            :styleId="styleId"
			@delmessageBack="delmessageBack"
			@deletePatternitem="deletePatternitem"
			@setDeletedialogvisibly="setDeletedialogvisibly">
		</dataisdelete>

		<div class="tb-tr" v-for="(tb,index1) in tempArray" :key="index1">
			<div class="tb-td" v-for="(tab,index2) in detailDataGridColumn" :key="index2"
				:style="tableCell(tab.width)">
				<img v-if="tab.childType == 'patternimg'" src="./../../../../../static/img/sort/default.png" />
				<span v-if="tab.type=='xvhao'">{{index1+1}}</span>
				<span v-else>{{tab.childType == ''? (index1+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]}}</span>
				<i v-if="tab.childType == 'deleteshop'" class="del iconfont icon-lajitong"  title="删除" @click="showDeleteDialog(tb)"></i>
			</div>
		</div>
		<div v-if="isDate" class="no-data"></div>
	</div>
	
</div>

</template>

<script>
import dataisdelete from './dataisDelete'
export default {
	data(){
		return{
			deletedialogvisi:false,
			isDate : false,
			tempArray : [],
			heightArr: [],
			asData:{}
		}
	},
	props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType','isRole', 'positionSwitch','shopId','styleId'],
    components:{
       dataisdelete
	},
	watch:{
		'dataGridStorage':function(){
			this.tempArray = []
			this.storageFormatDate()
			//console.log(1111)
			// this.tabCellHeight()
		},
	},
	mounted () {
    	let _this = this
		this.$nextTick(()=>{
				this.tempArray = []
				this.storageFormatDate()
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
					if (_this.reportType == 1) {
						_this.$emit('lazyloadSend', {refresh: true})
					} else {
						//console.log('略略略')
					}
                }
            }
        });
		// this.tabCellHeight()
	},
	methods:{
		deletePatternitem(val){
            this.$emit('deletePatternitem',val);
		},
		setDeletedialogvisibly(isShow){
           this.deletedialogvisi = isShow; 
		},
		showDeleteDialog(item){
			//console.log(item);
			let role = sessionStorage.getItem('miniprogramrole');
          if(role !='店长' && role !="店员"){
			  this.$message({type:'warning',message:'没有权限'});
               return;
		  }
            this.asData = item.barcode;//把用于请求的数据传到子组件，
			this.setDeletedialogvisibly(true);
		},
		delmessageBack (val) {
            this.$emit('messageBack', val)
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
			 //this.tempArray = this.dataGridStorage;
			 if(this.dataGridStorage.length>0){
                 for(let i = 0;i<this.dataGridStorage.length;i++){
					if(this.dataGridStorage[i].sellStatus == '1'){
						this.dataGridStorage[i].sellStatus = '在售';
					}else{
						this.dataGridStorage[i].sellStatus = '已售';
					}
					this.tempArray.push(this.dataGridStorage[i]);
				}
			 }else{
                //  let obj = {
				// 	 barcode:'',
				// 	 jewelryName:'',
				// 	 weightUnit:'',
				// 	 price:'',
				// 	 sellStatus:''
				//  }
				//  this.tempArray.push(obj);
				this.isDate = true;
			 }
			 
     	},

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
    // height: 556px;
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
	  position: relative;
		>.operate-btn{
			position: absolute;
			right: 0;
			width: 60px;
			top: 0;
			height: 50px;
			background-color: rgba(0,0,0,.5);
			font-weight: normal;
			transition: all .4s;
			visibility: hidden;
			opacity: 0;
			text-align: center;
			line-height: 50px;
			>i{
				display: inline-block;
				color: #fff;
				cursor: pointer;
				margin-left:10px;
				float: left;
				transition: all .2s;
				font-size: 15px;
				&.del{
					font-size: 16px;
					color:#333;
					margin-top:-2px;
					float: left;
				}
				&:hover{
					color: #2993f8;
				}
			}
		}
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
	.tb-tr:hover {
		background-color:#e9e9e9;
		&:nth-child(even){
			background-color:#e9e9e9;
		}
		>.operate-btn{
			visibility: visible;
			text-align: center;
			opacity: 1;
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

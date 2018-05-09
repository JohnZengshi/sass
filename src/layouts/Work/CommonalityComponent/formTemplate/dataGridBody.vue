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
			>
			<!-- v-text = "tab.childType == ''? (index+1) : tb[tab.childType]"
				v-html="cellHtml(tab, tb, index)" -->
				<input v-if="!isSelDelect && tab.childType == ''" style="width: 30px;" type="checkbox" :checked="deleteList.includes(tb.barcode)" @change="selectDelItem(tb)">
				<span v-else-if="isSelDelect && tab.childType == ''">{{index+1}}</span>
				<span v-else>{{tb[tab.childType]}}</span>
			</div>
			<div class="tb-td operate-btn" style="width: 8%;" @click="productDetail(tb)">
				删除
			</div>
			<!--<div class="tb-td"
				v-for="tab in detailDataGridColumn" 
				:key="tab.id " 
				:style="tableCell(tab.width)" 
			    v-html="cellHtml(tab,tb,index)"
			></div>-->
		</div>
		
		<div v-if="isDate" class="no-data">暂无数据</div>
	</div>
</div>
	
<div class="ui-table-container" ref="tableContainer" v-else-if="reportType == 1 || reportType == 2">
	<div>
		<!--成色大类-->
		<div class="tb-category" v-for="caty in dataGridStorage.productTypeList" >
			<div class="tb-tr" v-for="(tb,index) in caty.statisticsList">
				<template v-for="tab in detailDataGridColumn" >
					<div class="tb-td category-td"
						v-if="tab.text == '产品类别' && index == 0" 
						:style="tableCell(tab.width)" >
						<i :style="'height:'+caty.statisticsList.length * 50 +'px'">{{caty[tab.childType]}}</i>
					</div>
					<div class="tb-td"
						v-else
						:style="tableCell(tab.width)" 
						v-text = "tab.childType == ''? (index+1) : tb[tab.childType]">
					</div>
				</template>
				
			</div>
			<!--小计-->
			<div class="tb-total">
				<div class="tb-td"
					v-for="(tab,f) in detailDataGridColumn" 
					:key="tab.id" 
					:style="tableCell(tab.width)" 
					v-html = "f ==0 ?'<b>小计</b>':caty[tab.totalType]"
				></div>
			</div>
		</div>
		<div v-if="isDate" class="no-data">暂无数据</div>
	</div>
</div>
</template>

<script>
import {operateProductList} from './../../../../Api/commonality/operate'
export default {
	data () {
		return{
			isDate : false,
			deleteList: [],
			deleteList1: [],
		}
	},
	props: ['detailDataGridColumn','dataGridStorage','tabCell','reportType', 'billType', 'isRole', 'isSelDelect'],
	mounted () {
		let _self = this
		eventBus.$on('checkAll', function (val) {
			_self.checkAllItem()
		})
		
		eventBus.$on('delectAct', function (val) {
			_self.batchDeletion(val.type)
		})
	},
	watch:{
	   dataGridStorage : function(){
		   //console.log('dataGridStorage',this.detailDataGridColumn)
		   //console.log("大礼包。。。。。。。。。。。。。。。。。。")
		   let _self = this
			$(".ui-table-container").mCustomScrollbar({
				theme: "minimal-dark",
				axis: "y",
				autoHideScrollbar: true,
				scrollInertia: 500,
				callbacks:{
					whileScrolling: function(){
						//console.log(this.mcs.top)
						_self.$emit('scrolling', this.mcs.top)
					},
					onTotalScrollBack: function(){
						//console.log("我胡汉三又回来了！")
						_self.$emit('scrollBack', 'back')
					}
				}
			})
	   },
	   'deleteList': function (val) {
            //console.log(val)
            this.deleteList1 = val.map((k, i) => {
                return {barcode: k}
            })
            //console.log(this.deleteList1)
            //console.log(this.deleteList1)
        }
	},
	methods: {
		checkAllItem () { // 全选
            //console.log(this.dataGridStorage.detailList)
            if (this.dataGridStorage.detailList.length == this.deleteList.length) {
                this.deleteList = []
            } else {
                this.deleteList = this.dataGridStorage.detailList.map((item, index) => {
                    return item.barcode
                })
            }
            //console.log(this.deleteList)
        },
        selectDelItem (item) { // 选择删除项目
            //console.log(item)
            let obj = {
                barcode: item.barcode
            }
            if (this.deleteList.includes(item.barcode)) {
                let i = this.deleteList.indexOf(item.barcode)
                this.deleteList.splice(i, 1)
            } else {
                this.deleteList.push(item.barcode)
            }
            //console.log(this.deleteList)
		},
		batchDeletion (type) { // 批量删除
			//console.log(type)
            if (type == 1) {
                if (this.deleteList1.length == 0) {
                    // this.isSelDelect = true
					this.deleteList = []
					this.deleteList1 = []
					this.$emit('delectBack', {refresh: false, clean: true})
                } else {
                    this.$confirm('此操作将删除选中商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(() => {
                        let options = {
                            "productList": this.deleteList1,
                            "operate": 2,
                            "orderNum": this.$route.query.orderNumber
                        }
                        operateProductList(options).then((res) => {
                            console.log(res)
                            if (res.data.state == 200) {
								this.$emit('delectBack', {refresh: true, clean: true})
                            } else {
                                this.$store.dispatch('workPopupError', res.data.msg)
                            }
                        }, (res) => {

                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                    
                }
                
            } else if (type == 2) {
				// this.isSelDelect = true
				this.$emit('delectBack', {refresh: false, clean: true})
                this.deleteList = []
                this.deleteList1 = []
            } 
        },
		// cellHtml(tab,tb,index){
		// 	console.log(this.isSelDelect)
		// 	if( tab.childType == '' && this.isSelDelect){
		// 		return index+1
		// 	} else if (tab.childType == '' && !this.isSelDelect) {
		// 		return `<input style="width: 30px;" type="checkbox" :checked="deleteList.includes(tb.barcode)" onChange="`selectDelItem(tb)`">`
		// 	} else {
		// 		return tb[tab.childType]
		// 	}
		// },
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
	   productDetail (item) {
		   //console.log(1111)
		   if (this.isRole == 'Y') {
				this.$confirm('此操作将使该商品从单据中移除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				}).then(() => {
					let options = {
							productList: [
								{barcode: item.barcode}
							],
							orderNum: this.$route.query.orderNumber,
							operate: '2'
						}
					// console.log(options)
					operateProductList(options).then((res) => {
						// console.log(res)
						if (res.data.state == 200) {
							this.$message({
								type: 'success',
								message: '删除成功'
							}); 
							eventBus.$emit('messageBack', 1)
						} else {
							this.$store.dispatch('workPopupError', res.data.msg);
						}
					}, (res) => {
						// console.log(res)
						this.$store.dispatch('workPopupError', res.data.msg);
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
		   } else {
				this.$store.dispatch('workPopupError', '无权限删除');
		   }	   
	   },
       tableScroll(){
       	
       		this.$emit('scrollClass',false)
			if( this.timeOut){
				clearTimeout(  this.timeOut )
			}
			
			this.timeOut = setTimeout(()=>{
				this.$emit('scrollClass',true)
			},600)
       }
	},
	
	beforeUpdate(){
		// console.log(this.dataGridStorage)
		if( this.dataGridStorage.detailList ){
		   this.isDate = this.dataGridStorage.detailList.length == 0
		}else{
		  this.isDate = this.dataGridStorage.productTypeList.length == 0
		}
	},

}
</script>

<style scoped lang="scss">
.ui-table-container{
    // height: 556px;
    // overflow-y: auto;
    
    &.default-line{
      .tb-tr:nth-child(even){
          background-color: #fbfbfb;
      }
    }
    
    .tb-tr{
      height: 50px;
      display: flex;
	  .operate-btn {
		  width: 100%;
		  height: 100%;
		  cursor: pointer;
		  text-align: center;
	  }
      .tb-td{
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;    
        text-align: center;
        font-size: 14px; 
        font-weight: 500;
        transition: all .3s;
        white-space: nowrap;
        color: #333;
        -webkit-font-smoothing:subpixel-antialiased;
        text-overflow: ellipsis;
        
        
        &.category-td{
            position: relative;
            
            
            >i{
                font-style: normal;
                font-weight: bold;
                color: #248efc;
                font-size: 15px;
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
	height: 40px;
	color: #999;
	text-align: center;
	font-size: 14px;
	line-height: 40px;
}
</style>
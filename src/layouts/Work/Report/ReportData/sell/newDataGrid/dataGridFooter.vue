<template>
<!--表尾-->
<div class="ui-table_footer">
	<div class="th_footer" v-for="(tab,f) in detailDataGridColumn" 
		:style="tableCell(tab.width)">
      <p class="total-more" v-if="f == 0">
      	<span v-if="reportType == 1">{{dataGridStorage.totalNum}}</span>
      	<span v-else>合计</span>
      </p>
      <p class="totalNum" v-else v-html="v_html(tab)"></p>
	</div>
</div>
</template>

<script>
export default {
  data(){
    return{
      datalist : []
    }
  },
  
	props : ['detailDataGridColumn','dataGridStorage','tabCell', 'reportType'],

	watch : {
	  dataGridStorage : function(){
	    this.updataData()
	  }
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
		v_html( tab ){
        if( tab.type =='' ) return ''
        if( this.datalist[tab.type] == ''){
          return '<em style=\'color:#333\'>-</em>'
        }
        //小数点截取 ，合计精确到3位
        // if( tab.toFixed ){
        //   return this.toFixed( this.datalist[tab.type] , tab.countCut + 1)
        // }else{
          return this.dataGridStorage[tab.type]
        // }
    },
    
    updataData (){
      if(this.dataGridStorage.productTypeList && this.reportType != 1){
        this.datalist = this.dataGridStorage.productTypeList[0]
      }else{
        this.datalist = this.dataGridStorage
      }
    }
	},
	
	mounted(){
	  this.$nextTick(()=>{
      this.updataData()
      // console.log(this.dataGridStorage)
	  })
	}
}
</script>

<style lang="scss" scoped>
.ui-table_footer{
  background:#2993f8;
  height: 40px;
  .th_footer{
    height: 40px;
    position: relative;
    
    .total-more{
      position:absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      line-height: 40px;
      font-weight: bold;
      color: #fff; 
      font-size: 14px; 
      font-weight: bold;
    }
    
    .totalNum{
      padding-top: 0;
      line-height: 40px;
      height: auto;
      color:#fff;
      font-weight: bold;
    }
  }
}
</style>
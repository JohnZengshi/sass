<template>
<!--表尾-->
<div class="ui-table_footer">
	<div class="th_footer" v-for="(tab,f) in detailDataGridColumn" 
		:key="tab.id" 
		:style="tableCell(tab.width)">
		
		<p class="totalNum" v-if="tab.totalName !='合计'">
            <span v-html="v_html(tab)" ></span>
		</p>
        <p v-if="f==2" class="total-more">合计</p>
	</div>
</div>
</template>

<script>
export default{
	props : ['detailDataGridColumn','dataGridStorage','tabCell'],
	
	methods:{
	    v_html( tab ){
            
           if( tab.allType =='' ) return ''
           
           if( this.dataGridStorage[tab.allType] == ''){
             return '<em>-</em>'
           }
           
           //小数点截取 ，合计精确到3位
           if( tab.toFixed ){
             return this.toFixed( this.dataGridStorage[tab.allType] , tab.countCut + 1)
           }else{
             return this.dataGridStorage[tab.allType]
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
        }
	}
}
</script>

<style lang="scss" scoped>
.ui-table_footer{
  .th_footer{
    position: relative;
    .total-more{
      position:absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

  }
}

</style>
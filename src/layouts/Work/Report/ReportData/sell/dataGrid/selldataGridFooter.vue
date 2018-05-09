<template>
<!--表尾-->
<div class="ui-table_footer">
    <template  v-for="(tab,f) in detailDataGridColumn" >

    	<div class="th_footer"
    		:key="tab.id" 
    		:style="tableCell(tab.width)">
    		<p class="totalNum" v-if="tab.totalName !='合计'">
                <span v-html="v_html(tab)"></span>
    		</p>
    		 <p v-if="f==2" class="total-more">合计</p>
    	</div>
	</template>
</div>
</template>

<script>
let width = 0
export default{
	props : ['detailDataGridColumn','dataGridStorage','tabCell'],
	
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
        
        tableTD( w ,type ){
          if( w.includes('%')){
            width += Number(w.replace('%',''))
          }
          if(type){
            return{
              width : width + '%'
            }  
          }
          
        },
        
        v_html( tab ){
            
           if( tab.type =='' ) return ''
           
           if( this.dataGridStorage[tab.type] == ''){
             return '<em>-</em>'
           }
           
           //小数点截取 ，合计精确到3位
           if( tab.toFixed ){
             return this.toFixed( this.dataGridStorage[tab.type] , tab.countCut + 1)
           }else{
             return this.dataGridStorage[tab.type]
           }
        },
        
        //重置单元格宽度
        init(){
          width = 0 
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
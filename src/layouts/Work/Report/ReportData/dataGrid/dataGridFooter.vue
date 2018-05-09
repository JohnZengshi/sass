<template>
<!--表尾-->
<div class="ui-table_footer">
	<div class="th_footer" v-for="(tab,f) in detailDataGridColumn" 
		:key="tab.id" 
		:style="setSize(tab.width)">
		<p class="totalNum" v-if="tab.totalName !='合计'">
		    <span v-html="v_html(tab)"></span>
		</p>
		<p class="total-more" v-if="f == 2">合计</p>
	</div>
</div>
</template>

<script>
export default {
    props : ['detailDataGridColumn','dataGridStorage'],
    
    methods:{
    	setSize( w ){
    	   return{
    	     width : typeof w === 'number' ? ( w + 'px') : w.includes('%') ? w : w + 'px'
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
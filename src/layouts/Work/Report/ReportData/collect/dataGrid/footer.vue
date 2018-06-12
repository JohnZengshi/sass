<template>
<!--表尾-->
<div class="ui-table_footer">
<!--     <template  v-for="(tab,f) in detailDataGridColumn" >

    	<div class="th_footer"
    		:key="tab.id" 
    		:style="tableCell(tab.width)">
    		<p class="totalNum" v-if="tab.totalName !='合计'">
                <span v-html="v_html(tab)"></span>
    		</p>
    		 <p v-if="f==1" class="total-more">合计</p>
    	</div>
	</template> -->
  <ul class="monny-list-wrap">
      <li>
        <p class="txt icon-container cash">{{cashierStatistics.cash ? cashierStatistics.cash : 0}}元</p>
        <p class="gary">现金</p>
      </li>
      <li>
        <p class="txt icon-container card">{{cashierStatistics.slotCard ? cashierStatistics.slotCard : 0}}元</p>
        <p class="gary">刷卡</p>
      </li>
      <li>
        <p class="txt icon-container weChat">{{cashierStatistics.weixin ? cashierStatistics.weixin : 0}}元</p>
        <p class="gary">微信</p>
      </li>
      <li>
        <p class="txt icon-container alipay">{{cashierStatistics.zhifubao ? cashierStatistics.zhifubao : 0}}元</p>
        <p class="gary">支付宝</p>
      </li>
      <li>
        <p class="txt icon-container other">{{cashierStatistics.other ? cashierStatistics.other : 0}}元</p>
        <p class="gary">其他</p>
      </li>

      <li>
        <p class="txt icon-container totalMoney">{{cashierStatistics.totalMoney ? cashierStatistics.totalMoney : 0}}元</p>
        <p class="gary">实际收银</p>
      </li>
    </ul>
</div>
</template>

<script>
let width = 0
export default{
	props : ['detailDataGridColumn','dataGridStorage','tabCell', 'cashierStatistics'],
	
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
         return this.toFixed( this.dataGridStorage[tab.type] , tab.countCut)
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
  position: relative!important;
  >.monny-list-wrap{
    padding-top: 5px;
    font-size: 0;
    li{
      display: inline-block;
      margin-left: 130px;
      p{
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 2px;
        color: #fff;
      }
    }
  }
  .th_footer{
    position: relative;
    .total-more{
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
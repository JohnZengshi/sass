<template>
<transition name="tp-ani">
<div class="tab_detail_table">
	<!--表格内容区  -->
	<div class="ui-table-container default-line">
	 <div>
    	<template v-for="caty in dataGridStorage.shopList">
    		<div class="tb-tr">
    			<div class="tb-td"
    				v-for="tab,i in detailDataGridColumn"
    				:key="tab.id"
    				:style="tabCell(tab.width)">
    				<p class="table-cell-shop" v-if="tab.childType == 'shopName'" v-text="caty[tab.childType]"></p>
    				<div v-else-if="tab.childType != 'shopTotalMoney'">
    					<p class="table-cell-text table-cell-txt icon" :class="tab.childIconClass+'-icon'">{{caty[tab.childType]}}
    						<em class="unit" v-text="tab.unit"></em>
    					</p>
          				<p class="table-cell-txt txt-gray" v-text="tab.text"></p>
          			</div>
    				<div v-else class="table-cell-collectMoney">
    					<p class="txt-left">{{caty[tab.childType]}} <em class="unit" v-text="tab.unit"></em></p>
    					<p class="txt txt-left" v-text="tab.text"></p>
    				</div>
    			</div>
    		</div>
    	</template>
	</div>
</div>

<!--表尾  -->
<div class="ui-table_footer" v-if="dataGridStorage.shopList">
	<div class="th_footer" v-for="(tab,i) in detailDataGridColumn"
		:key="tab.id"
		:style="tabCell(tab.width)">
		<template v-if="tab.totalName !='合计'">
			<p  class="totalNum">
			    <span v-html="tab.totalType =='' ? '' : dataGridStorage[tab.totalType]"></span>
				<i v-if="tab.footerUnit !='' && dataGridStorage[tab.totalType] != 0">{{ tab.footerUnit}}</i>
			</p>
		</template>
		<template v-else>
			<p class="total-more" v-text="tab.totalName"></p>
		</template>
	</div>
</div>
</div>
</transition>
</template>

<script>
let config = require('./config/collectSellConfig')

export default{
	data(){
		return{
			detailDataGridColumn : config.detailConfing
		}
	},

	props : ['dataGridStorage'],

	methods:{
		//单元格宽度
		tabCell( w ){
			return 'width:' + w + ( w.indexOf('%') >= 0 ? '' : 'px')
       },

       tableCell( result ){
			if( result.width ){
				let w = 'width:' + result.width + ( result.width.indexOf('%') >= 0 ? '' : 'px')
				result.res && result.res.call(this, w)
			}
       }

	},

	mounted(){
		this.$nextTick(()=>{
			$(".ui-table-container").mCustomScrollbar({
                theme: "minimal-dark",
                axis: 'y',
                mouseWheel: {
                    scrollAmount: 200,
                    preventDefault: false,
                    normalizeDelta: false
                },
            })

		})
	}
}
</script>
<style lang="scss" scoped>
.table-cell-text{
	margin-top: 16px;

	&.icon{
		background: url(./img/pay.png) 0 1px no-repeat;
	}
}
.table-cell-txt{
	height: 19px;
	line-height: 19px;
	text-align: left;
	padding-left: 22px;

	&.txt-gray{
		color: #b6b6b6;
	}

	.unit{
		font-style: normal;
		color: #b6b6b6;
		font-size: 11px;
	}
}

.table-cell-shop{
	color: #2993f8;
	padding-left: 35px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	text-align:left;
	&:before{
		content: '';
		display: inline-block;
		height: 35px;
		width: 35px;
		background:#fff url(./img/temp_shop.png) 2px 2px no-repeat;
		vertical-align: middle;
		border:1px solid #eaeaea;
		border-radius: 5px;
		box-sizing: border-box;
		margin-right: 15px;
	}

}

.table-cell-collectMoney{
	line-height: 19px;
	margin-top: 15px;
	color: #ff3b30;
	>.txt{
		margin-left: 3px;
		font-style: normal;
		color: #b6b6b6;
	}

	.unit{
		font-style: normal;
		color: #b6b6b6;
		font-size: 11px;
	}

	.txt-left{
		text-align: left;
	}
}


.ui-table-container{
    height: 556px;
    overflow-y: auto;
    
    .tb-tr{
      height: 70px;
      display: flex;

      .tb-td{
        float: left;
        display: inline-block;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        transition: all .3s;
        white-space: nowrap;
        color: #333;
        -webkit-font-smoothing:subpixel-antialiased;
        text-overflow: ellipsis;
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

.ui-table_footer{
    .total-more{
      position:absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
}
</style>

<template>
<!--表头-->
<div class="ui-table_column">
	<div @click="headSort(tab)" class="ui-table_th" v-for="(tab,index) in detailDataGridColumn" :key="index" :style="tableCell(tab.width)">
		{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
        <img v-if="tab.sort == '3'" src="./../../../../../static/img/sort/default.png">
        <img v-if="tab.sort == '1'" src="./../../../../../static/img/sort/up.png">
        <img v-if="tab.sort == '2'" src="./../../../../../static/img/sort/down.png">
	</div>
</div>
</template>

<script>
export default {
	props : ['detailDataGridColumn','tabCell',],
	data () {
        return {
            isOld: '1',
            sortList: [{barcode: '1'}]
        }
    },
    watch: {
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
        headSort (tab) { // 排序点击事件
            //console.log(tab);
            if (tab.sort != null) {
                    if (tab.sort == '2') {
                        this.clickClassUp(tab)
                    } else if (tab.sort == '1') {
                        this.clickClassDown(tab)
                    }else{
                        this.clickClassPrice(tab);
                    }
                } 
        },
        clickClassPrice(tab){
           this.$set(tab, 'sort', '1')
            this.$emit('sortList', tab.sort)
        },
        clickClassUp (tab) { // 点击分类升序
            this.$set(tab, 'sort', '3')
            this.$emit('sortList', tab.sort)
        },
        clickClassDown (tab) { // 点击分类降序
            this.$set(tab, 'sort', '2')
            this.$emit('sortList',  tab.sort)
        }
	}
}
</script>

<style lang="scss" scoped>
.ui-table_column{
    height: 40px;
    background-color: #f5f5f5;
    //overflow: hidden;
    display: flex;
    position: relative;
    width: 100%;
    margin-top: -40px;
    
    &:after {
        content: "";
        height:2px;
        width: 100%;
        background:#e7e7e7;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
    }
    .ui-table_th{
        display:block;
        line-height: 40px;
        text-align: center;
        color: #686868;
        font-size:12px;
        float: left;
        font-weight: bold;
        transition: all .1s;
        white-space: nowrap;
        text-overflow: ellipsis;
        
        >i{
          font-style:normal;
          color: #999;
          font-weight: normal;
          font-size: 10px;
        }
        &>em {
            // line-height: 38px;
            // font-size: 14px;
            color:#2993f8;
        }
    }
}

</style>
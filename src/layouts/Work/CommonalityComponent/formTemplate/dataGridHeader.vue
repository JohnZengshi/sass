<template>
<!--表头-->
<div class="ui-table_column">
	<div class="ui-table_th" v-for="tab in detailDataGridColumn" :key="tab.id" :style="tableCell(tab.width)">
		{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
	</div>
    <div v-if="reportType == 3" class="ui-table_th operateBtn" style="width: 8%;">操作</div>
</div>
</template>

<script>

export default {
	props : ['detailDataGridColumn','tabCell', 'billType', 'reportType'],
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
        }
	}
}
</script>

<style lang="scss" scoped>
.ui-table_column{
    height: 40px;
    background-color: #f5f5f5;
    overflow: hidden;
    display: flex;
    position: relative;
    width: 100%;
    margin-top: -40px;
    
    .operateBtn {
        width: 75px;
        height: 100%;
    }
    .ui-table_th{
        display:inline-block;
        line-height: 40px;
        text-align: center;
        color: #686868;
        font-size:12px;
        float: left;
        font-weight: bold;
        transition: all .3s;
        white-space: nowrap;
        text-overflow: ellipsis;
        
        >i{
          font-style:normal;
          color: #999;
          font-weight: normal;
          font-size: 10px;
        }
    }
}
</style>
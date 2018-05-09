<template>
<!--表头-->
<div class="ui-table_column">
	<div @click="headSort(tab)" class="ui-table_th" v-for="(tab,index) in detailDataGridColumn" :key="index" :style="tableCell(tab.width)">
		{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
        <img v-if="tab.sort == ''" src="./../../../../../static/img/sort/default.png">
        <img v-if="tab.sort == '1'" src="./../../../../../static/img/sort/up.png">
        <img v-if="tab.sort == '2'" src="./../../../../../static/img/sort/down.png">
	</div>
</div>
</template>

<script>
export default {
	props : ['detailDataGridColumn','tabCell', 'reportType', 'newList'],
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

            if (tab.sort != null) {
                if (this.reportType == 1) {
                    if (tab.sort == '' || tab.sort == '2') {
                        this.clickClassUp(tab)
                    } else if (tab.sort == '1') {
                        this.clickClassDown(tab)
                    }
                } else if (this.reportType == 2) {
                    if (tab.sort == '' || tab.sort == '2') {
                        this.clickClassUp(tab)
                    } else if (tab.sort == '1') {
                        this.clickClassDown(tab)
                    }
                } else if (this.reportType == 3) {
                    if (tab.sort == '' || tab.sort == '2') {
                        this.clickClassUp(tab)
                    } else if (tab.sort == '1') {
                        this.clickClassDown(tab)
                    }
                } else if (this.reportType == 4) {
                    if (tab.sort == '' || tab.sort == '2') {
                        this.clickClassUp(tab)
                    } else if (tab.sort == '1') {
                        this.clickClassDown(tab)
                    }
                }
            }
        },
        clickClassUp (tab) { // 点击分类升序
            //console.log(this.sortList)
            if (tab.text == '条码号') {
                this.$set(this.sortList[0], 'barcode', '1')
            } else if (tab.text == '首饰名称') {
                this.$set(this.sortList[0], 'className', '1')
            } else if (tab.text == '产品类别') {
                this.$set(this.sortList[0], 'classTypeName', '1')
            } else if (tab.text == '件重') {
                this.$set(this.sortList[0], 'weight', '1')
            } else if (tab.text == '金重') {
                this.$set(this.sortList[0], 'goldWeight', '1')
            } else if (tab.text == '件数') {
                this.$set(this.sortList[0], 'num', '1')
            } else if (tab.text == '售价') {
                this.$set(this.sortList[0], 'price', '1')
            } else if (tab.text == '成本') {
                this.$set(this.sortList[0], 'cost', '1')
            }
            this.$set(tab, 'sort', '1')
            //console.log(this.sortList)
            let copyList = []
            for (let i in this.sortList[0]) {
                copyList.push({[i]: this.sortList[0][i]})
            }
            //console.log(copyList)
            this.$emit('sortList', copyList)
        },
        clickClassDown (tab) { // 点击分类降序
            if (tab.text == '条码号') {
                this.$set(this.sortList[0], 'barcode', '2')
            } else if (tab.text == '首饰名称') {
                this.$set(this.sortList[0], 'className', '2')
            } else if (tab.text == '产品类别') {
                this.$set(this.sortList[0], 'classTypeName', '2')
            } else if (tab.text == '件重') {
                this.$set(this.sortList[0], 'weight', '2')
            } else if (tab.text == '金重') {
                this.$set(this.sortList[0], 'goldWeight', '2')
            } else if (tab.text == '件数') {
                this.$set(this.sortList[0], 'num', '2')
            } else if (tab.text == '售价') {
                this.$set(this.sortList[0], 'price', '2')
            } else if (tab.text == '成本') {
                this.$set(this.sortList[0], 'cost', '2')
            }
            this.$set(tab, 'sort', '2')
            let copyList = []
            for (let i in this.sortList[0]) {
                console.log(i)
                console.log(this.sortList[0][i])
                copyList.push({[i]: this.sortList[0][i]})
            }
            //console.log(this.sortList)
            this.$emit('sortList', copyList)
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
        display:inline-block;
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
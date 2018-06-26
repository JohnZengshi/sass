<template>
<!--表头-->
<div class="ui-table_column">
	<div @click="headSort(tab)" class="ui-table_th" v-for="tab in detailDataGridColumn" :style="tableCell(tab.width)">
		{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
        <!-- <em v-if="tab.sort == ''" class="iconfont icon-sort-copy"></em>
        <em v-if="tab.sort == '1'" class="iconfont icon-sort-up"></em>
        <em v-if="tab.sort == '2'" class="iconfont icon-sort2"></em> -->
        <img v-if="tab.sort == ''" src="./../../../../static/img/sort/default.png">
        <img v-if="tab.sort == '1'" src="./../../../../static/img/sort/up.png">
        <img v-if="tab.sort == '2'" src="./../../../../static/img/sort/down.png">
	</div>
</div>
</template>

<script>
export default {
	props : ['detailDataGridColumn','tabCell', 'reportType', 'newList'],
	data () {
        return {
            isOld: '1',
            sortList: [{}]
        }
    },
    watch: {
        reportType (val) {
            //console.log(val)
            if (val == 1) {
                this.sortList = [{barcode: '1'}]
            } else {
                this.sortList = [{classTypeName: '1'}]
            }
            this.$emit('sortList', this.sortList)
        },
        newList (val) {
            if (val.length == 0) {
                //console.log(111)
                this.detailDataGridColumn.forEach((item, index) => {
                    if (item.hasOwnProperty('sort')) {
                        this.$set(item, 'sort', '')
                    }
                })
                if (this.reportType == 1) {
                    this.sortList = [{barcode: '1'}]
                } else {
                    this.sortList = [{classTypeName: '1'}]
                }
                //console.log(this.sortList)
                // this.$emit('sortList', this.sortList)
            } else {
                this.detailDataGridColumn.forEach((item, index) => {
                    if (item.hasOwnProperty('sort')) {
                        this.$set(item, 'sort', '')
                    }
                })
                this.detailDataGridColumn.forEach((item, index) => {
                    //console.log(item)
                    if (item.hasOwnProperty('sort')) {
                        val.forEach((t, f) => {
                            if (t.name == item.text) {
                                this.$set(item, 'sort', t.value)
                                // item.sort = t.value
                                
                            }
                        })
                    }
                })
                this.sortList = []
                val.forEach((item, index) => {
                    if (item.name == '条码号') {
                        //this.$set(this.sortList[0], 'barcode', item.value)
                        this.sortList.push({barcode: item.value})
                    } else if (item.name == '首饰名称') {
                        //this.$set(this.sortList[0], 'className', item.value)
                        this.sortList.push({className: item.value})
                    } else if (item.name == '产品类别') {
                        //this.$set(this.sortList[0], 'classTypeName', item.value)
                        this.sortList.push({classTypeName: item.value})
                    } else if (item.name == '件重') {
                        //this.$set(this.sortList[0], 'weight', item.value)
                        this.sortList.push({weight: item.value})
                    } else if (item.name == '金重') {
                        //this.$set(this.sortList[0], 'goldWeight', item.value)
                        this.sortList.push({goldWeight: item.value})
                    } else if (item.name == '件数') {
                        //this.$set(this.sortList[0], 'num', item.value)
                        this.sortList.push({num: item.value})
                    } else if (item.name == '售价') {
                        //this.$set(this.sortList[0], 'price', item.value)
                        this.sortList.push({price: item.value})
                    } else if (item.name == '成本') {
                        //this.$set(this.sortList[0], 'cost', item.value)
                        this.sortList.push({cost: item.value})
                    }
                })
            }
            this.$emit('sortList', this.sortList)
            
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
        headSort (tab) { // 排序点击事件
            if (tab.sort != null) {
                if (this.reportType == 1) {
                    // let count = 0
                    // console.log(Object.getOwnPropertyNames(this.sortList[0]).length)
                    // for (let i in this.sortList[0]) {
                    //     if (count == 0 && i == 'barcode') {
                    //         delete this.sortList[0].barcode
                    //     }
                    // }
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
            // 加上后面的对象
            this.sortList.forEach((item,index) => {
                if(index != 0) {
                    copyList.push(item)
                }
            })
            console.log('点击升序的数组',copyList,this.sortList)
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
             this.sortList.forEach((item,index) => {
                if(index != 0) {
                    copyList.push(item)
                }
            })
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
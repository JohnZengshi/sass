<template>
  <!--表头-->
  <div class="ui-table_column">
    <div @click="headSort(tab)" class="ui-table_th" v-for="tab in detailDataGridColumn" :style="tableCell(tab.width)">
      {{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
      <img v-if="tab.sort == ''" src="/static/img/sort/default.png">
      <img v-if="tab.sort == '1'" src="/static/img/sort/up.png">
      <img v-if="tab.sort == '2'" src="/static/img/sort/down.png">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['detailDataGridColumn', 'tabCell', 'reportType', 'newList'],
    data() {
      return {
        sortList: [{
          classTypeName: '1'
        }]
      }
    },
    watch: {
      // 设置初始化排序
      reportType(val) {
        this.sortList = [{
          classTypeName: '1'
        }]
        this.$emit('sortList', this.sortList)
      },
      newList(val) {
        if(val.length == 0) {
          this.detailDataGridColumn.forEach((item, index) => {
            if(item.hasOwnProperty('sort')) {
              this.$set(item, 'sort', '')
            }
          })
        } else {
          this.detailDataGridColumn.forEach((item, index) => {
            if(item.hasOwnProperty('sort')) {
              this.$set(item, 'sort', '')
            }
          })
          this.detailDataGridColumn.forEach((item, index) => {
            //console.log(item)
            if(item.hasOwnProperty('sort')) {
              val.forEach((t, f) => {
                if(t.name == item.text) {
                  this.$set(item, 'sort', t.value)
                }
              })
            }
          })
          this.sortList = [{}]
          val.forEach((item, index) => {
            if(item.name == '条码号') {
              this.$set(this.sortList[0], 'barcode', item.value)
            }
            if(item.name == '首饰名称') {
              this.$set(this.sortList[0], 'className', item.value)
            }
            if(item.name == '产品类别') {
              this.$set(this.sortList[0], 'classTypeName', item.value)
            }
            if(item.name == '件重') {
              this.$set(this.sortList[0], 'weight', item.value)
            }
            if(item.name == '金重') {
              this.$set(this.sortList[0], 'goldWeight', item.value)
            }
            if(item.name == '件数') {
              this.$set(this.sortList[0], 'num', item.value)
            }
            if(item.name == '售价') {
              this.$set(this.sortList[0], 'price', item.value)
            }
            if(item.name == '实售价') {
              this.$set(this.sortList[0], 'realPrice', item.value)
            }
            if(item.name == '退换') {
              this.$set(this.sortList[0], 'exchange', item.value)
            }
            if(item.name == '成本') {
              this.$set(this.sortList[0], 'cost', item.value)
            }
          })
        }
        debugger
        this.$emit('sortList', this.sortList)
      }
    },
    methods: {
      tableCell(width) {
        let _size = ''

        this.$emit('tabCell', {
          width: width,
          res: (res) => {
            _size = res
          }
        })
        return _size
      },
      headSort(tab) { // 排序点击事件
        if(tab.sort == null || tab.sort == undefined) return

        if(this.reportType == 1) {
          let count = 0
          // console.log(Object.getOwnPropertyNames(this.sortList[0]).length)
          for(let i in this.sortList[0]) {
            if(count == 0 && i == 'barcode') {
              delete this.sortList[0].barcode
            }
          }
          if(tab.sort == '' || tab.sort == '2') {
            this.clickClassUp(tab)
          } else if(tab.sort == '1') {
            this.clickClassDown(tab)
          }
        } else if(this.reportType == 2) {
          if(tab.sort == '' || tab.sort == '2') {
            this.clickClassUp(tab)
          } else if(tab.sort == '1') {
            this.clickClassDown(tab)
          }
        } else if(this.reportType == 3) {
          if(tab.sort == '' || tab.sort == '2') {
            this.clickClassUp(tab)
          } else if(tab.sort == '1') {
            this.clickClassDown(tab)
          }
        } else if(this.reportType == 4) {
          if(tab.sort == '' || tab.sort == '2') {
            this.clickClassUp(tab)
          } else if(tab.sort == '1') {
            this.clickClassDown(tab)
          }
        }

      },
      clickClassUp(tab) { // 点击分类升序

        if(tab.text == '条码号') {
          this.$set(this.sortList[0], 'barcode', '1')
        }
        if(tab.text == '首饰名称') {
          this.$set(this.sortList[0], 'className', '1')
        }
        if(tab.text == '产品类别') {
          this.$set(this.sortList[0], 'classTypeName', '1')
        }
        if(tab.text == '件重') {
          this.$set(this.sortList[0], 'weight', '1')
        }
        if(tab.text == '金重') {
          this.$set(this.sortList[0], 'goldWeight', '1')
        }
        if(tab.text == '件数') {
          this.$set(this.sortList[0], 'num', '1')
        }
        if(tab.text == '售价') {
          this.$set(this.sortList[0], 'price', '1')
        }
        if(tab.text == '实售价') {
          this.$set(this.sortList[0], 'realPrice', '1')
        }
        if(tab.text == '退换') {
          this.$set(this.sortList[0], 'exchange', '1')
        }
        if(tab.text == '成本') {
          this.$set(this.sortList[0], 'cost', '1')
        }
        debugger
        this.$set(tab, 'sort', '1')
        let copyList = []
        for (let i in this.sortList[0]) {
            copyList.push({[i]: this.sortList[0][i]})
        }
        this.$emit('sortList', copyList)
      },
      clickClassDown(tab) { // 点击分类降序
        if(tab.text == '条码号') {
          this.$set(this.sortList[0], 'barcode', '2')
        }
        if(tab.text == '首饰名称') {
          this.$set(this.sortList[0], 'className', '2')
        }
        if(tab.text == '产品类别') {
          this.$set(this.sortList[0], 'classTypeName', '2')
        }
        if(tab.text == '件重') {
          this.$set(this.sortList[0], 'weight', '2')
        }
        if(tab.text == '金重') {
          this.$set(this.sortList[0], 'goldWeight', '2')
        }
        if(tab.text == '件数') {
          this.$set(this.sortList[0], 'num', '2')
        }
        if(tab.text == '售价') {
          this.$set(this.sortList[0], 'price', '2')
        }
        if(tab.text == '实售价') {
          this.$set(this.sortList[0], 'realPrice', '2')
        }
        if(tab.text == '退换') {
          this.$set(this.sortList[0], 'exchange', '2')
        }
        if(tab.text == '成本') {
          this.$set(this.sortList[0], 'cost', '2')
        }
        debugger
        this.$set(tab, 'sort', '2')
        let copyList = []
        for (let i in this.sortList[0]) {
            copyList.push({[i]: this.sortList[0][i]})
        }
        this.$emit('sortList', copyList)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ui-table_column {
    height: 40px;
    background-color: #f5f5f5;
    //overflow: hidden;
    display: flex;
    position: relative;
    width: 100%;
    margin-top: -40px;
    &:after {
      content: "";
      height: 2px;
      width: 100%;
      background: #e7e7e7;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
    }
    .ui-table_th {
      display: inline-block;
      line-height: 40px;
      text-align: center;
      color: #686868;
      font-size: 12px;
      float: left;
      font-weight: bold;
      transition: all .1s;
      white-space: nowrap;
      text-overflow: ellipsis;
      >i {
        font-style: normal;
        color: #999;
        font-weight: normal;
        font-size: 10px;
      }
      &>em {
        // line-height: 38px;
        // font-size: 14px;
        color: #2993f8;
      }
    }
  }
</style>
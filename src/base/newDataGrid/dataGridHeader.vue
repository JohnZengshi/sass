<template>
  <!--表头-->
  <div class="xj-report-table-column">
    <div @click="headSort(tab)" class="ui-table_th" v-for="tab in detailDataGridColumn" :style="tableCell(tab.width)">
      {{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i>
      <img v-if="tab.sort == ''" src="~static/img/sort/default.png">
      <img v-if="tab.sort == '1'" src="~static/img/sort/up.png">
      <img v-if="tab.sort == '2'" src="~static/img/sort/down.png">
    </div>
  </div>
</template>
<script>
export default {
  props: ['detailDataGridColumn', 'tabCell', 'newList'],

  data() {
    return {
      isOld: '1',
      reportType: '1',
      sortList: []
    }
  },

  methods: {
    cancelSort (parm) {
        for (let i of this.detailDataGridColumn) {
            if (i.childType == parm.childType) {
                i.sort = ''
            }
        }
    },
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
      if (tab.sort == null || tab.sort == undefined) return

      if (tab.sort == 1) {
        tab.sort = 2
      } else {
        tab.sort = 1
      }
      
      let datas = {
        childType: tab.childType,
        name: tab.text,
        value: tab.sort
      }

      this.$emit('sortList', datas)

    }
  }
}

</script>

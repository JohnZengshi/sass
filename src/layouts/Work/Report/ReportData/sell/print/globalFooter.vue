<template>
  <tr class="tf">
    <td class="table-print-footer-td" :colspan="f ==2 ? 3 : 0" v-if="f >= 2" :style="tableCell(tab.width)" v-for="(tab,f) in detailDataGridColumn" :key="tab.id">
      <span v-if="f == 2" style="font-weight: bold;">合计</span>
      <div v-else :style="tableCell(tab.width)">
        <p class="totalNum" v-html="v_html(tab)"> </p>
        <p class="total" v-if="tab.totalName !=''" v-text="tab.totalName"></p>
      </div>
    </td>
  </tr>
</template>

<script>
  export default {
    data() {
      return {
        datalist: []
      }
    },
    props: ['detailDataGridColumn', 'dataGridStorage'],
    watch: {
      dataGridStorage: function() {
        this.updataData()
      }
    },
    methods: {
      tableCell(w) {
        return {
          width: w + (w.includes('%') ? '' : 'px')
        }
      },
      v_html(tab) {

        if(tab.type == '') return ''

        if(this.datalist[tab.type] == '') {
          return '<em>-</em>'
        }

        //小数点截取 ，合计精确到3位
        if(tab.toFixed) {
          return this.toFixed(this.datalist[tab.type], tab.countCut + 1)
        } else {
          return this.datalist[tab.type]
        }
      },
      updataData (){
        if(this.dataGridStorage.productTypeList && this.reportType != 1){
          this.datalist = this.dataGridStorage.productTypeList[0]
        }else{
          this.datalist = this.dataGridStorage
        }
      }
    },
  
    mounted(){
      this.$nextTick(()=>{
        this.updataData()
      })
    }
    
  }
</script>

<style scoped lang="scss">
  td {
    i {
      font-style: normal;
      font-size: 6pt;
      color: #999;
    }
    .totalNum {
      white-space: nowrap;
    }
  }
</style>
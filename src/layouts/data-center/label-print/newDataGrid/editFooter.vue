<template>
  <!--表尾-->
  <div class="ui-table_footer">
    <div class="th_footer" v-for="(tab,f) in detailDataGridColumn" :style="tableCell(tab.width)">
      <template v-if="reportType == 1 && tab.text == '条码号'">
        <!--<p class="top">修改前</p>
        <p class="top">修改后</p>-->
      </template>
      <template v-if="tab.text == '产品类别'">
        <!--<p class="top">修改前</p>
        <p class="top">修改后</p>-->
      </template>
      <template v-esle>
        <p class="top" v-if="f != 1" v-html="oldHtml(tab)"></p>
        <p class="bottom" v-if="f != 1" v-html="v_html(tab)"></p>
        <p class="bottom" v-if="f == 0">合计</p>
      </template>
    </div>
  </div>
</template>

<script>
  
  export default {
    data(){
      return{
        // detailDataGridColumn : this.configData
      }
    },
    props: ['detailDataGridColumn', 'dataGridStorage', 'tabCell', 'reportType', 'isEditReport', 'configData'],

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
      v_html(tab) {
        if(tab.type == '') return ''
        if(this.dataGridStorage[tab.type] == undefined) {
          return '<em style=\'color:#fff\'>-</em>'
        }
        //小数点截取 
        if(tab.toFixed) {
          return this.toFixed(this.dataGridStorage[tab.type], tab.countCut)
        } else {
          return this.dataGridStorage[tab.type]
        }
      },
      
      oldHtml(tab) {
        if(tab.childType == '') return ''
        
        if(this.reportType == 1){
          if(this.dataGridStorage[tab.type1] == undefined){
            return '<em style=\'color:#fff\'>-</em>'
          }
          //小数点截取 
          if(tab.toFixed) {
            return this.toFixed(this.dataGridStorage[tab.type1], tab.countCut)
          } else {
            return this.dataGridStorage[tab.type1]
          }
        }else{
          if(this.dataGridStorage){
              if(this.dataGridStorage[tab.type1] == undefined) {
                return '<em style=\'color:#fff\'>-</em>'
              }
              //小数点截取 
              if(tab.toFixed) {
                return this.toFixed(this.dataGridStorage[tab.type1], tab.countCut)
              } else {
                return this.dataGridStorage[tab.type1]
              }
          }
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ui-table_footer {
    background: #2993f8;
    height: 60px;
    z-index: 3;
    padding: 10px 0;
    .th_footer {
      position: relative;
      .bottom {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-weight: bold;
        color: #fff;
        font-size: 14px;
      }
      .top {
        font-size: 14px;
        line-height: 20px;
        height: 20px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
</style>
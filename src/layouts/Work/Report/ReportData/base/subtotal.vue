<!-- 小计 -->
<template>
  <div class="subtotal-main" style="background:#ECF3FF;">
    <div class="tb-td" :class="{'xj-report-text-right':tab.right}" v-for="(tab,f) in detailDataGridColumn" :style="nTableCell(tab)" v-html="f == 0 ? `<b>${name}</b>` : caty[tab[totalType]]"></div>
  </div>
</template>
<script>
import {calculateClass} from 'assets/js/getClass'
export default{
  props: ['detailDataGridColumn', 'caty', 'totalType', 'tabCell', 'name'],
  methods: {
    nTableCell (parm) {
      return calculateClass(parm)
    },
    tableCell (width) {
      return 'width:' + width + ( width.indexOf('%') >= 0 ? '' : 'px')
    }
  }
}
</script>

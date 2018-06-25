<!-- 小计 -->
<template>
  <div class="subtotal-main" style="background:#ECF3FF;">
    <div class="tb-td" :class="{'xj-report-text-right':tab.right}" v-for="(tab,f) in detailDataGridColumn" :style="tableCell(tab.width)" v-html="f == 0 ? `<b>${name}</b>` : caty[tab[totalType]]"></div>
  </div>
</template>
<script>
export default{
  props: ['detailDataGridColumn', 'caty', 'totalType', 'tabCell', 'name'],
  methods: {
    tableCell (width) {
      return 'width:' + width + ( width.indexOf('%') >= 0 ? '' : 'px')
    }
  }
}
</script>

<template>
  <div class="xj-print-change-wrap">
    打印控件
  </div>
</template>
<script>
  export default {
    created () {
      this.loadPrinters()
    },
    methods: {
      // 获取打印机列表
      loadPrinters() {
        getJCP().getPrinters(
            function(printers) {
              console.log('printers', printers)
              // var printerlist = document.getElementById('printer-list');
              // for (i = 0; i < printers.length; i++)
              //   printerlist.options[i + 1] = new Option(printers[i],
              //       printers[i]);
              // printerlist.options[0].selected = true;
            })
      },
      _print(printer, jobindex, jobs) {

        //打印文档对象
        var myDoc = {
          settings:{printer : printer},
          documents : 'pages.htm',
          copyrights : '杰创软件拥有版权  www.jatools.com',
          done : function() {
            jobindex++;
            if (!cancel && jobindex < jobs) {
              _print(printer, jobindex, jobs);
            }
          }
        };
        getJCP().print(myDoc, false);
      }
    }
  }
</script>
<style lang="scss">
  .xj-print-change-wrap{
    border: 1px solid red;
    width: 100%;
    height: 80px;
  }
</style>
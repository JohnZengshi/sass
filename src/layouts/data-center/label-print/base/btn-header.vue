<template>
  <div class="Rp_selected_container label-print-btn-h-main">

    <div class="e-border-radio-5">
      <el-checkbox v-model="printNum.allChecked" @change="changeAllChecked">全部</el-checkbox>
    </div>

    <div title="打印行范围" class="l-p-range-box">
      <input type="text" @blur="amendNum" placeholder="打印行范围" v-model="printNum.beginNum">
      <span>至</span>
      <input type="text" @blur="amendNum" placeholder="打印行范围" v-model="printNum.endNum">
    </div>

    <DownMenu :isSolid="true" :titleInfo="currentTemplate.templateName ? currentTemplate.templateName : '选择模板'" :showList="labelTemplateList" :nameKey="'templateName'" @changeData="changeTemplateId" @clearInfo="clearTemplate"></DownMenu>

    <printDownMenu :titleInfo="currentPrint ? currentPrint : '选择打印机'" :showList="printList" :nameKey="'name'" @changeData="changePrint" @clearInfo="clearPrint" @toMouseover="loadPrinters"></printDownMenu>

    <template v-if="isPopup">
        <el-button type="primary" size="small" class="ml-10" @click.native="_previewTemplate('Y')">预览</el-button>
        <el-button type="primary" size="small" class="back-btn" @click.native="_previewTemplate('N')">打印</el-button>
        <el-button type="primary" size="small" class="back-btn" @click.native="_previewTemplate('N')">导出</el-button>
    </template>

    <template v-else>
        <el-button size="small" class="ml-10" @click.native="_previewTemplate('Y')">预览</el-button>
        <el-button type="primary" size="small" class="back-btn" @click.native="_previewTemplate('N')">打印</el-button>
    </template>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {JaTools} from '@/utils/JaTool.js';
import DownMenu from 'base/menu/new-down-menu'
import printDownMenu from 'base/menu/print-down-menu'
import {seekGetPrintLabelList} from 'Api/commonality/seek.js'
export default {
  props: ['dataGridStorage', 'isPopup', 'addData', 'filterCondition'],
  components: {
    DownMenu,
    printDownMenu
  },
  data () {
    return {
      printList: [],
      printNum: { // 打印行数
        allChecked: false, // 全部选中
        beginNum: '',
        endNum: '',
      },
      currentTemplate: '',
      currentPrint: ''
    }
  },
  computed: {
    ...mapState({
      labelTemplateList: state => state.template.labelList
    }),
  },
  mounted: function () {
    this.$nextTick(function () {
      this._getVersion()
    })
  },
  methods: {
    changeAllChecked (parm) {
      if (this.printNum.allChecked) {
        this.printNum.beginNum = 1
        this.printNum.endNum = this.dataGridStorage.length
      } else {
        this.printNum.beginNum = ''
        this.printNum.endNum = ''
      }
      this.$emit('amendNum', this.printNum)
    },
    // 改变数据
    amendNum () {
      if (this.printNum.allChecked || this.printNum.beginNum && this.printNum.endNum) {
        this.$emit('amendNum', this.printNum)
      }
    },
    // 获取模板
    changeTemplateId (parm) {
      this.currentTemplate = parm
    },
    clearTemplate () {
      this.currentTemplate = ''
    },
    changeShopData (parm) {
      // this.dataGridOptions.receiveObject = 5
      // this.dataGridOptions.shopId = parm.shopId
      // this.dataGridOptions.shopName = parm.shopName
      // this.send()
    },
    clearPrint () {
      this.currentPrint = ''
    },
    toHome () {

    },
    seekPrintData (parm) { // 范围，回调
      debugger
      let barcode = {
        barcodeList: []
      }
      for (let i of this.addData) {
        barcode.barcodeList.push({barcode: i.barcode})
      }
      this.loading = true
      seekGetPrintLabelList(Object.assign(this.filterCondition, barcode, {
        beginNum: this.printNum.beginNum,
        endNum: this.printNum.endNum
      })).then(res => {
          if (res.data.state == 200) {
            this._previewTemplate(res.data.data.dataList, parm)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          this.loading = false
        })
    },
    // 获取打印模板
    _previewTemplate (data, parm) {
      let productId = []
      for (let i of data) {
        productId.push(i.productId)
      }
      if (!productId.length) {
        this.$message({
          type: 'error',
          message: '请选择商品'
        })
        return
      }
      if (!this.currentTemplate.templateId) {
        this.$message({
          type: 'error',
          message: '请选择模板'
        })
        return
      }
      this.$store.dispatch('previewTemplate', this.currentTemplate.templateId).then(json => {
        if(json.state == 200) {
          let canvas = json.data.content
          this._getPrintLabelData(JSON.parse(canvas), productId, parm)
          // this.$emit('getPrintLabelData', this.radio, this.orderNum,this.value1, this.value2, JSON.parse(canvas), selectedProducts, isPrint)
        }
      })
    },
    // 获取打印内容
    _getPrintLabelData (canvas, selectedProducts, parm) {
      let productList = selectedProducts.map(selectedProduct => {
        return {
          productId: selectedProduct
        }
      })
      this.$store.dispatch('getPrintLabelData', {productList:productList}).then(json => {
        if(json.state == 200) {
          // this.$set(this.print, 'templateData', json.data)
          // this.print.isPreview = true;
          this.printTemplate(canvas, json.data.productList, parm)
        }
      })
    },
    //预览模板
    printTemplate(templateList, dataList, parm){
      if (parm == 'Y') {
        JaTools.print(templateList, dataList);
      } else {
        JaTools.directPrint(templateList, dataList);
      }
    },
    _getVersion () {
      let noSetup = true
      var JCP = {  
          setup : {  
              noSetupHandle : function() {
                  noSetup = false
              }  
          }  
      }
      JCP.setup.noSetupHandle()
      setTimeout(() => {
        if (noSetup) {
          this.loadPrinters()
        }
      }, 1000)
    },
    // 获取打印机列表
    loadPrinters() {
        let _self = this
        getJCP().getPrinters(function(printers) {
          _self.printList = []
          for (let i of printers) {
            _self.printList.push({
              name: i
            })
          }
        })
        _self.getDefaultPrinter()
    },
    // 获取默认打印机
    getDefaultPrinter() {
      let _self = this
      getJCP().getDefaultPrinter(function(result) {
        _self.currentPrint = result
      })
    },
    // 设置默认打印机
    setDefaultPrinter() {
        let _self = this
        getJCP().setDefaultPrinter(_self.currentPrint, function() {
            _self.getDefaultPrinter();
        });
    },
    // 选择打印机
    changePrint (parm) {
      this.currentPrint = parm.name
      this.setDefaultPrinter()
    },
  }
}
</script>
<style lang="scss">
.label-print-btn-h-main{
  font-size: 0;
  .l-p-range-box {
    display: inline-block;
    position: relative;
    cursor: pointer;
    vertical-align: top;
    margin-left: 16px;
    width: 180px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    padding-left: 10px;
    background-color: #fff;
    input {
        width: 68px;
        height: 100%;
        font-size: 12px;
        float: left;
        text-align: center;
    }
    span {
        float: left;
        margin: 0 4px;
        color: #666;
        font-size: 14px;
        line-height: 26px;
    }
  }
  .e-border-radio-5{
    height: 28px;
    padding-bottom: 20px;
    font-size: 14px;
    vertical-align: top;
  }
}
</style>

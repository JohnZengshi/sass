<template>
  <transition name="tp-ani">
    <div class="table-template-print">
      <table class="table-print-wrap table-print-title">
        <tr class="tab-title-tr">
          <td :colspan="detailDataGridColumn.length" style="text-align:center;font-weight: bold; font-size: 16px;">
            {{typeName}}报表
          </td>
        </tr>
		<tr class="nameandtime-tr">
			<td>
					<div class="nameandtime">
						<div class="name">{{companyName}}</div>
						<div class="time">时间：{{printSelectDate.startTime}}至{{printSelectDate.endTime}}</div>
						<div class="clear"></div>
					</div>
			</td>
		</tr>
        <tr class="tab-title-tr" style="height: 40px;">
          <td v-if="typeName == '入库'">
            <p v-if="printSelectDate.storage !=''">入库库位：<span class="td">{{printSelectDate.storage}}</span></p>
            <p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
            <p v-if="printSelectDate.supplier !=''">供应商：<span class="td">{{printSelectDate.supplier}}</span></p>
            <p v-if="printSelectDate.shop !=''">分销商：<span class="td">{{printSelectDate.shop}}</span></p>
            <div class="clear">
            	<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
            	<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{printSelectDate.auditor}}</span></p>
            </div>
          </td>
          <td v-if="typeName == '修改'">
            <p v-if="printSelectDate.storage !=''">修改库位：<span class="td">{{printSelectDate.storage}}</span></p>
            <p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
            <p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{printSelectDate.auditor}}</span></p>
          </td>
          <td v-if="typeName == '退库'">
            <p v-if="printSelectDate.storage !=''">退库库位：<span class="td">{{printSelectDate.storage}}</span></p>
            <p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
            <p v-if="printSelectDate.supplier !=''">供应商：<span class="td">{{printSelectDate.supplier}}</span></p>
            <!--<p v-if="printSelectDate.shop !=''">分销商：<span class="td">{{printSelectDate.shop}}</span></p>-->
            <div class="clear">
            	<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
            	<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{printSelectDate.auditor}}</span></p>
            </div>
          </td>
          <td v-if="typeName == '调库'">
            <p v-if="printSelectDate.storage !=''">调入库位：<span class="td">{{printSelectDate.storage}}</span></p>
            <p v-if="printSelectDate.storageOut !=''">调出库位：<span class="td">{{printSelectDate.storageOut}}</span></p>
            <div class="clear">
            	<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
            	<p v-if="printSelectDate.auditor !=''">收货人：<span class="td">{{printSelectDate.auditor}}</span></p>
            </div>
          </td>
          <td v-if="typeName == '发货'">
            <p v-if="printSelectDate.storage !=''">发货库位：<span class="td">{{printSelectDate.storage}}</span></p>
            <p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
            <p v-if="printSelectDate.shop !=''">收货店铺：<span class="td">{{printSelectDate.shop}}</span></p>
            <div class="clear">
            	<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
            	<p v-if="printSelectDate.takeUser !=''">审核人：<span class="td">{{printSelectDate.takeUser}}</span></p>
            	<p v-if="printSelectDate.auditor !=''">收货人：<span class="td">{{printSelectDate.auditor}}</span></p>
            </div>
          </td>
          <td v-if="typeName == '调柜'">
            <p v-if="printSelectDate.shop !=''">店铺：<span class="td">{{printSelectDate.shop}}</span></p>
            <p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
          </td>
          <td v-if="typeName == '退货'">
            <p v-if="printSelectDate.storage !=''">退货库位：<span class="td">{{printSelectDate.storage}}</span></p>
            <p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
            <p v-if="printSelectDate.shop !=''">退货店铺：<span class="td">{{printSelectDate.shop}}</span></p>
            <div class="clear">
            	<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
            	<p v-if="printSelectDate.takeUser !=''">审核人：<span class="td">{{printSelectDate.takeUser}}</span></p>
            	<p v-if="printSelectDate.auditor !=''">收货人：<span class="td">{{printSelectDate.auditor}}</span></p>
            </div>
          </td>
        </tr>
      </table>
      <!--表头 start-->
      <data-grid-header :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
      <!--表格内容区  -->
      <data-grid-body :isEditReport="type" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType="reportType" :positionSwitch="positionSwitch" @scrollClass="scrollClass" @lazyloadSend="lazyloadSend" @tabCell="tabCell">
      </data-grid-body>
      <!--表尾  -->
      <data-grid-footer :isEditReport="type" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType="reportType" @tabCell="tabCell"></data-grid-footer>
      <table class="table-print-wrap table-print-title1">
				<tr class="tab-title-tr1">
					<td style="text-align:right;">
						打印时间：{{getSystemTime()}}
					</td>
				</tr>
			</table>
    </div>
  </transition>
</template>

<script>
  import {seekCompanyInfo} from './../../../../../Api/commonality/seek'
  import DataGridHeader from './dataGridHeader'
  import DataGridBody from './dataGridBody'
  import DataGridFooter from './dataGridFooter'
  //let configData = null
  let configData = require('./config/dataGridConfig')
  let edit = require('./config/edit') //修改打印数据
  export default {
    data() {
      return {
        tempDatagrid: [],
        detailDataGridColumn: [],
        configData : configData,
        companyName: ''
      }
    },
    components: {
      DataGridFooter,
      DataGridBody,
      DataGridHeader
    },
    watch: {
      reportType: function() {
        //this.configType()
        this.tableSwitch()
      },
      //开关 成本列
      tabSwitch: function() {
        this.tableSwitch()
      },
      positionSwitch: function() {
        this.posSwitch()
      },
      type : function(){
        if(this.type == 'edit'){
          this.$set(this,'configData', edit)
        }
      }
    },
    
    created(){
      if(this.type == 'edit'){
        this.$set(this,'configData', edit)
      }
      this.companyInfo()
    },
    props: ['typeName', 'dataGridStorage', 'reportType', 'tabSwitch', 'isOld', 'positionSwitch','type', 'printSelectDate'],
    methods: {
    	getSystemTime() {
				let myTime = new Date();
				let y = myTime.getFullYear();
				let mon = myTime.getMonth() + 1;
				let day = myTime.getDate();
				let hour = myTime.getHours();
				let mm = myTime.getMinutes();
				return y + '-' + mon + '-' + day + ' ' + hour + ':' + mm;
			},
      companyInfo (val) {
        seekCompanyInfo({companyId: sessionStorage.getItem('companyId')}).then((res) => {
          this.companyName = res.data.data.companyName
        }, (res) => {

        })
      },
      lazyloadSend(val) {
        this.$emit('lazyloadSend', val)
      },
      ObjectAssign() {
        this.tempDatagrid = [];
        this.detailDataGridColumn.forEach((item) => {
          let tempItem = Object.assign({}, item)
          this.tempDatagrid.push(tempItem)
        })
      },
      //单元格宽度
      tabCell(result) {
        if(result.width) {
          let w = 'width:' + result.width + 'px'
          result.res && result.res.call(this, w)
        }
      },
      tableSwitch() {
        let temp = [];
        //this.setConfig()
        this.configType()
        this.ObjectAssign()
        if(!this.tabSwitch) {
          if(!this.positionSwitch) {
            this.tempDatagrid.forEach((item) => {
              let tempwidth, _item = Object.assign({}, item)
              if(_item.width && _item.text != '成本' && _item.width && _item.text != '位置名称') {
                tempwidth = parseInt(_item.width)
                _item.width = tempwidth
                temp.push(_item)
              }
            })
          } else {
            this.tempDatagrid.forEach((item) => {
              let tempwidth, _item = Object.assign({}, item)
              if(_item.width && _item.text != '成本') {
                tempwidth = parseInt(_item.width)
                _item.width = tempwidth
                temp.push(_item)
              }
            })
          }

        } else {
          if(!this.positionSwitch) {
            this.tempDatagrid.forEach((item) => {
              let tempwidth, _item = Object.assign({}, item)
              if(_item.width && _item.text != '位置名称') {
                tempwidth = parseInt(_item.width)
                _item.width = tempwidth + 13
                temp.push(_item)
              }
            })
          } else {
            temp = this.tempDatagrid
          }
        }
        this.detailDataGridColumn = temp;
      },
      posSwitch() {
        let temp = [];
        //this.setConfig()
        this.configType()
        this.ObjectAssign()
        if(!this.positionSwitch) {
          if(!this.tabSwitch) {
            this.tempDatagrid.forEach((item) => {
              let tempwidth, _item = Object.assign({}, item)
              if(_item.width && _item.text != '成本' && _item.width && _item.text != '位置名称') {
                tempwidth = parseInt(_item.width)
                _item.width = tempwidth + 30
                temp.push(_item)
              }
            })
          } else {
            this.tempDatagrid.forEach((item) => {
              let tempwidth, _item = Object.assign({}, item)
              if(_item.width && _item.text != '位置名称') {
                tempwidth = parseInt(_item.width)
                _item.width = tempwidth + 13
                temp.push(_item)
              }
            })
          }

        } else {
          if(!this.tabSwitch) {
            this.tempDatagrid.forEach((item) => {
              let tempwidth, _item = Object.assign({}, item)
              if(_item.width && _item.text != '成本') {
                tempwidth = parseInt(_item.width)
                _item.width = tempwidth + 13
                temp.push(_item)
              }
            })
          } else {
            temp = this.tempDatagrid
          }
        }
        this.detailDataGridColumn = temp;
      },
      configType() {
        switch(this.reportType) {
          case 1:
            this.setColumn(this.configData.detailConfing)
            break;
          case 2:
            this.setColumn(this.configData.intelligentConfing)
            break;
          case 3:
            this.setColumn(this.configData.produceConfing)
            break;
          case 4:
            this.setColumn(this.configData.customConfing)
            break;
        }

      },
      scrollClass(type) {
        this.$emit('scrollClass', type)
      },
      setColumn(data) {
        if(data) this.detailDataGridColumn = data
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.tableSwitch()
      })
    }
  }
</script>

<style lang="scss">
  .table-template-print {
    min-height: 180mm;
    background: transparent;
    width: 210mm;
    margin: 0 auto;
    i {
      font-style: normal;
      background: transparent !important;
    }
    .table-print-wrap {
      border-collapse: collapse;
      width: 100%;
      font-size: 9pt;
      td {
        border: 0.5mm solid #333;
        font-size: 8pt;
        text-align: center;
        height: 8mm;
        padding: 0;
        white-space: nowrap;
        &.pad-right {
          text-align: right;
          padding-right: 9px;
        }
      }
      tr {
        page-break-inside: avoid;
      }
      .tb-total {
        td {
          border-top-width: 0;
        }
      }
      .table-print-footer-td {
        border-top-width: 0;
      }
    }
    .table-print-title {
      margin-top: 10mm;
    }
    tr.tab-title-tr {
      // height: 20mm;
      >td {
        // height: 20mm;
        border: 0 none;
        font-size: 8pt;
        text-align: left;
        padding: 0;
        width: 600px;
        line-height: 20px;
        p {
          float: left;
          display: inline-block;
          padding-right: 12px;
    			min-width: 196px;
        }
        >.td {
          display: inline-block;
          color: #999;
          white-space: nowrap;
          max-width: 100px;
          overflow: hidden;
          vertical-align: middle;
        }
      }
      .time {
        text-align: right;
      }
    }
  }
  tr.nameandtime-tr{
	&>td{
		border: 0px !important;
	}
}
.nameandtime {
	clear: both;
	&>.name {
		float: left;
		font-size: 12pt;
		font-weight: bold;
	}
	&>.time {
		float: right;
	}
}

.clear {
	clear: both;
}
tr.tab-title-tr1{
	&>td{
		border: 0px !important;
	}
}

  @media print {}
</style>
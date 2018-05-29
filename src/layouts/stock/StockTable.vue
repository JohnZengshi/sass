<template>
  <transition name="tp-ani">

    

    <div class="RP_report_wrapper ui-page-max-width xj-stock-print-table-main" v-loading="loading" element-loading-text="数据查询中">
      <!-- v-loading = "loading" -->

			<div class="Rp_dataGrid_container">
				<div class="rp_gridState">
					<p class="side-nav"><i class="iconfont icon-baobiao"></i>商品列表</p>
					<div class="sort-wrap">
						<label>排序:</label>
						<div class="sortwrap-text" v-for="(item, index) in sortList" :key="index">
							{{item.name}}
							<img class="sortwrap-img" v-if="item.value == '2'" src="./../../../static/img/sort/down1.png">
							<img class="sortwrap-img" v-if="item.value == '1'" src="./../../../static/img/sort/up1.png">
							<i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
						</div>
					</div>
					<div class="right-wrap">
						<div class="search-wrap">
							<input v-if="dataGridOptions.type == 1" type="text" @keyup.enter="searchWord" v-model="dataGridOptions.keyWord" placeholder="输入关键字" />
							<!--<i class="iconfont icon-sousuo" @click="send"></i>-->
						</div>
						<!-- <div @click="toggleAttribute" class="iconfont-wrap">
							<span v-if="dataGridOptions.productClass == 1">成品</span>
							<span v-if="dataGridOptions.productClass == 2">旧料</span>
							<i class="iconfont icon-qiehuan"></i>
						</div> 修改样式位置-->
						<div class="iconfont-wrap">
							<span style="margin-right:25px;" :class="inconspanactive1 == true ? 'myspanactive' : ''" @click="toggleAttribute(1)" >成品</span>
							<span style="margin-right:25px;" :class="inconspanactive2 == true ? 'myspanactive' : ''"  @click="toggleAttribute(2)" >旧料</span>
						</div>
						<div class="tab">
							<span :class="0 == tabClassActive.index ? tabClassActive.activeClass : ''" @click="tabs(0, 1)">明细</span>
							<span :class="1 == tabClassActive.index ? tabClassActive.activeClass : ''" @click="tabs(1, 2)">智能分类</span>
							<span :class="2 == tabClassActive.index ? tabClassActive.activeClass : ''" @click="tabs(2, 3)">产品分类</span>
							<!--自定原点击事件：@click="tabs(3, 4)"-->
							<span :class="3 == tabClassActive.index ? tabClassActive.activeClass : ''" @mouseover="tabHover(3, $event)" @mouseout="tabOut(3, $event)">自定义
                                <i v-if="tabClassActive.index == 3" class="iconfont icon-arrow-down"></i>
                                <div class="customDia" ref="customDia" style="display: none;">
                                    <div class="body">
                                        <div class="list-wrap">
                      <ul>
                        <li></li>
                        <li>成色名称</li>
                        <li>宝石名称</li>
                        <li>首饰类别</li>
                      </ul>
                      <ul>
                        <li>计重类</li>
                        <li>
                        <DropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="成色名称-计重"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                        >
                        </DropDownMenu>
                        </li>
                        <li>
                        <DropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="宝石名称-计重"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                        >
                        </DropDownMenu>
                        </li>
                        <li>
                        <DropDownMenu
                          titleName="大类"
                          dataType="customDia"
                          dataDataType="首饰类别-计重"
                          :propList="dialogOptions.jewelryList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                        >
                        </DropDownMenu>
                        </li>
                      </ul>
                      <ul>
                        <li>计件类</li>
                        <li>
                        <DropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="成色名称-计件"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                        >
                        </DropDownMenu>
                        </li>
                        <li>
                        <DropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="宝石名称-计件"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                        >
                        </DropDownMenu>
                        </li>
                        <li>
                        <DropDownMenu
                          titleName="大类"
                          dataType="customDia"
                          dataDataType="首饰类别-计件"
                          :propList="dialogOptions.jewelryList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                        >
                        </DropDownMenu>
                        </li>
                      </ul>
                                        </div>
                                    </div>
                                    <div class="foot" solt="footer">
                    <div class="btn-wrap">
                      <div @click.stop="resetOption" class="reset btn">重置</div>
                      <div @click.stop="compOption" class="comp btn">完成</div>
                    </div>
                              </div>
                      </div>
                    </span>
            </div>
            <div class="position-group">
              <!-- <el-radio class="radio" label="1">位置分组</el-radio> -->
              <!-- <el-checkbox v-model="positionSwitch" :disabled="dataGridOptions.type == 1">位置分组</el-checkbox> -->
              <span :title="positionSwitch ? '取消位置' : '选择位置'" @click="choseMenu(1)" class="btn" :class="{active: positionSwitch}" v-if="dataGridOptions.type != 1">位置</span>
            </div>
            <div class="xj-switch" v-if="isShowCost == 'Y'">
              <!-- <el-checkbox v-model="tabSwitch">成本</el-checkbox> -->
              <span :title="tabSwitch?'关闭成本' : '开启成本'" @click="choseMenu(2)" class="btn" :class="{active: tabSwitch}">专列项</span>
            </div>
          </div>
        </div>

        <div class="rp_dataGridTemp" :class="tabShow">
          <report-detail v-if="dataGridStorage" :dataGridStorage="dataGridStorage" :tabSwitch="tabSwitch" :positionSwitch="positionSwitch" :isOld="isOld" :newList="newList" @lazyloadSend="sendlayLoad" @scrollClass="tabScrollShow" @sortList="sortListAct" :reportType="getReportType()">
          </report-detail>
        </div>
        <div class="printBtn" @click="tabPrin()">
          <i class="iconfont icon-dayin1"></i>
          <span>打印库存</span>
        </div>
      </div>
      <div ref="tablePrint" v-if="isPrint==1">
        <table-print :tabSwitch="tabSwitch" :reportType="getReportType()" @sortList="sortListAct" :positionSwitch="positionSwitch" :printSelectDate="printSelectDate" :dataGridStorage="dataGridStorage">
        </table-print>
      </div>
      
      <!-- 明细0 -->
<!--       <detailTemplate v-if="this.tabClassActive.index==0" title="库存-明细" ref="detailTemplate" :sellList="printData" :headerData="printSelectDate"></detailTemplate>
 -->
          <div v-if="this.tabClassActive.index==0" class="xj-kc-print-main" ref="detailTemplateWrap">
            <detailTemplate title="库存-明细" :tabSwitch="tabSwitch" :sellList="printData" :headerData="printSelectDate"></detailTemplate>
          </div>
        <!--打印模块-->
        <div style="display: none;">
            
            <!-- 明细0 -->
     <!--        <detailTemplate v-if="this.tabClassActive.index==0" title="库存-明细" ref="detailTemplate" :sellList="printData" :headerData="printSelectDate"></detailTemplate> -->


            <!-- 智能1 -->
            <intelligence-type-template v-if="tabClassActive.index==1" title="库存-智能分类" ref="intelligenceTypeTemplate" :sellList="printData" :tabSwitch="tabSwitch" :headerData="printSelectDate" :positionSwitch="positionSwitch"></intelligence-type-template>

            <!-- 产品分类 -->
            <project-type-template v-if="this.tabClassActive.index==2" title="库存-产品分类" ref="projectTypeTemplate" :sellList="printData" :tabSwitch="tabSwitch" :headerData="printSelectDate" :positionSwitch="positionSwitch"></project-type-template>


            <!-- 自定义3 -->
            <intelligence-type-template v-if="tabClassActive.index==3" title="库存-自定义" ref="customTemplate" :sellList="printData" :tabSwitch="tabSwitch" :headerData="printSelectDate" :positionSwitch="positionSwitch"></intelligence-type-template>

<!-- 
            <project-type-template v-if="tabClassActive.index==2" title="库存" ref="projectTypeTemplate" :sellList="printData" :headerData="printSelectDate"></project-type-template>

            <custom-template v-if="tabClassActive.index==3" title="库存" ref="customTemplate" :sellList="printData" :headerData="printSelectDate"></custom-template>
 -->
        </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import find from 'lodash/find'
  import { seekSendReport } from 'Api/commonality/operate.js'
  import {
    seekStockProductListFinished,
    seekStockProductListOld,
    seekStockProductList,
    seekSettingUserRole
  } from 'Api/commonality/seek.js'
  import DropDownMenu from 'components/template/DropDownMenu1'
  import ReportDetail from './newDataGrid/reportDetailTab'
  import TablePrint from './print/reportDetailTab'

  //打印模板，明细，产品分类，智能分类=自定义
  import detailTemplate from "@/components/jcp-print/kc/detail-template";
  import projectTypeTemplate from "@/components/jcp-print/kc/project-type-template";
  import intelligenceTypeTemplate from "@/components/jcp-print/kc/intelligence-type-template";
  import customTemplate from "@/components/jcp-print/kc/intelligence-type-template";



  export default {
    props: ['changeRepository', 'changeShop', 'changeCounter'],
    data() {
      return {
        printData: {},
        inconspanactive1:true,
        inconspanactive2:false,
        customDialog: false, // 自定义列表弹窗
        page: 1,
        isOld: 1,
        isPrint: 0,
        keyWord: '',
        beginTime: '',
        endTime: '',
        printSelectDate: {
          shop: '', //店铺
          preparedBy: '', //制单人
          headerData: '库存', //制单大标题
          orderNum: this.$route.query.orderNumber,
          //reportType : '4' //1代表入库、2退库、3调库、4发货、5调柜、6退货
        },
        //
        tabShow: 'tabShow',

        loading: true,

        dataGridStorage: '',
        dataGridDetailList: [],
        positionSwitch: false,
        //成本核算
        tabSwitch: false,

        //产品类别
        productCategoryType: [],
        productCategory: [],
        categoryProps: {
          value: 'classesId',
          label: 'classesName',
          children: 'typeList'
        },

        //供应商
        supplierSpaceValue: '',
        providerList: [],

        tabClassActive: {
          index: 1,
          activeClass: 'active'
        },

        //大、小类 tab切换
        tabData: [{
            txt: '明细',
            fun: this.tabs,
            type: 1
          },
          {
            txt: '智能分类',
            fun: this.tabs,
            type: 2
          },
          {
            txt: '产品分类',
            fun: this.tabs,
            type: 3
          },
          {
            txt: '自定义',
            fun: this.tabs,
            type: 4
          },
        ],
        provider: '',
        providerId: '',

        //
        propOptons: {
          beginTime: '',
          endTime: '',
          storageId: '', //入库ID
          productTypeId: '', //产品类别ID
          shopId: '', //收货店铺ID
          makeUserId: '', //制单人ID
          checkUserId: '', //审核人ID
          takeUserId: '', //收货人ID
          reportType: 3 //报表类型 ，为1时代表成色大类，为2时是成色小类，为3时是明细 ,默认为明细
        },
        dialogOptions: {
          conditionList: [
            '不选', '大类', '小类'
          ],
          jewelryList: [
            '大类', '小类'
          ]
        },
        dataGridOptions: {
          storageId: '',//库位id
          shopId: '',//店铺id
          counterId: '',//柜组id
          productClass: '1',//商品属性
          sortFlag: '0',//分位置 1=分，0=不分
          sortList: [{
            classTypeName: '1'//产品类别
          }],
          type: 2,//类型
          page: 1,
          pageSize: 15,
          keyWord: '',//关键字
          wColorId: '',//计重
          wGemId: '',//宝石类
          wJewelryId: '1',//首饰类
          nColorId: '',//计件
          nGemId: '',//宝石类
          nJewelryId: '1'//首饰类
        },
        resetFlag: false,
        isShowCost: '',
        sortList: [{
          name: '产品类别',
          value: '1'
        }],
        newList: [{
          name: '产品类别',
          value: '1'
        }]
      };
    },
    watch: {
      'changeRepository.repositoryId' (val) {
        console.log('909090909090',val)
        this.dataGridOptions.storageId = val
        if(this.changeRepository.repositoryId) {
          this.dataGridOptions.storageId = val
          this.dataGridOptions.page = 1
          this.dataGridOptions.pageSize = 15
        }
        this.send()
      },
      'changeShop.shopId' (val) {
        console.log('90909090909090',val)
        if(this.changeShop.shopId) {
          this.dataGridOptions.shopId = val
        } else {
          this.dataGridOptions.shopId = ''
          this.dataGridOptions.counterId = ''
        }
        this.dataGridOptions.page = 1
        this.dataGridOptions.pageSize = 15
        this.send()
      },
      'changeCounter.counterId' (val) {
        this.dataGridOptions.counterId = val
        this.dataGridOptions.page = 1
        this.dataGridOptions.pageSize = 15
        if(this.changeCounter.counterId) {
          this.send()
        }
      },
      'positionSwitch' (val) {
        if(val == true) {
          this.dataGridOptions.sortFlag = 1
        } else {
          this.dataGridOptions.sortFlag = 0
        }
        this.send()
      }
    },
    components: {
      ReportDetail,
      DropDownMenu,
      TablePrint,
      projectTypeTemplate,
      intelligenceTypeTemplate,
      detailTemplate,
      customTemplate
    },
    created() {
      this.settingUserRole()
    },
    methods: {
      choseMenu(type) {
        if(type == 1) {
          this.positionSwitch = !this.positionSwitch
        } else if(type == 2) {
          this.tabSwitch = !this.tabSwitch
        }
      },
      cancelSort(item, index) { // 取消排序
        this.sortList.splice(index, 1)
        this.newList = this.sortList
      },
      sortListAct(val) { // 列表排序
          console.log(val);
        this.dataGridOptions.sortList = val
        this.send()
        this.sortList = []
        val.forEach((item, index) => {
          switch(Object.keys(item)[0]) {
            case 'barcode':
              this.sortList.push({
                name: '条码号',
                value: item.barcode
              })
              break;
            case 'weight':
              this.sortList.push({
                name: '件重',
                value: item.weight
              })
              break;
            case 'className':
              this.sortList.push({
                name: '首饰名称',
                value: item.className
              })
              break;
            case 'classTypeName':
              this.sortList.push({
                name: '产品类别',
                value: item.classTypeName
              })
              break;
            case 'goldWeight':
              this.sortList.push({
                name: '金重',
                value: item.goldWeight
              })
              break;
            case 'price':
              this.sortList.push({
                name: '售价',
                value: item.price
              })
              break;
            case 'cost':
              this.sortList.push({
                name: '成本',
                value: item.cost
              })
              break;
            case 'num':
              this.sortList.push({
                name: '件数',
                value: item.num
              })
              break;
          }

        })
      },
      //打印表格 
      tabPrin() {
        if(this.dataGridStorage.productTypeList && this.dataGridStorage.productTypeList.length == 0 ||
          this.dataGridStorage.printDetailList && this.dataGridStorage.printDetailList.length == 0) {
          this.$message({
            type: 'error',
            message: '暂无数据打印'
          })
          return;
        }
        this.loading = true;
        this.dataGridOptions.pageSize = 0
        seekStockProductList(this.dataGridOptions).then((res) => {
          console.log('打印响应数据', res)
          this.dataGridOptions.pageSize = 15
          if(res.data.state == 200) {
            if (res.data.data.detailList) {
              if (res.data.data.detailList[0] instanceof Array) {
                let datas = res.data.data
                let allData = []
                for(let i of res.data.data.detailList) {
                  allData.push(...i)
                }
                datas.detailList = allData
                this.printData = datas
              } else {
                this.printData = res.data.data
              }
            } else {
              this.printData = res.data.data
            }
            setTimeout(() => {
              this.currentPrint()
              this.loading = false
            }, 2000)
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        })
        // this.currentPrint()
      },

      // 打印
      currentPrint () {
        switch (this.tabClassActive.index){
          case 0:
            this.defaultPrint()
            // this.$refs.detailTemplateWrap.print();
            break;
          case 1:
            this.$refs.intelligenceTypeTemplate.print();
            break;
          case 2:
            this.$refs.projectTypeTemplate.print();
            break;
          case 3:
            // this.$refs.detailTemplate.print();
            this.$refs.customTemplate.print();
            break;
          default:
            break;
        }
      },
      // 用原生打印
      defaultPrint () {
          let print = null;

          this.appPrint = document.getElementById('appPrint')

          if(this.IntervalOut) clearInterval(this.IntervalOut)
          document.getElementById('app').style.display = 'none';

          setTimeout(() => {
            this.appPrint.innerHTML = this.$refs.detailTemplateWrap.innerHTML
          }, 1000)

          setTimeout(() => {
            print = document.execCommand('print');
          }, 1500)

          this.IntervalOut = setInterval(() => {
            if(print) {
              document.getElementById('app').style.display = 'block';
              if(this.IntervalOut) clearInterval(this.IntervalOut)
              this.IntervalOut = null;
              this.appPrint.innerHTML = '';
            } else if(print == false) {
              if(this.IntervalOut) clearInterval(this.IntervalOut)
              if(!window.print()) {
                document.getElementById('app').style.display = 'block';
                this.IntervalOut = null;
                this.appPrint.innerHTML = '';
              }
            }
          }, 10)
      },

      // currentPrint () {
      //  this.isPrint = 1;
      //  let print = null;

      //  this.appPrint = document.getElementById('appPrint')

      //  if(this.IntervalOut) clearInterval(this.IntervalOut)
      //  document.getElementById('app').style.display = 'none';

      //  setTimeout(() => {
      //    this.appPrint.innerHTML = this.$refs.tablePrint.innerHTML
      //  }, 1000)
      //  setTimeout(() => {
      //    print = document.execCommand('print');
      //  }, 1500)

      //  this.IntervalOut = setInterval(() => {
      //    if(print) {
      //      document.getElementById('app').style.display = 'block';
      //      this.isPrint = 0;
      //      if(this.IntervalOut) clearInterval(this.IntervalOut)
      //      this.IntervalOut = null;
      //      this.appPrint.innerHTML = '';
      //    } else if(print == false) {
      //      if(this.IntervalOut) clearInterval(this.IntervalOut)
      //      if(!window.print()) {
      //        document.getElementById('app').style.display = 'block';
      //        this.isPrint = 0;
      //        this.IntervalOut = null;
      //        this.appPrint.innerHTML = '';
      //      }
      //    }
      //  }, 10)
      // },

      settingUserRole() { // 用户查看成本权限
        let options = {
          userId: sessionStorage.getItem('id')
        }
        seekSettingUserRole(options).then((res) => {
          if(res.data.state == 200) {
            this.isShowCost = res.data.data.costFlag
          }
        }, (res) => {

        })
      },
      resetOption() {
        this.dataGridOptions.wColorId = ''
        this.dataGridOptions.wGemId = ''
        this.dataGridOptions.wJewelryId = '1'
        this.dataGridOptions.nColorId = ''
        this.dataGridOptions.nGemId = ''
        this.dataGridOptions.nJewelryId = '1'
        this.resetFlag = true
        this.send()
      },
      compOption() {
        this.tabClassActive.index = 3
        if(this.dataGridOptions.type != 4) {
          this.dataGridOptions.type == 4
          this.setReportType(4)
        } else {
        this.send()
        }
        this.customDialog = false
      },
      diaInfoBack(val) { // 弹框信息返回
        this.resetFlag = false
        //val.type 1.成色名称-计重  2.宝石名称-计重  3.首饰类别-计重  4.成色名称-计件  5.宝石名称-计件  6.首饰类别-计件
        switch(val.type) {
          case 1:
            this.dataGridOptions.wColorId = val.value
            break;
          case 2:
            this.dataGridOptions.wGemId = val.value
            break;
          case 3:
            this.dataGridOptions.wJewelryId = val.value
            break;
          case 4:
            this.dataGridOptions.nColorId = val.value
            break;
          case 5:
            this.dataGridOptions.nGemId = val.value
            break;
          case 6:
            this.dataGridOptions.nJewelryId = val.value
            break;
        }
      },
      toggleAttribute(val) {
        if(val ==1){
          this.inconspanactive1 = true;
          this.inconspanactive2 = false;
        }else{
          this.inconspanactive1 = false;
          this.inconspanactive2 = true;
        }
        this.dataGridOptions.page = 1
        this.dataGridOptions.pageSize = 15
        this.dataGridOptions.productClass = val;
        console.log('切换成旧料',this.dataGridOptions.productClass)
        //this.dataGridOptions.productClass = this.dataGridOptions.productClass == 1 ? 2 : 1
        this.loading = true;
        this.send()

      },
      //收货店铺
      StoreGoodsFunc() {
        if(this.propOptons.shopId == '') {
          this.propOptons.takeUserId = ''
          this.takeUserDisabled = true
        } else {
          this.takeUserDisabled = false
        }

      },

      //产品类别
      callProductCategory(res) {

        if(res.length == 0) {
          return
        }

        this.propOptons.productTypeId = res[1]

        let _categoryDate = this.productCategory.filter((item) => {
          return item.value == res[0]
        })

        if(_categoryDate[0] && _categoryDate[0].typeList) {

          let val = find(_categoryDate[0].typeList, {
            value: this.propOptons.productTypeId
          })

        }

        this.send()
      },
      tabs(index, type, evt) {
        if(this.dataGridOptions.type == 4 && index == 3) {
          this.customDialog = true
        }
        this.loading = true;
        this.dataGridOptions.page = 1
        this.dataGridOptions.pageSize = 15
        this.tabClassActive.index = index;
        this.setReportType(type)

      },
      tabHover(index, evt) {
        this.$refs.customDia.style.zIndex = "10"
        this.$refs.customDia.style.opacity = '1'
        this.$refs.customDia.style.display = "block"
      },
      tabOut(index, evt) {
        this.$refs.customDia.style.zIndex = "-1"
        this.$refs.customDia.style.display = "none"
        this.$refs.customDia.style.opacity = '0'
      },
      //滚动条滚动时不显示总计
      tabScrollShow(type) {
        this.tabShow = type ? 'tabShow' : ''
      },
      //获取当前的接口类型
      getReportType() {
        return this.dataGridOptions.type
      },
      setReportType(port) {
        if(port) {
          if(port == 1) {
            if(this.inconspanactive1){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: '0',
                type: 1,
                page: 1,
                pageSize: 15,
                keyWord: ''
              })
              
            } else if(this.inconspanactive2){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '2',
                sortFlag: '0',
                type: 1,
                page: 1,
                pageSize: 15,
                keyWord: ''
              })
            } else {
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: '0',
                type: 1,
                page: 1,
                pageSize: 15,
                keyWord: ''
              })
            }
          } else if(port == 2) {
            delete this.dataGridOptions.page
            delete this.dataGridOptions.pageSize
            delete this.dataGridOptions.keyWord
            delete this.dataGridOptions.wColorId
            delete this.dataGridOptions.wJewelryId
            delete this.dataGridOptions.nColorId
            delete this.dataGridOptions.nGemId
            delete this.dataGridOptions.nJewelryId

            if(this.inconspanactive1){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })
            }else if(this.inconspanactive2){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '2',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })
            } else {
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })
            }
          } else if(port == 3) {
            delete this.dataGridOptions.page
            delete this.dataGridOptions.pageSize
            delete this.dataGridOptions.keyWord
            delete this.dataGridOptions.wColorId
            delete this.dataGridOptions.wJewelryId
            delete this.dataGridOptions.nColorId
            delete this.dataGridOptions.nGemId
            delete this.dataGridOptions.nJewelryId

            if(this.inconspanactive1){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })
            }else if(this.inconspanactive2){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '2',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })
            }else {
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })

            }

          } else if(port == 4) {
            if(this.inconspanactive1){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1'
              })
            } else if(this.inconspanactive2){
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '2',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1'
              })
            } else {
              Object.assign(this.dataGridOptions, {
  //              storageId: '',
  //              shopId: '',
  //              counterId: '',
                productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1'
              })

            }
          }
        }
        this.dataGridOptions.type = port
        this.send()
      },
      /*
       * 数据请求  输入关键字搜索
       */
      searchWord() {
        this.dataGridOptions.page = 1
        this.dataGridOptions.pageSize = 15
        this.send()
      },
      sendlayLoad() {//初始化数据
        this.dataGridOptions.pageSize += 15
        seekStockProductList(this.dataGridOptions).then((res) => {
          if(res.data.state == 200) {
            console.log('第一次加载数据:', res.data.data);
            this.dataGridStorage = res.data.data
            this.loading = false
          }
        }, (res) => {

        })
      },
      send() {
        this.loading = true;
        seekStockProductList(this.dataGridOptions).then((res) => {
        console.log('库存统计数据加位置:',res);
          if(res.data.state == 200) {
            this.dataGridStorage = res.data.data
            this.loading = false
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        }, (res) => {
          this.$message({
            type: 'info',
            message: res.data.msg
          })
        })
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.send()
      })
    },
    updated(){
      console.log('******************1')
      console.log(this.changeRepository)
      console.log(this.changeShop)
      console.log(this.changeCounter)
      console.log('******************2')
    }
  }
</script>

<style lang="scss">
  /* 公用样式  */
  
  @import "~assets/css/webReport/index";
  .xj-switch,
  .position-group {
    .el-checkbox {
      padding: 0;
      line-height: 0;
      height: 20px;
      margin-top: -2px;
      .el-checkbox__input {
        .el-checkbox__inner {
          width: 14px;
          height: 14px;
        }
        .el-checkbox__inner:after {
          height: 7px;
          left: 4px;
          width: 2px;
        }
        &.is-checked {
          .el-checkbox__inner {
            background: #2993f8;
            border-color: #2993f8;
            color: #fff;
          }
        }
        &.is-focus,
        &:hover {
          // .el-checkbox__inner {}
        }
      }
      .el-checkbox__label {
        display: inline-block;
        font-size: 14px;
      }
    }
  }

  // 打印
  .xj-kc-print-main{
      display: none;
  }
  @media print{
    tr { page-break-inside: avoid; }
    .xj-kc-print-main{
      display: block;
    }
    .xj-stock-print-table-main{
      table{
        border-collapse: collapse;
      }
      tr { page-break-inside: avoid; }
    }
  }
</style>
<style lang="scss" src="./../../assets/css/customDialog/customDialog.scss"></style>
<style lang="scss" scoped>
  /* 
 * 数据表格 模块
 * */
  .sortwrap-text{
    margin-top: 2px;
    line-height: 16px;
    width: 65px;
    position: relative;
    .sortwrap-img{
        position: absolute;
        top: 8px;
        right: 1px;
    }
}
  .Rp_dataGrid_container {
    border-radius: 10px;
    box-shadow: 0px 0 15px #e2e2e2;
    height: 700px;
    margin-top: 20px;
    position: relative;
    background-color: #fff;
    padding: 50px 0 0 0;
    // overflow: hidden;
    .printBtn {
      width: 52px;
      height: 52px;
      position: absolute;
      bottom: 0;
      right: -70px;
      background: #fff;
      border-radius: 4px;
      z-index: 10;
      text-align: center;
      cursor: pointer;
      overflow: hidden;
      i {
        line-height: 52px;
        font-size: 24px;
      }
      span {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        padding: 6px 11px;
        font-size: 14px;
      }
    }
    .printBtn:hover {
      span {
        display: block;
        background: #2993f8;
        color: #fff;
      }
    }
    >.rp_gridState {
      height: 50px;
      padding-left: 20px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 100;
      >.right-wrap {
        float: right;
        //tab切换
        >.tab {
          // display: inline-block;
          float: left;
          //width: 271px;
          //border:1px solid #ffb549;
          //border-radius: 5px;
          padding: 0 5px;
          border-left: 1px solid #d6d6d6;
          border-right: 1px solid #d6d6d6;
          margin-top: 16px;
          font-size: 14px;
          height: 16px;
          position: relative;
          //overflow: hidden;     
          >span {
            float: left;
            //width: 24%;
            margin: 0 15px;
            text-align: center;
            line-height: 16px;
            cursor: pointer;
            transition: all .2s;
            &.active {
              color: #2993f8;
            }
          }
        }
        >.position-group {
          // display: inline-block;
          margin-top: 12px;
          float: left;
          //height: 16px;
          padding-left: 20px;
          &>.btn {
            display: block;
            width: 52px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            color: #2993f8;
            background: #e0ecf7;
            font-size: 12px;
            border-radius: 4px;
            border: 1px solid #2993f8;
            cursor: pointer;
          }
          &>.btn.active {
            color: #fff;
            background: #2993f8;
          }
        }
        .xj-switch {
          //border-left: 1px solid #d6d6d6;
          // display: inline-block;
          margin-top: 12px;
          float: left;
          padding-left: 20px;
          padding-right: 0;
          &>.btn {
            font-size: 12px;
            display: block;
            width: 52px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            color: #2993f8;
            background: #e0ecf7;
            border-radius: 4px;
            cursor: pointer;
            border: 1px solid #2993f8;
          }
          &>.btn.active {
            color: #fff;
            background: #2993f8;
          }
        }
        // .xj-switch{
        //   display: inline-block;
        //   vertical-align: top;
        //   margin-left: 10px;
        // }
        // //成本开关
        // >.el-switch{
        //     // float: right;
        //     margin-left: 10px;
        // }
        .search-wrap {
          position: relative;
          width: 100px;
          height: 32px;
          margin-top: 11px;
          margin-right:25px;
          // display: inline-block;
          float: left;
          vertical-align: top;
          input {
            width: 100px;
            height: 26px;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 4px;
            padding-left: 14px;
          }
          input::-webkit-input-placeholder {
            color: #ccc;
          }
          input::placeholder,
          input::-moz-placeholder {
            color: #999;
          }
          .drop-search {
            position: absolute;
            left: 0;
            top: 6px;
            font-size: 14px;
            font-weight: bold;
            border-right: 1px solid #d6d6d6;
            padding: 0 26px;
            .el-dropdown-link {
              font-size: 13px;
              font-weight: normal;
              color: #2993f8;
              i {
                font-size: 10px;
                position: absolute;
                right: 6px;
                top: 6px;
              }
            }
          }
          .iconfont {
            position: absolute;
            right: 10px;
            top: 8px;
            font-size: 16px;
            color: #333;
            cursor: pointer;
          }
        }
      }
    }
    .iconfont-wrap {
      // display: inline-block;
      vertical-align: top;
      //border:1px solid #000;
      float: left;
      height: 28px;
      // width: 125px;
      margin-top: 17px;
      text-align: center;
      cursor: pointer;
      .myspanactive{
        color: #2993f8;
      }
      span {
        font-size: 14px;
        line-height: 14px;
        color: #666;
        &:hover{
          color: #2993f8;
        }
      }
      .iconfontspan{
        margin-right:25px;
      }
      // &:hover {
      //  >span {
      //    color: #2993f8;
      //  }
      // }
      i {
        display: inline-block;
        vertical-align: top;
      }
      .icon-qiehuan {
        font-size: 13px;
        margin-left: 5px;
        color: #2993f8;
      }
    }
    .side-nav {
      height: inherit;
      line-height: 50px;
      float: left;
      font-size: 16px;
      >i {
        margin-right: 7px;
      }
    }
    .sort-wrap {
      float: left;
      height: 50px;
      width: auto;
      margin-left: 20px;
      label {
        height: 50px;
        width: 30px;
        font-size: 12px;
        color: #2993f8;
        font-weight: bold;
        float: left;
        line-height: 50px;
        margin-right: 10px;
      }
      &>div {
        //float: left;
        margin-top: 11px;
        display: inline-block;
        padding: 6px;
        font-size: 12px;
        color: #585858;
        background: #f5f5f5;
        border-radius: 4px;
        margin-right: 10px;
        position: relative;
        &>i {
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 10px;
          width: 10px;
          height: 10px;
          cursor: pointer;
          display: none;
          color: #2993f8;
        }
      }
      &>div:hover {
        background: #e0ecf8;
        color: #2993f8;
        &>i {
          display: block;
        }
      }
    }
  }
  
  .rp_dataGridTemp {
    height: 100%;
    padding-top: 40px;
  }
  
  //打印
  .elem-btn {
    position: fixed;
    height: 60px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    width: 1250px;
    background-color: #fff;
    left: 50%;
    bottom: 30px;
    z-index: 20;
    text-align: center;
    border-radius: 10px;
    margin-left: -591px;
    padding-top: 13px;
    transition: margin-left .4s;
  }
</style>
<template>
<!-- 单据修改首页 -->
<transition name="tp-ani">
<div class="app-wd container">
   <header>
       <router-link to="/work/amend" class="link">返回上一级</router-link>
       <aside>
           <i class="iconfont icon-ruku"></i>
           <router-link to="/work/amend">修改</router-link> &gt; <span class="txt">单据详情</span>
       </aside>
   </header>
   <!--状态栏-->
   <div class="actions-status" :class="{'animat-scroll':curStatus.slipPointer}">
     <status-display
       :orderData="orderData"
       ref="actionsStatus"
       :curStatus="curStatus">
     </status-display>
   </div>
   <!--商品列表-->
   <div class="commodity-container" 
     v-loading="loadCommodity"
     element-loading-text="数据加载中..."
     :class="{'animat-scroll':curStatus.slipPointer}">
       <div class="handle">
           <span class="list-icon"><i class="iconfont icon-liebiao"></i>商品列表</span>
           <div class="item" :t="isShow ? '1' : '2'">
               <!-- <span v-if="isShow && curStatus.nowStatus == 1" class="add" @click="add" >添加商品</span> -->
               <!-- 只有明细才显示 -->
               <input v-model="seekBarcode" v-if="isShow && curStatus.nowStatus == 1 && dataGridOptions.type == 1" class="seek" type="text" placeholder="请输入条码号" @keyup.enter="addClick"/>

     <!--            <combination-drop-down-colums
                  v-show="dataGridOptions.type != 1"
                  class="storage-combination-drop-down-colums-wrap"
                  @dataBack="combinationHeaderComplate"
                ></combination-drop-down-colums>

                <filter-header
                  class="storage-filter-header-wrap"
                  @complate="filterHeaderComplate"
                  @reportSwitch="reportSwitch"
                  @choseBuyBack="choseBuyBack"
                  @chosePosition="chosePosition"
                  :type="dataGridOptions.type"
                  :customList="customList"
                ></filter-header> -->

                <!-- 只有明细才显示 -->
                <template v-if="dataGridOptions.type == 1">
                  <span v-if="isShow && curStatus.nowStatus == 1" @click="onBatchamend">批量修改</span>
                  <span v-if="isShow && curStatus.nowStatus == 1" @click="onBatchAdd">批量添加</span>
                </template>
           </div>
       </div>
       
       <!--表格-->
       <datagrid
          v-show="dataGridOptions.type == 1"
         	:orderData="orderData"
          :dataGridOptions="dataGridOptions"
          :seekFlag="seekFlag"
          :seekBarcode="seekBarcode"
          :slipPointer = "curStatus.slipPointer"
          :goodsAdd = "goodsAdd"
          ref="datagrid"
          @updataApi="updataApi"
          @updataData="updataData"
          @updataAdd = "updataAdd"
          @updataCopyOrderObject = "updataCopyOrderObject"
          @updataLoader = "updataLoader"
          @updataSlipPointer = "updataSlipPointer"
          @setSynopsiData="updataSynopsiData">
       </datagrid>

        <div v-if="dataGridOptions.type != 1" class="rp_dataGridTemp" v-loading="loadCommodity" element-loading-text="数据查询中">
          <report-detail
            ref="ReportDetail"
            :isProductStyle="true"
            :dataGridStorage="dataGridStorage"
            :tabSwitch="tabSwitch"
            :newList="newList"
            :type = "'edit'"
            :reportType="getReportType()"
            :dataGridOptions="dataGridOptions"
            :orderType="'10'"
          >
          </report-detail>
        </div>

       <!--滚动条上滑时出现的那个订单号-->
       <div class="tab-orderNum" @click="updataSlipPointer(false)">
         <span v-text="orderData.orderNum" class="txt"></span>
         <i class="iconfont icon-xiajiang"></i>
         <div class="mg">
           <span class="mask left"></span>
           <span class="mask right"></span>
         </div>
       </div>
   </div>
   
   <!--步骤条-->
   <steps-path 
       :orderNum="orderData.orderNum" 
       ref="stepsPath"
       @setStatus="getStatus">
   </steps-path>
   
   <!--各个按钮操作区-->
    <utilsdatagrid 
        ref="utilsdatagrid"
        :curStatus="curStatus"
        :dataGridOptions="dataGridOptions"
        :orderData="orderData"
        :dataList="dgDataList"
        @updataApi="updataApi"
        @tabPrint="tabPrint"
      >
    </utilsdatagrid>
  
   <!--批量修改-->
   <batchamend 
     :dataList="dgDataList"
     @updataApi="updataApi"
     :orderNum="orderData.orderNum" 
     :isbatchamendShow = "isbatchamendShow"
     @updataBatchamend="updataBatchamend">
   </batchamend>
   
   <!-- 批量添加 -->
    <BatchAddReceipts
        v-if="popup1.batchAddReceiptsPopup"
        :isPopup="popup1.batchAddReceiptsPopup"
        :supplierListData="supplierListData1"
        v-on:addReceiptsState="delectReceiptsState"
    >    
    </BatchAddReceipts>
    
    
      <!--打印模块-->
      <div style="display: none;">

        <intelligence-type-template v-if="dataGridOptions.type==2" :title="'修改-智能分类'" ref="intelligenceTypeTemplate" :sellList="dataGridStorage" :headerData="orderData"></intelligence-type-template>

        <project-type-template v-if="dataGridOptions.type==3" :title="'修改-产品分类'" ref="projectTypeTemplate" :sellList="dataGridStorage" :headerData="orderData"></project-type-template>

        <custom-template v-if="dataGridOptions.type==4" :title="'修改-自定义'" ref="customTemplate" :sellList="dataGridStorage" :headerData="orderData"></custom-template>

      </div> 
</div>
</transition>
</template>

<script>
import statusDisplay from './component/statusDisplay'
import stepsPath from './component/stepsPath'
import datagrid from './dataGrid'
import utilsdatagrid from './component/utilsDatagrid'
import {operateAddProductToRKOrder} from 'Api/commonality/operate'
import {downloadTable, seekReceiptRKSynopsis, seekGetReportsPrintXG} from 'Api/commonality/seek'
import batchamend from 'components/work/batchamend'
import BatchAddReceipts from '../../../components/work/BatchAddReceipts'
import filterHeader from '@/layouts/Work/Report/ReportData/base/filter-header'
import combinationDropDownColums from 'base/menu/combination-drop-down-colums'
import ReportDetail from "@/layouts/Work/Report/ReportData/newDataGrid/reportDetailTab";
import projectTypeTemplate from "@/components/jcp-print/update/project-type-template";
import intelligenceTypeTemplate from "@/components/jcp-print/update/intelligence-type-template";
import customTemplate from "@/components/jcp-print/update/intelligence-type-template";
export default {
  data(){
    return {
      dataGridStorage: {},
      newList: [],
      //成本核算
      tabSwitch: false,
      dataGridOptions: {
        orderNum: this.$route.query.orderNumber,
        productClass: "1", //商品属性
        type: 1, //类型
        wColorId: "", //计重
        wGemId: "", //宝石类
        wJewelryId: "1", //首饰类
        nColorId: "", //计件
        nGemId: "", //宝石类
        nJewelryId: "1" //首饰类
      },
      customList: [
        {
            name: '明细',
            id: 1
        },
        {
            name: '智能分类',
            id: 2
        },
        {
            name: '产品分类',
            id: 3
        }
      ],


      seekFlag: false,
      seekBarcode: '',
      // 头部状态栏
      curStatus : {
        statusName: 'loading...',
        statuscurClass: 'stayAudit',
        status : -1,
        //鼠标上、下滑操作
        slipPointer: false ,
        nowStatus : '-1'
      },
      
      // loading开关
      loadCommodity: true,
      
      // 订单数据
      orderData : Object.assign({},{
        orderNum : this.$route.query.orderNumber,
        shopName:'loading...',
        // 增加审核状态
        checkType:'-1'
      }),
      
      // 新增商品开关
      goodsAdd: {
        type : false,
        index : -1
      },
      
      // 入库下载模板url
      storageDownloadUrl : '',
      
      dgDataList : [],
      
      isShowPopup : false,
      //功能操作区 权限
      isShow: true,
      
      // 批量修改
      isbatchamendShow: false, //显示弹框
      
      // 批量添加
      isbatchAddShow : false,
      supplierListData1: [
          {
              name: "全部",
              type: ""
          },
          {
              name: "入库单",
              type: "01"
          },
          {
              name: "修改单",
              type: "10"
          },
          {
              name: "退货单",
              type: "04"
          },
          {
              name: "调库单",
              type: "07"
          }
      ],
      popup1: {
        fullscreenLoading: false, // 保存过程的过场动画
        successData: null, // 制单成功数据
        deleteReceipts: false, // 删除单据弹窗
        batchAddReceiptsPopup: false,
        auditPopup: false // 审核弹窗
      }
    }
  },
  components: {
    statusDisplay,
    stepsPath,
    datagrid,
    utilsdatagrid,
    batchamend,
    BatchAddReceipts,
    filterHeader,
    combinationDropDownColums,
    ReportDetail,
    projectTypeTemplate,
    intelligenceTypeTemplate,
    customTemplate
  },
  
  watch: {
    'orderData.makeOrderMan': function(){
      // this.isShow = this.delectOptionRole()
      this.isShow = this.orderData.makeOrderMan
    },
    'curStatus.status'(val){
      this.orderData.status = val
    }
  },
  created () {
    this.receiptRKSynopsis()
  },
  methods: {
    //获取当前的接口类型
    getReportType() {
      return this.dataGridOptions.type;
    },
    filterHeaderComplate (parm) {
      Object.assign(this.dataGridOptions, parm)
      if (this.dataGridOptions.type != 1) {
        this._seekGetReportsPrintXG()
      }
    },
    combinationHeaderComplate (parm) {
      let datas = {}
      datas.productClassIdList = this.filterSeekData(parm.productTypeList, 'productClassId', 'productTypeId')
      datas.colourNameIdList = this.filterSeekData(parm.colourList, 'colourNameId', 'colourId')
      datas.gemNameIdList = this.filterSeekData(parm.jeweList, 'gemNameId', 'jeweId')
      datas.jewelNameIdList = this.filterSeekData(parm.jewelryList, 'jewelNameId', 'jewelryId')
      Object.assign(this.dataGridOptions, datas)
      if (this.dataGridOptions.type != 1) {
        this._seekGetReportsPrintXG()
      }
    },
    filterSeekData (parm, keyName, bKey) {
      let datas = []
      for (let i of parm) {
        datas.push({
          [keyName]: i[bKey]
        })
      }
      return datas
    },
    _seekGetReportsPrintXG () {
      seekGetReportsPrintXG(this.dataGridOptions)
        .then(res => {
          if (res.data.state == 200) {
            this.dataGridStorage = res.data.data
          } else {
            this.$message({
               message: res.data.msg,
               type: 'warning'
            })
          }
        })
    },

    reportSwitch () {

    },
    choseBuyBack () {

    },
    chosePosition () {

    },

  	tabPrint(){
        let type = this.dataGridOptions.type
        if (type == 1) {
          this.$refs.datagrid.tabPrint();
        } else if (type == 2) {
            this.$refs.intelligenceTypeTemplate.print();
            return
        } else if (type == 3) {
            this.$refs.projectTypeTemplate.print();
            return
        } else if (type == 4){
            this.$refs.customTemplate.print();
            return
        }
  	},
    addClick() {
      if (this.seekFlag == true) {
        this.seekFlag = false
      }
      this.seekFlag = true
      // console.log(111)
    },
    receiptRKSynopsis () {
      let options = {
        orderNum: this.orderData.orderNum
      }
      seekReceiptRKSynopsis(options).then((res) => {
        console.log(res)
        if (res.data.state == 200) {
          Object.assign(this.orderData, {
            makeOrderMan: res.data.data.makeOrderManId == sessionStorage.getItem('id') ? true : false,
            // 新增公司名称
						companyName: res.data.data.companyName,
						// 新增审核人
						checkName: res.data.data.checkName,
          })
          console.log(this.orderData)
        }
      }, (res) => {

      })
    },
    updataData (parm) {
      this.$set(this, parm.key, parm.data)
    },
    
    //获取当前状态值
    getStatus (status){
      if (status){
       for(let k in status) Object.assign(this.curStatus, {[k]: status[k]})
      }
    },
    
    // 更新单据简介数据
    updataSynopsiData (data){
      this.orderData = Object.assign({}, this.orderData, data)
      console.log(this.orderData)
    },
    
    // 滚动条滑动 两种状态  上滑 下滑
    updataSlipPointer (type){
      this.$set(this.curStatus, 'slipPointer', type)
    },
  
    
    // 更新选中数据 以便进行复制
    updataCopyOrderObject (data) {
      if(data){
       this.copyOrderObject = Object.assign({}, data)
      }
    },
    // loading
    updataLoader (type) {
      this.loadCommodity = !!type
    },
    
    // 是否开启新增商品功能
    updataAdd (type) {
      this.goodsAdd = Object.assign({}, this.goodsAdd, { type : type})
      console.log(type)
    },
    
    // 操作功能区权限
    delectOptionRole () {
      // return this.orderData.isRole === 'Y' && this.orderData.checkType === '1'
      return this.orderData.makeOrderMan
    },

    // 更新单据页面API接口出数据
    updataApi (){
      this.seekFlag = false
      this.seekBarcode = ''
      // 商品列表
      this.$refs.datagrid.fetchGoodList()
      
      // 页脚 商品简介数据 及订单状态数据
      this.$refs.datagrid.$refs.footer.fetchFootData()

      //步骤条
      this.$refs.stepsPath.fetchPathData()
      
      //备注
      this.$refs.actionsStatus.$refs.remark.fetchRemark()
      
      this.updataAdd(false)
    },
    
    // 新增商品
    add () {
      
      if(!this.goodsAdd.type){
        this.updataAdd(true)
      }
    },
    
    updataBatchamend (type){
      this.isbatchamendShow = type
    },
    // 批量修改
    onBatchamend (){
      this.updataBatchamend(true)
    },
    
    updataBatchAdd (type){
      this.popup1.batchAddReceiptsPopup = type
    },
    
    // 批量添加
    onBatchAdd (){
      this.updataBatchAdd(true)
    },
    // 批量添加
    delectReceiptsState (parm) {
        this.popup1.deleteReceipts = parm.name;
        this.popup1.auditPopup = parm.name;
        this.popup1.batchAddReceiptsPopup = parm.name;
        this.updataApi()
    }
  },
  
  mounted(){
    this.$nextTick(() => {
    })
  }
}
</script>

<style lang="scss" scoped>
/* 公用宽度 */
.app-wd{ width: 1250px; margin: 0 auto;}

/*  */
.container{
  position: relative;
  /* 头部 */
  >header{
    margin-top: 30px;
    height: 40px;
    line-height: 40px;
    color: #333;
    
    /* */
    >aside{
      width:250px;
      >.txt {
        color: #2993f8;
        margin-left: 5px;
        font-weight: bold;
      }
      >i{
        color: #2993f8;
        font-size: 18px;
        margin-right: 5px;
      }
      >a{
        font-weight: bold;  
        &:hover{
          color: #2993f8; 
        }
      }
    }
    
    .link{
      float: right;
      width: 90px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      border-radius: 5px;
      transition: all .3s;
      margin-top: 5px;
      background-color: #2993f8;
      &:hover{
        background-color:#057aea;
      }
    }
  }
}

.commodity-container{
  margin-top: 30px;
  border-radius: 10px;
  position: relative;
  transition: all .5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
  box-shadow: 0 0 15px #ddd;
  
  >.handle{
    height: 50px;
    background-color: #fff;
    // line-height: 50px;  
    padding: 0 20px;
    position: relative;
    border-radius: 10px 10px 0 0;
    
    >.list-icon{
      line-height: 50px;
      .iconfont{
        color:#2993f8;
        margin-right: 5px;
      }
    }
    
    >.item{
      float: right;
      margin-top: 10px;
      user-select: none;
      height: 30px;
      .seek {
          // width: 198px;
          float: left;
          width: 150px;
          height: 26px;
          margin-top: 3px;
          // border-radius: 20px;
          border-radius: 4px;
          text-align: center;
          border: 1px solid #eeeeee;
      }
      .seek:hover {  
          background-color: #f4f9ff;
          border: 1px solid #2993f8;
      }
      >.storage-filter-header-wrap{
        margin-top: 2px;
        margin-right: 0;
      }
      >.storage-combination-drop-down-colums-wrap{
        margin-top: 2px;
        margin-right: 0;
      }
      >span, >a{
        line-height: 50px;  
        display:inline-block;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        text-align: center;
        width: 75px;
        height: 28px;
        line-height: 28px;
        border-radius: 5px;
        transition: all .3s;
        white-space: nowrap;
        overflow: hidden;
        &:hover{
         color:#2993f8; 
        }
        &.add{
          background-color: #2993f8;
          color: #fff;
          &:hover{
           background-color:#057aea;
          }
          &.gray{
            //background-color: #ddd!important;
          }
        }
        &.gray{
          color: #999;
          cursor: default;
        }
      }
    }
  }
  
  /* 上滑出现的那点订单号 */
  >.tab-orderNum{
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 280px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    color: #ffba42;
    overflow: hidden;
    z-index: 1;
    transition: all 0.5s cubic-bezier(0.51, -0.04, 0.4, 0.4) ;
    visibility: hidden;
    transform: translate(-140px, 0);
    opacity: 0;
    >.txt{
     font-weight: bold;
     position: relative;
     z-index: 3;
     &:after,&:before{
        content: '';
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        top:-14px;
      }
     &:after{
        left: -40px;
      }
      
      &:before{
        left: 162px;
      }
    }
    
    >.iconfont{
      position: relative;
      z-index: 3;
    }
    
    >.mg{
      height: 36px;
      width: 100%;
      overflow: hidden;
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      .mask{
        box-sizing: content-box;
        display: block;
        //box-shadow: 0 0 15px #F3F3F6 inset;
        width: 74px;
        height: 74px;
        border-radius: 50%;
        border:50px solid #fff;
        position: absolute;
        left: -89px;
        top:-78px;
        z-index: 2;
        &.left{
         left: -95px;
         top:-87px;
        }
        &.right{
         left: 201px;
         top:-87px;
        }
        
      }
    }
    &:after{
      content: '';
      display: block;
      position: absolute;
      z-index: 1;
      background-color: #fff;
      width: 210px;
      height: 46px;
      left: 35px;
      top: 0;
    }
  }
  
  &.animat-scroll{
    >.tab-orderNum{
      cursor: pointer;
      transform: translate(-140px, -45px);
      visibility: visible;
      opacity: 1;
    }
  }
}


.actions-status{
  transition: all .5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
  opacity: 1;
  visibility: visible;
  position: relative;
  z-index: 99;
  height: 120px;
  &.animat-scroll{
    transform: translateY(-200px);
    opacity: 0;
    visibility: hidden;
    height: 0;
  }
}

.seek,input::-webkit-input-placeholder{
        font-size:10px;
    }
.seek,input:-moz-placeholder{
        font-size:10px;
    }
.seek,input:-ms-input-placeholder{
        font-size:10px;
    }
</style>

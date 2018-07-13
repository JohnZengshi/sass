<template>
	<!-- 单据详情首页 -->
	<transition name="tp-ani">
		<div class="app-wd container">
			<header>
				<router-link to="/work/storage" class="link">返回上一级</router-link>
				<aside>
					<i class="iconfont icon-ruku"></i>
					<router-link to="/work/storage">入库</router-link> &gt; <span class="txt">单据详情</span>
				</aside>
			</header>

			<!--状态栏-->
			<div class="actions-status" :class="{'animat-scroll':curStatus.slipPointer}">
				<status-display :orderData="orderData" ref="actionsStatus" :curStatus="curStatus">
				</status-display>
			</div>
			<!--商品列表-->
			<div class="commodity-container" v-loading="loadCommodity" element-loading-text="数据加载中..." :class="{'animat-scroll':curStatus.slipPointer}">
				<div class="handle">
					<span class="list-icon"><i class="iconfont icon-liebiao"></i>商品列表</span>

					<div class="item">

            <combination-drop-down-colums
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
            ></filter-header>
            
            <!-- 只有明细才显示 -->
						<template v-if="dataGridOptions.type == 1">
              <span v-if="isShow && curStatus.nowStatus == 1" class="add" @click="add" ref="ref_addGoods">添加商品</span>
              <span v-if="isShow && curStatus.nowStatus == 1" @click="onBatchamend">批量修改</span>
              <span v-if="isShow && curStatus.nowStatus == 1" class="copy" @click="copyPopupShow(true)">复制</span>
              <span v-if="isShow && curStatus.nowStatus == 1" class="import" @click="$refs.uploadfile.click()">导入表格</span>
              <!--<span class="deleteAll">批量删除</span>
                <span class="amend">批量修改</span>-->
              <span class="ruleConfig" @click="ruleOptionDia = true">规则配置</span>
              <a target="_blank" :href="storageDownloadUrl" class="download">下载模板</a>
              <template v-if="isShow">
                <span class="save" @click="seve" :class="rowDataList.length == 0 ? 'gray': ''">保存</span>
              </template>
            </template>
						<input style="display: none;" ref="uploadfile" type="file" name="file" @change="uploadingOne($event)" />
					</div>


				</div>

				<!--表格-->
				<datagrid
          v-show="dataGridOptions.type == 1"
  				:dgDataList="dgDataList" 
  				:isShow="isShow" 
  				:curStatus="curStatus" 
  				:orderNum="orderData.orderNum" 
  				:slipPointer="curStatus.slipPointer" 
  				:goodsAdd="goodsAdd" ref="datagrid" 
  				:copyDataList="copyOrderArray" 
  				:isRefreshFooter="isRefreshFooter"
          :dataGridOptions="dataGridOptions"
  				@add="add" 
  				@updataApi="updataApi"
  				@updataData="updataData" 
  				@updataAdd="updataAdd" 
  				@updataCopyOrderObject="updataCopyOrderObject" 
  				@updataLoader="updataLoader" 
  				@updataAddDataList="updataAddDataList" 
  				@updataSlipPointer="updataSlipPointer" 
  				@setSynopsiData="updataSynopsiData"
				>
				</datagrid>

        <div v-if="dataGridOptions.type != 1" class="rp_dataGridTemp" v-loading="loadCommodity" element-loading-text="数据查询中">
          <report-detail
            ref="ReportDetail"
            :isProductStyle="true"
            :dataGridStorage="dataGridStorage"
            :tabSwitch="tabSwitch"
            :newList="newList"
            :reportType="getReportType()"
            :dataGridOptions="dataGridOptions"
            :orderType="'01'"
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
			:ifImport="orderData.ifImport" 
			ref="stepsPath" 
			@setStatus="getStatus"
			>
			</steps-path>

			<!--各个按钮操作区-->
			<utilsdatagrid
			ref="utilsdatagrid"
      :dataGridOptions="dataGridOptions"
			:curStatus="curStatus" 
			@updataApi="updataApi" 
			:orderData="orderData" 
			:dataList="dgDataList" 
			@goPage="goPage" 
			>
			</utilsdatagrid>

			<!-- 弹出框 -->
			<copyPopup 
			@submit="submitCopy" 
			:isCopy="isShowPopup" 
			@popupShow="copyPopupShow" 
			title="请输入你要复制的行数" 
			:isShowPopup="isShowPopup"
			>
			</copyPopup>

			<!--批量修改-->
			<batchamend :dataList="dgDataList" @updataApi="updataApi" :orderNum="orderData.orderNum" :isbatchamendShow="isbatchamendShow" @updataBatchamend="updataBatchamend">
			</batchamend>
			<el-dialog class="dialog-w320-h220-hn affirm-delect-main1" title="" v-model="errorLocal">
				<div class="logo">
					<!-- <img src="./../../../static/img/piliang.png"> -->
				</div>
				<ul class="body-wrap">
					<li>导入文件有误，请
						<a :href="errorCode" dowmload="download" style="color:#2993f8; cursor: pointer;">下载</a>文件查看</li>
				</ul>
				<span slot="footer">
          <a href="javascript: void(0)" class="confirm-btn-w120 mr0" @click.stop="errorLocal = false">确 定</a>
      </span>
			</el-dialog>
			<!--规则配置-->
			<el-dialog top="40px" :show-close="true" :visible.sync="ruleOptionDia" customClass="ruleOption">
				<div class="rule-title"><i class="iconfont icon-liebiao"></i>规则配置</div>
				<div class="tab-list">
					<ul>
						<li @click="tabAction(item.panel, index)" v-for="(item, index) in tabList" :key="index" :class="{active: actIndex == index}">
							<div>{{item.text}}</div>
						</li>
					</ul>
				</div>
				<div class="page-wrap">
					<component :is="panel"></component>
				</div>
				<div class="page-footer">
					<div class="footer-title">
						<span class="iconfont icon-qc-required"></span>总体约束
					</div>
					<p>1. 每一行之间不能出现空行</p>
					<p>2. 导入的数据文件必须≤10MB</p>
					<p>3. 系统不支持的表头，将不能导入成功</p>
					<p>4. 无数据的空列，可以不用输入</p>
					<p>5. 每一行之间，可以进行调换位置</p>
				</div>
			</el-dialog>

		</div>
	</transition>
</template>

<script>
import statusDisplay from './component/statusDisplay'
import stepsPath from './component/stepsPath'
import datagrid from './dataGrid'
import utilsdatagrid from './component/utilsDatagrid'
import {operateAddProductToRKOrder} from 'Api/commonality/operate'
import {downloadTable, seekReceiptRKSynopsis, seekGetReportsPrintRK} from 'Api/commonality/seek'
import copyPopup from './component/orderPopup'
import batchamend from 'components/work/batchamend'
import filterHeader from '@/layouts/Work/Report/ReportData/base/filter-header'
import combinationDropDownColums from 'base/menu/combination-drop-down-colums'
import ReportDetail from "@/layouts/Work/Report/ReportData/newDataGrid/reportDetailTab";
//规则配置相关组件 
import NewPopup from "./../../jinbaifu/NewPopup"
import BasePage from "./../../jinbaifu/components/base"
import Certificate from "./../../jinbaifu/components/certificate"
import DeputyPage from "./../../jinbaifu/components/deputy"
import Fee from "./../../jinbaifu/components/fee"
import MainPage from "./../../jinbaifu/components/main"
import Part from "./../../jinbaifu/components/part"
import Price from "./../../jinbaifu/components/price"
import Product from "./../../jinbaifu/components/product"
import Weight from "./../../jinbaifu/components/weight"
import Other from "./../../jinbaifu/components/other"

export default {
  data(){
    return {
      dataGridStorage: {},
      //成本核算
      tabSwitch: false,
      newList: [],


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
      errorCode: '',
      errorLocal: false,
      isRefreshFooter: false,
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
        shopName:'loading...'
      }),
      
      // 新增商品
      rowDataList : [],
      
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
      // 复制选中的数据
      copyOrderObject: {},
      copyOrderArray: [],
      
      // 规则配置
      ruleOptionDia : false,
      actIndex: 0,
      panel: BasePage,
      tabList: [
        {text :'基本信息', panel: BasePage },
        {text :'产品类型', panel: Product },
        {text :'重量', panel: Weight },
        {text :'证书', panel: Certificate },
        {text :'主石', panel: MainPage },
        {text :'副石', panel: DeputyPage },
        {text :'工费', panel: Fee },
        {text :'配件', panel: Part },
        {text :'其他费用', panel: Other },
        {text :'标价', panel: Price }
      ],
       
      // 批量修改
			isbatchamendShow: false, //显示弹框
    }
  },
  components: {
    statusDisplay,
    stepsPath,
    datagrid,
    utilsdatagrid,
    copyPopup,
    batchamend,
    filterHeader,
    ReportDetail,
    combinationDropDownColums
	},
	watch: {
    
    dgDataList: function(){
    },
    orderData: function(){
      this.isShow = this.delectOptionRole()
    },
		// $route(to, from) {
		// 		debugger  
		// 	 this.receiptRKSynopsis()
    // }
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
        this._seekGetReportsPrintRK()
      }
    },
    combinationHeaderComplate (parm) {
      debugger
      let datas = {}
      datas.productClassIdList = this.filterSeekData(parm.productTypeList, 'productClassId', 'productTypeId')
      datas.colourNameIdList = this.filterSeekData(parm.colourList, 'colourNameId', 'colourId')
      datas.gemNameIdList = this.filterSeekData(parm.jeweList, 'gemNameId', 'jeweId')
      datas.jewelNameIdList = this.filterSeekData(parm.jewelryList, 'jewelNameId', 'jewelryId')
      Object.assign(this.dataGridOptions, datas)
      if (this.dataGridOptions.type == 1) {
        this.$refs.datagrid.fetchGoodList()
      } else {
        this._seekGetReportsPrintRK()
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
    _seekGetReportsPrintRK () {
      seekGetReportsPrintRK(this.dataGridOptions)
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


    receiptRKSynopsis () {
      let options = {
        orderNum: this.orderData.orderNum
      }
      seekReceiptRKSynopsis(options).then((res) => {
        if (res.data.state == 200) {
          Object.assign(this.orderData, {
						// 新增公司名称
						companyName: res.data.data.companyName,
						// 新增审核人
						checkName: res.data.data.checkName,
            supplierName: res.data.data.supplierName,
            supplierId: res.data.data.supplierId,
            shopName: res.data.data.shopName,
            shopId: res.data.data.shopId,
            storageName: res.data.data.storageName,
            storageId: res.data.data.storageId,
            makeOrderMan: res.data.data.makeOrderManId == sessionStorage.getItem('id') ? true : false
          })
        }
      }, (res) => {

      })
    },
    //规则配置
    tabAction (panel,index) {
      this.actIndex = index 
      this.panel = panel
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
    },
    
    // 滚动条滑动 两种状态  上滑 下滑
    updataSlipPointer (type){
      this.$set(this.curStatus, 'slipPointer', type)
    },
    
    // 更新新增的商品数据
    updataAddDataList(data) {
      if(data){
       this.rowDataList = data
      }
    },
    // 更新选中数据 以便进行复制
    updataCopyOrderObject(data){
      if(data){
      	this.copyOrderObject = Object.assign({}, data)
      }
    },
    // loading
    updataLoader (type) {
      this.loadCommodity = !!type
    },
    
    // 是否开启新增商品功能
    updataAdd(type) {
      this.goodsAdd = Object.assign({}, this.goodsAdd, type);
    },
    
    // 导入表格
    uploadingOne (e){
      this.updataLoader(true)
      var files = e.currentTarget.files[0];
      var fileData = new FormData(); // 创建表单数据对象(本地上传服务器文件对象)
      fileData.append("excelFile", files); // 将文件对象append进去
      let data = {
          "data": {
              "orderNum": this.orderData.orderNum
          },
          "unit": {
              "companyId": sessionStorage.getItem("companyId"),
              "channel": 3,
              "OS": "web",
              "ip": "string",
              "userId": sessionStorage.getItem("id"),
              "tokenId": sessionStorage.getItem("tokenId")
          }
      }
      fileData.append("data", JSON.stringify(data)); // 用户id
      // 第一页获得的数据
      var url = INTERFACE_URL_9097 + "/b1/rukuUpload"
      this.$http.post(url, fileData).then((res) => {
          this.updataLoader(false)
          this.$refs.uploadfile.value = null;
          if (res.data.state == 200) {
            if (res.data.data.message == '导入成功') {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
              this.isRefreshFooter = !this.isRefreshFooter
              this.updataApi()
               // 初始化新增商品的一些条件 避免在新增时又同时操作导入功能 导致新增失败的问题
              this.updataAdd({
                type : false,
                index: -1
              })
              this.rowDataList = []
              
              // 初始化 复制数据
              this.emptyCopy()
            } else if (res.data.data.flag == 1) {
              this.errorLocal = true
              this.errorCode = res.data.data.url
            } else {
              this.$message({
                message: res.data.data.message,
                type: 'error'
              })
            }
             
          } else {
            this.$message({
              message: '导入失败',
              type: 'error'
            })
          }
      }, (res) => {
        this.$store.dispatch('workPopupError', res.data.msg)
      })
    },
    
    // 操作功能区权限
    delectOptionRole () {
      // return this.orderData.isRole === 'Y' && this.orderData.checkType === '1'
      return this.orderData.makeOrderMan
    },
    
    // 复制操作成功之后 初始化复制相关属性
    emptyCopy(){
      this.updataApi()
      this.$refs.datagrid.$refs.dgridfixed.activeSelectOn = -1
      this.copyOrderArray = []
      this.copyOrderObject = {}
    },
    
    // 复制
    submitCopy(num){
      if (!/^(\d)*$/.test(num)) {
        this.$message({
          type:'warning',
          message :'请输入数字'
        })
      } else if( num.replace(/^\s+|\s+$/,'').length == 0) {
        this.$message({
          type:'warning',
          message :'不能为空'
        })
      } else {
        this.copyPopupShow(false)
        // 复制操作
        if (!this.isShowPopup){
          //复制以保存的
          if(this.copyOrderObject.barcode){
	          //this.copyOrderArray
	          for (let i = 0; i < Number(num); i++){
	            let copyObj = Object.assign({}, this.copyOrderObject, { barcode:''})
	            this.copyOrderArray.push(copyObj)
	          }
	          
	          operateAddProductToRKOrder({
	            orderNum: this.orderData.orderNum,
	            rowDataList: this.copyOrderArray
	          }).then((res) => {
	            this.emptyCopy()
	          })
          }else{
          	//复制未保存的
          	for(let i = 0; i < Number(num); i++){
	            let copyObj = Object.assign({}, this.copyOrderObject, { barcode:''})
	            console.log(this.copyOrderObject)
	            console.log(copyObj)
	            this.$refs.datagrid.addDataObj(copyObj);
	          }
          }
        }
      }
    },
    
    copyPopupShow (type) {
      if(this.copyOrderObject.barcode == undefined) {
        this.isShowPopup = false
        this.$message({
          type:'warning',
          message :'请选中需要复制的商品'
        })
      } else {
      		this.isShowPopup = type
      }
    },
    // 更新单据页面API接口出数据
    updataApi(){
      this.dgDataList = []
      this.isRefreshFooter = !this.isRefreshFooter
      // 商品列表
      this.$refs.datagrid.refresh()
      
      // 页脚 商品简介数据 及订单状态数据
      this.$refs.datagrid.$refs.footer.fetchFootData()
      
      //头部状态栏
      this.$refs.actionsStatus.fetchData()
      
      //步骤条
      this.$refs.stepsPath.fetchPathData()
      
      //备注
      this.$refs.actionsStatus.$refs.remark.fetchRemark()
      
      this.rowDataList = []
      this.updataAdd({ type:false, index:-1})
    },
    
    // 新增商品
    add(type) {
      this.updataAdd({
        type : true,
        index: this.goodsAdd.index + 1
      })
    },
    
    // 保存新增商品
    seve(){
      // 保存之前需要对必填项进行提示
      if (this.rowDataList.length > 0) {
        this.rowDataList.forEach((item) => {
          if (item['jewelryName'] == ''){
            this.$message({
              type:'warning',
              message :'首饰类别未填，不可保存'
            })
          }
          // 成色名称 宝石名称
          if (item['gemName'] == '' && item['metalColor'] == ''){
            if (item['metalColor'] == '' && item['gemName'] == '') {
              this.$message({
                type:'warning',
                message :'成色名称或宝石名称未填，不可保存'
              })
            }
            else if(item['metalColor'] == ''){
              this.$message({
                type:'warning',
                message :'成色名称未填，不可保存'
              })
            } else{
              this.$message({
                type:'warning',
                message :'宝石名称未填，不可保存'
              })
            }
          }
          
          if (item['productClasses'] == ''){
            this.$message({
              type:'warning',
              message :'产品类别未填，不可保存'
            })
          }
          
        })
      }
      
      // 校验完成后，把数据post到后台
      if(this.rowDataList.length > 0 && !this.checkDatalist()){
          operateAddProductToRKOrder({
            //productTypeId : '',
            orderNum: this.orderData.orderNum,
            rowDataList: this.rowDataList
          }).then((res) => {
            if(res.data.state == 99 || res.data.state == 50020){
              this.$message({
                type:'error',
                message : '添加商品失败'
              })
            }else{
//            this.isRefreshFooter = !this.isRefreshFooter
              this.$message({
                type:'success',
                message :'添加商品成功'
              })
              this.rowDataList = []
              if(this.$refs.datagrid){
                // 清空子组件里面新增的商品列表 
                this.$refs.datagrid.addDatalist = []
                this.updataApi()
              }
            }
          })
      }
    },
    
    // 检测新增商品 必填属性是否填写完整
    checkDatalist (){
      if (this.rowDataList.length > 0 ) {
        // 后期需要把产品类别、产品分类加入必填项
        return this.rowDataList.filter(item => {
          if (item['productClasses'] == '' || (item['gemName'] == '' && item['metalColor'] == '') || item['jewelryName'] == ''){
            return item
          }
        }).length > 0 //大于0 则表示未填写完整
      }
      return true
    },
    
    updataBatchamend (type){
      this.isbatchamendShow = type
    },
    // 批量修改
    onBatchamend (){
      this.updataBatchamend(true)
    },
	  goPage(url){
	  	this.rowDataList = [];
	  	this.$router.push({path: url});
		},
  },
  
  mounted(){
    this.$nextTick(() => {
      // 获取入库下载模板URL链接
      downloadTable({
        infoType : '1',
        type : '2'
      }).then((res) => {
        this.storageDownloadUrl = res.data.data.url
      })
         
    })
  },
  beforeRouteLeave(to, from, next) {
      
    if(this.rowDataList.length > 0){
      this.$confirm('你有 '+ this.rowDataList.length +' 条商品的数据暂未保存，是否离开？', '提示', {
        confirmButtonText: '离开',
        cancelButtonText: '取消'
      }).then(() => {
        next()
      }, () =>{})
    } else {
      next()
    }
  },
}

</script>

<style lang="scss" scoped>
	/* 公用宽度 */
	
	.app-wd {
		width: 1250px;
		margin: 0 auto;
	}
	
	.affirm-delect-main1 {
		width: 100%;
		height: 100%;
		z-index: 10002!important;
		.logo {
			position: absolute;
			top: 30px;
			left: 0;
			width: 100%;
			img {
				display: block;
				margin: 0 auto;
			}
		}
		.body-wrap {
			padding: 0 30px;
			margin-top: 90px;
			li {
				font-size: 14px;
				line-height: 30px;
				color: #333;
				text-align: center;
			}
		}
	}
	/*  */
	
	.container {
		position: relative;
		/* 头部 */
		>header {
			margin-top: 30px;
			height: 40px;
			line-height: 40px;
			color: #333;
			/* */
			>aside {
				width: 250px;
				>.txt {
					color: #2993f8;
					margin-left: 5px;
					font-weight: bold;
				}
				>i {
					color: #2993f8;
					font-size: 18px;
					margin-right: 5px;
				}
				>a {
					font-weight: bold;
					&:hover {
						color: #2993f8;
					}
				}
			}
			.link {
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
				&:hover {
					background-color: #057aea;
				}
			}
		}
	}
	
	.commodity-container {
		margin-top: 30px;
		border-radius: 10px;
		position: relative;
		transition: all .5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
		box-shadow: 0 0 15px #ddd;
		>.handle {
			height: 50px;
			background-color: #fff;
			// line-height: 50px;
			padding: 0 20px;
      font-size: 0;
			position: relative;
			//z-index: 2;
			border-radius: 10px 10px 0 0;
			>.list-icon {
        line-height: 50px;
        font-size: 15px;
				.iconfont {
					color: #2993f8;
					margin-right: 5px;
				}
			}
			>.item {
				float: right;
				margin-top: 10px;
				user-select: none;
				height: 30px;
				>span,
				>a {
          line-height: 50px;
					display: inline-block;
					font-size: 14px;
					color: #333;
					cursor: pointer;
					text-align: center;
					margin-left: 20px;
					height: 28px;
					line-height: 28px;
					border-radius: 5px;
					transition: all .3s;
					white-space: nowrap;
					overflow: hidden;
					&:hover {
						color: #2993f8;
					}
					&.add {
						padding: 0px 10px;
						background-color: #2993f8;
						color: #fff;
						&:hover {
							background-color: #057aea;
						}
					}
					&.gray {
						color: #999;
						cursor: default;
					}
				}
        >.storage-filter-header-wrap{
          margin-top: 2px;
          margin-right: 0;
        }
        >.storage-combination-drop-down-colums-wrap{
          margin-top: 2px;
          margin-right: 0;
        }
			}
		}
		/* 上滑出现的那点订单号 */
		>.tab-orderNum {
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
			transition: all 0.5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
			visibility: hidden;
			transform: translate(-140px, 0);
			opacity: 0;
			>.txt {
				font-weight: bold;
				position: relative;
				z-index: 3;
				&:after,
				&:before {
					content: '';
					width: 20px;
					height: 20px;
					display: block;
					position: absolute;
					background-color: #fff;
					border-radius: 50%;
					top: -14px;
				}
				&:after {
					left: -40px;
				}
				&:before {
					left: 162px;
				}
			}
			>.iconfont {
				position: relative;
				z-index: 3;
			}
			>.mg {
				height: 36px;
				width: 100%;
				overflow: hidden;
				position: absolute;
				z-index: 2;
				left: 0;
				bottom: 0;
				.mask {
					box-sizing: content-box;
					display: block;
					//box-shadow: 0 0 15px #F3F3F6 inset;
					width: 74px;
					height: 74px;
					border-radius: 50%;
					border: 50px solid #fff;
					position: absolute;
					left: -89px;
					top: -78px;
					z-index: 2;
					&.left {
						left: -95px;
						top: -87px;
					}
					&.right {
						left: 201px;
						top: -87px;
					}
				}
			}
			&:after {
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
		&.animat-scroll {
			>.tab-orderNum {
				cursor: pointer;
				transform: translate(-140px, -45px);
				visibility: visible;
				opacity: 1;
			}
		}
	}
	
	.actions-status {
		transition: all .5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
		opacity: 1;
		visibility: visible;
		position: relative;
		z-index: 99;
		height: 120px;
		&.animat-scroll {
			transform: translateY(-200px);
			opacity: 0;
			visibility: hidden;
			height: 0;
		}
	}
</style>
<style lang="scss">
	.ruleOption {
		width: 1200px;
		height: 860px;
		background: #fff;
		border-radius: 10px;
		.el-dialog__header {
			padding: 0;
			height: 40px;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.el-dialog__headerbtn {
				margin-top: 10px;
				margin-right: 10px;
			}
		}
		.el-dialog__body {
			padding: 0 17px;
			.rule-title {
				height: 50px;
				line-height: 50px;
			}
			.tab-list {
				height: 44px;
				ul {
					height: 33px;
					li {
						width: 83px;
						height: 33px;
						float: left;
						line-height: 33px;
						//padding-left: 12px;
						cursor: pointer;
						font-size: 12px;
						font-weight: bold;
						color: #2993f8;
						background: url(/static/img/tab-default.png) no-repeat left center;
						div {
							width: 70px;
							text-align: center;
						}
					}
					li.active {
						color: #fff;
						background: url(/static/img/tab-select.png) no-repeat left center;
					}
				}
			}
			.page-wrap {
				height: 603px;
				width: 100%;
				overflow-y: auto;
			}
			.page-footer {
				height: 162px;
				border-top: 1px solid #eaeaea;
				.footer-title {
					line-height: 46px;
					font-size: 14px;
					color: #2993f8;
					font-weight: bold;
					span {
						font-size: 12px;
						color: #ff5a51;
						line-height: 46px;
					}
				}
				p {
					font-size: 12px;
					color: #666666;
					line-height: 22px;
				}
			}
		}
	}
</style>
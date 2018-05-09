<template>
	<div class="receipts-main">
		<div class="header-options dayinMain">
			<!-- 头部的上 -->
			<div class="header-options-top skin-shield">
				<div class="tittle-wrap">
					<i class="iconfont icon-ruku"></i>
					<div>入库</div>
				</div>
				<div class="optionWrap">
					<div class="optionDiv selected">
						<span class="title-name" :class="optionData.storage == '' ? '' : 'select'">
                               {{optionData.storage == '' ? '入库库位' : optionData.storage}}
                              <i class="iconfont icon-arrow-down" v-if="optionData.storage ==''"></i>
                              <i class="el-icon-circle-close" @click="getAllquery('warehouse','storage')" title="清除" v-else></i>
                            </span>
						<ul>
							<li @click="getWarehouseId(item, index)" :key="index" :class="optionData.storage == item.repositoryName ? 'active' :''" v-for="(item, index) in repositoryList">
								{{item.repositoryName}}
							</li>
						</ul>
					</div>
					<span class="spaceMark">|</span>
					<div class="optionDiv selected">
						<span class="title-name">
                             {{optionData.auditStatus == '' ? '审核状态' : optionData.auditStatus}}
                              <i class="iconfont icon-arrow-down" v-if="optionData.auditStatus ==''"></i>
                              <i class="el-icon-circle-close" @click="getAllquery('auditState','auditStatus')" title="清除" v-else></i>
                            </span>
						<ul>
							<li @click="getSort(item, index)" :key="index" :class="optionData.auditStatus == item.name ? 'active' :''" v-for="(item, index) in datas.audits">
								{{item.name}}
							</li>
						</ul>
					</div>
					<span class="spaceMark">|</span>
					<div class="optionDiv selected">
						<span class="title-name">
                                {{optionData.supplier == '' ? '供应商' : optionData.supplier}}
                              <i class="iconfont icon-arrow-down" v-if="optionData.supplier ==''"></i>
                              <i class="el-icon-circle-close" @click="getAllquery('supplier','supplier')" title="清除" v-else></i>
                            </span>
						<ul>
							<li @click="getsupplier(item, index)" :key="index" :class="optionData.supplier == item.supplierName ? 'active' :''" v-for="(item, index) in supplierListData">
								{{item.supplierName}}
							</li>
						</ul>
					</div>
					<span class="spaceMark">|</span>
					<div class="optionDiv selected">
						<span class="title-name">
                                {{optionData.distributor == '' ? '计划分销商' : optionData.distributor}}
                              <i class="iconfont icon-arrow-down" v-if="optionData.distributor ==''"></i>
                              <i class="el-icon-circle-close" @click="getAllquery('shop','distributor')" title="清除" v-else></i>
                            
                            </span>
						<ul>
							<li @click="getShop(item, index)" :key="index" :class="optionData.distributor == item.shopName ? 'active' :''" v-for="(item, index) in datas.shopList">
								{{item.shopName}}
							</li>
						</ul>
					</div>
					<span class="spaceMark">|</span>
					<div class="optionDiv selected Rp_title_container">
						<div class="report-data">
							<div class="block until" data-txt="至">
								<el-date-picker class="mydatepicker" size="mini" type="date" @change="changeDate" v-model="optionData.beginTime" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
							</div>
							<div class="block">
								<el-date-picker class="mydatepicker" size="mini" type="date" @change="changeDate" v-model="optionData.endTime" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
							</div>
						</div>

					</div>

					<div class="optionDiv sell-new-data oper-btn" @click="newReceipt">新建入库单</div>
				</div>
			</div>
		</div>
		<!-- 单据列表 -->
		<div class="receipts-list dayinMain" @scroll="onScroll($event)">
			<div>
				<template v-if="totalNum > 0">
					<template v-if="item" v-for="(item, index) in showList">
						<receipts-list :item="item" :Index="index" :key="index" @delectReceiptCb="delectReceiptCb">
						</receipts-list>
					</template>
				</template>
				<div v-if="totalNum === 0" class="no-data">
					<EmptyReceiptsTemplate @emptyAddReceipt="newReceipt" :isAddRole="computedRole"></EmptyReceiptsTemplate>
				</div>
			</div>
		</div>
		<!-- 新建入库 -->
		<!-- <div class="new-receipts-wrap dayinMain" v-model="newPopup.main"> 搞不懂历史记录怎么会这样写，写法不对-->
		<div class="new-receipts-wrap dayinMain">
			<new-storage v-if="newPopup.main" :newPopup="newPopup.main" v-on:closePopup="closePopup"></new-storage>
			<NewStorageJinBaiF v-if="newPopup.JinBaiF" :newPopup="newPopup.JinBaiF" v-on:closePopup="closePopup">
			</NewStorageJinBaiF>
			<ToLeadDiary v-if="newPopup.toLeadDiary" :newPopup="newPopup.toLeadDiary" v-on:closePopup="closePopup">
			</ToLeadDiary>
		</div>
		<!-- 删除单据 -->
		<div class="dayinMain">
			<delect-receipts v-on:delectReceiptsState="delectReceiptsState" :delPopup='popup.deleteReceipts' :receiptsOrderNum='popup.receiptsOrderNum'></delect-receipts>
			<!-- 审核弹窗 -->
			<audit-receipts v-if='popup.auditPopup' v-on:delectReceiptsState="delectReceiptsState" :auditPopup='popup.auditPopup' :receiptsOrderNum='popup.receiptsOrderNum' :auditsReceiptsForm='popup.auditsReceiptsForm'></audit-receipts>
		</div>
		<div class="dayin dayinMain">
			<!-- 商品标签 -->
			<ProductLabel ref="productL" v-if="true" v-on:closeProduce="closeProduce" @requestProductList="requestProductList" :productList="print.productList" :orderNum="print.currentOrderNum" :labelTemplateList="labelTemplateList" :totalNum="print.totalNum" @printTemplate="printTemplate" @previewTemplate="previewTemplate">
			</ProductLabel>
			<TemplatePreviewDialog ref="templatePreviewDialog" @print="printTemplate" :canvas="print.canvas" :templateData="print.templateData" :pageNumber="print.templateData.productList.length"></TemplatePreviewDialog>
			<TemplatePreviewCanvasComponent v-show="print.isPreview" class="template-print-canvas" :isPrintCanvas="true" :canvas="print.canvas" :templateData="print.templateData" v-for="(i,index) in print.templateData.productList.length" :key="index" :page="i"></TemplatePreviewCanvasComponent>
		</div>
		<PrintCanvasTemplate v-show="print.isPreview" class="template-print-canvas" :isPrintCanvas="true" :canvas="print.canvas" :templateData="print.templateData" v-for="(i,index) in print.templateData.productList.length" :key="index" :page="i"></PrintCanvasTemplate>
	</div>
</template>
<script>
	import moment from 'moment'
	import Vue from 'vue'
	import { mapGetters, mapActions, mapState } from "vuex"
	import { seekGetShopListByCo, seekInStorageList } from './../../../Api/commonality/seek'
	import { operateDelReceipt, operateCreateRKReceipt } from './../../../Api/commonality/operate'
	import { receiptOptionsName } from 'Api/commonality/status'
	import delectReceipts from './../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
	import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
	import EmptyReceiptsTemplate from '../../../components/EmptyDataTemplate/EmptyReceiptsTemplate.vue'
	import newStorage from '../../../components/work/NewStorage'
	import NewStorageJinBaiF from '../../../components/work/NewStorageJinBaiFu'
	import TemplatePreviewDialog from '../../../components/template/TemplatePreviewDialog'
	import TemplatePreviewCanvasComponent from '../../../components/template/TemplatePreviewCanvas'
	import PrintCanvasTemplate from '../../../components/template/PrintCanvasTemplate'
	import receiptsList from './ReceiptsList'
	import ToLeadDiary from './ToLeadDiary'
	import ProductLabel from './productLabel'
	import * as jurisdictions from '../../../Api/commonality/jurisdiction'
	export default {
		data() {
			return {
				pickerOptions1: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				"selectPopup": false, // 选择下拉框
				"JinBaiFuSelect": false,
				"isSeslectBody": false, // 移入选择内容框
				"selectRecord": {}, // 记录样式
				"totalNum": "", // 单据总条数
				"selectData": { // 选择样式
					"warehouse": [], // 入库库位
					"auditState": [], // 审核状态
					"supplier": [], // 供应商
					"shop": [],
					"littleSelect": [] // 小类的下拉框
				},
				"queryList": [], // 查询列表
				"selectObject": { // 选择数据
					"warehouse": '入库库位', // 入库库位
					"auditState": '审核状态', // 审核状态
					"supplier": '供应商', // 供应商
					"shop": '分销商'
				},
				"onData": { // 下拉选中数据
					"shopId": "", // 店铺
					"timeType": "" // 时间
				},
				"popupData": { // 过滤
					"shipmentsId": null, // 发货id
					"auditType": null // 审核状态
				},
				"onClass": { // 选中的class
					"one": false,
					"two": false,
					"three": false
				},
				"newDatas": { // 新增数据(其它页面也用到的)newDatas
					"shopId": "", // 分销商ID
					"supplierId": "", // 供应商ID
					"productTypeId": "", // 产品类别ID
					"repositoryId": "", // 库位ID
					"orderNumber": null // 单据号
				},
				"showList": [], // 单据列表
				"datas": {
					"shopList": [], // 店铺列表
					"audits": [
						// {
						//     "name": "全部状态",
						//     "type": "-1"
						// },
						{
							"name": "待审核",
							"type": "1"
						},
						{
							"name": "审核中",
							"type": "2"
						},
						{
							"name": "已审核",
							"type": "3"
						}
					],
					"supplierList": [{
							"name": "已收银",
							"type": "1"
						},
						{
							"name": "待收银",
							"type": "2"
						}
					]
				},
				"produce": {
					"isShowAct": false,
				},
				"newPopup": { // 新建单据的弹窗
					"main": false, // 新建入库
					"JinBaiF": false, // 新建金百福
					"toLeadDiary": false // 日志
				},
				"popup": { // 弹窗
					"productClass": false, // 产品类型
					"supplierAnRepository": false, // 供应商和库位
					"deleteReceipts": false, // 删除单据弹窗
					"receiptsOrderNum": null, // 操作的单据号
					"auditsReceiptsForm": null, // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
					"auditPopup": false // 审核弹窗
				},
				"seekNumber": "", // 搜索单据号
				"monitorScroll": 0,
				"page": 1,
				"print": {
					totalNum: 0,
					productList: [],
					currentOrderNum: null,
					canvas: {
						percentage: 100,
						width: 0,
						height: 0,
						backgroundImage: '',
						rotateDeg: 0,
						components: []
					},
					isPreview: false,
					templateData: {
						productList: []
					}
				},
				applyDataList: [],
				applyData: [],

				optionData: {
					storage: '', //入库车位 
					auditStatus: '', //审核状态
					supplier: '', //供应商
					distributor: '', // 分销商
					beginTime: '',
					endTime: '',

				}
			}
		},
		components: {
			delectReceipts,
			auditReceipts,
			newStorage,
			NewStorageJinBaiF,
			ToLeadDiary,
			receiptsList,
			EmptyReceiptsTemplate,
			ProductLabel,
			TemplatePreviewDialog,
			TemplatePreviewCanvasComponent,
			PrintCanvasTemplate
		},
		created() {
			this.optionData.beginTime = moment().startOf("month").format("YYYY-MM-DD") + " 00:00:00";
			this.optionData.endTime = moment().format("YYYY-MM-DD") + " 23:59:59";
			this.getList(); // 获取单据列表
			this.workRepositoryList(); // 库位列表
			this.getShopListByCo(); // 店铺列表//日期控件默认设置时间
			this.getShopList()
			this.workProductClass(); // 产品类别
			this.workSupplierList(); // 供应商
			this.$store.dispatch('getTemplateList', {
				type: 2,
				fieldType: 'simple'
			})
			this.applyDataList = this.$store.state.datas
			// for (let i = 0; i < this.$store.state.datas.applyList.twoDataList.length; i++) {
			//     if (this.$store.state.datas.applyList.twoDataList[i].twoName == "工作-入库") {
			//         this.applyData = this.$store.state.datas.applyList.twoDataList[i]
			//     }
			// }
			
		},
		mounted() {
			let self = this
			$(".receipts-list").mCustomScrollbar({
				theme: "minimal-dark",
				axis: 'y',
				mouseWheel: {
					scrollAmount: 200,
					preventDefault: false,
					normalizeDelta: false
				},
				callbacks: {
					onScrollStart: function() {
						self.getListAppendData();
					}
				}
			});
		},
		computed: {
			...mapGetters([
				"repositoryList", // 库位列表
				"shopListByCo", // 店铺列表
				"productClass", // 产品类别
				"supplierListData", // 供应商
				"userPositionInfo" // 职位信息
			]),
			...mapState({
				labelTemplateList: state => state.template.labelList,
				applyUserInfo: state => state.datas.applyList.twoDataList
			}),
			computedRole: function() { // 公司
				if(this.userPositionInfo) {
					for(let i of this.userPositionInfo.roleList) {
						switch(i.role) {
							case "1":
								return true;
							case "2":
								return true;
							case "3":
								return true;
						}
					}
				}
			},
			shopRole: function() { // 店员
				if(this.userPositionInfo) {
					for(let i of this.userPositionInfo.roleList) {
						switch(i.role) {
							case "4":
								return true;
							case "5":
								return true;
						}
					}
				}
			}
		},
		watch: {
			'selectPopup': function() {
				if(this.selectPopup) {
					this.recordData();
				} else {
					this.rollBackData();
				}
			}
		},
		methods: {
			...mapActions([
				"workRepositoryList", // 库位列表
				"getShopListByCo", // 店铺列表
				"workProductClass", // 产品类别
				"workSupplierList" // 供应商
			]),

			previewTemplate(canvas, selectedProducts, isPrint) {
				this.print.canvas = canvas
				if(selectedProducts.length) {
					this.$store.dispatch('getPrintLabelData', {
						productList: selectedProducts.map(selectedProduct => {
							return {
								productId: selectedProduct
							}
						})
					}).then(json => {
						if(json.state == 200) {
							this.print.templateData = json.data;
							this.print.isPreview = true;
							if(isPrint) {
								Vue.nextTick(() => {
									window.print();
								})
							} else {
								this.$refs.templatePreviewDialog.show();
							}
						}
					})
				} else {
					this.$store.dispatch('getPrintLabelData', {
						isTmp: 1,
						productType: 1
					}).then(json => {
						if(json.state == 200) {
							this.print.templateData.productList = json.data.productList.slice(0, 1)
							this.print.isPreview = true
							if(isPrint) {
								Vue.nextTick(() => {
									window.print()
								})
							} else {
								this.$refs.templatePreviewDialog.show()
							}
						}
					})
				}
			},
			printTemplate() {
				Vue.nextTick(() => {
					window.print()
				})
			},
			clearData(data) {
				this.print.productList = [];
			},
			requestProductList(filter) {
				this.$store.dispatch('getPrintLabelByOrder', filter).then(json => {
					if(json.state == 200) {
						this.print.productList = json.data.productList
						this.print.totalNum = json.data.totalNum
					}
				})
			},
			produceLabelAct() {
				//this.produce.isShowAct = true;
				this.$refs.productL.show()
			},
			preciseSun(parm) { // 年
				var Year = parm.slice(0, 4);
				var Month = parm.slice(4, 6);
				var Sun = parm.slice(6, 8);
				var allTime = Year + "-" + Month + "-" + Sun;
				return allTime;
			},
			preciseMinute(parm) { // 月
				var ConfigData = parm.slice(8, 10);
				var Mour = parm.slice(10, 12);
				var allTime = ConfigData + ":" + Mour;
				return allTime;
			},
			goldBufordToLead() {
				this.newPopup.JinBaiF = true;
			},
			goldBufordList() {
				this.newPopup.toLeadDiary = true;
			},
			delectReceiptCb(Index) { // 删除单据
				this.totalNum -= 1;
			},
			recordData() {
				let selectData = JSON.stringify([this.selectData]);
				this.selectRecord = JSON.parse(selectData)[0];
			},
			rollBackData() {
				let selectRecord = JSON.stringify([this.selectRecord]);
				this.selectData = JSON.parse(selectRecord)[0];
			},
			outSeslect() {
				let _self = this;
				setTimeout(function() {
					if(!_self.isSeslectBody) {
						_self.selectPopup = false;
					}
				}, 300)
			},
			outHeaderSeslectBody() { // 关闭选择框
				this.selectPopup = false;
				this.isSeslectBody = false;
			},
			openJinBaiFu() {
				this.JinBaiFuSelect = true;
			},
			outJinBaiFu() {
				let _self = this;
				setTimeout(function() {
					if(!_self.isSeslectBody) {
						_self.JinBaiFuSelect = false;
					}
				}, 300)
			},
			openSelect() { // 打开下拉框(全部)
				this.selectPopup = true;
			},
			openSelectBody() { // 打开下拉内容标识
				this.isSeslectBody = true;
			},
			outJinBaiFuBody() {
				this.isSeslectBody = false;
				this.JinBaiFuSelect = false;
			},
			confirm() { // 确定
				this.selectPopup = false;
				this.isSeslectBody = false;
				this.queryList = [];
				for(var i of Object.keys(this.selectObject)) {
					if(this.selectObject[i]) {
						this.queryList.push(this.selectObject[i]);
					}
				}
				this.page = 1;
				this.showList = [];
				this.restoreData();
				this.getList(); // 请求数据
				this.recordData();
			},
			closeProduce(parm) { // 关闭
				this.produce.isShowAct = parm;
			},
			closePopup(parm) { // 关闭
				this.newPopup.main = parm;
				this.newPopup.JinBaiF = parm;
				this.newPopup.toLeadDiary = parm;
			},
			seekFun() { // 通过单据号查询
				this.showList = [];
				this.getList();
			},
			onScroll(e) { // 滚动加载
				var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
				var clientHeight = e.currentTarget.clientHeight; // 元素的高度
				var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
				if(clientHeight + scrollTop >= scrollHeight) {
					this.getListAppendData();
				}
			},
			newReceipt(parm) { // 新建单据
				this.newPopup.main = true;
			},
			delectReceiptsState(parm) { // 监听确认删除弹窗
				if(parm.type === "2") { // 单据删除成功
					this.showList = [];
					this.getList();
				}
				this.popup.deleteReceipts = parm.name;
				this.popup.auditPopup = parm.name;
			},
			getChildCalss(parmOne, parmTwo) { // 获取产品类别名字
				this.newDatas.classesId = parmOne;
				this.newDatas.classesName = parmTwo;
			},
			affirmNew() { // 确定新建入库
				if(this.newDatas.productTypeId && this.newDatas.repositoryId) {
					var options = {
						"productTypeId": this.newDatas.productTypeId, // 产品类别ID
						"repositoryId": this.newDatas.repositoryId // 库位ID
					}
					operateCreateRKReceipt(options).then((response) => {
						if(response.data.state === 200) {
							sessionStorage.setItem("orderNumber", response.data.data.orderNum);
							this.$router.push("/work/storage/detail");
						} else {
							this.$store.dispatch('workPopupError', response.data.msg);
						}
					}, (response) => {})
				} else if(!this.newDatas.productTypeId) {
					this.$store.dispatch('workPopupError', "请选择产品类别");
				} else if(!this.newDatas.repositoryId) {
					this.$store.dispatch('workPopupError', "请选择库位");
				}
			},
			getConfigValue(parm) { // 配置产品类别
				let configName = null;
				switch(parm) {
					case '1':
						configName = "素金类（计重）";
						break;
					case '2':
						configName = "珠宝类（计件）";
						break;
					case '3':
						configName = "饰品类（银饰 / 饰品）";
						break;
				}
				return configName;
			},
			getOptionsName(parm) { // 操作名字
				return receiptOptionsName(parm);
			},
			getState(parm) { // 审核状态
				switch(parm) {
					case "1":
						return "./../../../../static/img/audit-1.png";
					case "2":
						return "./../../../../static/img/audit-2.png";
					case "3":
						return "./../../../../static/img/audit-3.png"
				}
			},
			openList(parm) { // 打开下拉框(小类的)
				this.outList();
				Vue.set(this.selectData.littleSelect, parm, true);
			},
			outList() { // 关闭下拉框(小类)
				this.selectData.littleSelect = [];
			},
			resetQuery() { // 重置
				this.selectData.warehouse = [];
				this.selectData.auditState = [];
				this.selectData.supplier = [];
				this.selectObject.warehouse = null;
				this.selectObject.auditState = null;
				this.selectObject.supplier = null;
			},
			closeSeek() { // 关闭查询
				this.seekNumber = "";
				this.restoreData();
				this.getList();
			},
			restoreData() { // 还原数据
				this.page = 1;
				this.showList = [];
			},
			/**
			 * 日期改变事件
			 */
			changeDate() {
				this.getList();
			},
			setParams(){
				var warehouse = null; // 入库库位
				var auditState = null; // 审核状态
				var supplier = null; // 供应商
				var shoper = null; // 供应商
				if(this.selectObject.warehouse) { // 入库库位
					warehouse = this.selectObject.warehouse.repositoryId;
				}
				if(this.selectObject.auditState) { // 审核状态
					auditState = this.selectObject.auditState.type;
				}
				if(this.selectObject.supplier) { // 供应商
					supplier = this.selectObject.supplier.supplierId;
				}
				if(this.selectObject.shop) { // 供应商
					shoper = this.selectObject.shop.shopId;
				}
				let options = {
					"orderBy": "2", // 1智能排序2按制单时间倒序3按制单时间升序4按审核状态排列
					"storageId": warehouse || "-1", // 仓库ID；若为-1，则为全部仓库
					"checkType": auditState || "-1", // 审核状态-1，全部状态1，待审核2，审核中3，已审核
					"supplierId": supplier || "-1", // 供应商ID；若为-1，则为全部供应商
					"planSoldId": shoper || "-1", // 分销商ID；若为-1，则为全部供应商
					"productTypeId": "-1", // 产品类别ID；若为-1，则为全部产品
					"beginTime": moment(this.optionData.beginTime).format("YYYYMMDD") + "000000",
					"endTime": moment(this.optionData.endTime).format("YYYYMMDD") + "235959",
					"orderNum": this.seekNumber || "",
					"page": this.page || "1",
					"pageSize": "50"
				}
				return options;
			},
			/**
			 * 追加数据
			 */
			getListAppendData(){
				this.page += 1;
				let options = this.setParams();
				seekInStorageList(options).then((response) => {
					if(response.data.state === 200) {
						this.showList = _.concat(this.showList, response.data.data.orderList);
						//this.totalNum = Number(response.data.data.totalNum);
					} else {
						this.$store.dispatch('workPopupError', response.data.msg);
					}
				})
			},
			/**
			 * 获取数据
			 */
			getList() { // 定位选择的过滤数据
				this.page = 1;
				let options = this.setParams();
				seekInStorageList(options).then((response) => {
					if(response.data.state === 200) {
						this.showList = response.data.data.orderList;
						this.totalNum = Number(response.data.data.totalNum);
					} else {
						this.$store.dispatch('workPopupError', response.data.msg);
					}
				}, (response) => {})
			},
			cutAuditsData(item2, index2, index, typeName) { // 切换审核状态(小类)
				this.page = 1;
				this.showList = [];
				this.queryList[index].name = item2.name;
				this.queryList[index].type = item2.type;
				this.amendFun(item2, index2, typeName);
				this.restoreData();
				this.getList();
				this.outList();
			},
			cutWarehouseData(item2, index2, index, typeName) { // 切换入库库位(小类)
				this.page = 1;
				this.showList = [];
				this.queryList[index].repositoryName = item2.repositoryName;
				this.queryList[index].repositoryId = item2.repositoryId;
				this.amendFun(item2, index2, typeName);
				this.restoreData();
				this.getList();
				this.outList();
			},
			cutShopByCo(item2, index2, index, typeName) { // 切换供应商
				this.page = 1;
				this.showList = [];
				this.queryList[index].supplierName = item2.supplierName;
				this.queryList[index].supplierId = item2.supplierId;
				this.amendFun(item2, index2, typeName);
				this.restoreData();
				this.getList();
				this.outList();
			},
			amendFun(item2, index2, typeName) { // 修改选择数据item2, index, typeName
				switch(typeName) {
					case "审核状态":
						this.selectData.auditState = [];
						Vue.set(this.selectData.auditState, index2, true);
						this.selectObject.auditState = item2;
						break;
					case "入库库位":
						this.selectData.warehouse = [];
						Vue.set(this.selectData.warehouse, index2, true);
						this.selectObject.warehouse = item2;
						break;
					case "供应商":
						this.selectData.supplier = [];
						Vue.set(this.selectData.supplier, index2, true);
						this.selectObject.supplier = item2;
						break;
				}
			},
			delectQuery(parm, item) { // 删除一条选中数据
				Vue.delete(this.queryList, parm);
				switch(item.typeName) {
					case "供应商":
						this.selectData.supplier = [];
						this.selectObject.supplier = null;
						break;
					case "入库库位":
						this.selectData.warehouse = [];
						this.selectObject.warehouse = null;
						break;
					case "审核状态":
						this.selectData.auditState = [];
						this.selectObject.auditState = null;
						break;
				}
				this.restoreData();
				this.getList();
			},
			emptyQuery() { // 清空查询筛选条件
				this.selectData.warehouse = [];
				this.selectData.auditState = [];
				this.selectData.supplier = [];
				this.selectData.littleSelect = [];
				this.selectObject.warehouse = [];
				this.selectObject.auditState = [];
				this.selectObject.supplier = [];
				this.queryList = [];
				this.getList();
			},
			getWarehouseId(parm, index) { // 选择入库库位
				let selectObject = {
					"typeName": "入库库位",
					"name": parm.repositoryName,
					"repositoryId": parm.repositoryId
				}
				this.optionData.storage = parm.repositoryName
				this.selectObject.warehouse = selectObject;
				this.selectData.warehouse = [];
				Vue.set(this.selectData.warehouse, index, true)
				this.restoreData();
				this.getList(); // 请求数据
				this.recordData();
			},
			getAllquery(parm, pm2) { // 全选
				this.selectData[parm] = [];
				this.selectObject[parm] = null;
				this.optionData[pm2] = ''
				this.restoreData();
				this.getList(); // 请求数据
				this.recordData();
			},
			getSort(parm, index) { // 审核状态
				let selectObject = {
					"typeName": "审核状态",
					"name": parm.name,
					"type": parm.type
				}
				this.optionData.auditStatus = parm.name
				this.selectObject.auditState = selectObject;
				this.selectData.auditState = [];
				Vue.set(this.selectData.auditState, index, true);
				this.restoreData();
				this.getList(); // 请求数据
				this.recordData();
			},
			getsupplier(parm, index) { // 供应商
				let selectObject = {
					"typeName": "供应商",
					"supplierName": parm.supplierName,
					"supplierId": parm.supplierId
				}
				this.optionData.supplier = parm.supplierName
				this.selectObject.supplier = selectObject;
				this.selectData.supplier = [];
				Vue.set(this.selectData.supplier, index, true)
				this.restoreData();
				this.getList(); // 请求数据
				this.recordData();
			},
			getShop(parm, index) {
				let selectObject = {
					"typeName": "分销商",
					"shopName": parm.shopName,
					"shopId": parm.shopId
				}
				this.optionData.distributor = parm.shopName
				this.selectObject.shop = selectObject;
				this.selectData.shop = [];
				Vue.set(this.selectData.shop, index, true)
				this.restoreData();
				this.getList(); // 请求数据
				this.recordData();
			},
			getShopList() { // 店铺列表
				let options = "";
				let _self = this;
				seekGetShopListByCo(options).then((response) => {
					if(response.data.state === 200) {
						_self.datas.shopList = response.data.data.shopList;
						if(response.data.data.shopList.length === 1) { // 只有一个店铺的情况下
							_self.onData.shopId = response.data.data.shopList[0].shopId;
						}
					} else {
						this.$store.dispatch('workPopupError', response.data.msg);
					}
				}, (response) => {});
			},
			delectProduct(parm) { // 删除商品
				let _seft = this;
				let options = {
					"orderNum": parm
				}
				operateDelReceipt(options).then(response => {
					if(response.data.state === 200) {
						_seft.getAll(); // 待会改不请求
					} else {
						this.$store.dispatch('workPopupError', response.data.msg);
					}
				}, response => {})
			},
			toSellReceiptsList(parm) { // 去到单据列表
				sessionStorage.setItem("orderNumber", parm);
				this.$router.push("/work/sell/sellReceiptsList");
			},
			collectMoney() { // 待收银
				this.$store.dispatch('workPopupError', "待收银");
			},
			auditStateFilter(parm, makeId, isCheckOrderMan) { // 提交审核，撤销审核，审核通过
				return jurisdictions.jurisdictionAuditStateFilter(parm, makeId, isCheckOrderMan);
			},
			turnDownAuditStateFilter(parm, isCheckOrderMan) { // 驳回审核
				return jurisdictions.jurisdictionTurnDownAuditStateFilter(parm, isCheckOrderMan);
			},
			delectOptions(parm, isRole) { // 删除权限
				return jurisdictions.jurisdictionDelectOptions(parm, isRole);
			},
			auditFun(checkType, orderNum) { // 提交审核
				this.popup.receiptsOrderNum = orderNum;
				this.popup.auditsReceiptsForm = checkType;
				this.popup.auditPopup = true;
			},
			delectReceipts(parm) {
				this.popup.deleteReceipts = true;
				this.popup.receiptsOrderNum = parm;
			}
		}
	}
</script>
<style src="../../../assets/css/template/receiptsList.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
   .block{
	   .mydatepicker{
		   margin-top: 2px;
	   }
   }
</style>
<style lang="scss">
	@media screen {
		.new-storage {}
		.template-print-canvas {
			opacity: 0;
		}
	}
	
	@media print {
		@import "~assets/css/template/templatePrint";
		body {
			background-color: #fff;
		}
		.dayinMain {
			display: none!important;
		}
	}
	
	.Rp_title_container {
		padding-top: 0px !important;
	}
</style>
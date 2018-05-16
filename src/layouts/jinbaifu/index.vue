<template>
	<div class="to-lead-diary-main" v-loading="loading" :element-loading-text="loadingTxt">
		<div class="batch-top">
			<h3><i class="iconfont icon-daoru1"></i>导入日记<!-- <i class="iconfont icon-ruku" style="color: #2993f8; margin-left: 10px;"></i> --></h3>
			<!-- <a href="javascript: void(0)" @click="newPopup.JinBaiF = true">金百福数据导入</a> -->
			<a v-if="!Jrole" href="javascript: void(0)" @click="newPopup.JinBaiF = true">智能导入</a>
			<a v-if="!Jrole" :href="downUrl">模板下载</a>
			<a v-if="!Jrole" href="javascript: void(0)" @click="ruleOptionDia = true">导入规则</a>
		</div>
		<div class="batch-body">
			<div class="table-wrap">
				<div class="jbf-table-inner">
					<table class="new-template-table" cellpadding="0" cellspacing="0">
						<thead>
							<tr class="table-title">
								<th class="item fileName" style="width: 258px">
									<div>时间</div>
								</th>
								<th style="width: 160px" class="item fileSize">
									<div style="width: 160px">操作人</div>
								</th>
								<!--<th class="item fileSize"><div style="width: 217px">导入类型</div></th>-->
								<th class="item fileType">
									<div style="width: 217px">导入位置</div>
								</th>
								<th class="item fileOrder">
									<div style="width: 217px">单据</div>
								</th>
								<th class="item fileState">
									<div style="width: 140px">状态</div>
								</th>
								<th class="item fileOperate">
									<div style="width: 127px">下载</div>
								</th>
								<th class="item fileRecover">
									<div style="width: 127px">操作</div>
								</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="jbf-table-inner jbf-table-body" @scroll="onScroll($event)">
					<table class="new-template-table" cellpadding="0" cellspacing="0">
						<tbody>
							<tr v-if="item" v-for="(item, index) in diaryList" :key="index">
								<td style="width: 258px; overflow: hidden;">
									<div style="width: 258px; overflow: hidden;">
										<span v-text="preciseSun(item.createTime)"></span>
										<span class="ml10" v-text="preciseMinute(item.createTime)"></span></div>
								</td>
								<td style="width: 160px">
									<div>{{item.userName == null ? 'null' : item.userName}}</div>
								</td>
								<td style="width: 217px">
									<div>
										{{(item.storageName == ''|| item.storageName == null ) ? (item.shopName == '' ? '无' : item.shopName == null ? 'null' : item.shopName) : item.storageName}}
									</div>
								</td>
								<td style="width: 217px">
									<span v-if="viewRk" @click="goOrder(item, 1, $event)" class="cursor">{{getOrder(item, 1)}}</span>
									<span v-else class="no-cursor">{{getOrder(item, 1)}}</span>
									<span @click="goOrder(item, 2, $event)" class="cursor">{{getOrder(item, 2)}}</span>
								</td>
								<td style="width: 140px">
									<div>{{getSucceed(item.status)}}</div>
								</td>
								<td style="width: 127px">
									<div>
										<a class="download-btn" :href="item.fileSrc">下载</a>
									</div>
								</td>
								<td style="width: 127px">
									<div>
										<a v-if="item.cancel == 'Y'" @click="revocationFun(item.logId, index)" class="revocation-btn" href="javascript: void(0)">撤销导入</a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<NewPopup v-if="newPopup.JinBaiF" :newPopup="newPopup.JinBaiF" @closePopup="closePopup"></NewPopup>
		<el-dialog top="40px" :show-close="true" :visible.sync="ruleOptionDia" customClass="ruleOption">
			<div class="rule-title"><i class="iconfont icon-liebiao"></i>导入规则</div>
			<div class="tab-list">
				<ul>
					<li @click="tabAction(index)" v-for="(item, index) in tabList" :key="index" :class="{active: actIndex == index}">
						<div>{{item}}</div>
					</li>
				</ul>
			</div>
			<div class="page-wrap">
				<component :is="panel" :ruleOptionDia="ruleOptionDia"></component>
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
</template>
<script>
	import Vue from 'vue'
	import { mapGetters, mapActions } from "vuex"
	import { seekDiary, downloadTable } from "Api/commonality/seek"
	import { operateDelJinbaifu } from "Api/commonality/operate"
	import { statusSucceed } from "Api/commonality/status"
	import * as jurisdictions from 'Api/commonality/jurisdiction'
	import NewPopup from "./NewPopup"
	import BasePage from "./components/base"
	import Certificate from "./components/certificate"
	import DeputyPage from "./components/deputy"
	import Fee from "./components/fee"
	import MainPage from "./components/main"
	import Part from "./components/part"
	import Price from "./components/price"
	import Product from "./components/product"
	import Weight from "./components/weight"
	import Other from "./components/other"

	export default {
		// props: [
		//     'newPopup'
		// ],
		components: {
			NewPopup,
			BasePage,
			Certificate,
			DeputyPage,
			Fee,
			MainPage,
			Part,
			Price,
			Product,
			Weight,
			Other
		},
		data() {
			let viewRk = (_.indexOf([1, 2, 3], sessionStorage.companyPosition)>0 || sessionStorage.multipleIdentities == "Y") ? true : false;
			return {
				viewRk: viewRk,
				"downUrl": null, // 下载地址
				orderNum1: '',
				orderNum2: '',
				actIndex: 0,
				tabList: [
					'基本信息',
					'产品类型',
					'重量',
					'证书',
					'主石',
					'副石',
					'工费',
					'配件',
					'其他费用',
					'标价',
				],
				panel: BasePage,
				ruleOptionDia: false,
				pickerOptions10: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				search: null,
				checked: false,
				saveSuccess: true,
				// startTime: null,
				// endTime: null,
				modelType: null,
				checkList: [],
				currentPage: 30,
				diaryList: [],
				totalNum: 0,
				pageSize: 10,
				// newPopup: true,
				"newPopup": { // 新建单据的弹窗
					"main": false, // 新建入库
					"JinBaiF": false, // 新建金百福
					"toLeadDiary": false // 日志
				},

				loading: true,
				loadingTxt: 'loading...'
			}
		},
		computed: {
			...mapGetters([
				"userPositionInfo" // 职位信息
			]),
			shopRole: function() { // 店员
				if(this.userPositionInfo) {
					return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
				}
			},
			computedRole: function() { // 公司
				if(this.userPositionInfo) {
					return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
				}
			},
			Jrole: function () {
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionJCY(this.userPositionInfo.roleList);
            }
        }
		},
		watch: {
			// 'newPopup': function () {
			//     if (this.newPopup === true) {
			//         this.saveSuccess = this.newPopup;
			//     }
			// },
			'checkList': function() { // 监听全选
				this.pageJudgeFun();
			},
		},
		created() {
			this.getDownUrl(); // 获取模板地址
			this.getList(this.cbFun);
		},
		mounted() {
			let self = this

			// console.log(this.rowConfigData)
			// this.newRowData = this.rowConfigData
			// 初始化键盘事件
			window.onresize = function() {
				if(self.$refs.total_table) {
					self.$refs.total_table.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
					self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left - 10 + 'px'
				}
				let flag = self.tableMainFlag
				if(self.$refs.row4_main) {

					if(flag.baseFlag == true || flag.weightFlag == true || flag.pageFlag == true || flag.mainStonFlag == true || flag.otherStonFlag == true || flag.workFlag == true || flag.partsFlag == true || flag.otherFlag == true || flag.priceFlag == true) {
						// this.$refs.row4_main.style.width = "1500px"
						//console.log(document.body.offsetWidth)
						let tableWidth = ((document.body.offsetWidth - 1250) / 2) + 1150
						self.$refs.row4_main.style.width = tableWidth + 'px'
					} else {
						self.$refs.row4_main.style.width = "1250px"
					}
					self.$refs.total_table.style.width = self.$refs.row4_main.offsetWidth + 'px'
				}

			}
			window.addEventListener('keydown', this.keydownHandler)
			this.$refs.right_scroll_wrap.style.width = this.$refs.row4_main.offsetWidth - 450 + 'px'
			self.$refs.right_scroll_wrap.style.position = 'absolute'
			self.$refs.right_table_data.style.marginTop = "80px"
			self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left - 10 + 'px'
			self.$refs.table_tlttle.style.width = self.$refs.row4_main.offsetWidth + 'px'
			this.$refs.total_table.style.position = 'fixed'
			this.$refs.total_table.style.bottom = '90px'
			this.$refs.total_table.style.width = 1250 + 'px'
			//----------- body_header 详情标题, left_tittle , total_table, body_row5
			self.$refs.table_tlttle.style.width = self.$refs.row4_main.offsetWidth + 'px'

			// this.$refs.right_table_data.style.width = '800px'
			this.$refs.row4_main.style.width = "1250px"

			this.$refs.total_table.style.left = this.$refs.body_box.getBoundingClientRect().left + 'px'
			// this.$refs.body_header.style.left = this.$refs.body_box.getBoundingClientRect().left + 'px'

			$(".new-storage-wrap").mCustomScrollbar({
				theme: "minimal-dark",
				autoHideScrollbar: true,
				scrollInertia: 500,
				mouseWheel: {
					scrollAmount: 200,
					preventDefault: false,
					normalizeDelta: false
				},
				advanced: {
					updateOnContentResize: true
				},
				callbacks: {
					whileScrolling: function() {
						self.$refs.right_scroll_wrap.style.width = self.$refs.row4_main.offsetWidth - 450 + 'px'
						self.$refs.right_tittle.style.width = self.$refs.row4_main.offsetWidth - 450 + 'px'
						self.$refs.table_tlttle.style.width = self.$refs.row4_main.offsetWidth + 'px'
						self.$refs.total_table.style.width = self.$refs.row4_main.offsetWidth + 'px'

						// console.log(111)
						self.$refs.total_table.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
						if(self.$refs.right_table_wrap.offsetHeight > 450) {
							self.$refs.shadow.style.height = self.$refs.right_table_wrap.offsetHeight + 50 + 'px'
						} else {
							self.$refs.shadow.style.height = 500 + 'px'
						}
						// self.$refs.body_header.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
						// self.$refs.left_tittle.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
						self.$refs.total_table.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
						// self.$refs.body_row5.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
						// console.log(22222)
						// console.log(this.mcs.top)
						if(this.mcs.top <= -255) {
							self.$refs.table_tlttle.style.position = 'fixed'
							self.$refs.table_tlttle.style.top = '140px'
							self.$refs.left_tittle.style.position = 'fixed'
							self.$refs.left_tittle.style.top = '190px'
							// self.$refs.left_tittle.style.left = '190px'
							self.$refs.left_tittle.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
							self.$refs.left_tittle.style.zIndex = '40'

							self.$refs.right_scroll_wrap.style.position = 'fixed'
							self.$refs.right_scroll_wrap.style.top = '190px'
							self.$refs.right_scroll_wrap.style.zIndex = '39'
							self.$refs.right_table_data.style.marginTop = "120px"
							// self.$refs.left_tlttle1.style.position = 'fixed'
							// self.$refs.left_tlttle1.style.top = '230px'
							self.$refs.left_table_main.style.top = "119px"

							self.$refs.total_table.style.position = 'fixed'
							// self.$refs.total_table.style.width = '800px'
							self.$refs.total_table.style.bottom = '90px'
							// self.$refs.total_table.style.left = '190px'
							self.$refs.total_table.style.opacity = '0'
						} else {
							self.$refs.table_tlttle.style.position = ''
							self.$refs.table_tlttle.style.top = ''

							self.$refs.left_tittle.style.position = ''
							self.$refs.left_tittle.style.top = ''
							self.$refs.left_tittle.style.left = ''
							self.$refs.right_table_data.style.marginTop = "80px"

							self.$refs.left_table_main.style.top = "140px"

							self.$refs.right_scroll_wrap.style.position = 'absolute'
							self.$refs.right_scroll_wrap.style.top = ''
							self.$refs.right_scroll_wrap.style.left = ''

							// self.$refs.total_table.style.position = 'absolute'
							// self.$refs.total_table.style.bottom = '0'
							// self.$refs.total_table.style.left = '0'

							self.$refs.total_table.style.position = 'fixed'
							// self.$refs.total_table.style.width = '800px'
							self.$refs.total_table.style.bottom = '90px'
							// self.$refs.total_table.style.left = '190px'
							self.$refs.total_table.style.opacity = '0'
						}
					},
					onTotalScroll: function() {
						self.$refs.total_table.style.opacity = '1'

					},
					onScroll: function() {
						self.$refs.total_table.style.opacity = '1'
					}
				}

			});
			$(".batch-body").mCustomScrollbar({
				theme: "minimal-dark",
				axis: "x",
				mouseWheel: {
					enable: false
				},
				scrollButtons: {
					enable: false
				}
			});
			eventBus.$on("scrollTop", function(val) {
				//console.log(val.itemTop)
				//self.$refs.scrollDiv.style.marginTop = val.itemTop + 80 + "px"
			})
		},
		methods: {
			getOrder(item, type) {
				//console.log(item)
				//console.log(item.orderNum)
				if(item.orderNum) {
					if(item.orderNum.includes(',')) {
						let part = item.orderNum.split(",")
						//console.log(part)
						if(type == 1) {
							return part[0]
						} else if(type == 2) {
							return part[1]
						}
					} else if(!item.orderNum.includes(',')) {
						if(type == 1) {
							return item.orderNum
						} else if(type == 2) {
							return ''
						}
					}
				} else {
					return ''
				}
			},
			goOrder(item, type, el) {
				let goType = el.target.innerText.substring(0, 2);
				console.log('this.shopRole:' + this.shopRole + '--------this.computedRole:' + this.computedRole);
				if(!this.shopRole || this.computedRole) {
					if(goType == 'RK') {
						this.$router.push({
							path: '/work/storage/detail',
							query: {
								orderNumber: el.target.innerText
							}
						})
					} else if(goType == 'FH') {
						this.$router.push({
							path: '/work/sipping/newSipping',
							query: {
								orderNumber: el.target.innerText
							}
						})
					}
				} else if(this.shopRole) {
					this.$router.push({
						path: '/work/sipping/newSipping',
						query: {
							orderNumber: el.target.innerText
						}
					})
				} else {
					return
				}
			},
			getDownUrl() { // 获取模板地址
				let options = {
					"type": "2", // 1 URL 2 文件 3 视频
					"infoType": "2" // 1 入库模板下载地址
				}
				downloadTable(options).then((response) => {
					if(response.data.state === 200) {
						this.downUrl = response.data.data.url;
					} else {
						this.$store.dispatch('workPopupError', response.data.msg)
					}
				}, (response) => {
					this.$store.dispatch('workPopupError', response.data.msg)
				})
			},
			tabAction(index) {
				//console.log(index)
				this.actIndex = index + ''
				switch(index) {
					case 0:
						this.panel = BasePage
						break;
					case 1:
						this.panel = Product
						break;
					case 2:
						this.panel = Weight
						break;
					case 3:
						this.panel = Certificate
						break;
					case 4:
						this.panel = MainPage
						break;
					case 5:
						this.panel = DeputyPage
						break;
					case 6:
						this.panel = Fee
						break;
					case 7:
						this.panel = Part
						break;
					case 8:
						this.panel = Other
						break;
					case 9:
						this.panel = Price
						break;
				}
			},
			onScroll(e) { // 滚动加载
				var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
				var clientHeight = e.currentTarget.clientHeight; // 元素的高度
				var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
				if(clientHeight + scrollTop >= scrollHeight) {
					this.getList(this.cbFun);
					// this.filterFun(this.cbFun);
				}
			},
			cbFun() { // 滚动页数变动
				this.currentPage += 30;
			},
			closePopup(parm) { // 关闭
				this.currentPage = 30
				this.diaryList = []
				this.getList(this.cbFun);
				this.newPopup.main = parm;
				this.newPopup.JinBaiF = parm;
				this.newPopup.toLeadDiary = parm;
			},
			handleSizeChange(val) {
				this.pageSize = val;
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(val)
				this.currentPage = val;
				this.getList();
				console.log(`当前页: ${val}`);
			},
			preciseSun: function(parm) { // 年
				if(parm) {
					var Year = parm.slice(0, 4);
					var Month = parm.slice(4, 6);
					var Sun = parm.slice(6, 8);
					var allTime = Year + "-" + Month + "-" + Sun
					return allTime;
				}
			},
			preciseMinute: function(parm) { // 分
				if(parm) {
					var ConfigData = parm.slice(8, 10);
					var Mour = parm.slice(10, 12);
					var allTime = ConfigData + ":" + Mour
					return allTime;
				}
			},
			getSucceed(parm) {
				return statusSucceed(parm);
			},
			closeCb() {
				this.$emit('closePopup', false)
			},
			revocationFun(logId, index) {
				let options = {
					"logId": logId
				}
				this.loading = true
				this.loadingTxt = '撤销中...'
				operateDelJinbaifu(options).then((response) => {
					this.loading = false
					this.loadingTxt = ''
					if(response.data.state === 200) {
						// this.diaryList.splice(index, 1)
						this.diaryList[index].status = '2'
						this.$store.dispatch('workPopupError', '撤销成功');
						this.currentPage = 30
						this.getList(this.cbFun);

					} else {
						this.$store.dispatch('workPopupError', response.data.msg);
					}
				}, (response) => {
					this.$store.dispatch('workPopupError', response.data.msg);
				})
				// console.log(options.logId);
			},
			getList(cbFun) {
				let options = {
					"page": 1,
					"pageSize": this.currentPage
				}
				seekDiary(options).then((response) => {
					console.log('fdfjaifafioajfiandfhdufad', response.data)
					this.loading = false
					this.diaryList = []
					if(response.data.state === 200) {
						this.totalNum = response.data.data.totalNum
						// this.diaryList = response.data.data.dataList
						//for(let i=0;i<50;i++){
						this.diaryList.push(...response.data.data.dataList)
						//}

						//console.log(this.shopRole)
						if(response.data.data.dataList.length > 0) {
							if(cbFun) {
								cbFun();
								console.log(this.currentPage)
							}
						}
					} else {
						this.$store.dispatch('workPopupError', response.data.msg);
					}
				}, (response) => {
					this.$store.dispatch('workPopupError', response.data.msg);
				})
			}
		}
	}
</script>
<style src="assets/css/_tableStorage.scss" lang="scss" scoped></style>
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
						background: url("./../../../static/img/tab-default.png") no-repeat left center;
						div {
							width: 70px;
							text-align: center;
						}
					}
					li.active {
						color: #fff;
						background: url("./../../../static/img/tab-select.png") no-repeat left center;
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
<style lang="scss" scoped>
	@import "~assets/css/template/fonts.scss";
	.to-lead-diary-main {
		width: 1250px;
		margin: 40px auto 0 auto;
		box-sizing: border-box;
		// border: 1px solid red;
		.batch-top {
			margin-bottom: 20px;
			height: 40px;
			//padding: 0 20px;
			h3 {
				@include F(16);
				// font-weight: normal;
				margin-top: 8px;
				color: #333;
				display: inline-block;
				i {
					float: left;
					font-size: 24px;
					color: #2993f8;
					margin-right: 10px;
					font-weight: normal;
				}
			}
			a {
				width: 80px;
				height: 28px;
				background: #2993f8;
				border-radius: 4px;
				display: inline-block;
				margin-top: 8px;
				@include F(16);
				color: #fff;
				float: right;
				font-size: 12px;
				text-align: center;
				line-height: 28px;
				margin-left: 20px;
			}
		}
		.jbf-add-wrap {
			.header-wrap {
				margin: 20px 0;
				text-align: center;
				p {
					text-align: center;
					font-size: 14px;
					font-weight: bold;
					color: #333;
					margin-top: 10px;
				}
			}
			.body-wrap {
				border: 1px solid #000;
				.choose {
					height: 250px;
					text-align: center;
				}
				ul {
					display: inline-block;
					margin-top: 70px;
					padding: 20px;
					li {
						display: inline-block;
						width: 100px;
						height: 36px;
						line-height: 36px;
						background: #effffd;
						border: 1px solid #4fdcca;
						color: #4fdcca;
						cursor: pointer;
						text-align: center;
						border-radius: 3px;
						margin: 0 20px 10px 0;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					li:hover {
						background: #4fdcca;
						border: 1px solid #4fdcca;
						color: #fff;
					}
					.on {
						color: #fff;
						background-color: #4fdcca;
					}
				}
			}
		}
	}
	
	.to-lead-diary-main {
		.table-wrap {
			width: 1250px;
			height: 720px;
			// height: 560px;
			border-radius: 10px;
			background: #fff;
			overflow: auto;
			box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
			.jbf-table-inner {
				// height: 560px;
				overflow: auto;
				table {
					width: 100%;
					tr:nth-child(odd) {
						background: #fbfbfb;
					}
					tr {
						height: 40px;
						th {
							height: 40px;
							font-size: 14px;
							color: #666;
							background: #f5f5f5;
						}
						td {
							font-size: 14px;
							color: #333;
							text-align: center;
							.line-btn {
								text-decoration: underline;
								display: block;
								width: 50%;
								color: #2993f8;
								float: left;
								height: 100%;
								cursor: pointer;
							}
							&.time {
								color: #999;
							}
						}
					}
					.table-title {
						//   height:60px;
						// .fileName{ width:310px;}
						// .fileSize{ width:205px;}
						// .fileType{ width:205px;}
						// .fileState{ width:180px;}
						// .fileOperate{ width:120px;}
						// .fileRecover{ width:160px;}
					}
					.table-cont {
						height: 50px;
					}
				}
			}
			.jbf-table-body {
				height: 590px;
				overflow: auto;
			}
		}
		.body-page {
			margin-top: 10px;
		}
	}
	
	.no-cursor {
		color: #c1c1c1;
	}
	
	.cursor {
		cursor: pointer;
		width: 217px;
		text-decoration: underline;
	}
</style>
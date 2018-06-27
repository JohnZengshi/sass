<template>
	<el-dialog class="order-product-list-dialog" title="商品标签" v-model="isShown" @open="loadData" @close="reset" :close-on-click-modal="false" size="large">
		<div class="content">
			<div class="menu-bar">
				<!--<el-input v-model="searchText" class="search-input" :autofocus="true" icon="search" :on-icon-click="search"></el-input>-->
				<div class="ordNum">单号：<span>{{orderNum}}</span></div>
				<label>模板</label>
				<el-select class="template-selector" v-model="templateId" placeholder="请选择">
					<template v-for="k in templateList">
						<el-option :label="k.templateName" :value="k.templateId">
						</el-option>
					</template>
				</el-select>
				<el-button class="preview-btn" @click="preview(false)">预览</el-button>
				<el-radio-group v-model="radio" @change="radioChange()">
					<el-radio :label="1">全选打印</el-radio>
					<el-radio :label="2">打印行范围：</el-radio>
				</el-radio-group>
				<input @blur="value1Blur()" class="printInput" v-model="value1" ref="inp1" />
				<span class="simpleFont">至</span>
				<input @blur="value2Blur()" ref="inp2" v-model="value2" class="printInput" />
			</div>
			<div class="product-list-table-wrap">
				<table class="product-list-table" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<td class="checkbox"></td>
							<td>序号</td>
							<td>条码号</td>
							<td>当前状态</td>
							<td>首饰名称</td>
							<td>总件重（g）</td>
							<td>售价（元）</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="product in productList" v-if="isShown">
							<td class="checkbox"><input class="inp-checkbox" type="checkbox" :checked="selectedProducts.includes(product.productId)" @change="toggleProduct(product.productId)" /></td>
							<td class="num">{{ product.num }}</td>
							<td class="barcode">{{ product.barcode }}</td>
							<td class="status">{{ getStatus(product.status) }}</td>
							<td class="jewelry">{{ product.jewelry }}</td>
							<td class="weight">{{ product.weight }}g</td>
							<td class="price">¥{{ product.price }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, slot, prev, pager, next, jumper" :total="totalNum">
				<span class="page-size">{{pageSize}}条/页</span>
			</el-pagination>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="preview(true)">打 印</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import Vue from 'vue'
	import {
		Dialog,
		Button,
		Input,
		Pagination
	} from 'element-ui'
	import find from 'lodash/find'
	import { seekGetPrintLabelByOrder } from './../../Api/commonality/seek'
	Vue.use(Dialog)
	Vue.use(Button)
	Vue.use(Input)
	Vue.use(Pagination)

	export default {
		data() {
			return {
				isShown: false,
				currentPage: 1,
				pageSize: 10,
				searchText: '',
				templateId: '',
				selectedProducts: [],
				radio: "0",
				isChecked: false,
				isIndeterminate: false,
				value1: null,
				value2: null,
				isAll: false,
				allProduceList: [],
				templateList: []
			}
		},
		props: ['labelTemplateList', 'productList', 'orderNum', 'totalNum'],
		watch: {
			labelTemplateList: function() {
				let defaultTemplate = find(this.labelTemplateList, {
					defaultFlag: 'Y'
				})
				if(defaultTemplate) {
					this.templateId = defaultTemplate.templateId
				}

				this.templateList = this.labelTemplateList
			},
			value1() {
				this.printRange()

			},
			value2() {
				if(this.value2 > this.totalNum) this.value2 = this.totalNum
				//if( this.value2 <= 0 ) this.value2 = 1
				this.printRange()
			}
		},

		methods: {
			getStatus(status) {
				switch(status) {
					case '10':
						return '已入库';
					case '11':
						return '入库中';
					case '20':
						return '已退库';
					case '21':
						return '退库中';
					case '30':
						return '已修改';
					case '31':
						return '修改中';
					case '40':
						return '已调库';
					case '41':
						return '调库中';
					case '50':
						return '已发货';
					case '51':
						return '发货中';
					case '52':
						return '发货审核';
					case '60':
						return '已退货';
					case '61':
						return '退货中';
					case '62':
						return '退货审核';
					case '70':
						return '已调柜';
					case '71':
						return '调柜中';
					case '80':
						return '已销售';
					case '81':
						return '销售中';
					case '90':
						return '已退换';
					case '91':
						return '退换中';
					case '100':
						return '店铺收货';
					case '101':
						return '仓库收货';
				}
			},
			value1Blur() {
				if(this.value1 < 1) {
					this.value1 = 1
				}
			},
			value2Blur() {
				if(Number(this.value2) < Number(this.value1)){
					this.$store.dispatch('workPopupError', '数值不能小于前一个数值')
				} else if(this.value2 > this.totalNum) {
					this.value2 = this.totalNum
				}
			},
			printRange() {
				if((this.value1 != null && this.value1 != '') &&
					(this.value2 != null && this.value2 != '')
				) {
					this.selectPartOfProducts(this.value1, this.value2)
				}
			},
			getOrderLabel() {
				let options = {
					orderNum: this.orderNum,
					page: 1,
					pageSize: 9999
				}
				seekGetPrintLabelByOrder(options).then((res) => {
					this.allProduceList = res.data.data.productList;
					if(this.radio == 1) {
						//this.isChecked = true;
						this.isChecked = true;
						this.selectedProducts = this.allProduceList.map(product => product.productId)
						this.$refs.inp1.disabled = "disabled"
						this.$refs.inp2.disabled = "disabled"
						this.value1 = "";
						this.value2 = "";
					} else {
						this.selectedProducts = []
						this.isChecked = false;
						this.$refs.inp1.disabled = ""
						this.$refs.inp2.disabled = ""
					}

				}, (res) => {})
			},
			radioChange() {
				this.getOrderLabel();
				if(this.radio == '0') {
					this.selectedProducts = [];
				}
			},
			close() {
				this.isShown = false
				this.radio = '0'
				this.value1 = null
				this.value2 = null
			},
			show() {
				this.isShown = true
				window.addEventListener('keydown', this.keydownHandler)
			},
			reset() {
				this.currentPage = 1
				this.searchText = ''
				this.selectedProducts = []
				window.removeEventListener('keydown', this.keydownHandler)
			},
			//按下回车搜索商品
			keydownHandler(e) {
				if(e.keyCode == 13) {
					this.search()
				}
			},
			loadData() {
				this.$emit('requestProductList', {
					orderNum: this.orderNum,
					page: this.currentPage,
					pageSize: this.pageSize
				})
			},
			search() {
				this.currentPage = 1
				if(this.searchText) {
					this.$emit('requestProductList', {
						searchKey: this.searchText,
						page: this.currentPage,
						pageSize: this.pageSize
					})
				} else {
					this.$emit('requestProductList', {
						orderNum: this.orderNum,
						page: this.currentPage,
						pageSize: this.pageSize
					})
				}
			},
			//选中某个商品
			toggleProduct(productId) {
				this.radio = "0";
				if(this.selectedProducts.includes(productId)) {
					let i = this.selectedProducts.indexOf(productId)
					this.selectedProducts.splice(i, 1)
				} else {
					this.selectedProducts.push(productId)
				}
			},
			//全选商品
			toggleSelectAllProducts() {
				if(this.selectedProducts.length == this.productList.length) {
					this.selectedProducts = []
					this.isAll = false;
				} else {
					this.selectedProducts = this.productList.map(product => product.productId)
					this.isAll = true;
				}
			},
			//选中从from到to个商品，包含第from和第to个
			selectPartOfProducts(from, to) {
				this.selectedProducts = this.allProduceList.slice(from - 1, to).map(product => product.productId)
			},
			//预览，是否马上打印
			preview(isPrint) {
				if(this.templateId) {
					if(!isPrint || this.selectedProducts.length) {
						if(this.radio == "2") {
							this.selectPartOfProducts(this.value1, this.value2)
						}
						let selectedProducts = _.map(this.productList,(v)=>{
							if(_.includes(this.selectedProducts, v.productId)){
								return v.productId;
							}
						})
						this.$store.dispatch('previewTemplate', this.templateId).then(json => {
							if(json.state == 200) {
								let canvas = json.data.content
								this.$emit('getPrintLabelData', this.radio, this.orderNum,this.value1, this.value2, JSON.parse(canvas), selectedProducts, isPrint)
							}
						})
					} else {
						this.$store.dispatch('workPopupError', '请先选择打印商品')
					}
				} else {
					this.$store.dispatch('workPopupError', '请选择打印模板')
				}
			},
			//改变页码后重新请求列表
			handleCurrentChange(page) {
				this.currentPage = page
				if(this.searchText) {
					this.$emit('requestProductList', {
						searchKey: this.searchText,
						page: this.currentPage,
						pageSize: this.pageSize
					})
				} else {
					this.$emit('requestProductList', {
						orderNum: this.orderNum,
						page: this.currentPage,
						pageSize: this.pageSize
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "~assets/css/template/mixin.scss";
	@import "~assets/css/template/fonts.scss";
	@import "~assets/css/template/colors.scss";
	.el-select-dropdown {
		z-index: 9999!important;
	}
	
	.order-product-list-dialog {
		@import "~assets/css/template/dialog.scss";
		.el-dialog {
			width: 1000px;
			.el-dialog__header {
				.el-dialog__headerbtn {
					margin-top: 13px;
				}
			}
			.el-dialog__body {
				padding: 0;
				.content {
					.menu-bar {
						padding: 20px 30px;
						.ordNum {
							display: inline-block;
							span {
								color: #2993f8;
							}
							margin-right:20px;
						}
						.printInput {
							width: 50px;
							border: 1px solid #ddd;
							padding: 3px 10px;
							border-radius: 4px;
							text-align: center;
						}
						.simpleFont {
							margin: 0 10px;
						}
						label {
							margin-right: 10px;
						}
						>.el-input,
						>.el-select {
							width: 300px;
							margin-right: 30px;
							.el-input__inner {
								height: 30px;
								@include BD1;
								@include TC1;
								&:focus,
								&:hover {
									@include BD1;
								}
							}
						}
						.template-selector {
							margin-right: 20px;
							width: 260px;
						}
						.preview-btn {
							padding: 7px 15px;
							@include TC4;
							border: 1px solid $C1;
						}
					}
					.product-list-table-wrap {
						height: 495px;
						.product-list-table {
							width: 100%;
							margin-bottom: 20px;
							thead {
								background-color: #e8e9eb;
								td {
									height: 44px;
									@include F(12);
									@include TC2;
									font-weight: bold;
								}
								.checkbox {
									width: 130px;
								}
							}
							tbody {
								tr {
									height: 45px;
									td {
										height: 44px !important;
										line-height: 44px;
										border-bottom: 1px solid #d6d6d6;
									}
									.checkbox {
										width: 130px;
										input[type="checkbox"] {
											display: block;
											width: 20px;
											height: 20px;
											margin-left: 50px;
											@include BD1;
											border-radius: 50%;
										}
										// .el-checkbox{margin-left:50px;}
										//  input[type="checkbox"]:after {
										//     content:"";
										//     display:block;
										//     width:18px; height:18px;
										//     border:1px solid #46c4b4;
										//     border-radius:50%;
										//  }
									}
									.num {
										width: 104px;
										@include F(12);
										font-weight: bold;
									}
									.barcode {
										width: 136px;
									}
									.status {
										width: 128px;
									}
									.weight {
										width: 116px;
									}
									.price {}
								}
							}
						}
					}
					.el-pagination {
						text-align: center;
						.page-size {
							margin-right: 10px;
						}
						.el-pager {
							.number {
								@include TC2;
								@include F(12);
								@include BD1;
								border-right: 0;
								background-color: #fff;
								&.active {
									@include TC4;
								}
								&:last-child {
									border-right: 1px solid #d6d6d6;
								}
							}
						}
						button {
							color: $C3;
							&:focus,
							&:hover {
								color: $C3;
							}
						}
						.el-pagination__jump {
							.el-pagination__editor {
								@include BD1;
								@include TC1;
								&:focus,
								&:hover {
									@include BD1;
								}
							}
						}
					}
				}
			}
		}
	}
	
	.el-icon-close:hover {
		color: #2993f8 !important;
	}
</style>
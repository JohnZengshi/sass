<template>
	<div class="dg-container">
		<!--表头-->
		<dgridhead @updetaFixedSize="updetaFixedSize" @updateTabChangeData="updateSmallData">
		</dgridhead>

		<div class="datagrid-container" :class="{[!browserType ? 'animat-scroll-firefox' : 'animat-scroll']:slipPointer}" v-show="dgDataList.length > 0 " @scroll="watchScroll($event)" :style="'padding-left:'+ fixedFullSize +'px'" ref="datagrid">
			<!--左边固定表格区-->
			<dgridBody @addRow="add" :dgDataList="dgDataList" :synopsiData="synopsiData" ref="dgridfixed" :orderNum="orderNum" :smallDataList="smallDataList" :selectContainer="selectContainer" :addDatalist="addDatalist" @deletegoods="deletegoods" @updataSelectContainer="updataSelectContainer" @updataEditApi="updataEditApi" @updateActiveIndex="updateActiveIndex" @updateActiveSelectOn="updateActiveSelectOn" :activeClassIndex="activeClassIndex" @deleteRefresh="deleteRefresh" :fixedFullSize="fixedFullSize">
			</dgridBody>
		</div>
		<div v-show="dgDataList.length <= 0 " class="datagrid-empty">
			<img class="empty-img" src="../../../../assets/img/empty.png" />
			<div class="empty-add-btn">
				<span class="btn" :class="emptyAddClass" ref="emptyTranslate" title="添加商品" v-if="isShow && curStatus.nowStatus == 1" @click="add">添加商品</span>
			</div>
		</div>

		<!--表尾-->
		<dgridfooter :isRefreshFooter="isRefreshFooter" :smallDataList="smallDataList" ref="footer" @setSynopsiData="updataSynopsiData" :orderNum="orderNum">
		</dgridfooter>

	</div>
</template>

<script>
	import _ from "lodash"
	import dgridhead from './dgridHeader'
	import dgridBody from './dgridBody'
	import dgridfooter from './dgridFooter'
	import { seekNewGoodsInfoList } from 'Api/commonality/seek'
	import datagridScroll from 'assets/js/uiScroll'
	import * as configData from './config'
	import * as fetch from './fetchData'
	export default {
		data() {
			return {
				dgDataList: [],
				configData: configData,

				// 左边表格固定区域默认宽度
				fixedFullSize: 290,

				activeSelectOnIndex: -1,
				// 当前鼠标滑过的列
				activeClassIndex: -1,
				// 小类
				smallDataList: configData.jewelryNameData,

				//浏览器检测
				browserType: false,

				//新增过的商品
				addDatalist: [],

				synopsiData: {},

				selectContainer: {
					selectfIndex: -1,
					selectcIndex: -1,
					fixedfIndex: -1,
					fixedcIndex: -1
				},
				pageNum: 1,
				pageSize: 12,
				emptyAddClass: ''
			}
		},
		components: {
			dgridhead,
			dgridBody,
			dgridfooter
		},

		props: ['orderNum', 'slipPointer', 'goodsAdd', 'copyDataList', 'isRefreshFooter', 'curStatus', 'isShow'],

		watch: {
			datagridSelectData: function() {},

			// 新增商品
			'goodsAdd.type': function() {
				if(this.goodsAdd.type) this.addGoods();
			},

			copyDataList: function() {
				if(this.copyDataList.length > 0) {
					let tpArray = [...this.copyDataList, this.dgDataList]
					this.dgDataList = tpArray
					this.$emit('updataData', {
						key: 'dgDataList',
						data: this.dgDataList
					})
				}
			},

			// 监听表格数据
			dgDataList() {}
		},

		created() {
			// 简单检测浏览器 表格底部高度填充，主要对firefox进行操作
			this.$store.dispatch('checkBrowser', (type) => {
				this.browserType = type
			})
		},

		methods: {
			deleteRefresh() {
				this.addDatalist = []
			},
			watchScroll(el) { // 下拉加载数据
				let scrollHeight = el.target.scrollHeight; // 元素可以滚动的高度
				let clientHeight = el.target.clientHeight; // 元素的高度
				let scrollTop = el.target.scrollTop; // 滚动了的距离
				if(clientHeight + scrollTop >= scrollHeight) {
					this.pageNum += 1;
					this.fetchGoodList()
				}
			},
			//
			add(){
				if(this.$refs.emptyTranslate) {
					clearInterval(window.empty_setInterval)
					this.emptyAddClass = 'translate'
					window.empty_setInterval = setTimeout(() => {
						this.emptyAddClass = ''
						clearTimeout(window.empty_setInterval)
						this.$emit('add', 1)
					}, 500)

				}

			},
			// 
			refresh(){
				seekNewGoodsInfoList({
					page: 1,
					pageSize: this.pageNum * this.pageSize,
					orderNum: this.orderNum
				}).then((res) => {
					if(res.data.state == 200) {
						this.dgDataList = res.data.data.rowDataList;
						this.$emit('updataData', {
							key: 'dgDataList',
							data: this.dgDataList
						})
					}
					this.$emit('updataLoader', false)
				})
			},
			// 获取商品列表
			fetchGoodList() {
				this.$emit('updataLoader', true)
				seekNewGoodsInfoList({
					page: this.pageNum,
					pageSize: this.pageSize,
					orderNum: this.orderNum
				}).then((res) => {
					if(res.data.state == 200) {
						this.dgDataList = _.concat(this.dgDataList, res.data.data.rowDataList)
						this.$emit('updataData', {
							key: 'dgDataList',
							data: this.dgDataList
						})
					} else if(res.data.state == 815) { // 返回空数组
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
					}
					this.$emit('updataLoader', false)
				}).catch((res) => {
					this.$message({
						type: 'error',
						message: 'seekNewGoodsInfoList：data is null'
					})
				})
			},

			// 更新表格固定区域宽度 需要根据配置文件动态去计算
			updetaFixedSize(size) {
				this.fixedFullSize = size
			},

			// 更新小类配置项数据
			updateSmallData(data) {
				this.smallDataList = data
			},
			// 更新鼠标滑过表格单元格的index值 主要用于高亮显示 此方法公用
			updateActiveIndex(index) {
				this.activeClassIndex = index
			},

			// 更新单据简介数据
			updataSynopsiData(data) {
				this.synopsiData = data
				this.$emit('setSynopsiData', data)
			},

			// 当前选中的表格
			updateActiveSelectOn(parm) {
				this.$emit('updataCopyOrderObject', parm.item)
				this.activeSelectOnIndex = parm.index
			},

			// select下拉配置项
			updataSelectContainer(data) {
				if(data) {
					this.selectContainer = Object.assign({}, data)
				}
			},

			// 编辑、新增功能
			updataEditApi(data) {
				// 编辑保存商品, 只需判断新增商品list是否为空
				if(this.addDatalist.length == 0) {
					fetch.updataGoodsList({
						orderNum: this.orderNum,
						confirmType: '0',
						alterList: Array.isArray(data) ? data : [data]
					}, (res) => {
						if(res.data.state == 200) {
							this.$message({
								type: 'success',
								message: '编辑成功'
							})
							if(this.activeSelectOnIndex >= 0 && this.dgDataList.length >= this.activeSelectOnIndex) {
								this.$emit('updataCopyOrderObject', this.dgDataList[this.activeSelectOnIndex])
							}
							// 选中证书名的时候要执行刷新商品列表 
							if(Object.keys(data).includes('certifiName')) {
								this.refresh();
							}
							
							this.$refs.footer.fetchNewFootData()

						} else {
							this.$message({
								type: 'warning',
								message: res.data.msg
							})
						}

					})
				}
				/*
				 * 调整批量修改后，这里不做新增
				 * else{
				  // 新增保存
				  this.$emit('updataAddDataList', this.addDatalist)
				}*/
			},
			/**
			 * 刷新页尾
			 */
			fetchFootData() {
				this.$refs.footer.fetchNewFootData();
			},
			addDataObj(item){
				this.dgDataList.push(item);
				this.addDatalist.push(item);
				this.$emit('updataAddDataList', this.addDatalist)
			},
			// 新增商品
			addGoods() {
				//let tpArray = []
				let newgoodsObj = Object.assign({}, fetch.addOrderDefaultJSON)
				// 把新增的商品放在数组的最前面
				//tpArray.push(newgoodsObj, ...this.dgDataList)
				this.dgDataList.push(newgoodsObj); // = tpArray;
				this.addDatalist.push(newgoodsObj);
				this.$emit('updataAddDataList', this.addDatalist)

				// 新建商品之后设置false 避免多次新建
				this.$emit('updataAdd', {
					type: false,
					index: this.goodsAdd.index
				})
			},
			/**
			 * 删除商品
			 */
			deletegoods(index) {
				let addDatalistIndex = index + this.addDatalist.length - this.dgDataList.length;
				this.addDatalist.splice(addDatalistIndex, 1);
				this.dgDataList.splice(index, 1);
				this.$emit('updataAddDataList', this.addDatalist);
				this.$emit('updataData', {
					key: 'dgDataList',
					data: this.dgDataList
				});
				this.fetchFootData();
			},
			modelInit() {
				this.$mount(['.datagrid-container'])
				this.fetchGoodList()
				// 监听滚动条跟鼠标滚轮 对页面进行上滑、下滑操作
				let datagrid = this.datagridScroll = new datagridScroll(this.$refs.datagrid)

				datagrid.scroll = (evt, num, wheel) => {
					// 状态栏显示 页面进行下滑
					if(num < 10 && wheel == 1) {
						this.$emit('updataSlipPointer', false)
					} else if(num >= 10 && wheel == -1) { // 状态栏隐藏 页面上滑
						this.$emit('updataSlipPointer', true)
					}
				}
				// }, 1000)

			}

		},
		updata() {

		},
		mounted() {
			this.$nextTick(() => {
				this.modelInit()
			})
		}

	}
</script>

<style lang="scss" scoped>
	.dg-container {
		background-color: #fff;
		min-height: 450px;
		border-radius: 10px;
	}
	/* 表格主容器  */
	
	.datagrid-container {
		height: 430px;
		background-color: #fff;
		//transition: all .5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
		position: relative;
		overflow: auto;
		&.animat-scroll {
			height: 600px;
		}
		&.animat-scroll-firefox {
			height: 550px;
		}
	}
	/* 空数据样式 */
	
	.datagrid-empty {
		height: 430px;
		background-color: #fff;
		.empty-img {
			display: block;
			margin: 30px auto 0 auto;
		}
		.empty-add-btn {
			text-align: center;
			position: relative;
			>.btn {
				position: absolute;
				display: inline-block;
				background-color: #2993f8;
				height: 28px;
				line-height: 28px;
				bottom: -15px;
				right: 44.5%;
				font-size: 14px;
				cursor: pointer;
				width: 150px;
				color: #fff;
				//text-align: center;
				transform: translate(0, 0);
				/*translate(172px, -456px)*/
				border-radius: 5px;
				//transition: all .3s;
				&:hover {
					background-color: #1b82e5;
				}
				&.translate {
					animation: emptyAnimate 0.5s cubic-bezier(0.55, 0.09, 0.68, 0.53);
				}
			}
		}
	}
	
	@keyframes emptyAnimate {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(172px, -456px);
		}
	}
	
	@keyframes add {
		from {
			background-color: #ffba42;
		}
		25% {
			background-color: #fff;
		}
		50% {
			background-color: #ffba42;
		}
		75% {
			background-color: #fff;
		}
		to {
			background-color: transparent;
		}
	}
</style>

<style lang="scss">
	/* 右边动态表格区  */
	
	.dg_bd-container {
		>.dg_tr {
			display: flex;
			transition: all .3s;
			height: 50px;
			position: relative;
			>.dg_td {
				text-align: center;
				font-size: 13px;
				color: #333;
				display: flex;
				justify-content: center;
				align-items: center;
				word-wrap: break-word;
				word-break: break-all;
				>.edit-ipt {}
			}
			>.operate {
				position: absolute;
				right: 0;
				width: 60px;
				top: 0;
				height: 50px;
				background-color: rgba(0, 0, 0, .5);
				font-weight: normal;
				transition: all .4s;
				visibility: hidden;
				opacity: 0;
				>i {
					color: #fff;
					cursor: pointer;
					margin-right: 5px;
					transition: all .2s;
					vertical-align: middle;
					&.del {
						font-size: 15px;
					}
					&:hover {
						color: #2993f8;
					}
				}
			}
			&:nth-child(even) {
				background-color: #f4f4f4;
			}
			&.move {
				background-color: #e9e9e9;
				>.operate {
					visibility: visible;
					opacity: 1;
				}
			}
			&.selectOn {
				background-color: #fff0d7!important;
			}
			&.add {
				/*animation:add 1.5s ease-in-out .3s;*/
			}
		}
	}
	
	.datagrid-select-container {
		width: 140px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		transition: all .3s;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
		min-height: 40px;
		border-radius: 4px;
		opacity: 1;
		visibility: visible;
		>.item {
			text-align: left;
			height: 35px;
			line-height: 35px;
			font-size: 13px;
			color: #333;
			white-space: nowrap;
			padding-left: 10px;
			border-bottom: 1px solid #f1f2f3;
			border-left: 4px solid transparent;
			cursor: pointer;
			position: relative;
			&:hover {
				background-color: #f6f7f8;
				>.child-item {
					transform: translateY(0);
					opacity: 1;
					visibility: visible;
				}
			}
			&.active {
				color: #2993f8;
				border-left-color: #2993f8;
			}
			>.child-item {
				position: absolute;
				right: -140px;
				top: 0;
				width: 140px;
				transition: all .2s;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
				background-color: #fff;
				border-radius: 0 4px 4px 4px;
				overflow: hidden;
				max-height: 250px;
				overflow: hidden;
				overflow-y: auto;
				opacity: 0;
				visibility: hidden;
				transform: translateY(30px);
				>div {
					padding-left: 10px;
					height: 35px;
					line-height: 35px;
					border-left: 4px solid transparent;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					border-bottom: 1px solid #f1f2f3;
					&.active {
						color: #2993f8;
						border-left-color: #2993f8;
					}
				}
			}
		}
		&.overflow {
			max-height: 300px;
			overflow: hidden;
			overflow-y: auto;
			>.item {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
	
	.dg-select-container,
	.dg-select-edit-ipt {
		height: 28px;
		line-height: 28px;
		width: 100%;
		transition: all .3s;
		border-radius: 4px;
		min-width: 40px;
		border: 1px solid transparent;
		cursor: pointer;
		background-color: transparent;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		&.active {
			border: 1px solid #2993f8;
			background-color: #f4f9ff;
			&:after {
				opacity: 1;
				visibility: visible;
				transform: rotate(-180deg);
			}
		}
		&[type] {
			cursor: auto;
			box-sizing: border-box;
			margin: 0 3px;
			text-overflow: ellipsis;
			&:active,
			&:focus {
				border: 1px solid #2993f8;
				background-color: #f4f9ff;
			}
		}
		&:hover {
			border: 1px solid #2993f8;
			background-color: #f4f9ff;
			&:after,
			>.el-icon-circle-close {
				opacity: 1;
				visibility: visible;
			}
		}
	}
	
	.dg-select-container {
		position: relative;
		&:after {
			content: "\e61c";
			font-family: "iconfont" !important;
			font-style: normal;
			position: absolute;
			transition: all .3s;
			right: 4px;
			top: 0;
			opacity: 0;
			visibility: hidden;
		}
		>.el-icon-circle-close {
			position: absolute;
			transition: all .3s;
			right: 4px;
			top: 6px;
			z-index: 2;
			opacity: 0;
			color: #ccc;
			visibility: hidden;
			&:hover {
				color: #2993f8;
			}
		}
		&.isicon {
			&:after {
				opacity: 0;
				visibility: hidden;
			}
		}
	}
</style>
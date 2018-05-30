<template>
	<div class="detail-wrap">
<!-- 		<div class="remark-wrap" :style="remarkStyle">
			{{remarkStyle}}
		</div> -->
		<div class="detail-top">

			<div class="jewelryName" :title="item.jewelryName">{{item.jewelryName}}</div>
			
			<div class="tag">
				<span style="color:#2993f8; background:#e5f3ff; margin-right: 8px;">
						{{goodTypeText}}
				</span>

				<span style="color:#ff607e; background:#ffe5ea; margin-right: 8px;">
						{{item.productName}}
				</span>

				<span v-if="item.productClass == '2'" style="color:#858bd7; background:#e5e7ff;">
						旧料
				</span>

				<span v-if="item.productClass == '1'" style="color:#858bd7; background:#e5e7ff;">
						成品
				</span>

			</div>

			<div v-if="status != 1" class="del-btn" @click="delGoods"></div>
			
			<div ref="remarkWrap" class="remark-tit" @click="openRemarkDialog(item)" @mouseenter="seekRemark(item)" @mouseleave="remarkOut">
		    <i class="iconfont icon-bianjixiugai move-sign"></i>
			</div>
		</div>
		<div class="detail-data">
			<div class="barcode">
				<span>条码号
					<i></i>
				</span>
				<div>{{item.barcode}}</div>
			</div>
			<!-- 会员积分抵扣 -->
			<div v-if="memberDataInfo.phone || item.offset !=0 " class="barcode">
				<span>积分抵扣
					<i></i>
				</span>
				<div>{{item.offset || 0}}</div>
				<i>元</i>
			</div>
			<!--*******************************重量***********************************-->
			<div v-if="item.productType == 1 || goodType == 3 && item.productType == 1" class="weight">
				<span>金重
					<i></i>
				</span>
				<div><span v-if="goodType == 2 && item.productType == 1 && item.productClass == 1||goodType ==1 && item.productType == 1 || status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' ||multipleIdentities == 'Y' && isOrderMan == false && status == 1 || isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5 && goodType != 3 && item.productType != 1">{{item.goldWeight}}</span><input v-else type="text" v-model="item.goldWeight" @keyup="computeFun(item, '金重')" @keyup.enter="sendData(item, '金重', item.calcMethod)" @blur="sendData(item, '金重', item.calcMethod)"></div>
				<i>g</i>
			</div>
			<div v-else class="weight">
				<span>件重
					<i></i>
				</span>
				<div><span v-if="goodType !=2 && item.productClass == 1 || goodType ==1 && item.productType != 1 ||status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N'|| multipleIdentities == 'Y' && isOrderMan == false|| goodType != 3 && status == 1">{{item.totalWeight}}</span><input v-else type="text" v-model="item.totalWeight" @keyup="computeFun(item, '件重')" @keyup.enter="sendData(item, '件重', item.calcMethod)" @blur="sendData(item, '件重', item.calcMethod)"></div>
				<i>g</i>
			</div>
			<div class="discount" v-if=" goodType == 2 && item.productType != 1  && item.productType != 3 && item.productClass == 2|| goodType == 3 && item.productType == 3 && item.productClass == 2|| goodType == 3 && item.productType == 2 && item.productClass == 2 || goodType == 2 && item.productType == 2 && item.productClass == 2 || goodType == 2 && item.productType == 3 && item.productClass == 2">
				<span>估价
					<i></i>
				</span>
				<div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.estimatePrice}}</span><input v-else type="text" v-model="item.estimatePrice"  @keyup="computeFun(item, '估价')" @keyup.enter="sendData(item, '估价', item.calcMethod)" @blur="sendData(item, '估价', item.calcMethod)"></div> <!--  :placeholder="unit1(item.discount)" -->
				<i>元</i>
			</div>
			<div v-if="item.productClass == 1 && goodType == 2 && item.productType != 1|| goodType == 1 && item.productType == 2 || goodType == 1 && item.productType == 3 || item.productType == 2  && goodTypeText == '退货' " class="gold-price">
				<span>标价
					<i></i>
				</span>
				<div>{{item.oldPrice}}</div>
				<i>元</i>
			</div>

			<div class="price" v-if="goodType == 2 && item.productType != 1 && item.productClass != '2'">
				<span>原售价
					<i></i>
				</span>
				<div><span>{{item.newPrice}}</span></div> <!--  :placeholder="unit4(item.newPrice)" -->
				<i>元</i>
			</div>
			<div v-if="goodType != 1" class="gold-price">
				<span>折旧
					<i></i>
				</span>
				<div>
					<span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 ||  companyPosition != 4 && companyPosition != 5  && multipleIdentities == 'N'|| multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.abrasion}}</span>
					<input v-else type="text" v-model="item.abrasion" @keyup="computeFun(item, '折旧')" @keyup.enter="sendData(item, '折旧', item.calcMethod)" @blur="sendData(item, '折旧', item.calcMethod)"></div> <!--  :placeholder="unit1(item.abrasion)" -->
				<i>%</i>
			</div>
			<div class="discount-weight" v-if="goodType != 1 && item.productType == 1">
				<span>折后金重
					<i></i>
				</span>
				<div><span>{{discontGoldWeight}}</span></div>
				<i>g</i>
			</div>
			<!--*******************************重量***********************************-->
			<!-- goodType:销售... productType: 素金... -->

			<div v-if="goodType != 1 && item.productType == 1" class="gold-price">
				<span>回购金价
					<i></i>
				</span>
				<div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5  && multipleIdentities == 'N'|| multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.exchangeGoldPrice}}</span><input v-else type="text" v-model="item.exchangeGoldPrice" @keyup="computeFun(item, '回购金价')" @keyup.enter="sendData(item, '回购金价', item.calcMethod)" @blur="sendData(item, '回购金价', item.calcMethod)"></div> <!--  :placeholder="unit2(item.exchangeGoldPrice)" -->
				<i>元/g</i>
			</div>
			<!--*******************************价格***********************************-->
			<div v-if="item.productType == 1 && goodType == 1" class="gold-price">
				<span>金价
					<i></i>
				</span>
				<div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.saleGoldPrice}}</span><input v-else type="text" v-model="item.saleGoldPrice" @keyup="computeFun(item, '金价')" @keyup.enter="sendData(item, '金价', item.calcMethod)" @blur="sendData(item, '金价', item.calcMethod)"></div>
				<i>元/g</i>
				<!--	<span class="switch">开</span>-->
			</div>
			
			<!--*******************************价格***********************************-->
			
			<div class="discount" v-if="goodType == 1">
				<span>折扣
					<i></i>
				</span>
				<div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.discount}}</span>
					<input v-else type="text" v-model="item.discount"  @keyup="computeFun(item, '折扣')" @keyup.enter="sendData(item, '折扣', item.calcMethod)" @blur="sendData(item, '折扣', item.calcMethod)">
				</div> <!--  :placeholder="unit1(item.discount)" -->
				<i>%</i>
			</div>
			<div class="manual-fee" v-if="item.productType == 1 && goodType== 1 || item.productType == 1 && goodType == 3 || goodType == 2 || goodType == 3">
				<span>手工费
					<i></i>
				</span>
				<div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.paymentPrice}}</span><input v-else type="text" v-model="item.paymentPrice" @keyup="computeFun(item, '手工费')" @keyup.enter="sendData(item, '手工费', item.calcMethod)" @blur="sendData(item, '手工费', item.calcMethod)"></div> <!--  :placeholder="unit2(item.paymentPrice)" -->
				<i>{{item.calcMethod == 1 ? '元/g' : '元'}}</i>
				<span v-if="item.productType != 2 && item.productType != 3" class="switch1" :class="{active: goodType == 1 && item.productType == 1}" @click="switchMethods(13)"><img :src="item.calcMethod == 1 ? './../../../../../static/img/switch-zhong.png' : './../../../../../static/img/switch-jian.png'"></span>
			</div>
			<div class="price" v-if=" goodType == 1 ">
				<span>实售价
					<i></i>
				</span>
				<div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' &&  isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.price}}</span><input v-else type="text" v-model="item.price" @keyup="computeFun(item, '实售价')" @keyup.enter="sendData(item, '实售价', item.calcMethod)" @blur="sendData(item, '实售价', item.calcMethod)"></div> <!--  :placeholder="unit4(item.newPrice)" -->
				<i>元</i>
			</div>

			<!-- 换货 -->
			
			<div class="price" v-if="goodType != 1">
				<span>回购价
					<i></i>
				</span>
				<div style="margin-left: 16px;">

		<!-- 				<span v-if="status != 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5"> -->
                         <!-- v-bind:value="(item.price).indexOf('-')>0?item.price:'-'+item.price"  -->
						{{item.price?"-":""}}
						<input v-if="status == 2 && shopRole" type="text" v-model="item.price"  @keyup="computeFun(item, '回购价')" @keyup.enter="sendData(item, '回购价', item.calcMethod)" @blur="sendData(item, '回购价', item.calcMethod)">
                         <!-- v-model="item.price" -->
						<span v-else>
								-{{item.price}}
								<!-- {{(item.price).indexOf('-')>0?item.price:'-'+item.price}} -->
						</span>
					</div> <!--  :placeholder="unit4(item.price)" -->
				<i>元</i>
			</div>
			<!--*******************************价格***********************************-->
		</div>
		<remarkDialog ref="remarkDialogWrap"></remarkDialog>
	</div>
</template>
<script>
import remarkDialog from './../base/remarkDialog'
import { operateUpdateSell, operateProductList } from './../../../../Api/commonality/operate'
import { seekAddProductToOrder } from './../../../../Api/commonality/seek'
import { SalePriceCalculatoin } from "@/tools/sale-price-calculation"
export default {
	props: [
		'item',
		'goodType',
		'orderNum',
		'orderManId', // 制单人
		'status',
		"shopRole",
		'mantissa', // 1.四舍五入 2.抹掉小数 3.不处理
		'memberDataInfo'
	],
	components: {
		remarkDialog
	},
	data() {
		return {
			isMove: false, // 处理定时器没到来回触发的bug
			goodTypeText: '',  // 商品类型
			productTypeText: '', // 产品类型
			modifyList: [],
			isOrderMan: false,
			companyPosition: '',
			multipleIdentities: '',
			discontGoldWeight: 0,
			rePrice: ''
		}
	},
	created() {
		this.getType(this.goodType)
		if (this.orderManId == sessionStorage.getItem('id')) {
			this.isOrderMan = true
		} else {
			this.isOrderMan = false
		}
		this.companyPosition = sessionStorage.getItem('companyPosition')
		this.multipleIdentities = sessionStorage.getItem('multipleIdentities')
		//this.addProductToOrder();
		this.discontGoldWeight = ((Number(this.item.abrasion) / 100) * Number(this.item.goldWeight)).toFixed(3)
		this.mantissaProcessing(this.discontGoldWeight)
	},
	mounted () {
		this.reLoadPrice()
	},
	watch: {
		item: function() {
			this.discontGoldWeight = ((Number(this.item.abrasion) / 100) * Number(this.item.goldWeight)).toFixed(3)
		}
	},
	computed: {
		isPrepareDocument () { // 制单人
			return this.orderManId == sessionStorage.getItem('id')
		}
	},
	methods: {
		fixPrice(price){
			if(price){
				return price.toString().indexOf('-')>=0?price:'-'+price;
			}else{
				return price;
			}
		},
		reLoadPrice (value) {
			if (this.item.recycleGoldPrice == undefined) {
				this.rePrice = this.item.exchangeGoldPrice
			} else {
				this.rePrice = this.item.recycleGoldPrice
			}
			//item.recycleGoldPrice == undefined ?  item.exchangeGoldPrice : item.recycleGoldPrice
		},
		mantissaProcessing (value) { // 尾数处理
			var val = ''
			switch (this.mantissa) {
				case '1':
					val = Math.round(value)
					break;
				case '2':
					val = parseInt(value)
					break;
				case '3':
					console.log('报错的参数',value)
					if(!isNaN(value)){
						val = value.toFixed(2)
					}
					break;
			}
			return val
		},
		delGoods () { // 删除商品
			this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(() => {
				this.productList()
			}).catch(() => {
								
			});
		},
		productList () { // 删除商品的请求
			let options = {
				productList: [
					{
						barcode: this.item.barcode
					}
				],
				orderNum: this.orderNum,
				operate: '2'
			}
			operateProductList(options).then((res) => {
				if (res.data.state == 200) {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.$emit('messageBack', '成功')
				} else {
					this.$message({
						type: 'info',
						message: '删除失败'
					}); 
				}
			}, (res) => {
				this.$message({
					type: 'info',
					message: res.data.msg
				});
			})
		},
		sendData (item, type, calcMethod) {
			if (this.mantissa == 1) {				item.price = Math.round(item.price)
			} else if (this.mantissa == 2) {
			}
			if (item.productType == 1) { // 素金
				if (type == '金价') {
					if (sessionStorage.getItem('companyPosition') == 5) {
						if (item.saleGoldPrice < item.lowestPrice) {
							this.$message({
								type: 'warning',
								message: '金价不可低于最低售价！'
							});
							this.$emit('messageBack', '成功')
							return
						}
					}
					this.modifyList.push(
						{
							modifyType: '01',
							dataType: '1',
							objectData: item.saleGoldPrice||0
						},
						{
							modifyType: '04',
							dataType: '1',
							objectData: item.price||0
						}
						)
				} else if (type == '折扣') {
					this.modifyList.push(
						{
							modifyType: '03',
							dataType: '1',
							objectData: item.discount||0
						},
						{
							modifyType: '04',
							dataType: '1',
							objectData: item.price||0
						}
						)
				}else if (type == '金重') {
					this.modifyList.push(
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						},
						{
							modifyType: '12',
							dataType: '2',
							objectData: item.goldWeight||0
						}
						)
				} else if (type == '折旧') {
					this.modifyList.push(
						{
							modifyType: '11',
							dataType: '2',
							objectData: item.abrasion||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
				} else if (type == '手工费') {
					if (this.goodType == 1) {
						this.modifyList.push(
						{
							modifyType: '02',
							dataType: '2',
							objectData: item.paymentPrice||0
						},
						{
							modifyType: '04',
							dataType: '2',
							objectData: item.price||0
						}
						)
					} else {
						this.modifyList.push(
						{
							modifyType: '02',
							dataType: '2',
							objectData: item.paymentPrice||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
					}
				} else if (type == '实售价') {
					this.modifyList.push(
						{
							modifyType: '03',
							dataType: '2',
							objectData: item.discount||0
						},
						{
							modifyType: '04',
							dataType: '2',
							objectData: item.price||0
						}
						)
				} else if (type == '回购价') {
					this.modifyList.push(
						{
							modifyType: '11',
							dataType: '1',
							objectData: item.abrasion||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
				} else if (type == '回购金价') {
					if (sessionStorage.getItem('companyPosition') == 5) {
						if (Number(item.recyclePrice) > 0 && Number(item.recycleGoldPrice) > (Number(item.recyclePrice) * 1.1)) {
							this.$message({
								type: 'warning',
								message: '回购金价不可高于上限的10%'
							});
							this.$emit('messageBack', '成功')
							return
						}
					}
					this.modifyList.push(
						{
							modifyType: '17',
							dataType: '2',
							objectData: item.exchangeGoldPrice||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
				}
			} else {
				if (type == '折扣' || type == '实售价') {
					this.modifyList.push(
						{
							modifyType: '03',
							dataType: '2',
							objectData: item.discount||0
						},
						{
							modifyType: '04',
							dataType: '2',
							objectData: item.price||0
						}
						)
				} else if (type == '折旧') {
					if ( this.goodType != 1 && this.item.productType != 1) { //this.item.productClass == 1 &&
						this.modifyList.push(
						{
							modifyType: '11',
							dataType: '2',
							objectData: item.abrasion||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
					} else {
						this.modifyList.push(
						{
							modifyType: '12',
							dataType: '2',
							objectData: this.discontGoldWeight||0
						},
						{
							modifyType: '11',
							dataType: '2',
							objectData: item.abrasion||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
					}
					
					//this.updateSell()
				} else if (type == '件重') {
					this.modifyList.push(
					{
						modifyType: '14',
						dataType: '2',
						objectData: item.totalWeight||0
					})
					//this.updateSell()
				} else if (type == '手工费') {
					if (this.goodType == 1) {
						this.modifyList.push(
						{
							modifyType: '02',
							dataType: '2',
							objectData: item.paymentPrice||0
						},
						{
							modifyType: '04',
							dataType: '2',
							objectData: item.price||0
						}
						)
					} else {
						this.modifyList.push(
						{
							modifyType: '02',
							dataType: '2',
							objectData: item.paymentPrice||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
					}
					
					//this.updateSell()
				} else if (type == '估价') {
					this.modifyList.push(
						{
							modifyType: '15',
							dataType: '2',
							objectData: item.estimatePrice||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
					//this.updateSell()
				} else if (type == '回购价') {
					this.modifyList.push(
						{
							modifyType: '11',
							dataType: '1',
							objectData: item.abrasion||0
						},
						{
							modifyType: '10',
							dataType: '2',
							objectData: item.price||0
						}
						)
					//this.updateSell()
				} 
			}
			this.updateSell()
		},
		updateSell(type, dataType, value) { // type = 操作类型 dataType = 数据类型 value = 值
			let options = {
				orderNum: this.orderNum,
				barcode: this.item.barcode,
				modifyList: this.modifyList
			}
			console.log('查看请求折扣参数:',options);
			operateUpdateSell(options).then((res) => {
				this.modifyList = []
				console.log('',res);
				if (res.data.state == 200) {
					this.$message({
						message: '修改成功',
						type: 'success'
					});
					this.$emit('messageBack', '成功')
					
				} else {
					this.$message({
						message: res.data.msg,
						type: 'warning'
					});
					this.$emit('messageBack', '失败')
				}
			}, (res) => {
				this.$message({
					message: res.data.msg,
					type: 'warning'
				});
			})
		},
		switchMethods(type) {
			if (this.status == 1) {
				return
			}
			if (this.mantissa == 1) {
				this.item.price = Math.round(this.item.price)
			}
			if (this.item.productType == 1) {
				if (this.item.calcMethod == 1) { // 计重
					this.item.calcMethod = 2
					this.item.price = (Number(this.item.goldWeight) * (Number(this.item.abrasion) / 100)) * Number(this.item.exchangeGoldPrice) - Number(this.item.paymentPrice)
					
				} else { // 计件
					this.item.calcMethod = 1
					this.item.price = Number(this.item.goldWeight) * (Number(this.item.abrasion) / 100) * Number(this.item.exchangeGoldPrice) - (Number(this.item.paymentPrice) * Number(this.discontGoldWeight))
					
				}
				this.modifyList.push(
					{
						modifyType: type,
						dataType: 1,
						objectData: this.item.calcMethod||0
					},
					{
						modifyType: '10',
						dataType: '2',
						objectData: this.item.price||0
					}
				)
				this.updateSell()
			} else {
				this.item.calcMethod = 2
			}
		},
		unit1(parm) { // %过滤
			return parm + '%'
		},
		unit2(parm) { // 元/g过滤
			return parm + '元/g'
		},
		unit3(parm) { // g过滤
			return parm + 'g'
		},
		unit4(parm) { // 元过滤
			return parm + '元'
		},
		getType(type) {
			if (type == 1) {
				this.goodTypeText = "销售"
			} else if (type == 2) {
				// this.goodTypeText = "换货"
				if (this.item.productClass == '2') {
					this.goodTypeText = "换货"
				} else {
					this.goodTypeText = "退货"
				}
			} else if (type == 3) {
				this.goodTypeText = "回收"
			}
		},
		computeFun(item, type) {
			SalePriceCalculatoin.calculatoin(this.goodType, item, type);
		},
		seekRemark (item) {
			this.isMove = true
			let bounding = this.$refs.remarkWrap.getBoundingClientRect()
			let datas = {
				status: this.status,
				showData: item,
				boundingData: {
					top: bounding.top + bounding.height + 10 + 'px',
					left: bounding.left - 18 + 'px',
					display: 'block'
				}
			}
			this.$emit('setBounding', datas)
		},
		// 鼠标移开后
		remarkOut (e) {
			this.isMove = false
      this.$emit('remarkOut')
		},
		openRemarkDialog (item) {
			if (this.status == 1) {
				return
			}
			this.$refs.remarkDialogWrap.open(item)
		}
	}
}
</script>
<style lang="scss" scoped>
.detail-wrap {
	width: 250px;
	height: 476px;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
	margin-right: 20px;
	display: inline-block;
	padding: 30px 18px;
	overflow: hidden;
	position: relative;
	.remark-wrap{
		border: 1px solid red;
		width: 100px;
		height: 100px;
		position: fixed;
		top: 0;
		z-index: 1000;
	}
	.detail-top {
		margin-bottom: 36px;
		.jewelryName {
			height: 29px;
			font-weight: bold;
			font-size: 22px;
			color: #2993f8;
			width: 180px;
			overflow:hidden;
			text-overflow: ellipsis;
		}
		.tag {
			padding-top: 12px;
			span {
				padding: 4px 10px;
				font-size: 10px;
				border-radius: 2px;
			}
		}
		.del-btn {
			width: 54px;
			height: 36px;
			position: absolute;
			right: 0px;
			top: 0px;
			background: url('./../../../../../static/img/delete_nor.png') no-repeat center center;
			cursor: pointer;
		}
		.del-btn:hover {
			background: url('./../../../../../static/img/delete_sel.png') no-repeat center center;
		}
		.remark-tit{
			width: 34px;
			height: 26px;
			line-height: 26px;
			position: absolute;
			right: 0px;
			top: 36px;
			border-radius: 20px 0 0 20px;
			background-color: #f6f6f6;
			cursor: pointer;
			text-align: center;
			transition: all .3s;
			>i{
				font-size: 16px;
				color: #999;
			}
			&:hover{
				width: 50px;
				i{
					color: #2993f8;
				}
			}
		}
		// .del-btn {
		// 	cursor: pointer;
		// 	height: 36px;
		// 	width: 36px;
		// 	background: url('./../../../../../static/img/nor.png') no-repeat center center;
		// 	position: absolute;
		// 	right: 10px;
		// 	top: 26px;
		// }
		// .del-btn:hover {
		// 	background: url('./../../../../../static/img/sel.png') no-repeat center center;
		// }
	}
	.detail-data {
		&>div {
			height: 30px;
			margin-bottom: 20px;
			position: relative;
			span {
				float: left;
				width: 55px;
				display: inline-block;
				height: 30px;
				text-align: justify;
				font-size: 14px;
				color: #333;
				overflow: hidden;
				vertical-align: top;
				line-height: 30px;
				i {
					display: inline-block;
					width: 100%;
					height: 0;
				}
			}
			i {
					position: absolute;
					right: 13px;
					top: 7px;
					font-size: 12px;
					font-style: normal;
				}
			&>div {
				float: left;
				margin-left: 25px;
				font-size: 14px;
				color: #333;
				position: relative;
				input {
					width: 120px;
					height: 30px;
					background: #f6f6f6;
					border-radius: 4px;
					padding-right: 10px;
					//padding-left: 8px;
				}
				i {
					position: absolute;
					right: 0;
					top: 7px;
					font-size: 12px;
					font-style: normal;
				}
				span {
				width: 110px;
				display: inline-block;
			}
			}
			.switch {
				float: left;
				width: 24px;
				height: 24px;
				cursor: pointer;
			}
			.switch1 {
				position: absolute;
				right: -18px;
				top: 0;
				// float: left;
				width: 30px;
				height: 30px;
				cursor: pointer;
			}
			.switch1.active {
				display: none;
			}
		}
		.barcode {
			&>div {
				height: 30px;
				line-height: 30px;
			}
		}
	}
}
</style>


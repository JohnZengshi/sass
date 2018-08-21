<template>
    <div class="detail-wrap" :class="isRelation">
        <!-- 		<div class="remark-wrap" :style="remarkStyle">
                    {{remarkStyle}}
                </div> -->
        <div class="detail-top">

            <div class="jewelryName-warp">
                <div class="jewelryName" :title="item.jewelryName">{{item.jewelryName}}</div>
                <span v-if="isEdit" @click="editJewelryName"></span>
            </div>

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

            <div class="botton-gruop">
                <el-popover ref="remark" class="remark-popover" placement="right-start" width="266" trigger="click">
                    <div class="laber">备注：</div>
                    <div class="textarea">
                        <span v-if="!textarea" @click="textareaInput">
                            {{remarks || "暂无"}}
                        </span> <textarea v-else rows="3" ref="textarea" @blur="textareaBlur" v-model="remarks"></textarea>
                    </div>
                </el-popover>
                <el-popover ref="related" placement="right-start" width="266" v-model="relatedShow" trigger="click">
                    <div class="related-title">
                        <p>关联换货商品</p>
                        <el-button type="primary" @click="relatedExchange" size="small" style="float:right;">创建补金重换货</el-button>
                    </div>
                    <div class="related-line"></div>
                    <ul class="related-warp">
                        <li v-for="(obj,index) in relationList" @click="sellRefConvert(obj.productId,'2')">
                            <div>{{obj.jewelryName}}</div>
                            <div>{{obj.barcode}}</div>
                        </li>
                    </ul>
                </el-popover>
                <el-button v-popover:remark class="sell-botton remark"></el-button>
                <el-button v-if="status != 1" @click="delGoods" class="sell-botton delete" title="删除"></el-button>
                <el-button @click="returnGoods" class="sell-botton exchange" v-if="status != 1 && goodType == '1' && item.isRelation != 'Y'" title="换货"></el-button>
                <template v-if="status != 1 && goodType == '1' && item.productType == '1' && !item.recycleProductId && item.isRelation != 'Y'">
                    <el-button v-if="relationList.length" @click="showPopover" v-popover:related class="sell-botton related-exchange related"></el-button>
                    <el-button v-else class="sell-botton related-exchange" @click="relatedExchange" title="创建补金重换货"></el-button>
                </template>

                <el-button @click="relieveRefConvert(0)" class="sell-botton cancel-related" v-if="status != 1 && goodType == '1' && item.recycleProductId" title="取消补金重换货"></el-button>
            </div>
        </div>
        <div class="detail-data" v-if="item.isRelation != 'Y'">
            <div class="barcode">
				<span>条码号
					<i></i>
				</span>
                <div>{{item.barcode}}</div>
            </div>

            <!--*******************************重量***********************************-->
            <div v-if="item.productType == 1 || goodType == 3 && item.productType == 1" class="weight">
				<span>金重
					<i></i>
				</span>
                <div><span v-if="goodType == 2 && item.productType == 1 && item.productClass == 1||goodType ==1 && item.productType == 1 || status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' ||multipleIdentities == 'Y' && isOrderMan == false && status == 1 || isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5 && goodType != 3 && item.productType != 1">{{item.goldWeight}}</span>
                    <input v-else type="text" v-model="item.goldWeight" @keyup="computeFun(item, '金重')" @keyup.enter="sendData(item, '金重', item.calcMethod)" @blur="sendData(item, '金重', item.calcMethod)">
                </div>
                <i>g</i>
            </div>
            <div v-else class="weight">
				<span>件重
					<i></i>
				</span>
                <div><span v-if="goodType !=2 && item.productClass == 1 || goodType ==1 && item.productType != 1 ||status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N'|| multipleIdentities == 'Y' && isOrderMan == false|| goodType != 3 && status == 1">{{item.totalWeight}}</span>
                    <input v-else type="text" v-model="item.totalWeight" @keyup="computeFun(item, '件重')" @keyup.enter="sendData(item, '件重', item.calcMethod)" @blur="sendData(item, '件重', item.calcMethod)">
                </div>
                <i>g</i>
            </div>
            <div class="discount" v-if=" goodType == 2 && item.productType != 1  && item.productType != 3 && item.productClass == 2|| goodType == 3 && item.productType == 3 && item.productClass == 2|| goodType == 3 && item.productType == 2 && item.productClass == 2 || goodType == 2 && item.productType == 2 && item.productClass == 2 || goodType == 2 && item.productType == 3 && item.productClass == 2">
				<span>估价
					<i></i>
				</span>
                <div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.estimatePrice}}</span>
                    <input v-else type="text" v-model="item.estimatePrice" @keyup="computeFun(item, '估价')" @keyup.enter="sendData(item, '估价', item.calcMethod)" @blur="sendData(item, '估价', item.calcMethod)">
                </div> <!--  :placeholder="unit1(item.discount)" -->
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
                    <input v-else type="text" v-model="item.abrasion" @keyup="computeFun(item, '折旧')" @keyup.enter="sendData(item, '折旧', item.calcMethod)" @blur="sendData(item, '折旧', item.calcMethod)">
                </div> <!--  :placeholder="unit1(item.abrasion)" -->
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
                <div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5  && multipleIdentities == 'N'|| multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.exchangeGoldPrice}}</span>
                    <input v-else type="text" v-model="item.exchangeGoldPrice" @keyup="computeFun(item, '回购金价')" @keyup.enter="sendData(item, '回购金价', item.calcMethod)" @blur="sendData(item, '回购金价', item.calcMethod)">
                </div> <!--  :placeholder="unit2(item.exchangeGoldPrice)" -->
                <i>元/g</i>
            </div>
            <!--*******************************价格***********************************-->
            <div v-if="item.productType == 1 && goodType == 1" class="gold-price">
				<span>金价
					<i></i>
				</span>
                <div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.saleGoldPrice}}</span>
                    <input v-else type="text" v-model="item.saleGoldPrice" @keyup="computeFun(item, '金价')" @keyup.enter="sendData(item, '金价', item.calcMethod)" @blur="sendData(item, '金价', item.calcMethod)">
                </div>
                <i>元/g</i>
                <!--	<span class="switch">开</span>-->
            </div>

            <!--*******************************价格***********************************-->

            <div class="discount" v-if="goodType == 1">
				<span>折扣
					<i></i>
				</span>
                <div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.discount}}</span>
                    <input v-else type="text" v-model="item.discount" @keyup="computeFun(item, '折扣')" @keyup.enter="sendData(item, '折扣', item.calcMethod)" @blur="sendData(item, '折扣', item.calcMethod)">
                </div> <!--  :placeholder="unit1(item.discount)" -->
                <i>%</i>
            </div>
            <div class="manual-fee" v-if="item.productType == 1 && goodType== 1 || item.productType == 1 && goodType == 3 || goodType == 2 || goodType == 3">
				<span>手工费
					<i></i>
				</span>
                <div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' && isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.paymentPrice}}</span>
                    <input v-else type="text" v-model="item.paymentPrice" @keyup="computeFun(item, '手工费')" @keyup.enter="sendData(item, '手工费', item.calcMethod)" @blur="sendData(item, '手工费', item.calcMethod)">
                </div> <!--  :placeholder="unit2(item.paymentPrice)" -->
                <i>{{item.calcMethod == 1 ? '元/g' : '元'}}</i> <span v-if="item.productType != 2 && item.productType != 3" class="switch1" :class="{active: goodType == 1 && item.productType == 1}" @click="switchMethods(13)">
                    <img :src="item.calcMethod == 1 ? '/static/img/switch-zhong.png' : '/static/img/switch-jian.png'">
                </span>
            </div>

            <!-- 会员积分抵扣 -->
            <div v-if="memberDataInfo.phone && item.offset != 0" class="barcode">
				<span>积分抵扣
					<i></i>
				</span>
                <div>-{{item.offset || 0}}</div>
                <i>元</i>
            </div>

            <div class="price" v-if=" goodType == 1 ">
				<span>实售价
					<i></i>
				</span>
                <div><span v-if="status == 1 || multipleIdentities == 'N' && isOrderMan == false && status == 1 || companyPosition != 4 && companyPosition != 5 && multipleIdentities == 'N' || multipleIdentities == 'Y' &&  isOrderMan == false && status == 1 && companyPosition != 4 && companyPosition != 5">{{item.price}}</span>
                    <input v-else type="text" v-model="item.price" @keyup="computeFun(item, '实售价')" @keyup.enter="sendData(item, '实售价', item.calcMethod)" @blur="sendData(item, '实售价', item.calcMethod)">
                </div> <!--  :placeholder="unit4(item.newPrice)" -->
                <i>元</i>
            </div>

            <!-- 换货 -->

            <div class="price" v-if="goodType != 1">
				<span>回购价
					<i></i>
				</span>
                <div style="margin-left: 16px;">
                    <template v-if="status == 2 && shopRole">
                        {{item.price?"-":""}}
                        <input type="text" :data-price="item.price" v-model="item.price" @keyup="computeFun(item, '回购价')" @keyup.enter="sendData(item, '回购价', item.calcMethod)" @blur="sendData(item, '回购价', item.calcMethod)">
                    </template>
                    <span v-else>
							-{{item.price}}
					</span>
                </div> <!--  :placeholder="unit4(item.price)" -->
                <i>元</i>
            </div>
            <!--*******************************价格***********************************-->
        </div>

        <div id="relation-list" class="detail-data" v-else>
            <div class="weight">
				<span>金重
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.goldWeight}}</span>
                    <input v-else type="text" v-model="item.goldWeight" @input="relationCalculation('goldWeight')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>g</i>
            </div>
            <div class="">
				<span>补金重
					<i></i>
				</span>
                <div>
                    {{item.repairGoldweight}}
                </div>
                <i>g</i>
            </div>
            <div class="">
				<span>补金价
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.repairGoldPrice}}</span>
                    <input v-else type="text" v-model="item.repairGoldPrice" @input="relationCalculation('repairGoldPrice')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>元/g</i>
            </div>
            <div class="">
				<span>补金价额
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.repairGoldPriceE}}</span>

                    <input v-else type="text" v-model="item.repairGoldPriceE" @input="relationCalculation('repairGoldPriceE')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>元</i>
            </div>
            <div class="">
				<span>补工费
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.paymentPrice}}</span>
                    <input v-else type="text" v-model="item.paymentPrice" @input="relationCalculation('paymentPrice')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>元/g</i> <span class="switch1" style="right: 17px;" @click="relationMethods">
                    <img :src="item.calcMethod == 1 ? '/static/img/switch-zhong.png' : '/static/img/switch-jian.png'">
                </span>
            </div>
            <div class="">
				<span>补工费额
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.repairFee}}</span>

                    <input v-else type="text" v-model="item.repairFee" @input="relationCalculation('repairFee')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>元</i>
            </div>
            <div class="">
				<span>补差价
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.differencePrice}}</span>

                    <input v-else type="text" v-model="item.differencePrice" @input="relationCalculation('differencePrice')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>元</i>
            </div>
            <div class="">
				<span>补差价额
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.differencePriceE}}</span>

                    <input v-else type="text" v-model="item.differencePriceE" @input="relationCalculation('differencePriceE')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>元</i>
            </div>
            <div class="">
				<span>换货价
					<i></i>
				</span>
                <div>
                    <span v-if="status == 1">{{item.exchangePrice}}</span>

                    <input v-else type="text" v-model="item.exchangePrice" @input="relationCalculation('exchangePrice')" @blur="sendExchangeData" @keyup.enter="sendExchangeData">
                </div>
                <i>元</i>
            </div>
            <div class="" style="margin-bottom:0;">
				<span>旧料价
					<i></i>
				</span>
                <div>
                    <span v-if="item.repairOldPrice > 0">- {{item.repairOldPrice}}</span> <span v-else>{{Math.abs(item.repairOldPrice)}}</span>
                </div>
                <i>元</i>
            </div>
        </div>

    </div>
</template>
<script>
import {seekSellReceiptsIntro, seekReceiptStatusList, seekGetShopUserList, seekGoodsList, seekSellProductList, seekSellcollectMoney, getProductTypeList, seekProductClassList, seekGetMemberInfo, seekGetUserInfo, seekOneProductStatus, seekSettingUserRole} from '@/Api/commonality/seek'
import {operateUpdateSell, operateProductList, operateSellRefConvert, operateAddBackBuyProductToOrder, operateRelieveRefConvert} from './../../../../Api/commonality/operate'
import {seekAddProductToOrder} from './../../../../Api/commonality/seek'
import {SalePriceCalculatoin} from "@/tools/sale-price-calculation"
import find from 'lodash/find'

export default {
    props: [
        'item',
        'goodType',
        'orderNum',
        'orderManId', // 制单人
        'status',
        "shopRole",
        'mantissa', // 1.四舍五入 2.抹掉小数 3.不处理
        'memberDataInfo',
        'relationList'
    ],
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
            rePrice: '',
            step: 1,
            textarea: false,
            remarks: '',
            relatedShow: false //关联换货弹窗显示
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
        this.discontGoldWeight = ((Number(this.item.abrasion) / 100) * Number(this.item.goldWeight)).toFixed(3)
        this.mantissaProcessing(this.discontGoldWeight)
    },
    mounted() {
        this.remarks = this.item.remarks;
        this.reLoadPrice();
    },
    watch: {
        item: function () {
            this.discontGoldWeight = ((Number(this.item.abrasion) / 100) * Number(this.item.goldWeight)).toFixed(3)
        }
    },
    computed: {
        //是否能更改产品类型
        isEdit() {
            if (this.status == 1) {
                return false;
            }
            if (this.goodType == '1' && this.item.isRelation != 'Y') {
                return false;
            }
            if (this.goodType == '2' && this.item.productClass == '1') {
                return false;
            }
            return true;
        },
        isPrepareDocument() { // 制单人
            return this.orderManId == sessionStorage.getItem('id')
        },
        isRelation() {
            let related = false;
            if (this.item.isRelation == 'Y' || this.item.index) {
                related = true;
            }
            return {
                'related-active': related
            }
        },
    },
    methods: {
        showPopover() {
            this.relatedShow = true;
        },
        textareaInput() {
            if (this.status == '1') {
                return;
            }
            this.textarea = true;
            this.$nextTick(() => {
                this.$refs.textarea.focus();
            })
        },
        textareaBlur() {
            if (this.remarks != this.item.remarks) {
                this.modifyList = [];
                this.modifyList.push({
                    modifyType: '18',
                    dataType: '1',
                    objectData: this.remarks
                })
                this.updateSell();
            }
            this.textarea = false;
        },
        editJewelryName() {
            eventBus.$emit('editJewelryName', this.item);
        },
        //解除关联
        relieveRefConvert(type = 0) {
            //type 0-解除关联， 1：删除单据的时候先要解除关联
            let productIdList = [];
            let recycleProductId = this.item.recycleProductId;
            if (this.item.isRelation == 'Y') {
                for (let obj of this.item.relationList) {
                    productIdList.push({
                        productId: obj.sellProductId
                    });
                }
                recycleProductId = this.item.productId;
            } else {
                productIdList.push({
                    productId: this.item.productId
                });
            }
            let data = {
                orderNum: this.orderNum,
                productIdList: productIdList,
                recycleProductId: recycleProductId
            }
            return operateRelieveRefConvert(data).then(res => {
                //type != 0 删除的时候调用解除，不需要其他操作
                if (res.data.state == 200 && type == 0) {
                    //删除商品解除关联
                    if (this.item.isRelation == 'Y' || (this.item.relationList && this.item.relationList.length == 1)) {
                        // eventBus.$emit('update-data-sell-List');
                        this.$emit('messageBack', '成功')
                    } else if (this.item.recycleProductId) {
                        let item = this.getExchangeById(this.item.recycleProductId);
                        if (item.relationList.length > 1) {
                            this.updataExchange();
                        } else {
                            this.$emit('messageBack', '成功')
                        }
                    }
                }
            })
        },
        getExchangeById(id) {
            for (let item of this.relationList) {
                if (item.productId == id) {
                    return item;
                }
            }
        },
        //更新关联换货 补金重和旧料价
        updataExchange(id) {
            //id添加关联商品id，有id为新增，无为取消关联
            let barcode = '';
            let [repairGoldweight, repairGoldPriceE, exchangePrice, repairOldPrice] = [0, 0, 0, 0];
            if (id) {
                let item = this.getExchangeById(id);
                repairGoldweight = +item.repairGoldweight + +this.item.goldWeight; //补金重
                repairGoldPriceE = this.dataProcessing(item.repairGoldPrice * repairGoldweight); //补价金额
                exchangePrice = this.mantissaProcessing(+repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                repairOldPrice = this.dataProcessing(+item.totalPrice + +this.item.price - exchangePrice);
                barcode = item.barcode;

            } else {
                let item = this.item.recycleList;
                repairGoldweight = item.repairGoldweight - this.item.goldWeight; //补金重
                repairGoldPriceE = this.dataProcessing(item.repairGoldPrice * repairGoldweight); //补价金额
                exchangePrice = this.mantissaProcessing(+repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                repairOldPrice = this.dataProcessing(+item.totalPrice - this.item.price - exchangePrice);
                barcode = item.barcode;
            }
            this.modifyList.push(
                {
                    modifyType: '21',
                    dataType: '1',
                    objectData: repairGoldweight
                },
                {
                    modifyType: '20', //补价金额
                    dataType: '1',
                    objectData: repairGoldPriceE
                },
                // {
                //     modifyType: '24',
                //     dataType: '1',
                //     objectData: differencePriceE
                // },
                {
                    modifyType: '25',
                    dataType: '1',
                    objectData: repairOldPrice || 0
                },
                {
                    modifyType: '10',
                    dataType: '1',
                    objectData: exchangePrice || 0
                }
            )
            this.updateSell(barcode);
        },
        clearNoNum(name) {
            let item = this.item;

            if (item[name] != '' && item[name].substr(0, 1) == '.') {
                item[name] = '';
            }
            item[name] = item[name].replace(/^0*(0\.|[1-9])/, '$1');    //解决 粘贴不生效
            item[name] = item[name].replace(/[^\d.-]/g, '');    //清除'数字'和'.','-'以外的字符
            item[name] = item[name].replace(/\.{2,}/g, '.');    //只保留第一个. 清除多余的
            item[name] = item[name].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            // item[name] = item[name].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');   //只能输入两个小数
            if (item[name].indexOf('.') < 0 && item[name] != '') {  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                if (item[name].substr(0, 1) == '0' && item[name].length == 2) {
                    item[name] = item[name].substr(1, item[name].length);
                }
            }
            if (item[name].at(0) == '-') {
                if (item[name].at(1) == '.') {
                    item[name] = item[name].replace(/\./g, '');
                }
                item[name] = item[name].replace(/\-/g, '');
                item[name] = '-' + item[name];
            } else {
                item[name] = item[name].replace(/\-/g, '');
            }

        },
        dataProcessing(num, n = 100) {
            num = parseFloat(num);
            if (isNaN(num)) {
                return;
            }
            num = Math.round(num * n) / n;
            return num;
        },
        relationCalculation(name) {
            // this.clearNoNum(name)
            let item = this.item;
            this.clearNoNum(name);
            //goldWeight           金重
            //repairGoldweight     补金重
            //repairGoldPrice      补金价
            //repairGoldPriceE     补金价额
            //paymentPrice         补工费
            //repairFee            补工费额
            //differencePrice      补差价
            //differencePriceE     补差价额
            //exchangePrice        换货价
            //repairOldPrice       旧料价
            //totalPrice           销售实售总价
            //totalGoldWeight      销售总金重
            switch (name) {
                case 'goldWeight': //金重
                    /**
                     * 旧料金重
                     输入后
                     补金重=销售金重-旧料金重
                     补金价额=补金价*补金重
                     补工费额=补工费*旧料金重
                     补差价额=补差价*补金重
                     换货价=补金价额+补工费额+补差价额；
                     旧料价=实售价-换货价
                     */
                    item.repairGoldweight = (item.totalGoldWeight - item.goldWeight).toFixed(3) || 0;
                    item.repairGoldPriceE = this.dataProcessing(item.repairGoldPrice * item.repairGoldweight);
                    item.repairFee = this.dataProcessing(item.paymentPrice * item.goldWeight);
                    item.differencePriceE = this.dataProcessing(item.differencePrice * item.goldWeight);
                    item.exchangePrice = this.mantissaProcessing(+item.repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    //补金重
                    break;
                case 'repairGoldPrice': //补金价
                    /**
                     * 默认获取第一个关联的销售的金价
                     输入后
                     补金价额=补金价*补金重
                     换货价=补金价额+补工费额+补差价额
                     旧料价=实售价-换货价
                     */
                    item.repairGoldPriceE = this.dataProcessing(item.repairGoldPrice * item.repairGoldweight);
                    item.exchangePrice = this.mantissaProcessing(+item.repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    break;
                case 'repairGoldPriceE': //补金价额
                    /**
                     * 补金价*补金重
                     输入后，
                     补金价=补金价额/补金重；
                     换货价=补金价额+补工费额+补差价额；
                     旧料价=实售价-换货价
                     * @type {number}
                     */
                    item.repairGoldPrice = this.dataProcessing(item.repairGoldPriceE / item.repairGoldweight);
                    item.exchangePrice = this.mantissaProcessing(+item.repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    break;
                case 'paymentPrice': //补工费
                    /**
                     * 补工费额（计重）=补工费*旧料金重；补工费额（计件）=补工费
                     手工费计重：换货价=补金价额+补工费额（补工费*旧料金重）+补差价额；
                     手工费计件：换货价=补金价额+补工费额（补工费）+补差价额；
                     旧料价=实售价-换货价
                     */
                    if (item.calcMethod == '1') {
                        item.repairFee = this.dataProcessing(item.paymentPrice * item.goldWeight);
                    } else {
                        item.repairFee = this.dataProcessing(item.paymentPrice);
                    }
                    item.exchangePrice = this.mantissaProcessing(+item.repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    break;
                case 'repairFee': //补工费额
                    /**
                     * 补工费=补工费额/旧料金重；补工费=补工费额
                     换货价=补金价额+补工费额+补差价额；
                     旧料价=实售价-换货价
                     */
                    if (item.calcMethod == '1') {
                        item.paymentPrice = this.dataProcessing(item.repairFee / item.goldWeight);
                    } else {
                        item.paymentPrice = this.dataProcessing(item.repairFee);
                    }
                    item.exchangePrice = this.mantissaProcessing(+item.repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    break
                case 'differencePrice': //补差价
                    /**
                     * 补差价额=补差价*补金重
                     换货价=补金价额+补工费额+补差价额；
                     旧料价=实售价-换货价
                     * @type {number}
                     */
                    item.differencePriceE = this.dataProcessing(item.differencePrice * item.goldWeight);
                    item.exchangePrice = this.mantissaProcessing(+item.repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    break;
                case 'differencePriceE': //补差价额
                    /**
                     * 补差价=补差价额/补金重
                     换货价=补金价额+补工费额+补差价额；
                     旧料价=实售价-换货价
                     * @type {number}
                     */
                    item.differencePrice = this.dataProcessing(item.differencePriceE / item.goldWeight);
                    item.exchangePrice = this.mantissaProcessing(+item.repairGoldPriceE + +item.differencePriceE + +item.repairFee);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    break;
                case 'exchangePrice': //换货价 data
                    /**
                     * 补金价=（换货价-补差价额-补工费额）/补金重
                     补金价额=补金价*补金重
                     旧料价=实售价-换货价
                     * @type {number}
                     */
                    item.repairGoldPrice = this.dataProcessing((item.exchangePrice - item.differencePriceE - item.repairFee) / item.repairGoldweight);
                    item.repairGoldPriceE = this.dataProcessing(item.repairGoldPrice * item.repairGoldweight);
                    item.repairOldPrice = this.dataProcessing(item.totalPrice - item.exchangePrice);
                    break;
            }
        },
        fixPrice(price) {
            if (price) {
                return price.toString().indexOf('-') >= 0 ? price : '-' + price;
            } else {
                return price;
            }
        },
        reLoadPrice(value) {
            if (this.item.recycleGoldPrice == undefined) {
                this.rePrice = this.item.exchangeGoldPrice
            } else {
                this.rePrice = this.item.recycleGoldPrice
            }
            //item.recycleGoldPrice == undefined ?  item.exchangeGoldPrice : item.recycleGoldPrice
        },
        mantissaProcessing(value) { // 尾数处理
            var val = ''
            switch (this.mantissa) {
                case '1':
                    val = Math.round(value)
                    break;
                case '2':
                    val = parseInt(value)
                    break;
                case '3':
                    console.log('报错的参数', value)
                    value = parseFloat(value)
                    if (!isNaN(value)) {
                        val = value.toFixed(2)
                    }
                    break;
            }
            return val
        },
        delGoods() { // 删除商品


            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                if (this.item.isRelation == 'Y') {
                    this.relieveRefConvert();
                } else if (this.item.recycleProductId) {
                    this.relieveRefConvert(1);
                    this.productList();
                } else {
                    this.productList();
                }
            }).catch(() => {

            });
        },
        productList() { // 删除商品的请求
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
                    if (this.item.recycleProductId) {
                        if (this.getExchangeById(this.item.recycleProductId).relationList.length > 1) {
                            let options = {
                                orderNum: this.orderNum,
                                barcode: this.item.recycleList.barcode,
                                modifyList: [
                                    {
                                        modifyType: '21',
                                        dataType: '1',
                                        objectData: this.item.recycleList.repairGoldweight - this.item.goldWeight
                                    },
                                    {
                                        modifyType: '25',
                                        dataType: '1',
                                        objectData: this.dataProcessing(this.item.recycleList.repairOldPrice - this.item.price)
                                    }
                                ]
                            }
                            operateUpdateSell(options).then((json) => {
                                this.modifyList = []
                            })
                        }

                    }

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

        sendExchangeData() {
            let item = this.item;

            /**
             * 1 四舍五入
             2 抹掉小数
             3 不处理
             //goldWeight           金重
             //repairGoldweight     补金重
             //repairGoldPrice      补金价
             //repairGoldPriceE     补金价额
             //paymentPrice         补工费
             //repairFee            补工费额
             //differencePrice      补差价
             //differencePriceE     补差价额
             //exchangePrice    换货价
             //repairOldPrice       旧料价
             //totalPrice                销售实售总价
             //totalGoldWeight      销售总金重
             */
            this.modifyList = [];
            this.modifyList.push(
                {
                    modifyType: '12',
                    dataType: '1',
                    objectData: item.goldWeight || 0
                },
                {
                    modifyType: '13',
                    dataType: 1,
                    objectData: item.calcMethod
                },
                {
                    modifyType: '21',
                    dataType: '1',
                    objectData: item.repairGoldweight || 0
                },
                {
                    modifyType: '19',
                    dataType: '1',
                    objectData: this.dataProcessing(item.repairGoldPrice) || 0
                },
                {
                    modifyType: '20',
                    dataType: '1',
                    objectData: this.dataProcessing(item.repairGoldPriceE) || 0
                },
                {
                    modifyType: '02',
                    dataType: '1',
                    objectData: this.dataProcessing(item.paymentPrice) || 0
                },
                {
                    modifyType: '22',
                    dataType: '1',
                    objectData: this.dataProcessing(item.repairFee) || 0
                },
                {
                    modifyType: '23',
                    dataType: '1',
                    objectData: this.dataProcessing(item.differencePrice) || 0
                },
                {
                    modifyType: '24',
                    dataType: '1',
                    objectData: this.dataProcessing(item.differencePriceE) || 0
                },
                {
                    modifyType: '25',
                    dataType: '1',
                    objectData: this.dataProcessing(item.repairOldPrice) || 0
                },
                {
                    modifyType: '10',
                    dataType: '1',
                    objectData: this.mantissaProcessing(item.exchangePrice) || 0
                },
            );
            this.updateSell();
        },
        sendData(item, type, calcMethod) {
            if (this.mantissa == 1) {
                item.price = Math.round(item.price)
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
                            objectData: item.saleGoldPrice || 0
                        },
                        {
                            modifyType: '04',
                            dataType: '1',
                            objectData: item.price || 0
                        }
                    )
                } else if (type == '折扣') {
                    this.modifyList.push(
                        {
                            modifyType: '03',
                            dataType: '1',
                            objectData: item.discount || 0
                        },
                        {
                            modifyType: '04',
                            dataType: '1',
                            objectData: item.price || 0
                        }
                    )
                } else if (type == '金重') {
                    this.modifyList.push(
                        {
                            modifyType: '10',
                            dataType: '2',
                            objectData: item.price || 0
                        },
                        {
                            modifyType: '12',
                            dataType: '2',
                            objectData: item.goldWeight || 0
                        }
                    )
                } else if (type == '折旧') {
                    this.modifyList.push(
                        {
                            modifyType: '11',
                            dataType: '2',
                            objectData: item.abrasion || 0
                        },
                        {
                            modifyType: '10',
                            dataType: '2',
                            objectData: item.price || 0
                        }
                    )
                } else if (type == '手工费') {
                    if (this.goodType == 1) {
                        this.modifyList.push(
                            {
                                modifyType: '02',
                                dataType: '2',
                                objectData: item.paymentPrice || 0
                            },
                            {
                                modifyType: '04',
                                dataType: '2',
                                objectData: item.price || 0
                            }
                        )
                    } else {
                        this.modifyList.push(
                            {
                                modifyType: '02',
                                dataType: '2',
                                objectData: item.paymentPrice || 0
                            },
                            {
                                modifyType: '10',
                                dataType: '2',
                                objectData: item.price || 0
                            }
                        )
                    }
                } else if (type == '实售价') {
                    this.modifyList.push(
                        {
                            modifyType: '03',
                            dataType: '2',
                            objectData: item.discount || 0
                        },
                        {
                            modifyType: '04',
                            dataType: '2',
                            objectData: item.price || 0
                        }
                    )
                } else if (type == '回购价') {
                    this.modifyList.push(
                        {
                            modifyType: '11',
                            dataType: '1',
                            objectData: item.abrasion || 0
                        },
                        {
                            modifyType: '10',
                            dataType: '2',
                            objectData: item.price || 0
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
                            objectData: item.exchangeGoldPrice || 0
                        },
                        {
                            modifyType: '10',
                            dataType: '2',
                            objectData: item.price || 0
                        }
                    )
                }
            } else {
                if (type == '折扣' || type == '实售价') {
                    this.modifyList.push(
                        {
                            modifyType: '03',
                            dataType: '2',
                            objectData: item.discount || 0
                        },
                        {
                            modifyType: '04',
                            dataType: '2',
                            objectData: item.price || 0
                        }
                    )
                } else if (type == '折旧') {
                    if (this.goodType != 1 && this.item.productType != 1) { //this.item.productClass == 1 &&
                        this.modifyList.push(
                            {
                                modifyType: '11',
                                dataType: '2',
                                objectData: item.abrasion || 0
                            },
                            {
                                modifyType: '10',
                                dataType: '2',
                                objectData: item.price || 0
                            }
                        )
                    } else {
                        this.modifyList.push(
                            {
                                modifyType: '12',
                                dataType: '2',
                                objectData: this.discontGoldWeight || 0
                            },
                            {
                                modifyType: '11',
                                dataType: '2',
                                objectData: item.abrasion || 0
                            },
                            {
                                modifyType: '10',
                                dataType: '2',
                                objectData: item.price || 0
                            }
                        )
                    }

                    //this.updateSell()
                } else if (type == '件重') {
                    this.modifyList.push(
                        {
                            modifyType: '14',
                            dataType: '2',
                            objectData: item.totalWeight || 0
                        })
                    //this.updateSell()
                } else if (type == '手工费') {
                    if (this.goodType == 1) {
                        this.modifyList.push(
                            {
                                modifyType: '02',
                                dataType: '2',
                                objectData: item.paymentPrice || 0
                            },
                            {
                                modifyType: '04',
                                dataType: '2',
                                objectData: item.price || 0
                            }
                        )
                    } else {
                        this.modifyList.push(
                            {
                                modifyType: '02',
                                dataType: '2',
                                objectData: item.paymentPrice || 0
                            },
                            {
                                modifyType: '10',
                                dataType: '2',
                                objectData: item.price || 0
                            }
                        )
                    }

                    //this.updateSell()
                } else if (type == '估价') {
                    this.modifyList.push(
                        {
                            modifyType: '15',
                            dataType: '2',
                            objectData: item.estimatePrice || 0
                        },
                        {
                            modifyType: '10',
                            dataType: '2',
                            objectData: item.price || 0
                        }
                    )
                    //this.updateSell()
                } else if (type == '回购价') {
                    this.modifyList.push(
                        {
                            modifyType: '11',
                            dataType: '1',
                            objectData: item.abrasion || 0
                        },
                        {
                            modifyType: '10',
                            dataType: '2',
                            objectData: item.price || 0
                        }
                    )
                    //this.updateSell()
                }
            }
            this.updateSell()
        },
        //换货
        returnGoods() {
            let dataList = {
                orderNum: this.orderNum,
                operateType: '1',
                productTypeId: this.item.productTypeId,
                colorId: this.item.colorId,
                jewelId: this.item.gemId,
                JewelryId: this.item.jewelryId,
                productProperty: '2',
            }
            operateAddBackBuyProductToOrder(dataList).then(res => {
                if (res.data.state == 200) {
                    // eventBus.$emit('update-data-sell-List');
                    this.$emit('messageBack', '成功')
                }

            })

        },
        //新建关联换货
        relatedExchange() {
            let dataList = {
                orderNum: this.orderNum,
                operateType: '1',
                productTypeId: this.item.productTypeId,
                colorId: this.item.colorId,
                jewelId: this.item.gemId,
                JewelryId: this.item.jewelryId,
                productProperty: '2',
            }
            let barcode = '';
            operateAddBackBuyProductToOrder(dataList).then(res => {

                if (res.data.state == 200) {
                    this.relatedShow = false;
                    barcode = res.data.data.barcode;
                    let data = {
                        orderNum: this.orderNum,
                        sellProductId: this.item.productId,
                        recycleProductId: res.data.data.productId,
                        type: 1
                    }
                    return operateSellRefConvert(data);
                }

            }).then(() => {

                let repairGoldPriceE = this.dataProcessing(this.item.saleGoldPrice * this.item.goldWeight);
                let exchangePrice = this.mantissaProcessing(this.item.saleGoldPrice * this.item.goldWeight);
                let options = {
                    orderNum: this.orderNum,
                    barcode: barcode,
                    modifyList: [
                        {
                            modifyType: '19', //补金价
                            dataType: '1',
                            objectData: this.dataProcessing(this.item.saleGoldPrice)
                        },
                        {
                            modifyType: '20', //补价金额
                            dataType: '1',
                            objectData: repairGoldPriceE
                        },
                        {
                            modifyType: '21',   //补金重
                            dataType: '1',
                            objectData: this.item.goldWeight || 0
                        },
                        {
                            modifyType: '25', //旧料价
                            dataType: '1',
                            objectData: this.dataProcessing(this.item.price - exchangePrice)
                        },
                        {
                            modifyType: '10', //换货价
                            dataType: '1',
                            objectData: exchangePrice
                        }
                    ]
                }
                operateUpdateSell(options).then((_json) => {
                    if (_json.data.state == 200) {
                        this.$emit('messageBack', '成功')
                        // eventBus.$emit('update-data-sell-List');
                    }
                })
            })

        },

        sellRefConvert(id, type = 1) {
            //type 1:无关联换货  2：有关联换货
            let data = {
                orderNum: this.orderNum,
                sellProductId: this.item.productId,
                recycleProductId: id,
                type: type
            }
            return operateSellRefConvert(data).then(res => {
                if (res.data.state == 200) {
                    this.relatedShow = false;
                    if (type == 1) {
                        this.$emit('messageBack', '成功')

                        // eventBus.$emit('update-data-sell-List');
                    } else if (type == 2) {
                        this.updataExchange(id); //新增关联
                    }
                }
            })
        },
        updateSell(barcode = this.item.barcode) { // type = 操作类型 dataType = 数据类型 value = 值
            let options = {
                orderNum: this.orderNum,
                barcode: barcode,
                modifyList: this.modifyList
            }
            operateUpdateSell(options).then((res) => {
                this.modifyList = [];
                if (res.data.state == 200) {
                    let _item = null;
                    for (let obj of options.modifyList) {
                        if (obj.modifyType == '04') {
                            _item = obj.objectData;
                            break;
                        }
                    }
                    if (this.item.recycleProductId && _item) {
                        this.updateRecycleSell();
                        return;
                    }

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
        updateRecycleSell() {
            let price = this.dataProcessing(this.item.recycleList.repairOldPrice - this.item.oldPrice + +this.item.price);
            let options = {
                orderNum: this.orderNum,
                barcode: this.item.recycleList.barcode,
                modifyList: [{
                    dataType: '1',
                    modifyType: '25',
                    objectData: price
                }]
            }
            operateUpdateSell(options).then((res) => {
                if (res.data.state == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.$emit('messageBack', '成功')
                }
            })
        },
        relationMethods() {
            if (this.status == '1') {
                return;
            }
            this.modifyList = [];
            this.item.calcMethod = this.item.calcMethod == '1' ? '2' : '1';

            this.relationCalculation('paymentPrice');
            this.sendExchangeData();
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
                    this.item.calcMethod = 2;
                    this.item.price = (Number(this.item.goldWeight) * (Number(this.item.abrasion) / 100)) * Number(this.item.exchangeGoldPrice) - Number(this.item.paymentPrice)
                } else { // 计件
                    this.item.calcMethod = 1;
                    this.item.price = Number(this.item.goldWeight) * (Number(this.item.abrasion) / 100) * Number(this.item.exchangeGoldPrice) - (Number(this.item.paymentPrice) * Number(this.discontGoldWeight))
                }
                //按照店铺设置如否四舍五入价格:mantissa == 1 四舍五入，3 不处理
                if (this.mantissa == 1) {
                    this.item.price = Math.round(this.item.price)
                }
                this.modifyList.push(
                    {
                        modifyType: type,
                        dataType: 1,
                        objectData: this.item.calcMethod || 0
                    },
                    {
                        modifyType: '10',
                        dataType: '2',
                        objectData: this.mantissaProcessing(this.item.price) || 0
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
            // console.log('退货还是回收',this.item.productClass,type)
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
            if (this.item.isRelation == 'Y') {
                this.goodTypeText = "换货"
            }
        },
        computeFun(item, type) {
            SalePriceCalculatoin.calculatoin(this.goodType, item, type);
        },
    }
}
</script>
<style lang="scss" scoped>
    .related-active{
        margin-left:-20px;
        border-left:1px dashed #ddd;
    }
    .el-popover{
        .laber{
            height:100%;
            float:left;
            text-align:right;
            width:42px;
            font-weight:600;
            vertical-align:top;
            padding-top:3px;
        }
        .textarea{
            width:200px;
            float:left;
            textarea{
                width:100%;
                background:#f2f2f2;
                padding:5px;
            }
            span{
                display:inline-block;
                width:100%;
                line-height:25px;
                font-size:13px;
                margin-left:5px;
                min-height:20px;
            }
        }
    }
    .dialogDom{
        .block-class{
            .footer{
                text-align:center;
                span{
                    margin-right:0;
                    color:#fff;
                }
            }
        }
    }
    .related-title{
        overflow:hidden;
        p{
            font-weight:600;
            font-size:14px;
            float:left;
            line-height:30px;
        }
        botton{
            display:block;
            float:right;
        }
    }
    .related-line{
        width:100%;
        height:1px;
        border-bottom:1px solid #ddd;
        margin-top:10px;
    }
    .related-warp{
        max-height:250px;
        margin-left:-11px;
        li{
            overflow:hidden;
            font-size:14px;
            height:42px;
            line-height:42px;
            box-sizing:border-box;
            position:relative;
            cursor:pointer;
            div{
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                float:right;
                height:42px;
            }
            div:first-child{
                width:125px;
                text-align:right;
                margin-left:20px;
            }
            div:last-child{
                width:100px;
                text-align:left;
            }
            &:hover{
                background:#f6f7f8;
                border-left:4px solid #2993f8;
            }
        }
    }
    .detail-wrap{
        width:250px;
        height:520px;
        background:#fff;
        margin-right:20px;
        display:inline-block;
        padding:30px 18px;
        overflow:hidden;
        position:relative;
        .remark-wrap{
            border:1px solid red;
            width:100px;
            height:100px;
            position:fixed;
            top:0;
            z-index:1000;
        }
        .detail-top{
            margin-bottom:36px;
            .jewelryName-warp{
                position:relative;
                .jewelryName{
                    display:inline-block;
                    height:29px;
                    font-weight:bold;
                    font-size:22px;
                    color:#2993f8;
                    max-width:174px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                }
                span{
                    display:inline-block;
                    width:22px;
                    height:22px;
                    background:url(~assets/img/sale-ico.png) no-repeat;
                    background-position:-177px -27px;
                    cursor:pointer;
                }
                span:hover{
                    background-position:-157px -27px;
                }
            }
            .tag{
                padding-top:12px;
                span{
                    padding:4px 10px;
                    font-size:10px;
                    border-radius:2px;
                }
            }
            .botton-gruop{
                width:20px;
                position:absolute;
                right:7px;
                top:10px;
                .sell-botton{
                    display:block;
                    width:20px;
                    height:20px;
                    margin-bottom:8px;
                    margin-left:0;
                    padding:0;
                    border-radius:0;
                    border:none;
                    background:url(~assets/img/sale-ico.png) no-repeat;
                }

                .remark{
                    background-position:-21px -7px;
                }
                .remark:hover{
                    background-position:-1px -7px;
                }
                .delete{
                    background-position:-61px -9px;
                }
                .delete:hover{
                    background-position:-41px -9px;;
                }
                .exchange{
                    background-position:-100px -9px;
                }
                .exchange:hover{
                    background-position:-80px -9px;
                }
                .related-exchange{
                    background-position:-140px -9px;
                }
                .related-exchange:hover{
                    background-position:-120px -9px;
                }
                .cancel-related{
                    background-position:-181px -9px;
                }
                .cancel-related:hover{
                    background-position:-161px -9px;
                }
            }
        }
        .detail-data{
            & > div{
                height:30px;
                margin-bottom:20px;
                position:relative;
                span{
                    float:left;
                    width:55px;
                    display:inline-block;
                    height:30px;
                    text-align:justify;
                    font-size:14px;
                    color:#333;
                    overflow:hidden;
                    vertical-align:top;
                    line-height:30px;
                    i{
                        display:inline-block;
                        width:100%;
                        height:0;
                    }
                }
                i{
                    position:absolute;
                    left:165px;
                    top:7px;
                    font-size:12px;
                    font-style:normal;
                }
                & > div{
                    float:left;
                    margin-left:25px;
                    font-size:14px;
                    color:#333;
                    position:relative;
                    line-height:30px;
                    input{
                        width:80px;
                        height:30px;
                        background:#f6f6f6;
                        border-radius:4px;
                        padding-right:10px;
                        //padding-left: 8px;
                    }
                    i{
                        position:absolute;
                        right:0;
                        top:7px;
                        font-size:12px;
                        font-style:normal;
                    }
                    span{
                        width:110px;
                        display:inline-block;
                    }
                }
                .switch{
                    float:left;
                    width:24px;
                    height:24px;
                    cursor:pointer;
                }
                .switch1{
                    position:absolute;
                    right:-5px;
                    top:4px;
                    width:22px;
                    height:22px;
                    cursor:pointer;
                }
                .switch1.active{
                    display:none;
                }
            }
            .barcode{
                & > div{
                    height:30px;
                    line-height:30px;
                }
            }
        }
        #relation-list{
            width:250px;
            height:395px;
            margin-left:-18px;
            overflow:scroll;
            padding:0 0 10px 18px;
            & > div{
                margin-bottom:8px;
            }
        }
    }
</style>


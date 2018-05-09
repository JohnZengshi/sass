<template>
    <div class="plain-detail-main" v-if="receiptsIntroList">
        <!--<div class="header-intro">
            <span>单据信息</span>
            <router-link tag="p" :to='"/work/storage"'><span>返回单据列表</span><img src="./../../assets/img/work/arrows-right-gray.png" alt=""></router-link>
        </div>-->
        <div class="body">
            <!--<ul>
                <li class="main-color" v-if="receiptsIntroList.orderNum">
                    <span>单<i class="space-between-w28"></i>号<i class="right-icon">：</i></span>
                    <span v-if="receiptsIntroList">{{receiptsIntroList.orderNum}}</span>
                </li>
                <li v-if="receiptsIntroList.makeOrderManName">
                    <span class="main-color">制<i class="space-between-w7"></i>单<i class="space-between-w7"></i>人<i class="right-icon">：</i></span>
                    <span class="main-color astrictTitle-3">{{receiptsIntroList.makeOrderManName}}</span>
                </li>
                <li>
                    <span class="main-color" style="text-align:left;">创建时间<i class="space-between-w7"></i><i class="right-icon"></i>:</span>
                    <span class="main-9" v-if="receiptsIntroList">（{{preciseSun}}<i class="space-between-w8"></i>{{preciseMinute}}）</span>
                </li>
                <li v-if="receiptsIntroList.checkType" class="mt10">
                    <span>状<i class="space-between-w28"></i>态<i class="right-icon">：</i></span>
                    <span>{{getState(receiptsIntroList.checkType)}}</span>
                </li>
                <li>
                    <span>修改库位：</span>
                    <span>{{receiptsIntroList.storageName}}</span>
                <li>
                    <span>合<i class="space-between-w28"></i>计<i class="right-icon">：</i></span>
                    <template v-if="isHas">
                        <span class="all-count">{{receiptsIntroList.totalNum || 0}}件、</span>
                        <span class="all-count">{{receiptsIntroList.totalWeight || 0}}g、</span>
                        <span class="all-count">{{receiptsIntroList.totalPrice || 0}}元</span>
                    </template>
                    <template v-else>
                        <span class="color-red"> - </span>&nbsp
                        <span class="color-red"> - </span>&nbsp
                        <span class="color-red"> - </span>
                    </template>
                </li>-->
            <ul>
                <li>
                    <span>{{receiptsIntroList.storageName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {operateDelReceipt, operateHandleXGReceipt} from './../../Api/commonality/operate'
import {receiptStatus, statusReceipts} from './../../Api/commonality/status'
export default {
    props: [
        'receiptsIntroList',
        'introListOption'
    ],
    data () {
        return {
            "isAmend": false,
            "isAmendTwo": false,
            "isAmendThree": false
        }
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "supplierListData", // 供应商
            "repositoryList" // 库位列表
        ]),
        isHas () {
            return statusReceipts(this.receiptsIntroList.totalNum, this.receiptsIntroList.totalWeight, this.receiptsIntroList.totalPrice);
        },
        numberOfCases: function () { // 总件数
            return Number(this.receiptsIntroList.saleNum) || 0 + Number(this.receiptsIntroList.recycleNum) || 0 + Number(this.receiptsIntroList.exchangeNum) || 0;
        },
        allG: function () { // 总克
            return Number(this.receiptsIntroList.saleWeight) || 0 + Number(this.receiptsIntroList.recycleWeight) || 0 + Number(this.receiptsIntroList.exchangeWeight) || 0;
        },
        allMonny: function () {
            return Number(this.receiptsIntroList.salePrice) || 0 + Number(this.receiptsIntroList.recyclePrice) || 0 + Number(this.receiptsIntroList.exchangePrice) || 0;
        },
        preciseSun: function () { // 年
            let parm = this.receiptsIntroList.createDate;
            if (parm) {
                var Year = parm.slice(0, 4);
                var Month = parm.slice(4, 6);
                var Sun = parm.slice(6, 8);
                var allTime = Year + "-" + Month + "-" + Sun
                return allTime;
            }
        },
        preciseMinute: function () { // 分
            let parm = this.receiptsIntroList.createDate;
            if (parm) {
                var ConfigData = parm.slice(8, 10);
                var Mour = parm.slice(10, 12);
                var allTime = ConfigData + ":" + Mour
                return allTime;
            }
        }
    },
    watch: {
        'receiptsIntroList.shopId': function () { // 分销店铺
            if (this.isAmendTwo) {
                for (var i in this.shopListByCo) {
                    if (this.shopListByCo[i].shopId === this.receiptsIntroList.shopId) {
                        this.receiptsIntroList.shopName = this.shopListByCo[i].shopName;
                        this.amendShop("3", this.shopListByCo[i].shopId);
                    }
                }
            } else {
                this.isAmendTwo = true
            }
        },
        'receiptsIntroList.supplierId': function () { // 供应商
            if (this.isAmendThree) {
                for (var i in this.supplierListData) {
                    if (this.supplierListData[i].supplierId === this.receiptsIntroList.supplierId) {
                        this.receiptsIntroList.shopName = this.supplierListData[i].shopName;
                        this.amendShop("2", this.supplierListData[i].supplierId);
                    }
                }
            } else {
                this.isAmendThree = true
            }
        }
    },
    created () {
        this.getShopListByCo();
        this.workSupplierList();
        this.workRepositoryList();
    },
    methods: {
        ...mapActions([
            "getShopListByCo", // 店铺列表
            "workSupplierList", // 供应商
            "workRepositoryList" // 库位列表
        ]),
        itemAct (type, id) {
            if (type == 1) {
                this.receiptsIntroList.storageId = id
            } else if (type == 2) {
                this.receiptsIntroList.supplierId = id
            } else if (type == 3) {
                this.receiptsIntroList.shopId = id
            }
        },
        selectDrop (index) {
        },
        getState (parm) {
            return receiptStatus(parm);
        },
        amendShop (dataType, objectData) { // 修改单据简介
            let options = {
                "modifyList": [{
                    "dataType": dataType,
                    "objectData": objectData
                }],
                "orderNum": this.$route.query.orderNumber,
                "modelType": "3"
            }
            operateHandleXGReceipt(options).then((response) => {
                if (response.data.state === 200) {
                    this.$store.dispatch('workPopupError', "修改成功")
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        delectProduct (parm) { // 删除商品
            let options = {
                "orderNum": parm
            }
            operateDelReceipt(options).then(response => {
                if (response.data.state === 200) {
                    this.$router.push("/work/sipping")
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, response => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        }
    }
}
</script>
<style src="./../../assets/css/template/newReceiptsIntro.scss" lang="scss" scoped></style>
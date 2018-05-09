<template>
    <div class="plain-detail-main" v-if="receiptsIntroList">
        <div class="body">
            <ul>
                <li>
                    <span :class="{active: repositoryList.length <= 1 && receiptsIntroList.checkType == 3}">{{receiptsIntroList.storageName}}</span>
                    <!-- <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && repositoryList.length > 1">
                        <div v-for="(item, index) in repositoryList" @click="itemAct(1, item.repositoryId, item.repositoryName)">{{item.repositoryName}}</div>
                    </div> -->
                </li>
                <li>
                    <span :class="{active: supplierListData.length <= 1 && receiptsIntroList.checkType == 3}" @click="selectDrop(2)">{{receiptsIntroList.supplierName}}</span><i v-if="supplierListData.length > 1 && receiptsIntroList.checkType != 3" class="el-icon-caret-bottom"></i>
                    <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && supplierListData.length > 1">
                        <div v-for="(item, index) in supplierListData" @click="itemAct(2, item.supplierId, item.supplierName)">{{item.supplierName}}</div>
                    </div>
                </li>
                <li>
                    <span :class="{active: shopListByCo.length <= 1 && receiptsIntroList.checkType == 3}" @click="selectDrop(3)">{{receiptsIntroList.shopName}}</span><i v-if="shopListByCo.length > 1 && receiptsIntroList.checkType != 3" class="el-icon-caret-bottom"></i>
                    <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && shopListByCo.length > 1">
                        <div v-for="(item, index) in shopListByCo" @click="itemAct(3, item.shopId, item.shopName)">{{item.shopName}}</div>
                    </div>
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
        'receiptsIntroList.storageId': function () {
            if (this.isAmend) {
                for (var i in this.repositoryList) {
                    if (this.repositoryList[i].repositoryId === this.receiptsIntroList.storageId) {
                        this.receiptsIntroList.storageName = this.repositoryList[i].repositoryName;
                        this.amendShop("1", this.repositoryList[i].repositoryId);
                    }
                }
            } else {
                this.isAmend = true
            }
        },
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
                       // this.receiptsIntroList.shopName = this.supplierListData[i].shopName;
                        this.amendShop("2", this.supplierListData[i].supplierId);
                    }
                }
            } else {
                this.isAmendThree = true
            }
        }
        // 'introListOption': function () {
        //     this.isAmend = false;
        //     this.isAmendTwo = false;
        //     this.isAmendThree = false;
        // }
    },
    created () {
        this.getShopListByCo();
        this.workSupplierList();
        this.workRepositoryList();
    },
    mounted () {
        this.$nextTick(() => {
            // console.log(this.repositoryList)
            // console.log(this.supplierListData)
            // console.log(this.shopListByCo)
            // console.log(this.repositoryList.length)
            // console.log(this.supplierListData.length)
            // console.log(this.shopListByCo.length)
        })
    },
    methods: {
        ...mapActions([
            "getShopListByCo", // 店铺列表
            "workSupplierList", // 供应商
            "workRepositoryList" // 库位列表
        ]),
        itemAct (type, id, name) {
            // console.log(this.receiptsIntroList)
            if (type == 1) {
                this.receiptsIntroList.storageId = id
                this.receiptsIntroList.storageName = name
            } else if (type == 2) {
                this.receiptsIntroList.supplierId = id
                this.receiptsIntroList.supplierName = name
            } else if (type == 3) {
                this.receiptsIntroList.shopId = id
                this.receiptsIntroList.shopName = name
            }
        },
        selectDrop (index) {
        },
        getState (parm) {
            return receiptStatus(parm);
        },
        // openAmend () {
        //     this.isAmend = true;
        // },
        // openAmendTwo () {
        //     this.isAmendTwo = true;
        // },
        // openAmendThree () {
        //     this.isAmendThree = true;
        // },
        // endAmend () {
        //     this.isAmend = false;
        //     this.isAmendTwo = false;
        //     this.isAmendThree = false;
        // },
        amendShop (dataType, objectData) { // 修改单据简介
            let options = {
                "modifyList": [{
                    "dataType": dataType,
                    "objectData": objectData
                }],
                "orderNum": this.$route.query.orderNumber,
                "modelType": "4"
            }
            operateHandleXGReceipt(options).then((response) => {
                //console.log("修改单据简介");
                //console.log(response.data);
                if (response.data.state === 200) {
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                console.log(response);
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
                console.log(response)
            })
        }
    }
}
</script>
<style src="./../../assets/css/template/newReceiptsIntro.scss" lang="scss" scoped></style>
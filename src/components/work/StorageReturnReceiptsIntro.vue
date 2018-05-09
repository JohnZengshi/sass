<template>
    <!-- 退库 -->
    <div class="plain-detail-main" v-if="receiptsIntroList" @click.stop="endAmend">
        <div class="body">
            <ul>
                <li>
                    <span :class="{active: repositoryList.length <= 1 && receiptsIntroList.checkType == 3}" @click="selectDrop(1)">{{receiptsIntroList.storageName}}</span>
                    <!-- <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && repositoryList.length > 1">
                        <div v-for="(item, index) in repositoryList" @click="itemAct(1, item.repositoryId, item)">{{item.repositoryName}}</div>
                    </div> -->
                </li>

                <li>
                    <span :class="{active: supplierListData.length <= 1 && receiptsIntroList.checkType == 3}" @click="selectDrop(3)">{{receiptsIntroList.supplierName}}<i v-if="supplierListData.length > 1 && receiptsIntroList.checkType != 3" class="el-icon-caret-bottom"></i></span>
                    <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && supplierListData.length > 1">
                        <div v-for="(item, index) in supplierListData" @click="itemAct(3, item.supplierId, item)">{{item.supplierName}}</div>
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
        'receiptsIntroList'
    ],
    data () {
        return {
            "isAmend": false
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
        'receiptsIntroList.supplierId': function () {
            if (this.isAmend) {
                for (var i in this.supplierListData) {
                    if (this.supplierListData[i].supplierId === this.receiptsIntroList.supplierId) {
                        this.receiptsIntroList.shopName = this.supplierListData[i].shopName;
                        this.amendShop("2", this.supplierListData[i].supplierId);
                    }
                }
            } else {
                this.isAmend = true
            }
        },
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
    },
    created () {
        this.workSupplierList();
    },
    methods: {
        ...mapActions([
            "getShopListByCo", // 店铺列表
            "workSupplierList", // 供应商
            "workRepositoryList" // 库位列表
        ]),
        itemAct (type, id, item) {
            console.log(item)
            if (type == 1) {
                this.receiptsIntroList.storageId = id
                this.receiptsIntroList.storageName = name
            } else if (type == 2) {
                this.receiptsIntroList.supplierId = id
                this.receiptsIntroList.supplierName = name
            } else if (type == 3) {
                this.receiptsIntroList.supplierId = id
                this.receiptsIntroList.supplierName = item.supplierName
            }
        },
        endAmend () {
            this.isAmend = false;
        },
        getState (parm) {
            return receiptStatus(parm);
        },
        amendShop (dataType, objectData) { // 修改供应商
            let options = {
                "modifyList": [{
                    "dataType": dataType,
                    "objectData": objectData
                }],
                "orderNum": this.$route.query.orderNumber,
                "modelType": "2"
            }
            operateHandleXGReceipt(options).then((response) => {
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
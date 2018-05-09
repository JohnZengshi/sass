<template>
    <div class="plain-detail-main" v-if="receiptsIntroList">
        <div class="body">
            <ul>
                <li>
                    <span :class="{active: repositoryList.length <= 1 && receiptsIntroList.checkType == 3}" @click="selectDrop(1)">{{receiptsIntroList.storageName}}<i v-if="repositoryList.length > 1 && receiptsIntroList.checkType != 3" class="el-icon-caret-bottom"></i></span>
                    <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && repositoryList.length > 1">
                        <div v-for="(item, index) in repositoryList" @click="itemAct(1, item)">{{item.repositoryName}}</div>
                    </div>
                </li>
                <li>
                    <span :class="{active: shopListByCo.length <= 1 && receiptsIntroList.checkType == 3}" @click="selectDrop(3)">{{receiptsIntroList.shopName}}<i v-if="shopListByCo.length > 1 && receiptsIntroList.checkType != 3" class="el-icon-caret-bottom"></i></span>
                    <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && shopListByCo.length > 1">
                        <div v-for="(item, index) in shopListByCo" @click="itemAct(3, item)">{{item.shopName}}</div>
                    </div>
                </li>
                <li v-if="receiptsIntroList.groupName">
                    <span :class="{active: counterList.length < 1 && receiptsIntroList.checkType == 3}" >{{receiptsIntroList.groupName}}</span><!--  @click="selectDrop(4)" -->
                    <!--<div class="menu-list" v-if="receiptsIntroList.checkType != 3">
                        <div v-for="(item, index) in counterList" @click="itemAct(4, item)">{{item.counterName}}</div>
                    </div>-->
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {operateDelReceipt, operateHandleXGReceipt} from 'Api/commonality/operate'
import {seekShowCounterList} from 'Api/commonality/seek'
import {statusReceipts, receiptStatus, receiptStatusTwo} from 'Api/commonality/status.js'
export default {
    props: [
        'receiptsIntroList'
    ],
    data () {
        return {
            "isAmend": false,
            "isAmendTwo": false,
            "isAmendThree": false,
            counterList: []
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
        },
        'receiptsIntroList.shopId': function () {
            if (this.isAmend) {
                for (var i in this.shopListByCo) {
                    if (this.shopListByCo[i].shopId === this.receiptsIntroList.shopId) {
                        this.receiptsIntroList.shopName = this.shopListByCo[i].shopName;
                        this.amendShop("3", this.shopListByCo[i].shopId);
                    }
                }
            } else {
                this.isAmend = false
            }
        },
        'receiptsIntroList.counterId': function () {
            for (var i in this.counterList) {
                if (this.counterList[i].counterId === this.receiptsIntroList.counterId) {
                    this.receiptsIntroList.counterName = this.counterList[i].counterName;
                    this.amendShop("4", this.counterList[i].counterId);
                }
            }
        }
    },
    created () { 
        this.getShopListByCo();
    },
    mounted () {
        let self = this
        // this.$nextTick(() => {
        //     console.log(self.receiptsIntroList)
        //     self.showCounterList()
            
        // })
        setTimeout(function () {
            console.log(self.receiptsIntroList)
            self.showCounterList()
        }, 200)
    },
    methods: {
        ...mapActions([
            "getShopListByCo", // 店铺列表
            "workSupplierList", // 供应商
            "workRepositoryList" // 库位列表
        ]),
        showCounterList () { // 柜组列表
            console.log(this.receiptsIntroList)
            let options = {
                shopId: this.receiptsIntroList.shopId
            }
            seekShowCounterList(options).then((res) => {
                console.log(res)
                this.counterList = res.data.data.counterList
            }, (res) => {
                console.log(res)
            })
        },
        itemAct (type, item) {
            //console.log(11111)
            if (type == 1) {
                this.receiptsIntroList.storageId = item.repositoryId
                this.receiptsIntroList.storageName = item.repositoryName
            } else if (type == 2) {
                this.receiptsIntroList.supplierId = item.supplierId
                this.receiptsIntroList.supplierName = item.supplierName
            } else if (type == 3) {
                this.receiptsIntroList.shopId = item.shopId
                this.receiptsIntroList.shopName = item.shopName
            } else if (type == 4) {
                console.log(this.receiptsIntroList)
                this.receiptsIntroList.counterId = item.counterId
                this.receiptsIntroList.counterName = item.counterName
            }
        },
        selectDrop (index) {
            console.log(this.receiptsIntroList)
            console.log(this.shopListByCo)
        },
        getState (parm) {
            
            return receiptStatus(parm);
        },
        getState (parm1, parm2) {
            if (parm1 !== "3") {
                return receiptStatus(parm1);
            } else {
                return receiptStatusTwo(parm2);
            }
        },
        // openAmend () {
        //     this.isAmend = true;
        // },
        amendShop (dataType, objectData) { // 修改收货店铺
            let options = {
                "modifyList": [{
                    "dataType": dataType,
                    "objectData": objectData
                }],
                "orderNum": this.$route.query.orderNumber,
                "modelType": "6"
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
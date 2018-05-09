<template>
    <!-- 调柜 -->
    <div class="plain-detail-main" v-if="receiptsIntroList">
        <!--<div class="header-intro">
            <span>单据信息</span>
            <router-link tag="p" :to='"/work/transferCabinet"'><span>返回单据列表</span><img src="./../../assets/img/work/arrows-right-gray.png" alt=""></router-link>
        </div>-->
        <div class="body">
            <ul>
                <li>
                    <span :class="{active: shopListByCo.length <= 1 && receiptsIntroList.checkType == 3}">{{receiptsIntroList.groupName2}}</span>
                    <!-- <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && shopListByCo.length > 1">
                        <div v-for="(item, index) in shopListByCo" >{{item.groupName2}}</div>
                    </div> -->
                </li>
                <li>
                    <span :class="{active: shopListByCo.length <= 1 && receiptsIntroList.checkType == 3}">{{receiptsIntroList.groupName}}</span>
                    <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && counterList.length > 1">
                        <div v-for="(item, index) in counterList" @click="itemAct(3, item)">{{item.counterName}}</div>
                    </div>
                </li>
                
<!--            <li v-if="receiptsIntroList.storageName">
                    <span>调入库位：</span>
                    <div v-if="isAmend" class="select-w100 option-input" @click.stop="openAmend">
                        <el-select filterable v-model="receiptsIntroList.storageId" placeholder="">
                            <el-option
                                v-for="item in repositoryList"
                                :label="item.repositoryName"
                                :value="item.repositoryId">
                            </el-option>
                        </el-select>
                    </div>
                    <span v-else>{{receiptsIntroList.storageName}}</span>
                    <img v-if='receiptsIntroList.checkType === "1"' @click.stop="openAmend" class="option-icon" src="../../assets/img/work/receipts-amend-icon.png" alt="">
                </li> -->

            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {operateDelReceipt, operateHandleXGReceipt} from './../../Api/commonality/operate'
import {receiptStatus, statusReceipts} from './../../Api/commonality/status'
import {seekShowCounterList} from 'Api/commonality/seek'
export default {
    props: [
        'receiptsIntroList'
    ],
    data () {
        return {
            "isAmend": false,
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
            }
            this.isAmend = true
        },
        // 'receiptsIntroList.groupId': function () {
        //     for (var i in this.counterList) {
        //         if (this.counterList[i].counterId === this.receiptsIntroList.groupId) {
        //             this.receiptsIntroList.groupName = this.counterList[i].counterName;
        //             this.amendShop("4", this.counterList[i].counterId);
        //         }
        //     }
        // }
    },
    created () {
        this.workRepositoryList();
    },
    mounted () {
        let self = this
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
        itemAct (type, item) {
            //console.log(11111)
            if (type == 3) {
                this.receiptsIntroList.groupId = item.counterId
                this.receiptsIntroList.groupName = item.counterName
                this.amendShop("4", item.counterId);
            }
        },
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
        getState (parm) {
            return receiptStatus(parm);
        },
        amendShop (dataType, objectData) { // 修改入库库位
            let options = {
                "modifyList": [{
                    "dataType": dataType,
                    "objectData": objectData
                }],
                "orderNum": this.$route.query.orderNumber,
                "modelType": "8"
            }
            operateHandleXGReceipt(options).then((response) => {
                if (response.data.state === 200) {
                    console.log("修改成功");
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
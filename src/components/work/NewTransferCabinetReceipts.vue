<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body">
            <div class="classes-block" v-if="cutData.one">
                <div class="title">选择店铺</div>
                <ul class="list">
                    <li :class="{on: newDatas.shopId === item.shopId}" v-for="item in shopListByCo" @click="getShopId(item.shopId)">{{item.shopName}}</li>
                </ul>
                <div class="footer">
                    <!--<span class="pre" @click="toPageFun('one', 'two')">上一步</span>-->
                    <span class="next" v-if="newDatas.repositoryId" @click="toPageFun('two', 'one')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.two">
                <div class="title">选择调出柜组</div>
                <ul class="list">
                    <li :class="{on: newDatas.groupId2 === item.counterId}" v-for="item in counterList" @click="getRepositoryOutId(item.counterId)">{{item.counterName}}</li>
                </ul>
                <div class="footer">
                    <span v-if="oneShop" class="pre" @click="toPageFun('one', 'two')">上一步</span>
                    <span v-if="newDatas.groupId2" class="next" @click="toPageFun('three', 'two')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.three" v-loading="isLoading" element-loading-text="拼命加载中">
                <div class="title">选择调入柜组</div>
                <ul class="list">
                    <li :class="{on: newDatas.groupId2 === item.counterId}" v-for="item in counterList" @click="getRepositoryId(item.counterId)">{{item.counterName}}</li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('two', 'three')">上一步</span>
                    <!--<span v-if="newDatas.groupId2" class="next" @click="toPageFun('three', 'two')">下一步</span>-->
                </div>
            </div>
            <div class="classes-block" v-if="cutData.four" v-loading="isLoading" element-loading-text="拼命加载中">
                <div class="title">选择商品属性</div>
                <ul class="list">
                        <li @click="getProductProperty(1)">
                            成品
                        </li>
                        <li @click="getProductProperty(2)">
                            旧料
                        </li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('two', 'three')">上一步</span>
                </div>
            </div>
        </div>
        <!--
        
        <div class="list" v-if="cutData.four" v-loading="isLoading" element-loading-text="拼命加载中">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('two', 'three')">上一步</a>
                选择商品属性
            </p>
            <div class="choose">
                <ul>
                    <li @click="getProductProperty(1)">
                        成品
                    </li>
                    <li @click="getProductProperty(2)">
                        旧料
                    </li>
                </ul>
            </div>
        </div>-->
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateDGReceipt} from './../../Api/commonality/operate'
import {seekShowCounterList} from '../../Api/commonality/seek'
export default {
    data () {
        return {
            productProperty: '', // 商品属性
            "counterList": [], // 柜组列表
            "cutData": {
                "one": true,
                "two": false,
                "three": false,
                "four": false,
            },
            "newDatas": { // 新增数据
                "shopId": "", // 店铺列表
                // "productType": "", // 商品属性
                "groupId": "", // 调入柜组ID
                "groupId2": "" // 调出柜组ID
            },
            "productTypeList": [
                {
                    "name": "成品",
                    "type": "1"
                },
                {
                    "name": "旧料",
                    "type": "2"
                }
            ],
            "isShow": false,
            "RoleShopListByCo1": [],
            "oneShop": true, // 只有一家店铺
            "isLoading": false
        }
    },
    props: [
        'newPopup'
    ],
    watch: {
        'newPopup': function () {
            if (this.newPopup === true) {
                this.isShow = this.newPopup;
            }
        },
        'isShow': function () {
            if (this.isShow === false) {
                this.$emit("closePopup", false);
                this.cutData.one = true;
                this.cutData.two = false;
                this.cutData.three = false;
                this.newDatas.productType = ""; // 商品属性ID
                this.newDatas.repositoryId = ""; // 入库库位ID
                this.newDatas.repositoryOutId = ""; // 出货库位ID
            }
        },
        'shopListByCo': function () {
            if (this.shopListByCo.length === 1) {
                this.newDatas.shopId = this.shopListByCo[0].shopId;
                this.getCounterList(this.shopListByCo[0].shopId);
                this.oneShop = false;
                this.cutData.one = false;
                this.cutData.two = true;
            }
        },
        'RoleShopListByCo': function () {
            if (this.RoleShopListByCo) {

            }
        }
    },
    created () {
        this.workRepositoryList();
        // this.workSupplierList();
        this.getShopListByCo();
        this.isShow = this.newPopup;
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "repositoryList", // 库位列表
            "userPositionInfo"
            // "supplierListData" // 供应商
        ]),
        computedRole: function () { // 公司
            if (this.userPositionInfo) {
                for (let i of this.userPositionInfo.roleList) {
                    switch (i.role) {
                        case "1":
                            return true;
                        case "2":
                            return true;
                        case "3":
                            return true;
                    }
                }
            }
        },
        computedManageRole: function () { // 公司管理员
            if (this.userPositionInfo) {
                for (let i of this.userPositionInfo.roleList) {
                    switch (i.role) {
                        case "1":
                            return true;
                        case "2":
                            return true;
                    }
                }
            }
        },
        computedOfficeClerkRole: function () { // 职员
            if (this.userPositionInfo) {
                for (let i of this.userPositionInfo.roleList) {
                    switch (i.role) {
                        case "3":
                            return true;
                    }
                }
            }
        },
        shopRole: function () { // 店员
            if (this.userPositionInfo) {
                for (let i of this.userPositionInfo.roleList) {
                    switch (i.role) {
                        case "4":
                            return true;
                        case "5":
                            return true;
                    }
                }
            }
        },
        RoleShopListByCo: function () {
            for (let i in this.shopListByCo) {
                if (this.shopListByCo[i].shopId === this.userPositionInfo.roleList[0].shopId) {
                    return this.shopListByCo[i];
                }
            }
            return false;
        }
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo" // 店铺列表
            // "workSupplierList" // 供应商
        ]),
        getProductProperty (parm) {
            this.productProperty = parm

            let options = {
                "shopId": this.newDatas.shopId, // 店铺id
                "groupId": this.newDatas.groupId, // 调入柜组
                "groupId2": this.newDatas.groupId2, // 调出柜组
                // "storageId": this.newDatas.repositoryId, // 入库库位ID
                // "storageId2": this.newDatas.repositoryOutId, // 出货库位ID
                "productProperty": parm
            }
            this.isLoading = true;
            // console.log(this.newDatas)
            // sessionStorage.setItem("确定新建调柜", JSON.stringify(options));
            operateCreateDGReceipt(options).then((response) => { // 新建单据
                this.isLoading = false;
                if (this.isLoading == false) {
                    if (response.data.state === 200) {
                        this.$router.push({
                            path: "/work/transferCabinet/newTransferCabinet",
                            query: {
                                "orderNumber": response.data.data.orderNum,
                                "isRole": "Y",
                                "isCheckOrderMan": "N"
                            }
                        })
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }
            }, (response) => {
                this.isLoading = false;
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        toPageFun (to, from) { // 去到的， 目前的
            this.cutData[to] = true;
            this.cutData[from] = false;
        },
        getCounterList (parm) { // 柜组列表
            let options = {
                "shopId": parm // 店铺ID
            }
            seekShowCounterList(options).then((response) => {
                if (response.data.state === 200) {
                    this.counterList = response.data.data.counterList;
                }
            }, (response) => {
                console.log(response)
            })
        },
        getShopId (parm) {
            this.newDatas.shopId = parm;
            this.getCounterList(parm);
            this.cutData.one = false;
            this.cutData.two = true;
        },
        getRepositoryOutId (parm) { // 绑定出库库位id
            console.log("人品问题");
            console.log(parm);
            this.newDatas.groupId2 = parm;
            this.cutData.two = false;
            this.cutData.three = true;
        },
        getRepositoryId (parm) { // 绑定入库库位Id
            console.log("人品问题2");
            console.log(parm);
            this.cutData.three = false;
            this.cutData.four = true;
            this.newDatas.groupId = parm   
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="../../assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>
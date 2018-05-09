<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body">
            <div class="classes-block" v-if="cutData.one">
                <div class="title">选择调出库位</div>
                <ul class="list">
                    <li :class="{on: newDatas.repositoryOutId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryOutId(item.repositoryId)">{{item.repositoryName}}</li>
                </ul>
                <div class="footer">
                    <!--<span class="pre" @click="toPageFun('one', 'two')">上一步</span>-->
                    <span class="next" v-if="newDatas.repositoryOutId" @click="toPageFun('two', 'one')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.two">
                <div class="title">选择调入库位</div>
                <ul class="list">
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">{{item.repositoryName}}</li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('one', 'two')">上一步</span>
                    <span class="next" v-if="newDatas.repositoryId" @click="toPageFun('three', 'two')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.three">
                <div class="title">选择商品属性</div>
                <ul class="list">
                    <li v-for="item in productTypeList" @click="getProductType(item.type)">{{item.name}}</li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('two', 'three')">上一步</span>
                    <!--<span class="next" @click="getshopId('')">跳过</span>-->
                </div>
            </div>
        </div>
        <!--<div class="list" v-if="cutData.one">

        <div class="list" v-if="cutData.three">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('two', 'three')">上一步</a>
                选择商品属性
            </p>
            <ul>
                <li v-for="item in productTypeList" @click="getProductType(item.type)">
                    {{item.name}}
                </li>
            </ul>
        </div>-->
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateDKReceipt} from './../../Api/commonality/operate'
export default {
    data () {
        return {
            "cutData": {
                "one": true,
                "two": false,
                "three": false
            },
            "newDatas": { // 新增数据(其它页面也用到的)
                "productType": "", // 商品属性
                "repositoryId": "", // 入库库位ID
                "repositoryOutId": "" // 出货库位ID
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
            "isShow": false
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
            // "supplierListData" // 供应商
        ])
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo" // 店铺列表
            // "workSupplierList" // 供应商
        ]),
        toPageFun (to, from) { // 去到的， 目前的
            this.cutData[to] = true;
            this.cutData[from] = false;
        },
        getProductType (parm) { // 绑定店铺Id
            var options = {
                "storageId": this.newDatas.repositoryId, // 入库库位ID
                "storageId2": this.newDatas.repositoryOutId, // 出货库位ID
                "productProperty": parm
            }
            // sessionStorage.setItem("调柜", JSON.stringify(options));
            operateCreateDKReceipt(options).then((response) => { // 新建单据
                console.log("新建单据");
                console.log(response);
                if (response.data.state === 200) {
                    this.$router.push({
                        path: "/work/transferStorage/newTransferStorage",
                        query: {
                            "orderNumber": response.data.data.orderNum,
                            "isRole": "Y",
                            "isCheckOrderMan": "N"
                        }
                    })
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log(response);
            })
            this.cutData.one = false;
            this.cutData.two = false;
        },
        getRepositoryOutId (parm) { // 绑定出库库位id
            this.newDatas.repositoryOutId = parm;
            this.cutData.one = false;
            this.cutData.two = true;
        },
        getRepositoryId (parm) { // 绑定入库库位Id
            this.newDatas.repositoryId = parm;
            this.cutData.two = false;
            this.cutData.three = true;
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="../../assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>
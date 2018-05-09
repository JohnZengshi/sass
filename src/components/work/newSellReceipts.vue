<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <!--<div class="list" v-loading="isLoading" element-loading-text="拼命加载中">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('one', 'two')">上一步</a>
                选择店铺
            </p>
            <ul>
                <li v-for="item in shopListByCo" @click="getShopId(item.shopId)">
                    {{item.shopName}}
                </li>
            </ul>
        </div>-->
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body">
            <div class="classes-block" v-loading="isLoading" element-loading-text="拼命加载中">
                <div class="title">选择店铺</div>
                <ul class="list">
                    <li v-for="item in shopListByCo" @click="getShopId(item.shopId)">{{item.shopName}}</li>
                </ul>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateSellOrder} from './../../Api/commonality/operate'
export default {
    data () {
        return {
            "productTypeList": null,
            "productTypeListSmall": null,
            "transform": true,
            "fourBig": false,
            "bigStyle": {},
            "viewBig": 2,
            "chooseData": {
                "childIndex": 1,
                "chooseBig": "",
                "chooseSmall": ""
            },
            "cutData": {
                "one": true,
                "two": false,
                "three": false,
                "four": false
            },
            "newDatas": { // 新增数据(其它页面也用到的)
                "shopId": "", // 店铺ID
                // "supplierId": "", // 供应商ID
                // "productTypeId": "", // 产品类别ID
                "repositoryId": "" // 库位ID
            },
            "isShow": false,
            "isLoading": false
        }
    },
    props: [
        'newPopup'
    ],
    watch: {
        'newPopup': function () {
            console.log(this.newPopup)
            if (this.newPopup === true) {
                this.isShow = this.newPopup;
            }
        },
        'isShow': function () {
            if (this.isShow === false) {
                this.$emit("closePopup", false)
            }
        }
    },
    created () {
        this.workRepositoryList();
        this.workSupplierList();
        this.isShow = this.newPopup;
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "repositoryList", // 库位列表
            "supplierListData" // 供应商
        ])
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo", // 店铺列表
            "workSupplierList" // 供应商
        ]),
        toPageFun (to, from) { // 去到的， 目前的
            this.cutData[to] = true;
            this.cutData[from] = false;
        },
        getShopId (parm) { // 绑定店铺Id
            let options = {
                shopId: parm
            }
            this.isLoading = true;
            operateCreateSellOrder(options).then((response) => { // 获取单号
                this.isLoading = false;
                console.log("获取单号")
                console.log(response);
                if (this.isLoading == false) {
                    if (response.data.state === 200) {
                    sessionStorage.setItem("orderNumber", response.data.data.orderNum);
                    this.$router.push("/work/sell/sellReceiptsList");
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                } 
            }, (response) => {
                this.isLoading = false;
                console.log(response);
            })
        },
        getRepositoryId (parm) { // 绑定库位Id
            this.newDatas.repositoryId = parm;
            this.cutData.one = false;
            this.cutData.two = true;
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="../../assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>
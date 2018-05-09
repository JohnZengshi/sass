<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body" @click="test">
            <div class="classes-block" v-if="cutData.one">
                <div class="title">选择店铺</div>
                <ul class="list">
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in shopListByCo" @click="getShopId(item.shopId)">{{item.shopName}}</li>
                </ul>
                <div class="footer">
                    <!--<span class="pre" @click="toPageFun('one', 'two')">上一步</span>-->
                    <span class="next" v-if="newDatas.repositoryId" @click="toPageFun('two', 'one')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.two">
                <div class="title">选择收货库位</div>
                <ul class="list">
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">{{item.repositoryName}}</li>
                </ul>
                <div class="footer">
                    <span class="pre"  @click="toPageFun('one', 'two')">上一步</span>
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
            <p class="popTitle">
                选择店铺
                <a v-if="newDatas.repositoryId" href="javascript:void(0)" class="skip" @click="toPageFun('two', 'one')">下一步</a>
            </p>
            <div class="choose">
                <ul>
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in shopListByCo" @click="getShopId(item.shopId)">
                        {{item.shopName}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="list" v-if="cutData.two">
            <p class="popTitle">
                选择收货库位
                <a v-if="newDatas.repositoryId" href="javascript:void(0)" class="skip" @click="toPageFun('three', 'two')">下一步</a>
            </p>
            <div class="choose">
                <ul>
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">
                        {{item.repositoryName}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="list" v-if="cutData.three" v-loading="isLoading" element-loading-text="拼命加载中">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('two', 'three')">上一步</a>
                选择商品属性
            </p>
            <div class="choose">
                <ul>
                    <li v-for="item in productTypeList" @click="getProductType(item.type)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>-->
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateTHReceipt} from './../../Api/commonality/operate'
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
                "shopId": "", // 店铺
                "repositoryId": "" // 收货库位
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
            console.log(this.shopListByCo)
            console.log(this.repositoryList)
            if (this.isShow === false) {
                this.$emit("closePopup", false);
                this.newDatas.productType = ""; // 商品属性ID
                this.newDatas.repositoryId = ""; // 入库库位ID
                this.newDatas.shopId = ""; // 店铺ID
            }
        },
        'shopListByCo': function () { // 店铺列表
            if (this.shopListByCo.length === 1) {
                this.newDatas.shopId = this.shopListByCo[0].shopId;
                this.cutData.one = false;
                this.cutData.two = true;
            }
        }
    },
    created () {
        this.workRepositoryList();
        this.getShopListByCo();
        this.isShow = this.newPopup;
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "repositoryList" // 库位列表
        ])
    },
    methods: {
        test () {
            console.log(this.repositoryList)
        },
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo" // 店铺列表
        ]),
        toPageFun (to, from) { // 去到的， 目前的
            this.cutData[to] = true;
            this.cutData[from] = false;
        },
        getShopId (parm) { // 绑定店铺id
            this.newDatas.shopId = parm;
            this.cutData.one = false;
            this.cutData.two = true;
        },
        getProductType (parm) { // 绑定店铺Id
            var options = {
                "storageId": this.newDatas.repositoryId, // 收货库位
                "shopId": this.newDatas.shopId, // 店铺
                "productProperty": parm,
            }
            this.isLoading = true;
            operateCreateTHReceipt(options).then((response) => { // 新建单据
                this.isLoading = false;
                if (this.isLoading == false) {
                    if (response.data.state === 200) {
                    this.$router.push({
                        path: "/work/salesReturn/newSalesReturn",
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
                console.log(response);
            })
            this.cutData.one = false;
            this.cutData.two = false;
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
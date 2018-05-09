<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body">
            <div class="classes-block" v-if="cutData.one">
                <div class="title">选择退库库位</div>
                <ul class="list">
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">{{item.repositoryName}}</li>
                </ul>
                <div class="footer">
                    <!--<span class="pre" @click="toPageFun('one', 'two')">上一步</span>-->
                    <span class="next" v-if="newDatas.repositoryId"  @click="toPageFun('two', 'one')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.two">
                <div class="title">选择收货供应商</div>
                <ul class="list">
                    <li :class="{on: newDatas.supplierId === item.supplierId}" v-for="item in supplierListData" @click="getSupplierId(item.supplierId)">{{item.supplierName}}</li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('one', 'two')">上一步</span>
                    <span class="next"@click="toPageFun('three', 'two')">跳过</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.three">
                <div class="title">选择商品属性</div>
                <ul class="list">
                    <li :class="{on: newDatas.productType === item.type}" v-for="item in productTypeList" @click="getType(item.type)">{{item.name}}</li>
                </ul>
                <div class="footer">
                    <!--<span class="pre" @click="toPageFun('three', 'four')">上一步</span>
                    <span class="next" @click="getshopId('')">跳过</span>-->
                </div>
            </div>
        </div>
        <!--<div class="list" v-if="cutData.one">
            <p class="popTitle">
                <span>选择退库库位</span>
                <a v-if="newDatas.repositoryId" href="javascript:void(0)" class="skip" @click="toPageFun('two', 'one')">下一步</a>
            </p>
            <div class="choose">
                <ul>
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">
                        {{item.repositoryName}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="list" v-if="cutData.two">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('one', 'two')">上一步</a>
                选择收货供应商
                <a href="javascript:void(0)" class="skip" @click="toPageFun('three', 'two')">跳过</a>
            </p>
            <div class="choose">
                <ul>
                    <li :class="{on: newDatas.supplierId === item.supplierId}" v-for="item in supplierListData" @click="getSupplierId(item.supplierId)">
                        {{item.supplierName}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="list" v-if="cutData.three" v-loading="isLoading" element-loading-text="拼命加载中">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('two', 'three')">上一步</a>
                选择商品属性
            </p>
            <ul>
                <li :class="{on: newDatas.productType === item.type}" v-for="item in productTypeList" @click="getType(item.type)">
                    {{item.name}}
                </li>
            </ul>
        </div>-->
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateTKReceipt} from './../../Api/commonality/operate'
export default {
    data () {
        return {
            "cutData": {
                "one": true,
                "two": false,
                "three": false
            },
            "newDatas": { // 新增数据
                "repositoryId": "", // 库位id
                "supplierId": "", // 供应商ID
                "productType": "" // 调入柜组ID
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
            if (this.isShow === false) {
                this.$emit("closePopup", false);
                this.cutData.one = true;
                this.cutData.two = false;
                this.newDatas.productType = ""; // 商品属性ID
                this.newDatas.repositoryId = ""; // 入库库位ID
                this.newDatas.repositoryOutId = ""; // 出货库位ID
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
            "repositoryList", // 库位列表
            "supplierListData" // 供应商
        ])
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "workSupplierList" // 供应商
        ]),
        toPageFun (to, from) { // 去到的， 目前的
            this.cutData[to] = true;
            this.cutData[from] = false;
        },
        getRepositoryId (parm) { // 退货库位
            this.newDatas.repositoryId = parm;
            if (this.supplierListData.length > 0) { // 有店铺
                this.cutData.one = false;
                this.cutData.two = true;
            } else {
                this.cutData.one = false;
                this.cutData.three = true;
            }
        },
        getSupplierId (parm) { // 绑定供应商
            this.newDatas.supplierId = parm;
            this.cutData.two = false;
            this.cutData.three = true;
        },
        getType (parm) { // 绑定入库库位Id
            var options = {
                "storageId": this.newDatas.repositoryId, // 退货库位
                "supplierId": this.newDatas.supplierId, // 供应商
                "productProperty": parm, // 调入柜组
            }
            this.isLoading = true;
            //console.log(this.newDatas)
            sessionStorage.setItem("确定新建入库", JSON.stringify(options));
            operateCreateTKReceipt(options).then((response) => { // 新建单据
                this.isLoading = false;
                if (this.isLoading == false) {
                    if (response.data.state === 200) {
                        this.$router.push({
                            path: "/work/storageReturn/newStorageReturn",
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
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="../../assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>
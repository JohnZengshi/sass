<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body">
            <div class="classes-block" v-if="cutData.one">
                <div class="title">选择发货库位</div>
                <ul class="list">
                    <li :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId1(item.repositoryId)">{{item.repositoryName}}</li>
                </ul>
                <div class="footer">
                    <!--<span class="pre" @click="toPageFun('one', 'two')">上一步</span>-->
                    <span class="next" v-if="newDatas.repositoryId" @click="toPageFun('two', 'one')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.two" v-loading="isLoading" element-loading-text="拼命加载中">
                <div class="title">选择收货店铺</div>
                <ul class="list">
                    <li v-for="item in allShopList" @click="getShopId(item.shopId)">{{item.shopName}}</li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('one', 'two')">上一步</span>
                    <!--<span class="next" @click="getshopId('')">跳过</span>-->
                </div>
            </div>
        </div>
        <!--<div class="list" v-if="cutData.one">
 
        <div class="list" v-if="cutData.two" v-loading="isLoading" element-loading-text="拼命加载中">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('one', 'two')">上一步</a>
                选择收货店铺
            </p>
            <div class="choose">
                <ul>
                    <li v-for="item in shopListByCo" @click="getShopId(item.shopId)">
                        {{item.shopName}}
                    </li>
                </ul>
            </div>
        </div>-->
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateFHReceipt} from './../../Api/commonality/operate'
import {seekShowCounterList, seekGetShopListByCo} from '../../Api/commonality/seek'
export default {
    data () {
        return {
            "allShopList": [],
            "counterList": [], // 柜组列表
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
            "isLoading": false,
            shopId: ''
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
        // this.getShopListByCo();
        this._seekGetShopListByCo()
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
        _seekGetShopListByCo () {
            var options = {
              "page": "1",
              "pageSize": "0",
              "type": 3
            }
            seekGetShopListByCo(options).then((res) => {
                if (res.data.state === 200) {
                   this.allShopList = res.data.data.shopList
                } else {

                }
            })
            
        },
        // getCounterList (parm) { // 柜组列表
        //     this.shopId = parm
        //     let options = {
        //         "shopId": parm // 店铺ID
        //     }
        //     seekShowCounterList(options).then((response) => {
        //         if (response.data.state === 200) {
                    
        //             this.counterList = response.data.data.counterList; 
        //         }
        //     }, (response) => {
        //         console.log(response)
        //     })
        // },
        getShopId (parm) {
            this.shopId = parm
            this.cutData.two = false;
            this.cutData.three = false;
            //this.cutData.three = true;
            //this.getCounterList(parm)
            this.getShopIdGo(parm)
        },
        getShopIdGo (parm) { // 绑定店铺Id
            var options = {
                "storageId": this.newDatas.repositoryId, // 库位ID
                "shopId": parm, // 店铺
                //"counterId": parm
            }
            this.isLoading = true;
            operateCreateFHReceipt(options).then((response) => { // 新建单据
                this.isLoading = false;
                if (response.data.state === 200) {     
                    if (this.isLoading == false) {
                        this.cutData.two = false;
                        this.$router.push({
                            path: "/work/sipping/newSipping",
                            query: {
                                "orderNumber": response.data.data.orderNum,
                                "isRole": "Y",
                                "isCheckOrderMan": "N"
                            }
                        })
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.isLoading = false;
                console.log(response);
            })
            this.cutData.one = false;
            this.cutData.two = false;
        },
        getRepositoryId1 (parm) { // 绑定库位Id
            this.newDatas.repositoryId = parm;
            // this.getShopIdGo(parm)
            this.cutData.one = false;
            this.cutData.two = true;
        },
        getRepositoryId (parm) { // 绑定库位Id
            //this.newDatas.repositoryId = parm;
            this.getShopIdGo(parm)
            //this.cutData.two = true;
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="../../assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>
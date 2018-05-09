<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <!--<div class="list" v-loading="isLoading" element-loading-text="拼命加载中" v-if="cutData.one">
            <p class="popTitle">
                <span>选择商品属性</span>
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
        <!-- 库位列表 -->
        <!--<div class="list" v-loading="isLoading" element-loading-text="拼命加载中" v-if="cutData.one">
            <p class="popTitle">
                <span>选择修改库位</span>
            </p>
            <div class="choose">
                <ul>
                    <li :title="item.repositoryName" :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">
                        {{item.repositoryName}}
                    </li>
                </ul>
            </div>
        </div>-->
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body" v-loading="isLoading">
            <div class="classes-block" v-if="cutData.one">
                <div class="title">选择修改库位</div>
                <ul class="list">
                    <li :title="item.repositoryName" :class="{on: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">{{item.repositoryName}}</li>
                </ul>
                <div class="footer">
                    <!--<span class="pre" @click="toPageFun('three', 'four')">上一步</span>
                    <span class="next" @click="getshopId('')">跳过</span>-->
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateXGReceipt} from './../../Api/commonality/operate'
export default {
    data () {
        return {
            productProperty: '',
            "productTypeList": null,
            "productTypeListSmall": null,
            "transform": true,
            "fourBig": false,
            "isLoading": false,
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
                "repositoryId": "" // 库位ID
            },
            "isShow": false
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
        this.isShow = this.newPopup;
    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
        ])
    },
    methods: {
        ...mapActions([
            "workRepositoryList" // 库位列表
        ]),
        getProductProperty (parm) {
            this.productProperty = parm
            this.cutData.one = false
            this.cutData.two = true
        },
        getRepositoryId (parm) { // 绑定店铺Id
            var options = {
                "storageId": parm, // 库位ID
                'productProperty': 1
            }
            this.isLoading = true;
            operateCreateXGReceipt(options).then((response) => { // 新建单据
                this.isLoading = false;
                if (response.data.state === 200) {
                    if (this.isLoading == false) {
                        this.cutData.one = false
                        this.cutData.two = false
                        this.$router.push({
                            path: "/work/amend/index",
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
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="../../assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>
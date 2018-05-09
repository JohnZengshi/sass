<template>
    <!-- 调库 -->
    <div class="plain-detail-main" v-if="receiptsIntroList">
        <div class="body">
            <ul>
                <li>
                    <span :class="{active: repositoryList.length <= 1 && receiptsIntroList.checkType == 3}">{{receiptsIntroList.storageName2}}</span>
                    <!-- <div class="menu-list" v-if="receiptsIntroList.checkType != 3 && repositoryList.length > 1">
                        <div v-for="(item, index) in repositoryList" @click="itemAct(1, item.repositoryId2, item.repositoryName2)">{{item.repositoryName2}}</div>
                    </div> -->
                </li>
                <li>
                    <span :class="{active: repositoryList.length <= 1 && receiptsIntroList.checkType == 3}">{{receiptsIntroList.storageName}}</span>
                    <i v-if="repositoryList.length > 1 && receiptsIntroList.checkType != 3" class="el-icon-caret-bottom"></i>
                    <div class="menu-list" v-if="receiptsIntroList.checkType != 3  && repositoryList.length > 1">
                        <div v-for="(item, index) in repositoryList" @click="itemAct(1, item.repositoryId, item.repositoryName)">{{item.repositoryName}}</div>
                    </div>
                </li>
                
            </ul>   
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {operateDelReceipt, operateHandleXGReceipt} from './../../Api/commonality/operate'
import {statusReceipts} from './../../Api/commonality/status'
export default {
    props: [
        'receiptsIntroList',
    ],
    data () {
        return {
            "isAmend": false
        }
    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
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
        }
    },
    created () {
        this.workRepositoryList();
    },
    methods: {
        ...mapActions([
            "workRepositoryList" // 库位列表
        ]),
        itemAct (type, id, name) {
            if (type == 1) {
                this.receiptsIntroList.storageId = id
                this.receiptsIntroList.storageName = name
            }
        },
        getState (parm) {
            if (parm === "1") {
                return "未收货"
            } else {
                return "已收货"
            }
        },
        // openAmend () {
        //     this.isAmend = true;
        // },
        amendShop (dataType, objectData) { // 修改入库库位
            let options = {
                "modifyList": [{
                    "dataType": dataType,
                    "objectData": objectData
                }],
                "orderNum": this.$route.query.orderNumber,
                "modelType": "1"
            }
            operateHandleXGReceipt(options).then((response) => {
                if (response.data.state === 200) {
                    console.log("修改成功");
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg);
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
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, response => {
                this.$store.dispatch('workPopupError', response.data.msg);
            })
        }
    }
}
</script>
<style src="./../../assets/css/template/newReceiptsIntro.scss" lang="scss" scoped></style>
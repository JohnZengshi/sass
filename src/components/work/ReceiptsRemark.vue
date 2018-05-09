<template>
<div class="plain-receipts-detail">
    <!--<div class="body-box-right-header">
        <span>备注：</span>
         <img v-if='receiptsIntroList.checkType === "1"' @click.stop="openAmend" class="option-icon" src="../../assets/img/work/receipts-amend-icon.png" alt="">
        <img v-if="isAmend" src="../../assets/img/work/receipts-amend-icon.png" alt="" @click="reviseRemark">
            <a href="javascript:void(0)">修改备注</a>
        <a href="javascript:void(0)" v-else @click="submitRemark">保存</a>      
    </div>-->
    <!--<div class="body-box-right-content">
        {{receiptRemark}}
        <p class="title-style">
            {{preciseSun}}
            {{preciseMinute}}
        </p>
        <p class="title-body-style" v-if="isAmend">
            {{receiptRemark.orderRemarkList[0].content}}
        </p>
        <textarea v-else class="title-body-textarea" v-model="receiptRemark.orderRemarkList[0].content"></textarea>
    </div>-->
    <ul>
        <li v-for="(item, index) in receiptRemark.orderCheckRemarkList">
            <span class="dian"><span v-if="isEdit == false">●</span><i v-else class="el-icon-circle-cross" @click="deleteRemark(item)"></i></span>
            <span class="content">{{item.content}}</span>
            <div class="time">
                <span>{{item.orderCheckRemarkManName}}</span> /
                <span>{{item.createTime}}</span>
            </div>
        </li>
        <li v-for="(item, index) in receiptRemark.orderRemarkList">
            <span class="dian"><span v-if="isEdit == false">●</span><i v-else class="el-icon-circle-cross" @click="deleteRemark(item)"></i></span>
            <span class="content">{{item.content}}</span>
            <div class="time">
                <span>{{item.orderRemarkManName}}</span> /
                <span>{{item.createTime}}</span>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
import { operateHandleXGReceipt } from './../../Api/commonality/operate'
import { seekReceiptRemark } from './../../Api/commonality/seek'
export default {
    data () {
        return {
            "isAmend": true,
            "receiptRemark": {
                "orderCheckRemarkList": [],
                "orderRemarkList": [],
            }
        }
    },
    props: [
        'isEdit',
        'refresh'
    ],
    watch: {
        'refresh': function (val) {
            console.log(val)
            this.getReceiptRemark()
        }
    },
    computed: {
        preciseSun: function () { // 年
            if (this.receiptRemark.orderRemarkList[0].createTime) {
                let parm = this.receiptRemark.orderRemarkList[0].createTime;
                var Year = parm.slice(0, 4);
                var Month = parm.slice(4, 6);
                var Sun = parm.slice(6, 8);
                var allTime = Year + "-" + Month + "-" + Sun
                return allTime;
            }
        },
        preciseMinute: function () { // 分
            if (this.receiptRemark.orderRemarkList[0].createTime) {
                let parm = this.receiptRemark.orderRemarkList[0].createTime;
                var ConfigData = parm.slice(8, 10);
                var Mour = parm.slice(10, 12);
                var allTime = ConfigData + ":" + Mour
                return allTime;
            }
        }
    },
    created () {
        this.getReceiptRemark(); // 单据备注
    },
    mounted () {
        $(".plain-receipts-detail").mCustomScrollbar({
            theme: "minimal-dark"
        });
    },
    methods: {
        // 删除备注
        deleteRemark (item) {
            this.$emit('del', {type: true, item: item})
        },
        reviseRemark () { // 修改备注
            this.isAmend = false;
        },
        submitRemark () { // 提交备注
            this.isAmend = true;
            this.$emit('refresh', 'refresh!')
            let options = {
                "modifyList": [{
                    "dataType": "5",
                    "objectData": this.receiptRemark.orderRemarkList[0].content
                }],
                "orderNum": this.$route.query.orderNumber,
                "modelType": "6"
            };
            operateHandleXGReceipt(options).then((response) => {
                if (response.data.state === 200) {
                    this.getReceiptRemark();
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                console.log(response)
            })
        },
        getReceiptRemark () { // 单据备注
            let options = {
                "orderNum": this.$route.query.orderNumber
            }
            seekReceiptRemark(options).then((response) => {
                // console.log("单据备注");
                console.log(response.data)
                if (response.data.state === 200) {
                    if (response.data.data.orderRemarkList.length > 0) {
                        this.receiptRemark = response.data.data;
                        for (let i = 0; i < response.data.data.orderRemarkList.length; i++) {
                            let year = response.data.data.orderRemarkList[i].createTime.substring(0, 4)
                            let month = response.data.data.orderRemarkList[i].createTime.substring(4, 6)
                            let data = response.data.data.orderRemarkList[i].createTime.substring(6, 8)
                            let hour = response.data.data.orderRemarkList[i].createTime.substring(8, 10)
                            let time = response.data.data.orderRemarkList[i].createTime.substring(10, 12)
                            this.receiptRemark.orderRemarkList[i].createTime = year + "-" + month + "-" + data + " " + hour + ":" + time
                        }
                    }
                    if (response.data.data.orderCheckRemarkList.length > 0) {
                        this.receiptRemark = response.data.data;
                        for (let j = 0; j < response.data.data.orderCheckRemarkList.length; j++) {
                            let year1 = response.data.data.orderCheckRemarkList[j].createTime.substring(0, 4)
                            let month1 = response.data.data.orderCheckRemarkList[j].createTime.substring(4, 6)
                            let data1 = response.data.data.orderCheckRemarkList[j].createTime.substring(6, 8)
                            let hour1 = response.data.data.orderCheckRemarkList[j].createTime.substring(8, 10)
                            let time1 = response.data.data.orderCheckRemarkList[j].createTime.substring(10, 12)
                            this.receiptRemark.orderCheckRemarkList[j].createTime = year1 + "-" + month1 + "-" + data1 + " " + hour1 + ":" + time1
                        }
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                console.log(response);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.plain-receipts-detail{
    height: 75px;
    ul {
        li {
            width: 100%;
            height: 20px;
            margin-bottom: 10px;
            .dian {
                float: left;
                margin-right: 10px;
                .el-icon-circle-cross {
                    cursor: pointer;
                }
            }
            .content {
                float: left;
                font-size: 12px;
                color:#333;
                height:20px;
                display: block;
                width: 150px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .time {
                float: right;
                height:20px;
                font-size: 12px;
                color:#999;
                max-width: 139px;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align:right;
                white-space: nowrap;
                span {
                    font-size: 12px;
                    color:#999;
                }
            }
        }
        li:nth-child(1n+0) .dian {
            color: #f7b73b;
        }
        li:nth-child(2n+0) .dian {
            color: #ef8641;
        }
        li:nth-child(3n+0) .dian {
            color: #cd5867;
        }
    }
}
</style>
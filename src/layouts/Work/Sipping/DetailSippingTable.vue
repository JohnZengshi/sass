<template>
    <div class="item-box">
        <table border="1" cellpadding="0" cellspacing="0" v-if="storageData">
            <caption>发货明细表</caption>
            <tr>
                <td>单据号</td>
                <td colspan="2">{{storageData.base.orderNumber}}</td>
                <td>操作部门</td>
                <td colspan="2">{{storageData.base.operation}}</td>
                <td>供应商</td>
                <td colspan="4">{{storageData.base.provider}}</td>
            </tr>
            <tr>
                <td>入库库位</td>
                <td colspan="2" >{{storageData.base.repository}}</td>
                <td>产品类别</td>
                <td colspan="2">{{storageData.base.productCategory}}</td>
                <td>计划分销</td>
                <td colspan="4">{{storageData.base.planSold}}</td>
            </tr>
            <tr>
                <td>序号</td>
                <td>产品类别</td>
                <td>首饰名称</td>
                <td>条码号</td>
                <td>总件重</td>
                <td>净金重</td>
                <td>计划号</td>
                <td>主石</td>
                <td>副石</td>
                <td>售价</td>
                <td>成本(如有)</td>
            </tr>
            <tr v-for="(item, index) in storageData.list">
                <td>{{index+1}}</td>
                <td v-if="item.isShow" :rowspan="item.rowspanNum">{{item.classesName}}</td>
                <td>{{item.subName}}</td>
                <td>{{item.barcode}}</td>
                <td>{{item.countNum}}</td>
                <td>{{item.totalWeight}}</td>
                <td>{{item.netWeight}}</td>
                <td>{{item.count1}}</td>
                <td>{{item.count2}}</td>
                <td>{{item.soldPrice}}</td>
                <td>{{item.costPrice}}</td>
            </tr>
            <tr>
                <td colspan="11" class="text-l">
                    备注：{{storageData.base.remarks}}
                    <span>制单时间：{{storageData.base.makeTime}}</span>
                </td>
            </tr>
            <tr>
                <td colspan="11">
                    <p>制单人：{{storageData.base.makeMan}}</p>
                    <p>审核人：{{storageData.base.auditor}}</p>
                </td>
            </tr>
        </table>
        <a class="print-btn" href="javascript: null" @click="printFun">打印</a> 
    </div>
</template>
<script>
import Vue from "vue"
export default {
    data () {
        return {
            "rowspanValue": {},
            "storageData": {
                "base": {},
                "list": {},
                "originalList": {}
            },
            "lastIndex": 0,
            "rowspan": 0,
            "newValue": "", // 当前名字
            "isShowRow": [] // 是否显示当前行
        }
    },
    created () {
        this.getAjaxData();
    },
    methods: {
        xiao (parm) {
            var newValue = sessionStorage.getItem("newValue") || "";
            if (newValue !== parm) {
                return true;
            } else {
                return fasle
            }
        },
        getAjaxData () {
            var data = {
                "data": {
                    "orderNo": sessionStorage.getItem("orderNumber")
                },
                "unit": {
                    "companyId": sessionStorage.getItem("companyId"),
                    "channel": 3,
                    "OS": "web",
                    "ip": "string",
                    "userId": sessionStorage.getItem("id"),
                    "tokenId": sessionStorage.getItem("tokenId")
                }
            }
            var url = INTERFACE_URL_9083 + "/v1/export/exportData";
            this.$http.post(url, data).then((response) => {
                this.storageData.base = response.data.data.base;
                this.storageData.list = response.data.data.list;
                this.storageData.originalList = response.data.data.list;
                this.configRow(response.data.data.list);
                this.configShow(response.data.data.list);
            }, (response) => {
                console.log(response);
            })
        },
        configRow (parm) { // 配置产品类别的rowspan
            for (let i of parm) {
                if (i.classesName) {
                    if (this.rowspanValue[i.classesName]) {
                        this.rowspanValue[i.classesName] += 1;
                    } else {
                        this.rowspanValue[i.classesName] = 1;
                    }
                }
            }
        },
        configShow (parm) { // 配置产品类别占行数
            var Name = ""; // 名字监听重复
            var showList = parm;
            for (var i = 0; i < showList.length; i++) {
                if (showList[i].classesName !== Name) { // 如果Name不等于现在循环到的值，1.第一次，2.切换名字
                    Name = showList[i].classesName;
                    showList[i].rowspanNum = this.rowspanValue[Name];
                    showList[i].isShow = true;
                } else { // 说明不是第一次了
                    showList[i].isShow = false;
                }
            }
            this.storageData.list = showList;
        },
        startEnd (parm) { // 开始和结束
            var _self = this;
            var showList = parm;
            var dataList = [];
            for (var i = 0; i < showList.length; i++) { // 提取所有结果的产品类别名字
                if (i > 0) {
                    if (i < 32) {
                        if (Number.isInteger(i / 31)) {
                            let objList = {
                                "name": showList[i].classesName, // 名字
                                "endNum": i // 结束的下标
                            }
                            dataList.push(objList);
                        }
                    } else {
                        if (Number.isInteger(i / 43)) {
                            let objList = {
                                "name": showList[i].classesName, // 名字
                                "endNum": i // 结束的下标
                            }
                            dataList.push(objList);
                        }
                    }
                }
            }
            for (var j of dataList) {
                var startName = ""; // 开始的
                for (var k = 0; k < this.storageData.list.length; k++) {
                    if (this.storageData.list[k].classesName === j.name) {
                        if (startName !== j.name) {
                            startName = j.name;
                            var nameList = []; // 所有的下标
                            var startNum = ""; // 开始的下标
                            var previousRowSpan = ""; // 上一页的行占数;
                            var nextRowSpan = ""; // 上一页的行占数;
                            var endNum = ""; // 结束的下标
                            for (let i = 0; i < this.storageData.list.length; i++) { // 提取当前结束值的所有的下标
                                if (this.storageData.list[i].classesName === j.name) {
                                    nameList.push(i);
                                }
                            }
                            startNum = nameList[0];
                            endNum = nameList[nameList.length - 1];
                            previousRowSpan = j.endNum - startNum;
                            nextRowSpan = endNum - j.endNum + 1;
                            let rowspanNum = "rowspanNum";
                            let isShow = "isShow";
                            Vue.set(this.storageData.list[k], rowspanNum, previousRowSpan);
                            Vue.set(this.storageData.list[j.endNum], rowspanNum, nextRowSpan);
                            Vue.set(this.storageData.list[j.endNum], isShow, true);
                        }
                    }
                }
            }
            setTimeout(function() {
                window.print();
            }, 300)
            setTimeout(function() {
                var originalList = JSON.stringify(_self.storageData.originalList);
                _self.storageData.list = JSON.parse(originalList);
                _self.storageData.list = _self.storageData.originalList;
            }, 5000)
        },
        printFun () {
            this.startEnd(this.storageData.originalList);

        }
    }
}
</script> 
<style lang="scss" scoped>
.item-box{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    // border: 5px solid red;
    table{
        width: 700px;
        // height: 595px;
        border-collapse: collapse;
        margin: 0 auto;
        font-size: 12px;
        page-break-inside: avoid;
    }
    tr{
        page-break-inside: avoid;
    }
    td{
        page-break-inside: avoid;
    }
    caption{
        height: 60px;
        line-height: 60px;
    }
    td{
        // width: 9%;
        text-align: center;
        height: 28px;
        line-height: 28px;
    }
    td p{
        float: left;
        width: 25%;
        text-align: left;
        padding-left:10px;
    }
    td p:last-child{
        float: right;
        text-align: right;
        padding-right: 10px;
    }
    // td.text-l{
    //     text-align: left;
    //     padding:0 10px;
    // }
    td span{
        float: right;
    }
    .print-btn{
        display: inline-block;
        height: 60px;
        line-height: 60px;
        text-align: center;
        width: 200px;
        border-radius: 5px;
        background-color: red;
    }
}
</style>

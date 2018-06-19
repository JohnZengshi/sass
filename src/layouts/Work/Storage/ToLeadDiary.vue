<template>
    <el-dialog class="dialog-w900-h550-hn" @close="closeCb" @open="getList" title="选择产品类型" v-model="saveSuccess">
        <div class="to-lead-diary-main">
            <div class="batch-top">
                <h3>导入日记</h3>
                <a href="javascript: void(0)" @click="closeCb">关闭</a>
            </div>
            <div class="batch-body">
                <div class="table-wrap">   
                    <el-checkbox-group v-model="checkList"> 
                        <table class="new-template-table" cellpadding="0" cellspacing="0">
                            <thead>
                                <tr class="tr-header">
                                    <th>时间</th>
                                    <th>操作人</th>
                                    <th>导入位置</th>
                                    <th>状态</th>
                                    <th>下载</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="item" v-for="(item, index) in diaryList">
                                    <td>
                                        <span v-text="preciseSun(item.createTime)"></span>
                                        <span class="ml10" v-text="preciseMinute(item.createTime)"></span>
                                    </td>
                                    <td>{{item.userName}}</td>
                                    <td>{{item.storageName}}</td>
                                    <td>{{getSucceed(item.status)}}</td>
                                    <td><a class="download-btn" :href="item.fileSrc">下载</a></td>
                                    <td @click="revocationFun(item.logId, index, item.status)"><a class="revocation-btn " :class="{ 'on-jurisdiction': item.status !== '0' }" href="javascript: void(0)">撤销导入</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </el-checkbox-group>
                </div>
                <div class="body-page">
                    <div class="paga-30">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalNum">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import {seekDiary} from "../../../Api/commonality/seek"
import {operateDelJinbaifu} from "../../../Api/commonality/operate"
import {statusSucceed} from "../../../Api/commonality/status"
export default {
    props: [
        'newPopup'
    ],
    data () {
        return {
            pickerOptions10: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            search: null,
            checked: false,
            saveSuccess: true,
            // startTime: null,
            // endTime: null,
            modelType: null,
            checkList: [],
            currentPage: 1,
            diaryList: [],
            totalNum: 0,
            pageSize: 10
        }
    },
    watch: {
        'newPopup': function () {
            if (this.newPopup === true) {
                this.saveSuccess = this.newPopup;
            }
        },
        'checkList': function () { // 监听全选
            this.pageJudgeFun();
        },
    },
    created () {
        this.getList();
    },
    methods: {
        handleSizeChange (val) {
            this.pageSize = val;
        },
        handleCurrentChange (val) {
            this.currentPage = val;
            this.getList();
        },
        preciseSun: function (parm) { // 年
            if (parm) {
                var Year = parm.slice(0, 4);
                var Month = parm.slice(4, 6);
                var Sun = parm.slice(6, 8);
                var allTime = Year + "-" + Month + "-" + Sun
                return allTime;
            }
        },
        preciseMinute: function (parm) { // 分
            if (parm) {
                var ConfigData = parm.slice(8, 10);
                var Mour = parm.slice(10, 12);
                var allTime = ConfigData + ":" + Mour
                return allTime;
            }
        },
        getSucceed (parm) {
            return statusSucceed(parm);
        },
        closeCb () {
            this.$emit('closePopup', false)
        },
        revocationFun (logId, index, status) {
            if (status === "0") {
                let options = {
                    "logId": logId
                }
                operateDelJinbaifu(options).then((response) => {
                    if (response.data.state === 200) {
                        this.diaryList[index].status = '2';
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg);
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg);
                })
            }
        },
        getList () {
            let options = {
                "page": this.currentPage,
                "pageSize": this.pageSize
            }
            seekDiary(options).then((response) => {
                if (response.data.state === 200) {
                    this.totalNum = response.data.data.totalNum
                    this.diaryList = response.data.data.dataList;
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/css/template/fonts.scss";
.to-lead-diary-main{
    width: 100%;
    height: 550px;
    .batch-top{
        height: 40px;
        padding: 0 20px;
        h3{
            @include F(16);
            font-weight: normal;
            margin-top: 8px;
            color: #333;
            display: inline-block;
        }
        a{
            display: inline-block;
            margin-top: 8px;
            @include F(16);
            color: #999;
            float: right;
        }
    }
    .batch-body{
        height: 600px;
        width: 860px;
        margin-left: 20px;
       // border: 1px solid red;
        overflow: auto;
        .table-wrap{
            height: 440px;
            border: 1px solid #e6e6e6;
            overflow: auto;
        }
        .new-template-table{
            width: 100%;
            background-color: #e8e9eb;
            .tr-header{
                height: 30px;
                background-color: #4fdcca!important;
                th{
                    color: #fff;
                    position: relative;
                    @include F(14);
                }
            }
            tr{
                height: 40px;
                width: 100%;
                .download-btn{
                    text-decoration: underline;
                    @include F(12);
                }
                .revocation-btn{
                    display: inline-block;
                    height: 24px;
                    width: 64px;
                    line-height: 24px;
                    color: #fff;
                    border-radius: 4px;
                    @include F(12);
                    background-color: #4fdcca;
                }
                .on-jurisdiction{
                    background-color: #ccc;
                }
            }
            tr:nth-child(odd){
                background-color: #fff;
            }
            tr:nth-child(even){
                background-color: #f6f7f8;
            }
            tr{
                &:hover{
                    background-color: #e6f8f6;
                }
            }
            td{
                text-align: center;
                @include F(12);
                color: #333;
                height: 40px;
                overflow: hidden;
                white-space:nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            td{
                color: #333;
            }
            .table-pull{
                padding: 0!important;
            }
            .del-product{
                cursor: pointer;
            }
        }
        .body-page{
            // border: 1px solid red;
            height: 30px;
            margin-top: 20px;
        }
    }
    .batch-footer{
        height: 80px;
        padding-left: 434px;
    }
}
</style>
<template>
    <el-dialog :modal="modal" class="dialog-w320-hAuto-hn" :class="{delectInvoicesClass: (dialogType == 'Tip') , NotelogDialogClass: (dialogType == 'Notelog')}"
        :before-close="handleclose" :visible="isShowDialog">
        <!-- 提示弹窗 -->
        <template v-if="dialogType == 'Tip'">
            <div class="outeronehtml flex flex-v flex-align-center">
                <img class="close-icon" src="../../../assets/img/close-preview.png" @click.stop="handleclose" />
                <img class="headerimg" src="static/img/message/5.png" />
                <h3>提示</h3>
                <span>{{tipMsg}}</span>
                <div class="bottomButton flex flex-r flex-pack-justify">
                    <div class="clost-div" @click.stop="handleclose">取&nbsp;消</div>
                    <div class="mybtn-div" @click.stop="confirmrequest">确&nbsp;定</div>
                </div>
            </div>
        </template>
        <!-- 短信日志弹窗 -->
        <template v-else-if="dialogType == 'Notelog'">
            <div class="noteLogBox">
                <img class="close-icon" src="../../../assets/img/close-preview.png" @click.stop="handleclose" />
                <span class="noteName">十一店庆</span>
                <div class="sendContent flex flex-r flex-pack-justify">
                    <span>发送内容</span>
                    <span>尊敬的{1用户名字}客户，今天是您的生日，{2店铺简称}衷心祝愿您生日快乐。今日到店消费有生日优惠，部分商品五折起，愿最美丽的首饰给你带来好心情。店铺地址：{3店铺地址}，联系电话{4店铺联系方式}.</span>
                </div>
                <div class="sendPreson clearfix">
                    <span>发送人</span>
                    <div class="chooseTime flex flex-r flex-align-center flex-pack-justify">
                        <div class="xj_time">
                            <xjTime></xjTime>
                        </div>
                        <div class="sendWord flex flex-v">
                            <div>
                                <span>发送成功</span>
                                <span class="sendSuccess">85</span>
                            </div>
                            <div>
                                <span>发送失败</span>
                                <span class="sendFail">12</span>
                            </div>
                        </div>
                    </div>
                    <div class="sendPresonList">
                        <TableBody 
                            :headerData="headerData" 
                            :tableData="noteList" 
                            :showHeader="true" 
                            :isSort="false" 
                            :operationConfig="operationConfig"
                            styleClass="el_table_noteLog"></TableBody>
                    </div>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script>
    import xjTime from "base/time/xj-time";
    import TableBody from "./tableBody";
    import {
        noteLogListHeader
    } from "../config/config.js";
    export default {
        name: 'dataisdelete',
        props: [
            'dialogType', //弹窗类型
            'isShowDialog', //弹窗显示
            'tipMsg', //弹窗提示语
            'modal' //模态框
        ],
        components: {
            TableBody,
            xjTime
        },
        watch: {},
        data() {
            return {
                noteList: [{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: false,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                },{
                    userName: "刘大宝",
                    userPhone: 13584512542,
                    sendTime: "2019-06-03",
                    sendState: true,
                }],
                operationConfig: {
                    operation: false,
                },
                // headerData: [],
            }
        },
        created() {
            // this.headerData = noteLogListHeader
        },
        computed:{
            headerData:function(){
                return noteLogListHeader
            }
        },
        methods: {
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            confirmrequest() {
                //确认
                this.$emit('confirm', false);
                this.$message({
                    type: 'info',
                    message: '确定'
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .outeronehtml {
        z-index: 9999;
        width: 320px;
        height: 255px;
        position: relative;
        .headerimg {
            width: 46px;
            height: 46px;
            margin-top: 24px;
        }
        h3 {
            margin-top: 15px;
            font-size: 14px;
            font-weight: bold;
        }
        span {
            margin-top: 43px;
            font-size: 14px;
        }
        .bottomButton {
            width: 200px;
            margin-top: 41px;
            .mybtn-div {
                border: 1px solid #2993f8;
                width: 90px;
                height: 28px;
                border-radius: 5px;
                line-height: 28px;
                text-align: center;
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                background-color: #2993f8;
                box-sizing: border-box;
                cursor: pointer;
            }
            .clost-div {
                border: 1px solid #bdbdbd;
                width: 90px;
                height: 28px;
                border-radius: 5px;
                line-height: 28px;
                text-align: center;
                font-size: 12px;
                color: #2993F8;
                font-weight: bold;
                background-color: #FFF;
                box-sizing: border-box;
                cursor: pointer;
            }
        }

        .close-icon {
            position: absolute;
            top: 13px;
            right: 13px;
            display: inline-block;
            width: 14px;
            height: 14px;
            cursor: pointer;
            z-index: 99999;
        }
    }

    .noteLogBox {
        position: relative;
        padding: 19px 30px 23px 30px;
        .close-icon {
            width: 14px;
            height: 14px;
            position: absolute;
            top: 20px;
            right: 30px;
        }
        .noteName {
            font-size: 14px;
            color: #333;
            font-weight: bold;
        }
        .sendContent {
            margin-top: 38px;
            >span {
                &:first-of-type {
                    font-size: 16px;
                    color: #666;
                    padding-top: 13px;
                    font-weight: bold;
                }
                &:last-of-type {
                    display: inline-block;
                    width: 560px;
                    height: 120px;
                    background-color: #F4F4F4;
                    font-size: 14px;
                    color: #333;
                    line-height: 24px;
                    padding: 9px 11px;
                }
            }
        }
        .sendPreson {
            margin-top: 31px;
            >span {
                font-size: 16px;
                color: #666;
                font-weight: bold;
            }
            .chooseTime {
                float: right;
                .xj_time{
                    margin-right: 30px;
                }
                .sendWord{
                    >div{
                        >span{
                            line-height: 14px;
                            &:first-of-type{
                                font-size: 12px;
                                color: #333;
                                margin-right: 18px;
                            }
                            &:last-of-type{
                                font-size: 14px;
                                &.sendSuccess{
                                    color: #2993F8;
                                }
                                &.sendFail{
                                    color:#FF3C00;
                                }
                            }
                        }
                        &:first-of-type{
                            margin-bottom: 6px;
                        }
                    }
                }
            }
            .sendPresonList{
                height: 436px;
                margin-top: 30px;
            }
        }
    }

</style>

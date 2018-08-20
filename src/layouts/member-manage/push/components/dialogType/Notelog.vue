<!-- 短信日志弹窗 -->
<template>
    <div class="noteLogBox">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <span class="noteName">十一店庆</span>
        <div class="sendContent flex flex-r flex-pack-justify">
            <span>发送内容</span>
            <span>尊敬的{1用户名字}客户，今天是您的生日，{2店铺简称}衷心祝愿您生日快乐。今日到店消费有生日优惠，部分商品五折起，愿最美丽的首饰给你带来好心情。店铺地址：{3店铺地址}，联系电话{4店铺联系方式}.</span>
        </div>
        <div class="sendPreson clearfix">
            <span>发送人</span>
            <div class="chooseTime flex flex-r flex-align-center flex-pack-justify">
                <div class="xj_time">
                    <xjTime @change="changeTime"></xjTime>
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
                    :tableData="SmsTemoplateLog" 
                    :showHeader="true" 
                    :isSort="false" 
                    :operationConfig="operationConfig"
                    styleClass="el_table_noteLog"></TableBody>
            </div>
        </div>
    </div>
</template>
<script>
import {findSmsTemoplateLog} from "Api/member";
import xjTime from "base/time/xj-time";
import TableBody from "../../../base/tableBody";
import {noteLogListHeader} from "../../../config/config.js"
    export default {
        props:["data"],
        data(){
            return {
                requestData:{ //Api请求的参数
                    templateId:this.data.templateId,
                    beginTime:"",
                    endTime:"",
                },
                operationConfig: { //操作配置
                    operation: false,
                },
                upData:false //是否刷新数据
            }
        },
        components:{
            xjTime,
            TableBody
        },
        asyncComputed:{
            SmsTemoplateLog:{
                get(){
                    if (this.upData) {
                        (async () => {
                            this.upData = false;
                            let {templateId,beginTime,endTime} = this.requestData;
                            let res = await findSmsTemoplateLog({templateId,beginTime,endTime});
                            console.log(res)
                        })()
                    }
                }
            },
            headerData:{
                get(){
                    return noteLogListHeader
                }
            },
        },
        methods:{
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            // 时间选项选中时触发
            changeTime(val){
                this.requestData.beginTime = val.beginTime;
                this.requestData.endTime = val.endTime;
                this.upData = true;
            },
        }
    }

</script>
<style lang="less" scoped>
    // 短信日志弹窗内容
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
                .xj_time {
                    margin-right: 30px;
                }
                .sendWord {
                    >div {
                        >span {
                            line-height: 14px;
                            &:first-of-type {
                                font-size: 12px;
                                color: #333;
                                margin-right: 18px;
                            }
                            &:last-of-type {
                                font-size: 14px;
                                &.sendSuccess {
                                    color: #2993F8;
                                }
                                &.sendFail {
                                    color: #FF3C00;
                                }
                            }
                        }
                        &:first-of-type {
                            margin-bottom: 6px;
                        }
                    }
                }
            }
            .sendPresonList {
                height: 436px;
                margin-top: 30px;
            }
        }
    }

</style>

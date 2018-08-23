<template>
    <div class="m-m-home-page-push-main" v-loading="findSmsHomeIng">
        <div class="decoration">
            推送
        </div>
        <ul class="center-num-list" v-if="SmsHome">
            <li>
                <p>{{SmsHome.countSize}}</p>
                <p>推送总数</p>
            </li>
            <li>
                <p>{{SmsHome.daySize}}</p>
                <p>今日推送</p>
            </li>
            <li>
                <p>{{SmsHome.remainingSize}}</p>
                <p>剩余推送数量</p>
            </li>
        </ul>

        <ul class="detailsCard flex flex-r" v-if="SmsHome">
            <li class="item flex flex-v" v-for="item in SmsHome.dataList" @click="gotoModuleDetail">
                <div>{{item.teplateName}}</div>
                <div>
                    <span>未完成推送</span>
                    <span>{{item.unfinishedSize}}</span>
                </div>
                <div>
                    <span>已完成推送</span>
                    <span>{{item.completeSzie}}</span>
                </div>
                <div>
                    <span>完成度</span>
                    <span>{{item.bilv}}</span>
                </div>
            </li>
        </ul>
        
        <ul class="top-btn xj-btn-list">
            <router-link :to="{path:'push/createNote',query: {title: '新增短信',shopId:filterOption.shopId}}" class="btn" append>+推送</router-link>
            <div class="btn" @click="signatureManageClick">管理签名</div>
            <router-link :to="{path:'push/moduleManage',query:{title:'管理模板',shopId:filterOption.shopId}}" class="btn" append>管理模板</router-link>
            <router-link :to="{path:'push/noteManage',query:{title:'短信管理',shopId:filterOption.shopId}}" class="btn" append>短信管理</router-link>
            <router-link :to="{path:'push/noteManage',query:{title:'短信管理',shopId:filterOption.shopId}}" class="btn" append>我的推送</router-link>
            <div class="btn" @click="openRecharge">充值</div>
        </ul>
        <!-- 弹窗 -->
        <Dialog
            :dialogType="dialog.dialogType"
			:isShowDialog="dialog.isShowDialog"
            :modal="dialog.modal"
            :filterOption = filterOption
			@cancel="cancel"
            @confirm="confirm">
		</Dialog>
    </div>
</template>
<script>
    import {findSmsHome} from "Api/member";
    import Dialog from "../base/dialog.vue";
    import signatureManage from "../push/components/dialogType/signatureManage.vue";
    import recharge from "../../../layouts/Leaguer/components/recharge.vue"
    export default {
        props:["filterOption"],
        data() {
            return {
                cardData: [],
                dialog:{
                    isShowDialog:false,
                    dialogType:"",
                    modal:true
                },
                requestData: {
                    shopId: this.filterOption.shopId,
                    page:"1",
                    pageSize:"100",
                    beginTime:"",
                    endTime:"",
                },
                findSmsHomeIng:false 
                
            }
        },
        asyncComputed: {
            SmsHome: {
                get() {
                    if (this.filterOption.shopId) {
                        this.findSmsHomeIng = true;
                        return (async () => {
                            let shopId = this.filterOption.shopId;
                            let res = await findSmsHome({
                                shopId
                            });
                            if (res.body.msg == "OK") {
                                this.findSmsHomeIng = false;
                                return res.body.data;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    // message: res.body.msg,
                                    message: "获取到不推送信息",
                                    onClose: () => {
                                        this.findSmsHomeIng = false;
                                    }
                                });
                                return {}
                            }
                        })()
                    }
                },
                default () {
                    return null
                }
            }
        },
        watch:{

        },
        created(){
        },
        components:{
            Dialog,
            signatureManage,//管理签名弹窗
            recharge, //充值弹窗
        },
        methods:{
            // 打开管理签名弹窗
            signatureManageClick(){
                this.dialog.dialogType = 'signatureManage'
                this.dialog.isShowDialog = true;
            },
            //充值按钮
            openRecharge(){
                this.dialog.dialogType = 'recharge'
                this.dialog.isShowDialog = true;
            },
            // 弹窗确定按钮
            confirm(val){
                this.dialog.isShowDialog = false
            },
            // 弹窗关闭取消按钮
            cancel(val){
                this.dialog.isShowDialog = false
            },
            // 点击卡片查看模板详情
            gotoModuleDetail(){
                this.dialog.isShowDialog = true;
            }
            
        }
    }

</script>
<style lang="less" scoped>
    .m-m-home-page-push-main {
        position: relative;
        background-color: #F6FBFF;
        overflow: hidden;
        .decoration {
            position: absolute;
            top: 30px;
            left: 48px;
            font-size: 12px;
            line-height: 25px;
            color: #333;
            font-weight: bold;
            padding-left: 8px;
            &:before {
                content: "";
                display: inline-block;
                width: 3px;
                height: 16px;
                background: #2993f8;
                position: absolute;
                top: 3px;
                border-radius: 3px;
                left: 0;
            }
        }
        .center-num-list {
            font-size: 0;
            margin: 90px 0 0 110px;
            vertical-align: top;
            li {
                vertical-align: center;
                display: inline-block; 
                width: 206px;
                font-size: 22px;
                p {
                    text-align: center;
                }
                p:nth-child(1) {
                    color: #333;
                    font-size: 30px;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                p:nth-child(2) {
                    color: #666;
                    font-size: 14px;
                }
            }
            li:nth-child(1) {
                p:nth-child(1) {
                    color: #2993f8;
                }
            }
        }
        .detailsCard {
            width: 100%;
            padding: 0 60px;
            margin-top: 40px;
            .item {
                width: 193px;
                height: 180px;
                border-radius: 9px;
                border: 1px #D6D6D6 solid;
                padding: 18px 20px;
                margin-right: 20px;
                cursor: pointer;
                &:hover{
                    border: 1px #2993f8 solid;
                }
                >div{
                    &:first-of-type{
                        font-size: 15px;
                        font-weight: bold;
                        margin-top: 0;
                    }
                    &:nth-of-type(1){
                    }
                    &:nth-of-type(2){
                        margin-top: 25px;
                        margin-left: 12px;    
                    }
                    &:nth-of-type(3){
                        margin-top: 18px;
                        margin-left: 12px; 
                    }
                    &:nth-of-type(4){
                        margin-top: 18px;
                        margin-left: 36px; 
                    }
                    >span{
                        &:first-of-type{
                            font-size: 12px;
                            color: #737373;
                            margin-right: 10px;
                        }
                        &:last-of-type{
                            font-size: 17px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .top-btn {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

</style>

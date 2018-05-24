<template>
    <el-dialog
        :visible.sync="memberFlag"
        :title="titleMessage"
        top="10%"
        customClass="member-info-dialog"
        :close-on-click-modal="false"
        @close="close"
        >
        <!-- 主页面 -->
        <member-info-home v-show="homePage" :memberInfo="memberInfo" @infomationShow="infomationShow" @tradingShow="tradingShow" @visitingShow="visitingShow" @integralShow="integralShow" @followShow="followShow"></member-info-home>

        <!-- 信息编辑页面 -->
        <information-edit v-show="informationPage" :oldMemberInfo="oldMemberInfo" :shopId="shopId" :memberId="memberId" @goBack="goBack"></information-edit>

        <!-- 交易记录页面 -->
        <trading v-show="tradingPage" :memberInfo="memberInfo" @goBack="goBack"></trading>

        <!-- 来访记录页面 -->
        <visiting v-show="visitingPage" :memberInfo="memberInfo" @goBack="goBack"></visiting>

        <!-- 跟进页面 -->
        <follow v-show="followPage" @goBack="goBack"></follow>

        <!-- 积分记录页面 -->
        <integral v-show="integralPage" :memberInfo="memberInfo" @goBack="goBack"></integral>

    </el-dialog>
</template>

<style lang="scss">
.member-info-dialog{
    width: 700px;
    height: 730px;
    background: #fff;
    padding: 20px 30px;
    border-radius: 10px;
    .el-dialog__header {
        padding: 0;
        margin-bottom: 30px;
    }
    .el-dialog__body{
        padding: 0;
    }
    .memberinfo-content{
        .memberinfo-top{
            width: 100%;
            height: 170px;
            background: #eef7fe;
            border-radius: 10px;
            padding: 40px;
            margin-bottom: 28px;
            display:flex;
            .member-log{
                padding-top: 9px;
                margin-right: 30px;
            }
            .member-message{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                width: 100%;
                .item {
                    width: 48%;
                    height: 30px;
                    line-height: 30px;
                    color:#333;
                    position: relative;
                    .item-label {
                        display: inline-block;
                        width: 62px;
                        text-align: right;
                        margin-right: 30px;
                        color: #999;
                    }
                    .item-star{
                        &::before{
                            content: '*';
                            display: inline-block;
                            color: red;
                        }
                    }
                    .item-level{
                        display: inline-block;
                        width: 34px;
                        height: 18px;
                        line-height: 18px;
                        font-size: 12px;
                        color: #fff;
                        text-align: center;
                        border-radius: 4px;
                        background: #ffc62e;
                        position: absolute;
                        top: 5px;
                    }
                }
            }
        }
        .memberinfo-bottom{
            display:flex;
            flex-wrap: wrap;
            .item-card{
                width: 200px;
                height: 175px;
                padding: 14px;
                margin-bottom: 20px;
                margin-right: 20px;
                border: 1px solid #dcdfe6;
                border-radius: 10px;
                box-shadow: 0 0 8px rgba(0,0,0,.2);
                &:hover{
                    box-shadow: 0 0 8px #2993f8;
                }
                .item-card-message{
                    color: #666;
                    font-weight: bold;
                    margin-bottom: 30px;
                    img{
                        margin-right: 14px;
                    }
                }
                .item-card-info {
                    margin-bottom: 16px;
                    i{
                        margin-right: 8px;
                    }
                    .card-info-label{
                        color: #999;
                    }
                }
                .btn-group-jy{
                    display: flex;
                    justify-content: space-between;
                    opacity: 0;
                    transition: all .5s;
                    .btn-kj{
                        width: 76px;
                        height: 30px;
                        border: 1px solid #2993f8;
                        border-radius: 5px;
                        color: #2993f8;
                        font-size: 12px;
                        text-align: center;
                        line-height: 28px;
                        box-shadow: 0 0 8px #cccccc;
                        cursor: pointer;
                        &:hover {
                            background: #2993f8;
                            color:#fff;
                        }
                    }
                }
                .btn-group-gj{
                    display: flex;
                    justify-content: center;
                    opacity: 0;
                    transition: all .5s;
                    .btn-gj{
                        width: 76px;
                        height: 30px;
                        border: 1px solid #2993f8;
                        border-radius: 5px;
                        color: #2993f8;
                        font-size: 12px;
                        text-align: center;
                        line-height: 28px;
                        box-shadow: 0 0 8px #cccccc;
                        cursor: pointer;
                        &:hover {
                            background: #2993f8;
                            color:#fff;
                        }
                    }
                }
                .btn-group-jf{
                    display: flex;
                    justify-content: center;
                    opacity: 0;
                    transition: all .5s;
                    margin-top: 50px;
                    .btn-jf{
                        width: 76px;
                        height: 30px;
                        border: 1px solid #2993f8;
                        border-radius: 5px;
                        color: #2993f8;
                        font-size: 12px;
                        text-align: center;
                        line-height: 28px;
                        box-shadow: 0 0 8px #cccccc;
                        cursor: pointer;
                        &:hover {
                            background: #2993f8;
                            color:#fff;
                        }
                    }
                }
                .btn-show{
                    opacity: 1;
                }
                &:nth-of-type(3n){
                    margin-right: 0;
                }
                .color1 {
                    color: #2993f8;
                }
                .color2 {
                    color: #ffa200;
                }
                .color3 {
                    color: #a800ff;
                }
                .color4 {
                    color: #f43ec7;
                }
                .color5 {
                    color: #fd3261;
                }
            }
        }
    }
}
</style>

<script>

import { getMemberInfoById } from 'Api/member'
import {seekFollowSignList, seekUserInfo, seekGetMemberInfo, seekGoodsSellOrder} from 'Api/commonality/seek'


import memberInfoHome from './memberPage/home.vue'
import informationEdit from './memberPage/information'
import trading from './memberPage/trading'
import visiting from './memberPage/visiting'
import follow from './memberPage/follow'
import integral from './memberPage/integral'

export default {
    data () {
        return {
            titleMessage:'会员信息',
            memberInfo:{},
            oldMemberInfo:{},

            memberFlag: false,

            homePage:true,
            informationPage:false,
            tradingPage:false,
            visitingPage:false,
            followPage:false,
            integralPage:false,
        }
    },
    components:{
        memberInfoHome,
        informationEdit,
        trading,
        visiting,
        follow,
        integral,
    },
    props:['memberInfoFlag','shopId','memberId'],
    methods:{
        
        // 获取会员信息
        getMemberInfo(){
            let options = {
                shopId: this.shopId,
                memberId: this.memberId
            }
            getMemberInfoById(options).then(res => {
                console.log('会员信息',res.data.data)
                let datas = res.data.data
                this.memberInfo = datas
            })
        },
        // 获取老接口的会员信息
        getOldMemberInfo() {
            let options = {
                shopId: this.shopId,
                memberId: this.memberId
            }
            seekGetMemberInfo(options).then(res => {
                console.log('老接口会员信息',res.data.data)
                let datas = res.data.data
                this.oldMemberInfo = datas
            })
        },
        close () {
            this.$emit("closeReturn", {status: false})
            this.homePage=true
            this.informationPage=false
            this.tradingPage=false
            this.visitingPage=false
            this.followPage=false
            this.integralPage=false
        },
        closeHome(parm) {
            this.memberFlag = parm
            this.$emit("closeReturn", {status: false})            
        },
        // 其他弹窗返回
        goBack(parm) {
            this.homePage = parm
            this.informationPage = false
            this.tradingPage = false
            this.visitingPage = false
            this.followPage = false
            this.integralPage = false
        },
        infomationShow(parm) {
            this.informationPage = parm
            this.homePage = false
        },
        tradingShow(parm) {
            this.tradingPage = parm
            this.homePage = false
        },
        visitingShow(parm) {
            this.visitingPage = parm
            this.homePage = false
        },
        followShow(parm) {
            this.followPage = parm
            this.homePage = false
        },
        integralShow(parm) {
            this.integralPage = parm
            this.homePage = false
        }
    },
    watch:{
        memberInfoFlag(val) {
            this.memberFlag = val
            if(val){
                // 获取会员信息
                this.getMemberInfo()
            }
        },
        homePage(val) {
            if(val) {
                this.titleMessage = '会员信息'
            }
            if(this.informationPage) {
                this.titleMessage = '会员信息'                
            }
            if(this.tradingPage){
                this.titleMessage = '交易记录'                                
            }
            if(this.visitingPage){
                this.titleMessage = '来访记录'                                
            }
            if(this.followPage){
                this.titleMessage = '跟进记录'                                
            }
            if(this.integralPage){
                this.titleMessage = '积分记录'
            }
        },
        // 获取老接口的会员信息
        informationPage(val) {
            if(val){
                this.getOldMemberInfo()
            }
        }
    },
    created() {
        this.memberFlag = this.memberInfoFlag
       
    },
    mounted() {
        // 控制按钮的显示
    }
}
</script>


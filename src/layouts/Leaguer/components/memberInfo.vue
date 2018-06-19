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
        <member-info-home v-show="homePage" :oldMemberInfo="oldMemberInfo" :memberInfo="memberInfo" :shopId="shopId" :memberId="memberId" @infomationShow="infomationShow" @tradingShow="tradingShow" @visitingShow="visitingShow" @integralShow="integralShow" @followShow="followShow" @goBack="goBack"></member-info-home>

        <!-- 信息编辑页面 -->
        <information-edit v-show="informationPage" :oldMemberInfo="oldMemberInfo" :shopId="shopId" :memberInfo="memberInfo" :memberId="memberId" @goBack="goBack" @getData="getData"></information-edit>

        <!-- 交易记录页面 -->
        <trading v-show="tradingPage" :buyRecordInfo="buyRecordInfo" :oldMemberInfo="oldMemberInfo" :memberInfo="memberInfo" :shopId="shopId" :memberId="memberId"  @goBack="goBack" @getData="getData"></trading>

        <!-- 来访记录页面 -->
        <visiting v-show="visitingPage" :visitData="visitData" @goBack="goBack" @getData="getData"></visiting>

        <!-- 跟进页面 -->
        <follow v-show="followPage" :followData="followData" :memberInfo="memberInfo" :oldMemberInfo="oldMemberInfo" :shopId="shopId" :memberId="memberId" @goBack="goBack" @getData="getData"></follow>

        <!-- 积分记录页面 -->
        <integral v-show="integralPage" :integralData="integralData" :oldMemberInfo="oldMemberInfo" :memberInfo="memberInfo" :shopId="shopId" :memberId="memberId" @goBack="goBack" @getData="getData"></integral>

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
                    input{
                        width: 50%;
                        height: 28px;
                        background-color:transparent;
                        font-size: 14px;
                        border-radius: 3px;
                        &:active,
                        &:hover,
                        &:focus{
                            border: 1px solid #2993f8;
                            background-color: #f4f9ff;
                        }
                    }
                    .item-label {
                        display: inline-block;
                        width: 62px;
                        text-align: right;
                        margin-right: 28px;
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
                // box-shadow: 0 0 8px rgba(0,0,0,.2);
                
                &:hover{
                    border: 1px solid #2993f8;
                    box-shadow: 0 0 8px rgba(0,0,0,.2);
                }
                .item-card-message{
                    font-size: 16px;
                    color: #666;
                    font-weight: bold;
                    margin-bottom: 25px;
                    line-height: 26px;
                    img{
                        margin-right: 14px;
                    }
                }
                .item-card-info {
                    margin-bottom: 15px;
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
                    margin-top: 48px;
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

import { getMemberInfoById, getFollowRecord, memberIntegralLog } from 'Api/member'
import {seekFollowSignList, seekUserInfo, seekGetMemberInfo, seekGoodsSellOrder, seekLatelyBuyRecord, seekGetMemberFollowList } from 'Api/commonality/seek'
import {seekListVisitor} from 'Api/commonality/seek'

var moment = require('moment');


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
            buyRecordInfo:{},
            integralData:{
                dataList:[]
            },            
            beginTime: new Date(),

            startTime:'',
            endTime:'',

            visitData:{},
            followData:{},
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
        // 获取交易信息内容
        getBuyRecord(){
            let options = {
                shopId: this.shopId,
                memberId: this.memberId,
                page:'1',
                pageSize:'2000',
            }
            seekLatelyBuyRecord(options).then(res => {
                console.log('老接口购买记录',res.data.data)
                let datas = res.data.data
                this.buyRecordInfo = datas
            })  
        },
        // 获取来访记录
        timeFormat (parm, timeType = '000000') {
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + timeType
        },
        newClient () {
            let options = {
                beginTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD')),
                endTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD'), '235959'),
                shopId: this.shopId,
                page: 1,
                pageSize: 9999,
                memberId:this.memberId
            }
            seekListVisitor(options)
                .then(res => {
                if (res.data.state == 200) {
                    this.visitData = res.data.data
                    console.log('用户来访列表',this.visitData)
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 获取跟进记录
        getFlowData(){
            this.getDate(0)
            let options = {
                memberId: this.memberId,
                shopId: this.shopId,
                startTime: this.startTime,
                endTime: this.endTime
            }
            seekGetMemberFollowList(options).then(res => {
                this.followData = res.data.data
                console.log('跟进记录',this.followData)
            })
        },
        getDate( day, type  ){
            let _date = new Date()

            _date.setDate( _date.getDate() + day )
            //年
            let Year = _date.getFullYear()
            //月
            let month = this.formatDate(_date.getMonth()+1)

            let month1 = this.formatDate(_date.getMonth())
            //天
            let Day = this.formatDate(_date.getDate())
            //天
            let Day1 = this.formatDate(_date.getDate()-1)
            //时
            let hours = this.formatDate(_date.getHours())
            //分
            let mins = this.formatDate(_date.getMinutes())
            //秒
            let seconds = this.formatDate(_date.getSeconds())

            let timestamp = Year + month +  Day
            let currentData = new Date()

            if (month1 == '01' || month1 == '03' ||month1 == '05' || month1 == '07' || month1 == '08' || month1 ==  '10' || month1 == '12') {
                if (Day1 == '00') {
                    Day1 = '31'
                }
            } else if (month1 == '02') {
                if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
                    if (Day1 == '00') {
                        Day1 = '29'
                    }
                } else {
                    if (Day1 == '00') {
                        Day1 = '28'
                    }
                }
            } else {
                if (Day1 == '00') {
                    Day1 = '30'
                }
            }
            if( type == 'end' ){
                if( Year < currentData.getFullYear() ||
                  month < currentData.getMonth()+1 ||
                  Day < currentData.getDate()
                ){
                  hours = '23'
                  mins = seconds = '59'
                }
            }else if( type == 'start'){
              hours = mins = seconds = '00'
            }

            this.endTime = Year + '-' + month + '-' + Day
            this.startTime = Year + '-' + month + '-' + (Day- (Day-1))

        },
        formatDate( d ){
           return d < 10 ? ('0' + d ) : d + ''
        },
        // 获取会员积分记录
        getIntegralLog(){
            let options = {
                memberId: this.memberId,
                shopId: this.shopId,
                page:'1',
                pageSize:'100'
            }
            memberIntegralLog(options).then(res => {
                this.integralData = res.data.data
                console.log('积分日志',this.integralData)
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

            this.getMemberInfo()
            this.getOldMemberInfo()
        },
        getData(){
            this.getMemberInfo()
            this.getOldMemberInfo()
            this.getIntegralLog()     
            this.getBuyRecord()   
            this.newClient()  
            this.getFlowData()                                      

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
                this.getOldMemberInfo()
                
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
        },
        tradingPage(val){
            if(val){
                this.getBuyRecord()
            }
        },
        visitingPage(val){
            if(val) {
                this.newClient()
            }
        },
        followPage(val) {
            if(val) {
                this.getFlowData()
            }
        },
        integralPage(val) {
            if(val) {
                this.getIntegralLog()
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


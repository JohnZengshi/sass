<template>
    <div class="leaguer-wrap">
        <div class="leaguer-title">
            <h2><i class="iconfont icon-huiyuan"></i>会员</h2>
            <ul class="title-right">
                <li>
                    <span style="font-size: 14px; color:#666; font-weight: bold;" v-if="shopListByCo.length == 1">{{shopListByCo[0].shopName}}</span>
                    <DropDownMenu
                        v-else
                        :titleName="shopName == '' ? (shopListByCo? shopListByCo[0].shopName : ''): '店铺列表'"
                        dataType="店铺"
                        :propList="shopListByCo"
                        :isClear="false"
                        @dropReturn="dropReturn"
                    >
                    </DropDownMenu>
                </li>
                <li>
                    <DropDownMenu
                        titleName="会员类型"
                        dataType="会员类型"
                        :propList="memberTypeList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li>
                    <DropDownMenu
                        titleName="会员级别"
                        dataType="会员级别"
                        :propList="memberGradeList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                
                <li>
                    <DropDownMenu
                        titleName="跟进状态"
                        dataType="跟进状态"
                        :propList="followStatusList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                
                <li>
                    <DropDownMenu
                        titleName="购买时间"
                        dataType="购买时间"
                        :propList="buyTimeList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
<!--                 <li>
                    <div class="batch-time-wrap">
                        <div class="date-w81">
                            <el-date-picker
                                format
                                v-model="startTime"
                                type="date"
                                placeholder="选择日期"
                                @change="dateChange"
                            >
                            </el-date-picker>
                        </div>
                        <span>至</span>
                        <div class="date-w81">
                            <el-date-picker
                                v-model="endTime"
                                type="date"
                                placeholder="选择日期"
                                @change="dateChange1"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </li> -->
                <!-- <div class="goBack" @click="goBackAct()">返回上一级</div> -->
            </ul>
        </div>
        <div class="leaguer-main">
            <div class="main-title">
                <h3><i class="iconfont icon-liebiao"></i>会员列表</h3>
                <span>(总数：<em class="style1">{{memberNum.totalNum}}</em>私有：<em class="style2">{{memberNum.privateNum}}</em>共有：<em class="style2">{{memberNum.shareNum}}</em>公共：<em class="style2">{{memberNum.publicNum}}</em>)</span>
                <div class="main-title-right">
                    <input v-model="keyWord" @keyup.enter="memberAllList" type="text" placeholder="输入会员名/手机号/编号...">
                </div>
            </div>
            <div class="main-content">
                <div>
                    <div @click="openEdit(item)" :key="index" class="main-item" v-for="(item, index) in dataList" v-if="item.operateType != 2">
                        <div class="item-left">
                            <div class="logo">
                                <!-- <img :src="item.logo"> -->
                                <FormatImg :logo="item.logo" class="img" :userName="item.memberName" :size="60"></FormatImg>
                                <span :class="{color1: item.grade == 1, color2: item.grade == 2, color3: item.grade == 3}">{{item.grade == 1 ? '普通' : item.grade == 2 ? '中级' : '重要'}}</span>
                            </div>
                            <div class="name">
                                {{reArr(item)}}
                                <span v-if="item.principalList>=3">等<em>{{item.principalList.length}}</em>人</span>
                            </div>
                        </div>
                        <div class="item-right">
                            <div class="name">
                                {{item.memberName}}
                            </div>
                            <div class="info">
                                <div class="phone"><img src="./../../../static/img/member/new/phone.png">{{item.phone}}</div>
                                <div class="date">{{item.memberNO}}</div>
                            </div>
                            <div class="btn">
                                <div class="wrap">
                                    <div @click.stop="openFollow(item)" class="follow-btn">
                                        跟进记录 <i>{{item.followNum}}</i><span></span>
                                    </div>
                                    <div @click.stop="openBuy(item)" class="buy-btn">
                                        购买记录 <span><i>{{item.buyNum}}</i></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ul class="btn-list">
                <li @click="isChoseMember = true" title="指派负责人" v-if="shopManageRole"><span>指派负责</span><i class="iconfont icon-piliangzhipai"></i></li>
                <li v-if="shopRole" @click="addLeaguer = true"><span>添加会员</span><i class="iconfont icon-tianjiahuiyuan"></i></li>
            </ul>
        </div>
        <div>
            <!-- 新增会员 -->
            <addLeaguerDia
                :addLeaguer="addLeaguer"
                :shopId="shopId"
                :shopManageRole="shopManageRole"
                :shopRole="shopRole"
                :shopManRole="shopManRole"
                @closeReturn="closeReturn"
            >
            <!-- v-on:memberAllList="memberAllList" -->
            </addLeaguerDia>
            <!-- 编辑弹窗 -->
            <!-- <editLeaguerDia
                v-if="editLeaguer"
                :editLeaguer="editLeaguer"
                :shopId="shopId"
                :shopManageRole="shopManageRole"
                :memberId="memberId"
                @closeReturn="closeEditReturn"
                @seekHistoryList="seekHistoryList"
            ></editLeaguerDia> -->

            <!-- 会员信息 begin -->
            <member-info
                @closeReturn="closeEditReturn"
                :memberId="memberId"
                :shopId="shopId"
                :memberInfoFlag="editLeaguer">
            </member-info>
            <!-- 会员信息 end -->

            <!-- 跟进记录 -->
            <el-dialog :visible.sync="isShowFllow" top="7%" customClass="followReDig">
                <followRecord
                    :isShowFllow="isShowFllow"
                    :shopId="shopId"
                    :shopManageRole="shopManageRole"
                    :memberId="memberId"
                ></followRecord>
            </el-dialog>
            <!-- 购买记录 -->
            <el-dialog :visible.sync="isShowBuy" top="7%" customClass="buyReDig">
                <buyRecord
                    :isShowBuy="isShowBuy"
                    :shopId="shopId"
                    :shopManageRole="shopManageRole"
                    :memberId="memberId"
                ></buyRecord>
            </el-dialog>
            <!-- 选择负责人 -->
            <el-dialog :visible.sync="isChoseLeader" top="12%" customClass="choseLeaderDig" :close-on-click-modal="false">
                <ChoseLeader
                    :shopId="shopId"
                    :isChoseLeader="isChoseLeader"
                    @closeChoMember="closeChoLeader"
                ></ChoseLeader>
            </el-dialog>
            <!-- 选择会员 -->
            <el-dialog :visible.sync="isChoseMember" top="12%" customClass="choseMemberDig addmember" :close-on-click-modal="false">
                <ChoseMember
                    :shopId="shopId"
                    :isChoseMember="isChoseMember"
                    @closeChoMember="closeChoMember"
                ></ChoseMember>
            </el-dialog>

        </div>

        <!-- 外链 -->
        <!-- 外链顾客详情 -->
        <ClientDetail
            @relevanceMember="relevanceMember"
            @openEditReturn="openEditReturn"
            @openMemberDetail="openMemberDetail"
            ref="clientDetailWrap"
            :isMember="true"
            :currentSeekData="{id: memberId}"
            :shopId="shopId"
        ></ClientDetail>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DropDownMenu from '../../components/template/DropDownMenu'
import {seekMemberAllList, seekGetMemberInfo, seekMemberTotalNum, seekGetShopListByCo, seekGetUserInfo} from '../../Api/commonality/seek'
import {operateMemberOperation} from '../../Api/commonality/operate'
import addLeaguerDia from './components/addLeaguerDig'
import editLeaguerDia from './components/editLeaguerDig'
import followRecord from './components/followRecord'
import buyRecord from './components/buyRecord'
import ChoseMember from './components/choseMember'
import ChoseLeader from './components/choseLeader'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
/* --外链-- */
import ClientDetail from './ClientTemplate/ClientDetail.vue'
// 会员信息
import memberInfo from  './components/memberInfo'

// 获取会员信息
import { getMemberInfoById } from '../../Api/member'

export default {
    components: {
        DropDownMenu,
        addLeaguerDia,
        editLeaguerDia,
        followRecord,
        buyRecord,
        ChoseMember,
        ChoseLeader,
        FormatImg,
        ClientDetail,
        memberInfo
    },
    data () {
        return {
            page: '1',
            show: true,
            shopId: '', // 店铺id
            memberId: '',
            shopName: '', // 店铺名称
            dataList: [], // 会员列表
            addLeaguer: false,
            editLeaguer: false,
            isShowFllow: false,
            isShowBuy: false,
            isChoseMember: false, // 选择会员
            isChoseLeader: false, // 选择负责人
            memberNum: {}, // 会员数量
            startTime: '',
            endTime: '',
            memberType: '',
            memberGrade: '',
            followStatus: '',
            buyTime: '',
            keyWord: '',
            memberIdList: [],  // 会员id列表
            leaderIdList: [],  // 负责人id列表
            memberTypeList: [
                {
                    name: '私有',
                    type: 1
                },
                {
                    name: '共有',
                    type: 2
                },
                {
                    name: '公共',
                    type: 3
                },
            ],

            memberGradeList: [
                {
                    name: '普通',
                    type: 1
                },
                {
                    name: '中级',
                    type: 2
                },
                {
                    name: '重要',
                    type: 3
                },
            ],

            followStatusList: [
                {
                    name: '全部',
                    type: 1
                },
                {
                    name: '已暂停',
                    type: 2
                },
                {
                    name: '已超时',
                    type: 3
                },
                {
                    name: '已完成',
                    type: 4
                },
                {
                    name: '未完成',
                    type: 5
                },
            ],
            
            buyTimeList: [
                {
                    name: '今天',
                    type: 1
                },
                {
                    name: '三天以内',
                    type: 2
                },
                {
                    name: '一周以内',
                    type: 3
                },
                {
                    name: '一个月以内',
                    type: 4
                },
                {
                    name: '三个月以内',
                    type: 5
                },
            ],
            shopListByCo: '',
            adminStartTime: '',
            adminEndTime: '',
            userPositionInfo: ''
        }
    },
    created () {
        // this.memberAllList ()
        // this.getShopListByCo().then(()=> {
        // this.shopId = this.shopListByCo[0].shopId
        // this.startTime = this.getDate(-((new Date()).getDate()-1),'start').format
        // this.endTime = this.getDate(0,'end').format
        // console.log(this.startTime)
        // console.log(this.endTime)
        // this.memberAllList ()
        // this.memberTotalNum()
        // })

    },
    mounted () {
        let _self = this
        $(".main-content").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y",
            callbacks:{
               onTotalScroll: function(){
                    _self.lazyloadSend()
               }
            }
        })

        eventBus.$on('oprationmemberAllList', (parm) => {
          //console.log(parm)
          _self.memberAllList()
          _self.memberTotalNum()
        })
        this.getUserInfo()
        // if (this.computedRole == true) {
        //   this.show = false
        // }
    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
            "productClass", // 产品类别
            "supplierListData", // 供应商
            // "userPositionInfo" // 职位信息
        ]),
        shopRole: function () { // 店员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        computedRole: function () { // 公司
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
            }
        },
        shopManRole: function () { // 店员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopManRole(this.userPositionInfo.roleList)
            }
        },
        shopManageRole: function () { // 店长
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
            }
        }
    },
    methods: {
        // ...mapActions([
        //     "getShopListByCo", // 店铺列表
        //     // "workSupplierList" // 供应商
        // ]),
        /* --外链start-- */
        relevanceMember (parm) {
            this.isRadio = true
            this.isChoseMember = true
            this.relevanceId = parm
        },
        openEditReturn () {
            this.editLeaguer = true
        },
        /* --外链end-- */
        timeFormat (parm) {
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + '000000'
        },
        getUserInfo () {
            seekGetUserInfo({userId: sessionStorage.getItem('id')}).then((res) => {
                this.userPositionInfo = res.data.data
                this.gtShopListByCo()
            })
        },
        gtShopListByCo () { // 获取店铺列表
            let options = {
                page: 1,
                pageSize: 999
            }
            seekGetShopListByCo(options).then((res) => {
                console.log(res)
                this.shopListByCo = res.data.data.shopList
                if (this.shopListByCo[0].shopId) {
                    this.shopId = this.shopListByCo[0].shopId
                }
                this.startTime = this.getDate(-((new Date()).getDate()-1),'start').format
                this.endTime = this.getDate(0,'end').format
                this.adminStartTime = this.timeFormat(this.startTime)
                this.adminEndTime = this.timeFormat(this.endTime)
                this.memberAllList()
                this.memberTotalNum()
            }, (res) => {

            })
        },
        memberTotalNum () { // 会员总数
            let options = {
                shopId: this.shopId
            }
            seekMemberTotalNum(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.memberNum = res.data.data
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        memberOperation () {
            let mbList = []
            let leList = []
            this.memberIdList.forEach((item, index) => {
                mbList.push({memberId: item})
            })
            this.leaderIdList.forEach((item, index) => {
                leList.push({updateData: item})
            })
            let options = {
                shopId: this.shopId,
                memberList: mbList,
                operateType: 2,
                updateDataList: leList
            }
            operateMemberOperation(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.memberAllList()
                    this.memberTotalNum()
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                console.log(res)
            })
        },
        closeChoLeader (val) {
            //console.log(val);
            this.leaderIdList = val.list
            this.isChoseLeader = false
            this.memberOperation()
        },
        closeChoMember (val) { // 选择会员弹窗的回调
            //console.log(val);
            this.isChoseMember = false
            this.memberIdList = val.list
            this.isChoseLeader = true
        },
        openBuy (item) {
            this.memberId = item.memberId
            //console.log(this.memberId)
            this.isShowBuy = true
        },
        openFollow (item) {
            this.memberId = item.memberId
            //console.log(this.memberId)
            this.isShowFllow = true
        },
        openEdit (item) { // 打开会员详情
            //console.log(item)
            this.memberId = item.memberId
            //console.log(this.memberId)
            this.editLeaguer = true
        },
        openMemberDetail () {
            this.editLeaguer = true
        },
        seekHistoryList (parm) { // 查看历史到店记录
            this.editLeaguer = false
            setTimeout(() => {
                this.$refs.clientDetailWrap.open()
                setTimeout(() => {
                    this.$refs.clientDetailWrap.openHistory(parm)
                }, 200)
            }, 200)
            console.log('查看历史到店记录', parm)
        },
        closeEditReturn (val) {
            this.editLeaguer = val.status
            this.memberAllList()
            this.memberTotalNum()
        },
        closeReturn (val) { // 关闭弹窗的返回
            this.addLeaguer = val.status
            this.memberAllList ()
            this.memberTotalNum()
        },
        isShopManSee (item) {  // 可查看会员的店铺人员
            if (this.shopManRole) {
                if (item.principalFlag == 'Y' || item.type == 1 || item.type == 2 || item.type == 3) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        goBackAct () {
            window.history.go(-1)
        },
        getMemberInfo (id) { // 会员信息
            let options = {
                shopId: this.shopId,
                memberId: id
            }
            seekGetMemberInfo(options).then((res) => {
                //console.log(res)
                if (res.data.state == 200) {
                    let arr = []
                    res.data.data.principalList.forEach((item, index) => {
                        arr.push(item.username)
                    })
                    //console.log(arr)
                    //console.log(arr.join(','))
                    return arr.join(',')
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                console.log(res)
            })
        },
        lazyloadSend () {
            let options = {
                page: this.page,
                pageSize: 30,
                shopId: this.shopId,
                keyWord: this.keyWord,
                // startTime: this.adminStartTime,
                // endTime: this.adminEndTime,
                memberType: this.memberType,
                memberGrade: this.memberGrade,
                followStatus: this.followStatus,
                buyTime: this.buyTime
            }
            seekMemberAllList(options).then((res) => {
                if (res.data.state == 200) {
                    this.page += 1
                    this.dataList.push(...res.data.data.dataList)
                    //this.reArr(this.dataList)
                }
            }, (res) => {
                console.log(res)
            })
        },
        memberAllList () { // 会员列表
            this.page = 1
            this.dataList = []
            let options = {
                page: this.page,
                pageSize: 30,
                shopId: this.shopId,
                keyWord: this.keyWord,
                // startTime: this.adminStartTime,
                // endTime: this.adminEndTime,
                memberType: this.memberType,
                memberGrade: this.memberGrade,
                followStatus: this.followStatus,
                buyTime: this.buyTime
            }
            seekMemberAllList(options).then((res) => {
                console.log('会员跟进状态跟踪:',res)
                if (res.data.state == 200) {
                    this.page += 1
                    this.dataList = res.data.data.dataList
                    //this.reArr(this.dataList)
                }
            }, (res) => {
                console.log(res)
            })
        },
        reArr (item) { // 负责人数组重组
            //console.log(item.principalList)
            let arr = []
            item.principalList.forEach((f, index) => {
              arr.push(f.username)
            })
            return arr.join(',')
        },
        dropReturn (val) {
            console.log(val)
            if (val.type == '店铺') {
                this.shopId = val.item.operateId
                this.shopName = val.item.operateName
            } else if (val.type == '会员类型') {
                this.memberType = val.item.operateId
            } else if (val.type == '会员级别') {
                this.memberGrade = val.item.operateId
            } else if (val.type == '跟进状态') {
                this.followStatus = val.item.operateId
            } else if (val.type == '购买时间') {
                this.buyTime = val.item.operateId
            }
            this.memberAllList()
            this.memberTotalNum()
        },
        clearInfo (val) {
            console.log(val)
            if (val.type == '店铺') {
                this.shopId = ''
                this.shopName = ''
            } else if (val.type == '会员类型') {
                this.memberType = ''
            } else if (val.type == '会员级别') {
                this.memberGrade = ''
            } else if (val.type == '跟进状态') {
                this.followStatus = ''
            } else if (val.type == '购买时间') {
                this.buyTime = ''
            }
            this.memberAllList()
            this.memberTotalNum()
        },
        dateChange (val) {
            //console.log(this.startTime)
            //console.log(this.endTime)
            this.adminStartTime = this.timeFormat(val)
            this.memberAllList()
            this.memberTotalNum()
        },
        dateChange1 (val) {
            //console.log(this.startTime)
            //console.log(this.endTime)
            this.adminEndTime = this.timeFormat(val)
            this.memberAllList()
            this.memberTotalNum()
        },
        getDate( day, type  ){
            let _date = new Date()
            _date.setDate( _date.getDate() + day )
            //年
            let Year = _date.getFullYear()
            //月
            let month = this.formatDate(_date.getMonth()+1)
            //天
            let Day = this.formatDate(_date.getDate())
            //时
            let hours = this.formatDate(_date.getHours())
            //分
            let mins = this.formatDate(_date.getMinutes())
            //秒
            let seconds = this.formatDate(_date.getSeconds())

            let timestamp = Year + month +  Day

            let currentData = new Date()

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

            return {
                format : Year + '-' + month + '-' + Day ,
                timestamp : timestamp,
                fullData : timestamp + hours + mins + seconds
            }
        },
        formatDate( d ){
           return d < 10 ? ('0' + d ) : d + ''
        }
    }

}
</script>

<style lang="scss">
.choseMemberDig.addmember {
    width: 720px;
    height: 730px;
    background: #fff;
    border-radius: 10px;
}
</style>

<style scoped lang="scss">
.leaguer-wrap {
    width: 1270px;
    margin: 0 auto;
    .leaguer-title {
        height: 40px;
        width: 1250px;
        margin: 0 auto;
        line-height: 40px;
        margin-top: 30px;
        margin-bottom: 15px;
        h2 {
            height: 40px;
            font-size: 16px;
            color:#333;
            float: left;
            i {
                font-size: 25px;
                margin-right: 16px;
                color:#2993f8;
            }
        }
        .title-right {
            float: right;
            // width: 1170px;
            li {
                float: left;
                margin-right: 16px;
                min-width: 90px;
                >.dropDown-wrap {
                    //margin: 0 auto;
                }
            }
            .batch-time-wrap{
                float: left;
                height: 28px;
                width: 188px;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                margin-right: 16px;
                background:#fff;
                margin-top:5px;
                .date-w81 {
                    line-height: 26px;
                    float: left;
                }
                &>span {
                    line-height: 28px;
                    font-size: 14px;
                    float: left;
                }
            }
            .goBack {
                width: 90px;
                height: 28px;
                border-radius: 4px;
                background:#2993f8;
                color:#fff;
                font-weight: bold;
                text-align: center;
                line-height: 28px;
                font-size: 12px;
                float: right;
                margin: 6px 0;
                cursor: pointer;
            }
        }
    }
    .leaguer-main {
        width: 1250px;
        margin: 0 auto;
        height: 740px;
        box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
        background:#fff;
        border-radius: 10px;
        position: relative;
        .main-title {
            height: 50px;
            width: 100%;
            padding: 0 20px;
            line-height: 50px;
            margin-bottom: 10px;
            h3 {
                float:left;
                color:#333;
                font-weight: normal;
                font-size: 16px;
                margin-right: 10px;
                i {
                    color:#2993f8;
                    margin-right: 14px;
                }
            }
            &>span {
                float: left;
                color:#999999;
                font-size: 14px;
                em {
                    font-weight: bold;
                    font-style: normal;
                    margin-right: 5px;
                }
                .style1 {
                    color:#ff5a51;
                }
                .style2 {
                    color:#2993f8;
                }
            }
            .main-title-right {
                float: right;
                input {
                    width: 200px;
                    height: 28px;
                    border: 1px solid #eeeeee;
                    border-radius: 4px;
                    padding-left: 13px;
                }
                input:hover{
                    border: 1px solid #2993f8;
                }
            }
        }
        .main-content {
            padding: 0 20px;
            height: 660px;
            //overflow-y: auto;
            .main-item {
                width: 370px;
                height: 140px;
                background:#f4f4f4;
                border-radius: 10px;
                float: left;
                margin-right: 50px;
                margin-bottom: 20px;
                .item-left {
                    height: 100%;
                    width: 94px;
                    float: left;
                    .logo {
                        width: 60px;
                        margin-left: 20px;
                        position: relative;
                        padding-top: 20px;
                        margin-bottom: 15px;
                        img {
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                        }
                        .img {
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                        }
                        &>span {
                            display: block;
                            width: 34px;
                            height: 18px;
                            line-height: 18px;
                            font-size: 12px;
                            color:#fff;
                            text-align: center;
                            border-radius: 4px;
                            position: absolute;
                            top: 76px;
                            left: 13px;
                        }
                        .color1 {
                            background:#ffc62e;
                        }
                        .color2 {
                            background:#ffa200;
                        }
                        .color3 {
                            background:#f27200;
                        }
                    }
                    .name {
                        text-align: center;
                        font-size: 14px;
                        color:#333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .item-right {
                    padding-top: 30px;
                    float: left;
                    width: 276px;
                    height: 100%;
                    box-sizing: border-box;
                    padding-right: 20px;
                    .name {
                        font-size: 16px;
                        color:#2993f8;
                        height: 27px;
                    }
                    .info {
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color:#666666;
                        margin-bottom: 25px;
                        &>div {
                            float: left;
                        }
                        .phone {
                            margin-right: 18px;
                            position: relative;
                            &>img {
                                // margin-top: 1px;
                                float: left;
                                margin-right: 3px;
                            }
                            &:after {
                                content: '';
                                width: 1px;
                                height: 10px;
                                background:#d6d6d6;
                                position: absolute;
                                top: 2px;
                                right: -18px;
                            }
                        }
                        .date {
                            margin-left: 17px;
                        }
                    }
                    .btn {
                        height: 24px;
                        .wrap {
                            width: 158px;
                            height: 24px;
                            float: right;
                            &>div {
                                float: left;
                                width: 72px;
                                height: 24px;
                                border-radius: 4px;
                                text-align: center;
                                line-height: 24px;
                                background:#fff;
                                font-size: 12px;
                                color:#999999;
                                cursor: pointer;
                            }
                            &>div:hover {
                                background:#2993f8;
                                color:#fff;
                            }
                            .follow-btn {
                                margin-right: 14px;
                                >i{
                                  font-style: normal;
                                  color: #ffa200;
                                }
                            }
                            .buy-btn{
                              i{
                                font-style: normal;
                                color: #ffa200;
                              }
                            }
                        }
                    }
                }
            }
            .main-item:nth-child(3n+0) {
                margin-right: 0px;
            }
        }
        .btn-list {
            width: 50px;
            position: absolute;
            right: -68px;
            bottom: 0;
            background:#fff;
            border-radius: 4px;
            border: 1px solid #ededed;
            overflow: hidden;
            li {
                width: 50px;
                height: 50px;
                position: relative;
                &>span {
                    font-size: 14px;
                    padding: 6px 11px;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    transition: all .3s ease;
                    opacity: 0;
                    background:#2993f8;
                    color:#fff;
                    font-weight: bold;
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;
                }
                &>i {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-size: 24px;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 50px;
                    color:#999;
                }
            }
            li:hover {
                &>span {
                    opacity: 1;
                }
            }
        }
    }
}
</style>


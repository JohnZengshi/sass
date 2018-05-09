<template>
    <div class="leaguer-wrap">
        <div class="leaguer-title">
            <h2><i class="iconfont icon-genjin"></i>跟进</h2>
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
                        :isClear="true"
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
                        :isClear="true"
                    >
                    </DropDownMenu>
                </li>
                <li>
                    <DropDownMenu
                        titleName="负责人"
                        dataType="发送人"
                        :propList="shopUserList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                        :isClear="true"
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
                        :isClear="true"
                    >
                    </DropDownMenu>
                </li>
                <li>
                    <DropDownMenu
                        titleName="跟进目的"
                        dataType="跟进目的"
                        :propList="followAimList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                        :isClear="true"
                    >
                    </DropDownMenu>
                </li>
                <li>
                    <div class="batch-time-wrap">
                        <div class="date-w81">
                            <el-date-picker
                                format
                                v-model="beginTime"
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
                </li>
                <!-- <div class="goBack" @click="goBackAct()">返回上一级</div> -->
            </ul>
        </div>
        <div class="leaguer-main">
            <div class="main-title">
                <h3><i class="iconfont icon-liebiao"></i>跟进列表</h3>
                <span>(总数：<em class="style1">{{total}}</em>)</span>
                <div class="main-title-right">
                    <span @click="isHistory = true">历史未完成(<em>{{unfinishedNum}}</em>)</span>
                </div>
            </div>
            <div class="main-content">
                <div>
                    <div @click="openEdit(item)" :key="index" class="main-item" v-for="(item, index) in dataList">
                        <div class="item-left">
                            <div class="logo">
                                <!-- <img :src="item.memberLogo"> -->
                                <FormatImg :logo="item.memberLogo" class="img" :userName="item.memberName" :size="60"></FormatImg>
                                <span :class="{color1: item.grade == 1, color2: item.grade == 2, color3: item.grade == 3}">{{item.grade == 1 ? '普通' : item.grade == 2 ? '中级' : '重要'}}</span>
                            </div>
                            <div class="name">
                                <span v-show="false">{{reArr(item)}}</span>
                                <span>{{item.prinList}}</span>
                            </div>
                        </div>
                        <div class="item-right">
                            <div class="name">
                                {{item.memberName}}
                            </div>
                            <div class="info">
                                <div class="phone">{{item.phone}}</div>
                            </div>
                            <div class="status">
                                <div class="status-block">{{getStatus(item)}}</div>
                                <div class="status-block">{{getVisitAim(item)}}</div>
                            </div>
                        </div>
                        <div class="mask" v-if="item.status != 3 && shopRole">
                            <div class="comp" @click.stop="compFollow(item)">完成</div>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="btn-list" v-if="show">
                <li v-if="shopRole == true" @click="isBatchComplate = true"><span>批量完成</span><i class="iconfont icon-piliangwancheng"></i></li>
                <li v-if="shopRole == true && shopManageRole == true" @click="isTimingFollow = true"><span>定时跟进</span><i class="iconfont icon-dingshigenjin"></i></li>
                <li v-if="shopRole == true" @click="isChoseMember = true"><span>创建跟进</span><i class="iconfont icon-chuangjiangenjin"></i></li>
            </ul>
        </div>
        <div>
            <!-- 历史未完成-->
            <el-dialog :visible.sync="isHistory" top="12%" customClass="choseMemberDig" :close-on-click-modal="false">
                <HistoryNoComplate
                    :shopId="shopId"
                    :followData="followData"
                    :isChoseMember="isHistory"
                    @closeChoMember="closeHistory"
                ></HistoryNoComplate>
            </el-dialog>
            <!-- 批量完成-->
            <el-dialog :visible.sync="isBatchComplate" top="12%" customClass="choseMemberDig" :close-on-click-modal="false">
                <BatchComplate
                    :shopId="shopId"
                    :followId="followId"
                    :followData="followData"
                    :isChoseMember="isBatchComplate"
                    @closeChoMember="closeBatchFollow"
                ></BatchComplate>
            </el-dialog>
            <!-- 定时跟进 -->
            <el-dialog :visible.sync="isTimingFollow" top="12%" customClass="timingFollowDig" :close-on-click-modal="false">
                <TimingFollowUp
                    :shopId="shopId"
                    :isTimingFollow="isTimingFollow"
                ></TimingFollowUp>
            </el-dialog>

            <!-- 选择负责人 -->
            <el-dialog :visible.sync="isChoseLeader" top="12%" customClass="choseLeaderDig" :close-on-click-modal="false">
                <ChoseLeader
                    :shopId="shopId"
                    :isFollowPage="true"
                    :isChoseLeader="isChoseLeader"
                    @closeChoMember="closeChoLeader"
                    @returnBack="returnBack"
                ></ChoseLeader>
            </el-dialog>
            <!-- 选择会员 -->
            <el-dialog :visible.sync="isChoseMember" top="12%" customClass="choseMemberDig" :close-on-click-modal="false">
                <ChoseMember
                    :shopId="shopId"
                    :isChoseMember="isChoseMember"
                    @closeChoMember="closeChoMember"
                ></ChoseMember>
            </el-dialog>
            <!-- 跟进完成 -->
            <el-dialog :modal="false" :visible.sync="isCopmeFllow" top="12%" customClass="compeReDig" :close-on-click-modal="false">
                <ComplateFollow
                    :isCopmeFllow="isCopmeFllow"
                    :followData="followData"
                    :followId="followId"
                    @complate="complate"
                ></ComplateFollow>
            </el-dialog>
            <!-- 跟进结果 -->
            <el-dialog :visible.sync="isFllowResult" top="7%" customClass="followResultDig" :close-on-click-modal="false">
                <followResult
                    :shopId="shopId"
                    :followId="followId"
                    :prinList="prinList"
                    :followData="followData"
                    :shopManageRole="shopManageRole"
                ></followResult>
            </el-dialog>
            <!-- 跟进 -->
            <el-dialog :visible.sync="isFllow" top="18%" customClass="followReDig" :close-on-click-modal="false">
                <Follow
                    :isFllow="isFllow"
                    :shopId="shopId"
                    :followId="followId"
                    :followData="followData"
                    :prinList="prinList"
                    isFollowPage="1"
                    @closeFollow="closeFollow"
                    @updataFollow="updataFollow"
                ></Follow>
            </el-dialog>
            <!-- 跟进目的 -->
            <el-dialog :modal="false" :visible.sync="isVisitAim" top="18%" customClass="visitAimDig" :close-on-click-modal="false">
                <VisitAim
                    :VisitAim="isVisitAim"
                    :shopId="shopId"
                    :followData="followData"
                    @closeAim="closeAim"
                ></VisitAim>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DropDownMenu from '../../components/template/DropDownMenu'
import {seekGetUserInfo, seekMemberAllList, seekGetMemberInfo, seekGetShopListByCo, seekGetFollowAllList, seekGetFollowInfo, seekUnfinishedFollowNum, seekGetShopUserList} from '../../Api/commonality/seek'
import {operateFollowCreate} from '../../Api/commonality/operate'
import Follow from './components/Follow'
import followResult from './components/followResult'
import ComplateFollow from './components/complateFollow'
import ChoseMember from './components/choseMember'
import ChoseLeader from './components/choseLeader'
import TimingFollowUp from './components/timingFollowUp'
import BatchComplate from './components/batchComplate'
import HistoryNoComplate from './components/historyNoComplate'
import VisitAim from './components/visitAim'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default {
    components: {
        DropDownMenu,
        Follow,
        followResult,
        ComplateFollow,
        ChoseMember,
        ChoseLeader,
        TimingFollowUp,
        BatchComplate,
        HistoryNoComplate,
        VisitAim,
        FormatImg
    },
    data () {
        return {
            shopUserList: [],
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
            followAimList: [
                {
                    name: '日常拜访',
                    type: 1
                },
                {
                    name: '促销执行',
                    type: 2
                },
                {
                    name: '临时拜访',
                    type: 3
                },
                {
                    name: '其它目的',
                    type: 4
                },
                {
                    name: '售后跟进',
                    type: 5
                },
                {
                    name: '生日跟进',
                    type: 6
                },
            ],
            memberType: '',
            memberGrade: '',
            followStatus: '',
            followAimSeek: '',
            shopUserName: '',
            show: true,
            shopId: '', // 店铺id
            memberId: '',
            shopName: '', // 店铺名称
            dataList: [], // 会员列表
            total: '',
            addLeaguer: false,
            editLeaguer: false,
            isShowFllow: false,
            isShowBuy: false, //
            isFllow: false, // 跟进
            isFllowResult: false, // 跟进结果
            isCopmeFllow: false, // 完成跟进
            isChoseMember: false, // 选择会员
            isChoseLeader: false, // 选择负责人
            isTimingFollow: false, // 定时跟进
            isBatchComplate: false, //批量完成
            isHistory: false, // 历史未完成
            isVisitAim: false,
            memberIdList: [],  // 会员id列表
            leaderIdList: [],  // 负责人id列表
            followAim: '', // 跟进目的
            today: '', // 今天的日期
            followId: '',
            followOptions: {
                page: 1,
                pageSize: 30,
                type: 1,
                status: 1,
            },
            followData: {},
            prinList: '',
            beginTime: '',
            endTime: '',
            unfinishedNum: '', // 历史未完成数
            shopListByCo: '',
            adminStartTime: '',
            adminEndTime: '',
            userPositionInfo: ''
        }
    },
    created () {
        eventBus.$on('oprationgetFollowAllList',(param)=>{
          this.getFollowAllList()
          this.isCopmeFllow = false
        })
        this.getUserInfo()
        
    },
    mounted () {
        $(".main-content").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        }); 
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
        getShopUserList () {
            let options = {
                shopId: this.shopId,
                page: 1,
                pageSize: 999
            }
            seekGetShopUserList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                this.shopUserList = res.data.data.shopUserList
                } else {

                }
            }, (res) => {

            })
        },
        getUserInfo () {
            seekGetUserInfo({userId: sessionStorage.getItem('id')}).then((res) => {
                this.userPositionInfo = res.data.data
                this.gtShopListByCo()
            })
        },
        timeFormat (parm) {
            // console.log(parm)
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + '000000'
        },
        gtShopListByCo () { // 获取店铺列表
            let options = {
                page: 1,
                pageSize: 999
            }
            seekGetShopListByCo(options).then((res) => {
                this.shopListByCo = res.data.data.shopList
                this.shopId = res.data.data.shopList[0].shopId
                this.unfinishedFollowNum()
                this.beginTime = this.getDate(-((new Date()).getDate()-1),'start').format
                this.endTime = this.getDate(0,'end').format
                this.adminStartTime = this.timeFormat(this.beginTime)
                this.adminEndTime = this.timeFormat(this.endTime)
                this.getShopUserList()
                this.getFollowAllList()
                
            }, (res) => {

            })
        },
        updataFollow () {
            this.isFllow = false
            this.isFllowResult = false
            this.getFollowAllList()
        },
        unfinishedFollowNum () {
            // console.log(111)
            let options = {
                shopId: this.shopId
            }
            seekUnfinishedFollowNum(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.unfinishedNum = res.data.data.unfinishedNum
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
       followCreate () {
            let mebList = []
            let leaList = []
            this.memberIdList.forEach((item, index) => {
               mebList.push({memberId: item})
            })
            this.leaderIdList.forEach((item) => {
                leaList.push({principalId: item})
            })
            let options = {
               shopId: this.shopId,
               visitAim: this.followAim,
               followTime: this.today,
               memberList: mebList,
               status: 1,
               principalList: leaList

           }
           operateFollowCreate(options).then((res) => {
               console.log(res)
               if (res.data.state == 200) {
                    this.getFollowAllList()
                    this.unfinishedFollowNum()
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
        closeHistory(val) { // 关闭历史未完成
            this.isHistory = false
            this.getFollowAllList()
        },
        closeBatchFollow (val) { // 关闭批量修改
            console.log(val)
            this.isBatchComplate = false
            this.getFollowAllList()
        },
        returnBack () {
            this.isChoseLeader = false
            this.isChoseMember = true
        },
        closeChoLeader (val) {
            this.leaderIdList = val.list
            this.followAim = val.followAim
            this.isChoseLeader = false
            this.getDate1(0, 1)
            //this.followCreate()
        },
        closeChoMember (val) { // 选择会员弹窗的回调
            //console.log(val);
            this.isChoseMember = false
            this.memberIdList = val.list
            if (this.shopManRole) {
                this.isVisitAim = true
                this.leaderIdList = []
                this.leaderIdList.push(sessionStorage.getItem('id'))
                //console.log(this.leaderIdList)
            } else {
                this.isChoseLeader = true
            } 
        },
        closeAim (val) {
            //console.log(val)
            this.isVisitAim = false
            this.followAim = val
            this.getDate1(0, 1)
        },
        complate (val) { // 跟进完成
            //console.log(val)
            this.isCopmeFllow = false
            this.getFollowAllList()
        },
        compFollow (item) { // 完成跟进
            console.log(item)
            this.followId = item.followId
            if (this.followData.status != 3) {
                
                this.isCopmeFllow = true
            }
        },
        closeFollow () {
            this.isFllow = false
        },
        getVisitAim (item) { // 跟进目的
            switch (item.visitAim) {
                case '1':
                    return '日常拜访'
                case '2':
                    return '促销执行'
                case '3':
                    return '临时拜访'
                case '4':
                    return '其他目的'
                case '5':
                    return '售后跟进'
                case '6':
                    return '生日跟进'
            }
        },
        getStatus (item) {
            switch (item.status) {
                case '1':
                    return '未完成'
                case '2':
                    return '已超时'
                case '3':
                    return '已完成'
                case '4':
                    return '已暂停'
            }
        },
        getDate1( day, type  ){
            console.log(111)
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
            //console.log(Day)
            //this.endTime = Year +'-'+ month +'-'+ Day
            //this.startTime = Year +'-'+ month +'-'+ (Day- (Day-1))
            //console.log(Year +'-'+ month +'-'+ Day)
            this.today = Year + month + Day + '000000'
            //console.log('日期',this.today)
            this.followCreate()
        },
        openEdit (item) { // 打开会员详情
            // console.log(item)
            // this.isFllow = true
            this.followId = item.followId
            this.memberId = item.memberId
            //console.log(this.shopId)
            this.getFollowInfo()

        },
        getFollowInfo() { // 获取跟进详情
            let options = {
                shopId: this.shopId,
                followId: this.followId
            }
            seekGetFollowInfo(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.followData = res.data.data
                    this.reArr1(this.followData)
                }
            }, (res) => {
                console.log(res)
            })
        },
        reArr1 (item) { // 负责人数组重组
            //console.log(item.principalList)
            let arr = []
            item.principalList.forEach((f, index) => {
              arr.push(f.principalName)
            })
            this.prinList = arr.join(',')
            if (this.followData.status != 3) {
                this.isFllow = true
            } else {
                this.isFllowResult = true
            }

        },
        closeEditReturn (val) {
            this.editLeaguer = val.status
        },
        closeReturn (val) { // 关闭弹窗的返回
            this.addLeaguer = val.status
            this.getFollowAllList()
        },
        // isShopManSee (item) {  // 可查看会员的店铺人员
        //     if (this.shopManRole) {
        //         if (item.principalFlag == 'Y' || item.type == 1 || item.type == 2 || item.type == 3) {
        //             return true
        //         } else {
        //             return false
        //         }
        //     } else {
        //         return false
        //     }
        // },
        goBackAct () {
            window.history.go(-1)
        },
        reArr (item) {
            //console.log(item)
            let arr = []
            item.principalList.forEach((f, index) => {
              arr.push(f.principalName)
            })
            Object.assign(item, {
                prinList: arr.join(',')
            })
        },
        getFollowAllList () {
            let options = {
                shopId: this.shopId,
                type: this.followOptions.type,
                status: this.followOptions.status,
                page: this.followOptions.page,
                pageSize: this.followOptions.pageSize,
                memberType: this.memberType,
                memberGrade: this.memberGrade,
                followPurpose: this.followAimSeek,
                principalId: this.shopUserName,
                beginTime: this.adminStartTime,
                endTime: this.adminEndTime,
            }
            seekGetFollowAllList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.dataList = res.data.data.dataList
                    this.total = res.data.data.total
                }
            }, (res) => {
                console.log(res)
            })
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
                this.followOptions.status = this.followStatus;
            } else if (val.type == '跟进目的') {
                this.followAimSeek = val.item.operateId
            } else if (val.type == '负责人') {
                this.shopUserName = val.item.operateId
            } else if (val.type == '购买时间') {
                this.buyTime = val.item.operateId
            }
            this.getFollowAllList()
        },
        clearInfo (val) {
            if (val.type == '店铺') {
                this.shopId = ''
                this.shopName = ''
            } else if (val.type == '会员类型') {
                this.memberType = ''
            } else if (val.type == '会员级别') {
                this.memberGrade = ''
            } else if (val.type == '跟进状态') {
                this.followStatus = ''
            } else if (val.type == '跟进目的') {
                this.followAimSeek = ''
            } else if (val.type == '负责人') {
                this.shopUserName = ''
            } else if (val.type == '购买时间') {
                this.buyTime = ''
            }
            this.getFollowAllList()
        },
        dateChange (val) {
            this.adminStartTime = this.timeFormat(val)
            this.getFollowAllList()
        },
        dateChange1 (val) {
            this.adminEndTime = this.timeFormat(val)
            this.getFollowAllList()
        },
        getDate( day, type  ){
            //console.log(111)
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
        },
    }

}
</script>

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
            font-size: 16px;
            color:#333;
            float: left;
            i {
                font-size: 25px;
                color:#2993f8;
                margin-right: 16px;
            }
        }
        .title-right {
            float: right;
            li {
                float: left;
                margin-right: 16px;
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
                &>span {
                    cursor: pointer;
                    font-size: 14px;
                    &>em {
                        font-style: normal;
                    }
                }
            }
        }
        .main-content {
            padding: 0 20px;
            height: 660px;
            // overflow-y: auto;
            .main-item {
                width: 370px;
                height: 140px;
                background:#f4f4f4;
                border-radius: 10px;
                float: left;
                margin-right: 50px;
                margin-bottom: 20px;
                position: relative;
                overflow: hidden;
                &:hover {
                    .mask {
                        bottom: 0;
                    }
                }
                .item-left {
                    height: 100%;
                    width: 94px;
                    float: left;
                    .logo {
                        width: 60px;
                        margin-left: 20px;
                        position: relative;
                        padding-top: 20px;
                        margin-bottom: 22px;
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
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        padding: 0 10px;
                    }
                }
                .item-right {
                    padding-top: 30px;
                    float: left;
                    width: 276px;
                    height: 100%;
                    box-sizing: border-box;
                    padding-right: 20px;
                    position: relative;
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
                            // &:after {
                            //     content: '';
                            //     width: 1px;
                            //     height: 10px;
                            //     background:#d6d6d6;
                            //     position: absolute;
                            //     top: 2px;
                            //     right: -18px;
                            // }
                        }
                        .date {
                            margin-left: 17px;
                        }
                    }
                    .status {
                        width: 52px;
                        position: absolute;
                        top: 30px;
                        right: 20px;
                        .status-block {
                            width: 52px;
                            height: 20px;
                            border-radius: 4px;
                            font-size: 12px;
                            color:#fff;
                            text-align: center;
                            line-height: 20px;
                        }
                        .status-block:nth-child(1) {
                            background:#ffd58b;
                            margin-bottom: 10px;
                        }
                        .status-block:nth-child(2) {
                            background:#96d7ff;
                        }
                    }
                    // .btn {
                    //     height: 24px;
                    //     .wrap {
                    //         width: 158px;
                    //         height: 24px;
                    //         float: right;
                    //         &>div {
                    //             float: left;
                    //             width: 72px;
                    //             height: 24px;
                    //             border-radius: 4px;
                    //             text-align: center;
                    //             line-height: 24px;
                    //             background:#fff;
                    //             font-size: 12px;
                    //             color:#999999;
                    //             cursor: pointer;
                    //         }
                    //         &>div:hover {
                    //             background:#2993f8;
                    //             color:#fff;
                    //         }
                    //         .follow-btn {
                    //             margin-right: 14px;
                    //         }
                    //     }
                    // }
                }
                .mask {
                    width: 100%;
                    height: 35px;
                    position: absolute;
                    bottom: -35px;
                    left: 0;
                    background:rgba(0,0,0,0.4);
                    transition: all .3s ease;
                    .comp {
                        width: 52px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        background:#fff;
                        color:#2993f8;
                        border-radius: 4px;
                        margin: 5px auto;
                        font-size: 12px;
                        cursor: pointer;
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
                    z-index: 2;
                    background:#2993f8;
                    color:#fff;
                    font-weight: bold;
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 0;
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


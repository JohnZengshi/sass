<template>
        <div class="wrap">
            <div class="title">跟进记录-{{memberInfo.username}}</div>
            <div class="one-block">
                <div class="item-block">
                    <div class="num-wrap">
                        <span>{{followInfo.totalFollow}}</span>次

                    </div>
                    <div class="name">总跟进数</div>
                </div>
                <div class="item-block">
                    <div class="num-wrap">
                        <span>{{followInfo.alreadyFollow}}</span>次
                    </div>
                    <div class="name">完成跟进</div>
                </div>
                <div class="item-block">
                    <div class="num-wrap">
                        <span>{{followInfo.unFollowRate}}</span>次
                    </div>
                    <div class="name">未完成跟进</div>
                </div>
                <div class="item-block">
                    <div class="num-wrap">
                       <span>{{followInfo.recentFollow}}</span>次
                    </div>
                    <div class="name">近一个月跟进</div>
                </div>
            </div>
            <div class="condition-filter">
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
                <div class="check-wrap">
                    <el-checkbox v-model="followComplete" @change="followChange1">已完成</el-checkbox>
                </div>
                <div class="check-wrap">
                    <el-checkbox v-model="followStay" @change="followChange2">待跟进</el-checkbox>
                </div>
                <div class="check-wrap">
                    <el-checkbox v-model="followStop" @change="followChange3">已暂停</el-checkbox>
                </div>
                <div class="check-wrap">
                    <el-checkbox v-model="followTimeOut" @change="followChange4">已超时</el-checkbox>
                </div>
            </div>
            <div class="follow-list">
                <ul>
                    <li @click="openItem(index)" :class="{active: openIndex == index}" v-for="(item, index) in followList" :key="index">
                        <div class="line">
                            <label>跟进人</label>
                            <div>
                                <span>{{item.followName}}</span>
                            </div>
                        </div>
                        <div class="line">
                            <label>跟进目的</label>
                            <div>
                                <span>{{getVist(item)}}</span>
                            </div>
                        </div>
                        <div class="line">
                            <label>跟进状态</label>
                            <div>
                                <span>{{item.followStatus == 1 ? '未完成' : item.followStatus == 2 ? '已超时': item.followStatus == 3 ? '已完成':'已暂停'}}</span>
                            </div>
                        </div>
                        <div class="line">
                            <label>跟进时间</label>
                            <div>
                                <span>{{formatTime(item.followTime)}}</span>
                            </div>
                        </div>
                        <div class="hide-block" v-if="openIndex == index">
                            <div class="line">
                                <label>跟进方式</label>
                                <div>
                                    <span>{{getType(item.followType)}}</span>
                                </div>
                            </div>
                            <div class="follow-result">
                                <label>跟进结果</label>
                                <div>
                                    <span>{{item.followResult}}</span>
                                </div>
                            </div>
                            <div class="follow-img">
                                <img :src="f.picUrl" v-for="(f, i) in item.followPicList" :key="i" />
                            </div>
                        </div>
                        <div class="create-time">
                            <div class="font-wrap">{{item.followCreateTime}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
import {seekGetMemberInfo, seekGetMemberFollowList} from 'Api/commonality/seek'
export default {
    props: [
        'shopId',
        'shopManageRole',
        'memberId',
        'isShowFllow'
    ],
    data () {
        return {
            followReDialog: true,
            memberInfo: {},
            endTime: '',
            startTime: '',
            adminStartTime: '',
            adminEndTime: '',
            openIndex: 0,
            followList: [],
            followInfo: {},
            followComplete: true, // 已完成
            followCompleteValue: 1, // 已完成
            followStay: true, // 待跟进
            followStayValue: 1, // 待跟进
            followStop: true, // 已暂停
            followStopValue: 1, // 已暂停
            followTimeOut: true, // 已超时
            followTimeOutValue: 1, // 已超时
        }
    },
    watch: {
        isShowFllow (val) {
            if (val == true) {
                this.getMemberFollowList()
            } else {
                this.followComplete = true // 已完成
                this.followCompleteValue = 1 // 已完成
                this.followStay = true // 待跟进
                this.followStayValue = 1 // 待跟进
                this.followStop = true // 已暂停
                this.followStopValue = 1 // 已暂停
                this.followTimeOut = true // 已超时
                this.followTimeOutValue = 1 // 已超时
            }
        }
    },
    mounted () {
        this.followReDialog = this.isShowFllow
        this.getDate(0)
        this.getMemberFollowList()
        $(".follow-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });

    },
    methods: {
        getType (type) {
            switch (type) {
                case '1':
                    return '面谈'
                case '2':
                    return '电话'
                case '3':
                    return '聊天软件'
                case '4':
                    return '其它'
            }
        },
        getVist (item) {
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
        followChange1 (val) {
            // console.log(val)
            // console.log(this.followComplete)
            if (this.followComplete == true) {
                this.followCompleteValue = 1
            } else {
                this.followCompleteValue = 2
            }
            this.getMemberFollowList()
        },
        followChange2 (val) {
            // console.log(val)
            if (this.followStay == true) {
                this.followStayValue = 1
            } else {
                this.followStayValue = 2
            }
            this.getMemberFollowList()
        },
        followChange3 (val) {
            // console.log(val)
            if (this.followStop == true) {
                this.followStopValue = 1
            } else {
                this.followStopValue = 2
            }
            this.getMemberFollowList()
        },
        followChange4 (val) {
            // console.log(val)
            if (this.followTimeOut == true) {
                this.followTimeOutValue = 1
            } else {
                this.followTimeOutValue = 2
            }
            this.getMemberFollowList()
        },
        openItem (index) {
            console.log(index)
            this.openIndex = index
            // Object.assign(item, {
            //     isOpen: !item.isOpen
            // })
        },
        getMemberInfo () { // 获取会员信息
            let options = {
                shopId: this.shopId,
                memberId: this.memberId
            }
            seekGetMemberInfo(options).then((res) => {
                console.log(res)
                //console.log(333)
                if (res.data.state == 200) {
                    this.memberInfo = res.data.data
                } else {

                }
            }, (res) => {
                console.log(res)
            })
        },
        getMemberFollowList () { // 会员跟进列表
            let options = {
                shopId: this.shopId,
                memberId: this.memberId,
                followComplete: this.followCompleteValue,
                followStay: this.followStayValue,
                followStop: this.followStopValue,
                followTimeOut: this.followTimeOutValue,
                endTime: this.adminEndTime,
                startTime: this.adminStartTime,
            }
            seekGetMemberFollowList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.followList = res.data.data.dataList
                    this.followInfo = res.data.data
                }
            }, (res) => {
                console.log(res)
            })
        },
        dateChange (val) {
            console.log(val)
            // console.log(this.endTime)
            this.adminStartTime = this.timeFormat(val)
            this.getMemberInfo()
            this.getMemberFollowList()
        },
        dateChange1 (val) {
            console.log(val)
            // console.log(this.startTime)
            // console.log(this.endTime)
            this.adminEndTime = this.timeFormat(val)
            this.getMemberInfo()
            this.getMemberFollowList()
        },
        formatTime (time1) { // 格式化时间
            //console.log(this.receiptsIntroList)
            //console.log(this.receiptsIntroList)
            let year = time1.substring(0, 4)
            let month = time1.substring(4, 6)
            let data = time1.substring(6, 8)
            let hour = time1.substring(8, 10)
            let time = time1.substring(10, 12)
            return year + "-" + month + "-" + data + " " + hour + ":" + time
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
            console.log(Day)
            this.endTime = Year + '-' + month + '-' + Day
            this.startTime = Year + '-' + month + '-' + (Day- (Day-1))
            
            this.adminStartTime = Year + month + Day + '000000'
            this.adminEndTime = Year + month + (Day- (Day-1)) + '000000'
            //this.seekReceipts()
            this.getMemberInfo()
        },
        formatDate( d ){
           return d < 10 ? ('0' + d ) : d + ''
        },
        timeFormat (parm) {
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            console.log(year)
            console.log(month)
            console.log(data)
            // let hour = parm.substring(8, 10)
            // let time = parm.substring(10, 12)
            return year + month + data + '000000'
        },
    }
}
</script>

<style lang="scss">
.followReDig {
    width: 700px;
    height: 540px ;
    background:#fff;
    border-radius: 10px;
    .el-dialog__header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        padding-right: 10px;
        .el-dialog__headerbtn {
            // margin-top: 10px;
        }
    }
    .el-dialog__body {
        padding: 0 28px;
    }
    .wrap {

        .title {
            padding-top: 20px;
            font-size: 14px;
            color:#333;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .one-block {
            width: 640px;
            height: 100px;
            background:#eef7fe;
            border-radius: 10px;
            margin-bottom: 16px;
            .item-block {
                height: 100%;
                width: 160px;
                float: left;
                padding-top: 27px;
                padding-left: 38px;
                .num-wrap {
                    height: 34px;
                    color:#999;
                    font-size: 14px;
                    &>span {
                        font-size: 20px;
                        color:#2993f8;
                    }
                }
                .name {
                    color:#333333;
                    font-size: 14px;
                }
            }
        }
        .condition-filter {
            margin-bottom: 20px;
            height: 28px;
            .batch-time-wrap{
                float: left;
                height: 28px;
                width: 188px;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                margin-right: 16px;
                &>span {
                    line-height: 28px;
                    font-size: 14px;
                }
            }
            .check-wrap {
                float: left;
                width: 100px;
            }
        }
        .follow-list {
            height: 270px;
            ul {
                &>li {
                    min-height: 128px;
                    border-radius: 10px;
                    background:#f6f7f8;
                    margin-bottom: 20px;
                    padding: 20px;
                    position: relative;
                    .line {
                        width: 300px;
                        float: left;
                        height: 36px;
                        line-height: 36px;
                        label {
                            float: left;
                            width: 60px;
                        }
                        &>div {
                            float: left;
                            width: 240px;
                            text-align: right;
                            padding-right: 60px;
                            span {
                                float: right;
                            }
                        }
                    }
                    .hide-block {
                        .follow-result {
                            height: 58px;
                            float: left;
                            width: 100%;
                            label {
                                height: 36px;
                                width: 60px;
                                float: left;
                                line-height: 36px;
                            }
                            &>div {
                                float: left;
                                width: 544px;
                                text-align: left;
                                height: 100%;
                                padding-left: 30px;
                                span {
                                    float: left;
                                    line-height: 36px;
                                }
                            }
                        }
                        .follow-img {
                            width: 100%;
                            height: 54px;
                            float: left;
                            &>img {
                                width: 54px;
                                height: 54px;
                                margin-right: 20px;
                                border-radius: 4px;
                            }
                        }
                    }
                    .create-time {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 163px;
                        height: 23px;
                        background:url('./../../../../static/img/member/new/time-bg.png') no-repeat left center;
                        .font-wrap {
                            color:#fff;
                            text-align: center;
                        }
                    }
                }
                li.active {
                    height: 310px;
                }
            }
        }
    }
}
</style>

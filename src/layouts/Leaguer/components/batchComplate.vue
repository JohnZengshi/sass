<template>
    <div class="chose-wrap">
        <div class="title">批量完成</div>
        <div class="menu-list flex flex-r">
            <div class="search">
                <input @keyup.enter="getFollowAllList" v-model="keyword" type="text" placeholder="请输入会员名/手机号">
                <div class="search-btn" @click="getFollowAllList">
                    <i class="iconfont icon-sousuo"></i>
                </div>
            </div>
            <div class="drop-block">
                <DropDownMenu
                    titleName="级别"
                    dataType="会员级别"
                    :propList="levelList"
                    @dropReturn="dropReturn"
                    @clearInfo="clearInfo"
                >
                </DropDownMenu>
            </div>
            <div class="drop-block" style="width:93px">
                <DropDownMenu
                    titleName="跟进目的"
                    dataType="属性"
                    :propList="visitList"
                    @dropReturn="dropReturnlast"
                    @clearInfo="clearInfo"
                >
                </DropDownMenu>
            </div>
            <div class="batch-time-wrap  flex flex-r">
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
        </div>
        <div class="member-list">
            <ul>
                <li v-for="(item, index) in dataList" :key="index" v-if="item.status != 3">
                    <img :src="item.memberLogo">
                    <div class="name">{{item.memberName}}</div>
                    <div class="label">
                        <span class="level1" :class="{lveColor1:item.grade == 1, lveColor2:item.grade == 2, lveColor3:item.grade == 3}">{{getGrade(item.grade)}}</span>
                        <span class="type" :class="{typeColor1: item.visitAim == 1, typeColor2: item.visitAim == 2,typeColor3: item.visitAim == 3}">{{getType(item.visitAim)}}</span>
                        <span class="level" :class="{lvColor1:item.status == 1, lvColor2:item.status == 2, lvColor3:item.status == 3,lvColor4:item.status == 4}">{{getLevel(item.status)}}</span>
                    </div>
                    <div class="phone">
                        <img src="./../../../../static/img/member/new/phone.png" />
                        {{item.phone}}
                    </div>
                    <div class="check">
                        <el-checkbox-group v-model="checkList" @change="checkChange">
                            <el-checkbox :label="item.followId"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chose-btn" @click="clickAct">确定</div>
        <el-dialog :modal="false" :visible.sync="isCopmeFllow" top="0%" customClass="compeReDig" :close-on-click-modal="false">
            <ComplateFollow
                :isCopmeFllow="isCopmeFllow"
                :followData="followData"
                :followId="followId"
                :followIdList="checkList"
                @complate="complate"
            ></ComplateFollow>
        </el-dialog>
    </div>
</template>

<script>
import {seekGetFollowAllList} from 'Api/commonality/seek'
import {operateFollowComplete} from 'Api/commonality/operate'
import DropDownMenu from './../../../components/template/DropDownMenu'
import ComplateFollow from './complateFollow'
var moment = require('moment');
export default {
    components: {
        DropDownMenu,
        ComplateFollow
    },
    props: [
        'shopId',
        'isChoseMember',
        'followData',
        'followId'
    ],
    watch: {
        isChoseMember () {
            this.getFollowAllList()
        }
    },
    data () {
        return {
            beginTime: '',
            endTime: '',
            dataList: [],
            checkList: [],
            page: 1,
            pageSize: 99,
            startTime: '',
            isCopmeFllow: false,
            memberGrade: '',
            followPurpose: '',
            levelList: [
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
                }
            ],
            visitList: [
                // {
                //     name: '日常拜访',
                //     type: 1
                // },
                // {
                //     name: '促销执行',
                //     type: 2
                // },
                // {
                //     name: '临时拜访',
                //     type: 3
                // },
                // {
                //     name: '其他目的',
                //     type: 4
                // },
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
                }
            ],
            keyword: '',
            followList: [],
            adminStartTime: '',
            adminEndTime: '',
        }
    },
    created () {
        this.getDate(0)

    },
    mounted () {
        $(".member-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });
    },
    methods: {
        timeFormat (parm) {
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + '000000'
        },
        clickAct () {
            if (this.checkList.length == 0) {
                this.$message({
                    info: warning,
                    message: '请选择未完成跟进！'
                })
            } else {
                this.isCopmeFllow = true
            }

        },
        complate (val) {
            this.isCopmeFllow = false
            this.$emit("closeChoMember")
        },
        followComplete () {
            let options = {
                followList: this.followList
            }
            operateFollowComplete(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.$emit("closeChoMember", {list: this.checkList})
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                console.log(res)
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        closeDia () { // 关闭弹窗
            this.followList = []
            this.checkList.forEach((item, index) => {
                this.followList.push({followId: item})
            })
            this.followComplete()
        },
        dropReturn (val) { // 下拉框返回
            console.log(val)
            this.memberGrade = val.item.type
            this.getFollowAllList()
        },
        dropReturnlast (val) {
           console.log(val)
          this.followPurpose = val.item.type
          this.getFollowAllList()
        },
        clearInfo (val) { // 清除返回
        console.log(val)
            if (val.type == "属性") {
                this.followPurpose = ''
            } else {
                this.memberGrade = ''
            }
            this.getFollowAllList()
        },
        getGrade (level) {
            switch (level) {
                case '1':
                    return "普通"
                case '2':
                    return "中级"
                case '3':
                    return "重要"
            }
        },
        getLevel (level) {
            switch (level) {
                case '1':
                    return "未完成"
                case '2':
                    return "已超时"
                case '3':
                    return "已完成"
                case '4':
                    return "已暂停"
            }
        },
        getType (type) {
            switch (type) {
                case "1":
                    return '日常拜访'
                case "2":
                    return '促销执行'
                case "3":
                    return '临时拜访'
                case "4":
                    return '其他目的'
            }
        },
        checkChange (val) { // 多选选中的改变
            console.log(val)
        },
        getFollowAllList () {
            let options = {
                shopId: this.shopId,
                page: this.page,
                pageSize: this.pageSize,
                type: 1,
                status: 1,
                beginTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD')),
                endTime: this.timeFormat(moment(this.endTime).format('YYYY-MM-DD')),
                // beginTime: this.adminStartTime,
                // endTime: this.adminEndTime,
                keyword: this.keyword,
                memberGrade: this.memberGrade,
                followPurpose: this.followPurpose

            }
            seekGetFollowAllList(options)
                .then((res) => {
                    if (res.data.state == 200) {
                        this.dataList = res.data.data.dataList
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                }, (res) => {
                    console.log(res)
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                })
        },
        dateChange (val) {
            //console.log(this.startTime)
            //console.log(this.endTime)
            this.adminStartTime = this.timeFormat(val)
            this.getFollowAllList()
        },
        dateChange1 (val) {
            //console.log(this.startTime)
            //console.log(this.endTime)
            this.adminEndTime = this.timeFormat(val)
            this.getFollowAllList()
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
            this.beginTime = Year + '-' + month + '-' + (Day- (Day-1))
            this.adminStartTime = Year + month + Day + '000000'
            this.adminEndTime = Year + month + (Day- (Day-1)) + '000000'
            //this.seekReceipts()
            this.getFollowAllList()
        },
        formatDate( d ){
           return d < 10 ? ('0' + d ) : d + ''
        },
    }
}
</script>

<style lang="scss">
.choseMemberDig {
    width: 700px;
    height: 730px;
    background:#fff;
    border-radius: 10px;
    .el-dialog__header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .el-dialog__body {
        padding: 0 28px;
    }
}
.chose-wrap {
    .title {
        padding-top: 20px;
        font-size: 14px;
        color:#333;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .menu-list {
        margin-bottom: 24px;
        height: 28px;
        .search {
            width: 190px;
            height: 28px;
            border-radius: 4px;
            float: left;
            position: relative;
            overflow: hidden;
            margin-right: 20px;
            input {
                border-radius: 4px;
                width: 188px;
                height: 28px;
                border: 1px solid #d6d6d6;
                padding-left: 10px;
            }
            .search-btn {
                position: absolute;
                width: 30px;
                height: 28px;
                right: 0;
                top: 0;
                background: #2993f8;
                text-align: center;
                cursor: pointer;
                i {
                    color:#fff;
                    line-height: 28px;
                }
            }
        }
        .drop-block {
            float: left;
            width: 90px;
            height: 28px;
            border-radius: 4px;
            border: 1px solid #d6d6d6;
            text-align: center;
            margin-right: 18px;
        }
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
    }
    .member-list {
        height: 500px;
        margin-bottom: 60px;
        ul {
            // height: 100%;
            li {
                height: 50px;
                line-height: 50px;
                img {
                    width: 34px;
                    height: 34px;
                    float: left;
                    margin-top: 8px;
                    margin-left: 20px;
                    margin-right: 20px;
                    border-radius: 50%;
                }
                .name {
                    float: left;
                    margin-right: 20px;
                    width: 95px;
                }
                .label {
                    float: left;
                    width: 165px !important;
                    // height: 50px;
                    padding-top: 17px;
                    &>span {
                        width: 34px;
                        height: 16px;
                        border-radius: 4px;
                        float: left;
                        font-size: 12px;
                        text-align: center;
                        line-height: 16px;
                        color:#fff;
                    }
                    .level1 {
                        width: 42px;
                        font-size: 12px;
                        margin-right: 15px;
                    }
                    .type {
                        margin-right: 15px;
                        width: 50px;
                        font-size: 12px;
                    }
                    .level {
                        width: 42px;
                        font-size: 12px;
                    }
                    .typeColor1 { background:#0078f2;}
                    .typeColor2 { background:#009dff;}
                    .typeColor3 { background:#96d7ff;}
                    .lvColor1 {background:#ffc62e;}
                    .lvColor2 {background:#ffa200;}
                    .lvColor3 {background:#f27200;}
                    .lvColor4{background: #ffa200;}
                    .lveColor1 {background:#ffc62e;}
                    .lveColor2 {background:#ffa200;}
                    .lveColor3 {background:#f27200;}
                }
                .phone {
                    float: left;
                    img {
                        width: 14px;
                        height: 14px;
                        margin-top: 18px;
                        margin-right: 7px;
                        border-radius: 0;
                    }
                }
                .check {
                    float: right;
                    margin-right: 20px;
                    .el-checkbox-group {
                        .el-checkbox {

                            .el-checkbox__input {
                                .el-checkbox__inner {
                                    border-radius: 4px;
                                }
                            }
                        }
                    }
                }
            }
            &>li:nth-child(even) {
                background:#f4f4f4;
            }
        }
    }
    .chose-btn {
        width: 90px;
        height: 28px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: 28px;
        background:#2993f8;
        color:#fff;
        margin: 0 auto;
        cursor: pointer;
    }
}
</style>

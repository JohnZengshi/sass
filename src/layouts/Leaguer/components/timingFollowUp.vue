<template>
    <div class="timing-wrap">
        <div class="title">定时跟进</div>
        <div class="timing-list">
            <ul>
                <el-checkbox-group>
                    <li v-for="(item, index) in dataList" :key="index">
                        <div class="time-name" @click="createTimingFollow(2, item)">{{item.terminalFollowName}}</div>
                        <div class="time-type">{{getType(item.type)}}</div>
                        <!-- <div class="time-day" v-if="item.type != 2"><span>{{item.startDay}}</span>天后</div> -->
                        <i class="iconfont icon-lajitong" @click="followTimingOperation(item, 1)"></i>
                    </li>
                </el-checkbox-group>
            </ul>
        </div>
        <div class="timing-btn" @click="createTimingFollow(1)">创建定时跟进</div>
        <div>
            <el-dialog el-dialog :modal="false" :visible.sync="isShowDia" top="82px" customClass="createDig" :close-on-click-modal="false">
                <div class="createTime-wrap">
                    <div class="title">
                        <img src="./../../../../static/img/piliang.png">
                        <div class="name">创建/编辑</div>
                    </div>
                    <div class="main">
                        <input v-model="createData.taskName" placeholder="输入任务名" class="task-name" type="text">
                        <div class="rule block">
                            <div class="time-title "><span></span>选择规则</div>
                            <div class="time-content">
                                <div :class="{active: createData.rule == 1}" @click="choseWay(1)" class="follow-item">售后跟进</div>
                                <div :class="{active: createData.rule == 2}" @click="choseWay(2)" class="follow-item">生日跟进</div>
                                <div :class="{active: createData.rule == 3}" @click="choseWay(3)" class="follow-item">日期跟进</div>
                                <div :class="{active: createData.rule == 4}" @click="choseWay(4)" class="follow-item">定期创建</div>
                            </div>
                        </div>
                        <div class="time">
                            <div v-if="createData.rule == 1">
                                购买N天后<span>(N≥1,N天后创建跟进)</span><input @input="valueReturn(1)" v-model="createData.dayNum" class="day-num" type="text">
                            </div>
                            <div v-if="createData.rule == 3">
                                <div class="date-block">
                                    <el-date-picker
                                        format
                                        v-model="startTime"
                                        type="date"
                                        placeholder="选择日期"
                                        @change="dateChange"
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                            <div v-if="createData.rule == 4">
                                距离上次跟进N天后<span>(N≥1)</span><input @input="valueReturn(1)" v-model="createData.dayNum" class="day-num" type="text">
                            </div>
                        </div>
                        <div class="explain block">
                            <div class="time-title "><span></span>任务说明</div>
                            <div class="time-content">
                                <textarea v-model="createData.remark"></textarea>
                            </div>
                        </div>
                        <div class="create-btn" @click="confirm()">
                            确定
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {seekFollowTimingList} from 'Api/commonality/seek'
import {operateFollowTimingOperation, operateFollowTimingCreate} from 'Api/commonality/operate'
export default {
    props: [
        'isTimingFollow',
        'shopId'
    ],
    data () {
        return {
            dataList: [],
            isShowDia: false, // 创建/修改弹窗
            page: 1,
            pageSize: 99,
            way: 1,
            createData: {
                taskName: '',
                rule: 1,
                dayNum: '',
                remark: ''
            },
            openType: '', // 创建修改
            item: {},
            startTime: ''
        }
    },
    watch: {
        isTimingFollow () {
            this.followTimingList()
        }
    },
    created () {
        this.followTimingList()
    },
    mounted () {
        $(".timing-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });
    },
    methods: {
        valueReturn (type) {
            if (type == 1) {
                if (this.createData.dayNum <0) {
                    this.createData.dayNum = 0
                    return
                }
            }
        },
        confirm () {
            // console.log(this.createData)
            // console.log(this.openType)
            if (this.openType == 1) { // 创建
                if (this.createData.taskName == '') {
                    this.$message('请输入任务名')
                    return
                }
                if (this.createData.remark == ''){
                    this.$message('请输入任务说明')
                    return
                }
                if (this.createData.rule == 1 || this.createData.rule == 4) {
                    if (this.createData.dayNum == '') {
                        this.$message('请输入购买天数')
                        return
                    }
                }
                this.followTimingCreate()
            } else if (this.openType == 2) { // 修改
                this.followTimingOperation(this.item, 2)
            }
        },
        createTimingFollow (type, item) {  // 打开跟进弹窗
            // console.log(type)
            this.openType = type
            if (type == 1) {
                Object.assign(this.createData, {
                    taskName: '',
                    rule: 1,
                    dayNum: '',
                    remark: ''
                })
            } else {
                Object.assign(this.createData, {
                    taskName: item.terminalFollowName,
                    rule: item.type,
                    dayNum: item.startDay,
                    remark: item.remark
                })
                this.item = item
            }
            this.isShowDia = true
        },
        choseWay (type) {
            console.log(type)
            this.createData.rule = type
        },
        followTimingCreate () { // 创建定时跟进
            let options = {
                shopId: this.shopId,
                terminalFollowName: this.createData.taskName,
                type: this.createData.rule,
                intervalDay: this.createData.dayNum,
                startDate: this.startTime,
                remark: this.createData.remark
            }
            operateFollowTimingCreate(options).then((res) => {
                if (res.data.state == 200) {
                    this.isShowDia = false
                    this.followTimingList()
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
        followTimingOperation (item, type) { // 定时跟进操作
            console.log(this.shopId)
            console.log(type)
            let options = {}
            if (type == 1) {
                options = {
                    shopId: this.shopId,
                    terminalFollowId: item.terminalFollowId,
                    operateType: type,
                }
            } else if (type == 2) {
                console.log(222)
                options = {
                    shopId: this.shopId,
                    terminalFollowId: item.terminalFollowId,
                    operateType: type,
                    taskName: this.createData.taskName,
                    dayNum: this.createData.dayNum,
                    rule: this.createData.rule,
                    remark: this.createData.remark,
                }
            }
            console.log(options)
            operateFollowTimingOperation(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.isShowDia = false
                    this.followTimingList()
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
        getType (type) {
            switch (type) {
                case "1":
                return '售后跟进'
                case "2":
                return '生日跟进'
                case "3":
                return '日期跟进'
                case "4":
                return '定期创建'
            }
        },
        followTimingList () { // 定时跟进列表
            let options = {
                shopId: this.shopId,
                pageSize: this.pageSize,
                page: this.page
            }
            seekFollowTimingList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.dataList = res.data.data.dataList
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
        dateChange (val) {
            // console.log(this.startTime)
            // console.log(val)
            this.startDate = this.timeFormat(val)
            // console.log(this.startDate)
            // this.getFollowAllList()
        },
        timeFormat (parm) {
            // console.log(parm)
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + '000000'
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
.timingFollowDig {
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
.timing-wrap {
    .title {
        padding-top: 20px;
        font-size: 14px;
        color:#333;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .timing-list {
        height: 550px;
        margin-bottom: 59px;
        ul {
            li {
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                &>div {
                    float: left;
                }
                .time-name {
                    color:#2993f8;
                    width: 180px;
                    cursor: pointer;
                }
                .time-type {
                    width: 94px;
                }
                .time-day {
                    &>span {
                        color:#2993f8;
                    }
                }
                &>i {
                    float: right;
                    line-height: 50px;
                    cursor: pointer;
                }
                &>i:hover {
                    color:#2993f8;
                }
            }
            li:nth-child(odd) {
                background:#f4f4f4;
            }
        }
    }
    .timing-btn {
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
.createDig {
    width: 320px;
    height: 540px;
    background:#fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
    .createTime-wrap {
        .title {
            padding-top: 24px;
            img {
                width: 46px;
                height: 46px;
                display: block;
                margin: 0 auto;
                border-radius: 50%;
                margin-bottom: 15px;
            }
            .name {
                width: 70px;
                height: 20px;
                text-align: center;
                margin:0 auto;
                color:#333;
                margin-bottom: 25px;
            }
        }
        .main {
            .task-name {
                height: 36px;
                width: 100%;
                background:#f6f7f8;
                padding-left: 20px;
                border-radius: 4px;
                margin-bottom: 24px;
            }
            .block {
                .time-title {
                    height: 14px;
                    font-size: 14px;
                    color: #333;
                    line-height: 14px;
                    margin-bottom: 18px;
                    &>span {
                        border-radius: 2px;
                        height: 14px;
                        width: 3px;
                        background:#2993f8;
                        float: left;
                        margin-right: 7px;
                    }
                    &>i {
                        color:#ff2424;
                    }
                }
            }
            .rule {
                .time-content {
                    height: 28px;
                    margin-bottom: 30px;
                    .follow-item {
                        width: 56px;
                        height: 26px;
                        border: 1px solid #d6d6d6;
                        border-radius: 2px;
                        text-align: center;
                        line-height: 26px;
                        float: left;
                        margin-right: 13px;
                        color:#999999;
                        font-size: 12px;
                        cursor: pointer;
                    }
                    .follow-item.active {
                        background:#e9f4fe;
                        border: 1px solid #2993f8;
                        color:#2993f8;
                    }
                    .follow-item:last-child {
                        margin-right: 0;
                    }
                }
            }
            .time {
                height: 28px;
                font-size: 14px;
                color:#333;
                margin-bottom: 30px;
                span {
                    font-size: 12px;
                    color:#d6d6d6;
                    margin-left: 8px;
                    margin-right: 10px;
                }
                .date-block {
                    //width: 90px;
                    //border: 1px solid #d6d6d6;
                }
                .day-num {
                    width: 58px;
                    height: 28px;
                    background:#f6f7f8;
                    text-align: center;
                    border-radius: 4px;
                }
            }
            .explain {
                margin-bottom: 36px;
                .time-content {
                    textarea {
                        height: 74px;
                        background:#f6f7f8;
                        border-radius: 4px;
                        width: 100%;
                    }
                }
            }
            .create-btn {
                width: 150px;
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
    }
}
</style>

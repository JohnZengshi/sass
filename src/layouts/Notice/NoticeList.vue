<template>
    <div class="notice-list-main">
        <div class="notice-list-title">
            <div class="titile-left">
                公告中心
            </div>
            <div class="titile-right">
                <div class="btn" @click="goPage(1)">新建公告</div>
            </div>
        </div>
        <div class="notice-list-menu">
            <div class="report-data">
                <div class="block until" data-txt="至">
                    <el-date-picker size="mini" v-model="beginTime" @change="getTimeData"  type="date" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
                </div>
                <div class="block">
                    <el-date-picker size="mini" v-model="endTime" @change="overTimeDate"  type="date" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
                </div>
            </div>
            <div class="sel-drop">
                <select-drop
                    class="selected_dropdown"
                    titleName="全部" 
                    dataType="公告类型"
                    :propList="noticeTypeList"
                    @dropReturn="dropReturn"
                >
                </select-drop>
            </div>
            <div class="sel-drop">
                <select-drop
                    class="selected_dropdown"
                    titleName="全部" 
                    dataType="公告位置"
                    :propList="(noticeType == 2 && shopRole) ? sendPosition1 : sendPosition"
                    @dropReturn="dropReturn"
                >
                </select-drop>
            </div>
        </div>
        <div class="notice-list-list">
            <div class="notice-item" v-for="(item, index) in dataList" :key="index">
                <div class="notice-item-title">
                    <div class="title-row1">
                        <div class="draft" v-if="item.noticeType == 2">[草稿箱]</div>
                        <div class="title-name">{{item.title}}</div>
                        <div class="label" v-if="item.receiveObject != '' && item.receiveObject != null">{{getReObj(item.receiveObject)}}</div>
                        <div class="btn-right">
                            <!-- <div v-show="false">{{setTime(item)}}</div> -->
                            <el-tooltip placement="bottom">
                                <div slot="content">{{'提示：24小时内可以撤回，现在剩下' + setTime1(item) + '小时'}}</div>
                                <span v-show="item.isMake == 'Y' && contrastTime(item) && item.noticeType == 1" @click="noticeOperation(4, item.noticeId)">撤回</span>
                            </el-tooltip>
                            <i  @click="goPage(2, item.noticeId)" v-if="item.isMake == 'Y' && item.noticeType == 2" class="iconfont icon-bianji"></i>
                            <i @click="noticeOperation(2, item.noticeId)" class="iconfont icon-lajitong"></i>
                        </div>
                    </div>
                    <div class="title-row2">
                        <div class="time">{{formatTime(item.createTime)}}</div>
                    </div>
                </div>
                <div class="notice-item-content">
                    <div v-show="false">
                        {{noticeDetails(item.noticeId, item)}}
                    </div>
                    <div style="width: 706px;">
                        {{item.noticeContent}}
                    </div>
                </div>
                <div class="notice-item-footer">
                    发件人：<span>{{item.createUserName}}</span>
                </div>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
import selectDrop from './components/dropDownMenu'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import {seekNoticeList, seekNoticeDetails, seekGetUserInfo} from 'Api/commonality/seek'
import {operateNoticeOperation} from 'Api/commonality/operate'
export default {
    data () {
        return {
            pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
            beginTime: '',
            endTime: '',
            noticeTypeList: [
                {
                    itemName: '我收到的',
                    value: 2
                },
                {
                    itemName: '我发布的',
                    value: 1
                },
                {
                    itemName: '我的草稿',
                    value: 3
                },
                {
                    itemName: '全部',
                    value: ''
                }
            ],
            sendPosition: [
                {
                    itemName: '全部',
                    value: ''
                },
                {
                    itemName: '全公司',
                    value: 1
                },
                {
                    itemName: '总部',
                    value: 2
                },
                {
                    itemName: '店铺',
                    value: 3
                },
                   
            ],
            sendPosition1: [
                {
                    itemName: '全部',
                    value: ''
                },
                {
                    itemName: '店铺',
                    value: 3
                },
                   
            ],
            noticeRange: '', // 公告范围
            noticeType: '', // 公告类型
            noticeStatus: '', // 公告状态
            page: 1,
            pageSize: '10',
            dataList: [],
            forBeginTime: '',
            forEndTime: '',
            userPositionInfo: ''
        }
    },
    components: {
        selectDrop
    },
    created () {
        this.beginTime = this.getDate(-((new Date()).getDate()-1),'start').format
        this.endTime = this.getDate(0,'end').format
        this.forBeginTime = this.timeFormat(this.beginTime)
        this.forEndTime = this.timeFormat(this.endTime)
        // console.log(this.beginTime)
        // console.log(this.endTime)
        this.getUserInfo()
        this.getNoticeList()
    },
    computed: {
        shopRole: function () { // 店员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
    },
    methods: {
        getUserInfo () {
            seekGetUserInfo({userId: sessionStorage.getItem('id')}).then((res) => {
                this.userPositionInfo = res.data.data
            })
        },
        timeFormat (parm) { // 格式化时间
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + '000000'
        },
        setTime1 (item) {
            let date = new Date()
            let time = new Date(Date.parse(this.formatTime(item.createTime).replace(/-/g, "/")));
            console.log(date)
            console.log(item)
            console.log(this.formatTime(item.createTime))
            console.log(time)
            return 24 - (parseInt(date.getTime()/3600000) - parseInt(time.getTime()/3600000))
        },
        contrastTime (item) { // 对比时间
            let date = new Date()
            let time = new Date(Date.parse(this.formatTime(item.createTime).replace(/-/g, "/")));
            if (parseInt(date.getTime()/3600000) - parseInt(time.getTime()/3600000) >= 24) {
                return false
            } else {
                return true
            }
        },
        noticeOperation (type, id) { // 公告操作
            let options = {
                operateType: type,
                noticeId: id
            }
            operateNoticeOperation(options).then((res) => {
                if (res.data.state == 200) {
                    //console.log(res)
                    if (type == 4) {
                        this.$message({
                            message: '撤销成功',
                            type: 'success'
                        })
                    } else if (type == 2) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    }
                    
                    this.getNoticeList()
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            }, (res) => {
                console.log(res)
            })
        },
        getReObj (id) { // 标签初始化
            switch (id) {
                case '1':
                    return '全公司'
                case '2':
                    return '全店铺'
                case '3':
                    return '总部'
                case '4':
                    return '总部+店铺'
                case '5':
                    return '部分店铺'
            }
        },
        goPage (type, id) { // 切换页面   1 新建， 2 编辑
            if (type == 1) {
                this.$emit('switch', {type: 'add'})
            } else if (type == 2) {
                //console.log(id)
                this.$emit('switch', {type: 'edit', id: id})
            }
        },
        noticeDetails (id, item) { // 公告详情
            let content = ''
            let options = {
                noticeId: id
            }
            seekNoticeDetails(options).then((res) => {
                // content = res.data.data.noticeContent
                // this.$set(item, 'noticeContent', content)
                if (item.createUserId == sessionStorage.getItem('id')) {
                    this.$set(item, 'isMake', 'Y')
                } else {
                    this.$set(item, 'isMake', 'N')
                }
            }, (res) => {
            })
        },
        getNoticeList () { // 公告列表
            let options = {
                page: this.page,
                pageSize: this.pageSize,
                noticeType: this.noticeType,
                noticeStatus: '',
                noticeRange: this.noticeRange,
                beginTime: this.forBeginTime,
                endTime: this.forEndTime
            }
            seekNoticeList(options).then((res) => {
                //console.log(res)
                this.dataList = res.data.data.dataList
            }, (res) => {

            })
        },
        dropReturn (val) {
            //console.log(val)
            if (val.type == '公告类型') {
                this.noticeType = val.item.operateId
            } else if (val.type == '公告位置') {
                this.noticeRange = val.item.operateId
            }
            //console.log(this.noticeType)
            //console.log(this.noticeRange)
            this.getNoticeList()
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
                format : Year + '-' + month + '-' + Day,
                timestamp : timestamp,
                fullData : timestamp + hours + mins + seconds
            }
        },
        formatTime (createDate) {
            let year = createDate.substring(0, 4)
            let month = createDate.substring(4, 6)
            let data = createDate.substring(6, 8)
            let hour = createDate.substring(8, 10)
            let time = createDate.substring(10, 12)
            return year + "-" + month + "-" + data + ' ' + hour + ':' + time
        },
        formatDate( d ){
           return d < 10 ? ('0' + d ) : d + ''
        },
        getTimeData(val) {
            console.log(val)
            this.beginTime = val
            //console.log(this.beginTime)
            this.forBeginTime = this.timeFormat(this.beginTime)
        
            this.getNoticeList()
        },
        overTimeDate(val) {
            console.log(val)
            this.endTime = val
            this.forEndTime = this.timeFormat(this.endTime)
            this.getNoticeList()
        },
    }
}
</script>
<style lang="scss">
.notice-list-menu {
    .report-data {
        .block{
            width: 50%;
            float: left;
            margin-top: 2px;
            position: relative;
            display: inline-block;
            
            .el-input__icon{
                display: none;
            }
            .el-input__inner{
                padding: 0;
                text-align: center;
                color: #2993f8;
                background-color:transparent;
                font-weight: bold;
                letter-spacing: -1px;
            }
            
            &.until:after{
                content: attr(data-txt);
                position: absolute;
                right : 0px;
                top:2px !important;
                font-size: 12px;
                color: #666;
            }
        }
    }
}


</style>
<style lang="scss" scoped>
.notice-list-main {
    position: relative;
    height: 100%;
    .notice-list-title {
        height: 60px;
        padding:0 20px;
        margin-bottom: 8px;
        .titile-left {
            float: left;
            line-height: 60px;
            font-weight: bold;
        }
        .titile-right {
            float: right;
            padding-top: 16px;
            .btn {
                width: 80px;
                height: 28px;
                border-radius: 4px;
                background:#2993f8;
                color:#fff;
                line-height: 28px;
                text-align: center;
                font-size: 12px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
    .notice-list-menu {
        height: 28px;
        padding: 0 60px;
        //margin-bottom: 30px;
        /* 日期控件 */
        .report-data{
            //display: inline-block;
            width: 190px;
            border:1px solid #d6d6d6;
            border-radius: 5px;
            height: 28px;
            vertical-align: middle;
            overflow: hidden;
            background-color: #fff;
            margin-left: 15px;
            float: left;
            >.block{
                width: 50%;
                float: left;
                margin-top: 2px;
                position: relative;
                display: inline-block;
                
                .el-input__icon{
                display: none;
                }
                .el-input__inner{
                    padding: 0;
                    text-align: center;
                    color: #2993f8;
                    background-color:transparent;
                    font-weight: bold;
                    letter-spacing: -1px;
                }
                
                &.until:after{
                    content: attr(data-txt);
                    position: absolute;
                    right : -6px;
                    top:4px;
                    font-size: 12px;
                    color: #666;
                }
            }
            
            .el-date-editor{ width: 100%;}
        }
        .sel-drop {
            margin-left: 16px;
            float: left;
            border:1px solid #d6d6d6;
            border-radius: 5px;
            height: 28px;
        }
    }
    .notice-list-list {
        width: 100%;
        padding: 0 60px;
        position: absolute;
        top: 96px;
        bottom: 20px;
        left: 0;
        overflow-y: auto;
        .notice-item {
            width: 830px;
            padding: 16px 20px;
            background:#f6f7f8;
            border-radius: 10px;
            position: relative;
            margin-top: 30px;
            margin-bottom: 30px;
            .notice-item-title {
                height: 50px;
                .title-row1 {
                    height: 22px;
                    line-height: 22px;
                    margin-bottom: 6px;
                    div {
                        float: left;
                    }
                    .draft {
                        color:#ff5a51;
                        margin-right: 6px;
                    }
                    .title-name {
                        color:#333;
                        font-size: 14px;
                        font-weight: bold;
                        margin-right: 20px;
                    }
                    .label {
                        width: 55px;
                        height: 22px;
                        line-height: 22px;
                        text-align: center;
                        color:#2993f8;
                        font-size: 12px;
                        background:#e1edf8;
                        border-radius:4px;
                    }
                    .btn-right {
                        font-size: 14px;
                        color:#2993f8;
                        float: right;
                        span {
                            display: inline-block;
                            width: 55px;
                            height: 22px;
                            font-size: 12px;
                            background:#91a6c4;
                            color:#fff;
                            text-align: center;
                            line-height: 22px;
                            border-radius: 4px;
                            cursor: pointer;
                            
                        }
                        span:hover {
                            background:#718299;
                        }
                        i {
                            cursor: pointer;
                            margin-left:20px;
                        }
                    }
                }
                .title-row2 {
                    .time {
                        color:#cbcbcb;
                        font-size: 12px;
                    }
                }
            }
            .notice-item-content {
                padding: 42px 42px;
                font-size: 14px;
                text-indent: 28px;
                margin-bottom: 40px;
                white-space: normal;
            }
            .notice-item-footer {
                height: 40px;
                position: absolute;
                bottom: 0;
                left: 0;
                color:#999999;
                font-size: 14px;
                padding: 0 20px;
                line-height:35px;
                span {
                    font-size: 14px;
                    color:#666666;
                    font-weight: bold;
                }
            }
            .line {
                width: 100%;
                height: 1px;
                background:#f0f0f0;
                position: absolute;
                bottom: -30px;
                left: 0;
            }
        }
    }
}
</style>

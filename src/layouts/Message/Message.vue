<template>
    <div class="mes-main">
        <div class="mes-title">
            消息中心
        </div>
        <div class="mes-content">
            <ul class="left-list">
                <li @click="choseType(item, index)" :class="{active: index == activeIndex}" v-for="(item, index) in menuList" :key="item.id">{{item.name}}</li>
            </ul>
            <div class="right-list">
                <div class="list-title"><i class="iconfont icon-liebiao"></i>{{listType}}</div>
                <ul class="system-list" v-show="messageType == '00' || messageType == '07'">
                    <li v-for="(item, index) in systemMessageDataList" :key="index">
                        <div class="item-left"><img src="./../../../static/img/message/systemmes.png"></div>
                        <div class="item-right">
                            <div class="title">
                                <div class="type">系统消息</div>
                                <div class="time">{{formatTime(item.createTime)}}</div>
                                <!-- <i class="iconfont icon-shanchu1" @click="delItem(item)"></i> -->
                            </div>
                            <div class="content">
                                <h5>{{item.title}}</h5>
                                <p>{{item.content}}</p>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
                <ul class="message-list">
                    
                    <li v-for="(item, index) in messageDataList" :key="index" v-if="switchMenu(item.messageType)">
                        <div class="item-left"><img :src="getImg(item.messageType)"></div>
                        <div class="item-right">
                            <div class="title">
                                <div class="type">{{getType(item.messageType)}}</div>
                                <div class="label" v-if="item.messageType == '01'">{{getOrderType(item.orderType)}}</div>
                                <div class="time">{{formatTime(item.createDate)}}</div>
                                <i class="iconfont icon-shanchu1" @click="delItem(item)"></i>
                            </div>
                            <div class="content">
                                <p  ref="cont_view" class="content-view" v-html="richTextMatch(item)"></p>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>  
</template>

<script>
import Vue from 'vue'
import {seekMessageList, seekSystemMessageList} from 'Api/commonality/seek'
import {operateDelMessage} from 'Api/commonality/operate'
export default {
    data () {
        return {
            menuList: [
                {
                    id: '1',
                    name: '全部消息'
                },
                {
                    id: '2',
                    name: '系统消息'
                },
                {
                    id: '3',
                    name: '公司消息'
                },
                {
                    id: '4',
                    name: '单据消息'
                },
                {
                    id: '5',
                    name: '店铺消息'
                },
                {
                    id: '6',
                    name: '权限消息'
                },
                {
                    id: '7',
                    name: '任务消息'
                },
            ],
            activeIndex: 0,
            page: 1,
            pageSize: 999,
            messageDataList: [],
            systemMessageDataList: [],
            messageType: '00',
            listType: '全部消息'
        }
    },
    created () {
        this.systemMessageList()
        this.messageList()
    },
    mounted () {
        let _self = this
        $(".right-list").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
            mouseWheel: {
                scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: false,
            },
            callbacks: {
                whileScrolling: function () {
                },
                onTotalScroll: function(){
                    //console.log(11111111)
                    _self.pageSize += 15
                    _self.systemMessageList()
                    _self.messageList()
                }
            }
        });
    },
    methods: {
        delItem (item) {
            console.log(item)
            this.$confirm('确定要删除此消息吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(() => {
                let options = {
                    messageId: item.messageId,
                    updateType: 1
                }
                operateDelMessage(options).then((res) => {
                    if (res.data.state == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        }); 
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        }); 
                    }
                }, (res) => {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    }); 
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        },
        getImg (type) { // 匹配图片
            switch (type) {
                case '01':
                    return './../../../static/img/message/bill.png'
                case '02':
                    return './../../../static/img/message/root.png'
                case '03':
                    return './../../../static/img/message/role.png'
                case '04':
                    return './../../../static/img/message/shop.png'
                case '05':
                    return './../../../static/img/message/company.png'
                case '06':
                    return './../../../static/img/message/task.png'
            }
        },
        switchMenu (type) { // 切换菜单
            //console.log(type)
            if (this.messageType == '02' && type == '02' || type == '03') {
                return true
            }
            if (this.messageType == '00' || type == this.messageType) {
                return true
            } else {
                return false
            }
        },
        richTextMatch (item) {
            // console.log(this.messageDataList)
            // console.log(item)
            if (item.messageType == '01') { // 单据消息
                let str = ''
                let head = ''
                head = item.orderId.substring(0, 2)
                if (head == 'RK') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/storage/detail?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                } else if (head == 'XG') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/amend/newAmend?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                } else if (head == 'TK') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/storageReturn/NewStorageReturn?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                } else if (head == 'DK') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/transferStorage/newTransferStorage?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                } else if (head == 'FH') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/sipping/newSipping?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                } else if (head == 'DG') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/transferCabinet/newTransferCabinet?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                } else if (head == 'TH') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/salesReturn/newSalesReturn?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                } else if (head == 'XS') {
                    str = item.content.replace(item.orderId,'<a style="color:#2993f8" href="/#/work/sell/sellReceiptsList?orderNumber='+item.orderId+'">' + item.orderId + '</a>')
                }
                if (item.consigneeName) {
                    str = str.replace(item.consigneeName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.consigneeName + '</a>')
                }
                //console.log(str)
                return str
            } else if (item.messageType == '02') { // 权限变更
                let str = ''
                if (item.companyName) {
                     str = item.content.replace(item.companyName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.companyName + '</a>')
                }
                if (item.shopName) {
                    str = str.replace(item.shopName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.shopName + '</a>')
                }
                if (!item.shopName && !item.companyName) {
                    str = item.content
                }
                return str
            } else if (item.messageType == '03') { // 角色变更
                let str = ''
                if (item.companyName) {
                     str = item.content.replace(item.companyName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.companyName + '</a>')
                }
                if (item.shopName) {
                    str = str.replace(item.shopName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.shopName + '</a>')
                }
                return str
            } else if (item.messageType == '04') { // 店铺消息
                let str = ''
                if (item.shopName) {
                    str = item.content.replace(item.shopName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.shopName + '</a>')
                }
                if (item.operatedName) {
                    str = str.replace(item.operatedName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.operatedName + '</a>')
                }
                if (!item.operatedName && !item.shopName) {
                    str = item.content
                }
                // console.log(str)
                return str
            } else if (item.messageType == '05') { // 公司消息
                let str = ''
                if (item.companyName) {
                     str = item.content.replace(item.companyName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.companyName + '</a>')
                }
                if (item.operatedName) {
                    str = str.replace(item.operatedName,'<a style="color:#2993f8" href="/#/organizationChart">' + item.operatedName + '</a>')
                }
                if (!item.operatedName && !item.companyName) {
                    str = item.content
                }
                return str
            } else if (item.messageType == '06') { // 任务消息
                let str = ''
                if (item.taskName) {
                    str = item.content.replace(item.taskName,'<a style="color:#2993f8" href="#">' + item.taskName + '</a>')
                }
                return str
            }
        },
        getOrderType (type) { // 获取单据类型
            switch (type) {
                case '01':
                    return '入库'
                case '02':
                    return '退库'
                case '03':
                    return '发货'
                case '04':
                    return '退货'
                case '05':
                    return '销售'
                case '06':
                    return '调柜'
                case '07':
                    return '调库'
                case '10':
                    return '修改'
            }
        },
        getType (type) { // 获取权限类型
            switch (type) {
                case '01':
                    return '单据消息'
                case '02':
                    return '权限消息'
                case '03':
                    return '角色变更'
                case '04':
                    return '店铺消息'
                case '05':
                    return '公司消息'
                case '06':
                    return '任务消息'
            }
        },
        choseType (item, index) { // 切换菜单
            this.activeIndex = index
            if (index == 0) {
                this.messageType = '00'
                this.listType = '全部消息'
            } else if (index == 1) {
                this.messageType = '07' // 系统消息
                this.listType = '系统消息'
            } else if (index == 2) {
                this.messageType = '05' // 公司消息
                this.listType = '公司消息'
            } else if (index == 3) {
                this.messageType = '01' // 单据消息
                this.listType = '单据消息'
            } else if (index == 4) {
                this.messageType = '04' // 店铺消息
                this.listType = '店铺消息'
            } else if (index == 5) {
                this.messageType = '02' // 权限消息
                this.listType = '权限消息'
            } else if (index == 6) {
                this.messageType = '06' // 任务消息
                this.listType = '任务消息'
            }
            // console.log(this.messageType)
        },
        formatTime (createDate) {
            // console.log(createDate)
            if (createDate != undefined) {
                let year = createDate.substring(0, 4)
                let month = createDate.substring(4, 6)
                let data = createDate.substring(6, 8)
                let hour = createDate.substring(8, 10)
                let time = createDate.substring(10, 12)
                return year + "-" + month + "-" + data + " " + hour + ":" + time
            }
            
        },
        systemMessageList () { // 系统消息列表
            let options = {
                page: this.page,
                pageSize: this.pageSize
            }
            seekSystemMessageList(options).then((res) => {
                //console.log(res)
                if (res.data.state == 200) {
                    this.systemMessageDataList = res.data.data.dataList
                }
            }, (res) => {

            })
        },
        messageList () { // 消息列表
            let options = {
                page: this.page,
                pageSize: this.pageSize
            }
            seekMessageList(options).then((res) => {
                //console.log(res)
                if (res.data.state == 200) {
                    this.messageDataList = res.data.data.dataList
                }
            }, () => {

            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mes-main {
    width: 950px;
    border-radius: 10px;
    background:#fff;
    position: absolute;
    top: 70px;
    bottom: 70px;
    left: 50%;
    margin-left: -475px;
    .mes-title {
        height: 60px;
        width: 100%;
        line-height: 60px;
        font-weight: bold;
        padding: 0 20px;
    }
    .mes-content {
        position: absolute;
        top: 68px;
        bottom: 0;
        width: 100%;
        left: 0;
        .left-list {
            width: 158px;
            height: 100%;
            float: left;
            border-right: 1px solid #f1f2f3;
            &>li {
                width: 100%;
                height: 55px;
                line-height: 55px;
                font-size: 14px;
                color:#999999;
                font-weight: bold;
                text-align: center;
                cursor: pointer;
                position: relative;
                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background:#2993f8;
                    opacity: 0;
                }
            }
            &>li:hover {
                background:#f6f7f8;
            }
            &>li.active {
                &:before {
                    opacity: 1;
                }
            }
        }
        .right-list {
            width: 791px;
            float: left;
            height: 100%;
            overflow-y: auto;
            .list-title {
                height: 20px;
                padding-left: 36px;
                color:#999999;
                i {
                    margin-right:10px;
                }
            }
            .system-list {
                padding-left: 36px;
                li {
                    width: 740px;
                    margin: 30px 0;
                    .item-left {
                        height: 100%;
                        width: 44px;
                        float: left;
                        img {
                            width: 44px;
                            height: 44px;
                            border-radius: 50%;
                        }
                    }
                    .item-right {
                        float: left;
                        width: 696px;
                        padding-left: 24px;
                        //display: inline-block;
                        .title {
                            margin-bottom: 10px;
                            height: 20px;
                            &>div {
                                float: left;
                                line-height: 20px;
                            }
                            .type {
                                color:#d6d6d6;
                                font-size: 14px;
                                margin-right: 30px;
                            }
                            .label {
                                width: 44px;
                                height: 18px;
                                text-align: center;
                                line-height: 18px;
                                font-size: 12px;
                                color:#2993f8;
                                background:#e1edf8;
                                border-radius: 2px;
                                margin-right: 30px;
                            }
                            .time {
                                color:#999999;
                                font-size: 12px;
                            }
                        }
                        .content {
                            text-align: left;
                            font-size: 14px;
                            color:#333333;
                            h5 {
                                font-weight: normal;
                                font-size: 14px;
                                margin-bottom:14px;
                            }
                            &>p {
                                text-indent: 28px;
                                padding: 20px 18px;
                                background:#f4f9ff;
                            }
                        }
                    }
                    .clear {
                        clear: both;
                    }
                }
            }
            .message-list {
                padding-left: 36px;
                li {
                    width: 740px;
                    margin: 30px 0;
                    .item-left {
                        height: 100%;
                        width: 44px;
                        float: left;
                        img {
                            width: 44px;
                            height: 44px;
                            border-radius: 50%;
                        }
                    }
                    .item-right {
                        float: left;
                        width: 696px;
                        padding-left: 24px;
                        //display: inline-block;
                        .title {
                            margin-bottom: 10px;
                            height: 20px;
                            &>div {
                                float: left;
                                line-height: 20px;
                            }
                            .type {
                                color:#d6d6d6;
                                font-size: 14px;
                                margin-right: 30px;
                            }
                            .label {
                                width: 44px;
                                height: 18px;
                                text-align: center;
                                line-height: 18px;
                                font-size: 12px;
                                color:#2993f8;
                                background:#e1edf8;
                                border-radius: 2px;
                                margin-right: 30px;
                            }
                            .time {
                                color:#999999;
                                font-size: 12px;
                            }
                            .iconfont {
                                float: right;
                                font-size: 14px;
                                color:#2993f8;
                                display: none;
                            }
                        }
                        .content {
                            text-align: left;
                            font-size: 14px;
                            color:#333333;
                            &>p {
                                .operate {
                                    color:#2993f8;
                                    cursor: pointer;
                                }
                                em {
                                    text-decoration: none;
                                    font-style: normal;
                                    color:#2993f8;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .clear {
                        clear: both;
                    }
                }
                li:hover {
                    .item-right {
                        .title {
                            .iconfont {
                                display: block;
                                cursor: pointer;
                            }
                        }
                    } 
                }
            }
        }
    }
}
</style>

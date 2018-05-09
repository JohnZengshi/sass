<template>
    <div>
        <div class="wrap">
            <div class="title">跟进</div>
            <div class="block-1">
                <div class="img-block"><img :src="followData.memberLogo"></div>
                <div class="name">{{followData.nickname}}</div>
                <div class="phone">
                    <span>
                        {{followData.phone}}
                    </span>
                </div>
            </div>
            <div class="block-2">
                <div class="info-block1 info-block">
                    <div class="title">
                        负责人<i v-if="shopManRole || shopManageRole" @click="showLea" class="iconfont icon-sanjiao"></i>
                    </div>
                    <div class="info">
                        <div class="main">{{prinList}}</div>
                        <span v-if="followData.principalList.length > 1">等<em>{{followData.principalList.length}}</em>人</span>
                    </div>
                </div>
                <div class="info-block2 info-block">
                    <div class="title">
                        跟进目的<i v-if="shopManRole || shopManageRole" @click="showAimList" class="iconfont icon-sanjiao"></i>
                        <ul class="drop-list" :class="{active: isShowAim}">
                            <li @click="changeAim(item, 1)" :key="index" v-for="(item, index) in aimDropListData">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="info">
                        {{getVist(followData)}}
                    </div>
                </div>
                <div class="info-block3 info-block">
                    <div class="title">
                        计划日期<i v-if="shopManRole || shopManageRole" @click="showTime()" class="iconfont icon-sanjiao"></i>
                        <ul class="drop-list1" :class="{active: isShowData}">
                            <div class="date-block">
                                <el-date-picker
                                    format
                                    v-model="visitTime"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="dateChange"
                                    :picker-options="pickerOptions0"
                                >
                                </el-date-picker>
                            </div>
                        </ul>
                    </div>
                    <div class="info">
                        {{timeFormat(followData.followTime)}}
                    </div>
                </div>
                <div class="info-block4 info-block">
                    <div class="title">
                        跟进状态<i v-if="shopManRole && followData.status != 2 || shopManageRole && followData.status != 2" @click="showStatus" class="iconfont icon-sanjiao"></i>
                        <ul class="drop-list" :class="{active: isShowStatus}">
                            <li @click="changeAim(item, 3)" :key="index" v-for="(item, index) in statusList">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="info">
                        {{getStatus(followData)}}
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="btn-wrap" v-if="shopManRole || shopManageRole">
                    <div v-if="shopRole" class="btn" @click="isCopmeFllow = true">完成</div>
                    <div class="btn1" @click="followOperation(1)">删除</div>
                </div>
            </div>
        </div>
        <div>
            <el-dialog :modal="false" :visible.sync="isCopmeFllow" top="0%" customClass="compeReDig" :close-on-click-modal="false">
                <ComplateFollow
                    :isCopmeFllow="isCopmeFllow"
                    :followData="followData"
                    :followId="followId"
                    @complate="complate"
                ></ComplateFollow>
            </el-dialog>
            <!-- 选择负责人 -->
            <el-dialog :modal="false" :visible.sync="isChoseLeader" top="-12%" customClass="choseLeaderDig" :close-on-click-modal="false">
                <ChoseLeader
                    :shopId="shopId"
                    :followData="followData"
                    :isChoseLeader="isChoseLeader"
                    @closeChoMember="closeChoLeader"
                ></ChoseLeader>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import {seekGetFollowInfo} from 'Api/commonality/seek'
import {operateFollowOperation, operateFollowUpdateBy} from 'Api/commonality/operate'
import ComplateFollow from './complateFollow'
import ChoseLeader from './choseLeader'
export default {
    components: {
        ComplateFollow,
        ChoseLeader
    },
    props: [
        'shopId',
        'followId',
        'isFllow',
        'followData',
        'prinList'
    ],
    data () {
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },  
            isCopmeFllow: false,
            isChoseLeader: false,
            isShowAim: false,
            isShowStatus: false,
            isShowData: false,
            visitTime: '',
            startTime: '',
            userList: [],
            visitAim: '',
            visitStatus: '',
            aimDropListData: [
                {
                    name: '日常拜访',
                    value: 1
                },
                {
                    name: '促销执行',
                    value: 2
                },
                {
                    name: '临时拜访',
                    value: 3
                },
                {
                    name: '其他目的',
                    value: 4
                },
                {
                    name: '售后跟进',
                    value: 5
                },
                {
                    name: '生日跟进',
                    value: 6
                },
            ],
            statusList: [
                {
                    name: '未完成',
                    value: 1
                },
                {
                    name: '已暂停',
                    value: 4
                }
            ]
        }
    },
    created () {
    },
    watch: {
        isFllow (val) {
            // console.log(this.followData)
            // console.log(this.isFllow)
            // if (val == true) {
                this.visitAim = this.followData.visitAim
                this.visitStatus = this.followData.status
                this.startTime = this.formatTime(this.followData.followTime)
            // }
        }
    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
            "productClass", // 产品类别
            "supplierListData", // 供应商
            "userPositionInfo" // 职位信息
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
    mounted () {
        this.visitAim = this.followData.visitAim
        this.visitStatus = this.followData.status
        this.startTime = this.formatTime(this.followData.followTime)
        console.log(this.followData.followTime)
        console.log(this.startTime)
    },
    methods: {
        showLea () {
            if (this.shopManageRole) {
                this.isChoseLeader = true
            } else {

            }
        },
        showAimList () {
            this.isShowAim = !this.isShowAim
        },
        showStatus () {
            console.log(this.followData)
            if (this.followData == 3) {

            } else {
                this.isShowStatus = !this.isShowStatus
            } 
        },
        showTime () {
            this.isShowData = !this.isShowData
        },
        dateChange (val) {
            console.log(val)
            let year = val.substring(0, 4)
            let month = val.substring(5, 7)
            let data = val.substring(8, 10)
            this.startTime = year + month + data + '000000'
            // console.log(this.startTime)
            this.isShowData = false
            this.followUpdateBy()
        },
        changeAim (item, type) {
            console.log(this.followData)
            if (type == 1) {
                this.visitAim = item.value
                this.isShowAim = false
            } else if (type == 2) {
            } else if (type == 3) {
                this.visitStatus = item.value
                this.isShowStatus = false
            }
            this.followUpdateBy()
            
        },
        followUpdateBy () { // 修改跟进
            let options = {
                followId: this.followId,
                memberList: [
                    {
                        memberId: this.followData.memberId
                    }
                ],
                visitAim: this.visitAim,
                followTime: this.startTime,
                visitStatus: this.visitStatus
            }
            operateFollowUpdateBy(options).then((res) => {
                if (res.data.state == 200) {
                    this.$emit('updataFollow')
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
        closeChoLeader (val) { // 关闭负责人弹窗的回调
            console.log(val)
            val.list.forEach((item, index) => {
                this.userList.push({
                    updateData: item
                })
            })

            if (this.userList.length == 0) {
                this.$confirm('此操作将导致删除此跟进，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.followOperation(1)
                    this.isChoseLeader = false
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });

            } else {
                this.followOperation(2)
                this.isChoseLeader = false
            }
        },
        followOperation (type) {
            let options = {
                shopId: this.shopId,
                followId: this.followId,
                operateType: type,
                updateDataList: this.userList
            }
            if (type == 1) {
                this.$confirm('此操作将删除该跟进 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    operateFollowOperation(options).then((res) => {
                        console.log(res)
                        if (res.data.state == 200) {
                            setTimeout(() => {
                                this.$emit('updataFollow')
                            }, 1000)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
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
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            } else {
                operateFollowOperation(options).then((res) => {
                    console.log(res)
                    if (res.data.state == 200) {
                        this.$emit('updataFollow')
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
            } 
        },
        // getFollowInfo() {
        //     let options = {
        //         shopId: this.shopId,
        //         followId: this.followId
        //     }
        //     seekGetFollowInfo(options).then((res) => {
        //         console.log(res)
        //         if (res.data.state == 200) {
        //             this.followData = res.data.data
        //         }
        //     }, (res) => {
        //         console.log(res)
        //     })
        // },
        complate (val) {
            this.isCopmeFllow = false
            this.$emit("closeFollow", "")
        },
        close () {
            console.log(111)
            this.$emit("closeFollow", "")
        },
        formatTime (parm) { // 格式化时间
            //console.log(this.followData)
            //console.log(time1)
            //console.log(this.receiptsIntroList)
            let year = parm.substring(0, 4)
            let month = parm.substring(4, 6)
            let data = parm.substring(6, 8)
            // console.log(data)
            return year + month + data + '000000'
        },
        timeFormat (parm) {
            if (parm == undefined) {
                return ''
            } else {
                let year = parm.substring(0, 4)
                let month = parm.substring(4, 6)
                let data = parm.substring(6, 8)
                let hour = parm.substring(8, 10)
                let time = parm.substring(10, 12)
                return year + "-" + month + "-" + data + " " + hour + ":" + time
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
        }
    }
}
</script>

<style lang="scss">
.el-dialog__wrapper {
    overflow: visible;
}

.followReDig {
    width: 700px;
    height: 540px !important;
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
    .wrap {
        .title {
            padding-top: 20px;
            font-size: 14px;
            color:#333;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .block-1 {
            width: 640px;
            height: 170px;
            border-radius: 10px;
            background:url('./../../../../static/img/member/follow/background.png') no-repeat center center;
            margin-bottom: 20px;
            padding-top: 25px;
            &> div {
                margin: 0 auto;
            }
            .img-block {
                width: 72px;
                height: 72px;
                margin-bottom: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .name {
                font-size: 14px;
                color:#333;
                font-weight: bold;
                width: 100px;
                text-align: center;
                margin-bottom: 10px;
                height: 14px;
            }
            .phone {
                width: 150px;
                color:#666666;
                font-size: 12px;
                text-align: center;
                height: 14px;
                span {
                    padding-left: 20px;
                    background:url("./../../../../static/img/member/new/phone.png") no-repeat left center;
                }
                img {

                    display: inline-block;;
                }
            }
        }
        .block-2 {
            height: 110px;
            margin-bottom: 120px;
            .info-block {
                width: 152px;
                height: 100%;
                background:#eef7fe;
                border-radius: 6px;
                float: left;
                margin-right: 11px;
                padding: 0 14px;
                .title {
                    font-size: 14px;
                    color:#666666;
                    height: 48px;
                    position: relative;
                    &>i {
                        float: right;
                        color:#929aaf;
                        cursor: pointer;
                    }
                    .drop-list {
                        position: absolute;
                        top: 70px;
                        left: 0;
                        z-index: -10;
                        width: 150px;
                        height: 200px;
                        overflow-y: auto;
                        background:#fff;
                        border-radius: 4px;
                        box-shadow: 0 0 3px 3px rgba(0,0,0,0.1);
                        text-align: center;
                        line-height: 36px;
                        transition: all .3s ease;
                        opacity: 0;
                        li {
                            cursor: pointer;
                            &:hover {
                                background:#f1f2f3;
                            }
                        }
                    }
                    .drop-list1 {
                        width: 200px;
                        height: 50px;
                        top: 70px;
                        left: 0;
                        overflow-y: auto;
                        background:#fff;
                        z-index: -10;
                        border-radius: 4px;
                        box-shadow: 0 0 3px 3px rgba(0,0,0,0.1);
                        text-align: center;
                        line-height: 36px;
                        transition: all .3s ease;
                        opacity: 0;
                    }
                    .active {
                        top: 45px;
                        opacity: 1;
                        z-index: 1;
                    }
                }
                .info {
                    height: 20px;
                    text-align: center;
                }
            }
            .info-block1 {
                .info {
                    height: 20px;
                    text-align: left;
                    .main {
                        width: 90px;
                        float: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    span {
                        font-size: 12px;
                        color:#999999;
                    }
                }
            }
            .info-block:last-child {
                margin-right: 0;
            }
        }
        .footer {
            height: 28px;
            .btn-wrap {
                height: 100%;
                width: 200px;
                margin: 0 auto;
                // padding-left: 56px;
                .btn {
                    float: left;
                    width: 88px;
                    height: 26px;
                    text-align: center;
                    line-height: 26px;
                    border: 1px solid #2993f8;
                    color:#fff;
                    font-weight: bold;
                    border-radius: 4px;
                    background: #2993f8;
                    font-size: 12px;
                    cursor: pointer;
                    margin-right: 24px;
                }
                .btn1 {
                    float: left;
                    width: 88px;
                    height: 26px;
                    text-align: center;
                    line-height: 26px;
                    border: 1px solid #2993f8;
                    color:#2993f8;
                    background:#fff;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .btn1:hover {
                    color:#ff5a51;
                    border: 1px solid #ff5a51;
                }
                // .btn:nth-child(1) {
                //     margin-right: 20px;
                //     border: 1px solid #d6d6d6;
                //     background:#fff;
                //     color:#2993f8;
                // }
            }
        }
    }
}
</style>

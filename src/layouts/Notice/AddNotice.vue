<template>
    <div class="add-wrap">
        <div class="add-title">
            <div class="title-left">
                新建公告
            </div>
            <div class="title-right">
                <span @click="goPage(-1)">取消</span>
            </div>
        </div>
        <div class="add-main">
            <div class="title notice-Ope-block">
                <div class="label-name">公告标题</div>
                <input maxlength="12" v-model="noticeTitle" type="text" class="operate" placeholder="输入公告标题...(1-12字符)">
            </div>
            <div class="range notice-Ope-block">
                <div class="label-name">公告范围</div>
                <div class="selDrop">
                    <span class="drop-title">{{selName}}</span>
                    <i class="iconfont icon-arrow-down"></i>
                    <ul class="main-list">
                        <el-checkbox-group v-model="checkList" @change="checkListChange">
                            <li v-if="companyRole">全公司<el-checkbox label="1"></el-checkbox></li>
                            <li v-if="companyRole">总部 <el-checkbox label="3"></el-checkbox></li>
                            <li class="shop-list">店铺 <el-checkbox label="2"></el-checkbox>
                                <el-checkbox-group v-model="childList" @change="childListChange">
                                    <ul class="de-list">
                                        <li v-for="(item, index) in shopListByCo" :key="index">{{item.shopName}}<el-checkbox :label="item"></el-checkbox></li>
                                    </ul>
                                </el-checkbox-group>
                            </li>
                        </el-checkbox-group>
                    </ul>
                </div>
            </div>
            <div class="content notice-Ope-block">
                <div class="label-name">公告内容</div>
                <textarea maxlength="140" v-model="noticeContent" placeholder="输入公告内容..."></textarea>
                <span class="limit">{{noticeContent.length}}/140</span>
                <div class="btn">
                    <div class="save" @click="noticeCreate(2)">保存</div>
                    <div class="publish" @click="noticeCreate(1)">发布</div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {operateNoticeCreate} from 'Api/commonality/operate'
import * as jurisdictions from 'Api/commonality/jurisdiction'
export default {
    data () {
        return {
            shopCkeckList: [], // 店铺验证列表
            checkList: [], // 总列表
            childList: [], // 店铺列表
            receiveObject: '0', // 提交类型   1 全公司, 2 全店铺, 3 总部, 4 总部+店铺, 5 部分店铺
            selName: '',
            noticeContent: '',
            noticeTitle: ''
        }
    },
    watch: {
        checkList (val) { // 1 全公司 2 店铺  3 总部
            
        },
        childList (val) {
            console.log(val)
            // if (val.length < this.shopListByCo.length) {
                
            //     if (this.checkList = ['3']) {
            //         this.childList = this.shopListByCo
            //         this.shopCkeckList = this.childList
            //         this.receiveObject = 5
            //     } else if (this.checkList = ['2', '3']) {
            //         this.childList = this.shopListByCo
            //         this.shopCkeckList = this.childList
            //         this.receiveObject = 4
            //     }
            // }
        },
        receiveObject (val) {
            if (val == '') {
                this.selName = ''
            } else if (val == 1) {
                this.selName = '全公司'
            } else if (val == 2) {
                this.selName = '全店铺'
            } else if (val == 3) {
                this.selName = '总部'
            } else if (val == 4) {
                this.selName = '总部+店铺'
            } else if (val == 5) {
                this.selName = '部分店铺'
            }
        }
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "userPositionInfo" // 职位信息
        ]),
        shopRole: function () { // 店员
			console.log('123987',this.userPositionInfo.roleList)
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
		},
		companyRole: function () { // 公司
			console.log('123987',this.userPositionInfo.roleList)
			// console.log('123987',jurisdictions.jurisdictionComputedManageRole(this.userPositionInfo.roleList))
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList);
            }
        },
    },
    created () {
        this.getShopListByCo();
    },
    mounted () {
        console.log(this.companyRole)
        setTimeout(() => {
            if (this.shopListByCo && this.shopListByCo > 0) {
                if (this.shopListByCo.length == 1 && this.shopRole) {
                    this.childList = this.shopListByCo[0]
                }
            }
        },1000)
    },
    methods: {
        ...mapActions([
            "getShopListByCo", // 店铺列表
            "workSupplierList", // 供应商
            "workRepositoryList" // 库位列表
        ]),
        noticeCreate (type) {  // 创建单据
            if (this.noticeTitle == '') {
                this.$message({
                    message: '请输入公告标题',
                    type: 'warning'
                })
            } else if (this.noticeContent == '') {
                this.$message({
                    message: '请输入公告内容',
                    type: 'warning'
                })
            } else if (this.receiveObject == '0') {
                this.$message({
                    message: '请选择公告范围',
                    type: 'warning'
                })
            } else {
                let options = {
                    title: this.noticeTitle,
                    noticeType: type,
                    noticeContent: this.noticeContent,
                    receiveObject: this.receiveObject,
                    shopList: this.shopCkeckList
                }
                operateNoticeCreate(options).then((res) => {
                    console.log(res)
                    if (res.data.state == 200) {
                        if (type == 1) {
                            this.$message({
                                message: '发布公告成功',
                                type: 'success'
                            })
                        } else if (type == 2) {
                            this.$message({
                                message: '保存公告成功',
                                type: 'success'
                            })
                        }
                        
                        this.goPage(-1)
                    }
                }, (res) => {

                })
            }
            
        },
        childListChange (val) { // 店铺选择事件
            if (val.length == 0) {
                if (this.checkList.includes('3')) {
                    this.receiveObject = 4
                } else {

                }     
            } else {
                if (val.length != this.shopListByCo.length) {
                    if (this.checkList.includes('3')) {
                        this.checkList = ['3']
                        this.receiveObject = 4
                        this.shopCkeckList = val
                    } else {
                        this.checkList = []
                        this.receiveObject = 5
                        this.shopCkeckList = val
                    } 
                } else {
                    if (this.checkList.includes('3')) {
                        this.checkList = ['3', '2']
                        this.receiveObject = 4
                        this.shopCkeckList = val
                    } else {
                        this.checkList = ['2']
                        this.receiveObject = 2
                        this.shopCkeckList = val
                    }
                }
            }
            this.shopCkeckList.forEach((item, index) => {
                Object.assign(item, {
                    shopId: item.shopId,
                    shopName: item.shopName,
                })
            })
        },
        checkListChange (val) { // 总选择事件
            console.log(val)
            if (val.includes('1')) {
                if (!val.includes('2') && !val.includes('3')) {
                    this.checkList = ['1', '2', '3']
                    this.childList = this.shopListByCo
                    this.shopCkeckList = this.shopListByCo
                    this.receiveObject = 1
                } else if (!val.includes('2')) {
                    this.checkList = ['3']
                    this.childList = []
                    this.shopCkeckList = []
                    this.receiveObject = 3
                } else if (!val.includes('3')) {
                    this.checkList = ['2']
                    this.childList = this.shopListByCo
                    this.shopCkeckList = this.shopListByCo
                    this.receiveObject = 2
                }
            } else {
                if (!val.includes('2') && !val.includes('3')) {
                    this.childList = []
                    this.shopCkeckList = []
                    this.receiveObject = ''
                    this.$message({
                        message: '请选择公告范围',
                        type: 'warning'
                    })
                } else if (!val.includes('2')) {
                    this.checkList = ['3']
                    this.childList = []
                    this.shopCkeckList = []
                    this.receiveObject = 3
                } else if (!val.includes('3')) {
                    this.checkList = ['2']
                    this.receiveObject = 2
                    this.childList = this.shopListByCo
                    this.shopCkeckList = this.shopListByCo
                }
                //  else if (val.includes('2') && val.includes('3')) {
                //     this.checkList = ['1', '2', '3']
                //     this.childList = this.shopListByCo
                //     this.shopCkeckList = this.shopListByCo
                //     this.receiveObject = 1
                // }
            }
            this.shopCkeckList.forEach((item, index) => {
                Object.assign(item, {
                    shopId: item.shopId,
                    shopName: item.shopName,
                })
            })
        },
        goPage (type) {  // -1 返回
            this.$emit("switch", {type: 'list'})
        }
    }
}
</script>
<style lang="scss">
.main-list {
    .el-checkbox-group {
        &>li {
            .el-checkbox {
                width: 14px !important;
                height: 100%;
                // float: right;
                position: absolute;
                right: -5px;
                top: 0px;
                margin-right: 20px;
                .el-checkbox__input {
                    .el-checkbox__inner {
                        border-radius: 4px;
                    }
                }
            }   
        }
    } 
}

</style>
<style lang="scss" scoped>
.add-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .add-title {
        height: 60px;
        width: 100%;
        line-height: 60px;
        padding: 0 20px;
        .title-left {
            float: left;
            font-weight: bold;
        }
        .title-right {
            float: right;
            span {
                color:#999999;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
    .add-main {
        width: 828px;
        height: 570px;
        position: absolute;
        top: 70px;
        bottom: 88px;
        left: 50%;
        margin-left: -414px;
        background:#f6f7f8;
        border-radius: 10px;
        border: 1px solid #f3f3f3;
        padding-top: 20px;
        .notice-Ope-block {
            .label-name {
                height: 32px;
                width: 72px;
                line-height: 32px;
                float:left;
                font-size: 14px;
            }
            input:hover {
                border: 1px solid #2993f8;
            }
            textarea:hover {
                border: 1px solid #2993f8;
            }
        }
        .title {
            height: 32px;
            width: 100%;
            padding: 0 20px;
            margin-bottom: 22px;
            .operate {
                width: 700px;
                height: 32px;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                padding-left: 15px;
            }
        }
        .range {
            height: 32px;
            width: 100%;
            padding: 0 20px;
            margin-bottom: 22px;
            .selDrop {
                width: 177px;
                height: 32px;
                float: left;
                position: relative;
                &:after{
                    content:'';
                    border: 6px solid transparent;
                    width: 0;
                    height: 0;
                    position: absolute;
                    top: 38px;
                    right:0px;
                    z-index: 102;
                    transition: all .3s;
                    margin-left: -3px;
                }
                span {
                    width: 177px;
                    height: 32px;
                    border:1px solid #d6d6d6;
                    border-radius: 4px;
                    display: block;
                    background:#fff;
                    line-height: 32px;
                    padding-left: 15px;
                    font-size: 14px;
                }
                .iconfont {
                    position: absolute; 
                    right: 13px;
                    top: 10px;
                    font-size: 14px;
                    color:#959baf;
                }
                &:hover>.main-list {
                    z-index: 10;
                    opacity: 1;
                    bottom: -125px;
                }
                .main-list {
                    width: 170px;
                    height: 123px;
                    background:#fff;
                    border-radius: 4px;
                    position: absolute;
                    bottom: -150px;
                    right: 0;
                    opacity: 0;
                    z-index: -10;
                    transition: all .3s;
                    box-shadow: 0 0 5px 1px rgba(0,0,0,0.1);
                    li {
                        height: 41px;
                        line-height: 41px;
                        border-bottom: 1px solid #f1f2f3;
                        cursor: pointer;
                        position:relative;
                        color:#999999;
                        font-size: 14px;
                        padding-left: 40px;
                        &>input {
                            float: right;
                            width: 14px;
                            height: 14px;
                            margin-top: 13px;
                            background:#fff;
                        }
                        .de-list {
                            opacity: 0;
                            width: 170px;
                            max-height: 200px;
                            min-height: 41px;
                            overflow-y: auto;
                            transition: all .3s;
                            background:#fff;
                            border-radius: 4px;
                            position: absolute;
                            box-shadow: 0 0 5px 1px rgba(0,0,0,0.1);
                            right: -170px;
                            top: 0;
                            z-index: -10;
                            li {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                padding-right: 5px;
                            }
                        }
                    }
                    li:hover {
                        background:#f6f7f8;
                        color:#333333;
                        &:before {
                            position: absolute;
                            content: '';
                            width: 3px;
                            height: 41px;
                            background:#2993f8;
                            left: 0;
                            top: 0;
                        }
                    }
                    .shop-list:hover {
                        .de-list {
                            opacity: 1;
                            z-index: 1;
                            
                        }
                    }
                }
            }
        }
        .content {
            position: absolute;
            width: 100%;
            top: 127px;
            left: 0;
            // bottom: 133px;
            height: 300px;
            padding: 0 20px;
            textarea {
                height: 100%;
                width: 697px;
                border-radius: 5px;
                border: 1px solid #d6d6d6;
                padding-left: 15px;
                line-height: 32px;
            }
            .limit {
                position: absolute;
                bottom:10px;
                right: 50px;
                color:#999;
                font-size: 12px;
            }
        }
        .btn {
            height: 36px;
            width: 280px;
            //margin: 28px auto;
            position: absolute;
            bottom: -70px;
            left: 50%;
            margin-left: -140px;
            .save {
                width: 88px;
                height: 36px;
                background: #ffffff;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                text-align: center;
                line-height: 36px;
                float:left;
                font-size:14px;
                font-weight: bold;
                color:#999999;
                margin-right: 40px;
                cursor: pointer;
            }
            .publish {
                width: 150px;
                height: 36px;
                border-radius: 4px;
                text-align: center;
                line-height: 36px;
                float:left;
                background: #2993f8;
                color:#fff;
                font-size:14px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
}
</style>

<template>
    <div class="chose-wrap">
        <div class="title">选择负责人</div>
        <div class="menu-list">
            <div class="search">
                <input @keyup.enter="getShopUserList()" v-model="userPhone" type="text" placeholder="请输入负责人名/手机号">
                <div class="search-btn">
                    <i @click="getShopUserList()" class="iconfont icon-sousuo"></i>
                </div>
            </div>
        </div>
        <div class="member-list">
            <ul>
                <li v-for="(item, index) in dataList" :key="index">
                    <img :src="item.logo">
                    <div class="name">{{item.userName}}</div>
                    <div class="phone">
                        <img src="~static/img/member/new/phone.png" />
                        {{item.phoneNo}}
                    </div>
                    <div class="check">
                        <el-checkbox-group v-model="checkList" @change="checkChange">
                            <el-checkbox :label="item.userId"></el-checkbox>
                        </el-checkbox-group>
                    </div>

                </li>
            </ul>
        </div>
        <div class="btn-wrap" v-if="isFollowPage">
            <div class="click-btn" @click="closeDia">确定</div>
        </div>
        <div v-else class="chose-btn" @click="closeDia">确定</div>
    </div>
</template>

<script>
import {seekGetShopUserList} from 'Api/commonality/seek'
// import VisitAim from './visitAim'
export default {
    // components: {
    //     VisitAim
    // },
    props: [
        'dataInfo',
        'shopId',
        'isChoseLeader',
        'followData',
        'addModel',
        "isFollowPage",
        'isFollowClear'
    ],
    watch: {
        'isChoseLeader': function () {
            this.getShopUserList()
            if (this.dataInfo) {
                // console.log(this.dataInfo)
                this.checkList = []
                this.dataInfo.principalList.forEach((item, index) => {
                    this.checkList.push(item.userId)
                })
                // console.log(this.checkList)
            } else {
                // console.log(444)
            }
        },
        'followData': function (val) {
            if (val) {
                //console.log("糟糕啦")
                val.principalList.forEach((item, index) => {
                    this.checkList.push(val.principalList[index].principalId)
                })
            }
        },
    },
    data () {
        return {
            userPhone:'',
            dataList: [],
            checkList: [],
            nameList: [],
            pageSize: 99,
            page: 1,
            isVisitAim: false
        }
    },
    created () {
        // console.log(111)
        this.getShopUserList()
        if (this.dataInfo) {
            this.checkList = []
            this.dataInfo.principalList.forEach((item, index) => {
                this.checkList.push(item.userId)
            })
        }
    },
    mounted () {
        $(".member-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });
    },
    methods: {
        closeAim (val) {
            console.log(val)
            this.isVisitAim = false
            this.$emit("closeChoMember", {list: this.checkList, followAim: val})
        },
        returnBack () {
            this.$emit("returnBack")
        },
        closeDia () { // 关闭弹窗
            this.nameList = []
            if (this.addModel) {
                this.dataList.forEach((item, index) => {
                    if (this.checkList.includes(item.userId)) {
                        this.nameList.push(item.userName)
                    }
                })
                this.$emit("closeChoMember", {list: this.checkList, nameList: this.nameList})
            } else if (this.isFollowPage) {
                this.isVisitAim = true
            } else {
                this.$emit("closeChoMember", {list: this.checkList})
            }


        },
        getLevel (level) {
            switch (level) {
                case '1':
                    return "普通"
                case '1':
                    return "中级"
                case '1':
                    return "重要"
            }
        },
        getType (type) {
            switch (type) {
                case 1:
                    return '私有'
                case 2:
                    return '共有'
                case 3:
                    return '公共'
            }
        },
        checkChange (val) { // 多选选中的改变
            console.log(val)
        },
        getShopUserList () {
            let options = {
                page: this.page,
                pageSize: this.pageSize,
                shopId: this.shopId
            }
            if(this.userPhone != "" && this.userPhone != null){
                options.phone=this.userPhone;
            }
            seekGetShopUserList(options).then((res) => {
                console.log('查看返回结果:',res)
                if (res.data.state == 200) {
                    this.dataList = res.data.data.shopUserList
                    if (this.followData) {
                        this.followData.principalList.forEach((item, index) => {
                            this.checkList.push(this.followData.principalList[index].principalId)
                        })
                    }
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
        }
    }
}
</script>

<style lang="scss">
.choseLeaderDig {
    width: 700px;
    height: 730px;
    background:#fff;
    border-radius: 10px;
    .el-dialog__header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 38px;
        padding-top: 20px !important;
        padding-right: 20px !important;
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
    }
    .member-list {
        height: 500px;
        margin-bottom: 60px;
        ul {
            height: 100%;
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
                    width: 100px;
                    margin-right: 20px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: inline-block;
                    // width: 423px;
                    // line-height: 50px;
                    vertical-align: middle;
                }
                .label {
                    float: left;
                    width: 85px;
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
                    .type {
                        margin-right: 15px;
                    }
                    .typeColor1 { background:#0078f2;}
                    .typeColor2 { background:#009dff;}
                    .typeColor3 { background:#96d7ff;}
                    .lvColor1 {background:#ffc62e;}
                    .lvColor2 {background:#ffa200;}
                    .lvColor3 {background:#f27200;}
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
    .btn-wrap {
        width: 260px;
        margin: 0 auto;
        .click-btn {
            float: left;
            width: 90px;
            height: 28px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            line-height: 28px;
            background:#2993f8;
            color:#fff;
           
            cursor: pointer;
        }
        .click-btn:nth-child(1) {
            margin-right: 80px;
        }
    }
}
</style>

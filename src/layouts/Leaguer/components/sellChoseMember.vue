<template>
    <div class="chose-wrap">
        <div class="title">选择会员</div>
        <div class="menu-list"></div>
        <div class="member-list">
            <ul>
                <li v-for="(item, index) in dataList" :key="index" v-if="item.operateType != 2">
                    <img :src="item.logo">
                    <div class="name">{{item.memberName}}</div>
                    <div class="label">
                        <span class="type" :class="{typeColor1: item.type == 1, typeColor2: item.type == 2,typeColor3: item.type == 3}">{{getType(item.type)}}</span>
                        <span class="level" :class="{lvColor1:item.grade == 1, lvColor2:item.grade == 2, lvColor3:item.grade == 3}">{{getLevel(item.grade)}}</span>
                    </div>
                    <div class="phone">
                        <img src="./../../../../static/img/member/new/phone.png" />
                        {{item.phone}}
                    </div>
                    <div class="check">
                        <el-radio-group v-model="checkList" @change="checkChange">
                            <el-radio :label="item.phone">&nbsp;</el-radio>
                        </el-radio-group>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chose-btn" @click="closeDia">下一步</div>
    </div>
</template>

<script>
import {seekMemberAllList} from 'Api/commonality/seek'
export default {
    props: [
        'shopId',
        'isChoseMember',
        'sellChoseMemberId'
    ],
    watch: {
        isChoseMember () {
            this.checkList = this.sellChoseMemberId
            this.memberAllList()
        }
    },
    data () {
        return {
            dataList: [],
            checkList: []
        }
    },
    created () {
        this.checkList = this.sellChoseMemberId
        this.memberAllList()
    },
    mounted () {
        $(".member-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });
    },
    methods: {
        closeDia () { // 关闭弹窗
            this.$emit("closeChoMember", {list: this.checkList})
        },
        getLevel (level) {
            switch (level) {
                case '1':
                    return "普通"
                case '2':
                    return "中级"
                case '3':
                    return "重要"
            }
        },
        getType (type) {
            switch (type) {
                case '1':
                    return '私有'
                case '2':
                    return '共有'
                case '3':
                    return '公共'
            }
        },
        checkChange (val) { // 多选选中的改变
            // console.log(val)
            // console.log(this.checkList)
        },
        memberAllList () {
            let options = {
                shopId: this.shopId
            }
            seekMemberAllList(options).then((res) => {
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
                console.log(res)
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
                    margin-right: 20px;
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
}
</style>

<template>
    <div class="n-p-scroll-box">
        <div class="p-close-icon" @click="close">
            <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="title">{{headerTit}}</div>
        <div class="menu-list">
            <div class="search">
                <input @keyup.enter="getShopUserList" v-model="userPhone" type="text" placeholder="请输入负责人名/手机号">
                <div class="search-btn">
                    <i @click="getShopUserList" class="iconfont icon-sousuo"></i>
                </div>
            </div>
        </div>
        <!-- 高级搜索 -->
        <advanced-search v-if="false"></advanced-search>
        <div class="member-list new-e-checkbox-square">
            <ul class="member-header">
                <li>头像</li>
                <li>姓名</li>
                <li>手机号</li>
                <li>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </li>
            </ul>
            <el-checkbox-group v-model="checkList"  @change="handleCheckedCitiesChange">
                <ul class="member-body" v-for="(item, index) in dataList">
                    <li>
                        <img :src="item.logo">
                    </li>
                    <li>
                        {{item.userName}}
                    </li>
                    <li>
                        <i class="iconfont icon-genjin"></i> {{item.phoneNo}}
                    </li>
                    <li>
                        <el-checkbox :label="item.userId"></el-checkbox>
                    </li>
                </ul>
            </el-checkbox-group>
        </div>
        <p class="all-num-tit">筛选跟进会员：<span>{{total}}</span>位</p>
        <div class="xj-btn-list">
            <div v-if="!followId" class="btn cnacel-btn" @click="close">返回上一级</div>
            <div class="btn" @click="confirm">确定</div>
        </div>
    </div>
</template>
<script>
import { seekGetShopUserList } from 'Api/commonality/seek'
import advancedSearch from './advanced-search'

export default {
    components: {
        advancedSearch
    },
    props: [
        'headerTit',
        'dataInfo',
        'shopId',
        'isChoseLeader',
        'addModel',
        "isFollowPage",
        'isFollowClear',
        'userIdList',
        'followId'
    ],
    watch: {
        'isChoseLeader': function() {
            this.getShopUserList()
            if (this.userIdList) {
                this.checkList = this.userIdList
            }
        }
    },
    data() {
        return {
            isIndeterminate: false,
            checkAll: false,
            userPhone: '',
            dataList: [],
            checkList: [],
            nameList: [],
            pageSize: 99,
            page: 1,
            isVisitAim: false,
            total: ''
        }
    },
    created() {
        this.getShopUserList()
        if (this.userIdList) {
            this.checkList = this.userIdList
        }
    },
    mounted() {
        $(".member-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkList = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.dataList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataList.length;
        },
        close() {
            this.$emit('close')
        },
        closeAim(val) {
            this.isVisitAim = false
            this.$emit("closeChoMember", { list: this.checkList, followAim: val })
        },
        returnBack() {
            this.$emit("returnBack")
        },
        confirm() { // 关闭弹窗
            this.nameList = []
            if (this.addModel) {
                this.dataList.forEach((item, index) => {
                    if (this.checkList.includes(item.userId)) {
                        this.nameList.push(item.userName)
                    }
                })
                this.$emit("closeChoMember", { list: this.checkList, nameList: this.nameList })
            } else if (this.isFollowPage) {
                this.isVisitAim = true
            } else {
                this.$emit("closeChoMember", { list: this.checkList })
            }


        },
        getLevel(level) {
            switch (level) {
                case '1':
                    return "普通"
                case '1':
                    return "中级"
                case '1':
                    return "重要"
            }
        },
        getType(type) {
            switch (type) {
                case 1:
                    return '私有'
                case 2:
                    return '共有'
                case 3:
                    return '公共'
            }
        },
        checkChange(val) { // 多选选中的改变
            console.log(val)
        },
        getShopUserList() {
            let options = {
                page: this.page,
                pageSize: this.pageSize,
                shopId: this.shopId
            }
            if (this.userPhone != "" && this.userPhone != null) {
                options.phone = this.userPhone;
            }
            seekGetShopUserList(options).then((res) => {
                if (res.data.state == 200) {
                    this.dataList = res.data.data.shopUserList
                    this.total = res.data.data.total
                    if (this.followData) {
                        this.followData.principalList.forEach((item, index) => {
                            this.checkList.push(this.followData.principalList[index].principalId)
                        })
                    }
                } else {
                    this.$message({ type: 'success', message: res.data.msg })
                }
            }, (res) => {
                this.$message({ type: 'success', message: res.data.msg })
            })
        }
    }
}

</script>
<style lang="scss">
// .choseLeaderDig {
//     width: 700px;
//     height: 730px;
//     background: #fff;
//     border-radius: 10px;
//     .el-dialog__header {
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 38px;
//         padding-top: 20px !important;
//         padding-right: 20px !important;
//     }
//     .el-dialog__body {
//         padding: 0 28px;
//     }
// }

.n-p-scroll-box {
    .title {
        padding-top: 20px;
        font-size: 14px;
        color: #333;
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
                    color: #fff;
                    line-height: 28px;
                }
            }
        }
    }
    .member-list {
        height: 500px;
        .member-header {
            height: 40px;
            background-color: #f5f5f5;
            overflow: hidden;
            display: -ms-flexbox;
            display: flex;
            border-bottom: 2px solid #e7e7e7;
            li {
                display: inline-block;
                line-height: 40px;
                text-align: center;
                color: #686868;
                font-size: 12px;
                float: left;
                font-weight: bold;
                transition: all .3s;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .member-body {
            height: 100%;
            &:nth-child(2n) {
                background-color: #FBFBFB;
            }
            &:hover {
                background-color: #FFFBF3;
            }
            li {
                height: 40px;
                line-height: 40px;
                img {
                    width: 30px;
                    height: 30px;
                    margin-top: 5px;
                    border-radius: 50%;
                }
                i {
                    color: #2993f8;
                }
            }
        }
        ul {
            display: flex;
            li {
                text-align: center;
            }
            li:nth-child(1) {
                width: 100px;
            }
            li:nth-child(2) {
                width: 100px;
            }
            li:nth-child(3) {
                flex: 1;
            }
            li:nth-child(4) {
                width: 100px;
            }
        }
    }
    .all-num-tit{
        text-align: right;
        font-size: 14px;
        margin: 10px 0;
        span{
            color: #2993f8;
        }
    }
}

</style>

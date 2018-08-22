<!-- 选择负责人 -->
<template>
    <div class="n-p-scroll-box">
        <div class="p-close-icon" @click="close">
            <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="title">{{headerTit}}</div>
        <div class="c-l-scroll-body">
            <div class="menu-list-wrap">
                <div class="search">
                    <input @keyup.enter="_seekGetShopUserList" v-model="userPhone" type="text" placeholder="请输入负责人名/手机号">
                    <div class="search-btn">
                        <i @click="_seekGetShopUserList" class="iconfont icon-sousuo"></i>
                    </div>
                </div>
            </div>

            <div class="principal-member-list new-e-checkbox-square">
                <ul class="member-header">
                    <li>头像</li>
                    <li>姓名</li>
                    <li>手机号</li>
                    <li>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    </li>
                </ul>
                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
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
        </div>
        <p class="all-num-tit">筛选负责人：<span>{{totalNum}}</span>位</p>
        <div class="xj-btn-list">
            <div v-if="!followId" class="btn cnacel-btn" @click="close">返回上一级</div>
            <div class="btn" @click="confirm">确定</div>
        </div>
    </div>
</template>
<script>
import { seekGetShopUserList, seekMemberList } from 'Api/commonality/seek'
import advancedSearch from './advanced-search'
import cutBg from 'base/cut/cut-bg'
import {getMemberType} from 'assets/js/analysis'
const dataSource = require('./data.js')
export default {
    components: {
        advancedSearch,
        cutBg
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
            this._seekGetShopUserList()
            if (this.userIdList) {
                this.checkList = this.userIdList
            }
        }
    },
    data() {
        return {
            advanced: [], // 高级搜索数据
            isAdvanced: false, // 是否开始高级搜索
            filterCondition: {
                keyWord: '',
                memberGrade: '',
                memberGradeName: '',
                memberTypr: '',
                principalId: '',
                principalName: '',
                queryType: '1',
            },
            isIndeterminate: false,
            checkAll: false,
            userPhone: '',
            dataList: [],
            checkList: [],
            nameList: [],
            pageSize: 99,
            page: 1,
            isVisitAim: false,
            totalNum: '',
            memberTypeList: dataSource.memberTypeList,
            queryTypeList: dataSource.queryTypeList,
            userList: [],
            paging: {
                page: 1,
                pageSize: '0'
            }
        }
    },
    created() {
        this._seekGetShopUserList()
        this._seekMemberList()
        if (this.userIdList) {
            this.checkList = this.userIdList
        }
    },
    mounted() {
        let _self = this
        $(".principal-member-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y",
            scrollInertia: 100,
        });
    },
    methods: {
        pitchOn(parm) {
            this.filterCondition.queryType = parm.id
        },
        _getMemberType (parm) {
            return getMemberType(parm)
        },
        _seekMemberList () {
            let options = {
              type: '2',
              shopId: this.shopId,
            }
            seekMemberList(options)
              .then(res => {
                if (res.data.state == 200) {
                    let datas = res.data.data.dataList
                    for (let i of datas) {
                        i.name = i.username
                        i.id = i.userId
                    }
                    this.userList = datas
                } else {
                    this.$message({ type: 'success', message: res.data.msg })
                }
              })
        },
        handleCheckAllChange(val) {
            let cityOptions = []
            for (let i of this.dataList) {
                cityOptions.push(i.userId)
            }
            this.checkList = val.target.checked ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount == this.dataList.length;
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
                this.$emit("closeChoMember", { list: this.checkList, nameList: this.nameList, filterCondition: this.filterCondition })
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
        _seekGetShopUserList(parm) {
            this.loading = true
            seekGetShopUserList(Object.assign({}, this.paging, {shopId: this.shopId}))
                .then(res => {
                  this.loading = false
                  if (res.data.state == 200) {
                    this.totalNum = res.data.data.total
                    this.dataList = res.data.data.shopUserList
                  } else {
                    this.$message({type: 'error',message: res.data.msg})
                  }
                })
        },
        changeMemberGrade(parm) {
            this.filterCondition.memberGrade = parm.id
            this.filterCondition.memberGradeName = parm.name
            this.$emit('update', this.filterCondition)
        },
        clearMemberGrade() {
            this.filterCondition.memberGrade = ''
            this.filterCondition.memberGradeName = ''
            this.$emit('update', this.filterCondition)
        },
        changeVisitAimList(parm) {
            this.filterCondition.memberTypr = parm.id
            this.$emit('update', this.filterCondition)
        },
        clearVisitAimList() {
            this.filterCondition.memberTypr = ''
            this.$emit('update', this.filterCondition)
        },
        changeUser (parm) {
          this.filterCondition.principalId = parm.userId
          this.filterCondition.principalName = parm.name
          this.$emit('update', this.filterCondition)
        },
        clearUser () {
          this.filterCondition.principalId = ''
          this.filterCondition.principalName = ''
          this.$emit('update', this.filterCondition)
        },
        update (parm) {
            this.advanced = parm.datas
        },
        // 重置高级搜索
        reset () {
            this.$refs.advancedSearchBox.reset()
        }
    }
}

</script>
<style lang="scss">
.n-p-scroll-box {
    .c-l-scroll-body{
        padding-top: 5px;
        height: 564px;
        overflow-y: scroll;
    }
    .title {
        padding-top: 20px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .menu-list-wrap {
        margin-bottom: 20px;
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
        .menu-list-right{
            height: 30px;
            float: left;
        }
    }
    .btn-list-box{
        margin-bottom: 15px;
        .cut-btn-style{
            vertical-align: top;
            margin-right: 20px;
            li{
                width: 80px;
            }
        }
        >.xj-btn-list{
            float: right;
        }
    }
    .principal-member-list {
        height: 508px;
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
    .all-num-tit {
        text-align: right;
        font-size: 14px;
        margin: 10px 0;
        span {
            color: #2993f8;
        }
    }
}

</style>

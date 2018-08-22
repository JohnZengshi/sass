<template>
    <div class="n-p-scroll-box">
        <div class="p-close-icon" @click="close">
            <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="title">{{headerTit}}</div>
        <div class="c-l-scroll-body">
            <div class="menu-list-wrap">
                <div class="search">
                    <input @keyup.enter="_seekFollowSearchByNew" v-model="filterCondition.keyWord" type="text" placeholder="请输入会员名/手机号/编号">
                    <div class="search-btn">
                        <i @click="_seekFollowSearchByNew" class="iconfont icon-sousuo"></i>
                    </div>
                </div>
                <div class="menu-list-right">

                    <new-down-menu
                        class="w-110"
                        ref="memberRankBox"
                        :isSolid="true"
                        :titleInfo="filterCondition.memberGradeName ? filterCondition.memberGradeName : '会员级别'"
                        :showList="memberGradeList"
                        @changeData="changeMemberGrade"
                        @clearInfo="clearMemberGrade"
                    ></new-down-menu>

                    <new-down-menu class="w-110 ml-10" ref="memberClassBox" :isSolid="true" :titleInfo="_getMemberType(filterCondition.memberType) || '会员类型'" :showList="memberTypeList" @changeData="changeVisitAimList" @clearInfo="clearVisitAimList"></new-down-menu>

                <new-down-menu
                  class="w-110 ml-10"
                  ref="userBox"
                  :isSolid="true"
                  :titleInfo="filterCondition.principalName ? filterCondition.principalName : '跟进人'"
                  :showList="userList"
                  :nameKey="'name'"
                  @changeData="changeUser"
                  @clearInfo="clearUser"
                ></new-down-menu>

                </div>
            </div>
            <div class="btn-list-box">

                <cut-bg class="cut-btn-style" @pitchOn="pitchOn" :showList="queryTypeList" :current="filterCondition.queryType"></cut-bg>

                <div class="xj-btn-defult" @click="openAdvanced">{{isAdvanced ? '取消高级搜索' : '高级搜索'}}</div>
                <ul class="xj-btn-list" v-if="isAdvanced">
                    <li class="btn" @click="_seekFollowSearchByNew">搜索</li>
                    <li class="btn" @click="reset">重置</li>
                </ul>
            </div>
            
            <!-- 高级搜索 -->
            <advanced-search ref="advancedSearchBox" :initAdvanced="initAdvanced" v-show="isAdvanced" :userList="userList" :memberGradeList="memberGradeList" @update="amendAdvancedSearch"></advanced-search>

            <div v-loading="loading" class="member-list new-e-checkbox-square">
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
                            <img :src="item.userLogo">
                        </li>
                        <li>
                            {{item.userName}}
                        </li>
                        <li>
                            <i class="iconfont icon-genjin"></i> {{item.phone}}
                        </li>
                        <li>
                            <el-checkbox :label="item.memberId"></el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
            </div> 
        </div>
        <p class="all-num-tit">筛选跟进会员：<span>{{totalNum}}</span>位</p>
        <div class="xj-btn-list">
            <div v-if="!followId" class="btn cnacel-btn" @click="close">返回上一级</div>
            <div class="btn" @click="confirm">确定</div>
        </div>
    </div>
</template>
<script>
import { seekFollowSearchByNew, seekMemberList, seekFindMemberGradeList } from 'Api/commonality/seek'
import advancedSearch from './advanced-search'
import cutBg from 'base/cut/cut-bg'
import newDownMenu from 'base/menu/new-down-menu'
import {getMemberType} from 'assets/js/analysis'
const dataSource = require('./data.js')
export default {
    components: {
        advancedSearch,
        newDownMenu,
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
        'followId',
        'initFilter',
        'initAdvanced'
    ],
    watch: {
        'isChoseLeader': function() {
            this._seekFollowSearchByNew()
            // 会员数据
            if (this.userIdList) {
                this.checkList = this.userIdList
            }
            // 头部筛选条件
            if (this.initFilter) {
                for (let i of Object.keys(this.filterCondition)) {
                    this.filterCondition[i] = this.initFilter[i]
                }
            }
            // 初始化高级搜素条件
            if (this.initAdvanced.length) {
                this.advanced = this.initAdvanced
            }
        }
    },
    data() {
        return {
            loading: false,
            advanced: [], // 高级搜索数据
            isAdvanced: false, // 是否开始高级搜索
            filterCondition: {
                keyWord: '',
                memberGrade: '',
                memberGradeName: '',
                memberType: '',
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
            memberGradeList: [],
            paging: {
                page: 1,
                pageSize: '30'
            }
        }
    },
    created() {
        this._seekFollowSearchByNew()
        this._seekMemberList()
        this._seekFindMemberGradeList()
        if (this.userIdList) {
            this.checkList = this.userIdList
        }
    },
    mounted() {
        let _self = this
        $(".member-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y",
            scrollInertia: 100,
            callbacks: {
                onTotalScroll: function() {
                    _self._seekFollowSearchByNew('Y')
                }
            }
        });
    },
    methods: {
        // 开启高级搜索
        openAdvanced() {
            this.isAdvanced = !this.isAdvanced
        },
        pitchOn(parm) {
            this.filterCondition.queryType = parm.id
            // 按条件，清空列表
            if (parm.id == 2) {
                this.dataList = []
            } else {
                this._seekFollowSearchByNew()
            }
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
        _seekFindMemberGradeList () {
            seekFindMemberGradeList({shopId: this.shopId})
                .then(res => {
                    if (res.data.state == 200) {
                        let datas = res.data.data
                        for (let i of datas) {
                            i.name = i.gradeName
                            i.id = i.gradeId
                        }        
                      this.memberGradeList = datas
                    } else {
                        this.$message({ type: 'error', message: res.data.msg })
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
                this.$emit("closeChoMember", {
                    list: this.checkList, // 用户列表
                    nameList: this.nameList, // 用户名字
                    filterCondition: this.filterCondition, // 头部过滤条件
                    advanced: this.advanced // 高级搜索数据
                })
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
        _seekFollowSearchByNew(parm) {
            if (this.filterCondition.queryType == 2) {
                return
            }
            if (parm == 'Y') { // 如果是分页
                if (this.paging.page > 1 && this.dataList.length == this.totalNum) {
                  return
                }
            } else { // 否者更换条件或第一次请求
                this.dataList = []
                this.paging.page = 1
            }
            // 开启高级搜索
            if (this.isAdvanced) {

            }
            let advanced = this.isAdvanced ? this.advanced : []
            this.loading = true
            seekFollowSearchByNew(Object.assign({}, this.filterCondition, {dataList: advanced}, this.paging, {shopId: this.shopId}))
                .then(res => {
                  if (res.data.state == 200) {
                    this.paging.page += 1
                    this.totalNum = res.data.data.totalNum
                    this.dataList.push(...res.data.data.memberList)
                  } else {
                    this.$message({type: 'error',message: res.data.msg})
                  }
                  this.loading = false
                })
        },
        changeMemberGrade(parm) {
            this.filterCondition.memberGrade = parm.id
            this.filterCondition.memberGradeName = parm.name
            this._seekFollowSearchByNew()
            // this.$emit('update', this.filterCondition)
        },
        clearMemberGrade() {
            this.filterCondition.memberGrade = ''
            this.filterCondition.memberGradeName = ''
            this._seekFollowSearchByNew()
            // this.$emit('update', this.filterCondition)
        },
        changeVisitAimList(parm) {
            this.filterCondition.memberType = parm.id
            this._seekFollowSearchByNew()
            // this.$emit('update', this.filterCondition)
        },
        clearVisitAimList() {
            this.filterCondition.memberType = ''
            this._seekFollowSearchByNew()
            // this.$emit('update', this.filterCondition)
        },
        changeUser (parm) {
          this.filterCondition.principalId = parm.userId
          this.filterCondition.principalName = parm.name
          this._seekFollowSearchByNew()
          // this.$emit('update', this.filterCondition)
        },
        clearUser () {
          this.filterCondition.principalId = ''
          this.filterCondition.principalName = ''
          this._seekFollowSearchByNew()
          // this.$emit('update', this.filterCondition)
        },
        // 重置高级搜索
        reset () {
            this.$refs.advancedSearchBox.reset()
        },
        // 选择高级搜索
        amendAdvancedSearch (parm) {
            this.advanced = parm.datas
        }
    }
}

</script>
<style lang="scss">
.n-p-scroll-box {
    .c-l-scroll-body{
        padding-top: 5px;
        height: 579px;
        overflow-y: scroll;
    }
    .title {
        padding-top: 0px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .menu-list-wrap {
        margin-bottom: 20px;
        height: 28px;
        .search {
            width: 200px;
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
    .member-list {
        height: 475px;
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

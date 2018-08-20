<!-- 我的跟进 -->
<template>
    <div class="m-m-filter-header-main">
        <div class="operate-bar-bottom">
            <div class="search">
                <input type="text" v-model="filterCondition.name" placeholder="手机号/姓名" @keyup.enter="batchAddByOrderNum">
                <div class="search-btn" @click="batchAddByOrderNum">
                    <i class="iconfont icon-sousuo"></i>
                </div>
            </div>
            <div v-if="false" class="xj-btn-defult ml-10" @click="isSenior = !isSenior">
                {{isSenior ? '取消高级搜索' : '高级搜索'}}
            </div>
            <DownMenu class="w-110 ml-10" ref="memberRankBox" :isSolid="true" :titleInfo="_getFollowUpStatus(filterCondition.followStatus) || '跟进状态'" :showList="followUpStatusList" @changeData="changeFollowUpStatus" @clearInfo="clearFollowUpStatus"></DownMenu>
            <DownMenu class="w-110 ml-10" ref="memberClassBox" :isSolid="true" :titleInfo="_getVisitAimList(filterCondition.followPurpose) || '跟进目的'" :showList="visitAimList" @changeData="changeVisitAimList" @clearInfo="clearVisitAimList"></DownMenu>
            <DownMenu class="w-110 ml-10" ref="userBox" :isSolid="true" :titleInfo="_getFollowType(filterCondition.followType) || '跟进类型'" :showList="followTypeList" @changeData="changeFollowType" @clearInfo="clearFollowType"></DownMenu>
            <div class="btn-box" v-if="headline == '我的跟进'">
                <ul class="xj-btn-list">
                    <li class="btn" @click="openAdd">+跟进</li>
                    <li class="btn" @click="batchComplete">+批量完成</li>
                </ul>
            </div>
        </div>
        <!-- 完成跟进 -->
        <cut-popup ref="cutPopupBox"></cut-popup>
        <!-- 新增跟进 -->
        <add-follow-up v-if="isAddFollowUp" ref="addFollowUpBox" :shopId="shopId" @close="isAddFollowUp = false"></add-follow-up>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { seekMemberList } from "Api/commonality/seek"
import { getFollowType, getFollowUpStatus, getVisitAimList } from 'assets/js/analysis'
import dropDownColums from 'base/menu/drop-down-colums'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import DownMenu from 'base/menu/new-down-menu'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DropDownMenu from '@/components/template/DropDownMenu'
import combinationDropDownColums from 'base/menu/combination-drop-down-colums'
import addFollowUp from './../add-follow-up'
import cutBg from "base/cut/cut-bg";
import cutPopup from "./cut-popup";
const dataSource = require('./data.js')
export default {
    components: {
        dropDownColums,
        DropDownMenu,
        DownMenu,
        aloneDropDownColums,
        combinationDropDownColums,
        cutBg,
        cutPopup,
        addFollowUp
    },
    props: ['shopId', 'headline'],
    data() {
        return {
            isSenior: false,
            isAddFollowUp: false,
            followUpStatusList: dataSource.followUpStatusList,
            visitAimList: dataSource.visitAimList,
            followTypeList: dataSource.followTypeList,
            userList: [],
            isShowCost: '',
            name: '',
            tabSwitch: false,
            repositoryList: [], // 仓库列表
            shopDataList: [],
            filterCondition: {
                followStatus: '',
                followPurpose: '',
                followType: '',
                type: '',
                chargeId: ''
            },
            littleBatch: false,
            isLoading: false,
        }
    },
    created() {
        this.initData()
    },
    watch: {
        'shopId' () {
            this.initData()
        }
    },
    computed: {
        ...mapGetters([
            "userPositionInfo" // 职位信息
        ]),
        shopRole: function() { // 店员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        computedRole: function() { // 公司
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
            }
        },
        computedManageRole: function() { // 公司
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionComputedManageRole(this.userPositionInfo.roleList)
            }
        },
        officeClerk() { // 职员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionOfficeClerk(this.userPositionInfo.roleList)
            }
        },
        shopManageRole() { // 店长
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
            }
        },
        isJrole: function() { // 判断是不是监察员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionJCY(this.userPositionInfo.roleList);
            }
        }
    },
    methods: {
        _getFollowType(parm) {
            return getFollowType(parm)
        },
        _getFollowUpStatus(parm) {
            return getFollowUpStatus(parm)
        },
        _getVisitAimList(parm) {
            return getVisitAimList(parm)
        },
        openAdd() {
            this.isAddFollowUp = true
            setTimeout(() => {
                this.$refs.addFollowUpBox.open()
            }, 0)
        },
        batchComplete() {
            this.$refs.cutPopupBox.open({ index: 'chooseUser' })
        },
        // 旧
        initData() {
            for (let i in Object.assign(this.filterCondition)) {
                this.filterCondition[i] = ''
            }
            if (this.$refs.memberRankBox) {
                this.$refs.memberRankBox.init()
            }
            if (this.$refs.memberClassBox) {
                this.$refs.memberClassBox.init()
            }
            if (this.$refs.userBox) {
                this.$refs.userBox.init()
            }
            this._seekMemberList()
        },
        changeFollowUpStatus(parm) {
            this.filterCondition.followStatus = parm.id
            this.$emit('update', this.filterCondition)
        },
        clearFollowUpStatus() {
            this.filterCondition.followStatus = ''
            this.$emit('update', this.filterCondition)
        },
        changeVisitAimList(parm) {
            this.filterCondition.followPurpose = parm.id
            this.$emit('update', this.filterCondition)
        },
        clearVisitAimList() {
            this.filterCondition.followPurpose = ''
            this.$emit('update', this.filterCondition)
        },
        changeFollowType(parm) {
            this.filterCondition.followType = parm.id
            this.$emit('update', this.filterCondition)
        },
        clearFollowType() {
            this.filterCondition.followType = ''
            this.$emit('update', this.filterCondition)
        },
        _seekMemberList() {
            let options = {
                type: '2',
                shopId: this.shopId,
            }
            seekMemberList(options)
                .then(res => {
                    if (res.data.state == 200) {
                        this.userList = res.data.data.dataList
                    }
                })
        },
        combinationHeaderComplate(parm) {
            this.filterCondition = Object.assign(this.filterCondition, parm)
            this.$emit('update', this.filterCondition)
        },
        choseMenu() {
            this.tabSwitch = !this.tabSwitch
            this.$emit('reportSwitch', this.tabSwitch)
        },
        settingUserRole() { // 用户查看成本权限
            let options = {
                userId: sessionStorage.getItem('id')
            }
            seekSettingUserRole(options).then((res) => {
                if (res.data.state == 200) {
                    this.isShowCost = res.data.data.costFlag
                }
            })
        },
        batchAddByOrderNum() {
            this.$emit('update', this.filterCondition)
        },
        storageLocation(parm) {
            this.filterCondition.storageId = parm.bigList
            this.$emit('update', this.filterCondition)
        },
        filterData(parm) {
            this.$emit('update', Object.assign(this.filterCondition, parm))
        },
        _seekRepositoryList() {
            seekRepositoryList()
                .then(res => {
                    if (res.data.state == 200) {
                        let datas = res.data.data.repositoryList
                        for (let i of datas) {
                            i.id = i.repositoryId
                            i.name = i.repositoryName
                        }
                        this.repositoryList = datas
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
        },
        _showCounterList(parm, item) {
            let options = {
                shopId: parm
            }
            showCounterList(options)
                .then(res => {
                    if (res.data.state == 200) {
                        item.childrenList = res.data.data.counterList
                        item.id = item.shopId
                        item.name = item.shopName
                        for (let j of item.childrenList) {
                            j.name = j.counterName
                            j.id = j.counterId
                        }
                        this.shopDataList.push(item)
                    } else {
                        this.$message({
                            type: "info",
                            message: res.data.msg
                        })
                    }
                })
        },
        changeStateData() {

        },
        clearState() {

        },
        changeOrderId(parm) {
            this.filterCondition.newOrderId = parm
            this.$emit('update', this.filterCondition)
        },
        openLittleBatch() {
            this.$refs.littleBatchWrap.open()
        },
        changeShopData() {

        },
        dataBack(parm) {
            this.filterCondition[parm.keyName] = parm.samllList
            this.$emit('update', this.filterCondition)
        },
        dataBackProductTypeId(parm) { // 产品类别过滤
            this.filterCondition.productStatus = parm.bigList
            this.$emit('update', this.filterCondition)
        }
    }
}

</script>
<style lang="scss" src="./../../base/header.scss"></style>

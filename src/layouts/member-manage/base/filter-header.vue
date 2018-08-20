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

      <DownMenu
          class="w-110 ml-10"
          ref="memberRankBox"
          :isSolid="true"
          :titleInfo="filterCondition.gradeName ? filterCondition.gradeName : '会员级别'"
          :showList="gradeList"
          :nameKey="'gradeName'"
          @changeData="changeMemberRank"
          @clearInfo="clearMemberRank"
      ></DownMenu>

      <DownMenu
          class="w-110 ml-10"
          ref="memberClassBox"
          :isSolid="true"
          :titleInfo="filterCondition.typeName ? filterCondition.typeName : '会员类型'"
          :showList="memberClassList"
          :nameKey="'name'"
          @changeData="changeMemberClass"
          @clearInfo="clearMemberClass"
      ></DownMenu>

      <DownMenu
          class="w-110 ml-10"
          ref="userBox"
          :isSolid="true"
          :titleInfo="filterCondition.username ? filterCondition.username : '负责人'"
          :showList="userList"
          :nameKey="'username'"
          @changeData="changeUser"
          @clearInfo="clearUser"
      ></DownMenu>


    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import {getProductTypeList, seekProductClassList, seekGetShopListByCo, showCounterList, seekRepositoryList,seekSettingUserRole} from "Api/commonality/seek"
import {seekMemberList, seekFindMemberGradeList} from "Api/commonality/seek"
import dropDownColums from 'base/menu/drop-down-colums'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import DownMenu from 'base/menu/new-down-menu'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DropDownMenu from '@/components/template/DropDownMenu'
import combinationDropDownColums from 'base/menu/combination-drop-down-colums'
import cutBg from "base/cut/cut-bg";
export default {
  components: {
    dropDownColums,
    DropDownMenu,
    DownMenu,
    aloneDropDownColums,
    combinationDropDownColums,
    cutBg
  },
  props: ['shopId'],
  data () {
    return {
      isSenior: false,
      gradeList: [],
      memberClassList: [
        {
          name: '共有',
          type: '1'
        },
        {
          name: '私有',
          type: '2'
        },
        {
          name: '公共',
          type: '3'
        }
      ],
      userList: [],
      isShowCost: '',
      name: '',
      tabSwitch: false,
      repositoryList: [], // 仓库列表
      shopDataList: [],
      filterCondition: {
        name: '',
        shopId: '',
        grade: '',
        gradeName: '',
        type: '',
        typeName: '',
        userId: '',
        username: '',
        // sortList: []
      },
      littleBatch: false,
      isLoading: false,
    }
  },
  created () {
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
    initData () {
      for (let i in Object.assign(this.filterCondition)) {
        this.filterCondition[i] = ''
      }
      // this.$refs.memberRankBox.init()
      // this.$refs.memberClassBox.init()
      // this.$refs.userBox.init()
      this._seekMemberList()
      this._seekFindMemberGradeList()
    },
    changeMemberRank (parm) {
      this.filterCondition.gradeName = parm.gradeName
      this.filterCondition.grade = parm.gradeId
      this.$emit('filterData', this.filterCondition)
    },
    clearMemberRank () {
      this.filterCondition.gradeName = ''
      this.filterCondition.grade = ''
      this.$emit('filterData', this.filterCondition)
    },
    changeMemberClass (parm) {
      this.filterCondition.type = parm.type
      this.filterCondition.typeName = parm.name
      this.$emit('filterData', this.filterCondition)
    },
    clearMemberClass () {
      this.filterCondition.type = ''
      this.filterCondition.typeName = ''
      this.$emit('filterData', this.filterCondition)
    },
    changeUser (parm) {
      this.filterCondition.userId = parm.userId
      this.filterCondition.userName = parm.userName
      this.$emit('filterData', this.filterCondition)
    },
    clearUser () {
      this.filterCondition.userId = ''
      this.filterCondition.userName = ''
      this.$emit('filterData', this.filterCondition)
    },
    _seekMemberList () {
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
    combinationHeaderComplate (parm) {
      this.filterCondition = Object.assign(this.filterCondition, parm)
      this.$emit('filterData', this.filterCondition)
    },
    choseMenu () {
      this.tabSwitch = !this.tabSwitch
      this.$emit('reportSwitch', this.tabSwitch)
    },
    settingUserRole () { // 用户查看成本权限
      let options = {
        userId: sessionStorage.getItem('id')
      }
      seekSettingUserRole(options).then((res) => {
        if (res.data.state == 200) {
          this.isShowCost = res.data.data.costFlag
        }
      })
    },
    batchAddByOrderNum () {
      this.$emit('filterData', this.filterCondition)
    },
    storageLocation (parm) {
      this.filterCondition.storageId = parm.bigList
      this.$emit('filterData', this.filterCondition)
    },
    filterData (parm) {
      this.$emit('filterData', Object.assign(this.filterCondition, parm))
    },
    _seekRepositoryList () {
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
    _showCounterList (parm, item) {
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
    // initShowCounterList (parm) {
    //   let options = {
    //     shopId: parm
    //   }
    //   showCounterList(options)
    //     .then(res => {
    //       let datas = []
    //       for (let i of res.data.data.counterList) {
    //         datas.push(j.counterId)
    //       }
    //       this.$refs.shopWrap.initData(datas)
    //     })
    // },
    changeStateData () {

    },
    clearState () {

    },
    changeOrderId (parm) {
      this.filterCondition.newOrderId = parm
      this.$emit('filterData', this.filterCondition)
    },
    openLittleBatch () {
      this.$refs.littleBatchWrap.open()
    },
    changeShopData () {

    },
    dataBack (parm) {
      this.filterCondition[parm.keyName] = parm.samllList
      this.$emit('filterData', this.filterCondition)
    },
    dataBackProductTypeId (parm) { // 产品类别过滤
      this.filterCondition.productStatus = parm.bigList
      this.$emit('filterData', this.filterCondition)
    },
    // 会员等级列表
    _seekFindMemberGradeList () {
      let options = {
        shopId: this.shopId
      }
      seekFindMemberGradeList(options)
        .then(res => {
          if (res.data.state == 200) {
            this.gradeList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
  }
}
</script>
<style lang="scss" src="./header.scss"></style>
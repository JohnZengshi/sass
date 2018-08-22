<!-- 跟进管理 -->
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
          v-if="false"
          class="w-110 ml-10"
          ref="memberClassBox"
          :isSolid="true"
          :titleInfo="filterCondition.typeName ? filterCondition.typeName : '跟进状态'"
          :showList="memberClassList"
          :nameKey="'name'"
          @changeData="changeMemberClass"
          @clearInfo="clearMemberClass"
      ></DownMenu>

      <DownMenu
          class="w-110 ml-10"
          ref="userBox"
          :isSolid="true"
          :titleInfo="filterCondition.userName ? filterCondition.userName : '跟进人'"
          :showList="userList"
          :nameKey="'username'"
          @changeData="changeUser"
          @clearInfo="clearUser"
      ></DownMenu>


      <DownMenu
          class="w-110 ml-10"
          ref="memberRankBox"
          :isSolid="true"
          :titleInfo="filterCondition.followStatusName ? filterCondition.followStatusName : '跟进目的'"
          :showList="visitAimList"
          :nameKey="'name'"
          @changeData="changeMemberRank"
          @clearInfo="clearMemberRank"
      ></DownMenu>

      <div class="btn-box" v-if="headline == '我的跟进'">
        <ul class="xj-btn-list">
          <li class="btn" syle="margin-right: 10px;">+跟进</li>
          <li class="btn" @click="batchComplete">+批量完成</li>
        </ul>
      </div>

    </div>

    <!-- 完成跟进 -->
    <cut-popup ref="cutPopupBox"></cut-popup>

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
import cutPopup from "./cut-popup";
let dataSource = require('./data.js')
export default {
  components: {
    dropDownColums,
    DropDownMenu,
    DownMenu,
    aloneDropDownColums,
    combinationDropDownColums,
    cutBg,
    cutPopup
  },
  props: ['shopId', 'headline'],
  data () {
    return {
      isSenior: false,
      gradeList: [],
      visitAimList: dataSource.visitAimList,
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
        followStatusName: '',
        type: '',
        typeName: '',
        principalId: '',
        userName: '',
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
  methods: {
    batchComplete () {
      this.$refs.cutPopupBox.open({index: 'chooseUser'})
    },
    // 旧
    initData () {
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
    changeMemberRank (parm) {
      this.filterCondition.followStatusName = parm.name
      this.filterCondition.followStatus = parm.id
      this.$emit('update', this.filterCondition)
    },
    clearMemberRank () {
      this.filterCondition.followStatusName = ''
      this.filterCondition.followStatus = ''
      this.$emit('update', this.filterCondition)
    },
    changeMemberClass (parm) {
      this.filterCondition.type = parm.type
      this.filterCondition.typeName = parm.name
      this.$emit('update', this.filterCondition)
    },
    clearMemberClass () {
      this.filterCondition.type = ''
      this.filterCondition.typeName = ''
      this.$emit('update', this.filterCondition)
    },
    changeUser (parm) {
      this.filterCondition.principalId = parm.userId
      this.filterCondition.userName = parm.username
      this.$emit('update', this.filterCondition)
    },
    clearUser () {
      this.filterCondition.principalId = ''
      this.filterCondition.userName = ''
      this.$emit('update', this.filterCondition)
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
      this.$emit('update', this.filterCondition)
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
      this.$emit('update', this.filterCondition)
    },
    storageLocation (parm) {
      this.filterCondition.storageId = parm.bigList
      this.$emit('update', this.filterCondition)
    },
    filterData (parm) {
      this.$emit('update', Object.assign(this.filterCondition, parm))
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
    changeStateData () {

    },
    clearState () {

    },
    changeOrderId (parm) {
      this.filterCondition.newOrderId = parm
      this.$emit('update', this.filterCondition)
    },
    openLittleBatch () {
      this.$refs.littleBatchWrap.open()
    },
    changeShopData () {

    },
    dataBack (parm) {
      this.filterCondition[parm.keyName] = parm.samllList
      this.$emit('update', this.filterCondition)
    },
    dataBackProductTypeId (parm) { // 产品类别过滤
      this.filterCondition.productStatus = parm.bigList
      this.$emit('update', this.filterCondition)
    },
  }
}
</script>
<style lang="scss" src="./../../base/header.scss"></style>

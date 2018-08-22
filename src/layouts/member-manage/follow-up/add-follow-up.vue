<template>

<el-dialog top="10%" :visible.sync="isDialog" :class="currentStyle">
    <!-- 第一步 -->
    <big-small-class
      ref="bigSmallClassBox"
      v-show="currentLocation == 'bigSmallClass'"
      :checkData="checkData"
      @confirm="confirm"
      @cancel="cancel"
      @close="classClose"
    ></big-small-class>

    <!-- 第二步 -->
    <inputPush
      ref="inputPushBox"
      :followId="followId"
      :shopId="shopId"
      :userIdList="userIdList"
      :filterCondition="filterCondition"
      :userNameList="userNameList"
      :checkData="checkData"
      :advanced="advanced"
      :shopUserList="shopUserList"
      v-show="currentLocation == 'inputPush'"
      @selectUser="selectUser"
      @initAdvanced="initAdvanced"
      @initLeaderData="initLeaderData"
      @close="close"
      @successCall="successCall"
    ></inputPush>

    <chose-leader
      v-if="isDialog"
      v-show="currentLocation == 'choseLeader'"
      :headerTit="'选择会员'"
      :userIdList="userIdList"
      :initAdvanced="advanced"
      :shopId="shopId"
      :addModel="1"
      @close="toInputPush"
      @closeChoMember="closeChoLeader"
    ></chose-leader>

</el-dialog>
</template>
<script>
import bigSmallClass from './base/big-small-class'
import inputPush from './base/input-push'
import choseLeader from './../base/chose-leader'
import {seekGetShopUserList} from 'Api/commonality/seek'
import {groupName, extractIdList} from 'Api/commonality/filter'

export default {
  components: {
      bigSmallClass,
      inputPush,
      choseLeader
  },
  props: ['shopId'],
  data () {
    return {
      isDialog: false,
      currentLocation: 'bigSmallClass',
      followId: '', // 跟进id
      checkData: {
        bigClass: {},
        smallClass: {},
      },
      advanced: [], // 高级搜索数据
      shopUserList: [], // 店铺用户列表
      userIdList: [], // 选中的用户Id
      filterCondition: {}, // 选中的用户过滤条件 --> 普通条件
      userNameList: '' // 用户名
    }
  },
  computed: {
    currentStyle () {
      switch (this.currentLocation) {
        case 'bigSmallClass':
          return {
            'new-small-popup-dialog': true
          }
        default:
          return {
            'xj-input-dialog-bg': true
          }
      }
    }
  },
  watch: {
    isDialog () {
      if (!this.isDialog) {
        this.$emit('close')
      }
    }
  },
  methods: {
    successCall () {
      this.isDialog = false
      this.$emit('successCall')
    },
    // 关闭，还原数据
    classClose () {
      this.checkData = {
        bigClass: {},
        smallClass: {}
      },
      this.shopUserList = []
      this.userIdList = []
      this.userNameList = ''
      this.isDialog = false
    },
    open (parm) {
      this.isDialog = true
      if (parm) { // 编辑
        this.followId = parm.followId
        this.currentLocation = 'inputPush'
        setTimeout(() => {
          // 请求数据
          this.$refs.inputPushBox._seekTriggerFollowDetails()
        }, 0)
      } else { // 新建
        this.currentLocation = 'bigSmallClass'
      }
      this._seekGetShopUserList()
    },
    close () {
      if (this.followId) {
        this.isDialog = false
      } else {
        this.currentLocation = 'bigSmallClass'
      }
    },
    confirm (parm) {
      this.currentLocation = 'inputPush'
      this.checkData = parm
    },
    selectUser () {
      this.currentLocation = 'choseLeader'
    },
    cancel () {

    },
    initAdvanced (parm) {
      if (parm.length) {
        this.advanced = parm
      }
    },
    // 初始化会员数据
    initLeaderData (parm) {
      this.userIdList = extractIdList(parm, 'memberId')
      this.userNameList = groupName(parm, 'memberName')
    },
    toInputPush () {
      this.currentLocation = 'inputPush'
    },
    // 选择负责人
    closeChoLeader (parm) {
      let userName = ''
      for (let i of parm.nameList) {
        userName += userName ? `;${i}` : i
      }
      this.filterCondition = parm.filterCondition
      this.userIdList = parm.list
      this.userNameList = userName
      // 高级搜索筛选
      this.advanced = parm.advanced
      this.currentLocation = 'inputPush'
    },
    // 店铺人员列表
    _seekGetShopUserList () {
        let options = {
            page: 1,
            pageSize: 0,
            shopId: this.shopId
        }
        seekGetShopUserList(options).then((res) => {
            if (res.data.state == 200) {
              let datas = res.data.data.shopUserList
              for (let i of datas) {
                i.name = i.userName
                i.id = i.userId
              }
              this.shopUserList= datas
            }
        })
    }
  }
}
</script>
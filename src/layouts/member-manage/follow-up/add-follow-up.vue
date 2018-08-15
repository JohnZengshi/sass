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
      :userNameList="userNameList"
      :checkData="checkData"
      :shopUserList="shopUserList"
      v-show="currentLocation == 'inputPush'"
      @selectUser="selectUser"
      @initLeaderData="initLeaderData"
      @close="close"
    ></inputPush>

    <!-- 选择人员 -->
<!--     <el-dialog :modal="false" :visible.sync="isChoseLeader" top="15%" customClass="choseLeaderDig" :close-on-click-modal="false"> -->
      <chose-leader
        v-if="currentLocation == 'choseLeader'"
        :headerTit="'选择会员'"
        :userIdList="userIdList"
        :shopId="shopId"
        :addModel="1"
        @close="toInputPush"
        @closeChoMember="closeChoLeader"
      ></chose-leader>
<!--     </el-dialog> -->

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
      isDialog: true,
      currentLocation: 'bigSmallClass',
      followId: '', // 跟进id
      checkData: {
        bigClass: {},
        smallClass: {},
      },
      shopUserList: [], // 店铺用户列表
      userIdList: [], // 选中的用户Id
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
  methods: {
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
        setTimeout(() => {
          // 请求数据
          this.$refs.inputPushBox._seekFindMemberList()
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
      this.userIdList = parm.list
      this.userNameList = userName
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
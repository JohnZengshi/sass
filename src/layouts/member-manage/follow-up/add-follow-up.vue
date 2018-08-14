<template>
  <div>
    <!-- 第一步 -->
    <big-small-class
      ref="bigSmallClassBox"
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
      @selectUser="selectUser"
      @initLeaderData="initLeaderData"
      @close="close"
    ></inputPush>

    <!-- 选择人员 -->
    <el-dialog :modal="false" :visible.sync="isChoseLeader" top="15%" customClass="choseLeaderDig" :close-on-click-modal="false">
      <chose-leader
        :userIdList="userIdList"
        :shopId="shopId"
        :addModel="1"
        :isChoseLeader="isChoseLeader"
        @closeChoMember="closeChoLeader"
      ></chose-leader>
    </el-dialog>

  </div>
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
      followId: '', // 跟进id
      isChoseLeader: false,
      checkData: {
        bigClass: {},
        smallClass: {},
      },
      shopUserList: [], // 店铺用户列表
      userIdList: [], // 选中的用户Id
      userNameList: '' // 用户名
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
    },
    open (parm) {
      if (parm) { // 编辑
        this.followId = parm.followId
        setTimeout(() => {
          this.$refs.inputPushBox.open()
        }, 0)
      } else { // 新建
        this.$refs.bigSmallClassBox.open() 
      }
      this._seekGetShopUserList()
    },
    close () {
      this.$refs.bigSmallClassBox.close()
    },
    confirm (parm) {
      this.$refs.inputPushBox.open()
      this.checkData = parm
    },
    selectUser () {
      this.isChoseLeader = true
      // this.$refs.choseLeaderBox.open()
    },
    cancel () {

    },
    initLeaderData (parm) {
      this.userIdList = extractIdList(parm, 'memberId')
      this.userNameList = groupName(parm, 'memberName')
    },
    // 选择负责人
    closeChoLeader (parm) {
      let userName = ''
      for (let i of parm.nameList) {
        userName += userName ? `;${i}` : i
      }
      this.userIdList = parm.list
      this.userNameList = userName
      this.isChoseLeader = false
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
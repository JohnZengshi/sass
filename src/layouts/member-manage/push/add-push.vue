<template>
  <div>
    <!-- 第一步 -->
    <big-small-class ref="bigSmallClassBox" :checkData="checkData" @confirm="confirm" @cancel="cancel"></big-small-class>
    <!-- 第二步 -->
    <inputPush ref="inputPushBox" :shopId="shopId" :checkData="checkData" @selectUser="selectUser" @close="close"></inputPush>
    <!-- 选择人员 -->
    <el-dialog :modal="false" :visible.sync="isChoseLeader" top="15%" customClass="choseLeaderDig" :close-on-click-modal="false">
      <chose-leader
        :dataInfo="dataInfo"
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

export default {
  components: {
      bigSmallClass,
      inputPush,
      choseLeader
  },
  props: ['shopId'],
  data () {
    return {
      isChoseLeader: false,
      dataInfo: {
        principalList: []
      }, // 选中的用户id
      checkData: {
        bigClass: {
        },
        smallClass: {

        },
      },
    }
  },
  methods: {
    open () {
      this.$refs.bigSmallClassBox.open()
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
    // 选择负责人
    closeChoLeader (parm) {
      this.isChoseLeader = false
      let userList = []
      let datas = {
        principalList: []
      }
      for (let i of parm.list) {
        userList.push({
          userId: i
        })
        datas.principalList.push({userId: i})
      }
      this.dataInfo.principalList = userList
      this.dataInfo.principalName = ''
      for (let i of parm.nameList) {
        this.dataInfo.principalName += this.dataInfo.principalName ? `,${i}` : i
      }
      this._operateUpdateMember(datas)
    },
  }
}
</script>
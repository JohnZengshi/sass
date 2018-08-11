<!-- 切换外壳 -->
<template>
  <el-dialog top="7%" :visible.sync="isDialog" :class="currentStyle">
    <!-- 选择用户 -->
    <choose-user :isDialog="isDialog" v-show="currentLocation == 'chooseUser'" @confirm="cutBox" @close="close"></choose-user>
    <!-- 完成 -->
    <complete :isDialog="isDialog" v-show="currentLocation == 'complete'" :followList="checkedList" @close="close"></complete>
  </el-dialog>
</template>
<script>
import chooseUser from './choose-user'
import complete from './complete'
export default {
  components: {
    chooseUser,
    complete
  },
  props: ['shopId'],
  data() {
    return {
      checkedList: [],
      currentLocation: 'chooseUser',
      isDialog: false
    }
  },
  computed: {
    currentStyle () {
      switch (this.currentLocation) {
        case 'chooseUser':
          return {
            'xj-cut-dialog-bg': true
          }
        case 'complete':
          return {
            'xj-input-dialog-bg': true
          }
      }
    }
  },
  methods: {
    open(parm) {
      this.currentLocation = parm.index
      this.isDialog = true
      // this.$nextTick(() => {
      //   if (this.$refs.editorMemberBox) {
      //     this.$refs.editorMemberBox.open()
      //   }
      // })
    },
    close () {
      this.checkedList = []
      this.isDialog = false
    },
    cutBox (parm) {
      this.currentLocation = 'complete'
      this.checkedList = parm
    },
    goBack() {

    },
  }
}

</script>

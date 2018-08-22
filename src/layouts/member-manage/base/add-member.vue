<template>
  <el-dialog top="7%" :visible.sync="isDialog" class="xj-input-dialog-bg">
    <editorMember v-if="isDialog" ref="editorMemberBox" :memberId="currentMemberId" @close="close" @update="update" :shopId="shopId"></editorMember>
  </el-dialog>
</template>
<script>
import editorMember from './editor-member'
export default {
  components: {
    editorMember
  },
  props: ['shopId', 'orderNum', 'memberId'],
  data() {
    return {
      currentMemberId: '',
      isDialog: false
    }
  },
  methods: {
    open() {
      this.currentMemberId = this.memberId
      this.isDialog = true
      this.$nextTick(() => {
        if (this.$refs.editorMemberBox) {
          this.$refs.editorMemberBox.open()
        }
      })
    },
    close () {
      this.isDialog = false
    },
    update () {
      this.isDialog = false
      this.$emit('update')
    },
    goBack() {

    },
  }
}

</script>

<template>
  <el-dialog top="7%" :visible.sync="isDialog" class="xj-input-dialog-bg">
    <editorMember ref="editorMemberBox" @close="close" :shopId="shopId"></editorMember>
  </el-dialog>
</template>
<script>
import editorMember from './editor-member'
export default {
  components: {
    editorMember
  },
  props: ['shopId'],
  data() {
    return {
      isDialog: false
    }
  },
  methods: {
    open() {
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
    goBack() {

    },
  }
}

</script>

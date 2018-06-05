<template>
<div class="audit-popup" v-if="popupShow">
    <i class="el-icon-close" @click="hide"></i>
    <div class="audit-tittle">
        <img src="./../../../../../static/img/bohui.png">
        <div>{{title || '提示'}}</div>
    </div>
    <div class="audit-text" v-if="isTextarea">
        <textarea placeholder="请输入文字..." v-model="textareaData"></textarea>
    </div>
    <div class="text" v-else>
        <input type="text" placeholder="请输入" v-model="textareaData"></input>
    </div>
    <div class="audit-btn" @click="sureSubmit">确定</div>
</div>
</template>

<script>
export default{
  data() {
    return {
      textareaData : '',
      popupShow : false,
      isTextarea : true
    }
  },
  
  props : ['title','isShowPopup','isCopy'],
  
  watch: {
    isShowPopup : function(){
      this.popupShow = this.isShowPopup
      if(!this.isShowPopup) this.textareaData = ''
    },
    isCopy: function(){
      this.isTextarea = !this.isCopy
    }
  },
  
  methods: {
    sureSubmit () {
    	let that = this
      this.$emit('submit', this.textareaData)
      // if (this.textareaData.length < 1) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入备注内容'
      //   })
      // } else {
      //   this.$emit('submit', this.textareaData)
      // }
    },
    
    hide () {
      this.$emit('popupShow',false)
    }
  }
}
</script>

<style lang="scss" scoped>
.audit-popup { // 审核弹窗
    width: 320px;
    //height: 400px;
    background:#fff;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -160px;
    z-index: 200;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.1);
    &>i {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #bfcbd9;
        cursor: pointer;
    }
    .audit-tittle {
        width: 130px;
        height: 130px;
        margin: 0 auto;
        text-align: center;
        box-sizing: border-box;
        padding-top: 24px;
        img {
            height: 46px;
            width: 46px;
            margin-bottom: 15px;
            border-radius: 50%;
        }
        &>div {
            font-size: 12px;
            color:#333;
            font-weight: bold;
        }
    }
    .audit-text {
        margin:0 auto;
        width: 260px;
        height: 180px;
        textarea {
          width: 260px;
          height: 180px;
          background: #f6f7f8;
          box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1) inset;
          border-radius: 4px;
          padding: 10px;
          font-size: 14px;
          color: #666;
        }
        input {
          width: 260px;
          height: 30px;
          background: #f6f7f8;
          box-shadow: 0 0 5px 2px rgba(0,0,0,0.1) inset;
          border-radius: 4px;
          padding: 10px;
          font-size: 14px;
          color: #666;
        }
    }
    
    .text {
        margin:0 auto;
        width: 260px;
        input {
          width: 260px;
          height: 40px;
          background: #f6f7f8;
          box-shadow: 0 0 5px 2px rgba(0,0,0,0.1) inset;
          border-radius: 4px;
          padding: 10px;
          font-size: 14px;
          color: #666;
        }
    }
    .audit-btn {
        width: 150px;
        height: 28px;
        background:#2993f8;
        text-align: center;
        line-height: 28px;
        color:#fff;
        font-weight:bold;
        border-radius: 4px;
        margin: 30px auto;
        cursor: pointer;
    }
}
</style>
<!-- 操作按钮 -->
<template>
    <el-dialog :visible.sync="dialogVisible" :modal="modal" custom-class="dialogDom" element-loading-text="拼命加载中">
      <div class="p-operation-btn-main">
        <div class="dia-title" slot="title">
          <img src="~static/img/smartimport.png">
          <h3>{{ title }}</h3>
        </div>
        <div class="list-wrap first-wrap">
          <ul id="btn-wrap" class="btn-wrap">
            <li v-for="item in operationList" @click="confirm(item)">{{item.name}}</li>
            <!-- <li :class="!rkRole ? 'disabledActive' : ''" @click="RkClick(titleStr)">{{ aClickType }}</li>
            <li :class="!xsRole ? 'disabledActive' : ''" @click="XSClick(titleStr)">{{ aClickType }}</li>
            <li :class="!hyRole ? 'disabledActive' : ''" @click="HYClick(titleStr)">{{ aClickType }}</li> -->
          </ul>
        </div>
        <div class="p-operation-btn-bottom">
          <div class="e-border-radio-5">
            <el-checkbox v-model="cost">是否导出成本</el-checkbox>
          </div>
        </div>

      </div>
    </el-dialog>
</template>
<script>
  export default {
    props: ['operationList', 'modal', 'title'],
    data () {
      return {
        cost: false,
        dialogVisible: false
      }
    },
    methods: {
      open () {
        this.dialogVisible = true
      },
      close () {
        this.dialogVisible = false
      },
      confirm (parm) {
        this.$emit('confirm', Object.assign(parm, {cost: this.cost}))
      }
    }
  }
</script>
<style lang="scss">
.p-operation-btn-main{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // top: 50%;
    // left: 50%;
    // border: 2px solid blue;
    // transform:translate(-50%,-50%);
    background: #fff;
    z-index: 10;
    >.dia-title {
        width: 78px;
        position: absolute;
        top: 24px;
        left: 50%;
        margin-left: -39px;
        img {
            display: block;
            margin: 0 auto;
            width: 46px;
            height: 46px;
            margin-bottom: 12px;
        }
        h3 {
          font-size: 12px;
          color: #333;
          text-align: center;
        }
    }
    .list-wrap{
        width: 320px;
        height: 271px;
        padding-top: 150px;
        margin-bottom: 130px;
        .btn-wrap{
            width: 180px;
            margin: 0 auto;
            li{
              display: block;
              height: 40px;
              font-style: normal;
              text-align: center;
              background-color: #f4f4f4;
              color: #2993f8;
              font-size: 14px;
              line-height: 40px;
              border-radius: 4px;
              cursor: pointer;
              transition: all 0.6s;
              margin-bottom: 40px;
              &:hover{
                  background-color: #2993f8;
                  color: #fff;
              }
            }
        }
    }
    .e-border-radio-5{
        height: 28px;
        padding-bottom: 20px;
        font-size: 14px;
        overflow: hidden;
        vertical-align: top;
    }
    .p-operation-btn-bottom{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10px;
      height: 30px;
      padding-left: 71px;
      overflow: hidden;
    }
}
</style>
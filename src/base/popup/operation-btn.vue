<!-- 操作按钮 -->
<template>
    <el-dialog :visible.sync="dialogVisible" custom-class="dialogDom" element-loading-text="拼命加载中">
      <div class="p-operation-btn-main">
        <div class="dia-title" slot="title">
          <img src="~static/img/smartimport.png">
          <h3>选择{{ titleStr }}类型</h3>
        </div>
        <div class="list-wrap first-wrap">
          <div id="btn-wrap" class="btn-wrap">
            <li :class="!rkRole ? 'disabledActive' : ''" @click="RkClick(titleStr)">入库{{ aClickType }}</li>
            <li :class="!xsRole ? 'disabledActive' : ''" @click="XSClick(titleStr)">销售单{{ aClickType }}</li>
            <li :class="!hyRole ? 'disabledActive' : ''" @click="HYClick(titleStr)">会员{{ aClickType }}</li>
          </div>
        </div>
        </div>
    </el-dialog>
</template>
<script>
  export default {

  }
</script>
<style lang="scss">
.p-operation-btn-main{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    background: #fff;
    z-index: 10;
    >.dia-title {
        position: absolute;
        top:24px;
        left: 50%;
        margin-left: -45px;
        img {
            display: block;
            margin: 0 auto;
            width: 46px;
            height: 46px;
            margin-bottom: 12px;
        }
        h3 {
            font-size: 12px;
            color:#333;
            text-align: center;
        }
    }
}
</style>
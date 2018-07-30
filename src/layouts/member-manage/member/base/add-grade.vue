<!-- 新增店铺组合 -->
<template>
  <div>
    <memberDialog v-show="dialog.dialogVisible" :dialog="dialog" @closeDialog="closeDialog" @dialogType="dialogType" @dialogCallback="dialogCallback"></memberDialog>
    <el-dialog v-show="!dialog.dialogVisible" top="10%" :visible.sync="isDialog" class="new-popup-dialog">
      <div class="m-m-add-group-main">
        <div class="p-close-icon" @click="isDialog = false">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="add-group-body">
          <h3>新增会员等级</h3>
          <div class="input-wrap">
            <span class="item-label"><i class="mandatory-icon">*</i>等级名称</span>
            <input placeholder="请输入级别名称" v-model="showData.gradeName">
          </div>
          <div class="input-wrap">
            <span class="item-label"><i class="mandatory-icon">*</i>起始积分</span>
            <input type="Number" placeholder="升级到当先级别需要积分" v-model="showData.startScore">
          </div>
          <div class="input-wrap">
            <span class="item-label"><i class="mandatory-icon">*</i>下一级别</span>
            <down-menu :isSolid="true" :titleInfo="showData.nextGradeName ? showData.nextGradeName : '请选择'" :showList="shopList" :nameKey="'gradeName'" @changeData="change" @clearInfo="clear"></down-menu>
          </div>
          <div class="input-wrap">
            <span class="item-label">设置最低折扣</span>
            <!--       <input type="Number" placeholder="请输入" v-model="name" @click="openSellDiscount"> -->
          </div>
          <sell-discount :isDialog="isDialog" ref="sellDiscountBox" @setClass="setClass" @close="discountClose" @confirm="discountConfirm"></sell-discount>
        </div>
        <div class="xj-btn-list">
          <div class="btn cnacel-btn" @click="close">取消</div>
          <div class="btn" @click="confirm">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { seekGetShopListByCo } from 'Api/commonality/seek'
import downMenu from 'base/menu/new-down-menu'
import sellDiscount from './sell-discount'
import memberDialog from '@/layouts/Work/ShopSetting/dialog/tplGoldDialog'
export default {
  components: {
    downMenu,
    sellDiscount,
    memberDialog
  },
  data() {
    return {
      showData: {
        gradeName: '',
        startScore: '',
        gradeId: '',
        nextGradeName: '',
        poductList: []
      },
      issellDiscountBox: false,
      checkList: [],
      shopList: [],
      name: '',
      isDialog: false,
      // 弹框数据
      dialog: {
        dialogVisible: false,
        dialogSize: 'counter_x_small',
        dialogSlot: '',
        addCounterName: '',
        smallDataList: []
      },
    }
  },
  methods: {
    setClass(parm) {
      this.dialog = parm
    },
    closeDialog(parm) {
      this.$refs.sellDiscountBox.closeDialog(parm)
    },
    dialogType(parm) {
      this.$refs.sellDiscountBox.dialogType(parm)
    },
    dialogCallback(parm) {
      this.$refs.sellDiscountBox.dialogCallback(parm)
    },
    open(parm) {
      this.checkList = []
      this.isDialog = true
      // if (this.$refs.sellDiscountBox) {
      //   this.$refs.sellDiscountBox.initData() 
      // }
    },
    discountClose() {
      this.issellDiscountBox = false
    },
    discountConfirm(parm) {
      this.issellDiscountBox = false
    },
    openSellDiscount() {
      this.issellDiscountBox = true
      // this.$refs.sellDiscountBox.open()
    },
    change() {

    },
    clear() {

    },
    close() {
      this.checkList = []
      this.name = ''
      this.isDialog = false
    },
    confirm() {

      if (this.showData.gradeName) {
        this.$message({
          type: 'error',
          message: '请输入级别名称'
        })
      }

      if (this.showData.startScore) {
        this.$message({
          type: 'error',
          message: '请输入起始积分'
        })
      }

      if (this.showData.gradeId) {
        this.$message({
          type: 'error',
          message: '请选择下一级别'
        })
      }

      let opations = {
        name: this.name,
        list: []
      }
      for (let i of checkList) {
        let datas = {
          shopId: i
        }
        opations.list.push(datas)
      }
    },
    _seekGetShopListByCo() {
      let opations = {
        page: 1,
        pageSize: '0',
        type: '1'
      }
      seekGetShopListByCo(opations)
        .then(res => {
          if (res.data.state == 200) {
            this.shopList = res.data.data.shopList
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    }
  }
}

</script>
<style lang="scss">
.m-m-add-group-main {
  .el-checkbox {
    height: 40px!important;
    line-height: 40px!important;
  }
  .el-checkbox-group .el-checkbox__inner {
    border-radius: 5px!important;
  }
  .el-checkbox-group {
    .el-checkbox__label {
      font-size: 14px!important;
      font-weight: normal;
    }
  }
}

</style>
<style lang="scss" scoped>
.m-m-add-group-main {
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 30px;
  position: relative;
  .p-close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 20px;
    width: 20px;
    cursor: pointer;
    >i {
      color: #bfcbd9;
    }
  }
  .add-group-body {
    height: 660px;
    >h3 {
      line-height: 1;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #333;
    }
    >.input-wrap {
      width: 300px;
      display: inline-block;
      margin-bottom: 20px;
      .item-label {
        display: inline-block;
        width: 90px;
        font-size: 14px;
        line-height: 28px;
      }
      input {
        height: 28px;
        background-color: transparent;
        font-size: 14px;
        border-radius: 3px;
        text-indent: 10px;
        border: 1px solid #d6d6d6;
        &:active,
        &:hover,
        &:focus {
          border: 1px solid #2993f8;
          background-color: #f4f9ff;
        }
      }
    }
  }
}

.wrap-popup-text {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: red;
}

</style>

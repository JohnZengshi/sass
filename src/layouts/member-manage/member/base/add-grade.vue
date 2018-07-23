<!-- 新增店铺组合 -->
<template>
  <el-dialog top="7%" :visible.sync="isDialog" class="xj-input-dialog">
    <div class="m-m-add-group-main">
      <div class="p-close-icon" @click="isDialog = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </div>
      <div class="add-group-body">
        <h3>新增会员等级</h3>

        <div class="input-wrap">
          <span class="item-label">等级名称</span>
          <input placeholder="请输入级别名称" v-model="name">
        </div>

        <div class="input-wrap">
          <span class="item-label">起始积分</span>
          <input type="Number" placeholder="升级到当先级别需要积分" v-model="name">
        </div>

        <div class="input-wrap">
          <span class="item-label">下一级别</span>
          <down-menu
            :isSolid="true"
            :titleInfo="name ? name : '请选择'"
            :showList="shopList"
            :nameKey="'shopName'"
            @changeData="change"
            @clearInfo="clear"
          ></down-menu>
        </div>

        <div class="input-wrap">
          <span class="item-label">设置最低折扣</span>
          <input type="Number" placeholder="请输入" v-model="name" @click="openSellDiscount">
        </div>

        <sell-discount
          ref="sellDiscountBox"
          :isDialog="isDialog"
          @close="discountClose"
          @confirm="discountConfirm"
        ></sell-discount>

      </div>
      <div class="xj-btn-list">
        <div class="btn cnacel-btn" @click="close">取消</div>
        <div class="btn" @click="confirm">确定</div>
      </div>

    </div>
  </el-dialog>
</template>
<script>
import { seekGetShopListByCo } from 'Api/commonality/seek'
import downMenu from 'base/menu/new-down-menu'
import sellDiscount from './sell-discount'
export default {
  components: {
    downMenu,
    sellDiscount
  },
  data() {
    return {
      issellDiscountBox: false,
      checkList: [],
      shopList: [],
      name: '',
      isDialog: false
    }
  },
  methods: {
    open (parm) {
      this.checkList = []
      this.isDialog = true
      // if (this.$refs.sellDiscountBox) {
      //   this.$refs.sellDiscountBox.initData() 
      // }
    },
    discountClose () {
      this.issellDiscountBox = false
    },
    discountConfirm (parm) {
      this.issellDiscountBox = false
    },
    openSellDiscount () {
      this.issellDiscountBox = true
      // this.$refs.sellDiscountBox.open()
    },
    change () {

    },
    clear () {

    },
    close () {
      this.checkList = []
      this.name = ''
      this.isDialog = false
    },
    confirm () {
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
.m-m-add-group-main{
  .el-checkbox{
    height: 40px!important;
    line-height: 40px!important;
  }
  .el-checkbox-group .el-checkbox__inner{
    border-radius: 5px!important;
  }
  .el-checkbox-group {
    .el-checkbox__label{
        font-size: 14px!important;
        font-weight: normal;
    }
  }
}
</style>
<style lang="scss" scoped>
.m-m-add-group-main {
  height: 100%;
  width: 700px;
  height: 730px;
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
    .input-wrap {
      width: 300px;
      margin-bottom: 34px;
      .item-label {
        display: inline-block;
        width: 90px;
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

</style>

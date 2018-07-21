<!-- 新增店铺组合 -->
<template>
  <el-dialog top="7%" :visible.sync="isDialog" class="xj-input-dialog">
    <div class="m-m-add-group-main">
      <div class="p-close-icon" @click="isDialog = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </div>
      <div class="add-group-body">
        <h3>添加会员</h3>
        <div class="input-wrap">
          <span class="item-label">组合名称</span>
          <input placeholder="请输入组合名称" v-model="name">
        </div>
        <div class="shop-list">
          <h5>选择店铺</h5>
          <ul class="list-wrap">
              <el-checkbox-group v-model="checkList">
                  <li v-for="(item, index) in shopList">
                     <el-checkbox :label="item.shopId" :class="{active: true}" style="font-size: 14px;">{{item.shopName}}</el-checkbox>
                  </li>
              </el-checkbox-group>
          </ul>
        </div>
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
export default {
  data() {
    return {
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
      this._seekGetShopListByCo()
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
        width: 80px;
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
    .shop-list {
      .list-wrap {
        height: 460px;
        margin: 20px;
        overflow: scroll;
        li {
          height: 40px;
          padding: 0 10px;
          display: inline-block;
          line-height: 40px;
          border: 1px solid #d6d6d6;
          text-align: left;
          padding-left: 14px;
          font-size: 14px;
          border-bottom: 1px solid #f1f2f3;
          cursor: pointer;
          margin-right: 10px;
          &:hover {
            background: #f6f7f8;
            color: #3195f5;
          }
        }
        li.active {
          color: #2993f8;
        }
      }
    }
  }
}

</style>

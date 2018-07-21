<template>
  <div class="m-m-template-shop-main">
    <div class="input-wrap">
      <span class="item-label">模板名称</span>
      <input maxlength="8" placeholder="请输入模板名称" v-model="name">
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

      <h5>积分清零规则</h5>
      <ul class="list-wrap">
        <el-checkbox-group v-model="checkRule">
          <li v-for="(item, index) in ruleList">
            <el-checkbox :label="item.id" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </ul>

      <h5>设置折扣方式</h5>
      <ul class="list-wrap">
        <el-checkbox-group v-model="checkDiscount">
          <li v-for="(item, index) in discountList">
            <el-checkbox :label="item.id" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </ul>

      <h5>
        会员等级默认模板
        <span @click="openGrade">+级别</span>
      </h5>
      
      <ul>
        <li class="input-wrap" v-for="item in gradeList">
          <span class="item-label">{{item.name}}</span>
          <input placeholder="请输入模板名称" v-model="item.value">
          <i class="iconfont icon-bianji bianji" @click="openGrade(item)"></i>
        </li>
      </ul>

      <div @click="toMemberSetting">
        会员积分配置
      </div>

    </div>

    <add-grade ref="addGradeBox"></add-grade>

  </div>
</template>
<script>
import addGrade from './add-grade'
import { seekGetShopListByCo } from 'Api/commonality/seek'
export default {
  components: {
    addGrade
  },
  data() {
    return {
      name: '',
      shopList: [],
      checkList: [],
      checkRule: [],
      checkDiscount: [],
      ruleList: [
        {
          name: '一年内无消费行为',
          id: '1'
        },
        {
          name: '一年内无消耗行为',
          id: '2'
        },
        {
          name: '一年内无消耗行为',
          id: '3'
        }
      ],
      discountList: [
        {
          name: '折上折',
          id: '1'
        },
        {
          name: '最低折扣',
          id: '2'
        }
      ],
      gradeList: [
        {
          name: '普卡',
          value: '100',
          id: '1'
        },
        {
          name: '银卡',
          value: '1000',
          id: '2'
        }
      ],
    }
  },
  created() {
    this._seekGetShopListByCo()
  },
  methods: {
    _seekGetShopListByCo () {
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
    },
    toMemberSetting () {
      this.$router.push({
        path: '/work/memberSettingIndex',
        query: {
          templateId: 'a436606db0974f68a365966a3fbffb25',
          type: 1
        }
      })
    },
    openGrade (parm) {
      if (parm.id) {
        this.$refs.addGradeBox.open(parm)
      } else {
        this.$refs.addGradeBox.open()
      }
    }
  }
}

</script>
<style lang="scss">
.m-m-template-shop-main {
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
.m-m-template-shop-main {
  // height: 200px;
  margin: 15px 0 0 15px;
  .input-wrap {
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
      width: 170px;
      border: 1px solid #d6d6d6;
      &:active,
      &:hover,
      &:focus {
        border: 1px solid #2993f8;
        background-color: #f4f9ff;
      }
    }
    i{
      transition: all .3s;
      cursor: pointer;
      &:hover{
        color: #2993f8;
      } 
    }
    .bianji{
      float: right;
    }
  }
  .shop-list {
    .list-wrap {
      min-height: 60px;
      max-height: 160px;
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

</style>

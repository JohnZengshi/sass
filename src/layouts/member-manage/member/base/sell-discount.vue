<!-- 新增店铺组合 -->
<template>
  <div class="m-m-sell-discount-main">
    <div v-for="item in productTypeList">
      <h6>{{item.classesName}}</h6>
      <ul v-for="list in item.typeList">
          <li>
            {{list.classesName}}
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { seekGetShopListByCo, getProductTypeList } from 'Api/commonality/seek'
export default {
  props: ['isDialog'],
  data() {
    return {
      productTypeList: [],
      checkList: [],
      shopList: [],
      name: ''
    }
  },
  // watch: {
  //   isDialog () {
  //     this._getProductTypeList()
  //   }
  // },
  created () {
    this._getProductTypeList()
  },
  methods: {
    open (parm) {
      this.checkList = []
      this._seekGetShopListByCo()
    },
    close () {
      this.checkList = []
      this.name = ''
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
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
    },
    _getProductTypeList () {
      getProductTypeList()
        .then(res => {
          if (res.data.state == 200) {
            debugger
            this.productTypeList = res.data.data.list
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
.m-m-sell-discount-main{
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
.m-m-sell-discount-main {
  border: 1px solid red;
  background-color: #fff;
  position: relative;
  height: 350px;
  overflow: scroll;
  >div{
    h5{
      font-size: 16px;
    }
    ul{
      li{
        display: inline-block;
        height: 80px;
      }
    }
  }
  // .sell-discount-body {
  //   height: 660px;
  //   >h3 {
  //     line-height: 1;
  //     font-size: 16px;
  //     font-weight: 700;
  //     margin-bottom: 20px;
  //     color: #333;
  //   }
  //   .product-list{
  //     border: 1px solid red;
  //   }
  //   .input-wrap {
  //     width: 300px;
  //     margin-bottom: 34px;
  //     .item-label {
  //       display: inline-block;
  //       width: 90px;
  //     }
  //     input {
  //       height: 28px;
  //       background-color: transparent;
  //       font-size: 14px;
  //       border-radius: 3px;
  //       text-indent: 10px;
  //       border: 1px solid #d6d6d6;
  //       &:active,
  //       &:hover,
  //       &:focus {
  //         border: 1px solid #2993f8;
  //         background-color: #f4f9ff;
  //       }
  //     }
  //   }
  //   .shop-list {
  //     .list-wrap {
  //       height: 460px;
  //       margin: 20px;
  //       overflow: scroll;
  //       li {
  //         height: 40px;
  //         padding: 0 10px;
  //         display: inline-block;
  //         line-height: 40px;
  //         border: 1px solid #d6d6d6;
  //         text-align: left;
  //         padding-left: 14px;
  //         font-size: 14px;
  //         border-bottom: 1px solid #f1f2f3;
  //         cursor: pointer;
  //         margin-right: 10px;
  //         &:hover {
  //           background: #f6f7f8;
  //           color: #3195f5;
  //         }
  //       }
  //       li.active {
  //         color: #2993f8;
  //       }
  //     }
  //   }
  // }
}

</style>

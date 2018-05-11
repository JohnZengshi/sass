<template>
  <div class="serve-data-grid-body-main">
    <div style="min-height: 430px; padding-bottom: 200px;">
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div v-for="item in userData.orderList">
          <h5 v-if="item.orderType == 1" :class="{'is-seek': item.isSeek == 'Y'}">{{item.orderNo}}</h5>
          <h5 v-if="item.orderType == 2" style="background-color: #fff3e3" :class="{'is-seek': item.isSeek == 'Y'}">{{item.orderNo}}</h5>
          <h5 v-if="item.orderType == 3" :class="{'is-seek': item.isSeek == 'Y'}">外来商品</h5>
          <ul class="sever-product-list-wrap" :class="{'on-compile-product': !filterType(product.productType)}" v-for="(product, index) in item.productList">
            <li>{{product.productName}}
              <i class="product-type" :class="{
                'state-one': product.productType == 1,
                'state-two': product.productType == 2,
                'state-three': product.productType == 3,
                'state-four': product.productType == 4
              }" v-if="product.productType">{{filterProductType(product.productType)}}</i>
            </li>

            <li>
              {{product.barcode}}
              <i v-if="!product.barcode" class="no-data-line"></i>
            </li>

            <li>
              {{product.classesType == 1 ? product.goldWeight : product.weight}}
              <i v-if="product.classesType == 1 ? !product.goldWeight : !product.weight" class="no-data-line"></i>
            </li>

            <li>
              {{product.price}}
              <i v-if="!product.price" class="no-data-line"></i>
            </li>

            <li>
              <DownMenu
                :productType="filterType(product.productType)"
                :showList="showList"
                :noClear="true"
                :product="product"
              ></DownMenu>
            </li>
            <li>
              <el-checkbox v-if="filterCheckbox(product.productType, product.serviceId, product.serviceTypeId)" :label="product.productId" style="font-size: 0">
                
              </el-checkbox>

              <label v-else class="no-check-tit" :class="{
                'cursor-h': filterProductType(product.productType)}">
                <span v-if="filterType(product.productType)" @click="titChect"></span>
                <span v-else style="cursor: auto"></span>
              </label>

            </li>
          </ul>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import DownMenu from './DownMenu'
import {seekGetServiceTypeList} from 'Api/commonality/seek'
export default{
  components: {
    DownMenu
  },
  props: ['userData'],
  data () {
    return {
      showList: [],
      checkedCities: [],
      name: ''
    }
  },
  mounted () {
    $(".serve-data-grid-body-main").mCustomScrollbar({
      axis: 'y',
      theme: "minimal-dark",
      autoHideScrollbar: true,
      scrollInertia: 500,
      mouseWheel: {
        scrollAmount: 200,
        preventDefault: false,
        normalizeDelta: false
      },
      advanced: {
        updateOnSelectorChange: "div",
        updateOnContentResize: true
      },
      callbacks: {
        onScrollStart: function() {
          
        }
      }
    })
  },
  created () {
    this._seekGetServiceTypeList()
  },
  methods: {
    filterType (parm) {
      return parm ? parm == 1 : true
    },
    filterCheckbox (productType, serviceId, serviceTypeId) {
      console.log('productType', productType)
      console.log('serviceId', serviceId)
      console.log('serviceTypeId', serviceTypeId)
      console.log('this.filterType(productType)', this.filterType(productType))
      if (this.filterType(productType)) {
        if (serviceId || serviceTypeId) {
          return true
        }
      }
      return false
    },
    _seekGetServiceTypeList () {
        seekGetServiceTypeList().then((res) => {
            if (res.data.state == 200) {
                this.showList = res.data.data.classesList[0].dataList
            } else {
                this.$message({
                   message: res.data.msg,
                   type: 'warning'
                })
            }
        })
    },
    initCheck (parm) {
      for (let i of parm) {
        for (let j of i.productList) {
          this.checkedCities.push(j.productId)
        }
      }
      this.$emit('updateData', this.checkedCities)
    },
    filterProductType (parm) {
      switch (parm) {
        case '1':
          return '销售'
        case '2':
          return '退货'
        case '3':
          return '回收'
        case '4':
          return '换货'
      }
    },
    // 选中数据
    changeShopData (parm) {

    },
    // 清除数据
    clearShopData (parm) {

    },
    handleCheckedCitiesChange (parm) {
      this.$emit('updateData', this.checkedCities)
    },
    titChect () {
      this.$message({
        message: '请选择售后类型',
        type: 'warning'
      })
    }
  }
}
</script>
<style lang="scss">
.serve-data-grid-body-main{
  .el-checkbox{
    vertical-align: top;
    margin-top: 17px;
    height: 20px!important;
    line-height: 20px!important;
  }
  .el-checkbox__inner{
    border-radius: 2px!important;
  }
}
.mCustomScrollBox{
  border-radius: 0!important;
}
</style>
<style lang="scss" scoped>
.serve-data-grid-body-main{
  height: 430px;
  // border: 1px solid red;
  h5{
    height: 20px;
    padding-left: 14px;
    line-height: 20px;
    font-size: 11px;
    color: #666;
    background-color: #eef7fe;
  }
  .is-seek{
    background-color: #fff3e3;
  }
  .sever-product-list-wrap{
    height: 54px;
    >li{
      height: 100%;
      line-height: 54px;
      float: left;
      font-size: 14px;
      text-align: center;
      color: #040404;
      position: relative;
      .no-data-line{
        display: block;
        // position: absolute;
        // top: 0;
        // bottom: 0;
        // right: 0;
        // left: 0;
        margin-top: 25px;
        height: 1px;
        width: 50px;
        background-color: #dedede;
      }
      >.product-type{
        display: inline-block;
        font-style: normal;
        padding: 2px 4px;
        border-radius: 2px;
        font-size: 12px;
        line-height: 12px;

      }
      .state-one{
        background-color: #dcedfe;
        color: #2993f8;
      }
      .state-two{
        background-color: #ffe9ff;
        color: #c46de8;  
      }
      .state-three{
        background-color: #fee5ea;
        color: #ff607e; 
        
      }
      .state-four{
        background-color: #feede5;
        color: #fd914f; 
      }
      .product-type-one{
        color: #fff;
        background-color: #ffa200;
      }
      .no-check-tit{
        vertical-align: top;
        margin-top: 17px;
        height: 20px;
        line-height: 20px;
        font-size: 0;
        text-align: center;
        display: inline-block;
        position: relative;
        white-space: nowrap;
        span{
          display: inline-block;
          position: relative;
          border: 1px solid #bfcbd9;
          border-radius: 2px;
          box-sizing: border-box;
          width: 18px;
          height: 18px;
          text-align: center;
          margin-left: -5px;
          margin-top: 1px;
          background-color: #fff;
          z-index: 1;
        }
      }

      .cursor-h{
        cursor: pointer;
      }
                                      
    }
    >li:nth-child(1){
      padding-left: 14px;
      width: 190px;
      text-align: left;
      overflow: hidden;
      white-space:nowrap; 
      text-overflow:ellipsis; 
    }
    >li:nth-child(2){
      width: 120px;
      overflow: hidden;
      white-space:nowrap; 
      text-overflow:ellipsis; 
    }
    >li:nth-child(3){
      width: 82px;
      text-align: left;
      overflow: hidden;
      white-space:nowrap; 
      text-overflow:ellipsis; 
    }
    >li:nth-child(4){
      width: 76px;
      overflow: hidden;
      white-space:nowrap; 
      text-overflow:ellipsis; 
    }
    >li:nth-child(5){
      width: 118px;
    }
    >li:nth-child(6){
      width: 54px;
    }
  }
  .on-compile-product{
    >li{
      color: #dedede;
    }
  }
}
</style>
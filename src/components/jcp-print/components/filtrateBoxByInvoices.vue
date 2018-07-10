<template>
<!-- 打印单据筛选条件 -->
  <div>
    <!-- 入库 -->
    <template v-if="title == '入库'">
      <div class="explain-box" v-if="
          (headerData.orderNum != '') ||
          (headerData.storageName != '') ||
          (headerData.supplierName != '') ||
          (headerData.shopName != '') ||
          (headerData.makeOrderManName != '') ||
          (headerData.checkName)">
        <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
        </div>
        <div v-show="headerData.storageName">修改库位：{{headerData.storageName}}
        </div>
        <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
        </div>
        <div v-show="headerData.checkName">审核人：{{headerData.checkName}}
        </div>
      </div>
    </template>
    <!-- 修改 -->
    <template v-else-if="title == '修改'">
      <div class="explain-box" v-if="
          (headerData.orderNum != '') ||
          (headerData.storageName != '') ||
          (headerData.makeOrderManName != '') ||
          (headerData.checkName)">
          <!-- 审核人 -->
        <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
        </div>
        <div v-show="headerData.storageName">入库库位：{{headerData.storageName}}
        </div>
        <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
        </div>
        <div v-show="headerData.checkName">审核人：{{headerData.checkName}}
        </div>
      </div>
    </template>
    <!-- 销售 -->
    <template v-else-if="title == '销售'">
      <!-- 单据号，店铺名称，制单人，销售员，收银员 -->
      <div class="explain-box" v-if="
          (headerData.orderNum != '') ||
          (headerData.storageName != '') ||
          (headerData.makeOrderManName != '') ||
          (headerData.sellManName != '') ||
          (headerData.cashName)">
          <!-- 审核人 -->
        <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
        </div>
        <div v-show="headerData.storageName">店铺名称：{{headerData.storageName}}
        </div>
        <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
        </div>
        <div v-show="headerData.sellManName">销售员：{{headerData.sellManName}}
        </div>
        <div v-show="headerData.cashName">收银员：{{headerData.cashName}}
        </div>
      </div>
    </template>
    <!-- 其他 -->
    <template v-else-if="reportType">
      <!-- 退库 -->
      <template v-if="reportType == 2">
        <div class="explain-box" v-if="
                    (headerData.orderNum != '') ||
                    (headerData.storageName != '') ||
                    (headerData.makeOrderManName != '') ||
                    (headerData.productProperty != '') || 
                    (headerData.checkName)">
          <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
          </div>
          <div v-show="headerData.storageName">退库库位：{{headerData.storageName}}
          </div>
          <div v-show="headerData.productProperty">商品属性：{{headerData.productProperty == "1" ? "成品" : "旧料"}}
          </div>
          <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
          </div>
          <div v-show="headerData.checkName">审核人：{{headerData.checkName}}
          </div>
        </div>
      </template>
      <!-- 调库 -->
      <template v-if="reportType == 3">
        <!-- 单据号，调出库位，调入库位，商品属性（成品/旧料），制单人，收货人 -->
        <div class="explain-box" v-if="
                    (headerData.orderNum != '') ||
                    (headerData.storageName != '') ||
                    (headerData.storageName2 != '') ||
                    (headerData.productProperty != '') ||
                    (headerData.makeOrderManName != '') ||
                    (headerData.productProperty != '') || 
                    (headerData.checkName)">
          <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
          </div>
          <div v-show="headerData.storageName">调出库位：{{headerData.storageName}}
          </div>
          <div v-show="headerData.storageName2">调入库位：{{headerData.storageName2}}
          </div>
          <div v-show="headerData.productProperty">商品属性：{{headerData.productProperty == '1'? "成品":"旧料"}}
          </div>
          <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
          </div>
          <!-- <div v-show="headerData.checkName">收货人：{{headerData.checkName}}
          </div> -->
        </div>
      </template>
      <!-- 发货,退货 -->
      <template v-if="reportType == 4">
        <template v-if="title == '发货'">
          <!-- 单据号，发货库位，店铺名称（收货之后+柜组），制单人，审核人，收货人 -->
          <div class="explain-box" v-if="
                            (headerData.orderNum != '') ||
                            (headerData.storageName != '') ||
                            (headerData.shopName != '') ||
                            (headerData.makeOrderManName != '') ||
                            (headerData.checkName)">
            <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
            </div>
            <div v-show="headerData.storageName">发货库位：{{headerData.storageName}}
            </div>
            <div v-show="headerData.shopName">店铺名称：{{headerData.shopName}}
            </div>
            <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
            </div>
            <div v-show="headerData.checkName">审核人：{{headerData.checkName}}
            </div>
            <!-- <div v-show="headerData.auditor">收货人：{{headerData.auditor}}
                  </div> -->
          </div>
        </template>
        <template v-else-if="title == '退货'">
          <!-- 单据号，店铺名称，退入库位，商品属性，制单人，审核人，收货人 -->
          <div class="explain-box" v-if="
                            (headerData.orderNum != '') ||
                            (headerData.shopName != '') ||
                            (headerData.storageName != '') ||
                            (headerData.productProperty != '') ||
                            (headerData.checkName)">
            <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
            </div>
            <div v-show="headerData.shopName">店铺名称：{{headerData.shopName}}
            </div>
            <div v-show="headerData.storageName">退入库位：{{headerData.storageName}}
            </div>
            <div v-show="headerData.productProperty">商品属性：{{headerData.productProperty == '1'?"成品":"旧料"}}
            </div>
            <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
            </div>
            <div v-show="headerData.checkName">审核人：{{headerData.checkName}}
            </div>
            <!-- <div v-show="headerData.auditor">收货人：{{headerData.auditor}}
                  </div> -->
          </div>
        </template>
      </template>
      <!-- 调柜 -->
      <template v-if="reportType == 5">
        <!-- 单据号，店铺名称，调出柜组，调入柜组，商品属性，制单人 -->
        <div class="explain-box" v-if="
                    (headerData.orderNum != '') ||
                    (headerData.distributor != '') ||
                    (headerData.groupName != '') ||
                    (headerData.groupName2 != '') ||
                    (headerData.productProperty != '') ||
                    (headerData.makeOrderManName != '')">
          <div v-show="headerData.orderNum">单据号：{{headerData.orderNum}}
          </div>
          <div v-show="headerData.distributor">店铺名称：{{headerData.distributor}}
          </div>
          <div v-show="headerData.groupName">调出柜组：{{headerData.groupName}}
          </div>
          <div v-show="headerData.groupName2">调入柜组：{{headerData.groupName2}}
          </div>
          <div v-show="headerData.productProperty">商品属性：{{headerData.productProperty == '1'?'成品':'旧料'}}
          </div>
          <div v-show="headerData.makeOrderManName">制单人：{{headerData.makeOrderManName}}
          </div>
        </div>
      </template>
      <template v-if="reportType == 6">
        
      </template>
    </template>

  </div>

</template>
<script>
  export default {
    props: ["headerData","title","reportType"]
  }

</script>
<style lang="less" scoped>
  .explain-box {
    width: 100%;
    border: 1px solid;
    border-top: none;
    border-bottom: none;
    padding: 10px 5px;
    box-sizing: border-box;
    div {
      display: inline-block;
      width: 33%;
      margin-bottom: 10px;
      &:nth-last-of-type(3),
      &:nth-last-of-type(2),
      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }
  }

</style>

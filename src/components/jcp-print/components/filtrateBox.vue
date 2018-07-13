<template>
<!-- 打印报表筛选条件 -->
  <div>
    <!-- 入库 -->
    <template v-if="headerData.reportType == '1'">
      <div class="explain-box" v-if="
          (headerData.auditor != '') ||
          (headerData.preparedBy != '') ||
          (headerData.productType != '') ||
          (headerData.shop != '') ||
          (headerData.storage != '') ||
          (headerData.supplier != '')">
        <div v-show="headerData.storage">入库库位：{{headerData.storage}}
        </div>
        <div v-show="headerData.productType">产品类别：{{headerData.productType}}
        </div>
        <div v-show="headerData.supplier">供应商：{{headerData.supplier}}
        </div>
        <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
        </div>
        <div v-show="headerData.auditor">审核人：{{headerData.auditor}}
        </div>
        <div v-show="headerData.shop">店铺名称：{{headerData.shop}}
        </div>
      </div>
    </template>
    <!-- 修改 -->
    <!-- 退库 -->
    <template v-else-if="headerData.reportType == '2'">
      <template v-if="title == '退库'">
        <div class="explain-box" v-if="
                (headerData.auditor != '') ||
                (headerData.preparedBy != '') ||
                (headerData.productType != '') ||
                (headerData.storage != '') ||
                (headerData.supplier != '')">
          <div v-show="headerData.storage">退库库位：{{headerData.storage}}
          </div>
          <div v-show="headerData.productType">产品类别：{{headerData.productType}}
          </div>
          <div v-show="headerData.supplier">供应商：{{headerData.supplier}}
          </div>
          <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
          </div>
          <div v-show="headerData.auditor">审核人：{{headerData.auditor}}
          </div>
        </div>
      </template>
      <template v-else-if="title == '修改'">
        <div class="explain-box" v-if="
                (headerData.auditor != '') ||
                (headerData.preparedBy != '') ||
                (headerData.productType != '') ||
                (headerData.storage != '') ||
                (headerData.supplier != '')">
          <div v-show="headerData.storage">修改库位：{{headerData.storage}}
          </div>
          <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
          </div>
          <div v-show="headerData.auditor">审核人：{{headerData.auditor}}
          </div>
        </div>
      </template>
    </template>
    <!-- 调库 -->
    <template v-else-if="headerData.reportType == '3'">
       <div class="explain-box" v-if="
          (headerData.auditor != '') ||
          (headerData.preparedBy != '') ||
          (headerData.storage != '') ||
          (headerData.storageOut != '')">
        <div v-show="headerData.storage">调入库位：{{headerData.storage}}
        </div>
        <div v-show="headerData.storageOut">调出库位：{{headerData.storageOut}}
        </div>
        <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
        </div>
        <div v-show="headerData.auditor">收货人：{{headerData.auditor}}
        </div>
      </div>
    </template>
    <!-- 发货 -->
    <!-- 进销存汇总表 -->
    <template v-else-if="headerData.reportType == '4'">
      <template v-if="title == '发货'">
        <div class="explain-box" v-if="
                (headerData.auditor != '') ||
                (headerData.preparedBy != '') ||
                (headerData.productType != '') ||
                (headerData.shop != '') ||
                (headerData.storage != '') ||
                (headerData.takeUser != '')">
          <div v-show="headerData.storage">发货库位：{{headerData.storage}}
          </div>
          <div v-show="headerData.productType">产品类别：{{headerData.productType}}
          </div>
          <div v-show="headerData.shop">收货店铺：{{headerData.shop}}
          </div>
          <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
          </div>
          <div v-show="headerData.auditor">审核人：{{headerData.auditor}}
          </div>
          <div v-show="headerData.takeUser">收货人：{{headerData.takeUser}}
          </div>
        </div>
      </template>
      <template v-else-if="title == '进销存汇总表'">
        <div class="explain-box" v-if="
                (headerData.productClass != '') ||
                (headerData.shop != '') ||
                (headerData.storage != '')">
          <div v-if="headerData.storage">库位名称：{{headerData.storage}}
          </div>
          <div v-if="headerData.productClass">商品属性：{{headerData.productClass == '1'?'成品':'旧料'}}</div>
          <div v-else-if="headerData.shop">店铺名称：{{headerData.shop}}
          </div>
        </div>
      </template>
    </template>
    <!-- 调柜 -->
    <template v-else-if="headerData.reportType == '5'">
       <div class="explain-box" v-if="
          (headerData.preparedBy != '') ||
          (headerData.shop != '')">
        <div v-show="headerData.shop">店铺：{{headerData.shop}}
        </div>
        <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
        </div>
      </div>
    </template>
    <!-- 退货 -->
    <template v-else-if="headerData.reportType == '6'">
       <div class="explain-box" v-if="
          (headerData.auditor != '') ||
          (headerData.preparedBy != '') ||
          (headerData.productType != '') ||
          (headerData.shop != '') ||
          (headerData.storage != '') ||
          (headerData.takeUser != '')">
        <div v-show="headerData.storage">退货库位：{{headerData.storage}}
        </div>
        <div v-show="headerData.productType">产品类别：{{headerData.productType}}
        </div>
        <div v-show="headerData.shop">退货店铺：{{headerData.shop}}
        </div>
        <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
        </div>
        <div v-show="false">审核人：
        </div>
        <div v-show="headerData.auditor">收货人：{{headerData.auditor}}
        </div>
      </div>
    </template>
    <!-- 销售 -->
    <template v-else>
      <!-- 销售统计 -->
      <template v-if="title == '销售'">
        <div class="explain-box" v-if="
                (headerData.shop != '') ||
                (headerData.preparedBy != '') ||
                (headerData.salesperson != '') ||
                (headerData.payee != '')">
          <div v-show="headerData.shop">店铺名称：{{headerData.shop}}
          </div>
          <div v-show="headerData.preparedBy">制单人：{{headerData.preparedBy}}
          </div>
          <div v-show="headerData.salesperson">销售人：{{headerData.salesperson}}
          </div>
          <div v-show="headerData.payee">收银人：{{headerData.payee}}
          </div>
        </div>
      </template>
      <!-- 收银统计 -->
      <template v-else-if="title == '收银'">
        <div class="explain-box" v-if="(headerData.shop != '')">
          <div v-show="headerData.shop">店铺名称：{{headerData.shop}}
          </div>
        </div>
      </template>
    </template>
  </div>

</template>
<script>
  export default {
    props: ["headerData","title"]
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

<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">{{title}}报表</h1>
      <div class="head-option">
        <div class="left">公司名称：{{headerData.companyName}}</div>
        <div class="left">分类：{{tabTitle}}</div>
        <div class="right" :style="{ visibility : headerData.createDate ? 'visible' : 'hidden' }">查询时间:{{headerData.createDate}}</div>
      </div>
      <filtrateBoxByInventory :headerData="headerData" :tabTitle="tabTitle"></filtrateBoxByInventory>
    </div>
    <div>
      <table class="table-box">
        <tr class="tm noBorderTop">
          <td v-if="positionSwitch">位置名称</td>
          <!-- <td>序号</td> -->
          <td>产品类别</td>
          <td>首饰名称</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>主石(ct,g)</td>
          <td>副石(ct,g)</td>
          <td>售价(元)</td>
          <td v-show="tabSwitch">成本(元)</td>
        </tr>
        <template v-if="dataList.productTypeList.length" v-for="(dataList, ind) in sellList.dataList">
          <tr class="tr" v-if="positionSwitch">
            <td class="tm" :rowspan="filterLength(dataList)">{{dataList.whereName}}</td>
          </tr>
          <template v-for="(productTypeList, indexTwo) in dataList.productTypeList">
            <tr class="tr" v-for="(item, index) in productTypeList.detailList">
              <!-- <td>{{getCurrentIndex(indexTwo, index, dataList.productTypeList)}}</td> -->
              <td class="tl" v-if="index==0" :rowspan="productTypeList.detailList.length">{{productTypeList.className}}</td>
              <td class="tl">{{item.className}}</td>
              <!--                   <td>{{item.jewelryName}}</td> -->
              <td>{{item.num|NOUNIT}}</td>
              <td>{{item.weight|NOUNIT}}</td>
              <td>{{item.goldWeight|NOUNIT}}</td>
              <td>{{item.main}}</td>
              <td>{{item.deputy}}</td>
              <td>{{item.price|NOUNIT}}</td>
              <td v-show="tabSwitch">{{item.cost|NOUNIT}}</td>
            </tr>

          </template>
          <tr class="tr">
            <td class="tm" :colspan="positionSwitch ? 3 : 2">小计</td>
            <td>{{dataList.totalNum0}}</td>
            <td>{{dataList.totalWeight0}}</td>
            <td>{{dataList.totalGoldWeight0}}</td>
            <td>{{dataList.totalMain0}}</td>
            <td>{{dataList.totalDeputy0}}</td>
            <td>{{dataList.totalPrice0}}</td>
            <td v-show="tabSwitch">{{dataList.totalCost0}}</td>
          </tr>
        </template>
      </table>
    </div>
    <div class="printDate">
      打印时间：{{printDate}}
    </div>
  </div>
</template>
<script>
  let currentIndex = 0
  import {
    jcpPrint
  } from "@/tools/jcp-print";
  import moment from "moment";
  import filtrateBoxByInventory from "../components/filtrateBoxByInventory.vue"
  import Sign from "../components/Sign.vue"
  export default {
    components: {
      filtrateBoxByInventory,
      Sign
    },
    props: {
      sellList: {
        type: Object
      },
      headerData: {
        type: Object
      },
      title: {
        type: String
      },
      positionSwitch: {
        type: Boolean
      },
      tabTitle:{
				type:String
      },
      tabSwitch: { // 成本
        type: Boolean
      }
    },
    filters: {
      GRAMUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num + "g";
          }
          return "0g";
        } else {
          return "-";
        }
      },
      RMBUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num + "元";
          }
          return "0元";
        } else {
          return "-";
        }
      },
      NOUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num;
          }
          return 0;
        } else {
          return "-";
        }
      },
      SELL_TYPE: (key) => {
        let obj = new Map();
        obj.set("1", "退货");
        obj.set("2", "换货");
        obj.set("3", "回收");
        return obj.get(key);
      }
    },
    // watch:{
    //   sellList:function(n, o){
    //     this.transition(n);
    //   },
    // },
    data() {
      return {
        // currentIndex: 0,
        printDate: ""
      }
    },
    computed: {},
    mounted() {
      this.printDate = moment().format("YYYY-MM-DD HH:mm");
    },
    methods: {
      // 获取当前index --> 外层index， 内层index，总数据
      getCurrentIndex(ind, index, parm) {
        if (ind == 0) {
          return index + 1
        }
        let datas = parm.slice(0, ind)
        let Num = index + 1
        if (datas) {
          for (let i of datas) {
            for (let j of i.detailList) {
              Num += 1
            }
          }
        }
        return Num
      },
      // 重置index
      resetIndex(index) {
        if (index == 0) currentIndex = 0
      },
      addIndex() {
        applyIndex++
      },
      getIndex() {
        return currentIndex += 1
      },
      filterLength(parm) {
        let Num = 1
        if (parm) {
          for (let i of parm.productTypeList) {
            if (i) {
              for (let j of i.detailList) {
                Num += 1
              }
            }
          }
        }

        return Num
      },
      // transition(now){
      //   if(!now)return;
      //   let i = 1;
      //   for(let dataList of now.dataList){
      //     for(let productTypeList of dataList.productTypeList){
      //         for(let item of productTypeList.detailList){
      //           item.index = i++;
      //         }
      //     }
      //   }
      // },
      print() {
        let doc = {
          documents: document,
        };
        jcpPrint.printPreview(doc);
      },
    }
  }

</script>

<style scoped lang="scss">
@import "../../../assets/css/print.scss";
  .print-box {
    width: 208mm;
  }
</style>
<template>
  <el-dialog class="dialog-w1300-h700-hn" title="" v-model="saveSuccess" show-close>
    <span class="closeDialog" @click="close">
      <i class="el-icon-close"></i>
    </span>
    <div class="batch-main">
      <div class="batch-header">
        <div class="title">批量添加</div>
        <div class="operate-bar-top">
          <div class="tap">
            <span @click="tabClick('单据')" :class="{active: listType == '单据'}">单据</span>
            <span @click="tabClick('商品')" :class="{active: listType == '商品'}">商品</span>
          </div>
          <div class="search">
            <input v-model="keyword" type="text" :placeholder="listType == '单据' ? '请输入单据号' : '请输入条码号'">
            <div class="search-btn" @click="seekSearch">
              <i class="iconfont icon-sousuo"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="batch-page-one" v-show="listType == '单据'">
        <div class="operate-bar-bottom">
          <div class="batch-time-wrap">
            <div class="date-w81">
              <el-date-picker format v-model="startTime" type="date" placeholder="选择日期" @change="dateChange()">
              </el-date-picker>
            </div>
            <span>至</span>
            <div class="date-w81">
              <el-date-picker v-model="endTime" type="date" placeholder="选择日期" @change="dateChange()" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
          <div class="batch-select-wrap select-w100">
            <el-select @change="filtrateByType" filterable clearable v-model="LierListType" placeholder="全部类型">
              <el-option v-for="(item,index) in supplierListType" :key="index" :label="item.name" :value="item.type">
              </el-option>
            </el-select>
          </div>
          <div class="batch-select-wrap select-w100">
            <el-select @change="filtrateByUser" filterable clearable v-model="ListPreson" placeholder="制单人">
              <el-option v-for="(item,index) in makeSupplierListPreson" :key="index" :label="item.username" :value="item.userId">
              </el-option>
            </el-select>
          </div>
          <div title="件数" class="range-box" style="background:url(../../../static/img/batch/number.png) no-repeat 5px center;">
            <input type="text" placeholder="件数" v-model="beginNum" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
            <span>-</span>
            <input type="text" placeholder="件数" v-model="endNum" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
          </div>
          <div title="件重" class="range-box" style="background:url(../../../static/img/batch/weight.png) no-repeat 5px center;">
            <input type="text" placeholder="件重" v-model="beginWeight" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
            <span>-</span>
            <input type="text" placeholder="件重" v-model="endWeight" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
          </div>
          <div title="售价" class="range-box" style="background:url(../../../static/img/batch/price.png) no-repeat 5px center;">
            <input type="text" placeholder="售价" v-model="beginPrice" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
            <span>-</span>
            <input type="text" placeholder="售价" v-model="endPrice" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
          </div>
          <el-button @click="resetInvoices" class="reset" title="重置">重置</el-button>
        </div>
        <div class="table-main">
          <el-checkbox-group class="checkboxGroup" v-model="checkList" v-loading="isLoading">
            <img v-if="dataList.length ==0" style="display: block; margin:0 auto;" src="./../../../static/img/space-page.png" />
            <el-table v-loadmore="loadMoreOrder" @scroll="scrollFun1($event)" v-else :data="dataList" style="width: 100%" height="425"
              stripe ref="multipleTable" tooltip-effect="dark">
              <el-table-column prop="orderNo" label="单据号" width="">
              </el-table-column>
              <el-table-column prop="type" label="类型" width="" :formatter="formatterType">
              </el-table-column>
              <el-table-column prop="makeUserName" label="制单人" width="">
              </el-table-column>
              <el-table-column prop="createTime" label="制单时间" width="" :formatter="formatterTime">
              </el-table-column>
              <el-table-column prop="num" label="件数(件)" width="">
              </el-table-column>
              <el-table-column prop="weight" label="件重(g)" width="">
              </el-table-column>
              <el-table-column prop="price" label="售价(元)" width="">
              </el-table-column>
              <el-table-column label="操作" width="">
                <template scope="scope">
                  <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="8">
                      <el-checkbox class="checkbox-font" :label='scope.row.orderNo'></el-checkbox>
                    </el-col>
                    <el-col :span="16" style="line-height: 42px">
                      <i class="detail iconfont icon-xiangqing2" @click="gotoGoods(scope.row.orderNo)" title="查看详情"></i>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
            <!-- <ul v-else>
              <li v-for="(item, index) in dataList" @click="pushData(item.orderNo)" :key="index">
                <div class="left-list list">
                  <div class="num">{{index + 1}}</div>
                  <div class="order-num">{{item.orderNo}}</div>
                  <div class="order-position">{{getDataType(item.type)}}</div>
                  <div class="order-makeMan">{{item.makeUserName}}</div>
                  <div class="order-time">{{formatTime(item.createTime)}}</div>
                </div>
                <div class="right-list list">
                  <div>{{item.num}}件</div>
                  <div>{{item.weight}}g</div>
                  <div>{{item.price}}元</div>
                  <div>
                    <el-checkbox class="checkbox-font" :label='item.orderNo'></el-checkbox>
                  </div>
                </div>
              </li>
            </ul> -->
          </el-checkbox-group>
        </div>
      </div>
      <div class="batch-page-two" v-show="listType == '商品'">
        <div class="operate-bar-bottom">
          <!-- <div @click="littleBatch = true" class="search-block">单据搜索
            <i class="iconfont icon-sousuo"></i>
          </div> -->
          <div class="class-btn-wrap flex flex-r flex-pack-justify">
            <div>
              <dropDownColum ref="1" :propsList="proList | listFilte" :dataType="1" titleData="产品类别" @dataBack="dataBack">
              </dropDownColum>
            </div>
            <div>
              <dropDownColum ref="2" :propsList="conditionList | listFilte" :dataType="2" titleData="成色名称" @dataBack="dataBack">
              </dropDownColum>
            </div>
            <div>
              <dropDownColum ref="3" :propsList="allJewelList | listFilte" :dataType="3" titleData="宝石名称" @dataBack="dataBack">
              </dropDownColum>
            </div>
            <div>
              <dropDownColum ref="4" :propsList="allJewelryList | listFilte" :dataType="4" titleData="首饰类别" @dataBack="dataBack">
              </dropDownColum>
            </div>
          </div>
          <!-- 商品属性 -->
          <div class="drop-block">
            <dropDownColum ref="5" :propsList="productList" :dataType="5" titleData="商品属性" @dataBack="dataBack" @dropReturn="dropReturn"
              @clearInfo="clearInfo">
            </dropDownColum>
          </div>
          <!-- 所在位置 -->
          <div class="drop-block">
              <dropDownColum ref="6" :propsList="storagelocationList" :dataType="6" titleData="库位位置" @dataBack="dataBack"></dropDownColum>
          </div>
          <div class="drop-block">
            <dropDownColum ref="7" :propsList="shoplocationList" :dataType="7" titleData="店铺位置" @dataBack="dataBack"></dropDownColum>
          </div>
          <div title="条码" class="range-box" style="background:url(../../../static/img/batch/barcode.png) no-repeat 5px center;">
            <input type="text" @keyup.enter="seekSearch" v-model="beginBarcode1" placeholder="条码" @blur="batchAddByProductList()">
            <span>-</span>
            <input type="text" @keyup.enter="seekSearch" v-model="endBarcode1" placeholder="条码" @blur="batchAddByProductList()">
          </div>
          <div title="件重" class="range-box" style="background:url(../../../static/img/batch/weight.png) no-repeat 5px center;">
            <input type="text" @keyup.enter="seekSearch" v-model="beginWeight1" placeholder="件重" @blur="batchAddByProductList()">
            <span>-</span>
            <input type="text" @keyup.enter="seekSearch" v-model="endWeight1" placeholder="件重" @blur="batchAddByProductList()">
          </div>
          <div title="售价" class="range-box" style="background:url(../../../static/img/batch/price.png) no-repeat 5px center;">
            <input type="text" @keyup.enter="seekSearch" v-model="beginPrice1" placeholder="售价" @blur="batchAddByProductList()">
            <span>-</span>
            <input type="text" @keyup.enter="seekSearch" v-model="endPrice1" placeholder="售价" @blur="batchAddByProductList()">
          </div>
          <!-- <el-button @click="batchAddByProductList" class="reset" title="完成">完成</el-button> -->
          <el-button @click="resetGoods" class="reset" title="重置">重置</el-button>
        </div>
        <div class="table-main" @scroll="scrollFun($event)">
          <el-checkbox-group class="checkboxGroup" v-model="barcodeList" v-loading="isLoading">
            <span class="float" v-show="receiptList.length > 0 && Float">{{currentOrderId}}
              <i class="el-icon-circle-close" title="清除" @click="clearFloat"></i>
            </span>
            <img v-if="receiptList.length ==0" style="display: block; margin:0 auto;" src="./../../../static/img/space-page.png" />
            <el-table v-loadmore="loadMoreProduct" v-else :data="receiptList" style="width: 100%" height="425" stripe ref="multipleTable"
              tooltip-effect="dark">
              <el-table-column prop="barcode" label="条码号" width="">
              </el-table-column>
              <el-table-column prop="productName" label="首饰名称" width="">
              </el-table-column>
              <el-table-column prop="productTypeName" label="产品类别" width="">
              </el-table-column>
              <el-table-column prop="productType" label="商品属性" width="" :formatter="formatterProductType">
              </el-table-column>
              <el-table-column prop="location" label="商品位置" width="">
              </el-table-column>
              <el-table-column prop="weight" label="件重(g)" width="">
              </el-table-column>
              <el-table-column prop="price" label="售价(元)" width="">
              </el-table-column>
              <el-table-column label="操作" width="">
                <template scope="scope">
                  <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                      <el-checkbox class="checkbox-font" :label='scope.row.barcode'></el-checkbox>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox-group>

          <!-- <el-checkbox-group v-model="barcodeList">
            <img v-if="receiptList.length ==0" style="display: block; margin:0 auto;" src="./../../../static/img/space-page.png" />
            <ul v-else>
              <li v-for="(item, index) in receiptList" :key="index">
                <div class="left-list list">
                  <div class="num">{{index + 1}}</div>
                  <div class="order-num">{{item.barcode}}</div>
                  <div class="order-position">{{item.productName}}</div>
                  <div class="order-position">{{item.productTypeName}}</div>
                  <div class="order-makeMan">{{item.productType == 1 ? '成品' : '旧料'}}</div>
                  <div class="order-time">{{item.location}}</div>
                </div>
                <div class="right-list list">
                  <div>{{item.weight}}g</div>
                  <div>{{item.price}}元</div>
                  <div>
                    <el-checkbox class="checkbox-font" :label='item.barcode'></el-checkbox>
                  </div>
                </div>
              </li>
            </ul>
          </el-checkbox-group> -->
        </div>
      </div>
      <div class="batch-footer">
        <div class="btn-wrap">
          <div class="add-btn btn" @click="addGoods">添加</div>
        </div>
        <div class="checkAll">
          <em v-if="listType == '单据'">
            (
            <span>全选{{checkList.length}}</span>/{{totalNum}})
            <el-checkbox v-model="checked" @change="cutSelect" class="checkbox-font check-all"></el-checkbox>
          </em>
          <em v-else>
            (
            <span>全选{{barcodeList.length}}</span>/{{totalNum1}})
            <el-checkbox v-model="checked1" @change="cutSelect1" class="checkbox-font check-all"></el-checkbox>
          </em>
        </div>
      </div>
    </div>
    <!-- ------------------------------------- -->
    <el-dialog top="30px" :append-to-body="true" v-model="littleBatch" customClass="litBatch" :modal="false">
      <div class="little-batch-title">
        <div class="search">
          <input type="text" v-model="keyword" placeholder="请输入单据号" @keyup.enter="batchAddByOrderNum()">
          <div class="search-btn" @click="batchAddByOrderNum()">
            <i class="iconfont icon-sousuo"></i>
          </div>
        </div>
        <div class="menu-bottom">
          <div class="batch-time-wrap">
            <div class="date-w81">
              <el-date-picker format v-model="startTime" type="date" placeholder="选择日期" @change="dateChange()">
              </el-date-picker>
            </div>
            <span>至</span>
            <div class="date-w81">
              <el-date-picker v-model="endTime" type="date" placeholder="选择日期" @change="dateChange()">
              </el-date-picker>
            </div>
          </div>
          <div class="batch-select-wrap select-w100">
            <el-select filterable v-model="modelType" placeholder="全部">
              <el-option v-for="(item,index) in supplierListType" :key="index" :label="item.name" :value="item.type">
              </el-option>
            </el-select>
          </div>
          <div class="range-box" style="background:url(../../../static/img/batch/number.png) no-repeat 5px center;">
            <input type="text" placeholder="件数" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
            <span>-</span>
            <input type="text" placeholder="件数" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
          </div>
          <div class="range-box" style="background:url(../../../static/img/batch/weight.png) no-repeat 5px center;">
            <input type="text" placeholder="件重" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
            <span>-</span>
            <input type="text" placeholder="件重" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
          </div>
          <div class="range-box" style="background:url(../../../static/img/batch/price.png) no-repeat 5px center;">
            <input type="text" placeholder="售价" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
            <span>-</span>
            <input type="text" placeholder="售价" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
          </div>
        </div>
        <div class="table-main" @scroll="scrollFun1($event)">
          <ul>
            <li v-for="(item, index) in dataList" @click="choseListData(item)" :key="index">
              <div class="left-list list">
                <div class="num">{{index + 1}}</div>
                <div class="order-num">{{item.orderNo}}</div>
                <div class="order-position">{{getDataType(item.type)}}</div>
                <div class="order-makeMan">{{item.makeUserName}}</div>
                <div class="order-time">{{item.createTime}}</div>
              </div>
              <div class="right-list list">
                <div>{{item.num}}件</div>
                <div>{{item.weight}}g</div>
                <div>{{item.price}}元</div>
                <!-- <div>
                                    <el-checkbox class="checkbox-font" :label='item.orderNo'></el-checkbox>
                                </div> -->
                <el-radio v-model="newOrderId" :label="item.orderNo"></el-radio>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="little-batch-footer">
        <div class="btn-wrap">
          <div class="cenl-btn btn" @click="littleBatch = false">取消</div>
          <div class="add-btn btn" @click="confirmClick">添加</div>
        </div>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
  var moment = require('moment');
  import {
    seekGetReceiptList,
    seekBatchAddByOrderNum,
    seekBatchAddByProductList,
    getProductTypeList,
    seekProductClassList,
    seekMemberList,
    seekGetShopListByCo,
    showCounterList,
    seekRepositoryList
  } from "./../../Api/commonality/seek"
  import {
    statusModuleType
  } from "./../../Api/commonality/status"
  import {
    operateCreatReceipt,
    operateProductList
  } from "./../../Api/commonality/operate"
  import dropDownColum from '@/components/dropDownColums';
  // import dropDownColum from 'base/menu/drop-down-colums'
  // 树形级联多选框组件
  import TreeDropDownColums from '@/components/tree_dropDownColums';
  export default {
    props: [
      'isPopup', 'supplierListData'
    ],
    components: {
      dropDownColum,
      TreeDropDownColums
    },
    data() {
      return {
        pickerOptions: {
          // let _self = this
          disabledDate: (time) => {
            // console.log(this.startTime)
            return time.getTime() < this.startTime;
          }
        },
        listType: '单据',
        littleBatch: false,
        isLoading: false,
        pickerOptions10: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        search: null,
        checked: false,
        checked1: false,
        saveSuccess: true,
        startTime: "",
        endTime: "",
        modelType: "",
        checkList: [],
        barcodeList: [],
        currentPage: 1,
        receiptList: [],
        totalNum: 0,
        totalNum1: 0,
        pageSize: 15,
        dataList: [],
        //------------------------------- 筛选条件
        proList: [], //产品类别
        conditionList: [], // 成色列表
        allJewelList: [], // 宝石列表
        allJewelryList: [], // 首饰列表
        productList: [{ //商品属性
            name: "成品",
            id: 1
          },
          {
            name: "旧料",
            id: 2
          }
        ],
        goodslocationList: [], // 所在位置列表
        newOrderId: '',
        // ----------------------
        beginNum: '',
        endNum: '',
        beginWeight: '',
        endWeight: '',
        beginPrice: '',
        endPrice: '',
        keyword: '',

        // ----------------------
        productTypeId: '',
        productType: '',
        location: '',
        colourId: '', // 成色
        jewelId: '', // 宝石
        jewelryId: '', // 首饰
        beginWeight1: '',
        endWeight1: '',
        beginPrice1: '',
        endPrice1: '',
        beginBarcode1: '',
        endBarcode1: '',
        // 选中的首饰名称id列表
        jewelryList: [],
        // 选中的宝石名称id列表
        jewelList: [],
        // 选中的成色名称id列表
        colourList: [],
        // 选中的产品类别id列表
        productTypeList: [],
        // 选中的商品属性id列表
        productStatusList: [],
        // 选中的商品位置id列表
        locationList: [],
        //-------------------------单据筛选条件
        //单据类型默认值
        LierListType: "",
        //单据类型
        supplierListType: [{
            name: "全部",
            type: "00"
          },
          {
            name: "入库单",
            type: "01"
          },
          {
            name: "修改单",
            type: "10"
          },
          {
            name: "退货单",
            type: "04"
          },
          {
            name: "调库单",
            type: "07"
          }
        ],
        //制作人默认值
        ListPreson: "",
        //制单人列表(去重)
        makeSupplierListPreson: [],
        // 当前点击单据的orderID
        currentOrderId: "",
        // 关闭显示单据号的浮层
        Float: true,
        // 没有更多单据数据
        noMoreOrderNum: false,
        // 没有更多商品数据
        noMoreProductList: false,
        storagelocationList:[],
        shoplocationList:[]

      }
    },
    watch: {
      'isPopup': function () {
        if (this.isPopup === true) {
          this.saveSuccess = this.isPopup;
        }
      },
      'saveSuccess': function () {
        if (this.saveSuccess === false) {
          this.close()
        }
      },
      'checkList': function (val) { // 监听全选
        // console.log(val)
        //this.pageJudgeFun();
        if (this.checkList.length === this.dataList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      'barcodeList': function (val) {
        console.log(val)
        if (this.barcodeList.length === this.receiptList.length) {
          this.checked1 = true;
        } else {
          this.checked1 = false;
        }
      },
      'dataList': (val) => {
        console.log("改变了")
      },
      'listType':(val)=>{}
    },
    created() {
      this.getDate(0)
      this.isLoading = true
      this.seekProductTypeList()
      this.getPropList()
      this.getUserList()
      console.log(this)
    },
    mounted() {
      $(".new-template-table").mCustomScrollbar({
        theme: "minimal-dark",
        autoHideScrollbar: true,
        scrollInertia: 500,
        mouseWheel: {
          scrollAmount: 200,
          preventDefault: false,
          normalizeDelta: false
        },
        callbacks: {
          onTotalScroll: function () {
            //console.log(111)
          },
          onScroll: function () {
            //console.log(222)
          }
        }

      });
    },
    methods: {
      formatTime(val) {
        let year = val.substring(0, 4)
        let month = val.substring(4, 6)
        let data = val.substring(6, 8)
        let hour = val.substring(8, 10)
        let time = val.substring(10, 12)
        return year + "-" + month + "-" + data + " " + hour + ":" + time
      },
      pushData(data) {
        if (this.checkList.includes(data)) {
          this.checkList.forEach((item, index) => {
            if (item == data) {
              this.checkList.splice(index, 1)
            }
          })
        } else {
          this.checkList.push(data)
        }
        console.log(this.checkList)
      },
      confirmClick() {
        this.littleBatch = false
        this.batchAddByProductList()
      },
      scrollFun(el) {
        if (el.target.scrollTop >= (el.target.scrollHeight - 440)) {
          this.pageSize += 10
          this.batchAddByProductList()
        }
      },
      scrollFun1(el) {
        console.log("滚动了")
        if (el.target.scrollTop >= (el.target.scrollHeight - 440)) {
          this.pageSize += 10
          this.batchAddByOrderNum()
        }
      },
      choseListData(item) { // 选择单据列表
        console.log(item)
        this.newOrderId = item.orderNo

      },
      dataBack(val) { // 级联数据返回
        console.log(val);
        // 产品类别
        if (val.type == 1) {
          // this.productTypeId = val.opeId
          let productTypeList = [];
          val.samllList.forEach((val, index) => {
            productTypeList.push({
              productTypeId: val
            })
          })
          this.productTypeList = productTypeList;
        }
        // 成色名称
        else if (val.type == 2) {
          // this.colourId = val.opeId
          let colourList = [];
          val.samllList.forEach((val, index) => {
            colourList.push({
              colourId: val
            })
          })
          this.colourList = colourList;
        }
        // 宝石名称
        else if (val.type == 3) {
          // this.jewelId = val.opeId
          let jewelList = [];
          val.samllList.forEach((val, index) => {
            jewelList.push({
              jewelId: val
            })
          })
          this.jewelList = jewelList
        }
        // 首饰类别
        else if (val.type == 4) {
          // this.jewelryId = val.opeId
          let jewelryList = [];
          val.samllList.forEach((val, index) => {
            jewelryList.push({
              jewelryId: val
            })
          })
          this.jewelryList = jewelryList
        }
        // 商品属性
        else if (val.type == 5) {
          let productStatusList = [];
          val.bigList.forEach((val, index) => {
            productStatusList.push({
              productStatus: val
            })
          })
          this.productStatusList = productStatusList
        }
        // 商品所在位置
        else if (val.type == 6) {
          let locationList = [];
          val.bigList.forEach((val, index) => {
            locationList.push({
              locationId: val
            })
          })
          this.locationList = locationList;
        }
        else if (val.type == 7) {
          let locationList = [];
          val.bigList.forEach((val, index) => {
            locationList.push({
              locationId: val
            })
          })
          this.locationList = locationList;
        }
        this.batchAddByProductList()
      },
      getPropList() { // 获取产品类
        for (let i = 0; i < 3; i++) {
          this.productClassList(i + 1)
        }
      },
      dropReturn(val) { // 下拉框返回
        console.log(val)
        if (val.type == "属性") {
          this.productType = val.item.operateId
        } else {
          this.location = val.item.operateId
        }
        this.batchAddByProductList()
      },
      clearInfo(val) { // 清除返回
        if (val.type == "属性") {
          this.productType = ''
        } else {
          this.location = ''
        }
        this.batchAddByProductList()
      },
      seekSearch() { // 查询
        if (this.listType == "单据") {
          // this.batchAddByOrderNum()
          this.batchAddByOrderNum()
        } else {
          this.batchAddByProductList()
        }
      },
      addGoods() { // 搜索
        if (this.listType == "单据") {
          // this.batchAddByOrderNum()
          this.saveReceipts()
        } else {
          this.saveProductList()
        }
      },
      seekProductTypeList() { // 产品类别列表
        getProductTypeList().then((res) => {
          console.log(res)
          if (res.data.state == 200) {
            this.isLoading = false
            this.proList = res.data.data.list
          }
        }, (res) => {

        })
      },
      productClassList(type) { // 商品大小类列表
        let options = {
          type: type
        }
        seekProductClassList(options).then((res) => {
          console.log(res)
          if (res.data.state == 200) {
            this.isLoading = false
            if (type == 1) {
              this.conditionList = res.data.data.list
            } else if (type == 2) {
              this.allJewelList = res.data.data.list
            } else {
              this.allJewelryList = res.data.data.list
            }
          }
        }, (res) => {

        })
      },
      checkItem(id) { // 选择项目
        console.log(id)
      },
      getDataType(val) {
        switch (val) {
          case "01":
            return "入库"
            break;
          case "02":
            return "退库"
            break;
          case "03":
            return "发货"
            break;
          case "04":
            return "退货"
            break;
          case "05":
            return "销售"
            break;
          case "06":
            return "调柜"
            break;
          case "07":
            return "调库"
            break;
          case "10":
            return "修改"
            break;
        }
      },
      batchAddByOrderNum() { // 5.60批量添加-单据列表
        var startTime = "";
        var endTime = "";
        if (this.startTime && this.endTime) {
          startTime = moment(this.startTime).format('YYYY-MM-DD');
          endTime = moment(this.endTime).format('YYYY-MM-DD');
        }
        this.isLoading = true
        let options = {
          orderId: this.$route.query.orderNumber,
          keyword: this.keyword,
          beginTime: startTime,
          endTime: endTime,
          type: this.LierListType != "00" ? this.LierListType : "",
          makeUserId: this.ListPreson,
          beginNum: this.beginNum,
          endNum: this.endNum,
          beginWeight: this.beginWeight,
          endWeight: this.endWeight,
          beginPrice: this.beginPrice,
          endPrice: this.endPrice,
          page: 1,
          pageSize: this.pageSize
        }
        seekBatchAddByOrderNum(options).then((res) => {
          // console.log('看啥时候会请求数据:', res)
          // console.log(this.ListPreson);
          if (res.data.state == 200) {
            this.isLoading = false
            // 获取单据列表
            this.dataList = res.data.data.dataList
            // 判断页数
            if (this.totalNum == res.data.data.totalNum) {
              // 没有更多单据数据
              this.noMoreOrderNum = true;
            } else {
              this.totalNum = res.data.data.totalNum;
            }
          } else {
            this.$message.error(res.data.msg)
          }
        }, (res) => {})
      },
      batchAddByProductList() { // 5.61批量添加-商品列表
        this.littleBatch = false
        this.isLoading = true
        let options = {
          page: 1,
          pageSize: this.pageSize,
          // orderId: this.$route.query.orderNumber, // this.orderNo
          orderId: this.currentOrderId,
          newOrderId: this.newOrderId,
          keyword: this.keyword,
          productTypeId: this.productTypeId,
          productTypeList: this.productTypeList,
          colourId: this.colourId,
          colourList: this.colourList,
          jewelId: this.jewelId,
          jewelList: this.jewelList,
          jewelryId: this.jewelryId,
          jewelryList: this.jewelryList,
          productStatusList: this.productStatusList,
          productType: this.productType,
          location: this.location,
          locationId: '',
          locationList: this.locationList,
          beginBarcode: this.beginBarcode1,
          endBarcode: this.endBarcode1,
          beginWeight: this.beginWeight1,
          endWeight: this.endWeight1,
          beginPrice: this.beginPrice1,
          endPrice: this.endPrice1
        }
        console.log(options)
        seekBatchAddByProductList(options).then((res) => {
          console.log('发现请求数据的第二个位置:', res)
          if (res.data.state == 200) {
            this.isLoading = false
            this.receiptList = res.data.data.dataList
            let currentPageNum = res.data.data.dataList.length;
            this.orderNo = ''
            // 判断页数
            if (currentPageNum == res.data.data.totalNum) {
              // 没有更多商品数据
              this.noMoreProductList = true;
            } else {
              this.totalNum1 = currentPageNum;
            }
          } else {
            this.$message.error(res.data.msg)
          }
        }, (res) => {

        })
      },
      tabClick(type) {
        this.listType = type
        this.pageSize = 15
        this.keyword = ''
        if (type == "单据") {
          this.batchAddByOrderNum()
          this.productTypeId = ''
          this.colourId = ''
          this.jewelId = ''
          this.jewelryId = ''
          this.beginWeight1 = ''
          this.endWeight1 = ''
          this.beginPrice1 = ''
          this.endPrice1 = ''
          this.beginBarcode1 = ''
          this.endBarcode1 = ''
          this.productType = ''
          this.location = ''
          this.newOrderId = ''
          // 切换回单据要重置单据号
          this.orderId = ''
          this.noMoreOrderNum = false;
        } else {
          this.beginNum = ''
          this.endNum = ''
          this.beginWeight = ''
          this.endWeight = ''
          this.beginPrice = ''
          this.endPrice = ''
          this.modelType = ''
          this.newOrderId = ''
          // 点击切换需要查询商品
          this.currentOrderId = this.$route.query.orderNumber;
          this.batchAddByProductList();
          // 设置商品的位置
          this.setGoodslocationList();
          this.receiptList = []
          this.orderNo = ''
          this.noMoreProductList = false
          // this.totalNum1 = res.data.data.totalNum
        }
      },
      dateChange() {
        // console.log(this.startTime)
        // console.log(this.endTime)
        if (this.listType == "单据") {
          this.batchAddByOrderNum()
        } else {
          this.batchAddByProductList()
        }
      },
      getDate(day, type) {
        let _date = new Date()
        _date.setDate(_date.getDate() + day)
        //年
        let Year = _date.getFullYear()
        //月
        let month = this.formatDate(_date.getMonth() + 1)

        let month1 = this.formatDate(_date.getMonth())
        //天
        let Day = this.formatDate(_date.getDate())
        //天
        let Day1 = this.formatDate(_date.getDate() - 1)
        //时
        let hours = this.formatDate(_date.getHours())
        //分
        let mins = this.formatDate(_date.getMinutes())
        //秒
        let seconds = this.formatDate(_date.getSeconds())

        let timestamp = Year + month + Day
        let currentData = new Date()

        if (month1 == '01' || month1 == '03' || month1 == '05' || month1 == '07' || month1 == '08' || month1 == '10' ||
          month1 == '12') {
          if (Day1 == '00') {
            Day1 = '31'
          }
        } else if (month1 == '02') {
          if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
            if (Day1 == '00') {
              Day1 = '29'
            }
          } else {
            if (Day1 == '00') {
              Day1 = '28'
            }
          }
        } else {
          if (Day1 == '00') {
            Day1 = '30'
          }
        }
        if (type == 'end') {
          if (Year < currentData.getFullYear() ||
            month < currentData.getMonth() + 1 ||
            Day < currentData.getDate()
          ) {
            hours = '23'
            mins = seconds = '59'
          }
        } else if (type == 'start') {
          hours = mins = seconds = '00'
        }
        //console.log(Day)
        let M = (Day- (Day-1))
        if (M.toString().length == 1) {
            M = `0${M}`
        }
        this.endTime = Year + '-' + month + '-' + Day
        this.startTime = Year + '-' + month + '-' + M
        //this.seekReceipts()
        this.batchAddByOrderNum()
        // return {
        //     format : Year +'-'+ month +'-'+  Day ,
        //     timestamp : timestamp,
        //     fullData : timestamp + hours + mins + seconds
        // }
      },
      formatDate(d) {
        return d < 10 ? ('0' + d) : d + ''
      },
      timeFormat(parm) {
        if (parm == undefined) {
          return ''
        } else {
          let year = parm.substring(0, 4)
          let month = parm.substring(4, 6)
          let data = parm.substring(6, 8)
          let hour = parm.substring(8, 10)
          let time = parm.substring(10, 12)
          return year + "-" + month + "-" + data + " " + hour + ":" + time
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.seekReceipts();
        console.log(`当前页: ${val}`);
      },
      getModuleType(parm) {
        return statusModuleType(parm);
      },
      close() {
        var states = {
          type: "1", // 取消
          name: false
        }
        this.$emit('addReceiptsState', states)
      },
      saveReceipts() {
        let orderNumList = [];
        for (let i of this.checkList) {
          let obj = {
            orderNum: i
          }
          orderNumList.push(obj)
        }
        let options = {
          orderNumList: orderNumList,
          orderNum: this.$route.query.orderNumber
        }
        operateCreatReceipt(options).then((response) => {
          console.log('查看打印添加数据:', response);
          if (orderNumList.length > 0) {
            if (response.data.state === 200) {
              this.$message({
                type: 'info',
                message: '添加成功'
              })
              var states = {
                type: "3", // 添加成功
                name: false
              }
              this.$emit('addReceiptsState', states)
            } else {
              this.$store.dispatch('workPopupError', response.data.msg)
            }
          } else {
            this.$store.dispatch('workPopupError', '请选择需要添加的数据!')
          }

        }, (response) => {
          this.$store.dispatch('workPopupError', response.data.msg)
        })
      },
      saveProductList() { // 通过条码号保存
        let orderNumList = [];
        for (let i of this.barcodeList) {
          let obj = {
            barcode: i
          }
          orderNumList.push(obj)
        }
        let options = {
          productList: orderNumList,
          orderNum: this.$route.query.orderNumber,
          operate: 1
        }
        operateProductList(options).then((res) => {
          console.log(res.data)
          if (res.data.state == 200) {
            // this.batchAddByProductList()
            this.$message({
              type: 'info',
              message: '添加成功'
            })
            var states = {
              type: "3", // 添加成功
              name: false
            }
            this.$emit('addReceiptsState', states)
          } else if (res.data.state == 99) {
            this.$store.dispatch('workPopupError', res.data.msg)
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
            var states = {
              type: "3", // 添加成功
              name: false
            }
            this.$emit('addReceiptsState', states)
          }
        }, (res) => {
          console.log(res)
        })
      },
      cutSelect1() {
        var _self = this;
        setTimeout(function () {
          _self.cutSelectFun1();
        }, 13);
      },
      cutSelectFun1() {
        console.log(this.checked1)
        if (this.checked1 === true) { // 全选
          this.checked1 = true;
          for (let i of this.receiptList) {
            //console.log(i)
            if (this.barcodeList.includes(i.barcode)) {

            } else {
              this.barcodeList.push(i.barcode);
            }
          }
        } else {
          this.checked1 = false;
          this.barcodeList = [];
        }
      },
      cutSelect() {
        var _self = this;
        setTimeout(function () {
          _self.cutSelectFun();
        }, 13);
      },
      cutSelectFun() {
        console.log(this.checked)
        if (this.checked === true) { // 全选
          for (let i of this.dataList) {
            if (this.checkList.includes(i.orderNo)) {
              console.log(this.checkList.includes(i.orderNo));
            } else {
              this.checkList.push(i.orderNo);
            }
          }
        } else {
          this.checkList = [];
        }
      },
      pageJudgeFun() { // 判断是否全选
        let receiptData = [];
      },
      seekFun() {
        console.log("查询")
      },
      closeSeek() { // 关闭查询
        this.search = "";
        this.seekReceipts();
      },
      // 通过单据类型筛选单据
      filtrateByType() {
        this.batchAddByOrderNum()
        this.batchAddByProductList()
      },
      // 通过制单人筛选单据
      filtrateByUser() {
        // console.log("123")
        this.batchAddByOrderNum()
        this.batchAddByProductList()
      },
      // 获取制单人列表
      getUserList() {
        let options = {
          type: 1,
          companyId: sessionStorage.getItem('companyId'),
          shopId: ''
        }
        seekMemberList(options).then((res) => {
          this.makeSupplierListPreson = res.data.data.dataList.filter(item => item.role != '店长' && item.role !=
            '店员')
        }, (res) => {

        })
      },
      // 格式化表格中的类型值
      formatterType(row, column) {
        return this.getDataType(row.type)
      },
      // 格式化表格中的日期值
      formatterTime(row, column) {
        return this.formatTime(row.createTime)
      },
      // 格式化商品属性值
      formatterProductType(row, cloumn) {
        if (row.productType == 1) {
          return "成品"
        } else if (row.productType == 2) {
          return "旧料"
        }
      },
      // 单据的重置按钮
      resetInvoices() {
        this.startTime = ""
        this.endTime = ""
        this.LierListType = ""
        this.ListPreson = ""
        this.beginNum = ""
        this.endNum = ""
        this.beginWeight = ""
        this.endWeight = ""
        this.beginPrice = ""
        this.endPrice = ""
        // -------------------------
        // 选项的参数
        this.productTypeId = ""
        this.colourId = ""
        this.jewelId = ""
        this.jewelryId = ""
        // ---------------------------
        this.getDate(0)
        // 获取产品类型列表
        this.seekProductTypeList()
        // 获取产品类
        this.getPropList()
        // 获取制单人列表
        this.getUserList()
        this.batchAddByProductList();
      },
      // 商品的重置按钮
      resetGoods() {
        console.log("商品的重置按钮")
        this.$refs['1'].reset();
        this.$refs['2'].reset();
        this.$refs['3'].reset();
        this.$refs['4'].reset();
        this.$refs['5'].reset();
        this.$refs['6'].reset();
        this.$refs['7'].reset();
        this.productTypeList = [];
        this.colourList = [];
        this.jewelList = [];
        this.jewelryList = [];
        this.productStatusList = [];
        this.locationList = [];
        this.gotoGoods(this.currentOrderId);
      },
      // 点击单据展示商品列表
      gotoGoods(orderId) {
        console.log(orderId);
        this.listType = "商品";
        this.noMoreProductList = false
        this.currentOrderId = orderId;
        this.batchAddByProductList();
        this.setGoodslocationList();
        // 显示单据号的浮层
        this.Float = true;
      },
      // 设置商品位置列表
      setGoodslocationList() {
        // this.goodslocationList = [{
        //   name: "库位",
        //   id: 1,
        //   childrenList: []
        // }, {
        //   name: "店铺",
        //   id: 2,
        //   childrenList: []
        // }]
        this.storagelocationList = []
        this.shoplocationList = []
        // 获取店铺列表
        seekGetShopListByCo({
          page: '1',
          pageSize: 9999,
          type: 1 // 1.可查看 2.所属 3.全部
        }).then(res => {
          if (res.data.state == 200) {
            for (let i of res.data.data.shopList) {
              // 获取每个店铺的库类型
              showCounterList({
                  shopId: i.shopId
                })
                .then(res => {
                  // 设置二级项
                  i.childrenList = res.data.data.counterList
                  i.id = i.shopId
                  i.name = i.shopName
                  for (let j of i.childrenList) {
                    j.name = j.counterName
                    j.id = j.counterId
                  }
                  this.shoplocationList.push(i)
                })
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }

        })
        // 获取库位列表
        seekRepositoryList().then((res) => {
          // this.repositoryList = res.data.data.repositoryList;
          res.data.data.repositoryList.forEach((val, index) => {
            val.name = val.repositoryName;
            val.id = val.repositoryId;
          })
          this.storagelocationList = res.data.data.repositoryList
        }, (res) => {

        })
        // console.log(this.goodslocationList);
      },
      // 下拉加载更多单据
      loadMoreOrder() {
        console.log("滚动到底部")
        this.isLoading = true;
        setTimeout(() => {
          this.pageSize += 10
          this.batchAddByOrderNum()
          if (this.noMoreOrderNum) {
            this.$message({
              message: '没有更多数据了',
              type: 'warning'
            });
          }
        }, 2000)
      },
      // 下拉加载更多商品
      loadMoreProduct() {
        this.isLoading = true;
        setTimeout(() => {
          this.pageSize += 10
          this.batchAddByProductList()
          if (this.noMoreProductList) {
            this.$message({
              message: '没有更多数据了',
              type: 'warning'
            });
          }
        }, 2000)
      },
      // 清空浮条
      clearFloat(){
        console.log(123)
        this.Float = false;
        this.currentOrderId = this.$route.query.orderNumber;
        this.batchAddByProductList();
      }
    },
    filters: {
      // 过滤数据，增加类名
      listFilte: (value) => {
        value.forEach((val, index) => {
          val.name = val.classesName;
          if (val.typeList || val.childrenList) {
            let lists = val.typeList || val.childrenList
            lists.forEach((val, index) => {
              val.name = val.classesName;
              if (val.classesId) {
                let listId = val.classesId;
                val.id = listId;
              }
            })
            val.childrenList = lists;
          }
          if (val.classesType || val.classesId) {
            let listId = val.classesType || val.classesId;
            val.id = listId;
          }
        })
        return value;
      }
    },
  }

</script>
<style lang="scss">
  .litBatch {
    width: 990px !important;
    height: 624px !important;
    padding: 0 20px;
    .little-batch-title {
      height: 72px;
      width: 100%;
      margin-top: 30px;
      .search {
        width: 190px;
        height: 28px;
        border-radius: 4px;
        float: left;
        position: relative;
        overflow: hidden;
        margin-bottom: 16px;

        input {
          border-radius: 4px;
          width: 188px;
          height: 28px;
          border: 1px solid #d6d6d6;
          padding-left: 10px;
          &:hover {
            border: 1px solid #2993f8;
          }
          &:focus {
            border: 1px solid #2993f8;
          }
          &:blur {
            border: 1px solid #ededed;
          }
        }

        .search-btn {
          position: absolute;
          width: 30px;
          height: 28px;
          right: 0;
          top: 0;
          background: #2993f8;
          text-align: center;
          cursor: pointer;
          i {
            color: #fff;
            line-height: 28px;
          }
        }
      }
      .menu-bottom {
        height: 28px;
        float: left;
        .batch-time-wrap {
          float: left;
          height: 28px;
          width: 188px;
          border: 1px solid #d6d6d6;
          border-radius: 4px;
          margin-right: 16px;
          &>span {
            line-height: 28px;
            font-size: 14px;
          }
        }
        .batch-select-wrap {
          // float: left;
          // margin-right: 16px;
        }
        .range-box {
          float: left;
          margin-right: 16px;
          width: 168px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          padding-left: 20px;
          input {
            width: 65px;
            height: 100%;
            float: left;
            text-align: center;
          }
          span {
            float: left;
            margin: 0 4px;
            line-height: 26px;
          }
        }
      }
      .table-main {
        width: 100%;
        height: 300px;
        overflow-y: auto;
        ul {
          li {
            width: 100%;
            height: 44px;
            padding-right: 20px;
            cursor: pointer;
            &:hover {
              background-color: #ededed;
            }
            .list {
              //line-height: 44px;
              height: 44px;
              div {
                margin-top: 13px;
                float: left;
                height: 14px;
                text-align: center;
                line-height: 14px;
              }

            }
            .left-list {
              float: left;
              div:nth-child(1) {
                width: 30px;
              }
              div:nth-child(2) {
                width: 120px;
              }
              div:nth-child(3) {
                width: 74px;
                border-right: 1px solid #d6d6d6;
              }
              div:nth-child(4) {
                width: 95px;
              }
              div:nth-child(5) {
                // width: 30px;
              }
            }
            .right-list {
              float: right;
              div:nth-child(1) {
                width: 80px;
              }
              div:nth-child(2) {
                width: 102px;
                border-left: 1px solid #d6d6d6;
                border-right: 1px solid #d6d6d6;
              }
              div:nth-child(3) {
                width: 110px;
              }
              .el-radio {
                margin-top: 10px;
                &>span {
                  font-size: 0;
                }
              } // div:nth-child(4) {
              //     width: 18px;
              //     height: 18px;
              //     margin: 0;
              //     line-height: 44px;
              //     margin-left: 70px;
              // }
            }

          }
        }
      }
    }
    .little-batch-footer {
      width: 990px;
      height: 90px;
      box-shadow: 0 -2px 2px 2px rgba(0, 0, 0, 0.1);
      position: absolute;
      bottom: 0;
      left: 0;
      background: #fbfbfb;
      .btn-wrap {
        width: 236px;
        height: 36px;
        margin: 27px auto; //margin-top: 27px;
        .btn {
          width: 90px;
          height: 36px;
          text-align: center;
          border-radius: 4px;
          line-height: 36px;
          float: left;
          cursor: pointer;
        }
        .cenl-btn {
          border: 1px solid #d6d6d6;
          color: #999999;
          margin-right: 56px;
        }
        .add-btn {
          background: #2993f8;
          color: #fff;
        }
      }
    }
  }

</style>
<style lang="scss" scoped>
  @import "~assets/css/template/fonts.scss";
  .batch-main {
    width: 100%;
    height: 700px;
    overflow: hidden;
    padding: 30px 20px 0;
    .batch-header {
      .title {
        color: #333;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 25px;
      }
      .operate-bar-top {
        height: 28px;
        margin-bottom: 16px;
        .tap {
          width: 120px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #2993f8;
          float: left;
          display: flex;
          font-size: 0;
          overflow: hidden;
          margin-right: 16px;
          span {
              display: inline-block;
              height: 100%;
              flex: 1;
              float: left;
              line-height: 28px;
              text-align: center;
              color:#2993f8;
              font-size: 12px;
              cursor: pointer;
          }
          span.active {
              color:#fff;
              background: #2993f8;
          }
        }
        .search {
          width: 190px;
          height: 28px;
          border-radius: 4px;
          float: left;
          position: relative;
          overflow: hidden;

          input {
            border-radius: 4px;
            width: 188px;
            height: 28px;
            border: 1px solid #d6d6d6;
            padding-left: 10px;
            &:hover {
              border: 1px solid #2993f8;
            }
            &:focus {
              border: 1px solid #2993f8;
            }
            &:blur {
              border: 1px solid #ededed;
            }
          }
          .search-btn {
            position: absolute;
            width: 30px;
            height: 28px;
            right: 0;
            top: 0;
            background: #2993f8;
            text-align: center;
            cursor: pointer;
            i {
              color: #fff;
              line-height: 28px;
            }
          }
        }
      }

    }
    .batch-page-one {
      width: 100%;
      .operate-bar-bottom {
        height: 28px;
        margin-bottom: 25px;
        .batch-time-wrap {
          float: left;
          height: 28px;
          width: 188px;
          border: 1px solid #d6d6d6;
          border-radius: 4px;
          margin-right: 16px;
          &>span {
            line-height: 28px;
            font-size: 14px;
          }
          &:hover {
            border: 1px solid #2993f8 !important;
          }
          &:focus {
            border: 1px solid #2993f8 !important;
          }
        }
        .batch-select-wrap {
          float: left;
          margin-right: 16px;
        }
        .range-box {
          float: left;
          margin-right: 16px;
          width: 168px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          padding-left: 20px;
          input {
            width: 65px;
            height: 100%;
            float: left;
            text-align: center;
          }
          span {
            float: left;
            margin: 0 4px;
            line-height: 26px;
          }
        }
      }
      .table-main {
        width: 100%;
        overflow-y: auto;
        .checkboxGroup {
          .el-table {
            .el-table__body-wrapper {
              // height: 435px !important;
            }
          }
        }
        ul {
          li {
            width: 100%;
            height: 44px;
            padding-right: 20px;
            &:hover {
              background-color: #ededed;
            }
            .list {
              //line-height: 44px;
              height: 44px;
              div {
                margin-top: 13px;
                float: left;
                height: 14px;
                text-align: center;
                line-height: 14px;
              }

            }
            .left-list {
              float: left;
              div:nth-child(1) {
                min-width: 30px;
              }
              div:nth-child(2) {
                min-width: 120px;
              }
              div:nth-child(3) {
                min-width: 74px;
                border-right: 1px solid #d6d6d6;
              }
              div:nth-child(4) {
                min-width: 95px;
              }
              div:nth-child(5) {
                // width: 30px;
              }
            }
            .right-list {
              float: right;
              div:nth-child(1) {
                min-width: 80px;
              }
              div:nth-child(2) {
                width: 102px;
                border-left: 1px solid #d6d6d6;
                border-right: 1px solid #d6d6d6;
              }
              div:nth-child(3) {
                width: 110px;
              }
              div:nth-child(4) {
                width: 18px;
                height: 18px;
                margin: 0;
                line-height: 44px;
                margin-left: 70px;
              }
            }

          }
        }
        .detail {
          &:hover {
            color: #2993f8;
          }
        }
      }
    }
    .batch-page-two {
      .operate-bar-bottom {
        height: 28px;
        margin-bottom: 25px;
        .search-block {
          width: 118px;
          height: 28px;
          border: 1px solid #2993f8;
          border-radius: 4px;
          color: #2993f8;
          padding-left: 16px;
          font-size: 12px;
          line-height: 26px;
          float: left;
          margin-right: 16px;
          cursor: pointer;
          i {
            font-size: 12px;
            float: right;
            color: #dadada;
            margin-right: 8px;
          }
        }
        .class-btn-wrap {
          width: 346px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          float: left;
          margin-right: 16px;
        }
        .drop-block {
          width: 80px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          float: left;
          margin-right: 16px;
          text-align: center;
          .title-name {
            display: block;
            width: 100%;
            height: 100%;
          }
          .dropDown-wrap {
            height: 26px;
            &:hover {
              color: #666;
              background: #fff;
            }
            .title-name {
              height: 26px;
            }
          }
        }
        .range-box {
          float: left;
          margin-right: 16px;
          width: 168px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          padding-left: 20px;
          input {
            width: 65px;
            height: 100%;
            float: left;
            text-align: center;
          }
          span {
            float: left;
            margin: 0 4px;
            line-height: 26px;
          }
        }
      }
      .table-main {
        width: 100%;
        height: 435px;
        overflow-y: auto;
        position: relative;
        ul {
          li {
            width: 100%;
            height: 44px;
            padding-right: 20px;
            &:hover {
              background-color: #ededed;
            }
            .list {
              //line-height: 44px;
              height: 44px;
              div {
                margin-top: 13px;
                float: left;
                height: 14px;
                text-align: center;
                line-height: 14px;
              }

            }
            .left-list {
              float: left;
              div:nth-child(1) {
                min-width: 30px;
              }
              div:nth-child(2) {
                min-width: 120px;
              }
              div:nth-child(3) {
                min-width: 160px;
              }
              div:nth-child(4) {
                min-width: 74px;
                border-right: 1px solid #d6d6d6;
              }
              div:nth-child(5) {
                min-width: 95px;
              }
              div:nth-child(6) {
                // width: 30px;
              }
            }
            .right-list {
              float: right;
              div:nth-child(1) {
                width: 80px;
              }
              div:nth-child(2) {
                width: 102px;
                border-left: 1px solid #d6d6d6; //border-right: 1px solid #d6d6d6;
              }
              div:nth-child(3) {
                width: 18px;
                height: 18px;
                margin: 0;
                line-height: 44px;
                margin-left: 70px;
              }
            }

          }
        }
        .float {
          width: 100%;
          height: 20px;
          background-color: #FFF1D9;
          opacity: 0.8;
          position: absolute;
          top: 40px;
          z-index: 1;
          font-size: 10px;
          text-align: center;
          line-height: 20px;
          color: #FFBE50;
          i {
            margin-left: 20px;
            color: #DAD9D6;
          }
        }
      }
    }
    .batch-footer {
      width: 1300px;
      height: 90px;
      box-shadow: 0 -2px 2px 2px rgba(0, 0, 0, 0.1);
      position: absolute;
      bottom: 0;
      left: 0;
      background: #fbfbfb;
      .btn-wrap {
        width: 236px;
        height: 36px;
        margin: 27px auto; //margin-top: 27px;
        .btn {
          width: 90px;
          height: 36px;
          text-align: center;
          border-radius: 4px;
          line-height: 36px;
          float: left;
          cursor: pointer;
        }
        .cenl-btn {
          border: 1px solid #d6d6d6;
          color: #999999;
          margin-right: 56px;
        }
        .add-btn {
          background: #2993f8;
          color: #fff;
        }
      }
      .checkAll {
        position: absolute;
        right: 0;
        top: 24px;
        color: #b5b5b5; //width: 150px;
        em {
          font-style: normal;
          span {
            color: #2993f8;
          }
          .check-all {
            // margin-left: 16px;
            // text-align: center;
          }
          .checkbox-font {
            width: 30px;
            .el-checkbox__input {
              border-radius: 4px !important;
              overflow: hidden;
              height: 20px;
              width: 20px;
              .el-checkbox__inner {
                border-radius: 4px !important;
                overflow: hidden;
              }

            }
            .el-checkbox__input.is-checked {
              background-color: #2993f8 !important;
              border-color: #2993f8 !important;
              .el-checkbox__inner {
                background-color: #2993f8 !important;
                border-color: #2993f8 !important;
              }
            }
          }
        }

      }
    }
  } // 关闭XX
  .closeDialog {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  } // 重置按钮
  .reset {
    float: left;
    margin-right: 16px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    text-align: center;
    line-height: 28px;
    padding: 0 5px;
  }

</style>

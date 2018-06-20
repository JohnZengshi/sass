<template>
  <div class="receipts-wrap">
    <div class="receipts-list-tittle">
        <div class="tittle-left">
            <i class="iconfont icon-danjuliebiao"></i>商品列表
        </div>
        <div class="tittle-right">
            <ul>
                <!--<li class="btn" @click="printLabel">打印标签</li>-->
                <li class="classBox">
                    <span>
                        产品类别<i class="iconfont icon-arrow-down"></i>
                    </span>
                    <div class="drop-box">
                        <div class="drop-box-main">
                            <ul class="list-left">
                                <li @click="selectClass(1)" :class="{active: rightList == productClass[0].typeList}">计重类</li>
                                <li @click="selectClass(2)" :class="{active: rightList == productClass[1].typeList}">计件类</li>
                            </ul>
                            <ul class="list-right">
                                <li v-for="(item, index) in rightList" :key="index" @click="complateSel(item)" :class="{active: classId == item.classesId}">{{item.classesName}}</li>
                            </ul>
                        </div>
                        <div class="drop-box-footer">
                            <span @click="complateSelClass(1)">完成</span>
                            <span @click="complateSelClass(2)">重置</span>
                        </div>
                    </div>
                </li>
                
                <li class="sellBox">
                    <span>
                        售价范围<i class="iconfont icon-arrow-down"></i>
                    </span>
                    <div class="sellRange">
                      <input type="text" v-model="minPrice" @keyup.enter="searchKeybord">
                      <span>至</span>
                      <input type="text" v-model="maxPrice" @keyup.enter="searchKeybord">
                    </div>
                </li>
                <li class="weightBox">
                    <span>
                        重量范围<i class="iconfont icon-arrow-down"></i>
                    </span>
                    <div class="sellRange">
                      <input type="text" v-model="minGoldWeight" @keyup.enter="searchKeybord">
                      <span>至</span>
                      <input type="text" v-model="maxGoldWeight" @keyup.enter="searchKeybord">
                    </div>
                </li>
                <li>
                    <el-dropdown menu-align="start" @command="switchProductClass">
                        <span>
                            商品属性<i class="iconfont icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item :command="1">成品</el-dropdown-item>
                            <el-dropdown-item :command="2">旧料</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <DropDownMenu
                    titleName="商品属性"
                    dataType="属性"
                    :propList="attributeList"
                    @dropReturn="dropReturn"
                    ></DropDownMenu> -->
                </li>
                <li>
                    <el-dropdown menu-align="start" @command="switchSupplier">
                        <span>
                            供销商<i class="iconfont icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in supplierListData" :key="index" :command="item">{{item.supplierName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <DropDownMenu
                    titleName="供销商"
                    dataType="供应商"
                    :propList="supplierListData"
                    @dropReturn="dropReturn"
                    ></DropDownMenu> -->
                </li>
                <li>
                    <el-dropdown menu-align="start" @command="switchShop">
                        <span>
                            店铺<i class="iconfont icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in datas.shopList" :key="index" :command="item">{{item.shopName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <DropDownMenu
                    titleName="店铺"
                    dataType="店铺"
                    :propList="datas.shopList"
                    @dropReturn="dropReturn"
                    ></DropDownMenu> -->
                </li>
            </ul>
             <!--<el-select class="modal-list" @change="selectModal" v-model="modelTypeText" placeholder="请选择">
                <el-option value="00" label="全部">
                </el-option>
                <el-option
                v-for="item in modalList"
                :key="item.type"
                :label="item.label"
                :value="item.type">
                </el-option>
            </el-select>-->
        </div>
    </div>
    <div class="body-list-wrap" @scroll="onScroll" v-loading = "loading" element-loading-text="数据查询中">
        <div>
            <img class="no-data-img" src="./../../../static/img/space-page.png" v-if="billList.length == 0">
            <table class="head" cellspacing="0" cellpadding="0" v-else>
                <tr class="table-title">
                    <th>序号</th>
                    <th>商品名称</th>
                    <th>成色大类</th>
                    <th>条码号</th>
                    <th>售价<span>(￥)</span></th>
                    <th>重量<span>(g)</span></th>
                    <th>操作</th>
                </tr>
            <!-- </table>
            <table class="main"> -->
                <tr v-for="(item, index) in billList">
                    <td>{{index + 1}}</td>
                    <td>{{item.jewelry}}</td>
                    <td>{{item.bigClassName}}</td>
                    <td>{{item.barcode}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.weight}}</td>
                    <td @click.stop="goGoodDetail(item)">明细</td>
                </tr>
            </table>
        </div>
    </div>
    <PrintLabelByOrderDialog ref="printLabelByOrderDialog" :orderNum="print.currentOrderNum" :labelTemplateList="labelTemplateList" :productList="print.productList" :totalNum="print.totalNum" @requestProductList="requestProductList" @printTemplate="printTemplate" @previewTemplate="previewTemplate"></PrintLabelByOrderDialog>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions, mapState} from "vuex"
import {seekSearchProduct, seekGetShopListByCo} from '../../../src/Api/commonality/seek'
import PrintLabelByOrderDialog from './../../components/template/PrintLabelByOrderDialog'
import DropDownMenu from './components/DropDownMenu'
import Cascade from './../../../src/components/template/Cascade'
export default {
    components: {
        PrintLabelByOrderDialog,
        DropDownMenu,
        Cascade
    },
  data () {
    return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        beginTime: '',
        endTime: '',
        // showDwopBox: false,
        classId: '',
        productCategory :[],
        rightList: [],
        modelTypeText: '全部',
        modelType: '00',
        page: 1,
        pageSize: 30,
        billList: [],
        loading: true,
        attributeList: [
            {
                name: '全部',
                command: '全部'
            },
            {
                name: '成品',
                command: '1'
            },
            {
                name: '旧料',
                command: '2'
            }
        ],
        "datas": {
            "shopList": [], // 店铺列表
        },
        "onData": { // 下拉选中数据
            "shopId": "", // 店铺
            "timeType": "" // 时间
        },
        "print": {
            totalNum: 0,
            productList: [],
            currentOrderNum: null,
            canvas: {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: []
            },
            isPreview: false,
            templateData: {
                productList: []
            }
        },
        modalList: [
            {
                type: '01',
                label: '入库'
            },
            {
                type: '02',
                label: '退库'
            },
            {
                type: '03',
                label: '发货'
            },
            {
                type: '04',
                label: '退货'
            },
            {
                type: '05',
                label: '销售/回购'
            },
            {
                type: '06',
                label: '调柜'
            },
            {
                type: '07',
                label: '调库'
            },
            {
                type: '10',
                label: '修改'
            },
        ],
        dropData: {
            repositoryId: '', // 库位
            status: '', // 状态
            supplierId: '', // 供应商
            shopId: '', // 分销商
            beginTime: '', // 开始时间
            endTime: '' // 结束时间
        },
        minPrice: '',
        maxPrice: '',
        minGoldWeight: '',
        maxGoldWeight: '',
        typeStatus: '',
        productTypeGoldId: '', // 素金
        productTypeJewelId: '', // 珠宝
        productTypeJewelryId: '', //饰品
        productClass1: ''
    }
  },
  created () {
    console.log(this.$route)
    this.searchReceipt() // 搜索
    this.getShopList(); // 店铺列表
    this.workRepositoryList(); // 库位列表
    this.workProductClass(); // 产品类别
    this.workSupplierList(); // 供应商
  },
  computed: {
    ...mapGetters([
        "repositoryList", // 库位列表
        "shopListByCo", // 店铺列表
        "productClass", // 产品类别
        "supplierListData", // 供应商
        "userPositionInfo" // 职位信息
    ]),
    ...mapState({
        labelTemplateList: state => state.template.labelList
    }),
  },
  watch: {
    '$route': 'routerAct'
  },
  mounted () {
      let self = this
     Vue.nextTick(() => {
       // this.rightList = this.productClass[0].typeList
     })
    //  $(".body-list-wrap").mCustomScrollbar({
    //     theme: "minimal-dark",
    //     axis: 'y',
    //     mouseWheel: {
    //         scrollAmount: 200,
    //         preventDefault: false,
    //         normalizeDelta: false
    //     },
    //     callbacks: {
    //         onTotalScroll: function () {
    //             self.pageSize = Number(self.pageSize) + 30
    //             console.log(self.pageSize)
    //             self.searchReceipt(self.pageSiZe)
    //         }
    //     }
    // });
    // console.log(this.productClass)
  },
  methods: {
    ...mapActions([
        "workRepositoryList", // 库位列表
        "getShopListByCo", // 店铺列表
        "workProductClass", // 产品类别
        "workSupplierList" // 供应商
    ]),
    dropReturn (val) {
        console.log(val)
    },
    changeVaue (val) {
        console.log(val)
    },
    //产品类别
    callProductCategory( res ){
        console.log(res)
    },
    goGoodDetail (item) {
        //console.log(111111111111)
        //console.log(item)
        this.$router.push({path: '/inventory', query: {text: '商品搜索', barcode: item.barcode, productId: item.productId}})
    },
    printLabel () {
        this.print.currentOrderNum = this.$route.query.orderNumber
        this.$refs.printLabelByOrderDialog.show()
        console.log(this.$refs.printLabelByOrderDialog)
    },
    requestProductList (filter) {
        this.$store.dispatch('getPrintLabelByOrder', filter).then(json => {
            if (json.state == 200) {
                console.log(json)
                this.print.productList = json.data.productList
                this.print.totalNum = json.data.totalNum
            }
        })
    },
    previewTemplate (canvas, selectedProducts, isPrint) {
        // var LODOP = getLodop()
        this.print.canvas = canvas
        // let self = this
        if (selectedProducts.length) {
            this.$store.dispatch('getPrintLabelData', {
                productList: selectedProducts.map(selectedProduct => {
                    return {
                        productId: selectedProduct
                    }
                })
            }).then(json => {
                if (json.state == 200) {
                    console.log(json.data);
                    this.print.templateData = json.data;
                    this.print.isPreview = true;
                    this.printTemplate()
                }
            })
        } else {
            this.$store.dispatch('getPrintLabelData', {
                isTmp: 1,
                productType: 1
            }).then(json => {
                if (json.state == 200) {
                    this.print.templateData.productList = json.data.productList.slice(0, 1)
                    this.print.isPreview = true
                    this.printTemplate()
                }
            })
        }
    },
    //预览模板
    printTemplate () {
        Vue.nextTick(() => {
            this.$refs.lodop.multipagePrint()
        })
    },
    switchProductClass (command) {  
        if (command == "全部") {
            this.productClass1 = ''
        } else {
            this.productClass1 = command
        }
        this.searchReceipt() // 搜索
    },
    routerAct () {
        this.searchReceipt()
    },
    onScroll (e) {
        // console.log(e)
        // console.log(e.target.scrollHeight - e.target.scrollTop)
        if (e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight) {
            this.pageSize = Number(this.pageSize) + 30
            console.log(this.pageSize)
            this.searchReceipt(this.pageSiZe)
        }
    },
    // *********************************************************
    getTimeData(val) {
        console.log(val)
        this.dropData.beginTime = val.substr(0, 10).split('-').join("") + "000000"
        this.searchReceipt();
    },
    overTimeDate(val) {
        this.dropData.endTime = val.substr(0, 10).split('-').join("") + "000000"
        this.searchReceipt();

    },
    switchSearchType (command) { // 库位切换
        console.log(command)
        if (command == "全部") {
            this.dropData.repositoryId = ''
        } else {
            this.dropData.repositoryId = command.repositoryId
        }
        this.searchReceipt() // 搜索
    },
    switchStatus (command) { // 审核状态
        console.log(command)
        if (command == "全部") {
            this.dropData.status = ''
        } else {
            this.dropData.status = command
        }
        this.searchReceipt() // 搜索
    },
    switchSupplier (command) { // 供应商
        console.log(command)
        if (command == "全部") {
            this.dropData.supplierId = ''
        } else {
            this.dropData.supplierId = command.supplierId
        }
        this.searchReceipt() // 搜索
    },
    switchShop (command) {
        console.log(command)
        if (command == "全部") {
            this.dropData.shopId = ''
        } else {
            this.dropData.shopId = command.shopId
        }
        this.searchReceipt() // 搜索
    },
    searchKeybord () {
      this.searchReceipt()
    },
    // *********************************************************
    complateSelClass (type) {
        if (type == 1) {
            this.searchReceipt() // 搜索
        } else if (type == 2) {
            this.productTypeGoldId = ''
            this.productTypeJewelId = ''
            this.productTypeJewelryId = ''
            this.searchReceipt()
        }
    },
    complateSel (item) {
        this.classId = item.classesId
        // console.log(this.classId)
        if (this.typeStatus == 1) {
          this.productTypeGoldId = item.classesId

          this.productTypeJewelId = ''
          this.productTypeJewelryId = ''
        } else if (this.typeStatus == 2) {
          this.productTypeJewelId = item.classesId

          this.productTypeGoldId = ''
          this.productTypeJewelryId = ''
        } else if (this.typeStatus == 3) {
          this.productTypeJewelryId = item.classesId

          this.productTypeGoldId = ''
          this.productTypeJewelId = ''
        }
    },
    selectClass (type) { // 1.素金类 2.珠宝类 3.饰品类
        // console.log(type)
        this.typeStatus = type
        if (type == 1) {
            this.rightList = this.productClass[0].typeList
        } else if (type == 2) {
            this.rightList = this.productClass[1].typeList
        } else if (type == 3) {
            this.rightList = this.productClass[2].typeList
        }
        console.log(this.rightList)
    },
    selectModal (type) {
        // console.log(type)
        this.modelType = type
        this.searchReceipt()
    },
    searchReceipt () {
      this.loading = true
      let options = {
        search: this.$route.query.text,
        page: this.page,
        pageSize: this.pageSize,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minGoldWeight: this.minGoldWeight,
        maxGoldWeight: this.maxGoldWeight,
        productTypeGoldId: this.productTypeGoldId,
        productTypeJewelId: this.productTypeJewelId,
        productTypeJewelryId: this.productTypeJewelryId,
        productClass: this.productClass1
      }
      console.log(options)
      seekSearchProduct(options).then((res) => {
        console.log(res)
        this.loading = false
        this.billList = res.data.data.productList
        console.log(this.billList)
      }, (res) => {
        console.log(res)
      })
    },
    getState (parm) { // 调出库位
        switch (parm) {
            case "1":
                return "待审核";
            case "2":
                return "审核中";
            case "3":
                return "已审核";
        }
    },
    getModal (parm) {
      switch (parm) {
            case "01":
                return "入库";
            case "02":
                return "退库";
            case "03":
                return "发货";
            case "04":
                return "退货";
            case "05":
                return "销售/回购";
            case "06":
                return "调柜";
            case "07":
                return "调库";
            case "10":
                return "修改";
        }
    },
    goDetail (parm) {
        sessionStorage.setItem("isCheckOrderMan", parm.isCheckOrderMan);
        console.log(parm)
        this.$router.push({
            path: "/work/storage/NewStockIn",
            query: {
                "orderNumber": parm.orderNum,
                "isRole": parm.isRole,
                "isCheckOrderMan": parm.isCheckOrderMan
            }
        })
    },
    getShopList () { // 店铺列表
        let options = "";
        let _self = this;
        seekGetShopListByCo(options).then((response) => {
            if (response.data.state === 200) {
                console.log(response)
               _self.datas.shopList = response.data.data.shopList;
                if (response.data.data.shopList.length === 1) { // 只有一个店铺的情况下
                    _self.onData.shopId = response.data.data.shopList[0].shopId;
                }
            } else {
                this.$store.dispatch('workPopupError', response.data.msg);
            }
        }, (response) => {
            console.log("cuo店铺列表")
            console.log(response);
        });
    }
  }
}
</script>
<style lang="scss">
.modal-list {
    .el-input {
        width: 98px;
        height: 26px !important;
        .el-input__inner {
            height: 26px;
            background:#fff;
            border: 1px solid #eeeeee !important;
        }
        .el-input__icon {
            font-size: 10px;
        }
    }
}
.el-dropdown-menu {
    max-height: 300px;
    overflow-y: auto;
    
    .el-dropdown-menu__item {
        font-size: 14px;
    }
}
</style>
<style lang="scss" scoped>
  @import "~assets/css/template/fonts.scss";
  .receipts-wrap {
    height: 100%;
    margin: 0 auto;
    width: 1270px;
    padding-top: 20px;
    .receipts-list-tittle {
        height: 50px;
        width: 1250px;
        box-sizing: border-box;
        padding-top: 20px;
        padding-left:10px;
        .tittle-left {
            float: left;
            i {
                font-size: 20px;
                color:#2993f8;
                float: left;
                margin-right: 10px;
            }
        }
        .tittle-right {
            float: right;
            ul {
                float: left;
                li {
                    float: left;
                    color:#666;
                    margin-left: 40px;
                    position: relative;
                    span {
                        font-size: 14px;
                        color:#666;
                        .el-icon-caret-bottom {
                            font-size: 10px;
                            color: #999;
                        }
                    }
                    .el-dropdown {
                        span {
                            .el-icon-caret-bottom {
                                font-size: 10px;
                                color: #999;
                            }
                        }
                    }
                    .drop-box {
                        width: 200px;
                        height: 0;
                        border-radius: 10px;
                        box-shadow: none;
                        position: absolute;
                        z-index: 20;
                        background:#fff;
                        overflow: hidden;
                        left: -50px;
                        top: 25px;
                        transition: all .2s .4s ease;
                        .drop-box-main {
                            width: 100%;
                            position: absolute;
                            bottom: 40px;
                            top:0;
                            left: 0;
                            .list-left {
                                width: 80px;
                                float: left;
                                height: 100%;
                                border-right: 1px solid #f1f2f3;
                                li {
                                    height: 41px;
                                    margin: 0;
                                    color:#333333;
                                    font-size: 14px;
                                    text-align:center;
                                    width: 100%;
                                    line-height: 41px;
                                    border-bottom: 1px solid #f1f2f3;
                                    cursor: pointer;
                                }
                                li:hover {
                                    background:#f6f7f8;
                                }
                                li.active {
                                    color: #2993f8;
                                }
                            }
                            .list-right {
                                width: 119px;
                                float: right;
                                height: 100%;
                                overflow-y: auto;
                                li {
                                    height: 41px;
                                    margin: 0;
                                    color:#333333;
                                    font-size: 14px;
                                    text-align:center;
                                    width: 100%;
                                    line-height: 41px;
                                    border-bottom: 1px solid #f1f2f3;
                                    cursor: pointer;
                                }
                                li:hover {
                                    background:#f6f7f8;
                                }
                                li.active {
                                    color: #2993f8;
                                }
                            }
                        }
                        .drop-box-footer {
                            width: 100%;
                            height: 40px;
                            background:#f6f7f8;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            padding-top: 8px;
                            box-sizing: border-box;
                            span {
                                font-size: 14px;
                                display: block;
                                width: 60px;
                                height: 24px;
                                text-align: center;
                                line-height: 24px;
                                float: right;
                                margin-right: 12px;
                                cursor: pointer;
                            }
                            span:nth-child(2) {
                                color:#999999;
                            }
                            span:nth-child(1) {
                                background:#2993f8;
                                color:#fff;
                                border-radius: 4px;
                            }
                        }
                    }
                    /* 日期控件 */
                    .report-data{
                        display: inline-block;
                        width: 200px;
                        border:1px solid #d6d6d6;
                        border-radius: 5px;
                        height: 30px;
                        vertical-align: middle;
                        overflow: hidden;
                        background-color: #fff;
                        margin-left: 15px;
                        
                        >.block{
                            width: 50%;
                            float: left;
                            margin-top: 2px;
                            position: relative;
                            display: inline-block;
                            
                            .el-input__icon{
                            display: none;
                            }
                            .el-input__inner{
                                padding: 0;
                                text-align: center;
                                color: #2993f8;
                                background-color:transparent;
                                font-weight: bold;
                                letter-spacing: -1px;
                            }
                            
                            &.until:after{
                                content: attr(data-txt);
                                position: absolute;
                                right : -6px;
                                top:2px;
                                font-size: 14px;
                                color: #333;
                            }
                        }
                        
                        .el-date-editor{ width: 100%;}
                    }
                    .sellRange {
                      width: 230px;
                      height: 36px;
                      background:#fff;
                      border-radius: 4px;
                      position: absolute;
                      overflow: hidden;
                      left: -70px;
                      top: 22px;
                      box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
                      box-sizing: border-box;
                      padding-top: 6px;
                      opacity: 1;
                      z-index: -10;
                      transition: opacity .4s ease;
                      input {
                        width: 65px;
                        height: 22px;
                        background:#f5f5f5;
                        box-shadow: 0 0 3px 1px rgba(0,0,0,0.1) inset;
                        border-radius: 4px;
                        margin: 0 17px;
                      }
                    }
                }
                .classBox:hover .drop-box{
                    height: 300px;
                    box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
                }
                .sellBox:hover .sellRange {
                  opacity: 1;
                  z-index: 20;
                }
                .weightBox:hover .sellRange {
                  opacity: 1;
                  z-index: 20;
                }
            }
            .modal-list {
                float: right;
                margin-left: 40px;
            }
        }
    }
    .body-list-wrap {
      //padding-top: 20px;
      box-sizing: border-box;
      height: 766px;
      width: 1270px;
      overflow-x: hidden;
      overflow-y: auto;
      //padding-left: 10px;
      position: relative;
      .no-data-img {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left:-100px;
        margin-top: -95px;
      }
      table {
        width: 1250px;
        background:#fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 15px rgba(0,0,0,0.1);
        margin: 10px;
        position: relative;
        tr {
          th {
            height: 50px;
            font-size: 14px;
            color: #666;
            background: #f5f5f5;
          }
          td {
            height: 50px;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          td:last-child {
            color:#2993f8;
            cursor: pointer;
          }
        }
        .table-title {
            // position: absolute;
            // top: 0;
            // left: 0;
            // width: 100%;
            box-shadow: 0 2px 5px 1px rgba(0,0,0,0.1);
        }
        
      }
      
    //   .main {
    //         overflow-y: auto;
    //         height: 466px;
    //     }
    }
  }

</style>

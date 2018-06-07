<template>
    <div class="new-table-wrap">
        <div class="new-table-template">
            <section class="body-box">
                <div class="fixed-mask">
                </div>
                <div class="body-header">
                    <ul class="header-nav">
                        <li @click="goPreviousPage">退库<span>&nbsp;></span></li>
                        <li class="on">单据详情</li>
                    </ul>
                    <div class="back-btn" @click="goPreviousPage">返回上一级</div>
                </div>
                <div class="body-row2">
                    <div class="list-mask" ref="mask"></div>
                    <ul>
                        <li :class="{active: stepIndex == 1}">
                            <div class="main-name">待审核</div>
                            <div class="list-span" v-if="stepIndex == 1">
                                <div>{{receiptInfoList.userName}}</div>
                                <span>{{receiptData}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepIndex == 2}">
                            <div class="main-name">审核中</div>
                            <div class="list-span" v-if="stepIndex == 2">
                                <div>{{receiptInfoList.userName}}</div>
                                <span>{{receiptData}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepIndex == 3}">
                            <div class="main-name">已审核</div>
                            <div class="list-span" v-if="stepIndex == 3">
                                <div>{{receiptInfoList.userName}}</div>
                                <span>{{receiptData}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepIndex == 4}">
                            <div class="main-name">锁定</div>
                            <div class="list-span" v-if="stepIndex == 4">
                                <div>{{receiptInfoList.userName}}</div>
                                <span>{{receiptData}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="body-row3">
                    <div class="col-1">
                        <div class="per-info">
                            <img :src="receiptsIntroList.makeOrderManLog">
                            <span>{{receiptsIntroList.makeOrderManName}}</span>
                        </div>
                        <div class="main-info">
                            <div class="order-num">{{receiptsIntroList.orderNum}}</div>
                            <!--<ul>
                                <li>{{receiptsIntroList.storageName}}</li>
                                <li>{{receiptsIntroList.supplierName}}</li>
                                <li>{{receiptsIntroList.shopName}}</li>
                            </ul>-->
                            <sipping-receipts-intro
                                :receiptsIntroList="receiptsIntroList"
                                :introListOption="introListOption"
                                :toRouter='"/work/storage"'
                            ></sipping-receipts-intro>
                            <div class="order-time">{{receiptData}}</div>
                        </div>
                        <div class="main-right">
                            <div>{{receiptsIntroList.totalNum}}<span>件</span></div>
                            <div>
                                <span class="num-box">{{receiptsIntroList.totalWeight == '' ? 0 : receiptsIntroList.totalWeight}}<span>g</span></span>
                                <span class="num-box">{{receiptsIntroList.totalPrice == '' ? 0 : receiptsIntroList.totalPrice}}<span>元</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="remark-tittle">
                            <div class="tittle-left">备注</div>
                            <div class="tittle-right"><span class="operate" @click="addAct">添加</span><span class="del" @click="propsAct">删除</span></div>
                        </div>
                        <receipts-remark :isEdit="isEditFlag"  @del="delRemark" :refresh="refreshRemark"></receipts-remark>
                        <div class="mask" v-if="isShowMask">
                            <div class="del-div" v-if="isDel">
                                <el-button @click="closeMask(1)">取消</el-button>
                                <el-button type="primary" @click="closeMask(2)">确定删除</el-button>
                            </div>
                            <div class="add-div" v-else>
                                <textarea v-model="remarkText" class="text-area" placeholder="请输入备注...">
                                </textarea>
                                <div class="btn-grop">
                                    <el-button size="small" @click="closeMask(3)">取消</el-button>
                                    <el-button size="small" type="primary" @click="closeMask(4)">保存</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Rp_dataGrid_container body-row4">
                    <div class="rp_gridState">
                        <p class="side-nav"><i class="iconfont icon-liebiao"></i>{{toRouterUrlName}}</p>
                        <el-switch v-model="tabSwitch" :width="30"  :title="tabSwitch ?'关闭成本核算':'开启成本核算'"></el-switch>
                        <div class="tab">
                            <span 
                                v-for="(tab,index) in tabData" 
                                :key="tab.id" 
                                :class="index == tabClassActive.index ? tabClassActive.activeClass : ''" 
                                v-text="tab.txt" 
                                @click="tab.fun(index,tab.type)"
                            ></span>
                        </div>
                    </div>
                    
                    <div class="rp_dataGridTemp" :class="tabShow" v-loading = "loading" element-loading-text="数据查询中">
                        <report-detail 
                            :dataGridStorage = "data" 
                            :tabSwitch = "tabSwitch" 
                            @scrollClass = "tabScrollShow" 
                            :reportType="getReportType()">
                        </report-detail>
                    </div>
                    
                </div>
                <div class="body-row5">
                    <div class="btn-wrap">
                         <div class="btn" v-if="receiptsIntroList.checkType == '1'" @click="operateSubmit">提交审核</div>
                        <!--<div class="btn" @click="printContent">打印单据</div>-->
                    </div>
                    <i class="el-icon-delete2" @click="delOrder"></i>
                </div>
            </section>
        </div>
        <div> 
            <!-- 删除单据 -->
            <delect-receipts
                v-on:delectReceiptsState="delectReceiptsState"
                :delPopup='popup.deleteReceipts'
                :receiptsOrderNum='popup.receiptsOrderNum'
            ></delect-receipts>
            <!-- 审核弹窗 -->
            <audit-receipts
                v-on:delectReceiptsState="delectReceiptsState"
                :auditPopup='popup.auditPopup'
                :receiptsOrderNum='receiptsIntroList.orderNum'
                :auditsReceiptsForm='receiptsIntroList.checkType'auditsReceiptsForm
            ></audit-receipts>
            <!-- 批量添加 -->
            <BatchAddReceipts
                v-if="popup.batchAddReceiptsPopup"
                :isPopup="popup.batchAddReceiptsPopup"
                :supplierListData="supplierListData"
                v-on:addReceiptsState="delectReceiptsState"
            >    
            </BatchAddReceipts>
        </div>
    </div>
</template>
<script>
import {productDetailStatus} from './../../../../Api/commonality/status'
import {operateProductList} from './../../../../Api/commonality/operate'
import {receiptOptionsName} from '../../../../Api/commonality/status'
import error from "./../../CommonalityComponent/popupTemplate/error"
import affirm from "./../../CommonalityComponent/popupTemplate/affirm"
import {seekGoodsList, seekReceiptStatusList} from './../../../../Api/commonality/seek'
import {mapActions, mapGetters} from 'vuex'
import auditReceipts from './../../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
import BatchAddReceipts from '../../../../components/work/BatchAddReceipts'
import delectReceipts from './../../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
import sippingReceiptsIntro from '../../../../components/work/SippingReceiptsIntro.vue' // 单据简介
import receiptsRemark from "../../../../components/work/ReceiptsRemark.vue"
import ReportDetail from './reportDetailTab'

export default {
    data () {
        return {
            //大、小类 tab切换
            tabData : [
                { txt:'明细', fun : this.tabs ,type:3},
                { txt:'成色大类', fun : this.tabs,type:1 },
                { txt:'成色小类', fun : this.tabs ,type:2}
            ],
            tabClassActive :{
                index : 0,
                activeClass : 'active'
            },
            //
            propOptons: {
                beginTime : '',
                endTime : '',
                storageId : '', //入库ID
                productTypeId : '',//产品类别ID
                supplierId :'', //供应商ID
                shopId : '',//分销商ID
                makeUserId : '',//制单人ID
                checkUserId : '',//审核人ID
                reportType : 3 //报表类型 ，为1时代表成色大类，为2时是成色小类，为3时是明细 ,默认为明细
            },
            //
            tabShow: 'tabShow',
            loading:false,
            dataGridStorage : {},
            dataGridDetailList : [],
            //成本核算
	        tabSwitch : false,
            value1: false,
            newAddtableData: [], // 新添加的数据
            amandTableData: [], //修改过后的数据
            tableInitRowData: [], // 初始商品数据
            newRowData: [], // 当前操作的一行数据
            tableIndex: '',
            value: [],
            tableIndex: null,
            refreshRemark: false, // 刷新备注
            remarkText: '',
            isDel: false,
            remarkId: '',
            isShowMask: false, // 备注弹窗
            isREfresh: true,  // 是否刷新
            scrollLeft: 0,  // 表格头部距离
            tableRowData: [
                // leftRowData: [],
                // rightRowData: []
            ],
            isEditFlag: false,
            receiptData: '', //单据创建时间
            stepIndex: [], // 进度条index
            "totalNumData": {
                "totalNum": 1
            },
            "introListOption": false, // 关闭单据简介的编辑
            "tittleThs": [
                {"name": '序号'},
                {"name": '商品编码'},
                {"name": '产品类别'},
                {"name": '首饰名称'},
                {"name": '总件重（g）'},
                {"name": '净金重'},
                {"name": '证书号'},
                {"name": '主石'},
                {"name": '颜色'},
                {"name": '净度'},
                {"name": '副石'},
                {"name": '售价'}
            ],
            "configData": {
                "barcode": null, // 条形码
                "productName": null, // 产品类别
                "jewelry": null, // 首饰名称
                "weight": null, // 总件重
                "netWeight": null, // 净金重
                "certifiNo": null, // 证书号
                "jewelryName": null, // 主石
                "color": null, // 颜色
                "neatness": null, // 净度
                "subJewelryName": null, // 副石
                "price": null // 售价
            },
            "pageSize": 10,
            "datas": {
                "postDataList": [], // 请求回来的数据集合(配置好的)
                "newGapDatas": [] // 新的空白数据
            },
            "popup": {
                "fullscreenLoading": false, // 保存过程的过场动画
                "successData": null, // 制单成功数据
                "deleteReceipts": false, // 删除单据弹窗
                "batchAddReceiptsPopup": false,
                "auditPopup": false // 审核弹窗
            },
            "crudData": { // 增查更删数据
                "currentPage": 1, // 当前页
                "checked": false, // 监听全选
                "checkList": [], // 选择按钮（选中的数据集合）删除
                "operationCut": true // 操作按钮切换
            }
        }
    },
    props: [
        "receiptStatus", // 收货
        "receiptsIntroList", // 单据简介
        'newDatas', // 上一页带过来的数据
        'closeRouterUrl', // 关闭的路由地址
        'toRouterUrlName', // 上一级单据名
        'supplierListData',
        'isCheckOrderMan',
        'isRole',
        'data'
    ],
    components: {
        error,
        affirm,
        auditReceipts,
        sippingReceiptsIntro,
        delectReceipts,
        BatchAddReceipts,
        sippingReceiptsIntro,
        receiptsRemark,
        ReportDetail
    },
    computed: {
        ...mapGetters([
            "userInfo", // 用户基本信息
            "saveSuccess", // 保存弹窗
            "saveSuccessData" // 保存弹窗数据
        ]),
        paginationSize () { // 分页的大小
            return Number(this.totalNumData.totalNum) + this.datas.newGapDatas.length;
        },
        showDatas () { // 最终显示的数据
            return [...this.datas.postDataList, ...this.showNewAddData];
        },
        endGetPage: function () { // 后台最后一页
            var totalNum = Number(this.totalNumData.totalNum); // 后台总条数
            var allNum = Math.ceil(totalNum / 10); // 最后一页
            return allNum;
        },
        endGetData: function () { // 后台最后一页所占的条数
            var totalNum = Number(this.totalNumData.totalNum); // 后台总条数
            var allNum = Math.floor(totalNum / 10); // 能填满的页数
            return totalNum - allNum * 10;
        },
        showNewAddData: function () { // 当前页显示的空白数据
            let currentPage = Number(this.crudData.currentPage); // 当前页
            let endGetData = this.endGetData; // 后台最后一页所占的条数
            let endGetPage = this.endGetPage; // 最后一页
            if (this.endGetData > 0) { // 后台最后一页数据不满的情况下
                if (currentPage === endGetPage) { // 是后台最后一页
                    let endNum = 10 - endGetData; // 每页显示的条数 - 最后一页的后台数据
                    return this.datas.newGapDatas.slice(0, endNum);
                } else { // 大于后台最后一页
                    let startNum = (currentPage - endGetPage - 1) * 10 + (10 - endGetData);
                    let endNum = startNum + 10;
                    return this.datas.newGapDatas.slice(startNum, endNum);
                }
            } else {
                let startNum = (currentPage - endGetPage - 1) * 10;
                let endNum = startNum + 10;
                return this.datas.newGapDatas.slice(startNum, endNum);
            }
        },
        newPage () { // 总页数
            return Math.ceil(this.paginationSize / this.pageSize);
        },
        getOptionsName () { // 操作名字
            return receiptOptionsName(this.receiptsIntroList.checkType);
        },
        getOperateTakeOrderName () {
            if (this.receiptStatus) {
                if (this.receiptStatus === "1") { // 未收货
                    return "收货"
                } else {
                    return false
                }
            }
        },
        printOptions () { // 打印单据
            let isCheckOrderMan = this.$route.query.isCheckOrderMan === "Y";
            let isUser = this.receiptsIntroList.makeOrderManId === sessionStorage.getItem("id");
            if (isUser) { // 制单人
                return true;
            } else if (isCheckOrderMan) { // 审核人
                if (this.receiptsIntroList.checkType === "2") { // 审核中
                    return true;
                }
            } else { // 其它
                if (this.receiptsIntroList.checkType !== "3") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        rcvFlag () { // 收货方
            var rcvFlag = sessionStorage.getItem("rcvFlag") || false;
            if (rcvFlag === "Y") {
                return true;
            } else {
                return false;
            }
        },
        delectOptionRole () {
            let checkType = this.receiptsIntroList.checkType === "1";
            let isRole = this.$route.query.isRole === "Y";
            if (isRole && checkType) {
                return true;
            } else {
                return false;
            }
        },
        addRole () {
            let checkType = this.receiptsIntroList.checkType === "1";
            let isRole = this.$route.query.isRole === "Y";
            if (isRole && checkType) {
                return true;
            } else {
                return false;
            }
        }
    },
    created () {
        this.getGoodsList();
        this.receiptStatusList();
    },
    watch:{
        receiptsIntroList : function(){
           // console.log('watch', this.receiptsIntroList)
            //this.formatTime()
        }
    },
    mounted () {
        this.$nextTick(()=>{
            this.Inteval = setInterval(()=>{
                if( this.receiptsIntroList ){
                    clearInterval(this.Inteval)
                    // console.log('test', this.receiptsIntroList)
                    this.formatTime()
               }
            },10)
        })
    },
    methods: {
        ...mapActions([
            "workPopupError" // 错误弹窗
        ]),
        //获取当前的接口类型
        getReportType(){
        	return this.propOptons.reportType
        },
        setReportType( port ){
        	if( port ) this.propOptons.reportType = port
        },
        //滚动条滚动时不显示总计
    	tabScrollShow( type ){
    		this.tabShow = type ? 'tabShow' : ''
    	},
        tabs(index,type){
    		this.loading = true;
    		this.tabClassActive.index = index;
    		this.setReportType(type)
    		this.send()
    	},
        formatTime () {
            
            //console.log(this.receiptsIntroList)
            console.log(this.receiptsIntroList)
            let year = this.receiptsIntroList.createDate.substring(0, 4)
            let month = this.receiptsIntroList.createDate.substring(4, 6)
            let data = this.receiptsIntroList.createDate.substring(6, 8)
            let hour = this.receiptsIntroList.createDate.substring(8, 10)
            let time = this.receiptsIntroList.createDate.substring(10, 12)
            this.receiptData = year + "-" + month + "-" + data + " " + hour + ":" + time
        },
        delOrder () {
            let options = {
                orderNum: this.$route.query.orderNumber
            }
            this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(() => {
                operateDeleteByOrderNumber(options).then((res) => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }, (res) => {
                    console.log(res)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 关闭单据备注弹窗
        closeMask (type) {
            this.isShowMask = false
            if (type == 2) {
                let option = {
                        remarkId: this.remarkId,
                        type: '1'
                }
                console.log(option)
                operateRemarkOperation(option).then((res) => {
                    console.log(res)
                    this.refreshRemark = !this.refreshRemark
                }, (res) => {
                    console.log(res)
                })
            } else if (type == 4) {
                let options = {
                    modifyList: [
                        {
                            dataType: '5',
                            objectData: this.remarkText
                        }
                    ],
                    orderNum: this.$route.query.orderNumber,
                    modelType: '4'
                }
                console.log(options)
                operateHandleXGReceipt(options).then((res) => {
                    console.log(res)
                    this.refreshRemark = !this.refreshRemark
                }, (res) => {
                    console.log(res)
                })
            }
        },
        delRemark (val) {
            console.log(val)
            this.isShowMask = val.type
            this.remarkId = val.item.id
            this.isDel = true
        },
        // 提交审核
        operateSubmit () {
            let options = {
                orderNum: this.$route.query.orderNumber
            }
            operateSubmitAudit(options).then((res) => {
                console.log(res)
            }, (res) => {
                console.log(res)
            })
        },
        onScroll (e) { // 滚动加载
            console.log(e)
            var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
            var clientHeight = e.currentTarget.clientHeight; // 元素的高度
            var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
            console.log(scrollTop)
            if (clientHeight + scrollTop >= scrollHeight) {
                // this.getNewGoodsInfoList(this.cbFun);
                console.log("到头啦！~")
            }
        },
        // 获取商品数据
        updateGoodsList () {
            let options = {
                "page": "1", // 当前页
                "pageSize": "10", // 每页显示数
                "objId": this.$route.query.orderNumber,
                "type": "3" // 操作类型 3=单据号; 5=条码号
            }
            getUpdateGoodsList(options).then((res) => {
                console.log(res)
            }, (res) => {
                console.log(res)
            })
        },
        goClick () {
            this.$refs.tableList.click();
        },
        // 点击展开按钮列表
        // openBtnList () {
        //     if (this.$refs.btn_list.style.width == '0px') {
        //         this.$refs.btn_list.style.width = 'auto'
        //     } else if (this.$refs.btn_list.style.width == 'auto') {
        //         this.$refs.btn_list.style.width = '0px'
        //     }
        // },
        addAct () {
            this.isDel = false
            this.isShowMask = true
        },
        propsAct () {
            this.isEditFlag = !this.isEditFlag
        },
        // 单据状态
        receiptStatusList () {
            let options = {
                orderId: this.$route.query.orderNumber
            }
            seekReceiptStatusList(options).then((res) => {
                console.log(res)
                this.receiptInfoList = res.data.data.dataList[0]
                if (res.data.data.dataList[0].status == "1") {
                    this.stepIndex = 1
                    this.$refs.mask.style.width = "312.5px"
                } else if (res.data.data.dataList[0].status == "2") {
                    this.stepIndex = 2
                    this.$refs.mask.style.width = "625px"
                } else if (res.data.data.dataList[0].status == "3") {
                    this.stepIndex = 3
                    this.$refs.mask.style.width = "937.5px"
                } else if (res.data.data.dataList[0].status == "6") {
                    this.stepIndex = 4
                    this.$refs.mask.style.width = "1250px"
                }
            }, (res) => {
                console.log(res)
            })
        },
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            var _self = this;
            this.crudData.currentPage = val;
            if (this.newPage <= val) { // 最后一页才给选择
                if (this.datas.newGapDatas.length > 0) { // 有空白数据的情况下
                    setTimeout(function () {
                        _self.getFocus();
                    }, 100);
                }
            }
            this.getGoodsList();
            console.log(`当前页: ${val}`);
        },
        delectReceiptsState (parm) { // 监听确认删除弹窗和操作成功
            if (parm.type === "2") { // 单据操作成功/删除成功
                if (this.popup.deleteReceipts) { // 删除单据
                    this.close();
                } else {
                    this.$emit("getSeekSellReceiptsIntro"); // 单据操作成功
                }
            }
            if (parm.type === "3") {
                this.getGoodsList();
                this.$emit("getSeekSellReceiptsIntro"); // 单据操作成功
            }
            this.popup.deleteReceipts = parm.name;
            this.popup.auditPopup = parm.name;
            this.popup.batchAddReceiptsPopup = parm.name;
        },
        getFocus () {
            var endIndex = this.showDatas.length - 1;
            var endFacus = "xh" + endIndex;
            // this.$refs[endFacus][0].focus()
        },
        getGoodsList () { // 获取商品列表
            var options = {
                "orderNum": this.$route.query.orderNumber,
                "page": this.crudData.currentPage,
                "pageSize": "100"
            }
            seekGoodsList(options).then((response) => {
                if (response.data.state === 200) {
                    console.log(response)
                    // this.dataGridStorage = response.data.data
                    this.datas.postDataList = [];
                    if (response.data.data.productList.length > 0) {
                        this.totalNumData.totalNum = response.data.data.totalNum;
                        for (let j = 0; j < response.data.data.productList.length; j++) {
                            var datas = this.getconfigData(response.data.data.productList[j]);
                            this.datas.postDataList.push(datas);
                        }
                    } else {
                        if (this.datas.newGapDatas.length < 1) {
                            this.appendRow();
                        }
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        appendRow () { // 新增
            var rowData = JSON.stringify(this.configData);
            var newRowData = JSON.parse(rowData);
            this.datas.newGapDatas.push(newRowData);
            this.controlPage();
        },
        appendBatchRow () { // 批量新增
            this.popup.batchAddReceiptsPopup = !this.popup.batchAddReceiptsPopup;
        },
        // printReceipts () { // 打印单据
        //     let orderNumber = this.receiptsIntroList.orderNum
        //     let receiptsIntroList = JSON.stringify(this.receiptsIntroList)
        //     let selectRouter = orderNumber.substr(0, 2)
        //     sessionStorage.setItem('receiptsIntroList', receiptsIntroList)
        //     sessionStorage.setItem('introListOption', this.introListOption)
        //     sessionStorage.setItem('orderNum', orderNumber)
        //     this.display = true
        //     let receiptsNmae = ['DK', 'TK', 'DG', 'FH', 'XS', 'RK', 'XG', 'TH']
        //     let parentRouters = ['transferStorage', 'storageReturn', 'transferCabinet', 'sipping', 'sell', 'storage', 'amend', 'salesReturn']
        //     let childrenRouters = ['printDK', 'printTK', 'printDG', 'printFH', 'printXS', 'printRK', 'printXG', 'printTH']
        //     for (let i = 0; i < receiptsNmae.length; i++) {
        //        if (selectRouter === receiptsNmae[i]) {
        //            this.$router.push({
        //            path: "/work/" + parentRouters[i] + "/" + childrenRouters[i],
        //            query: {
        //                 'orderNumber': orderNumber,
        //                 'isCheckOrderMan': this.isCheckOrderMan,
        //                 'isRole': this.isRole
        //                 }
        //             })
        //        }
        //    }
        // },
        goPreviousPage (parm) { // 返回上一页
            this.$router.push("/work/storageReturn")
        },
        auditFun () { // 提交审核
            this.popup.auditPopup = true;
        },
        controlPage () { // 控制分页
            var _self = this;
            if (this.newPage > this.crudData.currentPage) {
                this.datas.postDataList = [];
                this.crudData.currentPage = this.newPage; // 控制分页
            }
            setTimeout(function () {
                _self.getFocus();
            }, 100);
        },
        getconfigData (parm) { // 得到配置代码
            let configDatas = {};
            for (let key in this.configData) {
                configDatas[key] = parm[key] || null
            }
            return configDatas;
        },
        delProduct (barcode, index, operate, showData) {
            if (showData.barcode) {
                this.queryBarCode(barcode, index, operate);
            } else {
                this.datas.newGapDatas.splice((index - this.datas.postDataList.length), 1);
            }
        },
        queryBarCode (barcode, index, operate) { // 通过条码号操作数据
            if (barcode) {
                let options = {
                    "productList": [
                        {
                            "barcode": barcode.trim()
                        }
                    ],
                    "operate": operate,
                    "orderNum": this.$route.query.orderNumber
                }
                operateProductList(options).then((response) => {
                    if (response.data.state === 200) {
                        this.$emit("closePopup", false)
                        this.$emit("getSeekSellReceiptsIntro")
                        if (operate === "1") { // 新增
                            this.savaOperateSuccess(response.data.data, index);
                        } else if (operate === "2") { // 删除
                            this.delOperateSuccess(index);
                        }
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
        },
        savaOperateSuccess (parm, index) { // 保存成功后的回调
            if (this.datas.newGapDatas.length < 2) {
                this.datas.newGapDatas[0].barcode = null;
            } else {
                for (var i = 0; i < this.datas.newGapDatas.length; i++) {
                    if (this.datas.newGapDatas[i].barcode === parm.barcode) {
                        this.datas.newGapDatas.splice(i, 1);
                    }
                }
            }
            var datas = this.getconfigData(parm);
            this.datas.postDataList.push(datas);
            this.controlPage();
        },
        delOperateSuccess (index) { // 删除成功后的回调
            this.datas.postDataList.splice(index, 1);
        },
        getAuditStatus (parm) { // 审核状态
            return productDetailStatus(parm);
        },
        delectReceipts (parm) {
            this.popup.deleteReceipts = true;
            this.popup.receiptsOrderNum = this.$route.query.orderNumber;
        },
        close () { // 关闭
            this.$router.push(this.closeRouterUrl);
        }
    }
}
</script>
<style lang="scss" scoped>
.new-table-wrap{
    width: 100%;
    height: 796px;
}
.new-table-template{
    width: 100%;
    height: 100%;
    .body-box{
        position: relative;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        padding-right: 10px;
        .fixed-mask {
            height: 80px;
            position: fixed;
            top: 60px;
            left: 180px;
            z-index: 10;
            width: 100%;
            background:#f5f8f7;
        }
        .body-header{
            height: 80px;
            width: 1250px;
            overflow-y: hidden;
            overflow-x: auto;
            position: fixed;
            top: 40px;
            left: 190px;
            z-index: 10;
            // background:#f5f8f7;
            padding-top: 20px;
            // border-radius: 10px;
            // box-shadow: 0 0 15px rgba(0,0,0,0.1);
            box-sizing: border-box;
            padding-right: 20px;
            .back-btn {
                width: 90px;
                height: 28px;
                float: right;
                background:#2993f8;
                color:#fff;
                border-radius: 4px;
                text-align: center;
                line-height: 28px;
                font-size: 12px;
                font-weight: bold;
                margin-top: 16px;
                transition: all .3s;
                &:hover{
                   background: #057aea;
                }
            }
        }
        .body-row2 {
            margin-top: 90px;
            margin-left: 10px;
            height: 60px;
            width: 1250px;
            background:#fff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            overflow: hidden;
            position: relative;
            margin-bottom: 30px;
            .list-mask {
                height: 100%;
                width: 0;
                background:#ffd927;
                position: absolute;
                left: 0;
                top :0;
                z-index: 0;
            }
            ul {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top :0;
                z-index: 3;
                li {
                    width: 312.5px;
                    height: 100%;
                    float: left;
                    font-size: 16px;
                    color:#333;
                    text-align: center;
                    box-sizing: border-box;
                    padding-left: 130px;
                    .main-name {
                        line-height: 60px;
                        float: left;
                        height: 100%;
                        margin-right: 12px;
                    }
                    .list-span {
                        float: left;
                        width: 100px;
                        height: 14px;
                        font-size: 14px;
                        color:#999;
                        line-height: 18px;
                        font-weight: normal;
                        padding-left: 12px;
                        border-left: 1px solid #999999;
                        margin-top: 23px;
                        div {
                            margin-top: -9px;
                            color: #333;
                        }
                    }
                }
                li.active {
                    background:url('./../../../..//assets/img/work/step.jpg') no-repeat right center;
                    text-align: left;
                    font-weight: bold;
                    padding-left: 16px;
                }
            }
        }
        .body-row3 {
            margin-left: 10px;
            height: 150px;
            width: 1250px;
            margin-bottom: 30px;
            .col-1 {
                background:#fff;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0,0,0,0.1);
                width: 860px;
                height: 100%;
                float: left;
                .per-info {
                    width: 160px;
                    height: 100%;
                    float: left;
                    img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin:0 auto;
                        display: block;
                        margin-top: 30px;
                        margin-bottom: 18px;
                    }
                    span {
                        text-align: center;
                        margin:0 auto;
                        display: block;
                        font-size: 16px;
                        color:#333;
                    }
                }
                .main-info {
                    float: left;
                    width: 370px;
                    height: 100%;
                    padding-top: 28px;
                    box-sizing: border-box;
                    .order-num {
                        color:#2993f8;
                        font-size: 14px;
                        font-weight: bold;
                        height: 48px;
                    }
                    ul {
                        height: 28px;
                        li {
                            float: left;
                            padding-left: 16px;
                            padding-right: 16px;
                            color:#333333;
                            font-size: 14px;
                        }
                        li:nth-child(1) {
                            padding-left: none;
                        }
                    }
                    .order-time {
                        color:#999999;
                        font-size: 14px;
                    }
                }
                .main-right {
                    height: 50px;
                    width: 280px;
                    float: right;
                    margin-top: 52px;
                    div:nth-child(1) {
                        margin-top: 14px;
                        float: left;
                        line-height: 16px;
                        color:#ff4f46;
                        font-size: 24px;
                        padding-right: 28px;
                        height: 20px;
                        border-right: 1px solid #d6d6d6;
                        span {
                            color:#999999;
                            font-size: 14px;
                            margin-left: 6px;
                        }
                    }
                    div:nth-child(2) {
                        float: left;
                        height: 50px;
                        margin-left: 28px;
                        .num-box {
                            margin-bottom: 18px;
                            display: block;
                            font-size: 14px;
                            color:#333;
                            span {
                                font-size: 12px;
                                color:#999999;
                            }
                        }
                    }
                }
            }
            .col-2 {
                background:#fff;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0,0,0,0.1);
                overflow: hidden;
                width: 370px;
                height: 100%;
                float: right;
                padding: 18px 20px;
                position: relative;
                .remark-tittle {
                    height: 20px;
                    margin-bottom: 24px;
                    .tittle-left {
                        float:left;
                        font-size: 14px;
                        color:#999;
                    }
                    .tittle-right {
                        float: right;
                        font-size: 14px;
                        color:#999;
                        .operate {

                        }
                        .del {

                        }
                    }
                }
                .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background:rgba(0,0,0,0.7);
                    .del-div {
                        margin: 57px auto;
                        width: 163px;
                        height: 36px;
                    }
                    .add-div {
                        .text-area {
                            width: 330px;
                            height: 90px;
                            margin-left: 20px;
                            margin-top: 18px;
                            border-radius: 4px;
                            float: left;
                        }
                        .btn-grop {
                            float: right;
                            margin-right: 20px;
                            margin-top: 7px;
                        }
                    }
                }
            }
        }
        .body-row4 {
            margin-left: 10px;
            min-width: 1250px;
            min-height: 547px;
            background:#fff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            overflow: hidden;
            position: relative;
        }
        .body-row5 {
            margin: 0 auto;
            height: 58px;
            width: 1250px;
            background:#fff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            position: fixed;
            bottom: 0;
            left: 190px;
            z-index: 20;
            .btn-wrap {
                width: 382px;
                height: 100%;
                margin: 0 auto;
                .btn {
                    width: 90px;
                    height: 36px;
                    color:#fff;
                    background:#2993f8;
                    float: left;
                    border-radius: 4px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 36px;
                    font-weight: bold;
                    margin-top: 13px;
                    margin-right: 56px;
                    cursor: pointer;
                    transition: all .3s;
                    &:hover{
                       background: #057aea;
                    }
                }
                .btn:last-child {
                    margin-right: 0;
                }
            }
            .el-icon-delete2 {
                position: absolute;
                right: 10px;
                top: 16px;
                font-size: 30px;
                color:#2993f8;
                cursor: pointer;
            }
        }
        
    }
}
.new-template-table{
    width: 100%;
    height: 100%;
    background-color: #e8e9eb;
    .tr-header{
        background-color: #fff!important;
        &:hover{
            background-color: #e8e9eb;
        }
        .header-state{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            li:first-child{
                background-color: #e8e9eb;
            }
            li{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #d6d6d6;
                background-color: #fff;
            }
        }
    }
    tr{
        height: 40px;
        width: 100%;
    }
    tr:nth-child(odd){
        background-color: #f6f7f8;
    }
    tr:nth-child(even){
        background-color: #fff;
    }
    tr{
        &:hover{
            background-color: #e6f8f6;
        }
    }
    th,td{
        text-align: center;
        font-size: 12px;
        height: 60px;
        overflow: hidden;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    th{
        color: #666;
        position: relative;
        font-size: 14px;
        background: #fff;
        span{
            vertical-align: middle;
        }
        .open-icon{
            vertical-align: middle;
            position: absolute;
            right: 0;
            top: -10px;
            padding-top: 10px;
            width: 20px;
            margin-top: 14px;
            cursor: pointer;
        }
    }
    td{
        color: #333;
    }
    .table-pull{
        padding: 0!important;
    }
    .del-product{
        cursor: pointer;
    }
}
</style>
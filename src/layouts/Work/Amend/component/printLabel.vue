<template>
    <div class="receipts">
        <!--<span data-text="打印单据" @click="reportsPrintRK">
          <i class="iconfont icon-shouyindadan"></i>
        </span>-->
        <span data-text="导出表格" v-if="dataGridOptions.type == 1" @click="exportTab()">
    <i class="iconfont icon-daochu"></i>
</span> <span data-text="打印单据" @click="tabPrint">
    <i class="iconfont icon-dayin"></i>
</span> <span data-text="打印标签" @click="printLabel">
    <i class="iconfont icon-shouyindadan"></i>
</span>

        <!--打印标签-->
        <PrintLabelByOrderDialog ref="printLabelByOrderDialog" :orderNum="orderNum" :labelTemplateList="labelTemplateList" :productList="print.productList" :totalNum="print.totalNum" @requestProductList="requestProductList" @printTemplate="printTemplate" @getPrintLabelData="getPrintLabelData" @previewTemplate="previewTemplate"></PrintLabelByOrderDialog>

        <lodop ref="lodop" :canvas="print.canvas" :templateData="print.templateData" :page="print.templateData.productList.length"></lodop>

        <!--<TemplatePreviewDialog
          ref="templatePreviewDialog"
          @print="printTemplate"
          :canvas="print.canvas"
          :templateData="print.templateData"
          :pageNumber="print.templateData.productList.length">
        </TemplatePreviewDialog>-->

        <!--打印模块-->
        <div ref="tablePrint" v-if="isPrint">
            <table-print :tabSwitch="tabSwitch" :reportType="reportType" :printSelectDate="printSelectDate" :orderData="orderData" :dataGridStorage="dataGridStorage"></table-print>
        </div>
    </div>

</template>

<script>
    import {JaTools} from '@/utils/JaTool.js';
    import {mapActions, mapGetters, mapState} from 'vuex'
    import PrintLabelByOrderDialog from 'components/template/PrintLabelByOrderDialog'
    //import TemplatePreviewDialog from 'components/template/TemplatePreviewDialog'
    import Lodop from 'components/template/Lodop'
    import {seekGetStorageData} from 'Api/commonality/operate'
    //打印模块
    import TablePrint from './../../../Work/CommonalityComponent/print/dataGridPrint'
    // 导出按钮
    import {downLoaderFile} from 'Api/downLoaderFile'

    export default {
        data() {
            return {
                print: {
                    totalNum: 0,
                    templateList: [],
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
                isPrint: false,
                tabSwitch: false,
                reportType: 3,
                printSelectDate: {
                    shop: '', //店铺
                    preparedBy: '',//制单人
                    headerData: '入库', //制单大标题
                    reportType: '1', //1代表入库、2退库、3调库、4发货、5调柜、6退货
                    orderNum: this.$route.query.orderNumber
                },
                exportTabData: {
                    "orderNum": this.$route.query.orderNumber,
                    "eType": 'XG',
                    "type": '1',
                    "page": 1,
                    "pageSize": 9999,
                }
            }
        },
        components: {
            PrintLabelByOrderDialog,
            Lodop,
            TablePrint
            //TemplatePreviewDialog
        },
        props: ['orderNum', 'orderData', 'dataGridOptions'],
        created() {
            this.$store.dispatch('getTemplateList', {type: 2, fieldType: 'simple'})
        },
        watch: {
            labelTemplateList: function () {
                this.templateList = this.labelTemplateList
            }
        },
        computed: {
            ...mapGetters([
                "rowConfigData", // 一行数据
                "littleClassList", // 小类
                "limitInput", // 输入限制
                "configPullDownDataList", // 配置的下拉数据
                "supplierListData", // 供应商
                "applyDepartementList", // 计划分销商
                "productClass" // 产品类别（商品类型列表）
            ]),
            ...mapState({
                labelTemplateList: state => state.template.labelList
            }),
            allData: function () { // 总数据
                return [...this.getGoodsInfoList, ...this.crudData.newAddData];
            },
            endGetPage: function () { // 最后一页
                var totalNum = Number(this.allDataNum.totalNum); // 后台总条数
                var allNum = Math.ceil(totalNum / 30); // 最后一页
                return allNum;
            },
            endGetData: function () { // 后台最后一页所占的条数
                var totalNum = Number(this.allDataNum.totalNum); // 后台总条数
                var allNum = Math.floor(totalNum / 30); // 能填满的页数
                return totalNum - allNum * 30;
            },
            showNewAddData: function () { // 当前页显示的空白数据
                let currentPage = Number(this.crudData.currentPage); // 当前页
                let endGetData = this.endGetData; // 后台最后一页所占的条数
                let endGetPage = this.endGetPage; // 最后一页
                if (this.endGetData > 0) { // 后台最后一页数据不满的情况下
                    if (currentPage === endGetPage) { // 是后台最后一页
                        let endNum = 30 - endGetData; // 每页显示的条数 - 最后一页的后台数据
                        return this.crudData.newAddData.slice(0, endNum);
                    } else { // 大于后台最后一页
                        let startNum = (currentPage - endGetPage - 1) * 30 + (30 - endGetData);
                        let endNum = startNum + 30;
                        return this.crudData.newAddData.slice(startNum, endNum);
                    }
                } else {
                    let startNum = (currentPage - endGetPage - 1) * 30;
                    let endNum = startNum + 30;
                    return this.crudData.newAddData.slice(startNum, endNum);
                }
            },
            showData: function () {
                return [...this.getGoodsInfoList, ...this.showNewAddData];
            },
            getCheckedPage: function () { // 监听当页的所有做选择的变量（删除选择）
                var CheckedPage = [];
                for (var i = 0; i < this.showData.length; i++) {
                    CheckedPage.push(i + ((this.crudData.currentPage - 1) * 30))
                }
                return CheckedPage;
            },
            delectOptionRole() {
                let checkType = this.receiptsIntroList.checkType === "1";
                let isRole = this.receiptsIntroList.isRole === "Y";
                if (isRole && checkType) {
                    return true;
                } else {
                    return false;
                }
            },
            printOptions: function () { // 打印单据
                if (this.receiptsIntroList) {
                    let isUser = sessionStorage.getItem("id") === this.receiptsIntroList.makeOrderManId;
                    // let isRole = this.$route.query.isRole === "Y";
                    let isCheckOrderMan = this.receiptsIntroList.isCheckOrderMan
                    if (isUser) { // 制单人
                        return true;
                    } else if (isCheckOrderMan) { // 审批人
                        if (this.receiptsIntroList.checkType === "1") {
                            return true;
                        } else {
                            return false;
                        }
                    } else { // 其它
                        if (this.receiptsIntroList.checkType !== "3") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        methods: {
            // 导出表格
            exportTab() {
                downLoaderFile('/v1/export/exportDetailExcel', this.exportTabData)
            },
            tabPrint() {
                this.$emit("tabPrint");
            },
            // 打印标签
            printLabel() {
                this.print.currentOrderNum = this.orderNum
                this.$refs.printLabelByOrderDialog.show()
            },
            //打印表格
            tabPrin() {
                if (this.dataGridStorage.detailList && this.dataGridStorage.detailList.length == 0) {
                    this.$message({
                        type: 'error',
                        message: '暂无数据打印'
                    })
                    return;
                }
                this.isPrint = true;
                let print = null;

                this.appPrint = document.getElementById('appPrint')

                if (this.IntervalOut) clearInterval(this.IntervalOut)
                document.getElementById('app').style.display = 'none';

                setTimeout(() => {
                    this.appPrint.innerHTML = this.$refs.tablePrint.innerHTML
                }, 1000)
                setTimeout(() => {
                    print = document.execCommand('print');
                }, 1500)

                this.IntervalOut = setInterval(() => {
                    if (print) {
                        document.getElementById('app').style.display = 'block';
                        this.isPrint = false;
                        if (this.IntervalOut) clearInterval(this.IntervalOut)
                        this.IntervalOut = null;
                        this.appPrint.innerHTML = '';
                    } else if (print == false) {
                        if (this.IntervalOut) clearInterval(this.IntervalOut)
                        if (!window.print()) {
                            document.getElementById('app').style.display = 'block';
                            this.isPrint = false;
                            this.IntervalOut = null;
                            this.appPrint.innerHTML = '';
                        }
                    }
                }, 10)

            },
            getPrintLabelData(type, orderId, beginNum, endNum, canvas, selectedProducts, isPrint) {
                debugger
                let barcodeArr = canvas.components.filter(item => item.data.propertyCode == 'barcode2');
                let dataList = {};
                if (barcodeArr.length) {
                    dataList.url = barcodeArr[0].data.codeUrl;
                }
                this.print.canvas = canvas
                if (type == 0) {//勾选
                    this.previewTemplate(canvas, selectedProducts, isPrint);
                } else if (type == 1) {//全部
                    dataList.orderId = orderId
                    this.$store.dispatch('getPrintLabelData', dataList).then(json => {
                        if (json.state == 200) {
                            this.$set(this.print, 'templateData', json.data)
                            //this.print.templateData = json.data;
                            this.print.isPreview = true;
                            this.printTemplate(canvas, json.data.productList);
                        }
                    })
                } else if (type == 2) {//分页
                    dataList.orderId = orderId;
                    dataList.beginNum = beginNum;
                    dataList.endNum = endNum;

                    this.$store.dispatch('getPrintLabelData', dataList).then(json => {
                        if (json.state == 200) {
                            this.$set(this.print, 'templateData', json.data)
                            //this.print.templateData = json.data;
                            this.print.isPreview = true;
                            this.printTemplate(canvas, json.data.productList);
                        }
                    })
                }
            },
            requestProductList(filter) {
                this.$store.dispatch('getPrintLabelByOrder', filter).then(json => {
                    if (json.state == 200) {
                        this.print.productList = json.data.productList
                        this.print.totalNum = json.data.totalNum
                    }
                })
            },
            previewTemplate(canvas, selectedProducts, isPrint) {
                if (selectedProducts.length > 0) {
                    let productList = selectedProducts.map(selectedProduct => {
                        return {
                            productId: selectedProduct
                        }
                    });
                    debugger
                    let barcodeArr = canvas.components.filter(item => item.data.propertyCode == 'barcode2');
                    let dataList = {
                        productList: productList,

                    }
                    if (barcodeArr.length) {
                        dataList.url = barcodeArr[0].data.codeUrl;
                    }

                    this.$store.dispatch('getPrintLabelData', dataList).then(json => {
                        if (json.state == 200) {
                            this.$set(this.print, 'templateData', json.data)
                            //this.print.templateData = json.data;
                            this.print.isPreview = true;
                            this.printTemplate(canvas, json.data.productList);
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
                            this.printTemplate(canvas, json.data.productList);
                        }
                    })
                }

            },
            //预览模板
            printTemplate(templateList, dataList) {
                JaTools.print(templateList, dataList);
                // this.$refs.lodop.multipagePrint()
            },
            reportsPrintRK() { // 获取单据打印数据
                let options = {
                    orderNum: this.$route.query.orderNumber,
                    reportType: 3
                }
                seekGetStorageData(options).then((res) => {
                    if (res.data.state == 200) {
                        this.dataGridStorage = res.data.data
                        //
                        setTimeout(() => {
                            this.tabPrin()
                        }, 1000)
                    }
                }, (res) => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .receipts{
        .el-dialog__wrapper{
            background-color:rgba(255, 255, 255, 0.2);
        }
        > span{
            height:50px;
            padding:5px;
            color:#999;
            text-align:center;
            font-size:14px;
            line-height:18px;
            cursor:pointer;
            display:flex;
            border-radius:5px;
            position:relative;
            justify-content:center;
            align-items:center;
            overflow:hidden;
            & ~ span{
                border-top:1px solid #ededed;
            }
            > i{font-size:24px;}

            &:after{
                content:attr(data-text);
                position:absolute;
                background-color:#2993f8;
                color:#fff;
                left:0;
                top:0;
                display:flex;
                justify-content:center;
                align-items:center;
                height:40px;
                padding:5px;
                transition:all .3s;
                opacity:0;
                visibility:hidden;
                z-index:2;
            }

            &:hover{
                &:after{
                    opacity:1;
                    visibility:visible;
                }
                > i{display:none;}
            }
        }
    }
</style>

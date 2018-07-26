<template>
    <el-dialog :modal="false" :close-on-click-modal="false" class="dialog-w1300-h700-hn sellOrderDig" top="2%" title="选择产品类型" v-model="saveSuccess">
        <div class="batch-main">
            <div class="batch-header">
                <div class="title">批量添加</div>
                <div class="operate-bar-top">
                    <!-- <div class="search">
                        <input v-model="keyword" type="text" :placeholder="listType == '单据' ? '请输入单据号' : '请输入条码号'">
                        <div class="search-btn">
                            <i class="iconfont icon-sousuo"></i>
                        </div>
                    </div> -->
                    <!-- 制单日期范围 -->
                    <div>
                        <span class="range-title">制单日期范围</span>
                        <div class="batch-time-wrap">
                            <div class="date-w81">
                                <el-date-picker
                                    format
                                    v-model="orderOptions.startTime"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="dateChange()"
                                >
                                </el-date-picker>
                            </div>
                            <span>至</span>
                            <div class="date-w81">
                                <el-date-picker
                                    v-model="orderOptions.endTime"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="dateChange()"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <!-- 销售人 -->
                    <div v-if="!shopManRole">
                        <span class="range-title">销售员</span>
                        <div class="drop-block">
                            <DropDownMenu
                                titleName="销售人"
                                dataType="发送人"
                                :propList="shopUserList"
                                @dropReturn="dropReturn"
                                @clearInfo="clearInfo"
                            >
                            </DropDownMenu>
                        </div>
                    </div>
                    <!-- <div class="drop-block">
                        <DropDownMenu
                            titleName="所在位置"
                            dataType="位置"
                            :propList="locationList"
                            @dropReturn="dropReturn"
                            @clearInfo="clearInfo"
                        >
                        </DropDownMenu>
                    </div> -->
                    <!-- 件数范围 -->
                    <div>
                        <span class="range-title">件数范围</span>
                        <div title="件数" class="range-box" style="background:url(../../../static/img/batch/barcode.png) no-repeat 5px center;">
                            <input type="text" @keyup.enter="goodsSellOrder" v-model="orderOptions.sNumRange" placeholder="件数" @blur="goodsSellOrder()">
                            <span>-</span>
                            <input type="text" @keyup.enter="goodsSellOrder" v-model="orderOptions.eNumRange" placeholder="件数" @blur="goodsSellOrder()">
                        </div>
                    </div>
                    <!-- 件重范围 -->
                    <div>
                        <span class="range-title">件重范围</span>
                        <div title="件重" class="range-box" style="background:url(../../../static/img/batch/weight.png) no-repeat 5px center;">
                            <input type="text" @keyup.enter="goodsSellOrder" v-model="orderOptions.sWeightRange" placeholder="件重" @blur="goodsSellOrder()">
                            <span>-</span>
                            <input type="text" @keyup.enter="goodsSellOrder" v-model="orderOptions.eWeightRange" placeholder="件重" @blur="goodsSellOrder()">
                        </div>
                    </div>
                    <!-- 售价范围 -->
                    <div>
                        <span class="range-title">售价范围</span>
                        <div title="售价" class="range-box" style="background:url(../../../static/img/batch/price.png) no-repeat 5px center;">
                            <input type="text" @keyup.enter="goodsSellOrder" v-model="orderOptions.sPriceRange" placeholder="售价" @blur="goodsSellOrder()">
                            <span>-</span>
                            <input type="text" @keyup.enter="goodsSellOrder" v-model="orderOptions.ePriceRange" placeholder="售价" @blur="goodsSellOrder()">
                        </div>
                    </div>
                </div>
            </div>
            <div class="batch-page-one" v-if="listType == '单据'">
                <div class="table-main" @scroll="scrollFun1($event)">
                    <el-checkbox-group v-model="checkList" @change="changeCheckList"> 
                        <ul>
                            <li v-for="(item, index) in dataList" :key="index" @click="pushData(item.orderNum)">
                                <div class="left-list list">
                                    <div class="num">{{index + 1}}</div>
                                    <div class="order-num">{{item.orderNum}}</div>
                                    <div class="order-position">销售</div>
                                    <div class="order-makeMan">{{item.makeOrderManName}}</div>
                                    <div class="order-time">{{voidDate(item.createDate)}}</div>
                                </div>
                                <div class="right-list list">
                                    <div>{{item.totalNum}}件</div>
                                    <div>{{item.totalWeight}}g</div>
                                    <div>{{item.totalPrice}}元</div>
                                    <div>
                                        <el-checkbox class="checkbox-font" :label='item.orderNum'></el-checkbox>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="batch-footer">
                <div class="btn-wrap">
                    <div class="cenl-btn btn" @click="closeBtn">取消</div>
                    <div class="add-btn btn" @click="close">添加</div>
                </div>
                <div class="checkAll">
                    <em>
                        (<span>全选{{checkList.length}}</span>/{{totalNum}})
                        <el-checkbox v-model="checked" @change="cutSelect" class="checkbox-font check-all"></el-checkbox>
                    </em>
                </div>
            </div>
        </div>
        <!-- <el-dialog :modal="false" :visible.sync="isChoseLeader" customClass="提示" :close-on-click-modal="false">
            
        </el-dialog> -->
    </el-dialog>
</template>

<script>
var moment = require('moment');
import { mapGetters } from 'vuex'
import {seekBatchAddByProductList, seekGoodsSellOrder, seekGetShopUserList} from "Api/commonality/seek"
import {statusModuleType} from "Api/commonality/status"
// import {operateCreatReceipt} from "./../../Api/commonality/operate"
import dropDownColums from 'components/work/dropDownColums'
import DropDownMenu from 'components/template/DropDownMenu'
import * as jurisdictions from '../../../Api/commonality/jurisdiction'
export default {
    props: [
        'shopId',
        'saveSuccess',
        'isEdit',
        'oldMemberInfo'
    ],
    components: {
        dropDownColums,
        DropDownMenu
    },
    data () {
        return {
            listType: '单据',
            littleBatch: false,
            pickerOptions10: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            search: null,
            checked: false,
            checked1: false,

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
            productTypeList: [
                {
                    name: "成品",
                    type: 1
                },
                {
                    name: "旧料",
                    type: 2
                }
            ],
            locationList: [
                {
                    name: "仓库",
                    type: 1
                },
                {
                    name: "店铺",
                    type: 1
                },
                {
                    name: "柜组",
                    type: 1
                },
            ],
            proList: [],
            conditionList: [], // 成色列表
            jewelList: [], // 宝石列表
            jewelryList: [], // 首饰列表
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
            orderOptions: {
                orderBy: 2,
                shopId: -1,
                cashStatus: -1,
                orderNum: '',
                page: 1,
                pageSize: 9999,
                startTime: '',
                endTime: '',
                sNumRange: '',
                eNumRange: '',
                Seller: '',
                sWeightRange: '',
                eWeightRange: '',
                sPriceRange: '',
                ePriceRange: '',
            },
            shopUserList: []

        }
    },
    watch: {
        'saveSuccess': function () {
            if (this.saveSuccess === false) {
                // this.close()
            }
        },
        'checkList': function (val) { // 监听全选
            //console.log(val)
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
        'oldMemberInfo'(val) {
            // if(this.oldMemberInfo) {
            //     this.oldMemberInfo.orderList.forEach((item,index) => {
            //         this.dataList.forEach(i => {
            //             if(item.orderNum == i.orderNum) {
            //                 this.checkList[index] = item.orderNum
            //             }
            //         })
            //     })
            // }
            // console.log('查看选中的个数',this.checkList)
        }
    },
    computed: {
        ...mapGetters([
            "userPositionInfo" // 职位信息
        ]),
        shopManRole: function () { // 店员
            if (this.userPositionInfo && this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopManRole(this.userPositionInfo.roleList);
            }
        }
    },
    created () {
        this.getDate(0)
        this.goodsSellOrder()
        this.getShopUserList()
    },
    mounted () {
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
                onScroll: function(){
                    //console.log(222)
                }
            }
            
        });
    },
    methods: {
        voidDate(date){
             let newdate = date.split('');
             let year = '';
             let mongth='';
             let mdate = '';
             let hour = '';
             let minute = '';
             for(let i=0;i<newdate.length;i++){
                 if(i<4){
                    year += newdate[i];
                 }else if(i>= 4 && i < 6){
                    mongth += newdate[i];
                 }else if(i>= 6 && i< 8){
                    mdate += newdate[i];
                 }else if(i>= 8 && i< 10){
                    hour += newdate[i];
                 }else if(i>= 10 && i< 12){
                    minute += newdate[i];
                 }
             }
             return year+"-"+mongth+"-"+mdate+" "+hour+":"+minute;
        },
        pushData (data) {
            if (this.checkList.includes(data)) {
                this.checkList.forEach((item, index) => {
                    if (item == data) {
                        this.checkList.splice(index, 1)
                    }
                })
            } else {
                this.checkList.push(data)
            }
        },
        getShopUserList () {
            let options = {
                shopId: this.shopId,
                page: 1,
                pageSize: 999
            }
            seekGetShopUserList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                this.shopUserList = res.data.data.shopUserList
                } else {

                }
            }, (res) => {

            })
        },
        changeCheckList (val) {
            // if (this.isEdit && val.length == 0) {
            //     this.$confirm('无负责人时，此会员的所有跟进将被删除！', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //     }).then(() => {
            //         // this.$message({
            //         //     type: 'success',
            //         //     message: '删除成功!'
            //         // });
            //     }).catch(() => {
            //         // this.$message({
            //         //     type: 'info',
            //         //     message: '已取消删除'
            //         // });          
            //     });
            // }
        },
        scrollFun (el) {
            if (el.target.scrollTop >= (el.target.scrollHeight - 440)) {
                this.pageSize += 10
                this.batchAddByProductList()
            }
        },
        scrollFun1 (el) {
            if (el.target.scrollTop >= (el.target.scrollHeight - 440)) {
                this.pageSize += 10
                this.goodsSellOrder()
            }
        },
        dropReturn (val) { // 下拉框返回
            console.log(val)
            if (val.type == "发送人") {
                this.orderOptions.Seller = val.item.operateId
            }
            this.goodsSellOrder()
        },
        clearInfo (val) { // 清除返回
            if (val.type == "发送人") {
                his.orderOptions.Seller = ''
            }
            this.goodsSellOrder()
        },
        checkItem (id) { // 选择项目
            console.log(id)
        },
        goodsSellOrder () {
            if (this.shopManRole) { // 店员
                this.orderOptions.Seller = sessionStorage.id
            }

            this.orderOptions.shopId = this.shopId
            seekGoodsSellOrder(this.orderOptions).then((res) => {
                if (res.data.state == 200) {
                    this.dataList = res.data.data.orderList
                    this.totalNum = res.data.data.totalNum
                }
            }, (res) => {

            })
        },
        // batchAddByOrderNum () { // 5.60批量添加-单据列表
        //     var startTime = "";
        //     var endTime = ""
        //     if (this.startTime && this.endTime) {
        //         startTime = moment(this.startTime).format('YYYY-MM-DD');
        //         endTime = moment(this.endTime).format('YYYY-MM-DD');
        //     }
        //     let options = {
        //         orderId: this.$route.query.orderNumber,
        //         keyword: this.keyword,
        //         beginTime: startTime,
        //         endTime: endTime,
        //         type: this.modelType,
        //         makeUserId: '',
        //         beginNum: this.beginNum,
        //         endNum: this.endNum,
        //         beginWeight: this.beginWeight,
        //         endWeight: this.endWeight,
        //         beginPrice: this.beginPrice,
        //         endPrice: this.endPrice,
        //         page: 1,
        //         pageSize: this.pageSize
        //     }
        //     seekBatchAddByOrderNum(options).then((res) => {
        //         console.log(res)
        //         if (res.data.state == 200) {
                    
        //             this.dataList = res.data.data.dataList
        //             this.totalNum = res.data.data.totalNum
        //         }
        //     }, (res) => {

        //     })
        // },
        tabClick (type) {
            this.listType = type
            this.pageSize = 15
            this.keyword = ''
            if (type == "单据") {
                this.goodsSellOrder()
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
            } else {
                this.beginNum = ''
                this.endNum = ''
                this.beginWeight = ''
                this.endWeight = ''
                this.beginPrice = ''
                this.endPrice = ''
                this.modelType = ''
                this.batchAddByProductList()
            }
        },
        dateChange () {
            console.log(this.startTime)
            console.log(this.endTime)
            if (this.listType == "单据") {
                this.goodsSellOrder()
            } else {
                this.batchAddByProductList()
            }
        },
        getDate( day, type  ){
            let _date = new Date() 
            _date.setDate( _date.getDate() + day )
            //年
            let Year = _date.getFullYear()
            //月
            let month = this.formatDate(_date.getMonth()+1)

            let month1 = this.formatDate(_date.getMonth())
            //天
            let Day = this.formatDate(_date.getDate())
            //天
            let Day1 = this.formatDate(_date.getDate()-1)
            //时
            let hours = this.formatDate(_date.getHours())
            //分
            let mins = this.formatDate(_date.getMinutes())
            //秒
            let seconds = this.formatDate(_date.getSeconds())
    
            let timestamp = Year + month +  Day 
            let currentData = new Date()

            if (month1 == '01' || month1 == '03' ||month1 == '05' || month1 == '07' || month1 == '08' || month1 ==  '10' || month1 == '12') {
                if (Day1 == '00') {
                    Day1 = '31'
                }
            } else if (month1 == '02') {
                if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
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
            if( type == 'end' ){
                if( Year < currentData.getFullYear() || 
                  month < currentData.getMonth()+1 ||
                  Day < currentData.getDate()
                ){
                  hours = '23'
                  mins = seconds = '59'
                }
            }else if( type == 'start'){
              hours = mins = seconds = '00'
            }
            this.endTime = Year + '-' + month + '-' + Day
            this.startTime = Year + '-' + month + '-' + (Day- (Day-1))
            //this.seekReceipts()
            // return {
            //     format : Year +'-'+ month +'-'+  Day ,
            //     timestamp : timestamp,
            //     fullData : timestamp + hours + mins + seconds
            // }
        },
        formatDate( d ){
           return d < 10 ? ('0' + d ) : d + ''
        },
        timeFormat (parm) {
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
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            this.currentPage = val;
            this.seekReceipts();
            console.log(`当前页: ${val}`);
        },
        getModuleType (parm) {
            return statusModuleType(parm);
        },
        closeBtn () {//取消按钮
            // this.checkList = [];
            this.$emit("closeOnly")
        },
        close () {//添加按钮
            var states = {
                type: "1", // 取消
                name: false
            }
            this.$emit('closeOrderList', this.checkList)
        },
        cutSelect () {
            var _self = this;
            setTimeout(function() {
                _self.cutSelectFun();
            }, 13);
        },
        cutSelectFun () {
            console.log(this.checked)
            if (this.checked === true) { // 全选
                for (let i of this.dataList) {
                    if (this.checkList.includes(i.orderNum)) {
                        
                    } else {
                        this.checkList.push(i.orderNum);
                    }
                }
            } else {
                this.checkList = [];
            }
        },
        pageJudgeFun () { // 判断是否全选
            let receiptData = [];
        },
    }
}
</script>
<style lang="scss">
.sellOrderDig {
    .el-dialog {
        top: 2%;
    }
}
.check-all {
    margin-left: 16px;
    text-align: center;
}
.checkbox-font {
    width: 30px;
    .el-checkbox__input{
        border-radius: 4px;
        overflow: hidden;
        height: 20px;
        width: 20px;
        .el-checkbox__inner{
            border-radius: 4px;
            overflow: hidden;
        }
        
    }
    .el-checkbox__input.is-checked {
        background-color: #2993f8 !important;
        border-color: #2993f8 !important;
        .el-checkbox__inner{
            background-color: #2993f8 !important;
            border-color: #2993f8 !important;
        }
    }
}

</style>
<style lang="scss" scoped>
@import "~assets/css/template/fonts.scss";
.batch-main{
    width: 100%;
    height: 700px;
    overflow: hidden;
    padding: 30px 20px 0;
    .batch-header {
        .title {
            color:#333;
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
                margin-right: 16px;
                span {
                    //display: inline-block;
                    height: 100%;
                    width: 59px;
                    float: left;
                    line-height: 28px;
                    text-align: center;
                    color:#2993f8;
                    font-size: 12px;
                    cursor: pointer;
                }
                // span:hover {
                //     color:#fff;
                //     background: #2993f8;
                // }
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
                        color:#fff;
                        line-height: 28px;
                    }
                }
            }
            .batch-time-wrap{
                float: left;
                height: 28px;
                width: 188px;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                margin-right: 16px;
                margin-left: 16px;
                &>span {
                    line-height: 28px;
                    font-size: 14px;
                }
            }
            .batch-select-wrap {
                float: left;
            }
            .drop-block {
                width: 90px;
                height: 28px;
                border-radius: 4px;
                border: 1px solid #d6d6d6;
                float: left;
                // margin-right: 16px;
                
                text-align: center;
                .title-name {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .range-title{
                float: left;
                line-height: 28px;    
                margin-left: 16px;
            }
            .range-box {
                float: left;
                // margin-left: 16px;
                margin-left:5px;
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
        
    }
    .batch-page-one {
        width: 100%;
        .operate-bar-bottom {
            height: 28px;
            margin-bottom: 25px;
            .batch-time-wrap{
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
                float: left;
            }
            .range-box {
                float: left;
                // margin-left: 16px;
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
            height: 440px;
            overflow-y: scroll;
            ul {
                li {
                    width: 99%;
                    height: 44px;
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
        }
    }
    .batch-footer {
        width: 1300px;
        height: 90px;
        box-shadow: 0 -2px 2px 2px rgba(0,0,0,0.1);
        position: absolute;
        bottom: 0;
        left: 0;
        background:#fbfbfb;
        .btn-wrap {
            width: 236px;
            height: 36px;
            margin:27px auto;
            //margin-top: 27px;
            .btn {
                width: 90px;
                height: 36px;
                text-align: center;
                border-radius: 4px;
                line-height: 36px;
                float: left;
            }
            .cenl-btn {
                border: 1px solid #d6d6d6;
                color:#999999;
                margin-right: 56px;
                cursor: pointer;
                
            }
            .add-btn {
                background:#2993f8;
                color:#fff;
                cursor: pointer;
            }
        }
        .checkAll {
            position: absolute;
            right: 0;
            top: 24px;
            color:#b5b5b5;
            //width: 150px;
            em {
                font-style: normal;
            }
            span {
                color: #2993f8;
            }
        }
    }
}
.batch-footer {
    width: 100%;
    height: 90px;
}
</style>

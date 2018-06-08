<template>
    <el-dialog top="20%" class="dialog-w1300-h700-hn" :append-to-body="true" v-model="littleBatch" customClass="litBatch" :modal="false">
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
                        <el-date-picker
                            format
                            v-model="startTime"
                            type="date"
                            placeholder="选择日期"
                            @change="dateChange"
                        >
                        </el-date-picker>
                    </div>
                    <span>至</span>
                    <div class="date-w81">
                        <el-date-picker
                            v-model="endTime"
                            type="date"
                            placeholder="选择日期"
                            @change="dateChange"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="batch-select-wrap select-w100">
                    <el-select filterable v-model="modelType" @change="changeState" placeholder="全部">
                        <el-option
                            v-for="(item,index) in supplierListData" :key="index"
                            :label="item.name"
                            :value="item.type">
                        </el-option>
                    </el-select>
                </div>
                <div class="range-box" style="background:url(~static/img/batch/number.png) no-repeat 5px center;">
                    <input type="text" v-model="beginNum" placeholder="件数" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
                    <span>-</span>
                    <input type="text" v-model="endNum" placeholder="件数" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
                </div>
                <div class="range-box" style="background:url(~static/img/batch/weight.png) no-repeat 5px center;">
                    <input type="text" v-model="beginWeight" placeholder="件重" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
                    <span>-</span>
                    <input type="text" v-model="endWeight" placeholder="件重" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
                </div>
                <div class="range-box" style="background:url(~static/img/batch/price.png) no-repeat 5px center;">
                    <input type="text" v-model="beginPrice" placeholder="售价" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
                    <span>-</span>
                    <input type="text" v-model="endPrice" placeholder="售价" @keyup.enter="batchAddByOrderNum()" @blur="batchAddByOrderNum()">
                </div>
            </div>
            <div class="table-main" @scroll="scrollFun1($event)">
                <el-checkbox-group v-model="checkList">
                    <img v-if="dataList.length ==0" style="display: block; margin:0 auto;" src="~static/img/space-page.png"/>
                    <ul v-else>
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
                                <div style="margin-top: 0;">
                                    <el-checkbox class="checkbox-font" :label='item.orderId'></el-checkbox>
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                </el-checkbox-group>
            </div>
        </div>
        <div class="little-batch-footer">
            <div class="btn-wrap">
                <div class="cenl-btn btn" @click="littleBatch = false">取消</div>
                <div class="add-btn btn" @click="confirmClick">确定</div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
var moment = require('moment');
import {seekBatchAllByOrderNum, seekBatchAddByProductList} from "Api/commonality/seek"
import {getMonthStart, formattingXjTime, formattingTime, formattingEndTime} from 'assets/js/getTime'
    export default {
        props: ['supplierListData'],
        data () {
            return {
                checkList: [],
                // pickerOptions: {
                //     disabledDate:(time) => {
                //         return time.getTime() < this.startTime;
                //     }
                // },
                // pickerOptions10: {
                //   disabledDate(time) {
                //     return time.getTime() < Date.now() - 8.64e7;
                //   }
                // },
                beginNum: "",
                endNum: "",
                beginWeight: "",
                endWeight: "",
                beginPrice: "",
                endPrice: "",
                keyword: "",
                startTime: new Date(),
                endTime: new Date(),
                modelType: "",
                newOrderId: '',
                dataList: [],
                page: 1,
                pageSize: 30,
                littleBatch: false
            }
        },
        created () {
            this.getDate(0)
        },
        methods: {
            formatTime (val) {       
                if (val) {
                    let year = val.substring(0, 4)
                    let month = val.substring(4, 6)
                    let data = val.substring(6, 8)
                    let hour = val.substring(8, 10)
                    let time = val.substring(10, 12)
                    return year + "-" + month + "-" + data + " " + hour + ":" + time
                }
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
                console.log(this.checkList)
            },
            open () {
                this.littleBatch = true
                this.page = 1
                this.batchAddByOrderNum()
            },
            choseListData (item) { // 选择单据列表
                this.newOrderId = item.orderNo
            },
            getDataType (val) {
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
            changeState (parm) {
                this.page = 1
                this.batchAddByOrderNum()
            },
            dateChange () {
                this.page = 1
                this.batchAddByOrderNum()
            },
            scrollFun1 (el) {
                if (el.target.scrollTop >= (el.target.scrollHeight - 440)) {
                    this.batchAddByOrderNum()
                }
            },
            confirmClick () {
                this.littleBatch = false
                this.$emit('changeOrderId', this.checkList)
                // this.batchAddByProductList()
            },
            batchAddByOrderNum () { // 5.60批量添加-单据列表
                this.isLoading = true
                let options = {
                    orderId: '',
                    keyword: this.keyword,
                    beginTime: formattingTime(this.startTime),
                    endTime: formattingEndTime(this.endTime),
                    type: this.modelType,
                    makeUserId: '',
                    beginNum: this.beginNum,
                    endNum: this.endNum,
                    beginWeight: this.beginWeight,
                    endWeight: this.endWeight,
                    beginPrice: this.beginPrice,
                    endPrice: this.endPrice,
                    page: this.page,
                    pageSize: this.pageSize
                }
                seekBatchAllByOrderNum(options).then((res) => {
                    if (res.data.state == 200) {
                        this.page += 1
                        this.isLoading = false
                        this.dataList = res.data.data.dataList
                        this.totalNum = res.data.data.totalNum
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            batchAddByProductList () { // 5.61批量添加-商品列表
                // this.littleBatch = false
                // this.isLoading = true
                // let options = {
                //     page: 1,
                //     pageSize: this.pageSize,
                //     orderId: this.$route.query.orderNumber, // this.orderNo
                //     newOrderId: this.newOrderId,
                //     keyword: this.keyword,
                //     productTypeId: this.productTypeId,
                //     colourId: this.colourId,
                //     jewelId: this.jewelId,
                //     jewelryId: this.jewelryId,
                //     productType: this.productType,
                //     location: this.location,
                //     locationId: '',
                //     beginBarcode: this.beginBarcode1,
                //     endBarcode: this.endBarcode1,
                //     beginWeight: this.beginWeight1,
                //     endWeight: this.endWeight1,
                //     beginPrice: this.beginPrice1,
                //     endPrice: this.endPrice1
                // }
                // seekBatchAddByProductList(options).then((res) => {
                //     if (res.data.state == 200) {
                //         this.isLoading = false
                //         this.receiptList = res.data.data.dataList
                //         this.orderNo = ''
                //         this.totalNum1 = res.data.data.totalNum
                //     } else {
                //         this.$message({
                //             message: res.data.msg,
                //             type: 'warning'
                //         })
                //     }
                // })
            },
            getDate( day, type  ){
                // let _date = new Date() 
                // _date.setDate( _date.getDate() + day )
                // //年
                // let Year = _date.getFullYear()
                // //月
                // let month = this.formatDate(_date.getMonth()+1)

                // let month1 = this.formatDate(_date.getMonth())
                // //天
                // let Day = this.formatDate(_date.getDate())
                // //天
                // let Day1 = this.formatDate(_date.getDate()-1)
                // //时
                // let hours = this.formatDate(_date.getHours())
                // //分
                // let mins = this.formatDate(_date.getMinutes())
                // //秒
                // let seconds = this.formatDate(_date.getSeconds())
        
                // let timestamp = Year + month +  Day 
                // let currentData = new Date()

                // if (month1 == '01' || month1 == '03' ||month1 == '05' || month1 == '07' || month1 == '08' || month1 ==  '10' || month1 == '12') {
                //     if (Day1 == '00') {
                //         Day1 = '31'
                //     }
                // } else if (month1 == '02') {
                //     if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
                //         if (Day1 == '00') {
                //             Day1 = '29'
                //         }
                //     } else {
                //         if (Day1 == '00') {
                //             Day1 = '28'
                //         }
                //     }
                // } else {
                //     if (Day1 == '00') {
                //         Day1 = '30'
                //     }
                // }
                // if( type == 'end' ){
                //     if( Year < currentData.getFullYear() || 
                //       month < currentData.getMonth()+1 ||
                //       Day < currentData.getDate()
                //     ){
                //       hours = '23'
                //       mins = seconds = '59'
                //     }
                // }else if( type == 'start'){
                //   hours = mins = seconds = '00'
                // }
                // //console.log(Day)
                // this.endTime = Year + '-' + month + '-' + Day
                // this.startTime = Year + '-' + month + '-' + (Day- (Day-1))
                //this.seekReceipts()
                // -----this.batchAddByOrderNum()
                // return {
                //     format : Year +'-'+ month +'-'+  Day ,
                //     timestamp : timestamp,
                //     fullData : timestamp + hours + mins + seconds
                // }
            },
            formatDate( d ){
               return d < 10 ? ('0' + d ) : d + ''
            }
        }
    }
</script>
<style lang="scss">
.batch-main .batch-page-one .operate-bar-bottom .batch-time-wrap:hover{
    border: 1px solid #2993f8 !important;
}
.batch-main .batch-page-one .operate-bar-bottom .batch-time-wrap:focus{
    border: 1px solid #2993f8 !important;
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
                 &:hover{
                border:1px solid #2993f8;
                }
                &:focus{
                       border:1px solid #2993f8;
                }
                &:blur{
                       border:1px solid #ededed;
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
                    color:#fff;
                    line-height: 28px;
                }
            }
        }
        .menu-bottom {
            height: 28px;
            float: left;
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
                margin-left: 16px;
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
            height: 426px;
            overflow-y: auto;
            ul {
                li {
                    width: 100%;
                    height: 44px;
                    padding-right:20px; 
                    cursor: pointer;
                    &:hover{
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
                            &>span {
                                font-size: 0;
                            }
                        }
                        // div:nth-child(4) {
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
                cursor: pointer;
            }
            .cenl-btn {
                border: 1px solid #d6d6d6;
                color:#999999;
                margin-right: 56px;
            }
            .add-btn {
                background:#2993f8;
                color:#fff;
            }
        }
    }
}
</style>

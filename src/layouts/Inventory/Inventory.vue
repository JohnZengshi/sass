<template>
    <div class="detail-wrap">
        <div class="detail-title">
            <div class="title-left">
                <h1>{{lastTitleName}}</h1>
                <span>></span>
                <p>商品明细</p>
            </div>
            <div class="title-right">
                <div class="back-btn" @click="goBack">返回上一级</div>
            </div>
        </div>
        <div class="detail-main">
            <div class="main-title">
                <h2>
                    <i class="iconfont icon-liebiao"></i>
                    <span>商品列表</span>
                </h2>
            </div>
            <div class="main-body">
                <ul class="title-tab">
                    <div class="slide" ref="slide"></div>
                    <li @click="tabSwitch(item, index, $event)" :key="index" :class="{active: tabIndex==index}" v-for="(item, index) in tabList">
                        <div>{{item.label}}</div>
                    </li>

                </ul>
                <ul class="item-blobk">
                    <li v-for="(item, index) in sortDataList" :key="index">
                        <div class="main-name">
                            <div class="name-wrap">
                                <span class="line"></span>
                                <span class="name">{{item.label}}</span>
                            </div>
                        </div>
                        <div class="main-item-list">
                            <div class="main-item" v-for="(f, i) in item.dataList" :key="i">
                                <div class="title">{{f.itemName}}</div>
                                <div class="value">{{f.itemVal}}<span v-if="f.unit">{{f.unit}}</span></div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
            <div class="right-main">
                <div class="steps-block">

                </div>
                <div class="btn-block"></div>
            </div>
        </div>
        <!-- <productdetail></productdetail> -->
    </div>
</template>

<script>
import {seekCommodityDetails} from "Api/commonality/seek"
// import productdetail from './productdetail'
export default {
    // components: {
    //   productdetail
    // },
    data () {
        return {
            lastTitleName: '',
            tabIndex: 0,
            sortDataList: [], // 排序数组
            tabList: [
                {
                    label: '基本信息',
                },
                {
                    label: '重量',
                },
                {
                    label: '证书',
                },
                {
                    label: '主石',
                },
                {
                    label: '副石',
                },
                {
                    label: '工费',
                },
                {
                    label: '配件',
                },
                {
                    label: '其他费用',
                },
                {
                    label: '标价',
                },
                {
                    label: '备注',
                },
            ],
            dataModel: {
                baseData: {
                    id: 0,
                    label: '基本信息',
                    dataList: []
                },
                weightData: {
                    id: 1,
                    label: '重量',
                    dataList: []
                },
                certificateData: {
                    id: 2,
                    label: '证书',
                    dataList: []
                },
                mainData: {
                    id: 3,
                    label: '主石',
                    dataList: []
                },
                deputyData: {
                    id: 4,
                    label: '副石',
                    dataList: []
                },
                feeData: {
                    id: 5,
                    label: '工费',
                    dataList: []
                },
                partData: {
                    id: 6,
                    label: '配件',
                    dataList: []
                },
                otherData: {
                    id: 6,
                    label: '其他费用',
                    dataList: []
                },
                priceData: {
                    id: 6,
                    label: '标价',
                    dataList: []
                },
                remarkData: {
                    id: 6,
                    label: '备注',
                    dataList: []
                }
            }
        }
    },
    created () {
        this.lastTitleName = this.$route.query.text
        this.commodityDetails()
    },
    watch: {
        tabIndex () {
            this.dataSortGroup()
        }
    },
    methods: {
        goBack () {
            window.history.back(-1)
        },
        tabSwitch (item, index, el) {
            this.tabIndex = index
            this.$refs.slide.style.left = index * 83 + 'px'
        },
        dataSortGroup () { // 数据排序分组
            if (this.tabIndex == 0) {
                this.sortDataList = [
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData
                ]
            } else if (this.tabIndex == 1) {
                this.sortDataList = [
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData
                ]
            } else if (this.tabIndex == 2) {
                this.sortDataList = [
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                ]
            } else if (this.tabIndex == 3) {
                this.sortDataList = [
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                ]
            } else if (this.tabIndex == 4) {
                this.sortDataList = [
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                ]
            } else if (this.tabIndex == 5) {
                this.sortDataList = [
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                ]
            } else if (this.tabIndex == 6) {
                this.sortDataList = [
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                ]
            } else if (this.tabIndex == 7) {
                this.sortDataList = [
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                ]
            } else if (this.tabIndex == 8) {
                this.sortDataList = [
                    this.dataModel.priceData,
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                ]
            } else if (this.tabIndex == 9) {
                this.sortDataList = [
                    this.dataModel.remarkData,
                    this.dataModel.baseData,
                    this.dataModel.weightData,
                    this.dataModel.certificateData,
                    this.dataModel.mainData,
                    this.dataModel.deputyData,
                    this.dataModel.feeData,
                    this.dataModel.partData,
                    this.dataModel.otherData,
                    this.dataModel.priceData,
                ]
            }
        },
        dataClustering (data) { // 数据分组
            this.dataModel.baseData.dataList = []
            this.dataModel.weightData.dataList = []
            this.dataModel.certificateData.dataList = []
            this.dataModel.mainData.dataList = []
            this.dataModel.deputyData.dataList = []
            this.dataModel.feeData.dataList = []
            this.dataModel.partData.dataList = []
            this.dataModel.otherData.dataList = []
            this.dataModel.priceData.dataList = []
            this.dataModel.remarkData.dataList = []
            for (let i in data) {
                // ******************************* 基本信息 *********************************************
                if (i == 'barcode') {
                    this.dataModel.baseData.dataList.push({itemName: '条码号', itemVal: data[i]})
                } else if (i == 'productType') {
                    this.dataModel.baseData.dataList.push({itemName: '产品类别', itemVal: data[i]})
                } else if (i == 'jewelryName') {
                    this.dataModel.baseData.dataList.push({itemName: '首饰名称', itemVal: data[i]})
                } else if (i == 'brand') {
                    this.dataModel.baseData.dataList.push({itemName: '品牌', itemVal: data[i]})
                } else if (i == 'brand') {
                    this.dataModel.baseData.dataList.push({itemName: '款号', itemVal: data[i]})
                } else if (i == 'brand') {
                    this.dataModel.baseData.dataList.push({itemName: '手寸', itemVal: data[i]})
                }
                // ******************************* 重量 *********************************************
                else if (i == 'totalWeight') {
                    this.dataModel.weightData.dataList.push({itemName: '总件重', itemVal: data[i], unit: 'g'})
                } else if (i == 'netWeight') {
                    this.dataModel.weightData.dataList.push({itemName: '净金重', itemVal: data[i], unit: 'g'})
                } else if (i == 'heavyCode') {
                    this.dataModel.weightData.dataList.push({itemName: '含配金重', itemVal: data[i], unit: 'g'})
                } else if (i == 'goldCost') {
                    this.dataModel.weightData.dataList.push({itemName: '金耗', itemVal: data[i], unit: '%'})
                } else if (i == 'goldPrice') {
                    this.dataModel.weightData.dataList.push({itemName: '金价', itemVal: data[i], unit: '元'})
                } else if (i == 'goldColor') {
                    this.dataModel.weightData.dataList.push({itemName: '金属颜色', itemVal: data[i]})
                } else if (i == 'goldE') {
                    this.dataModel.weightData.dataList.push({itemName: '金料额', itemVal: data[i], unit: '元'})
                    this.dataModel.priceData.dataList.push({itemName: '金料额', itemVal: data[i], unit: '元'})
                }
                // ******************************* 证书 *********************************************
                else if (i == 'certifiNo') {
                    this.dataModel.certificateData.dataList.push({itemName: '证书号', itemVal: data[i]})
                } else if (i == 'authCode') {
                    this.dataModel.certificateData.dataList.push({itemName: '验证码', itemVal: data[i]})
                } else if (i == 'certifiName') {
                    this.dataModel.certificateData.dataList.push({itemName: '证书名', itemVal: data[i]})
                } else if (i == 'brand') {
                    this.dataModel.certificateData.dataList.push({itemName: '检验机构', itemVal: data[i]})
                } else if (i == 'certifiFee') {
                    this.dataModel.certificateData.dataList.push({itemName: '证书费', itemVal: data[i], unit: '元'})
                    this.dataModel.priceData.dataList.push({itemName: '证书费', itemVal: data[i], unit: '元'})
                }
                // ******************************* 主石 *********************************************
                else if (i == 'mainName') {
                    this.dataModel.mainData.dataList.push({itemName: '主石名', itemVal: data[i]})
                } else if (i == 'stand') {
                    this.dataModel.mainData.dataList.push({itemName: '主石规格', itemVal: data[i]})
                } else if (i == 'count') {
                    this.dataModel.mainData.dataList.push({itemName: '主石粒数', itemVal: data[i]})
                } else if (i == 'mainWeight') {
                    this.dataModel.mainData.dataList.push({itemName: '主石重', itemVal: data[i], unit: ''})
                } else if (i == 'unit') {
                    this.dataModel.mainData.dataList.push({itemName: '主石单位', itemVal: data[i]})
                } else if (i == 'mainCalcMethod') {
                    this.dataModel.mainData.dataList.push({itemName: '计价方式', itemVal: data[i]})
                } else if (i == 'mainTPrice') {
                    this.dataModel.mainData.dataList.push({itemName: '主石额', itemVal: data[i], unit: '元'})
                    this.dataModel.priceData.dataList.push({itemName: '主石额', itemVal: data[i], unit: '元'})
                } else if (i == 'shape') {
                    this.dataModel.mainData.dataList.push({itemName: '形状', itemVal: data[i]})
                } else if (i == 'color') {
                    this.dataModel.mainData.dataList.push({itemName: '颜色', itemVal: data[i]})
                } else if (i == 'neatness') {
                    this.dataModel.mainData.dataList.push({itemName: '净度', itemVal: data[i]})
                } else if (i == 'blackout') {
                    this.dataModel.mainData.dataList.push({itemName: '切工', itemVal: data[i]})
                } else if (i == 'polishing') {
                    this.dataModel.mainData.dataList.push({itemName: '抛光', itemVal: data[i]})
                } else if (i == 'symmetry') {
                    this.dataModel.mainData.dataList.push({itemName: '对称', itemVal: data[i]})
                } else if (i == 'fluorescent') {
                    this.dataModel.mainData.dataList.push({itemName: '荧光', itemVal: data[i]})
                } else if (i == 'mainPrice') {
                    this.dataModel.mainData.dataList.push({itemName: '主石单价', itemVal: data[i]})
                }
                // ******************************* 副石 *********************************************
                else if (i == 'deputyName') {
                    this.dataModel.deputyData.dataList.push({itemName: '副石名', itemVal: data[i]})
                } else if (i == 'deputyStand') {
                    this.dataModel.deputyData.dataList.push({itemName: '副石规格', itemVal: data[i]})
                } else if (i == 'deputyCount') {
                    this.dataModel.deputyData.dataList.push({itemName: '副石粒数', itemVal: data[i]})
                } else if (i == 'deputyWeight') {
                    this.dataModel.deputyData.dataList.push({itemName: '副石重', itemVal: data[i], unit: ''})
                } else if (i == 'deputyUnitPrice') {
                    this.dataModel.deputyData.dataList.push({itemName: '副石单价', itemVal: data[i], unit: '元'})
                } else if (i == 'deputyCalcMethod') {
                    this.dataModel.deputyData.dataList.push({itemName: '计价方式', itemVal: data[i]})
                } else if (i == 'deputyPrice') {
                    this.dataModel.deputyData.dataList.push({itemName: '副石额', itemVal: data[i], unit: '元'})
                    this.dataModel.priceData.dataList.push({itemName: '副石额', itemVal: data[i], unit: '元'})
                }else if(i == 'deputyUnit'){
                   this.dataModel.deputyData.dataList.push({itemName:'副石单位',itemVal:data[i],unit:''})
                }
                // ******************************* 工费 *********************************************
                else if (i == 'soldFee') {
                    this.dataModel.feeData.dataList.push({itemName: '销售工费', itemVal: data[i], unit: '元'})
                } else if (i == 'soldMethod') {
                    this.dataModel.feeData.dataList.push({itemName: '销售工费方式', itemVal: data[i]})
                } else if (i == 'inFee') {
                    this.dataModel.feeData.dataList.push({itemName: '进货工费', itemVal: data[i], unit: '元'})
                } else if (i == 'inMethod') {
                    this.dataModel.feeData.dataList.push({itemName: '进货工费方式', itemVal: data[i]})
                } else if (i == 'inMoney') {
                    this.dataModel.feeData.dataList.push({itemName: '进货工费额', itemVal: data[i], unit: '元'})
                    this.dataModel.priceData.dataList.push({itemName: '进货工费额', itemVal: data[i], unit: '元'})
                }
                // ******************************* 配件 *********************************************
                else if (i == 'partName') {
                    this.dataModel.partData.dataList.push({itemName: '配件名', itemVal: data[i]})
                } else if (i == 'partCount') {
                    this.dataModel.partData.dataList.push({itemName: '配件数', itemVal: data[i]})
                } else if (i == 'partWeight') {
                    this.dataModel.partData.dataList.push({itemName: '配件重', itemVal: data[i], unit: 'g'})
                } else if (i == 'partPrice') {
                    this.dataModel.partData.dataList.push({itemName: '单价', itemVal: data[i], unit: '元'})
                } else if (i == 'calcMethod') {
                    this.dataModel.partData.dataList.push({itemName: '计费方式', itemVal: data[i]})
                } else if (i == 'price') {
                    this.dataModel.partData.dataList.push({itemName: '配件额', itemVal: data[i], unit: '元'})
                    this.dataModel.priceData.dataList.push({itemName: '配件额', itemVal: data[i], unit: '元'})
                }
                // ******************************* 其他 *********************************************
                else if (i == 'otherFeeName') {
                    this.dataModel.otherData.dataList.push({itemName: '其他费用名', itemVal: data[i]})
                } else if (i == 'otherFee') {
                    this.dataModel.otherData.dataList.push({itemName: '其他费用额', itemVal: data[i], unit: '元'})
                    this.dataModel.priceData.dataList.push({itemName: '其他费用额', itemVal: data[i], unit: '元'})
                }
                // ******************************* 标价 *********************************************
                else if (i == 'costPrice') {
                    this.dataModel.priceData.dataList.push({itemName: '成本', itemVal: data[i], unit: '元'})
                } else if (i == 'ratio') {
                    this.dataModel.priceData.dataList.push({itemName: '倍率', itemVal: data[i]})
                } else if (i == 'soldPrice') {
                    this.dataModel.priceData.dataList.push({itemName: '售价', itemVal: data[i], unit: '元'})
                }
                // ******************************* 备注 *********************************************
                else if (i == 'remark') {
                    this.dataModel.remarkData.dataList.push({itemName: '备注信息', itemVal: data[i]})
                }else if (i == "backup1") {
                    this.dataModel.remarkData.dataList.push({
                        itemName: "备用一",
                        itemVal: data[i]
                    });
                }else if (i == "backup2") {
                    this.dataModel.remarkData.dataList.push({
                        itemName: "备用二",
                        itemVal: data[i]
                    });
                }else if (i == "backup3") {
                    this.dataModel.remarkData.dataList.push({
                        itemName: "备用三",
                        itemVal: data[i]
                    });
                }else if (i == "backup4") {
                    this.dataModel.remarkData.dataList.push({
                        itemName: "备用四",
                        itemVal: data[i]
                    });
                }else if (i == "backup5") {
                    this.dataModel.remarkData.dataList.push({
                        itemName: "备用五",
                        itemVal: data[i]
                    });
                }
            }
            this.dataSortGroup()
        },
        commodityDetails () { // 商品明细数据
            let options = {
                productId: this.$route.query.productId
            }
            seekCommodityDetails(options).then((res) => {
                if (res.data.state == 200) {
                    console.log('商品搜索数据:',res.data.data);
                    this.dataClustering(res.data.data)
                }
            }, (res) => {

            })
        }
    }
}
</script>

<style lang="scss">
@import "~assets/css/_fontManage.scss";
.detail-wrap {
  position: relative;
    width: 1270px;
    margin: 0 auto;
    padding: 30px 10px 20px;
    .detail-title {
        width: 1250px;
        height: 40px;
        margin-bottom:15px;
        .title-left {
            float: left;
            line-height: 40px;
            h1 {
                float: left;
                @include F(16, #333);
                font-weight: bold;
            }
            span {
                float: left;
                @include F(14, #333);
                font-weight: bold;
                margin: 0 13px;
            }
            p {
                float: left;
                @include F(16, #2993f8);
                font-weight: bold;
            }
        }
        .title-right {
            float: right;
            height: 100%;
            padding-top: 6px;
            .back-btn {
                width: 90px;
                height: 28px;
                background:#2993f8;
                @include F(12, #fff);
                font-weight: bold;
                text-align: center;
                line-height: 28px;
                border-radius: 4px;
                cursor: pointer;
            }
        }
    }
    .detail-main {
        width: 1250px;
        height: 840px;
        background:#fff;
        border-radius: 10px;
        box-shadow: 0 0 20px 10px rgba(0,0,0,0.08);
        position: relative;
        .main-title {
            width: 100%;
            height: 50px;
            padding:0 20px;
            h2 {
                float: left;
                line-height: 50px;
                height: 50px;
                &>i {
                    color:#2993f8;
                }
                &>span {
                    @include F(16, #333);
                    font-weight: normal;
                }
            }
        }
        .main-body {
            width: 1150px;
            height: 763px;
            margin: 0 auto;
            .title-tab {
                height: 32px;
                position: relative;
                &>li {
                    width: 83px;
                    height: 32px;
                    float: left;
                    cursor: pointer;
                    @include F(12, #2993f8);
                    line-height: 32px;
                    font-weight: bold;
                    position: relative;
                    transition: all ease .3s;
                    background: url("./../../../static/img/tab-default.png") no-repeat left center;
                    div {
                        width: 70px;
                        text-align: center;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 5;
                    }
                }
                .slide {
                    width: 83px;
                    height: 32px;
                    background: url("./../../../static/img/tab-select.png") no-repeat left center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index:5;
                    transition: left ease .3s;
                }
                &>li.active {
                    color:#fff;
                    background: transparent;
                }
            }
            .item-blobk {
                &>li {
                    min-height: 52px;
                    background:#f9f9f9;
                    transition: all ease .3s;
                    margin-bottom: 10px;
                    padding-top: 6px;
                    .main-name {
                        width: 100px;
                        float: left;
                        // display: inline-block;
                        height: 100%;

                        min-height: 52px;
                        .name-wrap {
                            height: 16px;
                            width: 100%;
                            padding-left: 20px;
                            .line {
                                height: 100%;
                                width: 4px;
                                background:#d6d6d6;
                                border-radius:2px;
                                float: left;
                                line-height: 16px;
                                margin-right: 6px;
                            }
                            .name {
                               float: left;
                               @include F(14, #666666);
                               line-height: 16px;
                            }
                        }

                    }
                    .main-item-list {
                        float: left;
                        width: 1050px;
                       // display: inline-block;
                        .main-item {
                            height: 40px;
                            width: 136px;
                            float: left;
                            //display: inline-block;
                            margin-bottom: 6px;
                            .title {
                                @include F(12, #999);
                                margin-bottom: 6px;
                            }
                            .value {
                                @include F(12, #333);
                                span {
                                    margin-left: 3px;
                                    @include F(10, #b4b4b4);
                                }
                            }
                        }
                    }
                    .clear {
                        clear: both;
                    }
                }
                &>li:first-child {
                   .main-name {
                       .name-wrap {
                           .line {
                               background:#2993f8;
                           }
                           .name {
                               color:#2993f8;
                           }
                       }
                   }
                }
                &>li:last-child {
                    margin-bottom: 0;
                }
            }
        }
        .right-main {
            height: 840px;
            width: 193px;
            position: absolute;
            top: 0;
            right: -210px;
            .steps-block {
                width: 193px;
                height: 750px;
            }
        }
    }
    .productdetail-bar{
      position: absolute;
      right: -210px;
      top:90px;
    }
}
</style>

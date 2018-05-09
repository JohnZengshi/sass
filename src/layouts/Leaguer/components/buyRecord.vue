<template>
        <div class="wrap" v-loading="loading">
            <div class="title">购买记录-{{memberInfo.username}}</div>
            <div class="one-block">
                <div class="block-title">合计</div>
                <div class="num data">
                    <div>
                        <span>{{buyInfo.totalNum== null ? 0 :buyInfo.totalNum}}</span>件
                        <div class="name">件数</div>
                    </div>
                </div>
                <div class="weight data">
                    <div>
                        <span>{{buyInfo.totalWeight == null ? 0 :buyInfo.totalWeight}}</span>g
                        <div class="name">件重</div>
                    </div>
                </div>
                <div class="price data">
                    <div>
                        <span>{{buyInfo.totalPrice== null ? 0 :buyInfo.totalPrice}}</span>元
                        <div class="name">售价</div>
                    </div>
                </div>
            </div>
            <div class="buy-list">
                <ul>
                    <li v-for="(item, index) in buyInfo.dataList" :key="index"> <!--  v-for="(item, index) in buyInfo.dataList" :key="index" -->
                        <div class="main-info" :class="{active: isItemIndex == index}" @click="openOrderList(index)">
                            <div class="main-left">
                                <div class="orderNum">{{item.orderNum}}</div><!--item.orderNum-->
                                <span class="time">{{timeFormat(item.payTime)}}</span><!--item.PayTime-->
                            </div>
                            <div class="main-right">
                                <div class="item num"><span>{{item.num}}</span>件</div>
                                <div class="item weight"><span>{{item.weight}}</span>g</div>
                                <div class="item price"><span>{{item.price}}</span>元</div>
                            </div>
                        </div>
                        <ul class="order-list" :class="{listStyle: isItemIndex == index}">
                            <li v-for="(f1, n1) in item.saleList" :key="n1">
                                <div class="title">
                                    <div class="title-name">{{f1.jewelryName}}</div>
                                    <div class="label">销售</div>
                                    <div class="price">￥<span>{{f1.newPrice}}</span></div>
                                </div>
                                <div class="content contentch">
                                    <div class="item">
                                        <label>条码号</label>
                                        <div>{{f1.barcode}}</div>
                                    </div>
                                    <div class="item">
                                        <label>金重</label>
                                        <div>{{f1.goldWeight}}<span>g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>{{f1.valuationType == 1 ? '金价' : '标价'}}</label>
                                        <div>{{f1.valuationType == 1 ? f1.saleGoldPrice : f1.oldPrice}}<span>元/g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>工费</label>
                                        <div>{{f1.paymentPrice}}<span>元/g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>折扣</label>
                                        <div>{{f1.discount}}<span>%</span></div>
                                    </div>
                                </div>
                            </li>
                            <li v-for="(f2, n2) in item.exchangeList" :key="n2">
                                <div class="title">
                                    <div class="title-name">{{f2.jewelryName}}</div>
                                    <div class="label">退换</div>
                                    <div class="price">￥<span>{{f2.newPrice}}</span></div>
                                </div>
                                <div class="content contentch">
                                    <div class="item">
                                        <label>条码号</label>
                                        <div>{{f2.barcode}}</div>
                                    </div>
                                    <div class="item">
                                        <label>金重</label>
                                        <div>{{f2.goldWeight}}<span>g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>回购金价</label>
                                        <div>{{f2.exchangeGoldPrice}}<span>元/g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>工费</label>
                                        <div>{{f2.paymentPrice}}<span>元/g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>折扣</label>
                                        <div>{{f2.abrasion}}<span>%</span></div>
                                    </div>
                                </div>
                            </li>
                            <li v-for="(f3, n3) in item.recycleList" :key="n3">
                                <div class="title">
                                    <div class="title-name">{{f3.jewelryName}}</div>
                                    <div class="label">回收</div>
                                    <div class="price">￥<span>{{f3.newPrice}}</span></div>
                                </div>
                                <div class="content contentch">
                                    <div class="item">
                                        <label>条码号</label>
                                        <div>{{f3.barcode}}</div>
                                    </div>
                                    <div class="item">
                                        <label>金重</label>
                                        <div>{{f3.goldWeight}}<span>g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>回购金价</label>
                                        <div>{{f3.recycleGoldPrice}}<span>元/g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>工费</label>
                                        <div>{{f3.paymentPrice}}<span>元/g</span></div>
                                    </div>
                                    <div class="item">
                                        <label>折扣</label>
                                        <div>{{f3.abrasion}}<span>%</span></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
import {seekGetMemberInfo, seekLatelyBuyRecord} from 'Api/commonality/seek'
export default {
    data () {
      return {
          buyReDialog: true,
          memberInfo: {},
          endTime: '',
          startTime: '',
          followList: [],
          buyInfo: {},
          loading: true,
          page: 1,
          pageSize: 30,
          isItemIndex : 0
      }
    },
    props: [
        'shopId',
        'shopManageRole',
        'memberId',
        'isShowBuy'
    ],
    watch: {
        isShowBuy () {
            if(this.isShowBuy){
                this.memberBuyDatalist = []
                this.getMemberInfo()
                this.latelyBuyRecord()
            }
        }

    },
    mounted () {
        this.getMemberInfo()
        this.latelyBuyRecord()
        $(".buy-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });
    },
    methods: {
        openOrderList (index) {
          if( this.isItemIndex == index){
            this.$set(this,'isItemIndex', -1)
          }else{
            this.$set(this,'isItemIndex', index)
          }
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
        latelyBuyRecord () {
            let options = {
                shopId: this.shopId,
                memberId: this.memberId,
                page: this.page,
                pageSize: this.pageSize
            }
            seekLatelyBuyRecord(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.loading = false
                    this.buyInfo = res.data.data
                }
            }, (res) => {
                console.log(res)
            })
        },
       getMemberInfo () { // 获取会员信息
            let options = {
                shopId: this.shopId,
                memberId: this.memberId
            }
            seekGetMemberInfo(options).then((res) => {
                if (res.data.state == 200) {
                    this.memberInfo = res.data.data
                } else {

                }
            }, (res) => {
                console.log(res)
            })
        },
    }
}
</script>

<style lang="scss">
.buyReDig {
    width: 700px;
    height: 540px !important;
    background:#fff;
    border-radius: 10px;
    .el-dialog__header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
    }
    .el-dialog__body {
        padding: 0 28px;
    }
    .wrap {
        .title {
            padding-top: 20px;
            font-size: 14px;
            color:#333;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .one-block {
            width: 640px;
            height: 100px;
            background:#eef7fe;
            border-radius: 10px;
            margin-bottom: 16px;
            .block-title {
                width: 140px;
                height: 100%;
                float: left;
                padding-top:14px;
                padding-left: 14px;
            }
            .data {
                width: 160px;
                float: left;
                height: 100%;
                padding-top: 27px;
                &>div {
                    font-size: 14px;
                    color:#999999;
                    &>span {
                        font-size: 20px;
                        color:#2993f8;
                        margin-bottom: 15px;
                    }
                    .name {
                        font-size: 14px;
                        color:#333;
                    }
                }

            }
            .price {
                &>div {
                    &>span {
                        color:#ff5a51;
                    }
                }
            }
        }
        .buy-list {
            width: 640px;
            height: 320px;
            ul {
                width: 100%;
                height: 100%;
                &>li {
                    min-height: 80px;
                    border-radius: 10px;
                    margin-bottom: 30px;
                    overflow: hidden;
                    .main-info {
                        padding: 20px;
                        height: 80px;
                        background:#73b1ff;
                        &.active {
                            background:#54bdff;
                        }
                        .main-left {
                            width: 300px;
                            height: 100%;
                            float: left;
                            .orderNum {
                                font-size: 16px;
                                color:#fff;
                                font-weight: bold;
                                margin-bottom: 15px;
                            }
                            .time {
                                font-size: 12px;
                                color:#fff;
                            }
                        }
                        .main-right {
                            float: right;
                            width: 300px;
                            height: 100%;
                            padding-top: 12px;
                            .item {
                                float: left;
                                width: 100px;
                                color:#fff;
                                font-size: 14px;
                                &>span {
                                    margin-right: 6px;
                                }
                            }
                        }
                    }
                    .order-list {
                        height: 0;
                        overflow: hidden;
                        background:#f6f7f8;
                        padding-left: 20px;
                        // padding-top: 20px;

                        &>li {
                            width: 600px;
                            height: 170px;
                            border-radius: 10px;
                            background:#fff;
                            margin-bottom: 20px;
                            .title {
                                height: 50px;
                                padding: 0 14px;
                                line-height: 50px;
                                font-weight: normal;
                                margin: 0;
                                .title-name {
                                    float: left;
                                    font-size: 16px;
                                    color:#2993f8;
                                    margin-right: 20px;
                                }
                                .label {
                                    float: left;
                                    background:#ffe5ea;
                                    width: 40px;
                                    height: 18px;
                                    border-radius: 2px;
                                    text-align: center;
                                    line-height: 18px;
                                    color:#ff6b86;
                                    font-size: 10px;
                                    margin-top: 14px;
                                }
                                .price {
                                    float: right;
                                    font-size: 10px;
                                    font-weight: normal;
                                    &>span {
                                        font-size: 14px;
                                        color:#ff5a51;
                                    }
                                }
                            }
                            .contentch {
                              height: 120px;
                              padding: {
                                top: 5px;
                                left: 13px;
                                right: 13px;
                                // bottom: 10px;
                              }
                              .item:nth-of-type(1){
                                margin-right: 47px;
                              }
                                .item {
                                  &:nth-last-of-type(3){
                                    margin-right: 47px;
                                  }
                                    // width: 250px;
                                    // float: left;
                                    // padding-left: 14px;
                                    // margin-bottom: 24px;
                                    // display: inline-block;
                                    // label {
                                    //     float: left;
                                    //     width: 50px;
                                    //     font-size: 14px;
                                    //     color:#999999;
                                    // }
                                    // &>div {
                                    //     float: left;
                                    //     width: 200px;
                                    //     font-size: 14px;
                                    //     color:#333;
                                    //     text-align: right;
                                    //     padding-right: 28px;
                                    //     &>span {
                                    //         margin-left: 3px;
                                    //         font-size: 12px;
                                    //         color:#999999;
                                    //     }
                                    // }
                                    >label{
                                      // margin-right: 100px;
                                      font-size: 14px;
                                      color:#999999;
                                      width: 77px;
                                      text-align: left;
                                      display: inline-block;
                                    }
                                    display: inline-block;
                                    // margin-right: 47px;
                                    margin-bottom: 25px;
                                    >div{
                                      display: inline-block;
                                      font-size: 14px;
                                      color:#333;
                                      width: 180px;
                                      text-align: right;
                                    }
                                }
                            }
                        }
                    }
                     .listStyle {
                         height: auto;
                         padding: 20px;
                         padding-bottom: 0;
                         padding-top: 20px;
                    }
                }
            }
        }
    }
}
</style>


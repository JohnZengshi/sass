<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-zz">
                <p class="num">{{buyRecordInfo.totalPrice || 0}}</p>
                <p class="label">交易总额（元）</p>
            </div>
            <div class="num-item num-item-cs">
                <p class="num">{{buyRecordInfo.totalNum || 0}}</p>
                <p class="label">交易次数（次）</p>
            </div>
            <div class="num-item num-item-js">
                <p class="num">{{buyRecordInfo.totalWeight || 0}}</p>
                <p class="label">件数（件）</p>
            </div>
        </div>
        <div class="trading-bottom-list">
            <!-- 销售 -->
            <div v-for="(item,index) in buyRecordInfo.dataList" :key="index">
                <div class="list-item" v-for="(item1,index1) in item.saleList" :key="index1">
                    <div class="item-title">
                        <span class="fl title-djh">{{ item.orderNum }}</span>
                        <span class="fr title-time">{{ _formDataTimeYND(item.PayTime) }}</span>
                    </div>
                    <div class="item-info">
                        <div class="info-title">
                            <span class="title-h">{{item1.jewelryName}}</span>
                            <span class="title-b">销售</span>
                        </div>
                        <div class="info-main">
                            <div class="main-item">
                                <span class="fl">条码号</span>
                                <span class="fr">{{item1.barcode}}</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">工费</span>
                                <span class="fr">{{item1.paymentPrice}}元/g</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">售价</span>
                                <span class="fr">{{ item1.saleGoldPrice }}元</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">折扣</span>
                                <span class="fr">{{ item1.discount }}%</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">实售价</span>
                                <span class="fr">{{ item1.newPrice }}元</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 退货 -->
                <div class="list-item" v-for="(item2,index2) in item.exchangeList" :key="index2">
                    <div class="item-title">
                        <span class="fl title-djh">{{ item.orderNum }}</span>
                        <span class="fr title-time">{{ _formDataTimeYND(item.PayTime) }}</span>
                    </div>
                    <div class="item-info">
                        <div class="info-title">
                            <span class="title-h">{{item2.jewelryName}}</span>
                            <span class="title-b">退货</span>
                        </div>
                        <div class="info-main">
                            <div class="main-item">
                                <span class="fl">条码号</span>
                                <span class="fr">{{item2.barcode}}</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">工费</span>
                                <span class="fr">{{item2.paymentPrice}}元/g</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">售价</span>
                                <span class="fr">{{ item2.saleGoldPrice }}元</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">折扣</span>
                                <span class="fr">{{ item2.discount }}%</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">实售价</span>
                                <span class="fr">{{ item2.newPrice }}元</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 回收 -->
                <div class="list-item" v-for="(item3,index3) in item.recycleList" :key="index3">
                    <div class="item-title">
                        <span class="fl title-djh">{{ item.orderNum }}</span>
                        <span class="fr title-time">{{ _formDataTimeYND(item.PayTime) }}</span>
                    </div>
                    <div class="item-info">
                        <div class="info-title">
                            <span class="title-h">{{item3.jewelryName}}</span>
                            <span class="title-b">回收</span>
                        </div>
                        <div class="info-main">
                            <div class="main-item">
                                <span class="fl">条码号</span>
                                <span class="fr">{{item3.barcode}}</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">工费</span>
                                <span class="fr">{{item3.paymentPrice}}元/g</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">售价</span>
                                <span class="fr">{{ item3.saleGoldPrice }}元</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">折扣</span>
                                <span class="fr">{{ item3.discount }}%</span>
                            </div>
                            <div class="main-item">
                                <span class="fl">实售价</span>
                                <span class="fr">{{ item3.newPrice }}元</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 销售 -->
            <!-- <div class="list-item" v-for="(item,index) in buyRecordInfo.dataList[0].saleList" :key="index">
                <div class="item-title">
                    <span class="fl title-djh">{{ buyRecordInfo.dataList[0].orderNum }}</span>
                    <span class="fr title-time">{{ _formDataTimeYND(buyRecordInfo.dataList[0].PayTime) }}</span>
                </div>
                <div class="item-info">
                    <div class="info-title">
                        <span class="title-h">{{item.jewelryName}}</span>
                        <span class="title-b">销售</span>
                    </div>
                    <div class="info-main">
                        <div class="main-item">
                            <span class="fl">条码号</span>
                            <span class="fr">{{item.barcode}}</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">工费</span>
                            <span class="fr">{{item.paymentPrice}}元/g</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">售价</span>
                            <span class="fr">{{ item.saleGoldPrice }}元</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">折扣</span>
                            <span class="fr">{{ item.discount }}%</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">实售价</span>
                            <span class="fr">{{ item.newPrice }}元</span>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- 退货 -->
            <!-- <div class="list-item" v-for="(item1,index1) in buyRecordInfo.dataList.exchangeList" :key="index1">
                <div class="item-title">
                    <span class="fl title-djh">{{ buyRecordInfo.dataList.orderNum }}</span>
                    <span class="fr title-time">{{ _formDataTimeYND(buyRecordInfo.dataList.PayTime) }}</span>
                </div>
                <div class="item-info">
                    <div class="info-title">
                        <span class="title-h">{{item1.jewelryName}}</span>
                        <span class="title-b">退货</span>
                    </div>
                    <div class="info-main">
                        <div class="main-item">
                            <span class="fl">条码号</span>
                            <span class="fr">{{item1.barCode}}</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">工费</span>
                            <span class="fr">{{item1.paymentPrice}}元/g</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">售价</span>
                            <span class="fr">{{ item1.saleGoldPrice }}元</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">折扣</span>
                            <span class="fr">{{ item1.discount }}%</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">实售价</span>
                            <span class="fr">{{ item1.newPrice }}元</span>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- 回收 -->
            <!-- <div class="list-item" v-for="(item2,index2) in buyRecordInfo.dataList.recycleList" :key="index2">
                <div class="item-title">
                    <span class="fl title-djh">{{ buyRecordInfo.dataList.orderNum }}</span>
                    <span class="fr title-time">{{ _formDataTimeYND(buyRecordInfo.dataList.PayTime) }}</span>
                </div>
                <div class="item-info">
                    <div class="info-title">
                        <span class="title-h">{{item2.jewelryName}}</span>
                        <span class="title-b">回收</span>
                    </div>
                    <div class="info-main">
                        <div class="main-item">
                            <span class="fl">条码号</span>
                            <span class="fr">{{item2.barCode}}</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">工费</span>
                            <span class="fr">{{item2.paymentPrice}}元/g</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">售价</span>
                            <span class="fr">{{ item2.saleGoldPrice }}元</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">折扣</span>
                            <span class="fr">{{ item2.discount }}%</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">实售价</span>
                            <span class="fr">{{ item2.newPrice }}元</span>
                        </div>
                    </div>
                </div>
            </div> -->
            
        </div>
        <div class="return-btn-group">
            <div class="btn" @click="goBack">返回</div>
            <div class="btn" v-if="isShopMan" @click.stop="openSales">快捷开单</div>
            <div class="btn" v-if="isShopMan" @click.stop="relevanceSales">关联销售单</div>
        </div>

        <!-- 关联销售单 -->
        <sellOrderList
            :shopId="shopId"
            :saveSuccess="saveSuccess"
            :oldMemberInfo="oldMemberInfo"
            @closeOrderList="closeOrderList"
            @closeOnly="closeOnly"
            isEdit="1"
        ></sellOrderList>
    </div>
</template>

<style lang="scss">
.trading-top-num {
    width: 100%;
    height: 46px;
    display:flex;
    justify-content: space-around;
    margin-bottom: 40px;
    .num-item {
        width: 30%;
        height: 100%;
        text-align: center;   
    }
    .num-item-zz{
        .num {
            font-size: 24px;
            color: #ffa200;
        }
        .label {
            color: #a0a0a0;
        }
    }
    .num-item-cs{
        .num {
            font-size: 24px;
            color: #ff6649;
        }
        .label {
            color: #a0a0a0;
        }
    }
    .num-item-js{
        .num {
            font-size: 24px;
            color: #ab5af3;
        }
        .label {
            color: #a0a0a0;
        }
    }

}
.trading-bottom-list {
    width: 100%;
    height: 470px;
    margin-bottom: 50px;
    overflow-y: scroll;
    .list-item {
        width: 100%;
        height: 198px;
        margin-bottom: 20px;
        .item-title{
            width: 100%;
            height: 16px;
            line-height: 16px;
            margin-bottom: 10px;
        }

        .item-info{
            width: 100%;
            height: 170px;
            background: #f6f7f8;
            border-radius: 10px;
            padding:20px 20px 30px 20px;

        }
        .title-h {
            font-size: 14px;
            font-weight: bold;
            color: #666;
        }
        .title-b {
            display: inline-block;
            width: 40px;
            height: 20px;
            text-align: center;
            background: #ff607f;
            color:#fff;
            border-radius: 5px;
        }
        .info-title {
            margin-bottom: 20px;
        }

        .info-main {
            width: 100%;
            display:flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .main-item {
            width: 45%;
            margin-bottom: 20px;
        }
    }
}
.return-btn-group {
    display:flex;
    justify-content: center;
    .btn {
        width: 90px;
        height: 28px;
        border-radius: 4px;
        background: #2993f8;
        color: #fff;
        text-align: center;
        line-height: 28px;
        margin-right: 16px;
        cursor: pointer;
        &:hover {
            background: #4db3ff;
        }
    }
}
.title-time {
    font-size: 12px;
    color:#999;
}
.title-djh {
    font-size: 14px;
    color:#2993f8;
}
</style>

<script>
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'
import SellOrderList from '../sellOrderList'
import {operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention, operateCreateSellOrder} from 'Api/commonality/operate'
import { memberIntegralUpdate,memberBuyIntegral } from 'Api/member'

import {mapActions, mapGetters} from 'vuex'
import {seekGetUserInfo} from 'Api/commonality/seek'
import * as jurisdictions from 'Api/commonality/jurisdiction'

export default {
    data () {
        return {
            saveSuccess:false,
            isShopMan:false,
        }
    },
    components: {
        SellOrderList
    },
    computed:{
        // ...mapGetters([
        //     "userPositionInfo"
        // ]),
        // isShopMan(){
        //     if(this.userPositionInfo.roleList.length === 1){
        //         if(this.userPositionInfo.roleList[0].role > 3){
        //             return true
        //         } else {
        //             return false
        //         }
        //     } else {
        //         return true
        //     }
        // }
    },
    props:['buyRecordInfo','shopId','memberId','oldMemberInfo','memberInfo'],
    methods: {
        goBack() {
            this.$emit('goBack',true)            
        },
         // 格式化时间
        _formDataTimeYND(parm){
            return GetNYR(parm)
        },
        openSales(){
            var options = {
                "shopId": this.shopId
            }
            operateCreateSellOrder(options).then((response) => {
                if (response.data.state === 200) {
                    this.$router.push({
                        path: "/work/sell/sellReceiptsList",
                        query: {
                            path: this.$route.path,
                            orderNumber: response.data.data.orderNum
                        }
                    })
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            })
            // this.$router.push({path:'/work/sell'})
        },
        closeOrderList (val) { // 选择单据结束的回调
            this.saveSuccess = false
            
            if(val.length == 0){
                return
            }
            // 关联销售单
            let orderList = []
            let dataList = []

            val.forEach((item, index) => {
                orderList[index] = {orderNo: item}
                dataList[index] = {orderNum: item}
            })

            if(dataList.length !=0 ) {
                this.setMemberBuyIntegral(dataList)
            }
            
            let options = Object.assign({},this.oldMemberInfo,{
                memberId:this.memberId,
                shopId:this.shopId,
                orderList:orderList
            })

            operateMemberUpdateBy(options).then(res => {
                console.log('关联成功',res)
                if(res.data.state === 200) {
                    this.$emit("getData")                
                    this.$message({
                        type: 'success',
                        message: '关联销售单成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '关联销售单失败'
                    })
                }
            })
        },
        closeOnly () {
            this.saveSuccess = false
        },
        relevanceSales() {
            this.saveSuccess = true
        },
        // 加积分操作
        setMemberBuyIntegral (dataList) {
            let options = {
                memberId:this.memberId,
                dataList,
                shopId:this.shopId,
                operateType:'1'
            }
            memberBuyIntegral(options).then(res => {
                if(res.data.state == 200){
                    console.log('成功')
                } else if(res.data.state == 1001399){
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })

                }
            })
            
        }

    },
    watch:{
        buyRecordInfo(val) {
            console.log('更新的信息',val)
            console.log('更新的信息',this.oldMemberInfo)
        },
        oldMemberInfo(val) {
            console.log('更新的信息',val)            
        },
        memberInfo(val) {
            // 获取用户权限
            let options = {
                userId: sessionStorage.getItem('id')
            }

            seekGetUserInfo(options).then(res => {
                if(res.data.data.roleList.length === 1){
                    if(res.data.data.roleList[0].role == 4){
                        this.isShopMan = true
                    } else if(res.data.data.roleList[0].role == 5){
                        console.log('现在有没有数据',this.memberInfo.principalList)
                        if(this.memberInfo.principalList.length != 0) {
                            this.memberInfo.principalList.forEach(item => {
                                if(item.userId == sessionStorage.getItem('id')) {
                                    this.isShopMan = true
                                }
                            })
                        } else {
                            this.isShopMan = false
                        }
                    }
                } else {
                    this.isShopMan = false
                    
                    // 多重身份判断
                    res.data.data.roleList.forEach(item => {
                        // 判断是不是店长
                        if(item.role == 4) {
                            // 判断是不是这家店
                            if(item.shopId == this.shopId) {
                                this.isShopMan = true
                            }
                        }
                        // 判断是不是店员
                        if(item.role == 5) {
                            if(item.shopId == this.shopId) {
                                 // 判断是不是负责人
                                val.principalList.forEach(fzr => {
                                    if(fzr.userId == sessionStorage.getItem('id')) {
                                        this.isShopMan = true
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    }
}
</script>

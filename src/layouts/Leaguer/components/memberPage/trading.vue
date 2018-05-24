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
            <div class="list-item" v-for="(item,index) in buyRecordInfo.dataList.saleList" :key="index">
                <div class="item-title">
                    <span class="fl title-djh">{{ buyRecordInfo.dataList.orderNum }}</span>
                    <span class="fr title-time">{{ _formDataTimeYND(buyRecordInfo.dataList.PayTime) }}</span>
                </div>
                <div class="item-info">
                    <div class="info-title">
                        <span class="title-h">{{item.jewelryName}}</span>
                        <span class="title-b">销售</span>
                    </div>
                    <div class="info-main">
                        <div class="main-item">
                            <span class="fl">条码号</span>
                            <span class="fr">{{item.barCode}}</span>
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
            </div>

            <!-- 退货 -->
            <div class="list-item" v-for="(item1,index1) in buyRecordInfo.dataList.exchangeList" :key="index1">
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
            </div>

            <!-- 回收 -->
            <div class="list-item" v-for="(item2,index2) in buyRecordInfo.dataList.recycleList" :key="index2">
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
            </div>
            
        </div>
        <div class="return-btn-group">
            <div class="btn" @click="goBack">返回</div>
            <div class="btn">快捷开单</div>
            <div class="btn">关联销售单</div>
        </div>
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

export default {
    data () {
        return {
            
        }
    },
    props:['buyRecordInfo'],
    methods: {
        goBack() {
            this.$emit('goBack',true)            
        },
         // 格式化时间
        _formDataTimeYND(parm){
            return GetNYR(parm)
        },
    }
}
</script>

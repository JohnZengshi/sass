<template>
    <div class="plain-money-data">
        <div class="header">
            <span>收银信息</span>
        </div>
        <div class="body">
            <ul>
                <li>收银员：{{collectMoneyData.cashUserName}}</li>
                <li>时间：
                    <span>{{preciseSun(collectMoneyData.createDate)}}</span>
                    <span class="ml10">{{preciseMinute(collectMoneyData.createDate)}}</span>
                </li>
            </ul>
            <ul>
                <template v-for="item in collectMoneyData.priceList">   
                    <li><img :src="getImage(item.priceType)" alt="">{{item.priceName}}：{{item.price}}</li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'collectMoneyData'
    ],
    methods: {
        preciseSun (parm) { // 年
            if (parm) {
                var Year = parm.slice(0, 4);
                var Month = parm.slice(4, 6);
                var Sun = parm.slice(6, 8);
                var allTime = Year + "-" + Month + "-" + Sun;
                return allTime;
            }
        },
        preciseMinute (parm) { // 月
            if (parm) {
                var ConfigData = parm.slice(8, 10);
                var Mour = parm.slice(10, 12);
                var allTime = ConfigData + ":" + Mour;
                return allTime;
            }
        },
        getImage (parm) {
            switch (parm) {
                case "0": // 找零
                    return "../../../../../static/img/change.png";
                case "1": // 刷卡
                    return "../../../../../static/img/swiping-card.png";
                case "2": // 现金
                    return "../../../../../static/img/cash.png";
                case "3": // 支付宝
                    return "../../../../../static/img/alipay.png";
                case "4": // 微信
                    return "../../../../../static/img/WeChat.png";
                // case "5": // 转账
                //     return "../../../../../static/img/";
                case "6": // 其它
                    return "../../../../../static/img/other.png";
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.plain-money-data{
    position: relative;
    .header{
        height: 50px;
        line-height: 50px;
        margin: 0 10px;
        border-bottom: 1px solid #d6d6d6;
        span{
            font-size: 16px;
        }
        a{
            float: right;
            font-size: 12px;
        }
    }
    .body{
        padding: 0 10px;
        overflow-x: auto;
        overflow-y: hidden;
        ul:nth-child(1){
            li{
                font-size: 14px;
            }
            li:nth-child(1),li:nth-child(2){
                height: 16px;
                line-height: 16px;
                margin-top: 20px;
            }
        }
        ul:nth-child(2){
            margin-top: 30px;
            li{
                white-space:nowrap;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                background-color: #f6f7f8;
                img{
                    vertical-align: top;
                    margin-right: 10px;
                    margin-top: 8px;
                    width: 24px;
                    height: 24px;
                }
                span{
                    vertical-align: center;
                }
            }
        }
    }
}
</style>

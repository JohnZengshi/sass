<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-zz">
                <p class="num">8500</p>
                <p class="label">交易总额（元）</p>
            </div>
            <div class="num-item num-item-cs">
                <p class="num">12</p>
                <p class="label">交易次数（次）</p>
            </div>
            <div class="num-item num-item-js">
                <p class="num">15</p>
                <p class="label">件数（件）</p>
            </div>
        </div>
        <div class="trading-bottom-list">
            <div class="list-item">
                <div class="item-title">
                    <span class="fl title-djh">FC2222222222222</span>
                    <span class="fr title-time">2018-6-8 12.50</span>
                </div>
                <div class="item-info">
                    <div class="info-title">
                        <span class="title-h">千足金财宝项链</span>
                        <span class="title-b">销售</span>
                    </div>
                    <div class="info-main">
                        <div class="main-item">
                            <span class="fl">条码号</span>
                            <span class="fr">11000000000000</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">工费</span>
                            <span class="fr">110元/g</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">销售</span>
                            <span class="fr">110元</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">折扣</span>
                            <span class="fr">80%</span>
                        </div>
                        <div class="main-item">
                            <span class="fl">实售价</span>
                            <span class="fr">110元</span>
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
export default {
    data () {
        return {
            
        }
    },
    props:['memberInfo'],
    methods: {
        goBack() {
            this.$emit('goBack',true)            
        }
    }
}
</script>

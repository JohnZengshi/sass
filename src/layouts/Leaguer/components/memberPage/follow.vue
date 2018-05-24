<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-lf">
                <p class="num">520</p>
                <p class="label">跟进记录（次）</p>
            </div>
        </div>
        <div class="follow-list">
            <div class="list-item clearfix">
                <div class="item-line fl">
                    <span class="fl">跟进人</span>
                    <span class="fr">他是谁</span>
                </div>
                <div class="item-line fr">
                    <span class="fl">跟进状态</span>
                    <span class="fr">他是谁</span>
                </div>
                <div class="item-line fl">
                    <span class="fl">跟进目的</span>
                    <span class="fr">他是谁</span>
                </div>
                <div class="item-line fr">
                    <span class="fl">跟进时间</span>
                    <span class="fr">他是谁</span>
                </div>
                <div class="item-line fl">
                    <span class="fl">跟进方式</span>
                    <span class="fr">他是谁</span>
                </div>
                <div class="item-results fl">
                    <span class="label">跟进结果</span>
                    <span class="info">他是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁是谁</span>
                </div>
                <div class="item-img fl">
                    <img src="../../../../../static/img/background/Christmas.png" alt="">
                    <img src="../../../../../static/img/background/Christmas.png" alt="">
                    <img src="../../../../../static/img/background/Christmas.png" alt="">
                    <img src="../../../../../static/img/background/Christmas.png" alt="">
                </div>
                <div class="create-time">
                    <div class="font-wrap">2018</div>
                </div>
            </div>
        </div>
        <div class="return-btn-group">
            <div class="btn" @click="goBack">返回</div>
            <div class="btn">创建跟进</div>
        </div>
    </div>
</template>

<style lang="scss">
.follow-list {
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    margin-bottom: 20px;
    .list-item {
        padding: 20px;
        background: #f6f7f8;
        border-radius: 10px;
        margin-bottom: 20px;
        position: relative;
        .item-line {
            width: 48%;
            height: 50px;
            line-height: 50px;
        }
        .item-results {
            width: 100%;
            height: 50px;
            margin: 15px 0;
            .label {
                display: inline-block;
                width: 19%;
                vertical-align: top;
                
            }
            .info {
                display: inline-block;
                width: 80%;
                height: 50px;
            }
        }
        .item-img {
            width: 100%;
            height: 54px;
            margin-bottom: 30px;
            &>img {
                width: 54px;
                height: 54px;
                margin-right: 20px;
                border-radius: 4px;
            }
        }
        .create-time {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 163px;
            height: 23px;
            line-height: 23px;
            background:url('../../../../../static/img/member/new/time-bg.png') no-repeat left center;
            .font-wrap {
                color:#fff;
                text-align: center;
            }
        }
    }
}

</style>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        goBack() {
            this.$emit('goBack',true)
        }
    }
}
</script>

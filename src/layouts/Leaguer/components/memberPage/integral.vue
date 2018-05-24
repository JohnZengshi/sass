<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-lf">
                <p class="num">520</p>
                <p class="label">积分总数</p>
            </div>
        </div>
        <div class="integral-list">
            <div class="integral-item item-header">
                <span>积分类型</span>
                <span>积分明细</span>
                <span>时间</span>
            </div>
            <div class="integral-item">
                <span>单次签到</span>
                <span>+2</span>
                <span>12-18</span>
            </div>
        </div>
        <div class="return-btn-group">
            <div class="btn" @click="goBack">返回</div>
            <div class="btn">修改积分</div>
        </div>
    </div>
</template>

<style lang="scss">
.integral-list {
    width: 100%;
    height: 460px;
    margin-bottom: 40px;
    overflow-y: scroll;
    .integral-item {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        line-height: 50px;
        span {
            display: inline-block;
            width: 30%;
        }
        &:nth-child(odd) {
            background: #fff;
        }
        &:nth-child(even) {
            background: #f4f4f4;
        }
    }
    .item-header {
        color: #999;
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


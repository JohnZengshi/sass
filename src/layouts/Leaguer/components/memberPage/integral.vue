<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-lf">
                <p class="num">520</p>
                <p class="label">积分总数</p>
            </div>
        </div>
        <div class="integral-list">
            <div class="integral-item item-header" v-if="integralData.dataList.length != 0">
                <span>积分类型</span>
                <span>积分明细</span>
                <span>时间</span>
            </div>
            <div class="integral-item" v-for="(item,index) in integralData.dataList" :key="index">
                <span>{{getLabel(item.type)}}</span>
                <span>+{{item.score}}</span>
                <span>{{item.date}}</span>
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
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'

export default {
    data () {
        return {
            
        }
    },
    props:['integralData'],
    methods: {
        goBack() {
            this.$emit('goBack',true)
        },
        _GetNYR(data) {
            return GetNYR(data)
        },
        getLabel(type){
            switch (type) {
                case '1':
                    return '单次签到'
                    break;
                case '2':
                    return '连续签到'
                    break;
                case '3':
                    return '到店消费'
                    break;
                case '4':
                    return '消费抵现'
                    break;
                case '5':
                    return '人工修改'
                    break;
                case '6':
                    return '生日福利'
                    break;
                case '7':
                    return '注册福利'
                    break;
            
                default:
                    break;
            }
        }
    }
}
</script>


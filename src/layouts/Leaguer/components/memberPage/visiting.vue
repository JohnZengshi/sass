<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-lf">
                <p class="num">8500</p>
                <p class="label">来访总数（次）</p>
            </div>
            <div class="num-item num-item-jd">
                <p class="num">12</p>
                <p class="label">接待总数（次）</p>
            </div>
        </div>
        <div class="visiting-list">
            <div class="visiting-header">
                <span>到店时间</span>
                <span>接待人</span>
                <span>消费金额（元）</span>
                <span>来访目的</span>
            </div>
            <div class="visiting-item-list">
                <div class="visiting-item">
                    <span>2018年11月12日</span>
                    <span>打酱油</span>
                    <span>200</span>
                    <span>无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无</span>
                </div>
                <div class="visiting-item">
                    <span>2018年11月12日</span>
                    <span>打酱油</span>
                    <span>200</span>
                    <span>无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无</span>
                </div>
            </div>
        </div>
        <div class="return-btn-group">
            <div class="btn" @click="goBack">返回</div>
        </div>
    </div>
</template>

<style lang="scss">
.num-item-lf {
    .num {
        font-size: 24px;
        color: #ffa200;
    }
    .label {
        color: #a0a0a0;
    }
}
.num-item-jd {
    .num {
        font-size: 24px;
        color: #ff6649;
    }
    .label {
        color: #a0a0a0;
    }
}
.visiting-list {
    .visiting-header {
        span {
            display: inline-block;
            height: 50px;
            color: #999;
            line-height: 50px;
        }
        span:nth-child(1) {
            width: 176px;
            padding-left: 20px;
        }
        span:nth-child(2) {
            width: 90px;
        }
        span:nth-child(3) {
            width: 110px;
        }
    }
    .visiting-item-list {
        width: 100%;
        height: 460px;
        margin-bottom: 20px;
        overflow-y: scroll;
        .visiting-item {
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding: 0 20px;        
            span{
                display: inline-block;
                overflow : hidden;                 
            }
            span:nth-child(1) {
                width: 157px;
            }
            span:nth-child(2) {
                width: 90px;
            }
            span:nth-child(3) {
                width: 110px;
            }
            span:nth-child(4) {
                width: 224px;
                text-overflow : ellipsis; 
                white-space : nowrap; 
            }
            &:nth-child(odd){
                background: #f4f4f4;
            }
            &:nth-child(even) {
                background: #fff;
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

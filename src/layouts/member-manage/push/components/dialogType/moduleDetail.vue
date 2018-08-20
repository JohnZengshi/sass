<template>
    <div class="ModuleDetailBox">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <span class="title">XXX模板详情</span>
        <div class="content flex flex-v flex-align-center">
            <span>模板数据总览</span>
            <div ref="charts" class="charts"></div>
            <ul class="count flex flex-r flex-pack-justify flex-align-center">
                <li class="flex flex-v flex-align-center">
                    <span>178</span>
                    <span>未完成</span>
                </li>
                <li class="flex flex-v flex-align-center">
                    <span>60</span>
                    <span>即将到期</span>
                </li>
                <li class="flex flex-v flex-align-center">
                    <span>308</span>
                    <span>已完成</span>
                </li>
            </ul>
            <el-button class="btn btn-w90-h28 btn-noBorder btn-backColor01 btn-color02" @click="confirm">确定</el-button>
        </div>
    </div>
</template>
<script>
import Echarts from 'echarts';
    export default {
        data() {
            return {
                myCharts: null,
                option: {
                    title: {
                        text: '',
                        textStyle:{
                            align: 'center',
                        }
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'line',
                        data: [5, 20, 36, 10, 10, 20],
                        smooth: true,
                        lineStyle:{
                            normal:{
                                color: 'rgb(250,111,48)',
                                width: 3,
                                shadowOffsetY: 5,
                                shadowColor: "rgba(250,129,75,0.4)",
                                shadowBlur: 5,
                            },
                        }
                    }]
                }
            }
        },
        created(){
           
        },
        mounted() {
            this.myCharts = Echarts.init(this.$refs["charts"]);
            this.myCharts.setOption(this.option);
        },
        methods:{
            //确认
            confirm(){
                this.$emit('confirm', false);
                this.$message({
                    type: 'info',
                    message: '确定'
                });
            },
            // 关闭
            handleclose(){
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '取消'
                });
            }
        }
    }

</script>
<style lang="less" scoped>
.ModuleDetailBox {
    position: relative;
    padding: 20px 30px;
    .close-icon {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 20px;
        right: 30px;
    }
    .title {
        display: inline-block; // margin-top: 20px;
        // margin-left: 30px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
    }
    .content {
        margin-top: 37px;
        .charts {
            width: 536px;
            height: 205px;
        }
        .count {
            width: 464px;
            margin-top: 77px;
            >li {
                >span {
                    &:first-of-type {
                        font-size: 24px;
                        color: #333333;
                        font-weight: bold;
                        line-height: 24px;
                    }
                    &:last-of-type {
                        font-size: 13px;
                        line-height: 13px;
                        color: #666666;
                    }
                }
            }
        }
        .btn {
            margin-top: 237px
        }
    }
    
}
</style>

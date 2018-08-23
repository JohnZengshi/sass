<template>
    <div class="main">
        <header class="flex flex-r flex-align-center flex-pack-justify">
            <div class="navigationBar flex flex-r flex-align-center">
                <i class="iconfont icon-VIP icon"></i>
                <div>
                    <span>会员主页></span>
                    <span>{{$route.query.title}}</span>
                </div>
            </div>
            <div class="btn">
                <el-button @click="$router.back()">返回上一页</el-button>
            </div>
        </header>
        <div class="mainTable">
            <transition name="fade">
                <!-- <keep-alive> -->
                    <router-view></router-view>
                <!-- </keep-alive> -->
            </transition>
        </div>
    </div>
</template>
<script>
    export default {
        watch: {

        },
        created() {}
    }

</script>
<style lang="less" scoped>
    .main {
        width: 1250px;
        margin: 0 auto;
        header {
            height: 37px;
            width: 100%;
            margin-top: 62px;
            .navigationBar {
                .icon {
                    font-size: 24px;
                    color: #2993F8;
                    margin-right: 16px;
                }
                >div{
                    >span{
                        font-size: 16px;
                        font-weight: 600;
                        &:first-of-type{
                            color: #000;
                        }
                        &:last-of-type{
                            color: #2993F8;
                        }
                    }
                }
            }
            .btn {
                >button{
                    width: 90px;
                    height: 28px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 28px;
                    padding: 0;
                }
            }
        }
        .mainTable {
            margin:20px 0;
            width: 100%;
            // height: 768px;
            border-radius: 8px;
            overflow: hidden;
            background-color: #fff;
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */

        {
        opacity: 0;
    }
</style>

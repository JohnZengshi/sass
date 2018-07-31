<template>
    <div class="m-m-home-page-push-main">
        <div class="decoration">
            推送
        </div>

        <ul class="center-num-list">
            <li>
                <p>2879</p>
                <p>推送总数</p>
            </li>
            <li>
                <p>178</p>
                <p>今日推送</p>
            </li>
            <li>
                <p>1200</p>
                <p>剩余推送数量</p>
            </li>

        </ul>

        <ul class="detailsCard">
            <li class="item">

            </li>
        </ul>
        <ul class="top-btn xj-btn-list">
            <div class="btn">+推送</div>
            <div class="btn">管理签名</div>
            <div class="btn">管理模板</div>
            <router-link :to="{path:'push/noteManage',query:{title:'短信管理'}}" class="btn" append>短信管理</router-link>
            <div class="btn">我的推送</div>
            <div class="btn">充值</div>
        </ul>
    </div>
</template>
<script>
    export default {

    }

</script>
<style lang="less" scoped>
    .m-m-home-page-push-main {
        position: relative;
        background-color: #F6FBFF;
        font-size: 0;
        overflow: hidden;
        .decoration {
            position: absolute;
            top: 30px;
            left: 48px;
            font-size: 12px;
            line-height: 25px;
            color: #333;
            font-weight: bold;
            padding-left: 8px;
            &:before {
                content: "";
                display: inline-block;
                width: 3px;
                height: 16px;
                background: #2993f8;
                position: absolute;
                top: 3px;
                border-radius: 3px;
                left: 0;
            }
        }
        .center-num-list {
            font-size: 0; // width: 900px;
            // height: 200px;
            margin: 90px 0 0 110px;
            vertical-align: top; // text-align: center;
            li {
                vertical-align: center;
                display: inline-block; // padding: 15px;
                width: 206px;
                font-size: 22px; // margin-right: 150px;
                p {
                    text-align: center;
                }
                p:nth-child(1) {
                    color: #333;
                    font-size: 30px;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                p:nth-child(2) {
                    color: #666;
                    font-size: 14px;
                }
            }
            li:nth-child(1) {
                p:nth-child(1) {
                    color: #2993f8;
                }
            }
        }
        .detailsCard {
            .item {
                // background: 
            }
        }
        .top-btn {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

</style>

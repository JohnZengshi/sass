<template>
    <div class="m-m-home-page-push-main">
        <div class="decoration">
            推送{{xxx}}
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

        <ul class="detailsCard flex flex-r flex-pack-justify">
            <li class="item flex flex-v" v-for="item in cardData">
                <div>{{item.cardTitle}}</div>
                <div>
                    <span>未完成推送</span>
                    <span>{{item.unfinished}}</span>
                </div>
                <div>
                    <span>已完成推送</span>
                    <span>{{item.finished}}</span>
                </div>
                <div>
                    <span>完成度</span>
                    <span>{{item.percent}}</span>
                </div>
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
        data() {
            return {
                cardData: [],
                xxx: "123"
            }
        },
        created(){
            this.cardData = [{
                    cardTitle:"系统通知",
                    unfinished:198,
                    finished:165,
                    percent:"50%"
                },{
                    cardTitle:"系统通知",
                    unfinished:198,
                    finished:165,
                    percent:"50%"
                },{
                    cardTitle:"系统通知",
                    unfinished:198,
                    finished:165,
                    percent:"50%"
                },{
                    cardTitle:"系统通知",
                    unfinished:198,
                    finished:165,
                    percent:"50%"
                },{
                    cardTitle:"系统通知",
                    unfinished:198,
                    finished:165,
                    percent:"50%"
                }]
        }
    }

</script>
<style lang="less" scoped>
    .m-m-home-page-push-main {
        position: relative;
        background-color: #F6FBFF;
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
            font-size: 0;
            margin: 90px 0 0 110px;
            vertical-align: top;
            li {
                vertical-align: center;
                display: inline-block; 
                width: 206px;
                font-size: 22px;
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
            width: 100%;
            padding: 0 60px;
            margin-top: 40px;
            .item {
                width: 193px;
                height: 180px;
                border-radius: 9px;
                border: 1px #D6D6D6 solid;
                padding: 18px 20px;
                >div{
                    &:first-of-type{
                        font-size: 15px;
                        font-weight: bold;
                        margin-top: 0;
                    }
                    &:nth-of-type(1){
                    }
                    &:nth-of-type(2){
                        margin-top: 25px;
                        margin-left: 12px;    
                    }
                    &:nth-of-type(3){
                        margin-top: 18px;
                        margin-left: 12px; 
                    }
                    &:nth-of-type(4){
                        margin-top: 18px;
                        margin-left: 36px; 
                    }
                    >span{
                        &:first-of-type{
                            font-size: 12px;
                            color: #737373;
                            margin-right: 10px;
                        }
                        &:last-of-type{
                            font-size: 17px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .top-btn {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

</style>

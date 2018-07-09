<template>
    <div class="main-warp">
        <div class="main">
            <div class="header">
                <img src="~src/assets/img/laberDetection/header.png" alt=""/>
            </div>
            <div class="aside">
                <div class="aside-top">
                    <div>
                        <input type="text" class="barcode text" v-model="identifyingCode"/>
                        <input type="text" class="identifyingCode" v-model="barcode"/>
                    </div>
                    <div>
                        <button class="start_detection" @click="check"></button>
                        <button class="reset" @click="reset"></button>
                    </div>
                </div>
                <div class="aside-img">
                    <img src="~src/assets/img/laberDetection/main_left_d.png" alt=""/>
                </div>
            </div>
            <div class="content">

                <img class="pass msg" src="~src/assets/img/laberDetection/pass.png" alt=""> <img class="refuse msg" src="~src/assets/img/laberDetection/refuse.png" alt="">
            </div>
            <div class="footer">
                <a href="http://www.laofengxiang.com">http://www.laofengxiang.com</a>
            </div>

        </div>
    </div>
</template>

<script>
    import apiCall from '@/Api/ApiCall.js'

    export default {
        data() {
            return {
                identifyingCode: '',
                barcode: ''
            }
        },
        mounted() {
        },
        methods: {
            check() {
                var data = {
                    identifyingCode: this.identifyingCode,
                    barcode: this.barcode
                }
                apiCall(data, '/v1/public/identifyingCode').then((res) => {
                    console.log(res);
                });
            },
            reset() {
                this.identifyingCode = '';
                this.barcode = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-warp{
        width:100%;
        height:100%;
        background-image:url(~assets/img/laberDetection/image.png) !important;
    }
    .main{
        width:992px;
        height:696px;
        margin:auto;
        position:relative;
        box-sizing:border-box;
    }
    .header{
        width:100%;
        height:120px;
    }
    .aside{
        width:247px;
        height:576px;
        float:left;
        overflow:hidden;
    }
    .aside-top{
        width:100%;
        height:154px;
        background-image:url(~assets/img/laberDetection/main_left_u.png);
    }
    .content{
        width:745px;
        height:576px;
        float:left;
        background-image:url(~assets/img/laberDetection/bgp.png);
        position:relative;
    }
    .msg{
        position:absolute;
        top:232px;
        left:0;
        right:0;
        margin:auto;
        display:none;
    }
    .refuse{
        display:block;
    }
    .footer{
        position:absolute;
        width:250px;
        height:74px;
        right:0;
        bottom:-74px;
        background-image:url(~assets/img/laberDetection/bottom.png);
    }
    .footer a{
        opacity:0;
        display:block;
        position:absolute;
        top:54px;
        left:31px;
        font-size:14px;
    }
    .aside-top input{
        width:153px;
        height:24px;
        border:1px solid #ccc;
        border-radius:4px;
        color:#555;
        margin-top:46px;
        padding-left:7px;
        margin-left:80px;
    }
    .aside-top button{
        width:76px;
        height:26px;
        opacity:0;
        border-radius:4px;
        border:none;
        margin-top:9px;
        margin-left:45px;
        cursor:pointer;
    }
    .aside-top .identifyingCode{
        margin-top:10px;
    }
    .aside-top .reset{
        margin-left:1px;
    }
</style>

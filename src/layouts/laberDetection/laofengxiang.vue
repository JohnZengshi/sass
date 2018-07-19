<template>
    <div class="main-warp">
        <div class="main">
            <div class="header">
                <img src="~src/assets/img/laberDetection/header.png" alt=""/>
            </div>
            <div class="aside">
                <div class="aside-top">
                    <div>
                        <input type="text" class="barcode text" v-model="barcode"/>
                        <input type="text" class="identifyingCode" v-model="code"/>
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

                <img v-if="normal == 1" class="pass msg" src="~src/assets/img/laberDetection/pass.png" alt="">
                <img v-if="normal == 2" class="refuse msg" src="~src/assets/img/laberDetection/refuse.png" alt="">
                <div v-show="normal == 1" id="main-content" v-html="innerHtml" :style="getWidth"></div>
            </div>
            <div class="footer">
                <a href="http://www.laofengxiang.com">http://www.laofengxiang.com</a>
            </div>

        </div>
    </div>
</template>

<script>
    import apiCall from '@/Api/ApiCall'
    import {laberPrint} from '@/utils/laberPrint.js';

    export default {
        data() {
            return {
                code: '',
                barcode: '',
                innerHtml: '',
                normal: 0,
                width: 0,
                height: 0,
                backgroundImage: ''
            }
        },
        mounted() {
            let query = this.$route.query;
            let data = {
                code: query.vcode,
                barcode: query.barcode,
                templateId: query.templateId
            }
            if (query.vcode) {
                this.getPrintLabelData(data);
                this.code = data.code;
                this.barcode = data.barcode;
            }
        },
        beforeRouteEnter(to, from, next) {
            // $('#qrcodeUrl').children().remove();
            document.title = '检验标签查询';
            next()
        },

        // beforeRouteLeave(to, from, next) {
        //     // 导航离开该组件的对应路由时调用
        //     $('#qrcodeUrl').children().remove();
        //     next()
        // },
        computed: {
            getWidth() {
                return {
                    width: this.width + 'mm',
                    height: this.height + 'mm',
                }
            },
            getBackgroundImage() {
                return {
                    backgroundImage: this.backgroundImage
                }
            }
        },
        methods: {
            check() {
                let data = {
                    code: this.code,
                    barcode: this.barcode,
                    templateId: this.$route.query.templateId
                }
                this.getPrintLabelData(data);
            },
            getPrintLabelData(data) {
                let _this = this;
                let _data = {
                    data: {
                        templateId: data.templateId
                    },
                    unit: {
                        companyId: this.$route.query.companyId
                    }
                }
                let _json = {
                    data: data,
                    unit: {
                        companyId: this.$route.query.companyId
                    }
                }
                apiCall(_data, '/v1/print/previewTemplate').then((res) => {
                    if (res.data.state == 200) {
                        let canvas = JSON.parse(res.data.data.content);
                        _this.width = res.data.data.width;
                        _this.height = res.data.data.height;
                        if (canvas.backgroundImage) {
                            let style = {
                                'background-size': '100% 100%',
                                'background-repeat': 'no-repeat',
                                'transform': 'rotate(0deg) scale(1)',
                                'transform-origin': '0px 0px 0px',
                                'background-image': 'url(' + canvas.backgroundImage + ')'
                            }
                            $('#main-content').css(style);
                        }
                        // $('#qrcodeUrl').children().remove();
                        apiCall(_json, '/v1/print/getPrintLabelData').then((json) => {
                            if (json.data.state == 200 && json.data.data.productList.length) {
                                let dataList = json.data.data.productList;
                                let pageList = laberPrint.transformation(canvas, dataList);
                                _this.normal = 1;
                                _this.innerHtml = laberPrint.transformationDataToHtml(pageList[0]);
                                _this.$nextTick(function () {
                                    let scale = 567 / $('#main-content').width();
                                    let offset = $('#qrcode').offset();
                                    let node = document.getElementById('qrcode');
                                    let width = node.dataset.width;
                                    new QRCode('qrcode', {
                                        render : 'canvas',
                                        text: node.dataset.url,
                                        width: width * 3.78,
                                        height: width * 3.78
                                    });
                                    $('#main-content').css('transform','scale(' + scale + ')');
                                })
                            } else {
                                _this.normal = 2;
                                _this.innerHtml = '';
                            }
                        });
                    } else {
                        // $('#qrcodeUrl').children().remove();
                        _this.normal = 2;
                        _this.innerHtml = '';
                    }

                });
            },
            reset() {
                this.code = '';
                this.barcode = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-warp{
        min-width:992px;
        width:100%;
        height:100%;
        min-height:800px;
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
    #main-content{
        height: 96px;
        display:inline-block;
        overflow:hidden;
        text-align:center;
        position:absolute;
        left:90px;
        top:267px;
        margin:auto;
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

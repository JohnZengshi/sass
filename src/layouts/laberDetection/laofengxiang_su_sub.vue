<template>
    <div class="main-warp">
        <div class="error-msg" v-if="normal == 2">
            <div><a href="javascript:;" @click="loaclMain" style="color:#ff0000;font-size:20px;font-weight:bold;text-decoration:underline">回到首页</a></div>
            <div style="margin-top:124px"><img src="~src/assets/img/laberDetection/error-msg.png" alt=""></div>
            <div style="margin-top:20px;text-align:center;font-weight:600;font-size:13px;font-weight:600;">技术支持：<a href="" style="display:inline-block;font-size:13px;color:#1a00ee">南京深信软件</a></div>
        </div>
        <div class="w581 mar0auto" v-if="normal == 1">
            <div style="font: bold 22px/40px normal;"><a href="javascript:;" @click="loaclMain" style="color:#ff0000">回到首页</a></div>

            <table class="w_100 f16 b-bor f-f-h">

                <tbody><tr>
                    <td class="t-left c6" width="30%">
                        纯度:
                    </td>
                    <td class="t-c c-blue" width="70%">
                        {{color_name}}
                    </td>
                </tr>
                    <tr>
                        <td class="t-left c6" width="30%">
                            金含量:
                        </td>
                        <td class="t-c c-blue" width="70%">
                            <span v-show="gold_content">金含量：</span>{{gold_content}}
                        </td>
                    </tr>
                    <tr>
                        <td class="t-left c6" width="30%">
                            品名:
                        </td>
                        <td class="t-c c-blue" width="70%">
                            {{jewelry_name}}
                        </td>
                    </tr>
                    <tr>
                        <td class="t-left c6" width="30%">
                            质量:
                        </td>
                        <td class="t-c c-blue" width="70%">
                            {{total_weight}}<span v-show="total_weight">g</span>
                        </td>
                    </tr>


                    <tr>
                        <td class="t-left c6" width="30%">
                            加工费:
                        </td>
                        <td class="t-c c-blue" width="70%">
                            {{operate_fee}}<span v-show="operate_fee">元/g</span>
                        </td>
                    </tr>


                    <tr>
                        <td class="t-left c6" width="30%">
                            条码号:
                        </td>
                        <td class="t-c c-blue" width="70%">
                            {{barcode}}
                        </td>
                    </tr>
                    <tr>
                        <td class="t-left c6" width="30%">
                            货号:
                        </td>
                        <td class="t-c c-blue" width="70%">

                        </td>
                    </tr>
                </tbody></table>

            <div style="width: 530px; color: rgb(255, 0, 0); font-size: medium; margin: 0 auto;
            letter-spacing: 1px; padding-top: 20px;" class="t-l line25 f-f-h">
                <ul>
                    <li class="t-c">老凤祥江苏运营管理查询平台</li>
                    <li style="text-indent:2em;">本平台标签可用二维码查询，如果您在查询过程中发现有任何疑问或建议，请您及时与我中心联系谨防假冒证书。</li>
                    <li style="text-indent:2em;">联系电话：025-51817716</li>
                </ul>
                <br>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
    import apiCall from '@/Api/apiCall';

    export default {
        data(){
            return {
                color_name: '',     //纯度
                gold_content: '',   //金含量
                jewelry_name: '',   // 品名
                total_weight: '',   //质量
                operate_fee: '',    //加工费
                barcode: '',        //条码号
                normal: 0
            }
        },
        beforeRouteEnter(to, from, next) {
            document.title = '老凤祥江苏运营管理查询平台';
            next()
        },
        mounted(){
            this.query = this.$route.query;
            this.barcode = this.query.barcode;
            let data = {
                data: {
                    code: this.query.vcode,
                    barcode: this.query.barcode,
                    templateId: this.query.templateId
                },
                unit: {
                    companyId: this.query.companyId
                }
            }
            this.getPrintLabelData(data);
        },
        methods:{
            getPrintLabelData(data){
                let _this = this;
                apiCall(data, '/v1/print/getPrintLabelData').then((json) => {
                    if (json.data.state == 200 && json.data.data.productList.length) {
                        let dataList = json.data.data.productList[0].codeList;
                        _this.normal = 1;
                        for (let item of dataList){
                            let obj = {
                                'color_name': () => _this.color_name = item.value, //品名
                                'gold_content': () => _this.gold_content = item.value, //证书编号
                                'jewelry_name': () => _this.jewelry_name = item.value,   //款号
                                'total_weight': () => _this.total_weight = item.value,  //主石
                                'operate_fee': () => _this.operate_fee = item.value,   //重量
                                'barcode': () => _this.barcode = item.value,     //标签价
                            }[item.key];
                            obj && obj();
                        }
                    }else{
                        [
                            _this.color_name,
                            _this.gold_content,
                            _this.jewelry_name,
                            _this.total_weight,
                            _this.operate_fee,
                            _this.barcode,
                            _this.normal
                        ] = ['','','','','','',2]
                    }
                });
            },
            loaclMain(){
                this.$router.push({
                    path: '/laofengxiang_su',
                    query: {
                        'templateId': this.query.templateId || '',
                        'companyId': this.query.companyId || ''
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .w_100 tr td{
        height:39px;
    }
    .main-warp{
        width:100%;
        height:100%;
        background:#fff;
    }
    .error-msg{
        width:610px;
        margin:auto;
        padding-top:10px;
    }
    @charset "utf-8";
    #bannerContainer{
        width: 950px;
        height: 286px;
        margin: 0 auto;
    }
    #bannerContainer .certificates-search{
        float: left;
        width: 285px;
        height: 286px;
        background: #ffffff;
        border: #f0f1f8 1px solid;
    }
    #bannerContainer .certificates-search td span{
        width: 70px;
        height: 35px;
        font-size: 16px;
        color: #122b88;
        border-bottom: #122b88 3px solid;
        padding-bottom: 5px;
    }
    #bannerContainer .certificates-search table{
        width: 100%;
        border: 0;
        border-collapse: 0;
        border-spacing: 0;
    }
    #bannerContainer .search-text{
        width: 173px;
        height: 21px;
        padding: 0 5px 0 5px;
        border: #172a88 1px solid;
    }
    #bannerContainer .search-notice{
        margin-top: 20px;
        padding: 10px 0 10px 15px;
    }
    #bannerContainer .search-notice p{
        color: #172a88;
    }
    #bannerContainer .search-notice p.n-side{
        display: block;
        width: auto;
        height: 1px;
        margin: 5px 0 5px 0;
        padding-right: -20px;
        border-top: #dddddd 1px solid;
        background: #ffffff;
    }

    #bannerContainer .content-images{
        float: right;
        width: 650px;
        height: 280px;
    }
    .images-show{
        width: 100%;
        height: 230px;
    }
    .identification{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #ffffff;
        margin: 5px 0 0 0;
        border: #f0f1f8 1px solid;
        text-align: center;
    }
    .identification table
    {
        width: 100%;
        border: 0;
        border-collapse: 0;
        border-spacing: 0;
    }
    .identification table td
    {
        height: 50px;
        text-align: center;
    }
    .identification p{ line-height: 16px; color: #0291b6; }
    .bz-max{ float: left; line-height: 27px; font-size: 16px; font-weight: bold; color: #0291b6; padding: 8px 0 3px 55px; }
    .bz-min{ float: right; line-height: 16px; font-size: 11px; color: #0291b6; }
    .side-line{
        width: 950px;
        border-top: #172a88 3px solid;
        margin: 0 auto;
    }

    #news{
        width: 950px;
        height: 220px;
        margin: 0 auto;
    }
    #news .important{
        float: left;
        width: 285px;
        height: 220px;
        text-align: center;
        background-color: #ffffff;
        border: #f0f1f8 1px solid;
    }
    #news .news-header{
        width: 100%;
        height: 50px;
    }
    #news .title{
        display: block;
        text-decoration: none;
        float: left;
        font-size: 16px;
        color: #999999;
        margin: 10px 10px 15px 10px;
    }
    #news .selected{
        color: #172a88;
    }
    #news .news-side{
        display: block;
        text-decoration: none;
        float: left;
        width: 1px;
        height: 22px;
        border-left: #cccccc 1px solid;
        margin: 10px 0 15px 0;
    }
    #news .info-post{
        float: right;
        width: 648px;
        height: 220px;
        text-align: center;
        background-color: #ffffff;
        border: #f0f1f8 1px solid;
    }
    .news-list{
        width: 100%;
        border: 0;
        border-collapse: 0;
        border-spacing: 0;
    }
    .news-list td { height: 22px; }
    .news-list td a{
        float: left;
        text-decoration: none;
        padding: 0 0 0 10px;
    }
    .news-list td a:link{
        color: #333333;
    }
    .news-list td a:hover{
        text-decoration: underline;
    }
    .news-list td em
    {
        float: right;
        margin-right: 10px;
    }
    .news-more
    {
        display: block;
        float: right;
        text-decoration: none;
        padding: 5px 10px 5px 0;
    }
    .news-more:hover{
        text-decoration: underline;
    }

    .cmp-title
    {
        display: block;
        text-decoration: none;
        float: left;
        width: 100%;
        height: 35px;
        font-size: 16px;
        color: #172a88;
        margin: 10px 10px 0 10px;
    }

    .renzheng
    {
        width: 100%;
        height: 150px;
        background: #e3e3e3;
    }
    .renzheng table
    {
        width: 950px;
        height: 150px;
        border: 0;
        border-collapse: 0;
        border-spacing: 0;
        margin: 0 auto;
    }
    .renzheng table td{ text-align: center; }
    .query_c{font-size:12px;}
    .query_c span.zs{text-indent:0.5em;width:90px;height:20px;display:block;float:left;font-size:14px;line-height:30px;}
    .query_c span.notice{text-indent:0.5em;width:200px;height:20px;display:block;line-height:20px;color:#FF0000;}
    .query_c input{width:160px;height:20px;line-height:30px;}
    .query_c input[type="button"]{width:100px;height:30px;font-size:14px;color:#ffffff;background-color:#000044;border-radius: 5px;border: medium none;}
    body,div,p,span,i,em,h1,h2,h3,h4,h5,h6,h7,a,img,ul,ol,dl,li,dd,dt,label,form,table,tbody,thead,tr,td,th,address,city{margin:0;padding:0;border:medium none;}
    table{border-collapse:collapse;}
    input{margin:0;padding:0;}
    input[type="button"]{border-radius:5px;border:medium none;cursor:pointer;}
    a{text-decoration:none;outline:0;blr:expression(this.onFocus=this.blur());color:#555;}a:hover{color:#f60;text-decoration:none;}ul,ol{list-style:none;}
    .padl10{padding-left:10px;}.padl20{padding-left:20px;}.padl80{padding-left:80px;}.padl260{padding-left:260px;}
    .mart100{margin-top:100px;}.mart30{margin-top:30px;}
    .mar0auto{margin:0 auto;}
    .fl{float:left;}.fr{float:right;}
    .t-c{text-align:center;}.t-r{text-align:right;}.t-l{text-align:left;}.just_text{text-align:justify;}
    .p-a{position:absolute;}.p-r{position:relative;}.fb{font-weight:bold;}
    .w80{width:80px;}.w200{width:200px;}.w351{width:351px;}.w400{width:400px;}.w581{width:581px;}.w572{width:572px;}.w852{width:852px;}.w690{width:690px;}
    .h25{height:25px;}.h30{height:30px;}.h50{height:70px;}.h203{height:203px;}
    .line25{line-height:25px;}.line50{line-height:50px;}
    .f16{font-size:16px;}.f14{font-size:14px;}.f12{font-size:12px;}
    .w_100{width:100%;}
    .d_in{display:inline-block;}
    .c_red{color:#FF0000;}.c_red1{color: #990000;}.cf{color:#ffffff;}.c6{color:#666;}.c-blue{color:#017dc4;}
    .bor_yel{border: 1px solid #330033;}
    .bg_cert{background-color:#BDDDC4;}.bg_f{background-color:#FFFFFF;}.bg_yel{background-color:#B98C01;}.bg_blue{background-color:#000044;}.bg-e{background:#eee;}
    .bg_pic{background-color: #99CCCC;padding:20px 17px 13px 17px;height:170px;width:180px;}
    .f-f-h{font-family:"黑体";}.b-bor{border:1px solid #dcdcdc;border-radius:3px;}.b-bor td {border-bottom: 1px solid #dcdcdc;}
    .t-left { background: #eee; text-align:left; padding: 0 20px}
</style>

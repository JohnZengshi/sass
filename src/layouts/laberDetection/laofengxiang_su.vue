<template>
    <div class="bg_lfx">
        <div class="w600" style="position:absolute;top:250px;left:500px;">
            <ul>
                <li class="h50">
                    条码号：&nbsp;<input v-model="barcode" type="text" id="TestNo" name="TestNo" class="w200 h25" style="border: 1px solid #B98C01;"><br>
                </li>
                <li class="h50">
                    查询码：&nbsp;<input v-model="identifyingCode" type="text" id="QueryNo" name="QueryNo" class="w200 h25" style="border: 1px solid #B98C01;"><br>
                </li>
                <li class="h50 line50 t-c">
                    <input type="button" id="cert_query">
                </li>
            </ul>
        </div>
    <div style="position: absolute; top: 580px; left: 380px; width: 620px;">
        <p class="t-c"></p>
    </div>


    </div>
</template>

<script>
    import apiCall from '@/Api/ApiCall.js'
    export default {
        name: "laofengxiang-su",
        data(){
            return {
                barcode: '',
                identifyingCode: ''
            }
        },
        mounted(){
            let data = {
                identifyingCode: this.identifyingCode,
                barcode: this.barcode
            }
            apiCall(data, '/v1/print/getLaoFengXiangProductDate').then((res) => {
                console.log(res);
            });
        }
    }
</script>

<style scoped>
    *{
        box-sizing:content-box !important;
    }
    .bg_lfx{
        width:100%;
        height:100%;
        background: url(~assets/img/laberDetection/bg_lfx.png) #C59D03 no-repeat;
        position:relative;
    }
    #cert_query{
        background: url(~assets/img/laberDetection/but_cx.png) no-repeat;
        width: 74px;
        height: 30px;
        border:0;
    }
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
    .t-left { background: #eee; text-align:left; padding: 10px 20px 10px;}
</style>

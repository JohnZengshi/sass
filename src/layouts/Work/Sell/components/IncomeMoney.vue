<template>
    <el-dialog title="" v-model="popups" class="dialog-w540-h740-hn">
        <div class="income-money" v-if="popups">   
            <h3 class="header">销售结算<span @click="closePopup">X</span></h3>
            <div class="income-money-body">
                <div class="body-left">
                    <ul class="ipt-computed">
                        <li><i>总额</i><input type="text" v-model="allMonny"></li>
                        <li>
                            <i>X 现金</i>
                            <input @click='focusFun("xhCash")' v-model="onlyMonny.xhCash" ref='xhCash' type="text">
                        </li>
                        <li>
                            <i>S 刷卡</i>
                            <input @click='focusFun("xhSwipingCard")' v-model="onlyMonny.xhSwipingCard" ref='xhSwipingCard' type="text">
                        </li>
                        <li>
                            <i>W 微信</i>
                            <input @click='focusFun("xhWeChat")' v-model="onlyMonny.xhWeChat" ref='xhWeChat' type="text">
                        </li>
                        <li>
                            <i>Z 支付宝</i>
                            <input @click='focusFun("xhAlipay")' v-model="onlyMonny.xhAlipay" ref='xhAlipay' type="text">
                        </li>
                        <li>
                            <i>Q 其它</i>
                            <input @click='focusFun("xhOther")' v-model="onlyMonny.xhOther" ref='xhOther' type="text">
                        </li>
                        <li><i>合计</i><input readonly="true" type="text" v-model="totalMonny"></li>
                        <li><i>找零</i><input readonly="true" type="text" v-model="changeMonny"></li>
                    </ul>
                    <div class="keyboard-btn">
                        <ul class="keyboard-left">
                            <li @click="addValue(1)">1</li>
                            <li @click="addValue(2)">2</li>
                            <li @click="addValue(3)">3</li>
                            <li class="special-number" @click="addValue(1000)">1000</li>
                            <li @click="addValue(4)">4</li>
                            <li @click="addValue(5)">5</li>
                            <li @click="addValue(6)">6</li>
                            <li class="special-number" @click="addValue(2000)">2000</li>
                            <li @click="addValue(7)">7</li>
                            <li @click="addValue(8)">8</li>
                            <li @click="addValue(9)">9</li>
                            <li class="special-number" @click="addValue(5000)">5000</li>
                            <li @click="addValue(0)">0</li>
                            <li @click="addValue('00')">00</li>
                            <li @click="addValue('.')">.</li>
                            <li class="special-number" @click="addValue(10000)">10000</li>
                        </ul>
                        <ul class="keyboard-right">
                            <li @click="closeKeyboard"><img src="./../../../../assets/img/work/returnDel.png"></li>
                            <li @click="confirmBtn">确定</li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="body-bottom">
                <li @click="restoreValue">清除</li>
                <li @click="closePopup">暂不结算</li>
                <li @click="orderPay">结束打单</li>
                <li @click="printrRceipts">打印单据</li>
            </ul>
        </div>
    </el-dialog>
</template>
<script>
import {operateOrderPay} from '../../../../Api/commonality/operate'
import {seekSellReceiptsIntro} from '../../../../Api/commonality/seek'
export default {
    props: [
        'incomeMoneyPopup', // 弹窗
        // 'receiptsIntroList', // 单据简介-销售
        'orderNumber' // 单据号
    ],
    data () {
        return {
            "onlyMonny": {
                "xhCash": "0", // 现金
                "xhSwipingCard": "0", // 刷卡
                "xhWeChat": "0", // 微信
                "xhAlipay": "0", // 支付宝
                "xhOther": "0" // 其它
            },
            "receiptsIntroList": "", // 单据简介
            "newValuelocation": "", // 当前值的位置
            "popups": false, // 弹窗
            "iptNum": null // 输入要收款的金钱
        }
    },
    computed: {
        allMonny () { // 总额
            return Number(this.receiptsIntroList.salePrice) || 0 + Number(this.receiptsIntroList.recyclePrice) || 0 + Number(this.receiptsIntroList.exchangePrice) || 0;
        },
        totalMonny () { // 合计
            return (Number(this.onlyMonny.xhCash) || 0) + (Number(this.onlyMonny.xhSwipingCard) || 0) + (Number(this.onlyMonny.xhWeChat) || 0) + (Number(this.onlyMonny.xhAlipay) || 0) + (Number(this.onlyMonny.xhOther) || 0);
        },
        changeMonny () { // 找零
            return this.totalMonny - this.allMonny;
        }
    },
    watch: {
        'incomeMoneyPopup': function () { // 监听弹窗
            this.popups = this.incomeMoneyPopup;
            if (this.incomeMoneyPopup === false) {
                document.onkeydown = null;
            }
        },
        'popups': function () { // 监听弹窗关闭
            if (this.popups === false) {
                this.closePopup();
            }
        }
    },
    created () {
        var _self = this;
        this.popups = this.incomeMoneyPopup;
        document.onkeydown = function (e) { // 绑定键盘事件
            e.preventDefault
            console.log(e)
            console.log(e.keyCode)
            // e.preventDefault();
            if (e.ctrlKey) {
                switch (e.key) {
                    case "z":
                        _self.restoreValue();
                        console.log("按下了ctrl + z");
                        return;
                    case "x": // 暂不结算（关闭）
                        _self.popups = false;
                        console.log("按下了ctrl + x");
                        return;
                    case "j": // 结算打单
                        _self.orderPay();
                        console.log("按下了ctrl + j");
                        return;
                    case "v": // 打印单据
                        _self.printrRceipts()
                        console.log("按下了ctrl + v");
                        return;
                }
            }
            switch (e.keyCode) {
                case 88: // 现金 X
                    _self.$refs.xhCash.focus();
                    return;
                case 87: // 微信 W
                    _self.$refs.xhWeChat.focus();
                    return;
                case 90: // 支付宝 Z
                    _self.$refs.xhAlipay.focus();
                    return;
                case 83: // 刷卡 S
                    _self.$refs.xhSwipingCard.focus();
                    return;
            }
        }
    },
    mounted () {
        var _seft = this;
        this.getSeekSellReceiptsIntro();
        setTimeout(function () {
            _seft.$refs.xhCash.focus();
            _seft.newValuelocation = "xhCash";
            _seft.$refs.xhCash.select();
        }, 300)
    },
    beforeDestroy () { // 组件销毁
        document.onkeydown = null;
    },
    methods: {
        confirmBtn () { // 确定按钮
            console.log(this.incomeMoneyPopup);
        },
        getSeekSellReceiptsIntro () { // 单据简介-销售
            let options = {
                "orderNum": this.orderNumber
            }
            seekSellReceiptsIntro(options).then(response => {
                if (response.data.state === 200) {
                    this.receiptsIntroList = response.data.data;
                }
            }, response => {
                console.log(response);
            })
        },
        closeKeyboard () { // 删除一个数字
            if (this.onlyMonny[this.newValuelocation] !== "0") {
                var lengthValue = this.onlyMonny[this.newValuelocation];
                this.onlyMonny[this.newValuelocation] = lengthValue.slice(0, lengthValue.length - 1);
            }
        },
        addValue (parm) { // 键盘的对应事件
            if (this.onlyMonny[this.newValuelocation] === "0") {
                this.onlyMonny[this.newValuelocation] = parm;
            } else {
                this.onlyMonny[this.newValuelocation] = this.onlyMonny[this.newValuelocation].toString() + parm.toString();
            }
            this.$refs[this.newValuelocation].focus();
        },
        closePopup () { // 关闭弹窗
            this.$emit('closeIncomeMoney', false)
        },
        orderPay (cbData) { // 收银
            let payList = [];
            function getChangeData (payType, price) {
                let obj = {};
                if (price !== "0") {
                    obj = {
                        "payType": payType,
                        "price": price
                    }
                    payList.push(obj);
                }
            }
            for (let i in this.onlyMonny) {
                switch (i) {
                    case "xhCash": // 现金
                        getChangeData(2, this.onlyMonny.xhCash);
                        break;
                    case "xhSwipingCard": // 刷卡
                        getChangeData(1, this.onlyMonny.xhSwipingCard);
                        break;
                    case "xhWeChat": // 微信
                        getChangeData(4, this.onlyMonny.xhWeChat);
                        break;
                    case "xhAlipay": // 支付宝
                        getChangeData(3, this.onlyMonny.xhAlipay);
                        break;
                    case "xhOther": // 其它
                        getChangeData(6, this.onlyMonny.xhOther);
                        break;
                }
            }
            let changeMonny = {
                "payType": "0",
                "price": this.changeMonny
            }
            payList.push(changeMonny);
            let options = {
                "orderNum": this.orderNumber,
                "operateType": 2,
                "payList": payList
            }
            operateOrderPay(options).then((response) => {
                if (response.data.state === 200) {
                    this.$emit("closeIncomeMoney");
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log(response);
            })
        },
        printrRceipts () { // 打单
            this.$emit('openQualityTemplateSelectorDialog', this.orderNumber);
        },
        /* 底部的四大功能 */
        restoreValue () { // 还原现金输入
            this.onlyMonny.xhCash = 0;
            this.onlyMonny.xhSwipingCard = 0;
            this.onlyMonny.xhWeChat = 0;
            this.onlyMonny.xhAlipay = 0;
            this.onlyMonny.xhOther = 0;
        },
        focusFun (parm, e) { // 获取焦点方法
            this.newValuelocation = parm;
            this.$refs[this.newValuelocation].select();
        }
    }
}
</script>
<style lang="scss" scoped>
.income-money{
    position: relative;
    .header{
        position: relative;
        height: 70px;
        line-height: 70px;
        background-color: #f6f7f8;
        text-align: center;
        span{
            position: absolute;
            right: 10px;
            padding: 0 20px;
            color: #999;
            cursor: pointer;
        }
    }
    .income-money-body{
        // border: 1px solid red;
        // height: 600px;
        font-size: 0;
        background-color: #fff;
        padding: 0 60px;
        .body-left{
            display: inline-block;
            vertical-align: top;
            height: 540px;
            margin-top: 20px;
            .ipt-computed{
                li{
                    height: 36px;
                    line-height: 36px;
                    // width: 200px;
                    // margin-right: 20px;
                    margin-bottom: 20px;
                    display: inline-block;
                    i{
                        display: inline-block;
                        font-style: normal;
                        vertical-align: top;
                        font-size: 14px;
                        height: 36px;
                        line-height: 36px;
                        width: 80px;
                        text-align: center;
                        background-color: #f6f7f8;
                        color: #42a8ff;
                        border-top-left-radius: 5px;
                        border-bottom-left-radius: 5px;
                        border: 1px solid #d6d6d6;
                        border-right: none;
                        // opacity: 0.1;
                    }
                    input{
                        padding-right: 12px;
                        vertical-align: top;
                        // padding: 14px;
                        width: 120px;
                        height: 36px;
                        text-align: right;
                        border: 1px solid #d6d6d6;
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                        border-left: 0px solid #fff;
                    }
                }
                li:nth-child(1), li:nth-child(6){
                    display: block;
                    margin-right: 0;
                    width: 100%;
                    input{
                        width: 340px;
                    }
                }
                li:nth-child(2), li:nth-child(4), li:nth-child(6), li:nth-child(7){
                    margin-right: 20px;
                }
                li:nth-child(7), li:nth-child(8){
                    margin-bottom: 0px;
                }
                li:nth-child(7){
                    input{
                        width: 170px;
                        color: red;
                        font-weight: bolder;
                    }
                }
                li:nth-child(8){
                    input{
                        width: 70px;
                        color: red;
                        font-weight: bolder;
                    }
                }
                li:nth-child(1), li:nth-child(7), li:nth-child(8){
                    i{
                        color: #fff;
                        background-color: #ffba42;
                    }
                }
            }
            .keyboard-btn{
                position: absolute;
                z-index: 4000;
                margin-top: 40px;
                border: 2px solid #d6d6d6;
                height: 240px;
                // width: 420px;
                background-color: #555656;
                border-radius: 4px;
                .keyboard-left{
                    // padding: 10px;
                    width: 321px;
                    // border: 1px solid blue;
                    display: inline-block;
                    vertical-align: top;
                    li{
                        display: inline-block;
                        width: 64px;
                        height: 42px;
                        line-height: 42px;
                        font-size: 14px;
                        text-align: center;
                        border-radius: 5px;
                        margin-left: 16px;
                        margin-top: 14px;
                        background-color: yellow;
                        color: #666;
                        background-color: #fff;
                        border: 1px solid #d6d6d6;
                        cursor: pointer;
                    }
                    .special-number{
                        border: 1px solid #ffba42;
                    }
                }
                .keyboard-right{
                    display: inline-block;
                    width: 95px;
                    padding-left: 16px;
                    cursor: pointer;
                    li{
                        font-size: 14px;
                        text-align: center;
                        font-size: 18px;
                        border-radius: 5px;
                        margin-top: 14px;
                    }
                    li:nth-child(1){
                        width: 65px;
                        height: 42px;
                        line-height: 42px;
                        background-color: #ffba42;
                        img{
                            margin: 7px 4px 0 0;
                        }
                    }
                    li:nth-child(2){
                        width: 65px;
                        height: 154px;
                        line-height: 154px;
                        color: #fff;
                        font-weight: 600;
                        background-color: #ffba42;
                    }
                }
            }
        }
        .body-right{
            display: inline-block;
            vertical-align: top;
            margin-left: 40px;
            margin-top: 20px;
            width: 160px;
            // height: 500px;
            // background-color: yellow;
            ul{
                li{
                    height: 36px;
                    line-height: 36px;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    color: #fefefe;
                    background-color: #474d5d;
                }
            }
        }
    }
    .body-bottom{
        // position: absolute;
        // bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        font-size: 0;
        margin-top: 20px;
        padding-left: 65px;
        background-color: #f6f7f8;
        li{
            display: inline-block;
            width: 90px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #999;
            margin-right: 20px;
            margin-top: 17px;
            font-size: 14px;
            border-radius: 5px;
            background-color: #fff;
            border: 1px solid #d6d6d6;
            &:hover{
                cursor: pointer;
            }
            &:last-child{
                margin-right: 0;
            }
        }
    }
    .popup-bg{ // 弹窗背景层
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.3;
        width: 100%;
        height: 100%;
        background-color: red;
    }
    .popup-body{
        position: absolute;
        top: 146px;
        left: 80px;
        width: 340px;
        height: 190px;
        z-index: 3000;
        border-radius: 4px;
        background-color: #fff;
        .popup-body-ipt{
            width: 300px;
            height: 50px;
            line-height: 50px; 
            margin-left: 20px;
            margin-top: 45px;
            font-size: 0;
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid #d6d6d6;
            i{
                font-style: normal;
                display: inline-block;
                vertical-align: top;
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                color: #fff;
                background-color: #ffba42;
                text-align: center;
            }
            input{
                display: inline-block;
                height: 50px;
                line-height: 50px;
                width: 248px;
                outline: none;
                padding-left: 10px;
            }
        }
        .operation-btn{
            height: 50px;
            margin-top: 45px;
            background-color: #f6f7f8;
            text-align: center;
            font-size: 0;
            a{
                display: inline-block;
                width: 120px;
                height: 36px;
                border-radius: 4px;
                line-height: 36px;
                text-align: center;
                font-size: 14px;
            }
            a:nth-child(1){
                border: 1px solid #d6d6d6;
                margin-right: 40px;
            }
            a:nth-child(2){
                background-color: #4fdccb;
                color: #fff;
            }
        }
    }
}
</style>
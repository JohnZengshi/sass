<template>
    <div class="barcode-input" @click.stop="">
        <div class="w270">
            <el-input
                placeholder="请输入/扫描产品编码"
                v-model="barCode"
                @keyup.enter.native="gainProduct">
            </el-input>
        </div>
        <a class="btn" @click="cancelPop">取消</a>
    </div>
</template>
<script>
import { operateAddProductToOrder, operateAddBackProductToOrder } from './../../../../Api/commonality/operate'
export default {
    props: ['exchangeShow'],
    data () {
        return {
            "barCode": ""
        }
    },
    methods: {
        cancelPop () {
            let options = {
                data: "取消了",
                type: "1"
            }
            this.$emit("sellProductListChange", options);
        },
        gainProduct (e) { // 获取产品信息(5.32单据操作-新增销售商品)
            e.preventDefault();
            if (this.exchangeShow) { // 退换
                this.addBackProductToOrder();
            } else { // 销售
                this.addProductToOrder();
            }
        },
        addProductToOrder () { // 销售
            let options = {
                "orderNum": this.$route.query.orderNumber,
                "barcode": this.barCode
            }
            operateAddProductToOrder(options).then((response) => {
                if (response.data.state === 200) {
                    sessionStorage.setItem("barcode", this.barCode);
                    let datas = {
                        "data": {
                            "saleList": response.data.data
                        },
                        "type": "2"
                    }
                    this.$emit("sellProductListChange", datas);
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
                console.log(response);
            }, (response) => {
                console.log(response);
            })
        },
        addBackProductToOrder () { // 退换
            let options = {
                "orderNum": sessionStorage.getItem("orderNumber"),
                "barcode": this.barCode,
                "productType": "1"
            }
            operateAddBackProductToOrder(options).then((response) => {
                if (response.data.state === 200) {
                    sessionStorage.setItem("barcode", this.barCode);
                    let datas = {
                        "data": {
                            "saleList": response.data.data
                        },
                        "type": "2"
                    }
                    this.$emit("sellProductListChange", datas);
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
                console.log(response);
            }, (response) => {
                console.log(response);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.barcode-input{
    position: absolute;
    width: 350px;
    background:#fff;
    top: 0;
    .w270{
        width: 270px;
        float: left;
        margin: 12px 0;
    }
    .btn{
        width: 70px;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        display: inline-block;
        background: #fff;
        text-align: center;
        color:#999;
        border: 1px solid #999;
        cursor: pointer;
        font-size: 14px;
        float: right;
        margin:12px 0 0 0;          
    }
    .comfirmBtn{
        color: #fff;
        background: #4FDCCB;
        border-color: #4FDCCB;
        margin-right: 0;
    }
}
</style>
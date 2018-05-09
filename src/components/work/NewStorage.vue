<template>
    <el-dialog customClass="newPopupDig" class="dialog-wrap" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="./../../../static/img/piliang.png">
        </div>
        <div class="body">
            <div class="classes-block" v-if="cutData.one">
                <div class="title">选择产品大类</div>
                <ul class="list-left">
                    <li :class="{actions: item.classesType === chooseData.chooseBig}" @click="getBigFun(index)" v-for="(item, index) in productTypeList">{{getConfigValue(parseInt(item.classesType))}}</li>
                </ul>
                <ul class="list-right">
                    <li @click="getChildDta(item.classesId)" :class="{actions: item.classesId === newDatas.productTypeId}" v-for="item in productTypeListSmall">{{item.classesName}}</li>
                </ul>
                <div class="footer">
                    <!--<span>上一步</span>-->
                    <span class="next" v-if="newDatas.productTypeId" @click="toPageFun('two', 'one')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.two">
                <div class="title">选择入库库位</div>
                <ul class="list">
                    <li :title="item.repositoryName" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">{{item.repositoryName}}</li>
                </ul>
                <div class="footer">
                    <!-- <span class="pre" @click="toPageFun('one', 'two')">上一步</span> -->
                    <span class="next" v-if="newDatas.repositoryId" @click="toPageFun('three', 'two')">下一步</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.three">
                <div class="title">选择供应商</div>
                <ul class="list">
                    <li :title="item.supplierName" :class="{actions: newDatas.supplierId === item.supplierId}" v-for="item in supplierListData" @click="getSupplierId(item.supplierId)">{{item.supplierName}}</li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('two', 'three')">上一步</span>
                    <span class="next" @click="toPageFun('four', 'three')">跳过</span>
                </div>
            </div>
            <div class="classes-block" v-if="cutData.four">
                <div class="title">选择计划分销商</div>
                <ul class="list">
                    <li :title="item.shopName" v-for="item in shopListByCo" @click="getshopId(item.shopId)">{{item.shopName}}</li>
                </ul>
                <div class="footer">
                    <span class="pre" @click="toPageFun('three', 'four')">上一步</span>
                    <span class="next" @click="getshopId('')">跳过</span>
                </div>
            </div>
        </div>
        
        <!--<div class="receipts-class" v-if="cutData.one">
            <p class="popTitle">
                <a v-if="bigPreviousBtn" class="prePage" href="javascript: void(0)" @click="previousSiblindPage">上一步</a>
                <span>选择产品大类</span>
                <a v-if="newDatas.productTypeId" class="skip" href="javascript: void(0)" @click="toPageFun('two', 'one')">下一步</a>
            </p>
            <div class="dialog-info">
                <ul class="bigType-one" :style="canvasContainerStyle">
                    <li :class="{actions: item.classesType === chooseData.chooseBig}" v-for="(item, index) in productTypeList" v-if="item.show" @click="getBigFun(index)">{{getConfigValue(parseInt(item.classesType))}}</li>
                </ul>
                <ul class="smallType-one" :style="smallCanvasContainerStyle">
                    <li :class="{actions: item.classesId === newDatas.productTypeId}" v-for="item in productTypeListSmall" @click="getChildDta(item.classesId)">{{item.classesName}}</li>
                </ul>
            </div>
        </div>
        <div class="list" v-if="cutData.two">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('one', 'two')">上一步</a>
                选择入库库位
                <a v-if="newDatas.repositoryId" href="javascript:void(0)" class="skip" @click="toPageFun('three', 'two')">下一步</a>
            </p>
            <ul>
                <li :title="item.repositoryName" :class="{actions: newDatas.repositoryId === item.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">
                    {{item.repositoryName}}
                </li>
            </ul>
        </div>
        <div class="list" v-if="cutData.three">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('two', 'three')">上一步</a>
                    选择供应商
                <a href="javascript:void(0)" class="skip" @click="toPageFun('four', 'three')">跳过</a>
            </p>
            <ul>
                <li :title="item.supplierName" :class="{actions: newDatas.supplierId === item.supplierId}" v-for="item in supplierListData" @click="getSupplierId(item.supplierId)">
                    {{item.supplierName}}
                </li>
            </ul>
        </div>
        <div class="list" v-if="cutData.four" v-loading="isLoading" element-loading-text="拼命加载中">
            <p class="popTitle">
                <a href="javascript:void(0)" class="prePage" @click="toPageFun('three', 'four')">上一步</a>
                选择计划分销商
                <a href="javascript:void(0)" class="skip" @click="getshopId('')">跳过</a>
            </p>
            <ul>
                <li :title="item.shopName" v-for="item in shopListByCo" @click="getshopId(item.shopId)">
                    {{item.shopName}}
                </li>
            </ul>
        </div>-->
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {operateCreateRKReceipt} from './../../Api/commonality/operate'
export default {
    data () {
        return {
            "productTypeList": null,
            "productTypeListSmall": null,
            "transform": true,
            "fourBig": false,
            "bigStyle": {},
            "viewBig": 2,
            "chooseData": {
                "childIndex": 1,
                "chooseBig": "",
                "chooseSmall": ""
            },
            "cutData": {
                "one": false,
                "two": true,
                "three": false,
                "four": false
            },
            "newDatas": { // 新增数据(其它页面也用到的)
                "shopId": "", // 分销商ID
                "supplierId": "", // 供应商ID
                "productTypeId": "", // 产品类别ID
                "repositoryId": "" // 库位ID
            },
            "isShow": false,
            "bigPreviousBtn": false, // 大类上一步
            "isLoading": false,
            bigCanvas: {
                left: 86,
                right: 0,
                top: 106,
                width: 100,
                height: 100,
                rotateDeg: 0
            },
            smallCanvas: {
                left: 40,
                top: 200,
                opacity: 0
            },
        }
    },
    props: [
        'newPopup'
    ],
    watch: {
        'newPopup': function () {
            console.log(this.newPopup)
            if (this.newPopup === true) {
                this.isShow = this.newPopup;
            }
        },
        'isShow': function () {
            if (this.isShow === false) {
                this.$emit("closePopup", false)
            }
        }
    },
    created () {
        this.getProduct();
        this.getShopListByCo();
        this.workRepositoryList();
        this.workSupplierList();
        this.isShow = this.newPopup;
        
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "repositoryList", // 库位列表
            "supplierListData" // 供应商
        ]),
        canvasContainerStyle () {
            return {
                left: this.bigCanvas.left + 'px',
                top: this.bigCanvas.top + 'px',
            }
        },
        smallCanvasContainerStyle () {
            return {
                left: this.smallCanvas.left + 'px',
                top: this.smallCanvas.top + 'px',
                opacity: this.smallCanvas.opacity
            }
        }
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo", // 店铺列表
            "workSupplierList" // 供应商
        ]),
        getActions (parm) {
            if (parm === this.chooseData.chooseBig) {
                return true;
            } else if (parm === this.newDatas.productTypeId) {
                return true;
            } else {
                return false;
            }
        },
        getBigFun (index) { // 获取大类方法
            this.bigPreviousBtn = true;
            this.newDatas.productTypeId = "";
            let Num = this.productTypeList.length; // 获取大类长度
            for (var i = 0; i < Num; i++) {
                this.productTypeList[i].show = false;
            }
            this.productTypeList[index].show = true;
            this.productTypeListSmall = this.productTypeList[index].typeList;
            this.chooseData.chooseBig = this.productTypeList[index].classesType;
            this.nextPage();
        },
        previousSiblindPage () { // 上一页
            this.bigPreviousBtn = false;
            let Num = this.productTypeList.length; // 获取大类长度
            for (var i = 0; i < Num; i++) {
                this.productTypeList[i].show = true;
            }
            var _self = this;
            function timerFun () {
                let isBigCanvas = _self.bigCanvas.top < 106 || _self.bigCanvas.left < 86;
                let isSmallCanvas = _self.smallCanvas.top < 200 || _self.smallCanvas.opacity > 0;
                if (isBigCanvas || isSmallCanvas) {
                    setTimeout(function () {
                        if (_self.bigCanvas.top < 106) {
                            _self.bigCanvas.top += 1.7;
                        }
                        if (_self.bigCanvas.left < 86) {
                            _self.bigCanvas.left += 1;
                        }
                        if (_self.smallCanvas.top < 200) {
                            _self.smallCanvas.top += 2.2;
                        }
                        if (_self.smallCanvas.opacity > 0) {
                            _self.smallCanvas.opacity -= 0.02;
                        }
                        timerFun();
                    }, 4 / 1)
                }
            }
            timerFun();
        },
        nextPage () { // 下一步
            var _self = this;
            function timerFun () {
                let isBigCanvas = _self.bigCanvas.top > 20 || _self.bigCanvas.left > 40;
                let isSmallCanvas = _self.smallCanvas.top > 100 || _self.smallCanvas.opacity < 1;
                if (isBigCanvas || isSmallCanvas) {
                    setTimeout(function () {
                        if (_self.bigCanvas.top > 20) {
                            _self.bigCanvas.top -= 2;
                            // _self.smallCanvas.top -= 1;
                        }
                        if (_self.bigCanvas.left > 40) {
                            _self.bigCanvas.left -= 1;
                        }
                        if (_self.smallCanvas.top > 100) {
                            // _self.smallCanvas.top -= 2.2;
                            if (_self.smallCanvas.top > 140) {
                                _self.smallCanvas.top -= 2.2;
                            } else if (_self.smallCanvas.top > 105) {
                                _self.smallCanvas.top -= 1;
                            } else {
                                _self.smallCanvas.top -= 0.2;
                            }
                        }
                        if (_self.smallCanvas.opacity < 1) {
                            _self.smallCanvas.opacity += 0.01;
                        }
                        timerFun();
                    }, 4 / 1)
                }
            }
            timerFun();
        },
        toPageFun (to, from) { // 去到的， 目前的
            this.cutData[to] = true;
            this.cutData[from] = false;
        },
        getShopId (parm) { // 绑定店铺Id
            this.newDatas.shopId = parm;
            this.cutData.two = false;
            this.cutData.three = true;
            // alert(parm);
        },
        getSupplierId (parm) { // 绑定供应商
            this.cutData.three = false;
            this.cutData.four = true;
            this.newDatas.supplierId = parm;
        },
        getRepositoryId (parm) { // 绑定库位Id
            this.cutData.two = false;
            this.cutData.three = true;
            this.newDatas.repositoryId = parm;
        },
        getshopId (parm) { // 绑定库位Id
            var options = {
                "shopId": parm, // 分销商ID
                "supplierId": this.newDatas.supplierId, // 供应商ID
                "productTypeId": this.newDatas.productTypeId, // 产品类别ID
                "repositoryId": this.newDatas.repositoryId // 库位ID
            }
            this.isLoading = true;
            sessionStorage.setItem("确定新建入库", JSON.stringify(options));
            operateCreateRKReceipt(options).then((response) => { // 新建单据
                this.isLoading = false;
                if (response.data.state === 200) {
                    if (this.isLoading == false) {
                        sessionStorage.setItem("newReceipts", true); // 编辑新建
                        this.$router.push({
                            "path": "/work/storage/detail",
                            "query": {
                                "orderNumber": response.data.data.orderNum,
                                "isRole": "Y",
                                "isCheckOrderMan": "N"
                            }
                        });
                    }
                } else {
                    this.isLoading = false;
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.isLoading = false;
                console.log(response);
            })
            this.cutData.three = false;
        },
        cancelPop () {
            this.popup.openPopup = false;
        },
        getProduct () { // 大类个数
            var data = {
                "data": {
                    "type": "1",
                    "userId": sessionStorage.getItem("id")
                },
                "unit": {
                    "companyId": sessionStorage.getItem("companyId"),
                    "channel": 3,
                    "OS": "web",
                    "ip": "string",
                    "userId": sessionStorage.getItem("id"),
                    "tokenId": sessionStorage.getItem("tokenId")
                }
            }
            var url = INTERFACE_URL_9083 + "/v1/goods/getProductTypeList";
            this.$http.post(url, data).then((response) => {
                // console.log("产品名称");
                console.log(response.data.data.list);
                this.productTypeList = response.data.data.list;
                this.getBigFun(0)
                let Num = this.productTypeList.length;
                // console.log(Num)
                for (var i = 0; i < Num; i++) {
                    this.productTypeList[i].show = true;
                }
                if (Num > 3) {
                this.bigStyle = {
                    left: '40px'
                };
            }
            }, (response) => {
                console.log(response);
            })
        },
        getConfigValue (parm) { // 配置产品类别
            let configName = null;
            switch (parm) {
                case 1:
                    configName = "计重类";
                    break;
                case 2:
                    configName = "计件类";
                    break;
                // case 3:
                //     configName = "饰品类"
                //     break;
            }
            return configName;
        },
        move (index) {
            let Num = this.productTypeList.length; // 获取大类长度
            for (var i = 0; i < Num; i++) {
                this.productTypeList[i].show = false;
            }
            this.productTypeList[index].show = true;
            this.productTypeListSmall = this.productTypeList[index].typeList;
            var big = document.getElementById("big");
            var small = document.getElementById("small");
            this.move2(big, {"left": "40", "top": "20", "opacity": 100}, "normal");
            this.move2(small, {"left": "40", "top": "76", "opacity": 100}, "slow")
            if (Num > 3) {
                this.fourBig = true;
            }
            this.chooseData.chooseBig = this.productTypeList[index].classesType;
        },
        getChildDta (parm) {
            this.cutData.one = false;
            this.cutData.two = true;
            this.newDatas.productTypeId = parm;
        },
        move2 (obj, moveJson, stopTime) { // 对象 终点 运动终点  运动方式
            var prd_speed = { // 预定义 predefine
                veryslow: 5000,
                slow: 1000,
                normal: 1000,
                fast: 700,
                veryfast: 300
            };
            // 如果输入预定速度的字符串，就进行转换
            if (stopTime) {
                if (typeof stopTime === 'string') {
                    stopTime = prd_speed[stopTime];
                };
            } else {
                stopTime = prd_speed.normal;
            }
            var start = {}; // json
            var dis = {}; // json
            for (var key in moveJson) {
                start[key] = this.getStyle(obj, key);
                dis[key] = moveJson[key] - start[key]; // 距离 distance
            }
            // 定时器---------------------------------------------
            var count = parseInt(stopTime / 30); // 次数
            var n = 0; // 步进
            clearInterval(obj.timer); // 开定时器之前，先清除定时器
            obj.timer = setInterval(function() {
                n++;
                for (var key in moveJson) {
                    var a = 1 - n / count; // a的值会越来越小
                    var step_dis = start[key] + dis[key] * (1 - a * a * a);
                    if (key === 'opacity') { // 透明
                        obj.style.filter = 'alpha(opacity:' + step_dis + ')';
                        obj.style.opacity = step_dis / 100;
                    } else { // 其他
                        obj.style[key] = step_dis + 'px';
                    }
                };
                // 清除定时器
                if (n === count) {
                    clearInterval(obj.timer);
                };
            }, 30)
        },
        getStyle (obj, styleName) {
            var value = obj.currentStyle ? obj.currentStyle[styleName] : getComputedStyle(obj, false)[styleName];
            if (styleName === 'opacity') {
                value = Math.round(parseFloat(value) * 100);
            } else {
                value = parseInt(value);
            }
            return value;
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style lang="scss" scoped>
.dialog-wrap{
    .actions{
       // background-color: #4fdcca!important;
        color: #2993f8!important;
    }
}
.receipts-class{ // 产品类别
    width: 100%;
    height: 100%;
    .dialog-info{ // 弹窗内容
        position: relative;
        height: 215px;
        scrollbar[orient="vertical"]{display:none!important;}
        ::-webkit-scrollbar {
          width: 0px;
        }
        .bigType-one{
            position: absolute;
            li{
                display: inline-block;
                width: 100px;
                height: 36px;
                line-height: 36px;
                border: 1px solid #4fdcca;
                background-color: #fff;
                color: #4fdcca;
                cursor: pointer;
                text-align: center;
                border-radius: 3px;
                margin:0 20px 20px 0;
                &:hover{
                    background-color: #4fdcca;
                    border: 1px solid #4fdcca;
                    color: #fff;
                }
            }
        }
        .smallType-one{
            position: absolute;
            height: 36px;
            li{
                display: inline-block;
                width: 100px;
                height: 36px;
                line-height: 36px;
                border: 1px solid #4fdcca;
                background-color: #fff;
                color: #4fdcca;
                cursor: pointer;
                text-align: center;
                border-radius: 3px;
                margin:0 20px 20px 0;
                &:hover{
                    background-color: #4fdcca;
                    border: 1px solid #4fdcca;
                    color: #fff;
                }
            }
        }
    }
}
.popTitle{ // 弹窗标题
    height: 70px;
    line-height: 70px;
    text-align: center;
    background: #f6f7f8;
    border-radius: 4px 4px 0 0;
    .prePage{ // 上一页
        position: absolute;
        left: 10px;
    }
    .skip{ // 跳过
        position: absolute;
        right: 10px;
    }
}
.list{
    width: 540px;
    height: 320px;

    ul{
        margin:0 auto; width:480px; top:40%; transform:translateY(-50%);   position:relative;
        li{
            display: inline-block;
            width: 100px;
            height: 36px;
            line-height: 36px;
            border: 1px solid #4fdcca;
            background-color: #fff;
            color: #4fdcca;
            cursor: pointer;
            text-align: center;
            border-radius: 3px;
            margin:0 10px 20px 10px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        li:hover{
            background-color: #4fdcca;
            border: 1px solid #4fdcca;
            color: #fff;
        }
    }
}
</style>

<template>
    <div class="step">
        <p class="popTitle">
            <a @click="closeView" class="prePage">上一步</a>
            选择产品大类
        </p>
        <div class="dialog-info">
            <ul id="big" :class="['bigType', {'animateFour': fourBig}]" :style="bigStyle">
                <li v-for="(item, index) in productTypeList" @click="move(index)" v-if="item.show">{{getConfigValue(parseInt(item.classesType))}}</li>
            </ul>
            <ul id="small" :class="['smallType']" v-if="transform" :style="smallStyle">
                <li v-for="item in productTypeListSmall" @click="getChildDta(item.classesId, item.classesName)">{{item.classesName}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getProductTypeList} from './../../../../../Api/commonality/seek'
export default {
    data () {
        return {
            productTypeList: null,
            productTypeListSmall: null,
            transform: true,
            fourBig: false,
            bigStyle: {},
            smallStyle: {},
            viewBig: 2,
            chooseData: {
                childIndex: 1,
                chooseBig: "",
                chooseBigName: "",
                chooseSmall: "",
                chooseSmallName: ""
            }
        }
    },
    props: [
        'childData'
    ],
    created () {
        this.getProduct();
    },
    methods: {
        cancelPop () {
            this.popup.openPopup = false;
        },
        getProduct () { // 大类个数
            getProductTypeList(options).then((response) => {
                this.productTypeList = response.data.data.list;
                let Num = this.productTypeList.length;
                for (var i = 0; i < Num; i++) {
                    this.productTypeList[i].show = true;
                }
                if (Num > 3) {
                    this.bigStyle = {
                        left: '40px'
                    };
                }
                console.log(response);
            }, (response) => {
                console.log(response);
            })
        },
        getConfigValue (parm) { // 配置产品类别
            let configName = null;
            switch (parm) {
                case 1:
                    configName = "素金类";
                    break;
                case 2:
                    configName = "珠宝类";
                    break;
                case 3:
                    configName = "饰品类"
                    break;
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
            this.move2(small, {"left": "40", "top": "76", "opacity": 100}, "normal")
            if (Num > 3) {
                this.fourBig = true;
            }
            this.chooseData.chooseBig = this.productTypeList[index].classesType;
            this.chooseData.chooseBigName = this.getConfigValue(index + 1);
        },
        nextView () {
            this.$emit("changeView", this.viewBig);
            // console.log(msg)
        },
        getChildDta (id, name) {
            this.chooseData.chooseSmall = id;
            this.chooseData.chooseSmallName = name;
            console.log("选中的数：");
            console.log(this.chooseData);
            this.$emit("childData", this.chooseData);
            this.nextView()
        },
        move2 (obj, moveJson, stopTime) { // 对象 终点 运动终点  运动方式
            var prd_speed = { // 预定义 predefine
                veryslow: 5000,
                slow: 2000,
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
        },
        closeView () { // 关闭窗口
            this.$emit("changeView", 0);
        }
    }
}
</script>
<style src="./../css/tep.scss" lang="scss" scoped></style>
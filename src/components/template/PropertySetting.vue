<template>
    <div class="property-setting">
        <div class="property-setting-title">
            <span class="property-setting-span1">动态数据项：</span><span class="property-setting-span2">{{ data.propertyName }}</span>
        </div>
        <div class="property-setting-body" v-if="data.propertyType != 4">
            <el-form label-width="38px" label-position="left" class="property-setting-form1">
                <div class="el-form-item" v-show="data.propertyType == 1 || data.propertyType == 3">
                    <label class="el-label">保留小数点位数</label><el-select class="to-fixed" v-model.number="data.toFixed" placeholder="请选择" size="small">
                    <el-option label="0位" value="0"></el-option>
                    <el-option label="1位" value="1"></el-option>
                    <el-option label="2位" value="2"></el-option>
                    <el-option label="3位" value="3" v-show="data.propertyType == 3"></el-option>
                </el-select>
                </div>
                <div class="el-form-item" v-show="data.propertyType == 2">
                    <label class="el-label">格式</label><el-select class="date-format" v-model="data.dateFormat" placeholder="请选择" size="small">
                    <el-option label="年-月-日 时:分:秒" value="YYYY-MM-DD HH:mm:ss"></el-option>
                    <el-option label="年-月-日 时:分" value="YYYY-MM-DD HH:mm"></el-option>
                    <el-option label="年-月-日" value="YYYY-MM-DD"></el-option>
                    <el-option label="时:分:秒" value="HH:mm:ss"></el-option>
                    <el-option label="时:分" value="HH:mm"></el-option>
                </el-select>
                </div>
                <el-form-item label="样本">
                    <PropertyValueInput :currentStyleType="styleType" styleType="value" :value="data.sample" @changeStyleType="toggleStyle($event)" @change="(value)=>{this.data.sample = value}"></PropertyValueInput>
                </el-form-item>
                <el-form-item label="前缀">
                    <PropertyValueInput :currentStyleType="styleType" styleType="prefix" :value="data.prefix" @changeStyleType="toggleStyle($event)" @change="(value)=>{this.data.prefix = value}"></PropertyValueInput>
                </el-form-item>
                <el-form-item label="后缀">
                    <PropertyValueInput :currentStyleType="styleType" styleType="suffix" :value="data.suffix" @changeStyleType="toggleStyle($event)" @change="(value)=>{this.data.suffix = value}"></PropertyValueInput>
                </el-form-item>
            </el-form>
        </div>
        <div class="property-setting-body" v-if="data.propertyType != 4">
            <p class="property-setting-text">{{ propertySettingText }}</p>
            <div class="font-style">
                <el-tooltip effect="dark" content="加粗" placement="top">
                    <i class="icon bold-icon" :class="{active: style.isBold}" @click="style.isBold = !style.isBold"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="斜体" placement="top">
                    <i class="icon italic-icon" :class="{active: style.isItalic}" @click="style.isItalic = !style.isItalic" ></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="下划线" placement="top">
                    <i class="icon underline-icon" :class="{active: style.isUnderline}" @click="style.isUnderline = !style.isUnderline"></i>
                </el-tooltip>
            </div>
            <el-form label-width="80px" label-position="left">
                <!--字体设置-->
                <el-form-item label="字体">
                    <el-select v-model="style.fontFamily" :title="style.fontFamily" placeholder="请选择字体" size="small" @change="selectFonts">
                        <el-option v-for="k in fonts" :style="fontFamily(k)"  :label="k.label" :value="k.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体大小">
                    <div class="fontSize">
                        <i class="icon minus-icon" title="减少" @click="minusFontSizeHandler"></i><input type="text" class="font-size-input" v-model="style.fontSize" @input="fontSizeInputHandler" /><i class="icon plus-icon" title="增加" @click="plusFontSizeHandler"></i>
                    </div>
                </el-form-item>
                <div class="el-form-item">
                    <label class="el-label">文本颜色</label><input type="text" class="color" v-model="style.color"><el-color-picker v-model="style.color"></el-color-picker>
                </div>
            </el-form>
        </div>
        <div class="property-setting-body" v-if="data.propertyType != 4">
            <el-form class="property-setting-form4" label-width="80px" label-position="left">
                <el-form-item label="横轴">
                    <LengthInput :length="data.left" @change="(value)=>{this.data.left = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="竖轴">
                    <LengthInput :length="data.top" @change="(value)=>{this.data.top = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="空值打印">
                    <el-checkbox v-model="data.isNullPrint"></el-checkbox>
                </el-form-item>
                <el-form-item label="边框">
                    <el-checkbox v-model="data.border"></el-checkbox>
                </el-form-item>
                <div class="text-align">
                    <el-tooltip effect="dark" content="水平左对齐">
                        <!--<i class="icon text-align-left-icon" :class="{active: data.textAlign == 'left'}" @click="data.textAlign = 'left'"></i>-->
                        <i class="icon text-align-left-icon" :class="{active: data.textAlign == 'left'}" @click="textAlignAction('left')"></i>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="水平居中对齐">
                        <i class="icon text-align-center-icon" :class="{active: data.textAlign == 'center'}" @click="textAlignAction('center')"></i>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="水平右对齐">
                        <i class="icon text-align-right-icon" :class="{active: data.textAlign == 'right'}" @click="textAlignAction('right')"></i>
                    </el-tooltip>
                </div>
                <!--<div class="text-align">
                    <el-tooltip effect="dark" content="测试">
                        <i class="icon text-align-left-icon" @click="showData"></i>
                    </el-tooltip>
                </div>-->
                <div class="vertical-align">
                    <el-tooltip effect="dark" content="垂直顶部对齐">
                        <i class="icon vertical-align-top-icon" :class="{active: data.verticalAlign == 'top'}" @click="data.verticalAlign = 'top'"></i>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="垂直居中对齐">
                        <i class="icon vertical-align-middle-icon" :class="{active: data.verticalAlign == 'middle'}" @click="data.verticalAlign = 'middle'"></i>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="垂直底部对齐">
                        <i class="icon vertical-align-bottom-icon" :class="{active: data.verticalAlign == 'bottom'}" @click="data.verticalAlign = 'bottom'"></i>
                    </el-tooltip>
                </div>
            </el-form>
        </div>
        <div class="property-setting-body" v-if="data.propertyType == 4">
            <el-form class="property-setting-form4" ref="form" label-width="80px" :model="data" label-position="left" @submit.native.prevent>
                <el-select v-if="data.propertyCode == 'barcode2'" v-model="data.sample" placeholder="请选择" @change="selectChange">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-form-item v-else label="样本">
                    <div class="el-form-item__content">
                        <div class="sample-input el-input el-input--small">
                            <input type="text" v-model="data.sample" @input="sampleInputHandler" placeholder="" maxlength="15" autocomplete="off" class="el-input__inner" />
                        </div>
                    </div>
                </el-form-item>
                <div class="el-form-item" v-if="data.propertyCode != 'barcode2'">
                    <label class="el-form-item__label" style="width: 80px;">宽</label>
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-form-item__content">
                            <div class="el-input el-input--small el-input-group el-input-group--append">
                                <input type="text" placeholder="" :value="data.width" disabled autocomplete="off" class="el-input__inner">
                                <div class="el-input-group__append">mm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-form-item label="宽" v-else>
                    <LengthInput :length="data.width" @change="inputChange"></LengthInput>
                </el-form-item>
                <el-form-item label="高">
                    <LengthInput :length="data.height" @change="(value)=>{this.data.height = value}"></LengthInput>
                </el-form-item>

                <el-form-item label="横轴">
                    <LengthInput :length="data.left" @change="(value)=>{this.data.left = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="竖轴">
                    <LengthInput :length="data.top" @change="(value)=>{this.data.top = value}"></LengthInput>
                </el-form-item>
                <el-form-item v-if="data.propertyCode != 'barcode2'" label="编码">
                    <div class="el-form-item__content">
                        <div class="sample-input el-input el-input--small">
                            <input type="text" value="CODE128Auto" readonly  disabled class="el-input__inner" />
                        </div>
                    </div>
                </el-form-item>
                <div class="el-form-item" v-if="data.propertyCode != 'barcode2'">
                    <label class="el-form-item__label" style="width: 80px;">密度</label>
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-form-item__content">
                            <div class="el-input el-input--small el-input-group el-input-group--append">
                                <input type="text" placeholder="" value="0.8" disabled autocomplete="off" class="el-input__inner">
                                <div class="el-input-group__append">mm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="barcode-tips" v-if="data.propertyCode != 'barcode2'"><i style="color: #F7BA2A;" class="el-icon-information"></i> 条形码说明：<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;条形码是将宽度不等的多个黑条和空白，按照一定的编码规则排列，条形码宽度是有严格比例的，其最小宽度叫一个模块，一个条码由很多个模块构成，模块的宽度增加导致条码的宽度增加。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假设一个条码由20个模块构成，那么一个模块增加一个像素，条码就会增加20个像素，因此，条码的宽度是不能任意增加的，否则就有可能造成条空宽度比例不准，条码扫描不出来 </div>
            </el-form>
        </div>





    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        Form,
        FormItem,
        Select,
        Option,
        InputNumber,
        ColorPicker,
        Checkbox,
        Tooltip
    } from 'element-ui'
    import LengthInput from './LengthInput'
    import apiCall from '@/Api/apiCall'
    import PropertyValueInput from './PropertyValueInput'

    //字体检测
    let Detector = require('../../assets/js/fontdetect')
    let detector = new Detector()

    let fonts = require('../../assets/js/fonts')

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(InputNumber)
    Vue.use(ColorPicker)
    Vue.use(Checkbox)
    Vue.use(Tooltip)

    export default {
        components: {
            LengthInput,
            PropertyValueInput
        },
        data() {
            return {
                options: [],
                styleType: 'value',
                ready: false,
                data: {
                    propertyCode: '',
                    propertyName: '',
                    propertyType: 0,
                    isNullPrint: false,
                    border: false,
                    toFixed: 0,
                    dateFormat: 'YYYY-MM-DD H:m:s',
                    prefix: '',
                    prefixStyle: {
                        isBold: false,
                        isItalic: false,
                        isUnderline: false,
                        fontFamily: '微软雅黑, Microsoft YaHei',
                        fontSize: 14,
                        color: '#000000'
                    },
                    codeUrl: '',
                    sample: '',
                    valueStyle: {
                        isBold: false,
                        isItalic: false,
                        isUnderline: false,
                        fontFamily: '微软雅黑, Microsoft YaHei',
                        fontSize: 14,
                        color: '#000000'
                    },
                    suffix: '',
                    suffixStyle: {
                        isBold: false,
                        isItalic: false,
                        isUnderline: false,
                        fontFamily: '微软雅黑, Microsoft YaHei',
                        fontSize: 14,
                        color: '#000000'
                    },
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    textAlign: 'left',
                    verticalAlign: 'middle'
                },

                fonts : [],

                dialogVisible : false
            }
        },

        created(){
            let _this = this;
            this.fonts.push(...fonts.Fonts)
            apiCall({}, '/v1/print/getSettingLabel').then(res => {
                if (res.data.state == 200){
                    _this.options = res.data.data.dataList;
                }
            })
            this.templateId = this.$route.query.templateId;
            this.unit = {
                "channel": 3,
                "OS": "web",
                "ip": "string",
                "tokenId": sessionStorage.getItem("tokenId"),
                "userId": sessionStorage.getItem("id"),
                "companyId": sessionStorage.getItem("companyId"),
                "version": ""
            }
        },
        computed: {
            propertySettingText() {
                switch (this.styleType) {
                    case 'prefix':
                        return '前缀属性'
                    case 'value':
                        return '样本属性'
                    case 'suffix':
                        return '后缀属性'
                    default:
                        return '动态数据项属性'
                }
            },
            style() {
                return this.data[this.styleType + 'Style']
            }
        },
        methods: {

            inputChange(val){
                this.data.width = val;
                this.data.height = val;
            },
            //字体选择
            selectFonts(ev){
                console.log(ev)
                if( !detector.detect(ev) ){
                    this.$emit('dialogVisibleFun',{
                        type : true,
                        fonts : ev
                    })
                }
                //
            },
            selectChange(id){
                this.data.sample = id;
                this.data.codeUrl = 'http://label.yunzhubao.com/#/l?t=' + id;
            },

            fontFamily(k){
                let isInstallFonts = detector.detect(k.value)
                return {
                    fontFamily : k.value,
                    background: isInstallFonts ? 'transparent' : '#f5f5f5',
                    color : isInstallFonts ? '' : '#ccc'
                }
            },

            toggleStyle(type) {
                this.styleType = type
            },
            minusFontSizeHandler() {
                if (this.style.fontSize > 6) {
                    this.style.fontSize--
                }
            },
            plusFontSizeHandler() {
                this.style.fontSize++
            },
            fontSizeInputHandler(e) {
                let value = e.target.value
                if (value && !/^[1-9]\d*$/.test(value)) {
                    this.style.fontSize = /[1-9]\d*/.test(value) ? Number(value.match(/[1-9]\d*/)[0]) : ''
                }
            },
            sampleInputHandler(e) {
                let value = e.target.value
                if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
                    this.data.sample = /[a-zA-Z0-9]+/.test(value) ? value.match(/[a-zA-Z0-9]+/)[0] : ''
                }
            },
            showData(){
                console.log(this.canvas)
                console.log(this.data)
                let offsetLeft = this.canvas.width - this.data.width
                this.data.left = offsetLeft
            },
            textAlignAction(type){
                let that = this
                that.data.textAlign = type
//      	switch (type) {
//              case 'left':
//                  that.data.textAlign = type
//      						that.data.left = 0
//      						break
//              case 'center':
//                  that.data.textAlign = type
//                  var offsetLeft = (that.canvas.width / 2) - (that.data.width / 2)
//      						that.data.left = offsetLeft
//      						break
//              case 'right':
//              		this.data.textAlign = type
//                  var offsetLeft = that.canvas.width - that.data.width
//      						that.data.left = offsetLeft
//      						break
//          }
            }
        },
        props: ['canvas'],
        watch: {
            data: {
                handler(data) {
                    if (this.ready) {
                        this.$emit('changeComponentSetting', data)
                    }
                },
                deep: true
            },
        },
        mounted() {
            this.$on('set_data', data => {
                this.ready = false
                let dataClone = JSON.parse(JSON.stringify(data))
                if (data.propertyCode != this.data.propertyCode) {
                    this.styleType = 'value'
                }
                for (let key in dataClone) {
                    if (this.data[key] !== undefined && this.data[key] != dataClone[key]) {
                        this.data[key] = dataClone[key]
                    }
                }
                Vue.nextTick(() => {
                    this.ready = true
                })
            })
        }
    }
</script>

<style lang="scss">
    @import "~assets/css/template/mixin.scss";
    @import "~assets/css/template/fonts.scss";
    @import "~assets/css/template/colors.scss";
    @font-face {
        font-family: 'webfontregular';
        src: url('../../../static/fontface/tengcheungprint-webfont.woff2') format('woff2'),
        url('../../../static/fontface/tengcheungprint-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    .property-setting {
        .property-setting-title {
            padding: 0 20px;
            line-height: 44px;
            .property-setting-span1 {
                margin-right: 10px;
            }
            .property-setting-span2 {
                @include TC4;
            }
        }
        .property-setting-body {
            padding-top: 16px;
            padding-bottom: 10px;
            width: 190px;
            margin: 0 auto;
            border-top:  1px solid #d6d6d6;
            .property-setting-text {
                margin-bottom: 10px;
            }
            .property-value-input {
                .el-input__inner {
                    width: 130px;
                }
                .el-input-group__append {
                    padding: 0;
                }
                .icon {
                    opacity: .3;
                    &.active {
                        opacity: 1;
                    }
                }
            }
            .font-style {
                width: 100%;
                height: 34px;
                margin: 14px 0;
                box-sizing: border-box;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                overflow: hidden;
                .icon {
                    float: left;
                    border-right: 1px solid #d6d6d6;
                    &:last-child {
                        border-right: none;
                    }
                }
            }
            .text-align, .vertical-align {
                width: 100%;
                height: 34px;
                margin-bottom: 14px;
                box-sizing: border-box;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                overflow: hidden;
                .icon {
                    float: left;
                    opacity: .3;
                    border-right: 1px solid #d6d6d6;
                    &:last-child {
                        border-right: none;
                    }
                    &.active {
                        opacity: 1;
                    }
                }
            }
            .to-fixed {
                width: 80px;
            }
            .date-format {
                width: 150px;
            }
            .fontSize {
                height: 26px;
                width: 108px;
                line-height: 0;
                @include BD1;
                border-radius: 4px;
                .plus-icon {
                    border-left: 1px solid #d6d6d6;
                }
                .font-size-input {
                    text-align: center;
                    width: 62px;
                    height: 24px;
                    line-height: 24px;
                    @include F(12);
                    @include TC1;
                }
                .minus-icon {
                    border-right: 1px solid #d6d6d6;
                }
            }
            .property-setting-form1 {
                .el-form-item {
                    height: 34px;
                    margin-bottom: 14px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    label {
                        @include text-align-justify;
                        font-size: 14px;
                        padding: 0;
                        padding-right: 10px;
                        line-height: 34px;
                    }
                    .el-form-item__content {
                        line-height: 34px;
                        .el-select, .el-input {
                            .el-input__inner {
                                height: 34px;
                            }
                        }
                    }
                }
            }
            .property-setting-form4 {
                .el-form-item {
                    .el-input {
                        .el-input__inner {
                            width: 66px;
                        }
                        .el-input-group__append {
                            width: 44px;
                        }
                    }
                    .sample-input {
                        .el-input__inner {
                            width: 110px;
                        }
                    }
                    .el-checkbox {
                        padding: 0;
                        .el-checkbox__input {
                            &.is-checked {
                                .el-checkbox__inner {
                                    background-color: $C1;
                                    border-color: $C1;
                                }
                            }
                            &.is-focus, &:hover {
                                .el-checkbox__inner {
                                    border-color: #bfcbd9;
                                }
                            }
                        }
                    }
                }
            }
            .el-form-item {
                height: 26px;
                margin-bottom: 14px;
                &:last-child {
                    margin-bottom: 0;
                }
                .el-label {
                    line-height: 1;
                    float: left;
                }
                label {
                    @include text-align-justify;
                    font-size: 14px;
                    padding: 6px 24px 6px 0;
                }
                .el-form-item__content {
                    line-height: 26px;
                    .el-select, .el-input {
                        .el-input__inner {
                            height: 26px;
                        }
                    }
                }
                .color {
                    width: 88px;
                    height: 26px;
                    box-sizing: border-box;
                    padding: 3px 10px;
                    @include BD1;
                    border-right: 0;
                    border-radius: 4px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    vertical-align: middle;
                }
                .el-color-picker {
                    vertical-align: middle;
                    .el-color-picker__trigger {
                        display: block;
                        padding: 0;
                        height: 26px;
                        border-left: 0;
                        border-radius: 4px;
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        overflow: hidden;
                        .el-color-picker__color {
                            width: 21px;
                            height: 24px;
                            border: none;
                        }
                        .el-color-picker__icon {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    .barcode-tips{
        color: #999;
        line-height: 24px;
        font-size: 12px;
    }
</style>

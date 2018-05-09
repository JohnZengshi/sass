<template>
    <div class="text-setting">
        <div class="text-setting-title">
            <span class="text-setting-span1">基本元件：</span><span class="text-setting-span2">文本</span>
        </div>
        <div class="text-setting-body">
            <textarea class="content" placeholder="请输入内容" v-model="data.content"></textarea>
            <div class="font-style">
                <el-tooltip effect="dark" content="加粗">
                    <i class="icon bold-icon" :class="{active: data.isBold}" @click="data.isBold = !data.isBold" title="加粗"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="斜体">
                    <i class="icon italic-icon" :class="{active: data.isItalic}" @click="data.isItalic = !data.isItalic" title="斜体"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="下划线">
                    <i class="icon underline-icon" :class="{active: data.isUnderline}" @click="data.isUnderline = !data.isUnderline" title="下划线"></i>
                </el-tooltip>
            </div>
            <el-form label-width="80px" label-position="left">
                <el-form-item label="字体">
                    <el-select v-model="data.fontFamily" :title="data.fontFamily" placeholder="请选择字体" size="small" @change="selectFonts">
                        <el-option v-for="k in fonts" :style="fontFamily(k)"  :label="k.label" :value="k.value"></el-option>
                    </el-select>
                </el-form-item>
                
                <!--<el-form-item label="字体">
                    <el-select v-model="data.fontFamily" placeholder="请选择字体" size="small">
                        <el-option label="宋体" value="宋体, SimSun"></el-option>
                        <el-option label="等线" value="等线, Arial"></el-option>
                        <el-option label="华文楷体" value="华文楷体, Garamond"></el-option>
                        <el-option label="仿宋" value="仿宋, FangSong"></el-option>
                        <el-option label="方正舒体" value="方正舒体, FZShuTi"></el-option>
                        <el-option label="方正姚体" value="方正姚体, FZYaoti "></el-option>
                        <el-option label="方正姚体" value="方正姚体, FZYaoti "></el-option>
                        <el-option label="黑体" value="黑体, SimHei"></el-option>
                        <el-option label="华文彩云" value="华文彩云, STCaiyun"></el-option>
                        <el-option label="华文仿宋" value="华文仿宋, STFangsong"></el-option>
                        <el-option label="华文行楷" value="华文行楷, STXingkai"></el-option>
                        <el-option label="华文琥珀" value="华文琥珀, STHupo"></el-option>
                        <el-option label="华文隶书" value="华文隶书, STLiti"></el-option>
                        <el-option label="华文宋体" value="华文宋体, STSong"></el-option>
                        <el-option label="华文细黑" value="华文细黑, STXihei, STHeiti Light"></el-option>
                        <el-option label="华文新魏" value="华文新魏, STXinwei"></el-option>
                        <el-option label="华文中宋" value="华文中宋, STZhongsong"></el-option>
                        <el-option label="楷体" value="楷体, 楷体_GB2312, SimKai"></el-option>
                        <el-option label="隶书" value="隶书, SimLi"></el-option>
                        <el-option label="微软雅黑" value="微软雅黑, Microsoft YaHei"></el-option>
                        <el-option label="新宋体" value="新宋体, NSimSun"></el-option>
                        <el-option label="幼圆" value="幼圆, YouYuan"></el-option>
                        <el-option label="Malgun Gothic" value="Malgun Gothic"></el-option>
                        <el-option label="Yu Gothic UI Semibold" value="Yu Gothic UI Semibold"></el-option>
                        <el-option label="腾祥嘉丽中圆简" value="腾祥嘉丽中圆简"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="字体大小">
                    <div class="fontSize">
                        <i class="icon minus-icon" title="缩小" @click="minusFontSizeHandler"></i><input type="text" class="font-size-input" v-model="data.fontSize" @input="fontSizeInputHandler" /><i class="icon plus-icon" title="放大" @click="plusFontSizeHandler"></i>    
                    </div>
                </el-form-item>
                <div class="el-form-item">
                    <label class="el-label">文本颜色</label><input type="text" class="color" v-model="data.color"><el-color-picker v-model="data.color"></el-color-picker>
                </div>
                <el-form-item label="横轴">
                    <LengthInput :length="data.left" @change="(value)=>{this.data.left = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="竖轴">
                    <LengthInput :length="data.top" @change="(value)=>{this.data.top = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="边框">
                    <el-checkbox v-model="data.border"></el-checkbox>
<!--                     <img src="../../../static/title/TengCheungPrint.ttf" alt=""> -->
                </el-form-item>
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
    Checkbox
} from 'element-ui'
import LengthInput from './LengthInput'

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

export default {
    components: {
        LengthInput
    },
    data() {
        return {
            ready: false,
            data: {
                content: '',
                border: false,
                isBold: false,
                isItalic: false,
                isUnderline: false,
                fontFamily: '微软雅黑, Microsoft YaHei',
                fontSize: 14,
                color: '#000',
                left: 0,
                top: 0
            },
            
            
            fonts : [],
            dialogVisible : false
        }
    },
    created(){
       this.fonts.push(...fonts.Fonts)
    },
    watch: {
        data: {
            handler(data) {
                if (this.ready) {
                    this.$emit('changeComponentSetting', data)
                }
            },
            deep: true
        }
    },
    methods: {
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
        
        fontFamily(k){
           let isInstallFonts = detector.detect(k.value)
           return {
              fontFamily : k.value,
              background: isInstallFonts ? 'transparent' : '#f5f5f5',
              color : isInstallFonts ? '' : '#ccc'
           }
        },
        minusFontSizeHandler() {
            if (this.data.fontSize > 6) {
                this.data.fontSize--
            }
        },
        plusFontSizeHandler() {
            this.data.fontSize++
        },
        fontSizeInputHandler(e) {
            let value = e.target.value
            if (value && !/^[1-9]\d*$/.test(value)) {
                this.data.fontSize = /[1-9]\d*/.test(value) ? Number(value.match(/[1-9]\d*/)[0]) : ''
            }
        }
    },
    mounted() {
        this.$on('set_data', data => {
            this.ready = false
            let dataClone = JSON.parse(JSON.stringify(data))
            for (let key in dataClone) {
                if (this.data[key] !== undefined) {
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
.text-setting {
    .text-setting-title {
        padding: 0 20px;
        line-height: 44px;
        .text-setting-span1 {
            margin-right: 10px;
        }
        .text-setting-span2 {
            color: #0abfab;
        }
    }
    .text-setting-body {
        padding-top: 16px;
        padding-bottom: 10px;
        width: 190px;
        margin: 0 auto;
        border-top: 1px solid #d6d6d6;
        .content {
            display: block;
            width: 100%;
            height: 120px;
            box-sizing: border-box;
            padding: 10px;
            border: 1px solid #d6d6d6;
            border-radius: 4px;
            color: #333;
            font-family: 微软雅黑, Microsoft YaHei;
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
                >.el-select, >.el-input {
                    .el-input__inner {
                        height: 26px;
                    }
                }
                >.el-input {
                    .el-input__inner {
                        width: 66px;
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
}
</style>
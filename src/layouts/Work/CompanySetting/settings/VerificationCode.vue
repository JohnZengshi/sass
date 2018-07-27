<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>验证码管理<span style="font-size: 14px;">（当前验证码位数为{{code}}位。前缀和后缀两者位数相加不可超过5位）</span></div>
            <div class="model-content">
                <div v-loading="isLoading" element-loading-text="拼命加载中">
                    <div class="model-block" style="margin-bottom:10px;">
                        <label>中间位数</label>
                        <input v-model="codeLen" placeholder="无" type="text" v-on:blur="setCodeSetting('codeLen')">
                        <p>（可输入2-8之间的数字，设置验证码的中间位数）</p>
                    </div>
                    <div class="model-checkbox">
                        <el-checkbox v-model="mixFlag">字母和数字混合组成</el-checkbox>
                        <p>（选择后验证码由字母与数字进行混合生成）</p>
                    </div>
                    <div class="model-block">
                        <label>前缀字母</label>
                        <input v-model="prefixion" placeholder="无" type="text" @blur="setCodeSetting('prefixion')">
                        <p>（可输入大/小写字母）</p>
                    </div>
                    <div class="model-block">
                        <label>后缀字母</label>
                        <input v-model="suffix" placeholder="无" type="text" @blur="setCodeSetting('suffix')">
                        <p>（可输入大/小写字母）</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {getIdentifyingCode, updateIdentifyingCode} from './../../../../Api/commonality/seek'

    export default {
        data() {
            return {
                isLoading: false,
                code: '4',
                codeLen: '4', // 验证码位数
                prefixion: '', // 验证码前缀
                suffix: '', // 验证码后缀
                mixFlag: false
            }
        },
        mounted() {
            this.initData();
        },
        watch: {
            codeLen: 'codeLenFun',
            prefixion: 'prefixionFun',
            suffix: 'suffixFun'
        },
        methods: {
            initData() {
                var _this = this;
                getIdentifyingCode({}).then((res) => {
                    if (res.data.state == 200) {
                        var data = res.data.data
                        _this.code = data.codeLen + data.prefixion.length + data.suffix.length;
                        _this.codeLen = data.codeLen + '';
                        _this.prefixion = data.prefixion;
                        _this.suffix = data.suffix;
                        _this.mixFlag = data.mixFlag ? true : false;
                        _this.$watch('mixFlag', _this.setCodeSetting);
                        return;
                    }
                })
            },
            codeLenFun(curVal, oldVal) {
                this.codeLen = this.codeLen.replace(/[^\d]/g, '');
                if (+this.codeLen > 8 || +this.codeLen < 2){
                    this.codeLen = oldVal;
                }
            },
            prefixionFun(curVal, oldVal) {
                this.prefixion = this.prefixion.replace(/[^a-zA-Z]/g, '');
                this.judgmentLength() && (this.prefixion = oldVal);
            },
            suffixFun(curVal, oldVal) {
                this.suffix = this.suffix.replace(/[^a-zA-Z]/g, '');
                this.judgmentLength() && (this.suffix = oldVal);
            },
            setCodeSetting() {
                var _this = this;
                var data = {
                    codeLen: this.codeLen, // 验证码位数
                    prefixion: this.prefixion, // 验证码前缀
                    suffix: this.suffix, // 验证码后缀
                    mixFlag: this.mixFlag ? 1 : 0
                }
                updateIdentifyingCode(data).then((res) => {
                    var msg = {
                        type: 'warning',
                        message: res.data.msg
                    };
                    if (res.data.state == 200) {
                        _this.code = +res.data.data.codeLen + res.data.data.prefixion.length + res.data.data.suffix.length;
                        msg = {
                            type: 'success',
                            message: '修改成功!'
                        };
                    }
                    this.$message(msg);
                })
            },
            judgmentLength() {
                if (this.prefixion.length + this.suffix.length > 5) {
                    this.$message({
                        type: 'warning',
                        message: '前缀和后缀两者位数相加不可超过5位'
                    });
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style lang="scss" src="./../newSetting.scss" scoped></style>
<style lang="scss">
    .model-content{
        p{
            float:left;
            font-size:14px;
            color:#959595;
            span{
                color:#2993f8;
            }
        }
        .model-checkbox{
            height:36px;
            line-height:36px;
            margin-bottom:37px;
            label{
                display:block;
                width:250px;
                height:36px;
                float:left;
                text-align:right;
                color:#2993f8;
                font-size:14px;
                font-weight:bold;
                margin-right:23px;
            }
            .el-checkbox{
                .el-checkbox__label{
                    font-size:14px !important;
                }
            }

        }
        .model-block{
            height:36px;
            line-height:36px;
            margin-bottom:37px;
            label{
                display:block;
                width:85px;
                height:36px;
                float:left;
                text-align:right;
                color:#2993f8;
                font-size:14px;
                font-weight:bold;
                margin-right:23px;
            }
            input{
                width:144px;
                height:36px;
                background:#f6f7f8;
                border-radius:4px;
                margin-right:23px;
                float:left;
                text-align:center;
                border:1px solid #fff;
            }
            input:hover{
                border:1px solid #2993f8;
            }

        }
    }

</style>

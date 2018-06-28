<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>验证码管理<span style="font-size: 14px;">（当前验证码位数为 8 位。前缀和后缀两者位数相加不可超过5位）</span></div>
            <div class="model-content">
                <div v-loading="isLoading" element-loading-text="拼命加载中">
                    <div class="model-block">
                        <label>数字位数</label>
                        <input v-model="codeLen" placeholder="无" type="text" @blur="setCodeSetting(1)" @keyup="numMatch(1)">
                        <p>（可输入数字，设置验证码的位数）</p>
                    </div>
                    <div class="model-block">
                        <el-checkbox-group >
                            <el-checkbox label="字母和数字随机" name="type">字母和数字随机</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="model-block">
                        <label>前缀字母</label>
                        <input v-model="prefixion" placeholder="无" type="text" @blur="setCodeSetting(2)" @keyup="numMatch(2)">
                        <p>（可输入大/小写字母）</p>
                    </div>
                    <div class="model-block">
                        <label>后缀字母</label>
                        <input v-model="suffix" placeholder="无" type="text" @blur="setCodeSetting(3)" @keyup="numMatch(3)">
                        <p>（可输入大/小写字母）</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                codeLen: '', // 验证码位数
                prefixion: '', // 验证码前缀
                suffix: '', // 验证码后缀
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            initData(){

            },
            setCodeSetting(n){
                console.log(n)
            },
            numMatch(n){
                console.log(n)
            }
        }
    }
</script>

<style lang="scss" src="./../newSetting.scss" scoped></style>
<style lang="scss" scoped>
    .model-content{
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
            p{
                float:left;
                font-size:14px;
                color:#959595;
                span{
                    color:#2993f8;
                }
            }
        }
    }

</style>

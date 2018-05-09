<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>条码管理<span style="font-size: 14px;">（提示：前缀和后缀两者相加位数总长度不能超过5位）</span></div>
            <div class="model-content" >
                <div v-loading="isLoading" element-loading-text="拼命加载中">
                    <div class="model-block">
                        <label>数字位数</label>
                        <input v-model="codeLen" placeholder="无" type="text" @blur="setBarcodeSetting(1, codeLen)" @keyup="numMatch(1, codeLen)">
                        <p>条码数字位数为8~15位,目前条码总位数为<span>{{totalNum}}</span>位</p>
                    </div>
                    <div class="model-block">
                        <label>条码前缀</label>
                        <input v-model="prefixion" placeholder="无" type="text" @blur="setBarcodeSetting(2, prefixion)" @keyup="numMatch(2, prefixion)">
                        <p>可输入大/小写字母、数字、小数点（英文）</p>
                    </div>
                    <div class="model-block">
                        <label>条码后缀</label>
                        <input v-model="suffix" placeholder="无" type="text" @blur="setBarcodeSetting(3, suffix)" @keyup="numMatch(3, suffix)">
                        <p>可输入大/小写字母、数字、小数点（英文）</p>
                    </div>
                    <div class="model-block">
                        <label>条码开始序号</label>
                        <input v-model="startBarcode" placeholder="无" type="text" @blur="setBarcodeSetting(4, startBarcode)" @keyup="numMatch(4, startBarcode)">
                        <p>用于智能数据导入、入库、回购位置的系统自动生成的条码号。</p>
                    </div>
                    <!--<div class="model-block">
                        <label>条码位数</label>
                        <span>{{totalNum}}</span>
                        <p></p>
                    </div>-->
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import {seekGetBarcodeSetting} from './../../../../Api/commonality/seek'
import {operateSetBarcodeSetting} from './../../../../Api/commonality/operate'
export default {
    data () {
        return {
            isLoading: false,
            codeLen: '', // 条码位数
            prefixion: '', // 条码前缀
            suffix: '', // 条码后缀
            startBarcode: '', // 条码开始序号
            totalNum: '',
            dataObj: ''
        }
    },
    created () {
        this.getBarcodeSetting()
    },
    methods: {
        numMatch (type, value) { // type: 1 数字位数 , 2 前缀 , 3 后缀 , 4 开始序号
            //if (type == 1) 
        },
        setBarcodeSetting (type, date) { // 设置条码
            if (type == 1){
                if (Number(date) < 8 || Number(date) > 15) {
                    this.$message({
                        type: 'warning',
                        message: '范围在8~15位之间!'
                    })
                    return
                } else if (Number(date) + this.prefixion.length + this.suffix.length > 15) {
                    this.$message({
                        type: 'warning',
                        message: '范围超过了最大长度!'
                    })
                    return
                }
            } else if (type == 2) {
                if (date.length + this.suffix.length > 5) {
                    this.$message({
                        type: 'warning',
                        message: '前后缀总长度不能大于5位！'
                    })
                    return
                }
            } else if (type == 3) {
                if (date.length + this.prefixion.length > 5) {
                    this.$message({
                        type: 'warning',
                        message: '前后缀总长度不能大于5位！'
                    })
                    return
                }
            } else if (type == 4) {
                if (date.length > Number(this.codeLen)) {
                    this.$message({
                        type: 'warning',
                        message: '条码长度大于总长度！'
                    })
                    return
                } else if (Number(this.codeLen) - (date.length) > 0) {
                    let dValue = 0
                    dValue = Number(this.codeLen) - (date.length)
                    //console.log(dValue)
                    for (let i = 0; i < dValue; i++) {
                        date = "0" + date
                        //console.log(date)
                    }
                    this.startBarcode = date
                    //console.log(date)
                }
            }
            if (type == 1 && this.dataObj.codeLen == date || type == 2 && this.dataObj.prefixion == date || type == 3 && this.dataObj.suffix == date || type == 4 && this.dataObj.startBarcode == date) {
                // console.log(type)
                // console.log(this.prefixion)
                // console.log(date)
                return
            } else {
                let options = {
                    "companyId": sessionStorage.getItem('companyId'),
                    "operateType": type,
                    "data": date
                }
                console.log(options)
                this.totalNum = this.prefixion.length + this.suffix.length + Number(this.codeLen)
                operateSetBarcodeSetting(options).then((res) => {
                    console.log(res)
                    if (res.data.state == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                }, (res) => {
                    console.log(res)
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                })
            }
            
        },
        getBarcodeSetting () { // 条码数据
            let options = {
                companyId: sessionStorage.getItem('companyId')
            }
            seekGetBarcodeSetting(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.dataObj = res.data.data
                    this.codeLen = res.data.data.codeLen
                    this.prefixion = res.data.data.prefixion
                    this.suffix = res.data.data.suffix
                    this.startBarcode = res.data.data.startBarcode
                    this.totalNum = this.prefixion.length + this.suffix.length + this.startBarcode.length
                }
            }, (res) => {
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss" src="./../newSetting.scss" scoped></style>
<style lang="scss" scoped>
.model-content {
    .model-block {
        height: 36px;
        line-height: 36px;
        margin-bottom: 37px;
        label {
            display: block;
            width: 85px;
            height: 36px;
            float: left;
            text-align: right;
            color:#2993f8;
            font-size: 14px;
            font-weight: bold;
            margin-right: 23px;
        }
        input {
            width: 144px;
            height: 36px;
            background:#f6f7f8;
            border-radius: 4px;
            margin-right: 23px;
            float: left;
            text-align:center;
            border: 1px solid #fff;
        }
        input:hover {
            border: 1px solid #2993f8;
        }
        p {
            float: left;
            font-size: 14px;
            color:#959595;
            span {
                color:#2993f8;
            }
        }
    }
}

</style>



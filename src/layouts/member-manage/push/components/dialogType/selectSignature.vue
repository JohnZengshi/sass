<!-- 选择签名弹窗 -->
<template>
    <div class="selectSignature flex flex-v flex-align-center">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <img class="headerimg" src="static/img/piliang.png" />
        <h3>选择签名</h3>
        <div class="signatureList">
            <ul>
                <el-radio-group v-model="radio">
                    <li v-for="item in signatureList" class="flex flex-r flex-align-center flex-pack-justify">
                        <span class="flex flex-r flex-align-center" :class="{active : item.signId == radio.signId}">
                            <p>{{item.signName}}</p>
                            <span class="default" v-if="item.flag == '默认'">默认</span>
                        </span>
                        <el-radio class="square el-radio-nofont" :label="item"></el-radio>
                    </li>
                </el-radio-group>
            </ul>
        </div>
        <div class="bottomButton flex flex-r flex-pack-center">
            <div class="mybtn-div" @click.stop="confirmrequest">确&nbsp;定</div>
        </div>
    </div>
</template>
<script>
    import {findSmsSignList} from "Api/member";
    export default {
        props:['data'],
        data() {
            return {
                // 单选框的值
                radio: "",
                requestData:{
                    shopId:this.$route.query.shopId, //店铺Id
                    name:"", //签名名称
                    signId:"", //签名ID
                    defaultFlag:"", //签名状态 Y:默认 N:否
                    type: 0, //操作类型 0：修改1：删除
                },
                updata:true,
                findSmsSignListIng:false //正在获取标签列表
            }
        },
        asyncComputed:{
            signatureList:{ //标签列表
                get() {
                    if (this.updata) {
                        let shopId = this.requestData.shopId;
                        this.findSmsSignListIng = true;
                        let res = (async () => {
                            let res = await findSmsSignList({
                                shopId
                            })
                            this.findSmsSignListIng = false
                            if (res.body.msg == 'OK') {
                                let arr = res.body.data.dataList;
                                return arr;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg
                                });
                            }
                        })()
                        this.updata = false;
                        return res
                    }
                },
                default(){
                    return []
                }
            }
        },
        watch:{
            signatureList(val){
                if(val && val.length != 0 && this.data.signId){
                    let item = val.find((v)=>{
                        return v.signId == this.data.signId
                    })
                    this.radio = item; 
                }
            }
        },
        methods: {
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            confirmrequest() {
                //确认
                this.$emit('confirm', false,this.radio);
                this.$message({
                    type: 'info',
                    message: '确定'
                });
            },
        }
    }

</script>
<style lang="less" scoped>
    .selectSignature {
        z-index: 9999;
        position: relative;
        width: 320px;
        height: 450px;
        .signatureList {
            height: 266px;
            margin-top: 9px;
            overflow-y: scroll;
            ul {
                li {
                    width: 320px;
                    height: 43px;
                    line-height: 43px;
                    padding: 0 39px 0 49px;
                    >span {
                        font-size: 15px;
                        color: #737373;
                        >.default {
                            margin-left: 12px;
                            background-color: #3195F5;
                            color: #fff;
                            border-radius: 4px;
                            width: 50px;
                            height: 20px;
                            text-align: center;
                            line-height: 20px;
                            font-size: 14px;
                            vertical-align: text-top;
                        }
                        &.active {
                            color: #2993F8;
                        }
                    }
                }
            }
        }
        .bottomButton {
            margin-top: 15px;
        }
        .headerimg {
            width: 46px;
            height: 46px;
            margin-top: 24px;
        }
        h3 {
            margin-top: 15px;
            font-size: 14px;
            font-weight: bold;
        }
        .tipMsg {
            margin-top: 43px;
            font-size: 14px;
        }
        .bottomButton {
            width: 200px;
            margin-top: 41px;
            .mybtn-div {
                border: 1px solid #2993f8;
                width: 90px;
                height: 28px;
                border-radius: 5px;
                line-height: 28px;
                text-align: center;
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                background-color: #2993f8;
                box-sizing: border-box;
                cursor: pointer;
            }
            .clost-div {
                border: 1px solid #bdbdbd;
                width: 90px;
                height: 28px;
                border-radius: 5px;
                line-height: 28px;
                text-align: center;
                font-size: 12px;
                color: #2993F8;
                font-weight: bold;
                background-color: #FFF;
                box-sizing: border-box;
                cursor: pointer;
            }
        }
        .close-icon {
            position: absolute;
            top: 13px;
            right: 13px;
            display: inline-block;
            width: 14px;
            height: 14px;
            cursor: pointer;
            z-index: 99999;
        }
    }

</style>

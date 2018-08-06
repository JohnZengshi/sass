<template>
    <div class="createMain">
        <div class="title">
            <i class="iconfont icon-liebiao"></i>
            <span>编辑短信发送</span>
        </div>
        <el-form class="el_form_01 noteFrom" ref="form" :model="form" label-width="140px">
            <el-form-item label="短信名称">
                <el-input class="noteName" v-model="form.name" placeholder="最多可输入6个字符"></el-input>
            </el-form-item>
            <el-form-item label="发送方式">
                <el-radio-group class="sendMode" v-model="form.resource">
                    <el-radio label="即时发送"></el-radio>
                    <el-radio label="触发条件"></el-radio>
                </el-radio-group>
                <div class="timeTouchOff">
                    <span>时间触发:</span>
                    <span>2018-07-26 14:24</span>
                    <span>></span>
                    <el-select class="mineSelect" v-model="form.region" placeholder="请选择触发周期">
                        <el-option label="不重复" value="shanghai"></el-option>
                        <el-option label="每年重复" value="beijing"></el-option>
                        <el-option label="每季度重复" value="shanghai"></el-option>
                        <el-option label="每月重复" value="beijing"></el-option>
                        <el-option label="每周重复" value="shanghai"></el-option>
                        <el-option label="每天重复" value="beijing"></el-option>
                    </el-select>
                </div>
                <div class="eventTouchOff">
                    <span>事件触发:</span>
                    <el-select class="mineSelect" v-model="form.region" placeholder="触发条件">
                        <el-option label="销售成功" value="shanghai"></el-option>
                        <el-option label="退货成功" value="beijing"></el-option>
                        <el-option label="换货成功" value="shanghai"></el-option>
                        <el-option label="生日" value="beijing"></el-option>
                        <el-option label="结婚纪念日" value="shanghai"></el-option>
                        <el-option label="圣诞节" value="beijing"></el-option>
                        <el-option label="元旦" value="beijing"></el-option>
                    </el-select>
                    <el-select class="mineSelect"  v-model="form.region" placeholder="触发时间">
                        <el-option label="前" value="shanghai"></el-option>
                        <el-option label="后" value="beijing"></el-option>
                    </el-select>
                    <el-input class="dayNum" v-model="form.name" placeholder="请输入天数"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="发送内容">
                <el-input class="mineTextarea" type="textarea" v-model="form.desc" placeholder="请输入内容"></el-input>
                <el-button class="mineBtn" style="margin-left: 30px;" type="primary">插入字段</el-button>
                <el-button class="mineBtn" style="margin-left: 10px;" type="primary">插入模板</el-button>
                <el-button class="mineBtn" style="margin-left: 10px;" type="primary">选择签名</el-button>
            </el-form-item>
            <el-form-item label="发送人">
                <div class="flex flex-r flex-align-center">
                    <el-select class="mineSelect" v-model="form.region" placeholder="会员级别">
                        <el-option label="普通" value="shanghai"></el-option>
                        <el-option label="中级" value="beijing"></el-option>
                        <el-option label="高级" value="beijing"></el-option>
                    </el-select>
                    <el-select class="mineSelect" v-model="form.region" placeholder="会员类型">
                        <el-option label="共有" value="shanghai"></el-option>
                        <el-option label="私有" value="beijing"></el-option>
                        <el-option label="公共" value="beijing"></el-option>
                    </el-select>
                    <el-select class="mineSelect" v-model="form.region" placeholder="会员负责人">
                        <el-option label="1" value="shanghai"></el-option>
                        <el-option label="2" value="beijing"></el-option>
                        <el-option label="3" value="beijing"></el-option>
                    </el-select>
                    <div class="seachBox flex flex-r flex-align-center">
                        <i v-if="iconSousuo" class="iconfont icon-sousuo"></i>
                        <input type="text" @focus="iconSousuo = false;" @blur="iconSousuo = true" placeholder="姓名/手机号">
                    </div>
                    <el-button class="mineBtn" style="margin-right: 10px;" type="primary">高级搜索</el-button>
                    <el-radio-group v-model="labelPosition" size="small">
                        <el-radio-button label="left">按条件</el-radio-button>
                        <el-radio-button label="right">按人</el-radio-button>
                    </el-radio-group>
                </div>
            </el-form-item>
            <el-form-item>
                <span class="noData" v-if="memberList.length == 0">暂无数据</span>
                <TableBody
                    v-else
                    :headerData="memberListHeader"
                    :showHeader="false"
                    styleClass="el_table_createNote"
                    :tableData="memberList"
                    :operationConfig="operationConfig"
                    :optional="true"
                    ></TableBody>
            </el-form-item>
            <el-form-item>
                <div class="bottom">
                    <el-button class="mineBtn primary"  type="primary" @click="onSubmit">确定</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import TableBody from "../../base/tableBody.vue";
    import { memberListHeader } from "../../config/config.js"
    export default {
        components: {
            TableBody
        },
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                labelPosition:"left", //切换按钮
                iconSousuo:true, //显示搜索icon
                memberListHeader:[], //表头数据
                memberList: [{ //会员列表
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },
                    {
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },
                    {
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },{ //会员列表
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },
                    {
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },
                    {
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },{ //会员列表
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },
                    {
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    },
                    {
                        name: '王微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }, {
                        name: '李微微',
                        phone: '13652548579',
                        img:"https://img04.sogoucdn.com/app/a/100520024/364417139a420a7bd75ebe9cf14d012f",
                    }
                ],
                operationConfig:{ //操作配置
                    operation:false, //是否开启操作
                },
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
        },
        created(){
            this.memberListHeader = memberListHeader;
        }
    }

</script>
<style lang="less" scoped>
    .createMain {
        padding: 20px;
        .title {
            font-size: 16px;
            >i {
                color: #3195F5;
            }
            >span {
                color: #333333;
            }
        }
        .noteFrom {
            margin: 40px 0;
            // 时间触发
            .timeTouchOff{
                margin-top: 20px;
                >span{
                    font-size: 15px;
                    &:first-of-type{
                        color: #999999;
                        margin-right: 15px;
                    }
                    &:nth-of-type(2){
                        color: #333333;
                        margin-right: 22px;
                    }
                    &:nth-of-type(3){
                        color: #9DA4B5;
                        margin-right: 20px;
                    }
                }
            }
            // 事件触发
            .eventTouchOff{
                margin-top: 20px;
                >span{
                    font-size: 15px;
                    color: #999999;
                    margin-right: 15px;
                }
            }
            // 搜索框
            .seachBox{
                width: 190px;
                height: 40px;
                border: 1px #D6D6D6 solid;
                border-radius: 3px;
                font-size: 14px;
                margin-right: 20px;
                box-sizing: border-box;
                overflow: hidden;
                >i{
                    margin-left: 11px;
                }
                >input{
                    margin-left: 9px;
                }
            }
            // 暂无数据
            .noData{
                display: inline-block;
                width: 930px;
                height: 50px;
                background-color: #f4f4f4;
                line-height: 50px;
                font-size: 14px;
                text-align: center;
                color: #999;
            }
            .bottom{
                width: 930px;
                text-align: center;
            }
        }
    }

</style>

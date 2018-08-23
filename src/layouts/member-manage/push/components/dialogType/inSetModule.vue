<!-- 插入模板弹窗 -->
<template>
    <div class="ModuleBox">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <span class="title">插入模板</span>
        <div class="filter flex flex-r flex-pack-end">
            <div class="screach flex flex-r flex-align-center">
                <input type="text" placeholder="请输入模板名称">
                <i class="iconfont icon-sousuo"></i>
            </div>
            <div class="filterSelect flex flex-r">
                <el-select 
                    class="select-w90-h28 select-white select-b1 select-f12-b" 
                    filterable 
                    clearable 
                    v-model="moduleType" 
                    placeholder="创建人"
                    :disabled="MemberPrincipalList.length == 0"
                    @change="changeSelectValue">
                    <el-option v-for="(item,index) in MemberPrincipalList" :key="index" :label="item.nickName" :value="item.ptincipalId">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="moduleList">
            <TableBody 
                v-loading="findTemplateIng"
                :headerData="headerData" 
                :tableData="templateList" 
                :showHeader="true" 
                :isSort="true" 
                :optional="false" 
                :operationConfig="operationConfig"
                :defaultChoose="selectModule"
                styleClass="el_table_moduleList"
                @chooseChange="moduleSelectChange"></TableBody>
        </div>
        <div class="btn">
            <el-button type="primary" @click="insetModule">确定</el-button>
        </div>
    </div>
</template>
<script>
    import {
        findTemplate, //模板列表
        findMemberPrincipalList, //负责人列表
    } from "Api/member.js"
    import TableBody from "../../../base/tableBody.vue"
    import {moduleLsitHeader} from "../../../config/config.js"
    export default {
        props:['data'],
        data(){
            return {
                // 模板类型
                moduleType:"",
                operationConfig: {
                    operation: true,
                    type: "radio",
                    tableValue: 'templateId'
                },
                findTemplateIng:false, //正在查找模板
                selectModule:null, //选择的模板
                requestData:{
                    shopId:this.$route.query.shopId
                }
            }
        },
        components:{
            TableBody
        },
        asyncComputed:{
            headerData:function(){
                return moduleLsitHeader;
            },
            templateList:{ //1.8模板列表
                get(){
                    let {shopId} = this.requestData
                    this.findTemplateIng = true;
                    let res = (async()=>{
                        let res = await findTemplate({shopId})
                        this.findTemplateIng = false
                        if(res.body.msg == 'OK'){
                            return res.body.data.dataList
                        }else{
                            this.$message({
                                type: 'warning',
                                message: res.body.msg
                            });
                            return;
                        }
                    })()
                    return res 
                },
                default(){
                    return []
                }
            },
            MemberPrincipalList:{ //负责人列表
                get(){
                    return (async()=>{
                        let {shopId} = this.requestData;
                        let res = await findMemberPrincipalList({shopId});
                        if(res.body.msg == "OK"){
                            return res.body.data;
                        }else{
                            return [];
                        }
                    })()
                },
                default(){
                    return []
                }
            },
        },
        watch:{
            templateList(val){
                if(val && val.length !=0 && this.data.templateId){
                    let item = val.find((v)=>{
                        return v.templateId == this.data.templateId
                    })
                    this.selectModule = item;
                }
            }
        },
        methods:{
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            // 选择条件变化
            changeSelectValue(value){
                console.log(value)
            },
            // 选择模板变化
            moduleSelectChange(value){
                this.selectModule = value;
            },
            // 插入模板
            insetModule(){
                this.$emit("confirm",false,this.selectModule)
            }
        }
    }

</script>
<style lang="less" scoped>
// 插入模板弹窗内容
.ModuleBox {
    position: relative;
    .close-icon {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 20px;
        right: 30px;
    }
    .title {
        display: inline-block;
        margin-top: 20px;
        margin-left: 30px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
    }
    .filter {
        margin-top: 20px;
        .screach {
            border: 1px #D6D6D6 solid;
            border-radius: 4px;
            overflow: hidden;
            margin-right: 14px;
            height: 28px;
            input {
                width: 188px;
                height: 26px;
                padding-left: 6px;
            }
            i {
                display: inline-block;
                width: 30px;
                height: 28px;
                background-color: #2993F8;
                font-size: 12px;
                text-align: center;
                line-height: 28px;
                color: #fff;
                cursor: pointer;
            }
        }
        .filterSelect {
            height: 28px;
            margin-right: 30px;
        }
    }
    .moduleList {
        margin-top: 10px;
    }
    .btn {
        margin-top: 20px;
        text-align: center;
    }
} 
</style>

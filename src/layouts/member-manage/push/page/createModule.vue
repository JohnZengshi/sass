<template>
    <div class="createMain" v-loading="addTemplateIng || findTemplateDetailsIng || updateSmsTemplateIng">
        <div class="title">
            <i class="iconfont icon-liebiao"></i>
            <span>{{$route.query.title}}</span>
        </div>
        <div class="flex-r flex">
            <el-form class="el_form_02 moduleFrom" ref="mainForm" :rules="mainRules" :model="mainForm" label-width="136px">
                <el-form-item label="模板类型" prop="moduleType">
                    <el-select 
                        class="select-w318-h38 select-white select-b1" 
                        filterable 
                        clearable 
                        v-model="mainForm.moduleType" 
                        placeholder="请选择"
                        v-loading="TemplateTypeList ? false : true">
                        <el-option 
                            v-if="TemplateTypeList" 
                            v-for="item in TemplateTypeList"  
                            :label="item.templateTypeName" 
                            :value="item.templateTypeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模板名称" prop="moduleName">
                    <el-input class="input-w318-h38 input-white input-b1" v-model="mainForm.moduleName" placeholder="最多可输入6个字符"></el-input>
                </el-form-item>
                <el-form-item label="发送内容" prop="moduleContent">
                    <mineTextarea 
                        ref="mineTextarea"
                        :text="insetWord"
                        @contentChange="contentChange"
                        > </mineTextarea>
                    <filterBox 
                        itemName="templateTypeName"
                        childrenItemName="fiendList"
                        :filterTab="filterTab" 
                        :filterData="FieldList"
                        @switchTab="switchTab" 
                        @clickChildrenItem="clickChildrenItem"
                        ></filterBox>
                </el-form-item>
            </el-form>
            <iphone class="iphonePic" :content="mainForm.moduleContent"></iphone>
        </div>
        <div class="bottom">
            <el-button class="btn-w120-h28 btn-f12 primary"  type="primary" @click="submitForm">保存</el-button>
        </div>
    </div>
</template>
<script>
    import {
        findFieldList,//插入字段列表
        addTemplate, //添加模板
        findSmsTemplateTypeList, //请求模板类型列表
        findTemplateDetails, //模板详情
        updateSmsTemplate //编辑模板
    } from "Api/member.js"; 
    import mineTextarea  from "../components/mineTextarea";
    import filterBox from "../components/filterBox.vue";
    import iphone from "../components/iphone.vue";
    export default {
        data(){
            return {
                mainForm:{
                    moduleType:"",
                    moduleName:"",
                    moduleContent:""
                },
                mainRules: {
                    moduleType: [{
                        required: true,
                        message: "请选择模板类型",
                        trigger: "change",
                    }],
                    moduleName: [{
                            required: true,
                            message: '请输入模板名称',
                            trigger: 'blur'
                        },
                        {
                            min: 0,
                            max: 6,
                            message: '最多可以输入六个字符',
                            trigger: 'blur'
                        }
                    ]
                },
                filterTab:["插入替换字段"],
                addTemplateIng:false, //正在添加模板
                findTemplateDetailsIng:false, //正在读取模板详情
                updateSmsTemplateIng: false, //正在编辑模板
                insetWord:"", //模板详情插入到文本
            }
        },
        components:{
            mineTextarea,
            filterBox,
            iphone
        },
        methods:{
            mineTextareaInput(){},
            switchTab(){},
            // 点击要插入的字段
            clickChildrenItem(item){
                // console.log(item.fieidName)
                this.$refs["mineTextarea"].addWord(item.fieidName)
            },
            // 确定按钮
            submitForm(formName) {
                let mainVer = this.formVerify('mainForm');
                if (mainVer) {
                    if (this.createdOrUpdata == "CREATED") { //新增模板
                        this.addTemplateIng = true;
                        (async () => {
                            let msg = await this.addTemplate();
                            if (msg == 'OK') {
                                this.$message({
                                    message: '新建成功',
                                    type: 'success',
                                    onClose:()=>{
                                        this.addTemplateIng = false;
                                        this.$router.back(-1)
                                    }
                                });
                                
                            } else {
                                this.$message({
                                    message: msg,
                                    type: 'warning',
                                    onClose:()=>{
                                        this.addTemplateIng = false;
                                        this.$router.back(-1)
                                    }
                                });
                            }
                        })()
                    } else if (this.createdOrUpdata == "UPDATA") { //编辑模板
                        this.updateSmsTemplateIng = true;
                        (async()=>{
                            let msg = await this.updateSmsTemplate();
                            if (msg == 'OK') {
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success',
                                    onClose:()=>{
                                        this.updateSmsTemplateIng = false;
                                        this.$router.back(-1)
                                    }
                                });
                                
                            } else {
                                this.$message({
                                    message: msg,
                                    type: 'warning',
                                    onClose:()=>{
                                        this.updateSmsTemplateIng = false;
                                        this.$router.back(-1)
                                    }
                                });
                            }
                        })()
                    }
                }
            },
            // 表单验证
            formVerify(formName){
                let res;
                this.$refs[formName].validate((valid)=>{
                    res = valid
                })
                return res;
            },
            // 添加模板接口
            addTemplate(){
                let {
                    shopId,
                    templateTypeId,
                    name,
                    content
                } = this.requestData;
                return (async () => {
                    let res = await addTemplate({
                        shopId,
                        templateTypeId,
                        name,
                        content
                    });
                    return res.body.msg;
                })()
            },
            // 编辑模板接口
            updateSmsTemplate() {
                let {
                    templateId,
                    templateTypeId,
                    name,
                    content,
                } = this.requestData;
                return (async () => {
                    let res = await updateSmsTemplate({
                        templateId,
                        templateTypeId,
                        name,
                        content,
                    });
                    return res.body.msg;
                })()
            },
            // 文本域输入变化
            contentChange(val){
                this.mainForm.moduleContent = val;
            },
        },
        asyncComputed:{
            requestData: {
                get() {
                        return {
                            shopId: this.$route.query.shopId, //店铺Id
                            templateTypeId: this.mainForm.moduleType, //类型Id
                            name: this.mainForm.moduleName, //模板名称
                            content: this.mainForm.moduleContent, //模板内容
                            templateId: this.$route.query.templateId //模板ID
                        }
                    },
                    default () {
                        return {}
                    }
            },
            FieldList: { //插入字段列表
                lazy: true,
                get() {
                    return (async() => {
                        let shopId = this.$route.query.shopId
                        let res = await findFieldList({
                            shopId
                        });
                        console.log(res.body.data)
                        return res.body.data
                    })()
                },
                default () {
                    return []
                }

            },
            TemplateTypeList: { //模板类型列表
                lazy: true,
                get() {
                    return (async () => {
                        let shopId = this.$route.query.shopId
                        let res = await findSmsTemplateTypeList({
                            shopId
                        });
                        if(res.body.msg == "OK"){

                        }
                        console.log(res)
                        return res.body.data
                    })()
                },
                default(){
                    return false
                }
            },
            TemplateDetails:{ //模板详情
                get(){
                    if(this.$route.query.templateId){
                        return(async () => {
                            let templateId = this.$route.query.templateId
                            this.findTemplateDetailsIng = true;
                            let res = await findTemplateDetails({
                                templateId
                            });
                            if (res.body.msg == "OK") {
                                this.findTemplateDetailsIng = false;
                                return res.body.data;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg,
                                    onClose:()=>{
                                        this.findTemplateDetailsIng = false;
                                        this.$router.back(-1);
                                    }
                                });
                            }
                        })()
                    }
                },
                default(){
                    return null
                }
            },
            createdOrUpdata:{ //编辑模式或新增模式
                get(){
                    if(this.$route.query.templateId){
                        return "UPDATA"
                    }else{
                        return "CREATED"
                    }
                }
            }
        },
        watch:{
            "TemplateDetails"(val){
                if(val){
                    this.$set(this.mainForm,"moduleType",val.templateType[0].templateTypeId)
                    this.$set(this.mainForm,"moduleContent",val.content)
                    this.$set(this.mainForm,"moduleName",val.templateName)
                    this.insetWord = val.content;
                }
            }
        }
    }

</script>
<style lang="less" scoped>
.createMain {
    padding: 20px;
    position: relative;
    .title {
        font-size: 16px;
        >i {
            color: #3195F5;
        }
        >span {
            color: #333333;
        }
    }
    .moduleFrom {
        width: 637px;
        margin-top: 40px;
        margin-right: 84px;
    }
    .iphonePic{
    }
    .bottom {
        width: 100%;
        text-align: center;
        .primary {
        }
    }
}

</style>

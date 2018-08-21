<template>
    <div>
        <div class="header flex flex-r flex-pack-justify flex-align-center">
            <div class="title flex flex-r flex-align-center">
                <i class="iconfont icon-liebiao"></i>
                <span class="titleName">管理模板：</span>
                <span v-if="moduleList" class="count">{{moduleList.length}}</span>
            </div>
            <div class="option">
                <el-select class="select-w90-h28 select-white select-b1 select-f12-b mr-10" filterable clearable v-model="requestData.templateTypeId" placeholder="选择类型" @change="changeSelectValue">
                    <el-option v-for="(item,index) in TemplateTypeList" :key="index" :label="item.templateTypeName" :value="item.templateTypeId">
                    </el-option>
                </el-select>
                <router-link :to="{path:'/memberManage/push/createModule',query: {title: '新增短信模板',shopId:requestData.shopId}}">
                    <el-button class="btn-w90-h28 btn-f12 mr-16" type="primary">+模板</el-button>
                </router-link>
            </div>
        </div>
        <div class="table">
            <TableBody 
                v-loading="findTemplateIng"
                :headerData="headerData" 
                :tableData="moduleList"
                :showHeader="true"
                :operationConfig="operationConfig"
                @operationBack="operationBack"
                @scorllToBottom="loadMoreOrder"
                styleClass="el_table_moduleManage"></TableBody>
        </div>
        <Dialog
            :dialogType="dialog.dialogType"
            :isShowDialog="dialog.isShowDialog"
            :modal="dialog.modal"
            :tipMsg="dialog.tipMsg"
            @cancel="cancel"
            @confirm="confirm">
        </Dialog>
    </div>
</template>
<script>
    import {
        findTemplateList, //模板列表
        deleteSmsTemplate, //删除模板
        findSmsTemplateTypeList, //模板类型列表
    } from "Api/member";
    import {moduleListHeader} from "../../config/config.js";
    import TableBody from '../../base/tableBody';
    import Dialog from '../../base/dialog.vue';
    export default {
        data(){
            return{
                moduleList:[], //模板列表
                operationConfig:{
                    operation:true,
                    tableValue:'operationList', //每条数据对应的操作icon字段
                    type:"icon", //icon类型
                },
                currentOperationNote:null,
                dialog:{ //弹窗
                    isShowDialog:false, //是否显示弹窗
                    dialogType:"", //弹窗类型
                    modal:true, //是否开启模态
                    tipMsg:"" //提示语
                },
                requestData:{
                    shopId: this.$route.query.shopId,
                    templateTypeId:"",  //模板类型
                    page:"1", //页
                    pageSize:"100", //条数
                    templateId:"" //单条模板id
                },
                findTemplateIng:false, //正在获取模板列表
                findSmsTemplateTypeListIng:false, //正在获取模板类型列表
                upData:true  //刷新数据
            }
        },
        components:{
            TableBody,
            Dialog
        },
        asyncComputed:{
            headerData:{ //表格头部数据
                get(){
                    return moduleListHeader
                },
                default(){ 
                    return [];
                }
            },
            TemplateList:{ //请求模板列表
                get(){
                    if (this.upData) {
                        let {
                            shopId,
                            templateTypeId,
                            page,
                            pageSize
                        } = this.requestData;
                        this.findTemplateIng = true;
                        this.upData = false;
                        return (async () => {
                            let res = await findTemplateList({
                                shopId,
                                templateTypeId,
                                page,
                                pageSize
                            });
                            console.log(res);
                            if (res.body.msg == 'OK') {
                                this.findTemplateIng = false;
                                let arr = res.body.data.dataList;
                                arr = this.operationInit(arr) //初始化按钮操作
                                return arr
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg
                                });
                            }
                        })()
                    }
                },
                default(){
                    return []
                }
            },
            TemplateTypeList: { //模板类型列表
                lazy: true,
                get() {
                    return (async () => {
                        let shopId = this.$route.query.shopId
                        this.findSmsTemplateTypeListIng = true;
                        let res = await findSmsTemplateTypeList({
                            shopId
                        });
                        if (res.body.msg == 'OK') {
                            this.findSmsTemplateTypeListIng = false;
                            return res.body.data
                        } else {
                            this.findSmsTemplateTypeListIng = false;
                            this.$message({
                                type: 'warning',
                                message: res.body.msg
                            });
                            return;
                        }
                    })()
                },
                default(){
                    return false
                }
            },
        },
        watch:{
            "TemplateList"(val){
                if(val && val.length !=0){
                    this.moduleList = this.moduleList.concat(val);
                }
            }
        },
        created(){
        },
        methods:{
            // 选项选中时触发
            changeSelectValue(){
                this.moduleList = [];
                this.upData = true
            },
            // 操作按钮
            operationBack(icon,item) {
                console.log(icon,item)
                let index = item.$index;
                let way = icon.slice(icon.indexOf("-")+1)
                let templateId = item.row.templateId;
                if (way == 'lajitong') {
                    this.dialog.tipMsg = "是否删除该模板？"
                }else if(way == 'bianji'){
                    this.$router.push({
                        path:"/memberManage/push/createModule",
                        query:{
                            title:'编辑短信模板',
                            shopId:this.requestData.shopId,
                            templateId:templateId
                        }
                    })
                    return;
                }
                this.dialog.dialogType = "Tip"
                this.dialog.isShowDialog = true;
                this.dialog.modal = false;
                this.currentOperationNote = {
                    way,
                    index,
                    templateId
                };
                console.log(this.currentOperationNote);
            },
            // 初始化按钮操作
            operationInit(val){
                val.forEach((v)=>{
                    v.operationList = ["icon-bianji","icon-lajitong"]
                })
                return val
            },
            // 弹窗取消
            cancel(){
                this.dialog.dialogType = ""
                this.dialog.isShowDialog = false;
            },
            // 弹窗确定
            confirm(val){
                this.dialog.dialogType = ""
                this.dialog.isShowDialog = val
                let {way,index,templateId} = this.currentOperationNote;
                if(way == 'lajitong'){
                    this.requestData.templateId = templateId;
                    (async()=>{
                       let res =await this.deleteSmsTemplate();
                        if(res){
                            this.moduleList.splice(index,1);
                        }
                    })()
                }
            },
            // 删除模板
            deleteSmsTemplate(){
                return (async()=>{
                    let {templateId} = this.requestData;
                    let res = await deleteSmsTemplate({templateId});
                    console.log(res)
                    if(res.body.msg == 'OK'){
                        return true;
                        // this.upData = true;
                    }else{
                        this.$message({
                            type: 'warning',
                            message: res.body.msg
                        });
                        return false;
                    }
                })()
            },
            // 下拉加载更多数据
            loadMoreOrder(){
                if(!this.findTemplateIng){
                    console.log(this.TemplateList);
                    if(this.TemplateList.length != 0){ //请求回来有数据
                        let page = (this.requestData.page - 0);
                        page+=1;
                        this.requestData.page = page+""
                        console.log("页数:"+ page)
                        this.upData = true;
                    }
                    else{ //请求回来没有数据
                        this.$message({
                            type: 'warning',
                            message: "没有更多数据了",
                        });
                    }
                }
            }
        }
    }

</script>
<style lang="less" scoped>
    .header{
        height: 49px;
        border: 1px #DDDDDD solid;
        border-bottom: none;
        >.title{
            i{
                margin-left: 16px;
                font-size: 12px;
                color:#2993F8;
            }
            span{
                &:first-of-type{
                    font-size: 16px;
                    color: #333;
                    margin-left: 14px;
                }
                &:last-of-type{
                    font-size: 13px;
                    color: #2993F8;
                }
            }
        }
    }

</style>

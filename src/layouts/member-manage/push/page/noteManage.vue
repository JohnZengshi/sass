<template>
    <div class="noteMain flex-v">
        <div>
            <Tab :list="list" class="noteTab" @switchTab="switchTab"></Tab>
            <div class="createNew">
                <router-link :to="{path: '/memberManage/push/createNote',query: {title: '新增短信',shopId:$route.query.shopId}}">
                    <el-button type="primary">新建短信</el-button>
                </router-link>
            </div>
            <div class="select flex flex-r">
                <div>
                    <el-select 
                        class="select-w88-h26 select-white select-b1 select-f12-b" 
                        filterable 
                        clearable 
                        v-model="requestData.templateTypeId" 
                        placeholder="短信类型" 
                        :disabled="TemplateTypeList.length == 0"
                        @change="changeSelectValue">
                        <el-option v-for="(item,index) in TemplateTypeList" :key="index" :label="item.templateTypeName" :value="item.templateTypeId">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-select 
                        class="select-w88-h26 select-white select-b1 select-f12-b" 
                        filterable 
                        clearable 
                        v-model="requestData.userId" 
                        placeholder="创建人" 
                        :disabled="MemberPrincipalList.length == 0"
                        @change="changeSelectValue">
                        <el-option v-for="(item,index) in MemberPrincipalList" :key="index" :label="item.nickName" :value="item.ptincipalId">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-select 
                        class="select-w88-h26 select-white select-b1 select-f12-b" 
                        filterable 
                        clearable 
                        v-model="requestData.status" 
                        placeholder="模板状态" 
                        @change="changeSelectValue">
                        <el-option v-for="(item,index) in moduleStatus" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <xjTime class="xj_time" @change="changeTime"></xjTime>
                </div>
            </div>
        </div>
        <div class="table">
            <TableBody 
                v-loading="getListsIng"
                :headerData="headerData" 
                :tabTitle="tabTitle"
                :tableData="noteList"
                :showHeader="true"
                :isSort="isSort"
                :operationConfig="operationConfig"
                :isRowClick="isRowClick"
                @operationBack="operationBack"
                @rowClick="rowClick"
                @scorllToBottom="loadMoreOrder"
                styleClass="el_table_noteManage"></TableBody>
        </div>
        <Dialog
            :vLoading="updateStatusIng"
            :dialogType="dialog.dialogType"
			:isShowDialog="dialog.isShowDialog"
            :tipMsg="dialog.tipMsg"
            :modal="dialog.modal"
            :data="currentOperationNote"
			@cancel="cancel"
            @confirm="confirm">
		</Dialog>
    </div>
</template>
<script>
    import {
        findSmsTemoplateList, //即时短信
        findSmsTriggerLists, //触发短信
        findSmsTemoplateLogList, //短信日志
        updateTemplateStatus, //修改短信状态
        deleteSmsTemplate,  //删除短信与模板
        findSmsTemoplateLog, //单条短信日志
        findSmsTemplateTypeList, //模板类型
        findMemberPrincipalList //负责人
    } from "Api/member";
    import Tab from "../components/tab.vue";
    import TableBody from "../../base/tableBody.vue";
    import Dialog from "../../base/dialog.vue";
    import xjTime from "base/time/xj-time";
    import {
        noteManageHeader01,
        noteManageHeader02,
        noteManageHeader03
    } from "../../config/config.js";
    import {copyArr} from "Api/commonality/filter";
    import {GetNYR,GetSF} from "assets/js/getTime.js";
    export default {
        data() {
            return {
                list: [{
                    tabName: "即时短信",
                    id: 0,
                }, {
                    tabName: "触发短信",
                    id: 1,
                }, {
                    tabName: "短信日志",
                    id: 2,
                }],
                moduleStatus: [{
                    value: '1',
                    label: '启用'
                }, {
                    value: '2',
                    label: '禁用'
                }],
                noteList:[],
                tabTitle:"即时短信",
                isSort:true,//是否开启排序
                isRowClick:true,//开启点击单行触发回调
                dialog:{
                    dialogType:"Tip",//弹窗类型
                    isShowDialog:false, //弹窗
                    tipMsg:"", //弹窗提示语
                    modal:true,//是否开启模态框
                },
                currentOperationNote:null ,//当前操作的短信,
                requestData: { //Api请求的参数
                    templateTypeId: "", //短信类型
                    userId: "", //创建人
                    status: "", //模板状态 1：启用 2：禁用
                    shopId: this.$route.query.shopId,
                    page: "1",
                    pageSize: "100",
                    beginTime: "",
                    endTime: "",
                    templateId:"", //短信id
                    oneStatus:"" //单条模板的状态 1：启用 2：禁用
                },
                upData:false, //是否更新数据
                getListsIng:false, //正在获取，更新数据
                updateStatusIng:false, //正在启用，禁用
            }
        },
        components: {
            Tab,//头部切换Tab
            TableBody,//表格组件
            Dialog,//弹窗组件
            xjTime,//时间选择器
        },
        asyncComputed:{
            requestList:{ //请求回来的数据列表（统一字段）
                get(){
                    if (this.tabTitle == "即时短信") {
                        return this.SmsTemoplateList;
                    } else if (this.tabTitle == "触发短信") {
                        return this.SmsTriggerLists;
                    } else if (this.tabTitle == "短信日志") {
                        return this.SmsTemoplateLog;
                    }else{
                        return []
                    }
                },
                default(){
                    return []
                }
            },
            SmsTemoplateList:{ //即时短信
                get(){
                    if (this.upData && this.tabTitle == "即时短信") {
                        this.getListsIng = true;
                        this.upData = false;
                        let {   
                            templateTypeId,
                            userId,
                            status,
                            shopId,
                            page,
                            pageSize,
                            beginTime,
                            endTime
                        } = this.requestData;
                        return (async () => {
                            let res = await findSmsTemoplateList({
                                templateTypeId,
                                userId,
                                status,
                                shopId,
                                page,
                                pageSize,
                                beginTime,
                                endTime
                            });
                            if (res.body.msg == 'OK') {
                                let arr = res.body.data;
                                arr = this.operationInit(arr)
                                // console.log(res.body.data)
                                this.getListsIng = false;
                                return arr
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg,
                                    onClose:()=>{
                                        this.getListsIng = false;
                                    }
                                });
                                return [];
                            }
                        })()
                    }
                },
                default(){
                    return []
                }
            },
            SmsTriggerLists:{ //触发短信列表
                get(){
                    if (this.upData && this.tabTitle == "触发短信") {
                        this.getListsIng = true;
                        this.upData = false;
                        return (async () => {
                            let {
                                templateTypeId,
                                userId,
                                status,
                                shopId,
                                page,
                                pageSize,
                                beginTime,
                                endTime
                            } = this.requestData;
                            let res = await findSmsTriggerLists({
                                templateTypeId,
                                userId,
                                status,
                                shopId,
                                page,
                                pageSize,
                                beginTime,
                                endTime
                            });
                            console.log(res)
                            if (res.body.msg == 'OK') {
                                this.getListsIng = false;
                                let arr = res.body.data;
                                arr = this.operationInit(arr)
                                console.log(res.body.data)
                                return arr
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg,
                                    onClose:()=>{
                                        this.getListsIng = false;
                                    }
                                });
                                return [];
                            }
                        })()
                    }
                },
                default(){
                    return [];
                }
            },
            SmsTemoplateLog:{ //短信日志
                get(){
                    if (this.upData && this.tabTitle == "短信日志") {
                        this.getListsIng = true;
                        this.upData = false;
                        let {templateTypeId,userId,status,shopId,page,pageSize,beginTime,endTime} = this.requestData;
                        return (async()=>{
                            let res = await findSmsTemoplateLogList({templateTypeId,userId,status,shopId,page,pageSize,beginTime,endTime})
                            console.log(res)
                            if(res.body.msg == "OK"){
                                this.getListsIng = false;
                                return res.body.data;
                            }
                            else{
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg,
                                    onClose:()=>{
                                        this.getListsIng = false;
                                    }
                                });
                                return [];
                            }
                        })();
                    }
                },
                default(){
                    return [];
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
                        console.log(res)
                        if(res.body.msg == "OK"){
                            return res.body.data;
                        }else{
                            return []
                        }
                    })()
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
                    return [];
                }
            },
            headerData:{ //表格头部数据
                get(){
                    if(this.tabTitle == "即时短信"){
                        return noteManageHeader01;
                    }else if(this.tabTitle == "触发短信"){
                        return noteManageHeader02
                    }else if(this.tabTitle == "短信日志"){
                        return noteManageHeader03
                    }
                },
                default(){
                    return noteManageHeader01;
                }
            },
            operationConfig:{ //操作配置
                get(){
                    if(this.tabTitle == "即时短信"){
                        return { //操作配置
                            operation: true, //是否开启操作
                            tableValue: 'operationList', //每条数据对应的操作icon字段
                            type: "icon",
                        }
                    }else if(this.tabTitle == "触发短信"){
                        return { //操作配置
                            operation: true, //是否开启操作
                            tableValue: 'operationList', //每条数据对应的操作icon字段
                            type: "icon",
                        }
                    }else if(this.tabTitle == "短信日志"){
                        return { //操作配置
                            operation: false, //是否开启操作
                            tableValue: 'operationList', //每条数据对应的操作icon字段
                            type: "icon",
                        }
                    }
                },
                default(){
                    return { //操作配置
                        operation: true, //是否开启操作
                        tableValue: 'operationList', //每条数据对应的操作icon字段
                        type: "icon",
                    }
                }
            }
        },
        watch:{
            "requestList"(val){ //请求回来的数据
                if(val && val.length != 0){
                    let arr = copyArr(val);
                    this.noteList = this.noteList.concat(arr); //加载更多数据
                }
            }
        },
        methods: {
            // 切换头部tab
            switchTab(item) {
                // console.log(item)
                if(item.id == 0){
                    this.operationList = ["icon-bianji","icon-lajitong"]
                    this.isRowClick = true;
                    this.isSort = true;
                }else if(item.id == 1){
                    this.operationList = ["icon-bianji","icon-lajitong"]
                    this.isRowClick = true;
                    this.isSort = true;
                }else if(item.id == 2){
                    this.isSort = false;
                    this.isRowClick = false;
                }
                this.noteList = [];
                this.requestData.page = "1"
                this.tabTitle = item.tabName;
                this.upData = true;
            },
            // 初始化操作按钮
            operationInit(arr){
                arr.forEach((val)=>{
                    if(this.tabTitle == '触发短信'){
                        if(val.status == "启用"){
                            val.operationList = ["icon-jinzhi","icon-bianji","icon-lajitong"];
                        }
                        else if(val.status == "禁用"){
                            val.operationList = ["icon-qidong","icon-bianji","icon-lajitong"]
                        }
                    }
                    else if(this.tabTitle == '即时短信'){
                        val.operationList = ["icon-bianji","icon-lajitong"];
                    }
                })
                return arr;
            },
            // 操作按钮
            operationBack(item,scope){
                console.log(scope)
                let way = item.slice(item.indexOf("-")+1);
                let index = scope.$index;
                let templateId = scope.row.templateId;
                if(way == 'jinzhi'){
                    this.dialog.tipMsg = "是否禁用该模板？";
                }else if(way == 'qidong'){
                    this.dialog.tipMsg = "是否启动该模板？"
                }else if(way == 'lajitong'){
                    this.dialog.tipMsg = "是否删除该模板？"
                }else if(way == 'bianji'){
                    this.$router.push({
                        path:"/memberManage/push/createNote",
                        query:{
                            title:'编辑短信模板',
                            shopId:this.requestData.shopId,
                            templateId:templateId,
                            type:this.tabTitle,
                        }
                    })
                    return
                }
                this.dialog.dialogType = "Tip"
                this.dialog.isShowDialog = true;
                this.dialog.modal = false;
                this.currentOperationNote = {
                    way,
                    index,
                    templateId
                };
                
            },
            // 点击单条短信
            rowClick(val){
                this.dialog.dialogType = "Notelog"
                this.dialog.isShowDialog = true;
                this.dialog.modal = true;
                console.log(val)
                // let templateId = val.templateId;
                this.currentOperationNote = val
            },
            // 弹窗确定按钮
            confirm(val){
                let {way,index,templateId} = this.currentOperationNote;
                if(way == 'jinzhi'){
                    // this.noteList = [];
                    this.$set(this.noteList[index],'isDisable',false)
                    this.$set(this.noteList[index],'operationList',["icon-qidong","icon-bianji","icon-lajitong"])
                    this.$set(this.noteList[index],'status',"禁用")
                    this.requestData.oneStatus = "2"; //1：启用 2：禁用
                    this.requestData.templateId = templateId;
                    let res = (async()=>{
                        let res =await this.updateTemplateStatus();
                        return res
                    })();
                    if(res){
                        this.dialog.dialogType = ""
                        this.dialog.isShowDialog = val
                        
                    }
                }else if(way == 'qidong'){
                    // this.noteList = [];
                    this.$set(this.noteList[index],'isDisable',true)
                    this.$set(this.noteList[index],'operationList',["icon-jinzhi","icon-bianji","icon-lajitong"])
                    this.$set(this.noteList[index],'status',"启用")
                    this.requestData.oneStatus = "1"; //1：启用 2：禁用
                    this.requestData.templateId = templateId;
                    let res = (async()=>{
                        let res =await this.updateTemplateStatus();
                        return res
                    })();
                    if(res){
                        this.dialog.dialogType = ""
                        this.dialog.isShowDialog = val
                    }
                }else if(way == 'lajitong'){
                    this.requestData.templateId = templateId;
                    (async () => {
                        let res = await this.deleteSmsTemplate();
                        if (res) {
                            this.dialog.dialogType = ""
                            this.dialog.isShowDialog = val
                            this.noteList.splice(index, 1)
                        }
                    })();
                }
                // this.noteList = [];
                // this.upData = true;
            },
            // 弹窗关闭取消按钮
            cancel(val){
                this.dialog.dialogType = ""
                this.dialog.isShowDialog = val
            },
            // 选项选中时触发
            changeSelectValue(val){
                console.log(val);
                this.noteList = [];
                this.upData = true;
            },
            // 时间选项选中时触发
            changeTime(val){
                this.noteList = [];
                this.requestData.beginTime = `${GetNYR(val.beginTime)}${" "}${GetSF(val.beginTime)}`;
                this.requestData.endTime = `${GetNYR(val.endTime)}${" "}${GetSF(val.endTime)}`;
                this.requestData.page = "1";
                this.upData = true;
            },
            // 修改短信状态
            updateTemplateStatus(){
                let {oneStatus,templateId} = this.requestData;
                return (async()=>{
                    this.updateStatusIng = true;
                    let res =await updateTemplateStatus({status:oneStatus,templateId});
                    console.log(res)
                    if(res.body.msg == "OK"){
                        this.updateStatusIng = false;
                        return true
                    }else{
                        this.$message({
                            type: 'warning',
                            message: res.body.msg,
                            onClose: () => {
                                this.updateStatusIng = false;
                            }
                        });
                        return false
                    }
                })()  
            },
            // 3.8删除短信与模板
            deleteSmsTemplate(){
                let {templateId} = this.requestData;
                ;return (async()=>{
                    this.updateStatusIng = true;
                    let res =await deleteSmsTemplate({templateId});
                    console.log(res);
                    if(res.body.msg == "OK"){
                        this.updateStatusIng = false;
                        return true;
                    }
                    else{
                        this.$message({
                            type: 'warning',
                            message: res.body.msg,
                            onClose: () => {
                                this.updateStatusIng = false;
                            }
                        });
                        return false
                    }
                })()
            },
            // 下拉加载更多
            loadMoreOrder(){
                if(!this.getListsIng){ //正在获取数据，不要操作
                    console.log(this.requestList);
                    if(this.requestList.length != 0){ //请求回来有数据
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
        },
        created() {}
    }

</script>
<style lang="less" scoped>
    .noteMain {
        overflow: hidden;
        position: relative;
        .noteTab {
            margin-top: 17px;
            margin-left: 16px;
            display: inline-block;
        }
        .select {
            // display: inline-block;
            margin-top: 21px;
            float: right;
            .selectBox {
                float: left;
                cursor: pointer;
            }
            >div{
                margin-right: 10px;
                &:last-of-type{
                    margin-right: 0;
                }
            }
        }
        .createNew {
            float: right;
            display: inline-block;
            margin: 0 20px;
            margin-top: 21px;
            button {
                width: 90px;
                height: 28px;
                padding: 0;
                text-align: center;
                font-size: 12px;
                line-height: 28px;
            }
        }
        .table {
            // position: absolute;
            // top: 68px;
            margin-top: 18px;
            >div{
                margin-top: 0 !important;
            }
        }
    }

</style>

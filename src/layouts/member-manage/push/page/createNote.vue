<template>
    <div class="createMain" v-loading="addSmsIng || findDetailsIng">
        <div class="title">
            <i class="iconfont icon-liebiao"></i>
            <span>编辑短信发送</span>
        </div>
        <div class="flex flex-r">
            <el-form class="el_form_01 noteFrom" ref="mainForm" :rules="mainRules" :model="mainForm" label-width="140px">
                <el-form-item label="短信名称" prop="noteName">
                    <el-input class="input-w498-h38 input-white input-b1" v-model="mainForm.noteName" placeholder="最多可输入6个字符"></el-input>
                </el-form-item>
                <el-form-item label="发送方式" prop="sendWay">
                    <el-radio-group class="flex flex-r" v-model="mainForm.sendWay">
                        <el-radio class="square el-radio-f14-b flex flex-r flex-align-center" label="即时发送"></el-radio>
                        <el-radio class="square el-radio-f14-b flex flex-r flex-align-center" label="触发条件"></el-radio>
                    </el-radio-group>
                    <!-- 触发条件 -->
                    <el-radio-group class="touchOffBox" v-model="mainForm.touchOff" v-show="mainForm.sendWay == '触发条件'">
                        <!-- 时间触发 -->
                        <div class="timeTouchOff flex flex-r">
                            <el-radio class="square el-radio-f14-b flex flex-r flex-align-center" label="时间触发" value="时间触发">时间触发：</el-radio>
                            <el-form class="flex flex-r" ref="timeTouchOffFrom" :model="timeTouchOffFrom" :rules="timeTouchOffRules">
                                <el-form-item prop="eventName">
                                    <el-select filterable clearable class="select-w118-h38 select-white select-b1 mr-11" :disabled="mainForm.touchOff != '时间触发'"
                                        v-model="timeTouchOffFrom.eventName" title="选择年月日">
                                        <el-option label="年" value="年"></el-option>
                                        <el-option label="月" value="月"></el-option>
                                        <el-option label="周" value="周"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="eventCycle" v-if="timeTouchOffFrom.eventName != '周'">
                                    <el-date-picker class="input-w248-h38 input-white input-b1 mr-11" v-model="timeTouchOffFrom.eventCycle" :format="timeTouchOffFrom.eventName == '年'?'MM月dd日':'dd日'"
                                        :disabled="mainForm.touchOff != '时间触发'" placeholder="选择日期时间" type="date" title="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item prop="timeTouchWeek" v-if="timeTouchOffFrom.eventName == '周'">
                                    <el-select filterable clearable class="select-w248-h38 select-white select-b1 mr-11" :disabled="mainForm.touchOff != '时间触发'"
                                        v-model="timeTouchOffFrom.timeTouchWeek" title="选择星期">
                                        <el-option label="周一" value="周一"></el-option>
                                        <el-option label="周二" value="周二"></el-option>
                                        <el-option label="周三" value="周三"></el-option>
                                        <el-option label="周四" value="周四"></el-option>
                                        <el-option label="周五" value="周五"></el-option>
                                        <el-option label="周六" value="周六"></el-option>
                                        <el-option label="周日" value="周日"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <!-- 事件触发 -->
                        <div class="eventTouchOff flex flex-r">
                            <el-radio class="square el-radio-f14-b flex flex-r flex-align-center" label="事件触发" value="事件触发">事件触发：</el-radio>
                            <el-form class="flex flex-r" ref="eventTouchOffFrom" :model="eventTouchOffFrom" :rules="eventTouchOffRules">
                                <!-- 触发条件 -->
                                <el-form-item prop="touchOffCondition">
                                    <el-select filterable clearable v-loading="touchOffConditionList.length !=0?false:true" :disabled="mainForm.touchOff != '事件触发'"
                                        class="select-w118-h38 select-white select-b1 mr-11" v-model="eventTouchOffFrom.touchOffCondition" placeholder="触发条件"
                                        title="触发条件">
                                        <el-option v-for="item in touchOffConditionList" :label="item.signName" :value="item.signId"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 触发时间 -->
                                <el-form-item prop="touchOffTime">
                                    <el-select filterable clearable :disabled="mainForm.touchOff != '事件触发'" class="select-w118-h38 select-white select-b1 mr-11"
                                        v-model="eventTouchOffFrom.touchOffTime" placeholder="触发时间" title="触发时间">
                                        <el-option v-for="item in touchOffTimeList" :label="item.touchOffTimeName" :value="item.touchOffTimeLable"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 输入天数 -->
                                <el-form-item prop="days">
                                    <el-input :disabled="mainForm.touchOff != '事件触发'" class="input-w118-h38 input-white input-b1" v-model="eventTouchOffFrom.days"
                                        placeholder="请输入天数" title="请输入天数"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发送内容" prop="sendContent">
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
                <el-form-item label="发送人" prop="sendPreson">
                    <div class="sendPreson">
                        <el-input class="input-w498-h38 input-white input-b1" :disabled="true" v-model="mainForm.sendPreson" placeholder="选择发送人"></el-input>
                        <div class="selectPreson flex flex-r flex-align-center" @click="openSendPresonList">
                            <span class="count">共{{mainForm.sendPresonCount}}个</span>
                            <i class="iconfont icon-lianxiren"></i>
                        </div>
                    </div>
                    <Dialog 
                        :dialogType="dialog.dialogType" 
                        :isShowDialog="dialog.isShowDialog" 
                        :modal="dialog.modal"
                        :data="dialogData" 
                        @cancel="cancel" 
                        @confirm="confirm">
                    </Dialog>
                </el-form-item>
            </el-form>
            <iphone class="iphonePic" :content="mainForm.sendContent"></iphone>
        </div>
        <div class="bottom">
            <el-button class="btn-w120-h28 btn-f12 primary"  type="primary" @click="submitForm">确定</el-button>
        </div>
    </div>
</template>
<script>
    import {
        findFieldList,//获取插入字段列表
        addSms,//添加短信发送
        findSmsTriggerList, //触发事件列表
        findSmsTriggerCycleList, //触发周期列表
        findSmsTirggerDetails, //触发短信详情
        findSmsTemoplateDetails, //即时短信详情
        updateSms, //修改短信
    } from "Api/member";
    import filterBox from "../components/filterBox.vue";
    import mineTextarea from "../components/mineTextarea.vue";
    import Dialog from "../../base/dialog.vue";
    import iphone from "../components/iphone.vue";
    import { memberListHeader } from "../../config/config.js";
    import moment from "moment";
    import { restoreTime, xjEndTime } from 'assets/js/getTime'
    export default {
        data() {
            return {
                mainForm: { //最外层表单
                    noteName: '', //短信名称
                    sendContent: '', //发送内容
                    sendWay: '', //发送方式
                    touchOff: '时间触发', //触发条件
                    presonList:[],
                    sendPreson:"",//发送人
                    sendPresonCount:0, //统计发送人人数
                },
                touchOffRules:{
                    touchOff:[{
                        type: 'string',
                        required: true,
                        message: '请选择一个发送方式',
                        trigger: 'change'
                    }]
                },
                timeTouchOffFrom: { // 时间触发表单
                    //时间触发
                    // dataAndTime:'',//时间触发条件(选择日期和时间)
                    // touchOffPeriod: '', //触发周期
                    eventName:"", //时间触发左边，
                    eventCycle:"", //时间触发右边（年、月）
                    timeTouchWeek:""  //时间触发右边 （周）
                },
                
                timeTouchOffRules:{ // 时间触发表单验证规则
                    // 选择日期时间
                    eventCycle: [{
                        type:"date",
                        required: true,
                        message: '请选择日期时间',
                        trigger: 'blur'
                    }],
                    // 选择触发周期
                    eventName: [{
                        type: 'string',
                        required: true,
                        message: '请选择年月日',
                        trigger: 'blur'
                    }],
                    //时间触发右边 （周）
                    timeTouchWeek: [{
                        type:"string",
                        required: true,
                        message: '请选择星期',
                        trigger: 'blur'
                    }],
                },
                
                eventTouchOffFrom:{ // 事件触发表单
                    //事件触发
                    touchOffCondition: '', //触发事件
                    touchOffTime: '', //触发时间
                    days: '', //天数,
                },
                
                eventTouchOffRules:{ // 事件触发表单验证规则
                    // 触发条件
                    touchOffCondition:[{
                        required: true,
                        message: '请选择触发条件',
                        trigger: 'blur'
                    }],
                    // 触发时间
                    touchOffTime:[{
                        required: true,
                        message: '请选择触发时间',
                        trigger: 'blur'
                    }],
                    // 输入天数
                    days:[{
                        required: true,
                        message: '请输入天数',
                        trigger: 'blur'
                    }]
                },
                // =======================
                memberListHeader:[], //表头数据
                operationConfig:{ //操作配置
                    operation:false, //是否开启操作
                },
                mainRules: { //监测规则
                    noteName: [{
                            required: true,
                            message: '请输入短信名称',
                            trigger: 'blur'
                        },
                        {
                            min: 0,
                            max: 6,
                            message: '最多可以输入六个字符',
                            trigger: 'blur'
                        }
                    ],
                    sendWay: [{
                        type: 'string',
                        required: true,
                        message: '请选择一个发送方式',
                        trigger: 'change'
                    }],
                    sendContent: [{
                        required: true,
                        validator: this.sendContentRule,
                    }],
                    sendPreson:[{
                        required: true,
                        message: '请选择发送人',
                        trigger: 'blur'
                    }],
                },
                dialog:{
                    isShowDialog:false, //是否显示弹窗
                    dialogType:"", //弹窗类型
                    modal:true, //是否开启模态
                },
                filterTab:['插入字段','|','插入模板','|','选择签名'],
                addSmsIng:false, //正在新建短信发送
                findDetailsIng:false, //正在获取短信详情
                insetWord:"", //插入模板的内容
                templateId:"",//插入模板的id
                signId:"",//插入的签名ID
                
                sendPresonData:{ //发送人列表回填数据
                    keyWord:"", //回填选择发送人弹窗搜索框
                    gradeId:"", //会员等级
                    principalId:"", //回填选择发送人负责人
                    memberType:"", //回填选择发送人会员类型
                    conditionsType:"",//回填选择发送人按人按条件
                }
            }
        },
        asyncComputed: {
            requestData: { // Api请求的参数
                get() {
                    return {
                        shopId: this.$route.query.shopId,
                        name: this.mainForm.noteName, //短信名称
                        type: this.mainForm.sendWay=="即时发送"?0:1, //发送方式 0：即使发送 1：事件触发
                        content: this.mainForm.sendContent, //短信内容
                        eventName:this.timeTouchOffFrom.eventName, //时间触发左边，
                        eventCycle:this.timeTouchOffFrom.eventName == '年'?moment(this.timeTouchOffFrom.eventCycle).format("MM月DD日"):this.timeTouchOffFrom.eventName == '月'?moment(this.timeTouchOffFrom.eventCycle).format("DD日"):this.timeTouchOffFrom.timeTouchWeek, //时间触发右边
                        eventId:this.eventTouchOffFrom.touchOffCondition, //触发条件ID
                        befoerAfrerType:this.eventTouchOffFrom.touchOffTime, //触发时间 0：前；1：后
                        befoerAfrerDay:this.eventTouchOffFrom.days, //天数
                        smsId:this.$route.query.templateId, //当前编辑的短信
                        templateId: this.templateId, //插入的模板类型Id
                        userList: this.mainForm.presonList, //发送人列表
                        signId:this.signId, //插入的签名
                        //====== 发送人列表=========//
                        userType:this.sendPresonData.conditionsType, //类型 1 按人；2 按条件  memberId:"", //用户Id //     memberName:"", //用户名称//     phone:"",  //手机号码
                        gradeId:this.sendPresonData.gradeId, //会员级别
                        memberType:this.sendPresonData.memberType, //会员类型
                        principalId:this.sendPresonData.principalId, //会员负责人
                        keyWord:this.sendPresonData.keyWord,//发送人搜索框   
                    }
                },
                default(){
                    
                }
            },
            FieldList: { //插入字段列表
                get() {
                    let shopId = this.$route.query.shopId;
                    console.log(shopId);
                    let res = (async () => {
                        let res = await findFieldList({
                            shopId
                        });
                        if(res.body.msg == 'OK'){
                            return res.body.data;
                        }else{
                            this.$message({
                                type: 'warning',
                                message: res.body.msg
                            });
                        }
                    })()
                    return res
                },
                default () {
                    return []
                }

            },
            touchOffConditionList:{ //触发条件列表
                lazy: true,
                get(){
                    return (async()=>{
                        let res =await findSmsTriggerList();
                        // console.log(res.body.data.dataList)
                        if(res.body.msg == 'OK'){
                            return res.body.data.dataList
                        }else{
                            this.$message({
                                type: 'warning',
                                message: res.body.msg
                            });
                        }
                         
                    })()
                },
                default(){
                    return [];
                }
            },
            touchOffTimeList:{ //触发时间列表
                lazy: true,
                get(){
                    return [{
                        touchOffTimeName:"前",
                        touchOffTimeLable:"0"
                    },{
                        touchOffTimeName:"后",
                        touchOffTimeLable:"1"
                    }]
                }
            },
            touchOffPeriodList:{ //触发周期列表
                lazy: true,
                get(){
                    return (async () => {
                        let res = await findSmsTriggerCycleList();
                        console.log(res)
                        if (res.body.msg == 'OK') {
                            return res.body.data.dataList
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.body.msg
                            });
                        }
                    })()
                },
                default(){
                    return [];
                }
            },
            SmsTirggerDetails:{ //触发短信详情
                get(){
                    if (this.$route.query.templateId && this.$route.query.type == '触发短信') {
                        return (async () => {
                            this.findDetailsIng = true;
                            let templateId = this.$route.query.templateId
                            let res = await findSmsTirggerDetails({
                                templateId
                            });
                            if (res.body.msg == "OK") {
                                this.findDetailsIng = false;
                                return res.body.data;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg,
                                    onClose: () => {
                                        this.findDetailsIng = false;
                                        this.$router.go(-1);
                                    }
                                });
                            }
                        })()
                    }
                }
            },
            SmsTemoplateDetails:{ //即时短信详情
                get(){
                    if(this.$route.query.templateId && this.$route.query.type == '即时短信') {
                        return (async()=>{
                            this.findDetailsIng = true;
                            let templateId = this.$route.query.templateId
                            let res = await findSmsTemoplateDetails({templateId});
                            if (res.body.msg == "OK") {
                                this.findDetailsIng = false;
                                return res.body.data;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.body.msg,
                                    onClose: () => {
                                        this.findDetailsIng = false;
                                        this.$router.go(-1);
                                    }
                                });
                            }
                        })()    
                    }
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
            },
            dialogData:{ //弹窗参数
                get(){
                    return {
                        templateId:this.templateId, //回填插入模板
                        signId:this.signId, //回填选择签名
                        keyWord:this.sendPresonData.keyWord, //回填选择发送人弹窗搜索框
                        principalId:this.sendPresonData.principalId, //回填选择发送人负责人
                        memberType:this.sendPresonData.memberType, //回填选择发送人会员类型
                        conditionsType:this.sendPresonData.conditionsType,//回填选择发送人按人按条件
                    }
                },
                default(){
                    return {
                        isShowDialog:false, //是否显示弹窗
                        dialogType:"", //弹窗类型
                        modal:true, //是否开启模态
                        data:null //传值
                    }
                }
            },
            
        },
        components: {
            filterBox,
            mineTextarea,
            Dialog,
            iphone
        },
        created(){
            this.memberListHeader = memberListHeader;
        },
        watch:{
            'mainForm.sendWay'(val){
                if(val == '即时发送'){
                    this.mainForm.touchOff = '';
                }else if(val == '触发条件'){
                    this.mainForm.touchOff = '时间触发';
                }
            },
            'mainForm.touchOff'(val){
                if(val == '时间触发'){
                    this.formReset('eventTouchOffFrom')
                }else if(val == '事件触发'){
                    this.formReset('timeTouchOffFrom')
                }
            },
            'SmsTirggerDetails'(val){ //触发短信详情回填
                if(val && val.length != 0){
                    this.backFillData(val)
                }
            },
            'SmsTemoplateDetails'(val){ //即时短信详情回填
                if(val && val.length != 0){
                    this.backFillData(val)
                }
            }
        },
        methods: {
            // 切换插入字段，插入模板，选择签名
            switchTab(item){
                if(item == '插入模板'){
                    this.dialog.isShowDialog = true
                    this.dialog.dialogType = 'inSetModule';
                }else if(item == '选择签名'){
                    this.dialog.isShowDialog = true;
                    this.dialog.dialogType = 'selectSignature'
                }
            },
            // 切换发送方式
            sendWayChange(val){
                if(val == '即时发送'){
                    this.mainForm.touchOff = '';
                }else if(val == '触发条件'){
                    this.mainForm.touchOff = '时间触发';
                }
            },
            // 切换事件触发
            touchOffChange(val) {
                if (val == '时间触发') {
                    this.formReset('eventTouchOffFrom')
                } else if (val == '事件触发') {
                    this.formReset('timeTouchOffFrom')
                }
            },
            // 取消弹窗
            cancel(val){
                this.dialog.dialogType = ""
                this.dialog.isShowDialog = val
            },
            // 弹窗确定
            confirm(flage,data){
                this.dialog.isShowDialog = flage;
                let type = this.dialog.dialogType;
                if(type == "inSetModule"){  //插入模板
                    this.insetWord = data.content;
                    this.templateId = data.templateId;
                }
                else if(type == "selectSendPreson"){ //选择发送人
                    this.sendPresonDataDispose(data);
                    if(!Array.isArray(data)){
                        this.$set(this.sendPresonData,"keyWord",data.inputVal);
                        // this.$set(this.sendPresonData,"gradeId",data.memberRank);
                        this.$set(this.sendPresonData,"principalId",data.memberPrincipal);
                        this.$set(this.sendPresonData,"memberType",data.memberType);
                    }
                } 
                else if(type == "selectSignature"){ //选择签名
                    this.signId = data.signId;
                }
                this.dialog.dialogType = ""
            },
            // 点击小人打开发送人列表
            openSendPresonList(){
                this.dialog.isShowDialog = true;
                this.dialog.dialogType = "selectSendPreson";
            },
            // 确定按钮 // 3.3 添加发送短信
            submitForm(formName) {
                let touchOffVer = true;
                if (this.mainForm.touchOff == '时间触发') {
                    touchOffVer = this.formVerify('timeTouchOffFrom');
                } else if (this.mainForm.touchOff == '事件触发') {
                    touchOffVer = this.formVerify('eventTouchOffFrom');
                }
                let mainVer = this.formVerify('mainForm');
                console.log(touchOffVer);
                console.log(mainVer)
                if (touchOffVer && mainVer) {
                    if (this.createdOrUpdata == "CREATED") { //新建短信发送
                        this.addSms();
                    }else if(this.createdOrUpdata == "UPDATA"){  //编辑短信发送
                        this.updateSms();
                    }
                }
            },
            // 新增短信
            addSms() {
                this.addSmsIng = true;
                let {
                    shopId,
                    name,
                    type,
                    content,
                    eventName,
                    eventCycle,
                    eventId,
                    befoerAfrerType,
                    befoerAfrerDay,
                    userType,
                    templateId,
                    userList,
                    signId,
                    gradeId,
                    memberType,
                    principalId,
                    keyWord,
                } = this.requestData;
                (async () => {
                    let res = await addSms({
                        shopId,
                        name,
                        type,
                        content,
                        eventName,
                        eventCycle,
                        eventId,
                        befoerAfrerType,
                        befoerAfrerDay,
                        userType,
                        templateId,
                        userList,
                        signId,
                        gradeId, //会员级别
                        memberType, //会员类型
                        principalId, //会员负责人
                        keyWord, //发送人搜索框
                    });
                    console.log(res)
                    if (res.body.msg == "OK") {
                        this.$message({
                            message: '新建成功',
                            type: 'success',
                            onClose: () => {
                                this.$router.back(-1);
                                this.addSmsIng = false;
                            }
                        });
                    } else {
                        this.$message({
                            message: res.body.msg,
                            type: 'warning',
                            onClose: () => {
                                this.addSmsIng = false;
                            }
                        });
                    }
                })()
            },
            // 编辑短信
            updateSms(){
                this.addSmsIng = true;
                let {
                    shopId,
                    name,
                    type,
                    content,
                    eventName,
                    eventCycle,
                    eventId,
                    befoerAfrerType,
                    befoerAfrerDay,
                    smsId,
                    templateId,
                    gradeId,
                    memberType,
                    principalId,
                    keyWord,
                    userType,
                    signId,
                    userList,
                } = this.requestData;
                (async () => {
                    let res = await updateSms({
                        shopId,
                        name,
                        type,
                        content,
                        eventName,
                        eventCycle,
                        eventId,
                        befoerAfrerType,
                        befoerAfrerDay,
                        smsId,
                        templateId,
                        gradeId,
                        memberType,
                        principalId,
                        keyWord,
                        userType,
                        signId,
                        userList,
                    });
                    console.log(res)
                    if (res.body.msg == "OK") {
                        this.$message({
                            message: '编辑成功',
                            type: 'success',
                            onClose: () => {
                                this.$router.back(-1);
                                this.addSmsIng = false;
                            }
                        });
                    } else {
                        this.$message({
                            message: res.body.msg,
                            type: 'warning',
                            onClose: () => {
                                this.addSmsIng = false;
                            }
                        });
                    }
                })()
            },
            // 文本域输入内容
            contentChange(val){
                this.mainForm.sendContent = val;
            },
            // 表单重置
            formReset(formName){
                this.$refs[formName].resetFields()
            },
            // 表单验证
            formVerify(formName){
                let res;
                this.$refs[formName].validate((valid)=>{
                    res = valid
                })
                return res;
            },
            // 点击要插入的字段
            clickChildrenItem(item){
                this.$refs["mineTextarea"].addWord(item.fieidName)
            },
            // 验证发送内容
            sendContentRule(rule, value, callback) {
                console.log(this.requestData.templateId)
                if (!this.templateId) {
                    callback(new Error('请插入模板'));
                }
                else if(!this.signId){
                    callback(new Error('请选择签名'));
                }
                else{
                    callback();
                }
            },
            // 格式化日期
            restoreTime(str){
                let currentTiem = xjEndTime(new Date())
                return restoreTime(currentTiem.slice(0, 4) + str + currentTiem.slice(8, 14))
            },
            // 编辑模式下回填数据
            backFillData(val) {
                this.$set(this.mainForm, "noteName", val.templateName);
                this.insetWord = val.content;
                this.templateId = val.templateTypeId;
                this.signId = val.signId;
                if (val.triggerType == "1") { //即时发送
                    this.$set(this.mainForm, "sendWay", '即时发送');
                } else if (val.triggerType == "2") { //触发条件
                    this.$set(this.mainForm, "sendWay", '触发条件');
                    if (val.type == "1") { //时间触发
                        this.$set(this.mainForm, "touchOff", '时间触发');
                        let timeStr = val.eventCycle.replace(/[\u4e00-\u9fa5]/g, "");
                        this.$set(this.timeTouchOffFrom, "eventName", val.eventName);
                        this.$set(this.timeTouchOffFrom, "eventCycle", this.restoreTime(timeStr));
                    } else if (val.type == "2") { //事件触发
                        this.$set(this.mainForm, "touchOff", '事件触发');
                        this.$set(this.eventTouchOffFrom, "touchOffCondition", val.triggerEvent.eventId);
                        this.$set(this.eventTouchOffFrom, "touchOffTime", val.befoerAfrerType);
                        this.$set(this.eventTouchOffFrom, "days", val.befoerAfrerDay);
                    }
                }
                // 发送人列表弹窗
                if (val.conditionsType == '1') { //按人
                    this.sendPresonDataDispose(val.memberUserList)
                } else if(val.conditionsType == '2') { //按条件
                    this.sendPresonDataDispose(val) 
                    this.$set(this.sendPresonData,"keyWord",val.keyWord);
                    // this.$set(this.sendPresonData,"gradeId",data.memberRank);
                    this.$set(this.sendPresonData,"principalId",val.principalId);
                    this.$set(this.sendPresonData,"memberType",val.memberType); 
                }
            },
            // 发送人输入框数据处理
            sendPresonDataDispose(data){
                if (Array.isArray(data)) { //按人
                    this.mainForm.presonList = data;
                    let sendPresonArr = this.mainForm.presonList.map((val) => {
                        return val.memberName;
                    })
                    let sendPresonStr = sendPresonArr.join("；");
                    this.mainForm.sendPresonCount = sendPresonArr.length;
                    this.mainForm.sendPreson = sendPresonStr;
                    this.$set(this.sendPresonData,"conditionsType",'1');;
                } else { //按条件
                    // console.log(Object.values(data))
                    // console.log(Object.keys(data))
                    // let str = "会员名/手机号/编号:"+ data.inputVal +";会员级别:" + data.memberRank + ";会员类型:" + data.memberType + ";会员负责人:" + data.memberPrincipal
                    let str = "按条件";
                    this.mainForm.sendPreson = str;
                    this.$set(this.sendPresonData,"conditionsType",'2');
                }
            }
        },
        created(){
            
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
            width: 639px;
            margin: 40px 0;
            margin-right: 84px;
            // 发送方式
            .touchOffBox {
                border: 1px #3195F5 solid;
                border-radius: 4px;
                padding: 15px 9px;
                margin-top: 20px;
                padding-bottom: 20px;
                // 时间触发
                .timeTouchOff {
                } // 事件触发
                .eventTouchOff {
                    margin-top: 20px;
                    // margin-bottom: 20px;
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

            .sendPreson{
                .selectPreson{
                    height: 100%;
                    position: absolute;
                    right: 0;
                    top: 0;
                    cursor: pointer;
                    .count{
                        display: inline-block;
                        font-size: 12px;
                        line-height: 20px;
                        text-align: center;
                        border-radius: 2px;
                        width: 50px;
                        height: 20px;
                        background-color: #D6D6D6;
                        color: #fff;
                        box-shadow: -10px 0px 15px #fff;
                    }
                    i{
                        font-size: 14px;
                        color: #5ABEFD;
                        margin:0 8px;
                    }
                }
            }
            
            .mineTextarea{
                width: 100%;
                height: 211px;
                border: 1px #D6D6D6 solid;
                overflow-x:visible;
                overflow-y:visible;
                border-radius: 3px 3px 0 0;
            }
        }
        .bottom{
            width: 100%;
            text-align: left;
            .primary{
                margin-left: 50px;
            }
        }
    }
</style>

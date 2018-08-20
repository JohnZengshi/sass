<template>
    <div class="createMain" v-loading="addSmsIng">
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
                    <el-radio-group 
                        class="touchOffBox" 
                        v-model="mainForm.touchOff" 
                        v-show="mainForm.sendWay == '触发条件'">
                        <!-- 时间触发 -->
                        <div class="timeTouchOff flex flex-r">
                            <el-radio class="square el-radio-f14-b flex flex-r flex-align-center" label="时间触发">时间触发：</el-radio>
                            <el-form class="flex flex-r" ref="timeTouchOffFrom" :model="timeTouchOffFrom" :rules="timeTouchOffRules">
                                <!-- 选择日期时间 -->
                                <el-form-item prop="dataAndTime">
                                    <el-date-picker 
                                        class="input-w248-h38 input-white input-b1 mr-11" 
                                        :disabled="mainForm.touchOff != '时间触发'" 
                                        v-model="timeTouchOffFrom.dataAndTime"
                                        type="datetime" 
                                        placeholder="选择日期时间"
                                        title="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <!-- 选择触发周期 -->
                                <el-form-item prop="touchOffPeriod" >
                                    <el-select
                                        filterable
                                        clearable
                                        v-loading="touchOffPeriodList.length !=0?false:true"
                                        :disabled="mainForm.touchOff != '时间触发'" 
                                        class="select-w118-h38 select-white select-b1" 
                                        v-model="timeTouchOffFrom.touchOffPeriod"
                                        placeholder="请选择触发周期"
                                        title="请选择触发周期">
                                        <el-option v-for="item in touchOffPeriodList" :label="item.templateName" :value="item.templateId"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <!-- 事件触发 -->
                        <div class="eventTouchOff flex flex-r">
                            <el-radio class="square el-radio-f14-b flex flex-r flex-align-center" label="事件触发">事件触发：</el-radio>
                            <el-form class="flex flex-r" ref="eventTouchOffFrom" :model="eventTouchOffFrom" :rules="eventTouchOffRules">
                                <!-- 触发条件 -->
                                <el-form-item prop="touchOffCondition">
                                    <el-select
                                        filterable
                                        clearable 
                                        v-loading="touchOffConditionList.length !=0?false:true"
                                        :disabled="mainForm.touchOff != '事件触发'" 
                                        class="select-w118-h38 select-white select-b1 mr-11" 
                                        v-model="eventTouchOffFrom.touchOffCondition"
                                        placeholder="触发条件"
                                        title="触发条件">
                                        <el-option v-for="item in touchOffConditionList" :label="item.signName" :value="item.signName"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 触发时间 -->
                                <el-form-item prop="touchOffTime">
                                    <el-select
                                        filterable
                                        clearable 
                                        :disabled="mainForm.touchOff != '事件触发'" 
                                        class="select-w118-h38 select-white select-b1 mr-11" 
                                        v-model="eventTouchOffFrom.touchOffTime"
                                        placeholder="触发时间"
                                        title="触发时间">
                                        <el-option v-for="item in touchOffTimeList" :label="item.touchOffTimeName" :value="item.touchOffTimeLable"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 输入天数 -->
                                <el-form-item prop="days">
                                    <el-input 
                                        :disabled="mainForm.touchOff != '事件触发'" 
                                        class="input-w118-h38 input-white input-b1" 
                                        v-model="eventTouchOffFrom.days" placeholder="请输入天数"
                                        title="请输入天数"></el-input>
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
                    <Dialog 
                        :dialogType="dialog.dialogType" 
                        :isShowDialog="dialog.isShowDialog" 
                        :modal="dialog.modal" 
                        @cancel="cancel" 
                        @confirm="confirm">
                    </Dialog>
                </el-form-item>
                <el-form-item label="发送人" prop="sendPreson">
                    <div class="sendPreson">
                        <el-input class="input-w498-h38 input-white input-b1" :disabled="true" v-model="mainForm.sendPreson" placeholder="选择发送人"></el-input>
                        <div class="selectPreson flex flex-r flex-align-center" @click="openSendPresonList">
                            <span class="count">共{{mainForm.sendPresonCount}}个</span>
                            <i class="iconfont icon-lianxiren"></i>
                        </div>
                    </div>
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
    } from "Api/member";
    import filterBox from "../components/filterBox.vue";
    import mineTextarea from "../components/mineTextarea.vue";
    import Dialog from "../../base/dialog.vue";
    import iphone from "../components/iphone.vue";
    import { memberListHeader } from "../../config/config.js";
    import moment from "moment";
    export default {
        data() {
            
            return {
                //最外层表单
                mainForm: { 
                    noteName: '', //短信名称
                    sendContent: '', //发送内容
                    sendWay: '', //发送方式
                    touchOff: '', //触发条件
                    presonList:[],
                    sendPreson:"",//发送人
                    sendPresonCount:0, //统计发送人人数
                },
                // =======================
                // 时间触发表单
                timeTouchOffFrom: {
                    //时间触发
                    dataAndTime:'',//时间触发条件(选择日期和时间)
                    touchOffPeriod: '', //触发周期
                },
                // 时间触发表单验证规则
                timeTouchOffRules:{
                    // 选择日期时间
                    dataAndTime: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期时间',
                        trigger: 'blur'
                    }],
                    // 选择触发周期
                    touchOffPeriod: [{
                        required: true,
                        message: '请选择触发周期',
                        trigger: 'blur'
                    }],
                },
                // =======================
                // 事件触发表单
                eventTouchOffFrom:{
                    //事件触发
                    touchOffCondition: '', //触发事件
                    touchOffTime: '', //触发时间
                    days: '', //天数,
                },
                // 事件触发表单验证规则
                eventTouchOffRules:{
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
                dialog:{ //弹窗
                    isShowDialog:false, //是否显示弹窗
                    dialogType:"", //弹窗类型
                    modal:true
                },
                filterTab:['插入字段','|','插入模板','|','选择签名'],
                addSmsIng:false, //正在新建短信发送
                insetWord:"", //插入模板的内容
                templateId:"",//插入模板的id
                signId:"",//插入的签名ID
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
                        triggerTiem: this.timeTouchOffFrom.dataAndTime?(moment(this.timeTouchOffFrom.dataAndTime).format("YYYY-MM-DD HH:mm:ss")):"", //触发时间
                        triggerCycleName: this.timeTouchOffFrom.touchOffPeriod, //触发周期
                        triggerTypeName: this.eventTouchOffFrom.touchOffCondition, //触发类型
                        triggerStatus: this.eventTouchOffFrom.touchOffTime, //触发状态
                        triggerDay: this.eventTouchOffFrom.days, //天数
                        templateId: this.templateId, //插入的模板类型Id
                        userList: this.mainForm.presonList, //发送人列表
                        signId:this.signId //插入的签名
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
                    this.mainForm.presonList = data;
                    let sendPresonArr = this.mainForm.presonList.map((val)=>{
                        return val.memberName;
                    })
                    let sendPresonStr = sendPresonArr.join("；");
                    this.mainForm.sendPresonCount = sendPresonArr.length;
                    this.mainForm.sendPreson = sendPresonStr;
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
                console.log(mainVer)
                if(touchOffVer && mainVer){
                    this.addSmsIng = true;
                    let {
                        shopId,
                        name,
                        type,
                        content,
                        triggerTiem,
                        triggerCycleName,
                        triggerTypeName,
                        triggerStatus,
                        triggerDay,
                        templateId,
                        userList,
                        signId
                    } = this.requestData;
                    (async () => {
                        let res = await addSms({
                            shopId,
                            name,
                            type,
                            content,
                            triggerTiem,
                            triggerCycleName,
                            triggerTypeName,
                            triggerStatus,
                            triggerDay,
                            templateId,
                            userList,
                            signId
                        });
                        console.log(res)
                        if (res.body.msg == "OK") {
                            this.$message({
                                message: '新建成功',
                                type: 'success',
                                onClose:()=>{
                                    this.addSmsIng = false;
                                    this.$router.back(-1);
                                }
                            });
                        } else {
                            this.$message({
                                message: res.body.msg,
                                type: 'warning',
                                onClose:()=>{
                                    this.addSmsIng = false;
                                }
                            });
                        }
                    })()
                }
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
            }
        },
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

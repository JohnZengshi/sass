<template>
    <div class="noteMain flex-v">
        <div>
            <Tab :list="list" class="noteTab" @switchTab="switchTab"></Tab>
            <div class="createNew">
                <el-button type="primary" @click="createNote">新建短信</el-button>
                <!-- <button @click="clickMore">新增</button> -->
            </div>
            <div class="select flex flex-r">
                <div class="select-w90-h28">
                    <el-select class="noteManageSelect" filterable clearable v-model="noteType" placeholder="短信类型" @change="changeSelectValue">
                        <el-option v-for="(item,index) in options01" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="select-w90-h28">
                    <el-select class="noteManageSelect" filterable clearable v-model="createPreson" placeholder="创建人" @change="changeSelectValue">
                        <el-option v-for="(item,index) in options02" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="select-w90-h28">
                    <el-select class="noteManageSelect" filterable clearable v-model="moduleType" placeholder="模板状态" @change="changeSelectValue">
                        <el-option v-for="(item,index) in options03" :key="index" :label="item.label" :value="item.value">
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
                :headerData="noteManageHeader" 
                :tabTitle="tabTitle"
                :tableData="noteList"
                :showHeader="true"
                :isSort="isSort"
                :operationConfig="operationConfig"
                @operationBack="operationBack"
                @clickTd="noteClick"
                styleClass="el_table_noteManage"></TableBody>
        </div>
        <Dialog
            :dialogType="dialogType"
			:isShowDialog="isShowDialog"
            :tipMsg="tipMsg"
            :modal="modal"
			@cancel="cancel"
            @confirm="confirm">
		</Dialog>
    </div>
</template>
<script>
    import Tab from "../../base/tab.vue";
    import AloneDropDownColums from "base/menu/alone-drop-down-colums";
    import TableBody from "../../base/tableBody.vue";
    import Dialog from "../../base/dialog.vue";
    import xjTime from "base/time/xj-time";
    import {
        noteManageHeader01,
        noteManageHeader02,
        noteManageHeader03
    } from "../../config/config.js"
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
                options01: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                options02: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                options03: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                // 模拟即时短信数据
                testArr01:[{
                    id:788548,
                    moduleType: "生日祝福",
                    noteName: "三月生日",
                    createdPreson: "刘大宝",
                    todaySend: 8000,
                    totalSend: 5004,
                }, {
                    id:789545,
                    moduleType: "生日祝福",
                    noteName: "三月生日",
                    createdPreson: "刘大锤",
                    todaySend: 4456,
                    totalSend: 6353,
                }],
                // 模拟触发短信数据
                testArr02:[{
                    id:"7788",
                    noteName: "三月生日",
                    createdPreson: "刘大宝",
                    moduleState:true,
                    todaySend: 8000,
                    totalSend: 5004,
                    isDisable:true,
                },{
                    id:"7789",
                    noteName: "三月生日",
                    createdPreson: "刘大宝",
                    moduleState:false,
                    todaySend: 8000,
                    totalSend: 5004,
                    isDisable:false,
                },{
                    id:"7790",
                    noteName: "三月生日",
                    createdPreson: "刘大宝",
                    moduleState:true,
                    todaySend: 8000,
                    totalSend: 5004,
                    isDisable:true,
                }],
                // 模拟短信日志数据
                testArr03:[{
                    moduleType: "生日祝福",
                    noteName: "三月生日",
                    noteContent:"尊敬的{1用户名字}客户，今天是您的生日，{2店铺简称}衷心祝愿您生日快乐。今日到店消费有生日优惠，部分商品五折起，愿最美丽的首饰给你带来好心情。店铺地址：{3店铺地址}，联系电话{4店铺联系方式}.",
                    userName:"哈哈哈",
                    userPhone:"135424512585",
                    noteSurplus:1245,
                    sendState:false,
                    sendTime:"2018-08-02"
                },{
                    moduleType: "生日祝福",
                    noteName: "三月生日",
                    noteContent:"尊敬的{1用户名字}客户，今天是您的生日，{2店铺简称}衷心祝愿您生日快乐。今日到店消费有生日优惠，部分商品五折起，愿最美丽的首饰给你带来好心情。店铺地址：{3店铺地址}，联系电话{4店铺联系方式}.",
                    userName:"哈哈哈",
                    userPhone:"135424512585",
                    noteSurplus:1245,
                    sendState:true,
                    sendTime:"2018-08-02"
                },{
                    moduleType: "生日祝福",
                    noteName: "三月生日",
                    noteContent:"尊敬的{1用户名字}客户，今天是您的生日，{2店铺简称}衷心祝愿您生日快乐。今日到店消费有生日优惠，部分商品五折起，愿最美丽的首饰给你带来好心情。店铺地址：{3店铺地址}，联系电话{4店铺联系方式}.",
                    userName:"哈哈哈",
                    userPhone:"135424512585",
                    noteSurplus:1245,
                    sendState:false,
                    sendTime:"2018-08-02"
                }],
                noteType: "",//短信类型
                createPreson:"",//创建人
                moduleType:"",//模板类型
                noteManageHeader: [],//表格头部
                tabTitle:"即时短信",
                isSort:true,//是否开启排序
                noteList:[],//信息列表
                operationConfig:{ //操作配置
                    operation:true, //是否开启操作
                    tableValue:'operationList' //每条数据对应的操作icon字段
                },
                dialogType:"Tip",//弹窗类型
                isShowDialog:false, //弹窗
                tipMsg:"", //弹窗提示语
                modal:true,//是否开启模态框
                currentOperationNote:{ //当前操作的短信
                    way:"",
                    index:0,
                },
            }
        },
        components: {
            Tab,//头部切换Tab
            AloneDropDownColums,//下拉选择框
            TableBody,//表格组件
            Dialog,//弹窗组件
            xjTime,//时间选择器
        },
        methods: {
            // 切换头部tab
            switchTab(item) {
                // console.log(item)
                if(item.id == 0){
                    this.deletedialogvisi = true;
                    this.noteManageHeader = noteManageHeader01
                    this.operationConfig.operation = true; //开启可操作
                    // this.operationList = ["icon-bianji","icon-lajitong"]
                    this.noteList = this.testArr01;
                }else if(item.id == 1){
                    this.noteManageHeader = noteManageHeader02
                    this.operationConfig.operation = true; //开启可操作
                    // this.operationList = ["icon-bianji","icon-lajitong"]
                    this.noteList = this.testArr02;
                }else if(item.id == 2){
                    this.noteManageHeader = noteManageHeader03
                    this.operationConfig.operation = false; //关闭可操作
                    this.noteList = this.testArr03;
                }
                this.tabTitle = item.tabName;
                this.initDisableState()
            },
            // 新建短信按钮
            createNote(){
                this.$router.push({
                    path: "/memberManage/push/createNote",
                    query: {
                        title: '新增短信'
                    }
                })
            },


            clickMore() {
                this.noteList.push({
                    id:"7788",
                    noteName: "三月生日",
                    createdPreson: "刘大宝",
                    moduleState:true,
                    todaySend: 8000,
                    totalSend: 5004,
                    isDisable:true,
                });
                this.initDisableState();
            },
            requestData() {
                this.noteList = this.testArr01;
                this.initDisableState()
            },
            initDisableState(){
                this.noteList.forEach((val)=>{
                    if(this.tabTitle == '触发短信'){
                        // console.log(val)
                        if(val.isDisable){
                            val.operationList = ["icon-jinzhi","icon-bianji","icon-lajitong"];
                        }
                        else{
                            val.operationList = ["icon-qidong","icon-bianji","icon-lajitong"]
                        }
                    }
                    else if(this.tabTitle == '即时短信'){
                        val.operationList = ["icon-bianji","icon-lajitong"];
                    }
                })
            },


            // 操作按钮
            operationBack(way,index){
                if(way == 'jinzhi'){
                    this.tipMsg = "是否禁用该模板？"
                }else if(way == 'qidong'){
                    this.tipMsg = "是否启动该模板？"
                }else if(way == 'lajitong'){
                    this.tipMsg = "是否删除该模板？"
                }else if(way == 'bianji'){
                    return
                }
                this.dialogType = "Tip"
                this.isShowDialog = true;
                this.modal = false;
                this.currentOperationNote = {
                    way,
                    index
                };
                
            },
            // 点击短信名称
            noteClick(val){
                this.dialogType = "Notelog"
                this.isShowDialog = true;
                this.modal = true;
                console.log(val.id);
                setTimeout(()=>{

                },3000)
            },
            // 弹窗确定按钮
            confirm(val){
                this.isShowDialog = val
                let way = this.currentOperationNote.way;
                let index = this.currentOperationNote.index;
                if(way == 'jinzhi'){
                    this.$set(this.noteList[index],'isDisable',false)
                    this.$set(this.noteList[index],'operationList',["icon-qidong","icon-bianji","icon-lajitong"])
                    this.$set(this.noteList[index],'moduleState',false)
                }else if(way == 'qidong'){
                    this.$set(this.noteList[index],'isDisable',true)
                    this.$set(this.noteList[index],'operationList',["icon-jinzhi","icon-bianji","icon-lajitong"])
                    this.$set(this.noteList[index],'moduleState',true)
                }else if(way == 'lajitong'){
                    this.noteList.splice(index,1)
                }

            },
            // 弹窗关闭取消按钮
            cancel(val){
                this.isShowDialog = val
            },
            // 选项选中时触发
            changeSelectValue(val){
                console.log(val);
            },
            // 时间选项选中时触发
            changeTime(val){
                console.log(val)
            }
        },
        created() {
            this.noteManageHeader = noteManageHeader01;
            this.requestData();
        }
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

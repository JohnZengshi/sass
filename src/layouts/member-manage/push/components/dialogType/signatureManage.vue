<!-- 管理签名 -->
<template>
    <div class="signatureManage">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <span class="title">管理签名</span>
        <div class="signatureList" v-loading="findSmsSignListIng">
            <TableBody 
                v-loading="updateSmsSignIng"
                :headerData="headerData" 
                :tableData="signatureList" 
                :showHeader="true" 
                :isSort="false" 
                :operationConfig="operationConfig"
                @operationBack="operationBack"
                styleClass="el_table_signatureList"></TableBody>
        </div>
        <div class="bottomButton flex flex-r flex-pack-center">
            <el-button class="btn-w90-h28 btn-f12" type="primary" @click="createdSignature">新增签名</el-button>
        </div>
        <el-dialog 
            class="dialog-w320-h255-t225-hn"
            :visible="dialog.isShowDialog" 
            :modal="dialog.modal">
            <createdSignature 
                v-loading="addSmsSignIng" 
                @cancel="handlecloseCreatedSign" 
                @confirm="handleconfirmCreatedSign"></createdSignature>
        </el-dialog>
    </div>
</template>
<script>
    import {
        findSmsSignList,
        addSmsSign,
        updateSmsSign
    } from "Api/member";
    import {signatureListHeader} from "../../../config/config.js";
    import {signatureManageLsitBtnClass} from "./btnStyle.js";
    import TableBody from "../../../base/tableBody";   
    import createdSignature from "./createdSignature.vue";
    export default {
        data(){
            return {
                operationConfig:{ //操作配置
                    operation:true,
                    tableValue:'operationList', // 每条数据对应的操作icon字段
                    type:"btnAndIcon", // 按钮 + icon类型
                },
                dialog:{ //弹窗
                    dialogType:"createdSignature",
                    isShowDialog:false,
                    modal:false,
                },
                findSmsSignListIng:false, //正在查询签名
                addSmsSignIng:false, //正在增加签名
                updateSmsSignIng:false, //正在修改签名
                requestData:{
                    shopId:this.filterOption.shopId, //店铺Id
                    name:"", //签名名称
                    signId:"", //签名ID
                    defualtFlag:"", //签名状态 Y:默认 N:否
                    type: 0, //操作类型 0：修改1：删除
                },
                updata:true //更新列表
            }
        },
        props:["filterOption"],
        asyncComputed:{
            headerData:{ //表格头部数据
                get(){
                    return signatureListHeader
                },
                default(){

                }
            },
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
                                arr.forEach((v) => {
                                    v.operationList = [{
                                        type: "btn",
                                        btnName: v.flag,
                                        btnStyle: v.flag=="默认"?signatureManageLsitBtnClass.defaultBtnClass:signatureManageLsitBtnClass.generalBtnClass,
                                        btnEvent: v.flag=="默认"?false:true,
                                    }, {
                                        type: "icon",
                                        iconName: "icon-lajitong"
                                    }]
                                })
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
        components:{
            TableBody,
            createdSignature
        },
        methods:{
            // 取消弹窗
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            // 取消新增签名弹窗
            handlecloseCreatedSign(){
                this.dialog.isShowDialog = false;
            },
            // 确定新增签名弹窗
            handleconfirmCreatedSign(flage,data) {
                if(data == ""){
                    return;
                }
                //确认
                this.requestData.name = data;
                this.addSmsSignIng = true;
                (async () => {
                    let res = await this.addSmsSign();
                    if (res == 'OK') {
                        this.dialog.isShowDialog = flage; //关闭弹窗
                        this.addSmsSignIng = false;
                        this.$message({
                            type: 'info',
                            message: '新增成功'
                        });
                        this.updata = true //更新列表
                    }else{
                        this.$message({
                            type: 'fail',
                            message: '新增失败'
                        });
                    }
                })()
            },
            // 点击操作里的icon和按钮
            operationBack(item,scope){
                console.log(item,scope)
                if(item.type == "btn"){
                    let index = scope.$index; //第几行
                    this.requestData.signId = scope.row.signId;
                    this.requestData.defualtFlag = scope.row.flag == "设为默认"?"Y":"N";
                    this.requestData.type = 0;
                    this.updateSmsSignIng = true;
                    (async () => {
                        let res = await this.updateSmsSign();
                        console.log(res)
                        if (res == 'OK') {
                            this.updateSmsSignIng = false;
                            this.updata = true //更新列表
                        }
                    })()
                    
                }else if(item.type == "icon"){
                    let index = scope.$index; //第几行
                    this.requestData.signId = scope.row.signId;
                    this.requestData.defualtFlag = scope.row.flag == "设为默认"?"N":"Y"; //标签状态
                    this.requestData.type = 1;
                    this.updateSmsSignIng = true;
                    
                    (async()=>{
                        let res = await this.updateSmsSign();
                        if(res == 'OK'){
                            this.updateSmsSignIng = false;
                            this.updata = true //更新列表
                        }
                    })()
                }
            },
            // 新增签名(弹窗)
            createdSignature(){
                this.dialog.isShowDialog = true;
            },
            // 2.1添加短信签名
            addSmsSign(){
                let {shopId,name} = this.requestData;
                return (async()=>{
                    let res = await addSmsSign({shopId,name});
                    console.log(res)
                    return res.body.msg;
                })()
            },
            // 2.3编辑或删除签名
            updateSmsSign(){
                let {
                    shopId,
                    signId,
                    defualtFlag,
                    type
                } = this.requestData;
                return (async () => {
                    let res = await updateSmsSign({
                        shopId,
                        signId,
                        defualtFlag,
                        type
                    });
                    if(res.body.msg == "OK"){
                        return res.body.msg
                    }else{
                        this.$message({
                            type: 'warning',
                            message: res.body.msg
                        });
                    }
                })()
            }
        },
    }

</script>
<style lang="less" scoped>
.signatureManage {
    position: relative;
    padding: 20px 30px;
    .close-icon {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 20px;
        right: 30px;
    }
    .title {
        display: inline-block; // margin-top:20px;
        // margin-left: 30px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
    }
    .signatureList{
        margin-top: 24px;
    }
    .bottomButton{
        width: 100%;
        margin-top: 36px;
    }
}
</style>

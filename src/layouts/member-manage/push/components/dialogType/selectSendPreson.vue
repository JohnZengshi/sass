<!-- 选择发送人弹窗 -->
<template>
    <div class="sendPresonBox">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <span class="title">选择发送人</span>
        <div class="filter flex flex-r flex-align-center">
            <div class="flex flex-r">
                <div class="screach flex flex-r flex-align-center">
                    <input v-model="sendPresonFilter.inputVal" type="text" placeholder="请输入会员名/手机号/编号">
                    <i @click="search" class="iconfont icon-sousuo"></i>
                </div>
                <el-select :disabled="MemberGradeList && MemberGradeList.length == 0" class="select-w132-h26 select-white select-b1 mr-17" filterable clearable v-model="sendPresonFilter.memberRank" placeholder="会员级别">
                    <el-option v-for="item in MemberGradeList" label="普通" value="shanghai"></el-option>
                </el-select>
                <el-select class="select-w132-h26 select-white select-b1 mr-17" filterable clearable v-model="sendPresonFilter.memberType" placeholder="会员类型">
                    <el-option v-for="item in memberTypeList" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-select :disabled="MemberPrincipalList && MemberPrincipalList.length == 0" class="select-w132-h26 select-white select-b1 mr-17" filterable clearable v-model="sendPresonFilter.memberPrincipal" placeholder="会员负责人">
                    <el-option v-for="item in MemberPrincipalList" :label="item.nickName" :value="item.ptincipalId"></el-option>
                </el-select>
            </div>
            <el-radio-group class="mt-11" v-model="sendPresonFilter.searchCriteria" size="small">
                <el-radio-button class="btn-w60-h28" label="condition">按条件</el-radio-button>
                <el-radio-button class="btn-w60-h28" label="preson">按人</el-radio-button>
            </el-radio-group>
            <!-- <el-button class="btn-w80-h28 btn-f12 mt-11 mr-16" type="primary" @click="isAdvanced = !isAdvanced">{{isAdvanced ? '取消高级搜索' : '高级搜索'}}</el-button> -->
        </div>
        <div class="sendPresonList">
            <!-- <advancedSearch ref="advancedSearchBox" v-show="isAdvanced"></advancedSearch> -->
            <TableBody 
                v-show="sendPresonFilter.searchCriteria == 'preson'"
                v-loading="findSmsMemberListIng"
                :headerData="headerData" 
                :tableData="sendPresonList" 
                :showHeader="true" 
                :isSort="false" 
                :optional="isOpenOptional" 
                :operationConfig="operationConfig"
                @selectChange="selectChange"
                styleClass="el_table_sendPresonList"></TableBody>
        </div>
        <div class="bottom flex flex-v">
            <span class="count" v-show="sendPresonFilter.searchCriteria == 'preson'">
                选择发送会员：
                <span v-show="!isOpenOptional"><span style="color:#3195F5">{{sendPresonList.length}}</span>位</span>
                <span v-show="isOpenOptional"><span style="color:#3195F5">{{choosePresonList.length}}</span>位</span>
            </span>
            <div class="btn">
                <el-button class="btn-w88-h26 btn-f12 btn-color01" @click.stop="handleclose">返回上一级</el-button>
                <el-button class="btn-w88-h26 btn-f12" type="primary" @click="handleconfirm">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {seekFindMemberGradeList} from "Api/commonality/seek";
    import {findSmsMemberList,findMemberPrincipalList} from "Api/member";
    import TableBody from "../../../base/tableBody";
    import advancedSearch from "../../../base/advanced-search.vue";
    import {sendPresonListHeader} from "../../../config/config.js";
    export default {
        data(){
            return {
                // 选择发送人筛选条件
                sendPresonFilter:{
                    inputVal:"",//搜索框内容
                    memberRank:"", //会员级别
                    memberType:"",  //会员类型
                    memberPrincipal:"", //会员负责人
                    searchCriteria:"condition" //按人或按条件
                },
                 // 切换按人按条件表格切换多选模式
                isOpenOptional:false, //是否开启多选模式
                operationConfig: {
                    operation: false,
                },
                memberTypeList:[{ //会员类型列表
                    label:"共有",
                    value:"2"
                },{
                    label:"私有",
                    value:"3"
                },{
                    label:"公有",
                    value:"1"
                }],
                choosePresonList:[],// 按人条件下选择的人
                requestData:{ //接口请求的参数
                    shopId:this.$route.query.shopId,
                    gradeId:"",
                    type:"",//1：公有2：共有3：私有
                    principalId:"",
                    name:""//手机号,姓名
                },
                headerData:sendPresonListHeader, //表头数据
                findSmsMemberListIng:false, //正在加载数据
                isAdvanced: false, // 是否开始高级搜索
            }
        },
        components:{
            TableBody,
            advancedSearch
        },
        asyncComputed:{
            sendPresonList: { //发送人列表
                get() {
                    let {
                        shopId,
                        gradeId,
                        type,
                        principalId,
                        name
                    } = this.requestData;
                    this.findSmsMemberListIng = true;
                    return(async () => {
                        let res = await findSmsMemberList({
                            shopId,
                            gradeId,
                            type,
                            principalId,
                            name
                        });
                        this.findSmsMemberListIng = false;
                        console.log(res.body.data.userList)
                        return res.body.data.userList;
                    })()
                },
                default () {
                    return []
                }
            },
            MemberGradeList:{ //会员级别列表
                get(){
                    return (async()=>{
                        let {shopId} = this.requestData;
                        let res = await seekFindMemberGradeList({shopId});
                        console.log(res);
                        if(res.body.msg == "OK"){
                            return res.body.data.userList;
                        }else{
                            this.$message({
                                type: 'warning',
                                message: res.body.msg
                            });
                            return [];
                        }
                    })()
                }
            },
            MemberPrincipalList:{ //会员负责人列表
                 get(){
                    return (async()=>{
                        let {shopId} = this.requestData;
                        let res = await findMemberPrincipalList({shopId});
                        if(res.body.msg == "OK"){
                            return res.body.data;
                        }else{
                            this.$message({
                                type: 'warning',
                                message: res.body.msg
                            });
                            return [];
                        }
                    })()
                },
            }
        },
        watch: {
            "sendPresonFilter.searchCriteria"(val){
                if(val == "condition"){ //按条件
                    this.isOpenOptional = false;
                }else if(val == "preson"){ //按人
                    this.isOpenOptional = true;
                }
            }
        },
        methods:{
            // 取消
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            // 确定
            handleconfirm() {
                let chooseList;
                if(this.sendPresonFilter.searchCriteria == 'condition'){ //按条件
                    chooseList = this.sendPresonFilter;
                }else if(this.sendPresonFilter.searchCriteria == 'preson'){ //按人
                    chooseList = this.choosePresonList;
                }
                 //确认
                this.$emit('confirm', false , chooseList);
                this.$message({
                    type: 'info',
                    message: '确定'
                });
                
            },
            // 多选模式下触发
            selectChange(val){
                this.choosePresonList = val;
            },
            // 搜索
            search(){
                let {inputVal} = this.sendPresonFilter;
                this.requestData.name = inputVal;
            },
            // 高级搜索
            advancedScreach(){
                // let {memberRank,memberType,memberPrincipal} = this.sendPresonFilter;
                // this.requestData.gradeId = memberRank;
                // this.requestData.type = memberType;
                // this.requestData.principalId = memberPrincipal;
            }
        }
    }

</script>
<style lang="less" scoped>
    // 选择发送人弹窗
    .sendPresonBox {
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
        .filter {
            margin-top: 28px;
            flex-wrap: wrap;
            .screach {
                border: 1px #D6D6D6 solid;
                border-radius: 4px;
                overflow: hidden;
                margin-right: 14px;
                height: 28px;
                width: 206px;
                input {
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
            .select {
                height: 28px;
            }
        }
        .sendPresonList {
            // height: 497px;
            // overflow-y: scroll;
            margin-top: 24px;
        }
        .bottom {
            .count {
                text-align: right;
                height: 26px;
                line-height: 26px;
            }
            .btn {
                text-align: center;
            }
        }
    }

</style>

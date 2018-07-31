<template>
    <div class="noteMain flex-v">
        <div>
            <Tab :list="list" class="noteTab" @switchTab="switchTab"></Tab>
            <div class="createNew">
                <el-button type="primary" @click="createNote">新建短信</el-button>
            </div>
            <div class="select">
                <div class="batch-select-wrap select-w100">
                    <el-select filterable clearable v-model="value" placeholder="短信类型">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.type">
                        </el-option>
                    </el-select>
                </div>
                <div class="batch-select-wrap select-w100">
                    <el-select filterable clearable v-model="value" placeholder="创建人">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.type">
                        </el-option>
                    </el-select>
                </div>
                <div class="batch-select-wrap select-w100">
                    <el-select filterable clearable v-model="value" placeholder="模板状态">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.type">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="table">
            <TableBody 
                :headerData="noteManageHeader" 
                :tabTitle="tabTitle"
                :showHeader="true"
                styleClass="el_table_noteManage"></TableBody>
            <!-- <DataGridHeader :detailDataGridColumn="noteManageHeader" :reportType="1" @tabCell="tabCell"></DataGridHeader> -->
            <!-- <DataGridBody :dataGridStorage="dataGridStorage"></DataGridBody> -->
        </div>
    </div>
</template>
<script>
    import Tab from "../../base/tab.vue";
    import AloneDropDownColums from "base/menu/alone-drop-down-colums";
    import TableBody from "../../base/tableBody.vue";
    import DataGridHeader from "layouts/Work/CommonalityComponent/formTemplate/newDataGrid/dataGridHeader";
    import DataGridBody from "layouts/Work/CommonalityComponent/formTemplate/newDataGrid/dataGridBody";
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
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                noteManageHeader: [],
                tabTitle:"即时短信",
                dataGridStorage:null
            }
        },
        components: {
            Tab,
            AloneDropDownColums,
            DataGridHeader,
            DataGridBody,
            TableBody
        },
        methods: {
            // 切换头部tab
            switchTab(item) {
                // console.log(item)
                if(item.id == 0){
                    this.noteManageHeader = noteManageHeader01
                }else if(item.id == 1){
                    this.noteManageHeader = noteManageHeader02
                }else if(item.id == 2){
                    this.noteManageHeader = noteManageHeader03
                }
                this.tabTitle = item.tabName;
            },
            tabCell(result) {
                if (result.width) {
                    let w = 'width:' + result.width + 'px'
                    result.res && result.res.call(this, w)
                }
            },
            // 新建短信按钮
            createNote(){
                this.$router.push({
                    path: "/memberManage/push/createNote",
                    query: {
                        title: '新增短信'
                    }
                })
            }
        },
        created() {
            this.noteManageHeader = noteManageHeader01
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
            display: inline-block;
            margin-top: 21px;
            float: right;
            .selectBox {
                float: left;
                cursor: pointer;
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

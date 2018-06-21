<template>
    <div class="main-wrap" @click="closeOptions">
        <div class="body-box-left">    
                <div class="new-table-wrap" ref="temp_wrap">
            <div class="new-table-template">
                <section class="body-box" ref="body_box">
                    <div class="fixed-mask skin-shield" ref="fixed_mask">
                    </div>
                    <div class="body-header skin-shield" ref="body_header">
                        <ul class="header-nav">
                            <li @click="goPreviousPage"><i style="font-size: 20px; margin-right: 10px;" class="iconfont icon-tiaogui"></i>调柜<span>&nbsp;></span></li>
                            <li class="on">单据详情</li>
                        </ul>
                        <div class="back-btn" @click="goPreviousPage">返回上一级</div>
                    </div>
                    <div id="body-row2" class="body-row2 actions-status"
                        :data-status="curStatus.statusName"
                        :class="{'animat-scroll':isRemark, 'color1': nowStatus == 1, 'color2': nowStatus == 2,
                        'color3': nowStatus == 3, 'color4': nowStatus == 4, 'color5': nowStatus == 5, 'color6': nowStatus == 6,
                        'color7': nowStatus == 7, 'color8': nowStatus == 8}"
                        
                    >   
                        <div class="mask"></div>
                        <div class="statusInfo">
                            <div class="left-main">
                                <h5>{{receiptsIntroList.orderNum}}</h5>
                                <div class="select-container">
                                    <div class="item supplier">
                                        <span v-text="receiptsIntroList.groupName2"></span>
                                    </div>
                                    <div class="item shop">
                                            <!-- 注： orderData.shopName 店铺名需要另外一个接口去拿  5.38 单据简介  表尾组件已经做了接口调用，直接传过来即可 -->
                                        <select-drop
                                            class="selected_dropdown"
                                            :titleName="receiptsIntroList.groupName"
                                            dataType="柜组1"
                                            :isDrop="true"
                                            v-if="nowStatus != 2 && nowStatus != 3 && nowStatus != 5 && nowStatus != 6"
                                            :propList="counterList"
                                            @dropReturn="dropReturn">
                                        </select-drop>
                                        <span v-else>
                                            {{receiptsIntroList.groupName}}
                                        </span>
                                    </div>
                                     <div class="select-container-name">
                                        <div class="item">调出柜组</div>
                                        <div class="item" style="margin-left:-6px;">调入柜组</div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="right-main">
                                <div class="right-main-first">
                                    <div class="right-main-item">
                                        <div class="item-title">
                                            {{receiptsIntroList.totalNum == '' || receiptsIntroList.totalNum == null ? 0: receiptsIntroList.totalNum}}
                                            <span>件</span>
                                        </div>
                                        <div class="item-type">件数</div>
                                    </div>
                                    <div class="right-main-item">
                                        <div class="item-title">
                                            {{(receiptsIntroList.totalWeight == '' || receiptsIntroList.totalWeight == null? 0 : receiptsIntroList.totalWeight).toFixed(3)}}
                                            <span>g</span>
                                        </div>
                                        <div class="item-type">件重</div>
                                    </div>
                                    <div class="right-main-item">
                                        <div class="item-title">
                                            {{(receiptsIntroList.totalPrice == '' || receiptsIntroList.totalPrice == null ? 0 : receiptsIntroList.totalPrice).toFixed(2)}}
                                            <span>元</span>
                                        </div>
                                        <div class="item-type">售价</div>
                                    </div>
                                </div>
                                <div class="right-main-last">
                                    <div class="creat-time">{{receiptData}}</div>
                                    <div class="creat-man">
                                        <!-- <img :src="receiptsIntroList.makeOrderManLog"> -->
                                        <FormatImg :logo="receiptsIntroList.makeOrderManLog" class="img" :userName="receiptsIntroList.makeOrderManName" :size="24"></FormatImg>
                                        {{receiptsIntroList.makeOrderManName}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 步骤条 -->
                        <steps-path
                            :isRemark="isRemark"
                            :orderNum="$route.query.orderNumber"
                            :statusREfresh="statusREfresh"
                            @setStatus="getStatus">
                        </steps-path>
                        <!--备注-->
                        <order-remark :refreshRemark="refreshRemark" :remarkDialog="remarkDialog" :orderNum="$route.query.orderNumber" :orderData="receiptsIntroList" @updateRemark="updateRemark"></order-remark>
                    </div>
                  
                    <div class="Rp_dataGrid_container body-row4"
                        :class="{'animat-scroll':curStatus.slipPointer }"
                    >
                         <!--滚动条上滑时出现的那个订单号-->
                        <div class="tab-orderNum" @click="updataSlipPointer(false)">
                            <span v-text="receiptsIntroList.orderNum" class="txt"></span>
                            <i class="iconfont icon-xiajiang"></i>
                            <div class="mg">
                            <span class="mask left"></span>
                            <span class="mask right"></span>
                            </div>
                        </div>
                        <div class="rp_gridState" style="">
                            <p class="side-nav"><i class="iconfont icon-liebiao"></i>{{toRouterUrlName}}</p>
                            <!-- <el-switch v-model="tabSwitch" :width="30"  :title="tabSwitch ?'关闭成本核算':'开启成本核算'"></el-switch> -->
                            <div class="sort-wrap">
                                <label>排序:</label>
                                <div class="sortwrap-text"  v-for="(item, index) in sortList" :key="index">
                                {{item.name}}
                                <img class="sortwrap-img" v-if="item.value == '2'" src="./../../../../static/img/sort/down1.png">
                                <img class="sortwrap-img" v-if="item.value == '1'" src="./../../../../static/img/sort/up1.png">
                                <i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
                                </div>
                            </div>
                            <div class="xj-switch" v-if="isShowCost == 'Y'">
                                <!-- <el-checkbox v-model="tabSwitch">成本</el-checkbox> -->
                                <span :title="tabSwitch?'关闭成本' : '开启成本'" class="btn" @click="choseMenu(2)" :class="{active: tabSwitch}">专列项</span>
                            </div>
                            <!-- <div class="tab">
                                <span
                                    :class="0 == tabClassActive.index ? tabClassActive.activeClass : ''"
                                    @click="tabs(0, 1)"
                                >明细
                                </span>
                                <span
                                    :class="1 == tabClassActive.index ? tabClassActive.activeClass : ''"
                                    @click="tabs(1, 2)"
                                >智能分类
                                </span>
                                <span
                                    :class="2 == tabClassActive.index ? tabClassActive.activeClass : ''"
                                    @click="tabs(2, 3)"
                                >产品分类
                                </span>
                                <span
                                    :class="3 == tabClassActive.index ? tabClassActive.activeClass : ''"
                                    @click="tabs(3, 4)"
                                    @mouseover="tabHover(3, $event)"
                                    @mouseout="tabOut(3, $event)"
                                >自定义
                                    <i v-if="tabClassActive.index == 3" class="iconfont icon-arrow-down"></i>
                                    <div class="customDia" ref="customDia" style="left: 5px;">
                                    <div class="body">
                                        <div class="list-wrap">
                                        <ul>
                                            <li></li>
                                            <li>成色名称</li>
                                            <li>宝石名称</li>
                                            <li>首饰类别</li>
                                        </ul>
                                        <ul>
                                            <li>计重类</li>
                                            <li>
                                            <DropDownMenu
                                                titleName="不选"
                                                dataType="customDia"
                                                dataDataType="成色名称-计重"
                                                :propList="dialogOptions.conditionList"
                                                :resetFlag='resetFlag'
                                                @infoBack="diaInfoBack"
                                            >
                                            </DropDownMenu>
                                            </li>
                                            <li>
                                            <DropDownMenu
                                                titleName="不选"
                                                dataType="customDia"
                                                dataDataType="宝石名称-计重"
                                                :propList="dialogOptions.conditionList"
                                                :resetFlag='resetFlag'
                                                @infoBack="diaInfoBack"
                                            >
                                            </DropDownMenu>
                                            </li>
                                            <li>
                                            <DropDownMenu
                                                titleName="大类"
                                                dataType="customDia"
                                                dataDataType="首饰类别-计重"
                                                :propList="dialogOptions.jewelryList"
                                                :resetFlag='resetFlag'
                                                @infoBack="diaInfoBack"
                                            >
                                            </DropDownMenu>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>计件类</li>
                                            <li>
                                            <DropDownMenu
                                                titleName="不选"
                                                dataType="customDia"
                                                dataDataType="成色名称-计件"
                                                :propList="dialogOptions.conditionList"
                                                :resetFlag='resetFlag'
                                                @infoBack="diaInfoBack"
                                            >
                                            </DropDownMenu>
                                            </li>
                                            <li>
                                            <DropDownMenu
                                                titleName="不选"
                                                dataType="customDia"
                                                dataDataType="宝石名称-计件"
                                                :propList="dialogOptions.conditionList"
                                                :resetFlag='resetFlag'
                                                @infoBack="diaInfoBack"
                                            >
                                            </DropDownMenu>
                                            </li>
                                            <li>
                                            <DropDownMenu
                                                titleName="大类"
                                                dataType="customDia"
                                                dataDataType="首饰类别-计件"
                                                :propList="dialogOptions.jewelryList"
                                                :resetFlag='resetFlag'
                                                @infoBack="diaInfoBack"
                                            >
                                            </DropDownMenu>
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
                                    <div class="foot" solt="footer">
                                        <div class="btn-wrap">
                                        <div @click.stop="resetOption" class="reset btn">重置</div>
                                        <div @click.stop="compOption" class="comp btn">完成</div>
                                        </div>
                                    </div>
                                    </div>
                                </span>
                            </div> -->
        

                            <!-- 表格筛选 begin -->
                            <div class="tab_wrap">
                                        <span :class="0 == tabClassActive.index ? 'myspanactive' : ''" @click="tabs(0, 1)">明细</span>
                                        <span style="color: #d6d6d6">丨</span>						
                                        <span :class="1 == tabClassActive.index ? 'myspanactive' : ''" @click="tabs(1, 2)">智能分类</span>
                                        <span style="color: #d6d6d6">丨</span>
                                        <span :class="2 == tabClassActive.index ? 'myspanactive' : ''" @click="tabs(2, 3)">产品分类</span>
                                        <span style="color: #d6d6d6">丨</span>
                                        <!-- 自定义 -->
                                        <span style="position: relative" :class="3 == tabClassActive.index ? 'myspanactive' : ''" @mouseover="tabHover(3, $event)" @mouseout="tabOut(3, $event)" @click="tabs(3,4)">自定义
                                        <div class="customDia site" ref="customDia" style="display: none;">
                                            <div class="body">
                                            <div class="list-wrap">
                                                <ul>
                                                    <li></li>
                                                    <li>成色名称</li>
                                                    <li>宝石名称</li>
                                                    <li>首饰类别</li>
                                                </ul>
                                                <ul>
                                                    <li>计重类</li>
                                                    <li>
                                                    <DropDownMenu
                                                    titleName="不选"
                                                    dataType="customDia"
                                                    dataDataType="成色名称-计重"
                                                    :propList="dialogOptions.conditionList"
                                                    :resetFlag='resetFlag'
                                                    @infoBack="diaInfoBack"
                                                    >
                                                    </DropDownMenu>
                                                    </li>
                                                    <li>
                                                    <DropDownMenu
                                                    titleName="不选"
                                                    dataType="customDia"
                                                    dataDataType="宝石名称-计重"
                                                    :propList="dialogOptions.conditionList"
                                                    :resetFlag='resetFlag'
                                                    @infoBack="diaInfoBack"
                                                    >
                                                    </DropDownMenu>
                                                    </li>
                                                    <li>
                                                    <DropDownMenu
                                                    titleName="大类"
                                                    dataType="customDia"
                                                    dataDataType="首饰类别-计重"
                                                    :propList="dialogOptions.jewelryList"
                                                    :resetFlag='resetFlag'
                                                    @infoBack="diaInfoBack"
                                                    >
                                                    </DropDownMenu>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>计件类</li>
                                                    <li>
                                                    <DropDownMenu
                                                    titleName="不选"
                                                    dataType="customDia"
                                                    dataDataType="成色名称-计件"
                                                    :propList="dialogOptions.conditionList"
                                                    :resetFlag='resetFlag'
                                                    @infoBack="diaInfoBack"
                                                    >
                                                    </DropDownMenu>
                                                    </li>
                                                    <li>
                                                    <DropDownMenu
                                                    titleName="不选"
                                                    dataType="customDia"
                                                    dataDataType="宝石名称-计件"
                                                    :propList="dialogOptions.conditionList"
                                                    :resetFlag='resetFlag'
                                                    @infoBack="diaInfoBack"
                                                    >
                                                    </DropDownMenu>
                                                    </li>
                                                    <li>
                                                    <DropDownMenu
                                                    titleName="大类"
                                                    dataType="customDia"
                                                    dataDataType="首饰类别-计件"
                                                    :propList="dialogOptions.jewelryList"
                                                    :resetFlag='resetFlag'
                                                    @infoBack="diaInfoBack"
                                                    >
                                                    </DropDownMenu>
                                                    </li>
                                                </ul>
                                            </div>
                                            </div>

                                            <div class="foot" solt="footer">
                                            <div class="btn-wrap">
                                                <div @click.stop="resetOption" class="reset btn">重置</div>
                                                <div @click.stop="compOption" class="comp btn">完成</div>
                                            </div>
                                            </div>

                                        </div>
                                        </span>
                            </div>
                            <!-- 表格筛选 end -->
                            
                            <!-- 新增的一些筛选 -->
                            <div class="class_btn_wrap">
                                <dropDownColum
                                    ref="productTypeIdWrap"
                                    :propsList="proList"
                                    :keyName="'productTypeId'"
                                    titleData="产品类别"
                                    @dataBack="dataBack"
                                >
                                </dropDownColum>

                                <dropDownColum
                                    ref="colourIdWrap"
                                    :propsList="conditionList"
                                    :keyName="'colourId'"
                                    titleData="成色名称"
                                    @dataBack="dataBack"
                                >
                                </dropDownColum>

                                <dropDownColum
                                    ref="jeweIdWrap"
                                    :propsList="jewelList"
                                    :keyName="'jeweId'"
                                    titleData="宝石名称"
                                    @dataBack="dataBack"
                                >
                                </dropDownColum>

                                <dropDownColum
                                    ref="jewelryIdWrap"
                                    :propsList="jewelryList"
                                    :keyName="'jewelryId'"
                                    titleData="首饰类别"
                                    @dataBack="dataBack"
                                >
                                </dropDownColum>
                            </div>
                            
                            <!-- <div class="iconfont_wrap fr">
                                        <span :class="inconspanactive1 == true ? 'myspanactive' : ''" @click="toggleAttribute(1)">成品</span>
                                        <span style="color: #d6d6d6;margin:0 1px;font-size: 13px;">丨</span>
                                        <span :class="inconspanactive2 == true ? 'myspanactive' : ''" @click="toggleAttribute(2)">旧料</span>
                            </div> -->

                            <ul class="header-wrap-btn">
                                <li v-if="curStatus.statusName != '锁定'" class="confirm-btn">
                                    <!--单个添加--> <input ref="inputDom" @keyup.enter="addNewGoods" style="width:150px;"  @focus="changeborder($event,1)" @blur="changeborder($event,2)"  v-model="enterOrderNum" type="text" placeholder="扫描/输入条码号以添加商品">
                                </li>
                                <!-- <li class="confirm-btn" @click.stop="appendBatchRow">
                                    批量添加
                                </li> -->
                                <li v-if="curStatus.statusName != '锁定'" class="confirm-btn" @click.stop="appendBatchRow">
                                    批量添加
                                </li>
                                <!-- <li class="confirm-btn" v-if="propOptons.reportType == 3 && stepIndex != 2">
                                    <div v-if="isSelDelect" @click="isSelDelect = false">批量删除</div>
                                </li> -->
                                <li class="confirm-btn" v-show="getOperateTakeOrderName">
                                    {{getOperateTakeOrderName}}
                                </li>
                                <li v-show="getOperateTakeOrderName" class="confirm-btn-small" @click="auditFun">
                                    {{getOptionsName}}
                                </li>
                            </ul>
                        </div>
                        <div class="rp_dataGridTemp" :class="tabShow" > <!--v-loading = "loading" element-loading-text="数据查询中"-->
                            <report-detail
                                :isSelDelect="isSelDelect"
                                :dataGridStorage="dataGridStorage" 
                                :tabSwitch="tabSwitch"
                                :isRole='receiptsIntroList.isRole'
                                @scrollClass="tabScrollShow"
                                @messageBack="messageBack"
                                :newList="newList"
                                @lazyloadSend="sendlayLoad"
                                @sortList="sortListAct" 
                                :reportType="getReportType()">
                            </report-detail>
                        </div>
                        <div class="btn-list">
                            <div class="btn" @click="exportTab()">
                                <span class="iconfont icon-daochu"></span>
                                <span>导出表格</span>
                            </div>
                            <div class="btn" @click="loadPagePrint()">
                                <span class="iconfont icon-dayin"></span>
                                <span>打印单据</span>
                            </div>
                            <div class="btn" @click="remarkDialog = true">
                                <span class="iconfont icon-beizhu"></span>
                                <span>备注</span>
                            </div>
                            <div class="btn" @click="delOrder" v-if="receiptsIntroList.isRole == 'Y'">
                                <span class="iconfont icon-shanchu1"></span>
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div> 
                <!-- 备注弹窗 -->
                <el-dialog :visible.sync="remarkDialog" customClass="remarkDig">
                    <div class="remark-body">
                        <div class="title">
                            <img src="./../../../../static/img/piliang.png">
                            <div>备注</div>
                        </div>
                        <div class="body">
                            <textarea placeholder="请输入文字..." v-model="remarkText" class="area"></textarea>
                        </div>
                        <div class="footer">
                            <div class="btn" @click="closeMask(4)">确定</div>
                        </div>
                    </div>
                </el-dialog>
                <!-- 删除单据 -->
                <delect-receipts
                    v-on:delectReceiptsState="delectReceiptsState"
                    :delPopup='popup.deleteReceipts'
                    :receiptsOrderNum='popup.receiptsOrderNum'
                ></delect-receipts>
                <!-- 审核弹窗 -->
                <audit-receipts
                    v-on:delectReceiptsState="delectReceiptsState"
                    :auditPopup='popup.auditPopup'
                    :receiptsOrderNum='receiptsIntroList.orderNum'
                    :auditsReceiptsForm='receiptsIntroList.checkType'
                ></audit-receipts>
                <!-- 批量添加 -->
                <BatchAddReceipts
                    v-if="popup.batchAddReceiptsPopup"
                    :isPopup="popup.batchAddReceiptsPopup"
                    :supplierListData="supplierListData1"
                    v-on:addReceiptsState="delectReceiptsState"
                >    
                </BatchAddReceipts>
            </div>
            <!--打印模块-->
                <div ref="tablePrint" v-if="isPrint==1" >
                    <table-print 
                        :tabSwitch = "tabSwitch"
                        :reportType="getReportType()"
                        :printSelectDate = "printSelectDate"
                        :receiptsIntroList="receiptsIntroList"
                        @sortList="sortListAct"
                        :positionSwitch="positionSwitch"
                        :dataGridStorage="printDataGrid">
                    </table-print>
                </div>
            </div>
        </div>
        
			<!--打印模块-->
			<div style="display: none;">
				<detail-template v-if="this.tabClassActive.index==0" title="调柜" :reportType="5" ref="detailTemplate" :sellList="dataGridStorage" :headerData="receiptsIntroList"></detail-template>
				<intelligence-type-template v-if="this.tabClassActive.index==1" title="调柜" :reportType="5" ref="intelligenceTypeTemplate" :sellList="dataGridStorage" :headerData="receiptsIntroList"></intelligence-type-template>
				<project-type-template v-if="this.tabClassActive.index==2" title="调柜" :reportType="5" ref="projectTypeTemplate" :sellList="dataGridStorage" :headerData="receiptsIntroList"></project-type-template>
				<custom-template v-if="this.tabClassActive.index==3" title="调柜" :reportType="5" ref="customTemplate" :sellList="dataGridStorage" :headerData="receiptsIntroList"></custom-template>
			</div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
// import newTemplate from './../CommonalityComponent/formTemplate/NewTemplate'
import receiptsRemark from '../../../components/work/ReceiptsRemark.vue'
import {productTpyeState, receiptOptionsName, productDetailStatus} from './../../../Api/commonality/status'
import {seekSettingUserRole, seekReceiptDGSynopsis, seekReceiptStatusList, seekGoodsList, seekShowCounterList} from './../../../Api/commonality/seek'
import {seekTransDGData, operateProductList, getReportsPrintTK, operateRemarkOperation, operateReceiptOperation, operateDeleteByOrderNumber, operateHandleXGReceipt, operateSubmitAudit} from './../../../Api/commonality/operate'
import error from "./../CommonalityComponent/popupTemplate/error"
import affirm from "./../CommonalityComponent/popupTemplate/affirm"
import DropDownMenu from './../../../components/template/DropDownMenu1'

import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
import BatchAddReceipts from '../../../components/work/BatchAddReceipts'
import delectReceipts from './../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
import TransferCabinetReceiptsIntro from '../../../components/work/TransferCabinetReceiptsIntro.vue'
// import ReportDetail from './../CommonalityComponent/formTemplate/reportDetailTab'
import ReportDetail from './../CommonalityComponent/formTemplate/newDataGrid/reportDetailTab'

import FormatImg from 'components/template/DefaultHeadFormat.vue'
import stepsPath from './components/stepsPath'
import orderRemark from './components/orderRemark'
import selectDrop from './components/dropDownMenu'
//打印模块
// import TablePrint from './../../Work/CommonalityComponent/print/dataGridPrint'
import TablePrint from './../../Work/CommonalityComponent/formTemplate/newPrint/reportDetailTab'
//打印模板，明细，产品分类，智能分类=自定义
import detailTemplate from "@/components/jcp-print/bill/commons/detail-template";
import projectTypeTemplate from "@/components/jcp-print/bill/commons/project-type-template";
import intelligenceTypeTemplate from "@/components/jcp-print/bill/commons/intelligence-type-template";
import customTemplate from "@/components/jcp-print/bill/commons/intelligence-type-template";

// 导出报表
import {downLoaderFile} from 'Api/downLoaderFile'

// 筛选的组件
import dropDownColum from '@/components/dropDownColums'

import {getProductTypeList, seekProductClassList, seekGetShopListByCo, showCounterList, seekRepositoryList} from "Api/commonality/seek"

export default {
		components: {
        receiptsRemark,
        error,
        affirm,
        auditReceipts,
        delectReceipts,
        BatchAddReceipts,
        TransferCabinetReceiptsIntro,
        ReportDetail,
        TablePrint,
        stepsPath,
        orderRemark,
        selectDrop,
        DropDownMenu,
        FormatImg,
	    detailTemplate,
		projectTypeTemplate,
		intelligenceTypeTemplate,
        customTemplate,
        dropDownColum,
    },
    data () {
        return {
            inconspanactive1: true,
            inconspanactive2: false,
            isSelDelect: true, // 批量删除操作
            "receiptsIntroList": {}, // 单据简介
            "introListOption": false, // 关闭单据简介的编辑
            "supplierListData1": [
                {
                    name: "全部",
                    type: ""
                },
                {
                    name: "发货",
                    type: "03"
                },
                {
                    name: "调柜",
                    type: "06"
                },
            ],
            enterOrderNum: '', //输入的单据号
            toRouterUrlName: '调柜',
            //大、小类 tab切换
            tabData : [
                { txt:'明细', fun : this.tabs, type:1},
                { txt:'智能分类', fun : this.tabs, type:2},
                { txt:'产品分类', fun : this.tabs, type:3},
                { txt:'自定义', fun : this.tabs, type:4},
            ],
            tabClassActive :{
                index : 0,
                activeClass : 'active'
            },
            nowStatus: '',
            //
            propOptons: {
                beginTime : '',
                endTime : '',
                storageId : '', //入库ID
                productTypeId : '',//产品类别ID
                supplierId :'', //供应商ID
                shopId : '',//分销商ID
                makeUserID : '',//制单人ID
                checkUserId : '',//审核人ID
                reportType : 3 //报表类型 ，为1时代表成色大类，为2时是成色小类，为3时是明细 ,默认为明细
            },
            //
            tabShow: 'tabShow',
            loading:false,
            dataGridStorage : {},
            printDataGrid : {}, //打印数据
            dataGridDetailList : [],
            //成本核算
	        tabSwitch : false,
            value1: false,
            newAddtableData: [], // 新添加的数据
            amandTableData: [], //修改过后的数据
            tableInitRowData: [], // 初始商品数据
            newRowData: [], // 当前操作的一行数据
            tableIndex: '',
            value: [],
            tableIndex: null,
            refreshRemark: false, // 刷新备注
            remarkText: '',
            isDel: false,
            remarkId: '',
            isShowMask: false, // 备注弹窗
            isREfresh: true,  // 是否刷新
            scrollLeft: 0,  // 表格头部距离
            tableRowData: [
                // leftRowData: [],
                // rightRowData: []
            ],
            isEditFlag: false,
            receiptData: '', //单据创建时间
            stepIndex: [], // 进度条index
            "totalNumData": {
                "totalNum": 1
            },
            "introListOption": false, // 关闭单据简介的编辑
            "tittleThs": [
                {"name": '序号'},
                {"name": '商品编码'},
                {"name": '产品类别'},
                {"name": '首饰名称'},
                {"name": '总件重（g）'},
                {"name": '净金重'},
                {"name": '证书号'},
                {"name": '主石'},
                {"name": '颜色'},
                {"name": '净度'},
                {"name": '副石'},
                {"name": '售价'}
            ],
            "configData": {
                "barcode": null, // 条形码
                "productName": null, // 产品类别
                "jewelry": null, // 首饰名称
                "weight": null, // 总件重
                "netWeight": null, // 净金重
                "certifiNo": null, // 证书号
                "jewelryName": null, // 主石
                "color": null, // 颜色
                "neatness": null, // 净度
                "subJewelryName": null, // 副石
                "price": null // 售价
            },
            "pageSize": 10,
            "datas": {
                "postDataList": [], // 请求回来的数据集合(配置好的)
                "newGapDatas": [] // 新的空白数据
            },
            "popup": {
                "fullscreenLoading": false, // 保存过程的过场动画
                "successData": null, // 制单成功数据
                "deleteReceipts": false, // 删除单据弹窗
                "batchAddReceiptsPopup": false,
                "auditPopup": false // 审核弹窗
            },
            "crudData": { // 增查更删数据
                "currentPage": 1, // 当前页
                "checked": false, // 监听全选
                "checkList": [], // 选择按钮（选中的数据集合）删除
                "operationCut": true // 操作按钮切换
            },
            userType: '',
            receiptInfoList: [],
            isMakeMan: false,
            isRole: '',
            isPrint : 0,
            printSelectDate : {
                shop :'', //店铺
                preparedBy: '',//制单人
                orderNum : this.$route.query.orderNumber,
                headerData : '调柜', //制单大标题
                reportType : '5' //1代表入库、2退库、3调库、4发货、5调柜、6退货
            },
            multipleIdentities: '', // 多重身份
            counterList: [],
            statusREfresh: false,
            curStatus : {
                statusName: 'loading...',
                statuscurClass: 'stayAudit',
                status : -1,
                //鼠标上、下滑操作
                slipPointer: false 
            },
            isRemark : false,
            remarkDialog: false,
            //浏览器检测
            browserType : false,
            dataGridOptions: {
                orderNum : this.$route.query.orderNumber,
                productClass: '1',
                sortFlag: '0',
                sortList: [{barcode: '1'}],
                type: 1,
                page: 1,
                pageSize: 15,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1',
                specialId:''
            },
            dialogOptions: {
            conditionList: [
                '不选', '大类', '小类'
            ],
            jewelryList: [
                '大类', '小类'
            ]
            },
            positionSwitch: false,
            customDialog: false, // 自定义列表弹窗
            resetFlag: false,
            isShowCost: '',
            sortList: [{name: '条码号', value: '1'}],
            newList: [{name: '条码号', value: '1'}],

            // 假数据
            proList:[],
            conditionList:[],
            jewelList:[],
            jewelryList:[],
        }
    },
    created () {
        this.$store.dispatch('checkBrowser',(type)=>{
            this.browserType = type
        })
        this.selectConfig = fetch.Select
        this.getSeekSellReceiptsIntro(); // 单据简介
        this.send();
        this.receiptStatusList();
        this.settingUserRole()
        this.multipleIdentities = sessionStorage.getItem('multipleIdentities')
        // this.getReceiptRemark(); // 单据备注
        this.userType = sessionStorage.getItem('userType')

        // 初始化筛选列表
        this.seekProductTypeList()
        this.productClassList(1)
        this.productClassList(2)
        this.productClassList(3)


    },
    mounted () {
        let self = this
        this.$refs.customDia.style.display = 'none'
        // this.$refs.body_header.style.left = this.$refs.body_box.getBoundingClientRect().left + 'px'
        // this.$refs.body_row5.style.left = this.$refs.body_box.getBoundingClientRect().left + 'px'
        // self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left -10 + 'px'
        // self.$refs.temp_wrap.style.height = self.$refs.body_row5.getBoundingClientRect().top - 65 + 'px'
        // window.onresize = function(){
        //     if (self.$refs.body_header) {
        //         self.$refs.body_header.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
        //         self.$refs.body_row5.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
        //         self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left -10 + 'px'
        //     }
        //     if (self.$refs.temp_wrap) {
        //         self.$refs.temp_wrap.style.height = self.$refs.body_row5.getBoundingClientRect().top - 65 + 'px'
        //     }
        // }
        //   $(".new-table-wrap").mCustomScrollbar({
        //     theme: "minimal-dark",
        //     autoHideScrollbar: true,
        //     scrollInertia: 500,
        //     mouseWheel: {
        //         scrollAmount: 200,
        //         preventDefault: false,
        //         normalizeDelta: false,
        //         // disableOver: ['div']
        //     },
        //     callbacks: {
        //         whileScrolling: function () {
        //             self.$refs.temp_wrap.style.height = self.$refs.body_row5.getBoundingClientRect().top - 65 + 'px'
        //         }
        //     }
        // });
        this.$nextTick(()=>{
            this.Inteval = setInterval(()=>{
                if( this.receiptsIntroList ){
                    clearInterval(this.Inteval)
                    this.formatTime()
               }
            },10)
        }),
        // eventBus.$on('messageBack', function () {
        //     self.getSeekSellReceiptsIntro(); // 单据简介
        //     self.send();
        //     self.receiptStatusList();
        // })
        eventBus.$on('delectBack', function (val) {
            if (val.refresh == true) {
                self.getSeekSellReceiptsIntro(); // 单据简介
                self.send();
                self.receiptStatusList();
            } else if (val.clean == true) {
                self.isSelDelect = true
            }
            
        })
        // eventBus.$on("scrollTop", function (val) {
        //     self.$refs.temp_wrap.style.marginTop = val.itemTop + 80 + "px"
        // })
    },
    computed: {
        ...mapGetters([
            "userInfo", // 用户基本信息
            "saveSuccess", // 保存弹窗
            "saveSuccessData", // 保存弹窗数据
            "shopListByCo", // 店铺列表
            "supplierListData", // 供应商
            "repositoryList" // 库位列表
        ]),
        orderNum() {
            return this.$route.query.orderNumber
        },
        // isRole() {
        //     return this.receiptsIntroList.isRole
        // },
        isCheckOrderMan() {
            return this.receiptsIntroList.isCheckOrderMan
        },
        paginationSize () { // 分页的大小
            return Number(this.totalNumData.totalNum) + this.datas.newGapDatas.length;
        },
        showDatas () { // 最终显示的数据
            return [...this.datas.postDataList, ...this.showNewAddData];
        },
        endGetPage: function () { // 后台最后一页
            var totalNum = Number(this.totalNumData.totalNum); // 后台总条数
            var allNum = Math.ceil(totalNum / 10); // 最后一页
            return allNum;
        },
        endGetData: function () { // 后台最后一页所占的条数
            var totalNum = Number(this.totalNumData.totalNum); // 后台总条数
            var allNum = Math.floor(totalNum / 10); // 能填满的页数
            return totalNum - allNum * 10;
        },
        showNewAddData: function () { // 当前页显示的空白数据
            let currentPage = Number(this.crudData.currentPage); // 当前页
            let endGetData = this.endGetData; // 后台最后一页所占的条数
            let endGetPage = this.endGetPage; // 最后一页
            if (this.endGetData > 0) { // 后台最后一页数据不满的情况下
                if (currentPage === endGetPage) { // 是后台最后一页
                    let endNum = 10 - endGetData; // 每页显示的条数 - 最后一页的后台数据
                    return this.datas.newGapDatas.slice(0, endNum);
                } else { // 大于后台最后一页
                    let startNum = (currentPage - endGetPage - 1) * 10 + (10 - endGetData);
                    let endNum = startNum + 10;
                    return this.datas.newGapDatas.slice(startNum, endNum);
                }
            } else {
                let startNum = (currentPage - endGetPage - 1) * 10;
                let endNum = startNum + 10;
                return this.datas.newGapDatas.slice(startNum, endNum);
            }
        },
        newPage () { // 总页数
            return Math.ceil(this.paginationSize / this.pageSize);
        },
        getOptionsName () { // 操作名字
            return receiptOptionsName(this.receiptsIntroList.checkType);
        },
        getOperateTakeOrderName () {
            if (this.receiptStatus) {
                if (this.receiptStatus === "1") { // 未收货
                    return "收货"
                } else {
                    return false
                }
            }
        },
        printOptions () { // 打印单据
            let isCheckOrderMan = this.receiptsIntroList.isCheckOrderMan === "Y";
            let isUser = this.receiptsIntroList.makeOrderManId === sessionStorage.getItem("id");
            if (isUser) { // 制单人
                return true;
            } else if (isCheckOrderMan) { // 审核人
                if (this.receiptsIntroList.checkType === "2") { // 审核中
                    return true;
                }
            } else { // 其它
                if (this.receiptsIntroList.checkType !== "3") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        rcvFlag () { // 收货方
            var rcvFlag = sessionStorage.getItem("rcvFlag") || false;
            if (rcvFlag === "Y") {
                return true;
            } else {
                return false;
            }
        },
        delectOptionRole () {
            let checkType = this.receiptsIntroList.checkType === "1";
            let isRole = this.receiptsIntroList.isRole === "Y";
            if (isRole && checkType) {
                return true;
            } else {
                return false;
            }
        },
        addRole () {
            let checkType = this.receiptsIntroList.checkType === "1";
            let isRole = this.receiptsIntroList.isRole === "Y";
            if (isRole && checkType) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        ...mapActions([
            "workPopupError" // 错误弹窗
        ]),
        changeborder(event,val){
           if(val== 1){
               (event.target).style.border="1px solid #2993f8";
           }else{
               (event.target).style.border="1px solid #ededed";
           }
        },
        messageBack () {
            this.getSeekSellReceiptsIntro(); // 单据简介
            this.send();
            this.receiptStatusList();
        },
        choseMenu (type) {
            if (type == 1) {
                this.positionSwitch = !this.positionSwitch
            } else if (type == 2) {
                this.tabSwitch = !this.tabSwitch
            }

            if(this.tabSwitch) {
                this.dataGridOptions.specialId = '1'
            } else {
                this.dataGridOptions.specialId = ''
            }
        },
        resetOption () {
            this.dataGridOptions.wColorId = ''
            this.dataGridOptions.wGemId = ''
            this.dataGridOptions.wJewelryId = '1'
            this.dataGridOptions.nColorId = ''
            this.dataGridOptions.nGemId = ''
            this.dataGridOptions.nJewelryId = '1'
            this.resetFlag = true
            this.send()
        },
        compOption () {
            if (this.dataGridOptions.type != 4) {
                this.dataGridOptions.type == 4
                this.setReportType(type)
            } else {
                this.send()
            }
            this.customDialog = false
        },
        setReportType( port ){
          if( port )  { 
            if (port == 1) {
              Object.assign(this.dataGridOptions, {
                // productClass: '1',
                orderNum : this.$route.query.orderNumber,
                sortFlag: '0',
                type: 1,
                page: 1,
                pageSize: 15,
                keyWord: ''
              })
            } else if (port == 2) {
              delete this.dataGridOptions.page
              delete this.dataGridOptions.pageSize
              delete this.dataGridOptions.keyWord
              delete this.dataGridOptions.wColorId
              delete this.dataGridOptions.wJewelryId
              delete this.dataGridOptions.nColorId
              delete this.dataGridOptions.nGemId
              delete this.dataGridOptions.nJewelryId
              Object.assign(this.dataGridOptions, {
                // productClass: '1',
                orderNum : this.$route.query.orderNumber,
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })
            } else if (port == 3) {
              delete this.dataGridOptions.page
              delete this.dataGridOptions.pageSize
              delete this.dataGridOptions.keyWord
              delete this.dataGridOptions.wColorId
              delete this.dataGridOptions.wJewelryId
              delete this.dataGridOptions.nColorId
              delete this.dataGridOptions.nGemId
              delete this.dataGridOptions.nJewelryId
              Object.assign(this.dataGridOptions, {
                // productClass: '1',
                orderNum : this.$route.query.orderNumber,
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
              })
            } else if (port == 4) {
              Object.assign(this.dataGridOptions, {
                // productClass: '1',
                orderNum : this.$route.query.orderNumber,
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1'
              })
            }
          }
          this.dataGridOptions.type = port
          this.send()
        },
        settingUserRole () { // 用户查看成本权限
          let options = {
            userId: sessionStorage.getItem('id')
          }
          seekSettingUserRole(options).then((res) => {
            if (res.data.state == 200) {
              this.isShowCost = res.data.data.costFlag
              // if (res.data.data.costFlag == 'Y') {
              //   this.tabSwitch = true
              // } else {
              //   this.tabSwitch = false
              // }
            }
          }, (res) => {

          })
        },
        tabs(index, type, evt){
          if (this.dataGridOptions.type == 4 && index == 3) {
            this.customDialog = true
          }
          this.loading = true;
          //this.page = 1
          this.dataGridOptions.page = 1
          this.dataGridOptions.pageSize = 15
          this.tabClassActive.index = index;
          this.setReportType(type)
          
        },
        tabHover(index, evt) {
          //if (this.dataGridOptions.type == 4 && index == 3) {
            this.$refs.customDia.style.zIndex = "10"
            this.$refs.customDia.style.opacity = '1'
            this.$refs.customDia.style.display = 'block'
          //}
        },
        tabOut(index, evt) {
          //if (this.dataGridOptions.type == 4 && index == 3) {
            this.$refs.customDia.style.zIndex = "-1"
            this.$refs.customDia.style.opacity = '0'
            this.$refs.customDia.style.display = 'none'
          //}
        },
        cancelSort (item, index) { // 取消排序
            this.sortList.splice(index, 1)
            this.newList = this.sortList
        },
        sortListAct (val) { // 列表排序
            this.dataGridOptions.sortList = val
            this.send()
            this.sortList = []
            val.forEach((item, index) => {
                switch (Object.keys(item)[0]) {  
                    case 'barcode':
                        this.sortList.push({name: '条码号', value: item.barcode})
                    break;
                    case 'weight':
                        this.sortList.push({name: '件重', value: item.weight})
                    break;
                    case 'className':
                        this.sortList.push({name: '首饰名称', value: item.className})
                    break;
                    case 'classTypeName':
                        this.sortList.push({name: '产品类别', value: item.classTypeName})
                    break;
                    case 'goldWeight':
                        this.sortList.push({name: '金重', value: item.goldWeight})
                    break;
                    case 'price':
                        this.sortList.push({name: '售价', value: item.price})
                    break;
                    case 'cost':
                        this.sortList.push({name: '成本', value: item.cost})
                    break;
                    case 'num':
                        this.sortList.push({name: '件数', value: item.num})
                    break;
                }
                
            })
        },
        diaInfoBack (val) { // 弹框信息返回
          this.resetFlag = false
          //val.type 1.成色名称-计重  2.宝石名称-计重  3.首饰类别-计重  4.成色名称-计件  5.宝石名称-计件  6.首饰类别-计件
          switch (val.type) {
            case 1:
              this.dataGridOptions.wColorId = val.value
            break;
            case 2:
              this.dataGridOptions.wGemId = val.value
            break;
            case 3:
              this.dataGridOptions.wJewelryId = val.value
            break;
            case 4:
              this.dataGridOptions.nColorId = val.value
            break;
            case 5:
              this.dataGridOptions.nGemId = val.value
            break;
            case 6:
              this.dataGridOptions.nJewelryId = val.value
            break;
          }
        },
        toggleAttribute (val) {
          if (val == 1) {
                this.inconspanactive1 = true;
                this.inconspanactive2 = false;
            } else {
                this.inconspanactive1 = false;
                this.inconspanactive2 = true;
            }
            this.dataGridOptions.page = 1;
            this.dataGridOptions.pageSize = 15;
            this.dataGridOptions.productClass = val;
            console.log("切换成旧料", this.dataGridOptions.productClass);
            //this.dataGridOptions.productClass = this.dataGridOptions.productClass == 1 ? 2 : 1
            this.loading = true;
            this.send();
          
        },
        //成本控制
        reportSwitch(){
          this.tabSwitch = !this.tabSwitch  
        },
        showCounterList () { // 柜组列表
            let options = {
                shopId: this.receiptsIntroList.shopId
            }
            seekShowCounterList(options).then((res) => {
                this.counterList = res.data.data.counterList
            }, (res) => {
            })
        },
        // 数据返回
        dropReturn (data){
            let options = {
                modifyList: [
                    {
                        dataType: '2',
                        objectData: data.item.operateId
                    }
                ],
                orderNum: this.$route.query.orderNumber,
                modelType: '2'
            }
            operateHandleXGReceipt(options).then((res) => {
                this.getSeekSellReceiptsIntro()
            }, (res) => {
            })  
        },
        // 滚动条滑动 两种状态  上滑 下滑
        updataSlipPointer (type){
        this.$set(this.curStatus, 'slipPointer', type)
        },
        scrolling (val) {
            this.$set(this.curStatus, 'slipPointer', true)
        },
        scrollBack (val) { // 重新滚动回头部的回调
            
            if (val == 'back') {
                this.$set(this.curStatus, 'slipPointer', false)
            }
            
        },
        // 更新备注显示权限
        updateRemark (type) {
            this.isRemark = type
        },
        getStatus (status){
            this.statusREfresh = false
            if (status) this.curStatus = status
        },
        checkAllItem () {
            eventBus.$emit('checkAll', 1)
        },
        batchDeletion (type) {
            let self = this
            eventBus.$emit('delectAct', {type: type})
        },
        
        // 打印表格之前 先加载所有的数据
        loadPagePrint(){
          Object.assign(this.dataGridOptions, {
            page : 1,
            pageSize : 9999
          })
          
          this.send('print', this.tabPrin)
        },
        
         //打印表格 
        tabPrin(){
        	switch (this.tabClassActive.index){
						case 0:
							this.$refs.detailTemplate.print();
							break;
						case 1:
							this.$refs.intelligenceTypeTemplate.print();
							break;
						case 2:
							this.$refs.projectTypeTemplate.print();
							break;
						case 3:
							this.$refs.customTemplate.print();
							break;
						default:
							break;
					}
        },
        addNewGoods () { //添加新商品
            var rowData = JSON.stringify(this.configData);
            var newRowData = JSON.parse(rowData);
            // this.enterOrderNum
            this.queryBarCode(this.enterOrderNum, 0, 1)
            this.getSeekSellReceiptsIntro(); // 单据简介
            this.send();
            this.receiptStatusList();
        },
        //获取当前的接口类型
        getReportType(){
        	return this.dataGridOptions.type
        },
        // setReportType( port ){
        // 	if( port ) this.dataGridOptions.type = port
        // },
        //滚动条滚动时不显示总计
    	tabScrollShow( type ){
    		this.tabShow = type ? 'tabShow' : ''
    	},
        // tabs(index,type){
    	// 	this.loading = true;
    	// 	this.tabClassActive.index = index;
    	// 	this.setReportType(type)
    	// 	this.send()
    	// },
        formatTime () {
            let year = this.receiptsIntroList.createDate.substring(0, 4)
            let month = this.receiptsIntroList.createDate.substring(4, 6)
            let data = this.receiptsIntroList.createDate.substring(6, 8)
            let hour = this.receiptsIntroList.createDate.substring(8, 10)
            let time = this.receiptsIntroList.createDate.substring(10, 12)
            this.receiptData = year + "-" + month + "-" + data + " " + hour + ":" + time
        },
        delOrder () {
            if (this.nowStatus == 2) {
                this.$store.dispatch('workPopupError', '审核中无法删除')
            } else {
                let options = {
                    orderNum: this.$route.query.orderNumber
                }
                this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(() => {
                    operateDeleteByOrderNumber(options).then((res) => {
                        if (res.data.state == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            });
                        }
                        this.$router.push({path: '/work/transferCabinet'})
                    }, (res) => {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
            
        },
        // 关闭单据备注弹窗
        closeMask (type) {
            this.isShowMask = false
            if (type == 2) {
                let option = {
                        remarkId: this.remarkId,
                        type: '1'
                }
                operateRemarkOperation(option).then((res) => {
                    this.refreshRemark = !this.refreshRemark
                    this.remarkDialog = false
                }, (res) => {
                })
            } else if (type == 4) {
                if (this.remarkText.length < 1) {
                    this.$message({
                        type: 'info',
                        message: '请输入备注内容'
                    })
                    return
                }
                let options = {
                    modifyList: [
                        {
                            dataType: '5',
                            objectData: this.remarkText
                        }
                    ],
                    orderNum: this.$route.query.orderNumber,
                    modelType: '4'
                }
                operateHandleXGReceipt(options).then((res) => {
                    this.refreshRemark = !this.refreshRemark
                    this.remarkDialog = false
                }, (res) => {
                })
            }
        },
        delRemark (val) {
            this.isShowMask = val.type
            this.remarkId = val.item.id
            this.isDel = true
        },
        // 提交审核
        operateSubmit () {
            let options = {}
            this.$confirm('确定要撤回审核吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(() => {
                options = {
                    "handleType": 6,
                    "orderIdList":[{"orderNum": this.$route.query.orderNumber}], //单据号
                    "checkRemark": ''
                }
                operateReceiptOperation(options).then((res) => {
                    if (res.data.state == 200) {
                        this.$message({
                        message: '撤销审核成功',
                        type: 'success'
                        });
                        this.getSeekSellReceiptsIntro(); // 单据简介
                        this.send();
                        this.receiptStatusList();
                        this.statusREfresh = true
                    } else {
                        this.$message({
                        message: res.data.msg,
                        type: 'warning'
                        });
                    }
                    
                }, (res) => {
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        },
        onScroll (e) { // 滚动加载
            var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
            var clientHeight = e.currentTarget.clientHeight; // 元素的高度
            var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
            if (clientHeight + scrollTop >= scrollHeight) {
                // this.getNewGoodsInfoList(this.cbFun);
            }
        },
        // 获取商品数据
        updateGoodsList () {
            let options = {
                "page": "1", // 当前页
                "pageSize": "10", // 每页显示数
                "objId": this.$route.query.orderNumber,
                "type": "3" // 操作类型 3=单据号; 5=条码号
            }
            getUpdateGoodsList(options).then((res) => {
            }, (res) => {
            })
        },
        goClick () {
            this.$refs.tableList.click();
        },
        // 点击展开按钮列表
        // openBtnList () {
        //     if (this.$refs.btn_list.style.width == '0px') {
        //         this.$refs.btn_list.style.width = 'auto'
        //     } else if (this.$refs.btn_list.style.width == 'auto') {
        //         this.$refs.btn_list.style.width = '0px'
        //     }
        // },
        addAct () {
            this.isDel = false
            this.isShowMask = true
        },
        propsAct () {
            this.isEditFlag = !this.isEditFlag
        },
        // 单据状态
        receiptStatusList () {
            let options = {
                orderId: this.$route.query.orderNumber
            }
            seekReceiptStatusList(options).then((res) => {
                // if (res.data.data.nowStatus == "6") {
                //     this.stepIndex = 2
                //     this.$refs.mask.style.width = "1250px"
                // } else {
                //     this.stepIndex = 1
                //     this.$refs.mask.style.width = "625px"
                // }
                this.nowStatus = res.data.data.nowStatus
                for (let i = 0; i < res.data.data.dataList.length; i++) {
                    if (res.data.data.dataList[i].status == res.data.data.nowStatus) {
                        this.receiptInfoList = res.data.data.dataList[i]
                    } else {
                        this.receiptInfoList.userName = ''
                    }
                }
                
            }, (res) => {
            })
        },
        handleSizeChange (val) {
        },
        handleCurrentChange (val) {
            var _self = this;
            this.crudData.currentPage = val;
            if (this.newPage <= val) { // 最后一页才给选择
                if (this.datas.newGapDatas.length > 0) { // 有空白数据的情况下
                    setTimeout(function () {
                        _self.getFocus();
                    }, 100);
                }
            }
            this.getGoodsList();
        },
        delectReceiptsState (parm) { // 监听确认删除弹窗和操作成功
            if (parm.type === "2") { // 单据操作成功/删除成功
                if (this.popup.deleteReceipts) { // 删除单据
                    this.close();
                } else {
                    this.$emit("getSeekSellReceiptsIntro"); // 单据操作成功
                }
            }
            if (parm.type === "3") {
                this.send();
                this.$emit("getSeekSellReceiptsIntro"); // 单据操作成功
            }
            this.popup.deleteReceipts = parm.name;
            this.popup.auditPopup = parm.name;
            this.popup.batchAddReceiptsPopup = parm.name;
            this.queryBarCode(this.enterOrderNum, 0, 1)
            this.getSeekSellReceiptsIntro(); // 单据简介
            this.send();
            this.receiptStatusList();
        },
        getFocus () {
            var endIndex = this.showDatas.length - 1;
            var endFacus = "xh" + endIndex;
            // this.$refs[endFacus][0].focus()
        },
        // appendRow () { // 新增
        //     var rowData = JSON.stringify(this.configData);
        //     var newRowData = JSON.parse(rowData);
        //     this.datas.newGapDatas.push(newRowData);
        //     this.controlPage();
        // },
        appendBatchRow () { // 批量新增
            this.popup.batchAddReceiptsPopup = !this.popup.batchAddReceiptsPopup;
        },
        goPreviousPage (parm) { // 返回上一页
            this.$router.push("/work/transferCabinet")
        },
        auditFun () { // 提交审核
            this.popup.auditPopup = true;
        },
        controlPage () { // 控制分页
            var _self = this;
            if (this.newPage > this.crudData.currentPage) {
                this.datas.postDataList = [];
                this.crudData.currentPage = this.newPage; // 控制分页
            }
            setTimeout(function () {
                _self.getFocus();
            }, 100);
        },
        getconfigData (parm) { // 得到配置代码
            let configDatas = {};
            for (let key in this.configData) {
                configDatas[key] = parm[key] || null
            }
            return configDatas;
        },
        delProduct (barcode, index, operate, showData) {
            if (showData.barcode) {
                this.queryBarCode(barcode, index, operate);
            } else {
                this.datas.newGapDatas.splice((index - this.datas.postDataList.length), 1);
            }
        },
        queryBarCode (barcode, index, operate, keys = 0) { // 通过条码号操作数据
            if (barcode) {
                let options = {
                    "productList": [
                        {
                            "barcode": barcode.trim()
                        }
                    ],
                    "operate": operate,
                    "orderNum": this.$route.query.orderNumber
                }
                operateProductList(options).then((response) => {
                    if (response.data.state === 200) {
                        this.$emit("closePopup", false)
                        this.$emit("getSeekSellReceiptsIntro")
                        if (operate === "1") { // 新增
                            // this.savaOperateSuccess(response.data.data, index);
                            this.send();
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else if (operate === "2") { // 删除
                            this.delOperateSuccess(index);
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                        this.enterOrderNum = ''
                        this.getSeekSellReceiptsIntro(); // 单据简介
                        this.send();
                        this.receiptStatusList();
                    } else {
                        if (response.data.state) {
                            this.$message({
                                message: response.data.msg,
                                type: 'warning'
                            });
                        } else {
                            if (keys >= 3) {
                                this.$message({
                                    message: '服务器繁忙',
                                    type: 'warning'
                                });
                            } else {
                                let self = this
                                setTimeout(() => {
                                    self.queryBarCode(barcode, index, operate, keys+1)
                                }, 1000)
                                
                            }
                        }
                        //this.$store.dispatch('workPopupError', response.data.msg)
                        this.$refs.inputDom.select()
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
        },
        savaOperateSuccess (parm, index) { // 保存成功后的回调
            if (this.datas.newGapDatas.length < 2) {
                this.datas.newGapDatas[0].barcode = null;
            } else {
                for (var i = 0; i < this.datas.newGapDatas.length; i++) {
                    if (this.datas.newGapDatas[i].barcode === parm.barcode) {
                        this.datas.newGapDatas.splice(i, 1);
                    }
                }
            }
            var datas = this.getconfigData(parm);
            this.datas.postDataList.push(datas);
            this.controlPage();
        },
        delOperateSuccess (index) { // 删除成功后的回调
            this.datas.postDataList.splice(index, 1);
        },
        getAuditStatus (parm) { // 审核状态
            return productDetailStatus(parm);
        },
        delectReceipts (parm) {
            this.popup.deleteReceipts = true;
            this.popup.receiptsOrderNum = this.$route.query.orderNumber;
        },
        close () { // 关闭
            this.$router.push(this.closeRouterUrl);
        },
        // *******************************************************************************************************************************
        /*
       	* 数据请求
        */
        // send() {
        //     this.propOptons.orderNum = this.$route.query.orderNumber
        //     this.loading = true;
        //     if( this.timeOut ) clearTimeout( this.timeOut )
        //     seekTransDGData( this.propOptons ).then((res) => {
        //         if (res.data.state === 200) {
        //             //数据表格数据
        //             this.dataGridStorage = res.data.data
        //         } else {
        //             this.$message({
        //             	type : 'error',
        //             	message : res.body.msg
        //             })
        //         }
                
        //         this.timeOut = setTimeout(()=>{
        //         	this.loading = false
        //         	if( this.timeOut ) clearTimeout( this.timeOut )
        //         },200)
               
        //     })
        // },
        sendlayLoad () {
          this.dataGridOptions.pageSize += 15
          seekTransDGData(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
              this.dataGridStorage = res.data.data
              this.loading = false
            }
          }, (res) => {

          })
        },
        send (type, callBack) {
          this.loading = true;
          seekTransDGData(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
              // 避免繁琐操作，打印数据单独请求
              if(type && type == 'print'){
                this.printDataGrid = res.data.data
                callBack && callBack()
                //打印数据请求完成之后 初始化分页设置
                Object.assign(this.dataGridOptions, {
                  page : 1,
                  pageSize : 15
                })
              }else{
                this.dataGridStorage = res.data.data
              }
              this.loading = false
            }
          }, (res) => {

          })
        },
        //懒加载
        lazyloadSend(){
           this.currentPage++
           this.send()
        },
        closeOptions () {
            this.introListOption = !this.introListOption
        },
        getproductTpye: function (parm) { // 商品属性
            return productTpyeState(parm);
        },
        getSeekSellReceiptsIntro () { // 单据简介
            let options = {
                "orderNum": this.$route.query.orderNumber
            }
            seekReceiptDGSynopsis(options).then((response) => {
                if (response.data.state === 200) {
                    this.receiptsIntroList = response.data.data;
                    this.isRole = response.data.data.isRole
                    this.showCounterList()
                    if (response.data.data.makeOrderManId == sessionStorage.getItem('id')) {
                        this.isMakeMan = true
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
            })
        },
        // getReceiptRemark () { // 单据备注
        //     let options = {
        //         "orderNum": this.$route.query.orderNumber
        //     }
        //   (options).then((response) => {
        //         if (response.data.state === 200) {
        //             this.receiptRemark = response.data.data;
        //         } else {
        //             alert(response.data.msg);
        //         }
        //     }, (response) => {
        //     })
        // }
        // 导出报表
        exportTab(){
            let exportTabData = Object.assign({},this.dataGridOptions)
            exportTabData['exportType'] = 'DG'
            if(exportTabData.type == 1){
                downLoaderFile('/v1/export/exportExcelByBusinss',exportTabData)
            } else {
                downLoaderFile('/v1/export/exportExcelBySmart',exportTabData)                
            }
        },


        // 新增的筛选条件
        seekProductTypeList () { // 产品类别列表
            getProductTypeList().then((res) => {
                if (res.data.state == 200) {
                this.isLoading = false
                let datas = res.data.data.list
                for (let i of datas) {
                    i.id = i.classesType
                    i.name = i.classesName
                    i.childrenList = i.typeList
                    for (let j of i.childrenList) {
                    j.name = j.classesName
                    j.id = j.classesId
                    }
                }
                this.proList = datas
                }
            })
        },
        productClassList (type) { // 商品大小类列表
            let options = {
                type: type
            }
            seekProductClassList(options).then((res) => {
                if (res.data.state == 200) {
                    this.isLoading = false
                    let datas =  res.data.data.list
                    for (let i of datas) {
                    i.id = i.classesId
                    i.name = i.classesName
                    for (let j of i.childrenList) {
                        j.name = j.classesName
                        j.id = j.classesId
                    }
                    }
                    if (type == 1) {
                        this.conditionList = datas
                    } else if (type == 2) {
                        this.jewelList = datas
                    } else {
                        this.jewelryList = datas
                    }
                }
            })
        },
        dataBack (parm) {
            console.log('回调',parm)
            let optionsList = []
            switch (parm.keyName) {
                case 'productTypeId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {productClassId:item}
                })
                this.dataGridOptions.productClassIdList = optionsList
                break;
                case 'colourId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {colourNameId:item}
                })
                this.dataGridOptions.colourNameIdList = optionsList
                break;
                case 'jeweId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {gemNameId:item}
                })
                this.dataGridOptions.gemNameIdList = optionsList
                break;
                case 'jewelryId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {jewelNameId:item}
                })
                this.dataGridOptions.jewelNameIdList = optionsList
                break;
                default:
                break;
            }
            this.send()
        },
    }
}
</script>
<style lang="scss" src="../../../assets/css/template/commodityList.scss" scoped></style>
<style lang="scss" src="../../../assets/css/template/documentsList.scss" scoped></style>
<style lang="scss" scoped>
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
 /* WebKit browsers */   
color: #d6d6d6;   
}   
input:-moz-placeholder, textarea:-moz-placeholder {   
/* Mozilla Firefox 4 to 18 */   
color: #d6d6d6;   
}   
input::-moz-placeholder, textarea::-moz-placeholder {   
 /* Mozilla Firefox 19+ */   
color: #d6d6d6;   
}   
input:-ms-input-placeholder, textarea:-ms-input-placeholder {   
 /* Internet Explorer 10+ */   
color: #d6d6d6;   
}  
.sortwrap-text{
    margin-top: 2px;
    line-height: 16px;
    width: 60px;
    text-align: center;
    position: relative;
    .sortwrap-img{
        position: absolute;
        top: 8px;
        right: -2px;
    }
}
.select-container-name{
  position: absolute;
  bottom: 10px;
  display: flex;
  .item{
  	width: 106px;
    font-size: 12px;
    color: #a9a8a7;
  }
  .item:last-child{
  	padding-left: 6px;
  }
}
    #body-row2{
        z-index:0;
    }
</style>
<style lang="scss" scoped>
.tab_wrap {
    width: 232px;
    height: 26px;
    margin-top: 12px;
    // margin-right: 10px;
    float: right;
    border:1px solid #d6d6d6;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    line-height: 24px;
    span {
      font-size: 12px;
      font-weight: bold;
      color: #666;
      cursor: pointer;
    }
    .myspanactive {
      color: #2993f8;
    }
}
.site {
    left: -210px;
}
.class_btn_wrap {
    width: 300px;
    height: 26px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    float: right;
    margin-right: 10px;
    margin-top: 12px;
}
.iconfont_wrap {
    width: 86px;
    height: 26px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    margin-top: 12px;
    margin-right: 10px;
    text-align: center;
    line-height: 26px;
    span{
      font-size: 12px;
      font-weight: bold;
      color: #666;
      cursor: pointer;
    }
    .myspanactive {
      color: #2993f8;
    }
  }
</style>
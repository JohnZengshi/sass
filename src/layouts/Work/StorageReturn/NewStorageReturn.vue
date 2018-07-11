<template>
    <div class="main-wrap" @click="closeOptions">
        <div class="body-box-left">    
            <div class="new-table-wrap" ref="temp_wrap">
                <div>
                    <div class="new-table-template">
                        <section class="body-box" ref="body_box">
                            <div class="body-header skin-shield">
                                <ul class="header-nav">
                                    <li @click="goPreviousPage"><i style="font-size: 20px; margin-right: 10px;" class="iconfont icon-tuiku"></i>退库<span>&nbsp;></span></li>
                                    <li class="on">单据详情</li>
                                </ul>
                                <div class="back-btn" @click="goPreviousPage">返回上一级</div>
                            </div>
                            <div class="body-row2 actions-status"
                                :data-status="curStatus.statusName"
                                :class="{'animat-scroll':curStatus.slipPointer, 'color1': nowStatus == 1, 'color2': nowStatus == 2,
                        'color3': nowStatus == 3, 'color4': nowStatus == 4, 'color5': nowStatus == 5, 'color6': nowStatus == 6,
                        'color7': nowStatus == 7, 'color8': nowStatus == 8}"
                                
                            >   
                                <div class="mask"></div>
                                <div class="statusInfo">
                                    <div class="left-main">
                                        <h5>{{receiptsIntroList.orderNum}}</h5>
                                        <div class="select-container">
                                            <div class="item supplier">
                                                <span v-text="receiptsIntroList.storageName"></span>
                                                <div class="item-name">库位</div>
                                            </div>
                                            <div class="item shop">
                                                    <!-- 注： orderData.shopName 店铺名需要另外一个接口去拿  5.38 单据简介  表尾组件已经做了接口调用，直接传过来即可 -->
                                                <select-drop
                                                    class="selected_dropdown"
                                                    :titleName="receiptsIntroList.supplierName" 
                                                    dataType="供应商"
                                                    v-if="nowStatus != 2 && nowStatus != 3 && nowStatus != 5 && nowStatus != 6 && isRole=='Y'"
                                                    :propList="supplierListData"
                                                    :isDrop="true"
                                                    @dropReturn="dropReturn">
                                                </select-drop>
                                                <span v-else>{{receiptsIntroList.supplierName}}</span>
                                            </div>
                                        </div>
                                        <div style="font-size:12px;color:#a9a8a7">
                                            <span style="display:inline-block;width:80px;float:left;margin-right:10px;">库位</span>
                                            <span style="display:inline-block;width:80px;float:left;">供应商</span>
                                        </div>
                                        
                                    </div>
                                    <div class="right-main">
                                        <div class="right-main-first">
                                            <div class="right-main-item">
                                                <div class="item-title">
                                                    {{receiptsIntroList.totalNum || 0}}
                                                    <span>件</span>
                                                </div>
                                                <div class="item-type">件数</div>
                                            </div>
                                            <div class="right-main-item">
                                                <div class="item-title">
                                                    {{(receiptsIntroList.totalWeight || 0).toFixed(3)}}
                                                    <span>g</span>
                                                </div>
                                                <div class="item-type">件重</div>
                                            </div>
                                            <div class="right-main-item">
                                                <div class="item-title">
                                                    {{(receiptsIntroList.totalPrice || 0).toFixed(2)}}
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
                            <div id="body-row4-Zindex" class="Rp_dataGrid_container body-row4"
                                :class="{'animat-scroll':curStatus.slipPointer }">
                                <!--滚动条上滑时出现的那个订单号-->
                                <div class="tab-orderNum" @click="updataSlipPointer(false)">
                                    <span v-text="receiptsIntroList.orderNum" class="txt"></span>
                                    <i class="iconfont icon-xiajiang"></i>
                                    <div class="mg">
                                    <span class="mask left"></span>
                                    <span class="mask right"></span>
                                    </div>
                                </div>
                                <!-- 筛选切换 begin -->
                                <div class="rp_gridState" style="">
                                    <p class="side-nav"><i class="iconfont icon-liebiao"></i>{{toRouterUrlName}}</p>
                                    <div class="sort-wrap">
                                        <label>排序:</label>
                                        <div v-for="(item, index) in sortList" :key="index">
                                            {{item.name}}
                                            <img v-if="item.value == '2'" src="./../../../../static/img/sort/down1.png">
                                            <img v-if="item.value == '1'" src="./../../../../static/img/sort/up1.png">
                                            <i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
                                        </div>
                                    </div>
                                    <div class="xj-switch" v-if="isShowCost == 'Y'">
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

                                    <!-- 表格位置的筛选 begin -->
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
                                    <!-- 表格位置的筛选 end -->

                                    <!-- 新增的一些筛选 -->
                                    <div class="xj-report-multi-select-wrap">
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
                                    
                                     <!-- 成品旧料的切换 -->
        <!--                             <div class="iconfont_wrap fr">
                                        <span :class="inconspanactive1 == true ? 'myspanactive' : ''" @click="toggleAttribute(1)">成品</span>
                                        <span style="color: #d6d6d6;margin:0 1px;font-size: 13px;">丨</span>
                                        <span :class="inconspanactive2 == true ? 'myspanactive' : ''" @click="toggleAttribute(2)">旧料</span>
                                    </div> -->

                                    <ul class="header-wrap-btn">
                                    
                                        <template v-if="isMakeOrderManId">
                                            <li v-if='addRole && dataGridOptions.type == 1' class="confirm-btn">
                                                <!--单个添加--> <input ref="inputDom" @keyup.enter="addNewGoods($event)" v-model="enterOrderNum" type="text" placeholder="扫描/输入条码号添加商品">
                                            </li>
                                            <li v-if='addRole && dataGridOptions.type == 1' style="cursor: pointer;" class="confirm-btn" @click.stop="appendBatchRow">
                                                批量添加
                                            </li>
                                        </template>

                                        <li class="confirm-btn" v-show="getOperateTakeOrderName">
                                            {{getOperateTakeOrderName}}
                                        </li>
                                        <li v-show="getOperateTakeOrderName" class="confirm-btn-small" @click="auditFun">
                                            {{getOptionsName}}
                                        </li>
                                    </ul>
                                </div>
                                <!-- 筛选切换 end -->
                                <div class="rp_dataGridTemp" :class="tabShow" > <!--v-loading = "loading" element-loading-text="数据查询中"-->
                                    <report-detail 
                                        :dataGridStorage="dataGridStorage" 
                                        :tabSwitch="tabSwitch"
                                        :positionSwitch="positionSwitch"
                                        :isRole='receiptsIntroList.isRole'
                                        :billType="'退库'"
                                        :isSelDelect="isSelDelect"
                                        :newList="newList"
                                        :dataGridOptions="dataGridOptions"
                                        :orderType="'02'"
                                        @scrollClass="tabScrollShow"
                                        @delectBack="delBack"
                                        @scrollBack="scrollBack"
                                        @scrolling="scrolling"
                                        @messageBack="messageBack"
                                        @lazyloadSend="sendlayLoad"
                                        @sortList="sortListAct"
                                        :reportType="getReportType()">
                                    </report-detail>
                                </div>
                                <div class="btn-list">
                                    <div class="btn" v-if="receiptsIntroList.checkType == '1' && isMakeMan == true && nowStatus != 6" @click="operateSubmit(4)">
                                        <span class="iconfont icon-tijiaoshenhe"></span>
                                        <span>提交审核</span>
                                    </div>
                                    <div class="btn" v-if="receiptsIntroList.isCheckOrderMan == 'Y' && receiptsIntroList.checkType != '2' &&  nowStatus != 6 && receiptsIntroList.checkType != '1' || isMakeMan == true && nowStatus == 2" @click="operateSubmit(1)">
                                        <span class="iconfont icon-chexiao"></span>
                                        <span>撤回审核</span>
                                    </div>
                                    <div class="btn" v-if="receiptsIntroList.checkType == '2' && isCheckOrderMan == 'Y' && nowStatus != 6" @click="operateSubmit(2)">
                                        <span class="iconfont icon-tongguoshenhe"></span>
                                        <span>通过审核</span>
                                    </div>
                                    <div class="btn" v-if="receiptsIntroList.checkType == '2' && isCheckOrderMan == 'Y' && nowStatus != 6" @click="operateSubmit(3)">
                                        <span class="iconfont icon-shenhebohui"></span>
                                        <span>驳回审核</span>
                                    </div>
                                    <div v-if="dataGridOptions.type != 1" class="btn" @click="exportTab()">
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
                                      <!-- 加载页数 -->
                                    <LoaderNum ref="LoaderNum" style="display:block;"></LoaderNum>
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
                        <!-- 审核弹窗 -->
                        <transition name="fade">
                            <div class="audit-popup" v-if="auditShow">
                                <i class="el-icon-close" @click="auditShow = false"></i>
                                <div class="audit-tittle">
                                    <img src="./../../../../static/img/bohui.png">
                                    <div>{{auditText}}</div>
                                </div>
                                <div class="audit-text">
                                    <textarea placeholder="请输入文字..." v-model="textareaData"></textarea>
                                </div>
                                <div class="audit-btn" @click="sureSubmit">
                                    确定
                                </div>
                            </div>
                        </transition>
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
        </div>
			<!--打印模块-->
			<div style="display: none;">
				<detail-template 
                    v-if="this.tabClassActive.index==0" 
                    title="退库" 
                    tabTitle="明细"
                    :reportType="2" 
                    ref="detailTemplate" 
                    :sellList="printDataGrid" 
                    :headerData="receiptsIntroList"
                    :tabSwitch="tabSwitch"></detail-template>
				<intelligence-type-template 
                    v-if="this.tabClassActive.index==1" 
                    title="退库" 
                    :reportType="2" 
                    tabTitle="智能分类"
                    ref="intelligenceTypeTemplate" 
                    :sellList="printDataGrid" 
                    :headerData="receiptsIntroList"
                    :tabSwitch="tabSwitch"></intelligence-type-template>
				<project-type-template 
                    v-if="this.tabClassActive.index==2" 
                    title="退库" 
                    tabTitle="产品分类"
                    :reportType="2" 
                    ref="projectTypeTemplate" 
                    :sellList="printDataGrid" 
                    :headerData="receiptsIntroList"
                    :tabSwitch="tabSwitch"></project-type-template>
				<custom-template 
                    v-if="this.tabClassActive.index==3" 
                    title="退库" 
                    tabTitle="自定义"
                    :reportType="2" 
                    ref="customTemplate" 
                    :sellList="printDataGrid" 
                    :headerData="receiptsIntroList"
                    :tabSwitch="tabSwitch"></custom-template>
			</div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
// import newTemplate from './../CommonalityComponent/formTemplate/NewTemplate'
import receiptsRemark from '../../../components/work/ReceiptsRemark.vue'
import DropDownMenu from './../../../components/template/DropDownMenu1'
import {productTpyeState, receiptOptionsName, productDetailStatus} from './../../../Api/commonality/status'
import {seekSettingUserRole, seekReceiptTKSynopsis, seekReceiptStatusList, seekGoodsList} from './../../../Api/commonality/seek'
import {seekOutStorageData, operateProductList, getReportsPrintTK, operateRemarkOperation, operateDeleteByOrderNumber, operateHandleXGReceipt, operateSubmitAudit, operateReceiptOperation} from './../../../Api/commonality/operate'
import error from "./../CommonalityComponent/popupTemplate/error"
import affirm from "./../CommonalityComponent/popupTemplate/affirm"

import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
import BatchAddReceipts from '../../../components/work/BatchAddReceipts'
import delectReceipts from './../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
import StorageReturnReceiptsIntro from '../../../components/work/StorageReturnReceiptsIntro.vue'
// import ReportDetail from './../CommonalityComponent/formTemplate/reportDetailTab'
import ReportDetail from './../CommonalityComponent/formTemplate/newDataGrid/reportDetailTab'

import stepsPath from './components/stepsPath'
import orderRemark from './components/orderRemark'
import selectDrop from './components/dropDownMenu'

import FormatImg from 'components/template/DefaultHeadFormat.vue'
//打印模块
// import TablePrint from './../../Work/CommonalityComponent/print/dataGridPrint'
import TablePrint from './../../Work/CommonalityComponent/formTemplate/newPrint/reportDetailTab'
//打印模板，明细，产品分类，智能分类=自定义
import detailTemplate from "@/components/jcp-print/bill/commons/detail-template";
import projectTypeTemplate from "@/components/jcp-print/bill/commons/project-type-template";
import intelligenceTypeTemplate from "@/components/jcp-print/bill/commons/intelligence-type-template";
import customTemplate from "@/components/jcp-print/bill/commons/intelligence-type-template";
// 导出表格
import {downLoaderFile} from 'Api/downLoaderFile'

  // 筛选的组件
import dropDownColum from 'base/menu/drop-down-colums'

import {getProductTypeList, seekProductClassList, seekGetShopListByCo, showCounterList, seekRepositoryList} from "Api/commonality/seek"
import LoaderNum from 'components/work/loaderNum';
export default {
	components:{
      StorageReturnReceiptsIntro,
      receiptsRemark,
      error,
      affirm,
      auditReceipts,
      delectReceipts,
      BatchAddReceipts,
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
            LoaderNum,
    },
    data() {
        return {
            inconspanactive1: true,
            inconspanactive2: false,
            isSelDelect: true, // 批量删除操作
            deleteList1: [],
            deleteList: [], // 批量删除列表
            'receiptInfoList': '',
            isMakeMan: false,
            "receiptsIntroList": {}, // 单据简介
            "introListOption": false, // 关闭单据简介的编辑
            "supplierListData1": [
                {
                    name: "全部",
                    type: ""
                },
                {
                    name: "入库单",
                    type: "01"
                },
                {
                    name: "修改单",
                    type: "10"
                },
                {
                    name: "退货单",
                    type: "04"
                },
                {
                    name: "调库单",
                    type: "07"
                }
            ],
            enterOrderNum: '', //输入的单据号
            toRouterUrlName: '退库',
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
            //
            propOptons: {
                reportType: 3, //报表类型 ，为1时代表成色大类，为2时是成色小类，为3时是明细 ,默认为明细
                
            },
            //
            tabShow: 'tabShow',
            loading:false,
            dataGridStorage : {},
            printDataGrid : {}, //打印数据
            dataGridDetailList : [],
            //成本核算
            tabSwitch : false,
            positionSwitch: false,
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
            stepInfo: {
                step1: {
                    stepMessage: '',
                    stepFlag: false,
                    stepStatus: 1
                },
                step2: {
                    stepMessage: '',
                    stepFlag: false,
                    stepStatus: 2
                },
                step3: {
                    stepMessage: '',
                    stepFlag: false,
                    stepStatus: 3
                },
                step4: {
                    stepMessage: '',
                    stepFlag: false,
                    stepStatus: 6
                }
            },
            nowStatus: '',
            isRole: '',
            auditShow: false,
            textareaData: '',
            isPrint : 0,
            printSelectDate : {
                shop :'', //店铺
                orderNum : this.$route.query.orderNumber,
                preparedBy: '',//制单人
                headerData : '退库', //制单大标题
                reportType : '2' //1代表入库、2退库、3调库、4发货、5调柜、6退货
            },
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
                // productClass: '1',
                sortFlag: '0',
                sortList: [{barcode: '1'}],
                type: 1,
                page: 1,
                pageSize: 30,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1',
                specialId: ''
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
        this.update()
    },
    mounted () {
        let self = this
        this.$refs.customDia.style.display = 'none'
        this.$nextTick(()=>{
            this.Inteval = setInterval(()=>{
                if( this.receiptsIntroList ){
                    clearInterval(this.Inteval)
                    // console.log('test', this.receiptsIntroList)
                    this.formatTime()
               }
            },10)
        })
    },
    watch: {
        'positionSwitch' (val) {
            if (val == true) {
            this.dataGridOptions.sortFlag = 1
            } else {
            this.dataGridOptions.sortFlag = 0
            }
            this.send()
        },
        $route(to, from) { 
            if(from.path === to.path) {
                this.update()   
            }
        }
    },
    computed: {
        ...mapGetters([
            "userInfo", // 用户基本信息
            "saveSuccess", // 保存弹窗
            "saveSuccessData", // 保存弹窗数据...mapGetters([
            "shopListByCo", // 店铺列表
            "supplierListData", // 供应商
            "repositoryList" // 库位列表
        ]),
        orderNum() {
            return this.$route.query.orderNumber
        },
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
        isMakeOrderManId () {
            return this.receiptsIntroList.makeOrderManId == sessionStorage.getItem("id");
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
        update () {
            // 简单检测浏览器 表格底部高度填充，主要对firefox进行操作
            this.$store.dispatch('checkBrowser',(type)=>{
                this.browserType = type
            })
            this.selectConfig = fetch.Select
            this.getSeekSellReceiptsIntro(); // 单据简介
            this.send();
            this.settingUserRole()
            this.receiptStatusList();
            // this.getReceiptRemark(); // 单据备注

            // 初始化筛选列表
            this.seekProductTypeList()
            this.productClassList(1)
            this.productClassList(2)
            this.productClassList(3)
        },
        ...mapActions([
            "workPopupError" // 错误弹窗
        ]),
        messageBack () {
            this.getSeekSellReceiptsIntro(); // 单据简介
            this.send();
            this.receiptStatusList();
        },
        choseMenu (type) {
            if(this.tabSwitch) {
                this.dataGridOptions.specialId = ''
            } else {
                this.dataGridOptions.specialId = '1'
            }
            console.log(this.dataGridOptions)
            
            if (type == 1) {
                this.positionSwitch = !this.positionSwitch
            } else if (type == 2) {
                this.tabSwitch = !this.tabSwitch
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
            //console.log(222)
          if( port )  { 
            if (port == 1) {
              Object.assign(this.dataGridOptions, {
                // productClass: '1',
                orderNum : this.$route.query.orderNumber,
                sortFlag: '0',
                type: 1,
                page: 1,
                pageSize: 30,
                keyWord: '',
                sortList: [{barcode: '1'}],
              })
                this.sortList = [{name: '条码号', value: '1'}]
                this.newList = [{name: '条码号', value: '1'}]
            } else if (port == 2) {
                //console.log(111)
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
                sortList: [{classTypeName: '1'}],
              })
                this.sortList = [{name: '产品类别', value: '1'}]
                this.newList = [{name: '产品类别', value: '1'}]
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
                sortList: [{classTypeName: '1'}],
              })
              this.sortList = [{name: '产品类别', value: '1'}]
                this.newList = [{name: '产品类别', value: '1'}]
            } else if (port == 4) {
              Object.assign(this.dataGridOptions, {
                // productClass: '1',
                orderNum : this.$route.query.orderNumber,
                sortFlag: this.positionSwitch ? "1" : "0",
                sortList: [{classTypeName: '1'}],
                type: 1,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1'
              })
              this.sortList = [{name: '产品类别', value: '1'}]
                this.newList = [{name: '产品类别', value: '1'}]
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
            console.log(res)
            if (res.data.state == 200) {
              this.isShowCost = res.data.data.costFlag
            }
          }, (res) => {

          })
        },
        tabs(index, type, evt){
            //console.log(333)
          if (this.dataGridOptions.type == 4 && index == 3) {
            this.customDialog = true
          }
          this.loading = true;
          //this.page = 1
          this.dataGridOptions.page = 1
          this.dataGridOptions.pageSize = 30
          this.tabClassActive.index = index;
          this.setReportType(type)
          
        },
        tabHover(index, evt) {
            this.$refs.customDia.style.zIndex = "10"
            this.$refs.customDia.style.opacity = '1'
            this.$refs.customDia.style.display = 'block'
        },
        tabOut(index, evt) {
            this.$refs.customDia.style.zIndex = "-1"
            this.$refs.customDia.style.opacity = '0'
            this.$refs.customDia.style.display = 'none'
        },
        cancelSort (item, index) { // 取消排序
            this.sortList.splice(index, 1)
            this.newList = this.sortList
        },
        sortListAct (val) { // 列表排序
            console.log(val)
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
        //成本控制
        reportSwitch(){
          this.tabSwitch = !this.tabSwitch  
        },
        // 数据返回
        dropReturn (data){
            console.log(data)
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
                console.log(res)
                this.getSeekSellReceiptsIntro()
            }, (res) => {
                console.log(res)
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
                console.log(val)
                this.$set(this.curStatus, 'slipPointer', false)
            }
            
        },
        // 更新备注显示权限
        updateRemark (type) {
        this.isRemark = type
        },
        getStatus (status){
            console.log(status)
            this.statusREfresh = false
            if (status) this.curStatus = status
        },
        delBack (val) {
            if (val.refresh == true) {
                this.getSeekSellReceiptsIntro(); // 单据简介
                this.send();
                this.receiptStatusList();
            } else if (val.clean == true) {
                this.isSelDelect = true
            }
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
        addNewGoods (el) { //添加新商品
            // console.log(11111111)
            // console.log(this.configData)
            var rowData = JSON.stringify(this.configData);
            var newRowData = JSON.parse(rowData);
            console.log(newRowData)
//          this.enterOrderNum
            this.queryBarCode(this.enterOrderNum, 0, 1, el)
            this.getSeekSellReceiptsIntro(); // 单据简介
            this.send();
            this.receiptStatusList();
        },
        //获取当前的接口类型
        getReportType(){
        	return this.dataGridOptions.type
        },
        //滚动条滚动时不显示总计
    	tabScrollShow( type ){
    		this.tabShow = type ? 'tabShow' : ''
    	},
        formatTime () {
            console.log(this.receiptsIntroList)
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
                console.log(options)
                this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(() => {
                    operateDeleteByOrderNumber(options).then((res) => {
                        console.log(res)
                        if (res.data.state == 200) {
                            this.$router.push({path: '/work/storageReturn'})
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
                    }, (res) => {
                        console.log(res)
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
                console.log(option)
                operateRemarkOperation(option).then((res) => {
                    console.log(res)
                    this.refreshRemark = !this.refreshRemark
                    this.remarkDialog = false
                }, (res) => {
                    console.log(res)
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
                console.log(options)
                operateHandleXGReceipt(options).then((res) => {
                    console.log(res)
                    this.refreshRemark = !this.refreshRemark
                    this.remarkDialog = false
                }, (res) => {
                    console.log(res)
                })
            }
        },
        delRemark (val) {
            console.log(val)
            this.isShowMask = val.type
            this.remarkId = val.item.id
            this.isDel = true
        },
        //************************************************************************** */
        sureSubmit () {
            this.auditShow = false
            if (this.auditText == "通过说明") {
                this.askSubmit(5)
            } else if (this.auditText == "驳回说明") {
                this.askSubmit(4)
            }
        },
        // 提交审核
        operateSubmit (type) {
            // 1. 撤回审核  2. 通过审核   3. 驳回审核   4. 提交审核
            let options = {}
            if (type == 1) { // 撤回审核
                this.$confirm('确定要撤回审核吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                options = {
                    "handleType": this.isMakeMan && this.nowStatus == 2 ? 3 : 6,
                    "orderIdList":[{"orderNum": this.$route.query.orderNumber}], //单据号
                    "checkRemark": ''
                }
                operateReceiptOperation(options).then((res) => {
                    console.log(res)
                    if (res.data.state == 200) {
                        this.$message({
                            message: '撤回审核成功',
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
                    console.log(res)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
            } else if (type == 2) { // 通过审核
                this.auditText = "通过说明"
                this.auditShow = true
            } else if (type == 3) { // 驳回审核
                this.auditText = "驳回说明"
                this.auditShow = true
            } else if (type == 4) { // 提交审核
                this.$confirm('确定要提交审核吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(() => {
                    let options = {
                        orderNum: this.$route.query.orderNumber
                    }
                    operateSubmitAudit(options).then((res) => {
                        console.log(res)
                        if (res.data.state == 200) {
                            this.$message({
                                message: '提交审核成功',
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
                        console.log(res)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });          
                });
            } 
        },
        askSubmit (type) {
            let options = {
                "handleType": type,
                "orderIdList":[{"orderNum": this.$route.query.orderNumber}], //单据号
                "checkRemark": this.textareaData
            }
            operateReceiptOperation(options).then((res) => {
                if (res.data.state == 200) {
                    if (type == 4) {
                        this.$message({
                            message: '驳回审核成功',
                            type: 'success'
                        });
                    } else if (type == 5){
                        this.$message({
                            message: '通过审核成功',
                            type: 'success'
                        });
                        this.refreshRemark = !this.refreshRemark
                    } 
                    this.getSeekSellReceiptsIntro(); // 单据简介
                    this.send();
                    this.receiptStatusList();
                    this.statusREfresh = true
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'wraning'
                    });
                }
            }, (res) => {
                console.log(res)
                this.$message({
                    message: res.data.msg,
                    type: 'wraning'
                });
            })
        },
        //************************************************************************** */
        onScroll (e) { // 滚动加载
            console.log(e)
            var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
            var clientHeight = e.currentTarget.clientHeight; // 元素的高度
            var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
            console.log(scrollTop)
            if (clientHeight + scrollTop >= scrollHeight) {
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
                console.log(res)
            }, (res) => {
                console.log(res)
            })
        },
        goClick () {
            this.$refs.tableList.click();
        },
        addAct () {
            this.isDel = false
            this.isShowMask = true
        },
        propsAct () {
            this.isEditFlag = !this.isEditFlag
        },
        timeFormat (parm) {
            if (parm == undefined) {
                return ''
            } else {
                let year = parm.substring(0, 4)
                let month = parm.substring(4, 6)
                let data = parm.substring(6, 8)
                let hour = parm.substring(8, 10)
                let time = parm.substring(10, 12)
                return year + "-" + month + "-" + data + " " + hour + ":" + time
            }
        },
        // 单据状态
        receiptStatusList () {
            this.stepInfo.step1.stepFlag = false
            this.stepInfo.step2.stepFlag = false
            this.stepInfo.step3.stepFlag = false
            this.stepInfo.step4.stepFlag = false
            let options = {
                orderId: this.$route.query.orderNumber
            }
            seekReceiptStatusList(options).then((res) => {
                console.log(res)
                for (let i = 0; i < res.data.data.dataList.length; i++) {
                    if (res.data.data.dataList[i].status == this.stepInfo.step1.stepStatus) {
                        this.stepInfo.step1.stepFlag = true
                        this.stepInfo.step1.stepMessage = res.data.data.dataList[i]
                    } else if (res.data.data.dataList[i].status == this.stepInfo.step2.stepStatus) {
                        this.stepInfo.step2.stepFlag = true
                        this.stepInfo.step2.stepMessage = res.data.data.dataList[i]
                    } else if (res.data.data.dataList[i].status == this.stepInfo.step3.stepStatus) {
                        this.stepInfo.step3.stepFlag = true
                        this.stepInfo.step3.stepMessage = res.data.data.dataList[i]
                    } else if (res.data.data.dataList[i].status == this.stepInfo.step4.stepStatus) {
                        this.stepInfo.step4.stepFlag = true
                        this.stepInfo.step4.stepMessage = res.data.data.dataList[i]
                    }
                }
                this.nowStatus = res.data.data.nowStatus
            }, (res) => {
                console.log(res)
            })
        },
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
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
            console.log(`当前页: ${val}`);
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
        appendBatchRow () { // 批量新增
            this.popup.batchAddReceiptsPopup = !this.popup.batchAddReceiptsPopup;
        },
        goPreviousPage (parm) { // 返回上一页
            this.$router.push("/work/storageReturn")
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
        queryBarCode (barcode, index, operate, el, keys = 0) { // 通过条码号操作数据
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
                        this.getSeekSellReceiptsIntro(); // 单据简介
                        this.send();
                        this.receiptStatusList();
                        this.enterOrderNum = ''
                        if (operate == 1) { // 新增
                            // this.savaOperateSuccess(response.data.data, index);
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

                    } else {
                        if (response.data.state) {
                            // console.log("有响应")
                            this.$message({
                                message: response.data.msg,
                                type: 'warning'
                            });
                        } else {
                            // console.log("无响应") 
                            if (keys >= 3) {
                                this.$message({
                                    message: '服务器繁忙',
                                    type: 'warning'
                                });
                            } else {
                                let self = this
                                setTimeout(() => {
                                    self.queryBarCode(barcode, index, operate, el, keys + 1)
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
        sendlayLoad (val) {
        //   this.dataGridOptions.pageSize += 15
            this.dataGridOptions.pageSize = val;
          seekOutStorageData(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
              this.dataGridStorage = res.data.data
            }
          }, (res) => {

          })
        },
        send (type, callBack) {
          this.loading = true;
          seekOutStorageData(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
              // 避免繁琐操作，打印数据单独请求
              if(type && type == 'print'){
                this.printDataGrid = res.data.data
                // 待页面渲染
                setTimeout(()=>{
                    callBack && callBack()
                },1000)
                //打印数据请求完成之后 初始化分页设置
                Object.assign(this.dataGridOptions, {
                  page : 1,
                  pageSize : 30
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
            seekReceiptTKSynopsis(options).then((response) => {
                if (response.data.data.makeOrderManId == sessionStorage.getItem("id")) {
                    this.isMakeMan = true
                } else {
                    this.isMakeMan = false
                }
                
                if (response.data.state === 200) {
	              		if(response.data.data.makeOrderManId != sessionStorage.id){//非本人不可以操作
	              			response.data.data.isRole="N";
	              		}
                    this.receiptsIntroList = response.data.data;
                    this.isRole = response.data.data.isRole
                    console.log(this.receiptsIntroList)
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log(response);
            })
        },
        // 导出报表
        exportTab(){
            let exportTabData = Object.assign({},this.dataGridOptions)
            exportTabData['exportType'] = 'TK'
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
    },
}
        
</script>
<style lang="scss" src="./../../../assets/css/customDialog/customDialog.scss"></style>
<style lang="scss" src="../../../assets/css/template/commodityList.scss" scoped></style>
<style lang="scss" src="../../../assets/css/template/documentsList.scss" scoped></style>
<style lang="scss" scoped>

    .audit-popup { // 审核弹窗
        width: 320px;
        height: 400px;
        background:#fff;
        border-radius: 10px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -160px;
        z-index: 200;
        box-shadow: 0 0 10px 10px rgba(0,0,0,0.1);
        &>i {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
        .audit-tittle {
            width: 130px;
            height: 130px;
            margin: 0 auto;
            text-align: center;
            box-sizing: border-box;
            padding-top: 24px;
            img {
                height: 46px;
                width: 46px;
                margin-bottom: 15px;
                border-radius: 50%;
            }
            &>div {
                font-size: 12px;
                color:#333;
                font-weight: bold;
            }
        }
        .audit-text {
            margin:0 auto;
            width: 260px;
            height: 180px;
            textarea {
                width: 260px;
                height: 180px;
                background: #f6f7f8;
                box-shadow: 0 0 5px 2px rgba(0,0,0,0.1) inset;
                border-radius: 4px;
            }
        }
        .audit-btn {
            width: 150px;
            height: 28px;
            background:#2993f8;
            text-align: center;
            line-height: 28px;
            color:#fff;
            font-weight:bold;
            border-radius: 4px;
            margin: 30px auto;
            cursor: pointer;
        }
    }
    .item-name{
	    font-size: 12px;
	    color: #a9a8a7;
    }
    input::-webkit-input-placeholder{
        font-size:10px;
    }
    input:-moz-placeholder{
        font-size:10px;
    }
    input:-ms-input-placeholder{
        font-size:10px;
    }
    #body-row2-Zindex {
        z-index:0;
    }
    #body-row4-Zindex {
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
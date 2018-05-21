<template>
    <div class="new-storage-wrap" ref="scrollDiv">
        <div class="new-storage" @click="closeOptions">
            <section class="body-box" ref="body_box">
                <div class="fixed-mask skin-shield" ref="fixed_mask">
                </div>
                <div class="body-header skin-shield" ref="body_header">
                    <ul class="header-nav">
                        <li @click="goPreviousPage"><i style="font-size: 20px; margin-right: 10px;" class="iconfont icon-ruku"></i>入库<span>&nbsp;></span></li>
                        <li class="on">单据详情</li>
                    </ul>
                    <div class="back-btn" @click="goPreviousPage">返回上一级</div>
                </div>
                <div class="body-row2">
                    <div class="list-mask" ref="mask"></div>
                    <ul>
                        <li :class="{active: stepInfo.step1.stepFlag, act:stepIndex == 1}">
                            <div class="main-name">待审核</div>
                            <div class="list-span" v-if="stepInfo.step1.stepFlag || stepIndex == 1">
                                <div>{{stepInfo.step1.stepMessage.userName}}</div>
                                <span>{{timeFormat(stepInfo.step1.stepMessage.createTime)}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepInfo.step2.stepFlag, act:stepIndex == 2}">
                            <div class="main-name">审核中</div>
                            <div class="list-span" v-if="false">
                                <div>{{stepInfo.step2.stepMessage.userName}}</div>
                                <span>{{timeFormat(stepInfo.step2.stepMessage.createTime)}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepInfo.step3.stepFlag, act:stepIndex == 3}">
                            <div class="main-name">已审核</div>
                            <div class="list-span" v-if="stepInfo.step3.stepFlag || stepIndex == 3">
                                <div>{{stepInfo.step3.stepMessage.userName}}</div>
                                <span>{{timeFormat(stepInfo.step3.stepMessage.createTime)}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepInfo.step4.stepFlag, act:stepIndex == 4}">
                            <div class="main-name">锁定</div>
                            <div class="list-span" v-if="stepInfo.step4.stepFlag || stepIndex == 4">
                                <div>{{stepInfo.step4.stepMessage.userName}}</div>
                                <span>{{timeFormat(stepInfo.step4.stepMessage.createTime)}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="body-row3">
                    <div class="col-1">
                        <div class="per-info">
                            <img :src="receiptsIntroList.makeOrderManLog">
                            <span>{{receiptsIntroList.makeOrderManName}}</span>
                        </div>
                        <div class="main-info">
                            <div class="order-num">{{receiptsIntroList.orderNum}}</div>
                            <!--<ul>
                                <li>{{receiptsIntroList.storageName}}</li>
                                <li>{{receiptsIntroList.supplierName}}</li>
                                <li>{{receiptsIntroList.shopName}}</li>
                            </ul>-->
                            <storage-receipts-intro
                                :receiptsIntroList="receiptsIntroList"
                                :introListOption="introListOption"
                                :toRouter='"/work/storage"'
                            ></storage-receipts-intro>
                            <div class="order-time">{{receiptData}}</div>
                        </div>
                        <div class="main-right">
                            <div>{{receiptsIntroList.totalNum}}<span>件</span></div>
                            <div>
                                <span class="num-box">{{receiptsIntroList.totalWeight}}<span>g</span></span>
                                <span class="num-box">{{receiptsIntroList.totalPrice}}<span>元</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="remark-tittle">
                            <div class="tittle-left">备注</div>
                            <div class="tittle-right"><span class="operate" @click="addAct" style="margin-right: 10px;"><i class="iconfont icon-bianji" style="color:#2993f8"></i></span><span class="del" @click="propsAct"><i style="color:#2993f8" class="iconfont icon-lajitong"></i></span></div>
                        </div>
                        <receipts-remark :isEdit="isEditFlag"  @del="delRemark" :refresh="refreshRemark"></receipts-remark>
                        <div class="mask" v-if="isShowMask">
                            <div class="del-div" v-if="isDel">
                                <el-button @click="closeMask(1)">取消</el-button>
                                <el-button type="primary" @click="closeMask(2)">确定删除</el-button>
                            </div>
                            <div class="add-div" v-else>
                                <textarea v-model="remarkText" class="text-area" placeholder="请输入备注...">
                                </textarea>
                                <div class="btn-grop">
                                    <el-button size="small" @click="closeMask(3)">取消</el-button>
                                    <el-button size="small" type="primary" @click="closeMask(4)">保存</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="body-row4" ref="row4_main">
                    <div class="table-main">
                        <div class="table-tittle" ref="table_tlttle">
                            <div class="table-tittle-left"><i class="iconfont icon-liebiao" style="margin-right: 10px;"></i>商品列表</div>
                            <div class="table-tittle-right">
                                <div class="header-btn" v-if="crudData.operationCut">
                                    <span @click="myCustomFn"><span v-if="tableMainFlag.baseFlag == false">展开<i class="iconfont icon-zhankai" style="margin-left: 10px;"></i></span><span v-else>收起<i class="iconfont icon-shouqix" style="margin-left: 10px;"></i></span></span>
                                    <ul ref="btn_list">
                                        <li v-if="delectOptionRole" @click="popup.copys = true">复制</li>
                                        <li v-if="delectOptionRole && nowStatus != 6" class="to-lead" @click="goClick">
                                            导入表格
                                            <input style="display: none;" ref="tableList" type="file" name="file" @change="uploadingOne($event)"/>
                                        </li>
                                        <!-- <li v-if="delectOptionRole && nowStatus != 6" class="confirm-btn" @click.stop="appendBatchRow">
                                            批量添加
                                        </li> -->
                                        <li v-if="delectOptionRole && nowStatus != 6" @click="popup.amendings = true">批量修改</li>
                                        <li v-if="delectOptionRole && nowStatus != 6">
                                            <div v-if="isSelDelect" @click="isSelDelect = false">批量删除</div>
                                        </li>
                                        <li><a :href="downUrl">下载模板</a></li>
                                        <li v-if="delectOptionRole && nowStatus != 6" @click="addSingleAll" v-loading.fullscreen.lock="popup.fullscreenLoading" element-loading-text="拼命进行中...">保存</li>
                                        <!--<li @click="closeStorage">关闭</li>-->
                                    </ul>  
                                </div>
                                <div class="add-btn" v-if="delectOptionRole && nowStatus != 6" @click="appendRow">添加商品</div>
                            </div>
                        </div>
                        <div class="table-wrap">
                            <table class="left-table" cellpadding="0" cellspacing="0" ref="left_tittle">
                                    <tr>
                                        <th rowspan="2">序号</th>
                                        <th rowspan="2">条码号</th>
                                        <th colspan="4" style="color:#2993f8; font-size: 14px;">首饰名称</th>
                                    </tr>
                                    <tr>
                                        <th>成色名称</th>
                                        <th>含金量</th>
                                        <th>宝石名称</th>
                                        <th>首饰类别</th>
                                    </tr>
                            </table>
                            <table class="left-table" cellpadding="0" cellspacing="0" style=" background:#fff;" ref="left_table_main">    
                                <tr v-for="(item, index) in tableRowData" ref="left_table_line"  @click="selectTable(index)" :class="{active:tableIndex == index}">
                                    <td style="width: 45px;">
                                        <span v-if="isSelDelect">{{index + 1}}</span>
                                        <span v-else>
                                            <input style="width: 30px;" type="checkbox" :checked="deleteList.includes(item.barcode)" @change="selectDelItem(item)">
                                            <!-- <el-checkbox :checked="deleteList.includes(item.barcode)" @change="selectDelItem(item)"></el-checkbox> -->
                                        </span>
                                    </td>
                                    <td style="width: 67px; max-width: 90px;">
                                        <input v-if="tableIndex == index && isOperate == false" type="text" v-model="item.barcode" @keyup.enter="queryBarCode(item.barcode, 1, index)">
                                        <span v-else>{{item.barcode}}</span> 
                                    </td>
                                    <td style="width: 90px;">
                                        <span v-if="isOperate || tableIndex != index">{{item.metalColor}}</span>
                                        <el-select v-else v-model="tableRowData[index].metalColor" @change="selectData('base', 1, item, 'metalColor')" clearable placeholder="请选择">
                                            <el-option
                                            v-for="item in configPullDownData.metalColor"
                                            :key="item.classesId"
                                            :label="item.classesName"
                                            :value="item.classesName">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td style="width: 67px;">
                                        <span  v-if="isOperate || tableIndex != index">{{item.partGold}}</span>
                                        <el-select v-model="tableRowData[index].partGold" @change="selectData('base', 2, item, 'partGold')" clearable placeholder="请选择" v-else>
                                            <el-option
                                            v-for="item in configPullDownData.partGold"
                                            :key="item.classesId"
                                            :label="item.classesName"
                                            :value="item.classesName">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td style="width: 90px;">
                                        <span v-if="isOperate || tableIndex != index">{{item.gemName}}</span>
                                        <el-select v-model="tableRowData[index].gemName" @change="selectData('base', 3, item, 'gemName')" clearable placeholder="请选择" v-else>
                                            <el-option
                                            v-for="item in configPullDownData.gemName"
                                            :key="item.classesId"
                                            :label="item.classesName"
                                            :value="item.classesName">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td style="width: 91px;">
                                        <span v-if="isOperate || tableIndex != index">{{item.jewelryName}}</span>
                                        <el-select v-model="tableRowData[index].jewelryName" @change="selectData('base', 4, item, 'jewelryName')" clearable placeholder="请选择" v-else>
                                            <el-option
                                            v-for="item in configPullDownData.jewelryName"
                                            :key="item.classesId"
                                            :label="item.classesName"
                                            :value="item.classesName">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                            </table>
                            <div class="left-shdow" ref="shadow"></div>
                            <div class="right-table-wrap" ref="right_table_wrap" @scroll="watchTableScroll">
                                <div class="right_table_tittle_scroll_wrap" ref="right_scroll_wrap">
                                    <table class="right-table right_table_scroll" cellpadding="0" cellspacing="0" ref="right_tittle">
                                        <tr>
                                            <th :colspan="tableMainColSpan.baseNum" @click="showTableCol(1)">基本信息<i class="el-icon-caret-right" :class="{active: tableMainFlag.baseFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.weightNum" @click="showTableCol(2)">重量<i class="el-icon-caret-right" :class="{active: tableMainFlag.weightFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.pageNum" @click="showTableCol(3)">证书<i class="el-icon-caret-right" :class="{active: tableMainFlag.pageFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.mainStonNum" @click="showTableCol(4)">主石<i class="el-icon-caret-right" :class="{active: tableMainFlag.mainStonFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.otherStonNum" @click="showTableCol(5)">副石<i class="el-icon-caret-right" :class="{active: tableMainFlag.otherStonFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.workNum" @click="showTableCol(6)">工费<i class="el-icon-caret-right" :class="{active: tableMainFlag.workFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.partsNum" @click="showTableCol(7)">配件<i class="el-icon-caret-right" :class="{active: tableMainFlag.partsFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.otherNum" @click="showTableCol(8)">其他费用<i class="el-icon-caret-right" :class="{active: tableMainFlag.otherFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.priceNum" @click="showTableCol(9)">标价<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th rowspan="2">操作</th>
                                        </tr>
                                        <tr>
                                            <th>品牌</th>
                                            <th v-if="tableMainFlag.baseFlag">款号</th>
                                            <th v-if="tableMainFlag.baseFlag">手寸</th>
                                            <th v-if="tableMainFlag.baseFlag">手寸单位</th>
                                            <th v-if="tableMainFlag.baseFlag">备注</th>
                                            <!-- 分隔 -->
                                            <th>总件重<span>(g)</span></th>
                                            <th v-if="tableMainFlag.weightFlag">净金重<span>(g)</span></th>
                                            <th v-if="tableMainFlag.weightFlag">含配金重<span>(g)</span></th>
                                            <th v-if="tableMainFlag.weightFlag">金耗<span>(%)</span></th>
                                            <th v-if="tableMainFlag.weightFlag">金价<span>(元)</span></th>
                                            <th v-if="tableMainFlag.weightFlag">金属颜色</th>
                                            <th v-if="tableMainFlag.weightFlag">金料额<span>(元)</span></th>
                                            <!-- 分隔 -->
                                            <th>证书号</th>
                                            <th v-if="tableMainFlag.pageFlag">验证码</th>
                                            <th v-if="tableMainFlag.pageFlag">证书名</th>
                                            <th v-if="tableMainFlag.pageFlag">检验机构</th>
                                            <th v-if="tableMainFlag.pageFlag">网址</th>
                                            <th v-if="tableMainFlag.pageFlag">电话</th>
                                            <th v-if="tableMainFlag.pageFlag">检测标准1</th>
                                            <th v-if="tableMainFlag.pageFlag">检测标准2</th>
                                            <th v-if="tableMainFlag.pageFlag">检测标准3</th>
                                            <th v-if="tableMainFlag.pageFlag">证书费<span>(元)</span></th>
                                            <!-- 分隔 -->
                                            <th>主石名</th>
                                            <th v-if="tableMainFlag.mainStonFlag">主石规格</th>
                                            <th v-if="tableMainFlag.mainStonFlag">主石粒数</th>
                                            <th v-if="tableMainFlag.mainStonFlag">主石重</th>
                                            <th v-if="tableMainFlag.mainStonFlag">主石单位</th>
                                            <th v-if="tableMainFlag.mainStonFlag">主石单价<span>(元)</span></th>
                                            <th v-if="tableMainFlag.mainStonFlag">计价方式</th>
                                            <th v-if="tableMainFlag.mainStonFlag">形状</th>
                                            <th v-if="tableMainFlag.mainStonFlag">颜色</th>
                                            <th v-if="tableMainFlag.mainStonFlag">净度</th>
                                            <th v-if="tableMainFlag.mainStonFlag">切工</th>
                                            <th v-if="tableMainFlag.mainStonFlag">抛光</th>
                                            <th v-if="tableMainFlag.mainStonFlag">对称</th>
                                            <th v-if="tableMainFlag.mainStonFlag">荧光</th>
                                            <th v-if="tableMainFlag.mainStonFlag">主石额</th>
                                            <!-- 分隔 -->
                                            <th>副石名</th>
                                            <th v-if="tableMainFlag.otherStonFlag">副石规格</th>
                                            <th v-if="tableMainFlag.otherStonFlag">副石粒数</th>
                                            <th v-if="tableMainFlag.otherStonFlag">副石重</th>
                                            <th v-if="tableMainFlag.otherStonFlag">副石单位</th>
                                            <th v-if="tableMainFlag.otherStonFlag">副石单价<span>(元)</span></th>
                                            <th v-if="tableMainFlag.otherStonFlag">计价方式</th>
                                            <th v-if="tableMainFlag.otherStonFlag">副石额<span>(元)</span></th>
                                            <!-- 分隔 -->
                                            <th>销售工费<span>(元)</span></th>
                                            <th v-if="tableMainFlag.workFlag">销售工费方式</th>
                                            <th v-if="tableMainFlag.workFlag">进货工费<span>(元)</span></th>
                                            <th v-if="tableMainFlag.workFlag">进货工费方式</th>
                                            <th v-if="tableMainFlag.workFlag">进货工费额<span>(元)</span></th>
                                            <!-- 分隔 -->
                                            <th>配件名</th>
                                            <th v-if="tableMainFlag.partsFlag">配件数</th>
                                            <th v-if="tableMainFlag.partsFlag">配件重<span>(g)</span></th>
                                            <th v-if="tableMainFlag.partsFlag">单价</th>
                                            <th v-if="tableMainFlag.partsFlag">计价方式</th>
                                            <th v-if="tableMainFlag.partsFlag">配件额<span>(元)</span></th>
                                            <!-- 分隔 -->
                                            <th>其他费用名</th>
                                            <th v-if="tableMainFlag.otherFlag">其他费用额<span>(元)</span></th>
                                            <!-- 分隔 -->
                                            <th>成本</th>
                                            <th v-if="tableMainFlag.priceFlag">倍率</th>
                                            <th v-if="tableMainFlag.priceFlag">售价<span>(元)</span></th>
                                        </tr>
                                    </table>
                                </div>
                                <table class="right-table" cellpadding="0" cellspacing="0" ref="right_table_data">
                                    <tr v-for="(item, index) in tableRowData" ref="right_table_line" @click="selectTable(index)" :class="{active:tableIndex == index}">
                                        <!--                        基本信息                    -->
                                        <td>
                                            <span v-if="isOperate || tableIndex != index ">{{item.brand}}</span>
                                            <el-select v-model="newRowData.brand" clearable @change="selectData('base1', 1, item, 'brand')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.brand"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.baseFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.modelNo}}</span>
                                            <input v-else v-model="newRowData.modelNo" @blur="inputAmandData(item, index, 'base')">
                                        </td>
                                        <td v-if="tableMainFlag.baseFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.handInch}}</span>
                                            <input maxlength='6' v-else v-model="newRowData.handInch" @blur="inputAmandData(item, index, 'base')">
                                        </td>
                                        <td v-if="tableMainFlag.baseFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.handInchUnit}}</span>
                                            <el-select clearable v-model="newRowData.handInchUnit" @change="selectData('base1', 2, item, 'handInchUnit')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.handInchUnit"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.baseFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.remark}}</span>
                                            <input v-else v-model="newRowData.remark" @blur="inputAmandData(item, index, 'base')">
                                        </td>
                                        <!--                         重量                       -->
                                        <td>
                                            <span v-if="isOperate || tableIndex != index">{{item.totalWeight}}</span>
                                            <input v-else v-model="newRowData.totalWeight" @keyup="operateData(index, 'weight', 1)" @blur="inputAmandData(item, index, 'weight')">
                                        </td>
                                        <td v-if="tableMainFlag.weightFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.netWeight}}</span>
                                            <input v-else v-model="newRowData.netWeight" @keyup="operateData(index, 'weight', 2)" @blur="inputAmandData(item, index, 'weight')">
                                        </td>
                                        <td v-if="tableMainFlag.weightFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.heavyCode}}</span>
                                            <input v-else v-model="newRowData.heavyCode" @keyup="operateData(index, 'weight', 3)" @blur="inputAmandData(item, index, 'weight')">
                                        </td>
                                        <td v-if="tableMainFlag.weightFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.goldCost}}</span>
                                            <input v-else v-model="newRowData.goldCost" @keyup="operateData(index, 'weight', 4)" @blur="inputAmandData(item, index, 'weight')">
                                        </td>
                                        <td v-if="tableMainFlag.weightFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.goldPrice}}</span>
                                            <input v-else v-model="newRowData.goldPrice" @keyup="operateData(index, 'weight', 5)" @blur="inputAmandData(item, index, 'weight')">
                                        </td>
                                        <td v-if="tableMainFlag.weightFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.goldColor}}</span>
                                            <el-select clearable v-model="newRowData.goldColor" @change="selectData('weight', 1, item, 'goldColor')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.goldColor"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="item.classesName || item.certificateName || item.name"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.weightFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.goldE}}</span>
                                            <input v-else v-model="newRowData.goldE" @keyup="operateData(index, 'weight', 6)" @blur="inputAmandData(item, index, 'weight')">
                                        </td>
                                        <!--                         证书                       -->
                                        <td>
                                            <span v-if="isOperate || tableIndex != index">{{item.certifiNo}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.certifiNo" @keyup="operateData(index, 'page', 1)" @blur="inputAmandData(item, index, 'page')">
                                        </td>
                                        <td v-if="tableMainFlag.pageFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.authCode}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.authCode" @blur="inputAmandData(item, index, 'page')">
                                        </td>
                                        <td v-if="tableMainFlag.pageFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.certifiName}}</span>
                                            <el-select clearable v-model="newRowData.certifiName" @change="selectData('page', 1, item, 'certifiName', index)" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.certifiName"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.name || item.classesName || item.certificateName"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.pageFlag">{{item.organizationName}}</td>
                                        <td v-if="tableMainFlag.pageFlag">{{item.website}}</td>
                                        <td v-if="tableMainFlag.pageFlag">{{item.phone}}</td>
                                        <td v-if="tableMainFlag.pageFlag">{{item.stand1}}</td>
                                        <td v-if="tableMainFlag.pageFlag">{{item.stand2}}</td>
                                        <td v-if="tableMainFlag.pageFlag">{{item.stand3}}</td>
                                        <td v-if="tableMainFlag.pageFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.certifiFee}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.certifiFee" @blur="inputAmandData(item, index, 'page')">
                                        </td>
                                        <!--                         主石                       -->
                                        <td>
                                            <span v-if="isOperate || tableIndex != index">{{item.mainName}}</span>
                                            <el-select clearable v-model="newRowData.mainName" @change="selectData('stand', 11, item, 'mainName')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.mainName"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'主石名'"
                                                >
                                                </el-option>
                                            </el-select>
                                            <!--<select v-show="tableIndex == index" autofocus v-model="newRowData.stand" @change="selectData('stand', 1)" placeholder="请选择">
                                                <option v-for="item in configPullDownData.stand">{{item.name || item.classesName || item.certificateName}}</option>
                                            </select>-->
                                        </td>
                                        <td v-show="tableMainFlag.mainStonFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.stant}}</span>
                                            <el-select clearable v-model="newRowData.stant" @change="selectData('stand', 1, item, 'stand')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.stand"
                                                :label="item.classesName || item.name  || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'主石规格'"
                                                >
                                                </el-option>
                                            </el-select>
                                            <!--<select v-show="tableIndex == index" autofocus v-model="newRowData.stand" @change="selectData('stand', 1)" placeholder="请选择">
                                                <option v-for="item in configPullDownData.stand">{{item.name || item.classesName || item.certificateName}}</option>
                                            </select>-->
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石粒数 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.count}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.count" @keyup="operateData(index, 'main', 2)" @blur="inputAmandData(item, index, 'main')">
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石重 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.mainWeight}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.mainWeight" @keyup="operateData(index, 'main', 3)" @blur="inputAmandData(item, index, 'main')">
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石单位 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.unit}}</span>
                                            <el-select clearable v-model="newRowData.unit" @change="selectData('stand', 2, item, 'unit')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.unit"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'主石单位'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石单价 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.unitPrice}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.unitPrice" @keyup="operateData(index, 'main', 4)" @blur="inputAmandData(item, index, 'main')">
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 计价方式 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.mainCalcMethod}}</span>
                                            <el-select clearable v-model="newRowData.mainCalcMethod" @change="selectData('stand', 3, item, 'mainCalcMethod')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.mainCalcMethod"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'计价方式'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.shape}}</span> <!-- 形状 -->
                                            <el-select clearable v-model="newRowData.shape" @change="selectData('stand', 4, item, 'shape')"  placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.shape"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'形状'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.color}}</span> <!-- 颜色 -->
                                            <el-select clearable v-model="newRowData.color" @change="selectData('stand', 5, item, 'color')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.color"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'颜色'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 净度 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.neatness}}</span>
                                            <el-select clearable v-model="newRowData.neatness" @change="selectData('stand', 6, item, 'neatNess')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.neatNess"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'净度'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 切工 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.blackout}}</span>
                                            <el-select clearable v-model="newRowData.blackout" @change="selectData('stand', 7, item, 'blackout')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.blackout"
                                                :label="item.classesName"
                                                :value="item.classesName"
                                                :key="'切工'">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 抛光 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.polishing}}</span>
                                            <el-select clearable v-model="newRowData.polishing" @change="selectData('stand', 8, item, 'polishing')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.polishing"
                                                :key="'抛光'"
                                                :label="item.classesName"
                                                :value="item.classesName">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 对称 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.symmetry}}</span>
                                            <el-select clearable v-model="newRowData.symmetry" @change="selectData('stand', 9, item, 'symmetry')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.symmetry"
                                                :key="'对称'"
                                                :label="item.classesName"
                                                :value="item.classesName">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 荧光 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.fluorescent}}</span>
                                            <el-select clearable v-model="newRowData.fluorescent" @change="selectData('stand', 10, item, 'fluorescent')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.fluorescent"
                                                :key="'荧光'"
                                                :label="item.classesName"
                                                :value="item.classesName"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石额 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.mainPrice}}</span>
                                            <input v-else v-model="newRowData.mainPrice" @keyup="operateData(index, 'main', 5)" @blur="inputAmandData(item, index, 'main')">
                                        </td>
                                        <!--                         副石                       -->
                                        <!--<td> 
                                            <span v-if="tableIndex != index">{{item.deputyName}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.deputyName" @keyup="operateData(index, 'deputy', 1)" @blur="inputAmandData(item, index, 'deputy')">
                                        </td>-->
                                        <td> <!-- 副石名 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyName}}</span>
                                            <el-select clearable v-model="newRowData.deputyName" @change="selectData('deputy', 4, item, 'deputyName')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.deputyName"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'副石名'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石规格 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyStand}}</span>
                                            <el-select clearable v-model="newRowData.deputyStand" @change="selectData('deputy', 3, item, 'deputyStand')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.deputyStand"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'副石规格'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石粒数 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyCount}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.deputyCount" @keyup="operateData(index, 'deputy', 2)" @blur="inputAmandData(item, index, 'deputy')">
                                        </td>
                                        <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石重 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyWeight}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.deputyWeight" @keyup="operateData(index, 'deputy', 3)" @blur="inputAmandData(item, index, 'deputy')">
                                        </td>
                                        <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石单位 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyUnit}}</span>
                                            <el-select clearable v-model="newRowData.deputyUnit" @change="selectData('deputy', 1, item, 'deputyUnit')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.deputyUnit"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'副石单位'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石单价 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyUnitPrice}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.deputyUnitPrice" @keyup="operateData(index, 'deputy', 4)" @blur="inputAmandData(item, index, 'deputy')">
                                        </td>
                                        <td v-if="tableMainFlag.otherStonFlag"> <!-- 计价方式 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyCalcMethod}}</span>
                                            <el-select clearable v-model="newRowData.deputyCalcMethod" @change="selectData('deputy', 2, item, 'deputyCalcMethod')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.deputyCalcMethod"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'副石计价方式'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石额 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.deputyPrice}}</span>
                                            <input v-else v-model="newRowData.deputyPrice" @keyup="operateData(index, 'deputy', 5)" @blur="inputAmandData(item, index, 'deputy')">
                                        </td>
                                        <!--                         工费                       -->
                                        <td> <!-- 销售工费 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.soldFee}}</span>
                                            <input maxlength='6' v-else v-model="newRowData.soldFee" @keyup="operateData(index, 'fee', 1)" @blur="inputAmandData(item, index, 'fee')">
                                        </td>
                                        <td v-if="tableMainFlag.workFlag"> <!-- 销售工费方式 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.soldMethod}}</span>
                                            <el-select clearable v-model="newRowData.soldMethod" @change="selectData('fee', 1, item, 'soldMethod')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.soldMethod"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'销售工费方式'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.workFlag"> <!-- 进货工费 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.inFee}}</span>
                                            <input maxlength='6' v-else v-model="newRowData.inFee" @keyup="operateData(index, 'fee', 2)" @blur="inputAmandData(item, index, 'fee')">
                                        </td>
                                        <td v-if="tableMainFlag.workFlag"> <!-- 进货工费方式 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.inMethod}}</span>
                                            <el-select clearable v-model="newRowData.inMethod" @change="selectData('fee', 2, item, 'inMethod')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.inMethod"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'进货工费方式'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.workFlag"> <!-- 进货工费额 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.inMoney}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.inMoney" @keyup="operateData(index, 'fee', 3)" @blur="inputAmandData(item, index, 'fee')">
                                        </td>
                                        <!--                         配件                       -->
                                        <td> <!-- 配件名 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.partName}}</span>
                                            <el-select clearable v-model="newRowData.partName" @change="selectData('part', 1, item, 'partName')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.partName"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'配件名'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.partsFlag"> <!-- 配件数 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.partCount}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.partCount" @keyup="operateData(index, 'part', 1)" @blur="inputAmandData(item, index, 'part')">
                                        </td>
                                        <td v-if="tableMainFlag.partsFlag"> <!-- 配件重 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.partWeight}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.partWeight" @keyup="operateData(index, 'part', 2)" @blur="inputAmandData(item, index, 'part')">
                                        </td>
                                        <td v-if="tableMainFlag.partsFlag"> <!-- 配件单价 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.partPrice}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.partPrice" @keyup="operateData(index, 'part', 3)" @blur="inputAmandData(item, index, 'part')">
                                        </td>
                                        <td v-if="tableMainFlag.partsFlag"> <!-- 计价方式 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.calcMethod}}</span>
                                            <el-select clearable v-model="newRowData.calcMethod" @change="selectData('part', 2, item, 'calcMethod')" placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.calcMethod"
                                                :label="item.name || item.classesName || item.certificateName || item.name"
                                                :value="item.classesName || item.certificateName || item.name"
                                                :key="'配件计价方式'"
                                                >
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td v-if="tableMainFlag.partsFlag"> <!-- 配件额 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.price}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.price" @keyup="operateData(index, 'part', 4)" @blur="inputAmandData(item, index, 'part')">
                                        </td>
                                        <!--                         其他费用                       -->
                                        <td> <!-- 其他费用名 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.otherFeeName}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.otherFeeName" @keyup="operateData(index, 'other', 1)" @blur="inputAmandData(item, index, 'other')">
                                        </td>
                                        <td v-if="tableMainFlag.otherFlag"> <!-- 其他费用额 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.otherFee}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.otherFee" @keyup="operateData(index, 'other', 2)" @blur="inputAmandData(item, index, 'other')">
                                        </td>
                                        <!--                         标价                       -->
                                        <td> <!-- 成本 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.costPrice}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.costPrice" @keyup="operateData(index, 'price', 1)" @blur="inputAmandData(item, index, 'price')">
                                        </td>
                                        <td v-if="tableMainFlag.priceFlag"> <!-- 倍率 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.ratio == 0 ? 1 : item.ratio}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.ratio" @keyup="operateData(index, 'price', 2)" @blur="inputAmandData(item, index, 'price')">
                                        </td>
                                        <td v-if="tableMainFlag.priceFlag"> <!-- 售价 -->
                                            <span v-if="isOperate || tableIndex != index">{{item.soldPrice}}</span>
                                            <input maxlength='12' v-else v-model="newRowData.soldPrice" @keyup="operateData(index, 'price', 3)" @blur="inputAmandData(item, index, 'price')">
                                        </td>
                                        <!--                         操作                       -->
                                        <td><span style="margin-right:10px; color:#2993f8; cursor:pointer" @click="goDetail(item)">明细</span><span style="cursor: pointer" @click="deleteGoods(item.barcode, index)">删除</span></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="total-table" ref="total_table">
                                <div class="left-total-table">
                                    <div class="total-item">
                                        <span v-html="receiptsIntroList.totalNum ==null || receiptsIntroList.totalNum == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalNum"></span>
                                        <span>总数</span>
                                    </div>
                                </div>
                                <div class="right-total-table">
                                    <div class="total-scroll-wrap">
                                        <ul ref="right_total_table">
                                            <!-- 品牌 -->
                                            <li></li>
                                            <li v-if="tableMainFlag.baseFlag"></li>
                                            <li v-if="tableMainFlag.baseFlag"></li>
                                            <li v-if="tableMainFlag.baseFlag"></li>
                                            <li v-if="tableMainFlag.baseFlag"></li>
                                            <li>
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.totalWeight ==null || receiptsIntroList.totalWeight == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalWeight"></span>
                                                    <span>总件重</span>
                                                </div>
                                            </li>
                                            <li v-if="tableMainFlag.weightFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.totalNetWeight ==null || receiptsIntroList.totalNetWeight == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalNetWeight"></span>
                                                    <span>总净重</span>
                                                </div>
                                            </li>
                                            <li v-if="tableMainFlag.weightFlag"></li>
                                            <li v-if="tableMainFlag.weightFlag"></li>
                                            <li v-if="tableMainFlag.weightFlag"></li>
                                            <li v-if="tableMainFlag.weightFlag"></li>
                                            <li v-if="tableMainFlag.weightFlag"></li>
                                            <!-- 证书号 -->
                                            <li></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <li v-if="tableMainFlag.pageFlag"></li>
                                            <!-- 主石名 -->
                                            <li></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.totalNum ==null || receiptsIntroList.totalNum == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalNum"></span>
                                                    <span>主石总数</span>
                                                </div>
                                            </li>
                                            <li v-if="tableMainFlag.mainStonFlag">
                                                
                                            </li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <li v-if="tableMainFlag.mainStonFlag"></li>
                                            <!-- 副石名 -->
                                            <li></li>
                                            <li v-if="tableMainFlag.otherStonFlag"></li>
                                            <li v-if="tableMainFlag.otherStonFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.totalNum ==null || receiptsIntroList.totalNum == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalNum"></span>
                                                    <span>副石总数</span>
                                                </div>
                                            </li>
                                            <li v-if="tableMainFlag.otherStonFlag"></li>
                                            <li v-if="tableMainFlag.otherStonFlag"></li>
                                            <li v-if="tableMainFlag.otherStonFlag"></li>
                                            <li v-if="tableMainFlag.otherStonFlag"></li>
                                            <li v-if="tableMainFlag.otherStonFlag"></li>
                                            <!-- 销售工费 -->
                                            <li></li>
                                            <li v-if="tableMainFlag.workFlag"></li>
                                            <li v-if="tableMainFlag.workFlag">  
                                            </li>
                                            <li v-if="tableMainFlag.workFlag"></li>
                                            <li v-if="tableMainFlag.workFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.inTotalFee ==null || receiptsIntroList.inTotalFee == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.inTotalFee"></span>
                                                    <span>总进货工费额</span>
                                                </div>
                                            </li>
                                            <!-- 配件名 -->
                                            <li></li>
                                            <li v-if="tableMainFlag.partsFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.partNum ==null || receiptsIntroList.partNum == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.partNum"></span>
                                                    <span>总配件数</span>
                                                </div>
                                            </li>
                                            <li v-if="tableMainFlag.partsFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.totalPartsWeight ==null || receiptsIntroList.totalPartsWeight == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalPartsWeight"></span>
                                                    <span>总配件重</span>
                                                </div>
                                            </li>
                                            <li v-if="tableMainFlag.partsFlag"></li>
                                            <li v-if="tableMainFlag.partsFlag"></li>   
                                            <!-- 其他费用名 -->                                                                                                                                       
                                            <li></li>
                                            <li v-if="tableMainFlag.otherFlag"></li>
                                            <li>
                                                
                                            </li>
                                            <li v-if="tableMainFlag.priceFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.totalCostPrice ==null || receiptsIntroList.totalCostPrice == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalCostPrice"></span>
                                                    <span>总成本</span>
                                                </div>
                                            </li>
                                            <li v-if="tableMainFlag.priceFlag"></li>
                                            <li v-if="tableMainFlag.priceFlag">
                                                <div class="total-item">
                                                    <span v-html="receiptsIntroList.totalPrice ==null || receiptsIntroList.totalPrice == 0 ? '<em style=\'color:#333\'>-</em>' : receiptsIntroList.totalPrice"></span>
                                                    <span>总售价</span>
                                                </div>
                                            </li>                              
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="body-row5" ref="body_row5">
                    <div class="btn-wrap">
                        <div v-if="isSelDelect == false">
                            <div class="checked-btn" ><el-checkbox :checked="tableRowData.length == deleteList.length" @change="checkAllItem">全选(<span>{{tableRowData.length}}</span>)</el-checkbox></div>
                            <div class="btn" @click="batchDeletion(1)">确定</div>
                            <div class="btn" @click="batchDeletion(2)">取消</div>
                        </div>
                        <div v-else>
                                <!-- ****************************************************************** -->
<div class="btn" 
 v-if="receiptsIntroList.checkType != '1' && nowStatus != 6  && nowStatus == 3 && companyPosition || receiptsIntroList.checkType != '1' && nowStatus == 2 && isMakeMan == true" @click="operateSubmit(1)">撤回审核</div>
                            <!-- ****************************************************************** -->
                            <div class="btn" v-if="receiptsIntroList.checkType == '2' && isCheckOrderMan == 'Y' && nowStatus != 6" @click="operateSubmit(2)">通过审核</div>
                            <div class="btn" v-if="receiptsIntroList.checkType == '2' && isCheckOrderMan == 'Y' && nowStatus != 6 && nowStatus != 3" @click="operateSubmit(3)">驳回审核</div>
                            <!-- ****************************************************************** -->
                            <div class="btn" v-if="receiptsIntroList.checkType == '1' && isMakeMan == true && nowStatus != 6" @click="operateSubmit(4)">提交审核</div>
                            <div class="btn" @click="tabPrin()">打印单据</div>
                            <div class="btn" @click="printLabel">打印标签</div>
                        </div>
                        
                    </div>
                    <i class="el-icon-delete2" @click="delOrder" v-if="isRole == 'Y'"></i>
                </div>
            </section>
            <!-- 弹窗 -->
            <div>
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
                <!-- 复制弹窗 -->
                <div class="dialog-w380">
                    <el-dialog v-model="popup.copys">
                        <section class="copy-body p-lf30 p-tb30">
                            <p>复制行数</p>
                            <el-input
                                placeholder="请输入复制行数"
                                v-model="popup.copyNumber">
                            </el-input>
                        </section>
                        <span slot="footer">
                            <a href="javascript: void(0)" class="cancel-btn-w120" @click="popup.copys = false">取 消</a>
                            <a href="javascript: void(0)" class="confirm-btn-w120" @click="copyRowData">确 定</a>
                        </span>
                    </el-dialog>
                </div>
                <!-- 批量添加 -->
                <!-- <BatchAddReceipts
                    v-if="popup1.batchAddReceiptsPopup"
                    :isPopup="popup1.batchAddReceiptsPopup"
                    :supplierListData="supplierListData1"
                    v-on:addReceiptsState="delectReceiptsState"
                >    
                </BatchAddReceipts> -->
                <!-- 批量修改 -->
                <div class="amend-popup-wrap" v-if="popup.amendings">
                    <i class="el-icon-close" @click="popup.amendings = false"></i>
                    <div class="popup-tittle">
                        <img src="./../../../../static/img/piliang.png">
                        <div>批量修改</div>
                    </div>
                    <div class="amend-tittle"><span></span>修改的内容</div>
                    <ul class="amending-select">
                        <li class="selectBox">
                            <span class="selTittle">大类别</span>
                            <el-select class="options" filterable v-model="popup.amendingLargeClass" placeholder="大类别">
                                <el-option v-for="item in littleClass"
                                :label="item.name"
                                :value="item.englishName">
                                <span @click="popup.admentUrl = item.admentUrl">{{item.name}}</span>
                                </el-option>
                            </el-select>
                            <!--<span class="titleBox" v-if="popup.isShowBigClass">必填</span>-->
                        </li>
                        <li class="selectBox">
                            <span class="selTittle">小类别</span>
                            <el-select class="options" filterable ref='littleClass' v-model="popup.amendingLittleClass" placeholder="小类别">
                                <el-option v-for="item in getLittleClass(littleClass, popup.amendingLargeClass)"
                                :label="item.name"
                                :value="item.englishName">
                                </el-option>
                            </el-select>
                            <span class="titleBox" v-if="popup.isShowLittleClass">必填</span>
                        </li>
                        <li class="selectBox">
                            <span class="selTittle">选择/输入</span>
                            <div v-if="!getAmendData(popup.amendingLittleClass)" class="input-w200">
                                <el-input v-model="popup.amendingData"></el-input>
                            </div>
                            <el-select filterable v-else v-model="popup.amendingData">
                            <el-option
                                v-for="item in getAmendData(popup.amendingLittleClass)"
                                :label="item.name || item.brandName || item.certificateName || item.classesName"
                                :value="item.name || item.brandName || item.certificateName || item.classesName">
                            </el-option>
                            </el-select>
                            <!--<span class="titleBox" v-if="popup.isShowData">必填</span>-->
                        </li>
                    </ul>
                    <ul class="amending-scope">
                        <el-radio-group v-model="popup.amendingPitchOn">
                            <li>
                                <!--<el-radio :label='popup.amendingCustomRow'>修改范围</el-radio>-->
                                <span class="selTel">修改范围</span>
                                <div class="input-s82">
                                    <el-input @blur="selectRange('sel1')" v-model="popup.amendingStartRow" :disabled='popup.amendingPitchOn === "2"'></el-input>
                                </div>
                                <span class="m-lr-10 font14 conact">-</span>
                                <div class="input-s82">
                                    <el-input @blur="selectRange('sel2')" v-model="popup.amendingEndRow" :disabled='popup.amendingPitchOn === "2"'></el-input>
                                </div>
                            </li>
                            <li class="all-check">
                                <span class="selTel">全选</span>
                                <!--<el-radio :label='popup.amendingAllRow'>全选</el-radio>-->
                                <el-switch
                                v-model="value1"
                                on-text=""
                                off-text=""
                                @change="switchAct">
                                </el-switch>
                            </li>
                        </el-radio-group>
                        <li>
                            <div class="sure-btn" @click="batchAmending">确定</div>
                        </li>
                    </ul>
                </div>
                <div class="dialog-w380">
                    <el-dialog title="错误提示" v-model="popup.error">
                        <section class="error-body">
                            <p>{{popup.errorMsg}}</p>
                        </section>
                        <span slot="footer">
                            <a href="javascript: void(0)" class="cancel-btn-w120" @click="popup.error = false">取 消</a>
                            <a href="javascript: void(0)" class="confirm-btn-w120 m0" @click="popup.error = false">删 除</a>
                        </span>
                    </el-dialog>
                </div>
                <QueryOption
                    :isQueryOption='popup.isQueryOption'
                    @queryOptionFun="queryOptionFun"
                >
                    <p>{{wranTile}}</p>
                </QueryOption>
                <PrintLabelByOrderDialog ref="printLabelByOrderDialog" :orderNum="print.currentOrderNum" :labelTemplateList="labelTemplateList" :productList="print.productList" :totalNum="print.totalNum" @requestProductList="requestProductList" @printTemplate="printTemplate" @previewTemplate="previewTemplate"></PrintLabelByOrderDialog>
                <TemplatePreviewDialog ref="templatePreviewDialog" @print="printTemplate" :canvas="print.canvas" :templateData="print.templateData" :pageNumber="print.templateData.productList.length"></TemplatePreviewDialog>
            </div>
        </div>
        <div class="xiao-hua-dayin">
            <!--<PrintCanvasTemplate v-show="print.isPreview" class="template-print-canvas" :isPrintCanvas="true" :canvas="print.canvas" :templateData="print.templateData" v-for="i in print.templateData.productList.length" :page="i"></PrintCanvasTemplate>-->
<!--             <TemplatePreviewCanvasComponent v-show="print.isPreview" class="template-print-canvas" :isPrintCanvas="true" :canvas="print.canvas" :templateData="print.templateData" v-for="i in print.templateData.productList.length" :page="i"></TemplatePreviewCanvasComponent> -->
            <lodop ref="lodop" :canvas="print.canvas"  :templateData="print.templateData" :page="print.templateData.productList.length" ></lodop>
        </div>
        <!--打印模块-->
        <div ref="tablePrint" v-if="isPrint==1" >
            <table-print 
                :tabSwitch = "tabSwitch"
                :reportType="getReportType()"
                :printSelectDate = "printSelectDate" 
                :dataGridStorage="dataGridStorage">
            </table-print>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapActions, mapGetters, mapState} from 'vuex'
import {downloadTable, seekProductClassList, seekProductPropertyList, seekCertificateList, seekNewGoodsInfoList, seekReceiptRKSynopsis, seekReceiptStatusList, getUpdateGoodsList} from 'Api/commonality/seek'
import {productDetailStatus} from 'Api/commonality/status'
import {operateAddProductToRKOrder, operateProductList, operateUpdateGoods,operateReceiptOperation, operateSubmitAudit, operateRemarkOperation, operateHandleXGReceipt, operateDeleteByOrderNumber, seekGetStorageData} from 'Api/commonality/operate'
import {readOnly} from 'Api/commonality/filter' // 过滤器
import {computedStorageData} from "Api/commonality/computed" // 计算器
import inputRatio from "./../CommonalityComponent/input/computed/inputRatio" // 倍率计算
import inputSoldPrice from "./../CommonalityComponent/input/computed/inputSoldPrice" // 售价计算
import pureNumbers from "./../CommonalityComponent/input/pureNumbers.vue" // 纯数字
import integer from "./../CommonalityComponent/input/integer.vue" // 整数
import sliceNumber from "./../CommonalityComponent/input/sliceNumber.vue" // 小数
import normalInput from "./../CommonalityComponent/input/normalInput.vue" // 小数
import barCode from "./../CommonalityComponent/input/BarCode.vue" // 条形码
import inputComputed from "./inputComputed.vue"
import QueryOption from "components/confirm/QueryOption.vue"
import storageReceiptsIntro from "components/work/StorageReceiptsIntro.vue"
import receiptsRemark from "components/work/ReceiptsRemark.vue"
import PrintLabelByOrderDialog from 'components/template/PrintLabelByOrderDialog'
import TemplatePreviewDialog from 'components/template/TemplatePreviewDialog'
import TemplatePreviewCanvasComponent from 'components/template/TemplatePreviewCanvas'
import PrintCanvasTemplate from 'components/template/PrintCanvasTemplate'
// import BatchAddReceipts from '../../../components/work/BatchAddReceipts'
import Lodop from 'components/template/Lodop'
//打印模块
import TablePrint from './../../Work/CommonalityComponent/print/dataGridPrint'
export default {
    components: {
        inputComputed,
        pureNumbers,
        integer,
        sliceNumber,
        barCode,
        inputRatio,
        inputSoldPrice,
        QueryOption,
        storageReceiptsIntro,
        receiptsRemark,
        PrintLabelByOrderDialog,
        TemplatePreviewDialog,
        TemplatePreviewCanvasComponent,
        normalInput,
        PrintCanvasTemplate,
        Lodop,
        TablePrint,
        // BatchAddReceipts
    },
    data () {
        var checkAge = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('不能为空'));
        }
        setTimeout(() => {
            if (!/^[0-9]/.test(value)) {
                callback(new Error('请输入整数'));
            } else {
                callback();
            }
        }, 500);
        };
        return {
            allName: '全选',
            isSelDelect: true, // 批量删除操作
            deleteList1: [],
            deleteList: [], // 批量删除列表
            isOperate: false,
            isMakeMan: true,
            auditText: '',
            auditShow: false,
            textareaData: '', // 审核弹窗文字
            selectData1: [],
            value1: false,
            newAddtableData: [], // 新添加的数据
            amandTableData: [], //修改过后的数据
            tableInitRowData: [], // 初始商品数据
            newRowData: [], // 当前操作的一行数据
            value: [],
            tableIndex: null,
            refreshRemark: false, // 刷新备注
            remarkText: '',
            isDel: false,
            remarkId: '',
            isShowMask: false, // 备注弹窗
            isREfresh: true,  // 是否刷新
            scrollLeft: 0,  // 表格头部距离
            tableMainFlag: {
                baseFlag: false,
                weightFlag: false,
                pageFlag: false,
                mainStonFlag: false,
                otherStonFlag: false,
                workFlag: false,
                partsFlag: false,
                otherFlag: false,
                priceFlag: false,
            },
            tableMainColSpan: {  // 合并单元格
                baseNum: 0,
                weightNum: 0,
                pageNum: 0,
                mainStonNum: 0,
                otherStonNum: 0,
                workNum: 0,
                partsNum: 0,
                otherNum: 0,
                priceNum: 0,
            },
            dataGridStorage : {},
            dataGridDetailList : [],
            tableRowData: [
                // leftRowData: [],
                // rightRowData: []
            ],
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
            isEditFlag: false,
            receiptData: '', //单据创建时间
            stepIndex: [], // 进度条index
            receiptInfoList: {}, // 单据状态信息
            "wranTile": "您还有数据未保存，是否退出？",
            "isReload": false,
            "isOne": true,
            "blurTitle": '', //范围错误提示
            "pitchLittleClassKey": null,
            "introListOption": false, // 关闭单据简介的编辑
            "allDataNum": {
                "status": "1",
                "totalNum": "1"
            }, // 单据的信息（总条数，状态）
            "receiptsIntroList": "", // 单据简介
            // "receiptRemark": "", // 单据备注
            "getGoodsInfoList": [],
            "bodyWrap": {},
            "operate": { // 操作的状态
                selectedRow: [], // 记录当前点中，待后期优化
                openState: true // 伸缩列表总开关按钮
            },
            "popup1": {
                "fullscreenLoading": false, // 保存过程的过场动画
                "successData": null, // 制单成功数据
                "deleteReceipts": false, // 删除单据弹窗
                "batchAddReceiptsPopup": false,
                "auditPopup": false // 审核弹窗
            },
            "rules2": { // 表单验证
                amendingStartRow: [{
                    type: 'number',
                    validator: checkAge,
                    trigger: 'blur,change'
                }],
                region: [{
                    required: true,
                    message: '',
                    trigger: 'change'
                }]
            },
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
            "header": {
                supplierId: null, // 供应商Id
                shopId: null, // 计划分销商inWarehouse
                warehouseId: null, // 入库库位Id
                orderRemark: null, // 单据备注
                excelUrl: null // 表格地址
            },
            "crudData": { // 增查更删数据
                checked: false, // 监听全选
                checkedPage: null, // 当页的所有数据（用作全选操作）
                checkList: [], // 选择按钮 删除
                currentPage: 1, // 当前页
                operationCut: true, // 操作按钮切换
                newAddData: [], // 新增数据
                selectedData: null // 选中数据
            },
            "popup": { // 弹窗
                isQueryOption: false, // 是否回到上一页
                fullscreenLoading: false, // 操作的过程弹窗(保存)
                copys: false, // 复制弹窗
                copyNumber: 0, // 复制数量
                amendings: false, // 批量修改弹窗
                amendingLargeClass: null, // 批量修改的大类别
                amendingLittleClass: null, // 批量修改的小类别
                amendingLittlePull: null, // 绑定传给输入内容的过滤器参数
                amendingData: null, // 批量修改的输入内容
                amendingStartRow: null, // 批量修改的开始行数
                amendingEndRow: null, // 批量修改的结束行数
                amendingCustomRow: "1", // 批量修改的自定义输入 // 单选框
                amendingAllRow: "2", // 批量修改的全选行数  // 单选框
                amendingPitchOn: "1", // 批量修改的全选或自定义输入 // 单选框汇总
                admentUrl: null, // 批量修改的地址
                error: false, // 错误信息弹窗
                errorMsg: null // 错误信息
            },
            "aloneAmendingData": { // 独立修改(修改保存后的数据)
                initialValue: [], // 初始值
                changeValue: [] // 变化值
            },
            // vuex管理
            'littleClass': [], // 小类
            "configPullDownData": null, // 配置的下拉数据
            "downUrl": null, // 下载地址
            "print": {
                totalNum: 0,
                productList: [],
                currentOrderNum: null,
                canvas: {
                    percentage: 100,
                    width: 0,
                    height: 0,
                    backgroundImage: '',
                    rotateDeg: 0,
                    components: []
                },
                isPreview: false,
                templateData: {
                    productList: []
                }
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
            pageSize: 7,
            isRole: '',
            nowStatus: '',
            isCheckOrderMan: '',
            companyPosition: '',
            tabSwitch : false,
            tabShow: 'tabShow',
            isPrint : 0,
            printSelectDate : {
                shop :'', //店铺
                preparedBy: '',//制单人
                headerData : '入库', //制单大标题
                reportType : '1', //1代表入库、2退库、3调库、4发货、5调柜、6退货
                orderNum : this.$route.query.orderNumber
            },
        }
    },
    computed: {
        ...mapGetters([
            "rowConfigData", // 一行数据
            "littleClassList", // 小类
            "limitInput", // 输入限制
            "configPullDownDataList", // 配置的下拉数据
            "supplierListData", // 供应商
            "applyDepartementList", // 计划分销商
            "productClass" // 产品类别（商品类型列表）
        ]),
        ...mapState({
            labelTemplateList: state => state.template.labelList
        }),
        allData: function () { // 总数据
            return [...this.getGoodsInfoList, ...this.crudData.newAddData];
        },
        endGetPage: function () { // 最后一页
            var totalNum = Number(this.allDataNum.totalNum); // 后台总条数
            var allNum = Math.ceil(totalNum / 30); // 最后一页
            return allNum;
        },
        endGetData: function () { // 后台最后一页所占的条数
            var totalNum = Number(this.allDataNum.totalNum); // 后台总条数
            var allNum = Math.floor(totalNum / 30); // 能填满的页数
            return totalNum - allNum * 30;
        },
        showNewAddData: function () { // 当前页显示的空白数据
            let currentPage = Number(this.crudData.currentPage); // 当前页
            let endGetData = this.endGetData; // 后台最后一页所占的条数
            let endGetPage = this.endGetPage; // 最后一页
            if (this.endGetData > 0) { // 后台最后一页数据不满的情况下
                if (currentPage === endGetPage) { // 是后台最后一页
                    let endNum = 30 - endGetData; // 每页显示的条数 - 最后一页的后台数据
                    return this.crudData.newAddData.slice(0, endNum);
                } else { // 大于后台最后一页
                    let startNum = (currentPage - endGetPage - 1) * 30 + (30 - endGetData);
                    let endNum = startNum + 30;
                    return this.crudData.newAddData.slice(startNum, endNum);
                }
            } else {
                let startNum = (currentPage - endGetPage - 1) * 30;
                let endNum = startNum + 30;
                return this.crudData.newAddData.slice(startNum, endNum);
            }
        },
        showData: function () {
            return [...this.getGoodsInfoList, ...this.showNewAddData];
        },
        getCheckedPage: function () { // 监听当页的所有做选择的变量（删除选择）
            var CheckedPage = [];
            for (var i = 0; i < this.showData.length; i++) {
                CheckedPage.push(i + ((this.crudData.currentPage - 1) * 30))
            }
            return CheckedPage;
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
        printOptions: function () { // 打印单据
            if (this.receiptsIntroList) {
                let isUser = sessionStorage.getItem("id") === this.receiptsIntroList.makeOrderManId;
                // let isRole = this.$route.query.isRole === "Y";
                let isCheckOrderMan = this.receiptsIntroList.isCheckOrderMan
                if (isUser) { // 制单人
                    return true;
                } else if (isCheckOrderMan) { // 审批人
                    if (this.receiptsIntroList.checkType === "1") {
                        return true;
                    } else {
                        return false;
                    }
                } else { // 其它
                    if (this.receiptsIntroList.checkType !== "3") {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    },
    watch: {
        'crudData.currentPage': function () { //  监听分页
            this.pageJudgeFun();
            this.getNewGoodsInfoList(this.crudData.currentPage, '30');
        },
        'crudData.checkList': function () { // 监听全选
            this.pageJudgeFun();
        },
        'popup.amendingLargeClass': function () { // 切换大类别时，清空其它选项
            this.popup.amendingLittleClass = null;
            this.popup.amendingData = ""
        },
        'popup.amendingLittleClass': function () { // 切换小类别时，清空批量修改的输入内容
            this.popup.amendingData = "";
        },
        'popup.amendings': function (val) {
            if (val == false) {
                this.popup.amendingLittleClass = null;
                this.popup.amendingData = ""
                this.popup.amendingLargeClass = null
                this.popup.amendingStartRow = null
                this.popup.amendingEndRow = null
                this.value1 = false
            }
        },
        // 'tableIndex': function (newVal, oldVal) {
        //     if (this.tableInitRowData.length !== this.tableRowData.length) {
        //         let cha = this.tableRowData.length - this.tableInitRowData.length
        //         for (let j = this.tableRowData.length - 1; j > this.tableInitRowData.length - 1; j--) {
        //             this.newAddtableData.push(this.tableRowData[j])
        //         }
        //     } 
        // },
        'deleteList': function (val) {
            //console.log(val)
            this.deleteList1 = val.map((k, i) => {
                return {barcode: k}
            })
            //console.log(this.deleteList1)
            //console.log(this.deleteList1)
        },
        'newAddtableData': function (val) {
            //console.log(val)
            //console.log(val.length)
        }
    },
    created () { // 获取下拉数据
        this.getNewGoodsInfoList('1', this.pageSize);
        this.getNewGoodsInfoList1('1', this.pageSize);
        // this.appendRow();
        this.getDownUrl(); // 获取模板地址
        this.workSupplierList(); // 获取供应商列表
        this.workApplyDepartement(); // 计划分销商
        this.productClassList(); // 获取商品大小类的下拉列表
        this.productPropertyList(); // 商品属性下拉列表
        this.productCertificateList(); // 证书下拉列表
        this.getConfigInto(); // 初始化一些配置数据
        this.getSeekSellReceiptsIntro(); // 单据简介
        this.receiptStatusList(); // 单据状态
        this.$store.dispatch('getTemplateList', {type: 2, fieldType: 'simple'})
        this.reportsPrintRK()
        // var _self = this;
        this.popups = this.incomeMoneyPopup;
        //console.log(this.$route)
        this.companyPosition = sessionStorage.getItem('companyPosition') // 用户职位
    },
    mounted() {
        let self = this

        // console.log(this.rowConfigData)
        // this.newRowData = this.rowConfigData
        // 初始化键盘事件
        window.onresize = function(){
            if (self.$refs.total_table) {
                self.$refs.total_table.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left -10 + 'px'
            }
            let flag = self.tableMainFlag
            if (self.$refs.row4_main) {
                
                if (flag.baseFlag == true || flag.weightFlag == true || flag.pageFlag == true || flag.mainStonFlag == true || flag.otherStonFlag == true || flag.workFlag == true || flag.partsFlag == true || flag.otherFlag == true || flag.priceFlag == true) {
                    // this.$refs.row4_main.style.width = "1500px"
                    //console.log(document.body.offsetWidth)
                    let tableWidth = ((document.body.offsetWidth - 1250) / 2) + 1150
                    self.$refs.row4_main.style.width = tableWidth + 'px'
                } else {
                    self.$refs.row4_main.style.width = "1250px"
                }
                self.$refs.total_table.style.width = self.$refs.row4_main.offsetWidth + 'px'
            }
            
        }
        window.addEventListener('keydown', this.keydownHandler)
        this.$refs.right_scroll_wrap.style.width = this.$refs.row4_main.offsetWidth - 450 + 'px'
        self.$refs.right_scroll_wrap.style.position = 'absolute'
        self.$refs.right_table_data.style.marginTop = "80px"
        self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left -10 + 'px'
        self.$refs.table_tlttle.style.width = self.$refs.row4_main.offsetWidth + 'px'
        this.$refs.total_table.style.position = 'fixed'
        this.$refs.total_table.style.bottom = '90px'
        this.$refs.total_table.style.width = 1250 + 'px'
        //----------- body_header 详情标题, left_tittle , total_table, body_row5
        self.$refs.table_tlttle.style.width = self.$refs.row4_main.offsetWidth + 'px'

        // this.$refs.right_table_data.style.width = '800px'
        this.$refs.row4_main.style.width = "1250px"

        this.$refs.total_table.style.left = this.$refs.body_box.getBoundingClientRect().left + 'px'
        // this.$refs.body_header.style.left = this.$refs.body_box.getBoundingClientRect().left + 'px'

        $(".new-storage-wrap").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
            mouseWheel: {
                scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: false
            },
            advanced:{
                updateOnContentResize: true
            },
            callbacks: {
                whileScrolling: function () {
                    self.$refs.right_scroll_wrap.style.width = self.$refs.row4_main.offsetWidth - 450 + 'px'
                    self.$refs.right_tittle.style.width = self.$refs.row4_main.offsetWidth - 450 + 'px'
                    self.$refs.table_tlttle.style.width = self.$refs.row4_main.offsetWidth + 'px'
                    self.$refs.total_table.style.width = self.$refs.row4_main.offsetWidth + 'px'
                    
                    // console.log(111)
                    self.$refs.total_table.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    if (self.$refs.right_table_wrap.offsetHeight > 450) {
                        self.$refs.shadow.style.height = self.$refs.right_table_wrap.offsetHeight + 50 + 'px'
                    } else {
                        self.$refs.shadow.style.height = 500 + 'px'
                    }
                    // self.$refs.body_header.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    // self.$refs.left_tittle.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    self.$refs.total_table.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    // self.$refs.body_row5.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    // console.log(22222)
                    // console.log(this.mcs.top)
                    if (this.mcs.top <= -255) {
                        self.$refs.table_tlttle.style.position = 'fixed'
                        self.$refs.table_tlttle.style.top = '140px'
                        self.$refs.left_tittle.style.position = 'fixed'
                        self.$refs.left_tittle.style.top = '190px'
                        // self.$refs.left_tittle.style.left = '190px'
                        self.$refs.left_tittle.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                        self.$refs.left_tittle.style.zIndex = '40'

                        self.$refs.right_scroll_wrap.style.position = 'fixed'
                        self.$refs.right_scroll_wrap.style.top = '190px'
                        self.$refs.right_scroll_wrap.style.zIndex = '39'
                        self.$refs.right_table_data.style.marginTop = "120px"
                        // self.$refs.left_tlttle1.style.position = 'fixed'
                        // self.$refs.left_tlttle1.style.top = '230px'
                        self.$refs.left_table_main.style.top = "119px"

                        self.$refs.total_table.style.position = 'fixed'
                        // self.$refs.total_table.style.width = '800px'
                        self.$refs.total_table.style.bottom = '90px'
                        // self.$refs.total_table.style.left = '190px'
                        self.$refs.total_table.style.opacity = '0'
                    } else {
                        self.$refs.table_tlttle.style.position = ''
                        self.$refs.table_tlttle.style.top = ''

                        self.$refs.left_tittle.style.position = ''
                        self.$refs.left_tittle.style.top = ''
                        self.$refs.left_tittle.style.left = ''
                        self.$refs.right_table_data.style.marginTop = "80px"

                        self.$refs.left_table_main.style.top = "140px"

                        self.$refs.right_scroll_wrap.style.position = 'absolute'
                        self.$refs.right_scroll_wrap.style.top = ''
                        self.$refs.right_scroll_wrap.style.left = ''

                        // self.$refs.total_table.style.position = 'absolute'
                        // self.$refs.total_table.style.bottom = '0'
                        // self.$refs.total_table.style.left = '0'

                        self.$refs.total_table.style.position = 'fixed'
                        // self.$refs.total_table.style.width = '800px'
                        self.$refs.total_table.style.bottom = '90px'
                        // self.$refs.total_table.style.left = '190px'
                        self.$refs.total_table.style.opacity = '0'
                    }
                },
                onTotalScroll: function () {
                    //console.log(this.mcs.topPct)
                    //console.log(self.isREfresh)
                    self.$refs.total_table.style.opacity = '1'
                    if (self.isREfresh == true) {
                        //console.log(self.amandTableData.length)
                        if (self.amandTableData.length <= 0 && self.newAddtableData.length <= 0) {
                            self.pageSize += 10
                            self.getNewGoodsInfoList('1', self.pageSize);
                            self.getNewGoodsInfoList1('1', self.pageSize);
                        } else if (self.amandTableData.length > 0 || self.newAddtableData.length > 0) {
                           // console.log(2222222222)
                            self.$confirm('有数据未保存，是否刷新?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                            }).then(() => {
                                self.pageSize += 10
                                self.getNewGoodsInfoList('1', self.pageSize);
                                self.getNewGoodsInfoList1('1', self.pageSize);
                                self.newAddtableData = []
                                self.amandTableData = []
                            }).catch(() => {
                                self.$message({
                                    type: 'info',
                                    message: '已取消操作'
                                });  
                            });
                        }
                        
                    }
                },
                onScroll: function(){
                    self.$refs.total_table.style.opacity = '1'
                }
            }
            
        });
        // $(".right-table-wrap").mCustomScrollbar({
        //     theme: "minimal-dark",
        //     axis: "x",
        //     autoHideScrollbar: true,
        //     scrollInertia: 500,
        //     advanced: {
        //         updateOnContentResize: true,
        //         autoExpandHorizontalScroll: true,
        //         updateOnSelectorChange: true
        //     },
        //     callbacks: {
        //         whileScrolling: function () {
        //             // console.log(this.mcs.left)
        //             // console.log(this.mcs.leftPct)
        //             self.scrollLeft = this.mcs.leftPct
        //             self.$refs.right_tittle.style.left = 640 + this.mcs.left + "px"
        //         }
        //     }
        // });
        $(".right_table_tittle_scroll_wrap").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "x",
            mouseWheel:{ enable: false },
            scrollButtons:{ enable: false }
        });
        eventBus.$on("scrollTop", function (val) {
            //console.log(val.itemTop)
            //self.$refs.scrollDiv.style.marginTop = val.itemTop + 80 + "px"
        })
    },
    methods: {
        ...mapActions([
            "workSupplierList", // 供应商列表
            "workApplyDepartement", // 计划分销商
            "workProductDetail", // 商品列表
            "workProductStatus" // 审核状态
        ]),
        checkAllItem () { // 全选
            if (this.tableRowData.length == this.deleteList.length) {
                this.deleteList = []
                this.deleteList1 = []
                this.allName = '全选'
            } else {
                this.deleteList = this.tableRowData.map((item, index) => {
                    return item.barcode
                })
                this.allName = '全不选'
            }
            //console.log(this.deleteList)
        },
        selectDelItem (item) { // 选择删除项目
            console.log(item)
            let obj = {
                barcode: item.barcode
            }
            if (this.deleteList.includes(item.barcode)) {
                let i = this.deleteList.indexOf(item.barcode)
                this.deleteList.splice(i, 1)
            } else {
                this.deleteList.push(item.barcode)
            }
            //console.log(this.deleteList)
        },
        batchDeletion (type) { // 批量删除
            if (type == 1) {
                
                if (this.deleteList1.length == 0) {
                    this.isSelDelect = true

                    this.deleteList = []
                    this.deleteList1 = []
                } else {
                    this.$confirm('此操作将删除选中商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(() => {
                        let options = {
                            "productList": this.deleteList1,
                            "operate": 2,
                            "orderNum": this.$route.query.orderNumber
                        }
                        operateProductList(options).then((res) => {
                            console.log(res)
                            if (res.data.state == 200) {
                                this.isSelDelect = true
                                this.deleteList = []
                                this.getNewGoodsInfoList('1', this.pageSize);
                                this.getNewGoodsInfoList1('1', this.pageSize);
                                this.getSeekSellReceiptsIntro(); // 单据简介
                                this.receiptStatusList(); // 单据状态
                                this.reportsPrintRK()
                            } else {
                                this.$store.dispatch('workPopupError', res.data.msg)
                            }
                        }, (res) => {

                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                    
                }
                
            } else if (type == 2) {
                this.isSelDelect = true
                this.deleteList = []
                this.deleteList1 = []
            } 
        },
        // appendBatchRow () { // 批量新增
        //     this.popup1.batchAddReceiptsPopup = !this.popup1.batchAddReceiptsPopup;
        // },
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
            this.popup1.deleteReceipts = parm.name;
            this.popup1.auditPopup = parm.name;
            this.popup1.batchAddReceiptsPopup = parm.name;
            this.getNewGoodsInfoList('1', this.pageSize);
            this.getNewGoodsInfoList1('1', this.pageSize);
            this.getSeekSellReceiptsIntro(); // 单据简介
            this.receiptStatusList(); // 单据状态
        },
        addRole () {
            let checkType = this.receiptsIntroList.checkType === "1";
            let isRole = this.receiptsIntroList.isRole === "Y";
            if (isRole && checkType) {
                return true;
            } else {
                return false;
            }
        },
        //获取当前的接口类型
        getReportType(){
        	return this.propOptons.reportType
        },
         //打印表格 
        tabPrin () {
        	//console.log(111111)
        	//console.log(this.dataGridStorage)
        	if( this.dataGridStorage.productTypeList && this.dataGridStorage.productTypeList.length ==0 || 
        	    this.dataGridStorage.printDetailList && this.dataGridStorage.printDetailList.length ==0 ){
        		this.$message({
        			type:'error',
        			message :'暂无数据打印'
        		})
        		return;
        	}
        	this.isPrint = 1;
        	let print = null;
        	
        	this.appPrint = document.getElementById('appPrint')
        	
        	if( this.IntervalOut ) clearInterval( this.IntervalOut )
        	document.getElementById('app').style.display = 'none';
        	
        	setTimeout(()=>{
        		this.appPrint.innerHTML = this.$refs.tablePrint.innerHTML
        	},1000)
        	setTimeout(()=>{
        		print = document.execCommand('print');	
        	},1500)
        	
        	this.IntervalOut = setInterval(()=>{
        		if( print ){
        			document.getElementById('app').style.display = 'block';
	        		this.isPrint = 0;
	        		if( this.IntervalOut ) clearInterval( this.IntervalOut )
	        		this.IntervalOut = null;
	        		this.appPrint.innerHTML = '';
	        	}else if( print == false ){
	        		if( this.IntervalOut ) clearInterval( this.IntervalOut )
	        		if(!window.print()){
	        			document.getElementById('app').style.display = 'block';
	        			this.isPrint = 0;
	        			this.IntervalOut = null;
	        			this.appPrint.innerHTML = '';
	        		}
	        	}
        	},10)
        	
        },
        queryBarCode (barcode, operate, index) { // 通过条码号搜索数据
            //console.log(barcode)
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
                    // sessionStorage.setItem("琪琪琪琪IQIQIQIQ", JSON.stringify(response.data.data));
                    if (response.data.state === 200) {
                        //console.log(response)
                        this.tableRowData[index] = response.data.data
                        let rowData = this.getconfigData(false);
                        rowData.productId = response.data.data.productId;
                        // this.datas.newList.push(rowData); // 修改数据
                        //console.log(rowData)
                        this.getNewGoodsInfoList('1', this.pageSize);
                        this.getNewGoodsInfoList1('1', this.pageSize);
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
        },
        deleteGoods (id, index) {
            //console.log(1111)
            if (this.amandTableData.length > 0 || this.newAddtableData.length > 0) {
                this.$confirm('有数据未保存，是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                }).then(() => {
                    this.$confirm('此操作将在本单据中删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(() => {
                        let options = {
                            orderNum:  this.$route.query.orderNumber,
                            productList: [
                                {barcode: id}
                            ],
                            operate: '2'
                        }
                        operateProductList(options).then((res) => {
                            //console.log(res)
                            if (res.data.state == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getNewGoodsInfoList('1', this.pageSize);
                                this.getNewGoodsInfoList1('1', this.pageSize);
                                // this.getSeekSellReceiptsIntro(); // 单据简介
                                // this.receiptStatusList(); // 单据状态
                                this.reportsPrintRK()
                                // this.newRowData = []
                                this.newRowData = []
                                this.tableIndex = null
                            }else {
                                this.$store.dispatch('workPopupError', res.data.msg)
                            }
                        }, (res) => {
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            }); 
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });  
                });
            } else {
                this.$confirm('此操作将在本单据中删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(() => {
                    let options = {
                        orderNum:  this.$route.query.orderNumber,
                        productList: [
                            {barcode: id}
                        ],
                        operate: '2'
                    }
                    operateProductList(options).then((res) => {
                        //console.log(res)
                        if (res.data.state == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getNewGoodsInfoList('1', this.pageSize);
                            this.getNewGoodsInfoList1('1', this.pageSize);
                            // this.getSeekSellReceiptsIntro(); // 单据简介
                            // this.receiptStatusList(); // 单据状态
                            this.reportsPrintRK()
                            // this.newRowData = []
                            this.newRowData = []
                            this.tableIndex = null
                        }else {
                            this.$store.dispatch('workPopupError', res.data.msg)
                        }
                    }, (res) => {
                        this.$message({
                            type: 'info',
                            message: '删除失败'
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
        switchAct (val) {
            if (val == true) {
                this.popup.amendingPitchOn = '2'
            } else {
                this.popup.amendingPitchOn = '1'
            }
        },
        watchTableScroll () {
           // console.log(this.$refs.right_table_wrap.scrollLeft)
           //console.log(this.$refs.right_tittle.style.left)
            // this.scrollLeft = this.mcs.leftPct
            // this.$refs.right_scroll_wrap.style.left = this.$refs.right_table_wrap.scrollLeft + "px"
            this.$refs.right_scroll_wrap.style.width = this.$refs.row4_main.offsetWidth - 450 + 'px'
            this.$refs.right_tittle.style.width = this.$refs.row4_main.offsetWidth - 450 + 'px'
            this.$refs.table_tlttle.style.width = this.$refs.row4_main.offsetWidth + 'px'
            this.$refs.total_table.style.width = this.$refs.row4_main.offsetWidth + 'px'
            // console.log(111)
            this.$refs.total_table.style.left = this.$refs.body_box.getBoundingClientRect().left + 'px'
            if (this.$refs.right_table_wrap.offsetHeight > 450) {
                this.$refs.shadow.style.height = this.$refs.right_table_wrap.offsetHeight + 50 + 'px'
            } else {
                this.$refs.shadow.style.height = 500 + 'px'
            }
            this.$refs.right_total_table.style.left =  - this.$refs.right_table_wrap.scrollLeft + "px"
            this.$refs.right_tittle.style.left =  - this.$refs.right_table_wrap.scrollLeft + "px"
            //console.log(this.$refs.right_total_table.style.left)
        },
        inputAmandData (item, index, name) {
            //console.log(item)
            let obj = {}
            switch (name) {
                case "base":
                    obj = {
                        "productId": item.productId,
                        "modelNo": item.modelNo,
                        "handInch": item.handInch,
                        "remark": item.remark,
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    //console.log(this.amandTableData)
                    break;
                case "weight":
                    obj = {
                        "productId": item.productId,
                        "totalWeight": item.totalWeight,
                        "netWeight": item.netWeight,
                        "heavyCode": item.heavyCode,
                        "goldCost": item.goldCost,
                        "goldPrice": item.goldPrice,
                        "goldE": item.goldE,
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "page":
                    obj = {
                        "productId": item.productId,
                        "certifiNo": item.certifiNo,
                        "certifiFee": item.certifiFee,
                        "authCode": item.authCode
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "main":
                    obj = {
                        "productId": item.productId,
                        "mainName": item.mainName,
                        "count": item.count,
                        "mainWeight": item.mainWeight,
                        "unitPrice": item.unitPrice,
                        "mainPrice": item.mainPrice
                    }
                    for (let i in obj) {
                        
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "deputy":
                    obj = {
                        "productId": item.productId,
                        "deputyName": item.deputyName,
                        "deputyCount": item.deputyCount,
                        "deputyWeight": item.deputyWeight,
                        "deputyUnitPrice": item.deputyUnitPrice,
                        "deputyPrice": item.deputyPrice
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "fee":
                    obj = {
                        "productId": item.productId,
                        "soldFee": item.soldFee,
                        "inFee": item.inFee,
                        "inMoney": item.inMoney,
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "part":
                    obj = {
                        "productId": item.productId,
                        "partCount": item.partCount,
                        "partWeight": item.partWeight,
                        "partPrice": item.partPrice,
                        "price": item.price
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "other":
                    obj = {
                        "productId": item.productId,
                        "otherFeeName": item.otherFeeName,
                        "otherFee": item.otherFee
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "price":
                    obj = {
                        "productId": item.productId,
                        "costPrice": item.costPrice,
                        "ratio": item.ratio,
                        "soldPrice": item.soldPrice
                    }
                    for (let i in obj) {
                        if (obj[i] == '' || obj[i] == null) {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
            }
        },
        operateData (index, name, type) {
            // console.log(index)
            // console.log(name)
            if (name == 'weight') { //重量
                // this.newRowData.totalWeight = this.newRowData.netWeight + this.newRowData.mainWeight + this.newRowData.deputyWeight + this.newRowData.partWeight
                // this.newRowData.netWeight = this.newRowData.netWeight
                // this.newRowData.heavyCode = this.newRowData.netWeight + this.newRowData.partWeight
                // this.newRowData.goldCost = this.newRowData.goldCost
                // this.newRowData.goldPrice = this.newRowData.goldPrice
                // this.newRowData.goldE = this.newRowData.netWeight * (1 + (this.newRowData.goldCost/100)) * this.newRowData.goldPrice

                if (type == 1) { // --------------------------------------------------------------------- 总件重
                   this.newRowData.netWeight = (Number(this.newRowData.totalWeight) - (Number(this.newRowData.deputyWeight) + Number(this.newRowData.partWeight) + Number(this.newRowData.mainWeight))).toFixed(3)
                } else if (type == 2){ // --------------------------------------------------------------------- 净金重
                    this.newRowData.totalWeight = (Number(this.newRowData.netWeight) + Number(this.newRowData.mainWeight) + Number(this.newRowData.deputyWeight) + Number(this.newRowData.partWeight)).toFixed(3)
                    this.newRowData.heavyCode = (Number(this.newRowData.netWeight) + Number(this.newRowData.partWeight)).toFixed(3)
                } else if (type == 3){ // --------------------------------------------------------------------- 含配金重
                    this.newRowData.netWeight = Number(this.newRowData.heavyCode - this.newRowData.partWeight).toFixed(3)
                } else if (type == 4){ // --------------------------------------------------------------------- 金耗
                     this.newRowData.goldE = Number(this.newRowData.netWeight) * (1 + Number(this.newRowData.goldCost/100)) * Number(this.newRowData.goldPrice)
                } else if (type == 5){ // --------------------------------------------------------------------- 金价
                    this.newRowData.goldE = Number(this.newRowData.netWeight) * (1 + Number(this.newRowData.goldCost/100)) * Number(this.newRowData.goldPrice).toFixed(2)
                } else if (type == 6){ // --------------------------------------------------------------------- 金料额
                    this.newRowData.goldPrice = Number(this.newRowData.goldE / (this.newRowData.netWeight * (1 + (this.newRowData.goldCost/100)))).toFixed(2)
                    this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                    this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                }
            } else if (name == "main") { // 主石
                if (type == 1) {

                } else if (type == 2) { // 粒数
                    if (this.newRowData.mainCalcMethod == '计件') {
                        this.newRowData.mainPrice = Number(this.newRowData.count * this.newRowData.unitPrice).toFixed(2)
                    }
                    //console.log(this.tableRowData)
                } else if (type == 3) {
                    if (this.newRowData.mainCalcMethod == '计重') {
                        this.newRowData.mainPrice = Number(this.newRowData.mainWeight * this.newRowData.unitPrice).toFixed(2)
                        this.newRowData.totalWeight = (Number(this.newRowData.netWeight) + Number(this.newRowData.mainWeight) + Number(this.newRowData.deputyWeight) + Number(this.newRowData.partWeight)).toFixed(3)
                    }
                } else if (type == 4) {
                    if (this.newRowData.mainCalcMethod == '计件') {
                        this.newRowData.mainPrice = Number(this.newRowData.count * this.newRowData.unitPrice).toFixed(2)
                    } else if (this.newRowData.mainCalcMethod == '计重') {
                        this.newRowData.mainPrice = Number(this.newRowData.mainWeight * this.newRowData.unitPrice).toFixed(2)
                    }
                } else if (type == 5) {
                    if (this.newRowData.mainCalcMethod == '计件') {
                        this.newRowData.unitPrice = (Number(this.newRowData.mainPrice) / Number(this.newRowData.count)).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    } else if (this.newRowData.mainCalcMethod == '计重') {
                        this.newRowData.unitPrice = (Number(this.newRowData.mainPrice) / Number(this.newRowData.mainWeight)).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    }
                }
            } else if (name == "deputy") { // 副石
                if (type == 1) {

                } else if (type == 2) {
                    if (this.newRowData.deputyCalcMethod == '计件') {
                        this.newRowData.deputyPrice = (Number(this.newRowData.deputyCount) * Number(this.newRowData.deputyUnitPrice)).toFixed(2)
                        // console.log()
                    } else if (this.newRowData.deputyCalcMethod == '计重') {
                        this.newRowData.deputyPrice = (Number(this.newRowData.deputyWeight) * Number(this.newRowData.deputyUnitPrice)).toFixed(2)
                    }
                } else if (type == 3) {
                    if (this.newRowData.deputyCalcMethod == '计件') {
                        this.newRowData.deputyPrice = (Number(this.newRowData.deputyCount) * Number(this.newRowData.deputyUnitPrice)).toFixed(2)
                    } else if (this.newRowData.deputyCalcMethod == '计重') {
                        this.newRowData.deputyPrice = (Number(this.newRowData.deputyWeight) * Number(this.newRowData.deputyUnitPrice)).toFixed(2)
                        this.newRowData.totalWeight = (Number(this.newRowData.netWeight) + Number(this.newRowData.mainWeight) + Number(this.newRowData.deputyWeight) + Number(this.newRowData.partWeight)).toFixed(3)
                    }
                } else if (type == 4) { // 单价
                    if (this.newRowData.deputyCalcMethod == '计件') {
                        this.newRowData.deputyPrice = (Number(this.newRowData.deputyCount) * Number(this.newRowData.deputyUnitPrice)).toFixed(2)
                    } else if (this.newRowData.deputyCalcMethod == '计重') {
                        this.newRowData.deputyPrice = (Number(this.newRowData.deputyWeight) * Number(this.newRowData.deputyUnitPrice)).toFixed(2)
                    }
                } else if (type == 5) { // 副石额
                    if (this.newRowData.deputyCalcMethod == '计件') {
                        this.newRowData.deputyUnitPrice = (Number(this.newRowData.deputyPrice) / Number(this.newRowData.deputyCount)).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    } else if (this.newRowData.deputyCalcMethod == '计重') {
                        this.newRowData.deputyUnitPrice = (Number(this.newRowData.deputyPrice) / Number(this.newRowData.deputyWeight)).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    }
                }
            } else if (name == "fee") {
                if (type == 1) {

                } else if (type == 2) {
                    if (this.newRowData.inMethod == '计重') {
                        this.newRowData.inMoney = Number(this.newRowData.netWeight * this.newRowData.inFee).toFixed(2)
                    }
                } else if (type == 3) {
                    if (this.newRowData.inMethod == '计重') {
                        this.newRowData.inFee = (Number(this.newRowData.inMoney) / Number(this.newRowData.netWeight)).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    } else if (this.newRowData.inMethod == '计件') {
                        this.newRowData.inFee = Number(1 * this.newRowData.inMoney).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    }
                }
            } else if (name == "part") {
                if (type == 1) { // 配件数
                    if (this.newRowData.calcMethod == '计件') {
                        this.newRowData.price = Number(this.newRowData.partCount * this.newRowData.partPrice).toFixed(3)
                    }
                } else if (type == 2) { // 配件重
                    if (this.newRowData.calcMethod == '计重') {
                        this.newRowData.price = Number(this.newRowData.partWeight * this.newRowData.partPrice).toFixed(3)
                        this.newRowData.totalWeight = (Number(this.newRowData.netWeight) + Number(this.newRowData.mainWeight) + Number(this.newRowData.deputyWeight) + Number(this.newRowData.partWeight)).toFixed(3)
                    }
                } else if (type == 3) { // 配件单价
                    if (this.newRowData.calcMethod == '计重') {
                        this.newRowData.price = Number(this.newRowData.partWeight * this.newRowData.partPrice).toFixed(3)
                    } else if (this.newRowData.calcMethod == '计件') {
                        this.newRowData.price = Number(this.newRowData.partCount * this.newRowData.partPrice).toFixed(3)
                    }
                } else if (type == 4) { // 配件额
                    if (this.newRowData.calcMethod == '计重') {
                        this.newRowData.partPrice = Number(this.newRowData.price / this.newRowData.partWeight).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    } else if (this.newRowData.calcMethod == '计件') {
                        this.newRowData.price = Number(this.newRowData.price * this.newRowData.partCount).toFixed(2)
                        this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                        this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                    }
                }
            } else if (name == "other") {
                if (type == 2) {
                    // this.newRowData.otherFee = parseInt(this.newRowData.otherFee).toFixed(2)
                    this.newRowData.costPrice = (Number(this.newRowData.goldE) + Number(this.newRowData.certifiFee) + Number(this.newRowData.mainPrice) + Number(this.newRowData.deputyPrice) + Number(this.newRowData.inMoney) + Number(this.newRowData.price) + Number(this.newRowData.otherFee)).toFixed(2)
                    this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                }
            } else if (name == "price") {
                if (type == 1) {
                    this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                } else if (type == 2) {
                    this.newRowData.soldPrice = (Number(this.newRowData.costPrice) * Number(this.newRowData.ratio)).toFixed(2)
                } else if (type == 3) {
                    this.newRowData.ratio = (Number(this.newRowData.soldPrice) / Number(this.newRowData.costPrice)).toFixed(2)
                }
            }
        },
        selectData (name, index, item, value, indexNum) {

            let self = this
            if (name == 'page' && index == 1) {  // item.hasOwnProperty('certificateName') == true
                for (let i = 0; i < this.configPullDownData.certifiName.length; i++) {
                    if (this.configPullDownData.certifiName[i].certificateName == this.newRowData.certifiName) {
                        this.tableRowData[indexNum].certifiName = this.newRowData.certifiName = this.configPullDownData.certifiName[i].certificateName
                        this.tableRowData[indexNum].organizationName = this.newRowData.organizationName = this.configPullDownData.certifiName[i].organizationName
                        this.tableRowData[indexNum].website = this.newRowData.website = this.configPullDownData.certifiName[i].website
                        this.tableRowData[indexNum].phone = this.newRowData.phone = this.configPullDownData.certifiName[i].phone
                        this.tableRowData[indexNum].stand1 = this.newRowData.stand1 = this.configPullDownData.certifiName[i].stand1
                        this.tableRowData[indexNum].stand2 = this.newRowData.stand2 = this.configPullDownData.certifiName[i].stand2
                        this.tableRowData[indexNum].stand3 = this.newRowData.stand3= this.configPullDownData.certifiName[i].stand3
                        this.tableRowData[indexNum].certifiFee = this.newRowData.certifiFee = this.configPullDownData.certifiName[i].certifiFee
                    }
                }
            } else if (name == "stand") {
                if (index == 1) {

                } else if (index == 2) {

                } else if (index == 3) {
                    if (this.newRowData.mainCalcMethod == '计重') {
                        this.newRowData.mainPrice = Number(this.newRowData.mainWeight * this.newRowData.unitPrice).toFixed(2)
                    } else if (this.newRowData.mainCalcMethod == '计件') {
                        this.newRowData.mainPrice = Number(this.newRowData.count * this.newRowData.unitPrice).toFixed(2)
                    }
                }
            } else if (name == "deputy") {
                if (index == 1) {

                } else if (index == 2) {
                    if (this.newRowData.deputyCalcMethod == '计重') {
                        this.newRowData.deputyPrice = Number(this.newRowData.deputyWeight * this.newRowData.deputyUnitPrice).toFixed(2)
                    } else if (this.newRowData.deputyCalcMethod == '计件') {
                        this.newRowData.deputyPrice = Number(this.newRowData.deputyCount * this.newRowData.deputyUnitPrice).toFixed(2)
                    }
                }
            } else if (name == "fee") {
                if (index == 1) {

                } else if (index == 2) {
                    if (this.newRowData.inMethod == '计重') {
                        this.newRowData.inMoney = Number(this.newRowData.netWeight * this.newRowData.inFee).toFixed(2)
                    } else if (this.newRowData.inMethod == '计件') {
                        this.newRowData.inMoney = Number(1 * this.newRowData.inFee).toFixed(2)
                    }
                }
            } else if (name == "part") {
                if (index == 2) {
                    if (this.newRowData.calcMethod == '计重') {
                        this.newRowData.price = Number(this.newRowData.partWeight * this.newRowData.partPrice).toFixed(3)
                    } else if (this.newRowData.calcMethod == '计件') {
                        this.newRowData.price = Number(this.newRowData.partCount * this.newRowData.partPrice).toFixed(3)
                    }
                }
            }
            let timer = setTimeout(function () {
                for (let i in item) {
                    // console.log(i)
                    if (value == 'certifiName') {
                        let dataArr = [
                            {
                                productId: item.productId,
                                certifiName: item.certifiName
                            },
                            {
                                productId: item.productId,
                                organizationName: item.organizationName
                            },
                            {
                                productId: item.productId,
                                website: item.website
                            },
                            {
                                productId: item.productId,
                                phone: item.phone
                            },
                            {
                                productId: item.productId,
                                stand1: item.stand1
                            },
                            {
                                productId: item.productId,
                                stand2: item.stand2
                            },
                            {
                                productId: item.productId,
                                stand3: item.stand3
                            }
                        ]
                        dataArr.map((item, index) => {
                            self.amandTableData.push(item)
                        })
                        return
                    } else if (i == value) {
                        let data = {}
                       // console.log(data[value] = item[i])
                    //    console.log(item[i])
                    //    console.log(item)
                        data[value] = item[i]
                        if (item[i] == null) {
                            return
                        }
                        data.productId = item.productId
                        self.amandTableData.push(data)
                        //console.log(data)
                        console.log(self.amandTableData)
                        break;
                    }
                }
            }, 10)
        },
        selectTable (index) {
            // console.log(index)
            this.tableIndex = index
            this.newRowData = this.tableRowData[index]
            this.selectData1 = this.tableRowData[index]
            // console.log(this.tableRowData)
        },
        contralWidth () { // 控制row4的宽度
            let flag = this.tableMainFlag
            if (flag.baseFlag == true || flag.weightFlag == true || flag.pageFlag == true || flag.mainStonFlag == true || flag.otherStonFlag == true || flag.workFlag == true || flag.partsFlag == true || flag.otherFlag == true || flag.priceFlag == true) {
                // this.$refs.row4_main.style.width = "1500px"
                //console.log(document.body.offsetWidth)
                let tableWidth = ((document.body.offsetWidth - 1250) / 2) + 1150
                this.$refs.row4_main.style.width = tableWidth + 'px'
            } else {
                this.$refs.row4_main.style.width = "1250px"
            }
            // for (let i in this.tableMainFlag) {
            //     console.log(this.tableMainFlag[i])
            //     if (this.tableMainFlag[i] == true) {
            //         
            //         console.log("true了，还不动么")
            //     } else {
            //         this.$refs.row4_main.style.width = "1250px"
            //     }
            // }
            this.$refs.total_table.style.width = this.$refs.row4_main.offsetWidth + 'px'
            this.$refs.right_scroll_wrap.style.width = this.$refs.row4_main.offsetWidth - 450 + 'px'
        },
        // 删除单据
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
                        console.log(res)
                        this.$router.push({path: '/work/storage'})
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
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
                operateRemarkOperation(option).then((res) => {
                    //console.log(res)
                    this.refreshRemark = !this.refreshRemark
                }, (res) => {
                    console.log(res)
                })
            } else if (type == 4) {
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
                    console.log(res)
                    this.refreshRemark = !this.refreshRemark
                }, (res) => {
                    console.log(res)
                })
            }
        },
        delRemark (val) {
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
                    // console.log(options)
                    operateReceiptOperation(options).then((res) => {
                        //console.log(res)
                        if (res.data.state == 200) {
                            this.$message({
                                message: '撤销审核成功',
                                type: 'success'
                            });
                            // this.getNewGoodsInfoList('1', this.pageSize);
                            // this.getNewGoodsInfoList1('1', this.pageSize);
                            this.getSeekSellReceiptsIntro(); // 单据简介
                            this.receiptStatusList(); // 单据状态
                            this.reportsPrintRK()
                            this.refreshRemark = !this.refreshRemark
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
                // console.log(this.auditShow)
            } else if (type == 4) { // 提交审核
                this.$confirm('确定要提交审核吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(() => {
                    let options = {
                        orderNum: this.$route.query.orderNumber
                    }
                    operateSubmitAudit(options).then((res) => {
                        //console.log(res)
                        if (res.data.state == 200) {
                            this.$message({
                                message: '提交审核成功',
                                type: 'success'
                            });
                            // this.getNewGoodsInfoList('1', this.pageSize);
                            // this.getNewGoodsInfoList1('1', this.pageSize);
                            this.getSeekSellReceiptsIntro(); // 单据简介
                            this.receiptStatusList(); // 单据状态
                            this.reportsPrintRK()
                            this.refreshRemark = !this.refreshRemark
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
                //console.log(res)
                if (res.data.state == 200) {
                    if ( type == 5 ) {
                        this.$message({
                            message: '通过审核成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '驳回审核成功',
                            type: 'success'
                        });
                    }
                    // this.getNewGoodsInfoList('1', this.pageSize);
                    // this.getNewGoodsInfoList1('1', this.pageSize);
                    this.getConfigInto(); // 初始化一些配置数据
                    this.getSeekSellReceiptsIntro(); // 单据简介
                    this.receiptStatusList(); // 单据状态
                    this.reportsPrintRK()
                    this.refreshRemark = !this.refreshRemark
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
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
        // 展开表格
        myCustomFn () {
            this.tableMainFlag.baseFlag = !this.tableMainFlag.baseFlag
            this.tableMainFlag.weightFlag = !this.tableMainFlag.weightFlag
            this.tableMainFlag.pageFlag = !this.tableMainFlag.pageFlag
            this.tableMainFlag.mainStonFlag = !this.tableMainFlag.mainStonFlag
            this.tableMainFlag.otherStonFlag = !this.tableMainFlag.otherStonFlag
            this.tableMainFlag.workFlag = !this.tableMainFlag.workFlag
            this.tableMainFlag.partsFlag = !this.tableMainFlag.partsFlag
            this.tableMainFlag.otherFlag = !this.tableMainFlag.otherFlag
            this.tableMainFlag.priceFlag = !this.tableMainFlag.priceFlag
            if (this.tableMainFlag.baseFlag == true) {
                this.tableMainColSpan.baseNum = 5
                this.tableMainColSpan.weightNum = 7
                this.tableMainColSpan.pageNum = 10
                this.tableMainColSpan.mainStonNum = 15
                this.tableMainColSpan.otherStonNum = 8
                this.tableMainColSpan.workNum = 5
                this.tableMainColSpan.partsNum = 6
                this.tableMainColSpan.otherNum = 2
                this.tableMainColSpan.priceNum = 3

                this.tableMainFlag.baseFlag = true
                this.tableMainFlag.weightFlag = true
                this.tableMainFlag.pageFlag = true
                this.tableMainFlag.mainStonFlag = true
                this.tableMainFlag.otherStonFlag = true
                this.tableMainFlag.workFlag = true
                this.tableMainFlag.partsFlag = true
                this.tableMainFlag.otherFlag = true
                this.tableMainFlag.priceFlag = true
            } else {
                this.tableMainColSpan.baseNum = 0
                this.tableMainColSpan.weightNum = 0
                this.tableMainColSpan.pageNum = 0
                this.tableMainColSpan.mainStonNum = 0
                this.tableMainColSpan.otherStonNum = 0
                this.tableMainColSpan.workNum = 0
                this.tableMainColSpan.partsNum = 0
                this.tableMainColSpan.otherNum = 0
                this.tableMainColSpan.priceNum = 0

                this.tableMainFlag.baseFlag = false
                this.tableMainFlag.weightFlag = false
                this.tableMainFlag.pageFlag = false
                this.tableMainFlag.mainStonFlag = false
                this.tableMainFlag.otherStonFlag = false
                this.tableMainFlag.workFlag = false
                this.tableMainFlag.partsFlag = false
                this.tableMainFlag.otherFlag = false
                this.tableMainFlag.priceFlag = false
            }
            this.contralWidth()
        },
        onScroll (e) { // 滚动加载
            var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
            var clientHeight = e.currentTarget.clientHeight; // 元素的高度
            var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
            if (clientHeight + scrollTop >= scrollHeight) {
            }
        },
        showTableCol (index) {
            if (index == 1) { // 基本信息
                if (this.tableMainFlag.baseFlag == false) {
                    this.tableMainFlag.baseFlag = true
                    this.tableMainColSpan.baseNum = 5
                } else if (this.tableMainFlag.baseFlag == true) {
                    this.tableMainFlag.baseFlag = false
                    this.tableMainColSpan.baseNum = 0
                }
            } else if (index == 2) { // 重量
                if (this.tableMainFlag.weightFlag == false) {
                    this.tableMainFlag.weightFlag = true
                    this.tableMainColSpan.weightNum = 7
                } else if (this.tableMainFlag.weightFlag == true) {
                    this.tableMainFlag.weightFlag = false
                    this.tableMainColSpan.weightNum = 0
                }
            } else if (index == 3) { // 证书
                if (this.tableMainFlag.pageFlag == false) {
                    this.tableMainFlag.pageFlag = true
                    this.tableMainColSpan.pageNum = 10
                } else if (this.tableMainFlag.pageFlag == true) {
                    this.tableMainFlag.pageFlag = false
                    this.tableMainColSpan.pageNum = 0
                }
            } else if (index == 4) { // 主石
                if (this.tableMainFlag.mainStonFlag == false) {
                    this.tableMainFlag.mainStonFlag = true
                    this.tableMainColSpan.mainStonNum = 15
                } else if (this.tableMainFlag.mainStonFlag == true) {
                    this.tableMainFlag.mainStonFlag = false
                    this.tableMainColSpan.mainStonNum = 0
                }
            } else if (index == 5) { // 副石
                if (this.tableMainFlag.otherStonFlag == false) {
                    this.tableMainFlag.otherStonFlag = true
                    this.tableMainColSpan.otherStonNum = 8
                } else if (this.tableMainFlag.otherStonFlag == true) {
                    this.tableMainFlag.otherStonFlag = false
                    this.tableMainColSpan.otherStonNum = 0
                }
            } else if (index == 6) { // 工费
                if (this.tableMainFlag.workFlag == false) {
                    this.tableMainFlag.workFlag = true
                    this.tableMainColSpan.workNum = 5
                } else if (this.tableMainFlag.workFlag == true) {
                    this.tableMainFlag.workFlag = false
                    this.tableMainColSpan.workNum = 0
                }
            } else if (index == 7) { // 配件
                if (this.tableMainFlag.partsFlag == false) {
                    this.tableMainFlag.partsFlag = true
                    this.tableMainColSpan.partsNum = 6
                } else if (this.tableMainFlag.partsFlag == true) {
                    this.tableMainFlag.partsFlag = false
                    this.tableMainColSpan.partsNum = 0
                }
            } else if (index == 8) { // 其他费用
                if (this.tableMainFlag.otherFlag == false) {
                    this.tableMainFlag.otherFlag = true
                    this.tableMainColSpan.otherNum = 2
                } else if (this.tableMainFlag.otherFlag == true) {
                    this.tableMainFlag.otherFlag = false
                    this.tableMainColSpan.otherNum = 0
                }
            } else if (index == 9) { // 标价
                if (this.tableMainFlag.priceFlag == false) {
                    this.tableMainFlag.priceFlag = true
                    this.tableMainColSpan.priceNum = 3
                } else if (this.tableMainFlag.priceFlag == true) {
                    this.tableMainFlag.priceFlag = false
                    this.tableMainColSpan.priceNum = 0
                }
            }
            this.contralWidth()
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
                //console.log(res)
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
                if (this.nowStatus == '2' || this.nowStatus == '3' || this.nowStatus == '6') {
                    this.isOperate = true
                } else {
                    this.isOperate = false
                }
                if (res.data.data.nowStatus == "1") {
                    this.stepIndex = 1
                    this.$refs.mask.style.width = "312.5px"
                } else if (res.data.data.nowStatus == "2") {
                    this.stepIndex = 2
                    this.$refs.mask.style.width = "625px"
                } else if (res.data.data.nowStatus == "3") {
                    this.stepIndex = 3
                    this.$refs.mask.style.width = "937.5px"
                } else if (res.data.data.nowStatus == "6") {
                    this.stepIndex = 4
                    this.$refs.mask.style.width = "1250px"
                }
            }, (res) => {
                console.log(res)
            })
        },
        keydownHandler(e) { // 键盘处理函数
            if (e.keyCode === 13) {
                this.tableIndex++
                if (this.tableIndex > this.tableRowData.length-1) {
                    this.tableIndex = this.tableRowData.length-1
                }
            }
        },
        getPitchLittleClassKey (parm) {
            this.pitchLittleClassKey = parm;
        },
        queryOptionFun (parm) {
            if (this.isReload) {
                window.location.reload();
            } else {
                if (parm) {
                    this.$router.push("/work/storage");
                } else {
                    this.popup.isQueryOption = parm;
                }
            }
        },
        handleSizeChange (val) {
        },
        handleCurrentChange (val) {
            this.crudData.currentPage = val;
        },
        valueChangeDetection (littleClassKey, AllData, index) { // 值改变重新计算合计
            switch (littleClassKey) {
                /* -----重量----- */
                case "heavyCode": // 含配金重
                    this.getComputedHeavyCodeNetWeight("heavyCodeNetWeight", AllData, index); // 净金重
                    this.getComputedTotal("totalWeight", AllData, index); // 总件重
                    break;
                case "totalWeight": // 总件重
                    this.getComputedTotal("netWeight", AllData, index); // 净金重
                    this.getComputedTotal("heavyCode", AllData, index); // 含配金重
                    break;
                /* -----主石----- */
                case "unit": // 主石单价
                this.getComputedTotal("totalWeight", AllData, index); // 总件重
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "mainPrice": // 主石额
                    this.getComputedTotal("unitPrice", AllData, index); // 主石单价
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "unitPrice": // 主石单价
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "count": // 主石粒数
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "mainWeight": // 主石重
                    this.getComputedTotal("totalWeight", AllData, index); // 总件重
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "mainCalcMethod": // 主石的计价方式
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                /* -----副石----- */
                case "deputyUnit": // 副石单价
                    this.getComputedTotal("deputyPrice", AllData, index); // 副石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "deputyPrice": // 副石单价
                    this.getComputedTotal("deputyPrice", AllData, index); // 副石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "deputyUnitPrice": // 副石单价
                    this.getComputedTotal("deputyPrice", AllData, index); // 副石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "deputyCount": // 副石粒数
                    this.getComputedTotal("deputyPrice", AllData, index); // 副石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "deputyWeight": // 副石重
                    this.getComputedTotal("deputyPrice", AllData, index); // 副石额
                    this.getComputedTotal("totalWeight", AllData, index); // 总件重
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "deputyCalcMethod": // 副石的计价方式
                    this.getComputedTotal("deputyPrice", AllData, index); // 副石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                /* -----金料额----- */
                case "goldE": // 金料额
                    this.getComputedTotal("goldPrice", AllData, index); // 总件重
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "netWeight": // 净金重
                    this.getComputedTotal("totalWeight", AllData, index); // 总件重
                    this.getComputedTotal("goldE", AllData, index); // 金料额
                    this.getComputedTotal("heavyCode", AllData, index); // 含配金重
                    this.getComputedTotal("inMoney", AllData, index); // 进货工费额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "goldCost": // 金耗
                    this.getComputedTotal("goldE", AllData, index); // 金料额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "goldPrice": // 金价
                    this.getComputedTotal("goldE", AllData, index); // 金料额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                /* -----含配金重----- */
                case "partWeight": // 配件重
                    this.getComputedTotal("heavyCode", AllData, index); // 含配金重
                    this.getComputedTotal("totalWeight", AllData, index); // 总件重
                    this.getComputedTotal("price", AllData, index); // 配件额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                /* -----工费----- */
                case "inFee": // 进货工费
                    this.getComputedTotal("inMoney", AllData, index); // 进货工费额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "inMoney": // 进货工费额
                    this.getComputedTotal("inFee", AllData, index); // 进货工费
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "inMethod": // 进货工费方式
                    this.getComputedTotal("inMoney", AllData, index); // 进货工费额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                /* -----配件额----- */
                case "price": // 配件额
                    this.getComputedTotal("partPrice", AllData, index); // 配件单价
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "calcMethod": // 配件计价方式
                    this.getComputedTotal("price", AllData, index); // 配件额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "partPrice": // 配件单价
                    this.getComputedTotal("price", AllData, index); // 配件额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "partCount": // 配件数
                    this.getComputedTotal("price", AllData, index); // 配件额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                /* -----其它费用----- */
                case "otherFee": // 配件数
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                /* -----成本----- */
                case "certifiFee": // 证书费
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "costPrice": // 成本改变了
                    this.computedRatio(index);
                    break;
                case "soldPrice": // 售价改变
                    this.getComputedTotal("ratio", AllData, index); // 倍率
                    break;
                case "ratio": // 倍率
                    this.getComputedTotal("soldPrice", AllData, index); // 售价
                    break;
            }
        },
        getComputedTotal (littleClassKey, AllData, index) {  // 得到计算合计
            var Result = computedStorageData(littleClassKey, index, this.showData[index]);
            AllData[littleClassKey] = Result;
        },
        getComputedHeavyCodeNetWeight (littleClassKey, AllData, index) {
            var Result = computedStorageData(littleClassKey, index, this.showData[index]);
            AllData.netWeight = Result;
        },
        closeOptions () {
            this.introListOption = !this.introListOption
        },
        goPreviousPage (parm) { // 返回上一页
            this.wranTile = "您还有数据未保存，是否退出？"
            if (this.isAlter()) {
                this.popup.isQueryOption = true;
            } else {
                this.$router.push("/work/storage")
            }
        },
        isAlter () {
            let datas = this.addAdmendFun();
            let admendList = this.extractAmendData();
            if (datas.length > 0 || admendList.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        computedRatio (parm) { // 改变倍率
            let ratio = (Number(this.showData[parm].ratio) || 0);
            if (ratio !== 0) {
                var soldPrice = (Number(this.showData[parm].costPrice) || 0) * ratio; // 售价 = 成本 * 倍率
                Vue.set(this.showData[parm], "soldPrice", soldPrice.toFixed(2));
            }
        },
        computedSoldPrice (parm) { // 改变售价
            let costPrice = (Number(this.showData[parm].costPrice) || 0);
            if (costPrice !== 0) {
                var soldPrice = (Number(this.showData[parm].soldPrice) || 0) / costPrice; // 倍率 = 售价 / 成本
                Vue.set(this.showData[parm], "ratio", soldPrice.toFixed(2));
            }
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
        getSeekSellReceiptsIntro () { // 单据简介
            let options = {
                "orderNum": this.$route.query.orderNumber
            }
            seekReceiptRKSynopsis(options).then((response) => {
                if (response.data.state === 200) {
                    if (response.data.data.makeOrderManId == sessionStorage.getItem("id")) {
                        this.isMakeMan = true
                    } else {
                        this.isMakeMan = false
                    }
                    this.receiptsIntroList = response.data.data;
                    this.isCheckOrderMan = this.receiptsIntroList.isCheckOrderMan
                    this.isRole = this.receiptsIntroList.isRole
                    let year = response.data.data.createDate.substring(0, 4)
                    let month = response.data.data.createDate.substring(4, 6)
                    let data = response.data.data.createDate.substring(6, 8)
                    let hour = response.data.data.createDate.substring(8, 10)
                    let time = response.data.data.createDate.substring(10, 12)
                    this.receiptData = year + "-" + month + "-" + data + " " + hour + ":" + time
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        getconfigData (parm) { // 得到配置代码
            var configData = [];
            if (parm) {
                for (let i = 0; i < parm.length; i++) {
                    let newAddDatas = {};
                    for (let key in this.rowConfigData) {
                        newAddDatas[key] = parm[i][key] || null;
                    }
                    configData.push(newAddDatas)
                }
            }
            return configData;
        },
        getNewGoodsInfoList (page, pageSize) {
            let options = {
                "page": page,
                "pageSize": pageSize,
                "orderNum": this.$route.query.orderNumber
            }
            seekNewGoodsInfoList(options).then((response) => {
                this.allDataNum.status = response.data.data.status;
                this.allDataNum.totalNum = response.data.data.totalNum;
                this.getGoodsInfoList = this.getconfigData(response.data.data.rowDataList);

                if (response.data.state === 200) {
                    console.log(response)
                    // this.loading = false
                    this.tableRowData = response.data.data.rowDataList
                    Object.assign(this.tableInitRowData, response.data.data.rowDataList);
                }

            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        getNewGoodsInfoList1 (page, pageSize) {
            let options = {
                "page": page,
                "pageSize": pageSize,
                "orderNum": this.$route.query.orderNumber
            }
            seekNewGoodsInfoList(options).then((response) => {
                    this.tableInitRowData = response.data.data.rowDataList
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        getConfigInto () { // 初始化一些配置数据
            if (this.littleClassList) { // 初始化小类
                this.littleClass = this.littleClassList;
            }
            if (this.configPullDownDataList) { // 配置下拉数据
                this.configPullDownData = this.configPullDownDataList;
            }
        },
        // 删除的选择监听
        cutSelect (parm) { // 切换全选
            var _self = this;
            setTimeout(function() {
                _self.cutSelectFun();
            }, 13);
        },
        cutSelectFun () {
            let showNewAddData = this.showNewAddData.length; // 空白数据
            let getGoodsInfoList = this.getGoodsInfoList.length; // 后台数据
            let currentPage = Number(this.crudData.currentPage); // 当前页
            let starteNum = ((currentPage - 1) * 30) + getGoodsInfoList; // 当前空白数据的开始
            if (this.crudData.checked === true) { // 全选
                this.crudData.checkList = [];
                for (let i = starteNum; i < showNewAddData + starteNum; i++) {
                    this.crudData.checkList.push(i);
                }
                for (let i of this.getGoodsInfoList) {
                    this.crudData.checkList.push(i.barcode);
                }
            } else {
                this.crudData.checkList = [];
            }
         },
         pageJudgeFun () { // 判断是否全选
            if (this.showData.length === this.crudData.checkList.length) {
                this.crudData.checked = true;
                return true;
            } else {
                this.crudData.checked = false;
                return false;
            }
         },
        // ///////////   查询数据   /////////////
        // ///////////////(获取下拉数据)////////////////////
        getDownUrl () { // 获取模板地址
            let options = {
              "type": "2", // 1 URL 2 文件 3 视频
              "infoType": "1" // 1 入库模板下载地址
            }
            downloadTable(options).then((response) => {
                if (response.data.state === 200) {
                    this.downUrl = response.data.data.url;
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        productClassList () { // 获取商品大小类的下拉列表
            var _self = this;
            var requestNumber = 1;
            function cbFunction () {
                let options = {
                    type: requestNumber
                }
                seekProductClassList(options).then((response) => {
                    if (response.data.state === 200) {
                        //console.log(response)
                        var pullDowndata = [];
                        for (let i = 0; i < response.data.data.list.length; i++) {
                            for (let j = 0; j < response.data.data.list[i].childrenList.length; j++) {
                                pullDowndata.push(response.data.data.list[i].childrenList[j])
                            }
                        }
                        switch (requestNumber) {
                            case 1: // 成色名称
                                _self.configPullDownData.metalColor = pullDowndata;
                                break;
                            case 2: // 宝石名称
                                _self.configPullDownData.gemName = pullDowndata; // 宝石名称
                                _self.configPullDownData.mainName = pullDowndata; // 主石
                                _self.configPullDownData.deputyName = pullDowndata; // 副石
                                break;
                            case 3: // 首饰类别
                                _self.configPullDownData.jewelryName = pullDowndata;
                                break;
                            case 4: // 商品属性
                                for (let i = 0; i < response.data.data.list.length; i++) {
                                    switch (response.data.data.list[i].classesName) { // 少一个规格没弄
                                        case "规格": // 主副石
                                            _self.configPullDownData.stand = response.data.data.list[i].childrenList;
                                            _self.configPullDownData.deputyStand = response.data.data.list[i].childrenList;
                                           //console.log(_self.configPullDownData)
                                            break;
                                        case "宝石规格": // 主副石
                                            _self.configPullDownData.stand = response.data.data.list[i].childrenList;
                                            _self.configPullDownData.deputyStand = response.data.data.list[i].childrenList;
                                           //console.log(_self.configPullDownData)
                                            break;
                                        case "形状":
                                            _self.configPullDownData.shape = response.data.data.list[i].childrenList;
                                            break;
                                        case "颜色":
                                            _self.configPullDownData.color = response.data.data.list[i].childrenList;
                                            break;
                                        case "净度":
                                            _self.configPullDownData.neatNess = response.data.data.list[i].childrenList;
                                            break;
                                        case "切工":
                                            _self.configPullDownData.blackout = response.data.data.list[i].childrenList;
                                            break;
                                        case "抛光":
                                            _self.configPullDownData.polishing = response.data.data.list[i].childrenList;
                                            break;
                                        case "对称":
                                            _self.configPullDownData.symmetry = response.data.data.list[i].childrenList;
                                            break;
                                        case "荧光":
                                            _self.configPullDownData.fluorescent = response.data.data.list[i].childrenList;
                                            break;
                                    }
                              }
                               console.log(_self.configPullDownData)
                              break;
                        }
                        requestNumber += 1;
                        if (requestNumber < 5) {
                            cbFunction();
                        }
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
            cbFunction();
        },
        productPropertyList () { // 获取商品属性下拉列表
            var _self = this;
            var requestNumber = 1;
            function cbFunction () {
                let options = {
                    type: requestNumber
                }
                seekProductPropertyList(options).then((response) => {
                    var pullDowndata = [];
                    for (let i = 0; i < response.data.data.list.length; i++) {
                        pullDowndata.push(response.data.data.list[i])
                    }
                    
                    switch (requestNumber) {
                        case 1: // 金含量
                            _self.configPullDownData.partGold = pullDowndata;
                            break;
                        case 2: // 品牌
                            _self.configPullDownData.brand = pullDowndata;
                            break;
                        case 3: // 金属颜色
                            _self.configPullDownData.goldColor = pullDowndata;
                            break;
                        case 4: // 配件名称
                            _self.configPullDownData.partName = pullDowndata;
                            break;
                    }
                    requestNumber += 1;
                    if (requestNumber < 5) {
                        cbFunction();
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
            cbFunction();
        },
        productCertificateList () { // 证书下拉列表
            seekCertificateList().then((response) => {
                if (response.data.state === 200) {
                    this.configPullDownData.certifiName = response.data.data.list
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            })
        },
        // ///////////   下拉数据   /////////////
        noPullDown (parm) { // 没有下拉数据
            if (parm) {
                if (this.configPullDownData[parm]) {
                    return true;
                }
            }
            return false;
        },
        getSpecialComputed (parm) { // 过滤联动的计算值
            var filterName = new Set(['ratio', 'soldPrice']); // 倍率，售价
            let getName = [parm].filter(x => filterName.has(x))
            return getName[0];
        },
        // ///////////   处理数据 （保存后的数据）  /////////////
        cutIncident (parm) { // 伸缩总开关按钮
            if (parm.name !== '首饰名称') {
                if (parm.colspan === 1) { // 从闭合恢复展开
                    parm.colspan = parm.colspanOpen;
                    parm.propertyDatas = parm.open;
                    parm.stateOpen = parm.englishName;
                } else { // 从展开恢复闭合
                    parm.colspan = 1;
                    parm.propertyDatas = [{"name": ""}];
                    parm.stateOpen = "";
                }
            }
        },
        getStateOpen (parm, parm2) { // 大类过滤的开关
            if (parm2 !== "") {
                return parm.propertyDatas;
            } else {
                return false;
            }
        },
        getReadOnly (littleClassKey) { // 过滤只读值
            return readOnly(littleClassKey);
        },
        // ///////////   核心过滤器   /////////////
        getStatus (parm) { // 审核状态
            return productDetailStatus(parm);
        },
        getLittleClassKey (parm) { // 开关过滤器
            var getOpenName = ['barcode', 'status', 'remark'];
            for (let i = 0; i < this.littleClass.length; i++) {
                if (this.littleClass[i].stateOpen) { // 通过小类的stateOpen来控制
                    for (let j = 0; j < this.littleClass[i].open.length; j++) {
                        if (this.littleClass[i].open[j].englishName !== "") {
                            getOpenName.push(this.littleClass[i].open[j].englishName)
                        }
                    }
                }
            }
            var filterNames = new Set(getOpenName);
            var state = parm.filter(x => filterNames.has(x));
            if (state !== 'productId') {
                return state;
            } else {
                return;
            }
        },
        getCertifiName (littleClassKey) { // 判断是否是证书名
            if (littleClassKey == "certifiName") {
                return true;
            } else {
                return false;
            }
        },
        getCertificate (parm) { // 选择证书
            for (let i = 0; i < this.configPullDownData.certifiName.length; i++) {
                if (this.configPullDownData.certifiName[i].certificateName === parm) {
                    return [this.configPullDownData.certifiName[i]];
                }
            }
            return false;
        },
        getLittleClass (littleDatas, currentData) { // 自定义过滤器 小类别
            if (littleDatas && currentData) {
              let arr = littleDatas.filter(function (littleData) {
                  return littleData.englishName === currentData; // || littleData.name === currentData
              })
              let data = arr[0].open.filter(x => !readOnly(x.englishName));
              return data;
            }
        },
        getAmendData (amendData) { // 自定义过滤器  得到修改的内容 小类别
            for (let i in this.configPullDownData) {
                if (i === amendData) {
                    return this.configPullDownData[i];
                }
            }
            return false;
        },
        // ///////////   核心功能   /////////////
        uploadingOne (e) { // 表格导入数据 one
            this.popup.fullscreenLoading = true;
            var files = e.currentTarget.files[0];
            var fileData = new FormData(); // 创建表单数据对象(本地上传服务器文件对象)
            fileData.append("excelFile", files); // 将文件对象append进去
            let data = {
                "data": {
                    "orderNum": this.$route.query.orderNumber
                },
                "unit": {
                    "companyId": sessionStorage.getItem("companyId"),
                    "channel": 3,
                    "OS": "web",
                    "ip": "string",
                    "userId": sessionStorage.getItem("id"),
                    "tokenId": sessionStorage.getItem("tokenId")
                }
            }
            fileData.append("data", JSON.stringify(data)); // 用户id
            // 第一页获得的数据
            var url = INTERFACE_URL_9097 + "/b1/rukuUpload" // INTERFACE_URL_9097 +
            this.$http.post(url, fileData).then((response) => {
                this.popup.fullscreenLoading = false;
                this.$refs.tableList.value = null;
                if (response.data.data.status === "success") {
                    this.$message({
                        message: '导入数据成功',
                        type: 'success'
                    });
                    this.getNewGoodsInfoList('1', this.pageSize);
                    this.getConfigInto(); // 初始化一些配置数据
                    this.getSeekSellReceiptsIntro(); // 单据简介
                    this.receiptStatusList(); // 单据状态
                    this.getNewGoodsInfoList1('1', this.pageSize);
                    this.reportsPrintRK()
                } else {
                    this.$store.dispatch('workPopupError', '导入数据失败')
                }
            }, (response) => {
                console.log(response)
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        pitchOn (parm, index, e) { // 选中样式和数据
            if (parm) {
                if (this.allDataNum.status === "1") { // 待审核的情况下才可以操作
                    this.operate.selectedRow = [];
                    Vue.set(this.operate.selectedRow, index, true);
                    this.crudData.selectedData = parm;
                    if (parm.productId) { // 如果有条形码
                        var initialValue = JSON.stringify(parm);
                        if (this.aloneAmendingData.initialValue.length < 1) { // 为空时
                            this.aloneAmendingData.changeValue.push(parm);
                            this.aloneAmendingData.initialValue.push(JSON.parse(initialValue));
                        } else {
                            var isNew = true;
                            for (var i = 0; i < this.aloneAmendingData.changeValue.length; i++) {
                                if (this.aloneAmendingData.changeValue[i] === parm) {
                                    isNew = false;
                                }
                            }
                            if (isNew) {
                                this.aloneAmendingData.changeValue.push(parm);
                                this.aloneAmendingData.initialValue.push(JSON.parse(initialValue));
                            }
                        }
                    }
                }
            }
        },
        nextPitchOn (index) {
            var nextIndex = index + 1;
            this.pitchOn(this.showData[nextIndex], nextIndex);
        },
        getBarcodeOrcurrentPage (parm) {
        },
        appendRow () { // 新增
            var rowData = JSON.stringify(this.rowConfigData);
            var newRowData1 = JSON.parse(rowData);
            this.crudData.newAddData.push(newRowData1);
            this.tableRowData.push(newRowData1)
            this.isREfresh = false
        },
        copyRowData () { // 复制数据
            this.popup.copys = false;
            if (this.selectData1.length <= 0) { // 如果没有选中数据
                this.$store.dispatch('workPopupError', '请选择要复制的数据')
                return;
            }
            
            for (let i = 0; i < this.popup.copyNumber; i++) {
                let copyRows = JSON.parse(JSON.stringify(this.selectData1))
                copyRows.barcode = ''
                this.tableRowData.push(copyRows)
                this.newAddtableData.push(copyRows)
                // console.log(111)
                // console.log(copyRows)
            }
            // console.log(this.newAddtableData.length)
            this.tableIndex = null
            this.popup.copyNumber = 0
        },
        batchAmending () { // 批量修改
            var bb = false;
            if (this.popup.amendingLargeClass == null || this.popup.amendingLargeClass == "") {
                this.popup.isShowBigClass = true;
            } else {
                this.popup.isShowBigClass = false;
            }
            if (this.popup.amendingLittleClass == null || this.popup.amendingLittleClass == "") {
                this.popup.isShowLittleClass = true;
            } else {
                this.popup.isShowLittleClass = false;
            }

            if (this.popup.amendingData == null || this.popup.amendingData == "") {
                this.popup.isShowData = true;
            } else {
                this.popup.isShowData = false;
            }

            if (this.popup.isShowData == false && this.popup.isShowLittleClass == false && this.popup.isShowBigClass == false) {
                bb = true;
            }
            if (bb == true) {
                var amendingLittleClass = this.popup.amendingLittleClass;
            if (this.popup.amendingPitchOn === "2") {
                for (let i = 0; i < this.tableRowData.length; i++) { // 全选
                this.tableRowData[i][amendingLittleClass] = this.popup.amendingData
                this.amandTableData.push({
                    productId: this.tableRowData[i].productId,
                    [this.popup.amendingLittleClass]: this.tableRowData[i][amendingLittleClass]
                })
                }
            } else {
                if (this.popup.amendingStartRow > this.popup.amendingEndRow) {
                    this.blurTitle = "起始行数不能大于结束行数";
                    return;
                }
                for (var i = this.popup.amendingStartRow - 1; i < this.popup.amendingEndRow; i++) {
                    if (amendingLittleClass === "goldCost") {
                        if (Number(this.popup.amendingData) < 1) {
                            this.tableRowData[i][amendingLittleClass] = (this.popup.amendingData * 100).toFixed(2);
                        } else {
                            this.tableRowData[i][amendingLittleClass] = this.popup.amendingData;
                        }
                    } else {
                        this.showData[i][amendingLittleClass] = this.popup.amendingData;
                        this.tableRowData[i][amendingLittleClass] = this.popup.amendingData;
                        this.amandTableData.push({
                            productId: this.tableRowData[i].productId,
                            [this.popup.amendingLittleClass]: this.tableRowData[i][amendingLittleClass]
                        })
                    }
                    this.valueChangeDetection(amendingLittleClass, this.showData[i], i);
                }
            }
            this.popup.amendings = false;
            }
        },
        //选择范围错误提示
        selectRange (sel) {
            if (sel == 'sel1') {
              if (this.popup.amendingStartRow < 0 || this.popup.amendingStartRow > 30) {
                this.blurTitle = "调整的范围为0-30行"
              }
            } else {
              if (this.popup.amendingEndRow < 1 || this.popup.amendingEndRow > 30) {
                this.blurTitle = "调整的范围为1-30行"
              }
            }
        },
        batchDelect () { // 删除
            let delectList = [];
            for (let i of this.crudData.checkList) {
                if (i.toString().length < 8) {
                    delectList.push(i)
                }
            }
            var delectdata = delectList.sort(function (a, b) {
                    return b - a
                }
            );
            for (let i of delectdata) {
                this.crudData.newAddData.splice(i - this.getGoodsInfoList.length, 1);
            }
            var productIdList = [];
            for (let i of this.crudData.checkList) {
                if (i.toString().length === 8) {
                    var objData = {
                        "barcode": i
                    }
                    productIdList.push(objData)
                }
            }
            let options = {
                "orderNum": this.$route.query.orderNumber,
                "productList": productIdList,
                "operate": "2"
            }
            if (productIdList.length > 0) {
                operateProductList(options).then((response) => {
                    if (response.data.state === 200) {
                        this.getNewGoodsInfoList(this.crudData.currentPage, '30');
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
            this.crudData.checkList = [];
            this.crudData.operationCut = true;
        },
        addSingleAll () { // 保存（单个添加/批量添加）
            //console.log(this.newAddtableData)
            //console.log(this.amandTableData)
            if (this.tableInitRowData.length !== this.tableRowData.length) {
                let cha = this.tableRowData.length - this.tableInitRowData.length
                for (let j = this.tableRowData.length - 1; j > this.tableInitRowData.length - 1; j--) {
                    this.newAddtableData.push(this.tableRowData[j])
                }
            } 
            if (this.newAddtableData.length > 0) {
                this.brandNewAdd()
                //console.log(232323)
                console.log(this.newAddtableData.length)
            }
            if (this.amandTableData.length > 0 && this.tableInitRowData.length == this.tableRowData.length){
                this.admendFun()
                //console.log(343434)
            }
        },
        extractAmendData () {
            let initialValue = this.aloneAmendingData.initialValue;
            let changeValue = this.aloneAmendingData.changeValue;
            let admendList = [];
            var isAdmendObj = false;
            for (let i = 0; i < initialValue.length; i++) {
                if (initialValue[i].productId) {
                    var admendObj = {};
                    for (let initialKey in initialValue[i]) {
                        if (initialValue[i][initialKey] !== changeValue[i][initialKey]) {
                            admendObj[initialKey] = changeValue[i][initialKey];
                            if (changeValue[i].productId && !admendObj.productId) { // 添加个商品id
                                admendObj.productId = changeValue[i].productId;
                            }
                        }
                    }
                    for (let i in admendObj) {
                        if (i) {
                            isAdmendObj = true;
                        }
                    }
                    admendList.push(admendObj);
                }
            }
            if (isAdmendObj) {
                return admendList;
            } else {
                return false;
            }
        },
        admendFun () { // 修改商品列表
            let options = {
                "orderNum": this.$route.query.orderNumber, // 单据号
                "confirmType": "0",
                "alterList": this.amandTableData
            }
            operateUpdateGoods(options).then((response) => { // 单据列表（公共数据）
                //console.log(response)
                this.amandTableData = []
                if (response.data.state === 200) {
                    this.getConfigInto(); // 初始化一些配置数据
                    this.getSeekSellReceiptsIntro(); // 单据简介
                    this.receiptStatusList(); // 单据状态
                    this.getNewGoodsInfoList('1', this.pageSize);
                    this.getNewGoodsInfoList1('1', this.pageSize);
                    this.reportsPrintRK()
                    
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        addAdmendFun () { // 看空白数据有没有改变
            let datas = [];
            for (let i = 0; i < this.crudData.newAddData.length; i++) {
                for (let j in this.crudData.newAddData[i]) {
                    if (this.crudData.newAddData[i][j] !== this.rowConfigData[j]) {
                        datas.push(this.crudData.newAddData[i])
                    }
                }
            }
            return [...new Set(datas)];
        },
        brandNewAdd () { // 全新添加
            let options = {
                "orderNum": this.$route.query.orderNumber,
                "rowDataList": this.newAddtableData // 新增数据集合
            }
            operateAddProductToRKOrder(options).then((response) => {
                this.amandTableData = []
                this.newAddtableData = []
                if (response.data.state === 200) {
                    //console.log(response)
                    this.getConfigInto(); // 初始化一些配置数据
                    this.getSeekSellReceiptsIntro(); // 单据简介
                    this.receiptStatusList(); // 单据状态
                    this.getNewGoodsInfoList('1', this.pageSize);
                    this.getNewGoodsInfoList1('1', this.pageSize);
                    this.reportsPrintRK()
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            })
        },
        closeStorage () { // 关闭
            this.$router.push("/work/storage")
        },
        printLabel () {
            this.print.currentOrderNum = this.$route.query.orderNumber
            this.$refs.printLabelByOrderDialog.show()
        },
        requestProductList (filter) {
            this.$store.dispatch('getPrintLabelByOrder', filter).then(json => {
                if (json.state == 200) {
                    this.print.productList = json.data.productList
                    this.print.totalNum = json.data.totalNum
                }
            })
        },
        previewTemplate (canvas, selectedProducts, isPrint) {
            debugger
            this.print.canvas = canvas
            if (selectedProducts.length) {
                this.$store.dispatch('getPrintLabelData', {
                    productList: selectedProducts.map(selectedProduct => {
                        return {
                            productId: selectedProduct
                        }
                    })
                }).then(json => {
                    if (json.state == 200) {
                        //console.log(json.data);
                        this.print.templateData = json.data;
                        this.print.isPreview = true;
                        this.printTemplate()
                    }
                })
            } else {
                this.$store.dispatch('getPrintLabelData', {
                    isTmp: 1,
                    productType: 1
                }).then(json => {
                    if (json.state == 200) {
                        this.print.templateData.productList = json.data.productList.slice(0, 1)
                        this.print.isPreview = true
                        this.printTemplate()
                    }
                })
            }
        },
        //预览模板
        printTemplate () {
            debugger
            Vue.nextTick(() => {
                this.$refs.lodop.multipagePrint()
            })
        },
        reportsPrintRK () { // 获取单据打印数据
            let options = {
                orderNum: this.$route.query.orderNumber,
                reportType: 3
            }
            seekGetStorageData(options).then((res) => {
                if (res.data.state == 200) {
                    this.dataGridStorage = res.data.data
                }
            }, (res) => {
                console.log(res)
            })
        },
    }
}
</script>
<style src="assets/css/_tableStorage.scss" lang="scss" scoped></style>
<style lang="scss">
@media screen {
    .template-print-canvas {
        opacity: 0;
    }
}

@media print {
    @import "~assets/css/template/templatePrint";
    body {
        background-color: #fff;
    }
    .new-storage {
        display: none;
    }
}
.selectBox {
    position:relative;
    .titleBox {
        position: absolute; right:-35px; top:0; color:#ff0000;
    }
}
.selectTitleBox {
    position:relative;
    .blurTitleBox {
        position:absolute; top:275px; color:#ff0000; left:53px;
    }
}
.left-table {
    tr {
        td {
            .el-checkbox {
                .el-checkbox__input {
                    .el-checkbox__inner {
                        border-radius: 4px;
                    }
                }
                .is-checked {
                    .el-checkbox__inner {
                        background-color: #2993f8;
                        border-color: #2993f8;
                    }
                }
            }
        }
    }
}
.body-row5 {
    .btn-wrap {
        .checked-btn {
            .el-checkbox {
                .el-checkbox__input {
                    .el-checkbox__inner {
                        border-radius: 4px;
                    }
                }
                .el-checkbox__label {
                    font-size: 14px;
                    color:#666 !important;
                    span {
                        color:#2993f8;
                    }
                }
                .is-checked {
                    .el-checkbox__inner {
                        background-color: #2993f8;
                        border-color: #2993f8;
                    }
                }
            }
        }
    }
}
</style>

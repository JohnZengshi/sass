<template>
        <div class="new-storage" @click="closeOptions" ref="new_storage">
            <section class="body-box" ref="body_box">
                <div class="fixed-mask skin-shield" ref="fixed_mask">
                </div>
                <div class="body-header skin-shield" ref="body_header">
                    <ul class="header-nav">
                        <li @click="goPreviousPage"><i style="font-size: 20px; margin-right: 10px;" class="iconfont icon-xiugai"></i>修改<span>&nbsp;></span></li>
                        <li class="on">单据详情</li>
                    </ul>
                    <div class="back-btn" @click="goPreviousPage">返回上一级</div>
                </div>
                <div class="body-row2">
                    <div class="list-mask" ref="mask"></div>
                    <ul>
                        <li :class="{active: stepInfo.step1.stepFlag, act:  stepIndex == 1}">
                            <div class="main-name">待审核</div>
                            <div class="list-span" v-if="stepInfo.step1.stepFlag || stepIndex == 1">
                                <div>{{stepInfo.step1.stepMessage.userName}}</div>
                                <span>{{timeFormat(stepInfo.step1.stepMessage.createTime)}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepInfo.step2.stepFlag, act:  stepIndex == 2}">
                            <div class="main-name">审核中</div>
                            <div class="list-span" v-if="false">
                                <div>{{stepInfo.step2.stepMessage.userName}}</div>
                                <span>{{timeFormat(stepInfo.step2.stepMessage.createTime)}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepInfo.step3.stepFlag, act:  stepIndex == 3}">
                            <div class="main-name">已审核</div>
                            <div class="list-span" v-if="stepInfo.step3.stepFlag || stepIndex == 3">
                                <div>{{stepInfo.step3.stepMessage.userName}}</div>
                                <span>{{timeFormat(stepInfo.step3.stepMessage.createTime)}}</span>
                            </div>
                        </li>
                        <li :class="{active: stepInfo.step4.stepFlag, act:  stepIndex == 4}">
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
                            <amend-receipts-intro
                            :receiptsIntroList="receiptsIntroList"
                            :introListOption="introListOption"
                            :toRouter='"/work/amend"'
                            >
                            </amend-receipts-intro>
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
                                        <li v-if="nowStatus != 6" @click="popup.amendings = true">批量修改</li>
                                        <!--<li @click="printContent">打印单据</li>-->
                                        <!--<li @click="printLabel">打印标签</li>-->
                                        <li v-if='addRole && nowStatus != 6' class="confirm-btn" @click.stop="appendBatchRow">
                                            批量添加
                                        </li>
                                        <li v-if="addRole && nowStatus != 6">
                                            <div v-if="isSelDelect" @click="isSelDelect = false">批量删除</div>
                                        </li>
                                        <li v-if="nowStatus != 6" @click="addSingleAll" v-loading.fullscreen.lock="popup.fullscreenLoading" element-loading-text="拼命进行中...">保存</li>
                                        <!--<li @click="closeStorage">关闭</li>-->
                                    </ul>  
                                </div>
                                <div class="add-btn" v-if="nowStatus != 6" @click="appendRow">添加商品</div>
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
                            <table class="left-table amend-table" cellpadding="0" cellspacing="0" style=" background:#fff;" ref="left_table_main">
                                <tbody v-for="(item, index) in tableRowData" @click="selectTable(index)">
                                    <tr>
                                        <td style="width: 45px;" rowspan="2">
                                            <span v-if="isSelDelect">{{index + 1}}</span>
                                            <span v-else><input style="width: 30px;" type="checkbox" :checked="deleteList.includes(item.now.barcode)" @change="selectDelItem(item)"></span>
                                        </td>
                                        <td style="width: 67px;" rowspan="2">
                                            <span v-if="isOperate || tableIndex != index">{{item.now.barcode}}</span>
                                            <input v-else type="text" v-focus="tableIndex == index" v-model="item.now.barcode" @keyup.enter="queryBarCode(item.now.barcode, 1, index)">
                                        </td>
                                        <td style="width: 90px;">{{item.now.metalColor}}</td>
                                        <td style="width: 67px;">{{item.now.partGold}}</td>
                                        <td style="width: 90px;">{{item.now.gemName}}</td>
                                        <td style="width: 91px;">{{item.now.jewelryName}}</td>
                                    </tr>
                                    <tr ref="left_table_line" :class="{active:tableIndex == index}">
                                        <td style="width: 90px;">
                                            <span v-if="isOperate || tableIndex != index">{{item.old.metalColor}}</span>
                                            <el-select v-model="tableRowData[index].old.metalColor" @change="selectData('base', 1, item, 'metalColor')" clearable placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.metalColor"
                                                :key="item.classesId"
                                                :label="item.classesName"
                                                :value="item.classesName">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td style="width: 67px;">
                                            <span  v-if="isOperate || tableIndex != index">{{item.old.partGold}}</span>
                                            <el-select v-model="tableRowData[index].old.partGold" @change="selectData('base', 2, item, 'partGold')" clearable placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.partGold"
                                                :key="item.classesId"
                                                :label="item.classesName"
                                                :value="item.classesName">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td style="width: 90px;">
                                            <span v-if="isOperate || tableIndex != index">{{item.old.gemName}}</span>
                                            <el-select v-model="tableRowData[index].old.gemName" @change="selectData('base', 3, item, 'gemName')" clearable placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.gemName"
                                                :key="item.classesId"
                                                :label="item.classesName"
                                                :value="item.classesName">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td style="width: 91px;">
                                            <span v-if="isOperate || tableIndex != index">{{item.old.jewelryName}}</span>
                                            <el-select v-model="tableRowData[index].old.jewelryName" @change="selectData('base', 4, item, 'jewelryName')" clearable placeholder="请选择" v-else>
                                                <el-option
                                                v-for="item in configPullDownData.jewelryName"
                                                :key="item.classesId"
                                                :label="item.classesName"
                                                :value="item.classesName">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                </tbody>  
                            </table>
                            <div class="left-shdow" ref="shadow"></div>
                            <div class="right-table-wrap" ref="right_table_wrap" @scroll="watchTableScroll()">
                                <div class="right_table_tittle_scroll_wrap" ref="right_scroll_wrap">
                                    <table class="right-table right_table_scroll" cellpadding="0" cellspacing="0" ref="right_tittle">
                                        <tr>
                                            <th :colspan="tableMainColSpan.baseNum" @click="showTableCol(1)">基本信息<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.weightNum" @click="showTableCol(2)">重量<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.pageNum" @click="showTableCol(3)">证书<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.mainStonNum" @click="showTableCol(4)">主石<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.otherStonNum" @click="showTableCol(5)">副石<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.workNum" @click="showTableCol(6)">工费<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.partsNum" @click="showTableCol(7)">配件<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.otherNum" @click="showTableCol(8)">其他费用<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th :colspan="tableMainColSpan.priceNum" @click="showTableCol(9)">标价<i class="el-icon-caret-right" :class="{active: tableMainFlag.priceFlag}"></i></th>
                                            <th rowspan="2">操作</th>
                                        </tr>
                                        <tr>
                                            <th>品牌</th>
                                            <th v-if="tableMainFlag.baseFlag">款号</th>
                                            <th v-if="tableMainFlag.baseFlag">手寸</th>
                                            <th v-if="tableMainFlag.baseFlag">手寸号</th>
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
                                <table class="right-table amend-table" cellpadding="0" cellspacing="0" ref="right_table_data">
                                    <tbody v-for="(item, index) in tableRowData" @click="selectTable(index)">
                                        <tr>
                                            <!-- *************** 基本信息 **************- -->
                                            <td>{{item.now.brand}}</td>
                                            <td v-if="tableMainFlag.baseFlag">{{item.now.modelNo}}</td>
                                            <td v-if="tableMainFlag.baseFlag">{{item.now.handInch}}</td>
                                            <td v-if="tableMainFlag.baseFlag">{{item.now.handInchUnit}}</td>
                                            <td v-if="tableMainFlag.baseFlag">{{item.now.remark}}</td>
                                            <!-- *************** 重量 **************- -->
                                            <td>{{item.now.totalWeight}}</td>
                                            <td v-if="tableMainFlag.weightFlag">{{item.now.netWeight}}</td>
                                            <td v-if="tableMainFlag.weightFlag">{{item.now.heavyCode}}</td>
                                            <td v-if="tableMainFlag.weightFlag">{{item.now.goldCost}}</td>
                                            <td v-if="tableMainFlag.weightFlag">{{item.now.goldPrice}}</td>
                                            <td v-if="tableMainFlag.weightFlag">{{item.now.goldColor}}</td>
                                            <td v-if="tableMainFlag.weightFlag">{{item.now.goldE}}</td>
                                            <!-- *************** 证书 **************- -->
                                            <td>{{item.now.certifiNo}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.authCode}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.certifiName}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.organizationName}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.website}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.phone}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.stand1}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.stand2}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.stand3}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.now.certifiFee}}</td>
                                            <!-- *************** 主石 **************- -->
                                            <td>{{item.now.mainName}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.stand}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.count}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.mainWeight}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.unit}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.unitPrice}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.mainCalcMethod}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.shape}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.color}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.neatNess}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.blackout}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.polishing}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.symmetry}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.fluorescent}}</td>
                                            <td v-if="tableMainFlag.mainStonFlag">{{item.now.mainPrice}}</td>
                                            <!-- *************** 副石 **************- -->
                                            <td>{{item.now.deputyName}}</td>
                                            <td v-if="tableMainFlag.otherStonFlag">{{item.now.deputyStand}}</td>
                                            <td v-if="tableMainFlag.otherStonFlag">{{item.now.deputyCount}}</td>
                                            <td v-if="tableMainFlag.otherStonFlag">{{item.now.deputyWeight}}</td>
                                            <td v-if="tableMainFlag.otherStonFlag">{{item.now.deputyUnit}}</td>
                                            <td v-if="tableMainFlag.otherStonFlag">{{item.now.deputyUnitPrice}}</td>
                                            <td v-if="tableMainFlag.otherStonFlag">{{item.now.deputyCalcMethod}}</td>
                                            <td v-if="tableMainFlag.otherStonFlag">{{item.now.deputyPrice}}</td>
                                            <!-- *************** 工费 **************- -->
                                            <td>{{item.now.soldFee}}</td>
                                            <td v-if="tableMainFlag.workFlag">{{item.now.soldMethod}}</td>
                                            <td v-if="tableMainFlag.workFlag">{{item.now.inFee}}</td>
                                            <td v-if="tableMainFlag.workFlag">{{item.now.inMethod}}</td>
                                            <td v-if="tableMainFlag.workFlag">{{item.now.inMoney}}</td>
                                            <!-- *************** 配件 **************- -->
                                            <td>{{item.now.partName}}</td>
                                            <td v-if="tableMainFlag.partsFlag">{{item.now.partCount}}</td>
                                            <td v-if="tableMainFlag.partsFlag">{{item.now.partWeight}}</td>
                                            <td v-if="tableMainFlag.partsFlag">{{item.now.partPrice}}</td>
                                            <td v-if="tableMainFlag.partsFlag">{{item.now.calcMethod}}</td>
                                            <td v-if="tableMainFlag.partsFlag">{{item.now.price}}</td>
                                            <!-- *************** 其他费用 **************- -->
                                            <td>{{item.now.otherFeeName}}</td>
                                            <td v-if="tableMainFlag.otherFlag">{{item.now.otherFee}}</td>
                                            <!-- *************** 标价 **************- -->
                                            <td>{{item.now.costPrice}}</td>
                                            <td v-if="tableMainFlag.priceFlag">{{item.now.ratio}}</td>
                                            <td v-if="tableMainFlag.priceFlag">{{item.now.soldPrice}}</td>
                                            <!-- *************** 操作 **************- -->
                                            <td><span style="margin-right:10px; color:#2993f8; cursor:pointer" class="godetail-btn" @click="goDetail(item)">明细</span><span style="cursor: pointer" @click="deleteGoods(item.now.barcode)">删除</span></td>
                                        </tr>
                                        <tr ref="right_table_line" :class="{active:tableIndex == index}">
                                            <!--                        基本信息                    -->
                                            <td>
                                                <span v-if="isOperate || tableIndex != index">{{item.old.brand}}</span>
                                                <el-select clearable v-model="item.old.brand" @change="selectData('base1', 1, item, 'brand')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.brand"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.baseFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.modelNo}}</span>
                                                <input v-else v-model="item.old.modelNo" @blur="inputAmandData(item, index, 'base')">
                                            </td>
                                            <td v-if="tableMainFlag.baseFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.handInch}}</span>
                                                <input maxlength='6' v-else v-model="item.old.handInch" @blur="inputAmandData(item, index, 'base')">
                                            </td>
                                            <td v-if="tableMainFlag.baseFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.handInchUnit}}</span>
                                                <el-select clearable v-model="item.old.handInchUnit" @change="selectData('base1', 2, item, 'handInchUnit')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.handInchUnit"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.baseFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.remark}}</span>
                                                <input v-else v-model="item.old.remark" @blur="inputAmandData(item, index, 'base')">
                                            </td>
                                            <!--                         重量                       -->
                                            <td>
                                                <span v-if="isOperate || tableIndex != index">{{item.old.totalWeight}}</span>
                                                <input v-else v-model="item.old.totalWeight" @keyup="operateData(index, 'weight', 1)" @blur="inputAmandData(item, index, 'weight')">
                                            </td>
                                            <td v-if="tableMainFlag.weightFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.netWeight}}</span>
                                                <input v-else v-model="item.old.netWeight" @keyup="operateData(index, 'weight', 2)" @blur="inputAmandData(item, index, 'weight')">
                                            </td>
                                            <td v-if="tableMainFlag.weightFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.heavyCode}}</span>
                                                <input v-else v-model="item.old.heavyCode" @keyup="operateData(index, 'weight', 3)" @blur="inputAmandData(item, index, 'weight')">
                                            </td>
                                            <td v-if="tableMainFlag.weightFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.goldCost}}</span>
                                                <input v-else v-model="item.old.goldCost" @keyup="operateData(index, 'weight', 4)" @blur="inputAmandData(item, index, 'weight')">
                                            </td>
                                            <td v-if="tableMainFlag.weightFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.goldPrice}}</span>
                                                <input v-else v-model="item.old.goldPrice" @keyup="operateData(index, 'weight', 5)" @blur="inputAmandData(item, index, 'weight')">
                                            </td>
                                            <td v-if="tableMainFlag.weightFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.goldColor}}</span>
                                                <el-select clearable v-model="item.old.goldColor" @change="selectData('weight', 1, item, 'goldColor')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.goldColor"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.weightFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.goldE}}</span>
                                                <input v-else v-model="item.old.goldE" @keyup="operateData(index, 'weight', 6)" @blur="inputAmandData(item, index, 'weight')">
                                            </td>
                                            <!--                         证书                       -->
                                            <td>
                                                <span v-if="isOperate || tableIndex != index">{{item.old.certifiNo}}</span>
                                                <input maxlength='12' v-else v-model="item.old.certifiNo" @keyup="operateData(index, 'page', 1)" @blur="inputAmandData(item, index, 'page')">
                                            </td>
                                            <td v-if="tableMainFlag.pageFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.authCode}}</span>
                                                <input maxlength='12' v-else v-model="newRowData.authCode" @blur="inputAmandData(item, index, 'page')">
                                            </td>
                                            <td v-if="tableMainFlag.pageFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.certifiName}}</span>
                                                <el-select clearable v-model="item.old.certifiName" @change="selectData('page', 1, item, 'certifiName', index)" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.certifiName"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.old.organizationName}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.old.website}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.old.phone}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.old.stand1}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.old.stand2}}</td>
                                            <td v-if="tableMainFlag.pageFlag">{{item.old.stand3}}</td>
                                            <td v-if="tableMainFlag.pageFlag">
                                            <span v-if="isOperate || tableIndex != index">{{item.old.certifiFee}}</span>
                                                <input maxlength='12' v-else v-model="newRowData.certifiFee" @blur="inputAmandData(item, index, 'page')">
                                            </td>
                                            <!--                         主石                       -->
                                            <td>
                                                <span v-if="isOperate || tableIndex != index">{{item.old.mainName}}</span>
                                                <el-select clearable v-model="item.old.mainName" @change="selectData('stand', 11, item, 'mainName')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.mainName"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-show="tableMainFlag.mainStonFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.stant}}</span>
                                                <el-select clearable v-model="item.old.stant" @change="selectData('stand', 1, item, 'stand')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.stand"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石粒数 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.count}}</span>
                                                <input maxlength='12' v-else v-model="item.old.count" @keyup="operateData(index, 'main', 2)" @blur="inputAmandData(item, index, 'main')">
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石重 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.mainWeight}}</span>
                                                <input maxlength='12' v-else v-model="item.old.mainWeight" @keyup="operateData(index, 'main', 3)" @blur="inputAmandData(item, index, 'main')">
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石单位 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.unit}}</span>
                                                <el-select clearable v-model="item.old.unit" @change="selectData('stand', 2, item, 'unit')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.unit"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石单价 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.unitPrice}}</span>
                                                <input maxlength='12' v-else v-model="item.old.unitPrice" @keyup="operateData(index, 'main', 4)" @blur="inputAmandData(item, index, 'main')">
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 计价方式 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.mainCalcMethod}}</span>
                                                <el-select clearable v-model="item.old.mainCalcMethod" @change="selectData('stand', 3, item, 'mainCalcMethod')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.mainCalcMethod"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.shape}}</span> <!-- 形状 -->
                                                <el-select clearable v-model="item.old.shape" @change="selectData('stand', 4, item, 'shape')"  placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.shape"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag">
                                                <span v-if="isOperate || tableIndex != index">{{item.old.color}}</span> <!-- 颜色 -->
                                                <el-select clearable v-model="item.old.color" @change="selectData('stand', 5, item, 'color')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.color"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 净度 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.neatness}}</span>
                                                <el-select clearable v-model="item.old.neatness" @change="selectData('stand', 6, item, 'neatNess')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.neatNess"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 切工 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.blackout}}</span>
                                                <el-select clearable v-model="item.old.blackout" @change="selectData('stand', 7, item, 'blackout')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.blackout"
                                                    :label="selItem.classesName"
                                                    :value="selItem.classesName"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 抛光 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.polishing}}</span>
                                                <el-select clearable v-model="item.old.polishing" @change="selectData('stand', 8, item, 'polishing')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.polishing"
                                                    :label="selItem.classesName"
                                                    :value="selItem.classesName"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 对称 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.symmetry}}</span>
                                                <el-select clearable v-model="item.old.symmetry" @change="selectData('stand', 9, item, 'symmetry')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.symmetry"
                                                    :label="selItem.classesName"
                                                    :value="selItem.classesName"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 荧光 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.fluorescent}}</span>
                                                <el-select clearable v-model="item.old.fluorescent" @change="selectData('stand', 10, item, 'fluorescent')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.fluorescent"
                                                    :label="selItem.classesName"
                                                    :value="selItem.classesName"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.mainStonFlag"> <!-- 主石额 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.mainPrice}}</span>
                                                <input v-else v-model="item.old.mainPrice" @keyup="operateData(index, 'main', 5)" @blur="inputAmandData(item, index, 'main')">
                                            </td>
                                            <!--                         副石                       -->
                                            <td> <!-- 副石名 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyName}}</span>
                                                <el-select clearable v-model="item.old.deputyName" @change="selectData('deputy', 4, item, 'deputyName')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.deputyName"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石规格 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyStand}}</span>
                                                <el-select clearable v-model="item.old.deputyStand" @change="selectData('deputy', 3, item, 'deputyStand')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.deputyStand"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石粒数 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyCount}}</span>
                                                <input maxlength='12' v-else v-model="item.old.deputyCount" @keyup="operateData(index, 'deputy', 2)" @blur="inputAmandData(item, index, 'deputy')">
                                            </td>
                                            <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石重 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyWeight}}</span>
                                                <input maxlength='12' v-else v-model="item.old.deputyWeight" @keyup="operateData(index, 'deputy', 3)" @blur="inputAmandData(item, index, 'deputy')">
                                            </td>
                                            <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石单位 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyUnit}}</span>
                                                <el-select clearable v-model="item.old.deputyUnit" @change="selectData('deputy', 1, item, 'deputyUnit')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.deputyUnit"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石单价 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyUnitPrice}}</span>
                                                <input maxlength='12' v-else v-model="item.old.deputyUnitPrice" @keyup="operateData(index, 'deputy', 4)" @blur="inputAmandData(item, index, 'deputy')">
                                            </td>
                                            <td v-if="tableMainFlag.otherStonFlag"> <!-- 计价方式 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyCalcMethod}}</span>
                                                <el-select clearable v-model="item.old.deputyCalcMethod" @change="selectData('deputy', 2, item, 'deputyCalcMethod')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.deputyCalcMethod"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.otherStonFlag"> <!-- 副石额 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.deputyPrice}}</span>
                                                <input v-else v-model="item.old.deputyPrice" @keyup="operateData(index, 'deputy', 5)" @blur="inputAmandData(item, index, 'deputy')">
                                            </td>
                                            <!--                         工费                       -->
                                            <td> <!-- 销售工费 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.soldFee}}</span>
                                                <input maxlength='6' v-else v-model="item.old.soldFee" @keyup="operateData(index, 'fee', 1)" @blur="inputAmandData(item, index, 'fee')">
                                            </td>
                                            <td v-if="tableMainFlag.workFlag"> <!-- 销售工费方式 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.soldMethod}}</span>
                                                <el-select clearable v-model="item.old.soldMethod" @change="selectData('fee', 1, item, 'soldMethod')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.soldMethod"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.workFlag"> <!-- 进货工费 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.inFee}}</span>
                                                <input maxlength='6' v-else v-model="item.old.inFee" @keyup="operateData(index, 'fee', 2)" @blur="inputAmandData(item, index, 'fee')">
                                            </td>
                                            <td v-if="tableMainFlag.workFlag"> <!-- 进货工费方式 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.inMethod}}</span>
                                                <el-select clearable v-model="item.old.inMethod" @change="selectData('fee', 2, item, 'inMethod')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.inMethod"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.workFlag"> <!-- 进货工费额 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.inMoney}}</span>
                                                <input maxlength='12' v-else v-model="item.old.inMoney" @keyup="operateData(index, 'fee', 3)" @blur="inputAmandData(item, index, 'fee')">
                                            </td>
                                            <!--                         配件                       -->
                                            <td> <!-- 配件名 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.partName}}</span>
                                                <el-select clearable v-model="item.old.partName" @change="selectData('part', 1, item, 'partName')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.partName"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    :key="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.partsFlag"> <!-- 配件数 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.partCount}}</span>
                                                <input maxlength='12' v-else v-model="item.old.partCount" @keyup="operateData(index, 'part', 1)" @blur="inputAmandData(item, index, 'part')">
                                            </td>
                                            <td v-if="tableMainFlag.partsFlag"> <!-- 配件重 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.partWeight}}</span>
                                                <input maxlength='12' v-else v-model="item.old.partWeight" @keyup="operateData(index, 'part', 2)" @blur="inputAmandData(item, index, 'part')">
                                            </td>
                                            <td v-if="tableMainFlag.partsFlag"> <!-- 配件单价 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.partPrice}}</span>
                                                <input maxlength='12' v-else v-model="item.old.partPrice" @keyup="operateData(index, 'part', 3)" @blur="inputAmandData(item, index, 'part')">
                                            </td>
                                            <td v-if="tableMainFlag.partsFlag"> <!-- 计价方式 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.calcMethod}}</span>
                                                <el-select clearable v-model="item.old.calcMethod" @change="selectData('part', 2, item, 'calcMethod')" placeholder="请选择" v-else>
                                                    <el-option
                                                    v-for="selItem in configPullDownData.calcMethod"
                                                    :label="selItem.name || selItem.classesName || selItem.certificateName || selItem.name"
                                                    :value="selItem.classesName || selItem.certificateName || selItem.name"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td v-if="tableMainFlag.partsFlag"> <!-- 配件额 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.price}}</span>
                                                <input maxlength='12' v-else v-model="item.old.price" @keyup="operateData(index, 'part', 4)" @blur="inputAmandData(item, index, 'part')">
                                            </td>
                                            <!--                         其他费用                       -->
                                            <td> <!-- 其他费用名 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.otherFeeName}}</span>
                                                <input maxlength='12' v-else v-model="item.old.otherFeeName" @keyup="operateData(index, 'other', 1)" @blur="inputAmandData(item, index, 'part')">
                                            </td>
                                            <td v-if="tableMainFlag.otherFlag"> <!-- 其他费用额 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.otherFee}}</span>
                                                <input maxlength='12' v-else v-model="item.old.otherFee" @keyup="operateData(index, 'other', 2)" @blur="inputAmandData(item, index, 'part')">
                                            </td>
                                            <!--                         标价                       -->
                                            <td> <!-- 成本 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.costPrice}}</span>
                                                <input maxlength='12' v-else v-model="item.old.costPrice" @keyup="operateData(index, 'price', 1)" @blur="inputAmandData(item, index, 'price')">
                                            </td>
                                            <td v-if="tableMainFlag.priceFlag"> <!-- 倍率 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.ratio}}</span>
                                                <input maxlength='12' v-else v-model="item.old.ratio" @keyup="operateData(index, 'price', 2)" @blur="inputAmandData(item, index, 'price')">
                                            </td>
                                            <td v-if="tableMainFlag.priceFlag"> <!-- 售价 -->
                                                <span v-if="isOperate || tableIndex != index">{{item.old.soldPrice}}</span>
                                                <input maxlength='12' v-else v-model="item.old.soldPrice" @keyup="operateData(index, 'price', 3)" @blur="inputAmandData(item, index, 'price')">
                                            </td>
                                            <!--                         操作                       -->
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="body-row5" ref="body_row5">
                    <div class="btn-wrap">
                        <div v-if="isSelDelect == false">
                            <div class="checked-btn" style="height: 40px; line-height: 40px;"><el-checkbox :checked="tableRowData.length == deleteList.length" @change="checkAllItem">全选(<span>{{tableRowData.length}}</span>)</el-checkbox></div>
                            <div class="btn" @click="batchDeletion(1)">确定</div>
                            <div class="btn" @click="batchDeletion(2)">取消</div>
                        </div>
                        <div v-else>
                            <!-- ****************************************************************** -->
                            <div class="btn" v-if="receiptsIntroList.checkType != '1' && isMakeMan && nowStatus != 6 && nowStatus == 3 || receiptsIntroList.checkType == '3' && isMakeMan && nowStatus != 6 || nowStatus == 2 && isMakeMan == true || isCheckOrderMan == 'Y' && nowStatus == 3" @click="operateSubmit(1)">撤回审核</div>
                            <!-- ****************************************************************** -->
                            <div class="btn" v-if="receiptsIntroList.checkType == '2' && isCheckOrderMan == 'Y' && nowStatus != 6" @click="operateSubmit(2)">通过审核</div>
                            <div class="btn" v-if="receiptsIntroList.checkType == '2' && isCheckOrderMan == 'Y' && nowStatus != 6" @click="operateSubmit(3)">驳回审核</div>
                            <!-- ****************************************************************** -->
                            <div class="btn" v-if="isMakeMan && receiptsIntroList.checkType == '1' && nowStatus != 6 && nowStatus != '3'" @click="operateSubmit(4)">提交审核</div>
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
                <!-- 批量添加 -->
                <BatchAddReceipts
                    v-if="popup1.batchAddReceiptsPopup"
                    :isPopup="popup1.batchAddReceiptsPopup"
                    :supplierListData="supplierListData1"
                    v-on:addReceiptsState="delectReceiptsState"
                >    
                </BatchAddReceipts>
                <!-- 复制弹窗 -->
                <div class="dialog-w380">
                    <el-dialog title="复制当前产品信息" v-model="popup.copys">
                        <section class="copy-body p-lf30 p-tb30">
                            <p>复制行数</p>
                            <el-input
                                placeholder="请输入复制行数"
                                v-model="popup.copyNumber">
                            </el-input>
                        </section>
                        <span slot="footer">
                            <a href="javascript: void(0)" class="cancel-btn-w120" @click="popup.copys = false">取 消</a>
                            <a href="javascript: void(0)" class="confirm-btn-w120 m0" @click="copyRowData">确 定</a>
                        </span>
                    </el-dialog>
                </div>
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
                            <span class="titleBox" v-if="popup.isShowBigClass">必填</span>
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
                            <span class="titleBox" v-if="popup.isShowData">必填</span>
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
                ></QueryOption>
                <PrintLabelByOrderDialog ref="printLabelByOrderDialog" :orderNum="print.currentOrderNum" :labelTemplateList="labelTemplateList" :productList="print.productList" :totalNum="print.totalNum" @requestProductList="requestProductList" @printTemplate="printTemplate" @previewTemplate="previewTemplate"></PrintLabelByOrderDialog>
                <TemplatePreviewDialog ref="templatePreviewDialog" @print="printTemplate" :canvas="print.canvas" :templateData="print.templateData" :pageNumber="print.templateData.productList.length"></TemplatePreviewDialog>
                <div class="xiao-hua-dayin">
                <!--<PrintCanvasTemplate v-show="print.isPreview" class="template-print-canvas" :isPrintCanvas="true" :canvas="print.canvas" :templateData="print.templateData" v-for="i in print.templateData.productList.length" :page="i"></PrintCanvasTemplate>-->
                <!--             <TemplatePreviewCanvasComponent v-show="print.isPreview" class="template-print-canvas" :isPrintCanvas="true" :canvas="print.canvas" :templateData="print.templateData" v-for="i in print.templateData.productList.length" :page="i"></TemplatePreviewCanvasComponent> -->
                <lodop ref="lodop" :canvas="print.canvas"  :templateData="print.templateData" :page="print.templateData.productList.length" ></lodop>
            </div>
            </div>
        </div>
</template>
<script>
import Vue from 'vue'
import {mapActions, mapGetters, mapState} from 'vuex'
import { downloadTable, seekProductClassList, seekProductPropertyList, seekCertificateList, seekReceiptXGSynopsis, getUpdateGoodsList,seekReceiptStatusList } from 'Api/commonality/seek'
import {productDetailStatus} from 'Api/commonality/status'
import {readOnly} from 'Api/commonality/filter' // 过滤器
import {computedStorageData} from "Api/commonality/computed" // 计算器
import {productOrId} from 'Api/commonality/extractValue' // 提取值
import {operateAddProductToRKOrder, operateProductList, updateGoods, operateHandleXGReceipt, operateDeleteByOrderNumber, operateRemarkOperation, deleteUpdateGoods, operateSubmitAudit, operateReceiptOperation} from 'Api/commonality/operate'
import QueryOption from "components/confirm/QueryOption.vue"
import AmendReceiptsIntro from "components/work/AmendReceiptsIntro.vue"
import receiptsRemark from "components/work/ReceiptsRemark.vue"
import inputRatio from "./../CommonalityComponent/input/computed/inputRatio" // 倍率计算
import inputSoldPrice from "./../CommonalityComponent/input/computed/inputSoldPrice" // 售价计算
import pureNumbers from "./../CommonalityComponent/input/pureNumbers.vue" // 纯数字
import integer from "./../CommonalityComponent/input/integer.vue" // 整数
import sliceNumber from "./../CommonalityComponent/input/sliceNumber.vue" // 小数
import normalInput from "./../CommonalityComponent/input/normalInput.vue" // 小数
import barCode from "./../CommonalityComponent/input/BarCode.vue" // 条形码
import PrintLabelByOrderDialog from 'components/template/PrintLabelByOrderDialog'
import TemplatePreviewDialog from 'components/template/TemplatePreviewDialog'
import TemplatePreviewCanvasComponent from 'components/template/TemplatePreviewCanvas'
import PrintCanvasTemplate from 'components/template/PrintCanvasTemplate'
import BatchAddReceipts from '../../../components/work/BatchAddReceipts'
import Lodop from 'components/template/Lodop'

export default {
    components: {
        pureNumbers,
        integer,
        sliceNumber,
        barCode,
        inputRatio,
        inputSoldPrice,
        QueryOption,
        AmendReceiptsIntro,
        receiptsRemark,
        normalInput,
        PrintLabelByOrderDialog,
        TemplatePreviewDialog,
        TemplatePreviewCanvasComponent,
        PrintCanvasTemplate,
        Lodop,
        BatchAddReceipts
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
            isMakeMan: false,
            auditText: '',
            auditShow: false,
            textareaData: '', // 审核弹窗文字
            barcodeNum: '', // 条形码
            pageSize: 7,
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
            tableRowData: [
                // leftRowData: [],
                // rightRowData: []
            ],
            isEditFlag: false,
            receiptData: '', //单据创建时间
            stepIndex: [], // 进度条index
            receiptInfoList: [], // 单据状态信息
            "blurTitle": '', //范围错误提示
            "pitchLittleClassKey": null,
            "introListOption": false, // 关闭单据简介的编辑
            "allDataNum": {
                "status": "1",
                "totalNum": "0"
            }, // 单据的信息（总条数，状态）
            "receiptsIntroList": "", // 单据简介
            "datas": { // 数据源
                "hostList": [], // 历史数据
                "newList": [], // 修改数据
                "newBlandDatas": [] // 新增空白数据
            },
            "getGoodsInfoList": [],
            "bodyWrap": {},
            "operate": { // 操作的状态
                selectedRow: [], // 记录当前点中，待后期优化
                mousemoveStyle: [], // 鼠标移过表格时的样式
                openState: true // 伸缩列表总开关按钮
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
            "popup1": {
                "fullscreenLoading": false, // 保存过程的过场动画
                "successData": null, // 制单成功数据
                "deleteReceipts": false, // 删除单据弹窗
                "batchAddReceiptsPopup": false,
                "auditPopup": false // 审核弹窗
            },
            "popup": { // 弹窗
                isQueryOption: false, // 是否回到上一页
                orderUerName: sessionStorage.getItem("nickname"), // 制单人
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
            isRole: '',
            isCheckOrderMan: '',
            nowStatus: ''
        }
    },
    directives: {
      focus: {
          inserted: function (el) {
            el.focus();
          }
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
        paginationSize: function () { // 分页的大小
            return Number(this.allDataNum.totalNum);
        },
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
        emptyDataSize: function () {
            return (10 - this.datas.hostList.length);
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
            let dataList = [];
            for (let i = 0; i < this.datas.hostList.length; i++) { // 添加历史数据
                let dataObject = {
                    hostList: null, // 历史
                    newList: null // 修改
                }
                dataObject.hostList = this.datas.hostList[i];
                dataList.push(dataObject);
                dataObject = null;
            }
            for (let j = 0; j < this.datas.newList.length; j++) { // 添加可修改数据
                dataList[j].newList = this.datas.newList[j];
            }
            dataList.push(...this.datas.newBlandDatas); // 添加空白数据
            return dataList;
        },
        getCheckedPage: function () { // 监听当页的所有做选择的变量（删除选择）
            var CheckedPage = [];
            for (var i = 0; i < this.showData.length; i++) {
                CheckedPage.push(i + ((this.crudData.currentPage - 1) * 30))
            }
            return CheckedPage;
        },
        delectOptionRole () {
            let checkType = this.receiptsIntroList.checkType === "3";
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
            this.getNewGoodsInfoList(this.crudData.currentPage, '10');
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
        'emptyDataSize': function () { // 当前页显示的空白条数
            this.appendRow();
        },
        'crudData.operationCut': function () {
            this.crudData.checkList = [];
        },
        'tableIndex': function (newVal, oldVal) {
            if (this.newRowData.length != 0) {
                this.tableRowData[oldVal].old = this.newRowData
            }
            // if (this.tableInitRowData.length !== this.tableRowData.length) {
            //     for (let j = this.tableRowData.length - 1; j > this.tableInitRowData.length - 1; j--) {
            //         this.newAddtableData.push(this.tableRowData[j].old)
            //     }
            // }  
        },
        'deleteList': function (val) {
            //console.log(val)
            this.deleteList1 = val.map((k, i) => {
                return {barcode: k}
            })
        }
    },
    created () { // 获取下拉数据
        this.getNewGoodsInfoList('1', this.pageSize);
        this.getNewGoodsInfoList1('1', this.pageSize);
        // // this.appendRow(); // 进来默认新增一条
        this.getDownUrl(); // 获取模板地址
        this.workSupplierList(); // 获取供应商列表
        this.workApplyDepartement(); // 计划分销商
        this.productClassList(); // 获取商品大小类的下拉列表
        this.productPropertyList(); // 商品属性下拉列表
        this.productCertificateList(); // 证书下拉列表
        this.getConfigInto(); // 初始化一些配置数据
        this.getSeekSellReceiptsIntro(); // 单据简介
        this.receiptStatusList(); // 单据状态
        this.updateGoodsList() // 商品修改列表
        this.$store.dispatch('getTemplateList', {type: 2, fieldType: 'simple'})

    },
    mounted () {
        // 初始化键盘事件
        let self = this
        self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left -10 + 'px'
        window.addEventListener('keydown', this.keydownHandler)
        this.$refs.right_scroll_wrap.style.width = this.$refs.row4_main.offsetWidth - 450 + 'px'
        this.$refs.right_tittle.style.width = this.$refs.row4_main.offsetWidth - 450 + 'px'
        this.$refs.right_scroll_wrap.style.position = 'absolute'
        self.$refs.right_table_data.style.marginTop = "80px"
        self.$refs.fixed_mask.style.left = self.$refs.body_box.getBoundingClientRect().left -10 + 'px'

        this.$refs.row4_main.style.width = "1250px"
        $(".new-storage").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
            mouseWheel: {
                scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: false,
                // disableOver: ['div']
            },
            callbacks: {
                whileScrolling: function () {
                    self.$refs.right_scroll_wrap.style.width = self.$refs.row4_main.offsetWidth - 450 + 'px'
                    self.$refs.right_tittle.style.width = self.$refs.row4_main.offsetWidth - 450 + 'px'
                    self.$refs.table_tlttle.style.width = self.$refs.row4_main.offsetWidth + 'px'
                    if (self.$refs.right_table_wrap.offsetHeight > 450) {
                        self.$refs.shadow.style.height = self.$refs.right_table_wrap.offsetHeight + 50 + 'px'
                    } else {
                        self.$refs.shadow.style.height = 500 + 'px'
                    }

                    // self.$refs.body_header.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    // self.$refs.left_tittle.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    // self.$refs.body_row5.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'
                    // console.log(22222)
                    //console.log(this.mcs.top)
                    if (this.mcs.top <= -255) {
                        self.$refs.table_tlttle.style.position = 'fixed'
                        self.$refs.table_tlttle.style.top = '140px'
                        self.$refs.left_tittle.style.position = 'fixed'
                        self.$refs.left_tittle.style.top = '190px'
                        //self.$refs.left_tittle.style.left = '190px'
                        self.$refs.left_tittle.style.zIndex = '40'

                        self.$refs.left_tittle.style.left = self.$refs.body_box.getBoundingClientRect().left + 'px'

                        self.$refs.right_scroll_wrap.style.position = 'fixed'
                        self.$refs.right_scroll_wrap.style.top = '190px'
                        self.$refs.right_scroll_wrap.style.zIndex = '39'
                        self.$refs.right_table_data.style.marginTop = "120px"
                        // self.$refs.left_tlttle1.style.position = 'fixed'
                        // self.$refs.left_tlttle1.style.top = '230px'
                        self.$refs.left_table_main.style.top = "119px"
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
                    }
                },
                onTotalScroll: function () {
                    // console.log(this.mcs.topPct)
                    if (self.isREfresh == true) {
                        if (self.amandTableData.length <= 0 && self.newAddtableData.length <= 0) {
                            self.pageSize += 10
                            self.getNewGoodsInfoList('1', self.pageSize);
                            self.getNewGoodsInfoList1('1', self.pageSize);
                        } else if (self.amandTableData.length > 0 || self.newAddtableData.length > 0) {
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
                }
            }
        });
        // $(".right-table-wrap").mCustomScrollbar({
        //     theme: "minimal-dark",
        //     axis: "x",
        //     autoHideScrollbar: true,
        //     scrollInertia: 500,
        //     // normalizeDelta: false,
        //     mouseWheel:{ 
        //         preventDefault: false,
        //         normalizeDelta: false,
        //         enable: false
        //     },
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
            self.$refs.new_storage.style.marginTop = val.itemTop + 80 + "px"
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
            //console.log(this.tableRowData)
            if (this.tableRowData.length == this.deleteList.length) {
                this.deleteList = []
                this.deleteList1 = []
                this.allName = '全选'
            } else {
                this.deleteList = this.tableRowData.map((item, index) => {
                    return item.now.barcode
                })
                this.allName = '全不选'
            }
            //console.log(this.deleteList)
        },
        selectDelItem (item) { // 选择删除项目
            //console.log(item)
            if (this.deleteList.includes(item.now.barcode)) {
                let i = this.deleteList.indexOf(item.now.barcode)
                this.deleteList.splice(i, 1)
            } else {
                this.deleteList.push(item.now.barcode)
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
        appendBatchRow () { // 批量新增
            this.popup1.batchAddReceiptsPopup = !this.popup1.batchAddReceiptsPopup;
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
                //this.send();
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
        tableAddObject( obj ){
            //tableRowData[index].old.brand
            //console.log(obj,this.tableRowData)
        },
        keydownHandler(e) { // 键盘处理函数
        //console.log(this.tableRowData.length)
            if (e.keyCode === 13) {
                this.tableIndex++
                if (this.tableIndex > this.tableRowData.length-1) {
                    this.tableIndex = this.tableRowData.length-1
                }
            }
        },
        closePopup () { // 关闭批量修改弹窗
            this.popup.amendings = false
        },
        // --------------------------------- 复制开始 -------------------------------------------
        deleteGoods (id) {
            if (this.stepIndex == 1) {
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
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getNewGoodsInfoList('1', this.pageSize);
                                this.getNewGoodsInfoList1('1', this.pageSize);
                                this.getSeekSellReceiptsIntro(); // 单据简介
                                this.receiptStatusList(); // 单据状态
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
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            console.log(res)
                            this.getNewGoodsInfoList('1', this.pageSize);
                            this.getNewGoodsInfoList1('1', this.pageSize);
                            this.getSeekSellReceiptsIntro(); // 单据简介
                            this.receiptStatusList(); // 单据状态
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
            } else {
                this.$message({
                    type: 'warning',
                    message: '无法删除审核中、已审核单据商品'
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
            // this.scrollLeft = this.mcs.leftPct
            //this.$refs.right_scroll_wrap.style.left = this.$refs.right_table_wrap.scrollLeft + "px"
            this.$refs.right_tittle.style.left =  - this.$refs.right_table_wrap.scrollLeft + "px"
        },
        inputAmandData (item, index, name) {
            console.log(item)
            let obj = {}
            switch (name) {
                case "base":
                    obj = {
                        "productId": item.now.productId,
                        "modelNo": item.old.modelNo,
                        "handInch": item.old.handInch,
                        "remark": item.old.remark,
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    console.log(this.amandTableData)
                    break;
                case "weight":
                    obj = {
                        "productId": item.now.productId,
                        "totalWeight": item.old.totalWeight,
                        "netWeight": item.old.netWeight,
                        "heavyCode": item.old.heavyCode,
                        "goldCost": item.old.goldCost,
                        "goldPrice": item.old.goldPrice,
                        "goldE": item.old.goldE,
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "page":
                    obj = {
                        "productId": item.now.productId,
                        "certifiNo": item.old.certifiNo,
                        "certifiFee": item.old.certifiFee,
                        "authCode": item.old.authCode
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "main":
                    obj = {
                        "productId": item.now.productId,
                        "mainName": item.old.mainName,
                        "count": item.old.count,
                        "mainWeight": item.old.mainWeight,
                        "unitPrice": item.old.unitPrice,
                        "mainPrice": item.old.mainPrice
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "deputy":
                    obj = {
                        "productId": item.now.productId,
                        "deputyName": item.old.deputyName,
                        "deputyCount": item.old.deputyCount,
                        "deputyWeight": item.old.deputyWeight,
                        "deputyUnitPrice": item.old.deputyUnitPrice,
                        "deputyPrice": item.old.deputyPrice
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "fee":
                    obj = {
                        "productId": item.now.productId,
                        "soldFee": item.old.soldFee,
                        "inFee": item.old.inFee,
                        "inMoney": item.old.inMoney,
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "part":
                    obj = {
                        "productId": item.now.productId,
                        "partCount": item.old.partCount,
                        "partWeight": item.old.partWeight,
                        "partPrice": item.old.partPrice,
                        "price": item.old.price
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "other":
                    obj = {
                        "productId": item.now.productId,
                        "otherFeeName": item.old.otherFeeName,
                        "otherFee": item.old.otherFee
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
                case "price":
                    obj = {
                        "productId": item.now.productId,
                        "costPrice": item.old.costPrice,
                        "ratio": item.old.ratio,
                        "soldPrice": item.old.soldPrice
                    }
                    for (let i in obj) {
                        if (obj[i] == '') {
                            delete obj[i]
                        }
                    }
                    this.amandTableData.push(obj)
                    break;
            }
        },
        operateData (index, name, type) {
            if (name == 'weight') { //重量
                if (type == 1) { // --------------------------------------------------------------------- 总件重
                   this.tableRowData[index].old.netWeight = Number((this.tableRowData[index].old.totalWeight - (this.tableRowData[index].old.deputyWeight + this.tableRowData[index].old.partWeight))).toFixed(3)
                } else if (type == 2){ // --------------------------------------------------------------------- 净金重
                    this.tableRowData[index].old.totalWeight = Number((this.tableRowData[index].old.netWeight + this.tableRowData[index].old.mainWeight + this.tableRowData[index].old.deputyWeight + this.tableRowData[index].old.partWeight)).toFixed(3)
                    this.tableRowData[index].old.heavyCode = Number((this.tableRowData[index].old.netWeight + this.tableRowData[index].old.partWeight)).toFixed(3)
                } else if (type == 3){ // --------------------------------------------------------------------- 含配金重
                    this.tableRowData[index].old.netWeight = Number(this.tableRowData[index].old.heavyCode - this.tableRowData[index].old.partWeight).toFixed(3)
                } else if (type == 4){ // --------------------------------------------------------------------- 金耗
                     this.tableRowData[index].old.goldE = this.tableRowData[index].old.netWeight * (1 + (this.tableRowData[index].old.goldCost/100)) * this.tableRowData[index].old.goldPrice
                } else if (type == 5){ // --------------------------------------------------------------------- 金价
                    this.tableRowData[index].old.goldE = Number(this.tableRowData[index].old.goldE = this.tableRowData[index].old.netWeight * (1 + (this.tableRowData[index].old.goldCost/100)) * this.tableRowData[index].old.goldPrice).toFixed(2)
                } else if (type == 6){ // --------------------------------------------------------------------- 金料额
                    this.tableRowData[index].old.goldPrice = Number(this.tableRowData[index].old.goldE / (this.tableRowData[index].old.netWeight * (1 + (this.tableRowData[index].old.goldCost/100)))).toFixed(2)
                    this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                    this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                }
            } else if (name == "main") { // 主石
                if (type == 1) {

                } else if (type == 2) { // 粒数
                    if (this.tableRowData[index].old.mainCalcMethod == '计件') {
                        this.tableRowData[index].old.mainPrice = Number(this.tableRowData[index].old.count * this.tableRowData[index].old.unitPrice).toFixed(2)
                    }
                    console.log(this.tableRowData)
                } else if (type == 3) {
                    if (this.tableRowData[index].old.mainCalcMethod == '计重') {
                        this.tableRowData[index].old.mainPrice = Number(this.tableRowData[index].old.mainWeight * this.tableRowData[index].old.unitPrice).toFixed(2)
                        this.tableRowData[index].old.totalWeight = Number((this.tableRowData[index].old.netWeight + this.tableRowData[index].old.mainWeight + this.tableRowData[index].old.deputyWeight + this.tableRowData[index].old.partWeight)).toFixed(3)
                    }
                } else if (type == 4) {
                    if (this.tableRowData[index].old.mainCalcMethod == '计件') {
                        this.tableRowData[index].old.mainPrice = Number(this.tableRowData[index].old.count * this.tableRowData[index].old.unitPrice).toFixed(2)
                    } else if (this.tableRowData[index].old.mainCalcMethod == '计重') {
                        this.tableRowData[index].old.mainPrice = Number(this.tableRowData[index].old.mainWeight * this.tableRowData[index].old.unitPrice).toFixed(2)
                    }
                } else if (type == 5) {
                    if (this.tableRowData[index].old.mainCalcMethod == '计件') {
                        this.tableRowData[index].old.unitPrice = (Number(this.tableRowData[index].old.mainPrice) / Number(this.tableRowData[index].old.count)).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    } else if (this.tableRowData[index].old.mainCalcMethod == '计重') {
                        this.tableRowData[index].old.unitPrice = (Number(this.tableRowData[index].old.mainPrice) / Number(this.tableRowData[index].old.mainWeight)).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    }
                }
            } else if (name == "deputy") { // 副石
                if (type == 1) {

                } else if (type == 2) {
                    if (this.tableRowData[index].old.deputyCalcMethod == '计件') {
                        this.tableRowData[index].old.deputyPrice = (Number(this.tableRowData[index].old.deputyCount) * Number(this.tableRowData[index].old.deputyUnitPrice)).toFixed(2)
                        // console.log()
                    } else if (this.tableRowData[index].old.deputyCalcMethod == '计重') {
                        this.tableRowData[index].old.deputyPrice = (Number(this.tableRowData[index].old.deputyWeight) * Number(this.tableRowData[index].old.deputyUnitPrice)).toFixed(2)
                    }
                } else if (type == 3) {
                    if (this.tableRowData[index].old.deputyCalcMethod == '计件') {
                        this.tableRowData[index].old.deputyPrice = (Number(this.tableRowData[index].old.deputyCount) * Number(this.tableRowData[index].old.deputyUnitPrice)).toFixed(2)
                    } else if (this.tableRowData[index].old.deputyCalcMethod == '计重') {
                        this.tableRowData[index].old.deputyPrice = (Number(this.tableRowData[index].old.deputyWeight) * Number(this.tableRowData[index].old.deputyUnitPrice)).toFixed(2)
                        this.tableRowData[index].old.totalWeight = Number((this.tableRowData[index].old.netWeight + this.tableRowData[index].old.mainWeight + this.tableRowData[index].old.deputyWeight + this.tableRowData[index].old.partWeight)).toFixed(3)
                    }
                } else if (type == 4) { // 单价
                    if (this.tableRowData[index].old.deputyCalcMethod == '计件') {
                        this.tableRowData[index].old.deputyPrice = (Number(this.tableRowData[index].old.deputyCount) * Number(this.tableRowData[index].old.deputyUnitPrice)).toFixed(2)
                    } else if (this.tableRowData[index].old.deputyCalcMethod == '计重') {
                        this.tableRowData[index].old.deputyPrice = (Number(this.tableRowData[index].old.deputyWeight) * Number(this.tableRowData[index].old.deputyUnitPrice)).toFixed(2)
                    }
                } else if (type == 5) { // 副石额
                    if (this.tableRowData[index].old.deputyCalcMethod == '计件') {
                        this.tableRowData[index].old.deputyUnitPrice = (Number(this.tableRowData[index].old.deputyPrice) / Number(this.tableRowData[index].old.deputyCount)).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    } else if (this.tableRowData[index].old.deputyCalcMethod == '计重') {
                        this.tableRowData[index].old.deputyUnitPrice = (Number(this.tableRowData[index].old.deputyPrice) / Number(this.tableRowData[index].old.deputyWeight)).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    }
                }
            } else if (name == "fee") {
                if (type == 1) {

                } else if (type == 2) {
                    if (this.tableRowData[index].old.inMethod == '计重') {
                        this.tableRowData[index].old.inMoney = Number(this.tableRowData[index].old.netWeight * this.tableRowData[index].old.inFee).toFixed(2)
                    }
                } else if (type == 3) {
                    if (this.tableRowData[index].old.inMethod == '计重') {
                        this.tableRowData[index].old.inFee = (Number(this.tableRowData[index].old.inMoney) / Number(this.tableRowData[index].old.netWeight)).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    } else if (this.tableRowData[index].old.inMethod == '计件') {
                        this.tableRowData[index].old.inFee = Number(1 * this.tableRowData[index].old.inMoney).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    }
                }
            } else if (name == "part") {
                if (type == 1) { // 配件数
                    if (this.tableRowData[index].old.calcMethod == '计件') {
                        this.tableRowData[index].old.price = Number(this.tableRowData[index].old.partCount * this.tableRowData[index].old.partPrice).toFixed(3)
                    }
                } else if (type == 2) { // 配件重
                    if (this.tableRowData[index].old.calcMethod == '计重') {
                        this.tableRowData[index].old.price = Number(this.tableRowData[index].old.partWeight * this.tableRowData[index].old.partPrice).toFixed(3)
                        this.tableRowData[index].old.totalWeight = Number((this.tableRowData[index].old.netWeight + this.tableRowData[index].old.mainWeight + this.tableRowData[index].old.deputyWeight + this.tableRowData[index].old.partWeight)).toFixed(3)
                    }
                } else if (type == 3) { // 配件单价
                    if (this.tableRowData[index].old.calcMethod == '计重') {
                        this.tableRowData[index].old.price = Number(this.tableRowData[index].old.partWeight * this.tableRowData[index].old.partPrice).toFixed(3)
                    } else if (this.tableRowData[index].old.calcMethod == '计件') {
                        this.tableRowData[index].old.price = Number(this.tableRowData[index].old.partCount * this.tableRowData[index].old.partPrice).toFixed(3)
                    }
                } else if (type == 4) { // 配件额
                    if (this.tableRowData[index].old.calcMethod == '计重') {
                        this.tableRowData[index].old.partPrice = Number(this.tableRowData[index].old.price / this.tableRowData[index].old.partWeight).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    } else if (this.tableRowData[index].old.calcMethod == '计件') {
                        this.tableRowData[index].old.price = Number(this.tableRowData[index].old.price * this.tableRowData[index].old.partCount).toFixed(2)
                        this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                        this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                    }
                }
            } else if (name == "other") {
                if (type == 2) {
                    this.tableRowData[index].old.otherFee = parseInt(this.tableRowData[index].old.otherFee).toFixed(2)
                    this.tableRowData[index].old.costPrice = (Number(this.tableRowData[index].old.goldE) + Number(this.tableRowData[index].old.certifiFee) + Number(this.tableRowData[index].old.mainPrice) + Number(this.tableRowData[index].old.deputyPrice) + Number(this.tableRowData[index].old.inMoney) + Number(this.tableRowData[index].old.price) + Number(this.tableRowData[index].old.otherFee)).toFixed(2)
                    this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                }
            } else if (name == "price") {
                if (type == 1) {
                    this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                } else if (type == 2) {
                    this.tableRowData[index].old.soldPrice = (Number(this.tableRowData[index].old.costPrice) * Number(this.tableRowData[index].old.ratio)).toFixed(2)
                } else if (type == 3) {
                    this.tableRowData[index].old.ratio = (Number(this.tableRowData[index].old.soldPrice) / Number(this.tableRowData[index].old.costPrice)).toFixed(2)
                }
            }

            console.log(this.tableRowData[index].old)
        },
        selectData (name, index, item, value, indexNum) {
            if (name == 'page' && index == 1) {
                for (let i = 0; i < this.configPullDownData.certifiName.length; i++) {
                    if (this.configPullDownData.certifiName[i].certificateName == this.tableRowData[indexNum].old.certifiName) {
                        this.tableRowData[indexNum].old.certifiName = this.configPullDownData.certifiName[i].certificateName
                        this.tableRowData[indexNum].old.organizationName = this.configPullDownData.certifiName[i].organizationName
                        this.tableRowData[indexNum].old.website = this.configPullDownData.certifiName[i].website
                        this.tableRowData[indexNum].old.phone = this.configPullDownData.certifiName[i].phone
                        this.tableRowData[indexNum].old.stand1 = this.configPullDownData.certifiName[i].stand1
                        this.tableRowData[indexNum].old.stand2 = this.configPullDownData.certifiName[i].stand2
                        this.tableRowData[indexNum].old.stand3= this.configPullDownData.certifiName[i].stand3
                        this.tableRowData[indexNum].old.certifiFee = this.configPullDownData.certifiName[i].certifiFee
                        console.log(this.tableRowData[indexNum].old)
                    }
                }
            } else if (name == "stand") {
                if (index == 3) {
                    if (this.tableRowData[index].old.mainCalcMethod == '计重') {
                        this.tableRowData[index].old.mainPrice = Number(this.tableRowData[index].old.mainWeight * this.tableRowData[index].old.unitPrice).toFixed(2)
                    } else if (this.tableRowData[index].old.mainCalcMethod == '计件') {
                        this.tableRowData[index].old.mainPrice = Number(this.tableRowData[index].old.count * this.tableRowData[index].old.unitPrice).toFixed(2)
                    }
                }
            } else if (name == "deputy") {
                if (index == 2) {
                    if (this.tableRowData[index].old.deputyCalcMethod == '计重') {
                        this.tableRowData[index].old.deputyPrice = Number(this.tableRowData[index].old.deputyWeight * this.tableRowData[index].old.deputyUnitPrice).toFixed(2)
                    } else if (this.tableRowData[index].old.deputyCalcMethod == '计件') {
                        this.tableRowData[index].old.deputyPrice = Number(this.tableRowData[index].old.deputyCount * this.tableRowData[index].old.deputyUnitPrice).toFixed(2)
                    }
                }
            } else if (name == "fee") {
                if (index == 2) {
                    if (this.tableRowData[index].old.inMethod == '计重') {
                        this.tableRowData[index].old.inMoney = Number(this.tableRowData[index].old.netWeight * this.tableRowData[index].old.inFee).toFixed(2)
                    } else if (this.tableRowData[index].old.inMethod == '计件') {
                        this.tableRowData[index].old.inMoney = Number(1 * this.tableRowData[index].old.inFee).toFixed(2)
                    }
                }
            } else if (name == "part") {
                if (index == 2) {
                    if (this.tableRowData[index].old.calcMethod == '计重') {
                        this.tableRowData[index].old.price = Number(this.tableRowData[index].old.partWeight * this.tableRowData[index].old.partPrice).toFixed(3)
                    } else if (this.tableRowData[index].old.calcMethod == '计件') {
                        this.tableRowData[index].old.price = Number(this.tableRowData[index].old.partCount * this.tableRowData[index].old.partPrice).toFixed(3)
                    }
                }
            }
            for (let i in item.now) {
                if (value == 'certifiName') {
                    let dataArr = [
                        {
                            productId: item.now.productId,
                            certifiName: item.old.certifiName
                        },
                        {
                            productId: item.now.productId,
                            organizationName: item.old.organizationName
                        },
                        {
                            productId: item.now.productId,
                            website: item.old.website
                        },
                        {
                            productId: item.now.productId,
                            phone: item.old.phone
                        },
                        {
                            productId: item.now.productId,
                            stand1: item.old.stand1
                        },
                        {
                            productId: item.now.productId,
                            stand2: item.old.stand2
                        },
                        {
                            productId: item.now.productId,
                            stand3: item.old.stand3
                        }
                    ]
                    dataArr.map((item, index) => {
                        this.amandTableData.push(item)
                    })
                    return
                }
                if (i == value) {
                    let data = {}
                    data[value] = item.old[i]
                    data.productId = item.now.productId
                    this.amandTableData.push(data)
                    return
                }
            }
        },
        selectTable (index) {
            //console.log(index)
            let self = this
            if (this.tableIndex == index) {
            } else {
                let rowData = JSON.stringify(this.configBlankData());
                let newRowData = JSON.parse(rowData);
                // this.tableRowData[newVal].old = newRowData.hostList
                for (let k in newRowData.hostList) {
                    if (this.tableRowData[index].old.hasOwnProperty(k)){
                        console.log("有啦~")
                    } else {
                        this.tableRowData[index].old[k] = ''
                    }
                }
                Vue.nextTick(() => {
                // DOM 更新了
                self.tableIndex = index
                })
                //console.log( this.tableRowData[index].old)
            }
        },
        contralWidth () { // 控制row4的宽度
            let flag = this.tableMainFlag
            if (flag.baseFlag == true || flag.weightFlag == true || flag.pageFlag == true || flag.mainStonFlag == true || flag.otherStonFlag == true || flag.workFlag == true || flag.partsFlag == true || flag.otherFlag == true || flag.priceFlag == true) {
                console.log(document.body.offsetWidth)
                let tableWidth = ((document.body.offsetWidth - 1250) / 2) + 1150
                this.$refs.row4_main.style.width = tableWidth + 'px'
            } else {
                this.$refs.row4_main.style.width = "1250px"
            }
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
                        if (res.data.state == 200) {
                            this.$router.push({path: '/work/amend'})
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '删除失败'
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
                        type: warning,
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
                    modelType: '3'
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
        // ************************************ 审核操作 ***************************************************
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
                options = {
                    "handleType": this.isMakeMan && this.nowStatus == 2 ? 3 : 6,
                    "orderIdList":[{"orderNum": this.$route.query.orderNumber}], //单据号
                    "checkRemark": ''
                }
                operateReceiptOperation(options).then((res) => {
                    if (res.data.state == 200) {
                        this.$message({
                            message: '撤销审核成功',
                            type: 'success'
                        });
                        this.getNewGoodsInfoList('1', this.pageSize);
                        this.getNewGoodsInfoList1('1', this.pageSize);
                        this.getConfigInto(); // 初始化一些配置数据
                        this.getSeekSellReceiptsIntro(); // 单据简介
                        this.receiptStatusList(); // 单据状态
                    } else {
                        this.$store.dispatch('workPopupError', res.data.msg)
                    }
                }, (res) => {
                    this.$store.dispatch('workPopupError', res.data.msg)
                })
            } else if (type == 2) { // 通过审核
                this.auditText = "通过说明"
                this.auditShow = true
                // this.sureSubmit()
            } else if (type == 3) { // 驳回审核
                this.auditText = "驳回说明"
                this.auditShow = true
                //    this.sureSubmit()
            } else if (type == 4) { // 提交审核
                if (this.tableRowData.length == 0 && this.newAddtableData.length == 0 && this.amandTableData.length == 0) {
                    this.$store.dispatch('workPopupError', '未操作的单据不可提交审核！')
                    
                } else {
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
                            this.getNewGoodsInfoList('1', this.pageSize);
                            this.getNewGoodsInfoList1('1', this.pageSize);
                            // this.getConfigInto(); // 初始化一些配置数据
                            this.getSeekSellReceiptsIntro(); // 单据简介
                            this.receiptStatusList(); // 单据状态
                        } else {
                            this.$store.dispatch('workPopupError', res.data.msg)
                        }
                    }, (res) => {
                        this.$store.dispatch('workPopupError', res.data.msg)
                    })
                }
                
            } 
        },
        askSubmit (type) {
            let options = {
                "handleType": type,
                "orderIdList":[{"orderNum": this.$route.query.orderNumber}], //单据号
                "checkRemark": this.textareaData
            }
            operateReceiptOperation(options).then((res) => {
                console.log(res)
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
                    this.getNewGoodsInfoList('1', this.pageSize);
                    this.getNewGoodsInfoList1('1', this.pageSize);
                    this.getConfigInto(); // 初始化一些配置数据
                    this.getSeekSellReceiptsIntro(); // 单据简介
                    this.receiptStatusList(); // 单据状态
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
        // ***************************************************************************************
        // 展开表格
        myCustomFn () {
            console.log()
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
            console.log(e)
            var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
            var clientHeight = e.currentTarget.clientHeight; // 元素的高度
            var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
            console.log(scrollTop)
            if (clientHeight + scrollTop >= scrollHeight) {
                // this.getNewGoodsInfoList(this.cbFun);
                //console.log("到头啦！~")
            }
        },
        showTableCol (index) {
            console.log(index)
            if (index == 1) { // 基本信息
                // for (let i = 0; i < document.getElementsByClassName('baseClass').length; i++) {
                //     document.getElementsByClassName('baseClass')[i].style.width = "0px"
                // }
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
                console.log(res)
            }, (res) => {
                console.log(res)
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
        // --------------------------------- 复制结束 -------------------------------------------
        getPitchLittleClassKey (parm) {
            this.pitchLittleClassKey = parm;
        },
        queryOptionFun (parm) {
            if (parm) {
                this.$router.push("/work/amend");
            } else {
                this.popup.isQueryOption = parm;
            }
        },
        handleSizeChange (val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            this.crudData.currentPage = val;
            //console.log(`当前页: ${val}`);
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
                    sessionStorage.setItem("琪琪琪琪IQIQIQIQ", JSON.stringify(response.data.data));
                    if (response.data.state === 200) {
                       // console.log(response)
                        this.tableRowData[index].now = response.data.data
                        // this.datas.hostList.push(this.getconfigData(response.data.data)); // 历史数据
                        // rowData.productId = response.data.data.rowDataList[i].now.productId;
                        // this.datas.newList.push(rowData);
                        let rowData = this.getconfigData(false);
                        rowData.productId = response.data.data.productId;
                        // this.datas.newList.push(rowData); // 修改数据
                        //console.log(rowData)
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
        },
        setMousemove (parm, index, e) { // 鼠表移过事件（添加背景色）
            this.operate.mousemoveStyle = [];
            Vue.set(this.operate.mousemoveStyle, index, true);
        },
        setMouseout () { // 鼠表移开
            this.operate.mousemoveStyle = [];
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
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "mainPrice": // 主石额
                    this.getComputedTotal("unitPrice", AllData, index); // 主石单价
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "unitPrice": // 主石单价
                    this.getComputedTotal("totalWeight", AllData, index); // 总件重
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "count": // 主石粒数
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("costPrice", AllData, index); // 成本
                    break;
                case "mainWeight": // 主石重
                    this.getComputedTotal("mainPrice", AllData, index); // 主石额
                    this.getComputedTotal("totalWeight", AllData, index); // 总件重
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
                case "ratio": // 倍率
                    this.getComputedTotal("soldPrice", AllData, index); // 售价
                    break;
                case "costPrice": // 成本改变了
                    this.computedRatio(index);
                    break;
                case "soldPrice": // 售价改变
                    this.getComputedTotal("ratio", AllData, index); // 倍率
                    break;
            }
        },
        getComputedTotal (littleClassKey, AllData, index) {  // 得到计算合计
            var Result = computedStorageData(littleClassKey, index, this.showData[index].newList);
            AllData[littleClassKey] = Result;
        },
        getComputedHeavyCodeNetWeight (littleClassKey, AllData, index) {
            var Result = computedStorageData(littleClassKey, index, this.showData[index].newList);
            AllData.netWeight = Result;
        },
        closeOptions () {
            this.introListOption = !this.introListOption
        },
        goPreviousPage () { // 返回上一页
            let datas = this.addAdmendFun();
            let admendList = this.extractAmendData();
            // if (datas.length > 0 || admendList.length > 0) {
            //     this.popup.isQueryOption = true;
            // } else {
                
            // }
            this.$router.push("/work/amend")
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
        getSeekSellReceiptsIntro () { // 单据简介
            let options = {
                "orderNum": this.$route.query.orderNumber
            }
            seekReceiptXGSynopsis(options).then((response) => {
                if (response.data.state === 200) {
                    if (response.data.data.makeOrderManId == sessionStorage.getItem("id")) {
                        this.isMakeMan = true
                        //console.log(this.isMakeMan)
                    } else {
                        this.isMakeMan = false
                    }
                    this.receiptsIntroList = response.data.data;
                    this.isRole = this.receiptsIntroList.isRole
                    this.isCheckOrderMan = this.receiptsIntroList.isCheckOrderMan
                    console.log(this.receiptsIntroList)
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
                console.log(response);
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        getconfigData (parm) { // 得到配置代码
            let configDatas = {};
            for (let key in this.rowConfigData) {
                if (parm) {
                    configDatas[key] = parm[key] || null
                } else {
                    configDatas[key] = null;
                }
            }
            return configDatas;
        },
        workProductDetails (parm) { // 获取商品列表
            let data = {
                "page": "1", // 当前页
                "pageSize": "1", // 每页显示数
                "objId": parm,
                "type": "5" // 操作类型 3=单据号; 5=条码号
            }
            getUpdateGoodsList(data).then((response) => { // 商品修改列表
                if (response.data.state === 200) {
                    this.datas.hostList.push(this.getconfigData(response.data.data.rowDataList[0].now)); // 历史数据
                    if (response.data.data.rowDataList[0].old) {
                        this.datas.newList.push(this.getconfigData(response.data.data.rowDataList[0].old)); // 修改数据
                    } else {
                        let rowConfigData = JSON.stringify(this.getconfigData(false));
                        let rowData = JSON.parse(rowConfigData);
                        rowData.productId = response.data.data.rowDataList[0].now.productId;
                        this.datas.newList.push(rowData);
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
            if (this.datas.newBlandDatas.length < 2) { // 如果只有一条空白数据，直接把条形码还原就可以了
                this.datas.newBlandDatas[0].hostList.barcode = null;
            } else { // 否则删除当前的
                for (var i = 0; i < this.datas.newBlandDatas.length; i++) {
                    if (this.datas.newBlandDatas[i].hostList.barcode === parm) {
                        this.datas.newBlandDatas.splice(i, 1);
                    }
                }
            }
        },
        getNewGoodsInfoList (page, pageSize) { // 修改商品列表
            let options = {
                "page": page, // 当前页
                "pageSize": pageSize, // 每页显示数
                "objId": this.$route.query.orderNumber,
                "type": "3" // 操作类型 3=单据号; 5=条码号
            }
            getUpdateGoodsList(options).then((response) => {
                if (response.data.state === 200) {
                    console.log(response)
                    this.tableRowData = response.data.data.rowDataList

                    for (let i = 0; i < response.data.data.rowDataList.length; i++) {
                        if (response.data.data.rowDataList[i].old == undefined) {
                            let rowData = JSON.stringify(this.configBlankData());
                            let newRowData = JSON.parse(rowData);
                            this.tableRowData[i].old = newRowData.hostList
                        }
                    }
                    console.log(this.tableRowData)
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                console.log(response);
            })
        },
        getNewGoodsInfoList1 (page, pageSize) {
            let options = {
                "page": page,
                "pageSize": pageSize,
                "objId": this.$route.query.orderNumber,
                "type": "3"
            }
            console.log(options)
            getUpdateGoodsList(options).then((response) => {
                console.log(response)
                // console.log(response.data.data.rowDataList[0].old)
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
            if (this.crudData.checked === true) { // 全选
                for (let i of this.datas.hostList) {
                    this.crudData.checkList.push(i.barcode);
                }
            } else {
                this.crudData.checkList = [];
            }
         },
         pageJudgeFun () { // 判断是否全选
            if (this.crudData.checkList.length === this.getGoodsInfoList.length && this.crudData.checkList.length > 0) {
                this.crudData.checked = true;
            } else {
                this.crudData.checked = false;
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
                }
            }, (response) => {
                console.log(response);
            })
        },
        productClassList () { // 获取商品大小类的下拉列表
            var _self = this;
            let requestNumber = 1;
            function cbFunction () {
                let options = {
                    type: requestNumber
                }
                seekProductClassList(options).then((response) => {
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
                                        break;
                                    case "宝石规格": // 主副石
                                        _self.configPullDownData.stand = response.data.data.list[i].childrenList;
                                        _self.configPullDownData.deputyStand = response.data.data.list[i].childrenList;
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
                          break;
                    }
                    requestNumber += 1;
                    if (requestNumber < 5) {
                        cbFunction();
                    }
                }, (response) => {
                    console.log(response)
                })
            }
             cbFunction();
        },
        productPropertyList () { // 获取商品属性下拉列表
            var _self = this;
            let requestNumber = 1;
            console.log(options)
            function cbFunction () {
                let options = {
                    type: requestNumber
                }
                seekProductPropertyList(options).then((response) => {
                    //console.log(response)
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
                    //console.log(_self.configPullDownData)
                    if (requestNumber < 5) {
                        cbFunction();
                    }
                }, (response) => {
                    console.log(response + "获取商品属性下拉列表");
                })
            }
            cbFunction();
        },
        productCertificateList () { // 证书下拉列表
            seekCertificateList().then((response) => {
                if (response.data.state === 200) {
                    this.configPullDownData.certifiName = response.data.data.list
                } else {
                    console.log(response)
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
        // getSpecialComputed (parm) { // 过滤联动的计算值
        //     var filterName = new Set(['ratio', 'soldPrice']); // 倍率，售价
        //     let getName = [parm].filter(x => filterName.has(x))
        //     return getName[0];
        // },
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
            // var getOpenName = [];
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
              console.log(data);
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
        pitchOn (parm, index, e) { // 选中样式和数据
            this.operate.selectedRow = [];
            Vue.set(this.operate.selectedRow, index, true);
            this.crudData.selectedData = parm;
            if (parm.productId) { // 如果有商品id
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
        },
        appendRow () { // 新增
            this.datas.newBlandDatas = [];
            for (var i = 0; i < this.emptyDataSize; i++) {
            }
            this.appendRowData();
        },
        appendRowData () { // 新增
            let rowData = JSON.stringify(this.configBlankData());
            let newRowData = JSON.parse(rowData);
            // console.log(newRowData)
            this.datas.newBlandDatas.push(newRowData);
            // console.log(newRowData)
            // console.log(this.tableRowData)
            let oldList = newRowData.hostList
            let newList = newRowData.newList
            newList = {
                old: oldList,
                now: newList
            }
            
            this.tableRowData.push(newList)
            this.selectTable(this.tableRowData.length-1)
            this.isREfresh = false
        },
        configBlankData () {
            let dataObject = {
                hostList: this.rowConfigData,
                newList: this.rowConfigData
            }
            return dataObject;
        },
        copyRowData () { // 复制数据
            this.popup.copys = false;
            var copyRows = [];
            if (this.crudData.selectedData <= 0) { // 如果没有选中数据
                return;
            }
            var selectedData = JSON.stringify(this.crudData.selectedData);
            for (let i = 0; i < this.popup.copyNumber; i++) {
                copyRows.push(JSON.parse(selectedData));
            }
            for (let i = 0; i < copyRows.length; i++) { // 清除条形码
                copyRows[i].barcode = null;
            }
            this.crudData.newAddData = [...this.crudData.newAddData, ...copyRows];
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
                //     if (amendingLittleClass === "goldCost") {
                //         if (Number(this.popup.amendingData) < 1) {
                //             this.showData[i].newList[amendingLittleClass] = (this.popup.amendingData * 100).toFixed(2);
                //         } else {
                //             this.showData[i].newList[amendingLittleClass] = this.popup.amendingData;
                //         }
                //     } else {
                //         this.showData[i].newList[amendingLittleClass] = this.popup.amendingData;
                //     }
                //     this.valueChangeDetection(amendingLittleClass, this.showData[i].newList, i);
                    this.tableRowData[i].old[amendingLittleClass] = this.popup.amendingData
                    this.amandTableData.push({
                        productId: this.tableRowData[i].now.productId,
                        [this.popup.amendingLittleClass]: this.tableRowData[i].old[amendingLittleClass]
                    })
                }
                
            } else {
                if (this.popup.amendingStartRow > this.popup.amendingEndRow) {
//                  this.$message({
//                    message: '起始行数不能大于结束行数',
//                    type: 'warning'
//                  });
                this.blurTitle = "起始行数不能大于结束行数";
                  return;
                }
                for (var i = this.popup.amendingStartRow - 1; i < this.popup.amendingEndRow; i++) {
                    if (amendingLittleClass === "goldCost") {
                        if (Number(this.popup.amendingData) < 1) {
                            this.tableRowData[i].old[amendingLittleClass] = (this.popup.amendingData * 100).toFixed(2);
                        } else {
                            this.tableRowData[i].old[amendingLittleClass] = this.popup.amendingData;
                        }
                    } else {
                        //this.showData[i].newList[amendingLittleClass] = this.popup.amendingData;
                        this.tableRowData[i].old[amendingLittleClass] = this.popup.amendingData;

                        this.amandTableData.push({
                            productId: this.tableRowData[i].now.productId,
                            [this.popup.amendingLittleClass]: this.tableRowData[i].old[amendingLittleClass]
                        })
                    }
                    console.log(this.amandTableData)
                    // this.valueChangeDetection(amendingLittleClass, this.showData[i].newList, i);
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
            if (this.crudData.checkList.length > 0) {
                var productIdList = [];
                for (let i of this.crudData.checkList) {
                    var objData = {
                        "barcode": i
                    }
                    productIdList.push(objData)
                }
                let options = {
                    "orderNum": this.$route.query.orderNumber,
                    "productList": productIdList,
                    "operate": "2"
                }
                operateProductList(options).then((response) => {
                    if (response.data.state === 200) {
                        this.getNewGoodsInfoList(this.crudData.currentPage, '10');
                        this.crudData.operationCut = true;
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }, (response) => {
                    console.log(response);
                })
            }
        },
        extractAmendData () {
            let initialValue = this.aloneAmendingData.initialValue;
            let changeValue = this.aloneAmendingData.changeValue;
            let admendList = [];
            for (let i = 0; i < initialValue.length; i++) {
                var admendObj = {};
                for (let initialKey in initialValue[i]) {
                    if (initialValue[i][initialKey] !== changeValue[i][initialKey]) {
                        admendObj[initialKey] = changeValue[i][initialKey];
                        if (changeValue[i].productId && !admendObj.productId) { // 添加个商品id
                            admendObj.productId = changeValue[i].productId;
                        }
                    }
                }
                admendList.push(admendObj);
            }
            return admendList;
        },
        addSingleAll () { // 保存（单个添加/批量添加）
            this.tableIndex = ''
            this.isREfresh = true
            // if (this.aloneAmendingData.initialValue.length > 0) { // 如果有变化，就调用修改
            //     this.popup.fullscreenLoading = true;
            //     let productListOrId = productOrId(this.aloneAmendingData.initialValue, this.aloneAmendingData.changeValue)
            //     this.admendFun(productListOrId);
            // }
            if (this.tableInitRowData.length !== this.tableRowData.length) {
                for (let j = this.tableRowData.length - 1; j > this.tableInitRowData.length - 1; j--) {
                    this.newAddtableData.push(this.tableRowData[j].old)
                }
            }
            if (this.newAddtableData.length > 0) {
                this.brandNewAdd()
            }
            if (this.amandTableData.length > 0 && this.tableInitRowData.length == this.tableRowData.length){
                // for (let i = 0; i < this.amandTableData.length; i++) {
                //     this.amandTableData[i].barcode = 'null'
                // }
                this.admendFun()
            }
        },
        admendFun (admendList) { // 修改商品列表
            let data = {
                "orderNum": this.$route.query.orderNumber,
                "confirmType": 1, // 1=保存，2=提交审核，3=审核通过，4=取消审核
                "checkRemark": "", // 审核备注
                "applyRemark": this.orderRemark, // 提交备注
                "auditorId": "", // 审核人ID; 当confirmType=2时必输
                "alterList": this.amandTableData // 当confirmType=1是必输
            }
            console.log(data)
            updateGoods(data).then((response) => {
                if (response.data.state === 200) {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.getNewGoodsInfoList('1', this.pageSize);
                    this.getNewGoodsInfoList1('1', this.pageSize);
                    this.amandTableData = []
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
                // this.popup.fullscreenLoading = false;
            }, (response) => {
                console.log(response);
            })
        },
        addAdmendFun () { // 看空白数据有没有改变
            let datas = [];
            for (let i = 0; i < this.datas.newBlandDatas.length; i++) {
                for (let j in this.datas.newBlandDatas[i].newList) {
                    if (this.datas.newBlandDatas[i].newList[j] !== this.rowConfigData[j]) {
                        datas.push(this.datas.newBlandDatas[i].newList)
                    }
                }
            }
            console.log("新增空白数据");
            console.log([...new Set(datas)]);
            return [...new Set(datas)];
        },
        brandNewAdd (datas) { // 全新添加
            let options = {
                "orderNum": this.$route.query.orderNumber,
                "rowDataList": this.newAddtableData // 新增数据集合
            }
            operateAddProductToRKOrder(options).then((response) => {
                console.log(response)
                if (response.data.state === 200) {
                    // this.popup.fullscreenLoading = false;
                    // this.crudData.newAddData = [];
                    this.getNewGoodsInfoList('1', this.pageSize);
                    this.newAddtableData = []
                } else {
                    this.popup.fullscreenLoading = false;
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
        //预览模板
        printTemplate () {
            Vue.nextTick(() => {
                this.$refs.lodop.multipagePrint()
            })
        },
        reportsPrintRK () { // 获取单据打印数据
            let options = {
                orderNum: this.$route.query.orderNumber,
                reportType: 3
            }
            //console.log(options)
            seekGetStorageData(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.dataGridStorage = res.data.data
                }
            }, (res) => {
                console.log(res)
            })
        },
        previewTemplate (canvas, selectedProducts, isPrint) {
            // var LODOP = getLodop()
            this.print.canvas = canvas
            // let self = this
            if (selectedProducts.length) {
                this.$store.dispatch('getPrintLabelData', {
                    productList: selectedProducts.map(selectedProduct => {
                        return {
                            productId: selectedProduct
                        }
                    })
                }).then(json => {
                    if (json.state == 200) {
                        console.log(json.data);
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
    }
}
</script>
<style src="./../../../assets/css/_tableStorage.scss" lang="scss"></style>
<style>
.el-select-dropdown__empty {
    display: none;
}
</style>
<style lang="scss" scoped>
.new-storage {
    height: 820px;
    margin-top: 80px;
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
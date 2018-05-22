<template>
	<transition name="tp-ani">
		<div class="main-wrap" style="width: 1670px;" @click="closeOptions" @keyup.113.prevent="watchKeyBord(113)" @keyup.115.prevent="watchKeyBord(115)">
			<div class="body-box-left" style="width: 1670px;">
				<div class="new-table-wrap">
					<div class="new-table-template">
						<section class="body-box" ref="body_box">
							<div class="body-header skin-shield" ref="body_header">
								<ul class="header-nav">
									<li @click="goPreviousPage"><i style="font-size: 20px; margin-right: 10px;" class="iconfont icon-xiaoshou"></i>销售<span>&nbsp;&nbsp;</span></li>
									<li class="on">单据详情</li>
								</ul>

								<div class="back-btn" @click="goPreviousPage">返回上一级</div>
								<div class="member-btn">
									<!-- <span  >添加会员</span> -->
									<div @click="seekMem()" v-show="shopRoleAnMakeOrder" v-if="receiptsIntroList.memberId == '' || receiptsIntroList.memberId == null" class="member-info1">
										<div class="info-wrap">
											<img src="./../../../../static/img/member/default.png" />
											<div class="name">会员名</div>
											<div class="phone">联系方式</div>
										</div>
										<div class="bg">
											<div class="mask"></div>
										</div>
									</div>
									<div v-else class="member-info">
										<div class="info-wrap" @click="editLeaguer = true">
											<img :src="memberDataInfo.logo" />
											<div class="name">{{memberDataInfo.memberName}}</div>
											<div class="phone">{{memberDataInfo.phone}}</div>
										</div>
										<div class="bg">
											<div class="mask"></div>
										</div>
										<div class="drop-block" v-if="isMakeMan || shopManageRole ">
											<div class="btn replace" @click="isChoseMember = true">更换会员</div>
											<div class="btn delete" @click="deleteMember">删除关联</div>
										</div>
									</div>
								</div>
							</div>

							<div class="body-row2" :data-status="curStatus.statusName" :class="{'color1': nowStatus == 1, 'color2': nowStatus == 2,
                        'color3': nowStatus == 3, 'color4': nowStatus == 4, 'color5': nowStatus == 5, 'color6': nowStatus == 6,
                        'color7': nowStatus == 7, 'color8': nowStatus == 8}">
								<div class="mask"></div>
								<div class="statusInfo">
									<div class="left-main">
										<h5>{{receiptsIntroList.orderNum}}</h5>
										<div class="select-container">
											<div class="item supplier">
												<span mysellspanstyle v-if="curStatus.status > 1" v-text="receiptsIntroList.shopName"></span>
												<div class="item-name">店铺</div>
											</div>
											<div class="item shop">
												<!-- 注： orderData.shopName 店铺名需要另外一个接口去拿  5.38 单据简介  表尾组件已经做了接口调用，直接传过来即可 -->
												<select-drop class="selected_dropdown" :titleName="receiptsIntroList.sellManName" dataType="销售人1" v-if="filterUserType" :propList="shopUserList" :isDrop="true" @dropReturn="dropReturn">
												</select-drop>
												<span v-else>
                                                    {{receiptsIntroList.sellManName}}
                                                </span>
												<div class="item-name" style="margin-left: 8px;">销售员</div>
											</div>
										</div>
									</div>
									<div class="right-main">
										<div class="right-main-first">
											<div class="right-main-item">
												<div class="item-title">
													{{receiptsIntroList.totalNum == '' || receiptsIntroList.totalNum == null ? 0 : receiptsIntroList.totalNum}}
													<span>件</span>
												</div>
												<div class="item-type">件数</div>
											</div>
											<div class="right-main-item">
												<div class="item-title">
													{{(Number(receiptsIntroList.totalWeight) || 0).toFixed(3)}}
													<span>g</span>
												</div>
												<div class="item-type">件重</div>
											</div>
											<div class="right-main-item">
												<div class="item-title">
													{{(Number(receiptsIntroList.price) || 0).toFixed(2)}}
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

									<ul class="bottom-bar">
										<li>
											<span>销售</span>
											<span>{{receiptsIntroList.saleNum || 0}}<i>件,</i></span>
											<span>{{(Number(receiptsIntroList.saleWeight) || 0).toFixed(3)}}<i>g,</i></span>
											<span>{{(Number(receiptsIntroList.salePrice) || 0).toFixed(2)}}<i>元</i></span>
										</li>
										<li v-if="receiptsIntroList.exchangeNum != ''">
											<span>退换</span>
											<span>{{receiptsIntroList.exchangeNum || 0}}<i>件,</i></span>
											<span>{{(Number(receiptsIntroList.exchangeWeight) || 0).toFixed(3)}}<i>g,</i></span>
											<span>{{(Number(receiptsIntroList.exchangePrice) || 0).toFixed(2)}}<i>元</i></span>
										</li>
										<li v-if="receiptsIntroList.recycleNum != ''">
											<span>回收</span>
											<span>{{receiptsIntroList.recycleNum || 0}}<i>件,</i></span>
											<span>{{(Number(receiptsIntroList.recycleWeight) || 0).toFixed(3)}}<i>g,</i></span>
											<span>{{(Number(receiptsIntroList.recyclePrice) || 0).toFixed(2)}}<i>元</i></span>
										</li>
									</ul>

									<div class="line"></div>
								</div>
								<div class="cashierInfo">
									<div class="cash-tittle">
										<span class="cashier">收银员:{{stepIndex == 1 ? '' : receiptsIntroList.cashUserName}}</span>
										<span class="time">{{cashierTime}}</span>
									</div>
									<div class="cash-content">
										<div>
											<div class="title-info" v-if="priceType.cash == 0 && priceType.card == 0 && priceType.other == 0 && priceType.wechat == 0 && priceType.alipay == 0">
												<p v-if="isJrole">
													暂无收银信息,快去收银吧~
												</p>
												<p v-else>
													暂无收银信息，快去<span style="cursor: pointer;color: #2993f8;" @click="collectMoney">收银</span>吧~
												</p>	
											</div>
											<div v-else>
												<div class="cash-item" v-if="priceType.cash != 0.00">
													<div class="item-main">
														<img src="./../../../../static/img/cash.png">
													</div>
													<div class="item-main">
														<div>{{priceType.cash}}<span>元</span></div>
														<span>现金</span>
													</div>
												</div>
												<div class="cash-item" v-if="priceType.card!=0.00">
													<div class="item-main">
														<img src="./../../../../static/img/swiping-card.png">
													</div>
													<div class="item-main">
														<div>{{priceType.card}}<span>元</span></div>
														<span>刷卡</span>
													</div>
												</div>
												<div class="cash-item" v-if="priceType.other!=0.00">
													<div class="item-main">
														<img src="./../../../../static/img/other.png">
													</div>
													<div class="item-main">
														<div>{{priceType.other}}<span>元</span></div>
														<span>其他</span>
													</div>
												</div>
												<div class="cash-item" v-if="priceType.wechat!=0.00">
													<div class="item-main">
														<img src="./../../../../static/img/WeChat.png">
													</div>
													<div class="item-main">
														<div>{{priceType.wechat}}<span>元</span></div>
														<span>微信</span>
													</div>
												</div>
												<div class="cash-item" v-if="priceType.alipay!=0.00">
													<div class="item-main">
														<img src="./../../../../static/img/alipay.png">
													</div>
													<div class="item-main">
														<div>{{priceType.alipay}}<span>元</span></div>
														<span>支付宝</span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="cash-footer">
										<span class="total">合计<i>{{priceType.totalPrice}}<em>元</em></i></span>
										<span class="change">找零<i>{{priceType.change}}<em>元</em></i></span>
									</div>
								</div>

								<!-- 步骤条 -->
								<steps-path :isRemark="isRemark" :orderNum="$route.query.orderNumber" :statusREfresh="statusREfresh" @setStatus="getStatus">
								</steps-path>
								<!--备注-->
								<order-remark :refreshRemark="refreshRemark" :remarkDialog="remarkDialog" :orderNum="$route.query.orderNumber" :orderData="receiptsIntroList" @updateRemark="updateRemark"></order-remark>
							</div>
							<div class="body-row4">
								<div class="row4-tittle">
									<div class="tittle-left">商品</div>
									<div class="tittle-right">
										<span>详情说明</span>
										<input ref="detailInputWrap" v-if="nowStatus != 6 || nowStatus != 7" v-model="barCode" v-focus="isFocus" type="text" placeholder="输入/扫描条码号" @click="closeTooltip" @keyup.enter="addNewGoodOperate">
										<span class="tooltip" v-if="isShowTooltip">输入/扫描条码号</span>

									</div>
								</div>
								<div class="row4-data-main">
									<div class="no-data" v-if="goodsTypeList.saleList.length == 0 && goodsTypeList.exchangeList.length == 0 && goodsTypeList.recycleList == 0">
										<div class="no-data-wrap">
											<img src="./../../../../static/img/no-data.png" />
											<div class="btn-wrap">
												<div class="sell btn" v-if="nowStatus != 6 && shopRole && receiptsIntroList.cashStatus == 2 || multipleIdentities == 'Y' && receiptsIntroList.cashStatus == 2" @click="selOperateType(1)">销售</div>
												<div class="reSell btn" v-if="nowStatus != 6 && companyPosition == 4 && receiptsIntroList.cashStatus == 2|| nowStatus != 6 && companyPosition == 5 && receiptsIntroList.cashStatus == 2 || multipleIdentities == 'Y' && receiptsIntroList.cashStatus == 2" @click="selOperateType(2)">回购</div>
											</div>
										</div>
									</div>
									<div class="row4-main-wrap" v-else>

										<sell-detail-list :item="item" @messageBack="messageBack" @setBounding="setBounding" @remarkOut="remarkOut" :shopRole="shopRole" :goodType="1" :mantissa="receiptsIntroList.mantissa" :orderNum="$route.query.orderNumber" :orderManId="receiptsIntroList.makeOrderManId" :status="receiptsIntroList.cashStatus" v-for="(item, index) in goodsTypeList.saleList" :key="index">
										</sell-detail-list>

										<sell-detail-list v-for="(item, index) in goodsTypeList.exchangeList" @messageBack="messageBack" @setBounding="setBounding" @remarkOut="remarkOut" :item="item" :goodType="2" :shopRole="shopRole" :mantissa="receiptsIntroList.mantissa" :orderNum="$route.query.orderNumber" :orderManId="receiptsIntroList.makeOrderManId" :status="receiptsIntroList.cashStatus" :key="index">
										</sell-detail-list>

										<sell-detail-list :item="item" @messageBack="messageBack" @setBounding="setBounding" @remarkOut="remarkOut" :goodType="3" :shopRole="shopRole" :mantissa="receiptsIntroList.mantissa" :orderNum="$route.query.orderNumber" :orderManId="receiptsIntroList.makeOrderManId" :status="receiptsIntroList.cashStatus" v-for="(item, index) in goodsTypeList.recycleList" :key="index">
										</sell-detail-list>

									</div>

								</div>
								<div class="btn-list">
									<div class="btn" v-if="nowStatus != 6 && shopRole && receiptsIntroList.cashStatus == 2 || multipleIdentities == 'Y' && receiptsIntroList.cashStatus == 2" @click="selOperateType(1)">
										<span class="iconfont icon-xiaoshou1"></span>
										<span>销售</span>
									</div>
									<div class="btn" v-if="nowStatus != 6 && companyPosition == 4 && receiptsIntroList.cashStatus == 2|| nowStatus != 6 && companyPosition == 5 && receiptsIntroList.cashStatus == 2 || multipleIdentities == 'Y' && receiptsIntroList.cashStatus == 2" @click="selOperateType(2)">
										<span class="iconfont icon-huigou"></span>
										<span>回购</span>
									</div>
									<div class="btn" v-if="shopRole" @click="collectMoney">
										<span class="iconfont icon-shouyindadan"></span>
										<span>收银打单</span>
									</div>
									<div class="btn" @click="exportTab()">
										<span class="iconfont icon-daochu"></span>
										<span>导出表格</span>
									</div>
									<div class="btn" @click="tabPrin()">
										<span class="iconfont icon-dayin"></span>
										<span>打印单据</span>
									</div>
									<div class="btn" @click="remarkDialog = true">
										<span class="iconfont icon-beizhu"></span>
										<span>备注</span>
									</div>
									<div class="btn" @click="delOrder" v-if="isMakeMan && receiptsIntroList.cashStatus == 2 || companyPosition == '4' && receiptsIntroList.cashStatus == 2">
										<span class="iconfont icon-shanchu1"></span>
										<span>删除</span>
									</div>
								</div>
							</div>
							<el-dialog :visible.sync="cashierDialog" customClass="cashierDia">
								<div slot="title" class="title">收银打单</div>
								<div class="cashier-body">
									<div class="cashier-info">
										<div class="info-left">
											<div class="money-box">{{totalPrice}}<span>元</span></div>
											<span>应收银</span>
										</div>
										<div class="info-right">
											<div class="money-box">{{priceType.change}}<span>元</span></div>
											<span>{{cashiertext}}</span>
										</div>
									</div>
									<div class="cashier-main">
										<div class="cashier-block">
											<div class="block-main">
												<img src="./../../../../static/img/swiping-card.png">
												<div class="input-main">
													<input type="text" v-model="priceType.card" @blur="emptyVal(1)" @keyup="computePrice(4, $event)" @focus="focusEvent(4)" @keyup.enter="complate">
												</div>
											</div>
											<div class="name">
												刷卡
											</div>
										</div>
										<div class="cashier-block">
											<div class="block-main">
												<img src="./../../../../static/img/WeChat.png">
												<div class="input-main">
													<input type="text" v-model="priceType.wechat" @blur="emptyVal(2)" @keyup="computePrice(2, $event)" @focus="focusEvent(2)" @keyup.enter="complate">
												</div>
											</div>
											<div class="name">
												微信
											</div>
										</div>
										<div class="cashier-block">
											<div class="block-main">
												<img src="./../../../../static/img/alipay.png">
												<div class="input-main">
													<input type="text" v-model="priceType.alipay" @blur="emptyVal(3)" @keyup="computePrice(5, $event)" @focus="focusEvent(5)" @keyup.enter="complate">
												</div>
											</div>
											<div class="name">
												支付宝
											</div>
										</div>
										<div class="cashier-block">
											<div class="block-main">
												<img src="./../../../../static/img/cash.png">
												<div class="input-main">
													<input type="text" v-model="priceType.cash" @blur="emptyVal(4)" @keyup="computePrice(1, $event)" @focus="focusEvent(1)" @keyup.enter="complate">
												</div>
											</div>
											<div class="name">
												现金
											</div>
										</div>
										<div class="cashier-block">
											<div class="block-main">
												<img src="./../../../../static/img/other.png">
												<div class="input-main">
													<input type="text" v-model="priceType.other" @blur="emptyVal(5)" @keyup="computePrice(3, $event)" @focus="focusEvent(3)" @keyup.enter="complate">
												</div>
											</div>
											<div class="name">
												其他
											</div>
										</div>
									</div>
									<div class="cashier-footer">

										<div class="revoke-btn" v-if="shopManageRole" v-show="nowStatus != 6 && receiptsIntroList.cashStatus != 2" @click="revokeOrderPay">撤销收银</div>
										<div class="btn" @click="operateCashierAct" :disabled="true" :class="{active: !(isPrintOnly||(isCashierOnly&&(receiptsIntroList.cashStatus==2)&&(mathAdd(priceType.card, priceType.cash, priceType.alipay, priceType.wechat, priceType.other)>=totalPrice)))}">确定</div>
										<el-select class="template-selector" :disabled="isPrintOnly == false" v-model="templateId" :placeholder="placeText" style="float:right">
											<el-option :label="qualityTemplate.templateName" :value="qualityTemplate.templateId" v-for="(qualityTemplate,index) in qualityTemplateList" :key="index">
											</el-option>
										</el-select>
										<div class="check-wrap">
											<el-checkbox v-if="receiptsIntroList.cashStatus == 2" v-model="isCashierOnly" label="收银"></el-checkbox>
											<el-checkbox v-model="isPrintOnly" :disabled="disabled" label="打印"></el-checkbox>

										</div>

									</div>
								</div>
							</el-dialog>
						</section>
					</div>
					<transition name="mask-fade">
						<div class="page-wrap" v-show="isMaskShow" @click="isMaskShow = false, isShowTooltip = false"></div>
					</transition>
					<div>
						<!-- ***** 弹窗 ***** -->
						<!-- 手工录入 -->
						<el-dialog :visible.sync="isShowDio" custom-class="dialogDom" element-loading-text="拼命加载中">

							<typeOne v-if="isShowBox1" @dropdownEvents="dropdownEvents"></typeOne>

							<!--  商品属性  -->
							<div class="block-class block-0" v-if="tep == 1">
								<div class="dia-title" slot="title">
									<img src="./../../../../static/img/piliang.png">
									<h3>选择商品属性</h3>
								</div>
								<div class="list-wrap first-wrap">
									<div class="btn-wrap">
										<i @click="attribute(1)" v-if="operateTypeNum != 2 && selWay == 1">成品</i>
										<i @click="attribute(2)">旧料</i>
									</div>
								</div>
								<div class="footer">
								</div>
							</div>
							<!--  产品类别  -->
							<div class="block-class block-1" v-if="tep == 2">
								<div class="dia-title" slot="title">
									<img src="./../../../../static/img/piliang.png">
									<h3>选择产品类别</h3>
								</div>
								<div class="list-wrap">
									<ul class="left-list">
										<li :class="{active: entry.tep1List.productStep == index + 1}" v-for="(item, index) in entry.tep1List.prodictName" :key="index" @click="selBigClass(item)"><span class="active-block"></span>{{item}}</li>
									</ul>
									<ul class="right-list">
										<li :class="{active: entry.tep1List.rightClassId == item.classesId}" v-for="(item, index) in entry.tep1List.rightClassList" :key="index " @click="selBigClassId(item.classesId, 1)">{{item.classesName}}</li>
									</ul>
								</div>
								<div class="footer">
									<div class="footer-right">
										<span @click.stop="goPro" v-if="entry.tep1List.isShowBtn">上一步</span>
										<span @click.stop="goNext" v-if="entry.tep1List.isShowBtn1">下一步</span>
									</div>
								</div>
							</div>
							<!--  成色大类 -->
							<div class="block-class block-2" v-if="tep == 3">
								<div class="dia-title" slot="title">
									<img src="./../../../../static/img/piliang.png">
									<h3>选择成色名称</h3>
								</div>
								<div class="list-wrap">
									<ul class="left-list">
										<li :class="{active: entry.tep2List.leftClassId == item.classesId}" v-for="(item, index) in entry.tep2List.classesList" :key="index" @click="selProductClass(item)"><span class="active-block"></span>{{item.classesName}}</li>
									</ul>
									<ul class="right-list">
										<li v-for="(item, index) in entry.tep2List.rightClassList" :key="index" @click="selBigClassId(item.classesId, 2)">{{item.classesName}}</li>
									</ul>
								</div>
								<div class="footer">
									
									<div class="footer-left">
										<span @click.stop="goPro" v-if="entry.tep2List.isShowBtn">上一步</span>
										<span @click.stop="goNext" v-if="entry.tep2List.isShowBtn1">下一步</span>
									</div>

									<div class="footer-right" @click.stop="goNext" v-if="isSkip == false">
										跳过
									</div>
									
								</div>
							</div>
							<!--  珠宝名称 -->
							<div class="block-class block-3" v-if="tep == 4">
								<div class="dia-title" slot="title">
									<img src="./../../../../static/img/piliang.png">
									<h3>选择宝石名称</h3>
								</div>
								<div class="list-wrap">
									<ul class="left-list">
										<li :class="{active: entry.tep3List.leftClassId == item.classesId}" v-for="(item, index) in entry.tep3List.classesList" :key="index" @click="selProductClass1(item)"><span class="active-block"></span>{{item.classesName}}</li>
									</ul>
									<ul class="right-list">
										<li v-for="(item, index) in entry.tep3List.rightClassList" :key="index" @click="selBigClassId(item.classesId, 3)">{{item.classesName}}</li>
									</ul>
								</div>
								<div class="footer">
									<div class="footer-left" @click.stop="goNext" v-if="isSkip == false">
										跳过
									</div>
									<div class="footer-right">
										<span @click.stop="goPro" v-if="entry.tep3List.isShowBtn">上一步</span>
										<span @click.stop="goNext" v-if="entry.tep3List.isShowBtn1">下一步</span>
									</div>
								</div>
							</div>
							<!--  首饰名称 -->
							<div class="block-class block-4" v-show="tep === 5" v-loading="isLoading">
								<div class="dia-title" slot="title">
									<img src="./../../../../static/img/piliang.png">
									<h3>选择首饰名称</h3>
								</div>
								<div class="list-wrap">
									<ul class="left-list">
										<li :class="{active: entry.tep4List.leftClassId == item.classesId}" v-for="(item, index) in entry.tep4List.classesList" :key="index" @click="selProductClass2(item)"><span class="active-block"></span>{{item.classesName}}</li>
									</ul>
									<ul class="right-list">
										<li v-for="(item, index) in entry.tep4List.rightClassList" :key="index" @click="selBigClassId(item.classesId, 4)">{{item.classesName}}</li>
									</ul>
								</div>
								<div class="footer">
									<div class="footer-right">
										<span @click.stop="goPro">上一步</span>
									</div>
								</div>
							</div>
						</el-dialog>
						<!-- 收钱 -->
						<div v-if="popup.incomeMoneyPopup">
							<income-money v-on:closeIncomeMoney="isIncomeMoney" :v-if='popup.incomeMoneyPopup' :incomeMoneyPopup='popup.incomeMoneyPopup' :orderNumber='orderNumber' @openQualityTemplateSelectorDialog='openQualityTemplateSelectorDialog'></income-money>
						</div>
						<QualityTemplateSelectorDialog ref="qualityTemplateSelectorDialog" :orderNum="orderNumber" @printOrder="printOrder"></QualityTemplateSelectorDialog>
						<!-- 删除单据 -->
						<delect-receipts v-on:delectReceiptsState="delectReceiptsState" :delPopup='popup.deleteReceipts' :receiptsOrderNum='popup.receiptsOrderNum'></delect-receipts>
						<!-- 审核弹窗 -->
						<audit-receipts v-on:delectReceiptsState="delectReceiptsState" :auditPopup='popup.auditPopup' :receiptsOrderNum='receiptsIntroList.orderNum' :auditsReceiptsForm='receiptsIntroList.checkType'></audit-receipts>
						<!-- 批量添加 -->
						<BatchAddReceipts v-if="popup.batchAddReceiptsPopup" :isPopup="popup.batchAddReceiptsPopup" :supplierListData="supplierListData1" v-on:addReceiptsState="delectReceiptsState">
						</BatchAddReceipts>
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
						<!-- 选择会员 -->
						<el-dialog :visible.sync="isChoseMember" customClass="choseMemberDig">
							<SellChoseMember :sellChoseMemberId="memberDataInfo.phone" :shopId="receiptsIntroList.shopId" :isChoseMember="isChoseMember" @closeChoMember="closeChoMember"></SellChoseMember>
						</el-dialog>
						<!-- 新增会员 -->
						<addLeaguerDia v-if="addLeaguer" :addLeaguer="addLeaguer" :shopId="receiptsIntroList.shopId" :shopManageRole="shopManageRole" :shopManRole="shopManRole" :orderNum="receiptsIntroList.id" :memberId="receiptsIntroList.memberId" @closeReturn="closeReturn">
						</addLeaguerDia>
						<!-- 编辑弹窗 -->
						<editLeaguerDia v-if="editLeaguer" :editLeaguer="editLeaguer" :shopId="receiptsIntroList.shopId" :shopManageRole="shopManageRole" :memberId="receiptsIntroList.memberId" :orderNum="receiptsIntroList.id" @closeReturn="closeEditReturn"></editLeaguerDia>
						<el-dialog v-if="isSeekMember" :visible.sync="isSeekMember" customClass="SeekMember">
							<div class="wrap">
								<div class="title">
									<img src="./../../../../static/img/member/member.png" />
									<div class="name">会员</div>
								</div>
								<div class="main">
									<input v-focus="isSeekMember" v-model="memberNumber" placeholder="已是会员，输入手机号/会员编号" type="text">
									<div @click="memberSalesList" class="confirm-btn">
										确定
									</div>
									<p @click="createMember">创建新会员>></p>
								</div>
							</div>
						</el-dialog>
					</div>
					<!--打印模块-->
					<div ref="tablePrint" v-if="isPrint==1">
						<table-print :tabSwitch="tabSwitch" :reportType="getReportType()" :orderData="receiptsIntroList" :printSelectDate="printSelectDate" :receiptsIntroList="receiptsIntroList" :dataGridStorage="dataGridStorage">
						</table-print>
					</div>
				</div>
			</div>
			<!--质保单打印-->
			<div id="windowPrintView" v-if="isPreview" ref="windowPrintView">
				<TemplatePreviewCanvasComponent :isPrintCanvas="true" :canvas="canvas" :templateData="templateData" :class="i%2==0 ? 'printViewInside' : ''" v-for="(i,index) in pageNumber" :key="index" :page="i">
				</TemplatePreviewCanvasComponent>
			</div>

			<!-- 新需求-新增销售加判断 -->
			<changeType ref="changeTypeWrap" @updateData="updateData"></changeType>

			<!-- 新需求-备注 -->
			<remarkTit ref="remarkTitWrap" :boundingData="boundingData"></remarkTit>
			
			<!--打印模块-->
			<div style="display: none;">
				<sell-template title="销售" ref="sellTemplate" :sellList="dataGridStorage" :headerData="receiptsIntroList"></sell-template>
				<warranty-template :template="warrantyTemplate.template" :dataList="warrantyTemplate.dataList"></warranty-template>
			</div>
			
		</div>
	</transition>
</template>
<script>
	import Vue from 'vue'
	import {
		Dialog,
		Select,
		Option,
		Button
	} from 'element-ui'
	import find from 'lodash/find'
	import { mapActions, mapGetters } from 'vuex'
	import changeType from './base/changeType'
	import typeOne from './base/typeOne'
	import remarkTit from './base/remarkTit'
	import storageReturnReceiptsIntro from '../../../components/work/StorageReturnReceiptsIntro.vue'
	import receiptsRemark from '../../../components/work/ReceiptsRemark.vue'
	import { productTpyeState, receiptOptionsName, productDetailStatus } from './../../../Api/commonality/status'
	import { seekSellReceiptsIntro, seekReceiptStatusList, seekGetShopUserList, seekGoodsList, seekSellProductList, seekSellcollectMoney, getProductTypeList, seekProductClassList, seekGetMemberInfo, seekGetUserInfo, seekOneProductStatus } from './../../../Api/commonality/seek'
	import { seekTransferStorageData, operateProductList, operateReceiptOperation, operateRemarkOperation, operateDeleteByOrderNumber, operateHandleXGReceipt, operateAddProductToOrder, operateAddBackProductToOrder, operateAddBackBuyProductToOrder, operateOrderPay, seekSellData, operateMemberSalesList } from './../../../Api/commonality/operate'
	import error from "./../CommonalityComponent/popupTemplate/error"
	import affirm from "./../CommonalityComponent/popupTemplate/affirm"

	import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
	import BatchAddReceipts from '../../../components/work/BatchAddReceipts'
	import delectReceipts from './../../Work/CommonalityComponent/popupTemplate/DelectReceipts'

	import incomeMoney from './components/IncomeMoney.vue'
	import QualityTemplateSelectorDialog from './components/QualityTemplateSelectorDialog'
	import printAPI from './../../../Api/print'
	import TemplatePreviewCanvasComponent from 'components/template/TemplatePreviewCanvas'
	import * as jurisdictions from './../../../Api/commonality/jurisdiction'

	import SellDetailList from './components/SellDetailList.vue'
	import stepsPath from './components/stepsPath'
	import orderRemark from './components/orderRemark'
	import selectDrop from './components/dropDownMenu'

	import addLeaguerDia from './../../Leaguer/components/addLeaguerDig'
	import editLeaguerDia from './../../Leaguer/components/editLeaguerDig'
	import SellChoseMember from './../../Leaguer/components/sellChoseMember'

	import FormatImg from 'components/template/DefaultHeadFormat.vue'

	//打印模块
	import TablePrint from './components/print/dataGridPrint'

	// 导出表格
	import {downLoaderFile} from 'Api/downLoaderFile'
	
	Vue.use(Dialog)
	Vue.use(Select)
	Vue.use(Option)
	Vue.use(Button)

	import sellTemplate from "@/components/jcp-print/bill/sell/template";
	import warrantyTemplate from "@/components/jcp-print/warranty/template";
	export default {
		components: {
			storageReturnReceiptsIntro,
			receiptsRemark,
			error,
			affirm,
			auditReceipts,
			delectReceipts,
			BatchAddReceipts,
			SellDetailList,
			incomeMoney,
			QualityTemplateSelectorDialog,
			TemplatePreviewCanvasComponent,
			TablePrint,
			stepsPath,
			orderRemark,
			selectDrop,
			addLeaguerDia,
			editLeaguerDia,
			SellChoseMember,
			FormatImg,
			changeType,
			typeOne,
			remarkTit,
			sellTemplate,
			warrantyTemplate,
		},
		directives: {
			focus: {
				// 指令的定义
				inserted: function() {
					el.focus()
				}
			}
		},
		data() {
			return {
				warrantyTemplate:{template:{},dataList:{}},
				isDisabled: true,
				remarkDialog: false,
				placeText: '请选择',
				disabled: false,
				cashiertext: '找零',
				cashierDialog: false, // 收银弹窗
				cashierTime: '', // 收银时间
				isShowBox1: true,
				isMaskShow: false,
				isShowWay: true,
				isShowBox: true, // 选择录入方式的弹窗
				isShowTooltip: false,
				isBlank: false,
				isShowFooter: false,
				titleText: '提示：结算之前，需要先进行收银，请先收银',
				cashierInfo: {
					receivable: 0.00, // 应收
					cash: 0.00, // 现金
					weChat: 0.00, // 微信
					other: 0.00, // 其他
					card: 0.00, // 刷卡
					alipay: 0.00, // 支付宝
					change: 0.00 // 找零
				},
				tep: 1,
				operateTypeNum: '',
				tabShow: 'tabShow',
				loading: false,
				dataGridStorage: {},
				dataGridDetailList: [],
				entry: {
					tep0List: { // 商品属性
						isShowBtn: false
					},
					tep1List: { // 产品类别
						productList: [],
						prodictName: ['计重类', '计件类'],
						rightClassList: [],
						productStep: '1',
						rightClassId: '',
						isShowBtn: false, // 上一步
						isShowBtn1: false // 下一步
					},
					tep2List: { // 成色大类
						classesList: [],
						rightClassList: [],
						leftClassId: '',
						rightClassId: '',
						isShowBtn: false,
						isShowBtn1: false
					},
					tep3List: { // 珠宝名称
						classesList: [],
						rightClassList: [],
						leftClassId: '',
						rightClassId: '',
						isShowBtn: false,
						isShowBtn1: false
					},
					tep4List: { // 首饰名称
						classesList: [],
						rightClassList: [],
						leftClassId: '',
						rightClassId: '',
						isShowBtn: false,
						isShowBtn1: false
					},
					tep5List: {
						classesList: [],
						rightClassList: [],
						leftClassId: '',
						rightClassId: '',
						isShowBtn: false,
						isShowBtn1: false
					}
				},
				isFocus: false, // 默认获取焦点
				attributeType: '', // 商品属性
				calcMethod: '', // 计价方式
				isShowDio: false,
				"orderNumber": this.$route.query.orderNumber || "",
				receiptInfoList: '',
				"receiptsIntroList": {}, // 单据简介
				"introListOption": false, // 关闭单据简介的编辑
				"supplierListData1": [{
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
				toRouterUrlName: '调库',
				//大、小类 tab切换
				tabData: [{
						txt: '明细',
						fun: this.tabs,
						type: 3
					},
					{
						txt: '成色大类',
						fun: this.tabs,
						type: 1
					},
					{
						txt: '成色小类',
						fun: this.tabs,
						type: 2
					}
				],
				tabClassActive: {
					index: 0,
					activeClass: 'active'
				},
				//
				propOptons: {
					beginTime: '',
					endTime: '',
					storageId: '', //入库ID
					productTypeId: '', //产品类别ID
					supplierId: '', //供应商ID
					shopId: '', //分销商ID
					makeUserID: '', //制单人ID
					checkUserId: '', //审核人ID
					reportType: 4 //报表类型 ，4 销售(特殊)
				},
				//
				tabShow: 'tabShow',
				loading: false,
				isLoading: false,
				dataGridDetailList: [],
				//成本核算
				tabSwitch: false,
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
				isREfresh: true, // 是否刷新
				scrollLeft: 0, // 表格头部距离
				tableRowData: [
					// leftRowData: [],
					// rightRowData: []
				],
				isEditFlag: true,
				receiptData: '', //单据创建时间
				stepIndex: [], // 进度条index
				"totalNumData": {
					"totalNum": 1
				},
				"introListOption": false, // 关闭单据简介的编辑
				"tittleThs": [{
						"name": '序号'
					},
					{
						"name": '商品编码'
					},
					{
						"name": '产品类别'
					},
					{
						"name": '首饰名称'
					},
					{
						"name": '总件重（g）'
					},
					{
						"name": '净金重'
					},
					{
						"name": '证书号'
					},
					{
						"name": '主石'
					},
					{
						"name": '颜色'
					},
					{
						"name": '净度'
					},
					{
						"name": '副石'
					},
					{
						"name": '售价'
					}
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
					"auditPopup": false, // 审核弹窗
					"incomeMoneyPopup": false
				},
				"crudData": { // 增查更删数据
					"currentPage": 1, // 当前页
					"checked": false, // 监听全选
					"checkList": [], // 选择按钮（选中的数据集合）删除
					"operationCut": true // 操作按钮切换
				},
				"canvas": {
					percentage: 100,
					width: 0,
					height: 0,
					backgroundImage: '',
					rotateDeg: 0,
					components: []
				},
				"isPreview": false,
				"templateData": {
					"productList": []
				},
				priceType: {
					totalPrice: 0.00,
					change: 0.00, // 找零 0
					card: 0.00, // 刷卡 1
					cash: 0.00, // 现金 2
					alipay: 0.00, // 支付宝 3
					wechat: 0.00, // 微信 4
					transMoney: 0.00, // 转账 5
					other: 0.00, // 其他 6
				},
				goodsTypeList: {
					saleList: [], // 销售商品列表
					recycleList: [], // 回收商品列表
					exchangeList: [], // 退换商品列表
				},
				stepInfo: {
					step1: {
						stepMessage: '',
						stepFlag: false,
						stepStatus: 8
					},
					step2: {
						stepMessage: '',
						stepFlag: false,
						stepStatus: 7
					},
					step3: {
						stepMessage: '',
						stepFlag: false,
						stepStatus: 6
					}
				},
				barCode: '',
				operateType: '销售',
				totalPrice: '', // 单据总价格
				isMakeMan: false,
				companyPosition: '',
				flag: false,
				textareaData: '',
				preType: 0, // 产品类型
				isAllow: true,
				selWay: null,
				isSkip: false,
				nowStatus: null,
				isPrint: 0,
				templateId: '',
				multipleIdentities: '',
				qualityTemplateList: [],
				isPrintOnly: true, // 是否打印
				isCashierOnly: true, // 是否收银
				printSelectDate: {
					shop: '', //店铺
					preparedBy: '', //制单人
					headerData: '销售', //制单大标题
					orderNum: this.$route.query.orderNumber,
					reportType: '7' //1代表入库、2退库、3调库、4发货、5调柜、6退货
				},
				shopUserList: [],
				statusREfresh: false,
				curStatus: '',
				isRemark: false,
				isSeekMember: false,
				addLeaguer: false,
				editLeaguer: false,
				memberDataInfo: {
					logo: '',
					level: '',
					memberName: '', // 名称
					memberNum: '',
					phone: '', // 手机号
					cardSrc: '', // 名片地址
					orderList: [{
						sellOrderNum: '', // 销售单号
					}],
					principalList: [], // 负责人列表
					birthday: '', // 生日
					email: '', // 邮箱
					wx: '', // 微信号
					industry: '', // 行业
					provinceId: '',
					provinceName: '',
					cityId: '',
					cityName: '',
					areaId: '',
					areaName: '',
					address: '',
					remark: '',
					createTime: '',
					totalMoney: '',
					signList: [

					]
				},
				memberNumber: '',
				isChoseMember: false,
				userPositionInfo: '',
				boundingData: {
					left: 0,
					top: 0,
					display: 'none'
				}
			}
		},
		directives: {
			focus: {
				inserted: function(el, {
					value
				}) {
					if(value) {
						el.focus();
					}
				}
			}
		},
		created() {
			this.getSeekSellReceiptsIntro(); // 单据简介
			this.send();
			this.sellData()
			this.getUserInfo()
			this.sellcollectMoney(); // 收银信息
			this.receiptStatusList()
			// this.getReceiptRemark(); // 单据备注
			this.productTypeList() // 获取产品大类
			this.productClassList() // 获取成色大类
			this.JewelleryClassList() // 珠宝名称
			this.jewelryClassList() // 首饰名称
			this.companyPosition = sessionStorage.getItem('companyPosition')
			this.multipleIdentities = sessionStorage.getItem('multipleIdentities')
			this.isFocus = true
		},
		mounted() {
			let self = this
			$(".row4-data-main").mCustomScrollbar({
				axis: 'x',
				theme: "minimal-dark",
				autoHideScrollbar: true,
				scrollInertia: 500,
				mouseWheel: {
					scrollAmount: 200,
					preventDefault: false,
					normalizeDelta: false
				},
				advanced: {
					updateOnSelectorChange: "div",
					updateOnContentResize: true
				},
				callbacks: {
					onScrollStart: function() {
						console.log('开始滚动了--')
					}
				}
			});
			$(".new-table-wrap").mCustomScrollbar({
				theme: "minimal-dark",
				autoHideScrollbar: true,
				scrollInertia: 500,
				mouseWheel: {
					scrollAmount: 200,
					preventDefault: false,
					normalizeDelta: false,
					//disableOver: [div]
				},
			});
			$(".total-wrap").mCustomScrollbar({
				axis: 'x',
				theme: "minimal-dark",
				autoHideScrollbar: true,
				scrollInertia: 500,
				mouseWheel: {
					scrollAmount: 200,
					preventDefault: false,
					normalizeDelta: false
				},
			});
			$(".cash-content").mCustomScrollbar({
				theme: "minimal-dark",
				autoHideScrollbar: true,
				scrollInertia: 500,
				mouseWheel: {
					scrollAmount: 200,
					preventDefault: false,
					normalizeDelta: false
				},
			});
			this.$nextTick(() => {
				this.Inteval = setInterval(() => {
					if(this.receiptsIntroList) {
						clearInterval(this.Inteval)
						this.formatTime()
					}
				}, 10)
				eventBus.$on('update-data-sell-List', () => {
					this.send()
				})
				if (this.$refs.detailInputWrap) {
					this.$refs.detailInputWrap.focus()
				}
				
			})
		},
		computed: {
			...mapGetters([
				"userInfo", // 用户基本信息
				"saveSuccess", // 保存弹窗
				"saveSuccessData", // 保存弹窗数据
				// "userPositionInfo" // 职位信息
			]),
			filterUserType () {
				// 制单人或店长
				if(this.receiptsIntroList.makeOrderManId == sessionStorage.id || this.shopManageRole) {
					if (this.nowStatus != 2 && this.nowStatus != 3 && this.nowStatus != 5 && this.nowStatus != 6 && this.nowStatus != 7) {
						return true
					}
				}
				return false
			},
			shopManRole: function() { // 店员
				if(this.userPositionInfo) {
					return jurisdictions.jurisdictionShopManRole(this.userPositionInfo.roleList)
				}
			},
			shopManageRole: function() { // 店长
				if(this.userPositionInfo) {
					return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
				}
			},
			shopRole: function() { // 店员
				if(this.userPositionInfo) {
					return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
				}
			},
			shopRoleAnMakeOrder() { // 店员并且非制单人 -> false
				if(this.shopManRole) {
					if(this.receiptsIntroList.makeOrderManId == sessionStorage.id) {
						return true
					}
					return false
				}
				return true
			},
			orderNum() {
				return this.$route.query.orderNumber
			},
			isCheckOrderMan() {
				return this.receiptsIntroList.isCheckOrderMan
			},
			paginationSize() { // 分页的大小
				return Number(this.totalNumData.totalNum) + this.datas.newGapDatas.length;
			},
			showDatas() { // 最终显示的数据
				return [...this.datas.postDataList, ...this.showNewAddData];
			},
			endGetPage: function() { // 后台最后一页
				var totalNum = Number(this.totalNumData.totalNum); // 后台总条数
				var allNum = Math.ceil(totalNum / 10); // 最后一页
				return allNum;
			},
			endGetData: function() { // 后台最后一页所占的条数
				var totalNum = Number(this.totalNumData.totalNum); // 后台总条数
				var allNum = Math.floor(totalNum / 10); // 能填满的页数
				return totalNum - allNum * 10;
			},
			showNewAddData: function() { // 当前页显示的空白数据
				let currentPage = Number(this.crudData.currentPage); // 当前页
				let endGetData = this.endGetData; // 后台最后一页所占的条数
				let endGetPage = this.endGetPage; // 最后一页
				if(this.endGetData > 0) { // 后台最后一页数据不满的情况下
					if(currentPage === endGetPage) { // 是后台最后一页
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
			newPage() { // 总页数
				return Math.ceil(this.paginationSize / this.pageSize);
			},
			getOptionsName() { // 操作名字
				return receiptOptionsName(this.receiptsIntroList.checkType);
			},
			getOperateTakeOrderName() {
				if(this.receiptStatus) {
					if(this.receiptStatus === "1") { // 未收货
						return "收货"
					} else {
						return false
					}
				}
			},
			printOptions() { // 打印单据
				let isCheckOrderMan = this.receiptsIntroList.isCheckOrderMan === "Y";
				let isUser = this.receiptsIntroList.makeOrderManId === sessionStorage.getItem("id");
				if(isUser) { // 制单人
					return true;
				} else if(isCheckOrderMan) { // 审核人
					if(this.receiptsIntroList.checkType === "2") { // 审核中
						return true;
					}
				} else { // 其它
					if(this.receiptsIntroList.checkType !== "3") {
						return true;
					} else {
						return false;
					}
				}
			},
			rcvFlag() { // 收货方
				var rcvFlag = sessionStorage.getItem("rcvFlag") || false;
				if(rcvFlag === "Y") {
					return true;
				} else {
					return false;
				}
			},
			delectOptionRole() {
				let checkType = this.receiptsIntroList.checkType === "1";
				let isRole = this.receiptsIntroList.isRole === "Y";
				if(isRole && checkType) {
					return true;
				} else {
					return false;
				}
			},
			addRole() {
				let checkType = this.receiptsIntroList.checkType === "1";
				let isRole = this.receiptsIntroList.isRole === "Y";
				if(isRole && checkType) {
					return true;
				} else {
					return false;
				}
			},
			// 打印总页数
			pageNumber() {
				let number = 0
				this.canvas.components.forEach(component => {
					if(component.type === 'ItemListComponent') {
						number = component.data.number
					}
				})
				// 如果没有list，则返回一页
				if(!number) {
					return 1
				} else {
					return Math.ceil(this.templateData.productList.length / number) || 1
				}

			},
			// 判断是不是监察员
			isJrole:function() {
				if (this.userPositionInfo) {
                	return jurisdictions.jurisdictionJCY(this.userPositionInfo.roleList);
            	}
			}
		},
		watch: {
			'cashierDialog': function(newVal) {
				if(newVal == false && this.nowStatus == 8) {
					this.priceType = {
						totalPrice: 0.00,
						change: 0.00, // 找零 0
						card: 0.00, // 刷卡 1
						cash: 0.00, // 现金 2
						alipay: 0.00, // 支付宝 3
						wechat: 0.00, // 微信 4
						transMoney: 0.00, // 转账 5
						other: 0.00, // 其他 6
					}
				}
			},
			'isShowDio': function(newVal, oldVal) {
				// this.isShowBox = newVal
				this.isShowWay = newVal
				if(newVal == false) {
					this.tep = 1
					this.isShowWay = true
					this.isShowBox1 = true
					this.selWay = null
					this.isSkip = false
					this.entry.tep0List.isShowBtn = false
					this.entry.tep1List.isShowBtn = false
					this.entry.tep1List.isShowBtn1 = false
					this.entry.tep2List.isShowBtn = false
					this.entry.tep2List.isShowBtn1 = false
					this.entry.tep3List.isShowBtn = false
					this.entry.tep3List.isShowBtn1 = false
					this.entry.tep4List.isShowBtn = false
					this.entry.tep4List.isShowBtn1 = false
					this.entry.tep5List.isShowBtn = false
					this.entry.tep5List.isShowBtn1 = false
					// this.entry.tep2List.leftClassId = ''
					// this.entry.tep3List.leftClassId = ''
					// this.entry.tep4List.leftClassId = ''
					this.entry.tep5List.leftClassId = ''
					this.entry.tep1List.rightClassId = ''
					this.entry.tep2List.rightClassId = ''
					this.entry.tep3List.rightClassId = ''
					this.entry.tep4List.rightClassId = ''
					this.entry.tep5List.rightClassId = ''
				}
			},
			'isShowBox': function(newVal, oldVal) {},
			'tep': function(newVal, oldVal) {
				if(newVal == 1 && oldVal == 2) {
					this.entry.tep0List.isShowBtn = true
				} else if(newVal == 2 && oldVal == 1) {
					if(this.selWay != null) {
						this.entry.tep1List.isShowBtn = true
					}
				} else if(newVal == 2 && oldVal == 3) {
					if(this.entry.tep1List.rightClassId != '') {
						this.entry.tep1List.isShowBtn1 = true
					}
				} else if(newVal == 3 && oldVal == 2) {
					if(this.entry.tep1List.rightClassId != '') {
						this.entry.tep2List.isShowBtn = true
					}
				} else if(newVal == 3 && oldVal == 4) {
					if(this.entry.tep2List.rightClassId != '') {
						this.entry.tep2List.isShowBtn1 = true
					}
				} else if(newVal == 4 && oldVal == 3) {
					if(this.entry.tep2List.rightClassId != '') {
						this.entry.tep3List.isShowBtn = true
					}
				} else if(newVal == 4 && oldVal == 5) {
					if(this.entry.tep4List.rightClassId != '') {
						this.entry.tep3List.isShowBtn = true
					}
				} else if(newVal == 5 && oldVal == 4) {
					if(this.entry.tep3List.rightClassId != '') {
						this.entry.tep3List.isShowBtn1 = true
					}
				} else if(newVal == 5 && oldVal == 4) {
					if(this.entry.tep3List.rightClassId != '') {
						this.entry.tep4List.isShowBtn = true
					}
				}
			},
			qualityTemplateList() {
				let defaultTemplate = find(this.qualityTemplateList, {
					defaultFlag: 'Y'
				})
				if(defaultTemplate) {
					this.templateId = defaultTemplate.templateId
				}
			}
		},
		methods: {
			...mapActions([
				"workPopupError" // 错误弹窗
			]),
			seekGetTemplateList (parm) {
				printAPI.getTemplateList({
					type: 1,
					shopId: parm,
					fieldType: 'full'
				}).then(json => {
					this.qualityTemplateList = json.data.qualityList
					if(this.qualityTemplateList.length > 0) {
						this.disabled = false
						this.isPrintOnly = true
						this.placeText = "请选择"
					} else {
						this.disabled = true
						this.isPrintOnly = false
						this.placeText = "无打印模板"
					}
				})
			},
			setBounding(parm) {
				this.$refs.remarkTitWrap.open(parm)
				// this.boundingData = parm
			},
			remarkOut() {
				this.$refs.remarkTitWrap.remarkOut()
			},
			emptyVal(val) {
				this.isDisabled = false;
				if(val == 1 && this.priceType.card == '') {
					// this.priceType.card = 0
					Object.assign(this.priceType, {
						card: 0
					})
				} else if(val == 2 && this.priceType.wechat == '') {
					// this.priceType.wechat = 0
					Object.assign(this.priceType, {
						wechat: 0
					})
				} else if(val == 3 && this.priceType.alipay == '') {
					// this.priceType.alipay = 0
					Object.assign(this.priceType, {
						alipay: 0
					})
				} else if(val == 4 && this.priceType.cash == '') {
					// this.priceType.cash = 0
					Object.assign(this.priceType, {
						cash: 0
					})
				} else if(val == 5 && this.priceType.other == '') {
					// this.priceType.other = 0
					Object.assign(this.priceType, {
						other: 0
					})
				}

			},
			seekMem() {
				if(this.isMakeMan || this.shopManageRole) {
					this.isSeekMember = true
				} else {
					return
				}
			},
			getUserInfo() {
				seekGetUserInfo({
					userId: sessionStorage.getItem('id')
				}).then((res) => {
					this.userPositionInfo = res.data.data
				})
			},
			closeEditReturn(val) {
				this.editLeaguer = val.status
			},
			deleteMember() {
				this.$confirm('此操作删除该单据与该会员的关联, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',

				}).then(() => {
					let options = {
						shopId: this.receiptsIntroList.shopId,
						memberOrPhone: '',
						sellOrderId: this.receiptsIntroList.id
					}
					operateMemberSalesList(options).then((res) => {
						if(res.data.state == 200) {
							this.$message({
								type: 'success',
								message: '删除关联成功!'
							});
							this.getSeekSellReceiptsIntro()
						} else {
							this.$message({
								type: 'warning',
								message: res.data.msg
							})
						}
					}, (res) => {
						this.$message({
							type: 'warning',
							message: res.data.msg
						})
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			memberSalesList() { // 会员关联销售单
				let options = {
					shopId: this.receiptsIntroList.shopId,
					memberOrPhone: this.memberNumber,
					sellOrderId: this.receiptsIntroList.id
				}
				operateMemberSalesList(options).then((res) => {
					if(res.data.state == 200) {
						this.getSeekSellReceiptsIntro()
						this.isSeekMember = false
					} else {
						this.$message({
							type: 'warning',
							message: res.data.msg
						})
					}
				}, (res) => {
					this.$message({
						type: 'warning',
						message: res.data.msg
					})
				})
			},
			closeChoMember(val) {
				this.isChoseMember = false
				this.memberNumber = val.list
				this.memberSalesList()
			},
			closeReturn() {
				this.addLeaguer = false
				this.getSeekSellReceiptsIntro()
			},
			createMember() {
				this.isSeekMember = false
				this.addLeaguer = true
			},
			// 切换店铺
			dropReturn(data) {
				let options = {
					modifyList: [{
						dataType: '6',
						objectData: data.item.operateId
					}],
					orderNum: this.$route.query.orderNumber,
					modelType: '9'
				}
				operateHandleXGReceipt(options).then((res) => {}, (res) => {})
			},
			// 更新备注显示权限
			updateRemark(type) {
				this.isRemark = type
			},
			getStatus(status) {
				this.statusREfresh = false
				if(status) this.curStatus = status
			},
			getShopUserList(parm) { // 获取员工列表
				let options = {
					page: 1,
					pageSize: 9999,
					shopId: parm
				}
				seekGetShopUserList(options).then((res) => {
					if(res.data.state == 200) {
						this.shopUserList = res.data.data.shopUserList
					}
				}, (res) => {

				})
			},
			selectAttr(type) { // 选择录入方式
				if(type == 2) {
					this.isShowBox1 = false
					this.tep = 2
					this.attributeType = 2
				}
			},
			operateCashierAct() { 
				// 打单操作
				if(this.isPrintOnly && this.templateId == '') {
					this.$message({
						type: 'error',
						message: '请选择打印模板！'
					})
				} else if(this.isPrintOnly || this.isCashierOnly) {
					if((this.isCashierOnly && this.receiptsIntroList.cashStatus == 2) && this.isPrintOnly){
						this.orderPayAndPrint();
					}else if(this.isPrintOnly) {
						this.print();
					} else if(this.isCashierOnly && this.receiptsIntroList.cashStatus == 2) {
						this.orderPay();
					}
				}
			},
			//打印表格 
			tabPrin() {
				this.$refs.sellTemplate.print();
			},
			selectWay() {
				this.selWay = 1
				this.isShowBox1 = false
			},
			closeTooltip() {
				this.isShowTooltip = false
				this.isMaskShow = false
				this.isFocus = false
			},
			closeCashier() { // 关闭弹窗
				this.isShowBox = true
			},
			revokeOrderPay() { // 撤销收银
				let options = {
					orderNum: this.$route.query.orderNumber,
					operateType: 3,
				}
				operateOrderPay(options).then((res) => {
					this.statusREfresh = true
					this.cashierDialog = false

					if(this.qualityTemplateList.length == 0) {
						this.isPrintOnly = false // 是否打印
					} else {
						this.isPrintOnly = true // 是否打印
					}
					this.isCashierOnly = true // 是否收银
					this.getSeekSellReceiptsIntro(); // 单据简介
					this.send();
					this.sellData()

					this.sellcollectMoney(); // 收银信息
					this.priceType = {
						totalPrice: 0.00,
						change: 0.00, // 找零 0
						card: 0.00, // 刷卡 1
						cash: 0.00, // 现金 2
						alipay: 0.00, // 支付宝 3
						wechat: 0.00, // 微信 4
						transMoney: 0.00, // 转账 5
						other: 0.00, // 其他 6
					}
					this.cashierTime = ''
				}, (res) => {})
			},
			mathAdd(...param){
				let result = 0;
				for(let item of param){
					result = _.add(result, Number(item));
				}
				return result;
			},
			/**
			 * 收银打单
			 */
			orderPayAndPrint(){
				if(this.receiptsIntroList.cashStatus != 2){
					return;
				}
				if(this.mathAdd(this.priceType.card, this.priceType.cash, this.priceType.alipay, this.priceType.wechat, this.priceType.other)<this.totalPrice){
					return this.$message({
          message: '实收金额应大于应收金额！',
          type: 'warning'
        });
				}
				this.cashierDialog = false;
				let options = {
					orderNum: this.$route.query.orderNumber,
					remark: '',
					operateType: 2,
					payList: [{
							payType: '0',
							price: this.priceType.change
						},
						{
							payType: '1',
							price: this.priceType.card
						},
						{
							payType: '2',
							price: this.priceType.cash
						},
						{
							payType: '3',
							price: this.priceType.alipay
						},
						{
							payType: '4',
							price: this.priceType.wechat
						},
						{
							payType: '6',
							price: this.priceType.other
						},
					]
				}
				this.$confirm('确定要执行收银操作吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					operateOrderPay(options).then((res) => {
						this.isShowBox = true
						this.isShowFooter = false
						if(this.isPrintOnly == true) {
							this.print()
						}
						this.getSeekSellReceiptsIntro(); // 单据简介
						this.send();
						this.sellData()
						this.statusREfresh = true
						this.sellcollectMoney(); // 收银信息
						this.print();
					}, (res) => {
						this.isShowFooter = true
					})
				}).catch(() => {
				});
			},
			print(){
				this.cashierDialog = false
				let selectedTemplate = find(this.qualityTemplateList, {
					templateId: this.templateId
				})
				this.$emit('printOrder', this.orderNum, selectedTemplate && JSON.parse(selectedTemplate.content))
				this.printOrder(this.$route.query.orderNumber, selectedTemplate && JSON.parse(selectedTemplate.content))
			},
			orderPay() { // 单据操作收银
				if(this.receiptsIntroList.cashStatus != 2){
					return;
				}
				if(this.mathAdd(this.priceType.card, this.priceType.cash, this.priceType.alipay, this.priceType.wechat, this.priceType.other)<this.totalPrice){
					return;
				}
				this.cashierDialog = false;
				let options = {
					orderNum: this.$route.query.orderNumber,
					remark: '',
					operateType: 2,
					payList: [{
							payType: '0',
							price: this.priceType.change
						},
						{
							payType: '1',
							price: this.priceType.card
						},
						{
							payType: '2',
							price: this.priceType.cash
						},
						{
							payType: '3',
							price: this.priceType.alipay
						},
						{
							payType: '4',
							price: this.priceType.wechat
						},
						{
							payType: '6',
							price: this.priceType.other
						},
					]
				}
				if(this.receiptsIntroList.cashStatus != 2) {
					operateOrderPay(options).then((res) => {
						this.isShowBox = true
						this.isShowFooter = false
						if(this.isPrintOnly == true) {
							this.print()
						}
						this.getSeekSellReceiptsIntro(); // 单据简介
						this.send();
						this.sellData()
						this.statusREfresh = true
						this.sellcollectMoney(); // 收银信息
					}, (res) => {
						this.isShowFooter = true
					})
				} else {
					this.$confirm('确定要执行收银操作吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(() => {
						operateOrderPay(options).then((res) => {
							this.isShowBox = true
							this.isShowFooter = false
							if(this.isPrintOnly == true) {
								this.print()
							}
							this.getSeekSellReceiptsIntro(); // 单据简介
							this.send();
							this.sellData()
							this.statusREfresh = true
							this.sellcollectMoney(); // 收银信息
						}, (res) => {
							this.isShowFooter = true
						})
					}).catch(() => {});
				}

			},
			focusEvent(type) {
				if(this.priceType.cash == 0 && this.priceType.wechat == 0 && this.priceType.other == 0 && this.priceType.card == 0 && this.priceType.alipay == 0) {
					if(type == 1) { // 现金
						this.priceType.cash = Number(this.totalPrice).toFixed(2)
						this.priceType.change = (Number(this.totalPrice) - Number(this.priceType.cash)).toFixed(2)
					} else if(type == 2) { // 微信
						this.priceType.wechat = Number(this.totalPrice).toFixed(2)
						this.priceType.change = (Number(this.totalPrice) - Number(this.priceType.wechat)).toFixed(2)
					} else if(type == 3) { // 其他
						this.priceType.other = Number(this.totalPrice).toFixed(2)
						this.priceType.change = (Number(this.totalPrice) - Number(this.priceType.other)).toFixed(2)
					} else if(type == 4) { // 刷卡
						this.priceType.card = Number(this.totalPrice).toFixed(2)
						this.priceType.change = (Number(this.totalPrice) - Number(this.priceType.card)).toFixed(2)
					} else if(type == 5) { // 支付宝
						this.priceType.alipay = Number(this.totalPrice).toFixed(2)
						this.priceType.change = (Number(this.totalPrice) - Number(this.priceType.alipay)).toFixed(2)
					}
				} else {
					if(type == 1) { // 现金
						this.priceType.cash = (Number(this.totalPrice) - (Number(this.priceType.wechat) + Number(this.priceType.other) + Number(this.priceType.card) + Number(this.priceType.alipay))).toFixed(2)
					} else if(type == 2) { // 微信
						this.priceType.wechat = (Number(this.totalPrice) - (Number(this.priceType.cash) + Number(this.priceType.other) + Number(this.priceType.card) + Number(this.priceType.alipay))).toFixed(2)
					} else if(type == 3) { // 其他
						this.priceType.other = (Number(this.totalPrice) - (Number(this.priceType.wechat) + Number(this.priceType.cash) + Number(this.priceType.card) + Number(this.priceType.alipay))).toFixed(2)
					} else if(type == 4) { // 刷卡
						this.priceType.card = (Number(this.totalPrice) - (Number(this.priceType.wechat) + Number(this.priceType.other) + Number(this.priceType.cash) + Number(this.priceType.alipay))).toFixed(2)
					} else if(type == 5) { // 支付宝
						this.priceType.alipay = (Number(this.totalPrice) - (Number(this.priceType.wechat) + Number(this.priceType.other) + Number(this.priceType.card) + Number(this.priceType.cash))).toFixed(2)
					}
					this.priceType.change = (Number(this.totalPrice) - (Number(this.priceType.cash) + Number(this.priceType.wechat) + Number(this.priceType.other) + Number(this.priceType.card) + Number(this.priceType.alipay))).toFixed(2)
				}
			},
			computePrice(type, el) {
				if(el.keyCode >= 48 && el.keyCode <= 57 || el.keyCode >= 96 && el.keyCode <= 105 || el.keyCode == 8) {
					if(type == 1) { // 现金

					} else if(type == 2) { // 微信

					} else if(type == 3) { // 其他

					} else if(type == 4) { // 刷卡

					} else if(type == 5) { // 支付宝

					}
					this.priceType.change = (Number(this.totalPrice) - (Number(this.priceType.cash) + Number(this.priceType.wechat) + Number(this.priceType.other) + Number(this.priceType.card) + Number(this.priceType.alipay))).toFixed(2)
					if(this.priceType.change < 0) {
						this.cashiertext = "找零"
					} else {
						this.cashiertext = "待收银"
					}
				} else {
					event.returnValue = false;
				}
			},
			messageBack(val) { // 操作商品的数据返回
				this.getSeekSellReceiptsIntro(); // 单据简介
				this.send();
				this.sellData()
				this.statusREfresh = true
				this.sellcollectMoney(); // 收银信息
			},
			watchKeyBord(val) { // 监听快捷键
				switch(val) {
					case 113: // 销售
						this.operateType = '销售'
						this.focusStatus = !this.focusStatus
						this.isShowTooltip = true
						this.isMaskShow = true
						break;
					case 115: // 收银
						this.collectMoney()
						break;
				}
			},
			// ---------------------------- 手工录入 ----------------------------------------
			attribute(type) { // 商品属性
				if(type == 1 || type == 2) {
					this.attributeType = type
					this.tep = 2
					//this.operateTypeNum = type
					if(this.selWay == 1) { // 系统检索
						this.isMaskShow = true
						this.isShowTooltip = true
						this.isShowDio = false
					}
					this.isShowBox1 = false

				} else {
					if(type == 3) {
						this.calcMethod = 1
					} else {
						this.calcMethod = 2
					}
				}
			},
			goPro() {
				// 1 上一步  2 下一步
				this.tep--
			},
			goNext() {
				this.isSkip = true
				// 1 上一步  2 下一步
				if(this.tep > 5) {
					this.tep = 5
				} else {
					this.tep++
				}
			},
			selProductClass2(item) { // 首饰名称
				this.entry.tep4List.leftClassId = item.classesId
				this.entry.tep4List.rightClassList = item.childrenList
			},
			selProductClass1(item) { // 珠宝大类
				this.entry.tep3List.leftClassId = item.classesId
				this.entry.tep3List.rightClassList = item.childrenList
			},
			selProductClass(item) {
				this.entry.tep2List.leftClassId = item.classesId
				this.entry.tep2List.rightClassList = item.childrenList
			},
			jewelryClassList() { // 首饰名称
				let options = {
					type: '3'
				}
				seekProductClassList(options).then((res) => {
					this.entry.tep4List.classesList = res.data.data.list
					this.entry.tep4List.leftClassId = res.data.data.list[0].classesId
					this.entry.tep4List.rightClassList = res.data.data.list[0].childrenList
				}, (res) => {})
			},
			JewelleryClassList() { // 珠宝大类
				let options = {
					type: '2'
				}
				seekProductClassList(options).then((res) => {
					this.entry.tep3List.classesList = res.data.data.list
					this.entry.tep3List.leftClassId = res.data.data.list[0].classesId
					this.entry.tep3List.rightClassList = res.data.data.list[0].childrenList
				}, (res) => {})
			},
			productClassList() { // 成色大类
				let options = {
					type: '1'
				}
				seekProductClassList(options).then((res) => {
					if(res.data.state == 200) {
						this.entry.tep2List.classesList = res.data.data.list
						this.entry.tep2List.leftClassId = res.data.data.list[0].classesId
						this.entry.tep2List.rightClassList = res.data.data.list[0].childrenList
					} else {
						this.$message({
              message: res.data.msg,
              type: 'warning'
            })
					}

				}, (res) => {})
			},
			productTypeList() { // 产品大类
				getProductTypeList({
					type: 1
				}).then((res) => {
					if(res.data.state == 200) {
						this.isLoading = false
						this.entry.tep1List.productList = res.data.data.list
						for(let i = 0; i < res.data.data.list.length; i++) {
							if(res.data.data.list[i].classesType == this.entry.tep1List.productStep) {
								this.entry.tep1List.rightClassList = res.data.data.list[i].typeList
							}
						}
					}
				}, (res) => {})
			},
			selBigClass(item) {
				if(item == '计重类') {
					this.entry.tep1List.productStep = '1'
					this.preType = 1
				} else if(item == '计件类') {
					this.entry.tep1List.productStep = '2'
					this.preType = 2
				} else if(item == '饰品类') {
					this.entry.tep1List.productStep = '3'
					this.preType = 3
				}
				this.isLoading = true
				this.productTypeList()
			},
			selBigClassId(id, type) { // 1 产品类别  2 成色大类  3 珠宝名称  4 首饰名称
				if(type == 1) {
					this.entry.tep1List.rightClassId = id
					this.tep = 3
					console.log('entry.tep2List.classesList', this.entry.tep2List.classesList)
				} else if(type == 2) {
					this.entry.tep2List.rightClassId = id
					this.tep = 4
				} else if(type == 3) {
					this.entry.tep3List.rightClassId = id
					this.tep = 5
				} else if(type == 4) {
					this.entry.tep4List.rightClassId = id
					if(this.isAllow) {
						this.isAllow = false
						this.addBackBuyProductToOrder()
					}

				}

			},
			//------------------------------copy--------------------------------
			collectMoney() {
				//this.popup.incomeMoneyPopup = !this.popup.incomeMoneyPopup
				if(this.isBlank) {
					this.$store.dispatch('workPopupError', '空单据不可执行收银操作！');
				} else {
					this.isShowBox = !this.isShowBox
					this.cashierDialog = !this.cashierDialog
					if(this.noeStatus == 6) {
						this.isCashierOnly = false
					}
				}
			},
			isIncomeMoney(parm) { // 监听关闭弹窗事件
				this.popup.incomeMoneyPopup = parm;
				this.receiptsChange();
			},
			openQualityTemplateSelectorDialog(orderNumber) {
				this.$refs.qualityTemplateSelectorDialog.show();
			},
			printOrder(orderNumber, template) {
				this.$refs.qualityTemplateSelectorDialog.close();
				this.canvas = template
				printAPI.getPrintQualityData({
					orderId: orderNumber
				}).then(json => {
					if(json.state == 200) {
						if(json.data.backuProductList && json.data.backuProductList.length > 0) {
							if(json.data.productList) json.data.productList.push(...json.data.backuProductList)
						}
						this.templateData = json.data
						this.isPreview = true
						this.windowPrint(template, json.data)
					}else {
						this.$message({
							message: json.msg,
							type: error
						})
					}
				})
			},

			//质保单打印
			windowPrint1(templateList, data){
				this.warrantyTemplate.template = templateList;
				this.warrantyTemplate.dataList = data;
			},

			//质保单打印
			windowPrint() {
				let print = null;
				this.appPrint = document.getElementById('appPrint')

				if(this.IntervalOut) clearInterval(this.IntervalOut)
				document.getElementById('app').style.display = 'none';

				setTimeout(() => {
					this.appPrint.innerHTML = this.$refs.windowPrintView.innerHTML
				}, 1000)
				//return
				setTimeout(() => {
					print = document.execCommand('print');
				}, 1500)

				this.IntervalOut = setInterval(() => {
					if(print) {
						document.getElementById('app').style.display = 'block';
						if(this.IntervalOut) clearInterval(this.IntervalOut)
						this.IntervalOut = null;
						this.appPrint.innerHTML = '';
					} else if(print == false) {
						if(this.IntervalOut) clearInterval(this.IntervalOut)
						if(!window.print()) {
							document.getElementById('app').style.display = 'block';
							this.IntervalOut = null;
							this.appPrint.innerHTML = '';
						}
					}
				}, 10)
			},

			receiptsChange() { // 监听商品列表数据改变
				this.getSeekSellReceiptsIntro(); // 单据简介
				this.sellcollectMoney(); // 收银信息
			},
			printrRceipts() { // 打单
				this.openQualityTemplateSelectorDialog(this.orderNum)
			},
			//------------------------------copy--------------------------------
			openREmarkBox() {
				if(this.$refs.open_btn.style.right == '-370px') {
					this.$refs.open_btn.style.right = '-45px'
					this.$refs.col_3.style.right = '-45px'
					this.$refs.col_3.style.width = '0'
					this.$refs.col_3.style.padding = '0'
				} else {
					this.$refs.open_btn.style.right = '-370px'
					this.$refs.col_3.style.right = '-320px'
					this.$refs.col_3.style.width = '300px'
					this.$refs.col_3.style.padding = '18px 20px'
				}
			},
			dropdownEvents(parm) {
				let command = ''
				if(parm == 1) {
					command = '回收'
				} else {
					command = '退换'
				}
				if(command == '退换') {
					this.operateType = '退换'
					this.operateTypeNum = '1'
				} else if(command == '回收') {
					this.operateType = '回收'
					this.operateTypeNum = '2'
				}
				this.tep = 2
				this.attributeType = 2
				this.isShowBox1 = false
				// this.isShowWay = false
			},
			addNewGoodOperate() { // 输入方法
				if(this.operateType == null) {
					this.$message({
						message: '请选择操作类型',
						type: 'warning'
					})
				}
				this._seekOneProductStatus()
			},
			_seekOneProductStatus() {
				let options = {
					orderNum: this.$route.query.orderNumber,
					barcode: this.barCode
				}
				seekOneProductStatus(options)
					.then(res => {
						if(res.data.state == 200) {
							console.log('==--==-', res.data)
							if(res.data.data.sellStatus == 1) { // 待销售
								this.addProductToOrder()
							} else if(res.data.data.sellStatus == 2) { // 已销售
								this.$refs.changeTypeWrap.open(this.barCode)
							}
						} else {
							this.$message({
								message: res.data.msg,
								type: 'warning'
							})
						}
					})
			},
			selOperateType(type) { // 选择销售还是回购
				if(type == 1) {
					this.operateType = '销售'
					this.isShowTooltip = true
					this.isMaskShow = true
				} else {
					// this.dropdownEvents()
					this.isShowDio = !this.isShowDio
				}
			},
			addProductToOrder() { // 添加销售商品
				let options = {
					orderNum: this.$route.query.orderNumber,
					barcode: this.barCode
				}
				operateAddProductToOrder(options).then((res) => {
					if(res.data.state === 200) {
						this.updateData()
						this.$message({
							type: 'success',
							message: '添加成功!'
						})
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				}, (res) => {
					this.$message({
						message: res.data.msg,
						type: 'warning'
					});
				})
			},
			addBackProductToOrder() { // 添加退换商品
				let options = {
					orderNum: this.$route.query.orderNumber,
					barcode: this.barCode,
					productType: this.attributeType
				}
				operateAddBackProductToOrder(options).then((res) => {
					if(res.data.state === 200) {
						// 更新数据
						this.updateData()
						this.$message({
							type: 'success',
							message: '添加成功!'
						})
					} else {
						this.$message({
							type: 'warning',
							message: res.data.msg
						})
					}
				}, (res) => {
					this.$message({
						message: res.data.msg,
						type: 'warning'
					});
				})
			},
			updateData() {
				this.getSeekSellReceiptsIntro(); // 单据简介
				this.send();
				this.sellData()
				this.barCode = ''
			},
			addBackBuyProductToOrder() { //添加退换商品通过手工录入
				let options = {
					orderNum: this.$route.query.orderNumber,
					operateType: this.operateTypeNum,
					productProperty: this.attributeType,
					productTypeId: this.entry.tep1List.rightClassId, // 产品
					colorId: this.entry.tep2List.rightClassId, // 成色
					jewelId: this.entry.tep3List.rightClassId, // 宝石
					JewelryId: this.entry.tep4List.rightClassId, // 首饰
					//calcMethod: this.calcMethod
				}
				operateAddBackBuyProductToOrder(options).then((res) => {
					if(res.data.state == 200) {} else {
						this.$store.dispatch('workPopupError', res.data.msg)
					}
					this.tep = 1
					this.isAllow = true
					this.isShowDio = false
					this.send();
					this.sellData()
				}, (res) => {
					this.$store.dispatch('workPopupError', res.data.msg)
					this.isShowDio = false
					this.send();
					this.sellData()
				})
			},
			sellcollectMoney() {
				let options = {
					orderNum: 　this.$route.query.orderNumber
				}
				seekSellcollectMoney(options).then((res) => {
					if(res.data.data.createDate) {
						let year = res.data.data.createDate.substring(0, 4)
						let month = res.data.data.createDate.substring(4, 6)
						let data = res.data.data.createDate.substring(6, 8)
						let hour = res.data.data.createDate.substring(8, 10)
						let time = res.data.data.createDate.substring(10, 12)
						this.cashierTime = year + "-" + month + "-" + data + " " + hour + ":" + time
					}
					this.priceType.totalPrice = res.data.data.totalPrice
					if(res.data.data.priceList) {
						for(let i = 0; i < res.data.data.priceList.length; i++) {
							if(res.data.data.priceList[i].priceType == 0) {
								this.priceType.change = res.data.data.priceList[i].price
							} else if(res.data.data.priceList[i].priceType == 1) {
								this.priceType.card = res.data.data.priceList[i].price
							} else if(res.data.data.priceList[i].priceType == 2) {
								this.priceType.cash = res.data.data.priceList[i].price
							} else if(res.data.data.priceList[i].priceType == 3) {
								this.priceType.alipay = res.data.data.priceList[i].price
							} else if(res.data.data.priceList[i].priceType == 4) {
								this.priceType.wechat = res.data.data.priceList[i].price
							} else if(res.data.data.priceList[i].priceType == 5) {
								this.priceType.transMoney = res.data.data.priceList[i].price
							} else if(res.data.data.priceList[i].priceType == 6) {
								this.priceType.other = res.data.data.priceList[i].price
							}
						}
					}

				}, (res) => {})
			},
			sendGoods() {
				let options = {
					"orderNum": this.$route.query.orderNumber // 单据ID
				}
				operateTakeOrder(options).then((res) => {}, (res) => {})
			},
			addNewGoods() { //添加新商品
				var rowData = JSON.stringify(this.configData);
				var newRowData = JSON.parse(rowData);
				this.queryBarCode(this.enterOrderNum, 0, 1)
				// this.getSeekSellReceiptsIntro(); // 单据简介
				this.send();
				this.sellData()
				// this.receiptStatusList();
			},
			//获取当前的接口类型
			getReportType() {
				return this.propOptons.reportType
			},
			setReportType(port) {
				if(port) this.propOptons.reportType = port
			},
			//滚动条滚动时不显示总计
			tabScrollShow(type) {
				this.tabShow = type ? 'tabShow' : ''
			},
			tabs(index, type) {
				this.loading = true;
				this.tabClassActive.index = index;
				this.setReportType(type)
				this.send()
				this.sellData()
			},
			formatTime() {
				let year = this.receiptsIntroList.createDate.substring(0, 4)
				let month = this.receiptsIntroList.createDate.substring(4, 6)
				let data = this.receiptsIntroList.createDate.substring(6, 8)
				let hour = this.receiptsIntroList.createDate.substring(8, 10)
				let time = this.receiptsIntroList.createDate.substring(10, 12)
				this.receiptData = year + "-" + month + "-" + data + " " + hour + ":" + time
			},
			delOrder() {
				let options = {
					orderNum: this.$route.query.orderNumber
				}
				this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					operateDeleteByOrderNumber(options).then((res) => {
						if(res.data.state == 200) {
							this.$router.push({
								path: '/work/sell'
							})
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
						} else {
							this.$message({
								type: 'warning',
								message: res.data.msg
							});
						}
					}, (res) => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			switchShopMan(val) { // 切换销售人
				let options = {
					modifyList: [{
						dataType: '6',
						objectData: val
					}],
					orderNum: this.$route.query.orderNumber,
					modelType: '9'
				}
				operateHandleXGReceipt(options).then((res) => {}, (res) => {})
			},
			// 关闭单据备注弹窗
			closeMask(type) {
				this.isShowMask = false
				if(type == 2) {
					let option = {
						remarkId: this.remarkId,
						type: '1'
					}
					operateRemarkOperation(option).then((res) => {
						this.refreshRemark = !this.refreshRemark
						this.remarkDialog = false
					}, (res) => {})
				} else if(type == 4) {
					if(this.remarkText.length < 1) {
						this.$message({
							type: 'info',
							message: '请输入备注内容'
						})
						return
					}
					let options = {
						modifyList: [{
							dataType: '5',
							objectData: this.remarkText
						}],
						orderNum: this.$route.query.orderNumber,
						modelType: '9'
					}
					operateHandleXGReceipt(options).then((res) => {
						this.remarkDialog = false
						this.remarkText = ''
					}, (res) => {})
				}
			},
			delRemark(val) {
				this.isShowMask = val.type
				this.remarkId = val.item.id
				this.isDel = true
			},
			//************************************************************************** */

			askSubmit(type) {
				let options = {
					"handleType": type,
					"orderIdList": [{
						"orderNum": this.$route.query.orderNumber
					}], //单据号
					"checkRemark": this.textareaData
				}
				operateReceiptOperation(options).then((res) => {
					if(res.data.state == 200) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.refreshRemark = !this.refreshRemark
					} else {
						this.$message({
							message: res.data.msg,
							type: 'wraning'
						});
					}
				}, (res) => {
					this.$message({
						message: res.data.msg,
						type: 'wraning'
					});
				})
			},
			//************************************************************************** */
			onScroll(e) { // 滚动加载
				var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
				var clientHeight = e.currentTarget.clientHeight; // 元素的高度
				var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
				if(clientHeight + scrollTop >= scrollHeight) {}
			},
			// 获取商品数据
			updateGoodsList() {
				let options = {
					"page": "1", // 当前页
					"pageSize": "10", // 每页显示数
					"objId": this.$route.query.orderNumber,
					"type": "3" // 操作类型 3=单据号; 5=条码号
				}
				getUpdateGoodsList(options).then((res) => {}, (res) => {})
			},
			goClick() {
				this.$refs.tableList.click();
			},
			addAct() {
				this.isDel = false
				this.isShowMask = true
			},
			propsAct() {
				this.isEditFlag = !this.isEditFlag
			},
			timeFormat(parm) {
				if(parm == undefined) {
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
			receiptStatusList() {
				this.stepInfo.step1.stepFlag = false
				this.stepInfo.step2.stepFlag = false
				this.stepInfo.step3.stepFlag = false
				let options = {
					orderId: this.$route.query.orderNumber
				}
				seekReceiptStatusList(options).then((res) => {
					this.nowStatus = res.data.data.nowStatus
				}, (res) => {})
			},
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				var _self = this;
				this.crudData.currentPage = val;
				if(this.newPage <= val) { // 最后一页才给选择
					if(this.datas.newGapDatas.length > 0) { // 有空白数据的情况下
						setTimeout(function() {
							_self.getFocus();
						}, 100);
					}
				}
				this.getGoodsList();
			},
			delectReceiptsState(parm) { // 监听确认删除弹窗和操作成功
				if(parm.type === "2") { // 单据操作成功/删除成功
					if(this.popup.deleteReceipts) { // 删除单据
						this.close();
					} else {
						this.$emit("getSeekSellReceiptsIntro"); // 单据操作成功
					}
				}
				if(parm.type === "3") {
					this.send();
					this.sellData()
					this.$emit("getSeekSellReceiptsIntro"); // 单据操作成功
				}
				this.popup.deleteReceipts = parm.name;
				this.popup.auditPopup = parm.name;
				this.popup.batchAddReceiptsPopup = parm.name;
			},
			getFocus() {
				var endIndex = this.showDatas.length - 1;
				var endFacus = "xh" + endIndex;
			},
			appendBatchRow() { // 批量新增
				this.popup.batchAddReceiptsPopup = !this.popup.batchAddReceiptsPopup;
			},
			goPreviousPage() { // 返回上一页
				if(this.$route.query.path) {
					this.$router.push(this.$route.query.path)
				} else {
					this.$router.push("/work/sell")
				}
			},
			auditFun() { // 提交审核
				this.popup.auditPopup = true;
			},
			controlPage() { // 控制分页
				var _self = this;
				if(this.newPage > this.crudData.currentPage) {
					this.datas.postDataList = [];
					this.crudData.currentPage = this.newPage; // 控制分页
				}
				setTimeout(function() {
					_self.getFocus();
				}, 100);
			},
			getconfigData(parm) { // 得到配置代码
				let configDatas = {};
				for(let key in this.configData) {
					configDatas[key] = parm[key] || null
				}
				return configDatas;
			},
			delProduct(barcode, index, operate, showData) {
				if(showData.barcode) {
					this.queryBarCode(barcode, index, operate);
				} else {
					this.datas.newGapDatas.splice((index - this.datas.postDataList.length), 1);
				}
			},
			queryBarCode(barcode, index, operate) { // 通过条码号操作数据
				if(barcode) {
					let options = {
						"productList": [{
							"barcode": barcode.trim()
						}],
						"operate": operate,
						"orderNum": this.$route.query.orderNumber
					}
					operateProductList(options).then((response) => {
						if(response.data.state === 200) {
							this.$emit("closePopup", false)
							this.$emit("getSeekSellReceiptsIntro")
							this.enterOrderNum = ''
							if(operate === "1") { // 新增
								// this.savaOperateSuccess(response.data.data, index);
								this.send();
								this.sellData()
							} else if(operate === "2") { // 删除
								this.delOperateSuccess(index);
							}
						} else {
							this.$store.dispatch('workPopupError', response.data.msg)
						}
					}, (response) => {
						this.$store.dispatch('workPopupError', response.data.msg)
					})
				}
			},
			savaOperateSuccess(parm, index) { // 保存成功后的回调
				if(this.datas.newGapDatas.length < 2) {
					this.datas.newGapDatas[0].barcode = null;
				} else {
					for(var i = 0; i < this.datas.newGapDatas.length; i++) {
						if(this.datas.newGapDatas[i].barcode === parm.barcode) {
							this.datas.newGapDatas.splice(i, 1);
						}
					}
				}
				var datas = this.getconfigData(parm);
				this.datas.postDataList.push(datas);
				this.controlPage();
			},
			delOperateSuccess(index) { // 删除成功后的回调
				this.datas.postDataList.splice(index, 1);
			},
			getAuditStatus(parm) { // 审核状态
				return productDetailStatus(parm);
			},
			delectReceipts(parm) {
				this.popup.deleteReceipts = true;
				this.popup.receiptsOrderNum = this.$route.query.orderNumber;
			},
			close() { // 关闭
				this.$router.push(this.closeRouterUrl);
			},
			// *******************************************************************************************************************************
			/*
			 * 数据请求
			 */
			sellData() {
				let options = {
					orderNum: this.$route.query.orderNumber
				}
				seekSellData(options).then((res) => {
					if(res.data.state == 200) {
						this.dataGridStorage = res.data.data
					}
				}, (res) => {})
			},
			send() {
				this.propOptons.orderNum = this.$route.query.orderNumber
				let options = {
					orderNum: this.$route.query.orderNumber,
					page: this.page,
					pageSize: this.pageSize
				}
				seekSellProductList(options).then((res) => {
					if(res.data.state === 200) {
						//数据表格数据
						this.selWay = null
						this.totalPrice = res.data.data.totalPrice
						this.goodsTypeList.saleList = res.data.data.saleList
//						for(let item of res.data.data.recycleList){
//							item.huigouoprice = -item.price;
//						}
						this.goodsTypeList.recycleList = res.data.data.recycleList
//						for(let item of res.data.data.exchangeList){
//							item.huigouoprice = -item.price;
//						}
						this.goodsTypeList.exchangeList = res.data.data.exchangeList
						if(this.goodsTypeList.saleList.length == 0 && this.goodsTypeList.recycleList.length == 0 && this.goodsTypeList.exchangeList.length == 0) {
							this.isBlank = true
						} else {
							this.isBlank = false
						}
					} else {}

				})
			},
			complate() {
				this.orderPay()
			},
			closeOptions() {
				this.introListOption = !this.introListOption
			},
			getproductTpye: function(parm) { // 商品属性
				return productTpyeState(parm);
			},
			getSeekSellReceiptsIntro() { // 单据简介
				let options = {
					"orderNum": this.$route.query.orderNumber
				}
				seekSellReceiptsIntro(options).then((response) => {
					if(response.data.state === 200) {
						this.receiptsIntroList = response.data.data;
						// this.cashStatus = res.data.data.cashStatus
						this.getShopUserList(response.data.data.shopId)
						this.seekGetTemplateList(response.data.data.shopId)
						if(response.data.data.makeOrderManId == sessionStorage.getItem('id')) {
							this.isMakeMan = true
						}
						if(response.data.data.memberId != '' || response.data.data.memberId != null) {
							this.getMemberInfo(response.data.data.shopId, response.data.data.memberId)
						}
					} else {
						this.$store.dispatch('workPopupError', response.data.msg);
					}
				}, (response) => {})
			},
			getMemberInfo(shopId, memberId) { // 回去会员信息
				if(!memberId) {
					return
				}
				let options = {
					shopId: shopId,
					memberId: memberId
				}
				seekGetMemberInfo(options).then((res) => {
					if(res.data.state == 200) {
						this.memberDataInfo.memberNum = res.data.data.memberNum
						this.memberDataInfo.memberName = res.data.data.username
						this.memberDataInfo.phone = res.data.data.phone
						this.memberDataInfo.cardSrc = res.data.data.cardSrc
						this.memberDataInfo.birthday = res.data.data.birthday
						this.memberDataInfo.email = res.data.data.email
						this.memberDataInfo.wx = res.data.data.weixin
						this.memberDataInfo.industry = res.data.data.profession
						this.memberDataInfo.address = res.data.data.address
						this.memberDataInfo.principalList = res.data.data.principalList
						this.memberDataInfo.remark = res.data.data.remark
						this.memberDataInfo.signList = res.data.data.signList
						this.memberDataInfo.logo = res.data.data.memberLogo
						this.memberDataInfo.createTime = res.data.data.createTime
						this.memberDataInfo.totalMoney = res.data.data.totalMoney
						this.leamemberDataInfo.level = res.data.data.type
					} else {

					}
				}, (res) => {

				})
			},
			// 导出报表
        	exportTab(){
            	let exportTabData = {
					orderNum:this.$route.query.orderNumber,
					type: 1
				}
            	exportTabData['exportType'] = 'XS'
            	console.log(exportTabData)
            	downLoaderFile('/v1/export/exportExcelByBusinss',exportTabData)
        	},
		}
	}
</script>
<style lang="scss" src="../../../assets/css/template/commodityList.scss" scoped></style>
<style lang="scss" src="../../../assets/css/template/remark.scss"></style>
<style scoped>
	#windowPrintView {
		visibility: hidden;
		opacity: 0;
	}
	
	.main-wrap {
		margin: 0 auto;
	}
</style>
<style lang="scss">
	.SeekMember {
		width: 320px;
		height: 270px;
		background: #fff;
		border-radius: 10px;
		padding: 0 30px;
		.el-dialog__header {
			padding: 0;
			width: 260px;
			overflow: hidden;
			position: absolute;
			top: 10px;
			right: 10px;
		}
		.el-dialog__body {
			padding: 0;
		}
		.wrap {
			padding-top: 24px;
			.title {
				width: 46px;
				margin: 0 auto;
				margin-bottom: 30px;
				img {
					width: 46px;
					height: 46px;
					margin-bottom: 10px;
				}
				.name {
					width: 100%;
					text-align: center;
					color: #333;
					font-weight: bold;
				}
			}
			.main {
				input {
					background: #f6f7f8;
					width: 260px;
					height: 36px;
					padding-left: 15px;
					margin-bottom: 30px;
				}
				.confirm-btn {
					width: 150px;
					height: 28px;
					border-radius: 4px;
					font-size: 12px;
					font-weight: bold;
					text-align: center;
					line-height: 28px;
					background: #2993f8;
					color: #fff;
					margin: 0 auto;
					cursor: pointer;
					margin-bottom: 15px;
				}
				p {
					text-align: center;
					color: #2993f8;
					cursor: pointer;
				}
			}
		}
	}
	
	.dropSelClass {
		.el-scrollbar {
			.el-select-dropdown__wrap {
				.el-select-dropdown__list {
					min-width: 115px;
				}
			}
		}
	}
	
	.sel-drop {
		float: right;
		.el-input {
			.el-input__inner {
				height: 28px;
				width: 80px;
				background: #fff;
				border: none;
				padding-right: 10px;
			}
			.el-input__icon {
				width: 10px;
				font-size: 10px;
				line-height: 28px;
			}
		}
	}
	
	.template-selector {
		margin-left: 6px;
		.el-input {
			.el-input__inner {
				height: 28px;
				width: 158px;
				background: #fff;
				border: 1px solid #d6d6d6;
			}
		}
	}
	
	.check-wrap {
		.el-checkbox {
			//float: right;
			height: 28px;
			width: 55px;
			line-height: 28px;
			.el-checkbox__input {
				.el-checkbox__inner {
					border-radius: 4px;
				}
			}
			.el-checkbox__label {
				font-size: 14px;
			}
			.el-checkbox__input.is-checked {
				.el-checkbox__inner {
					background: #2993f8 !important;
					border-color: #2993f8;
				}
			}
		}
	}
	
	.dialogDom {
		width: 320px;
		height: 450px;
		border-radius: 10px;
		overflow: hidden;
		.el-dialog__body {
			padding: 0;
		}
		.el-dialog__header {
			height: 125px;
			position: relative;
			.el-dialog__headerbtn {
				position: absolute;
				top: 10px;
				right: 10px;
				z-index: 11;
			}
		}
		.mask-block {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #fff;
			z-index: 10;
			.dia-title {
				width: 78px;
				position: absolute;
				top: 24px;
				left: 50%;
				margin-left: -39px;
				img {
					display: block;
					margin: 0 auto;
					width: 46px;
					height: 46px;
					margin-bottom: 12px;
				}
				h3 {
					font-size: 12px;
					color: #333;
					text-align: center;
				}
			}
			.list-wrap {
				width: 320px;
				height: 271px;
				padding-top: 200px;
				margin-bottom: 130px;
				.btn-wrap {
					width: 180px;
					height: 70px;
					margin: 0 auto;
					i {
						display: block;
						width: 80px;
						height: 30px;
						font-style: normal;
						text-align: center;
						background: #2993f8;
						color: #fff;
						font-size: 14px;
						line-height: 30px;
						border-radius: 4px;
						float: left;
						cursor: pointer;
					}
					i:nth-child(1) {
						margin-right: 20px;
					}
				}
				.left-list {
					width: 108px;
					height: 100%;
					border-right: 1px solid #f1f2f3;
					float: left;
					overflow-x: hidden;
					overflow-y: auto;
					li {
						width: 108px;
						height: 41px;
						border-bottom: 1px solid #f1f2f3;
						line-height: 41px;
						font-size: 14px;
						color: #333;
						text-align: center;
						cursor: pointer;
						.active-block {
							display: none;
						}
					}
					li:hover {
						background: #f6f7f8;
						color: #2993f8;
					}
					li.active {
						.active-block {
							display: block;
							height: 100%;
							float: left;
							width: 3px;
							background: #2993f8;
						}
					}
				}
				.right-list {
					width: 211px;
					height: 100%;
					float: left;
					overflow-x: hidden;
					overflow-y: auto;
					li {
						width: 192px;
						height: 41px;
						line-height: 41px;
						font-size: 14px;
						color: #333;
						cursor: pointer;
						margin-left: 19px;
					}
					li:hover {
						background: #f6f7f8;
						color: #2993f8;
					}
					li.active {
						color: #2993f8;
					}
				}
			}
			.footer {
				height: 50px;
				width: 100%;
				float: left;
				border-top: 1px solid #f1f2f3;
				padding-left: 22px;
				padding-right: 22px;
				line-height: 50px;
				padding-top: 0;
				background: #fff;
				.footer-left {
					height: 100%;
					float: left;
					font-size: 14px;
					color: #999999;
					cursor: pointer;
				}
				.footer-right {
					height: 100%;
					float: right;
					span {
						float: left;
						font-size: 14px;
						cursor: pointer;
						color: #333;
					}
					span:nth-child(1) {
						margin-right: 15px;
						color: #999;
					}
				}
			}
		}
		.block-class {
			.dia-title {
				width: 78px;
				position: absolute;
				top: 24px;
				left: 50%;
				margin-left: -39px;
				img {
					display: block;
					margin: 0 auto;
					width: 46px;
					height: 46px;
					margin-bottom: 12px;
				}
				h3 {
					font-size: 12px;
					color: #333;
					text-align: center;
				}
			}
			.first-wrap {
				padding-top: 100px;
				box-sizing: border-box;
			}
			.list-wrap {
				width: 320px;
				height: 271px;
				.btn-wrap {
					width: 180px;
					height: 70px;
					margin: 0 auto;
					i {
						display: block;
						width: 80px;
						height: 30px;
						font-style: normal;
						text-align: center;
						background: #2993f8;
						color: #fff;
						font-size: 14px;
						line-height: 30px;
						border-radius: 4px;
						float: left;
						cursor: pointer;
					}
					i:nth-child(1) {
						margin-right: 20px;
					}
				}
				.left-list {
					width: 108px;
					height: 100%;
					border-right: 1px solid #f1f2f3;
					float: left;
					overflow-x: hidden;
					overflow-y: auto;
					li {
						width: 108px;
						height: 41px;
						border-bottom: 1px solid #f1f2f3;
						line-height: 41px;
						font-size: 14px;
						color: #333;
						text-align: center;
						cursor: pointer;
						.active-block {
							display: none;
						}
					}
					li:hover {
						background: #f6f7f8;
						color: #2993f8;
					}
					li.active {
						.active-block {
							display: block;
							height: 100%;
							float: left;
							width: 3px;
							background: #2993f8;
						}
					}
				}
				.right-list {
					width: 211px;
					height: 100%;
					float: left;
					overflow-x: hidden;
					overflow-y: auto;
					li {
						width: 192px;
						height: 41px;
						line-height: 41px;
						font-size: 14px;
						color: #333;
						cursor: pointer;
						margin-left: 19px;
					}
					li:hover {
						background: #f6f7f8;
						color: #2993f8;
					}
					li.active {
						color: #2993f8;
					}
				}
			}
			.footer {
				height: 50px;
				width: 100%;
				float: left;
				border-top: 1px solid #f1f2f3;
				padding-left: 22px;
				padding-right: 22px;
				line-height: 50px;
				padding-top: 0;
				background: #fff;
				.footer-left {
					height: 100%;
					float: left;
					font-size: 14px;
					color: #999999;
					cursor: pointer;
				}
				.footer-right {
					height: 100%;
					float: right;
					span {
						float: left;
						font-size: 14px;
						cursor: pointer;
						color: #333;
					}
					span:nth-child(1) {
						margin-right: 15px;
						color: #999;
					}
				}
			}
		}
	}
	
	.cashierDia {
		border-radius: 10px;
		overflow: hidden;
		width: 600px;
		height: 460px;
		.title {
			float: left;
		}
		.cashier-body {
			.cashier-info {
				width: 543px;
				height: 100px;
				background: #eef7fe;
				border-radius: 10px;
				margin: 0 auto;
				position: relative;
				.info-left {
					width: 271px;
					height: 100%;
					float: left;
					text-align: right;
					padding-right: 34px;
					.wrap {
						display: inline-block;
					}
					.money-box {
						margin-top: 30px;
						color: #ff3b30;
						font-size: 18px;
						font-weight: bold;
						span {
							color: #b1b3b6;
							font-size: 14px;
							margin-left: 8px;
							font-weight: normal;
						}
					}
					span {
						font-size: 14px;
						color: #333;
					}
				}
				.info-left:after {
					content: '';
					height: 30px;
					width: 1px;
					background: #2993f8;
					position: absolute;
					left: 271px;
					top: 36px;
				}
				.info-right {
					width: 271px;
					height: 100%;
					float: right;
					text-align: left;
					padding-left: 34px;
					.money-box {
						margin-top: 30px;
						color: #2993f8;
						font-size: 18px;
						font-weight: bold;
						span {
							color: #b1b3b6;
							font-size: 14px;
							margin-left: 8px;
							font-weight: normal;
						}
					}
					span {
						font-size: 14px;
						color: #333;
					}
				}
			}
			.cashier-main {
				width: 543px;
				margin: 0 auto;
				height: 160px;
				margin-top: 42px;
				.cashier-block {
					height: 80px;
					width: 181px;
					float: left;
					.block-main {
						height: 36px;
						width: 100%;
						img {
							width: 30px;
							height: 30px;
							float: left;
							margin-right: 18px;
						}
						.input-main {
							float: left;
							width: 133px;
							height: 36px;
							input {
								background: #f6f7f8;
								border-radius: 4px;
								width: 118px;
								height: 36px;
								padding-left: 7px;
							}
							div {
								line-height: 36px;
								font-size: 14px;
								span {
									margin-left: 4px;
									color: #b6b6b6;
									font-size: 10px;
								}
							}
						}
					}
					.name {
						color: #2993f8;
						font-size: 12px;
						margin-top: 6px;
						width: 133px;
						float: right;
						padding-left: 7px;
					}
				}
			}
			.cashier-footer {
				width: 543px;
				height: 28px;
				margin: 0 auto;
				margin-top: 34px;
				.btn {
					width: 90px;
					height: 28px;
					background: #2993f8;
					color: #fff;
					text-align: center;
					line-height: 28px;
					float: right;
					border-radius: 4px;
					margin-left: 20px;
					cursor: pointer;
				}
				.btn.active {
					cursor: default;
					background: #d6d6d6;
				}
				.revoke-btn {
					width: 90px;
					height: 28px;
					text-align: center;
					line-height: 28px;
					border: 1px solid #d6d6d6;
					color: #fe4840;
					float: right;
					border-radius: 4px;
					margin-left: 20px;
					cursor: pointer;
				}
				.check-wrap {
					float: right;
				}
			}
		}
	}
</style>
<style lang="scss" scoped>
	@media screen {
		.template-print-canvas {
			opacity: 0;
		}
	}
	
	@media print {
		body {
			background-color: #fff;
		}
		.body-box-left {
			display: none;
		}
		.template-print-canvas {
			opacity: 1;
			page-break-after: avoid;
		}
	}
	
	// ******************************** 过渡动画 ********************************
	.mask-fade-enter-active,
	.mask-fade-leave-active {
		transition: all .3s ease;
	}
	
	.mask-fade-enter,
	.mask-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */
	
	{
		opacity: 0;
	}
	
	.slide-fade-enter-active,
	.slide-fade-leave-active {
		transition: all .4s ease;
		transform-origin: center bottom;
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to // .slide1-fade-enter, .slide-fade1-leave-to, .slide-fade2-enter, .slide-fade2-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */
	
	{
		transform: scaleY(0);
	}
	
	// ******************************** 过渡动画 ********************************
	.new-table-wrap {
		width: 100%;
		height: 870px;
	}
	
	.page-wrap {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		top: 0;
		left: 0;
		z-index: 200;
	}
	
	.new-table-template {
		width: 100%;
		height: 100%;
		.body-box {
			position: relative;
			display: -webkit-flex;
			/* Safari */
			display: flex;
			flex-direction: column;
			width: 1250px;
			box-sizing: border-box;
			padding-right: 10px;
			padding-bottom: 120px;
			padding-top: 30px;
			margin: 0 auto;
			.body-header {
				height: 40px;
				width: 1250px;
				overflow: visible;
				margin: 0;
				background: #f5f8f7;
				box-sizing: border-box;
				margin-bottom: 30px;
				.member-btn {
					width: 205px;
					height: 34px;
					float: right;
					line-height: 34px;
					margin-right: 40px;
					.member-info {
						width: 205px;
						height: 35px;
						position: relative;
						&:hover {
							.drop-block {
								display: block;
							}
						}
						.info-wrap {
							position: absolute;
							top: 0;
							left: 0;
							z-index: 2;
							&>img {
								width: 34px;
								height: 34px;
								float: left;
								margin-left: 4px;
								margin-right: 8px;
							}
							.name {
								font-size: 12px;
								color: #333;
								float: left;
								margin-right: 12px;
							}
							.phone {
								font-size: 12px;
								color: #333;
								float: left;
							}
						}
						.bg {
							//
							height: 29px;
							width: 205px;
							position: absolute;
							background: url('./../../../../static/img/member/yellow.png') no-repeat right center;
							left: 0;
							top: 3px;
							z-index: 0;
							border-top-left-radius: 10px;
							border-bottom-left-radius: 10px;
							.mask {
								background: #ffba43;
								width: 193px;
								float: left;
								height: 100%;
								border-top-left-radius: 10px;
								border-bottom-left-radius: 10px;
							}
						}
						.drop-block {
							display: none;
							width: 190px;
							height: 55px;
							background: #fff;
							border-radius: 2px;
							box-shadow: 0 0 3px 5px rgba(0, 0, 0, 0.05);
							position: absolute;
							bottom: -54px;
							left: 0;
							z-index: 20;
							padding: 13px 10px;
							.btn {
								width: 70px;
								height: 26px;
								border-radius: 4px;
								text-align: center;
								line-height: 26px;
								float: left;
								font-size: 14px;
								cursor: pointer;
							}
							.replace {
								border: 1px solid #2993f8;
								margin-right: 30px;
								color: #2993f8;
							}
							.delete {
								border: 1px solid #dbdbdb;
								color: #333;
							}
						}
					}
					.member-info1 {
						width: 205px;
						height: 35px;
						position: relative;
						cursor: pointer;
						.info-wrap {
							position: absolute;
							top: 0;
							left: 0;
							z-index: 2;
							&>img {
								width: 34px;
								height: 34px;
								float: left;
								margin-left: 4px;
								margin-right: 8px;
							}
							.name {
								font-size: 12px;
								color: #333;
								float: left;
								margin-right: 12px;
							}
							.phone {
								font-size: 12px;
								color: #333;
								float: left;
							}
						}
						.bg {
							//
							height: 29px;
							width: 205px;
							position: absolute;
							background: url('./../../../../static/img/member/gray.png') no-repeat right center;
							left: 0;
							top: 3px;
							z-index: 0;
							border-top-left-radius: 10px;
							border-bottom-left-radius: 10px;
							.mask {
								background: #d6d6d6;
								width: 193px;
								float: left;
								height: 100%;
								border-top-left-radius: 10px;
								border-bottom-left-radius: 10px;
							}
						}
					}
				}
				.back-btn {
					cursor: pointer;
					width: 90px;
					height: 28px;
					float: right;
					background: #2993f8;
					color: #fff;
					border-radius: 4px;
					text-align: center;
					line-height: 28px;
					font-size: 12px;
					font-weight: bold;
					margin-top: 5px;
					transition: all .3s;
					&:hover {
						background: #057aea;
					}
				}
			}
			.color1 {
				// 待审核
				&:before {
					background: #ffba42;
				}
				&:after {
					background-color: #a87825;
				}
			}
			.color2 {
				// 审核中
				&:before {
					background: #ff9b42;
				}
				&:after {
					background-color: #bf7431;
				}
			}
			.color3 {
				// 已审核
				&:before {
					background: #f5743c;
				}
				&:after {
					background-color: #c25c30;
				}
			}
			.color4 {
				// 待收货
				&:before {
					background: #b793e6;
				}
				&:after {
					background-color: #786394;
				}
			}
			.color5 {
				// 已收货
				&:before {
					background: #6c62e6;
				}
				&:after {
					background-color: #4f48a9;
				}
			}
			.color6 {
				// 锁定
				&:before {
					background: #ec625f;
				}
				&:after {
					background-color: #a74543;
				}
			}
			.color7 {
				// 待收银
				&:before {
					background: #c3d5dd;
				}
				&:after {
					background-color: #98a6ac;
				}
			}
			.color8 {
				// 已收银
				&:before {
					background: #5594b8;
				}
				&:after {
					background-color: #3b6780;
				}
			}
			.body-row2 {
				height: 200px;
				width: 1215px;
				margin-bottom: 30px;
				position: relative;
				background: #fff;
				border-radius: 10px;
				box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
				padding-left: 78px;
				.mask {
					height: 100%;
					width: 70px;
					position: absolute;
					left: 0;
					top: 0;
					background: #fff;
					z-index: 1;
					border-top-left-radius: 10px;
					border-bottom-left-radius: 10px;
				}
				&:before {
					content: attr(data-status);
					display: block;
					width: 77px;
					height: 35px;
					line-height: 35px;
					// background-color: #ffba42;
					color: #fff;
					transform: translateY(-18px);
					font-weight: bold;
					font-size: 16px;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					position: absolute;
					left: -10px;
					top: 50%;
					border-radius: 4px;
					z-index: 3;
				}
				&:after {
					content: '';
					display: block;
					height: 10px;
					width: 10px;
					position: absolute;
					z-index: 0;
					left: 7px;
					top: 50%;
					transform: rotate(45deg) translateY(17px);
				}
				.statusInfo {
					height: 100%;
					width: 791px;
					padding-top: 38px;
					padding-right: 50px;
					position: relative;
					float: left;
					.left-main {
						height: 100px;
						float: left;
						&>h5 {
							font-size: 16px;
							color: #2993f8;
							font-weight: bold;
							margin-bottom: 25px;
						}
						.select-container {
							width: 300px;
							.item {
								width: 80px;
								margin: 0 20px;
								height: 30px;
								float: left;
								white-space: nowrap;
								text-overflow: ellipsis;
								span {
									color: #666;
									font-size: 14px;
									font-weight: bold;
									line-height: 30px;
								}
							}
						}
					}
					.right-main {
						height: 100px;
						float: right;
						.right-main-first {
							float: left;
							.right-main-item {
								min-width: 99px;
								height: 100%;
								float: left;
								.item-title {
									width: 100%;
									height: 38px;
									font-size: 14px;
									color: #333;
									white-space: nowrap;
									&>span {
										font-size: 12px;
										color: #999;
									}
								}
								.item-type {
									font-size: 14px;
									color: #999999;
								}
							}
						}
						.right-main-last {
							float: right;
							.creat-time {
								height: 20px;
								text-align: center;
								font-size: 12px;
								color: #999999;
								margin-bottom: 10px;
							}
							.creat-man {
								height: 24px;
								font-size: 12px;
								color: #999999;
								img {
									width: 24px;
									height: 24px;
									float: left;
									border-radius: 50%;
									margin-right: 10px;
								}
							}
						}
					}
					.bottom-bar {
						width: 740px;
						height: 20px;
						float: left;
						li {
							float: left;
							margin-right: 20px;
							margin-left: 20px;
							i {
								font-style: normal;
							}
							span {
								font-size: 14px;
								color: #333;
								i {
									font-size: 12px;
									color: #999999;
								}
							}
							span:nth-child(1) {
								font-weight: bold;
								color: #666666;
							}
						}
						li:first-child {
							margin-left: 0;
						}
						li:last-child {
							margin-right: 0;
						}
					}
					.line {
						width: 1px;
						height: 95px;
						background: #d6d6d6;
						position: absolute;
						right: 0;
						top: 50px;
					}
				}
				.cashierInfo {
					float: right;
					width: 346px;
					height: 100%;
					padding: 38px 40px 0;
					.cash-tittle {
						height: 20px;
						.cashier {
							color: #999;
							font-size: 12px;
							float: left;
						}
						.time {
							float: right;
							color: #999;
							font-size: 12px;
						}
					}
					.cash-content {
						height: 88px;
						overflow-y: auto;
						.title-info {
							text-align: center;
							margin-top: 20px;
							&>span {
								color: #2993f8;
							}
						}
						.cash-item {
							width: 132px;
							height: 40px;
							float: left;
							.item-main:nth-child(1) {
								width: 32px;
								float: left;
								height: 100%;
								img {
									width: 16px;
									height: 16px;
								}
							}
							.item-main:nth-child(2) {
								width: 100px;
								height: 100%;
								float: left;
								&>div {
									height: 18px;
									font-size: 12px;
									color: #333;
									span {
										font-size: 10px;
										color: #999;
									}
								}
								&>span {
									font-size: 12px;
									color: #999
								}
							}
						}
					}
					.cash-footer {
						.total {
							font-size: 14px;
							color: #666;
							font-weight: bold;
							i {
								font-weight: normal;
								font-style: normal;
								font-size: 14px;
								color: #ff3b30;
								margin-left: 16px;
								em {
									font-style: normal;
									font-size: 10px;
									color: #999;
								}
							}
						}
						.change {
							font-size: 14px;
							color: #666;
							font-weight: bold;
							float: right;
							max-width: 120px;
							text-aligin: right;
							i {
								font-weight: normal;
								font-style: normal;
								font-size: 14px;
								color: #333;
								margin-left: 16px;
								em {
									font-style: normal;
									font-size: 10px;
									color: #999;
								}
							}
						}
					}
				}
			}
			.body-row4 {
				min-width: 1215px;
				height: 547px;
				position: relative;
				.row4-tittle {
					font-size: 16px;
					color: #333;
					font-weight: bold;
					height: 38px;
					width: 1250px;
					position: relative;
					.tittle-left {
						float: left;
					}
					.tittle-right {
						position: absolute;
						right: 0;
						top: 0;
						z-index: 210;
						span {
							font-size: 12px;
							color: #2993f8;
						}
						input {
							width: 150px;
							height: 28px;
							border: 1px solid #ececec;
							border-radius: 40px;
							text-align: center;
							font-size: 12px;
							color: #999;
						}
						.tooltip {
							position: absolute;
							bottom: -30px;
							right: 30px;
							z-index: 20;
							color: #fff;
							background: #000;
							padding: 4px 6px;
							border-radius: 4px;
						}
					}
				}
				.row4-data-main {
					width: 1215px;
					height: 496px;
					white-space: nowrap;
					.row4-main-wrap {
						padding: 10px 10px;
					}
					.no-data {
						padding: 10px 10px;
						background: #fff;
						border-radius: 10px;
						width: 1215px;
						height: 480px;
						box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
						.no-data-wrap {
							width: 310px;
							margin: 0 auto;
							img {}
							.btn-wrap {
								height: 28px;
								width: 100%;
								.btn {
									width: 76px;
									height: 28px;
									background: #2993f8;
									float: left;
									border-radius: 4px;
									color: #fff;
									text-align: center;
									line-height: 28px;
									font-size: 12px;
									font-weight: bold;
									cursor: pointer;
								}
								.sell {
									margin-right: 74px;
									margin-left: 38px;
								}
							}
						}
					}
				}
				.btn-list {
					position: absolute;
					right: -68px;
					bottom: 20px;
					background: #fff;
					border: 1px solid #ededed;
					width: 52px;
					min-height: 52px;
					border-radius: 5px;
					overflow: hidden;
					.btn {
						width: 50px;
						height: 51px;
						position: relative;
						cursor: pointer;
						overflow: hidden;
						border-bottom: 1px solid #ededed;
						span {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 100%;
							height: 100%;
							text-align: center;
							transition: all ease .2s;
						}
						.iconfont {
							font-size: 24px;
						}
						span:nth-child(1) {
							opacity: 1;
							color: #999999;
						}
						span:nth-child(2) {
							opacity: 0;
							position: absolute;
							top: 0px;
							left: 0px;
							font-size: 14px;
							padding: 0 6px;
							background: #2993f8;
							color: #fff;
						}
					}
					.btn:last-child {
						border-bottom: none;
					}
					.btn:hover {
						span:nth-child(1) {
							opacity: 0;
						}
						span:nth-child(2) {
							opacity: 1;
						}
					}
				}
			}
			.cashier-box {
				width: 800px;
				height: 200px;
				background: #fff;
				border-radius: 10px;
				box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
				margin: 0 auto;
				.cashier-title {
					padding-left: 20px;
					padding-right: 20px;
					height: 50px;
					width: 100% !important;
					h3 {
						line-height: 50px;
						float: left;
					}
					span {
						line-height: 50px;
						float: right;
					}
				}
				.cashier-content {
					height: 100px;
					padding-left: 20px;
					padding-right: 20px;
					width: 100% !important;
					box-sizing: border-box;
					.item-box {
						width: 100px;
						height: 100px;
						float: left;
						background: #e8e8e8;
						margin-right: 20px;
						position: relative;
						padding-top: 10px;
						.num {
							text-align: center;
							font-size: 14px;
							color: #333;
						}
						.unit {
							text-align: center;
							position: absolute;
							width: 100%;
							height: 20px;
							bottom: 10px;
							left: 0;
							font-size: 14px;
							color: #666;
						}
					}
					.item-little-box {
						height: 36px;
						width: 200px;
						float: left;
						margin-right: 20px;
						margin-bottom: 20px;
						span {
							img {
								float: left;
								display: block;
								margin-right: 5px;
								margin-top: 6px;
							}
							display: block;
							float: left;
							font-size: 14px;
							color: #333;
							line-height: 36px;
						}
						input {
							border: 1px solid #ddd;
							border-radius: 4px;
							width: 120px;
							height: 36px;
							float: right;
						}
						div {
							float: right;
							width: 120px;
							height: 36px;
							line-height: 36px;
						}
					}
					.item-little-box:nth-child(4) {
						margin-right: 0;
					}
					.item-little-box:nth-child(7) {
						margin-right: 0;
					}
				}
				.cashier-footer {
					height: 50px;
					width: 100%;
					line-height: 40px;
					p {
						height: 40px;
						float: right;
						text-align: right;
						font-size: 14px;
						color: #fe4444;
						padding-right: 20px;
					}
				}
			}
			.body-row5 {
				margin: 0 auto;
				height: 58px;
				width: 1250px;
				background: #fff;
				border-radius: 10px;
				box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
				margin-bottom: 30px;
				position: fixed;
				bottom: 0;
				left: 190px;
				z-index: 20;
				.btn-wrap {
					width: 880px;
					height: 100%;
					margin: 0 auto;
					display: flex;
					justify-content: center;
					.btn {
						width: 90px;
						height: 36px;
						color: #fff;
						background: #2993f8;
						float: left;
						border-radius: 4px;
						font-size: 14px;
						text-align: center;
						line-height: 36px;
						font-weight: bold;
						margin-top: 13px;
						margin-right: 56px;
						cursor: pointer;
						transition: all .3s;
						&:hover {
							background: #057aea;
						}
					}
				}
				.el-icon-delete2 {
					position: absolute;
					right: 10px;
					top: 16px;
					font-size: 30px;
					color: #2993f8;
					cursor: pointer;
				}
			}
			.operat-box {
				width: 1250px;
			}
		}
	}
	
	.new-template-table {
		width: 100%;
		height: 100%;
		background-color: #e8e9eb;
		.tr-header {
			background-color: #fff!important;
			&:hover {
				background-color: #e8e9eb;
			}
			.header-state {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				li:first-child {
					background-color: #e8e9eb;
				}
				li {
					height: 40px;
					line-height: 40px;
					border-bottom: 1px solid #d6d6d6;
					background-color: #fff;
				}
			}
		}
		tr {
			height: 40px;
			width: 100%;
		}
		tr:nth-child(odd) {
			background-color: #f6f7f8;
		}
		tr:nth-child(even) {
			background-color: #fff;
		}
		tr {
			&:hover {
				background-color: #e6f8f6;
			}
		}
		th,
		td {
			text-align: center;
			font-size: 12px;
			height: 60px;
			overflow: hidden;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		th {
			color: #666;
			position: relative;
			font-size: 14px;
			background: #fff;
			span {
				vertical-align: middle;
			}
			.open-icon {
				vertical-align: middle;
				position: absolute;
				right: 0;
				top: -10px;
				padding-top: 10px;
				width: 20px;
				margin-top: 14px;
				cursor: pointer;
			}
		}
		td {
			color: #333;
		}
		.table-pull {
			padding: 0!important;
		}
		.del-product {
			cursor: pointer;
		}
	}
	
	#mysellspanstyle {
		display: block;
		width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}
	
	.item-name {
		font-size: 12px;
		color: #a9a8a7;
	}
</style>

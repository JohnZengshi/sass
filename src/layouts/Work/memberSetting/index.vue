<template>
    <div class="member-points-wrap"> 
        <!-- 头部title begin -->
        <h1 class="header-title">
            <i class="iconfont icon-dianpu"></i>  店铺设置 > <span>会员积分</span> 
        </h1>
        <!-- 头部title end -->
        <!-- 内容主体 begin-->
        <div class="member-content">
            <!-- 标题 0.1 begin -->
            <div class="content-title">
                <i class="iconfont icon-liebiao"></i>
                <span>积分兑换配置</span>
            </div>
            <!-- 标题 0.1 end -->

            <!-- 积分模板应用店铺 0.2 begin -->
            <div class="shop-setting">
                <div class="shop-setting-title">
                    <p>积分模板应用店铺</p>
                </div>
                <!-- 店铺复选框 -->
                <el-checkbox-group class="shop-setting-content" v-model="checkList">
                    <el-checkbox class="checkbox-item" @change="setShopTemplat(item)" :disabled="item.binding === 'Y' || isDisabled" :label="item.shopId" v-for="(item,index) in shopList" :key="index"><span>{{item.shopName}}</span></el-checkbox>
                </el-checkbox-group>

            </div>
            <!-- 积分模板应用店铺 0.2 end -->

            <!-- 积分加减规则 0.3 begin-->
            <div class="integral-add-subtract">
                <div class="integral-setting-title">
                    <p>积分加减法规则
                       <swichs :isDisabled="isDisabled" :type="'addOrSubConfig'" :status="templateInfoData.addOrSubConfig" @switchChange="switchChange"></swichs>
                    </p>
                </div>
                <div class="integral-content">
                    <!-- 销售 -->
                    <div class="integral-xs">
                        <div class="integral-left xs">销售</div>
                            <el-radio-group class="integral-right" v-model="templateInfoData.sellConfig" @change="addOrSubTemplate('1',templateInfoData.sellConfig)">
                                <el-radio class="intergral-item" :label="'1'">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="'2'">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="'3'">无</el-radio>
                            </el-radio-group>
                    </div>
                    <!-- 退货 -->
                    <div class="integral-th">
                        <div class="integral-left th">退货</div>
                            <el-radio-group class="integral-right" v-model="templateInfoData.refundConfig" @change="addOrSubTemplate('2',templateInfoData.refundConfig)">
                                <el-radio class="intergral-item" :label="'1'">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="'2'">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="'3'">无</el-radio>
                            </el-radio-group>
                    </div>
                    <!-- 换货 -->
                    <div class="integral-hh">
                        <div class="integral-left hh">换货</div>
                            <el-radio-group class="integral-right" v-model="templateInfoData.exchangeConfig" @change="addOrSubTemplate('3',templateInfoData.exchangeConfig)">
                                <el-radio class="intergral-item" :label="'1'">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="'2'">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="'3'">无</el-radio>
                            </el-radio-group>
                    </div>
                    <!-- 回收 -->
                    <div class="integral-hs">
                        <div class="integral-left hs">回收</div>
                            <el-radio-group class="integral-right" v-model="templateInfoData.recoveryConfig" @change="addOrSubTemplate('4',templateInfoData.recoveryConfig)">
                                <el-radio class="intergral-item" :label="'1'">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="'2'">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="'3'">无</el-radio>
                            </el-radio-group>
                    </div>
                    <div v-if="isDisabled" class="modalBox"></div>
                </div>
            </div>
            <!-- 积分加减规则 0.3 end-->

            <!-- 产品类别-消费发放配置 .4 begin -->
            <div class="product-setting">
                <div class="all-title">
                    <p>产品类别-消费发放配置
                        <swichs :isDisabled="isDisabled" :type="'productTypeConfig'" :status="templateInfoData.productTypeConfig" @switchChange="switchChange"></swichs>
                    </p>
                </div>
                <div class="product-setting-content">
                    <!-- 计重类 begin -->
                    <div class="producet-jz" v-if="templateInfoData.poductTypeList[0].classesType == 1">
                        <div class="title">
                            <span>计重类</span>
                            <el-button v-if="!isDisabled" type="primary" size="mini" @click="jzSetting">批量设置</el-button>
                        </div>
                        <div class="content">
                            <div class="item" v-for="(item,index) in templateInfoData.poductTypeList[0].typeList" :key="index">
                                <p class="item-title">{{ item.classesName }}</p>
                                <p class="item-input">
                                    <input type="number" @blur="setConsumeTemplateUpdate(item)" v-model="item.yuan" :disabled="isDisabled">
                                    <input type="number" @blur="setConsumeTemplateUpdate(item)" v-model="item.score" :disabled="isDisabled">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 计重类 end -->

                    <!-- 计件类 begin -->
                    <div class="porducet-jj" v-if="templateInfoData.poductTypeList[1].classesType == 2">
                        <div class="title">
                            <span>计件类</span>
                            <el-button v-if="!isDisabled" type="primary" size="mini" @click="jjsetting">批量设置</el-button>
                        </div>
                        <div class="content">
                            <div class="item" v-for="(item,index) in templateInfoData.poductTypeList[1].typeList" :key="index">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="number" @blur="setConsumeTemplateUpdate(item)" v-model="item.yuan" :disabled="isDisabled">
                                    <input type="number" @blur="setConsumeTemplateUpdate(item)" v-model="item.score" :disabled="isDisabled">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 计件类 end -->
                </div>
            </div>
            <!-- 产品类别-消费发放配置 .4 end -->

            <!-- 积分发放配置 .5 begin -->
            <div class="issue">
                <div class="all-title">
                    <p>积分发放配置
                        <swichs :isDisabled="isDisabled" :type="'othenConfig'" :status="templateInfoData.othenConfig" @switchChange="switchChange"></swichs>
                        <el-button v-if="!isDisabled" class="fr" type="primary" size="small" @click="dialogVisible = true">+ 配置条件</el-button>
                    </p>
                </div>
                <div class="issue-content">
                    <div v-for="(item,index) in templateInfoData.othenList" :key="index">
                        <!-- 注册 -->
                        <div class="item" v-show="item.othenName == '1'" >
                            <div class="item-circle"></div>
                            <span class="item-title">注册福利：</span>
                            <span>注册成为会员，赠送</span>
                            <span class="input-box">
                                <!-- <el-input v-model="item.score" class="item-input" :disabled="isDisabled" @blur="othenTemplateTemplate('1','1',item.score)"></el-input>                                 -->
                                <input type="number" @blur="othenTemplateTemplate('3','1',item.score,item.othenId)" v-model="item.score" :disabled="isDisabled">
                            </span>
                            <span>分</span>
                            <i class="el-icon-delete" v-if="!isDisabled" @click="delConfiguration(1)"></i>
                        </div>
                        <!-- 生日 -->
                        <div class="item" v-show="item.othenName == '2'">
                            <div class="item-circle"></div>
                            <span class="item-title">生日福利：</span>
                            <span>会员生日当天，赠送</span>
                            <span class="input-box">
                                <!-- <el-input v-model="item.score" class="item-input" :disabled="isDisabled" @blur="othenTemplateTemplate('1','2',item.score)"></el-input> -->
                                <input type="number" @blur="othenTemplateTemplate('3','2',item.score,item.othenId)" v-model="item.score" :disabled="isDisabled">
                            </span>
                            <span>分</span>
                            <i class="el-icon-delete" v-if="!isDisabled" @click="delConfiguration(2)"></i>
                            
                        </div>
                        <!-- 签到 -->
                        <div class="item" v-show="item.othenName == '3'">
                            <div class="item-circle"></div>
                            <span class="item-title">签到福利：</span>
                            <span>会员单次签到，赠送</span>
                            <span class="input-box">
                                <!-- <el-input v-model="item.score" class="item-input" :disabled="isDisabled" @blur="othenTemplateTemplate('1','3',item.score)"></el-input> -->
                                <input type="number" @blur="othenTemplateTemplate('3','3',item.score,item.othenId,item.continuousSign)" v-model="item.score" :disabled="isDisabled">
                            </span>
                            <span class="fg-fen">分；</span>
                            <span>会员连续签到，赠送</span>
                            <span class="input-box">
                                <!-- <el-input v-model="item.continuousSign" class="item-input" :disabled="isDisabled" @blur="othenTemplateTemplate('2','3',item.continuousSign)"></el-input> -->
                                <input type="number" @blur="othenTemplateTemplate('3','3',item.score,item.othenId,item.continuousSign)" v-model="item.continuousSign" :disabled="isDisabled">
                            </span>
                            <span>分</span>
                            <i class="el-icon-delete" v-if="!isDisabled" @click="delConfiguration(3)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 积分发放配置 .5 end -->

            <!-- 积分消耗配置 .6 begin -->
            <div class="consumption">
                <div class="all-title">
                    <p>积分消耗配置
                        <swichs :isDisabled="isDisabled" :type="'consumeConfig'" :status="templateInfoData.consumeConfig" :templateInfoData="templateInfoData" @switchChange="switchChange"></swichs>
                    </p>
                </div>
                <div class="consumption-content">
                    <!-- 抵现 -->
                    <div class="item">
                        <div class="item-circle"></div>
                        <span class="item-title">积分抵现：</span>
                        <span>每次使用</span>
                        <span class="input-box">
                            <!-- <el-input :disabled="isDisabled" class="item-input" v-model="templateInfoData.consumeScore" @blur="consumeIntegralTemplate('4',templateInfoData.consumeScore)"></el-input> -->
                                <input type="number" v-model="templateInfoData.consumeScore" @blur="consumeIntegralTemplate('4',templateInfoData.consumeScore)" :disabled="isDisabled">
                            
                        </span>
                        <span>分，</span>
                        <span>可抵</span>
                        <span class="input-box">
                            <!-- <el-input :disabled="isDisabled" class="item-input" v-model="templateInfoData.consumeYuan" @blur="consumeIntegralTemplate('3',templateInfoData.consumeYuan)"></el-input> -->
                            <input type="number" v-model="templateInfoData.consumeYuan" @blur="consumeIntegralTemplate('3',templateInfoData.consumeYuan)" :disabled="isDisabled">
                        </span>
                        <span>元</span>
                    </div>
                    <!-- 计重上限 -->
                    <div class="item">
                        <div class="item-circle"></div>
                        <span class="item-title">计重抵扣上限：</span>
                        <span>最多可抵扣单价实售价</span>
                        <span class="input-box">
                            <!-- <el-input :disabled="isDisabled" class="item-input" v-model="templateInfoData.weightConfig" @blur="consumeIntegralTemplate('6',templateInfoData.weightConfig)"></el-input> -->
                            <input type="number" v-model="templateInfoData.weightConfig" @blur="consumeIntegralTemplate('6',templateInfoData.weightConfig)" :disabled="isDisabled">                            
                        </span>
                        <span>%</span>
                    </div>
                    <!-- 计件上限 -->
                    <div class="item">
                        <div class="item-circle"></div>
                        <span class="item-title">计件抵扣上限：</span>
                        <span>最多可抵扣单价实售价</span>
                        <span class="input-box">
                            <!-- <el-input :disabled="isDisabled" class="item-input" v-model="templateInfoData.pieceConfig" @blur="consumeIntegralTemplate('5',templateInfoData.pieceConfig)"></el-input> -->
                            <input type="number" v-model="templateInfoData.pieceConfig" @blur="consumeIntegralTemplate('5',templateInfoData.pieceConfig)" :disabled="isDisabled"> 
                        </span>
                        <span>%</span>
                    </div>
                    <!-- 计重计件相互抵扣 -->
                    <div class="item">
                        <div class="item-circle"></div>
                        <span class="item-title">计重计件是否相互抵扣：</span>
                        <el-radio-group v-model="templateInfoData.deductible" @change="consumeIntegralTemplate('7',templateInfoData.deductible)">
                            <el-radio :label="'N'">抵扣</el-radio>
                            <el-radio :label="'D'">不抵扣</el-radio>
                        </el-radio-group>
                    </div>
                    <!-- 消耗匹配类型 -->
                    <div class="item">
                        <div class="item-circle"></div>
                        <span class="item-title">消耗匹配类型：</span>
                        <el-radio-group v-model="templateInfoData.matchingType" @change="consumeIntegralTemplate('8',templateInfoData.matchingType)">
                            <el-radio :label="'1'">销售</el-radio>
                            <el-radio :label="'2'">购买</el-radio>
                            <el-radio :label="'3'">实收</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="isDisabled" class="modalBox"></div>
                    
                </div>
            </div>
            <!-- 积分消耗配置 .6 end -->
        </div>
        <!-- 内容主体 end-->

        <!-- 批量设置 配置条件弹框  -->
        <memberDialog 
            :dialog="dialog"
            @closeDialog="closeDialog"
            @dialogType = "dialogType"
            @dialogCallback="dialogCallback"
        ></memberDialog>

        <!-- 积分发放配置 -->
        <el-dialog :visible.sync="dialogVisible" custom-class="dialogDom" element-loading-text="拼命加载中">
			<div class="sell-type-one-main">
				<div class="dia-title" slot="title">
					<img src="~static/img/smartimport.png">
					<h3>添加配置条件</h3>
				</div>
				<div class="list-wrap first-wrap">
					<div id="btn-wrap" class="btn-wrap">
						<li :class="zcitem ? 'disabledActive' : ''" @click="addConfiguration(1)">注册福利</li>
						<li :class="sritem ? 'disabledActive' : ''" @click="addConfiguration(2)">生日福利</li>
						<li :class="qditem ? 'disabledActive' : ''" @click="addConfiguration(3)">签到福利</li>
					</div>
				</div>
  			</div>
		</el-dialog>

    </div>
</template>

<style lang="scss" scoped>
$fontColor:#47a3fb;
.member-points-wrap {
    width: 1250px;
    margin: 0 auto;
    margin-top: 40px;
    h1 {
        font-size: 16px;
        color:#4e4e4e;        
        i{
            color: $fontColor;
        }
        span{
            color: $fontColor;            
        }
        margin-bottom: 30px;
    }
    .member-content {
        // height: 730px;
        background-color: #fff;
        box-shadow: 0px 0 15px #ddd;
        border-radius: 10px;
        .content-title {
            height: 50px;
            line-height: 50px;
            margin-bottom: 20px;
            padding: 0 15px 0 25px;
            color:#333;
            i {
                color: $fontColor;
            }
        }
        .shop-setting{
            height: 250px;
            padding: 0 40px;
            margin-bottom: 40px;
            .shop-setting-title{
                margin-bottom: 30px;
                p{
                    position: relative;
                    padding-left: 10px;
                    color: #666;
                    font-weight: bold;
                    &::before{
                        content: '';
                        position: absolute;
                        top: 3px;
                        left: 0;
                        display: inline-block;
                        width: 2px;
                        height: 17px;
                        background: $fontColor;
                    }
                }
            }
            .shop-setting-content {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: 200px;
                padding: 30px 34px;
                background: #f6f7f8;
                border-radius: 10px;

                overflow-y:scroll;
                .checkbox-item {
                    width: 33.33%;
                    margin: 0;
                    span{
                        font-size: 16px;
                    }
                }
                
            }
        }
        .integral-add-subtract{
            padding: 0 40px;
            margin-bottom: 40px;
            .integral-setting-title {
                margin-bottom: 30px;
                p{
                    position: relative;
                    padding-left: 10px;
                    color: #666;
                    font-weight: bold;
                    &::before{
                        content: '';
                        position: absolute;
                        top: 3px;
                        left: 0;
                        display: inline-block;
                        width: 2px;
                        height: 17px;
                        background: $fontColor;
                    }
                }
            }
            .integral-content{
                width: 100%;
                display:flex;
                justify-content: space-between;
                border-radius: 10px;                
                // padding: 0 50px;
                position: relative;
                .integral-xs{
                    width: 25%;
                    display: flex;
                    justify-content: space-around;
                    color: #47a3fb;
                }
                .integral-th{
                    width: 25%;
                    display: flex;
                    justify-content: space-around;
                    color: #ff8c97;
                }
                .integral-hh{
                    width: 25%;
                    display: flex;
                    justify-content: space-around;
                    color: #fd914f;
                }
                .integral-hs{
                    width: 25%;
                    display: flex;
                    justify-content: space-around;
                    color: #c46de8;
                }
                .xs{
                    border: 2px solid #47a3fb;
                    background: rgba(41, 147, 248, .1);     
                }
                .hh{
                    border: 2px solid #fd914f;
                    background: rgba(253, 145, 79, .1);     
                }
                .th{
                    border: 2px solid #ff8c97;
                    background: rgba(255, 96, 113, .1);     
                }
                .hs{
                    border: 2px solid #c46de8;
                    background: rgba(196, 109, 233, .1);     
                }
                .integral-left{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 56px;
                                   
                }
                .integral-right{
                    width: 62%;
                    .intergral-item{
                        display: block;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        margin: 0;
                        color: #666;
                    }
                }
                .modalBox {
                    width: 100%; 
                    height: 100%;
                    background: transparent;
                    position: absolute;
                    
                }
            }
        }
        .product-setting{
            // height: 900px;
            margin-bottom: 30px;
            padding: 0 40px;
            .product-setting-content{
                background: #f6f7f8;
                padding: 26px 30px;
                border-radius: 10px;    
                .producet-jz{
                    margin-bottom: 30px;
                }
                .producet-jj{
                    // height: 500px;
                }
                // 计件计重公共部分
                .title{
                    margin-bottom: 27px;
                    color: #333;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                }
                .content{
                    display: flex;
                    // justify-content: space-between;
                    flex-wrap: wrap;
                    .item{
                        width: 206px;
                        height: 138px;
                        background: #fff;
                        border-radius: 10px;
                        padding: 24px;
                        margin-bottom: 20px;
                        margin-right: 16px;
                        .item-title{
                            color: #47a3fb;
                            font-size: 16px;
                            margin-bottom: 10px;
                        }
                        .item-input{
                            overflow: hidden;
                            display:flex;
                            justify-content: space-between;
                            margin-bottom: 12px;
                            input{
                                width: 60px;
                                height: 28px;
                                background-color:transparent;
                                text-align: center;
                                font-size: 14px;
                                border-radius: 3px;
                                &:active,
                                &:hover,
                                &:focus{
                                    border: 1px solid #2993f8;
                                    background-color: #f4f9ff;
                                }
                            }
                        }
                        .item-message{
                            font-size: 12px;
                            display:flex;
                            justify-content: space-between;
                        }
                    }
                }
            }            
        }   
        .issue{
            height: 280px;
            padding: 0 40px;
            margin-bottom: 40px;      
            .issue-content {
                height: 220px;
                background: #f6f7f8;
                padding: 40px 30px;
                border-radius: 10px;
                .item {
                    height: 38px;
                    margin-bottom: 24px;
                    color: #333;
                    font-size: 14px;
                    .item-circle{
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #fdb133;
                        margin-right: 20px;
                    }
                    .item-title{
                        margin-right: 32px;
                    }
                    .input-box {
                        display: inline-block;
                        
                        input{
                                width: 60px;
                                height: 28px;
                                background-color:transparent;
                                text-align: left;
                                font-size: 14px;
                                border-radius: 3px;
                                border: 1px solid #2993f8;                                
                                &:active,
                                &:hover,
                                &:focus{
                                    border: 1px solid #2993f8;
                                    background-color: #f4f9ff;
                                }
                        }
                    }
                    .item-input{
                        width: 100px;
                        border-radius: 4px;
                        .el-input__inner {
                            border-radius: 10px !important;
                        }
                    }
                    .fg-fen {
                        margin-right: 50px;
                    }
                    i{
                        margin-left: 20px;
                        &:hover {
                            color: #2993f8;
                            cursor: pointer;
                        }
                    }
                    .el-icon-delete {
                        opacity: 0;
                    }
                    &:hover {
                        .el-icon-delete {
                            opacity: 1;
                        }
                    }
                }
            }     
        }
        .consumption {
            height: 400px;
            padding: 0 40px;
            margin-bottom: 40px; 
            .consumption-content {
                height: 310px;
                padding: 40px 30px;
                background: #f6f7f8;
                border-radius: 10px;
                position: relative;
                .item {
                    height: 38px;
                    margin-bottom: 24px;
                    color: #333;
                    font-size: 14px;
                    .item-circle{
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #fdb133;
                        margin-right: 20px;
                    }
                    .item-title{
                        margin-right: 32px;
                    }
                    .input-box {
                        display: inline-block;
                        
                        input{
                                width: 60px;
                                height: 28px;
                                background-color:transparent;
                                text-align: left;
                                font-size: 14px;
                                border-radius: 3px;
                                border: 1px solid #2993f8;
                                &:active,
                                &:hover,
                                &:focus{
                                    border: 1px solid #2993f8;
                                    background-color: #f4f9ff;
                                }
                        }
                    }
                    .item-input{
                        width: 100px;
                        border-radius: 4px;
                        .el-input__inner {
                            border-radius: 10px !important;
                        }
                    }
                    .fg-fen {
                        margin-right: 50px;
                    }
                    
                }
                .modalBox {
                    width: 100%; 
                    height: 100%;
                    background: transparent;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }
        // 大标题
        .all-title {
            margin-bottom: 30px;
                p{
                    position: relative;
                    padding-left: 10px;
                    color: #666;
                    font-weight: bold;
                    &::before{
                        content: '';
                        position: absolute;
                        top: 3px;
                        left: 0;
                        display: inline-block;
                        width: 2px;
                        height: 17px;
                        background: $fontColor;
                    }
                }
        }
    }

}
.sell-type-one-main {
    position: absolute;
    top: 50%;
    left: 50%;
    // width: 100%;
    // height: 100%;
	transform:translate(-50%,-50%);
    background: #fff;
    z-index: 10;
    .dia-title {
        // width: 78px;
        position: absolute;
        top:24px;
        left: 50%;
        margin-left: -28px;
        img {
            display: block;
            margin: 0 auto;
            width: 46px;
            height: 46px;
            margin-bottom: 12px;
        }
        h3 {
            font-size: 12px;
            color:#333;
            text-align: center;
        }
    }
    .list-wrap {
        width: 320px;
        height: 271px;
        padding-top: 180px;
        margin-bottom: 130px;
        .btn-wrap {
            width: 180px;
            // height: 70px;
            margin: 0 auto;
			.disabledActive {
				cursor: not-allowed;
			}
            li {
                display: block;
                height: 40px;
                font-style: normal;
                text-align:center;
                background-color: rgb(244, 244, 244);
                color: #2993f8;
                // background: #2993f8;
                // color:#fff;
                font-size: 14px;
                line-height: 40px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.6s;
                &:hover{
                    background: #2993f8;
                    color: #fff;
                }
            }
            li:nth-child(2) {
                margin-top: 40px;
                // color: #2993f8;
               // background-color: rgb(244, 244, 244);
            }
			li:nth-child(3){
				margin-top: 40px;
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
                color:#333;
                text-align: center;
                cursor: pointer;
                .active-block {
                    display: none;
                }
            }
            li:hover {
                background:#f6f7f8;
                color: #2993f8;
            }
            li.active {
                .active-block {
                    display: block;
                    height: 100%;
                    float: left;
                    width: 3px;
                    background:#2993f8;
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
                color:#333;
                cursor: pointer;
                margin-left: 19px;
            }
            li:hover {
                background:#f6f7f8;
                color: #2993f8;
            }
            li.active {
                color:#2993f8;
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
        background:#fff;
        .footer-left {
            height: 100%;
            float: left;
            font-size: 14px;
            color:#999999;
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

</style>

<script>
import Swichs from './Swichs'
import memberDialog from '../ShopSetting/dialog/tplGoldDialog'

// 获取模板内容
import { templateIntegralDetails,consumeTemplateUpdate,getShopReTemplateList,addOrSubTemplateUpdate,consumeIntegralUpdate,othenTemplateUpdate,shopReTemplateById } from 'Api/member'

// 获取用户权限
import {mapActions, mapGetters} from 'vuex'
import {seekGetUserInfo} from 'Api/commonality/seek'

import tradingVue from '../../Leaguer/components/memberPage/trading.vue';
import { isMoment } from 'moment';

export default {
    data () {
        return {
            checkList: [],
            value2: true,
            radio2: 3,
            num8:100,
            num9:1,
            radio:'',
            dialogVisible:false,
            // 弹框数据
            dialog: {
                dialogVisible: false,
                dialogSize: 'counter_x_small',
                dialogSlot : '' ,
                addCounterName : '',
                smallDataList :[]
            },
            templateInfoData:{
                templateName:'',
                templateId:'',
                addOrSubConfig:'D',
                productTypeConfig:'',
                sellConfig:'D',
                refundConfig:'',
                exchangeConfig:'D',
                recoveryConfig:'D',
                poductTypeList:[
                    {
                        classesType:'1',
                        typeList:[
                            {
                                classesId:'1',
                                classesName:'黄金（克）',
                                yuan:'100',
                                score:'1',
                            },
                            {
                                classesId:'1',
                                classesName:'黄金（克）',
                                yuan:'100',
                                score:'1',
                            }
                        ]

                    },
                    {
                        classesType:'2',
                        typeList:[
                            {
                                classesId:'1',
                                classesName:'黄金（克）',
                                yuan:'100',
                                score:'1',
                            },
                            {
                                classesId:'1',
                                classesName:'黄金（克）',
                                yuan:'100',
                                score:'1',
                            }
                        ]
                    }
                ],
                othenConfig:'',
                othenList:[],
                consumeConfig:'',
                consumeYuan:'',
                consumeScore:'',
                weightConfig:'D',
                pieceConfig:'D',
                deductible:'',
                matchingType:''
            },
            shopList:[{
                shopId:'',
                shopName:'随便',
                templateId:'',
                templateName:'',
                binding:'Y',
                existence:'Y'
            }],
            otherList:[],

            zcitem:false,
            sritem:false,
            qditem:false,

            zcscore:'',
            srscore:'',
            dczcscore:'',
            lxzcscore:'',
            isDisabled:false

        }
    },
    components:{
        Swichs,
        memberDialog
    },
    computed:{
        ...mapGetters([
            "userPositionInfo"
        ]),
        // isDisabled(){
        //     if(this.userPositionInfo.roleList.length === 1){
        //         if(this.userPositionInfo.roleList[0].role > 3){
        //             return true
        //         } else {
        //             return false
        //         }
        //     } else {
        //         return false
        //     }
        // }
    },
    methods: {
        ...mapActions([
            'getSeekGetUserInfo'
        ]),
        // 计重批量设置
        jzSetting(){
            this.dialog.dialogVisible = true
            this.add({smallDataList:this.templateInfoData.poductTypeList[0].typeList,setjz:1})
        },
        jjsetting(){
            this.dialog.dialogVisible = true          
            this.addjj({smallDataList:this.templateInfoData.poductTypeList[1].typeList,setjz:1})
        },
        closeDialog(parm){
            this.dialog.dialogVisible = parm
        },

        // 模板详情
        getIntegralDetails(){
            let options = {
                templateId: this.$route.query.templateId
            }
            templateIntegralDetails(options).then(res => {
                console.log('模板详情',res)
                this.templateInfoData = Object.assign(this.templateInfoData,res.data.data)

                // 处理其他配置
                this.templateInfoData.othenList.forEach(item => {
                    if(item.othenName === '1'){
                        this.zcitem = true
                    } else if(item.othenName === '2') {
                        this.sritem = true
                    } else if(item.othenName === '3') {
                        this.qditem = true
                    }
                })

                this.getOtherList()
            })
        },
        // 删除
        delConfiguration(type) {
            console.log('删除',type)
            let options = {}
            let othenId = ''
            switch (type) {
                case 1:
                    this.zcitem = false
                    this.templateInfoData.othenList.forEach((item,index) => {
                        if(item.othenName == '1') {
                            this.templateInfoData.othenList.splice(index,1)
                            othenId = item.othenId
                        }
                    })
                    options = {
                        templateId: this.$route.query.templateId,
                        operateType: '1',
                        updateData:'1',
                        othenId
                    }
                    othenTemplateUpdate(options).then(res => {
                        console.log(res)
                        if(res.data.state != 200){
                            this.$message({
                                type:'error',
                                message:res.data.msg
                            })
                        }
                    })
                    break;
                case 2:
                    this.sritem = false
                    this.templateInfoData.othenList.forEach((item,index) => {
                        if(item.othenName == '2') {
                            this.templateInfoData.othenList.splice(index,1)
                            othenId = item.othenId                            
                        }
                    })
                    options = {
                        templateId: this.$route.query.templateId,
                        operateType: '1',
                        updateData:'2',
                        othenId
                    }
                    othenTemplateUpdate(options).then(res => {
                        console.log(res)
                        if(res.data.state != 200){
                            this.$message({
                                type:'error',
                                message:res.data.msg
                            })
                        }
                    })
                    break;
                case 3:
                    this.qditem = false
                    this.templateInfoData.othenList.forEach((item,index) => {
                        if(item.othenName == '3') {
                            this.templateInfoData.othenList.splice(index,1)
                            othenId = item.othenId                            
                        }
                    })
                    options = {
                        templateId: this.$route.query.templateId,
                        operateType: '1',
                        updateData:'3',
                        othenId
                    }
                    othenTemplateUpdate(options).then(res => {
                        console.log(res)
                        if(res.data.state != 200){
                            this.$message({
                                type:'error',
                                message:res.data.msg
                            })
                        }
                    })
                    break;
            
                default:
                    break;
            }
        },
        addConfiguration(type){
            let options = {}
            switch (type) {
                case 1:
                    if(this.zcitem){
                        return
                    } else {
                        options = {
                            templateId: this.$route.query.templateId,
                            operateType: '2',
                            updateData:'1'
                        }
                        othenTemplateUpdate(options).then(res => {
                            console.log(res)
                            if(res.data.state != 200){
                                this.$message({
                                    type:'error',
                                    message:res.data.msg
                                })
                                return
                            }
                            this.zcitem = true
                            this.getIntegralDetails()
                        })
                    }
                    break;
                case 2:
                    if(this.sritem){
                        return
                    } else {
                        this.sritem = true
                        options = {
                            templateId: this.$route.query.templateId,
                            operateType: '2',
                            updateData:'2'
                        }
                        othenTemplateUpdate(options).then(res => {
                            console.log(res)
                            if(res.data.state != 200){
                                this.$message({
                                    type:'error',
                                    message:res.data.msg
                                })
                                return
                            }
                            this.sritem = true
                            this.getIntegralDetails()
                            
                        })
                    }
                    break;
                case 3:
                    if(this.qditem){
                        return
                    } else {
                        this.qditem = true
                        options = {
                            templateId: this.$route.query.templateId,
                            operateType: '2',
                            updateData:'3'
                        }
                        othenTemplateUpdate(options).then(res => {
                            console.log(res)
                            if(res.data.state != 200){
                                this.$message({
                                    type:'error',
                                    message:res.data.msg
                                })
                                return
                            }
                            this.qditem = true     
                            this.getIntegralDetails()
                                                       
                        })
                    }
                    break;
                default:
                    break;
            }
        },
        // 修改消费发放
        setConsumeTemplateUpdate(item){
            if(item.yuan < 0) {
                item.yuan = 0
            }
            if(item.score < 0) {
                item.score = 0
            }
            let options = {}
            if(this.templateInfoData.productTypeConfig === 'N'){
                if(item){
                    options = {
                        templateId: this.templateInfoData.templateId,
                        dataList: [item],                
                    }
                } else {
                    options = {
                        templateId: this.templateInfoData.templateId,
                        switch: this.templateInfoData.productTypeConfig
                    }
                }
            } else {
                if(item){
                    options = {
                        templateId: this.templateInfoData.templateId,
                        dataList: [item],                
                    }
                } else {
                    options = {
                        templateId: this.templateInfoData.templateId,
                        switch: this.templateInfoData.productTypeConfig
                    }
                }
                
            }
            consumeTemplateUpdate(options).then(res => {
                if(res.data.state === 200) {
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })
                }
            })
        },
        switchChange(type,config){
             switch (type) {
                case 'addOrSubConfig':
                    if(config) {
                        this.templateInfoData.addOrSubConfig = 'N'
                        this.addOrSubTemplate()                        
                    } else{
                        this.templateInfoData.addOrSubConfig = 'D'
                        this.addOrSubTemplate()
                    }
                    break;
                case 'productTypeConfig':
                    if(config) {
                        this.templateInfoData.productTypeConfig = 'N'
                        this.setConsumeTemplateUpdate()
                    } else{
                        this.templateInfoData.productTypeConfig = 'D'
                        this.setConsumeTemplateUpdate()
                    }
                    break;
                case 'othenConfig':
                    if(config) {
                        this.templateInfoData.othenConfig = 'N'
                        this.othenTemplateTemplate()
                    } else{
                        this.templateInfoData.othenConfig = 'D'
                        this.othenTemplateTemplate()
                    }
                    break;
                case 'consumeConfig':
                    if(config) {
                        this.templateInfoData.consumeConfig = 'N'
                        this.consumeIntegralTemplate()
                    } else{
                        this.templateInfoData.consumeConfig = 'D'
                        this.consumeIntegralTemplate()
                    }
                    break;
            
                default:
                    break;
            }
        },
        // 弹框哇
        dialogType(type){
          this.dialog.dialogVisible = type 
        },
        add(item){
            this.dialogType(true)
            Object.assign(this.dialog,{
                dialogSlot : 'goldAdd',
                addCounterName : '计重类批量设置'
            },item)
        },
        addjj(item) {
            this.dialogType(true)
            Object.assign(this.dialog,{
                dialogSlot : 'goldAdd',
                addCounterName : '计件类批量设置'
            },item)
        },
        // 获取店铺列表
        getShopList() {
            let options = {}
            if(this.isDisabled){
                options = {
                    templateId : this.$route.query.templateId,
                }
            }
            if(this.$route.query.shopId) {
                options = {
                    templateId : this.$route.query.templateId,
                    shopId : this.$route.query.shopId,
                }
            }
            getShopReTemplateList(options).then(res => {
                console.log('店铺列表',res)
                this.shopList = res.data.data.dataList
                this.shopList.forEach(item => {
                    if(item.binding === 'Y' || item.existence === 'Y'){
                        this.checkList.push(item.shopId)
                    }
                })
            })
        },
        // 获取其他配置
        getOtherList() {
            if(this.isDisabled) {
                return;
            }

            this.templateInfoData.othenList.forEach(item => {
                if(item.othenName == 1){
                    this.zcitem = true
                }
                if(item.othenName == 2){
                    this.sritem = true
                }
                if(item.othenName == 3){
                    this.qditem = true
                }
            });
        },
        // 积分加减法配置
        addOrSubTemplate (operateType,updateData) {
            if(this.isDisabled) {
                return;
            }

            if(this.templateInfoData.addOrSubConfig === 'N') {
                if(operateType){
                    options = {
                        operateType,
                        updateData,
                        templateId:this.$route.query.templateId,
                    }
                } else {
                    options = {
                        operateType: '5',
                        templateId:this.$route.query.templateId,
                    }
                }
            } else {
                if(operateType){
                    options = {
                        operateType,
                        updateData,
                        templateId:this.$route.query.templateId,
                    }
                } else {
                    options = {
                        operateType: '6',
                        templateId:this.$route.query.templateId
                    }
                }
                
            }

            addOrSubTemplateUpdate(options).then(res => {
                if(res.data.state == 200) {
                            
                } else {
                    this.$message({
                        type:'error',
                        message: res.data.msg
                        })
                    }
                })
        },
        // 积分发放配置
        consumeIntegralTemplate(operateType,updateData) {
            if(this.isDisabled) {
                return
            }
            if(!this.templateInfoData.consumeConfig) {
                return
            }
            console.log('积分发放配置',operateType,updateData)
            switch (operateType) {
                case '3':
                    if(isNaN(Number(updateData))){
                        this.templateInfoData.consumeYuan = ''
                        this.$message({
                            type:'warning',
                            message:'请输入整数'
                        })
                        return
                    } else {
                        this.templateInfoData.consumeYuan = parseInt(this.templateInfoData.consumeYuan)
                    }
                    break;
                case '4':
                    if(isNaN(Number(updateData))){
                        this.templateInfoData.consumeScore = ''
                        this.$message({
                            type:'warning',
                            message:'请输入整数'
                        })
                        return
                    } else {
                        this.templateInfoData.consumeScore = parseInt(this.templateInfoData.consumeScore)
                    }
                    break;
                case '5':
                    if(isNaN(Number(updateData))){
                        this.templateInfoData.pieceConfig = ''
                        this.$message({
                            type:'warning',
                            message:'请输入整数'
                        })
                        return
                    } else {
                        this.templateInfoData.pieceConfig = parseInt(this.templateInfoData.pieceConfig)                        
                    }
                    break;
                case '6':
                    if(isNaN(Number(updateData))){
                        this.templateInfoData.weightConfig = ''
                        this.$message({
                            type:'warning',
                            message:'请输入整数'
                        })
                        return
                    } else {
                        this.templateInfoData.weightConfig = parseInt(this.templateInfoData.weightConfig)                        
                    }
                    break;
                default:
                    break;
            }
            
            let options = {}
            if(this.templateInfoData.consumeConfig === 'N'){
                if(operateType){
                    options = {
                        operateType,
                        updateData:parseInt(updateData) || updateData,
                        templateId:this.$route.query.templateId,
                    }
                } else {
                    options = {
                        templateId:this.$route.query.templateId,
                        operateType: '1'
                    }
                }
            } else {
                options = {
                    templateId: this.$route.query.templateId,
                    operateType: '2'
                }
                if(operateType){
                    options = {
                        operateType,
                        updateData:parseInt(updateData) || updateData,
                        templateId:this.$route.query.templateId,
                    }
                } else {
                    options = {
                        templateId:this.$route.query.templateId,
                        operateType: '1'
                    }
                }
            }
            consumeIntegralUpdate(options).then(res => {
                console.log(res)
                if(res.data.state == 200 && options.operateType != 7 && options.operateType != 8){
                    this.$message({
                        type:'success',
                        message:'修改成功',
                    })
                }
                if(res.data.state != 200) {
                    this.$message({
                        type:'error',
                        message:res.data.msg,
                    })
                }
            })
        },
        // 其他发放配置
        othenTemplateTemplate(operateType,updateData,score,othenId,continuousSign) {
            if(this.isDisabled) {
                return;
            }
            switch (updateData) {
                case '1':
                    if(isNaN(Number(score))){
                        this.$message({
                            type:'warning',
                            message:'请输入整数'
                        })
                        return
                    } else {

                    }
                    break;
                case '2':
                    if(isNaN(Number(score))){
                        this.$message({
                            type:'warning',
                            message:'请输入整数'
                        })
                        return
                    } else {
                    }
                    break;
                case '3':
                    if(isNaN(Number(score)) || isNaN(Number(continuousSign))){
                        this.$message({
                            type:'warning',
                            message:'请输入整数'
                        })
                        return
                    } else {
                    }
                    break;
            }
            // 当用户输入负数的时候
            if(score<0) {
                score = 0
            }
            
            let options = {}
            if(this.templateInfoData.othenConfig === 'N'){
                if(operateType){
                    if(continuousSign){
                        if(continuousSign<0) {
                            continuousSign = 0
                        }
                        options = {
                            templateId: this.$route.query.templateId,
                            operateType,
                            updateData,
                            score,
                            othenId,
                            continuousSign
                        }
                    } else {
                        options = {
                            templateId: this.$route.query.templateId,
                            operateType,
                            updateData,
                            score,
                            othenId
                        }
                    }
                }else {
                    options = {
                        templateId: this.$route.query.templateId,
                        operateType: '4'
                    }
                }
            } else {
                if(operateType){
                    if(continuousSign){
                        if(continuousSign<0) {
                            continuousSign = 0
                        }
                        options = {
                            templateId: this.$route.query.templateId,
                            operateType,
                            updateData,
                            score,
                            othenId,
                            continuousSign
                        }
                    } else {
                        options = {
                            templateId: this.$route.query.templateId,
                            operateType,
                            updateData,
                            score,
                            othenId
                        }
                    }
                }else {
                    options = {
                        templateId: this.$route.query.templateId,
                        operateType: '5'
                    }
                }
                
            }

            othenTemplateUpdate(options).then(res => {
                if(res.data.state == 200){
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                }
                if(res.data.state != 200){
                    this.$message({
                        type:'error',
                        message: res.data.msg
                    })
                }
                this.getIntegralDetails()
            })
        },
        // 批量
        dialogCallback(data) {
            let options = {
                templateId: this.templateInfoData.templateId,
                dataList: data,
            }
            consumeTemplateUpdate(options).then(res => {
                if(res.data.state === 200) {
                    this.getIntegralDetails()
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })
                }
            })
        },
        // 店铺关联模板
        setShopTemplat(data) {
            if(this.isDisabled) {
                return;
            }
            
            let flag = false
            let options = {}
            this.checkList.forEach(item => {
                if(item === data.shopId){
                    flag = true
                }
            })
            if(flag){
                options = {
                    templateId: this.$route.query.templateId,
                    operateType:'1',
                    shopId:data.shopId
                }
            } else {
                options = {
                    templateId: this.$route.query.templateId,
                    operateType:'2',
                    shopId:data.shopId
                }
            }
            shopReTemplateById(options).then(res => {
                if(res.data.state != 200){
                    this.$message({
                        type:'error',
                        message: res.data.msg
                    })
                }
            })
        }
    },
    watch:{
        'templateInfoData.addOrSubConfig'(val) {
            console.log('改变值',val)
        },
        'zcscore': function (curVal, oldVal) {
            if (!curVal) {
                this.zcscore = ''
                return false
            }
                this.zcscore = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''
        },
        'srscore': function (curVal, oldVal) {
            if (!curVal) {
                this.srscore = ''
                return false
            }
                this.srscore = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''
        },
        'dczcscore': function (curVal, oldVal) {
            if (!curVal) {
                this.dczcscore = ''
                return false
            }
                this.dczcscore = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''
        },
        'lxzcscore': function (curVal, oldVal) {
            if (!curVal) {
                this.lxzcscore = ''
                return false
            }
            this.lxzcscore = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''
        },
        
    },
    created(){
        // 获取用户权限
        let options = {
            userId: sessionStorage.getItem('id')
        }
        seekGetUserInfo(options).then(res => {
            console.log('刷新后的用户权限',res)
            if(res.data.roleList.length === 1){
                if(res.data.roleList[0].role > 3){
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
            } else {
                this.isDisabled = false
            }
        })
        this.getIntegralDetails()
        this.getShopList()
    },
    mounted(){
        // console.log('用户信息',this.templateInfoData)
    },

}
</script>


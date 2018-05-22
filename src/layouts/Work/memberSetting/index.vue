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
                    <el-checkbox class="checkbox-item" label="复选框 A"><span>周大福龙华清湖店</span></el-checkbox>
                    <el-checkbox class="checkbox-item" label="复选框 A"><span>周大福龙华清湖店</span></el-checkbox>
                    <el-checkbox class="checkbox-item" label="复选框 A"><span>周大福龙华清湖店</span></el-checkbox>
                    <el-checkbox class="checkbox-item" label="选中且禁用" disabled><span>周大福龙华清湖店</span></el-checkbox>
                    <el-checkbox class="checkbox-item" label="复选框 A"><span>周大福龙华清湖店</span></el-checkbox>
                    <el-checkbox class="checkbox-item" label="复选框 A"><span>周大福龙华清湖店</span></el-checkbox>
                    <el-checkbox class="checkbox-item" label="复选框 A"><span>周大福龙华清湖店</span></el-checkbox>
                    <el-checkbox class="checkbox-item" label="复选框 A"><span>周大福龙华清湖店</span></el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- 积分模板应用店铺 0.2 end -->

            <!-- 积分加减规则 0.3 begin-->
            <div class="integral-add-subtract">
                <div class="integral-setting-title">
                    <p>积分加减法规则
                       <swichs></swichs>
                    </p>
                </div>
                <div class="integral-content">
                    <!-- 销售 -->
                    <div class="integral-xs">
                        <div class="integral-left xs">销售</div>
                            <el-radio-group class="integral-right" v-model="radio2">
                                <el-radio class="intergral-item" :label="3">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="6">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="9">无</el-radio>
                            </el-radio-group>
                    </div>
                    <!-- 退货 -->
                    <div class="integral-th">
                        <div class="integral-left th">退货</div>
                            <el-radio-group class="integral-right" v-model="radio2">
                                <el-radio class="intergral-item" :label="3">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="6">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="9">无</el-radio>
                            </el-radio-group>
                    </div>
                    <!-- 换货 -->
                    <div class="integral-hh">
                        <div class="integral-left hh">换货</div>
                            <el-radio-group class="integral-right" v-model="radio2">
                                <el-radio class="intergral-item" :label="3">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="6">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="9">无</el-radio>
                            </el-radio-group>
                    </div>
                    <!-- 回收 -->
                    <div class="integral-hs">
                        <div class="integral-left hs">回收</div>
                            <el-radio-group class="integral-right" v-model="radio2">
                                <el-radio class="intergral-item" :label="3">增加积分</el-radio>
                                <el-radio class="intergral-item" :label="6">返还积分</el-radio>
                                <el-radio class="intergral-item" :label="9">无</el-radio>
                            </el-radio-group>
                    </div>
                </div>
                
            </div>
            <!-- 积分加减规则 0.3 end-->

            <!-- 产品类别-消费发放配置 .4 begin -->
            <div class="product-setting">
                <div class="all-title">
                    <p>产品类别-消费发放配置
                        <swichs></swichs>
                    </p>
                </div>
                <div class="product-setting-content">
                    <!-- 计重类 begin -->
                    <div class="producet-jz">
                        <div class="title">
                            <span>计重类</span>
                            <el-button type="primary" size="mini">批量设置</el-button>
                        </div>
                        <div class="content">
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
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
                    <div class="porducet-jj">
                        <div class="title">
                            <span>计件类</span>
                            <el-button type="primary" size="mini">批量设置</el-button>
                        </div>
                        <div class="content">
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                </p>
                                <p class="item-message">
                                    <span>消费（元）</span>
                                    <span>可积（分）</span>
                                </p>
                            </div>
                            <div class="item">
                                <p class="item-title">黄金(克)</p>
                                <p class="item-input">
                                    <input type="text" v-model="num8">
                                    <input type="text" v-model="num9">
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
                        <swichs></swichs>
                        <el-button class="fr" type="primary" size="small">+ 配置条件</el-button>
                    </p>
                </div>
                <!--  -->
            </div>
            <!-- 积分发放配置 .5 end -->
        </div>
        <!-- 内容主体 end-->
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
                // padding: 0 50px;
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
            }
        }
        .product-setting{
            height: 900px;
            padding: 0 40px;
            .product-setting-content{
                background: #f6f7f8;
                padding: 26px 30px;
                .producet-jz{
                    // height: 500px;
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
            height: 260px;
            padding: 0 40px;            
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
</style>

<script>
import Swichs from './Swichs';
export default {
    data () {
        return {
            checkList: ['选中且禁用','复选框 A'],
            value2: true,
            radio2: 3,
            num8:100,
            num9:1,
        }
    },
    components:{
        Swichs,
    }
}
</script>


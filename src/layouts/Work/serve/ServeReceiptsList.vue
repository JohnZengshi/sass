<template>
	<transition name="tp-ani">
		<div class="app-wd container">
			<!-- 头部 -->
			<headerTit></headerTit>
			<!-- 头部个人信息 -->
			<!--状态栏-->
			<div class="actions-status" :class="{'animat-scroll':curStatus.slipPointer}">
				<headerMessege
          @openAddCommodityWrap="openAddCommodityWrap"
          :orderData="orderData"
          :receiptData="receiptData"
          ref="actionsStatus"
          :curStatus="curStatus"
          :isOperation="isOperation"
        >
				</headerMessege>
			</div>

			<!--商品列表-->
			<div class="commodity-container" v-loading="loadCommodity" element-loading-text="数据加载中...">
				<div class="handle">
					<span class="list-icon">
						<i class="iconfont icon-liebiao"></i>
						商品列表
						<span class="tips-tit">( <img src="~assets/img/serve-light.png" alt=""> 小贴士:可关联多个售后商品)</span>
					</span>
					<div class="item">
						<!-- <span v-if="isShow && curStatus.nowStatus == 1" class="add" @click="add" ref="ref_addGoods">添加商品</span> -->
						<span v-if="isOperation" class="add" @click="openAddCommodityWrap('1')" ref="ref_addGoods">添加商品</span>
					</div>
				</div>

				<!-- 商品列表 -->
				<serve-container-list :isOperation="isOperation" :showData="productData" @setBounding="setBounding" @remarkOut="remarkOut" @_seekProductListByService="_seekProductListByService" @openRemarkDialog="openRemarkDialog"></serve-container-list>

				<!-- 售后备注 -->
				<serve-container-bottom :isOperation="isOperation" :receiptData="receiptData" @_seekReceiptFWSynopsis="_seekReceiptFWSynopsis"></serve-container-bottom>

			</div>

			<!--步骤条-->
			<steps-path :orderNum="orderData.orderNum" :ifImport="orderData.ifImport" ref="stepsPath" @setStatus="getStatus">
			</steps-path>

			<!--各个按钮操作区-->
			<utilsdatagrid :curStatus="curStatus" @updataApi="updataApi" :isOperation="isOperation" :orderData="receiptData" :dataList="productData" @goPage="goPage">
			</utilsdatagrid>

			<!-- 备注 -->
			<remarkDialog ref="remarkDialogWrap" @_seekProductListByService="_seekProductListByService"></remarkDialog>
	
			<!-- 查找售后商品 -->
			<add-commodity ref="addCommodityWrap" :receiptData="receiptData" :productData="productData" @updataApi="updataApi"></add-commodity>
      <!-- 备注提示语 -->
      <remarkTit ref="remarkTitWrap" :boundingData="boundingData"></remarkTit>
		</div>
	</transition>
</template>
<script>
import { mapGetters } from 'vuex'
import remarkTit from './base/remarkTit'
import remarkDialog from './base/remarkDialog'
import headerTit from './base/HeaderTit'
import stepsPath from './base/stepsPath'
import utilsdatagrid from './base/utilsDatagrid'
import headerMessege from './base/HeaderMessege'
import serveContainerList from './base/serve-container-list'
import serveContainerBottom from './base/serve-container-bottom'
import addCommodity from './component/add-commodity'
import {seekReceiptFWSynopsis, seekProductListByService} from 'Api/commonality/seek'
import * as jurisdictions from 'Api/commonality/jurisdiction'

export default{
	components: {
    remarkTit,
		headerTit,
		stepsPath,
		utilsdatagrid,
		headerMessege,
		serveContainerList,
		serveContainerBottom,
		remarkDialog,
		addCommodity
	},
	data () {
		return {
      orderNum: this.$route.query.orderNumber,
			receiptData: { // 当做总值
				orderNum: '',
				createDate: '',
				shopId: '',
				shopName: '',
				sellUserId: '',
				sellName: '',
				vipId: '',
				vipPhone: '',
				vipName: '',
				vipSex: '',
				vipGroup: '',
				vipLogo: '',
				makeOrderManId: '',
				makeOrderManName: '',
				makeOrderManLog: '',
				totalNum: '',
				dataList: []
			},
      productData: [], // 商品列表数据
			dgDataList : [],
			// 订单数据
      orderData : Object.assign({},{
        orderNum : this.$route.query.orderNumber,
        shopName:'loading...'
      }),
      // loading开关
      loadCommodity: false,
			// 头部状态栏
      curStatus : {
        statusName: 'loading...',
        statuscurClass: 'stayAudit',
        status : -1,
        //鼠标上、下滑操作
        slipPointer: false ,
        nowStatus : '1'
        // nowStatus : '-1'
      },
      boundingData: {
        left: 0,
        top: 0,
        display: 'none'
      }
		}
	},
  mounted () {
    this.updataApi()
  },
  computed: {
    ...mapGetters([
      "userPositionInfo" // 职位信息
    ]),
    shopManageRole: function() { // 店长
      if(this.userPositionInfo) {
        return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
      }
      return false
    },
    // 进行中 && 店长，制单人 --> 操作权限
    isOperation () {
      if (this.receiptData.makeOrderManId) {
        if (this.curStatus.nowStatus == 1) {
          if (this.shopManageRole || sessionStorage.getItem('id') == this.receiptData.makeOrderManId) {
            return true
          }
        }
      }
      return false
    }
  },
	methods: {
    _seekReceiptFWSynopsis () {
      let options = {
        orderNum: this.orderNum
      }
      seekReceiptFWSynopsis(options)
        .then(res => {
          if (res.data.state == 200) {
              this.receiptData = res.data.data         
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    _seekProductListByService () {
      let options = {
        orderNum: this.orderNum
      }
      seekProductListByService(options)
        .then(res => {
          if (res.data.state == 200) {
              this.productData = res.data.data.productList         
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
		// 获取当前状态值
    getStatus (status){
      if (status){
       for(let k in status) Object.assign(this.curStatus, {[k]: status[k]})
      }
    },
	  goPreviousPage() { // 返回上一页
      this.$router.push("/work/serve")
    },
    openRemarkDialog (item) {
      // if (this.status == 1) {
      //   return
      // }
      this.$refs.remarkDialogWrap.open(item)
    },
    openAddCommodityWrap (parm) {
      let datas = {
        value: parm, // 当前位置
        type: parm == 2 ? 'Y' : 'N' // 是否需要直接关闭
      }
    	this.$refs.addCommodityWrap.open(datas)
    },
        // 更新单据页面API接口出数据
    updataApi (){
      // 状态更新
      this.$refs.stepsPath.fetchPathData()
      //头部状态栏
      // this.$refs.actionsStatus.fetchData()
      // 
      this._seekReceiptFWSynopsis()
      // 商品列表-服务模块
      this._seekProductListByService()
    },
    goPage(url){
	  	this.rowDataList = [];
	  	this.$router.push({path: url});
	  },
    setBounding(parm) {
      this.$refs.remarkTitWrap.open(parm)
      // this.boundingData = parm
    },
    remarkOut() {
      this.$refs.remarkTitWrap.remarkOut()
    },
	}
}
</script>
<style lang="scss" src="../../../assets/css/template/commodityList.scss" scoped></style>
<style lang="scss" src="../../../assets/css/template/remark.scss"></style>
<style scoped lang="scss">
	.app-wd {
		width: 1250px;
		margin: 0 auto;
		.commodity-container {
			min-width: 1250px;
			display: flex;
			flex-direction: column;
			height: 560px;
			background: #fff;
			border-radius: 10px;
			box-shadow: 0 0 15px rgba(0,0,0,.1);
			transition: all .5s cubic-bezier(.51,-.04,.4,.4);
			position: relative;
			z-index: 1;
			>.handle {
				height: 50px;
				background-color: #fff;
				line-height: 50px;
				padding: 0 20px;
				position: relative;
				//z-index: 2;
				border-radius: 10px 10px 0 0;
				>.list-icon {
					.iconfont {
						color: #2993f8;
						margin-right: 5px;
					}
					.tips-tit{
						font-size: 12px;
						color: #999;
            >img{
              width: 15px;
              height: 15px;
              margin-top: 18px;
              vertical-align: top;
            }
					}
				}
				>.item {
					float: right;
					margin-top: 10px;
					user-select: none;
					height: 30px;
					>span,
					>a {
						display: inline-block;
						font-size: 14px;
						color: #333;
						cursor: pointer;
						text-align: center;
						margin-left: 20px;
						height: 28px;
						line-height: 28px;
						border-radius: 5px;
						transition: all .3s;
						white-space: nowrap;
						overflow: hidden;
						&:hover {
							color: #2993f8;
						}
						&.add {
							padding: 0px 10px;
							background-color: #2993f8;
							color: #fff;
							&:hover {
								background-color: #057aea;
							}
						}
						&.gray {
							color: #999;
							cursor: default;
						}
					}
				}
			}


		}
	}
	.container {
		position: relative;
	}
	.actions-status {
		transition: all .5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
		opacity: 1;
		visibility: visible;
		position: relative;
		z-index: 99;
		height: 120px;
		margin-bottom: 30px;
		&.animat-scroll {
			transform: translateY(-200px);
			opacity: 0;
			visibility: hidden;
			height: 0;
		}
	}
  // .main-wrap {
  //   margin: 0 auto;
  // }
  //   .new-table-template {
  //   width: 100%;
  //   height: 100%;
  //   .body-box {
  //     position: relative;
  //     display: -webkit-flex;
  //     /* Safari */
  //     display: flex;
  //     flex-direction: column;
  //     width: 1250px;
  //     box-sizing: border-box;
  //     padding-right: 10px;
  //     padding-bottom: 120px;
  //     padding-top: 30px;
  //     margin: 0 auto;
  //     .color1 {
  //       // 待审核
  //       &:before {
  //         background: #ffba42;
  //       }
  //       &:after {
  //         background-color: #a87825;
  //       }
  //     }
  //     .color2 {
  //       // 审核中
  //       &:before {
  //         background: #ff9b42;
  //       }
  //       &:after {
  //         background-color: #bf7431;
  //       }
  //     }
  //     .color3 {
  //       // 已审核
  //       &:before {
  //         background: #f5743c;
  //       }
  //       &:after {
  //         background-color: #c25c30;
  //       }
  //     }
  //     .color4 {
  //       // 待收货
  //       &:before {
  //         background: #b793e6;
  //       }
  //       &:after {
  //         background-color: #786394;
  //       }
  //     }
  //     .color5 {
  //       // 已收货
  //       &:before {
  //         background: #6c62e6;
  //       }
  //       &:after {
  //         background-color: #4f48a9;
  //       }
  //     }
  //     .color6 {
  //       // 锁定
  //       &:before {
  //         background: #ec625f;
  //       }
  //       &:after {
  //         background-color: #a74543;
  //       }
  //     }
  //     .color7 {
  //       // 待收银
  //       &:before {
  //         background: #c3d5dd;
  //       }
  //       &:after {
  //         background-color: #98a6ac;
  //       }
  //     }
  //     .color8 {
  //       // 已收银
  //       &:before {
  //         background: #5594b8;
  //       }
  //       &:after {
  //         background-color: #3b6780;
  //       }
  //     }
  //     // .body-row2 {
  //     //   height: 112px;
  //     //   width: 1215px;
  //     //   margin-bottom: 30px;
  //     //   position: relative;
  //     //   background: #fff;
  //     //   border-radius: 10px;
  //     //   box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  //     //   padding-left: 78px;
  //     //   .mask {
  //     //     height: 100%;
  //     //     width: 70px;
  //     //     position: absolute;
  //     //     left: 0;
  //     //     top: 0;
  //     //     background: #fff;
  //     //     z-index: 1;
  //     //     border-top-left-radius: 10px;
  //     //     border-bottom-left-radius: 10px;
  //     //   }
  //     //   &:before {
  //     //     content: attr(data-status);
  //     //     display: block;
  //     //     width: 77px;
  //     //     height: 35px;
  //     //     line-height: 35px;
  //     //     // background-color: #ffba42;
  //     //     color: #fff;
  //     //     transform: translateY(-18px);
  //     //     font-weight: bold;
  //     //     font-size: 16px;
  //     //     text-align: center;
  //     //     white-space: nowrap;
  //     //     overflow: hidden;
  //     //     position: absolute;
  //     //     left: -10px;
  //     //     top: 50%;
  //     //     border-radius: 4px;
  //     //     z-index: 3;
  //     //   }
  //     //   &:after {
  //     //     content: '';
  //     //     display: block;
  //     //     height: 10px;
  //     //     width: 10px;
  //     //     position: absolute;
  //     //     z-index: 0;
  //     //     left: 7px;
  //     //     top: 50%;
  //     //     transform: rotate(45deg) translateY(17px);
  //     //   }
  //     //   .statusInfo {
  //     //     height: 100%;
  //     //     width: 791px;
  //     //     padding-top: 38px;
  //     //     padding-right: 50px;
  //     //     position: relative;
  //     //     float: left;
  //     //     .left-main {
  //     //       height: 100px;
  //     //       float: left;
  //     //       &>h5 {
  //     //         font-size: 16px;
  //     //         color: #2993f8;
  //     //         font-weight: bold;
  //     //         margin-bottom: 25px;
  //     //       }
  //     //       .select-container {
  //     //         width: 300px;
  //     //         .item {
  //     //           width: 80px;
  //     //           margin: 0 20px;
  //     //           height: 30px;
  //     //           float: left;
  //     //           white-space: nowrap;
  //     //           text-overflow: ellipsis;
  //     //           span {
  //     //             color: #666;
  //     //             font-size: 14px;
  //     //             font-weight: bold;
  //     //             line-height: 30px;
  //     //           }
  //     //         }
  //     //       }
  //     //     }
  //     //     .right-main {
  //     //       height: 100px;
  //     //       float: right;
  //     //       .right-main-first {
  //     //         float: left;
  //     //         .right-main-item {
  //     //           min-width: 99px;
  //     //           height: 100%;
  //     //           float: left;
  //     //           .item-title {
  //     //             width: 100%;
  //     //             height: 38px;
  //     //             font-size: 14px;
  //     //             color: #333;
  //     //             white-space: nowrap;
  //     //             &>span {
  //     //               font-size: 12px;
  //     //               color: #999;
  //     //             }
  //     //           }
  //     //           .item-type {
  //     //             font-size: 14px;
  //     //             color: #999999;
  //     //           }
  //     //         }
  //     //       }
  //     //       .right-main-last {
  //     //         float: right;
  //     //         .creat-time {
  //     //           height: 20px;
  //     //           text-align: center;
  //     //           font-size: 12px;
  //     //           color: #999999;
  //     //           margin-bottom: 10px;
  //     //         }
  //     //         .creat-man {
  //     //           height: 24px;
  //     //           font-size: 12px;
  //     //           color: #999999;
  //     //           img {
  //     //             width: 24px;
  //     //             height: 24px;
  //     //             float: left;
  //     //             border-radius: 50%;
  //     //             margin-right: 10px;
  //     //           }
  //     //         }
  //     //       }
  //     //     }
  //     //     // .bottom-bar {
  //     //     //  width: 740px;
  //     //     //  height: 20px;
  //     //     //  float: left;
  //     //     //  li {
  //     //     //    float: left;
  //     //     //    margin-right: 20px;
  //     //     //    margin-left: 20px;
  //     //     //    i {
  //     //     //      font-style: normal;
  //     //     //    }
  //     //     //    span {
  //     //     //      font-size: 14px;
  //     //     //      color: #333;
  //     //     //      i {
  //     //     //        font-size: 12px;
  //     //     //        color: #999999;
  //     //     //      }
  //     //     //    }
  //     //     //    span:nth-child(1) {
  //     //     //      font-weight: bold;
  //     //     //      color: #666666;
  //     //     //    }
  //     //     //  }
  //     //     //  li:first-child {
  //     //     //    margin-left: 0;
  //     //     //  }
  //     //     //  li:last-child {
  //     //     //    margin-right: 0;
  //     //     //  }
  //     //     // }
  //     //     .line {
  //     //       width: 1px;
  //     //       height: 95px;
  //     //       background: #d6d6d6;
  //     //       position: absolute;
  //     //       right: 0;
  //     //       top: 50px;
  //     //     }
  //     //   }
  //     //   .cashierInfo {
  //     //     float: right;
  //     //     width: 346px;
  //     //     height: 100%;
  //     //     padding: 38px 40px 0;
  //     //     .cash-tittle {
  //     //       height: 20px;
  //     //       .cashier {
  //     //         color: #999;
  //     //         font-size: 12px;
  //     //         float: left;
  //     //       }
  //     //       .time {
  //     //         float: right;
  //     //         color: #999;
  //     //         font-size: 12px;
  //     //       }
  //     //     }
  //     //     .cash-content {
  //     //       height: 88px;
  //     //       overflow-y: auto;
  //     //       .title-info {
  //     //         text-align: center;
  //     //         margin-top: 20px;
  //     //         &>span {
  //     //           color: #2993f8;
  //     //         }
  //     //       }
  //     //       .cash-item {
  //     //         width: 132px;
  //     //         height: 40px;
  //     //         float: left;
  //     //         .item-main:nth-child(1) {
  //     //           width: 32px;
  //     //           float: left;
  //     //           height: 100%;
  //     //           img {
  //     //             width: 16px;
  //     //             height: 16px;
  //     //           }
  //     //         }
  //     //         .item-main:nth-child(2) {
  //     //           width: 100px;
  //     //           height: 100%;
  //     //           float: left;
  //     //           &>div {
  //     //             height: 18px;
  //     //             font-size: 12px;
  //     //             color: #333;
  //     //             span {
  //     //               font-size: 10px;
  //     //               color: #999;
  //     //             }
  //     //           }
  //     //           &>span {
  //     //             font-size: 12px;
  //     //             color: #999
  //     //           }
  //     //         }
  //     //       }
  //     //     }
  //     //   }
  //     // }
  //     // .body-row4 {
  //     //   min-width: 1215px;
  //     //   height: 547px;
  //     //   position: relative;
  //     //   .row4-tittle {
  //     //     font-size: 16px;
  //     //     color: #333;
  //     //     font-weight: bold;
  //     //     height: 38px;
  //     //     width: 1250px;
  //     //     position: relative;
  //     //     .tittle-left {
  //     //       float: left;
  //     //     }
  //     //     .tittle-right {
  //     //       position: absolute;
  //     //       right: 0;
  //     //       top: 0;
  //     //       z-index: 210;
  //     //       span {
  //     //         font-size: 12px;
  //     //         color: #2993f8;
  //     //       }
  //     //       input {
  //     //         width: 200px;
  //     //         height: 28px;
  //     //         border: 1px solid #ececec;
  //     //         border-radius: 40px;
  //     //         text-align: center;
  //     //         font-size: 12px;
  //     //         color: #999;
  //     //       }
  //     //       .tooltip {
  //     //         position: absolute;
  //     //         bottom: -30px;
  //     //         right: 30px;
  //     //         z-index: 20;
  //     //         color: #fff;
  //     //         background: #000;
  //     //         padding: 4px 6px;
  //     //         border-radius: 4px;
  //     //       }
  //     //     }
  //     //   }
  //     //   .row4-data-main {
  //     //     width: 1215px;
  //     //     height: 496px;
  //     //     white-space: nowrap;
  //     //     .row4-main-wrap {
  //     //       padding: 10px 10px;
  //     //     }
  //     //     .no-data {
  //     //       padding: 10px 10px;
  //     //       background: #fff;
  //     //       border-radius: 10px;
  //     //       width: 1215px;
  //     //       height: 480px;
  //     //       box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  //     //       .no-data-wrap {
  //     //         width: 310px;
  //     //         margin: 0 auto;
  //     //         img {}
  //     //         .btn-wrap {
  //     //           height: 28px;
  //     //           width: 100%;
  //     //           .btn {
  //     //             width: 76px;
  //     //             height: 28px;
  //     //             background: #2993f8;
  //     //             float: left;
  //     //             border-radius: 4px;
  //     //             color: #fff;
  //     //             text-align: center;
  //     //             line-height: 28px;
  //     //             font-size: 12px;
  //     //             font-weight: bold;
  //     //             cursor: pointer;
  //     //           }
  //     //           .sell {
  //     //             margin-right: 74px;
  //     //             margin-left: 38px;
  //     //           }
  //     //         }
  //     //       }
  //     //     }
  //     //   }
  //     //   .btn-list {
  //     //     position: absolute;
  //     //     right: -68px;
  //     //     bottom: 20px;
  //     //     background: #fff;
  //     //     border: 1px solid #ededed;
  //     //     width: 52px;
  //     //     min-height: 52px;
  //     //     border-radius: 5px;
  //     //     overflow: hidden;
  //     //     .btn {
  //     //       width: 50px;
  //     //       height: 51px;
  //     //       position: relative;
  //     //       cursor: pointer;
  //     //       overflow: hidden;
  //     //       border-bottom: 1px solid #ededed;
  //     //       span {
  //     //         display: flex;
  //     //         justify-content: center;
  //     //         align-items: center;
  //     //         width: 100%;
  //     //         height: 100%;
  //     //         text-align: center;
  //     //         transition: all ease .2s;
  //     //       }
  //     //       .iconfont {
  //     //         font-size: 24px;
  //     //       }
  //     //       span:nth-child(1) {
  //     //         opacity: 1;
  //     //         color: #999999;
  //     //       }
  //     //       span:nth-child(2) {
  //     //         opacity: 0;
  //     //         position: absolute;
  //     //         top: 0px;
  //     //         left: 0px;
  //     //         font-size: 14px;
  //     //         padding: 0 6px;
  //     //         background: #2993f8;
  //     //         color: #fff;
  //     //       }
  //     //     }
  //     //     .btn:last-child {
  //     //       border-bottom: none;
  //     //     }
  //     //     .btn:hover {
  //     //       span:nth-child(1) {
  //     //         opacity: 0;
  //     //       }
  //     //       span:nth-child(2) {
  //     //         opacity: 1;
  //     //       }
  //     //     }
  //     //   }
  //     // }
  //     // .cashier-box {
  //     //   width: 800px;
  //     //   height: 200px;
  //     //   background: #fff;
  //     //   border-radius: 10px;
  //     //   box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  //     //   margin: 0 auto;
  //     //   .cashier-title {
  //     //     padding-left: 20px;
  //     //     padding-right: 20px;
  //     //     height: 50px;
  //     //     width: 100% !important;
  //     //     h3 {
  //     //       line-height: 50px;
  //     //       float: left;
  //     //     }
  //     //     span {
  //     //       line-height: 50px;
  //     //       float: right;
  //     //     }
  //     //   }
  //     //   .cashier-content {
  //     //     height: 100px;
  //     //     padding-left: 20px;
  //     //     padding-right: 20px;
  //     //     width: 100% !important;
  //     //     box-sizing: border-box;
  //     //     .item-box {
  //     //       width: 100px;
  //     //       height: 100px;
  //     //       float: left;
  //     //       background: #e8e8e8;
  //     //       margin-right: 20px;
  //     //       position: relative;
  //     //       padding-top: 10px;
  //     //       .num {
  //     //         text-align: center;
  //     //         font-size: 14px;
  //     //         color: #333;
  //     //       }
  //     //       .unit {
  //     //         text-align: center;
  //     //         position: absolute;
  //     //         width: 100%;
  //     //         height: 20px;
  //     //         bottom: 10px;
  //     //         left: 0;
  //     //         font-size: 14px;
  //     //         color: #666;
  //     //       }
  //     //     }
  //     //     .item-little-box {
  //     //       height: 36px;
  //     //       width: 200px;
  //     //       float: left;
  //     //       margin-right: 20px;
  //     //       margin-bottom: 20px;
  //     //       span {
  //     //         img {
  //     //           float: left;
  //     //           display: block;
  //     //           margin-right: 5px;
  //     //           margin-top: 6px;
  //     //         }
  //     //         display: block;
  //     //         float: left;
  //     //         font-size: 14px;
  //     //         color: #333;
  //     //         line-height: 36px;
  //     //       }
  //     //       input {
  //     //         border: 1px solid #ddd;
  //     //         border-radius: 4px;
  //     //         width: 120px;
  //     //         height: 36px;
  //     //         float: right;
  //     //       }
  //     //       div {
  //     //         float: right;
  //     //         width: 120px;
  //     //         height: 36px;
  //     //         line-height: 36px;
  //     //       }
  //     //     }
  //     //     .item-little-box:nth-child(4) {
  //     //       margin-right: 0;
  //     //     }
  //     //     .item-little-box:nth-child(7) {
  //     //       margin-right: 0;
  //     //     }
  //     //   }
  //     //   .cashier-footer {
  //     //     height: 50px;
  //     //     width: 100%;
  //     //     line-height: 40px;
  //     //     p {
  //     //       height: 40px;
  //     //       float: right;
  //     //       text-align: right;
  //     //       font-size: 14px;
  //     //       color: #fe4444;
  //     //       padding-right: 20px;
  //     //     }
  //     //   }
  //     // }
  //     // .body-row5 {
  //     //   margin: 0 auto;
  //     //   height: 58px;
  //     //   width: 1250px;
  //     //   background: #fff;
  //     //   border-radius: 10px;
  //     //   box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  //     //   margin-bottom: 30px;
  //     //   position: fixed;
  //     //   bottom: 0;
  //     //   left: 190px;
  //     //   z-index: 20;
  //     //   .btn-wrap {
  //     //     width: 880px;
  //     //     height: 100%;
  //     //     margin: 0 auto;
  //     //     display: flex;
  //     //     justify-content: center;
  //     //     .btn {
  //     //       width: 90px;
  //     //       height: 36px;
  //     //       color: #fff;
  //     //       background: #2993f8;
  //     //       float: left;
  //     //       border-radius: 4px;
  //     //       font-size: 14px;
  //     //       text-align: center;
  //     //       line-height: 36px;
  //     //       font-weight: bold;
  //     //       margin-top: 13px;
  //     //       margin-right: 56px;
  //     //       cursor: pointer;
  //     //       transition: all .3s;
  //     //       &:hover {
  //     //         background: #057aea;
  //     //       }
  //     //     }
  //     //   }
  //     //   .el-icon-delete2 {
  //     //     position: absolute;
  //     //     right: 10px;
  //     //     top: 16px;
  //     //     font-size: 30px;
  //     //     color: #2993f8;
  //     //     cursor: pointer;
  //     //   }
  //     // }
  //     // .operat-box {
  //     //   width: 1250px;
  //     // }
  //   }
  // }
</style>
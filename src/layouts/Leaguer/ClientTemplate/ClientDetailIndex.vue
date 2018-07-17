<template>
  <div class="client-detail-wrap">
      <h3>
          <span>顾客详情</span>
          <i v-if="filterVip(clickDetail.vipGroup)">{{filterVip(clickDetail.vipGroup)}}</i>
      </h3>
        
      <div class="head-portrait-wrap">
        <div class="img-wrap">
          <img :src="clickDetail.imageUri" alt="">
        </div>
        <div class="grade-tit" v-if="clickDetail.grade">{{filterGradeName(clickDetail.grade)}}</div>
      </div>

      <div class="client-module-wrap mb30">
          <h5>
              <i></i>
              <span>到店记录</span>
          </h5>
          <ul class="pl8">
              <li>
                  <span>性别</span>
                  <span>{{clickDetail.sex}}</span>
              </li>
              <li>
                  <span>年龄段</span>
                  <!-- <span>{{filterAge(clickDetail.ageGroup)}}</span> -->
                  <span>{{clickDetail.age}}</span>
              </li>
              <li>
                  <span>到店总数</span>
                  <span @click="seekVisit" class="visit-total-num">
                    {{clickDetail.count}}
                    <i v-if="clickDetail.personCode">></i>
                  </span>
              </li>
              <li>
                  <span>购买意向</span>
                  <textarea style="font-size: 12px;" v-if="shopManRole || shopManageRole" cols="26" rows="7" v-model="clickDetail.intention" @blur="amendIntention(clickDetail.intention)" placeholder="请填写购买意向"></textarea>
                  <span v-else>{{clickDetail.intention}}</span>
              </li>
          </ul>
          <ul>
              <li>
                  <span>消费金额</span>
                  <span>{{clickDetail.amount}}</span>
              </li>
              <li>
                  <span>接待人</span>
                  <DownMenu
                    v-if="shopManRole || shopManageRole"
                    :titleInfo="currentUser.userName || clickDetail.receiver || '无'"
                    :showList="checkUserList"
                    :isSolid="true"
                    :specialStyle="specialStyle"
                    @changeData="changeShopData"
                    @clearInfo="clearShopData"
                  ></DownMenu>
                  <span v-else style="font-size: 12px">{{clickDetail.receiver ? clickDetail.receiver : '无'}}</span>
              </li>
              <li>
                  <span>到店时间</span>
                  <span>
                      {{_GetChineseNYR(clickDetail.imageTime)}} &nbsp
                      {{_GetSF(clickDetail.imageTime)}}
                  </span>
              </li>
          </ul>
      </div>
      <div class="client-module-wrap pt30 bt-c">
          <h5>
              <i></i>
              <span>上次到店记录</span>
          </h5>
          <ul class="pl8">
              <li>
                  <span style="margin-right: 10px;maxWidth: 100px;">上次购买意向</span>
                  <span style="maxWidth: 190px; vertical-align: top;">{{clickDetail.preIntention ? clickDetail.preIntention : '无'}}</span>
              </li>
          </ul>
          <ul>
              <li>
                  <span style="margin-right: 10px;">上次接待人</span>
                  <span>{{clickDetail.preReceiver ? clickDetail.preReceiver : '无'}}</span>
              </li>
          </ul>
      </div>
      <ul class="client-operation-btn">
          <li @click="_operateCreateSellOrder" v-if="shopManRole && clickDetail.memberId || shopManageRole && clickDetail.memberId">快捷开单</li>
          <li @click="openEditReturn" v-if="clickDetail.memberId">会员详情</li>
          <template v-else>
            <li @click="_operateRelevance">关联会员</li>
            <li @click="openAddLeaguer">转为会员</li>
          </template>
          <li @click="_operateOpIntention(clickDetail.intentionFlag)" v-if="shopManRole || shopManageRole">
            {{clickDetail.intentionFlag == 0 ? '设为意向' : '取消意向'}}
          </li>
      </ul>
  </div> 
</template>
<script>
import {mapGetters} from 'vuex'
import {GetChineseNYR, GetSF} from 'assets/js/getTime'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import {seekInfoVisitor, seekGetShopUserList} from 'Api/commonality/seek'
import {operateCreateSellOrder, operateUpdateVisitInfo, operateOpIntention} from 'Api/commonality/operate'
import DownMenu from './DownMenu'
export default {
    props: ['currentSeekData', 'shopId'],
    components: {
        DownMenu
    },
    data () {
        return {
            specialStyle: {
              'textAlign': 'left'
            },
            addLeaguer: false,
            clickDetail: {},
            currentUser: {

            },
            checkUserList: [
              {
                name: 123,
                id: 1123,
              },
              {
                name: 123456,
                id: 16,
              }
            ]
        }
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "userPositionInfo" // 职位信息
        ]),
        shopManRole: function () { // 店员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopManRole(this.userPositionInfo.roleList)
            }
        },
        shopManageRole: function () { // 店长
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
            }
        }
    },
    watch: {
        'currentSeekData' () {
            // console.log('路由', this.$route.path)
            this._seekList()
        }
    },
    created () {
      this._seekGetShopUserList()
    },
    methods: {
        filterGradeName (parm) {
          if (parm == 1) {
            return '普通'
          }
          if (parm == 1) {
            return '中级'
          }
          if (parm == 1) {
            return '重要'
          }
          return ''
        },
        _GetChineseNYR (parm) {
          return GetChineseNYR(parm)
        },
        _GetSF (parm) {
          return GetSF(parm)
        },
        _seekGetShopUserList () {
          let options = {
            page: '1',
            pageSize: 9999,
            shopId: this.shopId
          }
          seekGetShopUserList(options)
            .then(res => {
              if (res.data.state === 200) {
                  this.checkUserList = res.data.data.shopUserList
              } else {
                  this.$store.dispatch('workPopupError', res.data.msg);
              }
            })
        },
        open () {
            this.addLeaguer = true
        },
        changeShopData (parm) {
          this.currentUser = parm
          let options = {
            id: this.clickDetail.id,
            receiverId: parm.userId
          }
          this._operateUpdateVisitInfo(options)
        },
        amendIntention (parm) {
          let options = {
            id: this.clickDetail.id,
            intention: parm
          }
          this._operateUpdateVisitInfo(options)
        },
        _operateUpdateVisitInfo (options) {
          operateUpdateVisitInfo(options)
            .then(res => {
              if (res.data.state == 200) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.msg
                })
              }
            })
        },
        clearShopData () {
          this.currentUser = {}
        },
        _operateRelevance () {
          this.$emit('relevanceMember', this.clickDetail.id)
        },
        openAddLeaguer () {
          this.$emit('openAddLeaguer', this.clickDetail.id)
        },
        _operateOpIntention (parm) {
          let options = {
            shopId: this.shopId,
            operateType: parm == 0 ? 1 : 2,
            idList: [
              {
                id: this.currentSeekData.id
              }
            ]
          }
          operateOpIntention(options)
            .then(res => {
                if (res.data.state == 200) {
                  this.$message({
                    type: 'success',
                    message: options.operateType == 0 ? '设置意向成功' : '取消意向成功'
                  })
                  this.$emit('successOperationIntention')
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.data.msg
                  })
                }
            })
        },
        seekVisit () {
          if (this.clickDetail.personCode) {
            this.$emit('openHistory', this.clickDetail.personCode)
          }
        },
        openEditReturn () {
          this.$emit('openEditReturn')
        },
        _seekList (parm) {
          let options = {
            otherId: parm || this.currentSeekData.id
            // shopId: this.shopId,
            // dateTime: parm ? parm.visitTime : this.currentSeekData.imageTime
          }
          seekInfoVisitor(options)
            .then(res => {
              if (res.data.state == 200) {
                this.clickDetail = res.data.data
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.msg
                })
              }
            })
        },
        _operateCreateSellOrder () {
            var options = {
                "shopId": this.shopListByCo[0] ? this.shopListByCo[0].shopId : ''
            }
            operateCreateSellOrder(options).then((response) => {
              debugger
                if (response.data.state === 200) {
                    this.$router.push({
                        path: "/work/sell/sellReceiptsList",
                        query: {
                            path: this.$route.path,
                            orderNumber: response.data.data.orderNum
                        }
                    })
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log(response);
            })
        },
        // filterSex (parm) {
        //     switch (parm) {
        //         case '1':
        //             return '男'
        //         case '2':
        //             return '女'
        //         default:
        //             return '未设置'
        //     }
        // },
        filterAge (parm) {
            switch (parm) {
                case '1':
                    return '1-9岁'
                case '2':
                    return '10-19岁'
                case '3':
                    return '20-29岁'
                case '4':
                    return '30-39岁'
                case '5':
                    return '40-49岁'
                case '6':
                    return '50-59岁'
                case '7':
                    return '60以上'
                default:
                    return '未设置'
            }
        },
        filterVip (parm) {
            switch (parm) {
                case '1':
                    return ''
                case '2':
                    return '初级'
                case '3':
                    return '中级'
                case '4':
                    return '高级'
            }
        }
    }
}
</script>
<style lang="scss">
.client-detail-wrap{
    width: 700px;
    height: 690px;
    padding: 0 36px;
    >h3{
        margin-top: -40px;
        height: 50px;
        line-height: 50px;
        width: 80%;
        font-size: 0;
        >span{
            font-size: 16px;
            font-weight: bold;
        }
        >i{
            display: inline-block;
            width: 38px;
            height: 20px;
            text-align: center;
            background-color: #ffc62e;
            line-height: 20px;
            font-style: normal;
            font-size: 12px;
            margin-left: 10px;
            border-radius: 4px;
            color: #fff;
        }
    }
    >.head-portrait-wrap{
      position: relative;
      height: 122px;
      >.img-wrap{
        width: 72px;
        height: 72px;
        margin: 20px auto 0 auto;
        border-radius: 50%;
        overflow: hidden;
        >img{
          width: 100%;
        }
      }
      >.grade-tit{
        position: absolute;
        bottom: 30px;
        left: 350px;
        padding: 3px 3px;
        font-size: 12px;
        line-height: 12px;
        color: #fff;
        border-radius: 5px;
        background-color: rgb(249, 160, 58);
      }
    }
    >.client-module-wrap{
        font-size: 0;
        >h5{
            font-size: 0;
            height: 12px;
            >i{
                display: inline-block;
                vertical-align: top;
                width: 3px;
                height: 12px;
                margin-top: 2px;
                background-color: #2993f8;
            }
            span{
                font-size: 14px;
                vertical-align: top;
                color: #2993f8;
                margin-left: 5px;
                font-weight: normal;
            }
        }
        >ul{
            width: 50%;
            display: inline-block;
            vertical-align: top;
            >li{
                margin-top: 26px;
                span{
                    display: inline-block;
                    font-size: 12px;
                    color: #999;
                }
                span:nth-child(1){
                    min-width: 70px;
                }
                span:nth-child(2){
                    color: #333;
                }
                >.visit-total-num{
                    color: #2993f8!important;
                    cursor: pointer;
                    >i{
                        font-style: normal;
                        color: #333;
                        margin-left: 10px;
                    }
                }
                textarea{
                    padding-top: 5px;
                    text-indent: 12px;
                    border: 1px solid #d6d6d6;
                    color: #333;
                    vertical-align: top;
                }
            }
        }
        .pl8{
            padding-left: 8px;
        }
    }
    >.client-operation-btn{
        position: absolute;
        text-align: center;
        // width: 100%;
        left: 0;
        right: 0;
        bottom: 26px;
        margin: auto;
        font-size: 0;
        >li{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            width: 80px;
            border-radius: 4px;
            font-size: 12px;
            margin-right: 12px;
            color: #fff;
            text-align: center;
            background-color: #2993f8;
            cursor: pointer;
            font-weight: bold;
        }
        >li:last-child{
            margin-right: 0; 
        }
    }
    .pt30{
        padding-top: 30px;
    }
    .mb30{
        margin-bottom: 30px;
    }
    .bt-c{
       border-top: 1px solid #ededed; 
    }
}
</style>
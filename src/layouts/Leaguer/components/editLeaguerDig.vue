<template>
    <el-dialog :visible.sync="editLeaguer" top="10%" customClass="addLeaguerDig" :close-on-click-modal="false" @close="close">
        <div class="edit-leaguer-dig-main" @click="clickAll">
            <div class="title">
                会员信息
            </div>
            <div class="edit-scoll-main">
                <div style="padding-bottom: 10px;">
                    <div class="other">
                        <div class="other-title">
                            <span></span>
                            到店记录
                        </div>
                        <ul class="record-list">
                            <li>
                                <span>最近到店时间</span>
                                <span>
                                    {{_GetChineseNYR(initData.visitTime)}}&nbsp;&nbsp;
                                    {{_GetSF(initData.visitTime)}}
                                </span>
                            </li>
                            <li>
                                <span>访问总数</span>
                                <span style="color: #2993f8;" @click="seekHistoryList(initData.personCode)">{{initData.visitTotalNum}}</span>
                                <i>></i>
                            </li>
                        </ul>
                    </div>

                    <div class="info">
                        <div class="logo">
                            <!-- <img :src="dataInfo.memberLogo"> -->
                            <FormatImg :logo="dataInfo.logo" class="img" :userName="dataInfo.memberName" :size="72"></FormatImg>
                        </div>
                        <div class="info-main">
                            <ul class="info-left">
                                <li>
                                    <label><span>*</span>姓名</label>
                                    <div>
                                        <input v-if="operateType == 1" v-model="dataInfo.memberName" class="inp" type="text" placeholder="输入姓名">
                                        <span v-else @click="operateType = 1">{{dataInfo.memberName}}</span>
                                    </div>
                                </li>
                                <li><label>会员编号</label>
                                    <div>
                                        <span>{{dataInfo.memberNum}}</span>
                                    </div>
                                </li>
                                <li>
                                    <label>负责人</label>
                                    <div>
                                        <!-- <el-checkbox @change="leaderChange" v-model="isLeader" v-if="!shopManageRole">{{leader}}</el-checkbox> -->
                                        <span v-if="!shopManageRole">{{this.leaderStr}}</span>
                                        <span @click="isChoseLeader = true" v-else>{{dataInfo.principalList.length == 0 ? '指派' : this.leaderStr}}</span>
                                    </div>
                                </li>
                                <li class="orderNum">
                                    <label>销售单号</label>
                                    <!-- <div>
                                        <input v-if="operateType == 2" v-model="dataInfo.orderList[0].sellOrderNum" class="inp" type="text" placeholder="销售单号">
                                        <span v-else @click="operateType = 2">{{dataInfo.orderNo}}</span>
                                    </div> -->
                                    <div>
                                        <i @click="openOrder" class="iconfont icon-sousuo"></i>
                                        <input v-model="orderListData" @keyup.enter="importData" class="inp" type="text" placeholder="销售单号">
                                        <ul v-if="dataInfo.orderList.length > 1">
                                            <li v-for="(item, index) in dataInfo.orderList" :key="index">{{item.orderNo}}</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                            <ul class="info-right">
                                <li>
                                    <label><span>*</span>手机号</label>
                                    <div>
                                        <input v-if="operateType == 3" v-model="dataInfo.phone" type="text" class="inp" placeholder="输入手机号">
                                        <span v-else @click="operateType = 3">{{dataInfo.phone}}</span>
                                    </div>
                                </li>
                                <li>
                                    <label>级别</label>
                                    <div>
                                        <div @click="leave = 1"  class="lv lv1">普通<i :class="{active:leave == 1}" class="iconfont icon-duigou2"></i></div>
                                        <div @click="leave = 2" class="lv lv2">中级<i :class="{active:leave == 2}" class="iconfont icon-duigou2"></i></div>
                                        <div @click="leave = 3" class="lv lv3">重要<i :class="{active:leave == 3}" class="iconfont icon-duigou2"></i></div>
                                    </div>
                                </li>
                                <li>
                                    <label>生日</label>
                                    <div>
                                        <div class="birthday" v-show="operateType == 4">
                                            <el-date-picker
                                                :editable="false"
                                                v-model="birthday"
                                                type="date"
                                                :clearable="true"
                                                placeholder="选择日期"
                                                format="yyyy年MM月dd日"
                                                @change="changeBir"
                                                value-format="yyyy-MM-dd">
                                            </el-date-picker>
                                            <i @click="clearBirthday" class="iconfont icon-guanbi-copy"></i>
                                        </div>
                                        <span v-show="operateType != 4" @click="operateType = 4">{{birthday}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="other">
                        <div class="other-title">
                            <span></span>
                            其他信息
                        </div>
                        <div class="other-main">
                            <ul class="other-list-left">
                                <li>
                                    <label>邮箱</label>
                                    <div>
                                        <input @click.stop="" v-if="operateType == 5 && shopRole == 'true'" v-model="dataInfo.email" class="inp" type="text" placeholder="输入邮箱地址">
                                        <span v-else @click.stop="operateType = 5">{{dataInfo.email}}</span>
                                    </div>
                                </li>
                                <li>
                                    <label>创建时间</label>
                                    <div><span>{{_GetNYR(dataInfo.createTime)}}</span></div>
                                </li>
                                <li class="ind">
                                    <label>行业</label>
                                    <div>
                                        <input @click.stop="" v-if="operateType == 6 && shopRole == 'true'" @click="isShowInd = !isShowInd" v-model="dataInfo.industry" class="inp" type="text" placeholder="选择行业">
                                        <span v-else @click.stop="operateType = 6">{{dataInfo.industry}}</span>
                                        <ul :class="{active: isShowInd}">
                                            <li @click.stop="choseIndustry(item)" :class="{active:dataInfo.industry == item.inName}" v-for="(item, index) in industryList" :key="index">{{item.inName}}</li>
                                        </ul>

                                    </div>
                                </li>
                                <li class="address">
                                    <label>省市区</label>
                                    <div>
                                        <input @click.stop="" v-if="operateType == 7 && shopRole == 'true'" v-model="PCAData" @click.stop="isShowPCA = !isShowPCA" class="inp" type="text" placeholder="选择省市区">
                                        <span v-else @click.stop="operateType = 7">{{PCAData}}</span>
                                        <AddressSelect v-if="isShowPCA" @addressReturn="SelectArea"></AddressSelect>
                                    </div>
                                </li>
                            </ul>
                            <ul class="other-list-right">
                                <li>
                                    <label>微信号</label>
                                    <div>
                                        <input @click.stop="" v-if="operateType == 8 && shopRole == 'true'" v-model="dataInfo.wx" class="inp" type="text" placeholder="输入微信号">
                                        <span v-else @click.stop="operateType = 8">{{dataInfo.wx}}</span>
                                    </div>
                                </li>
                                <li>
                                    <label>订单总额</label>
                                    <div><span>{{dataInfo.totalMoney}}</span></div>
                                </li>
                                <li class="update">
                                    <label>名片上传</label>
                                    <div>
                                        <img class="card" src="./../../../../static/img/member/new/card.png"/>
                                        <img v-if="dataInfo.cardSrc != '' || dataInfo.cardSrc != null" class="card-img" :src="dataInfo.cardSrc" />
                                        <span v-if="shopRole == 'true'" @click.stop="selectFile(1)">上传</span>
                                        <img style="display:none;" id="preview_img" >
                                        <input style="display: none;" type="file" id="file_input" @change="changeFileInput"/>
                                    </div>
                                </li>
                                <li>
                                    <label>详细地址</label>
                                    <div>
                                        <input @click.stop="" v-if="operateType == 9 && shopRole == 'true'" v-model="dataInfo.address" class="inp" type="text" placeholder="未填写">
                                        <span v-else @click.stop="operateType = 9">{{dataInfo.address}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="follow">
                            <div @click.stop="isShowFllow = true" class="remark-left">
                                <div class="title"><span></span><em>最近跟进记录</em></div>
                                <p>
                                  <span class="followtime">{{dataInfo.followTime}}</span>
                                  <span class="followstatus" v-if="dataInfo.followStatus == 1">未完成</span>
                                  <span class="followstatus" v-if="dataInfo.followStatus == 2">已超时</span>
                                  <span class="followstatus" v-if="dataInfo.followStatus == 3">已完成</span>
                                  <span class="followstatus" v-if="dataInfo.followStatus == 4">已暂停</span>
                                  <span class="followname">{{dataInfo.followUserName}}</span>
                                </p>
                            </div>
                            <div @click.stop="isShowBuy = true" class="remark-right">
                                <div class="title"><span></span><em>最近购买记录</em></div>
                                <p>
                                  <span class="shoptime">{{dataInfo.latelyBuyTime}}</span>
                                  <span class="shopstatus" v-if="dataInfo.latelyBuyNum">{{dataInfo.latelyBuyNum}}件</span>
                                  <span class="shopmoney">{{dataInfo.latelyBuyPrice}}</span>
                                </p>
                            </div>
                    </div>
                    <div class="remark">
                            <div class="remark-left">
                                <div class="title"><span></span><em>备注</em></div>
                                <textarea v-model="dataInfo.remark"></textarea>
                            </div>
                            <div class="remark-right">
                                <div class="title"><span></span><em>标签</em></div>
                                <ul class="label-area">
                                    <li class="label" :key="index" v-for="(item, index) in dataInfo.signList">{{item.signName}}
                                        <i @click.stop="delLabel(item, index)" class="iconfont icon-guanbi-copy"></i>
                                    </li>
                                    <input maxlength="6" v-if="dataInfo.signList.length < 4" @blur="followCreateSign" class="add-label" type="text" placeholder="添加标签" v-model="signName">
                                </ul>
                            </div>
                    </div>
                    
                </div>
            </div>
<!--             <div class="footer"> -->
     <!--        <div class="btn-wrap" >
                <div class="btn1" @click.stop="close">取消</div>
                <div class="btn2" v-if="shopRole == true" @click.stop="memberUpdateBy">确定</div>
                <div class="btn3" @click.stop="deletevip" v-if="shopManageRole == true">删除会员</div>
                <li class="btn2" @click="_operateOpIntention(initData)" v-if="shopManRole || shopManageRole">
                    {{initData.intentionFlag == 1 ? '取消意向' : '设为意向'}}
                </li>
            </div> -->
            <ul class="client-operation-btn">
                <li class="btn1" @click.stop="close">取消</li>
                <li class="btn2" v-if="shopRole == true" @click.stop="memberUpdateBy">确定</li>
                <li class="btn3" @click.stop="deletevip" v-if="shopManageRole == true">删除会员</li>
                <li class="btn2" @click="_operateOpIntention(initData)" v-if="shopManRole || shopManageRole">
                    {{initData.intentionFlag == 1 ? '取消意向' : '设为意向'}}
                </li>
            </ul>
<!--             </div>   -->
        </div>
        <!-- 跟进记录 -->
        <el-dialog :modal="false" :visible.sync="isShowFllow" top="0" customClass="followReDig">
            <followRecord
                :isShowFllow="isShowFllow"
                :shopId="shopId"
                :shopManageRole="shopManageRole"
                :memberId="memberId"
            ></followRecord>
        </el-dialog>
        <!-- 购买记录 -->
        <el-dialog :modal="false" :visible.sync="isShowBuy" top="0" customClass="buyReDig">
            <buyRecord
                :isShowBuy="isShowBuy"
                :shopId="shopId"
                :shopManageRole="shopManageRole"
                :memberId="memberId"
            ></buyRecord>
        </el-dialog>
        <sellOrderList
            :shopId="shopId"
            :saveSuccess="saveSuccess"
            @closeOrderList="closeOrderList"
            @closeOnly="closeOnly"
            isEdit="1"
        ></sellOrderList>
        <!-- 选择负责人 -->
        <el-dialog :modal="false" :visible.sync="isChoseLeader" top="0%" customClass="choseLeaderDig" :close-on-click-modal="false">
            <ChoseLeader
                :dataInfo="dataInfo"
                :shopId="shopId"
                :addModel="1"
                :isChoseLeader="isChoseLeader"
                @closeChoMember="closeChoLeader"
            ></ChoseLeader>
        </el-dialog>

        <!-- 外链顾客详情 -->
<!--         <ClientDetail
            @relevanceMember="relevanceMember"
            @openEditReturn="openEditReturn"
            ref="clientDetailWrap"
            :currentSeekData="{id: memberId}"
            :shopId="shopId"
            :isMember="true"
        ></ClientDetail> -->
    </el-dialog>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
const industryList = require('./industryData')
import base from 'src/config/base/index'
import baseApi from 'Api/Base/base'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import AddressSelect from 'src/components/template/AddressSelect'
import {seekFollowSignList, seekUserInfo, seekGetMemberInfo, seekGoodsSellOrder} from 'Api/commonality/seek'
import {operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention} from 'Api/commonality/operate'
import ChoseLeader from './choseLeader'
import SellOrderList from './sellOrderList'
import followRecord from './followRecord'
import buyRecord from './buyRecord'
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'
import FormatImg from 'components/template/DefaultHeadFormat.vue'

import ClientDetail from './../ClientTemplate/ClientDetail.vue'
export default {
    props: [
        'editLeaguer',
        'shopId',
        'memberId',
        'orderNum',
    ],
    components: {
      AddressSelect,
      ChoseLeader,
      SellOrderList,
      followRecord,
      buyRecord,
      FormatImg,
      ClientDetail
    },
    data () {
        return {
            show: true,
            operateType: 0,
            leave: 1,
            isShowPCA: false,
            saveSuccess: false,
            isShowFllow: false,
            isShowBuy: false,
            year: '',
            month: '',
            day: '',
            dataInfo: {
                username: '',
                principalFlag: '',
                followTime: '',
                followStatus: '',
                followUserName: '',
                latelyBuyTime: '',
                latelyBuyNum: '',
                latelyBuyPrice: '',
                logo: '',
                memberName: '', // 名称
                memberNum: '',
                phone: '', // 手机号
                cardSrc: '', // 名片地址
                orderList: [
                ],
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
            birthday: '',
            leader: '', // 负责人
            isLeader: true,
            orderListData: '',
            PCAData: '', // 省市区数据
            signName: '',
            industryList: industryList, // 行业数据
            isShowInd: false,
            isChoseLeader: false,
            leaderStr: '批量指派',
            prinList: '', // 负责人重组
            initData: '', // 初始化数据
            updataOption: {

            }

        }
    },
    created () {

    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
            "shopListByCo", // 店铺列表
            "productClass", // 产品类别
            "supplierListData", // 供应商
            "userPositionInfo" // 职位信息
        ]),
        shopRole: function () { // 店员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        computedRole: function () { // 公司
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
            }
        },
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
        editLeaguer (val) {
            console.log('执行')
            if (val == true) {
                Object.assign(this.dataInfo, {
                    memberName: '', // 名称
                    phone: '', // 手机号
                    cardSrc: '', // 名片地址
                    orderList: [],
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
                    signList: [

                    ]
                })
                if (this.shopRole && this.shopManRole) {
                    this.dataInfo.principalList.push({userId: sessionStorage.getItem('id')})
                    // this.dataInfo.principalList = Array.from(new Set(this.dataInfo.principalList))
                    
                }
            }
            console.log(this.dataInfo.principalList)
        },
    },
    mounted () {
        setTimeout(() => {
            $(".edit-scoll-main").mCustomScrollbar({
                theme: "minimal-dark",
                axis: 'y',
                mouseWheel: {
                    scrollAmount: 200,
                    preventDefault: false,
                    normalizeDelta: false,
                    scrollInertia : 0
                },
                callbacks: {
                    onTotalScroll: function () {
                        // _this.$emit('lazyloadSend', {refresh: true})
                    }
                }
            })
        }, 500)
        this.getUserInfo()
        this.getMemberInfo()
    },
    methods: {
        _operateOpIntention (parm) {
          let options = {
            shopId: this.shopId,
            operateType: parm.intentionFlag == 1 ? 2 : 1,
            idList: [
              {
                id: this.memberId
              }
            ]
          }
          operateOpIntention(options)
            .then(res => {
                if (res.data.state == 200) {
                  this.$message({
                    type: 'success',
                    message: options.operateType == 1 ? '设置意向成功' : '取消意向成功'
                  })
                  this.getMemberInfo()
                  // if (parm.intentionFlag == 1) {
                  //   parm.intentionFlag = 2
                  // } else {
                  //   parm.intentionFlag == 1
                  // }
                  // this.$emit('successOperationIntention')
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.data.msg
                  })
                }
            })
        },
        relevanceMember (parm) {
            this.isRadio = true
            this.isChoseMember = true
            this.relevanceId = parm
        },
        openEditReturn () {
            this.editLeaguer = true
        },
        seekHistoryList (parm) {
            // this.$refs.clientDetailWrap.open()
            this.$emit('seekHistoryList', parm)
        },
        clearBirthday () {
            this.birthday = ''
            this.dataInfo.birthday = ''
        },
        clickAll () {
            // console.log(111)
            this.isShowInd = false
            this.isShowPCA = false
            this.operateType = 0
        },
        timeFormat (parm) {
            // console.log(parm)
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + '000000'
        },
        formatData (parm) {
            let year = parm.substring(0, 4)
            let month = parm.substring(4, 6)
            let data = parm.substring(6, 8)
            // console.log(year)
            // console.log(month)
            // console.log(data)
            return year + '-' + month + '-' + data
            
        },
        changeBir (val) {
            console.log(val)
            // console.log(this.dataInfo.birthday)
            this.dataInfo.birthday = this.timeFormat(val)
            console.log(this.dataInfo.birthday)
        },
        _GetNYR (parm) {
            return GetNYR(parm)
        },
        _GetChineseNYR (parm) {
            return GetChineseNYR(parm)
        },
        _GetSF (parm) {
            return GetSF(parm)
        },
        // 删除会员
        deletevip () {
            this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            let options = {
              shopId: this.shopId,
              memberList: [{
                memberId: this.memberId
              }],
              operateType: 1
            }
            operateMemberOperation(options).then(res => {
              if (res.data.state == 200) {
                this.$message('删除成功')
                this.close()
                eventBus.$emit('oprationmemberAllList', '122')
              }
            }, res => {
              this.$message(res.data.msg)
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })

        },
        openOrder () { // 打开单据列表
            this.saveSuccess = !this.saveSuccess
        },
        closeOnly () {
            this.saveSuccess = false
        },
        closeOrderList (val) { // 选择单据结束的回调
            this.saveSuccess = false
            console.log(val)
            //this.dataInfo.orderList = val
            this.orderListData = val.join(',')
            val.forEach((item, index) => {
                // Object.assign(this.dataInfo.orderList[index], {
                //     orderNo: item
                // })
                this.dataInfo.orderList[index] = {orderNo: item}
            })
            console.log(this.dataInfo.orderList)
        },
        closeChoLeader (val) {
            console.log(val)
            this.dataInfo.principalList = []
            this.isChoseLeader = false
            this.leaderStr = val.nameList.join(',')
            val.list.forEach((item, index) => {
                this.dataInfo.principalList.push({userId: item})
            })
        },
        reArr (item) { // 负责人数组重组
            //console.log(item.principalList)
            let arr = []
            item.principalList.forEach((f, index) => {
              arr.push(f.username)
            })
            this.leaderStr = arr.join(',')
        },
        getMemberInfo () { // 获取会员信息
            let options = {
                shopId: this.shopId,
                memberId: this.memberId
            }
            seekGetMemberInfo(options).then((res) => {
                console.log(res)
                //console.log(333)
                if (res.data.state == 200) {
                    let datas = res.data.data
                    this.dataInfo.memberNum = datas.memberNum
                    this.dataInfo.memberName = datas.username
                    this.dataInfo.phone = datas.phone
                    this.dataInfo.cardSrc = datas.cardSrc
                    // 
                    if (datas.birthday != null || datas.birthday != '') {
                        this.dataInfo.birthday = datas.birthday
                        this.birthday = this.formatData(datas.birthday)
                    }
                    // console.log(this.formatData(datas.birthday))
                    // console.log(datas.birthday)
                    // console.log(this.dataInfo.birthday)
                    this.dataInfo.email = datas.email
                    this.dataInfo.wx = datas.weixin
                    this.dataInfo.industry = datas.profession
                    this.dataInfo.address = datas.address
                    this.dataInfo.principalList = datas.principalList
                    this.dataInfo.remark = datas.remark
                    this.dataInfo.signList = datas.signList
                    this.dataInfo.logo = datas.memberLogo
                    this.dataInfo.createTime = datas.createTime
                    this.dataInfo.totalMoney = datas.totalMoney
                    this.dataInfo.followTime = datas.followTime
                    this.dataInfo.followStatus = datas.followStatus
                    this.dataInfo.followUserName = datas.followUserName
                    this.dataInfo.latelyBuyTime = datas.latelyBuyTime
                    this.dataInfo.principalFlag = datas.principalFlag
                    this.dataInfo.latelyBuyNum = datas.latelyBuyNum
                    this.dataInfo.latelyBuyPrice = datas.latelyBuyPrice
                    this.dataInfo.visitTotalNum = 
                    this.dataInfo.visitTime = 
                    this.dataInfo.orderList = []
                    // this.orderListData = res.data.data.orderNo
                    // this.dataInfo.orderList = [{orderNo: res.data.data.orderNo}]
                    res.data.data.orderList.forEach((item, index) => {
                        this.orderListData += item.orderNum
                        this.dataInfo.orderList.push({orderNo: item.orderNum})
                    })
                    console.log(this.dataInfo)
                    this.leave = datas.type
                    this.username = datas.principalList.username
                    if (datas.provinceName != null) {
                        this.PCAData = datas.provinceName + ' / ' + datas.cityName + ' / ' + datas.areaName
                    }

                    this.initData = datas
                    this.reArr(this.dataInfo)
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
        leaderChange (val) {
            if (val == true) {
                this.dataInfo.principalList = [
                    {
                        userId: sessionStorage.getItem('id')
                    }
                ]
            } else {
                this.dataInfo.principalList = []
            }
        },
        leaderAction () {
            if (this.shopManageRole) {
                this.dataInfo.principalList = []
            } else {
                this.dataInfo.principalList = [
                    {
                        userId: sessionStorage.getItem('id')
                    }
                ]
            }
        },
        close () {
            //console.log(222)
            this.$emit("closeReturn", {status: false})
        },

        memberUpdateBy () { // 修改会员信息
            let options = {
                shopId: this.shopId,
                memberId: this.memberId,
                username: this.dataInfo.memberName,
                phone: this.dataInfo.phone,
                type: this.leave,
                birthday: this.dataInfo.birthday,
                principalList: this.dataInfo.principalList,
                email: this.dataInfo.email,
                weixin: this.dataInfo.wx,
                profession: this.dataInfo.industry,
                cardSrc: this.dataInfo.cardSrc,
                provinceId: this.dataInfo.provinceId,
                cityId: this.dataInfo.cityId,
                areaId: this.dataInfo.areaId,
                address: this.dataInfo.address,
                orderList: this.dataInfo.orderList,
                remark: this.dataInfo.remark,
                signList: this.dataInfo.signList,
                // followTime: res.data.data.followTime
                // followStatus: res.data.data.followStatus
                //     this.dataInfo.followUserName = res.data.data.followUserName
                //     this.dataInfo.latelyBuyTime = res.data.data.latelyBuyTime
                //     this.dataInfo.latelyBuyNum = res.data.data.latelyBuyNum
                //     this.dataInfo.latelyBuyPrice = res.data.data.latelyBuyPrice
            }
            console.log(options)
            if (this.dataInfo.orderList.length == 0) {
                delete options.orderList
            }
            if (this.dataInfo.principalList.length == 0) {
                delete options.principalList
            }
            operateMemberUpdateBy(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.$emit("closeReturn", {status: false})
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            }, (res) => {
                console.log(res)
                this.$message({
                    message: res.data.msg,
                    type: 'warning'
                })
            })
        },
        // memberCreate () { // 创建会员
        //     if (this.dataInfo.memberName == '') {
        //         this.$message({
        //             message: '会员名不可为空',
        //             type: 'warning'
        //         })
        //         return
        //     }
        //     if (this.dataInfo.phone == '') {
        //         this.$message({
        //             message: '手机号不可为空',
        //             type: 'warning'
        //         })
        //         return
        //     }
        //     let options = {
        //         shopId: this.shopId,
        //         username: this.dataInfo.memberName,
        //         phone: this.dataInfo.phone,
        //         type: this.leave,
        //         birthday: this.dataInfo.birthday,
        //         principalList: [],
        //         email: this.dataInfo.email,
        //         weixin: this.dataInfo.wx,
        //         profession: this.dataInfo.industry,
        //         cardSrc: this.dataInfo.cardSrc,
        //         provinceId: this.dataInfo.provinceId,
        //         cityId: this.dataInfo.cityId,
        //         areaId: this.dataInfo.areaId,
        //         address: this.dataInfo.address,
        //         orderList: this.dataInfo.orderList,
        //         remark: this.dataInfo.remark,
        //         signList: this.dataInfo.signList,
        //     }
        //     operateMemberCreate(options).then((res)=> {
        //         console.log(res)
        //         if (res.data.state == 200) {
        //             this.$emit("closeReturn", {status: false})
        //         } else {
        //             this.$message({
        //                 message: res.data.msg,
        //                 type: 'warning'
        //         })
        //         }
        //     }, (res) => {
        //         console.log(res)
        //     })
        // },
        choseIndustry (item) { // 选择行业
            this.dataInfo.industry = item.inName
            this.isShowInd = false
        },
        delLabel (item, index) {
            this.dataInfo.signList.splice(index, 1)
        },
        followCreateSign () { // 创建标签
            let options = {
                shopId: this.shopId,
                signName: this.signName
            }
            operateFollowCreateSign(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.dataInfo.signList.push({
                        signName: this.signName,
                        signId: res.data.data.signId
                    })
                    this.signName = ''
                }
            }, (res) => {
                console.log(res)
            })
        },
        followSignList () { // 标签列表
            seekFollowSignList({shopId: this.shopId}).then((res) => {
                console.log(res)
                if (res.data.state == 200) {

                }
            }, (res)=> {
                console.log(res)
            })
        },
        SelectArea (val) {  // 省市区
            console.log(val)
            this.dataInfo.provinceId = val.provId
            this.dataInfo.cityId = val.cityId
            this.dataInfo.areaId = val.areaId
            this.PCAData = val.provName + ' / ' + val.cityName + ' / ' + val.areaName
            this.isShowPCA = false
        },
        selectFile (type) {
            //this.updataImgType = type
            document.getElementById("file_input").click();
            //console.log(document.getElementById("file_input").value);
        },
        changeFileInput (ev) {
            console.log(ev.target.files[0])
            let self = this
            let file = ev.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(ev.target.files[0]);
                reader.onload = function (e) {
                document.getElementById("preview_img").src = this.result;
                self.uploadHandler(file, 1)

                }
            }
        },
        uploadHandler (file) {
            let self = this;
            let extNameList = file.name.split('.');
            let extName = extNameList[extNameList.length - 1]
            let getSignUrl = base.Cos.getSignUrl
            let updateUploadFileURL = base.Cos.updateUploadFileURL
            let myFolder = '/iconHeaded/'
            let appid = base.Cos.appid
            let bucket = base.Cos.bucket
            let region = base.Cos.region
            let userId = sessionStorage.getItem('id')
            let timestamp = new Date().getTime()
            let fileName = userId + '-' + timestamp + '.' + extName
            let cos = new CosCloud({
            appid: appid,
            bucket: bucket,
            region: region,
            getAppSign: function (callback) {
                    baseApi.apiCall({type: '1'}, getSignUrl).then((response) => {
                    //console.log(response.data)
                    let sign = response.data.data.signStr
                    console.log(sign);
                    myFolder = response.data.data.url
                    callback(sign)
                    })
                }
            })
            if (extName == 'png' || extName == 'jpg') {
                let successCallBack = function (result) {
                    self.dataInfo.cardSrc = result.data.source_url
                }
                let errorCallBack = function (result) {
                    console.log(result)
                }
                let progressCallBack = function (result) {
                    console.log(result)
                }
                cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 0) //0表示允许覆盖文件 1表示不允许
                } else {
                this.$store.dispatch('workPopupError', "文件格式必须为 *.jpg / *.png");
                location.reload();
                return
            }
        },
        getUserInfo () {
            seekUserInfo({userId: sessionStorage.getItem('id')}).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.leader = res.data.data.userName
                }
            }, (res) => {
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss">
.edit-scoll-main{
    height: 660px;
}
.addLeaguerDig {
    width: 700px;
    height: 800px;
    background:#fff;
    border-radius: 10px;
    padding: 0 30px;
    .menu-list {
        padding: 0 20px;
    }
    .member-list {
        padding: 0 20px;
    }
    &>.el-dialog__header {
        padding: 0;
        height: 0;
        overflow: hidden;
    }
    .el-dialog__body {
        padding: 0;
    }
    .edit-leaguer-dig-main {
        .title {
            height: 50px;
            margin-bottom: 12px;
            line-height: 50px;
            font-size: 16px;
            color:#333;
            font-weight: bold;
        }
        .info {
            width: 640px;
            height: 200px;
            background:#eef7fe;
            border-radius: 10px;
            margin-bottom: 30px;
            .logo {
                width: 90px;
                height: 100%;
                float: left;
                img {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    margin-left: 15px;
                    margin-top: 64px;
                }
                .img {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    margin-left: 15px;
                    margin-top: 64px;
                }
            }
            .info-main {
                width: 550px;
                float: left;
                height: 100%;
                padding-top: 23px;
                &>ul {
                    width: 275px;
                    height: 100%;
                    float: left;
                    li {
                        height: 28px;
                        width: 100%;
                        margin-bottom: 15px;
                        label {
                            width: 67px;
                            height: 28px;
                            line-height: 28px;
                            float: left;
                            text-align: right;
                            margin-right: 16px;
                            font-size: 14px;
                            color:#999999;
                            &>span {
                                color:#fd5852;
                            }
                        }
                        &>div {
                            float: left;
                            .inp {
                                width: 150px;
                                height: 28px;
                                border: 1px solid #d6d6d6;
                                border-radius: 2px;
                                padding-left: 10px;
                            }
                            .inp:hover {
                                border: 1px solid #2993f8;
                            }
                            &>span {
                                line-height: 28px;
                                display: block;
                                width: 150px;
                                height: 28px;
                                padding-left: 10px;
                            }
                        }
                    }
                }
                .info-left {
                    li {
                        &>div {
                            .el-checkbox {
                                .el-checkbox__input {
                                    el-checkbox__inner {
                                        width: 16px;
                                        height: 16px;
                                    }
                                    el-checkbox__inner:after {
                                        left: 4px;
                                    }
                                }
                                .is-checked {
                                    .el-checkbox__inner {
                                        background:#2993f8;
                                        border-color:#2993f8;
                                    }
                                }
                                .el-checkbox__label {
                                    font-size: 14px;
                                    color:#666;
                                }
                            }
                        }
                    }
                    .orderNum {
                        &>div {
                            position: relative;
                            input {
                                padding-right: 25px;
                            }
                            input:hover+ul{
                                z-index: 10;
                                top: 30px;
                                opacity: 1;
                            }
                            &>i {
                                position: absolute;
                                right: 6px;
                                top: 6px;
                                cursor: pointer;
                            }
                            &>ul {
                                position: absolute;
                                opacity: 0;
                                top: 50px;
                                left: 0px;
                                z-index: -1;
                                width: 160px;
                                height: 200px;
                                background:#fff;
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                                transition: all .3s;
                                overflow-y: auto;
                                li {
                                    line-height: 40px;
                                    height: 40px;
                                    margin: 0;
                                    padding-left: 20px;
                                    cursor: pointer;
                                }
                                li:hover {
                                    background-color:#f1f2f3;
                                }
                                li.active {
                                    color:#2993f8;
                                }
                            }
                        }
                    }
                }
                .info-right {
                    li {
                        &>div {
                            .lv {
                                float: left;
                                width: 34px;
                                height: 16px;
                                font-size: 12px;
                                color:#fff;
                                text-align: center;
                                line-height: 16px;
                                border-radius: 4px;
                                margin-right: 14px;
                                position: relative;
                                cursor: pointer;
                                i {
                                    width: 14px;
                                    height: 14px;
                                    font-size: 14px;
                                    position: absolute;
                                    right: -8px;
                                    top: -8px;
                                    background:#fff;
                                    border-radius: 50%;
                                    opacity: 0;
                                }
                                .active {
                                    opacity: 1;
                                }
                            }
                            .lv1 {
                                background:#ffc62e;
                                i {
                                    color:#ffc62e;
                                }
                            }
                            .lv2 {
                                background:#ffa200;
                                i {
                                    color:#ffa200;
                                }
                            }
                            .lv3 {
                                background:#ed7000;
                                margin-right: 0px;
                                i {
                                    color:#ed7000;
                                }
                            }
                            .birthday {
                                width: 150px;
                                height: 28px;
                                border: 1px solid #d6d6d6;
                                border-radius: 2px;
                                background:#fff;
                                //line-height: 28px;
                                font-size: 12px;
                                color:#333;
                                input {
                                    width: 30px;
                                    height: 100%;
                                    text-align: center
                                }
                                .iconfont {
                                    position: absolute;
                                    font-size: 12px;
                                    color:#999;
                                    right: 5px;
                                    top: 5px;
                                    cursor: pointer;
                                    display: none;
                                }
                            }
                            .birthday:hover {
                                border: 1px solid #2993f8;
                                .iconfont {
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
        .other {
            border-bottom: 1px solid #ededed;
            .other-title {
                height: 36px;
                color:#2993f8;
                font-size: 14px;
                &>span {
                    float: left;
                    width: 3px;
                    height: 14px;
                    border-radius: 2px;
                    background:#2993f8;
                    margin-right: 6px;
                }
            }
            .other-main {
                height: 208px;
                &>ul {
                    float: left;
                    height: 100%;
                    width: 320px;
                    li {
                        height: 28px;
                        margin-bottom: 22px;
                        label {
                            width: 74px;
                            height: 28px;
                            line-height: 28px;
                            float: left;
                            text-align: left;
                            // margin-right: 16px;
                            font-size: 14px;
                            color:#999999;
                            padding-left: 10px;
                        }
                        &>div {
                            float: left;
                            .inp {
                                width: 220px;
                                height: 28px;
                                border: 1px solid #d6d6d6;
                                border-radius: 2px;
                                padding-left: 10px;
                            }
                            .inp:hover {
                                border: 1px solid #2993f8;
                            }
                            &>span {
                                line-height: 28px;
                                display: block;
                                width: 220px;
                                height: 28px;
                                padding-left: 10px;
                            }
                        }
                    }
                }
                .other-list-left {
                    .address {
                        position: relative;
                        &>div {
                        }
                    }
                    .ind {
                        position: relative;
                        &>div {
                            &>ul {
                                position: absolute;
                                opacity: 0;
                                top: 50px;
                                left: 80px;
                                z-index: -1;
                                width: 200px;
                                height: 300px;
                                background:#fff;
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                                transition: all .3s;
                                overflow-y: auto;
                                li {
                                    line-height: 40px;
                                    height: 40px;
                                    margin: 0;
                                    padding-left: 20px;
                                    cursor: pointer;
                                }
                                li:hover {
                                    background-color:#f1f2f3;
                                }
                                li.active {
                                    color:#2993f8;
                                }
                            }
                            .active {
                                z-index: 10;
                                top: 30px;
                                opacity: 1;
                            }
                        }
                    }
                }
                .other-list-right {
                    .update {
                        &>div {
                            position: relative;
                            .card-img {
                                width: 80px;
                                height: 60px;
                                position: absolute;
                                top: -56px;
                                left: 0;
                                display: none;
                                background: #f6f6f6;
                            }
                            .card {
                                float: left;
                                margin-right: 10px;
                            }
                            .card:hover+.card-img {
                                display: block;
                            }
                            &>span {
                                text-decoration: underline;
                                cursor: pointer;
                                line-height: 28px;
                                color:#2993f8;
                            }
                        }
                    }
                }
            }
            .record-list{
                font-size: 0;
                margin-bottom: 20px;
                li{
                    display: inline-block;
                    width: 50%;
                    font-size: 12px;
                    span{
                        display: inline-block;
                        font-size: 12px;
                        color: #999;
                    }
                    span:nth-child(2){
                        margin-left: 10px;
                        color: #333;
                    }
                }
                li:nth-child(2){
                    position: relative;
                    span:nth-child(2){
                        float: right;
                        cursor: pointer;
                        margin-right: 30px;
                    }
                    i{
                        position: absolute;
                        right: 5px;
                    }
                }
            }
        }
        .remark {
            height: 135px;
            padding-top: 67px;
            &>div {
                float: left;
                height: 100%;
                width: 320px;
                .title {
                    color:#2993f8;
                    font-size: 14px;
                    width: 53px;
                    float: left;
                    &>span {
                        float: left;
                        width: 3px;
                        height: 14px;
                        border-radius: 2px;
                        background:#2993f8;
                        margin-right: 6px;
                    }
                    &>em {
                        height: 14px;
                        float: left;
                        font-style: normal;
                        line-height: 14px;
                    }
                }
            }
            .remark-left {
                textarea {
                    width: 240px;
                    height: 74px;
                    border-radius: 2px;
                    border: 1px solid #d6d6d6;
                    float: left;
                    padding-left: 10px;
                }

            }
            .remark-right {
                .label-area {
                    height: 100%;
                    float: left;
                    width: 267px;
                    li, &>input {
                        line-height: 26px;
                        text-align: center;
                        float: left;
                        font-size: 12px;
                        min-width: 86px;
                        margin-right: 16px;
                        margin-bottom: 10px;
                        height: 28px;
                        border-top-left-radius: 2px;
                        border-top-right-radius: 10px;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 2px;
                    }
                    li {
                        position: relative;
                        &>i {
                            position: absolute;
                            right: -6px;
                            top: -6px;
                            color:#999999;
                            background:#fff;
                            border-radius: 50%;
                            width: 14px;
                            height: 14px;
                            line-height: 14px;
                            font-size: 14px;
                            display: none;
                            &:hover {
                                color:#666;
                                cursor: pointer;
                            }
                        }
                        &:hover {
                            &>i {
                                display: inline-block;
                            }
                        }
                    }

                    .add-label {
                        border: 1px dashed #2993f8;
                        color:#666;
                        //cursor: pointer;
                        &::-webkit-input-placeholder {
                            color: #2993f8;
                        }
                        &:-moz-placeholder {
                            color: #2993f8;
                        }
                        &::-moz-placeholder {
                            color: #2993f8;
                        }
                        &:-ms-input-placeholder {
                            color: #2993f8;
                        }
                    }
                    .label {
                        background:#2993f8;
                        border: 1px solid #2993f8;
                        color:#fff;
                    }
                }
            }
        }
        .follow {
            // height: 85px;
            padding-top: 30px;
            // position: relative
            &>div {
                float: left;
                height: 100%;
                width: 320px;
                >.title {
                    color:#2993f8;
                    font-size: 14px;
                    // width: 85px;
                    height: 20px !important;
                    float: left;
                    &>span {
                        float: left;
                        width: 3px;
                        height: 14px;
                        border-radius: 2px;
                        background:#2993f8;
                        margin-right: 6px;
                    }
                    &>em {
                        height: 14px;
                        float: left;
                        font-style: normal;
                        line-height: 14px;
                    }
                }
            }
            >.remark-left {
              height: auto !important;
              position: relative;
              >p{
                margin-top: 28px;
                position: absolute;
                left: 10px;
                span{
                  &:nth-of-type(1){
                    color: #b6b6b6;
                    margin-right: 18px;
                  }
                  &:nth-of-type(2){
                    margin-right: 18px;
                  }
                }
                // margin-bottom: 28px;
              }
            }
            >.remark-right {
              position: relative;
              height: auto !important;
              >p{
                margin-top: 28px;
                position: absolute;
                left: 10px;
                span{
                  &:nth-of-type(1){
                    color: #b6b6b6;
                    margin-right: 18px;
                  }
                  &:nth-of-type(2){
                    margin-right: 18px;
                  }
                }
                // margin-bottom: 28px;
              }
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
            li{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                width: 80px;
                border-radius: 4px;
                font-size: 12px;
                margin-right: 12px;
                color: #fff;
                text-align: center;
                cursor: pointer;
                font-weight: bold;
            }
            >li:last-child{
                margin-right: 0; 
            }
            .btn1 {
                border:1px solid #d6d6d6;
                background-color: #fff;
                color: #2993f8;
            }
            .btn2 {
                color: #fff;
                background:#2993f8;
            }
            .btn3 {
                color:#2993f8;
                background:#fff;
                border:1px solid #2993f8;
            }
            .btn3:hover {
                color:#ff5a51;
                border:1px solid #ff5a51;
            }
        }
        // .footer {
        //     height: 28px;
        //     margin-top: 30px;
        //     border: 1px solid red;
            .btn-wrap {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: 10px;
                // width: 100%;
                height: 60px;
                margin: 0 auto;
                background-color: #fff;
                text-align: center;
                &>div {
                    display: inline-block;
                    width: 90px;
                    box-sizing: border-box;
                    height: 28px;
                    border-radius: 4px;
                    text-align:center;
                    line-height: 28px;
                    font-weight: bold;
                    font-size: 12px;
                    // float: left;
                    cursor: pointer;
                }
                // .btn1 {
                //     border:1px solid #d6d6d6;
                //     color:#2993f8;
                //     margin-right: 20px;
                // }
                // .btn2 {
                //     color:#fff;
                //     background:#2993f8;
                //     margin-right: 20px;
                // }
                // .btn3 {
                //     color:#2993f8;
                //     background:#fff;
                //     border:1px solid #2993f8;
                // }
                // .btn3:hover {
                //     color:#ff5a51;
                //     border:1px solid #ff5a51;
                // }
            }
        // }
    }
}
</style>

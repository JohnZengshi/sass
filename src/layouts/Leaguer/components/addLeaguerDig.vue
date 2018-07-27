<template>
    <el-dialog :visible.sync="addLeaguer" top="12%" customClass="addLeaguerDig" :close-on-click-modal="false" @close="close">
        <div class="add-leaguer-dig-main">
            <div class="title">
                添加会员
            </div>
            <div class="info">
                <div class="logo">
                    <img :src="dataInfo.memberLogo">
                </div>
                <div class="info-main">
                    <ul class="info-left">
                        <li>
                            <label><span>*</span>姓名</label>
                            <div>
                                <input v-model="dataInfo.memberName" class="inp" type="text" placeholder="输入姓名">
                            </div>
                        </li>
                        <li><label>会员编号</label></li>
                        <li>
                            <label>负责人</label>
                            <div>
                                <el-checkbox @change="leaderChange()" v-model="dataInfo.isLeader" v-if="!shopManageRole && !shopManRole">{{leader}}</el-checkbox>
                                <span style=" display: inline-block;margin-top:4px;width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:keep-all;" @click="isChoseLeader = true" v-else>{{dataInfo.principalList.length == 0 ? '指派' : this.leaderStr}}</span>
                            </div>
                        </li>
                        <li class="orderNum">
                            <label>销售单号</label>
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
                                <input v-model="dataInfo.phone" type="text" class="inp" placeholder="输入手机号">
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
                                <div class="birthday">
                                    <!-- <input maxlength="4" v-model="year" type="text">年
                                    <input maxlength="2" v-model="month" type="text">月
                                    <input maxlength="2" v-model="day" type="text">日 -->
                                    <el-date-picker
                                        v-model="birthday"
                                        :editable="false"
                                        type="date"
                                        :clearable="true"
                                        :readonly="false"
                                        placeholder="选择日期"
                                        format="yyyy年MM月dd日"
                                        @change="changeBir"
                                        value-format="yyyyMMdd000000">
                                    </el-date-picker>
                                    <i @click="clearBirthday" class="iconfont icon-guanbi-copy"></i>
                                </div>
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
                            <div><input v-model="dataInfo.email" class="inp" type="text" placeholder="输入邮箱地址"></div>
                        </li>
                        <li>
                            <label>创建时间</label>
                            <div></div>
                        </li>
                        <li class="ind">
                            <label>行业</label>
                            <div>
                                <input @focus="isShowInd = true;isShowPCA = false" @blur="isShowInd = false" v-model="dataInfo.industry" class="inp" type="text" placeholder="选择行业">
                                <ul :class="{active: isShowInd}">
                                    <li @click="choseIndustry(item)" :class="{active:dataInfo.industry == item.inName}" v-for="(item, index) in industryList" :key="index">{{item.inName}}</li>
                                </ul>
                            </div>
                        </li>
                        <li class="address">
                            <label>省市区</label>
                            <div>
                                <input @focus="isShowPCA = true" v-model="PCAData" class="inp" type="text" placeholder="选择省市区">
                                <AddressSelect v-if="isShowPCA" @addressReturn="SelectArea"></AddressSelect>
                            </div>
                        </li>
                    </ul>
                    <ul class="other-list-right">
                        <li>
                            <label>微信号</label>
                            <div><input v-model="dataInfo.wx" class="inp" type="text" placeholder="输入微信号"></div>
                        </li>
                        <li>
                            <label>订单总额</label>
                            <div></div>
                        </li>
                        <li class="update">
                            <label>名片上传</label>
                            <div>

                                <img class="card" src="./../../../../static/img/member/new/card.png"/>
                                <img v-if="dataInfo.cardSrc != '' || dataInfo.cardSrc != null" class="card-img" :src="dataInfo.cardSrc" />
                                <span @click="selectFile(1)">上传</span>
                                <img style="display:none;" id="preview_img" >
                                <input style="display: none;" type="file" id="file_input" @change="changeFileInput"/>
                            </div>
                        </li>
                        <li>
                            <label>详细地址</label>
                            <div><input v-model="dataInfo.address" class="inp" type="text" placeholder="未填写"></div>
                        </li>
                    </ul>
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
                            <li class="label" v-for="(item, index) in dataInfo.signList" :key="index">{{item.signName}}
                                <i @click="delLabel(item, index)" class="iconfont icon-guanbi-copy"></i>
                            </li>
                            <!-- <li class="add-label">添加标签</li> -->
                            <input maxlength="6" v-if="dataInfo.signList.length < 4" @blur="followCreateSign" class="add-label" type="text" placeholder="添加标签" v-model="signName">
                        </ul>
                    </div>
            </div>
            <div class="add-leaguer-footer">
                <div class="btn1" @click="close">取消</div>
                <div class="btn2" @click="memberCreate">确定</div>
            </div>
        </div>
        <sellOrderList
            :shopId="shopId"
            :saveSuccess="saveSuccess"
            @closeOrderList="closeOrderList"
            @closeOnly="closeOnly"
        ></sellOrderList>
        <!-- 选择负责人 -->
        <el-dialog :modal="false" :visible.sync="isChoseLeader" top="0%" customClass="choseLeaderDig" :close-on-click-modal="false">
            <ChoseLeader
                :shopId="shopId"
                :addModel="1"
                :isChoseLeader="isChoseLeader"
                @closeChoMember="closeChoLeader"
            ></ChoseLeader>
        </el-dialog>
    </el-dialog>
</template>
<script>
const industryList = require('./industryData')
import base from 'src/config/base/index'
import baseApi from 'Api/Base/base'
import AddressSelect from 'src/components/template/AddressSelect'
import {seekFollowSignList, seekUserInfo, seekGoodsSellOrder} from 'Api/commonality/seek'
import {operateFollowCreateSign, operateMemberCreate, operateMemberSalesList} from 'Api/commonality/operate'
import SellOrderList from './sellOrderList'
import ChoseLeader from './choseLeader'
export default {
    props: [
        'addLeaguer',
        'shopId',
        'shopManageRole',
        'orderNum',
        'shopRole',
        'shopManRole',
        'isFace'
    ],
    components: {
      AddressSelect,
      SellOrderList,
      ChoseLeader
    },
    data () {
        return {
            orderListData: '',
            saveSuccess: false,
            isChoseLeader: false,
            leave: 1,
            isShowPCA: false,
            year: '',
            month: '',
            day: '',
            dataInfo: {
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
            },
            birthday: '',
            leader: '', // 负责人
            leaderid: '', // 负责人id
            isLeader: true,
            PCAData: '', // 省市区数据
            signName: '',
            industryList: industryList, // 行业数据
            isShowInd: false,
            leaderStr: '', // 负责人数据字符串
            flage:false

        }
    },
    created () {
    //   if (this.shopRole && this.shopManRole) {
    //     this.dataInfo.principalList.forEach((item, index) => {
    //         if (item.userId == sessionStorage.getItem('id')) {
    //             return
    //         } else {
    //             this.dataInfo.principalList.push({userId: sessionStorage.getItem('id')})
    //         }
    //     }) 
    //   }
    },
    watch: {
        addLeaguer (val) {
            if (val == true) {
                this.PCAData = ''
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
                this.birthday = ''
            }
            console.log(this.dataInfo.principalList)
        },
    },
    mounted () {
        this.getUserInfo()
        this.$nextTick(() => {
            if (this.orderNum) {
                //console.log("销售单号："+this.orderNum);
                //this.orderListData = this.orderNum; //理解不了 给销售单号传ID 做啥
                Object.assign(this.dataInfo, {
                    memberName: '', // 名称
                    phone: '', // 手机号
                    cardSrc: '', // 名片地址
                    orderList: [{orderNo: this.orderNum}],
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
            } else {
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
            }
            
        })
    },
    methods: {
        clearBirthday () {
            this.birthday = ''
            this.dataInfo.birthday = ''
        },
        timeFormat (parm) {
            // console.log(parm)
            let year = parm.substring(0, 4)
            let month = parm.substring(5, 7)
            let data = parm.substring(8, 10)
            return year + month + data + '000000'
        },
        changeBir (val) {
            this.dataInfo.birthday = this.timeFormat(val)
        },
        memberSalesList (memberNumber) { // 会员关联销售单
            let options = {
                shopId: this.shopId,
                memberOrPhone: memberNumber,
                sellOrderId: this.orderNum
            }
            operateMemberSalesList(options).then((res) => {
                if (res.data.state == 200) {
                    this.$emit("closeReturn", {status: false})
                    //console.log("哈哈哈哈")
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            }, (res) => {
                this.$message({
                    message: res.data.msg,
                    type: 'warning'
                })
            })
        },
        closeChoLeader (val) {
            // console.log('oooooooooooooooooooooooooo', val)
            this.dataInfo.principalList = []
            this.isChoseLeader = false
            this.leaderStr = val.nameList.join(',')
            val.list.forEach((item, index) => {
                this.dataInfo.principalList.push({userId: item})
            })
        },
        importData () {  // 输入单号的事件
            this.dataInfo.orderList = [
                {
                    orderNo: this.orderListData
                }
            ]
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
        openOrder () { // 打开单据列表
            this.saveSuccess = !this.saveSuccess
        },
        goodsSellOrder () { // 销售单列表
            let options = {

            }
            seekGoodsSellOrder().then((res) => {

            }, (res) => {

            })
        },
        leaderChange () {
            if (this.shopManageRole) {
                return
            } else {
                if (this.dataInfo.isLeader) {
                    this.dataInfo.principalList = [
                        {
                            userId: sessionStorage.getItem('id')
                        }
                    ]
                } else {
                    this.dataInfo.principalList = []
                }
            }
            console.log(this.dataInfo.principalList)
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
            this.$emit("closeReturn", {status: false})
        },
        memberCreate () { // 创建会员
            if (this.dataInfo.memberName == '') {
                this.$message({
                    message: '会员名不可为空',
                    type: 'warning'
                })
                return
            }
            if (this.dataInfo.phone == '') {
                this.$message({
                    message: '手机号不可为空',
                    type: 'warning'
                })
                return
            }
            // eventBus.$emit('oprationmemberAllList','123')
            let options = {
                shopId: this.shopId,
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
            }
            if (this.dataInfo.principalList.length == 0) {
                delete options.principalList
            }
            if (this.dataInfo.orderList.length == 0) {
                delete options.orderList
            }
            operateMemberCreate(options).then((res)=> {
                console.log(res)
                if (res.data.state == 200) {
                    if (this.isFace) { // 是人脸
                        this.$emit("successCallback", res.data.data)
                    } else {
                        if (this.orderNum) {
                            this.memberSalesList(res.data.data.memberNumber)
                            //this.$emit("closeReturn", {status: false})
                        } else {
                            this.$emit("closeReturn", {status: false})
                        }
                        this.$message({
                            type: 'success',
                            message: '添加会员成功'
                        }) 
                    }
                    eventBus.$emit('oprationmemberAllList', '000')
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
                    this.leave = '1'
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
                // this.$emit('memberAllList')
            }, (res) => {
                console.log(res)
            })
        },
        choseIndustry (item) { // 选择行业
            this.dataInfo.industry = item.inName
            this.isShowInd = false
        },
        delLabel (item, index) {
            this.dataInfo.signList.splice(index, 1)
        },
        followCreateSign () { // 创建标签
            if(this.signName == null || this.signName.replace(/\s+/g,"") == ''){
                 this.$message({type:'info',message:'不能输入空字符'});
                 return;
            }
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
                    //console.log(result)
                    self.dataInfo.cardSrc = result.data.source_url
                    // if (result.code === 0) {
                    //     let data = {
                    //         type: '1',
                    //         objId: userId,
                    //         url: result.data.source_url
                    //     }
                    //     //console.log(data)
                    //     baseApi.apiCall(data, updateUploadFileURL).then((response) => {
                    //         console.log(response.data)
                    //         if (response.data.state === 200) {
                    //         console.log('updateUploadFileURL success response')
                    //         }
                    //     })
                    // }
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
                    // this.leaderid = res.data.data.userId
                }
            }, (res) => {
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss">
.el-dialog__wrapper {
   
    overflow: visible;
}
.chose-wrap {
    .title {
        padding-left: 20px;
    }
}
.addLeaguerDig {
    width: 700px;
    height: 730px;
    background:#fff;
    border-radius: 10px;
    padding: 0 30px;
    .el-dialog__header {
        padding: 0;
        height: 0;
        overflow: hidden;
    }
    .menu-list {
        padding: 0 20px;
    }
    .member-list {
        padding: 0 20px;
    }
    .el-dialog__body {
        padding: 0;
    }
    .add-leaguer-dig-main {
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
                                    background:#f1f2f3;
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
                                position: relative;
                                input {
                                    width: 174px;
                                    height: 100%;
                                    text-align: right
                                }
                                .el-date-editor {
                                    width: 148px;
                                    .el-input__icon {
                                        display: none;
                                    }
                                    .el-input__inner {
                                        padding-right: 10px;
                                        padding-left: 10px;
                                        width: 148px;
                                    }
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
                                    background:#f1f2f3;
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
                                line-height: 40px;
                                color:#2993f8;
                            }
                        }
                    }
                }
            }
        }
        .remark {
            height: 135px;
            padding-top: 30px;
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
        .add-leaguer-footer {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            height: 28px;
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
                cursor: pointer;
            }
            .btn1 {
                border:1px solid #d6d6d6;
                color:#2993f8;
                margin-right: 20px;
            }
            .btn2 {
                color:#fff;
                background:#2993f8;
            }
        }
    }
}
</style>


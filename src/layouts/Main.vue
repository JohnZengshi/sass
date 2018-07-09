<template>
    <div class="app-site-scope" :class="isClassAuto == 'true' ? 'active' : ''">
        <component-header @messageBack="dataBack" @goPersonalInfo="openPersonal" :userInfo="userInfo" :isAllowCreate="isAllowCreate" :companyInfo="companyInfo"></component-header>

        <com-menu :rootList="rootList" @setScopeSize="setScopeSize"></com-menu>
        <div class="app-main" @click="wholdClick" @scroll="scrollFun($event)">
            <router-view></router-view>

            <div class="index-img" v-if="isImg">
                <img src="~static/img/index.png">
            </div>

        </div>

        <!-- 全局报错 -->
        <ErrorCode v-if="errorCode"></ErrorCode>

        <!-- 全局弹窗 -->
        <!--     <el-dialog :visible.sync="createCompDialog" custom-class="createDialog">
                <div>
                    <div class="dia-title">{{diaTitle}}</div>
                    <div class="dia-subtitle">请先加入/创建属于您的公司</div>
                    <div class="dia-main">
                        <img  src="./../assets/img/yun.png">
                        <input v-model="companyName" type="text" placeholder="输入公司名称">
                    </div>
                    <div class="dia-btn" @click.stop="createCompanyAct()">创建</div>
                </div>
            </el-dialog> -->
        <el-dialog :visible.sync="successDialog" custom-class="sucDialog">
            <img src="./../assets/img/success.png">
            <div class="dia-title">恭喜您，创建公司成功</div>
            <div class="dia-subtitle">我们已经免费为您开通了第一家店铺</div>
            <div class="foot-word"><span class="span1">{{num}}<i>s</i></span>后进入<span class="span2">组织架构</span></div>
        </el-dialog>
        <el-dialog :visible.sync="personalInfo" custom-class="perDialog">
            <div slot="title" class="dia-head">
                <!--<i class="iconfont icon-bianji"></i>-->
            </div>
            <div class="top-block">
                <img style="cursor: pointer;" class="bg-img" :src="userInfo.backgroundMap" @click="selectFile(2)"> <!-- ./../assets/img/timg.jpg -->
                <div class="head-block">
                    <!-- <img id="preview_img" @click="selectFile(1)" :src="userInfo.userLogo"> -->
                    <FormatImg :logo="userInfo.userLogo" @click.native="selectFile(1)" class="img" id="preview_img" :userName="userInfo.userName" :size="84"></FormatImg>
                    <input style="display: none;" type="file" id="file_input" @change="changeFileInput"/>
                </div>
                <div class="title-name">
                    <span>{{userInfo.userName}}<i></i></span>
                </div>
                <div class="title-sub">
                    <input v-focus="editType == 0" v-if="editType == 0" v-model="userInfo.signature" @blur="blurAndUpdateUser($event, 8)">
                    <span v-else @click="toEdting(0)">{{userInfo.signature}}</span>

                </div>
                <span v-show="false" class="cover" @click="selectFile(2)" id="preview_img1">更换封面</span>
            </div>
            <div class="bottom-block">
                <ul>
                    <li>
                        <label>人脸识别<i></i></label>
                        <div class="operate-block" style="cursor: pointer;">
                            <UploadingImg :type="1" @cosImg="cosImg">
                                <!--    <div class="face-recognition-tit">{{filterFaceFlag(userInfo.faceFlag)}} ></div> -->
                                <div class="face-recognition-tit">{{faceImageList.length ? '人脸图片已通过审核' : '请上传清晰正面照'}} ></div>
                            </UploadingImg>
                            <!-- <input class="input-class" v-focus="editType == 1" v-if="editType == 1" v-model="userInfo.userName" type="text" @blur="blurAndUpdateUser($event, 2)">
                                <span class="show-box" @click="toEdting(1)" v-else >{{userInfo.userName}}</span> -->
                        </div>
                    </li>
                    <li>
                        <label>姓 名<i></i></label>
                        <div class="operate-block">
                            <input class="input-class" v-focus="editType == 1" v-if="editType == 1" v-model="userInfo.userName" type="text" @blur="blurAndUpdateUser($event, 2)">
                            <span class="show-box" @click="toEdting(1)" v-else>{{userInfo.userName}}</span>
                        </div>
                    </li>
                    <li>
                        <label>性 别<i></i></label>
                        <div class="operate-block">
                            <div v-if="editType == 2">
                                <input class="radio" @click="blueAndUpdataSex(1)" :checked="userInfo.sex == 1" type="radio" name="sex">
                                男
                                <input class="radio sed" @click="blueAndUpdataSex(2)" :checked="userInfo.sex == 2" type="radio" name="sex">
                                女
                            </div>
                            <span class="show-box" @click="toEdting(2)" v-else>{{userInfo.sex == 1 ? "男" : userInfo.sex == 2 ? "女" : ''}}</span>
                        </div>
                    </li>
                    <li>
                        <label>电 话<i></i></label>
                        <div class="operate-block">
                            <!--<input v-focus="editType == 3" v-if="editType == 3" v-model="userInfoData1.phone" type="text" @blur="blurAndUpdateUser($event, 1)">-->
                            <span class="show-box">{{userInfo.phone}}</span>
                        </div>
                    </li>
                    <li>
                        <label>邮 箱<i></i></label>
                        <div class="operate-block">
                            <input class="input-class" v-focus="editType == 5" v-if="editType == 5" v-model="userInfo.email" type="text" @blur="blurAndUpdateUser($event, 3)">
                            <span class="show-box" @click="toEdting(5)" v-else>{{userInfo.email}}</span>
                        </div>
                    </li>
                    <li>
                        <label>地 址<i></i></label>
                        <div class="operate-block">
                            <AddressSelect v-if="editType == 4" @addressReturn="SelectArea"></AddressSelect>
                            <input type="text" v-model="pcaValue" v-if="editType == 4">
                            <span v-else @click="toEdting(4)" class="show-box">{{userInfo.provinceName + ' ' + userInfo.cityName + ' ' + userInfo.areaName}}</span>

                        </div>
                    </li>
                    <li>
                        <label>详细地址<i></i></label>
                        <div class="operate-block">
                            <input class="input-class" v-focus="editType == 6" v-if="editType == 6" v-model="userInfo.address" type="text" @blur="blurAndUpdateUser($event, 5)">
                            <span class="show-box" @click="toEdting(6)" v-else>{{userInfo.address}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </el-dialog>

    <facePopup></facePopup>
    <labelPopup></labelPopup>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
import clickoutside from 'element-ui/lib/utils/clickoutside'
import base from '../config/base/index'
import baseApi from '../Api/Base/base'
import AddressSelect from 'src/components/template/AddressSelect'
import UploadingImg from 'base/uploading/UploadingImg'
import labelPopup from '@/layouts/data-center/label-print/popup'
import {
    seekMySelfWorkApplyList,
    seekPermissionList,
    seekCompanyList,
    seekGetUserInfo,
    createCompany,
    seekGetAddress,
    seekUserRoleList,
    seekFaceUserImageList,
    downloadTable,
    seekGetShopListByCo
} from 'Api/commonality/seek'
import {operateSwitchCompany, operateUpdateUser, operateUpdateFaceUserImage, operateLogout} from 'Api/commonality/operate'

import ComponentHeader from './header'
import ComMenu from './menu'
import ErrorCode from '../components/confirm/ErrorCode'

import facePopup from 'base/popup/face'

import FormatImg from 'components/template/DefaultHeadFormat.vue'

export default {
    name: 'Main',
    components: {
        ErrorCode,
        ComponentHeader,
        ComMenu,
        AddressSelect,
        FormatImg,
        UploadingImg,
        facePopup,
        labelPopup
    },
    data() {
        return {
            websocket: '',
            faceImageList: [],
            updataImgType: null,
            changeSheng: {
                objectName: '',
                objectId: ''
            },
            changCity: {
                objectName: '',
                objectId: ''
            },
            changeArea: {
                objectName: '',
                objectId: ''
            },
            shengList: [],
            cityNameList: [],
            areaList: [],
            editType: null,
            isEditGraph: true, // 是否编辑个性签名
            userInfoData1: {
                largeName: '', // 标题名称
                smallName: '', // 列表
                autograph: '', // 签名
                sex: '', // 性别
                phone: '', // 电话
                email: '',
                precity: '', // 省市区
                address: '',
                backgroundMap: '',
                userLogo: ''
            },
            personalInfo: false,
            num: 3,
            successDialog: false,
            companyName: '', // 公司名称
            diaTitle: '您还未加入/创建公司',
            isErrorCode: false,
            rootList: [], // 一级权限列表
            twoRootList: [], // 二级权限列表
            rootApplySecondList: {},
            isClassAuto: false,
            userInfoData: {},
            userType: '',
            dataType: '',
            isCompany: '',
            createCompDialog: false,
            isImg: false,
            createType: null, // 创建公司类型 1 第一次  2 非第一次
            isAllowCreate: true,
            pcaValue: '',
            filterFaceShopList: [], // 当前过滤人脸的店铺列表
            currentFaceShop: '' // 当前要过滤的店铺
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'userPositionInfo',
            'companyInfo',
            'errorCode',
            "shopListByCo", // 店铺列表
        ]),
        computeUserLogo: function () {
            if (this.userInfo) {
                return this.userInfo.userLogo ? this.userInfo.userLogo : 'static/img/userphone.png'
            }
        }
    },
    directives: {
        clickoutside,
        focus: {
            inserted: function (el) {
                el.focus();
            }
        }
    },
    created() {
        this.userRoleList()
        this.getSeekUserInfo()
        this.getSeekGetUserInfo(); // 职位信息
        this.getSeekCompanyInfo(); // 公司详情
        this.permissionList() // 功能权限列表
        this.setScopeSize(sessionStorage.getItem('_systemFixed'))
        this._seekGetAddress()
        this.userRoleList1()
        this.getShopListByCo()
        this._seekFaceUserImageList()
    },
    beforeDestroy() {
        // this.closeWebSocket()
        this.closeCreatedWebSocket()
    },
    mounted() {
        // this.routerActive()
        eventBus.$on('cut-web-socket', (parm) => {
            this.currentFaceShop = parm
            console.log('收到的店铺id', parm)
            // this.closeWebSocket()
            // this.establishWebSocket(parm)
        });
        this.$nextTick(() => {
            this._seekGetShopListByCo()
            setTimeout(() => {
                if (!this.userInfo.userName) {
                    this.getSeekUserInfo()
                }
            }, 1000)
        })
    },
    watch: {
        'route'(to, form) {
            console.log('路由改变了', to, from)
        },
        'personalInfo': function () {
            this.editType = null
        },
        'shopListByCo'() {
            if (this.shopListByCo[0]) {
                // if (this.closeWebSocket) {
                //     this.closeWebSocket()
                // }
                // this.establishWebSocket(this.shopListByCo[0].shopId)
            }
        }
    },
    methods: {
        ...mapActions([
            'getSeekUserInfo',
            'getSeekGetUserInfo',
            'getSeekCompanyInfo',
            "getShopListByCo", // 店铺列表
        ]),
        // 新店铺列表
        _seekGetShopListByCo() {
            let options = {
                page: '1',
                pageSize: 9999,
                type: 1 // 1.可查看 2.所属 3.全部
            }

            seekGetShopListByCo(options)
                .then(res => {
                    if (res.data.state == 200) {
                        this.filterFaceShopList = res.data.data.shopList
                        this._downloadTable()
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
        },
        // 获取推送地址
        _downloadTable() {
            let options = {
                "type": "1",
                "infoType": "003"
            }
            downloadTable(options)
                .then(res => {
                    // ws://192.168.100.110:9097/yunzhubao-bat/ws/{companyId}/1?msgType=09&os={client}&userId={userId}&env=test
                    if (res.data.state == 200) {
                        let url = res.data.data.url
                        url = url.replace('{companyId}', sessionStorage.getItem('companyId'))
                        url = url.replace('{client}', 'web')
                        url = url.replace('{userId}', sessionStorage.getItem('id'))
                        this.createdWebSocket(url)
                        // this.url = url
                        console.log('组装好的地址', url)
                    }
                })
        },
        // 创建连接
        createdWebSocket(parm) {
            let _self = this
            let ws = new WebSocket(parm)
            // 连接成功
            ws.onopen = function (evt) {
                console.log('测试连接成功', evt)
            }
            // 有新消息来
            ws.onmessage = function (evt) {
                console.log('新消息--===', evt.data)
                let datas = JSON.parse(evt.data)
                if (datas.msgType == '09') { // 登出
                    if (datas.os == 'app') {
                        if (datas.opType == 'qry') {
                            ws.send(JSON.stringify({"os": "web", "fs": "xiaohua", "msgType": "09", "status": "1"}))
                        } else if (datas.opType == 'out') {
                            operateLogout()
                                .then(res => {
                                    if (res.data.state == 200) {
                                        ws.close()
                                        _self.loginOut()
                                        // sessionStorage.clear()
                                        // localStorage.clear()
                                        // _self.$router.push({path: '/member/login'})
                                        // let body = document.getElementById('body')
                                        // body.style.background = '#f5f8f7'
                                    } else {
                                        _self.$message({
                                            message: res.data.msg,
                                            type: 'warning'
                                        });
                                    }
                                })
                        }
                    }
                } else if (datas.msgType == '08') { // 人脸识别
                    console.log('收到人脸的数据', evt)
                    _self.faceWebsocked(datas)
                } else if (datas.msgType == '10' && sessionStorage.getItem("tokenId") != datas.tokenId && datas.os == 'web' && sessionStorage.getItem("id") == datas.userId) { // 退出
                    ws.close()
                    Vue.prototype.loginPopup.show()
                    // _self.loginOut()
                }
            }
            ws.error = function (evt) {
                console.log('测试连接失败', evt)
            }
            _self.closeCreatedWebSocket = () => {
                ws.close()
            }
            window.onbeforeunload = function () {
                ws.send({"companyId": sessionStorage.getItem('companyId'), "msgType": "09", "os": "web", "userId": sessionStorage.getItem('id'), "status": "1000"})
                ws.close()
            }
        },
        loginOut() {
            sessionStorage.clear()
            localStorage.clear()
            this.$router.push({path: '/member/login'})
            let body = document.getElementById('body')
            body.style.background = '#f5f8f7'
        },
        faceWebsocked(datas) {
            if (this.currentFaceShop) {
                if (datas.shopId != this.currentFaceShop) {
                    return
                }
            } else {
                let shopList = []
                for (let i of this.filterFaceShopList) {
                    shopList.push(i.shopId)
                }
                if (!shopList.includes(datas.shopId)) {
                    return
                }
            }
            let _self = this
            let hintTit = '有新访客到店，请及时接待'
            if (datas.vipFlag == 1) {
                switch (datas.grade) {
                    case '1':
                        hintTit = '普通会员'
                        break
                    case '2':
                        hintTit = '中级会员'
                        break
                    case '3':
                        hintTit = '高级会员'
                        break
                }
                hintTit = hintTit + datas.userName + '到店，请及时接待'
            }
            const h = _self.$createElement;
            _self.$notify({
                duration: 2000,
                title: '新消息',
                message: hintTit,
                type: 'success',
                onClick: () => {
                    _self.$router.push(
                        {
                            path: '/faceRecognition/visitList',
                            query: {
                                id: datas.id
                            }
                        }
                    )
                }
            })

            eventBus.$emit('new-client-come-on')
        },
        establishWebSocket(parm) {
            let _self = this;
            let socketUrl = process.env.NODE_ENV === 'development' ? 'ws://uat.yunzhubao.com:8080/yunzhubao/ws/facepass/' : 'wss://app.yunzhubao.com:9092/yunzhubao/ws/facepass/'
            // let socketUrl = 'wss://app.yunzhubao.com:9092/yunzhubao/ws/facepass/'
            let ws = new WebSocket(`${socketUrl}${parm}`)
            ws.onopen = function (evt) {
                console.log('访客连接成功', evt)
            }
            ws.onmessage = function (evt) {
                console.log('有访客来', evt)
                let hintTit = '有新访客到店，请及时接待'
                let datas = JSON.parse(evt.data)
                if (datas.vipFlag == 1) {
                    switch (datas.grade) {
                        case '1':
                            hintTit = '普通会员'
                            break
                        case '2':
                            hintTit = '中级会员'
                            break
                        case '3':
                            hintTit = '高级会员'
                            break
                    }
                    hintTit = hintTit + datas.userName + '到店，请及时接待'
                }
                const h = _self.$createElement;
                _self.$notify({
                    duration: 2000,
                    title: '新消息',
                    message: hintTit,
                    type: 'success',
                    onClick: () => {
                        _self.$router.push(
                            {
                                path: '/faceRecognition/visitList',
                                query: {
                                    id: datas.id
                                }
                            }
                        )
                    }
                })

                eventBus.$emit('new-client-come-on')
            }
            ws.error = function (evt) {
                console.log('访客连接失败', evt)
            }
            // _self.closeWebSocket = () => {
            //     ws.close()
            // }
            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            // window.onbeforeunload = function() {
            //     localStorage.setItem('浏览器执行了关闭', '浏览器执行了关闭')
            //     alert('关闭窗口')
            // }

        },
        filterFaceFlag(parm) {
            switch (parm) {
                case '1':
                    return '请上传清晰正面照'
                case '2':
                    return '审核未通过，请重新上传'
                case '3':
                    return '人脸图片已通过审核'
                default:
                    return '请上传清晰正面照'
            }
        },
        scrollFun(el) {
            eventBus.$emit('scrollTop', {itemTop: el.target.scrollTop, diff: parseInt(el.target.children[0].clientHeight - el.target.clientHeight)})
        },
        userRoleList1() {
            let options = {
                userId: sessionStorage.getItem('id')
            }
            seekUserRoleList(options).then((res) => {
                if (res.data.state == 200) {
                    for (let i = 0; i < res.data.data.dataList.length; i++) {
                        if (res.data.data.dataList[i].userType == 13) {
                            this.isAllowCreate = false
                        }
                    }
                }
            }, (res) => {
            })
        },
        // ****************************  上传  *****************************************
        selectFile(type) {
            this.updataImgType = type
            document.getElementById("file_input").click();
        },
        changeFileInput(ev) {
            let self = this
            let file = ev.target.files[0];
            console.log(ev, this.updataImgType);
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(ev.target.files[0]);
                reader.onload = function (e) {
                    if (self.updataImgType == 1) {
                        document.getElementById("preview_img").src = this.result;
                        self.uploadHandler(file, 1)
                    } else {
                        document.getElementById("preview_img1").src = this.result;
                        self.uploadHandler(file, 11)
                    }

                }
            }
        },
        uploadHandler(file, type) {
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
                        let sign = response.data.data.signStr
                        myFolder = response.data.data.url
                        callback(sign)
                    })
                }
            })
            if (extName == 'png' || extName == 'jpg' || extName == 'JPEG' || extName == 'jpeg') {
                let successCallBack = function (result) {
                    console.log('获取上传结果:', result);
                    if (result.code === 0) {
                        let data = {
                            type: type,
                            objId: userId,
                            url: result.data.source_url
                        }
                        baseApi.apiCall(data, updateUploadFileURL).then((response) => {
                            if (response.data.state === 200) {
                                self.$store.dispatch('getUserInfo');
                            }
                        })
                    }
                }
                let errorCallBack = function (result) {
                }
                let progressCallBack = function (result) {
                }
                cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 1) //0表示允许覆盖文件 1表示不允许
            } else {
                this.$store.dispatch('workPopupError', "文件格式必须为 *.jpg / *.png / *.jpeg");
                location.reload();
                return
            }
        },
        // ****************************  上传  *****************************************
        SelectProvince(parm) {
            this.changeSheng.objectName = parm.objectName
            this.changeSheng.objectId = parm.objectId
            this.changCity.objectName = ''
            this.changCity.objectId = ''
            this.getCity(parm.objectId)
        },
        SelectCity(parm) {
            this.changCity.objectName = parm.objectName
            this.changCity.objectId = parm.objectId
            this.changeArea.objectName = ''
            this.changeArea.objectId = ''
            this.changeArea.objectName = ''
            this.changeArea.objectId = ''
            this.getArea(parm.objectId)
        },
        SelectArea(parm) {
            // this.changeArea.objectName = parm.objectName
            // this.changeArea.objectId = parm.objectId
            // this._operateUpdateCompany(4, `${this.changeSheng.objectId}-${this.changCity.objectId}-${this.changeArea.objectId}`, true)
            this.pcaValue = parm.provName + '/' + parm.cityName + '/' + parm.areaName
            this._operateUpdateCompany(4, `${parm.provId}-${parm.cityId}-${parm.areaId}`, true, parm)
        },
        cosImg(parm) {
            let options = {
                imageUrl: parm,
                serialNo: 1
            }
            operateUpdateFaceUserImage(options)
                .then(res => {
                    if (res.data.state == 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.editType = null
                        this.$store.dispatch('getUserInfo')
                        this.$nextTick(() => {
                            this.personalCenterInfo()
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
        },
        _seekFaceUserImageList() {
            seekFaceUserImageList()
                .then(res => {
                    if (res.data.state == 200) {
                        this.faceImageList = res.data.data.dataList
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
        },
        _operateUpdateCompany(operateType, objectData, isUpdate) {
            let options = {
                operateType: operateType,
                objectData: objectData
            }
            operateUpdateUser(options)
                .then(res => {
                    if (res.data.state == 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.editType = null
                        this.$store.dispatch('getUserInfo')
                        this.$nextTick(() => {
                            this.personalCenterInfo()
                        })
                        // this.getSeekUserInfo()
                        // this.personalCenterInfo()
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
        },
        //获取省份
        _seekGetAddress() {
            let options = {
                objectId: '',
                type: '1'
            }
            seekGetAddress(options).then((res) => {
                this.shengList = res.data.data.dataList
            }, (res) => {
            })
        },
        //获取市
        getCity(objectId) {
            let options = {
                objectId: objectId,
                type: '2'
            }
            seekGetAddress(options).then((res) => {
                this.cityNameList = res.data.data.dataList
            }, (res) => {
            })
        },

        //获取区
        getArea(objectId) {
            let options = {
                objectId: objectId,
                type: '3'
            }
            seekGetAddress(options).then((res) => {
                this.areaList = res.data.data.dataList
            }, (res) => {
            })
        },
        toEdting(type) {
            this.editType = type
        },
        blueAndUpdataSex(type) {
            let options = {
                operateType: 1,
                objectData: type
            }
            operateUpdateUser(options).then((res) => {
                if (res.data.state == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.editType = null
                    this.$store.dispatch('getUserInfo')

                    this.$nextTick(() => {
                        this.personalCenterInfo()
                    })
                    // this.getSeekUserInfo()
                    // this.personalCenterInfo()
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
        blurAndUpdateUser(evt, type) { // 上传个人信息
            if (type === 3 && !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(evt.target.value))) {
                this.$message({
                    message: '邮箱格式必须为XXX@XX.com/cn ...',
                    type: 'warning'
                });
            } else {
                let options = {
                    operateType: type,
                    objectData: evt.target.value
                }
                operateUpdateUser(options).then((res) => {
                    if (res.data.state == 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.editType = null
                        this.personalCenterInfo()
                    } else {
                        this.userRoleList()
                        this.getSeekUserInfo()
                        this.getSeekGetUserInfo(); // 职位信息
                        this.getSeekCompanyInfo(); // 公司详情
                        this.permissionList() // 功能权限列表
                        this.setScopeSize(sessionStorage.getItem('_systemFixed'))
                        this._seekGetAddress()
                        this.userRoleList1()
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
            }

        },
        saveGraph() { // 保存个性签名
            this.isEditGraph = true
        },
        openPersonal(val) { // 打开个人中心
            this.personalInfo = val.flag
            this.personalCenterInfo()
        },
        personalCenterInfo() { // 个人中心参数初始化
            this.userInfoData1.largeName = this.userInfo.userName
            this.userInfoData1.smallName = this.userInfo.userName
            this.userInfoData1.autograph = this.userInfo.signature
            this.userInfoData1.backgroundMap = this.userInfo.backgroundMap
            this.userInfoData1.sex = this.userInfo.sex
            this.userInfoData1.phone = this.userInfo.phone
            this.userInfoData1.email = this.userInfo.email
            this.userInfoData1.precity = this.userInfo.provinceName + this.userInfo.cityName + this.userInfo.areaName
            this.userInfoData1.address = this.userInfo.address
            this.userInfoData1.userLogo = this.userInfo.userLogo
        },
        dataBack(val) {
            this.createCompDialog = val.flag
            this.createType = val.type
            this.diaTitle = '创建公司'
        },
        wholdClick() { // 全局点击
            let companyId = sessionStorage.getItem('companyId')
            if (!companyId) {
                this.isImg = true
                if (this.createCompDialog == false) {
                    this.createCompDialog = true
                    this.createType = 1
                }

            } else {
                this.isImg = false
            }
        },
        routerActive() {
            let companyId = sessionStorage.getItem('companyId')
            if (!companyId) {
                this.isImg = true
                this.createCompDialog = true
                this.createType = 1
                this.diaTitle = '您还未加入/创建公司'
            } else {
                this.isImg = false
            }
        },
        goNextpage() { // 去组织架构
            let self = this
            this.successDialog = true
            let timer = setInterval(function () {
                self.num--
            }, 1000)
            setTimeout(function () {
                clearInterval(timer)
                self.num = 3
                self.successDialog = false
                self.$router.push({path: '/organizationChart', query: {isRefresh: true}})
                //location.reload()
            }, 3000)
        },
        createCompanyAct() { // 创建公司
            let options = {
                comName: this.companyName,
                contactName: this.userInfo.userName,
                contactPhone: this.userInfo.phone
            }
            createCompany(options).then((res) => {
                if (res.data.state == 200) {
                    this.companyName = ''
                    this.createType = null
                    this.createCompDialog = false
                    this.goNextpage()
                    sessionStorage.setItem('companyId', res.data.data.companyId)
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
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
        setScopeSize(type) {
            this.isClassAuto = type + ''
        },
        // 功能权限列表
        permissionList() {
            seekPermissionList().then((res) => {
                if (res.data.state === 200) {
                    this.rootList = res.data.data.dataList
                    /* --临时测试需要，记得删除-- */
                    // this.rootList.push({
                    //     "companyId": "",
                    //     "editable": "N",
                    //     "mainName": "人脸识别",
                    //     "mainType": "10",
                    //     "userId": "e58d8b6ff51840eca738c461f02b4a03",
                    //     "mainLogo": ""
                    // })
                    this.twoRootList = res.data.data.twoDataList
                    //this.routerListShow(this.rootList)
                    this.$store.dispatch('applyList', res.data.data.twoDataList)

                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }

            }, (res) => {

                this.$message({
                    type: 'error',
                    message: res.data.msg
                })
            })
        },
        // 用户角色列表
        userRoleList() {
            let options = {
                userId: sessionStorage.getItem('id')
            }
            seekGetUserInfo(options).then((res) => {
                //this.$router.push({path: '/member/login'})
                console.log('获取登录角色数据:', res);
                this.userInfoData = res.data.data
                for (let i = 0; i < this.userInfoData.roleList.length; i++) {
                    if (this.userInfoData.roleList[i].role == 1 || this.userInfoData.roleList[i].role == 2 || this.userInfoData.roleList[i].role == 3) {
                        this.userType = 1 // 公司职员
                        //this.dataType = 1
                        this.isCompany = true
                        if (this.userInfoData.roleList[i].role == 1) {
                            sessionStorage.setItem('companyPosition', '1') // 超管
                        } else if (this.userInfoData.roleList[i].role == 2) {
                            sessionStorage.setItem('companyPosition', '2') // 管理
                        } else if (this.userInfoData.roleList[i].role == 3) {
                            sessionStorage.setItem('companyPosition', '3') // 职员
                        }
                    } else if (this.userInfoData.roleList[i].role == 4) {
                        this.userType = 2 // 店长
                        //this.dataType = 2
                        this.shopLength = this.userInfoData.roleList.length
                        this.shopList = this.userInfoData.roleList
                        this.shopId = this.userInfoData.roleList[0].shopId
                        this.isShop = true
                        sessionStorage.setItem('companyPosition', '4') // 店长
                    } else if (this.userInfoData.roleList[i].role == 5) {
                        this.userType = 3 // 店员
                        //this.dataType = 3
                        this.isShop = true
                        sessionStorage.setItem('companyPosition', '5') // 店员
                    }
                }
                if (this.isShop == true && this.isCompany == true) {
                    this.multipleIdentities = true
                    sessionStorage.setItem('multipleIdentities', 'Y')
                } else {
                    sessionStorage.setItem('multipleIdentities', 'N')
                }
                sessionStorage.setItem('userType', this.userType)

                if (sessionStorage.getItem('userType') == 2) {
                    this.shopManage = true
                }
            }, (res) => {
            })
        },
        errorCodeCB() {
            let options = {
                content: "",
                type: false
            }
            this.$store.dispatch('workPopupError', options)

        }

    },
    beforeRouteEnter(to, from, next) {
        // to.meta.keepAlive = false
        const userId = sessionStorage.getItem('id')
        if (!userId) {
            next({
                path: '/member'
            })
        } else {
            next()
        }
    },

}
</script>
<style lang="scss">
    .dropClass{
        .el-scrollbar{
            .el-select-dropdown__wrap{
                .el-select-dropdown__list{
                    min-width:115px;
                }
            }
        }
    }
    .operate-block{
        position:relative;
        input{
            //width: 56px !important;
            padding:0;
        }
        .face-recognition-tit{
            width:100%;
            cursor:pointer;
        }
        .input-class{
            width:156px !important;
        }
        .el-select{
            .el-input{
                .el-input__icon{
                    font-size:10px;
                    width:15px;
                    line-height:26px;
                }
                .el-input__inner{
                    padding-left:5px;
                    padding-right:10px;
                    font-size:12px;
                }
            }
        }

    }
    .createDialog{
        width:372px;
        height:480px;
        background:#fff;
        border-radius:10px;
        .dia-title{
            width:300px;
            margin:0 auto;
            height:40px;
            text-align:center;
            font-size:24px;
            color:#2993f8;
        }
        .dia-subtitle{
            width:300px;
            margin:0 auto;
            height:40px;
            text-align:center;
            font-size:16px;
            color:#999;
        }
        .dia-main{
            width:300px;
            margin:0 auto;
            height:257px;
            img{
                width:150px;
                height:150px;
                display:block;
                margin:0 auto;
                margin-bottom:30px;
            }
            input{
                width:300px;
                height:48px;
                background:#f1f2f3;
                border-radius:10px;
                padding-left:24px;
            }
        }
        .dia-btn{
            width:300px;
            height:48px;
            background:#2993f8;
            border-radius:10px;
            margin:0 auto;
            color:#fff;
            text-align:center;
            line-height:48px;
            font-size:16px;
            cursor:pointer;
        }
    }
    .sucDialog{
        width:372px;
        height:341px;
        border-radius:10px;
        padding:0;
        img{
            width:72px;
            height:72px;
            margin:0 auto;
            display:block;
            margin-bottom:48px;
        }
        .dia-title{
            width:300px;
            margin:0 auto;
            height:40px;
            text-align:center;
            font-size:24px;
            color:#2993f8;
        }
        .dia-subtitle{
            width:300px;
            margin:0 auto;
            height:40px;
            text-align:center;
            font-size:16px;
            color:#999;
        }
        .foot-word{
            font-size:16px;
            color:#333;
            text-align:center;
            .span1{
                color:#2993f8;
                font-size:14px;
                i{
                    font-style:normal;
                    font-size:10px;
                }
            }
            .span2{
                color:#666;
                cursor:pointer;
            }
            .span2:hover{
                color:#2993f8;
            }
        }
    }
    .perDialog{
        width:330px;
        height:520px;
        border-radius:10px;
        position:relative;
        .dia-head + .el-dialog__headerbtn{
            position:absolute;
            top:10px;
            right:10px;
            z-index:10;
            color:#999;
        }
        .dia-head{
            height:20px;
            width:20px;
            position:absolute;
            right:10px;
            top:10px;
            z-index:10;
            .iconfont{
                cursor:pointer;
                color:#999;
            }
            .iconfont:hover{
                color:#2993f8;
            }
        }
        .top-block{
            width:330px;
            height:205px;
            position:absolute;
            top:0;
            left:0;
            .bg-img{
                width:100%;
                height:100%;
                border-top-left-radius:10px;
                border-top-right-radius:10px;
                z-index:0;
            }

            .head-block{
                width:84px;
                height:84px;
                position:absolute;
                top:-20px;
                left:50%;
                margin-left:-42px;
                // border:2px solid #fff;
                background:#fff;
                border-radius:50%;
                overflow:hidden;
                box-shadow:0 10px 5px 1px rgba(0, 0, 0, 0.1);
                .img{
                    width:100%;
                    height:100%;
                    cursor:pointer;
                }
                img{
                    width:100%;
                    height:100%;
                    cursor:pointer;
                }
            }
            .title-name{
                height:20px;
                width:160px;
                position:absolute;
                left:50%;
                top:87px;
                margin-left:-80px;
                font-size:18px;
                color:#333;
                z-index:10;
                text-align:center;
                //margin: 0 auto;
                span{
                    position:relative;
                    i{
                        position:absolute;
                        top:0;
                        right:-10px;
                    }
                }
            }
            .title-sub{
                height:20px;
                width:160px;
                position:absolute;
                left:50%;
                top:120px;
                margin-left:-80px;
                text-align:center;
                span{
                    cursor:pointer;
                    padding:0 6px;
                    white-space:nowrap;
                }
                span:hover{
                    border:1px solid #999;
                }
                input{
                    text-align:center;
                }
            }
            .cover{
                font-size:14px;
                color:#666;
                cursor:pointer;
                position:absolute;
                bottom:10px;
                right:10px;
            }
            .cover:hover{
                color:#2993f8;
            }
        }
        .bottom-block{
            position:absolute;
            width:100%;
            top:205px;
            left:0;
            bottom:0;
            padding:25px 25px;
            ul{

                li{
                    height:26px;
                    margin-bottom:15px;
                    line-height:26px;
                    label{
                        float:left;
                        display:block;
                        height:20px;
                        width:60px;
                        font-size:14px;
                        color:#999;
                        text-align:justify;
                        text-align-last:justify;
                        margin-right:35px;
                    }
                    .operate-block{
                        float:left;
                        height:26px;
                        .show-box{
                            display:block;
                            width:185px;
                            height:24px;
                            cursor:pointer;
                            line-height:24px;
                            border:1px solid #fff;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                        }
                        .show-box:hover{
                            border:1px solid #2993f8;
                            border-radius:4px;
                        }
                        input{
                            width:185px;
                            height:24px;
                            border:1px solid #2993f8;
                            border-radius:4px;
                            padding-left:10px;
                        }
                        .radio{
                            height:14px;
                            width:14px !important;
                            margin-right:10px;
                        }
                        .sed{
                            margin-left:20px;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss" scoped>

    /* 新菜单 样式 */
    .system-nav{

        &.active{
            width:190px;
            .root{
                &:after{
                    opacity:1;
                    visibility:visible;
                }
            }

            /*  */
            .nav{

                /* 子菜单 */
                &.active{
                    color:#fff;
                    background-color:#252830;
                    .root i{ color:#fff;}

                    > .item{
                        opacity:1;
                        visibility:visible;
                        height:auto;
                    }
                }
            }

            .navFixed{
                opacity:1;
            }

        }
    }
    @media print{
        .system-nav{ opacity:0;}
    }
    .app-site-scope{
        padding:64px 0 0 70px;
        height:100%;
        transition:all .2s;

        .app-header{
            transition:all .2s;
        }
        &.active{
            padding-left:190px;
            .app-header{
                padding-left:190px;
            }
        }

        .app-main{
            height:100%;
            width:100%;
            overflow:auto;
            position:relative;
            // padding-bottom: 100px;
            .index-img{
                height:100%;
                width:100%;
                position:absolute;
                top:0;
                left:0;
                z-index:1000;
                background:#f5f8f7;
                padding-top:50px;
                //padding-left: 50px;
                img{
                    height:828px;
                    width:1283px;
                    margin:0 auto;
                    display:block;
                }
            }
        }
    }
</style>

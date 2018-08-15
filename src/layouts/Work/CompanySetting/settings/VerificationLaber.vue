<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title">
                <i class="iconfont icon-liebiao"></i>验证码结果页管理
                <el-button id="add-template" type="primary" @click="addTemplate">新增模板</el-button>
            </div>
            <div class="model-content">
                <div class="model-content-group">
                    <el-select v-model="dataList.id" @change="selectChangeId" placeholder="请选择模板">
                        <el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="dataList.vid" @change="selectChangeUrl" placeholder="请选择结果页">
                        <el-option v-for="item in laberList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-button type="primary" @click="editTemplate">编辑模板</el-button>
                </div>
                <div class="model-content-group">
                    <div class="model-content-title">
                        <div class="border-left"></div>
                        <p>URL</p>
                        <div class="model-radio">
                            <div class="laber-radio">
                                <input type="radio" id="male1" value="0" name="url" v-model="isUrl"/>
                                <label for="male1">显示</label>
                            </div>
                            <div class="laber-radio">
                                <input type="radio" id="male3" value="1" name="url" v-model="isUrl"/>
                                <label for="male3">隐藏</label>
                            </div>
                        </div>
                    </div>
                    <div v-show="isUrl == '0'" class="url-text">
                        {{url}}
                    </div>

                </div>
                <div class="model-content-group" v-show="isPublic">
                    <div class="model-content-title">
                        <div class="border-left"></div>
                        <p>LOGO上传</p>
                    </div>
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUploadLogo">
                        <img v-if="dataList.imgCom" :src="dataList.imgCom" class="avatar"> <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </div>
                <div class="model-content-group" v-show="isPublic">
                    <div class="border-left"></div>
                    <div class="model-content-title">
                        <p>店铺信息</p>
                        <div class="model-radio">
                            <div class="laber-radio">
                                <input type="radio" id="male4" name="sex" value="0" v-model="dataList.isShop"/>
                                <label for="male4">显示默认</label>
                            </div>
                            <div class="laber-radio">
                                <input type="radio" id="male5" name="sex" value="1" v-model="dataList.isShop"/>
                                <label for="male5">显示且跟随商品位置</label>
                            </div>
                            <div class="laber-radio">
                                <input type="radio" id="male6" name="sex" value="2" v-model="dataList.isShop"/>
                                <label for="male6">隐藏</label>
                            </div>
                        </div>
                    </div>
                    <div v-show="dataList.isShop === '0'">
                        <div class="model-checkbox">
                            <label>店铺名称：</label>
                            <input type="text" v-model="dataList.shopName" @blur="inputBlur">
                        </div>
                        <div class="model-checkbox">
                            <label>店铺地址：</label>
                            <input type="text" v-model="dataList.shopAddress" @blur="inputBlur">
                        </div>
                        <div class="model-checkbox">
                            <label>店铺电话：</label>
                            <input type="text" v-model="dataList.shopPhone" @blur="inputBlur">
                        </div>
                    </div>


                </div>
                <div class="model-content-group company" v-show="isPublic">
                    <div class="model-content-title">
                        <div class="border-left"></div>
                        <p>公司信息<span class="company-info">（公司名称，公司地址，公司电话，公司二维码）</span></p>
                        <div class="model-radio">
                            <div class="laber-radio">
                                <input type="radio" id="male7" name="company" value="0" v-model="dataList.isCom"/>
                                <label for="male7">显示</label>
                            </div>
                            <div class="laber-radio">
                                <input type="radio" id="male8" name="company" value="1" v-model="dataList.isCom"/>
                                <label for="male8">隐藏</label>
                            </div>
                        </div>
                    </div>

                    <div v-show="dataList.isCom === '0'">
                        <div class="erweima">二维码上传</div>
                        <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
                            <img v-if="dataList.imgUrl" :src="dataList.imgUrl" class="avatar"> <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
                <div class="model-content-group">
                    <div class="model-content-title">
                        <div class="border-left"></div>
                        <p>结果样式页</p>
                    </div>
                    <div>
                        <img :src="laberImg" alt="">
                    </div>
                </div>
            </div>

            <el-dialog :visible.sync="addDialog" customClass="addDig addDig-box">
                <div class="title">
                    <img src="~static/img/piliang.png">
                    <div>新增模板</div>
                </div>
                <div class="body">
                    <input type="text" placeholder="输入模板名称" v-model="addTempList.name">
                    <div class="radio-temp">
                        <p>指定结果页面</p>
                        <div class="model-radio" id="add-model">
                            <div class="laber-radio" v-for="(item,index) in laberList">
                                <input type="radio" :id="'add' + index" :value="item.id" v-model="addTempList.vid" name="addTempl"/>
                                <label :for="'add' + index">{{item.name}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot" solt="footer">
                    <div class="ope-btn" @click="addTemplateFun">确定</div>
                </div>
            </el-dialog>

            <el-dialog :visible.sync="editDialog" customClass="addDig addDig-box">
                <div class="title">
                    <img src="~static/img/piliang.png">
                    <div>编辑模板</div>
                </div>
                <div class="body">
                    <input type="text" placeholder="输入模板名称" v-model="editTempList.name">
                    <div class="radio-temp">
                        <p>指定结果页面</p>
                        <div class="model-radio" id="edit-model">
                            <div class="laber-radio" v-for="(item,index) in laberList">
                                <input type="radio" :id="'female' + index" :value="item.id" v-model="editTempList.vid" name="editTempl"/>
                                <label :for="'female' + index">{{item.name}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot" solt="footer">
                    <div class="ope-btn" @click="editTemplateFun">确定</div>
                    <div class="del-btn" @click="delTemplateFun"></div>
                </div>
            </el-dialog>

        </div>
    </transition>
</template>

<script>
    import {seekOpSettingLabel, seekGetSettingLabel, seekGetLabelResultList} from './../../../../Api/commonality/seek'
    import base from '@/config/base/index';
    import baseApi from '@/Api/Base/base'

    export default {
        data() {
            return {
                templateList: [], //模板集合
                laberList: [],  //结果页集合
                dataList: {
                    id: '', //模板id
                    vid: '', //结果页id
                    imgUrl: '', //二维码
                    imgCom: '', //logo
                    shopName: '',
                    shopAddress: '',
                    shopPhone: '',
                    isCom: '0',
                    isShop: '0'
                },
                editTempList: {
                    name: '',
                    vid: ''
                },
                addTempList: {
                    name: '',
                    vid: ''
                },
                url: '',        //URL地址
                isUrl: '0',     //是否显示URL
                laberImg: '',   //结果页图片地址
                addDialog: false,
                editDialog: false,
                isPublic: true,   //是否通用模板。默认是
            }
        },
        created() {
            this.getSettingLabel();
            this.getLabelResultList();
        },
        watch: {
            'dataList.isCom': function (val, oldval) {
                this.opSettingLabel();
            },
            'dataList.isShop': function (val, oldval) {
                this.opSettingLabel();
            },
            'dataList.vid': function (val, oldval) {
                let list = this.laberList.filter(item => val == item.id);
                let url = list[0].url;
                if (url === 'publicLaber') {
                    url = 'publicLabel';
                }
                if (url === 'publicLabel') {
                    this.isPublic = true;
                } else {
                    this.isPublic = false;
                }
                this.laberImg = `./static/img/laberImg/${url}.png`;
            }
        },
        methods: {
            getSettingLabel() {
                //获取模板集合
                seekGetSettingLabel({}).then(res => {
                    if (res.data.state == 200) {
                        this.templateList = [];
                        Object.assign(this.templateList, res.data.data.dataList);
                        if (this.dataList.id === '' && this.templateList.length) {
                            this.dataList.id = this.templateList[0].id;
                        }
                    }
                });
            },
            getLabelResultList() {
                //获取结果页集合
                seekGetLabelResultList({}).then(res => {
                    if (res.data.state == 200) {
                        this.laberList = [];
                        Object.assign(this.laberList, res.data.data.dataList);
                    }
                });
            },
            opSettingLabel(data = {
                opType: '2',//0=查询,1=写入,2=更新,3=删除
                name: this.dataList.name,
                id: this.dataList.id, //模板id
                imgUrl: this.dataList.imgUrl, //二维码
                imgCom: this.dataList.imgCom, //logo
                shopName: this.dataList.shopName,
                shopAddress: this.dataList.shopAddress,
                shopPhone: this.dataList.shopPhone,
                isCom: this.dataList.isCom,
                isShop: this.dataList.isShop,
                vid: this.dataList.vid
            }, type = '0') {
                seekOpSettingLabel(data).then((res) => {
                    if (res.data.state == 200) {
                        switch (type) {
                            case 'add':
                                this.getSettingLabel();
                                Object.assign(this.dataList, res.data.data);
                                this.addTempList.name = '';
                                this.addTempList.vid = '';
                                break;
                            case 'edit':
                                this.dataList.name = res.data.data.name;
                                this.dataList.vid = res.data.data.vid;
                                this.getSettingLabel();
                                break;
                            case 'del':
                                this.getSettingLabel();
                                this.dataList.id = '';
                                break;
                            default:
                                Object.assign(this.dataList, res.data.data);
                        }
                    }
                });
            },
            inputBlur() {
                this.opSettingLabel();
            },
            selectChangeId(id) {
                let data = {
                    opType: '0',
                    id: this.dataList.id
                }
                this.opSettingLabel(data);
                if (this.dataList.vid) {
                    let list = this.laberList.filter(item => this.dataList.vid == item.id);
                    this.url = `http://label.yunzhubao.com/#/${list[0].url}?templateId=${id}`;
                }
            },
            selectChangeUrl(id) {
                if (this.dataList.vid) {
                    let list = this.laberList.filter(item => id == item.id);
                    this.url = `http://label.yunzhubao.com/#/${list[0].url}?templateId=${this.dataList.id}`;
                    this.dataList.vid = list[0].id;
                    this.opSettingLabel();
                }
            },
            addTemplate() {
                this.addTempList.vid = this.getPublicLabel().id;
                this.addDialog = true;
            },
            editTemplate() {
                this.editTempList.name = this.dataList.name;
                this.editTempList.vid = this.dataList.vid;
                if (this.dataList.id) {
                    this.editDialog = true;
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选选择模板！'
                    });
                }
            },
            addTemplateFun() {
                if (!this.addTempList.name.trim()) {
                    this.$message({
                        type: 'warning',
                        message: '请输入模板名称！'
                    });
                    return ;
                }
                this.opSettingLabel({
                    name: this.addTempList.name.trim(),
                    vid: this.addTempList.vid,
                    opType: '1',
                    isCom: '0',
                    isShop: '0'
                }, 'add');
                this.addTempList = {
                    name: '',
                    vid: ''
                }
                this.addDialog = false;
            },
            editTemplateFun() {
                if (!this.editTempList.name.trim()) {
                    this.$message({
                        type: 'warning',
                        message: '请输入模板名称！'
                    });
                    return ;
                }
                let data = {
                    opType: '2',
                    id: this.dataList.id,
                    name: this.editTempList.name.trim(),
                    vid: this.editTempList.vid,
                }
                this.opSettingLabel(data, 'edit');
                this.editDialog = false;
            },
            delTemplateFun() {
                this.opSettingLabel({
                    name: this.dataList.name,
                    id: this.dataList.id,
                    opType: '3'
                }, 'del');
                this.editDialog = false;
            },
            getPublicLabel() {
                let list = this.laberList.filter(item => {
                    return (item.url === 'publicLabel' || item.url === 'publicLaber');
                });
                return list[0];
            },
            beforeAvatarUpload(file) {
                this.cosCloud(file, 'imgUrl');
            },
            beforeAvatarUploadLogo(file) {
                this.cosCloud(file, 'imgCom');
            },
            cosCloud(file, type) {
                let _this = this;
                let extNameList = file.name.split('.');
                let extName = extNameList[extNameList.length - 1];
                if ('png,jpg,JPEG,jpeg'.indexOf(extName) == -1) {
                    this.$message({
                        type: 'warning',
                        message: '文件格式必须为 *.jpg / *.png / *.jpeg'
                    });
                    return
                }

                let getSignUrl = base.Cos.getSignUrl;
                let updateUploadFileURL = base.Cos.updateUploadFileURL;
                let myFolder = '/iconHeaded/';
                let appid = base.Cos.appid;
                let bucket = base.Cos.bucket;
                let region = base.Cos.region;
                let userId = sessionStorage.getItem('id');
                let timestamp = new Date().getTime();
                let fileName = userId + '-' + timestamp + '.' + extName;
                let cos = new CosCloud({
                    appid: appid,
                    bucket: bucket,
                    region: region,
                    getAppSign: function (callback) {
                        baseApi.apiCall({type: '1'}, getSignUrl).then((response) => {
                            let sign = response.data.data.signStr;
                            myFolder = response.data.data.url;
                            callback(sign);
                        })
                    }
                })
                let successCallBack = function (result) {
                    console.log('获取上传结果:', result);
                    _this.dataList[type] = result.data.source_url;
                    _this.opSettingLabel();
                }
                let errorCallBack = function (result) {
                }
                let progressCallBack = function (result) {
                }
                cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 1) //0表示允许覆盖文件 1表示不允许
            }
        }
    }
</script>

<style lang="scss" src="./../newSetting.scss" scoped></style>
<style lang="scss">
    .addDig-box{
        height:auto;
    }
    .addDig-box .body input{
        width:100%;
    }
    #add-template{
        position:absolute;
        top:5px;
        right:44px;
    }
    .model-content{
        overflow-y:scroll;
        position:relative;
        .el-select{
            margin-right:10px;
            width:150px;
        }
        p{
            float:left;
            font-size:14px;
            color:#959595;
            span{
                color:#2993f8;
            }
        }
        .model-checkbox{
            height:36px;
            line-height:36px;
            margin-bottom:15px;
            label{
                display:block;
                width:70px;
                height:36px;
                float:left;
                text-align:right;
                color:#333;
                font-size:14px;
                margin-right:7px;
                font-weight:500;
            }
            .el-checkbox{
                .el-checkbox__label{
                    font-size:14px !important;
                }
            }
            input{
                padding-left:10px;
                width:380px;
                height:36px;
                background:#f6f7f8;
                border-radius:4px;
                margin-right:23px;
                float:left;
                border:1px solid #fff;
            }
            input:hover{
                border:1px solid #2993f8;
            }

        }
        .model-content-group{
            margin-bottom:35px;
            padding-left:20px;
            position:relative;

            .url-text{
                font-size:12px;
                user-select:text;
            }
            .border-left{
                width:5px;
                height:18px;
                background:#2993f8;
                border-radius:15px;
                position:absolute;
                top:3px;
                left:2px;
            }
            .el-radio-group{
                float:right;
                margin-top:5px;
            }
        }
        .company{
            .avatar-uploader-icon{
                width:113px;
                height:113px;
                line-height:113px;
            }
            .avatar{
                width:113px;
                height:113px;
            }
            .company-info{
                color:#999;
                font-weight:500;
                font-size:16px;
            }
            .erweima{
                font-size:14px;
                color:#333;
                margin-bottom:10px;
            }
        }
        .el-upload{
            border:1px dashed #409eff !important;
            border-radius:6px;
            cursor:pointer;
            position:relative;
            overflow:hidden;
            background:#f6fbff;
        }
        .avatar-uploader-icon{
            font-size:20px;
            color:#2993f8 !important;
            width:120px;
            height:90px;
            line-height:90px;
            text-align:center;
        }
        .avatar{
            width:120px;
            height:90px;
            display:block;
        }
        .model-content-title{
            overflow:hidden;
            margin-bottom:15px;

            p{
                font-weight:600;
                font-size:18px;
                color:#333;
            }
        }
    }

</style>
<style lang="scss" scoped>
    .model-radio{
        float:right;
        overflow:hidden;
        position:relative;
        top:3px;
        .laber-radio{
            display:inline-block;
            margin-left:20px;
            cursor:pointer;
            label{
                font-size:14px;
                color:#666;
            }
            input[type="radio"] + label::before{
                content:"\A0";
                display:inline-block;
                vertical-align:middle;
                width:8px;
                height:8px;
                padding:2px;
                margin-right:6px;
                margin-top:-3px;
                border-radius:50%;
                border:1px solid #d6d6d6;
                line-height:1;
            }
            input[type="radio"]:checked + label{
                color:#2993f8;
            }
            input[type="radio"]:checked + label::before{
                background-color:#2993f8;
                border:1px solid #2993f8;
                background-clip:content-box;
            }
            input[type="radio"]{
                position:absolute;
                clip:rect(0, 0, 0, 0);
            }
        }
    }
    #edit-model, #add-model{
        float:none;
        overflow:initial;
        .laber-radio{
            display:block;
            margin:0;
        }
    }
    .addDig{
        .body{
            padding:0 35px;
        }
        .radio-temp{
            margin-top:20px;
        }
        p{
            margin-bottom:15px;
        }
    }
    .addDig .title{
        width:280px;
        position:absolute;
        left:50%;
        margin-left:-140px;
        top:35px;
        text-align:center;
        z-index:-1;
    }
    .del-btn{
        cursor:pointer;
        height:36px;
        width:36px;
        background:url(~static/img/nor.png) no-repeat center center;
        position:absolute;
        right:10px;
        bottom:10px;
    }
    .del-btn:hover{
        background:url(~static/img/sel.png) no-repeat center center;
    }
</style>

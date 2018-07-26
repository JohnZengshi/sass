<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title">
                <i class="iconfont icon-liebiao"></i>验证码结果页管理
                <el-button id="add-template" type="primary" @click="addTemplate">新增模板</el-button>
            </div>
            <div class="model-content">
                <div class="model-content-group">
                    <el-select v-model="id" placeholder="请选择模板">
                        <el-option v-for="item in templateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="url" placeholder="请选择结果页">
                        <el-option v-for="item in laberList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button type="primary" @click="editTemplate">编辑模板</el-button>
                </div>
                <div class="model-content-group">
                    <div class="model-content-title">
                        <div class="border-left"></div>
                        <p>LOGO上传</p>
                    </div>
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUploadLogo">
                        <img v-if="imgCom" :src="imgCom" class="avatar"> <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </div>
                <div class="model-content-group">
                    <div class="border-left"></div>
                    <div class="model-content-title">
                        <p>店铺信息</p>
                        <el-radio-group>
                            <el-radio :label="1">显示默认</el-radio>
                            <el-radio :label="2">显示且跟随商品位置</el-radio>
                            <el-radio :label="3">隐藏</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="model-checkbox">
                        <label>店铺名称：</label>
                        <input type="text">
                    </div>
                    <div class="model-checkbox">
                        <label>店铺地址：</label>
                        <input type="text">
                    </div>
                    <div class="model-checkbox">
                        <label>店铺电话：</label>
                        <input type="text">
                    </div>

                </div>
                <div class="model-content-group company">
                    <div class="model-content-title">
                        <div class="border-left"></div>
                        <p>公司信息<span class="company-info">（公司名称，公司地址，公司电话，公司二维码）</span></p>
                        <el-radio-group>
                            <el-radio :label="1">显示</el-radio>
                            <el-radio :label="2">隐藏</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="erweima">二维码上传</div>
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
                        <img v-if="imgUrl" :src="imgUrl" class="avatar"> <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </div>
                <div class="model-content-group">
                    <div class="model-content-title">
                        <div class="border-left"></div>
                        <p>结果样式页</p>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
            </div>

            <el-dialog :visible.sync="addDialog" customClass="addDig addDig-box">
                <div class="title">
                    <img src="~static/img/piliang.png">
                    <div>新增模板</div>
                </div>
                <div class="body">
                    <input type="text" placeholder="输入模板名称">
                </div>
                <div class="foot" solt="footer">
                    <div class="ope-btn">确定</div>
                </div>
            </el-dialog>

            <el-dialog :visible.sync="editDialog" customClass="addDig addDig-box">
                <div class="title">
                    <img src="~static/img/piliang.png">
                    <div>编辑模板</div>
                </div>
                <div class="body">
                    <input type="text" placeholder="输入模板名称">
                    <div class="radio-temp">
                        <p>指定结果页面</p>
                        <el-radio-group>
                            <el-radio :label="1">模板1</el-radio>
                            <el-radio :label="2">模板2</el-radio>
                            <el-radio :label="3">模板3</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="foot" solt="footer">
                    <div class="ope-btn">确定</div>
                    <div class="del-btn"></div>
                </div>
            </el-dialog>

        </div>
    </transition>
</template>

<script>
    import {seekOpSettingLabel, seekGetSettingLabel} from './../../../../Api/commonality/seek'
    import base from '@/config/base/index';
    import baseApi from '@/Api/Base/base'

    export default {
        data() {
            return {
                templateList: [], //模板集合
                laberList: [],  //结果页集合
                id: '', //模板id
                url: '',    //模板结果页id
                imgUrl: '', //二维码
                imgCom: '', //logo
                shopName: '',
                shopAddress: '',
                shopPhone: '',
                addDialog: false,
                editDialog: false
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                let data = {
                    opType: '0'
                }
                seekOpSettingLabel(data).then((res) => {
                    if (res.data.state == 200) {

                    }
                });
                seekGetSettingLabel({}).then(res => {

                });
            },
            addTemplate() {
                this.addDialog = true;
            },
            editTemplate() {
                this.editDialog = true;
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
                    _this[type] = result.data.source_url;
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

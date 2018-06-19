<template>
    <div class="ex-wrap">
        <div class="logo">
            <img src="./../../../../static/img/logo.png">
        </div>
        <div class="main">
            <div class="main-item">
                <input v-model="experienceInfo.phoneNumber" type="text" placeholder="请输入手机号">
            </div>
            <div class="main-item">
                <input v-model="experienceInfo.SMSCode" class="barcode" type="text" placeholder="验证码">
                <el-button v-if="sended" slot="append" style="width:107px; position: absolute; right: 5px; top: 6px;">已发送({{subsub<10? '0'+subsub : subsub}}s)</el-button>
                <span v-else @click="handleRegIconClick" @keyup.enter="ajaxExperienceLogin">发送验证码</span>
            </div>
            <div class="btn" @click="ajaxExperienceLogin">即刻体验</div>
            <p>以模拟数据体验产品，</p>
            <p>身临其境感受云珠宝高效协作的魅力所在</p>
        </div>
        <div v-if="isSelect" class="chose-box">
            <div class="title">请选择角色</div>
            <ul>
                <li @click="createTaste(1)">
                    <img src="./../../../../static/img/boss.png" />
                    <span>我是老板</span>
                </li>
                <li @click="createTaste(2)">
                    <img src="./../../../../static/img/manage.png" />
                    <span>我是店长</span>
                </li>
                <li @click="createTaste(3)">
                    <img src="./../../../../static/img/sellman.png" />
                    <span>我是店员</span>
                </li>
            </ul>
            <div class="main-footer" @click="backBtn">←返回</div>
        </div>
        <div class="footer">
            <div class="go-register" @click="gotoRegistry">免费注册</div>
            <div class="go-login">已有账号，去<span @click="gotoLogin">登录</span></div>
        </div>
    </div>
</template>
<script>
import {userRegistry, getVcCode, confirmCode} from '../../../Api/auth_v1'
import {seekCreateTaste} from '../../../Api/commonality/seek'
export default {
    data () {
        return {
            experienceInfo: {
                phoneNumber: '',
                SMSCode: '',
                name: ''
            },
            isSelect: false,
            sended: false,
            subsub: 60,
        }
    },
    methods: {
        gotoLogin (ev) {
            this.$emit('goto-login', true);
        },
        gotoRegistry (ev) {
            this.$emit('goto-registry', true);
        },
        backBtn () {
            this.isSelect = false
        },
        handleRegIconClick () {
            let data = {
                phone: this.experienceInfo.phoneNumber,
                type: '06'
            };
            if (!(/^1[34578]\d{9}$/.test(data.phone))) {
                //alert("请正确输入有效手机号.");
                this.$store.dispatch('workPopupError', "请正确输入有效手机号.");
            } else {
                let self = this;
                getVcCode(data).then((res) => {
                if (res.data.state === 200) {
                    self.sended = true;
                    self.intersubsub = setInterval(() => {
                    --self.subsub;
                    if (self.subsub <= 0) {
                        clearInterval(self.intersubsub)
                        self.sended = false;
                        self.subsub = 60;
                    }
                    }, 1000);
                } else {
                    this.$store.dispatch('workPopupError', res.data.msg);
                }
                });
            }
        },
        createTaste (type) {
            let options = {
                type: type,
                phone: this.experienceInfo.phoneNumber
            }
            seekCreateTaste(options).then((res) => {
                if (res.data.state == 200) {
                    sessionStorage.setItem("experience", 'Y');
                    sessionStorage.setItem("id", res.data.data.Id);
                    sessionStorage.setItem("sig", res.data.data.sig);
                    sessionStorage.setItem('tokenId', res.data.data.tokenId);
                    sessionStorage.setItem('companyId', res.data.data.companyId);
                    // sessionStorage.setItem('userId', res.data.userId);
                    //sessionStorage.setItem('companyId', res.data.companyId);
                    this.isSelect = false
                    this.$router.push('/mainIndex');
                } else {
                    this.$store.dispatch('workPopupError', res.data.msg);
                }
            }, (res) => {
                this.$store.dispatch('workPopupError', res.data.msg);
            })
        },
        ajaxExperienceLogin () {
            if (this.experienceInfo.SMSCode.length < 4 || this.experienceInfo.SMSCode.length >= 5) {
                //alert("请正确输入验证码");
                this.$store.dispatch('workPopupError', "请正确输入验证码");
                return;
            }
            let options = {
                phone: this.experienceInfo.phoneNumber,
                SMSCode: this.experienceInfo.SMSCode,
                type: '03'
            }
            
            confirmCode(options).then((res) => {
                if (res.data.state == 200) {
                    //console.log(res)
                    this.isSelect = true
                    //this.createTaste()
                } else {
                    this.$store.dispatch('workPopupError', res.data.msg);
                }
            }, (res) => {
                this.$store.dispatch('workPopupError', "验证短信码失败");
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.ex-wrap {
    width: 650px;
    height: 584px;
    background:#fff;
    border-radius: 10px;
    margin: 0 auto;
    //margin-top: 130px;
    position:relative;
    overflow: hidden;
    .logo {
        padding-top: 47px;
        padding-bottom: 62px;
        img {
            display: block;
            margin: 0 auto;
            width: 100px;
            height: 100px;
            border: 1px solid #d8d8d8;
            border-radius: 50%;
            
        }
    }
    .chose-box {
        background:#fff;
        width: 100%;
        height: 350px;
        position: absolute;
        left: 0;
        top: 160px;
        &>.title {
            font-size: 30px;
            color:#2993f8;
            text-align:center;
            position: absolute;
            left:0;;
            top: -120px;
            width: 100%;
            background:#fff;
            height: 150px;
            line-height: 120px;
        }
        ul {
            li {
                height: 59px;
                width: 400px;
                margin:0 auto;
                background:#f1f2f3;
                border-radius: 10px;
                margin-bottom: 50px;
                position: relative;
                cursor: pointer;
                img {
                    width: 63px;
                    height: 90px;
                    position: absolute;
                    bottom: 0;
                    left: 40px;
                }
                &>span {
                    line-height: 59px;
                    margin-left: 200px;
                    font-size: 30px;
                    color: #333;
                }
            }
        }
        .main-footer {
            width: 60px;
            height: 20px;
            text-align: center;
            margin: 0 auto;
            cursor: pointer;
        }
    }
    .main {
        width: 348px;
        margin: 0 auto;
        height: 250px;
        .main-item {
            margin-bottom: 20px;
            position: relative;
            input {
                width: 348px;
                height: 48px;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                padding-left: 23px;
                font-size: 16px;
                //color:#cccccc;
            }
            .barcode {
                padding-right: 130px;
            }
            span {
                height: 25px;
                padding: 0 18px;
                display: block;
                border-left: 1px solid #d6d6d6;
                color:#2993f8;
                font-size: 14px;
                line-height: 25px;
                position: absolute;
                right: 0;
                top: 12px;
                cursor: pointer;
            }
            
        }
        .btn {
            width: 348px;
            height: 50px;
            background:#2993f8;
            color:#fff;
            font-size: 20px;
            text-align: center;
            line-height: 50px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 25px;
        }
        p {
            text-align: center;
            color:#999999;
            font-size: 14px;
        }

        
    }
    .footer {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 30px;
        font-size: 14px;
        .go-register {
            float: left;
            cursor: pointer;
            color:#2993f8;
        }
        .go-login {
            float: right;
            span {
                color:#2993f8;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}
</style>

<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>证书</div>
            <div class="model-content" >
                <div v-loading="isLoading" element-loading-text="拼命加载中">
                    <div class="type-block certig-block">
                        <div class="item-title">证书<span class="add-btn" @click="addDialogAct(1)">+证书</span></div>
                        <ul class="type-block-main-certif">
                            <!-- <li class="type-block-item certif-item" @click.stop="addDialogAct(2, element)" v-for="element in dataList" :key="element.id">
                                <span>{{element.certificateName}}</span>
                            </li> -->
                            <li class="type-block-item certif-item" @click.stop="addDialogAct(2, element)" v-for="element in dataList" :key="element.id">
                                <div class="certif-wrap">
                                    <div class="certif-title">
                                        {{element.certificateName}}
                                    </div>
                                    <div class="certif-main">
                                        <div class="label">
                                            <span><i>检测机构</i></span>
                                            <div>{{element.organizationName}}</div>
                                        </div>
                                        <div class="label two">
                                            <span><i>检测标准1</i></span>
                                            <div>{{element.stand1}}</div>
                                        </div>
                                        <div class="label">
                                            <span><i>网址</i></span>
                                            <div>{{element.website}}</div>
                                        </div>
                                        <div class="label two">
                                            <span><i>检测标准2</i></span>
                                            <div>{{element.stand2}}</div>
                                        </div>
                                        <div class="label">
                                            <span><i>电话</i></span>
                                            <div>{{element.phone}}</div>
                                        </div>
                                        <div class="label two">
                                            <span><i>检测标准3</i></span>
                                            <div>{{element.stand3}}</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <el-dialog :visible.sync="addDialog" customClass="certificateDig">
                    <!--<div slot="title" style="position: absolute;"></div>-->
                    <div slot="title" class="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>编辑</div>
                    </div>
                    <div class="opera-body">
                        <div class="input-block-title">
                            <i></i>
                            <span>{{dialogText}}</span>
                        </div>
                        <ul class="ope-ul">
                            <li><label>证 书 名<span></span><i>*</i></label><input v-model="inputData.creName" type="text"></li>
                            <li><label>检测机构<span></span><i>*</i></label><input v-model="inputData.mechanism" type="text"></li>
                            <li><label>网 址<span></span><i>*</i></label><input v-model="inputData.webSut" type="text"></li>
                            <li><label>电 话<span></span><i>*</i></label><input v-model="inputData.phone" type="text"></li>
                            <li><label>检测标准1<span></span><i>*</i></label><input v-model="inputData.standard1" type="text"></li>
                            <li><label>检测标准2<span></span><i>*</i></label><input v-model="inputData.standard2" type="text"></li>
                            <li><label>检测标准3<span></span></label><input v-model="inputData.standard3" type="text"></li>
                        </ul>
                        <div class="ok-btn" @click="operateAct()">确定</div>
                        <div v-if="operateType == 2" class="del-btn" @click="delGoods"></div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </transition>
</template>
<script>
import {seekShowhCertificateList} from './../../../../Api/commonality/seek'
import {operateAddHCertificateList, operateDelHCertificate, operateProductClassesOrderBy} from './../../../../Api/commonality/operate'

import draggable from 'vuedraggable'
export default {
  data () {
        return {
            dialogText: '新增证书',
            addDialog: false,
            isLoading: true,
            value: '',
            addTypeText: '',
            operateType: null,
            dataList: [],
            orderByList: [],
            option: ['无', '990', '999', '999.9', '999.99', '3D'],
            inputData: {
                creId: '', // 证书id
                creName: '', // 证书名
                mechanism:'', // 检测机构
                webSut: '', // 网址
                phone: '', // 电话
                standard1: '', // 检测标准1
                standard2: '', // 检测标准1
                standard3: '', // 检测标准1
            }
        }
    },
    components: {
        draggable //拖动插件
    },
    created () {
        this.showhCertificateList()
    },
    mounted () {
        $(".model-content").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
        })
    },
    computed: {

    },
    methods: {
        delGoods () { // 删除证书
            let options = {
                id: this.inputData.creId,
                handleType: '1'
            }
            console.log(options)
            operateDelHCertificate(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.addDialog = false
                    this.showhCertificateList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, () => {
                console.log(res)
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        operateAct () {
            if (this.operateType == 1) {
                this.inputData.creId = ''
            }
            if (this.inputData.mechanism == '' || this.inputData.creName == '' || this.inputData.webSut == '' || this.inputData.phone == '' || this.inputData.standard1 == '' || this.inputData.standard2 == '') {
                this.$store.dispatch('workPopupError', '必填项不可为空')
            } else {
                this.addHCertificateList()
            } 
        },
        addDialogAct (type, item) {
            this.addDialog = true
            this.operateType = type
            console.log(item)
            if (type == 2) {
                this.dialogText = '修改的内容'
                this.inputData.creId = item.id
                this.inputData.mechanism = item.organizationName
                this.inputData.creName = item.certificateName
                this.inputData.webSut = item.website
                this.inputData.phone = item.phone
                this.inputData.standard1 = item.stand1
                this.inputData.standard2 = item.stand2
                this.inputData.standard3 = item.stand3
            } else {
                this.dialogText = '新增证书'
                this.inputData.creId = ''
                this.inputData.mechanism = ''
                this.inputData.creName = ''
                this.inputData.webSut = ''
                this.inputData.phone = ''
                this.inputData.standard1 = ''
                this.inputData.standard2 = ''
                this.inputData.standard3 = ''
            }
        },
        addHCertificateList () {
            let options = {
                handleType: this.operateType, // 1 新增 2 修改
                list: [
                    {
                        certificateId: this.inputData.creId, // 2时有
                        organizationName: this.inputData.mechanism,
                        certificateName: this.inputData.creName,
                        website: this.inputData.webSut,
                        phone: this.inputData.phone,
                        stand1: this.inputData.standard1,
                        stand2: this.inputData.standard2,
                        stand3: this.inputData.standard3
                    }
                ]
            }
            operateAddHCertificateList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.inputData.creId = ''
                    this.inputData.mechanism = ''
                    this.inputData.creName = ''
                    this.inputData.webSut = ''
                    this.inputData.phone = ''
                    this.inputData.standard1 = ''
                    this.inputData.standard2 = ''
                    this.inputData.standard3 = ''
                    this.addDialog = false
                    this.showhCertificateList()
                }
            }, (res) => {
                console.log(res)
            })
        },
        showhCertificateList () { // 证书列表
            this.isLoading = true
            seekShowhCertificateList().then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.isLoading = false
                    this.dataList = res.data.data.list
                }
            }, (res) => {
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss" src="./../newSetting.scss" scoped></style>
<style lang="scss" src="./../dialogSetting.scss"></style>
<style lang="scss" scoped>

</style>
<template>
    <el-dialog class="dialog-w500-hAuto-hn new-Jin-Bai-Fu" @close="closeCb" title="" v-model="isShow">
        <div class="list" v-loading="fullscreenLoading" element-loading-text="拼命进行中...">
            <div class="jbf-header-wrap">
                <img src="~assets/img/copy.png">
                <p>
                  选择导入位置
                </p>   
            </div>
            <div  class="jinbaifu-wrap">
                <div class="choose-wrap clearfix" v-if="type != 2 ">
                    <p>选择仓库</p>
                    <ul class="clearfix">
                        <li :title="item.repositoryName" :class="{actions: item.repositoryId == newDatas.repositoryId}" v-for="(item,index) in repositoryList" :key="index" @click="getRepositoryId(item.repositoryId)">
                            {{item.repositoryName}}
                        </li>
                    </ul>
                </div>

                <div class="choose-wrap clearfix">
                    <p>选择店铺</p>
                    <template v-for="(allItem, index) of showShopList">
                        <ul class="clearfix" :key="index">
                            <li :title="item.shopName" :class="{actions: item.shopId == newDatas.shopId, 'actions-change': item.shopId == newDatas.shopId}" v-for="(item,index) in allItem" :key="index" @click="getShopId(item.shopId, index)">
                                {{item.shopName}}
                            </li>
                        </ul>
                    <!--     <div :key="index" v-if="isRepository[index]" class="xj-radio-wrap counter-radio-20"> -->
                        <div :key="index" class="xj-radio-wrap counter-radio-20">
                            <el-radio-group v-model="changeCounterId" @change="changeCounter">
                                <div class="counter-wrap" v-for="(item,index) of counterList" :key="index">
                                    <el-radio  :label="item.counterId">{{item.counterName}}</el-radio>
                                </div>
                            </el-radio-group>
                        </div>   
                    </template>
                </div> 
            </div>

            <div class="jbf-bottom-wrap">
                <input type="text" v-model="fileUrl">
                <p>
                    选择文件
                    <input type="file" name="file" @change="uploadingOne($event)"/>
                </p>
                <a href="javascript: void(0)" @click="jinbaifuUpload">完成</a>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import {seekShowCounterList,seekGetUserInfo} from 'Api/commonality/seek'
// import {operateCreateFHReceipt} from './../../Api/commonality/operate'
export default {
    data () {
        return {
            "productTypeList": null,
            "productTypeListSmall": null,
            "transform": true,
            "fourBig": false,
            "bigStyle": {},
            "viewBig": 2,
            "chooseData": {
                "childIndex": 1,
                "chooseBig": "",
                "chooseSmall": ""
            },
            "cutData": {
                "one": true,
                "two": false,
                "three": false,
                "four": false
            },
            "newDatas": { // 新增数据(其它页面也用到的)
                "shopId": "", // 店铺ID
                "repositoryId": "" // 库位ID
            },
            "isShow": false,
            "fullscreenLoading": false,
            changeStyle: {
                top: '100px',
                'z-index': -1
            },
            showShopList: [],
            isRepository: [],
            counterList: [], // 柜组列表
            changeCounterId: '',
            jinbaifuDate: '',
            fileUrl: '',
            files : '',
            
            type : 3 //1代表公司权限的人，2为店铺，3为双重身份，默认为3
        }
    },
    props: [
        'newPopup'
    ],
    watch: {
        'newPopup': function () {
            console.log(this.newPopup)
            if (this.newPopup === true) {
                this.isShow = this.newPopup;
            }
        },
        'shopListByCo' () {
            this.formatDatas(this.shopListByCo)
            // alert('改变啦')
        }
    },
    created () {
        this.getUserType()
        this.workRepositoryList();
        this.workSupplierList();
        this.getShopListByCo();
        this.isShow = this.newPopup;
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "repositoryList", // 库位列表
            "supplierListData" // 供应商
        ])
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo", // 店铺列表
            "workSupplierList" // 供应商
        ]),
        
        //获取用户类型
        getUserType(){
            seekGetUserInfo({
                userId: sessionStorage.getItem('id')
            }).then((res) => {
                
               let tempRes = res.data.data.roleList.map( f => f.role )
               console.log('用户类型',tempRes)
               if( tempRes.length > 0 ){
                 if( tempRes.length == 1 ){
                     if( tempRes.filter( f => f >= 4 ).length > 0 ){
                        //店铺
                        this.type = 2
                     }else{
                       //公司
                       this.type = 1  
                     }
                 }else{
                    
                    let shopRole = tempRes.filter( f => f >= 4 )
                    let companyRole = tempRes.filter( f => f < 4 )
                    //双重身份
                    if( shopRole.length > 0 && companyRole.length > 0 ){
                      this.type = 3
                    }else if( shopRole.length > 0 ){
                      //全部为店铺
                      this.type = 2
                    }else if( companyRole.length > 0 ){
                      //全部为公司权限
                      this.type = 1
                    }
                 }
               }
               
            })
        },
        //选择柜组
        changeCounter(){
          this.newDatas.repositoryId = ''
        },
        
        formatDatas (datalist) {
          let tempArray = [],
            format = 4,
            loop = -1
          if (datalist.length > 0) {
            let num = Math.ceil(datalist.length / format)
            while (num--) {
              tempArray.push([])
            }
          }
          datalist.forEach((item, i) => {
            if (i % format == 0) loop++
            tempArray[loop].push(item)
          })
          this.showShopList = tempArray
        },
        _seekShowCounterList (parm, index) {
            this.counterList = []
            let options = {
                shopId: parm
            }
            seekShowCounterList(options)
                .then(res => {
                    if (res.data.state === 200) {
                        this.counterList = res.data.data.counterList
                    } else {
                        this.$store.dispatch('workPopupError', res.data.msg)
                    }
                }, (res) => {
                    this.$store.dispatch('workPopupError', res.data.msg)
                })
        },
        getRepositoryId (parm, index) { // 库位
            this.newDatas.shopId = ''
            this.newDatas.repositoryId = parm
            this.isRepository = []
            this.changeCounterId = ''
            // this.isRepository[index] = true
            // _seekShowCounterList(parm, index)
        },
        getShopId (parm, index) {
            this.changeCounterId = '' //柜组id
            this.newDatas.repositoryId = ''
            this.newDatas.shopId = parm
            this.isRepository = []
            this.isRepository[index] = true
            this._seekShowCounterList(parm, index)
        },
        uploadingOne (e) {
            //var files = e.currentTarget.files[0];
            console.log(e.currentTarget.files[0])
            if (e.srcElement) {
                this.fileUrl = e.srcElement.value
            }
            if (e.explicitOriginalTarget) {
                this.fileUrl = e.explicitOriginalTarget.value
            }
            // this.fileUrl = e.srcElement.value
            this.files = e.currentTarget.files[0]
        },
        
        addFileData(){
            let fileData = new FormData();
            fileData.append("excelFile", this.files);
            let data = {
                "data": {
                    //"type": 1
                    //"storageId": this.newDatas.repositoryId,
                    //"shopId": this.changeCounterId // 就是柜组ID
                    // "counterId" : this.changeCounterId,
                    // "storageId": this.newDatas.repositoryId,
                    // "shopId": this.newDatas.shopId
                },
                "unit": {
                    "companyId": sessionStorage.getItem("companyId"),
                    "channel": 3,
                    "OS": "web",
                    "ip": "string",
                    "userId": sessionStorage.getItem("id"),
                    "tokenId": sessionStorage.getItem("tokenId")
                }
            }
            //库位
            if( this.newDatas.repositoryId != ''){
              Object.assign(data.data,{
                 storageId : this.newDatas.repositoryId
              })
            }else if( this.changeCounterId != ''){ //柜组
              Object.assign(data.data,{
                 counterId : this.changeCounterId
              })
            }
            fileData.append("data", JSON.stringify(data));
            console.log("参数数据查看：",data);
            console.log(JSON.stringify(data));
            this.jinbaifuDate = fileData
        },
        // 判断是否填写参数
        jinbaifuUpload () {
            
            if ( this.newDatas.shopId != '' && this.changeCounterId == '') {
                return this.$store.dispatch('workPopupError', "请选择柜组")
            }
            if ( this.newDatas.repositoryId == '' && this.changeCounterId == '') {
                return this.$store.dispatch('workPopupError', "请选择导入位置")
            }
            
            if ( this.fileUrl == '') {
                return this.$store.dispatch('workPopupError', "请选择文件")
            }
                        
            this.addFileData()
            if (!this.jinbaifuDate) {
                return this.$store.dispatch('workPopupError', "请选择")
            }
           
            this.fullscreenLoading = true;
            // var url = INTERFACE_URL_9097 + "/b1/rukuAutoUpload"
            let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8088' : ''
            let url = serverHost + "/b1/rukuAutoUpload"
            let xhr = this.$http.post(url, this.jinbaifuDate).then((response) => {
                this.fullscreenLoading = false;
                if (response.data.state === 200) {
                    if( response.data.data.flag == 1){
                      this.$store.dispatch('workPopupError', response.data.data.message);
                    }else if( response.data.data.flag == 0){
                      this.$store.dispatch('workPopupError', response.data.data.message);
                      this.closeCb();
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg);
            }).catch((e)=>{
              console.log(e);
              this.$store.dispatch('workPopupError', response.data.msg);
            })
        },

        closeCb () {
            this.$emit("closePopup", false)
        }
    }
}
</script>
<style lang="scss">
.new-Jin-Bai-Fu {
    .el-dialog__body {
        position: relative;
        padding-top: 20px !important;
        top: -20px;
        left: 0;
    }
}
</style>
<style lang="scss" scoped>
.new-Jin-Bai-Fu{
    .jinbaifu-wrap{
        max-height: 400px;
        overflow: auto;
        margin-bottom: 20px;
        margin-right: 5px;
    }
    .popTitle{ // 弹窗标题
        height: 70px;
        line-height: 70px;
        text-align: center;
        background: #f6f7f8;
        border-radius: 4px 4px 0 0;
        .prePage{ // 上一页
            position: absolute;
            left: 10px;
        }
        .skip{ // 跳过
            position: absolute;
            right: 10px;
        }
    }
    .jbf-header-wrap{
        margin: 20px 0;
        text-align: center;
        // border: 1px solid red;
        p{
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-top: 10px;
        }
    }
    .list{
        // position: absolute;
        // top: 0;
        // left: 0;
        height: 100%;
        .choose-wrap{
            // height: 230px;
            position: relative;
            // border: 1px solid red;
            overflow: auto;
            p{
                padding-left: 20px;
                font-weight: bold;
                color: #2993f8;
                margin-bottom: 15px;
            }
            ul{
                display: inline-block;
                padding: 0 20px;
                li{
                    position: relative;
                    display: inline-block;
                    width: 100px;
                    height: 36px;
                    line-height: 36px;               
                    background: #f6f7f8;
                    // border: 1px solid #2993f8;
                    color: #333;
                    cursor: pointer;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 13px;
                    padding: 0 10px;
                    text-align: center;
                    border-radius: 3px;
                    margin-right: 15px;
                    // margin: 0 15px 10px 0;
                    // margin: 0 20px 10px 0;
                    // .xj-radio-wrap{
                    //     position: absolute;
                    //     height: 100px;
                    //     width: 400px;
                    //     right: 0;
                    //     overflow: auto;
                    //     border: 1px solid #000;
                    // }
                    // input{
                    //     position: absolute;
                    //     width: 100px;
                    //     height: 36px;
                    //     top: 0;
                    //     left: 0;
                    //     opacity: 0; 
                    // }
                }
                li:nth-child(4){
                    margin-right: 0;
                }
                li:hover{
                    background: #2993f8;
                    color: #fff;
                }
                .actions{
                    background: #2993f8;
                    color: #fff;
                }
                .actions-change{
                    position: relative;
                    // margin-bottom: 100px;
                }
                .on{
                    color: #fff;
                    background-color: #2993f8;
                }
            }
            .xj-radio-wrap{
                padding: 0 20px 20px 20px;
                
                
            }
            .counter-wrap{
                display: inline-block;
                // border: 1px solid red;
                width: 100px;
                margin-right: 15px;
                padding: 10px;
                height: 40px;
            }
            .counter-wrap:nth-child(4n){
                margin-right: 0;
            }
        }
    }
    .jbf-bottom-wrap{
        //position: absolute;
        //bottom: 20px;
        width: 100%;
        padding: 0 20px 20px;
        >input{
            width: 100%;
            height: 30px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 4px 10px;
            font-size:12px;
        }
        p{
            position: relative;
            font-size: 12px;
            color: #333;
            margin-top: 10px;
            color: #2993f8;
            cursor: pointer;
            input{
                position: absolute;
                width: 100px;
                height: 36px;
                top: 0;
                left: 0;
                opacity: 0;
                font-size: 0;
                cursor: pointer;
            }
        }
        a{
            position: relative;
            display: inline-block;
            width: 200px;
            height: 30px;
            line-height: 30px;
            background: #f6f7f8;
            color: #333;
            cursor: pointer;
            text-align: center;
            border-radius: 3px;
            // margin-right: 15px;
            background: #2993f8;
            color: #fff;
            margin-left: 140px;
            margin-top: 20px;
            &:hover{
                background: #1c8af3;
            }
        }
    }
}
</style>

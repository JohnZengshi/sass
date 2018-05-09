<template>
  <div class="company_info">
    <div v-if="compId" class="cp_main_m">
      <div class="cp_main_left">
        <div class="cp_main_left_code">
          <div class="cp_main_left_code_item"><span>公司全称</span><span><input v-focus="flag"  @blur='blurAndUpload' type="text" v-if="operateType===1" v-model="getCompInfo.companyName"/><span class="infoBar" v-else @click="toEditing(1)">{{getCompInfo.companyName}}&nbsp;&nbsp;&nbsp;</span></span></div>
          <div class="cp_main_left_code_item"><span>联系人</span><span><input v-focus="flag"  @blur="blurAndUpload" type="text"  v-if="operateType===3" v-model="getCompInfo.prName"/><span class="infoBar" v-else @click="toEditing(3)">{{getCompInfo.prName}}&nbsp;&nbsp;&nbsp;</span></span></div>
          <div class="cp_main_left_code_item"><span>手机</span><span><input v-focus="flag"  @blur="blurAndUpload" type="text" v-if="operateType===4" v-model="getCompInfo.prPhone"/><span class="infoBar" v-else @click="toEditing(4)">{{getCompInfo.prPhone}}&nbsp;&nbsp;&nbsp;</span></span></div>
          <div class="cp_main_left_code_item"><span>电话</span><span><input v-focus="flag"  @blur="blurAndUpload" type="text" v-if="operateType===7" v-model="getCompInfo.telPhone"/><span class="infoBar" v-else @click="toEditing(7)">{{getCompInfo.telPhone}}&nbsp;&nbsp;&nbsp;</span></span></div>
          <div class="cp_main_left_code_item">
            <span>所在地</span><PcaSelect v-if="operateType===5" :pList="pList" :cList="cList" :aList="aList" :seltP="seltP" :seltC="seltC" :seltA="seltA" @selectedP="selectedP" @selectedC="selectedC" @selectedA="selectedA"></PcaSelect><span v-else class="addre" @click="toEditing(5)">{{getCompInfo.proName}}&nbsp;&nbsp;&nbsp;{{getCompInfo.cityName}}&nbsp;&nbsp;&nbsp;{{getCompInfo.areaName}}&nbsp;&nbsp;&nbsp;</span>
          </div>
          <div class="cp_main_left_code_item"><span>详细地址</span><span><input v-focus="flag" @blur="blurAndUpload" type="text" v-model="getCompInfo.companyAddress" v-if="operateType===6"/><span v-else @click="toEditing(6)">{{getCompInfo.companyAddress}}&nbsp;&nbsp;&nbsp;</span></span></div>
          <!--<div class="create_btn"  style="margin:0 auto;margin-top:40px;">保存</div>-->
        </div>
      </div>
      <div class="cp_main_right">
        <SelectImagePreview useType="更换Logo" @up="uploadHandler" :companyInfo="compInfo" :userInfo="userInfo"></SelectImagePreview>
      </div>
    </div>
    <div v-else>
      <div v-if="!createCompanying" class="cp_main">
        <div class="cp_main_tips">
          <img src="static/img/succeed.png">
          <p>暂无公司，快来创建公司吧~</p>
        </div>
        <div class="create_btn" @click="gotoCreateCompany" style="margin:0 auto;margin-top:75px;">+ 创建公司</div>
      </div>
      <div v-else>
        <div class="cp_main_left">
          <div class="cp_main_left_code">
            <div class="cp_main_left_code_item"><span>公司全称</span><span><input type="text" v-model="createCompanyUploadData.comName" /></span></div>
            <div class="cp_main_left_code_item"><span>联系人</span><span><input type="text" v-model="createCompanyUploadData.contactName" /></span></div>
            <div class="cp_main_left_code_item"><span>手机</span><span><input type="text" v-model="createCompanyUploadData.contactPhone" /></span></div>
            <div class="cp_main_left_code_item"><span>电话</span><span><input type="text" v-model="createCompanyUploadData.call" /></span></div>
            <div class="cp_main_left_code_item">
              <span>所在地</span><PcaSelect :pList="pList" :cList="cList" :aList="aList" :seltP="seltP" :seltC="seltC" :seltA="seltA" @selectedP="selectedP" @selectedC="selectedC" @selectedA="selectedA"></PcaSelect>
            </div>
            <div class="cp_main_left_code_item"><span>详细地址</span><span><input type="text" v-model="createCompanyUploadData.address" @blur="test111"/></span></div>
            <div class="create_btn" @click="submitcreateCompany" style="margin:25px 0 25px 7%;">提交创建</div>
          </div>
        </div>
        <div class="cp_main_right">
          <SelectImagePreview useType="上传Logo" @up="uploadHandler" :companyInfo="compInfo" :userInfo="userInfo"></SelectImagePreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SelectImagePreview from './components/SelectImagePreview'
  import PcaSelect from './components/PcaSelect'
  import base from '../../config/base'
  import baseApi from '../../Api/Base/base'
  import {createCompany, getCompanyInfo} from '../../Api/user'
  import * as types from '../../vuex/mutation-types'
  import {getAddress} from '../../Api/auth_v1'
  import {updateCompInfo} from '../../Api/company'

  export default {
    data () {
      return {
        createCompanying: false,
        compId: '',
        createCompanyUploadData: {
          comName: '',
          contactName: '',
          contactPhone: '',
          call: '',
          address: '',
          provinceName: '',
          provinceId: '',
          cityId: '',
          cityName: '',
          areaId: '',
          areaName: ''
        },
        getCompInfo: {
          companyName: '',
          companyAddress: '',
          logo: '',
          proName: '',
          cityName: '',
          areaName: '',
          prName: '',
          prPhone: '',
          telPhone: ''
        },
        operateType: 0,
        pList: [],
        cList: [],
        aList: [],
        seltP: '',
        seltC: '',
        seltA: '',
        seltPup: '',
        seltCup: '',
        seltAup: '',
        flag: false
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo', 'compInfo'
      ])
    },
    components: {
      SelectImagePreview, PcaSelect
    },
    watch: {
      '$route': 'routeAct'
    },
    methods: {
      routeAct () {
        //console.log(this.$route);
        this.operateType = 0;
      },
      test111 () {
        console.log(this.createCompanyUploadData);
      },
      toEditing (operateType) {
        this.operateType = operateType;
        this.flag = true;
        //console.log("11111");
      },
      blurAndUpload (ev) {
        //let self = this
        if (this.operateType === 4 && !(/^1[34578]\d{9}$/.test(this.getCompInfo.prPhone)) && this.getCompInfo.prPhone != "") {
            this.$message({
              message: '手机号格式不正确/或长度不足11位',
              type: 'warning'
            });
        } else if (this.operateType === 7 && !(/^1[34578]\d{9}$/.test(this.getCompInfo.telPhone)) && this.getCompInfo.telPhone != "") {
            this.$message({
              message: '电话号格式不正确',
              type: 'warning'
            });
        } else {
          let data = {
            operateType: this.operateType,
            objectData: ev.target.value
          }
          console.log(data);
          updateCompInfo(data).then((res) => {
            if (res.data.state == "1001015") {
            this.$store.dispatch('workPopupError', "权限不够，无法修改");
            }
            //self.$store.dispatch('getCompInfo');
            this.getCompIn();
          })
          this.operateType = 0
        }
      },
      gotoCreateCompany () {
        this.createCompanying = true
        console.log(this.createCompanying)
      },
      updateCompArea () {
        //let self = this
        //console.log(this.createCompanyUploadData);
        let data = {
          "operateType": this.operateType,
          "objectData": this.seltPup + '-' + this.seltCup + '-' + this.seltAup
        }
        console.log(data);
        updateCompInfo(data).then((res) => {
          console.log(res)
          if (res.data.state == "1001015") {
            this.$store.dispatch('workPopupError', "权限不够，无法修改");
          }
          //self.$store.dispatch('getCompInfo');
          this.getCompIn();
        })
        getAddress({type: '1'}).then((res) => {
          //console.log(res.data)
          if (res.data.state === 200) {
            this.pList = res.data.data.dataList
          }
        })

        this.operateType = 0
      },
      selectedP (name, id) {
        this.seltP = name
        this.seltPup = id
        this.cList = []
        this.aList = []
        this.seltC = ''
        this.seltA = ''
        this.createCompanyUploadData.provinceId = id;
        this.createCompanyUploadData.provinceName = name;
        getAddress({'type': '2', 'objectId': id}).then((res) => {
          if (res.data.state === 200) {
            this.cList = res.data.data.dataList
          }
        })
      },
      selectedC (name, id) {
        this.seltC = name
        this.seltCup = id
        this.seltA = ''
        this.createCompanyUploadData.cityId = id;
        this.createCompanyUploadData.cityName = name;
        getAddress({'type': '3', 'objectId': id}).then((res) => {
          if (res.data.state === 200) {
            this.aList = res.data.data.dataList
          }
        })
      },
      selectedA (name, id) {
        this.seltA = name
        this.seltAup = id
        this.createCompanyUploadData.areaId = id;
        this.createCompanyUploadData.areaName = name;
        this.updateCompArea()
      },
      uploadHandler (file) {
        let self = this;
        let extNameList = file.name.split('.');
        let extName = extNameList[extNameList.length - 1]
        let getSignUrl = base.Cos.getSignUrl
        let updateCompanyURL = base.Cos.updateCompanyURL
        let myFolder = '/iconCompany/'
        let appid = base.Cos.appid
        let bucket = base.Cos.bucket
        let region = base.Cos.region
        let companyId = sessionStorage.getItem('id')
        let timestamp = new Date().getTime()
        let fileName = companyId + '-' + timestamp + '.' + extName
        let cos = new CosCloud({
          appid: appid,
          bucket: bucket,
          region: region,
          getAppSign: function (callback) {
            baseApi.apiCall({type: '2'}, getSignUrl).then((response) => {
              console.log(response.data)
              let sign = response.data.data.signStr
              myFolder = response.data.data.url
              callback(sign)
            })
          }
        })
        let successCallBack = function (result) {
          console.log(result)
          if (result.code === 0) {
            let data = {
              operateType: '2',
              objectData: result.data.source_url
            }
            console.log(data)
            baseApi.apiCall(data, updateCompanyURL).then((response) => {
              console.log(response.data)
              if (response.data.state === 200) {
                console.log('updateCompanyURL success response')
                self.$store.dispatch('getCompInfo');
              }
            })
          }
        }
        let errorCallBack = function (result) {
          console.log(result)
        }
        let progressCallBack = function (result) {
          console.log(result)
        }
        cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 1) //0表示允许覆盖文件 1表示不允许
      },
      submitcreateCompany () {
        let self = this
        this.createCompanying = false
        if (!this.createCompanyUploadData.comName || this.createCompanyUploadData.comName.length < 2 || this.createCompanyUploadData.comName.length > 50) {
          this.$store.dispatch('workPopupError', "公司名称不能为空, 且长度为2-50个字符")
          return
        }
        if (!this.createCompanyUploadData.contactName || this.createCompanyUploadData.contactName.length < 2 || this.createCompanyUploadData.contactName.length > 50) {
        this.$store.dispatch('workPopupError', "联系人名称不能为空, 且长度为2-50个字符")
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.createCompanyUploadData.contactPhone))) {
          // alert('请正确输入电话号码')
          this.$store.dispatch('workPopupError', "请正确输入电话号码")
          return
        }
        console.log(self.createCompanyUploadData);
        createCompany(self.createCompanyUploadData).then((res) => {
          console.log(res.data)
          if (res.data.state === 200) {
            sessionStorage.setItem("companyId", res.data.data.companyId);
            self.$store.commit(types.SET_USER_INFO_ITEM, res.data.data);
            self.$store.dispatch('getUserInfo');
            self.$router.push('/admin/myCompany');
            location.reload();
          } else {
            this.$store.dispatch('workPopupError', res.data.msg)
          }
        })
      },
      selected (ev) {
        console.log(ev.target.value)
      },
      getCompIn () {
        this.compId = sessionStorage.getItem("companyId");
        let self = this;
        console.log(this.compId);
        let options = {
          "companyId": this.compId
        }
        this.$store.dispatch('compInfo');
        getCompanyInfo(options).then((res) => {
          if (self.compId) {
            if (res.data.state === 200) {
              console.log(res.data);
              self.getCompInfo.companyName = res.data.data.companyName;
              //console.log(self.getCompInfo.companyName)
              self.getCompInfo.companyAddress = res.data.data.address;
              //self.getCompInfo.logo = res.data.data.logo;
              self.getCompInfo.cityName = res.data.data.cityName;
              self.getCompInfo.prName = res.data.data.principalName;
              self.getCompInfo.prPhone = res.data.data.principalPhone;
              self.getCompInfo.proName = res.data.data.provinceName;
              self.getCompInfo.cityName = res.data.data.cityName;
              self.getCompInfo.areaName = res.data.data.areaName;
              self.getCompInfo.telPhone = res.data.data.telephone;
              //console.log(self.getCompInfo.prName)
              // console.log(self.getCompInfo.prPhone)
            }
          }
          console.log(res.data.data);
        }, (res) => {
          console.log("获取信息失败");
          console.log(res);
        })
      }
    },
    created () {
      this.operateType = 0;
      if (this.compId) {
        this.$store.dispatch('getCompInfo')
      }

    },
    mounted () {
      getAddress({type: '1'}).then((res) => {
        //console.log(res.data)
        if (res.data.state === 200) {
          this.pList = res.data.data.dataList
        }
      })
      this.getCompIn();
    }
  }
</script>

<style lang="scss" scoped>

   .company_info {
     width: 100%;
     clear: both;
     height:80%;
   .cp_main_m{
     height:100%;
   }
   .cp_main_left {
     width: 65%;
     float: left;
     height:90%;
     background-color: #f6f7f8;
     margin-left:70px;
   .cp_main_left_code {
     background-color: #f6f7f8;
     border-radius: 8px;
     width: 100%;
     height: 100%;
     margin-left: 10%;
     padding: 3% 0 3% 0;

   .cp_main_left_code_item {
     height: 56px;
     line-height: 56px;
     color: #999;
     font-size: 14px;
    .addre{padding-left:55px !important;}
   span{
     color:#999;
     .infoBar{
       display: block;
       width:100px;
       text-align:left;
     }
   }
   span:first-child {
     width: 22%;
     display: inline-block;
     padding-left: 7%;
   }
   span:last-child {
     width: 78%;
     display: inline-block;
     cursor: pointer;
     padding-left: 5%;
     input {
       width: 70%;
       height: 36px;
       padding-left: 12px;
       font-size: 16px;
       border: 1px solid #4fdcca;
       border-radius: 3px;
       color: #4fdcca;
     }
     input:focus {
       border: 1px solid #4fdcca;
       color: #4fdcca;
     }

     select {
       box-sizing: border-box;
       width: 27%;
       height: 36px;
       font-size: 16px;
       color: #999;
     option {
       color: #000;
       text-align: center;
     }
     }
   }
   input {
     width: 70%;
     height: 36px;
     padding-left: 12px;
     font-size: 16px;
     border: 1px solid #4fdcca;
     border-radius: 3px;
     color: #4fdcca;
   }
   }
   }
   }
   .cp_main_right {
     width: 35%;
     float: right;
   }

   .cp_main {
     width: 80%;
     height: 450px;
     margin: 0 auto;
     background-color: #f6f7f8;
     text-align: center;
   .cp_main_tips {
    padding-top: 100px;
     color: #666;
     font-size: 14px;
    width: 300px;
     margin: 0 auto;
   p {
     margin-top: 20px;
   }
   }
   }

   .create_btn {
     width: 150px;
     height: 40px;
     line-height: 40px;
     background-color: #FFAA33;
     color: #ffffff;
     font-size: 16px;
     font-weight: bold;
     text-align: center;
     cursor: pointer;
     border-radius: 3px;
   }
  }
</style>

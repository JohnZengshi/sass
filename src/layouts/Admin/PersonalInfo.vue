<template>
  <div class="user_info">
    <div class="uf_main_left">
      <div class="uf_main_left_code">
        <div class="uf_main_left_code_item"><span>姓名</span><input ref="inp2" v-focus="flag" v-if="operateType===2" v-model="userInfo.userName" class="editing" type="text" @blur="blurAndUplaod" /><span v-else @click="toEditing(2)">{{userInfo.userName}}</span></div>
        <div class="uf_main_left_code_item"><span>性别</span><span v-if="operateType===1"  v-model="userSexTrans"><input :checked="sexCheck===1" type="radio" class="sex-sel" name="sex" @click="manCheck()"/>男<input @click="womanCheck()" :checked="sexCheck===2" type="radio" class="sex-sel" name="sex"/>女</span> <!--<span v-if="operateType===1" v-model="userSexTrans"><span  class="sex-sel"  @click="sexBlur">男</span><span  @click="sexBlur" class="sex-sel">女</span></span> --><span v-else @click="toEditing(1)">{{userSexTrans}}</span></div>
        <div class="uf_main_left_code_item"><span>电话</span><span style="cursor: default">{{userInfo.phone}}</span></div>
        <div class="uf_main_left_code_item"><span>邮箱</span><input  ref="inp3" v-focus="flag" v-if="operateType===3" v-model="userInfo.email" class="editing" type="text" @blur="blurAndUplaod" /><span v-else @click="toEditing(3)">{{userInfo.email}}</span></div>
        <div class="uf_main_left_code_item"><span>所在地</span><PcaSelect v-if="operateType===4" :pList="pList" :cList="cList" :aList="aList" :seltP="seltP" :seltC="seltC" :seltA="seltA" @selectedP="selectedP" @selectedC="selectedC" @selectedA="selectedA"></PcaSelect><span v-else @click="toEditing(4)">{{userInfo.provinceName}}&nbsp;&nbsp;{{userInfo.cityName}}&nbsp;&nbsp;{{userInfo.areaName}}</span></div>
        <div class="uf_main_left_code_item"><span>详细地址</span><input ref="inp5" v-focus="flag" v-if="operateType===5" v-model="userInfo.address" class="editing" type="text" @blur="blurAndUplaod" /><span v-else @click="toEditing(5)">{{userInfo.address}}</span></div>
      </div>
    </div>
    <div class="uf_main_right">
      <SelectImagePreview useType="更换头像" @up="uploadHandler" :userInfo="userInfo" :companyInfo="companyInfo"></SelectImagePreview>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SelectImagePreview from './components/SelectImagePreview'
  import PcaSelect from './components/PcaSelect'
  import base from '../../config/base/index'
  import baseApi from '../../Api/Base/base'
  import {getAddress, updateUserInfo} from '../../Api/auth_v1'
  import {getSelfInfo} from '../../Api/user'

  export default {
    name: 'PersonalInfo',
    data () {
      return {
        operateType: null,
        sexCheck: 0,
        personalInfo: {},
        companyInfo: {logoSrc: 'static/img/userphone.png'},
        pList: [],
        cList: [],
        aList: [],
        seltP: '',
        seltC: '',
        seltA: '',
        seltPup: '',
        seltCup: '',
        seltAup: '',
        dropBox: null,
        flag: false,
        navNum: 0
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
        'userInfo'
      ]),
      userSexTrans () {
        return (this.userInfo.sex === 3 ? '未设置' : (this.userInfo.sex === 1 ? '男' : '女'))
      }
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
         this.operateType = null;
      },
      toEditing: function(type) {
        this.operateType = type;
        this.flag = true;
//        if (type == 2) {
//          console.log("input2" + this.$refs.inp2);
//          console.log(this.$refs.inp2.value);
//          this.$refs.inp2.autofocus = "autofocus";
//        } else if (type == 3) {
//          console.log("input3" + this.$refs.inp3);
//          this.$refs.inp3.focus();
//        } else if (type == 5) {
//          console.log("input5" + this.$refs.inp5);
//          this.$refs.inp5.focus();
//          this.$refs.inp5.value = 1111111111;
//        }
      },
      manCheck () {
          this.sexCheck = 1;
        let data = {
          operateType: this.operateType,
          objectData: this.sexCheck,
        }
        this.personalInfo.sex = 1;
          updateUserInfo(data).then((res) => {
            console.log(res.data)
            if (res.data.state === 200) {
              console.log('update user sex success')
              this.operateType = 0
              this.$store.dispatch('getUserInfo')
              console.log(1111)
            }
        }, 500)
      },
      womanCheck () {
        this.sexCheck = 2;
        let data = {
          operateType: this.operateType,
          objectData: this.sexCheck,
        }
        this.personalInfo.sex = 2;
          updateUserInfo(data).then((res) => {
            console.log(res.data)
            if (res.data.state === 200) {
              console.log('update user sex success')
              this.operateType = 0
              this.$store.dispatch('getUserInfo')
              console.log(2222)
            }
          });
      },
      blurAndUplaod (ev) {
        if (this.operateType === 3 && !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.userInfo.email)) && this.userInfo.email != "") {
            this.$message({
              message: '邮箱格式必须为XXX@XX.com/cn ...',
              type: 'warning'
            });
        } else {
                 let options = {
                  operateType: this.operateType,
                  objectData: ev.target.value
                }
                updateUserInfo(options).then((res) => {
                  console.log(res.data)
                  if (res.data.state === 200) {
                    console.log('update user info success')
                  }
                });
                this.operateType = 0
                }
      },
      updateUserArea () {
        let data = {
          "operateType": this.operateType,
          "objectData": this.seltPup + '-' + this.seltCup + '-' + this.seltAup
        }
        console.log(data)
        updateUserInfo(data).then((res) => {
            console.log(data.objectData);
          console.log(res.data)
          if (res.data.state === 200) {
            console.log('update area success')
            //self.$store.dispatch('getUserInfo');
          }
        });
        this.operateType = 0
        getAddress({type: '1'}).then((res) => {
          if (res.data.state === 200) {
            console.log(res.data);
            this.pList = res.data.data.dataList
          }
        })
        this.$store.dispatch('getUserInfo')
      },
      selectedP (name, id) {
        this.seltP = name
        this.seltPup = id
        this.cList = []
        this.aList = []
        this.seltC = ''
        this.seltA = ''
        getAddress({'type': '2', 'objectId': id}).then((res) => {
          if (res.data.state === 200) {
              console.log(res);
            this.cList = res.data.data.dataList
          }
        })
      },
      selectedC (name, id) {
        this.seltC = name
        this.seltCup = id
        this.seltA = ''
        getAddress({'type': '3', 'objectId': id}).then((res) => {
          if (res.data.state === 200) {
            this.aList = res.data.data.dataList
          }
        })
      },
      selectedA (name, id) {
        this.seltA = name
        this.seltAup = id
        this.updateUserArea()
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
            if (result.code === 0) {
              let data = {
                type: '1',
                objId: userId,
                url: result.data.source_url
              }
              //console.log(data)
              baseApi.apiCall(data, updateUploadFileURL).then((response) => {
                console.log(response.data)
                if (response.data.state === 200) {
                  console.log('updateUploadFileURL success response')
                  self.$store.dispatch('getUserInfo');
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
        } else {
          this.$store.dispatch('workPopupError', "文件格式必须为 *.jpg / *.png");
          location.reload();
          return
        }
      },

    },
    created () {
        this.operateType = null;
        let self = this;
        if (this.operateType == 4) {
            console.log(111111111);
          eventBus.$on('PscDropBox', function (val) {
            self.operateType = val;
            console.log(self.operateType);
            // console.log(this.showDropdownIndex)
          })
        }

    },
    mounted () {
        let option = {
          "userId": sessionStorage.getItem("id")
        }
        getSelfInfo(option).then((res) => {
          console.log(res.data);
        })
        console.log(this.$store);
        getAddress({type: '1'}).then((res) => {
        if (res.data.state === 200) {
            console.log(res.data);
          this.pList = res.data.data.dataList
        }
      })

      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="scss" scoped>
   .sex-sel{
     width:14px !important;
     height:14px !important;
     margin-right:5px;
   }
   .sex-sel:nth-child(2){margin-left:30px;}
   .user_info {
     width: 100%;
     clear: both;
     .uf_main_left {
       width: 65%;
       float: left;
       .uf_main_left_code {
         background-color: #f6f7f8;
         border-radius: 8px;
         width: 90%;
         height: 100%;
         margin-left: 10%;
         padding: 3% 0 3% 0;
         .uf_main_left_code_item {
           height: 50px;
           line-height: 50px;
           color: #999;
           font-size: 14px;
           span:first-child {
             width: 22%;
             height: 100%;
             display: inline-block;
             padding-left: 7%;
           }
           span:last-child {
             width: 78%;
             height: 100%;
             display: inline-block;
             cursor: pointer;
             padding-left: 5%;
             vertical-align: middle;
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
     .uf_main_right {
       width: 35%;
       float: right;
     }
   }
</style>

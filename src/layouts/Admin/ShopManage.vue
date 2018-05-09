<script src="../../../../../replace.js"></script>
<template>
  <div class="shop_manage">
    <div class="sm_main_left">
      <div class="sm_main_left_code">
        <div class="sm_main_left_code_item"><span>店铺名称</span><input v-focus="flag" autofocus="autofocus" @blur='blurAndUpload' type="text" v-if="operateType===1" v-model="shopInfo.shopName" /><span class="infoBar" v-else @click="toEditing(1)">{{shopInfo.shopName}}</span></div>
        <div class="sm_main_left_code_item"><span>店铺简称</span><input v-focus="flag" autofocus="autofocus" @blur='blurAndUpload' type="text" v-if="operateType===6" v-model="shopInfo.shortName" /><span class="infoBar" v-else @click="toEditing(6)">{{shopInfo.shortName}}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
        <div class="sm_main_left_code_item"><span>店长</span><span class="lastSpan">{{shopInfo.shopManger}}</span></div>
        <!--<div @click="initMap">1111test</div>-->
        <div class="map_main">
          <p>位置信息</p>
          <div class="map_wrap">
            <div class="map_left">
              <div class="map_code" id="mapCode"></div>
              <div class="map_bottom"><p @click="largeMap">查看完整地图</p></div>
            </div>
            <div class="map_right">
              <h3>淘金店</h3>
              <p>地址:<!--<span>广东省</span><span>深圳市</span><span>南山区</span>--><PcaSelect v-if="operateType===3" :pList="pList" :cList="cList" :aList="aList" :seltP="seltP" :seltC="seltC" :seltA="seltA" @selectedP="selectedP" @selectedC="selectedC" @selectedA="selectedA"></PcaSelect><span v-else @click="toEditing(3)">{{shopInfo.proName}}&nbsp; {{shopInfo.cityName}}&nbsp; {{shopInfo.areaName}}&nbsp;&nbsp;&nbsp;</span></p>
              <p class="detailedAddress"></span><input autofocus="autofocus" v-if="operateType===4" v-model="shopInfo.address" class="editing" type="text" @blur="blurAndUpload" /><span v-else @click="toEditing(4)">{{shopInfo.address?shopInfo.address:'--请添加信息--'}}</span></p>
              <p>电话:<input v-focus="flag" v-if="operateType===5" v-model="shopInfo.shopPhone" class="editing" type="text" @blur="blurAndUpload" /><span v-else @click="toEditing(5)">{{shopInfo.shopPhone}}&nbsp;&nbsp;&nbsp;</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm_main_right">
      <SelectImagePreview useType="更换Logo" @up="uploadHandler" :userInfo="userInfo" :companyInfo="companyInfo" :shopInfo="shopInfo"></SelectImagePreview>
    </div>
    <div class="Mask" v-show="mapShow"></div>
    <div id="largeMap" v-show="mapShow" >
      <div class="title"><span class="close" @click="largeMap">关闭</span></div>
      <div id="allmap"></div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import base from '../../config/base/index'
  import {updateShop} from './../../Api/commonality/operate' //upLoadFile, getSignUrl,
  import {seekShopInfo, seekGetShopListByCo} from './../../Api/commonality/seek'
  import {getAddress} from '../../Api/auth_v1'
  import SelectImagePreview from './components/SelectImagePreview1'
  import PcaSelect from './components/PcaSelect111'
  import baseApi from '../../Api/Base/base'
  export default {
    data () {
      return {
        companyInfo: {logoSrc: 'static/img/userphone.png'},
        baiduMapKey: 'vVMpsNemA7G724sKlO9PvsWH3vwFzIKO',
        adress: "",
        companyId: '',
        operateType: null,
        mapShow: false,
        shopInfo: {
          shopName: '',
          shopManger: '',
          shopPhone: '',
          logo: '',
          shopId: '',
          address: '',
          proName: '',
          cityName: '',
          areaName: '',
          shortName: ''
        },
        pList: [],
        cList: [],
        aList: [],
        seltP: '',
        seltC: '',
        seltA: '',
        seltPup: '',
        seltCup: '',
        seltAup: '',
        flag: false,
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
      ])
    },
    components: {
      SelectImagePreview, PcaSelect
    },
    methods: {
      getShopInfo () {
        if (this.shopInfo.shopId) {
          let option = {
            shopId: this.shopInfo.shopId
          }
          seekShopInfo(option).then((res) => {
            console.log(res)
            this.shopInfo.address = res.data.data.address;
            this.shopInfo.proName = res.data.data.provinceName;
            this.shopInfo.cityName = res.data.data.cityName;
            this.shopInfo.areaName = res.data.data.areaName;
            //console.log(this.shopInfo);
            this.initMap();
            //self.initMap();
          })
        }
      },
      largeMap () {
        this.mapShow = !this.mapShow;
      },
      toEditing (operateType) {
        this.operateType = operateType;
        this.flag = true;
        //console.log("11111");
      },
      updateShopArea () {
        var self = this
        //console.log(this.shopInfo.shopId);
        let data = {
          "operateType": this.operateType,
          "objectData": this.seltPup + '-' + this.seltCup + '-' + this.seltAup,
          "shopId": self.shopInfo.shopId
        }
        console.log(data)
        updateShop(data).then((res) => {
          //console.log(data.objectData);
          console.log(res.data)
          if (res.data.state == "1001015") {
            this.$store.dispatch('workPopupError', "权限不够，无法修改");
          }
          if (res.data.state === 200) {
            this.getShopInfo();
            //self.$store.dispatch('getUserInfo');
          }
        });
        console.log('update area success')
        this.operateType = 0
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
            //console.log(res);
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
        this.updateShopArea()
      },
      blurAndUpload (ev) {
        let self = this
        let data = {
          operateType: this.operateType,
          objectData: ev.target.value,
          shopId: self.shopInfo.shopId
        }
        console.log(data);
        updateShop(data).then((res) => {
          console.log(res.data)
          if (data.objectData == '' || data.objectData == null) {
            this.$store.dispatch('workPopupError', "此处信息不可为空！")
          }
          if (res.data.state == "1001015") {
            this.$store.dispatch('workPopupError', "权限不够，无法修改");
          }
          this.getShopInfo();
          //self.$store.dispatch('getCompInfo');
        })
        this.operateType = 0
      },
      gotoCreateCompany () {
        this.createCompanying = true
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
        let shopId = self.shopInfo.shopId
        let timestamp = new Date().getTime()
        let fileName = shopId + '-' + timestamp + '.' + extName
        let cos = new CosCloud({
          appid: appid,
          bucket: bucket,
          region: region,
          getAppSign: function (callback) {
            baseApi.apiCall({type: '1'}, getSignUrl).then((response) => {
              //console.log(response.data)
              let sign = response.data.data.signStr
              //console.log(sign);
              myFolder = response.data.data.url
              callback(sign)
            })
          }
        })
        if (extName == 'png' || extName == 'jpg') {
          let successCallBack = function (result) {
            console.log(result)
            if (result.code === 0) {
              let data = {
                type: '4',
                objId: self.shopInfo.shopId,
                url: result.data.source_url
              }
              console.log(data)
              baseApi.apiCall(data, updateUploadFileURL).then((response) => {
                //console.log(response.data)
                if (response.data.state === 200) {
                  console.log('updateUploadFileURL success response')
                  //self.$store.dispatch('getUserInfo');
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
          cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 0) //0表示允许覆盖文件 1表示不允许
        } else {
          this.$store.dispatch('workPopupError', "文件格式必须为 *.jpg / *.png");
          location.reload();
          return
        }
      },
      initMap () {
        this.adress = this.shopInfo.proName + this.shopInfo.cityName + this.shopInfo.areaName + this.shopInfo.address;
        //console.log(this.adress);
        let self = this
        //console.log(this.adress)
        function init () {
          let map = new BMap.Map("mapCode")
          let myGeo = new BMap.Geocoder()
          myGeo.getPoint(self.adress, (point) => {
            if (point) {
              map.centerAndZoom(point, 15)
              map.enableScrollWheelZoom()
              map.addOverlay(new BMap.Marker(point))
            }
          })
        }
        function init1() {
          let map1 = new BMap.Map("allmap");    // 创建Map实例
          let myGeo = new BMap.Geocoder()
          myGeo.getPoint(self.adress, (point) => {
            if (point) {
              map1.centerAndZoom(point, 15)
              map1.enableScrollWheelZoom()
              map1.addOverlay(new BMap.Marker(point))
            }
          })
          map1.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          map1.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
          map1.addControl(new BMap.NavigationControl());
          map1.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
          map1.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
        }
        init();
        init1();
      },
      getShopList () {
        let options = {
          "page": 1,
          "pageSize": 5
        }
        seekGetShopListByCo(options).then((res) => {
          console.log(res);
          if (res.status === 200) {
            //console.log(res.data.data.shopList[0]);
            this.shopInfo.shopName = res.data.data.shopList[0].shopName;
            this.shopInfo.shopManger = res.data.data.shopList[0].shopManager;
          }

        }, (res) => {
          console.log(res);
        })
      },
      routeAct () {
        //console.log(this.$route);
        this.operateType = null;
      }
    },
    created () {
      //console.log(this.shopInfo)
      let option = {
        shopId: sessionStorage.getItem('defaultShopId')
      }
      seekShopInfo(option).then((res) => {
        console.log(res)
        this.shopInfo.address = res.data.data.address;
        this.shopInfo.proName = res.data.data.provinceName;
        this.shopInfo.cityName = res.data.data.cityName;
        this.shopInfo.areaName = res.data.data.areaName;
        this.shopInfo.shopPhone = res.data.data.phone;
        this.shopInfo.logo = res.data.data.logo;
        this.initMap();
        console.log(this.shopInfo.logo);
      });
      this.getShopList();
    },
    watch: {
      '$route': 'routeAct',
      "shopInfo": function () {
        var that = this;
        eventBus.$on('firstList', function (val) {
          //console.log(val);
          that.shopInfo.shopName = val.shopName;
          that.shopInfo.shopManger = val.shopManager;
          that.shopInfo.logo = val.logo;
          that.shopInfo.shopId = val.shopId;
          //console.log(that.shopInfo);
        })
      }
    },
    mounted () {
      getAddress({type: '1'}).then((res) => {
        if (res.data.state === 200) {
          //console.log(res.data);
          this.pList = res.data.data.dataList
        }
      })
      this.companyId = sessionStorage.getItem('companyId');
//     this.initMap();
      var that = this;
      eventBus.$on('getShopList', function (val) {
        that.shopInfo.shopName = val.shopName;
        that.shopInfo.shopManger = val.shopManager;
        that.shopInfo.logo = val.logo;
        that.shopInfo.shopId = val.shopId;

        if (that.shopInfo.shopId) {
          let option = {
            shopId: that.shopInfo.shopId
          }
          seekShopInfo(option).then((res) => {
            console.log(res)
            that.shopInfo.address = res.data.data.address;
            that.shopInfo.proName = res.data.data.provinceName;
            that.shopInfo.cityName = res.data.data.cityName;
            that.shopInfo.areaName = res.data.data.areaName;
            that.shopInfo.shopPhone = res.data.data.phone;
            that.shopInfo.logo = res.data.data.logo;
            that.shopInfo.shortName = res.data.data.shortName;
            that.initMap();
          })
        }

      })
      console.log(this.shopInfo);
    }
  }
</script>

<style lang="scss" scoped>
  .Mask {
    width:100%; height:100%; background:rgba(0,0,0,0.3); position:fixed !important; left:50%; top:50%; transform: translate(-50%,-50%);
  }
  #largeMap {
    position: absolute !important; width:1000px; height:500px; left:50%; top:50%; transform: translate(-50%,-50%); background:#fff;
    border-radius:10px; overflow:hidden;
  .title {
    width:100%; height:50px; background:#fff;
  .close {
    float:right; margin-right:10px; cursor: pointer; line-height: 50px;
  }
  }
  }
  #allmap {
    width:100%; height:450px;
  }
  .shop_manage {
    width: 100%;
    height: 70%;
    clear: both;

  .sm_main_left {
    width: 65%;
    height: 97%;
    float: left;
    overflow: hidden;
  .sm_main_left_code {
    background-color: #f6f7f8;
    border-radius: 8px;
    width: 90%;
    height: 100%;
    min-height: 480px;
    margin-left: 10%;
    padding: 3% 0 3% 0;
    overflow-y: auto;
  scrollbar[orient="vertical"]{display:none!important;}
  ::-webkit-scrollbar {
    width: 0px;
  }

  .sm_main_left_code_item {
    height: 50px;
    line-height: 50px;
    color: #999;
    font-size: 14px;
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
    color: #999;
  }
  .infoBar{
    display: block;
    width:100px;
  }
  .lastSpan{
    cursor:default !important;
  }
  input{
    width: 70%;
    height: 36px;
    padding-left: 12px;
    font-size: 16px;
    border: 1px solid #4fdcca;
    border-radius: 3px;
    color: #4fdcca;
  }
  }
  .map_main {
    width: 100%;
    height: 55%;
    min-height: 300px;
    color: #999;
    padding: 10px;
    font-size: 14px;
    margin-top: 25px;
  &>p {
      width:22%; padding-left:5%;
    }
  .map_wrap {
    width: 100%;
    //height: 100%;
    height: 270px; 
    border: 1px solid #999;
    margin-top: 15px;
    position: relative;
  .map_left {
    position: absolute;
    width: 60%;
    height: 100%;
    left: 0;
    top: 0;
  .map_code {
    position: absolute;
    width: 100%;
    height: 88%;
    top: 0;
    left: 0;
  }
  .map_bottom {
    position: absolute;
    width: 100%;
    height: 12%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    text-align: center;
  p {
    margin-top: 5px;
    cursor: pointer;
    user-select: none;
  };
  }
  }
  .map_right {
    position: absolute;
    width: 40%;
    height: 100%;
    right: 0;
    top: 0;
    background-color: #fff;
    padding: 5px;
  h3{
    color: #4fdcca;
  }
  .detailedAddress{
    padding-left:32px;
  }
  p{ cursor: pointer;
    margin-top: 5%;
  input{width:80%; border:1px solid #ddd; border-radius:4px; }
  span{
    margin-left: 2%;
    color: #666;
    font-size:12px;
  }
  }
  }
  }
  }
  }
  }
  .sm_main_right {
    width: 35%;
    float: right;
  }
  .anchorBL {
    display: none;
  }
  }

</style>

<template>
  <div class="member-details-main" @click="closeAll">
    <h3 v-if="shopDataInfo.shopId">{{shopDataInfo.shopName}}详情</h3>
    <section class="member-body-wrap" v-if="shopDataInfo.shopId">
      <div class="member-body-inner">
        <div class="logo-wrap">
          <UploadingImg  @cosImg="cosImg" class="upload-img-wrap" v-if="isWarden" :type="4">
            <img :src="shopDataInfo.logo" alt="">
          </UploadingImg>
          <img v-else :src="shopDataInfo.logo" alt="">
          <p>{{shopDataInfo.shopName}}</p>
        </div>
        <ul class="tit-wrap">
          <li>
            <span>店铺名称</span>
            <input @click.stop="tip = true" maxlength="20" v-focus="isWarden && operateNum == 1" v-if="isWarden && operateNum == 1 || isShopMan && operateNum == 1" @blur="_updateShop(1, shopDataInfo.shopName)" type="text" v-model="shopDataInfo.shopName">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" @click.stop="operateNum = 1" v-else>{{shopDataInfo.shopName}}</span>
          </li>
          <li>
            <span>店铺简称</span>
            <input @click.stop="tip = true" maxlength="10" v-focus="isWarden && operateNum == 2" v-if="isWarden && operateNum == 2 || isShopMan && operateNum == 2" @blur="_updateShop(6, shopDataInfo.shortName)" type="text" v-model="shopDataInfo.shortName">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" @click.stop="operateNum = 2" v-else>{{shopDataInfo.shortName}}</span>
          </li>
          <li>
            <span>店长姓名</span>
            <span>{{shopDataInfo.linkman}}</span>
            <!-- <input v-if="true" type="text" value="等后台加">
            <span v-else></span> -->
          </li>
          <li>  
            <span>店长电话</span>
            <span>{{shopDataInfo.phone}}</span>
          </li>
          <li>
            <span>店铺人数</span>
            <span>{{shopDataInfo.shopCount}}</span>
          </li>
          <li class="select-w90-h20" @click.stop="switchFlag = true">
            <span>地址</span>
            <AddressSelect v-if="isWarden && operateNum == 3 || isShopMan && operateNum == 3" @addressReturn="SelectArea"></AddressSelect>
            <input @click.stop="tip = true" type="text" v-model="pcaValue" v-if="isWarden && operateNum == 3 || isShopMan && operateNum == 3">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" @click.stop="operateNum = 3" v-else-if="shopDataInfo.provinceName != '' || shopDataInfo.provinceName != null">{{shopDataInfo.provinceName == '' ? '': shopDataInfo.provinceName + '/'}}{{shopDataInfo.cityName== '' ? '':shopDataInfo.cityName + '/'}}{{shopDataInfo.areaName}}</span>  
          </li>
          <li>
            <span>详细地址</span>
            <input @click.stop="tip = true" v-focus="isWarden && operateNum == 4" v-if="isWarden && operateNum == 4 || isShopMan && operateNum == 4" @blur="_updateShop(4, shopDataInfo.address)" type="text" v-model="shopDataInfo.address">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" @click.stop="operateNum = 4" v-else>{{shopDataInfo.address}}</span>
          </li>
        </ul>
        
      </div>
    </section>
    <section class="shop-map-wrap" v-if="isShowMap">
      <div class="allmap" ref="shopMap"></div>
    </section>
  </div>
</template>
<script>
  import {operateUserSetting, updateShop} from 'Api/commonality/operate'
  import {seekGetAddress} from 'Api/commonality/seek'
  import {statusPosition} from 'Api/commonality/status'
  import UploadingImg from 'src/base/uploading/UploadingImg'
  import AddressSelect from 'src/components/template/AddressSelect'
  export default{
    props: ['shopDataInfo', 'userRoleDataList', 'isWarden', 'isCompile', 'isShopMan', 'initShopInfo'],
    components: {
      UploadingImg,
      AddressSelect
    },
    data () {
      return {
        tip: '',
        pcaValue: '',
        switchFlag: true,
        isRedact: true,
        roleName: '',
        operateNum: null,
        shengList: [],
        cityNameList : [],
        areaList: [],
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
      }
    },
    created () {
      this._seekGetAddress()
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
    computed: {
      isShowMap () {
        if (this.isCompile) {
          return true
        }
        if (this.shopDataInfo.address) {
          return true
        }
        return false
      }
    },
    watch: {
      'shopDataInfo' () {
        console.log(this.shopDataInfo)
        this._seekGetAddress()
        this.changeSheng.objectName = this.shopDataInfo.provinceName
        this.changeSheng.objectId = this.shopDataInfo.provinceId
        this.changCity.objectName = this.shopDataInfo.cityName
        this.changCity.objectId = this.shopDataInfo.cityId
        this.changeArea.objectName = this.shopDataInfo.areaName
        this.changeArea.objectId = this.shopDataInfo.areaId
        //this.pcaValue = this.shopDataInfo.provinceName + '/' + this.shopDataInfo.cityName + '/' + this.shopDataInfo.areaName
        this.initMap()
        // this.getCity(this.shopDataInfo.provinceId)
        // this.getArea(this.shopDataInfo.cityId)
      },
      'isCompile' (newVal) {
        // console.log(newVal)
        // console.log(this.isWarden)
        if (this.isCompile) {
          this._seekGetAddress()
          this.changeSheng.objectName = this.shopDataInfo.provinceName
          this.changeSheng.objectId = this.shopDataInfo.provinceId
          this.changCity.objectName = this.shopDataInfo.cityName
          this.changCity.objectId = this.shopDataInfo.cityId
          this.changeArea.objectName = this.shopDataInfo.areaName
          this.changeArea.objectId = this.shopDataInfo.areaId
          //this.pcaValue = this.shopDataInfo.provinceName + '/' + this.shopDataInfo.cityName + '/' + this.shopDataInfo.areaName
          this.initMap()
        }
        
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap()
      })
    },
    // created () {
    //   console.log('更新')
    // },
    methods: {
      isHover (el) {
        //console.log(el)
        if (this.isWarden) {
          el.target.className = "info-span hoveClass"
        }
      },
      isHoverOut (el) {
        //console.log(el)
        el.target.className = "info-span"
      },
      closeAll () {
        console.log(1111)
        setTimeout(() => {
          this.operateNum = null
        }, 300)
      },
      updateAddress (parm) {
        this.shopDataInfo.provinceName = parm.provName
        this.shopDataInfo.provinceId = parm.provId
        this.shopDataInfo.cityName = parm.cityName
        this.shopDataInfo.cityId = parm.cityId
        this.shopDataInfo.areaName = parm.areaName
        this.shopDataInfo.areaId = parm.areaId
      },
      _updateShop (operateType, objectData, isUpdate, parm) {
        if (objectData == '') {
          return
        }
        if ( operateType == 1 && this.initShopInfo.shopName == objectData) {
          console.log('来到了这里', operateType, this.initShopInfo.shopName, objectData)
          return
        }
        //debuggerdebugger
        let options = {
          operateType: operateType,
          objectData: objectData,
          shopId: this.shopDataInfo.shopId
        }
        console.log('-------------------店铺信息--------');
        console.log(options)
        updateShop(options)
          .then(res => {
            console.log(res);
            if (res.data.state == 200) {
              //this.$emit('updateInte')
              this.$emit("updateShopInfo");
              if (isUpdate) {
                this.updateAddress(parm);
              }
              if (operateType == 4) {
                //console.log(111)
                this.initMap()
              }
            } else {
              this.$store.dispatch('workPopupError', res.data.msg)
            }
          }, (res) => {
            this.$store.dispatch('workPopupError', res.data.msg)
          })
      },
      //获取省份
      _seekGetAddress () {
        let options = {
          objectId: '',
          type: '1'
        }
        seekGetAddress(options).then((res) => {
          this.shengList = res.data.data.dataList
        }, (res) => {
          console.log(res)
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
          console.log(res)
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
          console.log(res)
        })
      },

      SelectProvince (parm) {
        this.changeSheng.objectName = parm.objectName
        this.changeSheng.objectId = parm.objectId
        this.changCity.objectName = ''
        this.changCity.objectId = ''
        this.getCity( parm.objectId )
      },

      SelectCity (parm) {
        this.changCity.objectName = parm.objectName
        this.changCity.objectId = parm.objectId
        this.changeArea.objectName = ''
        this.changeArea.objectId = ''
        this.changeArea.objectName = ''
        this.changeArea.objectId = ''
        this.getArea( parm.objectId )
      },

      SelectArea (parm) {
        console.log(parm)
        // this.changeArea.objectName = parm.objectName
        // this.changeArea.objectId = parm.objectId
        this.operateNum = ''
        this.pcaValue = parm.provName + '/' + parm.cityName + '/' + parm.areaName
        this._updateShop(3, `${parm.provId}-${parm.cityId}-${parm.areaId}`, true, parm)
      },

      cosImg (parm) {
        let options = {
          operateType: 8,
          objectData: parm,
          shopId: this.shopDataInfo.shopId
        }
        updateShop(options)
          .then(res => {
            if (res.data.state === 200) {
              this.shopDataInfo.logo = parm
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      initMap () {
        let _self = this
        var map = new BMap.Map(_self.$refs.shopMap);
        var point = new BMap.Point(116.331398,39.897445);
        var geolocation = new BMap.Geolocation();
        map.centerAndZoom(point,12);
        map.enableScrollWheelZoom();
        var geoc = new BMap.Geocoder();    
        var myGeo = new BMap.Geocoder();
        if (_self.shopDataInfo.address) {
          // consolr.log(_self.shopDataInfo)
          myGeo.getPoint(_self.shopDataInfo.address, function(point){
            if (point) {
              map.centerAndZoom(point, 16);
              map.addOverlay(new BMap.Marker(point));
            }else{
              alert("您选择地址没有解析到结果!");
            }
          });
        }
        map.addEventListener("click", function(e){
          console.log(e)
          if (_self.isWarden) {   
            var pt = e.point;
            // console.log(11111)
            geoc.getLocation(pt, function(rs){
              var addComp = rs.addressComponents;
              _self.shopDataInfo.address = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
              _self.isMap = !_self.isMap
              _self._updateShop(4, _self.shopDataInfo.address, true)
              // console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            });
          }
        });
      },
      // setTimeRequest (parm) { // 设置查看时间
      //   let options = {
      //     userId: sessionStorage.getItem("id"),
      //     type: '2',
      //     timeRequest: parm
      //   }
      //   this._operateUserSetting(options)
      // },
      // setCostFlag () { // 设置成本
      //   let options = {
      //     userId: sessionStorage.getItem("id"),
      //     type: '1',
      //     costFlag: '0'
      //   }
      //   if (this.costFlag) {
      //     options.costFlag = '1'
      //   }
      //   this._operateUserSetting(options)
      // },
      // _operateUserSetting (options) { // 用户设置
      //   operateUserSetting(options)
      //     .then(res => {
      //       alert('设置成功')
      //     })
      // },
      addBtn () {
        this.$emit('addBtn')
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
.member-details-main{
  position: relative;
  h3{
    font-size: 16px;
    font-weight: normal;
    margin: 20px 0 40px 40px;
    color: $font-color-deep;
  }
  .title-icon-wrap{
    i{
      display: inline-block;
      height: 12px;
      margin: 0 10px 0 0;
      width: 12px;
      background-color: #ccc;
    }
    span{
      vertical-align: top;
      font-size: 12px;
      line-height: 12px;
      color: $main-color;
    }
  }
  .member-title{
    margin: 20px 0 0 70px;
  }
  .member-body-wrap{
    //overflow: auto;
    width: 100%;
    .member-body-inner{
      margin: 40px 0;
      font-size: 0;
      .logo-wrap, .tit-wrap{
        display: inline-block;
        vertical-align: top;
      }
      .logo-wrap{
        width: 120px;
        margin-left: 94px;
        height: 100%;
        .upload-img-wrap{
          width: 120px;
          height: 120px;
          overflow: hidden;
        }
        img{
          display: block;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          cursor: pointer;
          // overflow: hidden;
        }
        p{
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: $font-color-deep;
          margin-top: 20px;
          i{
            display: inline-block;
            width: 10px;
            height: 10px;
            background: red;
            margin-left: 5px;
          }
        }
      }
      .tit-wrap{
        margin: 2px 0 0 50px;
        li{
          font-size: 0;
          margin-bottom: 28px;
          position: relative;
          span, input{
            font-size: 14px;
            line-height: 14px;
            display: inline-block;
          }
          span:first-child{
            width: 70px;
            margin-right: 34px;
            text-align: right;
            color: $font-color-neutral;
          }
          input{
            width: 150px;
            height: 26px;
            font-size: 14px;
            background-color: #f4f9ff;
            padding-left: 10px;
            border: 1px solid #2993f8;
            border-radius: 4px;
            color: $font-color-deep;
          }
          .info-span {
            display: inline-block;
            min-width: 150px;
            height: 28px;
            line-height: 28px;
            border-radius: 4px;
            cursor: pointer;
            border: 1px solid transparent;
            color: $font-color-deep;
          }
          .info-span.hoveClass {
            background-color: #f4f9ff;
            padding-left: 10px;
            border: 1px solid #2993f8;
            
          }
          span:last-child{
            color: $font-color-deep;
          }
          .xj-radio-wrap{
            vertical-align: top;
            display: inline-block;
          }
        }
        li:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
  .del-staff{
    position: absolute;
    bottom: 30px;
    font-weight: 600;
    display: block;
    width: 100%;
    color: #ff3b30;
    font-size: 13px;
    text-align: center;
    cursor: pointer;
  }
  .shop-map-wrap{
    height: 160px;
    width: 380px;
    margin-left: 264px;
    border-radius: 5px;
    .allmap{
      border-radius: 5px;
      height: 160px;
      width: 380px;
    }
  }
}
</style>

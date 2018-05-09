<template>
  <div class="member-details-main" @click="operateNum = null">
<!--     <h3 v-if="companyInfo">{{companyInfo}}详情</h3> -->
<!--  -->
    <h3 v-if="companyInfo" style="width:640px;">{{companyInfo.companyName}}详情</h3>
    <section class="member-body-wrap" v-if="companyInfo">
      <div class="member-body-inner">
        <div class="logo-wrap">
          <UploadingImg @cosImg="cosImg" class="upload-img-wrap" v-if="isWarden" :type="4">
            <img :src="companyInfo.logo" alt="">
          </UploadingImg>
          <img v-else :src="companyInfo.logo" alt="">
          <p>{{companyInfo.shopName}}</p>
        </div>
        <ul class="tit-wrap">
          <li>
            <span>公司名称</span>
            <input v-focus="isWarden && operateNum == 1" maxlength="20" v-if="isWarden && operateNum == 1" @blur="_operateUpdateCompany(1, companyInfo.companyName)" type="text" v-model="companyInfo.companyName">
            <!--  -->
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" v-else @click.stop="operateNum = 1">{{companyInfo.companyName}}</span>
          </li>
          <li>
            <span>公司简称</span>
            <input @click.stop="tip = true" maxlength="10" v-focus="isWarden && operateNum == 2" v-if="isWarden && operateNum == 2" @blur="_operateUpdateCompany(8, companyInfo.shortName)" type="text" v-model="companyInfo.shortName">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" v-else @click.stop="operateNum = 2">{{companyInfo.shortName}}</span>
          </li>
          <li>
            <span>联系人</span>
            <input @click.stop="tip = true" v-focus="isWarden && operateNum == 3" v-if="isWarden && operateNum == 3" @blur="_operateUpdateCompany(3, companyInfo.principalName)" type="text" v-model="companyInfo.principalName">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" v-else @click.stop="operateNum = 3">{{companyInfo.principalName}}</span>
          </li>
          <li>
            <span>店铺数量</span>
            <span class="info-span">{{companyInfo.shopNum}}</span>
          </li>
          <li>  
            <span>人数</span>
            <span class="info-span">{{companyInfo.employeeCount}}</span>
          </li>
          <li>
            <span>联系电话</span>
            <input @click.stop="tip = true" v-focus="isWarden && operateNum == 4" v-if="isWarden && operateNum == 4" @blur="_operateUpdateCompany(4, companyInfo.principalPhone)" type="text" v-model="companyInfo.principalPhone">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" v-else @click.stop="operateNum = 4">{{companyInfo.principalPhone}}</span>
          </li>
          <li @click.stop="switchFlag = true">
            <span>地址</span>
            <!-- <template v-if="isWarden && operateNum == 5">
              <div v-if="shengList.length > 0 " class="xj-select-wrap" style="display: inline-block; vertical-align: top; margin-left: 20px;">
                <el-select filterable ref="handleValue" v-model="changeSheng.objectName" placeholder="请选择">
                  <el-option     
                    v-for="item in shengList"
                    :label="item.objectName"
                    @click.stop.native = "SelectProvince(item)"
                    :value="item.objectName">
                  </el-option>
                </el-select>  
              </div>
              <div class="xj-select-wrap" style="display: inline-block; vertical-align: top;">
                <el-select filterable ref="handleValue" v-model="changCity.objectName" placeholder="请选择">
                  <el-option     
                    v-for="item in cityNameList"
                    :label="item.objectName"
                    @click.stop.native = "SelectCity(item)"
                    :value="item.objectName">
                  </el-option>
                </el-select>  
              </div>
              <div class="xj-select-wrap" style="display: inline-block; vertical-align: top;">
                <el-select filterable ref="handleValue" v-model="changeArea.objectName" placeholder="请选择">
                  <el-option     
                    v-for="item in areaList"
                    :label="item.objectName"
                    @click.stop.native = "SelectArea(item)"
                    :value="item.objectName">
                  </el-option>
                </el-select>  
              </div> 
            </template> -->
            <AddressSelect v-if="isWarden && operateNum == 5" @addressReturn="SelectArea"></AddressSelect>
            <input @click.stop="tip = true" type="text" v-model="pcaValue" v-if="isWarden && operateNum == 5">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" v-else @click.stop="operateNum = 5">{{companyInfo.provinceName}}{{companyInfo.cityName}}{{companyInfo.areaName}}</span>
          </li>
          <li>
            <span>详细地址</span>
            <input @click.stop="tip = true" v-focus="isWarden && operateNum == 6" v-if="isWarden && operateNum == 6" @blur="_operateUpdateCompany(6, companyInfo.address)" type="text" v-model="companyInfo.address">
            <span @mouseover="isHover($event)" @mouseout="isHoverOut($event)" class="info-span" v-else @click.stop="operateNum = 6">{{companyInfo.address}}</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="shop-map-wrap" v-show="isShowMap">
      <div id="allmap"  class="allmap" ref="companyMap"></div>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {operateUserSetting, updateShop, operateUpdateCompany} from 'Api/commonality/operate'
  import {seekGetAddress} from 'Api/commonality/seek'
  import {statusPosition} from 'Api/commonality/status'
  import UploadingImg from 'src/base/uploading/UploadingImg'
  import AddressSelect from 'src/components/template/AddressSelect'
  export default{
    props: ['isWarden', 'isCompile'], // 公司信息
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
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
    watch: {
      // 'isCompile' : function () {
      //   //console.log(this.companyInfo)
      //   if (newVal == true){
      //     this.changeSheng.objectName = this.companyInfo.provinceName
      //     this.changeSheng.objectId = this.companyInfo.provinceId
      //     this.changCity.objectName = this.companyInfo.cityName
      //     this.changCity.objectId = this.companyInfo.cityId
      //     this.changeArea.objectName = this.companyInfo.areaName
      //     this.changeArea.objectId = this.companyInfo.areaId
      //   } 
      // },
      'companyInfo' () {
          this.changeSheng.objectName = this.companyInfo.provinceName
          this.changeSheng.objectId = this.companyInfo.provinceId
          this.changCity.objectName = this.companyInfo.cityName
          this.changCity.objectId = this.companyInfo.cityId
          this.changeArea.objectName = this.companyInfo.areaName
          this.changeArea.objectId = this.companyInfo.areaId
        // this.initMap()
        // this._seekGetAddress()
      }
      // 'isCompile' () {
      //   this.initMap()
      //   if (this.isCompile) {
      //     this._seekGetAddress()
      //   }
      // }
    },
    computed: {
      ...mapGetters([
        'companyInfo'
      ]),
      isShowMap () {
        if (this.isCompile) {
          return true
        }
        if (this.companyInfo.address) {
          return true
        }
        return false
      }
    },
    created () {
      this.initMap();//后面加的，，看地图执行情况再更改
      this._seekGetAddress();
      console.log('更新')
      this.initCompanyData();
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap();
      })
    },
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
      updateAddress (parm) {
        this.companyInfo.provinceName = parm.provName
        this.companyInfo.provinceId = parm.provId
        this.companyInfo.cityName = parm.cityName
        this.companyInfo.cityId = parm.cityId
        this.companyInfo.areaName = parm.areaName
        this.companyInfo.areaId = parm.areaId
      },
      _operateUpdateCompany (operateType, objectData, isUpdate, parm) {
        let options = {
          operateType: operateType,
          objectData: objectData
        }
        operateUpdateCompany(options)
          .then(res => {
            this.$emit("updataCompanyInfo")
            if (isUpdate) {
              this.updateAddress(parm)
            }
            if (operateType == 6) {
                //console.log(111)
                this.initMap()
            }
          })
      },

      initCompanyData () {
        if (this.companyInfo) {
          this.changeSheng.objectName = this.companyInfo.provinceName
          this.changeSheng.objectId = this.companyInfo.provinceId
          this.changCity.objectName = this.companyInfo.cityName
          this.changCity.objectId = this.companyInfo.cityId
          this.changeArea.objectName = this.companyInfo.areaName
          this.changeArea.objectId = this.companyInfo.areaId
        }
      },
      // _updateShop (operateType, objectData) {
      //   let options = {
      //     operateType: operateType,
      //     objectData: objectData
      //     // shopId: this.companyInfo.shopId
      //   }
      //   updateShop(options)
      //     .then(res => {
      //       // if (isUpdate) {
      //       //   this.updateAddress()
      //       // }
      //     })
      // },

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
        this.operateNum = ''
        this.pcaValue = parm.provName + '/' + parm.cityName + '/' + parm.areaName
        this._operateUpdateCompany(5, `${parm.provId}-${parm.cityId}-${parm.areaId}`, true, parm)
        // this.changeArea.objectName = parm.objectName
        // this.changeArea.objectId = parm.objectId
        // this._operateUpdateCompany(5, `${this.changeSheng.objectId}-${this.changCity.objectId}-${this.changeArea.objectId}`, true)
      },

      cosImg (parm) {
        let options = {
          operateType: 2,
          objectData: parm
          // shopId: this.companyInfo.shopId
        }
        operateUpdateCompany(options)
          .then(res => {
            if (res.data.state === 200) {
              this.companyInfo.logo = parm
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      initMap () {
        // alert('5555')
        let _self = this
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(113.959302,22.547446);
        var geolocation = new BMap.Geolocation();
        map.centerAndZoom(point,12);
        map.enableScrollWheelZoom();
        var geoc = new BMap.Geocoder();    
        var myGeo = new BMap.Geocoder();
        if (_self.companyInfo) {
          // console.log(_self.companyInfo )
          if (_self.companyInfo.address) {
            // console.log(_self.companyInfo.address)
            myGeo.getPoint(_self.companyInfo.address, function(point){
              if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
              }else{
                alert("您选择地址没有解析到结果!");
              }
            });
          } else {
            console.log('----------------');
            console.log(point);
            myGeo.getPoint('深圳市南山区', function(point){
              if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
              }else{
                alert("您选择地址没有解析到结果!");
              }
            });
          }
        }
        map.addEventListener("click", function(e){
          if (_self.isWarden) {
            console.log(e)   
            var pt = e.point;
            geoc.getLocation(pt, function(rs){
              var addComp = rs.addressComponents;
              _self.companyInfo.address = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
              _self.isMap = !_self.isMap
                _self._operateUpdateCompany(6, _self.companyInfo.address)
              console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
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
    margin: 20px 0 40px 40px;
    color: $font-color-deep;
    font-weight: normal;
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
          position: relative;
          font-size: 0;
          margin-bottom: 28px;
          height: 28px;
          // span {
          //   float: left;
          //   margin-top: 5px;
          // }
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
            display: block;
            height: 28px;
            line-height: 28px;
            float: left;
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
          span:last-child{
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

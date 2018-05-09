<template>
  <section class="header-wrap">
    <div class="header-left">
      <UploadingImg v-if="isWarden" :type="2" @cosImg="cosImg">
        <img :src="companyInfo ? companyInfo.logo : ''" alt="">
      </UploadingImg>
      <img v-else :src="companyInfo ? companyInfo.logo : ''" alt="">
    </div>
    <div class="header-right" v-if="companyInfo">
      <h3>{{companyInfo.companyName}}</h3>
      <ul>
        <li>
          <span class="header-left-inner">简称</span>
          <i class="icon-i"></i>
          <input v-if="isOperate" @blur="_operateUpdateCompany(8, companyInfo.shortName)" class="header-right-input" v-model="companyInfo.shortName" type="text">
          <span v-else class="header-right-inner">{{companyInfo.shortName}}</span>
        </li>
        <li>
          <span class="header-left-inner">联系人</span>
          <i class="icon-i"></i>
          <input v-if="isOperate" @blur="_operateUpdateCompany(3, companyInfo.principalName)" class="header-right-input" type="text" v-model="companyInfo.principalName">
          <span v-else class="header-right-inner">{{companyInfo.principalName}}</span>
        </li>
        <li>
          <span class="header-left-inner">店铺数量</span>
          <i class="icon-i"></i>
          <span class="header-right-inner">{{shopDataList.length}}</span>
        </li>
        <li class="detail-data" @click="isMap = !isMap">
          <span class="header-left-inner">详细地址</span>
          <i class="location-icon"></i>
          <span v-if="companyInfo" class="header-right-inner">{{companyInfo.address}}</span>
        </li>
      </ul>
      <ul style="margin-top: 17px;">
        <li>
          <span class="header-left-inner">人数</span>
          <i class="icon-i"></i>
          <span class="header-right-inner">{{companyInfo.employeeCount}}</span>
        </li>
        <li>
          <span class="header-left-inner">联系电话</span>
          <i class="icon-i"></i>
          <input v-if="isOperate" v-model="companyInfo.principalPhone" @blur="_operateUpdateCompany(4, companyInfo.principalPhone)" class="header-right-input" type="text">
          <span v-else class="header-right-inner">{{companyInfo.principalPhone}}</span>
        </li>
        <li class="address-wrap select-w90-h20">
          <span class="header-left-inner">地址</span>
          <template v-if="isOperate">
            <div v-if="shengList.length > 0 " class="xj-select-wrap" style="display: inline-block; vertical-align: top; margin-left: 20px;">
              <el-select filterable ref="handleValue" v-model="changeSheng.objectName" placeholder="请选择">
                <el-option     
                  v-for="(item,index) in shengList" :key="index"
                  :label="item.objectName"
                  @click.native = "SelectProvince(item)"
                  :value="item.objectName">
                </el-option>
              </el-select>  
            </div>
            <div class="xj-select-wrap" style="display: inline-block; vertical-align: top;">
              <el-select filterable ref="handleValue" v-model="changCity.objectName" placeholder="请选择">
                <el-option     
                  v-for="(item,index) in cityNameList" :key="index"
                  :label="item.objectName"
                  @click.native = "SelectCity(item)"
                  :value="item.objectName">
                </el-option>
              </el-select>  
            </div>
            <div class="xj-select-wrap" style="display: inline-block; vertical-align: top;">
              <el-select filterable ref="handleValue" v-model="changeArea.objectName" placeholder="请选择">
                <el-option     
                  v-for="(item,index) in areaList" :key="index"
                  :label="item.objectName"
                  @click.native = "SelectArea(item)"
                  :value="item.objectName">
                </el-option>
              </el-select>  
            </div>    
          </template>
          <span v-else class="header-right-inner" style="margin-left: 20px;">{{companyInfo.provinceName}}{{companyInfo.cityName}}{{companyInfo.areaName}}</span>
        </li>
      </ul>
    </div>
    <div class="map-wrap" v-if="isMap">
      <div id="allmap" ref="companyMap"></div>        
    </div>
    <div class="map-bg" v-show="isMap" @click="isMap = !isMap"></div>
    <i class="option-icon" @click="companyEdit = !companyEdit"></i>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {operateUpdateCompany} from 'Api/commonality/operate'
  import {seekGetAddress} from 'Api/commonality/seek'
  import UploadingImg from 'src/base/uploading/UploadingImg'
  export default{
    props: ['shopDataList', 'isWarden'],
    components: {
      UploadingImg
    },
    data () {
      return {
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
        shengList: [],
        cityNameList : [],
        areaList: [],
        isMap: false,
        cityName : '',
        provinceName : '',
        companyEdit: false // 公司信息编辑
      }
    },
    created () {
      this._seekGetAddress()
    },
    computed: {
      ...mapGetters([
          'companyInfo'
        ]),
      isOperate () {
        if (this.isWarden && this.companyEdit) {
          return true
        }
        return false
      }
    },
    watch: {
      'companyInfo' () {
        // this.initMap()
        this._seekGetAddress()
        this.getCity(this.companyInfo.provinceId)
        this.getArea(this.companyInfo.cityId)
      },
      'companyEdit' () {
        this.changeSheng.objectName = this.companyInfo.provinceName
        this.changeSheng.objectId = this.companyInfo.provinceId
        this.changCity.objectName = this.companyInfo.cityName
        this.changCity.objectId = this.companyInfo.cityId
        this.changeArea.objectName = this.companyInfo.areaName
        this.changeArea.objectId = this.companyInfo.areaId
      },
      'isMap' () {
        let _self = this
        if (_self.isMap) {
          setTimeout(function () {
            _self.initMap()
          }, 0)
        }
      }
    },
    // mounted () {
    //   let _self = this
    //   this.$nextTick(function () {
    //     _self.initMap()
    //   })
    // },
    methods: {
      updateAddress () {
        this.companyInfo.provinceName = this.changeSheng.objectName
        this.companyInfo.provinceId = this.changeSheng.objectId
        this.companyInfo.cityName = this.changCity.objectName
        this.companyInfo.cityId = this.changCity.objectId
        this.companyInfo.areaName = this.changeArea.objectName
        this.companyInfo.areaId = this.changeArea.objectId
      },
    	cosImg (parm) {
        this.companyInfo.logo = parm
        this._operateUpdateCompany(2, parm)
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
        this.changeArea.objectName = parm.objectName
        this.changeArea.objectId = parm.objectId
        this._operateUpdateCompany(5, `${this.changeSheng.objectId}-${this.changCity.objectId}-${this.changeArea.objectId}`, true)
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

      initMap () {
        let _self = this
        var map = new BMap.Map(_self.$refs.companyMap);
        var point = new BMap.Point(116.331398,39.897445);
        var geolocation = new BMap.Geolocation();
        map.centerAndZoom(point,12);
        map.enableScrollWheelZoom();
        var geoc = new BMap.Geocoder();    
        var myGeo = new BMap.Geocoder();
        if (_self.companyInfo) {
          if (_self.companyInfo.address) {
            myGeo.getPoint(_self.companyInfo.address, function(point){
              if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
              }else{
                alert("您选择地址没有解析到结果!");
              }
            });
          } else {
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
          console.log(e)   
          var pt = e.point;
          geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            _self.companyInfo.address = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
            _self.isMap = !_self.isMap
            _self._operateUpdateCompany(6, _self.companyInfo.address)
            console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          });        
        });
      },
      
      updateMap () {
        if (_self.companyInfo) {
          if (_self.companyInfo.address) {
          console.log('公司信息', _self.companyInfo.address)
            // alert('进来了')
            myGeo.getPoint(_self.companyInfo.address, function(point){
              if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
              }else{
                alert("您选择地址没有解析到结果!");
              }
            });
          }
        }
      },

      _operateUpdateCompany (operateType, objectData, isUpdate) {
        let options = {
          operateType: operateType,
          objectData: objectData
        }
        operateUpdateCompany(options)
          .then(res => {
            if (isUpdate) {
              this.updateAddress()
            }
          })
      }
    }
  }
</script>
<style lang="scss">
@import "~assets/css/color.scss";
.header-wrap{
  position: relative;
  height: 150px;
  background-color: #fff;
  font-size: 0;
  box-shadow: $BS-1;
  border-radius: 5px;
  .map-wrap{
    position: absolute;
    top: 120px;
    right: 50px;
    height: 300px;
    width: 400px;
    z-index: 600;
    background-color: #fff;
    box-shadow: $BS-1;
    border-radius: 5px;
    #allmap{
      height: 100%;
      width: 400px;
      border-radius: 5px;
    }
  }
  .map-bg{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.05;
  }
  .option-icon{
    position: absolute;
    right: 20px;
    top: 20px;
    height: 14px;
    width: 14px;
    cursor: pointer;
    background: url('./../../assets/img/option-icon.png') no-repeat;
    background-size: 14px;
  }
  .header-left, .header-right{
    display: inline-block;
  }
  .header-left{
    position: relative;
    width: 160px;
    height: 100%;
    img{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .header-right{
    height: 100%;
    width: 1050px;
    vertical-align: top;
    h3{
      font-size: 16px;
      color: $main-color;
      margin: 26px 0 17px 0;
    }
    ul{
      .detail-data{
        width: auto;
        .header-right-inner{
          margin-left: 20px;
        }
        .header-right-input{
          margin-right: 10px;
        }
      }
      font-size: 0;
      li{
        display: inline-block;
        width: 200px;
        height: 20px;
        font-size: 14px;
        margin-right: 20px;
        span, i{
          font-size: 14px;
          line-height: 20px;
          vertical-align: top;
        }
        .header-left-inner{
          color: $font-color-neutral;
        }
        .xj-select-wrap{
          // border: 1px solid red;
        }
        .header-right-inner{
          float: right;
          margin-right: 20px;
          color: $font-color-deep;
        }
        .header-right-input{
          float: right;
          width: 100px;
          text-align: right;
          margin: 0 20px;
          font-size: 14px;
          background-color: #f2f3f4;
          border-radius: 2px;
          color: $font-color-deep;
        }
        .icon-i{
          display: inline-block;
          float: right;
          margin-top: 5px;
          height: 10px;
          width: 2px;
          border-right: 1px solid #d6d6d6;
        }
        .location-icon{
          vertical-align: top;
          margin-top: -2px;
          width: 17px!important;
          height: 20px;
          background: url('./../../assets/img/location-icon.png') no-repeat;
          background-size: 17px 20px;
          border: none;
        }
      }
      .address-wrap{
        width: auto;
      }
    }
  }
}
</style>
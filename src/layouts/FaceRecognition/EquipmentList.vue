<template>
  <div class="visit-list-main">
    <div class="top-tit">

      <div class="tit-left">
        <i class="iconfont icon-genjin"></i>
        <span>设备管理</span>
      </div>

      <div class="tit-right">
        <DownMenu
          :titleInfo="currentShop.shopName ? currentShop.shopName : '无店铺'"
          :showList="shopListByCo"
          @changeData="changeShopData"
          @clearInfo="clearShopData"
        ></DownMenu>
      </div>

    </div>
    <div class="claerfix"></div>
    <div class="content">
      <div class="top">
        <i class="iconfont icon-liebiao"></i>
        <span>设备管理</span>
 <!--        <span class="num-tit">(总数：<span>{{totalNum}}</span>)</span> -->
      </div>
      <EquipmentTable :showData="visitData"></EquipmentTable>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {seekListDevice} from 'Api/commonality/seek'
import DownMenu from 'base/menu/DownMenu'
import EquipmentTable from './base/EquipmentTable'
var moment = require('moment');
export default{
  components: {
    DownMenu,
    EquipmentTable
  },
  data () {
    return {
      beginTime: this.getDate(-((new Date()).getDate()-1),'start').format,
      adminStartTime: '',
      currentShop: {}, // 当前店铺
      visitData: {

      }
    }
  },
  computed: {
    ...mapGetters([
      "shopListByCo" // 店铺列表
    ])
  },
  watch: {
    'shopListByCo' () {
        this.changeShopData(this.shopListByCo[0])
    }
  },
  mounted () {
    if (this.shopListByCo[0]) {
      this.changeShopData(this.shopListByCo[0])
    }
  },
  methods: {
    changeShopData (item) {
      this.currentShop = item
      this._seekList()
    },
    clearShopData () {
      this.currentShop = {}
      this._seekList()
    },
    _seekList () {
      let options = {
        shopId: this.currentShop.shopId
      }
      seekListDevice(options)
        .then(res => {
          if (res.data.state == 200) {
              this.visitData = res.data.data
          } else {
              this.$message({
                  message: res.data.msg,
                  type: 'warning'
              })
          }
        })
      // let datas = {
      //   dataList: [
      //     {
      //         location: '设备位置',
      //         equipmentName: '设备名称',
      //         code: '编码',
      //         shopName: '店名',
      //         installTime: '安装时间',
      //         status: '1'
      //     },
      //     {
      //         location: '设备位置',
      //         equipmentName: '设备名称',
      //         code: '编码',
      //         shopName: '店名',
      //         installTime: '安装时间',
      //         status: '1'
      //     }
      //   ],
      //   totalNum: 10
      // }
      // this.visitData = datas
      // console.log('用户来访列表请求参数', options)
    },
    timeFormat (parm) {
        let year = parm.substring(0, 4)
        let month = parm.substring(5, 7)
        let data = parm.substring(8, 10)
        return year + month + data + '000000'
    },
    dateChange (val) {
      this.adminStartTime = this.timeFormat(val)
      this._seekList()
    },
    getDate( day, type  ){
        let _date = new Date()
        _date.setDate( _date.getDate() + day )
        //年
        let Year = _date.getFullYear()
        //月
        let month = this.formatDate(_date.getMonth()+1)
        //天
        let Day = this.formatDate(_date.getDate())
        //时
        let hours = this.formatDate(_date.getHours())
        //分
        let mins = this.formatDate(_date.getMinutes())
        //秒
        let seconds = this.formatDate(_date.getSeconds())

        let timestamp = Year + month +  Day

        let currentData = new Date()

        if( type == 'end' ){
            if( Year < currentData.getFullYear() ||
              month < currentData.getMonth()+1 ||
              Day < currentData.getDate()
            ){
              hours = '23'
              mins = seconds = '59'
            }
        }else if( type == 'start'){
          hours = mins = seconds = '00'
        }

        return {
            format : Year + '-' + month + '-' + Day ,
            timestamp : timestamp,
            fullData : timestamp + hours + mins + seconds
        }
    },
    formatDate( d ){
       return d < 10 ? ('0' + d ) : d + ''
    }
  }
}
</script>
<style scoped lang="scss">
.visit-list-main{
  padding-top: 30px;
  // padding-left: 220px;
  .top-tit{
    position: relative;
    .tit-left{
      position: absolute;
      left: 0;
      i{
        color: #2993f8;
        font-size: 20px;
        margin-right: 12px;
      }
      span{
        &:nth-of-type(1),&:nth-of-type(2){
          font-weight: bold;
          margin-right: 12px;
          // margin-left: 12px;
          color: #2993f8;
        }
      }
    }
    .tit-right{
      position: absolute;
      right: 0;
      .dropDown-wrap{
        margin-right: 30px;
      }
      .tolast{
        font-weight: bold;
        display: inline-block;
        background-color: #2993f8;
        color: #fff;
        line-height: 30px;
        width: 90px;
        text-align: center;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
  .claerfix{
    height: 30px;
  }
  .content{
    box-shadow: 0px 0px 18px #ddd;
    padding-left: 0;
    margin-top: 20px;
    height: 740px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .right-Mast{
      position: absolute;
      right: -66px;
      bottom: 0;
      border: 1px solid #eee;
    }
    .top{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding-left: 18px;
      color: #000;
      background-color: #fff;
      line-height: 50px;
      overflow: hidden;
      .icon-liebiao{
        margin-right: 14px;
        color: #2993f8;
      }
    }
    .num-tit{
      color: #999;
      margin-left: 6px;
      font-size: 14px;
      >span{
        color: red;
      }
    }
  }
}
</style>

<template>
  <div class="m-m-home-page-header-main">
    <div class="home-page-header-inner">
      <h2>
        <i class="iconfont icon-huiyuan"></i><span>会员</span>
      </h2>
      <div class="fr right-box">

<!--         <div class="xj-time-box">
          <div class="time-inner">
            <div class="block until">
                <el-date-picker size="mini" v-model="filterData.startTime"  type="date" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
            </div>
            <span class="center-tit">至</span>
            <div class="block">
                <el-date-picker size="mini" v-model="filterData.endTime" type="date" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
            </div>
          </div>
        </div> -->
        <xj-time
          :isMonth="true"
          @change="changeTime"
        ></xj-time>  

        <down-menu
          class="down-menu-box ml-10"
          :isSolid="true"
          :titleInfo="filterData.shopName ? filterData.shopName : '店铺名称'"
          :showList="shopList"
          :nameKey="'shopName'"
          @changeData="changeShop"
          @clearInfo="clearShop"
        ></down-menu>
        
      </div>
      
    </div>
  </div>
</template>
<script>
  import navSegmentation from 'base/cut/nav-segmentation'
  import downMenu from 'base/menu/new-down-menu'
  import xjTime from 'base/time/xj-time'
  import {seekGetShopListByCo} from 'Api/commonality/seek'
  import {getMonthStart} from 'assets/js/getTime'
  export default {
    components: {
      navSegmentation,
      downMenu,
      xjTime
    },
    data () {
      return {
        filterData: {
          current: "1",
          startTime: '',
          endTime: '',
          shopName: '',
          shopId: ''
        },
        navData: [
          {
            name: '会员',
            id: '1'
          },
          {
            name: '积分',
            id: '2'
          },
          {
            name: '跟进',
            id: '3'
          },
          {
            name: '推送',
            id: '4'
          }
        ],
        shopList: [] 
      }
    },
    methods: {
      changeTime (parm) {
        Object.assign(this.filterData, parm)
        this._seekGetShopListByCo()
      },
      pitchOn (parm) {
        this.current = parm.id
      },
      changeShop (parm) {
        Object.assign(this.filterData, parm)
        this.$emit("filterData", this.filterData)
      },
      clearShop (parm) {
        this.filterData.shopName = ''
        this.filterData.shopId = ''
        this.$emit("filterData", this.filterData)
      },
      _seekGetShopListByCo() { // 店铺列表
        let options = {
          page: 1,
          pageSize: 0,
          type: 1,
        };
        seekGetShopListByCo(options).then((res) => {
          if(res.data.state == 200) {
            this.shopList = res.data.data.shopList
            this.changeShop(this.shopList[0])
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        });
      },
    }
  }
</script>
<style lang="scss">
.m-m-home-page-header-main{
  height: 50px;
  background-color: #fff;
  padding: 0 30px 0 24px;
  .home-page-header-inner{
    border-bottom: 1px solid #e9e9e9;
    min-height: 30px;
    height: 50px;
    padding-top: 10px;
    >h2{
      height: 30px;
      line-height: 30px;
      color: #333;
      float: left;
      span{
        font-size: 16px;
        vertical-align: top;
        line-height: 27px;
      }
      i{
        font-size: 25px;
        margin-right: 10px;
        color: #2993f8;
      }
    }
    .right-box{
      font-size: 0;
    }
    .down-menu-box{
      display: inline-block;
    }
  }
}
</style>
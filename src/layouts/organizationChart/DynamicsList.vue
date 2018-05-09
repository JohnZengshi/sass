<template>
  <div class="dynamics-list-main">
    <h4 class="title-icon-wrap">
      <i></i>
      <span>动态</span>
    </h4>
    <ul class="list-scroll">
      <div>
        <template v-for="(item, index) in showList">
          <li v-if="item.type === '001'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
            </p>
          </li>
          <li v-if="item.type === '002'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
            </p>
          </li>
          <li v-if="item.type === '003'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
            </p>
          </li>
          <li v-if="item.type === '004'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
            </p>
          </li>
          <li v-if="item.type === '005'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
            </p>
          </li>
          <li v-if="item.type === '006'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>为{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer;margin-left:4px;" class="main-color">{{item.orderNo}}</span>
              <span style="margin-left:20px;">添加了商品</span>
            </p>
          </li>
          <li v-if="item.type === '007'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
            </p>
          </li>
          <li v-if="item.type === '008'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>为{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
              <span>添加了备注</span>
            </p>
          </li>
          <li v-if="item.type === '009'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>提交了{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
              <span></span>
            </p>
          </li>
          <li v-if="item.type === '010'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>已接收了{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
              <span>的货</span>
            </p>
          </li>
          <li v-if="item.type === '011'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>已{{_getDynamicsType(item.type)}}{{_getDynamicsOrderType(item.orderType)}}单据</span>
              <span>{{item.beOperatedUserName}}</span>
              <span @click="toProductDetail(item.orderType, item.orderNo)" style="cursor: pointer" class="main-color">{{item.orderNo}}</span>
            </p>
          </li>
          <li v-if="item.type === '101'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>修改了</span>
              <span class="main-color" style="margin-left:4px;">{{item.beOperatedUserName}}</span>
            </p>
          </li>
          <li v-if="item.type === '102'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>删除了</span>
              <span class="main-color" style="margin-left:4px;">{{item.beOperatedUserName}}</span>
              <span>用户授权</span>
            </p>
          </li>
          
<!--           <li v-if="item.type === '103'">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>删除了</span>
              <span class="main-color">{{item.beOperatedUserName}}</span>
              <span>{{_getDynamicsType(item.orderType)}}</span>
              <span>用户授权</span>
            </p>
          </li>

          <li v-if="item.type === '104'">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>删除了</span>
              <span class="main-color">{{item.beOperatedUserName}}</span>
              <span>{{_getDynamicsType(item.orderType)}}</span>
              <span>用户授权</span>
            </p>
          </li> -->

          <li v-if="item.type === '201'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}</span>
              <span>店铺</span>
            </p>
          </li>
          <li v-if="item.type === '901'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}</span>
            </p>
          </li>
          <li v-if="item.type === '902'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}</span>
            </p>
          </li>
          <li v-if="item.type === '903'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}</span>
            </p>
          </li>
          <li v-if="item.type === '904'" :key="index">
            <DynamicsTime :NYR="_GetNYR(item.createTime)" :SF="_GetSF(item.createTime)"></DynamicsTime>
            <p>
              <span class="main-color">{{item.createUserName}}</span>
              <span>{{_getDynamicsType(item.type)}}</span>
            </p>
          </li>
        </template>
      </div>
    </ul>
  </div>
</template>
<script>
  // import {seekDynamic} from 'Api/commonality/seek'
  import {GetNYR, GetSF} from 'assets/js/getTime'
  import {getDynamicsType, getDynamicsOrderType} from 'assets/js/analysis'
  import DynamicsTime from './dynamics/DynamicsTime'
  export default {
    props: ['showList'],
    components: {
      DynamicsTime
    },
    mounted () {
      $(".list-scroll").mCustomScrollbar({
          theme: "minimal-dark",
          axis: 'y',
          mouseWheel: {
              scrollAmount: 200,
              preventDefault: false,
              normalizeDelta: false
          },
      });
    },
    methods: {
      _getDynamicsType (parm) {
        return getDynamicsType(parm)
      },
      _getDynamicsOrderType (parm) {
        return getDynamicsOrderType(parm)
      },
      _GetSF (parm) {
        return GetSF(parm)
      },
      _GetNYR (parm) {
        return GetNYR(parm)
      },
      toProductDetail (orderType, orderNo) {
        let toPath = ''
        switch (orderType) {
          case '01':
            toPath = '/work/storage/newStorage'
            return
          case '02':
            toPath = '/work/storageReturn/NewStorageReturn'
            return
          case '03':
            toPath = '/work/sipping/NewSipping'
            return
          case '04':
            toPath = '/work/salesReturn/NewSalesReturn'
            return
          case '05':
            toPath = '/work/sell/NewSell'
            return
          case '06':
            toPath = '/work/transferCabinet/NewTransferCabinet'
            return
          case '07':
            toPath = '/work/transferStorage/NewTransferStorage'
            return
          case '10':
            toPath = '/work/amend/NewAmend'
            return
        }
        this.$router.push({
          path: toPath,
          query: {
            orderNumber: orderNo
          }
        })
      }
    }
  }
</script>
<style lang="scss">
@import "~assets/css/color.scss";
.dynamics-list-main{
  .title-icon-wrap{
    margin: 20px 0 0 20px;
    font-weight: normal;
    i{
      display: inline-block;
      height: 16px;
      margin: 0 10px 0 0;
      width: 16px;
      background: url('./../../assets/img/members-icon.png') no-repeat;
      background-size: 16px;
    }
    span{
      vertical-align: top;
      margin: 0 4px;
      font-size: 16px;
      line-height: 16px;
      color: $font-color-deep;
    }
  }
  h4{
    height: 40px;
    margin-top: 10px;
    i{
      display: inline-block;
      height: 40px;
      margin: 0 10px 0 10px;
      width: 20px;
    }
    span{
      vertical-align: top;
      font-size: 16px;
      color: $main-color;
    }
  }
  ul{
    // height: 554px;
    height: 677px;
    overflow: auto;
    li{
      font-size: 0;
      margin-bottom: 20px;
      p:nth-child(2){
        margin-top: 8px;
        margin-left: 15px;
        span{
          font-size: 13px;
          margin-left: 5px;
          color: $font-color-deep;
        }
        .main-color{
          margin-left: 20px;
          color: $main-color;
        }
      }
    }
    li:nth-child(1n + 0) {
      i{ 
        width:8px;
        height: 8px;
        //background-color: #69bcff;
        background-color: #f7b73b;
      }
    }
    li:nth-child(2n + 0){
      i{
        width:8px;
        height: 8px;
        background-color: #ef8641;
        //  background-color: #7668fd;
      }
    }
    li:nth-child(3n + 0){
      i{
        width:8px;
        height: 8px;
        background-color: #cd5867;
        //  background-color: #aa60ef;
      }
    }
    li:nth-child(4n + 0){
      i{
        width:8px;
        height: 8px;
        background-color: #f7b73b;
        // background-color: #fc6be1;
      }
    }
    li:nth-child(5n + 0){
      i{
        width:8px;
        height: 8px;
        background-color: #ef8641;
        // background-color: #fe687b;
      }
    }
    li:nth-child(6n + 0){
      i{
        width:8px;
        height: 8px;
        background-color: #cd5867;
        //  background-color: #ff9b66;
      }
    }
  }
}
</style>

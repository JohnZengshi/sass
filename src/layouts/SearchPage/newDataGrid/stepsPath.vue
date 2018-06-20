<template>
<div class="steps-path">
  <div class="steps-item" @click="openSmallPage(index)" v-for="(item,index) in orderListST" :key="index">
    <div class="item_title clearfix" v-if="actionIndex == index">
      <div class="item_time fl">{{_formDataTimeYND(item.rcvTime)}}</div>
      <div class="item_status fl">{{ getOrderType(item.orderType) }}</div>
      <ul class="fl">
        <li>
          <div class="label">单据号</div>
          <div class="message">{{item.orderNum}}</div>
        </li>
        <li v-if="item.operatorName">
          <div class="label">操作人</div>
          <div class="message">{{item.operatorName}}</div>
        </li>
        <li v-if="item.inRepositoryName">
          <div class="label">入库库位</div>
          <div class="message">{{item.inRepositoryName}}</div>
        </li>
        <li v-if="item.supplierName">
          <div class="label">供应商</div>
          <div class="message">{{item.supplierName}}</div>
        </li>
        <li v-if="item.locationName">
          <div class="label">当前位置</div>
          <div class="message">{{item.locationName}}</div>
        </li>
        <li v-if="item.outRepositoryName">
          <div class="label">调库位置</div>
          <div class="message">{{item.outRepositoryName}}</div>
        </li>
        <li v-if="item.inCounterName">
          <div class="label">调入柜组</div>
          <div class="message">{{item.inCounterName}}</div>
        </li>
        <li v-if="item.outCounterName">
          <div class="label">调出柜组</div>
          <div class="message">{{item.outCounterName}}</div>
        </li>
      </ul>
    </div>
    <div class="item_title_only clearfix" v-else>
      <div class="item_time fl">{{ _formDataTimeYND(item.rcvTime) }}</div>
      <div class="item_status fl">{{ getOrderType(item.orderType) }}</div>
    </div>
  </div>
</div>
</template>

<script>
import { homepageSearch, productLogRecord } from 'Api/search'
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'


export default {
  data () {
    return{
      isOpen: true,
      actionIndex: 0,
      stepItem:[],
      orderList: [],
    }
  },
  props: ['productId','orderListST'],
  watch: {
    productId(val) {
      productLogRecord({productId:val}).then(res => {
        console.log('我的数据',res.data)
      })
    },
    orderListST(val) {
      if(val) {
        this.$nextTick(() => {
          // this.fetchFootData()
          let itemHeight = $('.steps-item').eq(this.actionIndex).find('.item_title').height()
          $('.steps-item').eq(this.actionIndex).height(itemHeight).siblings().height(30)
        })
      }
    }
  },
  methods: {
    // 获取状态
    getOrderType(data) {
      switch (data) {
        case '01':
          return '入库'
          break;
        case '02':
          return '退库'
          break;
        case '03':
          return '发货'
          break;
        case '04':
          return '退货'
          break;
        case '05':
          return '销售/回购'
          break;
        case '06':
          return '调柜'
          break;
        case '07':
          return '调库'
          break;
        case '10':
          return '修改'
          break;
        case '11':
          return '服务'
          break;
      
        default:
          break;
      }
    },
    // 获取当前状态数据
    fetchFootData (){
      this.stepItem.forEach((item, index) => {
          if (index == 0) {
            Object.assign(item, {
              statusClass: 'ing',
              userName: '',
              createTime: ''
            })
          } else {
            Object.assign(item, {
              statusClass: '',
              userName: '',
              createTime: ''
            })
          }
      })
      seekReceiptStatusList({
        orderId : this.orderNum
      }).then((res) => {
        console.log(res)
        let statusData = res.data.data.dataList
        let status = res.data.data.nowStatus
        //console.log(statusData)
        this.stepItem.forEach((f, i) => {
           let item = statusData[i]
           if (item) {
             let tpItem = this.stepItem[i]
             //console.log(tpItem)
             Object.assign(tpItem, {
               createTime: this.toStringCut(item.createTime),
               userName: item.userName
             })
             if( item.status == f.status){
               //console.log(i, tpItem)
               this.$set(this.stepItem, i ,tpItem)
             }
           }
           if (f.status <= status){
             
             Object.assign(f, {
                statusClass: f.status == status ? 'ing' : 'past'
             })
           //console.log(1111, f)
             //记录当前的状态值
             if (f.status == status){
               this.$emit('setStatus',{
                 statusName: f.statusName,
                 statuscurClass: f.statuscurClass,
                 status : f.status
               })
             }
           }
        })
      })
    },
    toStringCut (str){
      //console.log(str)
      if (str != null) {
        if(str.length > 8){
          return str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2) + " " + str.substr(8,2) + ":" + str.substr(10,2);
        }
      }
     
    },
    // 打开标签
    openSmallPage(index) {
      this.actionIndex = index

      this.$nextTick(() => {
        // $('.steps-item').eq(index).find('.item_title').height(30)
        // $('.steps-item').eq(index).find('.item_title').animate({height: '170px'},()=> {
          // 获取对应内容的高度
          let itemHeight = $('.steps-item').eq(index).find('.item_title').height()
          $('.steps-item').eq(index).height(itemHeight).siblings().height(30)
        // })
      })
    },
    // 格式化时间的方法
    _formDataTimeYND(parm){
        return GetNYR(parm)
    },
  },


  
  mounted(){
    // this.$nextTick(() => {
    //   // this.fetchFootData()
    //   let itemHeight = $('.steps-item').eq(this.actionIndex).find('.item_title').height()
    //   $('.steps-item').eq(this.actionIndex).height(itemHeight).siblings().height(30)
    // })

    console.log('查看一下数据',this.orderListST)
  }
}
</script>

<style lang="scss" scoped>
.steps-path{
  position: absolute;
  width: 100%;
  top:0;
  left: 0;

  min-height:400px;
  
  .steps-item,{
    display: flex;
    position: relative;

    padding-left: 20px;
    padding-bottom: 50px;

    font-size: 12px;
    color: #d6d6d6;

    transition: all 2s;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;

      border-radius: 100%;
      border: 2px solid #2993f8;
      background: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      top: 14px;
      left: 4px;
      width: 6px;
      height: 100%;
      background: #9bceff;
    }
    .item_title_only {
      width: 172px;
      // height: 100%;
      background: #fff;
      z-index: 9999;
      .item_time {
        width: 84px;
        height: 30px;

        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 30px;

        background: #2993f8;
        border-top-left-radius: 24px;
        border-bottom-right-radius: 15px;
        
        cursor: pointer;
      }
      .item_status {
        width: 66px;
        height: 30px;

        margin-left: 10px;

        font-size: 12px;
        font-weight: bold;
        line-height: 30px;
        color: #2993f8;
      }
    }
    .item_title {
      position: absolute;      
      width: 172px;
      border: 1px solid #eee;
      border-top-left-radius: 24px;
      border-bottom-right-radius: 15px;
      background: #fff;
      z-index: 9999;

      overflow: hidden;
      .item_time {
        width: 84px;
        height: 30px;

        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 30px;

        background: #2993f8;
        border-top-left-radius: 22px;
        border-bottom-right-radius: 22px;
        
        cursor: pointer;
      }
      .item_status {
        width: 66px;
        height: 30px;

        margin-left: 10px;

        font-size: 12px;
        font-weight: bold;
        line-height: 30px;
        color: #2993f8;
      }
      >ul {
        width: 100%;
        padding-bottom: 14px;
        // animation: openItem 1s;
        
        li {
          display: flex;
          .label {
            width: 60px;
            height: 24px;

            color: #999;
            text-align: right;
            line-height: 24px;
          }
          .message {
            flex: 1;
            margin-left: 15px;
            line-height: 24px;
            color: #333;
          }
        }
      }
    }
  }
  .steps-item:nth-last-of-type(1) {
    &::after {
      content: '';
      position: absolute;
      top: 14px;
      left: 4px;
      width: 6px;
      height: 0;
      background: #9bceff;
    }
  }
  .clearfix {
    clear: both;
  }
}
@keyframes openItem {
  from {height:0px;}
  to {height: 100%;}
}
</style>
<template>
<div class="steps-path" :class="{remark: isRemark}">
  <div class="steps-item" :class="item.statusClass"  v-for="(item,i) in stepItem" :key="i"> 
      <span class="status">{{item.statusName}}</span>
      <div class="user">
          <p class="time" v-text="item.createTime"></p>
          <p class="name" v-text="item.userName"></p>
      </div>
  </div>
</div>
</template>

<script>
import {seekReceiptStatusList} from 'Api/commonality/seek'
export default {
  data () {
    return{
      stepItem: [
        {
          createTime : '',
          userName : '',
          status: '1',
          id: '1',
          statusName : '待审核',
          statuscurClass : 'auditing',
          statusClass : 'ing'
        },
        {
          createTime : '',
          userName : '',
          status: '2',
          id: '2',
          statusName : '审核中',
          statuscurClass : 'alreadyAudit',
          statusClass : ''
        },
        {
          createTime : '',
          userName : '',
          status: '3',
          id: '3',
          statusName : '已审核',
          statuscurClass : 'compAudit',
          statusClass : ''
        },
        {
          createTime : '',
          userName : '',
          status: '4',
          id: '4',
          statusName : '待收货',
          statuscurClass : 'compAudit',
          statusClass : ''
        },
        {
          createTime : '',
          userName : '',
          status: '5',
          id: '5',
          statusName : '已收货',
          statuscurClass : 'compAudit',
          statusClass : ''
        },
        {
          createTime : '',
          userName : '',
          status: '6',
          id: '6',
          statusName : '锁定',
          statuscurClass : 'lock',
          statusClass : ''
        }
      ]
    }
  },
  props: ['orderNum', 'statusREfresh', 'isRemark'],
  watch: {
    'statusREfresh': function (val) {
      if (val == true) {
        this.fetchFootData()
      }
    }
  },
  methods: {
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
        let statusData = res.data.data.dataList
        let status = res.data.data.nowStatus
        if (statusData.length > 0) {
          this.stepItem.forEach((f, i) => {
            let item = statusData[i]
            if (item) {
              let tpItem = this.stepItem[i]
              Object.assign(tpItem, {
                createTime: this.toStringCut(item.createTime),
                userName: item.userName
              })
              if( item.status == f.status){
                this.$set(this.stepItem, i ,tpItem)
              }
            }
            if (f.status <= status){
              
              Object.assign(f, {
                  statusClass: f.status == status ? 'ing' : 'past'
              })
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
        } else {
          this.stepItem.forEach((item) => {
            if (item.status < status) {
              Object.assign(item, {
                statusClass : 'past'
              })
            }
            if (item.status == status) {
              Object.assign(item, {
                statusClass : 'ing'
              })
            }
            if (item.status == status) {
              this.$emit('setStatus',{
                statusName: item.statusName,
                statuscurClass: item.statuscurClass,
                status : item.status,
                nowStatus : status
              })
            }
          })
        }
        
      })
    },
    toStringCut (str){
      if (str != null) {
        if(str.length > 8){
          return str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2) + " " + str.substr(8,2) + ":" + str.substr(10,2);
        }
      }
     
   }
  },
  
  mounted(){
    this.$nextTick(() => {
      this.fetchFootData()
    })
  }
}
</script>

<style lang="scss" scoped>

.steps-path{
  position: absolute;
  width:170px;
  top:10px;
  right:-170px;
  z-index: 10;
  min-height:400px;
  &.remark {
    right:-205px !important;
  }
  >.steps-item{
    color: #d6d6d6;
    height: 80px;
    position: relative;
    font-size: 12px;
    display: flex;
    
    >.user{
      width: 105px;
      padding-left: 15px;
      text-align: left;
      border-left:3px dashed #e5e5e5;
      position: relative;
      .time{ letter-spacing: -0.05em;}
      &:after,&:before{
        content: '';
        display: block;
        border-radius: 100%;
        position: absolute;
      }
      &:after{
        width: 14px;
        height: 14px;
        background-color: #d6d6d6;
        left: -9px;
        top: 0;
        z-index: 3;
      }
      &:before{
        width: 10px;
        height: 10px;
        background-color: #fff;
        left: -7px;
        top: 2px;
        z-index: 4;
      }
    }
    
    >.status{
      display: block;
      text-align: right;
      width: 56px;
      font-weight: bold;
      padding-right: 10px;
      position: relative;
      white-space: nowrap;
    }
    /* 已经操作过的状态 */
    &.past{
      .user{
        &:after{background-color: #2993f8;left: -10px;}
        &:before{left: -8px;}
        width: 107px;
        border-left:6px solid #9bceff;
        >.time{ color: #333;}
        >.name{ color: #b3b4b3;}
      }
      >.status{color:#2993f8;}
    }
    
    /* 进行中的状态 */
    &.ing{
      .user{
        &:after{background-color: #ffbf42; width: 16px; height: 16px;}
        &:before{left: -6px;top:3px;}
        >.time{ color: #333; }
        >.name{ color: #b3b4b3;}
      }
      >.status{
        color:#2993f8;
        &:after{
          content: '';
          border:7px solid transparent;
          border-top-color:#ffbf42;
          position: absolute;
          right: -9px;
          top: 13px;
          z-index: 2;
        }
      }
    }
    
    &:last-child{
      >.user{
        height: 30px;
      }
    }
  }
}
</style>
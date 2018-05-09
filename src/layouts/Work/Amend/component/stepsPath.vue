<template>
<div class="steps-path">
  <div class="steps-item" :class="item.statusClass" v-for="item,i in stepItem">
      <span class="status">{{item.statusName}}</span>
      <div class="user">
          <p class="time" v-text="item.createTime"></p>
          <p class="name"v-text="item.userName"></p>
      </div>
  </div>
</div>
</template>

<script>
import {seekReceiptStatusList} from 'Api/commonality/seek'
export default{
  data(){
    return{
      stepItem: [
        {
          createTime : '',
          userName : '',
          status: '1',
          statusName : '待审核',
          statuscurClass : 'stayAudit', // 订单状态栏显示样式，根据样式配置自适应状态栏背景颜色变化
          statusClass : 'ing' //步骤条样式
        },
        {
          createTime : '',
          userName : '',
          status: '2',
          statusName : '审核中',
          statuscurClass : 'auditing',
          statusClass : ''
        },
        {
          createTime : '',
          userName : '',
          status: '3',
          statusName : '已审核',
          statuscurClass : 'alreadyAudit',
          statusClass : ''
        },
        {
          createTime : '',
          userName : '',
          status: '6',
          statusName : '锁定',
          statuscurClass : 'lock',
          statusClass : ''
        }
      ]
    }
  },
  props: ['orderNum'],
  
  methods: {
    // 获取当前状态数据
    fetchPathData (){
      
      seekReceiptStatusList({
        orderId : this.orderNum
      }).then((res) => {
        let resData = res.data.data.dataList
        
        //当前的状态值
        let status = res.data.data.nowStatus
        
        
        if (resData.length >0) {
          this.empty()
          resData.forEach((item) => {
            this.stepItem.forEach((f, i) => {
              
              if (item.status == f.status) {
                if (item.status == 2 || item.status == 6) {
                  Object.assign(f, {
                    statusClass : item.status == status ? 'ing' : 'past'
                  })
                }else {
                  Object.assign(f, {
                    createTime: this.toStringCut(item.createTime),
                    userName: item.userName,
                    statusClass : item.status == status ? 'ing' : 'past'
                  })
                }
              }
              
              if (f.status < status) {
                Object.assign(f, {
                  statusClass : 'past'
                })
              }
              
              if (f.status == status) {
                 this.$emit('setStatus',{
                   statusName: f.statusName,
                   statuscurClass: f.statuscurClass,
                   status : f.status,
                   nowStatus : status
                 })
               }
              
              if (f.status == status) {
                Object.assign(f, {
                  statusClass : 'ing'
                })
              }
              
            })
            
          })
        }
       
      })
    },
    
    empty () {
      this.stepItem.forEach( f =>{
        Object.assign(f, {
         createTime: '',
         userName: '',
         statusClass : ''
        })
      })
    },
    // 时间戳格式化 2007-12-25
    toStringCut (str){
     if(str.length > 8){
       return str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2) + " " + str.substr(8,2) + ":" + str.substr(10,2);
     }
   }
  },
  
  mounted(){
    this.$nextTick(() => {
      this.fetchPathData()
    })
  }
}
</script>

<style lang="scss" scoped>

.steps-path{
  position: absolute;
  width:170px;
  top:60px;
  right:-170px;
  z-index: 80;
  min-height:400px;
  
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
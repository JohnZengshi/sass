<template>
<transition name="tp-ani">
<div 
    class="app-status_bar" 
    :data-status="curStatus.statusName" 
    :class="{[curStatus.statuscurClass] : true, [isRemark ? 'remark-container' : 'no']: true, 'color1': curStatus.nowStatus == 1, 'color2': curStatus.nowStatus == 2,
    'color3': curStatus.nowStatus == 3, 'color4': curStatus.nowStatus == 4, 'color5': curStatus.nowStatus == 5, 'color6': curStatus.nowStatus == 6,
    'color7': curStatus.nowStatus == 7, 'color8': curStatus.nowStatus == 8}">
     <div class="status-container">
       <!--库位、店铺、供应商操作-->
       <div class="item select">
           <h5>
           	{{orderData.orderNum}} 
           	<span v-if="orderData.ifImport=='Y'"  class="icon-cloud"></span>
           </h5>
           <div class="select-container">
               <div class="item storage" v-text="orderData.storageName"><!--仓库--></div>
               <div class="item supplier">
                   <template v-if="curStatus.status == '1' && isSinglePerson">
                     <!--<span v-if="supplierListData.length == 1" v-text="supplierListData[0].supplierName"></span>-->
                     <select-drop
                          class="selected_dropdown"
                          titleName="请选择"
                          :defaultValue = "orderData.supplierName"
                          dataType="供应商"
                          :propList="supplierListData"
                          @clearInfo="clearInfo"
                          @dropReturn="dropReturn">
                      </select-drop>
                   </template>
                   <span v-else>{{orderData.supplierName||"未选择"}}</span>
               </div>
               <div class="item shop">
                    <!-- 注： orderData.shopName 店铺名需要另外一个接口去拿  5.38 单据简介  表尾组件已经做了接口调用，直接传过来即可 -->
                   <template v-if="curStatus.status == '1' && isSinglePerson">
                     <!--<span v-if="shopListByCo.length == 1" v-text="shopListByCo[0].shopName"></span>-->
                     <select-drop
                          class="selected_dropdown"
                          titleName="请选择"
                          :defaultValue = "orderData.shopName"
                          dataType="店铺"
                          :propList="shopListByCo"
                          @clearInfo="clearInfo"
                          @dropReturn="dropReturn">
                      </select-drop>
                    </template>
                   <span v-else>{{orderData.shopName||"未选择"}}</span>
               </div>
           </div>
           <div class="select-container-name">
           	<div class="item">库位</div>
           	<div class="item">供应商</div>
           	<div class="item">店铺</div>
           </div>
       </div>
       <!--商品属性-->
       <div class="item product-attr">
           <div class="fixed">
               <p><span >{{orderData.totalNum||0}}</span>件</p>
               <p>数量 </p>
           </div>
           <div class="fixed">
               <p><span>{{(orderData.totalWeight || 0).toFixed(3)}}</span>g</p>
               <p>重量 </p>
           </div>
           <div class="fixed">
               <p><span>{{(orderData.totalPrice || 0).toFixed(2)}}</span>元</p>
               <p>金额 </p>
           </div>
               
       </div>
       
       <!--用户、时间显示-->
       <div class="item user">
           <p class="time" v-text="dateFormat(orderData.createDate)"></p>
           <p class="user">
             <img v-if="orderData.makeOrderManLog == null || orderData.makeOrderManLog ==''" src="/static/img/staffDefaultImg.png"/>
             <img v-else :src="orderData.makeOrderManLog"/>
             {{orderData.makeOrderManName}}
           </p>
       </div>
     </div>
     
     <!--备注-->
     <order-remark ref="remark" :orderData="orderData" @updateRemark="updateRemark"></order-remark>
</div>
</transition>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {operateHandleXGReceipt} from 'Api/commonality/operate'
import selectDrop from './dropDownMenu'
import orderRemark from './orderRemark'
export default{
	props: ['orderData','curStatus'],
  data(){
    return{
      // 备注权限
      isRemark : false,
      //是否为 制单人
      isSinglePerson: false
    }
  },
  components:{
    selectDrop,
    orderRemark
  },
  computed: {
    ...mapGetters([
        "shopListByCo", // 取店铺列表数据
        "supplierListData" // 取供应商列表数据
    ])
  },
  
  watch: {
  	orderData:function(){
      this.isSinglePerson = (sessionStorage.id == this.orderData.makeOrderManId)
   	},
    'curStatus.status': function(){
      // curStatus.status 是异步获取到的状态，需要对属性进行监听
      this.fetchData()
    }
  },
  
  methods: {
    ...mapActions([
        "getShopListByCo", // 请求店铺列表
        "workSupplierList" // 请求供应商
    ]),
    
    // 时间戳格式化
    dateFormat (parm) {
      if (parm == undefined) return ''
      let year = parm.substring(0, 4)
      let month = parm.substring(4, 6)
      let data = parm.substring(6, 8)
      let hour = parm.substring(8, 10)
      let time = parm.substring(10, 12)
      return year + "-" + month + "-" + data + " " + hour + ":" + time
    },
    
    // 获取店铺、供应商数据
    fetchData(){
      // 只在待审核阶段 对店铺列表级供应商列表进行更改 
      //if (this.curStatus.status == '1'){
        this.getShopListByCo()
        this.workSupplierList()
      //}
    },
    
    // 清除下拉选择
    clearInfo(data){
      let objData = Object.assign({
        item : {operateId:''}
      }, data)
      this.dropReturn(objData)
    },
    
    // 切换店铺
    dropReturn (data){
      let type = 2
      if(data.type == '店铺') type = 3
      operateHandleXGReceipt({
        modelType : '4', //入库修改
        orderNum: this.orderData.orderNum,
        modifyList: [
          {
            dataType: type,
            objectData: data.item.operateId || ''
          }
        ]
      }).then((res) => {
        // 切换失败
        if(res.data.state == 99) {
          this.$message({
            type:'error',
            message : res.data.msg
         })
        }
      })
      
    },
    
    // 更新备注显示权限
    updateRemark (type) {
      this.isRemark = type
    },
  },
  
  mounted(){
    this.$nextTick(() => {
      this.fetchData()
    })
  },
}
</script>

<style lang="scss" scoped>
.color1 { // 待审核
    &:before{background:#ffba42;}
    &:after{background-color: #a87825;}
}
.color2 { // 审核中
    &:before{background:#ff9b42;}
    &:after{background-color: #bf7431;}
}
.color3 { // 已审核
    &:before{background:#f5743c;}
    &:after{background-color: #c25c30;}
}
.color4 { // 待收货
    &:before{background:#b793e6;}
    &:after{background-color: #786394;}
}
.color5 { // 已收货
    &:before{background:#6c62e6;}
    &:after{background-color: #4f48a9;}
}
.color6 { // 锁定
    &:before{background:#ec625f;}
    &:after{background-color: #a74543;}
}
.color7 { // 待收银
    &:before{background:#c3d5dd;}
    &:after{background-color: #98a6ac;}
}
.color8 { // 已收银
    &:before{background:#5594b8;}
    &:after{background-color: #3b6780;}
}
/* 状态栏  */
.app-status_bar{
  background-color: #fff;
  border-radius: 10px;
  height: 120px;
  width: 1250px;
  box-shadow: 0 0 15px #ddd;
  transition:all .5s;
  position: relative;
  margin-top: 17px;
  &:before{
    content: attr(data-status);
    display: block;
    width: 77px;
    height: 35px;
    line-height: 35px;
    // background-color: #ffba42;
    color: #fff;
    transform: translateY(-18px);
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    left: -10px;
    top: 50%;
    border-radius: 4px;
    z-index: 3;
  }
  
  &:after{
    content: '';
    // background-color: #a87825;
    display: block;
    height:10px;
    width:10px;
    position: absolute;
    z-index: 0;
    left:7px;
    top:50%;
    transform: rotate(45deg) translateY(17px);
  }
  
  >.status-container{
    background-color: #fff;
    height: 100%;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    padding-left: 120px;
  }
  
  &.remark-container{
    width: 1190px!important; 
    z-index: 100;
  }
}

.status-container{
  display: flex;
  >.item{
    height: 100%;
    width: 30%;
    padding-top: 30px;
    font-size: 14px;
    &.select{
      width: 444px;
      >h5{
        font-size: 18px;
        color: #2993f8;
        height: 30px;
        line-height: 30px;
      }
    }
    &.product-attr{
     width: 420px;
    }
    
    &.user{
      padding-left: 50px;
      color: #999;
      >.time{
        height: 20px;
        line-height: 20px;
      }
      
      >.user{
        height: 25px;
        line-height: 25px;
        margin-top: 5px;
        >img{
          width: 23px;
          height: 23px;
          border-radius: 100%;
          float: left;
          margin-right: 5px;
        }
      }
    }
    
  }
  
  
  .product-attr{
    display: flex;
    >.fixed{
      width: 33.33%;
      color: #999;
      >p{
        height: 25px;
        line-height: 25px;
      }
      p > span{
        margin-right: 5px;
        color: #333;
        font-size: 15px;
        display: inline-block;
        white-space: nowrap;
      }
      &:last-child{
        position:relative;
        &:after{
          content: '';
          height: 20px;
          width: 1px;
          position: absolute;
          right: 0;
          top: 15px;
          background-color: #d6d6d6;
        }
      }
    }
  }
  
}

.select-container{
  display: flex;
  >.item{
    height: 30px;
    line-height: 30px;
    width:100px;
    text-overflow: ellipsis;
    // overflow: hidden;
    white-space: nowrap;
    &.supplier{ margin-right: 10px;}
    >span{
      display: inline-block;
      white-space: nowrap;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

</style>
<style lang="scss">
.select-container{
  >.item{
    >.dropDown-wrap{
       max-width: 100px;
       >span{
         text-align: left;
       }
    }
  }
}
.icon-cloud{
    width: 20px;
    display: inline-block;
    height: 20px;
    vertical-align: middle;
		background: url(../../../../../static/img/cloud.png) no-repeat;
    margin-left: 10px;
}
.select-container-name{
  display: flex;
  .item{
  	width: 106px;
    font-size: 12px;
    color: #a9a8a7;
  }
  .item:last-child{
  	padding-left: 6px;
  }
}
</style>

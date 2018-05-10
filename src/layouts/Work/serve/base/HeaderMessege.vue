<template>
<transition name="tp-ani">
<div 
    class="app-status_bar" 
    :data-status="curStatus.statusName" 
    :class="{[curStatus.statuscurClass] : true, [isRemark ? 'remark-container' : 'no']: true,
    'color4': curStatus.nowStatus == 1,
    'color5': curStatus.nowStatus == 2,
    'color6': curStatus.nowStatus == 3
    }">
      <div class="status-container">
        <!--库位、店铺、供应商操作-->
        <div class="item select">
           <h5>
            {{receiptData.orderNum}} 
            <span v-if="receiptData.ifImport=='Y'"  class="icon-cloud"></span>
           </h5>
           <div class="select-container">
              <div class="item storage" v-text="receiptData.shopName"><!--店铺--></div>
              <div v-if="!isOperation" class="item storage" v-text="receiptData.sellName"><!--人--></div>
              <!--人-->
              <DropDownMenu
                  v-if="isOperation"
                  style="float: left;"
                  :nameKey="'userName'"
                  :titleInfo="receiptData.sellName || '店铺'"
                  :showList="shopUserList"
                  @changeData="dropUserReturn"
                  @clearInfo="clearUser">
              </DropDownMenu>
           </div>
           <div class="select-container-name">
              <div class="item">库位</div>
              <div class="item">售后接待</div>
           </div>
        </div>
        <!--商品属性-->
        <div class="item product-attr">
           <div class="fixed">
              <p><span >{{receiptData.totalNum || 0}}</span>件</p>
              <p>件数 </p>
           </div>
           <!--用户、时间显示-->
           <div class="fixed user">
              <p>{{dateFormat(receiptData.createDate)}}</p>
              <p class="user">
                <FormatImg :logo="receiptData.makeOrderManLog" class="format-img" :userName="receiptData.makeOrderManName" :size="20"></FormatImg>
                <span class="make-order-man-name">{{receiptData.makeOrderManName}}</span>
              </p>
           </div>
               
        </div>
       
        <!--用户、时间显示-->
        <div class="item user-messege">
          <template v-if="receiptData.vipId">
            <p class="user-m-h">售后用户信息</p>
            <div class="user-m-inner" @click="openAddCommodityWrap('1')">
              <FormatImg :logo="receiptData.vipLogo" class="user-m-i-img" :userName="receiptData.vipName" :size="50"></FormatImg>
              <div class="user-m-i-tit">
                <p>
                  <span>{{receiptData.vipName}}</span>
                  <img class="sex-icon" v-if="receiptData.vipSex == 1" src="~assets/img/man-icon.png" alt="">
                  <img class="sex-icon" v-if="receiptData.vipSex == 2" src="~assets/img/woman-icon.png" alt="">
                  <i class="vip-group">{{filterVipGroup(receiptData.vipGroup)}}</i>
                </p>
                <p>{{receiptData.vipPhone}}</p>
              </div>
            </div>
          </template>

          <ul v-else class="no-vip-user">

            <li @click="openAddCommodityWrap('2')">
              <img src="~assets/img/seek-visitor.png" alt="">
              <p>查找访客</p>
            </li>
            
            <li @click="openAddCommodityWrap('1')">
              <img src="~assets/img/add-member.png" alt="">
              <p>查找会员</p>
            </li>

          </ul>

        </div>
      </div>
</div>
</transition>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {operateHandleXGReceipt, operateUpdateServiceByNum} from 'Api/commonality/operate'
import {seekGetShopUserList} from 'Api/commonality/seek'
// import selectDrop from './dropDownMenu'
import orderRemark from './orderRemark'
import memberCreate from './member-create'
import DropDownMenu from 'base/menu/DownMenu'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default{
  props: ['receiptData','curStatus', 'isOperation'],
  data(){
    return{
      // 备注权限
      isRemark : false,
      //是否为 制单人
      isSinglePerson: false,
      shopUserList: []
    }
  },
  components:{
    orderRemark,
    FormatImg,
    memberCreate,
    DropDownMenu
  },
  computed: {
    ...mapGetters([
        "shopListByCo", // 取店铺列表数据
        "supplierListData" // 取供应商列表数据
    ])
  },
  
  watch: {
    receiptData:function(){
      this.isSinglePerson = (sessionStorage.id == this.receiptData.makeOrderManId)
    },
    'curStatus.status': function(){
      // curStatus.status 是异步获取到的状态，需要对属性进行监听
      this.fetchData()
    }
  },
  
  created () {
    this.getShopUserList()
  },

  methods: {
    ...mapActions([
        "getShopListByCo", // 请求店铺列表
        "workSupplierList" // 请求供应商
    ]),
    // 获取员工列表
    getShopUserList(parm) {
      let options = {
        page: 1,
        pageSize: 9999,
        shopId: this.$route.query.shopId
      }
      seekGetShopUserList(options).then((res) => {
        if(res.data.state == 200) {
          this.shopUserList = res.data.data.shopUserList
        } else {
          this.$message({
            type:'error',
            message : res.data.msg
          })
        }
      }, (res) => {

      })
    },

    dropUserReturn (parm) {
      let options = {
        dataList: [
          {
            operateType: '7',
            objectData: parm.userId
          }
        ],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId
      }
      this._operateUpdateServiceByNum(options, '修改成功')
    },

    _operateUpdateServiceByNum (options, tit) {
      operateUpdateServiceByNum(options)
        .then(res => {
          if (res.data.state == 200) {
            this.$message({
              message: tit,
              type: 'success'
            })
            this.$emit('_seekReceiptFWSynopsis')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    clearUser (parm) {

    },


    // 时间戳格式化
    dateFormat (parm) {
      if (!parm) return ''
      let year = parm.substring(0, 4)
      let month = parm.substring(4, 6)
      let data = parm.substring(6, 8)
      let hour = parm.substring(8, 10)
      let time = parm.substring(10, 12)
      return year + "-" + month + "-" + data + " " + hour + ":" + time
    },
    
    // 会员级别
    filterVipGroup (parm) {
      switch (parm) {
        case '1':
          return '普通'
        case '2':
          return '中级'
        case '3':
          return '重要'
      }
    },

    // 获取店铺、供应商数据
    fetchData(){
      // 只在待审核阶段 对店铺列表级供应商列表进行更改 
      //if (this.curStatus.status == '1'){
        // this.getShopListByCo()
        // this.workSupplierList()
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
        orderNum: this.receiptData.orderNum,
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

    openAddCommodityWrap (parm) {
      if (this.isOperation) {
        this.$emit('openAddCommodityWrap', parm)
      }
    }
  },
  
  mounted(){
    this.$nextTick(() => {
      this.fetchData()
    })
  }
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
    
    &.user-messege{
      position: relative;
      padding: 16px;
      color: #999;
      &:after{
        content: '';
        height: 80px;
        width: 1px;
        position: absolute;
        left: 0;
        top: 20px;
        background-color: #d6d6d6;
      }
      .user-m-h{
        position: relative;
        padding-left: 10px;
        font-size: 14px;
        line-height: 14px;
        color: #2993f8;
        &:after{
          content: '';
          height: 14px;
          width: 2px;
          position: absolute;
          left: 0;
          border-radius: 6px;
          background-color: #2993f8;
        }
      }
      .user-m-inner{
        height: 70px;
        padding: 10px 20px;
        margin-top: 6px;
        border-radius: 5px;
        background-color: rgb(246,247,249);
        .user-m-i-tit{
          display: inline-block;
          width: 170px;
          margin-left: 10px;
          margin-top: 8px;
          vertical-align: top;
          p{
            color: #333;
            margin-bottom: 5px;
            .vip-group{
              font-style: normal;
              padding: 2px 5px;
              border-radius: 5px;
              font-size: 14px;
              line-height: 14px;
              color: #fff;
              background-color: rgb(255, 162, 0);
            }
            >.vip-sex{
              font-size: 14px;
              color: red;
            }
            .sex-icon {
              width: 12px;
              height: 12px;
            }
          }
        }
        .user-m-i-img{
          width: 50px;
          height: 50px;
          margin-top: 2px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      >.no-vip-user{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 160px;
        height: 70px;
        li{
          cursor: pointer;
          overflow: hidden;
          img{
            width: 42px;
            margin-left: 4px;
            height: 42px;
          }
          p{
            font-size: 12px;
            width: 50px;
            text-align: center;
            color: #666;
          }
        }
        >li:first-child{
          float: left;
        }
        >li:last-child{
          float: right;
        }
      }
    }
    .format-img{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor:pointer;
    }
    
  }
  
  
  .product-attr{
    display: flex;
    >.fixed{
      // width: 33.33%;
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
      &:first-child{
        position:relative;
        padding-right: 40px;
        margin-right: 20px;
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
    >.user{
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

      .make-order-man-name{
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        height: 20px;
        line-height: 20px;
        color: #999;
        font-size: 14px;
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
    background: url(~static/img/cloud.png) no-repeat;
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

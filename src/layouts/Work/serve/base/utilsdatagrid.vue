<template>
<div class="utils-container" v-if="curStatus.nowStatus != 3">
 
 <!--提交审核 是制单人 并且单据为待审核状态  -->
<!--   <span
    style="border-bottom:1px solid #ededed;"
    data-text="提交审核" 
    @click="submitAudit"
    v-if="synopsiData.checkType == '1' && synopsiData.makeOrderManId == id">
    <i class="iconfont icon-tijiaoshenhe"></i>
  </span> -->
  <!--撤销审核 是公司职员 并且单据为审核中状态  -->
<!--   <span 
    data-text="撤销审核" 
    @click="repealRevoke" 
    v-if="curStatus.nowStatus == '2' && synopsiData.makeOrderManId == id">
    <i class="iconfont icon-chexiao"></i>
  </span>
  
  <span 
      data-text="通过审核" 
      @click="popupShow(true,'通过审核')"
      v-if="synopsiData.checkType == '2' && synopsiData.isCheckOrderMan == 'Y'" >
      <i class="iconfont icon-tongguoshenhe"></i>
    </span>
  <span 
    data-text="驳回审核" 
    @click="popupShow(true,'驳回审核')"
    v-if="synopsiData.checkType == '2'  && synopsiData.isCheckOrderMan == 'Y'" >
    <i class="iconfont icon-chexiao"></i>
  </span> -->
  <!--撤回审核 是管理员、制单人 并且单据为已审核状态  -->
<!--   <span 
    data-text="撤回审核" 
    @click="popupShow(true,'撤回审核')"
    v-if="(synopsiData.isRole == 'Y' || synopsiData.isCheckOrderMan == 'Y') && curStatus.nowStatus == 3" >
    <i class="iconfont icon-shenhebohui"></i>
  </span> -->
  
  <!-- 进行中，制单人 -->
  <span v-if="isOperation" data-text="完成售后" @click="submitAudit">
    <i class="iconfont icon-beizhu"></i>
  </span>
  
  <!-- 进行中，制单人 -->
  <span v-if="isRevocation" data-text="撤销完成" @click="repealRevoke">
    <i class="iconfont icon-chexiao"></i>
  </span>

  <!-- 进行中，制单人 -->
  <span v-if="isOperation" data-text="删除单据" @click="delOrder">
    <i class="iconfont icon-shanchu1"></i>
  </span>


<!--   <span data-text="删除单据" v-if="synopsiData.checkType == '1' && synopsiData.isRole == 'Y'" @click="delOrder">
    <i class="iconfont icon-shanchu1"></i>
  </span> -->

  <!-- 弹出框 -->
  <orderPopup 
    @submit="popupSubmit" 
    @popupShow="popupShow" 
    :title="title" 
    :isShowPopup="isShowPopup">
  </orderPopup>
  
  
</div>
</template>

<script>
import {
  operateUpdateServiceByNum,
  operateDelOrderByFW,
  operateReceiptOperation,
  operateHandleXGReceipt
} from 'Api/commonality/operate'
import {seekReceiptRKSynopsis} from 'Api/commonality/seek'
import orderPopup from './orderPopup'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import { mapGetters } from 'vuex'
export default{
  data(){
    return{
     synopsiData : {},
     title : '说明',
     auditShow : false,
     textareaData : '',
     id: sessionStorage.getItem('id'),
     
     // 弹出框 显示 隐藏
     isShowPopup : false,
     companyPosition : ''
    }
  },
  components: {
    orderPopup
  },
  props: ['dataList','orderData','curStatus', 'isOperation'],
  
  watch : {
    // curStatus:{
    //   handler: function(){
    //   },
    //   deep: true
    // }
    // orderData:{
    //   handler: function(){
    //     this.synopsiData = Object.assign({}, this.synopsiDatam, this.orderData)
    //   },
    //   deep: true
    // }
  },
  
  created () {
    this.synopsiData = Object.assign({}, this.synopsiDatam, this.orderData)
    this.companyPosition = sessionStorage.getItem('companyPosition') // 用户职位
  },
  
  computed: {
    ...mapGetters([
      "userPositionInfo" // 职位信息
    ]),
    shopManageRole: function() { // 店长
      if(this.userPositionInfo) {
        return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
      }
      return false
    },
    // 已完成 && 店长，制单人
    isRevocation () {
      if (this.orderData.makeOrderManId) {
        if (this.curStatus.nowStatus == 2) {
          if (this.shopManageRole || sessionStorage.getItem('id') == this.orderData.makeOrderManId) {
            return true
          }
        }
      }
      return false
    },
  },

  methods: {
    
    // 获取状态数据数据
    // fetchSynopsiData (){
    //   seekReceiptRKSynopsis({
    //     orderNum : this.synopsiData.orderNum
    //   }).then((res) => {
    //     this.synopsiData = Object.assign({}, this.synopsiData, res.data.data)
    //     this.$emit('setSynopsiData', this.synopsiData)
    //   })
    // },
    
    // 添加备注
    addRemark (data) {
      console.log(data);
      if(data != '' && data != null){
          this.popupShow(false)
          operateHandleXGReceipt({
            modelType : '4',
            modifyList: [
              {
                dataType : '5',
                objectData : data
              }
            ],
            orderNum: this.synopsiData.orderNum
          }).then((res) => {
            this.$message({
              message: '添加备注成功',
              type: 'success'
            })
            this.$emit('updataApi')
          })
      }else{
        this.$message({type:'info',message:'请输入备注信息'});
      }
    },
    
    
    popupSubmit (data){
      switch(this.title){
        case '驳回审核':
          this.rejectAudit(data)
        break;
        case '通过审核':
          this.passAudit(data)
        break;
        case '撤回审核':
          this.recallAudit(data)
        break;
        case '添加备注':
          this.addRemark(data)
        break;
      }
    },
    // 驳回审核
    rejectAudit (data) {
      this.popupShow(false)
      
      operateReceiptOperation({
        handleType: '4',
        orderIdList: [{
          orderNum: this.synopsiData.orderNum
        }],
        checkRemark: data
      }).then((res) => {
          if (res.data.state == 200) {
              this.$message({
                  message: '驳回审核成功',
                  type: 'success'
              })
              this.$emit('updataApi')
          } else {
            this.$message({
                message: res.data.msg,
                type: 'warning'
            })
          }
      })
    },
    
    // 通过审核
    passAudit (data) {
      this.popupShow(false)
      operateReceiptOperation({
        handleType: '5',
        orderIdList: [{
          orderNum: this.synopsiData.orderNum
        }],
        checkRemark: data
      }).then((res) => {
          if (res.data.state == 200) {
              this.$message({
                  message: '通过审核成功',
                  type: 'success'
              })
              this.$emit('updataApi')
          } else {
            this.$message({
                message: res.data.msg,
                type: 'warning'
            })
          }
      })
    },
    
    // 撤回审核
    recallAudit (data) {
      this.popupShow(false)
      operateReceiptOperation({
        handleType: '6',
        orderIdList: [{
          orderNum: this.synopsiData.orderNum
        }],
        checkRemark: data
      }).then((res) => {
          if (res.data.state == 200) {
              this.$message({
                  message: '撤回审核成功',
                  type: 'success'
              })
              this.$emit('updataApi')
          } else {
            this.$message({
                message: res.data.msg,
                type: 'warning'
            })
          }
      })
    },

    // 完成售后
    submitAudit () {
      if (this.dataList.length == 0 ){
        this.$message({
          type:'warning',
          message :'请添加商品'
        })
        return
      }
      let options = {
        dataList: [
          {
            operateType: 6
          }
        ],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId
      }
      this.$confirm('此操作将完成售后, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      }).then(() => {
        this._operateUpdateServiceByNum(options)
      }, () =>{})
    },
    // 撤销完成
    repealRevoke () {
      let options = {
        dataList: [
          {
            operateType: 8
          }
        ],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId
      }
      this.$confirm('此操作将撤销完成, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      }).then(() => {
        this._operateUpdateServiceByNum(options)
      }, () =>{})
    },
    _operateUpdateServiceByNum (options) {
      operateUpdateServiceByNum(options).then((res) => {
        if (res.data.state == 200) {
          this.$message({
            message: '完成售后成功',
            type: 'success'
          })
          this.$emit('updataApi')
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    },
    
    delOrder () {
      let options = {
          orderNum: this.$route.query.orderNumber
      }
      this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      }).then(() => {
          operateDelOrderByFW(options).then((res) => {
            if (res.data.state == 200) {
              this.$message({
                  message: '删除成功',
                  type: 'success'
              })
              this.$emit("goPage","/work/serve")
            } else {
              this.$message({
                  message: res.data.msg,
                  type: 'warning'
              })
            }
          })
      }, () =>{})
    },
    
    //弹出框 显示 隐藏
    popupShow (type, title){
      this.isShowPopup = type
      this.title = title || '说明'
    }
  },
  
  mounted(){
    this.$nextTick(() => {
      
    })
  }
}
</script>

<style lang="scss" scoped>
.utils-container{
 position:absolute;
 right:-70px;
 bottom: 0;
 width:52px;
 min-height: 50px;
 background-color: #fff;
 border:1px solid #ededed;
 border-radius: 5px;
 /*overflow: hidden;*/
 z-index: 3500;
 
 >.receipts{
   
 }
 
 >span,>.receipts >span{
  height: 50px;
  padding: 5px;
  color: #999;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  display: flex;
  /*border-radius: 5px;*/
  position: relative;
  justify-content:center;
  align-items: center;
  overflow: hidden;
  & ~ span{
    border-top: 1px solid #ededed;
  }
  >i{font-size: 24px;}
  
  &:after{
    content: attr(data-text);
    position: absolute;
    background-color: #2993f8;
    color: #fff;
    left: 0;
    top: 0;
    display: flex;
    justify-content:center;
    align-items: center;
    height: 40px;
    padding: 5px;
    transition: all .3s;
    opacity: 0;
    visibility: hidden;
    z-index: 2;
  }
  
  &:hover{
    &:after{
      opacity: 1;
      visibility:visible;
    }
    >i{display: none;}
  }
 }
 
}


</style>
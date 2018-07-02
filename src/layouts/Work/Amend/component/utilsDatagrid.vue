<template>
<div class="utils-container">
 
  <!--提交审核 是制单人 并且单据为待审核状态  -->
  <span 
    data-text="提交审核"
    style="border-bottom:1px solid #ededed;"
    @click="submitAudit"
    v-if="synopsiData.checkType == '1' && synopsiData.makeOrderManId == id">
    <i class="iconfont icon-tijiaoshenhe"></i>
  </span>
  <!--撤销审核 是公司职员 并且单据为审核中状态  -->
  <span 
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
  </span>
  <!--撤回审核 是管理员、制单人 并且单据为已审核状态  -->
  <span 
    data-text="撤回审核" 
    @click="popupShow(true,'撤回审核')"
    v-if="(synopsiData.isRole == 'Y' || synopsiData.isCheckOrderMan == 'Y') && curStatus.nowStatus == 3" >
    <i class="iconfont icon-shenhebohui"></i>
  </span>

  <print-label :orderData="orderData" :orderNum="synopsiData.orderNum" @tabPrint="tabPrint"></print-label>
  
  <span data-text="添加备注" @click="popupShow(true,'添加备注')">
    <i class="iconfont icon-beizhu"></i>
  </span>
  
  <span data-text="删除单据" v-if="synopsiData.checkType == '1' && synopsiData.isRole == 'Y'" @click="delOrder">
    <i class="iconfont icon-shanchu1"></i>
  </span>
  <!-- 加载页数 -->
  <LoaderNum ref="LoaderNum"></LoaderNum>

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
  operateSubmitAudit,
  operateDeleteByOrderNumber,
  operateReceiptOperation,
  operateHandleXGReceipt
} from 'Api/commonality/operate'
import {seekReceiptRKSynopsis} from 'Api/commonality/seek'
import orderPopup from '../component/orderPopup'
import printLabel from '../component/printLabel'
import LoaderNum from 'components/work/loaderNum'
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
     companyPosition : '',
     // 选择更新页数
    pageSize: "30",
    }
  },
  components: {
    orderPopup,
    printLabel,
    LoaderNum
  },
  props: ['dataList','orderData','curStatus'],
  
  watch : {
    curStatus:{
      handler: function(){
        //console.log('watch curStatus nowStatus:', this.curStatus.nowStatus)
      },
      deep :true
    },
    orderData:{
      handler: function(){
        this.synopsiData = Object.assign({}, this.synopsiDatam, this.orderData)
        //console.log('watch orderData checkType:', this.synopsiData)
      },
      deep :true
    }
  },
  
  created () {
    this.synopsiData = Object.assign({}, this.synopsiDatam, this.orderData)
    //console.log(this.curStatus, this.synopsiData)
    this.companyPosition = sessionStorage.getItem('companyPosition') // 用户职位
  },
  
  methods: {
  	tabPrint(){
  		this.$emit("tabPrint");
  	},
    submitAudit () {
      if (this.dataList.length == 0 ){
        this.$message({
          type:'warning',
          message :'请添加商品'
        })
        return
      }
      this.$confirm('确定要提交审核吗？', '提交审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        
        operateSubmitAudit({
          orderNum : this.synopsiData.orderNum
        }).then((res) => {
          
          if (res.data.state == 200) {
            this.$message({
              message :'提交审核成功',
              type: 'success'
            })
            this.$emit('updataApi')
          }else {
            this.$message({
              type : 'error',
              message :res.data.msg
            })
          }
        })
      }, () =>{})
    },
    
    repealRevoke () {
      
      this.$confirm('确定要撤回审核吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        }).then(() => {
          
          operateReceiptOperation({
            handleType: '3',
            orderIdList: [{
              orderNum: this.synopsiData.orderNum
            }],
            checkRemark: ''
          }).then((res) => {
              if (res.data.state == 200) {
                  this.$message({
                      message: '撤销审核成功',
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
      }, () =>{})
    },
    
    // 获取状态数据数据
    fetchSynopsiData (){
      seekReceiptRKSynopsis({
        orderNum : this.synopsiData.orderNum
      }).then((res) => {
        this.synopsiData = Object.assign({}, this.synopsiData, res.data.data)
        this.$emit('setSynopsiData', this.synopsiData)
      })
    },
    
    // 添加备注
    addRemark (data) {
      if(data != null && data != ''){
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
    
    // 打印单据
    printReceipts () {
      this.$message({
          message: '开发中',
          type: 'success'
      })
    },
    
    
    popupSubmit (data){
      switch(this.title){
        case '驳回审核':
        	if(!data){
        		this.$message({
                message: '请输入驳回理由',
                type: 'warning'
            })
        		return false;
        	}
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
    
    delOrder () {
      //console.log(1111, this.synopsiData)
      let options = {
          orderNum: this.synopsiData.orderNum
      }
      this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      }).then(() => {
          operateDeleteByOrderNumber(options).then((res) => {
              //console.log(res)
              this.$message({
                  type: 'success',
                  message: '删除成功'
              })
              this.$router.push({path: '/work/amend'}) 
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
  border-radius: 5px;
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
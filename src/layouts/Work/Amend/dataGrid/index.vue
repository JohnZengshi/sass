<template>
<div class="dg-container">
    
    <!--表头-->
   <dgridhead 
       @updetaFixedSize="updetaFixedSize" 
       @updateTabChangeData="updateSmallData">
   </dgridhead>
   
   <div class="datagrid-container" 
     :class="{[!browserType ? 'animat-scroll-firefox' : 'animat-scroll']:slipPointer}"
     ref="datagrid"
     @scroll="watchScroll($event)"
     :style="'padding-left:'+ fixedFullSize +'px'">
       
      <!--左边固定表格区-->
      <dgridBody
          :seekBarcode="seekBarcode"
          :seekFlag="seekFlag"
          :dgDataList="dgDataList"
          :synopsiData="synopsiData"
          ref="dgridfixed"
          :orderNum="orderData.orderNum"
          :smallDataList="smallDataList" 
          :selectContainer="selectContainer"
          @updataApi="updataApi"
          @updataData="updataData"
          @updataSelectContainer="updataSelectContainer"
          @updataEditApi="updataEditApi"
          @updateActiveIndex="updateActiveIndex"
          @updateActiveSelectOn="updateActiveSelectOn"
          :activeClassIndex="activeClassIndex"
          :fixedFullSize="fixedFullSize">
      </dgridBody>
   </div>
   
   <!--表尾-->
   <dgridfooter 
       :smallDataList="smallDataList" 
       ref="footer"
       :footerData="footerData"
       @setSynopsiData = "updataSynopsiData"
       :orderNum="orderData.orderNum">
   </dgridfooter>

			<!--打印模块-->
			<div style="display: none;">
				<detail-template title="修改" ref="detailTemplate" :sellList="sellList" :headerData="orderData"></detail-template>
			</div> 
</div>
</template>

<script>
import dgridhead from './dgridHeader'
import dgridBody from './dgridBody'
import dgridfooter from './dgridFooter'
import {getUpdateGoodsList} from 'Api/commonality/seek'
import datagridScroll from 'assets/js/uiScroll'
import * as configData from './config'
import * as fetch from './fetchData'
import detailTemplate from "@/components/jcp-print/bill/update/detail-template";
export default{
  components: {
    dgridhead,
    dgridBody,
    dgridfooter,
    detailTemplate,
  },
  props:['orderData','slipPointer','goodsAdd', 'seekBarcode', 'seekFlag'],
  data(){
    return {
    	sellList:{old:{},now:{}},
      dgDataList: [],
      // 页脚 修改前、后的数据
      footerData : {
        now : {},
        old: {}
      },
      configData : configData,
      
      // 左边表格固定区域默认宽度
      fixedFullSize : 290,
      
      activeSelectOnIndex : -1,
      // 当前鼠标滑过的列
      activeClassIndex: -1,
      // 小类
      smallDataList: configData.jewelryNameData,
      
      //浏览器检测
      browserType : false,
       
      synopsiData : {},
      
      selectContainer: {
        selectfIndex : -1,
        selectcIndex : -1,
        fixedfIndex : -1,
        fixedcIndex : -1
      },
      pageSize: 15
    }
  },
  watch: {
    datagridSelectData: function(){
      //console.log(this.datagridSelectData)
    },
    
    // 新增商品
    'goodsAdd.type' : function(){
      //console.log('watch:', this.goodsAdd.type)
      if (this.goodsAdd.type) this.addGoods()
    }
  },
  
  created () {
    // 简单检测浏览器 表格底部高度填充，主要对firefox进行操作
    this.$store.dispatch('checkBrowser',(type)=>{
      this.browserType = type
    })
  },
  
  methods: {
  	tabPrint(){
  		this.$refs.detailTemplate.print();
  	},
    watchScroll (el) { // 下拉加载数据
      // console.log(el)
      let scrollHeight = el.target.scrollHeight; // 元素可以滚动的高度
      let clientHeight = el.target.clientHeight; // 元素的高度
      let scrollTop = el.target.scrollTop; // 滚动了的距离
      if (clientHeight + scrollTop >= scrollHeight) {
          console.log("到底了")
          this.pageSize += 30
          this.fetchGoodList()
      }
    },
    // 获取商品列表
    fetchGoodList() {
      this.$emit('updataLoader',true)
      getUpdateGoodsList({
        page : 1,
        pageSize : this.pageSize,
        type : '3',
        objId : this.orderData.orderNum
      }).then((res) => {
        if (res.data.state == 200){
          this.dgDataList = res.data.data.rowDataList
          this.sellList = res.data.data;
          this.footerData = Object.assign({}, {
            now : res.data.data.now,
            old : res.data.data.old
          })
          this.dgDataList.forEach(f =>{
            if (f['old'] == undefined) {
              Object.assign(f, {old: {} })
            }
          })
          this.updataData(this.dgDataList)
        } else if (res.data.state == 815){ // 返回空数组
          this.dgDataList = []
        } else{
          this.$message({
            type:'error',
            message :res.data.msg
          })
          this.dgDataList = []
        }
        this.$emit('updataLoader',false)
      }).catch((res) => {
        console.log(res)
      })
    },
    
    // 更新表格固定区域宽度 需要根据配置文件动态去计算
    updetaFixedSize (size){
      this.fixedFullSize = size 
    },
    
    updataData(datalist){
      this.$emit('updataData',{
        key : 'dgDataList',
        data : datalist
      })
    },
    // 更新小类配置项数据
    updateSmallData (data) {
      this.smallDataList = data
    },
    // 更新鼠标滑过表格单元格的index值 主要用于高亮显示 此方法公用
    updateActiveIndex (index) {
      this.activeClassIndex = index
    },
    
    // 更新单据简介数据
    updataSynopsiData (data){
      this.synopsiData = data
      this.$emit('setSynopsiData', data)
    },
    
    // 当前选中的表格
    updateActiveSelectOn (parm) {
      this.$emit('updataCopyOrderObject', parm.item )
      this.activeSelectOnIndex = parm.index
    },
    
    // select下拉配置项
    updataSelectContainer (data){
      if (data) {
        this.selectContainer = Object.assign({},data)
      }
    },

    //编辑、新增功能
    updataEditApi(data){
      //编辑保存商品, 只需判断新增商品list是否为空
      debugger
      fetch.updataGoodsList({
        orderNum : this.orderData.orderNum,
        confirmType: '1',
        alterList: Array.isArray(data) ? data : [data]
      }, (res) => {
        if (res.data.state == 200) {
          this.$message({
            type:'success',
            message :'修改成功'
          })
        } else {
          this.$message({
            type:'warning',
            message :res.data.msg
          })
        }
        
        
        /* 这里主要是处理复制过程中发生编辑操作，一旦编辑成功导致复制前的数据跟编辑后的数据不能同步更新
         * 所以这里需要进行重新拷贝
         */
        if (this.activeSelectOnIndex >= 0 && this.dgDataList.length >= this.activeSelectOnIndex) {
          this.$emit('updataCopyOrderObject', this.dgDataList[this.activeSelectOnIndex] )
        }
        if(Object.keys(data).includes('certifiName')){
          this.fetchGoodList()
        }
        this.fetchGoodList()
      })
    },
    
    // 新增商品
    addGoods () {
      let tpArray = []
      let newgoodsObj = Object.assign({old:{}},{
       now : fetch.addOrderDefaultJSON 
      })
      // 把新增的商品放在数组的最前面
      tpArray.push(newgoodsObj, ...this.dgDataList)
      this.dgDataList = tpArray
      
    },
    
    // 中间件 更新API接口方法
    updataApi () {
      this.$emit('updataApi')
    },
    
    // 中间件 添加商品
    updataAdd (type) {
      this.$emit('updataAdd', type)
    }
    
  },
  
  mounted(){
    this.$nextTick(() => {
      this.fetchGoodList()
      
      // 监听滚动条跟鼠标滚轮 对页面进行上滑、下滑操作
      let datagrid = this.datagridScroll = new datagridScroll(this.$refs.datagrid)
      
      datagrid.scroll = (evt, num, wheel) => {
        // 状态栏显示 页面进行下滑
        if (num < 10 && wheel == 1) {
          this.$emit('updataSlipPointer', false)
        } else if(num >= 10 && wheel == -1) { // 状态栏隐藏 页面上滑
          this.$emit('updataSlipPointer', true)
        }
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.dg-container{
  background-color: #fff;
  min-height: 450px;
  border-radius: 10px;
}

/* 表格主容器  */
.datagrid-container{
  height: 430px;
  background-color: #fff;
 //transition: all .5s cubic-bezier(0.51, -0.04, 0.4, 0.4);
  position: relative;
  overflow: auto;

  &.animat-scroll{
    height: 600px;
  }
  
  &.animat-scroll-firefox{
    height: 550px;
  }
  
  
}


</style>

<style lang="scss">

.datagrid-select-container{
  width:140px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all .3s;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  min-height: 40px;
  border-radius: 4px;
  opacity: 1;
  visibility: visible;
  >.item{
    text-align: left;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    color: #333;
    white-space: nowrap;
    padding-left: 10px;
    border-bottom: 1px solid #f1f2f3;
    border-left: 4px solid transparent;
    cursor: pointer;
    position:relative;
    &:hover{
      background-color: #f6f7f8;
      >.child-item{
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
    &.active{
      color: #2993f8;
      border-left-color:#2993f8;
    }
    
    >.child-item{
      position: absolute;
      right: -140px;
      top: 0;
      width: 140px;
      transition: all .2s;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background-color: #fff;
      border-radius: 0 4px 4px 4px;
      
      overflow: hidden;
      max-height: 250px;
      overflow: hidden;
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transform: translateY(30px);
      >div{
        padding-left: 10px;
        height: 35px;
        line-height: 35px;
        border-left: 4px solid transparent;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border-bottom: 1px solid #f1f2f3;
        &.active{
          color: #2993f8;
          border-left-color:#2993f8;
        }
      }
      
    }
  }
  &.overflow{
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
    >.item{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.dg-select-container,.dg-select-edit-ipt{
  height: 28px;
  line-height: 28px;
  width: 80%;
  transition: all .3s;
  border-radius: 4px;
  min-width: 40px;
  border:1px solid transparent;
  cursor: pointer;
  background-color: transparent;
  text-align: center;
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
  &.active{
    border:1px solid #2993f8;
    background-color: #f4f9ff;
    &:after{
      opacity: 1;
      visibility: visible;
      transform: rotate(-180deg);
    }
  }
  &[type]{
    cursor: auto;
    box-sizing: border-box;
    margin: 0 3px;
    text-overflow:ellipsis;
    &:active,&:focus{
      border:1px solid #2993f8;
      background-color: #f4f9ff;
    }
  }
  &:hover{    
    border:1px solid #2993f8;
    background-color: #f4f9ff;
    &:after, >.el-icon-circle-close{
      opacity: 1;
      visibility: visible;
    }
  }
}
.classType {
  margin-left: 10px;
}
.dg-select-container{
  position: relative;
  // margin-left: 10px;
  &:after{
    content: "\e61c";
    font-family: "iconfont" !important;
    font-style:normal;
    position: absolute;
    transition: all .3s;
    right: 4px;
    top: 0;
    opacity: 0;
    z-index: 1;
    visibility: hidden;
  }
  >.el-icon-circle-close{
    position: absolute;
    transition: all .3s;
    right: 4px;
    top: 6px;
    z-index: 2;
    opacity: 0;
    color: #ccc;
    visibility: hidden;
    &:hover{
      color:#2993f8 ;
    }
  }
  
  &.isicon{
    &:after{
      opacity: 0;
      visibility: hidden;
    }
  }
}
</style>
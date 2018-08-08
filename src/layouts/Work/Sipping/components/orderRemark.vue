<template>
<transition name="tp-ani">
<div class="remark-container visible-remark" v-if="isRemark">
    <span class="remark" @click="remarkItem(true)">备注</span>
    
    <transition name="tp-select">
        <div class="remark-item" ref="remarkItem" v-if="isRemarkPop" v-loading="loading" element-loading-text="loading...">
           <div class="item" v-for="item in remarkDataList">
              <h5>
                  <span class="past" v-if="item.operateType ? item.operateType == 2 : false">通过</span>
                  <span class="notPast" v-if="item.operateType ? item.operateType == 1 : false">驳回</span>
                  <i  class="el-icon-circle-close" title="删除" @click="removeRemark(item)"></i>
                  {{item.content}}</h5>
              <p class="txt">
                  {{item.orderCheckRemarkManName || item.orderRemarkManName}}
                  &nbsp;&nbsp;|&nbsp;&nbsp;{{dateFormat(item.createTime)}}</p>
           </div>
        </div>
    </transition>
</div>
</transition>
</template>

<script>
import {seekReceiptRemark} from 'Api/commonality/seek'
import {operateRemarkOperation} from 'Api/commonality/operate'
export default{
  data(){
    return{
      remarkDataList: [],
      isRemark : false,
      loading : false,
      isRemarkPop : false
    }
  },
  
  props: ['orderData', 'remarkDialog', 'orderNum', 'refreshRemark'],
  watch: {
    remarkDialog (val) {
      if (val == false) {
        this.fetchRemark()
      }
    },
    refreshRemark () {
      this.fetchRemark()
    }
  },
  methods: {
    
    // 时间戳格式化
    dateFormat (parm) {
      if (parm == undefined) return ''
      let year = parm.substring(0, 4)
      let month = parm.substring(4, 6)
      let data = parm.substring(6, 8)
      let hour = parm.substring(8, 10)
      let time = parm.substring(10, 12)
      return year + "-" + month + "-" + data
    },
   
    // 获取备注
    fetchRemark (){
      this.remarkDataList = []
      this.loading = true
      seekReceiptRemark({
        orderNum: this.orderNum
      }).then((res) =>{
        let remarkData = res.data.data
        this.isRemark = remarkData.orderCheckRemarkList.length > 0 || remarkData.orderRemarkList.length > 0
        this.$emit('updateRemark', this.isRemark)
        setTimeout(() =>{
           this.loading = false
          this.remarkDataList =  remarkData.orderCheckRemarkList.concat(remarkData.orderRemarkList)
          //  this.remarkDataList.push(...remarkData.orderRemarkList)
        }, 300)
        
      })
    },
    // 删除备注
    removeRemark (item) {
      operateRemarkOperation({
        remarkId: item.id || item.checkId,
        type: '1'
      }).then((res) => {
        this.fetchRemark()
      })
    },
    
    remarkItem (type){
      if (this.isRemarkPop == type){
        this.remarkItem(false)
        return
      }
      this.isRemarkPop = type 
      this.addListener()
    },
    
    addListener(){
      if (this.isRemarkPop) {
        document.addEventListener('click', this.bindEvents, false)
      }else{
        document.removeEventListener('click', this.bindEvents, false)
      }
    },
    
    bindEvents(evt){
      if (
        !this.isParents(evt.target,'visible-remark') &&
        evt.target !== this.$refs.remarkItem){
        this.remarkItem(false) 
      }
    },
    
    isParents (el, parentClass){
      let elem = el.parentElement || el.parentNode
      
      if (elem.nodeName === 'BODY'){
        return false
      }
      // 递归
      if(!elem.className.split(' ').includes(parentClass)){
        return this.isParents(elem, parentClass)
      }else{
        return true
      }
    }
  },
  
  mounted(){
    this.$nextTick(() => {
      this.fetchRemark()  
    })
  }
}
</script>

<style lang="scss" scoped>
.remark-container{
  position: absolute;
  user-select: none;
  right: -29px;
  top: 50%;
  transform: translateY(-42.5px);
  width: 29px;
  z-index: 211;
  min-height: 85px;

  >.remark{
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 85px;
    background-color: #ffba42;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    font-size: 14px;
    line-height: 30px;
    padding:12px 5px;
    cursor:pointer;
  }
}

.remark-item{
  border:1px solid #ffba42;
  border-radius: 0 3px 3px 3px;
  height: 250px;
  width: 230px;
  overflow: hidden;
  overflow-y: auto;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 85px;
  z-index: 10;
  padding: 20px 0;
  font-size: 14px;
  box-shadow: 0 5px 14px #ccc;
  color: #d6d6d6;
  
  >.item{
    padding: 0 23px;
    >h5{
      color: #555;
      line-height: 20px;
      padding-bottom: 5px;
      position:relative;
      >i{
        position: absolute;
        left: -10px;
        top: 3px;
        font-size: 14px;
        color: #d6d6d6;
        transition: all .3s;
        visibility: hidden;
        opacity: 0;
        cursor: pointer;
        &:hover{
          color: #999;
          transform: rotate(-90deg);
        }
      }
      .past{
        color: #2993f8;
        margin-right: 5px;
      }
      .notPast{
        color: #ff544a;
        margin-right: 5px;
      }
    }
    &:hover{
      .el-icon-circle-close{
        visibility: visible;
        opacity: 1;
        left: -18px;
      }
    }
    >.txt{
      text-align: right;
      padding-bottom:11px;
      border-bottom:1px solid #eaeaea;
    }
    margin-bottom: 12px;
    
    &:last-child{
      margin-bottom: 0;
      .txt{
        border-bottom-width: 0;
      }
    }
  }
}
</style>

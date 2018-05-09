<template>
<!--表头-->
<div class="dg-thead" :style="'padding-left:'+ fixedFullSize +'px'">
  <div class="dg-fixed-data" :style="'width:'+ fixedFullSize +'px'">
    <span v-for="k in fixedData" :key="k.id" :style="'width:'+k.width+'px'">{{k.text}}</span>
  </div>
  <div class="dg-tab">
      <!--大类-->
      <div class="dg-big-container" ref="bigContainer">
         <i  :style="'left:' + moveCoordRect.left + 'px;width:'+ moveCoordRect.width +'px;'"><!--上划线--></i>
         <span 
             v-for="k,i in bigTitleData" 
             :class="bigTabIndex == i ? 'active' : ''" 
             @click="changeTab(i, k, $event)"
             @mousemove="elemUImove(k.width, $event)"
             @mouseleave="elemUIleave"
             :key="k.id" 
             :style="'width:'+ k.width +'px'">{{k.text}}</span>
      </div>
      <!--小类-->
      <div class="dg-small-container">
          <span 
              v-for="k in smallDataList" 
              :key="k.id" 
              :style="'width:'+k.width+'px'">
          {{k.text}} <i v-if="k.unit !=''">{{k.unit}}</i>
          </span>
      </div>
  </div>
</div>
</template>

<script>
import * as configData from './config'
export default{
  data(){
    return{
      fixedData: configData.fixedData,
      fixedFullSize : 290,
      
      // 大类
      bigTitleData : configData.bigTitleData,
      // 切换 Index
      bigTabIndex : 0, 
      bigelemCurRect: 0,
      
      // 小类 默认为首饰名称
      smallDataList: configData.jewelryNameData,
      
      moveCoordRect : {
        left: 0,
        width: 0
      }  
    }
  },
  
  created (){
    
    if (this.fixedData) {
      let tp = 0
      this.fixedData.filter( f => tp += f.width)
      this.fixedFullSize = tp
      this.$emit('updetaFixedSize', tp)
    }
  },
  
  methods: {
    //大类切换
    changeTab (index, item, evt){
      this.bigTabIndex = index
      this.elemUImove(item.width, evt)
      this.$set(this.$data, 'smallDataList', configData[item.type])
      this.$emit('updateTabChangeData', this.smallDataList)
    },
    
    elemUImove (wd, evt){
      let left = 0
      if (this.$refs.bigContainer) {
        left = this.$refs.bigContainer.getBoundingClientRect().left
      }
      this.$set(this.$data,'moveCoordRect',{
         left : evt.target.getBoundingClientRect().left - left,
         width : wd
      })
      if (evt.type == 'click') {
        this.bigelemCurRect = evt.target.getBoundingClientRect().left - left
      }
    },
    
    elemUIleave () {
      this.$set(this.$data,'moveCoordRect',{
        left : this.bigelemCurRect,
        width : 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* */
  .dg-thead{
    height: 78px;
    position: relative;
    padding-left: 292px;
    background-color: #f5f5f5;
    border-bottom: 2px solid #e7e7e7;
  }
  
  /* 固定的数据  */
  .dg-fixed-data{
    height: 78px;
    width: 292px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    border-right: 2px solid #e7e7e7;
    >span{
      font-size: 14px;
      font-weight: bold;
      float: left;
      width: 25%;
      color: #666;
      line-height: 78px;
      text-align: center;
      &.order{
        width: 50px;
      }
    }
  }
  
  /* 大小类 tab切换 */
  .dg-tab{
    height: 78px;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    >.dg-big-container{
      height: 40px;
      position: relative;
      background-color: #f5f5f5;
      line-height: 40px;
      border-bottom: 2px solid #e7e7e7;
      >span{
        font-size: 14px;
        font-weight: bold;
        float: left;
        position: relative;
        cursor: pointer;
        width: 25%;
        color: #999;
        transition: all .3s;
        border-top: 4px solid transparent;
        line-height: 36px;
        text-align: center;
        &:hover{
          color: #2993f8;
        }
        &.active{
          color: #2993f8;
          border-top: 4px solid #2993f8;
          background-color: #fff;
        }
      }
      
      >i{
        display: block;
        height: 4px;
        background-color: #2993f8;
        width: 90px;
        transition: all .3s;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    
    /* 小类样式 */
   .dg-small-container{
     height: 38px;
     display: flex;
     >span{
        display: block;
        white-space: nowrap;
        font-size: 12px;
        font-weight: bold;
        float: left;
        color: #999;
        line-height: 38px;
        text-align: center;
        >i{
          font-style: normal;
          font-size: 10px;
        }
     }
   }
  }
</style>
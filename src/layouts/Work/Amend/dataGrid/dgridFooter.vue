<template>
<!--表尾-->
<div class="dg-footer"> 
    <div class="tr now">
      <template v-for="k in footerConfigData">
        <span v-if="k.type == 'productTypeName'" class="td" :style="'width:'+k.width+'px'"><!--修改前--></span>
        <span v-else class="td" :style="'width:'+ k.width + 'px'">{{footerData.now != undefined ? footerData.now[k.total] : ''}}</span>
        <!-- <span>{{k.total}}</span> -->
        <!-- <span>{{footerData.now[k.total]}}</span> -->
        <!-- <span>{{k}}</span> -->
      </template>
    </div>
    <div class="tr old">
      <template v-for="k in footerConfigData">
        <span v-if="k.type == 'productTypeName'" class="td" :style="'width:' + k.width + 'px'"><!--修改后--></span>
        <span v-else-if="k.total == 'totalNum'" class="td bold" :style="'width:'+k.width+'px'">合计</span>
        <span v-else class="td bold" :style="'width:'+k.width+'px'">{{footerData.old != undefined ? footerData.old[k.total] : ''}}</span>
      </template>
    </div>
</div>
</template>

<script>
import {fixedData} from './config'
import {seekReceiptXGSynopsis, getUpdateGoodsList} from 'Api/commonality/seek'
export default {
  name : 'footer',
  data () {
    return{
      footerConfigData: fixedData,
      synopsiData : {}
    }
  },
  props: ['smallDataList','orderNum','footerData'],
  watch: {
    smallDataList: function(){
      let tpData = []
      
      // 更新数据并对数组进行合并
      if (this.smallDataList.length > 0){
        tpData.push(...fixedData, ...this.smallDataList)
        this.$set(this, 'footerConfigData',tpData)
      }
    },
    footerData (val) {
      console.log(val)
    }
  },
  methods: {
    // 获取表尾合计数据
    fetchFootData (){
      seekReceiptXGSynopsis({
        orderNum : this.orderNum
      }).then((res) => {
        this.synopsiData = res.data.data
        this.$emit('setSynopsiData', this.synopsiData)
      })
    },
    // _getUpdateGoodsList () {
    //   let options = {
    //     type: 3,
    //     objId: this.orderNum,
    //   }
    //   getUpdateGoodsList().then((res) => {

    //   }, (res) => {

    //   })
    // }
  },
  created () {
    console.log(this.footerData)
  },
  mounted(){
    this.$nextTick(() => {
      console.log(this.footerData)
      console.log(this.footerData.now)
      console.log(this.footerData.old)
      this.fetchFootData()
    })
  }
}
</script>

<style lang="scss" scoped>
.dg-footer{
  background-color: #2993f8;
  color: #fff;
  height: 60px;
  border-radius: 0 0 10px 10px;
  
  >.tr{
    height: 20px; 
    >.td{
      float: left;
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      height: 20px;
      &.bold{
        font-weight: bold;
      }
    }
  }
  
}
</style>
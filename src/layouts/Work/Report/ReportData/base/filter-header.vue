<template>
  <div class="report-filter-height-main">

    <!-- 成品旧料 -->
    <cut-bg v-if="isOld" class="ml-10" :showList="madeUpList" :current="filterData.productClass" @pitchOn="madeUpOnProductClass"></cut-bg>
    

    <cut-segmentation class="ml-10" :showList="cutSegmentationList" :current="segmentationFilter.type" @pitchOn="madeUpOn"></cut-segmentation>

   <!--  <div v-show="specialItem" class="cost-btn ml-10" v-if="isBuy && filterData.productClass != '1'" :title="isBuyBack?'隐藏退换、回收、购买、实收' : '显示退换、回收、购买、实收'" @click="choseBuyBack" :class="{active: isBuyBack}"> -->
    <div v-show="specialItem" class="cost-btn ml-10" v-if="isBuy && segmentationFilter.type != '1'" :title="isBuyBack?'隐藏购买、实收' : '显示购买、实收'" @click="choseBuyBack" :class="{active: isBuyBack}">
      回购额
    </div>

    <div v-show="specialItem" class="cost-btn ml-10" v-if="isShowCost == 'Y'" :title="tabSwitch?'关闭成本' : '开启成本'" @click="choseMenu" :class="{active: tabSwitch}">
      专列项
    </div>
    
    <div class="cost-btn ml-10" v-if="isPosition" :title="positionSwitch?'取消位置' : '选择位置'" @click="chosePosition" :class="{active: positionSwitch}">
      位置
    </div>

  </div>
</template>
<script>
  import cutBg from "base/cut/cut-bg";
  import cutSegmentation from "base/cut/cut-segmentation";
  import {seekSettingUserRole} from "Api/commonality/seek"
  export default {
    props: ['isOld', 'isBuy', 'specialItem', 'customList', 'type', 'isPosition'],
    components:{
      cutBg,
      cutSegmentation
    },
    data () {
      return {
        filterData: {
          productClass: '1' // 成品旧料
        },
        segmentationFilter: { // 主类切换
          type: 2
        },
        tabSwitch: false, // 专列项
        isBuyBack: false, // 回购额
        positionSwitch: false, // 位置
        isShowCost: '',
        madeUpList: [
            {
                name: '成品',
                id: '1'
            },
            {
                name: '旧料',
                id: '2'
            }
        ],
        cutSegmentationList: [
            {
                name: '智能分类',
                id: 2
            },
            {
                name: '产品分类',
                id: 3
            }
        ]
      }
    },
    created () {
      this.settingUserRole()
      if (this.customList) {
        this.cutSegmentationList = this.customList
      }
      if (this.type) {
        this.segmentationFilter.type = this.type
      }
    },
    methods: {
        chosePosition () {
          this.positionSwitch = !this.positionSwitch
          this.$emit('chosePosition', this.positionSwitch)
        },
        madeUpOnProductClass (parm) {
          this.filterData.productClass = parm.id
          this.$emit('complate', Object.assign({}, this.filterData, this.segmentationFilter))
        },
        madeUpOn (parm) {
          let datas = parm
          this.segmentationFilter = parm
          // isRefresh 刷新
          this.$emit('complate', Object.assign({}, this.filterData, {page: '1'}, this.segmentationFilter, {noRefresh: true}))
        },
        choseMenu () {
          this.tabSwitch = !this.tabSwitch
          this.$emit('reportSwitch', this.tabSwitch)
        },
        choseBuyBack () {
          this.isBuyBack = !this.isBuyBack
          this.$emit('choseBuyBack', this.isBuyBack)
        },
        settingUserRole () { // 用户查看成本权限
          let options = {
            userId: sessionStorage.getItem('id')
          }
          seekSettingUserRole(options).then((res) => {
            if (res.data.state == 200) {
              this.isShowCost = res.data.data.costFlag
            }
          })
        },
    }
  }
</script>

<style lang="scss">
.report-filter-height-main{
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  &.fl-t10{
    margin-top: 10px;
    float: right;
    margin-right: 10px;
  }
  .cost-btn{
    display: inline-block;
    font-size: 12px;
    line-height: 12px;
    font-weight: bold;
    padding: 5px 8px;
    cursor: pointer;
    border-radius: 5px;
    transition: all .3s;
    border: 1px solid #2993f8;
    vertical-align: top;
    background-color: #e0ecf7;
    &.active {
      color: #fff;
      background: #2993f8;
    }
  }
  .ml-10{
    margin-left: 10px;
  }
}
</style>
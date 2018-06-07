<template>
  <div class="report-filter-height-main">
    <cut-bg class="ml-10" :showList="madeUpList" :current="dataGridOptions.productClass" @pitchOn="madeUpOn"></cut-bg>

    <cut-segmentation class="ml-10" :showList="cutSegmentationList" :current="dataGridOptions.productClass" @pitchOn="madeUpOn"></cut-segmentation>

    <div class="cost-btn ml-10" v-if="isShowCost == 'Y'" :title="tabSwitch?'关闭成本' : '开启成本'" @click="choseMenu" :class="{active: tabSwitch}">
      专列项
    </div>
    
  </div>
</template>
<script>
  import cutBg from "base/cut/cut-bg";
  import cutSegmentation from "base/cut/cut-segmentation";
  import {seekSettingUserRole} from "Api/commonality/seek"
  export default {
    components:{
      cutBg,
      cutSegmentation
    },
    data () {
      return {
        tabSwitch: false,
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
                id: '1'
            },
            {
                name: '产品分类',
                id: '2'
            }
        ],
        dataGridOptions: {
          productClass: ''
        }
      }
    },
    created () {
      this.settingUserRole()
    },
    methods: {
        madeUpOn (parm) {
            this.dataGridOptions.productClass = parm.id
        },
        choseMenu () {
          this.tabSwitch = !this.tabSwitch
          this.$emit('reportSwitch', this.tabSwitch)
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
  margin-top: 10px;
  float: right;
  font-size: 0;
  .cost-btn{
    display: inline-block;
    font-size: 12px;
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
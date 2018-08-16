<!-- 高级搜索 -->
<template>
  <div class="m-m-advanced-search">
    <div class="item-box" v-for="item in showList">

      <new-down-menu
          class="w-110 ml-10"
          ref="memberRankBox"
          :isSolid="true"
          :titleInfo="item.nameT"
          :showList="advancedSearchPreposition"
          @changeData="changeName"
          @clearInfo="clearMemberRank"
      ></new-down-menu>

      <new-down-menu
          class="w-70 ml-10"
          ref="memberRankBox"
          :isSolid="true"
          :titleInfo="item.nameT"
          :showList="advancedSearchInclude"
          @changeData="changeName"
          @clearInfo="clearMemberRank"
      ></new-down-menu>

      <input class="xj-input" type="text">

    </div>
  </div>
</template>
<script>
import newDownMenu from 'base/menu/new-down-menu'
const dataList = require('./data.js')
export default {
  components: {
    newDownMenu
  },
  data () {
    return {
      filterCondition: {
        gradeName: ''
      },
      advancedSearchPreposition: dataList.advancedSearchPreposition,
      advancedSearchInclude: dataList.advancedSearchInclude,
      showList: [
        {
          name: '条件一',
          nameT: '100',
          nameB: '333'
        },
        {
          name: '条件一',
          nameT: '100',
          nameB: '333'
        }
      ]
    }
  },
  methods: {
    changeName () {

    },
    clearMemberRank () {

    }
  }
}
</script>
<style lang="scss">
.m-m-advanced-search{
  border: 1px solid red;
  .item-box{
    width: 48%;
  }
  .w-70{
    width: 70px;
  }
}
</style>
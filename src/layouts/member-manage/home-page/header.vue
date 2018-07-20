<template>
  <div class="m-m-home-page-header-main">
    
      <router-link class="fr ml-10" :to="{path: '/memberManage/compileTemplate', query: {shopId: filterData.shopId}}">设置</router-link>
      
      <navSegmentation class="fr ml-10" :showList="navData" :current="filterData.current" @pitchOn="pitchOn"></navSegmentation>

      <down-menu
        class="fr"
        :isSolid="true"
        :titleInfo="filterData.shopName ? filterData.shopName : '店铺名称'"
        :showList="shopList"
        :nameKey="'shopName'"
        @changeData="changeShop"
        @clearInfo="clearShop"
      ></down-menu>

  </div>
</template>
<script>
  import navSegmentation from 'base/cut/nav-segmentation'
  import downMenu from 'base/menu/new-down-menu'
  import {seekGetShopListByCo} from 'Api/commonality/seek'
  export default {
    components: {
      navSegmentation,
      downMenu
    },
    data () {
      return {
        filterData: {
          current: "1",
          shopName: '',
          shopId: ''
        },
        navData: [
          {
            name: '会员',
            id: '1'
          },
          {
            name: '积分',
            id: '2'
          },
          {
            name: '跟进',
            id: '3'
          },
          {
            name: '推送',
            id: '4'
          }
        ],
        shopList: [] 
      }
    },
    created () {
      this._seekGetShopListByCo()
    },
    methods: {
      pitchOn (parm) {
        this.current = parm.id
      },
      changeShop (parm) {
        Object.assign(this.filterData, parm)
        this.$emit("filterData", this.filterData)
      },
      clearShop (parm) {
        this.filterData.shopName = ''
        this.filterData.shopId = ''
        this.$emit("filterData", this.filterData)
      },
      _seekGetShopListByCo() { // 店铺列表
        let options = {
          page: 1,
          pageSize: 0,
          type: 1,
        };
        seekGetShopListByCo(options).then((res) => {
          if(res.data.state == 200) {
            this.shopList = res.data.data.shopList
            this.changeShop(this.shopList[0])
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        });
      },
    }
  }
</script>
<style lang="scss">
.m-m-home-page-header-main{
  min-height: 50px;
  padding: 10px;
  .ml-10{
    margin-left: 10px;
  }
}
</style>
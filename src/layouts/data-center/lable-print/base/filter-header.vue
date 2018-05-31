<template>
  <div class="d-c-filter-header-main">
    <div class="operate-bar-bottom">
      <div @click="littleBatch = true" class="search-block">单据搜索<i class="iconfont icon-sousuo"></i></div>

      <div class="class-btn-wrap">

          <dropDownColums
              :propsList="proList"
              dataType="1"
              titleData="产品类别"
              @dataBack="dataBack"
          >
          </dropDownColums>

          <dropDownColums
              :propsList="conditionList"
              dataType="2"
              titleData="成色名称"
              @dataBack="dataBack"
          >
          </dropDownColums>

          <dropDownColums
              :propsList="jewelList"
              dataType="3"
              titleData="宝石名称"
              @dataBack="dataBack"
          >
          </dropDownColums>

          <dropDownColums
              :propsList="jewelryList"
              dataType="4"
              titleData="首饰类别"
              @dataBack="dataBack"
          >
          </dropDownColums>

      </div>

      <div class="drop-block">
<!--           <DropDownMenu
              titleName="商品属性"
              dataType="属性"
              :propList="productTypeList"
              @dropReturn="dropReturn"
              @clearInfo="clearInfo"
          >
          </DropDownMenu> -->
      </div>
    </div>
  </div>
</template>
<script>
import {getProductTypeList, seekProductClassList} from "Api/commonality/seek"
import dropDownColums from '@/components/work/dropDownColums'
import DropDownMenu from '@/components/template/DropDownMenu'
export default {
  components: {
    dropDownColums,
    DropDownMenu
  },
  data () {
    return {
      littleBatch: false,
      isLoading: false,
      proList: [],
      conditionList: [], // 成色列表
      jewelList: [], // 宝石列表
      jewelryList: [], // 首饰列表
    }
  },
  methods: {
    dataBack () {

    },
    seekProductTypeList () { // 产品类别列表
      getProductTypeList().then((res) => {
        if (res.data.state == 200) {
          this.isLoading = false
          this.proList = res.data.data.list
        }
      })
    },
    productClassList (type) { // 商品大小类列表
        let options = {
            type: type
        }
        seekProductClassList(options).then((res) => {
            if (res.data.state == 200) {
                this.isLoading = false
                if (type == 1) {
                    this.conditionList = res.data.data.list
                } else if (type == 2) {
                    this.jewelList = res.data.data.list
                } else {
                    this.jewelryList = res.data.data.list
                }
            }
        })
    },
  }
}
</script>
<style lang="scss">
.batch-main .batch-page-one .operate-bar-bottom .batch-time-wrap:hover{
    border: 1px solid #2993f8 !important;
}
.batch-main .batch-page-one .operate-bar-bottom .batch-time-wrap:focus{
    border: 1px solid #2993f8 !important;
}
.d-c-filter-header-main{
  border: 1px solid red;
  .batch-page-two {
      .operate-bar-bottom {
          height: 28px;
          margin-bottom: 25px;
          .search-block {
              width: 118px;
              height: 28px;
              border: 1px solid #2993f8;
              border-radius: 4px;
              color:#2993f8;
              padding-left: 16px;
              font-size: 12px;
              line-height: 26px;
              float: left;
              margin-right: 16px;
              cursor: pointer;
              i {
                  font-size: 12px;
                  float: right;
                  color:#dadada;
                  margin-right: 8px;
              }
          }
          .class-btn-wrap {
              width: 346px;
              height: 28px;
              border-radius: 4px;
              border: 1px solid #d6d6d6;
              float: left;
              margin-right: 16px;
          }
          .drop-block {
              width: 90px;
              height: 28px;
              border-radius: 4px;
              border: 1px solid #d6d6d6;
              float: left;
              margin-right: 16px;
              text-align: center;
              .title-name {
                  display: block;
                  width: 100%;
                  height: 100%;
              }
              .dropDown-wrap {
                  height: 26px;
                  &:hover {
                      color:#666;
                      background:#fff;
                  }
                  .title-name {
                      height: 26px;
                  }
              }
          }
          .range-box {
              float: left;
              margin-left: 16px;
              width: 168px;
              height: 28px;
              border-radius: 4px;
              border: 1px solid #d6d6d6;
              padding-left: 20px;
              input {
                  width: 65px;
                  height: 100%;
                  float: left;
                  text-align: center;
              }
              span {
                  float: left;
                  margin: 0 4px;
                  line-height: 26px;
              }
          }
      }
      .table-main {
          width: 100%;
          height: 440px;
          overflow-y: auto;
          ul {
              li {
                  width: 100%;
                  height: 44px;
                  padding-right:20px; 
                  &:hover{
                      background-color: #ededed;
                  }
                  .list {
                      //line-height: 44px;
                      height: 44px;
                      div {
                          margin-top: 13px;
                          float: left;
                          height: 14px;
                          text-align: center;
                          line-height: 14px;
                      }
                      
                  }
                  .left-list {
                      float: left;
                      div:nth-child(1) {
                          min-width: 30px;
                      }
                      div:nth-child(2) {
                          min-width: 120px;
                      }
                      div:nth-child(3) {
                          min-width: 160px;
                      }
                      div:nth-child(4) {
                          min-width: 74px;
                          border-right: 1px solid #d6d6d6;
                      }
                      div:nth-child(5) {
                          min-width: 95px;
                      }
                      div:nth-child(6) {
                         // width: 30px;
                      }
                  }
                  .right-list {
                      float: right;
                      div:nth-child(1) {
                          width: 80px;
                      }
                      div:nth-child(2) {
                          width: 102px;
                          border-left: 1px solid #d6d6d6;
                          //border-right: 1px solid #d6d6d6;
                      }
                      div:nth-child(3) {
                          width: 18px;
                          height: 18px;
                          margin: 0;
                          line-height: 44px;
                          margin-left: 70px;
                      }
                  }

              }
          }
      }
  }
}
</style>

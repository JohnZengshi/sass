<!-- 常用的过滤组合 -->
<template>
  <div class="combination-drop-down-colums-wrap">

      <dropDownColums
          ref="productTypeIdWrap"
          :propsList="proList"
          :keyName="'productTypeId'"
          titleData="产品类别"
          @dataBack="dataBack"
      >
      </dropDownColums>

      <dropDownColums
          ref="colourIdWrap"
          :propsList="conditionList"
          :keyName="'colourId'"
          titleData="成色名称"
          @dataBack="dataBack"
      >
      </dropDownColums>

      <dropDownColums
          ref="jeweIdWrap"
          :propsList="jewelList"
          :keyName="'jeweId'"
          titleData="宝石名称"
          @dataBack="dataBack"
      >
      </dropDownColums>

      <dropDownColums
          ref="jewelryIdWrap"
          :propsList="jewelryList"
          :keyName="'jewelryId'"
          titleData="首饰类别"
          @dataBack="dataBack"
      >
      </dropDownColums>

  </div>
</template>
<script>
import {getProductTypeList, seekProductClassList} from "Api/commonality/seek"
import dropDownColums from 'base/menu/drop-down-colums'
export default {
  components: {
    dropDownColums
  },
  data () {
    return {
      filterCondition: {
        productTypeList: [],
        colourList: [],
        jeweList: [],
        jewelryList: []
      },
      proList: [],
      conditionList: [], // 成色列表
      jewelList: [], // 宝石列表
      jewelryList: [], // 首饰列表
    }
  },
  created () {
    this.seekProductTypeList()
    this.productClassList(1)
    this.productClassList(2)
    this.productClassList(3)
  },
  methods: {
    initData (parm) {
      this.$refs.productTypeIdWrap.initData(parm.productTypeId)
      this.$refs.colourIdWrap.initData(parm.colourId)
      this.$refs.jeweIdWrap.initData(parm.jeweId)
      this.$refs.jewelryIdWrap.initData(parm.jewelryId)   
    },
    reset () {
      this.filterCondition.productTypeList = []
      this.filterCondition.colourList = []
      this.filterCondition.jeweList = []
      this.filterCondition.jewelryList = []
      this.$refs.productTypeIdWrap.reset()
      this.$refs.colourIdWrap.reset()
      this.$refs.jeweIdWrap.reset()
      this.$refs.jewelryIdWrap.reset()
      this.$emit('resetData')
    },
    dataBack (parm) {
      switch (parm.keyName) {
        case 'productTypeId':
          this.filterCondition.productTypeList = this.filterSeekData(parm.samllList, 'productTypeId')
          break
        case 'colourId':
          this.filterCondition.colourList = this.filterSeekData(parm.samllList, 'colourId')
          break
        case 'jeweId':
          this.filterCondition.jeweList = this.filterSeekData(parm.samllList, 'jeweId')
          break
        case 'jewelryId':
          this.filterCondition.jewelryList = this.filterSeekData(parm.samllList, 'jewelryId')
          break
      }
      this.$emit('dataBack', this.filterCondition)
    },
    seekProductTypeList () { // 产品类别列表
      getProductTypeList().then((res) => {
        if (res.data.state == 200) {
          this.isLoading = false
          let datas = res.data.data.list
          for (let i of datas) {
            i.id = i.classesType
            i.name = i.classesName
            i.childrenList = i.typeList
            for (let j of i.childrenList) {
              j.name = j.classesName
              j.id = j.classesId
            }
          }
          this.proList = datas
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
                let datas =  res.data.data.list
                for (let i of datas) {
                  i.id = i.classesId
                  i.name = i.classesName
                  for (let j of i.childrenList) {
                    j.name = j.classesName
                    j.id = j.classesId
                  }
                }
                if (type == 1) {
                    this.conditionList = datas
                } else if (type == 2) {
                    this.jewelList = datas
                } else {
                    this.jewelryList = datas
                }
            }
        })
    },
    formattingData (keyName, parm) {
      switch (keyName) {
        case 'productTypeId':
          this.filterCondition.productTypeList = this.filterSeekData(datas.productTypeId, 'productTypeId')
          break
        case 'colourId':
          this.filterCondition.colourList = this.filterSeekData(datas.colourId, 'colourId')
          break
        case 'jeweId':
          this.filterCondition.jeweList = this.filterSeekData(datas.jeweId, 'jeweId')
          break
        case 'jewelryId':
          this.filterCondition.jewelryList = this.filterSeekData(datas.jewelryId, 'jewelryId')
          break
      }
        // switch (keyName) {
        //   case 'productTypeId'
        //     let datas = []
        //     for 
        //     this.filterCondition.productTypeList = 
        //     break
        //     productTypeList: [],
        // colourList: [],
        // jeweList: [],
        // jewelryList: []
        // }
        // 产品类别
        if (datas.productTypeId) {
          if (datas.productTypeId.length) {
            datas.productTypeList = this.filterSeekData(datas.productTypeId, 'productTypeId')
            delete datas.productTypeId
          } else {
            delete datas.productTypeId
          }
        }
        // 成色名称
        if (datas.colourId) {
          if (datas.colourId.length) {
            datas.colourList = this.filterSeekData(datas.colourId, 'colourId')
            delete datas.colourId
          } else {
            delete datas.colourId
          }
        }
        // 宝石名称
        if (datas.jeweId) {
          if (datas.jeweId.length) {
            datas.jeweList = this.filterSeekData(datas.jeweId, 'jeweId')
            delete datas.jeweId
          } else {
            delete datas.jeweId
          }
        }
        // 产品类别
        if (datas.jewelryId) {
          if (datas.jewelryId.length) {
            datas.jewelryList = this.filterSeekData(datas.jewelryId, 'jewelryId')
            delete datas.jewelryId
          } else {
            delete datas.jewelryId
          }
        }
      // let datas = []
      // for (let i of parm) {
      //   datas.push({
      //     [keyName]: i
      //   })
      // }
      // this.filterCondition[keyName] = datas
    },
    filterSeekData (parm, keyName) {
      let datas = []
      for (let i of parm) {
        datas.push({
          [keyName]: i
        })
      }
      return datas
    },
    // 格式化数据
    formattingData (parm) {
        let datas = parm
        // 产品类别
        if (datas.productTypeId) {
          if (datas.productTypeId.length) {
            datas.productTypeList = this.filterSeekData(datas.productTypeId, 'productTypeId')
            delete datas.productTypeId
          } else {
            delete datas.productTypeId
          }
        }
        // 成色名称
        if (datas.colourId) {
          if (datas.colourId.length) {
            datas.colourList = this.filterSeekData(datas.colourId, 'colourId')
            delete datas.colourId
          } else {
            delete datas.colourId
          }
        }
        // 宝石名称
        if (datas.jeweId) {
          if (datas.jeweId.length) {
            datas.jeweList = this.filterSeekData(datas.jeweId, 'jeweId')
            delete datas.jeweId
          } else {
            delete datas.jeweId
          }
        }
        // 产品类别
        if (datas.jewelryId) {
          if (datas.jewelryId.length) {
            datas.jewelryList = this.filterSeekData(datas.jewelryId, 'jewelryId')
            delete datas.jewelryId
          } else {
            delete datas.jewelryId
          }
        }
        // 单据id
        if (datas.newOrderId) {
          if (datas.newOrderId.length) {
            datas.newOrderList = this.filterSeekData(datas.newOrderId, 'newOrderId')
            delete datas.newOrderId
          } else {
            delete datas.newOrderId
          }
        }
        // 库位id
        if (datas.storageId) {
          if (datas.storageId.length) {
            datas.storageList = this.filterSeekData(datas.storageId, 'storageId')
            delete datas.storageId
          } else {
            delete datas.storageId
          }
        }
        // 店铺id
        if (datas.shopId) {
          if (datas.shopId.length) {
            datas.shopList = this.filterSeekData(datas.shopId, 'shopId')
            delete datas.shopId
          } else {
            delete datas.shopId
          }
        }
        // 当前状态
        if (datas.productStatus) {
          if (datas.productStatus.length) {
            datas.productStatusList = this.filterSeekData(datas.productStatus, 'productStatus')
            delete datas.productStatus
          } else {
            delete datas.productStatus
          }
        }
        return datas
    },
  }
}
</script>
<style>
.combination-drop-down-colums-wrap {
/*  width: 346px;*/
  height: 28px;
  vertical-align: top;
  padding-left: 4px;
  border-radius: 4px;
  border: 1px solid #d6d6d6;
  display: inline-block;
  margin-left: 10px;
}
</style>
<template>
  <div class="finished-product-main">
    <div class="finished-product-header">
      <div class="header-left">
        <span>旧料</span>
      </div>
      <div class="header-right">
        <div class="finished-change-wrap cascader-w100-h28">
          <!-- <el-cascader 
            :options="productCategory" 
            v-model="productCategoryType" 
            clearable  
            :props = "categoryProps" 
            :show-all-levels="false" 
            placeholder="产品类别" 
            @clear = "callProductCategory"
            @change = "callProductCategory" 
            expand-trigger="hover" 
            class="selet_category">
          </el-cascader> -->
          <Cascade
              :propList="productCategory"
              titleName="产品类别"
              @clear = "callProductCategory"
              @dropReturn = "changeProductClass"
          >
          </Cascade>
        </div>
        <ul>
          <li class="select-w80-h28">
            <!-- <el-dropdown class="selected_dropdown repertorySelected"  :class="bigClass.name =='' ? 'placeholder' : ''">
              <span class="el-dropdown-link">
                  {{bigClass.name =='' ? '成色大类' : bigClass.name}}
              </span>
              <i class="iconfont icon-xiala" v-if="bigClass.name ==''"></i>
              <i class="el-icon-circle-close" @click="clearBigClass" title="清除" v-else></i>
              <el-dropdown-menu slot="dropdown" class="selected_dropdown_item">
                <div class="max-selected-item">
                    <el-dropdown-item 
                        v-for="item in productClassList" 
                        :class="bigClass.name == item.classesName ? 'active' : ''"
                        @click.native="changeBigClass(item)">
                        {{item.classesName}}
                    </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown> -->
            <DropDownMenu
                class="selected_dropdown"
                titleName="成色大类"
                dataType="成色"
                :propList="productClassList"
                @dropReturn="changeBigClass"
                @clearInfo="clearBigClass"
            >
            </DropDownMenu>
            <!--<el-select ref="repositoryLable" @clear = "clearBigClass" style="vertical-align: middle;" v-model="bigClass.id" clearable placeholder="成色大类">
              <el-option     
                v-for="item in productClassList"
                @click.native="changeBigClass(item)"

                :label="item.classesName"
                :value="item.classesId">
              </el-option>
            </el-select>-->
          </li>
          <li class="select-w80-h28" v-show="smallClassList.length">
              <!-- <el-dropdown class="selected_dropdown repertorySelected"  :class="smallClass.name =='' ? 'placeholder' : ''">
              <span class="el-dropdown-link">
                  {{smallClass.name =='' ? '成色小类' : smallClass.name}}
              </span>
              <i class="iconfont icon-xiala" v-if="smallClass.name ==''"></i>
              <i class="el-icon-circle-close" @click="changeSmallClass" title="清除" v-else></i>
              <el-dropdown-menu slot="dropdown" class="selected_dropdown_item">
                <div class="max-selected-item">
                    <el-dropdown-item 
                        v-for="item in smallClassList" 
                        :class="smallClass.name == item.classesName ? 'active' : ''"
                        @click.native="changeSmallClass(item)">
                        {{item.classesName}}
                    </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown> -->
            <DropDownMenu
                class="selected_dropdown"
                titleName="成色小类"
                dataType="成色"
                :propList="smallClassList"
                @dropReturn="changeSmallClass"
                @clearInfo="changeSmallClass"
            >
            </DropDownMenu>
            <!--<el-select ref="shopLable" style="vertical-align: middle;" v-model="smallClass.id"  clearable placeholder="成色小类">
              <el-option     
                v-for="item in smallClassList"
                @click.native="_seekOldMaterial"
                :label="item.classesName"
                :value="item.classesId">
              </el-option>
            </el-select>-->
          </li>
        </ul>
        <div v-if="bigClass.id != '' || this.productCategoryType.length != 0" class="class-btn" @click="cutType">
          <i :class="{actions: changeType == 'Y'}">
            <img src="./../../assets/img/ok.png">
          </i>
          <span>分类</span>
        </div>
      </div>
    </div>
    <finished-product-chart class="finished-product-echart" :chartData="chartData" :chartloading="chart_configData.loading" :chartSize="chartSize"></finished-product-chart>
<!--     <EchartTemplate :option="option" :echartloading="echartloading" class="finished-product-echart"></EchartTemplate> -->
  </div>
</template>
<script>

import finishedProductChart from 'base/echart/EchartPic'
import EchartTemplate from 'base/echart/EchartTemplate'
import exhartFilter from 'assets/js/exhartFilter'
import {getProductTypeList, seekProductClassList, seekOldMaterial} from 'Api/commonality/seek.js'
import Cascade from './../../components/template/Cascade'
import DropDownMenu from './../../components/template/DropDownMenu'
const  _assign = require('lodash/assign')
export default {
  props: ['changeRepository', 'changeShop', 'changeCounter'],
  components: {
    EchartTemplate,
    finishedProductChart,
    Cascade,
    DropDownMenu
  },
  data () {
    return {
      chartData : null,
      chartSize : {
        x : 610,
        y : 300
      },
      //成品
      chart_configData: {
        text : '产品类别',
        title : '切换成色大类数据»',
        type : 1,
        loading : true,
        totalNum : 8, //件数
        totalPrice : 888, //售价
        totalWeight : 88, //重量
        dataList : []
      },
      changeType: 'N',
      productClassList: [], // 大小类
      smallClassList: [], // 小类
      productCategoryType : [],//产品类别
      productCategory :[],
      categoryProps:{
        value:'classesId',
        label:'classesName',
        children:'typeList'
      },
      bigClass: { // 成色大类
        name: '',
        id: ''
      },
      smallClass: { // 成色小类
        name: '',
        id: ''
      },
      echartloading: true
    }
  },
  watch: {
    'changeRepository.repositoryId' () {
      // if (this.changeRepository.repositoryId) {
        this._seekOldMaterial()
      // }
    },
    'changeShop.shopId' () {
      this._seekOldMaterial()
    },
    'changeCounter.counterId' () {
      // if (this.changeCounter.counterId) {
        this._seekOldMaterial()
      // }
    }
  },
  created() {
    this._seekOldMaterial()
    this._getProductTypeList() // 产品类别
    this._seekProductClassList()
  },
  mounted () {
    let _self = this
    // this.initEcharts()
  },
  methods: {
    cutType () {
      if (this.changeType === 'N') {
        this.changeType = 'Y'
      } else {
        this.changeType = 'N'
      }
      this._seekOldMaterial()
    },
    clearBigClass () { // 清除大类
      this.smallClassList = []
      this.smallClass.id = ''
      this.bigClass.name = ''
      this.smallClass.name = ''
      this.bigClass.id = ''
      this._seekOldMaterial()
    },
    changeBigClass (parm) { // 选择大类
      console.log(parm)
      this.bigClass.id = parm.item.classesId
      this.bigClass.name = parm.item.operateName
      this.smallClassList = parm.item.childrenList
      this._seekOldMaterial()
    },
    
    //成色小类
    changeSmallClass(parm){
       if( parm.classesName != undefined){
        this.smallClass.name =  parm.item.classesName
        this.smallClass.id = parm.item.classesId
        this.changeType = 'Y'
       }else{
         this.smallClass.name =  ''
         this.smallClass.id = ''
         this.changeType = 'N'
       }
       
      this._seekOldMaterial()
    },
    
    _seekOldMaterial () {
      this.chart_configData.loading = true
      let _self = this
      let options = {
        storageId: this.changeRepository.repositoryId,
        shopId: this.changeShop.shopId,
        counterId: this.changeCounter.counterId,
        productTypeId: this.productCategoryId,
        bigClassId: this.bigClass.id,
        smallClassId: this.smallClass.id,
        type: this.changeType
      }
      seekOldMaterial(options)
        .then(res => {
          if (res.data.state === 200) {
            setTimeout(()=>{
              if (res.data.data.dataList[0]) {
                _assign( this.chart_configData , res.data.data,{ loading : false })
                this.chartData = exhartFilter.exhartStockPie( this.chart_configData.dataList)
              } else {
                let datas = [{
                  num: 0,
                  weight: 0,
                  price: 0,
                  cost: 0,
                  className: '暂无数据',
                  classId: ''
                }]
                this.chart_configData.loading = false
                this.chartData = exhartFilter.exhartStockPie( datas )
              }
            },1000)
          } else {
            this.$store.dispatch('workPopupError', response.data.msg);
          }
        })
    },
    changeProductClass (val) {
      this.productCategoryId = val.item.operateId
      this._seekOldMaterial()
    },
    _seekProductClassList () {
      seekProductClassList({
          type : 1
      })
        .then(res => {
          if (res.data.state == 200) {
            this.productClassList = res.data.data.list
          }
        })
    },
    callProductCategory ( res ) {//产品类别
    this.productCategoryId = ''
      this._seekOldMaterial()
    },
    _getProductTypeList() { // 产品类别
        getProductTypeList().then((res) => {
          let  productCategory = res.data.data.list
          if( productCategory.length > 0 ){
            let tempCategory = [];
            productCategory.forEach((item) =>{
              
              switch( Number(item.classesType) ){
                case 1 :
                  //item.classesName = '素金类';
                  item.classesId = item.classesType
                  tempCategory.push(item);
                break;
                case 2 :
                  //item.classesName = '珠宝类'
                  item.classesId = item.classesType
                  tempCategory.push(item)
                break;
                // case 3 :
                //   //item.classesName = '饰品类'
                //   item.classesId = item.classesType
                //   tempCategory.push(item)
                // break;
              }
            })
            this.productCategory = tempCategory
          }
        }, (res) => {
            console.log(res);
        })
    }
  }  
}
</script>
<style lang="scss" scoped>
.finished-product-main{
  position: relative;
  .finished-product-header{
    position: absolute;
    width: 100%;
    top: 0;
    height: 50px;
    padding: 10px 25px;
    z-index: 100;
    .header-left{
      float: left;
      span{
        font-size: 16px;
        color: #333;
      }
    }
    .header-right{
      float: right;
      ul{
        display: inline-block;
        vertical-align: middle;
        font-size: 0;
        li{
          display: inline-block;
          //width: 80px;
          margin-right:12px;
          height: 28px;
          font-size: 12px;
        }
      }
      .finished-change-wrap{
        display:inline-block;
        margin-right: 20px;
        vertical-align: middle;
      }
      .class-btn{
        display:inline-block;
        vertical-align: top;
        width: 70px;
        height: 28px;
        line-height: 28px;
        border-radius: 5px;
        text-align: center;
        background-color: #ffb549;
        cursor: pointer;
        i{
          display:inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          border: 2px solid #fff;
          border-radius: 2px;
          margin-right: 5px;
          position: relative;
          img {
            width: 16px;
            height: 16px;
            position: absolute;
            top:-6px;
            left: 0;
            display: none;
          }
        }
        .actions{
          background-color: #ffb549;
          img {
            display: block;
          }
        }
        span{
          vertical-align: middle;
          font-size: 14px;
          line-height: 28px;
          font-weight: 600;
          color: #fff;
        }
      }
    }
  }
  .finished-product-echart{
    position: relative;
    width: 100%;
    height: 250px;
    border-radius: 10px;
    z-index: 1;
  }
}
.selected_dropdown{
  &.repertorySelected{
     &.placeholder{
       .el-dropdown-link{
         color: #999;
       } 
     }
    .el-dropdown-link{
      min-width: auto;
    }
  }
}


</style>
<style lang="scss">

//浏览器兼容性  成品+旧料
.finished-change-wrap{
    
   .selet_category{
      
      .el-input__inner::-webkit-input-placeholder{ color: #999;font-size: 14px; font-weight: bold;}
      .el-input__inner::placeholder,
      .el-input__inner::-moz-placeholder{ color:#444; font-size: 14px; font-weight: bold;}
      .el-icon-caret-top,
      .el-icon-caret-bottom{ font-size:8px; color: #999;}
      
      .el-input__inner,.el-cascader__label{
            padding:0 20px 0 4px;
            text-overflow: ellipsis;
            font-weight:bold;
            font-size: 14px; 
            color: #333;
        }
   } 
}
</style>
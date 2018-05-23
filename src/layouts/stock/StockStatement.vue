<template>
<transition name="tp-ani">
  <div class="stock-statement-main">
    <div class="stock-header-wrap">
      <div class="headervisi"></div>
      <div class="header-select">
        <p>
          <i class="iconfont icon-kucun1"></i>
          <span>库存</span>
        </p>
        <ul>
          <li v-if="isCompany">
            <DropDownMenu
              titleName="库位"
              dataType="库位"
              :propList="repositoryList"
              :isKWCodeDelete="kwcodedelete"
              @dropReturn="dropReturn"
              @clearInfo="clearInfo"
              @clearTitletext = 'clearTitletext'
            >
            </DropDownMenu>
            <span class="spaceMark">|</span>
          </li>
          <li>
            <DropDownMenu
              titleName="店铺"
              dataType="店铺"
              :isDPCodeDelete="dpcodedelete"
              :propList="shopList"
              @dropReturn="dropReturn"
              @clearInfo="clearInfo"
               @clearTitletext = 'clearTitletext'
            >
            </DropDownMenu>
            <span class="spaceMark">|</span>
          </li>
          <li>
            <DropDownMenu
              v-if="!takeUserDisabled"
              titleName="柜组"
              dataType="柜组"
              :propList="counterList"
              @dropReturn="dropReturn"
              @clearInfo="clearInfo"
            >
            </DropDownMenu>
            <div v-else class="selected_dropdown el-dropdown placeholder disabled">
               <span class="el-dropdown-link">柜组</span>
               <i class="iconfont icon-arrow-down myicon"></i>
            </div>
          </li>
        </ul>
      </div>
<!--       <div class="echartdiv"> -->
<!--       <Charts
        :changeRepository="changeRepository"
        :changeShop="changeShop"
        :changeCounter="changeCounter"
      ></Charts> -->
<!--       <StatisticsNumber :statisticalIndexData="statisticalIndexData"></StatisticsNumber> -->
<!--       </div> -->
    </div>
    <div class="footer-wrap" v-show="false">
      <!-- 成品 -->
      <FinishedProduct
        class="finished-product-wrap"
        :changeRepository="changeRepository"
        :changeShop="changeShop"
        :changeCounter="changeCounter"
      ></FinishedProduct>
      <!-- 旧料 -->
      <OldProduct
        class="old-Product-wrap"
        :changeRepository="changeRepository"
        :changeShop="changeShop"
        :changeCounter="changeCounter"
      ></OldProduct> 
    </div>
    
    <StockTable 
      class="stock-table-wrap"
      :changeRepository="changeRepository"
      :changeShop="changeShop"
      :changeCounter="changeCounter">
    </StockTable>
<!--     <div class="stock-table-wrap">
    </div> -->

  </div>
</transition>
</template>
<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import StockTable from './StockTable'
  import FinishedProduct from './FinishedProduct'
  import OldProduct from './OldProduct'
  import Charts from './Charts'
  import StatisticsNumber from './StatisticsNumber'
  import {GetDateStr, GetMonth} from 'assets/js/getTime'
  import {seekRepositoryList, seekGetShopListByCo, seekShowCounterList, seekStatisticalIndex} from 'Api/commonality/seek'
  import DropDownMenu from 'components/template/DropDownMenu'
  export default {
    components: {
      FinishedProduct,
      OldProduct,
      Charts,
      StatisticsNumber,
      StockTable,
      DropDownMenu
    },
    data () {
      return {
        kwcodedelete:false,//通过 这个参数 实现 代码判断
        dpcodedelete:false,
        takeUserDisabled : true,
        changeRepository: { // 库位
          repositoryId: '',
          repositoryName: ''
        },
        changeShop: { // 店铺
          shopId: '',
          shopName: ''
        },
        changeCounter: { // 柜组
          counterName: '',
          counterId: ''
        },
        option: {},
        repositoryList: [], // 库位列表
        shopList: [], // 店铺列表
        counterList: [], // 柜组
        statisticalIndexData: '' // 统计指数
      }
    },
    computed: {
      ...mapGetters([
        'userPositionInfo'
      ]),
      isCompany () {
        if (this.userPositionInfo.roleList) {
          // alert('87')
          for (let i of this.userPositionInfo.roleList) {
            switch (i.role) {
              case '1':
                return true
              case '2':
                return true
              case '3':
                return true
            }
          }
        }
        return false
      }
    },
    methods: {
      clearTitletext(val){
         if(val.type == '店铺'){
            this.dpcodedelete = false;
         }else if(val.type == "库位"){
            this.kwcodedelete = false;
         }
      },
      clearInfo (val) {
        if (val.type == "柜组") {
          this.changeCounter.counterId = '';
          this.changeCounter.counterName = '';
        } else if (val.type == "店铺") {
          this.changeShop.shopId = ''
          this.changeShop.shopName = ''
          this.changeCounter.counterId = ''
          this.changeCounter.counterName = ''
          this.takeUserDisabled = true;
          
        } else if (val.type == "库位") {
          this.changeRepository.repositoryId = ''
          this.changeRepository.repositoryName = ''
          console.log('清除后',this.changeRepository)
        }
        this._statisticalIndex();
      },
      dropReturn (val) {
        //debugger
        if (val.type == "柜组") {
          this.changeCounter.counterId = val.item.operateId
          this.changeCounter.counterName = val.item.operateName
          // this._statisticalIndex();
        } else if (val.type == "店铺") {
          if(this.changeRepository.repositoryId != '' && this.changeRepository.repositoryId != null){
              this.$store.dispatch('workPopupError', '库位不可与店铺同选');
              // 选店铺的时候，如果总库 不为空，则清除店铺请求
              // this.kwcodedelete = true;
              // this.changeRepository.repositoryId = '';
              // this.changeRepository.repositoryName="";
              this.dpcodedelete = true;
               this.changeShop.shopId = '';
               this.changeShop.shopName = '';
          }else{
              this.changeShop.shopId = val.item.operateId;
              this.changeShop.shopName = val.item.operateName;
              this.takeUserDisabled = false;
              this._seekShowCounterList(val.item.operateId);
          }
         
          //this._statisticalIndex();
          
        } else if (val.type == "库位") {
          if(this.changeShop.shopId != null && this.changeShop.shopId != ''){
             this.$store.dispatch('workPopupError', '库位不可与店铺同选');
              //  this.dpcodedelete = true;// 选库位的时候，店铺不为空，则清除库位请求
              //  this.changeShop.shopId = '';
              //  this.changeShop.shopName = '';
              this.kwcodedelete = true;
              this.changeRepository.repositoryId = '';
              this.changeRepository.repositoryName="";
              
          }else{
            this.changeRepository.repositoryId = val.item.operateId
            this.changeRepository.repositoryName = val.item.operateName
          }
          
          //this._statisticalIndex();
        }
             this._statisticalIndex();
      },
      // 统计指数数据
      _statisticalIndex (biaoji) { // 统计指数
        let timeDatas = GetMonth()
        let options = {
          startTime: timeDatas.startTime,
          endTime: timeDatas.endTime,
          storageId: this.changeRepository.repositoryId,//库位
          shopId: this.changeShop.shopId,//店铺
          counterId: this.changeCounter.counterId//内柜
        }
        console.log('获取参数值:',options);

        seekStatisticalIndex(options)
          .then(res => {
            console.log('是否请求成功?',res);
            if (res.data.state === 200) {
              let allDatas = res.data.data
              allDatas.numIconWidth = this.getIconWidth(allDatas.beginNum, allDatas.endNum, 60)
              allDatas.WeightIconWidth = this.getIconWidth(allDatas.beginWeight, allDatas.endWeight, 65)
              allDatas.priceIconWidth = this.getIconWidth(allDatas.beginPrice, allDatas.endPrice, 46)
              allDatas.costIconWidth = this.getIconWidth(allDatas.beginCost, allDatas.endCost, 46)
              this.statisticalIndexData = allDatas;
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      getIconWidth (begins = 0, ends = 0, maxWidth) { // 计算%
        let datas = {
          begin: 0, // 期初
          end: 0 // 期末
        }
        let a = Number(begins)
        let b = Number(ends)
        if (a > b) {
          datas.begin = `width: ${maxWidth}px`
          if (b === 0) {
            datas.end = 'width: 4px'
          } else {
            datas.end = `width:${(b / a) * maxWidth}px`
          }
        } else {
          datas.end = `width: ${maxWidth}px`
          if (a === 0) {
            datas.begin = 'width: 4px'
          } else {
            datas.begin = `width:${(a / b) * maxWidth}px`
          }
        }
        if (a == 0 && b == 0) {
          datas.begin = `width: ${maxWidth}px`
          datas.end = `width: ${maxWidth}px`
        }
        return datas
      },
      _seekRepositoryList () {
        seekRepositoryList()
          .then(res => {
            if (res.data.state === 200) {
              this.repositoryList = [...res.data.data.repositoryList, {
                isDefault: "Y",
                repositoryId: "",
                repositoryName: "全部仓库"
              }]
            }
          })
      },
      _seekGetShopListByCo () {
        let options = {
          page: 1,
          pageSize: 9999
        }
        seekGetShopListByCo(options)
          .then(res => {
            if (res.data.state === 200) {
              this.shopList = [...res.data.data.shopList, {
                shopId: '',
                shopName: '全部店铺'
              }]
            }
          })
      },
      _seekShowCounterList (parm) { // 获取柜组
        let options = {
          shopId: parm
        }
        seekShowCounterList(options)
          .then(res => {
            this.counterList = res.data.data.counterList
          })
      },
      clearRepository () {
        this.changeRepository.repositoryId = ''
        this._statisticalIndex()
      },
      getRepositoryId (parm) { // 获取库位
        console.log(parm.repositoryName != undefined)
        this.changeShop.shopId = ''
        this.changeShop.shopName = ''
        this.changeCounter.counterId = ''
        this.changeCounter.counterName = ''
        if( parm.repositoryName != undefined){
          this.changeRepository.repositoryId = parm.repositoryId
          this.changeRepository.repositoryName = parm.repositoryName
        }else{
          this.changeRepository.repositoryId = ''
          this.changeRepository.repositoryName = ''
        }
        this._statisticalIndex()
      },
      getShopId (parm) { // 获取店铺
        this.changeRepository.repositoryId = ''
        this.changeRepository.repositoryName = ''
        this._seekShowCounterList(parm.shopId)
        this.changeShop.shopId = parm.shopId
        this.changeShop.shopName = parm.shopName
        this._statisticalIndex()
      },
      clearShop () {
        this.changeShop.shopId = ''
        this.changeCounter.counterId= ''
        this.changeCounter.counterName = ''
        this.changeShop.shopName = ''
        this.counterList = []
        this._statisticalIndex()
      },
      getCounterId (parm) { // 柜组
        this.changeCounter.counterId = parm.counterId
        this.changeCounter.counterName = parm.counterName
        this._statisticalIndex()
      },
      clearCounter () {
        this.changeCounter.counterId = ''
        this.changeCounter.counterName = ''
        this._statisticalIndex()
      }
    },
    
    mounted(){
       this.$nextTick(()=>{
          this._seekRepositoryList()
          this._seekGetShopListByCo()
          this._statisticalIndex()
       })
    }
  }
</script>

<style lang="scss" scoped>
@import '~assets/css/_mixin.scss';
.el-dropdown.selected_dropdown.disabled{
  background-color:rgba(255, 255, 255, 0);
  position: relative;
  .el-dropdown-link{
      color: #999; 
  }
  .myicon{
       font-size: 12px;
       transform-origin: center center;
       display: inline-block;
       position: absolute;
       left: 43px;
       top: 8px;

  }
}
.stock-statement-main{
  font-size: 0;
  width: 1250px;
  margin: 30px auto;
  .stock-header-wrap{
    // height: 410px;
    height: 30px;
    position: relative;
    .headervisi{
      position: fixed;
      top: 63px;
      height: 42px;
      margin-left: -5px;
      // background-color: #f5f8f7;
      width: 1270px;
      z-index:999;
    }
    .header-select{
      position: fixed;
      z-index: 999;
      height: 40px;
      width: 1270px;
      // background-color: #f5f8f7;
      margin-left: -5px;
      margin-bottom:15px;
      p, ul{
        display: inline-block;
      }
      p{
        line-height: 40px;
        font-size: 16px;
        margin-left: 5px;
        i{
          display: inline-block;
          vertical-align: middle;
          font-size: 20px;
          color: #2993f8;
        }
        span{
          vertical-align: middle;
          font-size: 16px;
          line-height: 20px;
          margin-left: 2px;
          font-weight: bold;
          color: #333;
        }
      }
      ul{
        font-size: 0;
        float: right;
        li{
          display: inline-block;
          height:36px;
          font-size: 12px;
        }
      }
    }
    .echartdiv{
      width: 1250px;
      position: absolute;
      top: 55px;
      z-index: 1;
    }
  }
  .footer-wrap{
    margin-top: 20px;
    height: 300px;
    .finished-product-wrap{ // 成品
      @include box-shadow;
      border-radius: 10px;
      background-color: #fff;
      height: 300px;
      width: 610px;
      float: left;
    }
    .old-Product-wrap{ // 旧料
      @include box-shadow;
      border-radius: 10px;
      background-color: #fff;
      height: 300px;
      width: 610px;
      float: right;
    }
  }
  .stock-table-wrap{
    height: 800px;
    width: 100%;
  }
}

.selected_dropdown{
  &.repertorySelected{
    .el-dropdown-link{
      min-width: auto;
    }
  }
}

.spaceMark{
    color: #999;
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    padding:0 15px;
}
    
</style>

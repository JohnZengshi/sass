<template>
<!--表格内容区-->
<!--明细-->
<div class="xj-report-table-container default-line" ref="tableContainer" v-if="reportType == 1">
  <div>
      <template v-for="(tb, index) in tempArray">
        <div class="tb-tr" :key="index">
          <div class="tb-td"
            v-for="(tab,num) in detailDataGridColumn" 
            :style="_calculateClass(tab)" 
            v-text = "tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"
          :key="num"
          ></div>
        </div>
    </template>
    <div v-if="isDate" class="no-data"></div>
  </div>
</div>
  
<div class="xj-report-table-container con-line" ref="tableContainer" v-else-if="reportType == 2 || reportType == 4">
  <div>
<!--   {{dataGridStorage.dataList}} -->
   <!--  <div class="tb-category hz-tb-category" v-if="caty.productTypeList.length" v-for="(caty, ind) in dataGridStorage.dataList" :index="resetIndex(ind)" :key="ind"> -->
    <div class="tb-category hz-tb-category" v-if="caty.productTypeList.length" v-for="(caty, ind) in filterHasData(dataGridStorage.dataList)" :index="resetIndex(ind)" :key="ind">
      <div class="left-right-wrap">
        <div class="left-type-name-wrap" :style="getRightH(caty)">
          <p>{{caty.typeName}}</p>
        </div>
        <div class="right-type-inner-wrap">

          <div style="margin-bottom: 2px;" v-for="(tb, index) in caty.productTypeList" :key="index">
            <template v-for="(tb1, index1) in tb.detailList">
             <!-- :class="{'hz-td-tr': index1%2 == 0}" -->
              <div class="tb-tr" :class="{'hz-td-tr': filterEvent(index, index1, caty.productTypeList)}" :index="addIndex()" :key="index1">
                <template v-for="(tab,index2) in detailDataGridColumn">
                  <div class="branch-tb category-td"
                    :key="index2"
                    v-if="tab.text == '产品类别' && index1 == 0" 
                    :style="_calculateClass(tab)" >
                    <i :style="'height:'+ tb.detailList.length * 40 +'px;  background: #f9f9f9; line-height: 20px;'">{{tb[tab.childType]}}</i>
                  </div>
                  <div class="branch-tb category-td"
                    :key="index2"
                    v-else-if="tab.text == '位置名称' && index == 0 && index1 == 0"
                    :style="_calculateClass(tab)"
                  > 
                    <i :style="'height:'+ heightArr[ind] +'px;  background: #fff; width: 100%; line-height: 20px;'">{{caty[tab.childType]}}</i>
                  </div>
                  <div class="tb-td"
                    v-else
                    :key="index2"
                    style="overflow: hidden;"
                    :class="{backLine:tab.childType != ''}"
                    :style="_calculateClass(tab)" 
                    v-text = "tab.childType == ''? getIndex() : tb1[tab.childType]">
                  </div>
                </template>
              </div>
              
              
            </template>
            
            <!-- <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div> -->
                <div class="tb-total" style="background:#eee;" v-if="!positionSwitch">
            <div class="tb-td"
              v-for="(tab,f) in detailDataGridColumn" 
              :key="f"
              :style="_calculateClass(tab)" 
              v-html = "f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(tb[tab.totalType], tab.countCut) : tb[tab.totalType]"
            ></div>
          </div>
          </div>
        </div>
      </div>


      <div class="total-num-wrap" v-if="!positionSwitch">
        <div>
          {{caty.typeName}}合计
        </div>
        <div class="tb-total" style="background:#e9f4fe;">
          <div class="tb-td"
            v-for="(tab,f) in detailDataGridColumn" 
            :key="f"
            :style="_calculateClass(tab)" 
            v-html = "caty[tab.totalType0]"
          ></div>
        </div>
      </div>

<!--       <div class="total-num-wrap" v-if="!positionSwitch">
        <div>
          小计
        </div>
        <div class="tb-td"
          v-for="(tab,f) in detailDataGridColumn" 
          :key="f"
          :style="_calculateClass(tab)" 
          v-html = "f == 0 ? '<b></b>' : tab.toFixed ? toFixed(caty[tab.totalType], tab.countCut) : caty[tab.totalType]"
        ></div>


        </div> -->
<!--         <div class="tb-td"
          v-for="(tab,f) in detailDataGridColumn" 
          :key="f"
          :style="_calculateClass(tab)" 
          v-html = "f == 0 ? '<b>小计</b>' : tab.toFixed ? toFixed(tb[tab.totalType], tab.countCut) : tb[tab.totalType]"
        ></div> -->
      </div>
      <div class="tb-total" style="background:#e9f4fe;" v-if="positionSwitch"> <!-- 位置小计 -->
        <div class="tb-td"
          v-for="(tab,f) in detailDataGridColumn" 
          :key="f"
          :style="_calculateClass(tab)" 
          v-html = "f == 1 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"
        ></div>
      </div>
    </div>
    <div v-if="isDate" class="no-data"></div>
  </div>
</div>

<!--产品分类-->
<div class="xj-report-table-container produc-line" ref="tableContainer" v-else-if="reportType == 3">
  <div>
    <div class="tb-category hz-tb-category hz-tb-category-two" v-if="caty.productTypeList.length" v-for="(caty,index) in dataGridStorage.dataList" :key="index">
      <div class="left-right-wrap">

        <div class="left-type-name-wrap left-y" :style="getClassRightH(caty)">
          <p>{{caty.typeName}}</p>
        </div>
        <div class="right-type-inner-wrap">
          <template v-for="(tb, index) in caty.productTypeList">
            <div class="tb-tr" :key="index">
              <template v-for="(tab,index4) in detailDataGridColumn">
                <div class="branch-tb category-td"
                  :key="index4"
                  v-if="tab.text == '产品类别' && index == 0" 
                  :style="_calculateClass(tab)"
                  v-text="tb[tab.childType]"
                  >
                </div>
                <div class="branch-tb category-td"
                  :key="index4"
                  v-else-if="tab.text == '位置名称' && index == 0"
                  :style="_calculateClass(tab)"
                > 
                  <i :style="'height:'+ caty.productTypeList.length * 40 +'px;  color: #2993f8; background:#fff;'">{{caty[tab.childType]}}</i>
                </div>
                <div class="tb-td"
                  v-else
                  :key="index4"
                  :style="_calculateClass(tab)"
                  v-text = "tab.childType == ''? (index+1) : tb[tab.childType]">
                  >
                </div>
              </template>
            </div>
            
            
          </template>
        </div>

      </div>

      <div class="total-num-wrap" v-if="!positionSwitch">
        <div>
          小计
        </div>
        <div class="tb-total" style="background:#e9f4fe;">
          <div class="tb-td"
            v-for="(tab,f) in detailDataGridColumn" 
            :key="f"
            :style="_calculateClass(tab)" 
            v-html = "f == 0 ? '<b></b>' : tab.toFixed ? toFixed(caty[tab.totalType], tab.countCut) : caty[tab.totalType]"
          ></div>
        </div>
      </div>

    </div>
    <div v-if="isDate" class="no-data"></div>
  </div>
</div>
</template>

<script>
import {calculateClass} from 'assets/js/getClass'
let applyIndex = 0
export default {
  data(){
    return{
      isDate : false,
      tempArray : [],
      heightArr: [],
    }
  },
  props : ['detailDataGridColumn','dataGridStorage','tabCell', 'tabSwitch','reportType', 'positionSwitch'],
  
  watch:{
    'dataGridStorage' () {
      this.tempArray = []
      this.cheackData()
      this.storageFormatDate()
      //console.log(1111)
      this.tabCellHeight()
    },
    // 'reportType': function (val) {
    //  //console.log(this.positionSwitch)
    //  this.tabCellHeight()
    // },
    // 'positionSwitch': function (val) {
    //  //console.log(val)
    //  this.tabCellHeight()
    // }
  },
  mounted () {
      let _this = this
    this.$nextTick(()=>{
      
      if( this.dataGridStorage.detailList ){
        this.tempArray = []
        this.cheackData()
        this.storageFormatDate()
      }
      _this.$emit('lazyloadSend',123 )
    })
    
    $(".xj-report-table-container").mCustomScrollbar({
      theme: "minimal-dark",
      axis: 'y',
      scrollInertia:100, //滚动条移动速度，数值越大滚动越慢
      mouseWheel: {
        scrollAmount: 200,
        preventDefault: false,
        normalizeDelta: true,
        scrollInertia: 50
      },
      callbacks: {
        onTotalScroll: function() {
          // console.log('滚轮到底了')
        },
      }
    });

    // $(".xj-report-table-container").mCustomScrollbar({
        //     theme: "minimal-dark",
        //     axis: 'y',
        //     mouseWheel: {
        //         scrollAmount: 200,
        //         preventDefault: false,
        //         normalizeDelta: false,
        //         scrollInertia : 0
        //     },
        //     callbacks: {
        //         onTotalScroll: function () {
    //      if (_this.reportType == 1) {
    //        _this.$emit('lazyloadSend', {refresh: true})
    //      } else {
    //        //console.log('略略略')
    //      }
        //         }
        //     }
        // });
    this.tabCellHeight()
  },
  methods:{
    _calculateClass (parm) {
      return calculateClass(parm)
    },
    // 提取有数据的值
    filterHasData (parm) {
      let datas = []
      for (let i of parm) {
        if (i.productTypeList.length) {
          let isTrue = false
          for (let j of i.productTypeList) {
            if (j.detailList.length) {
              // datas.push(i)
              isTrue = true
            }
          }
          if (isTrue) {
            datas.push(i)
          }
          // if (i.productTypeList[0].detailList.length) {
          //   datas.push(i)
          // }
        }
      }
      return datas
    },
    // 提取奇数偶数
    filterEvent () {
      return false
    },
    //重置index
      resetIndex( index ){
         if( index == 0 ) applyIndex = 0
        },
        //
        addIndex(){
         applyIndex++
        },
        
        getIndex(){
          this.$emit('getIndex',applyIndex)
          return applyIndex
        },
    tabCellHeight () {
      this.heightArr = []
      // if (this.dataGridStorage.dataList) {
      //   for (let i = 0; i < this.dataGridStorage.dataList.length; i++) {
      //     let data = 0
      //     for (let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
      //       data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 50
      //       if (i == 0) {
      //         //console.log(this.dataGridStorage.dataList[i].productTypeList[j].detailList.length)
      //       }
      //     }
      //     this.heightArr.push(data)
      //   }
      // }
    },
    getRightH (parm) {
      let Num = 0
      if (parm) {
        for (let i of parm.productTypeList) {
          if (i) {
            Num += 42
            for (let j of i.detailList) {
              Num += 40
            }
          }
        }
      }

      return {
        'height': Num + 'px'
      }
    },
    getClassRightH (parm) {
      let Num = 0
      if (parm) {
        for (let i of parm.productTypeList) {
          Num += 40
          // for (let j of i.detailList) {
          //   Num += 40
          // }
        }
      }

      return {
        'height': Num + 'px'
      }
    },
    tableCell( width ){
      let _size = ''
      
      this.$emit('tabCell',{
        width : width,
        res :( res ) =>{
          _size = res
        }
      })
      return _size
       },
    
      //格式化
      storageFormatDate(){
        if( this.reportType == 1  && this.dataGridStorage ){
        if(  this.dataGridStorage.detailList.length > 0 ){
           this.tempArray=this.dataGridStorage.detailList;
        } 
      }
      },
      
      cheackData(){
        let isHas = true
        for (let i of this.dataGridStorage.dataList) {
          if (i.productTypeList.length) {
            isHas = false
          }
        }
        this.isDate = isHas
        // if( this.dataGridStorage.productTypeList ){
        //   this.isDate = this.dataGridStorage.productTypeList.length == 0
        // }else if( this.dataGridStorage.buyBackList ){
        //         this.isDate = this.dataGridStorage.buyBackList.length == 0
        //     }else if( this.dataGridStorage.detailList ){
        //         this.isDate = this.dataGridStorage.detailList.length == 0
        //     }else{
        //   this.isDate = true;
        // }
      }
      
  },
  update(){
    console.log('updata')
  },
  created () {
    
  }
}
</script>
<style lang="scss">
.tb-total {
  .tb-td {
    b {
      color:#333;
    }
  }
}



</style>
<style scoped lang="scss">
.xj-report-table-container{
    height: 596px;
    // overflow-y: auto;
    .hz-tb-category-two{
      margin-bottom: 2px;
    }
    .hz-td-tr{
      background-color: red!important;
    }
    .hz-tb-category{
      overflow: hidden;
      font-size: 0;

    }
    .hz-type-wrap{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .left-right-wrap{
      font-size: 0;
      width: 100%;
      display: flex;
    }
    .left-type-name-wrap{
      position: relative;
      display: inline-block;
      vertical-align:top;
      width: 210px;
      // height: 200px;
      // height: 100vh;
      // background-color: #ccc;
      >p{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 16px;
        font-size: 16px;
        color: #2993f8;
        text-align: center;
        margin: auto;
      }
    }
    .left-y{
      background-color: #f9f9f9;
    }
    .right-type-inner-wrap{
      flex: 1;
      display: inline-block;
      // width: 1029px;
      // width: 1038px;
      overflow: hidden;
    }
    .total-num-wrap{
      height: 40px;
      width: 100%;
      // font-size: 0;
      background: #e9f4fe;
      >div:first-child{
        float: left;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #2993f8;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 210px;
      }
      // >ul{
      //   width: 1029px;
      //   display: flex;
      //   // font-size: 0;
      //   li{
      //     border: 1px solid red;
      //     float: left;
      //     display: inline-block;
      //     height: 50px;
      //     line-height: 50px;
      //     text-align: center;
      //     font-size: 14px;
      //     font-weight: 500;
      //     transition: all .1s;
      //     white-space: nowrap;
      //     color: #333;
      //     -webkit-font-smoothing: subpixel-antialiased;
      //     text-overflow: ellipsis;
      //     overflow: hidden;

      //   }
      //   li:nth-child(1){
      //     width: 106px;
      //   }
      //   li:nth-child(2){
      //     width: 236px;
      //   }
      //   li:nth-child(3){
      //     width: 176px;
      //   }
      //   li:nth-child(4){
      //     width: 146px;
      //   }
      //   li:nth-child(5){
      //     width: 146px;
      //   }
      //   li:nth-child(6){
      //     width: 146px;
      //   }
      //   li:nth-child(7){
      //     width: 146px;
      //   }
      //   li:nth-child(8){
      //     width: 146px;
      //   }
      // }
    }
    &.produc-line {
    .tb-tr:nth-child(even){
      background-color: #f9f9f9;
    }
  }
    &.default-line{
      .tb-tr:nth-child(even){
        background-color: #f9f9f9;
      }
  }
  &.con-line {
    .tb-tr:nth-child(even) {
      .backLine{
        background-color: #f9f9f9;
        overflow: hidden;
      }
    }
  }
    .tb-tr{
      height: 40px;
      display: flex;

      .tb-td{
        float: left;
        display: inline-block;
        height: 40px;
        line-height: 40px;    
        text-align: center;
        font-size: 14px; 
        font-weight: 500;
        transition: all .1s;
        white-space: nowrap;
        color: #333;
        -webkit-font-smoothing:subpixel-antialiased;
        text-overflow: ellipsis;
        
        
        
        &.category-td{
            position: relative;
      //overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
            >i{
                font-style: normal;
                // font-weight: bold;
                // color: #248efc;
        color:#333;
                font-size: 14px;
                // font-size: 15px;
                position: absolute;
                display: flex;
                align-items: center;
                width: 100%;
                left: 0;
                top: 0;
                text-align: center;
                justify-content:center
            }
        }
      }
    }
  
  .tb-total{
      background-color: #e9f4fe;
      height: 40px;
      display: flex;
      
      .tb-td{
        float: left;
        display: inline-block;
        height: 40px;
        line-height: 40px;    
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #2993f8;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        b{
            color: #333 !important;
        }
      }
  }
}

.no-data{
  height: 100%;
  background: url(~static/img/space-page.png) center center no-repeat;
}
</style>
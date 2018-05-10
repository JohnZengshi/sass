<template>
<!--表格内容区-->
<!--明细-->
<div class="ui-table-container default-line" ref="tableContainer">
  <div>
    <!-- :isDeleteRole="isRole" -->
    <dataisdelete 
      :isdeletedialogvisibly="deletedialogvisi"
      :asrequestData="asData"
      @delmessageBack="delmessageBack"
      @setDeletedialogvisibly="setDeletedialogvisibly">
    </dataisdelete>
    <div class="tb-tr" v-for="(tb,index1) in tempArray" :key="index1">
      <div class="tb-td" v-for="(tab,index2) in detailDataGridColumn" :key="index2"
        :style="tableCell(tab.width)">
        <img v-if="tab.childType == 'patternimg'" src="./../../../../../static/img/sort/default.png" />
        <img style="width:70px;height:70px;border-radius:6px;margin-top:10px;" v-if="tab.childType == 'pics'" :src="tb.pic" />
        <div style="height:90px; line-height: 20px; display:table-cell;vertical-align:middle;white-space:normal;word-wrap:break-word;" :style="getWidth(tab.width)" v-if="tab.childType == 'styleNames'">{{tb.styleName}}</div>
        <span v-if="tab.type=='xvhao'">{{index1+1}}</span>
        <span v-else>{{tab.childType == ''? (index1+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]}}</span>
        <i v-if="tab.childType == 'moreaction'"  class="detail iconfont icon-bianji" @click="gotoDetails(tb)" title="编辑"></i>
        <i v-if="tab.childType == 'moreaction'"  class="del iconfont icon-lajitong" style="margin-left:10px;"  title="删除" @click="showDeleteDialog(tb)"></i>
          <span v-if="tab.childType =='styleId'"></span>
      </div>
    </div>
    <div v-if="isDate" class="no-data"></div>
  </div>
  
</div>

</template>

<script>
import {operateProductList} from 'Api/commonality/operate'
import dataisdelete from './dataisDelete'

export default {
  data(){
    return{
      deletedialogvisi:false,
      isDate : false,
      tempArray : [],
      heightArr: [],
      asData:''
    }
  },
  props : ['detailDataGridColumn','dataGridStorage','tabCell','reportType','isRole', 'positionSwitch'],
    components:{
       dataisdelete
  },
  watch:{
    'dataGridStorage':function(){
      this.tempArray = []
      this.cheackData()
      this.storageFormatDate()
      //console.log(1111)
      // this.tabCellHeight()
    },
  },
  mounted () {
      let _this = this
    this.$nextTick(()=>{

      // if( this.dataGridStorage.detailList ){
        this.tempArray = []
        this.cheackData()
        this.storageFormatDate()
      // }
      _this.$emit('lazyloadSend',123 )
    })

    $(".ui-table-container").mCustomScrollbar({
            theme: "minimal-dark",
            axis: 'y',
            mouseWheel: {
                scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: false,
                scrollInertia : 0
            },
            callbacks: {
                onTotalScroll: function () {
          if (_this.reportType == 1) {
            _this.$emit('lazyloadSend', {refresh: true})
          } else {
            //console.log('略略略')
          }
                }
            }
        });
    // this.tabCellHeight()
  },
  methods:{
    getWidth (parm) {
      return {
        width: parm + 'px'
      }
      console.log('坑-----------------------', parm)
    },
    setDeletedialogvisibly(isShow){
       this.deletedialogvisi = isShow; 
    },
    showDeleteDialog(item){
      let role = sessionStorage.getItem('miniprogramrole');
      if(role==='店长'){
                this.asData = item.styleId;//把用于请求的数据传到子组件，
          this.setDeletedialogvisibly(true);
      }else{
        this.$message({type:'warning',message:'没有权限'});
        return;
      }
            
    },
    delmessageBack (val) {
            this.$emit('messageBack', val)
        },
    // 跳转打编辑页面
    gotoDetails (item) {
      console.log(item)
      this.$router.push({path:'/work/addminiprogram',query:{stid:item.styleId,style:1}});
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
      //console.log(this.dataGridStorage);
      //this.tempArray = this.dataGridStorage;
      // lowestPrice   highestPrice
            if(this.dataGridStorage.length > 0){
                for(let i=0;i<this.dataGridStorage.length;i++){
          let obj = {
            styleNo:this.dataGridStorage[i].styleNo,
            pic:this.dataGridStorage[i].pic,
            styleName:this.dataGridStorage[i].styleName,
            lowhighestPrice:'',
            repertory:this.dataGridStorage[i].repertory,
            sellType:this.dataGridStorage[i].sellType,
            styleId:this.dataGridStorage[i].styleId
          }
          if(this.dataGridStorage[i].sellType=='1'){
          obj.sellType = '现货';
          }else if(this.dataGridStorage[i].sellType=='2'){
          obj.sellType = '预售';
          }else if(this.dataGridStorage[i].sellType=='3'){
            obj.sellType = '下架';
          }else{
            obj.sellType="";//数据为null,,不知道显示啥
          }
          if(this.dataGridStorage[i].lowestPrice == this.dataGridStorage[i].highestPrice){
            obj.lowhighestPrice = this.dataGridStorage[i].highestPrice;
          }else{
            obj.lowhighestPrice = this.dataGridStorage[i].lowestPrice+"~"+this.dataGridStorage[i].highestPrice;
          }
          this.tempArray.push(obj);
        }
      }else{
        this.isDate = true;
      }
      
      },

      cheackData(){
      //  if( this.dataGridStorage.productTypeList ){
    //      this.isDate = this.dataGridStorage.productTypeList.length == 0
      //  }else if( this.dataGridStorage.buyBackList ){
        //         this.isDate = this.dataGridStorage.buyBackList.length == 0
        //     }else if( this.dataGridStorage.detailList ){
        //         this.isDate = this.dataGridStorage.detailList.length == 0
        //     }else{
      //    this.isDate = true;
      //  }
       }

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
.ui-table-container{
     height: 556px;
    overflow-y: auto;
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
      height: 90px;
      display: flex;
    position: relative;
    >.operate-btn{
      position: absolute;
      right: 0;
      width: 60px;
      top: 0;
      height: 90px;
      background-color: rgba(0,0,0,.5);
      font-weight: normal;
      transition: all .4s;
      visibility: hidden;
      opacity: 0;
      text-align: center;
      line-height: 90px;
      >i{
        display: inline-block;
        color: #fff;
        cursor: pointer;
        margin-left:10px;
        float: left;
        transition: all .2s;
        font-size: 15px;
        &.del{
          font-size: 15px;
          margin-top:-2px;
          float: left;
        }
        &:hover{
          color: #2993f8;
        }
      }
    }
      .tb-td{
        float: left;
        display: inline-block;
        height: 90px;
        line-height: 90px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        transition: all .1s;
        white-space: nowrap;
        color: #333;
        -webkit-font-smoothing:subpixel-antialiased;
        text-overflow: ellipsis;
        //  >span{
    //  word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;
    //  }

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
  .tb-tr:hover {
    background-color:#e9e9e9;
    &:nth-child(even){
      background-color:#e9e9e9;
    }
    >.operate-btn{
      visibility: visible;
      text-align: center;
      opacity: 1;
    }
  }

  .tb-total{
      background-color: #e9f4fe;
      height: 90px;
      display: flex;

      .tb-td{
        float: left;
        display: inline-block;
        height: 90px;
        line-height: 90px;
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

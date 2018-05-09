<template>
<transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>金价设置
    </div>
    <div class="tpl-scroll" v-loading="loading">
        
      <div class="tpl-item clearfix" v-for="(item,i) in goldlist.bigDataList" :key="i">
        <h3>{{item.bigClassName}}
            <a href="javascript:;" v-if="storePrivilege" class="add" title="加减设置" @click="add(item)">批量设置</a>
        </h3>
        <div class="tpl-item-wrap">
            
          <div class="item" v-for="(k,index) in item.smallDataList" :key="index">
            <h4>{{k.smallClassName}}<span class="sub">(单位:元/g)</span></h4>
            <div class="num-item tpl-input">
              <span class="input" 
                  :data-text="k.dayPrice" >
                  <input 
                      type="text" 
                      :value="k.dayPrice"  
                      v-if="storePrivilege"
                      @focusout="edit(k,k.dayPrice)" 
                      @focusin="editDown(k.dayPrice, $event)"
                      @keyup="editPress(k,k.dayPrice,'dayPrice',$event)"
                      v-model="k.dayPrice"/>
                  <span v-else class="lock" v-text="k.dayPrice"></span>
              </span>
              <span class="input" 
                  :data-text="k.lowestPrice">
                  <input 
                      type="text" 
                      :value="k.lowestPrice" 
                      v-if="storePrivilege"
                      @focusout="edit(k,k.lowestPrice)"
                      @focusin="editDown(k.lowestPrice, $event)"
                      @keyup="editPress(k,k.lowestPrice,'lowestPrice',$event)"
                      v-model="k.lowestPrice"/>
                  <span v-else class="lock" v-text="k.lowestPrice"></span>
              </span>
              <span class="input" 
                  :data-text="k.exchangePrice" >
                  <input 
                      type="text" 
                      :value="k.exchangePrice" 
                      v-if="storePrivilege"
                      @focusout="edit(k,k.exchangePrice)"
                      @focusin="editDown(k.exchangePrice, $event)"
                      @keyup="editPress(k,k.exchangePrice,'exchangePrice',$event)"
                      v-model="k.exchangePrice"/>
                  <span v-else class="lock" v-text="k.exchangePrice"></span>
              </span>
              <span class="input" 
                  :data-text="k.recyclePrice">
                  <input 
                      type="text" 
                      :value="k.recyclePrice" 
                      v-if="storePrivilege"
                      @focusout="edit(k,k.recyclePrice)"
                      @focusin="editDown(k.recyclePrice, $event)"
                      @keyup="editPress(k,k.recyclePrice,'recyclePrice',$event)"
                      v-model="k.recyclePrice"/>
                  <span v-else class="lock" v-text="k.recyclePrice"></span>
              </span>
            </div>
            <div class="num-item ">
              <span class="txt">今日金价</span>
              <span class="txt">销售底价</span>
              <span class="txt">换货价</span>
              <span class="txt">回收价</span>
            </div>
          </div>
    
        </div>
      </div>

    </div>
    
    <!--弹出框组件-->
    <dialog-component 
        :dialog="dialog" 
        @dialogType = "dialogType"
        @dialogCallback = "dialogCallback">
    </dialog-component>
    
  </div>
</transition>
</template>

<script>
import dialogComponent from '../dialog/tplGoldDialog'
import { seekGoldPrice } from 'Api/commonality/seek'
import { modifyGoldPrice } from 'Api/commonality/operate'
export default {
    data(){
       return{
          goldlist : [],
          loading : true,
          deepPrice : 0,
          dialog :{
            dialogVisible: false,
            dialogSize: 'counter_x_small',
            dialogSlot : '' ,
            addCounterName : '',
            smallDataList :[]
          },
          flag: true
          
       }
    },
    components:{
      dialogComponent
    },
    props :['shopId','storePrivilege'],
    created(){
       this.fatchGold()    
    },
    
    watch:{
       storePrivilege : function(){
         
       }
    },
    methods:{
       
       //获取金价数据列表
       fatchGold(){
          this.loading = true
          seekGoldPrice({
              search : ''
          }).then((res)=>{
              setTimeout(()=>{
                this.loading = false
                this.goldlist = res.data.data
              },300)
          })
       },
      
       //
       add(item){
         this.dialogType(true)
         Object.assign(this.dialog,{
            dialogSlot : 'goldAdd',
            addCounterName : '批量加减设置'
         },item)
       },
       
       //
       edit(item,num){
        let tempNum = parseFloat(num)
        
        if( isNaN(tempNum) ) return
        if( this.deepPrice == tempNum ) return;
        
        let NewItem = Object.assign(item,{
              classesId :item.smallClassId 
           })
         this.deepPrice = tempNum
         this.dialogCallback([NewItem])
       },
       
       editPress(item,num, type ,evt){
         let oNum = num +'';
         oNum = oNum.replace(/[^\d.]/g,"")
         oNum = oNum.replace(/\.{2,}/g,".")
         oNum = oNum.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
         oNum = oNum.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
         if(oNum.indexOf(".")< 0 && oNum !=""){
          oNum= parseFloat(oNum);  
         }
         if( oNum == ''){
           oNum = '0'  
         }
         
         Object.assign(item,{
            [type] : oNum
         })
         
         if( evt ){
            //回车
            if( evt.key == 'Enter' && evt.keyCode == 13 ){
              evt.target.blur()
            //取消
            }else if( evt.key == 'Escape' && evt.keyCode == 27 ){
              Object.assign(item,{
                [type] : this.deepPrice
              })
              evt.target.blur()
            }
         }
       },
       
       editDown(n, el){
          this.deepPrice = parseFloat(n)
          //console.log(n)
          //console.log(el)
          el.target.select()
       },
       
       dialogType(type){
          this.dialog.dialogVisible = type 
       },
       
       //弹出框回调
       dialogCallback( updateList ){
          modifyGoldPrice({
              updateList : updateList
          }).then((res)=>{
              
              if( res.body.state == 200 ){
                 this.$message({
                  type :'success',
                  message : '设置成功'
                 })
                 this.fatchGold()
              }else if(res.body.state == 10000){
                 this.$message({
                  type :'error',
                  message : res.body.msg
                 }) 
              }
          })
       }
    }
}
</script>

<style lang="scss" scoped>
  .data-view {
    width: 730px;
    >.title {
      height: 40px;
      color: #999;
      >i {
        margin-right: 5px;
      }
    }
    .tpl-scroll {
      max-height: 610px;
      overflow: hidden;
      overflow-y: auto;
      padding-right: 40px;
    }
    .tpl-item {
      >h3 {
        height: 40px;
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
        padding-left: 18px;
        line-height: 40px;
        >.add {
          float: right;
          width: 100px;
          height: 24px;
          font-size: 12px;
          line-height: 24px;
          text-align: center;
          border-radius: 5px;
          margin-top: 8px;
          font-weight: normal;
          transition: all .3s;
          background-color: #2993f8;
          color: #fff;
          &:hover {
            background-color: #147ee3;
          }
        }
      }
    }
  }

.tpl-item-wrap{
   >.item{
      width: 330px;
      height: 150px;
      float: left;
      margin-bottom: 20px;
      background-color: #f6f7f8;
      border-radius: 8px;
      &:nth-child(odd){
         float: left;
      }
      &:nth-child(even){
         float: right;
      }
      
      >h4{
        padding:5px 15px;
        height: 40px;
        overflow: hidden;
        font-size: 14px;
        color: #2993f8;
        line-height: 40px;
        >.sub{
           color: #999;
           font-weight: normal;
           font-size: 12px;
           float: right;
        }
      }
      
     >.num-item{
       height: 50px;
       line-height: 50px;
       display: flex;
       
       >.input,>.txt{
          width: 25%;
       }
       
       >.txt{
         color: #666;
         font-size: 12px;
         text-align: center;
       }
       
       >.input{
         text-align: center;
          >input,>span{
            width:65px;
            height: 30px;
            background-color:transparent;
            text-align: center;
            font-size: 14px;
            border-radius: 3px;
            margin:0 auto;
            
            &:active,
            &:hover,
            &:focus{
              border: 1px solid #2993f8;
              background-color: #f4f9ff;
            }
            &.lock{
              background-color:transparent!important; 
            }
          }

       }
       
       &.tpl-input{
          padding-top: 10px;
       }
     }
   }
}
</style>
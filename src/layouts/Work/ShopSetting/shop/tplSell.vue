<template>
<transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>销售折扣
    </div>
    <div class="tpl-scroll">
        
      <div class="tpl-item clearfix" v-for="(item,index) in discountlist" :key="index">
        <h3>{{item.searchType== 2 ? '计件类' : '计重类'}}</h3>
        <div class="tpl-item-wrap clearfix">
            
          <div class="item" v-for="(k,l) in item.dataList" :key="l" >
            <h4>{{k.className}}</h4>
            <div class="num-item tpl-input">
              <p class="input">
                  <input 
                      type="text" 
                      v-if="storePrivilege"
                      @focusin="editFocusin(k.defaultDiscount, $event)"
                      @focusout="editFocusout(k,k.defaultDiscount)"
                      @keyup="editKey(k,k.defaultDiscount,'defaultDiscount',$event)"
                      v-model="k.defaultDiscount"/>
                  <span v-else class="lock txt" v-text="k.defaultDiscount"></span>
                  <span>%</span>
              </p>
              <p class="input">
                  <input 
                      type="text" 
                      v-if="storePrivilege"
                      @focusin="editFocusin(k.lowestDiscount, $event)"
                      @focusout="editFocusout(k,k.lowestDiscount)"
                      @keyup="editKey(k,k.lowestDiscount,'lowestDiscount',$event)"
                      v-model="k.lowestDiscount"/>
                  <span v-else class="lock txt" v-text="k.lowestDiscount"></span>
                  <span>%</span>
              </p>
            </div>
            <div class="num-item ">
              <span class="txt">默认折扣</span>
              <span class="txt">最低折扣</span>
            </div>
          </div>
    
        </div>
      </div>

    </div>
  </div>
</transition>
</template>

<script>
import { seekGetDiscount } from 'Api/commonality/seek'
import { modifyDiscount } from 'Api/commonality/operate'
export default {
    data(){
       return{
          discountlist : [],
          deepPrice : 0
       }
    },
    
    props : ['shopId', 'storePrivilege'],
    created(){
       this.fatchDiscount()    
    },
    directives: {
      focus: {
          inserted: function (el) {
            el.focus();
          }
      }
    },
    methods:{
       fatchDiscount(){
          seekGetDiscount({
              searchType : 1,
              shopId: this.shopId,
          }).then((res)=>{
              console.log(res.data.data)
              this.discountlist = res.data.data.bigDataList
          })
       },
       
       editFocusin(n, el){
         this.deepPrice = parseFloat(n)
         el.target.select()
       },
       
       editFocusout(item,n){
         let tempN =  parseFloat(n)
         
         if( this.deepPrice == tempN ) return;
         let newItem = Object.assign(item,{
              classesId :item.classId 
           })
         this.deepPrice = tempN
         this.editDiscount(newItem)
       },
       
       editKey(item,num, type ,evt){
         let oNum = num +'';
         oNum = oNum.replace(/[^\d.]/g,"")
         oNum = oNum.replace(/\.{2,}/g,".")
         oNum = oNum.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
         oNum = oNum.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
         if(oNum.indexOf(".")< 0 && oNum !=""){
          oNum= parseFloat(oNum);  
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
       
       editDiscount(item){
          modifyDiscount({
              updateList : [item]
          }).then((res)=>{
              if( res.body.state == 200){
                 this.fatchDiscount()
                 this.$message({
                  type :'success',
                  message : '设置成功'
                 })
              }else{
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
      }
    }
  }

.tpl-item-wrap{
  //width: 700px;
   >.item{
      width: 210px;
      height: 150px;
      float: left;
      margin-bottom: 20px;
      background-color: #f6f7f8;
      border-radius: 8px;
      margin-right: 22px;
      &.clear_mg{
       margin: 0;
      }
      >h4{
        padding:5px 15px;
        height: 40px;
        overflow: hidden;
        color: #2993f8;
        line-height: 40px;
      }
      
     >.num-item{
       height: 50px;
       line-height: 50px;
       display: flex;
       
       >.input,>.txt{
          width: 50%;
       }
       
       >.txt{
         color: #666;
         font-size: 12px;
         text-align: center;
       }
       
       >.input{
         text-align: center;
         position:relative;
         
         &:after{
          //content: '%';
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 2px;
          color: #666;
          margin-left: 3px;
         }
         >input{
          width:45px;
          transition: all .3s; 
         }
         
         >input:hover,
         >input:focus,
         >input:active{
            width: 65px;
            margin-right: 4px; 
         }
         >input,>span{
            height: 30px;
            background-color:transparent;
            text-align: center;
            font-size: 14px;
            border-radius: 3px;
            margin:0 auto;
            
            &:active,
            &:hover,
            &:focus{
              // background-color: #ededed;
              border: 1px solid #2993f8;
              background-color: #f4f9ff;
            }
            &.lock{
              background-color:transparent!important; 
            }
          }
          >span{
            width: 65px;
          }
       }
       
       &.tpl-input{
          padding-top: 10px;
       }
     }
   }
}
</style>
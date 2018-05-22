<template>
  <div class="silder-container">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>柜组设置
      <a href="javascript:;" class="add"  v-if="storePrivilege" title="添加柜组" @click="add">+ 柜组</a>
    </div>
    <div class="counter-container" v-loading="loading">
        <template v-for="key in counterShoplist" >
            <div class="item edit" v-if="storePrivilege" @click="edit(key)">
               <span class="txt">{{key.counterName}}
                <!--<em :title="'点击编辑'+ key.counterName" v-if="storePrivilege" @click="edit(key)">编辑</em>-->
               </span>
               <span class="num">
                   <i v-if="key.defaultFlag=='Y'" class="iconfont icon-duigou" title="默认柜组"></i>
                   {{key.totalNum }} 件
               </span>
            </div>
            <div class="item"  v-else>
               <span class="txt">{{key.counterName}}</span>
               <span class="num">
                   <i v-if="key.defaultFlag=='Y'" class="iconfont icon-duigou" title="默认柜组"></i>
                   {{key.totalNum }} 件
               </span>
            </div>
        </template>
    </div>
    <!--弹出框组件-->
    <dialog-component 
        :dialog="dialog" 
        @dialogType = "dialogType"
        @deleteCounter = "deleteCounter"
        @dialogCallback = "dialogCallback">
    </dialog-component>
  </div>
</template>

<script>
import dialogComponent from '../dialog/tplGoldDialog'
import { 
    seekShowCounterList,
    seekAddCounter,
    seekDeleCounter,
    seekCounterInfoUpdate,
    seekStockData
} from 'Api/commonality/seek'
export default{
  data(){
    return{
      counterShoplist : [],
      loading : true,
      dialog :{
        dialogVisible: false,
        dialogSize: 'counter_x_small',
        dialogSlot : '',
        editCounterName : ''
      }
      
    }
  },
  
  components:{
    dialogComponent
  },
  props: ['shopId','storePrivilege'],
  
  watch: {
    shopId: function(){
      this.fatchCounter()
    }
  },
  
  methods: {
    //获取柜组列表
   
    fatchCounter( shopId ){
      
      if( this.shopId == ''){
        this.loading = false
        return
      } 
      this.loading = true
      seekShowCounterList({
          shopId : this.shopId
      }).then((res)=>{
          
          this.counterShoplist = res.data.data.counterList
          this.counterShoplist.forEach( (f,i) =>{
              this.fatchCounterStockData(f,i)
          })
          this.loading = false 
      })
      
    },
    
    //柜组数据 图表 件数
    fatchCounterStockData( item,index ){
      seekStockData({
          dataList :[{
            type : 3,
            id : item.counterId
          }]
      }).then((res)=>{
          let tempData = res.data.data.dataList[0]
          
          Object.assign(item,{
             chartsData : res.data.data.dataList[0],
             totalNum : parseFloat(tempData.finishNum)+ parseFloat(tempData.oldNum)
          })
          this.$set(this.counterShoplist,index,item)
        //console.log('res',parseFloat(tempData.finishNum)+ parseFloat(tempData.oldNum)) 
      })
    },
    
    //添加柜组
    add(){
      this.dialogType(true)
      this.dialog.dialogSlot = 'add'
    },
    
    //编辑柜组
    edit(item){
      this.dialogType(true)
      
      Object.assign(this.dialog,{
        dialogSlot : 'edit',
        editCounterName : item.counterName
      },item)
    },
    
    dialogType( type ){
       this.dialog.dialogVisible = type
    },
    
    //弹出框回调
    dialogCallback(parm){
      // console.log(parm,this.dialog.dialogSlot)
      switch(this.dialog.dialogSlot){
        case 'add':
          this.addCounter(parm)
        break;
        case 'edit':
          this.editCounter(parm)
        break;
      }
    },
    //添加柜组
    addCounter( counterName){
      seekAddCounter({
          shopId : this.shopId,
          counterName : counterName
      }).then((res)=>{
          
          this.$set(this.counterShoplist,this.counterShoplist.length,{
             counterName :  counterName ,
             defaultFlag : 'N',
             counterId : res.data.data.counterId
          })
          
          this.fatchCounter()
          this.$message({
            type :'success',
            message : '添加成功'
          })
      }) 
    },
    
    //编辑柜组
    editCounter( data ){
      //console.log('编辑',data)
      seekCounterInfoUpdate({
          id :data.counterId,
          dataList : [
            {
               type : 1,
               data : data.data
            }
          ]
      }).then((res)=>{
          if( res.body.state == 200 ){
              this.fatchCounter()
              this.$message({
                type :'success',
                message : '修改成功'
              })
          }else{
            this.$message({
              type :'error',
              message : res.body.msg
            }) 
          }
      }) 
    },
    
    //删除柜组
    deleteCounter( data){
      //console.log(data)
      seekDeleCounter({
          counterIdList : [
            { counterId: data.counterId }
          ],
          handleType : 1
      }).then((res)=>{
          this.$message({
            type :'success',
            message : '删除成功'
          })
          this.fatchCounter()
      })
    }
  },
  
  mounted(){
     this.$nextTick(()=>{
        this.fatchCounter() 
     })
  }
}
</script>

<style lang="scss" scoped>
.silder-container {
    width: 300px;
    float: right;
    background-color: #fff;
    height: 370px;
    box-shadow: 0px 0 15px #ddd;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    >.title {
      height: 50px;
      color: #333;
      line-height: 50px;
      padding: 0 15px 0 25px;
      >i {
        margin-right: 5px;
        color: #2993f8;
      }
      >.add {
        color: #2993f8;
        font-size: 13px;
        float: right;
        &:hover {
          color: #036acc;
        }
      }
    }
}
.counter-container{
  height: 320px;
  
  overflow: hidden;
  overflow-y: auto;
  
  >.item{
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    padding: 0 15px;
    overflow: hidden;
    transition: all .3s;
    &.edit{
      cursor: pointer;
      &:hover{
         >.txt{
           color: #2993f8; 
         }
      }
    }
    
    &:hover{
       background-color: #f6f7f8;
       >.txt{
         >em{
           opacity: 1;
           visibility: visible;
         }
       }
    }
    
    >.txt{
      color: #666;
      float: left;
      padding-left: 35px;
      position: relative;
      &:before{
        content:'';
        display: inline-block;
        height: 7px;
        width: 7px;
        border-radius: 100%;
        background-color: #f7b73b;
        position: absolute;
        left: 15px;
        top: 17px;
      }
      >em{
        color: #999;
        font-size: 12px;
        font-style: normal;
        cursor: pointer;
        opacity: 0;
        transition: all .3s ease-in-out .3s;
        visibility: hidden;
        margin-left: 10px;
        &:hover{
          color: #2993f8;
        }
      }
    }
    >.num{
      color: #999;
      font-size: 12px;
      float: right;
      >i{
        font-size: 12px;
        color: #2993f8;
        margin-right: 5px;
      }
    }
  }
}
</style>


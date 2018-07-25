<template>
<!--此弹出框模块仅限于金价设置页面使用 -->
<el-dialog 
    :visible.sync="dialog.dialogVisible" 
    :size="dialog.dialogSize" 
    class="com-dialog" 
    :lock-scroll = "false"
    :close-on-click-modal = "false"
    :show-close="false">
    
   <div class="title" slot="title" v-if="dialog.dialogSlot == 'add'">
      <i class="el-icon-close" @click="close"></i>
      <div class="tips">
        <p><img src="../../../../../static/img/copy.png" /></p>添加柜组
      </div>
   </div>
   
   <div class="title" slot="title" v-if="dialog.dialogSlot == 'edit'">
      <i class="el-icon-close" @click="close"></i>
      <div class="tips">
        <p><img src="../../../../../static/img/piliang.png" /></p>
                    编辑{{dialog.editCounterName}}
      </div>
   </div>
   
   <div class="title"  slot="title" v-if="dialog.dialogSlot == 'goldAdd'">
      <i class="el-icon-close" @click="close"></i>
      <div class="tips">
        <p><img src="../../../../../static/img/piliang.png" /></p>
        {{dialog.addCounterName}}
      </div>
   </div>
   
  <!--新增柜组-->
  <div v-if="dialog.dialogSlot == 'add'" class="counter">
     <input type="text" placeholder="请输入柜组" value="" ref="addCounter" v-model="addCounter" />
  </div>
  
  <!--柜组编辑-->
  <div v-else-if="dialog.dialogSlot == 'edit'" class="editCounter">
      <el-popover
      ref="popover"
      placement="top"
      width="160"
      v-model="popover">
          <p>确定要删除柜组？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="popover = false">取消</el-button>
            <el-button type="primary" size="mini" @click="delCounter">确定</el-button>
          </div>
     </el-popover>
     <div class="edit-title">
        <p>修改的内容</p>
        <input type="text" placeholder="请输入要修改的柜组名" value="" ref="editCounter" v-model="editCounter" />
     </div>
     <div class="charts">
         <div class="el-charts">
             <canvas-chart :chartData="chartData" :chartloading="chartloading"></canvas-chart>
         </div>
         <span class="delete" v-if="dialog.defaultFlag == 'N'" title="删除柜组" v-popover:popover ><i class="el-icon-delete"></i></span>
     </div>
  </div>
  
  <!--金价加减操作-->
  <div v-else-if="dialog.dialogSlot == 'goldAdd'" class="addGold">
     <div class="item-container">
         <div class="item" v-for="(item,i) in dialog.smallDataList" :key="i">
             <span class="txt" v-text="item.smallClassName || item.classesName"></span>
             <i 
                class="iconfont" 
                :class="item.selected ? 'icon-duigou':'empty'" 
                :title="item.selected ? '取消选中':'选中'"
                @click="selectItem(item,i)"></i>
         </div>      
     </div>
     <div class="addSet" :class="dialog.smallDataList.length > 1 ? '':'small'">
         <div class="selectAll" v-if="dialog.smallDataList.length > 1 ">
                 全选<i class="iconfont" 
                 :class="selectClassAll ? 'icon-duigou' :'empty'" 
                 :title="selectClassAll ? '取消全选' :'全选'"
                 @click="selectAll"></i>
         </div>

         <div class="operate-model">
            <div class="input-number-pl" v-if="dialog.setjz === 1">
                <input class="yuan" v-model="yuan" type="text">
                <input class="score" v-model="score" type="text">
                <p style="color:#2993f8;font-size:12px;">（消费金额 : 兑换积分）</p>
            </div>
            
            <!-- 会员的 -->
            <div class="input-number-pl" v-else-if="dialog.setjz == 'hy'">
                <input class="yuan" v-model="yuan" type="text">
<!--                 <input class="score" v-model="score" type="text"> -->
                <p style="color:#2993f8;font-size:12px;">{{dialog.amendN}}</p>
            </div>

            <div class="input-number" v-else>
                <i class="el-icon-minus" title="减" @click="selectMinus"></i>
                <i class="el-icon-plus" title="加" @click="selectPlus"></i>
                <input type="text" value="" 
                    v-model="selectNum" 
                    @keydown="keydownSelect"
                    @input="inputSelect"
                    @keyup="keyupSelect"
                    @focus="focusAct($event)"
                    />
            </div>

            <el-button type="primary" @click="sure" size="small">确 定</el-button>
         </div>
      </div>
  </div>
  
  <div slot="footer" class="dialog-footer" v-if="dialog.dialogSlot != 'goldAdd'">
    <el-button type="primary" @click="sure" size="small">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import canvasChart from '../charts/templateChart'
import {stocksDatas} from '../charts/chartDateOption'
import Echarts from 'echarts';
export default{
  data(){
    return{
      addCounter: '',
      editCounter : '',
      popover : false,
      selectNum: 0,
      selectClassAll: false,
      editSelectData : [],
      chartloading : false,
      chartData : {},
      yuan:'100',
      score:'1'
    }
  },
  
  props: ['dialog'],
  
  components :{
     canvasChart
  },
  
  watch:{
      //编辑柜组名字
     'dialog.editCounterName' : function(){
        this.editCounter = this.dialog.editCounterName
     },
     
     
     'dialog.dialogVisible' : function(val){
        console.log(this.dialog)       
        //this.editSelectData = []
        this.smallDataList = []
        this.selectClassAll = false
        this.selectNum = 0
        //加减操作的数据
        if( this.dialog.dialogSlot == 'goldAdd' && this.dialog.dialogVisible ){
          console.log('数据',this.dialog.smallDataList)
          if(this.dialog.setjz === 1){
             this.dialog.smallDataList.forEach( (f,i) => {
              Object.assign(f,
                { 
                   selected : false,//i == 0,
                   classesId : f.classesId 
                }
              )
            })
          } else if (this.dialog.setjz === 'hy'){ // 会员
             this.dialog.smallDataList.forEach( (f,i) => {
              Object.assign(f,
                { 
                   selected : false,//i == 0,
                   classesId : f.classesId 
                }
              )
            })
          } else {
            this.dialog.smallDataList.forEach( (f,i) => {
                Object.assign(f,
                  { 
                     selected : false,//i == 0,
                     classesId : f.smallClassId 
                  }
                )
            })
          }
        }else if( this.dialog.dialogSlot == 'edit' && this.dialog.dialogVisible ){
            this.chartData = stocksDatas(this.dialog)
        }  
     }
  },
  
  methods:{
    
    close(){
       this.$emit('dialogType',false)
    },
    focusAct (el) {
      el.target.select()
    },
    //提交操作
    sure(){
       switch( this.dialog.dialogSlot ){
          case 'add':
            let newObj = Object.assign({},{data:this.addCounter})
            if( newObj.data.replace(/^\s+|\s+/g,'') != ''){
                this.$emit('dialogCallback', newObj.data )
                this.close()
            }else{
               this.$refs.addCounter.focus()
               this.$message({
                  type :'error',
                  message : '柜组不能为空'
               })
            }
            this.addCounter = ''
          break;
          case 'edit':
            let edit = Object.assign({},{data:this.editCounter},this.dialog)
            if( edit.data.replace(/^\s+|\s+/g,'') != ''){
                this.$emit('dialogCallback', edit )
                this.close()
            }else{
               this.$refs.editCounter.focus()
               this.$message({
                  type :'error',
                  message : '要修改的柜组名不能为空'
               })
            }
          break;
          case 'goldAdd':
            let tempSelected = this.dataFormats() //this.dialog.smallDataList.filter( f=> f.selected)
            
            if( tempSelected.length > 0 ){
               this.$emit('dialogCallback', tempSelected )
               this.close()
            }else{
              this.$message({
                  type :'error',
                  message : '请选择要加减的金价列表'
               })  
            }

            if(tempSelected.length > 0 && dialog.setjz === 1) {
                this.$emit('dialogCallback', tempSelected )
                this.close()
            }else {
                this.$message({
                  type :'error',
                  message : '请选择要修改的设置'
               }) 
            }
          break;
       }
       
    },
    
    //删除柜组操作
    delCounter(){
       this.popover = false
       this.close()
       this.$emit('deleteCounter', this.dialog)
    },
    
    //全选操作
    selectAll(){
      this.selectClassAll = !this.selectClassAll
      this.dialog.smallDataList.map( f=> f.selected = this.selectClassAll )
    },
    
    //选择单项金价进行加减设置
    selectItem(item,i){
      Object.assign(item,{
         selected : !item.selected
      })
      this.$set(this.dialog.smallDataList,i,item)
      
      if( this.dialog.smallDataList.filter( f=> f.selected).length == this.dialog.smallDataList.length ){
        this.selectClassAll = true
      }else{
        this.selectClassAll = false  
      }
    },
    
    //金价减法操作
    selectMinus(){
       this.selectNum--
       //this.dataFormats(false)
    },
    
    //金价加法操作
    selectPlus(){
      this.selectNum++
      //this.dataFormats(true)
    },
    
    dataFormats(){
       let selectedData = []
       if(this.dialog.setjz === 1){
         this.dialog.smallDataList.forEach(item => {
           if(item.selected){
             Object.assign(item,{
               yuan:this.yuan,
               score:this.score,
             })
             selectedData.push(item)
           }
         })
         return selectedData
       } else if (this.dialog.setjz == 'hy') {
          this.dialog.smallDataList.forEach(item => {
             if(item.selected){
               Object.assign(item,{
                 yuan:this.yuan,
                 score:this.score,
               })
               selectedData.push(item)
             }
           })
           return selectedData
       } else {
         this.dialog.smallDataList.forEach((key)=>{
           if( key.selected){
  
             let dayPrice = parseFloat(key.dayPrice)
             let exchangePrice = parseFloat(key.exchangePrice)
             let lowestPrice = parseFloat(key.lowestPrice)
             let recyclePrice = parseFloat(key.recyclePrice)
             let num = Math.abs(parseFloat(this.selectNum))
             let type = this.selectNum >= 0
             console.log(type,num)
             Object.assign(key,{
               dayPrice : type ? (dayPrice + num) : (dayPrice - (num)),
               exchangePrice : type ? (exchangePrice + num) : (exchangePrice - (num)),
               lowestPrice : type ? (lowestPrice + num) : (lowestPrice - (num)),
               recyclePrice : type ? (recyclePrice + num) : (recyclePrice - (num))
             })
             
             selectedData.push(key)
           }
        })

       }
       
       return selectedData
    },
    
    //金价设置input输入
    keydownSelect(){
      this.oldInputNum = parseFloat(this.selectNum)
    },
    
    inputSelect(){
        this.selectNum = this.selectNum.replace(/[^0-9_-]+/,'')
        if( this.selectNum.length == 0 ){
           //this.selectNum = 0
        }
        //this.selectNum = parseFloat(this.selectNum)
    },
    //金价设置input输入
    keyupSelect(){
       /*if( this.selectNum  >= 0 && this.oldInputNum >= 0){
          if( this.selectNum  > this.oldInputNum ){
            this.dataFormats(true)
          }else if( this.selectNum  < this.oldInputNum){
             this.dataFormats(false)
          }
       }*/
       console.log('new:',this.selectNum ,'old:',this.oldInputNum) 
    }
  },
  
  mounted(){
     this.$nextTick(()=>{
        this.editCounter = this.dialog.editCounterName
        //this.chartData = stocksDatas(this.dialog)
     })
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
  text-align: center;
  padding-bottom: 10px;
  >.el-button{
    width: 150px;
    height: 28px;
  }
}
.com-dialog{
  .title{
    position: relative;
    >.el-icon-close{
      position: absolute;
      right:-6px;
      top: -6px;
      cursor: pointer;
      font-size: 14px;
      color: #999;
      &:hover{
        color: #2993f8;  
      }
    }
    .tips{
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      >p{
        padding-bottom: 8px;
      }
    }
  }
 
}

.counter{
   padding:0 10px;
   >input{
    background-color: #f6f7f8;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
   }
}

.editCounter{
  .edit-title{
     padding: 0 25px;
    >p{
      border-left: 2px solid #2994f8;
      color: #333;
      height: 15px;
      line-height: 15px;
      padding-left: 7px;
      margin-bottom: 15px;
    }
    
    >input{
     background-color: #f6f7f8;
     border-radius: 4px;
     padding: 10px;
     width: 100%;
    }
  }
  
  .charts{
    height: 240px;
    margin-top: 15px;
    position: relative;
    
    >.el-charts{
       height: 240px;
       width: 100%;
       
    }
    
    >.delete{
      display: block;
      position: absolute;
      right: 9px;
      bottom: -54px;
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: 100%;
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2) inset;
      text-align: center;
      line-height: 28px;
      >i{
        color: #475072;
        font-size: 11px;
        position: relative;
        z-index: 2;
      }
      
      &:after{
        content:'';
        display: block;
        position: absolute;
        z-index: 1;
        width:18px;
        height: 18px;
        border-radius: 100%;
        background-color: #fff;
        left:5px;
        top: 5px;
        box-shadow: 2px 0 7px rgba(0,0,0,0.2) inset;
      }
      
      &:hover{
         >i{
           color: #2993f8;
         }
      }
    }
  }
}

.addGold{
  .item-container{
    max-height: 330px;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 10px;
    
    >.item{
      height: 40px;
      line-height: 40px;
      padding: 0 35px 0 40px;
      position: relative;
      
      &:hover{
        background-color: #f6f7f8;
      }
      >.txt{
        float: left;
        color: #333;
      }
      >.iconfont{
        float: right;
        cursor: pointer;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
        color: #2993f8;
        &.empty{
          border:1px solid #d6d6d6;
          border-radius: 100%;
          background-color: #fff;
        }
      }
    }
  }
  
  .addSet{
    height: 105px;
    padding: 10px 34px 10px 40px;
    border-radius: 0 0 10px 10px;
    background-color: #f6f7f8;
    &.small{
      height: 60px;
      padding-top: 15px;
    }
    
    >.selectAll{
      height: 45px;
      padding-bottom: 10px;
      line-height: 30px;
      color: #2993f8;
      font-weight: bold;
      >i{
        float: right;
        font-weight: normal;
        cursor: pointer;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-top: 5px;
        font-size: 20px;
        color: #2993f8;
        &.empty{
          border:1px solid #d6d6d6;
          border-radius: 100%;
          background-color: #fff;
        }
      }
    }
    
    >.operate-model{
       >.input-number{
         width: 133px;
         height: 24px;
         float: left;
         padding: 0 32px;
         position: relative;
         >i{
           position: absolute;
           box-sizing: border-box;
           top: 0;
           font-size: 12px;
           width: 24px;
           color: #2993f8;
           height: 24px;
           border-radius: 5px;
           text-align: center;
           line-height: 24px;
           cursor: pointer;
           border:1px solid #d6d6d6;
         }
         >.el-icon-minus{
           left: 0;
           background-color: #fff;
           &:hover{
             background-color: #f6f7f8;
           }
         }
         >.el-icon-plus{
           right:0;
           background-color: #2993f8;
           color: #fff;
           border-color: #2993f8;
           &:hover{
             background-color: #1378d8;
           }
         }
         >input{
           width: 100%;
           border:1px solid #d6d6d6;
           border-radius: 3px;
           padding:2px 4px;
           height: 24px;
           font-weight: bold;
           text-align: center;
           color: #333;
         }
       }
      >.el-button{
        float: right;
        width: 77px;
        height: 28px;
      }
    }
  }
}
.input-number-pl {
    width: 133px;
    height: 24px;
    float: left;
    .yuan {
      width: 48%;
      height: 24px;
      line-height: 24px;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
      
    }
    .score {
      width: 48%;
      height: 24px;
      line-height: 24px;      
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
      
    }

}
</style>
<style lang="scss">

.com-dialog{
  .el-dialog--counter_x_small{
    width: 320px;
    border-radius: 10px;
  }
  .el-dialog__body{
    padding: 20px 0 0 0; 
  }
}
</style>
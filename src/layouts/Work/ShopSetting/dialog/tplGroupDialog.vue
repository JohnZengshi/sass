<template>
<!--此弹出框模块仅限于班组设置页面使用 -->
<el-dialog 
    :visible.sync="dialog.dialogVisible" 
    :size="dialog.dialogSize" 
    class="group-dialog" 
    :lock-scroll = "false"
    :close-on-click-modal = "false"
    :show-close="false">
  
  <div class="title" slot="title" v-if="dialog.dialogSlot == 'addGroup'">
      <i class="el-icon-close" @click="close"></i>
      <div class="tips">
        <p><img src="../../../../../static/img/copy.png" /></p>新增班组
      </div>
  </div>
  <div class="title" slot="title" v-if="dialog.dialogSlot == 'editGroup'">
      <i class="el-icon-close" @click="close"></i>
      <div class="tips">
        <p><img src="../../../../../static/img/copy.png" /></p>编辑班组
      </div>
  </div>
  
  <!--新增班组名-->
  <div v-if="dialog.dialogSlot == 'addGroup'" class="addGroup">
     <input type="text" placeholder="请输入班组名称" value="" ref="addGroupInput" v-model="addGroupInput" />
  </div>
  <!--编辑班组名-->
  <div v-if="dialog.dialogSlot == 'editGroup'" class="addGroup">
     <input type="text" placeholder="请输入班组名称" ref="editInputGroup" v-model="editInputGroup" />
  </div>
  
  <!--添加班组成员-->
  <div class="dialogGroup clearfix" v-if="dialog.dialogSlot == 'addMember'" >
     <div class="slide-list">
         <div class="sp-title">
            <div class="sp_crumbs">
               <i class="iconfont icon-liebiao"></i> 
               <span class="txt">全部成员</span>
            </div>
         </div>
         <div class="item">
            <h3>店长 ( {{dialog.shopManager.length}} )</h3>
            <div class="memberlist">
               <div class="user"v-for="item,i in dialog.shopManager">
                  <img :src="item.userLogo"/>{{item.username}}
                  <i class="iconfont"  
                      @click="selectList(item)" 
                      :title="item.selected ?'取消选中':'点击选中'"
                      :class="item.selected ? 'icon-dui1' : ''"></i>
               </div>
            </div>
            <h3>店员 ( {{dialog.memberList.length}} )</h3>
            <div class="memberlist">
               <div class="user" v-for="item,i in dialog.memberList">
                  <img :src="item.userLogo"/>{{item.username}}
                  <i class="iconfont" 
                      @click="selectList(item)" 
                      :title="item.selected ?'取消选中':'点击选中'"
                      :class="item.selected ? 'icon-dui1' : ''">
                  </i>
               </div>

            </div>
         </div>
     </div>
     <div class="dialogGroupItem">
        <h4>店员<span>(已被选入组)</span></h4>
        <div class="itme-user clearfix">
          <span class="user"  v-for="item in editSelectData">
              <img :src="item.userLogo"/>{{item.username}}
              <i title="删除" @click="remove(item)"></i></span>
        </div>
      
          <div  class="dialog-footer">
            <el-button type="primary" @click="close" class="cancel" size="small">取消</el-button>
            <el-button type="primary" @click="sure" size="small">确 定</el-button>
          </div>
      </div>
  </div>
  
  <div slot="footer" class="dialog-footer" v-if="dialog.dialogSlot == 'addGroup' || dialog.dialogSlot == 'editGroup'">
    <el-button type="primary" @click="sure" size="small">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { modifyClassGroup } from 'Api/commonality/operate'
export default{
  data(){
    return{
      editSelectData :[],
      addGroupInput : '',
      editInputGroup : ''
    }
  },
  
  props: ['dialog'],
  
  watch:{
      //编辑柜组名字
     'dialog.groupName' : function(){
        this.editInputGroup = this.dialog.groupName
     },
     
     'dialog.dialogVisible': function(){
        this.editSelectData =[]
        if( this.dialog.dialogSlot == 'addMember' && this.dialog.dialogVisible ){
           this.editSelectData = this.dialog.res.filter( f => f.selected )
        }
        
      }

  },
  
  methods:{
    
    close(){
       this.$emit('dialogType',false)
    },
    
    //提交操作
    sure(){
       switch( this.dialog.dialogSlot ){
          //新增班组名
          case 'addGroup': 
            let newObj = Object.assign({},{data:this.addGroupInput})
            if( newObj.data.replace(/^\s+|\s+/g,'') != ''){
                this.$emit('dialogCallback', newObj.data )
                this.close()
            }else{
               this.$refs.addGroupInput.focus()
               this.$message({
                  type :'error',
                  message : '班组不能为空'
               })
            }
            this.addGroupInput = ''
          break;
          //修改班组名
          case 'editGroup':
            let edit = Object.assign({},{
                classesName: this.editInputGroup,
                classesId : this.dialog.groupId
            })
            if( edit.classesName.replace(/^\s+|\s+/g,'') != ''){
                this.$emit('dialogCallback', edit )
                this.close()
            }else{
               this.$refs.editInputGroup.focus()
               this.$message({
                  type :'error',
                  message : '班组不能为空'
               })
            }
            this.editInputGroup = ''
          break;
          //添加成员
          case 'addMember':
            let addMb = Object.assign({},{
                editSelectData: this.editSelectData
            },this.dialog)
            
            if( this.editSelectData.length > 0 ){
                this.$emit('dialogCallback', addMb )
                this.close()
            }else{
               this.$message({
                  type :'error',
                  message : '请选择要添加的店员'
               })
            }
          break;
       }
       
    },
    
    //弹框店铺人员选中 取消操作
    selectList(item, evt ){
      if( item.selected ){
         this.selectDataFilter(item)
         this.remove(item)
      }else{
        this.editSelectData.push(item)
      }
      Object.assign(item,{
        selected : !item.selected
      })
    },
    
    //移除选中列表
    remove(item){

      let option = {
         shopId : this.dialog.shopId,
         handleType : 5, 
         classGroupData :{
           classesName : this.dialog.groupName,
           classesId : this.dialog.groupId,
           memberList: [item]
         }
      }
      
      modifyClassGroup(option).then((res)=>{
        // console.log(res.data.state)
        if( res.data.state == 200){
            //删除选中状态
            switch(item.type){
              case 1 :
                  this.dialog.shopManager.forEach((e)=>{
                     if( e.userId == item.userId ){
                        Object.assign( e,{
                           selected : false
                        })
                     }
                  })
              break;
              case 2 :
                  this.dialog.memberList.forEach((e)=>{
                     if( e.userId == item.userId ){
                        Object.assign( e,{
                           selected : false
                        })
                     }
                  })
              break;
            }
            this.selectDataFilter(item)
        }
      })
       
      
    },
    
    //数组过滤
    selectDataFilter(item){
       this.editSelectData = this.editSelectData.filter(it => it.userId!=item.userId)
    }
    
    
  },
  
  mounted(){
     this.$nextTick(()=>{
         
     })
  }
}
</script>

<style lang="scss" scoped>

.addGroup{
   padding:0 10px;
   >input{
    background-color: #f6f7f8;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
   }
}



.dialog-footer{
  text-align: center;
  padding-bottom: 10px;
  >.el-button{
    width: 100px;
    height: 28px;
    &.cancel{
      background-color: #f1f2f3;
      color: #666;
      border-color:#f1f2f3;
      &:hover{
        background-color: #e5e6e6;
        border-color: #e5e6e6;
      }
    }
  }
}

.dialogGroup{

.slide-list{
  float: left;
  width: 230px;
  background-color: #fbfbfb;
  height: 620px;
  .sp-title{
    height: 50px;
    padding-top:20px;
    padding-left: 20px;
    color: #333;
    >.sp_crumbs{
      float: left;
      >.txt{
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }
      >i{color: #2993f8; font-size: 20px; margin-right: 3px;}
    }
    >.selected_dropdown{
      float: right;
      width: 160px;
      max-width: 200px;
      border-radius: 3px;
      background-color: #fff;
      border:1px solid #eee;
      >.el-dropdown-link{
        text-align: center;
        max-width: 200px;
        width: 100%;
      }
    }
  }
  
  >.item{
    height: 555px;
    overflow: hidden;
    overflow-y: auto;
    >h3{
      font-size: 14px;
      color:#2993f8;
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
    }
    
    >.memberlist{
       >.user{
         height: 60px;
         padding: 10px 15px 10px 20px;
         line-height: 40px;
         &:hover{
           background-color: #f6f7f8;
         }
         >img{
           height: 40px;
           width: 40px;
           border-radius: 100%;
           vertical-align: middle;
           margin-right: 10px;
         }
         >i{
           float: right;
           width: 18px;
           height: 18px;
           cursor: pointer;
           line-height: 18px;
           margin-top: 10px;
           border:1px solid #9a9a9a;
           border-radius: 3px;
           &.icon-dui1{
             background-color: #2993f8;
             color: #fff;
             border-color: #2993f8;
           }
         }
       }
    }
  }
}    
  >.dialogGroupItem{
    float:right;
    width: 510px;
      >h4{
        padding:15px 15px 5px 15px;
        height: 50px;
        font-size: 16px;
        overflow: hidden;
        color: #666;
        line-height: 35px;
        >span{
          color: #999;
          font-size: 12px;
          font-weight: normal;
          margin-left: 3px;
        }
      }
     >.itme-user{
        padding:10px 20px 0px 20px;
        height: 500px;
        overflow: hidden;
        overflow-y: auto;
    
        >.user{
          display: block;
          padding-top: 10px;
          float: left;
          width: 14.28%;
          text-align: center;
          font-size: 13px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          position: relative;
          cursor: pointer;
          height: 115px;
          >img{
             display: block;
             width: 50px;
             height: 50px;
             border-radius: 100%;
             margin: 0 auto 14px auto;
          }
          
          &:hover{
            color: #2993f8;
            img{
              opacity: 0.7;
            }
          }
          
          >i{
             position: absolute;
             display: block;
             height: 14px;
             width: 14px;
             background-color: #ff0000;
             border-radius: 50%;
             top: 44px;
             right: 7px;
             &:after{
                content: '';
                float: left;
                width: 8px;
                height: 2px;
                margin-top:6px;
                margin-left: 3px;
                background-color: #fff;
             }
             
             &:hover{
               background-color: #d80202;
             }
          }
          
        }
     } 
   }
   
  .dialog-footer{
    padding-top: 20px;
  }
}
</style>
<style lang="scss">

.group-dialog{
  .el-dialog--counter_Group_small{
    width: 320px;
    border-radius: 10px;
    .el-dialog__body{
       padding:20px 0 0 0; 
    }
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
  .el-dialog--counter_max{
    width: 745px;
    border-radius: 10px;
    overflow: hidden;
       .el-dialog__body{
        padding:0; 
       }
      .el-dialog__footer,
      .el-dialog__header{
         display: none;
      }
  }
  
}
</style>
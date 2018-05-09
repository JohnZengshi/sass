<template>
<transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>班组设置
      <a href="javascript:;" class="add" title="新增班组" v-if="storePrivilege"  @click="add()">+ 新增班组</a>
    </div>
    <div class="tpl-scroll">
        
      <div class="tpl-item clearfix">
        <div class="tpl-item-wrap clearfix" v-loading="tpl_loading">
          <div class="item" v-for="(item,index) in grouplist" :key="index">
            <h4>{{item.groupName}}
                <i class="edit iconfont icon-bianji" v-if="storePrivilege" title="修改班组名" @click="editGroup(item)"></i>
                <i class="delete iconfont icon-lajitong" v-if="storePrivilege" title="删除班组" @click="deleteGroup(item)"></i>
            </h4>
            <div class="itme-user clearfix">
              <span class="user" v-for="(k,index) in item.groupMemberDataList" :key="index">
                  <img :src="k.userLogo"/>{{k.userName}}
                  <i title="删除" @click="removeGroup(item,k)" v-if="storePrivilege"></i>
              </span>
              <p class="add"   v-if="storePrivilege" title="添加班组成员" @click="addGroupMember(item)"><i class="el-icon-plus"></i>添加</p>
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
import dialogComponent from '../dialog/tplGroupDialog'
import { seekGetNewClassGroup,seekMemberList } from 'Api/commonality/seek'
import { modifyClassGroup } from 'Api/commonality/operate'

export default{
    data(){
       return{
          grouplist : [],
          tpl_loading : true,
          dialog :{
            dialogVisible: false,
            dialogSize: 'counter_max',
            dialogSlot : '' ,
            groupName : '',
            smallDataList :[],
            shopId : ''
          }
       }
    },
    
    props:['shopId','storePrivilege'],
    components:{
      dialogComponent
    },
  
    watch:{
       shopId : function(){
         this.fatchGroup()
       }
    },
    created(){
      
      if( this.shopId.length ){
         this.fatchGroup()
      } 
    },
    
    methods:{
       
       //获取班组列表
       fatchGroup(){
          this.tpl_loading = true
          seekGetNewClassGroup({
              shopId : this.shopId
          }).then((res)=>{
              setTimeout(()=>{
                this.tpl_loading = false
                this.grouplist = res.data.data.groupDataList
              },300)
          })
       },
       
       //添加、修改班组 
       fatchGroupHandle( options ){
          let option = {
             shopId : '',
             handleType : 2,
             classGroupData :{
               classesName :'',
               classesId : ''
             }
          }
          Object.assign(option, options)
          modifyClassGroup(option).then((res)=>{
            // console.log(res.data.state)
            if( res.data.state == 200){
              this.$message({
                type :'success',
                message : option.handleType == 2 ? '添加班组成功'  : '修改班组成功'
              })
               this.fatchGroup()
            }
            
          })
       },
       
       //删除班组
       deleteGroup(item){
           
          let option = {
             shopId : this.shopId,
             handleType : 4,
             classGroupData :{
               classesName : item.groupName,
               classesId : item.groupId
             }
          }
          
          modifyClassGroup(option).then((res)=>{
            //console.log('deleteGroup',res.data.state)
            if( res.data.state == 200){
              this.$message({
                type :'success',
                message : '删除成功'
              })
              this.fatchGroup()
            }
            
          })
       },
       
       //请求添加班组成员
       addGroupHandle( opts ){
           
          let option = {
             shopId : this.shopId,
             handleType : 3, 
             classGroupData :{
               classesName : opts.groupName,
               classesId : opts.groupId,
               memberList: opts.editSelectData
             }
          }
          
          modifyClassGroup(option).then((res)=>{
            // console.log(res.data.state)
            if( res.data.state == 200){
              this.$message({
                type :'success',
                message : '添加班组成员成功'
              })
              this.fatchGroup()
            }
            
          })
       },
       
       //编辑班组名
       editGroup(item){
         this.dialogType(true)
         Object.assign(this.dialog,{
            dialogSlot : 'editGroup',
            dialogSize : 'counter_Group_small'
         },item)
       },
       
       //添加班组成员
       addGroupMember(item){
          this.tpl_loading = true
          this.fatchGroupMember(item)
       },
       
       //删除班组成员
       removeGroup( item,childData ){
         console.log(item,childData)
         
         let option = {
             shopId : this.shopId,
             handleType : 5, 
             classGroupData :{
               classesName : item.groupName,
               classesId : item.groupId,
               memberList: [childData]
             }
          }
          
          modifyClassGroup(option).then((res)=>{
              
            if( res.data.state == 200){
              this.$message({
                type :'success',
                message : '删除成功'
              })
              this.fatchGroup()
            }
            
          })
       },
       
       add(){
          this.dialogType(true)
          this.dialog.dialogSlot = 'addGroup'
          this.dialog.dialogSize =  'counter_Group_small'
       },
       
       dialogType(type){
          this.dialog.dialogVisible = type 
       },
       
       //弹出框回调
       dialogCallback( parm ){
         switch(this.dialog.dialogSlot){
          case 'addGroup':
            this.fatchGroupHandle({
               shopId: this.shopId,
               classGroupData : {
                  classesName : parm
               }
            })
          break;
          case 'editGroup':
            this.fatchGroupHandle({
               shopId: this.shopId,
               handleType : 1,
               classGroupData : {
                  classesName : parm.classesName,
                  classesId : parm.classesId
               }
            })
          break;
          case 'addMember':
            this.addGroupHandle(parm)
          break;
        }
       },
       
       //获取店铺员工
       fatchGroupMember(items){
          seekMemberList({
              type : 2,
              shopId : this.shopId,
              userType :''
          }).then((res)=>{
              //console.log(items)
              let shopManager = []
              let memberList = []
              let temp = res.data.data.dataList
              temp.forEach((item)=>{
                 // console.log(temp)
                 let type = items.groupMemberDataList.filter( e => e.userId == item.userId)
                 
                 if( item.role == '店长'){
                    Object.assign(item,{
                      selected : type.length > 0,
                      type : 1
                    })
                    shopManager.push(item) 
                 }else if( item.role == '店员'){
                    Object.assign(item,{
                      selected : type.length > 0,
                      type : 2
                    })
                    memberList.push(item) 
                 }
              })
              
              Object.assign(this.dialog,{
                dialogSlot : 'addMember',
                dialogSize : 'counter_max',
                shopId : this.shopId,
                shopManager : shopManager,
                memberList : memberList,
                res : temp
              },items)
              
              this.dialogType(true)
              this.tpl_loading = false
          })
       }
    },
    moutend(){
       this.$nextTick(()=>{
          if( this.shopId.length ){
             this.fatchGroup()
          }
       })
    }
}
</script>

<style lang="scss" scoped>
  .data-view {
    width: 730px;
    >.title {
      height: 40px;
      padding-right: 50px;
      color: #999;
      >i {
        margin-right: 5px;
      }
      >.add {
          float: right;
          width: 90px;
          height: 24px;
          font-size: 14px;
          text-align: center;
          font-weight: normal;
          transition: all .3s;
          color: #2993f8;
          &:hover {
            color: #2993f8;
          }
        }
    }
    .tpl-scroll {
      max-height: 610px;
      overflow: hidden;
      overflow-y: auto;
      padding-right: 40px;
    }
    
  }

.tpl-item-wrap{
  //width: 700px;
   >.item{
     background-color: #f6f7f8;
     border-radius: 10px;
     margin-bottom: 20px;
     
     &:hover{
       >h4>i{opacity:1; visibility: visible;}
     }
        
      >h4{
        padding:15px 15px 5px 15px;
        height: 50px;
        overflow: hidden;
        color: #2993f8;
        line-height: 35px;
        >i{
          color: #999;
          font-weight: normal;
          cursor: pointer;
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          opacity: 0;
          visibility: hidden;
          font-size: 16px;
          color: #2993f8;
          display: inline-block;
          transition: all .3s ease-in-out .1s;
          
          &.edit{
            margin-left: 10px;
          }
          &:hover{
            color: #086dce; 
          }
        }
        
        
      }
     >.itme-user{
        padding:10px 20px 20px 20px;
        >.user{
          display: block;
          padding-top: 10px;
          float: left;
          width: 14.28%;
          text-align: center;
          font-size: 13px;
          color: #666;
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
          
          >i{
             position: absolute;
             display: block;
             height: 14px;
             width: 14px;
             background-color: #ff0000;
             border-radius: 50%;
             top: 44px;
             opacity: 0;
             visibility: hidden;
             transition: all .3s;
             overflow: hidden;
             right: 18px;
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
          
          &:hover{
            color: #2993f8;
            img{
              opacity: 0.7;
            }
            
            >i{
               opacity: 1;
               visibility: visible;
            }
          }
        }
        
       >.add{
          cursor: pointer;
          width: 50px;
          float: left;
          margin-bottom: 10px;
          margin-top: 10px;
          color: #2993f8;
          text-align: center;
          font-size: 14px;
            
          >i{
            width: 50px;
            height: 50px;
            float: left;
            font-size: 16px;
            border:1px dashed #d6d6d6;
            border-radius: 100%;
            color: #d6d6d6;
            margin-bottom: 10px;
            text-align: center;
            line-height: 50px;
          }
         &:hover{
           
           i{
            //border-color: #2993f8;
            color: #2993f8;  
           }
         }
       }
     } 
   }
}
</style>
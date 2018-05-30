<template>
    <div class="silder-container">
        <!-- 标题 -->
        <div class="title">
            <i class="iconfont icon-liebiao"></i>会员积分模板
            <!-- <a v-if="storePrivilege" href="javascript:;" class="add" @click="addPoints">+ 模板</a> -->
        </div>
        <!-- 列表内容 -->
        <div class="counter-container" v-loading="loading">
            <!-- 栗子 -->
            <div class="item edit" @click="goMemberSettingIndex(index)" v-for="(item,index) in templateDataList" :key="index">
               <span class="txt">{{ item.templateName }}</span>
            </div>
            <!-- <div class="item edit">
               <span class="txt">会员积分默认模板</span>
            </div>
            <div class="item edit">
               <span class="txt">会员积分默认模板</span>
            </div> -->
        </div>
    <!-- 添加模板弹框 -->
    <member-points-dialog :dialog="dialog" @closeDialog="closeDialog" @getMemberPointsList="getMemberPointsList"></member-points-dialog>

    </div>
</template>

<style lang="scss" scoped>
.silder-container{
    width: 300px;
    float: right;
    background-color: #fff;
    height: 340px;
    box-shadow: 0px 0 15px #ddd;
    border-radius: 10px;
    overflow: hidden;
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


<script>
import memberPointsDialog from  '../dialog/memberPointsDialog'
import { templateIntegralDetails,consumeTemplateUpdate,getTemplateIntegralList,templateCreate } from 'Api/member'
// import { getTemplateIntegralList, templateCreate, templateIntegralUpdate } from 'Api/member'


export default {
    data () {
        return {
            // 加载图标
            loading: false, 
            // 弹框数据
            dialog: {
                dialogVisible: false,
                dialogSize: 'counter_x_small',
                dialogType: 'add'
            },
            // 会员列表
            templateDataList:[],
            templateName:''
        }
    },
    components:{
        memberPointsDialog,
    },
    props:['shopId','storePrivilege'],
    methods:{
        // 关闭回调
        closeDialog(parm) {
            this.dialog.dialogVisible = parm
        },
        // 添加模板按钮
        addPoints() {
            this.dialog.dialogVisible = true
        },
        // 获取会员列表
        getTemplateList(){
            getTemplateIntegralList({shopId:this.shopId}).then(res => {
                this.templateDataList = res.data.data.dataList
            })
        },
        // 会员模板跳转
        goMemberSettingIndex(index){
            this.$router.push({path:'/work/memberSettingIndex',query:{templateId:this.templateDataList[index].templateId,shopId:this.shopId}})
        },
        getMemberPointsList(val){
            console.log('回调')
            let options = {
                templateName: val
            }
            templateCreate(options).then(res => {
                if(res.data.state == 200) {
                    this.addDialog = false                    
                    this.supplierName = ''                    
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.dialog.dialogVisible = false
                    this.getTemplateList()
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            })
        }
    },
    created(){
        this.getTemplateList()
    },
    mounted () {
        
    },
    watch:{
        shopId(val){
            if(val) {
                this.getTemplateList()
            }
        }
    }
}
</script>

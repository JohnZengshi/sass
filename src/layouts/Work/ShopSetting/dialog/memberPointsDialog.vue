<template>
    <el-dialog
        :visible.sync="dialog.dialogVisible"
        :size="dialog.dialogSize"
        class="com-dialog" 
        :lock-scroll = "false"
        :close-on-click-modal = "false"
        :show-close="false"
    >
    
    <!-- 新增头部 -->
    <div class="title" slot="title">
        <i class="el-icon-close" @click="close"></i>
        <div class="tips">
            <p><img src="../../../../../static/img/copy.png" /></p>新建模板
        </div>
    </div>

    <!-- 新增输入框 -->
    <div class="counter">
        <p>模板名称</p>
        <input type="text" placeholder="请输入，最多10个字符" value="" maxlength="10" v-model="templateName"/>
    </div>

    <!-- 尾部内容 -->
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="sure">确 定</el-button>
    </div>
    </el-dialog>
</template>

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



<script>
export default {
    data () {
        return {
            templateName:''
        }
    },
    props:['dialog'],
    methods:{
        close() {
            this.$emit('closeDialog',false)
        },
        sure() {
            if(this.templateName === ''){
                this.$message({
                    type: 'error',
                    message: '模板名称不能为空'
                })
                return
            }
            // 提交
            this.$emit('getMemberPointsList')
        }
    },
    created() {

    },
    mounted() {

    }
}
</script>


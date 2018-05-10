<template>
   <el-dialog class="dialog-w320-hAuto-hn" :before-close="handleclose" :visible.sync="isDeletevisibly">
        <div class="outeronehtml">
            <img class="close-icon" src="../../../../assets/img/close-preview.png" @click.stop="handleclose" />
            <img class="headerimg" src="../../../../../static/img/message/5.png" />
            <h3>提示</h3>
            <span>确定删除该款号?</span>
            <div class="clost-div"  @click.stop="handleclose">取&nbsp;消</div>
            <div class="mybtn-div" @click.stop="confirmrequest">确&nbsp;定</div>
        </div>
   </el-dialog>
</template>

<script>
import {programGirardUpdate} from 'Api/commonality/seek.js'
export default {
    name:'dataisdelete',
    props:['isdeletedialogvisibly','isDeleteRole','asrequestData'],
    watch:{
      'isdeletedialogvisibly':function(){
          this.isDeletevisibly = this.isdeletedialogvisibly;
      }
    },
   data(){
       return{
           isDeletevisibly:false,
       }
   },
   methods:{
       deletePatternItem(){
        //删除
        let options = {
          shopId:sessionStorage.getItem('miniprogram'),
          //styleId:'41650f28b76f4f508b0c917202d16c93',
          styleId:this.asrequestData,
          dataList:[{updateType:4,updateData:4}]
        }
        console.log('查看删除参数:',options);
        programGirardUpdate(options).then((res)=>{
          console.log('款式删除：',res);
          if(res.status == 200){
              this.isDeletevisibly = false;
              this.$emit('setDeletedialogvisibly',this.isDeletevisibly);
              this.$message({type:'success',message:'删除成功'});
              this.$emit('delmessageBack','');
          }
        },(err)=>{
            this.$store.dispatch('workPopupError', res.data.msg);
        })
      },
       handleclose(){
           this.isDeletevisibly = false;
           this.$emit('setDeletedialogvisibly',this.isDeletevisibly);
           this.$message({type: 'info',message: '已取消删除'});
       },
       confirmrequest(){
           //确认
            this.deletePatternItem();
        //    if(this.isDeleteRole == 'Y'){
        //           this.deletePatternItem();
        //    }else{
        //        this.$store.dispatch('workPopupError', '无权限删除');
        //    }
       }
   }
}
</script>

<style lang="scss" scoped>
  .outeronehtml{
            width: 320px;
            height: 240px;
            position: relative;
            .headerimg{
                position: absolute;
                width: 50px;
                height: 50px;
                top:30px;
                left: 42%;
            }
            h3{
                position: absolute;
                top:90px;
                left: 45%;
            }
            span{
                position: absolute;
                top:125px;
                left: 0;
                right: 0;
                text-align: center;
                margin: auto;
            }
            .mybtn-div{
                border: 1px solid #2993f8;
                width: 100px;
                height: 28px;
                border-radius: 5px;
                line-height: 28px;
                text-align: center;
                color: #fff;
                background-color: #2993f8;
                position: absolute;
                bottom: 30px;
                left: 55%;
                cursor: pointer;
            }
            .clost-div{
                border: 1px solid #bdbdbd;
                width: 100px;
                height: 28px;
                border-radius: 5px;
                line-height: 28px;
                text-align: center;
                color: #fff;
                background-color: #bdbdbd;
                position: absolute;
                bottom: 30px;
                left: 15%;
                cursor: pointer;
            }
            .close-icon{
                position: absolute;
                top: 14px;
                right: 14px;
                display: inline-block;
                width: 18px;
                height: 18px;
                cursor: pointer;
                z-index: 99999;
             }
  }
</style>

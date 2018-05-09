<template>
   <el-dialog class="dialog-w320-hAuto-hn" :before-close="handleclose" :visible.sync="isDeletevisibly">
        <div class="outeronehtml">
            <img class="close-icon" src="../../../assets/img/close-preview.png" @click.stop="handleclose" />
            <img class="headerimg" src="../../../../static/img/message/5.png" />
            <h3>提示</h3>
            <span>信息未保存，是否确定返回?</span>
            <div class="clost-div"  @click.stop="handleclose">取&nbsp;消</div>
            <div class="mybtn-div" @click.stop="confirmrequest">确&nbsp;定</div>
        </div>
   </el-dialog>
</template>

<script>
export default {
    props:['isVisible'],
    watch:{
        'isVisible':function (){
             this.isDeletevisibly = this.isVisible;
        }
    },
   data(){
       return{
           isDeletevisibly:false,
       }
   },
   methods:{
       handleclose(){
           this.$emit("comfirmgoback",this.isDeletevisibly);
       },
      confirmrequest(){
          this.$emit('goback');
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
                left: 23%;
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

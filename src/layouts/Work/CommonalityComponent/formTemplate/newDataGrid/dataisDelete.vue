<template>
   <el-dialog :modal="false" class="dialog-w320-hAuto-hn" :before-close="handleclose" :visible.sync="isDeletevisibly">
        <div class="outeronehtml">
            <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
            <img class="headerimg" src="../../../../../../static/img/message/5.png" />
            <h3>提示</h3>
            <span>此操作将使该商品从单据中移除, 是否继续?</span>
            <div class="clost-div"  @click.stop="handleclose">取&nbsp;消</div>
            <div class="mybtn-div" @click.stop="confirmrequest">确&nbsp;定</div>
        </div>
   </el-dialog>
</template>

<script>
import {operateProductList} from 'Api/commonality/operate'
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
       handleclose(){
           this.isDeletevisibly = false;
           this.$emit('setDeletedialogvisibly',this.isDeletevisibly);
           this.$message({type: 'info',message: '已取消删除'});
       },
       confirmrequest(){
           //确认
           if(this.isDeleteRole == 'Y'){
                  operateProductList(this.asrequestData).then((res) => {
						// console.log(res)
						if (res.data.state == 200) {
							this.$message({
								type: 'success',
								message: '删除成功'
							});
							this.$emit('delmessageBack', 1);
						} else {
							this.$store.dispatch('workPopupError', res.data.msg);
						}
                         this.isDeletevisibly = false;
                         this.$emit('setDeletedialogvisibly',this.isDeletevisibly);
					}, (res) => {
						this.$store.dispatch('workPopupError', res.data.msg);
					})
           }else{
               this.$store.dispatch('workPopupError', '无权限删除');
           }
       }
   }
}
</script>

<style lang="scss" scoped>
  .outeronehtml{
            z-index: 9999;
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
                left: 9%;
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

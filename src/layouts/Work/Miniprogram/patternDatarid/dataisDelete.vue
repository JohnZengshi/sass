<template>
   <el-dialog class="dialog-w320-hAuto-hn" :before-close="handleclose" :visible.sync="isDeletevisibly">
        <div class="outeronehtml">
            <img class="close-icon" src="../../../../assets/img/close-preview.png" @click.stop="handleclose" />
            <img class="headerimg" src="../../../../../static/img/message/5.png" />
            <h3>提示</h3>
            <span>是否取消该商品关联款式?</span>
            <div class="clost-div"  @click.stop="handleclose">取&nbsp;消</div>
            <div class="mybtn-div" @click.stop="confirmrequest">确&nbsp;定</div>
        </div>
   </el-dialog>
</template>

<script>
 import { programGirardProductHandler} from 'Api/commonality/seek.js'
export default {
    name:'dataisdelete',
    props:['isdeletedialogvisibly','isDeleteRole','asrequestData','shopId','styleId'],
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
        //    if(this.isDeleteRole == 'Y'){
               
                let options ={
                      shopId:this.shopId,
                      styleId:this.styleId,
                      operateType:1,// 1 删除  2新增
                      barcode:this.asrequestData//商品条码号
                  }
                  if(this.styleId != '' && this.styleId != null){
                     options.styleId = this.styleId;//新增商品必定是在有ID 之后
                  }else if(this.$route.query.stid != '' && this.$route.query.stid != null){
                     options.styleId = this.$route.query.stid;
                  }
                  programGirardProductHandler(options).then((res)=>{
                      console.log('获取是否添加成功商品到款号下',res);
                      if(res.status == 200){
                          this.$emit('deletePatternitem','');
                         // this.getprogramProductGirardList();
                      }
                      this.isDeletevisibly = false;
                      this.$emit('setDeletedialogvisibly',this.isDeletevisibly);
                  },(err)=>{
                      //错误
                  })
                //   operateProductList(this.asrequestData).then((res) => {
				// 		// console.log(res)
				// 		if (res.data.state == 200) {
				// 			this.$message({
				// 				type: 'success',
				// 				message: '删除成功'
				// 			});
				// 			this.$emit('delmessageBack', 1);
				// 		} else {
				// 			this.$store.dispatch('workPopupError', res.data.msg);
				// 		}
                //          this.isDeletevisibly = false;
                //          this.$emit('setDeletedialogvisibly',this.isDeletevisibly);
				// 	}, (res) => {
				// 		this.$store.dispatch('workPopupError', res.data.msg);
				// 	})
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

<template>
<div id="shaowdiv">
    <!-- v-model="aboutusdisivity" -->
 <el-dialog class="dialog-w600-hAuto-hn" :before-close="handleClose" :visible.sync="aboutusdisivity" >
         <div class="aboutusfirstdiv">
             <!-- 杨桂林 15012620331 -->
             <div class="qcodeaboutus">
                   <div class="QRcode-container" v-show="false" ref="qrCode">
                        <div class="QRCode"><img src="" id="qrious"></div>
                    </div>
             </div>
             <div class="mycellphone">
                 <span class="cellnumhead">+86</span><span class="linespan"></span>
                 <span class="cellnumcontent">15012620331</span>
             </div>
         </div>
     </el-dialog>
</div>
    
</template>
<script>

export default {
    name:'aboutUs',
    props:['isShowAboutUs'],
    data(){
        return{
           aboutusdisivity:false,
        }
    },create(){
       
    },methods:{
        handleClose(){
            this.aboutusdisivity = false;
            this.$emit('setAboutUsVisible',this.aboutusdisivity);
        },
        
    },watch:{
        'isShowAboutUs':function(){
             if(this.isShowAboutUs){
                  this.aboutusdisivity = this.isShowAboutUs;
             }
            //   new QRious({
            //   element: document.getElementById('qrious'),
            //   size: 180,
            //   value: this.qrCodeUrl //二维码连接
            // });
        }
    }
}
</script>
<style lang="scss" scoped>
  .aboutusfirstdiv{
        position: relative;
        width: 100%;
        height: 590px;  
        background: no-repeat url(../../../assets/img/login/pop.png) rgba(255,255,255, 0.5); 
        .qcodeaboutus{
            position: absolute;
            bottom: 61px;
            left: 88px;
            width: 120px;
            height: 120px;
            background: no-repeat url(../../../assets/img/login/aboutus.png) center;
        }
        .mycellphone{
            width: 230px;
            height: 36px;
            position: absolute;
            bottom: 60px;
            left: 247px;
            span{
                color: #2993f8;
                font-weight: bolder;
            }
             .cellnumhead{
                 font-style:oblique;
                    font-size: 36px;
                    letter-spacing: 2px;
                }
                .linespan{
                   display: inline-block;
                   width: 10px;
                   height: 10px;
                   margin-left: 4px;
                   background: no-repeat url(../../../assets/img/login/line.png)
                }
                .cellnumcontent{
                    font-style:oblique;
                    font-size: 20px;
                    letter-spacing: 1.5px;
                }
        }
  }
</style>

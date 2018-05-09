<template>
   <div class="outdiv">
         <div class="imgdiv" v-if="imgList.length>0">
             <div style="display:inline-block;width:150px;height:150px;position:relative;margin-right:10px;" v-for="(item,index) in imgList" :key="index">
                 <img style="display:inline-block;" :src="item" />
                 <i class="iconfont icon-chuyidong" @click="deletepic(item)" style="width:15px;height:15px;position:absolute;right:5px;top:5px;cursor: pointer;color:red;"></i>
             </div>
            
        </div>
        <div class="custhum" v-else>
            缩略图
        </div>
   </div>

</template>

<script>
export default {
    props: ['switchimgList','shopPic'],
    data () {
        return {
            formatValue: '',
            imgList:[],
        }
    },
    created () {
        if(this.switchimgList.length>0 && this.switchimgList != null){
                this.imgList = this.switchimgList;
            }
    },
    watch: {
        switchimgList:function(){
            if(this.switchimgList.length>0 && this.switchimgList != null){
                this.imgList = this.switchimgList;
            }

        }

    },
    mounted () {
    
    },
    methods: {
        deletepic(item){
            this.$emit('deletePic',item);
         },
    }
}
</script>

<style lang="scss" scoped>
.outdiv{
    position: relative;
    clear: both;
    .imgdiv{
        display: inline-block;
        img{
            border:1px solid #c0ccda;
            width:150px;height:150px;border-radius:5px;margin-right:10px;
        }
        
}
.custhum{
    display: inline-block;
    //position: absolute;
     width:150px;height:150px;border:1px dashed #c0ccda;border-radius:5px;text-align: center;
     background-color: #f5fefa;
     font-size: 18px;
     color: #999;
     line-height: 148px;
           cursor: pointer;
           &:hover{
               border:1px dashed #2993f8;
           }
           
}
}

</style>

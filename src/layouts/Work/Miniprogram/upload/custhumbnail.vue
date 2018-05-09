<template>
   <div class="outdiv">
         <div class="imgdiv" v-if="imgList.length>0">
             <div style="display:inline-block;width:100px;height:100px;position:relative;margin-right:20px;" v-for="(item,index) in imgList" :key="index">
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
    props: ['switchimgList', 'patternvedio'],
    data () {
        return {
            formatValue: '',
            imgList:[],
        }
    },
    created () {
    },
    watch: {
        switchimgList:function(){
            this.imgList = this.switchimgList;
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
            width:100px;height:100px;border-radius:5px;margin-right:10px;
        }
        
}
.custhum{
    display: inline-block;
    //position: absolute;
     width:100px;height:100px;border:1px dashed #c0ccda;border-radius:5px;text-align: center;
     background-color: #f5fefa;
     font-size: 18px;
     color: #999;
     line-height: 100px;
           cursor: pointer;
           &:hover{
               border:1px dashed #2993f8;
           }
           
}
}

</style>

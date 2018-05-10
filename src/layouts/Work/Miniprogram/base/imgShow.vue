<template>
    <div class="img-div-main" v-if="imgSrc">
        <img style="display:inline-block;" :src="imgSrc" />
        <i class="iconfont icon-chuyidong" @click="deletepic" style="width:15px;height:15px;position:absolute;right:5px;top:5px;cursor: pointer;color:red;"></i>
    </div>
</template>

<script>
export default {
    props: ['imgSrc', 'id', 'index'],
    data () {
        return {
            formatValue: '',
            imgList:[],
        }
    },
    mounted () {
    
    },
    methods: {
        deletepic(item){
            let datas = {
                url: this.imgSrc,
                id: this.id,
                index: this.index
            }
            this.$emit('deleteImg', datas);
         },
    }
}
</script>

<style lang="scss" scoped>
.img-div-main{
    display:inline-block;
    width:150px;
    height:150px;
    position:relative;
    margin-right:10px;
    img{
        border:1px solid #c0ccda;
        width:150px;height:150px;border-radius:5px;margin-right:10px;
    }
}
</style>

<template>
<div ref="swiper" class="swiper-container">
    <div class="swiper-wrapper" :style="swiperWrapperStyle">
        <slot></slot>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets">
        <!--<i class="el-icon-more" :class="{hover:el-icon-d-arrow-left}"></i>-->
        <span v-if="slicePageNum != 0" class="firstBtn" @click="prvAction" ref="prvBox">
            <i class="el-icon-more btn1"></i>
            <i class="el-icon-d-arrow-left btn2"></i>
        </span>
        <span class="swiper-wrap-main">
            <span class="swiper-wrap-cont" ref="contentBox">
                <span v-for="index in pageNumber" class="swiper-pagination-bullet swiper-pagination-bullet-custom" :class="{'swiper-pagination-bullet-active': currentPage == index}" @click="currentPage = index">{{index}}</span>
            </span>
        </span>
        <span v-if="slicePageNum != slicePage-1" class="lastBtn" @click="nextAction" ref="nextBox">
            <i class="el-icon-more btn1"></i>
            <i class="el-icon-d-arrow-right btn2"></i>
        </span>
    </div>
</div>
</template>

<script>
export default {
    name: 'Swiper',
    props: ['carouselWidth', 'carouselHeight', 'pageNumber'],
    data() {
        return {
            currentPage: 1,
            slicePage: null,
            slicePageNum: 0
        }
    },
    computed: {
        swiperWrapperStyle() {
            return {
                width: this.carouselWidth * this.pageNumber + 'px',
                transform: 'translateX(' + (this.currentPage - 1) * -this.carouselWidth + 'px)',
                transitionProperty: 'transform',
                transitionDuration: '300ms'
            }
        }
    },
    mounted() {
        ///console.log(this.$refs.contentBox.offsetWidth);
        this.slicePage = Math.ceil(this.$refs.contentBox.offsetWidth / 180);
        //console.log(this.slicePage);
    },
    methods: {
        nextAction() {
            this.slicePageNum++;
            console.log(this.slicePageNum);
            if (this.slicePageNum > this.slicePage - 1) {
                this.slicePageNum = this.slicePage - 1;
            }
            console.log(this.slicePageNum);
            console.log("translateX(" + (this.slicePageNum) * -180 + "px)")
            this.$refs.contentBox.style.transform = "translateX(" + (this.slicePageNum) * -180 + "px)";
            //this.$refs.contentBox.style.marginLeft = (this.slicePageNum) * -180 + "px)";
        },
        prvAction() {
             this.slicePageNum--;
            if (this.slicePageNum < 0) {
                this.slicePageNum = 0;
            }
            console.log("translateX(" + (this.slicePageNum) * -180 + "px)")
            this.$refs.contentBox.style.transform = "translateX(" + (this.slicePageNum) * -180 + "px)";
            //this.$refs.contentBox.style.marginLeft = (this.slicePageNum) * -180 + "px)";
        }
    }
}
</script>

<style lang="scss" scoped>
.swiper-container {
    overflow: hidden;
    position: relative;
    .swiper-wrapper {
        overflow: hidden;
        .swiper-slide {
            float: left;
        }
    }
    .swiper-pagination-bullets {
        position: absolute;
        bottom: -15px;
        width: 100%;
        left: 0;
        text-align: center;
        transition: 300ms;
        transform: translate3d(0, 0, 0);
        .swiper-wrap-main{
            width:180px; overflow:hidden; display:inline-block; white-space:nowrap;
            .swiper-wrap-cont{
                //margin-left:-180px;
                display: inline-block;
                .swiper-pagination-bullet-custom {
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                font-size: 12px;
                color: #000;
                opacity: 1;
                background: rgba(0,0,0,0.2);
                margin: 0 5px;
                cursor: pointer;
                border-radius: 100%;
                display: inline-block;
                }
                .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
                    color:#fff;
                    background: #007aff;
                }
            }
            
        }
        .lastBtn {
            width:30px; height:30px; display:inline-block; cursor: pointer;
        }
        .lastBtn i.btn1{
            display: block;
        }
        .lastBtn i.btn2{
            display: none;
        }
        .lastBtn:hover i.btn1{
            display: none;
        }
        .lastBtn:hover i.btn2{
            display: block;
        }
        .firstBtn {
            width:30px; height:30px; display:inline-block; cursor: pointer;
        }
        .firstBtn i.btn1{
            display: block;
        }
        .firstBtn i.btn2{
            display: none;
        }
        .firstBtn:hover i.btn1{
            display: none;
        }
        .firstBtn:hover i.btn2{
            display: block;
        }
    }
}
</style>
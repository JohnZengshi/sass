<template>
    <img class="img" v-if="logo != '' && logo != null" :src="logo" />
    <div class="img-bg" v-else ref="img_bg">
        <span ref="icon" class="iconfont icon-circle"></span>
        <!-- <div class="inset-bg" ref="inset_bg"> -->
        <div ref="name" class="img-name">{{formatValue}}</div>

    </div>
</template>

<script>
export default {
    props: ['userName', 'size', 'logo'],
    data () {
        return {
            formatValue: ''
        }
    },
    created () {
    },
    watch: {
        'userName' (val) {
            // this.formatFunction()
            // this.customStyle()
            console.log('啦啦啦，userName',val)
            setTimeout(() => {
                this.formatFunction()
                this.customStyle()
            }, 0)
        }
    },
    mounted () {
        setTimeout(() => {
            this.formatFunction()
            this.customStyle()
        }, 500)
    },
    methods: {
        formatFunction () { // 格式化名字
            let temValue = ''
            let secondValue = ''
            if (this.userName) {
                temValue = this.userName.substring(0, 1)
                // secondValue = this.userName.substring(1, 2)
                console.log('数字1',temValue)
                this.formatValue = temValue
            }
            // let temValue = this.userName.substring(0, 1)
            if (/^[a-zA-Z]$/.test(temValue)) {
                // this.formatValue = 
                if (/^[a-zA-Z]$/.test(secondValue)) {
                    // this.formatValue = temValue.toUpperCase() + secondValue.toLowerCase()
                    this.formatValue = temValue.toUpperCase()
                } else if (/^[\u4E00-\u9FA5]$/.test(secondValue)) {
                    this.formatValue = temValue
                }
            } else if (/^[\u4E00-\u9FA5]$/.test(temValue)) {
                this.formatValue = temValue
            }

        },
        customStyle () { // 自定义样式
            console.log('我进来了')
            if (this.$refs.name) {
                console.log('我有refs')
                this.$refs.img_bg.style.width = this.size + 'px'
                this.$refs.img_bg.style.height = this.size + 'px'
                // this.$refs.img_bg.style.padding = (this.size * 4) / 70 + 'px'

                this.$refs.icon.style.fontSize = this.size + 'px'
                this.$refs.icon.style.lineHeight = this.size + 'px'
                
                // this.$refs.inset_bg.style.width = this.size - ((this.size * 4) / 70 * 2) + 'px'
                // this.$refs.inset_bg.style.height = this.size - ((this.size * 4) / 70 * 2) + 'px'
                // this.$refs.inset_bg.style.marginLeft =  - (this.size / 2) + 'px'
                // this.$refs.inset_bg.style.marginTop =  - (this.size / 2) + 'px'

                this.$refs.name.style.lineHeight = this.size + 'px'
                this.$refs.name.style.fontSize = parseInt((this.size * 38) / 70) + 'px'
            }
            
        }
    },
    updated(){
        console.log('嘿,logo',this.logo)
        console.log('嘿,userName',this.userName)
        console.log('嘿,size',this.size)
    }
}
</script>

<style lang="scss" scoped>
.img-bg {
    display: inline-block;
    position: relative;
    .icon-circle {
        color:#ffb54a;
        position: absolute;
        top: 3px;
        left: 1px;
        font-size: 0;
    }
    .img-name {
        font-weight: bold;
        color:#ffb54a;
        text-align: center;
    }
}
</style>

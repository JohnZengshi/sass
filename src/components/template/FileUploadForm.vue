<template>
<div class="file-upload-form-container">
    <form ref="form" method="post" enctype="multipart/form-data" @submit.prevent>
        <input type="hidden" name="op" value="upload">
        <input ref="imageInput" size="0" name="fileContent" type="file" accept="image/gif,image/jpeg,image/png" @change="changeURL">
        <input type="hidden" name="insertOnly" value="0">
    </form>
</div>
</template>

<script>
import 'whatwg-fetch'
import PrintAPI from '../../Api/print'
export default {
    methods: {
        getFilename() {
            if (this.$refs.imageInput.value) {
                let filename = /[/\\][^/\\]*?$/.test(this.$refs.imageInput.value) ? this.$refs.imageInput.value.match(/[/\\]([^/\\]*?)$/)[1] : this.$refs.imageInput.value
                return filename
            } else {
                return ''
            }
        },
        changeURL(e) {
            let filename = this.getFilename()
            if (filename) {
                PrintAPI.getAppSign({
                    type: 3
                }, (error, {
                    sign,
                    dir_name
                }) => {
                    if (error) {
                        alert(error)
                    } else {
                        let appid = '1252389350'
                        let bucket_name = 'jzm'
                        dir_name = encodeURIComponent(dir_name)
                        filename = Date.now() + '_' + filename
                        let url = 'https://gz.file.myqcloud.com/files/v2/' + appid + '/' + bucket_name + '/' + dir_name + '/' + encodeURIComponent(filename) + '?sign=' + encodeURIComponent(sign)
                        fetch(url, {method: 'POST', body: new FormData(this.$refs.form)}).then(res => res.json()).then(json => {
                            if (json.code) {
                                this.$emit('uploadFail', json.message)
                            } else {
                                this.$emit('uploadSuccess', json.data)
                            }
                        })
                    }
                })
            }
        }
    },
    mounted() {
        this.$on('reset', () => {
            this.$refs.imageInput.value = ''
        })
    }
}
</script>

<style lang="scss">
@import "~assets/css/template/mixin.scss";
.file-upload-form-container {
    z-index: 100;
    form {
        @include full;
        overflow: hidden;
        input[type="file"] {
            font-size: 100px;
            @include full;
            opacity: 0;
            filter: alpha(opacity=0);
        }
    }
    
    iframe {
        display: none;
    }
}
</style>
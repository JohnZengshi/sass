<template>
    <el-dialog class="quality-template-selector-dialog" title="选择打印模板" v-model="isShown" @close="reset" :close-on-click-modal="false" size="tiny">
        <div class="content">
            <el-select class="template-selector" v-model="templateId" placeholder="请选择">
                <el-option :label="qualityTemplate.templateName" :value="qualityTemplate.templateId" v-for="qualityTemplate in qualityTemplateList">
                </el-option>
            </el-select>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="print">打 印</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Vue from 'vue'
import {
    Dialog,
    Select,
    Option,
    Button
} from 'element-ui'
import find from 'lodash/find'
import printAPI from './../../../../Api/print'
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
export default {
    data() {
            return {
                isShown: false,
                templateId: '',
                qualityTemplateList: [],
            }
        },
        props: ['orderNum'],
        watch: {
            qualityTemplateList() {
                let defaultTemplate = find(this.qualityTemplateList, {
                    defaultFlag: 'Y'
                })
                //console.log(defaultTemplate)
                if (defaultTemplate) {
                    this.templateId = defaultTemplate.templateId
                }
            }
        },
        methods: {
            close() {
                this.isShown = false
            },
            show() {
                this.isShown = true
                window.addEventListener('keydown', this.keydownHandler)
            },
            reset() {
                this.currentPage = 1
                this.searchText = ''
                this.selectedProducts = []
                window.removeEventListener('keydown', this.keydownHandler)
            },
            //按下回车删除模板
            keydownHandler(e) {
                if (e.keyCode == 13) {
                    this.search()
                }
            },
            print() {
                let selectedTemplate = find(this.qualityTemplateList, {
                    templateId: this.templateId
                })
                this.$emit('printOrder', this.orderNum, selectedTemplate && JSON.parse(selectedTemplate.content))
            }
        },
        mounted() {
            printAPI.getTemplateList({type: 1, fieldType: 'simple'}).then(json => {
                this.qualityTemplateList = json.data.qualityList
            })
        }
}
</script>

<style lang="scss">
@import "~assets/css/template/fonts.scss";
@import "~assets/css/template/colors.scss";
.quality-template-selector-dialog {
    @import "~assets/css/template/dialog.scss";
    .template-selector {
        width: 100%;
    }
}
</style>

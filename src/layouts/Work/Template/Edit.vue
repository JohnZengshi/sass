<template>
    <div>
	    	<div style="display: none;">
	    		<setting-template  ref="settingTemplate" :template="canvas"></setting-template>
	    	</div>
        <div class="template-edit-page">
            <div class="breadcrumb">
                <router-link class="breadcrumb-item" to="/mainIndex" exact>返回上一级</router-link>
                <span class="breadcrumb-item">工作</span>
                <span class="breadcrumb-item">打印模板</span>
                <span class="breadcrumb-item">编辑{{ templateType }}</span>
            </div>
            <div class="template-edit-content">
                <TemplateEditor ref="templateEditor" :propList="propList" :template="template" :templateData="templateData" @openBackConfirmDialog="openBackConfirmDialog" @openDeleteConfirmDialog="openDeleteConfirmDialog" @openComponentRangeOutsideAlertDialog="openComponentRangeOutsideAlertDialog" @preview="previewTemplate" @loadQualityTemplateData="loadQualityTemplateData" @openLoadLabelTemplateDataDialog="openLoadLabelTemplateDataDialog"></TemplateEditor>
            </div>
            <ConfirmDialog ref="backConfirmDialog" title="返回" content="还未保存，是否确认要退出？" :onConfirmHandler="backConfirmHandler"></ConfirmDialog>
            <ConfirmDialog ref="deleteConfirmDialog" title="删除" content="确认删除选中的组件？" :onConfirmHandler="deleteConfirmHandler"></ConfirmDialog>
            <AlertDialog ref="componentRangeOutsideAlertDialog" title="警告" content="打印时不打印画布大小以外的数据"></AlertDialog>

            <!--预览-->
            <TemplatePreviewDialog
                ref="templatePreviewDialog"
                @print="printTemplate"
                :canvas="canvas"
                :templateData="templateData"
                :pageNumber="pageNumber"
                @close="templatePreviewDialogCloseHandler"></TemplatePreviewDialog>
            <LoadLabelTemplateDataDialog ref="loadLabelTemplateDataDialog" @loadLabelTemplateData="loadLabelTemplateData"></LoadLabelTemplateDataDialog>
        </div>


        <!--质保单打印-->
        <div id="windowPrintView"  v-if="isPreview" ref="windowPrintView">
            <TemplatePreviewCanvasComponent
                :isPrintCanvas="true"
                :canvas="canvas"
                :templateData="templateData"
                :class ="i%2==0 ? 'printViewInside' : ''"
                v-for="i in pageNumber" :page="i">
            </TemplatePreviewCanvasComponent>
        </div>

        <!--单据打印-->
        <lodop ref="lodop" :canvas="canvas"  :templateData="templateData" :page="templateData.productList.length" ></lodop>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import Vue from 'vue'
import TemplateEditor from 'components/template/TemplateEditor'
import ConfirmDialog from 'components/template/ConfirmDialog'
import AlertDialog from 'components/template/AlertDialog'
import TemplatePreviewDialog from 'components/template/TemplatePreviewDialog'
import LoadLabelTemplateDataDialog from 'components/template/LoadLabelTemplateDataDialog'
import TemplatePreviewCanvasComponent from 'components/template/TemplatePreviewCanvas'
import Lodop from 'components/template/Lodop'
import settingTemplate from "@/components/jcp-print/setting/template";
export default {
    name: 'TemplateEditPage',
    data() {
        return {
            templateId: this.$route.query.templateId,
            canvas: {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: [

                ]
            },
            templateData: {
                productList: [],
                backuProductList :[]
            },
            isPreview: false
        }
    },
    watch:{
      pageNumber:function(){
        console.log('pageNumber111:',this.pageNumber)
      }
    },
    computed: {
        // 打印总页数
        pageNumber() {
            let number = 0
            this.canvas.components.forEach(component => {
                if (component.type === 'ItemListComponent') {
                    number = component.data.number
                }
            })
            // 如果没有list，则返回一页
            if (!number) {
                return 1
            } else {
                return Math.ceil(this.templateData.productList.length / number) || 1
            }
        },
        templateType() {
            return this.template.type == 1 ? '质保单' : '标签'
        },
        // 返回state的属性列表和模板详情到编辑器
        ...mapState({
            propList: state => state.template.propList,
            template: state => state.template.detail
        })
    },
    components: {
        TemplateEditor,
        ConfirmDialog,
        AlertDialog,
        TemplatePreviewDialog,
        LoadLabelTemplateDataDialog,
        TemplatePreviewCanvasComponent,
        Lodop,
    		settingTemplate,
    },
    methods: {
        // 键盘处理函数，处理删除，复制，粘贴组件
        keydownHandler(e) {
            if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
                switch (e.keyCode) {
                    case 8:
                    case 46:
                        this.$refs.templateEditor.$emit('delete_keyup', e)
                        break
                    case 67:
                        if (e.ctrlKey || e.metaKey) {
                            this.$refs.templateEditor.$emit('copy_keyup', e)
                        }
                        break
                    case 86:
                        if (e.ctrlKey || e.metaKey) {
                            this.$refs.templateEditor.$emit('paste_keyup', e)
                        }
                        break
                    case 89:
                        if (e.ctrlKey || e.metaKey) {
                            this.$refs.templateEditor.$emit('redo_keyup', e)
                        }
                        break
                    case 90:
                        if (e.ctrlKey || e.metaKey) {
                            this.$refs.templateEditor.$emit('undo_keyup', e)
                        }
                        break
                    case 37:
                        this.$refs.templateEditor.$emit('move_keyup', 'left')
                        break
                    case 38:
                        this.$refs.templateEditor.$emit('move_keyup', 'up')
                        break
                    case 39:
                        this.$refs.templateEditor.$emit('move_keyup', 'right')
                        break
                    case 40:
                        this.$refs.templateEditor.$emit('move_keyup', 'down')
                        break
                }
                e.preventDefault()
            }
            return false
        },
        mouseupHandler(e) {
            this.$refs.templateEditor.$emit('mouseup', e)
        },
        openBackConfirmDialog() {
            this.$refs.backConfirmDialog.show()
        },
        openDeleteConfirmDialog() {
            this.$refs.deleteConfirmDialog.show()
        },
        openComponentRangeOutsideAlertDialog() {
            this.$refs.componentRangeOutsideAlertDialog.show()
        },
        backConfirmHandler() {
            this.$refs.backConfirmDialog.close()
            this.$router.go(-1)
        },
        deleteConfirmHandler() {
            this.$refs.deleteConfirmDialog.close()
            this.$refs.templateEditor.$emit('delete_confirm')
        },
        // 预览模板
        previewTemplate(canvas) {
            this.canvas = canvas;
            this.$refs.settingTemplate.print(canvas);
//
////          this.canvas.components.forEach(component => {
////             console.log('预览模板:',component.type)
////          })
//          this.isPreview = true
//
//          if(  this.template.type == 2 ){ //标签
//          	this.printTemplate()
//          }else{
//          	this.$refs.templatePreviewDialog.show()
//          }
        },
        templatePreviewDialogCloseHandler() {
            this.isPreview = false
            this.canvas = {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: [

                ]
            }
        },
        // 打印模板
        printTemplate() {
            if(  this.template.type == 2 ){
                Vue.nextTick(() => {
                	this.$refs.lodop.multipagePrint()
                })
            }else{
               //质保单打印，情况特殊一点 ，需要单独处理
                let print = null;

                this.appPrint = document.getElementById('appPrint')

                if( this.IntervalOut ) clearInterval( this.IntervalOut )
                document.getElementById('app').style.display = 'none';

                setTimeout(()=>{
                    this.appPrint.innerHTML = this.$refs.windowPrintView.innerHTML
                },1000)
                //return
                setTimeout(()=>{
                    print = document.execCommand('print');
                },1500)

                this.IntervalOut = setInterval(()=>{
                    if( print ){
                        document.getElementById('app').style.display = 'block';
                        if( this.IntervalOut ) clearInterval( this.IntervalOut )
                        this.IntervalOut = null;
                        this.appPrint.innerHTML = '';
                    }else if( print == false ){
                        if( this.IntervalOut ) clearInterval( this.IntervalOut )
                        if(!window.print()){
                            document.getElementById('app').style.display = 'block';
                            this.IntervalOut = null;
                            this.appPrint.innerHTML = '';
                        }
                    }
                },10)

            }
        },
        // 加载数据用于预览效果
        loadQualityTemplateData() {
            this.$store.dispatch('getPrintQualityData', {
                orderId: Date.now(),
                isTmp: 1
            }).then(json => {
                if (json.state === 200) {

                    if(json.data.backuProductList && json.data.backuProductList.length > 0 ){
                      if(json.data.productList) json.data.productList.push(...json.data.backuProductList)
                    }
                    this.templateData = json.data
                }
            })
        },
        openLoadLabelTemplateDataDialog() {
            this.$refs.loadLabelTemplateDataDialog.show()
        },
        loadLabelTemplateData(productType) {
            this.$store.dispatch('getPrintLabelData', {
                isTmp: 1,
                productType: productType
            }).then(json => {
                if (json.state === 200) {
                    this.templateData = json.data
                    this.$refs.loadLabelTemplateDataDialog.close()
                }
            })
        }
    },
    mounted() {
        // 请求模板的详情，然后根据模板类型请求属性作为菜单，并把模板的画布内容初始化到编辑器上
        this.$store.dispatch('previewTemplate', this.templateId).then(json => {
                if (json.state === 200) {
                    this.$refs.templateEditor.$emit('set_canvas', json.data.content)
                    this.$store.dispatch('getPrintMenuData', json.data.type)
                }
            })
            // 初始化键盘事件
        window.addEventListener('keydown', this.keydownHandler)
        window.addEventListener('mouseup', this.mouseupHandler)
    },
    destroyed() {
        // 移除组件时移除键盘事件
        window.removeEventListener('keydown', this.keydownHandler)
        window.removeEventListener('mouseup', this.mouseupHandler)
    }
}
</script>

<style scoped>
#windowPrintView{
  visibility: hidden;
  opacity: 0;
}
</style>

<style lang="scss">
@import "~assets/css/template/mixin.scss";
@import "~assets/css/template/fonts.scss";
@import "~assets/css/template/colors.scss";


@media screen {
    .template-edit-page {
        display: block;
        padding: 0 20px;
        @import "~assets/css/template/breadcrumb.scss";
        .template-edit-content {
            .template-editor {
                position: absolute;
                top: 60px;
                bottom: 0;
                left: 20px;
                right: 20px;
                box-shadow: 0px 0 15px #e2e2e2;
                border-radius: 7px;
                overflow: hidden;
            }
        }
    }
    .template-print-canvas {
        //opacity: 0;
        //display: none;
        //visibility: hidden;
    }
}

@media print {
    body, .work, .work-view {
        background-color: #fff !important;
    }

    /*.template-edit-page {
        display: none;
    }
    .template-print-canvas {
        opacity: 1;
        display: block;
    }*/
}
</style>

<template>
    <div class="edit-div">
        <quill-editor 
            class="edit-div"
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" 
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script type="text/ecmascript-6">
import { getCaretPosition } from "assets/js/dom.js";
import { quillEditor } from 'vue-quill-editor'
    export default {
        props: ["text"],
        data() {
            return {
                content:"",
                editorOption: {
                    modules: {
                        toolbar: null
                    }
                },
                cursorIndex:0,//光标位置 
                editor:null
            }
        },
        computed: {},
        components:{
        },
        watch: {
            "text"(val){
                this.editor.setText(val)
            },
            "content"(val){
                let text = this.editor.getText();
                this.$emit("contentChange",text);
            }
        },
        methods: {
            changeText() {},
            addWord: function (word) {
                let newWord = "("+word+")"
                this.editor.insertText(this.cursorIndex,newWord,{
                    'color':'#3195F5',
                    'background':'#F6F7F8',
                    'blockquote':'1213'
                })
                // this.editor.clipboard.dangerouslyPasteHTML(this.cursorIndex, '&nbsp;<b color:"#3195F5">'+ word +'</b>');
            },
            onEditorBlur($event){},
            onEditorFocus($event){
                this.cursorIndex = $event.getSelection().index;
            },
            onEditorChange($event){}
        },
        created(){
            
        },
        mounted() {
            this.editor = this.$refs['myQuillEditor'].quill;
        }
    }

</script>
<style lang="less" scoped>
     .edit-div {
        width: 100%;
        height: 211px;
    }
</style>

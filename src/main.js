import Vue from 'vue'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import resource from 'vue-resource'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'
import AsyncComputed from 'vue-async-computed' //可异步操作计算属性
import  VueQuillEditor from 'vue-quill-editor' //富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 自定义指令
import directives from './base/mineDirective/elm'
Vue.use(elementUI)
Vue.use(resource)
Vue.use(store)
Vue.use(directives)
Vue.use(AsyncComputed)
Vue.use(VueQuillEditor);
// Vue.use(axios)
/* eslint-disable no-new */
let vue = new Vue({
    el: '#app',
    router: router,
    store: store,
    template: '<App/>',
    components: {
        App
    }
})

Object.assign( Vue.prototype, {

   /* 小数点精确截取
    * @arguments
    * n 数字
    * fixed 小数点精确位数
    */
   toFixed: (n, fixed) => {

        //空值处理
        if ( typeof n == 'undefined' || n == null  ){
          return '-'
        }

        //空
        if ( n.length == 0 || (n.length == 1 && n.indexOf('-') >= 0)){
          return '-'
        }

        let str = n + '',
            splitlen = 0,
            num = n

        //非数字
        if( !/^[\d.-]+$/.test(str) ){
          return n
        }

        if ( typeof str === 'string' && str.includes('.')) {
          splitlen = str.split('.')[1].length
        }

        if ( splitlen >= 0  || n.length == 1 ) {
          num = parseFloat(n).toFixed(fixed)
        }

        return num
   },
   globalRoute : router,
   store: store,
})

window.eventBus = new Vue();

<template>
    <el-dialog class="order-product-list-dialog" title="商品标签" v-model="isShown" @open="loadData" @close="reset" size="large">
        <div class="content">
            <div class="menu-bar">
                <el-input v-model="searchText" class="search-input" :autofocus="true" icon="search" :on-icon-click.enter="search"></el-input>
                <label>模板</label>
                <el-select class="template-selector" v-model="templateId" placeholder="请选择">
                    <el-option :label="labelTemplate.templateName" :value="labelTemplate.templateId" v-for="labelTemplate in labelTemplateList">
                    </el-option>
                </el-select>
                <el-button class="preview-btn" @click="preview(false)">预览</el-button>
            </div>
            <div class="product-list-table-wrap">
                <table class="product-list-table" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <td class="checkbox"></td>
                            <td>序号</td>
                            <td>条码号</td>
                            <td>当前状态</td>
                            <td>首饰名称</td>
                            <td>总件重（g）</td>
                            <td>售价（元）</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in productList" v-if="isShown">
                            <td class="checkbox"><el-checkbox :checked="selectedProducts.includes(product.productId)" @change="toggleProduct(product.productId)"></el-checkbox></td>
                            <td class="num">{{ product.num }}</td>
                            <td class="barcode">{{ product.barcode }}</td>
                            <td class="status">{{ product.status }}</td>
                            <td class="jewelry">{{ product.jewelry }}</td>
                            <td class="weight">{{ product.weight }}g</td>
                            <td class="price">¥{{ product.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="preview(true)">打 印</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import {
    Dialog,
    Button,
    Input,
    Pagination
} from 'element-ui'
import find from 'lodash/find'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)

export default {
    data() {
            return {
                isShown: false,
                currentPage: 1,
                pageSize: 10,
                searchText: '',
                templateId: '',
                selectedProducts: []
            }
        },
        props: ['labelTemplateList', 'productList', 'orderNum', 'totalNum'],
        watch: {
            labelTemplateList() {
                let defaultTemplate = find(this.labelTemplateList, {
                    defaultFlag: 'Y'
                })
                if (defaultTemplate) {
                    this.templateId = defaultTemplate.templateId
                }
            }
        },
        methods: {
            close() {
                this.isShown = false
                this.$emit('clearData', {
                        state: false
                })
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
                this.isShown = false
                this.$emit('clearData', {
                        state: false
                })
            },
            //按下回车搜索商品
            keydownHandler(e) {
                if (e.keyCode == 13) {
                    this.search()
                }
            },
            loadData() {
                // this.$emit('requestProductList', {
                //     orderNum: this.orderNum,
                //     page: this.currentPage,
                //     pageSize: this.pageSize
                // })
            },
            search() {
                this.currentPage = 1
                if (this.searchText) {
                    console.log(1111111111)
                    this.$emit('requestProductList', {
                        searchKey: this.searchText,
                        page: this.currentPage,
                        pageSize: this.pageSize
                    })
                } else {
                    this.$emit('requestProductList', {
                        orderNum: this.orderNum,
                        page: this.currentPage,
                        pageSize: this.pageSize
                    })
                }
            },
            //选中某个商品
            toggleProduct(productId) {
                if (this.selectedProducts.includes(productId)) {
                    let i = this.selectedProducts.indexOf(productId)
                    this.selectedProducts.splice(i, 1)
                } else {
                    this.selectedProducts.push(productId)
                }
                console.log(this.selectedProducts);
            },
            //全选商品
            toggleSelectAllProducts() {
                if (this.selectedProducts.length == this.productList.length) {
                    this.selectedProducts = []
                } else {
                    this.selectedProducts = this.productList.map(product => product.productId)
                }
            },
            //选中从from到to个商品，包含第from和第to个
            selectPartOfProducts(from, to) {
                this.selectedProducts = this.productList.slice(from - 1, to).map(product => product.productId)
            },
            //预览，是否马上打印
            preview(isPrint) {
                if (this.templateId) {
                    if (!isPrint || this.selectedProducts.length) {
                        this.$store.dispatch('previewTemplate', this.templateId).then(json => {
                            if (json.state == 200) {
                                let canvas = json.data.content
                                this.$emit('previewTemplate', JSON.parse(canvas), this.selectedProducts, isPrint)
                            }
                        })
                    } else {
                        this.$store.dispatch('workPopupError', '请先选择打印商品')
                    }
                } else {
                    this.$store.dispatch('workPopupError', '请选择打印模板')
                }
            },
            //改变页码后重新请求列表
            handleCurrentChange(page) {
                this.currentPage = page
                if (this.searchText) {
                    this.$emit('requestProductList', {
                        searchKey: this.searchText,
                        page: this.currentPage,
                        pageSize: this.pageSize
                    })
                } else {
                    this.$emit('requestProductList', {
                        orderNum: this.orderNum,
                        page: this.currentPage,
                        pageSize: this.pageSize
                    })
                }
            }
        }
}
</script>

<style lang="scss">
@import "~assets/css/template/mixin.scss";
@import "~assets/css/template/fonts.scss";
@import "~assets/css/template/colors.scss";
.order-product-list-dialog {
    @import "~assets/css/template/dialog.scss";
    .el-dialog {
        width: 1000px; 
        .el-dialog__body {
            padding: 0;
            .content {
                .menu-bar {
                    padding: 20px 30px;
                    label {
                        margin-right: 10px;
                    }
                    >.el-input, >.el-select {
                        width: 300px;
                        margin-right: 30px;
                        .el-input__inner {
                            height: 30px;
                            @include BD1;
                            @include TC1;
                            &:focus, &:hover {
                                @include BD1;
                            }
                        }
                    }
                    .template-selector {
                        margin-right: 20px;
                    }
                    .preview-btn {
                        padding: 7px 15px;
                        @include TC4;
                        border: 1px solid $C1;
                    }
                }
                .product-list-table-wrap {
                    .product-list-table {
                    width: 100%;
                    margin-bottom: 20px;
                    thead {
                        background-color: #e8e9eb;
                        td {
                            height: 44px;
                            @include F(12);
                            @include TC2;
                            font-weight: bold;
                        }
                        .checkbox {
                            width: 130px;
                        }
                    }
                    tbody {
                        tr {
                            td {
                                height: 44px;
                                line-height: 44px;
                                border-bottom: 1px solid #d6d6d6;
                            }
                            .el-checkbox {
                                margin-left: 30px;
                            }
                            .checkbox {
                                width: 130px;
                                input[type="checkbox"] {
                                    display: block;
                                    width: 20px;
                                    height: 20px;
                                    margin-left: 30px;
                                    @include BD1;
                                    border-radius: 50%;
                                }
                            }
                            .num {
                                width: 104px;
                                @include F(12);
                                font-weight: bold;
                            }
                            .barcode {
                                width: 136px;
                            }
                            .status {
                                width: 128px;
                            }
                            .weight {
                                width: 116px;
                            }
                            .price {

                            }
                        }
                    }
                }
                }
                
            }
        }
    }
}
</style>
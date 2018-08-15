<template>
    <div class="item-list-component" :style="componentStyle" v-if="!isPreview">
        <div class="resize"></div>
    </div>
    <div class="item-list-component" v-else>
        <component v-for="child in items" :is="child.type" :showEmpty="showEmpty" :isPreview="true" :parent="null" class="component" :item="data" :data="child.data" :productList="productList" :templateData="templateData" @changeComponentData="changeComponentData(child, $event)" :changeComponentData="changeComponentData">

        </component>
        <!-- 需求改变，暂时屏蔽 -->
        <!--     <div class="page" v-show="sumPage" :style="pageStyle">{{ page }}-{{ sumPage }}页</div> -->
    </div>
</template>

<script>
    import TextComponent from './Text'
    import ImageComponent from './Image'
    import LineComponent from './Line'
    import PropertyComponent from './Property'
    import ItemListComponent from './ItemList'
    import ContainerComponent from './Container'
    import find from 'lodash/find'

    import {
        getComponentTranslate
    } from '../../utils/print'

    export default {
        props: ['isPreview', 'parent', 'data', 'templateData', 'page', 'changeComponentData', 'showEmpty'],
        components: {
            TextComponent,
            ImageComponent,
            LineComponent,
            PropertyComponent,
            ItemListComponent,
            ContainerComponent
        },
        data() {
            return {
                children: [],
                productList: []
            }
        },
        computed: {
            componentStyle() {

                let top = this.parent ? this.data.top - this.parent.top : this.data.top
                let left = this.parent ? this.data.left - this.parent.left : this.data.left
                return {
                    top: top + 'mm',
                    left: left + 'mm',
                    width: this.data.width + 'mm',
                    height: this.data.height + 'mm',
                    transform: 'rotate(' + this.data.rotateDeg + 'deg) ' + getComponentTranslate(this.data),
                    transformOrigin: '0 0',
                    zIndex: this.data.zIndex
                }
            },
            pageStyle() {

                let top = this.parent ? this.data.top - this.parent.top : this.data.top
                let left = this.parent ? this.data.left - this.parent.left : this.data.left
                return {
                    textAlign: 'center',
                    position: 'absolute',
                    top: top + this.data.height - 5 + 'mm',
                    left: left + 'mm',
                    width: this.data.width + 'mm'
                }
            },
            sumPage() {
                let number = this.data.number
                let sumNumber = this.templateData.productList.length
                return Math.ceil(sumNumber / number)
            },
            items() {
                //如果预览时，渲染商品列表，返回属性列表
                this.children = []
                let t = this.data.top
                let h = this.data.height
                let number = this.data.number
                //console.log(t)
                //分页商品列表
                // let productList = this.templateData.productList.slice((this.page - 1) * number, this.page * number)
                let productList = this.templateData.productList;
                //渲染的行数
                if (+this.data.salesId) {
                    productList = this.judgeProductList(productList);
                }
                productList = productList.slice((this.page - 1) * number, this.page * number)

                this.productList = productList;
                number = Math.min(number, productList.length)
                if (number) {
                    //数据之间的间距
                    let gap = h / (number + 1)

                    //每条数据克隆每个属性，定位属性的位置，传递productIndex来定位属性所属的product
                    let maxTop = 0;
                    productList.forEach((item, i) => {
                        let items = JSON.parse(JSON.stringify(this.data.children));

                        // let items = this.resetItems(item);
                        let differencePrice = find(item.codeList, {  //补差价
                            key: 'differencePrice'
                        })
                        let operateFee = find(item.codeList, {   //手工费
                            key: 'operateFee'
                        })
                        let repairGoldWeight = find(item.codeList, { //补金重
                            key: 'repairGoldWeight'
                        })
                        for (let child of items) {
                            child.data.productIndex = (this.page - 1) * this.data.number + i;
                            let itemTop = t + (i + 1) * gap - 0.5 * child.data.height;
                            if (maxTop > itemTop) {
                                itemTop = maxTop + gap;
                            }
                            if (child.type === 'ContainerComponent') { //组合
                                let dy = itemTop - child.data.top;
                                for (let tmp of child.data.children) {
                                    tmp.data.productIndex = (this.page - 1) * this.data.number + i;
                                    if (!differencePrice.value && tmp.data.propertyCode == 'differencePrice') {
                                        continue;
                                    }
                                    if (!operateFee.value && tmp.data.propertyCode == 'operateFee') {
                                        continue;
                                    }
                                    if (!repairGoldWeight.value && tmp.data.propertyCode == 'repairGoldWeight') {
                                        continue;
                                    }
                                    tmp.data.top += dy;
                                    if (tmp.data.top > maxTop) {
                                        maxTop = tmp.data.top;
                                    }
                                }
                            } else {
                                //console.log(child.data.top , child.data.height)
                                child.data.top = t + i * child.data.height;
                                if (child.data.top > maxTop) {
                                    maxTop = child.data.top;
                                }
                            }
                        }
                        this.children.push(...items);
                    })
                } else {
                    //还没加载数据就渲染属性的样本值，只有一行
                    this.data.children.forEach(child => {
                        let childClone = JSON.parse(JSON.stringify(child))
                        childClone.data.productIndex = 0
                        this.children.push(childClone)
                    })
                }
                debugger
                return this.children
            },
        },
        methods: {
            //质保单分组，0全部，1：销售，2：回购and退货
            judgeProductList(productList) {
                let list = [];
                for (let item of productList) {
                    for (let obj of item.codeList) {
                        if (obj.key == 'sellType' && obj.value == '销售' && this.data.salesId == '1') {
                            list.push(item);
                        }
                        if (obj.key == 'sellType' && obj.value != '销售' && this.data.salesId == '2') {
                            list.push(item);
                        }
                    }
                }
                return list;
            },
            // resetItems(item) {
            //     let items = JSON.parse(JSON.stringify(this.data.children));
            //
            //     let differencePrice = find(item.codeList, {  //补差价
            //         key: 'differencePrice'
            //     })
            //     let operateFee = find(item.codeList, {   //手工费
            //         key: 'operateFee'
            //     })
            //     let repairGoldWeight = find(item.codeList, { //补金重
            //         key: 'repairGoldWeight'
            //     })
            //     for (let i = 0; i < items.length; i++) {
            //         let child = items[i];
            //         if (child.type === 'ContainerComponent') { //组合
            //             for (let ii = 0; ii < child.data.children.length; ii++) {
            //
            //             }
            //         }
            //     }
            //     return items;
            // }
        }
    }
</script>

<style lang="scss">
    .item-list-component{
        background-color:rgba(10, 191, 171, .2);
        .resize{
            display:none;
            position:absolute;
            opacity:0;
            filter:alpha(opacity=0);
            width:20px;
            height:20px;
            top:100%;
            left:100%;
            margin-left:-12px;
            margin-top:-12px;
            cursor:nwse-resize;
        }
        &.active{
            border:1px dashed #4ec0ff;
            margin-left:-1px;
            margin-top:-1px;
            display:block;
            .resize{
                display:block;
            }
        }
    }
</style>

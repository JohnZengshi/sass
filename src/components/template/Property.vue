<template>
        <div class="property-component barcode" v-show="isShown" :style="componentStyle" v-if="data.propertyType == 4">
            <div  :style="barcodeStyle">
            <img ref="barcode" v-if="data.propertyCode == 'charCode'" width="100%" src="/static/img/barcode-sample.png" @dragstart.prevent  :style="imgStyle">
                <img ref="qrcode" v-else src="/static/img/qrcode.png" width="100%" @dragstart.prevent  :style="imgStyle">
            </div>
            <div class="resize" v-if="!isPreview"></div>
        </div>
    <!--<div class="property-component barcode" v-show="isShown" :style="componentStyle" v-else-if="data.propertyType == 5">-->
        <!--<div  :style="barcodeStyle">-->
            <!--<img ref="barcode" src="/static/img/barcode-sample.png" @dragstart.prevent  :style="imgStyle">-->
        <!--</div>-->
        <!--<div class="resize" v-if="!isPreview"></div>-->
    <!--</div>-->
        <div class="property-component string" v-show="isShown" :style="componentStyle" :class="{borderRender: data.border}" v-else>
            <span v-if="filterShow(value)" :style="prefixStyle" v-html="rawPrefix"></span>
            <span v-if="filterShow(value)" :style="valueStyle">{{ value }}</span>
            <span v-if="filterShow(value)" :style="suffixStyle" v-html="rawSuffix"></span>
        </div>
</template>

<script>
import {
    getOuterWidth,
    getOuterHeight,
    getPPI,
    getComponentTranslate
} from '../../utils/print'
import moment from 'moment'
import JsBarcode from 'jsbarcode'
import find from 'lodash/find'
import { mapState} from 'vuex'
export default {
        data() {
            return {
                ppi: getPPI(),
                isNull: false
            }
        },
        props: ['isPreview','item', 'parent', 'data', 'page', 'templateData', 'showEmpty','productList'],
        computed: {
            ...mapState({
                mapTemplate: state => state.template.detail
            }),
            isShown() {
                return !this.isPreview || this.data.isNullPrint || !this.isNull
            },
            componentStyle() {
                let top = this.parent ? this.data.top - this.parent.top : this.data.top
                let left = this.parent ? this.data.left - this.parent.left : this.data.left

                return {
                    top: top + 'mm',
                    left: left + 'mm',
                    transform: 'rotate(' + this.data.rotateDeg + 'deg) ' + getComponentTranslate(this.data),
                    transformOrigin: '0 0',
                    zIndex: this.data.zIndex,
                    position: 'absolute'
                }
            },
            barcodeStyle() {
                return {
                    width: this.data.width + 'mm',
                    height: this.data.height + 'mm',
                    overflow : 'hidden'
                }
            },
            qrCodeStyle(){
                return {
                    // width: this.data.width + 'mm',
                    // height: this.data.width + 'mm',
                    // overflow : 'hidden'
                }
            },
            imgStyle(){
              // console.log('type类型：', this.mapTemplate.type)

               let Style = {
                   maxWidth:'100%'
                }
               //质保单条形码
               if( this.mapTemplate.type == 1){
                 Object.assign(Style,{
                    width : '100%',
                    //height : '100%'
                 })
               }
               return Style
            },
            prefixStyle() {
                return {
                    fontWeight: this.data.prefixStyle.isBold ? 'bold' : 'normal',
                    fontStyle: this.data.prefixStyle.isItalic ? 'italic' : 'normal',
                    textDecoration: this.data.prefixStyle.isUnderline ? 'underline' : 'none',
                    fontFamily: this.data.prefixStyle.fontFamily,
                    fontSize: this.data.prefixStyle.fontSize + 'px',
                    color: this.data.prefixStyle.color,
                    verticalAlign: this.data.verticalAlign
                }
            },
            rawPrefix() {
                // console.log(this.data.prefix)
                return this.data.prefix.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>')
            },
            valueStyle() {
                return {
                    fontWeight: this.data.valueStyle.isBold ? 'bold' : 'normal',
                    fontStyle: this.data.valueStyle.isItalic ? 'italic' : 'normal',
                    textDecoration: this.data.valueStyle.isUnderline ? 'underline' : 'none',
                    fontFamily: this.data.valueStyle.fontFamily,
                    fontSize: this.data.valueStyle.fontSize + 'px',
                    color: this.data.valueStyle.color,
                    verticalAlign: this.data.verticalAlign
                }
            },
            suffixStyle() {
                return {
                    fontWeight: this.data.suffixStyle.isBold ? 'bold' : 'normal',
                    fontStyle: this.data.suffixStyle.isItalic ? 'italic' : 'normal',
                    textDecoration: this.data.suffixStyle.isUnderline ? 'underline' : 'none',
                    fontFamily: this.data.suffixStyle.fontFamily,
                    fontSize: this.data.suffixStyle.fontSize + 'px',
                    color: this.data.suffixStyle.color,
                    verticalAlign: this.data.verticalAlign
                }
            },
            rawSuffix() {
                return this.data.suffix.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>')
            },
            value() {

                let code = this.data.propertyCode
                let backuProductList = null
                console.log(this.item,this.productList)

                let product = this.templateData.productList[this.data.productIndex || (this.page - 1) || 0];
                if (this.item && this.item.salesId) {
                    product = this.productList[this.data.productIndex || (this.page - 1) || 0];
                }
//              if(!product){
//                  //回购
//                  backuProductList = this.templateData.backuProductList[this.data.productIndex || (this.page - 1) || 0]
//              }
                let value = null

                if(this.isPreview){
//                  if (backuProductList) {
//                     let mapcode = find(backuProductList.codeList, {
//                          key: code
//                      })
//                     if (!mapcode) {
//                          mapcode = find(this.templateData.baseInfoList, {
//                              key: code
//                          })
//                      }
//
//                      if (mapcode) {
//                          value = mapcode.value
//                          if (value != this.data.sample) {
//                              this.$emit('changeComponentData', {
//                                  data: {
//                                      sample: value
//                                  },
//                                  shouldUpdate: false
//                              })
//                          }
//                      }
//                  }
                    if (product) {
                        let mapcode = find(product.codeList, {
                            key: code
                        })
                        if (!mapcode) {
                            mapcode = find(this.templateData.baseInfoList, {
                                key: code
                            })
                        }
                        if (mapcode) {
                            value = mapcode.value
                            // this.isNull = mapcode.isNull != 0
                            if (value != this.data.sample) {
                                this.$emit('changeComponentData', {
                                    data: {
                                        sample: value
                                    },
                                    shouldUpdate: false
                                })
                            }
                        }
                    }
                }else {

                    if (this.data.sample) {
                        value = this.data.sample
                        //this.isNull = false
                    } else {
                        //this.isNull = true
                        //console.log(this.templateData,this.data)
                        //预览跟模板区别
                        if(this.isPreview) return ''
                        return  '#{' + code + '}'
                    }
                }
                if (this.data.propertyType == 1 || this.data.propertyType == 3) {
                    return Number(value).toFixed(this.data.toFixed)
                } else {
                    if (this.data.propertyType == 2) {
                        return moment(value).format(this.data.dateFormat)
                    } else {
                        return value
                    }
                }
            },
        },
        watch: {
            data: {
                handler(data) {
                    window.setTimeout(() => {
                        this.computeSize()
                    }, this.isPreview ? 500 : 0)
                },
                deep: true
            },
            value() {
                window.setTimeout(() => {
                    this.computeSize()
                }, this.isPreview ? 500 : 0)
            },
            //新增回购列表
//          'templateData.backuProductList' () {
//
//             let code = this.data.propertyCode
//              let product = this.templateData.backuProductList[this.data.productIndex || (this.page - 1) || 0]
//              let value = null
//              let mapcode = null
//
//              if (product) {
//                  mapcode = find(product.codeList, {
//                      key: code
//                  })
//                  //console.log(mapcode);
//                  if (!mapcode) {
//                      mapcode = find(this.templateData.baseInfoList, {
//                          key: code
//                      })
//                  }
//                  if (mapcode) {
//                      value = mapcode.value
//                      if (value != this.data.sample) {
//                          this.$emit('changeComponentData', {
//                              data: {
//                                  sample: value
//                              },
//                              shouldUpdate: true
//                          })
//                      }
//                  }
//              }
//          },
            'templateData.productList' () {
                let code = this.data.propertyCode
                let product = this.templateData.productList[this.data.productIndex || (this.page - 1) || 0]
                let value = null
                let mapcode = null

                if (product) {
                    mapcode = find(product.codeList, {
                        key: code
                    })
                    //console.log(mapcode);
                    if (!mapcode) {
                        mapcode = find(this.templateData.baseInfoList, {
                            key: code
                        })
                    }
                    if (mapcode) {
                        value = mapcode.value
                        if (value != this.data.sample) {
                            this.$emit('changeComponentData', {
                                data: {
                                    sample: value
                                },
                                shouldUpdate: true
                            })
                        }
                    }
                }
            },
            'data.sample' (sample) {
                if (this.data.propertyType == 4) {
                    if (sample.length) {
                        this.resetBarcode(this.data)
                    } else {
                        this.$refs.barcode.src = '/static/img/barcode-sample.png'
                    }
                }
            },
            'data.left' () {
                this.computeAlignNumber()
            },
            'data.textAlign' () {
                this.computeAlignNumber()
            },
        },
        methods: {
            computeAlignNumber() {
                if (this.data.propertyType != 4 && !this.isPreview) {
                    let textAlign = this.data.textAlign
                    let alignNumber = 0
                    switch (textAlign) {
                        case 'left':
                            alignNumber = this.data.left
                            break
                        case 'center':
                            alignNumber = this.data.left + 0.5 * this.data.width
                            break;
                        case 'right':
                            alignNumber = this.data.left + this.data.width
                            break;
                    }
                    if (alignNumber != this.data.alignNumber) {
                        this.$emit('changeComponentData', {
                            data: {
                                alignNumber: alignNumber
                            },
                            shouldUpdate: false
                        })
                    }
                }
            },
            computeSize() {
                if (this.data.propertyType != 4 && this.isShown) {
                    let w = Number((getOuterWidth(this.$el) / this.ppi * 2.54 * 10).toFixed(1))
                    let h = Number((getOuterHeight(this.$el) / this.ppi * 2.54 * 10).toFixed(1))
                    let l = 0
                    let alignNumber = this.data.alignNumber
                    switch (this.data.textAlign) {
                        case 'left':
                            l = alignNumber
                            break
                        case 'center':
                            l = alignNumber - 0.5 * w
                            break
                        case 'right':
                            l = alignNumber - w
                            break
                    }
                    l = Number(l.toFixed(1))
                    if (w != this.data.width || h != this.data.height || l != this.data.left) {
                        // console.log(this.$el, this.data.propertyCode, this.value, this.data.width, this.data.height, this.data.left, w, h, l)
                        if (!(isNaN(w) || isNaN(h) || isNaN(l))) {
                            this.$emit('changeComponentData', {
                                data: {
                                    width: w,
                                    height: h,
                                    left: l
                                },
                                shouldUpdate: true
                            })
                        }
                    }
                }
            },

            resetBarcode(){

              if( this.mapTemplate.type == 1 ){
                  JsBarcode(this.$refs.barcode, this.data.sample, {
                        displayValue: false,
                        margin : 0,
                        width:1,
                        height : 300,
                        format: 'CODE128'
                  })
              }else{
                  JsBarcode(this.$refs.barcode, this.data.sample, {
                        displayValue: false,
                        margin : 0,
                        width:1,
                        height : 100,
                        format: 'CODE128'
                  })
             }
            },

            filterShow (value) {
                if (this.showEmpty == 'N') {
                    if (this.data.propertyCode == 'unitPrice') {
                        debugger
                    }
                    if (this.data.propertyCode == 'discountPrice' && value == "100") {
                        return false
                    } else if (this.data.isNullPrint) {
                        return true
                    }
                    return value && value != 0.00 && value != 0.000
                } else {
                    return true
                }
            }
        },
        mounted() {
            if (this.data.propertyType == 4) {
                if (this.data.sample.length) {
                    this.resetBarcode(this.data)
                } else {
                    this.$refs.barcode.src = '/static/img/barcode-sample.png'
                }
            } else {
                window.setTimeout(() => {
                    this.computeSize()
                }, this.isPreview ? 500 : 0)
            }
        }
}
</script>
<style lang="scss">
.property-component{
	padding: 1px;
    &.string {
        //padding: 5px;
        white-space: nowrap;
        span {
            display: inline-block;
            vertical-align: middle;
            line-height: 1;
        }
        &.active {
        	padding: 0;
            border: 1px dashed #4ec0ff;
            //padding: 4px;
            background-color: rgba(78, 192, 255, .15);
        }
        &.borderRender {
            border: 1px solid #000;
            //padding: 4px;
        }
    }
    .resize {
        display: none;
        position: absolute;
        opacity: 0;
        filter: alpha(opacity=0);
        width: 20px;
        height: 20px;
        top: 100%;
        left: 100%;
        margin-left: -12px;
        margin-top: -12px;
        cursor: nwse-resize;
    }
    &.barcode {
        img {
            display: block;
            box-sizing: border-box;
        }
        &.active {
            opacity: .7;
            padding: 0;
            border: 1px dashed #4ec0ff;
            .resize {
                display: block;
            }
        }
    }
    &.qrcode {
        img {
            display: block;
            box-sizing: border-box;
        }
        &.active {
            opacity: .7;
            padding: 0;
            border: 1px dashed #4ec0ff;
            .resize {
                display: block;
            }
        }
    }
}
</style>

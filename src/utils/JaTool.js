/**
 * Jatools打印
 */

import JsBarcode from 'jsbarcode'


export const JaTools = {
    /**
     * 打印
     */
    print(template, dataList) {
        let jcp = getJCP();
        let pageList = JaTools.transformation(template, dataList);
        let html = [];
        let myDoc = {copyrights: '西金网络科技拥有版权  www.yunzhubao.com', noMargins: true};
        for (let page of pageList) {
            html.push(JaTools.transformationDataToHtml(page,dataList));
            myDoc.settings = {paperWidth: page.width, paperHeight: page.height};
        }
        myDoc.documents = {html: html, logPage: true};
        jcp.printPreview(myDoc, true);
    },
    directPrint(template, dataList) {
        let jcp = getJCP();
        let pageList = JaTools.transformation(template, dataList);
        let html = [];
        let myDoc = {copyrights: '西金网络科技拥有版权  www.yunzhubao.com', noMargins: true};
        for (let page of pageList) {
            html.push(JaTools.transformationDataToHtml(page));
            myDoc.settings = {paperWidth: page.width, paperHeight: page.height};
        }
        myDoc.documents = {html: html};
        jcp.print(myDoc, false);
    },
    /**
     * 将对象转换，合并
     * template
     * dataList
     */
    transformation(template, dataList) {
        let pageList = [];
        for (let item of dataList) {
            let page = [];
            for (let components of template.components) {
                let key = components.data.propertyCode;
                if (key == 'barcode2') {
                    key = 'codeUrl';
                }
                let mapcode = _.find(item.codeList, {key: key});
                if (!mapcode) mapcode = new Object();
                let componnent = JaTools.getComponnent(components.type, components.data.propertyType, components.data.propertyCode);
                let temp = _.cloneDeep(_.assignIn(components.data, {
                    sample: mapcode.value,
                    componnent: componnent,
                    type: components.type
                }));
                page.push(temp);
            }
            pageList.push({page: page, width: template.width, height: template.height, rotateDeg: template.rotateDeg});
        }
        return pageList;
    },
    /**
     * 获取类型
     */
    getComponnent(type, propertyType, propertyCode) {
        switch (type) {
            case "PropertyComponent":
                return propertyType == 4 ? "charCode" : propertyCode;
                break
            case "LineComponent":
                return "line";
                break
            case "TextComponent":
                return "text";
                break
            //递归
            case 'ContainerComponent':
                break;
            default:
                break
        }
    },

    /**
     * 将数据转成页面
     */
    transformationDataToHtml(page,dataList) {
        let list = page.page;
        let content = $("<div>");
        content.css({
            "width": page.width + "mm",
            "height": page.height + "mm",
            "transform": "rotate(" + page.rotateDeg + "deg)",
        });
        for (let data of list) {
            if (!data.isNullPrint && !data.sample && (data.type == "PropertyComponent" && data.componnent != "barcode2")) {
                continue;
            }
            let box = $("<div>");
            if (data.componnent == "line") {//线条
                box = $("<hr>");
            }
            if (data.propertyCode == "charCode") {//条码
                box = $("<img class='barcode'>");
                box = $("<img class='jatools-coder' src='http://127.0.0.1:31227/api?type=coder&code=" + data.sample + "&style=type:code128;autofit:true;show-text:false;&width=130&height=80'>");
            }
            if (data.propertyCode == "barcode2") {//二维码
                let width = data.width * 3.78;
                data.sample = data.sample.replace(/&/g,'%26');
                console.log('qrcode:' + data.sample);
                box = $("<img class='jatools-coder' src='http://127.0.0.1:31227/api?type=coder&code=" + data.sample + "&style=type:qr;&width=" + width + "&height=" + width + "'>");
            }
            box.css({
                "-webkit-font-smoothing": "antialiased",
                "font-smoothing": "antialiased",
                "position": "absolute",
                "white-space": "nowrap",
                "border": (data.border ? '1px solid #000;' : 'none'),
                "top": data.top + "mm",
                "left": data.left + "mm",
            });
            switch (data.rotateDeg) {
                case 90:
                    box.css({
                        "transform": "rotate(" + data.rotateDeg + "deg) translateY(-" + data.height + "mm)",
                        "transform-origin": "0px 0px 0px"
                    });
                    break;
                case 180:
                    box.css({
                        "transform": "rotate(" + data.rotateDeg + "deg) translate(-" + data.width + "mm, -" + data.height + "mm)",
                        "transform-origin": "0px 0px 0px"
                    });
                    break;
                case 270:
                    box.css({
                        "transform": "rotate(" + data.rotateDeg + "deg) translateX(-" + data.width + "mm)",
                        "transform-origin": "0px 0px 0px"
                    });
                    break;
                default:
                    break;
            }
            switch (data.componnent) {
                //线条
                case "line":
                    box.css({
                        "border": "0.5px solid",
                        "margin": "0",
                        "width": data.width + "mm",
                    });
                    break;
                //条形码
                case "charCode":
                    box.css({
                        "width": data.width + "mm",
                        "height": data.height + "mm"
                    });
                    break;
                //默认文本
                default:
                    //前缀
                    if (data.prefix) {
                        box.append($("<span>").html(data.prefix).css({
                            "font-size": data.prefixStyle.fontSize + "px",
                            "color": data.prefixStyle.color,
                            "font-family": data.prefixStyle.fontFamily,
                            "vertical-align": "middle",
                            "text-decoration": (data.prefixStyle.isUnderline ? 'underline;' : 'none;'),
                            "font-style": (data.prefixStyle.isItalic ? 'italic' : 'normal'),
                            "font-weight": (data.prefixStyle ? (data.prefixStyle.isBold ? 'bold' : 'normal') : 'normal')
                        }));
                    }
                    //正文
                    let _span = $("<span>");
                    box.append(_span);
                    if (data.valueStyle) {
                        let value = data.sample
                        if (data.propertyType == 1 || data.propertyType == 3) {
                            value = Number(value).toFixed(data.toFixed)
                        } else {
                            if (data.propertyType == 2) {
                                value = moment(value).format(data.dateFormat)
                            }
                        }
                        let {fontSize, color, fontFamily, isUnderline, isItalic, isBold} = data.valueStyle;
                        _span.html(value).css({
                            "font-size": fontSize + "px",
                            "color": color,
                            "font-family": fontFamily,
                            "display": "inline-block",
                            "vertical-align": "middle",
                            "letter-spacing": "0px",
                            "text-decoration": (isUnderline ? 'underline' : 'none'),
                            "font-style": (isItalic ? 'italic' : 'normal'),
                            "font-weight": (isBold ? 'bold' : 'normal')
                        })
                    } else {
                        let {content, fontSize, color, fontFamily, isUnderline, isItalic, isBold} = data;
                        _span.html(content).css({
                            "font-size": fontSize + "px",
                            "color": color,
                            "font-family": fontFamily,
                            "display": "inline-block",
                            "vertical-align": "middle",
                            "letter-spacing": "0px",
                            "text-decoration": (isUnderline ? 'underline' : 'none'),
                            "font-style": (isItalic ? 'italic' : 'normal'),
                            "font-weight": (isBold ? 'bold' : 'normal')
                        })
                    }
                    //后缀
                    if (data.suffix) {
                        box.append($("<span>").html(data.suffix).css({
                            "font-size": data.suffixStyle.fontSize + "px",
                            "color": data.suffixStyle.color,
                            "font-family": data.suffixStyle.fontFamily,
                            "display": "inline-block",
                            "vertical-align": "middle",
                            "text-decoration": (data.suffixStyle.isUnderline ? 'underline;' : 'none;'),
                            "font-style": (data.suffixStyle.isItalic ? 'italic' : 'normal'),
                            "font-weight": (data.suffixStyle ? (data.suffixStyle.isBold ? 'bold' : 'normal') : 'normal')
                        }));
                    }
                    break;
            }
            content.append(box);

        }
        return content[0].outerHTML;
    },
}
//========================================================
/**
 * 打印
 */
//     print(template, dataList) {
//         debugger
//         console.time('toDom');
//
//         let pageList = JaTools.transformation(template, dataList);
//         let html = [];
//         $('body').css({'overflow': 'auto'}).append('<div id="print_box"></div>');
//         let $print = $('#print_box');
//         let style = {
//             'position': 'absolute',
//             'top': 0,
//             'z-index': -1
//         }
//         $print.css(style);
//         for (let page of pageList) {
//             $print.append(JaTools.transformationDataToHtml(page));
//         }
//         console.timeEnd('toDom');
//         const fun = async function () {
//             console.time('toCanvas');
//             let nodeArr = document.getElementById('print_box').children;
//             let scale = 2;
//             let arr = [];
//             for (let node of nodeArr) {
//                 let width = node.offsetWidth; //获取dom 宽度
//                 let height = node.offsetHeight; //获取dom 高度
//                 let canvas = document.createElement('canvas'); //创建一个canvas节点
//                 canvas.width = width * scale; //定义canvas 宽度 * 缩放
//                 canvas.height = height * scale; //定义canvas高度 *缩放
//                 canvas.getContext('2d').scale(scale, scale); //获取context,设置scale
//                 let opts = {
//                     backgroundColor: '#ffffff',
//                     scale: scale, // 添加的scale 参数
//                     canvas: canvas, //自定义 canvas
//                     width: width, //dom 原始宽度
//                     height: height,
//                     useCORS: true // 【重要】开启跨域配置
//                 };
//                 let dataUrl = await JaTools.canvasToDataURL(node, opts);
//                 arr.push(dataUrl);
//             }
//             $print.remove();
//             console.timeEnd('toCanvas');
//             JaTools.startPrint({
//                 scale: scale,
//                 template: template,
//                 arr: arr
//             });
//         }
//         fun();
//     },
//     startPrint(opt) {
//         console.time('toPDF');
//
//         let width = opt.template.width * opt.scale;
//         let height = opt.template.height * opt.scale;
//         let rotateDeg = width > height ? 'landscape' : '';
//         let doc = new jsPDF(rotateDeg, 'mm', [width, height]);
//         doc.setProperties({//设置文档属性
//             title: '打印预览',
//         });
//         for (let i = 0, len = opt.arr.length; i < len; i++) {
//             doc.addImage(opt.arr[i], 'JPEG', 0, 0);
//             i < len - 1 && doc.addPage();
//         }
//         let iframe = document.getElementById('iframe');
//         iframe.style.display = 'block';
//         document.getElementById('closePrint').style.display = 'block';
//         iframe.src = doc.output('datauristring');//在iframe中显示
//         console.timeEnd('toPDF');
//
//     },
//     canvasToDataURL(node, opts) {
//         return new Promise((resolve, reject) => {
//             html2canvas(node, opts).then(function (canvas) {
//                 // 【重要】关闭抗锯齿
//                 canvas.mozImageSmoothingEnabled = false;
//                 canvas.webkitImageSmoothingEnabled = false;
//                 canvas.msImageSmoothingEnabled = false;
//                 canvas.imageSmoothingEnabled = false;
//                 let dataUrl = canvas.toDataURL('image/jpeg');
//                 resolve(dataUrl);
//             });
//         })
//     },
//
//     /**
//      * 将对象转换，合并
//      * template
//      * dataList
//      */
//     transformation(template, dataList) {
//         let pageList = [];
//         for (let item of dataList) {
//             let page = [];
//             for (let components of template.components) {
//                 let mapcode = _.find(item.codeList, {key: components.data.propertyCode});
//                 if (!mapcode) mapcode = new Object();
//                 let componnent = JaTools.getComponnent(components.type, components.data.propertyType, components.data.propertyCode);
//                 let temp = _.cloneDeep(_.assignIn(components.data, {
//                     sample: mapcode.value,
//                     componnent: componnent,
//                     type: components.type
//                 }));
//                 page.push(temp);
//             }
//             pageList.push({page: page, width: template.width, height: template.height, rotateDeg: template.rotateDeg});
//         }
//         return pageList;
//     },
//     /**
//      * 获取类型
//      */
//     getComponnent(type, propertyType, propertyCode) {
//         switch (type) {
//             case "PropertyComponent":
//                 return propertyType == 4 ? "charCode" : propertyCode;
//                 break
//             case "LineComponent":
//                 return "line";
//                 break
//             case "TextComponent":
//                 return "text";
//                 break
//             //递归
//             case 'ContainerComponent':
//                 break;
//             default:
//                 break
//         }
//     },
//     /**
//      * 将数据转成页面
//      */
//     transformationDataToHtml(page) {
//         let list = page.page;
//         let content = $("<div>");
//         content.css({
//             "width": page.width + "mm",
//             "height": page.height + "mm",
//             "transform": "rotate(" + page.rotateDeg + "deg)",
//         });
//         for (let data of list) {
//             if (!data.isNullPrint && !data.sample && (data.type == "PropertyComponent")) {
//                 continue;
//             }
//             let box = $("<div>");
//             if (data.componnent == "line") {//线条
//                 box = $("<hr>");
//             } else if (data.componnent == "charCode") {//条码
//                 box = $("<img class='barcode'>");
//                 box.JsBarcode(data.sample, {
//                     format: 'CODE128',
//                     displayValue: false,
//                     width: 130,
//                     height: 80
//                 });
//                 // box = $("<img class='jatools-coder' src='http://127.0.0.1:31227/api?type=coder&code=" + data.sample + "&style=type:code128;autofit:true;show-text:false;&width=130&height=80'>");
//             }
//             box.css({
//                 "-webkit-font-smoothing": "antialiased",
//                 "font-smoothing": "antialiased",
//                 "position": "absolute",
//                 "white-space": "nowrap",
//                 "border": (data.border ? '1px solid #000;' : 'none'),
//                 "top": data.top + "mm",
//                 "left": data.left + "mm",
//             });
//             switch (data.rotateDeg) {
//                 case 90:
//                     box.css({
//                         "transform": "rotate(" + data.rotateDeg + "deg) translateY(-" + data.height + "mm)",
//                         "transform-origin": "0px 0px 0px"
//                     });
//                     break;
//                 case 180:
//                     box.css({
//                         "transform": "rotate(" + data.rotateDeg + "deg) translate(-" + data.width + "mm, -" + data.height + "mm)",
//                         "transform-origin": "0px 0px 0px"
//                     });
//                     break;
//                 case 270:
//                     box.css({
//                         "transform": "rotate(" + data.rotateDeg + "deg) translateX(-" + data.width + "mm)",
//                         "transform-origin": "0px 0px 0px"
//                     });
//                     break;
//                 default:
//                     break;
//             }
//             switch (data.componnent) {
//                 //线条
//                 case "line":
//                     box.css({
//                         "border": "0.5px solid",
//                         "margin": "0",
//                         "width": data.width + "mm",
//                     });
//                     break;
//                 //条形码
//                 case "charCode":
//                     box.css({
//                         "width": data.width + "mm",
//                         "height": data.height + "mm"
//                     });
//                     break;
//                 //默认文本
//                 default:
//                     //前缀
//                     if (data.prefix) {
//                         box.append($("<span>").html(data.prefix).css({
//                             "font-size": data.prefixStyle.fontSize + "px",
//                             "color": data.prefixStyle.color,
//                             "font-family": data.prefixStyle.fontFamily,
//                             "vertical-align": "middle",
//                             "text-decoration": (data.prefixStyle.isUnderline ? 'underline;' : 'none;'),
//                             "font-style": (data.prefixStyle.isItalic ? 'italic' : 'normal'),
//                             "font-weight": (data.prefixStyle ? (data.prefixStyle.isBold ? 'bold' : 'normal') : 'normal')
//                         }));
//                     }
//                     //正文
//                     let _span = $("<span>");
//                     box.append(_span);
//                     if (data.valueStyle) {
//                         let {fontSize, color, fontFamily, isUnderline, isItalic, isBold} = data.valueStyle;
//                         _span.html(data.sample).css({
//                             "font-size": fontSize + "px",
//                             "color": color,
//                             "font-family": fontFamily,
//                             "display": "inline-block",
//                             "vertical-align": "middle",
//                             "letter-spacing": "0px",
//                             "text-decoration": (isUnderline ? 'underline' : 'none'),
//                             "font-style": (isItalic ? 'italic' : 'normal'),
//                             "font-weight": (isBold ? 'bold' : 'normal')
//                         })
//                     } else {
//                         let {content, fontSize, color, fontFamily, isUnderline, isItalic, isBold} = data;
//                         _span.html(content).css({
//                             "font-size": fontSize + "px",
//                             "color": color,
//                             "font-family": fontFamily,
//                             "display": "inline-block",
//                             "vertical-align": "middle",
//                             "letter-spacing": "0px",
//                             "text-decoration": (isUnderline ? 'underline' : 'none'),
//                             "font-style": (isItalic ? 'italic' : 'normal'),
//                             "font-weight": (isBold ? 'bold' : 'normal')
//                         })
//                     }
//                     //后缀
//                     if (data.suffix) {
//                         box.append($("<span>").html(data.suffix).css({
//                             "font-size": data.suffixStyle.fontSize + "px",
//                             "color": data.suffixStyle.color,
//                             "font-family": data.suffixStyle.fontFamily,
//                             "display": "inline-block",
//                             "vertical-align": "middle",
//                             "text-decoration": (data.suffixStyle.isUnderline ? 'underline;' : 'none;'),
//                             "font-style": (data.suffixStyle.isItalic ? 'italic' : 'normal'),
//                             "font-weight": (data.suffixStyle ? (data.suffixStyle.isBold ? 'bold' : 'normal') : 'normal')
//                         }));
//                     }
//                     break;
//             }
//             content.append(box);
//         }
//         return content[0].outerHTML;
//     }
// }

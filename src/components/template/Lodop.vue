<template>
	<div>
		<el-dialog title="字体下载" :visible.sync="dialogVisible" size="mini" class="fontdownload-dialog">
			<div style="line-height: 25px;">
				<i class="el-icon-information" style="font-size: 20px; margin-right: 5px; color: #F7BA2A;"></i> 该模板中使用了{{checkFonts.length}}种系统未识别
				<span v-if="checkFonts.length" style="color: red;">{{checkFonts}}</span>字体。
				<br>此字体为第三方字体，非系统内置。
				<p style="margin: 15px 0;">
					<b>如要继续使用，请按以下两种方式进行处理：</b><br> 1、下载字体包安装相应的字体后重启浏览器即可使用
					<br> 2、进入设置->打印设置，找到对应模板字体进行修改，保存之后即可使用
				</p>
			</div>
			<p class="download" style="margin-top: 20px; text-align: center;">
				<a href="http://jzm-1252389350.cosgz.myqcloud.com/files/web/fonts/systemfonts.rar">
					<el-button type="primary" icon="upload">下载字体包</el-button>
				</a>
			</p>
			<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
	import moment from 'moment'
	import JsBarcode from 'jsbarcode'
	import find from 'lodash/find'
	import extend from 'lodash/extend'
	let Detector = require('../../assets/js/fontdetect')
	let detector = new Detector()
	export default {

		data() {
			return {
				components: JSON.parse(JSON.stringify(this.canvas)).components.filter(component => !component.data.itemListId),
				height: 47,
				width: 32,
				lodopComponentsTemplateData: {}, //数据组装模板
				dataCode: [],
				lodopComponentsPrintData: [], //打印数据
				family: 'webfontregular', //'\u817e\u7965\u5609\u4e3d\u4e2d\u5706\u7b80'
				barCode: {
					"8": {
						width: "29.37mm",
						code: "128Auto"
					},
					"9": {
						width: "29.37mm",
						code: "128Auto"
					},
					"10": {
						width: "29.37mm",
						code: "128Auto"
					},
					"11": {
						width: "29.37mm",
						code: "128Auto"
					},
					"12": {
						width: "27mm",
						code: "128Auto"
					},
					"13": {
						width: "29.37mm",
						code: "128Auto"
					},
					"14": {
						width: "29.37mm",
						code: "128Auto"
					},
					"15": {
						width: "29.37mm",
						code: "128Auto"
					}
				},
				checkFonts: [],
				dialogVisible: false
			}
		},
		props: ['templateData', 'canvas', 'page'],
		watch: {
			canvas() {
				this.components = JSON.parse(JSON.stringify(this.canvas)).components.filter(component => !component.data.itemListId)
				this.height = this.canvas.height > 0 ? this.canvas.height : 47
				this.width = this.canvas.width > 0 ? this.canvas.width : 32
			},

			page() {
				this.page = this.templateData.productList.length
			}
		},
		created() {

		},
		methods: {

			//外部打印
			externalPrint(html) {
				let lodopContaier = getLodop()
				lodopContaier.PRINT_INIT("");
				lodopContaier.SET_PREVIEW_WINDOW(0, 0, 0, 960, 840, "");
				var strBodyStyle = `<style>
									 #footerxiantiao{border:1px solid #000000;border-collapse:collapse;}
									 #footerxiantiao td{
										 border:1px solid #000000;
										 text-align:center;border-collapse:collapse;}
									#xiantiao{border:1px solid #000000;border-collapse:collapse;}
									 #xiantiao td{
										 border:1px solid #000000;
										 text-align:center;border-collapse:collapse;}
								</style>`;
				var strFormHtml = strBodyStyle + "<body>" + html + "</body>";
				lodopContaier.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
				//lodopContaier.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW",true);	

				lodopContaier.ADD_PRINT_HTM('13mm', '10mm', '90%', '90%', strFormHtml);
				console.log("lopod中的打印：" + html);
				lodopContaier.PREVIEW();
			},
			myNewExternalPrint(html) {
				let lodopContaier = getLodop()
				lodopContaier.PRINT_INIT("");
				lodopContaier.SET_PREVIEW_WINDOW(0, 0, 0, 960, 840, "");
				var strBodyStyle = `<style>
									 #footerxiantiao{border:1px solid #000000;border-collapse:collapse;}
									 #footerxiantiao td{
										 border:1px solid #000000;
										 text-align:center;border-collapse:collapse;}
									#xiantiao{border:1px solid #000000;border-collapse:collapse;}
									 #xiantiao td{
										 border:1px solid #000000;
										 text-align:center;border-collapse:collapse;}
								</style>`;
				var strFormHtml = strBodyStyle + "<body>" + html + "</body>";
				lodopContaier.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
				//lodopContaier.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW",true);	

				lodopContaier.ADD_PRINT_HTM('13mm', '10mm', '90%', '90%', strFormHtml);
				console.log("lopod中的打印：" + html);
				lodopContaier.PREVIEW();
			},
			multipagePrint(printDate, print) {

				this.dataCode = [];
				this.checkFonts = []
				this.lodopComponentsTemplateData = {};

				this.$nextTick(() => {
					this.componentsManage(this.components, this.codeValue)
				})

				setTimeout(() => {
					if(this.checkFonts.length > 0) {
						this.dialogVisible = true
					}
					this.componentsPrintData()
				}, 1000)
			},

			componentsManage(components, callback) {

				components.forEach((component, index) => {
					let data = component.data
					switch(component.type) {
						//动态数据
						case 'PropertyComponent':
							//条形码
							if(component.data.propertyType == 4) {
								//console.log(data.id)
								this.lodopComponentsTemplateData[data.id] = {
									rotateDeg:data.rotateDeg,
									prefix: data.prefix, //前缀
									suffix: data.suffix, //后缀
									top: data.top,
									left: data.left,
									height: data.height,
									width: data.width,
									suffixStyle: data.suffixStyle,
									prefixStyle: data.prefixStyle,
									valueStyle: data.valueStyle,
									componnent: 'charCode'
								}
							} else {
								this.lodopComponentsTemplateData[data.id] = {
									rotateDeg:data.rotateDeg,
									prefix: data.prefix, //前缀
									suffix: data.suffix, //后缀
									top: data.top,
									left: data.left,
									height: data.height,
									border: data.border,
									width: data.width,
									toFixed: data.toFixed,
									suffixStyle: data.suffixStyle,
									prefixStyle: data.prefixStyle,
									valueStyle: data.valueStyle,
									componnent: data.propertyCode,
								}
								//检测字体
								this.checkFontFun(data.suffixStyle.fontFamily)
								this.checkFontFun(data.valueStyle.fontFamily)
								this.checkFontFun(data.prefixStyle.fontFamily)
							}
							break;
							//线条
						case 'LineComponent':
							this.lodopComponentsTemplateData[data.id] = {
								rotateDeg:data.rotateDeg,
								color: data.color,
								top: data.top,
								left: data.left,
								height: data.height,
								width: data.width,
								valueStyle: data.valueStyle,
								componnent: 'line'
							}
							break;
							//文本域
						case 'TextComponent':
							this.lodopComponentsTemplateData[data.id] = {
								rotateDeg:data.rotateDeg,
								top: data.top,
								left: data.left,
								height: data.height,
								width: data.width,
								prefix: data.content,
								border: data.border,
								valueStyle: data.valueStyle,
								componnent: 'text',
								prefixStyle: {
									fontFamily: data.fontFamily,
									fontSize: data.fontSize,
									isBold: data.isBold,
									color: data.color
								}
							}
							this.checkFontFun(data.fontFamily)
							break;
							//递归
						case 'ContainerComponent':
							this.componentsManage(component.data.children)
							break;
					}
					//获取属性代码
					if(data.id) {
						this.dataCode.push(data)
					}
				})
				callback && callback()
			},

			codeValue() {
				this.lodopComponentsPrintData = [];
				for(let i = 0; i < this.page; i++) {
					this.lodopComponentsPrintData[i] = {};
					let product = this.templateData.productList[i]

					this.dataCode.forEach((code, p) => {
						if(code) {
							this.mapcode(product, code.propertyCode, code.id)
						}
					})

					this.lodopComponentsPrintData[i] = this.lodopComponentsTemplateData
					this.lodopComponentsTemplateData = {}
					this.componentsManage(this.components)
				}

			},

			checkFontFun(font) {
				if(this.checkFonts.indexOf(font) == -1) {
					if(!detector.detect(font)) {
						this.checkFonts.push(font)
					}
				}
			},

			mapcode(product, code, id) {
				let value = null
				let mapcode = null
				if(!code) return
				mapcode = find(product.codeList, {
					key: code
				})
				//console.log(product)
				if(!mapcode) {
					mapcode = find(this.templateData.baseInfoList, {
						key: code
					})
				}
				extend(this.lodopComponentsTemplateData[id], {
					sample: mapcode.value
				})
			},

			//打印控件集成
			componentsPrintData() {
				let lodopContaier = getLodop()

				lodopContaier.PRINT_INIT("");
				lodopContaier.SET_PREVIEW_WINDOW(0, 0, 0, 660, 540, "");
				for(var i = 0; i < this.lodopComponentsPrintData.length; i++) {
					lodopContaier.NewPage();
					let componentDate = this.lodopComponentsPrintData[i];
					//排序
					let iteratees = "left";//迭代函数
					let orders = "asc";//排序顺序
					let newList = _.orderBy(componentDate,[iteratees],[orders]);
					for(let item of newList) {
						let data = item;
						let family = data.prefixStyle == undefined ? 'webfontregular' : data.prefixStyle.fontFamily
						let fontSzie = (data.prefixStyle == undefined ? 6 : data.prefixStyle.fontSize)
						//条形码
						if(item.componnent == 'charCode') {
								let barcode = this.barCode[8]
								if(data.sample.length >= 8 && data.sample.length <= 15) {
									barcode = this.barCode[data.sample.length]
								}
								let w = _.indexOf([90,270],data.rotateDeg)>=0?data.height:data.width;
								let h = _.indexOf([90,270],data.rotateDeg)>=0?data.width:data.height;
								lodopContaier.ADD_PRINT_BARCODE(data.top + 'mm', data.left + 'mm', w + 'mm', h + 'mm', barcode.code, data.sample)
								lodopContaier.SET_PRINT_STYLEA(0, "ShowBarText", 0);
								lodopContaier.SET_PRINT_STYLEA(0, "Angle", data.rotateDeg);//单个旋转
						} else if(item.componnent == 'line') {
							let t = _.indexOf([90,270],data.rotateDeg)>=0?data.top + data.width	:	data.top;
							let l = _.indexOf([90,270],data.rotateDeg)>=0?data.left							:	data.left + data.width;
							lodopContaier.ADD_PRINT_LINE(data.top + 'mm', data.left + 'mm', t + 'mm', l + 'mm', 0, data.height)
						} else {
							//writing-mode: tb-rl;
							let rotate = _.indexOf([90,270],data.rotateDeg)>=0?"tb-rl":"horizontal-tb";
							let html = '<style>*{-webkit-font-smoothing:antialiased;font-smoothing:antialiased;writing-mode:' + rotate + '}</style>';
							html += '<div style="' +
								'position: absolute; ' +
								'border:' + (data.border ? '1px solid #000;' : 'none;') +
								'">';
							//前缀
							html += (data.prefix ?
								'<span style="' +
								'font-size:' + (fontSzie) + 'px;' +
								'color:' + data.prefixStyle.color + ';' +
								'font-family:\'' + data.prefixStyle.fontFamily + '\';' +
								'display:inline-block;' +
								'vertical-align:middle;' +
    						'text-decoration:' + (data.prefixStyle.isUnderline?'underline;':'none;') +
    						'font-style:' + (data.prefixStyle.isItalic ?'italic;':'normal;') +
								'font-weight:' + (data.prefixStyle ? (data.prefixStyle.isBold ? 'bold' : 'normal') : 'normal') + ';">' +
								data.prefix + '</span>' :
								'');
							let sample = data.sample + ''
							if(data.toFixed > 0 && data.sample) {
								//数据里面有小数点，跟模板设置保留的小数点不一致
								if(sample.indexOf('.') >= 0) {
									sample = Number(sample)
									sample = sample.toFixed(data.toFixed)
								} else {
									//数据里面没有小数点但是模板设置了保留小数点
									sample = sample + '.' + (data.toFixed == 1 ? '0' : data.toFixed == 2 ? '00' : data.toFixed == 3 ? '000' : '')
								}
							}
							html += (data.sample && data.valueStyle ?
								'<span style="' +
								'font-size:' + (data.valueStyle.fontSize) + 'px;' +
								'color:' + (data.valueStyle.color) + ';' +
								'font-family:\'' + data.valueStyle.fontFamily + '\';' +
								'display:inline-block;' +
								'vertical-align:middle;' +
								'letter-spacing:0px;' +
    						'text-decoration:' + (data.valueStyle.isUnderline?'underline;':'none;') +
    						'font-style:' + (data.valueStyle.isItalic ?'italic;':'normal;') +
								'font-weight:' + (data.valueStyle.isBold ? 'bold' : 'normal') + ';">' +
								sample + '</span>' :
								'');
							//后缀
							html += (data.suffix && data.suffixStyle ?
								'<span style="' +
								'font-size:' + (data.suffixStyle.fontSize) + 'px;' +
								'color:' + data.suffixStyle.color + ';' +
								'font-family:\'' + data.suffixStyle.fontFamily + '\';' +
								'display:inline-block;' +
								'vertical-align:middle;' +
								'letter-spacing:0px;' +
    						'text-decoration:' + (data.suffixStyle.isUnderline?'underline;':'none;') +
    						'font-style:' + (data.suffixStyle.isItalic ?'italic;':'normal;') +
								'font-weight:' + (data.suffixStyle.isBold ? 'bold' : 'normal') + '">' +
								data.suffix + '</span>' :
								'')
							html += '</div>'
							debugger
							lodopContaier.ADD_PRINT_HTM(data.top + "mm", data.left + "mm", this.width + 'mm', this.height + 'mm', html);
						}
					}
					lodopContaier.SET_PRINT_STYLEA(0, "AngleOfPageInside", -this.canvas.rotateDeg);//整体旋转
				}
				lodopContaier.PREVIEW()

			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">

</style>
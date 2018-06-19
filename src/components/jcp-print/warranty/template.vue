<template>
	<div class="print-box">
		<div v-for="(page, index) in pageList" :style="page|PAGE_STYLE" :id="'zbd-page'+(index+1)">
			<template v-for="baseList in page.baseList">
				<!--销售产品数据-->
				<div v-if="baseList.type=='PropertyComponent'" :style="baseList.data|BASE_STYLE">
					<!--条形码-->
					<template v-if="baseList.data.propertyCode=='orderNum'">
						<img class='jatools-coder' :style="baseList.data|IMG_STYLE" :src="'http://127.0.0.1:31227/api?type=coder&code='+baseList.lable+'&style=type:code128;autofit:true;show-text:false;&width=130&height=80'" >
					</template>
					<template v-else>
						<!--前缀-->
						<span :style="baseList.data.valueStyle|SPAN_STYLE">{{baseList.data.prefix}}</span>
						<!--内容-->
						<span :style="baseList.data.valueStyle|SPAN_STYLE">{{baseList.lable}}</span>
						<!--后缀-->
						<span :style="baseList.data.valueStyle|SPAN_STYLE">{{baseList.data.suffix}}</span>
					</template>
				</div>
				<!--文字域-->
				<div v-else-if="baseList.type=='TextComponent'" :style="baseList.data|BASE_STYLE">
					<span :style="baseList.data|SPAN_STYLE">{{baseList.data.content}}</span>
				</div>
				
			</template>
			<!--动态域-->
			<template v-for="dynamicList in page.dynamicList">
				<div v-if="dynamicList.type=='ItemListComponent'" :style="dynamicList.data|BASE_W_H_STYLE">
					<div v-for="children in dynamicList.list" style="position: relative;width: 100%;height: 25px;">
						<template v-for="item in children">
<!-- 									// 空值打印
			if(!data.isNullPrint && !data.sample && (data.type == "PropertyComponent")){
				continue;
			} -->
							<!-- 空值打印 -->
<!-- 							<div v-if="!item.isNullPrint && !item.sample && (item.type == 'PropertyComponent')" :style="item.data|DYNAMIC_STYLE"> -->
							<!--销售产品数据-->
							<div v-if="item.type=='PropertyComponent'" :style="item.data|DYNAMIC_STYLE">
								<!--条形码-->
								<template v-if="item.data.propertyCode=='orderNum'">
									<img class='jatools-coder' style="width:130px,height:80px" :src="'http://127.0.0.1:31227/api?type=coder&code='+item.lable+'&style=type:code128;autofit:true;show-text:false;&width=130&height=80'">
								</template>
								<template v-else>
									<!--前缀-->
									<span :style="item.data.valueStyle|SPAN_STYLE">{{item.data.prefix}}</span>
									<!--内容-->
									<span :style="item.data.valueStyle|SPAN_STYLE">{{item.lable}}</span>
									<!--后缀-->
									<span :style="item.data.valueStyle|SPAN_STYLE">{{item.data.suffix}}</span>
								</template>
							</div>
							<!--文字域-->
							<span v-else-if="item.type=='TextComponent'" :style="item.data|BASE_STYLE">
								<span :style="item.data|SPAN_STYLE">{{item.data.content}}</span>
							</span>
						</template>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import { transformFileURL } from '@/utils/print';
	import { jcpPrint } from "@/tools/jcp-print";
	import moment from "moment";
	export default {
		components: {},
		props: {
			dataList: {
				type: Object
			},
			template: {
				type: Object
			},
		},
		filters: {
			SPAN_STYLE:(data)=>{
				let {isBold, isItalic, isUnderline, fontFamily, fontSize, color} = data;
				return {
					"display": "inline-block",
					"vertical-align": "middle",
					"letter-spacing": "0px",
					"color": color,
					"text-decoration": (isUnderline ? 'underline' : 'none'),
					"font-size": fontSize + "px",
					"font-family": fontFamily,
					"font-style": (isItalic ? 'italic' : 'normal'),
					"font-weight": (isBold ? 'bold' : 'normal'),
				};
			},
			BASE_W_H_STYLE:(data)=>{
				let {top, left, width, height, border, backgroundImage, textAlign, rotateDeg} = data;
				return {
					"-webkit-font-smoothing": "antialiased",
					"font-smoothing": "antialiased",
					"position": "absolute",
					"border": (border ? '1px solid #000;' : 'none'),
					"top": top + "mm",
					"left": 0 + "mm",
					"width":"100%", 
					"height":height+"mm", 
				};
			},
			IMG_STYLE:(data)=>{
				let {top, left, width, height, rotateDeg} = data;
				return {
					"width":width+"mm", 
					"height":height+"mm", 
				};
			},
			DYNAMIC_STYLE:(data)=>{
				let {top, left, width, height, border, backgroundImage, textAlign, rotateDeg} = data;
				return {
					"-webkit-font-smoothing": "antialiased",
					"font-smoothing": "antialiased",
					"position": "absolute",
					"border": (border ? '1px solid #000;' : 'none'),
					"top": 0 + "mm",
					"left": left + "mm", 
				};
			},
			BASE_STYLE:(data)=>{
				let {top, left, width, height, border, backgroundImage, textAlign, rotateDeg} = data;
				let style = {
					"-webkit-font-smoothing": "antialiased",
					"font-smoothing": "antialiased",
					"position": "absolute",
					"border": (border ? '1px solid #000;' : 'none'),
					"top": top + "mm",
					"left": left + "mm",
				}
				switch(rotateDeg) {
					case 90:
						style["transform"] = "rotate(" + rotateDeg + "deg) translateY(-" + height + "mm)";
						style["transform-origin"] = "0px 0px 0px"; 
						break;
					case 180:
						style["transform"] = "rotate(" + rotateDeg + "deg) translate(-" + width + "mm, -" + height + "mm)";
						style["transform-origin"] = "0px 0px 0px";
						break;
					case 270:
						style["transform"] =  "rotate(" + rotateDeg + "deg) translateX(-" + width + "mm)";
						style["transform-origin"] =  "0px 0px 0px";
						break;
					default:
						break;
				}
				return style;
			},
			PAGE_STYLE:(data)=>{
				let {width, height, backgroundImage, rotateDeg} = data;
				return {
					"position":"relative",
					"width":width+"mm", 
					"height":height+"mm", 
			    "background-size": "100% 100%",
			    "background-repeat": "no-repeat",
     			"background-image": "url(" + transformFileURL(backgroundImage) + ")",
					"transform": "rotate(" + rotateDeg + "deg)",
				}
			}
		},
		watch: {
			dataList: function(n, o) {
				this.trancation(n, this.template);
			}
		},
		data() {
			return {
				pageList: [],
			}
		},
		mounted() {},
		methods: {
			trancation(dataList, template) {
				sessionStorage.setItem('数据源dataList', JSON.stringify(dataList))
				sessionStorage.setItem('数据源template', JSON.stringify(template))
				template = this.filterTemplateGroup(template);
				//计算页码
				let pageNumber = this.computingPageNumber(template, dataList.productList.length);
				//生成对象
				this.pageList = this.pageFactory(pageNumber, dataList, template);
				sessionStorage.setItem('生成对象pageList', JSON.stringify(this.pageList))
				this.print();
			},
			/**
			 * 过滤掉模板分组
			 */
			filterTemplateGroup(template){
				for(let component of template.components) {
					if(component.type == "ContainerComponent") {
						template.components = _.concat(template.components, component.data.children);
					}else if(component.type == "ItemListComponent") {
						for(let item of component.data.children){
							if(item.type == "ContainerComponent") {
								component.data.children = _.concat(component.data.children, item.data.children);
							}
						}
					}
				}
				return template;
			},
			/**
			 * 页码对象工厂
			 */
			pageFactory(pageNumber, dataList, template) {
				let pageList = [];
				for(let i = 0; i < pageNumber; i++) {
					//克隆出模板最外层属性
					let item = _.clone(template);
					delete item.components;
					//获取模板基本信息
					item.baseList = this.getBaseList(dataList, template);
					//获取模板动态域信息
					item.dynamicList = this.getDynamicList(i, pageNumber, dataList, template);
					// item.dynamicList = [];
					pageList.push(item);
				}
				return pageList;
			},
			getBaseList(dataList, template) {
				let list = [];
				for(let component of template.components) {
					// ItemListComponent（动态）  ContainerComponent（组合）
					if(component.type != "ItemListComponent" && component.type != "ContainerComponent") {
						// 获取基本信息时，默认把第一个产品信息当做基本信息使用-----用户非法输入 -start
						let array = _.concat(dataList.baseInfoList, dataList.productList[0].codeList);
						// let array = _.concat(dataList.baseInfoList);
						let temp = _.find(array, (o) => {
							console.log('o.key', o.key)
							return o.key == component.data.propertyCode
						})


						if(temp) component.lable = temp.value;
						// -start
						list.push(component);

					}
				}
				return list;
			},
			/**
			 * 获取动态数据
			 */
			getDynamicList(index, pageNumber, dataList, template) {
				let result = [];
				for(let item of template.components) {
					if(item.type == "ItemListComponent") {
						item.list = [];
						// 数据条数  打印配置里的动态数据域条数
						let start = index * item.data.number;
						let end = index * item.data.number + item.data.number;
						if(start > dataList.productList.length) continue;
						let productList = _.clone(_.slice(dataList.productList, start, end));
						for(let product of productList) {
							let childrenList = [];
							for(let children of item.data.children) {
								// 获取动态数据，用户非法把基本信息拖到了动态域里-----用户非法输入 -dataList.baseInfoList
								let array = _.concat(product.codeList, dataList.baseInfoList);
								let temp = _.find(array, (o) => {
									return o.key == children.data.propertyCode
								})
								if(temp) children.lable = temp.value;
								childrenList.push(_.clone(children));
							}
							item.list.push(childrenList);
						}
						result.push(_.clone(item));
					}
				}
				return result;
			},
			/**
			 * 计算页数
			 */
			computingPageNumber(template, length) { // length-> 商品集合的长度
				//页码集合，取最大页码
				let numbers = [];
				for(let item of template.components) {
					if(item.type == "ItemListComponent") {
						numbers.push(length / item.data.number);
					}
				}
				let n = _.max(numbers);
				return n||1;
			},
			print(){
				let {width, height, rotateDeg} = this.template;
				if(rotateDeg == 90 || rotateDeg == 270){
					let w = width;
					width = height;
					height = w;
				}
				let doc = {
					pagePrefix:"zbd-",
					documents: document,
				};
				setTimeout(()=>{
					jcpPrint.printPreviewPaper(doc, width, height);
				})
			},
		}
	}
</script>

<style scoped>
	.jatools-coder{
		width:130px;
		height:80px;
	}
</style>
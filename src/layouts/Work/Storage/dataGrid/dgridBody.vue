<template>
	<!--表头-->
	<div>
		<div class="dg_bd-fixed" :style="'width:'+ fixedFullSize +'px'" @click="showData">
			<div class="dg_tr" v-for="item,k in dgDataList" :index="resetIndex(k)" :class="{move: activeClassIndex == k , add: item.productId == '', selectOn : activeSelectOn == k }" @click="datagridClick(item, k)" @mousemove="datagridHover(k, $event)" @mouseleave="datagridHover(k,$event)" :data-index="addIndex()">
				<div class="dg_td" :style="'width:'+ f.width +'px'" v-for="f,i in fixedData">
					<!--下拉框编辑-->
					<template v-if="synopsiData.checkType == '1' && synopsiData.makeOrderManId==userId">
						<div :title="item[f.type]" v-if="hasfetchData(f.type)" @mouseleave="_mouseEvent($event, k, i)" @mousemove="_mouseEvent($event, k, i)" :class="{active:selectContainer.fixedfIndex == k && selectContainer.fixedcIndex == i}" @click="selecChange({tr: item ,fIndex: k,td: f, cIndex: i, event: $event, indexType : 'fixed'})" class="dg-select-container">
							{{item[f.type]}}
						</div>
						<template v-else>{{getTxt(item, f)}}</template>
					</template>
					<template v-else>{{getTxt(item, f)}}</template>
				</div>
			</div>
		</div>

		<!--右边动态表格区-->
		<div class="dg_bd-container">
			<div class="dg_tr" v-for="item,k in dgDataList" :class="{move: activeClassIndex == k , add: item.productId == '', selectOn : activeSelectOn == k }" @click="datagridClick(item, k)" @mousemove="datagridHover(k, $event)" @mouseleave="datagridHover(k,$event)">
				<div class="dg_td" :style="'width:'+ f.width +'px'" v-for="f,i in smallDataList">
					<!--下拉框编辑-->
					<template v-if="synopsiData.checkType == '1' && synopsiData.makeOrderManId==userId">
						<div :title="item[f.type]" v-if="hasfetchData(f.type) && !f.readonly" :class="{active:selectContainer.selectfIndex == k && selectContainer.selectcIndex == i, isicon:isShowIcon(item[f.type])}" @mouseleave="_mouseEvent($event, k, i)" @mousemove="_mouseEvent($event, k, i)" @click="selecChange({tr: item ,fIndex: k,td: f, cIndex: i, event: $event, indexType : 'select'})" class="dg-select-container">
							{{item[f.type]}}
							<!--&& f.type != 'jewelryName'-->
							<i v-if="isShowIcon(item[f.type]) && !f.noRemove" @click="griditemClear($event, item, f, k)" class="el-icon-circle-close" title="清除"></i>
						</div>
						<!--<span v-else-if="f.type=='heavyCode' || f.readonly" :style="'width: '+f.width+'px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'" :title="item[f.type]">{{item[f.type]}}</span>-->
						<span v-else-if="f.readonly" :style="'width: '+f.width+'px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'" :title="item[f.type]">{{item[f.type]}}</span>
						<input :id="f.type+k" maxlength="12" type="text" @mousemove="inputMousemove($event,item, f)" @focusin="inputFocusin($event, item[f.type])" @keypress="dataGridkeyInput($event, item, f,k)" @input="inputChange(item, f)" @keydown="limitNumber($event, f.limitNumber)" :disabled="f.readonly" @focusout="inputFocusout($event, item, f, k)" class="dg-select-edit-ipt" :title="item[f.type]" v-model="item[f.type]" v-else />
					</template>
					<template v-else>{{item[f.type]}}</template>
				</div>
				<div class="dg_td operate">
					<i class="detail iconfont icon-xiangqing2" v-if="synopsiData.checkType != '1'" title="查看详情" @click="gotoDetails(item)"></i>
					<i class="del iconfont icon-lajitong" v-if="synopsiData.checkType == '1' && synopsiData.makeOrderManId==userId" title="删除" @click="deletegoods(item, k)"></i>
				</div>
			</div>
			<div class="no-data" v-if="dgDataList.length == 0 "></div>
		</div>
	</div>
</template>

<script>
	// 序号 index
	let applyIndex = 0
	import * as configData from './config'
	import * as fetch from './fetchData'
	import { fixedData } from './config'
	export default {
		data() {
			return {
				userId:sessionStorage.id,
				fixedData: fixedData,
				// 表格下拉数据集
				datagridSelectData: {},
				selectConfig: {},
				activeSelectOn: -1,
				// 时间计时器
				mouseEvent: {
					x: -1,
					y: -1
				}
			}
		},

		props: ['fixedFullSize', 'dgDataList', 'activeClassIndex', 'synopsiData', 'selectContainer', 'smallDataList', 'orderNum', 'addDatalist'],

		created() {
			this.selectConfig = fetch.Select
		},
		methods: {
			limitNumber(event, flag){
				if(!flag){
					return event.returnValue = true;
				}
				//限制小数输入,整数最多n位和小数最多m位
				let reg = new RegExp("^(?:0|[1-9]\\d{0," + (flag.it-1||9) + "})(\\.\\d{0," + (flag.db||2) + "})?$");
				var val = event.target.value.trim();
				if(_.includes([8, 13,37,38,39,40], event.keyCode)){//放开常用按键
					event.returnValue = true;
				}else if(!reg.test((val + event.key))){
					event.returnValue = false;
				}else{
					event.returnValue = true;
				}
			},
			showData(){
      	console.log(this.dgDataList)
      },
			//重置index
			resetIndex(index) {
				if(index == 0) applyIndex = 0
			},
			//
			addIndex() {
				applyIndex++
			},

			getIndex() {
				// this.$emit('getIndex',applyIndex)
				return applyIndex
			},

			updataSelectContainer(data) {
				this.$emit('updataSelectContainer', {
					fixedfIndex: data.selectCur_tr_index,
					fixedcIndex: data.selectCur_td_index
				})
			},

			// 单元格鼠标滑过index值更新
			datagridHover(index, evt) {
				if(evt.type == 'mouseleave') {
					this.$emit('updateActiveIndex', -1)
				} else {
					this.$emit('updateActiveIndex', index)
				}
			},
			// 监听表格被选中 用于复制操作
			datagridClick(item, index){
				// 过滤空数据
				if(this.activeSelectOn == index){
					this.$emit('updateActiveSelectOn', {
						item: {},
						index: -1
					})
					this.activeSelectOn = -1
				}else{
					this.$emit('updateActiveSelectOn', {
						item: item,
						index: index
					})
					this.activeSelectOn = index
				}
			},

			getTxt(item, tab) {
				if(tab.id == '01') {
					return this.getIndex()
				} else if(item[tab.type] == null || item[tab.type] == '') {
					return '-'
				} else if(tab.type == 'productType') {
					return item[tab.type] == 1 ? '计重' : '计件'
				} else {
					return item[tab.type]
				}
			},

			isShowIcon(txt) {
				return txt != '' && txt != null && txt != undefined
			},

			// 清除表格下拉的选择
			griditemClear(evt, item, tab, fIndex) {
				if(item.barcode && (tab.type == "metalColor" || tab.type == "gemName")){
					if((tab.type == "gemName" && !item.metalColor) || (tab.type == "metalColor" && !item.gemName)){
						return this.$message({
								type: 'warning',
								message: '成色与宝石不可同时为空'
							})
					};
				}
				this.$set(item, tab.type, '')
				evt.stopPropagation()
				this.$emit('updataEditApi', {
					[tab.type]: '',
					productId: item.productId
				})
			},

			// 鼠标经过文本框 要处理的一些操作
			inputMousemove(evt, item, tab) {

				// 修改标价->售价时，如果成本为空值  则对售价input设置为只读
				if(tab.type == 'soldPrice') {
					if(isNaN(parseFloat(item['costPrice']))) {} else {}
				}
			},

			// 文本聚焦时发生
			inputFocusin(evt, text) {
				// 记录当前的数据 输出给失去焦点时比对
				evt.target.setAttribute('temp-data', text == undefined ? ' ' : text)
				evt.stopPropagation()
			},

			// 文本框失去焦点
			inputFocusout(evt, item, tab, fIndex, type) {
				let tempData = evt.target.getAttribute('temp-data') // || evt.target.getAttribute('title') //拿到原始的数据
				let itemData = item[tab.type]
				let productId = this.dgDataList[fIndex].productId
				// 当input失去焦点时 需要检测下初始数据是否被修改过，如果没有修改 则不需要保存
				if((tab.canclear || itemData) && tempData != itemData) {
					let tempArray = [{
						[tab.type]: itemData,
						productId: productId
					}]

					// 在修改成本跟倍率时 需要把售价传给后台
					if(tab.type == 'costPrice' || tab.type == 'ratio') {
						tempArray.push({
							soldPrice: item['soldPrice'],
							productId: productId
						})
					}

					// 修改售价 需要把倍率传给后台
					if(tab.type == 'soldPrice') {
						tempArray.push({
							ratio: item['ratio'],
							productId: productId
						})
					}

					// 修改配件数、计价方式 、单价需要同步更新配件额字段
					if(tab.type == 'partCount' || tab.type === 'calcMethod' || tab.type === 'partPrice') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							price: item['price'],
							productId: productId
						})
					}

					// 修改配件额  同步更新单价字段
					if(tab.type == 'price') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							partPrice: item['partPrice'],
							productId: productId
						})
					}

					// 修改总件重 同步更新净金重
					if(tab.type === 'totalWeight') {
						//四舍五入保留3位小数
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(3)
						console.log(this.dgDataList)
						tempArray.push({
							netWeight: item['netWeight'],
							productId: productId
						})
					}

					// 修改净金重 同步更新含配金重、总件重
					if(tab.type === 'netWeight') {
						//四舍五入保留3位小数
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(3)
						tempArray.push({
							heavyCode: item['heavyCode'],
							productId: productId
						})
						tempArray.push({
							totalWeight: item['totalWeight'],
							productId: productId
						})
					}

					// 修改含配金重 同步更新净金重 
					if(tab.type === 'heavyCode') {
						//四舍五入保留3位小数
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(3)
						tempArray.push({
							netWeight: item['netWeight'],
							productId: productId
						})
					}

					/*
					 * 1、修改金耗同步更新金料额
					 * 2、修改金价同步更新金料额
					 * 3、修改净金重同步更新金料额
					 */
					if(tab.type === 'goldCost' || tab.type === 'goldPrice' || tab.type === 'netWeight') {
						//四舍五入保留3位小数
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
//						if(item.goldCost == 0 || item.goldCost == '0.00') {
//							item.goldCost = 1
//						}
						tempArray.push({
							goldE: item['goldE'],
							productId: productId
						})
					}

					// 修改金料额同步更新金价
					if(tab.type === 'goldE') {
						//四舍五入保留3位小数
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							goldPrice: item['goldPrice'],
							productId: productId
						})
					}

					/*
					 * 1、修改进货工费同步更新进货工费额
					 * 2、修改进货工费方式同步更新进货工费额
					 */
					if(tab.type === 'inFee' || tab.type === 'inMethod') {
						console.log(this.dgDataList[fIndex])
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							inMoney: item['inMoney'],
							productId: productId
						})
					}

					// 修改进货工费额同步更新进货工费
					if(tab.type === 'inMoney') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							inFee: item['inFee'],
							productId: productId
						})
					}

					/*
					 * 1、修改副石粒数同步更新副石额 
					 * 2、修改副石重同步更新副石额
					 * 3、修改副石单价同步更新副石额
					 * 4、修改副石计价方式同步更新副石额 
					 */
					if(tab.type === 'deputyCount' ||
						tab.type === 'deputyWeight' ||
						tab.type === 'deputyUnitPrice' ||
						tab.type === 'deputyCalcMethod'
					) {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							deputyPrice: item['deputyPrice'],
							productId: productId
						})
					}

					// 修改副石重同步更新总件重
					if(tab.type === 'deputyWeight') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(3)
						tempArray.push({
							totalWeight: item['totalWeight'],
							productId: productId
						})
					}

					// 修改副石重同步更新副石单价
					if(tab.type === 'deputyPrice') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							deputyUnitPrice: item['deputyUnitPrice'],
							productId: productId
						})
					}

					/*
					 * 1、修改主石粒数同步更新主石额
					 * 2、修改主石重同步更新主石额
					 * 3、修改主石单价同步更新主石额
					 * 4、修改计价方式同步更新主石额
					 */
					if(tab.type === 'count' ||
						tab.type === 'mainWeight' ||
						tab.type === 'unitPrice' ||
						tab.type === 'mainCalcMethod'
					) {
						if(tab.type === 'count') {
							this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type])
							tempArray.push({
								mainPrice: item['mainPrice'],
								productId: productId
							})
						} else {
							this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
							tempArray.push({
								mainPrice: item['mainPrice'],
								productId: productId
							})

						}
					}
					
					//修改主石重同步更新总件重
					if(tab.type === 'mainWeight') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(3)
						tempArray.push({
							totalWeight: item['totalWeight'],
							productId: productId
						})
					}

					//修改主石额同步更新主石单价
					if(tab.type === 'mainPrice') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
						tempArray.push({
							unitPrice: item['unitPrice'],
							productId: productId
						})
					}
					//修改销售工费保留2位小数
					if(tab.type === 'soldFee') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
					}
					//修改配件重保留3位小数
					if(tab.type === 'partWeight') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(3)
					}
					//修改其他费用保留2位小数
					if(tab.type === 'otherFee') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
					}
					//修改成本保留2位小数
					if(tab.type === 'costPrice') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
					}
					//修改售价保留2位小数
					if(tab.type === 'soldPrice') {
						this.dgDataList[fIndex][tab.type] = this.toNum(this.dgDataList[fIndex][tab.type]).toFixed(2)
					}
					
					if(_.indexOf(["calcMethod", "partPrice", "certifiFee", "price", "inFee", "inMoney", "deputyCount", "deputyWeight",
					"deputyUnitPrice", "deputyCalcMethod", "deputyPrice", "count", "mainWeight", "unitPrice", "mainCalcMethod",
					"mainPrice","totalWeight", "netWeight", "goldCost", "goldPrice", "goldE", "otherFee"], tab.type)) {
						tempArray.push({
							costPrice: item['costPrice'],
							productId: productId
						},{
							ratio: item['ratio'],
							productId: productId
						},{
							soldPrice: item['soldPrice'],
							productId: productId
						});
					}
					this.$emit('updataEditApi', tempArray)
				}
			},

			toNum(str) {
				return isNaN(parseFloat(str)) ? 0 : parseFloat(str)
			},

			// input方法
			inputChange(item, tab) {
				let price = this.toNum(item[tab.type]).toFixed(2)

				// #标价: 修改成本， 同步计算售价
				if(tab.type === 'costPrice') {
					Object.assign(item, {
						soldPrice: (this.toNum(item['ratio']) * price).toFixed(2)
					})
				}
				// #标价: 修改倍率，同步计算售价
				if(tab.type === 'ratio') {
					Object.assign(item, {
						soldPrice: (this.toNum(item['costPrice']) * price).toFixed(2)
					})
				}
				// #标价: 修改售价，同步计算倍率
				if(tab.type === 'soldPrice') {
					//Infinity
					let _price = this.toNum(price / this.toNum(item['costPrice']))
					Object.assign(item, {
						ratio: (_price == Infinity ? 0 : _price).toFixed(2)
					})
				}

				/*#配件： 需求说明
				 * 1、修改配件数，影响配件额
				 * 2、修改配件重，影响含配金重，影响总件重
				 * 3、修改单价，影响配件额
				 * 4、修改计价方式，影响配件额
				 * 5、修改配件额，影响单价
				 * 配件额的计算方法有2种：
				 * 一、计价方式为计重：配件重*单价
				 * 二、计价方式为计件：配件数*单价
				 * 三、以上2种没有选择，默认为计重
				 * */
				// 先拿到计价方式 
				let priceType = (item['calcMethod'] == null || item['calcMethod'] == '') ? '计重' : item['calcMethod']

				// 修改配件数
				if(tab.type === 'partCount') {
					if(priceType == '计件') {
						Object.assign(item, {
							price: (this.toNum(item['partCount']) * this.toNum(item['partPrice'])).toFixed(2)
						})
					}
				}
				// 修改配件重
				if(tab.type === 'partWeight') {
					//钻石重
					let diamondsWeight = (item['unit']=="ct"?0.2*this.toNum(item['mainWeight']):this.toNum(item['mainWeight'])) + (item['deputyUnit']=="ct"?0.2*this.toNum(item['deputyWeight']):this.toNum(item['deputyWeight']));
					Object.assign(item, {
						totalWeight: (this.toNum(item['netWeight']) + diamondsWeight + this.toNum(item['partWeight'])).toFixed(3)
					})
					Object.assign(item, {
						heavyCode: (this.toNum(item['netWeight']) + this.toNum(item['partWeight'])).toFixed(3)
					})
					Object.assign(item, {
						price: ((priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])) * this.toNum(item['partPrice'])).toFixed(2)
					})
				}

				// 计价方式 
				if(tab.type === 'calcMethod') {
					Object.assign(item, {
						price: ((priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])) * this.toNum(item['partPrice'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}

				// 修改单价
				if(tab.type === 'partPrice') {
					Object.assign(item, {
						price: ((priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])) * this.toNum(item['partPrice'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				
				if(tab.type === 'certifiFee') {
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 修改配件额
				if(tab.type === 'price') {
					let _price = this.toNum(price / (priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])))
					Object.assign(item, {
						partPrice: (_price == Infinity ? 0 : _price).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				/*#工费 需求说明
				 * 1、销售工费   计重、计件，为空时默认计重
				 * 2、进货工费， 精确2位小数位，6位以内  修改进货工费，影响进货工费额
				 * 3、进货工费方式， 计重、计件，为空时默认计重   修改进货工费方式，影响进货工费额
				 * 4、进货工费额    计算方法有：
				      1、进货工费方式为计重：净金重*进货工费；
				      2、进货工费方式为计件：1*进货工费（直接不计算，读取进货工费）
				          以用户输入为准，精确2位小数位，如无则按计算公式计算
				          修改进货工费额，影响进货工费
				 * */
				let soldMethodType = (item['soldMethod'] == null || item['soldMethod'] == '') ? '计重' : item['soldMethod']
				let inMethodType = (item['inMethod'] == null || item['inMethod'] == '') ? '计重' : item['inMethod']
				// 销售工费
				// if(tab.type === 'soldFee'){
				//   Object.assign(item, {
				//     soldFee : (this.toNum(item['soldFee'])).toFixed(2)
				//   })
				// }
				// 销售工费方式
				// if(tab.type === 'soldMethod'){
				//   Object.assign(item, {
				//     soldMethod : (this.toNum(item['soldMethod'])).toFixed(2)
				//   })
				// }
				// 进货工费
				if(tab.type === 'inFee') {
					Object.assign(item, {
						inMoney: (inMethodType == '计件' ? this.toNum(item['inFee']) : this.toNum(item['inFee']) * this.toNum(item['netWeight'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 进货工费方式
				if(tab.type === 'inMethod') {
					Object.assign(item, {
						inMoney: (inMethodType == '计件' ? this.toNum(item['inFee']) : this.toNum(item['inFee']) * this.toNum(item['netWeight'])).toFixed(2)
					})
				}
				// 进货工费额
				if(tab.type === 'inMoney') {
					let _price = this.toNum(inMethodType == '计件' ? this.toNum(item['inMoney']) : this.toNum(item['inMoney']) / this.toNum(item['netWeight']))
					Object.assign(item, {
						inFee: (_price == Infinity ? 0 : _price).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				/*#副石 需求说明
				 * 1、副石粒数   整数，无小数，限12个字，  修改副石粒数，影响副石额
				 * 2、副石重 ， 精确3位小数位，12位以内    修改副石重，影响副石额
				 * 3、副石单价   精确2位小数位，12位以内   修改副石单价，影响副石额
				 * 计价方式
				 * 4、副石额  计算方法有：                 修改副石额，影响副石单价
				      1、计价方式为计重：副石重*副石单价；
				      2、计价方式为计件：副石粒数*副石单价
				 * */
				let deputyCalcMethodType = (item['deputyCalcMethod'] == null || item['deputyCalcMethod'] == '') ? '计重' : item['deputyCalcMethod']
				// 副石粒数
				if(tab.type === 'deputyCount') {
					if(deputyCalcMethodType == '计件') {
						Object.assign(item, {
							deputyPrice: (this.toNum(item['deputyCount']) * this.toNum(item['deputyUnitPrice'])).toFixed(2)
						})
						Object.assign(item, {
							costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
						})
						Object.assign(item, {
							soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
						})
					}
				}
				// 副石单位
				if(tab.type === 'deputyUnit') {
					let diamondsWeight = (item['unit']=="ct"?0.2*this.toNum(item['mainWeight']):this.toNum(item['mainWeight'])) + (item['deputyUnit']=="ct"?0.2*this.toNum(item['deputyWeight']):this.toNum(item['deputyWeight']));
					Object.assign(item, {
						totalWeight: (this.toNum(item['netWeight']) + diamondsWeight + this.toNum(item['partWeight'])).toFixed(3)
					})
				}
				// 副石重
				if(tab.type === 'deputyWeight') {
					//钻石重
					let diamondsWeight = (item['unit']=="ct"?0.2*this.toNum(item['mainWeight']):this.toNum(item['mainWeight'])) + (item['deputyUnit']=="ct"?0.2*this.toNum(item['deputyWeight']):this.toNum(item['deputyWeight']));
					Object.assign(item, {
						totalWeight: (this.toNum(item['netWeight']) + diamondsWeight + this.toNum(item['partWeight'])).toFixed(3)
					})
					if(deputyCalcMethodType == '计重') {
						Object.assign(item, {
							deputyPrice: (this.toNum(item['deputyWeight']) * this.toNum(item['deputyUnitPrice'])).toFixed(3)
						})
						Object.assign(item, {
							costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item["certifiFee"])).toFixed(2)
						})
						Object.assign(item, {
							soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
						})
					}
				}
				// 副石单价
				if(tab.type === 'deputyUnitPrice') {
					Object.assign(item, {
						deputyPrice: (deputyCalcMethodType == '计件' ? this.toNum(item['deputyCount']) * this.toNum(item['deputyUnitPrice']) : this.toNum(item['deputyWeight']) * this.toNum(item['deputyUnitPrice'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 副石计价方式
				if(tab.type === 'deputyCalcMethod') {
					Object.assign(item, {
						deputyPrice: (deputyCalcMethodType == '计件' ? this.toNum(item['deputyCount']) * this.toNum(item['deputyUnitPrice']) : this.toNum(item['deputyWeight']) * this.toNum(item['deputyUnitPrice'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 副石额 
				if(tab.type === 'deputyPrice') {
					let price = this.toNum(this.toNum(item['deputyPrice']) / this.toNum(item['deputyCount']))
					let price1 = this.toNum(this.toNum(item['deputyPrice']) / this.toNum(item['deputyWeight']))

					Object.assign(item, {
						deputyUnitPrice: (deputyCalcMethodType == '计件' ? (price == Infinity ? 0 : price) : (price1 == Infinity ? 0 : price1)).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				/*#主石 需求说明
				 * 主石粒数   整数，无小数，限12个字，  修改主石粒数，影响主石额
				 * 主石重 ， 精确3位小数位，12位以内    修改主石重，影响主石额
				 * 主石单价   精确2位小数位，12位以内   修改主石单价，影响主石额
				 * 计价方式
				 * 4、主石额  计算方法有：                 修改主石额，影响主石单价
				      1、计价方式为计重：主石重*主石单价；
				      2、计价方式为计件：主石粒数*主石单价
				 * */
				let mainCalcMethodType = (item['mainCalcMethod'] == null || item['mainCalcMethod'] == '') ? '计重' : item['mainCalcMethod']
				// 主石粒数
				if(tab.type === 'count') {
					if(mainCalcMethodType == '计件') {
						Object.assign(item, {
							mainPrice: (this.toNum(item['count']) * this.toNum(item['unitPrice'])).toFixed(2)
						})
						Object.assign(item, {
							costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item["certifiFee"])).toFixed(2)
						})
						Object.assign(item, {
							soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
						})
					} else {
						// 计重
						Object.assign(item, {
							mainPrice: (this.toNum(item['mainWeight']) * this.toNum(item['unitPrice'])).toFixed(2)
						})
					}
				}
				// 主石重
				if(tab.type === 'mainWeight') {
					//钻石重
					let diamondsWeight = (item['unit']=="ct"?0.2*this.toNum(item['mainWeight']):this.toNum(item['mainWeight'])) + (item['deputyUnit']=="ct"?0.2*this.toNum(item['deputyWeight']):this.toNum(item['deputyWeight']));
					Object.assign(item, {
						totalWeight: (this.toNum(item['netWeight']) + diamondsWeight + this.toNum(item['partWeight'])).toFixed(3)
					})
					if(mainCalcMethodType == '计重') {
						Object.assign(item, {
							mainPrice: (this.toNum(item['mainWeight']) * this.toNum(item['unitPrice'])).toFixed(2)
						})
						Object.assign(item, {
							costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item["certifiFee"])).toFixed(2)
						})
						Object.assign(item, {
							soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
						})
					}
				}
				// 主石单位
				if(tab.type === 'unit') {
					let diamondsWeight = (item['unit']=="ct"?0.2*this.toNum(item['mainWeight']):this.toNum(item['mainWeight'])) + (item['deputyUnit']=="ct"?0.2*this.toNum(item['deputyWeight']):this.toNum(item['deputyWeight']));
					Object.assign(item, {
						totalWeight: (this.toNum(item['netWeight']) + diamondsWeight + this.toNum(item['partWeight'])).toFixed(3)
					})
				}
				// 主石单价
				if(tab.type === 'unitPrice') {
					Object.assign(item, {
						mainPrice: (mainCalcMethodType == '计件' ? this.toNum(item['count']) * this.toNum(item['unitPrice']) : this.toNum(item['mainWeight']) * this.toNum(item['unitPrice'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 计价方式
				if(tab.type === 'mainCalcMethod') {
					Object.assign(item, {
						mainPrice: (mainCalcMethodType == '计件' ? this.toNum(item['count']) * this.toNum(item['unitPrice']) : this.toNum(item['mainWeight']) * this.toNum(item['unitPrice'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 4、主石额 
				if(tab.type === 'mainPrice') {
					let _price = this.toNum(this.toNum(item['mainPrice']) / this.toNum(item['count']))
					let _price1 = this.toNum(this.toNum(item['mainPrice']) / this.toNum(item['mainWeight']))
					Object.assign(item, {
						unitPrice: (mainCalcMethodType == '计件' ? (_price == Infinity ? 0 : _price) : (_price1 == Infinity ? 0 : _price1)).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				/*#重量 需求说明
				 * 总件重   净金重+主石重+副石重+配件重，  修改总件重，影响净金重
				 * 净金重 ， 精确3位小数位   修改净金重，影响总件重，影响含配金重
				 * 含配金重    净金重g+配件重g   以用户输入为准，精确3位小数位，如无则按计算公式计算  修改含配金重，影响净金重
				 * 金耗   精确1位小数位    修改金耗，影响金料额 
				 * 金价   精确2位小数位    修改金价，影响金料额
				 * 金料额   净金重*（1+金耗%）*金价  修改金料额，影响金价
				 * */
				// 总件重 
				if(tab.type === 'totalWeight') {
					//钻石重
					let diamondsWeight = (item['unit']=="ct"?0.2*this.toNum(item['mainWeight']):this.toNum(item['mainWeight'])) + (item['deputyUnit']=="ct"?0.2*this.toNum(item['deputyWeight']):this.toNum(item['deputyWeight']));
					Object.assign(item, {
						netWeight: (this.toNum(item['totalWeight']) - ( diamondsWeight + this.toNum(item['partWeight']))).toFixed(3)
					})
					Object.assign(item, {
						heavyCode: (this.toNum(item['netWeight']) + this.toNum(item['partWeight'])).toFixed(3)
					})
					Object.assign(item, {
						goldE: (this.toNum(item['netWeight']) * (1 - (this.toNum(item['goldCost'])?this.toNum(item['goldCost'])/100:0)) * this.toNum(item['goldPrice'])).toFixed(2)
					})
					if(item['inMethod'] == "计重"){
						Object.assign(item, {
							inMoney: this.toNum(item['netWeight']) * this.toNum(item['inFee'])
						})
					}
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item["certifiFee"])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 净金重 
				if(tab.type === 'netWeight') {
					//钻石重
					let diamondsWeight = (item['unit']=="ct"?0.2*this.toNum(item['mainWeight']):this.toNum(item['mainWeight'])) + (item['deputyUnit']=="ct"?0.2*this.toNum(item['deputyWeight']):this.toNum(item['deputyWeight']));
					Object.assign(item, {
						heavyCode: (this.toNum(item['netWeight']) + this.toNum(item['partWeight'])).toFixed(3)
					})
					Object.assign(item, {
						totalWeight: (this.toNum(item['netWeight']) + diamondsWeight + this.toNum(item['partWeight'])).toFixed(3)
					})
					Object.assign(item, {
						goldE: (this.toNum(item['netWeight']) * (1 - (this.toNum(item['goldCost'])?this.toNum(item['goldCost'])/100:0)) * this.toNum(item['goldPrice'])).toFixed(2)
					})
					if(item['inMethod'] == "计重"){
						Object.assign(item, {
							inMoney: this.toNum(item['netWeight']) * this.toNum(item['inFee'])
						})
					}
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item["certifiFee"])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 含配金重 
				if(tab.type === 'heavyCode') {
					Object.assign(item, {
						netWeight: (this.toNum(item['heavyCode']) - this.toNum(item['partWeight'])).toFixed(3)
					})
				}
				// 金耗 
		    if(tab.type === 'goldCost'){
		      Object.assign(item, {
		        goldE : (this.toNum(item['netWeight']) * (1 - (this.toNum(item['goldCost'])?this.toNum(item['goldCost'])/100:0)) * this.toNum(item['goldPrice'])).toFixed(2)
		      })
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item["certifiFee"])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
		    }
				// 金价 
				if(tab.type === 'goldPrice' || tab.type === 'goldCost') {
					Object.assign(item, {
						goldE: (this.toNum(item['netWeight']) * (1 - (this.toNum(item['goldCost'])?this.toNum(item['goldCost'])/100:0)) * this.toNum(item['goldPrice'])).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item["certifiFee"])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 金料额
				if(tab.type === 'goldE') {
					Object.assign(item, {
						//goldE : (this.toNum(item['goldE']) / (this.toNum(item['netWeight']) * (1 + 1/this.toNum(item['goldCost']))) ).toFixed(3)
						goldPrice: (this.toNum(item['goldE']) / (this.toNum(item['netWeight']) * (1 - (this.toNum(item['goldCost'])?this.toNum(item['goldCost'])/100:0)))).toFixed(2)
					})
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
				}
				// 金料额
				if(tab.type === 'otherFee') {
					Object.assign(item, {
						costPrice: (this.toNum(item['goldE']) + this.toNum(item['mainPrice']) + this.toNum(item['deputyPrice']) + this.toNum(item['inMoney']) + this.toNum(item['otherFee']) + this.toNum(item['price']) + this.toNum(item['certifiFee'])).toFixed(2)
					})
					Object.assign(item, {
						soldPrice: this.toNum(item['ratio']) * this.toNum(item['costPrice'])
					})
					
				}
			},

			// keypress 监听回车
			dataGridkeyInput(evt, item, tab, index) {
				if(evt.key == 'Enter' && evt.keyCode == 13) {
					//回车光标移动到下一行，否则添加一条数据
					let nextInput = $("#"+tab.type+(index+1))[0];
					if(nextInput){
						nextInput.focus();
					}else{
						//通知父组件添加商品
						this.$emit("addRow");
						let empty_setInterval = setInterval(()=>{
							nextInput = $("#"+tab.type+(index+1))[0];
							if(nextInput){
								nextInput.focus();
								clearTimeout(empty_setInterval)
							}
						}, 1000)
					}
					//evt.target.blur()
				}
			},
			// 删除商品
			deletegoods(item, index) {
				if(item.barcode == '') {
					this.$emit('deletegoods', index);
				} else {
					this.$confirm('此操作将删除选中商品, 是否继续?', '删除提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					}).then(() => {
						this.$emit("deleteRefresh", 1);
						fetch.deleteGoods({
							operate: '2',
							orderNum: this.orderNum,
							productList: [{
								barcode: item.barcode
							}]
						}, (res) => {
							if(res.data.state == 200) {
								this.$message({
									type: 'success',
									message: '删除成功'
								})
								this.$emit('deletegoods', index);
							} else {
								this.$message({
									message: res.data.msg
								})
							}
						})
					}).catch(() => {

					})
				}
			},

			// 通过配置信息检测是否需要加载下拉框数据
			hasfetchData(type) {
				for(let action in this.selectConfig) {
					let config = this.selectConfig[action]

					if(config.resData == 'stand') {}
					if(type == action && this.datagridSelectData[config.resData] == undefined) {

						if(config.datalist && config.datalist.length > 0) {
							Object.assign(this.datagridSelectData, {
								[config.resData]: config.datalist
							})
							return
						}

						// 创建空数组 便于存放后面请求回来的数据
						Object.assign(this.datagridSelectData, {
							[config.resData]: []
						})

						// 对重定向的处理
						if(config.resDataRedirect == undefined) {
							// 拿到对应的请求接口
							if(fetch[config.fetchType]) {
								this.fetchData(fetch[config.fetchType], config)
							}
						} else {
							// 
							if(this.datagridSelectData[config.resDataRedirect]) {
								this.$set(this.datagridSelectData, config.resData, this.datagridSelectData[config.resDataRedirect])
							} else {
								// 重定向失败 再次fetch数据
								if(fetch[config.fetchType]) {
									this.fetchData(fetch[config.fetchType], config)
								}
							}
						}
					}
				}
				return Object.keys(this.selectConfig).includes(type)
			},

			// 
			fetchData(fetch, config) {
				if(config.localStorage && localStorage[config.localStorage]) {

					let tempData = JSON.parse(decodeURIComponent(localStorage[config.localStorage])).filter(f => f.classesName == config.classesName)
					this.$set(this.datagridSelectData, config.resData, tempData[0].childrenList)

				} else if(typeof fetch === 'function') {

					fetch(config, (res) => {
						// 回调方法
						let resArray = res
						let rpData = []

						if(resArray.length > 0) {
							//拿到childrenList列表里面的数据
							if(config.isResolveChildren) {
								resArray.filter(f => f.childrenList ? rpData.push(...f.childrenList && f.childrenList.filter(j => j)) : '')
							}

							// 根据对应的字段名进行存储
							if(rpData.length > 0) {
								this.$set(this.datagridSelectData, config.resData, rpData)
							} else {
								this.$set(this.datagridSelectData, config.resData, resArray)
							}
						}

					})
				}
			},

			//下拉选择 点击事件
			selecChange(fg) {
				fg.event.stopPropagation()

				this.clearTime()
				let tpData = this.datagridSelectData[fg.td.type]
				let coord = fg.event.target.getBoundingClientRect()

				this.addSelect(tpData, {
					left: coord.left,
					top: coord.top + coord.height
				}, fg)

				this.$emit('updataSelectContainer', {
					[fg.indexType + 'fIndex']: fg.fIndex,
					[fg.indexType + 'cIndex']: fg.cIndex
				})
			},

			// 纯手工下拉条
			addSelect(item, coord, fg) {
				let elem = document.getElementById('j_datagrid_select')

				let events = (_item) => {
					let productId = this.dgDataList[fg.fIndex].productId

					// 更新view视图
					this.$set(this.dgDataList[fg.fIndex], fg.td.type, _item.classesName)
					this.selectClassTdIndex = -1
					this.elemHide(elem)
					//productTypeId

					let tempJSON = {
						[fg.td.type]: _item.classesName,
						productId: productId
					}
					if(fg.td.type == 'productClasses') {
						tempJSON = Object.assign({}, tempJSON, {
							productTypeId: _item.classesId
						})
						this.$set(this.dgDataList[fg.fIndex], 'productTypeId', _item.classesId)
					}
					// 下拉选择之后需要对数据做一些处理
					this.inputChange(this.dgDataList[fg.fIndex], fg.td)

					if(fg.td.type == 'mainCalcMethod' // 主石计价方式
						||
						fg.td.type == 'deputyCalcMethod' // 副石计价方式
						||
						fg.td.type == 'inMethod' // 工费计价方式
						||
						fg.td.type == 'calcMethod' // 配件计价方式
					) {
						this.inputFocusout(fg.event, this.dgDataList[fg.fIndex], fg.td, fg.fIndex)
					} else {
						this.$emit('updataEditApi', tempJSON)
					}
				}

				if(!elem) {
					// 下拉框生成
					elem = document.createElement('div')
					elem.id = 'j_datagrid_select'
					elem.addEventListener('mouseleave', this._mouseEvent, false)
					elem.addEventListener('mousemove', this._mouseEvent, false)
					elem.className = 'datagrid-select-container'
					document.body.appendChild(elem)
				} else {
					elem.innerHTML = ''
				}

				//item
				if(elem && item && item.length > 0) {

					// 下拉列表生成
					item.forEach((j) => {

						let el = document.createElement('div')
						el.innerHTML = j.classesName || ''

						// 二级菜单
						if(j.typeList && j.typeList.length > 0) {
							el.className = 'item'
							elem.className = 'datagrid-select-container'
							let childItem = document.createElement('div')
							childItem.className = 'child-item'

							j.typeList.forEach(f => {
								let child = document.createElement('div')
								child.className = 'item ' + (f.classesName == fg.tr[fg.td.type] ? 'active' : '')
								child.innerHTML = f.classesName || ''
								child.setAttribute('title', j.classesName)
								childItem.appendChild(child)
								child.addEventListener('click', () => {
									events(f)
								}, false)
							})

							el.appendChild(childItem)

						} else {
							el.className = 'item ' + (j.classesName == fg.tr[fg.td.type] ? 'active' : '')
							el.addEventListener('click', () => {
								events(j)
							}, false)
							el.setAttribute('title', j.classesName)
							elem.className = 'datagrid-select-container overflow'
						}

						elem.appendChild(el)
					})

					elem.style.cssText = 'left:' + coord.left + 'px;top:' + coord.top + 'px;'
				} else {
					this.elemHide(elem)
				}
			},

			// 隐藏下拉条
			elemHide(elem) {
				if(elem) {
					elem.style.cssText = 'left:0px; top:0px; display: none;'
					this.$emit('updataSelectContainer', {
						selectCur_tr_index: -1,
						selectCur_td_index: -1,
						fixedfIndex: -1,
						fixedcIndex: -1
					})
				}
			},

			// 下拉条定时器
			clearTime(type) {
				if('boolean' === typeof type) {
					this.intervalGap = type
				} else {
					this.intervalGap = true
				}

				if(window.intervalGap) {
					clearTimeout(window.intervalGap)
					window.intervalGap = null
				}
			},

			// 下拉条事件监听
			_mouseEvent(evt, fIndex, cIndex) {
				let elem = document.getElementById('j_datagrid_select')
				switch(evt.type) {
					case 'mousemove':
						if(fIndex != undefined) {
							if(this.mouseEvent.x != fIndex || this.mouseEvent.y != cIndex) {
								this.elemHide(elem)
							}
						}
						this.clearTime()
						break;
					case 'mouseleave':
						this.clearTime(false)
						window.intervalGap = setTimeout(() => {
							if(elem && !this.intervalGap) {
								this.elemHide(elem)
								this.clearTime()
							}
						}, 300)
						break;
				}
				this.mouseEvent.x = fIndex
				this.mouseEvent.y = cIndex
			},

			// 查看详情
			gotoDetails(item) {
				//    this.$message({
				//      type:'info',
				//      message :'暂未开发'
				//    })
				this.$router.push({
					path: '/inventory',
					query: {
						text: '单据详情',
						barcode: item.barcode,
						productId: item.productId
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 左边固定表格区  */
	
	.dg_bd-fixed {
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		>.dg_tr {
			display: flex;
			transition: all .3s;
			height: 50px;
			>.dg_td {
				text-align: center;
				font-size: 13px;
				color: #333;
				display: flex;
				justify-content: center;
				align-items: center;
				word-wrap: break-word;
				word-break: break-all;
			}
			&:nth-child(even) {
				background-color: #d8ecfe;
			}
			&:nth-child(odd) {
				background-color: #f1f8fe;
			}
			
			&.move {
				background-color: #b2d8fc;
			}
			&.add {
				/*animation:add 1.5s ease-in-out .3s;*/
			}
			&.selectOn {
				background-color: #fff0d7!important;
			}
		}
	}
	
	@keyframes add {
		from {
			background-color: #ffba42;
		}
		25% {
			background-color: #fff;
		}
		50% {
			background-color: #ffba42;
		}
		75% {
			background-color: #fff;
		}
		to {
			background-color: transparent;
		}
	}
</style>

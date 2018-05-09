/**
 * 销售收银计算工具类
 */
export const SalePriceCalculatoin = {
	/**
	 * 计算
	 * type:类型, data:数据, name:计算名称
	 */
	calculatoin(type, data, name){
		//根据类型分发计算
		switch (type){
			//销售
			case 1:
				SalePriceCalculatoin.calculateSale(data, name);
				break;
			//换货-退货
			case 2:
				SalePriceCalculatoin.calculateExchange(data, name);
				break;
			//回收
			case 3:
				SalePriceCalculatoin.calculateExchange(data, name);
				break;
		}
	},
	/**
	 * 计算-销售
	 */
	calculateSale(data, name){
		if(name == "实售价"){
			//改变实售价，影响折扣
			if(data.productType != 1){
				//珠宝
				data.discount = SalePriceCalculatoin.formulaJewellerySaleBack(data.price, data.oldPrice);
			}else if(data.calcMethod == 1){
				//计重
				data.discount = SalePriceCalculatoin.formulaWeightSaleBack(data.price, data.goldWeight, data.saleGoldPrice, data.paymentPrice);
			}else{
				//计件
				data.discount = SalePriceCalculatoin.formulaPieceSaleBack(data.price, data.goldWeight, data.saleGoldPrice, data.paymentPrice);
			}
		}else{
			if(data.productType != 1){
				//珠宝
				data.price = SalePriceCalculatoin.formulaJewellerySale(data.oldPrice, data.discount);
			}else if(data.calcMethod == 1){
				//计重
				data.price = SalePriceCalculatoin.formulaWeightSale(data.goldWeight, data.saleGoldPrice, data.paymentPrice, data.discount);
			}else{
				//计件			
				data.price = SalePriceCalculatoin.formulaPieceSale(data.goldWeight, data.saleGoldPrice, data.paymentPrice, data.discount);
			}
		}
	},
	/**
	 * 计算-换货
	 */
	calculateExchange(data, name){
		if(name == "回购价"){
			let huigouoprice = Number(data.huigouoprice)?data.huigouoprice:0;
			//改变实售价，影响折扣
			if(data.productType != 1){
				//珠宝
				data.abrasion = SalePriceCalculatoin.formulaJewelleryBack(huigouoprice, data.paymentPrice, data.estimatePrice);
			}else if(data.calcMethod == 1){
				//计重
				data.abrasion = SalePriceCalculatoin.formulaWeightBack(huigouoprice, data.goldWeight, data.exchangeGoldPrice, data.paymentPrice);
			}else{
				//计件
				data.abrasion = SalePriceCalculatoin.formulaPieceBack(huigouoprice, data.goldWeight, data.exchangeGoldPrice, data.paymentPrice);
			}
			data.abrasion = Math.abs(data.abrasion);
		}else{
			if(data.productType != 1){
				//珠宝
				data.huigouoprice = -SalePriceCalculatoin.formulaJewellery(data.estimatePrice, data.abrasion, data.paymentPrice);
			}else if(data.calcMethod == 1){
				//计重
				data.huigouoprice = -SalePriceCalculatoin.formulaWeight(data.goldWeight, data.abrasion, data.exchangeGoldPrice, data.paymentPrice);
			}else{
				//计件			
				data.huigouoprice = -SalePriceCalculatoin.formulaPiece(data.goldWeight, data.abrasion, data.exchangeGoldPrice, data.paymentPrice);
			}
			data.price = -data.huigouoprice;
			//如果回购价小于0，则归零。
			if(data.price<0){
				data.price = 0;
			}
		}
		
	},
	/**
	 * 计算-退货
	 */
	calculateReturn(data, name){
		
	},
	/**
	 * 计算-回收
	 */
	calculateRecovery(data, name){
	
	},
	
	
	/******************计算公式**************************/
	/**
	 * 公式-销售-计重
	 * 实售价=(金重*金价+(金重*手工费))*折扣
	 */
	formulaWeightSale(goldWeight, saleGoldPrice, paymentPrice, discount){
		return _.floor(_.multiply(_.add(_.multiply(goldWeight * saleGoldPrice), _.multiply(goldWeight * paymentPrice)), _.multiply(discount,0.01)),2);
	},
	/**
	 * 公式-销售-计件
	 * 实售价=(金重*金价+手工费)*折扣
	 */
	formulaPieceSale(goldWeight, saleGoldPrice, paymentPrice, discount){
		return _.floor(_.multiply(_.add(_.multiply(goldWeight, saleGoldPrice), Number(paymentPrice)), _.multiply(discount,0.01)), 2);
	},
	/**
	 * 公式-销售-珠宝
	 * 实售价=标价*折扣
	 */
	formulaJewellerySale(oldPrice, discount){
		return _.floor(_.multiply(oldPrice, _.multiply(discount,0.01)), 2);
	},
	
	
	/**
	 * 公式-计重
	 * 回购价=金重*折旧*回收金价-折后金重*手工费  **********  注：折后金重=金重*折旧
	 */
	formulaWeight(goldWeight, abrasion, exchangeGoldPrice, paymentPrice){
		return _.floor(_.multiply(_.multiply(goldWeight, _.multiply(abrasion,0.01)), exchangeGoldPrice) - _.multiply(_.multiply(goldWeight, _.multiply(abrasion,0.01)), paymentPrice), 2);
	},
	/**
	 * 公式-计件
	 * 回购价=金重*折旧*回收金价-手工费
	 * 计算公式-珠宝
	 */
	formulaPiece(goldWeight, abrasion, exchangeGoldPrice, paymentPrice){
		return _.floor(_.multiply(_.multiply(goldWeight, _.multiply(abrasion,0.01)), exchangeGoldPrice) - paymentPrice, 2);
	},
	/**
	 * 公式-珠宝
	 * 回购价=估价*折旧-手工费
	 */
	formulaJewellery(estimatePrice, abrasion, paymentPrice){
		return _.floor(_.multiply(estimatePrice, _.multiply(abrasion,0.01)) - paymentPrice, 2);
	},
	
	
	
	/******************改变实售价，影响折扣**************************/
	
	/**
	 * 公式-销售-计重
	 * 折扣 = 实售价/(金重*金价+(金重*手工费))
	 */
	formulaWeightSaleBack(price, goldWeight, saleGoldPrice, paymentPrice){
		return _.floor(_.multiply(_.divide(price, _.add(_.multiply(goldWeight, saleGoldPrice), _.multiply(goldWeight, paymentPrice))), 100), 2);
	},
	/**
	 * 公式-销售-计件
	 * 折扣=实售价/(金重*金价+手工费)
	 */
	formulaPieceSaleBack(price, goldWeight, saleGoldPrice, paymentPrice){
		return _.floor(_.multiply(_.divide(price, _.add(_.multiply(goldWeight, saleGoldPrice), Number(paymentPrice))), 100), 2);
	},
	/**
	 * 公式-销售-珠宝
	 * 折扣=实售价/标价
	 */
	formulaJewellerySaleBack(price, oldPrice){
		return Number(oldPrice)?_.floor(_.multiply(_.divide(price, oldPrice), 100), 2):0;
	},
	
	
	/**
	 * 公式-计重
	 * 折旧=(回购价+折后金重*手工费 )/金重*回收金价**********  注：折后金重=金重*折旧
	 * 折旧=回购价/(金重*回收金价-金重*手工费)
	 */
	formulaWeightBack(price, goldWeight, exchangeGoldPrice, paymentPrice){
		return _.floor(_.multiply(_.divide(price, (_.multiply(exchangeGoldPrice, goldWeight) - _.multiply(goldWeight, paymentPrice))), 100), 2);
	},
	/**
	 * 公式-计件
	 * 折旧=(回购价+手工费)/金重*回收金价
	 * 计算公式-珠宝
	 */
	formulaPieceBack(price, goldWeight, exchangeGoldPrice, paymentPrice){
		return _.floor(_.multiply(_.divide(_.add(Number(price), Number(paymentPrice)), (_.multiply(goldWeight, exchangeGoldPrice))), 100), 2);
	},
	/**
	 * 公式-珠宝
	 * 折旧=(回购价+手工费)/估价
	 */
	formulaJewelleryBack(price, paymentPrice, estimatePrice){
		return _.floor(_.multiply(_.divide(_.add(Number(price), Number(paymentPrice)), estimatePrice), 100), 2);
	},
}

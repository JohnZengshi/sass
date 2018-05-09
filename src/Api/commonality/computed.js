// 计算
export const computedStorageData = function (littleClassKey, index, datas) { // 入库的字段计算
    let computedVal = null;
    switch (littleClassKey) {
        case "totalWeight": // 总件量
            let mainWeight = Number(datas.mainWeight) || 0;
            let deputyWeight = Number(datas.deputyWeight) || 0;
            let netWeight = Number(datas.netWeight) || 0;
            if (datas.unit === "ct") {
                mainWeight = mainWeight * 0.2;
            }
            if (datas.deputyUnit === "ct") {
                deputyWeight = deputyWeight * 0.2;
            }
            computedVal = ((Number(datas.partWeight) || 0) + mainWeight + deputyWeight + netWeight).toFixed(3);
            break;
        case "netWeight": // 净金重
            let mainWeights = Number(datas.mainWeight) || 0;
            let deputyWeights = Number(datas.deputyWeight) || 0;
            let totalWeight = Number(datas.totalWeight) || 0;
            if (datas.unit === "ct") {
                mainWeights = mainWeights * 0.2;
            }
            if (datas.deputyUnit === "ct") {
                deputyWeight = deputyWeight * 0.2;
            }
            computedVal = (totalWeight - (Number(datas.partWeight) || 0) + mainWeights + deputyWeights).toFixed(3);
            break;
        case "heavyCode": // 含配金重 净金重(productWeight.netWeight) + 配件重(parts.dpartWeight)
            computedVal = ((Number(datas.netWeight) || 0) + (Number(datas.partWeight) || 0)).toFixed(3);
            break;
        case "heavyCodeNetWeight": // 净金重（改变含配金的时候）
            computedVal = ((Number(datas.heavyCode) || 0) - (Number(datas.partWeight) || 0)).toFixed(3);
            break;
        case "goldPrice": // 金价
            let goldEs = Number(datas.goldE) || 0;
            let netWeights = Number(datas.netWeight) || 0;
            let goldCosts = Number(datas.goldCost) || 0;
            computedVal = (goldEs - netWeights * (1 + goldCosts)).toFixed(2)
            break;
        case "goldE": // 金料额 = 净金重(1 + 金耗(goldCost)) * 金价(goldPrice)
            computedVal = (Number(datas.netWeight) * (1 + Number(datas.goldCost) * 0.01) * Number(datas.goldPrice)).toFixed(2);
            break;
        case "unitPrice": // 主石单价
            if (datas.mainCalcMethod === "计件") {
                let count = (Number(datas.count) || 0);
                if (count !== 0) {
                    computedVal = ((Number(datas.mainPrice) || 0) / (Number(datas.count) || 0)).toFixed(2);
                } else {
                    computedVal = "0.00"
                }
                // computedVal = ((Number(datas.unitPrice) || 0) * (Number(datas.count) || 0)).toFixed(2);
            } else if (datas.mainCalcMethod === "计重") {
                let mainWeight = Number(datas.mainWeight) || 0
                if (mainWeight !== 0) {
                    computedVal = ((Number(datas.mainPrice) || 0) / (Number(datas.mainWeight) || 0)).toFixed(2);
                } else {
                    return "0.00"
                }
            }
            break;
        case "mainPrice": // (主石额)
            let mainWeightMainPrice = Number(datas.mainWeight) || 0;
            // if (datas.unit === "ct") {
            //     mainWeightMainPrice = mainWeightMainPrice * 0.2;
            // }
            if (datas.mainCalcMethod === "计件") {
                computedVal = ((Number(datas.unitPrice) || 0) * (Number(datas.count) || 0)).toFixed(2);
            } else if (datas.mainCalcMethod === "计重") {
                computedVal = ((Number(datas.unitPrice) || 0) * mainWeightMainPrice).toFixed(2);
            }
            break;
        case "deputyPrice": // (副石额)
            let deputyWeightDeputyPrice = Number(datas.deputyWeight) || 0;
            // if (datas.deputyUnit === "ct") {
            //     deputyWeightDeputyPrice = deputyWeightDeputyPrice * 0.2;
            // }
            if (datas.deputyCalcMethod === "计件") {
                computedVal = ((Number(datas.deputyUnitPrice) || 0) * (Number(datas.deputyCount) || 0)).toFixed(2);
            } else if (datas.deputyCalcMethod === "计重") {
                computedVal = ((Number(datas.deputyUnitPrice) || 0) * deputyWeightDeputyPrice).toFixed(2);
            }
            break;
        case "deputyUnitPrice": // 副石单价
            if (datas.deputyCalcMethod === "计件") {
                var deputyPrices = (Number(datas.deputyPrice) || 0);
                var deputyCounts = (Number(datas.deputyCount) || 0);
                if (deputyCounts !== 0) {
                    computedVal = (deputyPrices / deputyCounts).toFixed(2)
                } else {
                    computedVal = "0.00"
                }
            } else if (datas.deputyCalcMethod === "计重") {
                var deputyPriceTwo = (Number(datas.deputyPrice) || 0);
                var deputyWeightTwo = (Number(datas.deputyWeight) || 0);
                if (deputyWeightTwo !== 0) {
                    computedVal = (deputyPriceTwo / deputyWeightTwo).toFixed(2)
                } else {
                    computedVal = "0.00"
                }
                // computedVal = ((Number(datas.deputyPrice) || 0) / (Number(datas.deputyWeight) || 0)).toFixed(2);
                // computedVal = ((Number(datas.deputyUnitPrice) || 0) * (Number(datas.deputyWeight) || 0)).toFixed(2);
            }
            break;
        case "inMoney": // 进货工费额
            if (datas.inMethod === "计件") {
                computedVal = ((Number(datas.inFee)) || 0).toFixed(2);
            } else if (datas.inMethod === "计重") {
                computedVal = (Number(datas.netWeight) * Number(datas.inFee)).toFixed(2);
            }
            break;
        case "inFee": // 进货公费
            if (datas.inMethod === "计件") {
                computedVal = ((Number(datas.inMoney)) || 0).toFixed(2);
            } else if (datas.inMethod === "计重") {
                var isNetWeight = (Number(datas.netWeight) || 0)
                if (isNetWeight !== 0) {
                    computedVal = ((Number(datas.inMoney)) || 0) / (Number(datas.netWeight) || 0)
                } else {
                    computedVal = "0.00"
                }
            }
            break;
        case "price": // (配件额)
            if (datas.calcMethod === "计件") {
                computedVal = (Number(datas.partCount) * Number(datas.partPrice)).toFixed(2);
            } else if (datas.calcMethod === "计重") {
                computedVal = (Number(datas.partWeight) * Number(datas.partPrice)).toFixed(2);
            }
            break;
        case "partPrice": // 配件单价
            if (datas.calcMethod === "计件") {
                let ispartPrice = (Number(datas.partPrice) || 0);
                if (ispartPrice !== 0) {
                    computedVal = (Number(datas.price) / Number(datas.partCount)).toFixed(2);
                }
            } else if (datas.calcMethod === "计重") {
                let ispartWeight = (Number(datas.partWeight) || 0);
                if (ispartWeight !== 0) {
                    computedVal = ((Number(datas.price) || 0) / (Number(datas.partWeight) || 0)).toFixed(2);
                }
                // computedVal = (Number(datas.partWeight) * Number(datas.partPrice)).toFixed(2);
            }
            break;
        case "costPrice": // 成本 （证书费没处理）
            computedVal = ((Number(datas.goldE) || 0) + (Number(datas.certifiFee) || 0) + (Number(datas.mainPrice) || 0) + (Number(datas.deputyPrice) || 0) + (Number(datas.inMoney) || 0) + (Number(datas.price) || 0) + (Number(datas.otherFee) || 0)).toFixed(2);
            break;
            // computedVal = Math.round((Number(datas.goldE) || 0) + (Number(datas.certifiFee) || 0) + (Number(datas.mainPrice) || 0) + (Number(datas.deputyPrice) || 0) + (Number(datas.inMoney) || 0) + (Number(datas.price) || 0) + (Number(datas.otherFee) || 0));
            // break;
        case "soldPrice": // 售价
            computedVal = Math.round(Number(datas.costPrice) || 0) * (Number(datas.ratio) || 0); // 售价 = 成本 * 倍率
            break;
        case "ratio": // 倍率
            let costPrice = (Number(datas.costPrice) || 0);
            if (costPrice !== 0) {
                computedVal = ((Number(datas.soldPrice) || 0) / costPrice).toFixed(2); // 倍率 = 售价 / 成本
            }
            break;
        default:
            computedVal = datas[littleClassKey];
    }
    return computedVal;
}

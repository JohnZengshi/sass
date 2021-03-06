
module.exports = {
    
    //明细表配置
    detailConfing : [
        { 
            id: '0',  //id 
            text: '序号', //头部title文字
            width:'5%', //单元格宽
            type:'allNum', //合计类型值
            unit: '', //头部单位补充文字
            footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
            totalName : '合计',//底部合计 提示文字
            childType : '', //单元格类型
            totalType : '', //小计
            allType : 'allNum',//全计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        { 
            id: '11',  
            text: '回购类型',
            width:'10%', 
            type:'sellTypeName', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'sellTypeName',
            totalType : '' ,
            allType : '',
            toFixed : false,
            countCut : 0,
            //sort: ''
        },
        { 
            id: '12',  
            text: '产品类别',
            width:'10%', 
            type:'', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'productTypeName',
            totalType : '' ,
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'left'
            //sort: '1'
        },
        { 
            id: '1',  
            text: '首饰名称',
            width:'12%', 
            type:'', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'jewelryName',
            totalType : '' ,
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'left',
            paddingLeft: '10px',
            //sort: ''
        },
        { 
            id: '2',  
            text: '条码号',
            width:'10%',
            type:'', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'barcode',
            totalType : '' ,
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '4',  
            text: '件重', 
            width:'10%',
            type:'totalWeight', 
            unit: '(g)',
            footerUnit: '',
            totalName : '',
            childType : 'weight',
            totalType : 'totalWeight',
            allType : 'allWeight',
            toFixed : false,
            countCut : 2 ,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '5',  
            text: '回购金价',
            width:'10%', 
            // type:'totalGoldPrice', 
            type: '', 
            unit: '(元/g)',
            footerUnit: '',
            totalName : '',
            childType : 'goldPrice',
            totalType : 'totalGoldPrice' ,
            // totalType : '' ,
            allType : 'allBackGoldPrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
        },
        { 
            id: '15',  
            text: '旧料价',
            width:'10%', 
            type:'totalestimatePrice', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'estimatePrice',
            totalType : 'totalestimatePrice' ,
            allType : 'allEstimatePrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '17',  
            text: '折旧', 
            width:'10%', 
            type:'', 
            unit: '(%)',
            footerUnit: '',
            totalName : '',
            childType : 'depreciationDiscount',
            totalType : 'totaldepreciationDiscount' ,
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'right'
        },
        { 
            id: '6',  
            text: '工费总额',
            width:'10%', 
            type:'totalWage', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'wage',
            totalType : 'totalWage' ,
            allType : 'allWage',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
        },
        { 
            id: '7',  
            text: '回购价', 
            width:'10%', 
            // type:'totalBuy', 
            type: 'totalActualPrice',
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'actualPrice',
            totalType : 'totalActualPrice' ,
            allType : 'allBackPrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        }
    ],
    
    //智能分类
    capacityClassify : [
        // { 
        //  id: '0',  //id 
        //  text: '序号', //头部title文字
        //  width:'5%', //单元格宽
        //  type:'', //合计类型值
        //  unit: '', //头部单位补充文字
        //  footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
        //  totalName : '合计',//底部合计 提示文字
        //  childType : '', //单元格类型
        //  totalType : 'no', //小计
        //  allType : 'allNum',//全计
     //        toFixed : false, //是否进行小数点精确截取
     //        countCut : 0 //小数点截取位数
        // },
        { 
            id: '11',  
            text: '回购类型',
            width:'12%', 
            type:'sellTypeName', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'sellTypeName',
            totalType : '' ,
            allTotal: '',
            allType : '',
            toFixed : false,
            countCut : 0
        },
        { 
            id: '12',  
            text: '产品类别',
            width:'15%', 
            type:'', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'className',
            totalType : '' ,
            allTotal: '',
            allType : '',
            toFixed : false,
            countCut : 0,
            //sort: '1'
        },
        { 
            id: '1',  
            text: '首饰名称',
            width:'12%', 
            type:'', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'className',
            totalType : '' ,
            allTotal: '',
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'left',
            paddingLeft: '10px',
            //sort: ''
        },
        { 
            id: '2',  
            text: '件数',
            width:'11%',
            type:'totalNum', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'num',
            totalType : 'totalNum' ,
            allTotal: 'totalNum',
            allType : 'allNum',
            toFixed : false,
            countCut : 0,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '4',  
            text: '件重', 
            width:'11%',
            type:'totalWeight', 
            unit: '(g)',
            footerUnit: '',
            totalName : '',
            childType : 'weight',
            totalType : 'totalWeight',
            allTotal: 'totalWeight',
            allType : 'allWeight' ,
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '5',  
            text: '回购金价',
            width:'11%', 
            // type:'totalGoldPrice', 
            type: '', 
            unit: '(元/g)',
            footerUnit: '',
            totalName : '',
            childType : 'goldPrice',
            totalType : 'totalGoldPrice' ,
            // totalType : '' ,
            allType : 'allBackGoldPrice',
            allTotal: '',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
        },
        { 
            id: '15',  
            text: '旧料价',
            width:'11%', 
            // type:'totalEstimatePrice', 
            type:'totalestimatePrice', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'estimatePrice',
           // totalType : 'totalSoldPrice' ,
            // totalType : 'estimatePrice' ,
            totalType : 'estimatePrice' ,
            allTotal : 'estimatePrice',
            allType : 'allEstimatePrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '17',  
            text: '折旧', 
            width:'10%', 
            type:'', 
            // type:'totalDiscount', 
            // type:'totaldepreciationDiscount', 
            unit: '(%)',
            footerUnit: '',
            totalName : '',
            // childType : 'discount',
            childType : 'depreciationDiscount',
            // totalType : 'totalDiscount' ,
            totalType : 'totaldepreciationDiscount' ,
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'right'
        },
        { 
            id: '6',  
            text: '工费总额',
            width:'10%', 
            type:'totalWage', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'wage',
            totalType : 'totalWage' ,
            allTotal: 'totalWage',
            allType : 'allWage',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
        },
        { 
            id: '7',  
            text: '回购价', 
            width:'10%', 
            // type:'totalBuy', 
            type: 'totalActualPrice',
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'actualPrice',
            totalType : 'totalActualPrice',
            allTotal: 'totalActualPrice',
            allType : 'allBackPrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        }
    ],
    
    
    //产品分类
    productClassify : [
        // { 
        //  id: '0',  //id 
        //  text: '序号', //头部title文字
        //  width:'5%', //单元格宽
        //  type:'', //合计类型值
        //  unit: '', //头部单位补充文字
        //  footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
        //  totalName : '合计',//底部合计 提示文字
        //  childType : '', //单元格类型
        //  totalType : 'no', //小计
        //  allType : 'allNum',//全计
     //        toFixed : false, //是否进行小数点精确截取
     //        countCut : 0 //小数点截取位数
        // },
        { 
            id: '11',  
            text: '回购类型',
            width:'10%', 
            type:'', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'sellTypeName',
            totalType : '' ,
            allType : '',
            allTotal: '',
            toFixed : false,
            countCut : 0
        },
        { 
            id: '12',  
            text: '产品类别',
            width:'12%', 
            type:'', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'className',
            totalType : '' ,
            allType : '',
            allTotal: '',
            toFixed : false,
            countCut : 0,
            textAlign: 'left',
            paddingLeft: '10px',
            //sort: '1'
        },
        { 
            id: '2',  
            text: '件数',
            width:'12%',
            type:'totalNum', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'num',
            totalType : 'totalNum' ,
            allTotal: 'totalNum',
            allType : 'allNum',
            toFixed : false,
            countCut : 0,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '4',  
            text: '件重', 
            width:'10%',
            type:'totalWeight', 
            unit: '(g)',
            footerUnit: '',
            totalName : '',
            childType : 'weight',
            totalType : 'totalWeight',
            allTotal: 'totalWeight',
            allType : 'allWeight' ,
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        },
        { 
            id: '5',  
            text: '回购金价',
            width:'10%', 
            // type:'totalGoldPrice', 
            type: '', 
            unit: '(元/g)',
            footerUnit: '',
            totalName : '',
            childType : 'goldPrice',
            totalType : 'totalGoldPrice' ,
            allTotal: '',
            // totalType : '' ,
            allType : 'allBackGoldPrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
        },
        { 
            id: '15',  
            text: '旧料价',
            width:'11%', 
            // type:'totalEstimatePrice', 
            type:'totalestimatePrice', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'estimatePrice',
           // totalType : 'totalSoldPrice' ,
            // totalType : 'estimatePrice' ,
            totalType : 'estimatePrice' ,
             allTotal: 'estimatePrice',
            allType : 'allEstimatePrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        },
        // { 
        //  id: '15',  
        //  text: '旧料价',
        //  width:'10%', 
        //  type:'totalEstimatePrice', 
        //  unit: '(元)',
        //  footerUnit: '',
        //  totalName : '',
        //  childType : 'estimatePrice',
        //  totalType : 'totalEstimatePrice' ,
        //  allType : 'allEstimatePrice',
     //        toFixed : false,
     //        countCut : 2,
     //        //sort: ''
        // },
        // { 
        //  id: '17',  
        //  text: '折旧', 
        //  width:'10%', 
        //  type:'', 
        //  unit: '%',
        //  footerUnit: '',
        //  totalName : '',
        //  childType : 'depreciationDiscount',
        //  totalType : '' ,
        //  allType : '',
     //        toFixed : false,
     //        countCut : 0
        // },
        { 
            id: '17',  
            text: '折旧', 
            width:'10%', 
            type:'', 
            // type:'totalDiscount', 
            // type:'totaldepreciationDiscount', 
            unit: '(%)',
            footerUnit: '',
            totalName : '',
            // childType : 'discount',
            childType : 'depreciationDiscount',
            // totalType : 'totalDiscount' ,
            // totalType : 'totaldepreciationDiscount' ,
            totalType : 'totaldepreciationDiscount' ,
            allTotal: '',
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'right'
        },
        { 
            id: '6',  
            text: '工费总额',
            width:'14%', 
            type:'totalWage', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'wage',
            totalType : 'totalWage' ,
            allTotal: 'totalWage',
            allType : 'allWage',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
        },
        { 
            id: '7',  
            text: '回购价', 
            width:'14%', 
            // type:'totalBuy', 
            type: 'totalActualPrice',
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'actualPrice',
            totalType : 'totalActualPrice' ,
            allTotal: 'totalActualPrice',
            allType : '',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        }
    ],
    
    //自定义
  productCustom : [
      // { 
      //   id: '0',  //id 
      //   text: '序号', //头部title文字
      //   width:'5%', //单元格宽
      //   type:'', //合计类型值
      //   unit: '', //头部单位补充文字
      //   footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
      //   totalName : '合计',//底部合计 提示文字
      //   childType : '', //单元格类型
      //   totalType : 'no', //小计
      //   allType : 'allNum',//全计
      //       toFixed : false, //是否进行小数点精确截取
      //       countCut : 0 //小数点截取位数
      // },
      { 
        id: '11',  
        text: '回购类型',
        width:'10%', 
        type:'', 
        unit: '',
        footerUnit: '',
        totalName : '',
        childType : 'sellTypeName',
        totalType : '' ,
        allTotal: '',
        allType : '',
            toFixed : false,
            countCut : 0
      },
      { 
        id: '12',  
        text: '产品类别',
        width:'10%', 
        type:'', 
        unit: '',
        footerUnit: '',
        totalName : '',
        childType : 'className',
        totalType : '' ,
        allTotal: '',
        allType : '',
        toFixed : false,
        countCut : 0,
            //sort: '1'
      },
      { 
        id: '1',  
        text: '首饰名称',
        width:'12%', 
        type:'', 
        unit: '',
        footerUnit: '',
        totalName : '',
        childType : 'className',
        totalType : '' ,
        allTotal: '',
        allType : '',
        toFixed : false,
        countCut : 0,
        textAlign: 'left',
        paddingLeft: '10px',
        //sort: ''
      },
      { 
        id: '2',  
        text: '件数',
        width:'10%',
        type:'totalNum', 
        unit: '',
        footerUnit: '',
        totalName : '',
        childType : 'num',
        totalType : 'totalNum' ,
        allTotal: 'totalNum',
        allType : 'allNum',
        toFixed : false,
        countCut : 0,
        textAlign: 'right'
            //sort: ''
      },
      { 
        id: '4',  
        text: '件重', 
        width:'10%',
        type:'totalWeight', 
        unit: '(g)',
        footerUnit: '',
        totalName : '',
        childType : 'weight',
        totalType : 'totalWeight',
        allTotal: 'totalWeight',
        allType : 'allWeight' ,
        toFixed : false,
        countCut : 2,
        textAlign: 'right'
        //sort: ''
      },
      { 
        id: '5',  
        text: '回购金价',
        width:'10%', 
        // type:'totalGoldPrice',
        type: '', 
        unit: '(元/g)',
        footerUnit: '',
        totalName: '',
        childType: 'goldPrice',
        totalType: 'totalGoldPrice' ,
        allTotal: '',
        // totalType : '' ,
        allType: 'allBackGoldPrice',
        toFixed: false,
        countCut: 2,
        textAlign: 'right'
      },
        { 
            id: '15',  
            text: '旧料价',
            width:'11%', 
            // type:'totalEstimatePrice', 
            type:'totalestimatePrice', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'estimatePrice',
           // totalType : 'totalSoldPrice' ,
            // totalType : 'estimatePrice' ,
            totalType : 'estimatePrice' ,
            allTotal: 'estimatePrice',
            allType : 'allEstimatePrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
        },


              { 
            id: '17',  
            text: '折旧', 
            width:'10%', 
            type:'', 
           // type:'totalDiscount', 
            // type:'totaldepreciationDiscount', 
            unit: '(%)',
            footerUnit: '',
            totalName : '',
            // childType : 'discount',
            childType : 'depreciationDiscount',
            // totalType : 'totalDiscount' ,
            totalType : 'totaldepreciationDiscount' ,
            allTotal: '',
            allType : '',
            toFixed : false,
            countCut : 0,
            textAlign: 'right'
        },
      // { 
      //   id: '17',  
      //   text: '折旧', 
      //   width:'10%', 
      //   type:'', 
      //   unit: '%',
      //   footerUnit: '',
      //   totalName : '',
      //   childType : 'depreciationDiscount',
      //   totalType : '' ,
      //   allType : '',
      //       toFixed : false,
      //       countCut : 0
      // },
      { 
        id: '6',  
        text: '工费总额',
        width:'10%', 
        type:'totalWage', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'wage',
        totalType : 'totalWage' ,
        allTotal: 'totalWage',
        allType : 'allWage',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
      },
      { 
        id: '7',
        text: '回购价', 
        width:'10%', 
        // type:'totalBuy', 
        type: 'totalActualPrice',
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'actualPrice',
        totalType : 'totalActualPrice' ,
         allTotal: 'totalActualPrice',
        allType : 'allBackPrice',
            toFixed : false,
            countCut : 2,
            textAlign: 'right'
            //sort: ''
      }
    ]
}

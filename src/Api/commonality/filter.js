// 过滤器
export const readOnly = function (parm) {
    // let onlyReady = new Set(['status', 'totalWeight', 'heavyCode', 'goldE', 'mainPrice', 'deputyPrice', 'inMoney', 'price', 'costPrice']);
    let onlyReady = new Set(['status', 'costPrice']);
    let onlyState = [parm].filter(x => onlyReady.has(x));
    if (onlyState.length > 0) {
        return true
    } else {
        return false
    }
}
// 组合拼接名字
export const groupName = function (item, smallkey = 'name') {
    let name = ''
    for (let i of item) {
      name += name ? `;${i[smallkey]}` : i[smallkey]
    }
    return name
}
// 组合id选项
export const groupIdList = function (item, smallkey = 'id') {
    let idList = []
    for (let i of item) {
      idList.push({[smallkey]: i})
    }
    return idList
}
// 提取id列表
export const extractIdList = function (item, smallkey = 'id') {
    let idList = []
    for (let i of item) {
      idList.push(i[smallkey])
    }
    return idList
}
// 提取第一个数组和第二个数据的差值  
export const differenceData = function (oneList, twoList, keyName, addType, delType, operationKey = 'type') {
    let difference = {
        one: [], // 数组二没有的值
        two: [] // 数组一没有的值
    }
    for (let i of oneList) {
        if (!twoList.includes(i)) {
            if (keyName) {

                if (delType) {
                    difference.one.push({
                        [keyName]: i,
                        [operationKey]: delType
                    })
                } else {
                    difference.one.push({
                        [keyName]: i
                    })
                }
               
            } else {
                difference.one.push(i)
            }
        }
    }
    for (let i of twoList) {
        if (!oneList.includes(i)) {
            if (keyName) {

                if (addType) {
                    difference.one.push({
                        [keyName]: i,
                        [operationKey]: addType
                    })  
                } else {
                    difference.one.push({
                        [keyName]: i
                    })   
                }
                
            } else {
                difference.two.push(i)
            } 
        }
    }
    return difference
}

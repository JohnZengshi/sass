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
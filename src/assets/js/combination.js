export const combination = {
  // 表格排序组合值
  sort (parm) {
    let datas = {
      sortList: []
    }
    for (let i of parm) {
      if (i.value) {
        datas.sortList.push({
          [i.childType]: i.value
        })
      }
    }
    return datas
  }
}

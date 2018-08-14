export const styleWR = function (parm, rN) { // 提取居左和宽度
    let datas = {}
    if (parm.width) {
      datas.width = parm.width + ( parm.width.toString().indexOf('%') >= 0 ? '' : 'px')
    }
    if (parm.right) {
      datas.right = rN ? rN : '20px'
    }
    return datas
}
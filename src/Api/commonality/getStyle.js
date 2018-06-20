export const styleWR = function (parm) { // 提取居左和宽度
  debugger
    let datas = {}
    if (parm.width) {
      datas.width = parm.width + ( parm.width.indexOf('%') >= 0 ? '' : 'px')
    }
    if (parm.right) {
      datas.right = parm.right + ( parm.right.indexOf('%') >= 0 ? '' : 'px')
    }
    console.log('----------------=============', datas)
    return datas
}
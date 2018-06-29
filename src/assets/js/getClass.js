// 提取表格样式的
export const calculateClass = function (parm) {
  let datas = {
    width: parm.width + (parm.width.toString().indexOf('%') >= 0 ? '' : 'px'),
    textAlign: parm.textAlign,
    paddingLeft: parm.paddingLeft
  }
  return datas
}
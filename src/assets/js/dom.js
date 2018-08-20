export const getPosition = function (element) {
  var dc = document,
  rec = element.getBoundingClientRect(),
  _x = rec.left, // 获取元素相对浏览器视窗window的左、上坐标 
  _y = rec.top; // 与html或body元素的滚动距离相加就是元素相对于文档区域document的坐标位置 
  _x += dc.documentElement.scrollLeft || dc.body.scrollLeft;
  _y += dc.documentElement.scrollTop || dc.body.scrollTop;
  return {
    left: _x,
    top: _y
  }
}

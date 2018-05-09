/*
* 监听元素滚动
* */
class scroll {
    
  constructor (el) {
    this.element = el
    
    if (this.element == undefined || 'string' == typeof this.element ){
      this.element = null
    } else if (this.element.nodeType == 2 || 
        this.element.nodeType == 3) {
      this.element = null
    }
  }
  getElement (){
    return this.isElement() ? this.element : null
  }
  
  addEvent (el, type , callback ){
    if(el.addEventListener) el.addEventListener(type, callback, false)
  }
  
  getElementSize (){
    return this.isElement() ? this.element.scrollHeight : 0
  }
  
  getScroll () {
    if(this.isElement()){
      return this.element.scrollTop
    }
  }
  
  setScroll (size) {
    if (this.isElement()){
     setTimeout(() => {
       this.element.scrollTop = size || 99999
     },100)
    }
  }
  
  isElement (){
    return this.element.nodeType == 1
  }
}

class elementScroll extends scroll {
  delta = 0
  constructor (el){
    super(el)
  
    if(this.getElement()){
      this.addEvent(this.element, 'scroll', (e) => this.elemeHandle(e))
      let mouseType = document.mozFullScreen != undefined ? 'DOMMouseScroll' : 'mousewheel'
      this.addEvent(this.element, mouseType, (event) => {
         this.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3
      })
    }
  }
  
  // 滚动条
  elemeHandle (ev){
    if(typeof this['scroll'] == 'function' && ev){
      this['scroll'](ev, ev.target.scrollTop, this.delta)
    }
  }
}  

export default elementScroll
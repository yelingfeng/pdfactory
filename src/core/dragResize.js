/**
 * Created by  on 2016/6/20.
 */
import $ from "jquery"

/**
 * 判断是否当前组件在子窗体内
 * @$ele 当前组件对象
 */
let isContainsCp = ($ele) => {
    return $ele.closest("." + RC.CHILD_WIN_BOX_CLS).length > 0;
}


let findInArray = (array, callback) => {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

let isFunction = (func) => {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

let isNum = (num) => {
  return typeof num === 'number' && !isNaN(num);
}

let int =  (a) => {
  return parseInt(a, 10);
}

let outerHeight = (node) => {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  let height = node.clientHeight;
  let computedStyle = window.getComputedStyle(node);
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  // height += int(computedStyle.marginTop);
  // height += int(computedStyle.marginBottom);
  return height;
}

let outerWidth = (node) => {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth;
  let computedStyle = window.getComputedStyle(node);
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  // width += int(computedStyle.marginLeft);
  // width += int(computedStyle.marginRight);
  return width;
}

let innerHeight = (node) => {
  let height = node.clientHeight;
  let computedStyle = window.getComputedStyle(node);
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
}

let innerWidth =  (node) => {
  let width = node.clientWidth;
  let computedStyle = window.getComputedStyle(node);
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

let matchesSelectorFunc = '';
let matchesSelector =  (el, selector) => {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = findInArray([
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector'
    ], function(method){
      return isFunction(el[method]);
    });
  }
  return el[matchesSelectorFunc].call(el, selector);
}

let getBoundPosition = function(bounds,node,clientX, clientY) {
  // If no bounds, short-circuit and move on
  if (!bounds) return [clientX, clientY];
  let parent = node.parentNode;
  if (bounds.parent) {
    let nodeStyle = window.getComputedStyle(node);
    let parentStyle = window.getComputedStyle(parent);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + int(parentStyle.paddingLeft) +
            int(nodeStyle.borderLeftWidth) + int(nodeStyle.marginLeft),
      top: -node.offsetTop + int(parentStyle.paddingTop) +
            int(nodeStyle.borderTopWidth) + int(nodeStyle.marginTop),
      right: innerWidth(parent)  - node.offsetLeft - outerWidth(node) ,
      bottom: innerHeight(parent)  - outerHeight(node) - node.offsetTop
    };
  }
  // Keep x and y below right and bottom limits...
  if (isNum(bounds.right)) clientX = Math.min(clientX, bounds.right);
  if (isNum(bounds.bottom)) clientY = Math.min(clientY, bounds.bottom);
  // But above left and top limits.
  if (isNum(bounds.left)) clientX = Math.max(clientX, bounds.left);
  if (isNum(bounds.top)) clientY = Math.max(clientY, bounds.top);
  return [clientX, clientY];
}

// 事件委托
let addEvent  = (eventName,vm) =>{
    var el = document.documentElement
    var event = 'mousemove'
    var handler= vm[eventName]
    if (el.attachEvent) {
      el.attachEvent('on' + event, handler);
    } else if (el.addEventListener) {
      el.addEventListener(event, handler,true);
    } else {
      el['on' + event] = handler;
    }
}
let removeEvent = (eventName,vm) =>{
    var el = document.documentElement
    var event = 'mousemove'
    var handler= vm[eventName]
    if (el.detachEvent) {
      el.detachEvent('on' + event, handler);
    } else if (el.removeEventListener) {
      el.removeEventListener(event, handler,true);
    } else {
      el['on' + event] = null;
    }
}


const dragResize  =  {


    addEvent,
    removeEvent,
    resizeStart(e){
        this.resizeStartX = e.clientX
        this.resizeStartY = e.clientY
        this.resizing = true
        this.lastW = this.w
        this.lastH = this.h
    },

    handleDown(e) {
      if(this.handle && !matchesSelector(e.target, this.handle)){
        return
      }
      if(this.cancel && matchesSelector(e.target, this.cancel)){
        return
      }
      if(!this.lastX){
        this.lastX = e.clientX
        this.lastY = e.clientY
      }
      this.dragging = true
    },

    handleUp(e) {
      this.dragging = false
      this.resizing = false
    },

    handleMove(e){
      if(e.stopPropagation) e.stopPropagation();
      if(e.preventDefault) e.preventDefault();
      if(this.dragging){
        let deltax = e.clientX - this.lastX
        let deltay = e.clientY - this.lastY
        let deltaxround = Math.round(deltax / this.grid[0]) * this.grid[0]
        let deltayround = Math.round(deltay / this.grid[1]) * this.grid[1]
        let thisx = this.x
        let thisy = this.y
        if(this.grid[0]>0 && this.grid[1]>0){
          if(this.axis === 'both'){
            thisx = deltaxround
            thisy = deltayround
          }else if(this.axis === 'x'){
            thisx = deltaxround
          }else if(this.axis === 'y'){
            thisy = deltayround
          }
        }else{
          if(this.axis === 'both'){
            thisx = e.clientX - this.lastX
            thisy = e.clientY - this.lastY
          }else if(this.axis === 'x'){
            thisx = e.clientX - this.lastX
          }else if(this.axis === 'y'){
            thisy = e.clientY - this.lastY
          }
        }
       if(this.bounds){
          [thisx,thisy] = getBoundPosition(this.bounds,this.$el,thisx,thisy)
       }
        this.x = thisx
        this.y = thisy
      }
      if(this.resizing){
        this.w = int(this.lastW) + int(e.clientX) - int(this.resizeStartX)
        this.h = int(this.lastH) + int(e.clientY) - int(this.resizeStartY)
      }
    }
 
}

export default dragResize
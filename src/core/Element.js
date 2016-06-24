/**
 * Created by  on 2016/6/20.
 */

import Component from "vue-class-component"
import dragResize from "./dragResize"
import RC from "./../util/ResourcesConfig"
import {mixin} from "core-decorators"

const  defaultOption = {
    minWidth : RC.ZELEMENT_MINW,        // 限制最小宽度
    minHeight: RC.ZELEMENT_MINH,        // 限制最小高度
    callback : null,    // 动作进行时调用的回调函数
    titleName : "",
    name : "",
    remark : "",
    mode  :'dragging',
    /**  状态 0 初始状态,1子窗体状态 ,2 锚定 */
    status : 0,
    /** 锚定方式 */
    grapping : "",
    isView : "",
    isChild : "",
    css : {
        width: 200,
        height : 200,
        opacity:1,
    }
}



const template =  `
     <div class="zlayoutElement" :class="{'`+RC.ZElEMENT_ELE_FOCUS+`':isEleFocus}"  id="{{id}}" maxNum={{maxNum}} 
            @mousedown='handleDown' @mouseup='handleUp' :style='boxStyle'>
        <div class="zlayout-eleContent">
           <div class="zlayout-component">
              <slot ></slot> 
           </div> 
        </div>
        <div class="zlayout-rb">
            <span class="z-radius south-east-resize" @mousedown.stop='resizeStart'></span>
        </div>
    </div>  
   `;

const props = {
      w:{
          type:Number,
          default:RC.ZELEMENT_MINW
      },
      h:{
          type:Number,
          default: RC.ZELEMENT_MINH
      },
      x:{
          type:Number,
          default:0
      },
      y:{
          type:Number,
          default:0
      },
      r:{
          type:Number,
          default:0
      },
      rotatable:{
          type:Boolean,
          default:false
      },
      axis:{
          type:String,
          default:'both'
      },
      handle:{
        type:String,
        default:''
      },
      cancel:{
        type:String,
        default:''
      },
      grid:{
        type:Array,
        default:function(){
          return [0,0]
        }
      },
      bounds:{
        type:Object,
        default: function(){
            return {parent:true}
        }
      },
      id : {
         type :String,
         default :''
      },
      maxNum :{
         type :Number,
         default :''
      } 
}




@Component({
   props :props,
   template :template,
   computed:{
        // 拖拽或者resize时候显示边框    
        isEleFocus(){
            return  this.dragging ||  this.resizing; 
        },
        // 绑定样式
        boxStyle(){
            return {
              width:this.w+'px',
              height:this.h+'px',
              transform:'translate('+this.x+'px,'+this.y+'px)'
            }
        }
   }
})
@mixin(dragResize)
export default class Element {
    
    data(){
        return {
          lastX: 0,
          lastY: 0,
          dragging:false,
          resizeStartX:0,
          resizeStartY:0,
          resizing:false
        }
    }    

    ready(){
        this.addEvent('handleMove',this)
    }
    beforeDestroy(){
        this.removeEvent('handleMove',this)
    }
    

}




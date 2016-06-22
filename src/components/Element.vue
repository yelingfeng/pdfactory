/**
 * Created by  on 2016/6/20.
 */

<template>
    <div class="zlayoutElement" :class="{'ele-focus':isEleFocus}"  id="{{id}}" maxNum={{maxNum}} 
            @mousedown='handleDown' @mouseup='handleUp' :style='boxStyle'>
        <div class="zlayout-eleContent">
            <div class="zlayout-component">
                 <slot></slot>
            </div>
        </div>
        <div class="zlayout-rb">
            <span class="z-radius north-west-resize"></span>
            <span class="z-radius north-resize" ></span>
            <span class="z-radius north-east-resize" ></span>
            <span class="z-radius west-resize" ></span>
            <span class="z-radius east-resize" ></span>
            <span class="z-radius south-west-resize"></span>
            <span class="z-radius south-resize" ></span>
            <span class="z-radius south-east-resize" @mousedown.stop='resizeStart'></span>
        </div>
    </div>
</template>

<script>


import Base from "./Base"
import RC from "./../util/ResourcesConfig"

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


const attr = {
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





export  default {
    mixins:[Base],
    props :attr,
    data(){
        return {
          lastX: 0,
          lastY: 0,
          dragging:false,
          resizeStartX:0,
          resizeStartY:0,
          resizing:false
        }
    },

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

    },

    ready(){
        this.addEvent('handleMove',this)
    },
    beforeDestroy(){
        this.removeEvent('handleMove',this)
    }
 
 
}


</script>

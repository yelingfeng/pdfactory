/**
 * Created by  on 2016/6/20.
 */
import $ from "jquery"
import RC from "./../util/ResourcesConfig"

const  defaultOption = {
    minWidth : RC.ZELEMENT_MINW,		// 限制最小宽度
    minHeight: RC.ZELEMENT_MINH,		// 限制最小高度
    callback : null,	// 动作进行时调用的回调函数
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

/**
 * 判断是否当前组件在子窗体内
 * @$ele 当前组件对象
 */
const isContainsCp = ($ele) => {
    return $ele.closest("." + RC.CHILD_WIN_BOX_CLS).length > 0;
}
const Base  =  {
    getOption(){
        console.log("this is father option")
    }
}
export default Base
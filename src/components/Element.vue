<template>
    <div class='zlayoutElement' eid={{eid}} maxNum={{maxNum}}>
        <div class='zlayout-eleContent'>
            <div class='zlayout-component'></div>
        </div>
        <div class='zlayout-rb'>
            <span class='z-radius north-west-resize'></span>
            <span class='z-radius north-resize'></span>
            <span class='z-radius north-east-resize'></span>
            <span class='z-radius west-resize'></span>
            <span class='z-radius east-resize'></span>
            <span class='z-radius south-west-resize'></span>
            <span class='z-radius south-resize'></span>
            <span class='z-radius south-east-resize'></span>
        </div>
    </div>

</template>
<script>
    import RC from "./../util/ResourcesConfig"
    import $ from "jquery"

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

    export default {
        data(){
            return {
            }
        },
        ready(){

        },
        props:['eid','maxNum']
    }
</script>

<style>

</style>

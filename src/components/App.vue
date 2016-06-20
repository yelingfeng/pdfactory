<template>
    <div class="zlayoutCenterView" :style="styleObj">

        <Element :eid="aaa" :max-num="1" ></Element>
        <Ele-cls :eid="222" :max-num="2" ></Ele-cls>
        <p>
            <button @click="showToaster('error')">error</button>
            <button @click="showToaster('warning')">waring</button>
            <button @click="showToaster('success')">success</button> 
            <button @click="showToaster('info')">info</button> 
        </p>
    </div>
    <Toaster></Toaster>
</template>

<script>
    import $ from "jquery"
    import Element from "./Element.vue"
    import Toaster from "./Toaster"
    import {TestAction,loadModules} from "./../vuex/actions"
    import Utils  from "./../util/zUtil"
    import EleCls from "./Element.js"
    export default {
         data(){
             return {
                 msg : "产品工场",
                 styleObj : {
                     width : 0,
                     height : 0
                 }
             }
         },
         vuex : {
            actions : {
                TestAction,loadModules
            }
         },
        ready(){
            this.init();
        },
        methods:{

            init(){

                //this.loadModules();

                this.styleObj.width  = $(window).width() + "px";
                this.styleObj.height = $(window).height() + "px";
                var isOpacity = Utils.getUrlString("isOpacity");

                if(isOpacity && isOpacity == "1"){
                    $("body").css({
                        "background":"#072E67 url(image/zld-bg.jpg) no-repeat center 0",
                        "background-size":"cover"
                    })
                }

            },

            showToaster(type){
                this.TestAction("测试0001",type)
            }
        },
        components : {
            Element,EleCls,
            Toaster
        }
    }
</script>

<style >
  h1{
      color :#fff;
  }
  body{
      overflow: hidden;
  }

 .zlayoutCenterView{
    overflow: hidden;
 }
 .zlayoutCenterView  p{
    padding :20px;
 }
</style>

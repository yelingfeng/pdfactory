<template>
    <h1 v-text="msg"></h1>
    <div class="zlayoutCenterView" :style="styleObj">
        <Element id="abc" :max-num='1' :w='180' :h='180'  ></Element>
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
    import Toaster from "./Toaster"
    import {TestAction,loadModules} from "./../vuex/actions"
    import Utils  from "./../util/zUtil"
    import Element from "./Element"
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
                   
                }
                $("body").css({
                    "background":"#072E67 url(src/assets/image/zld-bg.jpg) no-repeat center 0",
                    "background-size":"cover"
                })

            },

            showToaster(type){
                this.TestAction("测试0001",type)
            }
        },
        components : {
            Element,
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

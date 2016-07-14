<template>
    <div class="zlayoutCenterView" :style="styleObj">

        <!-- <p>
            <button @click="showToaster('error')">error</button>
            <button @click="showToaster('warning')">waring</button>
            <button @click="showToaster('success')">success</button>
            <button @click="showToaster('info')">info</button>
        </p><element v-for="comp in gData.components" :options="comp" ></element>-->


        <element :options="a"></element>
    </div>
    <Toaster></Toaster>
    <Left></Left>
    <Right></Right>

</template>

<script>
    import $ from "jquery"
    import Toaster from "./Toaster"
    import {TestAction,loadModules} from "./../vuex/actions"
    import Utils  from "./../util/zUtil"
    import Right from './Right'
    import Left from "./Left"
    import element from "./BaseComponent"
    export default {
         data(){
             return {
                 msg : "产品工场",
                 styleObj : {
                     width : 0,
                     height : 0
                 },
                 a:{
                     type:"1"
                 }
             }
         },
        vuex : {

            getters : {
                gData : ({app}) => app.globalData
            },
            actions : {
                TestAction,loadModules
            }
         },
        ready(){
            this._init();
        },
        methods:{

            _init(){

//                this.loadModules();

                this.styleObj.width  = $(window).width() + "px";
                this.styleObj.height = $(window).height() + "px";
                var isOpacity = Utils.getUrlString("isOpacity");

                if(isOpacity && isOpacity == "1"){
                    $("body").css({
                        "background":"#072E67 url(image/zld-bg.jpg) no-repeat center 0",
                        "background-size":"cover"
                    })
                }

                $("body").addClass("bg-body")

            },

            showToaster(type){
                this.TestAction("测试0001",type)
            }
        },
        components : {
            element,
            Toaster,
            Left,
            Right
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

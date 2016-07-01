<template>
    <div class="zlayoutCenterView" :style="styleObj">
<<<<<<< HEAD

        <Element :eid="aaa" :max-num="1"></Element>
        <p>
            <button @click="showToaster('error')">error</button>
            <button @click="showToaster('warning')">waring</button>
            <button @click="showToaster('success')">success</button> 
            <button @click="showToaster('info')">info</button> 
        </p>
=======
        <element v-for="comp in gData.components" :options="comp" ></element>   
         
>>>>>>> 2478b67338341ec6f70ab6c50946332bfe2e4afb
    </div>
    <Toaster></Toaster>
          <Right></Right>

</template>

<script>
    import $ from "jquery"
    import Element from "./Element"
    import Toaster from "./Toaster"
    import {TestAction,loadModules} from "./../vuex/actions"
    import Utils  from "./../util/zUtil"
<<<<<<< HEAD
    import Right from './Right'
=======
    import element from "./BaseComponent"
>>>>>>> 2478b67338341ec6f70ab6c50946332bfe2e4afb
    export default {
         data(){
             return {
                 msg : "产品工场",
                 styleObj : {
                     width : 0,
                     height : 0
                 }
             }
<<<<<<< HEAD
         },
         vuex : {
=======
        },
        vuex : {

            getters : {
                gData : ({app}) => app.globalData
            },

>>>>>>> 2478b67338341ec6f70ab6c50946332bfe2e4afb
            actions : {
                TestAction,loadModules
            }
         },
        ready(){
            this._init();
        },
        methods:{

            _init(){

                this.loadModules();

<<<<<<< HEAD
                this.loadModules();
=======
                
>>>>>>> 2478b67338341ec6f70ab6c50946332bfe2e4afb

                this.styleObj.width  = $(window).width() + "px";
                this.styleObj.height = $(window).height() + "px";
                var isOpacity = Utils.getUrlString("isOpacity");

                if(isOpacity && isOpacity == "1"){
                    $("body").css({
                        "background":"#072E67 url(image/zld-bg.jpg) no-repeat center 0",
                        "background-size":"cover"
                    })
                }
<<<<<<< HEAD
=======
                $("body").addClass("bg-body")
>>>>>>> 2478b67338341ec6f70ab6c50946332bfe2e4afb

            },

            showToaster(type){
                this.TestAction("测试0001",type)
            }
        },
        components : {
<<<<<<< HEAD
            Element,
            Toaster,
            Right
=======
            element,
            Toaster
>>>>>>> 2478b67338341ec6f70ab6c50946332bfe2e4afb
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

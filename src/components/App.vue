<template>
    <div class="zlayoutCenterView" :style="styleObj">
        <box v-for="comp in gData.components" :options="comp"  ></box>
    </div>
    <!--<Toaster></Toaster>-->
</template>

<script>
import $ from "jquery"
import Toaster from "./Toaster"
import {TestAction,loadModules} from "./../vuex/actions"
import Utils  from "util/zUtil"
import Right from './Right'
import zParameter from "./zParameter"
import box from "./BaseComponent"
import Zlay from "core/Zlay"
import {isLoadSuccess} from "./../vuex/getters"
import RC from "util/ResourcesConfig"
export default {
     data(){
         return {
             styleObj : {
                 width : 0,
                 height : 0
             }
         }
     },
     vuex:{
        getters : {
            gData : ({app})=> app.globalData,
            isLoadSuccess
        },
        actions : {
            TestAction, loadModules
        }
    },

    ready(){
        this._init();

    },
    watch:{
        isLoadSuccess:function(){
            Zlay.common.loadTreeComponents(this.gData.pid2TreeComponents);
            Zlay.renderInit();
            this.bindResize();
        }
    },
    methods:{

        _init(){
            var me = this;
            this.styleObj.width = $(window).width() + "px";
            this.styleObj.height = $(window).height() + "px";
            $("body").addClass("bg-body")

            this.loadModules();
        },

        showToaster(type){
          this.TestAction("测试0001", type)
        },


        bindResize(){
            var layoutWin = () =>{
                var	ww = $(window).width(),
                    wh = $(window).height();
                $("#"+RC.VIEW_CENTER_ID).width(ww).height(wh);
                Zlay.resize();
            }
            $(window).resize(function(){
                layoutWin();
            });
            layoutWin();
        }
    },
  components:{
        box,Toaster
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
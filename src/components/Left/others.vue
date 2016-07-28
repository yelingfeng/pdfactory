<template>
   <strong class="nav_c_title">其他</strong>
   <div class="toolbar_text">
       <span v-for="value in otherFreg" href="javascript:;"  data-type="{{value.type}}" data-component="{{a}}" class="{{value.class}}" >{{value.name}}</span>
   </div>
</template>
<style>

</style>
<script>
    import RC from "../../util/ResourcesConfig";
    export default{
        data(){
            return{
                a: RC.A,
                otherFreg: [
 //                     	   {"name":"时间格式",type:"1", "class":"otherFreg_timeStl"},
                               {"name": "帮助", type: "2", "class": "otherFreg_helper"},
                               {name: "混合折线图A", type: '3', "class": "otherFreg_helper", title: "直连点特殊图表"},
                ]
            }
        }
    }
</script>
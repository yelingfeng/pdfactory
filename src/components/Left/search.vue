<template>
   <strong class="nav_c_title">查询</strong>
   <div class="toolbar_text">
   	 	<span v-for="value in search" href="javascript:;"  data-component="' + RC.ZCOMP_TYPE.SEARCH + '" class="{{value.class}}" data-secondtype="{{value.childType}}">{{value.name}}</span>
   </div>
</template>
<style>

</style>
<script>
    import RC from "../../util/ResourcesConfig";
    export default{
        data(){
            return {
                RC,
                search: [
                          {"name": "文本下拉框", "class": "sch_textSelect", childType: RC.Z_SEARCH_COMPONENT.SELECT},
                          {"name": "单选按钮", "class": "sch_simple", childType: RC.Z_SEARCH_COMPONENT.RADIO},
                          {"name": "开关按钮", "class": "sch_onOff", childType: RC.Z_SEARCH_COMPONENT.SWITCH_BTN},
                          {"name": "时间刻度", "class": "sch_time", childType: RC.Z_SEARCH_COMPONENT.TIME_PICKER},
                          {"name": "刻度", "class": "sch_time", childType: RC.Z_SEARCH_COMPONENT.TIMETYPE},
                          {"name": "日期时间", "class": "sch_time", childType: RC.Z_SEARCH_COMPONENT.TIMERANGE},
                          {"name": "提交按钮", "class": "sch_time", childType: RC.Z_SEARCH_COMPONENT.SUBMITBUTTON},
                ],
            }
        }
    }
</script>
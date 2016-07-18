<template>
   <strong class="nav_c_title">文本</strong>
   <div class="toolbar_text">
       <span v-for="value in text" class="{{value.className}}" data-component="' + RC.ZCOMP_TYPE.TEXT + '" data-type="{{value.type}}" data-secondtype="{{value.dataRel}}">{{value.name}}</span>
   </div>
</template>
<style>

</style>
<script>
    import RC from "../../util/ResourcesConfig";
    export default {
        data(){
            return {
                RC,
                text: [
                          {"name": "标题", type: RC.Z_TEXT_COMPONENT.TITLE_H1, className: "z_text_title_h1", dataRel: "0"},
                          {"name": "标题", type: RC.Z_TEXT_COMPONENT.TITLE_H2, className: "z_text_title_h2", dataRel: "0"},
                          {"name": "文本", type: RC.Z_TEXT_COMPONENT.TEXT_UNDER_NO, className: "z_text_under_no", dataRel: "1"},
                          {"name": "文本", type: RC.Z_TEXT_COMPONENT.TEXT_UNDER_YES, className: "z_text_under_yes", dataRel: "1"},
                          {"name": "标题13", type: RC.Z_TEXT_COMPONENT.TITLE_H13, className: "z_text_title_h13", dataRel: "0"},
                          {"name": "标题14", type: RC.Z_TEXT_COMPONENT.TITLE_H14, className: "z_text_title_h14", dataRel: "0"},
                          {"name": "标题", type: RC.Z_TEXT_COMPONENT.TITLE_HZL, className: "z_text_title_hZL", dataRel: "0"}
                ],
            }
        }
    }
</script>
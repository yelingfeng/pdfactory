<template>
   <strong class="nav_c_title">表格</strong>
   <div class="toolbar_text">
       <span v-for="value in table" class="{{value.className}}" data-component="' + RC.ZCOMP_TYPE.TABLE + '" data-type="{{value.type}}">{{value.name}}</span>
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
                table: [
                          {
                              "name": "表格",
                              type: "z_table_normal",
                              dataType: RC.ZCOMP_TYPE.TABLE,
                              className: "table_style tt_text_font"
                          },
                          {
                              "name": "表格(导出)",
                              type: "z_table_export",
                              dataType: RC.ZCOMP_TYPE.TABLE,
                              className: "table_style tt_text_font"
                          },
                          {
                              "name": "表格(分页)",
                              type: "z_table_page",
                              dataType: RC.ZCOMP_TYPE.TABLE,
                              className: "table_style tt_text_font"
                          },
                          {
                              "name": "表格(伸缩)",
                              type: "z_table_showHide",
                              dataType: RC.ZCOMP_TYPE.TABLE,
                              className: "table_style tt_text_font"
                          }
                ],
            }
        }
    }
</script>
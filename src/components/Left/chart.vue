<template>
   <strong class="nav_c_title">图表</strong>
   <ol>
       <li v-for="value in chart">
           <a href="javascript:;" class="chart_title">{{value.name}}</a>
           <div class="nav_list_con img_con">
               <span v-for="v in value.imgList"  class="hint--bottom" data-hint="{{v.title}}"><img :src="v.name | filter1"   data-category="{{v.chartStyle}}" data-secondtype="{{v.childType}}" data-component="{{ RC.ZCOMP_TYPE.CHART}}" data-type="{{v.type}}"></span>
           </div>
       </li>
   </ol>
</template>
<style>

</style>
<script>
    import RC from "../../util/ResourcesConfig";
    export default{
        data(){
            return {
                RC,
                chart: [
                    {
                        name: '重庆网安',
                        imgList: [
                            {
                                name: "8.png",
                                type: 'map',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq",
                                title: "重庆标记地图"
                            },
                            {
                                name: "8.png",
                                type: 'map',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq1",
                                title: "重庆染色地图"
                            },
                            {
                                name: "wordran.png",
                                type: 'map',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq2",
                                title: "世界染色地图"
                            },
                            {
                                name: "11.png",
                                type: 'line',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq1",
                                title: "重庆折线面积图"
                            },
                            {
                                name: "11.png",
                                type: 'line',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq2",
                                title: "重庆折线图"
                            },
                            {
                                name: "11.png",
                                type: 'line',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq3",
                                title: "单折线图"
                            },
                            {
                                name: "4.png",
                                type: 'bar',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq1",
                                title: "重庆横向柱图"
                            },
                            {
                                name: "4.png",
                                type: 'bar',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "cq2",
                                title: "重庆普通柱图"
                            },
                        ]

                    },

                    {
                        'name': "直连点", imgList: [
                        {name: "pie1.png", type: 'pie', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "zp1", title: "直连点饼图"},
                        {name: "pie2.png", type: 'pie', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "zp2", title: "直连点环图"},
                        {name: "11.png", type: 'line', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "5", title: "直连点折线图1"},
                        {name: "11.png", type: 'line', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "6", title: "直连点折线图2"},
                        {name: "11.png", type: 'line', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "7", title: "直连点折线面积图"},
                        {name: "4.png", type: 'bar', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "zb1", title: "直连点横向柱图"},
                        {name: "1.png", type: 'bar', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "zb2", title: "直连点普通柱图"},
                        {name: "8.png", type: 'map', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "wh", title: "直连点武汉地图"},
                        {
                            name: "11.png",
                            type: 'line',
                            chartStyle: RC.CHART_CATEGORY.ECHART,
                            childType: "z1",
                            title: "直连点上下折线图"
                        },
                        {
                            name: "11.png",
                            type: 'line',
                            chartStyle: RC.CHART_CATEGORY.ECHART,
                            childType: "z2",
                            title: "直连点上下折线面积图"
                        }
                    ]
                    },

                    {
                        'name': "柱状图", imgList: [
                        {name: "1.png", type: 'bar', chartStyle: RC.CHART_CATEGORY.FUSIONCHART, childType: "1", title: "3D柱状图"},
                        {
                            name: "2.png",
                            type: 'bar',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "2",
                            title: "3D柱状图2"
                        },
                        {
                            name: "4.png",
                            type: 'bar',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "3",
                            title: "3D横向柱图"
                        },
                        {name: "5.png", type: 'bar', chartStyle: RC.CHART_CATEGORY.FUSIONCHART, childType: "4", title: "正反条形图"},
                        {name: "5-1.png", type: 'bar', chartStyle: RC.CHART_CATEGORY.FUSIONCHART, childType: "5", title: "堆积图"},
                    ]
                    },
                    {
                        'name': "折线图", imgList: [
                        {
                            name: "11.png",
                            type: 'line',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "1",
                            title: "折线图1"
                        },
                        {
                            name: "10.png",
                            type: 'line',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "2",
                            title: "折线图2"
                        },
                        {
                            name: "13.png",
                            type: 'line',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "3",
                            title: "折线图3-zoomline"
                        },

                    ]
                    },
                    {
                        'name': "地图", imgList: [
                        {"name": "7.png", type: 'map', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "1", title: "地图"},
                        {"name": "8.png", type: 'map', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "2", title: "地图"},
                        {"name": "map_3.png", type: 'map', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "3", title: "迁徙地图"},
                        {"name": "map_4.png", type: 'map', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "4", title: "世界地图"},
                        {
                            "name": "wordran.png",
                            type: 'map',
                            chartStyle: RC.CHART_CATEGORY.ECHART,
                            childType: "5",
                            title: "世界地图染色图"
                        },
                        {"name": "xinjiang.png", type: 'map', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "xj", title: "新疆染色地图"},
                        {"name": "zhejiang.png", type: 'map', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "zj", title: "浙江染色地图"}
        //				  {"name":"map3d_flights.jpg",type:'map',chartStyle:RC.CHART_CATEGORY.ECHART,childType:"5",title:"3D世界地图"}
                    ]
                    },
                    {
                        'name': "饼图", imgList: [
                        {
                            "name": "6.png",
                            'type': 'pie',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "1",
                            title: "3D饼图"
                        },
                        {
                            "name": "pie5.png",
                            'type': 'pie',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "2",
                            title: "环形饼图"
                        },
                        {
                            "name": "pie4.png",
                            'type': 'pie',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "3",
                            title: "黑色字体3D饼图"
                        },
                    ]
                    },
        //		         {
        //		        	 "name" :"金字塔图",imgList :[
        //                      {name:"pyramid.png",type:'pyramid',chartStyle:RC.CHART_CATEGORY.FUSIONCHART,childType:"1",title:"金字塔图"},
        //		            ]
        //		         },
                    {
                        "name": "仪表盘", imgList: [
                        {name: "gauge.png", type: 'gauge', chartStyle: RC.CHART_CATEGORY.ECHART, childType: "1", title: "仪表盘"},
                    ]
                    },
                    {
                        "name": "条形图", imgList: [
                        {
                            name: "horizontal_1.png",
                            type: 'horizontal',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "1",
                            title: "条形图"
                        },
                    ]
                    },
                    {
                        "name": "热力图", imgList: [
                        {
                            name: "heatmap_1.png",
                            type: 'heatmap',
                            chartStyle: RC.CHART_CATEGORY.FUSIONCHART,
                            childType: "1",
                            title: "热力图"
                        },
                    ]
                    },
                    {
                        "name": "关系图",
                        imgList: [
                            {
                                name: "force_1.png",
                                type: 'force',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "1",
                                title: "关系图"
                            },
                            {
                                name: "force_2.png",
                                type: 'force',
                                chartStyle: RC.CHART_CATEGORY.ECHART,
                                childType: "2",
                                title: "状态图"
                            }
                        ]
                    }
                ]
            }
        },
        filters:{
            filter1:function(v){
               return "src/assets/image/graph_img/" + v
            }
        }
    }
</script>
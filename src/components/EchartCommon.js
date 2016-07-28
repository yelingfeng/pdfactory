/**
 * Created by yelingfeng on 2016/7/20.
 */
import $ from "jquery"
import _ from "lodash"
import RC from "util/ResourcesConfig"
import Utils from "util/zUtil"
import {cqGeoCoord,chinaGeoCoord,worldGeoCoord,worldName} from "assets/mapData/index"

var CQbackGroundColor = "rgba(0,0,0,0)";
/**
 * 替换datas里面 category和datas里的 xAxis替换成无数据
 * @param datas group返回的数据
 */
function replacexAxisName(datas){
    var category = datas.category;
    var series = datas.series;
    var empty ="无数据";
    var arr= [];
    if(category.length){
        category.forEach(function(it){
            if(it == "xAxis"){
                arr.push(empty);
            }else{
                arr.push(it);
            }
        })
    }
    if(series){
        series.forEach(function(it){
            if(it.name == "xAxis" ){
                it.name = empty;
            }
        });
    }
    datas.category = arr;
    datas.series = series
    return datas;
}


/**
 * 获得空chart 数据
 */
function getEmptyChartOption(type, options){
    var option ;
    options = options == null ? {} : options;
    var grapTextSize = Echarts.optionTmpl.getGrapText(options) || 12;
    var legend = Echarts.optionTmpl.getLegend(options);
    var showLegend, legendPositonX, legendPositonY;
    if(legend){
        showLegend = legend.showLegend;
        legendPositonX=legend.X  || 'right';
        legendPositonY=legend.Y || 'top';
    }

    //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
    var defaultYlName = '', defaultYlUnit = '', defaultYlUnit0 = '';;
    if(type == "zldline5"){
        defaultYlName = "速率";
        defaultYlUnit = "（Gbps）";
        defaultYlUnit0 = "Gbps";
    }else if(type == "zldline4"){
        defaultYlName = "流量";
        defaultYlUnit = "（GB）";
        defaultYlUnit0 = "GB";
    }

    var specialPros = Echarts.optionTmpl.getSpecialPros(option);
    if( specialPros ){
        var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  defaultYlUnit : "（"+specialPros.ylUnit+"）";
        var ylUnit0 = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  defaultYlUnit0 : specialPros.ylUnit;
        var yrUnit = specialPros.yrUnit == undefined || specialPros.yrUnit == "" ?  "（%）" : "（"+specialPros.yrUnit+"）";
        var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : "（"+specialPros.xUnit+"）";
        var ylName = specialPros.ylName || defaultYlName;
        var yrName = specialPros.yrName || "带宽利用率";
        var xName = specialPros.xName || "";
    }else{
        var ylUnit = defaultYlUnit;
        var ylUnit0 = defaultYlUnit0;
        var yrUnit = "（%）";
        var ylName = defaultYlName;
        var yrName = "带宽利用率";
        var xName = "";
        var xUnit = "";
    }

    // cq3折线图
    if( type =="cq3"){
        return propsUtil.getBaseLine(options);
    }

    // 直连点上下面积折线图
    else if(type == "zldline5"){
        var speedColor = "#ff8251";
        var usageColor = "#1fb9f7";
        option = {
            grid : {
                borderWidth :0,
                borderColor :'#fff'
            },
            tooltip : {
                trigger: 'axis',
                textStyle:{
                    fontSize : 12,
                    align:"left"
                }
            },
            legend: {
                show:showLegend,
                orient: 'horizontal',
                x: legendPositonX,
                y: legendPositonY,
                textStyle:{
                    color:"#ccc",
                    fontFamily : "Microsoft YaHei"
                },
                data: [
                    {
                        name:ylName + ylUnit,//'速率(Gbps)',
                        textStyle:{fontWeight:'bold', color:speedColor}
                    },
                    {
                        name:yrName + yrUnit,//'带宽利用率(%)',
                        textStyle:{fontWeight:'bold', color:usageColor}
                    }
                ]
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'white',
                            type: 'solid',
                            width: 1
                        }
                    },
                    axisTick: {onGap:false},
                    splitLine: {show:false},
                    data : ['无数据'],
                    axisLabel: {
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    }
                }
            ],
            yAxis : [
                {
                    name:ylName + ylUnit,//'速率(Gbps)',
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: speedColor,
                            type: 'solid',
                            width: 1
                        }
                    },
                    type : 'value',
                    scale:true,
                    splitNumber: 5,
                    boundaryGap: [0,0],
                    splitLine: {show:false},
                    axisLabel: {
                        formatter: function (v) {
                            return Math.abs(v)
                        },
                        textStyle : {
                            color: speedColor,
                            //fontSize : grapTextSize
                        }
                    },
                    min:-100,
                    max:100
                },
                {
                    name:yrName + yrUnit,//'带宽利用率(%)',
                    boundaryGap : false,
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: usageColor,
                            type: 'solid',
                            width: 1
                        }
                    },
                    type : 'value',
                    scale:true,
                    splitNumber: 5,
                    splitLine: {show:false},
                    boundaryGap: [0,0],
                    axisLabel: {
                        formatter: function (v) {
                            return Math.abs(v)
                        },
                        textStyle : {
                            color: usageColor
                        }
                    },
                    min:-100,
                    max:100
                }
            ],
            series : [
                {
                    name:ylName + ylUnit,//'速率(Gbps)',
                    type:'line',
                    yAxisIndex: 0,
                    symbol: 'none',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0]
                },
                {
                    name:yrName + yrUnit,//'带宽利用率(%)',
                    type:'line',
                    yAxisIndex: 1,
                    symbol: 'none',
                    smooth:true,
                    data:[0]
                },
                {
                    name:ylName + ylUnit,//'速率(Gbps)',
                    type:'line',
                    yAxisIndex: 0,
                    symbol: 'none',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0]
                },
                {
                    name:yrName + yrUnit,//'带宽利用率(%)',
                    type:'line',
                    yAxisIndex: 1,
                    symbol: 'none',
                    smooth:true,
                    data:[0]
                }
            ]
        };

    }
    else if(type == "zldline4"){
        option = {
            grid : {
                borderWidth :0,borderColor :'#fff',
                //y:40,y2:30,x2:20
            },
            tooltip : {
                trigger: 'axis',
                formatter: function (params,ticket) {
                    var res = params[0].name;
                    $.each(params,function(i,d){
                        var val = d.data == null ? 0 : d.data;
                        //res += "<br/>" + d.seriesName + "流量 :" + Math.abs(parseFloat(val)) + "GB";
                        res += "<br/>" + d.seriesName + ylName +" ：" + Math.abs(parseFloat(val)) + defaultYlUnit0;//"GB";
                    })
                    return res;
                },
                textStyle:{
                    fontSize : 12,
                    align:"left"
                }
            },
            legend: {
                show:showLegend,
                orient: 'horizontal',
                x: legendPositonX,
                y: legendPositonY,
                textStyle:{
                    color:"#ccc",
                    fontFamily : "Microsoft YaHei"
                },
                padding: [0, 70, 0, 0],
                data:[{
                    name:'流入',
                    textStyle:{fontWeight:'bold', color:'auto'}
                },
                    {
                        name:'流出',
                        textStyle:{fontWeight:'bold', color:'auto'}
                    }]
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    splitLine: {show:false},
                    axisLabel: {
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    },
                    data : ['无数据'],
                    boundaryGap:false,
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'white',
                            type: 'solid',
                            width: 1
                        }
                    }
                }
            ],
            yAxis : [
                {
                    name:ylName + ylUnit,//'流量(GB)',
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'white',
                            type: 'solid',
                            width: 2
                        }
                    },
                    type : 'value',
                    boundaryGap:false,
                    scale:true,
                    splitNumber: 5,
                    boundaryGap: [0,0.1],
                    splitLine: {show:false},
                    axisLabel: {
                        formatter: function (v) {
                            return Math.abs(v)
                        },
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    },
                    min:-100,
                    max:100
                }
            ],
            series : [
                {
                    name:'流入',
                    type:'line',
                    smooth:true,
                    data:['0']
                },
                {
                    name:'流出',
                    type:'line',
                    smooth:true,
                    data:['0']
                }
            ]
        }

    }
    else if(type == "zldbar2"){
        var ylName1 = ylName ? ylName : "连接成功率";
        var ylUnit1 = ylUnit ? ylUnit : "（%）";
        var ylUnit0 = ylUnit ? ylUnit : "%";

        var option = {
            grid : {
                borderWidth :0,
                borderColor :'#fff',
                x:65,
                y:30,
                y2:35,
                x2:35
            },
            legend: {
                show: showLegend,
                orient: 'horizontal',
                x: legendPositonX,
                y: legendPositonY,
                textStyle : {
                    color : "#ccc",
                    fontFamily : "Microsoft YaHei"
                },
                data :[]
            },
            tooltip : {
                trigger: 'axis',
                formatter:function(v){
                    var res = v[0].name + "<br/>";
                    res += ylName1+"："+ v[0].value + ylUnit0 +"<br/>";
                    return res;
                },
                textStyle:{
                    fontSize : 12,
                    align : "left",

                }
            },
            calculable : false,
            xAxis : [
                {
                    name:xName + xUnit,
                    type : 'category',
                    splitLine: {show:false},
                    axisLabel: {
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    },
                    splitLine : {show : false},
                    splitArea : {show : false},
                    data : ['无数据']//bars_dates.xAxis	  
                }
            ],
            yAxis: [{
                show:true,
                name:ylName + ylUnit,
                //name:unitNameY + "("+unit+")",
                type : 'value',
                splitLine: {show:false},
                axisLabel: {
                    textStyle : {
                        color : 'rgb(3, 167, 234)'
                        //fontSize : grapTextSize
                    }
                },
            }],
            //series: data[0]//bars_dates.series 
            series : [{
                type:'bar',
                data:[0]
            }]
        };
    }
    else if(type == "zldbar1"){
        var option = {
            tooltip : {
                show : false,
                trigger: 'item',
                axisPointer : {
                    type : 'none'
                }
            },
            legend: {
                show : false,
                data : []
            },
            grid : {
                borderWidth :0,
                borderColor :'#fff',
                x : 22,
                y : 30,
                y2 : 25
            },
            xAxis : [{
                name:'',
                axisLine : {    // 轴线
                    show: true,
                    lineStyle: {
                        color: 'white',
                        type: 'solid',
                        width: 0.5
                    }
                },
                type : 'value',
                axisLabel: {
                    formatter: function (v) {
                        return (1 * v).toFixed(2);
                    },
                    textStyle : {
                        color : 'rgb(3, 167, 234)'
                        //fontSize : grapTextSize
                    }
                },
                scale:true,
                splitLine : {
                    show : false
                },
                splitArea : {
                    show : false
                },
                data : ['无数据'],
                splitNumber: 10,
                boundaryGap: [0,0.1],
                splitLine: {show:false},
                min:0,
                max:100
            }],
            yAxis : [{
                type : 'category',
                axisLine : {    // 轴线
                    show: true,
                    lineStyle: {
                        color: 'white',
                        type: 'solid',
                        width: 0.5
                    }
                },
                boundaryGap : true,
                axisTick: {onGap:false},
                splitLine: {show:false},
                data : [' '],
                axisLabel: {
                    interval : 0,
                    textStyle : {
                        color : 'rgb(3, 167, 234)'
                        //fontSize : grapTextSize
                    }
                }
            }],
            series : [{
                type:'bar',
                data:[0]
            }]
        }
    }
    else if(type == "7"){
        var color1 = "#ff8251";
        var color2 = "#1fb9f7";
        var ylName1 = ylName ? ylName : "速率";
        var ylUnit1 = ylUnit ? ylUnit : "（Gbps）";
        var ylUnit0 = ylUnit ? ylUnit : "Gbps";
        var option = {
            color:[color1,color2],
            legend : {
                show: showLegend,
                data: [
                    {
                        name:ylName1,//legendName1,
                        textStyle:{
                            fontWeight:'bold',
                            color: color1
                        }
                    },
                    {
                        name:yrName,//legendName2,
                        textStyle:{
                            fontWeight:'bold',
                            color: color2
                        }
                    }
                ],
                orient: 'horizontal',
                x: legendPositonX || 'right',
                y: legendPositonY || 'top',
            },
            grid : {
                x2:60,
//                        y2:40,
                x:60,
//                        y:30,
                borderWidth:0
            },
            tooltip : {
                trigger: 'axis',
                formatter: function(params){
                    var str = params[0].name +"<br/>";
                    str +=ylName1 +"："+params[0].data+ ylUnit0 + "<br/>";
                    str +=yrName+"："+params[1].data+ yrUnit;
                    window._echart_line_hoverData_X = { xtime :params[0].name,name:params[0].name};
                    return str;
                },
                textStyle:{
                    fontSize : 12,
                    align : "left"
                }
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    splitLine: {
                        show:false,
                    },
                    data:['无数据'],//stackline_datas.xAxis,
                    axisLabel : {
                        textStyle : {
                            color : '#fff'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    name: ylName1,//legendName1,
                    type : 'value',
                    splitLine: {
                        show:false,
                    },
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: color1,
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            color : color1,
                            //fontSize : grapTextSize
                        }
                    }
                },
                {
                    name: yrName,//legendName2,
                    type : 'value',
                    splitLine: {
                        show:false,
                    },
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: color2,
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            color : color2
                        }
                    },
                    max: 100,
                    min : 0
                }
            ],
            series : [
                {
                    name:ylName + ylUnit,//'速率(Gbps)',
                    type:'line',
                    yAxisIndex: 0,
                    symbol: 'none',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0]
                },
                {
                    name:yrName + yrUnit,//'带宽利用率(%)',
                    type:'line',
                    yAxisIndex: 1,
                    symbol: 'none',
                    smooth:true,
                    data:[0]
                }
            ]//stackline_datas.series
        };
    }
    else if(type == "6"){
        var ylName1 = ylName ? ylName : "流量";
        var ylUnit1 = ylUnit ? ylUnit : "（GB）";
        var ylUnittip = ylUnit ? ylUnit : "GB";
        var option = {
            legend : {
                show : showLegend,
                x : legendPositonX,
                y : legendPositonY,
                data : [0]//stackline_datas.category
            },
            grid : {
                x2:60,
                y2:40,
                x:60,
                y:30,
                borderWidth: 1
            },
            tooltip : {
                trigger: 'axis',
                formatter: function(params){
                    window._echart_line_hoverData_X = { xtime :params[0].name,name:params[0].name};
                    var unit = params[0].seriesName.substring(params[0].seriesName.indexOf("（")+1,params[0].seriesName.indexOf("）"));
                    var res = params[0].name + '<br/>'
                        + params[0].seriesName.substring(0,params[0].seriesName.indexOf("（")) + ': ' + params[0].value+ylUnittip;//unit;
                    /*+ params[0].seriesName.substring(0,params[0].seriesName.indexOf("(")) + '：' + params[0].value+ylUnit1;//unit;*/

                    return res;


                },
                textStyle:{
                    fontSize : 12,
                    align : "left"
                }
            },
            xAxis : [
                {
                    //name: xName + xUnit, //'占比(%)',
                    type : 'category',
                    boundaryGap : false,
                    splitLine: {
                        show:true,
                        lineStyle:{
                            type : 'dashed'
                        }
                    },
                    data:["无数据"],//stackline_datas.xAxis,
                    axisLabel : {
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    name:ylName1 + ylUnit1,//'流量(GB)',
                    type : 'value',
                    splitLine: {
                        show:true,
                        lineStyle:{
                            type : 'dashed'
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    }
                }
            ],
            series : [
                {
                    name:'流量（GB）',
                    type:'line',
                    smooth:true,
                    data:[0]
                }
            ]
        };
    }
    else if(type == "5"){
        var ylName1 = ylName ? ylName : "占比";
        var ylUnit1 = ylUnit ? ylUnit : "（%）";
        var ylUnit0 = ylUnit ? ylUnit : "%";
        var option = {
            legend : {
                show : showLegend,
                x : legendPositonX,
                y : legendPositonY,
                data : [0],
                textStyle:{
                    color : "#fff",
                    fontFamily : "Microsoft YaHei"
                }
            } ,
            series : [{
                type : 'line',
                data : [0]
            }],
            grid : {
                borderWidth :0,
                borderColor :'#fff',
                x2 : 10,
                y2 : 25
            },
            tooltip : {
                trigger: 'axis',
                textStyle : {
                    fontSize : "12",
                    align:"left"
                },
                formatter : function(v){
                    var content = v[0].name + '<br/>';
                    content += ylName1  + " ： " + v[0].value +ylUnit0;
                    return content;
                }
            },
            xAxis : [ {
                type : 'category',
                axisLine : {    // 轴线
                    show: true,
                    lineStyle: {
                        color: 'white',
                        type: 'solid',
                        width: 2
                    }
                },
                boundaryGap : false,
                axisTick: {onGap:false},
                splitLine: {show:false},
                data : ['无数据'],//stackline_datas.xAxis,
                axisLabel: {
                    textStyle : {
                        color : 'rgb(3, 167, 234)'
                    }
                }
            }
            ],
            yAxis : [
                {
                    name: ylName1 + ylUnit1, //'占比(%)',
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'white',
                            type: 'solid',
                            width: 2
                        }
                    },
                    type : 'value',
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(2) + '%';
                        },
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize 
                        }
                    },
                    scale:true,
                    splitNumber: 10,
                    boundaryGap: [0,0],
                    splitLine: {show:false},
                    min:0,
                    max:100
                }
            ]
        }
    }

    return option;

}

/**
 * 获取地图range
 */
//TODO
function getRangeOption(data){
    var dataRange ={};
    var arr = [];
    var max,min;
    var range;
    if(data && data.length){
        range = Utils.getMaxmin(data);
        max = range.max;
        min = range.min;
    }else{
        min = 0;
        max = 100;
    }

//			var d = Math.round(max / 5);
//			var sNum = Math.round(max * 3 / 4);
//			var hNum = Math.round(max / 2 );

//			var splitList = [];
//			splitList.push({start: max ,end:max-d,label:""});
//			splitList.push({start: max-d,end:sNum,label:""});
//			splitList.push({start: sNum,end:hNum,label:""});
//			splitList.push({start: hNum,end:d,label:""});
//			splitList.push({start: d,end:min,label:""});
//			splitList.push({end: min,label:""});
//			console.log(splitList);
//			//#ff0000 ; 橙：#ff5200 ; 浅橙：#ffcf00； 黄绿：#c7ff09  浅绿：#53ff1f ；绿色：#01ff2f
//
//			dataRange.splitList = splitList;
//			dataRange.color =["#f15d5e","#ffcf00","#ffc442","#71c524","#53ff1f"];//"#6baa01"


//			dataRange.color =['#ff3232', '#ff6c18', '#ffa500','#ffd900','#fffedf'];//"#6baa01"
//			dataRange.color =["#008ee4","#9b59b6","#6baa01","#f15d5e","#f8bd19"];
    dataRange.color =['#ff0100', '#ffa800', '#ffff00', '#14c8ec'];

    dataRange.show = true;
    dataRange.splitNumber = 4;
    dataRange.formatter = function(x){
        var f_x = parseFloat(x);
        if (isNaN(f_x)){
            return false;
        }
        f_x = Math.round(f_x *100)/100;
        return f_x;
    }
    dataRange.calculable =true;
    dataRange.max  = max;
    dataRange.min = min;
    dataRange.textStyle ={color: "#ffffff"};

    return dataRange;
}



/**
 * 获取空圈大小值的方法
 * @param v 当前值
 * @param maxmin 整体值
 */
function getMakerEmptyCircleV(v,maxmin){
    var config = {
        max : 50,
        min : 10
    }
    var min = maxmin.min;
    var max = maxmin.max;
    if(v > config.max){
        v = Math.round( parseFloat(v /max  )* config.max);
    }

    if( v < config.min){
        v = 10 + v*2;
    }
    v = parseInt(v,10);

    return v;
}

var Echarts = {
    /**
     * [config description]
     * @param  {[type]} container [echarts要渲染图表的容器]
     * @param  {[type]} option    [配置项]
     * @return {[type]}           [description]
     */
    config : function(container, option){
        this.option = { chart: {}, option: option, container: container };
        return this.option;
    },

    /**
     * Result1=[{name:XXX,value:XXX},{name:XXX,value:XXX}….]
     *
     *	Result2=[{name:XXX,group:XXX,value:XXX},{name:XXX,group:XXX,value:XXX]
		 * [dataFormat description]
     * @return {[type]} [description]
     */
    dataFormat : {

        // 格式化没有分组类型的图标 Result1
        noGroupData : function(data) {
            var categories = [];

            var datas = [];

            for (var i = 0; i < data.length; i++) {

                categories.push(data[i].name || "");

                datas.push({ name: data[i].name, value: data[i].value || 0 });

            }

            return { category: categories, data: datas };
        },

        //data的格式如上的Result2，type为要渲染的图表类型：可以为line，bar，
        //is_stack表示为是否是堆积图，这种格式的数据多用于展示多条折线图、分组的柱图  
        groupData: function (data, type, is_stack) {
            var emptyData = {category: [], xAxis: [],series:[]};
            if(data == null || (data.length== 1 &&data[0].name == "" ) ){
                return emptyData;
            }

            var chart_type = 'line';
            if (type)
                chart_type = type || 'line';


            var mapType = "china";
            if(chart_type == "map"){
                mapType = is_stack;
            }
            var xAxis = [];
            var group = [];
            var series = [];
            var isBizxAxis = false;


            // 与后台业务约定的 如果category是xAxis，则把xAxis的name当xAxis数据 否则正常 
            var xAxisArr = _.chain(data)
                .filter(function(data){
                    return data.category =="xAxis";
                })
                .map(function(it){
                    return it.name;
                })
                .value();
            // 存在固定横轴坐标系
            if(xAxisArr.length > 0){
                isBizxAxis = true;
                var groupKey = {};
                xAxis = xAxisArr;
                group = _.chain(data)
                    .filter(function(it){
                        return it.category != "" && it.category !=null && it.category !="xAxis" ;
                    })
                    .map(function(it){
                        return it.category;
                    })
                    .uniq()
                    .value();

                if(group.length==0){
                    group.push("xAxis");
                }

                var xKeys = {};
                xAxisArr.forEach(function(it){
                    xKeys[it.name] = 1;
                });
            }else{

                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < xAxis.length && xAxis[j] != data[i].name; j++);
                    if (j == xAxis.length)
                        xAxis.push(data[i].name);

                    for (var k = 0; k < group.length && group[k] != data[i].category; k++);
                    if (k == group.length )
                        group.push(data[i].category);
                }

            }
            // 查询找指定组内 是否有指定x坐标的值
            function lookGroupValue(groupName , xAxis){
                var val = _.chain(data).filter(function(it){
                    return it.name == xAxis  && it.category !=null && it.category == groupName
                }).map(function(data){
                    return data.value;
                }).toString();

                return val;
            }


            for (var i = 0; i < group.length; i++) {
                var temp = [];

                //是否业务自己控制x轴
                if(isBizxAxis){
                    xAxis.forEach(function(x){
                        var val = lookGroupValue(group[i],x);
                        if(val == ""){
                            temp.push(0);
                        }else{
                            temp.push(val);
                        }

                    });

                }else{
                    for (var j = 0; j < data.length; j++) {
                        if (group[i] == data[j].category) {
                            if (type == "map") {
                                temp.push({ name: data[j].name, value: data[j].value, dataObj:data[j],tooltip : {
                                    formatter: data[j].info
                                }});
                            }
                            else {
                                temp.push(data[j].value);
                            }
                        }
                    }
                }



                switch (type) {

                    // 柱形图 	  
                    case 'bar':
                        var series_temp = { name: group[i], data: temp, type: chart_type };
                        if (is_stack)
                            series_temp = $.extend({}, { stack: 'stack' }, series_temp);
                        break;

                    // 地图  
                    case 'map':

                        var series_temp = {
                            type: 'map',
                            mapType : mapType,
                            //selectedMode: 'single',
                            itemStyle:{
                                normal:{label:{show:true},
                                    borderColor:'#008FBF',
                                    borderWidth:1,
                                    areaStyle:{
                                        color: '#00AFFE'
                                    },
                                    textStyle:{
                                        fontSize :12
                                    }},
                                emphasis:{
                                    label:{
                                        show:true,
                                    },
                                    color : "rgba(235, 200, 5,0.7)"
                                }
                            },
                            data: temp
                        };
                        break;

                    // 折线图 	  
                    case 'line':

                        var series_temp = { name: group[i], data: temp, type: chart_type };
                        if (is_stack)
                            series_temp = $.extend({}, {
                                stack: 'stack',
                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                smooth:true

                            }, series_temp);
                        break;
                    default:

                        var series_temp = { name: group[i], data: temp, type: chart_type };

                }

                series.push(series_temp);


            }

            return { category: group, xAxis: xAxis, series: series };

        },
        // 处理迁徙地图 后台数据 转换成 ECHART识别的数据
        filterMapData : function(data){
            if(data && data.length){

                var legendKey = {};
                data.forEach(function(row){
                    legendKey[row.legend] = 1;
                });

                var dataSource= [];
                for(var legend in legendKey){
                    var obj = {};
                    obj.legend = legend;
                    var _data = [];
                    var _point = [];
                    data.forEach(function(row){
                        if(row.legend == legend){
                            var __data = [];
                            // 起点
                            __data.push({
                                name : row.name,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        lineStyle: {
                                            width : row.lineType || "1"
                                        }
                                    },
                                    emphasis:{
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: true,
                                        }
                                    }
                                }
                            });
                            var targetObj = {name : row.targetname,	value : row.value ,
//	        							tooltip : {
//	        								formatter : function(params){
//	        									var str = row.name + " -> " + row.targetname ;
//	        									str += "<br/>" + row.info
//		        								return str;
//		        							}
//	        							},
                            };
                            // 目标
                            __data.push(targetObj);
                            _data.push(__data);
                            // 目标点
                            _point.push(targetObj);
                        }
                    });
                    obj.data = _data;
                    obj.point = _point;
                    dataSource.push(obj);
                }
                return dataSource;
            }


        },

        /**
         * 设置底层地图格式
         * @param option
         */
        getGaData : function(option){

            var Garr = [];
            var GData ;

            if(option.data){
                option.data.forEach(function(it){
                    it.data.forEach(function(d){
                        Garr.push(d);
                    });
                });

                GData = {
                    type: 'map',
                    roam: option.roam || false,
                    nameMap : option.nameMap,
                    mapType: option.mapType,
                    hoverable: false,
                    itemStyle:{
                        normal:{
                            borderColor:'#008FBF',
                            borderWidth:1,
                            areaStyle:{
                                color: '#00AFFE'
                            },
                            textStyle:{
                                fontSize :12
                            }
                        }
                    },
                    data : [],
                    markLine : {
                        smooth:true,
                        symbol: ['none', 'circle'],
                        symbolSize : 1,
                        itemStyle : {
                            normal: {
                                color:'#fff',
                                borderWidth:1,
                                textStyle:{
                                    fontSize :12
                                },
                                borderColor:'#008FBF'
                            }
                        },
                        data : Garr
                    },
                    geoCoord:option.geoCoord
                };
            }

            return GData;
        },
        // 格式化世界地图
        ftWorld :function(data){
            var data = this.filterMapData(data);
            var GData = this.getGaData({
                mapType :"world",
                nameMap : worldName,
                data : data,
                geoCoord : worldGeoCoord
            });

            var legendData = [];
            var series = [];

            series.push(GData);

            var maxmin = Echarts.getMaxMin(data);

            if(data !=null && data.length){
                data.forEach(function(it){
                    legendData.push(it.legend);
                    var option= {
                        name: it.legend,
                        type: 'map',
                        mapType: 'world',
                        data:[],
                        visualMap:{
                            inRange: {
                                color: ['lightblue']
                            }
                        },
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    },
                                }
                            },
                            data : it.data
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                var v=  getMakerEmptyCircleV(v,maxmin);
                                return v;
                            },
                            effect : {
                                show: true,
                                scaleSize : 0.5,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                },
                                emphasis: {
                                    label:{position:'top'}
                                }
                            },
                            data : it.point
                        }
                    }
                    series.push(option);
                });

                return { legend: legendData, series:series};
            }
        },

        //TODO
        /**
         * 格式化关系图
         * @param data
         */
        ftForce : function(data,op){

            var type = op.type;
            var wh = op.wh;

            // 力导向关系图 Util类
            var common = (function(me){
                return me = {
                    // 获取imageUrl 
                    getImageUrl : function(type){
                        var imgURl ="image://image/";
                        switch(type){
                            case "0": imgURl += "Home_Server_72px.png";break;
                            case "1": imgURl += "computer_48px_.png";break;
                            case "2": imgURl += "adminGreen.png";break;
                            case "3": imgURl += "admin4.png";break;
                            default:break;
                        }
                        return imgURl;
                    },
                    // 获取imageUrl 
                    getImageUrlByStatus : function(status){
                        var imgURl ="image://image/";
                        switch(status){
                            case "0": imgURl += "green.png";break;
                            case "1": imgURl += "red.png";break;
                            default:break;
                        }
                        return imgURl;
                    },

                    // 构建数据项   
                    buildOption: function(op){
                        var option;
                        if(type == 1){
                            option = {
                                tooltip : {
                                    trigger: 'item',
                                    formatter: '{b}',
                                    enterable: true,
                                    textStyle:{
                                        fontSize :12
                                    }
                                },
                                toolbox: {
                                    show : false,
                                    feature : {
                                        restore : {show: true},
                                        // magicType: {show: true, type: ['force', 'chord']}                    
                                    }
                                },
                                legend: {
                                    show : false,
                                    x: 'left',
                                    data:['1','2','3']
                                },
                                series : [
                                    {
                                        type:'force',
                                        ribbonType: false,
                                        center:["50%","50%"],
                                        categories : [
                                            {
                                                name: '1'
                                            } ,
                                            {
                                                name: '2'
                                            },
                                            {
                                                name: '3'
                                            }
                                        ],
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: true,
                                                    textStyle: {
                                                        color: '#fff'
                                                    }
                                                },
                                                nodeStyle : {
//	  	                                                brushType : 'both',
//	  	                                                borderColor : 'rgba(255,215,0,0.4)',
//	  	                                                borderWidth : 1
                                                }
                                            },
                                            emphasis: {
                                                label: {
                                                    show: false
                                                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                                                },
                                                nodeStyle : {
                                                    //r: 30
                                                },
                                                linkStyle : {}
                                            }
                                        },

                                        minRadius : 2,
                                        maxRadius : 10,
                                        linkSymbol : 'arrow',//arrow  'circle', 'rectangle', 'triangle', 'diamond',  'emptyCircle', 'emptyRectangle', 'emptyTriangle', 'emptyDiamond' 
                                        gravity: 0.2,
                                        scaling: 1.1,
                                        draggable: false,
                                        steps: 10,
                                        useWorker:true,
                                        coolDown: 0.9,
                                        nodes:op.nodes,
                                        links : op.links
                                    }]
                            };


                        }else if(type ==2){
                            option = {
                                tooltip : {
                                    trigger: 'item',
                                    formatter: '{a} : {b}',
                                    position : function(p) {
                                        return [p[0] + 10, p[1] - 20];
                                    },
                                    enterable: true,
                                    textStyle:{
                                        fontSize :12
                                    }
                                },
                                legend: {
                                    show : false,
                                    x: 'left',
                                    data:['1','2','3']
                                },
                                series : [
                                    {
                                        type:'force',
                                        ribbonType: false,
                                        center:["50%","50%"],
//	  	                                    categories : [
//	  	                                      {
//	  	                                          name: '1'
//	  	                                      } ,
//	  	                                      {
//	  	                                          name: '2'
//	  	                                      },
//	  	                                      {
//	  	                                          name: '3'
//	  	                                      } 
//	  	                                    ],
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: true,
                                                    textStyle: {
                                                        color: '#fff'
                                                    }
                                                },
                                                nodeStyle : {
                                                    brushType : 'both',
                                                    borderColor : 'rgba(255,215,0,0.4)',
                                                    borderWidth : 1
                                                }
                                            },
                                            emphasis: {
                                                label: {
                                                    show: false
                                                }
                                            }
                                        },
                                        linkSymbol : 'none',//arrow
                                        draggable: true,
                                        nodes:op.nodes,
                                        links : op.links
                                    }]
                            };

                        }


                        return option;
                    },

                    // 处理树形结构数据	
                    handlerTreeData : function(data){
                        var root = {};
                        root.child = [];
                        if(data && data.length){
                            data.forEach(function(it){
                                if(it.pid == null || it.pid == ''){
                                    root = it;
                                }
                            });
                        }
                        getNode(root);


                        function getNode(pnode){
                            data.forEach(function(it){
                                if(pnode.id!=="" && it.id!=="" &&it.pid == pnode.id && it.pid !=null ){
                                    var child = pnode.child || [];
                                    child.push(it);
                                    pnode.child = child;
                                    getNode(it);
                                }
                            });
                        }

                        return root;

                    },


                    // 格式化数据
                    formatData : function(data){

                        var DATA = me.handlerTreeData(data);

                        var nodes = [];
                        var links = [];
                        var constMaxDepth = 2;

                        function createNode(node,depth,isRoot) {
                            var obj = {
                                name : node.name,
                                label : "",
                                value : node.value,
                                relname : node.relname,
                                id : node.id,
                                depth : depth,
                                draggable: false,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            position: 'bottom',
                                            textStyle: {
                                                color: '#ffffff'
                                            }
                                        }
                                    }
                                },
                                tooltip : {
                                    formatter: function(){
                                        return node.info || node.name;
                                    },
                                    textStyle:{
                                        fontSize :12
                                    }
                                },
                                //initial : [0, 0],
                                //initial : node.xy,
                                child : node.child,
                                category : depth
                            }
                            if(node.phototype!==undefined){
                                obj.symbol = me.getImageUrl(node.phototype);
                                obj.symbolSize = isRoot ?  [25, 25] : [14, 14];
                            }
                            return obj;
                        }

                        function forceMockThreeData(node) {
                            var depth = 0;
                            var rootNode = createNode(node,0,true);

                            nodes.push(rootNode);
                            mock(rootNode, 0);

                            function mock(parentNode, depth) {
                                var nChildren = parentNode.child || [];
                                nChildren.forEach(function(node){
                                    var childNode = createNode(node,depth,false);
                                    nodes.push(childNode);
                                    links.push({
                                        source : parentNode.name,
                                        target : childNode.name,
                                        weight : 1 ,
                                        name : childNode.relname,
                                        itemStyle: {
                                            normal: {
                                                width: 1,
                                                color: '#cccccc'
                                            }
                                        }
                                    });
                                    if (depth < constMaxDepth) {
                                        mock(childNode, depth + 1);
                                    }
                                })
                            }
                        }

                        forceMockThreeData(DATA);
                        return {nodes:nodes,links:links};

                    },
                    // 格式化数据
                    formatDataType : function(data){
                        var w = wh.w;
                        var h = wh.h;
                        var _w = 45;
                        var _h = 45;
                        var n = parseInt(Math.floor(w / _w),10);
                        var m = parseInt(Math.floor(h / _h),10);

                        data = unique(data);

                        for(var k in data){
                            var index = parseInt(k)+1;
                            var y_d = parseInt(Math.ceil(index / n),10);  //Y轴深度
                            //y_d = y_d > 0 ? y_d-1:y_d;
                            y_d = y_d - 1;
                            var x_d = parseInt(k) % n; //X轴深度
                            var x = x_d * _w + 50;
                            var y = y_d * _h + 30;
                            data[k].xy = [x,y];
                        }

                        var nodes = [];

                        function unique(arr){

                            var res = [];
                            var json = {};

                            for(var i = 0; i < arr.length; i++){

                                if(!json[arr[i].name]){
                                    res.push(arr[i]);
                                    json[arr[i].name] = 1;
                                }
                            }
                            return res;
                        };

                        function createNode(node,depth,isRoot,i) {
                            //console.log(node.xy);
                            var obj = {
                                name : node.name,
                                label : '',
                                value : node.value,
                                id : node.id,
                                depth : depth,
                                draggable: false,
                                relname : node.relname,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            position: 'bottom',
                                            textStyle: {
                                                color: '#ffffff'
                                            }
                                        }
                                    }
                                },
                                tooltip : {
                                    formatter: node.info
                                },
                                //initial : [0, 0],
                                initial : node.xy,
                                child : node.child,
                                category : depth,
                                fixY : true,
                                fixX : true
                            }
                            if(node.status !== undefined){
                                obj.symbol = me.getImageUrlByStatus(node.status);
                                obj.symbolSize = [20, 20];
                            }

                            return obj;
                        }

                        function forceMockThreeData2(data){
                            var depth = 0;
                            data.forEach(function(node,i){
                                var childNode = createNode(node,depth,false,i);
                                nodes.push(childNode);
                            });
                        }

                        forceMockThreeData2(data);
                        return {nodes:nodes,links:[]};

                    },
                    initforce : function(data,fn){
                        if(type == 2){
                            var option = me.buildOption(me.formatDataType(data))
                        }else{
                            var option = me.buildOption(me.formatData(data));
                        }

                        return option;
                    }

                };

            })();

            return common.initforce(data);
        },
        //TODO
        // 格式化迁徙地图数据
        ftQianXi : function(data){
            var data = this.filterMapData(data);

            var GData = this.getGaData({
                mapType :"china",
                data : data,
                geoCoord :chinaGeoCoord
            });

            var legendData = [];
            var series = [];
            //TODO
            series.push(GData);

            var maxmin = Echarts.getMaxMin(data);


            if(data !=null && data.length){
                data.forEach(function(it){
                    legendData.push(it.legend);
                    var option= {
                        name: it.legend,
                        type: 'map',
                        mapType: 'china',
                        data:[],
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : it.data
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                var v=  getMakerEmptyCircleV(v,maxmin);
                                return v;
                            },
                            effect : {
                                show: true,
                                scaleSize : 1,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                },
                                emphasis: {
                                    label:{position:'top'}
                                }
                            },
                            data : it.point
                        }
                    }
                    series.push(option);
                });

                return { legend: legendData, series:series};
            }


        }

    },
    optionTmpl :{

        // 通用图表基本配置
        base : {
            tooltip: {
                trigger: 'axis'//tooltip触发方式:axis以X轴线触发,item以每一个数据项触发	  
            },
            toolbox: {
                show: false, //是否显示工具栏  	  
                feature: {
                    dataView: { readOnly: true,show: true }, //数据预览  	  
                    restore:  {show: true}, //复原  
                    saveAsImage: {show: true}, //是否保存图片  
                    mark: {show : true},
                }
            }
        },

        //通用的折线图表的基本配置
        lineOption: {
            tooltip: {
                trigger: 'axis'//tooltip触发方式:axis以X轴线触发,item以每一个数据项触发	  
            },
            toolbox: {
                show: false, //是否显示工具栏  	  
                feature: {
                    dataView: { readOnly: false,show: true }, //数据预览  	  
                    restore:  {show: true}, //复原  
                    saveAsImage: {show: true}, //是否保存图片  
                    mark: {show : true},
                    magicType: {show: true, type: ['line', 'bar']}//支持柱形图和折线图的切换  	  
                }
            }
        },
        //TODO
        mapOption : {
            tooltip : {
                trigger: 'item',
//			        formatter: '{b}:{c}',
                position : function(p) {
                    // 位置回调
                    // console.log && console.log(p);
                    return [p[0] + 10, p[1] - 35];
                },
                textStyle:{
                    fontSize :12
                },
                enterable: true,
                trigger: 'item',
                formatter: function(params, ticket, callback){
                    var str ="";
                    var name = params.name;
                    var value = params.value;
                    if(value!=""){
                        str = name ;
                    }
                    if(str.indexOf("-")>-1){
                        str = str.substring(0, str.indexOf("-")-1);
                    }
                    return str;
                }
            },
            toolbox: {
                show:false, //是否显示工具栏  ,
                color : ["#ffffff"],
                textStyle : {
                    color : "#ffffff"
                },
                feature: {
                    dataView: { readOnly: false,show: false }, //数据预览  	  
                    restore:  { show: false}, //复原  
                    saveAsImage: {show: true}, //是否保存图片  
                    mark: {show : false},
                }
            }
        },

        // 
        /**
         * [Pie 饼图]
         * @param {[type]} data [description]
         * @param {[type]} title [description]
         *
         */
        //TODO
        Pie: function (data, opt) {//data:数据格式：{name：xxx,value:xxx}...

            var me = this;
            var showPiePercent = me.getPieShowPercent(opt);
            var grapTextSize = me.getGrapText(opt) || 12;
            var legend = me.getLegend(opt);
            var showLegend, legendPositonX, legendPositonY;
            if(legend){
                showLegend = legend.showLegend || false;
                legendPositonX=legend.X  || 'left';
                legendPositonY=legend.Y || 'top';
            }


            if(data == null || data == undefined ||data.length == 0){
                return {};
            }

            if(data.length == 1 && data[0].value == "" ){

                var _emptyOP = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params){
                            //"{b}<br/>{a} ：{c}GB<br/>占比  ：{d}%",
                            var str = params.name;
                            str +="<br/>";
                            //str += params.seriesName + "："+params.value +"GB";
                            str +="<br/>";
                            //str += "占比："+params.percent + "%";
                            return str;
                        },

                        textStyle : {
                            fontSize :12,
                            align : "left"
                        }
                    },
                    series: [
                        {
                            name:"流量",
                            type:'pie',
                            radius : '50%',
                            center: ['45%', '50%'],
                            data: [{value:360,name:'无数据'}]
                        }
                    ]
                };

                return _emptyOP;
            }


            var props = opt.chartStyle ;
            var chartType = opt.childType;

            // 直连点饼图01
            if(chartType == "zp1"){
                var pieList = [];
                var pieShowPercent = showPiePercent;

                var totalValue = 0 ;
                var lengthArr = [];
                data.forEach(function(it){
                    if(it.name!=""){
                        totalValue += parseFloat(it.value);
                        lengthArr.push(it.name);
                    }
                });
                data.forEach(function(it){
                    if(it.name!=""){
                        pieList.push({
                            name:it.name,
                            value:parseFloat(it.value),
                            info:it.info,
                            itemStyle:{
                                normal:{
                                    label:{
                                        textStyle : {
                                            //fontSize: grapTextSize,
                                        },
                                        show:(function(){
                                            if(parseFloat(it.value)/totalValue>pieShowPercent)
                                                return true;
                                            else
                                                return false;
                                        })()
                                    },
                                    labelLine:{
                                        length:0,
                                        show:(function(){
                                            if(parseFloat(it.value)/totalValue>pieShowPercent)
                                                return true;
                                            else
                                                return false;
                                        })()
                                    }
                                }
                            }
                        });
                    }
                });
                var colorV1 = [
                    "#1e90ff",
                    "#e9573f",
                    "#fa9f44",
                    "#e4d33b",
                    "#8cc152",
                    "#94d9f2",
                    "#967adc",
                    "#de8c71",
                    "#48cfad",
                    "#fde2aa",
                    "#ec87c0",
                    "#cdcbfc",
                    "#00a4cc",
                    "#de59d1",
                    "#43a08d"
                ];
                var pieOpts = {
                    color : props.colorArr ? props.colorArr : colorV1,

                    legend: {
                        show:showLegend,
                        orient : 'vertical',
                        x: legendPositonX,
                        y: legendPositonY,
                        // x:  opt.legendPosition ? opt.legenPosition : 'right',
                        //show : props.showLegend ? props.showLegend : false,
                        data :lengthArr,
                        selectedMode : false,
                        textStyle : {
                            color:"#ccc",
                            fontFamily : "Microsoft YaHei"
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: function(params){
                            //"{b}<br/>{a} ：{c}GB<br/>占比  ：{d}%",
                            var info = params.data.info;
                            if(info){
                                return info;
                            }else{
                                return params.name + "<br/>" + params.value;
                            }
                        },
                        textStyle : {
                            fontSize :12,
                            align : "left"
                        }
                    },
                    series : [
                        {
                            name:"流量",
                            type:'pie',
                            radius : '50%',
                            center: ['45%', '50%'],
                            data:pieList
                        }
                    ]
                };

                return pieOpts;

            }
            // 环形饼图
            else if(chartType == "zp2"){
                var legend = {
                    orient : 'vertical',
                    show : showLegend,
                    x: legendPositonX,
                    //show : opt.showLegend ?  opt.showLegend : true,
                    //x:  opt.legendPosition ? opt.legenPosition : 'right',  
                    y : legendPositonY || 30,
                    data : [],
                    textStyle : {
                        color:"#fff",
                        fontFamily : "Microsoft YaHei"
                    }
                }
                var series = [];
                var seriesObj = {};
                seriesObj.data = [];
                seriesObj.type = 'pie';
                seriesObj.center = ['30%', '50%'];
                seriesObj.radius = ['40%', '70%'];
                seriesObj.itemStyle = {
                    normal : {
                        label : {
                            show : false,
                            textStyle : {
                                //fontSize: grapTextSize,
                            },
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '14',
                                fontWeight : 'bold'
                            }
                        }
                    }
                }
                data.forEach(function(d){
                    var tempObj = {}
                    tempObj.name = d.name;
                    legend.data.push(tempObj);
                    tempObj = {};
                    tempObj.value = d.value;
                    tempObj.name = d.name;
                    tempObj.info = d.info;
                    seriesObj.data.push(tempObj);
                });

                series.push(seriesObj);
                var option = {
                    //color : [ "#107E37","#B8C22B","#EDCE11","#CE6C23","#9F181F","#44D67D","#008EE4","#008EE4","#D244D6","#008EE4","#6495ED"],
                    color : ["#1e90ff","#e9573f","#fa9f44","#e4d33b","#8cc152","#94d9f2","#967adc","#de8c71","#48cfad","#fde2aa","#ec87c0",
                        "#cdcbfc","#00a4cc","#de59d1","#43a08d"],
                    tooltip : {
                        trigger: 'item',
                        formatter: function(params){
                            //"{b} ：<br/>{c}MB ({d}%)",
                            var info = params.data.info;
                            if(info){
                                return info;
                            }else{
                                return params.name + "<br/>" + params.value;
                            }
                        },
                        textStyle : {
                            fontSize : 12,
                            align : "left"
                        },

                    },
                    legend: legend,
                    series : series
                };
                return option;
            }
            else {

                var pie_datas = Echarts.dataFormat.noGroupData(data);

                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} ：{c} ({d}/%)'
                    },
                    legend: {
                        orient: 'vertical',
                        show : opt.showLegend ?  opt.showLegend : false,
                        x:  opt.legendPosition ? opt.legenPosition : 'left',
                        data: pie_datas.category ,
                        textStyle:{
                            color:"#ccc",
                            fontFamily : "Microsoft YaHei"
                        },
                    },
                    series: [
                        {
                            name: name || "",
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: pie_datas.data
                        }
                    ]
                };

                if(opt && opt.title){
                    option.title = opt.title;
                }


                return $.extend({}, Echarts.optionTmpl.base, option);

            }

        },

        //TODO
        /**
         * [折线图]
         * @param {[type]}  data     [description]
         * @param {[type]}  title     [description]
         * @param {Boolean} is_stack [description]
         */
        Lines: function (data, opt) {

            var me = this;
            //获取图表文字
            var grapTextSize = me.getGrapText(opt) || 12;
            //获取图例信息
            var legend = me.getLegend(opt);
            var showLegend, legendPositonX, legendPositonY;
            if(legend){
                showLegend = legend.showLegend;
                legendPositonX=legend.X  || 'left';
                legendPositonY=legend.Y || 'top';
            }
            var childType = opt.childType;
            var is_stack = opt.isStack || false;

            if(data == null || data == undefined || data.length == 0){

                if(childType == "z1"){
                    return getEmptyChartOption("zldline4", opt);
                }else if(childType == "z2"){
                    return getEmptyChartOption("zldline5", opt);
                }else if(childType == "7"){
                    return getEmptyChartOption("7", opt);
                }
                else if(childType == "5"){
                    return getEmptyChartOption("5", opt);
                }else if(childType == "6"){
                    return getEmptyChartOption("6", opt);
                }else if(childType =="cq3" || childType == "cq2"){
                    return getEmptyChartOption("cq3",opt);
                }

                return {};
            }

            var stackline_datas = Echarts.dataFormat.groupData(data, 'line', is_stack);

            var isNullxAxis = false;
            if(stackline_datas.category.length == 1 && stackline_datas.category[0] == "xAxis"){
                isNullxAxis = true;
            }



            var chartProps = opt.chartStyle;

            var unit = chartProps.unit || "%";
            var unitNameY = chartProps.unitNameY || "流量";
            var unit2 = chartProps.unit2 || "次";
            var unitNameY2 = chartProps.unitNameY2 || "流量排名";

            //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
            var specialPros = me.getSpecialPros(opt);
            if( specialPros ){
                var defaultYlName = '',
                    defaultYrName= '',
                    defaultYlUnit= '',
                    defaultYrUnit= '',
                    efaultYlUnit1= '',
                    defaultYrUnit1= '',
                    defaultXUnit= '',
                    defaultXName='';
                defaultYlUnit6='';
                defaultYlUnit5='';
                defaultYrUnit7='';
                if(childType == "5"){
                    defaultYlName = "占比";
                    defaultYlUnit = "%";
                    defaultYlUnit5 = "（%）";
                    defaultXName = "";
                    defaultXUnit = "";
                }else if(childType == "6"){
                    defaultYlName = "流量";
                    defaultYlUnit = "（GB）";
                    defaultYlUnit6 = "GB";
                    defaultXName = "";
                    defaultXUnit = "";
                }
                var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  defaultYlUnit : "（"+specialPros.ylUnit+"）";
                var ylUnit5 = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  defaultYlUnit5 : specialPros.ylUnit;
                var ylUnit6 = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  defaultYlUnit6 : specialPros.ylUnit;
                var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  defaultXUnit : "（"+specialPros.xUnit+"）";
                var yrUnit7 = specialPros.yrUnit == undefined || specialPros.yrUnit == "" ?  defaultYrUnit7 : "（"+specialPros.yrUnit+"）";
                var yrUnit = specialPros.yrUnit == undefined || specialPros.yrUnit == "" ?  defaultYrUnit : specialPros.yrUnit;
                var ylName = specialPros.ylName || defaultYlName;
                var yrName = specialPros.yrName || defaultYrName;
                var xName = specialPros.xName || defaultXName;
            }else{
                if(childType == "5"){
                    var ylUnit = "%";
                    var ylName = "占比";
                    var xName = "";
                    var xUnit = "";
                }else if(childType == "6"){
                    var ylName = "流量";
                    var ylUnit = "GB";
                    var ylUnit6 = "GB";
                    var xName = "";
                    var xUnit = "";
                }
            }

            //坐标
            //var axisType = specialPros.axisType == undefined || specialPros.axisType == "1" || specialPros.axisType == ""? false : true;

            // 重庆折线1
            if(childType == "cq1"){

                return Echarts.getCQline01(data,opt);
            }
            // 重庆折线2
            else if(childType == "cq2"){

                return Echarts.getCQline02(data,opt);
            }
            // 普通单折线图
            else if(childType == "cq3"){
                return Echarts.getCQline03(data,opt);
            }




            // 双折线图
            else  if(childType == "z1"){

                return Echarts.getZldLine04(data,opt);
            }
            // 双折线面积图
            else if(childType == "z2"){
                return Echarts.getZldLine05(data,opt);
            }
            // 分组折线图百分比
            else if(childType == "5"){

                var maxin = Utils.getMaxmin(data);

                var seriesData = stackline_datas.series;
                seriesData.forEach(function(item){
                    item.smooth = true;
                    item.symbol = "circle";
                })

                var maxNum = maxin.max;
                var minNum = maxin.min;

                var min =  minNum  - ( maxNum -  minNum) * 0.05;
                var max =  maxNum + ( maxNum -  minNum) * 0.05;
                max = max == 0 ? 100 : max;
                min = min < 0 ? 0 : min;
                var legendData = stackline_datas.category;
                var lineOP = {
                    legend : {
                        show : isNullxAxis? false  : showLegend,
                        x : legendPositonX,
                        y : legendPositonY,
                        data : legendData,
                        textStyle:{
                            color : "#fff",
                            fontFamily : "Microsoft YaHei"
                        }
                    } ,
                    series : isNullxAxis ?[{type : 'line', data : ['无数据']}] : (seriesData.length ? seriesData : [{type : 'line', data : []}]),
                    grid : {
                        borderWidth :0,
                        borderColor :'#fff',
                        x2 : 10,
                        y2 : 25
                    },
                    tooltip : {
                        trigger: 'axis',
                        textStyle : {
                            fontSize : "12",
                            align:"left"
                        },
                        formatter : function(v){
                            var content = v[0].name + '<br/>';
                            var nv = _.chain(v).sortBy(function(o) { return parseFloat(o.value,10); }).reverse().value();
                            nv.forEach(function(it){
                                content += it.seriesName +"："+(it.data == undefined? 0 :it.data) + ylUnit + '<br/>';
                            })

                            window._echart_line_hoverData_X = { xtime : v[0].name,name:v[0].name};
//	                            chart2TimePoint = v[0].name;
//	                            triggerFlag = true;
                            return content;
                        }
                    },
                    xAxis : [ {
                        name:xName + xUnit,
                        type : 'category',
                        axisLine : {    // 轴线
                            show: true,
                            lineStyle: {
                                color: 'white',
                                type: 'solid',
                                width: 2
                            }
                        },
                        boundaryGap : false,
                        axisTick: {onGap:false},
                        splitLine: {show:false},
                        data : stackline_datas.xAxis,
                        axisLabel: {
                            textStyle : {
                                color : 'rgb(3, 167, 234)'
                                //fontSize :grapTextSize || 12 
                            }
                        }
                    }
                    ],
                    yAxis : [
                        {
                            name: ylName + ylUnit5, //'占比(%)',
                            axisLine : {    // 轴线
                                show: true,
                                lineStyle: {
                                    color: 'white',
                                    type: 'solid',
                                    width: 2
                                }
                            },
                            type : 'value',
                            axisLabel: {
                                formatter: function (v) {
                                    return v.toFixed(2) + '%';
                                },
                                textStyle : {
                                    color : 'rgb(3, 167, 234)'
                                    //fontSize : grapTextSize 
                                }
                            },
                            scale:true,
                            splitNumber: 10,
                            boundaryGap: [0,0],
                            splitLine: {show:false},
                            min:seriesData.length ? min : 0,
                            max:seriesData.length ? max : 100

                        }
                    ]
                }

                //return ;

                return  lineOP;

            }
            // 普通折线图
            else if(childType == '6'){

                var option = {
                    legend : {
                        show :  isNullxAxis? false  : showLegend,
                        x : legendPositonX,
                        y : legendPositonY,
                        data : stackline_datas.category,
                        textStyle:{
                            color : "#fff",
                            fontFamily : "Microsoft YaHei"
                        }
                    },
                    grid : {
                        x2:60,
                        y2:40,
                        x:60,
                        y:30,
                        borderWidth: 1
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter: function(params){
                            window._echart_line_hoverData_X = { xtime :params[0].name,name:params[0].name};
                            var unit = params[0].seriesName.substring(params[0].seriesName.indexOf("(")+1,params[0].seriesName.indexOf(")"));
                            var res = params[0].name + '<br/>'
                                + params[0].seriesName.substring(0,params[0].seriesName.indexOf("(")) + '：' + params[0].value+ylUnit6;//unit;
                            return res;


                        },
                        textStyle:{
                            fontSize : 12,
                            align : "left"
                        }
                    },
                    xAxis : [
                        {
                            name: xName + xUnit, //'占比(%)',
                            type : 'category',
                            boundaryGap : false,
                            splitLine: {
                                show:true,
                                lineStyle:{
                                    type : 'dashed'
                                }
                            },
                            data:stackline_datas.xAxis,
                            axisLabel : {
                                textStyle : {
                                    color : 'rgb(3, 167, 234)'
                                    //fontSize : grapTextSize
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name:ylName + ylUnit,//'流量(GB)',
                            type : 'value',
                            splitLine: {
                                show:true,
                                lineStyle:{
                                    type : 'dashed'
                                }
                            },
                            axisLabel : {
                                textStyle : {
                                    color : 'rgb(3, 167, 234)'
                                    //fontSize : grapTextSize
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'流量(GB)',
                            type:'line',
                            smooth:true,
                            data:stackline_datas.series[0].data
                        }
                    ]
                };
                return option;
            }
            else if(childType == "7"){
                var color1 = "#ff8251";
                var color2 = "#1fb9f7";

                var legendName1 = stackline_datas.category[0] ;
                var legendName2 = stackline_datas.category[1] ;

                if(stackline_datas.series[1]){
                    stackline_datas.series[1].yAxisIndex = 1;
                }
                stackline_datas.series.forEach(function(it){
                    it.smooth = true;
                });
                // 右终
                var yData2 =stackline_datas.series[1].data;
                // 左纵
                var yData1 =stackline_datas.series[0].data;

                // 处理最大最小值
                var getMaxMinData = function(data){
                    var _max = parseFloat(_.max(data));
                    var _min = parseFloat(_.min(data));

                    var min = _min - (_min * 0.1);
                    var max = _max + (_max * 0.1);

                    if(min < 1 && min >0 ) min = 0;

                    if((max < 1 && max >0 )|| (max == 1 && min == 1)){
                        max = 1;
                        min = 0;
                    }

                    return {
                        max : Math.round(max),
                        min : Math.round(min)
                    }
                }




                var M1 = getMaxMinData(yData1);
                var M2 = getMaxMinData(yData2)
                var max1 = M1.max;
                var min1 = M1.min;

                var max = M2.max;
                var min = M2.min;
                var snum = 5 ;
                if(max1 < 5 && max1 > 0){
                    snum = Math.round(max1)  ;
                    snum = /1|2|3/.test(snum) ? 1 : snum;
                }

                var snumRight = 5;
                if(max < 5 && max > 0){
                    snumRight = Math.round(max)
                    snumRight = /1|2|3/.test(snumRight) ? 1 : snumRight;
                }


                var calSplitnum = function(max , min){
                    // 取最大最小值差值
                    var tmp = Math.ceil(max - min);
                    var sn = 5;
                    if(max == 1 && min ==0 ){
                        return sn;
                    }
                    if(max == 0 && min ==0){
                        return 1;
                    }
                    if(tmp < 5){
                        sn = tmp <= 1 ?  1 : tmp -1  ;
                    }

                    return sn;
                }
                snum = calSplitnum(max1,min1)
                snumRight = calSplitnum(max,min);
                if(max == min){
                    max += 1;
                    min -= min >=1 ? 1 : min;
                }
                if(max1 == min1){
                    max1 += 1;
                    min1 -= min1 >=1 ? 1 : min1;
                }


//        			 
                var option = {
                    color:[color1,color2],
                    legend : {
                        show:  isNullxAxis? false  : showLegend,
                        itemHeight:14,
                        selectedMode : false,
                        data: [
                            {
                                name:ylName || legendName1,//legendName1,
                                //icon : './image/legend1.png',
                                textStyle:{
                                    fontWeight:'bold',
                                    color: color1
                                }
                            },
                            {
                                name:yrName || legendName2 ,//legendName2,
                                textStyle:{
                                    fontWeight:'bold',
                                    color: color2
                                },
                                // icon : './image/legend2.png',
                            }
                        ],
                        orient: 'horizontal',
                        x: legendPositonX || 'right',
                        y: legendPositonY || 'top',
                    },
                    grid : {
                        x2:60,
                        y2:20,
                        x:60,
                        y:50,
                        borderWidth:0
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter: function(params){
                            if(ylName){
                                params[0].seriesName = ylName;
                            }
                            if(yrName){
                                params[1].seriesName = yrName;
                            }
                            var str = params[0].name +"<br/>";
                            //str +=params[0].seriesName +":"+params[0].data+ "("+unit+")" + "<br/>";
                            //str +=params[1].seriesName +":"+params[1].data+"("+unit2+")";
                            //str +=ylName||legendName1 +":"+params[0].data+ ylUnit + "<br/>";
                            //str +=yrName||legendName2+":"+params[1].data+ yrUnit;
                            str +=params[0].seriesName +"："+params[0].data+ ylUnit6 + "<br/>";
                            str +=params[1].seriesName +"："+params[1].data+yrUnit;
                            window._echart_line_hoverData_X = { xtime :params[0].name,name:params[0].name};
                            return str;
                        },
                        textStyle:{
                            fontSize : 12,
                            align : "left"
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            splitLine: {
                                show:false,
//	                                     lineStyle:{
//	                                         type : 'dashed'
//	                                     }
                            },
                            data:stackline_datas.xAxis,
                            axisLabel : {
                                textStyle : {
                                    color : 'rgb(3, 167, 234)'
                                    //fontSize : grapTextSize
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name: (ylName||legendName1) + ylUnit,//legendName1,
                            type : 'value',
                            splitLine: {
                                show:false,
                            },
                            splitNumber: snum,
                            axisLine : {    // 轴线
                                show: true,
                                lineStyle: {
                                    color: color1,
                                }
                            },
                            axisLabel : {
                                formatter: function (v) {
                                    if(v<=1 && v>0){
                                        return _.round(v, 2) ;
                                    }else{
                                        return _.round(v);
                                    }

                                },
                                textStyle : {
                                    color : color1,
                                    //fontSize : grapTextSize
                                }
                            },
                            max :max1,
                            min : min1

                        },
                        {
                            name: (yrName||legendName2) + yrUnit7,//legendName2,
                            type : 'value',
                            axisLine : {    // 轴线
                                show: true,
                                lineStyle: {
                                    color: color2,
                                }
                            },
                            splitNumber: snumRight,
                            boundaryGap: [0,0],
                            splitLine: {show:false},
                            axisLabel: {
                                formatter: function (v) {
                                    return Math.round(v)
                                },
                                textStyle : {
                                    color : color2,
                                    //fontSize : grapTextSize
                                }
                            },
                            max :  max ,
                            min : min
                        }
                    ],
                    series : stackline_datas.series
                };

                return option;

            }
            else{

                var option = {
                    //title: title,
                    legend: {
                        show: showLegend,
                        x: legendPositonX || 'left',
                        y: legendPositonY || 'top',
                        data: stackline_datas.category ,
                        textStyle:{
                            color:"#ccc",
                            fontFamily : "Microsoft YaHei"
                        }
                    },

                    xAxis: [{
                        type: 'category', //X轴均为category，Y轴均为value  	  
                        data: stackline_datas.xAxis,
                        axisLabel : {
                            textStyle : {
                                color : color2,
                                //fontSize : grapTextSize
                            }
                        },
                        // boundaryGap: false//数值轴两端的空白策略 	  
                    }],

                    yAxis: opt.yAxis || [{
                        name: name || '',
                        type: 'value',
                        splitArea: { show: false } ,
                        axisLabel : {
                            textStyle : {
                                color : color2,
                                //fontSize : grapTextSize
                            }
                        },
                    }],

                    series: stackline_datas.series

                };

                if(opt.title){
                    option.title = opt.title;
                }
                return $.extend({}, Echarts.optionTmpl.lineOption, option);

            }


        },
        getSpecialPros : function(opt){
            if(opt == undefined)return;
            var props = opt.props;
            var specialProp = props == undefined ? {} : props.specialProp;
            if(specialProp != undefined){
                return specialProp;
            }
        },
        getAxisMM : function(opt){
            var axisMmVal = {};
            if(opt == undefined)return;
            var props = opt.props;
            var specialProp = opt.props == undefined ? {} : opt.props.specialProp;
            if(specialProp != undefined){
                axisMmVal['xMin'] = specialProp.xMin == undefined ? "" :specialProp.xMin;
                axisMmVal['xMax'] = specialProp.xMax == undefined ? "" :specialProp.xMax;
                axisMmVal['ylMin'] = specialProp.ylMin == undefined ? "" :specialProp.ylMin;
                axisMmVal['ylMax'] = specialProp.ylMax == undefined ? "" :specialProp.ylMax;
            }
            return axisMmVal;
        },
        getPieShowPercent : function(opt){
            //
            var pieSpecialProp = "";
            if(opt == undefined)return;
            var props = opt.props;
            var specialProp = opt.props == undefined ? {} : opt.props.specialProp;

            if(specialProp){
                if(specialProp.pieShowPercent =="" || specialProp.pieShowPercent == undefined){
                    pieSpecialProp = 0.02;
                }else{
                    pieSpecialProp = parseInt(specialProp.pieShowPercent)/100;
                }
                //pieSpecialProp = specialProp.pieShowPercent == 0 || specialProp.pieShowPercent !="" && specialProp.pieShowPercent != undefined ? parseInt(specialProp.pieShowPercent)/100 : 0.02;
            }else{
                pieSpecialProp = 0.02;
            }

            return pieSpecialProp;
        },

        // 获得是否刷新方法
        getMapRestoreVal: function(opt){
            if(opt == undefined)return;
            var props = opt.props;
            var commonProp = opt.props == undefined ? {} : opt.props.commonProp;
            var showRestoreVal = false;
            if(commonProp){
                showRestoreVal = commonProp.showRestoreVal == "true" ? true : false;
            }
            return showRestoreVal ;
        },

        getLegend : function(opt){
            var legend = {};
            var legendPositon;
            //处理图例及图例位置
            if(opt == undefined)return;
            var props = opt.props;
            var commonProp = opt.props == undefined ? {} : opt.props.commonProp;

            if(commonProp != undefined){
                legend["showLegend"] = commonProp.showLegend == "true" ? true : false;
                legendPositon = commonProp.legendPositon;
                legend["showGVal"] = commonProp.showGVal == "true" ? true : false;
                if( legendPositon ){
                    switch( legendPositon ){
                        case RC.Z_PROPS.LEGENDALIGN.L_T:
                            legend["X"] = 'left';
                            legend["Y"] = 'top';
                            break;
                        case RC.Z_PROPS.LEGENDALIGN.C_T:
                            legend["X"] = 'center';
                            legend["Y"] = 'top';
                            break;
                        case RC.Z_PROPS.LEGENDALIGN.R_T:
                            legend["X"] = 'right';
                            legend["Y"] = 'top';
                            break;
                        case RC.Z_PROPS.LEGENDALIGN.C_B:
                            legend["X"] = 'center';
                            legend["Y"] = 'bottom';
                            break;
                        default:;
                    }
                }
                legend['textStyle'] = {
                    color: '#cccccc',
                    fontFamily : "Microsoft YaHei"
                }

            }

            return legend;
        },
        getGrapText : function(opt){
            var grapText;

            if(opt == undefined)return ;
            //处理图例及图例位置
            var props = opt.props || {};
            var commonProp = props == undefined ? {} : props.commonProp;
            if(commonProp != undefined){
                grapText = commonProp.commonft;
            }
            return grapText;

        },
        /**
         * [Bars 柱图]
         * @param {[type]}  data     [description]
         * @param {[type]}  title     [description]
         * @param {Boolean} is_stack [description]
         *
         * data:数据格式：{name：xxx,group:xxx,value:xxx}...
         */
        //TODO
        Bars: function (data, opt) {

            var me = this;
            var grapTextSize = me.getGrapText(opt);

            var legend = me.getLegend(opt);
            var showLegend, legendPositonX, legendPositonY;
            if(legend){
                showLegend = legend.showLegend || false;
                legendPositonX=legend.X  || 'left';
                legendPositonY=legend.Y || 'top';
            }

            var maxin = Utils.getMaxmin(data);
            var childType = opt.childType;
            // 属性
            var chartProps = opt.props;
            var unit = chartProps.unit || "%";
            var unitNameY = chartProps.unitNameY || "连接成功率";

            //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
            var specialPros = me.getSpecialPros(opt);
            if( specialPros ){


                var defaultYlName = '',
                    defaultYrName= '',
                    defaultYlUnit= '',
                    defaultYlUnitZb2= '',
                    defaultYrUnit= '',
                    defaultxName= '',
                    defaultxUnit= '',
                    defaultXbName,
                    defaultXbUnit;
                if(childType == "zb1"){
                    defaultXbName = "";
                    defaultXbUnit = "";
                }else if(childType == "zb2"){
                    defaultYlName = "";
                    defaultYlUnit = "";
                    defaultYlUnitZb2 = "";
                }
                var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  defaultYlUnit : "（"+specialPros.ylUnit+"）";
                var ylUnitZb2 = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  defaultYlUnitZb2 : specialPros.ylUnit;
                var yrUnit = specialPros.yrUnit == undefined || specialPros.yrUnit == "" ?  defaultYrUnit : "（"+specialPros.yrUnit+"）";
                var xbUnit = specialPros.xbUint == undefined || specialPros.xbUint == "" ?  defaultXbUnit : "（"+specialPros.xbUint+"）";
                var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  defaultxUnit : "（"+specialPros.xUnit+"）";
                var ylName = specialPros.ylName || defaultYlName;
                var yrName = specialPros.yrName || defaultYrName;
                var xbName = specialPros.xbName || defaultXbName;
                var xName = specialPros.xName || defaultxName;

                //坐标
                //var axisType = specialPros.axisType == undefined || specialPros.axisType == "1" || specialPros.axisType == ""? false : true;
            }else{
                if(childType == "zb1"){
                    var xbName = "";
                    var xbUnit = "";
                }else if(childType == "zb2"){
                    var ylName = "";
                    var ylUnit = "";

                }
            }
            var  isNullxAxis = false;
            var bars_dates = Echarts.dataFormat.groupData(data,'bar',opt.is_stack);

            if(bars_dates.category.length ==1 && bars_dates.category[0]== "xAxis"){
                isNullxAxis = true;
            }

            //横向柱图
            if(childType == "cq1"){
                return Echarts.getCQbar01(data, opt);
            }
            // 普通柱图
            if(childType =="cq2"){
                return Echarts.getCQbar02(data, opt);
            }



            if(childType == "zb1"){

                if(data.length == 0||(data[0].ordernum == "" && data[0].name=="")){
                    return getEmptyChartOption("zldbar1",opt);
                }
                var minNum = maxin.min - (maxin.max - maxin.min) * 0.05;
                var maxNum = maxin.max + (maxin.max - maxin.min) * 0.05;
                minNum = minNum < 0 ? 0 : minNum;
                maxNum = maxNum > 100 ? 100 : maxNum;

                var xMin = minNum - (maxNum - minNum) * 0.05 < 0 ? 0 : minNum - (maxNum - minNum) * 0.05;
                var xMax = maxNum + (maxNum - minNum) * 0.2 > 100 ? 120 : maxNum + (maxNum - minNum) * 0.2;


                // "#ff00ff","#d500ff","#aa00ff","#8000ff"
                var newColors = ["#8000ff","#6f00ff","#4c00ff","#0000ff","#0040ff","#0055ff","#006aff","#0080ff",
                    "#0095ff","#00aaff","#50c0e9","#00d5ff","#00eaff","#00ffff","#00ffd5","#00ffaa","#00ff80","#2eff51","#51ff2e",
                    "#74ff2e","#96ff2e","#b9ff2e","#dcff2e","#ffff2e","#ffdc2e","#ffb92e","#ff962e","#ff742e","#ff512e","#ff2e2e"
                ];

//	                var newColors = ["#ff2e2e", "#ff512e", "#ff742e", "#ff962e", "#ffb92e", "#ffdc2e", "#ffff2e", "#dcff2e", "#b9ff2e", "#96ff2e", "#74ff2e", "#51ff2e", "#2eff51", "#00ff80", "#00ffaa", "#00ffd5", "#00ffff", "#00eaff", "#00d5ff", "#50c0e9", "#00aaff", "#0095ff", "#0080ff", "#006aff", "#0055ff", "#0040ff", "#0000ff", "#4c00ff", "#6f00ff", "#8000ff"]

//	        		var zbarColors =  ["#C96565","#CD8366","#CA9D6C","#CE9451","#D9A126","#D1B814","#B1D114",
//	        		       			"#77D011","#14D13E","#15D184","#17CECF", "#179AD0", "#1566D2", "#121AC8","#6F3FBC","#9D39BB","#4F438C","#C96565","#CD8366","#CA9D6C"];
//	        		var zColors =  newColors.reverse();  //newColors.reverse();
//	                var zColors =  newColors.reverse();  //newColors.reverse();

                var _colors ;
                // 小于30个数据   截取30 - len数组
                if(data.length < 30){
                    _colors = _.drop(newColors,(30 - data.length));
                }else{
                    _colors = newColors;
                }


                var axis = [];
                var series = [];
                var seriesObj = {};
                seriesObj.type = 'bar';
                seriesObj.data = [];
                $.each(data.slice(0).reverse(), function(i, item){
                    axis.push(item.ordernum);
                    var tempObj = {
                        value :item.value,
                        myDesc : item.name,
                        xtime : item.xtime,
                        name : item.name,
                        info : item.info,
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true,
                                    formatter : function(v){
                                        if(v.data.value){
                                            return v.data.myDesc + " " + v.data.value;
                                        }
                                    },
                                    textStyle : {
                                        color : 'white'
                                    }
                                },
                                color: function(params) {
                                    var color = _colors[params.dataIndex] ;
                                    if(color == undefined){
                                        var index = params.dataIndex  % (_colors.length -1)  ;
                                        color = _colors[index-1]
                                    }
                                    return color;
                                }
                            }
                        }
                    };
                    seriesObj.data.push(tempObj);
                })
                series.push(seriesObj);

                var option = {
                    tooltip : {
                        trigger: 'item',
                        textStyle:{
                            fontSize : 12,
                            align : "left"
                        },
                        formatter: function (params) {
                            var info = params.data.info;
                            if(info){
                                return info;
                            }else{
                                return params.name + "<br/>" + params.value;
                            }
                        }
                    },
                    grid : {
                        borderWidth :0,
                        borderColor :'#fff',
                        x : 22,
//      	                    x2 : 125,
                        y : 30,
                        y2 : 25
                    },
                    xAxis : [{
                        name:'',
//      	                   name:xbName + xbUnit,//'占比(%)',
                        axisLine : {    // 轴线
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.5)',
                                type: 'solid',
                                width: 2
                            }
                        },
                        type : 'value',
                        axisLabel: {
                            textStyle : {
                                color : 'rgb(3, 167, 234)',
                                fontSize : 12
                            }
                        },
                        scale:true,
                        splitLine : {
                            show : false
                        },
                        splitArea : {
                            show : false
                        },
                        splitNumber: 10,
                        boundaryGap: [0,0.1],
                        splitLine: {show:false},
                    }],
                    yAxis : [{
                        type : 'category',
                        axisLine : {    // 轴线
                            show: true,
                            lineStyle: {
                                color: 'rgba(229, 229, 229,0.8)',
                                type: 'solid',
                                width: 2
                            }
                        },
                        boundaryGap : true,
                        axisTick: {onGap:false},
                        splitLine: {show:false},
                        data : axis.length ? axis : [' '],
                        axisLabel: {
                            interval : 0,
                            textStyle : {
                                color : 'rgb(3, 167, 234)'
                                //fontSize : grapTextSize
                            }
                        }
                    }],
                    series: series
                }

                return option;
            }
            // 正常组图(直连点)
            else if(childType == "zb2"){
                if(data.length == 0){
                    return getEmptyChartOption("zldbar2",opt);
                }

                var option = {
                    grid : {
                        borderWidth :0,
                        borderColor :'#fff',
                        x:65,
                        y:20,
                        y2:20,
                        x2: 35
                    },
                    legend: {
                        show: isNullxAxis ? false : showLegend,
                        orient: 'horizontal',
                        x: legendPositonX,
                        y: legendPositonY,
                        padding:[0, 28, 0, 0],
                        textStyle : {
                            color : "#ccc",
                            fontFamily : "Microsoft YaHei"
                        },
                        data :bars_dates.category
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter:function(v){
                            var res = v[0].name + "<br/>";
                            $.each(v,function(i,d){
                                if(d.value != "-" && d.value!='' &&  d.seriesName!='' && d.seriesName !="xAxis")
                                    res += d.seriesName+"："+d.value + ylUnitZb2 +"<br/>";
                            })
                            return res;
                        },
                        textStyle:{
                            fontSize : 12,
                            align : "left",

                        }
                    },
                    calculable : false,
                    xAxis : [
                        {
                            name:xName + xUnit,
                            type : 'category',
                            splitLine: {show:false},
                            axisLabel: {
                                textStyle : {
                                    color : 'rgb(3, 167, 234)'
                                    //fontSize : grapTextSize
                                }
                            },
                            splitLine : {show : false},
                            splitArea : {show : false},
                            data : bars_dates.xAxis
                        }
                    ],
                    yAxis: [{
                        show:true,
                        name:ylName + ylUnit,
                        //name:unitNameY + "("+unit+")",
                        type : 'value',
                        splitLine: {show:false},
                        axisLabel: {
                            textStyle : {
                                color : 'rgb(3, 167, 234)'
                                //fontSize : grapTextSize
                            },
                            formatter : function(param){
                                return param;
                            }
                        },
                    }],
                    series: bars_dates.series
                };

                return option;
            }
            else {
                var option = {
                    legend: {
                        data :bars_dates.category,
                        textStyle:{
                            color:"#ccc",
                            fontFamily : "Microsoft YaHei"
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        data: bars_dates.xAxis
                    }],

                    yAxis: [{
                        type: 'value',
                        splitNumber: 2
                    }],

                    series: bars_dates.series

                };
                return $.extend({}, Echarts.optionTmpl.base, option);
            }

        },
        /**
         * [Gauge 仪表盘]
         * @param {[Object]} data  [description]
         * @param { Object} option
         */
        Gauge : function(data ,opt){

            if(data == null || data == undefined || data.length==0){
                return {};
            }
            var DATA = {};
            if(data.length>0){
                for(var i=0;i<data.length;i++){
                    if(i==0){
                        DATA.name = data[i].name || data[i].label;
                        DATA.value = data[i].value;
                        DATA.tooltip = {
                            formatter : data[i].info
                        }
                    }
                }
            }
            var option ={
//	        			 backgroundColor: '#1b1b1b',
                tooltip : {
                    formatter: "{a} <br/>{c} {b}"
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series : [
                    {
                        name:'速度',
                        type:'gauge',
                        min:0,
                        max:100,
                        splitNumber:4,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.7, '#ff0000'],[0.85, '#ffcc00'],[1, 'lime']],
                                width: 3,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        axisLabel: {            // 坐标轴小标记
                            textStyle: {       // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color : 'rgb(3, 167, 234)',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :10,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        splitLine: {           // 分隔线
                            length :20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                width:3,
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        pointer: {           // 分隔线
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 3
                        },
                        title : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//	        			                    fontWeight: 'bolder',
                                fontSize: 14,
//	        			                    fontStyle: 'italic',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        detail : {
//	        			                backgroundColor: 'rgba(30,144,255,0.8)',
//	        			                borderWidth: 1,
//	        			                borderColor: '#fff',
//	        			                shadowColor : '#fff', //默认透明
//	        			                shadowBlur: 5,
//	        			                offsetCenter: [0, '50%'],       // x, y，单位px
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//	        			                    fontWeight: 'bolder',
                                color: '#fff'
                            }
                        },
                        data:[DATA]
                    }


                ]

            }


            return option;

        },

        /**
         * 关系图
         * @param data
         * @param opt
         */
        Force : function(data,opt){
            if(data == null || data == undefined || data.length==0){
                return {};
            }
            var option = Echarts.dataFormat.ftForce(data,opt);
            return option;
        },

        /**
         * [Map 地图]
         * @param {[Object]} data  [description]
         * @param { Object} option
         */
        //TODO
        Map : function(data , opt){

            var rangeOption = getRangeOption(data);
            var chartStyle = opt.chartStyle;
            var mapType = chartStyle.mapType;
            var childType =opt.childType;
            // 是否染色
            var isColor = chartStyle.isColor || false;
            var option = {};

            //设置图例及 地图文字
            var grapText = Echarts.optionTmpl.getGrapText(opt);
            var legend = Echarts.optionTmpl.getLegend(opt);
            var showLegend, legendPositonX, legendPositonY, showGVal,
            // 是否显示刷新
                showRestoreVal = Echarts.optionTmpl.getMapRestoreVal(opt);

            if(legend){
                showLegend = legend.showLegend;
                legendPositonX=legend.X  || 'left';
                legendPositonY=legend.Y || 'top';
                showGVal = legend.showGVal;
            }

            if(data == null || data == undefined || data.length==0){
                if(/qianxi|world/.test(mapType)){
                    return attactMapHelp({
                        mapType:mapType,
                        rangeOption : rangeOption,
                        data : [],
                        isColor : isColor
                    });
                }
            }

            // 设置tip对象映射name -> info 集合
            var mapTipData = {};
            if(data.length){
                data.forEach(function(it){
                    mapTipData[it.name] = it.info;
                })
            }


            if((data.length == 1 && data[0].value == "") || data.length == 0 ){
                var _emptyOP = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params){
                            var str = params.name;
                            return str;
                        },
                        textStyle : {
                            fontSize :12,
                            align : "left"
                        }
                    },
                    series: [
                        {
                            name: '',
                            type: 'map',
                            roam : true,
                            mapType: opt.chartStyle.mapType,
                            data:[],
                            itemStyle:{
                                normal:{
                                    borderColor: "#008FBF",
                                    borderWidth: 0.5,
                                    areaStyle: {
                                        color: '#00AFFE'
                                    }

                                },
                                emphasis: {
                                    label:{ show:false},
                                    color : "rgba(235, 200, 5,0.7)"
                                }
                            },
                        }
                    ]
                };

                if(opt.chartStyle.mapType =="qianxi"){
                    _emptyOP.series[0].mapType = "china";
                }

                if(opt.chartStyle.mapType =="world" || opt.chartStyle.mapType =="cq2"){
                    _emptyOP.series[0].mapType = "world";
                    _emptyOP.series[0].nameMap = worldName;
                }

                return _emptyOP;
            }


            if(/qianxi|world/.test(mapType)){

                return attactMapHelp({
                    mapType:mapType,
                    rangeOption : rangeOption,
                    data : data,
                    isColor : isColor
                });
//	        		rangeOption.show = false;
//	        		option = {
//	    			    color: ["#22f0c6","#ddff00","#2bcc00","#5057d9","#cc50c2","#ff6624","#39b372","#0066a6","#e5209d","#ffe600","#57cce9","#c054ff","#cb7c3c","#008ee4","#60ff00","#dd7171","#bfb239","#ff9d00","#8032cb","#e53030"],
//		        	    legend :{
//		        	    	show : false,
//	        		    },
//	        		    dataRange : rangeOption,
//	        		    tooltip : {
//	        		        trigger: 'item',
//	        		        formatter:  function(params, ticket, callback){
//	        		        	 // 有点矬 没法阻止
//			                    var str = params.name;
//			                    return (str.indexOf('>') === -1) ? str : '';
//	        		        },
//	        		    }
//		        	} 
//		        	var mapData;
//		        	// 中国地图处理
//		        	if(mapType == "qianxi"){
//		        		mapData = Echarts.dataFormat.ftQianXi(data);
//		        	}
//		        	// 世界地图
//		        	else if(mapType =="world"){
//		        		mapData = Echarts.dataFormat.ftWorld(data);
//		        	}
////		        	option.legend.data = mapData.legend;
//		        	option.series = mapData.series;
//		        	return option;
            }

            else{

                var map_datas = Echarts.dataFormat.groupData(data,'map',mapType);
                var maxin = Utils.getMaxmin(data);
                option.series = map_datas.series;
                //显示地图文字值
                //option.series[0].itemStyle.normal.label.show = showGVal || false;
                if(option.series[0]){
                    option.series[0].itemStyle.normal.label = {
                        show:showGVal,
                        textStyle:{
                            //fontSize:grapText
                        }
                    };
                }

                option.data = data;
                option.showRestore = showRestoreVal;
                // 重庆地图
                if(childType =="cq"){
                    return propsUtil.getPointCQMap(option);
                }
                // 染色图(新疆 ,浙江，重庆)



                else if(/xj|zj|cq1|wh|js|^1$|^2$/.test(childType)){

                    return propsUtil.getRangeCQMap(option);
                }
                // 世界染色地图
                else if(childType == "cq2"){
                    return propsUtil.getRangeWorldMap(option);
                }
                else{

                    option.dataRange =	{
                        x: 'left',
                        y: 'top',
                        color: ['#d94e5d','#eac736','#50a3ba'],
                        min: rangeOption.min,//0,
                        max: rangeOption.max,//1000,
                        realtime:false,
                        textStyle:rangeOption.textStyle
                    }
//		        		//地图值域选择
//			        	option.dataRange = {
//			                x: 'left',
//			                y: 'top',
//			                orient: 'horizontal',
//			                text:['大','小'],
//			                range:null,
//			                splitNumber:rangeOption.splitNumber,//4,
//			                color: rangeOption.color,//['#ff0100', '#ffa800', '#ffff00', '#14c8ec'],
//			                min: rangeOption.min,//0,
//			                max: rangeOption.max,//1000,
//			                textStyle:rangeOption.textStyle
//			            };
                }


                option.tooltip = {
                    trigger: 'item',
                    enterable: true,
                    position : function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] +5, p[1] - 40];
                    },
                    formatter: function(params, ticket, callback){

                        var data = params.data.dataObj || {name:params.name};
                        var str ="";
                        if(data.name){
                            str += data.name + "<br/>";
                        }
                        if(childType =="cq"){
                            return mapTipData[params.name]||params.name;
                        }

                        if(data.ordernum){
                            str += "排名："+data.ordernum + "<br/>";
                        }
                        if(data.value){
                            str += "流量："+data.value + "GB <br/>";
                        }
                        if(data.percent){
                            str += "占比："+data.percent + "%<br/>";
                        }
                        if(data.value == undefined){
                            str = "暂无数据";
                        }
//        		        	var name = params.name;
//        		        	var value = params.value;
//        		        	if(value!=""){
//        		        		str = name ;
//        		        	}
//        		        	if(str.indexOf("-")>-1){
//        		        		str = str.substring(0, str.indexOf("-")-1);
//        		        	}
                        return str;
                    },
                    textStyle : {
                        color: '#fff',
                        fontSize :12,
                        align:"left"
                    }
                };

                return $.extend({}, Echarts.optionTmpl.mapOption,option);
            }


        }


    },


    /**
     * [getMaxMin 获取最大最小值]
     * @param  {[type]} datas [description]
     * @return {[type]}       [description]
     */
    getMaxMin : function(datas){

        var _d = [];
        datas.forEach(function(it){
            var ar = it.pointData;
            if(ar.length){
                ar.forEach(function(dd){
                    _d.push(dd);
                })
            }
        });

        var min = 0, max = 0 ,arr = [];
        for(var i = 0;i<_d.length ; i++){
            if(_d[i].value){
                arr.push(_d[i].value);
            }
        }
        if(arr.length){
            min = _.min(Math,arr);
            max = _.max(Math,arr);
        }
        return {min : min ,max : max};

    },

    /**
     * [getDataFilter 过滤下数据格式]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    getDataFilter : function(data){
        var arr = [];
        if( data == null  || data.length==0){
            data = [{name: '', value:''}];
        }

        if(data && data.length){
            for(var i =0 ;i<data.length ; i++){
                if(data[i].category !== ""){
                    arr.push(data[i]);
                }
            }
        }
        return arr ;

    },

    //TODO
    /**
     * 直连点 上下折线图
     * @param data
     * @param opton
     */
    getZldLine04 : function(data , option){

        var grapTextSize = Echarts.optionTmpl.getGrapText(option) || 12;
        var legend = Echarts.optionTmpl.getLegend(option);
        var showLegend, legendPositonX, legendPositonY;
        if(legend){
            showLegend = legend.showLegend;
            legendPositonX=legend.X  || 'left';
            legendPositonY=legend.Y || 'top';
        }

        //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
        var specialPros = Echarts.optionTmpl.getSpecialPros(option);
        if( specialPros ){
            var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "（GB）" : "（"+specialPros.ylUnit+"）";
            var ylUnitZ1 = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "GB" : specialPros.ylUnit;
            var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : "（"+specialPros.xUnit+"）";
            var ylName = specialPros.ylName || "流量";
            var xName = specialPros.xName || "";
        }else{
            var ylUnit = "（GB）";
            var ylName = "流量";
            var xUnit = "";
            var xName = "";
        }

        if(data == null || data.length == 0){
            return getEmptyChartOption("zldline4", option);
        }
        if(data[0].flowin == null && data[0].xtime == null){
            return getEmptyChartOption("zldline4", option);
        }


        var flowInOutTrendOpts;
        var dataArr = data;
        var axisValueRangeFlow;
        // 流入
        var flowIn = [];
        // 流出
        var flowOutAbs = [];
        // 流出
        var flowOut = [];
        var timeTicker = [];
        $.each(dataArr,function(i,d){
            var data = {
                value : d.flowin==null?0:parseFloat(d.flowin),
                txt : d.name || ""
            }
            flowIn.push(data);
            flowOutAbs.push(d.flowout==null?0:Math.abs(d.flowout));
            flowOut.push(d.flowout==null?0:-parseFloat(d.flowout));
            timeTicker.push(d.xtime);
        })
        var ticker = timeTicker[timeTicker.length-1];
        if(flowIn[timeTicker.length-1]!=0){
            flagIn = true;
        }

        if(flowOut[timeTicker.length-1]!=0){
            flagOut = true;
        }


        //计算最大值
        var calcMaxFlow = function(flowIn,flowOutAbs){
            var _outAbsMax = _.max(flowOutAbs);
            var _inMax = _.max(flowIn, function(v) {
                return v.value;
            }).value;
            var max = _inMax > _outAbsMax ? _.ceil(_inMax) :  _.ceil(_outAbsMax)  ;
            return max+100 - max%100;
        }
        axisValueRangeFlow = calcMaxFlow(flowIn,flowOutAbs);
        //流入流出流量趋势线图
        flowInOutTrendOpts = {
            grid : {
                borderWidth :0,
                borderColor :'#fff',
                //y:40,
                //y2:30,
                //x2:70
            },
            tooltip : {
                trigger: 'axis',
                formatter: function (params,ticket) {

                    ticker = params[0].name;
                    var res = params[0].name;
                    $.each(params,function(i,d){
                        var val = d.data == null ? 0 : d.data;
                        //res += "<br/>" + d.seriesName +"流量 :" + Math.abs(parseFloat(val)) + "GB";
                        if(val.value!=undefined){
                            val = val.value;
                        }
                        res += "<br/>" + d.seriesName + ylName+ " ：" + Math.abs(parseFloat(val)) + ylUnitZ1;
                    })
                    var _name = params[0].data.txt ;

                    var data = {
                        xtime : params[0].name,
                        name : _name
                    }
                    window._echart_line_hoverData_X = data;

                    return res;
                },
                textStyle:{
                    fontSize : 12,
                    align:"left"
                }
            },
            legend: {
                show : showLegend,
                orient: 'horizontal',
                x: legendPositonX,
                y: legendPositonY,
                selectedMode:false,
                textStyle:{
                    color:"#ccc",
                    fontFamily : "Microsoft YaHei"
                },
                padding: [0, 70, 0, 0],
                data:[{
                    name:'流入',
                    textStyle:{fontWeight:'bold', color:'auto'}
                },
                    {
                        name:'流出',
                        textStyle:{fontWeight:'bold', color:'auto'}
                    }]
            },
            calculable : false,
            xAxis : [
                {
                    name:xName + xUnit,
                    type : 'category',
                    boundaryGap : false,
                    splitLine: {show:false},
                    axisLabel: {
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    },
                    data : timeTicker,
                    boundaryGap:false,
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'white',
                            type: 'solid',
                            width: 1
                        }
                    }
                }
            ],
            yAxis : [
                {
                    name: ylName + ylUnit,//'流量(GB)',
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'white',
                            type: 'solid',
                            width: 2
                        }
                    },
                    type : 'value',
                    boundaryGap:false,
                    scale:true,
                    splitNumber: 8,
                    boundaryGap: [0,0.1],
                    splitLine: {show:false},
                    axisLabel: {
                        formatter: function (v) {
                            return Math.abs(v)
                        },
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    },
                    min:-axisValueRangeFlow,
                    max:axisValueRangeFlow
                }
            ],
            series : [
                {
                    name:'流入',
                    type:'line',
                    smooth:true,
                    data:flowIn
                },
                {
                    name:'流出',
                    type:'line',
                    smooth:true,
                    data:flowOut
                }
            ]
        };
        return flowInOutTrendOpts;
    },
    /**
     * 直连点 上下折线面积图
     * @param data
     * @param opton
     */
    //TODO
    getZldLine05 : function(data , option){

        var grapTextSize = Echarts.optionTmpl.getGrapText(option) || 12;
        var legend = Echarts.optionTmpl.getLegend(option);
        var showLegend, legendPositonX, legendPositonY;
        if(legend){
            showLegend = legend.showLegend;
            legendPositonX=legend.X  || 'left';
            legendPositonY=legend.Y || 'top';
        }

        //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
        var specialPros = Echarts.optionTmpl.getSpecialPros(option);
        if( specialPros ){
            var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "（Gbps）" : "（"+specialPros.ylUnit+"）";
            var yrUnit = specialPros.yrUnit == undefined || specialPros.yrUnit == "" ?  "（%）" : "（"+specialPros.yrUnit+"）";
            var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : "（"+specialPros.xUnit+"）";
            var ylName = specialPros.ylName || "速率";
            var yrName = specialPros.yrName || "带宽利用率";
            var xName = specialPros.xName || "";
        }else{
            var ylUnit = "（Gbps）";
            var yrUnit = "（%）";
            var ylName = "速率";
            var yrName = "带宽利用率";
            var xName = "";
            var xUnit = "";
        }

        if(data == null || data.length == 0){
            return ;
        }
        //var _Param = option.queryParam || {link_name:"移动竹山路—电信鼓楼",link_name_reverse:"电信鼓楼—移动竹山路"};
        var _Param = {link_name : data[0].name1||"",link_name_reverse : data[0].name2||""};
        if(_Param.link_name == '' && _Param.link_name_reverse==''){
            return getEmptyChartOption("zldline5",option);
        }

        //取坐标轴范围
        var axisValueRangeSpeed = 0;
        var axisValueRangeUsage = 0;
        var timetiker = [];
        var speedUp = [];
        var speedDown = [];//注意[1]取反
        var speedDownAbs = [];
        var usageUp = [];
        var usageDown = [];//注意[1]取反
        var usageDownAbs = [];
        //根据resp进行数据准备
        $.each(data,function(i,d){
            timetiker.push(d.xtime);
            speedUp.push(parseFloat(d.llinkspeed_up));
            speedDownAbs.push(parseFloat(d.llinkspeed_down));
            speedDown.push(-parseFloat(d.llinkspeed_down));
            usageUp.push(parseFloat(d.bd_usage_rate_up));
            usageDownAbs.push(parseFloat(d.bd_usage_rate_down));
            usageDown.push(-parseFloat(d.bd_usage_rate_down));
        })
        axisValueRangeSpeed = Math.max.apply(null, speedUp) > Math.max.apply(null, speedDownAbs)?Math.ceil(Math.max.apply(null, speedUp)):Math.ceil(Math.max.apply(null, speedDownAbs));
        axisValueRangeUsage = Math.max.apply(null, usageUp) > Math.max.apply(null, usageDownAbs)?Math.ceil(Math.max.apply(null, usageUp)):Math.ceil(Math.max.apply(null, usageDownAbs));
        //axisValueRangeSpeed和axisValueRangeUsage需要取整
        axisValueRangeSpeed = axisValueRangeSpeed+20-axisValueRangeSpeed%10;
        axisValueRangeUsage = axisValueRangeUsage+10-axisValueRangeUsage%10;

        var speedColor = "#ff8251";
        var usageColor = "#1fb9f7";

        var optioninfo = {
            title : {
                show:false
            },
            grid : {
                borderWidth :0,
                borderColor :'#fff'
            },
            backgroundColor:CQbackGroundColor,
            tooltip : {
                trigger: 'axis',
                formatter: function (params) {
                    var res = params[0].name;
                    var _val  ="" ;
                    var table ;
                    if(params.length){
                        table = '<table width="360px" border="1" cellpadding="0" cellspacing="0" class="tip_table">';
                        table += '<tr height="25px"><td colspan="3" style="color:#fff;font-weight:bold;border: rgba(57,152,236,0.5) 1px solid;">&nbsp;【'+ params[0].name+'】</td></tr>';
                        table += '<tr align="center" height="25px">'+// style="color:#0098f8"
                            '<td width="50%">互联链路信息</td>'+
                            '<td width="20%" style="color:'+speedColor+'">速率</td>'+
                            '<td width="30%" style="color:'+usageColor+'">带宽利用率</td>'+
                            '</tr>';
                        var trstr = "";
                        if(params.length == 4){
                            trstr += '<tr align="center" height="25px">';
                            trstr +=  '<td  >'+ _Param.link_name || "" +'</td>';
                            trstr +=   '<td style="color:'+speedColor+'" >'+ Math.abs(params[0].value||0) + "Gbps"+'</td>';
                            trstr +=   '<td style="color:'+usageColor+'">'+ Math.abs(params[1].value||0) + "%"+'</td>';
                            trstr +="</tr/>";
                            trstr += '<tr align="center" height="25px">';
                            trstr +=  '<td >'+ _Param.link_name_reverse || "" +'</td>';
                            trstr +=   '<td style="color:'+speedColor+'">'+ Math.abs(params[2].value||0) + "Gbps"+'</td>';
                            trstr +=   '<td style="color:'+usageColor+'">'+ Math.abs(params[3].value||0) + "%"+'</td>';
                            trstr +="</tr/>";
                        }else if(params.length ==2){

                            if(params[0].seriesName.indexOf("速率")>-1){
                                trstr += '<tr align="center" height="25px">';
                                trstr +=  '<td >'+ _Param.link_name || "" +'</td>';
                                trstr +=   '<td style="color:'+speedColor+'">'+ Math.abs(params[0].value||0) + "Gbps"+'</td>';
                                trstr +=   '<td style="color:'+usageColor+'">0%</td>';
                                trstr +="</tr/>";
                                trstr += '<tr align="center" height="25px">';
                                trstr +=  '<td >'+ _Param.link_name_reverse || "" +'</td>';
                                trstr +=   '<td style="color:'+speedColor+'">'+ Math.abs(params[1].value||0) + "Gbps"+'</td>';
                                trstr +=   '<td style="color:'+usageColor+'">0%</td>';
                                trstr +="</tr/>";
                            }else{
                                trstr += '<tr align="center" height="25px">';
                                trstr +=  '<td>'+ _Param.link_name || "" +'</td>';
                                trstr +=  '<td style="color:'+speedColor+'">0Gbps</td>';
                                trstr +=   '<td style="color:'+usageColor+'">'+ Math.abs(params[0].value||0) + "%"+'</td>';
                                trstr +=  "</tr/>";
                                trstr += '<tr align="center" height="25px">';
                                trstr +=  '<td >'+ _Param.link_name_reverse || "" +'</td>';
                                trstr +=  '<td style="color:'+speedColor+'">0Gbps</td>';
                                trstr +=   '<td style="color:'+usageColor+'">'+ Math.abs(params[1].value||0) + "%"+'</td>';
                                trstr +="</tr/>";
                            }
                        }else{
                            trstr += '<tr align="center" height="25px"><td colspan="3">无</td></tr>';
                        }
                        table +=trstr;
                        table +="<table/>";
                    }
                    var data = {
                        name1 : _Param.link_name,
                        name2 : _Param.link_name_reverse,
                        xtime : params[0].name
                    }
                    window._echart_line_hoverData_X = data;
                    return table;
//            	            for(i = 0; i <= params.length - 1; i++){
//            	            	if(i==0)
//            	            		res +=	'<br/>' + _Param.link_name;
//            	            	if(i==2)
//            	            		res +=	'<br/>' + _Param.link_name_reverse;
//            	            	//处理tooltip单位问题
//            	            	var unit = params[i].seriesName.substring(params[i].seriesName.indexOf("(")+1,params[i].seriesName.indexOf(")"));
//            	            	var val = params[i].value != null ? params[i].value : 0;
//            	            	res += '<br/>' + params[i].seriesName.substring(0,params[i].seriesName.indexOf("(")) + ': ' + Math.abs(val)+unit;
//            	            	_val = val;
//            	            }

                },
                textStyle:{
                    fontSize : 12,
                    align:"left"
                }
            },
            legend: {
                show : showLegend,
                orient: 'horizontal',
                x: legendPositonX,
                y: legendPositonY,
                textStyle:{
                    color:"#ccc",
                    fontFamily : "Microsoft YaHei"
                },
                data: [
                    {
                        name:ylName + ylUnit,//'速率(Gbps)',
                        textStyle:{fontWeight:'bold', color:speedColor}
                    },
                    {
                        name:yrName + yrUnit,//'带宽利用率(%)',
                        textStyle:{fontWeight:'bold', color:usageColor}
                    }
                ]
            },
            dataZoom : {
                show : false,
                realtime: true,
                start : 0,
                end : 100
            },
            xAxis : [
                {
                    name:xName + xUnit,
                    type : 'category',
                    boundaryGap : false,
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'white',
                            type: 'solid',
                            width: 2
                        }
                    },
                    axisTick: {onGap:false},
                    splitLine: {show:false},
                    data : timetiker,
                    axisLabel: {
                        textStyle : {
                            color : 'rgb(3, 167, 234)'
                            //fontSize : grapTextSize
                        }
                    }
                }
            ],
            yAxis : [
                {
                    name:ylName + ylUnit,//'速率(Gbps)',
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: speedColor,
                            type: 'solid',
                            width: 2
                        }
                    },
                    type : 'value',
                    scale:true,
                    splitNumber: 5,
                    boundaryGap: [0,0],
                    splitLine: {show:false},
                    axisLabel: {
                        formatter: function (v) {
                            return Math.abs(v)
                        },
                        textStyle : {
                            color: speedColor,
                            //fontSize : grapTextSize
                        }
                    },
                    min:-axisValueRangeSpeed,
                    max:axisValueRangeSpeed
                },
                {
                    name:yrName + yrUnit,//'带宽利用率(%)',
                    boundaryGap : false,
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: usageColor,
                            type: 'solid',
                            width: 2
                        }
                    },
                    type : 'value',
                    scale:true,
                    splitNumber: 5,
                    splitLine: {show:false},
                    boundaryGap: [0,0],
                    axisLabel: {
                        formatter: function (v) {
                            return Math.abs(v)
                        },
                        textStyle : {
                            color: usageColor,
                            //fontSize : grapTextSize
                        }
                    },
                    min:-axisValueRangeUsage,
                    max:axisValueRangeUsage
                }
            ],
            series : [
                {
                    name:ylName + ylUnit,//'速率(Gbps)',
                    type:'line',
                    yAxisIndex: 0,
                    symbol: 'none',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:speedUp
                },
                {
                    name:yrName + yrUnit,//'带宽利用率(%)',
                    type:'line',
                    yAxisIndex: 1,
                    symbol: 'none',
                    smooth:true,
                    data:usageUp
                },
                {
                    name:ylName + ylUnit,//'速率(Gbps)',
                    type:'line',
                    yAxisIndex: 0,
                    symbol: 'none',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:speedDown
                },
                {
                    name:yrName + yrUnit,//'带宽利用率(%)',
                    type:'line',
                    yAxisIndex: 1,
                    symbol: 'none',
                    smooth:true,
                    data:usageDown
                }
            ]
        };
        return optioninfo;
    },

    // 重庆折线图1
    getCQline01 : function(data,option){


        var grapTextSize = Echarts.optionTmpl.getGrapText(option) || 12;
        var legend = Echarts.optionTmpl.getLegend(option);
        var showLegend, legendPositonX, legendPositonY;
        if(legend){
            showLegend = legend.showLegend;
            legendPositonX=legend.X  || 'left';
            legendPositonY=legend.Y || 'top';
        }

        //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
        var specialPros = Echarts.optionTmpl.getSpecialPros(option);
        if( specialPros ){
            var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "" : specialPros.ylUnit;
            var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : specialPros.xUnit;
            var ylName = specialPros.ylName || "";
            var xName = specialPros.xName || "";
        }else{
            var ylUnit = "";
            var ylName = "";
            var xName = "";
            var xUnit = "";
        }


        var stackline_datas = Echarts.dataFormat.groupData(data, 'line', true)

        var option = {
            legend : {
                show : showLegend,
                orient: 'horizontal',
                x: legendPositonX,
                y: legendPositonY,
                data : stackline_datas.category,
                textStyle : {
                    color : "#fff",
                    fontFamily : "Microsoft YaHei"
                },
                padding : 5
            },
            backgroundColor:CQbackGroundColor,
            grid : {
                x2:60,
                y2:50,
                x:60,
                y:30,
                borderWidth: 0
            },
            tooltip : {
                trigger: 'axis',
                textStyle:{
                    fontSize : 12,
                    align : "left"
                },
                formatter: function (v) {
                    var content = v[0].name + "<br/>";
                    var nv = _.chain(v).sortBy(function(o) { return parseFloat(o.value,10); }).reverse().value();
                    nv.forEach(function(it){
                        content += it.seriesName +"："+(it.data == undefined? 0 :it.data) + ylUnit +'<br/>';
                    })
                    window._echart_line_hoverData_X = { value : v[0].data,name:v[0].name};
                    return content;
                }
            },
            xAxis : [
                {
                    name :xName + xUnit,
                    type : 'category',
                    boundaryGap : false,
                    splitLine: {
                        show:false,
                        lineStyle:{
                            color: 'rgba(50, 130, 193, 0.39)',
                            type : 'dashed'
                        }
                    },
                    data:stackline_datas.xAxis,
                    axisLabel : {
                        textStyle : {
                            color : 'rgb(3, 167, 234)',
                            //fontSize : grapTextSize
                        }
                    },
                    axisLine : {
                        lineStyle :{
                            color: "rgba(255,255,255,0.5)",
                            width : 1
                        }
                    },
                    axisTick :{
                        show :false
                    }
                }
            ],
            yAxis : [
                {
                    name:ylName + ylUnit,
                    type : 'value',
                    splitLine: {
                        show:false,
                        lineStyle:{
                            color: 'rgba(50, 130, 193, 0.39)',
                            type : 'dashed'
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            color : 'rgb(3, 167, 234)',
                            //fontSize : grapTextSize
                        }
                    },
                    axisLine : {
                        lineStyle :{
                            color: "rgba(255,255,255,0.5)",
                            width: 1,
                        }
                    },
                    axisTick :{
                        show :false
                    }
                }
            ],
            series : stackline_datas.series
        };
        return option;
    },


    // 重庆折线图2
    getCQline02 : function(data,option){

        var grapTextSize = Echarts.optionTmpl.getGrapText(option) || 12;
        var legend = Echarts.optionTmpl.getLegend(option);
        var showLegend, legendPositonX, legendPositonY;
        if(legend){
            showLegend = legend.showLegend;
            legendPositonX=legend.X  || 'left';
            legendPositonY=legend.Y || 'top';
        }

        //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
        var specialPros = Echarts.optionTmpl.getSpecialPros(option);
        if( specialPros ){
            var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "" : specialPros.ylUnit;
            var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : specialPros.xUnit;
            var ylName = specialPros.ylName || "";
            var xName = specialPros.xName || "";
        }else{
            var ylUnit = "";
            var ylName = "";
            var xName = "";
            var xUnit = "";
        }

        var stackline_datas = Echarts.dataFormat.groupData(data, 'line', false)

        stackline_datas.series.forEach(function(it){
            it.smooth=true;
        })
        var maxin = Utils.getMaxmin(data);
        var minNum = maxin.min - (maxin.max - maxin.min) * 0.05;
        var maxNum = maxin.max + (maxin.max - maxin.min) * 0.05;
        minNum = minNum < 0 ? 0 : minNum;

        var option = {
            legend : {
                data : stackline_datas.category,
                show : showLegend,
                orient: 'horizontal',
                x: legendPositonX,
                y: legendPositonY,
                textStyle : {
                    color : "#fff" ,
                    fontFamily : "Microsoft YaHei"
                },
                padding : 5
            },
            backgroundColor:CQbackGroundColor,
            grid : {
                x2:60,
                y2:50,
                x:60,
                y:40,
                borderWidth: 0
            },
            tooltip : {
                trigger: 'axis',
                textStyle:{
                    fontSize : 12,
                    align : "left"
                },
                formatter: function (v) {
                    var content = v[0].name + "<br/>";
                    var nv = _.chain(v).sortBy(function(o) { return parseFloat(o.value,10); }).reverse().value();
                    nv.forEach(function(it){
                        content += it.seriesName +"：" + (it.data == undefined? 0 :it.data)  + ylUnit +'<br/>';
                    })
                    window._echart_line_hoverData_X = { value : v[0].data,name:v[0].name};
                    return content;
                }
            },
            xAxis : [
                {
                    name : xName + xUnit,
                    type : 'category',
                    boundaryGap : false,
                    splitLine: {
                        show:false,
                        lineStyle:{
                            color: 'rgba(50, 130, 193, 0.39)',
                            type : 'dashed'
                        }
                    },
                    data:stackline_datas.xAxis,
                    axisLabel : {
                        textStyle : {
                            color : 'rgb(3, 167, 234)',
                        }
                    },
                    axisLine : {
                        lineStyle :{
                            color: "rgba(255,255,255,0.5)",
                            width : 1
                        }
                    },
                    axisTick :{
                        show :false
                    }
                }
            ],
            yAxis : [
                {
                    name:ylName + ylUnit,
                    type : 'value',
                    splitLine: {
                        show:false,
                        lineStyle:{
                            color: 'rgba(50, 130, 193, 0.39)',
                            type : 'dashed'
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            color : 'rgb(3, 167, 234)',
                        },
                        interval:"auto",
                        formatter : function(it){
                            return _.floor(it);
                        }
                    },
                    axisLine : {
                        lineStyle :{
                            color: "rgba(255,255,255,0.5)",
                            width: 1,
                        }
                    },
                    axisTick :{
                        show :false
                    },
                    min : minNum,
                    max : maxNum
                }
            ],
            series : stackline_datas.series
        };

        return option;
    },

    //TODO
    // 普通单线图
    getCQline03 : function(data,option){
        var grapTextSize = Echarts.optionTmpl.getGrapText(option) || 12;
        var legend = Echarts.optionTmpl.getLegend(option);
        var showLegend, legendPositonX, legendPositonY;
        if(legend){
            showLegend = legend.showLegend;
            legendPositonX=legend.X  || 'left';
            legendPositonY=legend.Y || 'top';
        }

        //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
        var specialPros = Echarts.optionTmpl.getSpecialPros(option);
        if( specialPros ){
            var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "" : specialPros.ylUnit;
            var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : specialPros.xUnit;
            var ylName = specialPros.ylName || "";
            var xName = specialPros.xName || "";
        }else{
            var ylUnit = "";
            var ylName = "";
            var xName = "";
            var xUnit = "";
        }
        option.yName = ylName;
        option.yUnit = ylUnit;
        option.data = data;

        var o = propsUtil.getBaseLine(option);
        return o;
    },


    //普通柱图
    getCQbar02 : function(data,option){

        var grapTextSize = Echarts.optionTmpl.getGrapText(option) || 12;
        var legend = Echarts.optionTmpl.getLegend(option);
        var showLegend, legendPositonX, legendPositonY;
        if(legend){
            showLegend = legend.showLegend;
            legendPositonX=legend.X  || 'left';
            legendPositonY=legend.Y || 'top';
        }
        var ylUnit = "";
        var ylName = "";
        var xName = "";
        var xUnit = "";
        //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
        var specialPros = Echarts.optionTmpl.getSpecialPros(option);
        if( specialPros ){
            var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "" : specialPros.ylUnit;
            var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : specialPros.xUnit;
            var ylName = specialPros.ylName || "";
            var xName = specialPros.xName || "";
        }
        if(option == undefined){
            option = {};
        }
        if(data && data.length ==0){
            return {};
        }
        option.data = data;

        option.yName = ylName;
        option.yUnit = ylUnit;

        return propsUtil.getVerticalBar(option)
    },
    // 重庆横向柱图
    //TODO
    getCQbar01 : function(data,option){
        var grapTextSize = Echarts.optionTmpl.getGrapText(option) || 12;
        var legend = Echarts.optionTmpl.getLegend(option);
        var showLegend, legendPositonX, legendPositonY;
        if(legend){
            showLegend = legend.showLegend;
            legendPositonX=legend.X  || 'left';
            legendPositonY=legend.Y || 'top';
        }
        var ylUnit = "";
        var ylName = "";
        var xName = "";
        var xUnit = "";
        //获取专有属性  左纵坐标名称及单位ylName ylUnit  右纵坐标名称及单位yrName yrUnit
        var specialPros = Echarts.optionTmpl.getSpecialPros(option);
        if( specialPros ){
            var ylUnit = specialPros.ylUnit == undefined || specialPros.ylUnit == "" ?  "" : specialPros.ylUnit;
            var xUnit = specialPros.xUnit == undefined || specialPros.xUnit == "" ?  "" : specialPros.xUnit;
            var ylName = specialPros.ylName || "";
            var xName = specialPros.xName || "";
        }
        if(option == undefined){
            option = {};
        }

        if(data && data.length ==0){
            return {};
        }

        option.data = data;
        option.yName = ylName;
        option.yUnit = ylUnit;
        var op = propsUtil.getHorizontalBar(option);

        return op;

    }

};



// 属性方法工具类
var propsUtil = (function (me){

    var axisCommon = {
        getLabel : function(op){
            var obj = {
                textStyle : {
                    color : 'rgb(3, 167, 234)',
                }
            };
            if(op.axisLabel){
                obj.rotate = op.axisLabel["rotate"];
                obj.interval = op.axisLabel["interval"];
            };
            return  obj
        },
        getLine : function(op){
            return {
                lineStyle :{
                    color: "rgba(255,255,255,0.5)",
                    width: 1
                }
            }
        },
        getName : function(name , unit){
            return name + unit ;
        }

    }
    var getTooltip = function(){
        return  {
            trigger: 'item',
            textStyle:{
                fontSize : 12,
                align : "left"
            },
            formatter: function (params) {
                var info = params.data.info;
                if(info){
                    return info;
                }else{
                    return params.name + "<br/>" + params.value;
                }
            }
        }
    }
    var colorList =["#C96565","#CD8366","#CA9D6C","#CE9451","#D9A126",
        "#D1B814","#B1D114","#77D011","#14D13E","#15D184",
        "#17CECF", "#179AD0","#1566D2", "#294fa9","#6F3FBC",
        "#9D39BB","#4F438C"];

    //TODO
    return me = {

        getPointCQMap : function(op){
            var option = me.getMapOption(op);
            option.series[0].markPoint = me.getMarkPointData(op.data);
            option.series[0].geoCoord = cqGeoCoord;
            option.series[0].data = [];
            option.series[0].roam= true;
            return option;
        },
        getRangeCQMap : function(op){
            var option = me.getMapOption(op);
            option.series[0].roam= true;
            return option;
        },
        getRangeWorldMap : function(op){
            var option = me.getMapOption(op);
            option.series[0].geoCoord = worldGeoCoord;
            option.series[0].nameMap = worldName;
            option.series[0].mapType ='world';
            option.series[0].roam= true;
            return option;
        },


        getMapSeries : function(op){
            var series = op.series;
            var itemStyle2 = {
                normal : {
                    borderColor: "#008FBF",
                    borderWidth: 0.5,
                    areaStyle: {
                        color: '#00AFFE'
                    }
                },
                emphasis : {
                    label: {
                        show: false
                    },
                    color : "rgba(235, 200, 5,0.7)"
                }
            };
            series[0].itemStyle = itemStyle2;
            return series;
        },

        getMarkPointData : function(data){
            var areaData = [];
            data.forEach(function(d){
                areaData.push({
                    name : d.name,
                    value : d.value
                })
            })
            var markPoint = {
                clickable:false,
                symbolSize: 12,
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        }
                    },
                    emphasis: {
                        label: {
                            show: false,
                        }
                    }
                },
                data :areaData
            }
            return markPoint;
        },

        getMapOption : function(op){
            var maxin = Utils.getMaxmin(op.data);
            var _series = me.getMapSeries(op);

            var isRefresh = op.showRestore;

            var mapTipData = {};
            if(op.data.length){
                op.data.forEach(function(it){
                    mapTipData[it.name] = it.info;
                })
            }

            var option = {
//					backgroundColor : "rgba(0,0,0,0)",
                dataRange :	{
                    x: 'left',
                    y: 'top',
                    calculable: true,
                    color: ['#d94e5d','#eac736','#50a3ba'],
                    min: maxin.min,//0,
                    max: maxin.max,//1000,
                    realtime:false,
                    textStyle:{
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    enterable: true,
                    position : function(p) {
                        return [p[0] +5, p[1] - 40];
                    },
                    formatter: function(params, ticket, callback){
                        var str = mapTipData[params.name]||params.name;
                        return str;
                    },
                    textStyle : {
                        color: '#fff',
                        fontSize :12,
                        align:"left"
                    }
                },
                series:_series
            }


            if(isRefresh){
                option.toolbox = {
                    show : true,
                    orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                    x: 'right',
                    y: 'top',
                    backgroundColor: 'rgba(0,0,0,.3)',
                    padding: 5,
                    feature : {
                        restore :{
                            show : true,
                            title : '刷新',
                            color : '#fff',
                        }
                    },
                    textStyle : {
                        fontFamily : "Microsoft YaHei",
                        fontSize : 12
                    }
                };
            }
            return option;
        },


        // 普通单线图	
        getBaseLine : function(op){
            var sObj = me.getOneLineData(op.data);
            var yConfig = me.getYAxis({
                yName :op.yName||"",
                yUnit :op.yUnit||"",
                type : "value",
            });
            var xConfig = me.getXAxis({
                xName : op.xName||"",
                xUnit : op.xUnit||"",
                type : "category",
                data : sObj.xAxis
            })

            if(op.data.length ==0 || (op.data.length == 1 && op.data.value =='')){
                return me._getNullConfig(xConfig,yConfig,'line');
            }

            var maxin = Utils.getMaxmin(op.data);
            var maxNum = maxin.max;
            var minNum = maxin.min;
            var min =  minNum  - ( maxNum -  minNum) * 0.05;
            var max =  maxNum + ( maxNum -  minNum) * 0.05;
            max = max == 0 ? 100 : max;
            min = min < 0 ? 0 : min;

            xConfig.boundaryGap=false;
            xConfig.max = max||5;
            xConfig.min = min||0;


            return  {
                grid : {
                    borderWidth: 0,
                    x:60,
                    y:20,
                    x2:40,
                    y2:40
                },
                yAxis: [yConfig],
                backgroundColor:CQbackGroundColor,
                tooltip : {
                    trigger: 'axis',
                    textStyle:{
                        fontSize : 12,
                        align : "left"
                    },
                    formatter: function (params) {
                        var info = params[0].data.info;
                        window._echart_line_hoverData_X = { name : params[0].name,value : params[0].value};
                        if(info){
                            return info;
                        }else{
                            return params[0].name + "<br/>" + params[0].value;
                        }
                    }
                },
                xAxis:[xConfig],
                series: sObj.series
            }
        },

        // 普通柱图(非分组)	
        getVerticalBar : function(op){
            console.log(1)
            var dd = me.getBarSeriesData(op.data);
            var yConfig = me.getYAxis({
                yName :op.yName||"",
                yUnit :op.yUnit||"",
                type : "value",
            });
            var xConfig = me.getXAxis({
                xName : op.xName||"",
                xUnit : op.xUnit||"",
                type : "category",
                data : dd.xAxis,
                axisLabel:{
                    rotate:60,
                    interval: 0
                }
            })
            return me._getBar(xConfig,yConfig,dd.series);
        },


        // 横向柱图(非分组)
        getHorizontalBar : function(op){
            var dd = me.getBarSeriesData(op.data);
            var yConfig = me.getYAxis({
                yName :op.yName||"",
                yUnit :op.yUnit||"",
                type : "category",
                data : dd.xAxis
            });
            var xConfig = me.getXAxis({
                xName : op.xName||"",
                xUnit : op.xUnit||"",
                type : "value",
            })
            return {
                grid : {
                    x:120,
                    y:30,
                    x2:30,
                    y2:50,
                    borderWidth: 0
                },
                backgroundColor:CQbackGroundColor,

                yAxis: [yConfig],
                tooltip : getTooltip(),
                xAxis:[xConfig],
                series: dd.series
            };

        },

        _getBar : function(xConfig,yConfig,series){
            return  {
                grid : {
                    x:60,
                    y:15,
                    x2:20,
                    y2:50,
                    borderWidth: 0,
                    height:"55%",
                    width:"70%"
                },
                backgroundColor:CQbackGroundColor,
                yAxis: [yConfig],
                tooltip : getTooltip(),
                xAxis:[xConfig],
                series: series
            }
        },

        // 获取单分组data
        getOneData : function(data){
            var xAxis = [];
            var _data = [];
            data.forEach(function(it){
                xAxis.push(it.name);
                _data.push({value : it.value,name : it.name, info:it.info || ""});
            })
            return {
                xAxis :xAxis ,
                data : _data
            }
        },

        // 获得单线图数据
        getOneLineData : function(data,op){
            var oneData = me.getOneData(data);
            var series = [];
            series.push({
                type : "line",
                data : oneData.data,
                smooth:true,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var color = colorList[params.dataIndex] ;
                            if(color == undefined){
                                var index = params.dataIndex % colorList.length ;
                                color = colorList[index]
                            }
                            return color;
                        }
                    }
                }
            });
            return {
                series:series,
                xAxis: oneData.xAxis
            };
        },


        // 获得普通柱图的series数据
        getBarSeriesData : function(data,op){
            var oneData = me.getOneData(data);
            var series = [];
            series.push({
                type : "bar",
                data : oneData.data,
                smooth:true,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var color = colorList[params.dataIndex] ;
                            if(color == undefined){
                                var index = params.dataIndex  % (colorList.length -1)  ;
                                color = colorList[index-1]
                            }
                            return color;
                        }
                    }
                }
            })
            return {
                series:series,
                xAxis: oneData.xAxis
            };
        },
        // yAxis
        getYAxis : function(op){
            var _o =$.extend({
                name : op.yName,
                unit : op.yUnit
            },_.omit(op, ['yName', 'yUnit']));
            return  me._getAxis(_o);
        },
        // xAxis
        getXAxis : function(op){
            var _o =$.extend({
                name : op.xName,
                unit : op.xUnit
            },_.omit(op, ['xName', 'xUnit']));
            return  me._getAxis(_o);
        },

        // 获取bar的yAxis 	
        _getAxis : function(op,data){
            var obj = {
                name : axisCommon.getName(op.name,op.unit),
                axisLabel :axisCommon.getLabel(op),
                splitLine:false,
                axisLine : axisCommon.getLine(),
                axisTick :{ show :false }	,
            }
            if(op.type){
                obj.type = op.type || 'category';
            }
            if(op.data){
                obj.data = op.data || [];
            }
            return obj;
        },

        // 空数据处理
        _getNullConfig:function(xConfig,yConfig,type){
            xConfig.data = ['无数据'];
            return  {
                grid : {
                    borderWidth: 0,
                    x:60,
                    y:20,
                    x2:20,
                    y2:40,
                },
                xAxis : [xConfig],
                yAxis : [yConfig],
                series: [{type:type,data:[0]}]
            }
        },


    }

})();



// 获得染色图数据
function getColorData(){

    // 蓝色区域25 143 212     41 164 101     231 141 0      228 74 0      51 185 218     173 51 218
    var color1 = {
        keys : ['美国','加拿大','墨西哥','格陵兰','巴拿马','伯利兹','海地','多明尼加共和国','哥斯达黎加','尼加拉瓜','巴哈马','古巴','波多黎各','洪都拉斯','牙买加','萨尔瓦多','危地马拉'],
        color : "rgba(25,143,212,0.3)",
        borderColor : "rgb(25,143,212)",
        hoverColor : "rgba(25,143,212,0.5)"
    }
    //紫色区域 173 51 218
    var color2 = {
        keys :['哥伦比亚','委内瑞拉','特里尼达和多巴哥','厄瓜多尔',"法属圭亚那",'圭亚那','苏里南','巴西','秘鲁','玻利维亚','巴拉圭','乌拉圭','阿根廷','智利','福克兰群岛'],
        color : "rgba(173,51,218,0.02)",
        borderColor:"rgb(173,51,218)",
        hoverColor : "rgba(173,51,218,0.3)"
    }
    // 绿色区域  41 164 101
    var color3 = {
        keys :['俄罗斯','挪威','塞浦路斯','北塞浦路斯','格鲁吉亚','亚美尼亚','冰岛',"塞尔维亚共和国","阿塞拜疆","卢森堡","斯洛文尼亚","黑山","波斯尼亚和黑塞哥维那","白俄罗斯","科索沃","克罗地亚","马其顿","保加利亚","摩尔多瓦","阿尔巴尼亚","希腊",'瑞典','芬兰','英国','爱尔兰','丹麦','德国','意大利','荷兰','法国','西班牙','葡萄牙','乌克兰','波兰','立陶宛','爱沙尼亚','拉脱维亚','比利时','瑞士',"奥地利","捷克共和国","斯洛伐克","匈牙利","罗马尼亚"],
        color : "rgba( 41,164,101,0.05",
        borderColor:"rgb(41,164,101)",
        hoverColor : "rgba(41,164,101,0.3)"
    }
    // 黄色 231 141 0
    var color4 = {
        keys:['塞内加尔','冈比亚',"卢旺达","布隆迪","纳米比亚","南非","莱索托","斯威士兰","马达加斯加","博茨瓦纳","津巴布韦","莫桑比克","几内亚比绍","乌干达","肯尼亚","坦桑尼亚联合共和国","马拉维","安哥拉","赞比亚","多哥","贝宁","尼日利亚","喀麦隆","中非共和国","刚果共和国","刚果民主共和国","加蓬","赤道几内亚","几内亚","塞拉利昂","利比里亚","象牙海岸","布基纳法索","加纳",'摩洛哥',"阿尔及利亚","突尼斯","利比亚","埃及","西撒哈拉","毛里塔尼亚","马里","尼日尔","乍得","苏丹","厄立特里亚","吉布提","索马里兰","索马里","埃塞俄比亚","南苏丹"],
        color : "rgba(231,141,0,0.03)",
        borderColor :"rgb(231,141,0)",
        hoverColor :"rgba(231,141,0,0.3)"
    }

    // 橘黄 228 74 0
    var color5 = {
        keys:['中国',"朝鲜","东帝汶","韩国","日本","土耳其","伊拉克",'叙利亚','西岸','黎巴嫩',"斯里兰卡","科威特","约旦","以色列","印尼","马来西亚","文莱","菲律宾","巴布亚新几内亚","所罗门群岛","沙特阿拉伯","也门","阿曼","阿联酋","卡塔尔","印度","尼泊尔","不丹","孟加拉国","缅甸","泰国","越南","老挝","柬埔寨","蒙古","哈萨克斯坦","乌兹别克斯坦","吉尔吉斯斯坦","塔吉克斯坦","阿富汗","巴基斯坦","阿富汗","土库曼斯坦","伊朗","阿萨拜疆"],
        color : "rgba(228,74,0,0.3)",
        borderColor :"rgb(228,74,0)",
        hoverColor:"rgba(228,74,0,0.5)"
    }

    // 浅绿 41 164 101
    var color6 = {
        keys:['澳大利亚','法属南半球和南极领地','新西兰','新喀里多尼亚','瓦努阿图','斐'],
        color:"rgba(167,222,19,0.3)",
        borderColor:"rgb(167,222,19)",
        hoverColor:"rgba(167,222,19,.5)"
    }

    var fillData = [color1,color2,color3,color4,color5,color6];

    // 拼装地图name样式 
    var nameStyle = {};
    fillData.forEach(function(it){
        it.keys.forEach(function(name){
            nameStyle[name] = {
                color : it.color,
                borderColor : it.borderColor,
                hoverColor : it.hoverColor
            }
        });
    })

    var worldNameArr = worldGeoCoord;
    var ckeys = Object.keys(worldNameArr);
    var arr = [];
    ckeys.forEach(function(it){
        var d = {
            name : it,
            value : 1
        }
        if(nameStyle[it]){
            d.itemStyle = {
                normal : {
                    label : {show:false},
                    areaStyle :{
                        color: '#00AFFE'
                    },
                    borderColor : nameStyle[it].borderColor,
                    borderWidth : 1
                },
                emphasis:{
                    label:{show:false},
                    color:nameStyle[it].hoverColor
                }
            }
//				d.value = nameStyle[it].data;
        }

        arr.push(d)
    })



    return arr;
}

function getAttactMapSeries(option){

    var maxmin = {
        min : 0,
        max : 50
    };
    if(option.data.lineData.length > 0){
        var min = 0, max = 0;
        var waitObj = _.chain(option.data.pointData).map(function(it){return it.value});
        min = _.parseInt(waitObj.min().value());
        max = _.parseInt(waitObj.max().value());
        maxmin.min = min ;
        maxmin.max = max ;
    }


    var series = {
        name : 'map',
        type: 'map',
        roam: true,
        mapType: option.mapType,
        itemStyle:{
            normal:{
                borderColor:'#008FBF',
                borderWidth:0.5,
                areaStyle:{
                    color: '#00AFFE'
                },
                textStyle:{
                    fontSize :12
                }
            },
            emphasis: {
                label:{ show:false},
                color : "rgba(235, 200, 5,0.7)"
            }
        },
        data : [],
        markLine : {
            smooth: true,
            symbol: 'circle',
            symbolSize : 2,
            itemStyle : {
                normal: {
                    borderWidth:1,
                    lineStyle :{
                        color : 'rgba(225,73,0,0.8)',
                        type: 'solid'
                    },
//       				 color:'#fff',
//                        borderColor:'rgba(30,144,255,0.5)'
                }
            },
            effect: {
                show: true,
                scaleSize: 1,
                period: 15,
                color: '#fff',
                shadowBlur: 10
            },
            data : option.data.lineData
        },
        markPoint : {
            symbol:'emptyCircle',
            symbolSize : function (v){
                var v=  getMakerEmptyCircleV(v,maxmin);
                return v;
            },
            effect: {
                show: true,
                scaleSize : 0.5,
                shadowBlur : 0
            },
            itemStyle: {
                normal: {
                    label: {show:false}
                }
            },
            data : option.data.pointData
        },
        geoCoord:option.geoCoord
    };

    if(option.nameMap){
        series.nameMap = option.nameMap;
    }

    if(option.colorData){
        series.data = option.colorData;
        series.itemStyle = {
            normal:{
                label : false
            },
            emphasis: {
                label:{ show:false}
            }
        }
    }

    return series;
}

function getMapRangeOption(){
    var dataRange = {
        color  :['rgba(25,143,212,0.05)','rgba(41,164,101,0.05)','rgba(231,141,0,0.05)','rgba(228,74,0,0.05)','rgba(51,185,218,0.05)','rgba(173,51,218,0.05)'],
        show : true,
        splitList: [
            {start: 10 ,color:"#198fd4"},
            {start: 8, end: 10,color:"#29a465"},
            {start: 6, end: 8, color:"#e78d00"},
            {start: 4, end: 6, color:"#e44a00"},
            {start: 2, end: 3, color:"#33b9da"},
            {end: 1, color:"#ad33da"}
        ],
        textStyle :{
            color : "#fff"
        }
    }
    return dataRange;
}

//TODO
// 获取攻击地图数据
function attactMapHelp(op){
    var mapType = op.mapType;
    var rangeOption = getMapRangeOption();
    var isColor = op.isColor;
//		rangeOption.show = false;

    var colorList = ["#22f0c6","#ddff00","#2bcc00","#5057d9","#cc50c2","#ff6624","#39b372","#0066a6","#e5209d","#ffe600","#57cce9","#c054ff","#cb7c3c","#008ee4","#60ff00","#dd7171","#bfb239","#ff9d00","#8032cb","#e53030"];
    var geoCoord =  mapType == "world" ? worldGeoCoord :chinaGeoCoord;
    var serisOp ={
        mapType :mapType =="qianxi" ? "china" :mapType,
        geoCoord :geoCoord ,
        data : getAttactData(op.data,isColor),
    }

    // 是染色图
    if(isColor){
        serisOp.colorData = getColorData();
    }

    if(mapType =="world"){
        serisOp.nameMap = worldName;
    }
    var option = {
        color: colorList,
        tooltip : {
            trigger: 'item',
            formatter : function(params){
                var str = params.name;
                return (str.indexOf('>') === -1) ? str : '';
            },
            textStyle : {
                fontSize : 12
            }
        },
        series: [getAttactMapSeries(serisOp)],
    }

    if(!isColor){
        op.rangeOption.show = false;
        option.dataRange = op.rangeOption;
    }else{
        option.backgroundColor="rgba(0,0,0,0.3)";
    }


    return option;

}


function getAttactData(data,isColor){
    var lineData = [];
    var pointData = [];

    var getLineColor = function(t){
        switch(t){
            case "1": return "rgba(225,73,0,0.8)";
            case "2": return "rgba(187,122,20,0.8)";
            case "3": return "rgba(167,222,19,0.8)";
            case "4": return "rgba(0,233,93,0.8)";
            case "5": return "rgba(251,0,255,0.8)";
            case "6": return "rgba(0,228,255,0.8)";
            default:return "#33b9da";
        }
    }

    data.forEach(function(row){
        var __data = [];
        var _itemStyle ={
            normal: {
                lineStyle: {
//                        	color : getLineColor(row.lineType),
                    type: 'solid',
//                            width: row.lineType || "1",
                    shadowBlur: 10
                }
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        };
        if(isColor){
            _itemStyle.normal.lineStyle.color = getLineColor(row.lineType)
        }

        // 起点
        __data.push({
            name : row.name,
            itemStyle: _itemStyle,
        });
        var targetObj = {name : row.targetname,value : row.value};
        __data.push(targetObj);
        lineData.push(__data);
        pointData.push(targetObj);

    });
    return {
        lineData : lineData,
        pointData : pointData
    }
}






export default Echarts
/**
 * Created by yelingfeng on 2016/7/20.
 */
import $ from "jquery"
import _ from "lodash"


var getBaseTemp = function(){
    var _baseOp = {
        width: "600",
        height: "400",
        dataFormat: "json",
        dataLoadStartMessage : "加载数据中,请稍后...",
        loadMessage:"数据加载中...请稍后",
        dataEmptyMessage :" ",
        dataSource:{
            // fusionchart图表样式
            "chart": {
//		                 "palettecolors": "#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c",
//		                 "palettecolors": "#ff6624,#39b372,#0066a6,#e5209d,#ffe600,#57cce9,#c054ff,#cb7c3c,#008ee4,#60ff00,#dd7171,#bfb239,#ff9d00,#8032cb,#22f0c6,#ddff00,#2bcc00,#5057d9,#cc50c2,#e53030",
                "palettecolors": "#22f0c6,#ddff00,#2bcc00,#5057d9,#cc50c2,#ff6624,#39b372,#0066a6,#e5209d,#ffe600,#57cce9,#c054ff,#cb7c3c,#008ee4,#60ff00,#dd7171,#bfb239,#ff9d00,#8032cb,#e53030",
                "usePlotGradientColor": "1",// 渐变
                "plotGradientColor": "#ffffff",//渐变颜色
                "labelDisplay" : "wrap",
                "yAxisValueDecimals":0,
                //底部横坐标数字样式 字体 大小 颜色
                "labelFont": "Microsoft YaHei",
                "labelFontColor": "#03A7EA",
                "labelFontSize": "12",
                "labelAlpha" : "100",
                "showBorder":"0",
                "showLegend": "1",
                "legendPosition" : "bottom",
                "legendBorderAlpha": "1",
                "legendBgAlpha": "1",
                "legendShadow": "0",
                //左侧纵坐标数字样式 字体 大小 颜色
                "baseFont": "Microsoft YaHei",
                "baseFontSize": "12",
                "baseFontColor": "rgb(3,167,234)",
                "baseAlpha" : "40",
                //背景分割线
                "divLineColor": "#ffffff",//线的颜色
                "divLineAlpha": "20",//线的透明度
                "divLineDashed": "0",//线的类型 0 直线 1虚线
                //svg背景
                "bgColor": "#fff",//背景色
                "bgAlpha": "0",//透明度 0-100
                //canvas画布背景
                "showCanvasBg": "1",
                "canvasBgColor": "#ffffff",
                "canvasBgDepth": "1",
                "canvasBgAlpha":"0",
                //图表柱状体基体
                "showCanvasBase": "1",//是否显示1，0
                "canvasBaseDepth": "5",//基体厚度
                "canvasBaseColor": "#ffffff",//基地颜色
                //数值
                "valueFont": "Microsoft YaHei",//字体
                "valueFontColor": "#e5e5e5",//颜色
                "valueFontSize": "12",//字体大小
                "valueFontBold": "1",//fontweight
                "valueFontItalic": "0",//是否斜体
                "valueAlpha" : "70",
                "showToolTip":"1", //toopTip 显示否1 、0
                "toolTipSepChar":"<br/>",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
//		                 "placevaluesInside": "1",
                "placeValuesInside": "0",
                "showToolTipShadow":"1",//toopTip阴影有无1，0
                "showCanvasBorder": "0",
//		            	 "forceYAxisValueDecimals":"1",
                "adjustDiv":"0",
                "numDivLines":"2",
                "formatNumberScale": "0",
//		            	 "plottooltext":"<div class='fchartTip'>$label</div>",
//
//		                 "captionAlignment"  : "left",//left, center (default), right. // 标题位置
//		                 "alignCaptionWithCanvas" :"1",//在画布区align还是整个图表区
//		                 "captionHorizontalPadding": "10", // 垂直偏移padding量 如果设置居中 忽略
//		                 //主标题
//		                 "captionOnTop" : 1,// 标题位置 居上 还是居下 默认居上 1
//		                 "captionFont": "Arial",
//		                 "captionFontSize": "18",
//		                 "captionFontColor": "#ffffff",
//		                 "captionFontBold": "1",
//		                 //副标题
//		                 "subcaptionFont": "Arial",
//		                 "subcaptionFontSize": "14",
//		                 "subcaptionFontColor": "#ffffff",
//		                 "subcaptionFontBold": "0",

//		                 "paletteColors": "#4094c8, #759b35, #ecca6d, #bf6236, #4a9fb0",//柱状图颜色
//		                 "paletteColors":"#008ee4,#6baa01,#f8bd19,#e44a00,#7bc9da",
                // "xAxisName": "123",
                //"yAxisName": "456",
//		                 "numberPrefix": "",
                //auto, wrap, stagger, rotate or none
                //"showYAxisValues":"0",
                // "labelDisplay": "rotate",
                /*"slantLabels": "1", //45度倾斜*/
                //
                //
                // "labelDisplay": "stagger",
                // "staggerLines": "3",
//		                 exportEnabled : "1",
//////		                 exportAtClientSide : "1",
////		                 exportAtClient :"1",
//		                 exportHandler :"/cubp-platform-pdfactory-web/FCExporter",
//		                 exportAction:"download",
//		                 exportFormats: "PNG=Export as High Quality Image|PDF=Export as PDF File",
//		                 exportTargetWindow: "_self",
//		                 "useEllipsesWhenOverflow" : "1",

                // "labelLink": "http://www.fusioncharts.com/",
                //  "logoURL": "http://static.fusioncharts.com/sampledata/images/Logo-HM-72x72.png",
                // "logoAlpha": "40",
                // "logoScale": "110",
                // "logoPosition": "TR",
                // "chartLeftMargin": "40",
                //   "chartTopMargin": "40",
                //   "chartRightMargin": "40",
                //   "chartBottomMargin": "40",
                // "numberSuffix": "/day",
                // "outCnvBaseFont": "Arial",
                // "outCnvBaseFontSize": "11",
                // "outCnvBaseFontColor": "#55AA00",
//		                  "adjustDiv": "1",
                /*"zeroPlaneColor": "#003366",
                 "zeroPlaneAlpha": "100",
                 "zeroPlaneThickness": "3",*/
                /* "theme": "fint",
                 "exportEnabled " : "1",*/
//		                 "toolTipBgColor":"#ffffff",//toopTip背景色
//		                 "toolTipColor":"#000000",//toopTip字体色
//		                 "toolTipBorderColor":"#eeeeee",//toopTip边框色
                // "valueBorderColor": "#666666",
                // "valueBorderAlpha": "100",
                // "valueBorderPadding": "5",
                // "valueBorderRadius": "6",
                // "valueBorderThickness": "0.5",
                // "valueBorderDashed": "1",
                // "valueBorderDashLen": "4",
                // "valueBorderDashGap": "2",
                // "valueFontSize": "11",
                //"valueBgColor": "#99ccff",
                //"valueBgAlpha": "30",
                // "valueBgHoverAlpha": "60",
                //  "yAxisValuesStep": "3",
                // "placevaluesInside" : 0
                // "showBorder": "0",
                // "borderColor": "#666666",
                // "borderThickness": "4",
                // "borderAlpha": "80"
                /*"showCanvasBorder": "0",
                 "canvasBorderColor": "#666666",
                 "canvasBorderThickness": "4",
                 "canvasBorderAlpha": "80",*/

                /*"showPlotBorder":"1",//柱状体边框
                 "plotBorderColor":"#ffcc66",
                 "plotBorderAlpha":"30",
                 "plotFillAlpha":"70",*/

                //   "bgImage": "http://upload.wikimedia.org/wikipedia/commons/7/79/Misc_fruit.jpg",
                // "bgImageAlpha": "40",
                // "bgImageDisplayMode": "stretch",

            }
        }
    };

    return _baseOp;

}


const Common = {

    create : function(op){
        var config = this.createConfig(op);
        config = this.handlerData(config);
        if(op.isRunTime){
            config.dataEmptyMessage ="数据加载中...";
        }
        var f = this.createF(config);

        if(op.type== "heatmap"){
            this.setData(f,op);
        }
        return f;
    },
    // 获取配置
    createConfig : function(op){
        var config ;
        switch (op.type) {
            case "bar":
                config = this.createBarChart(op);
                break;
            case "line":
                config = this.createLineChart(op);
                break;
            case "pie":
                config = this.createPieChart(op);
                break;
            case "pyramid":
                config = this.createPyramidChart(op);
                break;
            case "gauge":
                config = this.createGaugeChart(op);
                break;
            case "horizontal":
                config = this.createHorizontalChart(op);
                break;
            case "heatmap":
                config = this.createHeatmapChart(op);
                break;
            case "status":
                config = this.createStatusChart(op);
                break;
            default:
                break;
        }
        return config;
    },


    // 获取空对象处理
    getEmptyOption :function(op){
        op.data = [{label:'无数据',value:100,info:'无数据',showValue:0}];
        op.chart.showValues = 0;
        op.chart.showValue = 0;
        op.chart.showYAxisValues  = 0;
        op.chart.showPercentValues = 0;
        op.chart.showCanvasBg = 0;
        return op;
    },


    /**
     * 填充数据
     * @param fchart
     * @param op
     */
    //TODO
    setData : function(fchart, op){
        var config = this.createConfig(op);
        var option = {
            chart : config.dataSource.chart,
            type : op.type
        }
        if(this.getGroupStyle(op)){
            option.categories = config.dataSource.categories;
            option.dataset = config.dataSource.dataset;
            option.data = [];
        }else{
            option.data = config.dataSource.data
        }

        if(op.type !== "heatmap" && op.type !== "horizontal"){

            if(op.type =='bar' || op.type =="pie"){

                if(option.data.length ==1 && option.data[0].name ==''){
                    option = this.getEmptyOption(option);
                }

            }
            else if(op.type == 'line'){

                if(option.dataset[0].data.length == 1){
                    option = this.getEmptyOption(option);
                }


            }else if(config.dataSource.data.length == 1 && config.dataSource.data[0].label ==''){
                option = this.getEmptyOption(option);
            }

        }


        // 条形图
        if(op.type =="horizontal"){
            option.value = config.dataSource.value;
            option.colorRange =  config.dataSource.colorRange;
        }

        // 热力图
        if(op.type == "heatmap"){
            option.dataset =  config.dataSource.dataset;
        }

        this.handlerData(option);
        if(op.isRunTime){
            option.loadMessage = "数据加载中...";
            option.dataEmptyMessage = "数据加载中...";
        }
        if(fchart){
//				console.log(fchart,option);
//				fchart.setChartData(config,"json");
//				console.log(option)
            fchart.setJSONData(option);
        }
    },

    /**
     * 分组状态
     * @param op
     * @returns {Boolean}
     */
    getGroupStyle : function(op){

        var isGroup = false;
        // 柱形图
        if(op.type=="bar" && /4|5/.test(op.childType)){
            isGroup = true;
        }
        // 折线图
        else if(op.type =="line"){
            isGroup = true;
        }

        return isGroup;

    },

    handlerNewData : function(option,type){
        var data = option.dataSource.data;
        if(data){
            var unit = _.find(data,function(it){
                return it.unit != "";
            }).unit;
            if(unit != null){
                if(option.dataSource){
                    if(type == "pie"){
                        option.dataSource.chart.subCaption = unit;
                        option.dataSource.chart.captionOnTop = "0";
                    }else{
                        option.dataSource.chart.yAxisName = unit;
                    }
                }
            }
        }
        return option;
    },

    /**
     * 处理单位问题 如果数据列 存在unit 则添加到y轴后缀
     * @param config
     */
    handlerData:function(option){
        var unit = "";
        var data
        if(option.dataset!==undefined){
            data = option.dataset? option.dataset[0].data : null;
        }else {
            if(option.data!=null){
                data = option.data;
            }
        }
        var Arr = [];
        if(data==null)return option;
        if(data.length > 0){
            data.forEach(function(it){
                if(it.unit){
                    unit = it.unit;
                }
                Arr.push(it.value);
            });
        }


        if(Arr.length){
            var max =  Math.max.apply(Math,Arr);
            var min =  Math.min.apply(Math,Arr);
            max = max == 0 ? 10 : max;

            if(option.chart){

                if(option.chart.yAxisMaxValue && option.chart.yAxisMaxValue > max){
                    option.chart.yAxisMaxValue = option.chart.yAxisMaxValue;
                }else{
                    option.chart.yAxisMaxvalue = max;
                }
                //option.chart.yAxisMaxvalue = max;
//		            option.chart.yAxisMinValue = min;
            }
            if(option.dataSource){
                option.dataSource.chart.yAxisMaxvalue = max;
//					option.dataSource.chart.yAxisMinValue = min;
            }
            // 热力图计算颜色
            if(option.type == "heatmap"){
                option = getHeatMapColorRange(option)
            }

            // 饼图
            if(option.type =="pie"){

            }

            if(max < 1 ){
                option.dataSource.chart.yAxisValueDecimals = 1;
            }

        }

        if(unit !== ""){
            if(option.chart){
//					option.chart.yAxisName = unit;
                if(option.type == "pie"){
                    option.chart.subCaption = unit;
                    option.chart.captionOnTop = "0";
                }else{
                    option.chart.yAxisName = unit;
                }
//					option.chart.xAxisName = unit;
            }



            if(option.dataSource){
                if(option.type == "pie"){
                    option.dataSource.chart.subCaption = unit;
                    option.dataSource.chart.captionOnTop = "0";
                }else{
                    option.dataSource.chart.yAxisName = unit;
                }
            }
        }

        return option;
    },

    //TODO
    createBase : function(op){
        var config = $.extend({},getBaseTemp(), op.base);
        var isGroup = this.getGroupStyle(op);
        var configData= this.getFilterData(op.data,isGroup,op);

        if(configData.categories){
            if(configData.categories.length){
                config.dataSource.categories = configData.categories;
            }
            if(configData.dataset.length){
                config.dataSource.dataset = configData.dataset;
            }
        }else{
            config.dataSource.data = configData;
        }



        // 条形图
        if(op.type =="horizontal"){
            var _dd = {};
            if(configData && configData.length>0){
                _dd = {
                    value:configData[0].value,
                    tooltext : configData[0].info,
                    label:configData[0].label
                };
            }else{
                _dd = {value :0,tooltext : ''};
            }
//				config.dataSource.pointers = {
//					pointers : [_dd]
//				}
            config.dataSource.value = _dd;
            delete config.dataSource.categories;
            delete config.dataSource.dataset;
            delete config.dataSource.data;
        }


        if(op.type =="heatmap"){
            config.dataSource.dataset = [];
            config.dataSource.dataset.push({data :config.dataSource.data}) ;
            delete config.dataSource.data;
        }

        //获取专有属性的
        var specialProps = this.getSpecialPros(op);

        var yAxisUnit,xAxisUnit,yAxisName,xAxisName,ylMax,ylMin,drawAnchors,showValues;
        if(specialProps && Object.keys(specialProps).length>0){
            //横纵坐标名称
            yAxisUnit = specialProps.ylUnit ? "（"+ specialProps.ylUnit+"）" : "";
            xAxisUnit = specialProps.xUnit ? "（"+ specialProps.xUnit+"）" : "";
            yAxisName = specialProps.ylName ? specialProps.ylName : "";
            xAxisName = specialProps.xName ? specialProps.xName : "";
            //横向柱图 下横轴最大值 最小值设置
            if(op.childType =="3" && op.type=="bar"){
                yAxisName = specialProps.xbName ? specialProps.xbName : "";
                xAxisUnit = specialProps.ylUnit ? "（"+ specialProps.ylUnit+"）" : "";
                yAxisUnit = specialProps.xbUint ? "（"+ specialProps.xbUint+"）" : "";
                ylMax = specialProps.xbMax ? specialProps.xbMax : "";
                ylMin = specialProps.xbMin ? specialProps.xbMin : "";
            }else{
                xAxisName = specialProps.xName ? specialProps.xName : "";
                xAxisUnit = specialProps.xUnit ? "（"+ specialProps.xUnit+"）" : "";
                yAxisName = specialProps.ylName ? specialProps.ylName : "";
                yAxisUnit = specialProps.ylUnit ? "（"+ specialProps.ylUnit+"）" : "";
                ylMax = specialProps.ylMax ? specialProps.ylMax : "";
                ylMin = specialProps.ylMin ? specialProps.ylMin : "";
            }
            //折线图是否显示节点
            drawAnchors = specialProps.showLinePoint == "false" || specialProps.showLinePoint == undefined ? "0" : "1";
            //是否显示数值及数值比例
            if(op.type=="line"){
                showValues = specialProps.showLineVal == "true" ? "1" : "0";
            }else if(op.type=="bar"){
                if(op.childType == 3){
                    showValues = specialProps.showPiePercent == "true" ? "1" : "0";
                }else{
                    showValues = specialProps.showBarVal == "true" ? "1" : "0";
                }

            }else{
                //showValues = specialProps.showPiePercent == "true" ? "1" : "0";
                showValues = specialProps.pieShowPercent == "true" ? "1" : "0";
            }


        }

        //设置通用属性 1是否显示图例 2图例位置 3横坐标方向 4横坐标显示间隔
        config.dataSource.chart.showLegend = this.getLegend(op).showLegend;
        config.dataSource.chart.legendPosition =this.getLegend(op).legendPosition;
        config.dataSource.chart.labelDisplay = this.getLegend(op).labelDisplay;
        config.dataSource.chart.slantLabels =this.getLegend(op).slantLabels;
        config.dataSource.chart.labelStep =this.getLegend(op).labelStep;
        //设置专有属性 横纵坐标名称
        config.dataSource.chart.xAxisName = xAxisName + xAxisUnit;
        config.dataSource.chart.yAxisName = yAxisName + yAxisUnit;
        //设置Y轴最大值 最小值
        config.dataSource.chart.yAxisMaxValue = ylMax;
        config.dataSource.chart.yAxisMinValue = ylMin;
        //折线图是否显示节点
        config.dataSource.chart.drawAnchors = drawAnchors;
        //是否显示数值及数值比例
        config.dataSource.chart.showValues = showValues;


        //饼图
        if(op.type == "pie"){

            //过滤非0的数据
            var notNullData = _.filter(op.data,function(it){
                return it.value != 0;
            })
            if(notNullData.length == 0){
                config.dataSource.chart.showToolTip = "0";
                config.dataSource.chart.showValues = 0;
                config.dataSource.chart.showYAxisValues  = 0;
                config.dataSource.chart.showPercentValues  = 0;
                config.dataSource.chart.showCanvasBg  = 0;
                notNullData = [{label:'无数据',value:100,info:'无数据',showValue:0}];
            }

            config.dataSource.data = notNullData;
        }

        if(op.data.length == 0 || (op.data.length ==1 && op.data[0].name =='' )){
            config.dataSource.chart.showValues = 0;
            config.dataSource.chart.showYAxisValues  = 0;
            config.dataSource.chart.showPercentValues  = 0;
            config.dataSource.chart.showCanvasBg = 0;
            config.dataSource.chart.showToolTip = 0;
            config.dataSource.data =  [{label:'无数据',value:100,info:'无数据',showValue:0}];
        }

        config = this.handlerNewData(config,op.type)

        return config;
    },

    // 创建折线图
    createLineChart : function(op){

        var baseConfig = this.createBase(op);

        if(op.childType ==1){
            baseConfig.type = "msline";

        }
        else if(op.childType ==2){
            // 折线面积图
            baseConfig.type ="stackedarea2d";
        }
        // zoomLine 查询一整年大量数据的折线图
        else if(op.childType ==3 ){
            baseConfig.type ="zoomline";
//				baseConfig.dataSource.chart.flatScrollBars = 0;
            baseConfig.dataSource.chart.scrollheight = 10;
            baseConfig.dataSource.chart.flatScrollBars=1;
            baseConfig.dataSource.chart.scrollShowButtons=0;
            baseConfig.dataSource.chart.scrollColor="#ffffff";
            baseConfig.dataSource.chart.pixelsPerPoint= "0";
            baseConfig.dataSource.chart.pixelsPerLabel= "30";
        }
        baseConfig.dataSource.chart.decimals= 2;
        baseConfig.dataSource.chart.forceDecimals = "1";
        baseConfig.dataSource.chart.adjustDiv = "0";
        baseConfig.dataSource.chart.numDivLines = "2";
        //baseConfig.dataSource.chart.showValues = "0";
//			baseConfig.dataSource.chart.yAxisValueDecimals = "0";
        baseConfig.dataSource.chart.showAlternateHGridColor = "0";
        baseConfig.dataSource.chart.paletteColors = "#0075c2,#1aaf5d,#f3c842,#9fc333,#f69457";
        baseConfig.dataSource.chart.showLegend = this.getLegend(op).showLegend;//显示图例
        /*var specialProps = this.getSpecialPros(op);
         var showValues;
         if(specialProps && Object.keys(specialProps).length>0){
         //饼图是否显示数值及数值比例
         showValues = specialProps.showLineVal == "true" ? "1" : "0";

         //饼图是否显示数值及数值比例
         baseConfig.dataSource.chart.showLabels = showValues;
         baseConfig.dataSource.chart.showValues = showValues;
         }*/
        return baseConfig;

    },

    // 创建金字塔图
    createPyramidChart : function(op){
        var baseConfig = this.createBase(op);
        if(op.childType== 1){
            baseConfig.type = "pyramid";
        }

        baseConfig.dataSource.chart.paletteColors = "#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c";
        return baseConfig;
    },

    //  热力图
    //TODO
    createHeatmapChart : function(op){
        var baseConfig = this.createBase(op);
        if(op.childType== 1){
            baseConfig.type = "heatmap";
        }
        baseConfig.dataSource.chart.showValues = "0";
        baseConfig.dataSource.chart.showLegend = "0";
        baseConfig.dataSource.chart.showBorder = "0";

        baseConfig.dataSource.chart.showCanvasBorder = "1";
        baseConfig.dataSource.chart.canvasBorderColor = "#ffffff";
        baseConfig.dataSource.chart.canvasBorderThickness = "5";
        baseConfig.dataSource.chart.plotFillHoverColor = "#ffffff";
        baseConfig.dataSource.chart.plotHoverEffect  = "1";
        baseConfig.dataSource.chart.showHoverEffect  = "1";


//			baseConfig.dataSource.colorrange =  {
//                "gradient": "0",
//                "minvalue": "0",
//                "code": "E24B1A",
//            }

        baseConfig.columns = {};
        baseConfig.rows = {};

        baseConfig = getHeatMapColorRange(baseConfig);
        console.log(baseConfig);

        return baseConfig;
    },

    // 创建条形图
    createHorizontalChart :function(op){
        var baseConfig = this.createBase(op);
        if(op.childType== 1){
            baseConfig.type = "hlineargauge";
        }

        baseConfig.dataSource.chart.showValue = "1";
        baseConfig.dataSource.chart.pointerBgHoverColor= "#ffffff";
        baseConfig.dataSource.chart.pointerBgHoverAlpha="80";
        baseConfig.dataSource.chart.pointerHoverRadius= "12";
//			baseConfig.dataSource.chart.pointerBorderHoverColor= "#333333";
//			baseConfig.dataSource.chart.pointerBorderHoverThickness= "2";

        baseConfig.dataSource.colorRange =  {
            "color": [
                {
                    "minValue": "0",
                    "maxValue": "20",
                    "label": "低",
                    "code": "#e44a00"
                }, {
                    "minValue": "20",
                    "maxValue": "50",
                    "label": "中",
                    "code": "#f8bd19"
                }, {
                    "minValue": "50",
                    "maxValue": "100",
                    "label": "高",
                    "code": "#6baa01"
                }]
        };


        return baseConfig;
    },


    // 创建仪表盘
    createGaugeChart : function(op){
        var baseConfig = this.createBase(op);
        if(op.childType== 1){
            baseConfig.type = "angulargauge";
        }

        baseConfig.dataSource.colorRange= {
            "color": [
                {
                    "minValue": "0",
                    "maxValue": "80",
                    "code": "#6baa01"
                },
                {
                    "minValue": "80",
                    "maxValue": "100",
                    "code": "#f8bd19"
                },
                {
                    "minValue": "100",
                    "maxValue": "500",
                    "code": "#e44a00"
                }
            ]
        };
        baseConfig.dataSource.chart.showValue= 1;
        baseConfig.dataSource.chart.valueBelowPivot= 1;
        baseConfig.dataSource.chart.gaugeFillMix= "{dark-30},{light-60},{dark-10}";
        baseConfig.dataSource.chart.gaugeOuterRadius= "180";
        baseConfig.dataSource.chart.gaugeInnerRadius= "120";
        baseConfig.dataSource.chart.lowerLimit=0;
        baseConfig.dataSource.chart.upperLimit= 500;

        return baseConfig;
    },

    //TODO
    //创建饼图
    createPieChart : function(op){
        var baseConfig = this.createBase(op);
        baseConfig.dataSource.chart.showPercentValues= "1";
        //baseConfig.dataSource.chart.showLegend = this.getLegend(op).showLegend;
        //baseConfig.dataSource.chart.legendPosition =this.getLegend(op).legendPosition;
        //baseConfig.dataSource.chart.legendPosition ="right";
        baseConfig.dataSource.chart.useDataPlotColorForLabels = "1";
//			baseConfig.dataSource.chart.paletteColors ="#008ee4,#6baa01,#f8bd19,#e44a00,#33bdda,#f3c842,#9fc333,#f69457,#169191";

        if(op.childType== 1){
            baseConfig.type = "pie3D";
        }else if(op.childType ==2){
            baseConfig.type = "doughnut3d";
            baseConfig.dataSource.chart.showPercentInTooltip= "1";
//				baseConfig.dataSource.chart.enableSmartLabels =  "0";
//				baseConfig.dataSource.chart.enableMultiSlicing= "0";
            //baseConfig.dataSource.chart.showLabels = "0";
//				baseConfig.dataSource.chart.paletteColors = "#f3c842,#9fc333,#f69457,#169191,#d55b5b,#9d639d,#719549,#bab329,#b4d6f1"
//				baseConfig.dataSource.chart.paletteColors = "#008ee4,#4d3c9c ,#1e90cc,#2c56a8,#a3409a ,#cd1d8c, #ee3231 ,#f36223 ,#f8901f ,#fce408, #c1d62f,#c1d62f ,#1abc9c , #00d32d ,#7d69b0 ,#cbbc3c , #cb7c3c , #dd7171 ,#8571dd ,#71d7dd";
//				baseConfig.dataSource.chart.useDataPlotColorForLabels = 1;
//			        "showLabels": "0",
//			        "showLegend": "1",
//			        "legendShadow": "0",
//			        "legendBorderAlpha": "0",
//			        "decimals": "0",
//			        "toolTipColor": "#ffffff",
//			        "toolTipBorderThickness": "0",
//			        "toolTipBgColor": "#000000",
//			        "toolTipBgAlpha": "80",
//			        "toolTipBorderRadius": "2",
//			        "toolTipPadding": "5",
//			        "useDataPlotColorForLabels": "1"

        }else if(op.childType == 3){
            baseConfig.type = "pie3D";
            baseConfig.dataSource.chart.labelFontColor = "#000";
            baseConfig.dataSource.chart.baseFontColor = "#000";
            baseConfig.dataSource.chart.exportEnabled ="1";
            baseConfig.dataSource.chart.exportAtClient ="1",
                baseConfig.dataSource.chart.exportHandler="/cubp-platform-pdfactory-web/FCExporter";
            baseConfig.dataSource.chart.exportAction="download";
            baseConfig.dataSource.chart.exportFormats= "PNG=导出图片|PDF=导出PDF";
            baseConfig.dataSource.chart.exportTargetWindow="_self";
        }

        var specialProps = this.getSpecialPros(op);
        var showValues,showValues1,showValues2;
        if(specialProps && Object.keys(specialProps).length>0){
            //饼图是否显示名称 百分比 值
            showValues = specialProps.showPieName == "true" ? "1" : "0";
            showValues1 = specialProps.showPiePercent == "true" ? "1" : "0";
            showValues2 = specialProps.showPieValues == "true" ? "1" : "0";

            //饼图是否显示名称 百分比 值

            baseConfig.dataSource.chart.showLabels = showValues;    //名称
            baseConfig.dataSource.chart.showPercentValues = showValues1;	//百分比
            baseConfig.dataSource.chart.showValues = showValues2;		//值
        }

        return baseConfig;
    },

    // 创建柱图
    //TODO
    createBarChart : function(op){
        var baseConfig = this.createBase(op);
        baseConfig.type = "column3d";
//			baseConfig.type = "realtimecolumn";

        if(op.childType== 3){
            // 横向柱图
            baseConfig.type = "bar3D";
        }else if(op.childType ==4){
            // 上下图
            baseConfig.type = "mscolumn3d";
        }else if(op.childType ==5){
            // 分组图
            baseConfig.type = "stackedcolumn3d";
        }

        // 图表子图类 主要设置不同的样式区分
        if(op.childType){
            // 主题类型2
            if(op.childType == 2){
                baseConfig.dataSource.chart.paletteColors = '#008ee4';
            }
        }

        return baseConfig;
    },

    // 状态图
    createStatusChart: function(op){
        var baseConfig = this.createBase(op);
        if(op.childType == 1){
            baseConfig.type = "dragnode";

        }
        return baseConfig;
    },


    createF : function(op){
        var f = new FusionCharts(op);
        // 设置透明
        f.setTransparent(true);
        // 渲染
        f.render();

        return f;
    },

    // 过滤数据
    getFilterData : function(data,isGroup,op){
        var config;
        if(isGroup){
            config = this.getGroupData(data);
        }else{
            config = this.getNoGroupData(data,op);
        }
        return config;
    },
    arrayUnique : function(array){
        var res = [], hash = {};
        for(var i=0, elem; (elem = array[i]) != null; i++)  {
            if (!hash[elem]) {
                res.push(elem);
                hash[elem] = true;
            }
        }
        return res;
    },

    getNoGroupData : function(data,op){
        var arr = [];
        if(data){
            data.forEach(function(it){
                if(it.info){
                    it.tooltext = it.info;
                }
                if(!op.type =="heatmap"){
                    if(!it.label){
                        it.label = it.name;
                        delete it.name;
                    }
                }

                if(!it.label && it.name ){
                    it.label = it.name;
                    delete it.name;
                }

                if(op.type == "pie"){
                    if(it.value > 0 ){
                        it.value = it.value + "<br>" + it.value
                    }
                }
                arr.push(it);

            });


            if(arr.length ==1 && arr[0].value == ""){
                arr[0].value = "0";
                arr[0].showLabel = "0";
                arr[0].showValue = "0";
                arr[0].label = "无数据";
            }


            if(arr.length ==1 && op.type == "pie" && arr[0].value ==0){
                arr[0].value = 100;
                arr[0].showLabel = "0";
                arr[0].showValue = "0";
                arr[0].label = "无数据";
            }






        }
        return arr;
    },

    /**
     * 拼装分组
     * @param data
     * @returns
     */
    getGroupData : function(data){
        var categories= {
            categories:[],
            dataset : []
        };
        if(!$.isArray(data)){
            return categories;
        }
        var dataSet = [];
        var label = [];
        var group = [];
        var series = [];


        data.forEach(function(it){
            if(it.ygroup){
                it.group = it.ygroup;
            }
            if(it.xgroup){
                it.label = it.xgroup;
            }
            if(it.info){
                it.tooltext = it.info;
            }
        });



        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < label.length && label[j] != data[i].label; j++);
            if (j == label.length)
                label.push(data[i].label);

            for (var k = 0; k < group.length && group[k] != data[i].group; k++);
            if (k == group.length)
                group.push(data[i].group);
        }


        for (var i = 0; i < group.length; i++) {
            var temp = [];
            for (var j = 0; j < data.length; j++) {
                if (group[i] == data[j].group) {
                    var obj = {};
                    obj.value = data[j].value;
                    if(data[j].info){
//	                		obj.tooltext = data[j].info;
                        obj.toolText = fixTipBr(data[j].info);
                    }
                    if(data[j].INFO){
//	                		obj.tooltext = data[j].INFO;
                        obj.toolText = fixTipBr(data[j].INFO);
                    }

                    if(data[j].unit){
                        obj.unit = data[j].unit;
                    }
                    temp.push(obj);
//	                	temp.push({
//	                        "vLine": "true",
//	                        "label": "Appraisal"
//	                    })
                }
            }
            dataSet.push({
                "seriesname":group[i],
                "data" : temp
            })
        }
        var tmpObj = {};
        var tmpArray = [];
        label.forEach(function(it){
            if(!tmpObj[it]){
                tmpArray.push({"label":it});
            }
            tmpObj[it] = 1;
        });

        label = tmpArray;

        categoryObj= {
            "category": label
        }

        categories.dataset = dataSet;
        categories.categories.push(categoryObj);

        return categories;
    },
    //获取专有属性
    getSpecialPros : function(opt){
        if(opt == undefined)return;
        var props = opt.props;
        var specialProp = props == undefined ? {} : props.specialProp;
        if(specialProp != undefined){
            return specialProp;
        }
    },
    //获取图例配置
    getLegend : function(opt){
        var legend = {};
        var legendPositon;
        var commonAxis;
        var labelStep;
        //处理图例及图例位置
        if(opt == undefined)return;
        var props = opt.props;
        var commonProp = opt.props == undefined ? {} : opt.props.commonProp;

        if(commonProp != undefined){
            legend["showLegend"] = commonProp.showLegend == "true" ? "1" : "0";
            if(commonProp.legendPositon){
                legendPositon = commonProp.legendPositon;
            }
            if(commonProp.commonAxis){
                commonAxis = commonProp.commonAxis;
            }
            if(commonProp.labelStep){
                labelStep = Math.floor(commonProp.labelStep);
            }
            //legend["showGVal"] = commonProp.showGVal == "true" ? true : false;
            if( legendPositon ){
                switch( legendPositon ){
                    case "6":
                        legend["legendPosition"] = "right";
                        break;
                    case "5":
                        legend["legendPosition"] = "bottom";
                        break;
                    default:;
                }
            }
            if( commonAxis ){
                switch( commonAxis ){
                    case "0":
                        legend["labelDisplay"] = "auto";
                        break;
                    case "1":
                        legend["labelDisplay"] = "rotate";
                        legend["slantLabels"] = "0";
                        break;
                    case "2":
                        legend["labelDisplay"] = "none";
                        break;
                    case "3":
                        legend["labelDisplay"] = "rotate";
                        legend["slantLabels"] = "1";
                        break;
                    default:;
                }
            }else{
                legend["labelDisplay"] = "auto";
            }
            if( labelStep ){
                legend["labelStep"] = labelStep;
            }

        }

        return legend;
    },

}

/**
 * 控制tip长度 一定长度后 换行
 */
function fixTipBr(tip){
    if(tip.length && tip.length<=60){
        return tip;
    }else{
        var reg=/(.{50})/g;
        var rs= tip.match(reg);
        var str = rs.join('</br>');
        return str;
    }
}


//计算热力图颜色的范围值
//TODO
function  getHeatMapColorRange(option){

    option.colorrange = {
        "gradient": "0",
        "minvalue": "1",
        "code": "E24B1A",
    }

    var colorArr = [];

    colorArr.push({
        "code": "999999",
        "minvalue": "1",
        "maxvalue": "2",
        "label": "A"
    });
    colorArr.push({
        "code": "F6BC33",
        "minvalue": "3",
        "maxvalue": "4",
        "label":  'B'
    });
    colorArr.push({
        "code": "6DA81E",
        "minvalue": "5",
        "maxvalue": "6",
        "label":  'C'
    });
    colorArr.push({
        "code": "E24B1A",
        "minvalue": "7",
        "maxvalue": "8",
        "label":  'D'
    });
    option.colorrange.color = colorArr;
    option.colorrange.startlabel = "A";
    option.colorrange.endlabel ="B";

    return option;

}


export default Common;
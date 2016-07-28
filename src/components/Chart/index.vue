<template>
	<div class="chart" :style="styleObj">
		<p>this is chart</p>
	</div>
</template>
<script>
import {log} from "util/zUtil"
import echartCommon from "./../EchartCommon"
import fchartCommon from "./../FchartCommon"
import echarts from "echarts"
import RC from "util/ResourcesConfig"
import "echarts/chart/bar"
import "echarts/chart/map"
import "echarts/chart/line"
import "echarts/chart/pie"
import "echarts/chart/base"

export default {
	props:['option','w','h'],
    data(){
        return {
            styleObj:{}
        }
    } ,
    computed:{
        styleObj(){
            return {
                width : this.w+"px",
                height : this.h +"px"
            }
        }
    },
    ready(){
        var chartCategory = this.option.chartCategory;
        var chartType = this.option.content.chartType;
        var childType = this.option.content.childType;
        var chartStyle = this.option.component.dataOption ;
        var props = this.option.props || {};
        var data  = this.option.data || [] ;
        var buildConfig = {
            data : data,
            chartStyle : chartStyle,
            chartType : chartType,
            childType : childType ,
            props : props,
            renderAt : this.$el
        }
        this.createEchart(buildConfig);
    },

    beforeDestroy(){
        // 销毁echart实例
        if (this.echartObj.chart) {
            this.echartObj.chart.dispose();
        }
    },

	methods:{
        createEchart(option){
            var buildOption;
            switch(option.chartType){
                case 'bar' :
                    buildOption = echartCommon.optionTmpl.Bars(option.data,option);
                    break ;
                case 'line' :
                    buildOption = echartCommon.optionTmpl.Lines(option.data,option);
                    break ;
                case 'pie' :
                    buildOption = echartCommon.optionTmpl.Pie(option.data,option);
                    break;
                case 'map' :
                    buildOption = echartCommon.optionTmpl.Map(option.data,option);
                    break;
                case 'gauge' :
                    buildOption = echartCommon.optionTmpl.Gauge(option.data,option);
                    break;
                case 'force' :
                    if(Zlay.Z[this.id] == undefined){
                        option.chartStyle.wh = {
                            w : this.option.width,
                            h : this.option.height,
                        };
                    }else{
                        option.chartStyle.wh = {
                            w : Zlay.Z[this.id].option.width,
                            h : Zlay.Z[this.id].option.height,
                        };
                    }
                    option.type = option.childType;
                    buildOption = echartCommon.optionTmpl.Force(option.data,option);
                    break;
                default:;
            };

            if(this.echartObj && this.echartObj.chart){
                this.echartObj.chart.clear();
                this.echartObj.chart.setOption(buildOption);
            }else{
                this.loadChart(option.renderAt,buildOption);
            }
        },

        loadChart(box , option){
            var echartObj = echartCommon.config(box, option);
            echartObj.chartType =this.option.chartType;
            echartObj.chart = echarts.init(echartObj.container);
            this.echartObj = echartObj;
            this.echartObj.chart.setOption(echartObj.option);
        },

        resize(){
            this.echartObj.chart.resize();
        }
    }
}
</script>

<style scoped>
	.chart{
		color : #fff;
	}
</style>
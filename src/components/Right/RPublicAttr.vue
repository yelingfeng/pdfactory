<template>
<strong class="nav_c_title">通用属性</strong>
	<ul class="baseAttr" rel="common">
		<li class="propDpyNone">
		    <span class="compLabelName">背景色：</span>
			<div class="compName" id="bgColor"></div>
		</li>
		<li>
			<div class="lineBox" prop-type="spcPropCheck">
				<input type="checkbox" class="check" id="showLegend" valname="showLegend" proptype="2">
				<span class="checkBoxDescription"><label for="showLegend">显示图例</label></span>
			</div>
			<div class="lineBox legendBox"> <span class="compLabelName m_l_20">图例位置：</span>
				<select class="baseAttrSelect" prop-type="commonPropSlt" xname="legendPositon">
					<option v-for="position in positions" chart-type="{{position.chart-type}}" value="{{position.value}}">{{position.text}}</option>
				</select>
			</div>
			<div class="lineBox">   <span class="compLabelName">级联取值：</span>
				<select class="baseAttrSelect" id="cascadeValueSelect">
					<option v-for="num in cascadenums" value="{{num.value}}">{{num.text}}</option>
				</select>
			</div>
			<div class="lineBox propDpyNone" prop-type="spcPropCheck">
				<input type="checkbox" class="check" name="check" id="showGVal" valname="showGVal" proptype="2">
				<span class="checkBoxDescription"><label for="showGVal">显示图表值</label></span>
			</div>
		</li>
		<li class="propDpyNone">
			<div class="lineBox">
			    <span class="compLabelName">图表文字：</span>
				<select class="baseAttrSelect" prop-type="commonPropSlt" xname="commonft">
					<option v-for="size in fontsizes" value="{{size}}">{{size}}</option>
				</select>
			</div>
		</li>
		<li id="labelDPY">
			<div class="lineBox">
			    <span class="compLabelName">坐标方向：</span>
				<select class="baseAttrSelect" id="axis" prop-type="commonPropSlt" xname="commonAxis">
					<option v-for="direction in directions" value="{{direction.value}}">{{direction.text}}</option>
				</select>
			</div>
			<div class="lineBox propDpyNone" id="axis3" prop-type="commonPropText">
			    <span class="compLabelName">倾斜角度：</span>
				<input class="w122" type="text" id="axis3Input" valname="deg">
			</div>
		</li>
		<li id="labelStep">
			<div class="lineBox" prop-type="commonPropText">
			    <span class="compLabelName">显示间隔：</span>
				<input class="w122" type="text" id="" valname="labelStep">
			</div>
		</li>
	</ul>
</template>
<script>
    export default {
        data(){
            return {
            		positions:[{"chart-type":"e_chart","value":"1",text:"左上"},
            					{"chart-type":"e_chart","value":"2",text:"中上"},
            					{"chart-type":"e_chart","value":"3",text:"右上"},
            					{"chart-type":"e_chart","value":"4",text:"中下"},
            					{"chart-type":"f_chart","value":"5",text:"中下"},
            					{"chart-type":"f_chart","value":"6",text:"右中"}],
					cascadenums:[{"value":"1","text":"首个"},
								 {"value":"2","text":"末尾"}],
					fontsizes:[12,14,16,18],
					directions:[{"value":"0","text":"无"},
								{"value":"1","text":"纵向"},
								{"value":"2","text":"横向"},
								{"value":"3","text":"倾斜"}]

            }
        }
    }
</script>
<template>
	<div id="zlayoutRight" class="commonLayout">
		<h2 class="zlayoutTitle"><strong>属性区</strong><span class="zlayout-dropUp"></span></h2>

		<div class="rightContent">
			<ul class="nav" id="zRight_component">
				<li class="nav_c_con"> <strong class="nav_c_title">基本属性</strong>

					<ul class="baseAttr" rel="base">
						<li><span class="f12_2f5a93">控件名称：</span><span class="f12_2f5a93 w120" id="zR_baseName">图标型控件A</span>
						</li>
						<li>
							<div class="lineBox"><span class="f12_2f5a93 m_t_3">控件标题：</span>
								<input class="w80" type="text" id="zTitle">
								<input class="ttlDt" type="button">
							</div>
							<div class="lineBox">
								<select class="baseAttrSelect m_l_60" prop-type="font">
									<option selected="selected" value="黑体">黑体</option>
									<option value="宋体">宋体</option>
									<option value="仿宋">仿宋</option>
									<option value="隶书">隶书</option>
									<option value="楷体">楷体</option>
								</select>
								<select class="baseAttrSelect" prop-type="fontSize">
									<option selected="selected" value="12">12</option>
									<option value="14">14</option>
									<option value="16">16</option>
									<option value="18">18</option>
								</select>
							</div>
							<div class="lineBox baseAttrFont" prop-type="fontOther">    <i class="B m_l_60">B</i>
								<i class="I">I</i>
								<i class="U">U</i>
								<i class="A" id="titleFontColor">A</i>

							</div>
							<div class="lineBox baseAttrTitlePst" prop-type="fontOther">    <span class="f12_2f5a93 m_t_3">位置：</span>

								<select class="baseAttrSelect" prop-type="titlePositon">
									<option value="left-top">左上</option>
									<option value="center-top" selected="selected">中上</option>
									<option value="right-top">右上</option>
									<option value="center-bottom">中下</option>
								</select>
							</div>
						</li>
						<li><span class="f12_2f5a93 m_t_3">控件注释：</span>
							<input class="w122" type="text" id="zR_remark">
						</li>
						<li>
							<dl>    <dt class="f12_2f5a93 m_t_3 t_align_l">位置大小：</dt>

								<dd class="control-style" rel="size">
									<div class="m_b_10"><span>左</span>
										<input type="text" class="f12_2f5a93" id="t_align_left" data-attr="position_l">
									</div>
									<div class="m_b_10"><span>上</span>
										<input type="text" class="f12_2f5a93" id="t_align_top" data-attr="position_t">
									</div>
									<div><span>宽</span>
										<input type="text" class="f12_2f5a93" id="t_width" data-attr="position_w">
									</div>
									<div><span>高</span>
										<input type="text" class="f12_2f5a93" id="t_height" data-attr="position_h">
									</div>
								</dd>
							</dl>
						</li>
						<li>
							<dl>    <dt class="f12_2f5a93 m_t_3 t_align_l">控件边框：</dt>

								<dd class="control-look" rel="border">  <span class="line-none"></span><span class="line-has"></span>

								</dd>
							</dl>
						</li>
						<li>
							<dl>    <dt class="f12_2f5a93 m_t_3 t_align_l p_l_12">透明度：</dt>

								<dd class="dd-range">
									<div class="z-range" style="width:170px;height:55px">
										<div id="range"></div>
									</div>
								</dd>
							</dl>
						</li>
					</ul>
				</li>
				<li class="nav_c_con"> <strong class="nav_c_title">通用属性</strong>

					<ul class="baseAttr" rel="common">
						<li class="propDpyNone">    <span class="compLabelName">背景色：</span>
							<div class="compName" id="bgColor"></div>
						</li>
						<li>
							<div class="lineBox" prop-type="spcPropCheck">
								<input type="checkbox" class="check" id="showLegend" valname="showLegend" proptype="2"> <span class="checkBoxDescription"><label for="showLegend">显示图例</label></span>

							</div>
							<div class="lineBox legendBox"> <span class="compLabelName m_l_20">图例位置：</span>

								<select class="baseAttrSelect" prop-type="commonPropSlt" xname="legendPositon">
									<option chart-type="e_chart" selected="selected" value="1">左上</option>
									<option chart-type="e_chart" value="2">中上</option>
									<option chart-type="e_chart" value="3">右上</option>
									<option chart-type="e_chart" value="4">中下</option>
									<option chart-type="f_chart" value="5">中下</option>
									<option chart-type="f_chart" value="6">右中</option>
								</select>
							</div>
							<div class="lineBox">   <span class="compLabelName">级联取值：</span>

								<select class="baseAttrSelect" id="cascadeValueSelect">
									<option selected="selected" value="1">首个</option>
									<option value="2">末尾</option>
								</select>
							</div>
							<div class="lineBox propDpyNone" prop-type="spcPropCheck">
								<input type="checkbox" class="check" name="check" id="showGVal" valname="showGVal" proptype="2"> <span class="checkBoxDescription"><label for="showGVal">显示图表值</label></span>

							</div>
						</li>
						<li class="propDpyNone">
							<div class="lineBox">   <span class="compLabelName">图表文字：</span>

								<select class="baseAttrSelect" prop-type="commonPropSlt" xname="commonft">
									<option selected="selected" value="12">12</option>
									<option value="14">14</option>
									<option value="16">16</option>
									<option value="18">18</option>
								</select>
							</div>
						</li>
						<li id="labelDPY">
							<div class="lineBox">   <span class="compLabelName">坐标方向：</span>

								<select class="baseAttrSelect" id="axis" prop-type="commonPropSlt" xname="commonAxis">
									<option selected="selected" value="0">无</option>
									<option selected="selected" value="1">纵向</option>
									<option value="2">横向</option>
									<option value="3">倾斜</option>
								</select>
							</div>
							<div class="lineBox propDpyNone" id="axis3" prop-type="commonPropText"> <span class="compLabelName">倾斜角度：</span>

								<input class="w122" type="text" id="axis3Input" valname="deg">
							</div>
						</li>
						<li id="labelStep">
							<div class="lineBox" prop-type="commonPropText">    <span class="compLabelName">显示间隔：</span>

								<input class="w122" type="text" id="" valname="labelStep">
							</div>
						</li>
					</ul>
				</li>
				<li class="nav_c_con"> <strong class="nav_c_title">专有属性</strong>

					<div>
						<ul class="baseAttr" rel="specialBar">
							<li class="propDpyNone">    <span class="compLabelName">柱形颜色：</span>
								<div class="compName" id="barColor"></div>
							</li>
							<li class="propDpyNone">
								<div class="lineBox">   <span class="compLabelName">坐标：</span>

									<select class="baseAttrSelect specialAxis" prop-type="specialAxis">
										<option selected="selected" dataval="bar-1" value="1">单横单纵坐标</option>
										<option dataval="bar-2" value="2">单横双纵坐标</option>
									</select>
								</div>
							</li>
							<li prop-type="barAxis">
								<div class="lineBox">
									<div><span class="compLabelName">横轴名称：</span>
										<input class="w122" type="text" valname="xName">
									</div>
									<div class="m_t_5 fl"><span class="compLabelName">横轴单位：</span>
										<input class="w122" type="text" valname="xUnit">
									</div>
								</div>
								<div class="lineBox">
									<div><span class="compLabelName">左纵名称：</span>
										<input class="w122" type="text" valname="ylName">
									</div>
									<div class="m_t_5 fl"><span class="compLabelName">左纵单位：</span>
										<input class="w122" type="text" valname="ylUnit">
									</div>
								</div>
								<div class="lineBox" showid="bar-specialAxisInput3">
									<div><span class="compLabelName">右纵名称：</span>
										<input class="w122" type="text" valname="yrName">
									</div>
									<div class="m_t_5 fl"><span class="compLabelName">右纵单位：</span>
										<input class="w122" type="text" valname="yrUnit">
									</div>
								</div>
							</li>
							<li prop-type="barAxisVal" id="barMM">  <dt class="f12_2f5a93 t_align_l">坐标极值：</dt>

								<dd class="ddBox propDpyNone">  <em>横轴</em>
									<em class="">Min</em>

									<input type="text" valname="xMin">  <em class="m_l_15">Max</em>

									<input class="" type="text" valname="xMax">
								</dd>
								<dd class="ddBox">  <em>左纵</em>
									<em class="">Min</em>

									<input class="" type="text" valname="ylMin">    <em class="m_l_15">Max</em>

									<input type="text" valname="ylMax">
								</dd>
								<dd class="ddBox" showid="bar-specialAxisMM3">  <em>右纵</em>
									<em class="">Min</em>

									<input class="" type="text" valname="yrMin">    <em class="m_l_15">Max</em>

									<input class="" type="text" valname="yrMax">
								</dd>
							</li>
							<li>
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" id="chk2" class="check" name="check" valname="showBarVal" proptype="3"> <span class="checkBoxDescription"><label for="chk2">显示图表值</label></span>

								</div>
							</li>
						</ul>
						<ul class="baseAttr" rel="specialBarstrip">
							<li class="propDpyNone">    <span class="compLabelName">条形颜色：</span>
								<div class="compName" id="barstripColor"></div>
							</li>
							<li class="propDpyNone">
								<div class="lineBox">   <span class="compLabelName">坐标：</span>

									<select class="baseAttrSelect specialAxis" prop-type="specialAxis">
										<option selected="selected" dataval="barstrip-1" value="1">单横单纵坐标</option>
										<option dataval="barstrip-2" value="2">双横单纵坐标</option>
									</select>
								</div>
							</li>
							<li prop-type="barAxis">
								<div class="lineBox">   <span class="compLabelName">纵轴单位：</span>
									<input class="w122" type="text" valname="ylUnit">
								</div>
								<div class="lineBox">   <span class="compLabelName">下横名称：</span>
									<input class="w122" type="text" valname="xbName">
								</div>
								<div class="lineBox">   <span class="compLabelName">下横单位：</span>
									<input class="w122" type="text" valname="xbUint">
								</div>
								<div class="lineBox propDpyNone" showid="barstrip-specialAxisInput3">   <span class="compLabelName">上横名称：</span>
									<input class="w122" type="text" valname="xtName">
								</div>
								<div class="lineBox propDpyNone" showid="barstrip-specialAxisInput3">   <span class="compLabelName">上横单位：</span>
									<input class="w122" type="text" valname="xtUint">
								</div>
							</li>
							<li prop-type="barAxisVal" id="barstripMM"> <dt class="f12_2f5a93 t_align_l">坐标极值：</dt>

								<dd class="ddBox propDpyNone">  <em>纵轴</em>
									<em class="">Min</em>

									<input type="text" valname="yMin">  <em class="m_l_15">Max</em>

									<input class="" type="text" valname="yMax">
								</dd>
								<dd class="ddBox">  <em>下横</em>
									<em class="">Min</em>

									<input class="" type="text" valname="xbMin">    <em class="m_l_15">Max</em>

									<input type="text" valname="xbMax">
								</dd>
								<dd class="ddBox" showid="barstrip-specialAxisMM3"> <em>上横</em>
									<em class="">Min</em>

									<input class="" type="text" valname="xtMin">    <em class="m_l_15">Max</em>

									<input class="" type="text" valname="xtMax">
								</dd>
							</li>
							<li class="propDpyNone">
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" class="check" name="check" id="showValPct" valname="showValPct" proptype="3"> <span class="checkBoxDescription"><label for="showValPct">显示指标占比</label></span>

								</div>
							</li>
							<li>
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" id="chk1" class="check" name="check" valname="showPiePercent" proptype="3"> <span class="checkBoxDescription"><label for="chk1">显示指标占比</label></span>

								</div>
							</li>
						</ul>
						<ul class="baseAttr" rel="specialLine">
							<li class="propDpyNone">    <span class="compLabelName">线条类型：</span>

								<select class="baseAttrSelect">
									<option selected="selected">光滑</option>
									<option>折线</option>
								</select>
							</li>
							<li class="propDpyNone">    <span class="compLabelName">线条颜色：</span>
								<div class="compName" id="LineColor"></div>
							</li>
							<li id="lineAxis">
								<div class="lineBox">   <span class="compLabelName">坐标：</span>

									<select class="baseAttrSelect specialAxis">
										<option selected="selected" dataval="line-1">单横单纵坐标</option>
										<option selected="selected" dataval="line-2">单横双纵坐标</option>
										<option dataval="line-3">正反单纵坐标</option>
										<option dataval="line-4">正反双纵坐标</option>
									</select>
								</div>
							</li>
							<li prop-type="barAxis">
								<div class="lineBox">   <span class="compLabelName">横轴名称：</span>
									<input class="w122" type="text" valname="xName">
								</div>
								<div class="lineBox">   <span class="compLabelName">横轴单位：</span>
									<input class="w122" type="text" valname="xUnit">
								</div>
								<div class="lineBox">   <span class="compLabelName">左纵名称：</span>
									<input class="w122" type="text" valname="ylName">
								</div>
								<div class="lineBox">   <span class="compLabelName">左纵单位：</span>
									<input class="w122" type="text" valname="ylUnit">
								</div>
								<div class="lineBox" showid="line-specialAxisInput3">   <span class="compLabelName">右纵名称：</span>
									<input class="w122" type="text" valname="yrName">
								</div>
								<div class="lineBox" showid="line-specialAxisInput3">   <span class="compLabelName">右纵单位：</span>
									<input class="w122" type="text" valname="yrUnit">
								</div>
							</li>
							<li prop-type="barAxisVal" id="lineMM"> <dt class="f12_2f5a93 t_align_l">坐标极值：</dt>

								<dd class="ddBox propDpyNone">  <em>横轴</em>
									<em class="">Min</em>

									<input type="text" valname="xMin">  <em class="m_l_15">Max</em>

									<input type="text" valname="xMax">
								</dd>
								<dd class="ddBox">  <em>左纵</em>
									<em class="">Min</em>

									<input type="text" valname="ylMin"> <em class="m_l_15">Max</em>

									<input type="text" valname="ylMax">
								</dd>
								<dd class="ddBox propDpyNone" showid="line-specialAxisMM3"> <em>右纵</em>
									<em class="">Min</em>

									<input class="" type="text" valname="yrMin">    <em class="m_l_15">Max</em>

									<input class="" type="text" valname="yrMax">
								</dd>
							</li>
							<li>
								<div class="lineBox" prop-type="spcPropCheck" id="linePoint">
									<input type="checkbox" class="check" name="check" checked="true" id="showLinePoint" valname="showLinePoint" proptype="3"> <span class="checkBoxDescription"><label for="showLinePoint">显示线条节点</label></span>

								</div>
							</li>
							<li>
								<div class="lineBox" prop-type="spcPropCheck" id="lineVal">
									<input type="checkbox" id="chkLine" class="check" name="check" valname="showLineVal" proptype="3"> <span class="checkBoxDescription"><label for="chkLine">显示图表值</label></span>

								</div>
							</li>
						</ul>
						<ul class="baseAttr" rel="specialPie">
							<li class="propDpyNone">    <span class="compLabelName">环形颜色：</span>
								<div class="compName" id="pieColor"></div>
							</li>
							<li class="propDpyNone" prop-type="piePropVal">
								<div class="lineBox">   <span class="compLabelName">环内半径：</span>

									<input class="w122" type="text" valname="pieR">
								</div>
							</li>
							<li class="propDpyNone" prop-type="piePropVal">
								<div class="lineBox">   <span class="compLabelName">圆心距：</span>

									<input class="w122" type="text" valname="centerR">
								</div>
							</li>
							<li prop-type="piePropVal" id="zbz">
								<div class="lineBox">   <span class="compLabelName">占比值：</span>

									<input class="w122" type="text" valname="pieShowPercent" placeholder="2">
								</div>
							</li>
							<li>
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" class="check" id="chk3" name="check" valname="showPieName" proptype="3"> <span class="checkBoxDescription"><label for="chk3">名称</label></span>

								</div>
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" class="check" id="chk33" name="check" valname="showPiePercent" rel="group" proptype="3"> <span class="checkBoxDescription"><label for="chk33">百分比</label></span>

								</div>
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" class="check" id="chk333" name="check" valname="showPieValues" rel="group" proptype="3"> <span class="checkBoxDescription"><label for="chk333">值</label></span>

								</div>
							</li>
						</ul>
						<ul class="baseAttr" rel="specialMap">
							<li>
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" class="check" name="check" id="showGVal" valname="showGVal" proptype="2"> <span class="checkBoxDescription"><label for="showGVal">显示图表值</label></span>

								</div>
							</li>
							<li>
								<div class="lineBox" prop-type="spcPropCheck">
									<input type="checkbox" class="check" name="check" id="showRestoreVal" valname="showRestoreVal" proptype="2"> <span class="checkBoxDescription"><label for="showRestoreVal">显示刷新</label></span>

								</div>
							</li>
						</ul>
						<ul class="baseAttr" rel="specialTimepick">
							<li>
								<div class="lineBox" prop-type="spTimePropCheck">
									<input type="checkbox" class="check" id="st-quarter-checked">   <span class="checkBoxDescription"><label for="st-quarter-checked">刻</label></span>

								</div>
								<div class="lineBox" prop-type="spTimePropCheck">
									<input type="checkbox" class="check" id="st-hour-checked">  <span class="checkBoxDescription"><label for="st-hour-checked">小时</label></span>

								</div>
								<div class="lineBox" prop-type="spTimePropCheck">
									<input type="checkbox" class="check" id="st-day-checked">   <span class="checkBoxDescription"><label for="st-day-checked">天</label></span>

								</div>
							</li>
							<li>
								<div class="lineBox" prop-type="spTimePropCheck">   <span class="compLabelName">默认选中：</span>

									<select class="baseAttrSelect" id="st-default-type">
										<option selected="selected" value="quarter">刻</option>
										<option value="hour">小时</option>
										<option value="date">天</option>
									</select>
								</div>
							</li>
							<li>
								<div class="lineBox" prop-type="spTimePropCheck">   <span class="compLabelName">粒度大小：</span>

									<select class="baseAttrSelect" id="st-default-minSize">
										<option selected="selected" value="8">8</option>
										<option value="1">1</option>
										<option value="5">5</option>
										<option value="7">7</option>
										<option value="10">10</option>
										<option value="24">24</option>
										<option value="30">30</option>
										<option value="80">80</option>
									</select>
								</div>
							</li>
							<li>
								<div class="lineBox" prop-type="spTimePropCheck">   <span class="compLabelName">时间格式：</span>

									<select class="baseAttrSelect" id="st-default-format">
										<option value="yyyy-MM">年月</option>
										<option value="yyyy-MM-dd">年月日</option>
										<option selected="selected" value="yyyy-MM-dd hh:mm:ss">年月日时分秒</option>
									</select>
								</div>
							</li>
							<li>
								<div class="lineBox">
									<input type="checkbox" class="check" id="st-isFixed-checked">   <span class="checkBoxDescription"><label for="st-isFixed-checked">是否固定刻度</label></span>

								</div>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav_c_con"> <strong class="nav_c_title">数据与级联</strong>

					<ul class="control-look" rel="data">
						<li><span><input class="picChs" type="button" value="配置" id="dataSetting_btn"></span>
						</li>
						<li><span class="f12_2f5a93">当前控件的数据源：</span>
							<div><span class="f12_000" id="zR_dataSource"></span><span></span>
							</div>
						</li>
						<li><span class="f12_2f5a93">当前控件的父控件：</span>
							<div class="c_list" id="zR_parentCom"></div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<style>
	.dd-range span {
		display:hidden;
		float:none;
	}
</style>
<script>
	//'jquery','./zUtil','./zDialog','./zDs','jqueryUI'
	import $ from "jquery"
	import util from "./../util/zUtil"
	import jPicker from "../assets/vendor/jPicker/jPicker-1.1.6.min"
	import range from "../assets/vendor/range/js/ion-rangeSlider/ion.rangeSlider"
	export
	default {
		data() {
		return {}
	},
	ready() {
		this.init();
		this.bindEvent();
	},
	methods: {
		init: function () {
			//this._super();

			this.contentBox = document.getElementsByClassName("rightContent")[0];
			this.dropBtn = document.getElementsByClassName("zlayout-dropUp")[0];
			this.headerBox = document.getElementsByClassName("zlayoutTitle")[0];
			this.compBox = document.getElementById("zRight_component");
			this._triggleH_(false);
			this.renderRange();
			this.defaultColor = "ffffff"; //数据库返回的颜色值
			this.titleFontColor = "titleFontColor";
			this.bgColor = "bgColor";
			this.barColor = "barColor";
			this.barstripColor = "barstripColor";
			this.LineColor = "LineColor";
			this.pieColor = "pieColor";

		},
		renderRange: function () {
			$("#range").ionRangeSlider({
				min: 0,
				max: 100,
				from: 50,
				onStart: function (e) {},
				onChange: function (e) {}
			})
		},
		triggleHeader: function () {
			var isVisible = $(this.contentBox).is(":visible");
			if (isVisible) {
				this._triggleH_(true)
			} else {
				this._triggleH_(false)
			}
		},
		_triggleH_: function (flag) {
			$(this.dropBtn).removeClass();
			if (flag) {
				$(this.contentBox).hide();
				$(this.dropBtn).addClass("zlayout-dropDown");
			} else {
				$(this.contentBox).show();
				$(this.dropBtn).addClass("zlayout-dropUp");
			}
		},


		bindEvent: function () {
			var me = this;
			// 绑定最上层收齐按钮
			$(this.headerBox).on('click', function (e) {

				me.triggleHeader()
				e.stopPropagation();
			});
			// 图表 文本 突变折叠 展开
			$(this.compBox).find(".nav_c_title").click(function () {

				var _next = $(this).next();
				_next.is(":visible") ? _next.hide() : _next.show();
			});

			//通用属性 坐标方向级联
			/*$("#axis",this.compBox).on("change", function(){
			 var axisType = $("#axis",this.compBox).find("option:selected").attr("value");
			 if(axisType == 3){
			 $("#axis3",this.compBox).show();
			 }else{
			 $("#axis3",this.compBox).hide();
			 }
			 });*/

			//专有属性 柱图
			$(".specialAxis", this.compBox).on("change", function () {

				var axisType = $(this).find("option:selected").attr("dataVal");
				var axisTypes = axisType.split("-");

				//设置坐标类型
				me.axis = axisTypes[1];
				if (axisTypes[0] == "line") {
					if (axisTypes[1] == 2 || axisTypes[1] == 4) {
						$("div[showid='" + axisTypes[0] + "-specialAxisInput3']", me.compBox).show();
						$("dd[showid='" + axisTypes[0] + "-specialAxisMM3']", me.compBox).show();
					} else {
						$("div[showid='" + axisTypes[0] + "-specialAxisInput3']", me.compBox).hide();
						$("dd[showid='" + axisTypes[0] + "-specialAxisMM3']", me.compBox).hide();
					}
				} else {
					if (axisTypes[1] == 2 || axisTypes[1] == 3) {
						$("div[showid='" + axisTypes[0] + "-specialAxisInput3']", me.compBox).show();
						$("dd[showid='" + axisTypes[0] + "-specialAxisMM3']", me.compBox).show();
					} else {
						$("div[showid='" + axisTypes[0] + "-specialAxisInput3']", me.compBox).hide();
						$("dd[showid='" + axisTypes[0] + "-specialAxisMM3']", me.compBox).hide();

					}
				}

			});
			// 绑定属性颜色滑动条


			//是否显示图例级联
			$(this.compBox).find("#showLegend").on("click", function (e) {

				e.stopPropagation();
				var checked = $(this).is(':checked');

				if (zRight.option.component.props) {
					if (zRight.option.component.props.commonProp) {
						var commonProp = zRight.option.component.props.commonProp;
					}
				}
				if (checked) {
					checkVal = 1; //选中


					var legendAlignOpt = [];
					if (zRight.option.chartCategory == "f_chart") {
						var legendAlignOpt = $("select[xname='legendPositon']", "ul[rel='common']").find(
								"option[chart-type='f_chart']");
						$(".legendBox").find("option[chart-type='e_chart']").hide();
						$(".legendBox").find("option[chart-type='f_chart']").show();
						if (commonProp.legendPositon) {
							for (var i = 0; i < legendAlignOpt.length; i++) {
								if (commonProp.legendPositon == $(legendAlignOpt[i]).attr("value")) {
									$(legendAlignOpt[i]).attr("selected", "selected").siblings("option").removeAttr(
											"selected");
								}
							}
						} else {
							$(legendAlignOpt[0]).attr("selected", "selected").siblings("option").removeAttr("selected");
						}
					} else if (zRight.option.chartCategory == "z_chart") {
						var legendAlignOpt = $("select[xname='legendPositon']", "ul[rel='common']").find(
								"option[chart-type='e_chart']");
						$(".legendBox").find("option[chart-type='e_chart']").show();
						$(".legendBox").find("option[chart-type='f_chart']").hide();
						if (commonProp.legendPositon) {
							for (var i = 0; i < legendAlignOpt.length; i++) {
								if (commonProp.legendPositon == $(legendAlignOpt[i]).attr("value")) {
									$(legendAlignOpt[i]).attr("selected", "selected").siblings("option").removeAttr(
											"selected");
								}
							}
						} else {
							$(legendAlignOpt[0]).attr("selected", "selected").siblings("option").removeAttr("selected");
						}
					}
					$(".legendBox").show();

				} else {
					checkVal = 0; //非选中
					$(".legendBox").hide();
				}

			});

			//绑定颜色
			this.bindColor();
		},
		bindColor: function () {
			//背景色
			this.bindJPicker(this.bgColor);
			//控件标题字颜色
			this.bindJPicker(this.titleFontColor);
			//柱形图柱颜色
			this.bindJPicker(this.barColor);
			//横向柱图
			this.bindJPicker(this.barstripColor);
			//折线图
			this.bindJPicker(this.LineColor);
			//环形图颜色
			this.bindJPicker(this.pieColor);

		},
		//
		setDefaultColor: function (id) {
			var me = this;
			if (id == me.titleFontColor) {
				$.jPicker.List[1].color.active.val('hex', me.defaultColor, this);
			} else if (id == me.bgColor) {
				$.jPicker.List[0].color.active.val('hex', me.defaultColor, this);
			} else if (id == me.barColor) {
				$.jPicker.List[2].color.active.val('hex', me.defaultColor, this);
			} else if (id == me.barstripColor) {
				$.jPicker.List[3].color.active.val('hex', me.defaultColor, this);
			}
		},
		//  绑定背景颜色
		bindJPicker: function (id) {
			var me = this;
			var wh = $(window).height();
			var ww = $(window).width();
			var left = (ww - 755) + "px";

			function commitCallback(color, context) { //点ok时生成colorVal
				var all = color.val('all');

				var colorVal = "#" + all.hex;
				var colorRgb = color.val('rgb');
				var pram = {
					commonBg: colorRgb
				}

				if (id == me.titleFontColor) {
					// me.Zlay.curObject.setTitleFontColor(colorVal);
				} else if (id == me.bgColor) {
					//me.Zlay.curObject.setBgColor(pram);//背景色暂时去掉
				}

			}

			function cancelCallback(color, context) {
				var colorVal = "#" + me.defaultColor;
				// me.Zlay.curObject.setTitleFontColor(colorVal);
				me.setDefaultColor(id); //还原为数据库返回的初始值
			}

			$('#' + id).jPicker({
						window: {
							position: {
								x: left,
								/* acceptable values "left", "center", "right", "screenCenter", or relative px value */
								y: '150px' /* acceptable values "top", "bottom", "center", or relative px value */
							},
							expandable: true
						},
						color: {
							//mode: 'h', // acceptable values "h" (hue), "s" (saturation), "v" (brightness), "r" (red), "g" (green), "b" (blue), "a" (alpha)
							active: new $.jPicker.Color({
								hex: me.defaultColor
							}), // accepts any declared jPicker.Color object or hex string WITH OR WITHOUT '#'

						},
						images: {
							clientPath: 'src/assets/vendor/jPicker/images/',
							/* Path to image files */
						},
					},
					commitCallback, function liveCallback(color, context, input) {
						if (color.val() == null) {
							return false;
						}
					},
					cancelCallback);

		},
		//属性事件
		// propsEvent: function(Zlay){
		//   var me = this;
		//   me.Zlay = Zlay;
		//   me.propertiesBindEvent();
		//
		// },
		//绑定属性事件
		propertiesBindEvent: function () {
			var me = this;
			//标题字体
			$("select[prop-type='font']", me.compBox).on("change", function () {

				var selectVal = me.getSelectVal("select[prop-type='font']");
				// if(me.Zlay.curObject){
				//   me.Zlay.curObject.setTitleFont(selectVal);
				// }
			});
			//标题font-size
			$("select[prop-type='fontSize']", me.compBox).on("change", function () {
				var selectVal = me.getSelectVal("select[prop-type='fontSize']");
				// if(me.Zlay.curObject){
				//   me.Zlay.curObject.setTitleFontSize(selectVal);
				// }
			});
			//标题font-style
			$("div[prop-type='fontOther'] > i", me.compBox).on("click", function () {

				var fmark = "";
				if ($(this).hasClass("active")) {
					$(this).removeClass("active");
					fmark = $(this).attr("class").substr(0, 1) + "1";
					//   if(me.Zlay.curObject){
					//       me.Zlay.curObject.setTitleFontOther( fmark );
					// }

				} else {
					$(this).addClass("active");
					fmark = $(this).attr("class").substr(0, 1) + "2";
					//   if(me.Zlay.curObject){
					//       me.Zlay.curObject.setTitleFontOther( fmark );
					//   }
				}
			});
			//标题位置 prop-type="titlePositon"
			$("select[prop-type='titlePositon']", me.compBox).on("change", function () {
				var selectVal = me.getSelectVal("select[prop-type='titlePositon']");
				// if(me.Zlay.curObject){
				//   me.Zlay.curObject.setTitleAlign(selectVal);
				// }
			});
			//通用属性select
			$("select[prop-type='commonPropSlt']", me.compBox).on("change", function () {
				//var selectVal = me.getSelectVal("select[prop-type='commonPropSlt']");
				var xName = $(this).attr("xname");
				var selectVal = me.getSelectVal('select[xname="' + xName + '"]');
				var pram = {
					name: xName,
					val: selectVal
				}
				// if(me.Zlay.curObject){
				//   me.Zlay.curObject.setCommonProp(pram);
				//   me.Zlay.curObject.renderComponent();
				// }
			});
			//显示间隔
			$("div[prop-type='commonPropText']", me.compBox).find("input[type='text']").on("blur", function () {
				var reg = new RegExp("^[0-9]*$");
				if (!reg.test($(this).val())) {
					$(this).css({
						"color": "#FD0808"
					});
					$(this).focus();
				} else {
					$(this).css({
						"color": "##2f5a93"
					});
					var axisdata = {
						name: $(this).attr("valname"),
						val: $(this).val()
					};

					//  if(me.Zlay.curObject){
					//       me.Zlay.curObject.setCommonProp(axisdata);
					//       me.Zlay.curObject.renderComponent();
					//  }
				}
			});
			//专有属性 坐标轴选择
			$("select[prop-type='specialAxis']", me.compBox).on("change", function () {

				var axis = $(this).find("option:selected").attr("value");
				var axisdata = {
					name: "axisType",
					val: axis
				};

				//  if(me.Zlay.curObject){
				//       me.Zlay.curObject.setAxis(axisdata);
				//       me.Zlay.curObject.renderComponent();
				//  }
			});

			//专有属性坐标
			$("li[prop-type='barAxis']", me.compBox).find("input[type='text']").on("blur", function () {
				var axisdata = {
					name: $(this).attr("valname"),
					val: $(this).val()
				};

				//  if(me.Zlay.curObject){
				//       me.Zlay.curObject.setAxis(axisdata);
				//       me.Zlay.curObject.renderComponent();
				//  }
			});
			//专有属性坐标极值
			$("li[prop-type='barAxisVal']", me.compBox).find("input[type='text']").on("blur", function () {
				var reg = new RegExp("^[0-9]*$");
				//输入的不是数值时
				if (!reg.test($(this).val())) {
					$(this).css({
						"color": "#FD0808"
					});
					$(this).focus();
				} else {
					//最大极值小于最小极值时
					if ($(this).attr("valname") == "ylMax") { //当前输入项是最大极值时
						var ylMinVal = $(this).siblings("input[valname='ylMin']").val();

						if (parseFloat(ylMinVal) > parseFloat($(this).val())) { //坐标极值最大值小于最小值时
							$(this).css({
								"color": "#FD0808"
							});
							$(this).focus();
						} else { //坐标极值最大值，最小值时 正常输入
							$(this).css({
								"color": "#2f5a93"
							});
							var axisdata = {
								name: $(this).attr("valname"),
								val: $(this).val()
							};
							//      if(me.Zlay.curObject){
							//           me.Zlay.curObject.setAxis(axisdata);
							//       me.Zlay.curObject.renderComponent();
							//  }
						}
					} else { //其他input[type='text']的输入框
						$(this).css({
							"color": "#2f5a93"
						});
						var axisdata = {
							name: $(this).attr("valname"),
							val: $(this).val()
						};
						//  if(me.Zlay.curObject){
						//       me.Zlay.curObject.setAxis(axisdata);
						//       me.Zlay.curObject.renderComponent();
						//  }
					}

				}

			});

			//属性checkbox bind
			$("div[prop-type='spcPropCheck']", me.compBox).find("input[type='checkbox']").on("change", function (e) {

				var axisdata = {
					name: $(this).attr("valname"),
					val: $(this).is(':checked').toString(),
					propType: $(this).attr("propType"),
				};
				//      if(me.Zlay.curObject && axisdata.propType == "3"){
				//       me.Zlay.curObject.setAxis(axisdata);
				//       me.Zlay.curObject.renderComponent();
				//  }else if(me.Zlay.curObject && axisdata.propType == "2"){
				//      me.Zlay.curObject.setCommonProp(axisdata);
				//      me.Zlay.curObject.renderComponent();
				//  }
				e.stopPropagation();
			});

			//饼图专有属性
			$("li[prop-type='piePropVal']", me.compBox).find("input[type='text']").on("blur", function () {
				var axisdata = {
					name: $(this).attr("valname"),
					val: $(this).val()
				};
				//  if(me.Zlay.curObject && $(this).val()){
				//       me.Zlay.curObject.setAxis(axisdata);
				//       me.Zlay.curObject.renderComponent();
				//  }
			});
			//饼图 名称 百分比 值事件
			$("li div[prop-type='spcPropCheck']", me.compBox).find("input[rel='group']").on("click", function () {

				var getid = $(this).attr("id");
				//              var check1=$("#chk3").is(':checked');
				//              var check2=$("#chk33").is(':checked');
				//              var check3=$("#chk333").is(':checked');

				if (getid == "chk33") {
					if (this.checked) {
						$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").prop("checked", false);
						$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").click();
						$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").prop('disabled', true);
						$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").prop("checked", true);
					} else {
						$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").prop('disabled', false);
						$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").prop("checked", true);
					}
					$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").click();
				}
				if (getid == "chk333") {
					if (this.checked) {
						$("#chk333").click(function () {
							if (this.checked) {
								$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").prop('disabled',
										false);
								$("li div[prop-type='spcPropCheck']", me.compBox).find("#chk333").prop("checked", true);

							}
						})
					}
				}
			});


			// ---------------------------时间轴属性操作----------------------------------

			//TODO
			var spTimeBox = $("div[prop-type='spTimePropCheck']", me.compBox);




			//绑定 时间轴属性
			$(":checkbox", spTimeBox).on("change", function (e) {
				var $this = $(this);
				if ($(":checkbox:checked", spTimeBox).length == 0) {
					layer.msg("默认选中一项");
					$this.trigger('click');
					me._syncCheck($this)
					return;
				}

				me.syncCheckedDefault();

				//      me.Zlay.curObject.setTimepickProp(me.getTimepickPropData());
				//      me.Zlay.curObject.syncTimepickProp();

				e.stopPropagation();
			});

			$("select", spTimeBox).on("change", function (e) {
				//      me.Zlay.curObject.setTimepickProp(me.getTimepickPropData());
				//      me.Zlay.curObject.syncTimepickProp();
				e.stopPropagation();
			});


			$("#st-isFixed-checked").on("change", function (e) {
				//      me.Zlay.curObject.setTimepickProp(me.getTimepickPropData());
				//      me.Zlay.curObject.syncTimepickProp();
				e.stopPropagation();
			})

			// ---------------------------时间轴属性操作----------------------------------

		},


		_syncCheck: function () {
			var spTimeBox = $("div[prop-type='spTimePropCheck']", this.compBox);
			var $checkObj = $(":checkbox:checked", spTimeBox);
			var id = $checkObj.attr("id");
			var type = "quarter";
			if (id == "st-day-checked") type = "date";
			if (id == "st-hour-checked") type = "hour";
			$("#st-default-type").val(type);
		},

		/**
		 * 同步时间轴属性中 时间刻度和默认刻度关系方法
		 * 只有一个刻度选中时 同步默认时间刻度  禁用默认时间刻度选择框, 如果选中大于多个刻度时 解除禁用
		 */
		syncCheckedDefault: function () {
			var spTimeBox = $("div[prop-type='spTimePropCheck']", this.compBox);
			// 只剩一个选项时 同步 默认值为为默认选项 并禁止
			var checkedItem = $(":checkbox:checked", spTimeBox);
			var defaultItem = $("#st-default-type");
			if (checkedItem.length == 1) {
				this._syncCheck(checkedItem)
				defaultItem.prop("disabled", "disabled")
			} else {
				defaultItem.removeProp("disabled")
			}

		},

		//TODO
		// 设置时间轴属性
		setTimepickPropStatus: function (op) {

			var tpIsDay = op.tpIsDay,
					tpIsHour = op.tpIsHour,
					tpIsQuarter = op.tpIsQuarter,
					tpMinSize = op.tpMinSize,
					tpDateFormat = op.tpDateFormat,
					tpIsFixed = op.tpIsFixed,
					tpDefaultType = op.tpDefaultType;

			$("#st-day-checked").prop("checked", util.isTrue(tpIsDay));
			$("#st-hour-checked").prop("checked", util.isTrue(tpIsHour));
			$("#st-quarter-checked").prop("checked", util.isTrue(tpIsQuarter));
			$("#st-isFixed-checked").prop("checked", util.isTrue(tpIsFixed));
			$("#st-default-minSize").val(tpMinSize);
			$("#st-default-format").val(tpDateFormat)
			$("#st-default-type").val(tpDefaultType)
		},

		// 获取时间轴属性
		getTimepickPropData: function () {

			var isDay = $("#st-day-checked").prop("checked");
			var isHour = $("#st-hour-checked").prop("checked");
			var isQuarter = $("#st-quarter-checked").prop("checked");
			var isFixed = $("#st-isFixed-checked").prop("checked");
			var defaultMinSize = $("#st-default-minSize").val();
			var defaultDateFormat = $("#st-default-format").val();
			var defaultType = $("#st-default-type").val();
			return {
				tpIsDay: isDay,
				tpIsHour: isHour,
				tpIsQuarter: isQuarter,
				tpMinSize: defaultMinSize,
				tpDateFormat: defaultDateFormat,
				tpDefaultType: defaultType,
				tpIsFixed: isFixed
			}
		},


		//获取下拉框选中值
		getSelectVal: function (selects) {
			var me = this;
			var selectVal = $(selects, me.compBox).find("option:selected").attr("value");
			return selectVal;
		}


	 }
	}

</script>
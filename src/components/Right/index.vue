<template>
	<div id="zlayoutRight" class="commonLayout">
		<h2 class="zlayoutTitle"><strong>属性区</strong><span class="zlayout-dropUp"></span></h2>

		<div class="rightContent">
			<ul class="nav" id="zRight_component">
				<li class="nav_c_con">
					<r-basic-attr></r-basic-attr>
				</li>
				<li class="nav_c_con">
					<r-public-attr></r-public-attr>
				</li>
				<li class="nav_c_con">
					<r-proper-attr></r-proper-attr>
				</li>
				<li class="nav_c_con">
					<r-data-cascade></r-data-cascade>
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
	import util from "./../../util/zUtil"
	import jPicker from "../../assets/vendor/jPicker/jPicker-1.1.6.min"
	import range from "../../assets/vendor/range/js/ion-rangeSlider/ion.rangeSlider"
	import RBasicAttr from "./RBasicAttr"
	import RPublicAttr from "./RPublicAttr"
	import RProperAttr from "./RProperAttr"
	import RDataCascade from "./RDataCascade"
	export default {
	data() {
		return {}
	},
	ready() {
		this.init();
		this.bindEvent();
	},
	components : {
        RBasicAttr,
        RPublicAttr,
        RProperAttr,
        RDataCascade
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
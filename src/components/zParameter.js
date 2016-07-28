
/**
 * 查询组件类型
 */
import $ from "jquery"
import RC from "util/ResourcesConfig"
import _ from "lodash"

var zParameter = (function(me){
	return me = {

		COMP_NAME : {
			SELECT : "dropDownMenu",
			BUTTONRADIO : "buttonRadio",
			SWITCHBTN : "switchBtn",
			STIME : "startTime",
			ETIME : "endTime",
			TIMETYPE : "timeType",
			TIMETYPE2 : "timeTypeComponent",
			TEXT : "searchText",


			// 查询日期rang组
			DR_STIME : "DR_START_TIME",
			DR_ETIME : "DR_END_TIME",

			// 子窗体参数
			ZW_BTN : "ZW_BUTTON",
			ZW_STIME : "ZW_START_TIME",
			ZW_ETIME : "ZW_END_TIME",
			ZW_TIMETYPE:"ZW_TIMETYPE"

		},

		// 特殊参数
		custormParam:{},

		// 子窗体参数
		parameter2 :{},
		// 子窗体参数
		setParam2 : function(params){
			if($.isArray(params)){
				params.forEach(function(param){
					me.parameter2[param.name] = param
				});
			}
			//console.log(me.parameter2)
		},

		parameter : [],
		init : function(parameter){
			me.parameter = parameter ;
		},


		// 添加一个或者一组查询参数
		add : function(param){
			if($.isArray(param)){
				me.parameter = me.parameter.concat(param);
			}else {
				me.parameter.push(param);
			}

		},

		isHas : function(zid){
			var flag = false;
			zid = zid.replace("_view","");
			if(me.parameter){
				me.parameter.forEach(function(it){
					if(it.zid == zid){
						flag = true;
					}
				});
			}
			return flag;
		},

		//是否包含指定属性
		isHasArr : function(attr){
			var flag = false;
			if(me.parameter){
				me.parameter.forEach(function(it){
					if(it.name ==attr){
						flag = true;
					}
				});
			}
			return flag;
		},

		//移除一个param
		removeParam : function(zid){
			if(me.parameter){
				var index = 0;
				for(var i= 0,len= me.parameter.length ;i<len ;i++){
					if(me.parameter[i].zid === zid){
						index = i;
					}
				}
				me.parameter.splice(index,1);
			}
		},


		// 删除一组参数
		removeParamArr: function(Arr){
			var arr = [];
			var exp = "";
			Arr.forEach(function(key){
				if(key)exp +=key + "|";
			});
			exp = exp.substring(0,exp.length-1);
			var reg = new RegExp(exp);
			if(me.parameter){
				me.parameter.forEach(function(it){
					if(!reg.test(it.name)){
						arr.push(it);
					}
				});
			}
			me.parameter = arr;
			console.log(me.parameter)
		},


		// 删除时间轴的参数
		removeParamTime : function(){
			me.removeParamArr([me.COMP_NAME.STIME,me.COMP_NAME.ETIME,me.COMP_NAME.TIMETYPE]);
		},

		// 同步param值
		syncParam : function(param){
			var id = param.zid;
			id = id.replace("_view","");
			if(me.parameter){
				if(me.isHas(id)){
					me.parameter.forEach(function(it){
						if(it.zid == id ){
							if(param.value!=null){
								it.value = param.value;
							}
							if(param.labelName){
								it.labelName = param.labelName;
							}
							it.name = param.name;
							//TODO 替换dateset
						}
					});
				}else{
					me.add(param);
				}
			}
			console.log(me.parameter)
		},

		// 同步时间轴的属性
		syncParamTime : function(id,paramData){
			if(me.parameter){
				id = id.replace("_view","");
				for(var key in paramData){
					if(me.isHasArr(key)){
						me.parameter.forEach(function(it){
							if(it.name == key){
								it.value = paramData[key];
								it.name = key;
							}
						});
					}
					else{
						me.add({name : key ,value:paramData[key],zid : id});
					}
				}
			}
		},

		/**
		 * 根据触发查询的ZID 过滤非当前其他查询组件 让其不触发查询
		 * @param zid 触发查询组件ID
		 * @param zObjs 所有组件对象
		 */
		getShouldQueryObj : function(zid,zObjs){
			var arr = {};
			// true 查询, false 不查询
			var isTrueWillDoParam = function(option){
				var compType = option.componentType;
				var childType = option.childType;
				var flag = false;
				if(compType !==RC.ZCOMP_TYPE.SEARCH){
					flag = true;
				}
//					// 时间刻度
//					if(childType == RC.Z_SEARCH_COMPONENT.TIME_PICKER){
//						flag = true;
//					}
//					// 开关按钮
//					if(childType == RC.Z_SEARCH_COMPONENT.SWITCH_BTN){
//						flag= true;
//					}
				return flag;
			}
			if(zObjs){
				for(var id in zObjs){
					var zObj = zObjs[id];
					// 不是当前zid 并且不是查询控件系列() 添加到新集合
					if(id !== zid && isTrueWillDoParam(zObj.option)){
						arr[id] =zObjs[id];
					}
				}
			}


			return arr;
		},


		/**
		 * 此方法是时间轴触发时候调用 目的是 时间轴全局查询时 有级联的查询组件无法得到当前值 所以手动设置下查询条件的全局参数
		 * @param searchObj 查询组件
		 * @returns
		 */
		setNotTimepikerParam : function(searchObj){
			if($.isArray(searchObj)){
				searchObj.forEach(function(it){
					 me.syncParam(it.getValue())
				});
			}
		},


		get : function(zid){
			var param ;
			if(me.parameter){
				me.parameter.forEach(function(it){
					if(it.zid == zid)param = _.clone(it) ;
				});
			}
			return param;
		},
		// 获得所有查询条件
		getParams:function(){
			return _.clone(me.parameter,true);
		},
		// 获得非查询条件的parameter集合
		getParamView : function(){
			var arr = [];
			if(me.parameter){
				me.parameter.forEach(function(it){
					if(!it.zid){
						arr.push(it);
					}
				})
			}
			return arr;
		}
	}
})()
	
	
export default zParameter

/**
 * 组件策略类 提供多套组件的逻辑
 */

import {ZCOMP_TYPE as CompType} from "./ResourcesConfig"
import {MorkData} from "./MockData"


function chartSetting(type , n){
	var option = {};
	switch(type){
		case 'bar' :
			option = { };
			break ;
		case 'line' :
			option = { };
			break ;
		case 'pie' :
			option = { };
			break;
		case 'force' :
			option = {type : n};
			break;
		case  'map' :
			if(n == 1){
				option ={
					mapType :"china",
				};
			}else if(n ==2 ){
				option ={
					mapType :"辽宁",
				};
			}
			else if( n == "wh"){
				option = {
					mapType : "湖北"
				}
			}
			else if( n == "xj"){
				option = {
					mapType : "xinjiang"
				}
			}
			else if( n == "zj"){
				option = {
					mapType : "zhejiang"
				}
			}
			else if( n == "cq" || n =="cq1"){
				option = {
					mapType : "chongqing"
				}
			}
			else if( n == "cq2"){
				option = {
					mapType : "cq2"
				}
			}
			//  迁徙地图
			else if(n==3){
				option = {
					mapType : "qianxi"
				};
			}
			// 世界地图
			else if( n== 4){
				option = {
					mapType :"world"
				};
			}
			// 世界染色地图
			else if( n== 5){
				option = {
					mapType :"world",
					isColor : true,
				};
			}

			break;
        default:
    }
    return option;

}



const getOptionRule = {
	[CompType.CHART](option){
		option.child  = [];
        option.component = {
            data :  MorkData(CompType.CHART,option.content.chartCategory,option.content.chartType,option.content.childType),
            dataOption :chartSetting(option.content.chartType,option.content.childType)
        };
		return option;
	},
	[CompType.TABLE](option){
		var rs = /z_table_showHide|z_table_page/.test(option.content.chartType);
		if(rs) option.css.width = 525;
		option.component.tableType = CompType.TABLE;
		return option ;
	},
	[CompType.TEXT](option){
		option.css.height = 50;
		option.component.textType = CompType.TEXT;
		option.component.isMulti = option.content.chartType == "1" ? true : false;
		return option;
	},
	[CompType.SEARCH](option){
		option.css.height = 50;
		return option;
	},
	[CompType.DATERANGE](option){
		option.css.height = 100;
		option.css.width = 800;
		return option;
	},
	[CompType.OTHER](option){
		option.css.height = 50;
		option.css.width = 50;
		return option;
	},

};


const getNameRule = {
	[CompType.CHART](){
		return "图表";
	},
	[CompType.TABLE](){
		return "表格" ;
	},
	[CompType.TEXT](){
		return "文本";
	},
	[CompType.SEARCH](){
		return "查询";
	},
	[CompType.DATERANGE](){
		return "时间段";
	},
	[CompType.OTHER](){
		return "特殊";
	},
};

// 根据类型 返回vue用的组件名称
const getVueComponentName = {
	[CompType.CHART](){
		return "Chart";
	},
	[CompType.TABLE](){
		return "Tables" ;
	},
	[CompType.TEXT](){
		return "Text";
	},
	[CompType.SEARCH](){
		return "Search";
	},
	[CompType.DATERANGE](){
		return "Daterange";
	},
	[CompType.OTHER](){
		return "Ohter";
	},
};



export default {

    getName(type){
        return getNameRule[type]();
    },
    defaultOtion(type,option){
        return getOptionRule[type](option)
    },
	getVueComponent(type){
		return getVueComponentName[type]();
	}
}


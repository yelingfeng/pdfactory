import Element from "./../core/Element"
import {TestAction,SyncComponentOption} from "./../vuex/actions"
import Component from "vue-class-component"
import {log,int} from "./../util/zUtil"
import {defaultOtion} from "./../util/componentStrategy"

import Chart from "./Chart"
@Component({
	props : {
		options:{
			type:Object,
			default: function () {
	           return { }
	        }
		},
		isView:{
			type : Boolean,
			default : true
		}
	},
	vuex:{
		actions:{
			TestAction,SyncComponentOption
		}
	},
	components:{
		Chart
	},
	template:`
		<Element id="abc" :max-num='1' :w="w" :h="h" :x="x"  :y="y" >
			 <component :is="compName"></component>
		</Element>
	`
})
export default class BaseComponent extends Element{
	data(){
		//var compName = this.options.content.type
		return {
			compName:"Chart",
            myOption : {}
		}
	}
	ready(){
		this.createComponent();
	}
	createComponent(){
        this.myOption = Object.assign({component:{}},this.options);
        let width = int( this.myOption.coordinate.width);
        let height = int( this.myOption.coordinate.height);
        let top = int( this.myOption.coordinate.y);
        let left = int( this.myOption.coordinate.x);
		//log(option)
		//let zindex = option.levelIndex;
		//let childType = option.content.childType ;
		//let chartType = option.content.chartType ;
		//let tableType = option.content.tableType;
		//let border = option.border;
		//let clsName = option.clsName ;
		//let zid = this.isView ? option.zid + "_view" : option.zid ;

		//let child = option.child ;
		//let visible = int(option.visible);// �Ƿ��ɼ���ͼ
		//let isChild = visible == 0 ? true : false;
		//let remark = option.remark;
		//let title = option.titleName;
		//let opacity = int(option.coordinate.opacity);
		//let cascade = option.content.cascade ;
		//let	datasets  = option.content.datasets;
		//let componentType  = option.content.type ;
		//let dataOption = option.data ;
		//let chartCategory = option.content.chartCategory;
		//let content = option.content;
		//let textType = clsName;
		//let props = option.props ;
		//let isMulti = childType ;
		//let name = option.name;
		//let maxNum = option.num;
    var op = defaultOtion(this.myOption.content.type ,this.myOption );
    log(op);
    this.SyncComponentOption(op);
		this.w = width ;
		this.h = height ;
		this.x = left ;
		this.y = top;

		//let component = {
		//	type : componentType,
		//	chartType :chartType,
		//	childType : childType,
		//	tableType : chartType,
		//	props : option.props,
		//	chartCategory : option.chartCategory,
		//	cascade : cascade,
		//	datasets :datasets,
		//	textType : clsName,
		//	isMulti : childType,
		//	zid : zid,
		//	content:  option.content,
		//	data :  {
		//		content :  option.content.content,
		//	}
		//}
		//var componentType =  it.content ==null ? 0 : it.content.type,
		//	childType = it.content.childType,
		//	chartType = it.content.chartType,
		//	tableType = it.content.tableType,
		//	_id = it.zid + "_view",
		//	zindex =  it.levelIndex ,
		//	border = it.border,
		//	clsName = it.clsName,
		//	_opt = {
		//		zid : _id,
		//		border : border,
		//		// �ɼ���ͼ ���ǲ��ɼ���ͼ 1 �ɼ� 0 ���ɼ�
		//		// ��ͼ��ID
		//		css : {
		//			width : int(it.coordinate.width),
		//			height :int(it.coordinate.height),
		//			top :  int(it.coordinate.y),
		//			left : int( it.coordinate.x),
		//			opacity : int(it.citoordinate.opacity)
		//		},
		//		border : it.border,
		//		child  :  it.child,
		//		visible : int(it.visible),
		//		isChild : it.visible == 0 ? true : false,
		//		zIndex :  int(zindex),
		//		remark : it.remark,
		//		name : it.code,
		//		isView : true,
		//		title : it.titleName,
		//		component : {
		//			type  : componentType,
		//			chartType : chartType,
		//			childType : childType,
		//			tableType : chartType,
		//			props :it.props,
		//			titleName : it.titleName,
		//			chartCategory : it.content.chartCategory,
		//			cascade : it.content.cascade,
		//			datasets : it.content.datasets,
		//			textType : it.clsName,
		//			isMulti : it.childType,
		//			isView : true,
		//			zid : _id,
		//			content:  it.content,
		//			data :  {
		//				content :  it.content.content,
		//			},
		//			dataOption : chartSetting(chartType,childType)
		//		},
		//		appendTo : boxWapper
		//	};
        //
		//if(componentType == RC.ZCOMP_TYPE.CHART){
		//	_opt.component.data = Mocks.getMorkData(RC.ZCOMP_TYPE.CHART,it.content.chartCategory,chartType,it.content.childType)
		//	if(Zlay.isRunTime){
		//		_opt.component.data = [];
		//	}
		//}
        //
		//var ele = Zlay._createComponent(_opt);

		//let buildOp = {
		//	name : option.name ,
		//	maxNum : option.num ,
		//	css : option.css,
		//	appendTo:option.appendTo,
		//	width : option.css.width,
		//	height : option.css.height,
		//	visible : option.visible,
		//	isChild : option.isChild,
		//	isView :option.isView || false	,
		//	pid : option.pid,
		//	zIndex:option.zIndex,
		//	zid : option.zid,
		//	id : option.id,
		//	child : option.child,
		//	component : compOption,
		//	datasets : compOption.datasets,
		//	cascade : compOption.cascade,
		//	componentType : compOption.type ,
		//	data : compOption.data
		//}
        //
		//log(buildOp)
	}

}

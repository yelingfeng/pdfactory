import Element from "core/Element"
import {TestAction,SyncComponentOption} from "./../vuex/actions"
import Component from "vue-class-component"
import {log,int} from "util/zUtil"
import {defaultOtion,getVueComponent} from "util/componentStrategy"
import zIndexCommon from "./zIndexCommon"
import $ from "jquery"
import Chart from "./Chart/index"
import Tables from "./Table/index"
import Zlay from "core/Zlay"
import RC from "util/ResourcesConfig"
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
		},
	},
    vuex:{
        getters:{
            screenParamSize : ({app}) => app.globalData.size
        },
		actions:{
			TestAction,SyncComponentOption
		}
	},
	components:{
		Chart,Tables
	},
	computed:{
		compH(){
			return this.h - 30
		}
	},
	template:`
		<Element :zid="zid" :maxnum='1' :w="w" :h="h" :x="x"  :y="y" >
			 <component v-ref:comps :is="compName" :option="myOption" :w="w" :h="compH"></component>
		</Element>
	`
})
export default class BaseComponent extends Element{
	data(){
		var compName = getVueComponent(this.options.content.type)
		return {
			compName:compName,
            myOption : {},
            isRunTime:true
		}
	}
    created(){
        this.myOption = Object.assign({component:{}},this.options);
        this.createComponent();

		var zid = this.zid ;
		if(Zlay.isRunTime){
			zid =  zid + "_view"
		}
		Zlay.Zids.push(zid);
        Zlay.Z[zid] = this;
    }
	ready(){
        this.initScreenSize();
	}


	createComponent(){
        let width = int( this.myOption.coordinate.width);
		let height = int( this.myOption.coordinate.height);
		let top = int( this.myOption.coordinate.y);
		let left = int( this.myOption.coordinate.x);
		this.w = width ;
        this.h = height ;
        this.x = left ;
        this.y = top;
        this.zid = this.myOption.zid;
		this.componentType = this.myOption.content.type;

        // 设置属性
		var op = defaultOtion(this.componentType,this.myOption);
        //log(op);
        // 同步到跟store
		this.SyncComponentOption(op);

        this.myOption = op;


        // 设置组件的zindex
        zIndexCommon.put($(this.$el),this.myOption.levelIndex)

	}

    // 初始化屏幕占比数 为自适应做处理
    initScreenSize(){
        var size = this.getBoundSize();
        var screenSize = {
            w : size.w,
            h : size.h ,
            left : size.left,
            top : size.top >= 50 ? size.top - 50 : size.top,
            containerH : this.isRunTime ? this.screenParamSize.height : size.parentHeight ,
            containerW : this.isRunTime ? this.screenParamSize.width :size.parentWidth
        }
		this.screenSize = screenSize;
    }



	// 加载数据
	loadDataSource(){
		var op, fn = function(){};
		var me = this;
		if(arguments.length){
			if(arguments.length == 1){
				if(typeof arguments[0] == "object"){
					op = arguments[0];
				}else{
					fn = arguments[0];
				}
			}else if(arguments.length ==2){
				op = arguments[0];
				fn = arguments[1];
			}
		}
		var datasets =[];

		if($.isArray(op)){
			datasets = op;
		}else{
			datasets = me.myOption.content.datasets;
		}
		// 主模块数据源 ,动态标题数据源
		var mainDs=[],textDs=[];
		if(datasets == null){
			return ;
		}
		datasets.forEach(function(it){
			if(it.type =="1"){
				//计算伸缩表格初始化行数
				if(me.componentType == RC.ZCOMP_TYPE.TABLE ){
					if(me.myOption.content.chartType == "z_table_showHide"){
						it.rows = Math.round($(window).height()/120-1);
					}
					//分页表格
					if(me.myOption.content.chartType== "z_table_page"){
						it.page = 1;
						it.rows = 10 ;
					}
				}
				mainDs.push(it);
			}else if(it.type == "2"){
				textDs.push(it);
			}
		});


		// 文本特殊查询textDs
		if(me.componentType == RC.ZCOMP_TYPE.TEXT){
			var isEmptyParam =false;
			textDs.forEach(function(it){
				if(it.paramStr.length == 0){
					isEmptyParam = true;
				}
			})
			Zlay.common.loadDataSource({datasets : textDs},function(reply){
				me.titleDidLoader && me.titleDidLoader(reply);
				(fn && typeof fn === "function" ) && fn();
			});
			return ;
		}

		Zlay.common.loadDataSource({datasets : mainDs},function(reply,type){
			mainCallback(reply,type);
		});

		function getCascadeData(type,data){
			// 2返回最后一个
			return type == 2 ? data[data.length-1] : data[0];
		}


		var mainCallback = function(reply,type){
			var replyData = reply.rows;
			// 获取当前级联选择方向
			var cascadeValueType = me.myOption.content.props.commonProp.cascadeValueType;
			cascadeValueType = (cascadeValueType == undefined || cascadeValueType == "") ? 1 : cascadeValueType;
			if(replyData && replyData.length){
				// 1 取首   2取 尾
				me.lastData  = getCascadeData(cascadeValueType,replyData);
			}else{
				reply.rows = [];
				me.lastData = Zlay.createCascadeEmpty();
			}
			if(me.option.component.chartType == "line"){
				// 特殊处理上下折线图
				var cascadeData = Zlay.handerLineFlagData(replyData);
				// 没有特殊字段 取最后一条记录
				cascadeData = cascadeData != null ?
					cascadeData :getCascadeData(cascadeValueType,replyData);
				window._echart_line_hoverData_X = cascadeData;
			}


			if(me.componentType == RC.ZCOMP_TYPE.TABLE){
				me.componentDidLoader(reply);
			}else{
				me.componentDidLoader(replyData);
			}

			if(textDs.length){
				Zlay.common.loadDataSource({datasets : textDs},function(reply){
					me._setTitleName(reply);
				});
			}else{
				me.initCompTitle();
			}
			(fn && typeof fn === "function" ) && fn();
		}
	}


	/**
	 * 设置组件标题
	 */
	initCompTitle(title){
		const me = this;
		const props = me.myOption.props ;
		if(me.myOption.titleName != "" ){

		}
	}



	resizeComponent(){

		this.$refs.comps.resize()
	}


	_setBound(){

	}

	resizeBox(){
		if(!this.isView)return ;
		if(this.componentType== RC.ZCOMP_TYPE.OTHER ){
			return ;
		}
		var ch = $(window).height(),
			cw = $(window).width();

		var screenParam = this.screenSize;
		var vectorH =  Math.floor((screenParam.h  * ch )/ screenParam.containerH);
		var vectorW = Math.floor((screenParam.w * cw ) /screenParam.containerW)  ;
		var vectorLeft = Math.floor((screenParam.left * cw )/ screenParam.containerW );
		var vectorTop =  Math.floor((screenParam.top * ch )/ screenParam.containerH );
//				console.log("旧top："+screenParam.top);
//				console.log("旧高:"+screenParam.containerH + ",当前高:"+ch)
		vectorH = RC.ZELEMENT_MINH >= vectorH ? RC.ZELEMENT_MINH  : vectorH;
		vectorW = RC.ZELEMENT_MINW >= vectorW ? RC.ZELEMENT_MINW : vectorW;
//				vectorLeft = vectorLeft <= screenParam.left ? screenParam.left : vectorLeft ;
//				vectorTop = vectorTop <= screenParam.top ? screenParam.top : vectorTop ;
		vectorTop = vectorTop <= 0 ? 10 : vectorTop;
		vectorLeft = vectorLeft <= 0 ? 10 : vectorLeft;

		// 查询按钮最小left
		if(this.myOption.content.childType == RC.Z_SEARCH_COMPONENT.SUBMITBUTTON){
			if(vectorLeft<530){
				vectorLeft = 530;
			}
		}

		if( this.componentType == RC.ZCOMP_TYPE.SEARCH &&
			this.myOption.content.childType !==RC.Z_SEARCH_COMPONENT.TIME_PICKER){
			this.x = vectorLeft;
			this.y = vectorTop
		}else{
			// 变化前 left 与容器宽度比
			this.w = vectorW;
			this.h = vectorH;
			this.x = vectorLeft;
			this.y = vectorTop
		}


		this.resizeComponent();
	}



}

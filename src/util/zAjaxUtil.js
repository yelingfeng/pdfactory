
/**
 * zAjaxUtil ajax工具类
 * 封装接口处理方法
 * @author xiaofan
 */
import $ from "jquery";


const PATH  = {
	getBase : function(){
		return this.getRootPath();
	},
	getRootPath : function(){
	    var curWwwPath=window.document.location.href;
	    var pathName=window.document.location.pathname;
	    var pos=curWwwPath.indexOf(pathName);
	    var localhostPaht=curWwwPath.substring(0,pos);
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	    return localhostPaht + projectName + "/";
	}
};
	
	
	
var loadingFn = (function(me){
	var loadingMaskId = "loader-box-mask";
	var loadingBoxId = "loadingAjaxBox";
	return me = {
		show : function(msg){
			if($('#'+loadingBoxId).length > 0){
				return;
			} 
//				var loadingMask = $('<div id="'+loadingMaskId+'" class="loader-box-mask"></div>');
//				var loadingBox = $('<div id="'+loadingBoxId+'" class="loader-box" ><div class="loader loader--glisteningWindow"></div><div class="loader-text">'+msg+'<span class="dotting"></span></div></div>');
			
			var loadingBox = $('<div class="loading-box" id="'+loadingBoxId+'"><div class="spinnerl"><div></div><div></div><div></div><div></div><div></div><div></div><aside>'+msg+'</aside></div></div>')
			$("body").append(loadingBox);
//				.append(loadingMask);
//				loadingBox.addClass("animated fadeIn");
//				setTimeout(function(){
//					loadingBox.removeClass("animated fadeIn");
//				},500);
		},
		hide : function(){
			 var lbox = $('#'+loadingBoxId);
			 lbox.addClass("current");
			 setTimeout(function(){
				 lbox.remove();
			 },1000);
		}
	}
})();
var emptyFN = function(){};
	
var ajaxUtils = (function(me){
	return me = {
		/**
		 * getUrl
		 * @returns
		 */	
		getUrl : function(){
			return PATH.getBase();
		},
		
		ajax2 : function(bizName,option,successfn,errorfn,type){
			me.ajax(bizName,option,successfn,errorfn,type);
		},
			
		/**
		 * @param bizName 业务名称
		 * @param option 参数
		 * @param successfn 回调函数
		 * @param errorfn 错误回调
		 * @param type POST/GET
		 */	
		ajax : function(bizName,option,successfn,errorfn,type){
			
			if(!option){
				return layer.alert("请求参数错误,请设置参数");
			}
			if(bizName ==undefined || bizName == '' ){
				return layer.alert("没有配置业务请求名称bizName");
			}
			//module/previewChart
			
			var url = PATH.getBase() +  bizName ; 
			$.ajax({  
				url : url,
				type : type,
				async : option.async == undefined ? true : false  ,
				data : option,
				dataType : "JSON",
		        beforeSend : function(){
		        	//loadingFn.show("数据加载中");
		        }
			}).done(function(data){
				if(data != undefined || data != null){
					if(data.isAjax){
						if(data.redirectUrl == null || data.redirectUrl == "" || data.redirectUrl == undefined)
							throw new error("redirectUrl not founds");
						window.location.href = data.redirectUrl;
					}
				}
				if(data.status == '0')
				{
					layer.alert(data.message);
				}else if(data.status == '1'){
					(successfn && typeof(successfn) === "function") && successfn(data.result);
				}
				//loadingFn.hide();
				
			}).fail(function(xhr,status,e){
				try {
		    		errorfn(xhr, status, e);
					return false;
     			} 
				catch(e){
					layer.alert("Ajax请求数据失败!");
     				console.log("ajax request fail:" + e);
     			}	
     			finally{
     				//loadingFn.hide();
     			}
			}).always(function(xhr,status,e){
				try {
					return false;
     			} 
				catch(e){
     				console.log("ajax request complete:" + e);
     			}	
     			finally{
     				//loadingFn.hide();
     			}
			});
		},	
		
		
		/**
		 * @param myurl 模块名
		 * @param datax 
		 * @param type
		 * @param onsucc
		 * @param onerr
		 * @returns
		 */
		onRemoteCall : function( myurl, datax, type, onsucc, onerr){
			me.ajax(myurl,datax,onsucc,emptyFN,type);
		},

		biz : {
			// 
			/**
			 * 图表预览接口格式
			 * @param option 参数
			 * @param successfn 回调函数
			 * @returns
			 */
			getChartView : function (option , successfn){
				me.ajax("db/previewChart",option,successfn,emptyFN,"post");
			},
			
			/**
			 * 保存产品
			 * @param option
			 * @param successfn
			 * @returns
			 */
			save : function(option,successfn){
				me.ajax("module/saveOrUpdate",option,successfn,emptyFN,"post");
			},
			
			
			/**
			 * 根据ID 获取产品数据
			 * @param option
			 * @param successfn
			 * @returns
			 */
			getSelectModule : function(option,successfn){
				me.ajax("module/selectModule",option,successfn,emptyFN,"get");
			},
			
			/**
			 * 获得数据源list
			 * @param option 参数
			 * @param successfn 回调函数
			 * @returns
			 */
			getDataSourcesList : function(option , successfn){
				me.ajax("db/getdbs",option,successfn,emptyFN,"get");
			},
			
			/**
			 * 获得数据源表和字段
			 * @param option
			 * @param successfn
			 * @returns
			 */
			getDataSourceTables : function(option,successfn){
				me.ajax("db/getdbTree",option,successfn,emptyFN,"get");
			},
			
			/**
			 * 执行sql脚本 无参数
			 * @param option
			 * @param successfn
			 * @returns
			 */
			excuteSql:function(option,successfn){
				me.ajax("db/excuteSql",option,successfn,emptyFN,"post");
			},
			/**
			 * 执行sql脚本 有参数
			 * @param option
			 * @param successfn
			 * @returns
			 */
			excuteSqlByParams:function(option,successfn){
				me.biz.excuteSql(option,successfn)
				//me.ajax("tableCon/excuteSqlByParams",option,successfn,emptyFN,"post");
			},
			
			/**
			 * 同步请求
			 * @param option
			 * @param successfn
			 * @returns
			 */
			excuteSqlByParamsSync : function(option,successfn){
				option.async = 1;
				me.ajax("db/excuteSql",option,successfn,emptyFN,"post");
			}
			
			
			
		}
			
		
			
	}
	
	
})();
			
			
			
	
	
	
export default ajaxUtils;
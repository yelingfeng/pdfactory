/**
** z-index 轴
*/
import $ from "jquery"
import _ from "lodash"


const zIndexCommon = function (me){			
	var ALL= [],			// 缓存当前所有element的Z-index			
		zIndexCache= {},	// 缓存ele和z-index
		max = 500 , 		// 最大z-index量
		min = 10 , 			// 最小z-index量		
		curflag ,			// 当前切层状态	top topMax down downMax
		// 删除指定ele缓存
		_delete = function(ele){ 
			var _id = ele.attr("id");	
			delete zIndexCache[_id];
			_delAll();
			_maxMinSort();
		},
		// 删除ALL中的属性
		_delAll = function(id){			
			ALL.splice(_getArrayIndex(id),0);
		},
		// 设置ele z-index
		_set = function(id){ 					
			$("#"+id).css("z-index", zIndexCache[id]);
		},
		// 获取最小index
		getMin = function(){ 
			return _.min(ALL);
		},
		//获取最大index
		getMax = function(){ 	
			return _.max(ALL) ;
		},	
		// 检测z-index到临近点,整体z-index组 增加/减小 一定数值 防止z-index变成负值 				
		_Check = function(){ 
			var min = getMin();	
			var max = getMax();							
			if(min <= 10 && /down|downMax/.test(curflag)){	
				 _doDodo(10);		
			}
			if(max >= 9999 && /top|topMax/.test(curflag)){
				 _doDodo(-1000);	
			}
		},	
		// 处理整体index组 变更vnum 
		_doDodo = function(vnum){
			 ALL = [];					 
			 for(var id in zIndexCache){					 	
			 	 var index =  parseInt(zIndexCache[id],10) + vnum;
			 	 zIndexCache[id] = index ;
			 	 ALL.push(index);
			 	 _set(id);
			 }
			 _maxMinSort();	
		},
		// 根据值获取数组下标
		_getArrayIndex = function(val){
			var index = 0;
			for(var i in ALL){
			  if(ALL[i] == val){
			     index = i;
			  }
			}
			return index;
		},
		// 根据z-index获取ele Id
		_getId  = function(index){
			var id ;				
			for(var k in zIndexCache){
				if(zIndexCache[k] == index){
					id = k;
				}
			}
			return id;
		},
		// 获得下一层元素 z-index 底的一层
		_getNext =  function(ele){
			var _index = ele.css("z-index");
			// 获得数组上一位
			var _nextIndex = parseInt(_getArrayIndex(_index),10) - 1 ;				
			// 获得上一位ID
			var _nextId = _getId(ALL[_nextIndex]);				
			// 获得上一位元素
			return $("#"+_nextId);

		},
		// 获得前一层元素  z-index 高的一层
		_getPre = function(ele){
			var _index = ele.css("z-index");
			// 获得数组上一位
			var _preIndex = parseInt(_getArrayIndex(_index),10) + 1 ;								
			// 获得上一位ID
			var _preId = _getId(ALL[_preIndex]);			
			// 获得上一位元素			
			return $("#"+_preId);
		},
		// 处理单层移动 根据数组位置 切换位置
		_handerOne = function(ele,vector){
			var _index = ele.css("z-index");			
			var $wantObj = vector == 'top' ? _getPre(ele) : _getNext(ele);				
			if($wantObj == undefined || $wantObj.length == 0){
				return null;
			}	
			var wIndex = $wantObj.css("z-index");
			var _id = $wantObj.attr("id");				
			$wantObj.css("z-index",_index);
			zIndexCache[_id] = _index;
			return wIndex;
		},
			
		// 同步新的z-index(操作一次切层 把ele新z-index重新复制到缓存)
		_syncAll = function(){ 
			 ALL = [];
			 for(var id in zIndexCache){
				 if(zIndexCache[id]){
					 ALL.push(zIndexCache[id]);	
				 }
			 }		
			 _.uniq(All);
			 _maxMinSort();		 				
		},
		// 重新设置当前最大值最小值 从小到把排序
		_maxMinSort =function(){  
			if(ALL.length){
				max = getMax();
				min = getMin();
				ALL.sort(function(a,b){return a-b;});
			}
		},
		_handler = function(flag,ele){
			var wantIndex ,
				_index = ele.css("z-index"),					
				_id = ele.attr("id");

			curflag = flag;				
			// 上下一层切换
			if(/^top$|^down$/.test(flag)){
				wantIndex = _handerOne(ele,flag);
				if(wantIndex == null || wantIndex == undefined){						
					_syncAll();
					return ;
				}
			}
			// 置顶
			if("topMax" == flag){
				wantIndex = _index == getMax() ? parseInt(_index,10) + 1 : parseInt(getMax(),10) +1;
				max = wantIndex ; 
			}
			// 置底
			if("downMax" == flag){
				wantIndex = _index == getMin() ? parseInt(_index,10) - 1 : parseInt(getMin(),10)- 1;
				min = wantIndex;
			}			

			zIndexCache[_id] = wantIndex ;				
			_set(_id);
			_Check();	
			_syncAll();		

		}

	return me = {
		// 添加ele 到z-index组管理
		put : function(ele,zIndex){
			var _z = zIndex || me.getIndex(),
				_id =  ele.attr("id");
			ALL.push(_z);
			zIndexCache[_id] = _z ;
			_set(_id);
			_maxMinSort();
		},
		// 通过zid 获取z-index
		getZIndexById :function(zid){
			return zIndexCache[zid];
		},

		// 得到一个当前index (最大层+1);
		getIndex : function(){
			return max + 1 ;
		},
		// 上移一层
		addIndex : function(ele){
			_handler("top",ele);			
		},
		// 下移一层
		declineIndex : function(ele){
			_handler("down",ele);	
		},
		// 置顶层
		topIndex : function(ele){
			_handler("topMax",ele);				
		},
		// 置底层
		downIndex : function(ele){
			_handler("downMax",ele);	
		},
		// 删除元素z-index维护
		remove : function(ele){
			_delete(ele);
		}
	}
}();


export default zIndexCommon
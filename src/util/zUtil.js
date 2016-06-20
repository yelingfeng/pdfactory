/**
 * Util 工具类 通用方法可以放到这个JS中 * 
 * @author 
 */

import _ from "lodash"

const util  =  {
		
		/**
		 * [cUUid 生成唯一ID]
		 * @return {[type]} [description]
		 */
		UUid : function(){
			return this.getUUid('zid');
		},
		
		getUUid :function(key){
			var S4 = function () {
			   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			};
			return (key + '-'+S4()+S4()+'-'+S4()+S4()+'-'+S4()+S4()); 
		},
		
		
		// 数组去重复
		arrayUnique : function(array){
		    var res = [], hash = {};
		    for(var i=0, elem; (elem = array[i]) != null; i++)  {
		        if (!hash[elem]) {
		            res.push(elem);
		            hash[elem] = true;
		        }
		    }
		    return res;
		},
		//根据数组特定属性去重
		arrayUniqueAttr:function(array,attr){
			
  			 var res = [];
  			 var json = {};
  			 
  			 for(var i = 0; i < array.length; i++){
  				 
  				 if(!json[array[i][attr]]){
  					 res.push(array[i]);
  					 json[array[i][attr]] = 1;
  				 }
  			 }
  			 return res;
       	},
       	
       	//排序
       	arrayCompare:function(propertyName) {

       	    return function (object1, object2) {

       	    	var value1 = object1[propertyName];

       	    	var value2 = object2[propertyName];

       	    	if (value1 < value2) {

       	    		return -1;

       	    	}

       	    	else if (value1 > value2) {

       	    		return 1;

       	    	}

       	    	else {

       	    		return 0;

       	    	}

       	    }

       	},
		

		/**
		 * 数字转换字符 
		 * @param num 数字 
		 */
		getCharCode : function(num){
			var me = this;
			var s = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
			var sArray=s.split(",");
			if (num<1) return "";

			if (parseInt((num/26)+"")==0) {
				return sArray[num%26-1];
			}
			else {
			   if (num%26==0){
				   return (me.getCharCode(parseInt((num/26)+"")-1))+sArray[26-1];
			   }else{
				   return sArray[parseInt((num/26)+"")-1]+sArray[num%26-1];
			   }
			}
		},
		
		/**
		 * 得到 URL参数
		 * @param name
		 * @returns
		 */
	   getUrlString : 	function (name){
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null){
		    	 return  unescape(r[2]);
		     }
		     return null;
		},
		startMove:function(obj, json, fnEnd){
			var _this = this;
			if(obj.timer)
			{
				clearInterval(obj.timer);
			}
			obj.timer=setInterval(function (){
				_this.doMove(obj, json, fnEnd);
			}, 30);
			
			var oDate=new Date();
			
			if(oDate.getTime()-obj.lastMove>30)
			{
				_this.doMove(obj, json, fnEnd);
			}
		},
		getStyle:function (obj, attr)
		{
			if(obj.currentStyle)
			{
				return obj.currentStyle[attr];
			}
			else
			{
				return getComputedStyle(obj, false)[attr];
			}
		},
		doMove:function (obj, json, fnEnd){
			var iCur=0;
			var attr='';
			var bStop=true;	//假设运动已经该停止了
			var _this = this;
			
			for(attr in json)
			{
				if(attr=='opacity')
				{
					iCur=parseInt(100*parseFloat(_this.getStyle(obj, 'opacity')));
				}
				else
				{
					iCur=parseInt(_this.getStyle(obj, attr));
				}
				
				if(isNaN(iCur))
				{
					iCur=0;
				}
				
				var iSpeed=(json[attr]-iCur)/8;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				
				if(parseInt(json[attr])!=iCur)
				{
					bStop=false;
				}
				
				if(attr=='opacity')
				{
					obj.style.filter="alpha(opacity:"+(iCur+iSpeed)+")";
					obj.style.opacity=(iCur+iSpeed)/100;
				}
				else
				{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}
			
			if(bStop)
			{
				clearInterval(obj.timer);
				obj.timer=null;
				
				if(fnEnd)
				{
					fnEnd();
				}
			}
			
			obj.lastMove=(new Date()).getTime();
		},
		//数字验证
		checkIsNumber:function(obj){
    		obj.keypress(function (event) {
		        var eventObj = event || e;
		        var keyCode = eventObj.keyCode || eventObj.which;
		        if ((keyCode >= 48 && keyCode <= 57))
		            return true;
		        else
		            return false;
		    }).focus(function () {
		    //禁用输入法
		        this.style.imeMode = 'disabled';
		    }).bind("paste", function () {
		    //获取剪切板的内容
		        var clipboard = _this.getClipboard();
		        if (/^\d+$/.test(clipboard))
		            return true;
		        else
		            return false;
		    });
		},
		//获取剪切板的内容
		getClipboard:function() {

 		   if (window.clipboardData) {
 		      return(window.clipboardData.getData('Text'));
 		   }
 		   else if (window.netscape) {
 		      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
 		      var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
 		      if (!clip) return;
 		      var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
 		      if (!trans) return;
 		      trans.addDataFlavor('text/unicode');
 		      clip.getData(trans,clip.kGlobalClipboard);
 		      var str = new Object();
 		      var len = new Object();
 		      try {
 		         trans.getTransferData('text/unicode',str,len);
 		      }
 		      catch(error) {
 		         return null;
 		      }

 		      if (str) {
 		         if (Components.interfaces.nsISupportsWString) str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
 		         else if (Components.interfaces.nsISupportsString) str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
 		         else str = null;
 		      }

 		      if (str) {
 		         return(str.data.substring(0,len.value / 2));
 		      }
 		   }
 		   return null;
 		},
 		//获取字符串长度（汉字两个字节，字母一个字节）
 		getByteLen:function(str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
               var length = str.charCodeAt(i);
               if(length>=0&&length<=128)
                {
                    len += 1;
                }
                else{
                	len += 2;
                }
             }
            return len;
 		},
 		//截取字符串(按汉字两个字节截取)
 		cut_str:function(str, len){
 	        var char_length = 0;
 	        for (var i = 0; i < str.length; i++){
 	            var son_str = str.charAt(i);
 	            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
 	            if (char_length >= len){
 	                var sub_len = char_length == len ? i+1 : i;
 	                return str.substr(0, sub_len);
 	                break;
 	            }
 	        }
 	    },
		 
 		/**
 		 * 控制tip长度 一定长度后 换行
 		 * @param tip 
 		 * @param num 要截取的长度
 		 */
 		fixTipBr : function (tip,num){
 			if(tip == "")return tip;
 			if(tip.length && tip.length<=num){
 			       return tip;
 			}else{
 				   var reg=new RegExp("(.{" +num+"})","g");
 				   var rs= tip.match(reg);
 				   var str = rs.join('</br>');
 				   if(rs.length * num < tip.length){
 					   str = str +  "</br>" + tip.substring(rs.length*num,tip.length);
 				   }
 				   return str;
 			}
 		},
 		
 		
 		isTrue : function(str){
 			return str === true ? true : str == "true";
 		},
 		
 		/**
 		 * 
 		 * @param data
 		 * @returns
 		 */
 		getMaxmin : function(data){
 			var arr = [];
			var max,min;
			data.forEach(function(it){
				if(it.value){
					arr.push(parseFloat(it.value,10));
				}
			});
			if(arr.length == 1 && arr[0] <= 100){
				max = 100,
				min = 0 ;
			}
			else{
				if(arr.length>0){
					max = _.max(arr);
					min = _.min(arr);
				}else{
					max = 100;
					min = 0;
				}
			}
			
			return {
				max : max , min:min
			}
 		}
}
	


export default util
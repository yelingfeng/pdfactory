$(document).ready(function(){
	$.ajax({
		type:'GET',
		url:'classify_findClassifyList',
		dataType:'json',
		beforeSend:function(){	
			$("#chen").html("<img src=images/5.gif width=50 height=50 border=0/>");
		   },
		success:function(msg){
			for(var i=0;i<msg.length;i++){
				$("#classify").append("<option value="+msg[i].classify_id+">"+msg[i].classify_name+"</option>");
			}
			$("#chen").empty();
		}
		
	})
	
});

function secondClassify(){
	var id = $("#classify").val();
	$.ajax({
		type:'POST',
		url:'classify_findSecondClassifyList',
		data:{'id':id},
		dataType:'json',
		beforeSend:function(){	
			$("#chen").html("<img src=images/5.gif width=50 height=50 border=0/>");
		   },
		success:function(msg){
			var html="";
			for(var i=0;i<msg.length;i++){
				html+="<option value="+msg[i].id+">"+msg[i].classifyname+"</option>"
			}
			$("#second").html(html);
			$("#chen").empty();
		}
		
	})
}
//展示规格！！
$.ajax({
	
	type:'GET',
	url:'standard_findStandardList',
	dataType:'JSON',
	success:function(msg){
		var html = "<td>商品规格：</td>";
		for(var i=0;i<msg.length;i++){
			html+="<td><input type='checkbox'  value='"+msg[i].p_standardid+"'/>"+msg[i].p_standardname+"</td>"
			
		}
		$("#fuc").html(html);
	}
})
//展示属性！！！
$.ajax({
	
	type:'GET',
	url:'standard_findAttributeList',
	dataType:'JSON',
	success:function(msg){
		var html = "<td>商品属性：</td>";
		for(var i=0;i<msg.length;i++){
			html+="<td><input type='checkbox'  value='"+msg[i].attributeid+"'/>"+msg[i].attributename+"</td>"
			
		}
		$("#fuu").html(html);
	}
})



function fu(){
	
	var ids = $("#fuc input:checked");
	var attrids = $("#fuu input:checked");	
	var arr = new Array();
   for(var i=0;i<ids.length;i++){
	   arr.push(ids[i].value);
	   }
   var att = new Array();
   for(var i=0;i<attrids.length;i++){
	   att.push(attrids[i].value);
   }
   //属性id
   var attids = att.toString();   
   //规格id
	var standardids = arr.toString();
	//secondid  二级分类
	var secondid = $("#second").val();
	
	
	$.ajax({
		type:'post',
		url:'standard_shopStandardSave',
		data:{"secondid":secondid,"standardids":standardids,"attids":attids},
		beforeSend:function(){	
			$("#chen").html("<img src=images/5.gif width=50 height=50 border=0/>");
		   },
		success:function(msg){
			if(msg=="ok"){
				alert("操作成功！！");
			}
			$("#chen").empty();
		}
	})
	
}



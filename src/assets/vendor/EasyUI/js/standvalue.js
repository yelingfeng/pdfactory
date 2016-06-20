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

function fuc(){
	var secondid = $("#second").val();
	var secondtext = $("#second option:selected").text();
	$("#selecttext").html(secondtext);
	$("#shop").show();
	$("#sese").val(secondid);
	
	//展示拥有的规格！！
	$.ajax({
		
		type:'GET',
		url:'standard_findStandardBySecondid',
		data:{'secondid':secondid},
		dataType:'JSON',
		success:function(msg){
			var html = "<td>规格值：</td>";
			for(var i=0;i<msg.length;i++){
				html+="<td>"+msg[i].p_standardname+"</td><td><input type=hidden name='standList["+i+"].p_standardid' value='"+msg[i].p_standardid+"'/><input type='text' size=6 name='standList["+i+"].standardvalue'/></td>"
				
			}
			$("#standard").html(html);
		}
	})

	//展示拥有的属性！！！
	$.ajax({
		
		type:'GET',
		url:'standard_findAttributeBySecondid',
		data:{'secondid':secondid},
		dataType:'JSON',
		success:function(msg){
			var html = "<td>属性值：</td>";
			for(var i=0;i<msg.length;i++){
				html+="<td>"+msg[i].attributename+"</td><td><input type=hidden name='attrList["+i+"].attributeid' value='"+msg[i].attributeid+"'/><input type='text' size=6 name='attrList["+i+"].attributevalue'/></td>"
				
			}
			$("#attribute").html(html);
		}
	})

}


function fu(){
	$.ajax({
		type:'POST',
		url:'standard_addValueSave',
		data:$("#form").serialize(),
		async: false,
		success:function(msg){
			
			if(msg=="ok"){
				alert("操作成功！！！");
			}
		} 
	})
	
}

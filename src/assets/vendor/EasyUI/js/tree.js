function fuc(){
	$.ajax({
		type:'get',
		url:'product_findProductList',
		datatype:'json',
		success:function(msg){
			
			alert(msg);
		}
	})
}
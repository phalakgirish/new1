$(document).ready(function(){

	$("#register_btn,#login_btn,#category_btn,#brand_btn,#password_btn,#subcategory_btn").click(function(){

		var ans = $(this).attr("id").split("_");
		// alert(ans[0]);
		//ca_name=mens wear&log_name=amol
		$.ajax({
			type : "post",
			data : $("#"+ans[0]+"_form").serialize(),
			url : "../controller/"+ans[0]+"_action.php",
			success : function(response){
				// alert(response);

				if(response==1 && ans[0]=="login")
				{
					window.location.href="index.php"
				}
				$("#"+ans[0]+"_err").html("loading...");

				setTimeout(function(){
					$("#"+ans[0]+"_err").html(response);
				},1000);
			} 
		});
	});

	///////
	$("#sub_cid").change(function(){
		// alert(1)
		var cid = $(this).val();
		// alert(cid);
		$.ajax({
			type:"post",
			data:"cat="+cid,
			url:"../controller/get_subcategory.php",
			success:function(response){
				// alert(response);
				$("#p_subid").html(response);
			}
		})
	})

	///////
	$("#product_btn").click(function(){
		var record = $("#product_form").serialize();

		$.ajax({
			type:"post",
			data:record,
			url:"../controller/product_action.php",
			success:function(response){
				// alert(response);
				$("#product_err").html(response);
			}
		});
	});
	////////
});
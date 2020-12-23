// In this file we will add the JS functions for the frontent
$( document ).ready(function() {
	
	// GET REQUEST
	$("#buttonindex1").click(function(event){
		event.preventDefault();
		ajaxGet_Index1();
	});
	
	// DO GET
	function ajaxGet_Index1(){
		$.ajax({
			type : "GET",
			url : "/api/last",
			success: function(result){
				console.log("Success: ", result);
				$('#showind1div ul').empty();
				$('#showind1div .list-group').append("Light: " + (result.light*4) + "<br>" + "PM2.5: " + result.air.pm25 + "<br>")				
			},
			error : function(e) {
				$("#showind1div").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}
})


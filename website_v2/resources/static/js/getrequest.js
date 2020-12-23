$( document ).ready(function() {
	
	// GET REQUEST
	$("#allUsers").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : "/api/last",
			success: function(result){
				console.log("Success: ", result);
				$('#getResultDiv ul').empty();
				$('#getResultDiv .list-group').append("Light: " +result.light + "<br>" + "Sound: " + result.sound + "<br>" +  "Temperature: " + result.temperature + "<br>" +  "Timestamp: " + result.time + "<br>" + "PM2.5: " + result.air.pm25 + "<br>")				
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}
})

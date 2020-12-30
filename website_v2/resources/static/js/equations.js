$( document ).ready(function() {
	
	// GET REQUEST
	$("#Index1").click(function(event){
		event.preventDefault();
		ajaxGet_Index1();
	});
    $("#Index2").click(function(event){
		event.preventDefault();
		ajaxGet_Index2();
	});
    
	// DO GET
	function ajaxGet_Index1(){
		$.ajax({
			type : "GET",
			url : "/api/users/all",
			success: function(result){

				result=result.pop();
                console.log("Success: ", result);
                var read_temp = result.temperature;
                var read_humid = result.humidity;
                var temp_far = (read_temp * 9/5) + 32;
                var heat_index = (((-42.379) + (2.04901523 * temp_far) + (10.14333127 *read_humid) + (-0.22475541 * temp_far * read_humid) 
                                + (-6.83783 *0.001 * temp_far*temp_far)+ (-5.481717 *0.01 * read_humid*read_humid) 
                                + (1.22874*0.001 * temp_far *temp_far* read_humid)+ (8.5282 * 0.0001 * temp_far * read_humid*read_humid) 
                                + (-1.99 *0.000001 * temp_far*temp_far * read_humid*read_humid)-32)*5/9); 
				if (heat_index >=0 && heat_index < 33)
				{
					$('#index1 ul').empty();
                	$('#index1 .list-group').append("Heat Index: " + heat_index + " Stauts: Lower "+ "<br>");
				}
				else if (heat_index >= 33 && heat_index < 39)
				{
					$('#index1 ul').empty();
                	$('#index1 .list-group').append("Heat Index: " + heat_index + " Stauts: Moderate "+ "<br>");
				}
				else if (heat_index >= 39 && heat_index < 46)
				{
					$('#index1 ul').empty();
                	$('#index1 .list-group').append("Heat Index: " + heat_index + " Stauts: High "+ "<br>");
				}
		
		
			},
			error : function(e) {
				$("#index1").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
    }
    function ajaxGet_Index2(){
		$.ajax({
			type : "GET",
			url : "/api/users/all",
			success: function(result){

				result=result.pop();
                console.log("Success: ", result);
				var pm10 = 19; // replace 19 with result.pm10;
				var co2 = 300; // replace 300 withresult.co2;
                var no2 = 170; // replace 170 with result.no2;
				var air_quality;
		if (pm10>=0 && pm10<15) 
			{
				if (co2>=0 && co2<400)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 4;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 2;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}
					else if (co2>=400 && co2<1500)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 4;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 5;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}
					else if (co2>=1500 && co2<2500)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 2;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 1;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}

				}	
		if (pm10>=15 && pm10<20) 
			{
				if (co2>=0 && co2<400)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 4;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 5;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}
					else if (co2>=400 && co2<1500)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 5;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 5;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}
					else if (co2>=1500 && co2<2500)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 1;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}

			}
		else if (pm10>=20 && pm10<30) 
			{
				if (co2>=0 && co2<400)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 2;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 1;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}
					else if (co2>=400 && co2<1500)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 3;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality =1;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}
					else if (co2>=1500 && co2<2500)
					{
						if (no2>=0 && no2<150)
						{
							air_quality = 1;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 150 && no2<200)
						{
							air_quality = 1;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
						else if (no2>= 200 && no2<250)
						{
							air_quality = 1;
							$('#index2 ul').empty();
							$('#index2 .list-group').append("Air Quality: " + air_quality + "<br>"+"CO2: " + co2 + "<br>"+"NO2: " + no2 + "<br>"+"PM10: " + pm10 + "<br>");
						}
					}

			}
				
			},
			error : function(e) {
				$("#index2").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}
})
 

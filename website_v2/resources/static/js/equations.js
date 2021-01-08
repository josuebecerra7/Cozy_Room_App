$(document).ready(function () {
	google.charts.load('current', { 'packages': ['gauge'] });
	google.charts.setOnLoadCallback(drawChart_heat_index);
	google.charts.setOnLoadCallback(drawChart_air_index);
	google.charts.setOnLoadCallback(drawChart_light_index);
	google.charts.setOnLoadCallback(drawChart_sound_index);
	/////////////////FUNTION GET FROM API///////////////////////////
	function API_get() {
		// extract latest data from the db using the API
		var data_api = $.ajax({
			url: "/api/last",
			dataType: "json",
			async: false
		}).responseText;
		// Parse the responseText to JSON
		var jsonData = $.parseJSON(data_api);
		return jsonData;
	}
	//  Function get heat index ///
	function getHeatIndex(temperature, humidity) {
		var read_humid = humidity;
		if (temperature > 27) {
			var temp_far = (temperature * 9 / 5) + 32;
			var heat_index = (((-42.379) + (2.04901523 * temp_far) + (10.14333127 * read_humid) + (-0.22475541 * temp_far * read_humid)
				+ (-6.83783 * 0.001 * temp_far * temp_far) + (-5.481717 * 0.01 * read_humid * read_humid)
				+ (1.22874 * 0.001 * temp_far * temp_far * read_humid) + (8.5282 * 0.0001 * temp_far * read_humid * read_humid)
				+ (-1.99 * 0.000001 * temp_far * temp_far * read_humid * read_humid) - 32) * 5 / 9);
		} else {
			heat_index = temperature;
		}
		// get status
		if (heat_index >= 0 && heat_index < 18) {
			status = "Cold";
		}
		else if (heat_index >= 18 && heat_index < 24) {
			status = "Comfortable";
		}
		else if (heat_index >= 24 && heat_index < 30) {
			status = "Hot";
		}
		else {
			status = "Extreme Hot"
		}
		return [heat_index, status];
	}


	//////////////////Heat Index///////////////////   
	function drawChart_heat_index() {
		function get_index() {
			// extract latest data from the db using the API
			var jsonData = API_get();
			//Calculate index
			var read_temp = jsonData.temperature;
			var read_humid = jsonData.humidity;
			// Heat index is calculated if the temperature is above 27 Cº
			var last_data = getHeatIndex(read_temp, read_humid);
			heat_index = last_data[0];
			status = last_data[1];
			return [heat_index, status];
		}
		// Create our data table out of JSON data loaded from MongoDB.
		var last_data = get_index();
		var heat_index = Math.round(last_data[0] * 100) / 100;
		var status = last_data[1];
		var data = google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Heat Index', heat_index]
		]);
		// Gauge Configuration
		var options_temp = {
			width: 500, height: 150, min: 0, max: 35,
			greenFrom: 15, greenTo: 23,
			redFrom: 27, redTo: 35,
			yellowFrom: 23, yellowTo: 27,
			minorTicks: 5
		};
		// Associate Gauge to the html ID 
		var chart = new google.visualization.Gauge(document.getElementById('chart_div_heat_index'));
		// Instantiate and draw our chart, passing in some options
		chart.draw(data, options_temp);
		document.getElementById("value_div_heat_index").innerHTML = "Heat Index: " + heat_index + "<br>" + "Stauts: " + status + "<br>";
		// Update data every 10 seconds
		setInterval(function () {
			var last_data = get_index();
			heat_index = Math.round(last_data[0] * 100) / 100;
			status = last_data[1];
			data.setValue(0, 1, heat_index);
			chart.draw(data, options_temp);
			document.getElementById("value_div_heat_index").innerHTML = "Heat Index: " + heat_index + "<br>" + "Stauts: " + status + "<br>";
		}, 10000);
	}




	///////////////////////////////Air Quality Index/////////////////////////////////////////////
	// Function that receives pm10, co2, no2 and outputs the air quality index 
	function getAirQuality(pm10, co2, no2) {
		var air_quality;
		if (pm10 >= 0 && pm10 < 15) {
			if (co2 >= 0 && co2 < 400) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 3;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 4;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 2;
				}
			}
			else if (co2 >= 400 && co2 < 1500) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 4;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 5;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 3;
				}
			}
			else if (co2 >= 1500 && co2 < 2500) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 2;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 3;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 1;
				}
			}
		}
		if (pm10 >= 15 && pm10 < 20) {
			if (co2 >= 0 && co2 < 400) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 4;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 5;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 3;
				}
			}
			else if (co2 >= 400 && co2 < 1500) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 5;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 5;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 3;
				}
			}
			else if (co2 >= 1500 && co2 < 2500) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 3;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 3;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 1;
				}
			}

		}
		else if (pm10 >= 20 && pm10 < 30) {
			if (co2 >= 0 && co2 < 400) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 2;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 3;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 1;
				}
			}
			else if (co2 >= 400 && co2 < 1500) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 3;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 3;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 1;
				}
			}
			else if (co2 >= 1500 && co2 < 2500) {
				if (no2 >= 0 && no2 < 150) {
					air_quality = 1;
				}
				else if (no2 >= 150 && no2 < 200) {
					air_quality = 1;
				}
				else if (no2 >= 200 && no2 < 250) {
					air_quality = 1;
				}
			}
		}
		if (air_quality == 5) {
			status = "Good";
		} else if (air_quality == 4) {
			status = "Moderate";
		} else if (air_quality == 3) {
			status = "Unhealthy for sensitive groups";
		} else if (air_quality == 2) {
			status = "Unhealthy";
		} else if (air_quality == 1) { status = "Hazardous"; }
		return [air_quality, status];
	}
	//Chart
	function drawChart_air_index() {
		function get_index() {
			// extract latest data from the db using the API
			var jsonData = API_get();
			//Calculate index
			var pm10 = jsonData.air.pm10;
			var co2 = jsonData.air.co2;
			var no2 = jsonData.air.no2;
			var last_data = getAirQuality(pm10, co2, no2);
			var air_quality = last_data[0];
			var status = last_data[1];
			return [air_quality, status];
		}
		// Create our data table out of JSON data loaded from MongoDB.
		var last_data = get_index();
		var air_index = last_data[0];
		var status = last_data[1];
		var data = google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Air Quality', air_index]
		]);
		// Gauge Configuration
		var options_air = {
			width: 500, height: 150, min: 0, max: 5,
			greenFrom: 4, greenTo: 5,
			redFrom: 0, redTo: 2,
			yellowFrom: 2, yellowTo: 4,
			minorTicks: 5
		};
		// Associate Gauge to the html ID 
		var chart = new google.visualization.Gauge(document.getElementById('chart_div_air_index'));
		// Instantiate and draw our chart, passing in some options
		chart.draw(data, options_air);
		document.getElementById("value_div_air_index").innerHTML = "Air Quality Index: " + air_index + "<br>" + "Stauts: " + status + "<br>";
		// Update data every 10 seconds
		setInterval(function () {
			var last_data = get_index();
			var air_index = last_data[0];
			var status = last_data[1];
			data.setValue(0, 1, air_index);
			chart.draw(data, options_air);
			document.getElementById("value_div_air_index").innerHTML = "Air Quality Index: " + air_index + "<br>" + "Stauts: " + status + "<br>";
		}, 10000);
	}
	// get Light Index Function //
	function getLightIndex(light) {
		var status;
		var light_index;
		if (light <= 200) {
			light_index = 1;
			status = "Dark";
		} else if (light > 200 && light <= 350) {
			light_index = 2;
			status = "Moderate";
		} else if (light > 350 && light <= 550) {
			light_index = 3;
			status = "Good";
		} else if (light > 550 && light <= 600) {
			light_index = 4;
			status = "Bright";
		} else {
			light_index = 5;
			status = "Too Bright";
		}
		return [light_index, status]
	}


	//////////////////LIGHT Index///////////////////  
	function drawChart_light_index() {
		// extract latest data from the db using the API
		var jsonData = API_get();
		var last_data = getLightIndex(jsonData.light);
		var light_index = last_data[0];
		var status = last_data[1];
		// Create our data table out of JSON data loaded from MongoDB.
		var data = google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Light Index', light_index]
		]);
		// Gauge Configuration
		var options_light_index = {
			width: 500, height: 150, min: 0, max: 5,
			greenFrom: 0, greenTo: 2,
			redFrom: 4, redTo: 5,
			yellowFrom: 2, yellowTo: 4,
			minorTicks: 5
		};
		// Associate Gauge to the html ID
		var chart = new google.visualization.Gauge(document.getElementById('chart_div_light_index'));
		// Instantiate and draw our chart, passing in some options.
		chart.draw(data, options_light_index);
		document.getElementById("value_div_light_index").innerHTML = "Light Index: " + light_index + "<br>" + "Stauts: " + status + "<br>";
		// Update data every 10 seconds
		setInterval(function () {
			// Parse the responseText to JSON
			var jsonData = API_get();
			var last_data = getLightIndex(jsonData.light);
			var light_index = last_data[0];
			var status = last_data[1];
			data.setValue(0, 1, light_index);
			chart.draw(data, options_light_index);
			document.getElementById("value_div_light_index").innerHTML = "Light Index: " + light_index + "<br>" + "Stauts: " + status + "<br>";
		}, 10000);
	}

	// get sound index  //
	function getSoundIndex(sound) {
		var status;
		var sound_index;
		if (sound <= 150) {
			sound_index = 1;
			status = "Quiet";
		} else if (sound > 150 && sound <= 250) {
			sound_index = 2;
			status = "Fair";
		} else if (sound > 250 && sound <= 350) {
			sound_index = 3;
			status = "Moderate";
		} else if (sound > 350 && sound <= 450) {
			sound_index = 4;
			status = "Loud";
		} else if (sound > 450) {
			sound_index = 5;
			status = "Very Loud";
		}
		return [sound_index, status]
	}

	//////////////////Sound Index///////////////////  
	function drawChart_sound_index() {
		// extract latest data from the db using the API
		var jsonData = API_get();
		var sound = jsonData.sound;
		var last_data = getSoundIndex(sound);
		var status = last_data[1];
		var sound_index = last_data[0];
		// Create our data table out of JSON data loaded from MongoDB.
		var data = google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Sound Index', sound_index]
		]);
		// Gauge Configuration
		var options_sound_index = {
			width: 500, height: 150, min: 0, max: 5,
			greenFrom: 0, greenTo: 2,
			redFrom: 3, redTo: 5,
			yellowFrom: 2, yellowTo: 3,
			minorTicks: 5
		};
		// Associate Gauge to the html ID
		var chart = new google.visualization.Gauge(document.getElementById('chart_div_sound_index'));
		// Instantiate and draw our chart, passing in some options.
		chart.draw(data, options_sound_index);
		document.getElementById("value_div_sound_index").innerHTML = "Noise Index: " + sound_index + "<br>" + "Stauts: " + status + "<br>";
		// Update data every 10 seconds
		setInterval(function () {
			// Parse the responseText to JSON
			var jsonData = API_get();
			var sound = jsonData.sound;
			var last_data = getSoundIndex(sound);
			var status = last_data[1];
			var sound_index = last_data[0];
			data.setValue(0, 1, sound_index);
			chart.draw(data, options_sound_index);
			document.getElementById("value_div_sound_index").innerHTML = "Noise Index: " + sound_index + "<br>" + "Stauts: " + status + "<br>";
		}, 10000);
	}
    ////////////////////////////////////////////////////////
   //                                                    //
  //           FINAL INDEX (Coziness Index)             //
 //                                                    //
////////////////////////////////////////////////////////

function getAllIndexes(){

	var jsonData = API_get();

	req_index = getHeatIndex(jsonData.temperature, jsonData.humidity);
	heat_index = req_index[0];
	heat_status = req_index[1];

	req_index = getAirQuality(jsonData.air.pm10, jsonData.air.co2, jsonData.air.no2);
	air_index = req_index[0];
	air_status = req_index[1];

	req_index = getlightIndex(jsonData.light);
	light_index = req_index[0];
	light_status = req_index[1];

	req_index = getSoundIndex(jsonData.sound);
	sound_index = req_index[0];
	sound_status = req_index[1];

	return [heat_index, heat_status, air_index, air_status, light_index, light_status, sound_index, sound_status]
}

/// so Yacine, you just need to call the previous function "getAllIndexes" and you'll get the all the indexes to calculate the 
/// coziness index according to the user inputs

})
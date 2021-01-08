google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart_temp);
google.charts.setOnLoadCallback(drawChart_hum);
google.charts.setOnLoadCallback(drawChart_light);
google.charts.setOnLoadCallback(drawChart_sound);
google.charts.setOnLoadCallback(drawChart_pm10);
google.charts.setOnLoadCallback(drawChart_no2);
google.charts.setOnLoadCallback(drawChart_co2);

////////////////////////////////////////////
function get_time(){
  var data_api = $.ajax({
    url: "/api/last",
    dataType: "json",
    async: false
    }).responseText;
   // Parse the responseText to JSON
  var jsonData = $.parseJSON(data_api);
  var date = new Date(jsonData.time); // The 0 there is the key, which sets the date to the epoch
  document.getElementById("div_time").innerHTML = date  +"<br>";
}
// Call Function
get_time();
// Update every 10 seconds
setInterval(function() {
  get_time();
}, 10000);

/////////////////FUNTION GET FROM API///////////////////////////
  function API_get(){
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


//////////////////TEMPERATURE///////////////////  
function drawChart_temp() {
  var jsonData =  API_get();
  // Create our data table out of JSON data loaded from MongoDB.
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Temperature', jsonData.temperature]
  ]);
  // Gauge Configuration
  var options_temp = {
    width: 110, height: 110, min: 0, max: 35,
    greenFrom: 18, greenTo: 23,
    redFrom: 27, redTo: 35,
    yellowFrom:23, yellowTo: 27,
    minorTicks: 5
  };
  // Associate Gauge to the html ID 
  var chart = new google.visualization.Gauge(document.getElementById('chart_div_temp'));
  // Instantiate and draw our chart, passing in some options
  chart.draw(data, options_temp);
  // Update data every 10 seconds
  setInterval(function() {
    var jsonData =  API_get();
    data.setValue(0, 1, jsonData.temperature);
    chart.draw(data, options_temp);
  }, 10000);
}

//////////////////Humidity///////////////////  
function drawChart_hum() {
  var jsonData =  API_get();
  // Create our data table out of JSON data loaded from MongoDB.
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Humidity', jsonData.humidity]
  ]);
  // Gauge Configuration
  var options_hum = {
    width: 110, height: 110, min: 0, max: 100,
    greenFrom: 30, greenTo: 60,
    redFrom: 80, redTo: 100,
    yellowFrom:60, yellowTo: 80,
    minorTicks: 5
  };
  // Associate Gauge to the html ID 
  var chart = new google.visualization.Gauge(document.getElementById('chart_div_hum'));
  // Instantiate and draw our chart, passing in some options
  chart.draw(data, options_hum);
  // Update data every 10 seconds
  setInterval(function() {
    var jsonData =  API_get();
    data.setValue(0, 1, jsonData.humidity);
    chart.draw(data, options_hum);
  }, 10000);
}

//////////////////LIGHT///////////////////  
function drawChart_light() {
// extract latest data from the db using the API
var jsonData =  API_get();
// Create our data table out of JSON data loaded from MongoDB.
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Light', jsonData.light]
  ]);
  // Gauge Configuration
  var options_light = {
    width: 110, height: 110, min: 0, max: 700,
    greenFrom: 200, greenTo: 500,
    redFrom: 600, redTo: 700,
    yellowFrom:500, yellowTo: 600,
    minorTicks: 5
  };
  // Associate Gauge to the html ID
  var chart = new google.visualization.Gauge(document.getElementById('chart_div_light'));
  // Instantiate and draw our chart, passing in some options.
  chart.draw(data, options_light);
  // Update data every 10 seconds
  setInterval(function() {
    // Parse the responseText to JSON
    var jsonData =  API_get();
    data.setValue(0, 1, jsonData.light);
    chart.draw(data, options_light);
  }, 10000);
}

//////////////////SOUND///////////////////      
function drawChart_sound() {
  // extract latest data from the db using the API
  var jsonData =  API_get();
  // Create our data table out of JSON data loaded from MongoDB.
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Noise', jsonData.sound]
    ]);
    // Gauge Configuration
    var options_sound = {
        width: 110, height: 110, min: 0, max: 50,
        greenFrom: 0, greenTo: 30,
        redFrom: 40, redTo: 50,
        yellowFrom:30, yellowTo: 40,
        minorTicks: 5
      };
    // Associate Gauge to the html ID
    var chart = new google.visualization.Gauge(document.getElementById('chart_div_sound'));
    // Instantiate and draw our chart, passing in some options.
    chart.draw(data, options_sound);
    // Update data every 10 seconds
    setInterval(function() {
      var jsonData =  API_get();
      data.setValue(0, 1, jsonData.sound);
      chart.draw(data, options_sound);
    }, 10000);
  }

  //////////////////AIR QUALITY///////////////////   
//////////////////PM10/////////////////// 
function drawChart_pm10() {
  // extract latest data from the db using the API
  var jsonData =  API_get();
  // Create our data table out of JSON data loaded from MongoDB.
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['PM10', jsonData.air.pm10]
    ]);
    // Gauge Configuration
    var options_pm10 = {
        width: 110, height: 110, min: 0, max: 50,
        greenFrom: 0, greenTo: 30,
        redFrom: 40, redTo: 50,
        yellowFrom:30, yellowTo: 40,
        minorTicks: 5
      };
    // Associate Gauge to the html ID
    var chart = new google.visualization.Gauge(document.getElementById('chart_div_pm10'));
    // Instantiate and draw our chart, passing in some options.
    chart.draw(data, options_pm10);
    // Update data every 10 seconds
    setInterval(function() {
      var data_api = $.ajax({
        url: "/api/last",
        dataType: "json",
        async: false
        }).responseText;
       // Parse the responseText to JSON
      var jsonData = $.parseJSON(data_api);
      data.setValue(0, 1, jsonData.air.pm10);
      chart.draw(data, options_pm10);
    }, 10000);
  }

  //////////////////NO2/////////////////// 
function drawChart_no2() {
  // extract latest data from the db using the API
  var jsonData =  API_get();
  // Create our data table out of JSON data loaded from MongoDB.
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['NO2', jsonData.air.no2]
    ]);
    // Gauge Configuration
    var options_no2 = {
        width: 110, height: 110, min: 0, max: 250,
        greenFrom: 0, greenTo: 80,
        redFrom: 200, redTo: 250,
        yellowFrom:80, yellowTo: 200,
        minorTicks: 5
      };
    // Associate Gauge to the html ID
    var chart = new google.visualization.Gauge(document.getElementById('chart_div_no2'));
    // Instantiate and draw our chart, passing in some options.
    chart.draw(data, options_no2);
    // Update data every 10 seconds
    setInterval(function() {
      var data_api = $.ajax({
        url: "/api/last",
        dataType: "json",
        async: false
        }).responseText;
       // Parse the responseText to JSON
      var jsonData = $.parseJSON(data_api);
      data.setValue(0, 1, jsonData.air.no2);
      chart.draw(data, options_no2);
    }, 10000);
  }

    //////////////////CO2/////////////////// 
function drawChart_co2() {
  // extract latest data from the db using the API
  var jsonData =  API_get();
  // Create our data table out of JSON data loaded from MongoDB.
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['CO2', jsonData.air.co2]
    ]);
    // Gauge Configuration
    var options_co2 = {
        width: 110, height: 110, min: 0, max: 5000,
        greenFrom: 0, greenTo: 1000,
        redFrom: 2000, redTo: 5000,
        yellowFrom:1000, yellowTo: 2000,
        minorTicks: 5
      };
    // Associate Gauge to the html ID
    var chart = new google.visualization.Gauge(document.getElementById('chart_div_co2'));
    // Instantiate and draw our chart, passing in some options.
    chart.draw(data, options_co2);
    // Update data every 10 seconds
    setInterval(function() {
      var data_api = $.ajax({
        url: "/api/last",
        dataType: "json",
        async: false
        }).responseText;
       // Parse the responseText to JSON
      var jsonData = $.parseJSON(data_api);
      data.setValue(0, 1, jsonData.air.co2);
      chart.draw(data, options_co2);
    }, 10000);
  }
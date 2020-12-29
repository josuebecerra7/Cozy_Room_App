google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart_temp);
google.charts.setOnLoadCallback(drawChart_light);
google.charts.setOnLoadCallback(drawChart_sound);

function drawChart_temp() {
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Temperature', 0]
  ]);
  var options_temp = {
    width: 500, height: 150, min: 0, max: 35,
    greenFrom: 18, greenTo: 23,
    redFrom: 23, redTo: 35,
    yellowFrom:0, yellowTo: 18,
    minorTicks: 5
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div_temp'));

  chart.draw(data, options_temp);

  setInterval(function() {
    data.setValue(0, 1, 10 + Math.round(14 * Math.random()));
    chart.draw(data, options_temp);
  }, 1000);
}

/////////////////////////////////////    
function drawChart_light() {
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Light', 0]
  ]);
  var options_light = {
    width: 500, height: 150, min: 0, max: 700,
    greenFrom: 200, greenTo: 500,
    redFrom: 600, redTo: 700,
    yellowFrom:500, yellowTo: 600,
    minorTicks: 5
  };
  var chart = new google.visualization.Gauge(document.getElementById('chart_div_light'));
  chart.draw(data, options_light);
  setInterval(function() {
    data.setValue(0, 1, 250 + Math.round(300 * Math.random()-100));
    chart.draw(data, options_light);
  }, 1000);
}

/////////////////////////////////////    
function drawChart_sound() {
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Sound', 0]
    ]);
    var options_sound = {
        width: 400, height: 150, min: 0, max: 50,
        greenFrom: 0, greenTo: 30,
        redFrom: 40, redTo: 50,
        yellowFrom:30, yellowTo: 40,
        minorTicks: 5
      };
    var chart = new google.visualization.Gauge(document.getElementById('chart_div_sound'));
    chart.draw(data, options_sound);
    setInterval(function() {
      data.setValue(0, 1, 20 + Math.round(20 * Math.random()-10));
      chart.draw(data, options_sound);
    }, 1000);
  }
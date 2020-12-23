// JavaScript source code
window.onload = function () {
    loadIndexes();
}
function loadIndexes() {
    var ctx1 = document.getElementById('index1').getContext('2d');
    var ctx2 = document.getElementById('index2').getContext('2d');
    var ctx3 = document.getElementById('index3').getContext('2d');
    var ctx4 = document.getElementById('index4').getContext('2d');

    var ind1 = 4;
    var ind2 = 3.5;
    var ind3 = 2;
    var ind4 = 2.5;
    ctx1.font = "30px Georgia";
    ctx2.font = "30px Georgia";
    ctx3.font = "30px Georgia";
    ctx4.font = "30px Georgia";

    ctx1.fillText(ind1 + "/5", 40, 75);
    ctx2.fillText(ind2 + "/5", 40, 75);
    ctx3.fillText(ind3 + "/5", 40, 75);
    ctx4.fillText(ind4 + "/5", 40, 75);
}

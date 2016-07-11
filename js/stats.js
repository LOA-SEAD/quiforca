
function sendData(points, partialPoints, errors, level, levelId, end){
    var info = {};
    $.getJSON("../web/json/remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.points = points.toFixed(0);
        info.partialPoints = partialPoints.toFixed(0);
        info.errors = errors;
        info.answer = level.palavra;
        info.question = level.dica;
        info.levelId = ++levelId;
        info.end = end;
        console.log("Parcial" + info.partialPoints);
        $.ajax({
            type: "POST",
            url: "/exported-resource/saveStats",
            data: info,
            success: function(data) {
            }
        })
    });



}
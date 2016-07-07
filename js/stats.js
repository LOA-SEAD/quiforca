function sendData(points, errors, level, levelId){
    var info = {};
    $.getJSON("../web/json/remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.points = points.toFixed(0);
        info.errors = errors;
        info.answer = level.palavra;
        info.question = level.dica;
        info.levelId = ++levelId;
        $.ajax({
            type: "POST",
            url: "/exported-resource/saveStats",
            data: info,
            success: function(data) {
            }
        })
    });



}
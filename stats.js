function sendData(points, partialPoints, win, errors, level, levelId, size, end){
    var info = {};
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.points = points.toFixed(0);
        info.partialPoints = partialPoints.toFixed(0);
        info.errors = errors;
        info.answer = level.palavra;
        info.question = level.dica;
        info.levelId = levelId;
        info.end = end;
        info.size = size;
        info.win = win;
        info.gameType = 'questionAndAnswer';
        $.ajax({
            type: "POST",
            url: "http://remar.dc.ufscar.br/exported-resource/saveStats",
            data: info,
            success: function(data) {
            }
        })
    });



}
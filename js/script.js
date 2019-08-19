var pai = document.getElementById("ancora").parentNode;

var jogo = {};

$.ajax({
    url: "https://api.myjson.com/bins/90w6b",
    dataType: "text",
    mimeType: "textPlain",
    async: false,
    success: function (data) {
        jogo.bd = JSON.parse(data).palavras;
        jogo.nome = JSON.parse(data).nome;
        console.log(jogo.nome + "/" + jogo.bd.length)
    },
    error: function(er){
        console.log(er);
    }
});

/*jogo.playAudio = function (id) {
    var audio = $('#' + id);
    $(audio)[0].pause();
    $(audio)[0].currentTime = 0;
    $(audio)[0].play();

};*/

/*var css = document.createElement("link");
css.setAttribute("rel", "stylesheet");
css.setAttribute("href", "css/style.css");
document.head.appendChild(css);

var script = document.createElement("script");
script.setAttribute("src", "js/jquery-1.7.2.js");
pai.appendChild(script);

var script = document.createElement("script");
script.setAttribute("src", "js/bancodepalavras.js");
pai.appendChild(script);

var script = document.createElement("script");
script.setAttribute("src", "js/classes.js");
pai.appendChild(script);

var script = document.createElement("script");
script.setAttribute("src", "js/logica.js");
pai.appendChild(script);*/

//var audioTelas = new Audio();
var audio = document.createElement("audio");
var audioinicial = document.createElement("audio");
audioinicial.setAttribute("id", "AudioInicial");
var audioEnter = document.createElement("audio");

var context = new AudioContext();
//LEITURA INICIAL: UTILIZADA QUANDO HOUVER UMA SEQUENCIA COM FOCO
function leituraInicial(src){
    audio.pause();
    audioinicial.setAttribute("src", src);
    audioinicial.currentTime = 0;
    audioinicial.play();
    audioinicial.onended = function(){
        inicializaFocusFala();
    }
}


//REALIZAR FALA: LEITURA PADRAO
function realizarFala(src){
    audioinicial.pause();
    audio.setAttribute("src", src);
    audio.currentTime = 0;
    audio.play();
    audio.onended = function(){
        if(estado == "audio"){
            audioEnter.setAttribute("src", baseURL + "entrarEnter.mp3");
            audioEnter.currentTime = 0;
            audioEnter.play();
        }
    }
}

//MAPEAMENTO DO audioTelas COM CADA LETRA
function realizarLeituraLetra(letra){
    audioinicial.pause();
    audio.setAttribute("src", baseURL + letra + ".mp3");
    audio.currentTime = 0;
    audio.play();
}

function paraFala(){
   if(audio == null || audioinicial == null){
       return false;
   }
   else{
       audio.pause();
       audioinicial.pause();
   }
}

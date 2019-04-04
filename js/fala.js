//var audioTelas = new Audio();
var audio = document.createElement("audio");
var audioinicial = document.createElement("audio");
audioinicial.setAttribute("id", "AudioInicial");
var audioEnter = document.createElement("audio");

var context = new AudioContext();
//LEITURA INICIAL: UTILIZADA QUANDO HOUVER UMA SEQUENCIA COM FOCO
function leituraInicial(src){
    /*audio = new Audio(src);
    audio.addEventListener('ended', function(){
        inicializaFocusFala();
        delete(audio);
    })
    audio.play();*/

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
    /*audio = new Audio(src);
    audio.addEventListener('ended', function(){
       delete(audio);
    })
    audio.play();*/
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
    /*audio = new Audio(baseURL + letra + ".mp3");
    audio.addEventListener('ended', function(){
        delete(audio);
     })
    audio.play();*/

    audioinicial.pause();
    audio.setAttribute("src", baseURL + letra + ".mp3");
    audio.currentTime = 0;
    audio.play();
}

function paraFala(){
   if(audio == null){
       return false;
   }
   else{
       audio.pause();
   }
}

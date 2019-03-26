//var audioTelas = new Audio();
var audioTelas = document.createElement("AUDIO");
audioTelas.volume = 1;

var audioLeituraInicial = document.createElement("AUDIO");
audioLeituraInicial.volume = 1;


//LEITURA INICIAL: UTILIZADA QUANDO HOUVER UMA SEQUENCIA COM FOCO
function leituraInicial(src){
    //audioTelas = new Audio(src);
    //audioTelas.src = src;
    audioLeituraInicial.setAttribute("src", src);
    /*audioTelas.addEventListener('ended', function(){
        inicializaFocusFala();
        //delete(audioTelas);
    })*/
    audioLeituraInicial.currentTime = 0;
    audioLeituraInicial.play();
    /*audioLeituraInicial.onended = function(){
        inicializaFocusFala();
    }*/
}


//REALIZAR FALA: LEITURA PADRAO
function realizarFala(src){
    //audioTelas = new Audio(src);
    /*audioTelas.src = src;
    audioTelas.addEventListener('ended', function(){
        delete(audioTelas);
    })*/
    /*audioLeituraInicial.currentTime = 0;
    audioLeituraInicial.pause();*/
    audioTelas.setAttribute("src", src);
    audioTelas.currentTime = 0;
    audioTelas.play();}

//MAPEAMENTO DO audioTelas COM CADA LETRA
function realizarLeituraLetra(letra){

    //audio = new Audio();
    //audioTelas.src = baseURL + letra + ".mp3";
    audioTelas.setAttribute("src", baseURL + letra + ".mp3");

    /*audioTelas.addEventListener('ended', function(){
        delete(audioTelas);
    })*/
    audioTelas.currentTime = 0;
    audioTelas.play();
}

function paraFala(){
    audioTelas.pause();
}

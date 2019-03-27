//var audioTelas = new Audio();
var audioTelas = new Audio();
var audioLeituraInicial = new Audio();


//LEITURA INICIAL: UTILIZADA QUANDO HOUVER UMA SEQUENCIA COM FOCO
function leituraInicial(src){
    audioTelas.src = src;
    audioTelas.addEventListener('ended', function(){
        inicializaFocusFala();
    })
    audioTelas.play();
}


//REALIZAR FALA: LEITURA PADRAO
function realizarFala(src){
    audioLeituraInicial.src = src;
    audioLeituraInicial.play();
}

//MAPEAMENTO DO audioTelas COM CADA LETRA
function realizarLeituraLetra(letra){
    audioTelas.src = baseURL + letra + ".mp3";
    audioTelas.play();
}

function paraFala(){
    audioTelas.pause();
    audioLeituraInicial.pause();
}

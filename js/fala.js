var audio;


//LEITURA INICIAL: UTILIZADA QUANDO HOUVER UMA SEQUENCIA COM FOCO
function leituraInicial(src){
    audio = new Audio(src);
    audio.addEventListener('ended', function(){
        inicializaFocusFala();
        delete(audio);
    })
    audio.play();
}


//REALIZAR FALA: LEITURA PADRAO
function realizarFala(src){
    audio = new Audio(src);
    audio.addEventListener('ended', function(){
        delete(audio);
    })

    audio.play();
}

function paraFala(){
    audio.pause();
}

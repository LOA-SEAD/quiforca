var audioTelas = new Audio();


//LEITURA INICIAL: UTILIZADA QUANDO HOUVER UMA SEQUENCIA COM FOCO
function leituraInicial(src){
    //audioTelas = new Audio(src);
    audioTelas.src = src;
    audioTelas.addEventListener('ended', function(){
        inicializaFocusFala();
        delete(audioTelas);
    })
    audioTelas.play();
}


//REALIZAR FALA: LEITURA PADRAO
function realizarFala(src){
    //audioTelas = new Audio(src);
    audioTelas.src = src;
    audioTelas.addEventListener('ended', function(){
        delete(audioTelas);
    })

    audioTelas.play();
}

//MAPEAMENTO DO audioTelas COM CADA LETRA
function realizarLeituraLetra(letra){

    audio = new Audio();
    audio.src = baseURL + letra + ".mp3";
    console.log(audio.src)

    audioTelas.addEventListener('ended', function(){
        delete(audioTelas);
    })

    audioTelas.play();
}

function paraFala(){
    audioTelas.pause();
}

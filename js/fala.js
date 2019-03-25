var audio;

function realizarFala(src){
    audio = new Audio(src);
    audio.addEventListener('ended', function(){
        inicializaFocusFala();
        delete(audio);
    })
    audio.play();
}

function realizarFalaBotao(src){
    audio = new Audio(src);
    audio.addEventListener('ended', function(){
        delete(audio);
    })

    audio.play();
}

function paraFala(){
    audio.pause();
}

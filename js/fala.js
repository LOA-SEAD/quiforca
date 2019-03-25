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

//MAPEAMENTO DO AUDIO COM CADA LETRA
function realizarLeituraLetra(letra){

    audio = new Audio();

    switch(letra){
        case 'A':
            audio.src = baseURL + "A.mp3";
        break;

        case 'B':
            audio.src = baseURL + "B.mp3";
        break;

        case 'C':
            audio.src = baseURL + "C.mp3";
        break;

        case 'D':
             audio.src = baseURL + "D.mp3";
        break;

        case 'E':
            audio.src = baseURL + "E.mp3";
        break;

        case 'F':
            audio.src = baseURL + "F.mp3";
        break;

        case 'G':
            audio.src = baseURL + "G.mp3";
        break;

        case 'H':
            audio.src = baseURL + "H.mp3";
        break;

        case 'I':
            audio.src = baseURL + "I.mp3";
        break;

        case 'J':
            audio.src = baseURL + "J.mp3";
        break;

        case 'K':
            audio.src = baseURL + "K.mp3";
        break;

        case 'L':
            audio.src = baseURL + "L.mp3";
        break;

        case 'M':
            audio.src = baseURL + "M.mp3";
        break;

        case 'N':
            audio.src = baseURL + "N.mp3";
        break;

        case 'O':
            audio.src = baseURL + "O.mp3";
        break;

        case 'P':
            audio.src = baseURL + "P.mp3";
        break;

        case 'Q':
            audio.src = baseURL + "Q.mp3";
        break;

        case 'R':
            audio.src = baseURL + "R.mp3";
        break;

        case 'S':
            audio.src = baseURL + "S.mp3";
        break;

        case 'T':
            audio.src = baseURL + "T.mp3";
        break;

        case 'U':
            audio.src = baseURL + "U.mp3";
        break;

        case 'V':
            audio.src = baseURL + "V.mp3";
        break;

        case 'W':
            audio.src = baseURL + "W.mp3";
        break;

        case 'X':
            audio.src = baseURL + "X.mp3";
        break;

        case 'Y':
            audio.src = baseURL + "Y.mp3";
        break;

        case 'Z':
            audio.src = baseURL + "Z.mp3";
        break;
    }

    audio.play();
}

function paraFala(){
    audio.pause();
}

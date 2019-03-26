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

    //audioTelas = new Audio();

    switch(letra){
        case 'A':
            audioTelas.src = baseURL + "A.mp3";
        break;

        case 'B':
            audioTelas.src = baseURL + "B.mp3";
        break;

        case 'C':
            audioTelas.src = baseURL + "C.mp3";
        break;

        case 'D':
            audioTelas.src = baseURL + "D.mp3";
        break;

        case 'E':
            audioTelas.src = baseURL + "E.mp3";
        break;

        case 'F':
            audioTelas.src = baseURL + "F.mp3";
        break;

        case 'G':
            audioTelas.src = baseURL + "G.mp3";
        break;

        case 'H':
            audioTelas.src = baseURL + "H.mp3";
        break;

        case 'I':
            audioTelas.src = baseURL + "I.mp3";
        break;

        case 'J':
            audioTelas.src = baseURL + "J.mp3";
        break;

        case 'K':
            audioTelas.src = baseURL + "K.mp3";
        break;

        case 'L':
            audioTelas.src = baseURL + "L.mp3";
        break;

        case 'M':
            audioTelas.src = baseURL + "M.mp3";
        break;

        case 'N':
            audioTelas.src = baseURL + "N.mp3";
        break;

        case 'O':
            audioTelas.src = baseURL + "O.mp3";
        break;

        case 'P':
            audioTelas.src = baseURL + "P.mp3";
        break;

        case 'Q':
            audioTelas.src = baseURL + "Q.mp3";
        break;

        case 'R':
            audioTelas.src = baseURL + "R.mp3";
        break;

        case 'S':
            audioTelas.src = baseURL + "S.mp3";
        break;

        case 'T':
            audioTelas.src = baseURL + "T.mp3";
        break;

        case 'U':
            audioTelas.src = baseURL + "U.mp3";
        break;

        case 'V':
            audioTelas.src = baseURL + "V.mp3";
        break;

        case 'W':
            audioTelas.src = baseURL + "W.mp3";
        break;

        case 'X':
            audioTelas.src = baseURL + "X.mp3";
        break;

        case 'Y':
            audioTelas.src = baseURL + "Y.mp3";
        break;

        case 'Z':
            audioTelas.src = baseURL + "Z.mp3";
        break;
    }


    audioTelas.addEventListener('ended', function(){
        delete(audioTelas);
    })

    audioTelas.play();
}

function paraFala(){
    audioTelas.pause();
}

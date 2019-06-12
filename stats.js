function sendData(pergunta,correta,nroPalavra,alternativas,escolhida,acertou,tamanho,nroFase,nomeNivel){
	var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/stats/saveChallengeStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/stats/saveChallengeStats"
	}
	$.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.question = pergunta;			// armazena o texto da dica do desafio atual
        info.correctAnswer = correta;		// palavra correta a ser descoberta
        info.challengeId = nroPalavra;		// número da palavra sorteada no momento (conta a partir de 1)
        info.choices = alternativas;		// no caso do Forca, não tem alternativas, melhor mandar algo como "_ _ _ _ _" com a quantidade de caracteres da palavra certa
        info.answer = escolhida;			// palavra final encontrada pelo jogador (pode ser a palavra correta, neste caso ele ganhou, ou a palavra incompleta encontrada até o momento que ele perdeu as vidas, nesse caso, foi game over)
        info.win = acertou;					// boolean que vai receber "true" ou "false" para o caso do jogador ter acertado a palavra correta ou ter recebido um game over.
        info.levelSize = tamanho;			// quantidade de palavras (ou fases) que o jogo no total (vai sempre mandar o mesmo valor, toda vez que a função for chamada)
        info.levelId = nroFase;				// sempre vai receber o valor 1
        info.levelName = nomeNivel;			// sempre vai receber o mesmo nome, pode ser qualquer coisa, eu sugiro mandar apenas a string 'Forca' (com as aspas simples)
        info.challengeType = 'multipleChoice';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
});

	console.log("sendData");
	console.log("Dica da palavra " + nroPalavra + ": " + pergunta);
	console.log("Palavra certa: " + correta);
	console.log("Alternativas: " + alternativas);
	console.log("Resposta submetida: " + escolhida);
    console.log("Acertou? " + acertou);
    console.log("Tamanho: " + tamanho);
    console.log("Fase " + nroFase + ": " + nomeNivel);

}

function sendRankingData(pontos){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/stats/saveRankingStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/stats/saveRankingStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.score = pontos; 				// variável que recebe a pontuação final do jogo (após concluir). Não recebe nada no caso de game over.
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });

    console.log("sendRankingData");
    console.log("Pontuação: " + pontos);

}

function sendPlaytimeData(tempo,tipo,idJogo,idNivel,nomeNivel,nroPalavra){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/stats/saveTimeStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/stats/saveTimeStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.time = tempo;					// recebe o valor de tempo em segundos (0.0 sempre que estiver iniciando uma contagem de tempo)
        info.timeType = tipo;				// tipo do tempo enviado (0 para a contagem de tempo total de jogo, 1 para a contagem de tempo do nível, que nesse caso serão os mesmos valores do jogo inteiro pois só tem um nível, e 2 para a contagem do desafio, que nesse jogo é o tempo total gasto para descobrir uma única palavra)
        info.gameId = idJogo;				// recebe sempre o mesmo valor que nesse caso é 'Forca' com aspas simples mesmo.
        if (idNivel != null){
            info.levelId = idNivel;			// será mandado sempre o valor 1 nesta variável, mas somente quando o tipo for 1 ou 2. Quando a variável tipo = 0, nada é enviado e esta variável tem que ser nula.
            info.levelName = nomeNivel;		// será mandado sempre o mesmo valor que nesse caso eu sugiro ser 'Forca', sempre que o tipo for 1 ou 2. Quando a variável tipo = 0, nada é enviado e esta variável tem que ser nula.
        }
        if (nroPalavra != null){
            info.challengeId = nroPalavra;	// número da palavra sorteada no momento (conta a partir de 1).
        }
        //info.gameType = 'ConclusionTime';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });

    console.log("sendPlaytimeData");
    console.log("Tempo: " + tempo + "s");
    console.log("Tipo: " + tipo);
    console.log("Nome do jogo: " + idJogo);
    if (idNivel != null){
        console.log("Nível único de número " + idNivel + " - " + nomeNivel);
    }
    if (nroPalavra != null){
        console.log("Dica da palavra: " + nroPalavra);
    }

}
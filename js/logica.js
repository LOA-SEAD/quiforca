﻿var palavraNoFim
var letraRepetida;
var audio;
var audio2 = document.createElement("AUDIO");
var audio2Espera;
audio2.volume = 1;
audio2.setAttribute("id", "audioEfeitos");

var audioErro = document.createElement("AUDIO");
audioErro.setAttribute("id", "audioVidas");

var audioQuestao = document.createElement("AUDIO");
var audioResposta = document.createElement("AUDIO");

//img inicial do boneco
var urlImgBoneco = "imgs/personagem0.png";

//variável que controla index das questões sorteadas
var questaoIdx = 0;


//Array de questões e Array de questões aleatórias
jogo.questoesIdx = [];
jogo.questoesIdxAleatorio = [];


//Preenche a camada de jogo
function iniciar()
{
	console.log(jogo.questoesIdxAleatorio);
	if(!mobile){
		//Seta opcao para -1
		opcao = -1;
		//Seta estado do jogo
		estado = "jogando";
		//Seta número de chances do jogador
		jogo.numChances = 5;

		//Essa variavel vai conter todas as letras que o jogador ja tentou
		jogo.letrasTentadas = new Array();
		jogo.letrasTentadas = [" "];

		//Sorteio de uma nova palavra
		jogo.sorteio = jogo.questoesIdxAleatorio[questaoIdx];
		jogo.palavraSorteada = jogo.bd[jogo.bdAux[jogo.sorteio]].palavra;
		jogo.dicaPalavra = jogo.bd[jogo.bdAux[jogo.sorteio]].dica;	

		jogo.linha = document.createElement("div");
		jogo.linha.setAttribute("id", "row");
		jogo.linha.setAttribute("style", "margin-top: 4rem")

		var colleft = document.createElement("div");
		colleft.setAttribute("id", "ColLeftJogo");
		colleft.setAttribute("class", "clearfix");
		$("#camadaJogo").append(colleft);

		var colright = document.createElement("div");
		colright.setAttribute("id", "ColRightJogo");
		colright.setAttribute("class", "clearfix");
		$("#camadaJogo").append(colright);

		//Logo FORCA -- NA TELA
		var imgLogo = document.createElement("div");
		imgLogo.setAttribute("id", "imgLogo");
		colleft.append(imgLogo);


		//Pontos -- NA TELA
		$('<p>').attr('id', 'pontosNaTela')
			.html('Pontos: ' + Math.round(jogo.pontos))
			//.appendTo($('#camadaJogo'));
			.appendTo($('#ColRightJogo'));

		//Dica
		jogo.dicaNaTela = document.createElement("div");
		jogo.dicaNaTela.setAttribute("id", "dicaNaTela");
		jogo.dicaNaTela.setAttribute("role" , "button");
		jogo.tamanhoPalavra = jogo.palavraSorteada.replace(/ /g, "");

		//Exibe dica da palavra + número de letras que ela contém -- NA TELA
		var p = document.createElement("p");
		p.setAttribute("class", "customfont");
		jogo.fase = jogo.bd[jogo.bdAux[jogo.sorteio]];
		jogo.faseId = jogo.bdAux[jogo.sorteio];
		p.innerHTML = jogo.bd[jogo.bdAux[jogo.sorteio]].dica + "<br>(" + jogo.tamanhoPalavra.length + " letras)";
		jogo.dicaNaTela.appendChild(p);
		colright.append(jogo.dicaNaTela);

		//Exibe a palavra na tela
		jogo.aux = "";
		for(var i = 0; i < jogo.palavraSorteada.length; i++)
		{
			jogo.aux += jogo.palavraSorteada[i] + " ";
		}

		//Essa é a variavel que deve ser exibida na tela -- NA TELA
		jogo.palavraNaTela = document.createElement("p");
		jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
		jogo.palavraNaTela.setAttribute("tabIndex", "0");
		jogo.palavraNaTela.setAttribute("role", "textbox");
		colright.append(jogo.palavraNaTela);

		jogo.erros = 0;
		jogo.emTransicao = false;


		colright.append(jogo.linha); // -- NA TELA
		colocarPersonagem(); // -- NA TELA
		colocarTecladoNaTela(); // -- NA TELA

		var caixaBotoes = document.createElement("div");
		caixaBotoes.setAttribute("id", "caixaBotoes");
		caixaBotoes.setAttribute("class", "clearfix");

		$("#camadaJogo").append(caixaBotoes);

		jogo.botaoOpcoes = document.createElement("div");
		jogo.botaoOpcoes.setAttribute("id" , "btnMenu");
		jogo.botaoOpcoes.setAttribute("role" , "button");
		jogo.botaoOpcoes.setAttribute("class", "botao");

		jogo.botaoOpcoes.onclick = function() {
			stopTudo();
			criarCamadaOpcoes();
		}

		caixaBotoes.append(jogo.botaoOpcoes);
		inicializaFocus();
	}
	else{
		//Seta estado do jogo
		estado = "jogando";
		//Seta número de chances do jogador
		jogo.numChances = 5;

		//Essa variavel vai conter todas as letras que o jogador ja tentou
		jogo.letrasTentadas = new Array();
		jogo.letrasTentadas = [" "];

		//Sorteio de uma nova palavra
		jogo.sorteio = jogo.questoesIdxAleatorio[questaoIdx];
		jogo.palavraSorteada = jogo.bd[jogo.bdAux[jogo.sorteio]].palavra;
		jogo.dicaPalavra = jogo.bd[jogo.bdAux[jogo.sorteio]].dica;	

		jogo.linha = document.createElement("div");
		jogo.linha.setAttribute("id", "row");

		var header = document.createElement("div");
		header.setAttribute("id", "topJogo");

		//Pontos -- NA TELA
		jogo.pontosTela = document.createElement("p");
		jogo.pontosTela.setAttribute("id", "pontosTela");
		jogo.pontosTela.innerHTML = "Pontos: " + Math.round(jogo.pontos);
		
		//Cria grupo de botões
		jogo.btnGrupo = document.createElement("div");
		jogo.btnGrupo.setAttribute("id", "btnGrupo");
		
		jogo.botaoOpcoes = document.createElement("button");
		jogo.botaoOpcoes.setAttribute("id" , "btnMenu");
		jogo.botaoOpcoes.innerText = "Opções";
		jogo.botaoOpcoes.setAttribute("class", "botao");
		jogo.botaoOpcoes.onclick = function() {
			stopTudo();
			$("#camadaJogo").toggle();
			criarCamadaOpcoes();
		}
		//Insere grupo de botões no header, e o header na camada Jogo
		$("#camadaJogo").append(header);
		header.appendChild(jogo.btnGrupo);
		

		jogo.botaoAtalhos = document.createElement("button");
		jogo.botaoAtalhos.setAttribute("id", "btnAtalhos");
		jogo.botaoAtalhos.innerText = "Status";
		jogo.botaoAtalhos.setAttribute("class", "botao");
		jogo.botaoAtalhos.onclick = function(){
			stopTudo();
			criarCamadaAtalhos();
		}

		//Adiciona ao grupo de botões os botões de opções e atalhos
		jogo.btnGrupo.appendChild(jogo.botaoOpcoes);
		jogo.btnGrupo.appendChild(jogo.botaoAtalhos);

		jogo.boxVidas = document.createElement("div");
		jogo.boxVidas.setAttribute("id", "boxVidas");
		header.appendChild(jogo.boxVidas);

		jogo.vidas1 = document.createElement("div");
		jogo.vidas1.setAttribute("id", "vidas");
		boxVidas.appendChild(jogo.vidas1);
		jogo.vidas2 = document.createElement("div");
		jogo.vidas2.setAttribute("id", "vidas");
		boxVidas.appendChild(jogo.vidas2);
		jogo.vidas3 = document.createElement("div");
		jogo.vidas3.setAttribute("id", "vidas");
		boxVidas.appendChild(jogo.vidas3);
		jogo.vidas4 = document.createElement("div");
		jogo.vidas4.setAttribute("id", "vidas");
		boxVidas.appendChild(jogo.vidas4);
		jogo.vidas5 = document.createElement("div");
		jogo.vidas5.setAttribute("id", "vidas");
		boxVidas.appendChild(jogo.vidas5);

		var bonecoForca = document.createElement("div");
		bonecoForca.setAttribute("id", "bonecoForca");
		$("#camadaJogo").append(bonecoForca);

		var colright = document.createElement("div");
		colright.setAttribute("id", "ColRightJogo");
		colright.setAttribute("class", "clearfix");
		

		//Logo FORCA -- NA TELA
		var imgLogo = document.createElement("div");
		imgLogo.setAttribute("id", "imgLogo");
		bonecoForca.appendChild(imgLogo);

		//Dica
		jogo.dicaNaTela = document.createElement("div");
		jogo.dicaNaTela.setAttribute("id", "dicaNaTela");
		jogo.tamanhoPalavra = jogo.palavraSorteada.replace(/ /g, "");

		//Exibe dica da palavra + número de letras que ela contém -- NA TELA
		var p = document.createElement("p");
		p.setAttribute("class", "customfont");
		jogo.fase = jogo.bd[jogo.bdAux[jogo.sorteio]];
		jogo.faseId = jogo.bdAux[jogo.sorteio];
		p.innerHTML = jogo.bd[jogo.bdAux[jogo.sorteio]].dica + "<br>(" + jogo.tamanhoPalavra.length + " letras)";
		jogo.dicaNaTela.appendChild(p);
		
		$("#camadaJogo").append(jogo.dicaNaTela);
		$("#camadaJogo").append(colright);

		//Exibe a palavra na tela
		jogo.aux = "";
		for(var i = 0; i < jogo.palavraSorteada.length; i++)
		{
			jogo.aux += jogo.palavraSorteada[i] + " ";
		}


		//Essa é a variavel que deve ser exibida na tela -- NA TELA
		jogo.palavraNaTela = document.createElement("p");
		jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
		jogo.palavraNaTela.setAttribute("role", "textbox");
		colright.appendChild(jogo.palavraNaTela);

		jogo.erros = 0;
		jogo.emTransicao = false;

		//$("#camadaJogo").append(jogo.linha); -- NA TELA
		colright.appendChild(jogo.linha);
		colocarPersonagem(); // -- NA TELA
		colocarTecladoNaTela(); // -- NA TELA
	}

	questaoIdx++;
	audioIdxSet();
	update();
}

function update()
{
	if(estado == "jogando"){
		atualizarPalavra();
		switch(fimDeJogo())
		{
			case -1: //Continua o jogo normal
				setTimeout(update, 50);
				break;
			case 0: //Fim de jogo: Jogador perdeu
				jogo.palavraNaTela.innerHTML = jogo.palavraSorteada;
				destruirCamadaJogo();
				criarCamadaDerrota();
				break;
			case 1: //Fim de jogo: Próxima fase
				var el = document.getElementById("camadaJogo");
				jogo.pontos = jogo.pontos + 10 - jogo.erros;
				$('<div>').attr({'id': 'palavraCerta',})
					.appendTo(el);
				destruirCamadaJogo();
				criarCamadaVitoria();
				break;
			case 2: //Fim de jogo: Acabaram as palavras
				var el = document.getElementById("camadaJogo");
				jogo.pontos = jogo.pontos + 10 - jogo.erros;
				$('<div>').attr({'id': 'palavraCerta',})
					.appendTo(el);
				destruirCamadaJogo();
				criarCamadaFimdeJogo();
				break;
		}
	}
}

//Funcao que verifica se o jogo terminou(erros > 5 ou palavra completa)
function fimDeJogo()
{
	var continua = false;
	for(var i=0; i<jogo.palavraNaTela.innerHTML.length; i++)
	{
		//quando ainda faltam letras na palavra
		if(jogo.palavraNaTela.innerHTML[i] == "_")
		{
			continua = true;
		}
	}
	if(!continua)
	{
		
		stopTudo();
		clearTimeout(audio2Espera);
		
		if(jogo.questoesIdx.length > questaoIdx)
		{
			//ainda tem palavras
			return 1;
		}
		else
		{
			//acabaram as palavras
			return 2;
		}
	}
	else
	{
		//se faltam letras na palavra
		if(jogo.erros >= 5)
		{
			//se morreu
			stopTudo();
			clearTimeout(audio2Espera);
			return 0;
		}
		else
		{
			//se não morreu
			return -1;
		}
	}
}

//Funcao que recebe uma letra e verifica se numero de erros deve subir
function verificarErro(_letra)
{
	var deuErro = true;
	letraRepetida = false;
	audio2.pause();
	audioErro.pause();

	for(var i = 0; i < jogo.letrasTentadas.length; i++)
	{
		if(_letra == jogo.letrasTentadas[i])
		{
			letraRepetida = true;
			deuErro = false;
		}
	}

	for(var i = 0; i < jogo.palavraSorteada.length; i++)
	{
		if(_letra == jogo.palavraSorteada[i])
		{
			deuErro = false;
		}
		else
		{
			if(_letra == "I")
			{
				if("Í" == jogo.palavraSorteada[i])
				{
					deuErro = false;
				}
			}

			if(_letra == "E")
			{
				if(("É" == jogo.palavraSorteada[i]) || ("Ê" == jogo.palavraSorteada[i]))
				{
					deuErro = false;
				}
			}

			if(_letra == "A")
			{
				if(("Ã" == jogo.palavraSorteada[i]) || ("Â" == jogo.palavraSorteada[i]) || ("Á" == jogo.palavraSorteada[i]))
				{
					deuErro = false;
				}
			}

			if(_letra == "O")
			{
				if(("Ó" == jogo.palavraSorteada[i]) || ("Õ" == jogo.palavraSorteada[i]) || ("Ô" == jogo.palavraSorteada[i]))
				{
					deuErro = false;
				}
			}

			if(_letra == "C")
			{
				if("Ç" == jogo.palavraSorteada[i])
				{
					deuErro = false;
				}
			}

			if(_letra == "U")
			{
				if("Ú" == jogo.palavraSorteada[i])
				{
					deuErro = false;
				}
			}
		}
	}
	if(!deuErro)
	{
		if(letraRepetida){
			//audio2 = document.createElement("AUDIO");
			audio2.setAttribute("src", "audio/tecla_indisponivel2.mp3")
		}
		else
		{
			//audio2 = document.createElement("AUDIO");
			audio2.setAttribute("src", "audio/acerta_letra1.mp3");
		}

	}
	if(deuErro)
	{
		jogo.erros++;
		atualizaNumChances();
		mudarPersonagem();

		if(mobile)
			mostrarPersonagem();
		//audio2 = document.createElement("AUDIO");
		switch(jogo.erros)
		{
			case 1:
				audio2.setAttribute("src", "audio/enforcamento1.ogg");
				audioErro.setAttribute("src", "audio/audioGravado/4vidas.mp3");
				if(mobile)
					jogo.vidas5.remove();
				break;
			case 2:
				audio2.setAttribute("src", "audio/enforcamento3.ogg");
				audioErro.setAttribute("src", "audio/audioGravado/3vidas.mp3");
				if(mobile)
					jogo.vidas4.remove();
				break;
			case 3:
				audio2.setAttribute("src", "audio/enforcamento7.ogg");
				audioErro.setAttribute("src", "audio/audioGravado/2vidas.mp3");
				if(mobile)
					jogo.vidas3.remove();
				break;
			case 4:
				audio2.setAttribute("src", "audio/enforcamento8.ogg");
				audioErro.setAttribute("src", "audio/audioGravado/1vida.mp3");
				if(mobile)
					jogo.vidas2.remove();
		}
	}
	realizarLeituraLetra(_letra);
			
	audio2Espera = setTimeout(function(){
		if(fimDeJogo()==-1){
			audio2.currentTime = 0
			audio2.play();
		}
	}, 300)
	
	audio2.onended = function(){
		if(deuErro && jogo.erros < 5){
			audioErro.currentTime = 0;
			audioErro.play();
		}
		else if(!deuErro && estado=="jogando"){
			ouvirAtalho2();
		}
	}
}

//Coloca os botoes do teclado na tela


function colocarTecladoNaTela()
{
	var botoes = document.createElement("div");
	botoes.setAttribute("id", "botoes");
	$("#row").append(botoes);

	var linha1 = new Linha(1);
	var linha1 = new Linha(2);
	var linha1 = new Linha(3);

	var btQ = new Botao("Q", 1);
	var btW = new Botao("W", 1);
	var btE = new Botao("E", 1);
	var btR = new Botao("R", 1);
	var btT = new Botao("T", 1);
	var btY = new Botao("Y", 1);
	var btU = new Botao("U", 1);
	var btI = new Botao("I", 1);
	var btO = new Botao("O", 1);
	var btP = new Botao("P", 1);
	var btA = new Botao("A", 2);
	var btS = new Botao("S", 2);
	var btD = new Botao("D", 2);
	var btF = new Botao("F", 2);
	var btG = new Botao("G", 2);
	var btH = new Botao("H", 2);
	var btJ = new Botao("J", 2);
	var btK = new Botao("K", 2);
	var btL = new Botao("L", 2);
	var btZ = new Botao("Z", 3);
	var btX = new Botao("X", 3);
	var btC = new Botao("C", 3);
	var btV = new Botao("V", 3);
	var btB = new Botao("B", 3);
	var btN = new Botao("N", 3);
	var btM = new Botao("M", 3);
}

//Simplesmente coloca a variavel que recebe como parametro no vetor de letras tentadas
function colocarLetraEmLetrasTentadas(_letra)
{
	var naoEstavaAinda = true;
	for(var i = 0; i < jogo.letrasTentadas.length; i++)
	{
		if(jogo.letrasTentadas[i] == _letra)
		{
			naoEstavaAinda = false;
		}
	}

	if(naoEstavaAinda)
	{
		//I acentuado
		if(_letra == "I")
		{
			jogo.letrasTentadas[i+1] = "Í";
		}

		//E acentuado
		if(_letra == "E")
		{
			jogo.letrasTentadas[i+1] = "É";
			jogo.letrasTentadas[i+2] = "Ê";
		}

		//A acentuado
		if(_letra == "A")
		{
			jogo.letrasTentadas[i+1] = "Ã";
			jogo.letrasTentadas[i+2] = "Â";
			jogo.letrasTentadas[i+3] = "Á";
		}

		//Ç
		if(_letra == "C")
		{
			jogo.letrasTentadas[i+1] = "Ç";
		}

		//O acentuado
		if(_letra == "O")
		{
			jogo.letrasTentadas[i+1] = "Ó";
			jogo.letrasTentadas[i+2] = "Õ";
			jogo.letrasTentadas[i+3] = "Ô";
		}

		if(_letra == "U")
		{
			jogo.letrasTentadas[i+1] = "Ú";
		}
		
		jogo.letrasTentadas[i] = _letra;
		mudarCor(_letra);
	}
}

function mudarCor(_letra)
{
	$("#botao" + _letra).attr("style", 'color: white;');
	$("#botao" + _letra).removeClass("botaoJogo");
	$("#botao" + _letra).addClass("botaoJogoPressionado");
}

//Logica para ver se palavra foi atualizada
function atualizarPalavra()
{
	jogo.palavraNaTela.innerHTML = "";
	for(var i = 0; i < jogo.palavraSorteada.length; i++)
	{
		jogo.achou = false;
		for(var j = 0; j < jogo.letrasTentadas.length; j++)
		{
			if(jogo.palavraSorteada[i] == jogo.letrasTentadas[j])
			{
				jogo.achou = true;
			}
		}
		if(jogo.palavraSorteada[i] == " ")
		{
			jogo.palavraNaTela.innerHTML += '\xa0';
		}
		else if(jogo.achou)
		{
			jogo.palavraNaTela.innerHTML += jogo.palavraSorteada[i];
		}
		else
		{
			jogo.palavraNaTela.innerHTML += "_";
		}
		jogo.palavraNaTela.innerHTML += " ";
	}
	palavraNoFim = jogo.palavraNaTela.innerHTML
}

function atualizaNumChances(){
	jogo.numChances--;
}

function colocarPersonagem()
{
	if(!mobile){
		jogo.personagem = document.createElement("div");
		jogo.personagem.setAttribute("id", "personagem");
		jogo.personagem.setAttribute("class", "personagem");
		$("#ColLeftJogo").append(jogo.personagem);
	
		jogo.personagemAnt = document.createElement("div");
		jogo.personagemAnt.setAttribute("id", "personagemAnt");
		jogo.personagemAnt.setAttribute("class", "personagem");
		$("#ColLeftJogo").append(jogo.personagemAnt);
	}
	else{
		jogo.imgBoneco = document.createElement("img");
		jogo.imgBoneco.setAttribute("id", "imgBoneco");
		jogo.imgBoneco.setAttribute("src", urlImgBoneco);
		$("#bonecoForca").append(jogo.imgBoneco);
	}
}

function removerPersonagem(){
	$("#imgBoneco").remove();
}

function mudarPersonagem()
{
	if(!mobile){
		jogo.emTransicao = true;
		$('#personagemAnt').fadeIn(1, function() {}).attr('style', 'background-position: -' + (jogo.erros-1)*317 + 'px 0px;').css("z-index", 12);
		$('#personagem').attr('style', 'background-position: -' + jogo.erros*317 + 'px 0px;').fadeOut(0,00001, function() {});
		$('#personagem').fadeIn(500, function() {});
		$('#personagemAnt').fadeOut(1000, function() {$(this).css("z-index", "10"); jogo.emTransicao = false;});
	}
	else{
		switch(jogo.numChances){
			case 5:
				urlImgBoneco = "imgsMobile/personagem0.png";
			break;
	
			case 4:
				urlImgBoneco = "imgsMobile/personagem1.png";
			break;
	
			case 3:
				urlImgBoneco = "imgsMobile/personagem2.png";
			break;
	
			case 2:
				urlImgBoneco = "imgsMobile/personagem3.png";
			break;
	
			case 1:
				urlImgBoneco = "imgsMobile/personagem4.png";
			break;
		}
		removerPersonagem();
		colocarPersonagem();
	}
}

function mostrarPersonagem(){
	$("#topJogo").toggle();
	$("#ColRightJogo").toggle();
	$("#dicaNaTela").toggle();
	$("#bonecoForca").attr("style", "display: flex;");

	setTimeout(function(){
		$("#topJogo").toggle();
		$("#ColRightJogo").toggle();
		$("#dicaNaTela").toggle();
		$("#bonecoForca").attr("style", "display: none;");
	}, 1000);
}

function iniciarNovoJogo()
{
	jogo.pontos = 0;
	jogo.pontosParciais = 0;

	jogo.bdAux = new Array;
	jogo.bdTamanho = jogo.bd.length;

	for(var i = 0; i < jogo.bd.length; i++)
	{
		jogo.bdAux[i] = i;
	}
}

var funcaoBotao;
var objetoBotao;

function ativarBotaoVoltar ()
{
	destruirCamadaJogo();
	iniciarNovoJogo();
	criarCamadaMenu();
}

function retornaLetrasTentadas(_posicao)
{
	if(jogo.letrasTentadas[_posicao] == "Ã" || jogo.letrasTentadas[_posicao] == "Â" || jogo.letrasTentadas[_posicao] == "Á"){
		return false;
	}
	else if(jogo.letrasTentadas[_posicao] == "É" || jogo.letrasTentadas[_posicao] == "Ê"){
		return false;
	}
	else if(jogo.letrasTentadas[_posicao] == "Í"){
		return false;
	}
	else if(jogo.letrasTentadas[_posicao] == "Ó" || jogo.letrasTentadas[_posicao] == "Õ" || jogo.letrasTentadas[_posicao] == "Ô"){
		return false;
	}
	else if(jogo.letrasTentadas[_posicao] == "Ú"){
		return false;
	}
	else if(jogo.letrasTentadas[_posicao] == "Ç"){
		return false;
	}
	else{
		return jogo.letrasTentadas[_posicao];
	}
}

function tamanhoLetrasTentadas()
{
	return jogo.letrasTentadas.length;
}

function numeroDeChances()
{
	return jogo.numChances;
}

function numeroSorteado()
{
	return jogo.sorteio;
}

function vetorComPalavraAtual()
{
	var vetorAux = [];
	var counter = 0;
	for(var i = 0; i < jogo.palavraNaTela.innerHTML.length; i++)
	{
		if(jogo.palavraNaTela.innerHTML[i] != "&"){
			if(jogo.palavraNaTela.innerHTML[i] != "_")
			{
				if(jogo.palavraNaTela.innerHTML[i] == "Ã" || jogo.palavraNaTela.innerHTML[i] == "Â" || jogo.palavraNaTela.innerHTML[i] == "Á"){
					vetorAux[counter++] = "A";
				}
				else if(jogo.palavraNaTela.innerHTML[i] == "É" || jogo.palavraNaTela.innerHTML[i] == "Ê"){
					vetorAux[counter++] = "E";
				}
				else if(jogo.palavraNaTela.innerHTML[i] == "Í"){
					vetorAux[counter++] = "I";
				}
				else if(jogo.palavraNaTela.innerHTML[i] == "Ó" || jogo.palavraNaTela.innerHTML[i] == "Õ" || jogo.palavraNaTela.innerHTML[i] == "Ô"){
					vetorAux[counter++] = "O";
				}
				else if(jogo.palavraNaTela.innerHTML[i] == "Ú"){
					vetorAux[counter++] = "U";
				}
				else if(jogo.palavraNaTela.innerHTML[i] == "Ç"){
					vetorAux[counter++] = "C";
				}
				else
				{
					if(jogo.palavraNaTela.innerHTML[i] != " "){
						vetorAux[counter++] = jogo.palavraNaTela.innerHTML[i];
					}
				}
			}
			else
			{
				vetorAux[counter++] = "1";
			}
		}
		else
		{
			vetorAux[counter++] = "0";
			i+=6;
		}
	}
	return vetorAux
}

function palavraAtual(_posicao)
{
	return vetorComPalavraAtual()[_posicao];
}

function tamanhoPalavraAtual()
{
	return vetorComPalavraAtual().length;
}

function tamanhoPalavraSemEspaco()
{
	return jogo.tamanhoPalavra.length;
}

function pontuacao()
{
	return jogo.pontos;
}

function audioIdxSet(){
	console.log(jogo.sorteio);
	audioQuestao.setAttribute("src", "audio/audioQuestoes/S" + jogo.sorteio + ".mp3");
	audioResposta.setAttribute("src", "audio/audioQuestoes/A" + jogo.sorteio + ".mp3");
}

function randOrd(){
	return (Math.round(Math.random())-0.5);
}
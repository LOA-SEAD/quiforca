/*
 O html do jogo é simplesmente um body com uma div chamada "palco"
 Quando a pagina carrega, ela carrega as tags <script> que contém os arquivos de javascript que geram o jogo
 Quando os scripts são carregados é criado uma div "menu" e seu conteudo
 Através das interações com os botões o html é gerado e destruido dinamicamente pelo javscript

 O css está sendo usado de maneira mista tanto inline (dentro do html) como por arquivos externos (css)
 */

var background = document.createElement("AUDIO");
//background.setAttribute("src", "audio/palavraCerta.mp3");

var audioTeclas = document.createElement("AUDIO");
audioTeclas.setAttribute("src", "audio/efeitoTeclas.wav");
audioTeclas.volume = 0.4;
//background.loop = true
var origemMenu;
var origemDerrota;
var opcao;
var estado;
var realizaLeitura = false;



function criarCamadaMenu()
{	

	estado = "menu";
	opcao = 0;

	if(origemDerrota){
		background.currentTime = 0
	}
	origemDerrota = 0
	background.play()

	var el = document.createElement("div");
	el.setAttribute("id", "camadaMenu");
	el.setAttribute("tabIndex", "0");
	$("#palco").append(el);


	var imgMenu = document.createElement("div");
	imgMenu.setAttribute("id", "imgMenu");
	el.appendChild(imgMenu);


	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoes");
	el.appendChild(caixaBotoes);


	var botaoJogar = document.createElement("div");
	botaoJogar.setAttribute("id" , "btnJogar");
	botaoJogar.setAttribute("tabIndex" , "-1");
	botaoJogar.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoJogar);


	botaoJogar.onclick = function()
	{
		ativarBotaoJogar();
	}
	botaoJogar.onmouseenter = function()
	{
		AudioBotoes("audio/jogar.mp3");
	}

	//Cria botao de instruções e adiciona a caixa de botões
	var botaoInstrucoes = document.createElement("div");
	botaoInstrucoes.setAttribute("id", "btnInstrucoes");
	botaoInstrucoes.setAttribute("tabIndex" , "-1");
	botaoInstrucoes.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoInstrucoes);

	
	botaoInstrucoes.onclick = function()
	{
		ativarBotaoInstrucoes();
	}
	botaoInstrucoes.onmouseenter = function()
	{
		AudioBotoes("audio/ajuda.mp3");
	}


	//Cria botao de créditos na caixa de botoes
	var botaoCreditos = document.createElement("div");
	botaoCreditos.setAttribute("id" , "btnCreditos");
	botaoCreditos.setAttribute("tabIndex" , "-1");
	botaoCreditos.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoCreditos);


	botaoCreditos.onclick = function()
	{
		ativarBotaoCreditos();
	}
	botaoCreditos.onmouseenter = function()
	{
		AudioBotoes("audio/creditos.mp3");
	}
	

	inicializaFocus();


	$("#camadaMenu").keydown(function (e){
		selecionaOpcao(e);	
	
		switch (opcao){
			case 0:
				document.getElementById("btnJogar").focus();
				break;
			case 1:
				document.getElementById("btnInstrucoes").focus();
				break;
			case 2:
				document.getElementById("btnCreditos").focus();
				break;
		}
	})

	origemMenu = 1
}

function ativarBotaoJogar()
{
	destruirCamadaMenu();
	criarCamadaJogo();
}

function ativarBotaoInstrucoes()
{
	destruirCamadaMenu();
	criarCamadaInstrucoes();
}

function ativarBotaoCreditos()
{
	destruirCamadaMenu();
	criarCamadaCreditos();
}

function ativarBotaoReiniciar()
{
	destruirCamadaDerrota();
	destruirCamadaJogo();
	sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
	//salvaPontuacao(jogo.nome, pontos);
	criarCamadaJogo();
}

function ativarBotaoSair()
{
	destruirCamadaVitoria();
	destruirCamadaDerrota();
	destruirCamadaJogo();
	sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
	//salvaPontuacao(jogo.nome, pontos);
	criarCamadaMenu();
}

function ativarProxPalavra()
{
	sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
	destruirCamadaVitoria();
	criarCamadaJogo();
	//salvaPontuacao(jogo.nome, pontos);
}

function destruirCamadaMenu()
{
	$("#camadaMenu").remove();
}

function criarCamadaJogo()
{
	if(!origemMenu){
		background.currentTime = 0
	}
	origemMenu = 0
	background.play()

	var el = document.createElement("div");
	el.setAttribute("id", "camadaJogo");
	$("#palco").append(el);

	var imgLogo = document.createElement("div");
	imgLogo.setAttribute("id", "imgLogo");
	el.appendChild(imgLogo);

	realizaLeitura = true;
	iniciar();
}

function destruirCamadaJogo()
{
	$("#camadaJogo").remove();
	background.pause()
}

function criarCamadaCreditos()
{
	estado = "creditos";

	var el = document.createElement("div");
	el.setAttribute("id", "camadaCreditos");
	$("#palco").append(el);


	var para = $('<br>').appendTo(el);
	var para = $('<br>').appendTo(el);
	var para = $('<br>').appendTo(el);

	var para = document.createElement("p");
	para.innerHTML = "Coordenação";
	el.appendChild(para);

	var colLeft = document.createElement("div");
	colLeft.setAttribute("style", "width: 230px; float: left;  text-align: right;");
	el.appendChild(colLeft);

	var para = document.createElement("p");
	para.innerHTML = "Delano Medeiros Beder";
	colLeft.appendChild(para);

	var colRight = document.createElement("div");
	colRight.setAttribute("style", "width: 230px; float: right; text-align: left;");
	el.appendChild(colRight);

	var para = document.createElement("p");
	para.innerHTML = "Joice Lee Otsuka";
	colRight.appendChild(para);

	var para = document.createElement("p");
	para.innerHTML = "Equipe";
	el.appendChild(para);

	var colLeft = document.createElement("div");
	colLeft.setAttribute("style", "width: 250px; float: left;  text-align: center;");
	el.appendChild(colLeft);

	var para = document.createElement("p");
	para.innerHTML = "Marcelo Lopes Lotufo";
	colLeft.appendChild(para);

	var para = document.createElement("p");
	para.innerHTML = "Murilo Dell Agnolo Garcia";
	colLeft.appendChild(para);

	var para = document.createElement("p");
	para.innerHTML = "Luiz Valério Neto";
	colLeft.appendChild(para);

	var para = document.createElement("p");
	para.innerHTML = "Henrique Souza Barros";
	colLeft.appendChild(para);

	var colRight = document.createElement("div");
	colRight.setAttribute("style", "width: 250px; float: right; text-align: center;");
	el.appendChild(colRight);

	var para = document.createElement("p");
	para.innerHTML = "Kátia Carnier";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Rafaela Ferraz Majaron";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Diana Gomes Ragnole Silva";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Catarine Santana Ohnuma";
	colRight.appendChild(para);


	el.onmousedown = function()
	{
		destruirCamadaCreditos();
		criarCamadaMenu();
	}
	document.onkeydown = function(e)
	{
		e = window.event||e;
		if((e.which == 27 || e.keyCode == 27 || e.charCode == 24) && estado == "creditos")
		{
			destruirCamadaCreditos();
			criarCamadaMenu();
		}
	}
}

function destruirCamadaCreditos()
{
	$("#camadaCreditos").remove();
}

function criarCamadaVitoria()
{

	estado = "vitoria";
	opcao = 5;

	var audio = document.createElement("AUDIO");
	audio.setAttribute("src", "audio/vitoria2.ogg");
	//var audio = document.getElementById("vitoria"); 
	audio.currentTime = 0
	setTimeout(function(){
		audio.play();
	}, 500);

	var fase;
	var faseId;
	var el = document.createElement("div");
	el.setAttribute("id", "camadaVitoria");
	el.setAttribute("tabIndex", "0");
	$("#palco").append(el);

	/*if((jogo.bdTamanho) == 0) {
		$('<p>').attr('id', 'pontosNaTela')
			.html('Pontos: ' + parseInt(jogo.pontos))
			.appendTo($('#camadaVitoria'));
	}*/

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("tabIndex", "2");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = "<h2> Você acertou! </h2> <br> A palavra é " + jogo.palavraSorteada;

	jogo.imgBonecoVitoria = document.createElement("div");
	jogo.imgBonecoVitoria.setAttribute("id", "imgBonecoVitoria");

	jogo.botoesVitoria = document.createElement("div");
	jogo.botoesVitoria.setAttribute("id", "botoesTelaVitoria");
	
	$("#camadaVitoria").append(jogo.palavraNaTela);
	$("#camadaVitoria").append(jogo.imgBonecoVitoria);
	$("#camadaVitoria").append(jogo.botoesVitoria);

	$("<button>").attr("id", "btnProxPalavra").click(
		function(){
			ativarProxPalavra();	
		}
	).appendTo($("#botoesTelaVitoria"));

	
	/*document.getElementById("btnProxPalavra").onfocus = function()
	{
		AudioBotoes("audio/proxima.mp3");
	}*/
	document.getElementById("btnProxPalavra").onmouseenter = function()
	{
		AudioBotoes("audio/proxima.mp3");
	}

	$("<button>").attr("id", "btnMenu").click(
		function(){
			ativarBotaoSair();
		}
	).appendTo($("#botoesTelaVitoria"));
	document.getElementById("btnMenu").onmouseenter = function()
	{
		AudioBotoes("audio/menu.mp3");
	}

	document.addEventListener("keyup", proximaFase);

	inicializaFocus();

	$("#camadaVitoria").keydown(function (e){
		selecionaOpcao(e);	
	
		if(opcao == 5){
			document.getElementById("btnProxPalavra").focus();
		}
		else if(opcao == 4){
			document.getElementById("btnMenu").focus();
		}
		console.log(opcao);
	})
}

function proximaFase(e)
{
	e.preventDefault();

	if(e.keycode == 32 || e.which == 32 || e.charcode == 32)
	{
		sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
		destruirCamadaVitoria();
		criarCamadaJogo();
	}
}

function destruirCamadaVitoria()
{
	document.removeEventListener("keyup", proximaFase);
	$("#camadaVitoria").remove();
}

function criarCamadaFimdeJogo()
{
	var audio = document.createElement("AUDIO");
	audio.setAttribute("src", "audio/vitoria1.ogg");
	//var audio = document.getElementById("vitoria"); 
	audio.currentTime = 0;
	setTimeout(function(){
		audio.play();
	}, 200);

	var fase;
	var faseId;
	var el = $('<div>').attr("id", "camadaFimdeJogo").appendTo($("#palco"));
	/*$('<p>').attr('id', 'pontosNaTela')
		.html('Pontos: ' + parseInt(jogo.pontos))
		.appendTo($('#camadaFimdeJogo'));*/

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("tabIndex", "2");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = "<h2> Parabéns! Você escapou da forca! </h2> <br> A palavra é " + jogo.palavraSorteada + "<br><br>Pontuação final: "+jogo.pontos;

	jogo.imgBonecoVitoria = document.createElement("div");
	jogo.imgBonecoVitoria.setAttribute("id", "imgBonecoVitoria");

	jogo.botoesVitoria = document.createElement("div");
	jogo.botoesVitoria.setAttribute("id", "botoesTelaVitoria");

	$("#camadaFimdeJogo").append(jogo.palavraNaTela);
	$("#camadaFimdeJogo").append(jogo.imgBonecoVitoria);
	$("#camadaFimdeJogo").append(jogo.botoesVitoria);

	/*jogo.fimdeJogo = document.createElement("p");
	jogo.fimdeJogo.setAttribute("id", "fimdeJogo");
	jogo.fimdeJogo.setAttribute("tabIndex", "3");
	jogo.fimdeJogo.setAttribute("role", "textbox");
	jogo.fimdeJogo.innerHTML = "Tela de Fim de Jogo"
	$("#camadaFimdeJogo").append(jogo.fimdeJogo);*/

	$("<button>").attr("id", "btnMenu").click(
		function(){
			sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
			destruirCamadaFimdeJogo();
			//salvaPontuacao(jogo.nome, pontos);
			criarCamadaMenu();
			iniciarNovoJogo();	
		}
	).appendTo($("#botoesTelaVitoria"));
	document.getElementById("btnMenu").onfocus = function()
	{
		var audio = document.createElement("AUDIO");
		audio.setAttribute("src", "audio/menu.mp3");
		audio.play();
	}

	/*$('<div>').css({
		'position': 'absolute',
		'width': '800px',
		'height': '600px',
		'background-image': 'url("imgs/vitoria.png")'})
	.click(function(){
			sendData(jogo.pontos, jogo.pontosParciais , true, jogo.erros, jogo.fase, jogo.faseId, jogo.bd.length, false);
			destruirCamadaFimdeJogo();
			criarCamadaMenu();
			iniciarNovoJogo();
	})
	.appendTo(el);*/

	document.addEventListener("keyup", fimdeJogoMenu);
}

function fimdeJogoMenu(e){
	e.preventDefault();

	if(e.keyCode == 32)
	{
		sendData(jogo.pontos, jogo.pontosParciais , true, jogo.erros, jogo.fase, jogo.faseId, jogo.bd.length, false);
		destruirCamadaFimdeJogo();
		criarCamadaMenu();
		iniciarNovoJogo();
	}
}

function destruirCamadaFimdeJogo()
{
	$("#camadaFimdeJogo").remove();
	document.removeEventListener("keyup", fimdeJogoMenu);
}

function criarCamadaDerrota()
{

	estado = "derrota";
	opcao = 3;
	var audio = document.createElement("AUDIO");
	audio.setAttribute("src", "audio/derrota1.ogg");
	//var audio = document.getElementById("derrota"); 
	setTimeout(function(){
		audio.play();
	}, 400);
	origemDerrota = 1

	var fase;
	var faseId;
	//var pontos = jogo.pontos;

	var el = document.createElement("div");
	el.setAttribute("id", "camadaDerrota");
	el.setAttribute("tabIndex", "0");
	$("#palco").append(el);

		
	jogo.imgBoneco = document.createElement("div");
	jogo.imgBoneco.setAttribute("id", "imgBonecoDerrota");

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = "<h2> Você errou :( </h2> A palavra correta é: " + jogo.palavraSorteada;
	
	jogo.botoes = document.createElement("div");
	jogo.botoes.setAttribute("id", "botoesFimDeJogo");

	jogo.jogadorPontos = document.createElement("p");
	jogo.jogadorPontos.setAttribute("id", "jogadorPontos");
	jogo.jogadorPontos.innerHTML = "Pontuação final: " + parseInt(jogo.pontos) + " pontos";


	$("#camadaDerrota").append(jogo.imgBoneco);
	$("#camadaDerrota").append(jogo.palavraNaTela);
	$("#camadaDerrota").append(jogo.jogadorPontos);
	$("#camadaDerrota").append(jogo.botoes);


	//criando botoes clicáveis
	
	$("<button>").attr("id", "btnReiniciar").click(
		function(){
			ativarBotaoReiniciar();	
		}
	).appendTo($("#botoesFimDeJogo"));
	document.getElementById("btnReiniciar").onmouseenter = function()
	{
		AudioBotoes("audio/recomecar.mp3");
	}

	$("<button>").attr("id", "btnMenu").click(
		function(){
			ativarBotaoSair();	
		}
	).appendTo($("#botoesFimDeJogo"));
	document.getElementById("btnMenu").onmouseenter = function()
	{
		AudioBotoes("audio/menu.mp3");
	}

	document.addEventListener("keyup", derrotaMenu);

	inicializaFocus();

	$("#camadaDerrota").keydown(function (e){
		selecionaOpcao(e);	
		console.log(opcao);
	
		if(opcao == 3){
			document.getElementById("btnReiniciar").focus();
		}
		else if(opcao == 4){
			document.getElementById("btnMenu").focus();
		}
	})
}

function derrotaMenu(e){
	e.preventDefault();

	if(e.keycode == 32 || e.charcode == 32 || e.which == 32)
	{
		sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
		destruirCamadaDerrota();
		destruirCamadaJogo();
		criarCamadaMenu();	
	}
}

function destruirCamadaDerrota()
{
	document.removeEventListener("keyup", derrotaMenu);
	$("#camadaDerrota").remove();
}

function criarCamadaRanking()
{
	$('<div>').attr('id', 'camadaRanking')
		.css({
			'width': '800px',
			'height': '600px',
			'position': 'absolute',
			'top': '0px'
		})
		.click(function(){
			destruirCamadaRanking();
			criarCamadaMenu();
		})
		.appendTo($('#palco'));

	var colRank = $('<div>').css({
			'width': '250px',
			'position': 'absolute',
			'text-align': 'center',
			'top': '36%',
			'left': '1%'
		})
		.appendTo($('#camadaRanking'));

	$('<p>').html('Ranking').appendTo(colRank);

	for (i = 0; i < ranking.length; i++) {
		$('<p>').html((i+1) + '.').appendTo(colRank);
	}

	var colNome = $('<div>').css({
			'width': '340px',
			'position': 'absolute',
			'text-align': 'center',
			'top': '36%',
			'left': '15%'
		})
		.appendTo($('#camadaRanking'));

	$('<p>').html('Nome').appendTo(colNome);

	for (i = 0; i < ranking.length; i++) {
		$('<p>').html(ranking[i]["jogador"]).appendTo(colNome);
	}

	var colPontuacao = $('<div>').css({
			'width': '100px',
			'position': 'absolute',
			'text-align': 'center',
			'top': '36%',
			'left': '400px'
		})
		.appendTo($('#camadaRanking'));

	$('<p>').html('Pontuação').appendTo(colPontuacao);

	for (i = 0; i < ranking.length; i++) {
		$('<p>').html(ranking[i]["pontos"]).appendTo(colPontuacao);
	}

	var colData = $('<div>').css({
			'width': '210px',
			'position': 'absolute',
			'text-align': 'center',
			'top': '36%',
			'left': '530px'
		})
		.appendTo($('#camadaRanking'));

	$('<p>').html('Data').appendTo(colData);

	for (i = 0; i < ranking.length; i++) {
		$('<p>').html(formataData(ranking[i]["data"])).appendTo(colData);
	}
}

function formataData(strData)
{
	var data = new Date(strData);
	var v = data.getDate();
	var s = (v < 10 ? '0' + v : v) + "/";
	v = data.getMonth() + 1;
	s += (v < 10 ? '0' + v: v) + "/";
	s += data.getFullYear() + " ";
	v = data.getHours();
	s += (v < 10 ? '0' + v: v) + ":";
	v = data.getMinutes();
	s += (v < 10 ? '0' + v: v) + ":";
	v = data.getSeconds();
	s += (v < 10 ? '0' + v: v);
	return s;
}

function destruirCamadaRanking()
{
	$("#camadaRanking").remove();
}

function criarCamadaInstrucoes()
{
	estado = "instrucoes"

	//criação camada de instruções
	$('<div>').attr('id', 'camadaInstrucoes').appendTo($('#palco'));

	//conteúdo instruções
	jogo.instrucoes = document.createElement("p");
	jogo.instrucoes.setAttribute("id", "instrucoesText");
	jogo.instrucoes.innerHTML = 
	"Escape da forca acertando todos os desafios! <br><br>Para isso, você deve decifrar qual palavra corresponde à dica. <br>"+
	 "Cada letra que você acerta é colocada na palavra. <br>"+
	 "A cada vez que você erra, uma parte do corpo é colocada na forca. <br>Se errar cinco letras da mesma palavra, você perde e tem que recomeçar. <br>"+
	 "A cada palavra que você acerta, você ganha dez pontos; porém, para cada letra que erra, perde um ponto."+
	 "<br>Você pode jogar usando o teclado da tela ou o seu próprio teclado.<br><br>"+
	 "Atalhos sonoros:<br>"+
	 "Para usá-los, pressione os números no seu teclado alfanumérico.<br>"+
	 "1 - Ouça a dica<br>"+
	 "2 - Ouça o que você descobriu da palavra até agora<br>"+
	 "3 - Saiba quantas vidas você ainda tem<br>"+
	 "4 - Relembre as letras que você já escolheu<br>"+
	 "5 - Saiba sua pontuação atual<br>"+
	 "6 - Pare o som do atalho em que você clicou<br>"+
	 "Esc - Menu<br><br>"+
	 "Boa sorte!";

	//inserindo instrucoes a camada de instruções
	$('#camadaInstrucoes').append(jogo.instrucoes);	

	document.onkeydown = function(e)
	{
		e = window.event||e;
		if((e.which == 27 || e.keyCode == 27 || e.charCode == 24) && estado == "instrucoes")
		{
			destruirCamadaInstrucoes();
			criarCamadaMenu();
		}
	}
}

function destruirCamadaInstrucoes()
{
	$("#camadaInstrucoes").remove();
}

function selecionaOpcao(e)
{
	switch(e.keyCode){
		case 13: //Enter
			switch(opcao){
				case 0:
					ativarBotaoJogar();
					opcao = -1;
				break;

				case 1:
					ativarBotaoInstrucoes();
					opcao = -1;
				break;

				case 2:
					ativarBotaoCreditos();
					opcao = -1;
				break;

				case 3:
					ativarBotaoReiniciar();
					opcao = -1;
				break;

				case 4:
					ativarBotaoSair();
					opcao = -1;
				break;

				case 5:
					ativarProxPalavra();
					opcao = -1;
				break;
			}
		break;
		case 37: //ArrowLeft
			if(estado == "menu"){
				if(opcao > 0){
					tocaAudio();
					opcao--;
				}
				if(opcao == 0)
				{
					AudioBotoes("audio/jogar.mp3");
				}
				if(opcao == 1)
				{
					AudioBotoes("audio/ajuda.mp3");
				}
			}
			else if(estado == "derrota"){
				if(opcao > 3){
					tocaAudio();
					AudioBotoes("audio/recomecar.mp3");
					opcao--;
				}
			}
			else if(estado == "vitoria"){
				if(opcao < 5){
					tocaAudio();
					AudioBotoes("audio/proxima.mp3");
					opcao++;
				}
			}
		break;

		case 39: //ArrowRight
			if(estado == "menu"){
				if(opcao < 2){
					tocaAudio();
					opcao++;
				}
				if(opcao == 1)
				{
					AudioBotoes("audio/ajuda.mp3");
				}
				if(opcao == 2)
				{
					AudioBotoes("audio/creditos.mp3");
				}
			}
			else if(estado == "derrota"){
				if(opcao < 4){
					tocaAudio();
					AudioBotoes("audio/menu.mp3");
					opcao++;
				}
			}
			else if(estado == "vitoria"){
				if(opcao > 4){
					tocaAudio();
					AudioBotoes("audio/menu.mp3");
					opcao--;
				}
			}
		break;

	}
}

function tocaAudio() {
	audioTeclas.currentTime = 0;
	audioTeclas.play();
}

function AudioBotoes(nomeAudio)
{
	var audio = document.createElement("AUDIO");
	audio.setAttribute("src", nomeAudio);
	audio.play();
}

/*
opcoes = 0 - jogar
		1 - ajuda
		2 - creditos
		3 - reiniciar
		4 - sair
		5 - prox palavra
*/

function inicializaFocus(){
	if(estado == "menu"){
		document.getElementById("camadaMenu").focus();
		document.getElementById("btnJogar").focus();
		AudioBotoes("audio/jogar.mp3");
	}
	else if(estado == "derrota"){
		document.getElementById("camadaDerrota").focus();
		document.getElementById("btnReiniciar").focus();
		AudioBotoes("audio/recomecar.mp3");
	}
	else if(estado == "vitoria"){
		document.getElementById("camadaVitoria").focus();
		document.getElementById("btnProxPalavra").focus();
		setTimeout(function(){
			AudioBotoes("audio/proxima.mp3");
		}, 100);
	}
	else if(estado == "jogando"){
		document.getElementById("palavraNaTela").focus();
	}
}

jogo.palco = new Palco();
jogo.palco.criar();
iniciarNovoJogo();
criarCamadaMenu();

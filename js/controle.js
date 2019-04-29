/*
 O html do jogo é simplesmente um body com uma div chamada "palco"
 Quando a pagina carrega, ela carrega as tags <script> que contém os arquivos de javascript que geram o jogo
 Quando os scripts são carregados é criado uma div "menu" e seu conteudo
 Através das interações com os botões o html é gerado e destruido dinamicamente pelo javscript

 O css está sendo usado de maneira mista tanto inline (dentro do html) como por arquivos externos (css)
 */

var baseURL = "audio/audioGravado/";
var background = document.createElement("AUDIO");
background.setAttribute("src", "audio/background.mp3");
background.volume = 0.2;
var audioTeclas = document.createElement("AUDIO");
audioTeclas.setAttribute("src", "audio/efeitoTeclas.wav");
audioTeclas.volume = 1;
background.loop = true
var origemMenu;
var origemDerrota;
var opcao;
var estado;
var realizaLeitura = false;
var pulouMenu;
var pulouDerrota;
var pulouVitoria;
var audio3 = document.createElement("AUDIO");
audio3.volume = 1;
var origemInstrucoes;
var origemAudio
var sairInstrucoes = false;
var frase;

function criarCamadaMenu()
{	
	paraFala()
	origemAudio = "menu"
	origemInstrucoes = "menu";
	pulouMenu = false;
	estado = "menu";
	opcao = 0;


	if(origemDerrota){
		background.currentTime = 0
	}
	origemDerrota = 0
	background.play()

	var el = document.createElement("div");
	el.setAttribute("id", "camadaMenu");
	$("#palco").append(el);


	var imgMenu = document.createElement("img");
	imgMenu.setAttribute("id", "imgMenu");
	imgMenu.setAttribute("src", "imgs/desenhotelainicial.png")
	imgMenu.setAttribute("alt", "Imagem forca");
	el.appendChild(imgMenu);


	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoes");
	el.appendChild(caixaBotoes);

	//Cria botao de instruções e adiciona a caixa de botões
	var botaoInstrucoes = document.createElement("div");
	botaoInstrucoes.setAttribute("id", "btnInstrucoes");
	botaoInstrucoes.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoInstrucoes);
	
	botaoInstrucoes.onclick = function()
	{
		ativarBotaoInstrucoes();
	}
	botaoInstrucoes.onmouseenter = function()
	{
		botaoInstrucoes.focus();
		opcao = 0;
		clearTimeout(delayInicializaFocus);
	}

	var botaoJogar = document.createElement("div");
	botaoJogar.setAttribute("id" , "btnJogar");
	botaoJogar.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoJogar);


	botaoJogar.onclick = function()
	{
		ativarBotaoJogar();
	}
	botaoJogar.onmouseenter = function()
	{
		botaoJogar.focus();
		opcao = 1;
		clearTimeout(delayInicializaFocus);
	}

	//Cria botao de créditos na caixa de botoes
	var botaoCreditos = document.createElement("div");
	botaoCreditos.setAttribute("id" , "btnCreditos");
	botaoCreditos.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoCreditos);


	botaoCreditos.onclick = function()
	{
		ativarBotaoCreditos();
	}
	botaoCreditos.onmouseenter = function()
	{
		botaoCreditos.focus();
		opcao = 2;
		clearTimeout(delayInicializaFocus);
	}

	//Cria botao de opções na caixa de botoes
	var botaoAudio = document.createElement("div");
	botaoAudio.setAttribute("id" , "btnAudio");
	botaoAudio.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoAudio);


	botaoAudio.onclick = function()
	{
		ativarBotaoAudio();
	}
	botaoAudio.onmouseenter = function()
	{
		botaoAudio.focus();
		opcao = 3;
		clearTimeout(delayInicializaFocus);
	}
	
	//inicializaFalaInicial(); (ajustar dps)
	//inicializaFocus(); (creio q n existira nessa versão)

	$("#camadaMenu").keydown(function (e){
		selecionaOpcao(e);	
	})

	origemMenu = 1
}

function ativarBotaoJogar()
{
	clearTimeout(delayInicializaFocus);
	destruirCamadaMenu();
	criarCamadaJogo();
}

function ativarBotaoInstrucoes()
{
	clearTimeout(delayInicializaFocus);
	destruirCamadaMenu();
	criarCamadaInstrucoes();
}

function ativarBotaoCreditos()
{
	clearTimeout(delayInicializaFocus);
	destruirCamadaMenu();
	criarCamadaCreditos();
}

function ativarBotaoAudio()
{
	clearTimeout(delayInicializaFocus);
	criarCamadaAudio();
}

function ativarBotaoReiniciar()
{
	clearTimeout(delayInicializaFocus);
	destruirCamadaDerrota();
	destruirCamadaJogo();
	sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
	//salvaPontuacao(jogo.nome, pontos);
	iniciarNovoJogo();
	criarCamadaJogo();
}

function ativarBotaoSair()
{
	clearTimeout(delayInicializaFocus);
	destruirCamadaVitoria();
	destruirCamadaDerrota();
	destruirCamadaJogo();
	sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
	//salvaPontuacao(jogo.nome, pontos);
	iniciarNovoJogo();
	criarCamadaMenu();
}

function ativarProxPalavra()
{
	clearTimeout(delayInicializaFocus);
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
	paraFala();
	origemAudio = "jogo";
	frase = 1;

	if(!origemMenu){
		background.currentTime = 0
	}
	origemMenu = 0
	background.play()

	var el = document.createElement("div");
	el.setAttribute("id", "camadaJogo");
	$("#palco").append(el);

	iniciar();
	//leituraDica();
	var texto = jogo.dicaPalavra + ". " + tamanhoPalavraSemEspaco() + " letras.";
	realizarLeitura(texto);
}

function destruirCamadaJogo()
{
	$("#camadaJogo").remove();
	background.pause()
}

var audioCreditos = document.createElement("AUDIO");
audioCreditos.setAttribute("src", "audio/creditostxt.mp3");
audioCreditos.currentTime = 0

function criarCamadaCreditos()
{

	paraFala();
	realizarFala(baseURL + "creditosCompleto.mp3");
	/*audioCreditos.currentTime = 0
	audioCreditos.play();*/
	estado = "creditos";

	var el = document.createElement("div");
	el.setAttribute("id", "camadaCreditos");
	$("#palco").append(el);

	var para = $('<br>').appendTo(el);

	var para = document.createElement("h1");
	para.innerHTML = "Créditos";
	el.appendChild(para);

	var para = document.createElement("h1");
	para.innerHTML = "Coordenação";
	el.appendChild(para);

	var coord = document.createElement("div");
	el.appendChild(coord);

	var colLeft = document.createElement("div");
	colLeft.setAttribute("id", "linhaNomesLeft");
	coord.appendChild(colLeft);

	var para = document.createElement("p");
	para.innerHTML = "Delano Medeiros Beder";
	colLeft.appendChild(para);

	var colRight = document.createElement("div");
	colRight.setAttribute("id", "linhaNomesRight");
	coord.appendChild(colRight);

	var para = document.createElement("p");
	para.innerHTML = "Joice Lee Otsuka";
	colRight.appendChild(para);

	var para = document.createElement("h1");
	para.innerHTML = "Equipe";
	el.appendChild(para);

	var equipe = document.createElement("div");
	el.appendChild(equipe);

	var colLeft = document.createElement("div");
	colLeft.setAttribute("id", "linhaNomesLeft");
	equipe.appendChild(colLeft);

	var para = document.createElement("p");
	para.innerHTML = "Marcelo Lopes Lotufo";
	colLeft.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Murilo Dell Agnolo Garcia";
	colLeft.appendChild(para);

	var colRight = document.createElement("div");
	colRight.setAttribute("id", "linhaNomesRight");
	equipe.appendChild(colRight);

	var para = document.createElement("p");
	para.innerHTML = "Luiz Valério Neto";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Catarine Santana Ohnuma";
	colRight.appendChild(para);

	var para = document.createElement("h1");
	para.innerHTML = "Acessibilidade";
	el.appendChild(para);

	var acessibilidade = document.createElement("div");
	el.appendChild(acessibilidade);

	var colLeft = document.createElement("div");
	colLeft.setAttribute("id", "linhaNomesLeft");
	acessibilidade.appendChild(colLeft);

	var para = document.createElement("p");
	para.innerHTML = "Caio Vinícius Barbosa Santos";
	colLeft.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Jhonata Nícollas Carvalho Querobim";
	colLeft.appendChild(para);

	var colRight = document.createElement("div");
	colRight.setAttribute("id", "linhaNomesRight");
	acessibilidade.appendChild(colRight);

	var para = document.createElement("p");
	para.innerHTML = "Mariana Zagatti Sabino";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Rogério Augusto Bordini";
	colRight.appendChild(para);

	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoes");
	el.appendChild(caixaBotoes);

	var botaoMenu = document.createElement("div");
	botaoMenu.setAttribute("id" , "btnVoltar2");
	botaoMenu.setAttribute("tabIndex" , "-1");
	botaoMenu.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoMenu);

	botaoMenu.onmousedown = function()
	{
		destruirCamadaCreditos();
		criarCamadaMenu();
	}
	/*botaoMenu.onmouseenter = function()
	{
		realizarLeitura("Menu");
		//AudioBotoes("audio/menu.mp3");
	}*/
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
	//audioCreditos.pause()
	pararLeitura()
	$("#camadaCreditos").remove();
}

var audioVit = document.createElement("AUDIO");
audioVit.setAttribute("src", "audio/frasevitoria.mp3");

var audioVitP = document.createElement("AUDIO");
vitoria1 = false;
vitoria2 = false;
vitoria3 = false;
function criarCamadaVitoria()
{
	paraFala();
	estado = "vitoria";
	opcao = 0;
	pulouVitoria = false;

	//var audio = document.createElement("AUDIO");
	audio3.setAttribute("src", "audio/vitoria2.ogg");
	//var audio = document.getElementById("vitoria"); 
	audio3.currentTime = 0
	vitoria1 = setTimeout(function(){
		audio3.play();
	}, 500);

	vitoria2 = setTimeout(function(){
		/*var txt = "audio/" + numeroSorteado() + ".mp3"
		audioVitP.setAttribute("src", txt);
		audioVitP.currentTime = 0
		audioVitP.volume = 1
		audioVitP.play();*/
		leituraInicial(baseURL + "vitoriaFrase.mp3");
	}, 3800);

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
	jogo.palavraNaTela.setAttribute("id", "palavraCertaNaTela");
	jogo.palavraNaTela.setAttribute("tabIndex", "2");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = "<h2> Você acertou! </h2> <br> A palavra correta é " + jogo.palavraSorteada;

	jogo.imgBonecoVitoria = document.createElement("img");
	jogo.imgBonecoVitoria.setAttribute("id", "imgBonecoVitoria");
	jogo.imgBonecoVitoria.setAttribute("src", "imgs/imagem parabens.png");

	jogo.botoesVitoria = document.createElement("div");
	jogo.botoesVitoria.setAttribute("id", "botoesTelaVitoria");
	
	$("#camadaVitoria").append(jogo.imgBonecoVitoria);
	$("#camadaVitoria").append(jogo.palavraNaTela);
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
		document.getElementById("btnProxPalavra").focus();
		opcao = 0;
		clearTimeout(delayInicializaFocus);
	}

	$("<button>").attr("id", "btnMenu3").click(
		function(){
			ativarBotaoSair();
		}
	).appendTo($("#botoesTelaVitoria"));
	document.getElementById("btnMenu3").onmouseenter = function()
	{
		document.getElementById("btnMenu3").focus();
		opcao = 1;
		clearTimeout(delayInicializaFocus);
	}

	document.addEventListener("keyup", proximaFase);

	inicializaFocus();

	$("#camadaVitoria").keydown(function (e){
		selecionaOpcao(e);
		clearTimeout(vitoria1);
		clearTimeout(vitoria2);	
		clearTimeout(vitoria3);
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
	//clearTimeout(vitoria1)
	clearTimeout(vitoria2)
	audioVit.pause()
	audioVitP.pause()
	document.removeEventListener("keyup", proximaFase);
	$("#camadaVitoria").remove();
}

vitoria4 = false;
function criarCamadaFimdeJogo()
{
	
	estado = "fimdeJogo";

	//var audio = document.createElement("AUDIO");
	audio3.setAttribute("src", "audio/vitoria2.ogg");
	//var audio = document.getElementById("vitoria"); 
	audio3.currentTime = 0
	vitoria1 = setTimeout(function(){
		audio3.play();
	}, 500);

	vitoria2 = setTimeout(function(){
		/*var txt = "audio/" + numeroSorteado() + ".mp3"
		audioVitP.setAttribute("src", txt);
		audioVitP.currentTime = 0
		audioVitP.volume = 1
		audioVitP.play();*/
		leituraInicial(baseURL + "vitoriaFrase.mp3");
	}, 3800);

	vitoria3 = setTimeout(function(){
		realizarLeitura(jogo.palavraSorteada);
	}, 6100);

	vitoria4 = setTimeout(function(){
		audio3.setAttribute("src", "audio/audioGravado/pontuacaoFinal.mp3");
		audio3.currentTime = 0;
		audio3.play();
	}, 8000)


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
	jogo.palavraNaTela.innerHTML = "<h2> Parabéns! Você escapou da forca! </h2><h3>Pontuação final: "+jogo.pontos + "</h3> A palavra é " + jogo.palavraSorteada;

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

	$("<button>").attr("id", "btnProxPalavra").click(
		function(){
			sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
			destruirCamadaFimdeJogo();
			//salvaPontuacao(jogo.nome, pontos);
			criarCamadaMenu();
			iniciarNovoJogo();	
		}
	).appendTo($("#botoesTelaVitoria"));
	/*document.getElementById("btnMenu").onmouseenter = function()
	{
		realizarLeitura("Menu");
		//AudioBotoes("audio/menu.mp3");
	}*/

	inicializaFocus();
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

	document.onkeydown = function(e)
	{
		clearInterval(vitoria1);
		clearInterval(vitoria2);
		clearInterval(vitoria3);
		clearInterval(vitoria4);
		e = window.event||e;
		var setas = e.which || e.keyCode || e.charCode;
		if((setas == 37 || setas == 39) && estado == "fimdeJogo")
		{
			AudioBotoes("audio/menu.mp3");
		}
	}

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

var audioDer = document.createElement("AUDIO");
audioDer.setAttribute("src", "audio/frasederrota.mp3");
var pontfinal = document.createElement("AUDIO");
pontfinal.setAttribute("src", "audio/pontuacaofinal.mp3");

var derrota1 = false
var derrota2 = false
var derrota3 = false
var derrota4 = false
var derrota5 = false
var derrota6 = false
var derrota7 = false
var derrota8 = false
var derrota9 = false
var derrota10 = false

function criarCamadaDerrota()
{
	paraFala();
	estado = "derrota";
	opcao = 0;
	pulouDerrota = false;
	/*derrota1 = setTimeout(function(){
		audioDer.currentTime = 0
		audioDer.play()
	}, 3000);
	derrota2 = setTimeout(function(){
		var txt = "audio/" + numeroSorteado() + ".mp3"
		audioVitP.setAttribute("src", txt);
		audioVitP.currentTime = 0
		audioVitP.play();
	}, 5300);
	derrota3 = setTimeout(function(){
		pontfinal.currentTime = 0
		pontfinal.play()
	}, 7300);*/

	derrota1 = setTimeout(function(){
		leituraInicial(baseURL + "derrotaFrase.mp3");
	}, 3000);


	//var audio = document.createElement("AUDIO");
	audio3.setAttribute("src", "audio/derrota1.ogg");
	//var audio = document.getElementById("derrota"); 
	setTimeout(function(){
		audio3.play();
	}, 500);
	origemDerrota = 1

	var fase;
	var faseId;
	//var pontos = jogo.pontos;

	var el = document.createElement("div");
	el.setAttribute("id", "camadaDerrota");
	$("#palco").append(el);

		
	jogo.imgBoneco = document.createElement("img");
	jogo.imgBoneco.setAttribute("id", "imgBonecoDerrota");
	jogo.imgBoneco.setAttribute("src", "imgs/bonecoDerrota.png");
	jogo.imgBoneco.setAttribute("alt", "Imagem derrota");

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.innerHTML = "<h2> Você errou :( </h2> A palavra correta é " + jogo.palavraSorteada;
	
	jogo.botoes = document.createElement("div");
	jogo.botoes.setAttribute("id", "botoesFimDeJogo");

	jogo.jogadorPontos = document.createElement("p");
	jogo.jogadorPontos.setAttribute("id", "jogadorPontos");
	jogo.jogadorPontos.innerHTML = "Pontuação final: " + parseInt(jogo.pontos);


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
		document.getElementById("btnReiniciar").focus();
		opcao = 0;
		clearTimeout(delayInicializaFocus);
	}

	$("<button>").attr("id", "btnMenu3").click(
		function(){
			ativarBotaoSair();	
		}
	).appendTo($("#botoesFimDeJogo"));
	document.getElementById("btnMenu3").onmouseenter = function()
	{
		document.getElementById("btnMenu3").focus();
		opcao = 1;
		clearTimeout(delayInicializaFocus);
	}

	document.addEventListener("keyup", derrotaMenu);

	inicializaFocus();

	$("#camadaDerrota").keydown(function (e){
		selecionaOpcao(e);	
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
	clearTimeout(derrota1)

	pararLeitura()

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
	paraFala();

	estado = "instrucoes"

	var el = document.createElement("div");
	el.setAttribute("id", "camadaInstrucoes");
	$("#palco").append(el);

	//criação camada de instruções
	//$('<div>').attr('id', 'camadaInstrucoes').appendTo($('#palco'));

	//conteúdo instruções
	jogo.instrucoes = document.createElement("p")
	jogo.instrucoes.setAttribute("id", "instrucoesText")
	jogo.instrucoes.innerHTML = "<h1>Instruções</h1>";
	jogo.instrucoes.innerHTML+= " <h3>Escape da forca acertando todos os desafios!</h3> <br>Para isso, você deve decifrar qual palavra corresponde à dica. <br>"+
	 "Cada letra que você acerta é colocada na palavra. <br>"+
	 "A cada vez que você erra, uma parte do corpo é colocada na forca. <br>Se errar cinco letras da mesma palavra, você perde e tem que recomeçar. <br>"+
	 "A cada palavra que você acerta, você ganha dez pontos; porém, para cada letra que erra, perde um ponto."+
	 "<br>Você pode jogar usando o teclado do jogo ou o seu próprio teclado.<br><br>";


	//inserindo instrucoes a camada de instruções
	$('#camadaInstrucoes').append(jogo.instrucoes);	

	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoes");
	el.appendChild(caixaBotoes);

	var botaoMenu = document.createElement("div");
	botaoMenu.setAttribute("id" , "btnVoltar2");
	botaoMenu.setAttribute("class" , "botao");
	caixaBotoes.append(botaoMenu);


	botaoMenu.onclick = function()
	{
		if(origemInstrucoes == "menu")
		{
			destruirCamadaInstrucoes();
			criarCamadaMenu();
		}
		else if(origemInstrucoes == "opcoes")
		{
			destruirCamadaInstrucoes();
			estado = "jogando";
			paraFala();
			$("#camadaJogo").toggle();
			setTimeout(update, 50);
		}
	}

	/*botaoMenu.onmouseenter = function()
	{
		realizarLeitura("Menu");
		//AudioBotoes("audio/menu.mp3");
	}*/
	document.onkeydown = function(e)
	{
		e = window.event||e;
		if((e.which == 27 || e.keyCode == 27 || e.charCode == 24) && estado == "instrucoes")
		{
			destruirCamadaInstrucoes();
			if(origemInstrucoes == "menu")
			{
				criarCamadaMenu();
			}
			else if(origemInstrucoes == "opcoes")
			{
				sairInstrucoes = true;
				estado = "jogando";
				paraFala();
				$("#camadaJogo").toggle();
			
			}
		}
	}
}

function destruirCamadaInstrucoes()
{
	pararLeitura();
	$("#camadaInstrucoes").remove();
}

function selecionaOpcao(e)
{
	switch(e.keyCode){
		case 13: //Enter
			paraDeFalar();
			switch(opcao){
				case 0:
					if(estado == "menu")
						ativarBotaoInstrucoes();
					else if(estado== "vitoria")
						ativarProxPalavra();
					else if(estado == "derrota")
						ativarBotaoReiniciar();
					else if(estado == "opcoes")
						ativarOpcaoContinuar();
					else if(estado == "audio")
						enterMusicaFundo();
				break;

				case 1:
					if(estado == "menu")
						ativarBotaoJogar();
					else if(estado == "vitoria" || estado == "derrota")
						ativarBotaoSair();
					else if(estado == "opcoes")
						ativarOpcaoAudio();
					else if(estado == "audio")
						enterEfeitos();
				break;

				case 2:
					if(estado == "menu")
						ativarBotaoCreditos();
					else if(estado == "opcoes")
						ativarOpcaoInstrucoes();
					else if(estado == "audio")
						enterLeituraTela();
				break;

				case 3:
					if(estado == "opcoes")
						ativarOpcaoMenu();
					else if(estado == "audio")
						ativarAudioVoltar();
					else if(estado == "menu")
						ativarBotaoAudio();
			}	
		break;
		case 37: //ArrowLeft
			paraFala();
			if(opcao > 0 && !transicaoBarra){
				tocaAudio();
				opcao--;
				setaFoco();
			}
		break;

		case 39: //ArrowRight
			paraFala();
			if(estado == "menu"){
				if(opcao < 3){
					tocaAudio();
					opcao++;
					setaFoco();
				}
			}
			else if(estado == "derrota" || estado == "vitoria"){
				if(opcao < 1){
					tocaAudio();
					opcao++;
					setaFoco();
				}
			}
			else if(estado == "opcoes"){
				if(opcao < 3){
					tocaAudio();
					opcao++;
					setaFoco();
				}
			}
			else if(estado == "audio"){
				if(opcao < 3 && !transicaoBarra){
					tocaAudio();
					opcao++;
					setaFoco();
				}
			}
		break;

		case 40: //ArrowDown
			if(estado == "opcoes")
			{
				if(opcao < 3){
					tocaAudio();
					opcao++;
					setaFoco();
				}
			}
			else if(estado == "audio"){
				if(opcao < 3 && !transicaoBarra){
					tocaAudio();
					opcao++;
					setaFoco();
				}
			}
		break;

		case 38: //ArrowUp
			if(estado == "opcoes")
			{
				if(opcao > 0){
					tocaAudio();
					opcao--;
					setaFoco();
				}
			}
			else if(estado == "audio"){
				if(opcao > 0 && !transicaoBarra){
					tocaAudio();
					opcao--;
					setaFoco();
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
	var audio0 = document.createElement("AUDIO");
	audio0.setAttribute("src", nomeAudio);
	audio0.play();
}

/*
opcoes = 0 - instruções
		1 - jogar
		2 - creditos
		3 - reiniciar
		4 - sair
		5 - prox palavra
*/

var delayInicializaFocus

function inicializaFocus(){
	if(estado == "menu"){
		document.getElementById("camadaMenu").focus();
		document.getElementById("btnInstrucoes").focus();
	}
	else if(estado == "derrota"){
		document.getElementById("camadaDerrota").focus();
		document.getElementById("btnReiniciar").focus();
	}
	else if(estado == "vitoria"){
		document.getElementById("camadaVitoria").focus();
		document.getElementById("btnProxPalavra").focus();
	}
	else if(estado == "jogando"){
		document.getElementById("palavraNaTela").focus();
	}
	else if(estado == "fimdeJogo"){
		document.getElementById("camadaFimdeJogo").focus();
		document.getElementById("btnMenu").focus();
	}
	else if(estado == "opcoes"){
		document.getElementById("opcaoContinuar").focus();
		leituraInicial(baseURL + "configuracoes.mp3");
	}
	else if(estado == "audio"){
		document.getElementById("MusicaFundo").focus();
		leituraInicial(baseURL + "entrarEnter.mp3")
	}
}

function inicializaFocusFala(){
	if(estado == "menu"){
		realizarFala(baseURL + "instrucoes.mp3");
	}
	else if(estado == "opcoes"){
		realizarFala(baseURL + "continuar.mp3");
	}
	else if(estado == "derrota"){
		if(frase == 1){
			var txt = jogo.palavraSorteada;
			realizarLeituraInicial(txt);
		}
		else if(frase == 2){
			var txt = jogo.pontos + "pontos";
			realizarLeituraInicial(txt);
		}
	}
	else if(estado == "vitoria"){
		var txt = jogo.palavraSorteada;
		realizarLeituraInicial(txt);
	}
	else if(estado == "audio"){
		realizarFala(baseURL + "musicaFundo.mp3");
	}
}

function setaFoco(){
	audioinicial.pause();
	audio.pause();
	audioEnter.pause();
	switch(estado){
		case "menu":
			if(opcao == 0){
				document.getElementById("btnInstrucoes").focus();
				realizarFala(baseURL + "instrucoes.mp3");
			}
			else if(opcao == 1){
				document.getElementById("btnJogar").focus();
				realizarFala(baseURL + "jogar.mp3");
			}
			else if(opcao == 2){
				document.getElementById("btnCreditos").focus();
				realizarFala(baseURL + "creditos.mp3");
			}
			else if(opcao == 3){
				document.getElementById("btnAudio").focus();
				realizarFala(baseURL + "audio.mp3");
			}
		break;
		case "vitoria":
			if(opcao == 0){
				document.getElementById("btnProxPalavra").focus();
				realizarFala(baseURL + "continuar.mp3");
			}
			else if(opcao == 1){
				document.getElementById("btnMenu3").focus();
				realizarFala(baseURL + "desistir.mp3");
			}
		break;
		case "derrota":
			if(opcao == 0){
				document.getElementById("btnReiniciar").focus();
				realizarFala(baseURL + "reiniciar.mp3");
			}
			else if(opcao == 1){
				document.getElementById("btnMenu3").focus();
				realizarFala(baseURL + "desistir.mp3");
			}
		break;
		case "opcoes":
			if(opcao == 0){
				document.getElementById("opcaoContinuar").focus();
				realizarFala(baseURL + "continuar.mp3");
			}
			else if(opcao == 1){
				document.getElementById("opcaoAudio").focus();
				realizarFala(baseURL + "audio.mp3");
			}
			else if(opcao == 2){
				document.getElementById("opcaoInstrucoes").focus();
				realizarFala(baseURL + "instrucoesAcessibilidade.mp3");
			}
			else if(opcao == 3){
				document.getElementById("opcaoMenu").focus();
				realizarFala(baseURL + "desistir.mp3");
			}
		break;
		case "audio":
			if(opcao == 0){
				document.getElementById("MusicaFundo").focus();
				realizarFala(baseURL + "musicaFundo.mp3");
				/*audioConfiguracoes.setAttribute("src", "audio/audioGravado/musicaFundo.mp3");
				audioConfiguracoes.currentTime = 0;
				audioConfiguracoes.play();*/
			}
			else if(opcao == 1){
				document.getElementById("Efeitos").focus();
				realizarFala(baseURL + "Efeitos.mp3");
				/*audioConfiguracoes.setAttribute("src", "audio/audioGravado/Efeitos.mp3");
				audioConfiguracoes.currentTime = 0;
				audioConfiguracoes.play();*/
			}
			else if(opcao == 2){
				document.getElementById("LeituraTela").focus();
				realizarFala(baseURL + "leituraTela.mp3");
				/*audioConfiguracoes.setAttribute("src", "audio/audioGravado/leituraTela.mp3");
				audioConfiguracoes.currentTime = 0;
				audioConfiguracoes.play();*/
			}
			else if(opcao == 3){
				document.getElementById("audioVoltar").focus();
				audioConfiguracoes.setAttribute("src", "audio/audioGravado/voltar.mp3");
				audioConfiguracoes.currentTime = 0;
				audioConfiguracoes.play();
			}
		break;
	}
}

function inicializaFalaInicial(){
	leituraInicial(baseURL + "audioInicial.mp3");
}

function paraDeFalar(){
	window.speechSynthesis.cancel();
	pulouMenu = true;
	pulouDerrota = true;
	pulouVitoria = true;
}

function criarCamadaAtalhos()
{	
	estado = "atalho";
	$("#camadaJogo").toggle();
	setTimeout(update, 50);

	var el = document.createElement("div");
	el.setAttribute("id", "camadaAtalhos");
	el.setAttribute("tabIndex", 0);
	$("#palco").append(el);
	el.focus();

	var para = $('<br>').appendTo(el);

	var para = document.createElement("h1");
	para.innerHTML = "Atalhos";
	el.appendChild(para);

	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoesAtalhos")
	el.appendChild(caixaBotoes);

	atalho1 = document.createElement("div");
	atalho1.setAttribute("id", "btnAtalho1");
	atalho1.setAttribute("tabIndex", "-1");
	atalho1.setAttribute("class", "botao");
	caixaBotoes.appendChild(atalho1);
	atalho1.onclick = function(){
		ouvirAtalho1();
		estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);
	}

	atalho2 = document.createElement("div");
	atalho2.setAttribute("id", "btnAtalho2");
	atalho2.setAttribute("tabIndex", "-1");
	atalho2.setAttribute("class", "botao");
	caixaBotoes.appendChild(atalho2);
	atalho2.onclick = function(){
		ouvirAtalho2();
		estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);
	}

	atalho3 = document.createElement("div");
	atalho3.setAttribute("id", "btnAtalho3");
	atalho3.setAttribute("tabIndex", "-1");
	atalho3.setAttribute("class", "botao");
	caixaBotoes.appendChild(atalho3);
	atalho3.onclick = function(){
		ouvirAtalho3();
		estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);
	}

	atalho4 = document.createElement("div");
	atalho4.setAttribute("id", "btnAtalho4");
	atalho4.setAttribute("tabIndex", "-1");
	atalho4.setAttribute("class", "botao");
	caixaBotoes.appendChild(atalho4);
	atalho4.onclick = function(){
		ouvirAtalho4();
		estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);
	}

	atalho5 = document.createElement("div");
	atalho5.setAttribute("id", "btnAtalho5");
	atalho5.setAttribute("tabIndex", "-1");
	atalho5.setAttribute("class", "botao");
	caixaBotoes.appendChild(atalho5);
	atalho5.onclick = function(){
		ouvirAtalho5();
		estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);
	}

	voltar = document.createElement("div");
	voltar.setAttribute("id", "btnVoltar2");
	voltar.setAttribute("tabInder", "-1");
	voltar.setAttribute("class", "botao");
	caixaBotoes.appendChild(voltar);
	voltar.onclick = function(){
		estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);
	}
}

function ouvirAtalho1(){
	stopTudo();
	var texto = jogo.dicaPalavra + ". " + tamanhoPalavraSemEspaco() + " letras."
	realizarLeitura(texto);
}

function ouvirAtalho2(){
	var counter;
	audioAtalho2.setAttribute("src", "audio/letra1.mp3");
	//stopTudo();
	//paraFala();
	counter = 0;
	delayAtalho2 = setInterval(palavra, 700);
	function palavra()
	{
		if(counter >= tamanhoPalavraAtual())
		{
			clearInterval(delayAtalho2);
		}
		else if(palavraAtual(counter) == 0)
		{
			realizarLeituraLetra("espaco");
			counter++;
		}
		else if(palavraAtual(counter) == 1)
		{
			audioAtalho2.currentTime = 0;
			audioAtalho2.play();
			audioAtalho2.volume = volumeSinth;
			counter++;
		}
		else
		{
			realizarLeituraLetra(palavraAtual(counter));
			counter++;
		}
	}
}

function ouvirAtalho3(){
	stopTudo();
	paraFala();
	/*nomeAtalho3 = "audio/vidas" + numeroDeChances() + ".mp3";
	audioAtalho3.setAttribute("src", nomeAtalho3);
	audioAtalho3.currentTime = 0;
	audioAtalho3.play();*/
	switch(numeroDeChances())
	{
		case 1:
			realizarFala(baseURL + "1vida.mp3");
			break;
		case 2:
			realizarFala(baseURL + "2vidas.mp3");
			break;
		case 3:
			realizarFala(baseURL + "3vidas.mp3");
			break;
		case 4:
			realizarFala(baseURL + "4vidas.mp3");
			break;
		case 5:
			realizarFala(baseURL + "5vidas.mp3");
			break;
	}
}

function ouvirAtalho4(){
	audioAtalho4.setAttribute("src", "audio/atalho4.mp3");
	var nomeAtalho4;
	var somLetra4 = [];
	stopTudo()
	clearTimeout(delayAtalho4);
	clearInterval(delayLetraAtalho4);

	counter = 0;
	realizarFala(baseURL + "letrasEscolhidas.mp3");
	//audioAtalho4.currentTime = 0;
	//audioAtalho4.play();
	for(var i = 1; i < tamanhoLetrasTentadas(); i++)
	{
		if(retornaLetrasTentadas(i))
		{
			nomeAtalho4 = baseURL + retornaLetrasTentadas(i) + ".mp3";
			somLetra4.push(track(nomeAtalho4));
		}
	}
	counter = 0;
	delayAtalho4 = setTimeout(function(){
		delayLetraAtalho4 = setInterval(letras, 600);
		function letras()
		{
			if(counter > tamanhoLetrasTentadas())
			{
				clearInterval(delayAtalho4);
			}
			else
			{
				somLetra4[counter].currentTime = 0;
				somLetra4[counter].play();
				counter++;
			}
		}
	}, 2000);
}

function ouvirAtalho5(){
	audioAtalho5.setAttribute("src", "audio/pontos.mp3");
	stopTudo();
	paraFala();
	if(pontuacao() == 1)
	{
		realizarLeitura("Um ponto");
	}
	else
	{
		realizarLeitura(pontuacao() + " pontos.");
		//window.speechSynthesis.
	}
}

function destruirCamadaAtalhos()
{
	$("#camadaAtalhos").remove();
}

var transicaoBarra = false;
var audioConfiguracoes = document.createElement("AUDIO");
audioConfiguracoes.volume = 1;
var controle = 0;
var volumeSinth = 1;

function criarCamadaAudio()
{
	opcao = 0;
	transicaoBarra = false;
	estado = "audio";

	var el = document.createElement("div");
	el.setAttribute("id", "camadaAudio");
	el.setAttribute("tabIndex", 0);
	$("#palco").append(el);
	el.focus();

	var divAudio = document.createElement("div");
	divAudio.setAttribute("id", "divAudio");
	divAudio.setAttribute("tabIndex", 0);
	el.appendChild(divAudio);

	var audioTxt = document.createElement("p");
	audioTxt.setAttribute("id", "audioTxt");
	audioTxt.innerHTML = "Configurações de áudio";
	divAudio.appendChild(audioTxt);

	//Div com as barras de audio
	var caixaBarras = document.createElement("div");
	caixaBarras.setAttribute("id", "caixaBarrasAudio");
	divAudio.appendChild(caixaBarras);

	/*var MusicaFundo = document.createElement("p");
	MusicaFundo.setAttribute("id", "MusicaFundo");
	MusicaFundo.setAttribute("class", "textoAudio");
	MusicaFundo.setAttribute("tabIndex", -1);
	MusicaFundo.innerHTML = "Música de fundo";
	caixaBarras.appendChild(MusicaFundo);
	MusicaFundo.onclick = function(){
		opcao = 0;
	}*/
	var MusicaFundo = document.createElement("div");
	MusicaFundo.setAttribute("id", "MusicaFundo");
	MusicaFundo.setAttribute("class", "botao");
	MusicaFundo.setAttribute("tabIndex", -1);
	//MusicaFundo.innerHTML = "Música de fundo";
	caixaBarras.appendChild(MusicaFundo);
	MusicaFundo.onclick = function(){
		controle = 1;
		criarCamadaControleAudio();
		opcao = 0;
	}

	/*var sliderMusicaFundo = document.createElement("input");
	sliderMusicaFundo.setAttribute("type", "range");
	sliderMusicaFundo.setAttribute("min", "0");
	sliderMusicaFundo.setAttribute("max", "10");
	sliderMusicaFundo.setAttribute("value", background.volume*10);
	sliderMusicaFundo.setAttribute("id", "sliderMusicaFundo");
	sliderMusicaFundo.setAttribute("tabIndex", -1);
	sliderMusicaFundo.setAttribute("class", "slider");
	caixaBarras.appendChild(sliderMusicaFundo);
	//Atualiza volume da musica de fundo
	sliderMusicaFundo.oninput = function(){
		tocaAudio();
		background.volume = this.value/10;
	}*/

	var Efeitos = document.createElement("div");
	Efeitos.setAttribute("id", "Efeitos");
	Efeitos.setAttribute("class", "textoAudio");
	Efeitos.setAttribute("tabIndex", -1);
	//Efeitos.innerHTML = "Efeitos sonoros";
	caixaBarras.appendChild(Efeitos);
	Efeitos.onclick = function(){
		controle = 2;
		criarCamadaControleAudio();
		opcao = 1;
	}

	/*var sliderEfeitos = document.createElement("input");
	sliderEfeitos.setAttribute("type", "range");
	sliderEfeitos.setAttribute("min", "0");
	sliderEfeitos.setAttribute("max", "10");
	sliderEfeitos.setAttribute("value", audioTeclas.volume*10);
	sliderEfeitos.setAttribute("id", "sliderEfeitos");
	sliderEfeitos.setAttribute("tabIndex", -1);
	sliderEfeitos.setAttribute("class", "slider");
	caixaBarras.appendChild(sliderEfeitos);
	//Atualiza volume dos efeitos
	sliderEfeitos.oninput = function(){
		//document.getElementById("teclaIndisponivel").volume = this.value/10;
		audio2.volume = this.value/10;
		audio3.volume = this.value/10;
		audioTeclas.volume = this.value/10;
		tocaAudio();
	}*/


	var LeituraTela = document.createElement("div");
	LeituraTela.setAttribute("id", "LeituraTela");
	LeituraTela.setAttribute("class", "textoAudio");
	LeituraTela.setAttribute("tabIndex", -1);
	//LeituraTela.innerHTML = "Leitura de tela e acessibilidade";
	caixaBarras.appendChild(LeituraTela);
	LeituraTela.onclick = function(){
		controle = 3;
		criarCamadaControleAudio();
		opcao = 2;
	}

	/*var sliderLeituraTela = document.createElement("input");
	sliderLeituraTela.setAttribute("type", "range");
	sliderLeituraTela.setAttribute("min", "0");
	sliderLeituraTela.setAttribute("max", "10");
	sliderLeituraTela.setAttribute("value", audio.volume*10);
	sliderLeituraTela.setAttribute("id", "sliderLeituraTela");
	sliderLeituraTela.setAttribute("tabIndex", -1);
	sliderLeituraTela.setAttribute("class", "slider");
	caixaBarras.appendChild(sliderLeituraTela);
	sliderLeituraTela.oninput = function(){
		//----------------------------------------- FALAR NIVEL DO VOLUME --------------------------------------
		tocaAudio();
		audioinicial.volume = this.value/10;
		audio.volume = this.value/10;
		audioConfiguracoes.volume = this.value/10;
		msg.volume = this.value/10;
		volumeSinth = this.value/10;
		audioEnter.volume = this.value/10;
		audioErro.volume = this.value/10;
	}*/

	//var quebraLinha = document.createElement("br");
	//divAudio.appendChild(quebraLinha);

	//Cria div caixa de botoes
	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoesAudio");
	divAudio.appendChild(caixaBotoes);

	//btnVoltar
	var audioVoltar = document.createElement("div");
	audioVoltar.setAttribute("id", "audioVoltar");
	audioVoltar.setAttribute("tabIndex", -1);
	caixaBotoes.appendChild(audioVoltar);

	//btnContinuar
	audioVoltar.onclick = function(){
		ativarAudioVoltar();
	}
	audioVoltar.onmouseenter = function(){
		opcao = 3;
		audioVoltar.focus();
	}

	inicializaFocus();

	$("#camadaAudio").keydown(function (e){
		selecionaOpcao(e);	
	})

	$("#camadaAudio").keyup(function(e){
		if((e.charCode == 27 || e.which == 27 || e.keyCode == 27) && !transicaoBarra)
		{
			destruirCamadaAudio();
			if (origemAudio == "jogo")
			{
				criarCamadaOpcoes();
			}
			else if (origemAudio == "menu")
			{
				document.getElementById("camadaMenu").focus();
				document.getElementById("btnAudio").focus();
				estado = "menu";
				opcao = 3;
			}
		}
	})
}

function destruirCamadaAudio(){
	$("#camadaAudio").remove();
}

function criarCamadaControleAudio(){
	estado = "controle";
	
	var volumeInicial = 10;

	var el = document.createElement("div");
	el.setAttribute("id", "camadaControleAudio");
	el.setAttribute("tabIndex", 0);
	$("#palco").append(el);
	el.focus();

	var divControle = document.createElement("div");
	divControle.setAttribute("id", "divControle");
	divControle.setAttribute("tabIndex", 0);
	el.appendChild(divControle);

	var controleTxt = document.createElement("p");
	controleTxt.setAttribute("id", "controleTxt");
	switch(controle){
		case 1:
			volumeInicial = background.volume*10;
			controleTxt.innerHTML = "Música de fundo";
			break;
		case 2:
			volumeInicial = audioTeclas.volume*10;
			controleTxt.innerHTML = "Efeitos";
			break;
		case 3:
			volumeInicial = audio.volume*10;
			controleTxt.innerHTML = "Leitura de tela e acessibilidade";
			break;
	}
	divControle.appendChild(controleTxt);

	//Div com as barras de audio
	var caixaBarras = document.createElement("div");
	caixaBarras.setAttribute("id", "caixaBarrasAudio");
	divControle.appendChild(caixaBarras);

	var slider = document.createElement("input");
	slider.setAttribute("type", "range");
	slider.setAttribute("min", "0");
	slider.setAttribute("max", "10");
	slider.setAttribute("value", volumeInicial);
	slider.setAttribute("id", "slider");
	slider.setAttribute("tabIndex", -1);
	slider.setAttribute("class", "slider");
	caixaBarras.appendChild(slider);
	//Atualiza volume da musica de fundo
	slider.oninput = function(){
		tocaAudio();
		switch(controle){
			case 1:
				background.volume = this.value/10;
				break;
			case 2:
				audio2.volume = this.value/10;
				audio3.volume = this.value/10;
				audioTeclas.volume = this.value/10;
				break;
			case 3:
				audioinicial.volume = this.value/10;
				audio.volume = this.value/10;
				audioConfiguracoes.volume = this.value/10;
				msg.volume = this.value/10;
				volumeSinth = this.value/10;
				audioEnter.volume = this.value/10;
				audioErro.volume = this.value/10;
				break;
		}
	}
	
	//btnVoltar
	var audioVoltar = document.createElement("div");
	audioVoltar.setAttribute("id", "audioVoltar");
	audioVoltar.setAttribute("tabIndex", -1);
	audioVoltar.onclick = function(){
		destruirCamadaControleAudio();
	}
	caixaBarras.appendChild(audioVoltar);

}

function destruirCamadaControleAudio(){
	$("#camadaControleAudio").remove();
}

function ativarAudioVoltar(){
	destruirCamadaAudio();
	if (origemAudio == "jogo")
	{
		criarCamadaOpcoes();
	}
	else if(origemAudio == "menu"){
		document.getElementById("camadaMenu").focus();
		document.getElementById("btnAudio").focus();
		estado = "menu";
		opcao = 3;
	}
}

function enterMusicaFundo(){
	if(transicaoBarra){
		/*audioConfiguracoes.setAttribute("src", "audio/audioGravado/musicaFundo.mp3");
		audioConfiguracoes.currentTime = 0;
		audioConfiguracoes.play();
		document.getElementById("MusicaFundo").focus();*/
		setaFoco();
		transicaoBarra = false;
	}
	else if(!transicaoBarra){
		audioEnter.pause();
		realizarFala(baseURL + "sairEnter.mp3");
		document.getElementById("sliderMusicaFundo").focus()
		transicaoBarra = true
	}
}

function enterEfeitos(){
	if(transicaoBarra){
		/*audioConfiguracoes.setAttribute("src", "audio/audioGravado/Efeitos.mp3");
		audioConfiguracoes.currentTime = 0;
		audioConfiguracoes.play();
		document.getElementById("Efeitos").focus();*/
		setaFoco();
		transicaoBarra = false;
	}
	else if(!transicaoBarra){
		audioEnter.pause();
		realizarFala(baseURL + "sairEnter.mp3");
		document.getElementById("sliderEfeitos").focus();
		transicaoBarra = true;
	}
}

function enterLeituraTela(){
	if(transicaoBarra){
		/*audioConfiguracoes.setAttribute("src", "audio/audioGravado/leituraTela.mp3");
		audioConfiguracoes.currentTime = 0;
		audioConfiguracoes.play();
		document.getElementById("LeituraTela").focus();*/
		setaFoco();
		transicaoBarra = false;
	}
	else if(!transicaoBarra){
		audioEnter.pause();
		realizarFala(baseURL + "sairEnter.mp3");
		document.getElementById("sliderLeituraTela").focus();
		transicaoBarra = true;
	}
}

function criarCamadaOpcoes(){
	estado = "opcoes";
	opcao = 0;
	origemInstrucoes = "opcoes";

	//Cria div camada opcoes
	var el = document.createElement("div");
	el.setAttribute("id", "camadaOpcoes");
	el.setAttribute("tabIndex", 0);
	$("#palco").append(el);
	el.focus();
	/*Opcoes : ->Continuar
			   ->Áudio
			   ->Instruções
			   ->Menu*/


	//titulo

	var divOpcoes = document.createElement("div");
	divOpcoes.setAttribute("id", "divOpcoes");
	divOpcoes.setAttribute("tabIndex", 0)
	el.appendChild(divOpcoes);

	var opcoesTxt = document.createElement("h1");
	opcoesTxt.setAttribute("id", "opcoesTxt");
	opcoesTxt.innerHTML = "Opções";
	divOpcoes.appendChild(opcoesTxt);

	//Cria div caixa de botoes
	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoesOpcao");
	divOpcoes.appendChild(caixaBotoes);

	//btnContinuar
	var opcoesContinuar = document.createElement("div");
	opcoesContinuar.setAttribute("id", "opcaoContinuar");
	opcoesContinuar.setAttribute("class", "botaoOpcoes");
	opcoesContinuar.setAttribute("tabIndex", -1);

	//btnAudio
	var opcoesAudio = document.createElement("div");
	opcoesAudio.setAttribute("id", "opcaoAudio");
	opcoesAudio.setAttribute("class", "botaoOpcoes");
	opcoesAudio.setAttribute("tabIndex", -1);

	//btnIntrucoes
	var opcoesInstrucoes = document.createElement("div");
	opcoesInstrucoes.setAttribute("id", "opcaoInstrucoes");
	opcoesInstrucoes.setAttribute("class", "botaoOpcoes");
	opcoesInstrucoes.setAttribute("tabIndex", -1);

	//btnMenu
	var opcoesMenu = document.createElement("div");
	opcoesMenu.setAttribute("id", "opcaoMenu");
	opcoesMenu.setAttribute("class", "botaoOpcoes");
	opcoesMenu.setAttribute("tabIndex", -1);

	//adicionando botões a caixa de botoes
	caixaBotoes.appendChild(opcoesContinuar);
	caixaBotoes.appendChild(opcoesAudio);
	caixaBotoes.appendChild(opcoesInstrucoes);
	caixaBotoes.appendChild(opcoesMenu);

	//Implementação tela de opções navegação pelo mouse

	//btnContinuar
	opcoesContinuar.onclick = function(){
		ativarOpcaoContinuar();
	}
	opcoesContinuar.onmouseenter = function(){
		opcoesContinuar.focus();
		opcao = 0;
	}

	//btnAudio
	opcoesAudio.onclick = function(){
		ativarOpcaoAudio();
	}
	opcoesAudio.onmouseenter = function(){
		opcoesAudio.focus();
		opcao = 1;
	}

	//btnInstrucoes
	opcoesInstrucoes.onclick = function(){
		ativarOpcaoInstrucoes();
	}
	opcoesInstrucoes.onmouseenter = function(){
		opcoesInstrucoes.focus();
		opcao = 2;
	}

	//btnMenu
	opcoesMenu.onclick = function(){
		ativarOpcaoMenu();
	}
	opcoesMenu.onmouseenter = function(){
		opcoesMenu.focus();
		opcao = 3;
	}


	//Inicializa o foco da camada
	inicializaFocus();

	$("#camadaOpcoes").keydown(function (e){
		selecionaOpcao(e);	
	})

	$("#camadaOpcoes").keyup(function(e){
		if(e.charCode == 27 || e.which == 27 || e.keyCode == 27)
		{
			destruirCamadaOpcoes();
			sairInstrucoes = true;
			estado = "jogando";
		}
	})
}

function destruirCamadaOpcoes(){
	$("#camadaOpcoes").remove();
}

function ativarOpcaoContinuar(){
	destruirCamadaOpcoes();
	estado = "jogando";
	setTimeout(update, 50);
}

function ativarOpcaoAudio(){
	destruirCamadaOpcoes();
	criarCamadaAudio();
}

function ativarOpcaoInstrucoes(){
	destruirCamadaOpcoes();
	$("#camadaJogo").toggle();
	criarCamadaInstrucoes();
	estado = "instrucoes";
}

function ativarOpcaoMenu(){
	destruirCamadaOpcoes();
	destruirCamadaJogo();
	criarCamadaMenu();
}


window.scrollTo(0,1);
jogo.palco = new Palco();
jogo.palco.criar();
iniciarNovoJogo();
criarCamadaMenu();

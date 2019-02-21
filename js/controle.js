/*
 O html do jogo é simplesmente um body com uma div chamada "palco"
 Quando a pagina carrega, ela carrega as tags <script> que contém os arquivos de javascript que geram o jogo
 Quando os scripts são carregados é criado uma div "menu" e seu conteudo
 Através das interações com os botões o html é gerado e destruido dinamicamente pelo javscript

 O css está sendo usado de maneira mista tanto inline (dentro do html) como por arquivos externos (css)
 */

var background
background = document.getElementById("letraCerta"); 
//background = document.getElementById("background"); 
//background.loop = true
var origemMenu
var origemDerrota
var opcao = 0;

function criarCamadaMenu()
{	


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
	botaoJogar.setAttribute("tabIndex" , "1");
	botaoJogar.setAttribute("role" , "button");
	botaoJogar.setAttribute("aria-label" , "Jogar");
	botaoJogar.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoJogar);

	/*
	botaoJogar.onfocus = function() {
		console.log("focado");
	}
	botaoJogar.onblur = function() {
		removerComandosEnterSpace();
	}*/
	
	botaoJogar.onclick = function()
	{
		ativarBotaoJogar();
	}

	//Cria botao de instruções e adiciona a caixa de botões
	var botaoInstrucoes = document.createElement("div");
	botaoInstrucoes.setAttribute("id", "btnInstrucoes");
	botaoInstrucoes.setAttribute("tabIndex" , "2");
	botaoInstrucoes.setAttribute("role" , "button");
	botaoInstrucoes.setAttribute("aria-label" , "Instruções");
	botaoInstrucoes.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoInstrucoes);

	botaoInstrucoes.onclick = function()
	{
		ativarBotaoInstrucoes();
	}

	var botaoCreditos = document.createElement("div");
	botaoCreditos.setAttribute("id" , "btnCreditos");
	botaoCreditos.setAttribute("tabIndex" , "3");
	botaoCreditos.setAttribute("role" , "button");
	botaoCreditos.setAttribute("aria-label" , "Créditos");
	botaoCreditos.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoCreditos);

	/*botaoCreditos.onfocus = function() {
		adicionarComandosEnterSpace(ativarBotaoCreditos, botaoCreditos);
	}
	botaoCreditos.onblur = function() {
		removerComandosEnterSpace();
	}*/

	botaoCreditos.onclick = function()
	{
		ativarBotaoCreditos();
	}

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

	iniciar();
}

function destruirCamadaJogo()
{
	$("#camadaJogo").remove();
	background.pause()
}

function criarCamadaCreditos()
{
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
}

function destruirCamadaCreditos()
{
	$("#camadaCreditos").remove();
}

function criarCamadaVitoria()
{
	
	var audio = document.getElementById("vitoria"); 
	audio.currentTime = 0
	setTimeout(function(){
		audio.play();
	}, 200);

	var fase;
	var faseId;
	var el = $('<div>').attr("id", "camadaVitoria").appendTo($("#palco"));
	/*if((jogo.bdTamanho) == 0) {
		$('<p>').attr('id', 'pontosNaTela')
			.html('Pontos: ' + parseInt(jogo.pontos))
			.appendTo($('#camadaVitoria'));
	}*/

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("tabIndex", "2");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = "<h2> Você acertou ! </h2> <br> A palavra era: " + jogo.palavraSorteada;


	jogo.imgBonecoVitoria = document.createElement("div");
	jogo.imgBonecoVitoria.setAttribute("id", "imgBonecoVitoria");

	jogo.botoesVitoria = document.createElement("div");
	jogo.botoesVitoria.setAttribute("id", "botoesTelaVitoria");


	
	$("#camadaVitoria").append(jogo.palavraNaTela);
	$("#camadaVitoria").append(jogo.imgBonecoVitoria);
	$("#camadaVitoria").append(jogo.botoesVitoria);

	$("<button>").attr("id", "btnProxPalavra").click(
		function(){
			sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
			destruirCamadaVitoria();
			criarCamadaJogo();
			//salvaPontuacao(jogo.nome, pontos);	
		}
	).appendTo($("#botoesTelaVitoria"));


	$("<button>").attr("id", "btnMenu").click(
		function(){
			sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
			destruirCamadaVitoria();
			destruirCamadaJogo();
			//salvaPontuacao(jogo.nome, pontos);
			criarCamadaMenu();	
		}
	).appendTo($("#botoesTelaVitoria"));

	document.addEventListener("keyup", proximaFase);
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
	var audio = document.getElementById("vitoria"); 
	setTimeout(function(){
		audio.play();
	}, 200);

	var fase;
	var faseId;
	var el = $('<div>').attr("id", "camadaFimdeJogo").appendTo($("#palco"));
	$('<p>').attr('id', 'pontosNaTela')
		.html('Pontos: ' + parseInt(jogo.pontos))
		.appendTo($('#camadaFimdeJogo'));

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("tabIndex", "2");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = jogo.palavraSorteada;

	$("#camadaFimdeJogo").append(jogo.palavraNaTela);
	
	jogo.fimdeJogo = document.createElement("p");
	jogo.fimdeJogo.setAttribute("id", "fimdeJogo");
	jogo.fimdeJogo.setAttribute("tabIndex", "3");
	jogo.fimdeJogo.setAttribute("role", "textbox");
	jogo.fimdeJogo.innerHTML = "Tela de Fim de Jogo"
	$("#camadaFimdeJogo").append(jogo.fimdeJogo);


	$('<div>').css({
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
	.appendTo(el);

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
	var audio = document.getElementById("derrota"); 
	setTimeout(function(){
		audio.play();
	}, 400);
	origemDerrota = 1

	var fase;
	var faseId;
	//var pontos = jogo.pontos;

	$('<div>').attr('id', 'camadaDerrota').appendTo($('#palco'));

		
	jogo.imgBoneco = document.createElement("div");
	jogo.imgBoneco.setAttribute("id", "imgBonecoDerrota");

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("tabIndex", "2");
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
			destruirCamadaDerrota();
			destruirCamadaJogo();
			sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
			//salvaPontuacao(jogo.nome, pontos);
			criarCamadaJogo();	
		}
	).appendTo($("#botoesFimDeJogo"));

	$("<button>").attr("id", "btnMenu").click(
		function(){
			destruirCamadaDerrota();
			destruirCamadaJogo();
			sendData(jogo.pontos, jogo.pontosParciais , false, jogo.erros, jogo.fase, jogo.faseId,jogo.bd.length, false);
			//salvaPontuacao(jogo.nome, pontos);
			criarCamadaMenu();	
		}
	).appendTo($("#botoesFimDeJogo"));

	document.addEventListener("keyup", derrotaMenu);
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

	//criação camada de instruções
	$('<div>').attr('id', 'camadaInstrucoes').appendTo($('#palco'));

	//conteúdo instruções
	jogo.instrucoes = document.createElement("p");
	jogo.instrucoes.setAttribute("id", "instrucoesText");
	jogo.instrucoes.innerHTML = "Instruções aqui";

	//inserindo instrucoes a camada de instruções
	$('#camadaInstrucoes').append(jogo.instrucoes);	

}

function selecionaOpcao(e)
{

	switch(e.keyCode){
		case 13:
			if(opcao == 0)
				ativarBotaoJogar();
			else if(opcao == 1)
				ativarBotaoInstrucoes();
		break;
		case 37:
			if(opcao > 0)
			opcao--;
		break;

		case 39:
			if(opcao < 2)
			opcao++;
		break;
	}
}

jogo.palco = new Palco();
jogo.palco.criar();
iniciarNovoJogo();
criarCamadaMenu();

/*
 O html do jogo é simplesmente um body com uma div chamada "palco"
 Quando a pagina carrega, ela carrega as tags <script> que contém os arquivos de javascript que geram o jogo
 Quando os scripts são carregados é criado uma div "menu" e seu conteudo
 Através das interações com os botões o html é gerado e destruido dinamicamente pelo javscript

 O css está sendo usado de maneira mista tanto inline (dentro do html) como por arquivos externos (css)
 */
var tempo_inicial
var tempo_intermediario
var tempo_intermediario2
var baseURL = "audio/audioGravado/";
var background = document.createElement("AUDIO");
background.setAttribute("src", "audio/background.mp3");
background.volume = 0;
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

function criarCamadaMenu()
{	
	paraFala()
	origemAudio = "menu"
	origemInstrucoes = "menu";
	pulouMenu = false;
	estado = "menu";
	opcao = 0;
	origemDerrota = 0
	background.currentTime = 0;
	background.play();

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
	var botaoInstrucoes = document.createElement("button");
	botaoInstrucoes.setAttribute("id", "btnInstrucoes");
	botaoInstrucoes.innerText = "Instruções";
	caixaBotoes.appendChild(botaoInstrucoes);
	
	botaoInstrucoes.onclick = function()
	{
		ativarBotaoInstrucoes();
	}

	var botaoJogar = document.createElement("button");
	botaoJogar.setAttribute("id" , "btnJogar");
	botaoJogar.innerText = "Jogar";
	caixaBotoes.appendChild(botaoJogar);


	botaoJogar.onclick = function()
	{
		ativarBotaoJogar();
	}

	//Cria botao de créditos na caixa de botoes
	var botaoCreditos = document.createElement("button");
	botaoCreditos.setAttribute("id" , "btnCreditos");
	botaoCreditos.innerText = "Créditos";
	caixaBotoes.appendChild(botaoCreditos);


	botaoCreditos.onclick = function()
	{
		ativarBotaoCreditos();
	}

	//Cria botao de opções na caixa de botoes
	var botaoAudio = document.createElement("button");
	botaoAudio.setAttribute("id" , "btnAudio");
	botaoAudio.innerText = "Áudio";
	caixaBotoes.appendChild(botaoAudio);


	botaoAudio.onclick = function()
	{
		ativarBotaoAudio();
	}
	
	//inicializaFalaInicial(); (ajustar dps)
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
	paraFala();
	clearTimeout(delayInicializaFocus);
	destruirCamadaDerrota();
	destruirCamadaJogo();
	//salvaPontuacao(jogo.nome, pontos);
	iniciarNovoJogo();
	criarCamadaJogo();
}

function ativarBotaoSair()
{
	paraFala();
	pararLeitura();
	audio3.pause();
	clearTimeout(delayInicializaFocus);
	clearTimeout(vitoria6);
	destruirCamadaVitoria();
	destruirCamadaDerrota();
	destruirCamadaFimdeJogo();
	destruirCamadaJogo();
	//salvaPontuacao(jogo.nome, pontos);
	iniciarNovoJogo();
	criarCamadaMenu();
}

function ativarProxPalavra()
{
	paraFala();
	pararLeitura();
	audio3.pause();
	clearTimeout(delayInicializaFocus);
	clearTimeout(vitoria6);
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

	var el = document.createElement("div");
	el.setAttribute("id", "camadaJogo");
	$("#palco").append(el);

	iniciar();
	var texto = jogo.dicaPalavra + ". " + tamanhoPalavraSemEspaco() + " letras.";
	realizarLeitura(texto);

	if((jogo.bd.length-jogo.bdTamanho) == 1)
	{
		tempo_inicial = new Date()
		tempo_intermediario = tempo_inicial
	}
	else{
		tempo_intermediario = new Date()
	}
}

function destruirCamadaJogo()
{
	if(jogo.bdTamanho > 0){
		tempo_intermediario2 = new Date()
		sendPlaytimeData((tempo_intermediario2 - tempo_intermediario)/1000,2,'Forca',1,'Forca',jogo.bd.length-jogo.bdTamanho)
		tempo_intermediario = tempo_intermediario2
	}
	$("#camadaJogo").remove();
	background.pause()
}

function criarCamadaCreditos()
{
	paraFala();
	
	estado = "creditos";

	var el = document.createElement("div");
	el.setAttribute("id", "camadaCreditos");
	$("#palco").append(el);


	var botaoMenu = document.createElement("button");
	botaoMenu.setAttribute("id" , "btnVoltar2");
	botaoMenu.innerText = "Voltar ao Menu";
	

	var botaoOuvir = document.createElement("button");
	botaoOuvir.setAttribute("id", "btnOuvir");
	botaoOuvir.innerHTML = "Ouvir Créditos";
	
	el.appendChild(botaoOuvir);
	el.appendChild(botaoMenu);
	
	botaoMenu.onmousedown = function()
	{
		audio3.pause();
		destruirCamadaCreditos();
		criarCamadaMenu();
	}

	botaoOuvir.onmousedown = function(){
		audio3.setAttribute("src", baseURL + "creditosCompleto.mp3");
		audio3.currentTime = 0;
		audio3.play();
	}

	//div contendo conteudo da página
	var conteudo = document.createElement("div");
	conteudo.setAttribute("id", "conteudo")

	var para = document.createElement("h1");
	para.innerHTML = "Créditos";
	conteudo.appendChild(para);

	var para = document.createElement("h1");
	para.innerHTML = "Coordenação";
	conteudo.appendChild(para);

	var coord = document.createElement("div");
	conteudo.appendChild(coord);

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
	conteudo.appendChild(para);

	var equipe = document.createElement("div");
	conteudo.appendChild(equipe);

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
	conteudo.appendChild(para);

	var acessibilidade = document.createElement("div");
	conteudo.appendChild(acessibilidade);

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

	el.appendChild(conteudo);
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
var vitoria6;
function criarCamadaVitoria()
{
	paraFala();
	estado = "vitoria";
	opcao = 0;
	pulouVitoria = false;
	falaVitoria = 1;

	//var audio = document.createElement("AUDIO");
	audio3.setAttribute("src", "audio/vitoria2.mp3");
	//var audio = document.getElementById("vitoria"); 
	audio3.currentTime = 0
	vitoria1 = setTimeout(function(){
		audio3.play();
	}, 500);

	vitoria2 = setTimeout(function(){
		leituraInicial(baseURL + "vitoriaFrase.mp3")
	}, 3800);

	var fase;
	var faseId;
	var el = document.createElement("div");
	el.setAttribute("id", "camadaVitoria");
	$("#palco").append(el);

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraCertaNaTela");
	jogo.palavraNaTela.innerHTML = "<h2> Você acertou! </h2> <br> A palavra correta é " + jogo.palavraSorteada + 
		"<p> Pontuação: " + jogo.pontos + " pontos </p>";

	jogo.imgBonecoVitoria = document.createElement("img");
	jogo.imgBonecoVitoria.setAttribute("id", "imgBonecoVitoria");
	jogo.imgBonecoVitoria.setAttribute("src", "imgs/imagem_parabens.png");

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


	$("<button>").attr("id", "btnMenu3").click(
		function(){
			ativarBotaoSair();
		}
	).appendTo($("#botoesTelaVitoria"));

	sendData(jogo.dicaPalavra,jogo.palavraSorteada,jogo.bd.length-jogo.bdTamanho,'_',jogo.palavraSorteada,true,jogo.bd.length,1,'Forca')
}

function proximaFase(e)
{
	e.preventDefault();

	if(e.keycode == 32 || e.which == 32 || e.charcode == 32)
	{
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
	sendData(jogo.dicaPalavra,jogo.palavraSorteada,jogo.bd.length-jogo.bdTamanho,'_',jogo.palavraSorteada,true,jogo.bd.length,1,'Forca')
	sendRankingData(jogo.pontos)

	tempo_intermediario2 = new Date()
	sendPlaytimeData((tempo_intermediario2 - tempo_intermediario)/1000,2,'Forca',1,'Forca',jogo.bd.length-jogo.bdTamanho)

	var tempo_final = new Date()
	sendPlaytimeData((tempo_final-tempo_inicial)/1000,0,'Forca',null,null,null)
	sendPlaytimeData((tempo_final-tempo_inicial)/1000,1,'Forca',1,'Forca',null)

	estado = "fimdeJogo";

	//var audio = document.createElement("AUDIO");
	audio3.setAttribute("src", "audio/vitoria2.mp3");
	//var audio = document.getElementById("vitoria"); 
	audio3.currentTime = 0
	vitoria1 = setTimeout(function(){
		audio3.play();
	}, 500);

	//Adiciona áudio fim de jogo após o feedback de acerto da última palavra
	vitoria2 = setTimeout(function(){
		leituraInicial(baseURL + "FimDeJogo2.mp3");
	}, 3800);


	var fase;
	var faseId;
	var el = $('<div>').attr("id", "camadaFimdeJogo").appendTo($("#palco"));

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.innerHTML = "<h2> Parabéns! Você escapou da forca! </h2><p>Pontuação final: " + jogo.pontos + " pontos.</p>";

	jogo.imgBonecoVitoria = document.createElement("img");
	jogo.imgBonecoVitoria.setAttribute("id", "imgBonecoVitoria");
	jogo.imgBonecoVitoria.setAttribute("src", "imgs/imagem_parabens.png");

	
	$("#camadaFimdeJogo").append(jogo.imgBonecoVitoria);
	$("#camadaFimdeJogo").append(jogo.palavraNaTela);

	$("<button>").attr("id", "btnMenu3").click(
		function(){
			ativarBotaoSair();	
		}
	).appendTo($("#camadaFimdeJogo"));

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

	derrota1 = setTimeout(function(){
		leituraInicial(baseURL + "derrotaFrase2.mp3");
	}, 3000);


	//var audio = document.createElement("AUDIO");
	audio3.setAttribute("src", "audio/derrota1.mp3");
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
	jogo.palavraNaTela.innerHTML = "<h2> Você errou :( </h2>";
	
	jogo.botoes = document.createElement("div");
	jogo.botoes.setAttribute("id", "botoesFimDeJogo");

	jogo.jogadorPontos = document.createElement("p");
	jogo.jogadorPontos.setAttribute("id", "jogadorPontos");
	jogo.jogadorPontos.innerHTML = "Pontuação final: " + parseInt(jogo.pontos) + " pontos.";


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

	$("<button>").attr("id", "btnMenu3").click(
		function(){
			ativarBotaoSair();	
		}
	).appendTo($("#botoesFimDeJogo"));

	sendData(jogo.dicaPalavra,jogo.palavraSorteada,jogo.bd.length-jogo.bdTamanho,'_',palavraNoFim,false,jogo.bd.length,1,'Forca')
}

function derrotaMenu(e){
	e.preventDefault();

	if(e.keycode == 32 || e.charcode == 32 || e.which == 32)
	{
		destruirCamadaDerrota();
		destruirCamadaJogo();
		criarCamadaMenu();
	}
}

function destruirCamadaDerrota()
{
	clearTimeout(derrota1)
	pararLeitura()
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

	var botaoMenu = document.createElement("button");
	botaoMenu.setAttribute("id" , "btnSairInstrucoes");
	
	if(origemInstrucoes == "menu"){
		botaoMenu.innerHTML = "Voltar ao Menu";
	}
	else if(origemInstrucoes == "opcoes"){
		botaoMenu.innerHTML = "Voltar ao jogo";
	}

	el.appendChild(botaoMenu);

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

	/*var botaoOuvir = document.createElement("button");
	botaoOuvir.setAttribute("id", "btnOuvir");
	botaoOuvir.innerHTML = "Ouvir";
	btnGrupo.append(botaoOuvir);
	botaoOuvir.onclick = function()
	{
		
	}*/
	

	//conteúdo instruções
	jogo.instrucoes = document.createElement("p");
	jogo.instrucoes.setAttribute("id", "instrucoesText")
	jogo.instrucoes.innerHTML = "<h1>Instruções</h1>";
	jogo.instrucoes.innerHTML+= " <h3>Escape da forca acertando todos os desafios!</h3> <br>Para isso, você deve decifrar qual palavra corresponde à dica. "+
	 "Cada letra que você acerta é colocada na palavra. "+
	 "A cada vez que você erra, uma parte do corpo é colocada na forca. Se errar cinco letras da mesma palavra, você perde e tem que recomeçar. "+
	 "A cada palavra que você acerta, você ganha dez pontos; porém, para cada letra que erra, perde um ponto. "+
	 "Durante o jogo, você poderá acessar o menu de opções para ler as instruções e configurar o áudio através do botão Opções no canto superior esquerdo da tela " +
	 "e também poderá acessar informações sobre o status do jogo por meio do botão Status no canto superior direito da tela.";


	//inserindo instrucoes a camada de instruções
	$('#camadaInstrucoes').append(jogo.instrucoes);	
}

function destruirCamadaInstrucoes()
{
	pararLeitura();
	$("#camadaInstrucoes").remove();
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


var delayInicializaFocus



function inicializaFocusFala(){
	var pts = jogo.pontos + " pontos";
	if(estado == "menu"){
		realizarFala(baseURL + "instrucoes.mp3");
	}
	else if(estado == "opcoes"){
		realizarFala(baseURL + "continuar.mp3");
	}
	else if(estado == "derrota"){
		//Realiza leitura da pontuação final
		realizarLeitura(pts);
	}
	else if(estado == "vitoria"){
		if(falaVitoria == 1){
			var txt = jogo.palavraSorteada;
			realizarLeitura(txt);
			falaVitoria = 2;
		}
		else{
			realizarLeitura(pts);
			falaVitoria = 1;
		}
	}
	else if(estado == "audio"){
		realizarFala(baseURL + "musicaFundo.mp3");
	}
	else if(estado == "fimdeJogo"){
		//Realiza leitura da pontuação final
		realizarLeitura(pts);
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
	$("#palco").append(el);
	el.focus();

	var topo = document.createElement("div");
	topo.setAttribute("id", "topoAtalhos");
	el.appendChild(topo);

	var para = document.createElement("h1");
	para.innerHTML = "Atalhos";
	topo.appendChild(para);

	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoesAtalhos")
	el.appendChild(caixaBotoes);

	atalho1 = document.createElement("button");
	atalho1.setAttribute("id", "btnAtalho1");
	atalho1.innerText = "Dica";
	caixaBotoes.appendChild(atalho1);
	atalho1.onclick = function(){
		ouvirAtalho1();
		/*estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);*/
	}

	atalho2 = document.createElement("button");
	atalho2.setAttribute("id", "btnAtalho2");
	atalho2.innerText = "Como está a palavra";
	caixaBotoes.appendChild(atalho2);
	atalho2.onclick = function(){
		ouvirAtalho2();
		/*estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);*/
	}

	atalho3 = document.createElement("button");
	atalho3.setAttribute("id", "btnAtalho3");
	atalho3.innerText = "Número de vidas";
	caixaBotoes.appendChild(atalho3);
	atalho3.onclick = function(){
		ouvirAtalho3();
		/*estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);*/
	}

	atalho4 = document.createElement("button");
	atalho4.setAttribute("id", "btnAtalho4");
	atalho4.innerText = "Letras que você já escolheu";
	caixaBotoes.appendChild(atalho4);
	atalho4.onclick = function(){
		ouvirAtalho4();
		/*estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);*/
	}

	voltar = document.createElement("button");
	voltar.setAttribute("id", "btnVoltar3");
	voltar.innerText = "Voltar ao Jogo";
	caixaBotoes.appendChild(voltar);
	voltar.onclick = function(){
		stopTudo();
		paraFala();

		estado = "jogando";
		destruirCamadaAtalhos();
		$("#camadaJogo").toggle();
		setTimeout(update, 50);
	}
}

function ouvirAtalho1(){
	stopTudo();
	paraFala();

	var texto = jogo.dicaPalavra + ". " + tamanhoPalavraSemEspaco() + " letras."
	realizarLeitura(texto);
}

function ouvirAtalho2(){

	stopTudo();
	paraFala();

	var counter;
	audioAtalho2.setAttribute("src", "audio/letra1.mp3");
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
	stopTudo();
	paraFala();


	audioAtalho4.setAttribute("src", "audio/atalho4.mp3");
	var nomeAtalho4;
	var somLetra4 = [];
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
	stopTudo();
	paraFala();

	audioAtalho5.setAttribute("src", "audio/pontos.mp3");
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
	$("#camadaMenu").toggle();
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

	var audioTxt = document.createElement("h1");
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

	var MusicaFundo = document.createElement("button");
	MusicaFundo.setAttribute("id", "MusicaFundo");
	MusicaFundo.innerHTML = "Música de fundo";
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

	var Efeitos = document.createElement("button");
	Efeitos.setAttribute("id", "Efeitos");
	Efeitos.innerHTML = "Efeitos";
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

	var LeituraTela = document.createElement("button");
	LeituraTela.setAttribute("id", "LeituraTela");
	LeituraTela.innerHTML = "Leitura de tela e acessibilidade";
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

	//btnVoltar
	var audioVoltar = document.createElement("button");
	audioVoltar.setAttribute("id", "audioVoltar");
	if(origemAudio == "jogo"){
		audioVoltar.innerHTML = "Voltar às Opções";
	}
	if(origemAudio == "menu"){
		audioVoltar.innerHTML = "Voltar ao Menu";
	}
	caixaBarras.appendChild(audioVoltar);

	//btnContinuar
	audioVoltar.onclick = function(){
		ativarAudioVoltar();
	}
	audioVoltar.onmouseenter = function(){
		opcao = 3;
		audioVoltar.focus();
	}

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
	$("#camadaMenu").toggle();
	$("#camadaAudio").remove();
}

function criarCamadaControleAudio(){
	$("#camadaAudio").toggle();
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

	var controleTxt = document.createElement("h2");
	controleTxt.setAttribute("id", "controleTxt");
	switch(controle){
		case 1:
			volumeInicial = background.volume*10;
			controleTxt.innerHTML = "Música de fundo";
			break;
		case 2:
			volumeInicial = audio2.volume*10;
			controleTxt.innerHTML = "Efeitos";
			break;
		case 3:
			volumeInicial = audio.volume*10;
			controleTxt.innerHTML = "Acessibilidade";
			break;
	}
	divControle.appendChild(controleTxt);

	//Div com as barras de audio
	var caixaBarras = document.createElement("div");
	caixaBarras.setAttribute("id", "caixaBarrasSlider");
	divControle.appendChild(caixaBarras);

	var slider = document.createElement("input");
	slider.setAttribute("type", "range");
	slider.setAttribute("min", "0");
	slider.setAttribute("max", "10");
	slider.setAttribute("value", volumeInicial);
	slider.setAttribute("id", "slider");
	slider.setAttribute("class", "slider");
	caixaBarras.appendChild(slider);
	//Atualiza volume da musica de fundo
	slider.oninput = function(){
		tocaAudio();
		audioTeclas.volume = this.value/10;
		switch(controle){
			case 1:
				background.volume = this.value/10;
				break;
			case 2:
				audio2.volume = this.value/10;
				audio3.volume = this.value/10;
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
	var audioVoltar = document.createElement("button");
	audioVoltar.setAttribute("id", "btnVoltarAudio");
	audioVoltar.innerHTML = "Voltar aos Áudios";
	audioVoltar.onclick = function(){
		destruirCamadaControleAudio();
	}
	divControle.appendChild(audioVoltar);

}

function destruirCamadaControleAudio(){
	$("#camadaAudio").toggle();
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
	$("#palco").append(el);
	el.focus();
	/*Opcoes : ->Continuar
			   ->Áudio
			   ->Instruções
			   ->Menu*/


	//titulo

	var divOpcoes = document.createElement("div");
	divOpcoes.setAttribute("id", "divOpcoes");
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
	var opcoesContinuar = document.createElement("button");
	opcoesContinuar.innerText = "Continuar";
	opcoesContinuar.setAttribute("id", "opcaoContinuar");
	opcoesContinuar.setAttribute("class", "botaoOpcoes");

	//btnAudio
	var opcoesAudio = document.createElement("button");
	opcoesAudio.innerText = "Áudio";
	opcoesAudio.setAttribute("id", "opcaoAudio");
	opcoesAudio.setAttribute("class", "botaoOpcoes");

	//btnIntrucoes
	var opcoesInstrucoes = document.createElement("button");
	opcoesInstrucoes.innerText = "Instruções";
	opcoesInstrucoes.setAttribute("id", "opcaoInstrucoes");
	opcoesInstrucoes.setAttribute("class", "botaoOpcoes");

	//btnMenu
	var opcoesMenu = document.createElement("button");
	opcoesMenu.innerText = "Desistir";
	opcoesMenu.setAttribute("id", "opcaoMenu");
	opcoesMenu.setAttribute("class", "botaoOpcoes");

	//adicionando botões a caixa de botoes
	caixaBotoes.appendChild(opcoesContinuar);
	caixaBotoes.appendChild(opcoesAudio);
	caixaBotoes.appendChild(opcoesInstrucoes);
	caixaBotoes.appendChild(opcoesMenu);

	//Implementação tela de opções navegação pelo mouse

	//btnContinuar
	opcoesContinuar.onclick = function(){
		$("#camadaJogo").toggle();
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
	estado = "instrucoes";
	//$("#camadaJogo").toggle();
	criarCamadaInstrucoes();
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

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
background.volume = 0.1;
var audioTeclas = document.createElement("AUDIO");
audioTeclas.setAttribute("src", "audio/efeitoTeclas.wav");
audioTeclas.volume = 1;
background.loop = true
var origemMenu;
var origemDerrota;
var opcao;
var estado;
var realizaLeitura = false;
var pulouDerrota;
var pulouVitoria;
var audio3 = document.createElement("AUDIO");
audio3.volume = 1;
var origemInstrucoes;
var origemAudio
var sairInstrucoes = false;
var frase;
var mobile = false;



function criarCamadaInicial(){

	//Criação da div da camada
	var element = document.createElement("div");
	element.setAttribute("id", "camadaInicial");


	//textos
	var instrucoesIniciais = document.createElement("p");
	instrucoesIniciais.setAttribute("id", "txtInicio");
	instrucoesIniciais.setAttribute("tabindex", "1");
	instrucoesIniciais.innerHTML = 
	"<h1> Instruções iniciais </h1>" +
	"<h2> Versão Desktop </h2>" +
	"Recomendável desabilitar o seu leitor de tela para melhor experiência." +
	"<h2> Versão Mobile </h2>" + 
	"Habilitar opção de 'talk back' do celular." +
	"<h2> Escolha a versão do jogo. </h2>";

	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoesInicio");

	var btnDesktop = document.createElement("button");
	btnDesktop.setAttribute("id", "btnDesktop");
	btnDesktop.setAttribute("aria-label", "Desktop");
	instrucoesIniciais.setAttribute("tabindex", "2");

	var btnMobile = document.createElement("button");
	btnMobile.setAttribute("id", "btnMobile");
	btnMobile.setAttribute("aria-label", "Mobile");
	instrucoesIniciais.setAttribute("tabindex", "3");

	caixaBotoes.appendChild(btnDesktop);
	caixaBotoes.appendChild(btnMobile);


	pai.appendChild(element);
	$("#camadaInicial").append(instrucoesIniciais);
	$("#camadaInicial").append(caixaBotoes);

	btnDesktop.onclick = function(){
		$("#camadaInicial").remove();
		jogo.palco = new Palco();
		jogo.palco.criar();
		criarCamadaMenu();
	}

	btnMobile.onclick = function(){
		$("#camadaInicial").remove();
		jogo.palco = new Palco();
		jogo.palco.criar();
		var style = document.getElementById("estilo");
		style.setAttribute("href", "./css/mobileStyle.css");
		mobile = true;
		criarCamadaMenu();
	}

}

function criarCamadaMenu()
{	

	paraFala()
	origemAudio = "menu"
	origemInstrucoes = "menu";
	estado = "menu";
	opcao = 0;
	origemDerrota = 0
	background.currentTime = 0;
	background.play();

	if(!mobile){

		var el = document.createElement("div");
		el.setAttribute("id", "camadaMenu");
		el.setAttribute("tabIndex", "0");
		$("#palco").append(el);


		var imgMenu = document.createElement("img");
		imgMenu.setAttribute("id", "imgMenu");
		imgMenu.setAttribute("src", "imgs/desenhotelainicial.png")
		el.appendChild(imgMenu);


		var caixaBotoes = document.createElement("div");
		caixaBotoes.setAttribute("id", "caixaBotoes");
		el.appendChild(caixaBotoes);

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
			botaoInstrucoes.focus();
			opcao = 0;
			clearTimeout(delayInicializaFocus);
		}

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
			botaoJogar.focus();
			opcao = 1;
			clearTimeout(delayInicializaFocus);
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
			botaoCreditos.focus();
			opcao = 2;
			clearTimeout(delayInicializaFocus);
		}

		//Cria botao de opções na caixa de botoes
		var botaoAudio = document.createElement("div");
		botaoAudio.setAttribute("id" , "btnAudio");
		botaoAudio.setAttribute("tabIndex" , "-1");
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
		
		inicializaFalaInicial();
		inicializaFocus();

		$("#camadaMenu").keydown(function (e){
			selecionaOpcao(e);	
		});

	}
	else{

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
		
		origemMenu = 1
	}
	
}


//Funções de ativação dos botões
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
	iniciarNovoJogo();
	criarCamadaJogo();
}

function ativarBotaoSair()
{
	clearTimeout(delayInicializaFocus);
	destruirCamadaVitoria();
	destruirCamadaDerrota();
	destruirCamadaJogo();
	iniciarNovoJogo();
	criarCamadaMenu();
}

function ativarProxPalavra()
{
	clearTimeout(delayInicializaFocus);
	destruirCamadaVitoria();
	criarCamadaJogo();	
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

	var el = document.createElement("div");
	el.setAttribute("id", "camadaJogo");
	$("#palco").append(el);

	iniciar();
	//Toca áudio gravado
	audioQuestao.play();

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

var audioCreditos = document.createElement("AUDIO");
audioCreditos.setAttribute("src", "audio/creditostxt.mp3");
audioCreditos.currentTime = 0

function criarCamadaCreditos()
{

	paraFala();	
	estado = "creditos";

	if(!mobile){

		leituraInicial(baseURL + "creditosCompleto.mp3");
	
		var el = document.createElement("div");
		el.setAttribute("id", "camadaCreditos");
		$("#palco").append(el);
	
		var para = $('<br>').appendTo(el);
		var para = $('<br>').appendTo(el);
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
		colLeft.setAttribute("style", "width: 250px; float: left;  text-align: right;");
		coord.appendChild(colLeft);
	
		var para = document.createElement("p");
		para.innerHTML = "Delano Medeiros Beder";
		colLeft.appendChild(para);
	
		var colRight = document.createElement("div");
		colRight.setAttribute("style", "width: 250px; float: right; text-align: left;");
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
		colLeft.setAttribute("style", "width: 250px; float: left;  text-align: right;");
		equipe.appendChild(colLeft);
	
		var para = document.createElement("p");
		para.innerHTML = "Marcelo Lopes Lotufo";
		colLeft.appendChild(para);
		var para = document.createElement("p");
		para.innerHTML = "Murilo Dell Agnolo Garcia";
		colLeft.appendChild(para);
	
		var colRight = document.createElement("div");
		colRight.setAttribute("style", "width: 250px; float: right; text-align: left;");
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
		colLeft.setAttribute("style", "width: 250px; float: left;  text-align: right;");
		acessibilidade.appendChild(colLeft);
	
		var para = document.createElement("p");
		para.innerHTML = "Caio Vinicius Barbosa Santos";
		colLeft.appendChild(para);
		var para = document.createElement("p");
		para.innerHTML = "Jhonata Nícollas Carvalho Querobim";
		colLeft.appendChild(para);
	
		var colRight = document.createElement("div");
		colRight.setAttribute("style", "width: 250px; float: right; text-align: left;");
		acessibilidade.appendChild(colRight);
	
		var para = document.createElement("p");
		para.innerHTML = "Mariana Zagatti Sabino";
		colRight.appendChild(para);
		var para = document.createElement("p");
		para.innerHTML = "Rogério Augusto Bordini";
		colRight.appendChild(para);
	
		var sairCreditos = document.createElement("h2");
		sairCreditos.innerHTML = "Pressione Enter para voltar ao menu";
		el.appendChild(sairCreditos);
	
		var caixaBotoes = document.createElement("div");
		caixaBotoes.setAttribute("id", "caixaBotoes");
		el.appendChild(caixaBotoes);
	
	
		var botaoMenu = document.createElement("div");
		botaoMenu.setAttribute("id" , "btnMenu2");
		botaoMenu.setAttribute("tabIndex" , "-1");
		botaoMenu.setAttribute("class" , "botao");
		caixaBotoes.appendChild(botaoMenu);
	
		botaoMenu.onmousedown = function()
		{
			destruirCamadaCreditos();
			criarCamadaMenu();
		}
		
		var espera = 1;
		document.onkeydown = function(e)
		{
			e = window.event||e;
			var tecla = e.which || e.keyCode || e.charCode;
			if((tecla == 27 || tecla == 13) && estado == "creditos" && !espera)
			{
				destruirCamadaCreditos();
				criarCamadaMenu();
			}
			if(tecla == 13 && estado == "creditos"){
				espera = !espera;
			}
		}
	}
	else{

		var el = document.createElement("div");
		el.setAttribute("id", "camadaCreditos");
		$("#palco").append(el);


		//Cria grupo de botões
		btnGrupo = document.createElement("div");
		btnGrupo.setAttribute("id", "btnGrupo");

		var botaoMenu = document.createElement("button");
		botaoMenu.setAttribute("id" , "btnVoltar2");
		botaoMenu.innerText = "Voltar ao Menu";
		

		var botaoOuvir = document.createElement("button");
		botaoOuvir.setAttribute("id", "btnOuvir");
		botaoOuvir.innerHTML = "Ouvir Créditos";

		btnGrupo.appendChild(botaoMenu);
		btnGrupo.appendChild(botaoOuvir);
		el.appendChild(btnGrupo);
		
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
		document.getElementById("btnOuvir").focus();
	}
	
}

function destruirCamadaCreditos()
{
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
		leituraInicial(baseURL + "vitoriaFrase.mp3");
	}, 3800);

	var fase;
	var faseId;
	var el = document.createElement("div");
	el.setAttribute("id", "camadaVitoria");
	el.setAttribute("tabIndex", "0");
	$("#palco").append(el);


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


	//criando botao continuar
	jogo.btnContinuar = document.createElement("div");
	jogo.btnContinuar.setAttribute("id", "btnProxPalavra");
	jogo.btnContinuar.setAttribute("tabIndex", "-1");
	
	//criando botao desistir
	jogo.btnDesistir = document.createElement("div");
	jogo.btnDesistir.setAttribute("id", "btnMenu3");
	jogo.btnDesistir.setAttribute("tabIndex", "-1");

	$("#botoesTelaVitoria").append(jogo.btnContinuar);
	$("#botoesTelaVitoria").append(jogo.btnDesistir);
	

	document.getElementById("btnProxPalavra").onclick = function(){
		ativarProxPalavra();
	}

	document.getElementById("btnProxPalavra").onmouseenter = function()
	{
		document.getElementById("btnProxPalavra").focus();
		opcao = 0;
		clearTimeout(delayInicializaFocus);
	}


	document.getElementById("btnMenu3").onclick = function(){
		ativarBotaoSair();
	}

	document.getElementById("btnMenu3").onmouseenter = function()
	{
		document.getElementById("btnMenu3").focus();
		opcao = 1;
		clearTimeout(delayInicializaFocus);
	}

	inicializaFocus();

	$("#camadaVitoria").keydown(function (e){
		if(!mobile)
			selecionaOpcao(e);
	})

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
	var fase;
	var faseId;
	estado = "fimdeJogo";

	sendData(jogo.dicaPalavra,jogo.palavraSorteada,jogo.bd.length-jogo.bdTamanho,'_',jogo.palavraSorteada,true,jogo.bd.length,1,'Forca')
	sendRankingData(jogo.pontos)

	tempo_intermediario2 = new Date()
	sendPlaytimeData((tempo_intermediario2 - tempo_intermediario)/1000,2,'Forca',1,'Forca',jogo.bd.length-jogo.bdTamanho)

	var tempo_final = new Date()
	sendPlaytimeData((tempo_final-tempo_inicial)/1000,0,'Forca',null,null,null)
	sendPlaytimeData((tempo_final-tempo_inicial)/1000,1,'Forca',1,'Forca',null)


	audio3.setAttribute("src", "audio/vitoria2.ogg");
	audio3.currentTime = 0
	vitoria1 = setTimeout(function(){
		audio3.play();
	}, 500);

	audio3.onended = function(){
		if(estado == "fimdeJogo")
			leituraInicial(baseURL + "parabens voce escapou da forca.mp3");
	}

	var el = $('<div>').attr("id", "camadaFimdeJogo").appendTo($("#palco"));


	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("tabIndex", "-1");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = "<h2> Parabéns! Você escapou da forca! </h2> <h4>Pontuação final: " + jogo.pontos + " pontos. </h4>";

	if(!mobile)
		jogo.palavraNaTela.innerHTML += "<p> Aperte a tecla \"ENTER\" para recomeçar o jogo ! </p>";

	jogo.imgBonecoVitoria = document.createElement("img");
	jogo.imgBonecoVitoria.setAttribute("id", "imgBonecoVitoria");
	jogo.imgBonecoVitoria.setAttribute("src", "imgs/imagem parabens.png");

	jogo.botoesVitoria = document.createElement("div");
	jogo.botoesVitoria.setAttribute("id", "botoesTelaVitoria");

	$("#camadaFimdeJogo").append(jogo.imgBonecoVitoria);
	$("#camadaFimdeJogo").append(jogo.palavraNaTela);
	$("#camadaFimdeJogo").append(jogo.botoesVitoria);

	
	inicializaFocus();

	$("<button>").attr("id", "btnProxPalavra").click(
		function(){
			destruirCamadaFimdeJogo();
			criarCamadaMenu();
			iniciarNovoJogo();	
		}
	).appendTo($("#botoesTelaVitoria"));

	document.onkeydown = function(e)
	{
		if(!mobile){
			clearInterval(vitoria1);

			e = window.event||e;
			var tecla = e.which || e.keyCode || e.charCode;
			if(tecla == 13 && estado == "fimdeJogo")
			{
				destruirCamadaFimdeJogo();
				criarCamadaMenu();
				iniciarNovoJogo();
			}
		}
	}
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

function criarCamadaDerrota()
{
	paraFala();
	estado = "derrota";
	opcao = 0;
	pulouDerrota = false;
	origemDerrota = true;

	derrota1 = setTimeout(function(){
		leituraInicial(baseURL + "derrotaFrase.mp3");
	}, 3000);

	audio3.setAttribute("src", "audio/derrota1.ogg");

	setTimeout(function(){
		audio3.play();
	}, 500);

	var el = document.createElement("div");
	el.setAttribute("id", "camadaDerrota");
	el.setAttribute("tabIndex", "0");
	$("#palco").append(el);

		
	jogo.imgBoneco = document.createElement("img");
	jogo.imgBoneco.setAttribute("id", "imgBonecoDerrota");
	jogo.imgBoneco.setAttribute("src", "imgs/bonecoDerrota.png");

	jogo.palavraNaTela = document.createElement("p");
	jogo.palavraNaTela.setAttribute("id", "palavraNaTela");
	jogo.palavraNaTela.setAttribute("role", "textbox");
	jogo.palavraNaTela.innerHTML = "<h2> Você errou :( </h2> A palavra correta é " + jogo.palavraSorteada;
	
	jogo.botoes = document.createElement("div");
	jogo.botoes.setAttribute("id", "botoesFimDeJogo");

	jogo.jogadorPontos = document.createElement("p");
	jogo.jogadorPontos.setAttribute("id", "jogadorPontos");
	jogo.jogadorPontos.innerHTML = "Pontuação final: " + parseInt(jogo.pontos) + " pontos.";


	$("#camadaDerrota").append(jogo.imgBoneco);
	$("#camadaDerrota").append(jogo.palavraNaTela);
	$("#camadaDerrota").append(jogo.jogadorPontos);
	$("#camadaDerrota").append(jogo.botoes);


	//criando botao Reiniciar
	jogo.btnRecomecar = document.createElement("div");
	jogo.btnRecomecar.setAttribute("id", "btnReiniciar");
	jogo.btnRecomecar.setAttribute("tabIndex", "-1");

	//criando botao Desistir
	jogo.btnDesistir = document.createElement("div");
	jogo.btnDesistir.setAttribute("id", "btnMenu3");
	jogo.btnDesistir.setAttribute("tabIndex", "-1");

	$("#botoesFimDeJogo").append(jogo.btnRecomecar);
	$("#botoesFimDeJogo").append(jogo.btnDesistir);
	
	document.getElementById("btnReiniciar").onclick = function(){
		ativarBotaoReiniciar();
	}

	document.getElementById("btnReiniciar").onmouseenter = function()
	{
		document.getElementById("btnReiniciar").focus();
		opcao = 0;
		clearTimeout(delayInicializaFocus);
	}

	document.getElementById("btnMenu3").onclick = function(){
		ativarBotaoSair();
	}

	document.getElementById("btnMenu3").onmouseenter = function()
	{
		document.getElementById("btnMenu3").focus();
		opcao = 1;
		clearTimeout(delayInicializaFocus);
	}

	document.addEventListener("keyup", derrotaMenu);

	inicializaFocus();

	$("#camadaDerrota").keydown(function (e){
		if(!mobile)
			selecionaOpcao(e);	
	})

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

	if(!mobile){
		var espera = 1;
	
		if(origemInstrucoes == "menu")
		{
			leituraInicial(baseURL + "lerinstrucoesCompletas.mp3");
		}
		else if(origemInstrucoes == "opcoes")
		{
			leituraInicial(baseURL + "lerinstrucoesacessibilidade.mp3");
		}
	
	
		//criação camada de instruções
		var el = document.createElement("div");
		el.setAttribute("id", "camadaInstrucoes");
		el.setAttribute("tabIndex", "0");
		$("#palco").append(el);
	
		//conteúdo instruções
		jogo.instrucoes = document.createElement("p")
		jogo.instrucoes.setAttribute("id", "instrucoesText")
		jogo.instrucoes.innerHTML = "<h1>Instruções</h1>";
		if(origemInstrucoes == "menu")
		{
		jogo.instrucoes.innerHTML+= " <h3>Escape da forca acertando todos os desafios!</h3> <br>Para isso, você deve decifrar qual palavra corresponde à dica. <br>"+
		 "Cada letra que você acerta é colocada na palavra. <br>"+
		 "A cada vez que você erra, uma parte do corpo é colocada na forca. <br>Se errar cinco letras da mesma palavra, você perde e tem que recomeçar. <br>"+
		 "A cada palavra que você acerta, você ganha dez pontos; porém, para cada letra que erra, perde um ponto."+
		 "<br>Você pode jogar usando o teclado do jogo ou o seu próprio teclado.<br><br>" +
		 "<h3>Atalhos sonoros durante o jogo:</h3><br>"+
			 "Para usá-los, pressione os números no seu teclado alfanumérico.<br>1 - Ouça a dica<br>"+
			"2 - Ouça o que você descobriu da palavra até agora<br>"+
			"3 - Saiba quantas vidas você ainda tem<br>"+
			"4 - Relembre as letras que você já escolheu<br>"+
			"5 - Saiba sua pontuação atual<br>" + 
			"Esc - Pausar o jogo e acessar as configurações<br>" + 
			"<h4>Pressione \"ENTER\" para voltar ao menu </h4>";
		}
		else
		{
			jogo.instrucoes.innerHTML += 
			"<h3>Atalhos sonoros durante o jogo:</h3><br>"+
			 "Para usá-los, pressione os números no seu teclado alfanumérico.<br>1 - Ouça a dica<br>"+
			"2 - Ouça o que você descobriu da palavra até agora<br>"+
			"3 - Saiba quantas vidas você ainda tem<br>"+
			"4 - Relembre as letras que você já escolheu<br>"+
			"5 - Saiba sua pontuação atual<br>" +
			"Esc - Pausar o jogo e acessar as configurações<br>" + 
			"<h4>Pressione a tecla \"ENTER\" para voltar para as configurações</h4>";
		}	
		 
	
		//inserindo instrucoes a camada de instruções
		$('#camadaInstrucoes').append(jogo.instrucoes);	
	
		var caixaBotoes = document.createElement("div");
		caixaBotoes.setAttribute("id", "caixaBotoes");
		el.appendChild(caixaBotoes);
	
		var botaoMenu = document.createElement("div");
		botaoMenu.setAttribute("id" , "btnMenu2");
		botaoMenu.setAttribute("tabIndex" , "-1");
		botaoMenu.setAttribute("class" , "botao");
		caixaBotoes.append(botaoMenu);
	
	
		botaoMenu.onclick = function()
		{
			destruirCamadaInstrucoes();
			if(origemInstrucoes == "menu")
			{
				criarCamadaMenu();
			}
			else if(origemInstrucoes == "opcoes")
			{
				$("#camadaJogo").toggle();
				criarCamadaOpcoes();
			}
		}
	
	
		document.onkeydown = function(e)
		{
			e = window.event||e;
			var tecla = e.which || e.keyCode || e.charCode;
			if((tecla == 13) && estado == "instrucoes" && !espera)
			{
				destruirCamadaInstrucoes();
				if(origemInstrucoes == "menu")
				{
					criarCamadaMenu();
				}
				else if(origemInstrucoes == "opcoes")
				{
					$("#camadaJogo").toggle();
					criarCamadaOpcoes();
				}
			}
			if(tecla == 13 && estado == "instrucoes"){
				espera = !espera;
			}
		}	
	}
	else{

		var el = document.createElement("div");
		el.setAttribute("id", "camadaInstrucoes");
		$("#palco").append(el);

		//Cria grupo de botões
		btnGrupo = document.createElement("div");
		btnGrupo.setAttribute("id", "btnGrupo");

		var botaoMenu = document.createElement("button");
		botaoMenu.setAttribute("id" , "btnSairInstrucoes");

		var botaoOuvir = document.createElement("button");
		botaoOuvir.setAttribute("id" , "btnOuvir");
		botaoOuvir.innerHTML = "Ouvir Instruções";


		if(origemInstrucoes == "menu"){
			botaoMenu.innerHTML = "Voltar ao Menu";
		}
		else if(origemInstrucoes == "opcoes"){
			botaoMenu.innerHTML = "Voltar ao jogo";
		}

		btnGrupo.appendChild(botaoMenu);
		btnGrupo.appendChild(botaoOuvir);
		el.appendChild(btnGrupo);

		botaoOuvir.onclick = function(){
			leituraInicial(baseURL + "lerinstrucoesMob.mp3");
		}

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

		
		//conteúdo instruções
		jogo.instrucoes = document.createElement("p");
		jogo.instrucoes.setAttribute("id", "instrucoesText")
		jogo.instrucoes.innerHTML = "<h1>Instruções</h1>";
		jogo.instrucoes.innerHTML+= " <h3>Escape da forca acertando todos os desafios!</h3> <p>Para isso, você deve decifrar qual palavra corresponde à dica. </p> "+
		" <p> Cada letra que você acerta é colocada na palavra. </p> "+
		" <p> A cada vez que você erra, uma parte do corpo é colocada na forca. </p><p> Se errar cinco letras da mesma palavra, você perde e tem que recomeçar. </p>"+
		" <p> A cada palavra que você acerta, você ganha dez pontos; porém, para cada letra que erra, perde um ponto. </p>"+
		" <p> Durante o jogo, você poderá acessar o menu de opções para ler as instruções e configurar o áudio através do botão 'Opções' no canto superior esquerdo da tela </p>" +
		" <p> e também poderá acessar informações sobre o status do jogo por meio do botão Status no canto superior direito da tela. </p>";


		//inserindo instrucoes a camada de instruções
		$('#camadaInstrucoes').append(jogo.instrucoes);	

		//setando foco no botão
		document.getElementById("btnOuvir").focus();
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

		case 40: //ArrowDown
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

		case 38: //ArrowUp
			paraFala();
			if(opcao > 0 && !transicaoBarra){
				tocaAudio();
				opcao--;
				setaFoco();
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
	if(!mobile){
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
		}
		else if(estado == "opcoes"){
			document.getElementById("opcaoContinuar").focus();
			leituraInicial(baseURL + "configuracoes.mp3");
		}
		else if(estado == "audio"){
			document.getElementById("MusicaFundo").focus();
			leituraInicial(baseURL + "configuracoes de audio.mp3")
		}
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
			tocarAudioResposta();
		}
		else if(frase == 2){
			var txt = jogo.pontos + "pontos";
			if(!mobile)
				realizarLeituraInicial(txt);
			else
				realizarLeitura(txt);
		}
	}
	else if(estado == "vitoria"){
		if(!mobile)
			tocarAudioResposta();
		else	
			audioResposta.play();
	}
	else if(estado == "audio"){
		if(frase == 1){
			leituraInicial(baseURL + "entrarEnter.mp3");
			frase = 2;
		}
		else if(frase == 2){
			realizarFala(baseURL + "musicaFundo.mp3");
		}
	}
	else if(estado == "fimdeJogo"){
		if(frase == 1){
			leituraInicial(baseURL + "pontuacaoFinal.mp3");
			frase = 2;
		}
		else if(frase == 2){
			var txt = jogo.pontos + "pontos";
			if(!mobile)
				realizarLeituraInicial(txt);
			else
				realizarLeitura(txt);
		}
	}
	else if(estado == "instrucoes"){
		if(!mobile){
			if(origemInstrucoes == "opcoes")
				realizarFala(baseURL + "pressione a tecla enter para voltar a configuracoes.mp3");
			else if(origemInstrucoes == "menu")
				realizarFala(baseURL + "PressioneEnterParaVoltarAoMenu.mp3");
		}
		else{
			realizarFala(baseURL + "instMobile.mp3");
		}
	}
	else if(estado == "creditos"){
		realizarFala(baseURL + "PressioneEnterParaVoltarAoMenu.mp3");
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
				realizarFala(baseURL + "recomeçar.mp3");
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
			}
			else if(opcao == 1){
				document.getElementById("Efeitos").focus();
				realizarFala(baseURL + "efeitos sonoros.mp3");
			}
			else if(opcao == 2){
				document.getElementById("LeituraTela").focus();
				realizarFala(baseURL + "leitura de tela e acessibilidade.mp3");
				
			}
			else if(opcao == 3){
				document.getElementById("btnMenu2").focus();
				audioConfiguracoes.setAttribute("src", "audio/audioGravado/voltar.mp3");
				audioConfiguracoes.currentTime = 0;
				audioConfiguracoes.play();
			}
		break;
	}
}

function inicializaFalaInicial(){
	leituraInicial(baseURL + "bem vindo ao jogo da forca.mp3");
}

function paraDeFalar(){
	window.speechSynthesis.cancel();
	pulouDerrota = true;
	pulouVitoria = true;
}

var transicaoBarra = false;
var audioConfiguracoes = document.createElement("AUDIO");
audioConfiguracoes.volume = 1;
var volumeSinth = 1;

function criarCamadaAudio()
{

	if(!mobile){
		frase = 1;
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
	
		var MusicaFundo = document.createElement("p");
		MusicaFundo.setAttribute("id", "MusicaFundo");
		MusicaFundo.setAttribute("class", "textoAudio");
		MusicaFundo.setAttribute("tabIndex", -1);
		MusicaFundo.innerHTML = "Música de fundo";
		caixaBarras.appendChild(MusicaFundo);
		MusicaFundo.onclick = function(){
			opcao = 0;
		}
	
		var sliderMusicaFundo = document.createElement("input");
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
		}
	
		var Efeitos = document.createElement("p");
		Efeitos.setAttribute("id", "Efeitos");
		Efeitos.setAttribute("class", "textoAudio");
		Efeitos.setAttribute("tabIndex", -1);
		Efeitos.innerHTML = "Efeitos sonoros";
		caixaBarras.appendChild(Efeitos);
		Efeitos.onclick = function(){
			opcao = 1;
		}
	
		var sliderEfeitos = document.createElement("input");
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
		}
	
	
		var LeituraTela = document.createElement("p");
		LeituraTela.setAttribute("id", "LeituraTela");
		LeituraTela.setAttribute("class", "textoAudio");
		LeituraTela.setAttribute("tabIndex", -1);
		LeituraTela.innerHTML = "Leitura de tela";
		caixaBarras.appendChild(LeituraTela);
		LeituraTela.onclick = function(){
			opcao = 2;
		}
	
		var sliderLeituraTela = document.createElement("input");
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
		}
	
		var quebraLinha = document.createElement("br");
		divAudio.appendChild(quebraLinha);
	
		//Cria div caixa de botoes
		var caixaBotoes = document.createElement("div");
		caixaBotoes.setAttribute("id", "caixaBotoesAudio");
		divAudio.appendChild(caixaBotoes);
	
		//btnVoltar
		var audioVoltar = document.createElement("div");
		audioVoltar.setAttribute("id", "btnMenu2");
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
					paraFala();
					estado = "menu";
					opcao = 3;
					document.getElementById("camadaMenu").focus();
					document.getElementById("btnAudio").focus();
				}
			}
		})
	}
	else{
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


		var MusicaFundo = document.createElement("button");
		MusicaFundo.setAttribute("id", "MusicaFundo");
		MusicaFundo.innerHTML = "Música de fundo";
		caixaBarras.appendChild(MusicaFundo);
		MusicaFundo.onclick = function(){
			controle = 1;
			criarCamadaControleAudio();
			opcao = 0;
		}

		var Efeitos = document.createElement("button");
		Efeitos.setAttribute("id", "Efeitos");
		Efeitos.innerHTML = "Efeitos";
		caixaBarras.appendChild(Efeitos);
		Efeitos.onclick = function(){
			controle = 2;
			criarCamadaControleAudio();
			opcao = 1;
		}

		var LeituraTela = document.createElement("button");
		LeituraTela.setAttribute("id", "LeituraTela");
		LeituraTela.innerHTML = "Leitura de tela";
		caixaBarras.appendChild(LeituraTela);
		LeituraTela.onclick = function(){
			controle = 3;
			criarCamadaControleAudio();
			opcao = 2;
		}
			//----------------------------------------- FALAR NIVEL DO VOLUME --------------------------------------

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
		
	}
	
}

function destruirCamadaAudio(){
	$("#camadaAudio").remove();
	if(mobile)
		$("#camadaMenu").toggle();
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
	
	if(!mobile){
		paraFala();
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
	
		var opcoesTxt = document.createElement("p");
		opcoesTxt.setAttribute("id", "opcoesTxt");
		opcoesTxt.innerHTML = "Configurações";
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
	else{
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

		//btnAudio
		opcoesAudio.onclick = function(){
			ativarOpcaoAudio();
		}

		//btnInstrucoes
		opcoesInstrucoes.onclick = function(){
			ativarOpcaoInstrucoes();
		}

		//btnMenu
		opcoesMenu.onclick = function(){
			ativarOpcaoMenu();
		}
	}
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
	if(!mobile)
		$("#camadaJogo").toggle();
	criarCamadaInstrucoes();
}

function ativarOpcaoMenu(){
	destruirCamadaOpcoes();
	destruirCamadaJogo();
	criarCamadaMenu();
}

function tocarAudioResposta(){
	audioResposta.play();
	audioResposta.onended = function(){
		if(estado == "derrota"){
			if(frase == 1){
				leituraInicial(baseURL + "pontuacaoFinal.mp3");
				frase = 2;
			}
			else if(frase == 2){
				realizarFala(baseURL + "recomeçar.mp3");
				frase = 1;
			}
		}
		else if(estado == "vitoria"){
			realizarFala(baseURL + "continuar.mp3");
		}
	}
}

iniciarNovoJogo();
criarCamadaInicial();

//Script para ajustar os elementos na tela desconsiderando address bar dos navegadores mobile
// We listen to the resize event
window.addEventListener('resize', () => {
	// We execute the same script as before
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


//Classe palco
function Palco()
{
	//Precisa usar o this para ser atributo public
	this.criar = function()
	{
		//Cria a variavel palco que irá conter todas as camadas
		var palco = document.createElement("div");
		//Coloca a id no palco
		palco.setAttribute("id", "palco");
		//Coloca palco como filho de body
		pai.appendChild(palco);
	}
	
	this.destruir = function()
	{
		//Pega palco e o remove
		$('#palco').remove();
	}
}

function Botao(_letra, _linha)
{
	var bt = document.createElement("div");
	bt.setAttribute("class", "botaoJogo");
	bt.setAttribute("id", "botao" + _letra);
	document.getElementById("linha" + _linha).appendChild(bt);
	bt.innerHTML = '<p class="letraTeclado">' + _letra;
	bt.onmousedown = function()
	{
		if((jogo.emTransicao == false) && (fimDeJogo() == -1))
		{
			stopTudo();
			verificarErro(_letra);
			colocarLetraEmLetrasTentadas(_letra);	
		}			
	}
}

function Linha(_linha)
{
	var linha = document.createElement("div");
	linha.setAttribute("class", "linha");
	linha.setAttribute("id", "linha" + _linha);
	document.getElementById("botoes").appendChild(linha);
}

//Variáveis de delays
var delayAtalho1;
var delayAtalho2;
var delayAtalho2Aux;
var delayAtalho4;
var delayLetraAtalho4;

var dezenaLer = document.createElement("AUDIO")
var unidadeLer = document.createElement("AUDIO");
var letraE = document.createElement("AUDIO");
var qLetras = document.createElement("AUDIO");
var audioAtalho2 = document.createElement("AUDIO");
var audioAtalho3 = document.createElement("AUDIO");
var audioAtalho4 = document.createElement("AUDIO");
var audioAtalho5 = document.createElement("AUDIO");
var centenaLer = document.createElement("AUDIO");

var stopAtalhos;

//Variaveis para atalhos
var counter = 0;

//1 - Ouvir dica
var nomeAtalho1;

//2 - Status da palavra
audioAtalho2.setAttribute("src", "audio/letra1.mp3");
var nomeAtalho2;
var somLetra2 = [];

//3 - Vidas restantes
var nomeAtalho3 = "audio/vidas";

//4 - Letras já lidas
audioAtalho4.setAttribute("src", "audio/atalho4.mp3");
var nomeAtalho4;
var somLetra4 = [];

//5 - Pontuação
audioAtalho5.setAttribute("src", "audio/pontos.mp3");

document.body.onkeyup = function(e)
{
	if(!mobile){
		
		if(estado != "jogando")
		{
			return false;
		}
	
		var counter = 0
	
		//Pega as teclas
		var e = window.event||e;
		var keyunicode = e.charcode || e.keyCode || e.which;
	
		if(keyunicode >= 112 && keyunicode <= 123)
		{
			return false;
		}
		
		if(keyunicode >= 65 && keyunicode <= 90)
		{
			keyunicode +=32;
		}
	
		//Se o codigo estiver dentro do alfabeto
		if((keyunicode >= 97 && keyunicode <= 122) && (jogo.emTransicao == false) && (fimDeJogo() == -1))
		{		
			//para a leitura de qualquer atalho
			stopTudo();
			//Verifica se deu erro
			verificarErro(String.fromCharCode(keyunicode-32));
			//Coloca nas letras tentadas
			colocarLetraEmLetrasTentadas(String.fromCharCode(keyunicode-32));
		}
		//Tecla para voltar
		if(keyunicode == 27) //Esc
		{
			stopTudo();
			if(!sairInstrucoes)
			{
				criarCamadaOpcoes();
			}
			sairInstrucoes = false;
			setTimeout(update, 50);
		}
		sairInstrucoes = false;
		setTimeout(update, 50);
	}

	//Ouve a dica
	if(keyunicode == 49) //1
	{
		ouvirAtalho1();
	}

	//Lê o status da palavra
	if(keyunicode == 50) //2
	{
		ouvirAtalho2();	
	}

	//Quantas vidas ainda tem
	if(keyunicode == 51) //3
	{
		ouvirAtalho3();
	}

	//Letras já escolhidas
	if(keyunicode == 52) //4
	{
		ouvirAtalho4();	
	}

	//Pontuação atual
	if(keyunicode == 53) //5
	{
		ouvirAtalho5();
	}
	
}

function stopAtalho1()
{
	clearInterval(delayAtalho1);
	window.speechSynthesis.cancel();
}

function stopAtalho2()
{
	clearInterval(delayAtalho2Aux);
	clearInterval(delayAtalho2);
}

function stopAtalho3()
{
	audioAtalho3.pause();
	audioAtalho3.currentTime = 0;
}

function stopAtalho4()
{
	audioAtalho4.pause();
	audioAtalho4.currentTime = 0
	clearTimeout(delayAtalho4);
	clearInterval(delayLetraAtalho4);
}

function stopTudo()
{
	stopAtalho1();
	stopAtalho2();
	stopAtalho3();
	stopAtalho4();
	paraFala();
}

function track(source)
{
	var audio0 = document.createElement("AUDIO");
	audio0.setAttribute("src", source);
	return audio0;
}

var synth = window.speechSynthesis;
var voices = synth.getVoices();

function realizarLeitura(texto)
{
	msg = new SpeechSynthesisUtterance(texto);
	msg.voiceURI = 'Google português do Brasil';
	msg.localService = true;
	msg.volume = volumeSinth;
	msg.rate = 1.3; // 0.1 to 10
	msg.lang = "pt-BR";
	window.speechSynthesis.speak(msg);
}

function realizarLeituraInicial(texto)
{
	//var voices = window.speechSynthesis.getVoices();
	msg = new SpeechSynthesisUtterance(texto);
	msg.volume = volumeSinth; // 0 to 1
	msg.rate = 1.3; // 0.1 to 10
	msg.lang = "pt-BR";
	window.speechSynthesis.speak(msg);

	msg.addEventListener("end", function(){
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
		else if(estado == "fimdeJogo"){
			realizarFala(baseURL + "aperte a tecla enter para recomecar o jogo.mp3");
			frase = 1;
		}
	})
}

function pararLeitura()
{
	window.speechSynthesis.cancel()
}

function ouvirAtalho1(){
	stopTudo();
	realizarFala(baseURL + "dica.mp3");

	
	delayAtalho1 = setTimeout(function(){
		audioQuestao.play();
	}, 500); 
}

function ouvirAtalho2(){

	stopTudo();
	realizarFala(baseURL + "statusDaPalavra.mp3");

	var counter;
	audioAtalho2.setAttribute("src", "audio/letra1.mp3");
	counter = 0;

	delayAtalho2Aux = setTimeout(function(){
		delayAtalho2 = setInterval(palavra, 700);
	}, 1000);


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
			counter++;2
		}
	}
}

function ouvirAtalho3(){
	stopTudo();
	nomeAtalho3 += numeroDeChances();
	
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
		//esvaziando o array
		somLetra4 = [];
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
		delayAtalho4 = setTimeout(function(){
			delayLetraAtalho4 = setInterval(letras, 600);
			function letras()
			{
				if(!somLetra4[counter])
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

function criarCamadaAtalhos()
{	
	estado = "atalho";
	$("#camadaJogo").toggle();
	setTimeout(update, 50);

	var el = document.createElement("div");
	el.setAttribute("id", "camadaAtalhos");
	$("#palco").append(el);
	el.focus();

	var para = document.createElement("h1");
	para.setAttribute("id", "topoAtalhos");
	para.innerHTML = "Atalhos";
	el.appendChild(para);

	var caixaBotoes = document.createElement("div");
	caixaBotoes.setAttribute("id", "caixaBotoesAtalhos")
	el.appendChild(caixaBotoes);

	atalho1 = document.createElement("button");
	atalho1.setAttribute("id", "btnAtalho1");
	atalho1.innerText = "Dica";
	caixaBotoes.appendChild(atalho1);
	atalho1.onclick = function(){
		ouvirAtalho1();
	}

	atalho2 = document.createElement("button");
	atalho2.setAttribute("id", "btnAtalho2");
	atalho2.innerText = "Como está a palavra";
	caixaBotoes.appendChild(atalho2);
	atalho2.onclick = function(){
		ouvirAtalho2();
	}

	atalho3 = document.createElement("button");
	atalho3.setAttribute("id", "btnAtalho3");
	atalho3.innerText = "Número de vidas";
	caixaBotoes.appendChild(atalho3);
	atalho3.onclick = function(){
		ouvirAtalho3();

	}

	atalho4 = document.createElement("button");
	atalho4.setAttribute("id", "btnAtalho4");
	atalho4.innerText = "Letras escolhidas";
	caixaBotoes.appendChild(atalho4);
	atalho4.onclick = function(){
		ouvirAtalho4();
	}

	voltar = document.createElement("button");
	voltar.setAttribute("id", "btnVoltar3");
	voltar.innerText = "Voltar ao Jogo";
	caixaBotoes.appendChild(voltar);
	voltar.onclick = function(){
		destruirCamadaAtalhos();
	}
}

function destruirCamadaAtalhos()
{
	stopTudo();
	estado = "jogando";
	$("#camadaJogo").toggle();
	$("#camadaAtalhos").remove();
	setTimeout(update, 50);
}
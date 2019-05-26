


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
var delayAtalho4;
var delayLetraAtalho4;
var atalho2;

var audioAtalho1 = document.createElement("AUDIO");
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

function stopAtalho1()
{
	window.speechSynthesis.cancel();
}

function stopAtalho2()
{
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
}

function stopTudo()
{
	stopAtalho1();
	stopAtalho2();
	stopAtalho3();
	stopAtalho4();
}

function track(source)
{
	var audio0 = document.createElement("AUDIO");
	audio0.setAttribute("src", source);
	return audio0;
}

function realizarLeitura(texto)
{
	var voices = window.speechSynthesis.getVoices();
	msg = new SpeechSynthesisUtterance(texto);
	msg.volume = volumeSinth;
	msg.rate = 1.3; // 0.1 to 10
	msg.lang = "pt-BR";
	msg.voice = voices[0];
	window.speechSynthesis.speak(msg);

	if(estado == "vitoria"){
		msg.addEventListener("end", function(){
			if(falaVitoria == 2 && !pulouVitoria){
				leituraInicial(baseURL + "pontuacaoFinal.mp3");				
			}
		})
	}
}

function pararLeitura()
{
	window.speechSynthesis.cancel();
	pulouVitoria = true;
}
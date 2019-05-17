//Classe palco
function Palco()
{
	//Precisa usar o this para ser atributo public
	this.criar = function()
	{
		//Cria a variavel palco que irá conter todas as camadas
		var palco = document.createElement("div");

		
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

document.body.onkeyup = function(e)
{
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
		paraFala();
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


	//Variaveis para atalhos
	var counter = 0;

	//1 - Ouvir dica
	var nomeAtalho1;

	//2 - Status da palavra
	audioAtalho2.setAttribute("src", "audio/letra1.mp3");
	var nomeAtalho2;
	var somLetra2 = [];

	//3 - Vidas restantes
	var nomeAtalho3 = "audio/vidas" + numeroDeChances();

	//4 - Letras já lidas
	audioAtalho4.setAttribute("src", "audio/atalho4.mp3");
	var nomeAtalho4;
	var somLetra4 = [];

	//5 - Pontuação
	audioAtalho5.setAttribute("src", "audio/pontos.mp3");

	//Ouve a dica
	if(keyunicode == 49) //1
	{
		stopTudo();
		var texto = jogo.dicaPalavra + ". " + tamanhoPalavraSemEspaco() + " letras."
		realizarLeitura(texto);
	}

	//Lê o status da palavra
	if(keyunicode == 50) //2
	{
		stopTudo();
		paraFala();
		
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

	//Quantas vidas ainda tem
	if(keyunicode == 51) //3
	{
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

	//Letras já escolhidas
	if(keyunicode == 52) //4
	{
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

	//Pontuação atual
	if(keyunicode == 53) //5
	{
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

	//Para todos os atalhos
	if(keyunicode == 54) //6
	{
		stopTudo()
	}
}

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
	clearTimeout(delayAtalho4);
	clearInterval(delayLetraAtalho4);
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

function leituraDica()
{
	var espera
		if(tamanhoPalavraSemEspaco() > 20 && dezena%10!=0){
			var dezena = tamanhoPalavraSemEspaco()%100
			var unidade = dezena%10
			dezena = dezena - unidade
			
			dezena = "audio/p" + dezena  + ".mp3";
			dezenaLer.setAttribute("src", dezena)
			dezenaLer.currentTime = 0;
			dezenaLer.play();
			
			delayAtalho1 = setTimeout(function(){
				letraE.setAttribute("src", "audio/letraE.mp3")
				letraE.currentTime = 0;
				letraE.play();
			}, 500);

			delayAtalho1 = setTimeout(function(){
				unidade = "audio/p" + unidade + ".mp3";
				unidadeLer.setAttribute("src", unidade)
				unidadeLer.currentTime = 0;
				unidadeLer.play();
			}, 700);

			delayAtalho1 = setTimeout(function(){
				qLetras.setAttribute("src", "audio/pletras.mp3")
				qLetras.currentTime = 0;
				qLetras.play();
			}, 1000);
			espera = 1500
		}
		else
		{
			var ler = "audio/p"+tamanhoPalavraSemEspaco() + ".mp3";
			unidadeLer.setAttribute("src", ler);
			unidadeLer.currentTime = 0;
			unidadeLer.play();
			delayAtalho1 = setTimeout(function(){
				qLetras.setAttribute("src", "audio/pletras.mp3")
				qLetras.currentTime = 0;
				qLetras.play();
			}, 600);
			espera = 1500
		}
		delayAtalho1 = setTimeout(function(){
			nomeAtalho1 = "audio/r" + numeroSorteado() + ".mp3"
			audioAtalho1.setAttribute("src", nomeAtalho1)
			audioAtalho1.currentTime = 0
			audioAtalho1.play()
		}, espera);
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
}

function pararLeitura()
{
	window.speechSynthesis.cancel()
}
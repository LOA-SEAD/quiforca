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
var delayLetraAtalho1;
var delayAtalho3;

document.body.onkeyup = function(e)
{
	var counter = 0

	//Pega as teclas
	var e = window.event||e;
	var keyunicode = e.charcode || e.keyCode || e.which;
	
	if(keyunicode >= 65 && keyunicode <= 90)
	{
    	keyunicode +=32;
	}
	
	//Se o codigo estiver dentro do alfabeto
	if((keyunicode >= 97 && keyunicode <= 122) && (jogo.emTransicao == false) && (fimDeJogo() == -1))
	{	
		//Verifica se deu erro
		verificarErro(String.fromCharCode(keyunicode-32));
		//Coloca nas letras tentadas
		colocarLetraEmLetrasTentadas(String.fromCharCode(keyunicode-32));
	}	
	
	//Variaveis para atalhos
	var counter = 0;
	//1 - Letras já lidas
	var audioAtalho1 = document.createElement("AUDIO");
	audioAtalho1.setAttribute("src", "audio/atalho1.mp3");
	//var audioAtalho1 = document.getElementById("atalho1");
	var nomeAtalho1;
	var somLetra1 = [];

	//2 - Vidas restantes
	//var nomeAtalho2 = "vidas" + numeroDeChances();
	//var audioAtalho2 = document.getElementById(nomeAtalho2);
	var nomeAtalho2 = "audio/vidas" + numeroDeChances();
	var audioAtalho2 = document.createElement("AUDIO");

	//3 - Palavra na tela
	var nomeAtalho3;
	var somLetra3 = [];

	//Lista de letras já clicadas 
	if(keyunicode == 52) //Antes era 49 (1) e agora é 52 (4)
	{
		stopAtalho2();
		stopAtalho3();
		clearTimeout(delayAtalho1);
		clearInterval(delayLetraAtalho1);
		counter = 0;
		audioAtalho1.currentTime = 0;
		audioAtalho1.play();
		for(var i = 1; i < tamanhoLetrasTentadas(); i++)
		{
			if(retornaLetrasTentadas(i))
			{
				/*nomeAtalho1 = "letra" + retornaLetrasTentadas(i);
				somLetra1[counter] = document.getElementById(nomeAtalho1);
				counter++;*/
				nomeAtalho1 = "audio/letra" + retornaLetrasTentadas(i) + ".mp3";
				somLetra1.push(track(nomeAtalho1));
			}
		}
		counter = 0;
		delayAtalho1 = setTimeout(function(){
			delayLetraAtalho1 = setInterval(letras, 500);
			function letras()
			{
				if(counter > tamanhoLetrasTentadas())
				{
					clearInterval(delayAtalho1);
				}
				else
				{
					somLetra1[counter].currentTime = 0;
					somLetra1[counter].play();
					counter++;
				}
			}
		}, 2000);
	}

	//Quantas vidas ainda tem
	if(keyunicode == 51) //Antes era 50 (2) e agora é 51 (3)
	{
		stopAtalho1();
		stopAtalho3();
		/*nomeAtalho2 = "vidas" + numeroDeChances();
		audioAtalho2 = document.getElementById(nomeAtalho2);*/
		nomeAtalho2 = "audio/vidas" + numeroDeChances() + ".mp3";
		audioAtalho2.setAttribute("src", nomeAtalho2);
		audioAtalho2.currentTime = 0;
		audioAtalho2.play();
	}

	//Lê o status da palavra
	if(keyunicode == 50) //Antes era 51 (3) e agora é 50 (2)
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho3();
		for(var i = 0; i < tamanhoPalavraAtual(); i++)
		{
			/*nomeAtalho3 = "letra" + palavraAtual(i);
			somLetra3[i] = document.getElementById(nomeAtalho3);*/
			nomeAtalho3 = "audio/letra" + palavraAtual(i) + ".mp3";
			somLetra3.push(track(nomeAtalho3));
		}
		counter = 0;
		delayAtalho3 = setInterval(palavra, 500);
		function palavra()
		{
			if(counter > tamanhoPalavraAtual())
			{
				clearInterval(delayAtalho3);
			}
			else
			{
				somLetra3[counter].currentTime = 0;
				somLetra3[counter].play();
				counter++;
			}
		}
	}

	//Para todos os audios de atalho
	if(keyunicode == 53) //Antes era 52 (4) e agora é 53 (5)
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho3();
	}

	//Ouve a dica
	if(keyunicode == 49) //Antes era 53 (5) e agora é 49 (1)
	{
		var nomeAtalho3 = "audio/r" + numeroSorteado() + ".mp3";
		var audioAtalho5 = document.createElement("AUDIO");
		audioAtalho5.setAttribute("src", nomeAtalho3);
		audioAtalho5.currentTime = 0;
		audioAtalho5.play();
	}

	function stopAtalho1()
	{
		audioAtalho1.pause();
		audioAtalho1.currentTime = 0
		clearTimeout(delayAtalho1);
		clearInterval(delayLetraAtalho1);
	}
	function stopAtalho2()
	{
		audioAtalho2.pause();
		audioAtalho2.currentTime = 0;
	}
	function stopAtalho3()
	{
		clearInterval(delayAtalho3);
	}
}

function track(source)
{
	var audio = document.createElement("AUDIO");
	audio.setAttribute("src", source);
	return audio;
}

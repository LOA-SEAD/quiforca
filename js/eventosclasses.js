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
var delayAtalho2;
var delayAtalho4;
var delayLetraAtalho4;

//Variáveis de audios
var audioAtalho1 = document.createElement("AUDIO");
var audioAtalho3 = document.createElement("AUDIO");
var audioAtalho4 = document.createElement("AUDIO");

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

	//1 - Ouvir dica
	var nomeAtalho1;
	//var audioAtalho1 = document.createElement("AUDIO");

	//2 - Status da palavra
	var nomeAtalho2;
	var somLetra2 = [];

	//3 - Vidas restantes
	//var nomeAtalho3 = "vidas" + numeroDeChances();
	//var audioAtalho3 = document.getElementById(nomeAtalho3);
	var nomeAtalho3 = "audio/vidas" + numeroDeChances();
	//var audioAtalho3 = document.createElement("AUDIO");

	//4 - Letras já lidas
	//var audioAtalho4 = document.createElement("AUDIO");
	audioAtalho4.setAttribute("src", "audio/atalho4.mp3");
	//var audioAtalho4 = document.getElementById("atalho4");
	var nomeAtalho4;
	var somLetra4 = [];

	//1 - Dica
	var dezenaLer = document.createElement("AUDIO")
	var unidadeLer = document.createElement("AUDIO");
	//var audioAtalho5 = document.createElement("AUDIO");
	var letraE = document.createElement("AUDIO");
	var qLetras = document.createElement("AUDIO");

	//Ouve a dica
	if(keyunicode == 49) //1
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho3();
		stopAtalho4();
		stopAtalho5();
		
		if(tamanhoPalavraAtual() > 20 && dezena%10!=0){
			console.log(1)

			dezena = "audio/p" + dezena  + ".mp3";
			dezenaLer.setAttribute("src", dezena)
			dezenaLer.currentTime = 0;
			dezenaLer.play();
			
			delayAtalho1 = setTimeout(function(){
				letraE.setAttribute("src", "audio/letraE.mp3")
				letraE.currentTime = 0;
				letraE.play();
			}, 300);

			delayAtalho1 = setTimeout(function(){
				unidade = "audio/p" + unidade + ".mp3";
				unidadeLer.setAttribute("src", unidade)
				unidadeLer.currentTime = 0;
				unidadeLer.play();
			}, 400);

			delayAtalho1 = setTimeout(function(){
				qLetras.setAttribute("src", "pletras.mp3")
				qLetras.currentTime = 0;
				qLetras.play();
			}, 700);
		}
		else
		{
			var ler = "audio/p"+tamanhoPalavraAtual() + ".mp3";
			unidadeLer.setAttribute("src", ler);
			unidadeLer.currentTime = 0;
			unidadeLer.play();
			console.log(audioAtalho1)
			delayAtalho1 = setTimeout(function(){
				qLetras.setAttribute("src", "audio/pletras.mp3")
				qLetras.currentTime = 0;
				qLetras.play();
				console.log((audioAtalho1.duration+unidadeLer.duration)*1000)
			}, 300);
		}

		delayAtalho1 = setTimeout(function(){
			var nomeAtalho1 = "audio/r" + numeroSorteado() + ".mp3";
			audioAtalho1.setAttribute("src", nomeAtalho1);
			audioAtalho1.currentTime = 0;
			audioAtalho1.play();

			var dezena = tamanhoPalavraAtual()%100;
			var unidade = dezena%10;
			dezena = dezena - unidade;
		}, 1300);
		



		/*nomeAtalho1 = "audio/r" + numeroSorteado() + ".mp3";
		audioAtalho1.setAttribute("src", nomeAtalho1);
		audioAtalho1.currentTime = 0;
		audioAtalho1.play();*/
	}

	//Lê o status da palavra
	if(keyunicode == 50) //2
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho3();
		stopAtalho4();
		stopAtalho5();
		for(var i = 0; i < tamanhoPalavraAtual(); i++)
		{
			/*nomeAtalho2 = "letra" + palavraAtual(i);
			somLetra2[i] = document.getElementById(nomeAtalho2);*/
			nomeAtalho2 = "audio/letra" + palavraAtual(i) + ".mp3";
			somLetra2.push(track(nomeAtalho2));
		}
		counter = 0;
		delayAtalho2 = setInterval(palavra, 500);
		function palavra()
		{
			if(counter > tamanhoPalavraAtual())
			{
				clearInterval(delayAtalho2);
			}
			else
			{
				somLetra2[counter].currentTime = 0;
				somLetra2[counter].play();
				counter++;
			}
		}
	}

	//Quantas vidas ainda tem
	if(keyunicode == 51) //3
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho4();

		/*nomeAtalho3 = "vidas" + numeroDeChances();
		audioAtalho3 = document.getElementById(nomeAtalho3);*/
		nomeAtalho3 = "audio/vidas" + numeroDeChances() + ".mp3";
		audioAtalho3.setAttribute("src", nomeAtalho3);
		audioAtalho3.currentTime = 0;
		audioAtalho3.play();
	}

	//Letras já escolhidas
	if(keyunicode == 52) //4
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho3();
		stopAtalho4();
		stopAtalho5();
		clearTimeout(delayAtalho4);
		clearInterval(delayLetraAtalho4);

		counter = 0;
		audioAtalho4.currentTime = 0;
		audioAtalho4.play();
		for(var i = 1; i < tamanhoLetrasTentadas(); i++)
		{
			if(retornaLetrasTentadas(i))
			{
				/*nomeAtalho4 = "letra" + retornaLetrasTentadas(i);
				somLetra4[counter] = document.getElementById(nomeAtalho4);
				counter++;*/
				nomeAtalho4 = "audio/letra" + retornaLetrasTentadas(i) + ".mp3";
				somLetra4.push(track(nomeAtalho4));
			}
		}
		counter = 0;
		delayAtalho4 = setTimeout(function(){
			delayLetraAtalho4 = setInterval(letras, 500);
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

	//Para todos os audios de atalho
	if(keyunicode == 53) //5
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho3();
		stopAtalho4();
		stopAtalho5();
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

	//Pontuacao
	if(keyunicode == 53) //Antes era 52 (4) e agora é 53 (5)
	{
		stopAtalho1();
		stopAtalho2();
		stopAtalho3();
		stopAtalho4();
		stopAtalho5();
	}

	function stopAtalho1()
	{
		audioAtalho1.pause();
		audioAtalho1.currentTime = 0;
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
	function stopAtalho5()
	{
		
	}
}

function track(source)
{
	var audio = document.createElement("AUDIO");
	audio.setAttribute("src", source);
	return audio;
}

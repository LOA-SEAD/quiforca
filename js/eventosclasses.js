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
var delayAtalho2;
var delayAtalho4;
var delayLetraAtalho4;

var audioAtalho1 = document.createElement("AUDIO");
var dezenaLer = document.createElement("AUDIO")
var unidadeLer = document.createElement("AUDIO");
var letraE = document.createElement("AUDIO");
var qLetras = document.createElement("AUDIO");
var audioAtalho3 = document.createElement("AUDIO");
var audioAtalho4 = document.createElement("AUDIO");
var audioAtalho5 = document.createElement("AUDIO");
var centenaLer = document.createElement("AUDIO");

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
		stopTudo()
		//Verifica se deu erro
		verificarErro(String.fromCharCode(keyunicode-32));
		//Coloca nas letras tentadas
		colocarLetraEmLetrasTentadas(String.fromCharCode(keyunicode-32));
	}

	//Tecla para voltar
	if(keyunicode == 27) //Esc
	{
		stopTudo();
		ativarBotaoVoltar();
	}


	//Variaveis para atalhos
	var counter = 0;

	//1 - Ouvir dica
	var nomeAtalho1;

	//2 - Status da palavra
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
		testeLeitura(texto);
	}

	//Lê o status da palavra
	if(keyunicode == 50) //2
	{
		stopTudo()
		for(var i = 0; i < tamanhoPalavraAtual(); i++)
		{1
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
		stopTudo()
		nomeAtalho3 = "audio/vidas" + numeroDeChances() + ".mp3";
		audioAtalho3.setAttribute("src", nomeAtalho3);
		audioAtalho3.currentTime = 0;
		audioAtalho3.play();
	}

	//Letras já escolhidas
	if(keyunicode == 52) //4
	{
		stopTudo()
		clearTimeout(delayAtalho4);
		clearInterval(delayLetraAtalho4);

		counter = 0;
		audioAtalho4.currentTime = 0;
		audioAtalho4.play();
		for(var i = 1; i < tamanhoLetrasTentadas(); i++)
		{
			if(retornaLetrasTentadas(i))
			{
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

	//Pontuação atual
	if(keyunicode == 53) //5
	{
		var aux
		var centena
		stopTudo()
		audioAtalho5.currentTime = 0
		audioAtalho5.play()

		delayAtalho4 = setTimeout(function(){
			if(pontuacao() <= 20 || (pontuacao() % 10 == 0 && pontuacao() < 100) || (pontuacao() % 100 == 0 && pontuacao() > 100) || pontuacao() == 1000){
				unidade = "audio/p" + pontuacao() + ".mp3"
				unidadeLer.setAttribute("src", unidade)
				unidadeLer.currentTime = 0
				unidadeLer.play()
			}
			else if(pontuacao() <= 99)
			{
				unidade = pontuacao()%10
				dezena = pontuacao() - unidade

				aux = "audio/p" + dezena + ".mp3"
				dezenaLer.setAttribute("src", aux)
				dezenaLer.currentTime = 0
				dezenaLer.play()

				delayAtalho4 = setTimeout(function(){
					letraE.setAttribute("src", "audio/letraE.mp3")
					letraE.currentTime = 0;
					letraE.play();
				}, 600)

				delayAtalho4 = setTimeout(function(){
					aux = "audio/p" + unidade + ".mp3"
					unidadeLer.setAttribute("src", aux)
					unidadeLer.currentTime = 0;
					unidadeLer.play();
				}, 800)
			}
			else if(pontuacao() == 100){
				unidadeLer.setAttribute("src", "audio/pcem.mp3")
				unidadeLer.currentTime = 0
				unidadeLer.play()
			}
			else
			{
				unidade = pontuacao()%10
				dezena = pontuacao()%100 - unidade
				centena = pontuacao() - unidade - dezena

				aux = "audio/p" + centena + ".mp3"
				centenaLer.setAttribute("src", aux)
				centenaLer.currentTime = 0
				centenaLer.play()

				var aux2 = pontuacao() - centena
				if(aux2 >= 20)
				{
					if(dezena != 0){
						delayAtalho4 = setTimeout(function(){
							letraE.setAttribute("src", "audio/letraE.mp3")
							letraE.currentTime = 0;
							letraE.play();
						}, 600)
					}

					delayAtalho4 = setTimeout(function(){
						aux = "audio/p" + dezena + ".mp3"
						dezenaLer.setAttribute("src", aux)
						dezenaLer.currentTime = 0
						dezenaLer.play()
					}, 800)

					if(unidade != 0){
						delayAtalho4 = setTimeout(function(){
							letraE.setAttribute("src", "audio/letraE.mp3")
							letraE.currentTime = 0;
							letraE.play();
						}, 1200)

						delayAtalho4 = setTimeout(function(){
							aux = "audio/p" + unidade + ".mp3"
							unidadeLer.setAttribute("src", aux)
							unidadeLer.currentTime = 0;
							unidadeLer.play();
						}, 1500)
					}
				}
				else
				{
					delayAtalho4 = setTimeout(function(){
						letraE.setAttribute("src", "audio/letraE.mp3")
						letraE.currentTime = 0;
						letraE.play();
					}, 600)
					delayAtalho4 = setTimeout(function(){
						aux = "audio/p" + aux2 + ".mp3"
						unidadeLer.setAttribute("src", aux)
						unidadeLer.currentTime = 0;
						unidadeLer.play();
					}, 800)
				}
			}
		}, 500)
	}

	//Para todos os atalhos
	if(keyunicode == 54) //6
	{
		stopTudo()
	}

	function stopAtalho1()
	{
		window.speechSynthesis.cancel();

		/*audioAtalho1.pause();
		audioAtalho1.currentTime = 0;

		if(tamanhoPalavraSemEspaco() > 20 && dezena%10!=0){
			dezenaLer.pause();
			dezenaLer.currentTime = 0;
			letraE.pause();
			letraE.currentTime = 0;
		}
		unidadeLer.pause();
		unidadeLer.currentTime = 0;
		qLetras.pause();
		qLetras.currentTime = 0;

		clearTimeout(delayAtalho1);*/
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
	function stopTudo()
	{
		stopAtalho1()
		stopAtalho2()
		stopAtalho3()
		stopAtalho4()
		stopAtalho5()
	}
}

function track(source)
{
	var audio = document.createElement("AUDIO");
	audio.setAttribute("src", source);
	return audio;
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

function testeLeitura(texto)
{
	var msg = new SpeechSynthesisUtterance(texto);
	msg = 'ja-JP';
	msg.volume = 1; // 0 to 1
	msg.rate = 1.3; // 0.1 to 10
	window.speechSynthesis.speak(msg);
}
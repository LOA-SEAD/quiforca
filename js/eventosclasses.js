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
	
	//atalhos numéricos

	//lista de letras já clicadas 
	if(keyunicode == 49) //1
	{
		var nomeSom
		var somLetra = []
		var audio = document.getElementById("atalho1"); 
		audio.currentTime = 0
		audio.play()

		setTimeout(function(){
			for(var i = 1; i < tamanhoLetrasTentadas(); i++)
			{
				if(retornaLetrasTentadas(i)){
					nomeSom = "letra" + retornaLetrasTentadas(i)
					somLetra[counter] = document.getElementById(nomeSom)
					setTimeout(tocarLetra,500*counter,somLetra[counter])
					counter++
				}
			}
		}, 2000)
	}

	//quantas vidas ainda tem
	if(keyunicode == 50) //2
	{
		var nomeSom = "vidas" + numeroDeChances()
		var audio = document.getElementById(nomeSom); 
		audio.currentTime = 0
		audio.play()
	}

	//lê as palavras
	if(keyunicode == 51) //3
	{
		var nomeSom
		var somLetra = []
		for(var i = 0; i < tamanhoPalavraAtual(); i++)
		{
			nomeSom = "letra" + palavraAtual(i)
			console.log(nomeSom)
			somLetra[i] = document.getElementById(nomeSom)
			console.log(somLetra[i])
			setTimeout(tocarLetra,500*i,somLetra[i])
		}
	}
}

function tocarLetra(som)
{
	som.currentTime = 0
	som.play()
}

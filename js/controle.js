/*
	O html do jogo é simplesmente um body com uma div chamada "palco"
	Quando a pagina carrega, ela carrega as tags <script> que contém os arquivos de javascript que geram o jogo
	Quando os scripts são carregados é criado uma div "menu" e seu conteudo
	Através das interações com os botões o html é gerado e destruido dinamicamente pelo javscript
	
	O css está sendo usado de maneira mista tanto inline (dentro do html) como por arquivos externos (css)
*/


function criarCamadaMenu()
{	
	var el = document.createElement("div");
	el.setAttribute("id", "camadaMenu");
	$("#palco").append(el);
	
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
	
	botaoJogar.onfocus = function() {		
		adicionarComandosEnterSpace(ativarBotaoJogar, botaoJogar);
	}
	botaoJogar.onblur = function() {		
		removerComandosEnterSpace();
	}	
	botaoJogar.onclick = function()
	{
		ativarBotaoJogar();
	}
	
	var botaoCred = document.createElement("div");
	botaoCred.setAttribute("id" , "btnCreditos");
	botaoCred.setAttribute("tabIndex" , "0");
	botaoCred.setAttribute("role" , "button");
	botaoCred.setAttribute("aria-label" , "Créditos");
	botaoCred.setAttribute("class" , "botao");
	caixaBotoes.appendChild(botaoCred);	
	
	botaoCred.onfocus = function() {		
		adicionarComandosEnterSpace(ativarBotaoCreditos, botaoCred);
	}
	botaoCred.onblur = function() {		
		removerComandosEnterSpace();
	}	
	botaoCred.onclick = function()
	{
		ativarBotaoCreditos();
	}
}

function ativarBotaoJogar()
{
	destruirCamadaMenu();
	criarCamadaJogo();
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
	var el = document.createElement("div");
	el.setAttribute("id", "camadaJogo");
	$("#palco").append(el);
	
	iniciar();
}

function destruirCamadaJogo()
{
	$("#camadaJogo").remove();
}

function criarCamadaCreditos()
{
	var el = document.createElement("div");
	el.setAttribute("id", "camadaCreditos");
	$("#palco").append(el);	


	var para = $('<br>').appendTo(el);		
	var para = $('<br>').appendTo(el);	
	var para = $('<br>').appendTo(el);	
	var para = $('<br>').appendTo(el);	
	var para = $('<br>').appendTo(el);	
	
	var para = document.createElement("p");
	para.innerHTML = "Equipe";
	el.appendChild(para);	
	
	var para = document.createElement("br");
	el.appendChild(para);
	var para = document.createElement("br");
	el.appendChild(para);
	
	var colLeft = document.createElement("div");
	colLeft.setAttribute("style", "width: 250px; float: left;  text-align: center;");
	el.appendChild(colLeft);
	
	var para = document.createElement("p");
	para.innerHTML = "Marcelo";
	colLeft.appendChild(para);
	
	var para = document.createElement("p");
	para.innerHTML = "Murilo";
	colLeft.appendChild(para);
	
	var para = document.createElement("p");
	para.innerHTML = "Valério";
	colLeft.appendChild(para);
	
	var para = document.createElement("p");
	para.innerHTML = "Henrique";
	colLeft.appendChild(para);
	
	var colRight = document.createElement("div");
	colRight.setAttribute("style", "width: 250px; float: right; text-align: center;");
	el.appendChild(colRight);
	
	var para = document.createElement("p");
	para.innerHTML = "Katia";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Rafaela";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Diana";
	colRight.appendChild(para);
	var para = document.createElement("p");
	para.innerHTML = "Catarine";
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
	var el = $('<div>').attr("id", "camadaVitoria").appendTo($("#palco"));	
	if((jogo.bdTamanho) == 0) {
          $('<p>').attr('id', 'pontosNaTela')
              .html('Pontos: ' + parseInt(jogo.pontos))
              .appendTo($('#camadaVitoria'));
	}
	$('<div>').css({
					'position': 'absolute',
					'width': '800px',
					'height': '600px',
					'background-image': 'url("imgs/vitoria.png")'})
			.click(function(){
        if(jogo.bdTamanho != 0) {
            destruirCamadaVitoria();
            criarCamadaJogo();
        }
        else
        {
            destruirCamadaVitoria();            
            criarCamadaMenu();
            iniciarNovoJogo();
        }
            
             
			})
			.appendTo(el);
	
}

function destruirCamadaVitoria()
{
	$("#camadaVitoria").remove();
}

function criarCamadaDerrota()
{
	iniciarNovoJogo();
	
	$('<div>').attr('id', 'camadaDerrota')
				.css({
					'width': '800px',
					'height': '600px',
					'position': 'absolute',
					'top': '0px',})
				.click(function(){
					destruirCamadaDerrota();
					destruirCamadaJogo();
					criarCamadaMenu();
				})
				.appendTo($('#palco'));
}

function destruirCamadaDerrota()
{
	$("#camadaDerrota").remove();
}


jogo.palco = new Palco();
jogo.palco.criar();
iniciarNovoJogo();
criarCamadaMenu();

$(document).ready(
function() {
	var $formDiv = $('#form-div');
	var $formGroup = $('.form-group');
	var $formCategoria = $('#form-categoria');
	var $helpBlockSpam = $('span.help-block');
	var $inputNome = $('#input-nome');
	var $inputPreco = $('#input-preco');
	var $inputTipo = $('#input-tipo');
	var $tabelaCategoria = $('#tabela-categoria');
	$formDiv.hide();
	$('#mostrar-form-botao').click(function() {
		$formDiv.fadeToggle();
	});
	function limparMensagensDeErro() {
		$formGroup.removeClass('has-error');
		$helpBlockSpam.text('');
	}
	function mostrarErros(erros) {
		var spanHelpPrefixo = '#span-help-';
		var formGroupPrefixo = '#form-group-';
		$.each(erros, function(propriedade, msg) {
			$(spanHelpPrefixo + propriedade).text(msg);
			$(formGroupPrefixo + propriedade).addClass(
					'has-error');
		});
	}
	function adicionarCategoria(categoria) {
		var linhaTabela = '<tr>';
		linhaTabela += '<td>' + categoria.id + '</td>';
		linhaTabela += '<td>' + categoria.creation + '</td>';
		linhaTabela += '<td>' + categoria.nome + '</td>';
		linhaTabela += '<td>' + categoria.tipo + '</td>';
		linhaTabela += '<td>' + categoria.preco + '</td>';
		linhaTabela += '<td>';
		linhaTabela += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button>';
		linhaTabela += '</td></tr>';
		var $linha = $(linhaTabela);
		$linha.find('button').click(
				function() {
					console.log('Apagando categoria com id '
							+ categoria.id);
					$linha.remove();
				});
		$tabelaCategoria.prepend($linha);
		$inputNome.val('');
		$inputTipo.val('');
		$inputPreco.val('');
	}
	function listarCategorias(categorias) {
		$.each(categorias, function(index, cat) {
			adicionarCategoria(cat);
		})
	}
	var addID = (function () {
	    var counter = 5;
	    return function () {return counter += 1;}
	})();
	
	var categorias = [ {
		"nome" : "Café Simples",
		"id" : 1,
		"creation" : "13/9/2015",
		"preco" : "3,40",
		"tipo" : "Pequeno"
	}, {
		"nome" : "Café Expresso",
		"id" : 2,
		"creation" : "13/9/2015",
		"preco" : "5,60",
		"tipo" : "Médio"
	}, {
		"nome" : "Café com chocolate",
		"id" : 3,
		"creation" : "13/9/2015",
		"preco" : "8,50",
		"tipo" : "Pequeno"
	}, {
		"nome" : "Achocolatado",
		"id" : 4,
		"creation" : "13/9/2015",
		"preco" : "6,50",
		"tipo" : "Grande"
	},{
		"nome" : "Café com leite",
		"id" : 5,
		"creation" : "13/9/2015",
		"preco" : "4,30",
		"tipo" : "Pequeno"
	}];
	listarCategorias(categorias);
	$formCategoria.submit(function(evento) {
		evento.preventDefault();
		limparMensagensDeErro();
		var hasError = false;
		var jsonErros = {};
		var nome = $inputNome.val();
		var tipo = $inputTipo.val();
		var preco = $inputPreco.val();
		if (nome === '') {
			jsonErros.nome = 'Campo Obrigatório';
			hasError = true;
		}
		if (tipo === ''){
			jsonErros.tipo = 'Campo Obrigatório';
			hasError = true;
		}
		if (preco === ''){
			jsonErros.preco = 'Campo Obrigatório';
			hasError = true;
		}
		if(!hasError) {
			var d = new Date();
			var curr_date = d.getDate();
			var curr_month = d.getMonth() + 1;
		    var curr_year = d.getFullYear();
			adicionarCategoria({
				"nome" : nome,
				"id" : addID(),
				"creation" : curr_date + "/" + curr_month + "/" + curr_year,
				"preco" : preco,
				"tipo" : tipo
			})
		}else{
			mostrarErros(jsonErros);
		}
	});
});


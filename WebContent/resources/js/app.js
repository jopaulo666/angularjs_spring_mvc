var app = angular.module('loja', [ 'ngRoute', 'ngResource', 'ngAnimate' ]);

app.config(function($routeProvider, $provide, $httpProvider, $locationProvider) {
	// -----------cliente-----------------
	$routeProvider.when("/clientelist", {
		controller: "clienteController",
		templateUrl: "cliente/list.html"
	})// listar
	.when("/clienteedit/:id", {
		controller: "clienteController",
		templateUrl: "cliente/cadastro.html"
	})// editar
	.when("/cliente/cadastro", {
		controller: "clienteController",
		templateUrl: "cliente/cadastro.html"
	})// novo

	// ------------fornecedor-----------------
	$routeProvider.when("/fornecedorlist", {
		controller: "fornecedorController",
		templateUrl: "fornecedor/list.html"
	})// listar
	.when("/fornecedoredit/:id", {
		controller: "fornecedorController",
		templateUrl: "fornecedor/cadastro.html"
	})// editar
	.when("/fornecedor/cadastro", {
		controller: "fornecedorController",
		templateUrl: "fornecedor/cadastro.html"
	})// novo
	
	// ------------livro-----------------
	$routeProvider.when("/livrolist", {
		controller: "livroController",
		templateUrl: "livro/list.html"
	})// listar
	.when("/livroedit/:id", {
		controller: "livroController",
		templateUrl: "livro/cadastro.html"
	})// editar
	.when("/livro/cadastro", {
		controller: "livroController",
		templateUrl: "livro/cadastro.html"
	})// novo
	
	// -----------loja-------------------
	.when("/loja/online", {
		controller: "lojaController",
		templateUrl: "loja/online.html"
	})
	.when("/loja/itensLoja/:itens", {
		controller: "lojaController",
		templateUrl: "loja/itensLoja.html"
	})
	
	.otherwise({
		redirectTo: "/"
	});
});

// configurações da loja de livros
app.controller("lojaController", function($scope, $http, $location, $routeParams) {
	
	//---------Pesquisar cliente----------
	$scope.buscarClienteNome = function () {
		$http.get("cliente/buscarnome/" + $scope.filtroCliente).success(function(response) {
			$scope.clientesPesquisa = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
	//---------Adicionar cliente----------
	$scope.adicionarClienteCarrinho = function (cliente) {
		$scope.pedidoObjeto.cliente = cliente;
		$scope.clienteAdiconado = cliente;
		$scope.clientesPesquisa = {};
		$scope.filtroCliente = "";
	};
	
if ($routeParams.itens != null && $routeParams.itens.length > 0){
		
		$http.get("itempedido/processar/"+ $routeParams.itens).success(function(response) {
			
			$scope.itensCarrinho = response;
			$scope.pedidoObjeto = response[0].pedido;
			
		}).error(function(response) {
			erro("Error: " + response);
		});
		
	}else {
		$scope.carrinhoLivro = new Array();
	}
	
	$scope.addLivro = function (livroid) {
		$scope.carrinhoLivro.push(livroid);
		
	};
	
	// -----------------------------------------------------
	$scope.recalculo = function (quantidade, livro) {
		var valorTotal = new Number();
		for (var i = 0; i < $scope.itensCarrinho.length; i++){
				var valorLivro = $scope.itensCarrinho[i].livro.valor.replace("R","").replace("$", "")
					.replace(".","").replace(",", ".");
				if ($scope.itensCarrinho[i].livro.id == livro){
					valorTotal += parseFloat(valorLivro * quantidade);
				}else {
					valorTotal += parseFloat(valorLivro * $scope.itensCarrinho[i].quantidade);
				}
				
		}
		 $scope.pedidoObjeto.valorTotal = 'R$ ' + valorTotal.toString();
	};
	
	// ------------------------------------------------------
$scope.removerLivroCarrinho = function (livroid) {
		
		$scope.itensTemp = new Array();
		var valorTotal = new Number();
		for (var i = 0; i < $scope.itensCarrinho.length; i++){
			if ($scope.itensCarrinho[i].livro.id === livroid){
			}else {
				// itens validos
				$scope.itensTemp.push($scope.itensCarrinho[i]);
				
				var valorLivro = $scope.itensCarrinho[i].livro.valor.replace("R","").replace("$", "").replace(".","").replace(",", ".");
				valorTotal += parseFloat(valorTotal) + parseFloat(valorLivro * $scope.itensCarrinho[i].quantidade);
				
			};
		}
		 $scope.pedidoObjeto.valorTotal = 'R$ ' + valorTotal.toString();
		 $scope.itensCarrinho = $scope.itensTemp;
	};
	// --------------------------------------------------------
	$scope.fecharPedido = function() {
		$location.path('loja/itensLoja/' + $scope.carrinhoLivro);
	};
	
	// lista todos os livros
	$scope.listarLivros = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("livro/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			
			//---------Inicio total p�gina----------
				$http.get("livro/totalPagina").success(function(response) {
					$scope.totalPagina = response;
				}).error(function(response) {
					erro("Error: " + response);
				});
			//---------Fim total p�gina----------
			
		}).error(function(response) {
			erro("Error: " + response);
		});
		
	};
	
	$scope.proximo = function() {
		if(new Number($scope.numeroPagina) < Number($scope.totalPagina)){
			$scope.listarLivros(new Number($scope.numeroPagina + 1))
		}
	};
	
	$scope.anterior = function() {
		if(new Number($scope.numeroPagina) > 1){
			$scope.listarLivros(new Number($scope.numeroPagina - 1));
		}
	};
});

// configurações do controller de Fornecedor
app.controller("fornecedorController", function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		// editar
		$http.get("fornecedor/buscarfornecedor/" + $routeParams.id).success(function(response) {
			$scope.fornecedor = response;
			document.getElementById("imagemFornecedor").src = $scope.fornecedor.foto; // carrega
																						// img
			// ------------------ carrega estados e cidades do fornecedor em
			// edição
			setTimeout(function () {
				$("#selectEstados").prop('selectedIndex', (new Number($scope.fornecedor.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.fornecedor.estados.id).success(function(response) {
					$scope.cidades = response;
					setTimeout(function () {
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.fornecedor.cidades.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
			}, 1000);
			// ----------------------
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	} else {
		// novo
		$scope.fornecedor = {};
	}
	
	$scope.editarFornecedor = function(id) {
		$location.path('fornecedoredit/' + id);
	};
	
	$scope.fornecedor = {};
	
	$scope.salvarFornecedor = function () {
		$scope.fornecedor.foto = document.getElementById("imagemFornecedor").getAttribute("src");
		
		$http.post("fornecedor/salvar", $scope.fornecedor).success(function(response) {
			$scope.fornecedor = {}; // limpa a tela e inicia um novo fornecedor
			document.getElementById("imagemFornecedor").src = ''; // limpa a
																	// imagem
			sucesso("Fornecedor salvo com sucesso!");
		}).error(function(data, status, headers, config) {
			erro("Erro" + response);
		});
	};
	
	// lista todos os fornecedor
	$scope.listarFornecedor = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("fornecedor/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			// ---------Inicio total página----------
			$http.get("fornecedor/totalPagina").success(function(response) {
				$scope.totalPagina = response;
			}).error(function(response) {
				erro("Error: " + response);
			});
			// ---------Fim total página----------
		}).error(function(response) {
			erro("Erro" + response);
		});
	};
	
	$scope.proximo = function() {
		if(new Number($scope.numeroPagina) < Number($scope.totalPagina)){
			$scope.listarFornecedor(new Number($scope.numeroPagina + 1))
		}
	};
	
	$scope.anterior = function() {
		if(new Number($scope.numeroPagina) > 1){
			$scope.listarFornecedor(new Number($scope.numeroPagina - 1));
		}
	};
	
	// deleta fornecedor
	$scope.removerFornecedor = function(codFornecedor) {
		$http.delete("fornecedor/deletar/" + codFornecedor).success(function(response) {
			$scope.listarFornecedor($scope.numeroPagina);
			sucesso("Fornecedor removido com sucesso!");
		}).error(function(data, status, headers, config) { 
			erro("Error: " + status);
		});
	};
	
	// carrega as cidades de acordo com o estado passado por parâmetro
	$scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome'){
			$http.get("cidades/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(response) {
				erro("Erro" + response);
			});
		}
	};
	
	$scope.carregarEstados = function() {
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response) {
			$scope.dataEstados = response;
		}).error(function(response) {
			erro("Erro" + response);
		});
	};
});

// configurações do controller de Livro
app.controller("livroController", function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		// editar
		$http.get("livro/buscarlivro/" + $routeParams.id).success(function(response) {
			$scope.livro = response;
			
			document.getElementById("imagemLivro").src = $scope.livro.foto; // carrega
																			// img
			// ------------------ carrega forncedores do livro em edição
				$http.get("fornecedor/listartodos").success(function(response) {
					$scope.fornecedoreslist = response;
					setTimeout(function () {
						$("#selectFornecedor").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.livro.fornecedor.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
			// ----------------------
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	} else {
		// novo
		$scope.livro = {};
	}
	
	$scope.editarLivro = function(id) {
		$location.path('livroedit/' + id);
	};
	
	$scope.livro = {};
	
	// salva ou edita livros
	$scope.salvarLivro = function () {
		$scope.livro.foto = document.getElementById("imagemLivro").getAttribute("src");
		
		$http.post("livro/salvar", $scope.livro).success(function(response) {
			$scope.livro = {}; // limpa a tela e inicia um novo livro
			document.getElementById("imagemLivro").src = ''; // limpa a
																// imagem
			sucesso("Livro salvo com sucesso!");
		}).error(function(data, status, headers, config) {
			erro("Erro" + response);
		});
	};
	
	// lista todos os livros
	$scope.listarLivros = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("livro/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			// ---------Inicio total página----------
			$http.get("livro/totalPagina").success(function(response) {
				$scope.totalPagina = response;
			}).error(function(response) {
				erro("Error: " + response);
			});
			// ---------Fim total página----------
		}).error(function(response) {
			erro("Erro" + response);
		});
	};
	
	$scope.proximo = function() {
		if(new Number($scope.numeroPagina) < Number($scope.totalPagina)){
			$scope.listarLivros(new Number($scope.numeroPagina + 1))
		}
	};
	
	$scope.anterior = function() {
		if(new Number($scope.numeroPagina) > 1){
			$scope.listarLivros(new Number($scope.numeroPagina - 1));
		}
	};
	
	// deleta livro
	$scope.removerLivro = function(codLivro) {
		$http.delete("livro/deletar/" + codLivro).success(function(response) {
			$scope.listarLivros($scope.numeroPagina);
			sucesso("Livro removido com sucesso!");
		}).error(function(data, status, headers, config) { 
			erro("Error: " + status);
		});
	};
	
	$scope.listarFornecedores = function() {
		$http.get("fornecedor/listartodos").success(function(response) {
			$scope.fornecedoresList = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	}
});

// configurações do controller de Cliente
app.controller("clienteController", function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		// editar
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response) {
			$scope.cliente = response;
			document.getElementById("imagemCliente").src = $scope.cliente.foto; // carrega
																				// img
			// ------------------ carrega estados e cidades do cliente em edição
			setTimeout(function () {
				$("#selectEstados").prop('selectedIndex', (new Number($scope.cliente.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.cliente.estados.id).success(function(response) {
					$scope.cidades = response;
					setTimeout(function () {
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.cliente.cidades.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
			}, 1000);
			// ----------------------
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	} else {
		// novo
		$scope.cliente = {};
	}
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	};
	
	$scope.cliente = {};
	
	$scope.salvarCliente = function () {
		$scope.cliente.foto = document.getElementById("imagemCliente").getAttribute("src");
		
		$http.post("cliente/salvar", $scope.cliente).success(function(response) {
			$scope.cliente = {}; // limpa a tela e inicia um novo cliente
			document.getElementById("imagemCliente").src = ''; // limpa a
																// imagem
			sucesso("Cliente salvo com sucesso!");
		}).error(function(data, status, headers, config) {
			erro("Erro" + response);
		});
	};
	
	// lista todos os clientes
	$scope.listarClientes = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("cliente/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			// ---------Inicio total página----------
			$http.get("cliente/totalPagina").success(function(response) {
				$scope.totalPagina = response;
			}).error(function(response) {
				erro("Error: " + response);
			});
			// ---------Fim total página----------
		}).error(function(response) {
			erro("Erro" + response);
		});
	};
	
	$scope.proximo = function() {
		if(new Number($scope.numeroPagina) < Number($scope.totalPagina)){
			$scope.listarClientes(new Number($scope.numeroPagina + 1))
		}
	};
	
	$scope.anterior = function() {
		if(new Number($scope.numeroPagina) > 1){
			$scope.listarClientes(new Number($scope.numeroPagina - 1));
		}
	};
	
	// deleta cliente
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).success(function(response) {
			$scope.listarClientes($scope.numeroPagina);
			sucesso("Cliente removido com sucesso!");
		}).error(function(data, status, headers, config) { 
			erro("Error: " + status);
		});
	};
	
	// carrega as cidades de acordo com o estado passado por parâmetro
	$scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome'){
			$http.get("cidades/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(response) {
				erro("Erro" + response);
			});
		}
	};
	
	$scope.carregarEstados = function() {
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response) {
			$scope.dataEstados = response;
		}).error(function(response) {
			erro("Erro" + response);
		});
	};
});

function sucesso(msg) {
	$.notify({
		message: msg
	},{
	    type: 'success',
	    timer: 1000
	});
};

function erro(msg) {
	$.notify({
		message: msg
	},{
	    type: 'danger',
	    timer: 1000
	});
};

// faz a identificação da ṕosição correta da cidade do registro para mostrar
// edição
function buscarKeyJson(obj, key, value) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i][key] == value) {
			return i + 2;
		}
	}
	return null;
}

// carregar cidades quando é navegador chrome usando jQuery
function carregarCidadesChrome(estado) {
	if (identific_nav() === 'chrome') {// executa se for chrome
		$.get("cidades/listarchrome", { idEstado : estado.value}, function(data) {
			 var json = JSON.parse(data);
			 html = '<option value="">--Selecione--</option>';
			 for (var i = 0; i < json.length; i++) {
				  html += '<option value='+json[i].id+'>'+json[i].nome+'</option>';
			 }
			 $('#selectCidades').html(html);
		});
  }
}

// add imagem ao campo html img
function visualizarImg() {
	var preview = document.querySelectorAll('img').item(1);
	var file = document.querySelector('input[type=file]').files[0]; // pega a
																	// img
																	// selecionada
	var reader = new FileReader();
	
	reader.onloadend = function() {
		preview.src = reader.result; // carrega em base64 a img
	};
	
	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}

// identificar navegador
function identific_nav(){
    var nav = navigator.userAgent.toLowerCase();
    if(nav.indexOf("msie") != -1){
       return browser = "msie";
    }else if(nav.indexOf("opera") != -1){
    	return browser = "opera";
    }else if(nav.indexOf("mozilla") != -1){
        if(nav.indexOf("firefox") != -1){
        	return  browser = "firefox";
        }else if(nav.indexOf("firefox") != -1){
        	return browser = "mozilla";
        }else if(nav.indexOf("chrome") != -1){
        	return browser = "chrome";
        }
    }else{
    	alert("Navegador desconhecido!");
    }
}

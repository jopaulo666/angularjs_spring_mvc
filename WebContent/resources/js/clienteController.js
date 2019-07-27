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
			
			if (response == null || response == '') {
				$scope.ocultarNavegacao = true;
			} else {
				$scope.ocultarNavegacao = false;
			}
			
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
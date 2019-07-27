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
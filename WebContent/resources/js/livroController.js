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
	var app = angular.module('loja', [ 'ngRoute', 'ngResource', 'ngAnimate' ]);

app.config(function($routeProvider, $provide, $httpProvider, $locationProvider) {
	$routeProvider.when("/clientelist", {
		controller: "clienteController",
		templateUrl: "cliente/list.html"
	})//listar
	.when("/clienteedit/:id", {
		controller: "clienteController",
		templateUrl: "cliente/cadastro.html"
	})//editar
	.when("/cliente/cadastro", {
		controller: "clienteController",
		templateUrl: "cliente/cadastro.html"
	})//novo
	.otherwise({
		redirectTo: "/"
	});
});

app.controller("clienteController", function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		//editar
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response) {
			$scope.cliente = response;
		}).error(function(data, status, headers, config) {
			alert("Error: " + status);
		});
	} else {
		//novo
		$scope.cliente = {};
	}
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	};
	
	$scope.cliente = {};
	
	$scope.salvarCliente = function () {		
		$http.post("cliente/salvar", $scope.cliente).success(function(response) {
			$scope.cliente = {}; // limpa a tela e inicia um novo cliente
		}).error(function(data, status, headers, config) {
			alert("Erro" + response);
		});
	};
	
	$scope.listarClientes = function() {
		$http.get("cliente/listar").success(function(response) {
			$scope.data = response;
		}).error(function(response) {
			alert("Erro" + response);
		});
	};
	
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).success(function(response) {
			$scope.listarClientes();
		}).error(function(data, status, headers, config) {
			alert("Error: " + status);
		});
	};
});

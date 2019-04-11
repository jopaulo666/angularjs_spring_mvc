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
			erro("Error: " + status);
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
			sucesso("Cliente salvo!");
		}).error(function(data, status, headers, config) {
			erro("Erro" + response);
		});
	};
	
	$scope.listarClientes = function() {
		$http.get("cliente/listar").success(function(response) {
			$scope.data = response;
		}).error(function(response) {
			erro("Erro" + response);
		});
	};
	
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).success(function(response) {
			$scope.listarClientes();
			sucesso("Cliente deletado!");
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
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

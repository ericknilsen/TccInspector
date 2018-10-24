var app = angular.module('EmpregadoApp', []);

app.controller('EmpregadoController', function($scope, $http) {    

    var API = 'http://localhost:3000/empregados'
    //var API = 'http://localhost/api/'


    $scope.empregado = {};   
    $scope.empregados = [];      
    
    $scope.adicionar = function() {                      
        
        $http.post(API, $scope.empregado).success(
                function(dados) {                                       
                    $scope.listar();    
                    $scope.empregado = {};            
                }
            ).error(function(data,status,headers,config) {            
                console.log("Erro ao inserir recurso");        
            });
    };

    $scope.remover = function(id) {                      
        $http.delete(API+'/'+id).success(
                function(dados) {                                       
                    $scope.listar();                   
                }
            ).error(function(data,status,headers,config) {            
                console.log("Erro ao listar recurso");        
            });
    };

    
    $scope.listar = function() {       
        $http.get(API).success(
                function(dados) {                                       
                     $scope.empregados = dados;                     
                }
            ).error(function(data,status,headers,config) {            
                console.log("Erro ao listar recurso");        
            });
    };
    
    $scope.listar();
   
    
});
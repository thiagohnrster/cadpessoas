/*
 * @Author: Thiago
 * @Date:   2020-07-29 17:01:46
 * @Last Modified by:   Thiago
 * @Last Modified time: 2020-07-29 17:07:03
 */
angular.module('listaPessoas', []).controller('ListaPessoas', function($rootScope, $scope, $http) {
    $scope.tpTitulo = 'Lista de Pessoas';

    $rootScope.carregarPessoas = function() {
        $rootScope.exibirFormInclusao = false;
        $rootScope.btnCarrgarPessoasText = 'Carregando...'
        $rootScope.carregandoPessoas = true;
        $rootScope.listaPessoas = [];

        $http({
            url: 'pessoas.json',
            method: 'GET'
        }).then(function(resposta) {
            $rootScope.listaPessoas = resposta.data;
        }, function(resposta) {
            alert('Aconteceu um erro!');
        }).finally(function() {
            $rootScope.btnCarrgarPessoasText = 'Carregar Pessoas';
            $rootScope.carregandoPessoas = false;
        });
    };
});
/*
 * @Author: Thiago
 * @Date:   2020-07-22 16:38:31
 * @Last Modified by:   Thiago
 * @Last Modified time: 2020-07-25 01:39:26
 */
angular.module('app', [])
    .controller('cadPessoas', function($rootScope, $scope, $http) {
        $rootScope.tpTitulo = 'Cadastro de Pessoas';
        $scope.btnCarrgarPessoasText = 'Carregar Pessoas';
        $scope.frmInclusao = {
            "nome": "",
            "idade": "",
            "pais": ""
        };
        $scope.exibirFormInclusao = false;
        $scope.listaPessoas = [];
        $scope.excluirTudoBtn = false;

        $scope.incluirPessoa = function() {
            $scope.listaPessoas.push({
                nome: $scope.frmInclusao.nome,
                idade: $scope.frmInclusao.idade,
                pais: $scope.frmInclusao.pais
            });

            $scope.frmInclusao.nome = '';
            $scope.frmInclusao.idade = '';
            $scope.frmInclusao.pais = '';
            $scope.exibirFormInclusao = false;
        };

        $scope.excluirPessoa = function($index) {
            $scope.listaPessoas.splice($index, 1);
        };

        $scope.excluirSelecionado = function() {
            var i = $scope.listaPessoas.length;

            while (i--) {
                var pessoa = $scope.listaPessoas[i];

                if (pessoa.selected) {
                    $scope.listaPessoas.splice(i, 1);
                }
            }
        };

        var getAllSelected = function() {
            var selectedItems = $scope.listaPessoas.filter(function(pessoa) {
                return pessoa.selected;
            });

            if (selectedItems.length > 0) {
                $scope.excluirTudoBtn = true;
            } else {
                $scope.excluirTudoBtn = false;
            }

            return selectedItems.length === $scope.listaPessoas.length;
        };

        var setAllSelected = function(value) {
            angular.forEach($scope.listaPessoas, function(pessoa) {
                pessoa.selected = value;
            });
        };

        $scope.allSelected = function(value) {
            if (value !== undefined) {
                return setAllSelected(value);
            } else {
                return getAllSelected();
            }
        };

        $scope.carregarPessoas = function() {
        	$scope.exibirFormInclusao = false;
            $scope.btnCarrgarPessoasText = 'Carregando...'
            $scope.carregandoPessoas = true;
            $scope.listaPessoas = [];
        
            $http({
                url: 'pessoas.json',
                method: 'GET'
            }).then(function(resposta) {
                $scope.listaPessoas = resposta.data;
            }, function(resposta) {
                alert('Aconteceu um erro!');
            }).finally(function() {
                $scope.btnCarrgarPessoasText = 'Carregar Pessoas';
                $scope.carregandoPessoas = false;
            });
        };
    });
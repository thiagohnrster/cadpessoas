/*
 * @Author: Thiago
 * @Date:   2020-07-22 16:38:31
 * @Last Modified by:   Thiago
 * @Last Modified time: 2020-07-29 17:08:01
 */
angular.module('app', ['listaPessoas']).run(function ($rootScope) {
        $rootScope.tpTitulo = 'Cadastro de Pessoas';
        $rootScope.btnCarrgarPessoasText = 'Carregar Pessoas';
        $rootScope.carregandoPessoas = false;
        $rootScope.listaPessoas = [];
        $rootScope.exibirFormInclusao = false;
    })
    .controller('CadPessoas', function($rootScope, $scope, $http) {
        $scope.frmInclusao = {
            "nome": "",
            "idade": "",
            "pais": ""
        };
        $scope.excluirTudoBtn = false;

        $scope.incluirPessoa = function() {
            $rootScope.exibirFormInclusao = false;
            $scope.listaPessoas.push({
                nome: $scope.frmInclusao.nome,
                idade: $scope.frmInclusao.idade,
                pais: $scope.frmInclusao.pais
            });

            $scope.frmInclusao.nome = '';
            $scope.frmInclusao.idade = '';
            $scope.frmInclusao.pais = '';
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
    });
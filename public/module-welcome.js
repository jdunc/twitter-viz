(function () {
  angular.module('app')
    .component('welcome', {
      controller: editController,
      templateUrl: '../welcome.html',
    });

  // editController.$inject = ['$http']
  function editController($http, $stateParams, $window) {
    console.log($stateParams, 'stateParams');
    const vm = this;
    vm.$onInit = function () {

    };
  } // end of controller
}());

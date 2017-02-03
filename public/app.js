// BUGS: it doesn't update dynamically... requires to click.


(function () {
  angular.module('app', ['ui.router'])
  .config(config);

  function config($stateProvider) {
    const editPost = {
      name: 'editPost',
      url: '/',
      template: '<house-new></house-new>',
    };

    const home = {
      name: 'home',
      url: '/',
      template: '<reddit></reddit>',
    };

    $stateProvider.state(home);
    $stateProvider.state(editPost);
  }// end of config function
}());

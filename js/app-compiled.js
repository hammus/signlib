'use strict';

angular.module('myApp', ['ngRoute', 'ngTagsInput', 'routeStyles', 'ngLodash', 'myApp.services']).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'videoController'
    }).when('/options/:type/:id', {
        templateUrl: 'views/options.html',
        controller: 'optionsController'
    }).when('/player/:id', {
        templateUrl: 'views/player.html',
        controller: 'playerController',
        css: 'css/player.css'
    }).when('/compics/', {
        templateUrl: 'views/compics.html',
        controller: 'compicsController',
        css: 'css/compics.css'
    }).otherwise({
        redirectTo: '/'
    });
});

//# sourceMappingURL=app-compiled.js.map
var myApp = angular.module('myApp', ['ngRoute', 'ngTagsInput'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
            .when('/options/:id', {
            templateUrl: 'views/options.html',
            controller: 'optionsController'
        })
            .when('/player/:id', {
            templateUrl: 'views/player.html',
            controller: 'playerController'
        })
            .otherwise({
            redirectTo: '/'
        });
    });
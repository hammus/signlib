angular.module('myApp', ['ngRoute', 'ngTagsInput', 'routeStyles'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'views/home.html',
            controller: 'videoController'
        })
            .when('/options/:id', {
            templateUrl: 'views/options.html',
            controller: 'optionsController'
        })
            .when('/player/:id', {
            templateUrl: 'views/player.html',
            controller: 'playerController'
        })
            .when('/compics/', {
                templateUrl: 'views/compics.html',
                controller: 'compicsController',
                css: 'css/compics.css'
            })
            .otherwise({
            redirectTo: '/'
        });
    });
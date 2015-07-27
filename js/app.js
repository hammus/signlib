angular.module('myApp', ['ngRoute', 'ngTagsInput'])
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
    })
    .constant('CONFIG', {
        "folders": {
            "videos": "videos/",
            "compic": {
                "color": "compics/Color/",
                "mono": "compics/Mono/"
            },
            "scripts": {
                "controllers": "js/controllers",
                "services": "js/services",
                "router": "js/router",
                "app": "js/",
                "node_modules": "node_modules/"
            }

        },
        "extensions": {
            "videos": ["**.mp4", "**.m4v", "**.webm", "**.ogg"],
            "images": ["**.gif", "**.png", "**.bmp", "**.jpg", "**.jpeg"]
        },
        "dataFile": "./data.json",
        "configFile": "./config.json"
    });


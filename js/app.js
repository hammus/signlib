angular.module('myApp', ['ngRoute', 'ngTagsInput'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController'

            }).when('/compics', {
                templateUrl: 'views/compics.html',
                controller: 'compicsController'
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
    }]);
    //.factory('Person', function(visitor) {
    //    return function Person (name)
    //    {
    //        this.name = name;
    //        this.greet = function() {
    //            if(visitor.country === 'AU') {
    //                return 'G\'day, ' + this.name + ' ya cunt.';
    //            } else {
    //                return "Hey " + this.name + "!";
    //            }
    //        }
    //    }
    //});



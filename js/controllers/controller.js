


angular.module('myApp').controller("homeController",['$scope', '$window', function($scope, $window) {
    //var database        = require('database');
    $scope.headerSrc    = 'views/header.html';
    $scope.viewStyle    = 'css/header.css';



    $scope.quit = function()
    {
        var gui = require("nw.gui");
        gui.App.quit();

    };

    $scope.init = function()
    {
        $scope.MVideos = $window.MVideos;
    };


    try {
        $scope.init();
    } catch (err)
    {
        console.error(err);
    }

    if(typeof MVideos == 'undefined')
    {
        console.error("Data File Didn't Load");
    }

    $scope.$watch('MVideos', function(newVal, oldVal) {
        database.saveData(newVal);
    }, true);

}]).controller("optionsController", function($scope, $routeParams){
    $scope.options = $scope.MVideos[$routeParams.id];


}).controller("playerController", function($scope, $routeParams){
   $scope.player = $scope.MVideos[$routeParams.id];
});


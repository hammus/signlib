


angular.module('myApp').controller("homeController", function($scope) {

    var CONFIG = require('./config.JSON');
    $scope.headerSrc = 'views/header.html';
    $scope.viewStyle = 'css/header.css';

    $scope.quit = function()
    {
        var gui = require("nw.gui");
        gui.App.quit();

    };

    $scope.init = function()
    {
        try {
            $scope.MVideos = require("videoparser");
        } catch (err)
        {
            console.error(err);
        }
    };


        try {
            $scope.init();
        } catch (err)
        {
            console.error(err);
        }

        if($scope.MVideos.length == null)
        {
            console.error("Data File Didn't Load");
        }

        $scope.$watch('MVideos', function(newVal, oldVal) {
            database.saveData(newVal);
        }, true);

}).controller("optionsController", function($scope, $routeParams){
    $scope.options = $scope.MVideos[$routeParams.id];


}).controller("playerController", function($scope, $routeParams){
   $scope.player = $scope.MVideos[$routeParams.id];
})

.controller('compicsController', function($scope, $routeParams) {

    });


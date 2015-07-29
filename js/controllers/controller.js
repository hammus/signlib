


angular.module('myApp').controller("homeController",['$scope', function($scope) {

    var dataManager = global.exports.dataManager;
    var Videos = global.exports.data.videos;
    var Compics = global.exports.data.compics;
    var CONFIG = global.exports.config;
    $scope.headerSrc    = 'views/header.html';
    $scope.viewStyle    = 'css/header.css';



    $scope.quit = function()
    {
        var gui = require("nw.gui");
        gui.App.quit();

    };

    $scope.init = function()
    {
        $scope.MVideos = Videos;
        $scope.MCompics = Compics;
    };


    try {
        $scope.init();
    } catch (err)
    {
        console.error(err);
    }



    $scope.$watch('MVideos', function(newVal, oldVal) {
        dataManager.save(newVal, CONFIG.videoDataFile);
    }, true);

}]).controller("optionsController", function($scope, $routeParams){
    $scope.options = $scope.MVideos[$routeParams.id];


}).controller("playerController", function($scope, $routeParams){

   $scope.player = $scope.MVideos[$routeParams.id];

}).controller("compicsController", function($scope, $routeParams){



});


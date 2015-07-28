


angular.module('myApp').controller("homeController",['$scope', '$window', function($scope, $window) {

    var dataManager = global.exports.dataManager;
    var MVideos = global.exports.data;
    $scope.headerSrc    = 'views/header.html';
    $scope.viewStyle    = 'css/header.css';



    $scope.quit = function()
    {
        var gui = require("nw.gui");
        gui.App.quit();

    };

    $scope.init = function()
    {
        $scope.MVideos = MVideos;
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
        dataManager.save(newVal);
    }, true);

}]).controller("optionsController", function($scope, $routeParams){
    $scope.options = $scope.MVideos[$routeParams.id];


}).controller("playerController", function($scope, $routeParams){
   $scope.player = $scope.MVideos[$routeParams.id];
});


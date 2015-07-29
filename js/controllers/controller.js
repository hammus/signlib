


angular.module('myApp').controller("homeController",['$scope', '$routeParams', function($scope, $routeParams) {



    $scope.headerSrc    = 'views/header.html';
    $scope.viewStyle    = 'css/header.css';



    $scope.quit = function()
    {
        var gui = require("nw.gui");
        gui.App.quit();

    };












}]).controller("optionsController", function($scope, $routeParams){

    var dataManager = global.exports.dataManager;
    var Videos = global.exports.data.videos;
    var CONFIG = global.exports.config;


    $scope.viewData = Videos;
    $scope.$watch('viewData', function(newVal, oldVal) {
        dataManager.save(newVal, CONFIG.videoDataFile);
    }, true);
    $scope.options = $scope.viewData[$routeParams.id];


}).controller("playerController", function($scope, $routeParams){

   $scope.player = $scope.MVideos[$routeParams.id];

})
    .controller("compicsController", ["$scope", "$routeParams","$log", function($scope, $routeParams, $log){

        $scope.query = {};
        $scope.queryBy = "$";
        var dataManager = global.exports.dataManager;
        var Compics = global.exports.data.compics;
        var CONFIG = global.exports.config;

        $scope.viewData = Compics;
        $scope.$watch('viewData', function(newVal, oldVal) {
            dataManager.save(newVal, CONFIG.compicDataFile);
        }, true);

        $log.info("Boo compics");


    }]).controller("videoController", ["$scope", "$routeParams", "$log", function($scope, $routeParams, $log){

        $scope.query = {};
        $scope.queryBy = "$";
        var dataManager = global.exports.dataManager;
        var Videos = global.exports.data.videos;
        var CONFIG = global.exports.config;

        $log.info("Boo vids");

        $scope.viewData = Videos;
        $scope.$watch('viewData', function(newVal, oldVal) {
            dataManager.save(newVal, CONFIG.videoDataFile);
        }, true);


}]);
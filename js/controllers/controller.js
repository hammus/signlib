


angular.module('myApp').controller("homeController",['$scope', '$routeParams', 'SaveData', function($scope, $routeParams) {



    $scope.headerSrc    = 'views/header.html';
    $scope.viewStyle    = 'css/header.css';



    $scope.quit = function()
    {

        var gui = require("nw.gui");
        gui.App.quit();

    };












}]).controller("optionsController", ['$scope', '$routeParams', 'SaveData', function($scope, $routeParams, saveFile){

    

    //Get the correct infor based on the url (Compic or Videos)
    $scope.viewData = $routeParams.type == "video" ? global.exports.data.videos : global.exports.data.compics;

    $scope.$watch('viewData', saveFile, true);

    $scope.options = $scope.viewData[$routeParams.id];


}]).controller("playerController", function($scope, $routeParams){

    $scope.viewData = global.exports.data.videos;
   $scope.player = $scope.viewData[$routeParams.id];

})
    .controller("compicsController", ["$scope", 'SaveData', function($scope, saveFile){

        $scope.query = {};
        $scope.queryBy = "$";

        $scope.viewData = global.exports.data.compics;

        $scope.$watch('viewData', saveFile, true);




    }]).controller("videoController", ["$scope", 'SaveData', function($scope, saveFile){

        $scope.query = {};
        $scope.queryBy = "$";

        $scope.viewData = global.exports.data.videos;

        $scope.$watch('viewData', saveFile, true);


}]);
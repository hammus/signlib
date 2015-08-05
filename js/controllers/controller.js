/*min checked */
angular.module('myApp').controller("homeController",
    ['$scope', 'LocalDataService',
    function ($scope, localData) {
        $scope.headerSrc = 'views/header.html';
        $scope.viewStyle = 'css/header.css';
        $scope.localData = localData;
        $scope.viewData = localData.startup(global.exports.data);

        $scope.$watch('viewData', function (newVal, oldVal) {
            localData.saveData({name: "videos", data: newVal.videos});
            localData.saveData({name: "compics", data: newVal.compics});
        }, true);

    }])

    .controller("optionsController",
    ['$scope', '$routeParams',
        function ($scope, $routeParams) {
        //Get the correct infor based on the url (Compic or Videos)
            $scope.viewData = $routeParams.type == "video" ? $scope.$parent.viewData.videos : $scope.$parent.viewData.compics;
            $scope.options = $scope.viewData[$routeParams.id];


        }])

    .controller("playerController",
    ["$scope", '$routeParams',
        function ($scope, $routeParams) {
            $scope.viewData = $scope.$parent.viewData.videos;
            $scope.player =  $scope.options = $scope.viewData[$routeParams.id];
            $scope.options.auslan = "http://www.auslan.org.au/dictionary/search/?query=" + $scope.options.name;

            $scope.openAuslan = function(){
                var gui = require("nw.gui");
                gui.Shell.openExternal($scope.options.auslan);
            }
    }])

    .controller("compicsController",
    ["$scope",
        function ($scope) {

        $scope.query = {};
        $scope.queryBy = "$";

        $scope.viewData = $scope.$parent.viewData.compics;


    }])
    .controller("videoController",
    ["$scope",
        function ($scope) {

        $scope.query = {};
        $scope.queryBy = "$";

        $scope.viewData = $scope.$parent.viewData.videos;


    }]);
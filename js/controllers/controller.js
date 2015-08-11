/*min checked */
angular.module('myApp').controller("homeController",
    ['$scope', 'LocalDataService',
    function ($scope, localData) {
        $scope.headerSrc = 'views/header.html';
        $scope.viewStyle = 'css/header.css';
        $scope.localData = localData;
        $scope.viewData = localData.startup(global.exports.data);





        //TODO Change this to false in production
        $scope.DEBUG = true;

        $scope.$watch('viewData', function (newVal, oldVal) {
            localData.saveData({name: "videos", data: newVal.videos});
            localData.saveData({name: "compics", data: newVal.compics});
        }, true);

        $scope.refreshFromHD = function() {
            var videos = localData.saveData({name: "videos", data: global.exports.data});
            var compics = localData.saveData({name: "compics", data: global.exports.data});
            $scope.viewData = {videos: videos, compics: compics};
        }

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

            $scope.getFullpath = function(filepath) {
                var path = require('path');
                return path.join(process.cwd(), filepath);
            };

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
            $scope.currentPage = 0;
            $scope.pageSize = 50;
            $scope.pageCount = function(){
                return Math.ceil($scope.viewData.length / $scope.pageSize);
            };



        }])
    .controller("videoController",
    ["$scope",
        function ($scope) {

        $scope.query = {};
        $scope.queryBy = "$";


        $scope.viewData = $scope.$parent.viewData.videos;
            $scope.currentPage = 0;
            $scope.pageSize = 50;
            $scope.pageCount = function(){
                return Math.ceil($scope.viewData.length / $scope.pageSize);
            };


        }]);
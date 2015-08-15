/*min checked */
angular.module('myApp').controller("homeController",
    ['$scope', 'LocalDataService',
        function ($scope, localData) {
            $scope.headerSrc = 'views/header.html';
            $scope.viewStyle = 'css/header.css';
            $scope.localData = localData;
            $scope.viewData = localData.startup();

            $scope.currentPage = 1;
            $scope.pageSize = 33;


            $scope.flat = function(categories) {
                if(categories.length < 1)
                {
                    return "";

                }

                if(categories.length < 2)
                {
                    return categories[0].text;
                }

                var flat = "";

                categories.forEach(function(item) {
                    flat += item.text + ", "
                });

                return flat.substring(0, 15) + "...";

            }

            //TODO Change this to false in production
            $scope.DEBUG = false;

            $scope.$watch('viewData', function (newVal, oldVal) {
                localData.saveData({name: "videos", data: newVal.videos});
                localData.saveData({name: "compics", data: newVal.compics});
            }, true);

            $scope.refreshFromHD = function () {
                var videos = localData.saveData({name: "videos", data: global.exports.data});
                var compics = localData.saveData({name: "compics", data: global.exports.data});
                $scope.viewData = {videos: videos, compics: compics};
            }

            $scope.getFullpath = function (filepath) {
                var path = require('path');
                return path.join(process.cwd(), filepath);
            };


        }])

    .controller("optionsController",
    ['$scope', '$routeParams', '$window',
        function ($scope, $routeParams, $window) {

            //Show Delete Button only if we're displaying a compic | see ng-if on options.html
            $scope.showDelete = $routeParams.type == "compics";

            //Get the correct collection based on the type of object we're viewing
            $scope.viewData = $routeParams.type == "video" ? $scope.$parent.viewData.videos : $scope.$parent.viewData.compics;

            //get the particular item we're viewing.
            $scope.options = $scope.viewData[$routeParams.id];


            $scope.del = function()
            {
                $scope.viewData[$routeParams.id].deleted = true;
                $window.history.back();

            };


        }])

    .controller("playerController",
    ["$scope", '$routeParams',
        function ($scope, $routeParams) {
            $scope.viewData = $scope.$parent.viewData.videos;
            $scope.player = $scope.options = $scope.viewData[$routeParams.id];
            $scope.options.auslan = "http://www.auslan.org.au/dictionary/search/?query=" + $scope.options.name;


            $scope.openAuslan = function () {
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
/**
 * Created by Liam on 30/07/2015.
 */
angular.module('myApp')

    .directive('back',
    ['$window',
        function($window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    elem.bind('click', function () {
                        $window.history.back();
                    });
                }
        };
}])
    .directive('quit',
    ['LocalDataService', function(localData) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    localData.saveData({name: "videos", data: scope.viewData.videos});
                    localData.saveData({name: "compics", data: scope.viewData.compics});

                    var gui = require("nw.gui");
                    gui.App.quit();
                });
            }
        };
    }]);
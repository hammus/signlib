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
                    var viewData = scope.$parent.$parent.viewData;

                    localData.setLocalData({name: "videos", data: viewData.videos});
                    localData.setLocalData({name: "compics", data: viewData.compics});
                    localData.backup(viewData);

                    var gui = require("nw.gui");
                    gui.App.quit();
                });
            }
        };
    }]);
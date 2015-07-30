/**
 * Created by Liam on 30/07/2015.
 */
angular.module('myApp')

    .directive('back', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]).directive('quit', ['SaveData', function(saveData) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    saveData(scope.viewData);

                    var gui = require("nw.gui");
                    gui.App.quit();
                });
            }
        };
    }]);
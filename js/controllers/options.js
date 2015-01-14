myApp.controller("optionsController", function($scope, $routeParams){
    $scope.model = {
        id: $routeParams.id
    };
})
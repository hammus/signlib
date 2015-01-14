
myApp.controller("homeController", function($scope) {
    $scope.headerSrc = 'views/header.html'
    $scope.init = function()
    {
        try {
            $scope.MVideos = require("videoparser");
        } catch (err)
        {
            console.error(err);
        }
    }


        try {
            $scope.init();
        } catch (err)
        {
            console.error(err);
        }

        if($scope.MVideos.length == null)
        {
            console.error("Data File Didn't Load");
        }


});

myApp.controller("optionsController", function($scope, $routeParams){
    $scope.model = {
        id: $routeParams.id
    }

    $scope.currentVideo = $scope.MVideos[id];
});
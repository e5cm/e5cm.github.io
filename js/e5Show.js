var app = angular.module('songApp', []);
app.controller('songCtrl', function($scope) {
    $scope.songs = songData;
    $scope.typeEnum = e5.typeEnum;

    $scope.download = function(id) {
        var file = new File([angular.toJson($scope.songs)], { type: "application/json;charset=utf-8" });
        saveAs(file,"songsData.htm");
    };

});
app.filter('typeName', function() { //可以注入依赖
    return function(text) {
        return e5.typeEnum[text];
    }
});

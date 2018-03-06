var app = angular.module('songApp', []);
app.controller('songCtrl', function($scope) {
    $scope.songs = songData;
});
app.filter('typeName', function() { //可以注入依赖
    return function(text) {
        return e5.typeEnum[text];
    }
});

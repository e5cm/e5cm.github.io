var app = angular.module('songApp', []);
app.controller('songCtrl', function($scope) {
    $scope.songs = songData;
    $scope.typeEnum = e5.typeEnum;
    $scope.songsToShow=$scope.songs.slice(0,10);
    $scope.songsToShow.unshift({},{});
    $scope.songsToShow=switchRowCol($scope.songsToShow);

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

function switchRowCol(data){
    return [data[0],data[2],data[4],data[6],data[8],data[10],data[1],data[3],data[5],data[7],data[11],data[13]];
}
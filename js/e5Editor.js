var app = angular.module('songApp', []);
app.controller('songCtrl', function($scope,$http) {
    $http.get('data.json').then(function (response) {
        $scope.songs = response.data;
    });
    $scope.typeEnum = e5.typeEnum;

    $scope.download = function(id) {
        var file = new File([angular.toJson($scope.songs)], { type: "application/json;charset=utf-8" });
        saveAs(file,"songsData.htm");
    };
    $scope.getUp = function(index) {
        if(index <= 0) return;
        $scope.songs.splice(index-1,2,$scope.songs[index],$scope.songs[index-1]);
    };
    $scope.getDown = function(index) {
        if(index >= $scope.songs.length-1) return;
        $scope.songs.splice(index,2,$scope.songs[index + 1],$scope.songs[index]);
    };



    $scope.toEdit = function(index,prop,e){
        //你的业务代码
        if(!$scope.songs[index].edit){
            $scope.songs[index].edit = [];
        }
        $scope.songs[index].edit[prop] = true;    //我猜你是这样写的，在这里后边加一句
        document.getElementById(prop+"_" + index).focus();
        setTimeout(function(){document.getElementById(prop+"_" + index).focus();},10);
    }
});
app.filter('typeName', function() { //可以注入依赖
    return function(text) {
        return e5.typeEnum[text];
    }
});

var app = angular.module('songApp', []);
app.controller('songCtrl', function($scope, $timeout) {
    $scope.songs = songData;
    $scope.slide = "mid";
    $scope.typeEnum = e5.typeEnum;
    $scope.showIndex=0;
    $scope.songsToShow=$scope.songs.slice(0,10);
    $scope.songsToShow.unshift({},{});

    //TODO 统一两个方法,改为过滤器
    $scope.slideNext = function(){
        $scope.slide="next";
        $timeout(function () {
            $scope.slide="mid";
            if($scope.showIndex > $scope.songs.length - 8){
                $scope.showIndex = 0;
                $scope.songsToShow=$scope.songs.slice(0,10);
                $scope.songsToShow.unshift({},{});
                return;
            }
            $scope.showIndex += 2;

            $scope.songsToShow.splice(0,2);
            $scope.songsToShow.push($scope.songs[$scope.showIndex+8],$scope.songs[$scope.showIndex+9]);

        }, 190);
    }
    $scope.slidePre = function(){
        $scope.slide="pre";
        $timeout(function () {
            $scope.slide="mid";
            if($scope.showIndex==0){
                //TODO 跳转结尾
                return;
            }
            $scope.showIndex -= 2;
            alert(angular.toJson($scope.songsToShow));
            var preSongs;
            if($scope.showIndex==0){
                preSongs = [{},{}]
            }else{
                preSongs =[$scope.songs[$scope.showIndex-2],$scope.songs[$scope.showIndex-1]];
            }
            $scope.songsToShow.unshift(preSongs[0],preSongs[1]);
            $scope.songsToShow.splice(12,2);
            alert(angular.toJson($scope.songsToShow));

        }, 190);
    }
});

app.filter('typeName', function() { //可以注入依赖
    return function(text) {
        return e5.typeEnum[text];
    }
});

app.filter('switchRc', function() { //可以注入依赖
    return function(data) {
        return [data[0],data[2],data[4],data[6],data[8],data[10],data[1],data[3],data[5],data[7],data[9],data[11]];
    }
});
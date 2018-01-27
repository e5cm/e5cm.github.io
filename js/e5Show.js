var app = angular.module('songApp', []);
app.controller('songCtrl', function($scope, $timeout) {
    $scope.load = function() {
        alert('code here');
    };
    $scope.$watch('$viewContentLoaded', function() {
        alert('1');
    });
    $scope.songs = songData;
    $scope.slide = "mid";
    $scope.typeEnum = e5.typeEnum;
    $scope.showIndex=0;
    $scope.songsToShow=$scope.songs.slice(0,10);
    $scope.songsPreLoad=[];
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
            var tmp = $scope.songsToShow.concat([]);
            tmp.push($scope.songs[$scope.showIndex+8],$scope.songs[$scope.showIndex+9]);
            tmp.splice(0,2);
            $scope.songsToShow = tmp;

        }, 200);
    };
    $scope.slidePre = function(){
        $scope.slide="pre";
        $timeout(function () {
            $scope.slide="mid";
            $scope.showIndex -= 2;
            if($scope.showIndex<0){
                $scope.showIndex = Math.ceil($scope.songs.length/2) -2;
                //TODO 跳转结尾
                return;
            }

            //alert(angular.toJson($scope.songsToShow));
            var preSongs;
            if($scope.showIndex==0){
                preSongs = [{},{}]
            }else{
                preSongs =[$scope.songs[$scope.showIndex-2],$scope.songs[$scope.showIndex-1]];
            }
            $scope.songsToShow.unshift(preSongs[0],preSongs[1]);
            $scope.songsToShow.splice(12,2);
            //alert(angular.toJson($scope.songsToShow));

        }, 190);
    };
    $scope.slideTo =  function(showIndex){
        var tmp = $scope.songs.slice(showIndex,showIndex + 10);
        if(showIndex == 0){
            tmp.unshift({},{});
        }
        while(tmp.length<12){
            tmp.push({});
        }
        tmp.push($scope.songs[$scope.showIndex+8],$scope.songs[$scope.showIndex+9]);
        tmp.splice(0,2);
        $scope.songsToShow = tmp;
    };

    $timeout(function () {
        $scope.songsPreLoad=$scope.songs;
    },2000);
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
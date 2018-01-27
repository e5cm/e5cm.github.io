var app = angular.module('songApp', []);
app.controller('songCtrl', function($scope, $timeout) {
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
            $scope.showIndex += 2;
            $scope.slideTo($scope.showIndex)
        }, 200);
    };
    $scope.slidePre = function(){
        $scope.slide="pre";
        $timeout(function () {
            $scope.slide="mid";
            $scope.showIndex -= 2;
            $scope.slideTo($scope.showIndex)
        }, 190);
    };
    $scope.slideTo =  function(showIndex){
        //跳转结尾
        if(showIndex<0){
            showIndex = Math.ceil(($scope.songs.length - 8)/2)*2;
        }
        //跳转开头
        if(showIndex > $scope.songs.length - 6){
            showIndex = 0;
        }
        //修正
        $scope.showIndex = showIndex;
        var tmp;
        if(showIndex == 0){
            tmp = $scope.songs.slice(showIndex,showIndex + 10);
            tmp.unshift({},{});
        }else{
            tmp = $scope.songs.slice(showIndex-2,showIndex + 10);
        }
        while(tmp.length<12){
            tmp.push({});
        }
        $scope.songsToShow = tmp;
    };

    //预加载
    // $timeout(function () {
    //     $scope.songsPreLoad=$scope.songs;
    // },2000);
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
var app = angular.module('songApp', ['ui.bootstrap']);
app.controller('songCtrl', function($scope, $timeout, $modal) {
    $scope.switchRc = function(data) {
        return [data[0],data[2],data[4],data[6],data[8],data[10],data[1],data[3],data[5],data[7],data[9],data[11]];
    };
    $scope.songs = songData;
    $scope.slide = "mid";
    $scope.typeEnum = e5.typeEnum;
    $scope.showIndex=0;
    $scope.songsToShow=$scope.songs.slice(0,10);
    $scope.songsPreLoad=[];
    $scope.songsToShow.unshift({},{});
    $scope.songsToShow = $scope.switchRc($scope.songsToShow);



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
        var filterSongs = $scope.songs.concat([]);
        if($scope.codeFilter){
            filterSongs=$scope.filterByE5Code(filterSongs,$scope.codeFilter);
        }
        //跳转结尾
        if(showIndex<0){
            showIndex = Math.ceil((filterSongs.length - 8)/2)*2;
        }
        //跳转开头
        if(showIndex > filterSongs.length - 6){
            showIndex = 0;
        }
        //修正
        $scope.showIndex = showIndex;
        var tmp;
        if(showIndex == 0){
            tmp = filterSongs.slice(showIndex,showIndex + 10);
            tmp.unshift({},{});
        }else{
            tmp = filterSongs.slice(showIndex-2,showIndex + 10);
        }
        while(tmp.length<12){
            tmp.push({});
        }
        $scope.songsToShow = $scope.switchRc(tmp);

    };
    $scope.codeFilterChange = function () {
        $scope.slideTo(0);
    };

    $scope.filterByE5Code = function (songs, code) {
        var result = [];
        for(var song in songs){
            song = songs[song];
            if(song.e5code && angular.lowercase(song.e5code).indexOf(angular.lowercase(code))>-1){
                result.push(song);
            }else if(song.e5code == "random"){
                result.push(song);
            }
        }
        return result;
    };


    $scope.openModal = function(song) {
        var modalInstance = $modal.open({
            templateUrl : 'modal.html',//script标签中定义的id
            controller : 'modalCtrl',//modal对应的Controller
            resolve : {
                data : function() {//data作为modal的controller传入的参数
                    return song;//用于传递数据
                }
            }
        })
    }

    //预加载
    // $timeout(function () {
    //     $scope.songsPreLoad=$scope.songs;
    // },2000);
});

app.controller('modalCtrl', function($scope, $modalInstance, data) {
    $scope.song= data;

    //在这里处理要进行的操作
    $scope.ok = function() {
        window.open("orpheus://song/1501606");
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
});

app.filter('typeName', function() {
    return function(text) {
        return e5.typeEnum[text];
    }
});
app.filter('notEmpty', function() {
    return function(text) {
        if(text){
            return "not-empty";
        }
    }
});
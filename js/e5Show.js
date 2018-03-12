
var app = angular.module('songApp', ['ui.bootstrap','ngTouch']);
app.controller('songCtrl', function($scope, $timeout, $uibModal) {
    $scope.songType = '21';
    $scope.filterType = function(song){
        return song.type==$scope.songType || song.e5_code == "random";
    };
    $scope.changeType = function() {
        $scope.songs = songData.filter($scope.filterType);
        $scope.slideTo(0);
    };
    $scope.typeEnum = e5.typeEnum;
    $scope.switchRc = function(data) {
        return [data[0],data[2],data[4],data[6],data[8],data[10],data[1],data[3],data[5],data[7],data[9],data[11]];
    };
    $scope.songs = songData.filter($scope.filterType);
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
        }, 200);
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
            if(song.e5_code && angular.lowercase(song.e5_code).indexOf(angular.lowercase(code))>-1){
                result.push(song);
            }else if(song.name && angular.lowercase(song.name).indexOf(angular.lowercase(code))>-1){
                result.push(song);
            }else if(song.e5_code == "random"){
                result.push(song);
            }
        }
        return result;
    };


    $scope.openModal = function(song) {
        var modalInstance = $uibModal.open({
            templateUrl : 'modal.html',//script标签中定义的id
            controller : 'modalCtrl',//modal对应的Controller
            resolve : {
                data : function() {//data作为modal的controller传入的参数
                    return song;//用于传递数据
                }
            }
        })
    }

    $scope.swipeRight = function(){
        $timeout(function () {
            $scope.slide="next-page";
        }, 10);
        $timeout(function () {
            $scope.slide="mid";
            $scope.showIndex += 8;
            $scope.slideTo($scope.showIndex)
        }, 200);
        console.log('turn right');
    }

    //预加载
    // $timeout(function () {
    //     $scope.songsPreLoad=$scope.songs;
    // },2000);
});
var editor;
app.controller('modalCtrl', function($scope, $http, $uibModalInstance, data) {
    $scope.song= data;
    $scope.editor=editor;
    //在这里处理要进行的操作
    $scope.jumpMusic = function() {
        if(data.music_url){
            window.open(data.music_url);
        }
        //window.open("orpheus://song/"+data.orpheus,"_blank");
    };
    $scope.jumpVideo = function() {
        if(data.video_url){
            window.open(data.video_url);
        }

    };
    $scope.addUrl = function() {
        editor=$scope.editor;
        var url = "https://l8650tv3.qcloud.la/weapp/songs/addUrl";
        var ajax = new ajaxClass($http,url,"POST");
        var dataUrl = data.editType == 0?data.music_url:data.video_url
        // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.data = $.param({"song_id":data.id,"type":data.editType,"name":data.video_name,"url":dataUrl,"gmt_creator":$scope.editor});
        ajax.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            //成功就成功了吧,没啥好说的
        };
        ajax.failureCallback = function(res){
            //失败就失败了吧,无所谓
        };
        ajax.requestData();
        alert("信息已提交,感谢大佬支持!");
        data.edit = false;
    };
    $scope.cancel = function() {

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

app.filter('empty', function() {
    return function(text) {
        if(!text){
            return "empty";
        }
    }
});
app.filter('dropdown', function() {
    return function(text) {
        if(!text){
            return "dropdown";
        }
    }
});

app.directive('swipeAble',['$swipe','$timeout',function($swipe,$timeout){
    return {
        restrict:'EA',
        link:function(scope,ele,attrs,ctrl){
            var startX,startY,locked=false;
            $swipe.bind(ele,{
                'start':function(coords){
                    startX = coords.x;
                    startY = coords.y;
                },
                'move':function(coords){

                },
                'end':function(coords){
                    var delta = coords.x - startX;
                    if(delta<-50 && !locked){
                        $timeout(function () {
                            scope.slide="next-page";
                        }, 10);
                        $timeout(function () {
                            scope.slide="mid";
                            scope.showIndex += 8;
                            scope.slideTo(scope.showIndex)
                        }, 200);
                        console.log('turn right');
                    }else if(delta>50 && !locked){
                        $timeout(function () {
                            scope.slide="pre-page";
                        }, 10);
                        $timeout(function () {
                            scope.slide="mid";
                            scope.showIndex -= 8;
                            scope.slideTo(scope.showIndex)
                        }, 200);
                        console.log('turn left');
                    }
                },
                'cancel':function(coords){
                }
            });
        }
    }
}
]);

var showEdit = function(){

};
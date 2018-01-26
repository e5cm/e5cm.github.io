var app = angular.module('myApp', []);
app.controller('userCtrl', function($scope,$http) {
    $http.get('data.json').then(function (response) {
        $scope.users = response.data;
    });
    $scope.typeEnum = e5.typeEnum;

    $scope.saveUser = function(id) {
        $scope.users.push({id:7, name:'yin',type:"12" });
    };
    $scope.download = function(id) {
        var file = new File([angular.toJson($scope.users)], { type: "application/json;charset=utf-8" });
        saveAs(file,"songsData.htm");
    };
    $scope.getUp = function(index) {
        if(index <= 0) return;
        $scope.users.splice(index-1,2,$scope.users[index],$scope.users[index-1]);
    };
    $scope.getDown = function(index) {
        if(index >= $scope.users.length-1) return;
        $scope.users.splice(index,2,$scope.users[index + 1],$scope.users[index]);
    };



    $scope.toEdit = function(index,prop,e){
        //你的业务代码
        if(!$scope.users[index].edit){
            $scope.users[index].edit = [];
        }
        $scope.users[index].edit[prop] = true;    //我猜你是这样写的，在这里后边加一句
        document.getElementById(prop+"_" + index).focus();
        setTimeout(function(){document.getElementById(prop+"_" + index).focus();},10);
    }
});
app.filter('typeName', function() { //可以注入依赖
    return function(text) {
        return e5.typeEnum[text];
    }
});

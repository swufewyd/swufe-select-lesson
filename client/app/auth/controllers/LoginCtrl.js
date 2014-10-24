
angular.module('app-auth').controller('LoginCtrl', function($scope,$http,$location,$rootScope,SessionService){
	$scope.loginData={};

	$scope.postLogin = function() {

		var username=$scope.username;
		var password=$scope.password;

		$scope.loginData.username=username;
		$scope.loginData.password=password;
		$http({
          	method: 'POST',
          	url: '/api/login/',
          	data: {'loginData': $scope.loginData}
        }).success(function(data, status, headers, cfg) {
        	// Instance.username = 'wydhahaha';
        	$rootScope.loginFlag = false;
          	$location.path('/home');
        }).error(function(data, status, headers, cfg) {
          	alert(2);
        });
	};

	$scope.checkLogin = function () {

		SessionService.getSessionData().then(function(dataResponse) {
		    if(dataResponse.data.isLogin==="1"){
		    	$location.path('/home');
		    }
		});


	};

	$scope.checkLogin();

});


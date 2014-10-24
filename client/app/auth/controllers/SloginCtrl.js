
angular.module('app-auth').controller('SloginCtrl', function($scope,$http,$location,$rootScope,SessionService,$modal){

	$scope.loginData={};
	$scope.slogin = function() {

		$scope.loginData.username=$scope.username;
		$scope.loginData.password=$scope.password;
		$http({
          	method: 'POST',
          	url: '/api/login/',
          	data: {'loginData': $scope.loginData}
        }).success(function(data, status, headers, cfg) {
        	// Instance.username = 'wydhahaha';
        	$scope.$close();

        }).error(function(data, status, headers, cfg) {
          	alert(2);
        });
	};

	$scope.sreg = function() {
		$scope.$close();//关闭登陆框
		// $modalInstance.close();
		var modalInstance = $modal.open({
		  templateUrl: 'app/auth/views/sreg.html',
		  backdrop : 'static'
		  // controller: 'SregCtrl',
		  // size: 'lg'
		});
	};



});


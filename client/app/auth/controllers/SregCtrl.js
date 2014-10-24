angular.module('app-auth').controller('SregCtrl', function($scope,$http,$location,$rootScope,SessionService){

	$scope.regData = {};

	$scope.sreg = function() {
		var username = $scope.usernamesignup;
		var password = $scope.passwordsignup;
		var invitecode = $scope.invitecodesignup;
		$scope.regData.username = username;
		$scope.regData.password = password;
		$scope.regData.invitecode = invitecode;

		$http({
          	method: 'POST',
          	url: '/api/regInvite/',
          	data: {'regData': $scope.regData}
        }).success(function(data, status, headers, cfg) {
        	if(!data.key){
        		alert(data.msg);
        	}else{
        		alert(data.msg);
        		$scope.$close();
        	}
        }).error(function(data, status, headers, cfg) {
          	alert("注册失败!");
        });



	};






});
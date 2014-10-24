angular.module('app-auth').controller('RegCtrl', function($scope,$http,$location,$rootScope,SessionService){

	$scope.regData = {};

	$scope.postReg = function () {
		var username = $scope.usernamesignup;
		var email = $scope.emailsignup;
		var password = $scope.passwordsignup;

		$scope.regData.username = username;
		$scope.regData.email = email;
		$scope.regData.password = password;

		$http({
          	method: 'POST',
          	url: '/api/reg/',
          	data: {'regData': $scope.regData}
        }).success(function(data, status, headers, cfg) {
          	$location.path('/login');
        }).error(function(data, status, headers, cfg) {
          	alert("注册失败!");
        });
	};

	$scope.userAlert = {
		type: 'danger',
		msg: '用户名不能少于三个字符'
	};
	$scope.emailAlert = {
		type: 'danger',
		msg: '请输入正确的邮箱格式，例如wyd@163.com'
	};
	$scope.emailOk = {
		type: 'success',
		msg: '邮箱格式正确'
	};
	$scope.usernameExistAlert = {
		type: 'danger',
		msg: '用户名已存在'
	};
	$scope.usernameExistOk = {
		type: 'success',
		msg: '用户名可用'
	};
	// $scope.regForm.passwordsignup_confirm.$valid = ($scope.passwordsignup==$scope.passwordsignup_confirm);

});
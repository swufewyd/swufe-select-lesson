
angular.module('app-auth').controller('LogoutCtrl', function($scope,$http,$location,$rootScope,SessionService){

	$scope.logOut = function () {
		SessionService.delSessionData().then(function(dataResponse) {
		    if(dataResponse.data.sessionDel==="1"){
		    	$rootScope.loginFlag=true;
		    	$location.path('/login');
		    }
		});
	};

});


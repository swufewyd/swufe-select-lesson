angular.module('app-auth').service('SessionService', ['$http', function($http){
	this.getSessionData = function () {
		return $http({
          	method: 'POST',
          	url: '/api/checkSession/'
        });

	};

	this.delSessionData = function () {
		return $http({
          	method: 'POST',
          	url: '/api/delSession/'
        });

	};
}])
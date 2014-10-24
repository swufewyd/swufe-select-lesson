angular.module('app-auth').directive('ensureUnique', ['$http', function($http){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		//scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, attrs, controller) {

			$scope.$watch(attrs.ngModel, function() {
				// console.log(attrs.ngModel);
				/*console.log($scope.usernamesignup);
				controller.$setValidity('ensureUnique', true);

			        	console.log($scope.regForm.usernamesignup.$valid);*/
			        // console.log($scope.regForm.usernamesignup.$valid);
			        $http({
			          method: 'POST',
			          url: '/api/checkUserExist/',
			          data: {'username': $scope.usernamesignup}
			        }).success(function(data, status, headers, cfg) {
			        	/*console.log($scope.regForm.usernamesignup.$error);
			        	console.log($scope.regForm.usernamesignup.$valid);*/
			        	controller.$setValidity('ensureUnique', data.isUnique);
			          // controller.$setValidity('ensureUnique', true);
			        }).error(function(data, status, headers, cfg) {
			          // controller.$setValidity('ensureUnique', false);
			          // alert(123);
			          alert('远程校验失败');
			        });
			      });
		}
	};
}]);
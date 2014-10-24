/*angular.module('app-common').directive('myTest', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, iElm, iAttrs, controller) {
			controller.$parsers.unshift(function (self) {
					console.log(scope.passwordsignup);
			        console.log(scope.passwordsignup_confirm);
			        if(scope.passwordsignup==self){
			        	scope.regForm.passwordsignup_confirm.$valid='true';
			        	// controller.$setValidity('myTest', true);
			        	console.log(scope.regForm.passwordsignup_confirm.$valid);
			        	console.log(scope.regForm.passwordsignup.$valid);
			        	console.log(scope.regForm.$valid);
			        }else{
			        	console.log(321);
			        }

			        });



		}
	};
});*/


angular.module('app-auth').directive('equalTo', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {

        // watch self
        ngModel.$parsers.unshift(function (self) {
        	// console.log(scope.$eval(attrs.equalTo));
          setState(scope.$eval(attrs.equalTo), self);

          return self;
        })

        // watch target
        scope.$watch(attrs.equalTo, function (v) {
          setState(v, ngModel.$viewValue)
          return v;
        })

        function setState (watch, equalTo) {
        	/*console.log('haha');
        	console.log(scope.regForm.passwordsignup.$valid);*/
          if (watch === equalTo) {
            ngModel.$setValidity("equalTo", true)

            return ;
          }
          ngModel.$setValidity("equalTo", false)
        }
      }

    };
  });
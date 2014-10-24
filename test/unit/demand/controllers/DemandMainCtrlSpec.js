describe('Unit controllers: DemandMain', function() {
	// Mock the myApp module
	beforeEach(module('app-main'));
	describe('DemandMainCtrl', function() {
		// Local variables
		var DemandMainCtrl, scope;
		beforeEach(inject(
			function($controller, $rootScope) {
				// Create a new child scope
				scope = $rootScope.$new();
				// Create a new instance of the DemandMainCtrl
				DemandMainCtrl = $controller('DemandMainCtrl', {
					$scope: scope
				});
			}));
		// Our tests go here
		it('should have links set', function() {
			expect(scope.links).not.toBeUndefined();
		});

	});
});
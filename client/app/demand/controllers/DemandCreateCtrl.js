angular.module('app-demand').controller('DemandCreateCtrl',  function($scope,$modal){
	$scope.test = function(){
		alert(123);
	}
	$scope.backgrounds = [];
	$scope.backgrounds.push({'serial':'背景描述1.','content':'','id':'background1'});
	$scope.addBackground = function(){
		var maxSerial = $scope.backgrounds.length+1;
		$scope.backgrounds.push({'serial':maxSerial+'.','content':'','id':'background'+maxSerial});

	};

	$scope.delBackground = function(index){
		$scope.backgrounds.splice(index,1);
		var length = $scope.backgrounds.length;
		for(i=1;i<length;i++){
			$scope.backgrounds[i].serial = i+1+'.';
			$scope.backgrounds[i].id = 'background'+(i+1);

		}
	};

	$scope.demands = [];
	$scope.demands.push({'serial':'需求描述1.','content':'','id':'demand1'});
	$scope.addDemand = function(){
		var maxSerial = $scope.demands.length+1;
		$scope.demands.push({'serial':maxSerial+'.','content':'','id':'demand'+maxSerial});

	};

	$scope.delDemand = function(index){
		$scope.demands.splice(index,1);
		var length = $scope.demands.length;
		for(i=1;i<length;i++){
			$scope.demands[i].serial = i+1+'.';
			$scope.demands[i].id = 'demand'+(i+1);

		}
	};


	$scope.openPeopleAssign = function () {

	  var modalInstance = $modal.open({
	    templateUrl: 'app/demand/views/personSelect.html',
	    controller: 'PersonSelectCtrl',
	    // size: size
	  });
	};

});
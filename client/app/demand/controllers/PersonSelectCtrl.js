angular.module('app-demand').controller('PersonSelectCtrl',  function($scope){
	$scope.test = function (){
		alert(88)
	};
	$scope.disablePrePage = true;
	$scope.persons = [];
	$scope.persons.push({'name':'张三','image':'assets/images/head.png'});
	$scope.persons.push({'name':'张三','image':'assets/images/head.png'});
	$scope.persons.push({'name':'张三','image':'assets/images/head.png'});
	$scope.persons.push({'name':'张三','image':'assets/images/head.png'});
	$scope.persons.push({'name':'张三','image':'assets/images/head.png'});

	$scope.nextPage = function (){
		$scope.disablePrePage = false;
		$scope.persons.length = 0;
		$scope.persons.push({'name':'李四','image':'assets/images/head.png'});
		$scope.persons.push({'name':'李四','image':'assets/images/head.png'});
		$scope.persons.push({'name':'李四','image':'assets/images/head.png'});
	}


})
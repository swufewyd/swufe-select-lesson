angular.module('app-demand').controller('DemandMainCtrl',  function($scope){
	$scope.links = [
	{"href":"demand.create","text":"创建需求卡片"},
	{"href":"demand.created","text":"已创建需求卡片"}
	];

	/*$scope.templates =
      [ { name: 'template1.html', url: 'demands/views/demandCreate.html'},
        { name: 'template2.html', url: 'template2.html'} ];
    $scope.template = $scope.templates[0];*/


});
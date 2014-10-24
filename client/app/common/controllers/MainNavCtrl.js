angular.module('app-common').controller('MainNavCtrl',  function($scope,MainNavbarService){
	// $scope.navbar = {};


    // $scope.navs = [
    // 	{"url":"demand.create","name":"需求卡片"},
    // 	{"url":"task","name":"任务卡片"},
    // 	{"url":"msg","name":"消息中心"}
    // ];
    $scope.active = MainNavbarService.actived;
	/*$scope.test = function(){
		// $scope.navs[0].active = "active";
		console.log(MainNavbarService.actived);
	};
	$scope.test();*/
});
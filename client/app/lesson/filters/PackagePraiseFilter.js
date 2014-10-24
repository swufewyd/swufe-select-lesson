angular.module('app-lesson').filter('PackagePraise',function(){
	return function(arr){

		if(arr>0){
			return "("+arr+")";
		}else{
			return;
		}
	};
});
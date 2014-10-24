angular.module('app-lesson').filter('CommentsAmount',function(){
	return function(arr){

		if(arr.length>0){
			return arr.length+'条';
		}else{
			return;
		}
	};
});
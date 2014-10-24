angular.module('app-lesson').filter('FuzzySearch',function(){
	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		// searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.name.indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};
});
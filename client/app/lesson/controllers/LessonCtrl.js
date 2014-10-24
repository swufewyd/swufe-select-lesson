angular.module('app-lesson').controller('LessonCtrl',  function($scope,$http,SessionService,$modal){
	$scope.currentPage = 1;
	$scope.maxSize = 5;
	$scope.toggleTeacherArr = [];
	$scope.toggleTeacherInfoArr = [];
	$scope.toggleCommentArr = [];
	$scope.comments = [];
	for(i=0;i<10;i++){
		$scope.comments[i] = [];
	}

	//获取课程总数
	$scope.getLessonsAmount = function(search) {
		if(search){
			// typeof(search.searchLesson)!='undefined' || typeof(search.searchTeacher)!='undefined'
			console.info(typeof(search.searchLesson)!='undefined');
			// return
			$http({
				method: 'POST',
				url: '/api/getLessonsAmount/',
				data:{'search':search}
			}).success(function(data, status, headers, cfg) {
				console.info(data.lessonsAmount[0].total);
				$scope.bigTotalItems = data.lessonsAmount[0].total;

				for(i=0;i<10;i++){
					$scope.toggleTeacherArr.push(true);
				}
			}).error(function(data, status, headers, cfg) {
				alert(2);
			});
		}else{
			$http({
				method: 'POST',
				url: '/api/getLessonsAmount/'
			}).success(function(data, status, headers, cfg) {
				console.info(data.lessonsAmount[0].total);
				$scope.bigTotalItems = data.lessonsAmount[0].total;

				for(i=0;i<10;i++){
					$scope.toggleTeacherArr.push(true);
				}
			}).error(function(data, status, headers, cfg) {
				alert(2);
			});
		}

	};

	//分页获取课程信息
	$scope.getLessonsGroupByCode = function(currentPage,search) {
		if(search){
			var postData = {'currentPage': currentPage,'search':search};
		}else{
			var postData = {'currentPage': currentPage};
		}
		$http({
			method: 'POST',
			url: '/api/getLessonsGroupByCode/',
			data:postData
		}).success(function(data, status, headers, cfg) {
			console.info(data);
			var lessonsAmountCurrentPage = data.lessons.length;
			for(i=0;i<lessonsAmountCurrentPage;i++){
				$scope.toggleTeacherInfoArr[i] = [];
				$scope.toggleCommentArr[i] = [];

				for(j=0;j<data.lessons[i].teacher_info.length;j++){
					$scope.toggleTeacherInfoArr[i][j] = true;
					$scope.toggleCommentArr[i][j] = true;
				}
			}
			console.info($scope.toggleCommentArr);
			$scope.lessons = data.lessons;
		}).error(function(data, status, headers, cfg) {
			alert(2);
		});

	};

	//显示评论列表
	$scope.listComment = function(a,b) {
		$scope.toggleCommentArr[a][b]=!$scope.toggleCommentArr[a][b];


	};

	//提交评论
	$scope.submitComment = function(a,b) {
		/*console.info($scope.lessons[a].name);
		console.info($scope.lessons[a].teacher_info[b].teacher_name);
		console.info($scope.comments[a][b]);*/
		SessionService.getSessionData().then(function(dataResponse) {

            if(dataResponse.data.isLogin==="0"){
              // alert('请登录!');
              var modalInstance = $modal.open({
                templateUrl: 'app/auth/views/slogin.html',
                // controller: 'SloginCtrl',
                backdrop : 'static'
                // size: 'lg'
              });

            }else{
            	$http({
            		method: 'POST',
            		url: '/api/lesson/submitComment/',
            		data:{"lesson":$scope.lessons[a].name,"teacher":$scope.lessons[a].teacher_info[b].teacher_name,"content":$scope.comments[a][b],"user_id":dataResponse.data.user_id}
            	}).success(function(data, status, headers, cfg) {
            		// alert(data.msg);
            		$scope.refreshComment(a,b);
            		console.info($scope.toggleTeacherArr);
            		console.info($scope.toggleCommentArr);
            		/*$scope.toggleTeacherArr[a] = false;
            		$scope.toggleCommentArr[a][b] = false;*/
            	}).error(function(data, status, headers, cfg) {
            		alert(2);
            	});
            }
        });

	};

	//实时显示提交的评论
	$scope.refreshComment = function(a,b) {
		$http({
			method: 'POST',
			url: '/api/getLessonsGroupByCode/',
			data:{'currentPage': $scope.currentPage-1}
		}).success(function(data, status, headers, cfg) {
			var lessonsAmountCurrentPage = data.lessons.length;
			for(i=0;i<lessonsAmountCurrentPage;i++){
				$scope.toggleTeacherInfoArr[i] = [];
				$scope.toggleCommentArr[i] = [];

				for(j=0;j<data.lessons[i].teacher_info.length;j++){
					$scope.toggleTeacherInfoArr[i][j] = true;
					$scope.toggleCommentArr[i][j] = true;
				}
			}
			$scope.lessons = data.lessons;
			$scope.toggleTeacherArr[a] = false;
			$scope.toggleCommentArr[a][b] = false;
			$scope.comments[a][b] = "";
		}).error(function(data, status, headers, cfg) {
			alert(2);
		});
	};

	//页面跳转触发函数
	$scope.pageChanged = function() {
		//重置变量
		$scope.toggleTeacherArr = [];
		$scope.toggleTeacherInfoArr = [];
		$scope.toggleCommentArr = [];

		$scope.comments = [];
		for(i=0;i<10;i++){
			$scope.toggleTeacherArr.push(true);
			$scope.comments[i] = [];
		}
		console.log('Page changed to: ' + $scope.currentPage);
		if($scope.searchObj){
			$scope.getLessonsGroupByCode($scope.currentPage-1,$scope.searchObj);
		}else{
			$scope.getLessonsGroupByCode($scope.currentPage-1);
		}

	};


	//赞课程
	$scope.praiseLesson = function(a,b) {
		SessionService.getSessionData().then(function(dataResponse) {

            if(dataResponse.data.isLogin==="0"){
              // alert('请登录!');
              var modalInstance = $modal.open({
                templateUrl: 'app/auth/views/slogin.html',
                // controller: 'SloginCtrl',
                backdrop : 'static'
                // size: 'lg'
              });

            }else{
            	$http({
            		method: 'POST',
            		url: '/api/lesson/praiseLesson/',
            		data:{"lesson":$scope.lessons[a].name,"teacher":$scope.lessons[a].teacher_info[b].teacher_name,"user_id":dataResponse.data.user_id}
            	}).success(function(data, status, headers, cfg) {
            		if(data.key){
            			$scope.refreshPraise(a);
            		}else{
            			alert(data.msg);
            		}

            	}).error(function(data, status, headers, cfg) {
            		alert(2);
            	});
            }
        });

	};


	//及时刷新赞
	$scope.refreshPraise = function(a) {
		$http({
			method: 'POST',
			url: '/api/getLessonsGroupByCode/',
			data:{'currentPage': $scope.currentPage-1}
		}).success(function(data, status, headers, cfg) {
			var lessonsAmountCurrentPage = data.lessons.length;
			for(i=0;i<lessonsAmountCurrentPage;i++){
				$scope.toggleTeacherInfoArr[i] = [];
				$scope.toggleCommentArr[i] = [];

				for(j=0;j<data.lessons[i].teacher_info.length;j++){
					$scope.toggleTeacherInfoArr[i][j] = true;
					$scope.toggleCommentArr[i][j] = true;
				}
			}
			$scope.lessons = data.lessons;
			$scope.toggleTeacherArr[a] = false;
		}).error(function(data, status, headers, cfg) {
			alert(2);
		});
	};


	//条件搜索
	$scope.searchFuzzy = function() {
		/*swal({
				title: "Are you sure?",
				text: "Your will not be able to recover this imaginary file!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			}, function() {
				swal("Deleted!", "Your imaginary file has been deleted.", "success");
			});*/
		$scope.searchObj = {};
		$scope.searchObj.searchLesson = $scope.searchLesson;
		$scope.searchObj.searchTeacher = $scope.searchTeacher;
		$scope.getLessonsAmount($scope.searchObj);
		$scope.getLessonsGroupByCode(0,$scope.searchObj);
	};

	//以下为立即执行
	$scope.getLessonsAmount();
	$scope.getLessonsGroupByCode(0);


});
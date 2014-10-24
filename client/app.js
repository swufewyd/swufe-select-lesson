'use strict';
var commonModule = angular.module('app-common',[]);
var authModule = angular.module('app-auth',[]);
var homeModule = angular.module('app-home',[]);
var demandModule = angular.module('app-demand',[]);
var taskModule = angular.module('app-task',[]);
var lessonModule = angular.module('app-lesson',[]);
var lessonModule = angular.module('app-welcome',[]);
var mainModule = angular.module('app-main',['ui.router','ui.bootstrap','app-common','app-auth','app-home','app-demand','app-task','app-lesson','app-welcome']);

/*angular.module('meanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap'
])*/
mainModule.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    // For any unmatched url, redirect to /state1
    $locationProvider.html5Mode(true);
     $urlRouterProvider.otherwise("/home");
     //
     // Now set up the states
     $stateProvider
       .state('login', {
         url: "/login",
         templateUrl: "app/auth/views/login.html",
         controller: 'LoginCtrl'
       }).state('reg', {
         url: "/reg",
         templateUrl: "app/auth/views/reg.html",
         controller: 'RegCtrl'
       }).state('home', {
         url: "/home",
         templateUrl: "app/home/views/home.html",
         controller: 'HomeCtrl'
       }).state('demand', {
         url: "/demand",
         abstract: true,
         templateUrl: "app/demand/views/demandMain.html",
         controller: 'DemandMainCtrl'
       }).state('demand.create', {
         url: "/create",
         templateUrl: "app/demand/views/demandCreate.html",
         controller: 'DemandCreateCtrl'
       }).state('demand.created', {
         url: "/created",
         templateUrl: "app/demand/views/demandCreated.html",
         // controller: 'demandMainCtrl'
       }).state('task', {
         url: "/task",
         // abstract: true,
         templateUrl: "app/task/views/task.html",
         // controller: 'demandMainCtrl'
       }).state('lesson', {
         url: "/lesson",
         // abstract: true,
         templateUrl: "app/lesson/views/lesson.html",
         controller: 'LessonCtrl'
       }).state('welcome', {
         url: "/welcome",
         templateUrl: "app/welcome/views/welcome.html",
         controller: 'WelcomeCtrl'
       })

});
  /*mainModule.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/common/views/login.html',
        controller: 'LoginCtrl'
      }).
      when('/reg', {
        templateUrl: 'app/common/views/reg.html',
        controller: 'RegCtrl'
      }).
      when('/home', {
        templateUrl: 'app/home/views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/demand', {
        templateUrl: 'app/demand/views/demandMain.html',
        controller: 'demandMainCtrl'
      }).
      when('/task', {
        templateUrl: 'app/task/views/task.html',
        // controller: 'demandMainCtrl'
      }).
      when('/demand/create', {
        templateUrl: 'app/demand/views/demandCreate.html',
        // controller: 'demandMainCtrl'
      }).
      when('/demand/created', {
        templateUrl: 'app/demand/views/demandCreated.html',
        // controller: 'demandMainCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });

    $locationProvider.html5Mode(true);
  });*/

//只有第一次加载和f5刷新的时候会执行,页面内跳转不执行,事件除外
mainModule.run(function($http,$location,$rootScope,SessionService,MainNavbarService){
  /*$rootScope.$on('$routeChangeStart',function(evt, next, current) {

      SessionService.getSessionData().then(function(dataResponse) {
          // console.log(dataResponse.data);
          if(dataResponse.data.isLogin==="0"){
            $location.path('/login');
          }else{
            // $rootScope.loginFlag=false;
          }
      });
  });*/

    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams,fromState,fromParams) {
      /*console.log(next);
      console.log(current);
      console.log(next.indexOf("demand"));*/

      /*if(next.indexOf("demand")>=0){
        $rootScope.navbar.actived = [true,false,false];
      }else if(next.indexOf("task")>=0){
        $rootScope.navbar.actived = [false,true,false];
      }else if(next.indexOf("msg")>=0){
        $rootScope.navbar.actived = [false,false,true];
      }else if(next.indexOf("home")>=0){
        $rootScope.navbar.actived = [false,false,false];
      }*/


      if(toState.name.indexOf("demand")>=0){
        MainNavbarService.actived = [true,false,false];
      }else if(toState.name.indexOf("lesson")>=0){
        MainNavbarService.actived = [false,true,false];
      }else if(toState.name.indexOf("msg")>=0){
        MainNavbarService.actived = [false,false,true];
      }else if(toState.name.indexOf("home")>=0){
        MainNavbarService.actived = [false,false,false];
      }

      /*if(toState.name!="home" && toState.name!="welcome"){
        SessionService.getSessionData().then(function(dataResponse) {
            if(dataResponse.data.isLogin==="0"){
              $location.path('/login');
            }else{
            }
        });
      }*/

    });
});
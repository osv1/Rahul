var app = angular.module("app", ['ui.router','ngResource']);

app.factory("userService",function($resource)
{
  return{
    getproduct:function(){
      return $resource('http://172.10.1.7:4044/task');
     },
     postproduct:function(){
      return $resource('http://172.10.1.7:4044/addtask');
    }
  }
});


app.config(function($stateProvider,$urlRouterProvider)
     {
        $urlRouterProvider.otherwise('/home');
    
       $stateProvider
       .state('login',{
        url: '/login',
        templateUrl:"./users/login.html",
        controller  : 'loginController'
       })
         .state('register',{
          url:'/register',
          templateUrl:"./users/register.html",
          controller:'registerController'
       })
         .state('about',{
            url:'/about',
            templateUrl:"./users/about.html"
         })
         .state('contact',{
            url:'/contact',
            templateUrl:"./users/contact.html"
         })
        

         .state('documentation',{
            url:'/documentation',
            templateUrl:"./users/documentation.html"
         })
         .state('documentation.angularjs',
         {
            url:'/angularjs',
            templateUrl:"./users/Mean.html"
         })
          .state('home',{
          url:'/home',
          templateUrl:"./users/home.html"
       })
           .state('topquestion',{
          url:'/topquestion',
          templateUrl:"./users/topquestion.html",                        
        
       })
          






.state('tour',{
          url:'/tour',
          templateUrl:"./users/tour.html",                        
          controller:'tourController'
       })



       /*    .state('topquestion.qq',
           {
            url:'/getuser',
            templateUrl:"./users/tab.html",
             controller:'topController'
           })
           

*/



            .state('postyouranswer',{
          url:'/postyouranswer',
          templateUrl:"./users/postyouranswer.html"
       })



.state('askquestions',{
          url:'/askquestions',
          templateUrl:"./users/askquestions.html"
       })
.state('askquestions.ask',
         {
            url:'/ask',
            templateUrl:"./users/ask.html",
            controller:'askController'
         })







.state('edit',
{
  url:'/edit/:user',
  templateUrl:"./users/edit.html",
  controller:'tourController'
})


/*.state('about', {
            url: '/about',
            views: {
                "header": { 
                    templateUrl: "./users/h.html" 
                },
                "content": { 
                    templateUrl: "./users/about.html"
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })*/
});

//app.factory('product', ['$resource',function($resource) {
  //return $resource('http://172.10.1.7:4044/task/addtask');
//}]);


app.controller('loginController', function($scope,$http) {
        $scope.login  =function(vm){
          $http.post("http://172.10.1.7:4044/task/login",vm).then(function(response)
          {
           
          })
        }
        console.log("login success");
    });

app.controller('registerController', function($scope,$http) {
        $scope.register  =function(user){
          $http.post("http://172.10.1.7:4044/task/addtask",user).then(function(response)
          {
            console.log("reg success");
          })
        }
    });

 // app.controller('registerController', function($scope,$location,$stateParams,$resource,userService) {
 //       // $scope.getUsers =function(){
 //         // $http.get("http://172.10.1.7:4044/task").then(function(response)
 //         userService.postUsers().save(function(response)
 //          {
 //            console.log('response',response);
 //            if(response.code==200)
 //            {
 //              $scope.users=response.data;
 //            }else{
 //              alert('no record');
 //            }
 //          }),function(response){
 //            alert('error');
 //          }
 //        });














app.controller('askController', function($scope,$http) {
        $scope.question  =function(vm){
          $http.post("http://172.10.1.7:4044/task/addtask",vm).then(function(response)
          {
            console.log("reg success");
          })
        }
    });





//app.controller('tourController', function($scope,$http,$location,$stateParams) {
  app.controller('tourController', function($scope,$location,$stateParams,$resource,userService) {
       // $scope.getUsers =function(){
         // $http.get("http://172.10.1.7:4044/task").then(function(response)
         userService.getUsers().get(function(response)
          {
            console.log('response',response);
            if(response.code==200)
            {
              $scope.users=response.data;
            }else{
              alert('no record');
            }
          }),function(response){
            alert('error');
          }
        });
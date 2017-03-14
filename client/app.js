


var app = angular.module("app", ['ui.router','ngResource', 'toastr','ngTable','angularUtils.directives.dirPagination','ngMessages']);
app.constant('APP_CONST',{
  'API_URL':'http://172.10.1.7:4044'
});
app.factory("userService",function($resource,$stateParams,APP_CONST)
{
  return{
    getUsers:function(){
      return $resource(APP_CONST.API_URL + '/task');
     },
     postUsers:function(user){
      return $resource(APP_CONST.API_URL + '/task/addtask',user);
    },
    deleteUsers:function(id){
      return $resource(APP_CONST.API_URL + "/task/"+id);
    },
    update:function(id,user){
      return $resource(APP_CONST.API_URL + "/task/editUser/"+$stateParams.id,user);
    },
    editUser:function(){
      return $resource("http://172.10.1.7:4044/task/"+$stateParams.id);
    },
    postQuestion:function(vm){
      return $resource(APP_CONST.API_URL + '/task/addtask',vm);
    },getausers:function(){
       return $resource(APP_CONST.API_URL + "/task/".$stateParams.id);
    },



  }
});

app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
          

          if(localStorage.getItem('webToken')){
              $httpProvider.defaults.headers.common = {
            Authorization : 'Bearer ' + localStorage.getItem('webToken')
            }
          }
var auth=function(){
  console.log("resolve");
  if(localStorage.getItem('webToken'))
  {
    return
  }else{

  $location.path('/register');
  }
  }




        $urlRouterProvider.otherwise('/homeprivate');
    
       $stateProvider
      
       .state('login',{
        url: '/login',
        views:{ "header":{
                     templateUrl: "./users/headerlogin.html" 
        },
                "content": { 
                    templateUrl: "./users/login.html",
                    controller  : 'loginController'
        },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
              }
        
      
       })

       .state('homeprivate',{
        url: '/homeprivate',
        views:{ "header":{
                     templateUrl: "./users/headerlogin.html" 
        },
                "content": { 
                    templateUrl: "./users/homeprivate.html"
                   
        },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
              }
        
      
       })
     
.state('register',{
        url: '/register',
        views:{ "header":{
                     templateUrl: "./users/headerlogin.html" 
        },
                "content": { 
                    templateUrl: "./users/register.html",
                    controller  : 'registerController'
        },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
              }
        
      
       })
     





       //   .state('register',{
       //    url:'/register',
       //    templateUrl:"./users/register.html",
       //    controller:'registerController'
       // })
        

       //   .state('addlist',{
       //    url:'/addlist',
       //    templateUrl:"./users/addlist.html",
       //    controller:'registerController'
       // })
        

        .state('addlist', {
            url: '/addlist',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/addlist.html",   
                    controller:'registerController'
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })
       






        .state('about', {
            url: '/about',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/fileupload.html"
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })
         
         .state('topquestion', {
            url: '/topquestion',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/topquestion.html",
                    controller:'askController' 
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })

 .state('contact', {
            url: '/contact',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/contact.html"
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })


 .state('home', {
            url: '/home',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/home.html"
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })


 .state('askquestions', {
            url: '/askquestions',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/askquestions.html"
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })


 .state('ask', {
            url: '/ask',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/ask.html",
                    controller:'askController'

                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })




         // .state('about',{
         //    url:'/about',
         //    templateUrl:"./users/about.html"
         // })
         
        

       
//  .state('documentation', {
//             url: '/documentation',
//             views: {
//                 "header": { 
//                     templateUrl: "./users/headerlogin.html" 
//                 },
//                 "content": { 
//                     templateUrl: "./users/documentation.html"
//                 },
//                 "footer": { 
//                     templateUrl: "./users/f.html" 
//                 }
//             }
//         })
 
// .state('documentation.angularjs', {
//             url: '/angularjs',
//             views: {
//                 "header": { 
//                     templateUrl: "./users/headerlogin.html" 
//                 },
//                 "content": { 
//                     templateUrl: "./users/fileupload.html"
//                 },
//                 "footer": { 
//                     templateUrl: "./users/f.html" 
//                 }
//             }
//         })
 



       
        .state('tour', {
            url: '/tour',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/tour.html",
                    controller:'tourController'
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            },
            resolve:{
              auth:auth
            }
        })
 


// .state('askquestions',{
//           url:'/askquestions',
//           templateUrl:"./users/askquestions.html"
//        })
// .state('askquestions.ask',
//          {
//             url:'/ask',
//             templateUrl:"./users/ask.html",
//             controller:'askController'
//          })
// .state('ask',
//          {
//             url:'/ask',
//             templateUrl:"./users/ask.html",
//             controller:'askController'
//          })


 .state('postUsers', {
            url: '/postlist',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/addlist.html",
                    controller:'tourController'
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })


 .state('edit', {
            url: '/edit/:id',
            views: {
                "header": { 
                    templateUrl: "./users/headerlogin.html" 
                },
                "content": { 
                    templateUrl: "./users/edit.html",
                    controller:'tourController'
                },
                "footer": { 
                    templateUrl: "./users/f.html" 
                }
            }
        })

 
});

app.controller('myController', function($scope,$http,$location,$stateParams){

        var token = localStorage.getItem('webToken');         
        if(token!= null){
            $scope.isuserlogin = true;
        }else{
            $scope.isuserlogin = false;
        }
        $scope.logout = function(){
            localStorage.removeItem('webToken');
          console.log('token')
            window.location = 'homeprivate';
        };
    });


app.controller('loginController', function($scope,$http,toastr,$location) {
        $scope.login  =function(vm){
          $http.post("http://172.10.1.7:4044/task/login",vm).then(function(response)
          {


            if(response.data.code==200)
            {
              console.log(response);
              console.log(response.data.token);
              localStorage.setItem('webToken', response.data.data.token);
                
                 toastr.success('success');      
              $location.path('/askquestions');
               $scope.users=response.data.data;
            }else{
             toastr.error('Failed'); 
              console.log(response);
            }
           
          })
        }
    });


app.controller('askController', function($scope,$location,toastr,$stateParams,$resource,userService) {
        $scope.question  =function(vm){
          
          console.log(vm);
         userService.postQuestion().save(vm,function(response)
          {
            console.log('response',response);
            if(response.code==200)
            {
                     
              $location.path('/topquestion');
               $scope.users=response.data;
            }else{
              alert('no record');
            }
          },function(response){
            alert('error');
          });
        
      }
    });



app.controller('registerController', function($scope,$location,toastr,$stateParams,$resource,userService) {
       
      
         $scope.register=function(user)

          {console.log(user);
         userService.postUsers().save(user,function(response)
          {
            console.log('response',response);
            if(response.code==200)
            {
                   
              $location.path('/login');
               $scope.users=response.data;
            }else{
              alert('no record');
            }
          },function(response){
            alert('error');
          });
        
      };
    });

  app.controller('tourController', function($scope,$location,$stateParams,$resource,toastr,userService) {
       $scope.getUser =function(){
         
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
        }

       $scope.getauser =function(){
         
         userService.getauser($stateParams.id).get(function(response)
          { 

            console.log('response',response);
            if(response.code==200)


            {
              
              $scope.users=response.data[0];
        

            }else{
              alert('no record');
            }
          }),function(response){
            alert('error');
          }
        }



     
   $scope.deleteUser =function(id){
    console.log(id);
     userService.deleteUsers(id).delete(function(response)
          {
            
            if(response.data.code==200)

            {
              
             console.log('response',response);
              
            }else{
              console.log(response)
            }
            $scope.getUser();
          })
  }
 

    

      
 $scope.editUser=function(id){
  console.log(id);
  $location.path('/edit/'+id);
 }


     $scope.geteditUsers=function(){
      console.log($stateParams.id)
      userService.editUser($stateParams.id).get(function(response)
      {
         console.log(response);
         if(response.code==200){

         $scope.user=response.data; 
       }else{
        alert('no record found');
       }
      });
    }
 $scope.edit=function(user)
  {
    console.log(user);
   userService.update($stateParams.id).save(user,function(response){

     if(response.code==200){
               toastr.success('Update', 'success');
     console.log(response);
     $scope.users=response.data[0];
     $location.path('/tour');

   }else{
    console.log(response);
   }

 },function(response){
  console.log("error");
 })
 }
/*------------------------*/



});



// ------------------------------------------------------------------------------

// var myApp = angular.module('myApp', []);
// function Main($scope, $http){
  
//   $http.get('http://api.randomuser.me/?results=20').success(function(data) {
//     $scope.users = data.results;
//     $('#loader').hide();
//     $('#userList').show();
//   }).error(function(data, status) {
//     alert('get data error!');
//   });
  
//   $scope.showUserModal = function(idx){
//     var user = $scope.users[idx].user;
//     $scope.currUser = user;
//     $('#myModalLabel').text(user.name.first
//          + ' ' + user.name.last);
//     $('#myModal').modal('show');
//   }
 
// }    

// --------------------------------------------------------------------------------
// 
















































































  /* $scope.delete = function(index){
     $scope.users.splice(index,1);
   }
      
   $scope.save = function(index){
     $scope.users[index].editable = false;
     
   }
      
   $scope.add = function(){
     $scope.users.push({
        name : "",
        country : "",
        editable : true
     })
   }
  });

*/





//  $scope.deleteUser =function(id){
//           $http.delete("http://172.10.1.7:4044/task/"+id).then(function(response)
//           {
//             console.log(response);
//             if(response.data.code==200)
//             {
//               console.log("deleted")
//               $scope.getUsers();
//             }else{
//               console.log("not deleted")
//             }
//           })



//         }
 
 // { 
       //  $location.path("register");
       // }
         // $http.get("http://172.10.1.7:4044/task").then(function(response)







// $scope.geteditUsers=function(){
//       console.log($stateParams.user);
//       $http.get("http://172.10.1.7:4044/task/"+$stateParams.user).then(function(response)
//       {
//         console.log(response);
//         $scope.user=response.data.data[0];
//       })
//      }   
      
//   $scope.editUser=function(id){
//     console.log(id);
//     $location.path('/edit/'+id);
//   }

// $scope.edit=function(user)
// {
//   $http.put('/task/editUser/'+user._id,user).then(function(response)
//   {
//     console.log("updated");
//   },
//   function(response)
//   {
//     console.log("not");
//   });

// }






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


//app.factory('product', ['$resource',function($resource) {
  //return $resource('http://172.10.1.7:4044/task/addtask');
//}]);













// app.controller('registerController', function($scope,$http) {
//         $scope.register  =function(user){
//           $http.post("http://172.10.1.7:4044/task/addtask",user).then(function(response)
//           {
//             console.log("reg success");
//           })
//         }
//     });


/*var app = angular.module("app", ['ngRoute']);
app.config(function($routeProvider)
     {
        
       $routeProvider.
       when('/',  {templateUrl:'./users/login.html' } )
      .when('/simple', {
                templateUrl : './users/simple.html'})
       .when('/register', {
                templateUrl : './users/register.html'})
                  });
        app.controller('mainController', function($scope) {

    });
*/























































/*
var app = angular.module("app", ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/Pageclick");

    $stateProvider
        .state("Pageclick", {
            url: "/Pageclick",
            templateUrl: "Pageclick.html"
        })
        .state("Pageclick.login", {
            url: "/Page1",
            templateUrl: "login.html"
        })
        .state("Pageclick.register", {
            url: "/Page2",
            templateUrl: "register.html"
         })
        .state("Pageclick.simple", {
            url: "/Page3",
            templateUrl: "simple.html"
        });
});
















/*
var app = angular.module('app', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/users/login.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/register', {
                templateUrl : '/users/register.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/simple', {
                templateUrl : '/users/simple.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });
app.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

app.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

















/*var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/addStudent', {
      templateUrl: 'addStudent.htm', controller: 'AddStudentController'
   })
   
   .when('/viewStudents', {
      templateUrl: 'viewStudents.htm', controller: 'ViewStudentsController'
   })
   
   .otherwise({ redirectTo: '/addStudent'
   });
    
}]);*/
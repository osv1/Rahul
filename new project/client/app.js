var app = angular.module("app", ['ui.router', 'ngResource', 'toastr', 'ngTable', 'angularUtils.directives.dirPagination', 'ngMessages']);
app.constant('APP_CONST', {
    'API_URL': 'http://172.10.1.7:4044'
});
app.factory("userService", function($resource, $stateParams, APP_CONST) {
    return {
        getUsers: function() {
            return $resource(APP_CONST.API_URL + '/task');
        },
         getquestion: function() {
            return $resource(APP_CONST.API_URL + '/question');
        },
        postUsers: function(user) {
            return $resource(APP_CONST.API_URL + '/task/addtask', user);
        },
        postanswer: function(id) {
            return $resource(APP_CONST.API_URL + '/question/addanswer/'+id);
        },
        deleteUsers: function(id) {
            return $resource(APP_CONST.API_URL + "/task/" + id);
        },
        deletequestion: function(id) {
            return $resource(APP_CONST.API_URL + "/question/" + id);
        },
        update: function() {
            return $resource(APP_CONST.API_URL + "/task/myaccount");
        },
        getanswer: function(id) {
            return $resource(APP_CONST.API_URL + "/question/"+id );
        },
        showanswer: function() {
            return $resource(APP_CONST.API_URL + '/question/populateall' );
        },



        editUser: function(user) {
            return $resource("http://172.10.1.7:4044/task/editUser", user);
        },
        postQuestion: function(vm) {
            return $resource(APP_CONST.API_URL + '/task/addtask', vm);
        },
         postQuestionw: function(vms) {
            return $resource(APP_CONST.API_URL + '/question/addquestion', vms);
        },
        getauserr: function() {
            return $resource(APP_CONST.API_URL + '/task/myaccount', {}, {
                get: {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('webToken')
                    }
                }
            });

        }
    }
});
app.factory('httpRequestInterceptor', function($q, $rootScope, $location) {
    return {
        request: function(config) {
            console.log("config", config);

            if (localStorage.getItem('webToken'))
                config.headers.Authorization = 'Bearer ' + localStorage.getItem('webToken')
            return config;
        },
        response: function(response) {
            //globalMessage.clear();
            var curPath = $location.path();
            $rootScope.curPage = curPath;
            if (response.data.code == 200) {
                $rootScope.isLoading = true;
                // if((curPath != '/') && (curPath != '/user/registrastion')){
                //     Flash.create('danger', 'You need to log in.');
                //     $location.path('/');
                // }
            } else {
                $rootScope.isLoading = false;
                // if((curPath == '/') && (curPath == '/user/registrastion')){
                //     Flash.create('success', 'You have already logged in to the system.');
                //     $location.path('/user/home');
                // }
                // if(curPath == '/tour')
                // {
                //   $location.path('login');
                // }
            }

            return response || $q.state(response);
        }
    };
});
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
    var authr = function() {
        console.log(" resolve")
        if (localStorage.getItem("webToken")) {
            return
        } else {
            $location.path('/register');
        }
    }

    var auth = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get("http://172.10.1.7:4044/task/auth").success(function(response) {
            deferred.resolve();
        });
        return deferred.promise;
    };
    $urlRouterProvider.otherwise('/homeprivate');

    $stateProvider

        .state('login', {
            url: '/login',
            views: {
                "header": {
                    templateUrl: "./users/headerlogin.html"
                },
                "content": {
                    templateUrl: "./users/login.html",
                    controller: 'loginController'
                },
                "footer": {
                    templateUrl: "./users/f.html"
                }
            }


        })
        .state('homeprivate', {
            url: '/homeprivate',
            views: {
                "header": {
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
        .state('help', {
            url: '/help',
            views: {
                "header": {
                    templateUrl: "./users/headerlogin.html"
                },
                "content": {
                    templateUrl: "./users/help.html"

                },
                "footer": {
                    templateUrl: "./users/f.html"
                }
            }


        })
        

    .state('register', {
        url: '/register',
        views: {
            "header": {
                templateUrl: "./users/headerlogin.html"
            },
            "content": {
                templateUrl: "./users/register.html",
                controller: 'registerController'
            },
            "footer": {
                templateUrl: "./users/f.html"
            }
        }


    })


    .state('addlist', {
        url: '/addlist',
        views: {
            "header": {
                templateUrl: "./users/headerlogin.html"
            },
            "content": {
                templateUrl: "./users/addlist.html",
                controller: 'registerController'
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
                templateUrl: "./users/about.html"
            },
            "footer": {
                templateUrl: "./users/f.html"
            }
        },
        resolve: {
            auth: auth
        }
    })

    .state('welcome', {
            url: '/profile',
            views: {
                "header": {
                    templateUrl: "./users/headerlogin.html"
                },
                "content": {
                    templateUrl: "./users/profile.html",
                    controller: 'askController'
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
                    controller: 'askController'
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
        .state('admin/question', {
            url: '/admin/question',
            views: {
                "header": {
                    templateUrl: "./users/headerlogin.html"
                },
                "content": {
                    templateUrl: "./users/questionlist.html"
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
                    controller: 'askController'
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



    .state('documentation', {
        url: '/documentation',
        views: {
            "header": {
                templateUrl: "./users/headerlogin.html"
            },
            "content": {
                templateUrl: "./users/documentation.html"
            },
            "footer": {
                templateUrl: "./users/f.html"
            }
        }
    })

    .state('documentation.angularjs', {
        url: '/angularjs',
        templateUrl: "./users/Mean.html"
    })



    .state('admin/userlist', {
        url: '/admin/userlist',
        views: {
            "header": {
                templateUrl: "./users/headerlogin.html"
            },
            "content": {
                templateUrl: "./users/userlist.html",
                controller: 'tourController'
            },
            "footer": {
                templateUrl: "./users/f.html"
            }
        }
    })

    .state('postUsers', {
            url: '/postlist',
            views: {
                "header": {
                    templateUrl: "./users/headerlogin.html"
                },
                "content": {
                    templateUrl: "./users/addlist.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/f.html"
                }
            }
        })
        .state('edit', {
            url: '/edit/',
            views: {
                "header": {
                    templateUrl: "./users/headerlogin.html"
                },
                "content": {
                    templateUrl: "./users/edit.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/f.html"
                }
            }
        })
        .state('answerpost', {
            url: '/answerpost/',
            views: {
                "header": {
                    templateUrl: "./users/headerlogin.html"
                },
                "content": {
                    templateUrl: "./users/answerpost.html",
                    controller: 'askController'
                },
                "footer": {
                    templateUrl: "./users/f.html"
                }
            }
        })

});
app.controller('myController', function($scope, $http, $location, $stateParams) {
    var token = localStorage.getItem('webToken');
    if (token != null) {
        $scope.isuserlogin = true;
    } else {
        $scope.isuserlogin = false;
    }
    $scope.logout = function() {
        localStorage.removeItem('webToken');
        console.log('token')
        window.location = '/';
    };
});
app.controller('loginController', function($scope, $http, toastr, $location) {
    $scope.login = function(vm) {
        $http.post("http://172.10.1.7:4044/task/login", vm).then(function(response) {
            if (response.data.code == 200) {
                console.log(response);
                console.log(response.data.data.token);
                localStorage.setItem('webToken', response.data.data.token);

                toastr.success('success');
                $location.path('/topquestion');
                $scope.users = response.data.data;
            } else {
                toastr.error('Failed');
                console.log(response);
            }

        })
    }
});




app.controller('askController', function($scope, $location, toastr, $stateParams, $resource, userService) {
 
$scope.questionw = function(vms) {

        console.log(vms);
        userService.postQuestionw().save(vms, function(response) {
            console.log('response', response);
            if (response.code == 200) {

                $location.path('/topquestion');
                $scope.users = response.data;
            } else {
                alert('no record');
            }
        }, function(response) {
            alert('error');
        });

    }
 $scope.postanswer = function(id,answer) {

        console.log(answer,id);
        userService.postanswer(id).save({answer,id}, function(response) {

            console.log('response', response);
            if (response.code == 200) {
              

                $location.path('/topquestion');
            } else {
                alert('no record');
            }
        }, function(response) {
            alert('error');
        });

    }


    $scope.loadanswer = function() {
        userService.showanswer().get(function(response) {

            console.log(response.data);

            if (response.code == 200) {

                $scope.users = response.data;

             
            } else {
                alert('No record found');
            }
        })

    }

    $scope.getauser = function() {

        userService.getauserr().get(function(response) {
                console.log("ssssss")
                if (response.code == 200) {

                    $scope.users = response.data;

                } else {
                    console.log(response);
                }
            }),
            function(response) {
                alert('error');
            }
    }
});
app.controller('registerController', function($scope, $location, toastr, $stateParams, $resource, userService) {


    $scope.register = function(user) {
        console.log(user);
        userService.postUsers().save(user, function(response) {
            console.log('response', response);
            if (response.code == 200) {

                $location.path('/login');
                $scope.users = response.data;
            } else {
                alert('no record');
            }
        }, function(response) {
            alert('error');
        });

    };
});
app.controller('tourController', function($scope, $location, $stateParams, $resource, $rootScope, toastr, userService) {
   


    $scope.getUser = function() {

        userService.getUsers().get(function(response) {
                console.log('response', response);
                if (response.code == 200) {

                    $scope.users = response.data;

                } else {
                    alert('no record');
                }
            }),
            function(response) {
                alert('error');
            }
    }

$scope.getquestion = function() {

        userService.getquestion().get(function(response) {
                console.log('response', response);
                if (response.code == 200) {

                    $scope.users = response.data;

                } else {
                    alert('no record');
                }
            }),
            function(response) {
                alert('error');
            }
    }

    $scope.deleteUser = function(id) {
        console.log(id);
        userService.deleteUsers(id).delete(function(response) {

            if (response.data.code == 200) {

                console.log('response', response);

            } else {
                console.log(response)
            }
            $scope.getUser();
        })
    }
 $scope.deletequestion = function(id) {
        console.log(id);
        userService.deletequestion(id).delete(function(response) {

            if (response.data.code == 200) {

                console.log('response', response);

            } else {
                console.log(response)
            }
            $scope.loadanswer();
        })
    }


$scope.answerpost = function(id) {
    userService.getanswer(id).get(function(response) {
            console.log(response);
            if (response.code == 200) {
                console.log(response);
                $rootScope.user = response.data;
            } else {
                alert('no record found');
            }
        });

        $location.path('/answerpost/');
    }

    $scope.editUser = function() {
        $location.path('/edit/');
    }
    $scope.geteditUsers = function() {

        userService.update().get(function(response) {
            console.log(response);
            if (response.code == 200) {
                $rootScope.user = response.data;
            } else {
                alert('no record found');
            }
        });
    }
    $scope.edit = function(user) {

            userService.editUser().save(user, function(response) {
                if (response.code == 200) {
                    toastr.success('Update', 'success');
                    console.log(response);
                    $location.path('/profile');
                } else {
                    console.log(response);
                }
            }, function(response) {
             
            })
        }
        /*------------------------*/
});
app.controller('imageUploadCtrl', function($scope, $rootScope, $location, $http, toastr) {
    $scope.uploadFile = function() {
        var file = $scope.myFile;
        var userDetails = $localStorage.userDetails;
        console.log('userid' + userDetails._id);
        var uploadUrl = "/users/upload/" + userDetails._id;
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).success(function(results) {
            $localStorage.image = results.imagename;
            var message = results.message;
            toastr.success(message);
            $location.path('/profile');
        }).error(function() {
            var message = results.message;
            toastr.warning(message);
        });
    };
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

app.controller('loginController', function($scope,$http,$location) {
        $scope.submit  =function(user){
        	$http.post("http://172.10.1.7:4044/users/login",user).then(function(response)
        	{
        		console.log("success");
        	})
        }
    });

angular.module('App', []).controller('CrudCtrl', ['$scope',
	function($scope) {
	  $scope.Profiles = [
	      {
	        name : "Rahul",
	        country : "India",
	        editable : false
	      }
	     
	    ];
	 
	 $scope.entity = {}
	    
	 $scope.edit = function(index){
	   $scope.entity = $scope.Profiles[index];
	   $scope.entity.index = index;
	   $scope.entity.editable = true;
	 }
	    
	 $scope.delete = function(index){
	   $scope.Profiles.splice(index,1);
	 }
	    
	 $scope.save = function(index){
	   $scope.Profiles[index].editable = false;
	   
	 }
	    
	 $scope.add = function(){
	   $scope.Profiles.push({
	      name : "",
        country : "",
        editable : true
	   })
	 }
	}
]);
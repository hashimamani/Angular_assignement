/*
 * Cytonn Technologies
 *
 * @author: Hashim Amani <hamani@cytonn.com>
 *
 * Project: Angular JS.
 *
 */


angular.module('App', []).controller('CrudCtrl', ['$scope',
    function($scope) {
      $scope.Profiles = [
          {
            name : "Hashim",
            country : "Kenya",
            editable : false
          },
         
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

       $scope.searchcustomer= ''; 
       
      
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


]).controller('OrderCtrl', ['$scope',
    function($scope) {
      $scope.Orders = [
          {
            
          },
         
        ];
     
     $scope.entity = {}
        
     $scope.editorder = function(index){
       $scope.entity = $scope.Orders[index];
       $scope.entity.index = index;
       $scope.entity.editable = true;
     }
        
     $scope.deleteorder = function(index){
       $scope.Orders.splice(index,1);
     }

       $scope.searchorder= ''; 
       
      
     $scope.saveorder = function(index){
       $scope.Orders[index].editable = false;
       
     }
        
     $scope.addorder = function(){
       $scope.Orders.push({
         item : "",
        amount : "Ksh:"+"",
        editable : true
       })
     }
    }
]);
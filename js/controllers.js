angular.module('com.tm.bertspel.controllers',[])
.controller('BertSpelController',['$scope', '$window', function($scope, $window){

    angular.element($window).bind('resize', function() {
      $scope.$apply(function () {
        $scope.height = angular.element('.columns').width()+'px';
      });
    })

    $scope.count = 5;
    $scope.colorGrid = [];
    $scope.width = 100 +'%';
    $scope.height = angular.element('.columns').width()+'px';

    $scope.$watch("count", function(newValue, oldValue){
      if(Number(newValue)==newValue && newValue%1===0 && newValue > 0 && newValue < 13){

        $scope.colorGrid = (function(size){
          var grid = [];
          for(var i = 0; i < size; i++){
            grid[i] = [];
            for(var j = 0; j < size; j++){
              grid[i][j] = '';
            }
          }
          return grid;
        }
        )(newValue)

        angular.element('flippy.flipped').toggleClass('flipped');

        $scope.width = 100 +'%';
           setTimeout(function(){
             $scope.$apply(function () {
               $scope.height = angular.element('.columns').width()+'px';
            });
          },100);
      }
    });

  }
]);

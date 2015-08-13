angular.module('com.tm.bertspel.directives',[])
.directive('bsGrid',[function(){
  return {
    scope:true,
    replace:true,
    restrict:'AE',
    templateUrl: 'html/grid.html'
    }
}])
.directive('flippy', ['$timeout', function($timeout) {
  //this is modified from angular-flippy and uses the stylesheet
  return {
    restrict: 'EA',
    scope: true,
    link: function($scope, $elem, $attrs) {
      var options = {
        flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
        timingFunction: 'ease-in-out',
      };

      // setting flip options
      angular.forEach(['flippy-front', 'flippy-back'], function(name) {
        var el = $elem.find(name);
        if (el.length == 1) {
          angular.forEach(['', '-ms-', '-webkit-'], function(prefix) {
            angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration/1000 + 's ' + options.timingFunction);
          });
        }
      });

      /**
      * behaviour for flipping effect.
      */

      $scope.flip = function(row, col) {
        //$elem.toggleClass('flipped');
        flipOne($elem);
        flipOne(angular.element('#'+ (row + 1) +'-'+ col));
        flipOne(angular.element('#'+ (row - 1) +'-'+ col));
        flipOne(angular.element('#'+ row +'-'+ (col + 1)));
        flipOne(angular.element('#'+ row +'-'+ (col - 1)));
      }

      var flipOne = function(square){
        square.toggleClass('flipped');
      }

    }
  };
}])
.directive('spin', function() {
  return {
    templateUrl: 'html/spinner.html',
    scope: {
      'value' : "="
    },
    restrict: 'E',
    link: function(scope, element, attrs, ngModel) {
      var min,max,step,value,input,initial;

      element = angular.element(element);

      if(typeof attrs === 'undefined'){
        throw new Error('Spin.js attributes missing');
      } else {
        min = typeof attrs.min !== 'undefined' ? attrs.min : 0;
        max = typeof attrs.max !== 'undefined' ? attrs.max : 999;
        step = typeof attrs.step !== 'undefined' ? attrs.step : 1;

        initial = parseInt(scope.value);

        input = $("input[name='spin']",element);
        input.TouchSpin({
          min: min,
          max: max,
          stepinterval: step,
          initval: initial,
          forcestepdivisibility : 'none',
          booster : false
        });

        input.on('change', function(e){
          scope.value = input.val();

          //hack
          if(!scope.$$phase) {
            scope.$apply();
          }

        });

      }
    }
  };
});

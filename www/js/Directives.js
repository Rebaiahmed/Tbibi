
angular.module('tbibi').directive('validPasswordC', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue, $scope) {
        console.log('viewValue' + JSON.stringify(viewValue));
        var noMatch = viewValue != scope.ClientInscrire.password.$viewValue
        ctrl.$setValidity('noMatch', !noMatch)
      })
    }
  }
})

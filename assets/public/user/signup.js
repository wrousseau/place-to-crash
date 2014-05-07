

// create angular controller
app.controller('mainController', function($scope,sailsSocket) {


  $scope.$on('sailsSocket:connect', function(ev, data) {
    alert("lol");
    console.log(ev,data);
  });

  // function to submit the form after all validation has occurred            
  $scope.submitForm = function() {
    alert("lol");
    sailsSocket.emit('message',"lol",null)
    //sailsSocket.get("/user/create",{},null);
  };

});

app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});

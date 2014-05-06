
// create angular app
var validationApp = angular.module('validationApp', ['ngRoute','sails.io']);

// See: angular-sails.io.js for sailsSocketFactory
validationApp.factory('sailsSocket', function(sailsSocketFactory, $log) {

  var sailsSocket = sailsSocketFactory({ reconnectionAttempts: 10 });

  // Before connecting, you might want to first send a dummy request
  // to the server url in order to retrieve cookies.
  // (See FAQ at bottom of http://sailsjs.org/#!documentation/sockets)
  //
  // var deferred = $q.defer();
  // $http.get(sailsSocket.options.url).success(function(data, status) {
  // deferred.resolve(sailsSocket.connect());
  // }).error(function(data, status) {
  // deferred.reject({ data: data, status: status });
  // });
  // return deferred.promise;
  //
  // ...
  //
  // promise.then(function(sailsSocket) {
  // sailsSocket.get('/foo', {}, function(res) { ... });
  // });

  $log.debug('Connecting to Sails.js...');
  return sailsSocket.connect();
});

// create angular controller
validationApp.controller('mainController', function($scope,sailsSocket) {

    // function to submit the form after all validation has occurred            
    $scope.submitForm = function() {
            alert("lol");
            sailsSocket.post("/user/create",$scope.user);

    };

});

validationApp.directive("passwordVerify", function() {
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

// JQuery Styling
$(function () {
    $('.button-checkbox').each(function () {
        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});
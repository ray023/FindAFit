/* ===========================================================================
/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp

    .controller('CertsCtrl',
    function($scope, $ionicPopup, Certs, Location, Settings, $timeout) {

        $scope.siteClick = function(registrationUrl){
            window.open(registrationUrl, '_blank', 'location=yes');
        };
        $scope.hideCert = function(certName) {
            var newCerts = [];
            for (var i = 0; i < $scope.certs.length; i++) {
                if (certName !== $scope.certs[i].title)
                    newCerts.push($scope.certs[i]);
            }
            $scope.certs = newCerts;
        };

        var success_callback = function(position){
            Certs.getByLocation(position.coords.latitude, position.coords.longitude)
                .then(function (certs) {
                    $scope.certs = certs;
                    $scope.userMeasurementFactor = Settings.getUserMeasurementFactor();
                    var useCount = Settings.addUserUseCount();
                    console.log(useCount);
                    if (useCount > 0 && useCount % 5 == 0)
                    {
                        $ionicPopup.show({
                            title: 'Please review Find-A-Fit',
                            subTitle: 'Your continued use of Find-A-Fit is sincerely appreciated.  Please take a moment to leave a positive review.',
                            buttons: [
                                { text: 'Not Now' },
                                {
                                    text: '<b>Sure thing</b>',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                        window.open(Settings.getReviewLink(), '_system', 'location=yes');
                                    }
                                }
                            ]
                        });
                    }

                },
                function (statusCode) {
                    var statusMessage = 'Server Error:  ' + statusCode;
                    if (statusCode == '404')
                        statusMessage = 'Could not connect to server.  Please make sure you have network connectivity.';

                    $ionicPopup.alert({
                        title: 'Server Error: ' + statusCode,
                        okType: 'button-assertive',
                        template: statusMessage
                    });
                });
        };

        var error_callback = function(error){
            $scope.showGoogleMap = false;
            $ionicPopup.alert({
                title: 'Certs Error',
                okType: 'button-assertive',
                template: error.errorCode + ': ' + error.errorMessage
            })
        };

        $timeout(function(){console.log('Wait 2 seconds to give Ionic time to load geolocation plugin:  https://github.com/ray023/FindAFit/issues/23 ');}, 2000).then(function(){
                Location.getCurrentPosition().then(
                    success_callback,
                    error_callback
                );
            }
        );

        $scope.refreshBoxList = function() {
            Location.getCurrentPosition().then(
                success_callback,
                error_callback
            );
            $scope.$broadcast('scroll.refreshComplete');
        };

    });
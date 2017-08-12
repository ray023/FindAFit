/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp

    .controller('GpsCtrl',
    function($scope, $ionicPopup, Boxes, Location, GoogleMap, Settings, $timeout) {

        $scope.showGoogleMap = false; //Determine display on location callback
        $scope.BoxModel = Boxes;


        var success_callback = function(position){
            $scope.showGoogleMap = Settings.showGoogleMap();
            Boxes.getByLocation(position.coords.latitude, position.coords.longitude)
                .then(function (boxes) {
                    $scope.data = boxes;
                    $scope.userMeasurementFactor = Settings.getUserMeasurementFactor();
                    if (Settings.showGoogleMap() == 'true') {
                        var gm = GoogleMap.getMapData(position, boxes);
                        $scope.map = gm.map;
                        $scope.mapCircle = gm.mapCircle;
                    }

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
                title: 'GPS Error',
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

    })

    .controller('GpsDetailCtrl', function($scope, $stateParams, Boxes, Settings) {
        $scope.data = Boxes.get($stateParams.boxId);

        $scope.siteClick = function(){
            window.open($scope.data.url, '_blank', 'location=yes');
        };

        var nav_link =  $scope.data.nav_link;
        if (Settings.userNavApp() != 'Google')
            nav_link = nav_link.replace('google',Settings.userNavApp());

        $scope.navClick = function(){
            window.open(nav_link, '_system', 'location=yes');
        };

        $scope.facebookClick = function(){
            window.open($scope.data.facebook, '_blank', 'location=yes');
        };

        $scope.twitterClick = function(){
            window.open($scope.data.twitter, '_blank', 'location=yes');
        };

        $scope.instagramClick = function(){
            window.open($scope.data.instagram, '_blank', 'location=yes');
        };

        $scope.googlePlusClick = function(){
            window.open($scope.data.google_plus, '_blank', 'location=yes');
        };

        $scope.softwareLinkClick = function(){
            window.open($scope.data.software_hyperlink, '_system', 'location=yes');
        };

        $scope.upgradeClick = function(){
            window.open('http://findafit.info/index.php/getupgraded', '_blank', 'location=yes');
        };

    });
/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp

    .controller('AddressCtrl', function($scope, $ionicPopup, Address, GoogleMap, Settings) {

        var getStartPosition = function(data) {
            var position;
            if (data.start_position == false) {
                var first_box = data.affil_list[0];
                position = {
                    coords: {
                        latitude: first_box.latitude,
                        longitude: first_box.longitude
                    }
                };
            }
            else {
                position = {
                    coords: {
                        latitude: data.start_position.latitude,
                        longitude: data.start_position.longitude
                    }
                };
            }

            return position;
        };

        $scope.searchByTerm = function(search_term) {
            $scope.data         = null;
            $scope.showGoogleMap = Settings.showGoogleMap();
            if (search_term) {
                Address.getByAddress(search_term).then(
                    function(data){
                        if (data != '') {
                            $scope.data = data;
                            if (Settings.showGoogleMap() == 'true') {
                                var position = getStartPosition(data);

                                var gm = GoogleMap.getMapData(position, data.affil_list);
                                $scope.map = gm.map;
                                $scope.mapCircle = gm.mapCircle;
                            }
                            $scope.userMeasurementFactor = Settings.getUserMeasurementFactor();
                        }
                        else {
                            $ionicPopup.alert({
                                title: 'No results',
                                okType: 'button-assertive',
                                template: 'No boxes found.'
                            });
                        }
                    },
                    function(statusCode) {
                        var statusMessage = 'Server Error:  ' + statusCode;
                        if (statusCode == '404')
                            statusMessage = 'Could not connect to server.  Please make sure you have network connectivity.';

                        $ionicPopup.alert({
                            title: 'Server Error: ' + statusCode,
                            okType: 'button-assertive',
                            template: statusMessage
                        });
                    });
            }
            else {
                $ionicPopup.alert({
                    title: 'Field Required',
                    okType: 'button-energized',
                    template: 'Search term required.'
                });
            }
        };
    })

    .controller('AddressDetailCtrl', function($scope, $stateParams, Address, Settings) {

        $scope.data = Address.get($stateParams.boxId);

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
    })
;
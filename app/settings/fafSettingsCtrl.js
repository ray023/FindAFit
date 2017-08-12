/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp.controller('SettingsCtrl', function($scope, Settings) {

    $scope.data = {
            boxResultCount: Settings.getBoxResultCount(),
            boxCountList: [
                { text: "5", value: "5" },
                { text: "10", value: "10" },
                { text: "20", value: "20" },
                { text: "50", value: "50" }
            ],
            showGoogleMap:  Settings.showGoogleMap(),
            userNavApp: Settings.userNavApp(),
            navOptions: [
                { text: "Google", value: "Google" , icon: "ion-social-google-outline"},
                { text: "Apple", value: "Apple", icon: "ion-social-apple-outline"}
            ],
            getUserMeasurementFactor: Settings.getUserMeasurementFactor(),
            measurementOptions: [
                { text: "Miles", value: "1"},
                { text: "Kilometers", value: "1.609344"}
            ]
        };

    $scope.saveBoxCount = function(value){Settings.saveBoxResultCount(value)};
    $scope.saveShowGoogleMap = function(value){Settings.saveShowGoogleMap(value)};
    $scope.saveUserNavApp = function(value){Settings.saveUserNavApp(value)};
    $scope.saveUserMeasurementFactor = function(value){Settings.saveUserMeasurementFactor(value)};
});


/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

var fafApp = angular.module('findAFitApplication', ['ionic','uiGmapgoogle-maps'])
 .config(function (uiGmapGoogleMapApiProvider) {
     uiGmapGoogleMapApiProvider.configure({
     v: '3.18'
     });
     });

fafApp.run(function($ionicPlatform) {
    //localStorage.clear();  //for testing UI defaults
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "app/shared/tabs.html"
        })

        .state('tab.certs', {
            url: '/certs',
            views: {
                'tab-certs': {
                    templateUrl: 'app/certs/tab-certs.html',
                    controller: 'CertsCtrl'
                }
            }
        })

        .state('tab.feedback', {
            url: '/feedback',
            views: {
                'tab-feedback': {
                    templateUrl: 'app/feedback/tab-feedback.html',
                    controller: 'FeedbackCtrl'
                }
            }
        })

        .state('tab.gps', {
            url: '/gps',
            views: {
                'tab-gps': {
                    templateUrl: 'app/gps/tab-gps.html',
                    controller: 'GpsCtrl'
                }
            }
        })

        .state('tab.gps-detail', {
            url: '/gps/:boxId',
            views: {
                'tab-gps': {
                    templateUrl: 'app/shared/fafBoxDetail.html',
                    controller: 'GpsDetailCtrl'
                }
            }
        })

        .state('tab.address', {
            url: '/address',
            views: {
                'tab-address': {
                    templateUrl: 'app/address/tab-address.html',
                    controller: 'AddressCtrl'
                }
            }
        })

        .state('tab.address-detail', {
            url: '/address/:boxId',
            views: {
                'tab-address': {
                    templateUrl: 'app/shared/fafBoxDetail.html',
                    controller: 'AddressDetailCtrl'
                }
            }
        })

        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'app/settings/tab-settings.html',
                    controller: 'SettingsCtrl'
                }
            }
        });

    //Fallback
    $urlRouterProvider.otherwise('/tab/gps');

});
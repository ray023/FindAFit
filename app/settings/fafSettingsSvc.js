/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp

    .factory('Settings', function() {

        var LocalStorageConstants = {
            BOX_RESULT_COUNT: 'box_result_count',
            FIND_A_FIT_URL: 'http://findafit.info/index.php/',
            SHOW_GOOGLE_MAPS: 'show_google_maps',
            USER_NAV_APP: 'user_nav_app',
            USER_USE_COUNT: 'user_use_count',
            USER_MEASUREMENT_FACTOR: 'user_measurement_factor',
            USER_WILL_REVIEW: -1
        };
        
        var GOOGLE_SEARCH_URL = 'https://www.google.com/search?site=&source=hp&q=';

        return {
            saveBoxResultCount: function(value) {
                localStorage.setItem(LocalStorageConstants.BOX_RESULT_COUNT,value);
            },
            getBoxResultCount: function() {
                return localStorage.getItem(LocalStorageConstants.BOX_RESULT_COUNT) === null ? 5 : localStorage.getItem(LocalStorageConstants.BOX_RESULT_COUNT);
            },
            getUrl: function(){return LocalStorageConstants.FIND_A_FIT_URL;},
            getGoogleSearchUrl: function(){return GOOGLE_SEARCH_URL;},
            showGoogleMap: function() {
                return localStorage.getItem(LocalStorageConstants.SHOW_GOOGLE_MAPS) === null ? 'false' : localStorage.getItem(LocalStorageConstants.SHOW_GOOGLE_MAPS);
            },
            saveShowGoogleMap: function(value) {
                localStorage.setItem(LocalStorageConstants.SHOW_GOOGLE_MAPS,value);
            },
            userNavApp: function() {
                var platform_default = device.platform == 'iOS' ? 'Apple' : 'Google';
                return localStorage.getItem(LocalStorageConstants.USER_NAV_APP) === null ? platform_default : localStorage.getItem(LocalStorageConstants.USER_NAV_APP);
            },
            saveUserNavApp: function(value) {
                localStorage.setItem(LocalStorageConstants.USER_NAV_APP,value);
            },
            getUserMeasurementFactor: function() {
                var platform_default = '1';
                return localStorage.getItem(LocalStorageConstants.USER_MEASUREMENT_FACTOR) === null ? platform_default : localStorage.getItem(LocalStorageConstants.USER_MEASUREMENT_FACTOR);
            },
            saveUserMeasurementFactor: function(value) {
                localStorage.setItem(LocalStorageConstants.USER_MEASUREMENT_FACTOR,value);
            },
            addUserUseCount: function() {
                var userUseCount = localStorage.getItem(LocalStorageConstants.USER_USE_COUNT) === null ? 0 : localStorage.getItem(LocalStorageConstants.USER_USE_COUNT);
                if (userUseCount != LocalStorageConstants.USER_WILL_REVIEW)
                {
                    userUseCount++;
                    localStorage.setItem(LocalStorageConstants.USER_USE_COUNT,userUseCount);
                }
                return userUseCount;
            },
            getReviewLink: function() {
                //Stop nagging the user.
                localStorage.setItem(LocalStorageConstants.USER_USE_COUNT, LocalStorageConstants.USER_WILL_REVIEW);
                var reviewLink = '';
                if (device.platform == 'iOS')
                    reviewLink = 'https://geo.itunes.apple.com/us/app/find-fit-crossfit-affiliate/id940781103?mt=8';
                else
                    reviewLink = 'https://play.google.com/store/apps/details?id=com.o1solution.findafit';

                return reviewLink;
            }
        }
    });

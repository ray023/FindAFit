/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp

    .factory('Address', function($http, $q, Settings, $ionicLoading) {
        return {
            getByAddress: function(search_term) {

                search_term = search_term.replace(/\(/g, "_OPEN_PARENTHESIS_")
                    .replace(/\)/g, "_CLOSE_PARENTHESIS_")
                    .replace(/\-/g, "_HYPHEN_")
                    .replace(/\./g, "_PERIOD_")
                    .replace(/!/g, "_EXCLAMATION_MARK_")
                    .replace(/~/g, "_TILDE_")
                    .replace(/\*/g, "_ASTERISK_")
                    .replace(/'/g, "_APOSTROPHE_")
                    .replace(/:/g, "_COLON_")
                    .replace(/;/g, "_SEMICOLON_")
                    .replace(/@/g, "_AT_SIGN_")
                    .replace(/&/g, "_AMPERSAND_")
                    .replace(/"/g, "_DOUBLE_QUOTE_")
                    .replace(/%/g, "_PERCENT_")
                    .replace(/\?/g, "_QUESTION_")
                    .replace(/,/g, "_COMMA_")
                    .replace(/\\/g, "_BACKSLASH_")
                    .replace(/\//g, "_SLASH_")
                    .replace(/\$/g, "_DOLLAR_SIGN_");

                var encodedAddress = encodeURIComponent(search_term);
                var deferred  = $q.defer();

                $ionicLoading.show({template: 'Loading...'});
                $http.get(Settings.getUrl() +
                            'address/get_json_with_start_position/' +
                            encodedAddress + '/' +
                            Settings.getBoxResultCount()).
                    success(function(data,status,headers,config){
                        localStorage.setItem('boxesByAddress', JSON.stringify(data.affil_list)); //Attach to scope
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    }).
                    error(function(data,status,headers,config){
                        $ionicLoading.hide();
                        deferred.reject(status);
                    });
                return deferred.promise;
            },
            get: function(boxId) {
                var retrievedObject = JSON.parse(localStorage.getItem('boxesByAddress'));
                for (var i = 0; i < retrievedObject.length; i++) {
                    if (retrievedObject[i].af_id === boxId)
                    {
                        //if (!retrievedObject[i].url)
                        //    retrievedObject[i].url = Settings.getGoogleSearchUrl() +
                        //                                retrievedObject[i].affil_name.replace('/ /g','+');
                        return retrievedObject[i];
                    }
                }
                return null;
            }
        }
    });

/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp

    .factory('Certs', function($http, $q, Settings, $ionicLoading) {
        return {
            getByLocation: function(latitude, longitude) {
                var deferred  = $q.defer();
                $ionicLoading.show({template: 'Loading...'});
                $http.get(Settings.getUrl() +
                'events/get_by_gps/' +
                latitude + '/' +
                longitude + '/').
                    success(function(data,status,headers,config){
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    }).
                    error(function(data,status,headers,config){
                        $ionicLoading.hide();
                        deferred.reject(status);
                    });
                return deferred.promise;
            }
        }
    });

